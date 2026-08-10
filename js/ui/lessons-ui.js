import { LESSONS } from '../data/lessons.js';
import { getItemById } from '../core/pool.js';
import { computeLessonProgress, isLessonUnlocked, getLessonBadgeTier } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { isLessonCompleted, isFastTrackEligible, getCompletionProgress } from '../core/completion.js';
import { getRetentionDeltas } from '../core/snapshot.js';
import { renderLessonExercise } from './lesson-exercise-ui.js';
import { escapeHtml } from './dom-utils.js';
import { speakUkrainian, canSpeakUkrainian } from '../core/speech.js';

const SPEAKER_BTN_HTML = `<button type="button" class="speak-btn" aria-label="Play pronunciation" title="Play pronunciation">🔊</button>`;

const TIER_ICON = { gold: '🥇', silver: '🥈', bronze: '🥉' };
const PAGE_SIZE = 10;

// One compact glyph instead of two verbose pills — the detail page still
// shows the full Completion/Retention breakdown; the list's job is now just
// "where am I, at a glance," per the "too much info, overwhelming" feedback.
// Each badge type gets its own background color (not just a differently-
// shaped emoji) so fast-track (⚡, still unconfirmed) can't be mistaken for
// gold (🥇, confirmed mastery) at a glance — and completion leans on green
// throughout, not just the medal tiers.
function compactBadge(progress, lesson) {
  const tier = getLessonBadgeTier(progress, lesson);
  if (tier) return { glyph: TIER_ICON[tier], cls: `badge-${tier}` };
  const c = getCompletionProgress(progress, lesson);
  if (c.fastTrack) return { glyph: '⚡', cls: 'badge-fasttrack' };
  if (c.doneItemIds.length > 0) return { glyph: `${c.doneItemIds.length}/${c.targetItemIds.length}`, cls: 'badge-progress' };
  return { glyph: '○', cls: 'badge-none' };
}

function progressLine(p, isLocked) {
  if (isLocked) return 'Complete previous lessons to unlock';
  if (p.attempted === 0) return 'Not started yet';
  const word = p.attempted === 1 ? 'word/phrase' : 'words/phrases';
  return `${p.attempted}/${p.total} ${word} practiced &middot; ${p.percent}%`;
}

function progressBarHtml(p, isLocked) {
  const percent = isLocked ? 0 : p.percent;
  return `
    <div class="progress-bar"><div class="progress-bar-fill" style="width:${percent}%"></div></div>
    <div class="progress-line">${progressLine(p, isLocked)}</div>
  `;
}

// Two distinct signals per Phase 4, not one collapsed status: Completion (did
// you work through it — a ratchet) and Retention (will you still get it right
// — allowed to dip, driven by core/retention.js's Wilson score). Showing both
// on the card itself, not just the detail page, is the point of finding 7/3's
// "two numbers worth surfacing."
function completionPillHtml(progress, lesson) {
  if (isLessonCompleted(progress, lesson.id)) {
    return `<span class="lesson-badge status-learned">✓ Completed</span>`;
  }
  const c = getCompletionProgress(progress, lesson);
  if (c.fastTrack) {
    return `<span class="lesson-badge status-learning">${c.doneItemIds.length > 0 ? `${c.doneItemIds.length}/${c.targetItemIds.length} quick check` : 'Quick check available'}</span>`;
  }
  if (c.doneItemIds.length === 0) return `<span class="lesson-badge">Not started</span>`;
  return `<span class="lesson-badge status-learning">${c.doneItemIds.length}/${c.targetItemIds.length} exercises</span>`;
}

function retentionPillHtml(stats, delta) {
  if (stats.status !== 'learned' && stats.status !== 'needs-review') return '';
  const deltaText = typeof delta === 'number' && Math.round(delta) !== 0
    ? ` (${delta > 0 ? '+' : ''}${Math.round(delta)}% since last time)`
    : '';
  return `<span class="lesson-badge status-${stats.status}">${stats.retentionPercent}% retained${deltaText}</span>`;
}

export function renderLessons(container, { onExit, onOpenDiagnostic } = {}) {
  let scrollObserver = null;

  // Checked once per Lessons-screen visit, shared across renderList/renderDetail.
  let speechAvailable = true;
  canSpeakUkrainian().then((ok) => {
    speechAvailable = ok;
    if (!ok) container.querySelectorAll('.speak-btn').forEach((b) => b.remove());
  });

  function stopObserving() {
    if (scrollObserver) {
      scrollObserver.disconnect();
      scrollObserver = null;
    }
  }

  function rowHtml(lesson, i, sorted, progress, stats) {
    const unlocked = isLessonUnlocked(progress, lesson.id);
    const cardStatus = unlocked ? stats[lesson.id].status : 'locked';
    const prevTitle = i > 0 ? sorted[i - 1].title : null;
    const percent = unlocked ? stats[lesson.id].percent : 0;
    const badge = unlocked ? compactBadge(progress, lesson) : { glyph: '🔒', cls: 'badge-locked' };
    // "We think you already know this" is shown inline (greyed/highlighted,
    // same row, same scroll position) rather than a separate duplicate
    // section — the row itself is the only place this lesson appears.
    const isFastTrack = unlocked && !isLessonCompleted(progress, lesson.id) && isFastTrackEligible(progress, lesson.id);

    return `
      <button class="lesson-row status-${cardStatus}${isFastTrack ? ' is-fasttrack' : ''}" data-id="${lesson.id}" data-locked="${!unlocked}" style="${!unlocked ? 'opacity: 0.55;' : ''}">
        <span class="lesson-row-order">${lesson.order}</span>
        <span class="lesson-row-badge ${badge.cls}" title="${unlocked ? '' : 'Locked'}">${badge.glyph}</span>
        <span class="lesson-row-title">${escapeHtml(lesson.title)}</span>
        <div class="lesson-row-bar"><div class="lesson-row-bar-fill" style="width:${percent}%"></div></div>
        ${!unlocked ? `<div class="lesson-locked-note" style="display: none; font-size: 12px; color: var(--warn); margin-top: 4px; grid-column: 1 / -1;">Complete "${escapeHtml(prevTitle || '')}" to unlock this.</div>` : ''}
      </button>
    `;
  }

  function attachRowClickHandler(row, sorted) {
    row.addEventListener('click', () => {
      const progress = loadProgress();
      const lesson = LESSONS.find((l) => l.id === row.dataset.id);
      const unlocked = isLessonUnlocked(progress, lesson.id);

      if (!unlocked) {
        // Inline reason shown in place, not a blocking native alert().
        const note = row.querySelector('.lesson-locked-note');
        if (note) note.style.display = note.style.display === 'none' ? 'block' : 'none';
        return;
      }

      stopObserving();
      if (lesson.kind === 'diagnostic') {
        onOpenDiagnostic && onOpenDiagnostic();
      } else {
        renderDetail(lesson.id);
      }
    });
  }

  // True infinite scroll: a sentinel row sits after the last loaded lesson;
  // an IntersectionObserver appends the next PAGE_SIZE rows the moment it
  // scrolls into view, then moves itself to the new end. Appending (rather
  // than a full re-render) keeps scroll position stable while loading.
  function renderList() {
    stopObserving();
    const progress = loadProgress();
    const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
    const stats = {};
    for (const lesson of sorted) {
      stats[lesson.id] = computeLessonProgress(progress, lesson);
    }

    // "Since last time" deltas computed over ALL lessons regardless of how
    // many are currently loaded — only meaningful for Completed lessons with
    // a real retention read (see core/snapshot.js).
    const currentRetentionValues = {};
    for (const lesson of sorted) {
      if (typeof stats[lesson.id].retentionPercent === 'number') {
        currentRetentionValues[lesson.id] = stats[lesson.id].retentionPercent;
      }
    }
    getRetentionDeltas(progress, currentRetentionValues);
    saveProgress(progress);

    const firstBatch = sorted.slice(0, PAGE_SIZE);

    container.innerHTML = `
      <div class="lessons-screen">
        <header class="lessons-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <h2>Lessons</h2>
        </header>
        <div class="lesson-list lesson-list--compact" id="lesson-list-rows">
          ${firstBatch.map((lesson, i) => rowHtml(lesson, i, sorted, progress, stats)).join('')}
        </div>
        <div id="lessons-scroll-sentinel" style="height: 1px;"></div>
      </div>
    `;

    container.querySelector('.btn-back').addEventListener('click', () => { stopObserving(); onExit && onExit(); });
    container.querySelectorAll('.lesson-row').forEach((row) => attachRowClickHandler(row, sorted));

    let loadedCount = firstBatch.length;
    const listEl = container.querySelector('#lesson-list-rows');
    const sentinel = container.querySelector('#lessons-scroll-sentinel');

    function loadNextBatch() {
      const nextBatch = sorted.slice(loadedCount, loadedCount + PAGE_SIZE);
      for (const lesson of nextBatch) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = rowHtml(lesson, sorted.indexOf(lesson), sorted, progress, stats).trim();
        const row = wrapper.firstElementChild;
        listEl.appendChild(row);
        attachRowClickHandler(row, sorted);
      }
      loadedCount += nextBatch.length;
    }

    if (loadedCount < sorted.length) {
      scrollObserver = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        // IntersectionObserver only fires on intersection STATE CHANGES, not
        // continuously while still intersecting — if a batch of short rows
        // doesn't push the sentinel past the rootMargin, loading exactly one
        // batch per callback would silently stall (no further transition to
        // report). Loop within this single callback instead, re-checking the
        // sentinel's real position after each append, until it's genuinely
        // scrolled past the load-trigger zone or everything is loaded.
        while (loadedCount < sorted.length) {
          loadNextBatch();
          if (loadedCount >= sorted.length) break;
          const rect = sentinel.getBoundingClientRect();
          const stillNearViewport = rect.top <= window.innerHeight + 400;
          if (!stillNearViewport) break;
        }
        if (loadedCount >= sorted.length) stopObserving();
      }, { root: null, rootMargin: '400px' });
      scrollObserver.observe(sentinel);
    }

    // "Confirm what you already know" lessons live inline (greyed/highlighted
    // via .is-fasttrack, see rowHtml) rather than in a separate duplicate
    // section — so instead of surfacing them above the fold, bring the list's
    // scroll position to the first one directly, loading whatever batches are
    // needed to reach it first.
    const firstFastTrackIndex = sorted.findIndex(
      (l) => isLessonUnlocked(progress, l.id) && !isLessonCompleted(progress, l.id) && isFastTrackEligible(progress, l.id)
    );
    if (firstFastTrackIndex >= 0) {
      while (loadedCount <= firstFastTrackIndex && loadedCount < sorted.length) loadNextBatch();
      const targetRow = listEl.children[firstFastTrackIndex];
      if (targetRow) targetRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function renderDetail(lessonId) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    const progress = loadProgress();
    const p = computeLessonProgress(progress, lesson);
    const completed = isLessonCompleted(progress, lesson.id);
    const completion = getCompletionProgress(progress, lesson);
    const { content } = lesson;

    // Check if transliteration is enabled and load target language setting
    const settings = progress.meta.settings;
    const showTranslit = settings.transliteration;
    const useCzech = settings.language === 'cz';

    container.innerHTML = `
      <div class="lesson-detail-screen">
        <header class="lessons-header" style="justify-content: space-between;">
          <button class="btn-back-list" type="button">&larr; Lessons</button>
          <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap; justify-content: flex-end;">
            <button id="reset-lesson-btn" class="btn-text" style="color: var(--bad); text-decoration: none; font-size: 13px; font-weight: 600;">Reset Lesson Progress</button>
            ${completionPillHtml(progress, lesson)}${retentionPillHtml(p, undefined)}
          </div>
        </header>
        <h2 class="lesson-detail-title">${lesson.order}. ${escapeHtml(lesson.title)}</h2>
        <p class="lesson-detail-summary">${escapeHtml(lesson.summary)}</p>
        <div class="lesson-detail-progress">${progressBarHtml(p, false)}</div>

        <section class="lesson-section" style="background: var(--surface); border: 1px solid var(--border); padding: 14px 16px; border-radius: var(--radius);">
          ${completed ? `
            <span style="font-weight: 600; color: var(--good);">✓ Completed${lesson.order < LESSONS.length ? ' — next lesson unlocked' : ''}. Keep it fresh in Drill mode below.</span>
          ` : completion.fastTrack ? `
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <span style="font-size: 13px; color: var(--text-dim);">Your placement test suggests you already know this — confirm with a quick ${completion.targetItemIds.length}-question check instead of the full exercise set.</span>
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                <span style="font-size: 13px; color: var(--text-dim);">${completion.doneItemIds.length}/${completion.targetItemIds.length} done</span>
                <button class="btn-primary" id="lesson-exercise-btn" style="padding: 8px 14px; font-size: 13px;">${completion.doneItemIds.length > 0 ? 'Continue quick check' : 'Quick check'}</button>
              </div>
            </div>
          ` : `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
              <span style="font-size: 13px; color: var(--text-dim);">${completion.doneItemIds.length}/${completion.targetItemIds.length} exercises done</span>
              <button class="btn-primary" id="lesson-exercise-btn" style="padding: 8px 14px; font-size: 13px;">${completion.doneItemIds.length > 0 ? 'Continue' : 'Complete this lesson'}</button>
            </div>
          `}
        </section>

        ${content.patterns && content.patterns.length ? `
          <section class="lesson-section">
            <h3>Pattern</h3>
            ${content.patterns.map((p, i) => `
              <div class="pattern-block" data-pattern-idx="${i}">
                <div class="pattern-uk">${escapeHtml(p.uk)} ${speechAvailable ? SPEAKER_BTN_HTML : ''}</div>
                ${(showTranslit && p.translit) ? `<div class="pattern-translit">${escapeHtml(p.translit)}</div>` : ''}
                <div class="pattern-en" style="${useCzech ? 'color: var(--text-dim);' : ''}">${escapeHtml(p.en)}</div>
                ${p.czNote ? `<div class="pattern-cz" style="font-weight: ${useCzech ? '600' : 'normal'}; color: ${useCzech ? 'var(--accent-2)' : 'var(--text-dim)'};">🇨🇿 ${escapeHtml(p.czNote)}</div>` : ''}
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${content.examples && content.examples.length ? `
          <section class="lesson-section">
            <h3>Examples</h3>
            ${content.examples.map((ex, i) => `
              <div class="example-block" data-example-idx="${i}">
                <div class="example-uk">${escapeHtml(ex.uk)} ${speechAvailable ? SPEAKER_BTN_HTML : ''}</div>
                ${(showTranslit && ex.translit) ? `<div class="example-translit">${escapeHtml(ex.translit)}</div>` : ''}
                <div class="example-en" style="${useCzech ? 'color: var(--text-dim);' : ''}">${escapeHtml(ex.en)}</div>
                ${ex.cz ? `<div class="example-cz" style="font-weight: ${useCzech ? '600' : 'normal'}; color: ${useCzech ? 'var(--accent-2)' : 'var(--text-dim)'};">🇨🇿 ${escapeHtml(ex.cz)}</div>` : ''}
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${content.prefixes && content.prefixes.length ? `
          <section class="lesson-section">
            <h3>Prefix Composition & Meaning</h3>
            <p style="font-size: 13px; color: var(--text-dim); margin-bottom: 12px;">
              Mastering how prefixes attach to root verbs to shift their meaning. Pay attention to whether the derivation is literally active today or just historical.
            </p>
            <div style="display: flex; flex-direction: column; gap: 14px;">
              ${content.prefixes.map((p, i) => {
                let badgeLabel = 'Actually Transparent';
                let badgeClass = 'status-learned';
                if (p.compositionType === 'semantic') {
                  badgeLabel = 'Semantically Related';
                  badgeClass = 'status-learning';
                } else if (p.compositionType === 'coincidence') {
                  badgeLabel = 'Historical Coincidence (Do not decompose)';
                  badgeClass = 'status-needs-review';
                }

                return `
                  <div class="prefix-block" data-prefix-idx="${i}" style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 14px 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; flex-wrap: wrap;">
                      <div style="font-size: 18px; font-weight: bold; color: var(--text);">
                        ${escapeHtml(p.uk)} ${speechAvailable ? SPEAKER_BTN_HTML : ''}
                        ${(showTranslit && p.translit) ? `<span style="font-size: 14px; font-weight: normal; color: var(--text-dim); margin-left: 6px;">(${escapeHtml(p.translit)})</span>` : ''}
                      </div>
                      <span class="lesson-badge ${badgeClass}" style="font-size: 11px; padding: 3px 8px; font-weight: 600; text-transform: none;">${badgeLabel}</span>
                    </div>

                    <div style="margin-top: 10px; display: grid; grid-template-columns: 100px 1fr; gap: 6px 12px; font-size: 13px;">
                      <span style="color: var(--text-dim); font-weight: 600;">Prefix:</span>
                      <span style="color: var(--accent-2); font-weight: 600;">${escapeHtml(p.prefix)}</span>

                      <span style="color: var(--text-dim); font-weight: 600;">Root:</span>
                      <span>${escapeHtml(p.root)}</span>

                      <span style="color: var(--text-dim); font-weight: 600;">Literal:</span>
                      <span style="font-family: monospace; background: var(--surface-2); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border); justify-self: start;">${escapeHtml(p.literal)}</span>

                      <span style="color: var(--text-dim); font-weight: 600;">Mental Picture:</span>
                      <span style="font-style: italic; color: var(--text);">${escapeHtml(p.mentalPicture)}</span>

                      <span style="color: var(--text-dim); font-weight: 600;">Meaning:</span>
                      <span style="font-weight: 600; color: var(--good);">${escapeHtml(p.en)}</span>

                      ${p.cz ? `
                        <span style="color: var(--text-dim); font-weight: 600;">Czech:</span>
                        <span style="color: var(--accent-2);">${escapeHtml(p.cz)}</span>
                      ` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </section>
        ` : ''}

        ${content.substitutions && content.substitutions.length ? `
          <section class="lesson-section">
            <h3>Try substituting</h3>
            ${content.substitutions.map((sub) => `
              <div class="sub-block">
                <div class="sub-template">${escapeHtml(sub.template)}</div>
                <div class="sub-en">${escapeHtml(sub.en)}</div>
                <div class="sub-options">
                  ${sub.slotOptions.map((opt) => `<span class="sub-chip">${escapeHtml(opt)}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${content.czechNote ? `
          <section class="lesson-section lesson-note">
            <h3>Note</h3>
            <p>${escapeHtml(content.czechNote)}</p>
          </section>
        ` : ''}

        <section class="lesson-section">
          <h3>Practice these in Drill mode</h3>
          <div class="lesson-item-chips">
            ${lesson.itemIds.map((id) => {
              const item = getItemById(id);
              return item ? `<span class="item-chip">${escapeHtml(item.uk)}</span>` : '';
            }).join('')}
          </div>
        </section>
      </div>
    `;

    container.querySelector('.btn-back-list').addEventListener('click', renderList);
    const exerciseBtn = container.querySelector('#lesson-exercise-btn');
    if (exerciseBtn) exerciseBtn.addEventListener('click', () => renderExercise(lesson.id));

    container.querySelectorAll('.pattern-block').forEach((el) => {
      const p = content.patterns[Number(el.dataset.patternIdx)];
      const btn = el.querySelector('.speak-btn');
      if (p && btn) btn.addEventListener('click', (e) => { e.stopPropagation(); speakUkrainian(p.uk); });
    });
    container.querySelectorAll('.example-block').forEach((el) => {
      const ex = content.examples[Number(el.dataset.exampleIdx)];
      const btn = el.querySelector('.speak-btn');
      if (ex && btn) btn.addEventListener('click', (e) => { e.stopPropagation(); speakUkrainian(ex.uk); });
    });
    container.querySelectorAll('.prefix-block').forEach((el) => {
      const p = content.prefixes[Number(el.dataset.prefixIdx)];
      const btn = el.querySelector('.speak-btn');
      if (p && btn) btn.addEventListener('click', (e) => { e.stopPropagation(); speakUkrainian(p.uk); });
    });

    // Reset current lesson logic
    container.querySelector('#reset-lesson-btn').addEventListener('click', () => {
      if (confirm(`Reset your learning progress for this lesson: "${lesson.title}"?`)) {
        const freshProgress = loadProgress();
        for (const itemId of lesson.itemIds) {
          if (freshProgress.items[itemId]) {
            delete freshProgress.items[itemId];
          }
        }
        if (freshProgress.lessons[lesson.id]) {
          delete freshProgress.lessons[lesson.id];
        }
        saveProgress(freshProgress);
        renderDetail(lesson.id);
      }
    });
  }

  function renderExercise(lessonId) {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    renderLessonExercise(container, lesson, { onDone: () => renderDetail(lessonId) });
  }

  renderList();
}

import { LESSONS } from '../data/lessons.js';
import { getItemById } from '../core/pool.js';
import { computeLessonProgress, isLessonUnlocked, getLessonBadgeTier } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { isLessonCompleted, isFastTrackEligible, getCompletionProgress } from '../core/completion.js';
import { getRetentionDeltas } from '../core/snapshot.js';
import { renderLessonExercise } from './lesson-exercise-ui.js';
import { escapeHtml } from './dom-utils.js';

const TIER_ICON = { gold: '🥇', silver: '🥈', bronze: '🥉' };
const PAGE_SIZE = 10;

// One compact glyph instead of two verbose pills — the detail page still
// shows the full Completion/Retention breakdown; the list's job is now just
// "where am I, at a glance," per the "too much info, overwhelming" feedback.
function compactBadge(progress, lesson) {
  const tier = getLessonBadgeTier(progress, lesson);
  if (tier) return TIER_ICON[tier];
  const c = getCompletionProgress(progress, lesson);
  if (c.fastTrack) return '⚡';
  if (c.doneItemIds.length > 0) return `${c.doneItemIds.length}/${c.targetItemIds.length}`;
  return '○';
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
  let visibleCount = PAGE_SIZE;

  function renderList() {
    const progress = loadProgress();
    const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
    const stats = {};
    for (const lesson of sorted) {
      stats[lesson.id] = computeLessonProgress(progress, lesson);
    }

    // "Since last time" deltas computed over ALL lessons (not just the
    // visible page) so the snapshot stays accurate regardless of scroll
    // position — only meaningful for Completed lessons with a real
    // retention read (see core/snapshot.js).
    const currentRetentionValues = {};
    for (const lesson of sorted) {
      if (typeof stats[lesson.id].retentionPercent === 'number') {
        currentRetentionValues[lesson.id] = stats[lesson.id].retentionPercent;
      }
    }
    getRetentionDeltas(progress, currentRetentionValues);
    saveProgress(progress);

    const visible = sorted.slice(0, visibleCount);
    const hasMore = visibleCount < sorted.length;

    container.innerHTML = `
      <div class="lessons-screen">
        <header class="lessons-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <h2>Lessons</h2>
        </header>
        <div class="lesson-list lesson-list--compact">
          ${visible
            .map((lesson, i) => {
              const unlocked = isLessonUnlocked(progress, lesson.id);
              const cardStatus = unlocked ? stats[lesson.id].status : 'locked';
              const prevTitle = i > 0 ? sorted[i - 1].title : null;
              const percent = unlocked ? stats[lesson.id].percent : 0;

              return `
                <button class="lesson-row status-${cardStatus}" data-id="${lesson.id}" data-locked="${!unlocked}" style="${!unlocked ? 'opacity: 0.55;' : ''}">
                  <span class="lesson-row-order">${lesson.order}</span>
                  <span class="lesson-row-badge" title="${unlocked ? '' : 'Locked'}">${unlocked ? compactBadge(progress, lesson) : '🔒'}</span>
                  <span class="lesson-row-title">${escapeHtml(lesson.title)}</span>
                  <div class="lesson-row-bar"><div class="lesson-row-bar-fill" style="width:${percent}%"></div></div>
                  ${!unlocked ? `<div class="lesson-locked-note" style="display: none; font-size: 12px; color: var(--warn); margin-top: 4px; grid-column: 1 / -1;">Complete "${escapeHtml(prevTitle || '')}" to unlock this.</div>` : ''}
                </button>
              `;
            })
            .join('')}
        </div>
        ${hasMore ? `<button class="btn-text" id="lessons-load-more" style="width: 100%; margin-top: 10px; font-size: 13px;">Show ${Math.min(PAGE_SIZE, sorted.length - visibleCount)} more (${visibleCount}/${sorted.length})</button>` : ''}
      </div>
    `;

    container.querySelector('.btn-back').addEventListener('click', () => onExit && onExit());
    const loadMoreBtn = container.querySelector('#lessons-load-more');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        visibleCount = Math.min(visibleCount + PAGE_SIZE, sorted.length);
        renderList();
      });
    }
    container.querySelectorAll('.lesson-row').forEach((card) => {
      card.addEventListener('click', () => {
        const lesson = LESSONS.find((l) => l.id === card.dataset.id);
        const unlocked = isLessonUnlocked(progress, lesson.id);

        if (!unlocked) {
          // Inline reason shown in place, not a blocking native alert().
          const note = card.querySelector('.lesson-locked-note');
          if (note) note.style.display = note.style.display === 'none' ? 'block' : 'none';
          return;
        }

        if (lesson.kind === 'diagnostic') {
          onOpenDiagnostic && onOpenDiagnostic();
        } else {
          renderDetail(lesson.id);
        }
      });
    });
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
            ${content.patterns.map((p) => `
              <div class="pattern-block">
                <div class="pattern-uk">${escapeHtml(p.uk)}</div>
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
            ${content.examples.map((ex) => `
              <div class="example-block">
                <div class="example-uk">${escapeHtml(ex.uk)}</div>
                ${(showTranslit && ex.translit) ? `<div class="example-translit">${escapeHtml(ex.translit)}</div>` : ''}
                <div class="example-en" style="${useCzech ? 'color: var(--text-dim);' : ''}">${escapeHtml(ex.en)}</div>
                ${ex.cz ? `<div class="example-cz" style="font-weight: ${useCzech ? '600' : 'normal'}; color: ${useCzech ? 'var(--accent-2)' : 'var(--text-dim)'};">🇨🇿 ${escapeHtml(ex.cz)}</div>` : ''}
              </div>
            `).join('')}
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

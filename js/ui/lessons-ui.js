import { LESSONS } from '../data/lessons.js';
import { getItemById } from '../core/pool.js';
import { computeLessonProgress } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

const STATUS_LABEL = {
  'not-started': 'Not started',
  learning: 'Learning',
  learned: 'Learned',
  'needs-review': 'Needs review',
};

function progressLine(p) {
  if (p.attempted === 0) return 'Not started yet';
  const word = p.attempted === 1 ? 'word/phrase' : 'words/phrases';
  return `${p.attempted}/${p.total} ${word} practiced &middot; ${p.percent}%`;
}

function progressBarHtml(p) {
  return `
    <div class="progress-bar"><div class="progress-bar-fill" style="width:${p.percent}%"></div></div>
    <div class="progress-line">${progressLine(p)}</div>
  `;
}

export function renderLessons(container, { onExit, onOpenDiagnostic } = {}) {
  function renderList() {
    const progress = loadProgress();
    const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
    const stats = {};
    for (const lesson of sorted) {
      stats[lesson.id] = computeLessonProgress(progress, lesson);
    }
    saveProgress(progress); // persists any everReachedLearned flips from computeLessonProgress

    container.innerHTML = `
      <div class="lessons-screen">
        <header class="lessons-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <h2>Lessons</h2>
        </header>
        <div class="lesson-list">
          ${sorted
            .map((lesson) => `
              <button class="lesson-card status-${stats[lesson.id].status}" data-id="${lesson.id}">
                <div class="lesson-card-top">
                  <span class="lesson-order">${lesson.order}</span>
                  <span class="lesson-badge">${STATUS_LABEL[stats[lesson.id].status]}</span>
                </div>
                <div class="lesson-title">${escapeHtml(lesson.title)}</div>
                <div class="lesson-summary">${escapeHtml(lesson.summary)}</div>
                ${progressBarHtml(stats[lesson.id])}
              </button>
            `)
            .join('')}
        </div>
      </div>
    `;

    container.querySelector('.btn-back').addEventListener('click', () => onExit && onExit());
    container.querySelectorAll('.lesson-card').forEach((card) => {
      card.addEventListener('click', () => {
        const lesson = LESSONS.find((l) => l.id === card.dataset.id);
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
    saveProgress(progress);
    const { content } = lesson;

    // Check if transliteration is enabled and load target language setting
    const settings = progress.meta.settings;
    const showTranslit = settings.transliteration;
    const useCzech = settings.language === 'cz';

    container.innerHTML = `
      <div class="lesson-detail-screen">
        <header class="lessons-header" style="justify-content: space-between;">
          <button class="btn-back-list" type="button">&larr; Lessons</button>
          <div style="display: flex; gap: 8px; align-items: center;">
            <button id="reset-lesson-btn" class="btn-text" style="color: var(--bad); text-decoration: none; font-size: 13px; font-weight: 600;">Reset Lesson Progress</button>
            <span class="lesson-badge status-${p.status}">${STATUS_LABEL[p.status]}</span>
          </div>
        </header>
        <h2 class="lesson-detail-title">${lesson.order}. ${escapeHtml(lesson.title)}</h2>
        <p class="lesson-detail-summary">${escapeHtml(lesson.summary)}</p>
        <div class="lesson-detail-progress">${progressBarHtml(p)}</div>

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

  renderList();
}

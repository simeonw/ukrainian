import { LESSONS } from '../data/lessons.js';
import { getItemById } from '../core/pool.js';
import { computeLessonStatus } from '../core/srs.js';
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

export function renderLessons(container, { onExit, onOpenDiagnostic } = {}) {
  function renderList() {
    const progress = loadProgress();
    const sorted = [...LESSONS].sort((a, b) => a.order - b.order);
    const statuses = {};
    for (const lesson of sorted) {
      statuses[lesson.id] = computeLessonStatus(progress, lesson);
    }
    saveProgress(progress); // persists any everReachedLearned flips from computeLessonStatus

    container.innerHTML = `
      <div class="lessons-screen">
        <header class="lessons-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <h2>Lessons</h2>
        </header>
        <div class="lesson-list">
          ${sorted
            .map((lesson) => `
              <button class="lesson-card status-${statuses[lesson.id]}" data-id="${lesson.id}">
                <div class="lesson-card-top">
                  <span class="lesson-order">${lesson.order}</span>
                  <span class="lesson-badge">${STATUS_LABEL[statuses[lesson.id]]}</span>
                </div>
                <div class="lesson-title">${escapeHtml(lesson.title)}</div>
                <div class="lesson-summary">${escapeHtml(lesson.summary)}</div>
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
    const status = computeLessonStatus(progress, lesson);
    saveProgress(progress);
    const { content } = lesson;

    container.innerHTML = `
      <div class="lesson-detail-screen">
        <header class="lessons-header">
          <button class="btn-back-list" type="button">&larr; Lessons</button>
          <span class="lesson-badge status-${status}">${STATUS_LABEL[status]}</span>
        </header>
        <h2 class="lesson-detail-title">${lesson.order}. ${escapeHtml(lesson.title)}</h2>
        <p class="lesson-detail-summary">${escapeHtml(lesson.summary)}</p>

        ${content.patterns.length ? `
          <section class="lesson-section">
            <h3>Pattern</h3>
            ${content.patterns.map((p) => `
              <div class="pattern-block">
                <div class="pattern-uk">${escapeHtml(p.uk)}</div>
                ${p.translit ? `<div class="pattern-translit">${escapeHtml(p.translit)}</div>` : ''}
                <div class="pattern-en">${escapeHtml(p.en)}</div>
                ${p.czNote ? `<div class="pattern-cz">🇨🇿 ${escapeHtml(p.czNote)}</div>` : ''}
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${content.examples.length ? `
          <section class="lesson-section">
            <h3>Examples</h3>
            ${content.examples.map((ex) => `
              <div class="example-block">
                <div class="example-uk">${escapeHtml(ex.uk)}</div>
                <div class="example-translit">${escapeHtml(ex.translit)}</div>
                <div class="example-en">${escapeHtml(ex.en)}</div>
                ${ex.cz ? `<div class="example-cz">🇨🇿 ${escapeHtml(ex.cz)}</div>` : ''}
              </div>
            `).join('')}
          </section>
        ` : ''}

        ${content.substitutions.length ? `
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
  }

  renderList();
}

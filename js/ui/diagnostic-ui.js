import { getItemById, pickDistractors } from '../core/pool.js';
import { seedFromDiagnostic } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { DIAGNOSTIC_WORD_IDS, SELF_RATING_OPTIONS, SENTENCE_QUESTION } from '../data/diagnostic.js';

function shuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function renderDiagnostic(container, { onDone } = {}) {
  const progress = loadProgress();
  const steps = [
    ...DIAGNOSTIC_WORD_IDS.map((id) => ({ type: 'self-rating', itemId: id })),
    ...DIAGNOSTIC_WORD_IDS.map((id) => ({ type: 'mc', itemId: id })),
    { type: 'sentence' },
    { type: 'summary' },
  ];
  let index = 0;
  const selfRatings = {};
  const mcResults = {};
  let sentenceCorrect = null;

  function shell(partLabel, bodyHtml) {
    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <div class="diagnostic-progress">${partLabel} &middot; ${index + 1}/${steps.length}</div>
        </header>
        <div class="diagnostic-body">${bodyHtml}</div>
      </div>
    `;
    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
  }

  function advance() {
    index += 1;
    renderStep();
  }

  function renderStep() {
    const step = steps[index];
    if (!step) return renderSummary();
    if (step.type === 'self-rating') return renderSelfRating(step);
    if (step.type === 'mc') return renderMc(step);
    if (step.type === 'sentence') return renderSentence();
    return renderSummary();
  }

  function renderSelfRating(step) {
    const item = getItemById(step.itemId);
    shell(
      'Part 1 &middot; What do you think this means?',
      `
        <div class="diagnostic-word">${escapeHtml(item.uk)}</div>
        <div class="diagnostic-translit">${escapeHtml(item.translit)}</div>
        <div class="diagnostic-options">
          ${SELF_RATING_OPTIONS.map((opt) => `<button class="option-btn" data-value="${opt.value}">${escapeHtml(opt.label)}</button>`).join('')}
        </div>
      `
    );
    container.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        selfRatings[step.itemId] = btn.dataset.value;
        advance();
      });
    });
  }

  function renderMc(step) {
    const item = getItemById(step.itemId);
    const options = shuffle([item, ...pickDistractors(item, 'uk2en', 3)]);
    shell(
      'Part 2 &middot; Multiple choice',
      `
        <p class="diagnostic-prompt-label">What does this word mean?</p>
        <div class="diagnostic-word">${escapeHtml(item.uk)}</div>
        <div class="diagnostic-translit">${escapeHtml(item.translit)}</div>
        <div class="diagnostic-options">
          ${options.map((opt) => `<button class="option-btn" data-id="${opt.id}">${escapeHtml(opt.en)}</button>`).join('')}
        </div>
      `
    );
    let answered = false;
    container.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isCorrect = btn.dataset.id === item.id;
        mcResults[step.itemId] = isCorrect;
        btn.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
        if (isCorrect) {
          seedFromDiagnostic(progress, item.id, 'uk2en');
        } else {
          container.querySelectorAll('.option-btn').forEach((b) => {
            if (b.dataset.id === item.id) b.classList.add('is-correct');
          });
        }
        setTimeout(advance, isCorrect ? 400 : 1000);
      });
    });
  }

  function renderSentence() {
    const options = shuffle([SENTENCE_QUESTION.correctEn, ...SENTENCE_QUESTION.distractorsEn]);
    shell(
      'Part 3 &middot; Sentence recognition',
      `
        <p class="diagnostic-prompt-label">What does this sentence mean?</p>
        <div class="diagnostic-word">${escapeHtml(SENTENCE_QUESTION.uk)}</div>
        <div class="diagnostic-translit">${escapeHtml(SENTENCE_QUESTION.translit)}</div>
        <div class="diagnostic-options diagnostic-options--wide">
          ${options.map((opt) => `<button class="option-btn" data-text="${escapeHtml(opt)}">${escapeHtml(opt)}</button>`).join('')}
        </div>
      `
    );
    let answered = false;
    container.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isCorrect = btn.dataset.text === SENTENCE_QUESTION.correctEn;
        sentenceCorrect = isCorrect;
        btn.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
        if (isCorrect) {
          seedFromDiagnostic(progress, SENTENCE_QUESTION.itemId, 'uk2en');
        } else {
          container.querySelectorAll('.option-btn').forEach((b) => {
            if (b.dataset.text === SENTENCE_QUESTION.correctEn) b.classList.add('is-correct');
          });
        }
        setTimeout(advance, isCorrect ? 400 : 1200);
      });
    });
  }

  function renderSummary() {
    progress.meta.diagnosticCompletedAt = Date.now();
    saveProgress(progress);

    const knownCount = Object.values(selfRatings).filter((v) => v === 'known').length;
    const guessedCount = Object.values(selfRatings).filter((v) => v === 'guessed').length;
    const unknownCount = Object.values(selfRatings).filter((v) => v === 'unknown').length;
    const mcCorrect = Object.values(mcResults).filter(Boolean).length;

    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <div class="diagnostic-progress">Done</div>
        </header>
        <div class="diagnostic-body diagnostic-summary">
          <h2>Nice work</h2>
          <ul class="summary-list">
            <li>Recognized immediately: ${knownCount}</li>
            <li>Guessed correctly: ${guessedCount}</li>
            <li>Unknown: ${unknownCount}</li>
            <li>Multiple choice correct: ${mcCorrect} / ${DIAGNOSTIC_WORD_IDS.length}</li>
            <li>Sentence recognition: ${sentenceCorrect ? 'correct' : 'missed'}</li>
          </ul>
          <p>Words you already knew got a head start in Drill mode &mdash; you'll still see them sometimes, just less often than brand-new ones.</p>
          <button class="btn-primary" id="diagnostic-continue">Continue</button>
        </div>
      </div>
    `;
    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
    container.querySelector('#diagnostic-continue').addEventListener('click', () => onDone && onDone());
  }

  renderStep();
}

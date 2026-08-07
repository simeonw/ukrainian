// The bounded per-lesson Completion exercise (Phase 2) — distinct from the
// open-ended global Drill pool. Working through every item in the lesson's
// target set marks it Completed, which is what actually drives sequential
// unlocking (see core/srs.js getUnlockedLessons / core/completion.js).
//
// Wrong answers are never a scored miss: the correct answer is revealed, then
// the same item comes right back around for a genuine retry. Nothing here can
// fail — it only takes longer for a shaky item to clear. Completion is evidence
// of engagement, not proof of retention (that's Retention's job — see
// srs.computeLessonProgress and, eventually, Phase 3's Wilson-score window).
import { getItemById, promptText, answerText, pickDistractors } from '../core/pool.js';
import { recordAnswer } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { getCompletionProgress, recordCompletionItemDone } from '../core/completion.js';
import { shuffle } from '../core/random.js';
import { escapeHtml } from './dom-utils.js';

export function renderLessonExercise(container, lesson, { onDone } = {}) {
  const progress = loadProgress();

  function shell(bodyHtml, doneCount, totalCount) {
    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Lesson</button>
          <div class="diagnostic-progress">Completing &middot; ${doneCount}/${totalCount}</div>
        </header>
        <div class="diagnostic-body">${bodyHtml}</div>
      </div>
    `;
    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
  }

  function next() {
    const { targetItemIds, doneItemIds, remaining, completed } = getCompletionProgress(progress, lesson);
    if (completed || remaining.length === 0) {
      return renderComplete(targetItemIds.length);
    }
    const item = getItemById(remaining[0]);
    const direction = Math.random() < 0.5 ? 'uk2en' : 'en2uk';
    const distractorItems = pickDistractors(item, direction, 3);
    const correctText = answerText(item, direction);
    const options = shuffle([correctText, ...distractorItems.map((d) => answerText(d, direction))]);
    renderQuestion(item, direction, options, correctText, doneItemIds.length, targetItemIds.length);
  }

  function renderQuestion(item, direction, options, correctText, doneCount, totalCount) {
    const prompt = promptText(item, direction);
    shell(`
      <p class="diagnostic-prompt-label">Select the correct ${direction === 'uk2en' ? 'meaning' : 'Ukrainian'}:</p>
      <div class="diagnostic-word" style="font-size: 21px; line-height: 1.35; margin: 16px 0;">${escapeHtml(prompt.main)}</div>
      ${prompt.translit ? `<div class="diagnostic-translit" style="margin-bottom: 24px;">${escapeHtml(prompt.translit)}</div>` : '<div style="margin-bottom: 24px;"></div>'}
      <div class="diagnostic-options diagnostic-options--wide">
        ${options.map((opt) => `<button class="option-btn" data-text="${escapeHtml(opt)}" style="font-size:14px; padding:10px 12px;">${escapeHtml(opt)}</button>`).join('')}
      </div>
    `, doneCount, totalCount);

    let answered = false;
    container.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isCorrect = btn.dataset.text === correctText;
        btn.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

        if (isCorrect) {
          recordAnswer(progress, item.id, direction, true);
          recordCompletionItemDone(progress, lesson, item.id);
          saveProgress(progress);
          setTimeout(next, 550);
        } else {
          container.querySelectorAll('.option-btn').forEach((b) => {
            if (b.dataset.text === correctText) b.classList.add('is-correct');
          });
          // Immediate retry, correction shown — no score recorded for the miss.
          setTimeout(() => renderQuestion(item, direction, options, correctText, doneCount, totalCount), 1400);
        }
      });
    });
  }

  function renderComplete(totalCount) {
    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Lesson</button>
          <div class="diagnostic-progress">Completing &middot; ${totalCount}/${totalCount}</div>
        </header>
        <div class="diagnostic-body diagnostic-summary" style="text-align: center;">
          <h2 style="color: var(--good); margin-bottom: 6px;">✓ Lesson Completed</h2>
          <p style="margin: 0 0 24px 0; font-size: 14px; color: var(--text-dim); line-height: 1.4;">
            The next lesson is now unlocked. Keep drilling this one from time to time — Completion doesn't expire, but how well you remember it can still dip.
          </p>
          <button class="btn-primary" id="exercise-continue">Back to Lesson</button>
        </div>
      </div>
    `;
    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
    container.querySelector('#exercise-continue').addEventListener('click', () => onDone && onDone());
  }

  next();
}

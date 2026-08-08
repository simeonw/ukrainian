// First-run placement screen. Replaces the old fixed diagnostic (diagnostic-ui.js)
// as the onboarding entry point: instead of one comprehension ladder, this runs
// the generic calibration engine (core/calibration.js) across all 5 tracks a
// language pack defines (data/calibration-tracks.js), interleaved round-robin,
// capped at 4 rounds/track = 20 questions max. This module only knows how to
// render a question shape ('sentence' | 'decoding' | 'grammar') and drive the
// session loop — it holds no Ukrainian-specific knowledge itself.
import {
  createCalibrationSession,
  nextProbe,
  recordCalibrationAnswer,
  isSessionDone,
  getSessionResults,
  isFluentResponse,
} from '../core/calibration.js';
import { CALIBRATION_TRACKS, applyCalibrationResults, cefrForTier } from '../data/calibration-tracks.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { shuffle } from '../core/random.js';
import { escapeHtml } from './dom-utils.js';

const TRACKS_BY_ID = new Map(CALIBRATION_TRACKS.map((t) => [t.id, t]));
const LEVEL_LABEL = {
  beginner: 'Beginner (Survival)',
  b1: 'Intermediate (B1)',
  b2: 'Upper-Intermediate (B2)',
  c1: 'Advanced (C1)',
};

// Normalizes each track's `pick()` shape into what the renderer needs, without
// the renderer needing to know each track's field names.
function questionView(track, q) {
  if (track.kind === 'sentence') {
    return {
      promptLabel: 'Select the correct English meaning:',
      mainText: q.uk,
      translitText: track.showTranslit ? q.translit : null,
      options: shuffle([q.en, ...q.distractors]),
      correctText: q.en,
      usedKey: q.uk,
    };
  }
  if (track.kind === 'decoding') {
    return {
      promptLabel: 'Which is the correct transliteration?',
      mainText: q.uk,
      translitText: null,
      options: shuffle([q.correctTranslit, ...q.distractors]),
      correctText: q.correctTranslit,
      usedKey: q.id,
    };
  }
  // grammar
  return {
    promptLabel: track.id === 'verbPerson' ? 'Who is doing this?' : 'Which grammatical case is this?',
    mainText: q.uk,
    translitText: track.showTranslit ? q.translit : null,
    options: shuffle([q.correctAnswer, ...q.distractors]),
    correctText: q.correctAnswer,
    usedKey: q.comboKey ?? null,
  };
}

export function renderCalibration(container, { onDone } = {}) {
  const progress = loadProgress();
  const session = createCalibrationSession(CALIBRATION_TRACKS.map((t) => t.id));
  const usedByTrack = new Map(CALIBRATION_TRACKS.map((t) => [t.id, new Set()]));
  const totalQuestions = session.maxQuestions;
  let questionsAnswered = 0;

  // comprehension and comprehensionNoTranslit deliberately share one sentence
  // pool — the gap between the two IS the signal ("does this person need the
  // crutch"). But that only measures anything if each track sees genuinely
  // fresh sentences: if a learner gets a sentence right on comprehension,
  // then sees the SAME sentence again on comprehensionNoTranslit a moment
  // later, a correct answer the second time proves nothing about reading
  // without transliteration — it just proves short-term recall of a sentence
  // they saw 30 seconds ago. Sharing one used-set between the two tracks
  // forces each to draw a different sentence at the same difficulty tier
  // (there are 4 per tier, comfortably enough), so the comparison is honest.
  const sharedComprehensionUsed = new Set();
  usedByTrack.set('comprehension', sharedComprehensionUsed);
  usedByTrack.set('comprehensionNoTranslit', sharedComprehensionUsed);

  // Rare fallback only: if a tier's 4-sentence pool is ever genuinely
  // exhausted by both tracks combined, pickComprehensionQuestion falls back
  // to reusing one — flag that specific case honestly rather than let a
  // repeat look like the app is stuck.
  const seenSentenceTexts = new Set();

  function shell(bodyHtml) {
    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <div class="diagnostic-progress">Placement &middot; Question ${Math.min(questionsAnswered + 1, totalQuestions)}/${totalQuestions}</div>
        </header>
        <div class="diagnostic-body">${bodyHtml}</div>
      </div>
    `;
    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
  }

  function renderNext() {
    if (isSessionDone(session)) return renderSummary();
    const probe = nextProbe(session);
    if (!probe) return renderSummary();
    const track = TRACKS_BY_ID.get(probe.trackId);
    const used = usedByTrack.get(probe.trackId);
    const q = track.pick(probe.tier, used);
    renderQuestion(track, probe.tier, q, used);
  }

  function renderQuestion(track, tier, q, used) {
    const view = questionView(track, q);
    if (view.usedKey !== null && view.usedKey !== undefined) used.add(view.usedKey);
    const startTime = Date.now();

    const isRepeatSentence = track.kind === 'sentence' && seenSentenceTexts.has(view.mainText);
    if (track.kind === 'sentence') seenSentenceTexts.add(view.mainText);

    shell(`
      <p class="diagnostic-prompt-label">${view.promptLabel}</p>
      ${isRepeatSentence ? `<p style="font-size: 12px; color: var(--warn); margin: 0 0 4px;">Same sentence as before — this time without the reading aid below.</p>` : ''}
      <div class="diagnostic-word" style="font-size: 21px; line-height: 1.35; margin: 16px 0;">${escapeHtml(view.mainText)}</div>
      ${view.translitText ? `<div class="diagnostic-translit" style="margin-bottom: 24px;">${escapeHtml(view.translitText)}</div>` : '<div style="margin-bottom: 24px;"></div>'}
      <div class="diagnostic-options diagnostic-options--wide">
        ${view.options.map((opt) => `<button class="option-btn" data-text="${escapeHtml(opt)}" style="font-size:14px; padding:10px 12px;">${escapeHtml(opt)}</button>`).join('')}
      </div>
    `);

    let answered = false;
    container.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const timeTaken = (Date.now() - startTime) / 1000;
        const wordCount = view.mainText.split(/\s+/).length;
        const isCorrect = btn.dataset.text === view.correctText;
        const fluent = isFluentResponse(isCorrect, timeTaken, wordCount);

        btn.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
        if (!isCorrect) {
          container.querySelectorAll('.option-btn').forEach((b) => {
            if (b.dataset.text === view.correctText) b.classList.add('is-correct');
          });
        }

        recordCalibrationAnswer(session, track.id, tier, isCorrect, fluent);
        questionsAnswered += 1;
        setTimeout(renderNext, isCorrect ? 650 : 1100);
      });
    });
  }

  function renderSummary() {
    const results = getSessionResults(session);
    const { overallCefr } = applyCalibrationResults(progress, results);
    progress.meta.diagnosticCompletedAt = Date.now();
    saveProgress(progress);

    const readingGap = (results.comprehension && results.comprehensionNoTranslit)
      ? results.comprehension.tier - results.comprehensionNoTranslit.tier
      : 0;

    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <div class="diagnostic-progress">Results</div>
        </header>
        <div class="diagnostic-body diagnostic-summary" style="text-align: left; align-items: flex-start; justify-content: flex-start;">
          <h2 style="color: var(--accent); margin-bottom: 6px;">Placement Profile</h2>
          <p style="margin: 0 0 16px 0; font-size: 14px; color: var(--text-dim); line-height: 1.4;">
            ${questionsAnswered} questions across 5 tracks mapped roughly where you're strong and where to prioritize first. This isn't the same as completing a lesson — it's a starting point that keeps recalibrating as you drill.
          </p>

          <div style="background: var(--surface-2); border: 1px solid var(--border); padding: 14px; border-radius: var(--radius-sm); width: 100%; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 15px;">
              <span>Overall level:</span>
              <strong style="color: var(--good);">${LEVEL_LABEL[overallCefr]}</strong>
            </div>
            <hr style="border: 0; border-top: 1px solid var(--border); margin: 4px 0;" />
            ${CALIBRATION_TRACKS.map((t) => {
              const r = results[t.id];
              const label = r ? LEVEL_LABEL[cefrForTier(r.tier)] + (r.soft ? ' (shaky)' : '') : 'not reached';
              return `
                <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-dim);">
                  <span>${escapeHtml(t.label)}</span>
                  <strong style="color: var(--text);">${escapeHtml(label)}</strong>
                </div>
              `;
            }).join('')}
          </div>

          ${readingGap > 0 ? `
            <p style="font-size: 13px; color: var(--warn); line-height: 1.45; margin-bottom: 16px;">
              You read noticeably better with transliteration on than without — that gap is exactly what future drills will wean down over time.
            </p>
          ` : ''}

          <button class="btn-primary" id="calibration-continue">Go to Practice Drills</button>
        </div>
      </div>
    `;

    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
    container.querySelector('#calibration-continue').addEventListener('click', () => onDone && onDone());
  }

  renderNext();
}

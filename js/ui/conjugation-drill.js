// Standalone conjugation cycler — "cycle through top verbs with different
// conjugations in pairs" (want/can/have to/like × I/you/he/she/we/they ×
// a growing infinitive pool). Deliberately separate from the adaptive
// Drill/SRS system: this is rapid-fire exposure practice, not a graded
// quiz, so it doesn't record answers or affect "known" status anywhere.
import { PRONOUNS, MODALS, conjugate } from '../data/conjugation.js';
import { getInfinitiveVocabItems, bareInfinitiveEn } from '../data/substitution-fills.js';
import { hasBeenSeen } from '../core/srs.js';
import { loadProgress } from '../core/storage.js';
import { escapeHtml } from './dom-utils.js';
import { speakUkrainian, canSpeakUkrainian } from '../core/speech.js';

// Whether English needs "to" before the following verb depends on the
// specific modal, not just a fixed template — true modal auxiliaries
// (can) take a bare infinitive, while want/like (ordinary verbs) and
// "have to" (already contains "to") each behave differently. Building the
// whole sentence per-modal avoids a generic "${modal} to ${verb}" template
// that would be wrong for two of these four (see the bug this replaced:
// "I have to to like").
function englishSentence(modal, pronoun, infinitiveEn) {
  const is3rd = pronoun.uk === 'він' || pronoun.uk === 'вона';
  if (modal.uk === 'хотіти') return `${pronoun.en} ${is3rd ? 'wants' : 'want'} to ${infinitiveEn}.`;
  if (modal.uk === 'любити') return `${pronoun.en} ${is3rd ? 'likes' : 'like'} to ${infinitiveEn}.`;
  if (modal.uk === 'могти') return `${pronoun.en} can ${infinitiveEn}.`;
  if (modal.uk === 'мусити') return `${pronoun.en} ${is3rd ? 'has' : 'have'} to ${infinitiveEn}.`;
  return `${pronoun.en} ${modal.en} ${infinitiveEn}.`;
}

// "top X, dynamic based on those learnt" — prioritize infinitives the
// learner has actually encountered in real Drill practice; only fall back
// to the full catalog while that set is still too small to feel like real
// variety (mirrors the same fallback pattern used by pool.js elsewhere).
const MIN_SEEN_POOL = 12;
function getDynamicInfinitivePool(progress) {
  const all = getInfinitiveVocabItems();
  const seen = all.filter((item) => hasBeenSeen(progress, item.id));
  return seen.length >= MIN_SEEN_POOL ? seen : all;
}

function buildCombo(activeModals, infinitivePool) {
  const modal = activeModals[Math.floor(Math.random() * activeModals.length)];
  const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
  const infinitive = infinitivePool[Math.floor(Math.random() * infinitivePool.length)];
  const conj = conjugate(modal, pronoun);

  const uk = `${pronoun.uk} ${conj.uk} ${infinitive.uk}.`;
  const translit = `${pronoun.translit} ${conj.translit} ${infinitive.translit}.`;
  const en = englishSentence(modal, pronoun, bareInfinitiveEn(infinitive.en));

  return { uk, translit, en, modal, pronoun, infinitive };
}

export function renderConjugationDrill(container, { onExit } = {}) {
  const progress = loadProgress();
  const settings = progress.meta.settings;
  const infinitivePool = getDynamicInfinitivePool(progress);
  const usingSeenPool = infinitivePool.length < getInfinitiveVocabItems().length;

  let speechAvailable = true;
  canSpeakUkrainian().then((ok) => {
    speechAvailable = ok;
    if (!ok) container.querySelectorAll('.speak-btn').forEach((b) => b.remove());
  });

  const activeModalKeys = new Set(MODALS.map((m) => m.uk));

  container.innerHTML = `
    <div class="conjugation-screen">
      <header class="lessons-header" style="display: flex; justify-content: space-between; align-items: center;">
        <button class="btn-back" type="button">&larr; Menu</button>
        <h2>Conjugation Cycle</h2>
      </header>
      <p class="home-subtitle" style="margin-bottom: 4px;">Cycle through want/can/have to/like combined with ${infinitivePool.length} verbs${usingSeenPool ? " you've encountered" : ' (full catalog — practice more to grow this pool)'}.</p>

      <div class="conjugation-modal-filters">
        ${MODALS.map((m) => `
          <label class="conjugation-modal-chip">
            <input type="checkbox" class="conj-modal-chk" value="${escapeHtml(m.uk)}" checked />
            <span>${escapeHtml(m.uk)} <span class="conjugation-modal-en">(${escapeHtml(m.en)})</span></span>
          </label>
        `).join('')}
      </div>

      <div class="conjugation-card">
        <div class="conjugation-uk" id="conj-uk"></div>
        <div class="conjugation-translit" id="conj-translit"></div>
        <div class="conjugation-en" id="conj-en"></div>
      </div>

      <button class="btn-primary conjugation-next-btn" id="conj-next-btn" type="button">Next &rarr;</button>
    </div>
  `;

  const backBtn = container.querySelector('.btn-back');
  const ukEl = container.querySelector('#conj-uk');
  const translitEl = container.querySelector('#conj-translit');
  const enEl = container.querySelector('#conj-en');
  const nextBtn = container.querySelector('#conj-next-btn');
  const modalChks = container.querySelectorAll('.conj-modal-chk');

  function activeModals() {
    const active = MODALS.filter((m) => activeModalKeys.has(m.uk));
    return active.length ? active : MODALS;
  }

  function showNext() {
    const combo = buildCombo(activeModals(), infinitivePool);
    ukEl.innerHTML = `${escapeHtml(combo.uk)} ${speechAvailable ? '<button type="button" class="speak-btn" aria-label="Play pronunciation" title="Play pronunciation">🔊</button>' : ''}`;
    translitEl.textContent = settings.transliteration ? combo.translit : '';
    translitEl.style.display = settings.transliteration ? '' : 'none';
    enEl.textContent = combo.en;

    const speakBtn = ukEl.querySelector('.speak-btn');
    if (speakBtn) {
      speakBtn.addEventListener('click', (e) => { e.stopPropagation(); speakUkrainian(combo.uk); });
    }
    if (speechAvailable && settings.autoSpeak) speakUkrainian(combo.uk);
  }

  modalChks.forEach((chk) => {
    chk.addEventListener('change', () => {
      if (chk.checked) activeModalKeys.add(chk.value);
      else activeModalKeys.delete(chk.value);
      // Guard against an empty filter — same "restore rather than break"
      // pattern as Settings, including the same explicit alert() so the
      // restore doesn't look like the click silently didn't register.
      if (activeModalKeys.size === 0) {
        modalChks.forEach((c) => { c.checked = true; activeModalKeys.add(c.value); });
        alert('At least one modal verb must stay checked!');
      }
    });
  });

  nextBtn.addEventListener('click', showNext);
  backBtn.addEventListener('click', () => { onExit && onExit(); });

  showNext();

  return { cleanup: () => {} };
}

// Standalone conjugation cycler — "cycle through top verbs with different
// conjugations in pairs" (12 verbs that govern an infinitive — want, can,
// have to, like, start, try, forget, promise, plan, decide, continue, be
// afraid — × I/you/he/she/we/they × a growing infinitive pool).
//
// Two modes:
//  - Cycle: passive flashcard exposure, no correctness signal — doesn't
//    touch the vocab tracker (there's nothing to grade).
//  - Test: three togglable formats, all defaulting on ("I can test all,
//    allow me to select which types are active"). Every one keeps the
//    conjugated ending GIVEN, never quizzed — per explicit feedback, the
//    ending is "easy to pick" once you know the pattern; knowing WHICH
//    verb root a meaning maps to is the actual hard part. Test-mode
//    answers now DO feed core/srs.js's evidence tracking for the
//    infinitive being tested (same isItemKnown bar the main Drill uses) —
//    genuine recall demonstrated here is genuine recall, full stop; the
//    earlier "deliberately separate, doesn't affect known status" design
//    was wrong given real usage (an hour of 76%-correct Test-mode play
//    should move the vocabulary tracker, not leave it stuck at 1 word).
//    - Fill the Blank: pronoun+modal given, pick the missing root from 4
//      tiles (or vice versa) — the original test type.
//    - Pick the Pair: English shown, select the 2 correct Ukrainian words
//      (conjugated modal + infinitive) out of a 6-tile haystack.
//    - Type the Meaning: Ukrainian shown complete, type the English —
//      the one typing variant, but English (not Ukrainian) so there's no
//      Cyrillic spelling risk.
import { PRONOUNS, MODALS, conjugate } from '../data/conjugation.js';
import { getInfinitiveVocabItems, bareInfinitiveEn } from '../data/substitution-fills.js';
import { shuffle } from '../core/random.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { recordAnswer } from '../core/srs.js';
import { escapeHtml } from './dom-utils.js';
import { speakUkrainian, canSpeakUkrainian } from '../core/speech.js';
import { getFuzzyRatio } from '../core/fuzzy.js';

const TEST_TYPES = [
  { key: 'fill-blank', label: 'Fill the Blank', desc: 'Pick the missing verb root from 4 tiles.' },
  { key: 'pick-pair', label: 'Pick the Pair', desc: 'English shown — select the 2 correct Ukrainian words from 6.' },
  { key: 'type-english', label: 'Type the Meaning', desc: 'Ukrainian shown — type the English translation.' },
];

// Draws from the FULL infinitive catalog, not just already-seen verbs —
// restricting to "known" words defeated the point of a broad exposure
// drill (you only ever get quizzed on what you already know). The pool
// grows as the catalog grows; hasBeenSeen is unused here now but the
// import stays for other call sites that still want it.
function getDynamicInfinitivePool() {
  return getInfinitiveVocabItems();
}

function buildCombo(activeModals, infinitivePool) {
  const modal = activeModals[Math.floor(Math.random() * activeModals.length)];
  const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
  const infinitive = infinitivePool[Math.floor(Math.random() * infinitivePool.length)];
  const conj = conjugate(modal, pronoun);

  const uk = `${pronoun.uk} ${conj.uk} ${infinitive.uk}.`;
  const translit = `${pronoun.translit} ${conj.translit} ${infinitive.translit}.`;
  const en = modal.englishFor(pronoun, bareInfinitiveEn(infinitive.en));

  return { uk, translit, en, modal, pronoun, conj, infinitive };
}

// Distractors scored by actual string similarity (the same Levenshtein
// ratio used for typed-answer matching elsewhere), not just a first-letter/
// length-bucket heuristic — a much more genuine "phonetically/visually
// similar" signal, which is what actually causes real mix-ups between two
// verbs. Drawn from the FULL catalog (not a learned-only subset) so
// distractors keep exposing verbs you don't know yet, same as the correct
// answer now does.
function pickInfinitiveDistractors(correctItem, pool, n = 3) {
  const scored = pool
    .filter((c) => c.id !== correctItem.id)
    .map((c) => ({ c, score: getFuzzyRatio(c.uk, correctItem.uk) }))
    .sort((a, b) => b.score - a.score || Math.random() - 0.5);

  const picked = scored.slice(0, n).map((x) => x.c);
  if (picked.length < n) {
    const pickedIds = new Set(picked.map((p) => p.id));
    const remaining = shuffle(pool.filter((c) => c.id !== correctItem.id && !pickedIds.has(c.id)));
    picked.push(...remaining.slice(0, n - picked.length));
  }
  return picked;
}

// Same "root recognition, not conjugation" principle applied to the OTHER
// verb slot — blank the modal instead of the infinitive sometimes, so it's
// not always the same word position being tested. Every option is already
// correctly conjugated for the shown pronoun (only the ROOT differs
// between choices), so this still never tests the ending. The English
// prompt is what pins down a single correct answer either way — Ukrainian
// grammar alone doesn't disambiguate which modal/verb fits a blank (many
// would be grammatical), but "they have to like" only maps to one.
function pickModalDistractors(correctModal, pronoun, n = 3) {
  const firstLetter = correctModal.uk[0];
  const scored = MODALS
    .filter((m) => m.uk !== correctModal.uk)
    .map((m) => ({ m, score: m.uk[0] === firstLetter ? 1 : 0 }))
    .sort((a, b) => b.score - a.score || Math.random() - 0.5);
  return shuffle(scored.slice(0, Math.max(n, 6)).map((x) => x.m)).slice(0, n).map((m) => conjugate(m, pronoun).uk);
}

export function renderConjugationDrill(container, { onExit } = {}) {
  const progress = loadProgress();
  const settings = progress.meta.settings;
  const infinitivePool = getDynamicInfinitivePool();

  let speechAvailable = true;
  canSpeakUkrainian().then((ok) => {
    speechAvailable = ok;
    if (!ok) container.querySelectorAll('.speak-btn').forEach((b) => b.remove());
  });

  const activeModalKeys = new Set(MODALS.map((m) => m.uk));
  const activeTestTypeKeys = new Set(TEST_TYPES.map((t) => t.key));
  let mode = 'cycle'; // 'cycle' | 'test'
  let testCorrect = 0;
  let testTotal = 0;

  container.innerHTML = `
    <div class="conjugation-screen">
      <header class="lessons-header" style="display: flex; justify-content: space-between; align-items: center;">
        <button class="btn-back" type="button">&larr; Menu</button>
        <h2>Conjugation Cycle</h2>
      </header>
      <p class="home-subtitle" style="margin-bottom: 4px;">${MODALS.length} verbs (want, can, have to, like, start, try...) combined with all ${infinitivePool.length} verbs in the catalog — including ones you haven't drilled yet.</p>

      <div class="conjugation-mode-toggle">
        <button type="button" class="conjugation-mode-btn is-active" data-mode="cycle">🔄 Cycle</button>
        <button type="button" class="conjugation-mode-btn" data-mode="test">✅ Test</button>
        <span class="conjugation-score" id="conj-score" style="display: none;"></span>
      </div>

      <details class="stats-accordion conjugation-options-accordion">
        <summary>⚙️ Options</summary>
        <div class="conjugation-test-type-filters" id="conj-test-type-filters" style="display: none;">
          <div class="conjugation-options-label">Active test types</div>
          ${TEST_TYPES.map((t) => `
            <label class="conjugation-modal-chip">
              <input type="checkbox" class="conj-testtype-chk" value="${t.key}" checked />
              <span>${escapeHtml(t.label)} <span class="conjugation-modal-en">(${escapeHtml(t.desc)})</span></span>
            </label>
          `).join('')}
        </div>

        <div class="conjugation-options-label">Active verbs (want, can, have to...)</div>
        <div class="conjugation-modal-filters">
          ${MODALS.map((m) => `
            <label class="conjugation-modal-chip">
              <input type="checkbox" class="conj-modal-chk" value="${escapeHtml(m.uk)}" checked />
              <span>${escapeHtml(m.uk)} <span class="conjugation-modal-en">(${escapeHtml(m.enLabel)})</span></span>
            </label>
          `).join('')}
        </div>
      </details>

      <div id="conj-round-area"></div>
    </div>
  `;

  const backBtn = container.querySelector('.btn-back');
  const roundArea = container.querySelector('#conj-round-area');
  const modalChks = container.querySelectorAll('.conj-modal-chk');
  const testTypeChks = container.querySelectorAll('.conj-testtype-chk');
  const testTypeFiltersEl = container.querySelector('#conj-test-type-filters');
  const scoreEl = container.querySelector('#conj-score');
  const modeBtns = container.querySelectorAll('.conjugation-mode-btn');

  function activeModals() {
    const active = MODALS.filter((m) => activeModalKeys.has(m.uk));
    return active.length ? active : MODALS;
  }
  function activeTestTypes() {
    const active = TEST_TYPES.filter((t) => activeTestTypeKeys.has(t.key));
    return active.length ? active : TEST_TYPES;
  }

  function speakerBtnHtml() {
    return speechAvailable ? '<button type="button" class="speak-btn" aria-label="Play pronunciation" title="Play pronunciation">🔊</button>' : '';
  }
  function wireSpeaker(root, ukText) {
    const btn = root.querySelector('.speak-btn');
    if (btn) btn.addEventListener('click', (e) => { e.stopPropagation(); speakUkrainian(ukText); });
  }

  // Explicit escape hatch for every test type — especially Type the
  // Meaning, where there's otherwise no way to get past a word you
  // genuinely don't know without typing something just to move on.
  function idkBtnHtml() {
    return `<button type="button" class="btn-text conjugation-idk-btn" id="conj-idk-btn" style="color: var(--text-dim); text-decoration: none; font-size: 13px; margin-top: 10px;">I don't know</button>`;
  }
  function wireIdk(root, onIdk) {
    const btn = root.querySelector('#conj-idk-btn');
    if (btn) btn.addEventListener('click', onIdk);
  }

  // --- CYCLE MODE ---
  function renderCycleRound() {
    const combo = buildCombo(activeModals(), infinitivePool);
    roundArea.innerHTML = `
      <div class="conjugation-card">
        <div class="conjugation-uk">${escapeHtml(combo.uk)} ${speakerBtnHtml()}</div>
        <div class="conjugation-translit" style="display: ${settings.transliteration ? '' : 'none'};">${settings.transliteration ? escapeHtml(combo.translit) : ''}</div>
        <div class="conjugation-en">${escapeHtml(combo.en)}</div>
      </div>
      <button class="btn-primary conjugation-next-btn" id="conj-next-btn" type="button">Next &rarr;</button>
    `;
    wireSpeaker(roundArea, combo.uk);
    roundArea.querySelector('#conj-next-btn').addEventListener('click', renderCycleRound);
    if (speechAvailable && settings.autoSpeak) speakUkrainian(combo.uk);
  }

  function recordTestResult(isCorrect) {
    testTotal += 1;
    if (isCorrect) testCorrect += 1;
    updateScore();
  }

  // Feeds the SAME evidence tracking the main Drill uses (core/srs.js's
  // isItemKnown) for the infinitive actually being tested this round —
  // see the file header for why this changed from "never records".
  function recordVocabEvidence(infinitiveId, direction, isCorrect, modality, isIdk = false) {
    recordAnswer(progress, infinitiveId, direction, isCorrect, isIdk, null, modality);
    saveProgress(progress);
  }

  // showEnglish: Type the Meaning shows the Ukrainian as the PROMPT already
  // (you're reading it, not guessing it) — what you actually asked for on
  // "I don't know" or a wrong guess there is the English answer, not the
  // Ukrainian sentence you already saw. The other two test types blank the
  // Ukrainian, so revealing it is the right answer for those.
  function feedbackBlockHtml(isCorrect, combo, { showEnglish = false } = {}) {
    const headline = showEnglish ? escapeHtml(combo.en) : `${escapeHtml(combo.uk)} ${speakerBtnHtml()}`;
    return `
      <div class="${isCorrect ? 'conjugation-feedback-good' : 'conjugation-feedback-bad'}">${isCorrect ? '✓ Correct' : '✗ Not quite'} — ${headline}</div>
      ${showEnglish ? `<div class="conjugation-uk" style="font-size: 16px; margin-top: 4px;">${escapeHtml(combo.uk)} ${speakerBtnHtml()}</div>` : ''}
      <div class="conjugation-translit" style="display: ${settings.transliteration ? '' : 'none'};">${settings.transliteration ? escapeHtml(combo.translit) : ''}</div>
      <button class="btn-primary conjugation-next-btn" id="conj-next-btn" type="button">Next &rarr;</button>
    `;
  }
  function wireFeedbackNext(feedbackEl, combo) {
    wireSpeaker(feedbackEl, combo.uk);
    feedbackEl.querySelector('#conj-next-btn').addEventListener('click', renderTestRound);
    if (speechAvailable && settings.autoSpeak) speakUkrainian(combo.uk);
  }

  // --- TEST TYPE 1: Fill the Blank — infinitive OR modal is blanked,
  // ending is always given (never the thing being tested). ---
  function renderFillBlankRound() {
    const combo = buildCombo(activeModals(), infinitivePool);
    const blankModal = Math.random() < 0.5;

    let optionTexts, correctText, blankedUk;
    if (blankModal) {
      correctText = combo.conj.uk;
      optionTexts = shuffle([correctText, ...pickModalDistractors(combo.modal, combo.pronoun, 3)]);
      blankedUk = `${combo.pronoun.uk} ___ ${combo.infinitive.uk}.`;
    } else {
      correctText = combo.infinitive.uk;
      optionTexts = shuffle([correctText, ...pickInfinitiveDistractors(combo.infinitive, infinitivePool, 3).map((d) => d.uk)]);
      blankedUk = `${combo.pronoun.uk} ${combo.conj.uk} ___.`;
    }

    roundArea.innerHTML = `
      <div class="conjugation-card">
        <div class="conjugation-en" style="margin-bottom: 6px;">${escapeHtml(combo.en)}</div>
        <div class="conjugation-uk" style="font-size: 20px;">${escapeHtml(blankedUk)}</div>
      </div>
      <div class="conjugation-test-options">
        ${optionTexts.map((opt) => `<button type="button" class="conjugation-test-option">${escapeHtml(opt)}</button>`).join('')}
      </div>
      ${idkBtnHtml()}
      <div class="conjugation-test-feedback" id="conj-test-feedback"></div>
    `;

    let locked = false;
    const feedbackEl = roundArea.querySelector('#conj-test-feedback');
    function reveal(isCorrect, isIdk = false) {
      if (locked) return;
      locked = true;
      recordTestResult(isCorrect);
      // Only the infinitive slot counts as vocabulary evidence — when the
      // MODAL was blanked instead, the infinitive was given/shown, not
      // tested, so recording it here would be false credit.
      if (!blankModal) recordVocabEvidence(combo.infinitive.id, 'en2uk', isCorrect, 'mc', isIdk);
      roundArea.querySelectorAll('.conjugation-test-option').forEach((b) => {
        if (b.textContent.trim() === correctText) b.classList.add('is-correct');
      });
      feedbackEl.innerHTML = feedbackBlockHtml(isCorrect, combo);
      wireFeedbackNext(feedbackEl, combo);
    }
    roundArea.querySelectorAll('.conjugation-test-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (locked) return;
        const isCorrect = btn.textContent.trim() === correctText;
        if (!isCorrect) btn.classList.add('is-incorrect');
        reveal(isCorrect);
      });
    });
    wireIdk(roundArea, () => reveal(false, true));
  }

  // --- TEST TYPE 2: Pick the Pair — English shown, select the 2 correct
  // Ukrainian words (conjugated modal + infinitive) from a 6-tile haystack
  // mixing both kinds of decoys. Pronoun is given as context, not tested
  // (it's a much simpler fact, well covered elsewhere in the app). ---
  function renderPickPairRound() {
    const combo = buildCombo(activeModals(), infinitivePool);
    const modalDecoys = pickModalDistractors(combo.modal, combo.pronoun, 2);
    const infDecoys = pickInfinitiveDistractors(combo.infinitive, infinitivePool, 2).map((d) => d.uk);
    const correctSet = new Set([combo.conj.uk, combo.infinitive.uk]);
    const tiles = shuffle([combo.conj.uk, combo.infinitive.uk, ...modalDecoys, ...infDecoys]);

    roundArea.innerHTML = `
      <div class="conjugation-card">
        <div class="conjugation-en" style="margin-bottom: 6px;">${escapeHtml(combo.en)}</div>
        <div class="conjugation-pronoun-hint">Pronoun: <strong>${escapeHtml(combo.pronoun.uk)}</strong> (${escapeHtml(combo.pronoun.en)}) — select the 2 words that complete it</div>
      </div>
      <div class="conjugation-test-options conjugation-haystack">
        ${tiles.map((t) => `<button type="button" class="conjugation-test-option">${escapeHtml(t)}</button>`).join('')}
      </div>
      ${idkBtnHtml()}
      <div class="conjugation-test-feedback" id="conj-test-feedback"></div>
    `;

    let locked = false;
    const selected = [];
    const feedbackEl = roundArea.querySelector('#conj-test-feedback');
    function reveal(isCorrect, isIdk = false) {
      if (locked) return;
      locked = true;
      recordTestResult(isCorrect);
      // Both slots are tested at once here — overall correctness is the
      // closest available signal for whether the infinitive was correctly
      // identified as half of the pair.
      recordVocabEvidence(combo.infinitive.id, 'en2uk', isCorrect, 'mc', isIdk);
      roundArea.querySelectorAll('.conjugation-test-option').forEach((b) => {
        if (correctSet.has(b.textContent.trim())) b.classList.add('is-correct');
      });
      feedbackEl.innerHTML = feedbackBlockHtml(isCorrect, combo);
      wireFeedbackNext(feedbackEl, combo);
    }
    roundArea.querySelectorAll('.conjugation-test-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (locked) return;
        if (btn.classList.contains('is-selected')) {
          btn.classList.remove('is-selected');
          const idx = selected.indexOf(btn);
          if (idx >= 0) selected.splice(idx, 1);
          return;
        }
        if (selected.length >= 2) return;
        btn.classList.add('is-selected');
        selected.push(btn);

        if (selected.length === 2) {
          const picked = new Set(selected.map((b) => b.textContent.trim()));
          const isCorrect = picked.size === correctSet.size && [...picked].every((v) => correctSet.has(v));
          if (!isCorrect) selected.forEach((b) => b.classList.add('is-incorrect'));
          reveal(isCorrect);
        }
      });
    });
    wireIdk(roundArea, () => reveal(false, true));
  }

  // --- TEST TYPE 3: Type the Meaning — Ukrainian shown complete, type the
  // English. The one typing variant, but into English (no Cyrillic
  // spelling risk) — fuzzy-matched the same way as the main Drill screen. ---
  function renderTypeEnglishRound() {
    const combo = buildCombo(activeModals(), infinitivePool);
    roundArea.innerHTML = `
      <div class="conjugation-card">
        <div class="conjugation-uk">${escapeHtml(combo.uk)} ${speakerBtnHtml()}</div>
        <div class="conjugation-translit" style="display: ${settings.transliteration ? '' : 'none'};">${settings.transliteration ? escapeHtml(combo.translit) : ''}</div>
        <input type="text" class="drill-text-input" id="conj-type-input" placeholder="Type the English meaning..." autocomplete="off" style="margin-top: 12px;" />
        <button class="btn-primary" id="conj-type-submit" style="width: 100%; margin-top: 10px;">Check</button>
        ${idkBtnHtml()}
      </div>
      <div class="conjugation-test-feedback" id="conj-test-feedback"></div>
    `;
    wireSpeaker(roundArea, combo.uk);
    if (speechAvailable && settings.autoSpeak) speakUkrainian(combo.uk);

    const input = roundArea.querySelector('#conj-type-input');
    const submitBtn = roundArea.querySelector('#conj-type-submit');
    const feedbackEl = roundArea.querySelector('#conj-test-feedback');
    input.focus();

    let locked = false;
    function reveal(isCorrect, isIdk = false) {
      if (locked) return;
      locked = true;
      input.disabled = true;
      recordTestResult(isCorrect);
      // Typed translation of the full sentence — the strongest evidence
      // tier, same as the main Drill's semantic-match rounds.
      recordVocabEvidence(combo.infinitive.id, 'uk2en', isCorrect, 'freetext', isIdk);
      feedbackEl.innerHTML = feedbackBlockHtml(isCorrect, combo, { showEnglish: true });
      wireFeedbackNext(feedbackEl, combo);
    }
    function submit() {
      if (locked) return;
      const text = input.value.trim();
      if (!text) return;
      const score = getFuzzyRatio(text, combo.en);
      reveal(score >= 0.72);
    }
    submitBtn.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
    wireIdk(roundArea, () => reveal(false, true));
  }

  const TEST_RENDERERS = {
    'fill-blank': renderFillBlankRound,
    'pick-pair': renderPickPairRound,
    'type-english': renderTypeEnglishRound,
  };

  function renderTestRound() {
    const types = activeTestTypes();
    const type = types[Math.floor(Math.random() * types.length)];
    TEST_RENDERERS[type.key]();
  }

  function updateScore() {
    scoreEl.style.display = '';
    scoreEl.textContent = `${testCorrect} / ${testTotal}`;
  }

  function renderCurrentMode() {
    testTypeFiltersEl.style.display = mode === 'test' ? '' : 'none';
    if (mode === 'cycle') {
      scoreEl.style.display = 'none';
      renderCycleRound();
    } else {
      renderTestRound();
    }
  }

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      mode = btn.dataset.mode;
      modeBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      renderCurrentMode();
    });
  });

  testTypeChks.forEach((chk) => {
    chk.addEventListener('change', () => {
      if (chk.checked) activeTestTypeKeys.add(chk.value);
      else activeTestTypeKeys.delete(chk.value);
      if (activeTestTypeKeys.size === 0) {
        testTypeChks.forEach((c) => { c.checked = true; activeTestTypeKeys.add(c.value); });
        alert('At least one test type must stay enabled!');
      }
    });
  });

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

  backBtn.addEventListener('click', () => { onExit && onExit(); });

  renderCurrentMode();

  return { cleanup: () => {} };
}

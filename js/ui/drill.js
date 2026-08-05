import { buildCardPool, pickDistractors, promptText, answerText } from '../core/pool.js';
import { drawCard, cardKey, recordAnswer } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { attachSwipeGesture, attachKeyboardNav } from './gesture.js';
import { WORD_MODALS } from '../data/word-modals.js';

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

// Simple Levenshtein fuzzy string distance ratio
function getFuzzyRatio(s1, s2) {
  const a = s1.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g, "");
  const b = s2.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g, "");

  if (a === b) return 1.0;

  const m = a.length;
  const n = b.length;
  if (m === 0 || n === 0) return 0.0;

  const d = [];
  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = (a[i - 1] === b[j - 1]) ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }
  return 1.0 - (d[m][n] / Math.max(m, n));
}

const POSITIONS = ['up', 'down', 'left', 'right'];

export function renderDrill(container, { onExit } = {}) {
  const progress = loadProgress();
  const cardPool = buildCardPool();
  let lastKey = null;
  let sessionCorrect = 0;
  let sessionTotal = 0;
  let currentRound = null;
  let gestureHandle = null;
  let removeKeyboard = null;

  container.innerHTML = `
    <div class="drill-screen">
      <header class="drill-header">
        <button class="btn-back" type="button">&larr; Menu</button>
        <div class="drill-score">0 / 0</div>
      </header>
      <div class="drill-grid-container" style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; min-height: 380px;">
        <!-- Dynamic drill area populated by nextRound -->
      </div>

      <!-- General control elements -->
      <div style="display: flex; gap: 8px; justify-content: center; align-items: center; margin-top: 12px;">
        <button class="btn-idk" id="drill-idk-btn">I Don't Know</button>
      </div>
      <p class="drill-hint" id="drill-action-hint">Swipe, click, or use arrow keys to answer.</p>
    </div>
  `;

  const backBtn = container.querySelector('.btn-back');
  const scoreEl = container.querySelector('.drill-score');
  const gridContainer = container.querySelector('.drill-grid-container');
  const idkBtn = container.querySelector('#drill-idk-btn');
  const hintEl = container.querySelector('#drill-action-hint');

  function updateScore() {
    scoreEl.textContent = `${sessionCorrect} / ${sessionTotal}`;
  }

  // --- RENDERING MODAL ---
  function showWordModal(wordStr) {
    const normalized = wordStr.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g, "");
    const info = WORD_MODALS[normalized];

    const backdrop = document.createElement('div');
    backdrop.className = 'word-modal-backdrop';

    backdrop.innerHTML = `
      <div class="word-modal-content">
        <button class="word-modal-close" type="button">&times;</button>
        <div class="word-modal-title">${escapeHtml(wordStr)}</div>

        ${info ? `
          <div class="word-modal-section-title">Meanings / Context</div>
          <div class="word-modal-meanings">
            ${info.meanings.map(m => `&bull; ${escapeHtml(m)}`).join('<br>')}
          </div>
          ${info.related && info.related.length ? `
            <div class="word-modal-section-title">Related Forms / Alternatives</div>
            <div class="word-modal-related-list">
              ${info.related.map(r => `
                <div class="word-modal-related-item" data-word="${escapeHtml(r.word)}">
                  <span class="word-modal-related-word">${escapeHtml(r.word)}</span>
                  <span class="word-modal-related-en">${escapeHtml(r.en)}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        ` : `
          <div class="word-modal-section-title">Meanings / Context</div>
          <div class="word-modal-meanings" style="color: var(--text-dim); font-style: italic;">
            Slavic root cognate - check Czech comparisons in Lesson info.
          </div>
        `}
      </div>
    `;

    backdrop.querySelector('.word-modal-close').addEventListener('click', () => backdrop.remove());
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) backdrop.remove();
    });

    // Tapping on a related form can insert it dynamically
    backdrop.querySelectorAll('.word-modal-related-item').forEach(item => {
      item.addEventListener('click', () => {
        const replacementWord = item.dataset.word;
        backdrop.remove();

        // If there's a sentence builder active, let's inject or display it
        alert(`Alternative form selected: "${replacementWord}". Try using it in your constructed phrase!`);
      });
    });

    document.body.appendChild(backdrop);
  }

  // Convert raw sentence string into clickable word span tokens
  function tokenizeSentence(sentenceStr) {
    const tokens = sentenceStr.split(/([a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ’\']+)/);
    return tokens.map(token => {
      if (/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ’\']+$/.test(token)) {
        return `<span class="interactive-word-token" data-word="${escapeHtml(token)}">${escapeHtml(token)}</span>`;
      }
      return escapeHtml(token);
    }).join('');
  }

  function addTokenEventListeners(element) {
    element.querySelectorAll('.interactive-word-token').forEach(tok => {
      tok.addEventListener('click', (e) => {
        e.stopPropagation();
        showWordModal(tok.dataset.word);
      });
    });
  }

  function nextRound() {
    if (gestureHandle) {
      gestureHandle.destroy();
      gestureHandle = null;
    }
    if (removeKeyboard) {
      removeKeyboard();
      removeKeyboard = null;
    }

    const card = drawCard(progress, cardPool, lastKey);
    lastKey = cardKey(card);
    const { item, direction } = card;

    const isSentence = item.uk.split(' ').length > 2;

    // Determine exercise category:
    // A. For short words/phrases, use 4-choice swipe drill.
    // B. For long sentences:
    //    - If direction is uk2en, use English Semantic Matching (with fuzzy matching & Word-Level Modals).
    //    - If direction is en2uk, use Dynamic Sentence Builder.
    if (!isSentence) {
      renderStandardSwipeDrill(card);
    } else if (direction === 'uk2en') {
      renderSemanticMatchDrill(card);
    } else {
      renderSentenceBuilderDrill(card);
    }
  }

  // --- EXERCISE TYPE 1: STANDARD 4-CHOICE SWIPE ---
  function renderStandardSwipeDrill(card) {
    const { item, direction } = card;
    hintEl.textContent = 'Swipe, click, or use arrow keys to answer. Tap words for definitions.';

    gridContainer.innerHTML = `
      <div class="drill-grid" style="width: 100%;">
        <div class="tile tile-up" data-position="up"></div>
        <div class="tile tile-left" data-position="left"></div>
        <div class="drill-card" tabindex="0"></div>
        <div class="tile tile-right" data-position="right"></div>
        <div class="tile tile-down" data-position="down"></div>
      </div>
    `;

    const cardEl = gridContainer.querySelector('.drill-card');
    const tileEls = {
      up: gridContainer.querySelector('.tile-up'),
      down: gridContainer.querySelector('.tile-down'),
      left: gridContainer.querySelector('.tile-left'),
      right: gridContainer.querySelector('.tile-right'),
    };

    const distractors = pickDistractors(item, direction, 3);
    const options = shuffle([item, ...distractors]);
    const positions = shuffle(POSITIONS);
    const tiles = {};
    positions.forEach((pos, i) => { tiles[pos] = options[i]; });

    currentRound = { correctItem: item, direction, tiles, locked: false, type: 'swipe', cardEl, tileEls };

    const prompt = promptText(item, direction);
    cardEl.innerHTML = `
      <div class="drill-card-kind">${item.kind === 'pattern' ? 'phrase' : 'word'}</div>
      <div class="drill-card-main">${tokenizeSentence(prompt.main)}</div>
      ${prompt.translit ? `<div class="drill-card-translit">${escapeHtml(prompt.translit)}</div>` : ''}
    `;
    addTokenEventListeners(cardEl);

    cardEl.style.transition = '';
    cardEl.style.transform = 'translate(0, 0) rotate(0deg)';

    for (const pos of POSITIONS) {
      const tileItem = tiles[pos];
      const text = answerText(tileItem, direction);
      const showTranslit = direction === 'en2uk';
      tileEls[pos].innerHTML = `
        <div class="tile-text">${escapeHtml(text)}</div>
        ${showTranslit ? `<div class="tile-translit">${escapeHtml(tileItem.translit)}</div>` : ''}
      `;
    }

    function submit(position) {
      if (!currentRound || currentRound.locked || !currentRound.tiles[position]) return;
      currentRound.locked = true;
      const chosen = currentRound.tiles[position];
      const isCorrect = chosen.id === currentRound.correctItem.id;

      sessionTotal += 1;
      if (isCorrect) sessionCorrect += 1;
      updateScore();

      recordAnswer(progress, currentRound.correctItem.id, currentRound.direction, isCorrect);
      saveProgress(progress);

      cardEl.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
      tileEls[position].classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
      if (!isCorrect) {
        for (const pos of POSITIONS) {
          if (currentRound.tiles[pos].id === currentRound.correctItem.id) {
            tileEls[pos].classList.add('is-correct');
          }
        }
      }

      setTimeout(() => {
        gestureHandle && gestureHandle.reset();
        nextRound();
      }, isCorrect ? 450 : 1100);
    }

    gestureHandle = attachSwipeGesture(cardEl, { onCommit: (position) => submit(position) });
    removeKeyboard = attachKeyboardNav((position) => submit(position));
    for (const pos of POSITIONS) {
      tileEls[pos].addEventListener('click', () => submit(pos));
    }
  }

  // --- EXERCISE TYPE 2: UK2EN SEMANTIC MATCH ---
  function renderSemanticMatchDrill(card) {
    const { item, direction } = card;
    hintEl.textContent = 'Type the translation in English. Fuzzy meaning matching enabled! Tap words for definitions.';

    gridContainer.innerHTML = `
      <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; min-height: 280px; justify-content: center;">
        <div class="drill-card-kind">Advanced translation</div>
        <div class="drill-card-main" style="font-size: 20px; line-height: 1.4; text-align: center;">${tokenizeSentence(item.uk)}</div>
        <div class="drill-card-translit">${escapeHtml(item.translit)}</div>

        <input type="text" class="drill-text-input" placeholder="Type English translation..." id="semantic-input" autofocus autocomplete="off" />
        <button class="btn-primary" id="semantic-submit" style="width: 100%; margin-top: 10px;">Check Answer</button>
        <div id="semantic-feedback" style="font-size: 14px; text-align: center; margin-top: 8px;"></div>
      </div>
    `;

    const inputField = gridContainer.querySelector('#semantic-input');
    const submitBtn = gridContainer.querySelector('#semantic-submit');
    const feedbackEl = gridContainer.querySelector('#semantic-feedback');
    addTokenEventListeners(gridContainer);

    currentRound = { correctItem: item, direction, locked: false, type: 'semantic' };

    function checkAnswer() {
      if (currentRound.locked) return;
      const userText = inputField.value.trim();
      if (!userText) return;

      currentRound.locked = true;
      inputField.disabled = true;

      // Accepted semantic variants array
      const targetEn = item.en.toLowerCase();
      const rawUser = userText.toLowerCase();

      // Fuzzy score metric
      const score = getFuzzyRatio(rawUser, targetEn);
      const isCorrect = score >= 0.72; // highly lenient, accepts close matches

      sessionTotal += 1;
      if (isCorrect) sessionCorrect += 1;
      updateScore();

      recordAnswer(progress, item.id, direction, isCorrect);
      saveProgress(progress);

      if (isCorrect) {
        inputField.style.borderColor = 'var(--good)';
        feedbackEl.innerHTML = `<span style="color: var(--good); font-weight: bold;">Great! Meaning match: ${(score * 100).toFixed(0)}%</span>`;
      } else {
        inputField.style.borderColor = 'var(--bad)';
        feedbackEl.innerHTML = `
          <div style="color: var(--bad); font-weight: bold; margin-bottom: 4px;">Not quite! Close try.</div>
          <div style="color: var(--text-dim); font-size: 13px;">Correct Meaning: "${item.en}"</div>
        `;
      }

      setTimeout(nextRound, isCorrect ? 900 : 2500);
    }

    submitBtn.addEventListener('click', checkAnswer);
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkAnswer();
    });
  }

  // --- EXERCISE TYPE 3: EN2UK DYNAMIC SENTENCE BUILDER ---
  function renderSentenceBuilderDrill(card) {
    const { item, direction } = card;
    hintEl.textContent = 'Tap words to construct the Ukrainian phrase. Use modifiers to toggle forms!';

    // Break Ukrainian sentence into individual word chips
    const baseWords = item.uk.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g, "").split(/\s+/).filter(Boolean);
    const poolWords = shuffle([...baseWords]);

    // Track dynamic modifier variations (Gender, Formality, Negation)
    let currentGender = 'masculine';
    let currentFormality = 'informal';
    let currentNegated = false;

    gridContainer.innerHTML = `
      <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; min-height: 280px; justify-content: center;">
        <div class="drill-card-kind" style="margin-bottom: 4px;">Sentence Builder</div>
        <div class="drill-card-main" style="font-size: 18px; line-height: 1.4; text-align: center; color: var(--accent);">${escapeHtml(item.en)}</div>

        <!-- Builder Slots -->
        <div class="sentence-builder-slots" id="builder-slots">
          <!-- Populated dynamically -->
        </div>

        <!-- Word Pool -->
        <div class="sentence-builder-pool" id="builder-pool">
          <!-- Populated dynamically -->
        </div>

        <!-- Dynamic Modifiers (allow learners to toggle variations) -->
        <div class="modifiers-container">
          <button class="modifier-btn is-active" id="mod-gender">Male Speaker ♂️</button>
          <button class="modifier-btn" id="mod-formality">Informal 👥</button>
          <button class="modifier-btn" id="mod-negate">Not Negated ➕</button>
        </div>

        <button class="btn-primary" id="builder-submit" style="width: 100%; margin-top: 10px;">Check Construction</button>
        <div id="builder-feedback" style="font-size: 14px; text-align: center; margin-top: 6px;"></div>
      </div>
    `;

    const slotsEl = gridContainer.querySelector('#builder-slots');
    const poolEl = gridContainer.querySelector('#builder-pool');
    const submitBtn = gridContainer.querySelector('#builder-submit');
    const feedbackEl = gridContainer.querySelector('#builder-feedback');

    const genderBtn = gridContainer.querySelector('#mod-gender');
    const formalityBtn = gridContainer.querySelector('#mod-formality');
    const negateBtn = gridContainer.querySelector('#mod-negate');

    let currentSelection = [];
    currentRound = { correctItem: item, direction, locked: false, type: 'builder' };

    // Toggle dynamic modifiers and alter pool/correct strings
    genderBtn.addEventListener('click', () => {
      if (currentGender === 'masculine') {
        currentGender = 'feminine';
        genderBtn.textContent = 'Female Speaker ♀️';
        genderBtn.classList.add('is-active');
      } else {
        currentGender = 'masculine';
        genderBtn.textContent = 'Male Speaker ♂️';
        genderBtn.classList.add('is-active');
      }
      regenerateBuilderText();
    });

    formalityBtn.addEventListener('click', () => {
      if (currentFormality === 'informal') {
        currentFormality = 'formal';
        formalityBtn.textContent = 'Formal/Plural 👔';
        formalityBtn.classList.add('is-active');
      } else {
        currentFormality = 'informal';
        formalityBtn.textContent = 'Informal 👥';
        formalityBtn.classList.add('is-active');
      }
      regenerateBuilderText();
    });

    negateBtn.addEventListener('click', () => {
      currentNegated = !currentNegated;
      negateBtn.textContent = currentNegated ? 'Negated ➖' : 'Not Negated ➕';
      negateBtn.classList.toggle('is-active', currentNegated);
      regenerateBuilderText();
    });

    // Automatically adapt word chips based on chosen modifier variants
    function regenerateBuilderText() {
      // Clear selection
      currentSelection = [];
      slotsEl.innerHTML = '';

      let modifiedWords = [...poolWords];

      // Adapt words depending on filters
      modifiedWords = modifiedWords.map(w => {
        let wrd = w.toLowerCase();
        if (currentGender === 'feminine') {
          if (wrd === 'робив') return 'робила';
          if (wrd === 'хотів') return 'хотіла';
          if (wrd === 'пішов') return 'пішла';
        } else {
          if (wrd === 'робила') return 'робив';
          if (wrd === 'хотіла') return 'хотів';
          if (wrd === 'пішла') return 'пішов';
        }
        if (currentFormality === 'formal') {
          if (wrd === 'тобою') return 'вас';
          if (wrd === 'тебе') return 'вас';
        } else {
          if (wrd === 'вас' && baseWords.includes('тебе')) return 'тебе';
        }
        return w;
      });

      // Inject negation element if requested
      if (currentNegated && !modifiedWords.includes('не')) {
        modifiedWords.push('не');
      }

      poolEl.innerHTML = modifiedWords.map((word, index) => `
        <span class="sentence-chip" data-word="${escapeHtml(word)}" data-index="${index}">${escapeHtml(word)}</span>
      `).join('');

      poolEl.querySelectorAll('.sentence-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          if (currentRound.locked) return;
          if (chip.classList.contains('is-active')) {
            // Remove from slots
            chip.classList.remove('is-active');
            currentSelection = currentSelection.filter(item => item.index !== chip.dataset.index);
          } else {
            // Add to slots
            chip.classList.add('is-active');
            currentSelection.push({ word: chip.dataset.word, index: chip.dataset.index });
          }
          renderSlots();
        });
      });
    }

    function renderSlots() {
      slotsEl.innerHTML = currentSelection.map(item => `
        <span class="sub-chip" style="cursor: pointer; font-size: 15px; font-weight: 600;">${escapeHtml(item.word)}</span>
      `).join(' ');
    }

    function checkBuilder() {
      if (currentRound.locked) return;
      currentRound.locked = true;

      const builtPhrase = currentSelection.map(item => item.word.toLowerCase()).join(' ');
      const cleanTarget = item.uk.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g, "").trim();

      // Flexible matching for modifiers and word configurations
      const score = getFuzzyRatio(builtPhrase, cleanTarget);
      const isCorrect = score >= 0.85;

      sessionTotal += 1;
      if (isCorrect) sessionCorrect += 1;
      updateScore();

      recordAnswer(progress, item.id, direction, isCorrect);
      saveProgress(progress);

      if (isCorrect) {
        slotsEl.style.borderColor = 'var(--good)';
        feedbackEl.innerHTML = `<span style="color: var(--good); font-weight: bold;">Perfect phrase construction!</span>`;
      } else {
        slotsEl.style.borderColor = 'var(--bad)';
        feedbackEl.innerHTML = `
          <div style="color: var(--bad); font-weight: bold; margin-bottom: 4px;">Incorrect word order or missing form.</div>
          <div style="color: var(--text-dim); font-size: 13px;">Correct Pattern: "${item.uk}"</div>
        `;
      }

      setTimeout(nextRound, isCorrect ? 900 : 2500);
    }

    submitBtn.addEventListener('click', checkBuilder);
    regenerateBuilderText();
  }

  // --- I DON'T KNOW LOGIC ---
  idkBtn.addEventListener('click', () => {
    if (!currentRound || currentRound.locked) return;
    currentRound.locked = true;

    // Reset box to 0 with IDK flag
    recordAnswer(progress, currentRound.correctItem.id, currentRound.direction, false, true);
    saveProgress(progress);

    sessionTotal += 1;
    updateScore();

    // Feedback
    if (currentRound.type === 'swipe') {
      currentRound.cardEl.classList.add('is-incorrect');
      for (const pos of POSITIONS) {
        if (currentRound.tiles[pos].id === currentRound.correctItem.id) {
          currentRound.tileEls[pos].classList.add('is-correct');
        }
      }
    } else {
      gridContainer.innerHTML = `
        <div style="background: var(--surface); border: 2px solid var(--warn); border-radius: var(--radius); padding: 24px; text-align: center; width: 100%;">
          <div style="color: var(--warn); font-weight: bold; font-size: 18px; margin-bottom: 8px;">Let's review this together!</div>
          <div style="font-size: 16px; margin-bottom: 12px; font-weight: 600; color: var(--text);">${escapeHtml(currentRound.correctItem.uk)}</div>
          <div style="color: var(--text-dim); font-size: 14px;">Meaning: "${currentRound.correctItem.en}"</div>
        </div>
      `;
    }

    setTimeout(nextRound, 2500);
  });

  function cleanup() {
    gestureHandle && gestureHandle.destroy();
    removeKeyboard && removeKeyboard();
  }

  backBtn.addEventListener('click', () => {
    cleanup();
    onExit && onExit();
  });

  updateScore();
  nextRound();

  return { cleanup };
}

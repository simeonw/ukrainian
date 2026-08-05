import { buildCardPool, pickDistractors } from '../core/pool.js';
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
  const settings = progress.meta.settings;

  // Filter card pool based on user selected settings topics
  const cardPool = buildCardPool(settings.topics);

  let lastKey = null;
  let sessionCorrect = 0;
  let sessionTotal = 0;
  let currentRound = null;
  let gestureHandle = null;
  let removeKeyboard = null;

  // Single-step undo history state
  let lastAnswerHistory = null;

  container.innerHTML = `
    <div class="drill-screen">
      <header class="drill-header" style="display: flex; align-items: center; justify-content: space-between;">
        <button class="btn-back" type="button">&larr; Menu</button>
        <button class="btn-text" id="drill-undo-answer-btn" style="color: var(--accent); font-size: 13px; text-decoration: none; visibility: hidden;">↩️ Undo last answer</button>
        <div class="drill-score">0 / 0</div>
      </header>

      <!-- Static Grid matching framework perfectly -->
      <div class="drill-grid">
        <div class="tile tile-up" data-position="up"></div>
        <div class="tile tile-left" data-position="left"></div>
        <div class="drill-card" tabindex="0"></div>
        <div class="tile tile-right" data-position="right"></div>
        <div class="tile tile-down" data-position="down"></div>
      </div>

      <!-- Advanced interactive container for long sentences, toggled elegantly -->
      <div class="drill-interactive-exercise" style="display: none; width: 100%; margin-top: 8px;"></div>

      <!-- "I Don't Know" and controls -->
      <div style="display: flex; flex-direction: column; align-items: center; margin-top: 12px; gap: 8px;">
        <button class="btn-text" id="drill-idk-btn" style="color: var(--text-dim); text-decoration: none; font-size: 13px;">I don't know</button>
      </div>

      <p class="drill-hint" id="drill-hint-msg">Swipe, click, or use arrow keys to answer.</p>
    </div>
  `;

  const backBtn = container.querySelector('.btn-back');
  const scoreEl = container.querySelector('.drill-score');
  const undoAnswerBtn = container.querySelector('#drill-undo-answer-btn');
  const gridEl = container.querySelector('.drill-grid');
  const cardEl = container.querySelector('.drill-card');
  const interactiveEl = container.querySelector('.drill-interactive-exercise');
  const idkBtn = container.querySelector('#drill-idk-btn');
  const hintEl = container.querySelector('#drill-hint-msg');
  const tileEls = {
    up: container.querySelector('.tile-up'),
    down: container.querySelector('.tile-down'),
    left: container.querySelector('.tile-left'),
    right: container.querySelector('.tile-right'),
  };

  // Helper mappings for Czech bridge support in prompt/answers
  function getPromptText(item, direction) {
    const showTranslit = settings.transliteration;
    const useCzech = settings.language === 'cz';
    if (direction === 'uk2en') {
      return { main: item.uk, translit: showTranslit ? item.translit : null };
    } else {
      // en2uk
      return { main: (useCzech && (item.cz || item.czNote)) ? (item.cz || item.czNote) : item.en, translit: null };
    }
  }

  function getAnswerText(item, direction) {
    const useCzech = settings.language === 'cz';
    if (direction === 'uk2en') {
      return (useCzech && (item.cz || item.czNote)) ? (item.cz || item.czNote) : item.en;
    } else {
      return item.uk;
    }
  }

  function updateScore() {
    scoreEl.textContent = `${sessionCorrect} / ${sessionTotal}`;
    // Show/hide the single-step Undo button dynamically
    undoAnswerBtn.style.visibility = lastAnswerHistory ? 'visible' : 'hidden';
  }

  function clearFeedback() {
    cardEl.classList.remove('is-correct', 'is-incorrect');
    for (const pos of POSITIONS) tileEls[pos].classList.remove('is-correct', 'is-incorrect');
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

    document.body.appendChild(backdrop);
  }

  // Convert raw sentence string into clickable word span tokens (safety propagation stops swipe)
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
      tok.addEventListener('pointerdown', (e) => {
        e.stopPropagation(); // prevent swipe/drag capture
      });
      tok.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent default trigger
        showWordModal(tok.dataset.word);
      });
    });
  }

  // Common wrapper to render a specific drawn card (handles both normal and re-staged undo rounds)
  function renderRound(card) {
    clearFeedback();

    const { item, direction } = card;
    const isSentence = item.uk.split(' ').length > 2;

    if (!isSentence) {
      // 1. Show static swipe grid
      gridEl.style.display = 'grid';
      interactiveEl.style.display = 'none';
      hintEl.textContent = 'Swipe, click, or use arrow keys to answer. Tap words for definitions.';

      const distractors = pickDistractors(item, direction, 3);
      const options = shuffle([item, ...distractors]);
      const positions = shuffle(POSITIONS);
      const tiles = {};
      positions.forEach((pos, i) => { tiles[pos] = options[i]; });

      currentRound = { correctItem: item, direction, tiles, locked: false, type: 'swipe', card };

      const prompt = getPromptText(item, direction);
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
        const text = getAnswerText(tileItem, direction);
        const showTranslit = direction === 'en2uk' && settings.transliteration;
        tileEls[pos].innerHTML = `
          <div class="tile-text">${escapeHtml(text)}</div>
          ${showTranslit ? `<div class="tile-translit">${escapeHtml(tileItem.translit)}</div>` : ''}
        `;
      }
    } else {
      // 2. Hide swipe grid, render custom interactive advanced layout
      gridEl.style.display = 'none';
      interactiveEl.style.display = 'block';

      if (direction === 'uk2en') {
        renderSemanticMatch(card);
      } else {
        renderSentenceBuilder(card);
      }
    }
  }

  function nextRound() {
    const card = drawCard(progress, cardPool, lastKey);
    lastKey = cardKey(card);
    renderRound(card);
  }

  // --- UK2EN SEMANTIC MATCH ---
  function renderSemanticMatch(card) {
    const { item, direction } = card;
    const prompt = getPromptText(item, direction);
    const useCzech = settings.language === 'cz';

    hintEl.textContent = useCzech
      ? 'Napište překlad v češtině. Klikněte na slova pro nápovědu!'
      : 'Type the translation in English. Fuzzy meaning matching enabled! Tap words for definitions.';

    interactiveEl.innerHTML = `
      <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 24px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; min-height: 280px; justify-content: center;">
        <div class="drill-card-kind">Advanced Translation</div>
        <div class="drill-card-main" style="font-size: 20px; line-height: 1.4; text-align: center;">${tokenizeSentence(prompt.main)}</div>
        ${prompt.translit ? `<div class="drill-card-translit">${escapeHtml(prompt.translit)}</div>` : ''}

        <input type="text" class="drill-text-input" placeholder="${useCzech ? 'Napište český překlad...' : 'Type English translation...'}" id="semantic-input" autofocus autocomplete="off" />
        <button class="btn-primary" id="semantic-submit" style="width: 100%; margin-top: 10px;">Check Answer</button>
        <div id="semantic-feedback" style="font-size: 14px; text-align: center; margin-top: 8px;"></div>
      </div>
    `;

    const inputField = interactiveEl.querySelector('#semantic-input');
    const submitBtn = interactiveEl.querySelector('#semantic-submit');
    const feedbackEl = interactiveEl.querySelector('#semantic-feedback');
    addTokenEventListeners(interactiveEl);

    currentRound = { correctItem: item, direction, locked: false, type: 'semantic', card };

    function checkAnswer() {
      if (currentRound.locked) return;
      const userText = inputField.value.trim();
      if (!userText) return;

      currentRound.locked = true;
      inputField.disabled = true;

      const targetTranslation = getAnswerText(item, direction);
      const score = getFuzzyRatio(userText, targetTranslation);
      const isCorrect = score >= 0.72; // highly lenient semantic accuracy

      // Preserve single-step undo history
      lastAnswerHistory = {
        card: card,
        isCorrect: isCorrect,
        previousBoxState: JSON.parse(JSON.stringify(progress.items[item.id] || {}))
      };

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
          <div style="color: var(--text-dim); font-size: 13px;">Correct Meaning: "${targetTranslation}"</div>
        `;
      }

      setTimeout(nextRound, isCorrect ? 1000 : 2600);
    }

    submitBtn.addEventListener('click', checkAnswer);
    inputField.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkAnswer();
    });
  }

  // --- EN2UK DYNAMIC SENTENCE BUILDER ---
  function renderSentenceBuilder(card) {
    const { item, direction } = card;
    hintEl.textContent = 'Tap words to construct the Ukrainian phrase. Use modifiers to toggle forms!';

    const baseWords = item.uk.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g, "").split(/\s+/).filter(Boolean);
    const poolWords = shuffle([...baseWords]);

    let currentGender = 'masculine';
    let currentFormality = 'informal';
    let currentNegated = false;

    const prompt = getPromptText(item, direction);

    interactiveEl.innerHTML = `
      <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; width: 100%; display: flex; flex-direction: column; align-items: center; gap: 12px; min-height: 280px; justify-content: center;">
        <div class="drill-card-kind" style="margin-bottom: 4px;">Sentence Builder</div>
        <div class="drill-card-main" style="font-size: 18px; line-height: 1.4; text-align: center; color: var(--accent);">${escapeHtml(prompt.main)}</div>

        <!-- Builder Slots -->
        <div class="sentence-builder-slots" id="builder-slots"></div>

        <!-- Word Pool -->
        <div class="sentence-builder-pool" id="builder-pool"></div>

        <!-- Word Order Correction & Reset Buttons -->
        <div style="display: flex; gap: 12px; justify-content: center; width: 100%; margin-top: 4px;">
          <button class="btn-text" id="builder-undo-btn" style="color: var(--warn); text-decoration: none; font-weight: bold; font-size: 13px;">↩️ Undo Word</button>
          <button class="btn-text" id="builder-reset-btn" style="color: var(--bad); text-decoration: none; font-weight: bold; font-size: 13px;">🔄 Reset Sentence</button>
        </div>

        <!-- Dynamic Modifiers -->
        <div class="modifiers-container">
          <button class="modifier-btn is-active" id="mod-gender">Male Speaker ♂️</button>
          <button class="modifier-btn" id="mod-formality">Informal 👥</button>
          <button class="modifier-btn" id="mod-negate">Not Negated ➕</button>
        </div>

        <button class="btn-primary" id="builder-submit" style="width: 100%; margin-top: 10px;">Check Construction</button>
        <div id="builder-feedback" style="font-size: 14px; text-align: center; margin-top: 6px;"></div>
      </div>
    `;

    const slotsEl = interactiveEl.querySelector('#builder-slots');
    const poolEl = interactiveEl.querySelector('#builder-pool');
    const submitBtn = interactiveEl.querySelector('#builder-submit');
    const feedbackEl = interactiveEl.querySelector('#builder-feedback');

    const undoWordBtn = interactiveEl.querySelector('#builder-undo-btn');
    const resetSentenceBtn = interactiveEl.querySelector('#builder-reset-btn');

    const genderBtn = interactiveEl.querySelector('#mod-gender');
    const formalityBtn = interactiveEl.querySelector('#mod-formality');
    const negateBtn = interactiveEl.querySelector('#mod-negate');

    let currentSelection = [];
    currentRound = { correctItem: item, direction, locked: false, type: 'builder', card };

    // --- WORD-ORDER UNDO & RESET LISTENERS ---
    undoWordBtn.addEventListener('click', () => {
      if (currentRound.locked || currentSelection.length === 0) return;
      const popped = currentSelection.pop();
      // Un-highlight in chip pool
      const chip = poolEl.querySelector(`.sentence-chip[data-index="${popped.index}"]`);
      if (chip) chip.classList.remove('is-active');
      renderSlots();
    });

    resetSentenceBtn.addEventListener('click', () => {
      if (currentRound.locked) return;
      currentSelection = [];
      poolEl.querySelectorAll('.sentence-chip').forEach(c => c.classList.remove('is-active'));
      renderSlots();
    });

    genderBtn.addEventListener('click', () => {
      if (currentGender === 'masculine') {
        currentGender = 'feminine';
        genderBtn.textContent = 'Female Speaker ♀️';
      } else {
        currentGender = 'masculine';
        genderBtn.textContent = 'Male Speaker ♂️';
      }
      regenerateBuilderText();
    });

    formalityBtn.addEventListener('click', () => {
      if (currentFormality === 'informal') {
        currentFormality = 'formal';
        formalityBtn.textContent = 'Formal/Plural 👔';
      } else {
        currentFormality = 'informal';
        formalityBtn.textContent = 'Informal 👥';
      }
      regenerateBuilderText();
    });

    negateBtn.addEventListener('click', () => {
      currentNegated = !currentNegated;
      negateBtn.textContent = currentNegated ? 'Negated ➖' : 'Not Negated ➕';
      negateBtn.classList.toggle('is-active', currentNegated);
      regenerateBuilderText();
    });

    function regenerateBuilderText() {
      currentSelection = [];
      slotsEl.innerHTML = '';

      let modifiedWords = [...poolWords];
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
            chip.classList.remove('is-active');
            currentSelection = currentSelection.filter(item => item.index !== chip.dataset.index);
          } else {
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

      const score = getFuzzyRatio(builtPhrase, cleanTarget);
      const isCorrect = score >= 0.85;

      // Preserve single-step undo history
      lastAnswerHistory = {
        card: card,
        isCorrect: isCorrect,
        previousBoxState: JSON.parse(JSON.stringify(progress.items[item.id] || {}))
      };

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

      setTimeout(nextRound, isCorrect ? 1000 : 2600);
    }

    submitBtn.addEventListener('click', checkBuilder);
    regenerateBuilderText();
  }

  function submit(position) {
    if (!currentRound || currentRound.locked || !currentRound.tiles[position]) return;
    currentRound.locked = true;
    const chosen = currentRound.tiles[position];
    const isCorrect = chosen.id === currentRound.correctItem.id;

    // Preserve single-step undo history
    lastAnswerHistory = {
      card: currentRound.card,
      isCorrect: isCorrect,
      previousBoxState: JSON.parse(JSON.stringify(progress.items[currentRound.correctItem.id] || {}))
    };

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

  // --- UNDO LAST ANSWER HEADER BUTTON LISTENER ---
  undoAnswerBtn.addEventListener('click', () => {
    if (!lastAnswerHistory) return;

    // 1. Revert scores
    sessionTotal -= 1;
    if (lastAnswerHistory.isCorrect) sessionCorrect -= 1;

    // 2. Restore prior box state for this item
    progress.items[lastAnswerHistory.card.item.id] = lastAnswerHistory.previousBoxState;
    saveProgress(progress);

    // 3. Clear history & re-render that specific card immediately
    const restoredCard = lastAnswerHistory.card;
    lastAnswerHistory = null;
    updateScore();
    renderRound(restoredCard);
  });

  // --- I DON'T KNOW BUTTON EVENT ---
  idkBtn.addEventListener('click', () => {
    if (!currentRound || currentRound.locked) return;
    currentRound.locked = true;

    // Reset box to 0 with IDK flag
    recordAnswer(progress, currentRound.correctItem.id, currentRound.direction, false, true);
    saveProgress(progress);

    sessionTotal += 1;
    updateScore();

    // Visual feedback
    if (currentRound.type === 'swipe') {
      cardEl.classList.add('is-incorrect');
      for (const pos of POSITIONS) {
        if (currentRound.tiles[pos].id === currentRound.correctItem.id) {
          tileEls[pos].classList.add('is-correct');
        }
      }
      setTimeout(() => {
        gestureHandle && gestureHandle.reset();
        nextRound();
      }, 2500);
    } else {
      interactiveEl.innerHTML = `
        <div style="background: var(--surface); border: 2px solid var(--warn); border-radius: var(--radius); padding: 24px; text-align: center; width: 100%;">
          <div style="color: var(--warn); font-weight: bold; font-size: 18px; margin-bottom: 8px;">Let's review this together!</div>
          <div style="font-size: 16px; margin-bottom: 12px; font-weight: 600; color: var(--text);">${escapeHtml(currentRound.correctItem.uk)}</div>
          <div style="color: var(--text-dim); font-size: 14px;">Meaning: "${getAnswerText(currentRound.correctItem, currentRound.direction)}"</div>
        </div>
      `;
      setTimeout(nextRound, 2500);
    }
  });

  // Attach persistent single-session event listeners exactly once
  gestureHandle = attachSwipeGesture(cardEl, { onCommit: (position) => submit(position) });
  removeKeyboard = attachKeyboardNav((position) => submit(position));
  for (const pos of POSITIONS) {
    tileEls[pos].addEventListener('click', () => submit(pos));
  }

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

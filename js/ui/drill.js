import { buildCardPool, pickDistractors, promptText, answerText } from '../core/pool.js';
import { drawCard, cardKey, recordAnswer } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { attachSwipeGesture, attachKeyboardNav } from './gesture.js';

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
      <div class="drill-grid">
        <div class="tile tile-up" data-position="up"></div>
        <div class="tile tile-left" data-position="left"></div>
        <div class="drill-card" tabindex="0"></div>
        <div class="tile tile-right" data-position="right"></div>
        <div class="tile tile-down" data-position="down"></div>
      </div>
      <p class="drill-hint">Swipe, click, or use arrow keys to answer.</p>
    </div>
  `;

  const backBtn = container.querySelector('.btn-back');
  const scoreEl = container.querySelector('.drill-score');
  const cardEl = container.querySelector('.drill-card');
  const tileEls = {
    up: container.querySelector('.tile-up'),
    down: container.querySelector('.tile-down'),
    left: container.querySelector('.tile-left'),
    right: container.querySelector('.tile-right'),
  };

  function updateScore() {
    scoreEl.textContent = `${sessionCorrect} / ${sessionTotal}`;
  }

  function clearFeedback() {
    cardEl.classList.remove('is-correct', 'is-incorrect');
    for (const pos of POSITIONS) tileEls[pos].classList.remove('is-correct', 'is-incorrect');
  }

  function nextRound() {
    clearFeedback();
    const card = drawCard(progress, cardPool, lastKey);
    lastKey = cardKey(card);
    const { item, direction } = card;
    const distractors = pickDistractors(item, direction, 3);
    const options = shuffle([item, ...distractors]);
    const positions = shuffle(POSITIONS);
    const tiles = {};
    positions.forEach((pos, i) => { tiles[pos] = options[i]; });

    currentRound = { correctItem: item, direction, tiles, locked: false };

    const prompt = promptText(item, direction);
    cardEl.innerHTML = `
      <div class="drill-card-kind">${item.kind === 'pattern' ? 'phrase' : 'word'}</div>
      <div class="drill-card-main">${escapeHtml(prompt.main)}</div>
      ${prompt.translit ? `<div class="drill-card-translit">${escapeHtml(prompt.translit)}</div>` : ''}
    `;
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

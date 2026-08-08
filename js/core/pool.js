import { VOCAB } from '../data/vocab.js';
import { PATTERNS } from '../data/patterns.js';
import { SUBSTITUTION_FRAMES } from '../data/substitution-fills.js';
import { itemHasAnySkill } from './skills.js';
import { shuffle } from './random.js';
import { generateAllInstances } from './generate.js';
import { getItemTheme } from './vocab-themes.js';

// Generated instances are first-class items, not a bolted-on side pool — they
// flow through the same buildCardPool/pickDistractors/getAllItems path as
// hand-authored vocab and patterns, so nothing downstream (Drill, the Ability
// Map, calibration) needs to special-case them.
const GENERATED_ITEMS = generateAllInstances(SUBSTITUTION_FRAMES);
const ALL_ITEMS = [...VOCAB, ...PATTERNS, ...GENERATED_ITEMS];
const ITEMS_BY_ID = new Map(ALL_ITEMS.map((item) => [item.id, item]));

export function getAllItems() {
  return ALL_ITEMS;
}

export function getItemById(id) {
  return ITEMS_BY_ID.get(id) || null;
}

// Every (item, direction) pair is one quizzable "card". Two independent
// filters: activeTopics (skills.js grammatical categories — what you're
// tested on) and activeThemes (vocab-themes.js content domains — what you're
// interested in). An item with no theme (core grammar, or anything without
// topics) is never theme-gated regardless of activeThemes.
export function buildCardPool(activeTopics = null, activeThemes = null) {
  const cards = [];
  for (const item of ALL_ITEMS) {
    if (activeTopics && !itemHasAnySkill(item, activeTopics)) continue;
    if (activeThemes) {
      const theme = getItemTheme(item);
      if (theme !== null && !activeThemes.includes(theme)) continue;
    }
    cards.push({ item, direction: 'uk2en' });
    cards.push({ item, direction: 'en2uk' });
  }
  // A filter combination that matches nothing — stale settings from before a
  // topic/theme was renamed, or any other way the saved list ends up not
  // matching a single item — must never hand Drill an empty pool: drawCard()
  // has no valid card to return from an empty array, which crashes cardKey()
  // on the very next line and leaves the whole screen blank. Fall back to
  // the full catalog rather than let a bad settings value break Drill.
  if (cards.length === 0 && (activeTopics || activeThemes)) {
    return buildCardPool(null, null);
  }
  return cards;
}

export function lengthClass(uk) {
  const len = uk.length;
  if (len <= 6) return 'short';
  if (len <= 14) return 'medium';
  return 'long';
}

export function promptText(item, direction) {
  return direction === 'uk2en'
    ? { main: item.uk, translit: item.translit }
    : { main: item.en, translit: null };
}

export function answerText(item, direction) {
  return direction === 'uk2en' ? item.en : item.uk;
}

function normalize(text) {
  return text.toLowerCase().trim().replace(/[.!?]+$/g, '');
}

// Returns n plausible-but-wrong items (not cards) for the given correct item+direction.
export function pickDistractors(correctItem, direction, n = 3) {
  const correctAnswer = normalize(answerText(correctItem, direction));
  const correctLen = lengthClass(correctItem.uk);

  const candidates = ALL_ITEMS.filter((candidate) => {
    if (candidate.id === correctItem.id) return false;
    if (candidate.kind !== correctItem.kind) return false;
    return normalize(answerText(candidate, direction)) !== correctAnswer;
  });

  const scored = candidates
    .map((candidate) => {
      let score = 0;
      if (candidate.pos && correctItem.pos && candidate.pos === correctItem.pos) score += 1;
      if (lengthClass(candidate.uk) === correctLen) score += 1;
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || Math.random() - 0.5);

  const picked = [];
  const pickedIds = new Set();
  for (const { candidate, score } of scored) {
    if (picked.length >= n || score <= 0) break;
    picked.push(candidate);
    pickedIds.add(candidate.id);
  }

  if (picked.length < n) {
    const remaining = shuffle(candidates.filter((c) => !pickedIds.has(c.id)));
    for (const candidate of remaining) {
      if (picked.length >= n) break;
      picked.push(candidate);
    }
  }

  return shuffle(picked);
}

// Leitner-box-style spaced repetition + lesson mastery calculation.
import { LESSONS } from '../data/lessons.js';

const MAX_BOX = 5;
const BOX_WEIGHTS = [10, 7, 5, 3, 2, 1]; // indexed by box 0-5
const DIAGNOSTIC_SEED_BOX = 2;

// A lesson badge is "learned" once its average item confidence crosses this bar. Confidence
// per item is uncapped-early and reaches 100% at box-sum 4 (e.g. box 2 in each direction —
// a handful of correct reps, not deep mastery). 65% average lets a lesson read "learned"
// while still tolerating a few weak items, and stays honestly achievable within a normal
// session rather than requiring hundreds of answers (see coverage/placement notes below).
const LEARNED_PERCENT = 65;

function ensureItemEntry(progress, itemId) {
  if (!progress.items[itemId]) progress.items[itemId] = {};
  return progress.items[itemId];
}

function ensureDirectionEntry(progress, itemId, direction) {
  const entry = ensureItemEntry(progress, itemId);
  if (!entry[direction]) entry[direction] = { box: 0, seen: 0, correct: 0, lastSeen: null };
  return entry[direction];
}

export function getDirectionStats(progress, itemId, direction) {
  return progress.items[itemId]?.[direction] || { box: 0, seen: 0, correct: 0, lastSeen: null };
}

export function effectiveBox(progress, itemId) {
  const uk2en = getDirectionStats(progress, itemId, 'uk2en').box;
  const en2uk = getDirectionStats(progress, itemId, 'en2uk').box;
  return Math.min(uk2en, en2uk);
}

export function hasBeenSeen(progress, itemId) {
  return (
    getDirectionStats(progress, itemId, 'uk2en').seen > 0 ||
    getDirectionStats(progress, itemId, 'en2uk').seen > 0
  );
}

// 0-1 confidence for a single item, blending both directions. Reaches 1.0 at box-sum 4 (e.g.
// 2 correct reps net in each direction) rather than requiring deep mastery in both — moves
// immediately on the very first correct answer instead of waiting on a hard gate.
export function itemConfidence(progress, itemId) {
  const uk2en = getDirectionStats(progress, itemId, 'uk2en').box;
  const en2uk = getDirectionStats(progress, itemId, 'en2uk').box;
  return Math.min(1, (uk2en + en2uk) / 4);
}

// Mutates progress in place; caller is responsible for persisting via storage.saveProgress.
export function recordAnswer(progress, itemId, direction, isCorrect) {
  const stats = ensureDirectionEntry(progress, itemId, direction);
  stats.seen += 1;
  stats.lastSeen = Date.now();
  if (isCorrect) {
    stats.correct += 1;
    stats.box = Math.min(stats.box + 1, MAX_BOX);
  } else {
    stats.box = Math.max(stats.box - 1, 0);
  }
  return progress;
}

// Diagnostic answers only ever raise a floor — never overwrite/regress real drill progress,
// and only seed the direction actually tested.
export function seedFromDiagnostic(progress, itemId, direction) {
  const stats = ensureDirectionEntry(progress, itemId, direction);
  if (stats.seen === 0) {
    stats.seen = 1;
    stats.correct = 1;
    stats.lastSeen = Date.now();
  }
  stats.box = Math.max(stats.box, DIAGNOSTIC_SEED_BOX);
  return progress;
}

export function cardKey(card) {
  return `${card.item.id}:${card.direction}`;
}

function cardBox(progress, card) {
  return getDirectionStats(progress, card.item.id, card.direction).box;
}

function cardSeen(progress, card) {
  return getDirectionStats(progress, card.item.id, card.direction).seen > 0;
}

function lessonAttemptCount(progress, lesson) {
  let count = 0;
  for (const id of lesson.itemIds) {
    count += getDirectionStats(progress, id, 'uk2en').seen + getDirectionStats(progress, id, 'en2uk').seen;
  }
  return count;
}

function pickFrom(candidates, avoidKey) {
  let pool = candidates;
  if (avoidKey && pool.length > 1) {
    const filtered = pool.filter((c) => cardKey(c) !== avoidKey);
    if (filtered.length) pool = filtered;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

// Three-tier draw:
//  1. Placement — every lesson still untouched gets a card before any lesson gets a second
//     one. With 20 lessons this guarantees a first data point on all of them within ~20
//     draws (fewer in practice since review lessons share items with earlier ones), so the
//     learner sees every lesson move off "not started" almost immediately instead of a
//     lucky handful getting all the early attention.
//  2. Coverage — remaining never-seen cards, drawn uniformly. Prevents the "first exposure
//     to any specific card is a coupon-collector problem across ~270 cards" issue.
//  3. Weighted review — low-box (new/weak) cards far more likely, every card keeps nonzero
//     weight so mastered items still resurface occasionally.
export function drawCard(progress, cardPool, avoidKey = null) {
  const placementLessons = LESSONS.filter((l) => l.itemIds.length > 0 && lessonAttemptCount(progress, l) === 0);
  if (placementLessons.length > 0) {
    const lesson = placementLessons[Math.floor(Math.random() * placementLessons.length)];
    const lessonItemIds = new Set(lesson.itemIds);
    const candidates = cardPool.filter((c) => lessonItemIds.has(c.item.id));
    if (candidates.length > 0) return pickFrom(candidates, avoidKey);
  }

  const unseen = cardPool.filter((c) => !cardSeen(progress, c));
  if (unseen.length > 0) return pickFrom(unseen, avoidKey);

  let candidates = cardPool;
  if (avoidKey && candidates.length > 1) {
    const filtered = candidates.filter((c) => cardKey(c) !== avoidKey);
    if (filtered.length) candidates = filtered;
  }
  const weights = candidates.map((c) => BOX_WEIGHTS[cardBox(progress, c)]);
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return candidates[i];
  }
  return candidates[candidates.length - 1];
}

// Returns { percent, attempted, total, status }. percent/attempted move continuously with
// every relevant answer (not gated behind a threshold) so the UI can show real, incremental
// progress from the first answer on, while status still gives a coarse at-a-glance bucket.
// May flip progress.lessons[lesson.id].everReachedLearned true → caller should persist afterward.
export function computeLessonProgress(progress, lesson) {
  const items = lesson.itemIds;
  const total = items.length;
  if (!total) return { percent: 0, attempted: 0, total: 0, status: 'not-started' };

  const attempted = items.filter((id) => hasBeenSeen(progress, id)).length;
  if (attempted === 0) return { percent: 0, attempted: 0, total, status: 'not-started' };

  const percent = Math.round((100 * items.reduce((sum, id) => sum + itemConfidence(progress, id), 0)) / total);
  const everLearned = progress.lessons[lesson.id]?.everReachedLearned === true;

  if (percent >= LEARNED_PERCENT) {
    if (!everLearned) {
      if (!progress.lessons[lesson.id]) progress.lessons[lesson.id] = {};
      progress.lessons[lesson.id].everReachedLearned = true;
    }
    return { percent, attempted, total, status: 'learned' };
  }
  if (everLearned) return { percent, attempted, total, status: 'needs-review' };
  return { percent, attempted, total, status: 'learning' };
}

// Leitner-box-style spaced repetition + lesson mastery calculation.
const MAX_BOX = 5;
const BOX_WEIGHTS = [10, 7, 5, 3, 2, 1]; // indexed by box 0-5
const MASTERY_BOX = 4;
const LEARNED_THRESHOLD = 0.8;
const DIAGNOSTIC_SEED_BOX = 2;

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

// Weighted-random draw: low-box (new/weak) cards are far more likely, but every card keeps
// nonzero weight so mastered items still resurface occasionally. avoidKey skips an immediate repeat.
export function drawCard(progress, cardPool, avoidKey = null) {
  let candidates = cardPool;
  if (avoidKey && cardPool.length > 1) {
    const filtered = cardPool.filter((c) => cardKey(c) !== avoidKey);
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

// Returns 'not-started' | 'learning' | 'learned' | 'needs-review'.
// May flip progress.lessons[lesson.id].everReachedLearned true → caller should persist afterward.
export function computeLessonStatus(progress, lesson) {
  const items = lesson.itemIds;
  if (!items.length) return 'not-started';

  const anySeen = items.some((id) => hasBeenSeen(progress, id));
  if (!anySeen) return 'not-started';

  const masteredCount = items.filter((id) => effectiveBox(progress, id) >= MASTERY_BOX).length;
  const pctMastered = masteredCount / items.length;
  const everLearned = progress.lessons[lesson.id]?.everReachedLearned === true;

  if (pctMastered >= LEARNED_THRESHOLD) {
    if (!everLearned) {
      if (!progress.lessons[lesson.id]) progress.lessons[lesson.id] = {};
      progress.lessons[lesson.id].everReachedLearned = true;
    }
    return 'learned';
  }
  if (everLearned) return 'needs-review';
  return 'learning';
}

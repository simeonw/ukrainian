// Leitner-box-style spaced repetition + adaptive lesson mastery calculation.
import { LESSONS } from '../data/lessons.js';
import { getSkillsForItem } from './skills.js';
import { isLessonCompleted } from './completion.js';

const MAX_BOX = 5;
const BOX_WEIGHTS = [12, 10, 8, 4, 2, 1]; // Weights for drawing based on Leitner boxes
const DIAGNOSTIC_SEED_BOX = 2;

// Lesson badges: learned threshold remains at 65% average item confidence
const LEARNED_PERCENT = 65;

function ensureItemEntry(progress, itemId) {
  if (!progress.items) progress.items = {};
  if (!progress.items[itemId]) {
    progress.items[itemId] = {
      uk2en: { box: 0, seen: 0, correct: 0, lastSeen: null, consecutiveCorrect: 0, history: [], latencyHistory: [] },
      en2uk: { box: 0, seen: 0, correct: 0, lastSeen: null, consecutiveCorrect: 0, history: [], latencyHistory: [] }
    };
  }
  return progress.items[itemId];
}

function ensureDirectionEntry(progress, itemId, direction) {
  const entry = ensureItemEntry(progress, itemId);
  if (!entry[direction]) {
    entry[direction] = { box: 0, seen: 0, correct: 0, lastSeen: null, consecutiveCorrect: 0, history: [], latencyHistory: [] };
  }
  if (!entry[direction].history) {
    entry[direction].history = [];
  }
  if (!entry[direction].latencyHistory) {
    entry[direction].latencyHistory = [];
  }
  return entry[direction];
}

export function getDirectionStats(progress, itemId, direction) {
  ensureItemEntry(progress, itemId);
  return progress.items[itemId][direction];
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

export function itemConfidence(progress, itemId) {
  const uk2en = getDirectionStats(progress, itemId, 'uk2en');
  const en2uk = getDirectionStats(progress, itemId, 'en2uk');

  // If either direction is mastered (7 consecutive correct), confidence is 1.0
  if (uk2en.consecutiveCorrect >= 7 || en2uk.consecutiveCorrect >= 7) {
    return 1.0;
  }

  const sumBox = uk2en.box + en2uk.box;
  return Math.min(1, sumBox / 4);
}

// Track 7 distinct dimensions of ability: vocabulary, understanding, production, grammar, conditional, past, and reading speed
export function getAbilityProfile(progress, cardPool) {
  const profile = {
    vocabulary: { score: 0, total: 0 },
    understanding: { score: 0, total: 0 },
    production: { score: 0, total: 0 },
    grammar: { score: 0, total: 0 },
    conditional: { score: 0, total: 0 },
    past: { score: 0, total: 0 },
    'Reading Speed': { score: 0, total: 0 } // tracks speed/latency score
  };

  const uniqueItems = new Set();
  for (const card of cardPool) {
    uniqueItems.add(card.item);
  }

  let totalLatencies = 0;
  let fluentLatencies = 0;

  for (const item of uniqueItems) {
    const skills = getSkillsForItem(item);
    const confidence = itemConfidence(progress, item.id);
    for (const skill of skills) {
      if (profile[skill] !== undefined) {
        profile[skill].score += confidence;
        profile[skill].total += 1;
      }
    }

    // Accumulate reading speed stats from latency history
    const statsUk = progress.items?.[item.id]?.uk2en;
    const statsEn = progress.items?.[item.id]?.en2uk;

    if (statsUk && statsUk.latencyHistory) {
      for (const lat of statsUk.latencyHistory) {
        totalLatencies += 1;
        const words = item.uk.split(/\s+/).length;
        const threshold = 3 + words * 1.5;
        if (lat <= threshold) fluentLatencies += 1;
      }
    }
    if (statsEn && statsEn.latencyHistory) {
      for (const lat of statsEn.latencyHistory) {
        totalLatencies += 1;
        const words = item.uk.split(/\s+/).length;
        const threshold = 3 + words * 1.5;
        if (lat <= threshold) fluentLatencies += 1;
      }
    }
  }

  // Convert to percent
  const result = {};
  for (const skill in profile) {
    if (skill === 'Reading Speed') {
      result[skill] = totalLatencies > 0 ? Math.round((fluentLatencies / totalLatencies) * 100) : 0;
    } else {
      const t = profile[skill].total;
      result[skill] = t > 0 ? Math.round((profile[skill].score / t) * 100) : 0;
    }
  }
  return result;
}

// Derived, not stored: lesson N+1 is unlocked the moment lesson N is Completed
// (see core/completion.js). No meta.unlockedLessons list to default or migrate —
// a returning user's real Completion history (or lack of it) is correct the
// instant this function runs, including on their very first load after this
// shipped, with no separate migration step.
const SORTED_LESSONS = [...LESSONS].sort((a, b) => a.order - b.order);

function getUnlockedLessons(progress) {
  const unlocked = new Set();
  for (let i = 0; i < SORTED_LESSONS.length; i++) {
    const lesson = SORTED_LESSONS[i];
    if (i < 2 || isLessonCompleted(progress, SORTED_LESSONS[i - 1].id)) {
      unlocked.add(lesson.id);
    } else {
      break;
    }
  }
  return unlocked;
}

export function isLessonUnlocked(progress, lessonId) {
  const unlocked = getUnlockedLessons(progress);
  return unlocked.has(lessonId);
}

// Mutates progress in place; caller is responsible for persisting via storage.saveProgress.
export function recordAnswer(progress, itemId, direction, isCorrect, isIdk = false, latency = null) {
  const stats = ensureDirectionEntry(progress, itemId, direction);
  stats.seen += 1;
  stats.lastSeen = Date.now();

  if (latency !== null) {
    stats.latencyHistory.push(latency);
  }

  if (isIdk) {
    stats.box = 0;
    stats.consecutiveCorrect = 0;
    stats.history.push('idk');
  } else if (isCorrect) {
    stats.correct += 1;
    stats.consecutiveCorrect = (stats.consecutiveCorrect || 0) + 1;
    stats.box = Math.min(stats.box + 1, MAX_BOX);
    stats.history.push('correct');
  } else {
    stats.consecutiveCorrect = 0;
    stats.box = Math.max(stats.box - 1, 0);
    stats.history.push('wrong');
  }

  return progress;
}

// Diagnostic/calibration answers only ever raise a floor — never overwrite/regress
// real drill progress. This seeds item confidence only; it deliberately does NOT
// touch lesson unlocking. Bulk-unlocking by CEFR level here used to be a second,
// competing writer of "what's unlocked" alongside Completion (finding 3) — that
// mechanism is retired. Calibration's effect on unlocking now goes exclusively
// through the same Completion currency everything else uses: see
// data/calibration-tracks.js's applyCalibrationResults(), which pre-completes
// lessons the calibrated level covers instead of unlocking them directly.
export function seedFromDiagnostic(progress, itemId, direction, levelCode = 'beginner') {
  const stats = ensureDirectionEntry(progress, itemId, direction);
  if (stats.seen === 0) {
    stats.seen = 1;
    stats.correct = 1;
    stats.lastSeen = Date.now();
  }

  let boxToSeed = DIAGNOSTIC_SEED_BOX;
  let consec = 1;
  if (levelCode === 'advanced') {
    boxToSeed = MAX_BOX; // fully master basic components
    consec = 7;
  } else if (levelCode === 'intermediate') {
    boxToSeed = 3;
    consec = 3;
  }

  stats.box = Math.max(stats.box, boxToSeed);
  stats.consecutiveCorrect = Math.max(stats.consecutiveCorrect || 0, consec);

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

function isCardMastered(progress, card) {
  const stats = getDirectionStats(progress, card.item.id, card.direction);
  return stats.consecutiveCorrect >= 7;
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

// ADAPTIVE FILTERING & PROGRESSIVE LAYERING:
// The drawing pool is restricted to items belonging to lessons that are officially unlocked.
export function drawCard(progress, cardPool, avoidKey = null) {
  const unlocked = getUnlockedLessons(progress);

  // Collect all unique item IDs belonging to currently unlocked lessons
  const unlockedItemIds = new Set();
  LESSONS.forEach(l => {
    if (unlocked.has(l.id)) {
      l.itemIds.forEach(id => unlockedItemIds.add(id));
    }
  });

  // Filter full card pool to only draw from unlocked active lessons!
  let activePool = cardPool.filter(c => unlockedItemIds.has(c.item.id));
  if (activePool.length === 0) activePool = cardPool; // fallback to avoid empty pools

  // 1. First, check if there's any completely unseen card. Uniform draw from unseen.
  const unseen = activePool.filter((c) => !cardSeen(progress, c));
  if (unseen.length > 0) return pickFrom(unseen, avoidKey);

  // 2. Separate cards into non-mastered and mastered
  const activeCandidates = activePool.filter(c => !isCardMastered(progress, c));

  let poolToDraw = activeCandidates.length > 0 ? activeCandidates : activePool;

  if (avoidKey && poolToDraw.length > 1) {
    const filtered = poolToDraw.filter((c) => cardKey(c) !== avoidKey);
    if (filtered.length) poolToDraw = filtered;
  }

  // 3. Weighted selection based on Leitner Box
  const weights = poolToDraw.map((c) => {
    let baseWeight = BOX_WEIGHTS[cardBox(progress, c)] || 1;
    if (isCardMastered(progress, c)) {
      baseWeight = baseWeight * 0.1; // drastically reduce repetition frequency of mastered cards
    }
    return baseWeight;
  });

  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (let i = 0; i < poolToDraw.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return poolToDraw[i];
  }
  return poolToDraw[poolToDraw.length - 1];
}

// percent here is a per-item-confidence average — a stand-in Retention signal
// until Phase 3's Wilson-score rolling window replaces it. It never gates
// anything (see core/completion.js for the actual unlock gate); it only decides
// whether a Completed lesson's badge reads "learned" or "needs review" —
// Completion is a ratchet (isLessonCompleted only ever becomes true), Retention
// is allowed to dip back down without ever re-locking the lesson.
export function computeLessonProgress(progress, lesson) {
  const items = lesson.itemIds;
  const total = items.length;
  if (!total) return { percent: 0, attempted: 0, total: 0, status: 'not-started' };

  const attempted = items.filter((id) => hasBeenSeen(progress, id)).length;
  const percent = attempted === 0 ? 0 : Math.round((100 * items.reduce((sum, id) => sum + itemConfidence(progress, id), 0)) / total);

  if (!isLessonCompleted(progress, lesson.id)) {
    return { percent, attempted, total, status: attempted === 0 ? 'not-started' : 'learning' };
  }
  return { percent, attempted, total, status: percent >= LEARNED_PERCENT ? 'learned' : 'needs-review' };
}

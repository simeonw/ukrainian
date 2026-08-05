// Leitner-box-style spaced repetition + adaptive lesson mastery calculation.
import { LESSONS } from '../data/lessons.js';

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
    // Determine skills for this item
    const skills = item.skills ? [...item.skills] : [];
    if (item.kind === 'vocab') {
      skills.push('vocabulary');
    }
    if (item.id.includes('past') || item.id.includes('p_b1_done') || item.id.includes('p_b1_never') || item.id.includes('p_b1_when') || item.id.includes('p_c1_time')) {
      skills.push('past');
    }
    if (item.id.includes('cond') || item.id.includes('hypo') || item.id.includes('challenge_1')) {
      skills.push('conditional');
    }

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

// Diagnostic answers only ever raise a floor — never overwrite/regress real drill progress
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

// ADAPTIVE FILTERING:
// The drill engine optimizes for information gain, avoiding over-testing mastered material.
export function drawCard(progress, cardPool, avoidKey = null) {
  const unseen = cardPool.filter((c) => !cardSeen(progress, c));
  if (unseen.length > 0) return pickFrom(unseen, avoidKey);

  const activeCandidates = cardPool.filter(c => !isCardMastered(progress, c));

  let poolToDraw = activeCandidates.length > 0 ? activeCandidates : cardPool;

  if (avoidKey && poolToDraw.length > 1) {
    const filtered = poolToDraw.filter((c) => cardKey(c) !== avoidKey);
    if (filtered.length) poolToDraw = filtered;
  }

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

// Calculates continuous lesson progress percent/badge status
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

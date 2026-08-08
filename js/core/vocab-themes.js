// Thematic vocabulary categories for Settings — a different axis from
// skills.js's grammatical categories (vocabulary/grammar/past/future/...).
// This is "what topics am I interested in" (food, travel, family, ...), not
// "what am I being tested on." Deliberately reuses lessons.js as the single
// source of truth rather than inventing a parallel taxonomy that could drift:
// every "topic"/"vocab"/"vocab_c1"/"phonetics" lesson IS a theme, keyed by
// its own lesson id. Grammar-frame lessons are never theme-gated — filtering
// out core grammar by "interest" doesn't make sense the way filtering out
// "Food & Ordering" does, so those items are always included regardless of
// the theme filter (see getItemTheme returning null for them).
import { LESSONS } from '../data/lessons.js';

const THEMED_KINDS = new Set(['topic', 'vocab', 'vocab_c1', 'phonetics']);
const LESSON_BY_ID = new Map(LESSONS.map((l) => [l.id, l]));

export function getThemedLessons() {
  return LESSONS.filter((l) => THEMED_KINDS.has(l.kind)).sort((a, b) => a.order - b.order);
}

export function getAllThemeIds() {
  return getThemedLessons().map((l) => l.id);
}

// null means "not theme-gated, always included" — core grammar lessons, or
// any item with no topics at all (e.g. a generated substitution instance).
export function getItemTheme(item) {
  const topicId = item.topics && item.topics[0];
  if (!topicId) return null;
  const lesson = LESSON_BY_ID.get(topicId);
  if (!lesson || !THEMED_KINDS.has(lesson.kind)) return null;
  return lesson.id;
}

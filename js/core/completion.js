// Completion is a fast, near-guaranteed, low-stakes signal: did the learner work
// through this lesson's bounded exercise set. It is deliberately NOT the same
// question as Retention (computeLessonProgress's confidence percent in srs.js) —
// Completion only ever moves forward and is what drives sequential unlocking;
// Retention is allowed to dip and never re-locks anything.
const TARGET_MIN = 6;
const TARGET_MAX = 10;

// Bounded per-lesson set, distinct from the open-ended global Drill pool. Most
// lessons already carry 6-10 itemIds; lessons with fewer just use all of them
// (there's nothing to pad with), and lessons with more are capped at TARGET_MAX
// so the set stays a short, finishable session.
export function getCompletionTargetItemIds(lesson) {
  return lesson.itemIds.slice(0, Math.max(TARGET_MIN, Math.min(lesson.itemIds.length, TARGET_MAX)));
}

function ensureLessonEntry(progress, lessonId) {
  if (!progress.lessons[lessonId]) progress.lessons[lessonId] = {};
  if (!progress.lessons[lessonId].completedItemIds) progress.lessons[lessonId].completedItemIds = [];
  return progress.lessons[lessonId];
}

export function isLessonCompleted(progress, lessonId) {
  return progress.lessons[lessonId]?.completed === true;
}

export function markLessonCompleted(progress, lessonId, source = 'exercise') {
  const entry = ensureLessonEntry(progress, lessonId);
  if (entry.completed) return;
  entry.completed = true;
  entry.completedAt = Date.now();
  entry.completedVia = source;
}

// Records one correctly-answered item toward a lesson's completion set. Once
// every target item has been answered correctly at least once, the lesson is
// marked Completed automatically. Wrong answers never call this — they just
// get an immediate retry with the correction shown (see lesson-exercise-ui.js);
// completion tracks engagement, not a scored pass/fail.
export function recordCompletionItemDone(progress, lesson, itemId) {
  const entry = ensureLessonEntry(progress, lesson.id);
  if (!entry.completedItemIds.includes(itemId)) entry.completedItemIds.push(itemId);

  const target = getCompletionTargetItemIds(lesson);
  const allDone = target.every((id) => entry.completedItemIds.includes(id));
  if (allDone) markLessonCompleted(progress, lesson.id, 'exercise');
  return entry;
}

export function getCompletionProgress(progress, lesson) {
  const targetItemIds = getCompletionTargetItemIds(lesson);
  const entry = progress.lessons[lesson.id];
  const doneItemIds = (entry?.completedItemIds || []).filter((id) => targetItemIds.includes(id));
  return {
    targetItemIds,
    doneItemIds,
    remaining: targetItemIds.filter((id) => !doneItemIds.includes(id)),
    completed: isLessonCompleted(progress, lesson.id),
  };
}

// A single compact "where am I / what's next" read for the Home screen —
// built entirely from existing signals (lesson completion, CEFR-by-order,
// vocab badges), not a new tracking system. The detailed Practice
// Accuracy / Vocabulary Mastered breakdowns stay available but tucked away;
// this is the "immediate impact" summary requested instead of leading with
// a wall of stats.
import { LESSONS } from '../data/lessons.js';
import { isLessonCompleted } from './completion.js';
import { cefrForLessonOrder } from '../data/calibration-tracks.js';
import { getVocabBadgeProgress } from './vocab-badges.js';

const LEVEL_LABEL = {
  beginner: 'Beginner (A1–A2)',
  b1: 'Intermediate (B1)',
  b2: 'Upper-Intermediate (B2)',
  c1: 'Advanced (C1)',
  c2: 'Mastery (C2)',
};

export function getLevelSummary(progress) {
  const sorted = [...LESSONS].sort((a, b) => a.order - b.order);

  let highestCompletedOrder = 0;
  let completedCount = 0;
  let nextLesson = null;
  for (const lesson of sorted) {
    if (isLessonCompleted(progress, lesson.id)) {
      completedCount += 1;
      highestCompletedOrder = Math.max(highestCompletedOrder, lesson.order);
    } else if (!nextLesson) {
      nextLesson = lesson;
    }
  }

  const cefr = highestCompletedOrder > 0 ? cefrForLessonOrder(highestCompletedOrder) : null;

  const vocabBadges = getVocabBadgeProgress(progress);
  const vocabValues = Object.values(vocabBadges);
  const vocabKnown = vocabValues.reduce((sum, b) => sum + b.known, 0);
  const vocabTotal = vocabValues.reduce((sum, b) => sum + b.total, 0);

  return {
    levelLabel: cefr ? LEVEL_LABEL[cefr] : 'Just getting started',
    lessonsCompleted: completedCount,
    lessonsTotal: sorted.length,
    nextLessonTitle: nextLesson ? nextLesson.title : null,
    vocabKnown,
    vocabTotal,
  };
}

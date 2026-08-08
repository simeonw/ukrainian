// Vocabulary achievement badges: "you know at least N nouns / verbs / ..."
// Deliberately built on isItemKnown() (srs.js), not itemConfidence or box —
// a word only counts here once it clears the evidence bar the user actually
// asked for (repeated multiple-choice success, or one free-text production),
// not from a single MC guess or a calibration seed.
import { getAllItems } from './pool.js';
import { isItemKnown } from './srs.js';

const POS_LABELS = {
  noun: 'Nouns',
  verb: 'Verb infinitives',
  phrase: 'Phrases',
  adverb: 'Adverbs',
  pronoun: 'Pronouns',
  number: 'Numbers',
  adjective: 'Adjectives',
  conjunction: 'Conjunctions',
};

// Milestones scale with how many items actually exist in a category instead
// of hardcoding fixed numbers a small catalog could never reach (e.g. there
// are ~55 nouns total today — a "500 nouns" badge would be unreachable).
// As content grows, these move with it automatically.
function milestonesFor(total) {
  if (total < 5) return [total];
  const raw = [Math.round(total * 0.15), Math.round(total * 0.4), Math.round(total * 0.75), total];
  return [...new Set(raw.map((n) => Math.max(1, n)))].sort((a, b) => a - b);
}

let CATALOG_BY_POS_CACHE = null;
function getCatalogByPos() {
  if (CATALOG_BY_POS_CACHE) return CATALOG_BY_POS_CACHE;
  const byPos = {};
  for (const item of getAllItems()) {
    if (item.kind !== 'vocab' || item.generated) continue; // vocab only — patterns/sentences aren't "a word you know"
    if (!byPos[item.pos]) byPos[item.pos] = [];
    byPos[item.pos].push(item);
  }
  CATALOG_BY_POS_CACHE = byPos;
  return byPos;
}

// { [pos]: { label, known, total, milestones, nextMilestone } }, only for
// categories with enough items to make a milestone meaningful.
export function getVocabBadgeProgress(progress) {
  const byPos = getCatalogByPos();
  const result = {};
  for (const [pos, items] of Object.entries(byPos)) {
    if (items.length < 10) continue; // too few items in this category for a milestone to mean much
    const known = items.filter((i) => isItemKnown(progress, i.id)).length;
    const milestones = milestonesFor(items.length);
    result[pos] = {
      label: POS_LABELS[pos] || pos,
      known,
      total: items.length,
      milestones,
      nextMilestone: milestones.find((m) => m > known) ?? null,
      milestonesReached: milestones.filter((m) => known >= m).length,
    };
  }
  return result;
}

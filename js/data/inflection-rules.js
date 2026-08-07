// Finding 6, fixed properly (Phase 0 only hid the broken control; this is the
// "general by construction" version the review promised): re-derives Sentence
// Builder's gender/formality swaps from morphological rules instead of a fixed
// 3-verb lookup table that silently stopped working on any sentence it hadn't
// been hand-updated for.
//
// Gender (past tense masc <-> fem): regular Ukrainian past tense is
// stem + -в (masc) / stem + -ла (fem) when the stem ends in a vowel
// (роби-в/роби-ла, хоті-в/хоті-ла, бу-в/бу-ла) — but when the stem ends in a
// consonant, masculine needs a linking "o" before в (an epenthetic vowel, not
// a separate suffix): stem+ов/stem+ла (піш-ов/піш-ла, знайш-ов/знайш-ла).
// Which alternation applies is fully determined by the sound immediately
// before the ending — not by which specific verb it is — so testing that one
// letter covers any verb in either pattern, including ones not yet written.
const VOWELS = new Set('аеєиіїоуюя');

function endsInConsonant(stem) {
  const last = stem[stem.length - 1];
  return last !== undefined && !VOWELS.has(last);
}

export function toFeminine(wordLower) {
  if (wordLower.endsWith('ов') && endsInConsonant(wordLower.slice(0, -2))) {
    return wordLower.slice(0, -2) + 'ла';
  }
  if (wordLower.endsWith('в')) return wordLower.slice(0, -1) + 'ла';
  return null;
}

export function toMasculine(wordLower) {
  if (!wordLower.endsWith('ла')) return null;
  const stem = wordLower.slice(0, -2);
  return stem + (endsInConsonant(stem) ? 'ов' : 'в');
}

export function isGenderInflectable(wordLower) {
  return toFeminine(wordLower) !== null || toMasculine(wordLower) !== null;
}

// Formality (ти <-> ви): the complete singular-informal <-> formal/plural
// pronoun paradigm across every case Ukrainian has a distinct form for, not
// just accusative/instrumental — a closed set, so this table IS the general
// solution (there's no larger regular class to generalize to, unlike verbs).
const INFORMAL_TO_FORMAL = {
  ти: 'ви',
  тебе: 'вас',
  тобі: 'вам',
  тобою: 'вами',
};
const FORMAL_TO_INFORMAL = Object.fromEntries(Object.entries(INFORMAL_TO_FORMAL).map(([k, v]) => [v, k]));

export function toFormal(wordLower) {
  return INFORMAL_TO_FORMAL[wordLower] || null;
}

export function toInformal(wordLower) {
  return FORMAL_TO_INFORMAL[wordLower] || null;
}

export function isFormalityInflectable(wordLower) {
  return toFormal(wordLower) !== null || toInformal(wordLower) !== null;
}

// Configuration for the one-time (but replayable) diagnostic flow. Pure data — the
// diagnostic-ui.js module drives the actual screens and scoring.

// Part 1 & 2 both use this exact word list (from the pedagogical spec).
export const DIAGNOSTIC_WORD_IDS = [
  'v_voda', 'v_ruka', 'v_brat', 'v_sestra', 'v_misto',
  'v_robyty', 'v_bachyty', 'v_hovoryty', 'v_pysaty', 'v_khotity',
];

// Part 1: free-recall self-rating (not scored — calibration only, no seeding).
export const SELF_RATING_OPTIONS = [
  { value: 'known', label: 'I recognized it immediately' },
  { value: 'guessed', label: 'I could guess it' },
  { value: 'unknown', label: "I didn't know it" },
];

// Part 3: sentence recognition. Distractors are the exact wrong options from the spec.
export const SENTENCE_QUESTION = {
  itemId: 'p_want_2',
  uk: 'Я хочу побачити тебе.',
  translit: 'Ya khochu pobachyty tebe.',
  correctEn: 'I want to see you.',
  distractorsEn: [
    'I saw you yesterday.',
    'I will call you tomorrow.',
    'I cannot see you.',
  ],
};

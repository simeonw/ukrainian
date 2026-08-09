// Person-conjugation tables for a small set of high-leverage modal/attitude
// verbs, for the standalone Conjugation Drill (js/ui/conjugation-drill.js).
// Deliberately hand-authored, not derived — conjugation involves real
// irregularity (т→ч, с→ш, б→бл consonant alternations below) that isn't
// safely generalizable from a dictionary-form entry the way bare infinitive
// substitution is (see substitution-fills.js's own reasoning for the same
// distinction).

export const PRONOUNS = [
  { uk: 'я', translit: 'ya', en: 'I' },
  { uk: 'ти', translit: 'ty', en: 'you' },
  { uk: 'він', translit: 'vin', en: 'he' },
  { uk: 'вона', translit: 'vona', en: 'she' },
  { uk: 'ми', translit: 'my', en: 'we' },
  { uk: 'ви', translit: 'vy', en: 'you (pl./formal)' },
  { uk: 'вони', translit: 'vony', en: 'they' },
];

export const MODALS = [
  {
    uk: 'хотіти',
    en: 'want',
    conjugation: { 'я': 'хочу', 'ти': 'хочеш', 'він': 'хоче', 'вона': 'хоче', 'ми': 'хочемо', 'ви': 'хочете', 'вони': 'хочуть' },
    translit: { 'я': 'khochu', 'ти': 'khochesh', 'він': 'khoche', 'вона': 'khoche', 'ми': 'khochemo', 'ви': 'khochete', 'вони': 'khochut\'' },
  },
  {
    uk: 'могти',
    en: 'can / be able to',
    conjugation: { 'я': 'можу', 'ти': 'можеш', 'він': 'може', 'вона': 'може', 'ми': 'можемо', 'ви': 'можете', 'вони': 'можуть' },
    translit: { 'я': 'mozhu', 'ти': 'mozhesh', 'він': 'mozhe', 'вона': 'mozhe', 'ми': 'mozhemo', 'ви': 'mozhete', 'вони': 'mozhut\'' },
  },
  {
    uk: 'мусити',
    en: 'have to / must',
    conjugation: { 'я': 'мушу', 'ти': 'мусиш', 'він': 'мусить', 'вона': 'мусить', 'ми': 'мусимо', 'ви': 'мусите', 'вони': 'мусять' },
    translit: { 'я': 'mushu', 'ти': 'musysh', 'він': 'musyt\'', 'вона': 'musyt\'', 'ми': 'musymo', 'ви': 'musyte', 'вони': 'musyat\'' },
  },
  {
    uk: 'любити',
    en: 'like / love',
    conjugation: { 'я': 'люблю', 'ти': 'любиш', 'він': 'любить', 'вона': 'любить', 'ми': 'любимо', 'ви': 'любите', 'вони': 'люблять' },
    translit: { 'я': 'lyublyu', 'ти': 'lyubysh', 'він': 'lyubyt\'', 'вона': 'lyubyt\'', 'ми': 'lyubymo', 'ви': 'lyubyte', 'вони': 'lyublyat\'' },
  },
];

export function conjugate(modal, pronoun) {
  return { uk: modal.conjugation[pronoun.uk], translit: modal.translit[pronoun.uk] };
}

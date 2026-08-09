// Person-conjugation tables for a set of high-leverage verbs that take a
// following infinitive, for the standalone Conjugation Drill
// (js/ui/conjugation-drill.js). Deliberately hand-authored, not derived —
// conjugation involves real irregularity (т→ч, с→ш, б→бл consonant
// alternations, reflexive -ся endings below) that isn't safely
// generalizable from a dictionary-form entry the way bare infinitive
// substitution is (see substitution-fills.js's own reasoning for the same
// distinction).
//
// Each modal also carries its own englishFor(pronoun) — English
// complementation isn't uniform across these (true modals like "can" take
// a bare infinitive; "have to"/"has to" already contains "to"; "be
// afraid" conjugates the copula am/is/are, not a regular verb -s) — a
// single shared template would get several of these wrong, so each verb
// owns its own small, auditable rendering rather than being forced
// through one generic pattern.

export const PRONOUNS = [
  { uk: 'я', translit: 'ya', en: 'I' },
  { uk: 'ти', translit: 'ty', en: 'you' },
  { uk: 'він', translit: 'vin', en: 'he' },
  { uk: 'вона', translit: 'vona', en: 'she' },
  { uk: 'ми', translit: 'my', en: 'we' },
  { uk: 'ви', translit: 'vy', en: 'you (pl./formal)' },
  { uk: 'вони', translit: 'vony', en: 'they' },
];

function is3rdSg(pronoun) {
  return pronoun.uk === 'він' || pronoun.uk === 'вона';
}

export const MODALS = [
  {
    uk: 'хотіти',
    enLabel: 'want',
    conjugation: { 'я': 'хочу', 'ти': 'хочеш', 'він': 'хоче', 'вона': 'хоче', 'ми': 'хочемо', 'ви': 'хочете', 'вони': 'хочуть' },
    translit: { 'я': 'khochu', 'ти': 'khochesh', 'він': 'khoche', 'вона': 'khoche', 'ми': 'khochemo', 'ви': 'khochete', 'вони': 'khochut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'wants' : 'want'} to ${infEn}.`; },
  },
  {
    uk: 'могти',
    enLabel: 'can / be able to',
    conjugation: { 'я': 'можу', 'ти': 'можеш', 'він': 'може', 'вона': 'може', 'ми': 'можемо', 'ви': 'можете', 'вони': 'можуть' },
    translit: { 'я': 'mozhu', 'ти': 'mozhesh', 'він': 'mozhe', 'вона': 'mozhe', 'ми': 'mozhemo', 'ви': 'mozhete', 'вони': 'mozhut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} can ${infEn}.`; },
  },
  {
    uk: 'мусити',
    enLabel: 'have to / must',
    conjugation: { 'я': 'мушу', 'ти': 'мусиш', 'він': 'мусить', 'вона': 'мусить', 'ми': 'мусимо', 'ви': 'мусите', 'вони': 'мусять' },
    translit: { 'я': 'mushu', 'ти': 'musysh', 'він': 'musyt\'', 'вона': 'musyt\'', 'ми': 'musymo', 'ви': 'musyte', 'вони': 'musyat\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'has' : 'have'} to ${infEn}.`; },
  },
  {
    uk: 'любити',
    enLabel: 'like / love',
    conjugation: { 'я': 'люблю', 'ти': 'любиш', 'він': 'любить', 'вона': 'любить', 'ми': 'любимо', 'ви': 'любите', 'вони': 'люблять' },
    translit: { 'я': 'lyublyu', 'ти': 'lyubysh', 'він': 'lyubyt\'', 'вона': 'lyubyt\'', 'ми': 'lyubymo', 'ви': 'lyubyte', 'вони': 'lyublyat\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'likes' : 'like'} to ${infEn}.`; },
  },
  {
    uk: 'починати',
    enLabel: 'start',
    conjugation: { 'я': 'починаю', 'ти': 'починаєш', 'він': 'починає', 'вона': 'починає', 'ми': 'починаємо', 'ви': 'починаєте', 'вони': 'починають' },
    translit: { 'я': 'pochynayu', 'ти': 'pochynayesh', 'він': 'pochynaye', 'вона': 'pochynaye', 'ми': 'pochynayemo', 'ви': 'pochynayete', 'вони': 'pochynayut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'starts' : 'start'} to ${infEn}.`; },
  },
  {
    uk: 'пробувати',
    enLabel: 'try',
    conjugation: { 'я': 'пробую', 'ти': 'пробуєш', 'він': 'пробує', 'вона': 'пробує', 'ми': 'пробуємо', 'ви': 'пробуєте', 'вони': 'пробують' },
    translit: { 'я': 'probuyu', 'ти': 'probuyesh', 'він': 'probuye', 'вона': 'probuye', 'ми': 'probuyemo', 'ви': 'probuyete', 'вони': 'probuyut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'tries' : 'try'} to ${infEn}.`; },
  },
  {
    uk: 'забувати',
    enLabel: 'forget',
    conjugation: { 'я': 'забуваю', 'ти': 'забуваєш', 'він': 'забуває', 'вона': 'забуває', 'ми': 'забуваємо', 'ви': 'забуваєте', 'вони': 'забувають' },
    translit: { 'я': 'zabuvayu', 'ти': 'zabuvayesh', 'він': 'zabuvaye', 'вона': 'zabuvaye', 'ми': 'zabuvayemo', 'ви': 'zabuvayete', 'вони': 'zabuvayut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'forgets' : 'forget'} to ${infEn}.`; },
  },
  {
    uk: 'обіцяти',
    enLabel: 'promise',
    conjugation: { 'я': 'обіцяю', 'ти': 'обіцяєш', 'він': 'обіцяє', 'вона': 'обіцяє', 'ми': 'обіцяємо', 'ви': 'обіцяєте', 'вони': 'обіцяють' },
    translit: { 'я': 'obitsyayu', 'ти': 'obitsyayesh', 'він': 'obitsyaye', 'вона': 'obitsyaye', 'ми': 'obitsyayemo', 'ви': 'obitsyayete', 'вони': 'obitsyayut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'promises' : 'promise'} to ${infEn}.`; },
  },
  {
    uk: 'планувати',
    enLabel: 'plan',
    conjugation: { 'я': 'планую', 'ти': 'плануєш', 'він': 'планує', 'вона': 'планує', 'ми': 'плануємо', 'ви': 'плануєте', 'вони': 'планують' },
    translit: { 'я': 'planuyu', 'ти': 'planuyesh', 'він': 'planuye', 'вона': 'planuye', 'ми': 'planuyemo', 'ви': 'planuyete', 'вони': 'planuyut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'plans' : 'plan'} to ${infEn}.`; },
  },
  {
    uk: 'вирішувати',
    enLabel: 'decide',
    conjugation: { 'я': 'вирішую', 'ти': 'вирішуєш', 'він': 'вирішує', 'вона': 'вирішує', 'ми': 'вирішуємо', 'ви': 'вирішуєте', 'вони': 'вирішують' },
    translit: { 'я': 'vyrishuyu', 'ти': 'vyrishuyesh', 'він': 'vyrishuye', 'вона': 'vyrishuye', 'ми': 'vyrishuyemo', 'ви': 'vyrishuyete', 'вони': 'vyrishuyut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'decides' : 'decide'} to ${infEn}.`; },
  },
  {
    uk: 'продовжувати',
    enLabel: 'continue',
    conjugation: { 'я': 'продовжую', 'ти': 'продовжуєш', 'він': 'продовжує', 'вона': 'продовжує', 'ми': 'продовжуємо', 'ви': 'продовжуєте', 'вони': 'продовжують' },
    translit: { 'я': 'prodovzhuyu', 'ти': 'prodovzhuyesh', 'він': 'prodovzhuye', 'вона': 'prodovzhuye', 'ми': 'prodovzhuyemo', 'ви': 'prodovzhuyete', 'вони': 'prodovzhuyut\'' },
    englishFor(pronoun, infEn) { return `${pronoun.en} ${is3rdSg(pronoun) ? 'continues' : 'continue'} to ${infEn}.`; },
  },
  {
    uk: 'боятися',
    enLabel: 'be afraid',
    conjugation: { 'я': 'боюся', 'ти': 'боїшся', 'він': 'боїться', 'вона': 'боїться', 'ми': 'боїмося', 'ви': 'боїтеся', 'вони': 'бояться' },
    translit: { 'я': 'boyusya', 'ти': 'boyishsya', 'він': 'boyit\'sya', 'вона': 'boyit\'sya', 'ми': 'boyimosya', 'ви': 'boyitesya', 'вони': 'boyat\'sya' },
    englishFor(pronoun, infEn) {
      const be = pronoun.uk === 'я' ? 'am' : is3rdSg(pronoun) ? 'is' : 'are';
      return `${pronoun.en} ${be} afraid to ${infEn}.`;
    },
  },
];

export function conjugate(modal, pronoun) {
  return { uk: modal.conjugation[pronoun.uk], translit: modal.translit[pronoun.uk] };
}

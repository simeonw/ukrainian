// Ukrainian-specific fill vocabulary for the 6 core grammar frames (finding 5:
// "Substitution templates are written but never reach the drill engine" —
// these are the same templates already authored in lessons.js's
// content.substitutions, now actually wired into core/generate.js so pool.js
// can draw combinatorial variants instead of 5 fixed example sentences per
// frame). Frame ids match patterns.js's existing `frame` field so a lesson's
// hand-written p_want_* items and its generated variants are the same family.
export const SUBSTITUTION_FRAMES = [
  {
    id: 'want+inf',
    topics: ['l04'],
    skills: ['grammar', 'understanding'],
    ukTemplate: 'Хочу ___.',
    translitTemplate: 'Khochu ___.',
    enTemplate: 'I want ___.',
    fills: [
      { uk: 'бачити тебе', translit: 'bachyty tebe', en: 'to see you' },
      { uk: 'поговорити', translit: 'pohovoryty', en: 'to talk' },
      { uk: 'зробити це', translit: 'zrobyty tse', en: 'to do this' },
      { uk: 'каву', translit: 'kavu', en: '(some) coffee' },
      { uk: 'чай', translit: 'chai', en: '(some) tea' },
      { uk: 'відпочити', translit: 'vidpochyty', en: 'to rest' },
    ],
  },
  {
    id: 'can+inf',
    topics: ['l05'],
    skills: ['grammar', 'production'],
    ukTemplate: 'Можу ___.',
    translitTemplate: 'Mozhu ___.',
    enTemplate: 'I can ___.',
    fills: [
      { uk: 'прийти', translit: 'pryyty', en: 'come' },
      { uk: 'допомогти', translit: 'dopomohty', en: 'help' },
      { uk: 'чекати', translit: 'chekaty', en: 'wait' },
      { uk: 'зрозуміти', translit: 'zrozumity', en: 'understand' },
    ],
  },
  {
    id: 'future',
    topics: ['l07'],
    skills: ['grammar', 'production'],
    ukTemplate: 'Буду ___.',
    translitTemplate: 'Budu ___.',
    enTemplate: 'I will ___.',
    fills: [
      { uk: 'працювати', translit: 'pratsyuvaty', en: 'work' },
      { uk: 'чекати', translit: 'chekaty', en: 'wait' },
      { uk: 'говорити повільно', translit: "hovoryty povil'no", en: 'speak slowly' },
      { uk: 'вдома', translit: 'vdoma', en: 'be home' },
    ],
  },
  {
    id: 'past',
    topics: ['l08'],
    skills: ['past', 'understanding'],
    ukTemplate: 'Я ___ це вчора.',
    translitTemplate: 'Ya ___ tse vchora.',
    enTemplate: 'I ___ this yesterday.',
    fills: [
      { uk: 'зробив', translit: 'zrobyv', en: 'did' },
      { uk: 'сказав', translit: 'skazav', en: 'said' },
      { uk: 'бачив', translit: 'bachyv', en: 'saw' },
      { uk: 'знайшов', translit: 'znayshov', en: 'found' },
      { uk: 'чув', translit: 'chuv', en: 'heard' },
    ],
  },
  {
    id: 'need',
    topics: ['l11'],
    skills: ['grammar', 'production'],
    ukTemplate: 'Мені треба ___.',
    translitTemplate: 'Meni treba ___.',
    enTemplate: 'I need to ___.',
    fills: [
      { uk: 'йти', translit: 'yty', en: 'go' },
      { uk: 'працювати', translit: 'pratsyuvaty', en: 'work' },
      { uk: 'чекати', translit: 'chekaty', en: 'wait' },
      { uk: 'відпочити', translit: 'vidpochyty', en: 'rest' },
    ],
  },
  {
    id: 'conditional',
    topics: ['l10'],
    skills: ['conditional', 'production'],
    ukTemplate: 'Я ___ би.',
    translitTemplate: 'Ya ___ by.',
    enTemplate: 'I would ___.',
    fills: [
      { uk: 'хотів', translit: 'khotiv', en: 'like' },
      { uk: 'пішов', translit: 'pishov', en: 'go' },
      { uk: 'мав', translit: 'mav', en: 'have to' },
      { uk: 'зробив', translit: 'zrobyv', en: 'do it' },
    ],
  },
];

// Word-level interactive definitions mapping database.
// Allows tapping on individual words in both directions to show meanings, related forms, etc.
export const WORD_MODALS = {
  // Ukrainian words
  'я': {
    meanings: ['I'],
    related: [
      { word: 'мене', en: 'me' },
      { word: 'мені', en: 'to me' },
      { word: 'мною', en: 'with me' }
    ]
  },
  'хочу': {
    meanings: ['want (I want)', 'desire'],
    related: [
      { word: 'хочеш', en: 'want (you want)' },
      { word: 'хоче', en: 'wants (he/she/it wants)' },
      { word: 'хочемо', en: 'want (we want)' },
      { word: 'хотіти', en: 'to want' }
    ]
  },
  'хотів': {
    meanings: ['wanted / would like (male speaker)', 'wished'],
    related: [
      { word: 'хотіла', en: 'wanted (female)' },
      { word: 'хотіли', en: 'wanted (plural)' },
      { word: 'хотів би', en: 'would like (masculine)' },
      { word: 'хотіла б', en: 'would like (feminine)' }
    ]
  },
  'би': {
    meanings: ['would / should (conditional particle)'],
    related: [
      { word: 'б', en: 'would (used after vowels)' }
    ]
  },
  'побачити': {
    meanings: ['to see (once, complete)', 'meet up'],
    related: [
      { word: 'бачити', en: 'to see (ongoing)' },
      { word: 'побачу', en: 'I will see' },
      { word: 'побачимось', en: 'we will see each other' }
    ]
  },
  'тебе': {
    meanings: ['you (informal accusative / genitive)', 'thee'],
    related: [
      { word: 'ти', en: 'you (subject)' },
      { word: 'тобі', en: 'to you' },
      { word: 'тобою', en: 'with you' }
    ]
  },
  'завтра': {
    meanings: ['tomorrow'],
    related: [
      { word: 'сьогодні', en: 'today' },
      { word: 'вчора', en: 'yesterday' }
    ]
  },
  'зміг': {
    meanings: ['was able to / managed to (male)', 'could'],
    related: [
      { word: 'можу', en: 'I can' },
      { word: 'міг', en: 'could (he could)' },
      { word: 'міг би', en: 'could/would be able' },
      { word: 'змогла', en: 'was able to (female)' },
      { word: 'змогли', en: 'were able to (plural)' }
    ]
  },
  'прийти': {
    meanings: ['to come / arrive (once, complete)'],
    related: [
      { word: 'приходити', en: 'to come (repeatedly)' },
      { word: 'прийду', en: 'I will come' },
      { word: 'прийшов', en: 'came (he came)' }
    ]
  },
  'вчора': {
    meanings: ['yesterday'],
    related: [
      { word: 'завтра', en: 'tomorrow' },
      { word: 'сьогодні', en: 'today' }
    ]
  },
  'тому': {
    meanings: ['because / that\'s why / therefore'],
    related: [
      { word: 'тому що', en: 'because' },
      { word: 'чому', en: 'why' }
    ]
  },
  'що': {
    meanings: ['what / that (conjunction)'],
    related: [
      { word: 'хто', en: 'who' }
    ]
  },
  'був': {
    meanings: ['was (masculine)'],
    related: [
      { word: 'була', en: 'was (feminine)' },
      { word: 'було', en: 'was (neuter)' },
      { word: 'були', en: 'were (plural)' },
      { word: 'бути', en: 'to be' }
    ]
  },
  'дуже': {
    meanings: ['very / extremely'],
    related: [
      { word: 'багато', en: 'many / a lot' }
    ]
  },
  'зайнятий': {
    meanings: ['busy / occupied (masculine)'],
    related: [
      { word: 'зайнята', en: 'busy (feminine)' },
      { word: 'зайняті', en: 'busy (plural)' }
    ]
  },
  'якби': {
    meanings: ['if (hypothetical)', 'kdyby (Czech)'],
    related: [
      { word: 'як', en: 'how' },
      { word: 'якщо', en: 'if (factual)' }
    ]
  },
  'знав': {
    meanings: ['knew (he knew / masculine)'],
    related: [
      { word: 'знала', en: 'knew (she knew)' },
      { word: 'знати', en: 'to know' },
      { word: 'знаю', en: 'I know' }
    ]
  },
  'тоді': {
    meanings: ['then / at that time'],
    related: [
      { word: 'зараз', en: 'now' },
      { word: 'коли', en: 'when' }
    ]
  },
  'те': {
    meanings: ['that (neuter pronoun)'],
    related: [
      { word: 'той', en: 'that (masculine)' },
      { word: 'та', en: 'that (feminine)' }
    ]
  },
  'знаю': {
    meanings: ['know (I know)'],
    related: [
      { word: 'знаєш', en: 'know (you know)' },
      { word: 'знати', en: 'to know' }
    ]
  },
  'зараз': {
    meanings: ['now / currently'],
    related: [
      { word: 'тоді', en: 'then' }
    ]
  },
  'прийняв': {
    meanings: ['accepted / made / adopted (male)'],
    related: [
      { word: 'прийняла', en: 'accepted (female)' },
      { word: 'прийняти', en: 'to accept / make' }
    ]
  },
  'зовсім': {
    meanings: ['completely / totally / at all'],
    related: [
      { word: 'зовсім інше', en: 'completely other' }
    ]
  },
  'інше': {
    meanings: ['other / different (neuter)'],
    related: [
      { word: 'інший', en: 'other (masculine)' },
      { word: 'інша', en: 'other (feminine)' }
    ]
  },
  'рішення': {
    meanings: ['decision / solution'],
    related: [
      { word: 'вирішити', en: 'to solve' },
      { word: 'вирішене', en: 'resolved' }
    ]
  },

  // English words for reverse dictionary
  'i': {
    meanings: ['я (ya)'],
    related: [
      { word: 'мене', en: 'me' },
      { word: 'мені', en: 'to me' }
    ]
  },
  'want': {
    meanings: ['хочу (khochu)', 'хотіти (khotity)'],
    related: [
      { word: 'хочеш', en: 'you want' },
      { word: 'хотів', en: 'wanted (male)' }
    ]
  },
  'see': {
    meanings: ['бачити (bachyty) - ongoing', 'побачити (pobachyty) - once'],
    related: [
      { word: 'бачу', en: 'I see' },
      { word: 'побачимось', en: 'we\'ll meet' }
    ]
  },
  'you': {
    meanings: ['ти (ty) - informal', 'ви (vy) - formal/plural'],
    related: [
      { word: 'тебе', en: 'you (accusative)' },
      { word: 'вас', en: 'you (formal accusative)' }
    ]
  },
  'could': {
    meanings: ['міг (mih) - was able (m)', 'змогла (zmohla) - was able (f)'],
    related: [
      { word: 'можу', en: 'can' },
      { word: 'міг би', en: 'could/would' }
    ]
  },
  'come': {
    meanings: ['прийти (pryyty) - complete', 'приходити (prykhodyty) - ongoing'],
    related: [
      { word: 'прийду', en: 'I will come' }
    ]
  },
  'yesterday': {
    meanings: ['вчора (vchora)'],
    related: [
      { word: 'завтра', en: 'tomorrow' }
    ]
  },
  'because': {
    meanings: ['тому що (tomu shcho)', 'бо (bo)'],
    related: []
  },
  'busy': {
    meanings: ['зайнятий (zayniatyi) - m', 'зайнята (zaynyata) - f'],
    related: []
  },
};

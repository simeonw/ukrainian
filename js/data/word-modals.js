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

  'переїхати': {
    meanings: ['move house / go across'],
    related: [
      { word: 'пере- (prefix)', en: 'across / over' },
      { word: 'їхати (root)', en: 'to go' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'пере- (across) + їхати (to go by vehicle)' },
      { word: 'Mental Picture', en: 'go across to a new home → move house / cross over' }
    ]
  },
  'переписати': {
    meanings: ['rewrite / write again'],
    related: [
      { word: 'пере- (prefix)', en: 'again' },
      { word: 'писати (root)', en: 'to write' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'пере- (again) + писати (to write)' },
      { word: 'Mental Picture', en: 'write again from the start → rewrite' }
    ]
  },
  'перечитати': {
    meanings: ['reread / read again'],
    related: [
      { word: 'пере- (prefix)', en: 'again' },
      { word: 'читати (root)', en: 'to read' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'пере- (again) + читати (to read)' },
      { word: 'Mental Picture', en: 'read again → reread' }
    ]
  },
  'передумати': {
    meanings: ['change one\'s mind / think over'],
    related: [
      { word: 'пере- (prefix)', en: 'over / again' },
      { word: 'думати (root)', en: 'to think' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'пере- (over) + думати (to think)' },
      { word: 'Mental Picture', en: 'think over again and change decision → change mind' }
    ]
  },
  'перебільшити': {
    meanings: ['exaggerate / make more'],
    related: [
      { word: 'пере- (prefix)', en: 'over / excess' },
      { word: 'більшити (root)', en: 'to make bigger' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'пере- (over) + більшити (to make bigger)' },
      { word: 'Mental Picture', en: 'make something over-sized or over-large → exaggerate' }
    ]
  },
  'перевантажити': {
    meanings: ['overload / load over'],
    related: [
      { word: 'пере- (prefix)', en: 'over' },
      { word: 'вантажити (root)', en: 'to load' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'пере- (over) + вантажити (to load)' },
      { word: 'Mental Picture', en: 'load over the capacity → overload' }
    ]
  },
  'перевірити': {
    meanings: ['verify / check over'],
    related: [
      { word: 'пере- (prefix)', en: 'over' },
      { word: 'вірити (root)', en: 'to believe' },
      { word: 'Composition', en: 'Semantically Related' },
      { word: 'Literal', en: 'пере- (over) + вірити (to believe)' },
      { word: 'Mental Picture', en: 'look over a belief to check correctness → verify' }
    ]
  },
  'перекласти': {
    meanings: ['translate / put across'],
    related: [
      { word: 'пере- (prefix)', en: 'across' },
      { word: 'класти (root)', en: 'to lay/put' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'пере- (across) + класти (to lay/put)' },
      { word: 'Mental Picture', en: 'lay words across to another language → translate' }
    ]
  },
  'переконати': {
    meanings: ['convince / bring over'],
    related: [
      { word: 'пере- (prefix)', en: 'over / completely' },
      { word: 'конати (root)', en: 'to finish/end' },
      { word: 'Composition', en: 'Semantically Related' },
      { word: 'Literal', en: 'пере- (over) + конати (to finish/end)' },
      { word: 'Mental Picture', en: 'overcome doubts to bring over to your side → convince' }
    ]
  },
  'передбачити': {
    meanings: ['foresee / predict'],
    related: [
      { word: 'перед- (prefix)', en: 'before' },
      { word: 'бачити (root)', en: 'to see' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'перед- (before) + бачити (to see)' },
      { word: 'Mental Picture', en: 'see beforehand → foresee / predict' }
    ]
  },
  'переглянути': {
    meanings: ['review / look over / watch'],
    related: [
      { word: 'пере- (prefix)', en: 'over' },
      { word: 'глянути (root)', en: 'to look' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'пере- (over) + глянути (to look)' },
      { word: 'Mental Picture', en: 'look over a document or movie → review / watch' }
    ]
  },
  'розібрати': {
    meanings: ['take apart / disassemble / analyze / understand'],
    related: [
      { word: 'роз- (prefix)', en: 'apart' },
      { word: 'брати (root)', en: 'to take' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'роз- (apart) + брати (to take)' },
      { word: 'Mental Picture', en: 'take apart to analyze → disassemble / analyze / understand' }
    ]
  },
  'розділити': {
    meanings: ['divide / share'],
    related: [
      { word: 'роз- (prefix)', en: 'apart' },
      { word: 'ділити (root)', en: 'to share/divide' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'роз- (apart) + ділити (to divide)' },
      { word: 'Mental Picture', en: 'make things apart by dividing → divide' }
    ]
  },
  'розкрити': {
    meanings: ['reveal / uncover / open apart'],
    related: [
      { word: 'роз- (prefix)', en: 'apart' },
      { word: 'крити (root)', en: 'to cover' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'роз- (apart) + крити (to cover)' },
      { word: 'Mental Picture', en: 'uncover apart what was hidden → reveal / uncover' }
    ]
  },
  'розповісти': {
    meanings: ['tell / narrate'],
    related: [
      { word: 'роз- (prefix)', en: 'outward' },
      { word: 'повісти (root)', en: 'to tell' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'роз- (outward) + повісти (to tell)' },
      { word: 'Mental Picture', en: 'tell out a story outward → tell / narrate' }
    ]
  },
  'розбудити': {
    meanings: ['wake someone up'],
    related: [
      { word: 'роз- (prefix)', en: 'outward' },
      { word: 'будити (root)', en: 'to wake' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'роз- (outward) + будити (to wake)' },
      { word: 'Mental Picture', en: 'awaken someone out of sleep → wake someone' }
    ]
  },
  'розпочати': {
    meanings: ['start / begin'],
    related: [
      { word: 'роз- (prefix)', en: 'outward' },
      { word: 'почати (root)', en: 'to begin' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'роз- (outward) + почати (to begin)' },
      { word: 'Mental Picture', en: 'begin outward → start / commence' }
    ]
  },
  'розглянути': {
    meanings: ['examine / consider / look apart'],
    related: [
      { word: 'роз- (prefix)', en: 'apart' },
      { word: 'глянути (root)', en: 'to look' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'роз- (apart) + глянути (to look)' },
      { word: 'Mental Picture', en: 'look around or look apart at details → examine / consider' }
    ]
  },
  'підписати': {
    meanings: ['sign / write under'],
    related: [
      { word: 'під- (prefix)', en: 'under' },
      { word: 'писати (root)', en: 'to write' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'під- (under) + писати (to write)' },
      { word: 'Mental Picture', en: 'write one\'s name under a document → sign' }
    ]
  },
  'підказати': {
    meanings: ['give a hint / say under'],
    related: [
      { word: 'під- (prefix)', en: 'under / to' },
      { word: 'казати (root)', en: 'to say' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'під- (under/to) + казати (to say)' },
      { word: 'Mental Picture', en: 'say quietly under one\'s breath to help → give a hint' }
    ]
  },
  'підтримати': {
    meanings: ['support / hold up'],
    related: [
      { word: 'під- (prefix)', en: 'up / under' },
      { word: 'тримати (root)', en: 'to hold' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'під- (up/under) + тримати (to hold)' },
      { word: 'Mental Picture', en: 'hold up from underneath to keep from falling → support' }
    ]
  },
  'підняти': {
    meanings: ['lift / raise up'],
    related: [
      { word: 'під- (prefix)', en: 'up' },
      { word: 'няти (root)', en: 'to take/raise' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'під- (up) + няти (to take/raise)' },
      { word: 'Mental Picture', en: 'take up or raise up → lift / raise' }
    ]
  },
  'підійти': {
    meanings: ['approach / go up to'],
    related: [
      { word: 'під- (prefix)', en: 'up to' },
      { word: 'йти (root)', en: 'to go' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'під- (up to) + йти (to go)' },
      { word: 'Mental Picture', en: 'go up to someone/something → approach' }
    ]
  },
  'підготувати': {
    meanings: ['prepare / prepare underneath'],
    related: [
      { word: 'під- (prefix)', en: 'underneath' },
      { word: 'готувати (root)', en: 'to prepare' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'під- (underneath) + готувати (to prepare)' },
      { word: 'Mental Picture', en: 'prepare underneath in advance → prepare' }
    ]
  },
  'вийти': {
    meanings: ['exit / go out'],
    related: [
      { word: 'ви- (prefix)', en: 'out' },
      { word: 'йти (root)', en: 'to go' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'ви- (out) + йти (to go)' },
      { word: 'Mental Picture', en: 'go out on foot → exit / go out' }
    ]
  },
  'винести': {
    meanings: ['take out / carry out'],
    related: [
      { word: 'ви- (prefix)', en: 'out' },
      { word: 'нести (root)', en: 'to carry' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'ви- (out) + нести (to carry)' },
      { word: 'Mental Picture', en: 'carry out something → take out / carry out' }
    ]
  },
  'виписати': {
    meanings: ['write out / extract'],
    related: [
      { word: 'ви- (prefix)', en: 'out' },
      { word: 'писати (root)', en: 'to write' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'ви- (out) + писати (to write)' },
      { word: 'Mental Picture', en: 'write out elements from a text → write out / extract' }
    ]
  },
  'виговорити': {
    meanings: ['articulate / pronounce / speak out'],
    related: [
      { word: 'ви- (prefix)', en: 'out' },
      { word: 'говорити (root)', en: 'to speak' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'ви- (out) + говорити (to speak)' },
      { word: 'Mental Picture', en: 'speak out clearly and articulate → articulate / pronounce' }
    ]
  },
  'виявити': {
    meanings: ['reveal / discover / bring out'],
    related: [
      { word: 'ви- (prefix)', en: 'out' },
      { word: 'явити (root)', en: 'to show' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'ви- (out) + явити (to show/make visible)' },
      { word: 'Mental Picture', en: 'make visible or bring out → reveal / discover' }
    ]
  },
  'витримати': {
    meanings: ['endure / withstand / hold out'],
    related: [
      { word: 'ви- (prefix)', en: 'out' },
      { word: 'тримати (root)', en: 'to hold' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'ви- (out) + тримати (to hold)' },
      { word: 'Mental Picture', en: 'hold out against pressure → endure / withstand' }
    ]
  },
  'заперечити': {
    meanings: ['deny / object / speak against'],
    related: [
      { word: 'за- (prefix)', en: 'against' },
      { word: 'перечити (root)', en: 'to contradict' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'за- (against) + перечити (to contradict)' },
      { word: 'Mental Picture', en: 'speak against a claim → deny / object' }
    ]
  },
  'запам\'ятати': {
    meanings: ['memorize / remember / put into memory'],
    related: [
      { word: 'за- (prefix)', en: 'into' },
      { word: 'пам\'ятати (root)', en: 'to remember' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'за- (into) + пам\'ятати (to remember)' },
      { word: 'Mental Picture', en: 'put into memory → memorize / remember' }
    ]
  },
  'забути': {
    meanings: ['forget / be behind'],
    related: [
      { word: 'за- (prefix)', en: 'behind' },
      { word: 'бути (root)', en: 'to be' },
      { word: 'Composition', en: 'Historical Coincidence (Do not decompose)' },
      { word: 'Literal', en: 'за- (behind) + бути (to be)' },
      { word: 'Mental Picture', en: 'be behind or away in consciousness (unproductive folk-looking decomposition today)' }
    ]
  },
  'відмовити': {
    meanings: ['refuse / deny / speak away'],
    related: [
      { word: 'від- (prefix)', en: 'away' },
      { word: 'мовити (root)', en: 'to speak' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'від- (away) + мовити (to speak)' },
      { word: 'Mental Picture', en: 'speak away/from a request → refuse / deny' }
    ]
  },
  'дослідити': {
    meanings: ['investigate / examine / follow steps to the end'],
    related: [
      { word: 'до- (prefix)', en: 'to end' },
      { word: 'слідити (root)', en: 'to follow steps' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'до- (to end) + слідити (to follow steps)' },
      { word: 'Mental Picture', en: 'follow steps to the very end → investigate / examine' }
    ]
  },
  'простежити': {
    meanings: ['trace / monitor / follow through'],
    related: [
      { word: 'про- (prefix)', en: 'through' },
      { word: 'стежити (root)', en: 'to monitor' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'про- (through) + стежити (to monitor)' },
      { word: 'Mental Picture', en: 'follow through the course → trace / monitor' }
    ]
  },
  'продумати': {
    meanings: ['think through / work out completely'],
    related: [
      { word: 'про- (prefix)', en: 'through' },
      { word: 'думати (root)', en: 'to think' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'про- (through) + думати (to think)' },
      { word: 'Mental Picture', en: 'think through completely → think through / work out' }
    ]
  },
  'утримати': {
    meanings: ['retain / hold in / hold back'],
    related: [
      { word: 'у- (prefix)', en: 'in' },
      { word: 'тримати (root)', en: 'to hold' },
      { word: 'Composition', en: 'Actually Transparent' },
      { word: 'Literal', en: 'у- (in) + тримати (to hold)' },
      { word: 'Mental Picture', en: 'hold inside / keep back → retain / hold back' }
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

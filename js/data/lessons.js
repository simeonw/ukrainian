// 37 lesson sections. itemIds are the vocab.js/patterns.js ids that count toward this
// lesson's mastery calculation (see srs.computeLessonProgress). content is display-only.
function L(id, order, title, kind, summary, itemIds, content) {
  return { id, order, title, kind, summary, itemIds, content };
}

export const LESSONS = [
  L('l01', 1, 'Diagnostic: What Do You Already Know?', 'diagnostic',
    'A quick 3-part check of what you can already recognize from Czech, before any teaching starts.',
    ['v_voda', 'v_ruka', 'v_brat', 'v_sestra', 'v_misto', 'v_robyty', 'v_bachyty', 'v_hovoryty', 'v_pysaty', 'v_khotity', 'p_want_2'],
    {
      patterns: [],
      examples: [],
      substitutions: [],
      czechNote: 'This lesson runs as an interactive diagnostic (word recognition, multiple choice, sentence recognition) rather than a normal reading lesson — open it from the home screen or the lesson list to start it.',
    }),

  L('l02', 2, 'Cyrillic & Sounds: A Phonetic Starter', 'phonetics',
    'Easy Slavic cognates to get comfortable reading Cyrillic before any grammar.',
    ['v_mama', 'v_tato', 'v_syn', 'v_dochka', 'v_dim', 'v_khlib', 'v_moloko', 'v_nich', 'v_den', 'v_rik'],
    {
      patterns: [
        { uk: 'и vs і', translit: 'y vs i', en: 'и is a short, flat "i" (like in "bit"); і is a clear "ee" (like in "see").', czNote: 'Czech only has one "i" sound, so this distinction takes a little extra listening — compare син (syn, "son") with sound "y" against рік (rik, "year") with sound "i".' },
        { uk: 'г vs х', translit: 'h vs kh', en: 'г is a soft "h" (like English "hello"); х is a harsher, throat "kh" (like Czech "ch" in "chleba").', czNote: 'Ukrainian г = Czech h; Ukrainian х = Czech ch. хліб (khlib, "bread") sounds close to Czech "chléb".' },
      ],
      examples: [
        { uk: 'мама', translit: 'mama', en: 'mom', cz: 'máma' },
        { uk: 'тато', translit: 'tato', en: 'dad', cz: 'táta' },
        { uk: 'дім', translit: 'dim', en: 'house / home', cz: 'dům' },
        { uk: 'хліб', translit: 'khlib', en: 'bread', cz: 'chléb' },
        { uk: 'молоко', translit: 'moloko', en: 'milk', cz: 'mléko' },
      ],
      substitutions: [
        { template: 'Це ___.', translit: 'Tse ___.', en: 'This is ___.', slotOptions: ['дім', 'хліб', 'молоко', 'книга'] },
      ],
      czechNote: 'Most of these words are close enough to Czech that you can likely guess them cold — the goal here is just training your eye to read Cyrillic quickly, not learning new meanings.',
    }),

  L('l03', 3, 'High-Frequency Words & Greetings Warm-up', 'vocab',
    'The small connector words and core verbs you will reuse in almost every later lesson.',
    ['v_pryvit', 'v_diakuyu', 'v_bud_laska', 'v_tak', 'v_ni', 'v_ya', 'v_ty', 'v_vy', 'v_buty', 'v_yty', 'v_maty'],
    {
      patterns: [
        { uk: 'ти vs ви', translit: 'ty vs vy', en: 'ти = informal "you" (friends, family, children); ви = formal "you" or plural "you".', czNote: 'Works exactly like Czech ty/vy — same social rule, same choice to make.' },
      ],
      examples: [
        { uk: 'Привіт! Як ти?', translit: 'Pryvit! Yak ty?', en: 'Hi! How are you? (informal)', cz: 'Ahoj! Jak se máš?' },
        { uk: 'Дякую, добре.', translit: 'Diakuyu, dobre.', en: 'Thanks, good.', cz: 'Děkuji, dobře.' },
        { uk: 'Так, будь ласка.', translit: 'Tak, bud\' laska.', en: 'Yes, please.', cz: 'Ano, prosím.' },
      ],
      substitutions: [
        { template: '___, будь ласка.', translit: '___, bud\' laska.', en: '___, please.', slotOptions: ['Так', 'Ні', 'Вода'] },
      ],
      czechNote: 'These are the highest-frequency words in the language — worth over-learning now since every later lesson leans on them.',
    }),

  L('l04', 4, 'Sentence Frame 1: Want + Infinitive', 'grammar',
    'Хочу + infinitive — say what you want to do.',
    ['p_want_1', 'p_want_2', 'p_want_3', 'p_want_4', 'p_want_5', 'v_khotity', 'v_pobachyty', 'v_pohovoryty', 'v_zrobyty', 'v_kava'],
    {
      patterns: [
        { uk: 'Хочу + infinitive', translit: 'Khochu + inf', en: 'I want to + verb', czNote: 'Identical structure to Czech "Chci + infinitiv" (Chci přijít. = I want to come.) — no extra helper word needed.' },
      ],
      examples: [
        { uk: 'Хочу бачити тебе.', translit: 'Khochu bachyty tebe.', en: 'I want to see you (in general).', cz: 'Chci tě vidět.' },
        { uk: 'Я хочу побачити тебе.', translit: 'Ya khochu pobachyty tebe.', en: 'I want to see you.', cz: 'Chci tě uvidět.' },
        { uk: 'Хочу зробити це.', translit: 'Khochu zrobyty tse.', en: 'I want to do this.', cz: 'Chci to udělat.' },
        { uk: 'Хочу поговорити з тобою.', translit: 'Khochu pohovoryty z toboyu.', en: 'I want to talk with you.', cz: 'Chci si s tebou promluvit.' },
        { uk: 'Хочу каву.', translit: 'Khochu kavu.', en: 'I want (some) coffee.', cz: 'Chci kávu.' },
      ],
      substitutions: [
        { template: 'Хочу ___.', translit: 'Khochu ___.', en: 'I want ___ / to ___.', slotOptions: ['бачити тебе', 'поговорити', 'зробити це', 'каву'] },
      ],
      czechNote: 'Хочу works exactly like Czech "Chci" — drop it straight into any sentence with an infinitive or a noun and you\'re understandable immediately.',
    }),

  L('l05', 5, 'Sentence Frame 2: Can + Infinitive', 'grammar',
    'Можу + infinitive — say what you are able to do, cf. Czech "Můžu…".',
    ['p_can_1', 'p_can_2', 'p_can_3', 'p_can_4', 'v_mohty', 'v_pryyty', 'v_prykhodyty', 'v_dopomohty', 'v_dopomahaty'],
    {
      patterns: [
        { uk: 'Можу + infinitive', translit: 'Mozhu + inf', en: 'I can / am able to + verb', czNote: 'Same structure as Czech "Můžu + infinitiv" (Můžu přijít. = I can come.)' },
      ],
      examples: [
        { uk: 'Можу прийти.', translit: 'Mozhu pryyty.', en: 'I can come.', cz: 'Můžu přijít.' },
        { uk: 'Можу допомогти.', translit: 'Mozhu dopomohty.', en: 'I can help.', cz: 'Můžu pomoct.' },
        { uk: 'Можу чекати.', translit: 'Mozhu chekaty.', en: 'I can wait.', cz: 'Můžu čekat.' },
        { uk: 'Можеш допомогти мені?', translit: 'Mozhesh dopomohty meni?', en: 'Can you help me?', cz: 'Můžeš mi pomoct?' },
      ],
      substitutions: [
        { template: 'Можу ___.', translit: 'Mozhu ___.', en: 'I can ___.', slotOptions: ['прийти', 'допомогти', 'чекати'] },
      ],
      czechNote: 'можу/можеш/може change ending by person just like Czech můžu/můžeš/může — the pattern maps almost one-to-one.',
    }),

  L('l06', 6, 'Mini-Review: Want & Can in Conversation', 'review',
    'Combine frames 1 and 2 into short back-and-forth exchanges — no new vocabulary, just reps.',
    ['p_want_2', 'p_want_4', 'p_can_1', 'p_can_2', 'p_can_4'],
    {
      patterns: [],
      examples: [
        { uk: 'А: Можеш допомогти мені? Б: Так, можу прийти.', translit: 'A: Mozhesh dopomohty meni? B: Tak, mozhu pryyty.', en: 'A: Can you help me? B: Yes, I can come.', cz: 'A: Můžeš mi pomoct? B: Ano, můžu přijít.' },
        { uk: 'А: Хочу поговорити з тобою. Б: Добре, можу чекати.', translit: 'A: Khochu pohovoryty z toboyu. B: Dobre, mozhu chekaty.', en: 'A: I want to talk with you. B: Okay, I can wait.', cz: 'A: Chci si s tebou promluvit. B: Dobře, můžu čekat.' },
      ],
      substitutions: [],
      czechNote: 'If both of these frames feel automatic, you can already build a surprising number of real sentences — that\'s the point of pausing here before adding more grammar.',
    }),

  L('l07', 7, 'Sentence Frame 3: Future Tense', 'grammar',
    'Буду + infinitive — say what you will do, cf. Czech "Budu…".',
    ['p_future_1', 'p_future_2', 'p_future_3', 'p_future_4', 'v_pratsyuvaty', 'v_chekaty'],
    {
      patterns: [
        { uk: 'Буду + infinitive', translit: 'Budu + inf', en: 'I will + verb', czNote: 'Directly parallels Czech "Budu + infinitiv" (Budu čekat. = I will wait.)' },
      ],
      examples: [
        { uk: 'Буду працювати.', translit: 'Budu pratsyuvaty.', en: 'I will work / I will be working.', cz: 'Budu pracovat.' },
        { uk: 'Буду чекати.', translit: 'Budu chekaty.', en: 'I will wait.', cz: 'Budu čekat.' },
        { uk: 'Буду говорити повільно.', translit: 'Budu hovoryty povil\'no.', en: 'I will speak slowly.', cz: 'Budu mluvit pomalu.' },
        { uk: 'Завтра буду вдома.', translit: 'Zavtra budu vdoma.', en: 'Tomorrow I will be home.', cz: 'Zítra budu doma.' },
      ],
      substitutions: [
        { template: 'Буду ___.', translit: 'Budu ___.', en: 'I will ___.', slotOptions: ['працювати', 'чекати', 'говорити повільно'] },
      ],
      czechNote: 'Буду behaves just like Czech budu — same idea of an auxiliary "will be" verb plus an infinitive.',
    }),

  L('l08', 8, 'Sentence Frame 4: Past Tense & Gender Agreement', 'grammar',
    'я/ти/вона/вони + робив/робила/робили — Ukrainian past tense changes by gender, like Czech.',
    ['p_past_1', 'p_past_2', 'p_past_3', 'p_past_4', 'p_past_5', 'v_pishov', 'v_pishla', 'v_pishly', 'v_robyv', 'v_robyla', 'v_pity'],
    {
      patterns: [
        { uk: 'я/ти/вона/вони + робив/робила/робили', translit: '(m) robyv, (f) robyla, (pl) robyly', en: 'past tense agrees with the subject\'s gender (and plurality)', czNote: 'Works exactly like Czech "Dělal jsem. / Dělala jsem. / Dělali jsme." — same gender-agreement idea, Ukrainian just drops the "jsem" helper word.' },
      ],
      examples: [
        { uk: 'Я робив це вчора.', translit: 'Ya robyv tse vchora.', en: 'I was doing this yesterday. (male speaker)', cz: 'Dělal jsem to včera.' },
        { uk: 'Вона робила це вчора.', translit: 'Vona robyla tse vchora.', en: 'She was doing this yesterday.', cz: 'Dělala to včera.' },
        { uk: 'Я пішов додому.', translit: 'Ya pishov dodomu.', en: 'I went home. (male speaker)', cz: 'Šel jsem domů.' },
        { uk: 'Вона пішла додому.', translit: 'Vona pishla dodomu.', en: 'She went home.', cz: 'Šla domů.' },
        { uk: 'Вони пішли разом.', translit: 'Vony pishly razom.', en: 'They went together.', cz: 'Šli spolu.' },
      ],
      substitutions: [
        { template: 'Я ___ це вчора.', translit: 'Ya ___ tse vchora.', en: 'I ___ this yesterday.', slotOptions: ['робив (male speaker)', 'робила (female speaker)'] },
      ],
      czechNote: 'The hardest part for a Czech speaker is usually just remembering there is no separate "jsem/jsi" helper verb — the gendered ending alone carries the past tense.',
    }),

  L('l09', 9, 'Verb Aspect: Imperfective vs Perfective', 'grammar',
    'бачити/побачити, робити/зробити — ongoing action vs a completed result, taught through Czech pairs you already half-know.',
    ['v_bachyty', 'v_pobachyty', 'v_robyty', 'v_zrobyty', 'v_hovoryty', 'v_pohovoryty', 'v_pysaty', 'v_napysaty', 'v_pryyty', 'v_prykhodyty', 'v_dopomohty', 'v_dopomahaty'],
    {
      patterns: [
        { uk: 'imperfective / perfective', translit: '', en: 'Imperfective = ongoing or repeated action. Perfective = a completed, one-time result.', czNote: 'Same split as Czech: dělat/udělat, vidět/uvidět. If you already feel this distinction in Czech, you already understand Ukrainian aspect — you just need the new verb forms.' },
      ],
      examples: [
        { uk: 'бачити → побачити', translit: 'bachyty → pobachyty', en: 'to see (ongoing) → to see (this one time)', cz: 'vidět → uvidět' },
        { uk: 'робити → зробити', translit: 'robyty → zrobyty', en: 'to do (ongoing) → to do (complete it)', cz: 'dělat → udělat' },
        { uk: 'писати → написати', translit: 'pysaty → napysaty', en: 'to write (ongoing) → to write (finish it)', cz: 'psát → napsat' },
        { uk: 'приходити → прийти', translit: 'prykhodyty → pryyty', en: 'to come (repeatedly/regularly) → to come (arrive, once)', cz: 'přicházet → přijít' },
        { uk: 'допомагати → допомогти', translit: 'dopomahaty → dopomohty', en: 'to help (ongoing) → to help (complete act)', cz: 'pomáhat → pomoct' },
      ],
      substitutions: [
        { template: 'Хочу ___ це.', translit: 'Khochu ___ tse.', en: 'I want to ___ this.', slotOptions: ['робити (keep doing it)', 'зробити (finish it, once)'] },
      ],
      czechNote: 'Don\'t try to memorize a rule — just notice that most Ukrainian verbs come in these ongoing/complete pairs, exactly like the Czech pairs you already use without thinking.',
    }),

  L('l10', 10, 'Sentence Frame 5: Conditional "Would"', 'grammar',
    'Я хотів би / пішов би / мав би — an extremely useful, polite "would", cf. Czech "bych".',
    ['p_cond_1', 'p_cond_2', 'p_cond_3', 'p_cond_4', 'v_khotiv_by', 'v_pishov_by', 'v_mav_by'],
    {
      patterns: [
        { uk: '(verb, past form) + би', translit: '... by', en: 'would ...', czNote: 'Directly parallel to Czech "bych/bys/by": Šel bych. / Měl bych. / Chtěl bych. — Ukrainian би sits after the verb instead of attaching as a suffix, but the meaning maps 1:1.' },
      ],
      examples: [
        { uk: 'Я хотів би каву.', translit: 'Ya khotiv by kavu.', en: 'I would like (some) coffee.', cz: 'Chtěl bych kávu.' },
        { uk: 'Я пішов би завтра.', translit: 'Ya pishov by zavtra.', en: 'I would go tomorrow.', cz: 'Šel bych zítra.' },
        { uk: 'Я мав би зателефонувати.', translit: 'Ya mav by zatelefonuvaty.', en: 'I should call.', cz: 'Měl bych zavolat.' },
        { uk: 'Я хотів би поговорити з тобою.', translit: 'Ya khotiv by pohovoryty z toboyu.', en: 'I would like to talk with you.', cz: 'Chtěl bych si s tebou promluvit.' },
      ],
      substitutions: [
        { template: 'Я ___ би.', translit: 'Ya ___ by.', en: 'I would ...', slotOptions: ['хотів', 'пішов', 'мав'] },
      ],
      czechNote: 'This is one of the most useful frames in the whole course — "хотів би" alone (I would like) covers an enormous amount of everyday politeness.',
    }),

  L('l11', 11, 'Sentence Frame 6: Need / Should / Must', 'grammar',
    'Мушу, треба, мені треба, мав би — several ways to express obligation, cf. Czech "Musím / Měl bych".',
    ['p_need_1', 'p_need_2', 'p_need_3', 'p_need_4', 'p_need_5', 'v_musyty', 'v_treba', 'v_potribno'],
    {
      patterns: [
        { uk: 'мушу / треба / мені треба', translit: 'mushu / treba / meni treba', en: 'I must / one needs to / I need to', czNote: 'мушу = Czech "musím" directly. треба (impersonal, "mені треба" = literally "to-me it-is-needed") has no exact single-word Czech equivalent but functions like "je potřeba/musím".' },
      ],
      examples: [
        { uk: 'Мушу йти.', translit: 'Mushu yty.', en: 'I must go.', cz: 'Musím jít.' },
        { uk: 'Треба йти.', translit: 'Treba yty.', en: 'One needs to go.', cz: 'Je třeba jít.' },
        { uk: 'Мені треба йти.', translit: 'Meni treba yty.', en: 'I need to go.', cz: 'Musím jít.' },
        { uk: 'Я мав би піти.', translit: 'Ya mav by pity.', en: 'I should go.', cz: 'Měl bych jít.' },
        { uk: 'Мені потрібна допомога.', translit: 'Meni potribna dopomoha.', en: 'I need help.', cz: 'Potřebuji pomoc.' },
      ],
      substitutions: [
        { template: 'Мені треба ___.', translit: 'Meni treba ___.', en: 'I need to ___.', slotOptions: ['йти', 'працювати', 'чекати'] },
      ],
      czechNote: 'мушу is the strongest/most direct obligation; мені треба is softer and extremely common in everyday speech — when in doubt, use мені треба.',
    }),

  L('l12', 12, 'Checkpoint Review: The Six Frames Together', 'review',
    'Mixed recombination of all six sentence frames — no new vocabulary, just fluency reps.',
    ['p_want_2', 'p_can_1', 'p_future_1', 'p_past_1', 'p_cond_1', 'p_need_3'],
    {
      patterns: [],
      examples: [
        { uk: 'Хочу поговорити, але мушу йти. Можу прийти завтра.', translit: 'Khochu pohovoryty, ale mushu yty. Mozhu pryyty zavtra.', en: 'I want to talk, but I have to go. I can come tomorrow.', cz: 'Chci si promluvit, ale musím jít. Můžu přijít zítra.' },
        { uk: 'Я хотів би каву, але буду чекати тут.', translit: 'Ya khotiv by kavu, ale budu chekaty tut.', en: 'I would like a coffee, but I will wait here.', cz: 'Chtěl bych kávu, ale budu čekat tady.' },
      ],
      substitutions: [],
      czechNote: 'If you can follow both example sentences above without re-reading, the six frames are genuinely sticking — that\'s the whole foundation of the course.',
    }),

  L('l13', 13, 'Greetings & Introducing Yourself', 'topic',
    'The words you\'ll use in the very first seconds of any interaction.',
    ['v_dobryi_den', 'v_dobryi_vechir', 'v_do_pobachennya', 'v_mene_zvaty', 'v_yak_tebe_zvaty', 'v_pryyemno_poznayomytys'],
    {
      patterns: [
        { uk: 'Мене звати ___.', translit: 'Mene zvaty ___.', en: 'My name is ___.', czNote: 'Literally "me they-call ___" — a different construction from Czech "Jmenuji se", but used the exact same way.' },
      ],
      examples: [
        { uk: 'Добрий день! Мене звати Симеон.', translit: 'Dobryi den\'! Mene zvaty Symeon.', en: 'Good day! My name is Simeon.', cz: 'Dobrý den! Jmenuji se Simeon.' },
        { uk: 'Як тебе звати?', translit: 'Yak tebe zvaty?', en: 'What is your name? (informal)', cz: 'Jak se jmenuješ?' },
        { uk: 'Приємно познайомитись.', translit: 'Pryyemno poznayomytys\'.', en: 'Nice to meet you.', cz: 'Těší mě.' },
        { uk: 'До побачення!', translit: 'Do pobachennya!', en: 'Goodbye!', cz: 'Na shledanou!' },
      ],
      substitutions: [
        { template: '___!', translit: '', en: 'greeting for the time of day', slotOptions: ['Привіт', 'Добрий день', 'Добрий вечір'] },
      ],
      czechNote: 'Привіт is casual (like "ahoj"); Добрий день/вечір are the more neutral, safe default with strangers — same social calculus as Czech.',
    }),

  L('l14', 14, 'Asking How Someone Is / Small Talk', 'topic',
    'The reflexive small-talk exchange every conversation opens with.',
    ['v_yak_spravy', 'v_dobre', 'v_pohano', 'v_a_ty', 'v_yak'],
    {
      patterns: [
        { uk: 'Як справи?', translit: 'Yak spravy?', en: 'How are things?', czNote: 'Same function as Czech "Jak se máš?", though the literal words differ ("справи" = "affairs/matters").' },
      ],
      examples: [
        { uk: 'Як справи? — Добре, дякую. А ти?', translit: 'Yak spravy? — Dobre, diakuyu. A ty?', en: 'How are you? — Good, thanks. And you?', cz: 'Jak se máš? — Dobře, děkuji. A ty?' },
        { uk: 'Як справи? — Погано.', translit: 'Yak spravy? — Pohano.', en: 'How are you? — Not good.', cz: 'Jak se máš? — Špatně.' },
      ],
      substitutions: [
        { template: '— ___, дякую.', translit: '— ___, diakuyu.', en: '— ___, thanks.', slotOptions: ['Добре', 'Погано', 'Непогано'] },
      ],
      czechNote: 'This whole exchange is a fixed social ritual, just like in Czech — memorize it as one chunk rather than analyzing the grammar.',
    }),

  L('l15', 15, 'Making Plans & Invitations', 'topic',
    'Combine want/can/future with new vocabulary to propose meeting up.',
    ['v_proponuvaty', 'v_zustritysya', 'v_koly', 'v_s_ohodni', 'v_zavtra', 'v_o_kotriy_hodyni', 'p_want_4', 'p_can_1', 'p_future_4'],
    {
      patterns: [
        { uk: 'Хочу зустрітися ___.', translit: 'Khochu zustritysya ___.', en: 'I want to meet up ___.', czNote: 'Reuses Frame 1 (want+inf) from l04 — this whole lesson is that frame applied to a new topic, not new grammar.' },
      ],
      examples: [
        { uk: 'Хочу зустрітися сьогодні.', translit: 'Khochu zustritysya s\'ohodni.', en: 'I want to meet up today.', cz: 'Chci se dnes sejít.' },
        { uk: 'Коли можеш прийти?', translit: 'Koly mozhesh pryyty?', en: 'When can you come?', cz: 'Kdy můžeš přijít?' },
        { uk: 'О котрій годині завтра?', translit: 'O kotriy hodyni zavtra?', en: 'At what time tomorrow?', cz: 'V kolik hodin zítra?' },
      ],
      substitutions: [
        { template: 'Хочу зустрітися ___.', translit: 'Khochu zustritysya ___.', en: 'I want to meet up ___.', slotOptions: ['сьогодні', 'завтра', 'коли зможеш'] },
      ],
      czechNote: 'Notice you already have every grammar piece you need here from l04/l05/l07 — this lesson is pure vocabulary substitution.',
    }),

  L('l16', 16, 'Meeting Friends & Talking About People', 'topic',
    'Talking about who you know and haven\'t seen in a while.',
    ['v_druh', 'v_podruha', 'v_znayomyi', 'v_razom', 'v_davno_ne_bachylys', 'v_khto'],
    {
      patterns: [
        { uk: 'Це мій друг / моя подруга.', translit: 'Tse miy druh / moya podruha.', en: 'This is my friend (male/female).', czNote: 'мій/моя changes with the noun\'s gender, exactly like Czech "můj/moje".' },
      ],
      examples: [
        { uk: 'Це мій друг Андрій.', translit: 'Tse miy druh Andriy.', en: 'This is my friend Andriy.', cz: 'To je můj kamarád Andrij.' },
        { uk: 'Давно не бачились!', translit: 'Davno ne bachylys\'!', en: 'Long time no see!', cz: 'Dlouho jsme se neviděli!' },
        { uk: 'Ми зустрілися разом.', translit: 'My zustrilysya razom.', en: 'We met up together.', cz: 'Sešli jsme se spolu.' },
      ],
      substitutions: [
        { template: 'Це ___.', translit: 'Tse ___.', en: 'This is ___.', slotOptions: ['мій друг', 'моя подруга', 'мій знайомий'] },
      ],
      czechNote: '"Давно не бачились" is a fixed phrase worth memorizing whole — it comes up constantly with people you haven\'t seen for a while.',
    }),

  L('l17', 17, 'Food & Ordering', 'topic',
    'Enough vocabulary to sit down at a table and order confidently.',
    ['v_menyu', 'v_smachno', 'v_zamovyty', 'v_chai', 'v_rakhunok', 'v_myaso', 'v_skil_ky', 'p_want_5'],
    {
      patterns: [
        { uk: 'Хочу замовити ___.', translit: 'Khochu zamovyty ___.', en: 'I want to order ___.', czNote: 'Frame 1 (l04) again, applied here — "Хочу" plus a noun or infinitive covers most ordering situations.' },
      ],
      examples: [
        { uk: 'Хочу замовити каву.', translit: 'Khochu zamovyty kavu.', en: 'I want to order (a) coffee.', cz: 'Chci si objednat kávu.' },
        { uk: 'Скільки коштує?', translit: 'Skil\'ky koshtuye?', en: 'How much does it cost?', cz: 'Kolik to stojí?' },
        { uk: 'Рахунок, будь ласка.', translit: 'Rakhunok, bud\' laska.', en: 'The bill, please.', cz: 'Účet, prosím.' },
        { uk: 'Дуже смачно!', translit: 'Duzhe smachno!', en: 'Very tasty!', cz: 'Moc chutné!' },
      ],
      substitutions: [
        { template: 'Хочу замовити ___.', translit: 'Khochu zamovyty ___.', en: 'I want to order ___.', slotOptions: ['каву', 'чай', 'м\'ясо'] },
      ],
      czechNote: 'Рахунок/účet, меню/menu are near-identical to Czech — you already know more of this lesson than it looks like.',
    }),

  L('l18', 18, 'Travel & Directions', 'topic',
    'Asking where things are and finding your way.',
    ['v_kvytok', 'v_potyah', 'v_livoruch', 'v_pravoruch', 'v_de', 'v_vokzal', 'v_aeroport'],
    {
      patterns: [
        { uk: 'Де ___?', translit: 'De ___?', en: 'Where is ___?', czNote: 'Same one-word question structure as Czech "Kde ___?".' },
      ],
      examples: [
        { uk: 'Де вокзал?', translit: 'De vokzal?', en: 'Where is the train station?', cz: 'Kde je nádraží?' },
        { uk: 'Де аеропорт?', translit: 'De aeroport?', en: 'Where is the airport?', cz: 'Kde je letiště?' },
        { uk: 'Ліворуч чи праворуч?', translit: 'Livoruch chy pravoruch?', en: 'Left or right?', cz: 'Vlevo, nebo vpravo?' },
        { uk: 'Потрібен квиток на потяг.', translit: 'Potriben kvytok na potyah.', en: 'I need a train ticket.', cz: 'Potřebuji lístek na vlak.' },
      ],
      substitutions: [
        { template: 'Де ___?', translit: 'De ___?', en: 'Where is ___?', slotOptions: ['вокзал', 'аеропорт', 'квиток'] },
      ],
      czechNote: 'вокзал and аеропорт are close enough to Czech "nádraží"-adjacent international vocabulary that they\'re easy wins.',
    }),

  L('l19', 19, 'Work & Daily Routine', 'topic',
    'Talking about your job and everyday schedule.',
    ['v_zustrich', 'v_ofis', 'v_koleha', 'v_shchodnya', 'v_odyn', 'v_dva', 'v_try', 'v_chotyry', 'v_p_yat', 'p_future_1'],
    {
      patterns: [
        { uk: 'Буду в офісі ___.', translit: 'Budu v ofisi ___.', en: 'I will be in the office ___.', czNote: 'Reuses Frame 3 (future, l07) — "буду" plus a time word or place.' },
      ],
      examples: [
        { uk: 'Щодня працюю в офісі.', translit: 'Shchodnya pratsyuyu v ofisi.', en: 'Every day I work in the office.', cz: 'Každý den pracuji v kanceláři.' },
        { uk: 'У мене зустріч з колегою.', translit: 'U mene zustrich z kolehoyu.', en: 'I have a meeting with a colleague.', cz: 'Mám schůzku s kolegou.' },
        { uk: 'Буду в офісі до п\'ятої.', translit: 'Budu v ofisi do p\'yatoyi.', en: 'I will be in the office until five.', cz: 'Budu v kanceláři do pěti.' },
      ],
      substitutions: [
        { template: 'Буду в офісі ___.', translit: 'Budu v ofisi ___.', en: 'I will be in the office ___.', slotOptions: ['сьогодні', 'завтра', 'до п\'ятої'] },
      ],
      czechNote: 'Numbers один-п\'ять are worth memorizing solidly here — they immediately unlock talking about time, cost, and quantity everywhere else.',
    }),

  L('l20', 20, 'Explaining Simple Needs & Problems', 'topic',
    'The essential survival phrases for when something goes wrong or you need help.',
    ['v_problema', 'v_dopomozhit', 'v_povtorit', 'v_rozumiyu', 'v_ne_rozumiyu', 'v_shcho', 'v_chomu', 'p_need_5', 'p_need_1'],
    {
      patterns: [
        { uk: 'Мені потрібна ___.', translit: 'Meni potribna ___.', en: 'I need ___.', czNote: 'Reuses Frame 6 (need, l11) — "мені потрібна/потрібен" plus a noun covers almost any request for help.' },
      ],
      examples: [
        { uk: 'У мене проблема.', translit: 'U mene problema.', en: 'I have a problem.', cz: 'Mám problém.' },
        { uk: 'Не розумію. Повторіть, будь ласка.', translit: 'Ne rozumiyu. Povtorit\', bud\' laska.', en: 'I don\'t understand. Please repeat.', cz: 'Nerozumím. Zopakujte to, prosím.' },
        { uk: 'Допоможіть, будь ласка!', translit: 'Dopomozhit\', bud\' laska!', en: 'Please help!', cz: 'Pomozte mi, prosím!' },
        { uk: 'Мені потрібна допомога.', translit: 'Meni potribna dopomoha.', en: 'I need help.', cz: 'Potřebuji pomoc.' },
      ],
      substitutions: [
        { template: 'Будь ласка, ___.', translit: 'Bud\' laska, ___.', en: 'Please ___.', slotOptions: ['допоможіть', 'повторіть'] },
      ],
      czechNote: 'This is the lesson to keep mentally close at hand — "не розумію" and "повторіть, будь ласка" alone will get you through most communication breakdowns.',
    }),

  // --- New A2 vocabulary lessons (wave 1 of the content-expansion request) ---
  L('l38', 21, 'Numbers, Time & Dates', 'topic',
    'Counting one through ten, plus the basic vocabulary for talking about time.',
    ['v_odyn', 'v_dva', 'v_try', 'v_chotyry', 'v_p_yat', 'v_shist', 'v_sim', 'v_visim', 'v_devyat', 'v_desyat', 'v_hodyna', 'v_khvylyna'],
    {
      patterns: [
        { uk: '1–10', translit: '', en: 'Numbers one through ten', czNote: 'Ukrainian numbers are close to Czech and highly recognizable: шість~šest, сім~sedm, вісім~osm, дев\'ять~devět, десять~deset.' },
      ],
      examples: [
        { uk: 'Один, два, три, чотири, п\'ять.', translit: 'Odyn, dva, try, chotyry, p\'yat\'.', en: 'One, two, three, four, five.', cz: 'Jedna, dva, tři, čtyři, pět.' },
        { uk: 'Шість, сім, вісім, дев\'ять, десять.', translit: 'Shist\', sim, visim, dev\'yat\', desyat\'.', en: 'Six, seven, eight, nine, ten.', cz: 'Šest, sedm, osm, devět, deset.' },
        { uk: 'Зараз я вдома.', translit: 'Zaraz ya vdoma.', en: 'I am at home now.', cz: 'Teď jsem doma.' },
      ],
      substitutions: [],
      czechNote: 'Getting 1-10 solid now pays off immediately in later lessons — prices, times, and quantities all lean on these.',
    }),

  L('l39', 22, 'Family in More Detail', 'topic',
    'Beyond mama/tato/brat/sestra — grandparents, spouse, and talking about your family as a whole.',
    ['v_babusya', 'v_didus', 'v_druzhyna', 'v_cholovik', 'v_dytyna', 'v_simya', 'v_brat', 'v_sestra'],
    {
      patterns: [
        { uk: 'Це моя ___.', translit: 'Tse moya ___.', en: 'This is my ___.', czNote: 'моя (my, feminine) — matches Czech "moje" and agrees with feminine family nouns like бабуся, сестра, дружина.' },
      ],
      examples: [
        { uk: 'Це моя бабуся і мій дідусь.', translit: 'Tse moya babusya i miy didus\'.', en: 'This is my grandmother and my grandfather.', cz: 'To je moje babička a můj dědeček.' },
        { uk: 'У мене є дружина.', translit: 'U mene ye druzhyna.', en: 'I have a wife.', cz: 'Mám manželku.' },
        { uk: 'Моя сім\'я велика.', translit: 'Moya sim\'ya velyka.', en: 'My family is big.', cz: 'Moje rodina je velká.' },
      ],
      substitutions: [
        { template: 'Це моя ___.', translit: 'Tse moya ___.', en: 'This is my ___.', slotOptions: ['бабуся', 'сестра', 'дружина'] },
      ],
      czechNote: 'дідусь/бабуся ~ dědeček/babička; чоловік does double duty for both "husband" and "man", exactly like Czech "muž" can.',
    }),

  L('l40', 23, 'Colors & Describing Things', 'topic',
    'Basic colors, and size adjectives that agree in gender just like Czech.',
    ['v_chervonyi', 'v_syniy', 'v_zelenyi', 'v_zhovtyi', 'v_chornyi', 'v_bilyi', 'v_velykyi', 'v_malenkyi'],
    {
      patterns: [
        { uk: 'великий / велика / велике', translit: 'velykyi / velyka / velyke', en: 'adjectives change ending to match the noun\'s gender', czNote: 'Identical mechanism to Czech "velký/velká/velké" — same three endings, same idea.' },
      ],
      examples: [
        { uk: 'Червоний, синій, зелений, жовтий.', translit: 'Chervonyi, syniy, zelenyi, zhovtyi.', en: 'Red, blue, green, yellow.', cz: 'Červený, modrý, zelený, žlutý.' },
        { uk: 'Чорний і білий.', translit: 'Chornyi i bilyi.', en: 'Black and white.', cz: 'Černý a bílý.' },
        { uk: 'Це великий дім.', translit: 'Tse velykyi dim.', en: 'This is a big house.', cz: 'To je velký dům.' },
        { uk: 'Це маленька кава.', translit: 'Tse malen\'ka kava.', en: 'This is a small coffee.', cz: 'To je malá káva.' },
      ],
      substitutions: [
        { template: 'Це ___ дім.', translit: 'Tse ___ dim.', en: 'This is a ___ house.', slotOptions: ['великий', 'маленький', 'червоний'] },
      ],
      czechNote: 'Notice велика/маленька above take the feminine "-а" ending to agree with кава — same rule as дім above taking the masculine form.',
    }),

  L('l41', 24, 'Weather & Seasons', 'topic',
    'Talking about what it\'s like outside — impersonal weather expressions work just like Czech.',
    ['v_pohoda', 'v_sontse', 'v_doshch', 'v_snih', 'v_kholodno', 'v_teplo', 'v_zyma', 'v_lito'],
    {
      patterns: [
        { uk: '(Сьогодні) холодно / тепло.', translit: '(S\'ohodni) kholodno / teplo.', en: 'It\'s (today) cold / warm.', czNote: 'Impersonal weather adverbs, exactly like Czech "je zima / je teplo" — no subject pronoun needed.' },
      ],
      examples: [
        { uk: 'Яка сьогодні погода?', translit: 'Yaka s\'ohodni pohoda?', en: 'What is the weather like today?', cz: 'Jaké je dnes počasí?' },
        { uk: 'Сьогодні холодно.', translit: 'S\'ohodni kholodno.', en: 'Today it is cold.', cz: 'Dnes je zima.' },
        { uk: 'Сьогодні тепло.', translit: 'S\'ohodni teplo.', en: 'Today it is warm.', cz: 'Dnes je teplo.' },
        { uk: 'Сонце і дощ.', translit: 'Sontse i doshch.', en: 'Sun and rain.', cz: 'Slunce a déšť.' },
      ],
      substitutions: [
        { template: 'Сьогодні ___.', translit: 'S\'ohodni ___.', en: 'Today it is ___.', slotOptions: ['холодно', 'тепло'] },
      ],
      czechNote: 'зима/літо (winter/summer) are worth knowing as season nouns too, not just as weather words.',
    }),

  L('l42', 25, 'Shopping & Money', 'topic',
    'Buying things, asking the price, and reacting to how expensive something is.',
    ['v_hroshi', 'v_mahazyn', 'v_tsina', 'v_deshevo', 'v_doroho', 'v_kupyty', 'v_prodavaty', 'v_kartka', 'v_skil_ky'],
    {
      patterns: [
        { uk: 'Скільки коштує?', translit: 'Skil\'ky koshtuye?', en: 'How much does it cost?', czNote: 'Already met in l17 (Food) — the same question works for any purchase, not just food.' },
      ],
      examples: [
        { uk: 'Хочу купити це.', translit: 'Khochu kupyty tse.', en: 'I want to buy this.', cz: 'Chci to koupit.' },
        { uk: 'Скільки це коштує?', translit: 'Skil\'ky tse koshtuye?', en: 'How much does this cost?', cz: 'Kolik to stojí?' },
        { uk: 'Це дуже дорого.', translit: 'Tse duzhe doroho.', en: 'This is very expensive.', cz: 'To je moc drahé.' },
        { uk: 'Це дешево.', translit: 'Tse deshevo.', en: 'This is cheap.', cz: 'To je levné.' },
      ],
      substitutions: [
        { template: 'Хочу купити ___.', translit: 'Khochu kupyty ___.', en: 'I want to buy ___.', slotOptions: ['це', 'квиток', 'каву'] },
      ],
      czechNote: 'купити ~ koupit — another near-instant vocabulary win, same for продавати ~ prodávat.',
    }),

  L('l43', 26, 'The Body & Feeling Unwell', 'topic',
    'Saying what hurts and asking for a doctor or pharmacy.',
    ['v_holova', 'v_zhyvit', 'v_horlo', 'v_khvoryi', 'v_bolyt', 'v_likar', 'v_apteka', 'v_liky'],
    {
      patterns: [
        { uk: 'У мене болить ___.', translit: 'U mene bolyt\' ___.', en: 'My ___ hurts.', czNote: 'Literally "at me hurts ___" — functions like Czech "Bolí mě ___", just built the other way round.' },
      ],
      examples: [
        { uk: 'У мене болить голова.', translit: 'U mene bolyt\' holova.', en: 'I have a headache.', cz: 'Bolí mě hlava.' },
        { uk: 'У мене болить живіт.', translit: 'U mene bolyt\' zhyvit.', en: 'My stomach hurts.', cz: 'Bolí mě břicho.' },
        { uk: 'Я хворий.', translit: 'Ya khvoryi.', en: 'I am sick. (male speaker)', cz: 'Jsem nemocný.' },
        { uk: 'Мені потрібен лікар.', translit: 'Meni potriben likar.', en: 'I need a doctor.', cz: 'Potřebuji lékaře.' },
      ],
      substitutions: [
        { template: 'У мене болить ___.', translit: 'U mene bolyt\' ___.', en: 'My ___ hurts.', slotOptions: ['голова', 'живіт', 'горло'] },
      ],
      czechNote: '"Мені потрібен ___" reuses the потрібна/потрібен pattern from l11/l20 — потрібен here because лікар is masculine.',
    }),

  L('l44', 27, 'Prepositions of Place', 'grammar',
    'в, на, під, за, між, біля — the core words for describing where something is.',
    ['v_u_v', 'v_na', 'v_pid', 'v_za_prep', 'v_mizh', 'v_bilya'],
    {
      patterns: [
        { uk: 'в / на / під / за / між / біля', translit: '', en: 'in / on / under / behind / between / near', czNote: 'Ukrainian prepositions govern different grammatical cases depending on meaning — this lesson introduces the words themselves; case endings keep showing up gradually in example sentences through the rest of the course, the same way l08 introduced past-tense gender agreement through examples rather than a rule dump.' },
      ],
      examples: [
        { uk: 'Я в Україні.', translit: 'Ya v Ukrayini.', en: 'I am in Ukraine.', cz: 'Jsem na Ukrajině.' },
        { uk: 'Я в офісі.', translit: 'Ya v ofisi.', en: 'I am in the office.', cz: 'Jsem v kanceláři.' },
        { uk: 'Де ти?', translit: 'De ty?', en: 'Where are you?', cz: 'Kde jsi?' },
      ],
      substitutions: [
        { template: 'Я ___.', translit: 'Ya ___.', en: 'I am ___.', slotOptions: ['в Україні', 'в офісі', 'вдома'] },
      ],
      czechNote: 'в matches Czech "v" almost sound-for-sound; на/під/за/між/біля correspond to na/pod/za/mezi/blízko-u.',
    }),

  // --- New A2/B1 lessons (wave 2 of the content-expansion request, informed
  // by "Ukrainian Czech Guide.docx" but independently verified — the doc
  // was treated as a lead, not gospel, per the user's own caveat) ---
  L('l45', 28, 'The Dative Case: Saying What You Need or Feel', 'grammar',
    'мені, тобі, йому, їй, нам, вам, їм — the dative pronouns behind a whole family of impersonal constructions like "I am cold" or "it is hard for him."',
    ['v_meni', 'v_tobi', 'v_yomu', 'v_yiy', 'v_nam', 'v_vam', 'v_yim', 'v_mozhna', 'v_khochetsya', 'v_vazhko', 'v_lehko', 'v_tsikavo', 'v_sumno', 'p_dative_1', 'p_dative_2', 'p_dative_3', 'p_dative_4'],
    {
      patterns: [
        { uk: '[dative pronoun] + [adverb/predicate] (+ infinitive)', translit: '', en: 'Ukrainian expresses "I feel X" / "it is X for me" with no verb at all — just a dative pronoun and a predicate word.', czNote: 'Czech does the same thing — "Je mi zima" mirrors Мені холодно exactly, just with "je" up front. Ukrainian drops the verb entirely.' },
      ],
      examples: [
        { uk: 'Мені холодно.', translit: 'Meni kholodno.', en: 'I am cold.', cz: 'Je mi zima.' },
        { uk: 'Йому важко це зробити.', translit: 'Yomu vazhko tse zrobyty.', en: 'It is hard for him to do this.', cz: 'Je pro něj těžké to udělat.' },
        { uk: 'Їй сумно.', translit: 'Yiy sumno.', en: 'She feels sad.', cz: 'Je jí smutno.' },
        { uk: 'Мені хочеться кави.', translit: 'Meni khochet\'sya kavy.', en: 'I feel like having coffee.', cz: 'Mám chuť na kávu.' },
      ],
      substitutions: [
        { template: 'Мені ___.', translit: 'Meni ___.', en: 'I feel ___.', slotOptions: ['холодно', 'сумно', 'цікаво'] },
      ],
      czechNote: 'This same pattern already showed up piecemeal — "мені потрібна" (l11/l20) and "мені болить" (l43) are both instances of it. This lesson names the pattern explicitly and extends it to the other five pronouns.',
    }),

  L('l46', 29, 'Reflexive Verbs: Actions on Yourself', 'grammar',
    'The -ся ending turns a verb back on its own subject — вчитися (to study, lit. "to teach oneself"), боятися (to be afraid), сподіватися (to hope), and more.',
    ['v_vchytysya', 'v_boyatysya', 'v_dyvuvatysya', 'v_spodivatysya', 'v_usmikhatysya', 'p_reflexive_1', 'p_reflexive_2', 'p_reflexive_3'],
    {
      patterns: [
        { uk: '...-ся / -сь', translit: '', en: 'A reflexive suffix attached to an ordinary verb, roughly "...oneself" — вчити (to teach) vs вчитися (to study/learn).', czNote: 'Directly parallel to Czech "se/si" — učit vs. učit se works exactly the same way as вчити vs вчитися.' },
      ],
      examples: [
        { uk: 'Я вчуся української.', translit: 'Ya vchusya ukrayins\'koyi.', en: 'I am learning Ukrainian.', cz: 'Učím se ukrajinsky.' },
        { uk: 'Я боюся павуків.', translit: 'Ya boyusya pavukiv.', en: 'I am afraid of spiders.', cz: 'Bojím se pavouků.' },
        { uk: 'Я сподіваюся, що все буде добре.', translit: 'Ya spodivayusya, shcho vse bude dobre.', en: 'I hope that everything will be fine.', cz: 'Doufám, že vše bude dobré.' },
        { uk: 'Він усміхається.', translit: 'Vin usmikhayet\'sya.', en: 'He is smiling.', cz: 'Usmívá se.' },
      ],
      substitutions: [],
      czechNote: 'боятися and сподіватися both take a genitive-case object ("боюся павуків" — "afraid of spiders", genitive) — that case ending is a later refinement; for now, just recognizing and using the -ся verb itself is the goal.',
    }),

  L('l47', 30, 'Days of the Week', 'topic',
    'Monday through Sunday, plus how to say "on" a given day.',
    ['v_ponedilok', 'v_vivtorok', 'v_sereda', 'v_chetver', 'v_pyatnytsya', 'v_subota', 'v_nedilya', 'p_days_1', 'p_days_2'],
    {
      patterns: [
        { uk: 'у / в + [day, accusative]', translit: '', en: '"On" a day of the week uses у/в plus the accusative case — for feminine days (середа, п\'ятниця, субота, неділя) the ending changes: середа→середу, п\'ятниця→п\'ятницю, субота→суботу, неділя→неділю. Masculine days (понеділок, вівторок, четвер) look the same in accusative as in the dictionary form.', czNote: 'Czech does the same thing with its own case system — "v pondělí" vs "ve středu" shows the same masculine/feminine split.' },
      ],
      examples: [
        { uk: 'Сьогодні понеділок.', translit: 'S\'ohodni ponedilok.', en: 'Today is Monday.', cz: 'Dnes je pondělí.' },
        { uk: 'Я працюю в понеділок.', translit: 'Ya pratsyuyu v ponedilok.', en: 'I work on Monday.', cz: 'Pracuji v pondělí.' },
        { uk: 'У суботу я відпочиваю.', translit: 'U subotu ya vidpochyvayu.', en: 'On Saturday I rest.', cz: 'V sobotu odpočívám.' },
      ],
      substitutions: [
        { template: 'Сьогодні ___.', translit: 'S\'ohodni ___.', en: 'Today is ___.', slotOptions: ['понеділок', 'субота', 'неділя'] },
      ],
      czechNote: 'Get comfortable recognizing all seven days by sight first — the accusative endings on the feminine ones (суботу, неділю, п\'ятницю) are a small detail to absorb gradually through examples like the ones above.',
    }),

  L('l48', 31, 'More Everyday Verbs', 'vocab',
    'брати, давати, отримувати, тримати, відпочивати, подорожувати — high-frequency verbs that round out everyday conversation.',
    ['v_braty', 'v_davaty', 'v_otrymuvaty', 'v_trymaty', 'v_vidpochyvaty', 'v_podorozhuvaty', 'p_everyday_1', 'p_everyday_2'],
    {
      patterns: [],
      examples: [
        { uk: 'Я хочу подорожувати.', translit: 'Ya khochu podorozhuvaty.', en: 'I want to travel.', cz: 'Chci cestovat.' },
        { uk: 'Тримай це, будь ласка.', translit: 'Trymay tse, bud\' laska.', en: 'Hold this, please.', cz: 'Podrž to, prosím.' },
        { uk: 'Я отримую листи щодня.', translit: 'Ya otrymuyu lysty shchodnya.', en: 'I receive letters every day.', cz: 'Dostávám dopisy každý den.' },
      ],
      substitutions: [],
      czechNote: 'брати/давати/тримати are close cousins of Czech "brát/dávat/držet" — the sound is close enough to lean on directly.',
    }),

  L('l49', 32, 'Home & Everyday Objects', 'topic',
    'школа, шафа, пральна машина, одяг, туалет, ванна кімната — practical nouns for everyday life and asking where things are.',
    ['v_shkola', 'v_shafa', 'v_pralna_mashyna', 'v_odyah', 'v_tualet', 'v_vanna_kimnata', 'p_home_1', 'p_home_2'],
    {
      patterns: [],
      examples: [
        { uk: 'Де туалет?', translit: 'De tualet?', en: 'Where is the toilet?', cz: 'Kde je záchod?' },
        { uk: 'Мій одяг у шафі.', translit: 'Miy odyah u shafi.', en: 'My clothes are in the wardrobe.', cz: 'Moje oblečení je ve skříni.' },
        { uk: 'Пральна машина не працює.', translit: 'Pral\'na mashyna ne pratsyuye.', en: 'The washing machine isn\'t working.', cz: 'Pračka nefunguje.' },
      ],
      substitutions: [
        { template: 'Де ___?', translit: 'De ___?', en: 'Where is the ___?', slotOptions: ['туалет', 'школа', 'ванна кімната'] },
      ],
      czechNote: '"Де ___?" is the single most useful question-frame in this lesson — reuse it for anything, not just the nouns listed here.',
    }),

  L('l50', 33, 'Czech/Russian False Friends: A Caution', 'topic',
    'Ukrainian, Czech, and Russian share deep roots, but that can be a trap — a handful of everyday verbs are worth double-checking rather than assuming.',
    ['v_yisty', 'v_dyvytysya', 'p_falsefriend_1', 'p_falsefriend_2'],
    {
      patterns: [],
      examples: [
        { uk: 'Я їм борщ.', translit: 'Ya yim borshch.', en: 'I am eating borscht.', cz: 'Jím boršč.' },
        { uk: 'Що ти дивишся?', translit: 'Shcho ty dyvyshsya?', en: 'What are you watching?', cz: 'Co se díváš?' },
      ],
      substitutions: [],
      czechNote: 'Worth a deliberate pause here: робити (not "делать"), мати, бути, бачити, йти, дякувати (not "благодарить") are all already-learned Ukrainian words that can look or sound closer to Russian than to the Ukrainian you actually need. When in doubt, the Ukrainian word is usually its own thing, not a Czech-flavored guess at a Russian cognate — їсти (not "jíst"-shaped, not "есть"-shaped) and дивитися are two more worth fixing firmly as Ukrainian-first.',
    }),

  // --- New conversational lessons (wave 3): hobbies, opinions, small talk —
  // directly informed by the specific everyday sentences the user asked
  // for ("I like to swim", "what do you do at the weekend", etc). Placed
  // here (right after wave 2, before the B1 grammar block) rather than
  // appended at the very end — this is genuinely A2/B1-level conversation,
  // not advanced content, so it shouldn't sit locked behind all the C1
  // material just because it was added later. ---
  L('l51', 34, 'Hobbies & Free Time', 'grammar',
    'любити + infinitive — talking about what you like doing, and asking someone else the same.',
    ['v_lyubyty', 'v_plavaty', 'v_vidviduvaty', 'v_muzey', 'v_vykhidni', 'v_vilnyi_chas', 'p_hobby_1', 'p_hobby_2', 'p_hobby_3', 'p_hobby_4'],
    {
      patterns: [
        { uk: 'Люблю + infinitive', translit: 'Lyublyu + infinitive', en: '"I like to ___" — любити works exactly like хотіти (Frame 1, l04): conjugated любити plus a plain infinitive, no extra words needed.', czNote: 'Direct parallel to Czech "mít rád" + infinitive, though Ukrainian just conjugates one verb (люблю) instead of using an adjective + verb.' },
      ],
      examples: [
        { uk: 'Я люблю плавати.', translit: 'Ya lyublyu plavaty.', en: 'I like to swim.', cz: 'Rád/a plavu.' },
        { uk: 'Що ти любиш робити на вихідних?', translit: 'Shcho ty lyubysh robyty na vykhidnykh?', en: 'What do you like to do at the weekend?', cz: 'Co rád/a děláš o víkendu?' },
        { uk: 'Що ти любиш робити у вільний час?', translit: 'Shcho ty lyubysh robyty u vil\'nyi chas?', en: 'What do you like to do in your spare time?', cz: 'Co rád/a děláš ve volném čase?' },
        { uk: 'Ти любиш відвідувати музей?', translit: 'Ty lyubysh vidviduvaty muzey?', en: 'Do you like to visit the museum?', cz: 'Rád/a navštěvuješ muzeum?' },
      ],
      substitutions: [
        { template: 'Я люблю ___.', translit: 'Ya lyublyu ___.', en: 'I like to ___.', slotOptions: ['плавати', 'відвідувати музеї', 'читати'] },
      ],
      czechNote: 'на вихідних ("at the weekend") and у вільний час ("in your spare time") are both worth learning as fixed phrases rather than building word-by-word — the case endings inside them are not the point yet.',
    }),

  L('l52', 35, 'Reactions & Enjoying Things', 'grammar',
    'Reacting to what you see or experience — виглядати (to look/seem) and насолоджуватися (to enjoy, from l46\'s reflexive verbs).',
    ['v_vyhlyadaty', 'p_react_1', 'p_react_2'],
    {
      patterns: [
        { uk: 'Це виглядає ___.', translit: 'Tse vyhlyadaye ___.', en: '"This/that looks ___" — виглядати plus an adverb, same shape as l45\'s dative adverbs (важко, легко, цікаво) reused here as the description.', czNote: 'Matches Czech "to vypadá ___" almost word for word.' },
      ],
      examples: [
        { uk: 'Це виглядає важко.', translit: 'Tse vyhlyadaye vazhko.', en: 'That looks hard.', cz: 'To vypadá těžce.' },
        { uk: 'Я насолоджуюся цим.', translit: 'Ya nasolodzhuyusya tsym.', en: 'I am enjoying this.', cz: 'Užívám si to.' },
      ],
      substitutions: [
        { template: 'Це виглядає ___.', translit: 'Tse vyhlyadaye ___.', en: 'That looks ___.', slotOptions: ['важко', 'легко', 'цікаво'] },
      ],
      czechNote: 'насолоджуюся reuses l46\'s насолоджуватися — a good example of one reflexive verb showing up naturally in ordinary conversation once you have it.',
    }),

  L('l53', 36, 'Asking About Family & Quantities', 'grammar',
    '"How big is your family?" — Ukrainian asks this as "how many people," not with a size adjective, using скільки (l42) + genitive.',
    ['v_lyudy', 'p_quantity_1'],
    {
      patterns: [
        { uk: 'Скільки людей у ___?', translit: 'Skil\'ky lyudei u ___?', en: '"How many people are in ___?" — the natural Ukrainian way to ask what English phrases as "how big is ___."', czNote: 'Czech can ask it either way ("Jak velká je vaše rodina?" or "Kolik je vás v rodině?") — Ukrainian leans on the "how many people" phrasing specifically.' },
      ],
      examples: [
        { uk: 'Скільки людей у твоїй сім\'ї?', translit: 'Skil\'ky lyudei u tvoyii sim\'yi?', en: 'How many people are in your family? (How big is your family?)', cz: 'Kolik lidí je ve vaší rodině?' },
      ],
      substitutions: [],
      czechNote: 'Reuses сім\'я from l39 and скільки from l42 — the only genuinely new piece here is люди (people) and the question shape itself.',
    }),

  L('l54', 37, 'Talking About What You\'ve Learned', 'grammar',
    'English "what have you learnt" has no direct Ukrainian equivalent tense — it just uses the past tense (l08) plus a time word like цього року.',
    ['v_vyvchyty', 'v_tsyoho_roku', 'v_mynuloho_roku', 'p_learn_1', 'p_learn_2'],
    {
      patterns: [
        { uk: 'Що ти вивчив(ла) цього року?', translit: 'Shcho ty vyvchyv(la) ts\'oho roku?', en: '"What did you learn this year?" — Ukrainian has no separate "have learned" form; the ordinary past tense (l08\'s -в/-ла endings) covers it.', czNote: 'Same gap exists in Czech — "Co ses letos naučil?" is also just past tense, no distinct perfect form.' },
      ],
      examples: [
        { uk: 'Що ти вивчив цього року?', translit: 'Shcho ty vyvchyv ts\'oho roku?', en: 'What have you learnt this year? (male speaker)', cz: 'Co ses letos naučil?' },
        { uk: 'Я вивчила багато цього року.', translit: 'Ya vyvchyla bahato ts\'oho roku.', en: 'I learned a lot this year. (female speaker)', cz: 'Letos jsem se hodně naučila.' },
      ],
      substitutions: [
        { template: 'Я вивчив(ла) ___ цього року.', translit: 'Ya vyvchyv(la) ___ ts\'oho roku.', en: 'I learned ___ this year.', slotOptions: ['багато', 'українську мову', 'нову пісню'] },
      ],
      czechNote: 'вивчити pairs naturally with l46\'s вчитися (to study/learn, ongoing) — вчитися is the everyday process, вивчити is having actually learned/mastered something specific.',
    }),

  // --- B1 level expansion lessons ---
  L('l21', 38, 'Narrating Experiences', 'grammar_b1',
    'Learn to talk about what you have done, what you have never done, and life when you were younger.',
    ['p_b1_done_1', 'p_b1_never_1', 'p_b1_when_1', 'v_zrobyv', 'v_nikoly', 'v_molodshyi'],
    {
      patterns: [
        { uk: 'Я вже зробив... / Я ніколи не...', translit: '', en: 'I have already done... / I have never...', czNote: 'Compare Ukrainian past tense and "ніколи не" with Czech "už jsem udělal / nikdy jsem nebyl".' }
      ],
      examples: [
        { uk: 'Я вже прочитав цю книгу.', translit: 'Ya vzhe prochytav tsyu knyhu.', en: 'I have already read this book.', cz: 'Už jsem přečetl tuto knihu.' },
        { uk: 'Я ніколи не був в Україні.', translit: 'Ya nikoly ne buv v Ukrayini.', en: 'I have never been to Ukraine.', cz: 'Nikdy jsem nebyl na Ukrajině.' },
        { uk: 'Коли я був молодший, я багато подорожував.', translit: 'Koly ya buv molodshyi, ya bahato podorozhuvav.', en: 'When I was younger, I travelled a lot.', cz: 'Když jsem byl mladší, hodně jsem cestoval.' }
      ],
      substitutions: [],
      czechNote: 'Excellent structure maps 1:1 except Ukrainian drops the "jsem" auxiliary verb.'
    }),

  L('l22', 39, 'Explaining Situations', 'grammar_b1',
    'Learn to specify root causes using "The thing is that..." and "The reason is that...".',
    ['p_b1_thing_1', 'p_b1_reason_1', 'v_sprava', 'v_prychyna', 'v_polyahaye'],
    {
      patterns: [
        { uk: 'Справа в тому, що... / Причина полягає в тому, що...', translit: '', en: 'The thing is that... / The reason is that...', czNote: 'Parallel to Czech "Jde o to, že..." or "Příčina spočívá v tom, že...".' }
      ],
      examples: [
        { uk: 'Справа в тому, що я не мав достатньо часу.', translit: 'Sprava v tomu, shcho ya ne mav dostatno chasu.', en: 'The thing is that I didn\'t have enough time.', cz: 'Jde o to, že jsem neměl dost času.' }
      ],
      substitutions: [],
      czechNote: '"Справа в тому, що" is incredibly common in spoken Ukrainian to explain why something happened.'
    }),

  L('l23', 40, 'Comparing and Contrasting', 'grammar_b1',
    'Contrast elements using "Unlike..." and "Compared with...".',
    ['p_b1_compare_1', 'p_b1_compare_2', 'v_vidminu', 'v_porivnyano'],
    {
      patterns: [
        { uk: 'На відміну від... / Порівняно з...', translit: '', en: 'Unlike... / Compared with...', czNote: 'Directly transfers to Czech "Na rozdíl od..." and "Ve srovnání s...".' }
      ],
      examples: [
        { uk: 'На відміну від Чехії, в Україні тепло.', translit: 'Na vidminu vid Chekhiyi, v Ukrayini teplo.', en: 'Unlike Czechia, in Ukraine it is warm.', cz: 'Na rozdíl od Česka je na Ukrajině teplo.' },
        { uk: 'Порівняно з минулим роком, все добре.', translit: 'Porivnyano z mynulym rokom, vse dobre.', en: 'Compared with last year, everything is good.', cz: 'Ve srovnání s minulým rokem je vše v pořádku.' }
      ],
      substitutions: [],
      czechNote: 'Notice that "Порівняно з" matches "porovnáno s" exactly.'
    }),

  // --- Wave 4 (CEFR-doc-informed): B1 grammar gaps + a dedicated
  // connectors lesson, placed here — right at the B1/B2 seam — rather than
  // appended at the end, since connectors are useful from B1 all the way
  // through C2 and shouldn't sit locked behind unrelated C1 content. ---
  L('l55', 41, 'Relative Clauses: який / яка / яке / які', 'grammar_b1',
    '"The café that I found", "people who speak openly" — який agrees in gender/number/case with the noun it describes, same idea as l08\'s past-tense agreement.',
    ['v_yakyi', 'v_yaka_rel', 'v_yake', 'v_yaki', 'p_rel_1', 'p_rel_2', 'p_rel_3'],
    {
      patterns: [
        { uk: '..., який/яка/яке/які ...', translit: '', en: 'A relative clause — який changes form to match the noun it refers to (masc/fem/neut/plural), not the noun it\'s attached to grammatically.', czNote: 'Direct parallel to Czech "který/která/které/kteří" — same agreement logic, same four forms.' },
      ],
      examples: [
        { uk: 'Я зайшов у маленьке кафе, яке випадково знайшов.', translit: 'Ya zayshov u malen\'ke kafe, yake vypadkovo znayshov.', en: 'I went into a small café that I happened to find.', cz: 'Zašel jsem do malé kavárny, kterou jsem náhodou našel.' },
        { uk: 'Мені подобається працювати з людьми, які відкрито висловлюють свою думку.', translit: 'Meni podobayet\'sya pratsyuvaty z lyud\'my, yaki vidkryto vyslovlyuyut\' svoyu dumku.', en: 'I like working with people who openly express their opinions.', cz: 'Rád/a pracuji s lidmi, kteří otevřeně vyjadřují svůj názor.' },
        { uk: 'Напевно, концерт, на який я ходив минулого року.', translit: 'Napevno, kontsert, na yakyi ya khodyv mynuloho roku.', en: 'Probably the concert I went to last year.', cz: 'Asi ten koncert, na který jsem šel loni.' },
      ],
      substitutions: [],
      czechNote: 'кафе (neuter) → яке; людьми (plural) → які; концерт (masc, after "на" governing accusative) → на який — the form tracks the noun\'s gender/number, the preposition/case tracks the clause\'s own grammar.',
    }),

  L('l56', 42, 'Purpose Clauses & Indirect Questions', 'grammar_b1',
    '"So that I don\'t forget" (щоб) and "I don\'t know whether..." (чи) — two small words that unlock a lot of natural-sounding B1 speech.',
    ['v_shchob', 'v_chy_whether', 'p_purpose_1', 'p_purpose_2', 'p_indirect_1', 'p_indirect_2'],
    {
      patterns: [
        { uk: '..., щоб + [verb]', translit: '', en: '"...so that / in order to..." — щоб introduces the purpose or goal of the main clause.', czNote: 'Matches Czech "abych/abys/aby" — Ukrainian щоб doesn\'t change form with the subject the way Czech "aby" does, which is simpler.' },
        { uk: '..., чи + [clause]', translit: '', en: '"...whether/if..." — чи turns a yes/no question into part of a larger sentence ("I don\'t know whether...").', czNote: 'Same job as Czech "zda/jestli".' },
      ],
      examples: [
        { uk: 'Іноді я записую нові слова, щоб не забути їх.', translit: 'Inodi ya zapysuyu novi slova, shchob ne zabuty yikh.', en: 'Sometimes I write down new words so I don\'t forget them.', cz: 'Někdy si zapisuju nová slova, abych je nezapomněl/a.' },
        { uk: 'Тепер, щоб його вимкнути, мені доводиться вставати.', translit: 'Teper, shchob yoho vymknuty, meni dovodyt\'sya vstavaty.', en: 'Now, to turn it off, I have to get up.', cz: 'Teď, abych to vypnul/a, musím vstát.' },
        { uk: 'Зараз я намагаюся зрозуміти, чи є в ній щось корисне.', translit: 'Zaraz ya namahayusya zrozumity, chy ye v niy shchos\' korysne.', en: 'Now I try to understand whether there is anything useful in it.', cz: 'Teď se snažím pochopit, jestli je v tom něco užitečného.' },
      ],
      substitutions: [
        { template: '..., щоб ___.', translit: '..., shchob ___.', en: '...so that ___.', slotOptions: ['не забути', 'зрозуміти краще', 'все встигнути'] },
      ],
      czechNote: 'чи also means "or" in a direct question ("кава чи чай?" = "coffee or tea?") — context makes the difference clear, same ambiguity-that-isn\'t-really-ambiguous exists in several Slavic languages.',
    }),

  L('l57', 43, 'Connectors & Cohesive Devices', 'grammar_b1',
    'The small set of linking words that recur constantly from here through the most advanced content — тому що, з одного боку/з іншого боку, наскільки мені відомо, зрештою — worth mastering early since almost every later lesson leans on them.',
    ['v_tomu_shcho', 'v_cherez_tse', 'v_z_odnoho_boku', 'v_z_inshoho_boku', 'v_naskilky_meni_vidomo', 'v_zreshtoyu', 'p_conn_1', 'p_conn_2', 'p_conn_3'],
    {
      patterns: [
        { uk: 'тому що / через це', translit: 'tomu shcho / cherez tse', en: 'because / because of this — cause and consequence, the most basic connector pair.', czNote: 'тому що ~ Czech "protože"; через це ~ "kvůli tomu".' },
        { uk: 'З одного боку..., з іншого боку...', translit: 'Z odnoho boku..., z inshoho boku...', en: 'On one hand..., on the other hand... — the single most useful frame for balanced opinions.', czNote: 'Na jednu stranu..., na druhou stranu... — word-for-word match.' },
      ],
      examples: [
        { uk: 'Я спізнився, тому що затримався на роботі.', translit: 'Ya spiznyvsya, tomu shcho zatrymavsya na roboti.', en: 'I was late because I got held up at work.', cz: 'Přišel jsem pozdě, protože jsem se zdržel v práci.' },
        { uk: 'З одного боку, це добре, з іншого боку — складно.', translit: 'Z odnoho boku, tse dobre, z inshoho boku — skladno.', en: 'On one hand it\'s good, on the other hand it\'s difficult.', cz: 'Na jednu stranu je to dobré, na druhou stranu složité.' },
        { uk: 'Наскільки мені відомо, він уже виїхав.', translit: 'Naskil\'ky meni vidomo, vin uzhe vyyikhav.', en: 'As far as I know, he has already left.', cz: 'Pokud vím, už odjel.' },
      ],
      substitutions: [
        { template: 'Це добре, ___ це складно.', translit: 'Tse dobre, ___ tse skladno.', en: 'This is good, ___ it\'s difficult.', slotOptions: ['тому що', 'проте', 'і водночас'] },
      ],
      czechNote: 'These connectors are structurally invariant — they never inflect, so once learned they slot onto any sentence you can already build. l36 (C1 Vocab: Abstract Connectors) adds a further 7 for more formal/written register — this lesson and that one are now tracked together as one "Connectors" vocabulary category.',
    }),

  // --- B2 level expansion lessons ---
  L('l24', 44, 'Complex Opinions', 'grammar_b2',
    'Express your viewpoint using "I believe that...", "From my point of view...", and "As far as I know...".',
    ['p_b2_opinion_1', 'p_b2_opinion_2', 'p_b2_opinion_3', 'v_vazhayu', 'v_tochka', 'v_zorun'],
    {
      patterns: [
        { uk: 'Я вважаю, що... / З моєї точки зору...', translit: '', en: 'I believe that... / From my point of view...', czNote: 'Equivalent to Czech "Domnívám se, že..." or "Z mého úhlu pohledu...".' }
      ],
      examples: [
        { uk: 'Я вважаю, що це хороша ідея.', translit: 'Ya vazhayu, shcho tse khorosha ideya.', en: 'I believe that this is a good idea.', cz: 'Považuji to za dobrý nápad.' },
        { uk: 'Наскільки мені відомо, це питання ще не вирішене.', translit: 'Naskilky meni vidomo, tse pytannya shche ne vyrishene.', en: 'As far as I know, this question is not resolved yet.', cz: 'Pokud vím, tato otázka ještě není vyřešena.' }
      ],
      substitutions: [],
      czechNote: '"точка зору" is a literal loan-translation matching Czech "úhel pohledu" (point of view).'
    }),

  L('l25', 45, 'Agreeing and Disagreeing Politely', 'grammar_b2',
    'Learn to navigate conversations politely and express reservations.',
    ['p_b2_agree_1', 'p_b2_agree_2', 'p_b2_agree_3', 'v_chastkovo', 'v_pohodzhuyusya', 'v_odnak'],
    {
      patterns: [
        { uk: 'Я частково погоджуюся, але...', translit: '', en: 'I partly agree, but...', czNote: 'Czech "Částečně souhlasím, ale...".' }
      ],
      examples: [
        { uk: 'Я розумію вашу думку, однак не згоден.', translit: 'Ya rozumiyu vashu dumku, odnak ne zhoden.', en: 'I understand your point, however I do not agree.', cz: 'Rozumím vašemu názoru, nicméně nesouhlasím.' }
      ],
      substitutions: [],
      czechNote: 'Using "однак" (however) or "частково" (partially) softens disagreements.'
    }),

  L('l26', 46, 'Hypothetical Situations', 'grammar_b2',
    'Master subjunctive conditionals with "If..., then..." structures.',
    ['p_b2_hypo_1', 'p_b2_hypo_2', 'v_yakby', 'v_shvydshe'],
    {
      patterns: [
        { uk: 'Якби..., то ... би', translit: '', en: 'If..., then ... would...', czNote: 'Subjunctive conditionals function exactly like Czech "kdyby..., tak by...".' }
      ],
      examples: [
        { uk: 'Якби я мав більше часу, я б вивчив українську швидше.', translit: 'Yakby ya mav bilshe chasu, ya b vyvchyv ukrayinsku shvydshe.', en: 'If I had more time, I would have learned Ukrainian faster.', cz: 'Kdybych měl více času, naučil bych se ukrajinsky rychleji.' }
      ],
      substitutions: [],
      czechNote: 'Ukrainian "якби" works exactly like Czech "kdyby".'
    }),

  L('l27', 47, 'Reported Speech', 'grammar_b2',
    'Describe what others said and explain reasons dynamically.',
    ['p_b2_speech_1', 'p_b2_speech_2', 'v_poyasnyla'],
    {
      patterns: [
        { uk: 'Він сказав, що... / Вона пояснила, чому...', translit: '', en: 'He said that... / She explained why...', czNote: 'Matches Czech "Řekl, že..." / "Vysvětlila, proč...".' }
      ],
      examples: [
        { uk: 'Він сказав, що прийде завтра.', translit: 'Vin skazav, shcho pryyde zavtra.', en: 'He said that he will come tomorrow.', cz: 'Řekl, že přijde zítra.' }
      ],
      substitutions: [],
      czechNote: 'No sequence of tenses is required in Ukrainian reported speech, unlike English.'
    }),

  // --- C1 level expansion lessons ---
  L('l28', 48, 'Nuance and Qualification', 'grammar_c1',
    'Qualify claims using "In a certain sense...", "It cannot be denied that...", and "It is worth noting that...".',
    ['p_c1_nuance_1', 'p_c1_nuance_2', 'p_c1_nuance_3', 'p_c1_nuance_4', 'v_sensi', 'v_zaperechyty', 'v_varto', 'v_zaznachyty'],
    {
      patterns: [
        { uk: 'У певному сенсі... / Не можна заперечувати, що...', translit: '', en: 'In a certain sense... / It cannot be denied that...', czNote: 'Equivalent to Czech "V jistém smyslu..." / "Nelze popřít, že...".' }
      ],
      examples: [
        { uk: 'У певному сенсі, він правий.', translit: 'U pevnomu sensi, vin pravyi.', en: 'In a certain sense, he is right.', cz: 'V jistém smyslu má pravdu.' },
        { uk: 'Варто зазначити, що правила змінилися.', translit: 'Varto zaznachyty, shcho pravyla zminylysya.', en: 'It is worth noting that the rules have changed.', cz: 'Stojí za zmínku, že se pravidla změnila.' }
      ],
      substitutions: [],
      czechNote: '"Варто" acts as a shorthand for "stojí za to".'
    }),

  L('l29', 49, 'Complex Argumentation', 'grammar_c1',
    'Argue complex viewpoints using "On one hand..., on the other hand..." and "I do not so much disagree as...".',
    ['p_c1_arg_1', 'p_c1_arg_2', 'p_c1_arg_3', 'v_odnoho', 'v_boku'],
    {
      patterns: [
        { uk: 'З одного боку..., з іншого боку...', translit: '', en: 'On one hand..., on the other hand...', czNote: 'Czech "Na jednu stranu..., na druhou stranu...".' }
      ],
      examples: [
        { uk: 'З одного боку, це хороше рішення, з іншого боку, воно створює нові проблеми.', translit: 'Z odnoho boku, tse khoroshe rishennya, z inshoho boku, vono stvoryuye novi problemy.', en: 'On one hand, this is a good decision, on the other hand, it creates new problems.', cz: 'Na jednu stranu je to dobré rozhodnutí, na druhou stranu vytváří nové problémy.' }
      ],
      substitutions: [],
      czechNote: '"З одного боку" maps directly to Czech "z jedné strany".'
    }),

  L('l30', 50, 'Expressing Consequences', 'grammar_c1',
    'Explain outcomes using "This led to the fact that..." and "As a result...".',
    ['p_c1_cons_1', 'p_c1_cons_2', 'p_c1_cons_3', 'v_prizvelo', 'v_rezultati'],
    {
      patterns: [
        { uk: 'Це призвело до того, що... / У результаті...', translit: '', en: 'This led to the fact that... / As a result...', czNote: 'Compare with Czech "To vedlo k tomu, že..." / "Ve výsledku...".' }
      ],
      examples: [
        { uk: 'Це призвело до того, що ми запізнилися.', translit: 'Tse pryzvelo do toho, shcho my zapiznylysya.', en: 'This led to the fact that we were late.', cz: 'To vedlo k tomu, že jsme se opozdili.' }
      ],
      substitutions: [],
      czechNote: '"Призвело" is neuter past form agreeing with "Це".'
    }),

  L('l31', 51, 'Complex Time Relationships', 'grammar_c1',
    'Convey sophisticated timelines using "By the time...", "After...", and "Before...".',
    ['p_c1_time_1', 'p_c1_time_2', 'p_c1_time_3', 'v_momentu'],
    {
      patterns: [
        { uk: 'До того моменту, коли... / Після того як...', translit: '', en: 'By the time... / After...', czNote: 'Matches Czech "Do té chvíle, než..." / "Poté, co...".' }
      ],
      examples: [
        { uk: 'До того моменту, коли я приїхав, вони вже все закінчили.', translit: 'Do toho momentu, koly ya pryyiv, vony vzhe vse zakinchyly.', en: 'By the time I arrived, they had already finished everything.', cz: 'Do chvíle, než jsem dorazil, už všechno dokončili.' }
      ],
      substitutions: [],
      czechNote: 'Notice past-tense forms work sequentially here.'
    }),

  L('l32', 52, 'Abstract Discussion', 'grammar_c1',
    'Formulate opinions on complex areas like society, technology, and ecology.',
    ['p_c1_abs_1', 'p_c1_abs_2', 'v_tekhnolohiyi', 'v_suchasnoho'],
    {
      patterns: [],
      examples: [
        { uk: 'Я думаю, що технології змінили спосіб, у який люди спілкуються.', translit: 'Ya dumayu, shcho tekhnolohiyi zminyly sposib, u yakyi lyudy spilkuyutsya.', en: 'I think that technologies changed the way in which people communicate.', cz: 'Myslím, že technologie změnily způsob, jakým lidé komunikují.' },
        { uk: 'Однією з головних проблем сучасного світу є глобальне потепління.', translit: 'Odniyeyu z holovnykh problem suchasnoho svitu ye hlobalne poteplinnya.', en: 'One of the main problems of the modern world is global warming.', cz: 'Jedním z hlavních problémů současného světa je globální oteplování.' }
      ],
      substitutions: [],
      czechNote: 'Great for practice of high-value abstract discourse.'
    }),

  // --- C1 Vocabulary Categories (Themed) ---
  L('l33', 53, 'C1 Vocab: Emotions and Opinions', 'vocab_c1',
    'Expand vocabulary to express nuance in reactions and personal views.',
    ['v_rozhachuvannya', 'v_zadovolennya', 'v_poboyuvannya', 'v_perekonannya', 'v_stavlennya'],
    {
      patterns: [],
      examples: [
        { uk: 'розчарування', translit: 'rozhachuvannya', en: 'disappointment', cz: 'zklamání' },
        { uk: 'задоволення', translit: 'zadovolennya', en: 'satisfaction / pleasure', cz: 'satisfakce / potěšení' }
      ],
      substitutions: [],
      czechNote: 'Notice most neuter abstract nouns end in "-ння" like Czech "-ní".'
    }),

  L('l34', 54, 'C1 Vocab: Work and Professional Life', 'vocab_c1',
    'Communicate professionally regarding responsibilities, decisions, and requirements.',
    ['v_vidpovidalnist', 'v_mozhlyvist', 'v_rishennya', 'v_dosyahnennya', 'v_vymoha'],
    {
      patterns: [],
      examples: [
        { uk: 'відповідальність', translit: 'vidpovidalnist\'', en: 'responsibility', cz: 'odpovědnost' }
      ],
      substitutions: [],
      czechNote: 'Nouns ending in "-ність" correspond to Czech "-nost".'
    }),

  L('l35', 55, 'C1 Vocab: Society and Development', 'vocab_c1',
    'Discuss societal developments, changes, and influences.',
    ['v_suspilstvo', 'v_rozvytok', 'v_zminy', 'v_vplyv'],
    {
      patterns: [],
      examples: [
        { uk: 'суспільство', translit: 'suspilstvo', en: 'society', cz: 'společnost' }
      ],
      substitutions: [],
      czechNote: 'Excellent loanwords matching Czech cognitive structure.'
    }),

  L('l36', 56, 'C1 Vocab: Abstract Connectors', 'vocab_c1',
    'Structure your writing and arguments fluidly with logical transitions.',
    ['v_vodnochas', 'v_nezvazhayuchy_na', 'v_khocha', 'v_krim_toho', 'v_takym_chynom', 'v_zokrema', 'v_vidpovidno'],
    {
      patterns: [],
      examples: [
        { uk: 'водночас', translit: 'vodnochas', en: 'at the same time / simultaneously', cz: 'zároveň' }
      ],
      substitutions: [],
      czechNote: '"водночас" literally translates to Czech "jedním časem" or "zároveň".'
    }),

  L('l37', 57, 'C1 Challenge Sentences', 'review_c1',
    'Ultimate diagnostic challenge sentences to verify absolute boundary of Ukrainian sentence-building ability.',
    ['p_c1_challenge_1', 'p_c1_challenge_2', 'p_c1_challenge_3', 'p_c1_challenge_4', 'p_c1_challenge_5'],
    {
      patterns: [],
      examples: [
        { uk: 'Якби я знав тоді те, що знаю зараз, я б прийняв зовсім інше рішення.', translit: 'Yakby ya znav todi te, shcho znayu zaraz, ya b pryynyav zovsim inshe rishennya.', en: 'If I had known then what I know now, I would have made a completely different decision.', cz: 'Kdybych tehdy věděl to, co vím teď, přijal bych zcela jiné rozhodnutí.' }
      ],
      substitutions: [],
      czechNote: 'Highly advanced multi-clause sentences.'
    }),

  // --- Idioms — a dedicated lesson AND a dedicated pos ('idiom') so they
  // show up as their own Vocabulary Mastered category, not just buried
  // inside random example sentences. Sourced from the user's CEFR doc's
  // own "Idiomatic & Natural C2 Speech" section. ---
  L('l58', 58, 'Common Idioms', 'vocab_c1',
    'Ten everyday Ukrainian idioms — the kind of thing that makes speech sound native rather than just correct.',
    ['v_idiom_iceberg', 'v_idiom_velosyped', 'v_idiom_hrabli', 'v_idiom_palytsya', 'v_idiom_mukha_slona', 'v_idiom_na_ruku', 'v_idiom_ruka_na_pulsi', 'v_idiom_pasky', 'v_idiom_slova_na_vitry', 'v_idiom_spilna_mova'],
    {
      patterns: [],
      examples: [
        { uk: 'Це лише верхівка айсберга.', translit: 'Tse lyshe verkhivka aisberha.', en: 'This is only the tip of the iceberg.', cz: 'To je jen špička ledovce.' },
        { uk: 'Не варто винаходити велосипед.', translit: 'Ne varto vynakhodyty velosyped.', en: 'There\'s no need to reinvent the wheel.', cz: 'Není třeba znovu vynalézat kolo.' },
        { uk: 'Ми наступаємо на ті самі граблі.', translit: 'My nastupayemo na ti sami hrabli.', en: 'We are making the same mistake again.', cz: 'Šlapeme na stejné hrábě.' },
        { uk: 'Тут палиця з двома кінцями.', translit: 'Tut palytsya z dvoma kintsyamy.', en: 'It\'s a double-edged sword.', cz: 'Je to dvousečná zbraň.' },
      ],
      substitutions: [],
      czechNote: 'Idioms are the one category in this app that deliberately isn\'t auto-generated or substitution-based — they\'re fixed, non-compositional phrases, so each one is hand-authored rather than built from smaller reusable parts.',
    }),

  // --- A first real C2 tier — the reference doc's C1 content was already
  // well-covered by l28-l37; this is genuinely new ground above it. ---
  L('l59', 59, 'C2 Grammar Targets: Precision & Qualification', 'vocab_c1',
    'The hedging/qualifying frames that separate "correct" from "precise" — за умови що, навряд чи, не означає що.',
    ['v_za_umovy_shcho', 'v_navryad_chy', 'v_ne_oznachaye_shcho', 'p_c2_qual_1', 'p_c2_qual_2', 'p_c2_qual_3', 'p_c2_qual_4'],
    {
      patterns: [
        { uk: 'за умови, що...', translit: 'za umovy, shcho...', en: '"provided that..." — introduces a necessary condition, more precise/formal than a plain якщо (if).', czNote: 'za předpokladu, že... — same register shift in Czech too.' },
        { uk: 'навряд чи...', translit: 'navryad chy...', en: '"unlikely to... / hardly..." — a hedge, softer and more precise than a flat "no".', czNote: 'sotva... — same idea.' },
      ],
      examples: [
        { uk: 'З цим можна погодитися лише за умови, що ми приймаємо певні припущення.', translit: 'Z tsym mozhna pohodytysya lyshe za umovy, shcho my pryymayemo pevni prypushchennya.', en: 'One can agree with this only if we accept certain assumptions.', cz: 'S tím lze souhlasit jen za předpokladu, že přijmeme určité domněnky.' },
        { uk: 'Якщо ми нічого не змінимо, ситуація навряд чи покращиться.', translit: 'Yakshcho my nichoho ne zminymo, sytuatsiya navryad chy pokrashchyt\'sya.', en: 'If we don\'t change anything, the situation is unlikely to improve.', cz: 'Pokud nic nezměníme, situace se stěží zlepší.' },
        { uk: 'Це не означає, що потрібно відмовлятися від власних переконань.', translit: 'Tse ne oznachaye, shcho potribno vidmovlyatysya vid vlasnykh perekonan\'.', en: 'This doesn\'t mean you have to abandon your own beliefs.', cz: 'To neznamená, že se musíme vzdát vlastního přesvědčení.' },
      ],
      substitutions: [],
      czechNote: 'This whole lesson is drawn from the reference doc\'s own "C2 Vocabulary & Grammar Targets" list — deliberately the highest-leverage frames it names, not an arbitrary sample.',
    }),

  L('l60', 60, 'C2 Diplomacy & Hedged Argument', 'vocab_c1',
    'Combining what you already know (з одного боку, зрештою, не означає що) into full, precisely-qualified arguments — the doc\'s own "C2 Mastery Test" idea: a simple statement expanded, not a new grammar system.',
    ['v_robyty_vyhlyad', 'v_vypuskaty_z_uvahy', 'p_c2_dipl_1', 'p_c2_dipl_2', 'p_c2_dipl_3', 'p_c2_dipl_4'],
    {
      patterns: [],
      examples: [
        { uk: 'З одного боку, я тебе розумію, а з іншого — маю певні сумніви.', translit: 'Z odnoho boku, ya tebe rozumiyu, a z inshoho — mayu pevni sumnivy.', en: 'On the one hand, I understand you, but on the other, I have some doubts.', cz: 'Na jednu stranu ti rozumím, na druhou mám určité pochybnosti.' },
        { uk: 'Давай не будемо робити вигляд, ніби нічого не сталося.', translit: 'Davay ne budemo robyty vyhlyad, niby nichoho ne stalosya.', en: 'Let\'s not pretend that nothing happened.', cz: 'Nedělejme, že se nic nestalo.' },
        { uk: 'Зрештою, кожен має право на власну думку, але це не означає, що всі думки однаково обґрунтовані.', translit: 'Zreshtoyu, kozhen maye pravo na vlasnu dumku, ale tse ne oznachaye, shcho vsi dumky odnakovo obgruntovani.', en: 'Ultimately, everyone has the right to their own opinion, but that doesn\'t mean all opinions are equally well-founded.', cz: 'Nakonec má každý právo na svůj vlastní názor, ale to neznamená, že všechny názory jsou stejně opodstatněné.' },
      ],
      substitutions: [],
      czechNote: 'Notice this lesson barely introduces new vocabulary — зрештою (l57) and не означає, що (l59) are both reused here. That\'s deliberate: real C2 fluency is mostly about combining a fairly small set of connectors well, not an ever-expanding vocabulary list.',
    }),

  // --- Growing the general verb pool the Conjugation Cycle draws from
  // (was capped at 44 infinitives total) — a first, quality-checked batch
  // toward a much larger target rather than a single unverified rush. ---
  L('l61', 61, 'Everyday Action Verbs I', 'vocab',
    'Common household and daily-life verbs — call, listen, cook, clean, open, search, build — the kind of high-frequency words that combine with want/can/have to for endless real sentences.',
    ['v_dzvonyty', 'v_slukhaty', 'v_dyakuvaty', 'v_spivaty', 'v_tantsyuvaty', 'v_malyuvaty', 'v_hotuvaty', 'v_myty', 'v_praty', 'v_prybyraty', 'v_vidkryvaty', 'v_zakryvaty', 'v_vmykaty', 'v_vymykaty', 'v_prynosyty', 'v_vidnosyty', 'v_nosyty', 'v_shukaty', 'v_znakhodyty', 'v_hubyty', 'v_zalyshaty', 'v_kydaty', 'v_lovyty', 'v_buduvaty', 'v_rozmovlyaty'],
    {
      patterns: [],
      examples: [
        { uk: 'Я хочу тобі подзвонити.', translit: 'Ya khochu tobi podzvonyty.', en: 'I want to call you.', cz: 'Chci ti zavolat.' },
        { uk: 'Можеш відкрити двері?', translit: 'Mozhesh vidkryty dveri?', en: 'Can you open the door?', cz: 'Můžeš otevřít dveře?' },
        { uk: 'Я шукаю ключі.', translit: 'Ya shukayu klyuchi.', en: 'I am looking for my keys.', cz: 'Hledám klíče.' },
        { uk: 'Вона любить готувати.', translit: 'Vona lyubyt\' hotuvaty.', en: 'She likes to cook.', cz: 'Ráda vaří.' },
      ],
      substitutions: [],
      czechNote: 'Most of these are regular -ати/-увати/-ити pattern verbs, the same shape as verbs already covered — they mainly add new roots, not new grammar to learn.',
    }),

  L('l62', 62, 'Everyday Action Verbs II', 'vocab',
    'Body and motion verbs — sleep, wake up, sit, stand, run, fall, get dressed — the physical everyday actions that come up constantly in ordinary conversation.',
    ['v_plakaty', 'v_smiyatysya', 'v_krychaty', 'v_movchaty', 'v_spaty', 'v_prokydatysya', 'v_lyahaty', 'v_vstavaty', 'v_sydity', 'v_stoyaty', 'v_lezhaty', 'v_bihty', 'v_strybaty', 'v_padaty', 'v_rukhatysya', 'v_zupynyatysya', 'v_povertatysya', 'v_vykhodyty', 'v_zakhodyty', 'v_hotuvatysya', 'v_odyahatysya', 'v_rozdyahatysya', 'v_mytysya', 'v_holytysya', 'v_tsiluvaty'],
    {
      patterns: [],
      examples: [
        { uk: 'Я мушу вставати рано.', translit: 'Ya mushu vstavaty rano.', en: 'I have to get up early.', cz: 'Musím vstávat brzy.' },
        { uk: 'Діти люблять бігати і стрибати.', translit: 'Dity lyublyat\' bihaty i strybaty.', en: 'Children like to run and jump.', cz: 'Děti rády běhají a skáčou.' },
        { uk: 'Мені треба одягатися.', translit: 'Meni treba odyahatysya.', en: 'I need to get dressed.', cz: 'Musím se obléct.' },
        { uk: 'Він почав сміятися.', translit: 'Vin pochav smiyatysya.', en: 'He started laughing.', cz: 'Začal se smát.' },
      ],
      substitutions: [],
      czechNote: 'Several of these are reflexive (-ся) — прокидатися, одягатися, роздягатися, митися, готуватися, зупинятися, повертатися, рухатися — the same -ся mechanism introduced back in l46, just new roots.',
    }),
];

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

  // --- B1 level expansion lessons ---
  L('l21', 21, 'Narrating Experiences', 'grammar_b1',
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

  L('l22', 22, 'Explaining Situations', 'grammar_b1',
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

  L('l23', 23, 'Comparing and Contrasting', 'grammar_b1',
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

  // --- B2 level expansion lessons ---
  L('l24', 24, 'Complex Opinions', 'grammar_b2',
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

  L('l25', 25, 'Agreeing and Disagreeing Politely', 'grammar_b2',
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

  L('l26', 26, 'Hypothetical Situations', 'grammar_b2',
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

  L('l27', 27, 'Reported Speech', 'grammar_b2',
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
  L('l28', 28, 'Nuance and Qualification', 'grammar_c1',
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

  L('l29', 29, 'Complex Argumentation', 'grammar_c1',
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

  L('l30', 30, 'Expressing Consequences', 'grammar_c1',
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

  L('l31', 31, 'Complex Time Relationships', 'grammar_c1',
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

  L('l32', 32, 'Abstract Discussion', 'grammar_c1',
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
  L('l33', 33, 'C1 Vocab: Emotions and Opinions', 'vocab_c1',
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

  L('l34', 34, 'C1 Vocab: Work and Professional Life', 'vocab_c1',
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

  L('l35', 35, 'C1 Vocab: Society and Development', 'vocab_c1',
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

  L('l36', 36, 'C1 Vocab: Abstract Connectors', 'vocab_c1',
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

  L('l37', 37, 'C1 Challenge Sentences', 'review_c1',
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
];

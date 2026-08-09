// Vocabulary items. Each is quizzable in both directions (uk->en, en->uk) by pool.js.
// translit is a simple phonetic reading, not IPA. topics = lesson id(s) that introduce this word.
function v(id, uk, translit, en, cz, pos, extra = {}) {
  return { id, kind: 'vocab', uk, translit, en, cz, pos, gender: null, aspect: null, pairId: null, topics: [], ...extra };
}

export const VOCAB = [
  // --- l01: Diagnostic word list (exact words from the spec) ---
  v('v_voda', 'вода', 'voda', 'water', 'voda', 'noun', { gender: 'f', topics: ['l01'] }),
  v('v_ruka', 'рука', 'ruka', 'hand / arm', 'ruka', 'noun', { gender: 'f', topics: ['l01'] }),
  v('v_brat', 'брат', 'brat', 'brother', 'bratr', 'noun', { gender: 'm', topics: ['l39'] }),
  v('v_sestra', 'сестра', 'sestra', 'sister', 'sestra', 'noun', { gender: 'f', topics: ['l39'] }),
  v('v_misto', 'місто', 'misto', 'city / town', 'město', 'noun', { gender: 'n', topics: ['l01'] }),
  v('v_robyty', 'робити', 'robyty', 'to do / to make (ongoing)', 'dělat', 'verb', { aspect: 'imperfective', pairId: 'aspect_robyty', topics: ['l01'] }),
  v('v_bachyty', 'бачити', 'bachyty', 'to see (ongoing)', 'vidět', 'verb', { aspect: 'imperfective', pairId: 'aspect_bachyty', topics: ['l01'] }),
  v('v_hovoryty', 'говорити', 'hovoryty', 'to speak / to talk (ongoing)', 'mluvit', 'verb', { aspect: 'imperfective', pairId: 'aspect_hovoryty', topics: ['l01'] }),
  v('v_pysaty', 'писати', 'pysaty', 'to write (ongoing)', 'psát', 'verb', { aspect: 'imperfective', pairId: 'aspect_pysaty', topics: ['l01'] }),
  v('v_khotity', 'хотіти', 'khotity', 'to want', 'chtít', 'verb', { topics: ['l01'] }),

  // --- l02: Cyrillic & sounds starter (easy Slavic cognates) ---
  v('v_mama', 'мама', 'mama', 'mom', 'máma', 'noun', { gender: 'f', topics: ['l02'] }),
  v('v_tato', 'тато', 'tato', 'dad', 'táta', 'noun', { gender: 'm', topics: ['l02'] }),
  v('v_syn', 'син', 'syn', 'son', 'syn', 'noun', { gender: 'm', topics: ['l02'] }),
  v('v_dochka', 'дочка', 'dochka', 'daughter', 'dcera', 'noun', { gender: 'f', topics: ['l02'] }),
  v('v_dim', 'дім', 'dim', 'house / home', 'dům', 'noun', { gender: 'm', topics: ['l02'] }),
  v('v_khlib', 'хліб', 'khlib', 'bread', 'chléb', 'noun', { gender: 'm', topics: ['l02'] }),
  v('v_moloko', 'молоко', 'moloko', 'milk', 'mléko', 'noun', { gender: 'n', topics: ['l02'] }),
  v('v_nich', 'ніч', 'nich', 'night', 'noc', 'noun', { gender: 'f', topics: ['l02'] }),
  v('v_den', 'день', 'den\'', 'day', 'den', 'noun', { gender: 'm', topics: ['l02'] }),
  v('v_rik', 'рік', 'rik', 'year', 'rok', 'noun', { gender: 'm', topics: ['l02'] }),

  // --- l03: High-frequency words & greetings warm-up ---
  v('v_pryvit', 'привіт', 'pryvit', 'hi / hello (informal)', 'ahoj', 'phrase', { topics: ['l03'] }),
  v('v_diakuyu', 'дякую', 'diakuyu', 'thank you', 'děkuji', 'phrase', { topics: ['l03'] }),
  v('v_bud_laska', 'будь ласка', 'bud\' laska', 'please', 'prosím', 'phrase', { topics: ['l03'] }),
  v('v_tak', 'так', 'tak', 'yes', 'ano', 'adverb', { topics: ['l03'] }),
  v('v_ni', 'ні', 'ni', 'no', 'ne', 'adverb', { topics: ['l03'] }),
  v('v_ya', 'я', 'ya', 'I', 'já', 'pronoun', { topics: ['l03'] }),
  v('v_ty', 'ти', 'ty', 'you (informal)', 'ty', 'pronoun', { topics: ['l03'] }),
  v('v_vy', 'ви', 'vy', 'you (formal / plural)', 'vy', 'pronoun', { topics: ['l03'] }),
  v('v_buty', 'бути', 'buty', 'to be', 'být', 'verb', { topics: ['l03'] }),
  v('v_yty', 'йти', 'yty', 'to go (on foot, ongoing)', 'jít', 'verb', { aspect: 'imperfective', pairId: 'aspect_yty', topics: ['l03'] }),
  v('v_maty', 'мати', 'maty', 'to have', 'mít', 'verb', { topics: ['l03'] }),

  // --- l04: Sentence Frame 1 — Want + infinitive ---
  v('v_pobachyty', 'побачити', 'pobachyty', 'to see (one time, complete)', 'uvidět', 'verb', { aspect: 'perfective', pairId: 'aspect_bachyty', topics: ['l04'] }),
  v('v_pohovoryty', 'поговорити', 'pohovoryty', 'to have a talk (complete)', 'promluvit si', 'verb', { aspect: 'perfective', pairId: 'aspect_hovoryty', topics: ['l04'] }),
  v('v_zrobyty', 'зробити', 'zrobyty', 'to do / make (complete)', 'udělat', 'verb', { aspect: 'perfective', pairId: 'aspect_robyty', topics: ['l04'] }),
  v('v_kava', 'кава', 'kava', 'coffee', 'káva', 'noun', { gender: 'f', topics: ['l04'] }),

  // --- l05: Sentence Frame 2 — Can + infinitive ---
  v('v_mohty', 'могти', 'mohty', 'to be able to / can', 'moct', 'verb', { topics: ['l05'] }),
  v('v_pryyty', 'прийти', 'pryyty', 'to come / arrive (complete)', 'přijít', 'verb', { aspect: 'perfective', pairId: 'aspect_pryyty', topics: ['l05'] }),
  v('v_prykhodyty', 'приходити', 'prykhodyty', 'to come / arrive (ongoing, repeated)', 'přicházet', 'verb', { aspect: 'imperfective', pairId: 'aspect_pryyty', topics: ['l05'] }),
  v('v_dopomohty', 'допомогти', 'dopomohty', 'to help (complete)', 'pomoct', 'verb', { aspect: 'perfective', pairId: 'aspect_dopomahaty', topics: ['l05'] }),
  v('v_dopomahaty', 'допомагати', 'dopomahaty', 'to help (ongoing)', 'pomáhat', 'verb', { aspect: 'imperfective', pairId: 'aspect_dopomahaty', topics: ['l05'] }),
  v('v_zrozumity', 'зрозуміти', 'zrozumity', 'to understand (complete)', 'pochopit', 'verb', { aspect: 'perfective', topics: ['l05'] }),

  // --- l07: Sentence Frame 3 — Future tense ---
  v('v_pratsyuvaty', 'працювати', 'pratsyuvaty', 'to work', 'pracovat', 'verb', { aspect: 'imperfective', topics: ['l07'] }),
  v('v_chekaty', 'чекати', 'chekaty', 'to wait', 'čekat', 'verb', { aspect: 'imperfective', topics: ['l07'] }),

  // --- l08: Sentence Frame 4 — Past tense & gender agreement ---
  v('v_pishov', 'пішов', 'pishov', '(he) went', 'šel', 'phrase', { gender: 'm', topics: ['l08'] }),
  v('v_pishla', 'пішла', 'pishla', '(she) went', 'šla', 'phrase', { gender: 'f', topics: ['l08'] }),
  v('v_pishly', 'пішли', 'pishly', '(they) went', 'šli', 'phrase', { topics: ['l08'] }),
  v('v_robyv', 'робив', 'robyv', '(he) was doing', 'dělal', 'phrase', { gender: 'm', topics: ['l08'] }),
  v('v_robyla', 'робила', 'robyla', '(she) was doing', 'dělala', 'phrase', { gender: 'f', topics: ['l08'] }),

  v('v_pity', 'піти', 'pity', 'to go / set off (complete)', 'jít / odejít', 'verb', { aspect: 'perfective', pairId: 'aspect_yty', topics: ['l08'] }),

  // --- l09: Verb aspect (adds a third pair; others reuse l01/l04 pairs) ---
  v('v_napysaty', 'написати', 'napysaty', 'to write (complete)', 'napsat', 'verb', { aspect: 'perfective', pairId: 'aspect_pysaty', topics: ['l09'] }),

  // --- l10: Sentence Frame 5 — Conditional "would" ---
  v('v_khotiv_by', 'хотів би', 'khotiv by', '(he) would like', 'chtěl by', 'phrase', { topics: ['l10'] }),
  v('v_pishov_by', 'пішов би', 'pishov by', '(he) would go', 'šel by', 'phrase', { topics: ['l10'] }),
  v('v_mav_by', 'мав би', 'mav by', '(he) should / ought to', 'měl by', 'phrase', { topics: ['l10'] }),

  // --- l11: Sentence Frame 6 — Need / should / must ---
  v('v_musyty', 'мусити', 'musyty', 'must / to have to', 'muset', 'verb', { topics: ['l11'] }),
  v('v_treba', 'треба', 'treba', 'need to / one must', 'je třeba', 'phrase', { topics: ['l11'] }),
  v('v_potribno', 'потрібно', 'potribno', 'it is necessary', 'je potřeba', 'phrase', { topics: ['l11'] }),

  // --- l13: Greetings & introductions ---
  v('v_dobryi_den', 'добрий день', 'dobryi den\'', 'good day / hello', 'dobrý den', 'phrase', { topics: ['l13'] }),
  v('v_dobryi_vechir', 'добрий вечір', 'dobryi vechir', 'good evening', 'dobrý večer', 'phrase', { topics: ['l13'] }),
  v('v_do_pobachennya', 'до побачення', 'do pobachennya', 'goodbye', 'na shledanou', 'phrase', { topics: ['l13'] }),
  v('v_mene_zvaty', 'мене звати', 'mene zvaty', 'my name is', 'jmenuji se', 'phrase', { topics: ['l13'] }),
  v('v_yak_tebe_zvaty', 'як тебе звати', 'yak tebe zvaty', 'what is your name (informal)', 'jak se jmenuješ', 'phrase', { topics: ['l13'] }),
  v('v_pryyemno_poznayomytys', 'приємно познайомитись', 'pryyemno poznayomytys\'', 'nice to meet you', 'těší mě', 'phrase', { topics: ['l13'] }),

  // --- l14: Small talk / how are you ---
  v('v_yak_spravy', 'як справи', 'yak spravy', 'how are things / how are you', 'jak se máš', 'phrase', { topics: ['l14'] }),
  v('v_dobre', 'добре', 'dobre', 'good / fine / well', 'dobře', 'adverb', { topics: ['l14'] }),
  v('v_pohano', 'погано', 'pohano', 'bad / poorly', 'špatně', 'adverb', { topics: ['l14'] }),
  v('v_a_ty', 'а ти', 'a ty', 'and you (informal)', 'a ty', 'phrase', { topics: ['l14'] }),

  // --- l15: Making plans & invitations ---
  v('v_proponuvaty', 'пропонувати', 'proponuvaty', 'to suggest / propose', 'navrhovat', 'verb', { aspect: 'imperfective', topics: ['l15'] }),
  v('v_zustritysya', 'зустрітися', 'zustritysya', 'to meet up (complete)', 'setkat se', 'verb', { aspect: 'perfective', topics: ['l15'] }),
  v('v_koly', 'коли', 'koly', 'when', 'kdy', 'adverb', { topics: ['l15'] }),
  v('v_s_ohodni', 'сьогодні', 's\'ohodni', 'today', 'dnes', 'adverb', { topics: ['l15'] }),
  v('v_zavtra', 'завтра', 'zavtra', 'tomorrow', 'zítra', 'adverb', { topics: ['l15'] }),
  v('v_o_kotriy_hodyni', 'о котрій годині', 'o kotriy hodyni', 'at what time', 'v kolik hodin', 'phrase', { topics: ['l15'] }),

  // --- l16: Meeting friends & talking about people ---
  v('v_druh', 'друг', 'druh', 'friend (male)', 'kamarád', 'noun', { gender: 'm', topics: ['l16'] }),
  v('v_podruha', 'подруга', 'podruha', 'friend (female)', 'kamarádka', 'noun', { gender: 'f', topics: ['l16'] }),
  v('v_znayomyi', 'знайомий', 'znayomyi', 'acquaintance', 'známý', 'noun', { gender: 'm', topics: ['l16'] }),
  v('v_razom', 'разом', 'razom', 'together', 'spolu', 'adverb', { topics: ['l16'] }),
  v('v_davno_ne_bachylys', 'давно не бачились', 'davno ne bachylys\'', 'long time no see', 'dlouho jsme se neviděli', 'phrase', { topics: ['l16'] }),

  // --- l17: Food & ordering ---
  v('v_menyu', 'меню', 'menyu', 'menu', 'menu', 'noun', { gender: 'n', topics: ['l17'] }),
  v('v_smachno', 'смачно', 'smachno', 'tasty', 'chutné', 'adverb', { topics: ['l17'] }),
  v('v_zamovyty', 'замовити', 'zamovyty', 'to order (complete)', 'objednat', 'verb', { aspect: 'perfective', topics: ['l17'] }),
  v('v_chai', 'чай', 'chai', 'tea', 'čaj', 'noun', { gender: 'm', topics: ['l17'] }),
  v('v_rakhunok', 'рахунок', 'rakhunok', 'the bill', 'účet', 'noun', { gender: 'm', topics: ['l17'] }),
  v('v_myaso', 'м\'ясо', 'myaso', 'meat', 'maso', 'noun', { gender: 'n', topics: ['l17'] }),

  // --- l18: Travel & directions ---
  v('v_kvytok', 'квиток', 'kvytok', 'ticket', 'lístek', 'noun', { gender: 'm', topics: ['l18'] }),
  v('v_potyah', 'потяг', 'potyah', 'train', 'vlak', 'noun', { gender: 'm', topics: ['l18'] }),
  v('v_livoruch', 'ліворуч', 'livoruch', 'to the left', 'vlevo', 'adverb', { topics: ['l18'] }),
  v('v_pravoruch', 'праворуч', 'pravoruch', 'to the right', 'vpravo', 'adverb', { topics: ['l18'] }),
  v('v_de', 'де', 'de', 'where', 'kde', 'adverb', { topics: ['l18'] }),
  v('v_vokzal', 'вокзал', 'vokzal', 'train station', 'nádraží', 'noun', { gender: 'm', topics: ['l18'] }),
  v('v_aeroport', 'аеропорт', 'aeroport', 'airport', 'letiště', 'noun', { gender: 'm', topics: ['l18'] }),

  // --- l19: Work & daily routine ---
  v('v_zustrich', 'зустріч', 'zustrich', 'meeting', 'schůzka', 'noun', { gender: 'f', topics: ['l19'] }),
  v('v_ofis', 'офіс', 'ofis', 'office', 'kancelář', 'noun', { gender: 'm', topics: ['l19'] }),
  v('v_koleha', 'колега', 'koleha', 'colleague', 'kolega', 'noun', { topics: ['l19'] }),
  v('v_shchodnya', 'щодня', 'shchodnya', 'every day', 'každý den', 'adverb', { topics: ['l19'] }),

  // --- l20: Explaining simple needs & problems ---
  v('v_problema', 'проблема', 'problema', 'problem', 'problém', 'noun', { gender: 'f', topics: ['l20'] }),
  v('v_dopomozhit', 'допоможіть', 'dopomozhit\'', 'help! (please help)', 'pomozte', 'phrase', { topics: ['l20'] }),
  v('v_povtorit', 'повторіть', 'povtorit\'', 'please repeat', 'zopakujte', 'phrase', { topics: ['l20'] }),
  v('v_rozumiyu', 'розумію', 'rozumiyu', 'I understand', 'rozumím', 'phrase', { topics: ['l20'] }),
  v('v_ne_rozumiyu', 'не розумію', 'ne rozumiyu', 'I don\'t understand', 'nerozumím', 'phrase', { topics: ['l20'] }),

  // --- Numbers & question words (woven into l17/l18/l19 practice) ---
  v('v_odyn', 'один', 'odyn', 'one', 'jeden', 'number', { topics: ['l38'] }),
  v('v_dva', 'два', 'dva', 'two', 'dva', 'number', { topics: ['l38'] }),
  v('v_try', 'три', 'try', 'three', 'tři', 'number', { topics: ['l38'] }),
  v('v_chotyry', 'чотири', 'chotyry', 'four', 'čtyři', 'number', { topics: ['l38'] }),
  v('v_p_yat', 'п\'ять', 'p\'yat\'', 'five', 'pět', 'number', { topics: ['l38'] }),
  v('v_skil_ky', 'скільки', 'skil\'ky', 'how much / how many', 'kolik', 'adverb', { topics: ['l17'] }),
  v('v_khto', 'хто', 'khto', 'who', 'kdo', 'pronoun', { topics: ['l16'] }),
  v('v_shcho', 'що', 'shcho', 'what', 'co', 'pronoun', { topics: ['l20'] }),
  v('v_chomu', 'чому', 'chomu', 'why', 'proč', 'adverb', { topics: ['l20'] }),
  v('v_yak', 'як', 'yak', 'how', 'jak', 'adverb', { topics: ['l14'] }),

  // --- B1 level expansion items ---
  v('v_zrobyv', 'зробив', 'zrobyv', 'did / made', 'udělal', 'verb', { aspect: 'perfective', topics: ['l21'] }),
  v('v_nikoly', 'ніколи', 'nikoly', 'never', 'nikdy', 'adverb', { topics: ['l21'] }),
  v('v_molodshyi', 'молодший', 'molodshyi', 'younger', 'mladší', 'adjective', { topics: ['l21'] }),
  v('v_sprava', 'справа', 'sprava', 'matter / business', 'věc / záležitost', 'noun', { gender: 'f', topics: ['l22'] }),
  v('v_prychyna', 'причина', 'prychyna', 'reason', 'příčina / důvod', 'noun', { gender: 'f', topics: ['l22'] }),
  v('v_polyahaye', 'полягає', 'polyahaye', 'lies (in) / consists (of)', 'spočívá', 'verb', { topics: ['l22'] }),
  v('v_vidminu', 'відміну', 'vidminu', 'difference / distinction', 'rozdíl', 'noun', { topics: ['l23'] }),
  v('v_porivnyano', 'порівняно', 'porivnyano', 'compared', 'porovnání / srovnání', 'adverb', { topics: ['l23'] }),

  // --- B2 level expansion items ---
  v('v_vazhayu', 'вважаю', 'vazhayu', 'I consider / believe', 'považuji', 'verb', { topics: ['l24'] }),
  v('v_tochka', 'точка', 'tochka', 'point', 'bod', 'noun', { gender: 'f', topics: ['l24'] }),
  v('v_zorun', 'зору', 'zoru', 'sight / vision (genitive)', 'zraku / pohledu', 'noun', { topics: ['l24'] }),
  v('v_chastkovo', 'частково', 'chastkovo', 'partly', 'částečně', 'adverb', { topics: ['l25'] }),
  v('v_pohodzhuyusya', 'погоджуюся', 'pohodzhuyusya', 'I agree', 'souhlasím', 'verb', { topics: ['l25'] }),
  v('v_odnak', 'однак', 'odnak', 'however / yet', 'avšak / nicméně', 'conjunction', { topics: ['l25'] }),
  v('v_yakby', 'якби', 'yakby', 'if (hypothetical)', 'kdyby', 'conjunction', { topics: ['l26'] }),
  v('v_shvydshe', 'швидше', 'shvydshe', 'faster / more quickly', 'rychleji', 'adverb', { topics: ['l26'] }),
  v('v_poyasnyla', 'пояснила', 'poyasnyla', 'explained (f)', 'vysvětlila', 'verb', { gender: 'f', topics: ['l27'] }),

  // --- C1 level expansion items ---
  v('v_sensi', 'сенсі', 'sensi', 'sense (locative)', 'smyslu', 'noun', { topics: ['l28'] }),
  v('v_zaperechyty', 'заперечити', 'zaperechyty', 'to deny / object', 'popřít / namítat', 'verb', { topics: ['l28'] }),
  v('v_varto', 'варто', 'varto', 'worth / should', 'stojí za to / dlužno', 'adverb', { topics: ['l28'] }),
  v('v_zaznachyty', 'зазначити', 'zaznachyty', 'to note / mention', 'poznamenat', 'verb', { topics: ['l28'] }),
  v('v_odnoho', 'одного', 'odnoho', 'one (genitive)', 'jednoho', 'pronoun', { topics: ['l29'] }),
  v('v_boku', 'боку', 'boku', 'side (genitive)', 'strany / boku', 'noun', { topics: ['l29'] }),
  v('v_prizvelo', 'призвело', 'prizvelo', 'led / resulted (n)', 'vedlo / zapříčinilo', 'verb', { gender: 'n', topics: ['l30'] }),
  v('v_rezultati', 'результаті', 'rezultati', 'result (locative)', 'výsledku', 'noun', { topics: ['l30'] }),
  v('v_momentu', 'моменту', 'momentu', 'moment (genitive)', 'momentu / chvíle', 'noun', { topics: ['l31'] }),
  v('v_tekhnolohiyi', 'технології', 'tekhnolohiyi', 'technologies', 'technologie', 'noun', { topics: ['l32'] }),
  v('v_suchasnoho', 'сучасного', 'suchasnoho', 'modern (genitive)', 'moderního', 'adjective', { topics: ['l32'] }),

  // C1 Vocab Categories (Themed)
  // Emotions & opinions
  v('v_rozhachuvannya', 'розчарування', 'rozhachuvannya', 'disappointment', 'zklamání', 'noun', { gender: 'n', topics: ['l33'] }),
  v('v_zadovolennya', 'задоволення', 'zadovolennya', 'satisfaction / pleasure', 'satisfakce / potěšení', 'noun', { gender: 'n', topics: ['l33'] }),
  v('v_poboyuvannya', 'побоювання', 'poboyuvannya', 'fear / apprehension', 'obava', 'noun', { gender: 'n', topics: ['l33'] }),
  v('v_perekonannya', 'переконання', 'perekonannya', 'conviction / belief', 'přesvědčení', 'noun', { gender: 'n', topics: ['l33'] }),
  v('v_stavlennya', 'ставлення', 'stavlennya', 'attitude / relation', 'postoj / vztah', 'noun', { gender: 'n', topics: ['l33'] }),
  // Work and professional life
  v('v_vidpovidalnist', 'відповідальність', 'vidpovidalnist\'', 'responsibility', 'odpovědnost', 'noun', { gender: 'f', topics: ['l34'] }),
  v('v_mozhlyvist', 'можливість', 'mozhlyvist\'', 'opportunity / possibility', 'možnost', 'noun', { gender: 'f', topics: ['l34'] }),
  v('v_rishennya', 'рішення', 'rishennya', 'decision / solution', 'rozhodnutí / řešení', 'noun', { gender: 'n', topics: ['l34'] }),
  v('v_dosyahnennya', 'досягнення', 'dosyahnennya', 'achievement', 'úspěch / dosažení', 'noun', { gender: 'n', topics: ['l34'] }),
  v('v_vymoha', 'вимога', 'vymoha', 'requirement / demand', 'požadavek', 'noun', { gender: 'f', topics: ['l34'] }),
  // Society
  v('v_suspilstvo', 'суспільство', 'suspilstvo', 'society', 'společnost', 'noun', { gender: 'n', topics: ['l35'] }),
  v('v_rozvytok', 'розвиток', 'rozvytok', 'development', 'rozvoj', 'noun', { gender: 'm', topics: ['l35'] }),
  v('v_zminy', 'зміни', 'zminy', 'changes', 'změny', 'noun', { topics: ['l35'] }),
  v('v_vplyv', 'вплив', 'vplyv', 'influence / impact', 'vliv', 'noun', { gender: 'm', topics: ['l35'] }),
  // Abstract connectors
  v('v_vodnochas', 'водночас', 'vodnochas', 'at the same time / simultaneously', 'zároveň', 'connector', { topics: ['l36'], skills: ['connector'] }),
  v('v_nezvazhayuchy_na', 'незважаючи на', 'nezvazhayuchy na', 'despite / in spite of', 'přes / nehledě na', 'connector', { topics: ['l36'], skills: ['connector'] }),
  v('v_khocha', 'хоча', 'khocha', 'although / though', 'ačkoliv / ač', 'connector', { topics: ['l36'], skills: ['connector'] }),
  v('v_krim_toho', 'крім того', 'krim toho', 'besides / in addition', 'kromě toho', 'connector', { topics: ['l36'], skills: ['connector'] }),
  v('v_takym_chynom', 'таким чином', 'takym chynom', 'thus / in this way', 'tímto způsobem / tak', 'connector', { topics: ['l36'], skills: ['connector'] }),
  v('v_zokrema', 'зокрема', 'zokrema', 'in particular / particularly', 'zejména / konkrétně', 'connector', { topics: ['l36'], skills: ['connector'] }),
  v('v_vidpovidno', 'відповідно', 'vidpovidno', 'accordingly / respectively', 'odpovídajícím způsobem', 'connector', { topics: ['l36'], skills: ['connector'] }),

  // --- l38: Numbers, Time & Dates (шість-десять added; один-п'ять already exist, tagged l19) ---
  v('v_shist', 'шість', 'shist\'', 'six', 'šest', 'number', { topics: ['l38'] }),
  v('v_sim', 'сім', 'sim', 'seven', 'sedm', 'number', { topics: ['l38'] }),
  v('v_visim', 'вісім', 'visim', 'eight', 'osm', 'number', { topics: ['l38'] }),
  v('v_devyat', 'дев\'ять', 'dev\'yat\'', 'nine', 'devět', 'number', { topics: ['l38'] }),
  v('v_desyat', 'десять', 'desyat\'', 'ten', 'deset', 'number', { topics: ['l38'] }),
  v('v_hodyna', 'година', 'hodyna', 'hour / o\'clock', 'hodina', 'noun', { gender: 'f', topics: ['l38'] }),
  v('v_khvylyna', 'хвилина', 'khvylyna', 'minute', 'minuta', 'noun', { gender: 'f', topics: ['l38'] }),
  v('v_zaraz', 'зараз', 'zaraz', 'now', 'teď', 'adverb', { topics: ['l38'] }),
  v('v_vchora', 'вчора', 'vchora', 'yesterday', 'včera', 'adverb', { topics: ['l38'] }),
  v('v_tyzhden', 'тиждень', 'tyzhden\'', 'week', 'týden', 'noun', { gender: 'm', topics: ['l38'] }),

  // --- l39: Family in More Detail (брат/сестра/син/дочка/мама/тато already exist) ---
  v('v_babusya', 'бабуся', 'babusya', 'grandmother', 'babička', 'noun', { gender: 'f', topics: ['l39'] }),
  v('v_didus', 'дідусь', 'didus\'', 'grandfather', 'dědeček', 'noun', { gender: 'm', topics: ['l39'] }),
  v('v_druzhyna', 'дружина', 'druzhyna', 'wife', 'manželka', 'noun', { gender: 'f', topics: ['l39'] }),
  v('v_cholovik', 'чоловік', 'cholovik', 'husband / man', 'manžel / muž', 'noun', { gender: 'm', topics: ['l39'] }),
  v('v_dytyna', 'дитина', 'dytyna', 'child', 'dítě', 'noun', { gender: 'f', topics: ['l39'] }),
  v('v_simya', 'сім\'я', 'sim\'ya', 'family', 'rodina', 'noun', { gender: 'f', topics: ['l39'] }),

  // --- l40: Colors & Describing Things ---
  v('v_chervonyi', 'червоний', 'chervonyi', 'red', 'červený', 'adjective', { topics: ['l40'] }),
  v('v_syniy', 'синій', 'syniy', 'blue', 'modrý', 'adjective', { topics: ['l40'] }),
  v('v_zelenyi', 'зелений', 'zelenyi', 'green', 'zelený', 'adjective', { topics: ['l40'] }),
  v('v_zhovtyi', 'жовтий', 'zhovtyi', 'yellow', 'žlutý', 'adjective', { topics: ['l40'] }),
  v('v_chornyi', 'чорний', 'chornyi', 'black', 'černý', 'adjective', { topics: ['l40'] }),
  v('v_bilyi', 'білий', 'bilyi', 'white', 'bílý', 'adjective', { topics: ['l40'] }),
  v('v_velykyi', 'великий', 'velykyi', 'big', 'velký', 'adjective', { topics: ['l40'] }),
  v('v_malenkyi', 'маленький', 'malen\'kyi', 'small', 'malý', 'adjective', { topics: ['l40'] }),

  // --- l41: Weather & Seasons ---
  v('v_pohoda', 'погода', 'pohoda', 'weather', 'počasí', 'noun', { gender: 'f', topics: ['l41'] }),
  v('v_sontse', 'сонце', 'sontse', 'sun', 'slunce', 'noun', { gender: 'n', topics: ['l41'] }),
  v('v_doshch', 'дощ', 'doshch', 'rain', 'déšť', 'noun', { gender: 'm', topics: ['l41'] }),
  v('v_snih', 'сніг', 'snih', 'snow', 'sníh', 'noun', { gender: 'm', topics: ['l41'] }),
  v('v_kholodno', 'холодно', 'kholodno', 'cold (it is cold)', 'zima / chladno', 'adverb', { topics: ['l41'] }),
  v('v_teplo', 'тепло', 'teplo', 'warm (it is warm)', 'teplo', 'adverb', { topics: ['l41'] }),
  v('v_zyma', 'зима', 'zyma', 'winter', 'zima', 'noun', { gender: 'f', topics: ['l41'] }),
  v('v_lito', 'літо', 'lito', 'summer', 'léto', 'noun', { gender: 'n', topics: ['l41'] }),

  // --- l42: Shopping & Money ---
  v('v_hroshi', 'гроші', 'hroshi', 'money', 'peníze', 'noun', { topics: ['l42'] }),
  v('v_mahazyn', 'магазин', 'mahazyn', 'shop / store', 'obchod', 'noun', { gender: 'm', topics: ['l42'] }),
  v('v_tsina', 'ціна', 'tsina', 'price', 'cena', 'noun', { gender: 'f', topics: ['l42'] }),
  v('v_deshevo', 'дешево', 'deshevo', 'cheap', 'levné', 'adverb', { topics: ['l42'] }),
  v('v_doroho', 'дорого', 'doroho', 'expensive', 'drahé', 'adverb', { topics: ['l42'] }),
  v('v_kupyty', 'купити', 'kupyty', 'to buy (complete)', 'koupit', 'verb', { aspect: 'perfective', topics: ['l42'] }),
  v('v_prodavaty', 'продавати', 'prodavaty', 'to sell (ongoing)', 'prodávat', 'verb', { aspect: 'imperfective', topics: ['l42'] }),
  v('v_kartka', 'картка', 'kartka', 'card (e.g. payment card)', 'karta', 'noun', { gender: 'f', topics: ['l42'] }),

  // --- l43: The Body & Feeling Unwell ---
  v('v_holova', 'голова', 'holova', 'head', 'hlava', 'noun', { gender: 'f', topics: ['l43'] }),
  v('v_zhyvit', 'живіт', 'zhyvit', 'stomach', 'břicho', 'noun', { gender: 'm', topics: ['l43'] }),
  v('v_horlo', 'горло', 'horlo', 'throat', 'krk / hrdlo', 'noun', { gender: 'n', topics: ['l43'] }),
  v('v_khvoryi', 'хворий', 'khvoryi', 'sick / ill', 'nemocný', 'adjective', { topics: ['l43'] }),
  v('v_bolyt', 'болить', 'bolyt\'', 'it hurts', 'to bolí', 'phrase', { topics: ['l43'] }),
  v('v_likar', 'лікар', 'likar', 'doctor', 'lékař', 'noun', { gender: 'm', topics: ['l43'] }),
  v('v_apteka', 'аптека', 'apteka', 'pharmacy', 'lékárna', 'noun', { gender: 'f', topics: ['l43'] }),
  v('v_liky', 'ліки', 'liky', 'medicine', 'léky', 'noun', { topics: ['l43'] }),

  // --- l44: Prepositions of Place (grammar) ---
  v('v_u_v', 'у / в', 'u / v', 'in', 'v', 'phrase', { topics: ['l44'] }),
  v('v_na', 'на', 'na', 'on / at', 'na', 'phrase', { topics: ['l44'] }),
  v('v_pid', 'під', 'pid', 'under', 'pod', 'phrase', { topics: ['l44'] }),
  v('v_za_prep', 'за', 'za', 'behind', 'za', 'phrase', { topics: ['l44'] }),
  v('v_mizh', 'між', 'mizh', 'between', 'mezi', 'phrase', { topics: ['l44'] }),
  v('v_bilya', 'біля', 'bilya', 'near / next to', 'blízko / u', 'phrase', { topics: ['l44'] }),

  // --- New A2/B1 lessons (wave 2 of the content-expansion request) ---
  // --- l45: The Dative Case — Saying What You Need or Feel (grammar) ---
  v('v_meni', 'мені', 'meni', 'to me', 'mně / mi', 'pronoun', { topics: ['l45'], skills: ['dative'] }),
  v('v_tobi', 'тобі', 'tobi', 'to you (informal)', 'tobě / ti', 'pronoun', { topics: ['l45'], skills: ['dative'] }),
  v('v_yomu', 'йому', 'yomu', 'to him', 'jemu / mu', 'pronoun', { topics: ['l45'], skills: ['dative'] }),
  v('v_yiy', 'їй', 'yiy', 'to her', 'jí', 'pronoun', { topics: ['l45'], skills: ['dative'] }),
  v('v_nam', 'нам', 'nam', 'to us', 'nám', 'pronoun', { topics: ['l45'], skills: ['dative'] }),
  v('v_vam', 'вам', 'vam', 'to you (formal/plural)', 'vám', 'pronoun', { topics: ['l45'], skills: ['dative'] }),
  v('v_yim', 'їм', 'yim', 'to them', 'jim', 'pronoun', { topics: ['l45'], skills: ['dative'] }),
  v('v_mozhna', 'можна', 'mozhna', 'one may / it is allowed', 'smí se / lze', 'adverb', { topics: ['l45'], skills: ['dative'] }),
  v('v_khochetsya', 'хочеться', 'khochet\'sya', 'feel like (doing something)', 'chce se mi', 'phrase', { topics: ['l45'], skills: ['dative'] }),
  v('v_vazhko', 'важко', 'vazhko', 'hard / difficult (for someone)', 'těžké', 'adverb', { topics: ['l45'], skills: ['dative'] }),
  v('v_lehko', 'легко', 'lehko', 'easy (for someone)', 'lehké', 'adverb', { topics: ['l45'], skills: ['dative'] }),
  v('v_tsikavo', 'цікаво', 'tsikavo', 'interesting', 'zajímavé', 'adverb', { topics: ['l45'], skills: ['dative'] }),
  v('v_sumno', 'сумно', 'sumno', 'sad', 'smutno', 'adverb', { topics: ['l45'], skills: ['dative'] }),

  // --- l46: Reflexive Verbs — Actions on Yourself (grammar) ---
  v('v_vchytysya', 'вчитися', 'vchytysya', 'to study / to learn', 'učit se', 'verb', { aspect: 'imperfective', topics: ['l46'], skills: ['reflexive'] }),
  v('v_boyatysya', 'боятися', 'boyatysya', 'to be afraid / to fear', 'bát se', 'verb', { aspect: 'imperfective', topics: ['l46'], skills: ['reflexive'] }),
  v('v_dyvuvatysya', 'дивуватися', 'dyvuvatysya', 'to be surprised / to wonder', 'divit se', 'verb', { aspect: 'imperfective', topics: ['l46'], skills: ['reflexive'] }),
  v('v_spodivatysya', 'сподіватися', 'spodivatysya', 'to hope', 'doufat', 'verb', { aspect: 'imperfective', topics: ['l46'], skills: ['reflexive'] }),
  v('v_usmikhatysya', 'усміхатися', 'usmikhatysya', 'to smile', 'usmívat se', 'verb', { aspect: 'imperfective', topics: ['l46'], skills: ['reflexive'] }),

  // --- l47: Days of the Week (topic) ---
  v('v_ponedilok', 'понеділок', 'ponedilok', 'Monday', 'pondělí', 'noun', { gender: 'm', topics: ['l47'] }),
  v('v_vivtorok', 'вівторок', 'vivtorok', 'Tuesday', 'úterý', 'noun', { gender: 'm', topics: ['l47'] }),
  v('v_sereda', 'середа', 'sereda', 'Wednesday', 'středa', 'noun', { gender: 'f', topics: ['l47'] }),
  v('v_chetver', 'четвер', 'chetver', 'Thursday', 'čtvrtek', 'noun', { gender: 'm', topics: ['l47'] }),
  v('v_pyatnytsya', 'п\'ятниця', 'p\'yatnytsya', 'Friday', 'pátek', 'noun', { gender: 'f', topics: ['l47'] }),
  v('v_subota', 'субота', 'subota', 'Saturday', 'sobota', 'noun', { gender: 'f', topics: ['l47'] }),
  v('v_nedilya', 'неділя', 'nedilya', 'Sunday', 'neděle', 'noun', { gender: 'f', topics: ['l47'] }),

  // --- l48: More Everyday Verbs (vocab) ---
  v('v_braty', 'брати', 'braty', 'to take', 'brát', 'verb', { aspect: 'imperfective', topics: ['l48'] }),
  v('v_davaty', 'давати', 'davaty', 'to give', 'dávat', 'verb', { aspect: 'imperfective', topics: ['l48'] }),
  v('v_otrymuvaty', 'отримувати', 'otrymuvaty', 'to receive', 'dostávat', 'verb', { aspect: 'imperfective', topics: ['l48'] }),
  v('v_trymaty', 'тримати', 'trymaty', 'to hold / to keep', 'držet', 'verb', { aspect: 'imperfective', topics: ['l48'] }),
  v('v_vidpochyvaty', 'відпочивати', 'vidpochyvaty', 'to rest', 'odpočívat', 'verb', { aspect: 'imperfective', topics: ['l48'] }),
  v('v_podorozhuvaty', 'подорожувати', 'podorozhuvaty', 'to travel', 'cestovat', 'verb', { aspect: 'imperfective', topics: ['l48'] }),

  // --- l49: Home & Everyday Objects (topic) ---
  v('v_shkola', 'школа', 'shkola', 'school', 'škola', 'noun', { gender: 'f', topics: ['l49'] }),
  v('v_shafa', 'шафа', 'shafa', 'wardrobe', 'skříň', 'noun', { gender: 'f', topics: ['l49'] }),
  v('v_pralna_mashyna', 'пральна машина', 'pral\'na mashyna', 'washing machine', 'pračka', 'phrase', { topics: ['l49'] }),
  v('v_odyah', 'одяг', 'odyah', 'clothing / clothes', 'oblečení', 'noun', { gender: 'm', topics: ['l49'] }),
  v('v_tualet', 'туалет', 'tualet', 'toilet / restroom', 'záchod', 'noun', { gender: 'm', topics: ['l49'] }),
  v('v_vanna_kimnata', 'ванна кімната', 'vanna kimnata', 'bathroom', 'koupelna', 'phrase', { topics: ['l49'] }),

  // --- l50: Czech/Russian False Friends — A Caution (topic) ---
  // Only the two genuinely new verbs live here; the rest of the caution
  // (робити, мати, бути, бачити, йти, дякую) reuses items already taught in
  // l01-l03 rather than re-declaring duplicate vocab under a new lesson.
  v('v_yisty', 'їсти', 'yisty', 'to eat', 'jíst', 'verb', { topics: ['l50'] }),
  v('v_dyvytysya', 'дивитися', 'dyvytysya', 'to watch', 'dívat se', 'verb', { aspect: 'imperfective', topics: ['l50'], skills: ['reflexive'] }),

  // --- New conversational lessons (wave 3): hobbies, opinions, small talk,
  // informed directly by the sentences the user asked for. ---
  // --- l51: Hobbies & Free Time ---
  v('v_lyubyty', 'любити', 'lyubyty', 'to like / to love', 'mít rád', 'verb', { topics: ['l51'] }),
  v('v_plavaty', 'плавати', 'plavaty', 'to swim', 'plavat', 'verb', { aspect: 'imperfective', topics: ['l51'] }),
  v('v_vidviduvaty', 'відвідувати', 'vidviduvaty', 'to visit', 'navštěvovat', 'verb', { aspect: 'imperfective', topics: ['l51'] }),
  v('v_muzey', 'музей', 'muzey', 'museum', 'muzeum', 'noun', { gender: 'm', topics: ['l51'] }),
  v('v_vykhidni', 'вихідні', 'vykhidni', 'the weekend', 'víkend', 'noun', { topics: ['l51'] }),
  v('v_vilnyi_chas', 'вільний час', 'vil\'nyi chas', 'free time / spare time', 'volný čas', 'phrase', { topics: ['l51'] }),

  // --- l52: Reactions & Enjoying Things ---
  v('v_vyhlyadaty', 'виглядати', 'vyhlyadaty', 'to look / to appear', 'vypadat', 'verb', { aspect: 'imperfective', topics: ['l52'] }),

  // --- l53: Asking About Family & Quantities ---
  v('v_lyudy', 'люди', 'lyudy', 'people', 'lidé', 'noun', { topics: ['l53'] }),

  // --- l54: Talking About What You've Learned ---
  v('v_vyvchyty', 'вивчити', 'vyvchyty', 'to learn / to master (a subject)', 'naučit se', 'verb', { aspect: 'perfective', topics: ['l54'] }),
  v('v_tsyoho_roku', 'цього року', 'ts\'oho roku', 'this year', 'letos / tento rok', 'phrase', { topics: ['l54'] }),
  v('v_mynuloho_roku', 'минулого року', 'mynuloho roku', 'last year', 'loni / minulý rok', 'phrase', { topics: ['l54'] }),

  // --- Wave 4 (CEFR-doc-informed): B1 grammar gaps, a dedicated connectors
  // category, idioms, and a first real C2 tier. Content and example
  // sentences cross-checked against the user-supplied "cefr levels"
  // reference document rather than invented from scratch. ---

  // --- l55: Relative Clauses (який/яка/яке/які) ---
  // Four forms of one lexeme, tracked as separate recognizable items —
  // same approach already used for l08's pishov/pishla/pishly.
  v('v_yakyi', 'який', 'yakyi', 'which / that (masc.)', 'který', 'pronoun', { gender: 'm', topics: ['l55'] }),
  v('v_yaka_rel', 'яка', 'yaka', 'which / that (fem.)', 'která', 'pronoun', { gender: 'f', topics: ['l55'] }),
  v('v_yake', 'яке', 'yake', 'which / that (neut.)', 'které', 'pronoun', { gender: 'n', topics: ['l55'] }),
  v('v_yaki', 'які', 'yaki', 'which / that (plural)', 'které', 'pronoun', { topics: ['l55'] }),

  // --- l56: Purpose Clauses & Indirect Questions (щоб, чи) ---
  v('v_shchob', 'щоб', 'shchob', 'so that / in order to', 'aby', 'conjunction', { topics: ['l56'] }),
  v('v_chy_whether', 'чи', 'chy', 'whether / if', 'zda', 'conjunction', { topics: ['l56'] }),

  // --- l57: Connectors & Cohesive Devices — a dedicated, trackable
  // category (pos: 'connector'), not scattered across adverb/phrase/
  // conjunction like l36's existing set (which gets retagged to match). ---
  v('v_tomu_shcho', 'тому що', 'tomu shcho', 'because', 'protože', 'connector', { topics: ['l57'], skills: ['connector'] }),
  v('v_cherez_tse', 'через це', 'cherez tse', 'because of this / as a result', 'kvůli tomu', 'connector', { topics: ['l57'], skills: ['connector'] }),
  v('v_z_odnoho_boku', 'з одного боку', 'z odnoho boku', 'on one hand', 'na jednu stranu', 'connector', { topics: ['l57'], skills: ['connector'] }),
  v('v_z_inshoho_boku', 'з іншого боку', 'z inshoho boku', 'on the other hand', 'na druhou stranu', 'connector', { topics: ['l57'], skills: ['connector'] }),
  v('v_naskilky_meni_vidomo', 'наскільки мені відомо', 'naskil\'ky meni vidomo', 'as far as I know', 'pokud vím', 'connector', { topics: ['l57'], skills: ['connector'] }),
  v('v_zreshtoyu', 'зрештою', 'zreshtoyu', 'ultimately / after all', 'nakonec', 'connector', { topics: ['l57'], skills: ['connector'] }),

  // --- l58: Common Idioms — a dedicated pos so it clears vocab-badges.js's
  // "10+ items" threshold and shows up as its own Vocabulary Mastered
  // category, per the user's explicit request. ---
  v('v_idiom_iceberg', 'Це лише верхівка айсберга.', 'Tse lyshe verkhivka aisberha.', 'This is only the tip of the iceberg.', 'To je jen špička ledovce.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_velosyped', 'Не варто винаходити велосипед.', 'Ne varto vynakhodyty velosyped.', 'There\'s no need to reinvent the wheel.', 'Není třeba znovu vynalézat kolo.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_hrabli', 'Ми наступаємо на ті самі граблі.', 'My nastupayemo na ti sami hrabli.', 'We are making the same mistake again.', 'Šlapeme na stejné hrábě.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_palytsya', 'Тут палиця з двома кінцями.', 'Tut palytsya z dvoma kintsyamy.', 'It\'s a double-edged sword.', 'Je to dvousečná zbraň.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_mukha_slona', 'Він любить робити з мухи слона.', 'Vin lyubyt\' robyty z mukhy slona.', 'He likes to make a mountain out of a molehill.', 'Rád dělá z komára velblouda.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_na_ruku', 'Це може зіграти нам на руку.', 'Tse mozhe zihraty nam na ruku.', 'This could work in our favor.', 'To by nám mohlo hrát do karet.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_ruka_na_pulsi', 'Вона завжди тримає руку на пульсі.', 'Vona zavzhdy trymaye ruku na pul\'si.', 'She always keeps her finger on the pulse.', 'Vždy drží prst na tepu.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_pasky', 'Доведеться затягнути паски.', 'Dovedet\'sya zatyahnuty pasky.', 'We\'ll have to tighten our belts.', 'Budeme si muset utáhnout opasky.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_slova_na_vitry', 'Він не з тих, хто кидає слова на вітер.', 'Vin ne z tykh, khto kydaye slova na viter.', 'He\'s not someone who makes empty promises.', 'Neplácá jen tak do větru.', 'idiom', { topics: ['l58'] }),
  v('v_idiom_spilna_mova', 'Вона вміє знаходити спільну мову з людьми.', 'Vona vmiye znakhodyty spil\'nu movu z lyud\'my.', 'She knows how to find common ground with people.', 'Umí najít společnou řeč s lidmi.', 'idiom', { topics: ['l58'] }),

  // --- l59: C2 Grammar Targets — Precision & Qualification ---
  v('v_za_umovy_shcho', 'за умови, що', 'za umovy, shcho', 'provided that', 'za předpokladu, že', 'connector', { topics: ['l59'], skills: ['connector'] }),
  v('v_navryad_chy', 'навряд чи', 'navryad chy', 'unlikely / hardly', 'sotva', 'connector', { topics: ['l59'], skills: ['connector'] }),
  v('v_ne_oznachaye_shcho', 'не означає, що', 'ne oznachaye, shcho', 'doesn\'t mean that', 'neznamená to, že', 'connector', { topics: ['l59'], skills: ['connector'] }),

  // --- l60: C2 Diplomacy & Hedged Argument ---
  v('v_robyty_vyhlyad', 'робити вигляд', 'robyty vyhlyad', 'to pretend / act as if', 'předstírat', 'phrase', { topics: ['l60'] }),
  v('v_vypuskaty_z_uvahy', 'випускати з уваги', 'vypuskaty z uvahy', 'to overlook / lose sight of', 'přehlížet', 'phrase', { topics: ['l60'] }),
];

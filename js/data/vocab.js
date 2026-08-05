// Vocabulary items. Each is quizzable in both directions (uk->en, en->uk) by pool.js.
// translit is a simple phonetic reading, not IPA. topics = lesson id(s) that introduce this word.
function v(id, uk, translit, en, cz, pos, extra = {}) {
  return { id, kind: 'vocab', uk, translit, en, cz, pos, gender: null, aspect: null, pairId: null, topics: [], ...extra };
}

export const VOCAB = [
  // --- l01: Diagnostic word list (exact words from the spec) ---
  v('v_voda', 'вода', 'voda', 'water', 'voda', 'noun', { gender: 'f', topics: ['l01'] }),
  v('v_ruka', 'рука', 'ruka', 'hand / arm', 'ruka', 'noun', { gender: 'f', topics: ['l01'] }),
  v('v_brat', 'брат', 'brat', 'brother', 'bratr', 'noun', { gender: 'm', topics: ['l01'] }),
  v('v_sestra', 'сестра', 'sestra', 'sister', 'sestra', 'noun', { gender: 'f', topics: ['l01'] }),
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
  v('v_odyn', 'один', 'odyn', 'one', 'jeden', 'number', { topics: ['l19'] }),
  v('v_dva', 'два', 'dva', 'two', 'dva', 'number', { topics: ['l19'] }),
  v('v_try', 'три', 'try', 'three', 'tři', 'number', { topics: ['l19'] }),
  v('v_chotyry', 'чотири', 'chotyry', 'four', 'čtyři', 'number', { topics: ['l19'] }),
  v('v_p_yat', 'п\'ять', 'p\'yat\'', 'five', 'pět', 'number', { topics: ['l19'] }),
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
  v('v_vodnochas', 'водночас', 'vodnochas', 'at the same time / simultaneously', 'zároveň', 'adverb', { topics: ['l36'] }),
  v('v_nezvazhayuchy_na', 'незважаючи на', 'nezvazhayuchy na', 'despite / in spite of', 'přes / nehledě na', 'phrase', { topics: ['l36'] }),
  v('v_khocha', 'хоча', 'khocha', 'although / though', 'ačkoliv / ač', 'conjunction', { topics: ['l36'] }),
  v('v_krim_toho', 'крім того', 'krim toho', 'besides / in addition', 'kromě toho', 'phrase', { topics: ['l36'] }),
  v('v_takym_chynom', 'таким чином', 'takym chynom', 'thus / in this way', 'tímto způsobem / tak', 'phrase', { topics: ['l36'] }),
  v('v_zokrema', 'зокрема', 'zokrema', 'in particular / particularly', 'zejména / konkrétně', 'adverb', { topics: ['l36'] }),
  v('v_vidpovidno', 'відповідно', 'vidpovidno', 'accordingly / respectively', 'odpovídajícím způsobem', 'adverb', { topics: ['l36'] }),
];

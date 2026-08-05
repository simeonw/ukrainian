// Grammar / sentence-frame cards. Quizzable exactly like vocab (uk<->en), grouped by `frame`.
function p(id, frame, uk, translit, en, cz, topics) {
  return { id, kind: 'pattern', frame, uk, translit, en, cz, pos: 'phrase', topics };
}

export const PATTERNS = [
  // --- Frame 1: Want + infinitive (Хочу + inf) — cz: "Chci + infinitiv" ---
  p('p_want_1', 'want+inf', 'Хочу бачити тебе.', 'Khochu bachyty tebe.', 'I want to see you (in general).', 'Chci tě vidět.', ['l04']),
  p('p_want_2', 'want+inf', 'Я хочу побачити тебе.', 'Ya khochu pobachyty tebe.', 'I want to see you.', 'Chci tě uvidět.', ['l04']),
  p('p_want_3', 'want+inf', 'Хочу зробити це.', 'Khochu zrobyty tse.', 'I want to do this.', 'Chci to udělat.', ['l04']),
  p('p_want_4', 'want+inf', 'Хочу поговорити з тобою.', 'Khochu pohovoryty z toboyu.', 'I want to talk with you.', 'Chci si s tebou promluvit.', ['l04']),
  p('p_want_5', 'want+inf', 'Хочу каву.', 'Khochu kavu.', 'I want (some) coffee.', 'Chci kávu.', ['l04']),

  // --- Frame 2: Can + infinitive (Можу + inf) — cz: "Můžu + infinitiv" ---
  p('p_can_1', 'can+inf', 'Можу прийти.', 'Mozhu pryyty.', 'I can come.', 'Můžu přijít.', ['l05']),
  p('p_can_2', 'can+inf', 'Можу допомогти.', 'Mozhu dopomohty.', 'I can help.', 'Můžu pomoct.', ['l05']),
  p('p_can_3', 'can+inf', 'Можу чекати.', 'Mozhu chekaty.', 'I can wait.', 'Můžu čekat.', ['l05']),
  p('p_can_4', 'can+inf', 'Можеш допомогти мені?', 'Mozhesh dopomohty meni?', 'Can you help me?', 'Můžeš mi pomoct?', ['l05']),

  // --- Frame 3: Future tense (Буду + inf) — cz: "Budu + infinitiv" ---
  p('p_future_1', 'future', 'Буду працювати.', 'Budu pratsyuvaty.', 'I will work / I will be working.', 'Budu pracovat.', ['l07']),
  p('p_future_2', 'future', 'Буду чекати.', 'Budu chekaty.', 'I will wait.', 'Budu čekat.', ['l07']),
  p('p_future_3', 'future', 'Буду говорити повільно.', 'Budu hovoryty povil\'no.', 'I will speak slowly.', 'Budu mluvit pomalu.', ['l07']),
  p('p_future_4', 'future', 'Завтра буду вдома.', 'Zavtra budu vdoma.', 'Tomorrow I will be home.', 'Zítra budu doma.', ['l07']),

  // --- Frame 4: Past tense & gender agreement — cz: "Dělal jsem. / Šel jsem." ---
  p('p_past_1', 'past', 'Я робив це вчора.', 'Ya robyv tse vchora.', 'I was doing this yesterday. (male speaker)', 'Dělal jsem to včera.', ['l08']),
  p('p_past_2', 'past', 'Вона робила це вчора.', 'Vona robyla tse vchora.', 'She was doing this yesterday.', 'Dělala to včera.', ['l08']),
  p('p_past_3', 'past', 'Я пішов додому.', 'Ya pishov dodomu.', 'I went home. (male speaker)', 'Šel jsem domů.', ['l08']),
  p('p_past_4', 'past', 'Вона пішла додому.', 'Vona pishla dodomu.', 'She went home.', 'Šla domů.', ['l08']),
  p('p_past_5', 'past', 'Вони пішли разом.', 'Vony pishly razom.', 'They went together.', 'Šli spolu.', ['l08']),

  // --- Frame 5: Conditional "would" (би) — cz: "Šel bych. / Měl bych. / Chtěl bych." ---
  p('p_cond_1', 'conditional', 'Я хотів би каву.', 'Ya khotiv by kavu.', 'I would like (some) coffee.', 'Chtěl bych kávu.', ['l10']),
  p('p_cond_2', 'conditional', 'Я пішов би завтра.', 'Ya pishov by zavtra.', 'I would go tomorrow.', 'Šel bych zítra.', ['l10']),
  p('p_cond_3', 'conditional', 'Я мав би зателефонувати.', 'Ya mav by zatelefonuvaty.', 'I should call.', 'Měl bych zavolat.', ['l10']),
  p('p_cond_4', 'conditional', 'Я хотів би поговорити з тобою.', 'Ya khotiv by pohovoryty z toboyu.', 'I would like to talk with you.', 'Chtěl bych si s tebou promluvit.', ['l10']),

  // --- Frame 6: Need / should / must — cz: "Musím jít. / Měl bych jít." ---
  p('p_need_1', 'need', 'Мушу йти.', 'Mushu yty.', 'I must go.', 'Musím jít.', ['l11']),
  p('p_need_2', 'need', 'Треба йти.', 'Treba yty.', 'One needs to go.', 'Je třeba jít.', ['l11']),
  p('p_need_3', 'need', 'Мені треба йти.', 'Meni treba yty.', 'I need to go.', 'Musím jít.', ['l11']),
  p('p_need_4', 'need', 'Я мав би піти.', 'Ya mav by pity.', 'I should go.', 'Měl bych jít.', ['l11']),
  p('p_need_5', 'need', 'Мені потрібна допомога.', 'Meni potribna dopomoha.', 'I need help.', 'Potřebuji pomoc.', ['l11']),
];

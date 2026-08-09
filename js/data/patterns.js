// Grammar / sentence-frame cards. Quizzable exactly like vocab (uk<->en), grouped by `frame`.
// skills is an array of categories like: 'vocabulary', 'grammar', 'conditional', 'past', 'understanding', 'production'
function p(id, frame, uk, translit, en, cz, topics, skills = ['grammar']) {
  return { id, kind: 'pattern', frame, uk, translit, en, cz, pos: 'phrase', topics, skills };
}

export const PATTERNS = [
  // --- Frame 1: Want + infinitive (Хочу + inf) — cz: "Chci + infinitiv" ---
  p('p_want_1', 'want+inf', 'Хочу бачити тебе.', 'Khochu bachyty tebe.', 'I want to see you (in general).', 'Chci tě vidět.', ['l04'], ['grammar', 'understanding']),
  p('p_want_2', 'want+inf', 'Я хочу побачити тебе.', 'Ya khochu pobachyty tebe.', 'I want to see you.', 'Chci tě uvidět.', ['l04'], ['grammar', 'production']),
  p('p_want_3', 'want+inf', 'Хочу зробити це.', 'Khochu zrobyty tse.', 'I want to do this.', 'Chci to udělat.', ['l04'], ['grammar', 'production']),
  p('p_want_4', 'want+inf', 'Хочу поговорити з тобою.', 'Khochu pohovoryty z toboyu.', 'I want to talk with you.', 'Chci si s tebou promluvit.', ['l04'], ['grammar', 'understanding']),
  p('p_want_5', 'want+inf', 'Хочу каву.', 'Khochu kavu.', 'I want (some) coffee.', 'Chci kávu.', ['l04'], ['grammar', 'understanding']),

  // --- Frame 2: Can + infinitive (Можу + inf) — cz: "Můžu + infinitiv" ---
  p('p_can_1', 'can+inf', 'Можу прийти.', 'Mozhu pryyty.', 'I can come.', 'Můžu přijít.', ['l05'], ['grammar', 'production']),
  p('p_can_2', 'can+inf', 'Можу допомогти.', 'Mozhu dopomohty.', 'I can help.', 'Můžu pomoct.', ['l05'], ['grammar', 'understanding']),
  p('p_can_3', 'can+inf', 'Можу чекати.', 'Mozhu chekaty.', 'I can wait.', 'Můžu čekat.', ['l05'], ['grammar', 'understanding']),
  p('p_can_4', 'can+inf', 'Можеш допомогти мені?', 'Mozhesh dopomohty meni?', 'Can you help me?', 'Můžeš mi pomoct?', ['l05'], ['grammar', 'production']),

  // --- Frame 3: Future tense (Буду + inf) — cz: "Budu + infinitiv" ---
  p('p_future_1', 'future', 'Буду працювати.', 'Budu pratsyuvaty.', 'I will work / I will be working.', 'Budu pracovat.', ['l07'], ['grammar', 'future', 'production']),
  p('p_future_2', 'future', 'Буду чекати.', 'Budu chekaty.', 'I will wait.', 'Budu čekat.', ['l07'], ['grammar', 'future', 'understanding']),
  p('p_future_3', 'future', 'Буду говорити повільно.', 'Budu hovoryty povil\'no.', 'I will speak slowly.', 'Budu mluvit pomalu.', ['l07'], ['grammar', 'future', 'understanding']),
  p('p_future_4', 'future', 'Завтра буду вдома.', 'Zavtra budu vdoma.', 'Tomorrow I will be home.', 'Zítra budu doma.', ['l07'], ['grammar', 'future', 'production']),

  // --- Frame 4: Past tense & gender agreement — cz: "Dělal jsem. / Šel jsem." ---
  p('p_past_1', 'past', 'Я робив це вчора.', 'Ya robyv tse vchora.', 'I was doing this yesterday. (male speaker)', 'Dělal jsem to včera.', ['l08'], ['past', 'understanding']),
  p('p_past_2', 'past', 'Вона робила це вчора.', 'Vona robyla tse vchora.', 'She was doing this yesterday.', 'Dělala to včera.', ['l08'], ['past', 'understanding']),
  p('p_past_3', 'past', 'Я пішов додому.', 'Ya pishov dodomu.', 'I went home. (male speaker)', 'Šel jsem domů.', ['l08'], ['past', 'production']),
  p('p_past_4', 'past', 'Вона пішла додому.', 'Vona pishla dodomu.', 'She went home.', 'Šla domů.', ['l08'], ['past', 'production']),
  p('p_past_5', 'past', 'Вони пішли разом.', 'Vony pishly razom.', 'They went together.', 'Šli spolu.', ['l08'], ['past', 'understanding']),

  // --- Frame 5: Conditional "would" (би) — cz: "Šel bych. / Měl bych. / Chtěl bych." ---
  p('p_cond_1', 'conditional', 'Я хотів би каву.', 'Ya khotiv by kavu.', 'I would like (some) coffee.', 'Chtěl bych kávu.', ['l10'], ['conditional', 'production']),
  p('p_cond_2', 'conditional', 'Я пішов би завтра.', 'Ya pishov by zavtra.', 'I would go tomorrow.', 'Šel bych zítra.', ['l10'], ['conditional', 'production']),
  p('p_cond_3', 'conditional', 'Я мав би зателефонувати.', 'Ya mav by zatelefonuvaty.', 'I should call.', 'Měl bych zavolat.', ['l10'], ['conditional', 'understanding']),
  p('p_cond_4', 'conditional', 'Я хотів би поговорити з тобою.', 'Ya khotiv by pohovoryty z toboyu.', 'I would like to talk with you.', 'Chtěl bych si s tebou promluvit.', ['l10'], ['conditional', 'understanding']),

  // --- Frame 6: Need / should / must — cz: "Musím jít. / Měl bych jít." ---
  p('p_need_1', 'need', 'Мушу йти.', 'Mushu yty.', 'I must go.', 'Musím jít.', ['l11'], ['grammar', 'obligation', 'production']),
  p('p_need_2', 'need', 'Треба йти.', 'Treba yty.', 'One needs to go.', 'Je třeba jít.', ['l11'], ['grammar', 'obligation', 'understanding']),
  p('p_need_3', 'need', 'Мені треба йти.', 'Meni treba yty.', 'I need to go.', 'Musím jít.', ['l11'], ['grammar', 'obligation', 'production']),
  p('p_need_4', 'need', 'Я мав би піти.', 'Ya mav by pity.', 'I should go.', 'Měl bych jít.', ['l11'], ['grammar', 'obligation', 'understanding']),
  p('p_need_5', 'need', 'Мені потрібна допомога.', 'Meni potribna dopomoha.', 'I need help.', 'Potřebuji pomoc.', ['l11'], ['grammar', 'obligation', 'production']),

  // --- B1 level expansion patterns ---
  p('p_b1_done_1', 'b1_narrative', 'Я вже прочитав цю книгу.', 'Ya vzhe prochytav tsyu knyhu.', 'I have already read this book.', 'Už jsem přečetl tuto knihu.', ['l21'], ['past', 'understanding']),
  p('p_b1_never_1', 'b1_narrative', 'Я ніколи не був в Україні.', 'Ya nikoly ne buv v Ukrayini.', 'I have never been to Ukraine.', 'Nikdy jsem nebyl na Ukrajině.', ['l21'], ['past', 'production']),
  p('p_b1_when_1', 'b1_narrative', 'Коли я був молодший, я багато подорожував.', 'Koly ya buv molodshyi, ya bahato podorozhuvav.', 'When I was younger, I travelled a lot.', 'Když jsem byl mladší, hodně jsem cestoval.', ['l21'], ['past', 'understanding']),
  p('p_b1_thing_1', 'b1_explanation', 'Справа в тому, що я не мав достатньо часу.', 'Sprava v tomu, shcho ya ne mav dostatno chasu.', 'The thing is that I didn\'t have enough time.', 'Jde o to, že jsem neměl dost času.', ['l22'], ['understanding']),
  p('p_b1_reason_1', 'b1_explanation', 'Причина полягає в тому, що я був зайнятий.', 'Prychyna polyahaye v tomu, shcho ya buv zainiatyi.', 'The reason is that I was busy.', 'Důvod spočívá v tom, že jsem byl zaneprázdněn.', ['l22'], ['understanding']),
  p('p_b1_compare_1', 'b1_comparing', 'На відміну від Чехії, в Україні тепло.', 'Na vidminu vid Chekhiyi, v Ukrayini teplo.', 'Unlike Czechia, in Ukraine it is warm.', 'Na rozdíl od Česka je na Ukrajině teplo.', ['l23'], ['understanding']),
  p('p_b1_compare_2', 'b1_comparing', 'Порівняно з минулим роком, все добре.', 'Porivnyano z mynulym rokom, vse dobre.', 'Compared with last year, everything is good.', 'Ve srovnání s minulým rokem je vše v pořádku.', ['l23'], ['understanding']),

  // --- B2 level expansion patterns ---
  p('p_b2_opinion_1', 'b2_opinion', 'Я вважаю, що це хороша ідея.', 'Ya vazhayu, shcho tse khorosha ideya.', 'I believe that this is a good idea.', 'Považuji to za dobrý nápad.', ['l24'], ['production']),
  p('p_b2_opinion_2', 'b2_opinion', 'З моєї точки зору, це дуже важливо.', 'Z moyeyi tochky zoru, tse duzhe vazhlyvo.', 'From my point of view, this is very important.', 'Z mého pohledu je to velmi důležité.', ['l24'], ['understanding']),
  p('p_b2_opinion_3', 'b2_opinion', 'Наскільки мені відомо, це питання ще не вирішене.', 'Naskilky meni vidomo, tse pytannya shche ne vyrishene.', 'As far as I know, this question is not resolved yet.', 'Pokud vím, tato otázka ještě není vyřešena.', ['l24'], ['understanding']),
  p('p_b2_agree_1', 'b2_agree', 'Я частково погоджуюся, але маю сумніви.', 'Ya chastkovo pohodzhuyusya, ale mayu sumnivy.', 'I partly agree, but I have doubts.', 'Částečně souhlasím, ale mám pochybnosti.', ['l25'], ['production']),
  p('p_b2_agree_2', 'b2_agree', 'Я розумію вашу думку, однак не згоден.', 'Ya rozumiyu vashu dumku, odnak ne zhoden.', 'I understand your point, however I do not agree.', 'Rozumím vašemu názoru, nicméně nesouhlasím.', ['l25'], ['understanding']),
  p('p_b2_agree_3', 'b2_agree', 'Не зовсім погоджуюся з цим рішенням.', 'Ne zovsim pohodzhuyusya z tsym rishennyam.', 'I do not completely agree with this decision.', 'Úplně s tímto rozhodnutím nesouhlasím.', ['l25'], ['production']),
  p('p_b2_hypo_1', 'b2_hypothetical', 'Якби я мав більше часу, я б вивчив українську швидше.', 'Yakby ya mav bilshe chasu, ya b vyvchyv ukrayinsku shvydshe.', 'If I had more time, I would have learned Ukrainian faster.', 'Kdybych měl více času, naučil bych se ukrajinsky rychleji.', ['l26'], ['conditional', 'production']),
  p('p_b2_hypo_2', 'b2_hypothetical', 'Якби ситуація була іншою, ми могли б зробити інакше.', 'Yakby sytuatsiya bula inshoyu, my mohly b zrobyty inakshe.', 'If the situation were different, we could do otherwise.', 'Kdyby byla situace jiná, mohli bychom to udělat jinak.', ['l26'], ['conditional', 'understanding']),
  p('p_b2_speech_1', 'b2_speech', 'Він сказав, що прийде завтра.', 'Vin skazav, shcho pryyde zavtra.', 'He said that he will come tomorrow.', 'Řekl, že přijde zítra.', ['l27'], ['understanding']),
  p('p_b2_speech_2', 'b2_speech', 'Вона пояснила, чому не могла прийти.', 'Vona poyasnyla, chomu ne mohla pryyty.', 'She explained why she couldn\'t come.', 'Vysvětlila, proč nemohla přijít.', ['l27'], ['understanding']),

  // --- C1 level expansion patterns ---
  p('p_c1_nuance_1', 'c1_nuance', 'Наскільки я розумію, це нова версія.', 'Naskilky ya rozumiyu, tse nova versiya.', 'As far as I understand, this is a new version.', 'Pokud tomu dobře rozumím, jedná se o novou verzi.', ['l28'], ['understanding']),
  p('p_c1_nuance_2', 'c1_nuance', 'У певному сенсі, він правий.', 'U pevnomu sensi, vin pravyi.', 'In a certain sense, he is right.', 'V jistém smyslu má pravdu.', ['l28'], ['understanding']),
  p('p_c1_nuance_3', 'c1_nuance', 'Не можна заперечувати, що це успіх.', 'Ne mozhna zaperechyty, shcho tse uspikh.', 'It cannot be denied that this is a success.', 'Nelze popřít, že je to úspěch.', ['l28'], ['understanding']),
  p('p_c1_nuance_4', 'c1_nuance', 'Варто зазначити, що правила змінилися.', 'Varto zaznachyty, shcho pravyla zminylysya.', 'It is worth noting that the rules have changed.', 'Stojí za zmínku, že se pravidla změnila.', ['l28'], ['understanding']),
  p('p_c1_arg_1', 'c1_argumentation', 'З одного боку, це хороше рішення, з іншого боку, воно створює нові проблеми.', 'Z odnoho boku, tse khoroshe rishennya, z inshoho boku, vono stvoryuye novi problemy.', 'On one hand, this is a good decision, on the other hand, it creates new problems.', 'Na jednu stranu je to dobré rozhodnutí, na druhou stranu vytváří nové problémy.', ['l29'], ['understanding']),
  p('p_c1_arg_2', 'c1_argumentation', 'Головна проблема полягає в тому, що бракує ресурсів.', 'Holovna problema polyahaye v tomu, shcho brakuje resursiv.', 'The main problem is that there is a lack of resources.', 'Hlavní problém spočívá v tom, že chybí zdroje.', ['l29'], ['understanding']),
  p('p_c1_arg_3', 'c1_argumentation', 'Я не стільки заперечую це, скільки вважаю, що час ще не настав.', 'Ya ne stilky zaperechuyu tse, skilky vazhayu, shcho chas shche ne nastav.', 'I do not so much disagree with this as I think that the time has not yet come.', 'Ani ne tak to popírám, jako spíše si myslím, že ještě nenastal čas.', ['l29'], ['understanding']),
  p('p_c1_cons_1', 'c1_consequences', 'Це призвело до того, що ми запізнилися.', 'Tse pryzvelo do toho, shcho my zapiznylysya.', 'This led to the fact that we were late.', 'To vedlo k tomu, že jsme se opozdili.', ['l30'], ['understanding']),
  p('p_c1_cons_2', 'c1_consequences', 'У результаті, проект був успішним.', 'U rezultati, proekt buv uspishnym.', 'As a result, the project was successful.', 'Ve výsledku byl projekt úspěšný.', ['l30'], ['understanding']),
  p('p_c1_cons_3', 'c1_consequences', 'Через це ситуація стала складнішою.', 'Cherez tse sytuatsiya stala skladnishoyu.', 'Because of this, the situation became more complex.', 'Kvůli tomu se situace stala složitější.', ['l30'], ['understanding']),
  p('p_c1_time_1', 'c1_time', 'До того моменту, коли я приїхав, вони вже все закінчили.', 'Do toho momentu, koly ya pryyiv, vony vzhe vse zakinchyly.', 'By the time I arrived, they had already finished everything.', 'Do chvíle, než jsem dorazil, už všechno dokončili.', ['l31'], ['past', 'understanding']),
  p('p_c1_time_2', 'c1_time', 'Після того як ми поговорили, стало легше.', 'Pislya toho yak my pohovoryly, stalo lehshe.', 'After we talked, it became easier.', 'Poté, co jsme si promluvili, se nám ulevilo.', ['l31'], ['past', 'understanding']),
  p('p_c1_time_3', 'c1_time', 'Перед тим як прийняти рішення, подумай.', 'Pered tym yak pryynyaty rishennya, podumay.', 'Before making a decision, think.', 'Předtím než se rozhodneš, popřemýšlej.', ['l31'], ['production']),
  p('p_c1_abs_1', 'c1_abstract', 'Я думаю, що технології змінили спосіб, у який люди спілкуються.', 'Ya dumayu, shcho tekhnolohiyi zminyly sposib, u yakyi lyudy spilkuyutsya.', 'I think that technologies changed the way in which people communicate.', 'Myslím, že technologie změnily způsob, jakým lidé komunikují.', ['l32'], ['understanding']),
  p('p_c1_abs_2', 'c1_abstract', 'Однією з головних проблем сучасного світу є глобальне потепління.', 'Odniyeyu z holovnykh problem suchasnoho svitu ye hlobalne poteplinnya.', 'One of the main problems of the modern world is global warming.', 'Jedním z hlavních problémů současného světa je globální oteplování.', ['l32'], ['understanding']),

  // --- C1 Challenge Sentences (Specifically for adaptive testing) ---
  p('p_c1_challenge_1', 'c1_challenge', 'Якби я знав тоді те, що знаю зараз, я б прийняв зовсім інше рішення.', 'Yakby ya znav todi te, shcho znayu zaraz, ya b pryynyav zovsim inshe rishennya.', 'If I had known then what I know now, I would have made a completely different decision.', 'Kdybych tehdy věděl to, co vím teď, přijal bych zcela jiné rozhodnutí.', ['l37'], ['conditional', 'production']),
  p('p_c1_challenge_2', 'c1_challenge', 'Незважаючи на те, що ситуація була складною, нам вдалося знайти рішення, яке задовольнило всіх.', 'Nezvazhayuchy na te, shcho sytuatsiya bula skladnoyu, nam vdalosya znayty rishennya, yake zadovolnylo vsikh.', 'Despite the situation being difficult, we managed to find a solution that satisfied everyone.', 'Navzdory tomu, že situace byla složitá, se nám podařilo najít řešení, které uspokojilo všechny.', ['l37'], ['past', 'understanding']),
  p('p_c1_challenge_3', 'c1_challenge', 'Мені здається, що головна проблема полягає не в самій ситуації, а в тому, як люди її сприймають.', 'Meni zdayetsya, shcho holovna problema polyahaye ne v samiy sytuatsiyi, a v tomu, yak lyudy yiyi spryymayut.', 'It seems to me that the main problem is not the situation itself, but how people perceive it.', 'Zdá se mi, že hlavní problém nespočívá v situaci samotné, ale v tom, jak ji lidé vnímají.', ['l37'], ['understanding']),
  p('p_c1_challenge_4', 'c1_challenge', 'З одного боку, технології значно спростили наше життя, однак з іншого боку вони створили нові виклики.', 'Z odnoho boku, tekhnolohiyi znachno sprostyly nashe zhyttya, odnak z inshoho boku vony stvoryly novi vyklyky.', 'On one hand technology simplified our lives, but on the other hand it created new challenges.', 'Na jednu stranu technologie výrazně zjednodušily náš život, nicméně na druhou stranu vytvořily nové výzvy.', ['l37'], ['understanding']),
  p('p_c1_challenge_5', 'c1_challenge', 'Не можна заперечувати, що мова змінюється під впливом суспільства, у якому вона використовується.', 'Ne mozhna zaperechyty, shcho mova zminyyetsya pid vplyvom suspilstva, u yakomu vona vykorystovuyetsya.', 'It cannot be denied that language changes under the influence of the society in which it is used.', 'Nelze popřít, že jazyk se mění pod vlivem společnosti, ve které se používá.', ['l37'], ['understanding']),

  // --- l45: Dative case (мені/тобі/... + impersonal predicate) ---
  p('p_dative_1', 'dative', 'Мені холодно.', 'Meni kholodno.', 'I am cold.', 'Je mi zima.', ['l45'], ['dative', 'production']),
  p('p_dative_2', 'dative', 'Йому важко це зробити.', 'Yomu vazhko tse zrobyty.', 'It is hard for him to do this.', 'Je pro něj těžké to udělat.', ['l45'], ['dative', 'understanding']),
  p('p_dative_3', 'dative', 'Їй сумно.', 'Yiy sumno.', 'She feels sad.', 'Je jí smutno.', ['l45'], ['dative', 'production']),
  p('p_dative_4', 'dative', 'Мені хочеться кави.', 'Meni khochet\'sya kavy.', 'I feel like having coffee.', 'Mám chuť na kávu.', ['l45'], ['dative', 'production']),

  // --- l46: Reflexive -ся verbs ---
  p('p_reflexive_1', 'reflexive', 'Я вчуся української.', 'Ya vchusya ukrayins\'koyi.', 'I am learning Ukrainian.', 'Učím se ukrajinsky.', ['l46'], ['reflexive', 'production']),
  p('p_reflexive_2', 'reflexive', 'Я боюся павуків.', 'Ya boyusya pavukiv.', 'I am afraid of spiders.', 'Bojím se pavouků.', ['l46'], ['reflexive', 'understanding']),
  p('p_reflexive_3', 'reflexive', 'Я сподіваюся, що все буде добре.', 'Ya spodivayusya, shcho vse bude dobre.', 'I hope that everything will be fine.', 'Doufám, že vše bude dobré.', ['l46'], ['reflexive', 'understanding']),

  // --- l47: Days of the week ---
  p('p_days_1', 'days', 'Сьогодні понеділок.', 'S\'ohodni ponedilok.', 'Today is Monday.', 'Dnes je pondělí.', ['l47'], ['understanding']),
  p('p_days_2', 'days', 'У суботу я відпочиваю.', 'U subotu ya vidpochyvayu.', 'On Saturday I rest.', 'V sobotu odpočívám.', ['l47'], ['production']),

  // --- l48: More everyday verbs ---
  p('p_everyday_1', 'everyday_verbs', 'Я хочу подорожувати.', 'Ya khochu podorozhuvaty.', 'I want to travel.', 'Chci cestovat.', ['l48'], ['production']),
  p('p_everyday_2', 'everyday_verbs', 'Тримай це, будь ласка.', 'Trymay tse, bud\' laska.', 'Hold this, please.', 'Podrž to, prosím.', ['l48'], ['understanding']),

  // --- l49: Home & everyday objects ---
  p('p_home_1', 'home', 'Де туалет?', 'De tualet?', 'Where is the toilet?', 'Kde je záchod?', ['l49'], ['production']),
  p('p_home_2', 'home', 'Мій одяг у шафі.', 'Miy odyah u shafi.', 'My clothes are in the wardrobe.', 'Moje oblečení je ve skříni.', ['l49'], ['understanding']),

  // --- l50: Czech/Russian false-friend caution ---
  p('p_falsefriend_1', 'false_friend', 'Я їм борщ.', 'Ya yim borshch.', 'I am eating borscht.', 'Jím boršč.', ['l50'], ['understanding']),
  p('p_falsefriend_2', 'false_friend', 'Що ти дивишся?', 'Shcho ty dyvyshsya?', 'What are you watching?', 'Co se díváš?', ['l50'], ['reflexive', 'understanding']),

  // --- l51: Hobbies & Free Time (любити + infinitive) ---
  p('p_hobby_1', 'like+inf', 'Я люблю плавати.', 'Ya lyublyu plavaty.', 'I like to swim.', 'Rád/a plavu.', ['l51'], ['grammar', 'production']),
  p('p_hobby_2', 'like+inf', 'Що ти любиш робити на вихідних?', 'Shcho ty lyubysh robyty na vykhidnykh?', 'What do you like to do at the weekend?', 'Co rád/a děláš o víkendu?', ['l51'], ['grammar', 'understanding']),
  p('p_hobby_3', 'like+inf', 'Що ти любиш робити у вільний час?', 'Shcho ty lyubysh robyty u vil\'nyi chas?', 'What do you like to do in your spare time?', 'Co rád/a děláš ve volném čase?', ['l51'], ['grammar', 'understanding']),
  p('p_hobby_4', 'like+inf', 'Ти любиш відвідувати музей?', 'Ty lyubysh vidviduvaty muzey?', 'Do you like to visit the museum?', 'Rád/a navštěvuješ muzeum?', ['l51'], ['grammar', 'understanding']),

  // --- l52: Reactions & Enjoying Things ---
  p('p_react_1', 'react', 'Це виглядає важко.', 'Tse vyhlyadaye vazhko.', 'That looks hard.', 'To vypadá těžce.', ['l52'], ['dative', 'understanding']),
  p('p_react_2', 'react', 'Я насолоджуюся цим.', 'Ya nasolodzhuyusya tsym.', 'I am enjoying this.', 'Užívám si to.', ['l52'], ['reflexive', 'production']),

  // --- l53: Asking About Family & Quantities ---
  p('p_quantity_1', 'quantity', 'Скільки людей у твоїй сім\'ї?', 'Skil\'ky lyudei u tvoyii sim\'yi?', 'How many people are in your family? (How big is your family?)', 'Kolik lidí je ve vaší rodině?', ['l53'], ['production']),

  // --- l54: Talking About What You've Learned ---
  p('p_learn_1', 'learn', 'Що ти вивчив цього року?', 'Shcho ty vyvchyv ts\'oho roku?', 'What have you learnt this year? (male speaker)', 'Co ses letos naučil?', ['l54'], ['past', 'understanding']),
  p('p_learn_2', 'learn', 'Я вивчила багато цього року.', 'Ya vyvchyla bahato ts\'oho roku.', 'I learned a lot this year. (female speaker)', 'Letos jsem se hodně naučila.', ['l54'], ['past', 'production']),

  // --- l55: Relative clauses (який/яка/яке/які) — verified against the
  // user's CEFR reference doc's B1 block rather than invented. ---
  p('p_rel_1', 'relative', 'Я зайшов у маленьке кафе, яке випадково знайшов.', 'Ya zayshov u malen\'ke kafe, yake vypadkovo znayshov.', 'I went into a small café that I happened to find.', 'Zašel jsem do malé kavárny, kterou jsem náhodou našel.', ['l55'], ['grammar', 'understanding']),
  p('p_rel_2', 'relative', 'Мені подобається працювати з людьми, які відкрито висловлюють свою думку.', 'Meni podobayet\'sya pratsyuvaty z lyud\'my, yaki vidkryto vyslovlyuyut\' svoyu dumku.', 'I like working with people who openly express their opinions.', 'Rád/a pracuji s lidmi, kteří otevřeně vyjadřují svůj názor.', ['l55'], ['grammar', 'understanding']),
  p('p_rel_3', 'relative', 'Напевно, концерт, на який я ходив минулого року.', 'Napevno, kontsert, na yakyi ya khodyv mynuloho roku.', 'Probably the concert I went to last year.', 'Asi ten koncert, na který jsem šel loni.', ['l55'], ['grammar', 'past', 'understanding']),

  // --- l56: Purpose clauses (щоб) & indirect questions (чи) ---
  p('p_purpose_1', 'purpose', 'Іноді я записую нові слова, щоб не забути їх.', 'Inodi ya zapysuyu novi slova, shchob ne zabuty yikh.', 'Sometimes I write down new words so I don\'t forget them.', 'Někdy si zapisuju nová slova, abych je nezapomněl/a.', ['l56'], ['grammar', 'production']),
  p('p_purpose_2', 'purpose', 'Тепер, щоб його вимкнути, мені доводиться вставати.', 'Teper, shchob yoho vymknuty, meni dovodyt\'sya vstavaty.', 'Now, to turn it off, I have to get up.', 'Teď, abych to vypnul/a, musím vstát.', ['l56'], ['grammar', 'understanding']),
  p('p_indirect_1', 'indirect_q', 'Зараз я намагаюся зрозуміти, чи є в ній щось корисне.', 'Zaraz ya namahayusya zrozumity, chy ye v niy shchos\' korysne.', 'Now I try to understand whether there is anything useful in it.', 'Teď se snažím pochopit, jestli je v tom něco užitečného.', ['l56'], ['grammar', 'understanding']),
  p('p_indirect_2', 'indirect_q', 'Коли в мене багато справ, я часто не знаю, з чого почати.', 'Koly v mene bahato sprav, ya chasto ne znayu, z choho pochaty.', 'When I have a lot to do, I often don\'t know where to start.', 'Když mám hodně práce, často nevím, kde začít.', ['l56'], ['grammar', 'understanding']),

  // --- l57: Connectors & cohesive devices ---
  p('p_conn_1', 'connector', 'Я спізнився, тому що затримався на роботі.', 'Ya spiznyvsya, tomu shcho zatrymavsya na roboti.', 'I was late because I got held up at work.', 'Přišel jsem pozdě, protože jsem se zdržel v práci.', ['l57'], ['connector', 'past', 'production']),
  p('p_conn_2', 'connector', 'З одного боку, це добре, з іншого боку — складно.', 'Z odnoho boku, tse dobre, z inshoho boku — skladno.', 'On one hand it\'s good, on the other hand it\'s difficult.', 'Na jednu stranu je to dobré, na druhou stranu složité.', ['l57'], ['connector', 'understanding']),
  p('p_conn_3', 'connector', 'Наскільки мені відомо, він уже виїхав.', 'Naskil\'ky meni vidomo, vin uzhe vyyikhav.', 'As far as I know, he has already left.', 'Pokud vím, už odjel.', ['l57'], ['connector', 'past', 'understanding']),

  // --- l59: C2 grammar targets — precision & qualification ---
  p('p_c2_qual_1', 'c2_qualification', 'З цим можна погодитися лише за умови, що ми приймаємо певні припущення.', 'Z tsym mozhna pohodytysya lyshe za umovy, shcho my pryymayemo pevni prypushchennya.', 'One can agree with this only if we accept certain assumptions.', 'S tím lze souhlasit jen za předpokladu, že přijmeme určité domněnky.', ['l59'], ['connector', 'understanding']),
  p('p_c2_qual_2', 'c2_qualification', 'Я не проти, але за умови, що ми заздалегідь домовимося про деталі.', 'Ya ne proty, ale za umovy, shcho my zazdalehid\' domovymosya pro detali.', 'I don\'t mind, provided that we agree on the details beforehand.', 'Nevadí mi to, ale za předpokladu, že se předem domluvíme na detailech.', ['l59'], ['connector', 'understanding']),
  p('p_c2_qual_3', 'c2_qualification', 'Якщо ми нічого не змінимо, ситуація навряд чи покращиться.', 'Yakshcho my nichoho ne zminymo, sytuatsiya navryad chy pokrashchyt\'sya.', 'If we don\'t change anything, the situation is unlikely to improve.', 'Pokud nic nezměníme, situace se stěží zlepší.', ['l59'], ['connector', 'conditional', 'understanding']),
  p('p_c2_qual_4', 'c2_qualification', 'Це не означає, що потрібно відмовлятися від власних переконань.', 'Tse ne oznachaye, shcho potribno vidmovlyatysya vid vlasnykh perekonan\'.', 'This doesn\'t mean you have to abandon your own beliefs.', 'To neznamená, že se musíme vzdát vlastního přesvědčení.', ['l59'], ['connector', 'understanding']),

  // --- l60: C2 diplomacy & hedged argument ---
  p('p_c2_dipl_1', 'c2_diplomacy', 'З одного боку, я тебе розумію, а з іншого — маю певні сумніви.', 'Z odnoho boku, ya tebe rozumiyu, a z inshoho — mayu pevni sumnivy.', 'On the one hand, I understand you, but on the other, I have some doubts.', 'Na jednu stranu ti rozumím, na druhou mám určité pochybnosti.', ['l60'], ['connector', 'production']),
  p('p_c2_dipl_2', 'c2_diplomacy', 'Давай не будемо робити вигляд, ніби нічого не сталося.', 'Davay ne budemo robyty vyhlyad, niby nichoho ne stalosya.', 'Let\'s not pretend that nothing happened.', 'Nedělejme, že se nic nestalo.', ['l60'], ['past', 'production']),
  p('p_c2_dipl_3', 'c2_diplomacy', 'Мені здається, ти трохи випускаєш із уваги головне.', 'Meni zdayet\'sya, ty trokhy vypuskayesh iz uvahy holovne.', 'I think you\'re overlooking the main point somewhat.', 'Zdá se mi, že trochu přehlížíš to hlavní.', ['l60'], ['dative', 'understanding']),
  p('p_c2_dipl_4', 'c2_diplomacy', 'Зрештою, кожен має право на власну думку, але це не означає, що всі думки однаково обґрунтовані.', 'Zreshtoyu, kozhen maye pravo na vlasnu dumku, ale tse ne oznachaye, shcho vsi dumky odnakovo obgruntovani.', 'Ultimately, everyone has the right to their own opinion, but that doesn\'t mean all opinions are equally well-founded.', 'Nakonec má každý právo na svůj vlastní názor, ale to neznamená, že všechny názory jsou stejně opodstatněné.', ['l60'], ['connector', 'understanding']),
];

// Advanced sentences for the Ukrainian learning system.
// Categorized by levels (1 to 5) and containing rich metadata for exercises.

export const ADVANCED_SENTENCES = [
  // --- LEVEL 1: Single pattern ---
  {
    id: "adv_l1_1",
    level: 1,
    uk: "Я хотів би поговорити з вами.",
    translit: "Ya khotiv by pohovoryty z vamy.",
    en: "I would like to talk with you.",
    cz: "Chtěl bych si s vámi promluvit.",
    czBridgeExplanation: "This works almost the same way as Czech: 'хотів би' is exactly 'chtěl bych', and 'з вами' is 's vámi'. Note how Ukrainian uses 'би' as a conditional particle just like Czech 'by'.",
    acceptedEnglish: [
      "i would like to talk with you",
      "i'd like to speak with you",
      "i would like to speak to you",
      "i want to talk with you",
      "i'd love to talk to you"
    ],
    words: [
      {
        word: "хотів",
        options: [
          { text: "wanted / would like", correct: true },
          { text: "was able to", correct: false },
          { text: "needed to", correct: false },
          { text: "tried to", correct: false }
        ],
        grammar: "Past masculine form of хотіти (to want).",
        related: [
          "хочу = I want",
          "хотів би = I would like (masculine)",
          "хотіла б = I would like (feminine)"
        ]
      },
      {
        word: "поговорити",
        options: [
          { text: "to talk / speak", correct: true },
          { text: "to listen", correct: false },
          { text: "to read", correct: false },
          { text: "to write", correct: false }
        ],
        grammar: "Perfective infinitive form of говорити (to speak/talk), showing a completed or focused conversation.",
        related: [
          "говорю = I speak (ongoing)",
          "поговоримо = we will talk"
        ]
      }
    ],
    builderWords: ["Я", "хотів", "би", "поговорити", "з", "вами"],
    variations: [
      {
        description: "Change to feminine speaker:",
        original: ["Я", "хотів", "би"],
        replacement: ["Я", "хотіла", "б"],
        resultUk: "Я хотіла б поговорити з вами."
      },
      {
        description: "Change to plural speaker (We would like):",
        original: ["Я", "хотів", "би"],
        replacement: ["Ми", "хотіли", "б"],
        resultUk: "Ми хотіли б поговорити з вами."
      }
    ],
    reverseUkrainianAlternatives: [
      "я хотів би поговорити з вами",
      "я хотіла б поговорити з вами",
      "хотів би поговорити з вами",
      "хотіла б поговорити з вами",
      "я б хотів поговорити з вами",
      "я б хотіла поговорити з вами"
    ]
  },
  {
    id: "adv_l1_2",
    level: 1,
    uk: "Я міг би допомогти завтра.",
    translit: "Ya mih by dopomohty zavtra.",
    en: "I could help tomorrow.",
    cz: "Mohl bych pomoct zítra.",
    czBridgeExplanation: "This matches Czech structure exactly: 'міг би' is 'mohl bych', 'допомогти' is 'pomoct', and 'завтра' is 'zítra'.",
    acceptedEnglish: [
      "i could help tomorrow",
      "i would be able to help tomorrow",
      "i can help tomorrow",
      "i might be able to help tomorrow"
    ],
    words: [
      {
        word: "міг",
        options: [
          { text: "could / was able to", correct: true },
          { text: "wanted to", correct: false },
          { text: "needed to", correct: false },
          { text: "tried to", correct: false }
        ],
        grammar: "Past masculine of могти (to be able to).",
        related: [
          "можу = I can",
          "міг = could",
          "міг би = could (conditional)"
        ]
      }
    ],
    builderWords: ["Я", "міг", "би", "допомогти", "завтра"],
    variations: [
      {
        description: "Change to feminine speaker:",
        original: ["Я", "міг", "би"],
        replacement: ["Я", "могла", "б"],
        resultUk: "Я могла б допомогти завтра."
      },
      {
        description: "Change to plural (We could help):",
        original: ["Я", "міг", "би"],
        replacement: ["Ми", "могли", "б"],
        resultUk: "Ми могли б допомогти завтра."
      }
    ],
    reverseUkrainianAlternatives: [
      "я міг би допомогти завтра",
      "я могла б допомогти завтра",
      "міг би допомогти завтра",
      "могла б допомогти завтра",
      "я б міг допомогти завтра",
      "я б могла допомогти завтра"
    ]
  },

  // --- LEVEL 2: Two patterns ---
  {
    id: "adv_l2_1",
    level: 2,
    uk: "Я хочу прийти, але не можу.",
    translit: "Ya khochu pryyty, ale ne mozhu.",
    en: "I want to come, but I can't.",
    cz: "Chci přijít, ale nemůžu.",
    czBridgeExplanation: "Direct structural comparison: 'Я хочу' (Chci), 'прийти' (přijít), 'але' (ale), 'не можу' (nemůžu). No helper verbs needed, identical logic.",
    acceptedEnglish: [
      "i want to come but i cannot",
      "i want to come but i can't",
      "i would like to come but i can't",
      "i wish to come but i am unable to"
    ],
    words: [
      {
        word: "хочу",
        options: [
          { text: "want", correct: true },
          { text: "can", correct: false },
          { text: "must", correct: false },
          { text: "will", correct: false }
        ],
        grammar: "First-person singular present of хотіти.",
        related: [
          "хочеш = you want",
          "хоче = he/she wants"
        ]
      },
      {
        word: "можу",
        options: [
          { text: "can / am able", correct: true },
          { text: "want", correct: false },
          { text: "work", correct: false },
          { text: "wait", correct: false }
        ],
        grammar: "First-person singular present of могти.",
        related: [
          "можеш = you can",
          "може = he/she can"
        ]
      }
    ],
    builderWords: ["Я", "хочу", "прийти", "але", "не", "можу"],
    variations: [
      {
        description: "Change pronouns to 'We' (We want to come, but cannot):",
        original: ["Я", "хочу", "можу"],
        replacement: ["Ми", "хочемо", "можемо"],
        resultUk: "Ми хочемо прийти, але не можемо."
      },
      {
        description: "Change pronouns to 'You' (You want to come, but cannot):",
        original: ["Я", "хочу", "можу"],
        replacement: ["Ти", "хочеш", "можеш"],
        resultUk: "Ти хочеш прийти, але не можеш."
      }
    ],
    reverseUkrainianAlternatives: [
      "я хочу прийти але не можу",
      "хочу прийти але не можу",
      "хочу прийти але я не можу"
    ]
  },
  {
    id: "adv_l2_2",
    level: 2,
    uk: "Я прийду, якщо буду мати час.",
    translit: "Ya pryydu, yakshcho budu maty chas.",
    en: "I will come if I have time.",
    cz: "Přijdu, když budu mít čas.",
    czBridgeExplanation: "Matches Czech: 'Я прийду' is future perfective 'přijdu'. 'якщо' means 'if/když'. 'буду мати' is analytical future 'budu mít'. 'час' is 'čas'.",
    acceptedEnglish: [
      "i will come if i have time",
      "i'll come if i have time",
      "i will come if i'll have time",
      "i can come if i have some time"
    ],
    words: [
      {
        word: "прийду",
        options: [
          { text: "I will come", correct: true },
          { text: "I am coming", correct: false },
          { text: "I came", correct: false },
          { text: "I would come", correct: false }
        ],
        grammar: "First-person singular future of perfective прийти (to come).",
        related: [
          "прийшов = arrived (masculine)",
          "приходжу = I come (imperfective)"
        ]
      },
      {
        word: "якщо",
        options: [
          { text: "if", correct: true },
          { text: "because", correct: false },
          { text: "but", correct: false },
          { text: "when", correct: false }
        ],
        grammar: "Conditional conjunction introducing a clause.",
        related: [
          "коли = when",
          "тому що = because"
        ]
      }
    ],
    builderWords: ["Я", "прийду", "якщо", "буду", "мати", "час"],
    variations: [
      {
        description: "Negate it (I won't come if I don't have time):",
        original: ["Я", "прийду", "буду"],
        replacement: ["Я", "не прийду", "не буду"],
        resultUk: "Я не прийду, якщо не буду мати час."
      }
    ],
    reverseUkrainianAlternatives: [
      "я прийду якщо буду мати час",
      "прийду якщо буду мати час",
      "я прийду якщо матиму час",
      "прийду якщо матиму час"
    ]
  },

  // --- LEVEL 3: Multiple clauses ---
  {
    id: "adv_l3_1",
    level: 3,
    uk: "Хочу прийти, але не можу, тому що працюю.",
    translit: "Khochu pryyty, ale ne mozhu, tomu shcho pratsyuyu.",
    en: "I want to come, but I can't because I am working.",
    cz: "Chci přijít, ale nemůžu, protože pracuji.",
    czBridgeExplanation: "This adds the sub-clause of reason: 'тому що' translates to Czech 'protože'. Grammatically identical phrasing.",
    acceptedEnglish: [
      "i want to come but i cannot because i am working",
      "i want to come but i can't because i'm working",
      "i want to come but i can't because i work",
      "i would like to come but i can't as i am working"
    ],
    words: [
      {
        word: "тому що",
        options: [
          { text: "because", correct: true },
          { text: "therefore", correct: false },
          { text: "if", correct: false },
          { text: "although", correct: false }
        ],
        grammar: "Compound causal conjunction.",
        related: [
          "бо = because (shorter)",
          "через те що = due to the fact that"
        ]
      },
      {
        word: "працюю",
        options: [
          { text: "I work / am working", correct: true },
          { text: "I wait / am waiting", correct: false },
          { text: "I help / am helping", correct: false },
          { text: "I do / am doing", correct: false }
        ],
        grammar: "First-person singular present of працювати (to work).",
        related: [
          "працюєш = you work",
          "працював = worked"
        ]
      }
    ],
    builderWords: ["Хочу", "прийти", "але", "не", "можу", "тому", "що", "працюю"],
    variations: [
      {
        description: "Substitute 'тому що' with shorter 'бо':",
        original: ["тому", "що"],
        replacement: ["бо"],
        resultUk: "Хочу прийти, але не можу, бо працюю."
      },
      {
        description: "Substitute 'працюю' with 'я зайнятий' (I am busy):",
        original: ["працюю"],
        replacement: ["я", "зайнятий"],
        resultUk: "Хочу прийти, але не можу, тому що я зайнятий."
      }
    ],
    reverseUkrainianAlternatives: [
      "хочу прийти але не можу тому що працюю",
      "я хочу прийти але не можу тому що працюю",
      "хочу прийти але не можу бо працюю",
      "я хочу прийти але не можу бо працюю"
    ]
  },
  {
    id: "adv_l3_2",
    level: 3,
    uk: "Я не зміг прийти вчора, тому що був дуже зайнятий.",
    translit: "Ya ne zmih pryyty vchora, tomu shcho buv duzhe zainiatyi.",
    en: "I couldn't come yesterday because I was very busy.",
    cz: "Nemohl jsem přijít včera, protože jsem byl velmi zaneprázdněný.",
    czBridgeExplanation: "Notice how Ukrainian drops the Czech auxiliary verb 'jsem' in the past tense: 'я не зміг' is 'nemohl jsem', 'був' is 'byl jsem'. Highly parallel adjectives and logic.",
    acceptedEnglish: [
      "i couldn't come yesterday because i was very busy",
      "i was unable to come yesterday because i was very busy",
      "i could not make it yesterday because i was extremely busy",
      "i couldn't come yesterday as i was really busy"
    ],
    words: [
      {
        word: "зміг",
        options: [
          { text: "was able to / managed to", correct: true },
          { text: "wanted to", correct: false },
          { text: "needed to", correct: false },
          { text: "tried to", correct: false }
        ],
        grammar: "Past masculine of змогти (perfective 'to manage to/be able to').",
        related: [
          "можу = I can",
          "міг = could (imperfective)",
          "зможу = I will be able to"
        ]
      },
      {
        word: "зайнятий",
        options: [
          { text: "busy / occupied", correct: true },
          { text: "tired", correct: false },
          { text: "sick", correct: false },
          { text: "happy", correct: false }
        ],
        grammar: "Masculine adjective.",
        related: [
          "зайнята = busy (feminine)",
          "зайняті = busy (plural)"
        ]
      }
    ],
    builderWords: ["Я", "не", "зміг", "прийти", "вчора", "тому", "що", "був", "дуже", "зайнятий"],
    variations: [
      {
        description: "Change to feminine speaker:",
        original: ["зміг", "був", "зайнятий"],
        replacement: ["змогла", "була", "зайнята"],
        resultUk: "Я не змогла прийти вчора, тому що була дуже зайнята."
      },
      {
        description: "Use shorter 'бо' instead of 'тому що':",
        original: ["тому", "що"],
        replacement: ["бо"],
        resultUk: "Я не зміг прийти вчора, бо був дуже зайнятий."
      }
    ],
    reverseUkrainianAlternatives: [
      "я не зміг прийти вчора тому що був дуже зайнятий",
      "я не змогла прийти вчора тому що була дуже зайнята",
      "не зміг прийти вчора тому що був дуже зайнятий",
      "не змогла прийти вчора тому що була дуже зайнята",
      "я не зміг прийти вчора бо був дуже зайнятий",
      "я не змогла прийти вчора бо була дуже зайнята"
    ]
  },

  // --- LEVEL 4: Natural conversation ---
  {
    id: "adv_l4_1",
    level: 4,
    uk: "Я хотів би прийти завтра, але не впевнений, чи матиму час.",
    translit: "Ya khotiv by pryyty zavtra, ale ne vpevnenyi, chy matymu chas.",
    en: "I would like to come tomorrow, but I'm not sure if I will have time.",
    cz: "Chtěl bych přijít zítra, ale nejsem si jistý, jestli budu mít čas.",
    czBridgeExplanation: "Compare: 'не впевнений' is 'nejsem si jistý'. 'чи матиму час' uses the question particle 'чи' (jestli) and synthetic future form 'матиму' (budu mít).",
    acceptedEnglish: [
      "i would like to come tomorrow but i'm not sure if i will have time",
      "i'd like to come tomorrow but i am not sure if i'll have time",
      "i'd love to come tomorrow but i'm not sure whether i will have time",
      "i want to come tomorrow but i am not certain if i have time"
    ],
    words: [
      {
        word: "впевнений",
        options: [
          { text: "sure / confident / certain", correct: true },
          { text: "happy", correct: false },
          { text: "busy", correct: false },
          { text: "ready", correct: false }
        ],
        grammar: "Masculine adjective.",
        related: [
          "впевнена = sure (feminine)",
          "впевнені = sure (plural)"
        ]
      },
      {
        word: "матиму",
        options: [
          { text: "I will have", correct: true },
          { text: "I have", correct: false },
          { text: "I had", correct: false },
          { text: "I would have", correct: false }
        ],
        grammar: "Synthetic future of мати (to have) - alternative to 'буду мати'.",
        related: [
          "матимеш = you will have",
          "матиме = he/she will have"
        ]
      },
      {
        word: "чи",
        options: [
          { text: "if / whether / or", correct: true },
          { text: "because", correct: false },
          { text: "when", correct: false },
          { text: "that", correct: false }
        ],
        grammar: "Conjunction / interrogative particle.",
        related: [
          "чи ні = or not"
        ]
      }
    ],
    builderWords: ["Я", "хотів", "би", "прийти", "завтра", "але", "не", "впевнений", "чи", "матиму", "час"],
    variations: [
      {
        description: "Change to feminine speaker:",
        original: ["хотів", "впевнений"],
        replacement: ["хотіла", "впевнена"],
        resultUk: "Я хотіла б прийти завтра, але не впевнена, чи матиму час."
      },
      {
        description: "Replace synthetic 'матиму' with analytical 'буду мати':",
        original: ["матиму"],
        replacement: ["буду", "мати"],
        resultUk: "Я хотів би прийти завтра, але не впевнений, чи буду мати час."
      }
    ],
    reverseUkrainianAlternatives: [
      "я хотів би прийти завтра але не впевнений чи матиму час",
      "я хотіла б прийти завтра але не впевнена чи матиму час",
      "хотів би прийти завтра але не впевнений чи матиму час",
      "хотіла б прийти завтра але не впевнена чи матиму час",
      "я хотів би прийти завтра але не впевнений чи буду мати час",
      "я хотіла б прийти завтра але не впевнена чи буду мати час"
    ]
  },
  {
    id: "adv_l4_2",
    level: 4,
    uk: "Я працював, коли ти мені написав.",
    translit: "Ya pratsyuvav, koly ty meni napysav.",
    en: "I was working when you wrote to me.",
    cz: "Pracoval jsem, když jsi mi napsal.",
    czBridgeExplanation: "This demonstrates imperfective ongoing past ('працював' = pracoval) and perfective punctual past ('написав' = napsal). Same logic of aspect as Czech.",
    acceptedEnglish: [
      "i was working when you wrote to me",
      "i worked when you wrote me",
      "i was working when you texted me",
      "i was working when you sent me a message"
    ],
    words: [
      {
        word: "працював",
        options: [
          { text: "was working (masculine)", correct: true },
          { text: "worked (feminine)", correct: false },
          { text: "will work", correct: false },
          { text: "am working", correct: false }
        ],
        grammar: "Past masculine imperfective of працювати.",
        related: [
          "працювала = was working (feminine)",
          "працювали = were working"
        ]
      },
      {
        word: "написав",
        options: [
          { text: "wrote / finished writing (masculine)", correct: true },
          { text: "was writing", correct: false },
          { text: "will write", correct: false },
          { text: "write", correct: false }
        ],
        grammar: "Past masculine perfective of написати.",
        related: [
          "писав = was writing (imperfective)",
          "написала = wrote (feminine)"
        ]
      }
    ],
    builderWords: ["Я", "працював", "коли", "ти", "мені", "написав"],
    variations: [
      {
        description: "Change to feminine speaker:",
        original: ["працював"],
        replacement: ["працювала"],
        resultUk: "Я працювала, коли ти мені написав."
      },
      {
        description: "Change to feminine writer (when you wrote - female):",
        original: ["написав"],
        replacement: ["написала"],
        resultUk: "Я працював, коли ти мені написала."
      }
    ],
    reverseUkrainianAlternatives: [
      "я працював коли ти мені написав",
      "я працювала коли ти мені написав",
      "я працював коли ти мені написала",
      "я працювала коли ти мені написала",
      "працював коли ти мені написав",
      "працювала коли ти мені написав"
    ]
  },

  // --- LEVEL 5: Real native-like communication ---
  {
    id: "adv_l5_1",
    level: 5,
    uk: "Я б із задоволенням прийшов завтра, якби не мав стільки роботи.",
    translit: "Ya b iz zadovolennyam pryishov zavtra, yakby ne mav stilky roboty.",
    en: "I would gladly come tomorrow if I didn't have so much work.",
    cz: "Přišel bych zítra rád, kdybych neměl tolik práce.",
    czBridgeExplanation: "This uses advanced conditional structures: 'якби' is 'kdyby', and 'із задоволенням' is 's radostí / s potěšením / rád'. It perfectly maps to Czech conditional syntax.",
    acceptedEnglish: [
      "i would gladly come tomorrow if i didn't have so much work",
      "i would come tomorrow with pleasure if i didn't have so much work",
      "i'd love to come tomorrow if i didn't have so much work",
      "i would come tomorrow gladly if i didn't have this much work"
    ],
    words: [
      {
        word: "із задоволенням",
        options: [
          { text: "with pleasure / gladly", correct: true },
          { text: "unfortunately", correct: false },
          { text: "hopefully", correct: false },
          { text: "by accident", correct: false }
        ],
        grammar: "Adverbial phrase (preposition із + instrumental noun задоволення).",
        related: [
          "задоволений = satisfied"
        ]
      },
      {
        word: "якби",
        options: [
          { text: "if / in case (counterfactual conditional)", correct: true },
          { text: "because", correct: false },
          { text: "when", correct: false },
          { text: "although", correct: false }
        ],
        grammar: "Counterfactual conditional conjunction.",
        related: [
          "якби не = if it weren't for / if not for"
        ]
      },
      {
        word: "стільки",
        options: [
          { text: "so much / so many", correct: true },
          { text: "little", correct: false },
          { text: "some", correct: false },
          { text: "enough", correct: false }
        ],
        grammar: "Pronoun/numeral governing genitive case.",
        related: [
          "роботи = work (genitive of робота)"
        ]
      }
    ],
    builderWords: ["Я", "б", "із", "задоволенням", "прийшов", "завтра", "якби", "не", "мав", "стільки", "роботи"],
    variations: [
      {
        description: "Change to feminine speaker:",
        original: ["прийшов", "мав"],
        replacement: ["прийшла", "мала"],
        resultUk: "Я б із задоволенням прийшла завтра, якби не мала стільки роботи."
      }
    ],
    reverseUkrainianAlternatives: [
      "я б із задоволенням прийшов завтра якби не мав стільки роботи",
      "я б із задоволенням прийшла завтра якби не мала стільки роботи",
      "я б з задоволенням прийшов завтра якби не мав стільки роботи",
      "я б з задоволенням прийшла завтра якби не мала стільки роботи",
      "із задоволенням прийшов би завтра якби не мав стільки роботи",
      "із задоволенням прийшла б завтра якби не мала стільки роботи"
    ]
  }
];

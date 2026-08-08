// Content for the 5 calibration tracks. This is the one file that's genuinely
// Ukrainian-specific in the calibration system — js/core/calibration.js and
// js/ui/calibration-ui.js don't know or care what language this is.
import { LESSONS } from './lessons.js';
import { DIAGNOSTIC_WORD_IDS } from './diagnostic.js';
import { getAllItems } from '../core/pool.js';
import { getSkillsForItem } from '../core/skills.js';
import { seedFromDiagnostic } from '../core/srs.js';
import { markLessonCompleted, markFastTrackEligible } from '../core/completion.js';
import { seedSkillRetention } from '../core/retention.js';
import { TIER_MAX } from '../core/calibration.js';

const CEFR_TIERS = ['beginner', 'b1', 'b2', 'c1'];
// tier 0-1 -> beginner, 2-3 -> b1, 4-5 -> b2, 6-7 -> c1 (see calibration.js's 8-rung scale)
export function cefrForTier(tier) {
  return CEFR_TIERS[Math.floor(tier / 2)];
}

const LESSON_ORDER_BY_ID = new Map(LESSONS.map((l) => [l.id, l.order]));
// Boundaries shifted +7 when l21-l27 (new beginner/A2 vocab lessons) were
// inserted before the old B1 band — each band keeps its original width
// (b1: 3 lessons, b2: 4 lessons, c1: everything after) just moved later.
function cefrForLessonOrder(order) {
  if (order <= 27) return 'beginner';
  if (order <= 30) return 'b1';
  if (order <= 34) return 'b2';
  return 'c1';
}

// -------------------- Track 1 & 2: comprehension (with / without transliteration) --------------------
// Same underlying sentence pool; the "without transliteration" track just renders
// it with translit hidden, so the gap between the two tracks' estimates IS the
// "does this person need the crutch" signal, measured directly instead of inferred.
const COMPREHENSION_POOL = {
  beginner: [
    { uk: 'Мені потрібна допомога.', translit: 'Meni potribna dopomoha.', en: 'I need help.', distractors: ['I am busy today.', 'Can you wait here?', 'I want to see you tomorrow.'] },
    { uk: 'Хочу замовити каву.', translit: 'Khochu zamovyty kavu.', en: 'I want to order coffee.', distractors: ['Where is the station?', 'I have a big problem.', 'Do you want some tea?'] },
    { uk: 'Де знаходиться вокзал?', translit: 'De znakhodytsya vokzal?', en: 'Where is the train station?', distractors: ['How much does it cost?', 'Can you help me?', 'I am at the airport.'] },
    { uk: 'Мене звати Симеон.', translit: 'Mene zvaty Symeon.', en: 'My name is Simeon.', distractors: ['Nice to meet you.', 'What is your name?', 'How are things today?'] },
  ],
  b1: [
    { uk: 'Я ніколи не був в Україні.', translit: 'Ya nikoly ne buv v Ukrayini.', en: 'I have never been to Ukraine.', distractors: ['I already read this book.', 'When I was younger, I travelled.', 'I should go home now.'] },
    { uk: 'Справа в тому, що я не мав часу.', translit: 'Sprava v tomu, shcho ya ne mav chasu.', en: "The thing is that I didn't have time.", distractors: ['The reason is that I was busy.', 'Compared with last year, everything is fine.', 'Unlike Czechia, it is warm here.'] },
    { uk: 'Коли я був молодший, я багато подорожував.', translit: 'Koly ya buv molodshyi, ya bahato podorozhuvav.', en: 'When I was younger, I travelled a lot.', distractors: ['I would like to see you tomorrow.', 'I was working when you wrote me.', 'The reason is that I had a lot of work.'] },
    { uk: 'Порівняно з минулим роком, все добре.', translit: 'Porivnyano z mynulym rokom, vse dobre.', en: 'Compared with last year, everything is good.', distractors: ['Unlike Czechia, everything is expensive.', 'The thing is that I had no choice.', 'I should have checked this yesterday.'] },
  ],
  b2: [
    { uk: 'Якби я мав більше часу, я б вивчив українську швидше.', translit: 'Yakby ya mav bilshe chasu, ya b vyvchyv ukrayinsku shvydshe.', en: 'If I had more time, I would have learned Ukrainian faster.', distractors: ['I would go home if I was tired.', "The thing is that I didn't have enough time.", 'If the situation was different, we could help.'] },
    { uk: 'Я вважаю, що це хороша ідея.', translit: 'Ya vazhayu, shcho tse khorosha ideya.', en: 'I believe that this is a good idea.', distractors: ['From my point of view, it is too late.', 'As far as I know, this is resolved.', 'I understand your point, but I disagree.'] },
    { uk: 'Він сказав, що прийде завтра.', translit: 'Vin skazav, shcho pryyde zavtra.', en: 'He said that he will come tomorrow.', distractors: ['She explained why she could not come.', 'He thought that this is a bad idea.', 'They said that they already left.'] },
    { uk: 'Я частково погоджуюся, але маю сумніви.', translit: 'Ya chastkovo pohodzhuyusya, ale mayu sumnivy.', en: 'I partly agree, but I have doubts.', distractors: ['I understand your point, however I disagree.', 'I do not completely agree with this decision.', 'I believe we should make another choice.'] },
  ],
  c1: [
    { uk: 'Якби я знав тоді те, що знаю зараз, я б прийняв зовсім інше рішення.', translit: 'Yakby ya znav todi te, shcho znayu zaraz, ya b pryynyav zovsim inshe rishennya.', en: 'If I had known then what I know now, I would have made a completely different decision.', distractors: ['Despite the situation being difficult, we found a decision.', 'On one hand technology simplified our lives, on the other hand it created challenges.', 'It cannot be denied that language changes under the influence of society.'] },
    { uk: 'Незважаючи на те, що ситуація була складною, нам вдалося знайти рішення.', translit: 'Nezvazhayuchy na te, shcho sytuatsiya bula skladnoyu, nam vdalosya znayty rishennya.', en: 'Despite the situation being difficult, we managed to find a solution.', distractors: ['It seems to me that the main problem is not the situation.', 'This led to the fact that we were late for the meeting.', 'By the time I arrived, they already finished.'] },
    { uk: 'З одного боку, це хороше рішення, з іншого боку, воно створює проблеми.', translit: 'Z odnoho boku, tse khoroshe rishennya, z inshoho boku, vono stvoryuye problemy.', en: 'On one hand, this is a good decision, on the other hand, it creates problems.', distractors: ['The main problem is that there is a lack of resources.', 'I do not so much disagree with this as I think it is early.', 'Before making a decision, you should think.'] },
    { uk: 'Не можна заперечувати, що мова змінюється під впливом суспільства.', translit: 'Ne mozhna zaperechyty, shcho mova zminyyetsya pid vplyvom suspilstva.', en: 'It cannot be denied that language changes under the influence of society.', distractors: ['It is worth noting that the rules have changed recently.', 'In a certain sense, he is completely correct.', 'I think that technology changed the way we talk.'] },
  ],
};

function pickComprehensionQuestion(tier, usedUks) {
  const pool = COMPREHENSION_POOL[cefrForTier(tier)];
  const available = pool.filter((q) => !usedUks.has(q.uk));
  const from = available.length ? available : pool;
  return from[Math.floor(Math.random() * from.length)];
}

// -------------------- Track 3: Cyrillic decoding --------------------
// Pure grapheme-to-sound: "which of these is the correct reading of <uk word>?"
// Reuses existing vocab/pattern items (they already carry uk+translit); the only
// new logic needed is generating plausible near-miss WRONG transliterations.
const NEAR_MISS_RULES = [
  (s) => s.replace(/kh/g, 'h'),
  (s) => s.replace(/h/g, 'kh'),
  (s) => s.replace(/y/g, 'i'),
  (s) => s.replace(/i/g, 'y'),
  (s) => s.replace(/ch/g, 'sh'),
  (s) => s.replace(/sh/g, 'ch'),
  (s) => s.replace(/ts/g, 'tz'),
  (s) => s.replace(/'/g, ''),
  (s) => s.replace(/shch/g, 'sch'),
  (s) => s.replace(/([aeiouy])\1/g, '$1'), // drop a doubled vowel
];

function generateTranslitDistractors(correctTranslit, n = 3) {
  const correctLower = correctTranslit.toLowerCase();
  const seen = new Set([correctLower]);
  const out = [];
  const shuffledRules = [...NEAR_MISS_RULES].sort(() => Math.random() - 0.5);
  for (const rule of shuffledRules) {
    if (out.length >= n) break;
    const candidate = rule(correctTranslit);
    const key = candidate.toLowerCase();
    if (key !== correctLower && !seen.has(key)) {
      seen.add(key);
      out.push(candidate);
    }
  }
  // Fallback for short words where the rules above can't produce enough distinct
  // variants: letter-swap, then (if that's exhausted too, e.g. 1-2 char words)
  // append a trailing letter. Bounded attempt count — this must never hang.
  const FILLER_LETTERS = 'aeiouklmnprst';
  let attempts = 0;
  while (out.length < n && attempts < 50) {
    attempts += 1;
    const chars = correctTranslit.split('');
    let candidate;
    if (chars.length >= 2) {
      const i = Math.floor(Math.random() * chars.length);
      const j = Math.floor(Math.random() * chars.length);
      if (i === j) continue;
      [chars[i], chars[j]] = [chars[j], chars[i]];
      candidate = chars.join('');
    } else {
      candidate = correctTranslit + FILLER_LETTERS[attempts % FILLER_LETTERS.length];
    }
    const key = candidate.toLowerCase();
    if (key !== correctLower && !seen.has(key)) {
      seen.add(key);
      out.push(candidate);
    }
  }
  // Absolute last resort (degenerate 1-char input exhausting even the filler
  // loop): guarantee n distinct outputs by appending an index marker.
  let guard = 0;
  while (out.length < n) {
    const candidate = `${correctTranslit}${FILLER_LETTERS[guard % FILLER_LETTERS.length]}${guard}`;
    if (candidate.toLowerCase() !== correctLower) out.push(candidate);
    guard += 1;
  }
  return out.slice(0, n);
}

function tierForContentItem(item) {
  const orders = (item.topics || []).map((id) => LESSON_ORDER_BY_ID.get(id)).filter((o) => o !== undefined);
  const maxOrder = orders.length ? Math.max(...orders) : 1;
  return cefrForLessonOrder(maxOrder);
}

let DECODING_POOL_CACHE = null;
function getDecodingPool() {
  if (DECODING_POOL_CACHE) return DECODING_POOL_CACHE;
  const byTier = { beginner: [], b1: [], b2: [], c1: [] };
  for (const item of getAllItems()) {
    if (!item.uk || !item.translit || item.uk.split(' ').length > 1) continue; // single words read best for pure decoding
    byTier[tierForContentItem(item)].push(item);
  }
  DECODING_POOL_CACHE = byTier;
  return byTier;
}

function pickDecodingQuestion(tier, usedIds) {
  const pool = getDecodingPool()[cefrForTier(tier)];
  const source = pool.length ? pool : getAllItems();
  const available = source.filter((i) => !usedIds.has(i.id));
  const item = (available.length ? available : source)[Math.floor(Math.random() * (available.length ? available.length : source.length))];
  return { id: item.id, uk: item.uk, correctTranslit: item.translit, distractors: generateTranslitDistractors(item.translit) };
}

// -------------------- Track 4: verb morphology (person) --------------------
const PERSON_LABELS = { I: 'I', you: 'you (informal)', heSheIt: 'he / she / it', we: 'we', youPl: 'you (formal / plural)', they: 'they' };

const VERB_POOL = {
  beginner: [
    { verb: 'робити', verbEn: 'to do', forms: { I: ['роблю', 'roblyu'], you: ['робиш', 'robysh'], heSheIt: ['робить', "robyt'"], we: ['робимо', 'robymo'], youPl: ['робите', 'robyte'], they: ['роблять', "roblyat'"] } },
    { verb: 'мати', verbEn: 'to have', forms: { I: ['маю', 'mayu'], you: ['маєш', "mayesh"], heSheIt: ['має', 'maye'], we: ['маємо', 'mayemo'], youPl: ['маєте', 'mayete'], they: ['мають', "mayut'"] } },
    { verb: 'хотіти', verbEn: 'to want', forms: { I: ['хочу', 'khochu'], you: ['хочеш', 'khochesh'], heSheIt: ['хоче', 'khoche'], we: ['хочемо', 'khochemo'], youPl: ['хочете', 'khochete'], they: ['хочуть', "khochut'"] } },
  ],
  b1: [
    { verb: 'читати', verbEn: 'to read', forms: { I: ['читаю', 'chytayu'], you: ['читаєш', 'chytayesh'], heSheIt: ['читає', 'chytaye'], we: ['читаємо', 'chytayemo'], youPl: ['читаєте', 'chytayete'], they: ['читають', "chytayut'"] } },
    { verb: 'розуміти', verbEn: 'to understand', forms: { I: ['розумію', 'rozumiyu'], you: ['розумієш', 'rozumiyesh'], heSheIt: ['розуміє', 'rozumiye'], we: ['розуміємо', 'rozumiyemo'], youPl: ['розумієте', 'rozumiyete'], they: ['розуміють', "rozumiyut'"] } },
    { verb: 'подорожувати', verbEn: 'to travel', forms: { I: ['подорожую', 'podorozhuyu'], you: ['подорожуєш', 'podorozhuyesh'], heSheIt: ['подорожує', 'podorozhuye'], we: ['подорожуємо', 'podorozhuyemo'], youPl: ['подорожуєте', 'podorozhuyete'], they: ['подорожують', "podorozhuyut'"] } },
  ],
  b2: [
    { verb: 'вважати', verbEn: 'to consider / believe', forms: { I: ['вважаю', 'vazhayu'], you: ['вважаєш', 'vazhayesh'], heSheIt: ['вважає', 'vazhaye'], we: ['вважаємо', 'vazhayemo'], youPl: ['вважаєте', 'vazhayete'], they: ['вважають', "vazhayut'"] } },
    { verb: 'погоджуватися', verbEn: 'to agree', forms: { I: ['погоджуюся', 'pohodzhuyusya'], you: ['погоджуєшся', 'pohodzhuyeshsya'], heSheIt: ['погоджується', 'pohodzhuyetsya'], we: ['погоджуємося', 'pohodzhuyemosya'], youPl: ['погоджуєтеся', 'pohodzhuyetesya'], they: ['погоджуються', 'pohodzhuyutsya'] } },
  ],
  c1: [
    { verb: 'заперечувати', verbEn: 'to deny / object', forms: { I: ['заперечую', 'zaperechuyu'], you: ['заперечуєш', 'zaperechuyesh'], heSheIt: ['заперечує', 'zaperechuye'], we: ['заперечуємо', 'zaperechuyemo'], youPl: ['заперечуєте', 'zaperechuyete'], they: ['заперечують', "zaperechuyut'"] } },
    { verb: 'спілкуватися', verbEn: 'to communicate', forms: { I: ['спілкуюся', 'spilkuyusya'], you: ['спілкуєшся', 'spilkuyeshsya'], heSheIt: ['спілкується', 'spilkuyetsya'], we: ['спілкуємося', 'spilkuyemosya'], youPl: ['спілкуєтеся', 'spilkuyetesya'], they: ['спілкуються', 'spilkuyutsya'] } },
  ],
};

// usedCombos: Set of "verb:person" strings already asked this session — unlike
// the comprehension/decoding tracks, this one had no dedup at all before,
// so the exact same verb+person combo could repeat within a session.
function pickVerbPersonQuestion(tier, usedCombos) {
  const pool = VERB_POOL[cefrForTier(tier)];
  const combos = pool.flatMap((verb) => Object.keys(verb.forms).map((person) => ({ verb, person })));
  const available = usedCombos ? combos.filter((c) => !usedCombos.has(`${c.verb.verb}:${c.person}`)) : combos;
  const source = available.length ? available : combos;
  const { verb, person: correctPerson } = source[Math.floor(Math.random() * source.length)];
  const [uk, translit] = verb.forms[correctPerson];
  const persons = Object.keys(verb.forms);
  const distractorPersons = persons.filter((p) => p !== correctPerson).sort(() => Math.random() - 0.5).slice(0, 3);
  return {
    uk,
    translit,
    correctAnswer: PERSON_LABELS[correctPerson],
    distractors: distractorPersons.map((p) => PERSON_LABELS[p]),
    comboKey: `${verb.verb}:${correctPerson}`,
  };
}

// -------------------- Track 5: noun case --------------------
// Only cases whose form is distinct from the nominative are used as "correct"
// answers here — for these inanimate nouns, accusative is identical in form to
// nominative, which would make a decontextualized single-word MC question
// genuinely ambiguous rather than testing real case knowledge.
const CASE_LABELS = {
  nominative: 'Nominative (називний)',
  genitive: 'Genitive (родовий)',
  dative: 'Dative (давальний)',
  accusative: 'Accusative (знахідний)',
  instrumental: 'Instrumental (орудний)',
  locative: 'Locative (місцевий)',
  vocative: 'Vocative (кличний)',
};
const ALL_CASES = Object.keys(CASE_LABELS);

const NOUN_POOL = {
  beginner: { case: 'genitive', nouns: [{ noun: 'рука', form: 'руки', translit: 'ruky' }, { noun: 'книга', form: 'книги', translit: 'knyhy' }] },
  b1: { case: 'instrumental', nouns: [{ noun: 'стіл', form: 'столом', translit: 'stolom' }, { noun: 'книга', form: 'книгою', translit: 'knyhoyu' }] },
  b2: { case: 'locative', nouns: [{ noun: 'рука', form: 'руці', translit: 'rutsi' }, { noun: 'вікно', form: 'вікні', translit: 'vikni' }] },
  c1: { case: 'vocative', nouns: [{ noun: 'рука', form: 'руко', translit: 'ruko' }, { noun: 'книга', form: 'книго', translit: 'knyho' }] },
};

function pickNounCaseQuestion(tier, usedNouns) {
  const bucket = NOUN_POOL[cefrForTier(tier)];
  const available = usedNouns ? bucket.nouns.filter((n) => !usedNouns.has(n.noun)) : bucket.nouns;
  const source = available.length ? available : bucket.nouns;
  const pick = source[Math.floor(Math.random() * source.length)];
  const distractors = ALL_CASES.filter((c) => c !== bucket.case).sort(() => Math.random() - 0.5).slice(0, 3);
  return {
    uk: pick.form,
    translit: pick.translit,
    correctAnswer: CASE_LABELS[bucket.case],
    comboKey: pick.noun,
    distractors: distractors.map((c) => CASE_LABELS[c]),
  };
}

// -------------------- Public track registry --------------------
export const CALIBRATION_TRACKS = [
  { id: 'comprehension', label: 'Comprehension', showTranslit: true, kind: 'sentence', pick: (tier, used) => pickComprehensionQuestion(tier, used) },
  { id: 'comprehensionNoTranslit', label: 'Reading without transliteration', showTranslit: false, kind: 'sentence', pick: (tier, used) => pickComprehensionQuestion(tier, used) },
  { id: 'cyrillicDecoding', label: 'Cyrillic decoding', showTranslit: false, kind: 'decoding', pick: (tier, used) => pickDecodingQuestion(tier, used) },
  { id: 'verbPerson', label: 'Verb morphology', showTranslit: true, kind: 'grammar', pick: (tier, used) => pickVerbPersonQuestion(tier, used) },
  { id: 'nounCase', label: 'Noun case', showTranslit: true, kind: 'grammar', pick: (tier, used) => pickNounCaseQuestion(tier, used) },
];

// -------------------- Applying results --------------------
// Bridges calibration output into item seeding and lesson Completion. Item
// confidence is seeded via seedFromDiagnostic (a floor only, never overwrites
// real drill progress). Unlocking is never touched directly here — calibration
// only ever writes through the same Completion currency Phase 2's exercise
// sets use, by pre-completing lessons the calibrated level has already cleared.
function levelCodeForCefr(cefr) {
  if (cefr === 'c1') return 'advanced';
  if (cefr === 'beginner') return 'beginner';
  return 'intermediate'; // b1 or b2
}

function seedSkillFromTrack(progress, trackResult, skills, count = 4) {
  if (!trackResult) return;
  const levelCode = levelCodeForCefr(cefrForTier(trackResult.tier));
  const candidates = getAllItems().filter((item) => {
    const itemSkills = getSkillsForItem(item);
    return skills.some((s) => itemSkills.includes(s));
  });
  const picked = candidates.sort(() => Math.random() - 0.5).slice(0, count);
  for (const item of picked) {
    seedFromDiagnostic(progress, item.id, 'uk2en', levelCode);
    seedFromDiagnostic(progress, item.id, 'en2uk', levelCode);
  }
}

// Flags every lesson whose CEFR band is strictly BELOW the calibrated level as
// fast-track eligible — i.e. only bands the learner has demonstrably cleared,
// not the boundary band itself (that's exactly where the binary search left
// them "shaky," per calibration.js's worked example). This unlocks the same
// as full Completion (see srs.js getUnlockedLessons) but does NOT mark the
// lesson done: a multiple-choice placement test is real evidence for
// prioritizing what to show first, but a handful of MC questions can be
// solved from partial word recognition without full comprehension — not
// strong enough evidence to grant a lesson as mastered outright. The learner
// still has to pass a short (3-item) confirm set, same principle as any other
// lesson, just faster. The diagnostic lesson itself (l01) is the one genuine
// exception — calibration directly replaces it, so it's marked Completed,
// not fast-tracked; there's nothing left to separately confirm.
function preCompleteLessonsBelowCefr(progress, achievedCefr) {
  const achievedIdx = CEFR_TIERS.indexOf(achievedCefr);
  for (const lesson of LESSONS) {
    if (lesson.kind === 'diagnostic') {
      markLessonCompleted(progress, lesson.id, 'calibration');
      continue;
    }
    if (CEFR_TIERS.indexOf(cefrForLessonOrder(lesson.order)) < achievedIdx) {
      markFastTrackEligible(progress, lesson.id, 'calibration');
    }
  }
}

// trackResults: output of calibration.js's getSessionResults(), i.e. { [trackId]: { tier, soft } }
export function applyCalibrationResults(progress, trackResults) {
  // The two reading tracks share one underlying pool; take whichever the
  // learner did WORSE on (usually without transliteration) as the honest
  // overall placement, rather than letting transliteration support inflate it.
  const comprehensionTier = Math.min(
    trackResults.comprehension?.tier ?? 0,
    trackResults.comprehensionNoTranslit?.tier ?? 0
  );
  const overallCefr = cefrForTier(comprehensionTier);
  const levelCode = levelCodeForCefr(overallCefr);

  for (const id of DIAGNOSTIC_WORD_IDS) {
    seedFromDiagnostic(progress, id, 'uk2en', levelCode);
    seedFromDiagnostic(progress, id, 'en2uk', levelCode);
  }

  // The grammar tracks get to seed real grammar-tagged items too, so the
  // Ability Profile reflects verb/case performance specifically, not just
  // a single collapsed CEFR number driving the unlock decision.
  seedSkillFromTrack(progress, trackResults.verbPerson, ['grammar', 'past']);
  seedSkillFromTrack(progress, trackResults.nounCase, ['grammar']);

  // Seed core/retention.js's rolling windows so ordinary Drill practice
  // refines an informed starting point instead of cold-starting every
  // category at zero — one continuous signal from onboarding onward, per
  // Phase 3. Only skills a track genuinely tests get seeded; calibration
  // doesn't test 'production' or 'conditional' directly, so those are left
  // for real practice to establish rather than inventing a signal.
  seedSkillRetention(progress, 'understanding', comprehensionTier / TIER_MAX);
  seedSkillRetention(progress, 'vocabulary', comprehensionTier / TIER_MAX);
  const grammarTiers = [trackResults.verbPerson?.tier, trackResults.nounCase?.tier].filter((t) => t !== undefined);
  if (grammarTiers.length) {
    const avgGrammarTier = grammarTiers.reduce((a, b) => a + b, 0) / grammarTiers.length;
    seedSkillRetention(progress, 'grammar', avgGrammarTier / TIER_MAX);
  }

  preCompleteLessonsBelowCefr(progress, overallCefr);

  // Phase 4's transliteration-weaning prompt needs a durable "can this person
  // read without the crutch" read, not just this session's transient result —
  // comprehensionNoTranslit tests whole-sentence reading, cyrillicDecoding
  // tests raw grapheme decoding; both are direct without-transliteration
  // evidence, so their average is the calibrated baseline (see
  // core/translit-weaning.js, which blends this with ongoing Drill latency).
  const noTranslitTiers = [trackResults.comprehensionNoTranslit?.tier, trackResults.cyrillicDecoding?.tier].filter((t) => t !== undefined);
  if (noTranslitTiers.length) {
    progress.meta.translitWeaning.calibratedTier = noTranslitTiers.reduce((a, b) => a + b, 0) / noTranslitTiers.length;
  }

  return { overallCefr, levelCode };
}

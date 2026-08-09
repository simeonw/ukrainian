// Ukrainian-specific fill vocabulary for the 6 core grammar frames (finding 5:
// "Substitution templates are written but never reach the drill engine" —
// these are the same templates already authored in lessons.js's
// content.substitutions, now actually wired into core/generate.js so pool.js
// can draw combinatorial variants instead of 5 fixed example sentences per
// frame). Frame ids match patterns.js's existing `frame` field so a lesson's
// hand-written p_want_* items and its generated variants are the same family.
//
// Fills come in two flavors:
//  - static, hand-picked arrays (below) — used wherever the slot needs a
//    specific grammatical form (an inflected case, a conjugated form) that
//    isn't safely derivable from the catalog's dictionary-form entries.
//  - infinitiveFills() — dynamic: pulled straight from vocab.js, so any verb
//    added to the catalog in the future (like today's new vocabulary) is
//    automatically usable here with no separate authoring step. Only safe
//    for slots that take a bare infinitive (можу/буду/мені треба ___), since
//    Ukrainian infinitives never change form regardless of context — unlike
//    noun slots, which need a specific case ending vocab.js doesn't store
//    (e.g. "Хочу ___." needs accusative "каву", not nominative "кава" — those
//    stay hand-picked until there's a real case-inflection engine to lean on).
import { VOCAB } from './vocab.js';

// Ukrainian infinitives are reliably marked by -ти/-тися/-тись — a structural
// fact, not a guess — which is what separates true infinitives from other
// pos:'verb' entries that store an already-conjugated form for vocabulary
// browsing (e.g. 'зробив', 'вважаю', 'полягає').
const INFINITIVE_RE = /ти(ся|сь)?$/;

// A few infinitives create a redundant "modal on modal" combination when
// dropped into these slots (буду бути = "will be to-be", можу могти = "can
// can") — excluded as specific, reasoned exceptions, not a broader curated
// allowlist that would defeat the point of pulling from the catalog.
const MODAL_SELF_REFERENTIAL = new Set(['бути', 'могти', 'мусити']);

export function bareInfinitiveEn(enField) {
  return enField
    .split('/')[0]
    .replace(/^to\s+/i, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim();
}

// Exported so other features needing "every safely-substitutable infinitive
// in the catalog" (e.g. js/ui/conjugation-drill.js) share this exact
// definition instead of re-deriving their own — same reasoning either way:
// infinitives never inflect, so pulling straight from vocab.js is safe.
export function getInfinitiveVocabItems() {
  return VOCAB.filter((item) => item.pos === 'verb' && INFINITIVE_RE.test(item.uk) && !MODAL_SELF_REFERENTIAL.has(item.uk));
}

function infinitiveFills() {
  return getInfinitiveVocabItems().map((item) => ({ uk: item.uk, translit: item.translit, en: bareInfinitiveEn(item.en) }));
}

export const SUBSTITUTION_FRAMES = [
  {
    id: 'want+inf',
    topics: ['l04'],
    skills: ['grammar', 'understanding'],
    ukTemplate: 'Хочу ___.',
    translitTemplate: 'Khochu ___.',
    enTemplate: 'I want ___.',
    fills: [
      { uk: 'бачити тебе', translit: 'bachyty tebe', en: 'to see you' },
      { uk: 'поговорити', translit: 'pohovoryty', en: 'to talk' },
      { uk: 'зробити це', translit: 'zrobyty tse', en: 'to do this' },
      { uk: 'каву', translit: 'kavu', en: '(some) coffee' },
      { uk: 'чай', translit: 'chai', en: '(some) tea' },
      { uk: 'відпочити', translit: 'vidpochyty', en: 'to rest' },
    ],
  },
  {
    id: 'can+inf',
    topics: ['l05'],
    skills: ['grammar', 'production'],
    ukTemplate: 'Можу ___.',
    translitTemplate: 'Mozhu ___.',
    enTemplate: 'I can ___.',
    fills: infinitiveFills(),
  },
  {
    id: 'future',
    topics: ['l07'],
    skills: ['grammar', 'future', 'production'],
    ukTemplate: 'Буду ___.',
    translitTemplate: 'Budu ___.',
    enTemplate: 'I will ___.',
    // буду also takes a predicate location/state, not just an infinitive
    // ("буду вдома" = "I will be home") — a genuinely different slot type
    // from the other two frames, so that one stays hand-picked alongside
    // the dynamic infinitives rather than being lost in the switch.
    fills: [...infinitiveFills(), { uk: 'вдома', translit: 'vdoma', en: 'be home' }],
  },
  {
    id: 'past',
    topics: ['l08'],
    skills: ['past', 'understanding'],
    ukTemplate: 'Я ___ це вчора.',
    translitTemplate: 'Ya ___ tse vchora.',
    enTemplate: 'I ___ this yesterday.',
    fills: [
      { uk: 'зробив', translit: 'zrobyv', en: 'did' },
      { uk: 'сказав', translit: 'skazav', en: 'said' },
      { uk: 'бачив', translit: 'bachyv', en: 'saw' },
      { uk: 'знайшов', translit: 'znayshov', en: 'found' },
      { uk: 'чув', translit: 'chuv', en: 'heard' },
    ],
  },
  {
    id: 'need',
    topics: ['l11'],
    skills: ['grammar', 'obligation', 'production'],
    ukTemplate: 'Мені треба ___.',
    translitTemplate: 'Meni treba ___.',
    enTemplate: 'I need to ___.',
    fills: infinitiveFills(),
  },
  {
    id: 'conditional',
    topics: ['l10'],
    skills: ['conditional', 'production'],
    ukTemplate: 'Я ___ би.',
    translitTemplate: 'Ya ___ by.',
    enTemplate: 'I would ___.',
    fills: [
      { uk: 'хотів', translit: 'khotiv', en: 'like' },
      { uk: 'пішов', translit: 'pishov', en: 'go' },
      { uk: 'мав', translit: 'mav', en: 'have to' },
      { uk: 'зробив', translit: 'zrobyv', en: 'do it' },
    ],
  },
];

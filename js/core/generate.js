// Generic slot-and-fill instance generator. Knows nothing about Ukrainian — a
// language pack supplies a frame (a template with one `___` slot plus a fill
// vocabulary; see data/substitution-fills.js) and this module combines them
// into item-shaped objects the rest of the app already knows how to quiz
// (pool.js, drill.js). Turns N fixed example sentences into N x fills.length
// generated variants for free — this is what finding 5 asked for: the
// substitution templates authored in lessons.js content.substitutions
// actually reaching the drill engine instead of only the static lesson page.
export function generateInstances(frame) {
  return frame.fills.map((fill, i) => ({
    id: `gen:${frame.id}:${i}`,
    kind: 'pattern',
    pos: 'phrase',
    uk: frame.ukTemplate.replace('___', fill.uk),
    translit: frame.translitTemplate ? frame.translitTemplate.replace('___', fill.translit) : null,
    en: frame.enTemplate.replace('___', fill.en),
    cz: null,
    topics: frame.topics || [],
    skills: frame.skills || ['grammar'],
    generated: true,
    frameId: frame.id,
  }));
}

export function generateAllInstances(frames) {
  return frames.flatMap((frame) => generateInstances(frame));
}

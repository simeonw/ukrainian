// Single source of truth for which skill categories an item belongs to.
// Previously this heuristic was copy-pasted in pool.js and srs.js and had
// already started to drift between the two copies. Kept generic (no
// target-language-specific logic here) so a future language pack only
// needs to supply items whose `skills` field (or structured fields like
// `kind`/`aspect`) already encodes what they test — this module doesn't know
// or care it's Ukrainian content.
//
// This used to also carry an ID_SKILL_RULES fallback that guessed 'past' and
// 'conditional' from substrings in an item's id. Verified against the full
// catalog: every item it matched already carried the correct tag explicitly
// in its own `skills` array — the fallback was fully redundant, and in one
// case (p_c1_time_3, an imperative sentence with no past tense in it) it was
// actively wrong, overriding a deliberately-narrower explicit tag. Removed
// rather than kept as unreachable "just in case" code.
export function getSkillsForItem(item) {
  const skills = new Set(item.skills || []);
  if (item.kind === 'vocab') skills.add('vocabulary');
  if (item.aspect) skills.add('aspect'); // imperfective/perfective pair members
  return [...skills];
}

export function itemHasAnySkill(item, activeSkills) {
  return getSkillsForItem(item).some((skill) => activeSkills.includes(skill));
}

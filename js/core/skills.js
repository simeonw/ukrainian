// Single source of truth for which skill categories an item belongs to.
// Previously this heuristic was copy-pasted in pool.js and srs.js and had
// already started to drift between the two copies. Kept generic (no
// target-language-specific logic here) so a future language pack only
// needs to supply items whose `skills` field or `id` already encodes what
// they test — this module doesn't know or care it's Ukrainian content.
const ID_SKILL_RULES = [
  {
    skill: 'past',
    test: (id) => id.includes('past') || id.includes('p_b1_done') || id.includes('p_b1_never') || id.includes('p_b1_when') || id.includes('p_c1_time'),
  },
  {
    skill: 'conditional',
    test: (id) => id.includes('cond') || id.includes('hypo') || id.includes('challenge_1'),
  },
];

export function getSkillsForItem(item) {
  const skills = new Set(item.skills || []);
  if (item.kind === 'vocab') skills.add('vocabulary');
  for (const rule of ID_SKILL_RULES) {
    if (rule.test(item.id)) skills.add(rule.skill);
  }
  return [...skills];
}

export function itemHasAnySkill(item, activeSkills) {
  return getSkillsForItem(item).some((skill) => activeSkills.includes(skill));
}

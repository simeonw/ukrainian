// Retention: a slower, statistically honest, category-level confidence score
// that never blocks anything — it only informs what resurfaces in Drill and
// what the Ability Map shows (see core/completion.js for Completion, the fast
// engagement checkbox this is deliberately NOT). One formula for every
// category, generic across skills.js's whole taxonomy — no per-feature ad hoc
// thresholds. See js/core/skills.js for the taxonomy this keys off of.
const WINDOW_SIZE = 12;
const Z = 1.96; // ~95% confidence

// https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval#Wilson_score_interval
// Deliberately pessimistic: a small or lucky sample pulls toward 50%, so a
// perfect streak on 3 questions reads nothing like a real track record.
export function wilsonLowerBound(successes, total, z = Z) {
  if (total === 0) return 0;
  const phat = successes / total;
  const denom = 1 + (z * z) / total;
  const centre = phat + (z * z) / (2 * total);
  const margin = z * Math.sqrt((phat * (1 - phat) + (z * z) / (4 * total)) / total);
  return Math.max(0, (centre - margin) / denom);
}

function ensureSkillEntry(progress, skill) {
  if (!progress.meta.retention) progress.meta.retention = {};
  if (!progress.meta.retention[skill]) progress.meta.retention[skill] = { attempts: [] };
  return progress.meta.retention[skill];
}

// instanceKey identifies a distinct question, not a distinct attempt — for a
// catalog item that's just the item id; for a generated substitution instance
// it's `frameId:fillIndex` (see core/generate.js). Re-recording the same
// instanceKey overwrites its prior outcome (most-recent-wins) rather than
// adding a second data point, so answering the same easy sentence five times
// can't inflate the count — this is the "minimum distinct instances" guardrail.
// Capping the window at WINDOW_SIZE distinct instances is the recency
// guardrail: an old streak ages out instead of permanently propping up a
// category the learner hasn't touched in weeks.
export function recordSkillAttempt(progress, skills, instanceKey, isCorrect) {
  for (const skill of skills) {
    const entry = ensureSkillEntry(progress, skill);
    entry.attempts = entry.attempts.filter((a) => a.instanceKey !== instanceKey);
    entry.attempts.push({ instanceKey, correct: isCorrect, ts: Date.now() });
    if (entry.attempts.length > WINDOW_SIZE) {
      entry.attempts = entry.attempts.slice(entry.attempts.length - WINDOW_SIZE);
    }
  }
}

export function getSkillRetention(progress, skill) {
  const attempts = progress.meta.retention?.[skill]?.attempts || [];
  const total = attempts.length;
  const successes = attempts.filter((a) => a.correct).length;
  const wilson = wilsonLowerBound(successes, total);
  return { successes, total, percent: Math.round(wilson * 100) };
}

// Seeds a skill's rolling window from Phase 1 calibration so ordinary Drill
// practice refines an informed starting point instead of cold-starting at
// zero — one continuous signal from onboarding onward, not two. confidence01
// is a 0..1 estimate (e.g. calibration tier / TIER_MAX); synthesized as
// SEED_SAMPLE_SIZE distinct pseudo-instances so it behaves like a real, if
// modest, sample under the same Wilson formula everything else uses.
const SEED_SAMPLE_SIZE = 6;
export function seedSkillRetention(progress, skill, confidence01) {
  const entry = ensureSkillEntry(progress, skill);
  if (entry.attempts.length > 0) return; // never overwrite real practice history
  const successes = Math.round(confidence01 * SEED_SAMPLE_SIZE);
  for (let i = 0; i < SEED_SAMPLE_SIZE; i++) {
    entry.attempts.push({ instanceKey: `calib-seed:${skill}:${i}`, correct: i < successes, ts: Date.now() });
  }
}

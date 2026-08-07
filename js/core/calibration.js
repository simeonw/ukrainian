// Generic adaptive placement engine: a bounded binary search per skill track.
//
// Deliberately knows nothing about Ukrainian, Cyrillic, or any specific track's
// content shape — it operates purely on tier indices (0..TIER_MAX) and
// correct/fluent booleans. A language pack supplies the tracks (see
// data/calibration-tracks.js); this module supplies the "which floor is this
// person on" search strategy, reusable for any language pack that plugs in.
//
// Tier scale: 8 integer rungs, each difficulty band split into a "shaky" and
// a "fluent" half-step (0/1 = lowest band shaky/fluent, ... 6/7 = highest band
// shaky/fluent). 4 rounds of binary search resolve 2^4=16 outcomes, more than
// enough to place a rung in an 8-wide scale.
export const TIER_MIN = 0;
export const TIER_MAX = 7;
export const MAX_ROUNDS_PER_TRACK = 4;

export function createTrackState() {
  return {
    rounds: 0,
    low: TIER_MIN, // highest tier confirmed achieved
    high: TIER_MAX + 1, // lowest tier confirmed NOT achieved (exclusive upper bound)
    lowWasSoft: false, // was the tier at `low` passed correct-but-slow, not cleanly?
    done: false,
    estimate: null,
    history: [],
  };
}

// Which tier to probe next for this track, given its state so far.
export function nextProbeTier(state) {
  if (state.done) return null;
  if (state.rounds === 0) return TIER_MIN; // floor probe
  if (state.rounds === 1) return TIER_MAX; // jump straight to the ceiling
  let mid = Math.floor((state.low + state.high) / 2);
  if (state.lowWasSoft) mid = Math.max(state.low, mid - 1); // a shaky pass gets probed more conservatively
  return Math.min(mid, TIER_MAX);
}

// Mutates and returns state. `fluent` should already fold in both correctness
// and response time (see isFluentResponse) — this function only reasons about
// the tier-search bookkeeping, not about what "fluent" means for any given
// question type.
export function recordTrackAnswer(state, tier, correct, fluent) {
  state.rounds += 1;
  state.history.push({ tier, correct, fluent });

  if (state.rounds === 1) {
    if (!correct) {
      // Whiffed the floor — no need to spend more rounds proving it further down.
      state.estimate = TIER_MIN;
      state.done = true;
      return state;
    }
    state.low = tier;
    state.lowWasSoft = !fluent;
  } else if (correct && fluent) {
    state.low = tier;
    state.lowWasSoft = false;
  } else if (correct && !fluent) {
    state.low = tier;
    state.lowWasSoft = true;
  } else {
    state.high = tier;
  }

  // A soft (worked-out, not fluent) pass must never be trusted as a final
  // estimate on its own — the whole point of tracking `lowWasSoft` is that a
  // slow correct answer needs confirmation, not an instant top-tier grant.
  // Without the `!state.lowWasSoft` guard, the round-2 ceiling probe was the
  // one case where this silently broke: `high` sits at TIER_MAX+1 with no
  // room to bisect above it, so `high - low` is always exactly 1 there —
  // meaning ANY correct ceiling answer, fluent or not, satisfied the old gap
  // check and locked in the top tier after just 2 rounds. Requiring a fluent
  // low forces at least one more confirming round (nextProbeTier's
  // lowWasSoft handling naturally re-probes near the same tier) before a
  // soft pass is ever trusted as the session's actual estimate.
  if (state.rounds >= MAX_ROUNDS_PER_TRACK || (state.high - state.low <= 1 && !state.lowWasSoft)) {
    state.estimate = state.low;
    state.done = true;
  }
  return state;
}

// Standard "did this response reflect genuine comprehension, not just a fast
// guess" threshold, shared by calibration and drill so the definition of
// fluent never drifts between the two.
export function isFluentResponse(correct, timeTakenSeconds, wordCount) {
  if (!correct) return false;
  const threshold = 3 + wordCount * 1.5;
  return timeTakenSeconds <= threshold;
}

// --- Session: runs several tracks' searches in parallel, capped at a total
// question budget so the whole calibration stays bounded regardless of how
// many tracks a language pack defines. ---
export function createCalibrationSession(trackIds) {
  const tracks = {};
  for (const id of trackIds) tracks[id] = createTrackState();
  return { tracks, questionsAsked: 0, maxQuestions: trackIds.length * MAX_ROUNDS_PER_TRACK };
}

export function isSessionDone(session) {
  if (session.questionsAsked >= session.maxQuestions) return true;
  return Object.values(session.tracks).every((t) => t.done);
}

// Picks the next track+tier to probe: the track with the fewest rounds spent
// so far that isn't done yet (keeps all tracks progressing roughly evenly
// rather than exhausting one before starting the next).
export function nextProbe(session) {
  const candidates = Object.entries(session.tracks).filter(([, t]) => !t.done);
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => a[1].rounds - b[1].rounds);
  const [trackId, state] = candidates[0];
  return { trackId, tier: nextProbeTier(state) };
}

export function recordCalibrationAnswer(session, trackId, tier, correct, fluent) {
  recordTrackAnswer(session.tracks[trackId], tier, correct, fluent);
  session.questionsAsked += 1;
  return session;
}

// Final per-track estimates: { [trackId]: { tier, soft } }, only for tracks
// that actually produced an estimate (a track with zero budget spent has none).
export function getSessionResults(session) {
  const results = {};
  for (const [trackId, state] of Object.entries(session.tracks)) {
    if (state.estimate !== null) {
      results[trackId] = { tier: state.estimate, soft: state.lowWasSoft };
    }
  }
  return results;
}

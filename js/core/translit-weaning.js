// Finding 9: transliteration has a manual toggle only — nothing ever detects
// reading fluency and proposes turning it off. Phase 1's calibration already
// gives a direct, immediate read of reading-without-the-crutch ability (the
// comprehensionNoTranslit and cyrillicDecoding tracks); ordinary Drill practice
// keeps that read current via the same latencyHistory-based fluency signal the
// Ability Map's "Reading Speed" already computes — this module just blends the
// two into one score and decides when it's honest to *suggest* (never force)
// turning transliteration off. The learner's own setting always overrides.
import { TIER_MAX } from './calibration.js';
import { getAbilityProfile } from './srs.js';

const WEANING_THRESHOLD = 75;

export function getReadingFluencyPercent(progress, cardPool) {
  const calibratedTier = progress.meta.translitWeaning?.calibratedTier;
  const calibratedPercent = typeof calibratedTier === 'number' ? Math.round((calibratedTier / TIER_MAX) * 100) : 0;
  const readingSpeedPercent = getAbilityProfile(progress, cardPool)['Reading Speed'];
  // Either a genuine no-crutch calibration read or a strong ongoing latency
  // read is sufficient evidence on its own — take whichever is higher rather
  // than averaging a real signal down against one that hasn't caught up yet.
  return Math.max(calibratedPercent, readingSpeedPercent);
}

export function shouldOfferWeaning(progress, cardPool) {
  if (!progress.meta.settings.transliteration) return false; // already off, nothing to suggest
  if (progress.meta.translitWeaning?.resolvedAt) return false; // asked once already — never nag
  return getReadingFluencyPercent(progress, cardPool) >= WEANING_THRESHOLD;
}

export function markWeaningOffered(progress) {
  if (!progress.meta.translitWeaning.offeredAt) {
    progress.meta.translitWeaning.offeredAt = Date.now();
  }
}

// accepted=true turns transliteration off; accepted=false just records the
// dismissal so the prompt never resurfaces — the setting itself is always
// still there for the learner to flip manually either way.
export function resolveWeaning(progress, accepted) {
  progress.meta.translitWeaning.resolvedAt = Date.now();
  progress.meta.translitWeaning.accepted = accepted;
  if (accepted) progress.meta.settings.transliteration = false;
}

// Phase 4: a short "since last time" delta on the lesson list, without a full
// history log — just one daily snapshot of each Completed lesson's Retention
// percent in progress.meta. Deltas compare against whatever was captured
// before the snapshot goes stale (at most once a day), then the snapshot
// rolls forward to today's values for next time.
const SNAPSHOT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

// currentValues: { [lessonId]: retentionPercent } for Completed lessons only.
// Mutates progress (rolls the snapshot forward when stale) and returns
// { [lessonId]: delta } for whichever lessons had a prior snapshot value.
export function getRetentionDeltas(progress, currentValues) {
  const snap = progress.meta.retentionSnapshot;
  const isStale = !snap.takenAt || Date.now() - snap.takenAt > SNAPSHOT_MAX_AGE_MS;

  const deltas = {};
  if (snap.takenAt) {
    for (const [lessonId, current] of Object.entries(currentValues)) {
      const prev = snap.values[lessonId];
      if (typeof prev === 'number') deltas[lessonId] = current - prev;
    }
  }

  if (isStale) {
    progress.meta.retentionSnapshot = { takenAt: Date.now(), values: { ...currentValues } };
  }
  return deltas;
}

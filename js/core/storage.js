import { getAllThemeIds } from './vocab-themes.js';

const STORAGE_KEY = 'ukrainian-progress';
const SCHEMA_VERSION = 1;

export const ALL_SETTINGS_TOPICS = [
  'vocabulary',
  'grammar',
  'past',
  'conditional',
  'future',
  'obligation',
  'aspect',
  'dative',
  'reflexive',
  'understanding',
  'production'
];

function defaultProgress() {
  return {
    version: SCHEMA_VERSION,
    items: {},
    lessons: {},
    meta: {
      createdAt: Date.now(),
      diagnosticCompletedAt: null,
      // Phase 4: one-time transliteration-weaning prompt state (never re-asks
      // after a resolution) and a lightweight daily snapshot for "since last
      // time" progress deltas on the lesson list.
      translitWeaning: { offeredAt: null, resolvedAt: null, accepted: null },
      retentionSnapshot: { takenAt: null, values: {} },
      settings: {
        transliteration: true,
        language: 'en',
        topics: [...ALL_SETTINGS_TOPICS],
        // Content-domain filter (Settings' "Vocabulary Themes") — separate
        // axis from `topics` above. Defaults to everything on, same as
        // topics: "otherwise all are included."
        themes: getAllThemeIds()
      }
    },
  };
}

export function loadProgress() {
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    return defaultProgress();
  }
  if (!raw) return defaultProgress();
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || parsed.version !== SCHEMA_VERSION) {
      return defaultProgress();
    }
    const base = defaultProgress();

    // Clean migration of settings schema
    const settings = {
      ...base.meta.settings,
      ...(parsed.meta?.settings || {})
    };

    return {
      version: SCHEMA_VERSION,
      items: parsed.items || {},
      lessons: parsed.lessons || {},
      meta: {
        ...base.meta,
        ...(parsed.meta || {}),
        settings
      },
    };
  } catch {
    return defaultProgress();
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage unavailable (private mode / quota) — fail silently, in-memory state still works
  }
}

export function resetProgress() {
  const fresh = defaultProgress();
  saveProgress(fresh);
  return fresh;
}

import { renderDrill } from './drill.js';
import { renderLessons } from './lessons-ui.js';
import { renderCalibration } from './calibration-ui.js';
import { loadProgress, resetProgress, saveProgress, ALL_SETTINGS_TOPICS } from '../core/storage.js';
import { getAbilityProfile } from '../core/srs.js';
import { buildCardPool } from '../core/pool.js';
import { shouldOfferWeaning, markWeaningOffered, resolveWeaning } from '../core/translit-weaning.js';
import { getVocabBadgeProgress } from '../core/vocab-badges.js';
import { getThemedLessons } from '../core/vocab-themes.js';
import { getLevelSummary } from '../core/level-summary.js';
import { LESSONS } from '../data/lessons.js';
import { escapeHtml } from './dom-utils.js';

const root = document.getElementById('app');
let activeCleanup = null;

const EXERCISE_TYPE_OPTIONS = [
  { key: 'swipe', label: '4-Way Multiple Choice', desc: 'Read the word/phrase, pick the matching option from 4 tiles.' },
  { key: 'listen', label: 'Listen & Choose', desc: 'Hear the Ukrainian audio (no text shown), pick the meaning from 4 tiles.' },
  { key: 'builder', label: 'Word Order Builder', desc: 'Tap words in the right order to construct the Ukrainian sentence.' },
  { key: 'semantic', label: 'Type the Translation', desc: 'Read a Ukrainian sentence, type its English (or Czech) meaning.' },
];

function teardownActive() {
  if (activeCleanup) {
    activeCleanup();
    activeCleanup = null;
  }
}

function renderHome() {
  teardownActive();
  const progress = loadProgress();
  const showDiagnosticCta = !progress.meta.diagnosticCompletedAt;

  // Calculate skills profile percentages
  const cardPool = buildCardPool();
  const profile = getAbilityProfile(progress, cardPool);
  const vocabBadges = getVocabBadgeProgress(progress);
  const level = getLevelSummary(progress);

  // Finding 9: suggest, never force, turning transliteration off once the
  // learner has demonstrably shown they can read without it.
  const showWeaningCta = shouldOfferWeaning(progress, cardPool);
  if (showWeaningCta) {
    markWeaningOffered(progress);
    saveProgress(progress);
  }

  root.innerHTML = `
    <div class="home-screen">
      <header class="lessons-header" style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Українська</h1>
        <button class="btn-primary" id="open-settings-btn" style="padding: 8px 14px; font-size: 13px;">⚙️ Settings</button>
      </header>
      <p class="home-subtitle">Learn Ukrainian: get understandable fast, improve accuracy over time.</p>

      ${showDiagnosticCta ? `
        <div class="home-cta">
          <p>New here? Take the 3-minute placement test — up to 20 quick questions across reading, Cyrillic decoding, and grammar to find out roughly where you're starting from.</p>
          <div class="home-cta-buttons">
            <button class="btn-primary" id="start-diagnostic">Take placement test</button>
            <button class="btn-text" id="dismiss-diagnostic">Skip for now</button>
          </div>
        </div>
      ` : ''}

      ${showWeaningCta ? `
        <div class="home-cta">
          <p>You're reading Cyrillic reliably now — want to turn off transliteration? You can always switch it back on in Settings.</p>
          <div class="home-cta-buttons">
            <button class="btn-primary" id="weaning-accept">Turn it off</button>
            <button class="btn-text" id="weaning-dismiss">Keep it on</button>
          </div>
        </div>
      ` : ''}

      <!-- Compact "where am I / what's next" summary — the immediate-impact
           read requested instead of leading with a wall of stats. Built
           entirely from existing signals (core/level-summary.js). -->
      <div class="level-summary-card">
        <div class="level-summary-row">
          <span class="level-summary-label">Level</span>
          <span class="level-summary-value">${escapeHtml(level.levelLabel)}</span>
        </div>
        <div class="level-summary-row">
          <span class="level-summary-label">Lessons confirmed</span>
          <span class="level-summary-value">${level.lessonsCompleted}/${level.lessonsTotal}</span>
        </div>
        <div class="level-summary-row">
          <span class="level-summary-label">Vocabulary known</span>
          <span class="level-summary-value">${level.vocabKnown}/${level.vocabTotal}</span>
        </div>
        ${level.nextLessonTitle ? `
          <div class="level-summary-next">Next up: ${escapeHtml(level.nextLessonTitle)}</div>
        ` : ''}
      </div>

      <div class="home-modes">
        <button class="mode-card" id="open-drill">
          <div class="mode-card-title">Drill</div>
          <div class="mode-card-desc">Endless mixed vocab &amp; pattern practice, adaptive to your level. Swipe, click, or use arrow keys.</div>
        </button>
        <button class="mode-card" id="open-lessons">
          <div class="mode-card-title">Lessons</div>
          <div class="mode-card-desc">${LESSONS.length} sections: sentence frames, vocabulary, and conversation topics.</div>
        </button>
      </div>

      <!-- Detailed stats — collapsed by default (native <details>, no JS
           needed, works well on mobile) so the immediate impact of the
           screen is Drill / Lessons / the summary above, not a stat dump. -->
      <details class="stats-accordion">
        <summary>📊 Detailed Progress</summary>

        <div class="lesson-section" style="background: var(--surface); border: 1px solid var(--border); padding: 16px; border-radius: var(--radius); margin-top: 10px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); margin-bottom: 2px; font-weight: 700;">Practice Accuracy</h3>
          <p style="font-size: 12px; color: var(--text-dim); margin-bottom: 12px;">How often you get each category right when tested — not the same as words fully mastered below.</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${Object.entries(profile).map(([skill, val]) => `
              <div>
                <div style="font-size: 13px; font-weight: 600; text-transform: capitalize; color: var(--text); display: flex; justify-content: space-between; margin-bottom: 4px;">
                  <span>${skill}</span>
                  <span style="color: ${val >= 75 ? 'var(--good)' : val >= 50 ? 'var(--warn)' : 'var(--accent)'}">${val}%</span>
                </div>
                <div class="progress-bar" style="height: 5px;">
                  <div class="progress-bar-fill" style="width: ${val}%; background: ${val >= 75 ? 'var(--good)' : val >= 50 ? 'var(--warn)' : 'var(--accent)'}"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="lesson-section" style="background: var(--surface); border: 1px solid var(--border); padding: 16px; border-radius: var(--radius); margin-top: 10px;">
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); margin-bottom: 2px; font-weight: 700;">Vocabulary Mastered</h3>
          <p style="font-size: 12px; color: var(--text-dim); margin-bottom: 12px;">Words confirmed via repeated correct answers or a typed translation — stricter than practice accuracy above.</p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${Object.values(vocabBadges).map((b) => {
              const pct = b.total > 0 ? Math.round((b.known / b.total) * 100) : 0;
              return `
                <div>
                  <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
                    <span style="font-weight: 600;">${escapeHtml(b.label)}</span>
                    <span style="color: var(--text-dim);">${b.known}/${b.total} known${b.nextMilestone ? ` &middot; next: ${b.nextMilestone}` : ' &middot; all known!'}</span>
                  </div>
                  <div class="progress-bar" style="height: 5px; margin-top: 0;">
                    <div class="progress-bar-fill" style="width: ${pct}%;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </details>

      <!-- Global Settings & Profile Actions -->
      <div style="text-align: center; margin-top: 24px; padding: 12px; border-top: 1px solid var(--border);">
        <button class="btn-text" id="reset-global-storage" style="color: var(--bad); text-decoration: none; font-size: 13px;">
          ⚠️ Reset Local Storage Progress
        </button>
      </div>
    </div>
  `;

  const diagBtn = root.querySelector('#start-diagnostic');
  if (diagBtn) diagBtn.addEventListener('click', renderDiagnosticScreen);

  const dismissBtn = root.querySelector('#dismiss-diagnostic');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      const cta = root.querySelector('.home-cta');
      if (cta) cta.remove();
    });
  }

  const weaningAcceptBtn = root.querySelector('#weaning-accept');
  if (weaningAcceptBtn) {
    weaningAcceptBtn.addEventListener('click', () => {
      resolveWeaning(progress, true);
      saveProgress(progress);
      renderHome();
    });
  }
  const weaningDismissBtn = root.querySelector('#weaning-dismiss');
  if (weaningDismissBtn) {
    weaningDismissBtn.addEventListener('click', () => {
      resolveWeaning(progress, false);
      saveProgress(progress);
      renderHome();
    });
  }

  root.querySelector('#open-drill').addEventListener('click', renderDrillScreen);
  root.querySelector('#open-lessons').addEventListener('click', renderLessonsScreen);
  root.querySelector('#open-settings-btn').addEventListener('click', renderSettingsScreen);

  // Global Progress Reset Listener
  root.querySelector('#reset-global-storage').addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all your Ukrainian learning progress? This cannot be undone.")) {
      resetProgress();
      renderHome();
    }
  });
}

function renderSettingsScreen() {
  teardownActive();
  const progress = loadProgress();
  const settings = progress.meta.settings;

  root.innerHTML = `
    <div class="settings-screen" style="display: flex; flex-direction: column; gap: 16px; padding-top: 8px;">
      <header class="lessons-header">
        <button class="btn-back-list" id="settings-back-btn" type="button">&larr; Home</button>
        <h2>Settings</h2>
      </header>

      <div class="lesson-section" style="background: var(--surface); border: 1px solid var(--border); padding: 16px; border-radius: var(--radius); display: flex; flex-direction: column; gap: 16px;">

        <!-- Transliteration Option -->
        <div>
          <label style="font-weight: bold; font-size: 15px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
            <span>Show Transliteration / Readings</span>
            <input type="checkbox" id="settings-translit-chk" ${settings.transliteration ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--accent);" />
          </label>
          <p style="color: var(--text-dim); font-size: 13px; margin: 4px 0 0 0;">Toggle pronunciation helpers for Cyrillic words.</p>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0;" />

        <!-- Pronunciation Audio Option -->
        <div>
          <label style="font-weight: bold; font-size: 15px; display: flex; align-items: center; justify-content: space-between; cursor: pointer;">
            <span>Automatically Play Pronunciation</span>
            <input type="checkbox" id="settings-autospeak-chk" ${settings.autoSpeak ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--accent);" />
          </label>
          <p style="color: var(--text-dim); font-size: 13px; margin: 4px 0 0 0;">Speaks automatically whenever it can't give away the answer: as soon as you answer a 4-way tile or word-order round, and immediately when a Ukrainian sentence is shown to translate. Stays tap-to-hear wherever hearing it first would reveal the answer (e.g. picking Ukrainian tiles from an English prompt).</p>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0;" />

        <!-- Exercise Type Filters -->
        <div>
          <label style="font-weight: bold; font-size: 15px; display: block; margin-bottom: 8px;">Exercise Types</label>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${EXERCISE_TYPE_OPTIONS.map(({ key, label, desc }) => `
              <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-size: 13px; background: var(--surface-2); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border); gap: 12px;">
                <span>
                  <span style="display: block; font-weight: 600;">${label}</span>
                  <span style="display: block; color: var(--text-dim); font-size: 12px; margin-top: 2px;">${desc}</span>
                </span>
                <input type="checkbox" class="settings-exercise-type-chk" value="${key}" ${settings.exerciseTypes[key] ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent); flex-shrink: 0;" />
              </label>
            `).join('')}
          </div>
          <p style="color: var(--text-dim); font-size: 13px; margin: 8px 0 0 0;">"Listen &amp; Choose" needs a Ukrainian voice on this device — it's silently skipped if none is available even when checked.</p>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0;" />

        <!-- Primary Target Translation Language Option -->
        <div>
          <label style="font-weight: bold; font-size: 15px; display: block; margin-bottom: 8px;">Primary Translation Language</label>
          <div style="display: flex; gap: 16px;">
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">
              <input type="radio" name="settings-lang" value="en" ${settings.language === 'en' ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent);" />
              <span>English 🇬🇧</span>
            </label>
            <label style="display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 14px;">
              <input type="radio" name="settings-lang" value="cz" ${settings.language === 'cz' ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent);" />
              <span>Czech 🇨🇿</span>
            </label>
          </div>
          <p style="color: var(--text-dim); font-size: 13px; margin: 6px 0 0 0;">Select your target translation language for drills and card hints.</p>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0;" />

        <!-- Active Topics Filters -->
        <div>
          <label style="font-weight: bold; font-size: 15px; display: block; margin-bottom: 8px;">Active Drill Topics &amp; Skills</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            ${ALL_SETTINGS_TOPICS.map(topic => {
              const isChecked = settings.topics.includes(topic);
              return `
                <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-size: 13px; background: var(--surface-2); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
                  <span style="text-transform: capitalize;">${topic}</span>
                  <input type="checkbox" class="settings-topic-chk" value="${topic}" ${isChecked ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent);" />
                </label>
              `;
            }).join('')}
          </div>
          <p style="color: var(--text-dim); font-size: 13px; margin: 8px 0 0 0;">Only draw questions in drills matching these checked active categories.</p>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--border); margin: 8px 0;" />

        <!-- Vocabulary Theme Filters — content domains, separate from the skill filters above.
             Core grammar frames are never gated by this (see core/vocab-themes.js). -->
        <div>
          <label style="font-weight: bold; font-size: 15px; display: block; margin-bottom: 8px;">Vocabulary Themes</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            ${getThemedLessons().map(lesson => {
              const isChecked = settings.themes.includes(lesson.id);
              return `
                <label style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-size: 13px; background: var(--surface-2); padding: 8px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
                  <span>${escapeHtml(lesson.title)}</span>
                  <input type="checkbox" class="settings-theme-chk" value="${lesson.id}" ${isChecked ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--accent);" />
                </label>
              `;
            }).join('')}
          </div>
          <p style="color: var(--text-dim); font-size: 13px; margin: 8px 0 0 0;">Only draw vocabulary from checked topics — core grammar lessons are unaffected. Leave everything checked for the full course.</p>
        </div>

      </div>
    </div>
  `;

  // Listeners to auto-save settings
  const translitChk = root.querySelector('#settings-translit-chk');
  translitChk.addEventListener('change', () => {
    progress.meta.settings.transliteration = translitChk.checked;
    saveProgress(progress);
  });

  const autoSpeakChk = root.querySelector('#settings-autospeak-chk');
  autoSpeakChk.addEventListener('change', () => {
    progress.meta.settings.autoSpeak = autoSpeakChk.checked;
    saveProgress(progress);
  });

  const exerciseTypeChks = root.querySelectorAll('.settings-exercise-type-chk');
  exerciseTypeChks.forEach(chk => {
    chk.addEventListener('change', () => {
      const anyChecked = Array.from(exerciseTypeChks).some(c => c.checked);
      if (!anyChecked) {
        chk.checked = true;
        alert('At least one exercise type must stay enabled!');
        return;
      }
      const exerciseTypes = {};
      exerciseTypeChks.forEach(c => { exerciseTypes[c.value] = c.checked; });
      progress.meta.settings.exerciseTypes = exerciseTypes;
      saveProgress(progress);
    });
  });

  root.querySelectorAll('input[name="settings-lang"]').forEach(rad => {
    rad.addEventListener('change', () => {
      progress.meta.settings.language = rad.value;
      saveProgress(progress);
    });
  });

  const topicChks = root.querySelectorAll('.settings-topic-chk');
  topicChks.forEach(chk => {
    chk.addEventListener('change', () => {
      let activeTopics = Array.from(topicChks).filter(c => c.checked).map(c => c.value);
      if (activeTopics.length === 0) {
        // Fallback to avoid empty pool
        activeTopics = [...ALL_SETTINGS_TOPICS];
        topicChks.forEach(c => c.checked = true);
        alert("At least one topic must be checked! All topics restored.");
      }
      progress.meta.settings.topics = activeTopics;
      saveProgress(progress);
    });
  });

  const themeChks = root.querySelectorAll('.settings-theme-chk');
  themeChks.forEach(chk => {
    chk.addEventListener('change', () => {
      let activeThemes = Array.from(themeChks).filter(c => c.checked).map(c => c.value);
      if (activeThemes.length === 0) {
        // Fallback to avoid empty pool — same guard as the topics list above.
        activeThemes = getThemedLessons().map(l => l.id);
        themeChks.forEach(c => c.checked = true);
        alert("At least one theme must be checked! All themes restored.");
      }
      progress.meta.settings.themes = activeThemes;
      saveProgress(progress);
    });
  });

  root.querySelector('#settings-back-btn').addEventListener('click', renderHome);
}

function renderDrillScreen() {
  teardownActive();
  const { cleanup } = renderDrill(root, { onExit: renderHome });
  activeCleanup = cleanup;
}

function renderLessonsScreen() {
  teardownActive();
  renderLessons(root, { onExit: renderHome, onOpenDiagnostic: renderDiagnosticScreen });
}

function renderDiagnosticScreen() {
  teardownActive();
  renderCalibration(root, { onDone: renderHome });
}

renderHome();

import { renderDrill } from './drill.js';
import { renderLessons } from './lessons-ui.js';
import { renderCalibration } from './calibration-ui.js';
import { loadProgress, resetProgress, saveProgress, ALL_SETTINGS_TOPICS } from '../core/storage.js';
import { getAbilityProfile } from '../core/srs.js';
import { buildCardPool } from '../core/pool.js';
import { shouldOfferWeaning, markWeaningOffered, resolveWeaning } from '../core/translit-weaning.js';

const root = document.getElementById('app');
let activeCleanup = null;

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
      <p class="home-subtitle">A Czech-bridge course: get understandable fast, improve accuracy over time.</p>

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

      <!-- Ability Profile Map Display -->
      <div class="lesson-section" style="background: var(--surface); border: 1px solid var(--border); padding: 16px; border-radius: var(--radius);">
        <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); margin-bottom: 12px; font-weight: 700;">Ability Profile Map</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${Object.entries(profile).map(([skill, val]) => `
            <div style="background: var(--surface-2); padding: 10px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
              <div style="font-size: 13px; font-weight: 600; text-transform: capitalize; color: var(--text); display: flex; justify-content: space-between;">
                <span>${skill}</span>
                <span style="color: ${val >= 75 ? 'var(--good)' : val >= 50 ? 'var(--warn)' : 'var(--accent)'}">${val}%</span>
              </div>
              <div class="progress-bar" style="height: 5px; margin-top: 6px;">
                <div class="progress-bar-fill" style="width: ${val}%; background: ${val >= 75 ? 'var(--good)' : val >= 50 ? 'var(--warn)' : 'var(--accent)'}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="home-modes">
        <button class="mode-card" id="open-drill">
          <div class="mode-card-title">Drill</div>
          <div class="mode-card-desc">Endless mixed vocab &amp; pattern practice. Swipe, click, or use arrow keys.</div>
        </button>
        <button class="mode-card" id="open-lessons">
          <div class="mode-card-title">Lessons</div>
          <div class="mode-card-desc">37 sections: sentence frames, vocabulary, and conversation topics.</div>
        </button>
      </div>

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

      </div>
    </div>
  `;

  // Listeners to auto-save settings
  const translitChk = root.querySelector('#settings-translit-chk');
  translitChk.addEventListener('change', () => {
    progress.meta.settings.transliteration = translitChk.checked;
    saveProgress(progress);
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

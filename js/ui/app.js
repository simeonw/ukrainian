import { renderDrill } from './drill.js';
import { renderLessons } from './lessons-ui.js';
import { renderDiagnostic } from './diagnostic-ui.js';
import { loadProgress, resetProgress } from '../core/storage.js';
import { getAbilityProfile } from '../core/srs.js';
import { buildCardPool } from '../core/pool.js';

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

  root.innerHTML = `
    <div class="home-screen">
      <h1>Українська</h1>
      <p class="home-subtitle">A Czech-bridge course: get understandable fast, improve accuracy over time.</p>

      ${showDiagnosticCta ? `
        <div class="home-cta">
          <p>New here? Take the 2-minute diagnostic so words you already recognize from Czech get a head start.</p>
          <div class="home-cta-buttons">
            <button class="btn-primary" id="start-diagnostic">Take diagnostic</button>
            <button class="btn-text" id="dismiss-diagnostic">Skip for now</button>
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

  root.querySelector('#open-drill').addEventListener('click', renderDrillScreen);
  root.querySelector('#open-lessons').addEventListener('click', renderLessonsScreen);

  // Global Progress Reset Listener
  root.querySelector('#reset-global-storage').addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all your Ukrainian learning progress? This cannot be undone.")) {
      resetProgress();
      renderHome();
    }
  });
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
  renderDiagnostic(root, { onDone: renderHome });
}

renderHome();

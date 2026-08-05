import { renderDrill } from './drill.js';
import { renderLessons } from './lessons-ui.js';
import { renderDiagnostic } from './diagnostic-ui.js';
import { renderSentenceBuilder } from './sentence-builder.js';
import { loadProgress } from '../core/storage.js';

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
      <div class="home-modes">
        <button class="mode-card" id="open-drill">
          <div class="mode-card-title">Drill</div>
          <div class="mode-card-desc">Endless mixed vocab &amp; pattern practice. Swipe, click, or use arrow keys.</div>
        </button>
        <button class="mode-card" id="open-lessons">
          <div class="mode-card-title">Lessons</div>
          <div class="mode-card-desc">20 sections: sentence frames, vocabulary, and conversation topics.</div>
        </button>
        <button class="mode-card" id="open-sentence-builder">
          <div class="mode-card-title">Sentence Builder</div>
          <div class="mode-card-desc">Construct complex Ukrainian sentences. Translate, build, and explore patterns with Czech comparison (Levels 1–5).</div>
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
  root.querySelector('#open-sentence-builder').addEventListener('click', renderSentenceBuilderScreen);
}

function renderSentenceBuilderScreen() {
  teardownActive();
  const { cleanup } = renderSentenceBuilder(root, { onExit: renderHome });
  activeCleanup = cleanup;
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

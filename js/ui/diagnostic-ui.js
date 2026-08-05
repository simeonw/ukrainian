import { seedFromDiagnostic } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { LESSONS } from '../data/lessons.js';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Challenge items representing levels A1-A2, B1-B2, C1 to find the learner's threshold
const CHALLENGE_STEPS = [
  {
    level: 'beginner',
    uk: 'Мені потрібна допомога.',
    translit: 'Meni potribna dopomoha.',
    en: 'I need help.',
    distractors: [
      'I am busy today.',
      'Can you wait here?',
      'I want to see you tomorrow.'
    ],
    itemsToSeed: ['v_voda', 'v_ruka', 'v_brat', 'v_sestra', 'v_misto', 'v_robyty', 'v_bachyty', 'v_hovoryty', 'v_pysaty', 'v_khotity', 'p_need_5']
  },
  {
    level: 'intermediate',
    uk: 'Якби я мав більше часу, я б вивчив українську швидше.',
    translit: 'Yakby ya mav bilshe chasu, ya b vyvchyv ukrayinsku shvydshe.',
    en: 'If I had more time, I would have learned Ukrainian faster.',
    distractors: [
      'The thing is that I did not have enough time today.',
      'Unlike Czechia, in Ukraine it is quite warm.',
      'I must go tomorrow because I have to work.'
    ],
    itemsToSeed: ['v_zrobyv', 'v_nikoly', 'v_molodshyi', 'v_sprava', 'v_prychyna', 'v_polyahaye', 'v_vidminu', 'v_porivnyano', 'p_b1_done_1', 'p_b1_never_1', 'p_b1_when_1', 'p_b1_thing_1', 'p_b1_compare_1', 'p_b2_hypo_1']
  },
  {
    level: 'advanced',
    uk: 'Якби я знав тоді те, що знаю зараз, я б прийняв зовсім інше рішення.',
    translit: 'Yakby ya znav todi te, shcho znayu zaraz, ya b pryynyav zovsim inshe rishennya.',
    en: 'If I had known then what I know now, I would have made a completely different decision.',
    distractors: [
      'Despite the situation being difficult, we managed to find a solution.',
      'On one hand, technology simplified our lives, but on the other hand it created challenges.',
      'It seems to me that the main problem is not the situation itself.'
    ],
    itemsToSeed: ['p_c1_challenge_1', 'p_c1_challenge_2', 'p_c1_challenge_3', 'v_sensi', 'v_zaperechyty', 'v_varto', 'v_zaznachyty', 'v_odnoho', 'v_boku']
  }
];

function shuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function renderDiagnostic(container, { onDone } = {}) {
  const progress = loadProgress();
  let stepIndex = 0; // Starts with step 0 (beginner challenge)

  // Track accuracy to perform adaptive seeding
  const results = {
    beginner: null,
    intermediate: null,
    advanced: null
  };

  function shell(partLabel, bodyHtml) {
    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <div class="diagnostic-progress">${partLabel} &middot; Challenge ${stepIndex + 1}/3</div>
        </header>
        <div class="diagnostic-body">${bodyHtml}</div>
      </div>
    `;
    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
  }

  function renderStep() {
    if (stepIndex >= CHALLENGE_STEPS.length) {
      return renderSummary();
    }

    const challenge = CHALLENGE_STEPS[stepIndex];
    const options = shuffle([challenge.en, ...challenge.distractors]);

    shell(
      `Adaptive Placement &middot; Level: ${challenge.level.toUpperCase()}`,
      `
        <p class="diagnostic-prompt-label">Select the correct English meaning for this Ukrainian sentence:</p>
        <div class="diagnostic-word" style="font-size: 22px; line-height: 1.35; margin: 16px 0;">${escapeHtml(challenge.uk)}</div>
        <div class="diagnostic-translit" style="margin-bottom: 24px;">${escapeHtml(challenge.translit)}</div>
        <div class="diagnostic-options diagnostic-options--wide">
          ${options.map((opt) => `<button class="option-btn" data-text="${escapeHtml(opt)}" style="font-size:14px; padding:10px 12px;">${escapeHtml(opt)}</button>`).join('')}
        </div>
      `
    );

    let answered = false;
    container.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const isCorrect = btn.dataset.text === challenge.en;
        results[challenge.level] = isCorrect;

        btn.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

        // Show correct choice if user missed
        if (!isCorrect) {
          container.querySelectorAll('.option-btn').forEach((b) => {
            if (b.dataset.text === challenge.en) b.classList.add('is-correct');
          });
        }

        function advanceFlow() {
          // Adaptive flow binary branching:
          if (challenge.level === 'beginner') {
            if (isCorrect) {
              stepIndex = 1;
            } else {
              stepIndex = 3;
            }
          } else if (challenge.level === 'intermediate') {
            if (isCorrect) {
              stepIndex = 2;
            } else {
              stepIndex = 3;
            }
          } else if (challenge.level === 'advanced') {
            stepIndex = 3;
          }
          renderStep();
        }

        if (isCorrect) {
          // Show follow-up question to distinguish guessing vs. fluent knowing
          setTimeout(() => {
            shell(
              `Adaptive Placement &middot; Verification`,
              `
                <div class="diagnostic-word" style="font-size: 20px; color: var(--good); font-weight: bold; margin-bottom: 12px;">Correct Answer!</div>
                <p class="diagnostic-prompt-label" style="margin-bottom: 18px; line-height: 1.45; text-align: left; color: var(--text);">
                  You correctly identified: "<em>${escapeHtml(challenge.en)}</em>"<br><br>
                  To optimize your starting level and practice drills, be completely honest:<br>
                  <strong>Did you already know this structure fluently, or did you guess / work it out?</strong>
                </p>
                <div class="diagnostic-options" style="max-width: 440px;">
                  <button class="option-btn" id="know-fluent" style="font-size:14px; padding:12px; display: flex; align-items: center; gap: 8px;">
                    <span>🌟</span> <span>I already knew it fluently (skip practicing this)</span>
                  </button>
                  <button class="option-btn" id="know-guessed" style="font-size:14px; padding:12px; display: flex; align-items: center; gap: 8px;">
                    <span>🧠</span> <span>I guessed / worked it out (keep it active to practice)</span>
                  </button>
                </div>
              `
            );

            container.querySelector('#know-fluent').addEventListener('click', () => {
              // Seed as fully known/mastered
              for (const itemId of challenge.itemsToSeed) {
                seedFromDiagnostic(progress, itemId, 'uk2en', challenge.level === 'advanced' ? 'advanced' : 'intermediate');
                seedFromDiagnostic(progress, itemId, 'en2uk', challenge.level === 'advanced' ? 'advanced' : 'intermediate');
              }
              advanceFlow();
            });

            container.querySelector('#know-guessed').addEventListener('click', () => {
              // Seed at beginner level (box 2, consecutiveCorrect 1) so it remains active in practice drills!
              for (const itemId of challenge.itemsToSeed) {
                seedFromDiagnostic(progress, itemId, 'uk2en', 'beginner');
                seedFromDiagnostic(progress, itemId, 'en2uk', 'beginner');
              }
              advanceFlow();
            });
          }, 600);
        } else {
          // If incorrect, advance automatically after 1.5 seconds
          setTimeout(advanceFlow, 1500);
        }
      });
    });
  }

  function renderSummary() {
    progress.meta.diagnosticCompletedAt = Date.now();
    saveProgress(progress);

    let levelPlanted = 'Beginner';
    if (results.advanced) {
      levelPlanted = 'Advanced (C1)';
    } else if (results.intermediate) {
      levelPlanted = 'Intermediate (B1-B2)';
    }

    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <div class="diagnostic-progress">Completed</div>
        </header>
        <div class="diagnostic-body diagnostic-summary">
          <h2>Adaptive Placement Done!</h2>
          <p>We mapped your Ukrainian sentence-building abilities using our adaptive diagnostic probe.</p>
          <ul class="summary-list" style="margin: 16px 0;">
            <li>Beginner Level Check: <strong>${results.beginner ? 'Passed (Seeded)' : 'Not Yet Passed'}</strong></li>
            <li>Intermediate Level Check: <strong>${results.intermediate === null ? 'Skipped' : results.intermediate ? 'Passed (Seeded)' : 'Not Yet Passed'}</strong></li>
            <li>Advanced Level Check: <strong>${results.advanced === null ? 'Skipped' : results.advanced ? 'Passed (Seeded)' : 'Not Yet Passed'}</strong></li>
            <li style="margin-top: 12px; color: var(--accent-2); font-weight: bold;">Estimated Placement Zone: ${levelPlanted}</li>
          </ul>
          <p>The system identified your boundary and populated your learning pool accordingly. Known structures are marked as mastered so you don't waste time on them in Drill mode!</p>
          <button class="btn-primary" id="diagnostic-continue" style="width: 100%; margin-top: 16px;">Go to Drills</button>
        </div>
      </div>
    `;
    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
    container.querySelector('#diagnostic-continue').addEventListener('click', () => onDone && onDone());
  }

  renderStep();
}

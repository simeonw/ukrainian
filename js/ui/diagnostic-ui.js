import { seedFromDiagnostic } from '../core/srs.js';
import { loadProgress, saveProgress } from '../core/storage.js';
import { LESSONS } from '../data/lessons.js';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// 4 distinct randomized question pools to find user ability boundary
const QUESTION_POOLS = {
  beginner: [
    {
      uk: 'Мені потрібна допомога.',
      translit: 'Meni potribna dopomoha.',
      en: 'I need help.',
      distractors: ['I am busy today.', 'Can you wait here?', 'I want to see you tomorrow.'],
      itemsToSeed: ['v_voda', 'v_ruka', 'v_brat', 'v_sestra', 'v_misto', 'p_need_5']
    },
    {
      uk: 'Хочу замовити каву.',
      translit: 'Khochu zamovyty kavu.',
      en: 'I want to order coffee.',
      distractors: ['Where is the station?', 'I have a big problem.', 'Do you want some tea?'],
      itemsToSeed: ['v_kava', 'v_zamovyty', 'p_want_5']
    },
    {
      uk: 'Де знаходиться вокзал?',
      translit: 'De znakhodytsya vokzal?',
      en: 'Where is the train station?',
      distractors: ['How much does it cost?', 'Can you help me?', 'I am at the airport.'],
      itemsToSeed: ['v_de', 'v_vokzal', 'v_kvytok']
    },
    {
      uk: 'Мене звати Симеон.',
      translit: 'Mene zvaty Symeon.',
      en: 'My name is Simeon.',
      distractors: ['Nice to meet you.', 'What is your name?', 'How are things today?'],
      itemsToSeed: ['v_mene_zvaty', 'v_dobryi_den']
    }
  ],
  b1: [
    {
      uk: 'Я ніколи не був в Україні.',
      translit: 'Ya nikoly ne buv v Ukrayini.',
      en: 'I have never been to Ukraine.',
      distractors: ['I already read this book.', 'When I was younger, I travelled.', 'I should go home now.'],
      itemsToSeed: ['v_nikoly', 'v_zrobyv', 'p_b1_never_1']
    },
    {
      uk: 'Справа в тому, що я не мав часу.',
      translit: 'Sprava v tomu, shcho ya ne mav chasu.',
      en: 'The thing is that I didn\'t have time.',
      distractors: ['The reason is that I was busy.', 'Compared with last year, everything is fine.', 'Unlike Czechia, it is warm here.'],
      itemsToSeed: ['v_sprava', 'p_b1_thing_1']
    },
    {
      uk: 'Коли я був молодший, я багато подорожував.',
      translit: 'Koly ya buv molodshyi, ya bahato podorozhuvav.',
      en: 'When I was younger, I travelled a lot.',
      distractors: ['I would like to see you tomorrow.', 'I was working when you wrote me.', 'The reason is that I had a lot of work.'],
      itemsToSeed: ['v_molodshyi', 'p_b1_when_1']
    },
    {
      uk: 'Порівняно з минулим роком, все добре.',
      translit: 'Porivnyano z mynulym rokom, vse dobre.',
      en: 'Compared with last year, everything is good.',
      distractors: ['Unlike Czechia, everything is expensive.', 'The thing is that I had no choice.', 'I should have checked this yesterday.'],
      itemsToSeed: ['v_porivnyano', 'p_b1_compare_2']
    }
  ],
  b2: [
    {
      uk: 'Якби я мав більше часу, я б вивчив українську швидше.',
      translit: 'Yakby ya mav bilshe chasu, ya b vyvchyv ukrayinsku shvydshe.',
      en: 'If I had more time, I would have learned Ukrainian faster.',
      distractors: ['I would go home if I was tired.', 'The thing is that I didn\'t have enough time.', 'If the situation was different, we could help.'],
      itemsToSeed: ['v_yakby', 'v_shvydshe', 'p_b2_hypo_1']
    },
    {
      uk: 'Я вважаю, що це хороша ідея.',
      translit: 'Ya vazhayu, shcho tse khorosha ideya.',
      en: 'I believe that this is a good idea.',
      distractors: ['From my point of view, it is too late.', 'As far as I know, this is resolved.', 'I understand your point, but I disagree.'],
      itemsToSeed: ['v_vazhayu', 'p_b2_opinion_1']
    },
    {
      uk: 'Він сказав, що прийде завтра.',
      translit: 'Vin skazav, shcho pryyde zavtra.',
      en: 'He said that he will come tomorrow.',
      distractors: ['She explained why she could not come.', 'He thought that this is a bad idea.', 'They said that they already left.'],
      itemsToSeed: ['p_b2_speech_1']
    },
    {
      uk: 'Я частково погоджуюся, але маю сумніви.',
      translit: 'Ya chastkovo pohodzhuyusya, ale mayu sumnivy.',
      en: 'I partly agree, but I have doubts.',
      distractors: ['I understand your point, however I disagree.', 'I do not completely agree with this decision.', 'I believe we should make another choice.'],
      itemsToSeed: ['v_chastkovo', 'v_pohodzhuyusya', 'v_odnak', 'p_b2_agree_1']
    }
  ],
  c1: [
    {
      uk: 'Якби я знав тоді те, що знаю зараз, я б прийняв зовсім інше рішення.',
      translit: 'Yakby ya znav todi te, shcho znayu zaraz, ya b pryynyav zovsim inshe rishennya.',
      en: 'If I had known then what I know now, I would have made a completely different decision.',
      distractors: ['Despite the situation being difficult, we found a decision.', 'On one hand technology simplified our lives, on the other hand it created challenges.', 'It cannot be denied that language changes under the influence of society.'],
      itemsToSeed: ['p_c1_challenge_1']
    },
    {
      uk: 'Незважаючи на те, що ситуація була складною, нам вдалося знайти рішення.',
      translit: 'Nezvazhayuchy na te, shcho sytuatsiya bula skladnoyu, nam vdalosya znayty rishennya.',
      en: 'Despite the situation being difficult, we managed to find a solution.',
      distractors: ['It seems to me that the main problem is not the situation.', 'This led to the fact that we were late for the meeting.', 'By the time I arrived, they already finished.'],
      itemsToSeed: ['p_c1_challenge_2']
    },
    {
      uk: 'З одного боку, це хороше рішення, з іншого боку, воно створює проблеми.',
      translit: 'Z odnoho boku, tse khoroshe rishennya, z inshoho boku, vono stvoryuye problemy.',
      en: 'On one hand, this is a good decision, on the other hand, it creates problems.',
      distractors: ['The main problem is that there is a lack of resources.', 'I do not so much disagree with this as I think it is early.', 'Before making a decision, you should think.'],
      itemsToSeed: ['v_odnoho', 'v_boku', 'p_c1_arg_1']
    },
    {
      uk: 'Не можна заперечувати, що мова змінюється під впливом суспільства.',
      translit: 'Ne mozhna zaperechyty, shcho mova zminyyetsya pid vplyvom suspilstva.',
      en: 'It cannot be denied that language changes under the influence of society.',
      distractors: ['It is worth noting that the rules have changed recently.', 'In a certain sense, he is completely correct.', 'I think that technology changed the way we talk.'],
      itemsToSeed: ['v_sensi', 'v_zaperechyty', 'v_suspilstvo', 'p_c1_challenge_5']
    }
  ]
};

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
  const settings = progress.meta.settings;
  const showTranslit = settings.transliteration;
  const useCzech = settings.language === 'cz';

  // Dynamic adaptive diagnostic session state
  let currentDifficulty = 'b1'; // start at balanced intermediate (B1)
  let questionIndex = 0;
  let maxQuestions = 5; // minimum of 5 questions

  // Track detailed responses for Level/Confidence algorithms
  const history = [];

  function shell(partLabel, bodyHtml) {
    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <div class="diagnostic-progress">${partLabel} &middot; Question ${questionIndex + 1}/${maxQuestions}</div>
        </header>
        <div class="diagnostic-body">${bodyHtml}</div>
      </div>
    `;
    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
  }

  function renderStep() {
    if (questionIndex >= maxQuestions) {
      return renderSummary();
    }

    // Select pool and draw a random question without repeating in current history
    const pool = QUESTION_POOLS[currentDifficulty];
    const usedUks = new Set(history.map(h => h.question.uk));
    let available = pool.filter(q => !usedUks.has(q.uk));
    if (available.length === 0) available = pool; // fallback if pool exhausted

    const challenge = available[Math.floor(Math.random() * available.length)];
    const options = shuffle([challenge.en, ...challenge.distractors]);

    // Record dynamic millisecond start time
    challenge.startTime = Date.now();

    shell(
      `Adaptive placement test`,
      `
        <p class="diagnostic-prompt-label">${useCzech ? 'Vyberte správný český/anglický význam:' : 'Select the correct English meaning for this Ukrainian sentence:'}</p>
        <div class="diagnostic-word" style="font-size: 21px; line-height: 1.35; margin: 16px 0;">${escapeHtml(challenge.uk)}</div>
        ${showTranslit ? `<div class="diagnostic-translit" style="margin-bottom: 24px;">${escapeHtml(challenge.translit)}</div>` : '<div style="margin-bottom: 24px;"></div>'}
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

        // Calculate millisecond latency and threshold dynamically based on words count
        const timeTaken = (Date.now() - challenge.startTime) / 1000;
        const words = challenge.uk.split(/\s+/).length;
        const threshold = 3 + words * 1.5;
        const isFluent = timeTaken <= threshold;

        const isCorrect = btn.dataset.text === challenge.en;
        btn.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');

        if (!isCorrect) {
          container.querySelectorAll('.option-btn').forEach((b) => {
            if (b.dataset.text === challenge.en) b.classList.add('is-correct');
          });
        }

        function advanceFlow(knownType = 'incorrect') {
          history.push({
            question: challenge,
            level: currentDifficulty,
            isCorrect: isCorrect,
            knownType: knownType,
            latency: timeTaken
          });

          // Dynamic adaptive branching
          if (isCorrect) {
            if (knownType === 'fluent') {
              if (currentDifficulty === 'beginner') currentDifficulty = 'b1';
              else if (currentDifficulty === 'b1') currentDifficulty = 'b2';
              else if (currentDifficulty === 'b2') currentDifficulty = 'c1';
            } else {
              // Guessed or took too long to work out: stay on level to gather more precision
            }
          } else {
            if (currentDifficulty === 'c1') currentDifficulty = 'b2';
            else if (currentDifficulty === 'b2') currentDifficulty = 'b1';
            else if (currentDifficulty === 'b1') currentDifficulty = 'beginner';
          }

          questionIndex += 1;
          renderStep();
        }

        if (isCorrect) {
          // LATENCY ADAPTIVE SEEDING:
          // If correct within fluency threshold, automatically classify as fluent!
          // If correct but slow, automatically classify as worked-out (no clicks/honest popup needed)!
          if (isFluent) {
            // Seed as fully known/mastered
            for (const itemId of challenge.itemsToSeed) {
              seedFromDiagnostic(progress, itemId, 'uk2en', currentDifficulty === 'c1' ? 'advanced' : 'intermediate');
              seedFromDiagnostic(progress, itemId, 'en2uk', currentDifficulty === 'c1' ? 'advanced' : 'intermediate');
            }

            // Show feedback
            const containerBody = container.querySelector('.diagnostic-body');
            const feedbackText = document.createElement('div');
            feedbackText.style.color = 'var(--good)';
            feedbackText.style.fontWeight = 'bold';
            feedbackText.style.marginTop = '16px';
            feedbackText.innerHTML = `🌟 Fast &amp; Fluent! (${timeTaken.toFixed(1)}s)`;
            containerBody.appendChild(feedbackText);

            setTimeout(() => advanceFlow('fluent'), 1400);
          } else {
            // Worked out (took time to translate): seed at beginner level (box 2) for practice drills!
            for (const itemId of challenge.itemsToSeed) {
              seedFromDiagnostic(progress, itemId, 'uk2en', 'beginner');
              seedFromDiagnostic(progress, itemId, 'en2uk', 'beginner');
            }

            // Show encouraging worked-out feedback
            const containerBody = container.querySelector('.diagnostic-body');
            const feedbackText = document.createElement('div');
            feedbackText.style.color = 'var(--warn)';
            feedbackText.style.fontWeight = 'bold';
            feedbackText.style.marginTop = '16px';
            feedbackText.innerHTML = `🧠 Worked out! Great persistency! (${timeTaken.toFixed(1)}s)`;
            containerBody.appendChild(feedbackText);

            setTimeout(() => advanceFlow('guessed'), 2000);
          }
        } else {
          setTimeout(() => advanceFlow('incorrect'), 1500);
        }
      });
    });
  }

  function renderSummary() {
    progress.meta.diagnosticCompletedAt = Date.now();
    saveProgress(progress);

    // Calculate level placement and confidence index
    const correctCount = history.filter(h => h.isCorrect).length;
    const fluentCorrect = history.filter(h => h.isCorrect && h.knownType === 'fluent');
    const guessedCorrect = history.filter(h => h.isCorrect && h.knownType === 'guessed');

    // Deduce highest fluent tier passed
    let suggestedLevel = 'Beginner (Survival)';
    const fluentLevels = new Set(fluentCorrect.map(f => f.level));
    if (fluentLevels.has('c1')) {
      suggestedLevel = 'Advanced (C1)';
    } else if (fluentLevels.has('b2')) {
      suggestedLevel = 'Upper-Intermediate (B2)';
    } else if (fluentLevels.has('b1')) {
      suggestedLevel = 'Intermediate (B1)';
    } else if (correctCount >= 3) {
      suggestedLevel = 'Elementary (A2)';
    }

    // Confidence score based on correctness and speed
    let confidence = 'Low Confidence';
    if (correctCount > 0) {
      const fluentRatio = fluentCorrect.length / correctCount;
      if (fluentRatio >= 0.75 && correctCount >= 3) {
        confidence = 'High Confidence';
      } else if (fluentRatio >= 0.4) {
        confidence = 'Medium Confidence';
      }
    }

    container.innerHTML = `
      <div class="diagnostic-screen">
        <header class="diagnostic-header">
          <button class="btn-back" type="button">&larr; Menu</button>
          <div class="diagnostic-progress">Results</div>
        </header>
        <div class="diagnostic-body diagnostic-summary" style="text-align: left; align-items: flex-start; justify-content: flex-start;">
          <h2 style="color: var(--accent); margin-bottom: 6px;">Evaluation Profile</h2>
          <p style="margin: 0 0 16px 0; font-size: 14px; color: var(--text-dim); line-height: 1.4;">
            Our adaptive algorithm mapped your boundary and determined a suggested starting profile based on fluent structures vs. context-guessed ones.
          </p>

          <div style="background: var(--surface-2); border: 1px solid var(--border); padding: 14px; border-radius: var(--radius-sm); width: 100%; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; font-size: 15px;">
              <span>Suggested Level:</span>
              <strong style="color: var(--good);">${suggestedLevel}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 15px;">
              <span>Confidence Judgment:</span>
              <strong style="color: ${confidence.includes('High') ? 'var(--good)' : confidence.includes('Medium') ? 'var(--warn)' : 'var(--bad)'};">${confidence}</strong>
            </div>
          </div>

          <ul class="summary-list" style="font-size: 13px; line-height: 1.5; color: var(--text-dim); margin-bottom: 20px;">
            <li>Total adaptive questions answered: <strong>${history.length}</strong></li>
            <li>Correct answers: <strong>${correctCount} / ${history.length}</strong></li>
            <li>Fluent structures (Fast correct): <strong>${fluentCorrect.length}</strong></li>
            <li>Worked-out / Guessed (Slow correct): <strong>${guessedCorrect.length}</strong></li>
          </ul>

          <p style="font-size: 13px; color: var(--text-dim); line-height: 1.45; margin-bottom: 24px;">
            The worked-out structures remain active in learning rotation (box 2) so they keep coming up in Drills for reinforcement! Fluent structures were seeded as mastered to save you time.
          </p>

          <!-- Adaptive refinement action buttons -->
          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <button class="btn-primary" id="diagnostic-refine-btn" style="background: var(--warn); color: #05101f; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>🔍</span> <span>Continue to Further Refine (+3 Questions)</span>
            </button>
            <button class="btn-primary" id="diagnostic-continue">Go to Practice Drills</button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('.btn-back').addEventListener('click', () => onDone && onDone());
    container.querySelector('#diagnostic-continue').addEventListener('click', () => onDone && onDone());

    // "Continue to Further Refine" action increases maxQuestions by 3 and continues the loop dynamically!
    container.querySelector('#diagnostic-refine-btn').addEventListener('click', () => {
      maxQuestions += 3;
      renderStep();
    });
  }

  renderStep();
}

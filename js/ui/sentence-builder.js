import { ADVANCED_SENTENCES } from '../data/advanced-sentences.js';
import { loadProgress, saveProgress } from '../core/storage.js';

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getNGrams(str, n) {
  const ngrams = [];
  for (let i = 0; i <= str.length - n; i++) {
    ngrams.push(str.substring(i, i + n));
  }
  return ngrams;
}

function calculateJaccard(setA, setB) {
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

function computeSimilarity(str1, str2) {
  const norm1 = str1.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();
  const norm2 = str2.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();

  if (norm1 === norm2) return 1.0;
  if (!norm1 || !norm2) return 0.0;

  const words1 = new Set(norm1.split(" "));
  const words2 = new Set(norm2.split(" "));
  const wordJaccard = calculateJaccard(words1, words2);

  const trigrams1 = new Set(getNGrams(norm1, 3));
  const trigrams2 = new Set(getNGrams(norm2, 3));
  const trigramJaccard = calculateJaccard(trigrams1, trigrams2);

  const bigrams1 = new Set(getNGrams(norm1, 2));
  const bigrams2 = new Set(getNGrams(norm2, 2));
  const bigramJaccard = calculateJaccard(bigrams1, bigrams2);

  return (wordJaccard * 0.4) + (trigramJaccard * 0.4) + (bigramJaccard * 0.2);
}

export function getBestSimilarityScore(userInput, acceptedList) {
  let bestScore = 0;
  let bestMatch = "";
  for (const accepted of acceptedList) {
    const score = computeSimilarity(userInput, accepted);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = accepted;
    }
  }
  return { score: bestScore, match: bestMatch };
}

// Ensure sentence builder state exists in progress
function getSentenceBuilderProgress(progress) {
  if (!progress.sentenceBuilder) {
    progress.sentenceBuilder = {
      completedSentences: {},
      metrics: {
        understandLongerSentences: 0,
        modifyPatterns: 0,
        expressNewIdeas: 0,
        surviveConversation: 0
      }
    };
  }
  return progress.sentenceBuilder;
}

export function renderSentenceBuilder(container, { onExit } = {}) {
  let progress = loadProgress();
  let sbProgress = getSentenceBuilderProgress(progress);
  let activeSentence = null;
  let activeStepIndex = 0; // 0 = Czech Bridge, 1 = Ex 1, 2 = Ex 2, 3 = Ex 3, 4 = Ex 4, 5 = Complete

  function save() {
    saveProgress(progress);
  }

  function renderDashboard() {
    const completedCount = Object.keys(sbProgress.completedSentences).length;
    const totalCount = ADVANCED_SENTENCES.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100) || 0;

    // Calculate metrics dynamically based on accomplishments
    const understandVal = Math.min(100, (completedCount * 18));
    const modifyVal = Math.min(100, (completedCount * 15));
    const expressVal = Math.min(100, (completedCount * 12));
    const surviveVal = Math.min(100, Math.round((completedCount / totalCount) * 100));

    sbProgress.metrics.understandLongerSentences = understandVal;
    sbProgress.metrics.modifyPatterns = modifyVal;
    sbProgress.metrics.expressNewIdeas = expressVal;
    sbProgress.metrics.surviveConversation = surviveVal;

    container.innerHTML = `
      <div class="sentence-builder-screen">
        <header class="lessons-header">
          <button class="btn-back" id="exit-sb" type="button">&larr; Menu</button>
          <h2>Sentence Builder</h2>
        </header>

        <div class="sb-intro-card">
          <p class="sb-intro-text">
            Build understandable Ukrainian sentences with reusable grammar patterns.
            Leverage your Czech background to unlock complex sentences.
          </p>
        </div>

        <section class="lesson-section sb-metrics-section">
          <h3>New Success Metrics (Dashboard)</h3>
          <div class="sb-metric-item">
            <div class="sb-metric-label">
              <span>Can understand longer sentences:</span>
              <span><strong>${understandVal}%</strong></span>
            </div>
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${understandVal}%"></div></div>
          </div>
          <div class="sb-metric-item">
            <div class="sb-metric-label">
              <span>Can modify a pattern:</span>
              <span><strong>${modifyVal}%</strong></span>
            </div>
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${modifyVal}%"></div></div>
          </div>
          <div class="sb-metric-item">
            <div class="sb-metric-label">
              <span>Can express new ideas:</span>
              <span><strong>${expressVal}%</strong></span>
            </div>
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${expressVal}%"></div></div>
          </div>
          <div class="sb-metric-item">
            <div class="sb-metric-label">
              <span>Can survive a conversation:</span>
              <span><strong>${surviveVal}%</strong></span>
            </div>
            <div class="progress-bar"><div class="progress-bar-fill" style="width:${surviveVal}%"></div></div>
          </div>
        </section>

        <div class="sb-levels-list">
          ${[1, 2, 3, 4, 5].map(level => {
            const levelSentences = ADVANCED_SENTENCES.filter(s => s.level === level);
            const levelDone = levelSentences.every(s => sbProgress.completedSentences[s.id]);
            const levelProgressCount = levelSentences.filter(s => sbProgress.completedSentences[s.id]).length;

            let levelTitle = "";
            let levelFocus = "";
            if (level === 1) { levelTitle = "Level 1: Single Pattern"; levelFocus = "Хочу + infinitive, міг би + infinitive"; }
            if (level === 2) { levelTitle = "Level 2: Two Patterns / Clauses"; levelFocus = "Хочу прийти, але не можу; якщо + future"; }
            if (level === 3) { levelTitle = "Level 3: Multiple Clauses"; levelFocus = "тому що (because), бо (because), через те що"; }
            if (level === 4) { levelTitle = "Level 4: Natural Conversation"; levelFocus = "чи (whether), past continuous, але ще не"; }
            if (level === 5) { levelTitle = "Level 5: Real Native-Like"; levelFocus = "якби (conditional counterfactuals), із задоволенням"; }

            return `
              <div class="sb-level-card ${levelDone ? 'level-complete' : ''}">
                <div class="sb-level-header">
                  <div class="sb-level-title">${levelTitle}</div>
                  <div class="sb-level-status">${levelProgressCount}/${levelSentences.length} complete</div>
                </div>
                <div class="sb-level-focus">${levelFocus}</div>
                <div class="sb-sentences-grid">
                  ${levelSentences.map(s => {
                    const isDone = sbProgress.completedSentences[s.id];
                    return `
                      <button class="sb-sentence-btn ${isDone ? 'is-done' : ''}" data-id="${s.id}">
                        <span class="sb-sentence-status-dot"></span>
                        <span class="sb-sentence-text">${escapeHtml(s.uk)}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    container.querySelector('#exit-sb').addEventListener('click', () => {
      onExit && onExit();
    });

    container.querySelectorAll('.sb-sentence-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sentenceId = btn.dataset.id;
        startSentenceJourney(sentenceId);
      });
    });
  }

  function startSentenceJourney(sentenceId) {
    activeSentence = ADVANCED_SENTENCES.find(s => s.id === sentenceId);
    activeStepIndex = 0; // Reset to Czech Bridge
    renderActiveStep();
  }

  function renderActiveStep() {
    if (activeStepIndex === 0) {
      renderCzechBridge();
    } else if (activeStepIndex === 1) {
      renderEx1();
    } else if (activeStepIndex === 2) {
      renderEx2();
    } else if (activeStepIndex === 3) {
      renderEx3();
    } else if (activeStepIndex === 4) {
      renderEx4();
    } else {
      renderSentenceComplete();
    }
  }

  function renderStepHeader(stepTitle) {
    return `
      <div class="sb-step-header">
        <button class="btn-back" id="back-to-dashboard">&larr; Dashboard</button>
        <div class="sb-step-indicators">
          <span class="sb-dot ${activeStepIndex === 0 ? 'active' : ''} ${activeStepIndex > 0 ? 'passed' : ''}" title="Czech Bridge"></span>
          <span class="sb-dot ${activeStepIndex === 1 ? 'active' : ''} ${activeStepIndex > 1 ? 'passed' : ''}" title="Ex 1: Meaning"></span>
          <span class="sb-dot ${activeStepIndex === 2 ? 'active' : ''} ${activeStepIndex > 2 ? 'passed' : ''}" title="Ex 2: Words"></span>
          <span class="sb-dot ${activeStepIndex === 3 ? 'active' : ''} ${activeStepIndex > 3 ? 'passed' : ''}" title="Ex 3: Builder"></span>
          <span class="sb-dot ${activeStepIndex === 4 ? 'active' : ''} ${activeStepIndex > 4 ? 'passed' : ''}" title="Ex 4: Reverse"></span>
        </div>
      </div>
      <h3 class="sb-step-title">${stepTitle}</h3>
    `;
  }

  function renderCzechBridge() {
    container.innerHTML = `
      <div class="sb-journey-screen">
        ${renderStepHeader("Czech Bridge Connection")}

        <div class="sb-card">
          <div class="sb-card-label">Ukrainian</div>
          <div class="sb-card-uk">${escapeHtml(activeSentence.uk)}</div>
          <div class="sb-card-translit">${escapeHtml(activeSentence.translit)}</div>

          <div class="sb-bridge-row">
            <div class="sb-bridge-col">
              <div class="sb-card-label">English</div>
              <div class="sb-card-en">${escapeHtml(activeSentence.en)}</div>
            </div>
            <div class="sb-bridge-col">
              <div class="sb-card-label">Czech Comparison</div>
              <div class="sb-card-cz">🇨🇿 ${escapeHtml(activeSentence.cz)}</div>
            </div>
          </div>

          <div class="sb-bridge-explanation">
            <p>${escapeHtml(activeSentence.czBridgeExplanation)}</p>
          </div>
        </div>

        <button class="btn-primary sb-next-btn" id="sb-bridge-next">Let's build it &rarr;</button>
      </div>
    `;

    container.querySelector('#back-to-dashboard').addEventListener('click', renderDashboard);
    container.querySelector('#sb-bridge-next').addEventListener('click', () => {
      activeStepIndex = 1;
      renderActiveStep();
    });
  }

  function renderEx1() {
    container.innerHTML = `
      <div class="sb-journey-screen">
        ${renderStepHeader("Exercise 1: Fuzzy Meaning Matching")}

        <div class="sb-instruction">Translate this Ukrainian sentence into English in your own words:</div>

        <div class="sb-prompt-card">
          <div class="sb-prompt-uk">${escapeHtml(activeSentence.uk)}</div>
          <div class="sb-prompt-translit">${escapeHtml(activeSentence.translit)}</div>
        </div>

        <div class="sb-input-area">
          <textarea id="ex1-user-input" class="sb-textarea" placeholder="Type your English translation here..."></textarea>
          <div class="sb-input-actions">
            <button class="btn-secondary" id="ex1-hint-btn">Show Hint</button>
            <button class="btn-primary" id="ex1-check-btn">Check Translation</button>
          </div>
        </div>

        <div id="ex1-feedback" class="sb-feedback-container hidden"></div>

        <button class="btn-primary sb-next-btn hidden" id="ex1-continue-btn">Continue to Words &rarr;</button>
      </div>
    `;

    const inputEl = container.querySelector('#ex1-user-input');
    const checkBtn = container.querySelector('#ex1-check-btn');
    const hintBtn = container.querySelector('#ex1-hint-btn');
    const feedbackEl = container.querySelector('#ex1-feedback');
    const continueBtn = container.querySelector('#ex1-continue-btn');

    container.querySelector('#back-to-dashboard').addEventListener('click', renderDashboard);

    hintBtn.addEventListener('click', () => {
      feedbackEl.className = "sb-feedback-container sb-info-feedback";
      feedbackEl.innerHTML = `
        <div class="sb-feedback-title">💡 Hint</div>
        <div class="sb-feedback-text">A possible translation starts with: <strong>"${escapeHtml(activeSentence.en.split(' ').slice(0, 3).join(' '))}..."</strong></div>
      `;
      feedbackEl.classList.remove('hidden');
    });

    checkBtn.addEventListener('click', () => {
      const userInput = inputEl.value.trim();
      if (!userInput) {
        feedbackEl.className = "sb-feedback-container sb-error-feedback";
        feedbackEl.innerHTML = "Please type something before checking.";
        feedbackEl.classList.remove('hidden');
        return;
      }

      const { score, match } = getBestSimilarityScore(userInput, activeSentence.acceptedEnglish);
      const scorePct = Math.round(score * 100);

      feedbackEl.classList.remove('hidden');
      if (score >= 0.68) {
        // Acceptable match!
        feedbackEl.className = "sb-feedback-container sb-success-feedback";
        feedbackEl.innerHTML = `
          <div class="sb-feedback-title">✅ Acceptable Match! (${scorePct}% Similarity)</div>
          <div class="sb-feedback-text"><strong>Your translation:</strong> "${escapeHtml(userInput)}"</div>
          <div class="sb-feedback-reference"><strong>Expected Reference:</strong> "${escapeHtml(activeSentence.en)}"</div>
        `;
        // Show continue button, hide check/hint buttons
        continueBtn.classList.remove('hidden');
        checkBtn.classList.add('hidden');
        hintBtn.classList.add('hidden');
        inputEl.disabled = true;

        // Dynamically boost metric
        sbProgress.metrics.understandLongerSentences = Math.min(100, sbProgress.metrics.understandLongerSentences + 5);
        save();
      } else {
        // Poor match
        feedbackEl.className = "sb-feedback-container sb-error-feedback";
        feedbackEl.innerHTML = `
          <div class="sb-feedback-title">❌ Keep trying (${scorePct}% match)</div>
          <div class="sb-feedback-text">Your translation does not fully capture the patterns or words. Try re-reading the Czech comparison or use 'Show Hint'.</div>
          <button class="btn-text" id="ex1-force-reveal" style="margin-top:8px; display:block;">I'm stuck, show solution</button>
        `;

        container.querySelector('#ex1-force-reveal').addEventListener('click', () => {
          inputEl.value = activeSentence.en;
          feedbackEl.className = "sb-feedback-container sb-success-feedback";
          feedbackEl.innerHTML = `
            <div class="sb-feedback-title">Reference solution filled in</div>
            <div class="sb-feedback-reference"><strong>Expected:</strong> "${escapeHtml(activeSentence.en)}"</div>
          `;
          continueBtn.classList.remove('hidden');
          checkBtn.classList.add('hidden');
          hintBtn.classList.add('hidden');
          inputEl.disabled = true;
        });
      }
    });

    continueBtn.addEventListener('click', () => {
      activeStepIndex = 2;
      renderActiveStep();
    });
  }

  function renderEx2() {
    const rawWords = activeSentence.uk.split(/\s+/);
    const learnableWords = activeSentence.words || [];
    const completedWords = new Set();

    container.innerHTML = `
      <div class="sb-journey-screen">
        ${renderStepHeader("Exercise 2: Tap Word Explanation")}

        <div class="sb-instruction">Tap the highlighted words to inspect their grammar, test your understanding of their meaning, and explore related vocabulary:</div>

        <div class="sb-tappable-sentence-box">
          ${rawWords.map((word, index) => {
            const clean = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"«»]/g, "").toLowerCase().trim();
            const isLearnable = learnableWords.some(lw => lw.word.toLowerCase() === clean);
            return `
              <button class="sb-tap-word-btn ${isLearnable ? 'is-learnable' : ''}" data-word-clean="${escapeHtml(clean)}" data-index="${index}">
                ${escapeHtml(word)}
                ${isLearnable ? '<span class="sb-word-dot"></span>' : ''}
              </button>
            `;
          }).join(' ')}
        </div>

        <div id="sb-word-explanation-panel" class="sb-explanation-panel empty">
          <div class="sb-empty-panel-text">Tap any highlighted word above to reveal its grammatical profile and quiz its meaning.</div>
        </div>

        <button class="btn-primary sb-next-btn hidden" id="ex2-continue-btn">Continue to Sentence Builder &rarr;</button>
      </div>
    `;

    const explanationPanel = container.querySelector('#sb-word-explanation-panel');
    const continueBtn = container.querySelector('#ex2-continue-btn');

    container.querySelector('#back-to-dashboard').addEventListener('click', renderDashboard);

    function checkOverallCompletion() {
      const allDone = learnableWords.every(lw => completedWords.has(lw.word.toLowerCase()));
      if (allDone) {
        continueBtn.classList.remove('hidden');
        sbProgress.metrics.understandLongerSentences = Math.min(100, sbProgress.metrics.understandLongerSentences + 5);
        save();
      }
    }

    container.querySelectorAll('.sb-tap-word-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all
        container.querySelectorAll('.sb-tap-word-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const clean = btn.dataset.wordClean;
        const matchedWord = learnableWords.find(lw => lw.word.toLowerCase() === clean);

        if (!matchedWord) {
          explanationPanel.className = "sb-explanation-panel is-simple";
          explanationPanel.innerHTML = `
            <div class="sb-simple-word-title">"${escapeHtml(btn.textContent.trim())}"</div>
            <p class="sb-simple-word-desc">This is a connector word or already introduced basic form.</p>
          `;
          return;
        }

        // Render learnable interactive panel
        renderWordQuiz(matchedWord);
      });
    });

    function renderWordQuiz(matchedWord) {
      const isAlreadyCompleted = completedWords.has(matchedWord.word.toLowerCase());
      explanationPanel.className = "sb-explanation-panel is-interactive";

      if (isAlreadyCompleted) {
        renderDetails(matchedWord);
      } else {
        explanationPanel.innerHTML = `
          <div class="sb-quiz-word-title">How do you translate: <strong>"${escapeHtml(matchedWord.word)}"</strong>?</div>
          <div class="sb-quiz-options">
            ${matchedWord.options.map((opt, i) => `
              <button class="sb-quiz-opt-btn" data-correct="${opt.correct}" data-index="${i}">
                ${escapeHtml(opt.text)}
              </button>
            `).join('')}
          </div>
          <div id="sb-quiz-feedback" class="sb-quiz-feedback hidden"></div>
        `;

        explanationPanel.querySelectorAll('.sb-quiz-opt-btn').forEach(optBtn => {
          optBtn.addEventListener('click', () => {
            const isCorrect = optBtn.dataset.correct === 'true';
            const feedbackBox = explanationPanel.querySelector('#sb-quiz-feedback');

            explanationPanel.querySelectorAll('.sb-quiz-opt-btn').forEach(ob => ob.disabled = true);

            if (isCorrect) {
              optBtn.classList.add('correct');
              feedbackBox.className = "sb-quiz-feedback success";
              feedbackBox.innerHTML = "🎉 Correct meaning! Loading full grammar analysis...";
              completedWords.add(matchedWord.word.toLowerCase());

              setTimeout(() => {
                renderDetails(matchedWord);
                checkOverallCompletion();
              }, 1200);
            } else {
              optBtn.classList.add('incorrect');
              feedbackBox.className = "sb-quiz-feedback error";
              feedbackBox.innerHTML = "Not quite. Try choosing another option.";

              setTimeout(() => {
                renderWordQuiz(matchedWord); // let them retry
              }, 1200);
            }
          });
        });
      }
    }

    function renderDetails(matchedWord) {
      explanationPanel.className = "sb-explanation-panel is-details";
      explanationPanel.innerHTML = `
        <div class="sb-details-header">
          <span class="sb-details-word">"${escapeHtml(matchedWord.word)}"</span>
          <span class="sb-details-meaning-badge">✓ Learned</span>
        </div>

        <div class="sb-details-section">
          <div class="sb-details-label">Grammar Analysis</div>
          <p class="sb-details-text">${escapeHtml(matchedWord.grammar)}</p>
        </div>

        <div class="sb-details-section">
          <div class="sb-details-label">Related Forms & Phrases</div>
          <ul class="sb-details-related-list">
            ${matchedWord.related.map(rel => `
              <li>${escapeHtml(rel)}</li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    continueBtn.addEventListener('click', () => {
      activeStepIndex = 3;
      renderActiveStep();
    });
  }

  function renderEx3() {
    const originalWords = activeSentence.builderWords;
    let shuffledPool = [...originalWords].sort(() => Math.random() - 0.5);
    let constructedWords = [];
    let phase = 1; // 1 = Reordering, 2 = Transformation

    function renderUI() {
      if (phase === 1) {
        container.innerHTML = `
          <div class="sb-journey-screen">
            ${renderStepHeader("Exercise 3: Sentence Builder & Reordering")}

            <div class="sb-instruction">Build the original Ukrainian sentence by tapping word chips in the correct order:</div>

            <div class="sb-builder-target-en">"${escapeHtml(activeSentence.en)}"</div>

            <div class="sb-constructed-sentence-box">
              ${constructedWords.length === 0
                ? '<span class="sb-builder-placeholder">Tap words below to build sentence...</span>'
                : constructedWords.map((w, idx) => `
                    <button class="sb-builder-chip constructed" data-index="${idx}">${escapeHtml(w)}</button>
                  `).join(' ')
              }
            </div>

            <div class="sb-pool-sentence-box">
              ${shuffledPool.map((w, idx) => `
                <button class="sb-builder-chip pool" data-index="${idx}">${escapeHtml(w)}</button>
              `).join(' ')}
            </div>

            <div id="sb-builder-feedback" class="sb-feedback-container hidden"></div>

            <div class="sb-builder-actions">
              <button class="btn-secondary" id="sb-builder-reset">Reset</button>
              <button class="btn-primary" id="sb-builder-check" ${constructedWords.length === originalWords.length ? '' : 'disabled'}>Check Construction</button>
            </div>
          </div>
        `;

        // Wire events for Phase 1
        container.querySelector('#back-to-dashboard').addEventListener('click', renderDashboard);
        container.querySelector('#sb-builder-reset').addEventListener('click', () => {
          shuffledPool = [...originalWords].sort(() => Math.random() - 0.5);
          constructedWords = [];
          renderUI();
        });

        container.querySelectorAll('.sb-builder-chip.pool').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            const word = shuffledPool[idx];
            constructedWords.push(word);
            shuffledPool.splice(idx, 1);
            renderUI();
          });
        });

        container.querySelectorAll('.sb-builder-chip.constructed').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            const word = constructedWords[idx];
            shuffledPool.push(word);
            constructedWords.splice(idx, 1);
            renderUI();
          });
        });

        const checkBtn = container.querySelector('#sb-builder-check');
        if (checkBtn) {
          checkBtn.addEventListener('click', () => {
            const joinedConstructed = constructedWords.join(' ').replace(/\s+([.,!?;:])/g, '$1');
            const joinedOriginal = originalWords.join(' ').replace(/\s+([.,!?;:])/g, '$1');

            const feedbackBox = container.querySelector('#sb-builder-feedback');
            feedbackBox.classList.remove('hidden');

            if (joinedConstructed.toLowerCase() === joinedOriginal.toLowerCase()) {
              feedbackBox.className = "sb-feedback-container sb-success-feedback";
              feedbackBox.innerHTML = `
                <div class="sb-feedback-title">🎉 Perfect Construction!</div>
                <div class="sb-feedback-text">"${escapeHtml(joinedConstructed)}"</div>
              `;

              setTimeout(() => {
                // If there are variations defined, move to Phase 2. Otherwise finish.
                if (activeSentence.variations && activeSentence.variations.length > 0) {
                  phase = 2;
                  renderUI();
                } else {
                  activeStepIndex = 4;
                  renderActiveStep();
                }
              }, 1800);
            } else {
              feedbackBox.className = "sb-feedback-container sb-error-feedback";
              feedbackBox.innerHTML = `
                <div class="sb-feedback-title">Incorrect Order</div>
                <div class="sb-feedback-text">The sentence syntax isn't quite right. Keep in mind the Czech word order!</div>
              `;
            }
          });
        }

      } else {
        // Phase 2: Transformations / Variations
        const variations = activeSentence.variations || [];
        container.innerHTML = `
          <div class="sb-journey-screen">
            ${renderStepHeader("Exercise 3: Grammatical Transformation")}

            <div class="sb-instruction">Excellent. Now let's try transforming this pattern! Re-use the sentence elements to express a variation:</div>

            <div class="sb-variation-prompt-box">
              <div class="sb-variation-desc"><strong>Transformation Challenge:</strong></div>
              <div class="sb-variation-challenge-text"></div>
            </div>

            <div class="sb-constructed-sentence-box sb-variation-sentence-display">
              ${originalWords.map(w => `<span class="sb-static-word-chip">${escapeHtml(w)}</span>`).join(' ')}
            </div>

            <div class="sb-variation-options-grid"></div>

            <div id="sb-variation-feedback" class="sb-feedback-container hidden"></div>

            <button class="btn-primary sb-next-btn hidden" id="ex3-continue-btn">Continue to Reverse Construction &rarr;</button>
          </div>
        `;

        container.querySelector('#back-to-dashboard').addEventListener('click', renderDashboard);

        let activeVarIndex = 0;
        const challengeTextEl = container.querySelector('.sb-variation-challenge-text');
        const optionsGridEl = container.querySelector('.sb-variation-options-grid');
        const feedbackEl = container.querySelector('#sb-variation-feedback');
        const continueBtn = container.querySelector('#ex3-continue-btn');
        const sentenceDisplayEl = container.querySelector('.sb-variation-sentence-display');

        function loadVariationChallenge() {
          feedbackEl.classList.add('hidden');
          const currentVar = variations[activeVarIndex];
          if (!currentVar) {
            // All variations completed!
            sentenceDisplayEl.innerHTML = `🏆 All variations complete!`;
            continueBtn.classList.remove('hidden');
            challengeTextEl.innerHTML = "You mastered the transformations!";
            optionsGridEl.innerHTML = "";
            return;
          }

          challengeTextEl.textContent = currentVar.description;

          // Render options representing the correct replacements
          // Generate distractor replacements
          const correctReplacementText = currentVar.replacement.join(' ');
          const distractor1 = currentVar.replacement.map(w => w + "мо").join(' '); // mock plurals
          const distractor2 = currentVar.replacement.map(w => "не " + w).join(' '); // mock negation

          const optionCandidates = [
            { text: correctReplacementText, isCorrect: true, replacement: currentVar.replacement },
            { text: distractor1, isCorrect: false },
            { text: distractor2, isCorrect: false }
          ].sort(() => Math.random() - 0.5);

          optionsGridEl.innerHTML = optionCandidates.map(opt => `
            <button class="sb-variation-option-btn" data-correct="${opt.isCorrect}">
              Swap with: <strong>"${escapeHtml(opt.text)}"</strong>
            </button>
          `).join('');

          optionsGridEl.querySelectorAll('.sb-variation-option-btn').forEach(optBtn => {
            optBtn.addEventListener('click', () => {
              const isCorrect = optBtn.dataset.correct === 'true';
              feedbackEl.classList.remove('hidden');

              if (isCorrect) {
                optBtn.classList.add('correct');
                feedbackEl.className = "sb-feedback-container sb-success-feedback";
                feedbackEl.innerHTML = `
                  <div class="sb-feedback-title">Correct Transformation!</div>
                  <div class="sb-feedback-text">"${escapeHtml(currentVar.resultUk)}"</div>
                `;

                // Update static display dynamically
                sentenceDisplayEl.innerHTML = currentVar.resultUk.split(' ').map(w => `
                  <span class="sb-static-word-chip highlighted">${escapeHtml(w)}</span>
                `).join(' ');

                // Save dynamic progress boost
                sbProgress.metrics.modifyPatterns = Math.min(100, sbProgress.metrics.modifyPatterns + 8);
                save();

                setTimeout(() => {
                  activeVarIndex++;
                  // Restore static view and load next challenge
                  sentenceDisplayEl.innerHTML = originalWords.map(w => `<span class="sb-static-word-chip">${escapeHtml(w)}</span>`).join(' ');
                  loadVariationChallenge();
                }, 2200);

              } else {
                optBtn.classList.add('incorrect');
                feedbackEl.className = "sb-feedback-container sb-error-feedback";
                feedbackEl.innerHTML = "Not quite. That doesn't match the required grammatical gender, number, or structure.";
              }
            });
          });
        }

        loadVariationChallenge();
      }
    }

    renderUI();
  }

  function renderEx4() {
    container.innerHTML = `
      <div class="sb-journey-screen">
        ${renderStepHeader("Exercise 4: Reverse Construction")}

        <div class="sb-instruction">Construct this English sentence in Ukrainian. Try typing it out:</div>

        <div class="sb-reverse-target-card">
          <div class="sb-reverse-target-en">"${escapeHtml(activeSentence.en)}"</div>
          <div class="sb-reverse-hint-cz">🇨🇿 Czech equivalent: <em>"${escapeHtml(activeSentence.cz)}"</em></div>
        </div>

        <div class="sb-input-area">
          <input type="text" id="ex4-user-input" class="sb-text-input" placeholder="Type Ukrainian translation here (Cyrillic)..." autocomplete="off" />
          <div class="sb-input-actions">
            <button class="btn-secondary" id="ex4-keyboard-toggle">Show Help / Accents</button>
            <button class="btn-primary" id="ex4-grade-btn">Grade Sentence</button>
          </div>
        </div>

        <div id="ex4-help-panel" class="sb-help-panel hidden">
          <p class="sb-help-panel-title">Character references & hints:</p>
          <div class="sb-help-chips">
            <span class="sb-char-chip">і</span>
            <span class="sb-char-chip">и</span>
            <span class="sb-char-chip">є</span>
            <span class="sb-char-chip">ї</span>
            <span class="sb-char-chip">ґ</span>
            <span class="sb-char-chip">'</span>
          </div>
          <div class="sb-help-vocabulary-hint">Expected words: ${activeSentence.builderWords.map(w => `<span class="sb-vocab-mini-hint">${escapeHtml(w)}</span>`).join(' ')}</div>
        </div>

        <div id="ex4-feedback" class="sb-feedback-container hidden"></div>

        <button class="btn-primary sb-next-btn hidden" id="ex4-continue-btn">Complete Sentence Journey &rarr;</button>
      </div>
    `;

    const inputEl = container.querySelector('#ex4-user-input');
    const gradeBtn = container.querySelector('#ex4-grade-btn');
    const keyboardToggleBtn = container.querySelector('#ex4-keyboard-toggle');
    const helpPanel = container.querySelector('#ex4-help-panel');
    const feedbackEl = container.querySelector('#ex4-feedback');
    const continueBtn = container.querySelector('#ex4-continue-btn');

    container.querySelector('#back-to-dashboard').addEventListener('click', renderDashboard);

    keyboardToggleBtn.addEventListener('click', () => {
      helpPanel.classList.toggle('hidden');
    });

    container.querySelectorAll('.sb-char-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        inputEl.value += chip.textContent;
        inputEl.focus();
      });
    });

    gradeBtn.addEventListener('click', () => {
      const userInput = inputEl.value.trim();
      if (!userInput) {
        feedbackEl.className = "sb-feedback-container sb-error-feedback";
        feedbackEl.innerHTML = "Please type your Ukrainian sentence before grading.";
        feedbackEl.classList.remove('hidden');
        return;
      }

      // Compute grading
      const alternatives = activeSentence.reverseUkrainianAlternatives;
      const { score, match } = getBestUkrainianScore(userInput, alternatives);
      const scorePct = Math.round(score * 100);

      let gradeLabel = "";
      let gradeClass = "";
      let gradeDesc = "";
      let isSuccess = false;

      if (score >= 0.88) {
        gradeLabel = "🌟 Natural / Fluent";
        gradeClass = "grade-natural";
        gradeDesc = "Outstanding! Your construction is fully natural, grammatically sound, and fits perfect native Ukrainian phrasing.";
        isSuccess = true;
      } else if (score >= 0.72) {
        gradeLabel = "👍 Mostly Correct";
        gradeClass = "grade-mostly";
        gradeDesc = "Very good. You have built a highly accurate structure with minor spelling or word order differences.";
        isSuccess = true;
      } else if (score >= 0.50) {
        gradeLabel = "👌 Understandable Bridge";
        gradeClass = "grade-understandable";
        gradeDesc = "Understandable! A native speaker will follow your meaning perfectly, thanks to the Czech bridge structure. Keep refining word choices.";
        isSuccess = true;
      } else {
        gradeLabel = "❌ Needs Refinement";
        gradeClass = "grade-incorrect";
        gradeDesc = "The sentence structure or vocabulary is too far off. Check the expected reference or character references and try again!";
        isSuccess = false;
      }

      feedbackEl.classList.remove('hidden');
      feedbackEl.className = `sb-feedback-container ${isSuccess ? 'sb-success-feedback' : 'sb-error-feedback'} reverse-feedback-box`;

      // Visual diff word list comparison
      const userWords = userInput.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"«»]/g, "").split(/\s+/);
      const matchWords = match.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"«»]/g, "").split(/\s+/);

      const diffHtml = userWords.map(w => {
        const isInMatch = matchWords.includes(w);
        return `<span class="sb-diff-word ${isInMatch ? 'correct' : 'missing'}">${escapeHtml(w)}</span>`;
      }).join(' ');

      feedbackEl.innerHTML = `
        <div class="sb-grade-badge ${gradeClass}">${gradeLabel} (${scorePct}% score)</div>
        <div class="sb-feedback-text" style="margin-top: 10px;">${gradeDesc}</div>

        <div class="sb-diff-analysis">
          <div class="sb-diff-title">Your input word analysis:</div>
          <div class="sb-diff-words-container">${diffHtml}</div>
        </div>

        <div class="sb-feedback-reference" style="margin-top: 12px;">
          <strong>Closest Reference Phrasing:</strong><br/>
          <span style="font-size: 16px; font-weight:600; color:var(--text);">${escapeHtml(match)}</span>
        </div>
      `;

      if (isSuccess) {
        continueBtn.classList.remove('hidden');
        gradeBtn.classList.add('hidden');
        keyboardToggleBtn.classList.add('hidden');
        inputEl.disabled = true;

        // Save progress metric boost
        sbProgress.metrics.expressNewIdeas = Math.min(100, sbProgress.metrics.expressNewIdeas + 8);
        save();
      } else {
        feedbackEl.innerHTML += `
          <button class="btn-text" id="ex4-force-reveal" style="margin-top:12px; display:block;">I'm stuck, show solution</button>
        `;

        container.querySelector('#ex4-force-reveal').addEventListener('click', () => {
          inputEl.value = activeSentence.uk;
          feedbackEl.className = "sb-feedback-container sb-success-feedback";
          feedbackEl.innerHTML = `
            <div class="sb-feedback-title">Reference solution filled in</div>
            <div class="sb-feedback-reference"><strong>Expected:</strong> "${escapeHtml(activeSentence.uk)}"</div>
          `;
          continueBtn.classList.remove('hidden');
          gradeBtn.classList.add('hidden');
          keyboardToggleBtn.classList.add('hidden');
          inputEl.disabled = true;
        });
      }
    });

    function getBestUkrainianScore(userInput, alternatives) {
      let bestScore = 0;
      let bestMatch = alternatives[0];
      for (const alt of alternatives) {
        // reuse the similarity function from the top of the file
        const score = computeSimilarity(userInput, alt);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = alt;
        }
      }
      return { score: bestScore, match: bestMatch };
    }

    continueBtn.addEventListener('click', () => {
      activeStepIndex = 5;
      renderActiveStep();
    });
  }

  function renderSentenceComplete() {
    // Mark sentence as complete
    sbProgress.completedSentences[activeSentence.id] = true;
    save();

    container.innerHTML = `
      <div class="sb-journey-screen sb-complete-screen">
        <div class="sb-success-badge">🎉</div>
        <h2>Sentence Completed!</h2>
        <p class="sb-complete-sub">You have successfully analyzed, built, and translated:</p>

        <div class="sb-complete-block">
          <div class="sb-complete-uk">${escapeHtml(activeSentence.uk)}</div>
          <div class="sb-complete-cz">🇨🇿 ${escapeHtml(activeSentence.cz)}</div>
          <div class="sb-complete-en">${escapeHtml(activeSentence.en)}</div>
        </div>

        <button class="btn-primary" id="sb-complete-done">Back to Dashboard</button>
      </div>
    `;

    container.querySelector('#sb-complete-done').addEventListener('click', renderDashboard);
  }

  renderDashboard();

  return {
    cleanup() {
      // Cleanup code if any event listeners on window or DOM elements require teardown
    }
  };
}

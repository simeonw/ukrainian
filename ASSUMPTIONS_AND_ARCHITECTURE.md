# Ukrainian Learning App: Assumptions and Architecture Documentation

This document serves as an reference to aid future updates, fixes, or feature expansions. It outlines key engineering assumptions, architectural layout, and future-proofing strategies.

---

## 1. Core Learning Model Architecture

### Transition from Staircase to Skill Map
*   **Original Paradigm:** The application originally assumed a linear sequencing where learners master Lesson 1 before moving to Lesson 2, and so on.
*   **Updated Paradigm:** The system acts as a multi-dimensional map rather than a linear staircase. It represents Ukrainian language capability as a vector of independent, parallel dimensions of ability:
    *   `vocabulary` (vocab recognition and retrieval)
    *   `understanding` (comprehension of passive grammar structures)
    *   `production` (active creation/generation of phrases)
    *   `grammar` (high-frequency connector and sentence framing rules)
    *   `past` (storytelling and narration of past events)
    *   `conditional` (hypothetical and subjunctive sentence structures)
    *   `Reading Speed` (tracks and rewards reading fluency latency over time)
*   **Draw Logic Optimization:** The SRS drawing engine in `js/core/srs.js` draws active, non-mastered items with higher weights, and filters out mastered items (reducing repetition weight by 90%) to prioritize learning boundaries and avoid over-testing.

---

## 2. Dynamic Drill Exercises & Mechanics

For complex sentences (longer than 2 words), the drill engine replaces the simple 4-choice swipe template with:
1.  **Fuzzy Semantic Translation Matching (UK ➜ EN):** Utilizes a Lenvensthein-based fuzzy ratio to accept multiple semantically valid translations instead of requiring a single hardcoded sentence string.
2.  **Interactive Word-Level Definition Modals:** Clicking a word on any sentence card parses word tokens and launches an overlay with related forms, alternative conjugations, and vocabulary alternatives mapped in `js/data/word-modals.js`.
3.  **Dynamic Sentence Builder Pool (EN ➜ UK):** Renders word chip selections that the learner can tap to construct clauses, alongside interactive buttons to dynamically adapt chips for gender variations (masculine/feminine speakers), formality layers (informal/formal registers), and negation prefixes.
4.  **Response Latency Tracking:** Monitors response times relative to a dynamic sentence-length threshold (3 seconds baseline + 1.5 seconds per word). Answering correctly within this threshold triggers a `"🌟 Fast & Fluent!"` reward; taking longer displays an encouraging `"🧠 Worked out! Great persistence!"` feedback.

---

## 3. Storage and State Management Assumptions

*   **Non-destructive Diagnostics:** Seeding SRS status via the diagnostic test (`seedFromDiagnostic`) is non-destructive. It can raise Leitner-box levels but will never lower or regress actual drill progress.
*   **Progress Resets:**
    *   **Global Reset:** Resets `localStorage` key completely, triggering re-evaluation of the landing screen state and re-running diagnostics.
    *   **Lesson-Level Reset:** Deletes key stats only for items belonging to the current lesson to prevent resetting other untouched lessons.
*   **Incremental Progression Safety:** The structure allows any future intermediate or advanced C2-level lessons to be appended to the bottom of the content array without resetting existing boxes or breaking prior lesson records.

---

## 4. Adaptive Placement & Seeding Calibration

The adaptive diagnostic runs a 5-question minimum randomized test drawn from level pools (`beginner`, `b1`, `b2`, `c1`).
*   **Fluency-based calibration:** To prevent over-scoring from Slavic vocabulary cognates or contextual guessing, correct answers are evaluated against the dynamic sentence-length latency threshold:
    *   *Correct and fast (≤ threshold):* Classified as fluent, automatically seeds the items as mastered, and advances difficulty to find the upper boundary.
    *   *Correct and slow (> threshold):* Classified as context-guessed/worked-out, seeds items as beginner (box 2, consecutive 1) so they get to practice them in drills, and stays on the level to gather more precision.
*   **Results & Confidence Rating:** Computes Suggested Level and Confidence Judgments (High, Medium, Low Confidence) based on the correct answer and fluency ratios.
*   **Interactive Refinement:** Displays a prominent `"🔍 Continue to Further Refine (+3 Questions)"` action to dynamically expand evaluations.

---

## 5. Local Web Server absolute Path Resolutions

*   The production and local dev web wrappers fetch static assets using absolute root prefixes (e.g., `/ukrainian/js/...`).
*   To test locally via Python or standard static servers:
    1.  Create a symbolic link matching the subdirectory path: `ln -s /app /app/ukrainian`
    2.  Start Python server: `python3 -m http.server 8000`

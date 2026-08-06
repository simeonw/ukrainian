# USER REQUESTS AND REFACTORING REFERENCE DOCUMENT

This document acts as an reference point and architectural blueprint for the next phase of refactoring. It documents the user's explicit requests and layouts our design for dynamic sentence randomness and lesson layer progression.

---

## 1. Documented User Requests & Requirements

1.  **Differentiate Known Vocabulary vs. Known Patterns:**
    *   *The Problem:* The system has previously tracked items with general box scores, but native sentence understanding and lexical vocabulary recall are completely different skills.
    *   *The Requirement:* The data structures must model lexical vocab separate from grammatical sentence structures (patterns), ensuring that a learner can have high mastery of the grammatical frame (e.g. *Want + Infinitive*) while still needing to drill the vocabulary words used inside it.
2.  **Dynamic Randomness via Argument Swapping:**
    *   *The Problem:* Currently, drills show static, predefined sentence cards (e.g. always "Я хотів би побачити тебе."). This can lead to phrase memorization rather than true sentence-construction competency.
    *   *The Requirement:* The drill engine must dynamically randomize sentence cards by swapping out verbs, nouns, or infinitives of the same grammatical case/aspect class (e.g. dynamically swapping *побачити* with *поговорити* inside the sentence frame).
3.  **Visible Layer Progression / Level Completion:**
    *   *The Problem:* Currently, learners feel they are both over-placed (placed at C1 too easily due to context-guessing cognates) and under-progressed (after answering many questions, no lessons show as "Completed" or "Mastered").
    *   *The Reason:* With 442 total card items in the drawing pool, drawing uniformly spreads practice repetitions too thin. This mimics the *Coupon-Collector Problem*, preventing any single lesson's average confidence from crossing the learned threshold (65%).
    *   *The Requirement:* Limit the active drawing pool to a focused set of "Unlocked / Active" lessons. Auto-unlock subsequent advanced lessons sequentially as prior lessons reach "learned" mastery.

---

## 2. Advanced Data Structure Proposals

To separate vocabulary from structural patterns and enable infinite dynamic randomized drills, we propose the following schema for patterns:

```javascript
// Advanced Pattern Schema
{
  id: 'p_want_inf',
  kind: 'pattern',
  templateUk: 'Я хочу {verb_inf_accusative} тебе {time}.',
  templateEn: 'I want to {verb_inf_en} you {time_en}.',
  slots: {
    verb_inf_accusative: {
      type: 'verb_inf',
      case: 'accusative',
      options: ['побачити', 'зустріти', 'почути'] // grammatically interchangeable infinitives
    },
    time: {
      type: 'adverb_time',
      options: ['завтра', 'сьогодні', 'зараз']
    }
  }
}
```

### Benefits of this Refactoring:
1.  **Lexical vs. Structural Separation:** The system tracks overall confidence of `p_want_inf` (structural comprehension) while tracking lexical recall of individual vocabulary items (e.g., `завтра`, `побачити`) independently.
2.  **Dynamic Infinite Randomness:** When drawing `p_want_inf`, the drill engine dynamically picks a random grammatically-compatible option from the slots, guaranteeing that the user is forced to construct *new* sentences they haven't simply memorized whole!

---

## 3. Progressive Active Layering Solution

To solve the level-completion plateau and provide highly satisfying progress:
*   **Active Drawing Pool:** Filter the `cardPool` used by the SRS drawer to only draw cards from lessons that have been officially "unlocked".
*   **Placement Seeding:**
    *   *Absolute Beginners:* Starts with Lesson 1 and 2 unlocked.
    *   *Intermediate Placement:* Starts with lessons 1–20 unlocked.
    *   *Advanced Placement:* Starts with lessons 1–27 unlocked.
*   **Sequential Lesson Unlocking:** As soon as an active lesson's confidence reaches `"learned"` ($\ge 65\%$), the next sequential lesson in `LESSONS` automatically unlocks, expanding their practice pool in highly satisfying progressive steps!

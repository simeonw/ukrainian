# Learning Philosophy & CEFR Roadmap

Reference document for the direction of this app's content and drilling priorities — distinct from `ASSUMPTIONS_AND_ARCHITECTURE.md` (engineering) and `USER_REQUESTS_AND_REFACTORING.md` (historical request log). This one is about *what to teach and in what order*, not how the code works.

---

## 1. Core Pedagogical Principle (stated 2026-08-09)

**The goal is conversational Ukrainian within a few weeks, not grammatical perfection.**

The explicit direction from the product owner:

> The key thing we should drill the user to do is basically know instinctively all the verbs and critical words that matter so that they can combine them together to make powerful sentences. We've drifted into requiring knowledge of perfect cases, but these come organically — the individual should know the building-block rules that help them construct to 90% understandable. Key objective: leverage the highest-value terms to get someone speaking conversationally within a few weeks.

What this means in practice:

- **Prioritize breadth of high-frequency verbs/connectors over depth of case-perfect accuracy.** A learner who instinctively reaches for хочу, можу, треба, любити, тому що, з одного боку and a wide working vocabulary — even with imperfect case endings — is closer to the actual goal than one who has memorized five nouns in all six cases.
- **Case mastery is allowed to come organically, not be gated.** This is already reflected in the codebase's architecture, not just aspiration: `substitution-fills.js` deliberately auto-generates only infinitive slots (which never inflect) and keeps noun-case slots hand-authored precisely *because* Ukrainian noun case isn't safely derivable without a real declension engine — see that file's own comments. The "know the rule, not every inflected form" principle was already being applied to code-generation decisions before it was stated as policy; this document makes it explicit so future content/algorithm decisions can lean on it deliberately.
- **"90% understandable" is the bar, not "grammatically flawless."** This should inform: what counts as a "correct" answer in Drill (the fuzzy-match threshold in semantic-match rounds already tolerates near-misses on purpose), which content gets authored first (high-frequency combinable verbs before rare vocabulary), and how aggressively the adaptive queue pushes repetition of case-perfect forms vs. just getting more reps on the core verb/connector set.
- **Speed matters.** The target is weeks, not months — which argues for the adaptive-queue's existing boundary-weighting (6x draw priority for near-mastered content) staying aggressive, and for new content waves to keep prioritizing *combinability* (a small set of verbs + a small set of connectors + a small set of common nouns, all able to recombine into many real sentences) over exhaustive vocabulary lists.

**Practical implication for future work:** when deciding what to build next, prefer a new *high-frequency verb* or *connector* (each one multiplies combinability with everything already taught) over a new *noun category* or *case-inflected drill* (each one is comparatively isolated). The Connectors category (§3 below) is a direct expression of this — connectors are pure leverage: they don't inflect, and once known they upgrade the register of every sentence a learner can already build.

---

## 2. What the app currently shows the user about their own level

The Home screen surfaces a "Level" line (`js/core/level-summary.js`, rendered in `js/ui/app.js`) showing:
- **Level**: our best-guess current CEFR tier (Beginner A1–A2 / Intermediate B1 / Upper-Intermediate B2 / Advanced C1 / Mastery C2), derived from the highest-order lesson the learner has *actually confirmed complete* — not from the one-time placement test alone.
- **Lessons confirmed** and **Vocabulary known** counts.
- **Next up**: the next lesson to unlock/complete.

This is deliberately **not** the placement-test result verbatim — calibration (`js/data/calibration-tracks.js`) caps out at C1 by design (an 8-question placement test shouldn't claim to certify C2), while the Home screen's "Level" line can reach C2 once a learner has genuinely worked through the C2 lessons. If this isn't visible yet, it's very likely the same deploy/cache gap as the lesson-count issue, not a missing feature — check a hard-refreshed, freshly-deployed copy first.

---

## 3. CEFR Reference Doc Analysis (2026-08-09)

The product owner supplied a ~1700-line CEFR reference document (A1→C2 phrasebook + a C2-specific section with idioms, grammar targets, and a "mastery test" framing). Full analysis was run against the entire content corpus (vocab/patterns/lessons); summary below is what's actionable going forward.

### a) Calibration vs. the doc
Our CEFR boundaries were roughly right but lopsided before this pass: B1 had only 3 lessons against the doc's 200-item B1 block, and there was **no C2 tier at all** — everything past the C1 ceiling silently got called "c1". Both gaps are now addressed (see §4).

### b) Highest-leverage recurring pattern in the doc
A small set of **discourse connectors** — хоча, з одного боку/з іншого боку, тому що, наскільки мені відомо, якби...б, не стільки...скільки — recur constantly from B1 through C2. The doc's own "C2 Mastery Test" literally demonstrates this: it takes a trivial A2 sentence and turns it C2-register just by stacking connectors around it, not by teaching new grammar. This directly informed the pedagogical principle in §1 — connectors are the textbook example of "high-value terms that multiply combinability."

### c) C1/C2 material already captured before this pass
Not starting from zero — l36 already had 7 connectors (хоча, незважаючи на, крім того, таким чином, зокрема, відповідно, водночас), and several C1 patterns matched doc items near-verbatim. They just weren't tracked as a category in their own right.

### d) Critical gaps identified (now addressed, see §4)
No idioms anywhere in the app. No C2 content. B1 under-resourced (missing relative clauses, purpose clauses, indirect questions). Connectors existed but weren't a trackable unit. Only ~4 of the doc's 20 named "C2 Grammar Targets" were represented.

### e) Dynamic generation feasibility
`substitution-fills.js` is the right precedent: auto-derive only what's morphologically safe (infinitives, and — per this analysis — invariant connectors, which don't inflect and don't need to agree with whatever clause they attach to), hand-author everything that requires case agreement or is non-compositional (idioms). Not yet built: a clause-level substitution system that combines connector templates with the growing pool of existing opinion/argument sentences as fillers. Worth doing once the current connector set has more content to draw from.

### f) Idioms
Confirmed the doc has a dedicated idiom section. Added as their own tracked vocabulary category (`pos: 'idiom'`) — `vocab-badges.js` needed zero structural changes, it's fully generic on `pos`.

---

## 4. What was built in response (2026-08-09, "wave 4")

- **60 lessons total** (was 54 before this wave; 50 before content wave 3).
- New CEFR boundaries: beginner ≤37, b1 ≤43, b2 ≤47, c1 ≤58, c2 else (59-60 currently).
- `l55` Relative Clauses (який/яка/яке/які), `l56` Purpose Clauses & Indirect Questions (щоб/чи) — filling the B1 gap from (d), sourced from the doc's own B1 examples.
- `l57` Connectors & Cohesive Devices — new dedicated lesson, plus retagged l36's existing 7 connectors to the same `pos: 'connector'` category. 16 connectors now track together as one "Connectors" mastery signal on the Home screen.
- `l58` Common Idioms — 10 items, `pos: 'idiom'`, sourced from the doc's idiom section.
- `l59`/`l60` — first real C2 content: the doc's named grammar-target frames (за умови що, навряд чи, не означає що) and a "hedged diplomatic argument" lesson that deliberately reuses l57/l59 vocabulary rather than introducing much new — modeling the doc's own point that C2 fluency is mostly about *combining* a fairly small set of connectors well, not an ever-expanding word list.

---

## 5. Open priorities (not yet built)

- The clause-level dynamic connector-template system described in (e) — currently connectors are static example sentences, not yet a substitution engine.
- Broader C2 coverage — l59/l60 cover 2 of the doc's ~10 C2 subsections (diplomacy, grammar targets). Professional/academic register, society/politics, and hypothetical/counterfactual sections are still unrepresented.
- Whether the "known" vocabulary evidence bar (3-consecutive-correct or 1 free-text) should be reconsidered in light of §1's "90% understandable, not perfect" principle — currently it measures *repetition confidence*, not *case accuracy*, so it may already be aligned; worth revisiting if drilling still feels slower than it should.

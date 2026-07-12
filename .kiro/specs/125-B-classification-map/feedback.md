# Spec Feedback: 125-B — Classification Map & Deferred Enforcement Layers

**Spec**: 125-B-classification-map
**Created**: 2026-07-11
**Lead**: Thurgood (Civitas steward)

---

## Stakeholder Roster

*Per Spec Feedback Protocol § "Stakeholder Identification" — a conscious selection, not "only system agents." Tagged reviewers and why each is here:*

- **[@PETER]** — human lead; owns all warn→fail strictness calls (Q3, open), the workflow/authority decisions (U3 CODEOWNERS + PR-approval-as-ratification), and the autonomy-dial election (Q4, open). Has already decided Q1 (pilot-first), Q2 (tool-boot smoke in 125-B), and Q5 (full pipeline) — see Context below.
- **[@ADA]** — owns any token-side rule the map classifies as a barrier (token lints, `build:validate` arming, token diff-gates). Reviews token-rule dispositions for content correctness.
- **[@LINA]** — owns Stemma warn→fail strictness and arming/tightening the component contract-composition lane. Reviews component-rule dispositions and the per-suite triage cost of fail-on-unexpected-console.
- **[@STACY]** — product governance & process quality; reviews the process/ergonomics impact of the workflow strictness changes (warn→fail cost, incremental-build integrity, release-detection under the PR flow). Author of the ratified inverse-drift and tool-boot-smoke calibration guards.
- **[@LEONARDO]** — *(optional, Peter's call)* consumes enforcement outcomes at the product-spec boundary; may want visibility on which rules become barriers, but 125-B decides mechanism only (Phase 3 consumer reach is 123). Tag only if Peter judges the consumer-visibility angle in-scope for this round.

*Not tagged (conscious exclusion): platform agents (Kenya/Data/Sparky) — 125-B decides DesignerPunk-repo enforcement mechanism, not platform implementation; consumer-side reach is Spec 123. Add if a specific unit surfaces a platform concern.*

---

## Design Outline Feedback

### Context for Reviewers

*Populated by the spec author (Thurgood) before requesting review. Decisions already made — please do NOT re-litigate these; follow the section references for rationale.*

- **125-B is a SINGLE, internally-phased spec — NOT split into more spec dirs.** Decided (Peter, 2026-07-11) → `../125-mechanical-enforcement-strategy/design-outline.md` § "8. Decisions on record". Scope discipline comes from declared merge units (the 122 pattern), not directory-splitting. Do not propose 125-C/125-D.
- **The classification map is the spine and 125-B's central deliverable** → umbrella § "5" and this outline § "1"–"2".
- **125-A shipped the mechanical sliver** (PR gate, full tsc, `build:validate`, wholesale suite, sub-package lanes) — 125-B does NOT re-open it → umbrella § "8", outline § "7".
- **Formalization is Thurgood's; the backlog's triage is INPUT, not binding phasing** → `../125-mechanical-enforcement-strategy/125-B-backlog.md` (top matter).
- **The CONSUMED/HISTORICAL backlog items are closed — do not re-mine** (lane-viability, 122 sequencing, spent wordpress-thesis items, resolved ledger findings, resolved PAT asymmetry) → backlog § "CONSUMED / HISTORICAL".
- **Scope boundary:** 125-B decides enforcement MECHANISM only. Token math = Ada; component architecture = Lina; consumer reach = Spec 123 → outline § "6".
- **METHODOLOGY FROZEN for this feedback round** (Peter, 2026-07-12, final pre-freeze pass) — three refinements folded and settled on top of the realignment: (1) **the strategy/tactics/validation loop** — strategy (education) informs tactics (implementation), tactics are informed by validation (CI + linting), validation validates/invalidates strategy; placement is governed by the **churn-rate test** (does the content's churn rate match its surface's refresh rate?); guard: the loop is a *lens for placing content*, not three required columns per map row → outline § "2". (2) **The imposter test's second blade** — volatile content in a durable home is prunable even if genuinely educational today; more mechanical than the teaching blade → outline § "2". (3) **The user-agent probe protocol** — the prunable grain is the RULE across all its surfaces; scenario-based comparative A/B probes pre-merge (OB-7 precedent); two-tier verification, with the honest limit that probe-pass means "no gross loss detected," never "prune proven safe" → outline § "4", § "9a". **The refinement decisions are settled — do not re-litigate them.** Reviewable, as with the realignment: their *crispness* — the churn-rate test's edge cases, the two blades' criteria against specific texts, and the probe scenarios' design.
- **METHODOLOGY REALIGNED** (Peter, 2026-07-12): **"CI validates functional and operational requirements, never ideology; education and verification are complementary layers."** The docs MCP and skills educate agents on *how to execute*; CI + linting verifies that *what they build* meets functional/operational standards. Consequences (all folded into the outline — **you are reviewing the CORRECTED methodology, not the drifted one**): the boundary call (functional/operational vs. ideological) is the classification criterion, mechanizability is feasibility only (§ "2"); the failure mode is contradiction/imposter, not coexistence — a rule legitimately lives in both layers (§ "2"); the pruning rule is "prune imposters, not teachers" (§ "2"); the map re-centers on functional rows — no-hardcoded-color, token diff-gates, contract warn→fails (§ "3.3"); the authority row survives as operational but is no longer flagship (§ "3.1"). **The realignment decision itself is settled — do not re-litigate.** What IS reviewable: its *crispness* — the imposter-test criteria and the boundary calls on specific rules are exactly where reviewer pressure helps (counter-argument on record, outline § "2": the boundary is not self-executing).
- **Q1 RESOLVED — pilot-first U1** (Peter, 2026-07-12): U1 is a pilot (minimal map register + two rows end-to-end + tool-boot smoke + crossRef re-point); the full-corpus classification is U1b, gated on the pilot's observations. Deciding asymmetry: a bad prune is reversible but not loudly detectable. Post-realignment, Experiment 1 also **adjudicates between the two framings** — they make opposite predictions about the prune → outline § "4", § "9", § "9a". Do not re-open the map-first vs. thin-slice-first fork.
- **Q2 RESOLVED — the tool-boot smoke lives in 125-B**, consuming 122's manifest; ships in U1 (Peter, 2026-07-12) → outline § "4", § "10".
- **Q5 RESOLVED — FULL formalization pipeline**, feedback gates at each phase, no compressed forms (Peter, 2026-07-12 — "cheap is expensive") → outline § "10". Do not propose compressed forms.
- **Q6 PARKED — release-detection disposition** is deferred to a dedicated Peter-scheduled conversation. **Out of review scope**: not a reviewer question, not assigned to a unit, not resolvable in feedback rounds → outline § "10".
- **Q3 (warn→fail graduations) and Q4 (autonomy dial) are OPEN-FOR-REQUIREMENTS**, not outline blockers — flag concerns that bear on them, but they will be decided in the requirements phase, not this round → outline § "10".

**Scope boundaries under review (what this round IS about):**
- The FROZEN classification-map methodology as an operating procedure (outline § "2": the strategy/tactics/validation loop + churn-rate placement test; boundary call → verification disposition → education disposition; contradiction/imposter + gap failure modes; the two-bladed imposter test; the boundary-call guard) and the corollary that the map is a living register (§ "2", labeled [NEW]). The decisions are settled; their *crispness* (the imposter-test blades against specific texts, the churn-rate test's edge cases, the boundary calls on specific rules) is what to pressure-test.
- The adopted pilot-first merge-unit shape — U1 (pilot) / U1b (map at scale, rule-grain probed waves) / U2 / U3 / elective — its named constraints (review-bandwidth ceiling, who-must-act split, evidence-freshness waves), and the refinements to the backlog's proposed shape (outline § "4"). The pilot-first *decision* is settled (Q1); the unit *contents and constraints* are reviewable.
- The three experiments, their falsification/adjudication conditions, Experiment 1's framings-adjudicator role, and the user-agent probe protocol's design points (grain, A/B scenario design, the two-tier limit) (outline § "9a") — load-bearing for U1's shape; the requirements phase builds on them. **[@STACY]** the probe protocol's process design (scenario construction, avoiding leading questions) is squarely your review territory.
- The seed rows as *proposed* (outline § "3"): the functional candidates (§ "3.3" — **[@ADA]** the token rows, **[@LINA]** the contract rows: are the proposed boundary calls right for your domains?), the authority row as operational-not-flagship (§ "3.1", incl. the 122-coordination obligation), and the prune-with-arm rows as boundary-adjudication material (§ "3.2").
- The remaining Open Questions Q3/Q4 (outline § "10") — carried to requirements; input welcome, decisions deferred.

**Dependencies on prior artifacts:**
- The umbrella `design-outline.md` (strategy, decisions on record) and `125-B-backlog.md` (triaged input) are the parents. This outline synthesizes them; it invents no scope.
- U1 readiness depends on 122 being complete (it is) and the crossRef being genuinely interim (verified 2026-07-11).

*(Agent feedback rounds begin below. Thurgood's own review is the outline itself; do not manufacture rounds that haven't happened.)*

---

## Requirements Feedback

### Context for Reviewers
*To be populated by the spec author when requirements.md is written — after the design-outline round settles (Spec Feedback Protocol sequential formalization gate).*

---

## Design Feedback

### Context for Reviewers
*To be populated when design.md is written.*

---

## Tasks Feedback

### Context for Reviewers
*To be populated when tasks.md is written.*

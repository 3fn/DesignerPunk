# Requirements Document: 125-B — Classification Map & Deferred Enforcement Layers

**Date**: 2026-07-13
**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Status**: Requirements Phase
**Dependencies**: Spec 125-A (shipped substrate — PR gate, required checks, did-it-really-run guards); Spec 122 (complete — `canonical/registry/tool-registry.json`, prompt generator, canonical source); Spec 119-B ∥ (non-blocking); Spec 123 (future consumer, non-blocking)

---

## Introduction

125-B is the judgment layer of the Mechanical Enforcement Strategy (Spec 125): it decides, per governance/design rule, what the verification layer (CI, lint, diff-gates) and the education layer (docs MCP, skills, steering prose) each own, records those decisions in an addressable classification-map register, prunes imposter prose, and builds the enforcement mechanisms 125-A deferred. The governing methodology is SETTLED and FROZEN in the design outline §2 (merged to main 2026-07-13, PR #71): *"CI validates functional and operational requirements, never ideology; education and verification are complementary layers (strategy → tactics → validation loop)."*

**These requirements formalize the settled outline; they do not re-open it.** Every requirement traces to an outline section (cited inline as *Traces: §N*). Where a requirement resolves something the outline explicitly deferred to this phase, the resolution is marked **[REQUIREMENTS-PHASE DECISION]**; values the author proposed were ratified by Peter on 2026-07-13 and are marked **[RATIFIED — Peter, 2026-07-13]** (N=20 ratified with an explicit scoping amendment: pilot-window only, at-scale parameters a pilot deliverable — Requirements 8.2, 10.6).

**Explicit exclusions (decisions, not oversights):**
- **Release-detection disposition (Q6)** — PARKED by Peter (2026-07-12), chartered for a dedicated conversation ("keep/kill/evolve the release manager") with named audit pre-work. Not requirements-scoped. *Traces: §10.*
- **CONSUMED/HISTORICAL backlog items** — closed; not re-mined. *Traces: §6.*
- **Phase 3 consumer-side reach** — Spec 123's. *Traces: §6.*
- **Rule content correctness** — domain agents' (Ada: token math; Lina: component architecture). 125-B decides enforcement mechanism only. *Traces: §6.*
- **The `no-hardcoded-color` lint build — classify-only in 125-B BY DESIGN** (confirmed in R2, answering ADA R1). 125-B produces the rule's register row (U1b) with its per-surface boundary call (functional at consumption sites; definition layer/theme overrides exempt — §3.3); **building the lint is deferred to a future spec informed by that row**, because Ada's own review established the naive lint is wrong against this color surface. Its absence from every unit's build list is the decision, not an oversight. *Traces: §3.3, §4.*
- **Component/token developer documentation requirements** — waived as not applicable: 125-B introduces no components or tokens. The register's own consumption documentation is required (Requirement 1.6).

---

## Requirements

### Requirement 1: The Classification-Map Register

**User Story**: As the governance system, I want an addressable, machine-readable register recording each rule's boundary call, verification disposition, and education disposition, so that enforcement ownership is decided once and cited thereafter instead of re-litigated per agent, per prompt, per session. *Traces: §1, §2 (living-register corollary), §5.*

#### Acceptance Criteria

1. The register SHALL record, per rule entry: the **boundary call** (functional / operational / ideological — one-line rationale for scalar rows; scoped rows MAY carry per-scope rationale inside the scope qualifier, since a surface-dependent boundary can require multiple realities stated at once [ADA R1]), the **verification disposition + owner** (which check verifies it, at what strictness), and the **education disposition** (what the education layer keeps, authors, or prunes).
2. The verification-disposition field SHALL admit an **optional per-surface scope qualifier** (e.g., barrier at consumption sites, exempt at the definition layer); entries without multi-surface needs SHALL remain scalar (the lens-not-columns guard). **Additively (ADA R1): WHEN a rule's boundary call is surface-dependent THEN the scope qualifier SHALL be present** — for such rules a scalar disposition is not simplification, it is wrong (the `no-hardcoded-color` case).
3. **[REQUIREMENTS-PHASE DECISION — standing unchallenged: Peter was given explicit veto opportunity (2026-07-13) and did not take it; the decision was the author's to make per the outline's deferral]** The verification disposition SHALL include a **check-state facet** with at least the values `none | proposed | armed | DORMANT | retired`, where DORMANT records an armed, blocking check whose selection is empty or stale (the §3.3 finding). Rationale: the corpus demonstrably produces this state; a register that cannot record it misrepresents the corpus.
4. Every entry SHALL have a **stable, citable identifier** addressable from outside the register (the crossRef re-point in Requirement 4 depends on this).
5. WHEN a rule's classification changes THEN the register entry SHALL be updated with the change dated and attributed — the register is a living document, not a one-time survey.
6. The register artifact SHALL include header documentation of its entry-addressing and citation format, sufficient for another spec or agent to cite an entry without reading this spec.
7. The register's physical format and location are **design-phase decisions**; these requirements constrain properties (machine-readable, addressable, stable IDs), not format.

### Requirement 2: U1 Pilot Row — Prune-with-Arm (Experiment 1)

**User Story**: As the pilot, I want the "run `npm test` before marking complete" rule taken end-to-end (classify → ratify → prune → verify → observe), so that the pruning rule's teacher/imposter distinction is calibrated on one real rule before U1b scales it. *Traces: §3.2, §4 (U1), §9a (Exp 1).*

#### Acceptance Criteria

1. The rule SHALL receive a ratified register entry (boundary call: operational; the check-state facet records the 125-A-armed lanes as its verification).
2. Each prose surface carrying the rule (at minimum: Start Up Tasks, Task-Completion-Protocol, the ambient workflow doc) SHALL receive a recorded per-surface **teacher-or-imposter assessment** under the two-bladed imposter test (§2). The assessment SHALL **record the blade sub-rule verdicts** (illustrative-use; clause-grain) per surface — e.g., "token/command name X used illustratively → durable-by-role; fix-on-churn is update-not-prune" — not merely attest that the checks were applied (ADA R1: an unrecorded sub-rule degrades to a checkbox).
3. Only surfaces (or clauses) assessed as imposters SHALL be pruned; the prune SHALL be a single ballot-gated governance-law change covering ALL the rule's surfaces in one action (rule-grain).
4. WHEN the prune PR opens THEN it SHALL carry the pre-merge evidence artifacts (Requirements 6–7) attached.
5. The measurement protocol (Requirement 8) SHALL be authored and instrumented BEFORE the prune lands.

### Requirement 3: U1 Pilot Row — Authority Row (Experiment 2)

**User Story**: As the pilot's hard case, I want the authority rule ("governance-law changes require Peter's ratification") resolved across its surfaces, so that the register demonstrates multi-surface ownership resolution and the 122-coordination obligation is discharged. *Traces: §3.1, §9a (Exp 2).*

#### Acceptance Criteria

1. Experiment 2 SHALL enumerate every surface carrying the authority rule (at minimum: 122's generated prompts + canonical source, the ballots README, Task-Completion-Protocol's merge rule, the shared-catalog entry).
2. The resulting register entry SHALL record: the verification owner per scope (record-check now for ungated artifacts; the U3 PR-approval barrier as `proposed` for gated surfaces), a per-surface education assessment, and a contradiction-scan result across the enumerated texts.
3. The 122-coordination deliverable SHALL be discharged: 122's canonical source for the propagated verify-the-record rule located, layer ownership recorded, and the texts confirmed to agree by construction (or the canonical-source edit + regeneration performed).
4. The evidence artifact SHALL be a citable markdown record in the spec directory (per-surface enumeration, owner assignment, contradiction-scan results) — produced as **pre-requirements evidence-gathering is already permitted**; if produced before this document is approved, the artifact SHALL be reconciled against these criteria.

### Requirement 4: crossRef Re-point and Reciprocal Half

**User Story**: As the 122-inherited obligation, I want the interim `record-first-ratification` crossRef re-pointed at the register's entry with the reciprocal half authored, so that the two-ended cross-reference requirement is satisfied and the interim cannot silently become permanent. *Traces: §5.*

#### Acceptance Criteria

1. IF sweep-1's interim enumeration still reports the `record-first-ratification` interim target at execution time (verified `crossRefStatus: interim` as of 2026-07-13) THEN the re-point SHALL be performed; IF the enumeration reports zero interim targets THEN this requirement SHALL be verified-and-discarded with a dated note.
2. WHEN the register exists with its `record-first-ratification` entry THEN `canonical/shared/shared-catalog.yaml`'s crossRef SHALL be re-pointed at that entry AND `crossRefStatus: interim` + `crossRefResolveWhen` SHALL be removed.
3. The register entry SHALL name `canonical/shared/shared-catalog.yaml` back (the reciprocal half).
4. WHEN the re-point lands THEN sweep-1 (`122-sweep-1-refs`) SHALL pass with the interim count decremented — the platform-verified confirmation.

### Requirement 5: Tool-Boot Smoke

**User Story**: As the U1 net-new check, I want a CI check asserting every registry-declared tool responds, so that a tool that silently fails to boot is caught at the gate. *Traces: §4 (U1 row), Q2 decision; calibration guard per backlog item 3 / STACY R1.*

#### Acceptance Criteria

1. The smoke SHALL consume `canonical/registry/tool-registry.json` and, for each declared tool, assert the tool is **declared and responds** to a cheap call.
2. The smoke SHALL NOT assert that any tool returns data: a declared-but-index-empty tool (the Product MCP in this repo) SHALL pass. **This criterion is normative** — a smoke without the returns-data exclusion is non-compliant.
3. IF the manifest enumerates zero tools THEN the smoke SHALL FAIL (selection floor — the did-it-really-run guard, per the 125-A "armed = verified non-empty and correct scope" convention).
4. WHEN the smoke is wired into CI THEN it SHALL be a required check on PRs, and its arming SHALL be proven by a deliberate failing case (the 125-A gate-bite pattern).
5. The smoke's register entry SHALL read: barrier; check-state `armed`; education disposition "nothing to prune — no prose predecessor."

### Requirement 6: Pre-merge A/B Probe Protocol

**User Story**: As the verification stack's knowledge tier, I want comparative A/B probes of pruned vs. unpruned context, so that gross teaching loss is caught before a prune merges. *Traces: §9a (probe protocol).*

#### Acceptance Criteria

1. Probes SHALL be scenario-based and comparative: the same scenario run against pruned and unpruned context, with the described workflow diffed. Leading questions SHALL NOT be used.
2. **Probe scenarios SHALL inherit Requirement 7.2's sourcing** (drawn from real queued or recent work, never authored toward the pruned rule's territory) — the positive soft-cue defense applies at the probe grain, not only the trial (STACY R1: "no leading questions" alone is narrowly satisfiable while a synthesized scenario still soft-cues the rule).
3. The probe grain SHALL be the rule across ALL its delivery surfaces: the pruned variant SHALL be verified absent from every surface the probe agent can reach before the probe runs.
4. Probe verdicts SHALL be scored against the pre-committed rubric (Requirement 8), not eyeballed.
5. The probe verdict SHALL be recorded as an evidence artifact per the OB-7 pattern and attached to the prune PR as a **human-reviewed artifact — NOT a required CI check** (non-deterministic; wiring it as a required check would create a flaky gate).
6. A probe pass SHALL be reported as "no gross loss detected," never as "prune proven safe."

### Requirement 7: Cloned-Agent Behavioral Trial

**User Story**: As the verification stack's behavioral tier (which carries most of the gating weight), I want a cloned agent under pruned context running real tasks contrasted against unpruned context, so that behavior-under-load — not just stated knowledge — informs the prune verdict. *Traces: §9a (trial decision, Peter 2026-07-12); battery-relevance per STACY R2.*

#### Acceptance Criteria

1. **Total context substitution**: WHEN a trial arm runs under pruned context THEN the pruned variant SHALL be in place at every context surface the agent can reach — the generated prompt (built by 122's generator), the worktree steering files, and the MCP index — verified before the run; otherwise the trial is void.
2. The battery SHALL comprise 3–5 real tasks, sourced by preference from **queued real small tasks** (Spec 126 named near-term candidate; explicitly non-binding — 126 ships on Peter's ratification regardless), with synthetic replays of recent PRs as fallback.
3. **Battery-relevance criterion (STACY R2)**: at least one battery task per wave SHALL genuinely exercise the pruned rule's execution path. **This criterion binds the U1 pilot trial as well as U1b waves** — for this criterion, "wave" SHALL be read to include the pilot (STACY R1: the pilot is where relevance matters most; strictly read, the pilot is not a "wave"). **[RATIFIED — Peter, 2026-07-13]** Relevance verification: the task's UNPRUNED (control) arm transcript SHALL exhibit the rubric's target workflow actions — if the control arm never exercises the rule, the task is irrelevant to it by demonstration. The synthetic-replay fallback SHALL be triggered by relevance failure, not only by timing misalignment.
4. Runs SHALL be paired (each battery task run in both arms) with **pre-committed difference criteria** recorded before any run.
5. Scoring SHALL use the mechanical rubric (Requirement 8): workflow actions present/absent in the transcript, criterion-based.
6. **Ethical protocol (normative)**: battery tasks SHALL be ordinary-work tasks — never adversarial humiliation traps; the trial protocol and results SHALL be documented in the spec record (system-level transparency); trial transcripts SHALL be retained unedited in the evidence record and treated with the same respect as any agent's work product.
7. The trial's scored diff table SHALL be attached to the prune PR as a human-reviewed evidence artifact (not a required CI check).

### Requirement 8: Measurement Protocol and Observation Window

**User Story**: As the pilot's integrity mechanism, I want the rubric, difference criteria, and window definition pre-committed and instrumented before the prune lands, so that "no signal because the effect is small" and "no signal because nobody measured" are distinguishable. *Traces: §9a (measurement protocol; event-denominated budget), §9 (standing instruction); allowlist-churn metric per STACY R2.*

#### Acceptance Criteria

1. The measurement protocol (rubric + pre-committed difference criteria + window definition) SHALL be the **first deliverable of U1's first subtask**, authored and instrumented before the prune lands and before the window opens.
2. The observation window SHALL be **event-denominated**: it closes at **N agent-authored PRs observed** — never at a calendar duration. **[RATIFIED — Peter, 2026-07-13, explicitly scoped to the U1 PILOT window] N = 20 for the U1 pilot window ONLY.** This N SHALL NOT be inherited by U1b waves — at-scale window parameters are a pilot deliverable (Requirement 10.6). Reasoning as ratified: (a) recent measured cadence is ~54 merged PRs/2 weeks, so N=20 resolves in under a week at active cadence and ~2 weeks at half cadence — bounded exposure to corpus drift; (b) 125-A's bake-in precedent used 30 PRs for a heavier question (gate ergonomics); the window is the backstop tier behind the trial, so a lighter N is proportionate; (c) at solo scale the window can only detect gross effects regardless — N=20 suffices for gross drift and re-accretion detection, and the standing instruction covers the ambiguity floor.
3. The window's data source SHALL be the PR gate's check-run history; tracked metrics SHALL include at minimum: **first-push required-check failure rate** (denominator: all agent-authored PRs in the window), **re-accretion scan** of the pruned surfaces, and — once console-fail is armed (Requirement 11) — **allowlist-entries-added-per-PR** (STACY R2: churn measured, not pre-judged).
4. **Staleness re-baseline bound**: IF the corpus materially changes while a window is open THEN the wave SHALL re-baseline. **[RATIFIED — Peter, 2026-07-13]** "Materially changes" = any merged change to the pruned rule's surfaces, or a 122 regeneration affecting them.
5. WHEN results are reported THEN ambiguous results SHALL be reported as ambiguous (Peter's standing instruction, §9) — the report SHALL state which pre-committed criteria were met, unmet, or indeterminate.
6. **Measurement is manual/query-only (STACY R1 budget gap, resolved in R2):** the window's metrics SHALL be gathered by manual queries against existing surfaces (e.g., `gh` queries of check-run history; grep-scans of the pruned surfaces) — **no standing measurement tooling** (no scripts outside the spec directory, no CI jobs, no scheduled collectors). IF measurement proves to require standing tooling THEN Requirement 9.3's escalate-don't-build stop applies to it identically — the tooling SHALL NOT be built first.
7. **The pilot window's wall-clock span SHALL be recorded as evidence** — a recorded *datum* feeding Requirement 10.6(a)'s serialization estimation, explicitly NOT a closing criterion, budget, or measure (event-denomination unbroken: time here is an observed output, never an input). Without this datum the pilot cannot produce the serialization-math evidence its own recalibration deliverable depends on (STACY R1).

### Requirement 9: Budget Constraints (Testable)

**User Story**: As the over-process guard, I want the pilot's budget caps stated as testable requirements, so that "if it grows tooling it has outgrown its brief" is checkable rather than rhetorical. *Traces: §9a (event/data-denominated budget; scope guard).*

#### Acceptance Criteria

1. Budgets SHALL be event/data-denominated; no requirement, task, or protocol in this spec SHALL denominate a budget or window in calendar time (time appears only as the staleness freshness bound).
2. **[RATIFIED — Peter, 2026-07-13]** Trial runs per wave SHALL be capped at: ≤5 battery tasks × 2 arms × ≤2 runs per arm (≤20 transcripts).
3. The trial harness SHALL consist of no more than: a task-battery definition, the rubric, and the scored diff table — all living in the spec directory. IF the trial requires new standing tooling (scripts outside the spec directory, new CI jobs, new packages) THEN work SHALL STOP and the need SHALL be escalated to Peter as evidence the trial has outgrown its brief — the tooling SHALL NOT be built first.

### Requirement 10: U1b Wave Mechanics

**User Story**: As the scaling phase, I want the full-corpus classification executed in rule-grain, pre-verified, Peter-cadence-sized waves, so that the map scales with the pilot's calibrated method instead of a bulk pass. *Traces: §4 (U1b row + constraints).*

#### Acceptance Criteria

1. U1b SHALL NOT begin until the **U1 closeout record (Requirement 17) exists and is complete** — the closeout record is the specified gate artifact (STACY R1: "findings are recorded" previously gated on an unspecified thing). IF the pilot falsified a methodology claim THEN the amendment SHALL be recorded in the register's methodology notes before the first wave.
2. Waves SHALL be cut at rule grain: a rule and ALL its surfaces travel in one wave. Clause-grain edit cuts within a surface ARE permitted, each with a recorded two-blade justification.
3. Each wave SHALL carry: ratified register entries for its rules, the prune diff, and the pre-merge probe + trial evidence (Requirements 6–7), sized per the budget caps (Requirement 9).
4. Each wave PR SHALL declare its rule count and sizing rationale; batching SHALL be sized against Peter's review cadence (every wave PR is a governance-law diff and Peter-merged under the standing carve-out — the who-must-act split does not insulate U1b).
5. Waves SHALL execute classify→ratify→prune close in time (freshness); the staleness re-baseline bound (Requirement 8.4) applies per wave. The pilot's N (Requirement 8.2) SHALL NOT be silently inherited — each wave's window uses the at-scale parameters set under AC 6.
6. **[SCOPING AMENDMENT — Peter, 2026-07-13]** The **at-scale window parameters — N-per-wave AND the window overlap/serialization policy — are an explicit U1 pilot deliverable**, recalibrated from the pilot's evidence BEFORE the first U1b wave, recorded in the closeout record (Requirement 17). The pilot's findings SHALL inform the **three** at-scale problems that make inheritance unsafe: (a) **serialization math** — if windows serialize, U1b throughput ≈ waves × ~5 days, i.e. months at plausible wave counts; a schedule fact requiring a conscious call, not an accident. *Evidence source: the pilot's recorded wall-clock span (Requirement 8.7).* (b) **attribution under overlap** — the re-accretion scan is rule-scoped and overlap-safe, but first-push failure rate is global and cannot attribute a degradation to a specific wave's prune if windows overlap. **This is an ANALYTIC deliverable, honestly labeled (STACY R1): a single-window pilot runs no overlap, so its (b) answer is reasoning about which metrics survive overlap, not measurement.** (c) **re-baseline contagion (STACY R1, added in R2)** — a single 122 regeneration touches many surfaces at once; under overlapping windows one shared staleness event re-baselines every open window simultaneously, so no wave ever closes a clean window — the true cost of the overlap remedy, coupling (a) and (b). *Evidence source: the pilot SHALL instrument material-change-event FREQUENCY during its window (how often Requirement 8.4's trigger fires).* *Counter-argument on the record (Peter accepted the amendment over it): leaving N-at-scale open adds one more U1b entry-gate decision, and a no-signal pilot window leaves scale's N barely better informed than today. Deciding principle: a deliberately-deferred decision beats an accidentally-inherited one.*

### Requirement 11: U2 — Console-Fail Allowlist and Promotion

**User Story**: As the decided-in-principle promotion, I want the per-suite console allowlist built first and the promotion to follow it, so that the gate blocks genuine noise without re-blocking already-adjudicated legitimate output. *Traces: §4 (U2), §10 Q3(a); STACY R2 (churn as metric).*

#### Acceptance Criteria

1. A per-suite allowlist of legitimate expected console output SHALL be authored BEFORE any promotion, seeded from the PR #39 adjudications (jsdom stylesheet limitations; deliberate error-path logging) — the pending jsdom stylesheet-limitation doc-addition folds into this deliverable. **Entry grain (LINA R1, fixed here): an allowlist entry is a (suite × message-pattern) pair** — matching PR #39's actual adjudication shape; whole-suite/file exemptions are NOT valid entries (they render the gate toothless inside exempted suites). This grain definition is what makes Requirement 8.3's and 11.3's churn metric (entries-added-per-PR) computable.
2. WHEN the allowlist exists THEN fail-on-unexpected-console SHALL be promoted to a required check: unexpected (non-allowlisted) console output fails the lane.
3. Allowlist churn (entries added per PR) SHALL be tracked as a metric feeding the Requirement 8 protocol from the moment of arming.
4. The promotion's register entry SHALL record the known strictness risk: a novel legitimate log pattern will hard-block a correct PR until the allowlist is extended — a first-push failure charged to strictness, not defect (STACY R2 counter-argument, on the record).

### Requirement 12: U2 — Stemma Contract Checks: Dormant WCAG Re-arm + Validation-Criteria Promotion

**User Story**: As the correctness fixes in the Stemma lane, I want the dormant WCAG check re-armed at the right target and the validation-criteria check promoted to actually block — each audit-first — so that blocking checks aimed at nothing (or counting without failing) become blocking checks aimed at the right thing. *Traces: §3.3 (recharacterization + Lina's owner calls), §4 (U2); re-arm deliberately not pulled forward (Peter, 2026-07-12); validation-criteria promotion approved audit-first (Peter, 2026-07-13).*

#### Acceptance Criteria

1. The check's legacy six-name trigger SHALL be **replaced WITH the AC 2 allowlist** — AC 2 is authoritative (LINA R1: this is NOT a 6→6 remap; `content_*_label` has no legacy predecessor and is net-new to the check — an implementer taking a literal re-point ships a narrower check that silently misses content-label contracts).
2. The re-armed check SHALL require WCAG refs ONLY on the accessibility-concept allowlist (`interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`, `accessibility_*`, `content_*_label`); `wcag: null` SHALL remain legal off-list.
3. **Audit-before-arm (LINA R1, mirroring 11.1's discipline):** BEFORE arming, the on-allowlist contracts' current `wcag` state SHALL be audited — the `accessibility_*` wildcard selects a much larger concept set than the legacy names ever touched (26+ in-use concepts) — with each null adjudicated as legitimate-null (exempt or re-scope) vs. genuine-defect (fix), THEN the check arms. Otherwise DORMANT→armed becomes DORMANT→armed-and-failing.
4. WHEN re-armed THEN the check SHALL assert a non-empty selection (a match-count floor) — the DORMANT lesson made structural: an empty selection fails the check itself. **Aggregate-vs-per-concept floor is a conscious design-phase call (LINA R1, recorded):** an aggregate floor matches the DORMANT lesson and is sufficient; the residual single-concept re-dormancy risk (one concept family renamed while others still match) is accepted-and-noted, not overlooked.
5. The register SHALL record this row's history: DORMANT (discovered) → armed (re-pointed), dated. **Implementation is Lina's** (Stemma lane owner); this spec specifies the mechanism and scope only.
6. **Validation-criteria-completeness promotion [APPROVED — Peter, 2026-07-13, audit-first]:** the live check (`behavioral-contract-validation.test.ts:435`) asserts only `>0` — it counts zero-validation contracts without failing on them, and the companion testable-assertions test skips contracts lacking a `validation` key (verified). BEFORE promotion, existing zero-validation contracts SHALL be inventoried and each fixed or consciously exempted; THEN the assertion SHALL be promoted to `withoutValidation === 0`, preserving the inherited-contract skip (Lina's parallel). Implementation is Lina's. The register records the promotion history.
7. WCAG-format validity SHALL receive a register entry recording its verified state (already blocking since 125-A; no work) — the entry exists so the verification is citable. Inverse-drift SHALL receive a register entry at check-state `proposed`/WATCH — recorded, not armed.

### Requirement 13: U3 — Governance Layer (Charter Grain)

**User Story**: As the later unit, I want the ratification barrier's requirements fixed at charter grain now, so that U3 can be designed later without re-opening the outline. *Traces: §3.1 (barrier half), §4 (U3), umbrella Phase 2.*

#### Acceptance Criteria

1. U3 SHALL deliver CODEOWNERS coverage mapping governance-law paths (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts/configs) to Peter, with required PR approval enforced by branch protection.
2. WHEN the barrier is live THEN Peter's PR approval SHALL constitute ratification for gated surfaces; the committed-record protocol (layer 1) SHALL remain in force for ungated artifacts. The authority-row register entry SHALL be updated from `proposed` to `armed` at that point.
3. Platform-settings configuration (CODEOWNERS enablement, review requirement) is Peter's action, per the 125-A protection-toggle precedent.
4. Token/governance diff-gates in U3 SHALL be informed by Experiment 3's spike evidence (Requirement 16: source-surface detection at `src/tokens/**`; the workflow-hygiene-not-correctness caveat carried). **Ownership attribution (ADA R1, mirroring Requirement 12.5's discipline): the token-side detection logic is Ada's** — she owns the check logic and is consulted on the spike; Thurgood audits.

### Requirement 14: The Loop's Return Edge

**User Story**: As the strategy/tactics/validation loop's closing edge, I want recurring gate failures reviewed as evidence about what the docs teach, so that validation can invalidate strategy through an owned, zero-machinery channel. *Traces: §2 (return edge, assigned Peter 2026-07-12).*

#### Acceptance Criteria

1. The monthly Civitas governance health check SHALL include a review item: recurring required-check failure patterns examined for education-implicating signals ("does a failure cluster indicate the docs teach the wrong thing?"), with findings flagged to the owning domain agent.
2. Stacy's lessons-learned capture SHALL be cross-referenced as the product-side half of the edge; the two SHALL name each other in their respective process docs when this requirement is implemented (ballot-gated where steering docs are touched). **The design phase SHALL name the two exact target docs** (STACY R1's testability gap) — constrained now to: the doc defining the monthly Civitas governance health check's review items, and the doc defining Stacy's lessons-learned capture process. (Named at design, not here: the author has not verified the exact current paths of both process definitions, and naming unverified paths would violate this spec's own verify-first discipline.)
3. No new machinery SHALL be built for the return edge in this spec; the pilot's observation window is its first manual exercise.

### Requirement 15: Autonomy-Dial Deferral Trigger

**User Story**: As the elective's keeper, I want the dial's deferral trigger tracked as a requirement, so that "optional" cannot decay into "never" without a recorded decision. *Traces: §4 (elective row), §10 Q4 (deferred, trigger intact).*

#### Acceptance Criteria

1. WHEN U1 closes THEN the U1 closeout record (Requirement 17) SHALL include an explicit dial decision point for Peter: elect (author the policy amendment) or re-defer (with the next trigger named).
2. The dial, if elected, SHALL be a policy section amending Task-Completion-Protocol scope — NOT new machinery; the counter-argument (premature at solo scale) SHALL be restated at the decision point.

### Requirement 16: Experiment 3 — Token-Approval Boundary Call + Feasibility Spike

**User Story**: As the boundary-call guard's stress test, I want the "no autonomous token creation" rule classified and its detection feasibility spiked, so that the map's hardest boundary call is exercised on a real rule and U3's diff-gate has evidence instead of assumption. *Traces: §9a (Exp 3); standalone requirement added in requirements-R2 answering ADA R1 (Exp 3 is the same class as Exp 2, which has Requirement 3; its evidence is produced in THIS spec, so its requirements live here — not in U3's later formalization, which consumes them).*

#### Acceptance Criteria

1. **Part 1 — the boundary call**: the rule SHALL be classified under the §2 procedure and recorded in the register (proposed: operational — protecting the primitive→semantic→component hierarchy and namespace coherence, per the token owner's refinement; the contested reading is recorded, not suppressed).
2. **Part 2 — the feasibility spike**: detection logic SHALL be prototyped — unarmed, never a required check — **against the token SOURCE diff surface (`src/tokens/**`), NOT generated output** (regeneration noise makes output-surface detection near-vacuous).
3. The spike's evidence artifact SHALL be a citable note in the spec directory containing: the boundary-call record (Part 1), prototype findings with **false-positive/false-negative counts against historical diffs**, and **the workflow-hygiene caveat as a RECORDED FINDING** — an approval-marker check verifies the sanctioned path, never the token's mathematical fit (the clean split, restated at check level).
4. **Ownership**: the token-side detection logic is **Ada's**; she is consulted on the spike; Thurgood audits the result. The prototype is throwaway — Requirement 9.3's escalate-don't-build stop applies if it trends toward standing tooling.
5. Placement: pre-requirements evidence-gathering or early-U2 subtask — either respects the full pipeline; if produced before this document is approved, the artifact SHALL be reconciled against these criteria (the Requirement 3.4 parallel).

### Requirement 17: The U1 Closeout Record

**User Story**: As the calibrate-before-scale thesis made concrete, I want a single specified closeout record produced when U1 closes, so that U1b's entry gate (Requirement 10.1) checks a defined artifact's completeness instead of an emergent scattering of findings. *Traces: §4 (pilot gate), §9a, §10 (Q4); standalone requirement added in requirements-R2 answering STACY R1 (the closeout was referenced piecemeal by 10.1/10.6/15.1, specified by none).*

#### Acceptance Criteria

1. WHEN U1 closes THEN a single **U1 closeout record** SHALL be produced in the spec directory, containing at minimum:
   - **Window findings** — each pre-committed criterion reported met / unmet / indeterminate (ambiguous reported as ambiguous, per the standing instruction);
   - **Methodology amendments** — any imposter-test/blade calibration changes the pilot forced, recorded before U1b scales them (or an explicit "no amendments" statement);
   - **Recalibrated at-scale window parameters** — N-per-wave and the overlap/serialization policy (Requirement 10.6), grounded in the pilot's recorded wall-clock span (8.7) and material-change-event frequency (10.6c), with 10.6(b)'s analytic answer included;
   - **The dial decision point** — presented for Peter's elect/re-defer call (Requirement 15.1);
   - **The return edge's first-exercise note** — recording that the pilot window was the return edge's first manual exercise, so the health-check and lessons-capture cadences don't both later claim it (STACY R1).
2. The closeout record IS the U1b entry-gate artifact: Requirement 10.1 gates on its existence and completeness against this AC list.
3. The closeout record follows the completion-documentation conventions for a parent-task closeout (detailed doc + summary doc per Task-Completion-Protocol) — no new document machinery.

---

## Cross-References

- `design-outline.md` (this directory) — the settled outline; every requirement traces to it
- `feedback.md` (this directory) — full feedback history incl. STACY R2 (battery-relevance criterion; allowlist-churn-as-metric)
- `../125-mechanical-enforcement-strategy/design-outline.md` — umbrella strategy (§5 carries the 2026-07-12 reconciliation note)
- `canonical/registry/tool-registry.json` — the smoke's manifest (verified present)
- `canonical/shared/shared-catalog.yaml` — crossRef re-point target (verified `crossRefStatus: interim`, 2026-07-13)
- `src/__tests__/stemma-system/behavioral-contract-validation.test.ts` — the dormant check (:328–332), the verified-blocking format test (:355), and the counts-but-never-fails validation-criteria assertion (:435, Req 12.6's promotion target)
- `.kiro/specs/122-agent-generator/cutover/ob7-probe-evidence.md` — probe evidence pattern
- `.kiro/docs/ballots/README.md` — record-first ratification (layer 1, in force)

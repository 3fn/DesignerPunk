# Design Outline: 125-B — Classification Map & Deferred Enforcement Layers

**Date**: 2026-07-11
**Spec**: 125-B — the judgment/classification layer of Mechanical Enforcement Strategy (Spec 125)
**Author**: Thurgood (Civitas steward; 125 is Thurgood-led — umbrella §7)
**Status**: **DRAFT OUTLINE — not requirements/design/tasks.** Authored for the Spec Feedback Protocol's sequential formalization gate: we settle this outline with Peter (and the tagged reviewers) before any formal document phase begins. Every scope claim here traces to `125-B-backlog.md` (the consolidated input) or the umbrella `../125-mechanical-enforcement-strategy/design-outline.md`. Items introduced net-new are labeled **[NEW]** with justification.

> **UPDATE (2026-07-12, third — FINAL pre-freeze pass): THREE REFINEMENTS folded; METHODOLOGY FROZEN for the design-outline feedback round (Peter, 2026-07-12).** (1) The two-layer frame extends to a **three-layer closed loop** — strategy (education) informs tactics (implementation); tactics are informed by validation (CI + linting); validation validates/invalidates strategy — with the **churn-rate placement test** and the lens-not-columns guard (§2). (2) The imposter test gains a **second, more mechanical blade**: volatile content in a durable home is prunable even if genuinely educational today (§2). (3) Prune outcomes get **user-agent probes** — comparative A/B probes pre-merge (cheap filter; precedent: the OB-7 probe-subagent method) plus the observation window post-merge (the real behavioral measure); the prunable grain is the RULE across all its surfaces, not doc-by-doc (§4 U1b, §9a Experiment 1). The umbrella reconciliation note is now **AUTHORIZED and applied** as a light dated note (same class as the umbrella's existing dated update blocks — not a ballot). **The §2 methodology as of this pass is FROZEN; the feedback round reviews it as-is.**

> **UPDATE (2026-07-12, second): METHODOLOGY REALIGNED pre-feedback-round (Peter, 2026-07-12).** Decision: **"CI validates functional and operational requirements, never ideology; education and verification are complementary layers"** (Peter, 2026-07-12). This restores the original Orbit-derived division of labor — *the docs MCP and skills educate agents on how to execute; CI + linting verifies that what they build meets functional/operational standards* — and supersedes two drifts that had accreted into the methodology: (1) the honesty guard's mechanizability ratchet, replaced by the boundary-call guard (§2); (2) duplication-as-failure-mode, sharpened to contradiction/imposter (§2). §1–§3, §9, and §9a are realigned below so the feedback round reviews the CORRECTED methodology, not the drifted one. The Q1 pilot shape and unit structure are unaffected; Experiment 1 is *strengthened* — the two framings make opposite predictions and the pilot now adjudicates between them (§9a). **Reconciliation flag:** this realignment diverges from the umbrella §5's pre-realignment wording; a dated reconciliation note for the umbrella is follow-up work (ballot-scoped — not edited here unilaterally). → §2, §10.

> **UPDATE (2026-07-12): Q1 / Q2 / Q5 SETTLED by Peter; Q6 PARKED.** U1 is now the **PILOT unit** (Q1 — pilot-first adopted; the deciding asymmetry: a bad prune is *reversible but not loudly detectable*, so buy one cheap observation cycle before scaling). The tool-boot smoke lives in **125-B**, consuming 122's manifest (Q2). 125-B follows the **FULL formalization pipeline** — outline → requirements → design → tasks with feedback gates at each phase, no compressed forms (Q5 — Peter: "We get bit in the backside just about every time we try to slim the spec development process... Cheap is expensive."). Q6 (release-detection disposition) is **PARKED** for a dedicated conversation — do not resolve it in feedback rounds. Q3 (warn→fail graduations) and Q4 (autonomy dial) remain **OPEN**, carried to the requirements phase; they do not block this outline. Resolution record → § "10". Sections §4, §9, §9a, and §10 updated accordingly; the outline remains a DRAFT pending the design-outline feedback round.

> **Primary source of truth for what 125-B owes:** `../125-mechanical-enforcement-strategy/125-B-backlog.md` — the single, deduplicated, provenance-tagged, triaged input. Its "Proposed unit shape" and MUST/SHOULD/LATER/ELECTIVE triage are **input to this outline's methodology, not binding**; where this outline adopts, adjusts, or rejects a backlog position, it says so.

---

## 1. Thesis / Problem — what 125-B IS

Spec 125's premise (umbrella §1): an LLM agent in a fresh context **obeys a barrier and only probabilistically honors a suggestion**. The governing frame (restored, Peter, 2026-07-12 — the original Orbit-derived division of labor): **the docs MCP and skills educate agents on *how to execute*; CI + linting verifies that *what they build* meets functional and operational standards.** CI is a functional-requirements layer, NOT an ideology validator — mechanized ideology makes the system rigid, which is exactly what the learning layer exists to avoid. Verification ensures standards are met (correct tokens, components using props, logical properties, contracts present, records verifiable); education teaches the judgment those standards can't capture. The strategy's per-rule job: decide what each layer owns for each rule (§2).

**125-A already shipped the mechanical sliver.** It armed what was authored-but-unarmed: the PR gate, full typecheck, `build:validate`, the wholesale functional suite, and both sub-package suites — promoted to required checks with did-it-really-run guards, proven per-lane at the platform level (umbrella §8, 2026-07-05 + 2026-07-10). 125-A answered *"turn on the checks we already have, behind a gate."*

**125-B is the judgment layer 125-A deliberately deferred.** It answers the harder question 125-A could not: *for the full corpus of governance/design rules — not just the handful already coded as checks — which should be a barrier, which stay prose, and which split?* Concretely, 125-B owns:

1. **The classification map (the spine)** — the per-rule register recording, for each rule, the boundary call (functional/operational vs. ideological), the verification disposition (block/warn/none), and the education disposition (umbrella §5 as realigned in §2), currently **greenfield: zero ratified rows** (backlog item 1). This is 125-B's central deliverable and first merge unit.
2. **The enforcement mechanisms 125-A deferred** — net-new checks (tool-boot smoke, warn→fail promotions) and the governance ratification layer (CODEOWNERS + PR-approval-as-ratification) that presuppose 125-A's now-shipped PR gate.
3. **The pruning pass** — deleting the **imposter prose** (prose that pretends to be enforcement, nags without teaching, or contradicts an armed gate — §2's rewritten pruning rule), while keeping and strengthening the prose that educates execution.

**The distinction in one line:** 125-A *armed the checks that existed*; 125-B *decides which rules state verifiable functional/operational requirements, builds the deferred barriers for them, and prunes the imposter prose — while leaving the education layer to teach* — the map is the decision record for those boundary calls, made once and ratified rather than re-litigated per agent, per prompt, per session.

---

## 2. The classification-map methodology (the spine) — REALIGNED 2026-07-12

*Grounded in umbrella §5, as REALIGNED by Peter's framing decision (2026-07-12): "CI validates functional and operational requirements, never ideology; education and verification are complementary layers." The realignment restores the original Orbit-derived division of labor (the umbrella's own §1 thesis: "leave the irreducibly-judgment rules to the learning layer — complementing the MCPs, not replacing them"; the Orbit trigger: making the wrong ARTIFACT "fail to compile"). Where this section diverges from the umbrella §5's pre-realignment wording, this text governs 125-B; the umbrella carries the older wording until a dated reconciliation note lands there (flagged as follow-up — ballot-scoped).*

**The layers (complementary, not competing) — refined to a closed loop (Peter, 2026-07-12):**
- **Education** (docs MCP, skills, steering prose) — teaches the execution loop *how to build well*: which token is semantically right, how to compose, why the standard exists.
- **Verification** (CI, lint, diff-gates) — checks that *what was built* meets a functional or operational standard: correct tokens, components using props, logical properties, contracts present, records verifiable.
- **Educate → build → verify.** A rule legitimately living in both layers is NOT a defect; each layer does a different job on the same rule.

**The strategy/tactics/validation loop.** The two layers are the ends of a three-layer closed loop: **the strategy (education) informs the tactics (implementation); the tactics are informed by validation (CI + linting) — which then validates or invalidates the strategy.** Peter's example, the clearest articulation: the docs/MCP should NOT say "design and run X, Y, Z tests" (drifts when tests evolve); instead — MCP: *"evaluate/develop a testing strategy in spec development"* (strategy, durable); the spec artifact: *"these are the tests we add to CI"* (tactics, per-decision); CI: *"these are the tests that failed"* (validation, always current). **Drift becomes impossible by construction** because specifics live only where they are mechanically kept current. The load-bearing property is **churn rate, not abstraction level** — "use semantic tokens first" is specific-but-stable and belongs in durable docs; "run these 7 commands" is specific-and-volatile and does not. **The placement test: does the content's churn rate match its surface's refresh rate?** Live evidence in the corpus: `start-up-tasks.md` carries a 2026-07-03 lane-semantics correction addendum ("treat any pre-July-2026 lane-duration claim as void") — tactical content in a durable home, forced into patch-note accretion; exactly what the loop prevents. **The loop's return edge** (validation invalidating strategy — recurring gate failures as evidence the education teaches the wrong thing) is REAL but currently **un-owned**; the pilot's observation window is its first manual exercise, and mechanizing it is an open question for the requirements phase — NOT machinery to design now. **Guard (recorded):** the three layers are a **LENS for placing content, not three required columns per map row** — many rules are legitimately two-layer (durable standard + check, no tactical middle; e.g. `no-hardcoded-color`). Demanding strategy/tactics/validation rows for every rule re-imports rigidity through taxonomy.

**Per-rule procedure — three questions, in order:**
1. **The boundary call (the classification criterion):** is this rule a **functional or operational requirement** of the artifact or workflow — or an ideological/stylistic preference? **Only functional/operational rules are eligible for verification.** Ideology never gets a check, however mechanizable — mechanized ideology is exactly the rigidity this system avoids. *Mechanizability is a feasibility question, never the classification criterion.*
2. **Verification disposition** (functional/operational rules only): what verifies it, and at what strictness — **block** or **warn** (each warn→fail promotion remains Peter's call, Q3)? "No check yet" is a recorded state, not a reclassification.
3. **Education disposition:** what does the education layer keep, author, or prune? Prose that *teaches* (the how, the why, the judgment) stays regardless of any check. Prose that is an **imposter** goes — see the pruning rule.

Under this procedure the old three-way disposition (barrier / prose / clean split) is **recast, not discarded**: "clean split" — the check verifies the *what*, prose teaches the *how/why* — becomes the **expected shape for most verified rules** rather than one of three competing options; "educate-only" is the honest home of judgment and values (e.g., *"is this the semantically correct token?"*), no longer a residual bucket meaning "couldn't mechanize"; check-only rows (nothing to teach — e.g. the tool-boot smoke, which has no prose predecessor) are the rare case.

**The two failure modes the map exists to prevent (sharpened under the realignment):**
- **Contradiction/imposter** (sharpened from "duplication") — prose that *contradicts* an armed gate, *pretends to BE the enforcement*, or leaves authority over the rule unclear (the live core of the old OB-7 coexistence concern). Mere coexistence of a check and teaching prose is NOT the defect; the defect is prose doing — or faking — the verification layer's job.
- **Gap** (unchanged) — each layer assumes the other owns a functional rule; nobody verifies it, and nothing teaches it.

**The pruning rule (rewritten): prune imposters, not teachers.** Targets: prose that pretends to be the enforcement, imperative nags that restate a gate's *what* without teaching anything ("remember to run npm test"), and prose contradicting an armed gate. Keep — and author where missing — the prose that educates execution. **[NEW — hazard to guard]** The rewritten rule is *softer* than the old ratchet, and "it educates" is a claim every nag will make for itself; without an imposter-test as crisp as the old guard was, pruning stalls and the corpus never sheds bloat. Experiment 1 (§9a) pilots the test before U1b scales it.

**The imposter test — two blades (second blade added by refinement, Peter, 2026-07-12):**
1. **The teaching blade:** does this text teach *how/why*, or merely restate a gate's *what* as an instruction? (Judgment-heavy; the pilot calibrates it.)
2. **The volatility blade:** is this **volatile content in a durable home**? A doc listing specific test names fails this blade EVEN IF genuinely educational today — it will mis-educate tomorrow when the tests evolve. This is the churn-rate placement test applied as a pruning criterion, and it is **more mechanical than blade 1** — volatility is easier to judge than pedagogical value. It partially answers the hazard above: a nag can claim to educate, but it cannot claim its churn rate matches its surface.

Content prunable under EITHER blade is prunable; blade 2 catches what blade 1's self-serving "it educates" defense would protect.

**The boundary-call guard (replaces the honesty guard — honesty in BOTH directions):**
- Do NOT dodge verification of a genuinely functional/operational rule by calling it "judgment" — the old guard's surviving core. Several rules that *sound* like judgment state verifiable requirements ("component tokens require approval" is an operational workflow requirement, not a value).
- Do NOT mechanize an ideological/stylistic preference just because a check is buildable — the new half. The old guard's mechanizability ratchet ("default to prose only after confirming truly unmechanizable") pointed at exactly these; that was the drift.

**Counter-argument on the record (kept deliberately):** the functional/operational-vs-ideological boundary is **not self-executing** — it will be contested rule-by-rule (is "missing WCAG ref" functional accessibility or documentation ideology? is "no autonomous token creation" operational protection of the mathematical foundation or a process value?). The map remains the place those boundary calls are made once and recorded — **the reframe changes the map's QUESTION, not the need for the map.** And the contradiction/imposter hunt retains duplication's live core: prose contradicting an armed gate is still a hunt-worthy defect; the definition sharpened, it did not vanish.

**Corollary — the map is a living register, not a one-time survey.** [NEW, minor — survives the realignment] The umbrella frames the map as an artifact 125 "owns." Since 122's auto-regeneration keeps the coupling soft (a mis-classified rule is fixed by editing canonical source and regenerating — umbrella §6), the map must be an *addressable, re-consumable register* that 122 and future rules read against, not a prose essay written once. Under the realigned procedure each row records the **boundary call**, the **verification disposition + owner**, and the **education disposition** — richer than the old single trichotomy, still a register. Justification: the crossRef re-point obligation (§5 below) requires the map to have a resolvable, named entry — which only makes sense if the map is a structured register. Flagged as an outline-level shape decision for the requirements phase, not settled here.

---

## 3. Seed rows (PROPOSED — NOT ratified)

The map starts greenfield. These are the seed rows carried forward as *input*; each becomes a real row only when ratified during formalization. Listing them here is provenance, **not** ratification.

**Re-centering note (realignment, 2026-07-12):** the map's center of gravity is **functional verification of built artifacts** (§3.3 — what the Orbit trigger was actually about: correct tokens, components using props, logical properties). The authority row (§3.1) survives as an *operational* requirement but is **no longer the map's flagship**.

### 3.1 The authority row

*Source: `inbound-from-ratification-protocol.md` §3; umbrella §5 (the map's first proposed row); backlog item 1.*

**Rule:** *"governance-law changes require Peter's ratification."*

**Proposed disposition (split by surface):**
- **Barrier** — for **gated** surfaces: a PR-approval gate (branch protection + CODEOWNERS on `governance/`), delivered by U3 (§4). Platform-verified authority.
- **Record-check** — for **ungated** artifacts: committed ballot status per `.kiro/docs/ballots/README.md` (ratification layer 1, in force now).
- **Prose keeps only the *why*** — the rationale in the ballots README / generated prompts.

**Origin:** the 2026-07-05 relayed-authority incident — an agent forced into a trust-or-refuse judgment because authority existed only as a message claim; friction without protection. The lesson: *claims are suggestions; records are contracts.*

**Realigned status (2026-07-12):** the row survives the reframe as an **OPERATIONAL requirement** — a verifiable record vs. a trusted claim is an operational property of the workflow, and the incident was a real operational failure. But it is **not the map's flagship**; the center of gravity is §3.3's functional rows. It remains **in the U1 pilot regardless** — membership is obligation-driven, not centrality-driven: the crossRef re-point (§5) and Experiment 2 (§9a) both attach to this row.

**⚠ Critical coordination obligation (122 is SHIPPED).** 122 is complete and **already propagates an agent-facing verify-the-record rule** into generated prompts. The map's authority row must **coordinate its wording with 122's canonical source** so the surfaces neither **contradict each other or leave authority unclear** (contradiction/imposter failure mode) nor **orphan the rule** (gap failure mode) — the map's own §2 failure modes applied to its own first operational row. Under the realigned frame, 122's propagated prose legitimately *educates* (why records beat claims) while the verification layer *verifies* (record-check now; PR-approval barrier at U3) — coexistence is expected; what must be ruled out is contradiction and enforcement-pretending. This is not a passive note: it is a **named 125-B deliverable** — before the authority row is ratified, 125-B must (a) locate 122's canonical source for the propagated rule, (b) record which layer verifies and what the education copies teach, and (c) confirm the texts agree by construction. Because 122's coupling is soft (auto-regen), the fix path if they drift is "edit canonical source, regenerate" — but the *decision* is 125-B's to make and record in the map.

### 3.2 The prune-with-arm rows

*Source: `inbound-to-125-B-from-125-A.md` §4 + `inbound-to-125-B-from-122.md`; backlog item 1.*

125-A Task 1's what/why splits — e.g. *"run `npm test` before marking a task complete"* shifts from **instruction → context** once the gate runs it as a required check. These are the seed material for the map's clean-split rows: the check verifies the *what*; the prose is assessed per surface under the realigned pruning rule.

**Realigned framing (2026-07-12):** these rows are the pilot's **boundary-adjudication material**. For each prose surface carrying the rule, the question is no longer "is this redundant with the gate?" but **"is this a teacher or an imposter?"** — does the text educate the execution loop (keep), or merely restate the gate's *what* as an imperative nag (prune)? The two framings make **opposite predictions** about what happens when the what-prose is pruned — which is exactly what Experiment 1 (§9a) now adjudicates. Each row remains a proposed row awaiting ratification + a paired, per-surface pruning assessment.

### 3.3 Functional seed candidates (the re-centered core) [NEW placement — content grounded in umbrella §2 + §4 Phase 2]

*The rows the realignment re-centers the map on — verification of built-artifact correctness, what the Orbit trigger was actually about. Candidates for U1b/U2/U3; named here so the map's center of gravity is visibly functional from the outset.*

- **Token-first at the consumption site / `no-hardcoded-color` (and siblings)** — a consumer hard-coding `#FF0000` passes every check today; the lint is aspirational, unbuilt (umbrella §2). Functional correctness of built artifacts; the most-repeated rule in the steering corpus. Ada owns any token-side lint (§8).
- **Token-approval diff-gates ("no autonomous token creation")** — operational workflow requirement protecting the mathematical foundation (proposed boundary call — contested; see §2's counter-argument). Experiment 3's subject (§9a); U3 candidate.
- **Contract warn→fail candidates** (e.g., missing WCAG refs, incomplete validation criteria — umbrella §2) — each requires a boundary call (functional accessibility vs. documentation ideology) AND a Peter strictness call (Q3). Lina owns the Stemma lane (§8).

---

## 4. Declared merge-unit shape

*125-B stays a single, internally-phased spec (Peter, 2026-07-11 — umbrella §8). Scope discipline comes from declared merge units (the 122 pattern), not more spec directories. This section adopts the backlog's proposed unit shape with refinements noted.*

**Adopted structure — PILOT-FIRST (Q1 DECIDED, Peter, 2026-07-12):**

| Unit | Contents | Readiness (grounded) |
|------|----------|----------------------|
| **U1 — Pilot** | A **minimal map register** (the §2 spine's addressable form) seeded with **two rows run end-to-end**: the prune-with-arm row (**Experiment 1**, §9a — classify → ratify → prune → observe; U1's first subtask) and the authority-row ownership resolution (**Experiment 2**, §9a — incl. the §3.1 122-coordination deliverable). **Plus the tool-boot smoke ships alongside in U1** — its map row is trivially "barrier, nothing to prune" (no prose predecessor); home DECIDED: **125-B, consuming 122's manifest** (Q2, Peter, 2026-07-12). **Discharges the crossRef re-point obligation** (§5) — the register existing with its `record-first-ratification` entry is all the re-point needs; it does not wait for the full corpus. | **Ready now.** 122 complete; `canonical/shared/shared-catalog.yaml` crossRef still reads `crossRefStatus: interim` (verified 2026-07-11); `canonical/registry/tool-registry.json` exists (verified 2026-07-11, 14KB, all three MCPs). Experiments 2–3 (§9a) run as pre-requirements evidence-gathering feeding the requirements phase. |
| **U1b — Map at scale** | The full-corpus classification pass + its pruning actions, executed in **classify→ratify→prune freshness waves** (each wave's prune lands close in time to its classification, so rows don't go stale against a regenerating corpus — see evidence-freshness constraint below). **Wave grain (refinement, Peter, 2026-07-12): the prunable unit is the RULE across ALL its surfaces, not doc-by-doc** — a half-pruned rule still teaches from unpruned copies, so nothing is measured; a wave is a batch of rules each pruned across all their surfaces. **Each wave's prune is A/B-probed pre-merge** (the §9a user-agent probe protocol; 122's generator can build the candidate pruned prompt-variant *before* ratification, so the probe runs as pre-merge evidence). | **GATED on U1's pilot observations.** Scales only after Experiment 1's observation window closes; if the pilot falsifies a methodology claim (§9a), the methodology is amended here *before* scaling — that is the point of the pilot. |
| **U2 — Net-new checks** | Warn→fail promotions (fail-on-unexpected-console, inverse-drift/incremental-build integrity) — each a *separate Peter strictness call* (Q3, OPEN, carried to requirements). *(Tool-boot smoke moved to U1; release-detection removed — PARKED per Q6.)* | **Buildable; blocked on Q3.** Peter-blocked decisions live here so they don't hold U1/U1b's agent-executable work hostage (who-must-act constraint, below). |
| **U3 — Governance layer (Phase 2)** | CODEOWNERS + PR-approval-as-ratification (the barrier half of the authority row); token/governance diff-gates. | **Later.** May need platform/repo-settings work (CODEOWNERS, branch-protection review requirement) that is Peter's to configure, like 125-A's protection toggles. |
| **Elective — Autonomy dial** | A policy doc (amending Task-Completion-Protocol scope), NOT machinery, mapping armed checks → the autonomy expansions they purchase. | **Peter's election (Q4, OPEN), revisit at U1/Phase-1 closeout.** Tracker item so "optional" doesn't rot (§7). Counter-argument on record: may be premature at solo scale. |

**Named constraints on the unit shape** [NEW — framings surfaced during the Q1 settle, recorded as load-bearing]:
- **Review-bandwidth ceiling.** Each unit costs a branch, PR, feedback context, and a Peter-merge; at solo scale the unit count is bounded by Peter's review attention, not just diff coherence. Four substantive units (U1, U1b, U2, U3) + one elective policy PR is **at the ceiling** — experiments live *inside* units (U1 subtasks / pre-requirements evidence), never as additional units. The `U1b` naming signals a continuation of U1's effort, not a fifth independent workstream.
- **Who-must-act split.** Work blocked on Peter personally (every Q3 strictness call; U3's repo-settings configuration) is quarantined in U2/U3 so it never holds agent-executable work (U1, U1b) hostage. A scheduling rationale distinct from architecture or clarity-layering.
- **Evidence-freshness waves.** The map classifies against a live corpus that 122 regenerates; U1b batches classify→ratify→prune into waves executed close in time, rather than classify-all-then-prune-all, so early rows don't go stale before their pruning action lands. Waves are cut at **rule grain** (a rule and all its surfaces travel together — refinement, Peter, 2026-07-12) and each wave's prune is **A/B-probed pre-merge** per §9a's probe protocol.

**Refinements to the backlog's unit shape (adjustments, with reasons):**
- **U1 is a PILOT, not the full map** (Q1, Peter, 2026-07-12 — adopted from §9's revised recommendation). The backlog's U1 was the whole classification pass; pilot-first splits that into U1 (two rows end-to-end + tool-boot smoke + crossRef closure) and U1b (full corpus, gated on observations). Rationale: the methodology's riskiest claim — pruning is behaviorally safe — is untested, and a bad prune is reversible but not loudly detectable; one cheap observation cycle before scaling buys the detection reversibility doesn't provide.
- **Tool-boot smoke moved from U2 into U1** (consequence of Q1 + Q2). It has no prose predecessor, hence no classification dependency — it delivers immediate mechanical value without waiting on the map, and its trivial map row is written as it ships.
- **Release-detection disposition REMOVED from the unit shape — PARKED** (Q6, Peter, 2026-07-12). My draft placed backlog item 4 in U2; Peter parked it for a dedicated conversation instead. It is neither assigned to a unit nor resolvable in feedback rounds; it re-enters when that conversation happens.
- **Pruning is a named deliverable of U1 (pilot row) and U1b (waves)** — unchanged in intent from the draft: the pruning obligation can't slip to "later"; it is now *structured* by the pilot gate rather than merely named.
- **WATCH item (jest major-version split, backlog item 8) is NOT a unit.** It is a known-deferred hazard, not an action item. It stays on the watch list; 125-B does not commit to resolving it. Named here only so it isn't silently dropped.

**How this keeps 125-B one spec yet incremental:** each unit is a coherent, independently-reviewable diff that merges on its own (Task-Completion-Protocol § Coherent Units). U1 delivers the pilot register + tool-boot smoke + crossRef closure and merges; U1b scales the map once the pilot's observations are in; U2 delivers checks as Peter's strictness calls land; U3 delivers the governance layer when its platform work is ready. The spec stays "open" until its slowest unit merges — the accepted counter-cost of the single-spec decision (umbrella §8) — and the only intentional gate between units is U1→U1b (the pilot gate, which exists precisely to be waited on).

---

## 5. The crossRef re-point obligation (a U1 deliverable)

*Source: `inbound-to-125-B-from-122.md`; backlog item 2 (MUST, tied to U1). Only 125-B can author this.*

When U1's classification-map artifact exists:
1. **Re-point** `canonical/shared/shared-catalog.yaml`'s `record-first-ratification` crossRef from the ballots-README interim target to the map's `record-first-ratification` entry; remove `crossRefStatus: interim` + `crossRefResolveWhen`.
2. **Author the reciprocal half** — the map entry names `canonical/shared/shared-catalog.yaml` back (the two-ended requirement; only 125-B can write this half).

**Standing-visibility precondition to check at formalization:** sweep 1 (`122-sweep-1-refs`, a required check) enumerates all interim crossRefs every run. **If that enumeration already reports zero interim targets at formalization, verify and discard this item.** As of 2026-07-11 the catalog still carries `crossRefStatus: interim`, so the obligation is live — but requirements-phase must re-confirm against the current sweep report before committing work to it.

**Pilot-shape note (Q1):** the re-point does NOT wait for U1b's full corpus. The U1 pilot register existing with its `record-first-ratification` entry (the authority row, Experiment 2's subject) is all the re-point needs — the obligation discharges in U1.

---

## 6. Scope boundaries — what 125-B does NOT own

- **Phase 3 / consumer-side reach → Spec 123.** Teeth stop at DesignerPunk's repo boundary; getting enforcement to a consumer's point-of-use is 123's problem (umbrella §4 Phase 3, §6a). 125-B *feeds* 123, does not solve it.
- **Token mathematics / token-side test authorship → Ada.** 125-B decides *whether* a token rule becomes a barrier and *what mechanism* enforces it; Ada owns the token math and writes any token-side lint/diff-gate (umbrella §7). Thurgood audits; Ada implements token checks.
- **Component architecture / Stemma test authorship → Lina.** 125-B decides *whether* a Stemma rule (e.g., a warn→fail promotion) graduates to blocking; Lina owns the component architecture and writes/arms the Stemma lane checks (umbrella §7).
- **125-B decides the enforcement MECHANISM only** — the boundary call (functional/operational vs. ideological), the verification disposition, the education disposition, and where each check lives. It does not re-decide the underlying rules' *content* (that's the domain agents') and it does not re-open 125-A's shipped substrate.
- **Not carried (do not re-mine):** the backlog's CONSUMED/HISTORICAL section — lane-viability measurements (consumed by 125-A), 122 sequencing, spent wordpress-thesis items, resolved ledger findings, the resolved PAT asymmetry. These are evidence, not open work.

---

## 7. Relationships

- **Spec 122 (Agent Generator) — COMPLETE.** Coordination on ONE shared artifact (the classification map), **not** a technical build dependency. 122 delivers governance rules as prompt-prose; 125-B decides which become CI barriers; the two must agree rule-by-rule. **Kept soft by auto-regen** — a mis-classified rule is fixed by editing canonical source and regenerating, so 125-B never *blocks* on 122 and can re-consume a revised map later. The authority-row coordination (§3.1) is the concrete instance of this relationship 125-B must actively discharge.
- **Spec 125-A (PR gate + mechanical arming) — SHIPPED.** The substrate the barriers plug into: the PR gate U3's CODEOWNERS layer sits on, the required-check machinery U1's tool-boot smoke and U2's checks register into, the armed lanes whose prose the U1 pilot (and U1b's waves) prune. 125-B builds *on* 125-A; it does not re-open it.
- **Spec 123 (Consumer Distribution) — FUTURE.** Phase 3 home for consumer-side reach. 125-B feeds it the problem statement; sequencing is 125-A → 122 → (125-B ∥ 119-B) → 123 (umbrella §8).

---

## 8. Ownership

*Per umbrella §7, unchanged.*
- **Lead: Thurgood** (Civitas steward) — the classification map, CI/governance-tooling adoption, spec formalization, the pruning pass, audit of what's armed vs. prose.
- **Ada** — token-side lints and diff-gates (any token rule the map classifies as barrier).
- **Lina** — Stemma warn→fail strictness; arming/tightening the component contract-composition lane.
- **Stacy** — process/quality impact of the workflow strictness changes (esp. warn→fail ergonomics, the per-suite triage cost).
- **Peter** — **all warn→fail strictness calls** (each promotion is his decision, not a default), the workflow/authority decisions (U3's ratification layer, CODEOWNERS), and the autonomy-dial election.

---

## 9. Main structural recommendation + counter-argument

> **ADOPTED (Q1, Peter, 2026-07-12): pilot-first U1**, as recommended below. The original map-first recommendation and its history are preserved in this section's record; the adopted shape is §4's.

**Adopted recommendation: pilot-first — #4-led, #3-shaped, retaining #2's core** (restated under Peter's four-framings taxonomy for splitting work: #1 reduce-effort [invalid]; #2 architecture/modularity; #3 layer clearest→fuzziest; #4 test the theory):

U1 is a **pilot unit**: a minimal map register seeded with two rows run end-to-end — the prune-with-arm row (Experiment 1, the clearest line *with* prose overlap) and the authority-row ownership resolution (Experiment 2, the deliberately hard one) — shipping **alongside the tool-boot smoke**, whose map row is trivial ("barrier, nothing to prune") and which delivers immediate teeth without any classification dependency. The full-corpus classification (U1b) scales **only after the pilot's observations are in**. This honors **#4** (the classification-map methodology is itself an untested theory — U1 *is* the experiment), uses **#3** to select the pilot rows (clearest-with-overlap first, plus one hard row so the pilot isn't a softball), and retains **#2**'s defensible core (the register exists before bulk classification, as the artifact later rows read against).

**Why the draft's pure map-first did not survive the taxonomy:** it was made under #2 but overweighted it — the map is only load-bearing architecture *for rules with prose overlap*. No-prose-predecessor checks (the tool-boot smoke) have no duplication/gap risk; nothing reads against the map before building them. Holding them behind the full map bought no architectural safety.

**Counter-argument (considered and OVERRIDDEN — kept on the record):** pilot-first could be **validation theater**. A two-row sample at solo scale yields noisy, small-N behavioral observations — we may simply confirm whatever we expect, and a classification taxonomy is partly definitional, resistant to falsification by sample. Meanwhile 122's auto-regen already makes misclassification cheap to reverse (edit canonical source, regenerate); if misclassification is cheap to fix, the pilot's insurance value shrinks and straight map-first is simpler and faster. **Peter's deciding asymmetry (2026-07-12): reversible ≠ detectable.** A bad prune is git-reversible, but nothing *announces* it — the degradation (agents no longer told the *what*, behaving worse against the gate) would surface slowly and diffusely, if at all. The observation cycle buys the detection that reversibility does not provide. The counter-argument stands as the thing to watch for in U1: if Experiment 1's observation window closes without a crisp signal either way, that is itself a finding (the methodology's claims may not be observable at solo scale) and U1b proceeds on the definitional merits.

**Realignment note (2026-07-12):** the pilot-first shape is **unaffected and strengthened** by the methodology realignment. The two framings make **opposite predictions** about Experiment 1's prune — the pre-realignment map-frame predicted pruning the what-prose is safe (it was redundant with the gate); the realigned layered frame predicts pruning *teaching* prose degrades behavior (it was education). U1 now **adjudicates between framings**, which is a sharper experiment than the one originally designed (§9a). The validation-theater counter-argument weakens accordingly: the pilot no longer merely confirms a single framing's expectations — it distinguishes between two that disagree.

---

## 9a. The experiments (load-bearing for U1's shape; recorded for the requirements phase)

*Each experiment names what it tests, rough cost, its falsification/adjudication condition, and its placement relative to the formalization gates. Q5 is decided (FULL pipeline — no compressed forms): these experiments **inform** the phases; none replaces one. The methodology's decomposed claims, as REALIGNED (2026-07-12): (A) the map prevents gaps — every functional/operational rule gets a verification owner; (B) the contradiction/imposter hunt finds real defects — prose contradicting or impersonating a gate is detectable and actionable; (C) the boundary call is makeable — functional/operational vs. ideological can be decided crisply rule-by-rule, with mechanizability as feasibility only; (D) the teacher/imposter distinction is real — pruning imposter prose is behaviorally safe, pruning teaching prose is not, and the two are distinguishable in practice.*

**Experiment 1 — Single-row end-to-end pilot: the prune-with-arm row. NOW THE FRAMINGS-ADJUDICATOR.**
- **Tests:** Claim D — and, since the realignment, **adjudicates between the two framings, which make opposite predictions**: the pre-realignment map-frame said the what-prose is redundant with the gate (pruning is safe); the realigned layered frame says prose surfaces may be education (pruning teachers degrades behavior). Uniquely cheap because **125-A already did the arming half** — the rule *"run `npm test` before marking complete"* is enforced by required checks today while its prose persists on multiple always-loaded surfaces (Start Up Tasks, Task-Completion-Protocol, the ambient workflow doc — three surfaces carrying one rule). The pilot assesses each surface as teacher-or-imposter, prunes only the assessed imposters, and observes.
- **Cost:** hours of authoring (map row + ballot + steering edits) + an observation window over ordinary work (~2 weeks of PRs that happen anyway).
- **Adjudicates:** if post-prune behavior holds (first-push failure rate flat, no re-accretion), the pruned text was imposter nag — the prune rule's criteria are validated for this class. If behavior degrades (first-push failures rise; agents stopped validating locally), the pruned text was *teaching* — Peter's layered frame confirmed at the behavioral level, and the imposter-test criteria must tighten **before** U1b scales. Either outcome calibrates the §2 pruning rule; a no-signal window is itself a finding (§9).
- **User-agent probe protocol (refinement, Peter, 2026-07-12) — the pre-merge half of a two-tier verification.** The corpus's users are agents, so prune outcomes get usability-tested with the actual user: **probe agents consume the pruned context and demonstrate whether the teaching survived.** Precedent: the OB-7 probe-subagent method (2026-07-11, `.kiro/specs/122-agent-generator/cutover/ob7-probe-evidence.md` — same repo, worked, ~seconds cheap). Three design points on record:
  - **Grain:** the prunable unit is the **rule across all its surfaces**, never doc-by-doc — a half-pruned rule still teaches from its unpruned copies and the probe measures nothing (this is why Experiment 1 prunes all three surfaces of its rule as one action, and why U1b's waves are cut at rule grain, §4).
  - **Design:** probes are **scenario-based and COMPARATIVE** — A/B: the same realistic scenario run against pruned vs. unpruned context, diffing the described workflow. Never leading questions ("should you run tests?" gets yes from priors regardless of context). Composition note: 122's generator can build the candidate pruned prompt-variant *before* the prune is ratified, so the A/B probe runs pre-merge as evidence for the ratification.
  - **Limit (honest):** probes measure **knowledge/stated behavior, not behavior-under-load**. Hence two tiers: the probe pre-merge (cheap filter — catches gross teaching loss) + this experiment's observation window post-merge (the real behavioral measure). **Probe-pass means "no gross loss detected," NEVER "prune proven safe."** Counter-argument on record: probe results at solo scale are noisy and confirmation-prone; the A/B design mitigates, it does not eliminate.
- **Placement:** governance-law edits are involved (ballot-gated) → **U1's first subtask**, inside the pipeline. NOT pre-spec work. The A/B probe runs pre-merge within the subtask; the observation window follows the merge.

**Experiment 2 — Ownership-and-contradiction probe: run the methodology on the authority row.**
- **Tests:** Claims A/B under the realigned frame. The authority rule lives on at least four surfaces (122's generated prompts, the ballots README, Task-Completion-Protocol's merge rule, the shared-catalog entry). Enumerate them and apply the §2 procedure. **Realigned expectation:** multiple education copies of the *why* are legitimate — the probe no longer treats "every surface keeps a copy" as automatic degeneration. What it must produce: a crisp **verification owner** (which layer/check verifies the rule), a per-surface education assessment, and a **contradiction scan** across the four texts. Discharges §3.1's 122-coordination deliverable as a side effect.
- **Cost:** an afternoon of corpus enumeration; read-only, no arming (the barrier half is U3's).
- **Falsifies if:** the row format cannot express the verification-owner/education-copies separation without inventing structure the outline doesn't have, or the contradiction scan can't distinguish real contradiction from intentional abstraction — meaning the register needs a richer surface model *before* scaling, not after.
- **Placement:** read-only → **pre-requirements evidence-gathering** (same genre as the umbrella's verified-inventory probes); feeds the requirements phase.

**Experiment 3 — Boundary-call + feasibility spike: one contested rule end-to-end.**
- **Tests:** Claim C, in its realigned two-part form. Take *"no autonomous token creation"* (prose-only today). **Part 1 — the boundary call:** classify it under the §2 procedure (proposed: operational — it protects the mathematical foundation's integrity; contested per §2's counter-argument — it could be read as a process value). **Part 2 — feasibility:** prototype the detection logic — unarmed, not required — against historical diffs or a synthetic PR: can a diff-gate reliably detect "adds a token definition without an approval marker"? Mechanizability here informs *feasibility of the verification disposition*, never the classification itself.
- **Cost:** ~a day's spike; **Ada consulted** for token-surface specifics (her domain — Thurgood audits the result, Ada owns any token-side check logic).
- **Falsifies if:** Part 1 — the boundary call cannot be made crisply (the functional/operational-vs-ideological test produces a shrug), validating §2's counter-argument and forcing a richer boundary rubric before U1b. Part 2 — the check is noisy or vacuous without heavy context, in which case the rule keeps "no check yet" as its recorded verification state (NOT a reclassification to ideology). If both parts work, the boundary-call guard is validated AND a real U3 diff-gate candidate exists.
- **Placement:** throwaway prototype → **pre-requirements spike** or early U2 subtask; either respects the full pipeline.

**Coverage:** the three experiments cover the realigned claims (D — the adjudicator; A/B; C respectively). Claim D remains the most consequential — the pruning rule rests on the teacher/imposter distinction being real — which is why Experiment 1 anchors the U1 pilot and now carries the framings-adjudication role.

---

## 10. Open Questions — resolution record (updated 2026-07-12)

**Decisions on record (Peter, 2026-07-12 — do not re-litigate in feedback rounds):**
- **THREE REFINEMENTS + FREEZE (final pre-freeze pass).** (1) **The strategy/tactics/validation loop** — education informs implementation, implementation is informed by validation, validation validates/invalidates strategy; placement governed by the **churn-rate test** (does content's churn rate match its surface's refresh rate?); guard: the loop is a *lens*, not three required columns per map row (§2). (2) **The imposter test's second blade** — volatile content in a durable home is prunable even if educational today; more mechanical than the teaching blade (§2). (3) **The user-agent probe protocol** — rule-grain pruning across all surfaces; scenario-based comparative A/B probes pre-merge (OB-7 precedent); two-tier verification with the honest limit that probe-pass ≠ prune-proven-safe (§4, §9a). The loop's return edge (validation invalidating strategy) is real but un-owned — mechanizing it is an open question FOR REQUIREMENTS, not machinery now. **The §2 methodology is FROZEN for the design-outline feedback round as of this pass.** The umbrella reconciliation note is authorized and applied (light dated note, not a ballot).
- **METHODOLOGY REALIGNED — "CI validates functional and operational requirements, never ideology; education and verification are complementary layers."** Restores the original Orbit-derived division of labor (docs/skills educate execution; CI verifies the built artifact). Recasts §2: the boundary call (functional/operational vs. ideological) replaces the mechanizability ratchet as the classification criterion; contradiction/imposter replaces duplication as the failure mode; the pruning rule becomes "prune imposters, not teachers." Re-centers the map on functional rows (§3.3); the authority row survives as operational, no longer flagship (§3.1). Experiment 1 becomes the framings-adjudicator (§9a). Counter-argument kept on the record (§2): the boundary is not self-executing — the map is where the boundary calls get made; the reframe changes the map's question, not the need for the map. **Follow-up flagged:** umbrella §5 needs a dated reconciliation note — *discharged same day: authorized by Peter as a light dated note (not a ballot) and applied; see the refinements entry above.*
- **Q1 RESOLVED — pilot-first U1**, the §9 revised recommendation adopted as recommended. Deciding asymmetry: a bad prune is *reversible but not loudly detectable* — buy one cheap observation cycle before scaling. Shape → §4; experiments → §9a.
- **Q2 RESOLVED — the tool-boot smoke lives in 125-B**, consuming 122's manifest (`canonical/registry/tool-registry.json`). Ships in U1 (§4).
- **Q5 RESOLVED — FULL formalization pipeline**: outline → requirements → design → tasks, feedback gates at each phase, no compressed forms. Peter: "We get bit in the backside just about every time we try to slim the spec development process... Cheap is expensive." The §9a experiments inform phases; none replaces one.
- **Q6 PARKED — release-detection disposition** (backlog item 4: where release detection lives under the PR flow; surface-or-retire the silent post-merge job) is deferred to a **dedicated Peter-scheduled conversation**. It is NOT a reviewer question, NOT assigned to a unit (§4), and NOT resolvable in feedback rounds.

**Still OPEN — carried to the requirements phase (they do not block this outline):**

3. **Which warn→fail candidates graduate — and to what?** Each is Peter's strictness call, not a default: (a) fail-on-unexpected-console (real per-suite triage cost, Lina's pattern applies); (b) inverse-drift / incremental-build integrity check. Also: does the pending jsdom stylesheet-limitation doc-addition ballot fold into (a) here? *(Gates U2's content, not the outline.)*

4. **Is the autonomy dial elected now or deferred with its trigger?** The backlog marks it ELECTIVE with an activation trigger at U1/Phase-1 closeout, and a standing counter-argument that it may be premature at solo scale. Do we schedule it as a U1-closeout tracker item, or defer indefinitely until stop-and-wait demonstrably chafes?

---

## Cross-References
- `../125-mechanical-enforcement-strategy/125-B-backlog.md` — the consolidated, triaged input (primary source)
- `../125-mechanical-enforcement-strategy/design-outline.md` — the umbrella strategy (§5 map methodology, §8 decisions)
- `../125-mechanical-enforcement-strategy/inbound-to-125-B-from-125-A.md` — deferred items + observed warn→fail candidates
- `../125-mechanical-enforcement-strategy/inbound-to-125-B-from-122.md` — the crossRef re-point obligation
- `../125-mechanical-enforcement-strategy/inbound-from-ratification-protocol.md` — the authority row + layer-2 source
- `canonical/registry/tool-registry.json` — the tool-boot-smoke manifest (verified present 2026-07-11)
- `canonical/shared/shared-catalog.yaml` — the crossRef re-point target (verified `crossRefStatus: interim` 2026-07-11)
- `.kiro/docs/ballots/README.md` — record-first ratification (layer 1, in force)
- `.kiro/steering/Spec-Feedback-Protocol.md` — the formalization gate this outline pauses at
- `.kiro/specs/122-agent-generator/cutover/ob7-probe-evidence.md` — the probe-subagent precedent for §9a's user-agent probes (verified present 2026-07-12)
- `.kiro/steering/start-up-tasks.md` (line ~69, the 2026-07-03 lane-semantics addendum) — live evidence of tactical content in a durable home (§2's churn-rate test)

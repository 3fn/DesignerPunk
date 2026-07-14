# Implementation Plan: 125-B — Classification Map & Deferred Enforcement Layers

**Date**: 2026-07-13
**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Status**: Tasks Phase
**Dependencies**: requirements.md (17, merged PR #72) + design.md (C1–C9, DD1–DD8, merged PR #73 — DD7/DD8 RATIFIED by that merge)

---

## Exclusions (restated so nobody scopes them)

- **Q6 / release-detection**: PARKED (Peter, 2026-07-12; chartered for a dedicated conversation). NO task in this plan touches release-detection.
- **`no-hardcoded-color` lint build**: classify-only in 125-B (requirements Introduction) — register row in U1b, no lint task.
- **CONSUMED backlog items / Phase 3 consumer reach**: closed / Spec 123's.

---

## Declared Merge Units (Task-Completion-Protocol § Coherent Units — reviewed in this tasks round, never judged at merge time)

*Relabeled per STACY tasks-R1 (accepted in R2): the pilot is **THREE UNITS grouped under the "U1 Pilot" PHASE** — a phase is a narrative label; the merge grain is the unit. Gates and tasks unchanged from the draft. Acceptance is crisp: Task 1 is accepted at U1-s's merge, Task 2 at U1-p's, Task 3 at U1-c's.*

| Unit | Phase | PR | Contents | Gate |
|------|-------|-----|----------|------|
| **U1-s — Pilot substrate** | U1 Pilot | One PR (Tasks 1.*) | Register + protocol + Exp 2 + pilot row + smoke + crossRef + probe/trial evidence | None. |
| **U1-p — The prune** | U1 Pilot | One PR (Task 2) | The governance-law prune, evidence attached | U1-s merged + probe/trial evidence attached. Peter-merged (standing carve-out). |
| **U1-c — Window + closeout** | U1 Pilot | One PR (Tasks 3.*) | Window dataset + closeout record + return-edge refs | Window closed (N=20 per protocol). |
| **U2 — Checks** | — | One PR (Tasks 4.*) | Exp 3 spike; WCAG re-arm + validation promotion; console-fail; U2 register entries | Branches from main after U1-s merges (needs the register). Independent of the prune chain. |
| **U1b — Map at scale** | — | Declared, NOT broken down | Full-corpus waves | **Gated on the RECORDED CLOSEOUT VERDICT ballot** (Task 3.2), not merely the report. Tasks authored post-verdict as a tasks.md amendment with its own lightweight review — they cannot be written before the pilot's calibration exists. |
| **U3 — Governance layer** | — | Declared, NOT broken down | CODEOWNERS + PR-approval-as-ratification + Exp-3-informed diff-gates | Gated on U2 (Exp 3 evidence) + Peter's scheduling; platform settings are Peter's action. Charter grain per design C9. |
| **Elective — Autonomy dial** | — | No PR unless elected | Policy amendment only | Decision point inside Task 3.2's batched Peter session (Req 15). |

**Why the pilot spans three units (structural necessity, not preference):** the observation window (Req 8) measures ordinary work merged AFTER the prune and BEFORE the closeout — so the prune must merge mid-phase and the closeout must follow ~N=20 PRs later. A single-PR pilot is physically impossible. The phase's coherence lives in its evidence chain (protocol → probe/trial → prune → window → closeout) — three units whose Gate column couples them exactly as the law couples sequential dependent units. **Bandwidth check**: 4 substantive units now (U1-s, U1-p, U1-c, U2) — at the declared ceiling; U1b/U3 come later under their own gates.

**Sequencing**: Task 1 (U1-s) → Task 2 (U1-p, Peter-merged) → [window runs over ordinary work] → Task 3 (U1-c) → U1b gate. Task 4 (U2) branches from main after U1-s merges and proceeds in parallel with the window.

---

## Task List

- [x] 1. U1-s: Pilot Substrate

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The register exists at `governance/classification-map.md` with compliant header, schema, and the pilot's entries
  - The measurement protocol is authored and instrumented BEFORE any prune lands (Req 8.1)
  - Probe + trial evidence exists and is citable by the U1-p PR
  - The tool-boot smoke is wired as a required check with its calibration guard intact
  - The crossRef re-point is complete and sweep-1-verified in the same PR

  **Primary Artifacts:**
  - `governance/classification-map.md`
  - `completion/pilot/measurement-protocol.md`, `probe-evidence.md`, `trial-diff-table.md`, `trial-transcripts/`, `exp2-authority-row-record.md`
  - The smoke workflow/check + `canonical/shared/shared-catalog.yaml` re-point

  **Completion Documentation:**
  - Detailed: `.kiro/specs/125-B-classification-map/completion/task-1-parent-completion.md`
  - Summary: `docs/specs/125-B-classification-map/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: `taskStatus` tool
  - `./.kiro/hooks/complete-task.sh "Task 1 Complete: Pilot Substrate (125-B)"` — this parent IS merge unit U1-s → PR opens; report URL and STOP. Accepted at merge.
  - Post-merge: trigger docs-MCP `rebuild_index` (governance/ is MCP-served; the register must be queryable). Smoke gate-bite proof (1.6) runs as a throwaway post-merge PR — the 125-A pattern.

  - [x] 1.1 Author the measurement protocol
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood (Opus) — pre-commitments are judgment; they steer every later verdict
    - Rubric (workflow actions scored present/absent for the npm-test rule), pre-committed difference criteria
    - Window definition: N=20 (ratified, pilot-only); observed-PR filter (`task/*`,`fix/*`,`chore/*` head branches) + first-push SHA pinning (DD6); staleness triggers; **DD8 segment semantics + K=3 bound + the CROSS-SEGMENT ROLL-UP definition** (how one criterion verdict aggregates across segments — Stacy design-R2 watch item, lands HERE)
    - **Instrument-PR exclusion (STACY tasks-R1, HIGH):** the observed set EXCLUDES 125-B's own instrument PRs — U2's arming PR and ALL gate-bite throwaway PRs (engineered failures would directly corrupt first-push failure rate; the window must measure ordinary work, not the spec measuring itself). **U2 arming console-fail mid-window IS a Req 8.4 "materially changes" event → opens a DD8 segment boundary** (a new first-push failure source unrelated to the prune). **Known limitation, recorded in the protocol notes:** U2's agents are prune-aware (non-independent observers) — at solo scale every observer is somewhat prune-aware; the exclusion handles the mechanical contamination, this note handles the honesty.
    - Manual query recipes (gh/check-run, re-accretion grep, allowlist-churn count) — repeatable by hand, Req 8.6
    - _Requirements: 8.1–8.7; Design: C4, DD6, DD8_

  - [x] 1.2 Create the register scaffold
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (Sonnet) — settled schema, settled location
    - `governance/classification-map.md`: steering metadata header; addressing/citation docs (Req 1.6); entry-id constraints (unique + non-substring — C1); the § Data Models schema incl. `scoped` sentinel, per-scope checks/check_state, DORMANT enum
    - _Requirements: 1.1–1.7; Design: C1, DD1_

  - [x] 1.3 Experiment 2 — authority-row resolution
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood (Opus) — multi-surface ownership + contradiction adjudication is judgment
    - Enumerate all surfaces; per-scope verification owners; per-surface education assessments; contradiction scan; discharge the 122-coordination deliverable (locate canonical source, confirm agreement or edit+regen)
    - Register entry + `exp2-authority-row-record.md` (citable, Req 3.4)
    - _Requirements: 3.1–3.4; Design: C1, C2_

  - [x] 1.4 Pilot-row classification + per-surface assessments + candidate prune diff
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood (Opus) — teacher/imposter calls are the methodology's live judgment
    - Register entry for the npm-test rule; per-surface two-blade assessments with RECORDED sub-rule verdicts (Req 2.2); **npm-test imperative and Jest-not-Vitest education logged as SEPARATELY-CLASSIFIED clauses** (C2/LINA)
    - Produce the candidate prune diff (all three surfaces, rule-grain) — consumed by 1.7/1.8, ratified in Task 2
    - _Requirements: 2.1–2.3; Design: C2_

  - [x] 1.5 crossRef re-point + reciprocal half
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (Sonnet)
    - **Precondition check**: sweep-1's interim enumeration still shows the `record-first-ratification` target (Req 4.1); if zero, verify-and-discard with dated note
    - Re-point `shared-catalog.yaml` → `governance/classification-map.md § "record-first-ratification"`; remove interim markers; reciprocal half in the register entry; sweep-1 green in-PR (Req 4.4)
    - _Requirements: 4.1–4.4; Design: C1_

  - [x] 1.6 Tool-boot smoke
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (Sonnet) — settled design (DD7 ratified)
    - Consume `tool-registry.json`; handshake + `tools/list` presence + **per-tool empty-args invocation asserting a JSON-RPC response (result OR structured error, payload uninspected — DD7)**; NEVER assert returns-data (Req 5.2 normative); zero-tools selection floor
    - **Side-effect confirmation (Stacy design-R2 watch item): verify no declared tool mutates persistent state under empty-args invocation BEFORE wiring the check** — read the registry entries/tool handlers; record the confirmation in the task completion doc. *This is the task's one judgment nub (Stacy tasks-R1 soft note): Sonnet stays — bounded scope, clear pass criterion — with **escalate-on-hit** (any tool that DOES mutate under empty-args stops the task and goes to Peter/Thurgood rather than being worked around). Conscious call, recorded.*
    - Wire as required check; gate-bite proof post-merge (throwaway PR, 125-A pattern); register entry ("barrier, nothing to prune")
    - _Requirements: 5.1–5.5; Design: C6, DD7_

  - [x] 1.7 Pre-merge A/B probe
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (Sonnet) — rubric-scored per the settled protocol
    - Scenario sourced per Req 7.2; all-surface substitution verified (grep legs + MCP served-output leg); rubric-scored verdict; `probe-evidence.md` (OB-7 pattern); "no gross loss detected" reporting discipline
    - _Requirements: 6.1–6.6; Design: C2, C3_

  - [x] 1.8 Cloned-agent behavioral trial
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (Sonnet) orchestrating; **the cloned trial agent is the battery task's NATURAL agent** (Lina for 126 — avatar lane), run in both arms
    - **Battery task #1 = Spec 126 (avatar-decorative-warn) — Peter's soft-interweave (2026-07-13): ratify-then-hold.** Peter ratifies 126's option; execution HELD to serve as the trial's first battery task; both arms attempt it; the better output ships through 126's own flow (shipping quality adjudicated THERE — the trial's rubric scores process behavior only). **ESCAPE HATCH (stated, per Peter): if 126's ratification stalls, timing misaligns, or 126 becomes urgent, it ships independently and the battery uses the next suitably-sized queued task or the replay fallback — a preference with an escape hatch, never a blocker.**
    - **Relevance CHECKED, not assumed**: 126 is code-plus-tests and should route through the npm-test rule's territory on its face — the control-arm transcript must still exhibit the rubric's target actions (Req 7.3 ratified method) before the task counts
    - **Quality-gate escape trigger (LINA tasks-R1): 126's quality gate is UNMODIFIED and the trial's ≤2-runs cap can NEVER lower it** — if fitting the cap would force a sub-bar 126 deliverable, the escape hatch fires (126 ships independently; the battery falls back). The run-cap serves the trial; 126's quality wins the tie.
    - Worktree arms; total substitution verified (3 legs incl. MCP served-output); paired runs ≤2/arm; ≤20 transcripts; void ceiling (>2 voids/arm → escalate); ethics protocol (ordinary tasks, transparency, transcripts unedited); scored diff table
    - _Requirements: 7.1–7.7, 9.2–9.3; Design: C3, DD5_

- [x] 2. U1-p: The Prune PR

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The ratified prune lands on all three surfaces in ONE governance-law PR with probe + trial evidence attached
  - Only imposter-assessed clauses pruned; the Jest-not-Vitest education intact post-merge

  **Primary Artifacts:** the prune diff (Start Up Tasks, Task-Completion-Protocol, the ambient workflow source) + attached evidence links

  **Completion Documentation:**
  - Detailed: `completion/task-2-parent-completion.md`; Summary: `docs/specs/125-B-classification-map/task-2-summary.md`

  **Post-Completion:**
  - `./.kiro/hooks/complete-task.sh "Task 2 Complete: Pilot Prune (125-B)"` — merge unit U1-p; **governance-law PR: Peter-merged under the standing carve-out; ballot-gated per Req 2.3**. Report URL, STOP. The observation window OPENS at this merge; trigger docs-MCP `rebuild_index` post-merge (steering surfaces changed).

  **Agent**: Thurgood (Sonnet) — the edits are pre-adjudicated by 1.4; this task applies them
  - _Requirements: 2.3–2.5; Design: C2_

- [ ] 3. U1-c: Window + Closeout

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Window closed at N=20 observed PRs with all metrics computed per the protocol (segments honest, roll-up per 1.1's definition)
  - The closeout record is CONTENT-complete (C5: every criterion carries a verdict; every 10.6 problem carries its answer-or-datum; no TBD)
  - Peter's batched decision session held and the program verdict RECORDED as a ballot under `.kiro/docs/ballots/` (the artifact U1b's gate cites)
  - Return-edge cross-references landed (DD2 targets)

  **Primary Artifacts:** window dataset; `completion/pilot/u1-closeout.md`; DD2 doc edits

  **Completion Documentation:**
  - Detailed: `completion/task-3-parent-completion.md`; Summary: `docs/specs/125-B-classification-map/task-3-summary.md`

  **Post-Completion:**
  - `./.kiro/hooks/complete-task.sh "Task 3 Complete: Pilot Window + Closeout (125-B)"` — merge unit U1-c; PR opens; report URL, STOP. **U1b's entry gate cites the RECORDED VERDICT BALLOT (committed with this unit).**

  - [ ] 3.1 Observation window execution
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (Sonnet) — manual queries per the pre-committed protocol
    - N=20 observed PRs (filter + SHA pinning per protocol); first-push failure rate; re-accretion scans; staleness events tallied (segment on trigger; >K=3 → escalate); wall-clock span recorded as datum; allowlist churn if U2 armed by then
    - _Requirements: 8.2–8.7; Design: C4, DD6, DD8_

  - [ ] 3.2 Closeout record + Peter's batched decision session
    **Type**: Documentation
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood (Opus) — synthesis + honest-ambiguity reporting is judgment
    - The Req 17 five-part record, CONTENT-complete per C5 (ambiguous reported as ambiguous)
    - **Then ONE batched Peter decision session (Peter, 2026-07-13 — composition, not replacement): (a) the PROGRAM VERDICT — proceed to U1b as designed / proceed modified / stop-and-park** (stop-and-park = register kept as documentation, pruning opportunistic — a legitimate outcome, not a failure)**; (b) the autonomy-dial election (Req 15); (c) at-scale window parameters ratification (Req 10.6).** Three decisions, one sitting, full context.
    - **Verdict record form + location (pinned in tasks-R2, resolving STACY R1's MEDIUM): a BALLOT under `.kiro/docs/ballots/`** — a distinct, Peter-attributed, dated decision record covering all three decisions, separate from Thurgood's `u1-closeout.md` report (which links it). *Reasoning: the verdict gates a unit, elects a policy that would amend Task-Completion-Protocol scope, and ratifies at-scale parameters — ballot-grade weight on all three counts; the ballots directory is where the record-first protocol already puts Peter-attributed authority, and the register's own authority row defines layer-1 verification as committed ballot status — the program verdict should be verifiable by the very mechanism this spec maps.* **U1b's entry gate cites the VERDICT BALLOT, not the report** — record-first at program level.
    - _Requirements: 17.1–17.3, 15.1–15.2, 10.6; Design: C5_

  - [ ] 3.3 Return-edge cross-references
    **Type**: Implementation
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood (Sonnet)
    - Mutual naming: `canonical/agents/thurgood.md` (health-check review item) ↔ `governance/Product-Handoff-Protocol.md` (lessons-synthesis half) — DD2; governance-law edits ride this unit's Peter-merged PR; regenerate after the canonical edit
    - Closeout notes the return edge's FIRST EXERCISE was the pilot window (Req 17.1)
    - _Requirements: 14.1–14.3; Design: DD2_

- [ ] 4. U2: Net-New Checks + Re-arms

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Exp 3 evidence exists (boundary call + FP/FN counts + hygiene caveat as recorded finding)
  - The WCAG check re-armed at the canonical allowlist with floors, audit-clean ⇒ arm-green; validation-criteria assertion promoted audit-first
  - Console-fail armed on root lanes with the seeded allowlist; churn countable
  - All U2 register entries recorded (incl. format-validity record-only, inverse-drift WATCH, sub-package console-fail deferred row)

  **Primary Artifacts:** `exp3-spike-evidence.md`; the re-armed test + adjudication table; root `setupFilesAfterEnv` hook + `src/__tests__/console-allowlist.json`; register entries

  **Completion Documentation:**
  - Detailed: `completion/task-4-parent-completion.md`; Summary: `docs/specs/125-B-classification-map/task-4-summary.md`

  **Post-Completion:**
  - `./.kiro/hooks/complete-task.sh "Task 4 Complete: U2 Checks (125-B)"` — merge unit U2; PR opens; report URL, STOP. Gate-bite proofs post-merge (throwaway PRs).

  - [x] 4.1 Experiment 3 — boundary call + feasibility spike
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Ada (Opus) executes — the boundary call + FP/FN adjudication are token-owner judgment; Thurgood (Sonnet) audits the evidence artifact **and lands the register entry from Ada's adjudication** (register writes stay with the steward, consistent with 1.2/1.3/1.4 — ADA tasks-R1, accepted)
    - Part 1 boundary call (Ada adjudicates; Thurgood writes the register entry from it); Part 2 spike against `src/tokens/**` only; **FP/FN counted against an Ada-adjudicated labeled ground set of HISTORICAL TOKEN-ADDITION PRs** (C9 frame, restated in-task for zero-lookup executability); precise marker-form rules decided IN this task with Ada; hygiene caveat as recorded finding; throwaway prototype (9.3 stop applies)
    - **Evidence artifact path pinned: `.kiro/specs/125-B-classification-map/completion/u2/exp3-spike-evidence.md`** — a U2 artifact, NOT `completion/pilot/`
    - _Requirements: 16.1–16.5; Design: C9_

  - [x] 4.2 Stemma pre-arm audits (WCAG + validation-criteria) — adjudication + fix preparation
    **Type**: Architecture
    **Validation**: Tier 2 - Standard
    **Agent**: Lina (Opus) — legitimate-null vs. defect AND fix-vs-escalate adjudication is owner judgment (tier diverges upward from Implementation-adjacent work; reason recorded here)
    - Build the normative matcher (exact four + `accessibility_` prefix + `content_`/`_label` prefix-AND-suffix — C7); WCAG audit THROUGH the same matcher + loader; adjudication table in the spec dir
    - **PLUS (LINA tasks-R1 lead finding, her lean (a) accepted): the Req 12.6 zero-validation inventory + fix-vs-escalate adjudication** — previously unassigned, now owned HERE; DD4 discipline: never self-exempt, escalate candidates to Peter with the owner-read attached
    - **Fix PREPARATION lands here; fix APPLICATION lands on 4.3's branch** — the adjudicated WCAG-ref and validation fixes ride the U2 PR with the re-arm, prepared in this task, applied in 4.3, so audit-clean ⇒ arm-green stays honest (4.3 arms only after the adjudicated fixes are in the same branch)
    - **The adjudication table + any escalation candidates are surfaced in the U2 PR BODY** (not buried in the diff) — Peter's merge is this table's independent check (LINA tasks-R1 process note)
    - _Requirements: 12.1–12.3, 12.6; Design: C7, DD4_

  - [ ] 4.3 WCAG re-arm + validation promotion (implementation)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina (Sonnet) — purely mechanical: both flips + floors + fixtures + register entries, consuming 4.2's outputs
    - Apply 4.2's prepared fixes; replace the legacy trigger WITH the allowlist matcher; floors per DD3 (aggregate + per-literal, coupling note in the register row); flip `:435` to `withoutValidation === 0` per 4.2's inventory, inherited-skip preserved; register entries incl. DORMANT→armed history
    - **Matcher continuity (LINA tasks-R1): consumes 4.2's matcher function UNMODIFIED — any matcher change re-opens the audit.** Bite fixtures cover the matcher-selection edges (the `content_` non-label exclusion; the four exact names), not only the DD3 floor
    - _Requirements: 12.1–12.7; Design: C7, DD3_

  - [ ] 4.4 Console-fail hook + allowlist + promotion
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina (Sonnet) — escalate genuinely novel log patterns rather than adjudicating silently
    - NET-NEW root `setupFilesAfterEnv` wiring (own gate-bite scoped); root lanes ONLY (sub-package deferral as register row + version-agnostic constraint recorded); allowlist seeded from PR #39 adjudications (jsdom doc-addition folds in), one-entry-per-line, churn counts parsed objects; promotion follows allowlist
    - _Requirements: 11.1–11.4; Design: C8_

- [ ] 5. U1b: Map at Scale — GATED PLACEHOLDER (no breakdown by design)

  **Type**: Parent (placeholder)
  **Gate**: the RECORDED CLOSEOUT VERDICT BALLOT (Task 3.2) — proceed / proceed-modified only; stop-and-park ends here legitimately
  - Tasks CANNOT be authored before the pilot's calibration exists (at-scale N-per-wave, overlap/serialization policy, amended imposter-test criteria are all closeout outputs). Authored post-verdict as a tasks.md amendment with its own lightweight review round — **roster: the same three (Ada, Lina, Stacy), reviewing the amended task grouping against the verdict ballot's parameters** (Stacy tasks-R1 completeness item; changeable only by a recorded roster decision).
  - _Requirements: 10.1–10.6_

- [ ] 6. U3: Governance Layer — GATED PLACEHOLDER (charter grain per design C9)

  **Type**: Parent (placeholder)
  **Gate**: U2 merged (Exp 3 evidence) + Peter's scheduling; CODEOWNERS/branch-protection settings are Peter's platform actions
  - CODEOWNERS mapping; PR-approval-as-ratification for gated surfaces (layer 1 stays for ungated); authority-row entry `proposed → armed`; Exp-3-informed diff-gates designed then
  - _Requirements: 13.1–13.4_

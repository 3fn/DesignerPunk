# Implementation Plan: Capability Catalog, Routing & Measurement (119-B)

**Date**: 2026-08-01
**Spec**: 119-B - Capability Catalog, Routing & Measurement
**Status**: Tasks Phase
**Requirements**: `requirements.md` (R3-current, CLOSED). **Design**: `design.md` (dR2-current, CLOSED).

---

## Declared Merge Units (load-bearing — Task-Completion-Protocol: named up front, never judged at merge time)

| Unit | Branch | Tasks | Depends on (branches after merge of) | Notes |
|---|---|---|---|---|
| **U1** — window-free paper decisions | `task/119-B-u1-paper-decisions` | 1, 2 | `main` (none) | No corpus/window interaction beyond the ratified register-row exception |
| **U2** — measurement case study | `task/119-B-u2-measurement` | 3 | U1 (OB-4 decision frames the gate — Decision 5) | Read-only; MUST merge before any U3/U4/U-final corpus edit (R11 AC2) |
| **U3** — corpus changes, measured | `task/119-B-u3-corpus` | 4, 5 | U2 | Prune before sweep (§ 7.3) |
| **U4** — AICP prose refinement | `task/119-B-u4-aicp-refinement` | 6 | U2 | Micro-unit: the R8 AC1–2 "ordinary PR post-U2" latitude, expressed as a DECLARED unit (every PR is a unit — no anomalous unowned PRs). **Soft ordering: U4 targets merge BEFORE U-final** (avoids the transient where the generated 4c cue is live while AICP still carries the undischarged forward-compat note — Stacy tR1; the transient is self-healing and non-contract-breaking if scheduling forces it, recorded here as accepted in that case) |
| **OB-1** — cross-ref parser + scanner | `task/119-B-ob1-crossref-parser` | 7 | `main` — **started EARLY, runs PARALLEL** (A1-as-ratified) | mcp-server code only; zero window/corpus interaction |
| **U-final** — batched canonical edits + ONE regen | `task/119-B-ufinal-catalog-regen` | 8, 9 | **MIXED-UNIT MECHANICS (design § Architecture, declared here per Stacy dR1)**: branch created EARLY from `main` for the window-free paper work (Task 8); branch is UPDATED FROM `main` AFTER U3 merges BEFORE any canonical edit (Task 9) lands | The paper/edit seam is the update-from-main gate |
| **U-close** — closeout | `task/119-B-uclose` | 10 | U-final (and OB-1 merged or descoped — the Task 10 gate) | Carries the R9 AC5 checkable gate |

**Branch-naming declaration** (Stacy tR1 — TCP departure, named): uniform unit-slug naming (`task/119-B-<unit-slug>`) is used for ALL SEVEN units, including the single-parent units (U2, U4, OB-1, U-close) that TCP's letter would name `task/<spec>-<N>-<slug>` — deliberate, for cross-spec legibility of the unit structure; PR titles keep the TCP `Task <N> Complete: … (119-B)` form (multi-task units use the unit-description form).

Window law (R10), binding WHILE the 125-B window is open: regens batch (target ≤ 2, budget ONE segment); pre-regen gate with recorded evidence; regen log at `regen-log.md` (created at first qualifying regen, line format per design Component 7 — predicted/occurred split); trigger-surface edits (incl. any Task 5 PDW fold) ride U-final or defer past window close; sunset at U1-c close (ACs vacuously satisfied thereafter).

---

## Task List

### Unit U1 — Window-free paper decisions

- [x] 1. Author the `certainty-calibration` register row
  - **Type**: Documentation · **Agent**: Thurgood (Sonnet) — implementing the settled 4a sketch; the boundary call was made at design · **Validation**: Tier 1
  - Draft the row in `governance/classification-map.md` per design § 4a: education-owned, `verification: none`, `education: KEEP`, trigger scope + signal scope recorded in-row, **canonical enumeration home designation + update-trigger note**, drafted-by/landed-by attribution (R1 AC3), entry-id grammar citation form
  - Template: the `record-first-ratification` entry; NO parallel structure
  - Rebuild the docs index in-task (R11 AC5)
  - **Present to Peter for ratification — his ratification is the recorded second eye (A3-as-ratified). Do not land unratified.**
  - _Requirements: R1 (all ACs) · Design: Component 4a_
  - Completion doc: `completion/task-1-completion.md`

- [x] 2. Record the OB-4 discovery-gate threshold decision
  - **Type**: Architecture · **Agent**: Thurgood (Opus) — a genuine decide-class call (gate semantics, cross-cutting to the dry-run harness and all future discovery gates) · **Validation**: Tier 2 — **deliberate deviation from the Architecture→Tier 3 letter** (Stacy tR1, named-not-silent): a paper decision whose only executable surface is one harness assertion; success-criteria verification is carried by the decision record in the completion doc, not by code-centric Tier 3 checks
  - Decide: keep rank ≤ 2, or move to reachability-at-strong — with rationale framed by Decision 4's reachability emphasis and the 10.4 evidence (four concepts strong-but-rank-3–4); record the decision + counter-argument in the completion doc
  - **R2 AC3 step (design § Component 5)**: IF the decision changes the gate THEN update the dry-run harness's gate assertion in THIS task, before any dependent task runs; run the harness to confirm the assertion change is green
  - Note the designed revisit path: U2's measured distribution may trigger a recorded amendment (Decision 5) — the anchor is revisitable, visibly
  - _Requirements: R2 (all ACs) · Design: Component 5 (OB-4 input), Decision 5_
  - Completion doc: `completion/task-2-completion.md`
  - **Unit completion**: `./.kiro/hooks/complete-task.sh` opens the U1 PR; report URL; STOP

### Unit U2 — Measurement case study

- [x] 3. Run the before/after measurement case study
  - **Type**: Implementation · **Agent**: Thurgood (Sonnet) — method fully designed (Component 5) · **Validation**: Tier 2
  - Run `scripts/discovery-dry-run.ts` against the frozen oracle (`scripts/__fixtures__/discovery-oracle.ts`) — READ-ONLY; the oracle is never edited, never re-wired (R3 AC3)
  - Produce `findings/measurement-case-study.md` per the Component 5 schema: method + provenance **+ the coverage-boundary statement** (whose surfaces the oracle exercises); before/after tables per axis; the IN-1 attribution ladder (floor 54.2% → aliases → tie-breaker 94% → current — the 94% includes the tie-breaker, R3 AC2); OB-4 input section (rank distribution; IF it contradicts Task 2's decision → recorded amendment + harness-assertion update per R2 AC3)
  - **ACCEPTANCE LINE (Decision 4 mitigation — do not skip): perform and record the register-row keyword-shadowing check** — enumerate the `certainty-calibration` row's text tokens against all oracle concept strings; check whether any oracle query ranks `classification-map` above the WEAK threshold; record the result (expected null, VERIFIED) alongside the pre-measurement note (R11 AC2)
  - D1: all reported counts carry measurement dates; re-measured values (prior → current) recorded in the completion doc (R11 AC3)
  - _Requirements: R3 (all ACs), R11 AC2–AC3 · Design: Component 5, Decision 4_
  - Completion doc: `completion/task-3-completion.md`
  - **Unit completion**: opens the U2 PR; report URL; STOP

### Unit U3 — Corpus changes, measured

- [x] 4. OB-3 alias prune (design § Component 8a flow)
  - **Type**: Implementation · **Agent**: Thurgood (Sonnet), with **Ada and Lina as consulted domain owners** (not optional — the flow blocks on their confirmation) · **Validation**: Tier 2
  - 8a flow in order: (1) D1 re-inventory (prior → current in completion doc, R4 AC1); (2) candidate assembly with oracle-coverage status per candidate (R4 AC6 — computed against the fixture, never by editing it); (3) **owner consult BEFORE merge**: per-owner candidate lists **carrying oracle-coverage status per candidate** (the owners apply the stricter consent bar against that column — Ada+Lina tR1) → confirm/object (objection → retain, the default) → date + method recorded; non-oracle-covered removals need explicit owner CONSENT, recorded as accepted residual risk; (4) dry-run gate with candidates removed — any WEAK/MISS → retain + record; no partial prunes merge (a gate-retention of a confirmed candidate needs no re-consult — retention is the safe direction, Lina tR1)
  - Produce `findings/alias-prune.md` per the Data Models schema
  - **ACCEPTANCE LINE (Stacy dR2 conformance note): the completion doc explicitly cites `findings/alias-prune.md` as its R4 AC5 confirmation record**
  - Rebuild the docs index in-task (R11 AC5)
  - _Requirements: R4 (all ACs) · Design: Component 8a, Decision 6_
  - Completion doc: `completion/task-4-completion.md`

- [x] 5. OB-2 snippet sweep (design § Component 8b flow)
  - **Type**: Implementation · **Agent**: Thurgood (Sonnet) · **Validation**: Tier 2
  - 8b flow in order: (1) D1 re-count (prior → current in completion doc, R5 AC1); (2) **carve-out check FIRST** (R5 AC3): inventory `governance/Process-Development-Workflow.md`; any legacy snippets there are EXCLUDED from this PR and recorded in this completion doc as the origin of the U-final fold-item; (3) migrate legacy `path:` snippets → `id` form; (4) spot-resolution checks via the docs MCP (R5 AC2) + rebuild index
  - Completion doc carries the R5 AC5 owner-grouped touched-docs listing (Ada / Lina / Thurgood) — the explicitly designated evidence home (Decision 6); no findings artifact
  - _Requirements: R5 (all ACs) · Design: Component 8b, Decision 6_
  - Completion doc: `completion/task-5-completion.md`
  - **Unit completion**: opens the U3 PR; report URL; STOP

### Unit U4 — AICP prose refinement (micro-unit; post-U2)

- [x] 6. Refine the AI-Collaboration-Principles calibration prose
  - **Type**: Documentation · **Agent**: Thurgood (Sonnet) — the three surgical changes are fully designed (4b) · **Validation**: Tier 1
  - Apply design § 4b exactly: (1) discharge the forward-compat note with the settled reference (register-entry citation + signal contract) — **record blade verdicts** for the removal per `pilot-row-assessment.md` format (R8 AC2); (2) name the signal with the illustrative hedge, citing the register entry as canonical enumeration home — **the changes-1/2 overlap counts as ONE removal** in the blade record; (3) preserve the frozen anchors verbatim-in-substance (3-step structure, trigger phrase, tier semantics, go/no-go contract — R8 AC1/AC5)
  - NOT a window trigger surface (R10 AC4); measurement-gated only — this unit branches after U2 merges (R8 AC4)
  - Rebuild the docs index in-task (R11 AC5)
  - _Requirements: R8 AC1–AC2, AC4–AC5 · Design: Component 4b_
  - Completion doc: `completion/task-6-completion.md`
  - **Unit completion**: opens the U4 PR; report URL; STOP

### Unit OB-1 — Cross-ref parser `id`-awareness + scanner repoint (PARALLEL — start early)

- [ ] 7. Implement OB-1 per design § Component 6
  - **Type**: Implementation (parent) · **Agent**: Thurgood (Sonnet) — Decision 1 settled the architecture; this implements it. Escalate to Opus ONLY if implementation invalidates a Decision-1 premise (that is a design change, not a bigger hammer) · **Validation**: Tier 3 (parent; load-bearing property-tested surface)
  - [ ] 7.1 Re-probe V6 + re-count the invisible-ref population (D1; VERIFIED-UNGUARDED re-probe rule R11 AC4) — record prior → current in the completion doc; this is the unit's before-evidence
  - [ ] 7.2 Parser: bare-`id` candidate extraction (grammar `/^[a-z0-9][a-z0-9-]*$/`, no `/ . : #`), `kind` tag internal-only; tests: grammar positives, false-positive guards, `.md` extraction byte-identical regression, property tests unchanged and green
  - [ ] 7.3 Indexer: validation sweep on the existing post-index hook (DocumentIndexer.ts:124 precedent); `reindexFile` inline validation + the **accepted-edge test** (new-doc-B ref dropped until full rebuild); migrated-doc enumeration test (token-governance-pattern fixture)
  - [ ] 7.4 Surfacing + tooling: dropped-candidate channels (scanner individual listing + ONE aggregate index-health warning when count > 0); `scan-cross-references.sh` repointed to `governance/*.md` + `.kiro/steering/*.md`; **D5 normalization** — `list_cross_references` resolves through the same resolver chain as the other document tools, contract documented
  - Parent completion: after-evidence re-count (the crossReferences step-up, attributed for the Civitas health check per design § Component 6); full `npm test` green locally; completion doc + summary doc
  - _Requirements: R9 AC1–AC4 · Design: Component 6, Decision 1_
  - Completion docs: `completion/task-7-N-completion.md` (subtasks), `completion/task-7-completion.md` + `docs/specs/119-B-capability-routing-measurement/task-7-summary.md` (parent)
  - **Unit completion**: opens the OB-1 PR; report URL; STOP

### Unit U-final — Catalog/routing audit + batched canonical edits + ONE regen

*(Branch created EARLY from `main`; Task 8 may run in parallel with U2/U3; Task 9 is BLOCKED until the branch is updated from `main` after U3 merges — the declared seam.)*

- [ ] 8. Catalog & routing audit (window-free paper work → findings artifact)
  - **Type**: Implementation (parent — analysis) · **Agent**: Thurgood (per-subtask tiers below) · **Validation**: Tier 2 — **deliberate deviation from the Parent→Tier 3 letter** (Stacy tR1, named-not-silent): analysis parent with no code surface; success-criteria verification is carried by the findings artifact's completeness against the Component 1 schema
  - [ ] 8.1 Inventory + re-measure all 8 agents' catalog surfaces (D1: per-agent route counts prior → current in completion doc) — **Agent**: Thurgood (Sonnet)
  - [ ] 8.2 Apply the audit dimensions + promotion rubric; draft all dispositions — coverage (incl. `target-missing-from-corpus` vocabulary + Leonardo's four seeds), class-fit (4c cue pre-dispositioned; the thurgood.md ballot-verification analog), coherence (fallback ∩ write-scope ∩ routing), promotions/additions with grade choice ((b)-default, flow-position-fed (a) arguments, pair-pattern caps at (b)), rename-risk column for (a) rows; **can't-drop inputs: Ada's thirteen AND Leonardo's twelve candidates** (named with equal explicitness — Leonardo tR1); Leonardo's Concept Catalog row worked as the (a) calibration case; **(a)-grade drafts resting on the stability test's attestation satisfier are marked ATTESTATION-PENDING**, so 8.3 knows which attestations are load-bearing satisfiers rather than courtesy confirmations (Leonardo tR1) — **Agent**: Thurgood (Opus) — cross-cutting dispositions across 8 surfaces with owner-consult stakes: decide-class
  - [ ] 8.3 Owner-confirmation round: per-owner batches, **starting from the owner dR1 pre-signals recorded in feedback/design.md — confirm-or-diverge, not cold review; a pre-signal is NOT an attestation, confirmation stays required** (Ada tR1) — (Ada: her pre-signaled thirteen; **Lina: the largest batch, ~25 — a second round on objections is normal, not a round failure**; Leonardo: his twelve; self-owned recorded as self-confirmations); attestation-pending rows resolved explicitly; date + method + attestations recorded in the promotion table. Soft sequencing preference (Ada tR1, non-blocking): where scheduling permits, run Task 4's prune consult before this round so prune outcomes inform it — **Agent**: Thurgood (Sonnet)
  - Output: `findings/catalog-routing-audit.md` complete per the Component 1 schema; non-promotions recorded with rationale
  - _Requirements: R6 AC1, AC5–AC6; R7 AC3, AC5–AC6 · Design: Components 1, 2, Decision 2_
  - Completion docs: `completion/task-8-N-completion.md`, `completion/task-8-completion.md` + `docs/specs/119-B-capability-routing-measurement/task-8-summary.md`

- [ ] 9. Batched canonical edits + the ONE regen (BLOCKED until update-from-main after U3 merge)
  - **Type**: Implementation (parent) · **Agent**: Thurgood (Sonnet) — authoring to confirmed dispositions · **Validation**: Tier 3 (parent)
  - [ ] 9.1 Update the unit branch from `main` (the declared mixed-unit seam) — verify U3 merged; verify any Task 5 PDW fold-item is in hand. Note: 8.1's counts were measured on the early branch — count drift revealed here is EXPECTED, not anomalous (Leonardo tR1); 9.4's per-route spot-verify covers stale targets
  - [ ] 9.2 Author ALL canonical-source edits per the confirmed findings: the two 118 rows (Component 3 text; **Lina's row verbatim + its two findings annotations**; Thurgood's row with the (b)-downgrade path if the heading fails spot-verify), Ada's row re-verified (R7 AC2 — a VERIFIED-UNGUARDED re-probe per R11 AC4, **result recorded in the completion doc**), all confirmed promotions/additions/class-fit fixes, the 4c pointer cue (single canonical snippet), the PDW fold-item if any — **IF the PDW fold-item lands THEN rebuild the docs index in-task (R11 AC5)**
  - [ ] 9.3 Pre-regen gate + regen: **confirm window state and record method + result** (R10 AC2); create `regen-log.md` (first qualifying regen) and write the line (predicted/occurred split — occurred filled post-merge); run generate.ts → sweep-1 → diff-guard; NEVER hand-place in protected roots
  - [ ] 9.4 Spot-verify EVERY promoted/added route pre-regen-PR: (a)-grade via `get_section`, (b)-grade via `get_document_summary` (R7 AC4) — **ACCEPTANCE LINE (Ada dR1): re-probe the empty-result trigger** (`find_docs` zero-hit returns top-level `matchConfidence:"none"`) and record the result in the findings
  - [ ] 9.5 Open the unit PR: body cites `findings/catalog-routing-audit.md` as the content-review basis (Lina dR1 — Peter's merge review is a conformance check); full `npm test` green locally
  - _Requirements: R6 AC2–AC4; R7 AC1–AC2, AC4; R8 AC3; R10 AC1–AC5; R5 AC3 (fold landing); R11 AC5 (conditional, PDW fold) · Design: Components 3, 4c, 7_
  - Completion docs: `completion/task-9-N-completion.md`, `completion/task-9-completion.md` + `docs/specs/119-B-capability-routing-measurement/task-9-summary.md`
  - **Unit completion**: opens the U-final PR; report URL; STOP

### Unit U-close — Closeout

- [ ] 10. Closeout verification and record
  - **Type**: Documentation · **Agent**: Thurgood (Sonnet) · **Validation**: Tier 1
  - **THE R9 AC5 GATE (checkable, not aspirational): verify the OB-1 unit is MERGED or DESCOPED-BY-RECORD (ballot/committed record). Anything else BLOCKS closeout.**
  - Audit the regen log against K=3 (occurred column); fill any pending `segment occurred?` cells; verify the R10 sunset state (window closed → ACs vacuously satisfied, recorded)
  - Verify the three findings artifacts complete + cited by their completion docs; verify the Civitas health-check attribution note for the cross-ref step-up is in OB-1's completion doc
  - Record the folder-rename issue's trigger status (`.kiro/issues/2026-07-19-spec-119-folder-rename.md` — 119-B closeout IS the trigger; execute-or-record per the issue, as its OWN issue-driven action, NOT absorbed silently into this task)
  - _Requirements: R9 AC5; R10 AC6; R11 · Design: Component 6 (closeout gate), Error Handling_
  - Completion doc: `completion/task-10-completion.md`
  - **Unit completion**: opens the U-close PR; report URL; STOP — spec complete at merge

---

## Success Criteria (spec level)

1. All four pillar deliverables landed: audited/refined catalog content, gap-filled + precision-audited routing (two 118 rows live), calibration formalized (register row + refined AICP + generated cue), measurement case study recorded with honest attribution.
2. OB-1–4 discharged: parser enumerates bare-id refs (or recorded descope), snippet sweep done, alias prune measured, threshold decision recorded.
3. Window discipline auditable end-to-end from `regen-log.md` + completion docs; ≤ K=3 segments consumed.
4. Every SHALL in requirements traceable to evidence in a findings artifact or completion doc.

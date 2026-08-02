# Requirements Document: Capability Catalog, Routing & Measurement (119-B)

**Date**: 2026-07-18
**Revised**: 2026-07-18 (R2 incorporation — see feedback/requirements.md [THURGOOD R2])
**Spec**: 119-B - Capability Catalog, Routing & Measurement (AXA pillar; spec family 119 — Agent Experience Architecture)
**Status**: Requirements Phase
**Dependencies**: 119-A (complete), 121 (complete), 122 (complete), 118 (complete); runs PARALLEL to 125-B (see Requirement 10)
**Author**: Thurgood
**Formalizes against**: `.kiro/specs/119-agent-experience-architecture/119-B-scope-pass.md` (RATIFIED 2026-07-16, incl. Part 7 ratification record + 7.2 delta audit + 7.3 execution ordering). Scope authority: `design-outline.md` § "Pillar mapping".

---

## Introduction

119-B is the Capability Catalog, Routing & Measurement pillar of the AXA spec family. Spec 122 delivered the catalog/routing **mechanism** and baseline content (per the ratified delta audit, scope pass § 7.2); 119-B is a **content-layer spec that operates through the generator** — audit, gap-fill, and precision work via canonical-source edits + batched regen, plus the certainty-calibration formalization and the before/after measurement case study. **No new generator machinery is in scope.**

**Deliverables** (design outline § "Pillar mapping", post-122 delta per scope pass § 7.2):
1. Capability catalog — audit + content refinement of what 122 generates (Requirement 6)
2. Task→capability routing — gap-fill (two missing 118 rows) + precision audit (Requirement 7)
3. Certainty-calibration formalization — register row + refined prose + propagation (Requirements 1, 8)
4. Before/after measurement case study (Requirement 3)

Plus the open ledger obligations OB-1–4 (Requirements 9, 5, 4, 2 respectively).

**Out of scope** (settled, recorded — do not re-open):
- OB-5–9: CLOSED by Spec 122 (see the deferred-obligations ledger).
- New generator machinery, schema changes, or MCP tool changes beyond OB-1's parser work (scope pass § 7.2 boundary answer).
- inbound-from-121 § 3 (Documentation-Directory revisit): DISCHARGED by 119-A (scope pass § Part 7 G4a).
- inbound-from-117 `resolvedValue` issue: routed to Ada (scope pass § Part 7 G4b).
- Consumer-side CC delivery: Spec 123.
- The 119 folder rename (`119-agent-experience-architecture`): not a 119-B task. Tracked as `.kiro/issues/2026-07-19-spec-119-folder-rename.md` (owner Thurgood; trigger: 119-B closeout, before 123 opens).
- **`search_tokens` partial-match indicator**: a demonstrated signal-less gap (probe 2026-07-18: `search_tokens({name:"space10"})` silently returned `space100` with no partial-match marking). Routed to Ada as its own future backlog item — the Application-MCP calibration analog arrives as its own emitted signal, formalized then, not as unanchored prose in 119-B ([ADA R2] counter-argument; [ADA R3] ownership acceptance is the record). Tracked as `.kiro/issues/2026-07-19-application-mcp-search-tokens-partial-match-signal.md`. [R3]

**Documentation requirements waiver**: this spec introduces no tokens and no components; its deliverables ARE governance-layer documents (register row, case-study findings, refined steering prose). Component/token documentation requirements are N/A per the Process-Spec-Planning waiver conditions (internal governance work, no developer-facing API). Waiver subject to Peter's ratification of this document.

---

## Requirements

### Requirement 1: Classification-map register row for the certainty-calibration rule

**User Story**: As the governance steward, I want the strong/partial/none certainty-calibration rule classified through the settled classification-map methodology, so that its verification/education boundary is adjudicated before any surface prose is reshaped — not retrofitted after.

#### Acceptance Criteria

1. WHEN 119-B execution begins THEN the register row SHALL be an early, window-free task (it edits `governance/classification-map.md`, which is not a 125-B trigger surface per scope pass § 7.1).
2. WHEN the row is authored THEN it SHALL follow the settled methodology (boundary call → verification disposition + owner → education disposition), templated on the `record-first-ratification` entry, and SHALL NOT introduce parallel structure outside the register.
3. WHEN the row lands THEN it SHALL carry drafted-by/landed-by attribution per the steward-writes-register convention, AND Peter's ratification of the row SHALL serve as the second-eye review (a light Ada/Lina consumer review MAY be added at Peter's option).
4. WHEN the row is cited elsewhere THEN citation SHALL use the entry-id grammar (`governance/classification-map.md § "<entry-id>"`), never entry count or position (scope pass D3).

### Requirement 2: OB-4 discovery-gate threshold decision

**User Story**: As the discovery-quality owner, I want a deliberate, recorded decision on the discovery-gate threshold (rank ≤ 2 vs reachable-at-strong), so that the gate measures the real risk (unreachable docs) rather than a rank-quality proxy.

#### Acceptance Criteria

1. WHEN 119-B records the threshold decision THEN it SHALL state the chosen gate (keep rank ≤ 2, or move to reachability-at-strong) with rationale framed by Decision 4's reachability emphasis and the Task 10.4 evidence (four concepts strong-but-rank-3–4).
2. WHEN the decision is made THEN it SHALL be a window-free paper decision requiring no corpus edits, sequenced in the first execution unit (scope pass § 7.3 U1).
3. IF the decision changes the gate THEN the change SHALL be reflected in the dry-run harness's gate assertion before any 119-B task depends on the gate clearing.

### Requirement 3: Before/after measurement case study

**User Story**: As the AXA spec family's steward, I want a before/after measurement case study of discovery quality anchored on the frozen oracle, so that 119-A's discovery improvements are quantified with correct attribution before further corpus changes contaminate the baseline.

#### Acceptance Criteria

1. WHEN the case study runs THEN it SHALL anchor on the frozen oracle at `scripts/__fixtures__/discovery-oracle.ts` and the harness `scripts/discovery-dry-run.ts` (paths per scope pass D2, correcting the ledger's stale pointer).
2. WHEN reporting lift THEN attribution SHALL follow the IN-1 rule: floor 54.2% → alias lift → title tie-breaker 94% rank-1-strong; the 94% figure SHALL NOT be attributed to aliases alone.
3. The oracle SHALL NOT be re-wired as a navigational doc (frozen-fixture warning stands).
4. WHEN sequencing execution THEN the case study SHALL complete BEFORE any corpus-changing work merges (Requirements 4, 5), so the "after" state is attributable to 119-A rather than to 119-B's own churn (scope pass § 7.3 U2).
5. WHEN the study completes THEN findings SHALL be recorded as a spec-local findings document, citing the D1 rule for any counts it reports.

### Requirement 4: OB-3 — measured alias prune

**User Story**: As a discovery-quality owner, I want redundant family-doc aliases pruned only where measurement shows the title tie-breaker alone covers them, so that the alias surface shrinks without regressing the discovery gate.

#### Acceptance Criteria

1. WHEN the prune task starts THEN it SHALL re-inventory alias candidates (the V7 probe count of 30 docs is point-in-time, not load-bearing — D1 rule).
2. WHEN candidate aliases are selected for removal THEN a dry-run SHALL be re-run with those candidates removed, AND removal SHALL proceed only IF the discovery gate still clears (no WEAK/MISS) on the tie-breaker alone.
3. IF the dry-run shows any regression THEN the affected aliases SHALL be retained and the retention recorded.
4. WHEN the prune executes THEN it SHALL be sequenced AFTER the measurement case study (Requirement 3 AC4) within the corpus-changes unit (scope pass § 7.3 U3).
5. WHEN alias removals touch token-family or component-family docs THEN the candidate-removal list SHALL be presented per domain owner (Ada: token families; Lina: component families) for review BEFORE the prune PR merges, with owner confirmation (or non-objection) recorded in the task completion doc; retention is the default on owner objection. Post-hoc notification does not satisfy this criterion. [R2: Ada+Lina]
6. WHEN a prune candidate's alias text is NOT exercised by any oracle entry (axis a or b) THEN its default disposition SHALL be RETAIN — the gate's silence is not evidence of coverage; removal of a non-oracle-covered alias requires explicit domain-owner consent AND SHALL be recorded in the prune findings as accepted residual risk, not as measurement-cleared. The prune findings SHALL record, per removed alias, whether its text maps to an oracle-covered concept. (Probe note, 2026-07-18: the OB-3 backstop class — `"<family> family work"` / `"<family> token work"` — is exercised 1:1 by the oracle's axis-a concepts, so this AC is expected to fire rarely; it guards the re-inventory's edge cases.) [R2: Lina+Ada, composed]

### Requirement 5: OB-2 — governance-corpus MCP-snippet sweep to `id` form

**User Story**: As the Docs-MCP steward, I want the legacy `path: ".kiro/steering/…"` example snippets in `governance/` doc bodies migrated to the `id` addressing form, so that doc prose teaches the current addressing grammar instead of the fallback-covered legacy form.

#### Acceptance Criteria

1. WHEN the sweep task starts THEN it SHALL re-count the legacy-snippet population (the 160 count of 2026-07-16 is point-in-time, not load-bearing — D1 rule).
2. WHEN snippets are migrated THEN each SHALL resolve via the `id` form post-edit (spot-verified through the docs MCP), and the docs index SHALL be rebuilt after the sweep.
3. **Process-Development-Workflow carve-out**: WHEN the sweep inventories its targets THEN it SHALL check `governance/Process-Development-Workflow.md` for legacy snippets; IF present, that file's edits SHALL be folded into the batched-regen PR or deferred past the 125-B window close — it is a window trigger surface (scope pass § 7.1.ii) and SHALL NOT be edited in an ordinary sweep PR while the window is open.
4. WHEN sequencing THEN the sweep SHALL run in the corpus-changes unit, after the measurement case study (scope pass § 7.3 U3).
5. WHEN the sweep completes THEN its completion doc SHALL list the touched docs grouped by domain owner (Ada: token docs; Lina: component docs; Thurgood: governance/process docs), so owners can spot-check that surrounding prose still reads correctly post-migration — AC2 verifies the address resolves, not the prose. Pre-merge consult is NOT required for this mechanical addressing migration (asymmetry with Requirement 4 AC5 is deliberate: form migration vs. content removal). [R2: Ada]

### Requirement 6: Capability catalog audit and content refinement

**User Story**: As an agent consuming my generated prompt, I want the capability catalog content (routing, commands, tool cues, knowledge fallback) audited for coverage and quality, so that the catalog 122 generates is complete and precise — not just structurally present.

#### Acceptance Criteria

1. WHEN the audit runs THEN it SHALL cover the generated catalog surfaces of all 8 agents (per-agent route counts of scope pass § 7.2 are point-in-time — D1 rule: re-measure at task start), across three named audit dimensions: **coverage** (task classes with named-but-unrouted targets), **content quality** (precision, currency), and **content-class fit** (routing rows in Routing, rules in ambient/prose, commands invocable — no rule-shaped entries in Commands). [R2: Leonardo — class purity]
2. WHEN gaps or quality issues are found THEN fixes SHALL be authored as canonical-source edits and delivered through the generator (regen + sweep-1 + diff-guard); artifacts SHALL NEVER be hand-placed in diff-guard-protected roots.
3. The audit SHALL introduce NO new generator machinery, schema changes, or output classes (scope pass § 7.2 boundary answer).
4. WHEN canonical edits from this requirement are ready THEN they SHALL batch into the final regen unit per Requirement 10 (scope pass § 7.3 U-final).
5. WHEN the audit finds content-correctness issues in another agent's domain THEN they SHALL be flagged to the domain owner (audit-vs-write boundary), with the canonical edit authored by or confirmed with that owner. The owner-confirmation rule extends to routing promotions into owner-controlled docs (Requirement 7 AC6) — the domain owner controls the target doc's heading stability, so owner confirmation covers both content fit and rename risk. [R2: Leonardo — cross-reference]
6. WHEN the Requirement 6 and Requirement 7 audits run THEN their findings SHALL be recorded in a spec-local audit-findings document (per-agent coverage record, gaps found with dispositions, promotions AND non-promotions with rationale) — coverage claims (AC1) and promotion records (Requirement 7 AC3) are verifiable only against this artifact. [R2: Stacy — High]

### Requirement 7: Task→capability routing — 118 gap-fill and precision audit

**User Story**: As an agent with routing rows in my generated prompt, I want the missing Spec-118 routing rows landed and generic cues promoted to precise routes where a named target exists, so that routing actually reaches the law it points at.

#### Acceptance Criteria

1. WHEN routing gap-fill executes THEN it SHALL land the two missing 118 hand-off-1 rows via canonical source: Thurgood's (Test-Development-Standards Civitas close-state / CI-enforced-guards) and Lina's (component-token brand-contract pointer), per inbound-from-118 as amended by scope pass V9/D4.
2. WHEN gap-fill starts THEN Ada's existing module-resolution row SHALL be re-verified present (V8/7.2 findings are VERIFIED-UNGUARDED — re-probe at the consuming task), and the row's `heading:` target SHALL be confirmed to still resolve.
3. WHEN the precision audit runs THEN promotability SHALL be defined by the THEN clause: a cue is promotable IF its THEN clause lacks a resolvable route target AND a determinate target exists — regardless of whether the WHEN clause names the topic. Three dispositions SHALL be permitted: (a) full `doc § "Section"` route (only where the section is stable AND load-bearing), (b) doc-id-only route (where the doc is determinate but the section varies by need; composes with the summary-first rule), (c) leave-as-is (genuinely open-ended cues, and deliberate precise-plus-fallback pair patterns). Promotions and non-promotions SHALL be recorded in the audit-findings document (Requirement 6 AC6). [R2: Lina+Leonardo, composed]
4. WHEN routing edits from this requirement are ready THEN they SHALL batch into the final regen unit per Requirement 10, AND every newly promoted route SHALL be spot-verified to resolve (via `get_section` / the docs MCP) BEFORE the batched regen — landing unverified targets would manufacture the silent-break defect AC5 warns about. [R2: Leonardo]
5. IF a routing row targets a section heading THEN the silent-break risk of heading renames (V8 caveat) SHALL be noted in the audit findings, with any mitigation deferred to OB-1's addressing work or recorded as accepted risk; disposition (b) of AC3 (doc-id-only) is the standing mitigation where precision is not load-bearing.
6. WHEN a promotion targets a doc in another agent's domain THEN the promoted route SHALL be authored by or confirmed with the domain owner (mirrors Requirement 6 AC5; the owner rules on section choice — a content-correctness call — and controls heading stability). [R2: Ada+Leonardo, convergent]

### Requirement 8: Certainty-calibration formalization — refine, not rewrite

**User Story**: As any agent applying the certainty-calibration rule, I want the strong/partial/none rule formalized against 121's shipped `matchConfidence` signal, so that the always-loaded prose and per-agent propagation reflect the real signal contract — without breaking the rule's existing teaching.

#### Acceptance Criteria

1. WHEN the calibration prose in AI-Collaboration-Principles is edited THEN the edit SHALL refine rather than rewrite (the forward-compat note's promise binds), formalizing against the shipped signal: `matchConfidence: strong | partial | none`, with `viability` and `rank` separate and never collapsed.
2. IF any prose is pruned THEN per-surface blade verdicts SHALL be recorded per the settled prune methodology (`pilot-row-assessment.md` as the worked example); education-vs-verification dispositions SHALL be consistent with the Requirement 1 register row.
3. WHEN per-agent propagation is authored THEN it SHALL ride the batched canonical-edit regen (Requirement 10); zero per-agent `matchConfidence` content exists today (scope pass § 7.2 row 3), so propagation scope is 119-B's to define in design — AND design SHALL state the propagation boundary explicitly: the boundary is **signal-scoped, not server-scoped** — per-agent prose SHALL scope the calibration signal to surfaces that emit `matchConfidence` (currently `find_docs` and keyworded `find_components`; the enumeration is illustrative — signal emission is the operative test, and the boundary extends automatically as tools grow the signal) and SHALL NOT teach the field on signal-less surfaces (deterministic lookups, `search_tokens` partial matching, `find_screens`/`find_templates`), either stating the degraded behavior or staying silent about them. [R2: Lina+Leonardo; R3: signal-scoped rephrase per the main-loop probe of 2026-07-18, Peter-approved, confirmed 4/4]
4. `AI-Collaboration-Principles.md` is NOT a 125-B window trigger surface (scope pass § 7.1) — its edits MAY merge in ordinary PRs for *window* purposes; HOWEVER the prose refinement SHALL NOT merge before Requirement 3's case study completes (AICP is MCP-indexed corpus content — the measurement-before-corpus-churn invariant of R3 AC4 / R11 AC2 applies; the window question and the measurement question are orthogonal). IF calibration work touches `Task-Completion-Protocol.md` or `start-up-tasks.md` THEN those edits SHALL join the batched-regen unit (they ARE trigger surfaces, § 7.1.i). [R2: Stacy — High, fix (a)]
5. WHEN formalization phrasing is settled THEN it SHALL preserve the agent-side contract: propose best-fit + confidence + rationale → human go/no-go on `partial`; empty-contract handling on `none` — AND it SHALL preserve the rule's trigger scope: discovery-time uncertainty about where guidance lives, not generalized into an epistemic protocol for all judgments (scope expansion is the likeliest accidental rewrite mode). [R2: Ada]

### Requirement 9: OB-1 — cross-ref parser `id`-awareness + scanner repoint (parallel merge unit)

**User Story**: As the Civitas steward, I want `list_cross_references` and cross-ref enumeration to see bare-`id` cross-references, and the cross-ref scanner repointed to `governance/`, so that the cross-link map and my health-check tooling reflect the post-relocation corpus.

#### Acceptance Criteria

1. OB-1 SHALL be a **declared merge unit** within 119-B (own branch, own PR, own reviewable diff per Task-Completion-Protocol coherent units), **started early and run in parallel** — it touches only mcp-server indexer code and has zero window or corpus interaction (A1 as ratified, scope pass § Part 7).
2. WHEN the unit's first task starts THEN it SHALL re-probe the V6 premise and re-count the invisible-ref population (VERIFIED-UNGUARDED — re-probe rule).
3. WHEN the parser work lands THEN `list_cross_references` SHALL enumerate bare-`id` cross-refs for the migrated docs, validated against `idIndex`, with disambiguation rules that do not mis-extract non-doc links, and tests covering both (ledger done-when).
4. The bundle SHALL move whole: parser `id`-awareness + `scripts/scan-cross-references.sh` repoint to `governance/` travel together (Peter's ratified routing, 2026-07-05), AND D5 (the `list_cross_references` addressing-contract normalization: accept both bare-`id` and relative path, or document the contract) SHALL ride with it.
5. IF the unit stalls THEN descoping SHALL be a recorded decision (ballot or committed record), never a silent drop; AND WHEN 119-B closeout begins THEN the OB-1 unit SHALL be either merged or descoped-by-record — the closeout checkpoint that converts "blocks closeout visibly" from intention into a checkable gate. [R2: Stacy]

### Requirement 10: 125-B observation-window coordination

**User Story**: As a spec running parallel to 125-B's live pilot window, I want window-coordination discipline encoded as acceptance criteria, so that 119-B's regens cannot burn through the K=3 re-baseline budget unaudited.

#### Acceptance Criteria

1. WHILE the 125-B pilot observation window is open, 119-B tasks touching canonical agent source SHALL batch their edits so qualifying regens are few and deliberate — target ≤ 2 qualifying regens across 119-B execution, with a budget of ONE expected segment event for the batched canonical-edit unit (a regen segments only if `thurgood.md` output actually changes — scope pass § 7.1.iii). IF qualifying regens exceed 2 THEN the excess SHALL be recorded in the regen log with rationale — the target stays soft (K=3 is 125-B's hard law, not 119-B's) but deviation is visible, never silent. [R2: Stacy]
2. WHILE the window is open, BEFORE any regen that plausibly changes `thurgood.md` output, the window state SHALL be confirmed — procedurally (ask Peter / the 125-B session) until the U1-c dataset exists; mechanically (read the dataset, count segments) once it does.
3. WHEN a qualifying regen merges THEN it SHALL be logged in BOTH the task's completion doc AND the spec-local running log at `.kiro/specs/119-B-capability-routing-measurement/regen-log.md`, so the count is auditable against K=3 in one place; each log line SHALL carry the pre-regen window-state confirmation (method + result, per AC2), so one line evidences both the gate and the event. [R2: Stacy]
4. The trigger surfaces are the four of the measurement protocol's Appendix A1 (authoritative): `Task-Completion-Protocol.md`, `Process-Development-Workflow.md`, `start-up-tasks.md`, `thurgood.md` — NOT `CLAUDE.md` (inbound drift D6) and NOT `AI-Collaboration-Principles.md`. WHILE the window is open, ANY merged change to a trigger surface SHALL route through the batched-regen unit or defer past window close.
5. Ordinary 119-B `task/*` PRs SHALL NOT be throttled — they are expected to count toward the window's N=20 close condition **per the measurement protocol's counting rules** (the counting rule is 125-B's law, referenced not restated — e.g., its instrument-PR exclusion governs, not this requirement). [R2: Stacy]
6. **Sunset**: WHEN the U1-c window closes, ACs 1–5 of this requirement expire — they SHALL be treated as vacuously satisfied for all subsequent work (AC5's non-throttle statement dies naturally with N=20), and any post-window coordination follows whatever the U1-c closeout verdict establishes. [R2: Stacy]

### Requirement 11: Execution ordering, unit structure, and verification currency

**User Story**: As the spec author and executing agents, I want the ratified execution ordering and the verification-currency rules carried as requirements, so that tasks.md's unit structure and every task's evidence discipline follow from ratified law rather than reconstruction.

#### Acceptance Criteria

1. WHEN tasks.md is authored THEN it SHALL declare merge units against the ratified ordering (scope pass § 7.3): U1 window-free paper decisions (Requirements 1, 2) → U2 measurement case study (Requirement 3) → U3 corpus changes (Requirements 4, 5) → OB-1 parallel unit (Requirement 9) → U-final batched canonical edits + regen (Requirements 6, 7, 8).
2. The measurement-before-corpus-churn constraint SHALL hold: no Requirement 4, 5, or 8 edit to MCP-indexed corpus content merges before Requirement 3's case study completes (AC4 there; restated here as an ordering invariant). **Ratified exception**: Requirement 1's register row lands in U1, before U2, per the ratified ordering (scope pass § 7.3) — the oracle has no concept targeting the classification map, and the case-study findings SHALL note the row landed pre-measurement so attribution stays honest, AND the findings author SHALL explicitly check whether the row's text keyword-shadows any oracle concept (the indirect contamination path — a rank shift on an unrelated query — that the no-targeting-concept observation does not preclude), recording the check's result alongside the note. [R2: Stacy — High, invariant broadened; R3: shadowing check, Stacy's rider]
3. **D1 rule (ubiquitous)**: point-in-time counts and populations cited in this spec, the ledger, the inbounds, or the scope pass SHALL never be load-bearing — the consuming task re-measures at start AND records the re-measured value (prior → current, with date) in its completion doc, so compliance is auditable by reading completion docs. [R2: Stacy]
4. **Re-probe rule (ubiquitous)**: any VERIFIED-UNGUARDED claim from the scope pass SHALL be re-probed by the task that consumes it before being relied upon, with the re-probe result recorded in the consuming task's completion doc. [R2: Stacy]
5. WHEN any 119-B work modifies MCP-indexed governance content THEN the docs index SHALL be rebuilt in the same task, per the write-side rebuild protocol.

---

## Requirements-to-Unit Traceability (for tasks.md)

| Unit (scope pass § 7.3) | Requirements |
|---|---|
| U1 — window-free paper decisions | R1 (register row), R2 (OB-4 threshold) |
| U2 — measurement case study | R3 |
| U3 — corpus changes, measured | R4 (OB-3 prune), R5 (OB-2 sweep + carve-out) |
| OB-1 unit — parallel, started early | R9 |
| U-final — batched canonical edits + one regen | R6 (catalog edits), R7 (routing edits), R8 (calibration propagation, AC3) |
| Cross-cutting | R10 (window), R11 (ordering + currency) |

**Table notes** (R2 incorporation):
- **R8 splits across units**: AC1–AC2 (AICP prose refinement + blade verdicts) may merge in an ordinary PR any time AFTER U2 completes (R8 AC4 — not a window trigger surface, but measurement-gated); AC3 (per-agent propagation) rides U-final's batched regen. Tasks.md SHALL reflect the split rather than reconstruct it. [Stacy — Low]
- **Audit work vs. edit work**: the R6/R7 *audit and promotion-decision* work is window-free paper work and MAY start early in parallel (only the canonical edits + regen are window-coupled and U-final-bound); tasks.md may sequence the audits before or alongside U2/U3. [Leonardo — sequencing observation]

---
id: classification-map
inclusion: manual
name: Classification Map
description: The per-rule classification-map register — each governance/design rule's boundary call (functional/operational/ideological), verification disposition + owner, and education disposition, recorded once and cited thereafter. Entries are stable, citable markdown headings with fenced-YAML machine-readable bodies.
aliases: classification map register, rule classification, boundary call, verification disposition, education disposition, enforcement ownership, which check verifies a rule, teacher or imposter, prune register, check-state facet, dormant check state
---

# Classification Map

**Date**: 2026-07-14
**Last Reviewed**: 2026-08-02
**Purpose**: The living register of per-rule classification decisions — boundary call, verification disposition + owner, and education disposition — so enforcement ownership is decided once and cited thereafter instead of re-litigated per agent, per prompt, per session
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: all-tasks

---

## About This Register

This is the **classification-map register**: one entry per governance/design rule, recording three decisions —

1. **Boundary call** — is the rule functional, operational, or ideological? (One-line rationale; scoped rows may carry per-scope rationale, since a surface-dependent boundary can require multiple realities stated at once.)
2. **Verification disposition + owner** — which check (if any) verifies the rule, at what strictness, and who owns that check.
3. **Education disposition** — what the education layer (docs MCP, skills, steering prose) keeps, authors, or prunes for this rule.

**Governing methodology**: Spec 125-B (Classification Map & Deferred Enforcement Layers), which formalizes the settled methodology of the Spec 125 design outline §2 — *"CI validates functional and operational requirements, never ideology; education and verification are complementary layers (strategy → tactics → validation loop)."* See `.kiro/specs/125-B-classification-map/` (requirements + design, merged) for the full procedure, including the two-bladed imposter test that guides per-surface education assessments.

**This is a LIVING register, not a one-time survey.** When a rule's classification changes, the entry is updated — never silently: every change is **dated and attributed** in the entry's `history` list (Req 1.5). Entries are superseded via `history`, never by renaming or deleting the entry heading.

---

## Methodology Notes (measurement law — U1 pilot verdicts carried into the U1b campaign)

*Recorded 2026-08-02 by Thurgood (steward) per 125-B Task 5.1; source rulings: the ratified verdict ballot (`.kiro/docs/ballots/2026-08-02-u1-pilot-closeout-verdict.md`), the U1 closeout record §2, and the settled U1b amendment (PR #112). These are the durable, MCP-served statements of the campaign's measurement law; the operational detail lives in `.kiro/specs/125-B-classification-map/completion/u1b/campaign-measurement-protocol.md`.*

1. **First-push pinning by RECONSTRUCTION (default)**: a PR's first-push SHA = the last commit with `committedDate ≤ createdAt + 120s`; check conclusions are queried against that SHA; no concluded required checks → INDETERMINATE, never converted. Observation passes are event-anchored (window open / session-start-while-open / close) — never calendar-cadenced.
2. **Batch overshoot counts whole** (the J3 ruling): an observation batch that crosses a close condition counts every qualifying PR in the batch.
3. **Roll-up reading** (ballot Decision 0): a criterion is MET iff MET in every EVALUABLE segment with ≥1 evaluable; empty or under-populated segments never force INDETERMINATE.
4. **Applicability scoring**: actions that never become applicable score N/A, not ABSENT.
5. **Campaign window parameters** (ballot Decision (c), P1–P3): N=10 observed PRs per wave window; re-accretion (W2) and churn (W3) per-wave; first-push failure rate (W1) on ONE shared campaign window with a single pre-campaign baseline; waves may overlap; **campaign-endogenous events (wave prunes, wave ballots, register/roster PRs) do not segment the shared window — exogenous events only (new check armings, outside regenerations touching pruned surfaces, required-check-set changes), bounded at K=3** (Peter's ruling, 2026-08-02). A pruned pattern reappearing on a GENERATED surface without a source change is an anomaly finding, never a re-accretion hit.

---

## Addressing and Citation

**How to cite an entry** (from any spec, steering doc, crossRef, or agent):

```
governance/classification-map.md § "<entry-id>"
```

This is exactly the `path § "heading"` grammar that sweep-1 (`122-sweep-1-refs`) resolves and verifies mechanically — a citation in this format is platform-checkable.

**Entry-id rules:**

- An entry-id is a markdown `### <entry-id>` heading in the **Entries** section below. The heading text IS the identifier.
- Entry-ids are **kebab-case** (lowercase, hyphen-separated).
- Entry-ids are **NEVER renamed once cited.** A classification change is recorded in the entry's `history`; the heading is permanent. (A rename would silently break every external citation.)
- Entry-ids SHALL be **unique** within this register, **AND no entry-id may be a substring of another entry-id**.

**Why the non-substring rule** (record it so it never reads as pedantry): sweep-1 resolves `§ "heading"` citations against markdown heading lines by **verbatim substring match** (`tools/agent-generator/sweeps/common.ts:186`). If one id were a substring of another — e.g. `token-creation` alongside `token-creation-primitive` — a citation of the shorter id could **silently mis-resolve** against the longer heading and still report green. The non-substring constraint makes every citation unambiguous **by construction**, not by care.

Authors adding an entry MUST check both constraints against all existing entry-ids before landing the heading.

---

## Entry Schema

Every entry is a `### <entry-id>` heading followed by **one fenced YAML block** carrying the machine-readable fields. The schema (from 125-B design § Data Models):

**Top-level fields:**

| Field | Required | Content |
|-------|----------|---------|
| `rule` | yes | The rule itself, stated in one line |
| `boundary_call` | yes | `class` + `rationale` (see below) |
| `verification` | yes | `disposition`, `owner`, `check_state`, `checks`, optional `scope[]` (see below) |
| `education` | yes | `disposition` — what the education layer keeps/authors/prunes for this rule |
| `crossRef` | when applicable | The reciprocal half of any external cross-reference pointing at this entry (e.g. `canonical/shared/shared-catalog.yaml#<entry-id>`) |
| `history` | yes | List of `{ date, change, by }` — every classification change, dated and attributed |

**`boundary_call`:**

- `class`: `functional | operational | ideological`
- `rationale`: one line for scalar rows; rows with a `scope[]` qualifier MAY push per-surface rationale into the scope entries instead (a surface-dependent boundary can require multiple realities stated at once).

**`verification`:**

- `disposition`: `barrier | record-check | warn | none | scoped`
- `owner`: the agent who owns the verification decision/check for this rule
- `check_state`: `none | proposed | armed | dormant | retired`
  - **`dormant`** (the DORMANT state, Req 1.3) records an **armed, blocking check whose selection is empty or stale** — it runs and passes while verifying nothing. The corpus demonstrably produces this state; a register that cannot record it misrepresents the corpus.
- `checks`: list of the concrete check name(s), when armed (e.g. `["122-sweep-1-refs"]`)
- `scope[]`: **optional** per-surface qualifier — but **REQUIRED when the rule's boundary is surface-dependent** (for such rules a scalar disposition is not simplification, it is wrong). Entries without multi-surface needs stay scalar (the lens-not-columns guard). Each scope entry carries:
  - `surface`: the surface this line governs
  - `disposition`: `barrier | record-check | warn | none` (scalar dispositions only — never `scoped`)
  - `check_state` and `checks`: **per-scope** when scoped — "lint at consumption / no check at definition" must serialize per scope, not collapse into one top-level value
  - `rationale`: per-surface rationale line

**The `scoped` sentinel:** when `scope[]` is present, the top-level `disposition` SHALL be the sentinel value `scoped` — or omitted entirely (`scoped` is the documented default for scoped rows). **A scoped row has NO valid scalar top-level disposition**: writing `barrier` there falsely flags the definition layer; writing `none` there misses the consumption sites. The truth lives per-scope.

### Illustrative Example (documentation, NOT a register entry)

The following is schema documentation only. It is deliberately inside a fenced block AND its heading line is indented one space — because sweep-1's resolver matches heading lines by raw line-regex (`/^#{1,6}\s/`, `common.ts`) and is **not fence-aware**; the indent is what actually makes it un-resolvable, the fence is what makes it visually documentation. It **cannot be cited or resolved as a rule**. Do not copy its content as fact; copy its shape (and do NOT copy the indent into real entries).

````markdown
 ### example-rule-id

```yaml
rule: "a one-line statement of the rule"
boundary_call:
  class: operational            # functional | operational | ideological
  rationale: "one line (scalar rows); scoped rows may push rationale into scope[]"
verification:
  disposition: scoped           # barrier | record-check | warn | none | scoped
                                # scope[] present => top-level disposition is the
                                # sentinel `scoped` (or omitted — scoped is the default);
                                # a scoped row has NO valid scalar here
  owner: thurgood
  check_state: armed            # none | proposed | armed | dormant | retired
  checks: ["122-sweep-1-refs"]  # the concrete check(s), when armed
  scope:                        # OPTIONAL; REQUIRED when the boundary is surface-dependent
    - surface: "consumption sites"
      disposition: barrier
      check_state: proposed     # checks + check_state are PER-SCOPE when scoped
      checks: []
      rationale: "per-surface rationale"
    - surface: "definition layer + theme overrides"
      disposition: none         # literals-by-design
      rationale: "per-surface rationale"
education:
  disposition: "what the education layer keeps, authors, or prunes for this rule"
crossRef: "canonical/shared/shared-catalog.yaml#example-rule-id"   # reciprocal half, when applicable
history:
  - { date: 2026-07-14, change: "entry created", by: thurgood }
```
````

---

## Entries

<!-- Entries are added by 125-B Tasks 1.3/1.4 (pilot rows) and subsequent waves.
     Each entry: `### <entry-id>` heading (kebab-case, unique, non-substring — see
     Addressing and Citation above) + one fenced YAML block per the Entry Schema. -->

### record-first-ratification

```yaml
rule: "Governance-law changes require Peter's ratification — authority is verified against a committed record, never a relayed claim"
boundary_call:
  class: operational
  rationale: "Verifiable-record-vs-trusted-claim is an operational property of the workflow (origin: the 2026-07-05 relayed-authority incident — friction without protection); the boundary is surface-dependent, so per-scope realities are stated in scope[]"
verification:
  disposition: scoped
  owner: thurgood
  scope:
    - surface: "gated surfaces — governance-law paths behind the PR gate (governance/**, .kiro/steering/**, .kiro/docs/ballots/**, agent prompts/configs)"
      disposition: barrier
      check_state: proposed
      checks: []
      rationale: "PR-approval-as-ratification (branch protection + CODEOWNERS -> Peter) — delivered by 125-B U3; until it arms, the standing carve-out (Task-Completion-Protocol § The Merge Rule, :126) keeps these paths Peter-merged as the closest ratification proxy"
    - surface: "ungated artifacts — governance changes outside the PR gate's reach"
      disposition: record-check
      check_state: armed
      checks: ["record-first ballot-status verification (PROCEDURAL, per .kiro/docs/ballots/README.md § 'The Ratification Protocol (record-first)' — an agent-performed mechanical check, not a CI lane)"]
      rationale: "Layer 1, IN FORCE since 2026-07-05: apply only on a committed RATIFIED record; if the record is missing, report — never rubber-stamp a relayed claim and never refuse-and-stop on relay alone"
education:
  disposition: "KEEP all education surfaces — no imposters found (Exp 2, 2026-07-14): the ballots README teaches the protocol and the why; Task-Completion-Protocol teaches the gate-verifies-mechanics-not-authority boundary (:93, :125-126, :153); the canonical catalog statement (stated ONCE, canonical/shared/shared-catalog.yaml) propagates the agent-facing what+why into all 16 generated prompts via 122 auto-regen. RE-ASSESS the propagated statement's what-half when U3 arms the barrier for gated surfaces (the record-check remains operative for ungated artifacts regardless)."
crossRef: "canonical/shared/shared-catalog.yaml#record-first-ratification"
history:
  - { date: 2026-07-14, change: "entry created from Experiment 2 (authority-row resolution), U1 pilot — evidence: .kiro/specs/125-B-classification-map/completion/pilot/exp2-authority-row-record.md", by: thurgood }
```

### npm-test-before-complete

```yaml
rule: "Run the full validation suite before marking a task complete (the npm-test rule — the U1 pilot's prune-with-arm row)"
boundary_call:
  class: operational
  rationale: "Validation-before-completion is a workflow-ordering requirement; the artifact half (the suite itself passing) is functional and owned by the armed lanes — this row classifies the workflow imperative, not the suite"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["the 125-A required-check set: root functional lane + both sub-package suite lanes + full typecheck + build:validate — suite-green gates every unit merge (armed 2026-07-10, proven per-lane)"]
education:
  disposition: "PILOT ROW — prune APPLIED (Task 2 / U1-p, 2026-07-14, pending ratification): imperative what-restatements at Task-Completion-Protocol :44/:45/:146 and Process-Development-Workflow step 2 rewritten to context/why (edits landed on branch task/125-B-u1-p; ratified merge is the application per the ballot's record-first protocol). KEPT untouched: the subtask targeted-tests instruction (no gate exists at subtask grain), ALL lane-selection teaching (single home: start-up-tasks §5), and the SEPARATELY-CLASSIFIED Jest-not-Vitest education (a distinct rule, verified untouched post-prune). Observation window (Task 3.1, N=20) opens at the U1-p merge and is the in-the-wild backstop; a DIFFERENCE-DETECTED finding there triggers a revert per the ballot's stated path."
history:
  - { date: 2026-07-14, change: "entry created from Experiment 1 classification (Task 1.4); per-surface assessments + candidate prune diff: .kiro/specs/125-B-classification-map/completion/pilot/pilot-row-assessment.md; prune candidate produced, not applied", by: thurgood }
  - { date: 2026-07-14, change: "prune applied via U1-p ballot (.kiro/docs/ballots/2026-07-14-npm-test-imperative-prune.md), staged on task/125-B-u1-p; probe (NO GROSS LOSS DETECTED) + trial (NO-DIFFERENCE-DETECTED) evidence attached; A2-pattern zero-hits + Jest-education-intact independently re-verified; awaiting Peter's ratification and the U1-p merge (which opens the Task 3.1 observation window)", by: thurgood }
  - { date: 2026-08-25, change: "Wave-1 deferred adjudication of Test-Development-Standards ~:1468-1474 CLOSED (Wave 2, 5.3): the four-stage validation-timing list ('Pre-Merge: Complete validation suite / All linting passes / All tests pass / Manual review complete') RULED KEEP intact — lifecycle-taxonomy education parallel to the pilot's retained lane-selection teaching, not a standalone imperative; deleting stage 4 would break the four-stage model (blade-1 fails). FLAG recorded, not actioned: 'All linting passes' describes a gate that does not exist (no lint required check) — known aspirational content, cited here so it is not silent drift. Owner consult AGREE (wave-2-consult-lina.md §4). Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md §3", by: thurgood }
  - { date: 2026-08-25, change: "REGISTER-INTEGRITY repair (separate entry per the wave-2 consult nit): wave 1's typecheck-build-green-at-merge disposition claimed the TDS:1472 deferral was 'recorded on npm-test-before-complete's history' at wave-1 time — that history line never landed (the deferral lived only in the C3 row's own disposition). The preceding entry closes the deferral; this one records the dangling cross-reference and its repair, explicitly rather than silently", by: thurgood }
```

### tool-boot-smoke

```yaml
rule: "Every tool declared in canonical/registry/tool-registry.json SHALL be listed (tools/list) and SHALL respond to a cheap empty-args call on its server — a listed-but-throws-on-invocation tool is caught at the gate, never returns-data asserted (Req 5)"
boundary_call:
  class: functional
  rationale: "A tool advertised in tools/list whose handler throws on invocation is a functional defect, not a style/workflow preference — barrier, nothing to prune (no prose predecessor; this is a net-new net-new check, not a reclassification of existing education)"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["125B-tool-boot-smoke"]
education:
  disposition: "nothing to prune — no prose predecessor"
history:
  - { date: 2026-07-14, change: "entry created (U1-s pilot substrate, Task 1.6); check wired: .github/workflows/tool-boot-smoke.yml + tests/tool-boot-smoke.test.ts; local run 49/49 passing incl. Product MCP passing index-empty (Req 5.2); side-effect confirmation + gate-bite proof plan recorded in .kiro/specs/125-B-classification-map/completion/task-1-6-completion.md", by: thurgood }
  - { date: 2026-08-21, change: "context 125B-tool-boot-smoke added to verify-gate-registration.sh EXPECTED_CONTEXTS (drift reconciliation — the 2026-07-14 arming never updated the count-assert in the same recorded change; record: .kiro/issues/2026-08-21-gate-registration-drift-reconciliation.md, applied via this entry's PR)", by: thurgood }
```

### no-autonomous-token-creation

```yaml
rule: "Creating ANY token (primitive, semantic, or component) requires human review — no autonomous token creation"
boundary_call:
  class: operational
  rationale: "Protects the primitive→semantic→component hierarchy and namespace coherence — workflow integrity (the sanctioned path by which vocabulary enters the system), not the math and not ideology; the contested reading ('functional — protects the math') is recorded and rejected: a functional rule is machine-checkable against a token's value, and 'was this sanctioned' is not a value property"
verification:
  disposition: warn
  owner: ada
  check_state: proposed
  checks: []
education:
  disposition: "KEEP — education owns mathematical fit, semantic/tier correctness, and the approval itself (token-governance autonomy levels + Component Development Guide's token-selection framework; generated prompts teach right-token / right-tier / mathematical fit). The clean split (Part 1 of the evidence): a check may detect that a token appeared; it never verifies that its creation was sanctioned or that it is mathematically/semantically correct — those stay education's job."
history:
  - { date: 2026-07-14, change: "entry created from Experiment 3 (token-approval boundary call + feasibility spike), U2 — boundary call and FP/FN adjudication are Ada's (token-owner judgment); Thurgood audited the evidence and landed this entry. Evidence: .kiro/specs/125-B-classification-map/completion/u2/exp3-spike-evidence.md", by: thurgood }
```

### console-fail-root-lanes

```yaml
rule: "Root functional-lane test suites SHALL fail on unallowlisted console.error/console.warn output — expected noise is recorded in a checked-in per-suite allowlist (suite × message-pattern), not tolerated ambiently (Req 11)"
boundary_call:
  class: functional
  rationale: "An armed barrier against actual runtime output a test run produces — machine-checkable against the allowlist by construction; nothing to prune (no prose predecessor for this specific gate)"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["root functional lane — src/__tests__/console-fail-setup.ts wired via jest.config.js setupFilesAfterEnv; every root-lane test file; gate-bite proven live during Task 4.4 (clean tests pass, an injected unallowlisted console.error/console.warn fails the test)"]
education:
  disposition: "nothing to prune — no prose predecessor. The allowlist itself (src/__tests__/console-allowlist.json) is the citable record: each entry carries its own { suite, pattern, reason } — the adjudication lives with the data, not in steering prose. ROWS-ONLY (wave-2 finding, recorded 2026-08-25, CORPUS-WIDE sweep — owner-run, steward-spot-verified): every console hit in the education corpus outside this register is illustrative code inside a guide (Transformer-Development-Guide, MCP-Integration-Guide, browser-distribution-guide, Test-Failure-Audit-Methodology, Token-Resolution-Patterns, CDG:1713, TDS:1533/:1958) — no prose console rule exists ANYWHERE; the no-prose-predecessor claim holds corpus-wide, not just on the rostered surface. DISCLOSURE (wave-1 tooling-echo class, steward-verified): Progress web implementations console.warn on their clamp paths and the guard throws only when NODE_ENV==='development' — under Jest ('test') the WARN branch runs (ProgressPaginationBase.web.ts:191-201; Stepper equivalent); no allowlist entry exists; LATENT until someone writes a clamp-path test, which then needs an allowlist entry or a spy. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md §2; consult: wave-2-consult-lina.md (U4/U5)."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.4): hook wired; allowlist seeded with 12 entries (10 from PR #39's adjudicated jsdom-stylesheet-limitation and deliberate-error-path-logging classes, discharging the pending jsdom-stylesheet-limitation doc-addition chip [125-B-backlog.md item 5]; 2 net-new — figma-extract.test.ts / figma-push.test.ts CLI-output classes discovered during this task's own full-suite gate-bite run); full root suite green (377 suites / 8987 tests). Mechanism built and row drafted by Lina; landed by Thurgood per the Task 4.1 register-writes-stay-with-the-steward convention — evidence: .kiro/specs/125-B-classification-map/completion/task-4-4-completion.md", by: thurgood }
  - { date: 2026-08-25, change: "Wave 2 (5.3) rows-only finding recorded on CORPUS-WIDE evidence (owner-run sweep, steward-spot-verified) — zero imposter clauses in C6 territory; no prose console rule exists anywhere in the education corpus. Progress clamp-path console.warn latent tension disclosed (steward-verified: test env takes the WARN branch, not the throw branch). Owner consult: Lina R1+R2 (wave-2-consult-lina.md, U4/U5). Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md §2", by: thurgood }
```

### console-fail-subpackage-deferred

```yaml
rule: "Console-fail (console-fail-root-lanes) is NOT extended to the mcp-server / application-mcp-server sub-package suites for U2 — their own jest 29 configs sit outside the root jest.config.js's `roots`, so the root setupFilesAfterEnv hook never loads for them. A future extension MUST use a version-agnostic capture (plain method-swap / jest.spyOn without jest-30-only APIs) since those suites run under jest 29 (Design C8)"
boundary_call:
  class: operational
  rationale: "A scope decision about WHERE the functional console-fail rule runs, not the rule itself — the underlying property stays functional (see console-fail-root-lanes); this row records the deliberate root-lanes-only boundary plus the constraint a future implementer inherits, so the deferral is recorded rather than silently skipped"
verification:
  disposition: none
  owner: thurgood
  check_state: none
  checks: []
education:
  disposition: "KEEP this row as the citable deferral record — no prose predecessor to prune. If ever replicated to the sub-packages, the version-agnostic constraint travels with this entry rather than being rediscovered."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.4) recording the root-lanes-only scope decision fixed in Design C8 — deferred, not silently skipped. Row drafted by Lina; landed by Thurgood per the Task 4.1 register-writes-stay-with-the-steward convention — evidence: .kiro/specs/125-B-classification-map/completion/task-4-4-completion.md", by: thurgood }
```

### wcag-format-validity

```yaml
rule: "WCAG references on behavioral contracts SHALL follow the standard format — a numbered WCAG criterion plus text, single or comma-separated multiple ('N/A' exempt) — malformed references fail the check (behavioral-contract-validation.test.ts, 'WCAG references should follow standard format')"
boundary_call:
  class: functional
  rationale: "A machine-checkable string-shape property of a contract's wcag field — not a style/workflow preference"
verification:
  disposition: barrier
  owner: lina
  check_state: armed
  checks: ["behavioral-contract-validation.test.ts:355 'WCAG references should follow standard format' (root functional lane) — already blocking since 125-A; no implementation work performed in U2"]
education:
  disposition: "nothing to prune — no prose predecessor. Record-only entry (Req 12.7): the check's already-armed state needed a citable register row; this is it."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.4, Req 12.7) — record-only: verified already armed/blocking since 125-A, no work performed. Row drafted by Lina; landed by Thurgood per the Task 4.1 register-writes-stay-with-the-steward convention — evidence: .kiro/specs/125-B-classification-map/completion/task-4-4-completion.md", by: thurgood }
  - { date: 2026-08-25, change: "ROSTERED into U1b wave 2 by Peter's amendment ruling (2026-08-25, record-first — this row was armed but rostered in NO campaign wave; gap found at consult U6). Education layer classified with wave 2: its only found imposter is the shared dual-rule clause CDS:513 ('Contracts reference valid WCAG criteria' — restates this rule AND wcag-required-refs in one line), cut as hunk W2-2 of the ratified wave-2 candidate diff; trial coverage via the informational R1'-fv line. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md", by: thurgood }
```

### inverse-drift-incremental-build

```yaml
rule: "The armed lane-functional-root required check rebuilds from a clean state on every run, which MASKS incremental-build breakage and stale-artifact test dependencies — a distinct risk from what the check verifies. Candidate mechanism: an incremental-path integrity check (not yet designed)"
boundary_call:
  class: operational
  rationale: "A workflow/tooling-integrity risk about HOW the check runs (clean vs. incremental rebuild), not a functional property of any single artifact — recorded as a known-deferred hazard, not yet a rule with a check"
verification:
  disposition: none
  owner: thurgood
  check_state: proposed
  checks: []
education:
  disposition: "KEEP as the citable WATCH record — no prose predecessor to prune. Candidate mechanism noted for whoever picks this up."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.4) recording the known-deferred incremental-build / inverse-drift hazard at WATCH (check_state: proposed) — evidence: 125-B-backlog.md item 5; .kiro/specs/125-mechanical-enforcement-strategy/inbound-to-125-B-from-125-A.md §3 (STACY R1 item 4). Row drafted by Lina; landed by Thurgood per the Task 4.1 register-writes-stay-with-the-steward convention — evidence: .kiro/specs/125-B-classification-map/completion/task-4-4-completion.md", by: thurgood }
```

### wcag-required-refs

```yaml
rule: "Behavioral contracts on the WCAG-required allowlist (exact `interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`; `accessibility_*`; `content_*_label`) SHALL carry a WCAG reference (or the 'N/A' legitimate-null sentinel) — re-armed at the canonical allowlist after a period as DORMANT (armed but aimed at six retired legacy contract names) (Req 12.1–12.5)"
boundary_call:
  class: functional
  rationale: "A machine-checkable presence check against a contract's own wcag field, scoped to a defined allowlist — not a style/workflow preference"
verification:
  disposition: barrier
  owner: lina
  check_state: armed
  checks: ["behavioral-contract-validation.test.ts 'accessibility-related contracts should have WCAG references' (root functional lane) — re-armed at the canonical allowlist matcher (Req 12.1-12.3). Match-count floor: aggregate selection > 0 (69 selected at Task 4.2's audit) PLUS per-literal presence for interaction_focusable (7 live), interaction_focus_ring (10 live), state_error (4 live). state_disabled is EXCLUDED from the per-literal floor pending the Button-CTA disabled-state adjudication (Peter, 2026-07-14 amendment) — the matcher itself is unchanged: state_disabled contracts (currently 1 live, Button-CTA) are still selected and still must carry a valid wcag ref, proven live via a gate-bite mutation (Task 4.3)"]
education:
  disposition: "WAVE-2 ROW (5.3, 2026-08-25) — prune CANDIDATE pending ratification: corpus-wide sweep (steward + owner enumerations converged) found 3 imposter deletions (CDS:686 and CDS:513 checklist restatements — CDS:513 dual-rule with wcag-format-validity; PIG:468 review-template restatement inside a decorative yaml fence) + 2 contradiction REWRITES (CDS:824 wrong-trigger line; CSR:183 field-table 'null if not applicable' — instructs the exact form that reds the gate for allowlisted contracts). KEEP set: CDS:612 why-education; CDS:823 accurate schema field list; CMDT:681 out-of-territory (validates the family-doc table, which the gate never reads); TBCV:63/:67 the genuine teacher; CDG wcag-THEME (different concept); CSR:152/:185 schema reference. EDUCATION-DRIFT HAZARD (recorded per the owner consult — the strongest methodology finding of the campaign: a KEEP-classified education surface can defeat an armed gate WITHOUT restating it): Component-Templates.md :699-849 teaches SEVEN retired pre-063 contract names (focusable, pressable, hoverable, error_state, success_state, loading_state, focus_ring) that the allowlist matcher cannot select — a scaffolding author produces contracts the gate never checks; CIS:79-90 legacy names + wrong count; family-doc tables name accessibility contracts WITHOUT the accessibility_ prefix (routing around the matcher); CDS:804-829 block lists post-063-removed schema fields. The per-literal floor is a corpus-liveness alarm, NOT per-component coverage — it will not fire on new drift. Repair = Lina's ballot items (Component-Templates FIRST), sequenced per the Peter ruling recorded at ratification. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md; consult: wave-2-consult-lina.md (R1+R2). PRIOR STATE (U2, retained): no prose predecessor taught the six-name trigger; the adjudication table (.kiro/specs/125-B-classification-map/completion/u2/stemma-pre-arm-adjudication.md) records the 7 nulls resolved and the DD3 floor-input correction (true live counts 7/10/1/4)."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.2 audit -> Task 4.3 arm): check re-armed, replacing the legacy 6-name trigger (behavioral-contract-validation.test.ts, formerly :325-350) with the normative allowlist matcher (C7) copied verbatim from .kiro/specs/125-B-classification-map/completion/u2/wcag-required-matcher.ts. State transition: DORMANT (armed-but-aimed-at-6-retired-legacy-names, discovered 125-B design-outline §3.3) -> armed (re-pointed at canonical allowlist; audit-clean per 4 WCAG-ref fixes + 3 legitimate-null 'N/A' exemptions applied to contracts.yaml BEFORE arming). Aggregate floor: 69 selected at audit. Bite-tested live (4 mutate/red/restore/green cycles). Row drafted by Lina; landed by Thurgood per the Task 4.1 register-writes-stay-with-the-steward convention — evidence: .kiro/specs/125-B-classification-map/completion/task-4-3-completion.md", by: thurgood }
  - { date: 2026-07-14, change: "Per-literal floor set to THREE literals (interaction_focusable, interaction_focus_ring, state_error) per Peter's in-session amendment to DD3's originally-recorded four (design.md still records four; this entry is the citable deviation record). state_disabled EXCLUDED from the per-literal floor pending the Button-CTA disabled-state adjudication — the matcher's WCAG_REQUIRED_EXACT set is UNCHANGED: state_disabled contracts (1 live, Button-CTA) are still selected and still must carry a valid wcag ref; the amendment narrows the floor assertion only, not the selection. This defuses the razor's-edge coupling risk Lina raised as a PETER-ESCALATION in Task 4.2's adjudication table (.kiro/specs/125-B-classification-map/completion/u2/stemma-pre-arm-adjudication.md §7). Drafted by Lina; landed by Thurgood — evidence: .kiro/specs/125-B-classification-map/completion/task-4-3-completion.md", by: thurgood }
  - { date: 2026-08-25, change: "Wave 2 (5.3) classification: candidate diff produced (3 deletions + 2 rewrites, three surfaces — CDS/PIG/CSR), education-drift hazard recorded (Component-Templates seven retired names, CIS, family-doc unprefixed tables, CDS stale block), consumed unchanged by (b)'s probe+trial and applied only as ratified at (c). An R1 roster-bounded sweep reported rows-only and was FALSIFIED by the owner consult (Lina, BLOCKING x4) — the corpus-wide re-sweep found the candidates on surfaces the roster never named; both rounds + steward verification: wave-2-consult-lina.md. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md", by: thurgood }
  - { date: 2026-08-25, change: "STALE-PENDING DISCHARGE (register currency, steward catch at wave 2): the 2026-07-14 floor amendment's state_disabled exclusion cites the Button-CTA disabled-state adjudication as 'pending' — it RESOLVED 2026-07-15, RULED REMOVE, implemented (.kiro/issues/button-cta-disabled-state-adjudication.md; CIS:90 records DesignerPunk does not support disabled states by design). The exclusion's rationale is therefore SETTLED, not pending: state_disabled stays outside the per-literal floor because no live instances exist by design; the matcher's WCAG_REQUIRED_EXACT still lists it (harmless — selects nothing; any future state_disabled contract is still selected and checked)", by: thurgood }
  - { date: 2026-08-25, change: "Wave 2 rows + candidate diff RATIFIED (Peter, 2026-08-25, record-first, in-session at step (a) completion): the 5-hunk diff approved as the (b) probe+trial input (prune application still gated on (b) evidence + the wave ballot at (c)); roster/register amendment APPROVED (wcag-format-validity education layer rostered into wave 2 + contract-platforms-specified row created); sequencing RULED — Lina's Component-Templates repair lands BEFORE/WITH the wave-2 prune merge (option (a) of assessment §5.4)", by: thurgood }
```

### validation-criteria-completeness

```yaml
rule: "All non-inherited behavioral contracts SHALL carry validation criteria — promoted from counting-without-failing (asserting only contractsWithValidation > 0) to a hard zero-tolerance assertion (withoutValidation === 0) after an audit found the corpus already clean (Req 12.6)"
boundary_call:
  class: functional
  rationale: "A machine-checkable presence check against a contract's own validation field; the domain-owner position (Lina) is that zero-validation is a defect by definition, not a style preference (DD4)"
verification:
  disposition: barrier
  owner: lina
  check_state: armed
  checks: ["behavioral-contract-validation.test.ts 'all contracts should have validation criteria' (root functional lane), formerly :435 -- promoted from toBeGreaterThan(0) to expect(contractsWithoutValidation).toBe(0); inherited-contract skip preserved. Bite-tested live: emptying a non-inherited contract's validation array reds the check; restored to green."]
education:
  disposition: "nothing to prune -- no prose predecessor. DD4's no-exemption-mechanism rationale (a zero-validation contract is defective by definition; escalate, don't self-exempt) is the citable design rationale, not restated in steering prose. ROWS-ONLY (wave-2 finding, recorded 2026-08-25, CORPUS-WIDE sweep — steward + owner enumerations converged after the owner consult falsified a roster-bounded first pass): zero imposter clauses. Scored KEEPs beyond the roster: Test-Behavioral-Contract-Validation.md:63/:67 ('Every behavioral contract MUST pass these validation criteria:' — heads the section defining what good criteria CONTAIN, the how the gate cannot supply; the genuine teacher, owner-defended) and Component-Development-Standards.md:823 (fenced schema field list, accurate — the CSR:185 class). Rostered-surface hits are the category taxonomy (CSR:37/:85), the schema field table (CSR:185), example YAML, or component-capability descriptions (CIS — a different sense of 'validation'). No prune action exists for this rule; the clean state rests on corpus-wide enumeration. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md §2; consult: wave-2-consult-lina.md."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.2 inventory -> Task 4.3 promotion): pre-promotion inventory (Task 4.2) found 234 non-inherited contracts, 0 without validation -- zero fixes, zero DD4 escalations needed (no trigger existed). Assertion promoted audit-first per Req 12.6 / Peter's 2026-07-13 approval. Flagged by Lina as beyond the explicit (a)/(b) drafting scope (one-rule-per-entry: this promotion governs a distinct assertion from wcag-required-refs) and accepted for landing on that basis. Row drafted by Lina; landed by Thurgood per the Task 4.1 register-writes-stay-with-the-steward convention — evidence: .kiro/specs/125-B-classification-map/completion/task-4-3-completion.md", by: thurgood }
  - { date: 2026-08-25, change: "Wave 2 (5.3) rows-only finding recorded on CORPUS-WIDE evidence — zero imposter clauses in C5 territory (two beyond-roster candidates scored KEEP: TBCV:63/:67 owner-defended teacher; CDS:823 accurate fenced schema list). Owner consult: Lina R1+R2 (wave-2-consult-lina.md). Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md §2", by: thurgood }
```

### certainty-calibration

```yaml
rule: "Discovery-time certainty calibration — weight discovery results by match strength (strong / partial / none): search before guessing; strong -> act on it; partial -> a candidate, not an answer — propose best-fit + confidence + rationale and confirm before acting; none -> never fabricate a location or proceed confidently — state what was searched, propose the best guess, ask the human for go/no-go; when still unsure, surface it"
boundary_call:
  class: ideological
  rationale: "The rule governs judgment quality at discovery time — CI validates function, never ideology: there is no mechanical predicate for 'calibrated well', so no check can own compliance; the education layer owns the rule"
verification:
  disposition: none
  owner: thurgood
  check_state: none
  checks: []
  rationale: "No CI hook. A narrow future hook — e.g. a prompt-lint asserting the generated pointer cue's PRESENCE in agent outputs — is noted as possible, NOT adopted: it would verify delivery of the education, never compliance with the rule"
education:
  disposition: "KEEP — durable and specific-but-stable by the churn-rate test (the strong/partial/none contract tracks the shipped Spec-121 matchConfidence signal, not implementation detail). Canonical prose lives in AI-Collaboration-Principles § 'Certainty Calibration: Finding Guidance Before You Guess' (refined-not-rewritten by 119-B, design § 4b). Delivery surfaces: Kiro always-load + CLAUDE.md @-import (the always layer), plus ONE generated discovery-adjacent pointer cue landing with 119-B U-final (design § 4c) — single canonical snippet, zero restated semantics per surface"
trigger_scope: "Discovery-time uncertainty about WHERE GUIDANCE LIVES — not a general epistemic protocol for all judgments (scope expansion is the likeliest accidental-rewrite mode; R8 AC5)"
signal_scope: "Surfaces that emit matchConfidence — signal emission is the operative test, not server identity. Signal-less surfaces (deterministic lookups, search_tokens partial matching, find_screens / find_templates) are OUT of scope: prose either states their degraded behavior or stays silent; the search_tokens partial-match gap is routed to Ada as .kiro/issues/2026-07-19-application-mcp-search-tokens-partial-match-signal.md"
enumeration_home:
  canonical: "THIS field is the single canonical home of the emitting-tools enumeration (the three-surface fork guard). Currently emitting matchConfidence: find_docs (incl. top-level matchConfidence 'none' on zero-hit); keyworded find_components. Citing surfaces — the AICP settled reference (4b) and the generated pointer cue (4c) — carry the 'enumeration illustrative; signal emission is the operative test' hedge and cite this entry; they never independently assert the list"
  update_trigger: "A new tool emitting matchConfidence updates THIS field; citing surfaces inherit through the hedge, or are touched in the same edit"
attribution:
  drafted_by: thurgood
  landed_by: thurgood
  second_eye: "Peter's ratification (R1 AC3; scope-pass A3-as-ratified) — the row is presented for ratification with the 119-B U1 PR and reaches main only through Peter's ratifying merge; a light Ada/Lina consumer review may be added at Peter's option"
history:
  - { date: 2026-08-02, change: "entry created (119-B Task 1, unit U1 — window-free per R1 AC1; lands pre-measurement under the ratified R11 AC2 exception, with the keyword-shadowing check scheduled in the U2 case-study findings). Cite as governance/classification-map.md § 'certainty-calibration' (entry-id grammar, never count/position — R1 AC4). Drafted and landed by Thurgood per the steward-writes-register convention; pending Peter's ratification at the U1 merge. Evidence: .kiro/specs/119-B-capability-routing-measurement/completion/task-1-completion.md", by: thurgood }
```

### section-citation-resolution

```yaml
rule: "A get_section heading citation in served or steering docs must resolve — the doc id must be MCP-served and the heading must exist on it"
boundary_call:
  class: functional
  rationale: "Whether a citation resolves is a mechanical property of the artifact pair (id served + heading present) — no judgment; a dead citation silently withholds teaching from every agent that follows it"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["scripts/check-section-citations.ts (`npm run check:section-citations`), CI job .github/workflows/section-citations.yml, check context \"Section Citation Guard / section-citations\" — resolver-chain-aware (doc id -> indexed key -> frozen legacy manifest, reusing the runtime's own resolution helpers: extractFrontmatterInfo, FROZEN_LEGACY_MANIFEST), exact trimmed-string heading matching, identity-doc awareness (a citation targeting a never-served identity doc is a defect by construction), template-placeholder allowlist (`[family-name]`-style). Deliberate deviation from the D5 recipe: aliases do NOT pass resolution — resolveRef never consults them (alias is a find_docs scoring signal only), so an alias-only match fails at runtime; the checker flags it as a defect with a fix hint rather than treating it as resolved."]
education:
  disposition: "No prose prune — this row records a NET-NEW verification need. Known defect class recorded 2026-08-12: first-ever scan found ~14 dead citations of 135 (Token-Quick-Reference ~10 [Ada], Component-Readiness-Status 1 [Lina], identity-doc self-MCP-query examples in Spec-Feedback-Protocol + Civitas-System-Overview [Thurgood — identity docs are deliberately never MCP-served, so those example blocks teach a failing action]). Fixes + checker build completed 2026-08-12 via PR #122 — full execution record (re-scan counts, per-owner adjudications, deviations): .kiro/issues/2026-08-12-section-citation-defects-and-checker.md § 'Execution record'"
history:
  - { date: 2026-08-12, change: "entry created (steward, window-free — the certainty-calibration precedent) from the Q6-execution consult incident (Stacy caught two dead citations only because safeguard-2 happened to run) + the same-day corpus scan proving 14 pre-existing silent instances; evidence + adjudication table in the linked issue; check_state proposed — Peter ratifies the row at this PR's merge, the ARMING remains his separate flip", by: thurgood }
  - { date: 2026-08-12, change: "row ratified at PR #122's merge (per the creation entry's own terms). PR #122 built the checker and fixed all 18 defects found by the resolver-chain-aware re-scan (183 citations checked; the issue table's ~15 plus one new exact-match catch, row 16 / Web-Authoring-Standards) — post-fix corpus 173 citations, 0 defects. Gate-bite proven red on throwaway PR #121 (one deliberate dead citation; run https://github.com/3fn/DesignerPunk/actions/runs/31608088052/job/94152123200), closed unmerged. Peter flipped \"Section Citation Guard\" required on main branch protection the same day, BEFORE U1b wave 1's prune merges — measurement-free per campaign law (no window open yet; not a boundary-event charge). check_state: proposed -> armed", by: thurgood }
  - { date: 2026-08-21, change: "context \"Section Citation Guard\" added to verify-gate-registration.sh EXPECTED_CONTEXTS (drift reconciliation — the 2026-08-12 arming never updated the count-assert in the same recorded change; record: .kiro/issues/2026-08-21-gate-registration-drift-reconciliation.md, applied via this entry's PR)", by: thurgood }
```

### commit-to-main-via-pr-only

```yaml
rule: "Work never lands on main directly — commits ride task branches and land via PR merge (the C1 wave-1 row)"
boundary_call:
  class: operational
  rationale: "A workflow-topology requirement (where work is allowed to land), mechanically owned by branch protection since 125-A — the gate rejects the PUSH (a local commit on main is non-durable and detected at push); the imperative restatements add no durable behavior the platform does not force"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["branch protection on main, admins included (platform gate, 125-A; admin-rejection proven in 125-A records; re-verified live 2026-08-02)"]
education:
  disposition: "PRUNED (wave 1, applied via ballot 2026-08-12-wave-1-workflow-gate-prune at the wave PR's merge) — six C1 hunks across TWO surfaces (wave-1-assessment.md §2): FOUR deletions (W1-1; W1-2/3 half-clauses; W1-4 half-clause) + one rewrite-to-descriptive (W1-5) on Task-Completion-Protocol, + one half-clause deletion (W1-9, consult catch) on Process-Development-Workflow § Troubleshooting. Clause-grain cuts justified per Req 10.2: the compound sentences' 'Never merge your own PR' halves are NOT gate-owned until U3 and are retained verbatim on every surface. Retained education: 'Direct pushes to main are rejected by branch protection, admins included' and all branch/PR-flow how-to prose (per-surface hit counts in the assessment). DISCLOSED: .kiro/hooks/complete-task.sh:372 echoes the compound imperative at completion time — tooling, outside the education corpus, retained (weak trial confound recorded)."
history:
  - { date: 2026-08-02, change: "entry created (U1b wave 1, Task 5.2 step (a)); clause scoring + candidate diff: .kiro/specs/125-B-classification-map/completion/u1b/wave-1-assessment.md + wave-1-candidate-diff.patch; Stacy process-owner consult recorded in the assessment; pending Peter's record-first row ratification", by: thurgood }
  - { date: 2026-08-12, change: "rows ratified (Peter, record-first — commit 3c729da2); candidate diff RE-DERIVED post-#118 (context-only delta, assessment §3 note); step (b) verdicts: probe NO GROSS LOSS DETECTED + trial NO-DIFFERENCE-DETECTED (1 valid pair, zero voids, relevance gate passed on R1'-C1; evidence: wave-1-probe-evidence.md + wave-1-trial-diff-table.md); prune applied via ballot 2026-08-12-wave-1-workflow-gate-prune (record-first) at the wave-1 PR's merge — the wave-1 window (N=10) opens at that merge", by: thurgood }
  - { date: 2026-08-02, change: "row RATIFIED (Peter, 2026-08-02, in-session record-first; post-consult revision reviewed) — classification approved; prune application still gated on 5.W(b) verification + the wave ballot", by: thurgood }
```

### squash-merge-only

```yaml
rule: "Squash-merge is the only merge method (the C2 wave-1 row)"
boundary_call:
  class: operational
  rationale: "A repo-configuration fact (merge-method policy) — closed by configuration since 125-A; prose about it is almost entirely consequence-education (atomic history, PR title becomes the commit subject)"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["repository merge-method configuration: squash-only (platform config, 125-A)"]
education:
  disposition: "REWRITTEN (wave 1, applied via ballot 2026-08-12-wave-1-workflow-gate-prune at the wave PR's merge) — one rewrite only (W1-6: TCP:80's imperative-shaped lead becomes descriptive; the education after the dash is retained verbatim). All other squash prose (TCP:100/:117, PDW:130/:250) scored KEEP as retained-class education. Low prune yield expected and recorded up front."
history:
  - { date: 2026-08-02, change: "entry created (U1b wave 1, Task 5.2 step (a)); scoring + candidate hunk in wave-1-assessment.md / wave-1-candidate-diff.patch; pending Peter's record-first row ratification", by: thurgood }
  - { date: 2026-08-12, change: "row ratified + TRIAL-EXEMPTION RULED (Peter, record-first, commit 3c729da2): C2 unscoreable by construction in a control arm (agents never merge); the single content-preserving rewrite rides on probe evidence + the window backstop — per-case exemption, never-prune-untested stands for trial-coverable rules. Probe evidence: symmetric silence on merge method + textual verification that the rewrite retains the full education (wave-1-probe-evidence.md). W1-6 context re-derived post-#118 (assessment §3). Rewrite applied via ballot 2026-08-12-wave-1-workflow-gate-prune at the wave-1 PR's merge", by: thurgood }
  - { date: 2026-08-02, change: "row RATIFIED + TRIAL-EXEMPTION RULED (Peter, 2026-08-02, in-session record-first): C2 is unexercisable by agent trials by construction (merges are Peter-performed platform acts) — its single content-preserving rewrite (W1-6) rides on probe evidence + the window backstop, per-case exemption; the never-prune-untested rule stands for every trial-coverable rule (wave-1-assessment.md §4)", by: thurgood }
```

### typecheck-build-green-at-merge

```yaml
rule: "Full typecheck and build-validate must be green to merge (the C3 wave-1 row)"
boundary_call:
  class: functional
  rationale: "The artifact requirement (tsc + build:validate green) is functional and owned by the armed lanes; no workflow imperative restating it survives in prose, so only the artifact half remains to classify — the DIVERGENCE from the twin row npm-test-before-complete (operational) is deliberate: that row classifies a surviving workflow imperative, this one classifies the artifact requirement alone"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["lane-typecheck (required check, armed 2026-07-10, frozen 18-context set)", "lane-build-validate (required check, armed 2026-07-10, frozen 18-context set)"]
education:
  disposition: "ROWS-ONLY (wave-1 finding, recorded 2026-08-02): the sweep found ZERO imposter clauses — TCP:44/:146/:149 are the pilot's own retained/rewritten education (untouched); BUILD-SYSTEM-SETUP:188/:210 are KEEP (local dev-loop guidance, no gate at that grain — the retained subtask-targeted-tests precedent); PTD/PSP hits are task-template examples. Late-found adjacent hit Test-Development-Standards:1472 is DEFERRED to Wave 2 with its surface (explicit call, recorded on npm-test-before-complete's history). No prune action exists for this rule; the row documents the clean state so future waves do not re-litigate it."
history:
  - { date: 2026-08-02, change: "entry created (U1b wave 1, Task 5.2 step (a)) as a rows-only finding; enumeration record in wave-1-assessment.md §5; pending Peter's record-first row ratification", by: thurgood }
  - { date: 2026-08-02, change: "row RATIFIED (Peter, 2026-08-02, in-session record-first; post-consult revision reviewed) — classification approved; prune application still gated on 5.W(b) verification + the wave ballot", by: thurgood }
```

### contract-platforms-specified

```yaml
rule: "All behavioral contracts SHALL specify platforms — armed assertion behavioral-contract-validation.test.ts:275 'all contracts should specify platforms' (root functional lane)"
boundary_call:
  class: functional
  rationale: "A machine-checkable presence check against a contract's own platforms field — the validation-criteria-completeness class"
verification:
  disposition: barrier
  owner: lina
  check_state: armed
  checks: ["behavioral-contract-validation.test.ts:275 'all contracts should specify platforms' (root functional lane) — armed since 125-A; no implementation work performed in wave 2"]
education:
  disposition: "record-only entry (the wcag-format-validity Req 12.7 class): the check was armed but UNREGISTERED until wave 2's scoring of CDS:823 surfaced it (owner consult R2-2 — a gap-mode finding produced by adjudicating a KEEP line). Education layer: CDS:823's fenced schema field list (KEEP, wave 2) is the only known prose naming the obligation — accurate, retained. No imposters known; the territory sweeps with any future wave that touches its surfaces."
history:
  - { date: 2026-08-25, change: "entry created (U1b wave 2, Task 5.3 step (a)) per Peter's roster/register amendment ruling (2026-08-25, record-first, in-session — approved together with rostering wcag-format-validity's education layer into wave 2). Found by Lina at consult R2-2; drafted and landed by Thurgood per the register-writes-stay-with-the-steward convention. Related open question (5.6 closeout checklist item): whether the remaining non-C1-C11 armed rows are rostered anywhere. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md; wave-2-consult-lina.md R2-2", by: thurgood }
```

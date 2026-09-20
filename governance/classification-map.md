---
id: classification-map
inclusion: manual
name: Classification Map
description: The per-rule classification-map register — each governance/design rule's boundary call (functional/operational/ideological), verification disposition + owner, and education disposition, recorded once and cited thereafter. Entries are stable, citable markdown headings with fenced-YAML machine-readable bodies.
aliases: classification map register, rule classification, boundary call, verification disposition, education disposition, enforcement ownership, which check verifies a rule, teacher or imposter, prune register, check-state facet, dormant check state
---

# Classification Map

**Date**: 2026-07-14
**Last Reviewed**: 2026-09-19
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
6. **The (e) point for a windowless wave is the unit's MERGE** (recorded 2026-09-17, wave 4 — Stacy consult condition C2; ratified at the wave-4 PR's merge). 5.W(e) presumes a window close that a rows-only wave never has; without a general determination the wave's completion point — wave record, chafe line, task tick, completion docs — is undefined *by construction*, and the gap recurs per rows-only wave (it bit wave 3, whose record landed retrospectively at wave 4). No window → no window-close event → the unit merge is the wave's last defined event and is therefore its (e) point. A windowless wave's chafe line reports the steward's LIVED friction over the wave's working period, labeled with an instrument note — never "none-observed" from an instrument that did not exist (a null there is an absence of collection, not a measured zero — the pilot closeout §"chafe" finding, binding on the 5.Z dial reading).
7. **Campaign-close determination for windowless final waves** (recorded 2026-09-17, wave 4 — Stacy consult B2; **put to Peter as an explicit ratification ask — his merge of the wave-4 PR ratifies the recommended reading; a contrary ruling amends this note by dated entry**). The ratified close condition ("the campaign window closes at the close of the FINAL wave's window") is literally unsatisfiable when the final waves open no windows — the triggering event cannot occur. Two readings were stated with their W1 consequences: **(i)** the campaign window closed 2026-08-27 at the last real window's close (pass 3) — then PRs merged after it are out-of-window and the shared dataset's OPEN status was stale for the campaign's final month; **(ii, RECOMMENDED)** the campaign window closes at the final wave's UNIT MERGE — preserves event-denomination, keeps the campaign's own tail measured, and makes the untranscribed #150+ range in-window (the recorded measurement debt in campaign-window-dataset.md then binds 5.6). Under (ii), the wave-4 PR's merge is the campaign-window close event and 5.6's trigger fires at it.

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
- `armed_at`: **optional** qualifier on `armed` — `pr-gate | tool-time | build-time`. **Default: `pr-gate`.** Ratified 2026-09-17 (open item O-8; ballot `.kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md` **§ 10**). Three rules govern it:
  - **Existing rows are untouched.** An `armed` row with no `armed_at` means a required PR check, which is what every pre-2026-09-17 `armed` in this register already meant. Omission is not a defect.
  - **A non-PR-gate armed check MUST carry the field explicitly.** `tool-time` = the check blocks at its point of use (a CLI workflow refusing to proceed); `build-time` = it blocks the build. If an `armed` check does not block a PR, the row says so in the field — never only in prose.
  - **Counting rule**: gate-registration arithmetic (`tools/agent-generator/verify-gate-registration.sh`'s `EXPECTED_CONTEXTS`) counts **required PR check contexts only**. Rows qualified `tool-time` or `build-time` are **excluded from that arithmetic** — they register no PR context, so counting them would manufacture the drift the count-assert exists to catch.
  - Like `check_state` and `checks`, `armed_at` is **per-scope** on a scoped row (a rule can be PR-gated on one surface and tool-time on another).
  - *Upgrade path, noted not adopted*: if tool-time/build-time gates multiply, the field becomes **mandatory on every `armed` row** — at which point the default disappears and omission becomes a schema defect. That is a later amendment with its own record, not an inference from this one.
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
                                # armed_at: pr-gate | tool-time | build-time — OPTIONAL
                                # qualifier on `armed`, DEFAULT pr-gate (omit it on
                                # required-PR-check rows); a non-pr-gate armed check MUST
                                # carry it, and is excluded from EXPECTED_CONTEXTS counting
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
      rationale: "PR-approval-as-ratification (branch protection + CODEOWNERS -> Peter) — delivered by 125-B U3; until it arms, the standing carve-out (Task-Completion-Protocol § The Merge Rule, :126) keeps these paths Peter-merged as the closest ratification proxy. FACT REFRESH, INLINE BY DESIGN (wave 4, 2026-09-17 — placed here rather than history-only because the misread happens while reading THIS rationale; the C8 armed_semantics_note precedent): a .github/CODEOWNERS file EXISTS since Spec 118 Task 9.1 and it is NOT this scope's deliverable — it is scope-disjoint (package.json + package-lock.json only, the tsx pin-bump review gate; its own header: 'NOT a repo-wide ownership map'), it self-documents as ADVISORY until Peter enables required code-owner review in branch protection (a Settings action with no committed record found), AND its routing is unproven even on its own two paths (the file's own :24-28 caveat: the @3fn owner handle could not be verified against a real GitHub identity, and 'an unresolvable CODEOWNERS entry silently fails to route'). U3's arming marker (proposed -> armed) therefore inherits a NAMED PRECONDITION: a CODEOWNERS that verifiably routes. Existence of the file is not arrival of U3"
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
  - { date: 2026-09-17, change: "Wave 4 (5.5) STATE CONFIRMATION — barrier scope HOLDS at `proposed`: U3 has not run (tasks.md Task 6 still a gated placeholder), NO delegation of merge-on-green exists in any of the 11 committed ballots (TCP:125 requires a recorded rule; absent it, agents-open-Peter-merges and the :126 carve-out both stand, verified verbatim), and no record enables required code-owner review. The Spec-118 CODEOWNERS fact refresh is recorded INLINE on the barrier scope's rationale (see there) — existence of that file is not arrival of U3, and its unproven @3fn routing is a named U3 precondition. The ungated record-check scope re-verified OPERATIVE: the Spec-127 outline-settle ballot executed record-first days before this entry (#166), and this wave's own rows ratify record-first at merge. Education KEEP re-verified across the row's FULL surface list (Stacy consult condition A3.1 — not just TCP:93/:126: TCP:153 verified verbatim; ballots README + the shared-catalog canonical statement verified via Stacy's check-worded sweep of the ARMED record-check scope's vocabulary — 7 hits, all already enumerated on this row, zero new imposter candidates). METHOD FINDING routed to 5.6 (Stacy A3.3): the two-blade test DEGENERATES on record-check dispositions — the 'armed check' is an agent mechanically verifying a committed record at point of use, so deleting the education deletes the check; blade 1 cannot discriminate. Recurs for every future record-check row. Consult: wave-4-consult-stacy.md; evidence: wave-4-assessment.md §3", by: thurgood }
  - { date: 2026-09-18, change: "5.6 CLOSEOUT SITTING — the wave-4 Settings assumptions VERIFIED BY PETER (branch-protection screenshots; closeout ballot D6): (1) 'Require review from Code Owners' is NOT enabled — and is structurally unavailable at present, because 'Require a pull request before merging' is itself UNCHECKED and code-owner review is a nested option under it. U3's arming path is therefore TWO Settings toggles (require-PR, then code-owner review) plus the pre-existing @3fn handle-resolution precondition. (2) NO required-approvals rule exists — a steward inference at the sitting ('Peter reviews each PR' read as platform-enforced approval) was FALSIFIED by the screenshots and is corrected here rather than recorded: the platform merge gate on main is required-status-checks (18 contexts, verified exact) + 'Do not allow bypassing' (admin-enforced) + 'Require linear history' (ON); 'Peter merges on green' remains the CONVENTION recorded in Task-Completion-Protocol, mechanically supported by checks+no-bypass, not a platform approval requirement. Evidence: .kiro/docs/ballots/2026-09-18-u1b-campaign-closeout-verdict.md D6; completion/u1b/campaign-closeout.md", by: thurgood }
  - { date: 2026-09-18, change: "SITTING FOLLOW-THROUGH (same day, after the D6 answers): Peter ENABLED 'Require a pull request before merging' on main (screenshot-verified; ALL sub-options deliberately OFF — Require approvals, Dismiss stale approvals, Require review from Code Owners, most-recent-push approval). Effect: the direct-push-of-a-green-SHA edge is closed by configuration, and U3's two-toggle path is now HALF MET (toggle 1 of 2). The D6 entry above's 'structurally unavailable' clause is thereby SUPERSEDED for toggle-availability — code-owner review is now configurable but remains OFF, and MUST remain off until U3 resolves the AUTHORING-IDENTITY constraint first recorded at this sitting: every PR is authored by Peter's own token and GitHub forbids self-approval, so code-owner review (an approval) cannot function until agent PRs come from a distinct identity (machine account / GitHub App). Full precondition ledger: .kiro/specs/125-B-classification-map/inbound-to-u3-from-5-6.md", by: thurgood }
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
  disposition: scoped
  owner: ada
  scope:
    - surface: "the 17 LOCKED token families — literal NAME-SET locks (red on creation, rename, AND removal): primitive opacity (14 names), blend (5), motion duration/easing/scale (3/4/6), shadow offset X/Y (9/5), border width (4), semantic accessibility (3); CARDINALITY locks (red on creation and removal; silent on rename): primitive color (54 tokens / 15 families), sizing (14), blur (9), font weight (9), font size (11), line height (11), radius strategic-flex (5), semantic opacity (4), semantic blend (8), semantic border width (4), semantic icon (11/12)"
      disposition: barrier
      check_state: armed
      checks: ["family-integrity assertions across 12 suites in lane-functional-root (a required context, verify-gate-registration.sh:65) — strongest single citation src/tokens/__tests__/OpacityTokens.test.ts:56-78 (toEqual([...14 literal names...]) + toHaveLength(14) + Object.keys equality): a new opacity112 REDs the lane at four assertion sites without the author touching a test. Full per-family citation table: wave-4-consult-ada.md §1.4. Selection verified BY EXECUTION (jest --listTests, 2026-09-17); assertions verified live-not-skipped (4 suites / 136 tests green). ARMED BY INCIDENT, NOT DESIGN: these are per-family math/shape regression tests authored at various times for other reasons — nobody designed a token-creation gate. The register records what mechanically bites, not what was intended (the no-disabled-states four-origins precedent, same wave)"]
      rationale: "What the locks verify, stated precisely (Ada's own counter-argument, folded): they detect that a token APPEARED — they red equally on a sanctioned addition, and the author clears them by editing one test literal in the same PR. So they are a barrier against SILENT appearance, not against unsanctioned creation: the mechanical property is that a token addition cannot land without surfacing as a reviewable, named test-literal diff hunk on the PR. The row's own clean split predicted exactly this mechanism class — 'a check may detect that a token appeared; it never verifies that its creation was sanctioned'"
    - surface: "everything else — PRIMITIVE spacing (the flagship family: its formula assertion passes any new token that satisfies the formula), radius, density, breakpoint, tapArea, glowOpacity, shadowOpacity, scale; font family + letter spacing (locks exist but are SELF-REFERENTIAL — names array vs. object keys, a token added to both passes); 11 semantic families (color, spacing, radius, typography, motion, layering, shadow, elevation, gridSpacing, style, zIndex); and ALL component tokens (defineComponentTokens() — no inventory assertion anywhere)"
      disposition: warn
      check_state: proposed
      checks: []
      rationale: "A new token here lands entirely silently (each family checked individually, negative results reported — wave-4-consult-ada.md §1.4). Non-detecting mechanisms verified and NOT credited: DTCG validateTokenCounts and the property-test floor are FLOORS (detect removal, never creation); canonical/generated.lock has no token coupling. BEST-SHAPED CANDIDATE MECHANISM, named for whoever arms this: npm run audit:theme-drift WOULD red on a new theme-varying semantic token (diffs the generated skeleton against the dark overrides) but is a manual script — in no workflow, not build-wired. U3 diff-gate territory otherwise unchanged"
education:
  disposition: "KEEP — education owns mathematical fit, semantic/tier correctness, and the approval itself (token-governance autonomy levels + Component Development Guide's token-selection framework; generated prompts teach right-token / right-tier / mathematical fit). The clean split (Part 1 of the evidence): a check may detect that a token appeared; it never verifies that its creation was sanctioned or that it is mathematically/semantically correct — those stay education's job. RE-VERIFIED AT WAVE 4 (owner pass, all five citations verbatim-accurate and current): core-goals.md:55-59 the four-tier autonomy ladder; Token-Governance.md:180-186 the canonical statement + creation checkpoint + decision matrix; Rosetta-System-Architecture.md:512 (correctly scoped to component tokens); Figma-Workflow-Guide.md:446 ('create it through the spec process' — the highest-pressure minting temptation); canonical/agents/ada.md:11/:14-27 -> all generated prompts. IMPOSTER QUESTION RE-RUN against the newly recorded armed scope (the blade-1-fails-by-construction reasoning no longer applies — an armed gate now exists): none of the five citations restates any locked inventory; they teach the APPROVAL PATH and TIER SELECTION, categorically what the locks cannot supply. Blade 1 fails ON THE MERITS rather than by construction — same destination, honest route (Ada, wave 4). STRENGTHENING FACT (Ada, wave 4): this education layer is itself MECHANICALLY PINNED — canonical/agents/ada.md:19-27 declares a mustContain assert (claim: creation-requires-human-review) against Token-Governance.md § 'Token Creation Governance'; editing that sentence out fails the generator's claim assertion, and the agent-generator gates are required contexts. The cleanest example in the register of education-as-the-load-bearing-layer, mechanically protected as such — an armed guard on the education layer of a row whose verification layer was, until this wave, recorded as having none."
history:
  - { date: 2026-07-14, change: "entry created from Experiment 3 (token-approval boundary call + feasibility spike), U2 — boundary call and FP/FN adjudication are Ada's (token-owner judgment); Thurgood audited the evidence and landed this entry. Evidence: .kiro/specs/125-B-classification-map/completion/u2/exp3-spike-evidence.md", by: thurgood }
  - { date: 2026-09-17, change: "Wave 4 (5.5) state work — the FACT BASE FELL (Ada BLOCKING, invoking the assessment's own falsification clause): the draft's 'no detection mechanism exists' was WRONG. Armed, blocking, required-lane token-creation detection exists and is broad — literal name-set locks on 6 families + cardinality locks on 11, all in lane-functional-root; scalar warn/proposed restructured to scoped[] (barrier/armed-by-incident on the 17 locked families; warn/proposed on the remainder incl. the flagship spacing family, 11 semantic families, and ALL component tokens). METHOD FINDING (Ada, routed to 5.6 with W4-8): the steward's sweep S4 hunted the RULE's vocabulary (createToken|new.token) where the wave's own S3 discipline requires hunting the CHECK's (toEqual([|toHaveLength() — the mechanisms are named family-integrity tests, nothing calls itself a token-creation check. Fourth consecutive under-recording of arming across the campaign; the failure class is sweep-vocabulary selection, not only roster decay. Mutation bite-proof NOT run (consult was no-edit; bite entailed by reading — toEqual([...14 names...]) cannot pass with 15 keys; recipe recorded in wave-4-consult-ada.md §1.5 for belt-and-braces). Education KEEP re-verified + mechanically-pinned fact added. Consult: wave-4-consult-ada.md §1-2; evidence: wave-4-assessment.md §4 + §12", by: thurgood }
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
  - { date: 2026-09-17, change: "Wave 4 (5.5) WATCH CONFIRMATION — proposed/none HOLDS: no incremental-path integrity check exists anywhere (workflows + suites swept); the masking property stands by CI construction (lane-functional-root builds from a clean checkout every run). The corpus remains silent at rule grain — one incidental watch-mode dependency note (Process-Spec-Planning:2146, not this rule), zero imperatives, zero claimed checks (no phantom-gate class hit). ADJACENT DEVELOPMENT noted, not folded: PR #163 (2026-09-15) wired docs/tokens.css regeneration into the build — stale-artifact class, which narrows one practical consequence surface of this hazard without being an incremental-path check; the candidate mechanism remains undesigned. Evidence: wave-4-assessment.md §5 + §7 S5", by: thurgood }
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
  checks: ["behavioral-contract-validation.test.ts 'accessibility-related contracts should have WCAG references' (root functional lane) — re-armed at the canonical allowlist matcher (Req 12.1-12.3). Match-count floor: aggregate selection > 0 (69 selected at Task 4.2's audit) PLUS per-literal presence for interaction_focusable (7 live), interaction_focus_ring (10 live), state_error (4 live). state_disabled is EXCLUDED from the per-literal floor — an exclusion now PERMANENT-BY-OUTCOME (the Button-CTA disabled-state adjudication RULED REMOVE 2026-07-15; ZERO live state_disabled contracts exist corpus-wide, so nothing can be floored); the matcher's WCAG_REQUIRED_EXACT still lists state_disabled DELIBERATELY: any reintroduced contract is still selected and still must carry a valid wcag ref — which makes this check the REINTRODUCTION BACKSTOP for governance/classification-map.md § 'no-disabled-states' scope 6 (the 25 components with no philosophy guard), a format check that at least forces a reintroduction to surface. Floor proven live via gate-bite mutation (Task 4.3)"]
education:
  disposition: "WAVE-2 ROW (5.3, 2026-08-25) — prune CANDIDATE pending ratification: corpus-wide sweep (steward + owner enumerations converged) found 3 imposter deletions (CDS:686 and CDS:513 checklist restatements — CDS:513 dual-rule with wcag-format-validity; PIG:468 review-template restatement inside a decorative yaml fence) + 2 contradiction REWRITES (CDS:824 wrong-trigger line; CSR:183 field-table 'null if not applicable' — instructs the exact form that reds the gate for allowlisted contracts). KEEP set: CDS:612 why-education; CDS:823 accurate schema field list; CMDT:681 out-of-territory (validates the family-doc table, which the gate never reads); TBCV:63/:67 the genuine teacher; CDG wcag-THEME (different concept); CSR:152/:185 schema reference. EDUCATION-DRIFT HAZARD (recorded per the owner consult — the strongest methodology finding of the campaign: a KEEP-classified education surface can defeat an armed gate WITHOUT restating it): Component-Templates.md :699-849 teaches SEVEN retired pre-063 contract names (focusable, pressable, hoverable, error_state, success_state, loading_state, focus_ring) that the allowlist matcher cannot select — a scaffolding author produces contracts the gate never checks; CIS:79-90 legacy names + wrong count; family-doc tables name accessibility contracts WITHOUT the accessibility_ prefix (routing around the matcher); CDS:804-829 block lists post-063-removed schema fields. The per-literal floor is a corpus-liveness alarm, NOT per-component coverage — it will not fire on new drift. Repair = Lina's ballot items (Component-Templates FIRST), sequenced per the Peter ruling recorded at ratification. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md; consult: wave-2-consult-lina.md (R1+R2). PRIOR STATE (U2, retained): no prose predecessor taught the six-name trigger; the adjudication table (.kiro/specs/125-B-classification-map/completion/u2/stemma-pre-arm-adjudication.md) records the 7 nulls resolved and the DD3 floor-input correction (true live counts 7/10/1/4)."
history:
  - { date: 2026-07-14, change: "entry created (U2, Task 4.2 audit -> Task 4.3 arm): check re-armed, replacing the legacy 6-name trigger (behavioral-contract-validation.test.ts, formerly :325-350) with the normative allowlist matcher (C7) copied verbatim from .kiro/specs/125-B-classification-map/completion/u2/wcag-required-matcher.ts. State transition: DORMANT (armed-but-aimed-at-6-retired-legacy-names, discovered 125-B design-outline §3.3) -> armed (re-pointed at canonical allowlist; audit-clean per 4 WCAG-ref fixes + 3 legitimate-null 'N/A' exemptions applied to contracts.yaml BEFORE arming). Aggregate floor: 69 selected at audit. Bite-tested live (4 mutate/red/restore/green cycles). Row drafted by Lina; landed by Thurgood per the Task 4.1 register-writes-stay-with-the-steward convention — evidence: .kiro/specs/125-B-classification-map/completion/task-4-3-completion.md", by: thurgood }
  - { date: 2026-07-14, change: "Per-literal floor set to THREE literals (interaction_focusable, interaction_focus_ring, state_error) per Peter's in-session amendment to DD3's originally-recorded four (design.md still records four; this entry is the citable deviation record). state_disabled EXCLUDED from the per-literal floor pending the Button-CTA disabled-state adjudication — the matcher's WCAG_REQUIRED_EXACT set is UNCHANGED: state_disabled contracts (1 live, Button-CTA) are still selected and still must carry a valid wcag ref; the amendment narrows the floor assertion only, not the selection. This defuses the razor's-edge coupling risk Lina raised as a PETER-ESCALATION in Task 4.2's adjudication table (.kiro/specs/125-B-classification-map/completion/u2/stemma-pre-arm-adjudication.md §7). Drafted by Lina; landed by Thurgood — evidence: .kiro/specs/125-B-classification-map/completion/task-4-3-completion.md", by: thurgood }
  - { date: 2026-08-25, change: "Wave 2 (5.3) classification: candidate diff produced (3 deletions + 2 rewrites, three surfaces — CDS/PIG/CSR), education-drift hazard recorded (Component-Templates seven retired names, CIS, family-doc unprefixed tables, CDS stale block), consumed unchanged by (b)'s probe+trial and applied only as ratified at (c). An R1 roster-bounded sweep reported rows-only and was FALSIFIED by the owner consult (Lina, BLOCKING x4) — the corpus-wide re-sweep found the candidates on surfaces the roster never named; both rounds + steward verification: wave-2-consult-lina.md. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-2-assessment.md", by: thurgood }
  - { date: 2026-08-25, change: "STALE-PENDING DISCHARGE (register currency, steward catch at wave 2): the 2026-07-14 floor amendment's state_disabled exclusion cites the Button-CTA disabled-state adjudication as 'pending' — it RESOLVED 2026-07-15, RULED REMOVE, implemented (.kiro/issues/button-cta-disabled-state-adjudication.md; CIS:90 records DesignerPunk does not support disabled states by design). The exclusion's rationale is therefore SETTLED, not pending: state_disabled stays outside the per-literal floor because no live instances exist by design; the matcher's WCAG_REQUIRED_EXACT still lists it (harmless — selects nothing; any future state_disabled contract is still selected and checked)", by: thurgood }
  - { date: 2026-08-25, change: "Wave 2 rows + candidate diff RATIFIED (Peter, 2026-08-25, record-first, in-session at step (a) completion): the 5-hunk diff approved as the (b) probe+trial input (prune application still gated on (b) evidence + the wave ballot at (c)); roster/register amendment APPROVED (wcag-format-validity education layer rostered into wave 2 + contract-platforms-specified row created); sequencing RULED — Lina's Component-Templates repair lands BEFORE/WITH the wave-2 prune merge (option (a) of assessment §5.4)", by: thurgood }
  - { date: 2026-09-17, change: "Wave 4 (5.5) checks[]-FIELD FACT REFRESH — deliberately NOT a second discharge (Lina's framing correction, owner consult: the 2026-08-25 STALE-PENDING DISCHARGE entry above already discharged the pending correctly and completely; two discharge records for one event would itself be a register defect): what remained stale was the checks[] prose ('pending … currently 1 live'), now rewritten to the settled facts — adjudication RULED REMOVE 2026-07-15, live count ZERO corpus-wide (verified mechanically at wave 4: all 21 state_disabled keys sit under exclusion sections, none under contracts:), floor exclusion permanent-by-outcome. CROSS-REFERENCE ADDED both ways with the new no-disabled-states row: this check's still-selecting matcher is the reintroduction backstop for that row's unguarded scope 6. Companion stale comment at behavioral-contract-validation.test.ts:390-397 ('pending') — owner Lina confirmed and takes the repair, batched with her wave-4 component-side repairs. Consult: wave-4-consult-lina.md W4-5; evidence: wave-4-assessment.md §6", by: thurgood }
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

### never-hand-edit-122-generated

```yaml
rule: "Spec-122 generated outputs (CLAUDE.md, .claude/agents/**, .kiro/agents/**, .claude|.kiro/skills/**, canonical/manifests/**, canonical/coverage-map.yaml + coverage-manifest.yaml, canonical/registry/**, canonical/_fixture-output/**) are NEVER hand-edited — the edit goes to the canonical source and the pipeline regenerates (the C7 wave-3 row)"
boundary_call:
  class: functional
  rationale: "Whether a guarded output's bytes equal what the generator would produce is a mechanical property of the artifact pair (regenerate into a temp tree, compare bidirectionally) — no judgment; the diff-guard's bidirectional compare means a hand-edit, a stale extra, and a missing output all fail identically"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["122-diff-guard (required check) — tools/agent-generator/diff-guard.ts: regenerates everything into a temp tree via the SAME generateAll path real regeneration uses, then compares BIDIRECTIONALLY over guardedRoots(repoRoot) (static substrate roots + the cutover-ledger-derived per-agent files); any delta fails loud. Fast no-op via canonical/generated.lock (input-closure hash + output hash). Verified live this pass: guarded roots enumerated at tools/agent-generator/generate.ts:433-450, closure roots at diff-guard.ts:36-46", "adjacent, not this rule's what: 122-canonical-vs-truth + 122-sweep-1..8 (reference resolution, skills round-trip, ambient/declaration/disposition properties — they verify source correctness, not output-equals-regeneration)"]
  guard_is_ledger_conditional: "THE GUARDED SET IS DERIVED, NOT STATIC (Lina consult, amendment 2 — recorded because the checks[] line above otherwise reads as a fixed enumeration). guardedRoots(repoRoot) derives the per-agent files from canonical/cutover-ledger.yaml, 'from an agent's ledger entry forward'. All 8 agents are currently in the ledger (ada, lina, thurgood, sparky, leonardo, data, kenya, stacy — verified), so today the guarded set covers every .claude/agents/*.md and .kiro/agents/*.{json,-prompt.md} and N-unguarded = 0. But a FUTURE agent whose runtime artifacts exist BEFORE its ledger entry is an unguarded generated output, where a hand-edit IS silent until cutover. Structural condition, not a current defect — recorded so a ninth agent is not the moment someone discovers the set was derived all along"
education:
  disposition: "ROWS-ONLY (wave-3 finding, 2026-09-13, CORPUS-WIDE sweep at source grain — .kiro/steering/ 9 docs + governance/ 83 docs + canonical/agents/ 9 + canonical/shared/ 4 + skills/, four independent vocabularies: hand-edit|never edit|do not edit|regenerat; diff-guard|122-sweep|generated output|guarded root|.claude/agents|canonical/agents; SSOT|source of truth|NEVER hand|by hand|hand-place|GENERATED OUTPUT; overwritten|clobber|will be lost|edit the source|generated artifact). ZERO imposters — and the stronger finding: ZERO imperative statements of this rule exist anywhere in the education corpus at source grain. The rule's only imperative home is the GENERATOR'S OWN EMITTED BANNER (tools/agent-generator/adapters/cc.ts:422-425 'GENERATED FILE — do not hand-edit … a hand-edit here will be overwritten and caught by the diff-guard'; coverage-map.ts:182/:193) — TOOLING, outside the education corpus, self-disclosing at the point of hazard (the wave-1 complete-task.sh echo-disclosure class; retained, nothing to prune). Scored KEEP (descriptive, not imperative; each supplies routing the gate cannot): canonical/shared/skills-map.yaml:23 ('.kiro/skills/** is a GENERATED OUTPUT of this table … Kiro is not the source') — names the SOURCE, which the gate never does; canonical/agents/{ada,lina,thurgood}.md:5-6 hand-port/never-clobbered reconciliation headers and {kenya,sparky,data,stacy,leonardo}.md cutover-status headers (provenance comments); canonical/agents/_fixture.md:7 ('sits inside C6's guarded surface'); canonical/agents/stacy.md:169 coverage-of-coverage routing cue. EDUCATION-ABSENCE HAZARD (recorded, NOT actioned — authoring is out of this wave's prune mandate and would be its own proposal): (i) the generated .claude/agents/*.md and .kiro/agents/*.json carry NO do-not-edit banner at all — CC agent files open with required frontmatter, so the cc adapter's banner lands only on CLAUDE.md; (ii) Civitas-System-Overview.md:41-44 describes agent configs/prompt files without naming them generator output or routing to canonical/** — the one always-loaded surface where an author would look. Cost of both is FRICTION (a loud diff-guard failure), never a silent defeat — the inverse of wave 2's C4 hazard, where education aimed authors PAST a correctly-aimed gate. THE 'FRICTION, NEVER SILENT' CLAIM WAS FALSIFICATION-TESTED AND SURVIVED (Lina consult — recorded because a tested claim and an asserted one are different evidence): the fast no-op path was the hypothesized silent-pass route, and tools/agent-generator/sweeps/noop-probe.ts:22-25 compares BOTH legs (lock.inputClosure AND lock.outputs, the latter a sorted (path, content-hash) set over the guarded surface), so a hand-edit flips the output leg -> noop=false -> the full diff-guard runs; .github/workflows/agent-generator.yml is `on: pull_request` with NO path filter (declared law: the latency remedy is caching/parallelism, never path-filtering); all 8 agents are ledger-entered. TWO CONTINGENCIES the claim depends on, both now visible rather than implicit: (1) [Ada consult] the cost claim is downstream of those paths staying inside guardedRoots — if a file ever leaves the guarded set, its hand-edit cost silently becomes a DEFEAT, not friction; (2) see verification.guard_is_ledger_conditional. AMENDMENT TO (i)'s CAUSE [Lina consult, amendment 1]: the banner absence is a PLACEMENT choice, not a format constraint. The frontmatter-must-open constraint is real (verified: .claude/agents/lina.md opens '---\\nname: lina'), but it bars only the FIRST line — a comment as the first BODY line after the closing '---' is unconstrained, and .kiro/agents/*.json can carry a '_generated' key (JSON has no comments; the extra-key idiom is standard, though Kiro schema tolerance is UNVERIFIED). That moves O-3's decision from 'accept the friction' to 'a small adapter change', which is a different decision — and it carries a real recurring cost recorded on both sides: a body banner is prose every agent reads every session, on 8 files, forever, to protect against a hazard that already fails loud. Lina's lean (recorded, not adopted): the (ii) Civitas-System-Overview gap is the more valuable half — zero recurring cost, and it is the one ALWAYS-LOADED surface an author consults before touching an agent config. CONCRETE HARM SHAPE for (i)+(ii) together: an agent that 'fixes' its own routing in its generated file gets a loud failure (correct) but never learns WHERE to fix it, because neither the file nor any always-loaded doc names canonical/agents/** as the source — and those same files carry live C9 imperatives (lina.md:459, kenya.md:406, data.md:411, sparky.md:434). MISROUTING HUNT (a class this wave did not originally look for — prose aiming authors AT a guarded output, the wave-2 C4 hazard shape, which is strictly worse than a missing prohibition): swept by the Lina consult as pass 11; 3 hits, none an instruction (MCP-Evolution-Roadmap.md:217 historical record; DesignerPunk-Integration-Guide.md:238/:983 a CONSUMER repo's .kiro/agents/, out of territory) — NO C7 misrouting exists in the corpus. CHECK-WORDED RE-SWEEP (pass 10b, steward, post-consult — the pass-7 vocabulary-gap lesson applied to C7): 6 hits across the education corpus (Process-Hook-Operations.md:30, BUILD-SYSTEM-SETUP.md:128, canonical/shared/skills-map.yaml:57, canonical/shared/always-set.yaml:19, canonical/agents/stacy.md:190, canonical/agents/_fixture.md:108), ALL scored KEEP — descriptive provenance, tool routing, or illustrative; zero restate the guard's what as an instruction. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-3-assessment.md §2 + §6 (pass 10); consult records: wave-3-consult-ada.md §3.1, wave-3-consult-lina.md §4."
history:
  - { date: 2026-09-13, change: "entry created (U1b wave 3, Task 5.4 step (a)) as a ROWS-ONLY candidate finding; corpus-wide sweep record + reproducible commands in wave-3-assessment.md §2/§6; DRAFTED PRE-CONSULT (disclosed process inversion — the wave-2 U2 lesson: Ada's central consult and Lina's C9-scope consult run AFTER this draft and may falsify it, as Lina's wave-2 consult falsified an identical rows-only first pass). Pending Peter's record-first row ratification", by: thurgood }
  - { date: 2026-09-13, change: "CONSULT FOLD (Ada + Lina, both returned; ROWS-ONLY SURVIVED both falsification attempts on this rule — zero counter-citations). Row amended, not reclassified: (1) verification.guard_is_ledger_conditional added [Lina amdt 2] — the guarded set is cutover-ledger-derived, not static; (2) the 'friction, never a silent defeat' claim recorded as TESTED-AND-SURVIVED with its two contingencies made explicit [Lina falsification + Ada item 9]; (3) education-absence cause (i) corrected — the missing banner is a PLACEMENT choice, not a format constraint, with the recurring-context-cost counter recorded on the same line [Lina amdt 1]; (4) pass-11 misrouting hunt recorded CLEAN; (5) pass-10b check-worded re-sweep added (6 hits, all KEEP) — the pass-7 vocabulary-gap lesson applied to this rule. KEEP set and the ROWS-ONLY disposition unchanged; both education-absence findings independently re-verified by Ada and remain RECORDED-UNACTIONED (O-3 is Peter's). Consults: wave-3-consult-ada.md, wave-3-consult-lina.md", by: thurgood }
```

### never-hand-edit-generated-token-outputs

```yaml
rule: "Generated token / platform outputs are never hand-edited — the edit goes to the token source and the pipeline regenerates (the C8 wave-3 row). The rule governs FIVE artifact classes with opposite treatments; the per-class reality is in scope[]"
boundary_call:
  class: functional
  rationale: "Output-equals-regeneration is the same mechanical artifact-pair property as never-hand-edit-122-generated (regenerate, compare) — no judgment; but the class only BINDS where a committed copy exists to compare against, so the boundary is surface-dependent and the per-class realities are stated in scope[] (Ada ruling, 2026-09-13: 'PROVISIONAL' dropped — the scope[] now says exactly where a committed copy exists)"
verification:
  disposition: scoped
  owner: ada
  gate_adjudication: "RULED by Ada (token-pipeline owner) at the wave-3 consult, 2026-09-13 — disposition (B) `scoped`, NOT (A) and not flat (C). Rejection of (A): `disposition: none` 'would record a comfortable fiction about a surface that is demonstrably lying to the public today' — docs/tokens.css is not abandoned residue, it is a LIVE PUBLISHED consumer-facing surface (see the scope entry). Rejection of flat (C): one `proposed` scalar cannot simultaneously say 'guard this published file', 'never guard these fixtures', and 'no gate is POSSIBLE for dist/' — five classes needing opposite treatments; (C) survives INSIDE (B) as the check_state on the one guardable in-repo surface. Record of the consult's own counter-argument, carried because it is pre-authorized (see the docs/tokens.css elimination path): (A) is genuinely defensible if docs/tokens.css is read as a showcase-site asset rather than a token output — then the right move is to DELETE the committed copy and have the Pages build generate it, the last in-repo committed generated token output disappears, and this row correctly collapses to (A) by removing the exception rather than guarding it. Ada ruled (B) anyway on the principle that the register records the repo AS IT IS AT RATIFICATION, not as it will be after a fix. Full ruling: wave-3-consult-ada.md §1"
  scope:
    - surface: "dist/** (DesignTokens.{web.css,ios.swift,android.kt,dtcg.json,figma.json}, ComponentTokens.*, dist/browser/tokens.css) and src/types/generated/TokenTypes.ts"
      disposition: none
      check_state: none
      checks: []
      rationale: "UNTRACKED by construction — .gitignore:7 'dist/', :14 'src/types/generated/'; `git ls-files dist` = 0 and `git ls-files src/types/generated` = 0 (re-verified at the consult). Generator output paths: scripts/generate-platform-tokens.ts:34 -> dist/, scripts/generate-token-types.ts:63. No committed copy exists to diff against, so no PR-gate guard CAN exist; a hand-edit is destroyed by the next build and can never reach main. Enforcement here is BUILD EPHEMERALITY — a property of the build, not a gate. (Ada adopted the steward's (A) reasoning verbatim FOR THIS CLASS ONLY)"
    - surface: "docs/tokens.css — the committed, PUBLISHED GitHub Pages token stylesheet"
      disposition: barrier
      check_state: proposed
      checks: []
      rationale: "A LIVE PUBLISHED SURFACE, not residue — three independent checks: (1) docs/_config.yml url https://3fn.github.io + baseurl /DesignerPunk, and docs/_layouts/{default,deep-dive}.html:8 both emit <link rel=stylesheet href={{ '/tokens.css' }}> — every showcase page loads it (614 custom properties); (2) stale by a measurable amount — last regenerated 6163cf00 (2026-03-24), header stamp 2026-03-19, with 19 subsequent commits touching src/tokens/ of which 4 touch COLOR sources (#153 6825c954, #152 528120b6, v12.0.0 OKLCH migration 71120a5d, Spec 104 73661332); (3) IT IS PUBLISHING A VALUE THAT WAS FIXED AS AN ACCESSIBILITY FAILURE — source `color.feedback.success.text` -> green500 = rgba(0,204,110,1) (src/tokens/semantic/ColorTokens.ts:103-106), published docs/tokens.css:443 = rgba(0,255,136,1) = green400, the pre-#152 value; PR #152 (2026-09-12) is titled 'Fix color.feedback.success.text WCAG AA failure'. Same failure family as the open dual-color-source divergence issue, on a second, PUBLIC surface. MECHANISM (named, unbuilt — hence `proposed`): regenerate-and-diff on the 122-diff-guard pattern, or a Pages-publish-path regeneration. PRE-AUTHORIZED AMENDMENT PATH (Ada's own counter-argument, carried on the row so an amendment is not a surprise): this surface may be ELIMINATED rather than guarded — if the Pages build generates it and the committed copy is dropped, the artifact leaves the class entirely and THIS ENTRY AMENDS TO `disposition: none` with a dated history line. The defect itself is tracked independently of this row: .kiro/issues/2026-09-13-docs-tokens-css-stale-published.md (F-1, HIGH). Scope honesty from the consult: ONE value drift was confirmed by hand (no node_modules in the consult worktree, so no regenerate-and-diff was possible); the exhaustive drift diff is the FIX's first deliverable, not the ruling's precondition"
    - surface: "final-verification/DesignTokens.{web.css,web.js,ios.swift,android.kt}"
      disposition: none
      check_state: none
      checks: []
      rationale: "Out of scope PENDING DELETION — abandoned completed-spec verification residue with ZERO corpus references (consult sweep A: `grep -rniE 'docs/tokens\\.css|final-verification|demos/tokens\\.css' governance/ .kiro/steering/ canonical/` -> zero hits). Three DISTINCT vintages, not one (correcting the draft's 'same vintage' claim — Ada A-5): web.js 2025-10-23, ios.swift/android.kt 2026-02-07, web.css 2026-01-14, an ~8-month spread. Disposition F-2 (DELETE, MEDIUM) in the routed issue; deleting removes the guard question entirely"
    - surface: "deliberately-frozen spec fixtures — .kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/DesignTokens.* + ComponentTokens.web.css; .kiro/specs/web-format-cleanup/baseline-DesignTokens.web.css"
      disposition: none
      check_state: none
      checks: []
      rationale: "EXCLUDED BY DESIGN — their entire value is that they do NOT regenerate. Recorded explicitly because a naive regenerate-and-diff guard over 'committed generated token outputs' would RED on them: this is the strongest concrete argument against the unqualified (B) sketch, and it was ABSENT from the pre-consult draft (Ada BLOCKING B-1). Any future guard MUST carry this exclusion"
    - surface: "Figma Variables + Styles (out-of-repo generated token output)"
      disposition: barrier
      check_state: armed
      armed_at: tool-time
      checks: ["figma:push drift detection (TOOL-TIME, NOT A PR GATE — see `armed_at: tool-time` on this scope entry; the O-8 schema qualifier ratified 2026-09-17 replaced this row's former inline `armed_semantics_note` prose): the TokenSyncWorkflow compares current Figma state against expected and BLOCKS the sync on drift ('Drift detected: 3 variables have been edited in Figma since last push'), with `--force` as the documented override. Pipeline: Rosetta TS -> DTCG -> FigmaTransformer -> dist/DesignTokens.figma.json -> TokenSyncWorkflow -> Figma Variables + Styles (Figma-Workflow-Guide.md:125-132); gate + resolution block at :170-185, override at :140-141"]
      rationale: "C8's rule, ARMED, on a non-repo surface — a whole artifact class the pre-consult draft did not mention at all (Ada BLOCKING B-2). Its education is NOT an imposter: Figma-Workflow-Guide.md:172-185 describes the mechanism AND supplies resolution routing the gate cannot ('if these values should be tokens, create them through the spec process first') — the retained-teaching class, KEEP"
    - surface: "NOT IN CLASS (recorded so the boundary is checkable, not re-derived): demos/tokens.css and src/tokens/platforms/{ios/MotionTokens.swift,android/MotionTokens.kt}"
      disposition: none
      check_state: none
      checks: []
      rationale: "demos/tokens.css is a committed SYMLINK -> ../dist/browser/tokens.css (verified) — a pointer, not a generated file; editing 'through' it edits untracked, ephemeral dist/. Consequence worth one line: demos/ is broken in a fresh clone until `npm run build` — the known worktree-needs-generated-artifacts class, not a C8 defect (F-4, note only). MotionTokens.swift/.kt are HAND-AUTHORED source with platform-shaped names, confirmed from their own headers by both the steward and Ada"
education:
  disposition: "ROWS-ONLY (wave-3 candidate finding, 2026-09-13, CORPUS-WIDE sweep — same four vocabularies as never-hand-edit-122-generated plus a token-specific pass: dist/|DesignTokens.(web|ios|android)|generated (token|css|swift|kotlin)|platform output|token output). ZERO imposters. The finding is structural, not incidental: with no armed gate owning this rule's what (see gate_adjudication), the two-blade imposter test cannot classify ANY C8 prose as an imposter — the education layer is the only layer that exists for this rule today. Scored KEEP, all read-routing or descriptive, none an edit-imperative: Platform-Resource-Map.md:58 ('dist/ contains build artifacts — not source files. Do not reference for implementation work.') — an imperative, but it governs which file an agent READS, which no check owns, and it is the corpus's clearest statement of the source/output boundary; Platform-Resource-Map.md:41 the source-of-truth table and :57 the component-meta provenance line; canonical/agents/{sparky:57,:65; kenya:53,:62; data:66,:75}.md negative cues ('do NOT read the built … snapshot — it is a stale generated artifact, not the source of truth') — staleness routing, and note they independently corroborate finding (2) above; Rosetta-System-Architecture.md:405-429 Stage 6 platform-output architecture; Token-Semantic-Structure.md:364-399/:541 verify-generated-output procedure; BUILD-SYSTEM-SETUP.md:31/:121/:140/:184-188 build-before-testing-generated-output dev-loop guidance (the wave-1 retained-class precedent: no gate exists at that grain); DesignerPunk-Integration-Guide.md:289-296/:1000 consumer-repo regeneration flags (a DIFFERENT repo's pipeline — out of territory); Token-Resolution-Patterns.md:177/:208, Transformer-Development-Guide.md:173/:190/:265, MCP-Integration-Guide.md:381-404, DTCG-Integration-Guide.md code examples (illustrative use, blade-2 protected). ADJACENT GAP SURFACED, routed not folded (the wave-2 contract-platforms-specified precedent — a gap found by scoring a KEEP line): component-meta.yaml is a THIRD generated-artifact class — 39 tracked files produced by scripts/extract-component-meta.ts, taught with a real edit-prohibition imperative (component-meta-authoring-guide.md:55/:97 'Do not edit directly in meta file — edit the family doc and run npm run extract:meta'), with NO regenerate-and-diff guard and no register row. Not C8 (component metadata, Lina's domain) and not C7 (outside guardedRoots); recorded here so it is not lost, routed as a wave-3 open item — Lina ENDORSED route-don't-fold and took the surface, and her consult added the sharper defect: the extractor's preservation predicate is array LENGTH, not content (extract-component-meta.ts:343, :371), so a sanctioned hand-edit that REWRITES usage entries without adding one is silently clobbered by the next `npm run extract:meta` — the guide (:217 step 5) sanctions an edit the tooling does not durably preserve. Tracked as .kiro/issues/2026-09-13-component-meta-extractor-clobbers-handedits.md (owner: Lina); its future row needs FIELD-GRAIN scope[] (purpose+contexts unconditionally derived; usage+alternatives hand-editable-with-preservation), a parsed-YAML field-grain guard rather than the byte-grain 122 pattern, and the predicate repair as a precondition. THE §6 FALSIFICATION CLAUSE FIRED AND THE FINDING HELD (recorded because a clause that fires and is then silently dropped is worse than no clause): §6 said C8 falsifies if Ada lands on (B), because Platform-Resource-Map.md:58 and the three platform-agent negative cues must then be RE-SCORED against a real scope. Ada landed on (B) and re-scored all four — ALL REMAIN KEEP, unchanged: PRM:58 governs which file an agent READS; the ruled barrier governs whether a COMMITTED file equals regeneration — different what, no overlap, no imposter; the sparky/kenya/data cues are staleness routing about UNTRACKED dist/, the class ruled `none`. ADA'S OWN SWEEPS (B/C/D, verbatim in wave-3-consult-ada.md §2.1) found ZERO C8-territory imperatives on any token-domain surface, including the two the roster named and this row's KEEP set does not cite: Token-Governance.md:235/:249/:261/:270 and Token-Quick-Reference.md:119/:137-138 are declarative architecture and routing; Token-Quick-Reference.md:115 ('Product teams … do NOT edit these files') IS an imperative but governs base-source-vs-product-source, not source-vs-output — out of territory entirely. That omission was checked, not assumed. CHECK-WORDED RE-SWEEP (pass 10c, steward, post-consult): hits are the Figma drift-detection block (KEEP, retained-teaching, now a scope[] entry), component-meta-authoring-guide.md:31/:34/:55/:97/:214 (the O-4 gap, no guard -> blade 1 fails -> KEEP), Transformer-Development-Guide.md:343/:364 (descriptive pipeline), Platform-Resource-Map.md:57 (provenance). ZERO imposters. ADVISORIES routed to Ada's own queued Token-Family claims-vs-source pass, NOT wave items: Token-Quick-Reference.md:73/:87 cite dist/DesignTokens.web.css BY LINE NUMBER as evidence for a token's emitted value — unresolvable by construction in a fresh clone, and generated line numbers shift with every token addition; DTCG-Integration-Guide.md:231 shows `color.feedback.success.text -> {color.green400}`, the same stale value as the docs/tokens.css defect, corroborating that #152 did not propagate to its documentation surfaces. Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-3-assessment.md §3 + §6 (pass 10); consult: wave-3-consult-ada.md."
history:
  - { date: 2026-09-13, change: "entry created (U1b wave 3, Task 5.4 step (a)) as a ROWS-ONLY candidate finding with the GATE FIELD DELIBERATELY OPEN — 'TBD, Ada adjudication pending' per the ratified roster (tasks.md 5.4 fill slots: 'gate TBD at classification, Ada adjudicates'); the steward established the artifact facts and enumerated candidate dispositions without settling the call. Drafted pre-consult (disclosed process inversion, wave-2 U2 lesson). Evidence + reproducible sweep commands: wave-3-assessment.md §3/§6. Pending Ada's gate adjudication, then Peter's record-first row ratification", by: thurgood }
  - { date: 2026-09-13, change: "GATE ADJUDICATION CLOSED by Ada (owner ruling at the wave-3 consult) and FOLDED: disposition none -> **scoped** (B), boundary_call 'PROVISIONAL' dropped, gate_adjudication rewritten from an open question to the ruling + its own pre-authorized elimination path. The pre-consult fact base did NOT survive (Ada BLOCKING x3 on this row): TWO artifact classes were missing — deliberately-frozen SPEC FIXTURES (excluded by design; a naive guard would RED on them) and FIGMA Variables/Styles (an armed, tool-time hand-edit gate) — and the row's framing question ('in-scope artifacts, or abandoned fixtures to delete?') was answered NEITHER for docs/tokens.css, which is a LIVE PUBLISHED surface currently serving a value fixed one day earlier as a WCAG AA failure. Five-class scope[] adopted verbatim-in-substance; armed_semantics_note added (this row is the first needing PR-gate vs point-of-use `armed`, with the schema clarification PROPOSED not applied — O-8). Stale-residue defect chartered as an INDEPENDENT issue (.kiro/issues/2026-09-13-docs-tokens-css-stale-published.md, F-1..F-4, session-paired with the dual-color-source divergence issue) — deliberately NOT made the row's vehicle: the defect exists whether or not this row ratifies, and 'the row says proposed' must not become a reason the fix waits. ROWS-ONLY survived (zero counter-citations); the §6 falsification clause FIRED on (B) and the re-scored KEEP set held unchanged. Consult: wave-3-consult-ada.md", by: thurgood }
  - { date: 2026-09-17, change: "O-8 EXECUTED (Peter's ruling at the Spec 127 outline-settle sitting, 2026-09-15..17, option (c) OPTIONAL QUALIFIER; ballot .kiro/docs/ballots/2026-09-17-spec-127-outline-settle.md). The Entry Schema gained the optional `armed_at: pr-gate | tool-time | build-time` field (default pr-gate; existing rows untouched; non-pr-gate rows carry it explicitly; qualified non-pr-gate rows excluded from EXPECTED_CONTEXTS arithmetic). THIS ROW'S CHANGE IS REPRESENTATIONAL, NOT CLASSIFICATORY: the `armed_semantics_note` prose is REMOVED and its content is now carried by `armed_at: tool-time` on the Figma Variables + Styles scope entry; the checks[] cross-reference was re-aimed from the removed note to the field. No disposition, check_state, owner, scope membership or education disposition changed — the Figma gate was tool-time before this edit and is tool-time after it", by: thurgood }
```

### no-hardcoded-color

```yaml
rule: "Color values in component and product implementations come from color tokens — no hard-coded hex/rgb literals (the C9 wave-3 row; the NAMED classify-only commitment carried from 125-B's Exclusions section: the row lands, no lint task ships in 125-B)"
boundary_call:
  class: functional
  rationale: "The boundary is surface-dependent (a color literal is a DEFECT in a component implementation and the POINT of a token definition, a theme override, or a doc example), so per-surface realities are stated in scope[]. MACHINE-DETECTABILITY IS NARROWER THAN 'a color value' (corrected post-consult, Lina W3-4 — the pre-consult line said 'a hex literal … is machine-detectable by regex against the file's own bytes', which overstated it): the existing detector sees UNQUOTED hex, and rgb/rgba/hsl only in `property:` position; it does NOT see `oklch(...)` — the project's OWN current color-source format, per the open dual-color-source divergence issue — nor CSS named colors (`rebeccapurple`), nor any color inside a string literal. So the class is functional (a mechanical property of the bytes) but the CURRENT instrument's reach is a strict subset of the rule's what; a future lint task must not inherit a detector that misses the house format"
verification:
  disposition: scoped
  owner: ada
  scope:
    - surface: "the 7 components carrying a *.stemma.test.ts (Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base, Button-Icon, Input-Checkbox-Base, Input-Radio-Base, Input-Radio-Set) — and within them, ONLY color occurrences in UNQUOTED position in the `.web.ts` file (i.e. multi-line template-literal CSS body lines). String-literal, attribute-quoted, and comment forms are all skipped"
      disposition: barrier
      check_state: dormant
      checks: ["the per-component stemma assertion it('should not have hardcoded color values') — validateTokenUsage(webComponentSource, WEB_COMPONENT_PATH) filtered to code HARDCODED_COLOR | INLINE_STYLE_COLOR, expect(colorErrors).toHaveLength(0); detector src/validators/StemmaTokenUsageValidator.ts:220 hexColor /#[0-9a-fA-F]{3,8}\\b/g flagged at :436-452, plus INLINE_STYLE_COLOR at :415-424 from INLINE_STYLE_PATTERNS[platform].color (:135-143). Runs in the functional lane (verified BY EXECUTION, twice independently: `npx jest --config jest.functional.config.js --listTests | grep -c stemma.test.ts` -> 7) -> the lane-functional-root required check, registered at .github/workflows/lane-timing.yml:149-150"]
      rationale: "THE CHECK IS LIVE AND BLOCKING, AND IT CURRENTLY DETECTS NOTHING REAL — both halves are the finding, and the second half is why check_state is `dormant`, not `armed`. (1) DETECTION FORM: both color paths apply isInsideString(line, matchIndex) (:350-359 — counts quotes BEFORE the match on that line only; odd => skip) and the per-line loop first `continue`s on isCommentLine (:396-398). In a .ts file a color literal lives almost exclusively inside a string, a template literal, or a comment, so the reachable form is a CSS declaration line in multi-line template-literal BODY position. Probed forms that are SKIPPED (Lina + Ada ran the real exported validateTokenUsage): `const F = '#3B82F6';`, `el.setAttribute('fill','#123456')`, `el.style.color='#abcdef'`, `<div style=\"color: #fff\">` inside a template (the attribute's own quote makes the count odd), and `getToken('color.primary') ?? '#3B82F6'`. (2) THE GUARDED FILE ARCHITECTURALLY HOLDS NO SUCH LINE: all 7 import their CSS as a string from an external file and interpolate it (`import s from './X.web.css'` -> `<style>${s}</style>`); the steward re-counted unquoted CSS-declaration lines across all 7 guarded .web.ts files and found **0 of 7** — STEWARD CONTEST, recorded: Lina's consult reported 2 such lines in InputCheckboxBase.web.ts; on inspection those are :420 and :426 `color: 'inherit'`, JS object properties with QUOTED values (and therefore skipped anyway), so the correct count is 0, not 2. The contest makes her own finding STRONGER, not weaker. (3) EMPIRICAL: running the real detector over all 34 components' .web.ts and every component .css flags ZERO files. So the barrier is a tripwire on the wrong file type — the styling it exists to police lives in the unguarded external .css. WHY `dormant` AND NOT `armed` (the steward's call, which NEITHER consult proposed — both asked only that the surface line be narrowed; contestable by either owner and by Peter): the register defines `dormant` as 'an armed, blocking check whose selection is empty or STALE — it runs and passes while verifying nothing'. Jest selection is non-empty (7 suites run), so this is an EXTENSION of `dormant` from 'empty selection' to 'selection stale relative to where the governed content now lives' — which the definition's own word 'stale' admits. It is recorded as an extension rather than smuggled: `armed` is a true statement about CI state and a misleading one about coverage, and this register exists to be read as settled fact by future waves. `proposed` was REJECTED outright — the check is built and running; recording `proposed` would repeat, inverted, the roster's original 'none armed' error. WHAT WOULD FALSIFY `dormant` (revert to `armed`): any guarded .web.ts gaining a template-literal CSS region (one such line restores real bite), or the assertion being re-pointed at the .css file — which is also the cheapest available repair. Contrast with the ORIGINAL roster claim: 'none armed (a proposed-check row)' remains WRONG; an armed, blocking check does exist, and that correction stands"
    - surface: "the other 27 of 34 core components (no stemma test) and ALL component CSS files, including the 7's"
      disposition: none
      check_state: proposed
      checks: []
      rationale: "No check reaches these. For the covered 7 the CSS file — the place the styling actually lives — is asserted only for `tokenReferencesFound > 0` (that a token reference EXISTS), never for color-literal ABSENCE. LATENT, NOT LIVE (Lina W3-6, and it favours the education layer): all 34 .web.ts, all component .css and all 34 .ios.swift are color-literal clean today — the unguarded ~80% is COMPLIANT, so the gap is latent risk rather than an active defect, which is the strongest available evidence that the KEEP-scored education is working"
    - surface: "iOS and Android platform implementations (34 .ios.swift + 34 .android.kt)"
      disposition: none
      check_state: proposed
      checks: []
      rationale: "CORRECTED POST-CONSULT (Lina BLOCKING W3-2 — the pre-consult row said 'no detector at all', which is FALSE and cost-misleading): the detector HAS platform color patterns (INLINE_STYLE_PATTERNS.ios.color: `Color(red:`, `Color(#`, `UIColor(`, `.foregroundColor(Color(`, `.background(Color(`; .android.color: `Color(0x…)`, `Color(red=`, `Color.rgb(`, `Color.argb(`) and the platform-agnostic hexColor regex applies to any path. What is missing is ASSERTION WIRING on 68 existing files, not detection — 'wire existing detection' and 'build detection' are an order of magnitude apart, and this row is what a future arming decision will read. EMPIRICAL (existing detector over all 68): 3 files flag today — Avatar-Base/platforms/android/AvatarPreview.kt:319 `Color(0xFFFF9800) /* orange400 */`, a GENUINE literal duplicating a token value; Input-Radio-Base/platforms/ios/InputRadioBase.ios.swift:563 `.background(Color(.systemGray6))` and Input-Text-Password/platforms/ios/InputTextPassword.ios.swift:336 `.foregroundColor(Color(UIColor.secondaryLabel))` — the latter two are PLATFORM SEMANTIC COLORS, plausibly sanctioned idiom and therefore false positives for the rule as written. PRECONDITION for arming, recorded so it is not discovered late: the platform-system-color question must be adjudicated first, and it collides with the corpus's ONLY sanctioned hardcode carve-out (cross-platform-vs-platform-specific-decision-framework.md:143, 'When platform-native animations may use hard-coded values' + 4 permitted cases + 'document rationale') — same structural shape as the component-meta partial sanction: a partial permission defeats a naive guard. Note the illustration this hands the register for free: Input-Radio-Base is one of the COVERED 7 and carries an unflagged hit on an uncovered platform — the scope gap is visible inside a 'covered' component"
    - surface: "component demo pages (demos/**), component READMEs, and color values passed INTO a component's public props from consumer code"
      disposition: none
      check_state: none
      checks: []
      rationale: "ADDED POST-CONSULT (Lina W3-5) so scope[] stops implying its enumeration is complete — and unlike component source, these surfaces are NOT clean. Live instances, routed to Lina, not pruned here: demos/icon-base-demo.html:244,248,252,269,273,279,283 pass raw hex into `<icon-base color=\"#FF6B9D\">`, contradicting the component's own documented contract (Icon-Base/types.ts:257-258 documents the prop as 'inherit' | token-reference); demos/progress-pagination-demo.html:25,28,29,35,45,46,60 carry `var(--color-text-subtle, #999)`-style fallbacks — the taught silent-fallback anti-pattern, LIVE, in CSS form (and `#999` would be flagged by the existing detector today; nothing scans demos/). Component READMEs teach hex directly (Icon-Base/README.md:33 `color=\"#A855F7\"`; Badge-Count-Notification/README.md 4 hexes). THE METHOD'S CEILING, stated once and plainly: a component prop that accepts a color string is a bypass route NO file-scanning detector can ever cover, because the literal lives in consumer code — this is a permanent `none`, not an unbuilt `proposed`"
    - surface: "token definitions, theme overrides, DTCG/Figma export, and documentation examples"
      disposition: none
      check_state: none
      checks: []
      rationale: "Literals by design — a hex here is the source value or the illustration, not a bypass (the two-blade illustrative-use sub-rule)"
education:
  disposition: "ROWS-ONLY — and for this rule rows-only is ENTAILED, not merely observed, on two independent grounds either of which suffices. (1) The committed classify-only exclusion: no lint task ships in 125-B. (2) The imposter test requires an ARMED gate owning the rule's what FOR THE SURFACE THE PROSE ADDRESSES — every prose surface found teaches the rule across all platforms and all components, which is orders of magnitude wider than the one reachable detection form in scope[]; and post-consult that form is recorded `dormant` (it detects nothing real today), which makes the entailment stronger still, not weaker. No clause can be an imposter by construction. Scored KEEP with reasons, not waved through: core-goals.md:50/:53/:71 (the token-selection priority ladder — teaches the ORDER and the escalation, which no detector supplies); Component-Development-Guide.md:183 ('Never use hard-coded values' — the loudest imperative in C9 territory, scoped to component tokens where NO detector runs), :913/:1746 authoring checklists, :1598-1692 the anti-pattern section incl. the silent-fallback example (:1692 getToken('color.primary') ?? '#3B82F6') — KEEP, AND THE PRE-CONSULT REASON WAS EMPIRICALLY FALSE AND IS REPLACED (Lina W3-3 + Ada, both probed it): the draft kept it partly on the irony that 'a naive presence regex would flag it as the very violation it warns against'. The REAL detector does NOT flag it — three quotes precede the hex, so isInsideString skips it. The KEEP is therefore STRONGER, not merely unchanged: the corpus teaches the one C9 failure mode the armed check provably cannot see. (Recorded at this length because it is a claim ABOUT THE DETECTOR, which is the one thing this row is authoritative for — a wrong reason on a right disposition is still a register defect); platform-implementation-guidelines.md:410-422 (the prohibition PLUS which token family replaces each bypass — the how the gate cannot supply, and it addresses iOS/Android where nothing is armed); Web-Authoring-Standards.md:92/:235 ('There is no hard-code and move on path' + the product-token escalation), :361/:373 examples; Component-Family-Chip.md:35 family-principle statement; Test-Development-Standards.md:116/:138/:177 (the evergreen-vs-temporary worked example USES hardcoded-color detection as its specimen — deleting it would break the teaching model, the wave-2 TDS:1472 precedent), :1213/:1574 validator inventory; Token-Semantic-Structure.md:594 names-not-values guidance; family-doc hex in examples (Badge:283-284, Icon:197-222) illustrative. CROSS-RULE INTERACTION, disclosed: all 7 stemma color assertions open with `if (!webComponentSource) { console.warn(...); return; }` — a missing file makes the assertion pass VACUOUSLY (a dormancy path inside an armed check). It is currently backstopped by accident: that console.warn is not in src/__tests__/console-allowlist.json, so the vacuous path reds the lane via console-fail-root-lanes. An allowlist entry added later would silently remove the backstop. Lina takes the repair (`expect(fileExists(WEB_COMPONENT_PATH)).toBe(true)` — fail on absence rather than skip on it, removing the dependency on an unrelated check) and notes it interacts with the dormancy finding: a component whose styles moved fully into .css already makes the assertion near-vacuous WITHOUT the file being missing, so the skip path is the second-order version of a first-order problem. CLAUSES ADDED POST-CONSULT, all scored KEEP (they were swept but UNSCORED in the pre-consult draft — Lina BLOCKING W3-7): canonical/agents/lina.md:459 ('Hard-coded values — only as last resort. Requires user approval. Always flag these.'), kenya.md:406 / data.md:411 / sparky.md:434 ('Never hard-code values that have token equivalents' — carried by the iOS, Android and web-product agents, i.e. EXACTLY the platforms with zero armed coverage), ada.md:326 (the cross-agent flag protocol). All KEEP: no armed gate owns any of those platforms, so blade 1 fails for a cut. ALSO SCORED KEEP (Lina W3-9): cross-platform-vs-platform-specific-decision-framework.md:143 — 'When platform-native animations may use hard-coded values' plus four permitted cases and 'document rationale' — the ONLY clause in the entire territory that PERMITS hardcoding, and the collision any future iOS/Android arming meets on day one (already materialized as the two iOS platform-semantic-color hits in scope[]). Motion rather than color, included on the same treatment the row already gives multi-family clauses (core-goals:50/:53/:71, CDG:183, PIG:410-422). PASS 10 — THE CHECK-WORDED RE-SWEEP (the wave's most important methodological correction, Lina BLOCKING W3-8): pass 7's vocabulary was RULE-worded (hard.?cod|hex value|#[0-9a-f]{6}), but an imposter restates the CHECK and can do so without ever using the rule's noun — so 'zero imposters corpus-wide' was an UNSUPPORTED claim on a clause class the method structurally could not see. Re-swept post-consult with check-worded vocabulary (validateTokenUsage|Stemma.*[Vv]alidator|stemma.*(test|suite)|HARDCODED_COLOR); the hits it surfaced and pass 7 could never return, each scored: Test-Development-Standards.md:1482 '- [ ] Token Usage: validateTokenUsage() passes' — UNFENCED (fence parity verified even at that line; structurally the wave-2 CDS:686 shape) but scored KEEP because it sits under 'For New Components', and a new component has NO stemma suite until someone writes one — this line is the corpus's only mechanism by which coverage gets CREATED, addressing components that by definition have no gate; TDS:1490 '- [ ] Linting: All validators still pass' (For Component Updates) — KEEP, local pre-merge dev-loop guidance spanning four validators of which only the token one is partially wired, the BUILD-SYSTEM-SETUP retained class; Component-Development-Standards.md:1092/:1096/:1100 (the validator_integration block) — INSIDE a ```yaml fence (parity verified odd at :1092), a template wearing code formatting, KEEP per the wave-2 fence-fact class; TDS:1213 validator inventory, :1560/:1573/:1783/:1786/:1814 code examples, :1987-1989 command block, :1498-1512 source-file cross-reference list, Badge:466 / Chip:419 'Stemma validator tests verifying contract compliance', PIG:512, DesignerPunk-Integration-Guide.md:498-503 (a CONSUMER repo, out of territory), a-vision-of-the-future.md:346 — all KEEP (inventory, illustrative, or out of territory). **PASS 10 RESULT: ZERO IMPOSTERS. The ROWS-ONLY verdict HELD under the vocabulary that could have overturned it.** ACCURACY DEFECT found by pass 10 and routed, NOT an imposter (a distinct class worth naming — prose teaching a check that DOES NOT EXIST, the mirror image of an imposter): TDS:1987-1989 documents `npm run lint:stemma`, `lint:stemma:naming` and `lint:stemma:tokens`; `grep stemma package.json` returns NOTHING — no such script exists. Routed as open item O-9, not fixed here (TDS is a governance doc; edits ride the ballot model). Evidence: .kiro/specs/125-B-classification-map/completion/u1b/wave-3-assessment.md §4 + §6 (pass 10); consults: wave-3-consult-lina.md (1)(2)(5), wave-3-consult-ada.md §3.2."
history:
  - { date: 2026-09-13, change: "entry created (U1b wave 3, Task 5.4 step (a)) discharging the NAMED classify-only commitment from 125-B's Exclusions section (carried forward by the [ADA R1] named-inclusions requirement at Task 5.1 so a prior commitment could not silently drop). ROWS-ONLY as committed — no lint task in 125-B. MATERIAL CORRECTION to the ratified roster: the roster recorded 'none armed (a proposed-check row)'; the sweep found an ARMED, partially-scoped barrier already blocking in lane-functional-root (7 of 34 components, web TS only), which is why this row is scoped[] rather than scalar. Drafted pre-consult (disclosed process inversion); Lina consults on scope[] accuracy (the stemma-test surface is hers), Ada owns the row. Pending Peter's record-first row ratification", by: thurgood }
  - { date: 2026-09-13, change: "CONSULT FOLD — the scope[] fact base did NOT survive (Lina BLOCKING x4, Ada BLOCKING x1, all in the OVERSTATED direction the draft's own falsification clause failed to anticipate — it only anticipated understatement). Changes: (1) surface 1 rewritten to the detector's ACTUAL bite (unquoted/template-literal-body position only; isInsideString + isCommentLine skip every other form) and its check_state moved **armed -> dormant** — a STEWARD CALL neither owner proposed, recorded as an explicit EXTENSION of the register's `dormant` definition from 'empty selection' to 'selection stale relative to where the governed content lives', with a falsification clause and an open invitation to contest; `proposed` was rejected (the check is built and running). (2) iOS/Android split into their own scope entry: 'no detector at all' STRUCK as factually wrong — the detector has platform color patterns, the WIRING is missing on 68 files, with 3 current hits and the platform-semantic-color adjudication recorded as an arming precondition. (3) A fourth scope entry added for demos/**, component READMEs and prop-passed color values — including the method's permanent ceiling (a color-accepting prop is undetectable by file scanning IN PRINCIPLE). (4) boundary_call rationale softened: oklch() — the project's own source format — and named colors are undetected. (5) The CDG:1692 irony reason replaced: the real detector does NOT flag it (both owners probed), which strengthens the KEEP. (6) STEWARD CONTEST recorded against the consult: Lina's '2 unquoted color declarations in InputCheckboxBase.web.ts' are `color: 'inherit'` JS object properties — the correct count is 0 of 7, which makes her own hollow-barrier finding stronger. (7) Five canonical agent clauses (lina:459, kenya:406, data:411, sparky:434, ada:326) and the sanctioned-carve-out clause (cross-platform-vs-platform-specific-decision-framework.md:143) scored KEEP — swept but unscored pre-consult. (8) PASS 10 (check-worded vocabulary) run post-consult: ZERO imposters, ROWS-ONLY HELD. (9) Top-level check_state/checks removed per the scoped-row convention (record-first-ratification precedent). The roster correction ('none armed' was wrong) STANDS. Consults: wave-3-consult-lina.md, wave-3-consult-ada.md §3.2", by: thurgood }
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

### no-disabled-states

```yaml
rule: "DesignerPunk components MUST NOT declare or implement a disabled state — state_disabled lives under contracts.yaml `excludes:` with the standardized reason, never under `contracts:`; unavailable actions are handled by state_loading (in-flight async), validate-on-press/blur (invalid input), or not rendering the component (ruled corpus-wide with ZERO exceptions, Peter 2026-07-15, .kiro/issues/button-cta-disabled-state-adjudication.md — the U1b C10 row, discharging U2's logged philosophy-conformance candidate)"
boundary_call:
  class: functional
  rationale: "All detection forms in scope are mechanical properties of artifact bytes or observed runtime behavior — which section of a YAML file a key sits under, whether a literal appears in a source file, whether a substring appears in a built bundle, whether a property setter throws. None requires adjudication (the no-hardcoded-color pattern: 'a color literal is a DEFECT in a component implementation' — same structure, same class, and sibling-row consistency is itself worth something). The DESIGN CONVICTION — why DesignerPunk has no disabled states — is philosophy and stays education's job; the checks detect presence, never adjudicate whether a disabled state would have been right. That split is how the row survives the settled reframe ('CI validates functional/operational requirements, never ideology'): what arms is the ruled corpus invariant, not the ideology. Counter-reading recorded and answered (Lina, wave 4): `operational` ('forbidden by ruled law') misidentifies what is measured — the RULING is the law and is why the row exists; the CHECK measures artifacts. STATED PLAINLY so a future arming decision inherits no false reach (the wave-3 discipline): mechanical detectability is a STRICT SUBSET of the rule's what — the prop guard misses isDisabled; the contracts guards read one YAML spelling of three; the CSS bundle guard sees :disabled|--disabled but not a .foo--inactive class doing disabled work; nothing scans iOS/Android for 30 of 34 components"
verification:
  disposition: scoped
  owner: lina
  scope:
    - surface: "Input-Text-Base / -Email / -Password / -PhoneNumber (4 of 34) — contracts.yaml exclusion presence + platform implementations, the deepest coverage in the corpus"
      disposition: barrier
      check_state: armed
      checks: ["cross-platform-consistency.test.ts:529 'all form input components should exclude disabled state per design philosophy' (contracts-presence, all 4); form-inputs-contracts.test.ts:370-375 contracts-presence duplicate (Input-Text-Base ONLY — const component at :235; the 4-component contracts coverage rests on the cross-platform suite alone, a single point of failure recorded as such); form-inputs-contracts.test.ts:383-402 DISABLED_EXCLUSION_GUARD_PATTERNS raw-source scan over ALL THREE platform implementations of all 4 (isDisabled, disabledBlend, aria-disabled, cursor:\\s*not-allowed, \\.disabled\\( — the last added per the iOS readOnly B-prime ruling, Peter 2026-07-15); :448-457 iOS .disabled( absence; :526 Android enabled\\s*=\\s*false absence (Base only). All selected by jest --listTests into lane-functional-root (required), verified by execution 2026-09-17"]
      rationale: "Contracts grain + implementation grain + all three platforms — but note the contracts assertion matches the literal string 'excludes', which two of the corpus's three exclusion-key spellings do not contain (the W4-2 defect; a form input adopting a drifted spelling false-REDs while philosophically compliant)"
    - surface: "Button-CTA — the one component that ever violated the philosophy, guarded against reintroduction by its own test block"
      disposition: barrier
      check_state: armed
      checks: ["ButtonCTA.test.ts:288-331 describe('No Disabled State (philosophy exclusion)'): contracts SECTION-SPLIT check (:294-306 — state_disabled absent above ^excludes:, present below; structurally STRONGER than the form-inputs includes() check), API-surface (:308-313 — no disabled in observedAttributes, no disabled property), runtime ignore-silently (:315-331 — consumer-set disabled attribute stripped, press still fires). In lane-functional-root, verified by execution"]
      rationale: "The reintroduction guard, authored at the 2026-07-15 removal"
    - surface: "Button-VerticalList-Item — throw RETIRED to the canonical guard shape (parity ballot, 2026-09-19)"
      disposition: barrier
      check_state: armed
      checks: ["ButtonVerticalListItem .unit/.integration/.failLoudly suites, REWRITTEN at the parity ruling to the Button-CTA canonical shape: 'disabled' not in observedAttributes, no disabled property exposed, consumer-set attribute leaves the control fully functional"]
      rationale: "PARITY RESOLVED (Peter, 2026-09-19, ballot .kiro/docs/ballots/2026-09-19-disabled-input-parity.md — ruling (d), ignore-at-runtime/surface-at-dev): the architectural divergence this entry originally recorded is CLOSED — BVLI's ~30-line bespoke throw (the corpus's ONLY executable disabled-handling code, per the decision package's corrected fact base) retired; runtime behavior is uniformly ignore-inert corpus-wide. Decisive facts in the ballot: the divergence was one-sided (33 default-by-absence + 1 outlier) and web-only; the throw's authority was a tasks.md bullet vs the ignore's 2026-07-15 ruling; and the throw NEVER enforced on the markup path — verified by browser EXECUTION at the sitting (setAttribute returns normally to the caller; only the imperative property setter threw). The TBCV:321 contradiction DISSOLVED with the throw's retirement — the clause stands as written, plus one D2 dev-warn clause"
    - surface: "Button-Icon, Input-Checkbox-Base, Input-Radio-Base — types.ts prop-absence guards (NARROW)"
      disposition: barrier
      check_state: armed
      checks: ["ButtonIcon.stemma.test.ts:362, InputCheckboxBase.stemma.test.ts:477, InputRadioBase.stemma.test.ts:468 — it('should not have disabled prop (by design)'): /disabled\\s*[?:]/ against types.ts source. Bite probed (synthetic append): catches disabled?: boolean; MISSES isDisabled?: boolean and observedAttributes registration"]
      rationale: "types.ts-only — nothing about contracts.yaml, observedAttributes, runtime, or CSS. VACUOUS-SKIP PATH REPAIRED (parity batch PR, 2026-09-19): the three cited assertions now FAIL on a missing types.ts (expect(fileExists).toBe(true)) instead of console.warn-and-return — the accidental console-fail backstop is no longer load-bearing for them. Honest residual, recorded at the repair: OTHER tests in the same describe blocks share the identical skip pattern and were deliberately NOT silently expanded into scope — flagged in the batch charter as a follow-up"
    - surface: "ALL web components' shipped CSS — corpus-wide, build-artifact grain (the only corpus-wide guard)"
      disposition: barrier
      check_state: armed
      checks: ["css-bundling.test.ts:186-192 'should not contain disabled state styles (no-disabled-states philosophy)' — expect(bundleContent).not.toMatch(/:disabled|--disabled/) against the built browser ESM bundle, i.e. the shipped CSS of EVERY web component in the browser entry, not a named component list. armed_at omitted deliberately (pr-gate default is correct — it is a lane-functional-root test), but the arming DEPENDS ON THE LANE'S BUILD STEP: lane-timing.yml:182-183 runs npm run build (includes build:browser) BEFORE npm test at :209. Its beforeAll THROWS if dist/browser is absent — it fails loudly rather than going silently dormant if the build step is ever removed, the design property that is the OPPOSITE of the no-hardcoded-color dormancy failure mode, recorded because it is worth copying"]
      rationale: "Sees :disabled pseudo-selectors and --disabled custom properties in output CSS; does not see a renamed class doing disabled work. EDUCATION-ABSENCE (Lina, wave 4): governance/browser-distribution-guide.md — the doc that owns this bundle — contains ZERO disabled hits; the corpus's only corpus-wide guard is documented nowhere, so an author who reds it gets a regex failure against a bundle and no route to the rule. Friction-class, recorded not actioned"
    - surface: "the remaining 25 components at contract / API / runtime grain; iOS + Android implementations for all but the 4 Input-Texts; token/blend layer"
      disposition: none
      check_state: proposed
      checks: []
      rationale: "The real gap. A new state_disabled contract here is SELECTED by wcag-required-refs and forced to carry a valid WCAG ref — a format check, not a philosophy check, but deliberately recorded as the REINTRODUCTION BACKSTOP (cross-referenced on that row). TOKEN/BLEND (corrected at wave 4, Ada): blend.disabledDesaturate + the three platform wrappers are DEPRECATED (2026-07-15) but still EMITTED — committed docs/tokens.css:805, three platform blend utility APIs, and DTCG/Figma export by default (DTCGGeneratorConfig.ts:41 includeDeprecated: true; deprecation metadata correctly attached; the validator no longer suggests it) — a consumer can still CONSUME disabled-state styling from shipped output today; closes at the next @3fn/core major, not by a gate. COUNTER-PULLING GATE DEFECT (Lina MISS-4) — REPAIRED at the parity batch PR (2026-09-19): the BlendTokenUsageValidation disabled-blend requirements on Button-CTA and Input-Text-Base (:274/:390/:704, green only via two verified accidents, the mirror image of a phantom-gate claim) retired to explanatory comments per the InteractionStateAudit calculator-capability-only model. Honest residual: Button-CTA's iOS (:314) and Android (:348) per-platform siblings carry the same requirement, were NOT cited in the charter item, and were deliberately not silently scope-expanded — flagged in the batch charter as a follow-up. PROPOSED MECHANISM for this scope (Peter's U2 instinct, now with an empty allowlist): extend the exclusion + banned-pattern guard corpus-wide. BOTH NAMED PRECONDITIONS NOW MET (2026-09-19): (1) the W4-2 vocabulary normalization LANDED (#169 — all five drifted components' exclusions verified serving live in the MCP post-merge); (2) the parity adjudication RULED (ballot 2026-09-19, option (d)) — the guard is WRITABLE as one uniform assertion ('disabled' not in observedAttributes AND no disabled accessor, across all web components), WITH ONE NAMED CARVE-OUT the guard must encode rather than red on: Input-Radio-Base observes 'disabled' SOLELY to neutralize it (the ruling's own D1 — form-associated element; attribute stripped in attributeChangedCallback, formDisabledCallback no-op, form value proven retained by test — closing the H1 silent-form-data-loss hazard). Building the guard remains future arming work (the enforcement-spec candidate's territory), now unblocked. COVERAGE, corrected post-consult: ~26% of components at component grain (9 of 34) plus the corpus-wide web-CSS surface — assembled by FOUR independent historical origins with zero coordination (Spec 066 form-input cleanup; the Button-CTA removal's test flip; a stemma-scaffold template; a 2025-era BVLI accessibility requirement) — no scope decision anyone recorded, which is the 5.6 finding"
education:
  disposition: "KEEP everywhere — ZERO imposters across rule-worded (S2, 60 hits, every hit scored), check-worded (S3 + Lina's L9 pass over the NEWLY-FOUND checks' vocabulary — css-bundling|failLoudly|disabled prop (by design)|BlendTokenUsageValidation|observedAttributes — vocabulary the draft's sweeps could not have returned), and zero-live-contract (S1) passes. ROWS-ONLY HELD post-consult — by SURVIVED SCRUTINY, not entailment (Lina's correction: the draft's 'entailed' reasoning rested on a 5-component armed scope that does not exist; with the scope corrected to 9 + corpus-wide CSS, blade 1 newly applied to family-doc clauses and they were RE-SCORED, all KEEP). The scored set: CDG:501-512 (the loudest imperative + the ALTERNATIVES — state_loading / validate-on-press / don't render — which no presence check supplies; also the only source of the standardized excludes: YAML block, now load-bearing for the W4-2 normalization); Component-Templates:751-781/:1083 (the reference implementation — how coverage gets CREATED for new components, the TDS:1482 class); TBCV:305-346 KEEP with the REASON REPLACED (Lina — the draft's 'no gate exists for 29 components' premise fell; the KEEP rests on four things no armed check supplies: the standardized reason: string (:317 — no check asserts the wording), the iOS/Android checklist rows (armed on 4 of 34), the Philosophy Alternatives block (:343-345 — the clearest blade-2 pass in the wave), and the provenance paragraph (:307); a wrong reason on a right disposition is still a register defect — the wave-3 CDG:1692 lesson, applied to ourselves); EXCEPT TBCV:321, scored at wave 4 as a CONTRADICTION not an imposter (it instructed removing the observedAttributes entry BVLI's then-armed check required) — DISSOLVED 2026-09-19 by the parity ruling retiring the throw: the clause stands as written, gained a provenance note + one D2 dev-warn clause (parity batch PR); family docs re-scored against the corrected scope: CFB:34 KEEP (characteristics bullet — describes what the family HAS, no check states the positive list), CFFI:118 KEEP (carries the ruling citation + the alternative), Component-Family-Chip:39 KEEP (zero Chip components guarded, verified), CIS:90/:155/:624 + Component-Family-Navigation:35/:117/:146 + stemma-system-principles:164/:558/:580/:714 (illustrative) + CSR:106/:162 (concept-catalog data — state_disabled must remain NAMEABLE for the exclusion to be expressible) + CDS:322-324 (fence-fact) all KEEP; PTTD:433 KEEP (historical precedent citation); Token-Family-Blend:31/:72/:171/:431-433 KEEP — already reconciled, THE MODEL. CONTRADICTION-CLASS DRIFT routed to owners, NOT cut here (the wave stays rows-only; the wave-2 #132 precedent does not fire — no prune, so no compound-exposure window to sequence against, stated explicitly per Stacy; the owner fix PRs are ORDINARY observed PRs when they land): (1) platform-implementation-guidelines:169 — the a11y-mapping row whose THREE cells were ALL gate-banned literals, the strongest contradiction case the campaign produced — REWRITE LANDED at the parity batch PR (2026-09-19): the replacement row (unavailable action -> do not render, + ruling citation and alternatives) applied verbatim as chartered; verification obligation DISCHARGED (post-rewrite re-sweep returned prohibition-framed content only); (2) Token-Family-Opacity — a full disabled-states section authored PRE-philosophy and never reconciled, whose ✅ CORRECT example (:451-468) instructs aria-disabled (a banned pattern), and whose CONTRADICTION SITS IN THE MCP DISCOVERY LAYER (frontmatter description :5 — find_docs routes 'disabled states' queries INTO the ✅ example; Token-Quick-Reference:44/:289 compound the funnel) — Ada RULED REWRITE on the Blend model, chartered as its own issue (14 hits enumerated, repair scope in the charter; the tokens themselves are NOT deprecated) — VERIFICATION OBLIGATION stated per Stacy B4: NO gate verifies token-doc territory; verification is the charter's own post-rewrite re-sweep + discovery-path re-query, and whether a reconciliation-rewrite of pre-philosophy content requires wave-(b) machinery is PUT TO PETER on the charter (proceeds on the repair reading unless he rules otherwise). EDUCATION-ABSENCE, recorded not actioned: the philosophy lives entirely in governance/ — zero hits in .kiro/steering/ or canonical/agents/ (including Lina's own prompt); a scaffolding agent meets the rule only if it opens CDG or Component-Templates; plus the browser-distribution-guide gap (scope 5). Evidence: wave-4-assessment.md §2 + §7 + §12; consults: wave-4-consult-lina.md (all sections), wave-4-consult-ada.md §3-4."
history:
  - { date: 2026-09-17, change: "entry created (U1b wave 4, Task 5.5 step (a)) discharging U2's logged philosophy-conformance candidate (task-4-parent-completion.md item 3 — 'red on presence of a disabled-state declaration outside an allowlist, Peter's instinct'). Two facts moved since the logging: the allowlist is now EMPTY (Button-CTA adjudication RULED REMOVE 2026-07-15; zero live state_disabled contracts, verified mechanically) and PARTIAL ARMING already happened. MATERIAL CORRECTION to the ratified roster (the fourth consecutive under-recording of arming): campaign-plan.md C10 recorded 'none armed (candidate row)'; reality at wave time was NINE guarded components + a corpus-wide CSS-bundle guard. Drafted pre-consult at 5 components (disclosed process inversion); the owner consult FALSIFIED the armed scope in the UNDERSTATED direction (Lina BLOCKING x4 — the wave-3 falsification ran the other way, so the campaign has now produced both error signs) and the scope[] was rebuilt 3 -> 6 entries. Ownership ACCEPTED by Lina; boundary class functional CONCURRED with her instruments-narrower-than-the-rule sharpening; entry-id verified unique + non-substring by her own script against all 20 existing ids. Repairs and adjudications routed (Lina's batch charter: W4-2 normalization first, vacuous-skip paths, the MISS-4 counter-pulling assertion, the wcag test comment, PIG:169 + TBCV:321 rewrites behind the parity ballot; Ada's Opacity reconciliation charter). Pending Peter's record-first row ratification at the wave-4 PR's merge. Consults: wave-4-consult-lina.md, wave-4-consult-ada.md; evidence: wave-4-assessment.md §2 + §12", by: thurgood }
  - { date: 2026-09-19, change: "PARITY ADJUDICATION RULED + REPAIR BATCH LANDED (the PR carrying this entry): Peter ruled OPTION (d) — ignore-at-runtime, surface-at-dev — on Lina's decision package at the 2026-09-19 sitting (ballot .kiro/docs/ballots/2026-09-19-disabled-input-parity.md, RATIFIED record-first; the package CORRECTED the chartered question: one-sided divergence, web-only, throw-authority a tasks.md bullet, and the markup-path uncatchability claim VERIFIED BY BROWSER EXECUTION at the sitting before ruling). Row changes: scope 3 rewritten (BVLI throw + 7 test cases retired to the canonical guard shape); scope 4 vacuous-skip repaired (fail-on-absence); scope 6 BOTH preconditions met (W4-2 normalization #169; parity ruled) + the D1 Input-Radio-Base neutralization carve-out named for the future guard + MISS-4 counter-pulling assertions retired; education: TBCV:321 contradiction dissolved (stands + D2 clause), PIG:169 rewrite landed with its verification discharged. H1 (form-associated silent data loss) CLOSED by D1; H2 (consumer CSS on the host attribute) recorded in the ballot, deliberately not actioned. Honest residuals flagged in the batch charter, not silently expanded: sibling vacuous-skip tests, Button-CTA iOS/Android blend-assertion siblings, the strict-key parser hardening, the D2 scaffold-template touchpoint. Charter: .kiro/issues/2026-09-17-disabled-guard-corpus-repairs.md (items 1-7 + D1 now complete)", by: thurgood }
```

### consumer-guard-lane

```yaml
rule: "The published package SHALL load and function in a faithful consumer repo — consumer-config subprocess guard (ESM + CJS fixtures), dynamic-import smoke, scoped web-source lint, MCP boot/smoke and browser boot/smoke, run against BUILT bundles (the Spec 118 guard set)"
boundary_call:
  class: functional
  rationale: "Whether the built package loads and boots in a consumer-shaped environment is a mechanical property of the artifacts — subprocess exit codes, boot sentinels, customElements registration; no judgment"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["Consumer Guard / consumer-guard (.github/workflows/consumer-guard.yml — Spec 118 Tasks 3.1/3.2/4.1/4.2/5.1a/5.1b; required context, in verify-gate-registration.sh EXPECTED_CONTEXTS)"]
education:
  disposition: "RECORD-ONLY entry (the wcag-format-validity Req 12.7 / contract-platforms-specified class): created by the 5.6 closeout audit — this check was armed, blocking, required, and in NO register row (an armed-but-unregistered gap, the audit's target class). Education layer NOT swept this pass; the territory (consumer onboarding, module-resolution, distribution guides) sweeps with any future wave touching its surfaces. Known adjacent teaching, cited not scored: the Module-Resolution Contract (rosetta-system-architecture) and DesignerPunk-Integration-Guide govern the same territory descriptively."
history:
  - { date: 2026-09-18, change: "entry created (U1b 5.6 closeout, §5.6 armed-but-unregistered audit — the wave-2 checklist item): 18 live required contexts mapped to rows, TWO gaps found (this + package-name-scope-drift), both rowed record-only, ratified at the closeout PR's merge. Evidence: completion/u1b/campaign-closeout.md §6", by: thurgood }
```

### package-name-scope-drift

```yaml
rule: "Every package-scope reference (.kiro/steering/, src/, product-template/, .kiro/agents/, dist/) SHALL match package.json's name scope — no stale-scope references survive a scope change (Spec 101 publish-readiness)"
boundary_call:
  class: functional
  rationale: "String-match of scope references against package.json's name field — machine-checkable by construction (scripts/check-package-name-drift.js)"
verification:
  disposition: barrier
  owner: thurgood
  check_state: armed
  checks: ["Check package name drift (.github/workflows/package-name-drift.yml -> scripts/check-package-name-drift.js — the repo's OLDEST CI check, Spec 101; required context, in verify-gate-registration.sh EXPECTED_CONTEXTS)"]
education:
  disposition: "RECORD-ONLY entry (same class and same audit as consumer-guard-lane). Education layer NOT swept this pass; territory sweeps with any future wave. The npm-publish playbook knowledge (scope-mapping pitfall) is adjacent teaching, out of the served corpus."
history:
  - { date: 2026-09-18, change: "entry created (U1b 5.6 closeout, §5.6 armed-but-unregistered audit) — see consumer-guard-lane's entry; the two gaps were found and rowed together. Evidence: completion/u1b/campaign-closeout.md §6", by: thurgood }
```

### completion-criteria-parity

```yaml
rule: "A parent completion doc SHALL reproduce every success criterion its tasks.md defines for that parent — verbatim, exact set, with a Status mark and a non-empty Evidence cell per row, the forced-negative line, and the Additional verification section where the parent declares Primary Artifacts or a merge gate"
boundary_call:
  class: functional
  rationale: "String-equality of a completion-doc cell against a tasks.md bullet after four fixed normalizations is mechanical by construction — no judgment enters the predicate. The dimensions that DO require judgment (is the ✅ true, is the evidence real) are deliberately a different row: completion-verification-honesty"
verification:
  disposition: barrier
  owner: thurgood
  check_state: proposed
  checks: ["completion-criteria-parity (.github/workflows/completion-criteria-parity.yml -> npm run check:completion-criteria-parity; context name FIXED at authoring; built by Spec 127 U2 and introduced NON-REQUIRED)"]
education:
  disposition: "AUTHOR, do not prune — this rule has no prose predecessor to prune; it has a prose DEFECT to repair. Three surfaces are authored in the same change as this row: completion-documentation-guide § 'Parent Success-Criteria Fidelity' (the full rule, its normalization list, the mutation classes, the honest-reach statement); Process-Spec-Planning Tier 3 + the replacement worked example (the measured template defect — M4 = 0/22 because the standard offered no failure vocabulary outside the Blocked Task format); Task-Completion-Protocol's two parent sequences (POINTER ONLY, per the Wave-1 prune-scar constraint). RE-ASSESS at the first claims pass after arming: if the check keeps biting, the docs may be teaching the wrong thing — that is the return edge, and it runs on the EDUCATION route."
history:
  - { date: 2026-09-19, change: "entry created at the Spec 127 law ballot (.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md). check_state: proposed — the checker is BUILT by U2 and lands NON-REQUIRED; the required flip is Q2's decision, guarded by (i) release-prep start and (ii) convention shipped AND Tier-3 worked example fixed AND N >= 5 in-scope parents completed with M2 measured BY AUDIT, not by the checker. owner: thurgood resolves friction (a) on the register's own schema ground — `owner` fuses decision and check, and for an armed barrier the decision IS the check, so the field records who keeps the instrument true (settle ballot § 11.3). The uncheckable residual attaches to completion-verification-honesty (owner: stacy), the row whose entire purpose is that no check owns it", by: thurgood }
  - { date: 2026-09-19, change: "GATE-BITE OUTSTANDING, recorded at row creation rather than after the fact: Req 6.4 requires the check be proven RED on a throwaway PR with a deliberately defective completion doc before any required flip. That proof does not exist at this row's creation and is NOT claimed. It rides with the arming — proven at the flip, cited on this row in the same recorded change that adds the context to verify-gate-registration.sh's EXPECTED_CONTEXTS (count-assert included). Until then this row asserts a proposed check with no bite proof, stated as such", by: thurgood }
  - { date: 2026-09-19, change: "FIRST-INSTANCE PRECEDENT, named so a later mechanical count is not silently wrong (Stacy A-5): this is the register's only `proposed` row carrying a NON-EMPTY `checks[]` — verified 1 of 15 proposed rows at creation. Lawful under a stated condition and only under it: the CI check-context name is fixed at authoring (Req 6.1 requires it be fixed AND cited on the row, and no other schema field exists to hold it), and the string carries its own not-yet-required qualifier in-line. THE CONSEQUENCE, stated rather than left to be discovered: any future query that counts armed or required checks by counting populated `checks[]` will over-count by this row. Count `check_state: armed` instead — `checks[]` records identity, not arming", by: thurgood }
```

### promised-artifact-exists

```yaml
rule: "Every path a parent declares under **Primary Artifacts:** SHALL exist at the merge of the PR that ticks that parent — or be declared deferred in the fixed form `Artifact deferred: <path> -> <unit>` (the law TEACHES the arrow as `->` rendered as a right-arrow glyph; the ASCII form is what is ACCEPTED at parse and is used here for YAML safety — cite the guide, not this line, for the taught spelling)"
boundary_call:
  class: functional
  rationale: "Path existence at a named commit is a filesystem fact. The check's whole design keeps it factual: it is delta-scoped to the ticking PR, it strips annotation suffixes by rule, and every case it cannot decide is EMITTED rather than silently skipped"
verification:
  disposition: barrier
  owner: stacy
  check_state: proposed
  checks: []
education:
  disposition: "AUTHOR the input-side convention, which ships with this row's law: the fixed deferral form `Artifact deferred: <path> -> <unit>` is taught in completion-documentation-guide § 'Parent Success-Criteria Fidelity' (Additional verification), and the authoring note that a Primary-Artifacts line bundling platforms does NOT decompose (it has its own remedy in the artifact forced-negative line) is taught beside it. Nothing is pruned — the promised-artifact dimension had no prose predecessor at all, which is why it escaped twice to consumers."
history:
  - { date: 2026-09-19, change: "entry created at the Spec 127 law ballot. SCOPE, as ruled: DELTA-SCOPED — fires on the PR that ticks the parent, against that parent's declared paths only; later file moves are repository evolution, not claims. Parsing strips annotation suffixes and EMITS its exclusions (`skipped — not a path`) rather than silently skipping; an AV-declared deferral in the fixed form is an EMITTED EXCLUSION, not a red (mechanically decidable because the form is fixed — B-6 ruled option 1). VERDICT PHRASING IS NORMATIVE: 'task text and reality disagree', never 'work was not done'. NAMED READER for the emissions: the CLOSEOUT claims pass reads this check's emission lines for the closing spec — once the check is built; UNTIL THEN THE PASS OWNS PROMISED-ARTIFACT GAPS AS JUDGMENT. The PR summary line carries the exclusion count", by: thurgood }
  - { date: 2026-09-19, change: "OWNER RULED AT THIS BALLOT — Peter, 2026-09-19, option (B), and the openness is recorded as openness: this row was split out of the settle ballot's three-row enumeration, so its owner was genuinely open rather than silently defaulted. The drafter surfaced a fork rather than picking one, being a named party to the cut. RULED: `owner: stacy` NOW — the honest record of the present. The row is `proposed` and unbuilt; the dimension is held today by Stacy's claims pass as judgment (Req 5.3's interim clause), and both sibling rows created in this same ballot carry `owner: stacy` while unbuilt. PRE-COMMITTED TRANSITION, decided now so it is a transition and not a later argument: WHEN the check is built and wired, the owner flips to `thurgood` in ONE row edit with its own dated history entry, on the instrument-owner ground § 11.3 established for the parity row (`owner` fuses decision and check; for an armed barrier the decision IS the check, so the field records who keeps the instrument true). THE FLIP IS REPRESENTATIONAL, NOT CLASSIFICATORY — no disposition, boundary call, check_state or education disposition changes with it, and a later reader must not read the handover as a reclassification. RECORDED ALTERNATIVE (option A, argued by the drafter and not taken): assign `thurgood` from creation, on the ground that the row's destination is a mechanical PR-gate instrument; its stated residual was that this records a FUTURE state on a row that is proposed today, naming an owner of an instrument that does not exist while the real holder appears only in prose", by: thurgood }
```

### promised-artifact-shipped

```yaml
rule: "An artifact a task text annotates as `(modified)` SHALL appear in that task's shipped diff — the Spec 112 task-3.3 signature, where a tested utility is created and the seam it was meant to modify is never touched"
boundary_call:
  class: functional
  rationale: "Diff membership is mechanical. The reason this row is deferred is not classification doubt — it is that the check's natural firing grain is wrong at PR time, which is a scheduling property, not a boundary one"
verification:
  disposition: barrier
  owner: stacy
  check_state: proposed
  checks: []
education:
  disposition: "NOTHING AUTHORED, NOTHING PRUNED at this ballot — the row is registered so the dimension is visible as unowned-by-machinery rather than invisible. The teaching this dimension needs already lands on completion-criteria-parity's surfaces (the AV section's artifact forced-negative line and the fixed deferral form). RE-ASSESS if the dry run promotes the row to built."
history:
  - { date: 2026-09-19, change: "entry created at the Spec 127 law ballot; build DEFERRED. MUST NOT FIRE PER-PR (ruled): a later unit can legitimately deliver a prior unit's promised artifact, so a per-PR grain would red-light lawful sequencing. Its events are CLOSEOUT and RELEASE — never the PR gate. owner: stacy, ratified at settle ballot § 11.2 and confirmed in her § 16.2 duty table. PROMOTION EVIDENCE, recorded honestly: a retrospective DRY RUN over merged history — a PROCEDURE, NOT A FIRING TRIGGER. That distinction is acceptable only because nothing here is armed; if this row ever moves toward `armed`, the dry run must be replaced by a real trigger with a real event, and this note is the reason why", by: thurgood }
```

### completion-verification-honesty

```yaml
rule: "A completion claim SHALL be true — the ✅ reflects a check actually performed against shipped source, and the Evidence cell points at something real"
boundary_call:
  class: ideological
  rationale: "Whether a mark is HONEST is not decidable from any artifact a check can read. A false ✅ with a plausible path is green to every mechanical predicate that exists or could exist here; the dimension is held by practice, culture and audit, or it is not held at all. CARRIED VERBATIM, AS RULED (Req 5.5): Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent."
verification:
  disposition: none
  owner: stacy
  check_state: none
  checks: []
education:
  disposition: "AUTHOR the honest-reach statement, and never author anything that implies mechanization. completion-documentation-guide § 'Parent Success-Criteria Fidelity' carries the instrument's limits explicitly: a plausible-looking Evidence path is green regardless of truth; for iOS and Android 'command + result' evidence is trust-the-reported-result for any verifier in this environment (charter: .kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md); artifact truth is owned by the claims pass today. PRUNE NOTHING and ADD NO CHECK — ever. M3 (evidence quality), M4 (forced-negative adoption) and M5 (failure markers) are AUDIT output, produced by claims passes, and no check owns them."
history:
  - { date: 2026-09-19, change: "entry created at the Spec 127 law ballot. NO CHECK OWNS THIS ROW — EVER; that is the row's purpose, not a gap in it. The ruled sentence is carried verbatim in boundary_call.rationale above. Recorded with it, because a barrier's own metric is trivially 100% once armed: M2 measures nothing after arming, and the informative metrics are exactly the ones no check owns", by: thurgood }
```

### parent-completion-docs-present

```yaml
rule: "Every ticked parent task SHALL have a completion doc and a summary doc — the Spec 112 F6 class, where four required documents were simply never written"
boundary_call:
  class: functional
  rationale: "File existence at a path family is mechanical. It is registered `proposed` rather than built because its naive form has a KNOWN false-positive class, stated below — and a check that red-lights lawful behaviour on day one is how a barrier earns distrust in its first week"
verification:
  disposition: barrier
  owner: stacy
  check_state: proposed
  checks: []
education:
  disposition: "KEEP the existing teaching, which is already correct and already single-homed: completion-documentation-guide § 'When to Create Each Document' (subtask = detailed doc; parent = detailed doc AND summary doc) and Task-Completion-Protocol's two parent sequences. NOTHING NEW IS AUTHORED for this row — the docs say the right thing; what is missing is a detector, not a lesson."
history:
  - { date: 2026-09-19, change: "entry created at the Spec 127 law ballot; build and arming DEFERRED. owner: stacy WHILE UNBUILT/IDEOLOGICAL (settle ballot § 11.2's conditional, carried at strength) — the doc-presence dimension is claims-pass judgment until a check exists to own it. KNOWN FALSE-POSITIVE CLASS, stated at creation rather than discovered at arming: completion docs land AT PARENT COMPLETION, which under the coherent-unit rule can be BEFORE the unit's PR opens — so a naive `test -f` at PR time reds a parent that is behaving exactly as the law requires. INTERIM: the parity checker names this surface explicitly. A ticked parent with no completion doc is neither red nor silent there; it EMITS `completion doc not found — not evaluated (doc presence is parent-completion-docs-present's surface, proposed/unbuilt; interim owner: the claims pass)` — red would build this row by the back door, silence would be the forbidden dormancy, and the named emission is the honest division of labour. The CLOSEOUT pass reads those emissions", by: thurgood }
```

### owned-artifact-authorship

```yaml
rule: "A decide-grade artifact owned by an agent SHALL be authored in that agent's seat — the orchestration loop briefs, relays and verifies, and does not author in an owner's seat"
boundary_call:
  class: ideological
  rationale: "NO CHECK CAN VERIFY AUTHORSHIP FROM THE ARTIFACT. Nothing in a requirements.md, a design.md or a ballot distinguishes owner-authored from loop-authored text; the `Author:`/`Drafted by:` field is self-attested, and self-attestation is not verification (Spec 127's founding finding). PRECISION CLAUSE, stated so the row is not read as wider than it is: the undecidability is about the ARTIFACT. An ACT-TIME aid — something that surfaces the ownership question at the moment of writing rather than inferring authorship afterwards — remains possible and is UNPROPOSED here; this row forecloses artifact-side detection, not future act-time design. Precedent for the shape: completion-verification-honesty, an undetectable truth-property of an artifact held by practice and audit rather than by any check. CLASSIFICATION STRENGTHENED BY AN ADVERSE ADJUDICATION (F15, 2026-09-19): asked to take a standing authorship dimension onto the claims-pass template, Stacy DECLINED and went further than this row had — she holds that NO JUDGMENT can own this surface defensibly, not merely that no check can, because an idiom finding is unfalsifiable by the accused, carries no repair path, and sitting beside counted findings teaches readers to discount the counted ones. She did not oppose this row ('exactly what the register is for'). An ideological call made by its own author is cheap; the same call reached independently by the seat that would have inherited the judgment is not"
verification:
  disposition: none
  owner: thurgood
  check_state: none
  checks: []
education:
  disposition: "ONE HOME, single-homed deliberately: `.kiro/steering/Agent-Directory.md` § 'Primary Agent (Orchestrator)' — second person, always-loaded, stating the loop's own scope and artifacts and routing everything else to an owner. Every other surface POINTS or stays silent; `start-up-tasks.md` #6 carries only the whether-to-delegate trigger and deliberately does NOT restate ownership. THE ROW'S MOST IMPORTANT CONTENT IS ITS OWN LIMITS, and the education must teach them: the only available detector is a CLAIMS-PASS IDIOM OBSERVATION — an auditor noticing that an artifact's idiom does not match its declared author — which is subjective, per-spec, at CLOSEOUT, and AFTER THE FACT. It is weak. A reader who treats this row's existence as coverage has made the error the row exists to prevent. PRUNE nothing and ADD no third surface: the accreted alternatives (a tiering-rule bullet, a path/glob-keyed routing rule, an `Author:` template field, a mechanical hook) were each tested against the imposter standard at the 2026-09-19 reassessment and dropped."
history:
  - { date: 2026-09-19, change: "entry created by the orchestrator-role reassessment (.kiro/docs/ballots/2026-09-19-orchestrator-role-and-row.md). ORIGIN: one incident — Spec 127's formalization docs were authored by the main session in Thurgood's seat, with the format difference observed by Peter. THE DIAGNOSIS THAT MATTERS, recorded because it disproved the obvious remedy: Agent-Directory ALREADY assigned spec formalization to Thurgood in three places (:56 Owns, :60 the Q5 charter cut ratified 2026-09-17, :126 routing table), all Layer-1 and always-loaded, and it did not bind — so AVAILABILITY WAS NEVER THE FAILURE and adding more always-loaded text treats a disproven cause. What was missing was a statement of the ORCHESTRATOR'S OWN scope; the Agent-Directory claimed to cover 'all DesignerPunk AI agents' and omitted the one agent that directs the other eight. F11 RULED BY PETER: the section ships on the COMPLETENESS ground (a verified defect in a doc on its own stated terms), NOT on the hypothesis that second-person identity binds better than third-person ownership — that claim is recorded AS A HYPOTHESIS and is falsifiable: recurrence of seat-drift after this lands is evidence, routed to the claims-pass idiom dimension. NO ESCALATION IS PRE-COMMITTED, because there is nothing artifact-side to escalate to; proposing one would be the dishonesty this row is about. F15 adjudication: declined at Stacy's seat, 2026-09-19 — record: the standards-package ballot's annex (PR #185), both on main after both PRs merge. UNCOVERED RESIDUAL, recorded rather than absorbed: the sharpest case — owner-named work carrying NO delegated-tier note at all — is silent on every surface either seat owns (a missing note is not a false note), and both sessions hold that an idiom observation there would manufacture appearance-of-coverage, which is worse than the stated gap", by: thurgood }
```

### delegated-tier-capture

```yaml
rule: "Every parent completion doc SHALL carry exactly one fixed-form `**Delegated-tier**:` line — `plan held`, or the planned→actual divergence form with its class — so that silence about WHO EXECUTED is not a recordable state"
boundary_call:
  class: functional
  rationale: "THE SPLIT IS THE CLASSIFICATION'S SUBSTANCE: line PRESENCE and FORM are mechanically decidable (one anchored regex over the doc's header block — the grammar is fixed in the guide); line TRUTH is not — a false `plan held` is artifact-undetectable, and that residue belongs to owned-artifact-authorship (ideological, no check ever), not to this row. This row is the FALSIFIABLE PERIMETER around that ideological surface: it converts the F15 residual's passive half (omission — a missing note is not a false note) into visible non-compliance. TWO residual paths stay open, stated at the ballot's § 4: deliberate written falsification (owned-artifact-authorship's), and the truthful-`plan held`-against-an-accommodating-plan path — planning-time, NAMED AND UNOWNED by deliberate decision (a quietly widened seat is the F15 error re-run). ORIGIN: the F15 adjudication (2026-09-19) — Stacy declined the unfalsifiable idiom dimension and named delegated-tier accuracy as the under-used falsifiable surface inside her cut; Peter directed the duty drafted the same session"
verification:
  disposition: audit
  owner: stacy
  check_state: none
  checks: []
  # The audit: every claims pass verifies presence+form on every parent doc in the population
  # (missing/free-prose = a FINDING on the authoring agent), verifies divergence forms against
  # tasks.md execution routes + the planned `**Agent**:` stamp + git evidence, and spot-checks
  # `plan held` lines at the pass's stated sample fraction. MECHANIZATION NAMED AND UNPROPOSED
  # (the S-package precedent): completion-criteria-parity already parses every parent doc; a
  # missing/malformed-line EMISSION (never a red — the doc-not-found shape) is cheap and remains
  # a separate, registered proposal with a Stacy fixture if wanted.
education:
  disposition: "Law home: completion-documentation-guide § 'The delegated-tier line — unconditional' (forms, grammar, rationale, honest reach). Pointer-grade: Task-Completion-Protocol's Key-Rules bullet (rewritten from exception-based). The audit duty: canonical/agents/stacy.md § 'The claims-pass record' (the delegated-tier read + counting row). HONEST-REACH TEACHING RIDES THE LAW HOME: corpus-wide `plan held` is not evidence seats are respected — the active-falsification case is owned-artifact-authorship's, uncovered by design here"
history:
  - { date: 2026-09-19, change: "entry created by the delegated-tier-capture ballot (.kiro/docs/ballots/2026-09-19-delegated-tier-capture.md), drafted at Peter's in-session direction from the F15 adjudication's un-absorbed residual. The amendment: TCP's capture goes exception-based → UNCONDITIONAL ('a plan that held needs no note' was the missing-note gap's root — silence was ambiguous between plan-held and unrecorded divergence). The forced-negative pattern's third application (unmet criteria → promised artifacts → who-executed). Non-substring sweep at authoring: 28 live ids + this one, relations 0, dupes 0. Stacy's verifier-half review recorded in the ballot § 6 before submission", by: thurgood }
```

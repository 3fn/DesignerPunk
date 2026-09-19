# Fixture spec: av-gate-row-reworded

**Case**: `av-gate-row-reworded`
**Class**: av-gate
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

This is the B-3 finding in fixture form: **shape alone is not parity.**

The criteria table is flawless — exact set, verbatim cells, real evidence, forced-negative line present. An Additional verification section exists, with the right heading, the right three columns, a Status mark and an Evidence cell on every row. Everything that looks like compliance is present. And one gate condition has been reworded: *"Both platform demos reviewed by Leonardo and the review comment linked"* is restated as *"Platform demos reviewed and approved by Leonardo"* — the **linked-comment** obligation quietly dropped, and the row marked ✅ with a bare PR number that links to nothing in particular.

The falsification target is a checker that treats the AV section as a **presence** obligation — "does the section exist, does it have rows, do the rows have statuses" — which is exactly what a first implementation naturally builds, because AV's requirement text reads as *required-if-applicable* and the easy reading of "required" is "present". Under that reading this doc is green, and the merge-gate conditions have become unpoliced prose that no predicate ever compares to anything. That is the same escape the criteria table just closed, relocated one section down.

Note also which half is mutated. The criteria table is deliberately clean so that a checker running the parity predicate over criteria **only** produces a full-green parent. The red must come from the gate rows or not at all.

## tasks.md fragment

```markdown
# Implementation Plan: 131 — Navigation Family Cutover

**Date**: 2026-11-16
**Spec**: 131 — Navigation Family Cutover
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 2. Cut the Navigation family over to the new contract set

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Every Navigation component declares the `navigation_traversable` contract in its schema
  - The contract suite passes for all five Navigation components
  - No consumer-facing prop names change in this cutover

  **Primary Artifacts:**
  - src/components/navigation/schemas/
  - src/components/navigation/__tests__/contracts.test.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens
  - Both platform demos reviewed by Leonardo and the review comment linked
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Cut the Navigation family over to the new contract set

**Date**: 2026-11-19
**Task**: 2. Cut the Navigation family over to the new contract set
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Every Navigation component declares the `navigation_traversable` contract in its schema | ✅ | `src/components/navigation/schemas/` |
| The contract suite passes for all five Navigation components | ✅ | `npm test -- src/components/navigation → 5 suites passed` |
| No consumer-facing prop names change in this cutover | ✅ | `NavigationProps.test.ts › public prop surface unchanged` |

Unmet or partially met criteria: None

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| `npm test` green on the unit branch before the PR opens | ✅ | `npm test → 0 failures, 412 suites` |
| Platform demos reviewed and approved by Leonardo | ✅ | PR #198 |

Primary Artifacts: all shipped as declared
```

## Required verdict

- **Verdict**: `AV_SET_MISMATCH` on parent 2.
- **Reported diff**: one unmatched gate-condition pair —
  - promised `Both platform demos reviewed by Leonardo and the review comment linked`
  - claimed `Platform demos reviewed and approved by Leonardo`
- **Exit semantics**: RED — non-zero exit.
- **Companion assertion**: the criteria table on this parent MUST be reported as parity-clean. `expected.json` SHOULD assert *both* — AV red **and** criteria pass — so the fixture fails a build that reds the whole parent indiscriminately as well as one that greens the gate rows.
- **Must NOT be produced**: `PASS`; `SET_MISMATCH` (wrong surface — the criteria set matches).

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The gate-row Evidence cell `PR #198` is deliberately thin. It is *not* the defect under test here; whether a bare PR number classifies as `decision-record` or `empty-or-prose` is exercised by the evidence-class fixtures. If the build's evidence classifier also reds this row, the fixture still passes provided `AV_SET_MISMATCH` is among the verdicts — but `expected.json` should pin `AV_SET_MISMATCH` as required rather than as one-of.

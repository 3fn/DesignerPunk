# Fixture spec: declaration-missing-post-ratification

**Case**: `declaration-missing-post-ratification`
**Class**: declaration
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

A brand-new `tasks.md`, authored well after ratification, carrying well-written per-parent Success Criteria in the frozen form — and **no `**Criteria mode**` line.** The file is otherwise exemplary: house metadata block, declared merge units, criteria decomposed per platform, artifacts and gate declared. It looks like a spec written by someone who read the standard.

The defect is that the declaration is what makes the file *evaluable*. Without it, the checker's population filter finds no mode, and the most natural default in the world — "no declaration, treat as legacy, skip" — lets a file opt out of the entire law by omitting one line. Req 2.1.1 closes this by construction: **no third state exists**; a post-ratification file without a declaration is non-compliant, never legacy, and legacy status is keyed on **authorship date**, never on the declaration's absence.

A lazy checker fails here in the direction that produces no noise at all: it skips the file, reports nothing, and the spec's ten parents are never evaluated. Worse, this failure *scales* — every new spec inherits the opt-out, and the declared population that DD1's full scan depends on stays empty while looking healthy. This is the dormancy channel on the population's input side, and the required behavior is a red that names the missing line.

## tasks.base.md

**(file absent)** — the head commit adds `.kiro/specs/145-chip-filter-variants/tasks.md` as a new file. The base side of the pair carries no `tasks.md` for this spec at all.

## tasks.head.md

```markdown
# Implementation Plan: 145 — Chip Filter Variants

**Date**: 2026-12-14
**Spec**: 145 — Chip Filter Variants
**Author**: Lina

## Declared Merge Units

| Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units) |
|---|---|---|---|
| **U1 — The variants** | Task 1 | Task 1 | — |

## Tasks

- [ ] 1. Ship the Chip-Filter variants

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Chip-Filter-Base renders selected and unselected states from semantic tokens only
  - The web implementation announces selection changes to assistive technology
  - The iOS implementation announces selection changes to assistive technology
  - The Android implementation announces selection changes to assistive technology

  **Primary Artifacts:**
  - src/components/chip/ChipFilterBase.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens
```

## completion-doc fragment

**None.** The defect is in `tasks.md` itself and fires on the PR that touches it — no completion doc participates in this case.

## Required verdict

- **Verdict**: `NON_COMPLIANT_NO_DECLARATION` on the file, carrying the catalog message **verbatim**:

  ```
  non-compliant tasks.md: authored post-ratification without a criteria-mode declaration
  ```

- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`; `mode: 'legacy'`; a silent skip. A build that classifies this file as legacy has implemented the exact default the requirement forbids, and `expected.json` SHOULD assert the resolved mode as `non-compliant-no-declaration` in addition to the message, so the classification itself is pinned and not just the exit code.

## Encoding notes — **the authorship-date seam** (read before encoding)

This case cannot be encoded as a pure filesystem pair without one addition. DD2 keys legacy status on the `tasks.md`'s **git first-commit date** (`git log --diff-filter=A --follow`), and a fixture directory has no git history of its own. The encoder therefore needs a **seam**: the authorship date must be injectable into the checker's evaluation (a parameter on the parse/evaluate entry point that CI supplies from git and the fixture supplies from `expected.json`).

- `expected.json` for this fixture records `authoredAt: "2026-12-14"` — i.e. post-ratification — and the encoded fixture asserts the verdict **given** that date.
- The seam is not a fixture convenience; it is required for `tasks-md.ts` to be unit-testable at all, and the same seam serves `materiality-tick-only-immaterial-control` and both materiality falsification cases.
- If the build declines the seam and reads git directly with no injection point, this fixture is **not encodable**, and that is a finding rather than a reason to drop the case: the declaration duty would then have no falsification fixture, and per C7's floor the manifest class `declaration` would be at zero. Route to Peter as a blocked deliverable rather than shrinking the manifest.

## Contest note

A legitimate contest is available here on scope, and I state it so it is argued rather than assumed: the declaration and materiality duties run **diff-scoped** (design C4/C5), while every other fixture in this set exercises the **full-scan parity** path. If Thurgood contests that diff-scoped duties belong in `fixtures.test.ts` rather than in `materiality.test.ts` / `tasks-md.test.ts`, the contest is about **where the assertion lives, not whether it exists** — the manifest class `declaration` is a floor class and must be covered somewhere the floor check can see it. My position: keep it in the fixture set, because the floor's red-at-zero mechanism is the only enforcement that survives an inattentive reviewer, and a unit test in another suite is invisible to it.

# Fixture spec: av-artifact-line-missing

**Case**: `av-artifact-line-missing`
**Class**: av-gate
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The subtle sibling of `av-section-missing-when-owed`. Here the AV section **exists** and its gate rows are perfect — verbatim conditions, real evidence, correct predicate. What is missing is one line: the Primary Artifacts forced-negative (`Primary Artifacts: all shipped as declared`, or each deviation listed with its link).

Its absence is the promised-artifact escape in miniature. The parent declared three artifacts; one of them — the Kotlin generator fixture set — was not written, and the author, rather than claiming falsely, simply said nothing. Silence is the mechanism both consumer-reaching escapes used, and it is why this line is a **forced negative**: the author is required to make a positive statement about artifacts in every case, so that "nothing said" stops being an available state.

A lazy checker passes this by treating the AV section as satisfied once gate rows validate — the rows are the visible, table-shaped, obviously-checkable part, and a single prose line beneath them is easy to model as decoration. This fixture pins the line as a **required element of an owed AV section**, on exactly the same ground as the criteria table's own forced-negative line: silence does not satisfy it.

## tasks.md fragment

```markdown
# Implementation Plan: 136 — Kotlin Generator Parity

**Date**: 2026-12-01
**Spec**: 136 — Kotlin Generator Parity
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 3. Bring the Kotlin generator to parity with Swift

  **Type**: Implementation
  **Agent**: Ada (main session)

  **Success Criteria:**
  - The Kotlin generator emits every token family the Swift generator emits
  - Generated Kotlin constant names follow the platform naming rule in the architecture doc
  - The drift audit reports zero differences between the two generators' family coverage

  **Primary Artifacts:**
  - src/generators/kotlin/
  - src/generators/kotlin/__tests__/fixtures/
  - docs/token-system-overview.md (modified)

  **Merge gate:**
  - `npm run audit:theme-drift` green before the PR opens
```

## completion-doc fragment

`task-3-completion.md`:

```markdown
# Task 3 Completion: Bring the Kotlin generator to parity with Swift

**Date**: 2026-12-04
**Task**: 3. Bring the Kotlin generator to parity with Swift
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The Kotlin generator emits every token family the Swift generator emits | ✅ | `KotlinGenerator.test.ts › emits all 9 families` |
| Generated Kotlin constant names follow the platform naming rule in the architecture doc | ✅ | `KotlinNaming.test.ts › constant names match platform rule` |
| The drift audit reports zero differences between the two generators' family coverage | ✅ | `npm run audit:theme-drift → drift: none (3 platforms)` |

Unmet or partially met criteria: None

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| `npm run audit:theme-drift` green before the PR opens | ✅ | `npm run audit:theme-drift → drift: none (3 platforms)` |
```

## Required verdict

- **Verdict**: `AV_MISSING_OR_MALFORMED` on parent 3.
- **Reason recorded**: the parent declares `**Primary Artifacts:**`; the AV section carries no Primary-Artifacts forced-negative line (neither `Primary Artifacts: all shipped as declared` nor a deviation list).
- **Exit semantics**: RED — non-zero exit.
- **Companion assertions**: criteria parity clean; AV **gate-row** parity clean. `expected.json` SHOULD assert all three facts, so that the fixture distinguishes "the artifact line is missing" from "something in AV is wrong".
- **Must NOT be produced**: `PASS`; `AV_SET_MISMATCH` (the gate rows match).

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- Do not add a trailing `Primary Artifacts:` line during encoding "for symmetry with the other AV fixtures" — its absence is the whole case.
- Note for the build: this fixture asserts only that the **line** is required. Whether the three declared paths actually exist in the repository is `promised-artifact-exists`'s surface (proposed, unbuilt) and is out of scope for parity — the fixture deliberately declares a path (`src/generators/kotlin/__tests__/fixtures/`) that the narrative says was not written, and parity must **still** red only on the missing line, never on path existence.

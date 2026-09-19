# Fixture spec: omit-doc-no-completion-doc

**Case**: `omit-doc-no-completion-doc`
**Class**: omit-doc
**Expected exit**: GREEN (zero) **with a named emission** — not red, not silent
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The cheapest evasion in the catalog: **write no completion doc and there is no table to police.** Every other fixture in this set attacks a doc that exists; this one attacks the case where the author skipped the artifact entirely, and the parent is ticked anyway.

The defect being falsified here is **not** the missing doc — doc presence is `parent-completion-docs-present`'s surface, which is `proposed` and unbuilt (design C5/B-4). The defect is **silence**. A checker that finds no doc and moves on produces a clean, green, complete-looking run in which a ticked parent was never evaluated and nothing in the output says so. That is the dormancy failure mode this spec exists to close, and it is invisible by definition: the summary line counts what it looked at, and a parent it never looked at is not in the count.

A lazy checker passes this in the worst possible way — it passes it *and produces no artifact of having skipped anything*. The required behavior is the honest third state: a named emission carrying the exact catalog string, so that the claims pass at CLOSEOUT has something to read and a human scanning CI output can see the hole. Red would be wrong too — it would build the unbuilt `parent-completion-docs-present` check by the back door, on a surface nobody ratified and with a known false-positive class (docs land at parent completion, possibly before the unit's PR).

## tasks.md fragment

```markdown
# Implementation Plan: 118 — Module Resolution Contract

**Date**: 2026-10-26
**Spec**: 118 — Module Resolution Contract
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 4. Land the runtime-TS loader contract

  **Type**: Implementation
  **Agent**: Ada (main session)

  **Success Criteria:**
  - `npx tsc --noEmit` passes with the loader's package exports in place
  - Consumer `.ts` imports resolve from the compiled output, verified by the consumer smoke test
  - Component token files load at runtime without a build step
```

## completion-doc fragment

**Deliberately absent.** The fixture directory contains **no** completion doc for parent 4 — no `task-4-completion.md`, no suffixed or letter-variant sibling anywhere in the glob family `task-4*(-<suffix>)?(-parent)?-completion.md`. The absence *is* the fixture.

## Required verdict

- **Outcome**: not a red verdict — the named emission `completion-doc-not-found` on parent 4, with the catalog message reproduced **verbatim**:

  ```
  completion doc not found — not evaluated (doc presence is parent-completion-docs-present's surface, proposed/unbuilt; interim owner: the claims pass)
  ```

- **Exit semantics**: GREEN — exit zero, with the emission present in the output and counted in the run's emission count.
- **Must NOT be produced**:
  - **silence** — a run whose output contains no line mentioning parent 4. This is the primary failure this fixture detects, and `expected.json` MUST assert emission presence positively, never merely assert "no error".
  - `SET_MISMATCH` or any red verdict — red here is `parent-completion-docs-present` built by the back door.
  - An emission whose text paraphrases the catalog row. The string is fixed in the design's loud-failure catalog precisely so the claims pass can grep for it.

## Encoding notes

- Encode as `{ tasks.md, expected.json }` — **the fixture directory has no completion doc file at all.** The encoder must resist the tidy instinct to add an empty `completion.md`; an empty file is a *different* case (a doc that exists and parses to zero rows), and encoding it here would silently convert this fixture into one that no longer tests absence.
- `expected.json` records: `emissions: [{ kind: "completion-doc-not-found", parent: 4 }]`, `exit: 0`, `verdicts: []`.

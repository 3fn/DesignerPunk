# Fixture spec: malformation-block-not-found

**Case**: `malformation-block-not-found`
**Class**: malformation — *proposed manifest extension, see INDEX.md* (the C4-1 dormancy defense)
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The most dangerous fixture in this set, because the failure it targets is **the checker quietly doing nothing while reporting success.**

A spec declares `**Criteria mode**: per-parent`. Parent 2 is ticked. Parent 2 has **no criteria block** — the author moved the block during an edit, or never wrote one, and the file still looks fine at a glance because parents 1 and 3 have theirs. And the completion doc for parent 2 is a *beautiful* three-column table: verbatim-looking cells, ✅ marks, real test names, a forced-negative line saying `None`.

Against what? Nothing. There is no promise set for parent 2. An implementation that compares the doc's rows to an empty or absent criteria list has two natural outcomes, and **both are green**: empty-vs-empty parity (if it also skips the doc), or "no promises to check, so nothing failed". The parent that most needs evaluating — the one whose promises went missing — becomes the parent the instrument is blindest to, and the table invented in its place is never compared to anything.

This is the exact shape of Req 2.2.2's rule: *"WHEN a spec declares `per-parent` AND the checker cannot locate a well-formed block for a parent THEN the checker SHALL fail loudly … never silently select nothing (the dormancy defense, C4-1)."* The fixture supplies a plausible completion doc specifically so that a build cannot pass by reasoning "no doc, no check" — the doc is right there, and it is still not evidence of anything.

## tasks.md fragment

```markdown
# Implementation Plan: 169 — Form Input Float Label

**Date**: 2027-03-02
**Spec**: 169 — Form Input Float Label
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship the float-label primitive

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - The float-label primitive animates the label without triggering layout of siblings

- [x] 2. Ship Input-Text-Float on web

  **Type**: Implementation
  **Agent**: Sparky (main session)

  - [x] 2.1 Implement the component
  - [x] 2.2 Wire the contract suite

- [ ] 3. Ship Input-Text-Float on iOS

  **Type**: Implementation
  **Agent**: Kenya (main session)

  **Success Criteria:**
  - The iOS implementation satisfies `content_float_label` under the shared contract suite
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Ship Input-Text-Float on web

**Date**: 2027-03-05
**Task**: 2. Ship Input-Text-Float on web
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The web implementation satisfies `content_float_label` under the shared contract suite | ✅ | `InputTextFloat.contracts.test.ts › content_float_label` |
| The float label does not clip at the smallest supported width | ✅ | `InputTextFloat.test.ts › no clipping at min width` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `MALFORMATION` on parent 2, carrying the catalog message **verbatim**:

  ```
  declared per-parent, block not found for parent 2
  ```

- **Exit semantics**: RED — non-zero exit.
- **Companion assertions**: parents 1 and 3 are evaluated normally — parent 1 has a criteria block and a ticked box but no completion doc in this fixture, so it produces the `completion-doc-not-found` emission; parent 3 is unticked and is not evaluated. `expected.json` SHOULD pin these so the fixture also proves that one malformed parent does not abort the scan of its siblings.
- **Must NOT be produced**: `PASS`; a green run in which parent 2 is absent from the output; `SET_MISMATCH` computed against an empty promise set (right colour, wrong diagnosis — and the diff would be nonsense: two "unexpected" rows and zero missing, which tells the author to delete their table).

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }` with the completion doc present. Its presence is load-bearing: it is what defeats a "no doc, nothing to do" implementation.
- Parent 2's subtasks are retained deliberately. A parser that associates criteria to the **nearest preceding checkbox at any indent** must not be able to borrow a block from a subtask — there is none here, but the subtask lines make the association walk non-trivial, which is the point.
- Parent 3 is deliberately **unticked**: it confirms that an unticked parent with a well-formed block is not evaluated and not counted.

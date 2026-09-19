# Fixture spec: forced-negative-missing

**Case**: `forced-negative-missing`
**Class**: forced-negative — *proposed manifest extension, see INDEX.md*
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

An exact-set table, verbatim cells, compliant evidence on every row — and **no forced-negative line.** The doc just ends and the next heading begins.

This is the silence the line exists to make impossible. The rule's phrasing is not decorative: *"Silence does not satisfy it."* A forced negative works by removing "say nothing" from the author's option set — the author must write either `None` or a list, and both are falsifiable claims that a reader can check. Absent the line, a table with three ✅ rows and a table with three ✅ rows *and an unmentioned fourth problem* look identical, and the reader has no way to tell whether the author considered the negative case at all.

The fixture is sharpened by what the table contains: one ⚠️ row, properly marked and linked. So the doc is *already* honest about the unmet criterion — and still non-compliant, because the forced-negative line is where unmet criteria are enumerated for the reader who reads only the summary. This makes the case hard to hand-wave: the obligation is structural, not a proxy for honesty, and it holds even when the author has nothing to hide.

A lazy checker passes this because the line is the least table-shaped element in the law: not a row, not a column, not a heading — one line of prose whose presence is a boolean. Booleans about absent things are the easiest assertions to forget to write, and the natural implementation (`if (doc.forcedNegative) { validate it }`) is green on this fixture forever.

## tasks.md fragment

```markdown
# Implementation Plan: 160 — Data Display Family Base

**Date**: 2027-02-09
**Spec**: 160 — Data Display Family Base
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship Table-Data-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Table-Data-Base renders column headers with the correct scope attributes
  - Row selection state is announced to assistive technology
  - The component satisfies every contract listed on its schema
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Ship Table-Data-Base

**Date**: 2027-02-12
**Task**: 1. Ship Table-Data-Base
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Table-Data-Base renders column headers with the correct scope attributes | ✅ | `TableDataBase.test.ts › header scope attributes` |
| Row selection state is announced to assistive technology | ⚠️ | `TableDataBase.accessibility.test.ts › selection announced` — announced on single select only; follow-up: `.kiro/issues/2027-02-12-table-multiselect-announcement.md` |
| The component satisfies every contract listed on its schema | ✅ | `TableDataBase.contracts.test.ts` |

## Overall Integration Story

Table-Data-Base is the family's first primitive; the selection seam is shared with the
Chip family's filter variants and will carry multi-select once that seam lands.
```

## Required verdict

- **Verdict**: `FORCED_NEGATIVE_MISSING` on parent 1.
- **Companion assertions**: criteria-set parity clean; every row's evidence compliant; the ⚠️ row's follow-up link present. The fixture isolates one defect and `expected.json` should say so.
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`; `EVIDENCE_NONCOMPLIANT`; `SET_MISMATCH`.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The line must be absent, not empty and not malformed — this case tests **silence**. A separate future case could test a malformed line (e.g. `Unmet criteria: none`, wrong prefix and wrong case); I have not specified one, and flag it in INDEX.md as a known thin spot rather than leaving it unnamed.
- The prose section following the table is deliberate: it makes the missing line look like the end of a complete document rather than a truncation.

# Fixture spec: ratification-record-line-reworded

**Case**: `ratification-record-line-reworded`
**Class**: ratification-record — *class accepted by Thurgood, route 1, 2026-09-19*
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4, C5/C11, B-2)
**Date**: 2026-09-19

---

## Falsification intent

The ballot is present at its pinned path. It is **RATIFIED** — genuinely, visibly, with Peter's name and the date in the `Status` line. Somebody later tidied the document: the machine line was folded into a metadata table as a row, and a prose restatement was added beneath it. The rewording is editorial housekeeping of exactly the kind that happens to ratified records months after the fact, and **nobody did anything wrong**.

The checker must go **loud red** anyway, and this is the fixture that proves B-2's central claim: *no vacuous-green state exists at all.* The first design draft parsed the ballot's prose and failed on ~31% of the corpus — and, critically, **failed GREEN**. That is the failure shape this case exists to make impossible: an unresolvable record silently reading as "rule not in force", the whole declared population skipped, and a clean run reported over a law that is no longer being enforced. The dormancy channel is closed *by construction* — a renamed ballot or a reworded line turns the check red, not silently green — and a construction with no test is a claim.

The rewording is a deliberate near-miss on two axes so that loose parsing is caught:

- The literal token `Ratified-machine` **is present** in the document, inside a table cell — so any `/Ratified-machine/` search or `includes()` test finds it, and a build that then greps the same line for a date will resolve `2026-09-19` and pass. The form is *"alone on a line"*; a table cell is not a line, and the distinction must be enforced, not implied.
- The prose line `Machine-readable ratification date: 2026-09-19` sits immediately beneath — a second tempting target for a date-scraping fallback.

The `tasks.md`/completion-doc pair in this fixture is **fully compliant**. Any red the run produces can therefore only come from the ratification record, which is what makes the fixture diagnostic rather than merely red.

## ballot.md fragment

Supplied by the encoded fixture at the injected pinned path:

```markdown
# Ballot: Completion-Claims Integrity (Spec 127)

**Status**: RATIFIED (Peter, 2026-09-19)
**Spec**: 127 — Completion-Claims Integrity

| Field | Value |
|---|---|
| Ratified-machine | 2026-09-19 |
| Ratifier | Peter |

Machine-readable ratification date: 2026-09-19

## What this ballot ratifies

The Parent Success-Criteria Fidelity law, the machine-readable criteria convention, the
five register rows, and the Q5 charter execution.
```

## tasks.md fragment

```markdown
# Implementation Plan: 184 — Tag Family Interactive

**Date**: 2027-04-13
**Spec**: 184 — Tag Family Interactive
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship Tag-Removable-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Tag-Removable-Base exposes the remove affordance to assistive technology
  - Removal is announced to assistive technology after the tag leaves the DOM
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Ship Tag-Removable-Base

**Date**: 2027-04-16
**Task**: 1. Ship Tag-Removable-Base
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Tag-Removable-Base exposes the remove affordance to assistive technology | ✅ | `TagRemovableBase.accessibility.test.ts › remove affordance exposed` |
| Removal is announced to assistive technology after the tag leaves the DOM | ✅ | `TagRemovableBase.accessibility.test.ts › removal announced` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `RATIFICATION_RECORD_UNRESOLVABLE`, carrying the catalog message **verbatim, with the path slot filled**:

  ```
  cannot resolve ratification record at .kiro/docs/ballots/2026-09-19-completion-claims-integrity.md
  ```

- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**:
  - **GREEN of any kind.** This is the primary assertion. A run that exits zero here — whether by resolving the table cell, by scraping the prose line, by falling back to the human `Status` line, or by treating an unresolvable record as "rule not in force" — has reproduced the exact vacuous-green state B-2 eliminated, and `expected.json` MUST assert non-zero exit as its first condition.
  - `PASS` on parent 1, or any parity verdict at all. The record gate precedes evaluation; a run that reds on the record and *also* reports parity results has leaked past a precondition.
  - A date resolving to `2026-09-19` from any source in this document.

## Encoding notes

- Encode as `{ ballot.md, tasks.md, completion.md, expected.json }`.
- `expected.json` carries the **injected path string** passed to `parseRatificationRecord(ballotText, ballotPath)`, and the expected message must be that same string interpolated into the catalog form — so a build that hard-codes a different path in the message fails here.
- The token `Ratified-machine` must survive encoding **inside the table cell**. If a formatter or a well-meaning edit promotes it back to its own line, this fixture silently becomes `ratification-record-valid-control` with an inverted expectation — the highest-consequence encoding hazard in this trio.
- Keep the compliant `tasks.md`/doc pair. Its only job is to guarantee that the red has exactly one possible cause.

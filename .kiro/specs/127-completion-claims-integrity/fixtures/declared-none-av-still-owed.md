# Fixture spec: declared-none-av-still-owed

**Case**: `declared-none-av-still-owed`
**Class**: declared-none — *proposed manifest extension, see INDEX.md* (the Req 1.6 / B-3 narrow waiver)
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

A parent legitimately declares `**Success Criteria:** none — <reason>`, with a real reason. The declaration is valid and the criteria table is genuinely waived. The parent also declares three `**Primary Artifacts:**` and a `**Merge gate:**` condition — and the completion doc carries neither an Additional verification section nor an artifact line, only a paragraph saying everything shipped.

The falsification target is **waiver scope**, and it is the same structural mistake as `exemption-does-not-waive-av` reached by the other legal route. Req 1.6 is precise: declared-none waives **the criteria table only**; the AV section and its forced-negative line remain owed where applicable. The design states it more sharply still — *the emission records the table waiver, never an AV skip.*

The reason this matters more than it looks: declared-none is the state an author reaches for when a parent's promises are **artifacts rather than criteria** — documentation parents, scaffolding parents, charter parents. That is exactly the population whose entire promise surface lives in `**Primary Artifacts:**`. If declared-none short-circuits the parent, the waiver lands hardest precisely where the AV section is the only remaining check, and the parents least covered by the criteria table become the parents covered by nothing.

A lazy checker passes this with one line of control flow: recognize declared-none, `continue`. The recognition is correct; the `continue` is the bug.

## tasks.md fragment

```markdown
# Implementation Plan: 163 — Contract Education Batch

**Date**: 2027-02-16
**Spec**: 163 — Contract Education Batch
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 3. Publish the contract-education documents

  **Type**: Documentation
  **Agent**: Lina (main session)

  **Success Criteria:** none — this parent ships documents only; its promises are the declared artifacts below

  **Primary Artifacts:**
  - governance/contract-system-reference.md (modified)
  - governance/component-family-button.md (modified)
  - docs/specs/163/task-3-summary.md

  **Merge gate:**
  - docs-MCP `rebuild_index` run after merge and its output recorded
```

## completion-doc fragment

`task-3-completion.md`:

```markdown
# Task 3 Completion: Publish the contract-education documents

**Date**: 2027-02-19
**Task**: 3. Publish the contract-education documents
**Type**: Documentation
**Status**: Complete

## Success Criteria Verification

This parent declares no success criteria — see `tasks.md`.

## Overall Integration Story

The contract-system reference now carries the concept-catalog walkthrough, and the Button
family guide points at it from the inheritance section. The index was rebuilt after merge
and both documents resolve through the docs MCP.
```

## Required verdict

- **Verdict**: `AV_MISSING_OR_MALFORMED` on parent 3.
- **Reason recorded**: the parent declares `**Primary Artifacts:**` and `**Merge gate:**`; no Additional verification section is present.
- **Emissions**: `declared-none-table-waiver` **is** produced for parent 3 — the waiver is real, it is recorded, and the claims pass counts declared-none rates from exactly this emission (Req 2.2.4 / 8.6). Emission and red verdict coexist in the same run.
- **Exit semantics**: RED — non-zero exit, with the emission present.
- **Must NOT be produced**: `PASS`; a run in which parent 3 is skipped; an emission phrased as an AV skip; a missing `declared-none-table-waiver` emission.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- `expected.json` MUST assert the emission **and** the red together — asserting only one lets half the defect through, and the two halves fail in opposite directions.
- The prose in the completion doc mentions that the index was rebuilt — i.e. the gate condition *was* satisfied in reality. That is deliberate: the defect is that the satisfaction is asserted in prose rather than as a verifiable gate row, which is the whole difference the AV section makes.

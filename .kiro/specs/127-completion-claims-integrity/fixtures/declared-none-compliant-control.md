# Fixture spec: declared-none-compliant-control

**Case**: `declared-none-compliant-control`
**Classes**: declared-none (**PASS-expected control**) — also the control for the **deferral** class's ASCII-arrow spelling (DD6)
**Expected exit**: GREEN (zero), with two emissions
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The compliant half of the declared-none surface. A documentation parent legitimately declares `**Success Criteria:** none — <reason>`, declares three artifacts and one gate condition, and its completion doc does **exactly** what the law asks of it: no criteria table (waived), and a complete Additional verification section with a verbatim gate row, the Primary-Artifacts forced-negative line, and one deferral in the fixed form using the **ASCII arrow** `->`.

Two false-positive classes are under test, and both are easy to build by accident:

1. **The waiver is not recognized at all** — the parent declares no criteria, the doc carries no table, and a checker that requires a criteria table on every ticked parent reds it. This punishes the one state the law explicitly grants, and does so on documentation parents, which are the most common users of it.
2. **The ASCII arrow is not accepted** — DD6 accepts both `→` and `->` at parse precisely because an ASCII-only author would otherwise hit a malformation *for typography*, the same class of non-authorial artifact the normalization rules absorb. A build that implements only the taught spelling turns a keyboard limitation into a compliance failure, and the author's rational response is to stop declaring deferrals at all — which destroys the CLOSEOUT walk-back's input set.

The fixture also pins the **emission** side of declared-none: the table waiver must be recorded, not merely honored silently, because the claims pass counts declared-none rates from that record (Req 2.2.4 / 8.6). A silent honor is a pass that leaves the audit blind.

## tasks.md fragment

```markdown
# Implementation Plan: 175 — DTCG Export Guide

**Date**: 2027-03-16
**Spec**: 175 — DTCG Export Guide
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 2. Publish the DTCG export guide

  **Type**: Documentation
  **Agent**: Ada (main session)

  **Success Criteria:** none — this parent ships documents only; its promises are the declared artifacts below

  **Primary Artifacts:**
  - docs/dtcg-export-guide.md
  - docs/specs/175/task-2-summary.md
  - docs/figma-export-guide.md

  **Merge gate:**
  - docs-MCP `rebuild_index` run after merge and its output recorded
```

## completion-doc fragment

`task-2-completion.md`:

```markdown
# Task 2 Completion: Publish the DTCG export guide

**Date**: 2027-03-19
**Task**: 2. Publish the DTCG export guide
**Type**: Documentation
**Status**: Complete

## Success Criteria Verification

This parent declares `**Success Criteria:** none — this parent ships documents only; its
promises are the declared artifacts below`. The criteria table is waived; the Additional
verification section below carries this parent's verifiable duties.

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| docs-MCP `rebuild_index` run after merge and its output recorded | ✅ | `rebuild_index → 82 docs, 2,781 sections indexed` |

Primary Artifacts: all shipped as declared, except as declared below

Artifact deferred: docs/figma-export-guide.md -> U3
```

## Required verdict

- **Verdict**: `PASS` on parent 2 — the criteria table is waived; AV gate-row parity clean; the artifact line present; the deferral well-formed.
- **Emissions**: exactly two —
  - `declared-none-table-waiver` for parent 2 (detail SHOULD carry the declared reason, so the claims pass can read the reason without re-parsing `tasks.md`);
  - `av-deferral-declared`, detail `docs/figma-export-guide.md -> U3`.
- **Exit semantics**: GREEN — exit zero, two emissions counted.
- **Must NOT be produced**: any verdict; a missing `declared-none-table-waiver` emission (a silent honor); a `malformed deferral` message for the ASCII arrow; an emission phrased as an **AV** skip (the waiver is the table's, never AV's — see `declared-none-av-still-owed` for the falsification side).

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- The deferral arrow in the completion doc is the two-character ASCII sequence `->`, not U+2192. This is the entire point of the second class this fixture controls for; a formatter or editor that "prettifies" it to `→` destroys the case.
- `expected.json` SHOULD assert both emissions positively, `verdicts: []`, and `exit: 0`.
- The prose paragraph quoting the declared-none line is realistic authoring, not a required form. It must not be mistaken for a criteria table by the parser — that is a small bonus assertion this fixture provides for free.

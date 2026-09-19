# Fixture spec: ratification-record-ballot-absent

**Case**: `ratification-record-ballot-absent`
**Class**: ratification-record — *class accepted by Thurgood, route 1, 2026-09-19*
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4, C5/C11, B-2)
**Date**: 2026-09-19

---

## Falsification intent

No ballot at the pinned path. The file was renamed in a later reorganization, moved into an archive tree the way the F7 issue was, or simply never existed in this checkout.

This is the sibling of `ratification-record-line-reworded` and it attacks a **different implementation instinct**. A reworded line fails a *parse*; an absent file fails a *read*, and failed reads have a uniquely seductive default: `try { read } catch { return null }`, then `if (!record) return;` — at which point the entire declared population is skipped and the run exits zero. Every ingredient of that pattern is ordinary defensive coding, and together they reconstruct the vacuous-green state B-2 was raised to eliminate. **Missing file handling is where anti-dormancy mechanisms go to die**, because the code that kills them looks like robustness.

The design's ground for choosing red over tolerance is stated and worth keeping in view: since U1 merges before U2 exists, **the ballot is present for the checker's entire life**. There is no legitimate state in which the record is missing. So absence is never a "not yet" — it is a repository defect (a rename, a bad merge, a deleted record), and the correct response is the loudest one available. The catalog gives the two conditions — *ballot absent* and *machine line unparseable* — **one shared message**, deliberately: the author's next action is identical in both cases (go look at the pinned path), and one string is easier to grep for across CI history than two.

As with its sibling, the `tasks.md`/completion-doc pair is **fully compliant**, so the red has exactly one possible cause.

## ballot.md fragment

**Deliberately absent.** The encoded fixture directory contains **no `ballot.md`**. The absence is the fixture, exactly as `omit-doc-no-completion-doc` encodes the absence of a completion doc.

## tasks.md fragment

```markdown
# Implementation Plan: 187 — Container Family Surface

**Date**: 2027-04-20
**Spec**: 187 — Container Family Surface
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship Container-Surface-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Container-Surface-Base resolves its elevation through the semantic layer
  - The container exposes no interactive semantics of its own
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Ship Container-Surface-Base

**Date**: 2027-04-23
**Task**: 1. Ship Container-Surface-Base
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Container-Surface-Base resolves its elevation through the semantic layer | ✅ | `src/components/container/ContainerSurfaceBase.ts` |
| The container exposes no interactive semantics of its own | ✅ | `ContainerSurfaceBase.accessibility.test.ts › no interactive role` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `RATIFICATION_RECORD_UNRESOLVABLE`, carrying the catalog message **verbatim, with the path slot filled** — the **same string** as the reworded-line sibling:

  ```
  cannot resolve ratification record at .kiro/docs/ballots/2026-09-19-completion-claims-integrity.md
  ```

- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**:
  - **GREEN of any kind**, and specifically not a green produced by a swallowed read error. `expected.json` MUST assert non-zero exit as its first condition.
  - An unhandled exception / stack trace instead of the catalog message. A crash is technically non-zero and is **not** compliance: the author needs the fixed string, and the claims pass greps CI history for it. `expected.json` SHOULD assert the message, not merely the exit code.
  - `PASS` on parent 1, or any parity verdict — the record gate precedes evaluation.
  - A differently-worded message for absence than for an unparseable line. One condition, one string, by design.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }` — **no `ballot.md` in the directory.** The encoder must resist adding an empty `ballot.md` for symmetry with the other two cases: an empty file exercises the *parse* path, which is already covered by `ratification-record-line-reworded`, and would silently convert this fixture into a duplicate of it.
- `expected.json` still carries the **injected path string** — it is what the message interpolates and what the harness hands to `parseRatificationRecord`'s caller; the fixture asserts behavior when that path resolves to nothing.
- This trio is discriminating as a set: valid (green, evaluation proceeds) / present-but-unparseable (red) / absent (red, same string). A build passing any two and failing the third has a specific, nameable bug, and `expected.json` should keep the three assertions independent so the suite says which.

# Fixture spec: malformation-criteria-block-defects

**Case**: `malformation-criteria-block-defects`
**Class**: malformation — *proposed manifest extension, see INDEX.md*
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

Three structural defects in one `tasks.md`, chosen because each one has a **silent** failure mode that looks like success:

1. **A criteria block before any checkbox** (a spec-wide criterion the author put under `## Tasks` by habit). The association rule walks backward to the nearest preceding checkbox line; there isn't one. A parser that returns `undefined` and moves on has silently discarded a promise.
2. **`none` co-occurring with bullets.** The parent declares declared-none *and then lists two criteria.* Whichever way a lenient parser resolves this it is wrong in a specific, damaging direction: honor the `none` and two real promises vanish; honor the bullets and the author's stated intent is overridden. The law's answer is that the file is ambiguous and the author must fix it.
3. **Two criteria blocks associating to one parent** (a copy-paste during an edit; the second block silently wins under `Object.assign`-shaped parsing, or the first wins under first-match parsing, and in both cases one block's criteria evaporate).

The common thread is that **every one of these defects has a plausible silent resolution**, and every silent resolution produces a green run over an incorrect promise set. That is worse than a red: the checker is now asserting parity against a set the file never defined. Req 2.2's answer — *fail loudly, never silently select nothing* — is the C4-1 dormancy defense on the parser's own surface, and this fixture is its detector.

A lazy checker passes all three by being tolerant, which is the default disposition of every markdown parser ever written.

## tasks.md fragment

```markdown
# Implementation Plan: 166 — Modal Family Base

**Date**: 2027-02-23
**Spec**: 166 — Modal Family Base
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

**Success Criteria:**
- The modal family ships with a shared focus-trap primitive

- [x] 1. Ship Modal-Dialog-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:** none — this parent's promises are the declared artifacts below
  - Modal-Dialog-Base traps focus within the dialog while open
  - The dialog is dismissible by Escape

- [x] 2. Ship Modal-Sheet-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Modal-Sheet-Base renders at every breakpoint without clipping

  **Primary Artifacts:**
  - src/components/modal/ModalSheetBase.ts

  **Success Criteria:**
  - Modal-Sheet-Base announces its open state to assistive technology
```

## completion-doc fragment

**None.** All three defects are in `tasks.md`; the file cannot be parsed into a promise set, so no completion doc participates. (A doc could be added without changing any expected message — deliberately omitted so the fixture cannot accidentally pass for a doc-side reason.)

## Required verdict

- **Verdict**: `MALFORMATION` on the file, carrying **all three** catalog messages, verbatim:

  ```
  malformed association: criteria block at line 10 precedes every checkbox
  ```
  ```
  malformed criteria block: 'none' co-occurs with criteria (parent 1)
  ```
  ```
  malformed association: two criteria blocks associate to parent 2 (lines 27, 33)
  ```

- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`; any parse result in which a promise set is computed for parent 1 or parent 2; a run reporting only one or two of the three messages (partial loudness is the failure this fixture is built to expose — `expected.json` MUST require all three).

## Encoding notes — **line numbers are encoding-dependent**

The two `lines` slots are 1-based line numbers **in the encoded fixture file**. The numbers above (10 / 27, 33) assume the fragment is encoded **exactly as written, starting at line 1 with the `# Implementation Plan:` heading and with every blank line preserved**. If the encoder adds a provenance header inside `tasks.md` or reflows anything, the numbers shift and `expected.json` MUST be updated to the encoded reality — and the provenance header should note that these values were recomputed.

Preferred encoding: put the provenance header in `expected.json` (or a sibling `README`), not inside `tasks.md`, so the fixture's own line numbering stays the same as this specification's.

- Encode as `{ tasks.md, expected.json }`.

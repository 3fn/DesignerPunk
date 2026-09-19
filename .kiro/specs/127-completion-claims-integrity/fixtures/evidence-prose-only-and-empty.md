# Fixture spec: evidence-prose-only-and-empty

**Case**: `evidence-prose-only-and-empty`
**Class**: evidence — *proposed manifest extension, see INDEX.md*
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

**Exact-set parity is green here.** All three criteria are reproduced verbatim, in full, none dropped, none reworded, none added; the forced-negative line is present. A checker that implements only the multiset predicate — the headline rule, the one the law is named for — passes this doc completely.

And two of the three rows claim ✅ on nothing:

- **Row 1** carries activity prose: *"Thoroughly tested throughout the implementation; everything works as expected."* This is the M4 = 0/22 shape the Tier-3 template defect produced for a year — effort offered as evidence. It is confident, it is probably sincere, and it is unfalsifiable: there is nothing in the cell a verifier can open.
- **Row 2** carries **nothing at all** — an empty cell in a well-formed table, which renders as a tidy blank and reads as an oversight rather than a claim.

The law is explicit and needs no interpretation: *a ✅ with an empty or prose-only Evidence cell is non-compliant on its face.* That sentence is load-bearing because evidence is where the rule stops being about bookkeeping and starts being about verification — the table's whole purpose is to make each ✅ point at something. An exact set of unfalsifiable rows is a perfectly-shaped artifact that establishes nothing.

Row 3 is compliant, deliberately: the red must attach to rows 1 and 2 specifically, not to the parent wholesale.

## tasks.md fragment

```markdown
# Implementation Plan: 154 — Divider Family Base

**Date**: 2027-01-26
**Spec**: 154 — Divider Family Base
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship Divider-Line-Base

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Divider-Line-Base renders at every thickness token without sub-pixel rounding artifacts
  - The component is exposed to assistive technology as a separator with the correct role
  - Divider tokens resolve through the semantic layer with no primitive references in component code
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Ship Divider-Line-Base

**Date**: 2027-01-29
**Task**: 1. Ship Divider-Line-Base
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Divider-Line-Base renders at every thickness token without sub-pixel rounding artifacts | ✅ | Thoroughly tested throughout the implementation; everything works as expected. |
| The component is exposed to assistive technology as a separator with the correct role | ✅ |  |
| Divider tokens resolve through the semantic layer with no primitive references in component code | ✅ | `src/components/divider/DividerLineBase.ts` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `EVIDENCE_NONCOMPLIANT` on parent 1, naming **rows 1 and 2**.
  - Row 1: `evidenceKind: 'empty-or-prose'` with `status: '✅'`.
  - Row 2: empty cell, `status: '✅'`.
- **Companion assertion**: criteria-set parity on this parent MUST be reported **clean**. `expected.json` asserts both facts, so the fixture fails a build that reds the parent for a set mismatch it does not have.
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS`; a red naming row 3 (whose evidence is a compliant artifact path).

## Contest note — where the design draws the line, and where I read it

Design C3 states that evidence-kind classification is *"emission metadata, never a truth verdict"*, and that is right: the checker cannot judge whether a cited path proves anything. But Req 6.4 makes the **non-empty and permitted-kind** test part of the per-parent verdict surface, and the guide makes the ✅-with-prose-only case non-compliant *on its face*. I read those as consistent: the classifier's output is metadata, and exactly one derived predicate — `status === '✅' && kind === 'empty-or-prose'` — is a verdict. Nothing else about the classification may red.

If the build reads C3's sentence as barring **any** verdict derived from the classifier, that reading conflicts with the guide's ratified text and the conflict is Peter's to settle, not the build's. `expected.json` pins the observable either way: non-zero exit with rows 1 and 2 named.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- Row 2's Evidence cell is genuinely empty (`| ✅ |  |`). Do not let a formatter collapse the column or insert a placeholder.

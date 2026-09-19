# Fixture spec: absorb-two-criteria-one-row

**Case**: `absorb-two-criteria-one-row`
**Class**: absorb
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

The hardest of the six to argue about, and the reason the law states absorb's harm carefully. Two promised criteria are merged into one row joined by *"and"*. **Nothing is hidden** — both claims appear, both are true, the evidence cell cites both suites. An author doing this is tidying, not evading, and will say so if challenged.

The harm is structural rather than moral: the enumerated set stops mapping 1:1 to the promise set. Three consequences follow immediately. A per-criterion verdict can no longer be read off the table — if the announcement half had failed, the row could only have been ✅ (dishonest), ⚠️ (which hides *which* half), or split (which is compliance). Counting stops working: the claims pass counts rows against promises and this parent now reports 2-of-3 with nothing wrong. And absorb is the **carrier wave for relax** — once rows may combine, a row may combine *most* of two promises, and the residue leaves without trace.

A lazy checker passes this if it matches loosely: the merged cell contains both promised strings as substrings, so containment, token-overlap and "did every promise's key phrase appear somewhere in the table" all return true. Absorb is the fixture that punishes any predicate operating over the table as a *blob* rather than as a *multiset of cells*.

## tasks.md fragment

```markdown
# Implementation Plan: 126 — Loading Family Base

**Date**: 2026-11-09
**Spec**: 126 — Loading Family Base
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 1. Ship the Loading-Spinner-Base web implementation

  **Type**: Implementation
  **Agent**: Sparky (main session)

  **Success Criteria:**
  - The web implementation renders the loading state without layout shift at every size token
  - The web implementation announces the loading state to assistive technology
  - Reduced-motion users receive the static variant, verified against the media query
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Ship the Loading-Spinner-Base web implementation

**Date**: 2026-11-12
**Task**: 1. Ship the Loading-Spinner-Base web implementation
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The web implementation renders the loading state without layout shift at every size token and announces the loading state to assistive technology | ✅ | `LoadingSpinnerBase.test.ts › no layout shift across size tokens`; `LoadingSpinnerBase.accessibility.test.ts › announces loading state` |
| Reduced-motion users receive the static variant, verified against the media query | ✅ | `LoadingSpinnerBase.test.ts › reduced motion renders static variant` |

Unmet or partially met criteria: None
```

## Required verdict

- **Verdict**: `SET_MISMATCH` on parent 1.
- **Reported diff**: two missing, one unexpected —
  - missing `The web implementation renders the loading state without layout shift at every size token`
  - missing `The web implementation announces the loading state to assistive technology`
  - unexpected `The web implementation renders the loading state without layout shift at every size token and announces the loading state to assistive technology`
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS` under any containment, fuzzy-match or "all promised phrases appear in the table" reading. The merged cell contains both promised strings; equality over cells is the only predicate that fails it.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- `expected.json` SHOULD record the counts (missing: 2, unexpected: 1) as well as the strings — a checker that reports "1 row missing" has mis-modelled absorb as drop.

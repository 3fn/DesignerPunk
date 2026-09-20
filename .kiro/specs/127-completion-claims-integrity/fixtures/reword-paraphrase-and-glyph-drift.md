# Fixture spec: reword-paraphrase-and-glyph-drift

**Case**: `reword-paraphrase-and-glyph-drift`
**Class**: reword
**Expected exit**: RED (non-zero)
**Author**: Stacy — Spec 127, Task 2.1 (Req 6.5; design C7/DD4)
**Date**: 2026-09-19

---

## Falsification intent

Two rewordings, carrying different intents, deliberately in one table so that a checker cannot pass by handling only the obvious one.

**Row 1 is the dishonest reword** — the measured mutation class, reproduced in the shape it was found: a claim of *passing* becomes a claim of *having been evaluated*, and the row is marked ✅. Every content word but one survives; the verb that carried the verdict does not. A human reviewer skimming a tidy table reads "AA contrast, ✅" and moves on.

**Row 2 is the innocent reword** — retranscription drift. The author retyped the bullet instead of copying it: the backticks around the threshold are gone and `ΔE₀₀` (subscript zeros, U+2080) came back as `ΔE00` (ASCII zeros). Nothing dishonest happened. It still fails, and **it must**: rule (iv) admits no punctuation, markdown or glyph normalization, and the checker cannot tell an innocent retype from a deliberate one without becoming the fuzzy matcher this law refuses to build. This row is the fixture form of the guide's first authoring note (*copy the bullet, never retranscribe it*) and of the adoption cost that Req 2.5.3 calls intended.

A lazy checker passes both: row 1 because paraphrase detection needs semantics it doesn't have if it is doing substring or token-overlap matching, row 2 because a "helpful" normalization step that strips backticks or folds digits looks like a kindness. Row 2 is therefore also a guard against the checker's own drift toward leniency.

## tasks.md fragment

```markdown
# Implementation Plan: 104 — Semantic Contrast Remediation

**Date**: 2026-10-12
**Spec**: 104 — Semantic Contrast Remediation
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 1. Remediate the semantic color pairs

  **Type**: Implementation
  **Agent**: Ada (main session)

  **Success Criteria:**
  - All 24 semantic color pairs pass WCAG AA contrast in both light and dark mode
  - Perceptual distance between adjacent steps stays within `ΔE₀₀ < 1`
  - No primitive token values change — remediation happens in the semantic layer only
```

## completion-doc fragment

`task-1-completion.md`:

```markdown
# Task 1 Completion: Remediate the semantic color pairs

**Date**: 2026-10-15
**Task**: 1. Remediate the semantic color pairs
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| All 24 semantic color pairs evaluated against WCAG AA contrast in both light and dark mode | ✅ | `SemanticColorContrast.test.ts › all pairs evaluated` |
| Perceptual distance between adjacent steps stays within ΔE00 < 1 | ✅ | `npm run audit:mode-parity → 0 unmatched keys` |
| No primitive token values change — remediation happens in the semantic layer only | ✅ | `src/tokens/semantic/color.ts` |

Unmet or partially met criteria: None
```

> Note for the encoder: row 2's criterion cell uses ASCII `ΔE00` where the bullet carries the subscript form `ΔE₀₀` (U+0394, U+0045, U+2080, U+2080), and drops the surrounding backticks. Both differences must survive encoding, or the fixture proves nothing.

## Required verdict

- **Verdict**: `SET_MISMATCH` on parent 1.
- **Reported diff**: two unmatched pairs —
  - promised `All 24 semantic color pairs pass WCAG AA contrast in both light and dark mode` / claimed `All 24 semantic color pairs evaluated against WCAG AA contrast in both light and dark mode`
  - promised ``Perceptual distance between adjacent steps stays within `ΔE₀₀ < 1` `` / claimed `Perceptual distance between adjacent steps stays within ΔE00 < 1`
  Reported as multiset difference (2 missing, 2 unexpected) — the design collapses drop/add/reword into the multiset diff by construction.
- **Exit semantics**: RED — non-zero exit.
- **Must NOT be produced**: `PASS` on either row. A build that passes row 2 has added a normalization rule outside the closed list of four; per Req 2.5.3 that is an amendment with a record, not an implementation choice, and the fixture is the detector.

## Encoding notes

- Encode as `{ tasks.md, completion.md, expected.json }`.
- `expected.json` SHOULD enumerate both unmatched pairs so that half-handling fails.

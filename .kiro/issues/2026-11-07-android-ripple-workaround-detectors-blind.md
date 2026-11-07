# Defect: the Android ripple "workaround" detectors match `rememberRipple` and cannot see `ripple(...)`

**Date**: 2026-11-07
**Filed by**: Lina, flagged at U7 (Task 12 of Spec 129, merged as #739, `c71fb2452`).
**Owner**: Lina (both files are in Stemma's component and validator space: `src/components/__tests__/` and `src/validators/`). Ada is not consulted: neither file defines or validates a blend token value; they only scan Android source for forbidden pressed-state patterns. If the fix touches `BLEND_TOKEN_VALUES` or the blend-value assertions in the same test file, Ada is consulted on that part.
**Class**: P2 obligation (guard) · defect *(set 2026-11-07, Lina, rule 12. Two guards claim to detect the Android ripple workaround and, since #739, can no longer detect it.)*
**Trigger**: `path:src/components/__tests__/BlendTokenUsageValidation.test.ts,src/validators/StemmaTokenUsageValidator.ts` — the event that owes the close is the fixing PR's touch of either file. Dated reason (2026-11-07): the defect is in those two files, so the fix cannot land without touching one; a path token fires on that PR and not before. Only the owner re-rules this line (rule 9).

---

## The defect, read at `e7f57c20b`

- `src/components/__tests__/BlendTokenUsageValidation.test.ts` L77–79:
  `materialRipple: /ripple\s*=\s*rememberRipple/i,` and `indicationRipple: /indication\s*=\s*rememberRipple/i`. The `it('should not contain Material ripple workaround')` blocks (L365–369 and the ButtonCTA twin at L656) assert `not.toContain('materialRipple')` / `'indicationRipple'`.
- `src/validators/StemmaTokenUsageValidator.ts` L245–246: `ripple: /rememberRipple\s*\(/gi`, run per line at L459–466 and emitted as a `RIPPLE_WORKAROUND` warning.
- U7 replaced `indication = rememberRipple(` with `indication = ripple(` at `Button-Icon/platforms/android/ButtonIcon.android.kt` L247, `Input-Checkbox-Base/.../InputCheckboxBase.android.kt` L474 and `Input-Radio-Base/.../InputRadioBase.android.kt` L428 (pre-U7 the first two imported and called `rememberRipple`, e.g. `c71fb2452^:` ButtonIcon L35 and L246). Neither pattern matches `ripple(`, so both detectors pass on source that has the same construct.
- Both are blind in the strict sense: a negative assertion on a pattern that can no longer occur is true of any input. Note also that the test's Android sources (ButtonCTA, InputTextBase, ContainerBase, IconBase, L35–50) do not include the three U7 components, so the test never covered them; the validator is the only one that scanned them.
- The only remaining ripple guard, `src/components/__tests__/AndroidRememberRipple.guard.test.ts`, forbids the name `rememberRipple` (deprecated at ERROR from material-ripple 1.7); it does not address the intent of these detectors.

## Fork the fix must surface (Peter's pick, not the owner's)

The detectors' intent is "pressed-state feedback must come from blend tokens, not Material ripple". The three components now use `ripple(...)` deliberately, as accepted by the harness. Either:
1. `ripple(...)` as `indication` is still a banned workaround: port the patterns to `ripple\s*\(`, and the three components then fail the intent and need a ruling on their pressed-state feedback; or
2. `ripple(...)` is accepted Android press feedback: retire both detectors and their assertions, with the reason recorded, and keep only the deprecation guard.

Surviving counter-argument against (1): it turns an API rename into a ban on the platform's own press indication. Against (2): it drops a check that exists to keep blend tokens the single source of pressed-state color.

## Proposed fix

Owner drafts the fork for Peter, then applies the chosen branch. In branch (1), add a bite: a fixture string `indication = ripple(bounded = true)` that both detectors report, and a fixture without it that they do not.

## Criterion (decidable)

Closed when, at the fixing PR's head: (a) running the validator over a source line `indication = ripple(bounded = true)` yields a `RIPPLE_WORKAROUND` warning if branch (1), or the `ripple` entry and both Blend assertions are gone with the reason in this record if branch (2); (b) `grep -c rememberRipple src/validators/StemmaTokenUsageValidator.ts src/components/__tests__/BlendTokenUsageValidation.test.ts` prints `0` for each file; (c) `npm test -- src/components/__tests__/BlendTokenUsageValidation.test.ts src/validators` passes; (d) the record carries a dated outcome line and moves to `archive/` (rule 5).

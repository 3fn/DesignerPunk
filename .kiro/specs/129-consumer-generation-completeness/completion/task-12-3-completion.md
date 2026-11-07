# Task 12.3 Completion: Ripple, the dead-import guard, row 14's outcome lines for A5 and A7

**Date**: 2026-11-07
**Task**: 12.3 (Spec 129, Unit 7, parent 12)
**Agent**: Lina (Sonnet, as planned)
**Branch**: `task/129-12-component-theme-reads`

## 1. What changed

- `rememberRipple(` becomes `ripple(` at `ButtonIcon.android.kt`, `InputCheckboxBase.android.kt` and `InputRadioBase.android.kt`; each import becomes `androidx.compose.material.ripple.ripple`. The three list entries are removed in this diff.
- `VerticalListButtonItem.android.kt`: the dead `rememberRipple` import is removed (the file passes `indication = null`). A comment in `VerticalListButtonItemTest.kt` is reworded.
- `src/components/__tests__/AndroidRememberRipple.guard.test.ts` (new, `@category temporary`, retiring when `harness-android-components` is required): fails on a `rememberRipple` code line in any Android component source, and names `VerticalListButtonItem.android.kt`; a bite in each direction.
- `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md`: a dated line signed by Lina with the A5, A7 and A6-ripple outcome, and the move of A3, I1–I3, A1, A2, A4 and A6's non-ripple parts to Spec 132. `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` § E: the dated partial-take line.

## 2. Targeted tests run

- `npx jest --config jest.functional.config.js src/components/__tests__ src/validators`: 29 suites, 736 tests, pass.

## 3. Application-time adaptations

- `BlendTokenUsageValidation.test.ts` L78–79 and `StemmaTokenUsageValidator.ts` L246 detect an Android "ripple workaround" by the text `rememberRipple`. With the function gone from components, their `not.toContain` assertions pass without being able to see a `ripple(` workaround. I did not edit them (`src/validators/**` is outside my scope, and whether `ripple(` should be a workaround pattern is a blend-governance call); flagged for Ada and Thurgood.
- `ripple` is imported from `androidx.compose.material.ripple` (the package the old import used), not from Material 3, so no dependency changes. Data verifies on CI.

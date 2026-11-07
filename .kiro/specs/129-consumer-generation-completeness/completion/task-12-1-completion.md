# Task 12.1 Completion: The two-sided theme-read guard

**Date**: 2026-11-07
**Task**: 12.1 (Spec 129, Unit 7, parent 12)
**Agent**: Lina (Sonnet, as planned)
**Branch**: `task/129-12-component-theme-reads`, cut from `3610718aa`

## 1. What changed

- **`src/components/__tests__/NativeThemeReads.guard.test.ts`** (new). `@category temporary`, retiring when `harness-ios-components` and `harness-android-components` are both required.
  - The declared set is built from `TokenFileGenerator.generateNativeThemes` on `realThemeContexts()`: Swift `var <member>: Color { get }`, Kotlin `val <member>: Color`. It imports nothing from `scripts/harness/` (Ada).
  - Side one: every `theme.<member>` read in a `platforms/ios/*.swift` or `platforms/android/*.kt` under `core/` names a declared member. Side two: no `DesignTokens.<declared member>` read.
  - A pinned list that only shrinks (`PINNED`): a violation off it fails, a stale entry fails, and a test shows it holds no `designtokens` entry. It is empty: no component reads an undeclared member, and neither re-pointed read is on it.
  - A bite in each direction on planted text, Swift and Kotlin; a count check that the scan finds real reads (more than 40 per platform).
- Not registered as a named instrument, so no Thurgood consult (Req 4.4).

## 2. Targeted tests run

- `npx jest --config jest.functional.config.js src/components/__tests__/NativeThemeReads.guard.test.ts`: 10 tests, pass.

## 3. Application-time adaptations

- The guard does not see a prefixed read (`ProgressBarTokens.theme.…`) or a `theme` out of scope, as Req 4.4 says. The iOS scope defects of row 15 are therefore invisible to it; they are repaired in 12.2 and accepted by the harness.
- The instruments block was committed before this subtask's code (`5eb4ae31b`); a draft of the guard sat uncommitted in the worktree when it was written (stated in the block).

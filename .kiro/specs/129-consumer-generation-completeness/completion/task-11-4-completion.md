# Task 11.4 Completion: Re-baseline the 094 fixtures; the real-definition tests

**Date**: 2026-11-07 · **Task**: 11.4 (Spec 129, Unit 6, parent 11) · **Agent**: Ada (Sonnet) · **Branch**: `task/129-11-native-theme-emission`

## 1. What changed
- `SwiftThemeTypes.test.ts` and `KotlinThemeTypes.test.ts` are rewritten, not patched: Spec 094's cases built `rgba(…)` fixtures and asserted its protocol-per-name, unsuffixed single-mode structs and `Local<ABBR>Theme`. They now run on the repository's real token definitions (`src/generators/__tests__/helpers/realThemeContexts.ts` builds the four contexts as `generateTokenFiles` does) and assert the exact-set, naming, family, provider, selection, default and no-unresolved criteria. **The U6 PR body names this re-baseline.** `ModeAwareGeneration.test.ts` and `WcagValueInfrastructure.test.ts` (Spec 080) are re-based on the instance model for the same reason.
- `generateAbort`, `package-drift-validation` and the other suites needed no change except `package-drift-validation`, which stays red until Lina's 11.5 re-points `ProgressPaginationBase.ios.swift` (`DesignTokens.colorScrimStandard`).
- Out of Task 11's list but needed for the iOS token module to compile (row 4): `src/build/platforms/iOSMotionTokenFormatter.ts` now gives `PiecewiseLinearEasing` `==` and `hash(into:)`; its two list entries are removed in the same diff.

## 2. Targeted tests run
`npm test` → 10,058 passed, 1 failed (`package-drift-validation`, above) at `ded1dc74a`; `npm run test:scripts` 1,415 passed; `swiftc` clean. Harness run 42402006748 at `2db956698`: `harness-android-tokens` PASS (23/23, probe read counts 443, 248, 1 and 5, `theme instances: 4 of 4`); `harness-ios-tokens`, after its six probe entries were added, expected to match.

## 3. Application-time adaptations
none to the design. The component contexts' lists are Lina's (11.5); the run lists the entries that go stale (59 iOS, all row 2 and row 15) and the five newly revealed (`VisualStateStyles.swift` missing `theme` argument ×2, `NavHeaderBase.ios.swift` `systemThinMaterial`, two `onMoveCommand`, `ProgressPaginationBase.ios.swift` `colorScrimStandard`) and one Android (`AvatarPreview.kt` `color_feedback_warning_text`).

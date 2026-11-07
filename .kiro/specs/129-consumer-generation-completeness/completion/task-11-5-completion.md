# Task 11.5 Completion: Row 12 item 3 colours, Button-CTA bare reads, the two re-points, the `LocalDPTheme` imports, the row 2 and row 15 list removals

**Date**: 2026-11-07
**Task**: 11.5 (Spec 129, Unit 6, parent 11)
**Agent**: Lina (Sonnet, as planned)
**Branch**: `task/129-11-native-theme-emission-lina`, cut from `82e4dc588`; code `24f66dbaa`

## 1. What changed

- **`LocalDPTheme` import**: `import com.designerpunk.tokens.LocalDPTheme` added to the 25 Android component files that read `LocalDPTheme.current`; the import line is each file's only change outside the four files below.
- **Row 12 item 3**: `InputTextBase.android.kt` reads its 7 theme-varying colours from `val theme = LocalDPTheme.current` (`color_text_muted`, `color_text_default`, `color_action_primary`, `color_feedback_error_text`, `color_feedback_success_text`, `color_structure_border` for the retired `color.border`, `color_structure_canvas` for the retired `color.background`). `accessibilityFocusColor` binds to `DesignTokens.accessibility_focus_color`, which the index does not name `theme.`.
- **Button-CTA bare reads**: `getButtonCTAStyleConfig` takes the theme and reads `theme.color_action_primary`, `theme.color_structure_canvas` and `theme.color_contrast_on_dark`; its two `borderWidth = 0` become `0.dp` (the `Int` for `Dp` entry).
- **The two re-points**: `AvatarPreview.kt` `theme.color_feedback_warning_text` (with a `LocalDPTheme.current` in `ImageExamplesSection`); `ProgressPaginationBase.ios.swift` `theme.colorScrimStandard`.
- **Lists**: Android components 57 stale removed, none added; iOS components 59 stale removed (rows 2 and 15), 4 added under exception (c).

## 2. Targeted tests run

- `npm test`: 422 suites, 10,061 tests, pass (`package-drift-validation` green; its Progress-Pagination red cleared).
- Harness run 42403058832 at `24f66dbaa` (before the list edit): `harness-ios-tokens` PASS, `harness-android-tokens` PASS (23 expected, 23 observed each); the two component contexts failed on stale/new entries only. Re-run verdicts after the list commit are in the final report and Task 11's completion doc.

## 3. Application-time adaptations

- **Four new iOS entries**, none in 11.5's artifact files, tagged to `2026-11-07-native-component-repair-from-first-harness-run.md` (it can fire at 129's claims pass): `VisualStateStyles.swift` `missing argument for parameter 'theme'` x2; `NavHeaderBase.ios.swift` `ShapeStyle` has no member `systemThinMaterial`; `onMoveCommand(perform:)` unavailable in iOS in `NavSegmentedChoiceBase.ios.swift` and `NavTabBarBase.ios.swift`. The fifth new entry of run 42402345774, `colorScrimStandard`, is cleared by the re-point.
- No row 12 entry remains on the Android components list.
- iOS `cannot find 'theme' in scope` entries still observed in other components stay on the list under row 2; they are U7's.
- Nothing compiled here; the Kotlin and Swift edits are confirmed only by the harness.

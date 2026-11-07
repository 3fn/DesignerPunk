# Task 12.2 Completion: Row 16; the row 15 and row 2 repairs

**Date**: 2026-11-07
**Task**: 12.2 (Spec 129, Unit 7, parent 12)
**Agent**: Lina (Sonnet, as planned)
**Branch**: `task/129-12-component-theme-reads`, cut from `3610718aa`; code `dfdc47760`

## 1. What changed

- **Row 16.** `ProgressBarBase.ios.swift` drops `ProgressBarTokens.` and `ProgressBarTokens.in` from three reads (L54, L76, L77); `ProgressBarBase.android.kt` drops `ProgressBarTokens` from three (`ProgressBarTokenstheme.` at L92, L122, L161).
- **Row 15, iOS (six entries): scope errors, not name errors.** Each view reads `@Environment(\.dpTheme)`; the helper read a `theme` it did not have. The theme is passed in as `any DesignerPunkTheme`:
  - `ChipButtonStyle`, `ChipInputButtonStyle`, `ChipFilterButtonStyle` gain `let theme`, and their call sites pass it (4, 4 and 7 reads);
  - `mapCardBackgroundToColor` and `mapCardBorderColorToColor` in ContainerCardBase take `theme:` (5 reads; 3 call sites);
  - `ProgressConnectorColors.color(for:theme:)`, `ProgressNodeColors.backgroundColor(for:theme:)` and `foregroundColor(for:theme:)` (2 and 8 reads).
- **Row 15, Android (two entries).** `import com.designerpunk.tokens.DesignerPunkTheme` in `ContainerBase.android.kt` and `TokenMapping.kt`; nothing else (`ThemeEmitter.ts` L258 emits the class under that name for every consumer name).
- **The Android twins (repair record § E), option (ii-prime).** The same shape, `theme: DesignerPunkTheme` passed to the helper: `ContainerCardBase` (5), `ProgressIndicatorConnectorBase` (2), `ProgressIndicatorNodeBase` (8), `ButtonIcon` (6), `InputCheckboxBase`'s `CheckboxBox` (1), `InputRadioBase`'s `RadioCircle` and preview (4). Left for Spec 132: Avatar (5), Checkbox-Legal (1), Radio-Set (1).
- **Lists, in this diff.** `harness-ios-components.tsv`: 8 removed (the six row-15 entries and Progress-Bar's two). `harness-android-components.tsv`: 9 removed (two row-15, Progress-Bar's one, six § E twins), then 32 more after dispatched run 42411441442 reported them `stale` (listed, not observed): 29 in Container-Base (`Unresolved reference 'color_*'` cascades from the missing `DesignerPunkTheme` import, in `ContainerBase.android.kt` and `TokenMapping.kt`) and 3 in Progress-Bar-Base (the `semantics`/`then` inference cascade of the malformed prefix). All 32 were tagged to the repair record, section F; none to row 15. **None added**, and the lists hold no entry tagged to row 15, row 2 or row 16.

## 1a. Scope folded in after the post-MIDPOINT message (amendment 9's message-keyed row 2)

The coordinator's scope update (row 2 keyed by message, not tag; pattern `Q` of `crossread-lina.md` § 1; U7 takes all of cause E and Ada's 8 named keys) added work after the first dispatch:
- **iOS `VisualStateStyles.swift`** (`missing argument for parameter 'theme' in call`, 2 diagnostics): `calculatePaddingBlock(for:theme:)` and `calculatePaddingBlock(for:error:theme:)` take the theme; the view passes it.
- **Android `Avatar.android.kt`**: `val theme = LocalDPTheme.current` and its import (5 `'theme'` reads); `borderColor` reads `theme.color_structure_border.copy(alpha = AvatarTokens.opacityHeavy)`, as `Avatar.ios.swift` does.
- **Android Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base**: the 7 `XTokens.backgroundColor`/`textColor`/`iconColor` reads (empty objects holding only comments) become `theme.` reads, the same members the iOS files read: `color_structure_surface`, `color_text_default`, `color_feedback_notification_background`/`_text`, `color_icon_default`.
- **Android `InputCheckboxLegal`, `InputRadioSet`**: the object getters that read a `theme` they do not hold are removed, and the composable (which holds `theme`) reads `theme.color_text_muted` / `theme.color_feedback_error_text`.
- **Android `ChipFilter.android.kt`**: two top-level imports of `color_feedback_select_*` (not top-level names) removed; the file reads them through `theme.`.
- **Lists**: iOS 1 and Android 13 more entries removed (all matched `Q` or were the 8 named keys; none added).

## 2. Targeted tests run

- `npx jest --config jest.functional.config.js src/components/__tests__ src/validators scripts/harness`: pass.
- `swiftc -parse` on the seven edited Swift files: 0 errors. The local Xcode (27.2) is not the pin (26.6), so the iOS lane cannot run here; compile verdicts come from the dispatched run.
- Nothing Kotlin compiled here.

## 3. Application-time adaptations

- None of the eight keys is retagged; each is removed, with no added line tagged to row 15 or row 2.
- The 12.1 guard cannot see these failures (they are scope defects, not name defects), as predicted.
- No `Input-Text-Base/platforms/ios/**` edit, so Kenya's precondition does not fire.

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
- **Lists, in this diff.** `harness-ios-components.tsv`: 8 removed (the six row-15 entries and Progress-Bar's two). `harness-android-components.tsv`: 9 removed (two row-15, Progress-Bar's one, six § E twins). **None added**, and the lists hold no entry tagged to row 15, row 2 or row 16.

## 2. Targeted tests run

- `npx jest --config jest.functional.config.js src/components/__tests__ src/validators scripts/harness`: pass.
- `swiftc -parse` on the seven edited Swift files: 0 errors. The local Xcode (27.2) is not the pin (26.6), so the iOS lane cannot run here; compile verdicts come from the dispatched run.
- Nothing Kotlin compiled here.

## 3. Application-time adaptations

- None of the eight keys is retagged; each is removed, with no added line tagged to row 15 or row 2.
- The 12.1 guard cannot see these failures (they are scope defects, not name defects), as predicted.
- No `Input-Text-Base/platforms/ios/**` edit, so Kenya's precondition does not fire.

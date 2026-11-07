# Task 9.2 Completion: Coupled component reads (I-1, I-2, `fontWeight`, the composite's reads, item 3's constants); the two guards

**Date**: 2026-11-07
**Task**: 9.2 (Spec 129, Unit 4, parent 9)
**Agent**: Lina (Sonnet, as planned)
**Branch**: `task/129-9-native-type-table-lina`, cut from `25fb4b7ac`; code `d9bb5404b`

## 1. What changed

- **I-1 (sizing is `Dp`)**: `.dp` removed at the 16 sites: Avatar-Base 6, Button-CTA 7, Nav-TabBar-Base 2 (`dotSize`, L367 and L370), Progress-Bar-Base 1 (`barHeight`).
- **I-2 (fontSize is `TextUnit`)**:
  - groups B: Chip-Base, Chip-Filter and Chip-Input read `font_size_075` bare; `lineHeight = font_size * line_height` is a `TextUnit`. The six badge `minWidth` sites keep today's value, now `(font_size.value * line_height).dp` (design § 5).
  - group C: the badge size configs, checkbox, radio, radio-set, legal-checkbox and segmented-choice font-size properties are `TextUnit` and read bare.
  - `Input-Text-Base`, item 3's non-colour constants: typography (16, from the `typography_*` composites), spacing, border, radius, icon, tap area, focus width and offset, and `motionFloatLabelDuration` are bound to `DesignTokens`. The 8 colour constants stay bodyless (they wait on the theme surface).
- **Composite reads**: `Button-VerticalList-Set` reads `typography_body_sm.fontSize` and `.fontWeight` as the `TextStyle` fields they are. The other composite reads (Button-CTA, Button-VerticalList-Item, Nav-Header-Page) compile unchanged against `TextStyle`.
- **iOS**: `NavSegmentedChoiceBase.ios.swift` `fontWeight` is `Font.Weight`.
- **iOS font family** (coordinator note, Kenya): no iOS component reads a font family (`grep -rniE "fontFamily|Font\.custom" src/components --include='*.swift'` finds nothing), so there is no `nil` branch to write.
- **Guards**: `AndroidSizingDpReads` passes unchanged (its two-sided flip did its job). `AndroidDpTokenReads` knows `TextUnit`: bare `.sp`/`.dp` after `font_size_*` is wrong (`.value` is sanctioned), no `*FontSize` may be declared `Float`, and its group-B pin is empty. Three new self-tests.
- **Lists**: 26 stale Android entries and 1 stale iOS entry removed; `Property must be initialized.` in `InputTextBase` 34 -> 8 (colours). Two entries newly revealed in `ButtonVerticalListSet.android.kt` (`Int` for `Color`; the `Text` overload candidates), under exception (c), tagged to the component-repair record. No entry on `harness-android-components` is tagged to row 12 for groups B, C or item 3's non-colour constants.

## 2. Targeted tests run

- `npm test`: 420 suites, 10,032 tests, all pass (the two MCP availability suites needed `mcp-server` built in the fresh worktree). The two guards: 6 + 9 cases, pass.
- Harness: run 42389019355 at `d9bb5404b` (before the list edit): tokens contexts PASS; components contexts FAIL on stale entries only (the list edit is the next commit). The re-run verdicts are in the PR's task-9 completion doc.

## 3. Application-time adaptations

- The harness compiles Kotlin; nothing here did. The Input-Text-Base binding and the `NavSegmentedChoiceBase` height expression are written against the generated types and unconfirmed until a run.
- `Nav-SegmentedChoice-Base` `segmentHeightDp` changed from `with(density) { (...).toDp() }` to `(fontSize.value * lineHeight).dp + blockPadding * 2`, because the old expression added `Dp` to `Float`.
- The label offset in `InputTextBase` is `fontSize.value * lineHeight.value` dp plus the grouped gap. The old `Dp` line height was a placeholder; iOS has the ratio-plus-points defect Kenya carried in the repair record (`InputTextBase.ios.swift` L185), which is not mine to change in this task.
- `AndroidSizingDpReads.test.ts` keeps its `FLOAT_CARRIERS` entries: they now detect a regression to `.dp`, so they were not emptied.

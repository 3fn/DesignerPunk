# The native component tier does not compile: the component-repair record, from the harness's first full run

**Date**: 2026-11-07
**Filed by**: Lina, the owner. This record carries Spec 129 Requirement 1.5, under Peter's ruling (a), received 2026-11-07T02:04:38Z: "a; blend entries fine". That ruling is recorded in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-ruling-component-repair-record-timing.md`, on branch `task/129-tasks-amendment-5` at `34ea1bf48`. The ruling files this record now, in a record-only PR to `main` merged before U1's component lists commit. It is sized at the first run after U4 merges, as planned.
**Owner**: Lina (the component files). **Verifiers**: Kenya (iOS), Data (Android).
**Class**: P1 consumer-blocking · defect *(set 2026-11-07, Lina, rule 12. An iOS or Android consumer who builds the shipped component source meets every entry below as a compile error. This is the same reasoning as `2026-10-24-android-component-unit-type-mismatches.md` and `2026-11-06-android-components-do-not-import-localdptheme.md`. Native ships as labelled reference source (release notes 15.0.0 and 16.0.0), so no reader is misled about it building, and that keeps it out of P0.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's CLOSEOUT claims pass. The pass reads Requirement 1.5 and Task 18's criterion that this record is at the root, that its Trigger can fire, and that the component entries 129 leaves are tagged to it. The act owed there is my re-rule to the spec that receives what 129 does not close, Spec 132, which has no folder yet. This follows the records that stay on `completion/claims-pass.md` by design (tasks.md § "Merge preconditions" item 3). Items fixed before then are marked here with dated lines.

---

## Source

- **The run**: run 42324880305, Spec 129 U1's first full run, at unit `cc2e71a51`. Its contexts are `harness-ios-components` and `harness-android-components`. Both reached the comparator; the only check that failed was `format`, because the expected lists were not yet committed.
  - The comparator observed 172 diagnostics on iOS and 436 on Android. VERIFIED from the artifacts' `compare.txt`.
- **The keys**: Thurgood's staged component lists: 115 iOS entries, 213 Android entries. Their counts sum to the comparator's 172 and 436 exactly. VERIFIED.
  - I checked counts against the raw logs, the artifacts `harness-out-harness-ios-components` (`logs/C.txt`) and `harness-out-harness-android-components` (`gradle.txt`). Samples:
    - 34 `Property must be initialized.` in `InputTextBase.android.kt`;
    - one `Syntax error: Unclosed comment.` at `VisualStateStyles.kt` 586:1;
    - 3 `rememberRipple`;
    - 3 iOS `scale096`.

  Each matches its list count. VERIFIED.
- **Unsized** (Requirement 1.5): rows 4 and 6 still mask errors in this run. The sections below are causes as read at this run, and their counts will move. The size is taken at the first run after U4 merges. I add it here as a dated line, with each section's new count.

## Routing: entries that do not tag to this record

Thurgood tags the lists from this table. Every other component entry of run 42324880305 tags to this record.

| Entries | Platform | Count (entries / diagnostics) | Tag to | Why |
|---|---|---|---|---|
| `dpTheme` / `LocalDPTheme` reads, as Thurgood tagged them | iOS / Android | 59 / 95 · 27 / 29 | `2026-06-28-spec-094-platform-theme-emission-unwired.md` (row 2) | theme emission, U6 |
| Progress-Bar theme reads | iOS / Android | 2 / 3 · 1 / 3 | `2026-11-04-progress-bar-native-theme-reads-malformed.md` (row 16) | U7 |
| `InputTextBase.android.kt`: `Property must be initialized.`, `Const 'val' must have an initializer.`, the `Float.sp` candidate error | Android | 3 / 51 | `2026-10-24-android-component-unit-type-mismatches.md` (row 12) | its item 3 |
| `ButtonCTA.android.kt`, all four keys (the bare `colorActionPrimary`, `colorBackground`, `colorContrastOnDark` reads, and `Int` for `Dp`) | Android | 4 / 12 | row 12 | its Button-CTA bare reads |
| `rememberRipple` deprecation (Button-Icon, Input-Checkbox-Base, Input-Radio-Base) | Android | 3 / 3 | `2026-10-18-drawn-control-drift-ios-android-web.md` (row 14) | its A5, A6 (ripple), A7 |
| `src/blend/ThemeAwareBlendUtilities.*`: `darkerBlend`, `lighterBlend`, `saturate`, `desaturate` | iOS / Android | 4 / 10 · 4 / 10 | `2026-06-24-blend-system-architecture-and-oklch-alignment.md` | not component files; Ada's, per Ada, and accepted by Peter ("blend entries fine") |
| `cannot find 'ButtonIconTokens'`, `'VerticalListItemTokens'` (iOS); `Unresolved reference 'ButtonIconTokens'`, `'AvatarTokens'`, `'GeneratedAvatarTokens'` (Android) | iOS / Android | 2 / 5 · 3 / 6 | `2026-10-02-consumer-generation-completeness-spec.md` (the charter) | item (ii), the component tier reaching `generate`, clearing at U8; per Ada |

**What tags here**: 48 iOS entries (59 diagnostics) and 168 Android entries (322 diagnostics). These are the 54 iOS and 185 Android untagged entries of the staged lists, less the 6 iOS and 17 Android entries routed above.

## The causes, with counts at run 42324880305

Counts are entries / diagnostics. Each section is a cause as read from the message and the source, not a fix plan. Where a cause is likely a follow-on of another error, it says so, and the U4 sizing confirms or moves it.

### A. Missing imports in Android component files: 15 / 31

- Unresolved Compose or Android names:
  - `LocalContext` and `Settings` (Input-Checkbox-Base, Input-Radio-Base);
  - `snap` (same two files);
  - `animateColorAsState` (Input-Text-Base);
  - `CompositionLocalProvider` (Icon-Base, with its follow-on "@Composable invocations can only happen from the context of a @Composable function");
  - `Modifier.clip` (Container-Card-Base), `Modifier.width` (Nav-TabBar-Base) and `blur` (Nav-SegmentedChoice-Base).
- `Unresolved reference 'DesignTokens'` in `NavHeaderBase.android.kt` (2), `NavHeaderPage.android.kt` (5) and `ProgressBarBase.android.kt` (6). VERIFIED: none of the three imports `com.designerpunk.tokens`.
- The `LocalDPTheme` import is a separate record, `2026-11-06-android-components-do-not-import-localdptheme.md`, fixed at U6.

### B. `VisualStateStyles.kt`: an unclosed comment and its cascade (Android, Button-VerticalList-Item and -Set): 17 / 50

- `Syntax error: Unclosed comment.` at `Button-VerticalList-Item/platforms/android/VisualStateStyles.kt` 586:1. The file has 585 lines, so a comment opened earlier never closes. VERIFIED from the log and the line count. Where it opens is UNVERIFIED.
- The likely follow-ons, because they are declared in that file:
  - `Companion` (8);
  - `VisualState` (11 in the Item, 7 in the Set);
  - `CheckmarkTransition` (3 + 5);
  - `computeStyles`, `checkmarkVisible`, `borderColor`, `borderWidth`, `labelColor`, `iconColor`, `fontSize`, `fontWeight`, `calculatePaddingBlock` and `accessibilityStateDescription`.

  Which of these clear when the comment closes is UNVERIFIED.

### C. Duplicate, conflicting or private declarations: iOS 28 / 37, Android 69 / 125

- **Container-Base, iOS**:
  - `TokenMapping.swift` redeclares 11 names that the generated tokens also declare (`invalid redeclaration of 'spaceInset050'`, `'radius100'`, `'shadowContainerX'`, …);
  - it cannot find the types `BorderRadiusValue`, `BorderValue`, `LayeringValue` and `PaddingValue`;
  - `ContainerBase.ios.swift` reads 11 names `private` to another declaration (`'spaceInset300' is inaccessible due to 'private' protection level`, `zIndex*`, `border*`, `radius050`);
  - `motionFocusTransition` is ambiguous.
- **Container-Card-Base, iOS**: `invalid redeclaration of 'motionFocusTransition'`.
- **Container-Base, Android**: `TokenMapping.kt` (33 / 84) and `ContainerBase.android.kt` (24 / 29), the same shape: private or duplicated token shims.
- **`accessibilityFocusColor`, `accessibilityFocusOffset` and `accessibilityFocusWidth`**: declared top-level in both `ContainerCardBase.android.kt` and `InputTextBase.android.kt`, in the same package. That gives "Conflicting declarations" and "Overload resolution ambiguity", 12 entries.

### D. Token names read at a root the generated tokens do not hold: iOS 5 / 5, Android 2 / 2

- **iOS `type 'DesignTokens' has no member 'scale096'`**: Button-Icon L270, Input-Checkbox-Base L364 and Input-Radio-Base L327. `scale100` likewise, in Button-Icon. The index names these `Scale.scale096` and `Scale.scale100` on iOS (`token-index/primitives.yaml` L2917–2934). VERIFIED.
- **iOS `cannot find 'spaceGroupedMinimal' in scope`** (Input-Text-Base): a bare read of a semantic the index holds.
- **Android `Unresolved reference 'color_feedback_select_background_rest'` and `'…_text_rest'`** (Chip-Filter): imported as top-level names from `com.designerpunk.tokens`. Whether they are colour semantics that become `theme.` reads at U6 is UNVERIFIED.

### E. `theme` read outside the composable that declares it (Android): 9 / 33

`Unresolved reference 'theme'` in Avatar-Base (5), Button-Icon (6), Container-Card-Base (5), Input-Checkbox-Base (1), Input-Checkbox-Legal (1), Input-Radio-Base (4), Input-Radio-Set (1), Progress-Indicator-Connector-Base (2) and Progress-Indicator-Node-Base (8).
- Example: `ProgressIndicatorNodeBase.android.kt` L126–141 reads `theme.color_progress_*` in a helper function, while `val theme = LocalDPTheme.current` is declared at L171 in another. VERIFIED.
- `Avatar.android.kt` declares no `theme` at all. VERIFIED.
- Emitting `LocalDPTheme` (U6) does not fix these. They are Q13 colour reads that Task 12 (U7) may take; if it does, I mark them here.

### F. Type inference on an unresolved or mis-typed receiver (Android): 28 / 47

- The messages are `Cannot infer type for type parameter 'K'` / `'V'` / `'T'` / `'B'` / `'R'`, `This declaration needs opt-in … ExperimentalStdlibApi`, and `Map.Entry<uninferred …>` mismatches. There is also one "Type checking has run into a recursive problem" in Badge-Label-Base.
- Example: `.copy(alpha = …)` on a receiver Kotlin cannot type, so it resolves to the stdlib `Map.Entry.copy`:
  - `Avatar.android.kt` L390, `AvatarTokens.borderColor.copy(…)`;
  - `NavTabBarBase.android.kt` L187, `theme.color_structure_canvas.copy(…)`;
  - `ChipFilter.android.kt` L218; `InputCheckboxBase.android.kt` L473; `ProgressIndicatorLabelBase.android.kt` L107.

  VERIFIED by reading those lines.
- These are likely follow-ons that clear when the receiver resolves (row 2 at U6, item (ii) at U8). They tag here until the U4 sizing shows which remain.

### G. `BuildConfig` (Android): 3 / 3

`Unresolved reference 'BuildConfig'` in Progress-Pagination-Base, Progress-Stepper-Base and Progress-Stepper-Detailed. A library component reads a generated build class that a consumer's module may not have.

### H. Members not found (Android): 11 / 15

- `backgroundColor`, `textColor` and `iconColor` on the Badge component-token objects (Badge-Count-Base, Badge-Count-Notification, Badge-Label-Base). For example, `BadgeCountBaseTokens.backgroundColor`.
- `borderColor` (Avatar-Base), `reduceMotion` (Input-Radio-Base), and `color` and `opacity` (Nav-SegmentedChoice-Base).
- Whether the Badge reads name members the component tokens do not define, or members `generate` does not yet emit (item (ii), U8), is UNVERIFIED.

### I. Call sites that do not match the API they call: iOS 15 / 17, Android 14 / 16

- **iOS**:
  - argument order (`argument 'size' must precede argument 'icon'`, Badge-Label-Base; `'onMultiSelectionChange' must precede 'minSelections'`, Button-VerticalList-Set and its preview; `'accessibilityLabel' must precede 'interactive'`, Container-Card-Base);
  - extra arguments (`minHeight`, Nav-SegmentedChoice-Base; `width`, Nav-TabBar-Base);
  - generic parameters that cannot be inferred (Nav-Header-App, Nav-Header-Page);
  - `cannot find type 'IconBaseName'` and `type 'String' has no member 'chevronLeft'` (Nav-Header-Page);
  - return-type mismatches in Button-VerticalList-Item (`Animation.Type` for `Animation`; `T?` for `VisualStateStyles`; the `rest` contextual base).
- **Android**:
  - parameters that do not exist (`testTag`, `modifier`, `alpha`) or are missing (`color`);
  - argument type mismatches (`Modifier` for `Color`, `Any` for `Color`, `AnimationSpec<Float>` for `AnimationSpec<Dp>`, `DesignTokens.PiecewiseLinearEasing` for `Easing`, `Array<Pair<…>>` variance);
  - `Function invocation 'background(...)' expected`;
  - `Property must be initialized or be abstract` (Input-Radio-Base);
  - the `semantics` candidate (Progress-Bar-Base);
  - the `plus` overloads (Progress-Pagination-Base).

## Not a compile entry, carried here

- **`InputTextBase.ios.swift` L185** (Kenya, `feedback/tasks.md` `[KENYA R1]`, VERIFIED by reading) reads `-(DesignTokens.typographyLabelMd.lineHeight + DesignTokens.spaceGroupedTight)`.
  - `lineHeight` is a ratio (design § 5), so this adds a ratio to points. It compiles under any type table.
  - Only a render test sees it, which is Spec 132's.
  - It has no list entry, and it closes with this record's other items.

## Close

- **Sizing**: a dated line here at the first run after U4 merges, with each section's count at that run and the sections re-cut if the unmasked errors call for it. (Requirement 1.5; tasks.md § "Unit preconditions", as amended by tasks amendment 5.)
- **Items fixed inside 129**: each gets a dated line naming the PR, and their entries leave the lists in that PR.
- **At CLOSEOUT**: the claims pass reads this record (Trigger above). I re-rule its Trigger to Spec 132's event, with a dated reason, in that PR or an owner PR merged before it. The record closes under rule 5 when its items are fixed.

Rule 9 applies to every later edit.

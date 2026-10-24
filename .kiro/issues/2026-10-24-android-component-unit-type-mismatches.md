# Android Components Read Generated Tokens at the Wrong Unit Type, and Input-Text-Base Declares Its Token Constants Without Values

**Date**: 2026-10-24
**Filed by**: Lina, under rule 10, from the full sweep of `platforms/android/*.kt` done for the sizing interim fix (branch `fix/android-sizing-dp-interim`), and carrying item 3 out of `2026-10-23-component-token-usage-findings-from-drift-pass.md`
**Owner**: Lina (the component reads). The generator's emitted types are Ada's, through her Spec 129 inbound on the sizing class fix (drafted with her 2026-10-24), which names the fontSize question below.
**Class**: P1 consumer-blocking · defect *(set 2026-10-24, Lina, rule 12. Each site below breaks a Kotlin language rule, read from the source and the generated `dist/DesignTokens.android.kt`, not from a build: no Kotlin toolchain is available here. Native ships as reference source (16.0.0 entry), so no reader is misled about it building, which keeps this out of P0; it is P1 because an Android consumer who builds the source meets every one of these as a compile error.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in or left out with a reason. *(Set 2026-10-24, Lina, rules 1 and 9. The same token Ada's P1 Kotlin-output records carry (`2026-10-20-kotlin-output-no-import-block.md`): sites B and C below cannot be fixed on the component side until Spec 129 fixes the generated type for `fontSize`, and requirements.md is the computable event that owes that decision. Group A does not wait on it; it can ride an interim PR on Peter's go, and the owner re-rules this line if it does.)*

---

## What is wrong

The generator emits each Android token family at one Kotlin type (`AndroidFormatGenerator.getKotlinType`, `src/providers/AndroidFormatGenerator.ts` L151–173): spacing, radius, tapArea, borderWidth and **fontSize** as `Dp` (`val font_size_075 = 14.dp`); sizing, lineHeight, opacity and others as `Float`. Kotlin converts neither way implicitly, and `.dp` and `.sp` exist on `Int`, `Float` and `Double`, not on `Dp`. The component tier was written as if fontSize were `Float` and, in places, as if spacing and border widths were numbers.

The sizing half (sizing is `Float`, components passed it to `Dp`) is items 5 and 7 of the drift-pass record and is fixed by the interim PR. This record holds the rest. Found by a text scan of every `platforms/android/*.kt` against the generated types, then read by hand; a lower bound, since a scan does not see every flow. The harness (Spec 129's first task) is what enumerates them for certain.

### Group A — `.dp` on a value that is already `Dp` (14 sites, 3 files). Wrong whatever 129 decides.

| File | Lines | Read |
|------|-------|------|
| `Button-VerticalList-Item/platforms/android/VisualStateStyles.kt` | 254, 263, 272, 281, 290, 300, 446 | `DesignTokens.border_default.dp`, `border_emphasis.dp` |
| `Nav-Header-Base/platforms/android/NavHeaderBase.android.kt` | 45 | `DesignTokens.tap_area_recommended.dp` |
| `Nav-TabBar-Base/platforms/android/NavTabBarBase.android.kt` | 280, 281, 318, 319, 355, 369 | `NavTabBarTokens.minTapWidth/minTabHeight/activePaddingInline/iconSize/activePaddingBottom.dp`, each holding a `Dp` token |

Fix: delete the `.dp`. Nav-TabBar's `dotSize.dp` (L367, L370) is correct today, because `dotSize` is a sizing `Float`; the drift-pass record's reading that Nav-TabBar "reads correctly" holds for `dotSize` only.

### Group B — `.dp` or `.sp` on a `Dp` fontSize (12 sites, 5 files). Depends on 129's fontSize type.

| File | Lines | Read |
|------|-------|------|
| `Chip-Base/platforms/android/ChipBase.android.kt` | 259, 260 | `font_size_075.sp`; `(font_size_075 * line_height_075).sp` |
| `Chip-Filter/platforms/android/ChipFilter.android.kt` | 312, 313 | same |
| `Chip-Input/platforms/android/ChipInput.android.kt` | 258, 259 | same |
| `Badge-Count-Base/platforms/android/BadgeCountBase.android.kt` | 158, 167, 176 | `minWidth = (font_size_* * line_height_*).dp` |
| `Badge-Count-Notification/platforms/android/BadgeCountNotification.android.kt` | 188, 197, 206 | same |

### Group C — a `Dp` fontSize read into a `Float` or `TextUnit` position (26 sites, 10 files). Depends on 129's fontSize type.

| File | Lines | Read |
|------|-------|------|
| `Badge-Count-Base/…/BadgeCountBase.android.kt` | 153, 162, 171 | `fontSize = font_size_*` into `fontSize: Float` |
| `Badge-Count-Notification/…/BadgeCountNotification.android.kt` | 183, 192, 201 | same |
| `Badge-Label-Base/…/BadgeLabelBase.android.kt` | 152, 161, 170 | same |
| `Input-Checkbox-Base/…/InputCheckboxBase.android.kt` | 142–144, 193–195, 296 | `labelFontSize: Float get() = …font_size_*`, `helperFontSize: Float = font_size_050` |
| `Input-Checkbox-Legal/…/InputCheckboxLegal.android.kt` | 106 | `requiredFontSize: Float = font_size_050` |
| `Input-Radio-Base/…/InputRadioBase.android.kt` | 137–139, 248 | as Input-Checkbox-Base |
| `Input-Radio-Set/…/InputRadioSet.android.kt` | 111 | `errorFontSize: Float = font_size_050` |
| `Nav-SegmentedChoice-Base/…/NavSegmentedChoiceBase.android.kt` | 109, 110 | `fontSize: Float get() = …font_size_*` |
| `Progress-Indicator-Label-Base/…/ProgressIndicatorLabelBase.android.kt` | 49 (used 92, 105) | `labelFontSize = font_size_075` passed as `Text(fontSize = …)`, a `TextUnit` |

If 129 emits fontSize as `Float`, groups B and C compile as written and only group A remains. If it emits `TextUnit` (`.sp`) or keeps `Dp`, all of B and C change on the component side. Which type is Ada's call (Data consulted); the component side follows it.

### Item 3, carried here — Input-Text-Base declares 34 token constants with no value

Item 3 of the drift-pass record said `InputTextBase.android.kt` L466–473 "likely does not compile". **Confirmed by reading, and wider than cited**: L443–495 declare 34 top-level properties with no initializer (`private const val typographyInputFontSize: Float // Generated from …`, `private val colorBorder: Color // Generated from color.border`, and so on), under a comment saying they "will be generated by the build system". No build step writes them (none in `src/build`, `src/providers` or `src/generators`); the block dates from 2025-11-30 (`0b11ce7a4`). Kotlin requires a top-level property to have an initializer, and a `const val` a constant one, so each line is a compile error. Also: `typographyLabelMdLineHeight` is declared `Dp` and used as `.sp` (L348). `colorBorder` and `colorBackground` name the retired `color.border` and `color.background`.

**Not fixed in the interim PR**, because the fix is not contained: 8 of the 34 are theme-varying colours, which need the theme surface that `2026-06-28-spec-094-platform-theme-emission-unwired.md` and `2026-09-26-native-component-theme-hardcoding.md` track; 16 are typography values whose source, `font_size_*`, is the fontSize type question above. Fix shape: bind each constant to `DesignTokens` (or the theme) once 129 settles the fontSize type and theme emission, and drop the retired colour names.

### Also seen, already tracked elsewhere

- Button-CTA's `typography: TextStyle` is assigned `DesignTokens.typography_button_md`, which is generated as `Typography(…)`, a type nothing defines (`2026-10-03-native-generator-findings-for-spec-129-intake.md` Item 1). The component side follows whatever 129 emits.
- `ComponentTokens.android.kt` reads `SizingTokens`, `SpacingTokens` and `BorderWidthTokens`, which do not exist (`2026-08-13-component-token-platform-references-noncompiling.md`).

## Closing

Group A closes by a component PR (delete `.dp`). Groups B and C and item 3 close by a component PR after Spec 129 fixes the fontSize type and theme emission. The record closes when all four are fixed, or are taken into Spec 129 with a reason recorded here.

*Signed: Lina, 2026-10-24.*

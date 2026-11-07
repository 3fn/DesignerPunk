# Ballot Measure: the per-family Android type statements in the platform implementation guidelines

**Date**: 2026-11-07
**Drafted by**: Lina (the text, § 3), as the guideline's owner; Thurgood holds the ballot record (Spec 129 Task 9, Req 6.9), at the sitting the U4 unit's merge opens.
**Status**: **DRAFT** — awaiting Peter's ratification. It SHALL read `**RATIFIED (Peter, <date>)**`, with his dated words, before U4's PR merges (Task 9's criterion; Task-Completion-Protocol § "Branch and PR Conventions", the merge-hold rule). Only Peter's dated words make it so: no agent writes RATIFIED on his behalf.
**Owner**: Thurgood (ballot record); Lina (the text and the guideline).
**Required reviewers**: **Ada** (the generator's owner: § 4 lists the checks against her branch); **Data** (the Android platform fact).
**Class**: LAW. The statements say how Android code must read tokens (no `.dp` on a `Dp`, no `.sp` on a `TextUnit`); they change what the guideline requires of component authors. The PR body's `**Edit kind**:` line is `governance/platform-implementation-guidelines.md — LAW (.kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md)`.
**Amends**: `governance/platform-implementation-guidelines.md`, the `android_patterns` section L734–L794 at `origin/main`, nine hunks, 18 lines out and 32 in (`git diff origin/main...cfab56c39 -- governance/platform-implementation-guidelines.md`).
**Base**: `origin/main` @ `b98f7c5eb`; the text is on `task/129-9-native-type-table-lina` @ `cfab56c39` (also the tip of `task/129-9-native-type-table`).
**Unit**: Spec 129 U4 (Task 9), `design.md` § 5 ("The native type table") and Req 6.9.
**Census**: not in scope — `governance/platform-implementation-guidelines.md` is not a file any registered check's command loads, and no `governance/classification-map.md` row names it in `checks` or `education`; no verdict or surface can change.

---

## 1. The gap

The guideline's Android section says spacing, radius, tapArea, borderWidth and layering are `Dp`, sizing is a `Float` that takes `.dp` at the read, and that fontSize "is emitted as `Dp` today; its Android type is an open decision". U4 (Task 9) changes the generator: sizing becomes `Dp`, fontSize `TextUnit` (sp), letterSpacing `TextUnit` (em), fontWeight `FontWeight`, fontFamily `FontFamily`, a percent radius `CornerSize`, typography `TextStyle`, shadow `ShadowToken`. The old statements would then tell a component author to append `.dp` to a `Dp` and `.sp` to a `TextUnit`, neither of which compiles. The guideline must say the new types in the same unit.

## 2. Before → after (the measure)

**Before** (the 18 lines the diff removes, at `origin/main`):

> **CRITICAL RULE**: Never append `.dp` to a `DesignTokens` value the generator emits as `Dp` (spacing, radius, tapArea, borderWidth, layering) when passing it to Compose functions. A `Float` token (sizing among them) takes `.dp` at the read; see "When `.dp` IS Required" below. *(corrected 2026-11-01: the rule read as covering every `DesignTokens` value; .kiro/issues/archive/2026-10-26-android-guidelines-spacing-float-dp-claim.md; prior text at 465af3544)*
> Modifier.padding(DesignTokens.space_200.dp)
> Arrangement.spacedBy(DesignTokens.space_300.dp)
> Arrangement.spacedBy(DesignTokens.space_300)
> **Why**: The Android generator emits spacing, radius, tapArea, borderWidth and elevation (layering) tokens as `Dp` values (`val space_200 = 16.dp`), so they pass straight to Compose layout functions (`padding()`, `size()`, `spacedBy()`), which take `Dp`. `.dp` is an extension on `Int`, `Float` and `Double`, not on `Dp`: `DesignTokens.space_200.dp` does not compile. Kotlin and Compose convert nothing implicitly. fontSize tokens are also emitted as `Dp` today; their Android type is an open decision, and the component lines that read them are pinned in `AndroidDpTokenReads.test.ts`. *(corrected 2026-10-30: the Android token types and the conversion claims in L744–L774, read against `src/providers/AndroidFormatGenerator.ts` `getKotlinType` and `formatKotlinValue`; .kiro/issues/archive/2026-10-26-android-guidelines-spacing-float-dp-claim.md; prior text at d34fc7786)*
> **When `.dp` IS Required**:
> On a token the generator emits as `Float`, when a `Dp` is wanted. Sizing is one (`const val size_500: Float = 40f`), as are lineHeight, density and letterSpacing. Convert at the read:
> ```kotlin
> Modifier.size(DesignTokens.size_500.dp)     // sizing is Float: .dp converts it
> val dimension: Dp = DesignTokens.space_200  // spacing is already Dp: no .dp
> ```
>
> The family-to-type table is `getKotlinType` in `src/providers/AndroidFormatGenerator.ts`. `AndroidDpTokenReads.test.ts` and `AndroidSizingDpReads.test.ts` (`src/components/__tests__/`) check component reads against the generator's actual output. The token compliance test is a separate check: it flags hard-coded literals such as `16.dp` (pattern `/(?<!\w)[1-9]\d*\.dp\b/`), not token reads.
>     
>     // Spacing tokens are already Dp: return them as Dp (no .dp)
> // Usage
> For an enum over sizing tokens (`Float`), return the `Float` and convert once: `val dp: Dp get() = value.dp`.
> **Why Android-Specific**: iOS uses `CGFloat` (no unit suffix), Web uses CSS custom properties (units baked in). Only Android splits its tokens between `Dp` and `Float`, so only an Android call site has to know which family it reads.

**After** (Lina's text, quoted from `cfab56c39`; it replaces the CRITICAL RULE paragraph, the table-less type section and the enum pattern, and is found verbatim in the file there):

> **CRITICAL RULE**: Never append `.dp` to a `DesignTokens` value the generator emits as `Dp` (spacing, radius, tapArea, borderWidth, layering, sizing), and never append `.sp` or `.dp` to a `fontSize` (`TextUnit`) when passing it to Compose functions. Each family below has one Kotlin type; read it at that type, and convert only where this section says so.
>
> **The per-family Android types** (`getKotlinType` and the composite formatters in `src/providers/AndroidFormatGenerator.ts`; `NativeTypeTable.test.ts` asserts one row each):
>
> | Family | Kotlin type | Example | Read it as |
> |---|---|---|---|
> | spacing, radius, tapArea, borderWidth, layering, sizing | `Dp` | `val space_200 = 16.dp` | straight into `padding()`, `size()`, `spacedBy()`; no `.dp` |
> | fontSize | `TextUnit` (sp) | `val font_size_100 = 16.sp` | straight into `fontSize =`; no `.sp`; `.value` for the number |
> | letterSpacing | `TextUnit` (em) | `val letter_spacing_100 = (0).em` | straight into `letterSpacing =` |
> | lineHeight | `Float` (ratio) | `const val line_height_100: Float = 1.5f` | `fontSize * lineHeight` gives a `TextUnit`; `.em` or `.value` as the position needs |
> | density, opacity, breakpoint, blur, other numbers | `Float` | `const val opacity_008: Float = 0.08f` | as a `Float`; `.dp` only where a `Dp` is wanted |
> | fontWeight | `FontWeight` | `val font_weight_500 = FontWeight(500)` | straight into `fontWeight =` |
> | fontFamily | `FontFamily` | `val font_family_body = FontFamily.SansSerif` | straight into `fontFamily =`; the brand name is in the trailing comment, not loaded |
> | radius in percent (`radius_half`) | `CornerSize` | `CornerSize(percent = 50)` | into `RoundedCornerShape(...)` |
> | color | Compose `Color` | Display P3 | per the colour section |
> | typography composite | `TextStyle` | `typography_label_md` | whole into `style =` or a `TextStyle` parameter; its `fontSize`, `fontWeight`, `lineHeight` (an `.em` `TextUnit`) and `letterSpacing` read straight into `Text(...)` |
> | shadow composite | `ShadowToken` | `shadow_container` | generated; `offsetX`, `offsetY`, `blur` and `opacity` are `Float`, `color` is a Compose `Color` |
>
> Non-constant types (`Dp`, `TextUnit`, `FontWeight`, `FontFamily`) are emitted as `val`, not `const val`, because Kotlin has no compile-time constant of those types.
>
> ❌ **WRONG**:
> ```kotlin
> Modifier.padding(DesignTokens.space_200.dp)         // Dp has no .dp
> Modifier.size(DesignTokens.size_500.dp)             // sizing is Dp now
> Text(fontSize = DesignTokens.font_size_075.sp)      // TextUnit has no .sp
> ```
>
> ✅ **CORRECT**:
> ```kotlin
> Modifier.padding(DesignTokens.space_200)
> Modifier.size(DesignTokens.size_500)
> Text(fontSize = DesignTokens.font_size_075,
>      lineHeight = DesignTokens.font_size_075 * DesignTokens.line_height_075)
> ```
>
> **Where a number is wanted** (a minimum width from type size, an animated size): take it with `.value` and convert once: `(DesignTokens.font_size_050.value * DesignTokens.line_height_050).dp`, or `animateFloatAsState(targetValue = token.value)` and `.sp` at the read. A component-local property that holds a font size is typed `TextUnit`, not `Float`.
>
> **When `.dp` IS Required**: on a `Float` (or `Int`) where a `Dp` is wanted. `lineHeight * fontSize.value` is one. Convert at the read.
>
> `AndroidDpTokenReads.test.ts` and `AndroidSizingDpReads.test.ts` (`src/components/__tests__/`) check component reads against the generator's actual output and flip if the emitted type changes. The token compliance test is a separate check: it flags hard-coded literals such as `16.dp` (pattern `/(?<!\w)[1-9]\d*\.dp\b/`), not token reads.
>
> **Pattern for Enums Returning Dp**:
> ```kotlin
> enum class SizeVariant {
>     SMALL, MEDIUM, LARGE;
>
>     // Spacing and sizing tokens are already Dp: return them as Dp (no .dp)
>     val dp: Dp
>         get() = when (this) {
>             SMALL -> DesignTokens.space_150
>             MEDIUM -> DesignTokens.space_200
>             LARGE -> DesignTokens.space_300
>         }
> }
>
> Modifier.size(SizeVariant.MEDIUM.dp)  // the enum's Dp property; no .dp on a token
> ```
>
> For an enum over font sizes, return `TextUnit`.

## 3. Application

Lina's text is already in her branch and in `task/129-9-native-type-table` (`cfab56c39`). On ratification the applying act is none beyond U4's merge: the PR carries the text and this record. If the generator's output changes between `cfab56c39` and U4's merge so that a statement is no longer true, the statement is re-cut by Lina and this ballot re-read before the merge.

## 4. Check against the generator (Thurgood, at `cfab56c39`)

Read against `src/providers/AndroidFormatGenerator.ts` and the tests, each claim of the table:

| Claim | Generator |
|---|---|
| spacing, radius, tapArea, borderWidth, layering, sizing → `Dp`, `val space_200 = 16.dp` | `getKotlinType` L183 (`Dp`); `formatKotlinValue` L252 (`${value}.dp`) |
| fontSize → `TextUnit` sp; letterSpacing → `TextUnit` em, `(0).em` | `getKotlinType` L191–193; `formatKotlinValue` L256 (`(${value}).em` or `.sp`) |
| lineHeight, density, opacity, breakpoint, blur, other → `Float`, `const val … : Float = 1.5f` | `getKotlinType` L194–196 and `default: 'Float'`; L174 and `${value}f` |
| fontWeight → `FontWeight(500)` | `getKotlinType` L199; L259 |
| fontFamily → `FontFamily.SansSerif`, the brand name in the trailing comment | L245 (`FontFamily.${androidFontFamilyMember(value)}`) and L166–168 |
| percent radius → `CornerSize(percent = 50)` | L160–162 |
| typography composite → `TextStyle`, its `lineHeight` an `.em` `TextUnit` | L554–559 |
| shadow composite → `ShadowToken` with `Float` offsets, blur, opacity and a Compose `Color` | L59–70 (`generateShadowTokenType`) |
| non-constant types emitted as `val`, not `const val` | L170–173 |
| colour → Compose `Color`, Display P3, per the colour section | `formatKotlinColor` (L793 example: `Color(…, ColorSpaces.DisplayP3)`); `getKotlinType`'s `'Int'` for colour is the legacy path and the statement does not rely on it |
| `NativeTypeTable.test.ts` asserts one row each; `AndroidDpTokenReads.test.ts` and `AndroidSizingDpReads.test.ts` check component reads; `TokenCompliance.test.ts`'s `/(?<!\w)[1-9]\d*\.dp\b/` flags literals | `src/generators/__tests__/NativeTypeTable.test.ts` (new in U4), `src/components/__tests__/AndroidDpTokenReads.test.ts`, `AndroidSizingDpReads.test.ts`, `TokenCompliance.test.ts` all exist at `cfab56c39` |

**No mismatch found.** The check is a read, not a run; `NativeTypeTable.test.ts`'s own assertions are Ada's.

## 5. Counter-argument, folded back

Counter: this is a design-system guideline edit riding a generator change, so it could be a PRE-DECLARED EXECUTION of design § 5 and need no ballot. **Folded in**: Task 9's criterion and Req 6.9 name the ballot, and the statements add requirements the design table does not state (the conversion rules, the "where a number is wanted" pattern, the `TextUnit` enum rule), so LAW is the safer kind. **What survives**: if Peter rules the statements are descriptions of the generator only, the PR's edit-kind line moves to CORRECTION or EXECUTION and the criterion's wording changes by a tasks amendment; that is his fork, not mine.

## 6. The question for Peter, and how his answer is recorded

The U4 PR body carries this line, verbatim:

`**Open for Peter**: Ratify the per-family Android type statements in governance/platform-implementation-guidelines.md as LAW (ballot .kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md; Lina's text at cfab56c39, checked against the generator in § 4)? This PR is not merged until your dated answer is in that ballot's Status.`

**Recording**: the session that receives his answer first edits this file's `Status` to `**RATIFIED (Peter, <date>)**`, quoting his words and the time (`date -u` at receipt), and commits it on U4's branch before the merge; the PR body then cites that commit. A merge never answers the question. If he modifies the text, Lina re-cuts it and the Status is written after her re-cut. If he rejects it, U4 does not carry the guideline hunks and the Task 9 criterion is amended.

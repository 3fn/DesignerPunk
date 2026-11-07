# Ballot Measure: the per-family Android type statements in the platform implementation guidelines

**Date**: 2026-11-07
**Drafted by**: Lina (the text, § 3), as the guideline's owner; Thurgood holds the ballot record (Spec 129 Task 9, Req 6.9), at the sitting the U4 unit's merge opens.
**Status**: **RATIFIED (Peter, 2026-11-07T17:00:13Z)**. Peter's words, verbatim: "yes, ratify; and scope the check". He was answering the orchestrator's question: "Do you ratify Lina's Android type statements as law?" The question was asked after #719 merged. The orchestrator recorded his answer, with the time from `date -u` on receipt.

*(Recorded 2026-11-07, by the orchestrator. **This ratification came after U4's merge.** #719 merged at 2026-11-07T16:52:22Z (`30e2f727b`), while this Status still read DRAFT, so for 7 minutes 51 seconds the measure was on `main` unratified. The merge did not answer the question, and this record does not treat it as an answer. Task 9's criterion, "Status reads RATIFIED (Peter) at U4's merge", was therefore not met at the merge. That is a finding for the CLOSEOUT claims pass. The prior Status read DRAFT, "awaiting Peter's ratification", at `30e2f727b`.)*
**Owner**: Thurgood (ballot record); Lina (the text and the guideline).
**Required reviewers**: **Ada** (the generator's owner: § 4 lists the checks against her branch); **Data** (the Android platform fact).
**Class**: LAW. The statements say how Android code must read tokens (no `.dp` on a `Dp`, no `.sp` on a `TextUnit`); they change what the guideline requires of component authors. The PR body's `**Edit kind**:` line is `governance/platform-implementation-guidelines.md — LAW (.kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md)`.
**Amends**: `governance/platform-implementation-guidelines.md`, the `android_patterns` section L734–L794 at `origin/main`, ten hunks, 18 lines out and 36 in (`git diff -U0 origin/main...2351e4b48 -- governance/platform-implementation-guidelines.md`; `--numstat` reads `36 18`). *(Amended 2026-11-07 after review: at `cfab56c39` it was nine hunks, 18 out and 32 in; the review changes in `aaebbc2da` add 10 lines and remove 6 of the draft's, a net 4 more.)*
**Base**: `origin/main` @ `e37bdce07` (the merge base of `task/129-9-native-type-table` at `2351e4b48`; the section is unchanged from the draft's base `b98f7c5eb`, `git diff b98f7c5eb e37bdce07 -- governance/platform-implementation-guidelines.md` empty). The text is on `task/129-9-native-type-table` @ `2351e4b48`, the merge of Lina's seat branch carrying `aaebbc2da` (her re-cut after review); the draft's text was `cfab56c39`.
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

**After** (Lina's text after review, quoted from `2351e4b48`, L734–L798; it replaces the CRITICAL RULE paragraph, the table-less type section, the enum pattern and the "Why Android-Specific" sentence, and is found verbatim in the file there). *(Amended 2026-11-07: the draft quoted `cfab56c39` and ended at the enum line, so it left out the changed "Why Android-Specific" sentence, which the Before quotes; this quote includes it. The review changes are Data's four wording fixes and the non-constant list, and Ada's four motion rows, § 7.)*

> **CRITICAL RULE**: Never append `.dp` to a `DesignTokens` value the generator emits as `Dp` (spacing, radius, tapArea, borderWidth, layering, sizing), and never append `.sp` or `.dp` to a `fontSize` (`TextUnit`) when passing it to Compose functions. Each family below has one Kotlin type; read it at that type, and convert only where this section says so.
>
> **The per-family Android types** (`getKotlinType` and the composite formatters in `src/providers/AndroidFormatGenerator.ts`; `NativeTypeTable.test.ts` asserts one row each):
>
> | Family | Kotlin type | Example | Read it as |
> |---|---|---|---|
> | spacing, radius, tapArea, borderWidth, layering, sizing | `Dp` | `val space_200 = 16.dp` | straight into `padding()`, `size()`, `spacedBy()`; no `.dp` |
> | fontSize | `TextUnit` (sp) | `val font_size_100 = 16.sp` | straight into `fontSize =`; no `.sp`; `.value` for the number |
> | letterSpacing | `TextUnit` (em) | `val letter_spacing_100 = (0).em` | straight into `letterSpacing =` |
> | lineHeight | `Float` (ratio) | `const val line_height_100: Float = 1.5f` | `lineHeight.em` for a relative `TextUnit`; `fontSize * lineHeight` for an absolute one (sp); `.value` for the `Float`. The two `TextUnit` forms differ: the composite's `lineHeight` is the `.em` form |
> | density, opacity, breakpoint, blur, other numbers, except motion (below) | `Float` | `const val opacity_008: Float = 0.08f` | as a `Float`; `.dp` only where a `Dp` is wanted |
> | duration (motion) | `Int` (ms), in `DesignTokens.Duration` | `val Duration150 = 150` | straight into `tween(durationMillis = ...)` |
> | easing (motion) | Compose `Easing`, in `DesignTokens.Easing` | `val EasingStandard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)` | straight into `tween(easing = ...)` |
> | scale (motion) | `Float`, in `DesignTokens.Scale` | `val Scale096 = 0.96f` | as a `Float` |
> | semantic motion | an `object` per token | `DesignTokens.MotionButtonPress` | `.duration` (`Int`) and `.easing` (`Easing`) |
> | fontWeight | `FontWeight` | `val font_weight_500 = FontWeight(500)` | straight into `fontWeight =` |
> | fontFamily | `FontFamily` | `val font_family_body = FontFamily.SansSerif` | straight into `fontFamily =`; the brand name is in the trailing comment, not loaded |
> | radius in percent (`radius_half`) | `CornerSize`, not a `Dp` | `CornerSize(percent = 50)` | pass it to a shape such as `RoundedCornerShape(...)`, not to a `Dp` parameter; `.dp` does not apply |
> | color | Compose `Color` | Display P3 | per the colour section |
> | typography composite | `TextStyle` | `typography_label_md` | whole into `style =` or a `TextStyle` parameter; its `fontSize`, `fontWeight`, `lineHeight` (an `.em` `TextUnit`) and `letterSpacing` read straight into `Text(...)`; `fontWeight` and `fontFamily` are nullable (`FontWeight?`, `FontFamily?`), so they fit `Text`'s nullable parameters but not a parameter typed `FontWeight` |
> | shadow composite | `ShadowToken` | `shadow_container` | generated; `offsetX`, `offsetY`, `blur` and `opacity` are `Float`, `color` is a Compose `Color` |
>
> Non-constant types, including `Dp`, `TextUnit`, `FontWeight`, `FontFamily`, `CornerSize`, `TextStyle`, `ShadowToken` and `Color`, are emitted as `val`, not `const val`, because Kotlin has no compile-time constant of those types.
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
> **Where a number is wanted** (a minimum width from type size, an animated size): take it with `.value` and convert once: `(DesignTokens.font_size_050.value * DesignTokens.line_height_050).dp`, or `animateFloatAsState(targetValue = token.value)` and `.sp` at the read. A result in `dp` ignores the user's font scale: use `.value ... .dp` only where a size that does not scale is intended (the badge minimum is one; whether it should scale is for Lina and Leonardo, Spec 132). A component-local property that holds a font size is typed `TextUnit`, not `Float`.
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
>
> **Why Android-Specific**: iOS uses `CGFloat` (no unit suffix), Web uses CSS custom properties (units baked in). Android has four distinct unit types (`Dp`, `TextUnit`, `Float`, `FontWeight`), so an Android call site has to know which family it reads.

## 3. Application

Lina's text is in `task/129-9-native-type-table` (`2351e4b48`; drafted at `cfab56c39`, re-cut after review at `aaebbc2da`). On ratification the applying act is none beyond U4's merge: the PR carries the text and this record. If the generator's output changes between `2351e4b48` and U4's merge so that a statement is no longer true, the statement is re-cut by Lina and this ballot re-read before the merge.

## 4. Check against the generator (Thurgood, at `cfab56c39`; re-read at `2351e4b48`)

Read against `src/providers/AndroidFormatGenerator.ts`, `src/build/platforms/AndroidMotionTokenFormatter.ts` and the tests, each claim of the table. Neither generator file changed between `cfab56c39` and `2351e4b48` (`git diff --stat cfab56c39 2351e4b48` over both is empty), so the line references hold at both heads:

| Claim | Generator |
|---|---|
| spacing, radius, tapArea, borderWidth, layering, sizing → `Dp`, `val space_200 = 16.dp` | `getKotlinType` L183 (`Dp`); `formatKotlinValue` L252 (`${value}.dp`) |
| fontSize → `TextUnit` sp; letterSpacing → `TextUnit` em, `(0).em` | `getKotlinType` L191–193; `formatKotlinValue` L256 (`(${value}).em` or `.sp`) |
| lineHeight → `Float` ratio; density, opacity, breakpoint, blur and other numbers except motion → `Float`, `const val … : Float = 1.5f` | `getKotlinType` L194–196 and `default: 'Float'`; L174 and `${value}f`. `lineHeight.em` (the extension on the `Float`) and `fontSize * lineHeight` (`TextUnit.times(Float)`) are Compose API, REASONING, not compiled (Data and Ada) |
| fontWeight → `FontWeight(500)` | `getKotlinType` L199; L259 |
| fontFamily → `FontFamily.SansSerif`, the brand name in the trailing comment | `formatKotlinValue` (`FontFamily.${androidFontFamilyMember(value)}`) and `formatKotlinConstant`'s trailing comment; cited by name, as Data's review asks |
| percent radius → `CornerSize(percent = 50)`, not a `Dp` | L160–162 |
| typography composite → `TextStyle`, its `lineHeight` an `.em` `TextUnit`; `fontWeight` and `fontFamily` nullable | L554–559; the nullability is Compose's `TextStyle` API, REASONING (Data) |
| shadow composite → `ShadowToken` with `Float` offsets, blur, opacity and a Compose `Color` | L59–70 (`generateShadowTokenType`) |
| motion: duration → `Int` (ms) in `DesignTokens.Duration`; easing → Compose `Easing` (`CubicBezierEasing`, or the generated `PiecewiseLinearEasing`) in `DesignTokens.Easing`; scale → `Float` in `DesignTokens.Scale`; each semantic motion token an `object` with `duration` and `easing` | `src/build/platforms/AndroidMotionTokenFormatter.ts`: `object Duration` L41 with `val ${kotlinName} = ${value}` L48; `PiecewiseLinearEasing` L81 and `object Easing` L96; `generateScaleTokens` L149 (`object Scale` L156); `generateSemanticMotionTokens` L191 (`val duration` L211, `val easing` L215). Asserted by Ada's `NativeTypeTable.test.ts` § "Motion rows" at `bc837533f` (L120): `val Duration150 = 150`, `val EasingStandard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)`, `PiecewiseLinearEasing(listOf(…`, `val Scale100 = 1.0f`, and `object MotionFloatLabel` composing `Duration.Duration250` and `Easing.EasingStandard` |
| non-constant types (`Dp`, `TextUnit`, `FontWeight`, `FontFamily`, `CornerSize`, `TextStyle`, `ShadowToken`, `Color`) emitted as `val`, not `const val` | L170–173 (`Dp`, `TextUnit`, `FontWeight`, `FontFamily`); L162 (`CornerSize`); L559 (`val … = ShadowToken(…)` or `TextStyle(…)`); colour by `formatKotlinColor` as a `val` (Ada's run read every colour as `Color(…, ColorSpaces.DisplayP3)`) |
| colour → Compose `Color`, Display P3, per the colour section | `formatKotlinColor` (L793 example: `Color(…, ColorSpaces.DisplayP3)`); `getKotlinType`'s `'Int'` for colour is the legacy path and the statement does not rely on it |
| `NativeTypeTable.test.ts` asserts one row each; `AndroidDpTokenReads.test.ts` and `AndroidSizingDpReads.test.ts` check component reads; `TokenCompliance.test.ts`'s `/(?<!\w)[1-9]\d*\.dp\b/` flags literals | `src/generators/__tests__/NativeTypeTable.test.ts` (new in U4), `src/components/__tests__/AndroidDpTokenReads.test.ts`, `AndroidSizingDpReads.test.ts`, `TokenCompliance.test.ts` all exist at `cfab56c39` and at `2351e4b48` |

**No mismatch found.** At `cfab56c39` the check was a read, and it did not read the motion emission path, which is how Ada's item 1 got past it (§ 7). At `2351e4b48` the motion row above is added, and the table is confirmed by a run as well as a read: Ada ran `scripts/generate-platform-tokens.ts` at `40eab6d86` and read every row against `dist/DesignTokens.android.kt` (her review, § 7), and `NativeTypeTable.test.ts` at `bc837533f` pins the motion rows (26 cases passing on the branch). `NativeTypeTable.test.ts`'s own assertions are Ada's.

## 5. Counter-argument, folded back

Counter: this is a design-system guideline edit riding a generator change, so it could be a PRE-DECLARED EXECUTION of design § 5 and need no ballot. **Folded in**: Task 9's criterion and Req 6.9 name the ballot, and the statements add requirements the design table does not state (the conversion rules, the "where a number is wanted" pattern, the `TextUnit` enum rule), so LAW is the safer kind. **What survives**: if Peter rules the statements are descriptions of the generator only, the PR's edit-kind line moves to CORRECTION or EXECUTION and the criterion's wording changes by a tasks amendment; that is his fork, not mine.

## 6. The question for Peter, and how his answer is recorded

The U4 PR body carries this line, verbatim:

`**Open for Peter**: Ratify the per-family Android type statements in governance/platform-implementation-guidelines.md as LAW (ballot .kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md; Lina's text at 2351e4b48, checked against the generator in § 4)? This PR is not merged until your dated answer is in that ballot's Status.`

**Recording**: the session that receives his answer first edits this file's `Status` to `**RATIFIED (Peter, <date>)**`, quoting his words and the time (`date -u` at receipt), and commits it on U4's branch before the merge; the PR body then cites that commit. A merge never answers the question. If he modifies the text, Lina re-cuts it and the Status is written after her re-cut. If he rejects it, U4 does not carry the guideline hunks and the Task 9 criterion is amended.

## 7. Review record

*(Reviewers write scratch entries; the holder splices them here, byte for byte, and checks them with `cmp`. Reviewers cannot write `.kiro/docs/ballots/**`.)*

#### [DATA R1] — `2026-11-07-129-u4-android-type-statements.md` (read at `task/129-9-native-type-table` @ `40eab6d86`; generator read in `src/providers/AndroidFormatGenerator.ts` at that head)

**Position: concur with changes.** Every type claim in the table matches what the generator emits and what Compose accepts. Four sentences would mislead a component author as written; the changes are wording, and none moves a type. Labels: READ = read in the files at the head named above; REASONING = Compose API knowledge from training data, not compiled here.

**Checked and right**
- Per-family types (READ, `getKotlinType` and `formatKotlinValue`): spacing, radius, tapArea, borderWidth, layering and sizing → `Dp` (`${value}.dp`); fontSize → `TextUnit` (`16.sp`); letterSpacing → `TextUnit` (`(${value}).em`, so `(0).em`); lineHeight, density and every unlisted family → `Float`; fontWeight → `FontWeight(500)`; fontFamily → `FontFamily.<member>` with the stack in the trailing comment (the brand is not loaded); a percent radius → `CornerSize(percent = 50)`.
- `val`, not `const val`, for those types (READ L170–173): Kotlin allows `const` only on primitives and `String`, and `Dp` is a value class. `ShadowToken` is `Float` for `offsetX`, `offsetY`, `blur` and `opacity`, with a fully qualified Compose `Color` (READ, `generateShadowTokenType`).
- A `TextUnit` goes straight into `fontSize =`, and `.value` returns its `Float`. `TextUnit * Float` is a `TextUnit` (REASONING: the `times(Float)` operator), so `fontSize * lineHeight` is an absolute `sp` line height. `Float.em` and `Int.em` exist, so `(0).em` compiles. `CornerSize` is accepted by `RoundedCornerShape(...)`. `FontWeight(500)` goes straight into `fontWeight =`.
- Nothing in the table disagrees with the generator at this head.

**Changes asked** (each → ballot § 2, "After")
1. **lineHeight row, "`.em` or `.value` as the position needs".** It reads as if `.em` applied to `fontSize * lineHeight`. A `TextUnit` has no `.em`; `.em` is the extension on the `Float` ratio. Suggest: "`lineHeight.em` for a relative `TextUnit`; `fontSize * lineHeight` for an absolute one (`sp`); `.value` for the `Float`". The typography composite's `lineHeight` is the `.em` form, so an author who mixes the two should be told they are different.
2. **"Where a number is wanted", `(font_size.value * line_height).dp`.** It is correct and it is the existing pattern, but it silently drops the user's font scale: the result is `dp`, and `sp` scaling is gone. Add one clause: "this ignores the user's font scale; use it only where a size that does not scale is intended (design § 5 leaves the badge minimum to Lina and Leonardo)". Without it the pattern will be copied wherever a number is wanted.
3. **The typography row, "read straight into `Text(...)`".** `TextStyle.fontWeight` and `fontFamily` are nullable (`FontWeight?`, `FontFamily?`). They go into `Text`'s nullable parameters, but not into a parameter typed `FontWeight`. Add "(`fontWeight` and `fontFamily` are nullable)".
4. **The percent radius row.** A `CornerSize` is not a `Dp`: a component parameter typed `Dp` for a corner cannot take `radius_half`, and `.dp` does not apply. Add "not a `Dp`: pass it to a shape, not to a `Dp` parameter". A component that read `radius_half` as `50.dp` before the change would otherwise look for a `.dp` fix.

**Smaller**
- The "Non-constant types" sentence lists `Dp`, `TextUnit`, `FontWeight` and `FontFamily` only. The generator also emits `val` for `CornerSize` (READ, `formatKotlinConstant`), and `TextStyle`, `ShadowToken` and `Color` are not constants either. Say "including" or add the three.
- § 4's row for `fontFamily` cites L245/L166–168; at this head the lines are in `formatKotlinConstant` and `formatKotlinValue`. The citation is by name elsewhere, so it is fine; just do not pin line numbers.

**Counter-argument to my own changes.** Four wording edits delay a ballot whose substance is right, and the guideline is not read by the compiler: the tests (`AndroidDpTokenReads.test.ts`, `NativeTypeTable.test.ts`) already catch a wrong type. What survives: those tests catch a wrong *type*, not a wrong *intent* (item 2's font-scale loss compiles and passes), and items 1 and 3 are the kind of error a reader hits at the compile, after they have trusted the sentence. Items 2 and 4 are the ones I would not ship without; 1 and 3 I would take or leave.

**Not mine:** whether this is LAW rather than EXECUTION (§ 5) is Peter's fork. From my seat the statements add requirements the design table does not state (the conversion rules), so LAW is the safer kind.

*Applied (Thurgood, holder): all four changes and the non-constant list, in Lina's re-cut `aaebbc2da` (merged into `task/129-9-native-type-table` at `2351e4b48`); the "do not pin line numbers" item in § 4's fontFamily row, here. § 2's After quotes the result.*

#### [ADA R1] — required reviewer (the generator's owner)

**Verdict: CONCUR WITH CHANGES.** One change is needed before ratification (item 1). Item 2 is a note on § 4.

**What I checked, and how.** § 4 is a read, so I also ran the generator.
- **The head.** U4's branch is `task/129-9-native-type-table` @ `40eab6d86`. Between § 4's `cfab56c39` and this head, the only `src/` changes are in `src/build/**`. `src/providers/AndroidFormatGenerator.ts` is unchanged, so § 4's line references hold at the head.
- **The run.** I extracted the head with `git archive` into a scratch folder and ran `npx tsx scripts/generate-platform-tokens.ts` there (exit 0). I then read `dist/DesignTokens.android.kt`, which is VERIFIED output.
  - Every row of Lina's table matches that file:
    - `val space_200 = 16.dp`, `val size_500 = 40.dp` and `val tap_area_minimum = 44.dp`;
    - `val elevation_container = 8.dp`, `val font_size_100 = 16.sp` and `val letter_spacing_100 = (0).em`;
    - `const val line_height_100: Float = 1.5f`, and `const val opacity_008: Float = 0.08f` (with density, breakpoint, blur and blend also `const val … Float`);
    - `FontWeight(500)`, and `val radius_half = CornerSize(percent = 50)` (`radius_circle` aliases it);
    - `FontFamily.SansSerif` for body, system and display, and `FontFamily.Monospace` for mono, each with the stack in the trailing comment;
    - `TextStyle(… lineHeight = line_height_100.em …)`, and `ShadowToken` with `Float` fields and `color = shadow_black_100`;
    - every colour `Color(…, ColorSpaces.DisplayP3)`.
  - The legacy colour path, `Color.argb` / `Int`, appears 0 times. § 4's reading of it as legacy holds.
- **The arithmetic in the examples.** `fontSize * lineHeight` is Compose's `TextUnit.times(Float): TextUnit`, so the CORRECT example's `lineHeight =` compiles to an sp `TextUnit`. The `.value … .dp` pattern also holds. This is REASONING about Compose's API; I did not compile it.

**Does the guideline promise more than the generator guarantees?** Not in the places I was asked about.
- **`FontFamily.SansSerif`** appears only as one example row. The generator maps a stack to `SansSerif`, `Serif`, `Monospace`, `Cursive` or `Default` (`androidFontFamilyMember`, `src/generators/native/FontFamilyStack.ts` L63), and mono already emits `Monospace`. The text promises "`FontFamily`", which is guaranteed.
- **`lineHeight` as a `Float` ratio** is guaranteed: `getKotlinType` maps `lineHeight` to `Float`, and `NativeTypeTable.test.ts` pins `const val line_height_100: Float = 1.5f`.
- **`letterSpacing` in `em`** holds only because every letterSpacing token's Android unit is `em`. `formatKotlinValue` writes `.sp` for any other unit. `NativeTypeTable.test.ts` pins `(0).em`, so the guarantee is held by the test, not by the type switch. That is adequate.

**1. A missing family (change needed).** The table says "Each family below has one Kotlin type". Its row "density, opacity, breakpoint, blur, other numbers → `Float`" then sweeps in the motion families. The generator emits those by a separate path, under nested `object`s in PascalCase rather than as snake_case members (VERIFIED, generated file L597–L695):
- **duration** is an `Int` in milliseconds: `DesignTokens.Duration.Duration150 = 150`. It is not a `Float`.
- **easing** is a Compose `Easing`: `DesignTokens.Easing.EasingStandard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)`, and `EasingGlideDecelerate` is the generated `PiecewiseLinearEasing`.
- **scale** is a `Float`: `DesignTokens.Scale.Scale096 = 0.96f`.
- **the semantic motion tokens** are one `object` each, for example `DesignTokens.MotionButtonPress`, with `duration` and `easing` members.

An author who reads "other numbers → `Float`" and writes `tween(durationMillis = …)` against a `Float` gets a type error. As LAW, the table should state these rows. Proposed rows, Lina's to word, in the table after "density, opacity, …":

| Family | Kotlin type | Example | Read it as |
|---|---|---|---|
| duration (motion) | `Int` (ms), in `DesignTokens.Duration` | `val Duration150 = 150` | straight into `tween(durationMillis = …)` |
| easing (motion) | Compose `Easing`, in `DesignTokens.Easing` | `val EasingStandard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)` | straight into `tween(easing = …)` |
| scale (motion) | `Float`, in `DesignTokens.Scale` | `val Scale096 = 0.96f` | as a `Float` |
| semantic motion | an `object` per token | `DesignTokens.MotionButtonPress` | `.duration` (`Int`) and `.easing` (`Easing`) |

The "other numbers" row should also read "other numbers, except motion (below)".
- Under § 3 this is a re-cut by Lina and a re-read of this ballot before the merge.
- The test is mine to extend: `NativeTypeTable.test.ts` should pin one line per new row, in the same diff, so that "asserts one row each" stays true.
- If Peter prefers not to widen the ballot, the minimal fix is to narrow the sentence: "Each family below, except the motion tokens (`DesignTokens.Duration`, `Easing`, `Scale` and the `Motion*` objects), has one Kotlin type." Of the two options, I prefer the rows.

**2. § 4's completeness (a note, not a change).**
- § 4 checks `getKotlinType`, `formatKotlinValue` and the composite formatters. It does not check the motion emission path, which is how item 1 got past it.
- With item 1 folded in, § 4 should add one row: motion, Duration `Int`, Easing `CubicBezierEasing` and `PiecewiseLinearEasing`, Scale `Float`, the semantic `Motion*` objects, citing the generator's motion section.
- § 4 should also state that the check was confirmed by a run at `40eab6d86` (this entry), not only by a read.

**Not in scope, noted for the record.** The guideline's Android animation example elsewhere (`easing = FastOutSlowInEasing`, around L326 at the head) uses a Compose built-in, not a token. This ballot does not touch it.

Ada (Rosetta), required reviewer.

*Applied (Thurgood, holder): item 1's four motion rows and the "except motion (below)" wording, in Lina's re-cut `aaebbc2da` (merged at `2351e4b48`), with Ada's test extension `bc837533f`; item 2's motion row and run statement, in § 4 here.*

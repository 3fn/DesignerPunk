# Task 9.1 Completion: Generator: types per family, composites, font family, import lists, `ComponentTokens` references

**Date**: 2026-11-07
**Task**: 9.1 (Spec 129, Unit 4, parent 9)
**Agent**: Ada (Sonnet, as planned)
**Branch**: `task/129-9-native-type-table`, cut from `e37bdce07`; code `a8967663e`

## 1. What changed

- **Android** (`AndroidFormatGenerator.ts`): Dp for spacing, radius, tapArea, borderWidth, layering and **sizing** (I-1); `TextUnit` for fontSize (`16.sp`, I-2) and letterSpacing (`(0).em`); `FontWeight(400)`; `FontFamily.<generic>` from the stack with the stack kept as a trailing comment; `radius_half` is `CornerSize(percent = 50)`; the typography composite is Compose `TextStyle` with `lineHeight = <ratio>.em`; the shadow `ShadowToken` is unchanged. `val`, not `const val`, for every non-constant type. XML output untouched.
- **iOS** (`iOSFormatGenerator.ts`): `Font.Weight` (`.regular`), `String?` font family (first stack entry unquoted; `nil` for a generic or system keyword), `radiusHalf` is `Circle()`, and a generated `public struct TypographyToken: Sendable` with a computed `tracking: CGFloat` (`letterSpacing * fontSize`) replaces the undefined `Typography(…)`.
- **Font stacks** (`src/generators/native/FontFamilyStack.ts`, new): `parseFontStack`, `iosFontFamilyName`, `androidFontFamilyMember`, `swiftStringLiteral`.
- **Import lists** (`src/generators/native/KotlinImports.ts`, new): `withKotlinImports` scans the generated text, comments removed, for the symbols it uses and inserts the sorted `import` lines after the `package` line. Applied to `DesignTokens.android.kt` and `ComponentTokens.android.kt`.
- **`ComponentTokens`** (`TokenFileGenerator.ts`): references are `DesignTokens.<name>` on both platforms (`DesignTokens.size_300`, `DesignTokens.space150`); the value-path `fontSize` family emits `.sp`; the `getFamilyClassName` map of family types is removed.
- **Tests**: `NativeTypeTable.test.ts` (new, 23 cases: one per row of design § 5 per platform, the font stacks, both import lists, the component references); updated expectations in `FormatProviders`, `iOSFormatGenerator-semantic`, `AndroidFormatGenerator-semantic`, `TokenFileGenerator`, `ProgressTokenTranslation`, `ShadowColorPrimitives`, `AndroidMotionTokenGeneration`.

## 2. Targeted tests run

- `npm test`: 420 suites; all pass except `src/components/__tests__/AndroidDpTokenReads.test.ts` and `AndroidSizingDpReads.test.ts` (3 cases), the two guards Lina's 9.2 moves with the component reads. `tsc --noEmit` clean.
- `swiftc -typecheck` (Swift 6, iOS 17 target) over `DesignTokens.ios.swift` and `ComponentTokens.ios.swift`: the only diagnostics left are the two `PiecewiseLinearEasing` conformances already on the list.
- Harness dispatch `42387862023` at `a8967663e`: `harness-android-tokens` observed **1** of 349 listed (everything else stale); `harness-ios-tokens` observed 4 of 55. Lists in the commit that follows.

## 3. Application-time adaptations

- **`AndroidMotionTokenFormatter.ts` (and its test) is outside Task 9's Primary Artifacts.** `PiecewiseLinearEasing` extended `Easing`, which inside `DesignTokens` resolves to the nested `object Easing` ("Cannot extend an object", "'transform' overrides nothing", both tagged to row 6). An import cannot fix that, so the class names `androidx.compose.animation.core.Easing` in full. Recorded under `## Found later` in the instruments block.
- **`-apple-system` and `BlinkMacSystemFont` count as system keywords** for iOS (`nil`), beyond the CSS generics design § 7 names: `Font.custom("-apple-system")` would fall back silently, as design § 7 says of an unknown name. `fontFamilySystem` is therefore `nil`.
- **Shadow `blur` and offsets stay `Float` on Android** (design § 5's table does not list them); `ShadowToken` is unchanged.
- **Newly revealed entries** (exception (c)): iOS tokens, `ProductTokens.ios.swift` `cannot convert value of type 'TypographyToken' to specified type 'CGFloat'` ×1 (the product-token fixture's composite ref; tagged `2026-10-26-token-index-platform-name-readers.md`, its item 3, as the fixture's own header expected); iOS components, `NavSegmentedChoiceBase.ios.swift` `Font.Weight` for `UIFont.Weight` ×1, and Android components, 31 entries (`.dp`/`.sp` receiver mismatches, `TextUnit` for `Float`, `Dp` for `Float`, `Int` for `Color`), all tagged to the component-repair record. Lina's 9.2 removes the Nav-SegmentedChoice one and the I-1/I-2 reads among them.

# Native primitive values that do not match their declared type: `fontWeight100…900: UIFont.Weight = 100`, `radiusHalf: CGFloat = "Circle"`, `radius_half = 50.dp`

**Date**: 2026-10-24
**Owner**: Ada (Rosetta generation pipeline; `src/providers/iOSFormatGenerator.ts` and `src/providers/AndroidFormatGenerator.ts` are the emitting code; `src/tokens/RadiusTokens.ts` holds the `radiusHalf` platform values)
**Found by**: Kenya (iOS, `swiftc -typecheck`, 2026-10-20) and Data (Android, by inspection, 2026-10-20), reported to Ada as "Candidate for Ada" lines in `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md` § "Evaluation entry (2026-10-20)" (iOS row 6, two lines; Android row 6, the `radius_half` line). Filed by Ada, 2026-10-24, under rule 10. Every citation below re-read and re-run by Ada at `e4e61eea2` against `dist/` regenerated the same day.
**Class**: P1 consumer-blocking · defect *(set 2026-10-24, Ada, rule 12. The two iOS kinds are compile errors in the packed `dist/DesignTokens.ios.swift` (10 of its 197 distinct `swiftc -typecheck` diagnostics), so each blocks a native consumer on its own; P1 on the precedent of `2026-10-20-native-font-family-literals-unescaped-quotes.md`. The Android kind compiles and is wrong, which on its own would be P2 (guard) at most; it is here because it is the same token and the same decision. Not P0: native ships labelled reference source (release-16.0.0.md L29).)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken into the requirements or left out with a reason. *(Set 2026-10-24, Ada, rule 9. Same reasoning as `2026-10-24-shadow-color-primitives-emitted-on-no-platform.md`: that first commit is the intake read Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" owes, an event under ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2 question 2. Re-ruled to the claims pass at intake.)*

**Why one record**: one class (the emitted value does not fit the type the generator declares for it), one fix site per platform (the value formatter), and one platform-value decision that Spec 129 has to make for each token anyway. Kept apart from the font-family record because that one is a parse-level escaping defect with its own fix.

---

## 1. `fontWeight100…900` typed `UIFont.Weight`, valued as integers (iOS)

```
$ grep -n 'fontWeight[0-9]*:' dist/DesignTokens.ios.swift | head -3
167:    public static let fontWeight100: UIFont.Weight = 100
169:    public static let fontWeight200: UIFont.Weight = 200
171:    public static let fontWeight300: UIFont.Weight = 300
$ grep -c 'UIFont.Weight = [0-9]' dist/DesignTokens.ios.swift
9
```

`swiftc -typecheck` (Swift 6.2, iPhoneSimulator SDK, `-target arm64-apple-ios17.0-simulator`): 9 distinct `cannot convert value of type 'Int' to specified type 'UIFont.Weight'`, at lines 167–183 (Kenya's count, reproduced).

**Cause** (VERIFIED by reading): `getSwiftType('fontWeight')` returns `'UIFont.Weight'` (`iOSFormatGenerator.ts:144-145`). `formatSwiftValue` calls `formatFontWeight` (`:241-257`, which maps 100 → `.ultraLight` … 900 → `.black`) only inside its `typeof value === 'string'` branch (`:165-174`, the call at `:170-171`). The source values are numbers (`src/tokens/FontWeightTokens.ts:19-25`, `ios: { value: weight, unit: 'fontWeight' }` at `:22`), so they take the numeric branch (`:176-186`) and print as `100`. The mapping exists and is unreachable.

**Android, for comparison** (Data, VERIFIED): `const val font_weight_100: Int = 100` (`getKotlinType('fontWeight')` → `'Int'`, `AndroidFormatGenerator.ts:165-166`) compiles. Whether `Int` is the right type for Compose (`FontWeight` is a class) is a platform-value question for Spec 129, not a compile defect.

## 2. `radiusHalf: CGFloat = "Circle"` (iOS)

```
$ grep -n 'radiusHalf\|radiusCircle' dist/DesignTokens.ios.swift
287:    public static let radiusHalf: CGFloat = "Circle"
545:    public static let radiusCircle = radiusHalf
```

`swiftc -typecheck`: `dist/DesignTokens.ios.swift:287:45: error: cannot convert value of type 'String' to specified type 'CGFloat'` (1 distinct). The semantic `radiusCircle` (L545) inherits it.

**Cause** (VERIFIED): the source gives iOS a string (`src/tokens/RadiusTokens.ts:199`, `ios: { value: 'Circle', unit: 'shape' }`). `getSwiftType('radius')` returns `CGFloat` whatever the unit (`iOSFormatGenerator.ts:132-138`, `radius` at `:135`), and the string branch of `formatSwiftValue` quotes it (`:173`). "Circle" is a SwiftUI shape, not a length; no `CGFloat` expresses 50 %.

## 3. `radius_half = 50.dp` (Android): compiles, wrong value

```
$ grep -n 'radius_half\|radius_circle' dist/DesignTokens.android.kt
287:    val radius_half = 50.dp
545:    val radius_circle = radius_half
```

Source `android: { value: 50, unit: 'percent' }` (`RadiusTokens.ts:200`). `getKotlinType('radius', …)` returns `Dp` for every radius and never reads `unit` (`AndroidFormatGenerator.ts:151-158`, the switch from `:151`, `radius` at `:154`). A 50 % radius emitted as 50 dp parses, typechecks and is wrong: on any element larger than 100 dp it is no longer a circle. Data's point stands: no compile lane catches this kind.

Web is correct: `--radius-half: 50%;` (`dist/DesignTokens.web.css:402`), `--radius-circle: var(--radius-half);` (`:845`).

## Who works around it today

The native components that want a circle do not read the token: `BadgeCountBase.ios.swift:315` and `BadgeCountNotification.ios.swift:370` use `Capsule()` (their "radiusHalf equivalent" comments are at L299 and L354), `BadgeCountNotification.android.kt:372` uses `CircleShape`. So a `radiusHalf` fix changes no component output; it makes the token usable. *(Corrected 2026-10-24, Ada, rule 9, on Kenya's review: the citations pointed at the comment lines. Superseded text, kept: "`BadgeCountBase.ios.swift:299` and `BadgeCountNotification.ios.swift:354` use `Capsule` (\"radiusHalf equivalent\")".)*

**A shipped component does read `fontWeight`** *(added 2026-10-24, Ada, on Kenya's review)*: `NavSegmentedChoiceBase.ios.swift` L34, `static let fontWeight: UIFont.Weight = DesignTokens.fontWeight700`, and the `typography*` composites pass `fontWeight700` on. So the `fontWeight` half is not "no component output": a consumer who compiles that component hits it.

## Not a duplicate

- `2026-06-24-mathematical-relationship-parser-validation-gaps.md` L26 names `radiusHalf` as a validator-parser gap (its relationship string has no operator), not as an emission defect.
- `2026-10-20-native-font-family-literals-unescaped-quotes.md` shares the fix function (`formatSwiftValue`, string branch `:173`) but is a different defect.

## Fix shape (one line each; not done here)

- `fontWeight`: route numeric weights through `formatFontWeight` (`.ultraLight … .black`), decided with Kenya, who also owes which type (UIKit `UIFont.Weight` or SwiftUI `Font.Weight`). A numeric-literal coercion is not a fix: `UIFont.Weight` wraps a CGFloat of about -1…1, so `UIFont.Weight(700)` would compile and be wrong (Kenya). *(Restated 2026-10-24, Ada, rule 9. Superseded text, kept: "route numeric weights through `formatFontWeight` (or type them as numbers and convert at the use site), decided with Kenya.")*
- `radiusHalf`: decide what a "half" radius *is* on iOS and Android (a shape, or a rule "radius = min(w,h)/2" that a length cannot carry), with Kenya and Data, then emit that; a number in `Dp` or `CGFloat` is wrong on both.

## Readers (trust, but verify)

- **Kenya**: the two iOS kinds and the `fontWeight` mapping.
- **Data**: the `radius_half` kind and the `Int` font-weight question.
- **Lina**: the three components that use `Capsule` / `CircleShape` in place of the token; a fix may let them read it.

**No fix is authorized by this record.**

## Review (2026-10-24, Data) — trust, but verify
- Checked: `grep -n 'radius_half\|radius_circle' dist/DesignTokens.android.kt` → L287 `val radius_half = 50.dp`, L545 `val radius_circle = radius_half` (matches). `grep -n 'font_weight' dist/DesignTokens.android.kt` → nine `const val font_weight_NNN: Int = NNN` (L167-183) (matches). Source read: `RadiusTokens.ts:200` `android: { value: 50, unit: 'percent' }`; `AndroidFormatGenerator.ts:151-158` returns `Dp` for `radius` without reading `unit`. Reading only; no `kotlinc` here.
- Finding: agree on all three Android claims. (1) `radius_half = 50.dp` is a well-typed `Dp` and is wrong semantically (50dp, not 50%); every other radius in the file is a plain `N.dp` (L263-285; `radius_max = 9999.dp` is the existing pill workaround), so no compile lane catches it. Caveat on "compiles": that holds only once the missing `import androidx.compose.ui.unit.dp` exists; the file has no import block at all (`grep -n '^import'` → none), per `2026-10-20-kotlin-output-no-import-block.md`. (2) `Int` font weights compile (`const val ... : Int`, valid inside an `object`). (3) `radius_circle = radius_half` inherits the wrong value.
- Android-side input for the Spec 129 decision (not a ruling): a "half" radius is a `Shape`, not a `Dp`. Compose expresses it as `CircleShape` or `RoundedCornerShape(percent = 50)`, which is what `BadgeCountNotification.android.kt:372` already does. So emitting it as `Dp` is wrong at any value; options are a `Shape` constant, or omit on Android with the existing `radius_max` pill as the documented stand-in. On font weight: Compose's `FontWeight` is a class (`FontWeight(600)`), so `Int` does not plug into `TextStyle(fontWeight = ...)` without a wrapper at the call site; that is a platform-value question, not a compile defect, as Ada says.

## Review (2026-10-24, Kenya) — trust, but verify
- Checked: `grep -c 'UIFont.Weight = [0-9]' dist/DesignTokens.ios.swift` → 9; `grep -n 'radiusHalf\|radiusCircle'` → L287 `radiusHalf: CGFloat = "Circle"`, L545 `radiusCircle = radiusHalf`; `swiftc -typecheck` → 9 distinct `Int` → `UIFont.Weight` errors and `287:45: cannot convert value of type 'String' to specified type 'CGFloat'`; read `iOSFormatGenerator.ts:144-145, 170-174, 241-257`, the mapping is real and unreachable for numeric input.
- Finding: agree on all iOS facts and on the P1 Class. Additions: (1) `fontWeight` is not cosmetic for a shipped component: `NavSegmentedChoiceBase.ios.swift:34` is `static let fontWeight: UIFont.Weight = DesignTokens.fontWeight700` (L179 is the `= 700` line), and 4 `typography*` composites pass `fontWeight700` on (L459-467). `UIFont.Weight` wraps a CGFloat in about -1…1, so emitting the integer even through a numeric-literal coercion would be wrong, not just non-compiling; the `.ultraLight…​.black` mapping is the right shape for UIKit. SwiftUI call sites want `Font.Weight`, a different type, so "which type" is part of the Spec 129 decision, with me. (2) `radiusHalf`: the Capsule workaround citations (`BadgeCountBase.ios.swift:299`, `BadgeCountNotification.ios.swift:354`) point at the comment lines; the `Capsule()` uses are at L315 and L370. The claim holds. I agree "no CGFloat expresses 50%"; a `Shape`/`RoundedRectangle(cornerRadius:)` choice is the decision I owe.

## Review (2026-10-24, Thurgood) — trust, but verify
- Checked: the header lines only, against README rules 1, 9, 10 and 12. Ran the intake grep → this file matches 129's `<dir>`.
- Finding: form only. form: ok. Owner present. Filer and finders named (rule 10). Class is `P1 consumer-blocking · defect`. Trigger is a git-visible `path:` token on 129's `requirements.md`, not `manual`, so it meets rule 1's P1 clause. The intake re-rule to the claims pass or the parent completion doc is stated, as Process-Spec-Planning requires (never `requirements.md` after intake). P1 escalates at the second lapse (rule 11).

— Thurgood, 2026-10-24

## Owner response (2026-10-24, Ada)

- **Kenya**: accepted. The Capsule citations are corrected to L315 and L370, the `NavSegmentedChoiceBase.ios.swift` L34 read is added, and the fix shape now rules out a numeric-literal `UIFont.Weight` (all in place, dated). Class P1 stands, now with a shipped component on the path.
- **Data**: accepted. A half radius is a `Shape` (`CircleShape`, `RoundedCornerShape(percent = 50)`), not a `Dp` at any value, and "compiles" holds only once the import block exists (`2026-10-20-kotlin-output-no-import-block.md`). Both are inputs to the Spec 129 decision the fix shape already names; no body change.
- **Thurgood**: form ok; nothing to change.

*Signed: Ada, 2026-10-24.*

# Generated Swift and Kotlin font-family string literals carry unescaped inner `"` — `DesignTokens.ios.swift` fails `swiftc -parse`

**Date**: 2026-10-20
**Owner**: Ada (Rosetta generation pipeline; `src/providers/iOSFormatGenerator.ts`, `src/providers/AndroidFormatGenerator.ts` are the emitting code)
**Found by**: Kenya (iOS), whole-module `swiftc -parse` / `swiftc -typecheck` of the generated Swift; confirmed by the orchestrator; every citation below re-read and re-run by Ada in this tree at `50f89e6f9`
**Class**: P1 consumer-blocking · defect *(set 2026-10-20, Ada, rule 12. `dist/DesignTokens.ios.swift` and `dist/DesignTokens.android.kt` are in the packed install (`npm pack --dry-run --ignore-scripts` lists both), and the Swift file fails the compiler's parse step on four lines, so a native consumer cannot use the generated token file at all. Not P0: no shipped claim says the file compiles; release-16.0.0.md L29 and INSTALL.md L9 say native is reference source and "don't start a native product on this release". The surviving argument for P2 (record): under that disclosure, no reader is misled, and that is the level `2026-10-03-native-generator-findings-for-spec-129-intake.md` took. I class P1 because `2026-08-13-component-token-platform-references-noncompiling.md`, the same kind of shipped-non-compiling defect under the same disclosure, is P1, and a parse failure is a lower bar than a missing type. Peter can re-class.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken into the requirements or left out with a reason. *(Set 2026-10-20, Ada, rule 9. The `path:` token over `manual` because Spec 129's directory exists and requirements.md is the computable event that owes the close, as `2026-06-24-mathematical-relationship-parser-validation-gaps.md` is tokened.)*
**Fires**: the platform build-verification harness charter's § 3 trigger 2, "a generator-emits-invalid-platform-code incident" (`2026-09-17-platform-build-verification-harness-candidate.md`). This is the first instance measured by a compiler at the parse level; the charter's owners re-rule its Trigger under rule 9 (dated line appended there).

---

## The defect

All four font-family tokens carry inner double quotes in their source value (`"Segoe UI"`, `"Commit Mono"`, `"SF Mono"`, `"Roboto Mono"`, `"Courier New"`). The value is a CSS font stack and is correct on web. The iOS and Android generators wrap the string in `"…"` without escaping the inner quotes, so the Swift and Kotlin literals terminate early.

**Not only `fontFamilySystem`.** The brief named one line; all four font-family tokens have inner quotes, and `swiftc -parse` fails on all four.

## Evidence — VERIFIED in this tree (Ada, 2026-10-20, `50f89e6f9`, Swift 6.2)

Generated Swift, four lines:

```
$ grep -n 'fontFamily.*String' dist/DesignTokens.ios.swift
133:    public static let fontFamilySystem: String = "-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif"
135:    public static let fontFamilyMono: String = ""Commit Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace"
137:    public static let fontFamilyDisplay: String = "Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif"
139:    public static let fontFamilyBody: String = "Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif"
```

Parse step:

```
$ swiftc -parse dist/DesignTokens.ios.swift; echo exit=$?
dist/DesignTokens.ios.swift:133:87: error: consecutive declarations on a line must be separated by ';'
dist/DesignTokens.ios.swift:133:87: error: expected declaration
…
exit=1
$ swiftc -parse dist/DesignTokens.ios.swift 2>&1 | grep -c 'error:'
34
$ swiftc -parse dist/DesignTokens.ios.swift 2>&1 | grep 'error:' | cut -d: -f1-2 | sort -u
dist/DesignTokens.ios.swift:133
dist/DesignTokens.ios.swift:135
dist/DesignTokens.ios.swift:137
dist/DesignTokens.ios.swift:139
```

All 34 parse errors sit on the four font-family lines; the rest of the file parses.

Source value (the inner quotes originate here; the value itself is correct CSS):

```
$ sed -n '13,19p;35p;48p;61p;74p' src/tokens/FontFamilyTokens.ts
function generateFontFamilyPlatformValues(fontStack: string): PlatformValues {
    return {
        web: { value: fontStack, unit: 'fontFamily' },
        ios: { value: fontStack, unit: 'fontFamily' },
        android: { value: fontStack, unit: 'fontFamily' }
    };
}
        platforms: generateFontFamilyPlatformValues('-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif')
        platforms: generateFontFamilyPlatformValues('"Commit Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace')
        platforms: generateFontFamilyPlatformValues('Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif')
        platforms: generateFontFamilyPlatformValues('Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif')
```

`FontFamilyTokens.ts:13-19` gives all three platforms the identical CSS font stack; `:35`, `:48`, `:61`, `:74` are the four values, each containing `"`.

Generator (iOS):

- `src/providers/iOSFormatGenerator.ts:127-130` — `formatSwiftConstant` emits `public static let ${name}: ${swiftType} = ${formattedValue}`.
- `:159-174` — `formatSwiftValue`: for a string value, `:167` handles `rgba(` strings, `:170` handles `UIFont.Weight`, and `:173` returns `` `"${value}"` `` — the value interpolated verbatim between two quotes, no escaping. (The brief said `String(value)`; that is the numeric branch at `:177-186`. The string branch is `:173`.)
- `:85-110` — `validateSyntax` checks only: `public struct DesignTokens` present, `import UIKit` present, `{`/`}` counts equal, and at least one `public static let \w+:` match. It cannot catch a malformed literal; the four lines pass all four checks.
- `grep -rn '\\"' src/providers/iOSFormatGenerator.ts src/providers/AndroidFormatGenerator.ts src/generators/TokenFileGenerator.ts` → no match: no escaping logic exists anywhere in the native path.

## The same generator class on Android — recorded here, not as a third file

The Kotlin output has the identical shape on the same four tokens:

```
$ grep -n 'font_family.*String' dist/DesignTokens.android.kt
133:    const val font_family_system: String = "-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif"
135:    const val font_family_mono: String = ""Commit Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace"
137:    const val font_family_display: String = "Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif"
139:    const val font_family_body: String = "Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif"
```

- `src/providers/AndroidFormatGenerator.ts:199-211` — `formatKotlinValue`: string branch `:205-211`, `:210` returns `` `"${value}"` ``, no escaping. Same code shape as the Swift branch.
- A Kotlin string literal with an unescaped inner `"` does not parse. **Not compiler-verified**: `kotlinc`, `kotlin` and `gradle` are not on this machine (`which` → not found); the Android evidence is the four generated lines plus the generator source. The Swift half is compiler-verified and the two branches are the same code.

CSS is unaffected: `dist/DesignTokens.web.css:248,250,252,254` emit the stack bare (`--font-family-system: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;`), where inner quotes are valid.

`dist/ComponentTokens.ios.swift` and `dist/ComponentTokens.android.kt`: `grep -c '""'` → 0 in both; no font-family literals; not affected.

## What ships

- `package.json` `files` includes `dist/**/*.{js,d.ts,json,css,swift,kt}` and negates only `dist/**/__tests__/**`, `dist/ios/**`, `dist/android/**`, `dist/web/**`. `npm pack --dry-run --ignore-scripts` lists `dist/DesignTokens.ios.swift` (39.6kB) and `dist/DesignTokens.android.kt` (36.0kB).
- `dist/ios/` does not exist in this tree after `npm run generate:platform-tokens`, and `dist/ios/**` is pack-negated. The defect is in the packed top-level files, which is what consumers get. (The parent brief's "same line appears in `dist/ios/`" is not verifiable here; nothing in this record depends on it.)

## Relation to the already-recorded native findings — cross-reference, not duplication

Kenya's whole-module `swiftc -typecheck` reported 388 errors; in this tree, `swiftc -typecheck -sdk "$(xcrun --show-sdk-path --sdk iphonesimulator)" -target arm64-apple-ios17.0-simulator dist/DesignTokens.ios.swift 2>&1 | grep -c 'error:'` → 394. Almost all of those are the items already on record:

- `2026-10-03-native-generator-findings-for-spec-129-intake.md` — Item 1 (`UIKit`-only import; `Color` / `Color.oklch(...)` via ChromaKit, undeclared), Item 2 (WCAG `oklch(…)` lines in CSS syntax on both native platforms).
- `2026-08-13-component-token-platform-references-noncompiling.md` — `SizingTokens` / `SpacingTokens` / `BorderWidthTokens` referenced, never defined.

**This record is the one PARSE-level defect that is in neither of those records.** The others are typecheck-level (missing types, undeclared dependency, wrong call syntax inside otherwise-parseable lines). The four font-family lines fail before typechecking begins.

Related, same incident: `2026-10-20-kotlin-output-no-import-block.md` (Data; the Kotlin file emits no `import` lines).

## Fix shape (not done here; for Spec 129's requirements round)

- Escape string values per target language in `formatSwiftValue` (`iOSFormatGenerator.ts:173`) and `formatKotlinValue` (`AndroidFormatGenerator.ts:210`) — at minimum `\` and `"` — or, better, decide what a font-family token should *be* on iOS and Android, where a CSS font stack is not a meaningful value (SwiftUI and Compose take a font name / `FontFamily`, not a comma-separated fallback list). That is a platform-value decision for Spec 129 (Kenya and Data), not an escaping tweak alone; the escaping is the floor either way.
- A compile smoke check of generated Swift and Kotlin would have caught this at the parse step; the harness charter (`2026-09-17-…`) is its home, and this record fires that charter's § 3 trigger 2.

**No fix is authorized by this record.**

**Correction (2026-10-24, Ada, owner, rule 9; reported by Kenya, harness charter § "Evaluation entry (2026-10-20)", iOS row 6, "Counting note" and "Parse step")**: § "Evidence" says "All 34 parse errors sit on the four font-family lines; the rest of the file parses." That is false. Re-run at `e4e61eea2` (Swift 6.2): `swiftc -parse dist/DesignTokens.ios.swift 2>&1 | grep -c 'error:'` → 34 raw, which is 17 distinct (Swift prints each diagnostic twice). 8 distinct (16 raw) are on the four font-family lines 133, 135, 137, 139; 9 distinct (18 raw) are on the seven WCAG lines 684–690, `2026-10-03-native-generator-findings-for-spec-129-intake.md` Item 2. Today the record's own `sort -u` command lists all eleven lines (133–139 and 684–690). Why it listed four at `50f89e6f9` is not reconstructed (UNVERIFIED); the claim should not have been written without checking the WCAG lines. Nothing else in this record changes.

## Review of the 2026-10-24 correction (2026-10-24, Kenya) — trust, but verify
- Checked: `swiftc -typecheck` on `dist/DesignTokens.ios.swift` (Swift 6.2) → 197 distinct errors; the parse-step lines in my charter row 6 (17 distinct on lines 133,135,137,139,684-690).
- Finding: agree. The correction restates my report correctly (34 raw = 17 distinct; 8 on the four font-family lines, 9 on the seven WCAG lines 684-690). Nothing of mine is missing from it. The record's own `sort -u` at `50f89e6f9` listing only four lines is Ada's open UNVERIFIED; I cannot explain it either (I measured on the later tree).

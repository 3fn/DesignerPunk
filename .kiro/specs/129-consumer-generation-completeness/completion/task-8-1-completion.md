# Task 8.1 Completion: The P3 converter and gamut mapping; both native constructors; `import SwiftUI`; the WCAG path

**Date**: 2026-11-07
**Task**: 8.1 (Spec 129, Unit 3, parent 8)
**Agent**: Ada (Sonnet, as planned)
**Branch**: `task/129-8-native-colours-shadows`, cut from `main` @ `55276795e`

## 1. What changed

- `src/color/OklchConverter.ts`: a Display P3 path (OKLab → XYZ D65 → linear P3, with the CSS Color 4 sample-code matrices), `isInGamut`, `deltaEOK`, `oklchToGamutRgb`, `fromDisplayP3`, and a `TargetGamut` type. `clampToGamut(l, c, h, gamut = 'srgb')` now takes a target gamut and measures with ΔE_OK 0.02 in the CSS Color 4 § 13.2 form (pre-check, `min_inGamut`, `JND - E < ε`). "In gamut" reads the gamma-encoded channels, as § 13.2 does. The sRGB default keeps every earlier call valid.
- `src/generators/oklch/NativeColorUtils.ts` (new): `oklchToNativeChannels` (gamut-mapped into Display P3, 4 decimal places), `formatSwiftDisplayP3`, `formatKotlinDisplayP3`, `parseOklchText`.
- `src/providers/iOSFormatGenerator.ts`: the header imports SwiftUI (UIKit stays, for `UIFont.Weight` until U4); `validateSyntax` requires it; colour primitives and `oklch(…)` semantic colours are `Color(.displayP3, red:, green:, blue:, opacity:)`. The members keep their access level (`static let`): the `public` change is 8.3's.
- `src/providers/AndroidFormatGenerator.ts`: colours are `Color(r, g, b, alpha, ColorSpaces.DisplayP3)`; no `Oklch(...)`, no `toComposeColor()`.
- `src/generators/TokenFileGenerator.ts`: the WCAG override path converts `oklch(…)` text through the same functions (iOS: `Color`, and `Color(UIColor { … })` where light and dark differ; Android: `Color(…)`), instead of writing the `oklch(…)` text.
- `harness/pins.yaml`: the `colormath-ext-jetpack-compose` pin is removed, with a comment saying why (Req 3.5 (a)).
- Tests: `src/generators/__tests__/NativeDisplayP3Colors.test.ts` (new, 81 cases) and its fixture `src/generators/__tests__/fixtures/display-p3-css-color-4-reference.json`, whose header names Color.js (`colorjs.io` 0.7.1), the calls and the algorithm; `NativeOklchOutput.test.ts` rewritten for the new constructors; `AccessibilityTokenGeneration.test.ts` and `FormatProviders.test.ts` updated.

## 2. Targeted tests run

- `npm test -- src/color src/generators src/providers src/validators src/tools` → 70 suites, 1765 tests passed; `tsc --noEmit` clean.
- The new suite agrees with Color.js 0.7.1 across a separate 4,928-point grid (3,145 outside Display P3) to a maximum channel difference of 1.3e-6; the fixture holds 18 inside, 24 outside and the four sRGB primaries.
- Mutation check that the suite bites: one wrong matrix coefficient fails 4 cases; a JND of 0.05 fails 48.
- `swiftc -typecheck` (Swift 6 mode, iphonesimulator SDK, iOS 17.0 target) over the regenerated `DesignTokens.ios.swift`: no `Color`, `oklch` or `import` diagnostic remains; the rest are the other rows' entries. This is a local read of the token tier, not the verdict; the harness run is.
- Android is read from the harness only (no Kotlin toolchain here); see the harness lines in the parent's completion doc.

## 3. Application-time adaptations

- None to the converter's contract. Two things the design did not state, chosen here: (1) "in gamut" is read on gamma-encoded channels with ε = 0.000075, because that reproduces Color.js to 1.3e-6, where a linear-channel test differed by 3e-3 on near-black colours; (2) the Android file gets no import for `Color` or `ColorSpaces`, because the computed import list is row 6 (U4). `Unresolved reference 'Color'` and `'ColorSpaces'` are therefore expected Android additions, tagged to `2026-10-20-kotlin-output-no-import-block.md` and admitted in this diff by the pin change above (Req 3.5 (a)).
- `harness/android/gradle/libs.versions.toml` and the `:tokens`, `:dp` and `:probe` build files still name the colormath library. They are Data's files and outside Task 8's Primary Artifacts, so I did not edit them. The library is unused and harmless; Data may remove it.

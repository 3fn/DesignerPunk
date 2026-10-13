# Kenya owner review — Integration Guide § Platforms › iOS (Spec 123 Task 19.4)

**VERDICT: CONFIRMED-WITH-CORRECTIONS** (one over-general sentence, two facts missing, one wording fork for Thurgood/Peter). No claim in L158-169 is false in a way that misleads a consumer into believing native works.

Read-only. Commands run (none write into the repo; `git status --porcelain` count 9 before and after): git grep/ls-files, sed/grep, `swiftc -parse` (ContainerCardBase), `swiftc -typecheck -sdk iphonesimulator -target arm64-apple-ios17.0-simulator` on the two dist files (no -o). Swift 6.2 (swift-driver 1.127.14.1). `dist/` is gitignored and was generated 2026-10-03T23:00Z in this tree; I did not inspect a packed tarball.

## Faithfulness to R1 § A
L160 is byte-identical to my R1 § A sentence (feedback/tasks.md ~L1696). The "L816" is dropped from every user-facing line (none in L158-169). Both strings present: `reference source, not a build input` and `Native onboarding is not supported` (both L160). No numbered steps. No line numbers. No claim a build was run.

## Ledger
| # | Claim | Source | Verdict |
|---|---|---|---|
| 1 | L23: iOS (SwiftUI) components ship as reference source | package.json:77-78 (`src/components/core/**/platforms/ios/*.swift`, Tests excluded), :83 (`src/blend/*.ios.swift`) | TRUE |
| 2 | L160: components read `@Environment(\.dpTheme)` / `any DesignerPunkTheme` | `git grep`: 18 sites `@Environment(\.dpTheme)` + 9 sites `@Environment(.dpTheme)`; 11 sites `any DesignerPunkTheme`; e.g. ContainerCardBase.ios.swift:273 | TRUE |
| 3 | "no shipped file defines" the theme surface | zero `protocol/struct/class DesignerPunkTheme`, zero `var dpTheme` under src/; zero hits in dist/*.swift | TRUE |
| 4 | "names fixed to DesignerPunk's own configuration" | TokenFileGenerator.ts:1246-1249 emits `${abbreviation}ThemeKey`, `var ${lowerAbbr}Theme`, `any ${name}Theme` — consumer-configured; components hardcode `dp`/`DesignerPunk` | TRUE |
| 5 | "your `npx designerpunk generate` does not emit" it | `generateThemeOverrideBlocks` (TokenFileGenerator.ts:1028) is its only definition; sole callee of `generateSwiftThemeTypes` (:1044); no production caller in src/scripts/tools (git grep, tests excluded) | TRUE (read) |
| 6 | "no Swift package manifest" | `git ls-files \| grep -i 'Package.swift\|xcodeproj\|xcworkspace'` empty; package.json `files` ships none | TRUE |
| 7 | "`ContainerCardBase.ios.swift` does not parse" | `swiftc -parse` → `ContainerCardBase.ios.swift:962:2: error: unterminated '/*' comment`, note "comment started here" at L816 (reproduced just now) | TRUE (reproduced) |
| 8 | L163: `dist/DesignTokens.ios.swift` is un-themed base, from DP's own config | file has flat `Color.oklch` constants, no Theme protocol; `colorActionPrimary` absent, only `colorActionPrimary_wcag` (L688); ships via package.json:20 (`dist/**/*.{…swift…}`, `!dist/ios/**`), pack-assert.ts:445 | TRUE |
| 9 | L164: `dist/ComponentTokens.ios.swift` ships and is the component token tier | pack-assert.ts:440; file header "Component-specific tokens" | TRUE |
| 10 | L164: "The shipped components require it" | ButtonIcon.ios.swift:67-80 uses `ButtonIconTokens.*` and defines no local enum (reads ComponentTokens). But Avatar.ios.swift:35 and BadgeLabelBase.ios.swift:46 define their OWN `enum …Tokens` ("matches generated ComponentTokens"); VisualStateStyles.swift:452 says the local extension was removed | PARTLY FALSE — over-general. Correction below |
| 11 | L165: native output omits 14 theme-varying semantic colours incl. `colorActionPrimary`, `colorStructureCanvas` | `colorActionPrimary` absent (only `_wcag`, DesignTokens.ios.swift:688); `colorStructureCanvas` absent (0 matches); count 14 = release-15.0.0.md:127 | 2 names TRUE; "14" UNVERIFIABLE-HERE by me (I did not enumerate theme-varying semantic colours; would need the application MCP token set or the registry) |
| 12 | L166: nine components spell `@Environment(.dpTheme)` without backslash | `git grep -l` → 9 files (Avatar, BadgeCountBase, BadgeCountNotification, BadgeLabelBase, ProgressBarBase, ProgressIndicator{Connector,Label,Node}Base, ProgressPaginationBase) | TRUE |
| 13 | L168: checked by reading source; parse failure reproduced; no iOS build run | as #7; no xcodebuild build run by anyone for this | TRUE (see fork F below) |
| 14 | L168: iOS 17.0+ (SwiftUI, UIKit) | core-goals.md "iOS: 17.0+"; `import UIKit` in DesignTokens.ios.swift:8, BadgeCountNotification, VisualStateStyles | TRUE as the documented floor (no manifest enforces it) |
| 15 | L168: planned follow-up (Spec 129) | .kiro/specs/129-consumer-generation-completeness/design-outline.md exists (placeholder; iOS/Android "fast follow") | TRUE (planned, outline only) |
| 16 | L96: `DesignTokens.ios.swift` "no theme surface yet" | as #8 | TRUE |
| 17 | Reference L253-end: remaining ChromaKit / `sync:ios` / SwiftUI claims | grep: no `ChromaKit`, `sync:ios`, `Xcode` left. Only iOS hits are screen-spec `platforms:`/`ios:` YAML (L566-688, L755-762) and L584 `ProductTokens.ios.swift (Swift constants)` | see Ada flag 2; the YAML hits are product-spec syntax, TRUE |

## Findings that are not in the section (measured today; routed, not scope of 19.4 beyond the corrections)
- `swiftc -typecheck` of `dist/ComponentTokens.ios.swift` + `dist/DesignTokens.ios.swift` together: `cannot find 'SizingTokens'` (42), `'SpacingTokens'` (14), `'BorderWidthTokens'` (2). ComponentTokens refers to enums no shipped file defines; the tier cannot resolve against the base even with a theme surface. DesignTokens alone: `cannot find 'Color'` (198), `'oklch'` (18), `'Typography'`, `'Animation'`, etc. (the file imports UIKit only). Evidence is the dist in this tree, not a tarball. Route: Ada/Lina via Leonardo (generator output, not 123 work).
- Probable redeclaration: Avatar.ios.swift:35 declares `enum AvatarTokens`; ComponentTokens.ios.swift:14 declares `public enum AvatarTokens`. READ ONLY, not compiled (would need a toolchain run with the whole tree; blocked anyway by the above).

## Corrections (exact minimal text)
**C1 (ledger #10, FALSE as written).** Replace L164 with:
`- `node_modules/@3fn/core/dist/ComponentTokens.ios.swift` is DesignerPunk's **component token tier**. Some of the shipped components read it (`ButtonIcon.ios.swift`, for one), and it refers to `SizingTokens`, `SpacingTokens` and `BorderWidthTokens`, which no shipped file defines.`
Note: the 2026-10-03 hold "ComponentTokens.* named as required" (ballot 2026-10-02 / #268) is touched by this; that hold is Peter's/the ballot's to release, so Thurgood should surface it, not me. Minimum-only alternative if the hold is kept: `…The components that read component tokens require it.` — still true, drops the false "all".

**C2 (missing; Ada flag 1).** Add one bullet after L163:
`- `DesignTokens.ios.swift` also calls a `Color.oklch(...)` initializer (and a bare `oklch(...)`) that no shipped file defines and the package does not declare as a dependency. DesignerPunk's generator names ChromaKit for it.`
Basis: dist/DesignTokens.ios.swift (99 `Color.oklch`, 7 ` oklch(`, `import UIKit` only), iOSFormatGenerator.ts:310 and :592, package.json (no ChromaKit). The old "Platform Dependencies for OKLCH" table and migration step 3 ("iOS: ChromaKit via SPM") were deleted in this tree's diff; they are the only place the guide ever said this. UNVERIFIABLE-HERE: that ChromaKit actually provides `Color.oklch(L,C,H)` (needs the package fetched in a toolchain); hence "names", not "provides".

**C3 (missing; Ada flag 2).** Add one bullet after the C2 bullet:
`- Product tokens that reference a theme-varying token are emitted into `ProductTokens.ios.swift` as an extension on `<YourName>Theme`; nothing defines or generates that type.`
Basis: SwiftEmitter.ts:11 (`${configName}Theme`), :49-56 (extension + `var product… : Color { self.… }`, comment "access via @Environment(\.…Theme)"), SwiftEmitter.test.ts:87; with #5 above. Source read; I did not run `generate` with a product-token fixture. Also not false at L584 ("Swift constants" is true for static tokens), so no edit there.

**F (fork, not picked).** Plan R2 says the iOS build claim reads `not built in this amendment`; the guide reads "No iOS build was run." (L168) and neither the guide nor install-doc.test.ts carries the plan string. Substance is identical and the Red condition (claiming a build ran) is not met. Options: (a) keep L168 — "this amendment" means nothing to a consumer on a version-free surface, and amend the plan's wording to the substance; (b) literal string on the surface. I prefer (a); counter: a test that asserts the plan string would then have nothing to assert. Peter/Thurgood pick.

## Answers to Ada
1. **Yes, it belongs under § Platforms › iOS.** The OKLCH initializer is a reason `DesignTokens.ios.swift` does not compile independent of the theme question, and the deleted section was the only place it was said. Keep it a prose bullet (C2), no steps. Surviving counter: it widens the "causes" list the plan declared prose-only and adds a fact (ChromaKit) I could not verify end to end, so name the generator's claim, not the library's behaviour.
2. **Yes, true, and it should be one sentence (C3).** Static product tokens are fine; the theme-varying ones emit `public extension <Name>Theme` against a type nothing defines. It is the same root cause as the components' `dpTheme` and needs no new asserted string.

## What I could not verify
- The count 14 (only `colorActionPrimary`, `colorStructureCanvas` absent confirmed).
- That ChromaKit provides the API; any Xcode build/test; whether the packed tarball matches this tree's dist; the Avatar redeclaration (read only).
- Section numbering at L118 ("sections 2, 3 and 7"), the Android section, README and CHANGELOG surfaces: not in my section.
- `generate` actually writes no theme types for a born consumer: from reading callers; I did not run `generate` against a scratch consumer.

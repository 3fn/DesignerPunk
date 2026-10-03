# Ballot: the Integration Guide's honest native and web scoping for 15.0.0

**Date**: 2026-10-02
**Author**: Ada (owner of `.kiro/issues/2026-10-01-integration-guide-m0a-vs-snapshot-negative.md`, which owes this ballot before Stacy's phase-1 RELEASE record for 15.0.0)
**Status**: **RATIFIED (Peter, 2026-10-02)** — merge of PR #268 is `8d7d3ad1`, the ratification commit on `main`, and the point at which the § "Edit sites" after-texts applied (PR-atomic, per the Ratification line below). PR #268 merged with this line still reading DRAFT: a recording defect, not a silent ratification. This commit records the flip after the fact, naming the merge so later readers see the true ratification point. No `Ratified-machine:` line, per the B-U1 / B-CI / B-U2 / signing-act-chain omission precedent.
**Ratification**: under the PR-gated workflow, **Peter's merge of the PR carrying this ballot IS the ratification** (governance carve-out; PR-atomic, as in the Spec 127 U1 and B-U1 precedents). The guide edits are applied in the **same PR**, exactly as the after-texts below. If Peter modifies any after-text, the ballot and the guide change together before merge.
**Edits**: `governance/DesignerPunk-Integration-Guide.md` only. The full rewrite is Spec 123 Task 19.4's; this is the minimal honest correction that 15.0.0 ships with.

---

## The ruling this applies

Peter, 2026-10-02, relayed by the orchestrator: *"Go with the middle path, ship 15 with the honest native scoping."*
- This is the M0a issue's option A, sharpened.
- **No deprecation promise**: nothing here says a shipped file will stop shipping.
- Peter's 3b ruling (*"Go with A, disclose — and capture the follow-up"*) puts the four newly absent native colours in 15.0.0's disclosure. Site 1 carries that disclosure in the guide.

## Problem evidence (verified on `main` @ `4a19ba6d`; read, not run, unless marked)

1. **The native M0a steps (old L369–413) describe a target that does not compile.**
   - The shipped iOS/Android components read `@Environment(\.dpTheme)` and `LocalDPTheme.current`: 51 files under `src/components/core/` match (`git grep -c`, test files included).
   - `generateThemeOverrideBlocks` (`src/generators/TokenFileGenerator.ts`), which would emit that surface, has **no call site** (`.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`).
   - The native base files omit the 14 theme-varying semantic colours. Four of them are newly absent in 15.0.0. **Measured**: member diff of the 14.1.0 registry tarball against a `main` build, 2026-10-02.
2. **The web theming paragraph (old L360–367) promises `data-theme="my-theme"`.**
   - `generateTokenFiles` uses `config` only for `outputDir` (L54).
   - It registers DesignerPunk's own dark and wcag overrides statically (L19–21, L135–148).
   - The custom-theme web block (`generateWebThemeBlock`, `TokenFileGenerator.ts` L1091) is reachable only through the uncalled `generateThemeOverrideBlocks`.
   - **So no generated CSS, the package's or the consumer's, carries a `[data-theme="my-theme"]` block.**
   - What does exist:
     - the base `:root { color-scheme: light dark; … light-dark() }`;
     - `:root[data-theme="wcag"]`, emitted by the base path (`TokenFileGenerator.ts` L977) into both the package CSS and a consumer's generated CSS.
3. **The imports table lists `@3fn/core/fonts/inter.css`**, which 15.0.0 removes from `exports` (#189).
4. **§ "Upgrading" teaches the retired 14.x `sync` model.**
5. **§ "6. Generate Tokens" says the output includes a theme protocol and data class, and themed values for a custom theme.** Neither is emitted (the same evidence as 1 and 2).

## A correction to the consult's premise (surfaced, not absorbed)

The consult brief's web point read: *a consumer who registered a theme imports their own generated CSS, and `data-theme="my-theme"` only resolves against that file.* **The first half holds for token values; the second half does not hold** (evidence item 2):
- A consumer's own generated `DesignTokens.web.css` carries their token tier's values.
- A custom theme name resolves against **nothing** in 15.0.0.

The site 2 after-text states what is verified. **Sparky and Leonardo should confirm at review**, since the web defect was theirs to raise. This also widens the completeness spec's item (i) to web custom themes; the charter's line (vi) already carries the related Model-B leak.

## Edit sites

### Site 1 — native: replace both M0a blocks (§ "7. Build Your Product", the iOS and Android subsections)

**Before** (old L369–413, verbatim):

````markdown
#### iOS (M0a — Manual Copy)

1. Locate Swift files in the installed package:
   - `node_modules/@3fn/core/dist/DesignTokens.ios.swift`
   - `node_modules/@3fn/core/dist/ComponentTokens.ios.swift`
   - Component platform files: `node_modules/@3fn/core/src/components/core/*/platforms/ios/`
   - Blend utilities: `node_modules/@3fn/core/src/blend/ThemeAwareBlendUtilities.ios.swift`

2. Copy into your Xcode project's source tree

3. Requirements:
   - Minimum deployment target: **iOS 17.0+**
   - Required frameworks: **SwiftUI**, **UIKit**

4. Theme consumption:
   ```swift
   @Environment(\.{abbreviation}Theme) var theme
   // Use: theme.colorActionPrimary
   // Static tokens: DesignTokens.spaceInset100
   ```

**Note**: `npx designerpunk sync:ios` is planned for M0b to automate this process.

#### Android (M0a — Manual Copy)

1. Locate Kotlin files in the installed package:
   - `node_modules/@3fn/core/dist/DesignTokens.android.kt`
   - `node_modules/@3fn/core/dist/ComponentTokens.android.kt`
   - Component platform files: `node_modules/@3fn/core/src/components/core/*/platforms/android/`
   - Blend utilities: `node_modules/@3fn/core/src/blend/ThemeAwareBlendUtilities.android.kt`

2. Copy into your Android module's source tree

3. Requirements:
   - Compose BOM version compatibility with component implementations
   - If using R8/ProGuard: include synced Kotlin files in keep rules

4. Theme consumption:
   ```kotlin
   val theme = Local{Abbreviation}Theme.current
   // Use: theme.colorActionPrimary
   // Static tokens: DesignTokens.space_inset_100
   ```

**Note**: `npx designerpunk sync:android` is planned for M0b to automate this process.
````

**After**:

````markdown
#### iOS and Android (not supported for onboarding in 15.0.0)

**Native onboarding is not supported in 15.0.0.** The package ships DesignerPunk's native component sources and token files, but in this version they do not form a target that compiles in your app:

- `node_modules/@3fn/core/dist/DesignTokens.ios.swift` and `node_modules/@3fn/core/dist/DesignTokens.android.kt` are DesignerPunk's **un-themed base snapshot**. They are generated from DesignerPunk's own configuration, not yours.
- `node_modules/@3fn/core/dist/ComponentTokens.ios.swift` and `node_modules/@3fn/core/dist/ComponentTokens.android.kt` are DesignerPunk's **component token tier**. The shipped components require them.
- The shipped iOS and Android components (`node_modules/@3fn/core/src/components/core/*/platforms/ios/` and `.../platforms/android/`) also read a **theme surface**: `@Environment(\.dpTheme)` on iOS and `LocalDPTheme.current` on Android. **Neither the base files nor your own `npx designerpunk generate` emits that theme surface in this version.**
- Native token output omits the **14 theme-varying semantic colours**, among them `colorActionPrimary` and `colorStructureCanvas`. Four of them were present in 14.1.0's base files and are absent from 15.0.0's:
  - Swift: `colorFeedbackSuccessText`, `colorTextDefault`, `colorTextMuted`, `colorTextSubtle`;
  - Kotlin: `color_feedback_success_text`, `color_text_default`, `color_text_muted`, `color_text_subtle`.

Copying these files into an Xcode project or an Android module therefore does not yield a compiling target.

Native onboarding is delivered by the consumer-generation completeness spec (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`). It covers three things: the theme surface, DesignerPunk's component tier harvested by your own `generate`, and per-platform output paths.

Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit). On Android, the Compose BOM must be compatible with the component implementations.
````

**Notes on site 1**:
- **Dropped**: the R8/ProGuard keep-rule line, which presumed a synced, compiling module.
- **Dropped**: the two `sync:ios` / `sync:android` notes, per the instruction not to describe commands that do not exist.
- **No "deprecated / will stop shipping" sentence.**
- **Kept**: `ComponentTokens.*` is named as required (Lina).

### Site 2 — web: step 7's import comment, the theming paragraph, and the imports table

**2a. Before** (old L348):
```
// Import design tokens
```
**2a. After**:
```
// Import design tokens: DesignerPunk's base (see "What these two imports are" below)
```

**2b. Before** (old L360–367, verbatim):
````markdown
For theming, set the `data-theme` attribute on any HTML element:
```html
<div data-theme="my-theme">
  <!-- All DesignerPunk components inside inherit themed values -->
</div>
```

Base theme applies at `:root` with no attribute. Dark-only themes automatically set `color-scheme: dark`.
````
**2b. After**:
````markdown
**What these two imports are.**
- `@3fn/core/tokens.css` is **DesignerPunk's own base**. It is generated from DesignerPunk's configuration, not yours, and it is the **zero-config evaluation path**: the components render against it with nothing built.
- `@3fn/core/component-tokens.css` is DesignerPunk's **component token tier**. Keep importing it on every path.

**Your own tokens.** After you run `npx designerpunk generate`, import your own `DesignTokens.web.css` from your configured `output` directory **in place of** `@3fn/core/tokens.css`. That file carries your token tier's values. Keep `@3fn/core/component-tokens.css`.

**Themes, in this version:**
- **Dark mode** follows the user's preferred colour scheme, through CSS `light-dark()`. Set `color-scheme` on an element to force light or dark.
- **One theme block is baked in**: `data-theme="wcag"`. It ships in DesignerPunk's base CSS and is generated into yours.
  ```html
  <div data-theme="wcag">
    <!-- DesignerPunk components inside use the WCAG theme's values -->
  </div>
  ```
- **A theme you register in `designerpunk.config.ts` does not yet produce a `[data-theme="<name>"]` block in any generated CSS.** A custom `data-theme` value resolves against nothing in 15.0.0. Theme emission is delivered by the consumer-generation completeness spec (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`).
````

**2c. Before** (§ "Available Imports", two rows):
```
| `@3fn/core/tokens.css` | Design tokens as CSS custom properties |
| `@3fn/core/component-tokens.css` | Component-level tokens as CSS custom properties |
```
**2c. After**:
```
| `@3fn/core/tokens.css` | DesignerPunk's base design tokens as CSS custom properties: the zero-config evaluation path. After `generate`, use your own `DesignTokens.web.css` instead (see step 7, Build Your Product) |
| `@3fn/core/component-tokens.css` | DesignerPunk's component-level tokens as CSS custom properties (required on every path) |
```

**2d. Before** (§ "Available Imports", the last row, kept with its predecessor for uniqueness):
```
| `@3fn/core/fonts/rajdhani.css` | Rajdhani font family (display) |
| `@3fn/core/fonts/inter.css` | Inter font family (legacy, deprecated) |
```
**2d. After**:
```
| `@3fn/core/fonts/rajdhani.css` | Rajdhani font family (display) |
```
*2d goes beyond the brief's three sites. It sits in a table site 2 already edits, and 15.0.0 removes the export (#189). Leaving a row for an import that fails to resolve would ship a false line in the very table being corrected.*

### Site 3 — § "Upgrading": a dated pointer, not a rewrite

**Before** (§ "Upgrading", heading and first line):
```
## Upgrading

After upgrading `@3fn/core` to a new version, run `sync` to detect and apply package changes:
```
**After**:
```
## Upgrading

> **Note (2026-10-02, ballot `2026-10-02-integration-guide-native-scoping`).** This section describes the `sync` flow from **before 15.0.0**: `--accept-all`, `.kiro/sync-manifest.json`, and `sync` updating tokens and components. 15.0.0 retired that flow.
>
> **For the current upgrade path, use 15.0.0's release notes:**
> - `sync` prints its report before changing anything, and converts the manifest to `designerpunk.manifest.json`.
> - `sync --migrate-legacy --target=<cc|kiro>` removes what an earlier `init` copied and attaches the generated agent layer, in the same run.
>
> Spec 123 Task 19.4 reconciles this section.

After upgrading `@3fn/core` to a new version, run `sync` to detect and apply package changes:
```

### Site 4 — § "6. Generate Tokens": the output list and the custom-theme sentence (found by the straggler sweep)

**4a. Before**:
```
- `DesignTokens.ios.swift` — Swift constants + theme protocol
- `DesignTokens.android.kt` — Kotlin constants + theme data class
```
**4a. After**:
```
- `DesignTokens.ios.swift` — Swift constants (no theme surface yet; see "iOS and Android" under step 7)
- `DesignTokens.android.kt` — Kotlin constants (no theme surface yet; see "iOS and Android" under step 7)
```

**4b. Before**:
```
If you registered a custom theme, the output includes themed values scoped by `data-theme` attribute (web) or as additional theme structs/instances (iOS/Android).
```
**4b. After**:
````markdown
**In 15.0.0, a custom theme you register does not yet change this output.**
- Web: no `[data-theme="<name>"]` block is generated.
- iOS/Android: no theme structs or instances are generated.

The web output carries DesignerPunk's base light/dark values and the baked `data-theme="wcag"` block. Theme emission is delivered by the consumer-generation completeness spec (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`).
````
*Site 4 goes beyond the brief's three sites. It was found by the ballot convention's mandatory straggler sweep. Without it, the guide would contradict sites 1 and 2 two sections earlier: the exact two-surfaces-disagree shape this ballot exists to remove.*

## Straggler sweep, and what was deliberately left

`grep -n -i "m0a\|sync:ios\|sync:android\|inter\.css\|my-theme\|manual copy\|data-theme"` over the guide after application. The hits not edited, and why:
- **L67/L72–76/L287** (`my-theme` in § "2. Configure" › "Creating a Theme", and the `generate` sample output): these teach *registering* a theme. Registration is still read: `generate` lists the registered themes in its output (`src/cli/designerpunk.ts` L207–208). Site 4b says what registering does not yet change. A full rewrite is Task 19.4's.
- **L143** ("`mode: 'both'` … not yet supported in M0a"): a stale label, harmless. Left for 19.4.
- **§ "Native Platform Sync — Target Model (M0b)"** (`sync:ios`/`sync:android`): labelled a **target model**, not a shipped command. Its opening sentence ("the manual copy process will be replaced by") now refers to a process site 1 no longer teaches. **Left for 19.4, so it is not touched twice.** Flagged here so 19.4 sees it.

## Citation check

Headings touched: § "7. Build Your Product", § "Web", § "iOS (M0a — Manual Copy)" and § "Android (M0a — Manual Copy)" (both **replaced** by one heading), § "Available Imports", § "Upgrading", § "6. Generate Tokens".
- **The check**: for each, `git grep -n '§ "<heading>"' -- governance .kiro/steering canonical` from this branch returns **0 hits**.
- `git grep -n 'M0a' -- governance .kiro/steering canonical`, excluding the guide itself, also returns 0, so the heading replacement breaks no citation.
- **Not run**: `check:section-citations` (it reads the checkout it runs in). The PR's required checks run it.

## Reviewers

- **Sparky** (web): confirm site 2's correction to the consult premise: custom `data-theme` blocks are not emitted.
- **Leonardo**: the "evaluation base" wording.
- **Kenya** (iOS) and **Data** (Android): site 1's native scoping, including the `dpTheme` / `LocalDPTheme` names.
- **Lina**: `ComponentTokens.*` named as required on every path, and the components' theme-surface sentence.
- **Thurgood**: governance-doc ballot steward; Task 19.4 owner, for the left-for-19.4 stragglers.
- **Stacy**: her phase-1 RELEASE record reads this ballot's state.

## Owed after merge

- **Docs MCP `rebuild_index`** (orchestrator): the guide is served.
- **Close-out of the M0a issue**: a dated line and `git mv` to `archive/` (Ada).
- **15.0.0's release notes and CHANGELOG** "Known limitations" lines are reconciled to cite the guide as corrected, not as stale (the native and web parts; the "Upgrading" part stays as a pointer).

## Counter-argument, and what survives

- **Folded in**: my first draft kept a "for un-themed consumers, copy the base" branch. The components' theme-surface dependency makes that branch false for every consumer, so it was cut. Native onboarding is plainly stated as unsupported.
- **What survives**:
  - **The guide now tells native readers "not supported" while the package still ships native sources and token files.** A reader may reasonably ask why they ship. The answer, that they are the component sources and their component tier waiting on one missing surface, is implicit rather than stated.
  - **Two sites (2d, 4) exceed the brief's minimal scope.** If Peter wants strictly three sites, 2d and 4 can be cut. The cost is that the guide carries a false import row and a false generate sentence into 15.0.0.

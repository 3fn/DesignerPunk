# iOS render spike: XCUITest queries, the element-screenshot ink check, `performAccessibilityAudit`

**Date**: 2026-11-27 (runs 16:50–16:56 UTC, `date -u`)
**Author**: Kenya (iOS)
**Why**: plan-r2 § 2, the row "Probes, before 132's outline" (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md`), places Kenya's iOS render spike before Spec 132's outline. Peter's go for that outline round was received 2026-11-27T16:44:48Z ("Spec with (a), and start 132's outline round now"). This file holds the spike's measured result, for the outline's WP5 round. The goal record that points here is `.kiro/issues/2026-09-26-native-component-distribution.md`.
**Not a gate, not a spec task.** The spike measures tools only. It does not render any DesignerPunk component: today the packaged iOS components do not compile at zero against a consumer's tokens (a one-module typecheck of the 16.3.0 package, packed from `3a3bd072b` and unchanged at `8553499b1`, printed 128 `error:` lines in the default diagnostic style; the repair is Lina's record `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md`).

**Labels**: **VERIFIED** = run today on this Mac, output in the logs quoted below. **UNVERIFIED** = reasoning, or not run.

## What ran (VERIFIED)

- **Toolchain**: Xcode 27.2 (27B52), Apple Swift 6.4.2, macOS 27.2.1. Simulator runtime **iOS 26.0 (23A343)**, the only runtime installed; device iPhone 17. Deployment target **iOS 17.0**.
- **Nothing was downloaded or installed**, and no licence prompt appeared. Neither build log contains "download", "not installed" or "license".
- **The fixture**: `fixture/RenderSpike.xcodeproj`, an app target and a UI-test target, committed with a shared scheme.
  - The app is plain SwiftUI, styled with a scratch consumer's own generated tokens and read through `@Environment(\.dpTheme)` under `.probeTheme(_:)`.
  - The consumer was `@3fn/core` 16.3.0, packed from `3a3bd072b`, then `init --name Probe --abbreviation pr`, then `generate`. Its `dist/tokens/DesignTokens.ios.swift` and `ComponentTokens.ios.swift` were copied into `fixture/RenderSpike/Generated/`. They are **not committed** (that folder's `.gitignore`), because a committed generated file is a stale snapshot.
  - Launch arguments pick the screen (`good`, `bad`, `typo`), the scheme (`light`, `dark`) and the theme family (`base`, `wcag`).
- **The tests**: `fixture/RenderSpikeUITests/RenderSpikeUITests.swift`, 9 tests. Every measured number prints with a `SPIKE ` prefix.
- **Runs**:
  - **Run 1**: 9 tests, 1 failure (`testQueries`, the hidden-view assertion; see finding 1).
  - **Run 2**: the assertion became a measurement, and a modifier-order variant was added. 9 tests, 0 failures, `** TEST SUCCEEDED **`, 48.3 s of test time, 63 s wall including the incremental build.
  - Every ink and audit line is identical across the two runs; only the print order of the bad screen's three audit issues differed.

## Results

### 1. XCUITest queries

| Element | Result |
|---|---|
| `fixture.button` | Found. Frame non-zero (100.7 × 48 pt). Tapped, and its accessibility value read back `1`. So an interaction contract can be checked as tap-then-read. VERIFIED |
| `fixture.decorative.hidden`: `.accessibilityHidden(true)`, then the identifier | **Found**, as `elementType` 1 (`.other`), with a 24 × 24 frame. VERIFIED |
| `fixture.decorative.hiddenFirst`: the identifier, then `.accessibilityHidden(true)` | **Found**, as above. VERIFIED |
| `fixture.decorative.wrapper`: a fixture-only `.accessibilityElement(children: .ignore)` with a label | Found. VERIFIED |

**Finding 1, a correction to my own record.** `kenya-plan-r2.md` L13 said "XCUITest cannot find a hidden view, by design" (UNVERIFIED, training data). **On iOS 26.0 that is false**: a view with `.accessibilityHidden(true)` and an identifier is found by an XCUITest query, in either modifier order (VERIFIED).
- **Consequences for 132's WP5** (my reading, UNVERIFIED as a design):
  - Lina's three decorative Progress-Indicator primitives may not need the fixture-only wrapper. The wrapper still works, and it does not depend on this behaviour, so it is the safer form if the behaviour changes with the runtime.
  - **An `exists` check does not prove VoiceOver presence.** A "hidden from VoiceOver" contract cannot be checked by `XCTAssertFalse(exists)`. It needs another reading, such as the audit, an element's `isAccessibilityElement` from inside the app, or a labelled device read.
  - Whether iOS 17 behaves the same is UNVERIFIED (no iOS 17 runtime).

### 2. The element-screenshot ink check

**The method**: compare each pixel of the element's screenshot with a background sample. The sample is the centre pixel of a bare-canvas fixture element. A pixel counts as ink when the sum of its absolute RGB differences exceeds 24 (of 765). The check passes when the ink fraction is above 0.01.

**The known-bad case**: `fixture.empty` is a `Color.clear` element. It must read 0.0000, or the check does not discriminate.

| Element | base / light | base / dark | wcag / light | wcag / dark |
|---|---|---|---|---|
| background sample (RGB) | (255, 255, 255) | (71, 77, 87) | (255, 255, 255) | (71, 77, 87) |
| `fixture.button` (themed fill) | 0.9900 | 0.9900 | 0.9511 | 0.9894 |
| `fixture.decorative.wrapper` | 0.8086 | 0.8086 | 0.8086 | 0.8009 |
| `fixture.textfield` (UIKit-backed) | 0.0453 | 0.9833 | 0.0453 | 0.9833 |
| `fixture.toggle` (UIKit-backed) | 0.1904 | 0.3011 | 0.1904 | 0.3011 |
| `fixture.empty` (known-bad) | **0.0000** | **0.0000** | **0.0000** | **0.0000** |

All VERIFIED, and identical in run 1 and run 2.

**Finding 2.** The check works for UIKit-backed controls (`TextField`, `Toggle`), the case where off-screen `ImageRenderer` drew a placeholder (`kenya-plan-r1.md` L86). It discriminates: the empty element reads exactly 0. It also follows the theme: the button's ink differs between `base` and `wcag` in light (0.9900 against 0.9511).

**Limits** (UNVERIFIED as a general rule):
- The threshold and the 0.01 floor are mine, tuned on one fixture.
- A light text field reads 0.0453, near the floor, because only its border and placeholder differ from white.
- 132's lane should pick the floor per element class, or compare against a known-good screenshot of the same element.
- "Ink" proves that something drew. It does not prove that the right thing drew; that is D5's look check.

### 3. `performAccessibilityAudit` (iOS 17+ API, run on iOS 26.0)

| Screen | Audit types | Issues |
|---|---|---|
| good / light | `.all` | **0** |
| good / dark | `.all` | **0** |
| bad / light (known-bad) | `.all` | **3**: `bad.tiny` "Hit area is too small" (type 4); `bad.tiny` "Element has no description" (type 8); `bad.contrast` "Contrast failed" (type 1) |
| typo / light | `.dynamicType` | **1**: `typo.fixed` "Dynamic Type font sizes are unsupported" (type 65536). `typo.style` (`.font(.body)`) was not flagged |

All VERIFIED, and the same set in both runs.

**Finding 3.** The audit runs on the simulator with no device. It reports nothing on a clean screen in either scheme, and reports each planted defect. Its issue handler lets a test record issues and decide for itself, so a known-bad case can be asserted.

**Finding 4, a cost for 132's D5, not a defect filed here.** The audit flags a fixed point size: `.font(.system(size: DesignTokens.fontSize100))`.
- The shipped iOS components hold **30 `.system(size:)` calls in 18 files**, and **0** uses of `relativeTo:`, `@ScaledMetric` or `dynamicTypeSize`. The 18 files include **Chip-Base, Chip-Filter and Chip-Input, one call each**, so the first family carries this cost. VERIFIED by a multi-line count (`perl -0777`, pattern `\.system\(\s*size:`) over `src/components/core/*/platforms/ios/*.swift` at `8553499b1`, `*Tests.swift` excluded, preview code included. *(Corrected 2026-11-27, Kenya: this line first read "26 `.system(size:)` lines in 14 files". That count came from a single-line grep, which missed calls written as `.font(.system(` with `size:` on the next line, Chip-Base's among them; prior text at `cabf37ada`.)*
- So a blanket `.all` audit on D4's catalog screen will report Dynamic Type issues wherever those lines render.
- Whether that is a defect or an accepted exclusion is a typography decision: Ada for the tokens, Lina for the components, Leonardo for the product view. It belongs in 132's outline round, not in this file.

## Added 2026-11-27: the R2 probes (Spec 132's outline cross-read)

These four probes were run for `[KENYA R1]` and `[KENYA R2]` in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md`. The setup is the same as above: Xcode 27.2, iOS 26.0 simulator (23A343), iPhone 17, deployment target 17.0, nothing downloaded.
- **Re-run from these committed files (run 3)**: 13 tests, 0 failures, `** TEST SUCCEEDED **`, 69.9 s of test time.
- **The 13 tests**: the original nine, plus `testSnapshotProbe`, `T13Tests.testHidden`, `T13Tests.testVisible` and `T12Tests.testDynamicTypeAudit`.
- **The four probe tests measure; they assert nothing.** Their `SPIKE ` lines below are the record.

### 4. T-13: what can tell that a view is hidden from VoiceOver

- **XCUITest snapshot** (`testSnapshotProbe`). The `dictionaryRepresentation` for the hidden circle has the same keys as any visible "other" element: `displayID`, `elementType` (1), `enabled`, `frame`, `hasFocus`, `horizontalSizeClass`, `identifier`, `label` (empty), `selected`, `title`, `verticalSizeClass`, `windowContextID`. **There is no hidden or accessibility-element flag.** VERIFIED.
- **Hidden images with no custom identifier** (`T13Screens.swift`, `T13Tests.swift`). Screen `t13hidden` has two SF Symbol images, both `.accessibilityHidden(true)`, one also carrying a custom identifier. Screen `t13visible` has the same two images, not hidden.

| Read | `t13hidden` | `t13visible` |
|---|---|---|
| `app.images` | 2: `star.fill` "Favorite", `t13.hidden.withId` "Love" | 2: the same, with the visible identifier |
| `app.descendants(matching: .any).count` | 10 | 10 |
| In-app walk: labels of objects with `isAccessibilityElement == true` | Anchor, Walk, not run | Anchor, **Favorite**, **Love**, Walk, not run |

- **What the walk is.** `AXWalk.run()` runs inside the app, triggered by a button while XCUITest drives it. From each window it recurses through `accessibilityElementCount()` / `accessibilityElement(at:)`, `accessibilityElements` and `subviews`.
- **Finding 5.** XCUITest's query cannot tell hidden from visible: a hidden image is found even with no custom identifier. The in-app walk can: the hidden images drop out, and the known-bad twin brings them back. VERIFIED, identical in three runs (two during R2, and run 3).
  - The walk's elements expose no `accessibilityIdentifier`, so its assertion has to match by **label**.
  - The walk ran under XCUITest. Run without an accessibility client attached, it is UNVERIFIED and may return nothing, which is my reading of `kenya-plan-r1.md`'s zero-element result.

### 5. T-12: fixed and scaled type under the Dynamic Type audit

- **The screen** (`T12Screen.swift`, `T12Tests.swift`) shows three texts at `DesignTokens.fontSize100`:
  - `.font(.system(size:))`;
  - a `ViewModifier` with `@ScaledMetric(relativeTo: .body)` feeding `.system(size:weight:)`;
  - `.font(.custom("Figtree", size:, relativeTo: .body))`.
- **Finding 6.** `performAccessibilityAudit(for: .dynamicType)` flags only the fixed form ("Dynamic Type font sizes are unsupported", type 65536), and neither scaled form. VERIFIED.
- **A related compile check** (VERIFIED, `swiftc -typecheck`, iOS 17.0 target, not part of the fixture): `.system(size:weight:relativeTo:)` does not exist. The compiler reports "extra argument 'relativeTo' in call".

### 6. T-4: an adopter package importing the root package by local path

- **The layout** (`t4-local-path/`): a root `Package.swift` with one target, `DesignerPunk`. That target holds only the consumer's generated `DesignTokens.ios.swift` and `ComponentTokens.ios.swift`, which are gitignored, copied in, and must come from a consumer named `Probe`. Then an adopter package at `ios/AdopterComponents/` whose `FilterBar` imports `DesignerPunk` and reads `DesignTokens`, `\.dpTheme` and `.probeTheme(_:)`.
- **Build command**: `xcodebuild build -scheme AdopterComponents -destination 'generic/platform=iOS Simulator'`, run from `ios/AdopterComponents/`.
- **Finding 7.**

| Dependency line | Result |
|---|---|
| `.package(name: "DesignerPunk", path: "../..")` (committed) | `** BUILD SUCCEEDED **`, no warnings |
| `.package(path: "../..")` | "Could not resolve package dependencies: unknown package 'DesignerPunk' in dependencies of target 'AdopterComponents'; valid packages are: 't4-local-path'" |

  - A path dependency's package identity is the **directory name of the adopter's repository**, not our manifest's `name`.
  - So generated manifests, code samples and the walkthrough must write the `name:` form.
  - Both rows VERIFIED, run from these committed files.

### 7. A file added to a synchronized folder needs no project edit

`T12Screen.swift`, `T13Screens.swift`, `T12Tests.swift` and `T13Tests.swift` joined their targets with no change to `project.pbxproj`. That is evidence for T-3. VERIFIED: `git diff` shows `project.pbxproj` unchanged since `cabf37ada`.

## What was not run

- **The iOS 17 runtime: not run.** No iOS 17 simulator runtime is installed (only iOS 26.0). Getting one needs either:
  - a local download (`xcodebuild -downloadPlatform`, several gigabytes, size UNVERIFIED), which Peter approves; or
  - a dispatched CI run on an older image, which needs Peter's go and an issue-row grant for a `.github/workflows/` change.

  Neither was asked for or done. Whether Xcode 27.2 can run an iOS 17 runtime at all is UNVERIFIED.

  **Update, 2026-11-27.** Peter approved a local download ("Re: 2, (a)", received 2026-11-27T17:20:36Z) and picked "17.5" (received 2026-11-27T18:07:40Z). Apple's Xcode support table lists Xcode 27.2's simulator range as "iOS 17 or later" (READ, developer.apple.com/support/xcode, 2026-11-27T17:24Z). But `xcodebuild -downloadPlatform iOS -buildVersion 17.5` printed "iOS 17.5 is not available for download." and exited 70 at 2026-11-27T18:08:51Z, with no prompt; an earlier attempt with the build number `21F79` failed the same way. Nothing was downloaded. The obligation is held in `.kiro/issues/2026-11-27-ios-17-runtime-probe-owed.md`. The standing wording therefore holds: built for iOS 17.0, not run on 17 (Spec 129 `design.md` § 0). This is item 2 of the goal record's § "iOS obligations filed here under rule 10 (2026-11-27, Kenya)".
- **CI**: everything ran on this Mac. Whether a standard `macos-26` runner gives the same numbers is UNVERIFIED.
- **VoiceOver speech, Dynamic Type at the largest size, reduce motion**: not run.
- **Any DesignerPunk component**: not rendered (see "Not a gate" above).

## How to reproduce

1. Make a scratch consumer, `npx designerpunk init`, then `npx designerpunk generate`. Copy its `dist/tokens/DesignTokens.ios.swift` and `ComponentTokens.ios.swift` into `fixture/RenderSpike/Generated/`. The app calls `.probeTheme(_:)`, so `init --name Probe`; another name needs that one call renamed.
2. From `fixture/`:
   ```
   xcodebuild test -project RenderSpike.xcodeproj -scheme RenderSpike \
     -destination 'platform=iOS Simulator,name=iPhone 17' -derivedDataPath <scratch>/dd
   ```
3. `grep '^SPIKE '` in the log gives the tables above.

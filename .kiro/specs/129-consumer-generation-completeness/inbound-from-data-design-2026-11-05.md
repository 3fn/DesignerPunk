# Inbound to Spec 129's design round from Data (Android)

**Date**: 2026-11-05
**From**: Data (Android platform engineer; Android harness designer under Requirement 2)
**Go**: Peter, received 2026-11-05T05:38:16Z (orchestrator relay), verbatim: "658 and 664 are merged; go for design".
**Read at**: `origin/main` `2622faf3e` (requirements merged as #658, `55004006b`).
**Labels**:
- **VERIFIED**: I ran it or read it myself. My Android measurements were made on 2026-11-04 in a scratch directory, with Kotlin 2.4.21, AGP 9.5.0, Compose BOM 2026.09.00, `compileSdk 36` and JDK 17.0.21, on the 15.1.0 consumer fixture tokens (`tests/onboarding-trio/fixtures/born-cc/design-tokens/`) and the component source on `main`. The tools and their cache were deleted at Peter's yes on 2026-11-05; the run logs are kept in the session scratchpad. Nothing was re-run for this note.
- **REASONING**: inference or training data.
- **UNVERIFIED**: nobody has checked it.

**My items and who decides each:**

| Item | Who decides |
|---|---|
| The Android harness design (§ 1) | me |
| Kotlin diagnostic normalisation (Req 3, "Kenya and Data own how each platform's diagnostics are normalised") | me |
| The Kotlin type table (§ 2) | Ada decides; I am consulted |
| The Android `CompositionLocal` default and kind (§ 3) | Ada decides; I am consulted |
| Q12 and Q13, Android side (§ 4) | Lina and Ada decide; I am consulted |
| The Kotlin same-name fix (§ 5) | Ada and I |
| Plan decision 5, the Android minimum and toolchain range (§ 6) | Peter |

---

## 0. Plain language (for Peter)

- **The Android build check** should be one small Gradle project with three modules. The merged Requirement 2.6 says one module plus a probe. As written, that probe can never run while any component still fails to compile, so D1 could not be proven at 129's close. I propose a one-sentence correction (§ 1.1).
- **Kotlin types.** I recommend Compose's own types for text size, font weight, letter spacing and typography. Percent corners would be emitted as a corner size. Ada decides.
- **Themes.** Which colours vary between themes depends on each adopter's own theme settings. Components therefore cannot rely on a list of "varying" colours. The theme should carry every semantic colour, under one fixed name that every adopter's output provides, plus an alias in the adopter's own name. Lina and Ada decide.
- **I found two defects in the not-yet-wired Android theme generator** (§ 3). They are not in any record. As written, every theme colour would come out "unspecified": the code compiles and draws nothing. A compile cannot catch this; a generator test can.
- **Yours: the Android minimum** (§ 6). I lean to Android 8.0 (API 26). Nothing in 129 waits on the emulator probe. The toolchain range numbers come from Spec 132's app builds.

---

## 1. The Android harness (my decisions)

### 1.1 Module layout

**Decision.** `harness/android/` is one Gradle build with three `com.android.library` modules, all with the Compose compiler plugin applied:

| Module | Sources | Feeds |
|---|---|---|
| `:tokens` | the consumer's generated Kotlin only: `DesignTokens`, `ComponentTokens`, the theme types, `ProductTokens` | `harness-android-tokens` |
| `:probe` | the probe files the harness generates from the token index (Req 2.7). Depends on `:tokens`. Every read happens inside `@Composable` functions | `harness-android-tokens` |
| `:dp` | the generated Kotlin **and** every non-test `.kt` in the packed tarball (`node_modules/@3fn/core`), read in place, with the Icon-Base `res/` directory as its resources. Includes the hand-written `ThemeAwareBlendUtilities.android.kt` and `MotionTokens.kt` (Req 2.4) | `harness-android-components`, which counts only diagnostics located in package files (Req 2.6, "own tier's files") |

The generated files are compiled twice, in `:tokens` and in `:dp`. Each compile takes seconds.

**Why.**
- **A module that depends on a failing module gets no verdict.** With `:components` depending on a failing `:tokens`, Gradle ran `:tokens:compileDebugKotlin`, failed, and reported 0 component diagnostics (VERIFIED, `run-components.log`, 2026-11-04). So:
  - if the probe depends on `:dp`, it never compiles while any component error remains;
  - Requirement 1.4 allows component entries at 129's close (tagged to records outside 129);
  - so D1's probe half (Req 2.7) would never run, and D1 could not be accepted.
- **The probe must sit in a different module from the files it reads.** Req 2.7 asks that "a planted non-`public` member in a fixture SHALL produce an entry". A Kotlin `internal` member is readable inside its own module (REASONING, language rule), so an in-module probe cannot see the planted member.
  - The generated Kotlin declares no `internal` member today (VERIFIED, grep, 0), so the fixture is the only case in which this matters now. It is the case Req 2.7 names.
- **Reads go inside `@Composable` functions.** A `CompositionLocal`'s `.current`, and the product-token getters (`@Composable @ReadOnlyComposable`), can only be read from a composable. A probe that reads them from a plain function is itself a compile error (VERIFIED, `jvmprobe.log`: "@Composable invocations can only happen from the context of a @Composable function").
- **Package tokens and components in one module.** One compile reports every component file even while token files fail. K2 reported syntax and resolution errors across 43 files in a single pass (VERIFIED, `run-android-combined-2.log`: 723 diagnostics).

**A correction the requirements need** (a CORRECTION edit for Thurgood; it does not widen any criterion). Req 2.6's Android sentence reads "the token and component verdicts SHALL come from one compile in which the packaged component sources and the generated token files are one module". That was my R1 wording, and the evidence above shows it cannot hold for the token verdict. Proposed:

> "**Android**: the component verdict SHALL come from one compile in which the packaged component sources and the generated token files are one module, with the Compose compiler plugin applied. The token verdict SHALL come from a compile of the generated files alone and a second module that reads them from inside `@Composable` functions."

- **Counter-argument**: two compiles of the generated files means two places for a generated-file error to show, and the component context could be tempted to count them twice.
- **Folded in**: Req 2.6 already confines each context's list to its own tier's files. So `:dp`'s diagnostics in generated files are dropped by path, not keyed. The cost is a few seconds per run.
- **Residual**: a defect that shows **only** when generated and package files are compiled together appears in `:dp` alone. An example would be a package file declaring a name the generated file also declares: Redeclaration, VERIFIED in a one-module test (`layout-collide2.log`). If that diagnostic is located in the generated file, the path rule drops it and neither context sees it.
  - So the component context SHALL keep any `:dp` diagnostic located in a generated file whose message names a package file, or that does not occur in `:tokens`' own run. I propose the simpler of the two, the second: a generated-file diagnostic in `:dp` that `:tokens` did not report is keyed in the component context, under the generated file's path.

### 1.2 Capturing Kotlin diagnostics, and the key format

**Decision.**
- Run `gradle --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin :dp:compileDebugKotlin`.
- Parse the console output: a diagnostic starts at a line beginning `e: file://<path>:<line>:<col> <message>`. Its continuation lines are every following line up to the next `e: ` or `w: ` line, or the next Gradle line (`> `, `FAILURE`, `* `, `[Incubating]`, `BUILD`). Warnings (`w:`) are not keyed.
- **Key** = `<root>:<relative path>` + ` | ` + the message, with continuation lines joined by ` ⏎ ` and runs of whitespace collapsed. `<root>` is one of:
  - `pkg:` for paths under `node_modules/@3fn/core/`, relative to the package root;
  - `gen:` for the consumer's generated output, relative to the consumer root;
  - `probe:` for the probe module.

  Line and column are dropped. Quoted identifiers and type renderings are kept. The count is the number of occurrences.

**Why** (all VERIFIED, from `run-android-combined-2.log` and three repeat runs):
- **Continuation lines carry the name.** 21 of 723 diagnostics run over several lines. For example, "None of the following candidates is applicable:" names the symbol only on its continuation lines. Keys with continuation lines: **234**. First line only: **220**, so 14 distinct failures would share a key.
- **Stable.** Three runs gave identical diagnostic lists (`det-1/2/3.sorted`, 1,025 lines each).
- **Size.** At that input there are 234 keys: 28 token-tier and 206 component-tier. 73 keys have a count above 1. The largest is `Unresolved reference 'Oklch'` ×99 in `DesignTokens.android.kt`.

**Counter-argument**: K2's type renderings, for example `Map.Entry<uninferred K (of fun <K, V> Map.Entry<K, V>.copy)…>`, are long and change between Kotlin versions, so a Kotlin bump re-keys entries that have not changed in substance.
- **Folded in**: Req 3.5 (a) admits additions in a diff that changes a pinned version, and removals are always allowed. So a Kotlin bump is one re-baselining PR, printed.
- **Residual**: that PR's list diff is noisy, and its reviewer cannot tell a real new failure from a reworded one without reading. The toolchain-match check (Req 3.11) at least makes the bump visible.

### 1.3 The uncovered-error route (Req 3.5 (c)) on Kotlin

**Decision.** (c) as merged covers the Android cases I measured. No Android-specific exception is needed. The three Android shapes:
1. **A generator fix uncovers type errors in the token files.**
   - Example: row 6 adds the imports, and the follow-on errors behind unresolved names go away. These are "Cannot extend an object" at `DesignTokens` L588, "'transform' overrides nothing" at L589, and the opt-in plus two "Cannot infer type" errors at L455 (VERIFIED, `all2.txt`).
   - The real type errors then appear as new keys.
   - The same diff removes entries from an Android list, so (c) admits them.
2. **A token fix changes counts in component files** (missing names cascade; Kenya's note under Req 3). A removal from the Android token list admits the Android component additions, because (c) says "a list of the same platform".
3. **A component fix uncovers the rest of its own file.** Example: the unclosed comment at `VisualStateStyles.kt` L586 hides everything after it. The diff edits that file, so (c) admits it.

When `:tokens` first compiles cleanly, `:probe` starts compiling and its diagnostics appear as additions. That is shape 1, in the same diff.

**Counter-argument**: (c) also admits an unrelated Android regression that rides on any Android fix. **Residual**: it is printed as `unmasked:` and tagged, and Stacy reads it (Req 3, "Its limits"). That is accepted in the merged text.

### 1.4 Floor and file list (Req 3.4)

**Decision.**
- The harness computes the per-tier `.kt` list at run time:
  - `gen`: the `.kt` files under the consumer's configured output;
  - `pkg`: `npm pack --dry-run`'s file list, filtered to non-test `.kt`.
- It passes those files to Gradle as explicit source files, not as directories. A source directory that does not exist is skipped silently (REASONING), so a moved package path would compile zero files.
- A Gradle task prints the files it compiled, and the comparator checks that count against the floor.
- The packed tarball holds no `*Test.kt` file (VERIFIED: 0 in the 16.2.0 install, Q5 round). The filter stays anyway, so that a future packed test file cannot widen the set.

### 1.5 Pins (Req 2.8): the values I propose

These are harness pins, not minimums (Req 2.9). "Compiled" means the versions I compiled with on 2026-11-04 (VERIFIED that they resolve and compile together). None has been run on CI.

| Pin | Value | Note |
|---|---|---|
| Runner | `ubuntu-24.04` | Matches the required gate (#657). The Android SDK, platforms 34–37, JDK 17 (default) and Gradle 9.8.2 are preinstalled (VERIFIED, `actions/runner-images` Ubuntu 24.04 readme, image 20261026) |
| JDK | 17 (the image's `JAVA_HOME_17_X64`; 17.0.21 on that image) | AGP 9 needs 17 or later (REASONING) |
| Gradle | 9.8.2, pinned through `gradle/actions/setup-gradle`, so that no `gradle-wrapper.jar` binary is committed | Compiled |
| AGP | 9.5.0 | Compiled. AGP 9 compiles Kotlin without the `org.jetbrains.kotlin.android` plugin (VERIFIED: my probes applied only `com.android.library` and the Compose plugin) |
| Kotlin and the Compose compiler plugin | 2.4.21 (the plugin version is the Kotlin version) | Compiled |
| Compose BOM | 2026.09.00, which maps `material-ripple` to 1.12.1 | `rememberRipple` is `DeprecationLevel.ERROR` from 1.7.0 through 1.12.1 (VERIFIED, published source jars). The baseline holds exactly 3 such entries (Button-Icon L245, Input-Checkbox-Base L471, Input-Radio-Base L424). That is the check Req 2.8 names |
| `compileSdk` | 36 | Preinstalled |
| `minSdk` | Peter's number once he rules (§ 6). Until then 24, the repo's current default (`src/build/workflow/ConfigHelpers.ts` L583) | **No effect on any 129 verdict**: a Kotlin compile checks no API level (Req 2.9) |
| Coil | `io.coil-kt:coil-compose` 2.7.0 | The components import `coil.compose` (4 imports, VERIFIED), which is Coil 2's package; Coil 3 uses `coil3` (REASONING) |
| Material icons | `androidx.compose.material:material-icons-extended` 1.7.8 | The components import `androidx.compose.material.icons.filled` (2 imports, VERIFIED). Pinned on its own, outside the BOM (REASONING: no longer in the BOM) |
| Colour library | `com.github.ajalt.colormath:colormath-ext-jetpack-compose` 3.7.1, **only while** the generated Kotlin calls `Oklch(…).toComposeColor()` | Drops out when Ada's native colour values land (row 4); that PR removes the pin under Req 3.5 (a) |

**Toolchain match (Req 3.11).**
- A Gradle task prints `java.version`, `gradle.gradleVersion`, the Kotlin compiler version that ran, and the resolved AGP and BOM versions.
- The comparator fails on any difference from the pin file.

**Cost** (REASONING, not measured on CI):
- Gradle's step is seconds once the dependencies are cached. Locally: 7 s for the token tier and 12–17 s for both tiers without a daemon; the first run took 35 s, including dependency resolution (VERIFIED, 2026-11-04).
- The dependency cache was about 274 MB of modules (VERIFIED), cached through `setup-gradle`.
- Building it: about 1 session for the Gradle build, the diagnostic parser and the file-list task, given the shared driver (Ada) and the comparator (Thurgood).

---

## 2. The Kotlin type table (Ada decides; my consult)

Today's table is `getKotlinType` in `src/providers/AndroidFormatGenerator.ts` L151–173 (VERIFIED). What the components read is the evidence for each row:
- `font_size_*`: 37 reads;
- `line_height_*`: 20;
- the `typography_*` composites: 9 reads, in 4 files;
- `font_weight_*`, `font_family_*` and `letter_spacing_*`: 0 direct reads.

(All VERIFIED by grep of the 39 component files.)

| Family | Today | My consult read | Why |
|---|---|---|---|
| sizing | `Float` (the `default`, no case) | **`Dp`** (I-1) | Same reason as spacing. I agree with Ada |
| fontSize | `Dp` (`val font_size_100 = 16.dp`) | **`TextUnit` in `sp`** (`16.sp`) | `Dp` ignores the user's font scale. `sp` does, which is why Compose text takes `TextUnit`. The components' own comments say "13sp" (`BadgeCountBase.android.kt` L153). `lineHeight` stays a `Float` multiplier, and `font_size * line_height` stays a `TextUnit` (REASONING: `TextUnit` has a `times(Float)` operator) |
| fontWeight | `Int` | **`FontWeight`** (`FontWeight(700)`) | No component reads it directly. Only the typography composite uses it, and Compose's `TextStyle` takes a `FontWeight`. Row 8 already names `Int` as the wrong type for Compose |
| letterSpacing | `Float` (for example `-0.025f`) | **`TextUnit` in `em`** (`(-0.025).em`) | The values are em fractions. A bare `Float` loses the unit, and `TextStyle.letterSpacing` is a `TextUnit` |
| fontFamily | `String` holding a CSS stack (row 5) | **`FontFamily`**, mapped from the stack's generic family: `sans-serif` → `FontFamily.SansSerif`, `monospace` → `FontFamily.Monospace`, `serif` → `FontFamily.Serif`. A named font with no resource falls back to the generic family, which a comment states | A CSS stack in a `String` compiles but no Compose API takes it (the Android twin of Kenya's iOS point). Ada decides row 5; this is the Android reading |
| `typography_*` (the composite) | `Typography(…)`, a type nothing defines (row 4: 39 constructions) | **Compose `TextStyle`** (`TextStyle(fontSize = …, lineHeight = …, fontWeight = …, letterSpacing = …, fontFamily = …)`) | It is the platform type `Text(style = …)` takes. The 9 component reads change shape (`.fontSize.sp` becomes `.fontSize`; `.fontWeight.toInt()` goes): 9 sites in `ButtonCTA`, `ButtonVerticalListSet`, `NavHeaderPage` and `VerticalListButtonItem` (VERIFIED, grep) |
| radius | `Dp` for every token, including `radius_half = 50.dp` (row 8) | **`Dp` for absolute radii. A percent radius is emitted as `CornerSize` (`CornerSize(50)`), its type chosen per token, not per family** | `RoundedCornerShape` accepts a `CornerSize`, so a 50% corner keeps its meaning (REASONING, Compose API). `radius_max = 9999.dp` stays the pill workaround. No component reads `radius_half` or `radius_max` today (VERIFIED, grep), so this costs no component edits |
| colour | declared `Int`, emitted as `Oklch(…).toComposeColor()` (row 8) | **Compose `Color`, constructed natively** (Ada's call on the colour space; `Color(r, g, b, a, ColorSpaces.DisplayP3)` or the OKLab form) | The OKLab constructor compiled in my JVM probe (VERIFIED, `jvmprobe.log`, no errors on that line). The Display P3 form uses the same constructor (REASONING) |
| spacing, tapArea, borderWidth, layering | `Dp` | keep | — |
| lineHeight, density, opacity, blend | `Float` | keep | unitless |
| breakpoint | `Float` | keep for now | No component reads it. A `Dp` reading is arguable, but not 129's |

**`const val` and the import list.**
- `TextUnit`, `FontWeight`, `FontFamily`, `TextStyle`, `CornerSize` and `Color` are not compile-time constants. They are emitted as `val`, as `Dp` already is (`AndroidFormatGenerator.ts` L138–L142, VERIFIED).
- Row 6's computed import list then covers `androidx.compose.ui.unit.{dp, sp, em, TextUnit}`, `androidx.compose.ui.text.{TextStyle, font.FontWeight, font.FontFamily}`, `androidx.compose.foundation.shape.CornerSize` and `androidx.compose.ui.graphics.{Color, colorspace.ColorSpaces}`, each only when used.

**Counter-argument.** `Float` everywhere is the smallest diff, matches iOS and web, and keeps Lina's groups B and C compiling as written.
- **Folded in**: only fontSize has wide reach (37 reads, 38 sites in Ada's count). The other changes reach the typography composite (9 sites) or nothing.
- **Residual**:
  - The fontSize move is the largest component-side change in this table.
  - The six badge `minWidth = (font_size * line_height).dp` sites need a deliberate unwrap, and whether a badge minimum should scale with font size is a design call. That is Lina's (with Leonardo), not a type call.
  - Platform types also make the Android token file less like the iOS and web files.

---

## 3. Item (i) on Android: the `CompositionLocal` (Ada decides; my consult), and two emitter defects

**Consult read: `staticCompositionLocalOf`, defaulting to the base light theme instance, not `error(…)`.**
- **Static**: a theme changes rarely (light, dark, WCAG). A static local skips per-read tracking and recomposes the subtree when the provider changes, which is the trade a theme wants (REASONING; Material's colour scheme local works this way, from training data). The emitter today writes `compositionLocalOf` (`TokenFileGenerator.ts` `generateKotlinThemeTypes`, VERIFIED).
- **A light default, not an error**: 21 component files import `androidx.compose.ui.tooling` (VERIFIED, outline R1), and 20 of them declare `@Preview` functions (31 in all; VERIFIED, Q5 round). Previews run with no provider. An `error(…)` default compiles, then crashes in every preview and in any adopter screen without a provider.
- **Counter-argument**: a silent default hides a missing provider, so an adopter's dark mode renders light and nobody notices.
- **Folded in**: the generator also emits a one-call provider composable (`{Name}Theme(darkTheme = isSystemInDarkTheme()) { content }`), so providing the theme is the easy path.
- **Residual**: a forgotten provider is still silent. Only a runtime test catches it, and that is Spec 132's D5.

**Two defects in `generateKotlinThemeTypes`, read in source (VERIFIED by reading; the emitter is unwired, so neither has been compiled). Neither is in a record.**
1. **Every theme colour would be emitted as `Color.Unspecified`.**
   - `rgbaToComposeColor` parses only `rgba(…)` strings and returns `Color.Unspecified /* unresolved: … */` for anything else.
   - Its input is `getResolvedValue`, which returns `primitiveReferences.value`.
   - For real semantic colours that is a primitive name: `'color.action.primary'` has `primitiveReferences: { value: 'cyan300' }` (`src/tokens/semantic/ColorTokens.ts` L330).
   - The tests pass only because their fixtures put `rgba(…)` strings there (`src/generators/__tests__/KotlinThemeTypes.test.ts` L27–L83).
   - Unless the wiring resolves references first, every theme colour compiles and draws nothing. iOS has the same shape (`rgbaToSwiftUIColor` → `Color.clear`).
   - **A compile cannot catch this.** A Jest assertion on real generated output can: no `Color.Unspecified` or `Color.clear` in emitted themes, with the fixture built from real token definitions.
2. **The theme block writes its own `import` lines** (`import androidx.compose.runtime.compositionLocalOf`, `import androidx.compose.ui.graphics.Color`). The design is to append the block after the base file's content (the method's doc comment says the web block goes "after `:root` footer"). If the Android block is appended to `DesignTokens.android.kt`, those imports land mid-file, which is a syntax error: "imports are only allowed in the beginning of file" (VERIFIED as a K2 diagnostic class, on `TokenMapping.kt` L485). Row 6's computed import list should own every import, or the theme types go in their own file.

---

## 4. Q12 and Q13, the Android side (Lina and Ada decide; my consult)

**Q13 consult read: option (a), the theme carries every semantic colour.** This is the strongest reason I can give, and it is not Android-specific.
- `generateKotlinThemeTypes` builds the theme's property set from the **consumer's** overrides: `overrideKeys` of each registered theme, plus every colour whose base light and dark values differ (VERIFIED by reading, the `varyingNames` set).
- So which colours are "theme-varying" changes from adopter to adopter.
- Under (b), components read static colours as `DesignTokens.<name>`. An adopter whose dark theme overrides one of those colours gets a component that ignores the override and draws the base value. It compiles, so no instrument sees it.
- Under today's mixed form, a component that reads `theme.color_x` fails to compile in any consumer whose overrides leave `color_x` static.
- Only (a) gives every consumer the same property set, and so a component read set that compiles everywhere and honours every override.
- **Android cost of (a)**: the generated data class has about 62 properties (the index's colour semantics count, VERIFIED in my outline R1), well under the JVM's 255-parameter limit. The instances are generated per consumer, never hand-written under Model B, so a growing constructor breaks nothing an adopter wrote.
- **Counter-argument**: under (a) the theme no longer means "what varies", and the generated file grows by about 62 × the number of themes lines.
- **Residual**: that growth, plus the outline's Android note that a hand-written theme instance would break. Under Model B nobody hand-writes one, but an adopter could.

**Q12 consult read: a fixed name the package defines, with an alias in the adopter's own name.**
- With (a), the theme's shape no longer depends on the consumer, so one fixed name can serve every consumer.
- On Android the components already read `LocalDPTheme` (25 files) and `DesignerPunkTheme` (15 reads) (VERIFIED, grep). The emitter's default arguments are exactly those names (`name = 'DesignerPunk'`, `abbreviation = 'DP'`).
- **Proposal**: the generated output always declares `data class DesignerPunkTheme(…)` and `val LocalDPTheme`, so components need **no** name edits. It also emits `typealias {Name}Theme = DesignerPunkTheme` and `val Local{ABBR}Theme = LocalDPTheme`, so adopter code reads its own product name. The generator skips the aliases when they would equal the fixed names.
- The instances keep the consumer's name: `object {Name}Themes { val Light; val Dark; … }`.
- This answers Leonardo's objection that the fixed option "sits badly with generated names using the product's name": the adopter-facing names are still the product's. The harness consumer's non-`DP` abbreviation (Req 2.2) proves that both the fixed names and the alias compile.
- **Counter-argument**: two names for one thing is a teaching cost, and "DP" in an adopter's build is our brand.
- **Residual**: real, and a matter of taste. It is Lina's and Leonardo's to weigh. Kenya should say whether Swift can alias an `EnvironmentValues` key path as cheaply; I do not know (UNVERIFIED).

---

## 5. Hand-written same-name declarations in the adopter's Kotlin package (Ada and me)

**Decision.**
- The generated Kotlin package `com.designerpunk.tokens` stays fixed. The components import it 49 times (VERIFIED, Q5 round), and it does not vary with the consumer: Kenya's `pb` consumer's output declares the same package (VERIFIED).
- The package is **reserved to generated output**, and INSTALL says so.
- Generated same-name clashes are prevented by item (ii)'s rule: the consumer's group wins by name, and the replacement is reported (Req 5.3).
- A hand-written clash in the adopter's own code cannot be seen by `generate`. It is proven by Spec 132's D10 deliberate case.

**Why.**
- **In one module, a clash is a compile error** ("Redeclaration", VERIFIED, `layout-collide2.log`).
- **Across two modules it compiles silently** (VERIFIED, `layout-collide.log`, exit 0, no warning). The adopter's code reads their object while ours reads ours.
- REASONING: it fails only when the app packages both ("Duplicate class"). 129 builds no app, so 129 has no instrument for it.

**Residual**: until 132's app build, a two-module clash is unseen. 129 states the reservation and does not claim to enforce it.

---

## 6. Plan decision 5: the Android minimum and the supported toolchain range (Peter's)

**Problem.** Core Goals says Android is "Not yet constrained". Once Spec 132 ships a Gradle module, its `minSdk` and the AGP, Kotlin and Compose versions it builds with become promises to adopters. In 129 the number changes little in code (below), but it sets what the guideline, Core Goals and every later Android check aim at.

**What 129 needs from the decision.**
- **The number.** It decides whether Lina guards `InputCheckboxLegal.android.kt` L242 (an unguarded `java.time` call, VERIFIED; API 26 needed, REASONING), and what `ConfigHelpers`' default (24) and validation floor (21) should become (`src/build/workflow/ConfigHelpers.ts` L583, L791; `src/build/BuildOrchestrator.ts` L616; VERIFIED). Those are Ada's.
- **Not the range.** The range numbers come from building at both ends, which is Spec 132's app build (its D4). 129's harness pins (§ 1.5) are a candidate top end.

**Options.**

| Option | What it means | Risks | Opportunities |
|---|---|---|---|
| **API 23** (Android 6.0) | The lowest the pinned Compose accepts (VERIFIED: `ui`, `foundation`, `runtime`, `animation` and `material-ripple` declare `minSdkVersion="23"` under BOM 2026.09.00) | Every adopter enables Java library desugaring, or Lina guards L242. androidx raises its floor over time (REASONING), so 23 will not last | Widest device reach |
| **API 24** (Android 7.0) | Today's repo default | The same desugaring cost as 23 | No change to the default |
| **API 26** (Android 8.0) | `java.time` available natively | Drops Android 6 and 7, phones from about 2015–2016. My recollection is that 26 and above covers well over 90% of active devices (training data, UNVERIFIED) | No desugaring step for adopters. Matches what the code already assumes |

- **The range.** A policy now and numbers later: the supported range is the versions Spec 132's D4 builds at both ends.
- **Bottom candidates** (REASONING): Kotlin 2.0, because the Compose compiler plugin became part of Kotlin there and a shipped module applies it; Compose 1.7, the `ripple()` floor (VERIFIED for `rememberRipple`'s ERROR level); and an AGP that the shipped script works with. The script differs between AGP 8 (needs the Kotlin Android plugin) and AGP 9 (built-in Kotlin, VERIFIED as working for 9.5.0).

**My lean.**
- **API 26**, with the rule "the higher of your number and Compose's floor".
- The range numbers proposed by the team after 132's D4 builds both ends, then approved by you.

**What survives.** androidx moves its floor, so the number gets revisited. Even then, nothing in 129 proves Android 8 at run time. A compile checks no API level (Req 2.9), and the API-level check is lint plus an emulator at the minimum level, both Spec 132's.

**Evidence you need first, and its cost.**
- **For the number: none.** The facts above are measured, or are platform facts.
- **For the range numbers: two CI builds of the fixture app**, one at the bottom and one at the top. These are downloads on a free ubuntu runner, with no new licence act, because the runner image ships with the Android SDK licence accepted. That is Spec 132's D4 work, and its CI change needs your go when 132's tasks ask.

**Does any 129 decision depend on the emulator probe? No.** The probe decides 132's render lane and runner class. Nothing in 129 runs an app.

**Ruled (2026-11-05, Peter; recorded by Data).** Peter answered decision 5 on #666. His words, verbatim, received 2026-11-05T05:54:32Z (`date -u` at receipt; orchestrator relay): "Re: 5, 26". He had read the three options above (API 23, 24, 26), my lean ("API 26, with the rule 'the higher of your number and Compose's floor'"), and what survives (it drops Android 6 and 7; Compose keeps raising its floor).

So:
- **The Android minimum is API 26 (Android 8.0).**
- **The rule:** the effective `minSdk` is the higher of 26 and the pinned Compose floor (23 today), so it is 26 for now.
- **What this moves in 129:**
  - § 1.5's `minSdk` harness pin becomes 26;
  - `InputCheckboxLegal.android.kt` L242's `java.time` call needs no guard (Lina);
  - `ConfigHelpers`' default (24) and validation floor (21) come into line (Ada's call, design or tasks).
- **Not decided by this answer:** the toolchain range numbers. They come from Spec 132's D4 builds at both ends, as above.
- **Owed in the design PR:** Core Goals' "Android: Not yet constrained" line (`.kiro/steering/core-goals.md`, § "Platform Minimum Versions") is updated to say API 26 and cite this ruling. It is a steering edit, so Peter merges it. I have not edited it.

---

## 7. Interface to other owners

- [@THURGOOD] Will you carry § 1.1's sentence into Req 2.6 as a CORRECTION before `design.md` cites it? Without it, D1's probe half cannot run at 129's close. → requirements.md § "Requirement 2 / AC 6" -- [DATA design inbound]
- [@ADA] § 3's two emitter defects (every theme colour `Color.Unspecified` or `Color.clear`; mid-file `import` lines): do you take them into item (i)'s design? A Jest assertion on output generated from real token definitions is the instrument I suggest. → requirements.md § "Requirement 4" -- [DATA design inbound]
- [@ADA] § 2's table: `TextUnit` for fontSize and letterSpacing; `FontWeight`; `FontFamily` from the generic family; `TextStyle` for the composite; a per-token `CornerSize` for a percent radius. Which do you take, and does the `TextStyle` choice settle row 4's undefined `Typography` on Android? → requirements.md § "Requirement 6", "Carried to design" -- [DATA design inbound]
- [@LINA] § 4: does the "consumer-specific varying set" reading move Q13 to (a) for you? And do fixed names (`DesignerPunkTheme`, `LocalDPTheme`) with consumer-named aliases fit Q12, given that they need no component name edits on Android? → requirements.md § "Requirement 4", "Carried to design" -- [DATA design inbound]
- [@KENYA] Can Swift give an adopter-named alias for a fixed `EnvironmentValues` key (Q12's alias half), and does iOS's theme emitter have § 3's `Color.clear` shape too? → § 3, § 4 -- [DATA design inbound]
- [@LINA] The typography composite's 9 reads, and the six badge `minWidth` sites under I-2: these are your component PRs in Req 6.8's same-PR coupling. -- [DATA design inbound]

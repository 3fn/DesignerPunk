# Inbound to 129's design round: Ada (pipeline, generators, validators)

**Date**: 2026-11-05
**From**: Ada, owner of the pipeline, the generators and the validators (charter § "Owner"; `requirements.md` Reqs 4–7 and 9–13).
**For**: Thurgood, who assembles `design.md`. These are my calls on the design items `requirements.md` carries to me, plus the ones I share with Lina. Peter's own items are presented in § P in his shape and are not decided here.
**Go**: Peter, received 2026-11-05T05:38:16Z (orchestrator relay), verbatim: "658 and 664 are merged; go for design".
**Read at**: `origin/main` `2622faf3e`. **MEASURED** = run today in the scratch consumer packed from `3375c2e79` (`npm pack` → install → `init --name Probe --abbreviation PR` → `generate`), with the repo's own converter run under `tsx` and nothing downloaded. **READ** = read in source at `2622faf3e`. **REASONING** = inference, not run. Session counts are my estimates.

**In plain words.** Every decision below is checkable by a criterion that already exists in `requirements.md`, and each says which one. Four items are Peter's (§ P):
- when native follows semver (his decision 7);
- one token-review item: the four shadow colours re-expressed in OKLCH, with the same values and no new names;
- two he asked to hear about, which I think need no ruling from him: whether our component tokens go into adopters' web output (my call: no, web is unchanged), and the iOS and Android minimums (Kenya's and Data's to bring).

---

## D-1. The Kotlin and Swift type table (Req 6; `getKotlinType`, `src/providers/AndroidFormatGenerator.ts` L151–173)

**Decision.** The generator emits each value as the platform's own type for that value, picked by the platform unit the token source declares. One table, both platforms:

| Family | Android (Kotlin) | iOS (Swift) | Change from today |
|---|---|---|---|
| spacing, radius (length), tapArea, borderWidth, layering, **sizing** | `Dp` (`8.dp`) | `CGFloat` | Android sizing moves from `Float` to `Dp` (I-1) |
| **fontSize** | `TextUnit` (`16.sp`) | `CGFloat` | Android moves from `Dp` to `TextUnit` (I-2) |
| lineHeight | `Float` (a ratio) | `CGFloat` (a ratio) | none |
| letterSpacing | `Float` (em) | `CGFloat` | none |
| **fontWeight** | `FontWeight` (`FontWeight(600)`) | `Font.Weight` (100→`.ultraLight` … 900→`.black`) | Android `Int` → `FontWeight`; iOS `UIFont.Weight = 400` (a type error today, MEASURED: 9 of the 197) → `Font.Weight` |
| **radius in percent** (`radiusHalf`, unit `percent` on Android, `shape` on iOS) | `Int` (`50`), the type `RoundedCornerShape(percent:)` takes | a SwiftUI shape, `Circle()`, as the source's `ios: { value: 'Circle', unit: 'shape' }` says | Android `50.dp` (wrong and compiles) → `50`; iOS `CGFloat = "Circle"` (a type error) → `Circle()` |
| color | `Color` (Compose) | `Color` (SwiftUI) | see D-2 |
| fontFamily | `String` | `String` | see D-3 |

- **Composites get generated types with names that cannot collide.** Typography composites become `TypographyToken` and shadow composites become `ShadowToken`, each a generated `data class` or `struct` in the token file.
  - Today all 39 are built with a `Typography(…)` that nothing defines (MEASURED: 24 typography + 15 shadow), and Android's `Typography` would clash with `androidx.compose.material3.Typography`.
  - Fields:
    - `TypographyToken`: `fontSize`, `lineHeight`, `fontWeight`, `letterSpacing`, `fontFamily`, in the types above.
    - `ShadowToken`: `offsetX`, `offsetY`, `blur` (`Dp` / `CGFloat`), `opacity` (`Float`), `color`.
  - Components read composites only through `DesignTokens.<name>.<field>`, never by the type name (READ: 9 Android and 19 iOS typography reads, 1 Android and 1 iOS shadow read). So the names cost no component edit.
- **Primitive API shape (row 3, row 4 item 1): flat `DesignTokens` members, no family types.**
  - `ComponentTokens` refers to `DesignTokens.size150`, not `SizingTokens.size150` (READ: today's `ComponentTokens` names `SizingTokens`, `SpacingTokens` and `BorderWidthTokens`, which nothing defines).
  - Family types would double the API surface that becomes a semver promise at 132's claim.
- **Acceptance**:
  - Req 6.1: no entry tagged to rows 3–9 remains.
  - Req 6.4: a Jest test asserts what `radius_half` / `radiusHalf` emit.
  - Req 6.7 and 6.8: the same-PR couplings for I-1 and I-2.
  - New, Jest on generator output: one test per row of the table, asserting the emitted type for one token of each family.

**Why.**
- **`TextUnit` for `fontSize`**, against `Float`:
  - It makes a wrong-unit read impossible to write, and follows the font scale (`sp`), which WCAG 1.4.4 needs. Data's consult read rules out `Dp`.
  - The component diff is known. 37 Android `font_size_*` reads (READ); the record's group B (12 lines) and group C (26 sites) are Lina's coupled PR.
  - The six badge `minWidth = (font_size * line_height).dp` sites become `(font_size.value * line_height).dp`. That keeps today's behaviour exactly: no font scaling of the minimum. Whether a badge minimum *should* scale is Lina's accessibility call, separate from this.
- **`FontWeight`, not `Int`**: the components already disagree with each other. One reads `fontWeight = DesignTokens.typography_label_md.fontWeight`, which expects `FontWeight`. Another reads `FontWeight(DesignTokens.typography_body_sm.fontWeight.toInt())` (READ, `NavHeaderPage.android.kt` L107, `ButtonVerticalListSet.android.kt` L525). Only one form can compile, and the platform type is the one that needs no wrapping.
- **The percent radius by declared unit**:
  - No component reads `radius_half` or `radius_circle`. They use `CircleShape` and `Capsule` directly (READ, Badge-Count-Base and Badge-Count-Notification).
  - So the fix costs nothing downstream. "The unit names the type" is a rule a test can check, rather than a special case.
- **Sizing as `Dp` (I-1)** is the same principle, already argued in `inbound-from-ada-android-generator-defects-2026-10-24.md` § I-1.

**Counter-argument, folded back.**
- **The objection**: `Float` everywhere is the smallest diff. Lina's groups B and C compile as written, and iOS and web carry plain numbers. A type wall on Android only makes the platforms differ.
- **Folded in**: I keep `Float` where the value really is a ratio (lineHeight, letterSpacing). I use the platform type only where Compose's API takes that type.
- **The residual**: Android's emitted API now differs in type from iOS's, by design. Each coupled component PR (I-1, I-2, `fontWeight`) is a real cost on Lina's side, about 70 Android read sites in all (READ counts above). Those land as same-PR couplings, so the harness never sees a half-converted tree (design-outline § 4).

**Interface.**
- [@DATA] Confirm the Android column, and that `FontWeight(Int)` and `RoundedCornerShape(percent: Int)` exist at the Compose pin of Req 2.8 (Compose 1.7 or later).
- [@LINA] The three coupled component PRs (I-1, I-2, the `fontWeight` form) and the governance type statements (Req 6.9, your draft).

---

## D-2. Native colour construction (Req 6.10; rows 4 and 11)

**Decision.** Native colours are **values computed when the tokens are generated, in Display P3**, with no runtime dependency on either platform.
- **iOS**: `Color(.displayP3, red:, green:, blue:, opacity:)`, with `import SwiftUI`.
- **Android**: `Color(red, green, blue, alpha, ColorSpaces.DisplayP3)`.
- The `Color.oklch`, ChromaKit and colormath paths, and INSTALL L171's consumer step, are removed.
- **The tolerance (Req 6.10)**:
  - (a) For a colour inside P3, the emitted value converts back to its OKLCH source with **ΔE₀₀ ≤ 0.1**. Channels are emitted to 4 decimal places.
  - (b) A colour outside P3 is mapped by **CSS Color 4 § 13.2 gamut mapping, targeting Display P3, with the spec's ΔE_OK just-noticeable difference of 0.02**. The Jest test asserts that the result is inside P3 and equals the reference mapping on a committed fixture of spec-derived values, cited to the spec.
- **The WCAG path** (row 4 item 2, `TokenFileGenerator.ts` L960–971) uses the same converter. It no longer passes `oklch(…)` text through to native.

**Why.**
- **The conversion already exists in the repo**: `src/color/OklchConverter.ts` (`toSrgbHex`, `isInSrgbGamut`, `clampToGamut`, `deltaE00`), used by the DTCG and Figma export (READ).
- **The colour path is most of the iOS errors**: 108 of the 197 (`cannot find 'Color'` 99, `cannot find 'oklch'` 9; MEASURED).
- **Why P3, not sRGB**:
  - 14 of the 50 OKLCH primitives are outside sRGB (MEASURED, with the repo's `isInSrgbGamut`).
  - By my own calculation with the standard matrices (REASONING, not repo code), 13 of those 14 fit inside P3, and only `yellow300` does not.
  - Web emits `oklch()` as written (120 uses, MEASURED), so a wide-gamut screen shows those colours at full strength. sRGB on native would make 14 colours visibly duller than web.
- **No component change.** Components still read SwiftUI `Color` and Compose `Color`. A native value is not a token, so nothing here creates one.
- **Finding, for the same PR.**
  - The repo's `clampToGamut` says "CSS Color Level 4 §13.2" but tests convergence with **ΔE₀₀** < 0.02 (READ, L229–262). The spec uses **ΔE_OK**, and 0.02 in ΔE₀₀ units is a much tighter threshold.
  - So the repo's mapping is not the browser's. The fix generalises `clampToGamut` to a target gamut and uses ΔE_OK, so a P3 device and a P3 browser show the same mapped colour.
  - Whether the difference is visible on today's palette is REASONING. Only `yellow300` is mapped at all in P3.

**Counter-argument, folded back.**
- **The objection**: converting at generation time means the device never sees OKLCH, so any future runtime colour work on native (blends, dynamic themes) brings a dependency back. A dependency keeps one colour model end to end. Data's `ColorSpaces.Oklab` keeps it on Android without a dependency, and is lossless.
- **Folded in**:
  - I chose P3 over OKLab so that both platforms emit the same numbers. iOS has no OKLab colour space, and one cross-platform test can then compare them.
  - Runtime blend math is the colour-track spec's (`2026-06-24-blend-system-architecture-and-oklch-alignment.md`), not 129's.
- **The residual**: a native runtime blend later needs its own converter or a dependency. Also, every colour line changes shape in one PR (99 lines per platform).

**Interface.**
- [@KENYA] [@DATA] Confirm that the two constructors compile at the harness pins. On Android, does `ColorSpaces.DisplayP3` take values outside 0–1 for P3 colours? It should not need to, since all values are in gamut after mapping.

---

## D-3. What a native font family emits (row 5; Req 6.3)

**Decision.** On native, a font-family token emits **the first entry of its stack**, unquoted, as a `String`, for example `"Figtree"`. The full CSS stack stays web-only.
- A Jest test asserts:
  - that the first entry is extracted;
  - that the quotes are gone;
  - that a stack whose first entry is a generic keyword (`sans-serif`, `-apple-system`) emits `""`, so the platform default is used.

**Why.**
- Escaping the inner quotes fixes the parse error (row 5), but no iOS API takes a CSS stack. `Font.custom` and `UIFont(name:)` take a font name (Kenya R1). Compose needs a `FontFamily` built from resources.
- No component reads `fontFamily` today (Kenya R1). The `TypographyToken.fontFamily` field (D-1) is where it lands.
- MEASURED: today's `font_family_body` is `"Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif"`, which is unescaped and does not parse.

**Counter-argument, folded back.**
- **The objection**: the first entry may not be bundled in the app, so the name resolves to nothing.
- **Folded in**: `Font.custom` falls back to the system font when the name is not found (REASONING). The empty-string rule covers stacks that start with a system keyword.
- **The residual**: nothing checks that the adopter bundled the font. A missing font is silent, which is web's behaviour too.

**Interface.** [@KENYA] Whether `Font.custom("", size:)` is safe, or whether `nil` is better, which changes the field type to `String?`.

---

## D-4. Q12 and Q13 (with Lina; Kenya and Data consulted; provisional until 132's D4)

**My call, for Lina to agree or contest. These are co-owned, so neither is final until she writes hers.**

- **Q12, theme names: option (a).** The theme contract names are fixed and DesignerPunk's: protocol or data class `DesignerPunkTheme`, environment key `\.dpTheme`, `LocalDPTheme`. The **instances** are named from the consumer's config (`<Name>BaseLightTheme`, `<Name>WcagDarkTheme`, …).
  - **Why**:
    - The packaged components are compiled once for every adopter, so the contract they read cannot be named by each adopter. Option (b) collapses on iOS, because `@Environment` takes no generic key (Kenya R1). Option (c) means regenerating our components per consumer.
    - The principle, "generated names use the product's name", holds for what the product *owns* (its theme instances and its values). The contract belongs to the system that defines it, as `MaterialTheme` does in Compose (REASONING).
    - The 26 iOS files and 25 Android files that read `dpTheme` / `LocalDPTheme` (design-outline § 4) need no edit.
  - **What changes**:
    - Spec 094's generator, which names the protocol `{Name}Theme` and the key `{abbreviation}Theme` (READ, `TokenFileGenerator.ts` L1137–1145, L1405), splits contract from instances.
    - The product-token emitters (row 13) write `extension DesignerPunkTheme` and `LocalDPTheme`.
- **Q13, the access form for static colours: option (a). The theme carries every semantic colour the components read.**
  - **Why (new evidence, which reverses my earlier lean)**:
    - Under Q3a (D-6), the consumer's config `themes` are the source, so **the set of theme-varying colours differs per consumer**. One adopter's custom theme can override a colour that is static for everyone else.
    - Under (b), a packaged component reading `DesignTokens.colorX` breaks for that adopter, because the generator leaves theme-varying colours out of `DesignTokens` (`TokenFileGenerator.ts` L82 and L1726–1729: theme-varying names "excluded from static iOS/Android output (Spec 094)", READ).
    - Only (a) gives one shared component source that compiles for every adopter's theme set.
    - It also makes Lina's item-(i) guard simpler: every component colour read is `theme.`.
  - **Its costs**:
    - The theme type grows to the 62 colour semantics (Data R1 item 18). Its meaning changes from "what varies" to "the colours components read".
    - On Android, every added colour changes the data-class constructor, so hand-written theme instances break. Under Q12 (a) the instances are generated. D-11's alias rule and the semver promise take the rest.
  - 173 static reads stay `theme.` reads. Lina's (b) rename of about 37 files is not needed.
- **Item (i), Android `CompositionLocal`**: keep Spec 094's `compositionLocalOf { BaseLight }` (READ, L1405). It defaults to the base light instance, which matches iOS, whose `EnvironmentKey` requires a `defaultValue` and already uses base light. The 21 files with `@Preview` then render without a provider (Data R1 item 14).

**Counter-argument, folded back.**
- **The objection** (Leonardo R1): fixed `DesignerPunk*` names sit badly with "generated names use the product's name". 128's React Native work and story 3 (an adopter's own names) inherit the choice.
- **Folded in**: only the contract is fixed. The adopter's instances, types and values carry their own name, and the harness's non-`DP` consumer (Req 2.2) proves that the instances follow the config.
- **The residual**:
  - An adopter sees `DesignerPunkTheme` in their app code. That is a Spec 094 behaviour change, and 128 inherits it (Thurgood's dated pointer).
  - With a silent base-light default, a missing provider in production renders the wrong theme with no error. That is the price of previews working, and it is the same on both platforms.

**Interface.**
- [@LINA] Agree or contest (a) and (a). In particular, does Q13 (a) change your guard's baseline (about 173 reads plus Progress-Bar-Base)?
- [@KENYA] [@DATA] Feasibility of a fixed contract with config-named instances. Kenya R1 found it works on iOS with an `any DesignerPunkTheme` default.

---

## D-5. Item (ii): precedence detail, Kotlin same-name, and web (Req 5)

**Decision, precedence** (the plan-r2 WP1 rule, made checkable):
1. **Sources, in order**:
   - (1) the consumer's `{tokenSource}/component/`;
   - (2) the consumer's `componentTokens` directories;
   - (3) **new**: the package's six harvestable definition files, taken only from component directories that **win the component union** (`src/cli/shared/componentSources.ts`) at the package's rank. A component the adopter has forked contributes none of ours.
2. **The key is the group's declared `component` name** (the `defineComponentTokens` argument; for example `progress.ts` declares `component: 'Progress'`, READ). If any consumer source declares group G, **no** package token of group G is emitted. Replacement is per group, never per token.
3. **The index merge follows the same function.** `mergePackageComponentTokens` (`src/cli/shared/packageComponentTokens.ts` L59) drops a package token whose group the consumer declares, not one whose name the consumer reuses. D2's set equality (Req 1.3) catches any disagreement between the index and the emission.
4. **Messages**:
   - Each replacement prints `component tokens: <G> — yours replace DesignerPunk's`. On the first run after `init`, it adds `(copied at init)` where the adopter's file is byte-identical to the package's.
   - Two consumer files declaring G make `generate` fail and name both files (Req 5.3).

**Decision, Kotlin same-name** (plan-r2 § 3 item 3):
- Our generated Kotlin stays in `package com.designerpunk.tokens`, and the packaged components stay in `com.designerpunk.components.*`. The 28 component files import `com.designerpunk.tokens.DesignTokens` (READ), so a package derived from the adopter's config would break the shipped source.
- Instead, `generate` **fails** if a `.kt` file in the consumer's tree (outside `node_modules` and `generate`'s own output) declares `package com.designerpunk.tokens` or `com.designerpunk.components…`. It names the file. A Jest test accepts this, and D10's same-name case proves it in 132.

**Decision, web: item (ii) does not harvest into the consumer's web output in 129.**
- On web, our component tokens stay in the package CSS, `@3fn/core/component-tokens.css`. That CSS binds late through `var()` to the adopter's primitives (MEASURED: `--avatar-size-xs: var(--size-300)`), so the values already follow the adopter's tokens.
- The adopter's own groups, such as their `progress.ts`, keep landing in their `ComponentTokens.web.css`, as they do today.
- The Integration Guide must say to import the adopter's own CSS **after** the package's, so that adopter-wins also holds on web by cascade order. That is a guide sentence for Lina and Sparky to place under Req 15.
- Req 10.4 then names no web change.

**Why web stays as it is.** Lina's R1: the guide tells adopters to "keep importing it on every path" (L144), so harvesting would define each property twice. Removing the import breaks supported web adopters, which is a major-release change.
- **Is this Peter's?** It changes nothing for a web adopter, so I read it as the team's. It becomes his only if someone proposes retiring the package CSS (a 17.0.0 matter). The orchestrator told him design carries "whether our component tokens also go into adopters' web output". My answer to that is "no", and nothing is promised or broken by it.

**Counter-argument, folded back.**
- **The objection**: the charter principle says the consumer's own `generate` is the single source of every token artifact their code compiles against. Web would keep two sources, so native and web diverge.
- **Folded in**: on web nothing compiles against these values. The package CSS carries references, not values, so it is not "a snapshot a consumer could mistake for theirs", except for custom literal values such as Badge's `maxWidth`. Those are our component's values by design.
- **The residual**: a structural asymmetry between web and native, kept until a major release chooses otherwise.

**Interface.**
- [@LINA] Does the per-group key match your component-union reading, including groups declared outside a component directory (Progress)?
- [@SPARKY] Is a cascade-order sentence enough for adopter-wins on web, or does a duplicate custom property need a check?
- [@DATA] The package-name refusal in place of a config-derived package.

---

## D-6. Q3a, item (vi)'s source (with Lina)

**Decision.**
- `generate` builds the theme registry **from the consumer's config `themes`**. The static imports of the package's own `themes/{dark,wcag,dark-wcag}/SemanticOverrides` (`src/generators/generateTokenFiles.ts` L19–21, READ) are removed.
- This is the same source as "the consumer's copied theme tier": `init` already writes a config whose `themes` import `./src/tokens/themes/dark/…` and `./src/tokens/themes/wcag/…` from the consumer's copy (MEASURED, the scratch consumer's `designerpunk.config.ts`). So Q3a's two candidates are one.
- **A custom theme in config is applied**, natively (item (i)) and on web. It is no longer "registered, not applied yet" (`src/cli/shared/errorCatalog.ts` L557). The web selector's scope is Q3b's, which stays Peter's fork after Sparky's browser check.

**What it changes, and the migration it needs.**
- **The config shape needs per-mode overrides.** WCAG has a light map and a dark map (`dark-wcag`), but `init`'s config has one `overrides` per theme and no `dark-wcag` (MEASURED).
  - `ConfigTheme` gains an optional `{ light, dark }` form. The single-map form keeps its meaning, so the type change is additive.
  - `init` writes the WCAG entry with both maps.
- **Adopters born before 129 have no `dark-wcag` in their config.** Reading config alone would silently drop their WCAG dark values, which changes supported web output.
  - Rule: if a config theme named `wcag` has no dark map and the consumer's tree holds `themes/dark-wcag/SemanticOverrides.ts`, `generate` uses it and prints the one line to add to the config.
  - A `Consumer Guard` case with an old-shape config accepts this.
- **Effects** (Req 9.1 asks for them):
  - On item (i): one native theme instance per (config theme, mode).
  - On the caveat "a custom theme does not emit on web": removed, once Q3b rules the selector.
  - In the same PR: the `generate` message and the web agent doc change (Sparky R1).
  - The theme-varying set becomes per consumer, which is why D-4 picks Q13 (a).

**Counter-argument, folded back.**
- **The objection**: the config is code the adopter owns and may hand-edit. Making it the theme source turns a typo in it into a theme that quietly vanishes.
- **Folded in**: `ThemeRegistry.register()` already rejects an override naming an unknown semantic token (Token Governance § "Theme Registry"). A theme whose file does not load fails `generate` with the file named.
- **The residual**: the old-shape fallback in the rule above is a second source of truth until adopters update their config. I would retire it at a major.

**Interface.** [@LINA] Agree, as co-owner, including the fallback rule.

---

## D-7. Q6, R5: versions or content (Req 5.8)

**Decision. Content.** "Fresh" means the generated output equals what `generate` would write now.
- The check regenerates into a temporary directory and compares the files byte for byte, outside the generated header's timestamp, if it has one.
- A package upgrade is covered without a version stamp: the header names the package version (`Generated by: @3fn/core 16.2.0`, MEASURED), so an upgrade makes the output differ.

**Why.**
- `generate` takes 0.5 s (MEASURED), so regenerating costs less than keeping digests correct.
- It matches #596 (`b3dbabdb1`), which compares by content.
- It closes the file-time record's question in the same direction (`2026-10-12-generate-staleness-decided-by-file-times.md`, read beside this, as the requirements context asks).

**Counter-argument, folded back.**
- **The objection**: regenerating needs the whole toolchain at check time, and a version stamp is cheaper to read.
- **Folded in**: the check runs where `generate` can run anyway (`sync` and the name contract).
- **The residual**: on a large adopter tree the check costs one generation, unmeasured above the scratch consumer's 0.5 s.

---

## D-8. Row 21's rule: what "conforms" means for a component token's custom value (Req 13.2)

**Decision.** A custom value conforms when it is **on its family's grid**: `BASE × k × step`, with `k` a whole number and **no upper cap**.
- Spacing and sizing: base 8, step 0.25, so a 2 px grid. A `sizing` case is added; today `sizing` is not validated at all.
- A value off the grid conforms only if its definition carries `offGridReason: '<derivation>'`, which the check requires to be non-empty.
- **The two known cases**:
  - Badge-Label-Base `maxWidth` 120 (15 × 8) conforms once the cap of 8 goes.
  - Button-VerticalList-Item `paddingBlock.rest` 11 (1.375 × 8) needs an `offGridReason`, which is Lina's file and Lina's words.
  - Avatar's 12 and 64 conform.
- Consumer tokens: warn. DesignerPunk's own: fail (Req 13.2).

**Why.**
- The 8.0 cap (`src/integration/ValidationCoordinator.ts` L157–159, READ) is not in the token law. Core Goals says "conform to how that primitive token family's values are defined", which is the grid.
- Component-token creation is already human-reviewed (Token Governance § "Token Creation Governance"), so an `offGridReason` is read at that review. The check enforces that the reason exists, not that it is good.

**Counter-argument, folded back.**
- **The objection**: an escape field becomes a rubber stamp.
- **Folded in**: the reason is required to be a derivation, and the review is the existing human checkpoint.
- **The residual**: the check cannot judge the derivation. A bad reason passes the machine and depends on the reviewer.

**Interface.** [@LINA] The `offGridReason` wording for VerticalList's 11.

---

## D-9. Row 1's fix and its size (Req 13.1)

**MEASURED today**: `validate` in the scratch consumer exits 1 with **102** mathematical-relationship failures. They group as follows:

| Kind | Count | Example |
|---|---|---|
| categorical text read as operands | 65 | `yellow500: Invalid operand: darkest`; the four `fontFamily*` |
| `≈` approximations | 11 | `lineHeight*: Invalid operand: baseValue ≈ …` |
| exponents | 8 | `fontSize200: Invalid operand: (1.125³)` |
| rounded values stated with `=` | 9 | `fontSize075: 16 ÷ 1.125 = 14.22…, but token baseValue is 14`; `tapAreaRecommended` 47.96 vs 48 |
| inconsistent scale expressions | 6 | `scale*` |
| special-case literals | 3 | `radiusMax`, `radiusHalf`, `opacity100` |

One of the nine is a **true error**: `blur000: 16 × 1 = 16, but token baseValue is 0`.

**Decision.**
1. **Classify each family**:
   - formula families (spacing, sizing, radius, tapArea, fontSize, lineHeight, opacity, shadow opacity, blur, scale) must state an equation;
   - categorical families (color, fontFamily, easing, fontWeight) state a description, which the parser does not evaluate;
   - a formula-family token with no equation is a failure.
2. **The grammar**: `<expression> = <value>` is checked exactly (within 1e-3); `<expression> ≈ <value>` is checked within half the family's grid step. Superscript exponents and `^` are allowed. The ~20 strings whose value is rounded change `=` to `≈`.
3. **Special cases**: a token with `isStrategicFlexibility: true` may state `special case: <reason>` instead of an equation.
4. **`blur000`'s relationship string is corrected**, a metadata edit with no value change. The Jest true-positive case is a token like it before the correction (Req 13.1).
5. **The two validate sentences in the guide are removed** in the fixing PR (the record's addendum: Integration Guide L92 and L421, through Req 15).

- **Size**: about 2 sessions. The parser grammar and family classification take about 1. The relationship-string edits (about 20 tokens) and the regression tests take about 1.
- **No token value changes and no token is created.** The edits are to `mathematicalRelationship` metadata strings only, which is token documentation inside my autonomy. The family classification is token governance enforcement, also mine.

**Counter-argument, folded back.**
- **The objection** (the record's own warning): a skip for "categorical" is a rubber stamp.
- **Folded in**: the skip is decided by family, not by what the string looks like, and a formula family with no equation fails. The true-positive test (`blur000`) proves the validator still catches a real error.
- **The residual**: `≈` within half a grid step accepts any rounding error up to that size. A wrong value within half a step of its formula passes.

---

## D-10. Q4, the founder count (Req 11.3; Leonardo consulted)

**Decision.**
- The founder path drops from 5 to 4: `npm install` → `init` (now runs `generate`) → personal note → restart.
- `generate` leaves the birth list and stays documented as the first command of the edit loop ("run on every token change").
- `path-steps: { founder: 4, … }`. Joining stays 5, because a clone still runs `generate` itself.
- **Acceptance**: Req 11.1 (the output exists after `init` alone, and a following `generate` is byte-identical) and Req 11.3 (front matter and `install-doc.test.ts` change in the same PR).

**Why.** Leonardo's read, which I adopt: a step the tool performs is not a step the founder performs.

**Counter-argument, folded back.**
- **The objection**: founders then never type `generate` at birth, so they meet it first only when it matters.
- **Folded in**: `init`'s closing message names `generate` as the command to run on every token change.
- **The residual**: one fewer chance to learn the command by doing it.

**Interface.** [@LEONARDO] Confirm the step text.

---

## D-11. Req 9.2's size: the six groups read from the consumer's copy

**MEASURED** (`git grep` at `2622faf3e`): **70 package-relative token imports in 14 generation files** bind generation to the package's own token modules instead of the consumer's barrel:
- `DTCGFormatGenerator.ts` 41;
- `TokenFileGenerator.ts` 8;
- `generateTokenFiles.ts` 4 (the three override maps and `composedColorMap`);
- Android, iOS and Web format generators and `SemanticValueResolver` 2 each (`ColorTokens`, `OpacityTokens`);
- `ResponsiveGridGenerator` 2, `BlendCalculator` 2, and one each in `BlendValueGenerator`, `OklchTokenIndexMetadata` and `WebUnitConverter`.
- Type-only imports are not counted.

**Decision.**
- One loaded token set, from the consumer's barrel (`src/cli/resolveTokens.ts`, `config.tokenSourceRoot`), is passed to every generator. No generation file imports `../tokens` for values.
- A Jest guard fails on any new value import from `src/tokens` under `src/generators`, `src/providers`, `src/resolvers` and `src/blend`.
- Req 9.5's removal case (delete the package's copies, output unchanged) is the end-to-end proof.

**Size**: about 3–4 sessions. DTCG is about 1.5 of them, with its 41 imports. The rest is threading one parameter through. It is its own parent, as the tasks round already lists.

**Counter-argument, folded back.**
- **The objection**: passing a token set through 14 files is a large refactor of working code.
- **Folded in**: the guard and Req 9.5 make it mechanically checkable, and each group can land as its own subtask.
- **The residual**: until the last group lands, generation reads from two sources.

---

## D-12. Shadow colours (Req 7.4): the design for Peter's token review

Not decided here; § P item 2 brings it to Peter. The emission fix itself is decided:
- every shadow composite's colour primitive is emitted on every platform;
- the web composite uses the colour's custom property;
- `KNOWN_UNEMITTED_SHADOW_COLORS` and its warning are removed (Req 7.1, 7.2).

---

## P. Peter's items (his to decide; not decided here)

### P-1. When native becomes a semver promise (plan-r2 § 7 decision 7)

- **The problem.**
  - Today no adopter is supported on iOS or Android ("Do not start an iOS or Android product from this source", 16.2.0).
  - 129 changes what native adopters would read: item (iii) retires the native root files and native `ComponentTokens`; D-1 changes types; D-4 renames the theme contract.
  - Once Spec 132 claims native support, every such change is a breaking change. The question is when that line falls, and where item (iii) ships.
- **The options.**
  - **(a) Native changes made before the support claim ship in minor releases, item (iii) included**, because no supported consumer exists to break. Each release's notes name every native change (Req 10.4). From the claim on, native follows semver like web.
  - **(b) Item (iii) keeps the charter's "at the next MAJOR"**, so it waits for 17.0.0. 17.0.0 is tied to 128's design, which comes after 132 in your order (x′).
- **Risks and opportunities.**
  - (a) lets 129 finish its work, so 132 starts from the final native shape and the support claim freezes an API that has actually been built and tested. The risk: someone using native today against our advice meets changes in a minor release. Our notes say they are unsupported, and the notes name each change.
  - (b) keeps the strict reading of semver. But the snapshot files a consumer could mistake for theirs keep shipping until after 128. 132 would then build on files due to disappear, and its claim would freeze an API that 17.0.0 is about to change.
- **My lean: (a).** It comes with two conditions that land before the claim, in 132: deprecated-alias emission for renamed native names, and D9's public-API diff (plan-r2).
- **What survives**: after the claim, every native API mistake costs a major release or an alias. Choosing (a) moves the cost of getting it right into 129 and 132, which is the cheaper time to pay it.
- **Evidence needed first**: none. This is a policy, and no probe changes it.

### P-2. Token review: the four shadow colours (Req 7.3 and 7.4)

- **The problem.**
  - The four shadow colour primitives (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`) are the only colours still written as `rgba` (`src/tokens/ColorTokens.ts` from L1835, READ).
  - Every other colour family is OKLCH, built from hue, lightness and chroma channel tokens.
  - 129 has to emit them on every platform through the native colour path of D-2. That path starts from OKLCH.
- **The options.**
  - **(1) Same values, written in OKLCH.** Re-express the four as OKLCH values with the same colours, and create no new token names. MEASURED with the repo's converter:
    - black: `l 0, c 0`;
    - blue: `l 0.2161, c 0.0306, h 269.6`;
    - orange: `l 0.1956, c 0.0127, h 67.0`;
    - gray: `l 0.1912, c 0.0219, h 263.8`.
  - **(2) The full migration.** Create shadow channel tokens (new names) and compose the four from them, like the other families. Whether shadow hues should share the brand hues is a design question that sits with blend and the colour track.
  - **(3) No migration.** Keep `rgba`, and add a second native path that converts `rgba` to P3.
- **Risks and opportunities.**
  - (1) gives one colour path on every platform and no new names, and fixes the consumer-blocking shadow defect. The risk: shadows are OKLCH but not channel-built, so they are still not "like the other families" in structure.
  - (2) is complete, but it creates tokens whose relationships nobody has designed, inside a spec about generation.
  - (3) creates nothing, but keeps two colour models in the generator.
- **My lean: (1).** The channel question (2) goes to the colour-track spec with blend, where shadow and interaction colours are designed together. That means the channel half returns to the blend record's intake, which I noted on 2026-11-05 had left it. I will correct that note in the PR that applies your choice.
- **What survives**: the shadow family stays structurally different (OKLCH literals, not channels) until the colour-track spec.
- **Evidence needed first**: none beyond the values above. Rendering is unchanged, because the values equal today's `rgba`.

### P-3. Not his, in my reading, but he asked to hear about it: our component tokens in adopters' web output

My decision is D-5's "no": web stays as it is, and nothing changes for a web adopter. It reaches him only if the team later proposes retiring the package CSS, which would be a 17.0.0 matter. If he wants web to have a single source now, that is the fork to raise, and its cost is a major release.

### P-4. Not mine: the iOS and Android minimums (decisions 4 and 5)

Kenya and Data bring these. From the generator side, D-1's types need Compose 1.7 or later, which matches the harness pin (Req 2.8), and `Color(.displayP3, …)` needs no iOS version above 17 (REASONING).

---

## Consulted

- Thurgood: the requirements and their "Carried to design" lines (`requirements.md` at `2622faf3e`).
- Lina, Data, Kenya, Leonardo and Sparky: asked above through `[@NAME]`. Their answers come in their own inbounds or in design R1. None was consulted before this file, beyond their recorded entries in the Q5 and requirements rounds, which are cited where used.

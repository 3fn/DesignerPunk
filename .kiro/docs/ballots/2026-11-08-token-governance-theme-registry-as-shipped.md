# Ballot Measure: Token-Governance § "Theme Registry (Spec 094)" says what U6 and U9 ship

**Date**: 2026-11-08
**Drafted by**: Ada (Rosetta; owner of `governance/Token-Governance.md`'s content and of the generator these sentences describe), at the orchestrator's brief of 2026-11-08. The brief's authority is Spec 129 Req 15.6 (`.kiro/specs/129-consumer-generation-completeness/requirements.md` L382 at `3f739b07f`): "WHEN items (i) and (vi) ship THEN `governance/Token-Governance.md` § 'Theme Registry (Spec 094)', which today says a registered theme is 'not applied yet', SHALL be brought in line by ballot edit in that release". The owed act is row L246 of `tasks.md`: "Before the S of the release carrying U9 | the Token-Governance § "Theme Registry (Spec 094)" ballot edit (Req 15.6) | Thurgood (holder), Ada (text) | a ballot, ratified and applied; Task 18 reads that it happened".
**Status**: DRAFT
**Owner**: Ada (the text). Thurgood holds the ballot and applies it (tasks.md L246).
**Required reviewer**: **Thurgood**, on form, before the orchestrator puts it to Peter. **Census reader**: Stacy (README § "Conventions", "Instrument census"). **Content readers, the orchestrator's call**: Sparky (item 4, the web line, which his charter restates), Kenya and Data (item 5, the native line). **Peter** ratifies.
**Class**: LAW for items 1–7. Req 15.6 names a ballot edit, and item 2 changes what a reader may rely on governance to check (a registered map's keys). Items 6 and 7 are charter lines in Ada's `#in-scope` unit, and a change to a seat's role is always LAW (README § "When a governance edit needs a ballot — three kinds"); they are in this ballot only under F-1 (a). Item 8 is EXECUTION of this ballot at application: its fix would pass as a CORRECTION (truth: `src/generators/generateTokenFiles.ts` at `3f739b07f`), and is named here so it lands with the rest.
**Amends**: `governance/Token-Governance.md` L242, L259, L261, L264, L265 (items 1–5); `governance/Token-Quick-Reference.md` L118 (item 8). Under F-1 (a): `canonical/agents/ada.md` L318, L323 (items 6, 7), with their operative-set items and consumer overlay lines (§ 5). No register row changes. The section's heading, its code example (L246–256) and its "Known limitation" (L267) are unchanged.
**Retroactivity**: none. No release carries U6 (#730, `5a6a7f32b`) or U9 (#763, `c2b844152`) yet, so no shipped Token-Governance has said anything false about them; the first release that carries them would.
**Base**: `main` at `3f739b07f`. Every before-text below is quoted from that tree.

> **Conflict of interest, stated first.** I wrote the generator these sentences describe (Tasks 11 and 14) and the earlier text being replaced (the 2026-10-23 correction of L242, and L264–265). I am also the signer of the `#in-scope` unit that F-1 (a) would change. Thurgood's form review, Stacy's census read and Peter's ruling are the checks.

---

## 0. What shipped, so the after-texts can be checked against it

Read at `3f739b07f`; each line names its referent.

- **The registry is built from the config** (U9, Task 14). `generate` reads `config.themes`, resolves the `dark`, `wcag` light and `wcag` dark maps through `resolveThemeMaps` (registered: the adopter's map; unregistered, local mode: the package's built-in through `scopedTsRequire`, with the bridge warning; package mode: the package's built-ins), and registers `dark`, `wcag` and every other config theme with `ThemeRegistry` (`src/generators/generateTokenFiles.ts` L233–283). Design § 10, "The built-in theme bridge, keyed on registration".
- **Every applied map is checked**, with three paths, each probed by Stacy at `3f739b07f` (`[STACY R1]` § 2, item 2): an orphaned key in `dark` fails `SemanticOverrideResolver.validate()` (L253–260); one in `wcag` is rejected by `ThemeRegistry.register()` at L268, outside the `try` and before `validateAll()` (L294–300) is reached, so it throws a raw `Error`; one in any other registered theme is rejected by `register()` inside the `try` and becomes `TokenGenerationAbortedError('override-maps')` (L275–283). Each makes `generate` exit 1, naming the key. `setSemanticValidator` is set at L215. Unit-pinned in `src/themes/__tests__/ThemeRegistry.test.ts`; no `generate`-level test pins these paths (§ 7, residual 2). *(Corrected at [ADA R2]: R1 named the resolver for `wcag`.)*
- **A non-colour override: the defect, and its fix.** *(At [ADA R4]: the reproduction below is of `3f739b07f`; #785, `c91fb9b15`, fixed it.)* **Since #785**, `generate` refuses a non-colour key in any theme override map the config registers, `dark`, `wcag` or custom, plain or `{ light, dark }` form, naming the config entry, the map and the key, and writes nothing (`findNonColourOverrideKeys`, `src/generators/themeOverrideCategories.ts`, called in `generateTokenFiles` beside the theme-instance refusals; `TokenGenerationAbortedError('theme-config')`; message `nonColourOverrideKeyMessage`, `src/cli/shared/errorCatalog.ts`; pinned by `src/generators/__tests__/themeOverrideCategories.test.ts` and Consumer Guard case C6). A key that names no token is left to the orphan-key check. Peter's ruling: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-theme-map-noncolour-refuse.md`. **Before #785**, as reproduced by me at `3f739b07f`, *(rewritten at [ADA R3]; the R2 bullet said it changes no output, which is false for `dark`, `[STACY R2]` B-5)*. Reproduced by me at `3f739b07f`, `generate` run through `loadConfig` and `generateTokenFiles` on four configs named `PB`, each overriding only `space.inset.100` to `space200`:
  - **custom theme (`both`) or `wcag`**: no change on any platform. Web keeps `--space-inset-100: var(--space-100);`, iOS `public static let spaceInset100 = space100`, Android `val space_inset_100 = space_100`; the custom theme still gets native instances and a family case, and no web block (`generateWebThemeBlock` reads colour tokens only, `TokenFileGenerator.ts` L1105).
  - **`dark`**: applied through the dark context as if it were a colour, on every platform, with exit 0 and no warning. Web: `--space-inset-100: light-dark(var(--space-100), var(--space-200));` (`light-dark()` takes colours only, by the CSS specification; not run in a browser). iOS: `public static let spaceInset100: UIColor = UIColor { $0.userInterfaceStyle == .dark ? space200 : space100 }`, and `xcrun --sdk iphonesimulator swiftc -typecheck -target arm64-apple-ios17.0-simulator` (Swift 6.4.2) exits 1 on the file: `DesignTokens.ios.swift:557:89: error: cannot convert value of type 'CGFloat' to closure result type 'UIColor'`. That is one diagnostic, which swiftc prints twice, once as the summary and once under the annotated source line, so a count of `error:` lines gives 2. The no-theme file exits 0. Android: `space_inset_100` is replaced by `val space_inset_100_light = space_100` and `val space_inset_100_dark = space_200`, so the 9 component reads of `space_inset_100` under `src/components` would not resolve (a reading: no `kotlinc` here); iOS has 8 component files reading `spaceInset100`, which would then meet a `UIColor` (also a reading).
  - This is a product defect, filed: `.kiro/issues/2026-11-08-non-colour-theme-override-accepted-not-applied.md`, re-classed P1 at [ADA R3].
- **Refusals.** A theme name that cannot become an instance and a family case on both native platforms fails `generate`, naming the entry (`findThemeRefusals`, L236–241; design § 4, the theme-instance rule, item 5).
- **The `Themes:` line** is `generateThemesLine` with `GENERATE_THEMES_SUFFIX` (`src/cli/shared/errorCatalog.ts` L565–576): "registered and applied". "registered, not applied yet" is gone (pinned by `src/cli/__tests__/configCThemesReachNativeOutput.test.ts` L68 and `tests/consumer-integration.test.ts` L3007).
- **Web** (U9). `:root[data-theme="wcag"]` when the WCAG maps override a colour token (`maybeGenerateWcagBlock`, `TokenFileGenerator.ts` L1520–1532), then one `:root[data-theme="<name>"]` per other registered theme (`generateThemeOverrideBlocks`, called at L1486; `generateWebThemeBlock` L1076–1130). A theme of one mode writes `light-dark()` with the base in its uncovered half; no block writes `color-scheme`; a block with no colour override is not written (L1116). Design § 4, "The single-mode rule". The selector scope (Q3b) is Peter's open fork: `.kiro/issues/2026-11-08-q3b-web-data-theme-selector-scope.md`.
- **iOS and Android** (U6, extended at U9). The four fixed instances, then one per mode each other registered theme covers, named by the theme-instance rule, item 4; the family `base`, `wcag`, then one case per other registered theme; the provider selects by scheme, and a single-mode theme falls back to base. Pinned for config C (`high-contrast` both, `brand` light, `default` dark) at `configCThemesReachNativeOutput.test.ts` L57–64: `baseLight`, `baseDark`, `wcagLight`, `wcagDark`, `highContrastLight`, `highContrastDark`, `brandLight`, `defaultDark`; family `base`, `wcag`, `highContrast`, `brand`, `` `default` ``.
- **Not shipped**: DTCG/Figma theme metadata. `DTCGGeneratorConfig.registeredThemes` defaults to `[]` and no caller passes it (`generateTokenFiles.ts` L470; `scripts/generate-platform-tokens.ts` L127).

## 1. The measure

Each item replaces one line at the same line number; no line is added or removed, so no line-number citation elsewhere moves. Each after-text in `governance/**` carries its pointer (README § "Conventions", "Where the pointer is owed"); `<ratification date>` is filled by the Status commit. L242's existing pointer, *(Corrected 2026-10-23 …)*, is replaced by item 1's: a law doc carries the current text and one dated pointer.

### Item 1: `governance/Token-Governance.md` L242 (LAW)

**Before** (L242):
> **A registered theme is not applied yet.** `npx designerpunk generate` reads the config's themes and lists them as "registered, not applied yet": a theme registered in `designerpunk.config.ts` changes no generated output on any platform, and nothing checks its overrides against the token set. Whether and how registered themes are applied is Spec 129's to decide (charter scope items (i) and (vi)). Today the generator applies DesignerPunk's built-in overrides only; the last rule below says what each platform emits. *(Corrected 2026-10-23 to what the generator emits; DesignerPunk record `2026-10-03-data-theme-scope-charter-vs-generator`.)*

**After**:
> **A registered theme is applied.** `npx designerpunk generate` builds the theme registry from the config's `themes` and lists them on its `Themes:` line as registered and applied. A theme named `dark` or `wcag` replaces DesignerPunk's built-in override map for that context with the map the config imports. In local mode, a built-in map the config does not register (`dark`, `wcag` light or `wcag` dark) is still applied from the installed package, with a warning on every run that names the config line that would make it the product's own, until the next major release; in package mode the package's built-in maps apply. Every other registered theme adds an instance on iOS and Android and, when it overrides a colour token, a block on web, as the last rule below says. `generate` refuses a theme name it cannot emit on every platform, naming the config entry. *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 1; prior text at `3f739b07f`.)*

*Why these words*: the old line's three claims are each false at `3f739b07f` (no output change; nothing checks; built-ins only). The new line says what `generate` does, and states the bridge because it changes what a product must do to own its dark and WCAG values: register them. It names no date for the bridge's retirement ("the next major release"), because the 17.0.0 plan is a charter, not a release.

### Item 2: `governance/Token-Governance.md` L259 (LAW)

**Before** (L259):
> - Theme overrides reference existing semantic tokens only — `ThemeRegistry.register()` rejects an override that names an unknown semantic token. The build registers DesignerPunk's built-in themes this way; a theme in `designerpunk.config.ts` is not registered with it yet, so its overrides are not checked today

**After** *(rewritten at [ADA R4]: F-2 is resolved by Peter's ruling, fix first, and #785 shipped the fix, so item 2 states the fixed behaviour; the three F-2 texts of [ADA R3] are withdrawn)*:
> - Theme overrides reference existing semantic tokens only, and colour tokens only. `generate` checks every override map it applies, built-in or registered, and fails, naming the key, on an override that names no semantic token (`SemanticOverrideResolver.validate()` for the `dark` map; `ThemeRegistry.register()` for `wcag` and every other registered theme). `generate` also fails, before writing anything, on a key that names a semantic token that is not a colour, in any map the config registers (`dark`, `wcag` or any other theme, in either form), naming the theme, the map and the key (DesignerPunk #785, under Peter's ruling of 2026-11-08, DesignerPunk record `2026-11-08-peter-ruling-theme-map-noncolour-refuse`) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 2; prior text at `3f739b07f`.)*

### Item 3: `governance/Token-Governance.md` L261 (LAW)

**Before** (L261):
> - Theme-varying tokens are determined automatically: the registry computes the union of all overridden token names across the themes registered with it, and the iOS/Android generators add every token whose base light and dark values differ. The build registers DesignerPunk's built-in `dark` and `wcag` themes only, so today the union is over the built-in overrides

**After**:
> - Theme-varying tokens are determined automatically: the registry computes the union of all overridden token names across the themes registered with it, and the iOS/Android generators add every token whose base light and dark values differ. `generate` registers `dark`, `wcag` and every other theme the config registers, so the union covers each of them and holds colour tokens only (the first rule above) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 3; prior text at `3f739b07f`.)*

### Item 4: `governance/Token-Governance.md` L264, the web line (LAW)

**Before** (L264):
>   - **Web**: dark mode through `light-dark()` values and `color-scheme: light dark` on `:root`, with no dark `data-theme` block; and one theme block, `:root[data-theme="wcag"]`. That selector matches only the `<html>` element, so a theme applies page-wide, and `data-theme` on any other element matches nothing. Whether a subtree can be themed is not decided yet (Spec 129)

**After**:
>   - **Web**: dark mode through `light-dark()` values and `color-scheme: light dark` on `:root`, with no dark `data-theme` block. `wcag` is written as `:root[data-theme="wcag"]`, and every other registered theme adds a block of its own, `:root[data-theme="<name>"]`; a theme whose maps override no colour token writes no block. A theme of one mode writes its own value in the scheme it covers and the base value in the other, and no theme block sets `color-scheme`, so a theme never forces the page's scheme. These selectors match only the `<html>` element, so a theme applies page-wide, and `data-theme` on any other element matches nothing. Whether a subtree can be themed is not decided yet (DesignerPunk record `2026-11-08-q3b-web-data-theme-selector-scope`) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 4; prior text at `3f739b07f`.)*

*Why these words*: Sparky's charter line (`canonical/operative-sets/sparky.yaml` L89–98, applied in U9) already says the same to web adopters; this line agrees with it and adds the single-mode half, which design § 4 gives and Sparky confirmed (`feedback/tasks.md` § "Tasks amendment 3", `[SPARKY R2]`). The Q3b pointer replaces "(Spec 129)", which no longer owns the question once its record is filed.

### Item 5: `governance/Token-Governance.md` L265, part of the native line (LAW)

The rest of L265 is unchanged: its first sentence (every colour semantic is a theme member) and its last (the flat `_wcag` constants are gone) are still true. The item replaces this part:

**Before** (part of L265):
> The generated `<Name>Themes` holder has four instances, `baseLight`, `baseDark`, `wcagLight` and `wcagDark` (Kotlin `BaseLight`, `BaseDark`, `WcagLight`, `WcagDark`), and a `<Name>ThemeFamily` with `base` and `wcag` that the `<name>Theme(_:)` modifier (iOS) and `<Name>Theme(family:)` composable (Android) select from. A theme registered in `designerpunk.config.ts` adds no native instance yet (Spec 129).

**After** (the part; the line's pointer is appended at the line's end, after "(Kotlin `<Name>Themes.WcagLight.<prop>`)"):
> The generated `<Name>Themes` holder has four fixed instances, `baseLight`, `baseDark`, `wcagLight` and `wcagDark` (Kotlin `BaseLight`, `BaseDark`, `WcagLight`, `WcagDark`), then one for each mode that another registered theme covers (`high-contrast` in mode `both` adds `highContrastLight` and `highContrastDark`; Kotlin `HighContrastLight` and `HighContrastDark`). The `<Name>ThemeFamily` has the cases `base`, `wcag`, then one per other registered theme in config order, and the `<name>Theme(_:)` modifier (iOS) and `<Name>Theme(family:)` composable (Android) select a family's instance by the system colour scheme. A theme of one mode shows the base instance in the scheme it does not cover. `dark` adds no instance: it is the base theme's dark map, which forms `baseDark`.

**The whole line after item 5**, for the byte compare at application:
>   - **iOS and Android**: every colour semantic is a member of a generated theme (`DesignerPunkTheme`, read through `\.dpTheme` on iOS and `LocalDPTheme.current` on Android) and none is a `DesignTokens` member. The generated `<Name>Themes` holder has four fixed instances, `baseLight`, `baseDark`, `wcagLight` and `wcagDark` (Kotlin `BaseLight`, `BaseDark`, `WcagLight`, `WcagDark`), then one for each mode that another registered theme covers (`high-contrast` in mode `both` adds `highContrastLight` and `highContrastDark`; Kotlin `HighContrastLight` and `HighContrastDark`). The `<Name>ThemeFamily` has the cases `base`, `wcag`, then one per other registered theme in config order, and the `<name>Theme(_:)` modifier (iOS) and `<Name>Theme(family:)` composable (Android) select a family's instance by the system colour scheme. A theme of one mode shows the base instance in the scheme it does not cover. `dark` adds no instance: it is the base theme's dark map, which forms `baseDark`. **The flat `_wcag` constants on `DesignTokens` (Android `_wcag_light` and `_wcag_dark`) are gone** (Spec 129 Task 11; Peter, 2026-11-07T18:46:40Z): read the WCAG colour through the `wcag` instance, in a View or Composable by selecting the family, elsewhere as `<Name>Themes.wcagLight.<prop>` (Kotlin `<Name>Themes.WcagLight.<prop>`) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 5; prior text at `3f739b07f`.)*

### Item 6: `canonical/agents/ada.md` L318, `#in-scope` item `scope-output` (LAW; only under F-1 (a))

**Before** (L318):
> - Cross-platform token output (CSS custom properties; Swift and Kotlin constants on `DesignTokens`; the Swift protocol/structs and Kotlin data class/instances designed for themes, not emitted yet)

**After**:
> - Cross-platform token output (CSS custom properties; Swift and Kotlin constants on `DesignTokens` for every primitive and for each non-colour semantic the platform emits, iOS emitting no `elevation.*` semantic and Android no `zIndex.*`; the colour semantics as members of the generated Swift `DesignerPunkTheme` protocol and its structs, and of the Kotlin `DesignerPunkTheme` data class and its instances)

### Item 7: `canonical/agents/ada.md` L323, `#in-scope` item `scope-theme-output` (LAW; only under F-1 (a))

**Before** (L323):
> - Platform generator theme-aware output — CSS `data-theme` blocks (today one, `:root[data-theme="wcag"]`, which matches only `<html>`, so it applies page-wide), Swift `@Environment` and Kotlin `CompositionLocal` theme types, DTCG/Figma theme metadata. Output for themes registered in `designerpunk.config.ts`, the native theme types and the theme metadata are not emitted yet (Spec 129); whether a subtree can be themed is not decided yet

**After**:
> - Platform generator theme-aware output — CSS `data-theme` blocks (`:root[data-theme="wcag"]` and one for each other registered theme, each written when its maps override a colour token and each matching only `<html>`, so a theme applies page-wide), Swift `@Environment` and Kotlin `CompositionLocal` theme types with the `<name>Theme(_:)` and `<Name>Theme(family:)` providers and the `<Name>ThemeFamily` they take, DTCG/Figma theme metadata. The DTCG/Figma theme metadata is not emitted yet; whether a subtree can be themed is not decided yet

Charter lines carry no pointer (README § "Conventions"); the application commit's message names this ballot.

### Item 8: `governance/Token-Quick-Reference.md` L118, part (EXECUTION of this ballot)

The line's other sentences are true. **Before** (part of L118):
> register it in `designerpunk.config.ts`, which does not change the generated output yet (above).

**After** (the part):
> register it in `designerpunk.config.ts`, and `generate` applies it (above).

**The whole line after item 8**, with its pointer, for the byte compare at application:
> **Base vs product themes**: The paths in this section (`src/tokens/themes/dark/`, `wcag/`, `dark-wcag/`) are the base system's built-in theme files, shipped with `@3fn/core`. Product teams creating custom themes do NOT edit these files — they create their own `SemanticOverrides.ts` and register it in `designerpunk.config.ts`, and `generate` applies it (above). See Token-Governance § "Theme Registry (Spec 094)" for product theme governance. *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 8; prior text at `3f739b07f`.)*

The rest of L118's "Custom themes" passage (L114–116) was rewritten in U9 (Task 14 completion, criterion row "The served sentences …"); this clause was missed there.

### What the measure does not settle

- The "Known limitation" (L267), shadow theme-varying determination is direct, not transitive: not re-read here, unchanged.
- The code example (L246–256): unchanged. It registers a dark-only theme, which now shows the base in the light scheme (the single-mode rule); item 5 says so.
- Q3b (subtree theming) and the bridge's retirement at 17.0.0: each is a later edit to items 1 and 4 when it is ruled or ships.
- Design § 4 calls native emission provisional until Spec 132's D4 app builds. These lines state what ships, not that it is final.

## 2. Census (README § "Conventions", "Instrument census")

One line per instrument, as in the 2026-11-05 Core Goals ballot § 4 (the README's "exactly one line" per item does not address one instrument read by several items; I read it as one line per instrument and name the reading here). **Stacy, census reader, accepted both departures** (`[STACY R1]` § 1): this one, on condition that if Peter strikes an item a joint line covers, that line is re-run over the items he ratified before the Status commit (§ 4 step 1); and the corpus-diff census below, as the stronger read. Neither is disputed, so neither goes to Peter. Both digests were reproduced by her at `3f739b07f`.

- `**Census**: npx tsx scripts/governance-examples/check.ts --census over governance/*.md and the eight packaged steering docs @ 3f739b07f — current c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd → proposed c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd; 0 docs change (delta: § Census appendix)` — covers items 1–5 and 8, which edit two files the guard loads (condition 1). This item changes the instrument's inputs, not its code, so "proposed" is the census run with items 1–5 and 8 applied to the tree at `3f739b07f` (a corpus diff, not the README's code diff; accepted by Stacy). Re-run at [ADA R2] on the revised after-texts, item 8's pointer written out; the scratch diff is in the appendix, verbatim. Re-run again at [ADA R4] on item 2's fixed-behaviour text, at the branch head after merging `origin/main` at `c91fb9b15`: the same digests, no delta. `Token-Governance.md` stays `65:0:2` and `Token-Quick-Reference.md` unchanged. Run after `npm run build` (the guard's import surface needs `dist/`).
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no item renames a heading or adds or removes a get_section or get_document_* citation; § "Theme Registry (Spec 094)" keeps its heading`
- `**Census**: not in scope — 122-diff-guard with the operative-set freshness sweep (tools/agent-generator/diff-guard.ts) — no instrument code change. Items 1–5 change the ambient token-governance embed in Ada's generated charters, which regeneration moves with canonical/generated.lock (§ 4 step 6); under F-1 (a), between the authoring commit and Ada's acts the sweep reports ada #in-scope stale, then unsigned, which are the owed acts of § 3; at the application PR's merge, after § 3's acts, the freshness verdict is fresh as before`
- `**Census**: not in scope — verify-signing-chain --ci (row signing-act-consistency) — no instrument code change; under F-1 (a) the § 3 commits are its inputs at application, checked by links 1–3 as written; without F-1 (a) no signed unit changes (Token-Governance has no operative set)`
- `**Census**: not in scope — no-autonomous-token-creation (barrier, armed; its 17 family-integrity suites in lane-functional-root) — items 1–5 edit § "Theme Registry (Spec 094)", a subsection of the § "Token Creation Governance" its education cites as the canonical statement (condition 2), but they change no creation rule, and the suites import token modules and read no document: git grep -l -i "token-governance\|token governance" 3f739b07f -- src/tokens src/validators prints nothing` *(added at [ADA R2], `[STACY R1]` B-3)*

The ambient embed's two `mustContain` asserts (`canonical/agents/ada.md` L18–28) read Token-Governance L87 ("freely use semantic concept tokens") and L171 ("Creating ANY system token (semantic, primitive, or component) requires human review"). The second assert's section, § "Token Creation Governance", contains the Theme Registry subsection, but the assert matches only its string, which no item touches.

## 3. Re-sign consequences (only under F-1 (a))

Items 1–5 and 8 touch no signed unit: Token-Governance and Token-Quick-Reference have no operative set. Their only generated copies are the ambient embed in `.claude/agents/ada.md` and `canonical/_consumer-output/cc/.claude/agents/ada.md`, which regeneration moves (the Task 11 precedent: #730, Thurgood regenerated at `627991d20`).

Under F-1 (a), items 6 and 7 change Ada's `#in-scope` unit (`canonical/operative-sets/ada.yaml`; owner, confirmer and signer Ada):

| What moves | Acts |
|---|---|
| `canonical/agents/ada.md` L318, L323 | Thurgood authors both lines **byte for byte** from items 6 and 7 (charter text in a signing range is the profile author's; the seat drafts only). The authoring commit must not move `#in-scope`'s `canonicalHash` |
| `canonical/operative-sets/ada.yaml` L82 (`scope-output`), L102 (`scope-theme-output`) | Thurgood re-quotes each `text` as the new line without its leading `- `; ids, kinds (`member`) and labels kept |
| `canonical/profiles/consumer/ada.overlay.md` L28, L33 | Thurgood re-renders both lines as the canonical lines (the after-texts carry no DesignerPunk-only words, so no new removal is owed; L33's "(DesignerPunk plans them in Spec 129, with no date set)" goes with the old text) and re-grounds the unit pin. The `#in-scope` row's existing removals (`canonical/profiles/consumer/ada.dispositions.yaml` L8) quote text outside these lines and stand |
| `canonical/profiles/consumer/confirmations/ada.md` § `#in-scope`; `signatures/ada.md` § `#in-scope` | Ada re-confirms (moves `canonicalHash`, dated record above the earlier ones, which stay inline) and re-signs, each its own commit under `Agent: Ada` |

**Grants.** None of these files is in my write scope, nor in Thurgood's standing scope (`[THURGOOD R1]`, "Grants"). Peter's ratification names the files, or a grant record does before the application PR opens: `governance/Token-Governance.md`, `governance/Token-Quick-Reference.md`; under F-1 (a) also `canonical/agents/ada.md` L318 and L323 byte for byte, `canonical/operative-sets/ada.yaml`, `canonical/profiles/consumer/ada.overlay.md`; and `canonical/generated.lock` with the generated roots. My confirmation and signature sections are my own acts.

## 4. Application (on ratification; one PR, Peter-merged)

0. **The fix is on `main`** (F-2, resolved): #785 (`c91fb9b15`) is an ancestor of the application base (`git merge-base --is-ancestor c91fb9b15 <base>`). If a later change has altered the refusal so that item 2 no longer describes it, stop and report; the text is never adapted.
1. **The Status commit** (record-first), before any edit: `**Status**: **RATIFIED (Peter, <date>)** — <F-1 answer>; F-2 resolved (Peter, 2026-11-08T15:12:38Z)`, his words quoted with their `date -u` receipt time, `<ratification date>` filled in every pointer, the README roll entry added, and a § 9 "Resolved after-texts" appended (each site's after-text as it will be applied), so the claims pass compares the application diff with § 9 byte for byte. If Peter strikes an item that § 2's governance-examples line covers, that line is re-run over the items he ratified and its digests and delta are replaced before this commit (Stacy's condition, § 2).
2. Branch `chore/token-governance-theme-registry-as-shipped` from `main`. Stop on any before-text that does not match: `git diff --quiet 3f739b07f <base> -- governance/Token-Governance.md governance/Token-Quick-Reference.md` (and, under F-1 (a), `canonical/agents/ada.md canonical/operative-sets/ada.yaml canonical/profiles/consumer/ada.overlay.md canonical/profiles/consumer/ada.dispositions.yaml`). A mismatch stops that item and is reported, never adapted.
3. PR body: `**Edit kind**: governance/Token-Governance.md — LAW (.kiro/docs/ballots/2026-11-08-token-governance-theme-registry-as-shipped.md)`; `**Edit kind**: governance/Token-Quick-Reference.md — EXECUTION (ballot 2026-11-08-token-governance-theme-registry-as-shipped item 8)`; under F-1 (a), `**Edit kind**: canonical/agents/ada.md — LAW (.kiro/docs/ballots/2026-11-08-token-governance-theme-registry-as-shipped.md)`; `**Consulted**: Ada — the text is hers`; `Spec: 129-consumer-generation-completeness` and `Task: Req 15.6 (tasks.md L246)`.
4. **Authoring commit** (Thurgood): items 1–5 and 8; under F-1 (a), items 6 and 7. Under F-1 (a), run `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci` and `npm run -s check:122:diff-guard` on it before briefing Ada: no `canonicalHash` moves.
5. **Profile-author commit** (Thurgood; only under F-1 (a)): the two item re-quotes and the overlay re-render and pin, as § 3.
6. **Regeneration**, by Thurgood or Lina, never by Ada under F-1 (a), since she signs in the range (`[THURGOOD R1]`, F12′): `npm run build:generator`; commit the generated roots (`.claude/agents/ada.md`, `.kiro/agents/ada-prompt.md`, `canonical/_consumer-output/**`). Under F-1 (a), run the generator once after step 4 and once after step 5; the roots must be byte-identical, or stop and report before any seat act.
7. **Seat acts** (only under F-1 (a)): first `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci --base $(git merge-base origin/main HEAD) --head HEAD`; then Ada re-confirms in one commit and re-signs in another, each fresh, no amends and no later edit to either sheet section.
8. **Lock refresh and checks**: a second `npm run build:generator`, outputs byte-identical, commit `canonical/generated.lock` only. Then `npm run -s check:122:diff-guard`; `npm run -s check:section-citations`; `npm run build` and the governance-examples census, compared input by input with § 2's census (README § "Conventions", "Re-runs"): a line that differs for a doc unchanged since `3f739b07f` (`git diff --name-only 3f739b07f <run-sha> -- governance .kiro/steering package.json`) stops this PR and is reported, and lines that differ for docs changed since then are listed in the PR body; `npm run test:scripts`; `npm test`. Under F-1 (a), before Peter merges: `verify-signing-chain --audit --pr <n>`.
9. **Indexes**: after the merge, the docs MCP `rebuild_index` (both docs are served); no application-MCP rebuild is owed.
10. **Sweep**: re-run § 5's commands on the changed tree; the allowed hits are the ones § 5 leaves.
11. **One lock-carrying PR at a time**: re-merge `main` into the branch right before Peter's turn.

**When.** Before the S of the first release that carries U6 and U9 (Req 15.6: "in that release"). Task 18.4 reads that it happened.

## 5. Straggler sweep

Run at `3f739b07f`: `git grep -nE "not applied yet|does not change the generated output yet|not registered with it yet|not checked today|adds no native instance yet|union is over the built-in|changes no generated output|not emitted yet|today one, \`:root|registered, not applied" -- . ':!.kiro/specs' ':!canonical/_fixture-output' ':!node_modules'`.

| Hit | Disposition |
|---|---|
| `governance/Token-Governance.md` L242, L259, L261, L264, L265 | items 1–5 |
| `governance/Token-Quick-Reference.md` L118 | item 8 |
| `canonical/agents/ada.md` L318, L323 | items 6, 7 (F-1) |
| `canonical/operative-sets/ada.yaml` L82, L102; `canonical/profiles/consumer/ada.overlay.md` L28, L33 | § 3 (F-1) |
| `.claude/agents/ada.md` L61, L66, L357, L380; `.kiro/agents/ada-prompt.md` L36, L41; `canonical/_consumer-output/{_canonical,cc,kiro}/**/ada*.md` | regeneration. Under F-1 (b), L61/L66, L36/L41 and their consumer copies stay false in the release |
| `canonical/profiles/consumer/confirmations/ada.md` L71–72; `confirmations/sparky.md` L56; `signatures/kenya.md` L305 | ledgers: quote earlier text, kept inline |
| `CHANGELOG.md` L93, L203, L295; `docs/releases/release-15.0.0.md` L128; `docs/releases/release-15.1.0.md` L46 | release history, true of the release each describes; not edited |
| `.kiro/issues/2026-10-24-native-theme-emission-owner-stated-two-ways.md` L13 | a record's quote of the older L274; its question is about spec outlines and is not touched here |
| `.kiro/issues/archive/2026-10-12-steward-canonical-claims-theme-output.md` L56 | archived, immutable |
| `src/cli/__tests__/configCThemesReachNativeOutput.test.ts` L7, L68; `tests/consumer-integration.test.ts` L3007; `src/cli/shared/errorCatalog.ts` L567 | true: each says the old line is gone |
| `src/generators/generateTokenIndex.ts` L153; `src/generators/__tests__/tokenIndexPlatformNames.test.ts` L22 | **left**: code comments, not governance text, mine; they say the native theme types are "not emitted yet". I fix both in a `src/generators/**` PR before the same S. No ballot: comments |
| (not a sweep hit; found in review) `src/cli/shared/errorCatalog.ts` L575–576, the `Themes:` line's "any other theme is written as :root[data-theme=\"<name>\"] on web" | false for a theme that overrides no colour token; filed in `.kiro/issues/2026-11-08-non-colour-theme-override-accepted-not-applied.md` with the dropped-override defect, Ada owner, Leonardo on wording |

Served siblings already true at `3f739b07f` (rewritten in U9): `governance/Rosetta-System-Architecture.md` L538–574, `governance/Token-Quick-Reference.md` L114–116, the Integration Guide.

## 6. Forks for Peter (none is picked here for him)

### F-1. Do Ada's two stale charter lines ride this ballot?

`canonical/agents/ada.md` L318 and L323 (my `#in-scope` unit) say the native theme types and registered-theme output are "not emitted yet". Both went false at U6 and U9. Sparky's line was corrected in U9 and Kenya's and Data's in U11 (Task 16); mine was missed. Req 15.6 names only Token-Governance.

- **(a) Yes, items 6 and 7.** One application PR with one re-confirm and re-sign of `#in-scope` by me, and Thurgood's authoring and profile acts (§ 3). Every Ada charter, ours and the consumer's, is true in the release. **Residual**: a one-PR Req 15.6 edit becomes a signed-unit change; it widens what Peter ratifies beyond the requirement, and the extra acts (authoring, profile, regeneration twice, my two seat acts, lock refresh) sit on the release's critical path.
- **(b) No; a separate ballot later.** This ballot stays the size Req 15.6 asked for. **Residual**: a charter edit is LAW either way, so (b) is a second ballot with the same acts, later; if it misses the S, the release ships a consumer Ada that tells adopters theme output is not emitted while their own `generate` prints "registered and applied", which is the class of false shipped text Req 15 exists to stop.

**My lean: (a)**, because (b) costs the same acts later and risks a false line in the release. What survives of (b): it keeps Peter's ruling to exactly what the requirement named. The pick is Peter's.

### F-2. Does item 2 describe the `dark` defect as it ships, or the generator after a fix? *(added at [ADA R3]; the fork is Stacy's, `[STACY R2]` B-5)*

**RESOLVED by Peter, 2026-11-08T15:12:38Z: fix first, by refusal.** His words, verbatim: "(a) with the class option. 783 is merged" (record `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-theme-map-noncolour-refuse.md`, which says "The ballot's F-2 resolves as fix first. The Token-Governance ballot describes the fixed behaviour."). His (a) is this fork's (ii-a), a refusal; "the class option" makes it cover every theme override map, `dark`, `wcag` and custom, by token category. The fix merged as #785 (`c91fb9b15`), and item 2 now states it. My (ii-b) lean was not taken. The options below are kept as they were put.

A non-colour key in a registered `dark` map ships as uncompilable Swift (§ 0). Both options land before the S.

- **(i) Describe what ships, and fix the generator under the record.** The ballot is not held for code. **Residual**: governance states a defect as behaviour, an adopter reading it learns the failure rather than a rule, and item 2 owes another ballot edit when the fix lands.
- **(ii) Fix the generator first, then ratify the text that describes the fix.** My `src/generators/**` PR, under the record, merges before the application PR; § 4 gains a step 0 that checks it merged and that its behaviour matches the chosen after-text.
  - **(ii-a) Refuse**: `generate` fails on a non-colour override in any map. **Residual**: a config that passes today with a custom or `wcag` non-colour key starts failing, a break under Req 10.4, so it is Peter's; for `dark` the config is already broken on iOS, so refusing it breaks nothing that works.
  - **(ii-b) Warn and drop**: `generate` warns on every run and leaves the token's output unchanged. Not a break; the `dark` case becomes compilable. **Residual**: a warning can be ignored, and the config keeps claiming an override it does not get.
  - **Residual of (ii) as a whole**: a generator PR sits on the path to this ballot, before the same S.

**My lean: (ii-b).** Governance should state a rule, not a failure, and (ii-b) fixes the build without breaking a config that works today; (ii-a) can follow at 17.0.0 with the other breaking changes if Peter wants it. What survives of (i): no code on the ballot's path. Stacy picks nothing here. The pick is Peter's.

## 7. Counter-argument (fold-back applied first), and what survives

**I recommend** items 1–5 and 8 as drafted, and F-1 (a).

**Counter-arguments I ran against my draft, and what they changed:**
1. *"This is a CORRECTION; the generator is the referent, so no ballot is needed."* Not taken: Req 15.6 names a ballot, and item 2 changes what governance tells a reader is checked. The README's tie-break is LAW. Item 8, which only describes, is carried as EXECUTION so it needs no separate PR.
2. *"Governance restating emitter detail duplicates design § 4 and will drift."* Folded in: the native line names the shape (four fixed instances, one per covered mode, family cases, the fallback) and one example, and leaves out the refusal list, the reserved-word list, the implicit members and the bridge warning's wording, which live in design § 4 and § 10 and the Integration Guide.
3. *"The web line says `wcag` is always written."* Folded in after a code read: `maybeGenerateWcagBlock` writes nothing when the maps override no colour token (the opt-out), so item 4 says when no block is written. Sparky's charter line says "`wcag` is always generated"; that is his to re-read, and I flag it to him (§ 8).
4. *"Item 1 says every other theme adds output on each platform."* Taken at [ADA R2] from `[STACY R1]` B-4: false on web for a theme with no colour override, which item 4 itself says writes no block. Item 1 now says where each platform's output comes from, and item 2 says a non-colour override is accepted and applied nowhere, which is what ships; the defect is filed, not fixed here.

**What survives:**
- **Five homes.** The same facts now live in design §§ 4 and 10, Token-Governance, Token-Quick-Reference, Rosetta-System-Architecture and the Integration Guide, plus three charters. Each later generator change (the bridge's retirement at 17.0.0, a Q3b ruling, DTCG theme metadata) owes edits in all of them. Item 1's "until the next major release" is designed to go false at 17.0.0, and this section then owes another edit.
- **Item 2 rests on a code read.** No `generate`-level test pins "a registered custom theme with an unknown key fails `generate`"; `ThemeRegistry.test.ts` pins the unit. If someone drops `setSemanticValidator`, the sentence goes false with every test green. The `wcag` path already sits outside the `try` and throws a raw `Error`, a second shape (`[STACY R1]` § 2). I add the `generate`-level test, and move the two built-in `register()` calls into the `try`, in the PR that fixes the filed record; neither is a precondition here.
- **Item 2 states a refusal that a stray key now meets.** Under Peter's ruling the refusal is what ships (#785). A consumer whose registered map already carried a non-colour key, ignored or (in `dark`) broken until now, finds `generate` failing on upgrade; the error names the key and what to do. This is the surviving counter to (a) that Peter read. *(Rewritten at [ADA R4]; the [ADA R3] residual described the F-2 options.)*
- **Provisional native design.** Design § 4 says native emission is provisional until Spec 132's D4 app builds. Item 5 states as current what 132 may change, and then owes another edit.
- **Cost.** Ratification, a Status commit and an application PR, with regeneration, and under F-1 (a) a re-sign, for text a CORRECTION could mostly have carried. The ballot buys Peter's sight of item 2's new claim and the charter change; for items 1, 3, 4 and 5, the value is that Req 15.6 asked for it.

## 8. Notes for other seats (no act is asked of them by this ballot)

- **Sparky**: `canonical/operative-sets/sparky.yaml` L89–90 say "`wcag` is always generated". With the opt-out (`overrides: { light: {}, dark: {} }`) no `wcag` block is written (`TokenFileGenerator.ts` L1520–1532, L970). Yours to re-read.

## Census appendix

**Scratch diff** (corpus, not code; § 2), verbatim, as `git diff -- governance` printed it with items 1–5 and 8 applied at `3f739b07f` (`<ratification date>` left as written; Stacy found a filled date gives the same digest). It applies with `git apply` at `3f739b07f`. Re-run at [ADA R2]:

````diff
diff --git a/governance/Token-Governance.md b/governance/Token-Governance.md
index dbe59fbd4..88e557a9c 100644
--- a/governance/Token-Governance.md
+++ b/governance/Token-Governance.md
@@ -239,7 +239,7 @@ This applies to new dimensions (e.g., density) and new values within existing di
 
 As of Spec 094, themes are managed via a **ThemeRegistry** pattern. Products register themes in `designerpunk.config.ts` using `defineConfig()`.
 
-**A registered theme is not applied yet.** `npx designerpunk generate` reads the config's themes and lists them as "registered, not applied yet": a theme registered in `designerpunk.config.ts` changes no generated output on any platform, and nothing checks its overrides against the token set. Whether and how registered themes are applied is Spec 129's to decide (charter scope items (i) and (vi)). Today the generator applies DesignerPunk's built-in overrides only; the last rule below says what each platform emits. *(Corrected 2026-10-23 to what the generator emits; DesignerPunk record `2026-10-03-data-theme-scope-charter-vs-generator`.)*
+**A registered theme is applied.** `npx designerpunk generate` builds the theme registry from the config's `themes` and lists them on its `Themes:` line as registered and applied. A theme named `dark` or `wcag` replaces DesignerPunk's built-in override map for that context with the map the config imports. In local mode, a built-in map the config does not register (`dark`, `wcag` light or `wcag` dark) is still applied from the installed package, with a warning on every run that names the config line that would make it the product's own, until the next major release; in package mode the package's built-in maps apply. Every other registered theme adds an instance on iOS and Android and, when it overrides a colour token, a block on web, as the last rule below says. `generate` refuses a theme name it cannot emit on every platform, naming the config entry. *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 1; prior text at `3f739b07f`.)*
 
 **Adding a new theme does NOT require a formal spec.** Themes are product-level configuration, not architectural decisions. A product developer creates a `SemanticOverrides.ts` and registers it in their config:
 
@@ -256,13 +256,13 @@ export default defineConfig({
 ```
 
 **Theme governance rules:**
-- Theme overrides reference existing semantic tokens only — `ThemeRegistry.register()` rejects an override that names an unknown semantic token. The build registers DesignerPunk's built-in themes this way; a theme in `designerpunk.config.ts` is not registered with it yet, so its overrides are not checked today
+- Theme overrides reference existing semantic tokens only, and colour tokens only. `generate` checks every override map it applies, built-in or registered, and fails, naming the key, on an override that names no semantic token (`SemanticOverrideResolver.validate()` for the `dark` map; `ThemeRegistry.register()` for `wcag` and every other registered theme). `generate` also fails, before writing anything, on a key that names a semantic token that is not a colour, in any map the config registers (`dark`, `wcag` or any other theme, in either form), naming the theme, the map and the key (DesignerPunk #785, under Peter's ruling of 2026-11-08, DesignerPunk record `2026-11-08-peter-ruling-theme-map-noncolour-refuse`) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 2; prior text at `3f739b07f`.)*
 - Overrides swap primitive references, not token structure — the `SemanticOverrideMap` format is unchanged
-- Theme-varying tokens are determined automatically: the registry computes the union of all overridden token names across the themes registered with it, and the iOS/Android generators add every token whose base light and dark values differ. The build registers DesignerPunk's built-in `dark` and `wcag` themes only, so today the union is over the built-in overrides
+- Theme-varying tokens are determined automatically: the registry computes the union of all overridden token names across the themes registered with it, and the iOS/Android generators add every token whose base light and dark values differ. `generate` registers `dark`, `wcag` and every other theme the config registers, so the union covers each of them and holds colour tokens only (the first rule above) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 3; prior text at `3f739b07f`.)*
 - Non-theme-varying tokens (spacing, sizing, radius, typography, motion) stay as static constants
 - Each platform is designed to carry theme-varying tokens in its native idiom: CSS custom properties under a `data-theme` selector, Swift `@Environment`, Kotlin `CompositionLocal`. What the generator emits today:
-  - **Web**: dark mode through `light-dark()` values and `color-scheme: light dark` on `:root`, with no dark `data-theme` block; and one theme block, `:root[data-theme="wcag"]`. That selector matches only the `<html>` element, so a theme applies page-wide, and `data-theme` on any other element matches nothing. Whether a subtree can be themed is not decided yet (Spec 129)
-  - **iOS and Android**: every colour semantic is a member of a generated theme (`DesignerPunkTheme`, read through `\.dpTheme` on iOS and `LocalDPTheme.current` on Android) and none is a `DesignTokens` member. The generated `<Name>Themes` holder has four instances, `baseLight`, `baseDark`, `wcagLight` and `wcagDark` (Kotlin `BaseLight`, `BaseDark`, `WcagLight`, `WcagDark`), and a `<Name>ThemeFamily` with `base` and `wcag` that the `<name>Theme(_:)` modifier (iOS) and `<Name>Theme(family:)` composable (Android) select from. A theme registered in `designerpunk.config.ts` adds no native instance yet (Spec 129). **The flat `_wcag` constants on `DesignTokens` (Android `_wcag_light` and `_wcag_dark`) are gone** (Spec 129 Task 11; Peter, 2026-11-07T18:46:40Z): read the WCAG colour through the `wcag` instance, in a View or Composable by selecting the family, elsewhere as `<Name>Themes.wcagLight.<prop>` (Kotlin `<Name>Themes.WcagLight.<prop>`)
+  - **Web**: dark mode through `light-dark()` values and `color-scheme: light dark` on `:root`, with no dark `data-theme` block. `wcag` is written as `:root[data-theme="wcag"]`, and every other registered theme adds a block of its own, `:root[data-theme="<name>"]`; a theme whose maps override no colour token writes no block. A theme of one mode writes its own value in the scheme it covers and the base value in the other, and no theme block sets `color-scheme`, so a theme never forces the page's scheme. These selectors match only the `<html>` element, so a theme applies page-wide, and `data-theme` on any other element matches nothing. Whether a subtree can be themed is not decided yet (DesignerPunk record `2026-11-08-q3b-web-data-theme-selector-scope`) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 4; prior text at `3f739b07f`.)*
+  - **iOS and Android**: every colour semantic is a member of a generated theme (`DesignerPunkTheme`, read through `\.dpTheme` on iOS and `LocalDPTheme.current` on Android) and none is a `DesignTokens` member. The generated `<Name>Themes` holder has four fixed instances, `baseLight`, `baseDark`, `wcagLight` and `wcagDark` (Kotlin `BaseLight`, `BaseDark`, `WcagLight`, `WcagDark`), then one for each mode that another registered theme covers (`high-contrast` in mode `both` adds `highContrastLight` and `highContrastDark`; Kotlin `HighContrastLight` and `HighContrastDark`). The `<Name>ThemeFamily` has the cases `base`, `wcag`, then one per other registered theme in config order, and the `<name>Theme(_:)` modifier (iOS) and `<Name>Theme(family:)` composable (Android) select a family's instance by the system colour scheme. A theme of one mode shows the base instance in the scheme it does not cover. `dark` adds no instance: it is the base theme's dark map, which forms `baseDark`. **The flat `_wcag` constants on `DesignTokens` (Android `_wcag_light` and `_wcag_dark`) are gone** (Spec 129 Task 11; Peter, 2026-11-07T18:46:40Z): read the WCAG colour through the `wcag` instance, in a View or Composable by selecting the family, elsewhere as `<Name>Themes.wcagLight.<prop>` (Kotlin `<Name>Themes.WcagLight.<prop>`) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 5; prior text at `3f739b07f`.)*
 
 **Known limitation**: Theme-varying determination is direct, not transitive. Shadow tokens referencing overridden color primitives will use base values on iOS/Android. See Spec 094 design.md § "Known Limitations".
 
diff --git a/governance/Token-Quick-Reference.md b/governance/Token-Quick-Reference.md
index ba6b462a1..6830e5637 100644
--- a/governance/Token-Quick-Reference.md
+++ b/governance/Token-Quick-Reference.md
@@ -115,7 +115,7 @@ Mode (light/dark) and theme (base/wcag/custom) are independent dimensions. The b
 
 The **ThemeRegistry** holds registered themes and computes the theme-varying token names. `generate` builds it from the config's themes (the `dark` and `wcag` maps as registration resolves them, and every other registered theme), and resolves the four contexts through `SemanticOverrideResolver.resolveAllContexts()`. `SemanticOverrideResolver.resolveForRegistry()`, which produces `ResolvedThemeSet[]` (one entry per theme context), exists but is not called by the build, and no test calls it.
 
-**Base vs product themes**: The paths in this section (`src/tokens/themes/dark/`, `wcag/`, `dark-wcag/`) are the base system's built-in theme files, shipped with `@3fn/core`. Product teams creating custom themes do NOT edit these files — they create their own `SemanticOverrides.ts` and register it in `designerpunk.config.ts`, which does not change the generated output yet (above). See Token-Governance § "Theme Registry (Spec 094)" for product theme governance.
+**Base vs product themes**: The paths in this section (`src/tokens/themes/dark/`, `wcag/`, `dark-wcag/`) are the base system's built-in theme files, shipped with `@3fn/core`. Product teams creating custom themes do NOT edit these files — they create their own `SemanticOverrides.ts` and register it in `designerpunk.config.ts`, and `generate` applies it (above). See Token-Governance § "Theme Registry (Spec 094)" for product theme governance. *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 8; prior text at `3f739b07f`.)*
 
 **Theme-varying vs static tokens** — two distinct computations; do not conflate them:
 
````

The diff above carries items 1–5 and 8 as § 1 now gives them, item 2 in its [ADA R4] fixed-behaviour text. Re-run at [ADA R4], after merging `origin/main` at `c91fb9b15` (no census input changed: `git diff --name-only 3f739b07f c91fb9b15 -- governance .kiro/steering package.json` prints nothing).

**Census, re-run on this diff** (and on each F-2 option): current `c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd`, proposed `c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd`. **Delta**: none; `diff` of the two census outputs prints nothing. Selected count, both runs: `selected: 1968 (1949 token-name candidates, 4 declared paths, 1 token-file shapes, 14 import lines) over 91 docs; predicate v1, file-shape rule v1`.

---

## Review record

### [THURGOOD R1] (required, form)

#### [THURGOOD R1]
- Form review, read at `0d682564e`. The before-texts match `origin/main` at `738d13009`: `git diff --quiet 3f739b07f 738d13009 -- governance/Token-Governance.md governance/Token-Quick-Reference.md canonical/agents/ada.md canonical/operative-sets/ada.yaml canonical/profiles/consumer/` exits 0. **Verdict: the form passes, with two fixes.** It has a `**Status**: DRAFT` line, before and after text for every item, edit sites, an application section (§ 4), a counter-argument worked against the draft before presenting, with what survives (§ 7), and one fork, F-1, not picked (§ 6). → § "1. The measure", § "4. Application", § "6. Forks for Peter", § "7. Counter-argument"
- **Fix 1.** Item 8 edits `governance/**`, so it owes a dated pointer (README § "Conventions", "Where the pointer is owed"). Its after-text says the pointer is appended but does not give it. Write it out now, so the § 9 byte compare has a text to compare against: `*(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 8; prior text at `3f739b07f`.)*` → § "Item 8"
- **Fix 2.** The census departs from the README in two ways, and the ballot names both itself. (i) It gives one `**Census**:` line per instrument, where the README asks for one per presumptively in-scope item. (ii) Its "proposed" digest is a run over a changed corpus, where the README asks for a scratch diff to the instrument's code. Neither departure is for me to rule on. [@STACY] As census reader, rule on both, and reproduce both digests at `3f739b07f`. If you dispute either departure, it goes to Peter before ratification. → § "2. Census"
- **F12′ application reading.** This holds only under F-1 (a). Ada signs `#in-scope` in the application range, so she must not author charter text anywhere in that range; drafting it in this ballot is fine. The lawful order is § 3's:
  1. Thurgood commits items 6 and 7 byte for byte from this ballot, and the commit moves no `canonicalHash`.
  2. Thurgood makes the profile-author acts: the `ada.yaml` re-quotes and the overlay re-render and pin.
  3. Regeneration runs. Thurgood or Lina may run it; any seat that does not sign in the range may. The two runs must give byte-identical output.
  4. Ada re-confirms in one commit and re-signs in another, each fresh, with no amends and no follow-up edits to a sheet section.
  5. The lock is refreshed.

  Before any seat act, run `verify-signing-chain --ci --base $(git merge-base origin/main HEAD) --head HEAD`, and before the merge run `--audit --pr <n>`. → § "3. Re-sign consequences"
- **Grants.** My standing write scope does not cover any file this ballot edits: `governance/Token-Governance.md`, `governance/Token-Quick-Reference.md`, and under F-1 (a) `canonical/agents/ada.md`, `canonical/operative-sets/ada.yaml`, `canonical/profiles/consumer/ada.overlay.md`, `canonical/generated.lock` and the generated roots. Peter's ratification must therefore name these files, or a grant record must name them before the application PR opens. → § "3. Re-sign consequences", "Grants"

### [STACY R1] (census reader)

#### [STACY R1] — census reader; content read against U6 and U9

**Read at** `0d682564e` (the ballot, `origin/chore/ballot-token-governance-theme-registry`), against `main` at `3f739b07f`, 2026-11-08. Nothing was committed. My runs used a detached scratch worktree at `3f739b07f` after `npm run build`, and scratch consumer directories that ran the built `generate`. `main` has since moved to `738d13009`; `git diff --name-only 3f739b07f origin/main -- governance .kiro/steering package.json` prints nothing, so no census input has moved.

**Verdict: the census is VALID on reproduction. Four fixes are owed before this goes to Peter (B-1 to B-4).** All four are cheap, and none re-opens a decision.

**1. The census**

- **Digests reproduced.** I ran `npx tsx scripts/governance-examples/check.ts --census` at `3f739b07f` and got current `c13c9780…52868bfd`. I then applied items 1–5 and 8 to the two docs from § 1's after-texts (5 lines in `Token-Governance.md`, 1 in `Token-Quick-Reference.md`, `--numstat` 5/5 and 1/1) and got proposed `c13c9780…52868bfd`. `diff` of the two outputs prints nothing. The selected-count line matches the appendix byte for byte. I ran the proposed census twice: once with `<ratification date>` left as written, once with a date filled in. Both gave the same digest, so the open placeholders do not change the result. On the edited tree the guard itself passes (`0 pending`), and so does `check:section-citations`.
- **Departure 1, one line per instrument: ACCEPTED**, on the same reading I gave the Core Goals ballot (`2026-11-05-core-goals-android-minimum.md` § 4, `[STACY R1]` § 4). One instrument read by several items is one census run, and N identical lines would add nothing. The line has to name the items it covers, and the governance-examples line does. **Condition:** if Peter strikes any item that a joint line covers, re-run that line over the items he ratified before the Status commit. Otherwise the application re-run is compared against a digest of a set he did not ratify. Whether the README should say this is still owed in Spec 131's ledger, as I recorded last time. I am not drafting it here.
- **Departure 2, a census over changed docs instead of changed code: ACCEPTED, as the stronger read.** No instrument code changes, so the README's code-only scratch diff would give equal digests by construction and say nothing. A run over the edited docs answers the question that actually matters for a condition-1 item: does the new text trip the guard? It does not. Two things follow:
  - **B-1 (form).** The README puts "the scratch diff and the delta … verbatim" in the appendix. The appendix describes the diff in prose instead. My digests rest on my own reconstruction, and item 8's pointer is not written out yet (Thurgood's fix). Once Thurgood's fix lands, the appendix has to carry the diff verbatim, with the census re-run on it.
  - **B-2 (application).** § 4 step 8 says to compare "with § 2's digest (a difference stops the PR)". The README's "Re-runs" rule compares input by input. A difference in an input unchanged since `3f739b07f` stops the PR. A difference in an input that has changed since then is listed, not stopped. As written, an unrelated `governance/*.md` change that merges before application would stop this PR. That fails safe, but it contradicts the rule. Step 8 should follow the README.
- **B-3 (a missing line, a finding on the drafter).** The row `no-autonomous-token-creation` (barrier, armed, owner Ada) cites `Token-Governance.md` § "Token Creation Governance" in its education as "the canonical statement". The section edited here, § "Theme Registry (Spec 094)", is a subsection of it (L167 → L238). That meets condition 2, so items 1–5 owe a line for the row. The Core Goals ballot carried a not-in-scope line for this same row (its § 4, fourth line). The 17 family suites the row registers do not read the doc: `git grep -l -i "token-governance\|token governance" 3f739b07f -- src/tokens src/validators` prints nothing. The wording is the drafter's. I checked the other rows that cite these two docs. `never-hand-edit-generated-token-outputs` scores `Token-Governance.md:261` and `Token-Quick-Reference.md:119` explicitly as not part of its KEEP set, so they do not meet condition 2. `dated-pointer-paths` is at `check_state: none`.
- **The three not-in-scope lines: VALID.**
  - `check-section-citations`: no after-text adds a citation or renames a heading.
  - `122-diff-guard` and `verify-signing-chain`: valid on the merged-state reading, as in Core Goals. One wording point: the diff-guard reason calls the stale-then-unsigned state "not a change of verdict". It is a change, but a passing one. The reason should state the verdict at the merge, after § 3's acts, as the Core Goals lines do. This is not blocking.
- **Census field.** `git show 3f739b07f:governance/classification-map.md` gives `census: "npx tsx scripts/governance-examples/check.ts --census"` for row `governance-examples`. The line's command equals it.

**2. Is each after-text true to what ships?**

I read the generator at `3f739b07f` and design §§ 4 and 10, and ran `generate`. The config was config C plus one more theme: `spacey`, mode `both`, which overrides only `space.inset.100`. I also ran three orphan-key probes.

- **Item 1: mostly true; one sentence is false as written (B-4).**
  - These parts are true: the `Themes:` suffix, the registered-replaces-built-in rule, the bridge's warning on every local run naming the config line ("From the next major release, an unregistered built-in theme is not applied"), package mode applying the package's maps with no warning, and the refusal. Every refusal (a)–(h) shipped as a hard failure (`themeRefusals.ts` header; none ships as a warning), so "refuses" is true.
  - **"Every other registered theme adds output on each platform" is false on web** for a theme that overrides no colour token. `spacey` gets native instances and a family case, and no web block (the CSS has blocks for `wcag`, `high-contrast`, `brand` and `default` only). Item 4 itself says such a theme "writes no block", so the section would contradict itself.
  - **What the section does not say: a non-colour override is accepted, checked, and applied on no platform.** `spacey` passes `generate`. `space.inset.100` stays a `DesignTokens` constant (Swift `spaceInset100 = space100`, Kotlin `space_inset_100 = space_100`), the index has it as `themeVarying: false`, and the `spacey` instances carry only colour members. Item 3 now puts such a key into the registry's union (L342 reads `getThemeVaryingTokens()`), while L262, which is unchanged, says spacing "stays static". Built-in maps never carried a non-colour key, so this tension becomes reachable for the first time at U9.
  - Read together, items 1–3 tell a reader that a registered spacing override is applied. It is not. The text should say what ships. Whether `generate` should refuse or warn on a non-colour override is a separate question, for Ada and Peter, outside this ballot.
- **Item 2: the claim is true, but the parenthetical names the wrong check for `wcag`.**
  - Probes: an orphan key in `dark`, in `wcag` and in a custom theme each make `generate` exit 1, naming the key.
  - For `wcag`, the rejection comes from `ThemeRegistry.register()`, not from `SemanticOverrideResolver`. The message is `Theme 'wcag' references unknown semantic token 'color.nope.zzz'`. The call sits outside the `try`, at L268, and runs before `validateAll()` at L294 is reached. Only `dark` is caught by the resolver's `validate()`.
  - The parenthetical is false for `wcag`, and so is § 0's second bullet ("validate() and validateAll() fail generate on an orphaned key in the dark and wcag maps"). This is part of B-4.
  - For Ada's `src/generators/**` PR, not for this ballot: the `wcag` path throws a raw `Error`, not `TokenGenerationAbortedError`. That is a second shape § 7 residual 2 does not name.
- **Item 3: true as worded.** The union covers every registered theme, and the native generators consume it. Its interaction with L262 is part of B-4.
- **Item 4: true.**
  - The base `:root` has `color-scheme: light dark`, and no theme block has a `color-scheme` line.
  - Mode `light` writes `light-dark(<theme>, <base dark>)`, and mode `dark` writes `light-dark(<base light>, <theme>)`. I checked `brand` and `default` in the output.
  - A colourless theme writes no block.
  - The `wcag` block is written only when the maps override a colour token (L1520–1532).
  - The Q3b record resolves at `3f739b07f` and at `main`.
- **Item 5: true.**
  - The Swift holder `PBThemes` declares the four fixed instances first, then the others in config order, light before dark.
  - The family `PBThemeFamily` has `base`, `wcag`, then one case per other theme in config order. Kotlin matches (`HighContrastLight`, …).
  - The iOS `PBThemeModifier` reads `@Environment(\.colorScheme)`, and the Android `PBTheme(…, darkTheme = isSystemInDarkTheme())` selects by scheme.
  - Single-mode themes fall back to base (design § 4, "The single-mode rule").
  - `dark` adds no instance (design § 4, item 1).
- **Item 6: over-claims at the platform-family grain.** It says "constants on `DesignTokens` for every primitive and every semantic but the colour semantics". In the generated token index, the seven `elevation.*` semantics have no iOS name and the six `zIndex.*` semantics have no Android name. They are not emitted on that platform at all. The other gaps my index check flagged (scale, easing and motion) are types nested inside `DesignTokens`, so the claim holds for them. The colour half is true: all 62 colour semantics are theme members on both platforms. Low severity; the words are the owner's.
- **Item 7: two low points.**
  - "`:root[data-theme="wcag"]` and one for each other registered theme" drops the no-colour-override exception that item 4 carries. It is the same exception § 8 asks Sparky to re-read in his own line.
  - "with their `<Name>ThemeFamily` providers" calls the family type a provider. The providers are `<name>Theme(_:)` and `<Name>Theme(family:)`, and the family is the parameter they take.
  - "DTCG/Figma theme metadata is not emitted yet" is true: no theme name appears in either JSON file.
- **Item 8: true.**

**3. F-1**

I lean (a), for a reason from my seat. Under (b), the release would ship a consumer Ada charter that says theme output is "not emitted yet", while every adopter's `generate` prints "registered and applied". That is exactly the kind of false shipped sentence the RELEASE phase-1 floor read exists to find, and I would have to record it there. (a)'s residual is real: Peter ratifies more than Req 15.6 named, and the signing acts sit on the release path. The ballot discloses both. If Peter takes (a), item 6's and 7's low points cost nothing to fix now, and fixing them after ratification would take another ballot. The pick is Peter's.

**4. What blocks putting this to Peter**

- **B-1**: the appendix carries the scratch diff verbatim, after item 8's pointer is written out, and the census is re-run on it.
- **B-2**: § 4 step 8 compares input by input, per the README's "Re-runs" rule.
- **B-3**: the missing census line for `no-autonomous-token-creation`.
- **B-4**: item 1's "adds output on each platform"; the section's silence about non-colour overrides (items 1–3 with L262); and item 2's `wcag` attribution, with § 0's second bullet.

Items 6 and 7 are low, and fixing them is the owner's choice. I name what is false and the evidence. The replacement words are Ada's.

**Standards implications**: one, already owed. The README's census rule has no form for a census over a doc corpus when no instrument code changes, and no line grain for one instrument read by several items. This ballot and Core Goals each worked around it by stating a reading. It belongs in Spec 131's ledger, as before.

**Review**: object — B-1 to B-4 open; the census is VALID on reproduction

### [ADA R2] (2026-11-08; holder's incorporation)

Both R1 entries are spliced above byte for byte (commit `4d77f8f0c`). Incorporated in the next commit; Status stays DRAFT.

**[THURGOOD R1]**
- **Fix 1, item 8's pointer: done.** § "Item 8" now gives the whole line after item 8 with its pointer written out, `*(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 8; prior text at `3f739b07f`.)*`, for § 9's byte compare.
- **Fix 2, the two census departures: ruled by Stacy, both accepted** (`[STACY R1]` § 1). § 2 records her ruling and her condition on departure 1, and § 4 step 1 carries the condition. Nothing goes to Peter on the census.
- **F12′ order: taken.** § 4 step 6 says regeneration is Thurgood's or Lina's, never mine under F-1 (a); step 7 adds `verify-signing-chain --ci --base $(git merge-base origin/main HEAD) --head HEAD` before my seat acts, and my re-confirm and re-sign as two fresh commits with no later sheet edits. Step 8 keeps `--audit --pr <n>` before the merge.
- **Grants: taken.** § 3 now says neither of our standing scopes reaches these files, so Peter's ratification or a grant record names them before the application PR opens.

**[STACY R1]**
- **B-1: done.** The appendix carries the scratch diff verbatim (`git diff -- governance` with items 1–5 and 8 applied at `3f739b07f`, item 8's pointer written out; it applies with `git apply` at `3f739b07f`). I re-ran the census on it after the after-text changes below: current and proposed both `c13c9780…52868bfd`, no delta, same selected count.
- **B-2: done.** § 4 step 8 now compares input by input under the README's "Re-runs": a differing line for a doc unchanged since `3f739b07f` stops the PR; lines for docs changed since then are listed in the PR body.
- **B-3: done.** § 2 adds the not-in-scope line for `no-autonomous-token-creation`, on your evidence (condition 2 met through the parent section; no creation rule changes; the suites read no document). The finding on the drafter is mine and stands. Your diff-guard wording point is also taken: the line now states the verdict at the merge.
- **B-4: done, in three parts.**
  - Item 1 no longer says every other theme "adds output on each platform". It now reads "adds an instance on iOS and Android and, when it overrides a colour token, a block on web", which agrees with item 4.
  - Items 2 and 3 now say what ships for a non-colour override. Item 2: "Only colour overrides are applied: an override of a non-colour semantic, such as a spacing token, passes this check and changes no output on any platform". Item 3: "only its colour keys change any output". With L262 unchanged, the section no longer tells a reader a spacing override is applied.
  - Item 2's parenthetical and § 0's second bullet now name `SemanticOverrideResolver.validate()` for `dark` and `ThemeRegistry.register()` for `wcag` and every other theme. § 0 records the raw-`Error` shape on the `wcag` path.
- **Is the spacing override a defect?** Yes. It is a product defect, not a wording slip: `generate` accepts and validates an override that nothing applies, says nothing about dropping it, and its `Themes:` line (`errorCatalog.ts` L575–576) says that any other theme "is written as :root[data-theme=…] on web", which is false for such a theme. Filed in this branch: `.kiro/issues/2026-11-08-non-colour-theme-override-accepted-not-applied.md`. It is mine, P2 obligation (guard) · defect, trigger `release:next:phase-1`, with the `wcag` raw-`Error` shape in the same record. Options: refuse (breaking, Peter's call), warn, or apply (a new dimension, spec-gated). My lean is to warn and reword the `Themes:` clause before the S. Item 2 documents the behaviour as it ships, and owes an edit when the fix lands (§ 7, a new residual).
- **Items 6 and 7, the low points: both taken, since fixing them later would cost a ballot.** Item 6 now says "for each non-colour semantic the platform emits, iOS emitting no `elevation.*` semantic and Android no `zIndex.*`". Item 7 now carries the no-colour-override exception and names the providers `<name>Theme(_:)` and `<Name>Theme(family:)`, with "the `<Name>ThemeFamily` they take".
- **F-1**: your lean (a) is noted. The pick stays Peter's.

In my reading, B-1 to B-4 are met. Whether your objection is withdrawn is yours to say at R2.

### [STACY R2] (census reader)

#### [STACY R2] — re-read of the fold at `cded69085`

**Read at** `cded69085`, against `main` at `3f739b07f`, 2026-11-08. Nothing was committed. My R1 entry, as spliced at `4d77f8f0c`, is byte-identical to the entry I handed back. As before, my runs used a detached scratch worktree at `3f739b07f` after `npm run build`, and scratch consumer directories that ran the built `generate`.

**Verdict: the objection is kept, narrowed to one new point, B-5.** B-1 to B-4 are met. B-5 sits under B-4's fold: item 2's new sentence is false for a registered `dark` map, and what the dark map really does is a worse defect than the filed record describes.

**B-1 to B-4: met**

- **B-1.** The appendix diff applies with `git apply --check` at `3f739b07f`. Each of § 1's six after-texts is an added line in it: items 1–5, and item 8's whole line with its pointer. I re-ran the census on that diff myself: current and proposed are both `c13c9780…52868bfd`, `diff` prints nothing, and the selected-count line is unchanged. The guard passes on the edited tree (`0 pending`), and so does `check:section-citations`. **The census stays VALID.**
- **B-2.** § 4 step 8 now follows the README's "Re-runs" rule.
- **B-3.** The `no-autonomous-token-creation` line is present, in the not-in-scope form, and its reason is true. The diff-guard line now states the verdict at the merge.
- **B-4.** Item 1's new sentence agrees with item 4 and is true. Item 2's `dark` / `wcag` attribution and § 0's second bullet now match my three probes. Items 6 and 7 are true as rewritten. The elevation / zIndex exceptions are what the token index shows, and the provider names match the output.

**B-5: item 2's last sentence is false for a registered `dark` map**

Item 2 now says: "Only colour overrides are applied: an override of a non-colour semantic, such as a spacing token, passes this check and changes no output on any platform." Item 3 says: "only its colour keys change any output". Both are true for a custom theme and for `wcag`. They are false for `dark`.

I ran `generate` four times with `name: 'PB'`: once with no themes, then once each with a theme overriding only `space.inset.100` (to `space200`), registered as a custom `both` theme, as `wcag`, and as `dark`. I looked at `space.inset.100` on each platform:

| Registered as | Web | iOS | Android |
|---|---|---|---|
| (none) | `--space-inset-100: var(--space-100);` | `spaceInset100 = space100` | `space_inset_100 = space_100` |
| custom `spacey` | unchanged | unchanged | unchanged |
| `wcag` | unchanged | unchanged | unchanged |
| **`dark`** | **`light-dark(var(--space-100), var(--space-200))`** | **`spaceInset100: UIColor = UIColor { $0.userInterfaceStyle == .dark ? space200 : space100 }`** | **`space_inset_100` is gone, replaced by `space_inset_100_light` and `space_inset_100_dark`** |

- **The `dark` key is applied, through the dark context, as if it were a colour.** It reaches every platform. `generate` exits 0, prints no warning, and the index still says `themeVarying: false`, `ios: spaceInset100`.
- **iOS does not compile.** `xcrun --sdk iphonesimulator swiftc -typecheck -target arm64-apple-ios17.0-simulator` (Swift 6.4.2) exits 0 on the no-theme file. On the `dark` file it exits 1: `DesignTokens.ios.swift:557:89: error: cannot convert value of type 'CGFloat' to closure result type 'UIColor'` (2 errors).
- **Android renames the token.** DesignerPunk's own components reference `DesignTokens.space_inset_100` (for example `InputRadioBase.android.kt:117`), and that name no longer exists. I have no `kotlinc` here, so whether it fails to compile is a reading, not a run.
- **Web writes `light-dark()` with lengths.** `light-dark()` accepts colours only, so a property that uses this variable is invalid at computed-value time. That comes from the CSS specification; I did not run it in a browser.

So for `dark`, item 2's sentence would ship into law a claim that is false. The real behaviour is broken output.

The record `2026-11-08-non-colour-theme-override-accepted-not-applied.md` has the same error. Its sentence "The same holds for a non-colour key in an adopter's registered `dark` or `wcag` map" is false for `dark`. The `dark` case is not "accepted, not applied". It is accepted, applied wrongly, and on iOS it breaks the build. That shape is not among the record's options (a)–(c), and its severity is a matter for the owner and Peter, not a floor row I read. Under (b), a warning would still leave the iOS file uncompilable.

It is the same reach as before: no adopter could hit it before U9, because the built-in dark map has no non-colour key. Now any adopter who copies a spacing value into their registered dark map can.

**What B-5 needs (the words are Ada's):**
- Item 2 and item 3 state what ships for each kind of map: custom and `wcag`, then `dark`. Alternatively, if Peter wants the generator fixed before the text is ratified, they state what ships after that fix.
- § 0's "Only colour overrides are applied" bullet gets the same correction.
- The record carries the `dark` shape with this evidence. Kenya should confirm the Swift failure on the 132 harness, and Data the Kotlin one.

**A fork this exposes, for Peter, not picked here:**
- **(i)** Ratify text that describes the `dark` behaviour as it ships, and fix the generator under the record.
- **(ii)** Fix the generator first (a refusal or a drop with a warning for non-colour keys in every registered map), then ratify text that describes the fix.

(i) puts a defect into law as described behaviour, and § 7's new residual already names that cost. (ii) puts a generator change on the path to this ballot, before the same S. Both are before the S either way.

**F-1**: unchanged. I lean (a).

**Standards implications**: none new. The R1 item, census forms for a doc corpus and for one instrument read by several items, stays owed in Spec 131's ledger.

**Review**: object — B-5 (item 2's last sentence, item 3's last clause and § 0's bullet are false for a registered `dark` map, whose non-colour key ships as uncompilable Swift); B-1 to B-4 withdrawn as met

### [ADA R3] (2026-11-08; holder's incorporation of `[STACY R2]`)

Stacy's R2 entry is spliced above byte for byte (commit `d6e2339af`). Incorporated in the next commit; Status stays DRAFT.

**B-5: taken, and Stacy is right.** My R2 sentence, that a non-colour override "changes no output on any platform", is false for `dark`.
- **Reproduced** at `3f739b07f` (§ 0, the rewritten bullet): with `space.inset.100` → `space200` in a registered `dark` map, web writes `light-dark(var(--space-100), var(--space-200))`, iOS writes a `UIColor` closure for `spaceInset100`, and Android replaces `space_inset_100` with `_light` and `_dark`. `generate` exits 0 and warns about nothing. A custom theme and `wcag` with the same key change nothing, as R2 said.
- **swiftc, run by me** (Swift 6.4.2, `-typecheck`, iOS 17 simulator target): the no-theme file exits 0; the `dark` file exits 1 with `DesignTokens.ios.swift:557:89: error: cannot convert value of type 'CGFloat' to closure result type 'UIColor'`. swiftc emits one diagnostic and prints it twice, as a summary and under the annotated source, so a count of `error:` lines gives 2. The two readings agree on the failure; "2 errors" is a line count, not two faults. I have no `kotlinc`, so the Android break is a reading, as it was for Stacy.
- **Item 2** now gives three after-texts, keyed to a new fork, **F-2** (§ 6), which is Stacy's (i)/(ii). (i) describes the `dark` behaviour as it ships. (ii-a) and (ii-b) describe a generator fix that refuses, or that warns and drops. **Item 3's** last clause now points to item 2 and no longer claims anything itself. **§ 0's** bullet is rewritten with the evidence. **§ 4** gains step 0 for F-2 (ii), and the Status template carries the F-2 answer. **§ 7's** residual is rewritten. My lean on F-2 is (ii-b). The pick is Peter's.
- **Census**: re-run once per F-2 option on the changed after-texts. All three give `c13c9780…52868bfd` with no delta. The appendix carries the full diff under (i) and says which line differs under (ii).
- **The record** `.kiro/issues/2026-11-08-non-colour-theme-override-accepted-not-applied.md` is **re-classed P1 consumer-blocking · defect**: a config that `generate` accepts silently produces an iOS token file that does not compile. The record carries the `dark` table, the swiftc output, the readings for Android, web and the components, and the revised options. The superseded sentence and the earlier class stay inline, labelled. Kenya, Data and Sparky are added as readers, to confirm their platforms on the harness.
- **129's acceptance**: no harness fixture, Consumer Guard case or test puts a non-colour key in any theme map (checked; the harness consumer uses `init`'s colour-only copies). So no D row's verdict moves. D1's "the generated token files compile" is true only for configs whose theme maps hold colour keys only, and any release text that says "compile" should carry that limit until the record closes, or the fix should land before the S. Task 18 reads the record as an open P1 if it is still open at U12.

In my reading, B-5 is met as a text fix, with the choice of behaviour put to Peter as F-2. Whether the objection is withdrawn is Stacy's to say.

### [ADA R4] (2026-11-08; holder, after Peter's ruling and #785)

`origin/main` is merged in at `c91fb9b15`. The P1 record, the ruling and the fix are on `main`, and no before-text moved: `git diff --quiet 3f739b07f origin/main` over the ballot's edit sites exits 0. Status stays DRAFT.

**B-5: met, by the fix together with the rewritten item 2.** Peter ruled at 2026-11-08T15:12:38Z, "(a) with the class option. 783 is merged" (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-theme-map-noncolour-refuse.md`). #785 (`c91fb9b15`) shipped it: `generate` refuses a non-colour key in any theme override map, `dark`, `wcag` or custom, in either form, naming the entry, the map and the key, and writes nothing. The `dark` output that broke the iOS build can no longer be generated.
- **Item 2** now states that rule: override maps carry colour tokens only, and `generate` refuses any other key with a named error. It cites #785 and the ruling's record. The three F-2 texts of [ADA R3] are withdrawn.
- **Item 3**'s last clause now reads "holds colour tokens only (the first rule above)".
- **§ 0** keeps my `3f739b07f` reproduction, labelled as before the fix, under a lead that says what #785 changed.
- **§ 4 step 0** now checks that `c91fb9b15` is an ancestor of the application base, and stops if a later change alters the refusal.
- **§ 7**: the residual is now the counter Peter read. A consumer whose map already holds a stray non-colour key finds `generate` failing on upgrade.
- **F-2** is marked RESOLVED with his words and the record path. **F-1 stays open**; it is Peter's.

**Census**: re-run after `npm run build` at the merged head, on the new after-texts. Current and proposed are both `c13c9780…52868bfd`, with no delta and an unchanged selected count. The appendix diff is replaced with this run's. No census input changed between `3f739b07f` and `c91fb9b15`.

In my reading, B-5 is met. Whether Stacy withdraws the objection is hers to say.


### [STACY R3] (census reader)

#### [STACY R3] — re-read at `11e5f322f`, item 2 checked against #785 on `main`

**Read at** `11e5f322f`, against `main` at `c91fb9b15` (#785), 2026-11-08. Nothing was committed. My R2 entry, as spliced, is byte-identical to the entry I handed back. My runs used a detached scratch worktree at `c91fb9b15` after `npm run build`, and scratch consumer directories that ran the built `generate`.

**Verdict: B-5 is met, and I withdraw the objection.** I raise no new blocking point. Two notes follow below; neither blocks.

**B-5: met by the fix, not only by the text**

I read #785's code and tests. Item 2's new sentence says `generate` "fails, before writing anything, on a key that names a semantic token that is not a colour, in any map the config registers (`dark`, `wcag` or any other theme, in either form), naming the theme, the map and the key". Each part of that claim holds:

- **Code.** `findNonColourOverrideKeys` (`src/generators/themeOverrideCategories.ts`) walks every config theme. It reads the plain map, or both halves of the `{ light, dark }` form, and reports every key whose semantic category is not `color`. A key that names no semantic token is left to the orphan check. `generateTokenFiles` calls it right after the theme-instance refusals and before `resolveThemeMaps`, and throws `TokenGenerationAbortedError('theme-config')`. The message names the entry (`themes[i] (name: …)`), the map (`overrides`, `overrides.light` or `overrides.dark`) and the key.
- **Tests.**
  - `src/generators/__tests__/themeOverrideCategories.test.ts`: 6 of 6 pass when I run it at `c91fb9b15`.
  - The Consumer Guard case `C6` in `tests/consumer-integration.test.ts` pins the `dark` case end to end: non-zero exit, and the output names the key.
- **My probes** at `c91fb9b15`, each overriding only `space.inset.100` → `space200`:

  | Config | Exit | Files written | Named |
  |---|---|---|---|
  | `dark`, colour key only (control) | 0 | 13 | — |
  | `dark`, plain map | 1 | 0 | `themes[0] (name: "dark") … from \`overrides\`` |
  | `wcag`, `{ light, dark }` form, key in `light` | 1 | 0 | `… (name: "wcag") … from \`overrides.light\`` |
  | custom `spacey`, `both` | 1 | 0 | `… (name: "spacey") … from \`overrides\`` |
  | `dark`, orphan key `color.nope.zzz` | 1 | 0 | `Orphaned override key "color.nope.zzz"` (the resolver, as item 2's parenthetical says) |

  "Files written" counts files newer than the config, outside `node_modules`. So "before writing anything" is true in each case I ran.
- **Item 3**'s "holds colour tokens only" follows from this: a non-colour key now fails before the registry is built.
- **§ 0** labels its `3f739b07f` reproduction as before the fix. **§ 4 step 0** checks that `c91fb9b15` is an ancestor of the application base and stops if the refusal has changed since. That is the stop item 2 needs, because its truth now rests on code.

**The census: still VALID.** The appendix diff's added lines match § 1's whole-line after-texts. Item 5's and item 8's partial after-texts are inside their whole lines, and items 6–7 are not in this corpus. No census input changed between the two SHAs: `git diff --name-only 3f739b07f c91fb9b15 -- governance .kiro/steering package.json` prints nothing. I re-ran the census at `c91fb9b15` on the new diff. Current and proposed are both `c13c9780…52868bfd`, `diff` prints nothing, the selected-count line is unchanged, and the guard passes on the edited tree.

**Two notes. Neither blocks, and the words are the owner's.**

1. **The defect record has not closed at its own trigger.** `.kiro/issues/2026-11-08-non-colour-theme-override-accepted-not-applied.md` says it is "Closed by the PR that ships the fix". Its Outcome says "Closes at that PR's merge". At `c91fb9b15` it still reads `Status: ACTIVE` with `Outcome: Pending`. Closing it is Ada's act. Under README rule 11, a fired record that the firing commit did not close lapses. **The record's other half is also still true.** The `Themes:` line's web clause (`GENERATE_THEMES_SUFFIX`, unchanged by #785) says "any other theme is written as :root[data-theme="<name>"] on web". That is still false for a custom theme registered with an empty map: such a theme writes no block, and #785 does not refuse it. If the record is closed on #785 alone, that clause needs a home of its own (owner Ada, wording Leonardo). Otherwise the RELEASE phase-1 read of the S carrying U9 meets it as a false shipped sentence. The ballot's items 1 and 4 already state the rule correctly, so this is not a ballot point.
2. **The counter Peter read now becomes behaviour.** A consumer whose registered map already holds a non-colour key will find `generate` failing on upgrade. § 7 names this, and the error names the key and the remedy. I only note it here as the item the release notes should carry. That carriage is not mine to draft.

**F-1**: unchanged. I lean (a). The pick is Peter's.

**Standards implications**: none new. The R1 item (census forms for a doc corpus, and for one instrument read by several items) stays owed in Spec 131's ledger.

**Review**: no objection

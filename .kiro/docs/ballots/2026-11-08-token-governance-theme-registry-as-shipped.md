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
- **Every applied map is checked.** `SemanticOverrideResolver.validate()` and `validateAll()` fail `generate` on an orphaned key in the `dark` and `wcag` maps (L253–260, L294–300); `ThemeRegistry.register()`, with `setSemanticValidator` set at L215, rejects an unknown key in any other registered theme, and the throw becomes `TokenGenerationAbortedError('override-maps')` (L275–283). Unit-pinned in `src/themes/__tests__/ThemeRegistry.test.ts`; no `generate`-level test pins the custom-theme path (§ 10, residual 2).
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
> **A registered theme is applied.** `npx designerpunk generate` builds the theme registry from the config's `themes` and lists them on its `Themes:` line as registered and applied. A theme named `dark` or `wcag` replaces DesignerPunk's built-in override map for that context with the map the config imports. In local mode, a built-in map the config does not register (`dark`, `wcag` light or `wcag` dark) is still applied from the installed package, with a warning on every run that names the config line that would make it the product's own, until the next major release; in package mode the package's built-in maps apply. Every other registered theme adds output on each platform, as the last rule below says. `generate` refuses a theme name it cannot emit on every platform, naming the config entry. *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 1; prior text at `3f739b07f`.)*

*Why these words*: the old line's three claims are each false at `3f739b07f` (no output change; nothing checks; built-ins only). The new line says what `generate` does, and states the bridge because it changes what a product must do to own its dark and WCAG values: register them. It names no date for the bridge's retirement ("the next major release"), because the 17.0.0 plan is a charter, not a release.

### Item 2: `governance/Token-Governance.md` L259 (LAW)

**Before** (L259):
> - Theme overrides reference existing semantic tokens only — `ThemeRegistry.register()` rejects an override that names an unknown semantic token. The build registers DesignerPunk's built-in themes this way; a theme in `designerpunk.config.ts` is not registered with it yet, so its overrides are not checked today

**After**:
> - Theme overrides reference existing semantic tokens only. `generate` checks every override map it applies, built-in or registered, and fails, naming the key, on an override that names no semantic token (`ThemeRegistry.register()` rejects it for each theme the config registers beyond `dark` and `wcag`, and `SemanticOverrideResolver` for the `dark` and `wcag` maps) *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 2; prior text at `3f739b07f`.)*

### Item 3: `governance/Token-Governance.md` L261 (LAW)

**Before** (L261):
> - Theme-varying tokens are determined automatically: the registry computes the union of all overridden token names across the themes registered with it, and the iOS/Android generators add every token whose base light and dark values differ. The build registers DesignerPunk's built-in `dark` and `wcag` themes only, so today the union is over the built-in overrides

**After**:
> - Theme-varying tokens are determined automatically: the registry computes the union of all overridden token names across the themes registered with it, and the iOS/Android generators add every token whose base light and dark values differ. `generate` registers `dark`, `wcag` and every other theme the config registers, so the union covers each of them *(Amended <ratification date> by ballot 2026-11-08-token-governance-theme-registry-as-shipped, item 3; prior text at `3f739b07f`.)*

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
> - Cross-platform token output (CSS custom properties; Swift and Kotlin constants on `DesignTokens` for every primitive and every semantic but the colour semantics; the colour semantics as members of the generated Swift `DesignerPunkTheme` protocol and its structs, and of the Kotlin `DesignerPunkTheme` data class and its instances)

### Item 7: `canonical/agents/ada.md` L323, `#in-scope` item `scope-theme-output` (LAW; only under F-1 (a))

**Before** (L323):
> - Platform generator theme-aware output — CSS `data-theme` blocks (today one, `:root[data-theme="wcag"]`, which matches only `<html>`, so it applies page-wide), Swift `@Environment` and Kotlin `CompositionLocal` theme types, DTCG/Figma theme metadata. Output for themes registered in `designerpunk.config.ts`, the native theme types and the theme metadata are not emitted yet (Spec 129); whether a subtree can be themed is not decided yet

**After**:
> - Platform generator theme-aware output — CSS `data-theme` blocks (`:root[data-theme="wcag"]` and one for each other registered theme, each matching only `<html>`, so a theme applies page-wide), Swift `@Environment` and Kotlin `CompositionLocal` theme types with their `<Name>ThemeFamily` providers, DTCG/Figma theme metadata. The DTCG/Figma theme metadata is not emitted yet; whether a subtree can be themed is not decided yet

Charter lines carry no pointer (README § "Conventions"); the application commit's message names this ballot.

### Item 8: `governance/Token-Quick-Reference.md` L118, part (EXECUTION of this ballot)

The line's other sentences are true. **Before** (part of L118):
> register it in `designerpunk.config.ts`, which does not change the generated output yet (above).

**After** (the part, with the item's pointer appended at the line's end):
> register it in `designerpunk.config.ts`, and `generate` applies it (above).

The rest of L118's "Custom themes" passage (L114–116) was rewritten in U9 (Task 14 completion, criterion row "The served sentences …"); this clause was missed there.

### What the measure does not settle

- The "Known limitation" (L267), shadow theme-varying determination is direct, not transitive: not re-read here, unchanged.
- The code example (L246–256): unchanged. It registers a dark-only theme, which now shows the base in the light scheme (the single-mode rule); item 5 says so.
- Q3b (subtree theming) and the bridge's retirement at 17.0.0: each is a later edit to items 1 and 4 when it is ruled or ships.
- Design § 4 calls native emission provisional until Spec 132's D4 app builds. These lines state what ships, not that it is final.

## 2. Census (README § "Conventions", "Instrument census")

One line per instrument, as in the 2026-11-05 Core Goals ballot § 4 (the README's "exactly one line" per item does not address one instrument read by several items; I read it as one line per instrument and name the reading here).

- `**Census**: npx tsx scripts/governance-examples/check.ts --census over governance/*.md and the eight packaged steering docs @ 3f739b07f — current c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd → proposed c13c9780ba78265c40aed99293a5d4e72fdb710438509053637a164d52868bfd; 0 docs change (delta: § Census appendix)` — items 1–5 and 8 edit two files the guard loads (condition 1). This item changes the instrument's inputs, not its code, so "proposed" is the census run with items 1–5 and 8 applied to the tree at `3f739b07f` (a corpus diff, not the README's code diff; I name the deviation so the reader can rule on it). `Token-Governance.md` stays `65:0:2` and `Token-Quick-Reference.md` unchanged. Run after `npm run build` (the guard's import surface needs `dist/`).
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no item renames a heading or adds or removes a get_section or get_document_* citation; § "Theme Registry (Spec 094)" keeps its heading`
- `**Census**: not in scope — 122-diff-guard with the operative-set freshness sweep (tools/agent-generator/diff-guard.ts) — no instrument code change. Items 1–5 change the ambient token-governance embed in Ada's generated charters, which regeneration moves with canonical/generated.lock (§ 4 step 6); under F-1 (a), between the authoring commit and Ada's acts the sweep reports ada #in-scope stale, then unsigned, which are the owed acts of § 3, not a change of verdict`
- `**Census**: not in scope — verify-signing-chain --ci (row signing-act-consistency) — no instrument code change; under F-1 (a) the § 3 commits are its inputs at application, checked by links 1–3 as written; without F-1 (a) no signed unit changes (Token-Governance has no operative set)`

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

**Grants.** None of these files is in my write scope. Whether Thurgood's standing scope reaches them is his to state in his form review; where it does not, Peter's ratification names the files, or a grant record does before the application PR: `governance/Token-Governance.md`, `governance/Token-Quick-Reference.md`; under F-1 (a) also `canonical/agents/ada.md` L318 and L323 byte for byte, `canonical/operative-sets/ada.yaml`, `canonical/profiles/consumer/ada.overlay.md`; and `canonical/generated.lock` with the generated roots. My confirmation and signature sections are my own acts.

## 4. Application (on ratification; one PR, Peter-merged)

1. **The Status commit** (record-first), before any edit: `**Status**: **RATIFIED (Peter, <date>)** — <F-1 answer>`, his words quoted with their `date -u` receipt time, `<ratification date>` filled in every pointer, the README roll entry added, and a § 9 "Resolved after-texts" appended (each site's after-text as it will be applied), so the claims pass compares the application diff with § 9 byte for byte.
2. Branch `chore/token-governance-theme-registry-as-shipped` from `main`. Stop on any before-text that does not match: `git diff --quiet 3f739b07f <base> -- governance/Token-Governance.md governance/Token-Quick-Reference.md` (and, under F-1 (a), `canonical/agents/ada.md canonical/operative-sets/ada.yaml canonical/profiles/consumer/ada.overlay.md canonical/profiles/consumer/ada.dispositions.yaml`). A mismatch stops that item and is reported, never adapted.
3. PR body: `**Edit kind**: governance/Token-Governance.md — LAW (.kiro/docs/ballots/2026-11-08-token-governance-theme-registry-as-shipped.md)`; `**Edit kind**: governance/Token-Quick-Reference.md — EXECUTION (ballot 2026-11-08-token-governance-theme-registry-as-shipped item 8)`; under F-1 (a), `**Edit kind**: canonical/agents/ada.md — LAW (.kiro/docs/ballots/2026-11-08-token-governance-theme-registry-as-shipped.md)`; `**Consulted**: Ada — the text is hers`; `Spec: 129-consumer-generation-completeness` and `Task: Req 15.6 (tasks.md L246)`.
4. **Authoring commit** (Thurgood): items 1–5 and 8; under F-1 (a), items 6 and 7. Under F-1 (a), run `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci` and `npm run -s check:122:diff-guard` on it before briefing Ada: no `canonicalHash` moves.
5. **Profile-author commit** (Thurgood; only under F-1 (a)): the two item re-quotes and the overlay re-render and pin, as § 3.
6. **Regeneration**: `npm run build:generator`; commit the generated roots (`.claude/agents/ada.md`, `.kiro/agents/ada-prompt.md`, `canonical/_consumer-output/**`). Under F-1 (a), run the generator once after step 4 and once after step 5; the roots must be byte-identical, or stop and report before any seat act.
7. **Seat acts** (only under F-1 (a)): Ada re-confirms and re-signs `#in-scope`, each its own commit, never an amend.
8. **Lock refresh and checks**: a second `npm run build:generator`, outputs byte-identical, commit `canonical/generated.lock` only. Then `npm run -s check:122:diff-guard`; `npm run -s check:section-citations`; `npm run build` and the governance-examples census, compared with § 2's digest (a difference stops the PR); `npm run test:scripts`; `npm test`. Under F-1 (a), before Peter merges: `verify-signing-chain --audit --pr <n>`.
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

Served siblings already true at `3f739b07f` (rewritten in U9): `governance/Rosetta-System-Architecture.md` L538–574, `governance/Token-Quick-Reference.md` L114–116, the Integration Guide.

## 6. Forks for Peter (none is picked here for him)

### F-1. Do Ada's two stale charter lines ride this ballot?

`canonical/agents/ada.md` L318 and L323 (my `#in-scope` unit) say the native theme types and registered-theme output are "not emitted yet". Both went false at U6 and U9. Sparky's line was corrected in U9 and Kenya's and Data's in U11 (Task 16); mine was missed. Req 15.6 names only Token-Governance.

- **(a) Yes, items 6 and 7.** One application PR with one re-confirm and re-sign of `#in-scope` by me, and Thurgood's authoring and profile acts (§ 3). Every Ada charter, ours and the consumer's, is true in the release. **Residual**: a one-PR Req 15.6 edit becomes a signed-unit change; it widens what Peter ratifies beyond the requirement, and the extra acts (authoring, profile, regeneration twice, my two seat acts, lock refresh) sit on the release's critical path.
- **(b) No; a separate ballot later.** This ballot stays the size Req 15.6 asked for. **Residual**: a charter edit is LAW either way, so (b) is a second ballot with the same acts, later; if it misses the S, the release ships a consumer Ada that tells adopters theme output is not emitted while their own `generate` prints "registered and applied", which is the class of false shipped text Req 15 exists to stop.

**My lean: (a)**, because (b) costs the same acts later and risks a false line in the release. What survives of (b): it keeps Peter's ruling to exactly what the requirement named. The pick is Peter's.

## 7. Counter-argument (fold-back applied first), and what survives

**I recommend** items 1–5 and 8 as drafted, and F-1 (a).

**Counter-arguments I ran against my draft, and what they changed:**
1. *"This is a CORRECTION; the generator is the referent, so no ballot is needed."* Not taken: Req 15.6 names a ballot, and item 2 changes what governance tells a reader is checked. The README's tie-break is LAW. Item 8, which only describes, is carried as EXECUTION so it needs no separate PR.
2. *"Governance restating emitter detail duplicates design § 4 and will drift."* Folded in: the native line names the shape (four fixed instances, one per covered mode, family cases, the fallback) and one example, and leaves out the refusal list, the reserved-word list, the implicit members and the bridge warning's wording, which live in design § 4 and § 10 and the Integration Guide.
3. *"The web line says `wcag` is always written."* Folded in after a code read: `maybeGenerateWcagBlock` writes nothing when the maps override no colour token (the opt-out), so item 4 says when no block is written. Sparky's charter line says "`wcag` is always generated"; that is his to re-read, and I flag it to him (§ 8).

**What survives:**
- **Five homes.** The same facts now live in design §§ 4 and 10, Token-Governance, Token-Quick-Reference, Rosetta-System-Architecture and the Integration Guide, plus three charters. Each later generator change (the bridge's retirement at 17.0.0, a Q3b ruling, DTCG theme metadata) owes edits in all of them. Item 1's "until the next major release" is designed to go false at 17.0.0, and this section then owes another edit.
- **Item 2 rests on a code read.** No `generate`-level test pins "a registered custom theme with an unknown key fails `generate`"; `ThemeRegistry.test.ts` pins the unit. If someone moves the `register()` call out of its `try`, or drops `setSemanticValidator`, the sentence goes false with every test green. I can add the test in my `src/generators/**` PR (§ 5's last row); it is not a precondition here.
- **Provisional native design.** Design § 4 says native emission is provisional until Spec 132's D4 app builds. Item 5 states as current what 132 may change, and then owes another edit.
- **Cost.** Ratification, a Status commit and an application PR, with regeneration, and under F-1 (a) a re-sign, for text a CORRECTION could mostly have carried. The ballot buys Peter's sight of item 2's new claim and the charter change; for items 1, 3, 4 and 5, the value is that Req 15.6 asked for it.

## 8. Notes for other seats (no act is asked of them by this ballot)

- **Sparky**: `canonical/operative-sets/sparky.yaml` L89–90 say "`wcag` is always generated". With the opt-out (`overrides: { light: {}, dark: {} }`) no `wcag` block is written (`TokenFileGenerator.ts` L1520–1532, L970). Yours to re-read.

## Census appendix

**Scratch diff** (corpus, not code; § 2): items 1–5 and 8 applied to `governance/Token-Governance.md` L242, L259, L261, L264, L265 and `governance/Token-Quick-Reference.md` L118 at `3f739b07f`, exactly as § 1 gives them. **Delta**: none; `diff` of the two census outputs prints nothing. Selected count, both runs: `selected: 1968 (1949 token-name candidates, 4 declared paths, 1 token-file shapes, 14 import lines) over 91 docs; predicate v1, file-shape rule v1`.

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

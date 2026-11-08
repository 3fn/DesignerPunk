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

*(Reviewers' entries go here in the Spec-Feedback-Protocol stamp format.)*

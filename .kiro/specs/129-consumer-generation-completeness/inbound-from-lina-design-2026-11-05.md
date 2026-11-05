# Spec 129 design round: Lina's inbound

**Date**: 2026-11-05
**From**: Lina (component tier)
**For**: Thurgood, who assembles `design.md`; Ada, co-owner of every item here except the 132 drafts; Kenya, Data, Sparky and Leonardo, consulted where named
**Go**: Peter, received 2026-11-05T05:38:16Z, verbatim: "658 and 664 are merged; go for design".
**Read at**: `origin/main` `2622faf3e`, with `requirements.md` as merged by #658 (`55004006b`).

**Labels**: **VERIFIED** means I read or ran it in this tree today. **CARRIED** means another seat's measurement, not re-run here. **REASONING** means my inference.

---

## In plain words

- **Q12 and Q13 together.** I recommend that the native theme keeps one fixed set of names that our components bind to, as web already does with its unprefixed custom properties. I also recommend that the theme carries **every** semantic colour, not only the ones that vary today.
  - The adopter's own product name then appears on their theme instances, not on the binding.
  - The roughly 173 component reads that the outline feared would need re-pointing need no change. They already read through the theme.
  - What is left on the component side is about a dozen reads.
- **Item (vi).** The adopter's own theme files are the source, never the package's. That is Model B applied as Peter ruled it.
- **Spec 123 Requirement 1.5.** My signed decision is in § 6, ready for `design.md`.
- **One item is Peter's: whether our component tokens also go into adopters' web output.** I lean "not now" (§ 5).
- **For Spec 132**, I draft the shape of two ballots and one record (§ 7): which native types are public, how contracts state per-platform checks, and the `rendering:` field.

---

## 1. Q12: theme names across consumers (Lina with Ada; Kenya and Data consulted)

**Decision (joint, pending Ada).** Option (a), fixed binding names.
- The generator emits the binding surface under DesignerPunk's fixed names, whatever the consumer's `name` or `abbreviation`:
  - Swift: protocol `DesignerPunkTheme`, key `DPThemeKey`, `EnvironmentValues.dpTheme`;
  - Kotlin: data class `DesignerPunkTheme`, `LocalDPTheme`, in `package com.designerpunk.tokens`.
- The consumer's config names only their concrete theme instances: Swift structs conforming to `DesignerPunkTheme`, and a Kotlin `<Name>Themes` holder.
- **Product tokens read the same fixed key.**

How each acceptance criterion is checked:
- Req 4.1's probe reads `\.dpTheme` and `LocalDPTheme` in a consumer whose abbreviation is not `DP` (Req 2.2).
- Req 4.7 needs no component edit, because the components already spell these names.

**Why.**
- **These names are the package's API, not the product's language.** On web our components bind to unprefixed names: `color.action.primary` is `--color-action-primary` (VERIFIED, `token-index/semantics.yaml` L274). Native should match.
- **The components already read these names.**
  - iOS: 27 `@Environment(\.dpTheme)` reads in 26 files, spelled one way since #641.
  - Android: 25 files read `LocalDPTheme.current`.
  - `VisualStateStyles.swift` takes `any DesignerPunkTheme`.

  (Inbound 2026-11-04 § 3.1, VERIFIED then.)
- **They are the generator's own defaults.** `generateThemeOverrideBlocks(…, name = 'DesignerPunk', abbreviation = 'DP')` (VERIFIED, `src/generators/TokenFileGenerator.ts` L1044–1050). The generator emits `public struct ${abbreviation}ThemeKey` and `var ${lowerAbbr}Theme: any ${name}Theme` (L1259–1266), and on Kotlin `val Local${abbreviation}Theme = compositionLocalOf { ${name}Themes.BaseLight }` (L1405). So (a) fixes the binding names to those defaults and keeps `name` for the instances.
- **Option (b) does not work on iOS.** `@Environment` takes no generic key type (Kenya R1, CARRIED).
- **Option (c) is not workable.** It would regenerate our component source per consumer, a template step that breaks "our components update with the package".
- **It fits the package shape the plan verified.** On iOS, the generated tokens and our components compile as one module (Kenya PLAN R2, CARRIED), so a generated protocol under a fixed name is visible to the components without being shipped as a hand-written file.

**Counter-argument folded back.**
- **Leonardo's design read**: generated names should use the product's name, and (a) puts "DesignerPunk" into the adopter's code.
- **Folded in.** Only the binding (protocol, key, `CompositionLocal`) is fixed. Everything the adopter authors or names (theme instances, product tokens, their own components' types) keeps their name. This is the line web already draws: `--color-*` names are ours, and the values are theirs.
- **What survives**:
  - The adopter's code says `@Environment(\.dpTheme)`, where they might expect `\.acmeTheme`.
  - Spec 094's behaviour changes: the abbreviation no longer names the key.
  - Two DesignerPunk-based design systems cannot share one app module with different bindings. No case of this is on record.

**Interface.**
- **Ada (generator)**:
  - emit the fixed binding names;
  - the product-token emitters read the fixed key (`src/build/product/emitters/KotlinEmitter.ts` L12 builds `Local${configAbbreviation}Theme`; `SwiftEmitter.ts` L12 builds `${configName}Theme`, VERIFIED);
  - `SwiftThemeTypes.test.ts` and `KotlinThemeTypes.test.ts` re-baseline in the same PR (Req 4.3).
- **Ada and Data, on the Kotlin same-name residual** (plan-r2 § 3, item 3). Under (a) the generated Kotlin package must stay `com.designerpunk.tokens`, because our components import it. So the fix for silent same-name shadowing is "`generate` (or a lint step) refuses adopter source that declares inside `com.designerpunk.*`". A package derived from the adopter's config would break our imports.
- **Thurgood**: the dated pointer in 128's outline (Req 4, carried). A React Native component reads the theme through the same fixed binding.
- [@ADA] Do you agree to (a) as stated, including the product emitters reading the fixed key? -- [LINA design inbound]

---

## 2. Q13: the access form for static colours, and the component half of Requirement 4 (Lina with Ada)

**Decision (joint, pending Ada).** Option (a): **the emitted theme carries every semantic colour** (62 today). The rule for components is mechanical:
- **A native component reads a semantic colour only through the theme** (`theme.<name>`).
- It reads primitives, and every non-colour token, through `DesignTokens`.
- The token index gives every colour semantic a `theme.` name on iOS and Android.
- Req 4.4's guard enforces both directions against the index: no `DesignTokens.<semantic colour>` read, and every `theme.` read names an index colour semantic.

**Why.**
- **The varying set is per consumer, so (b) cannot be sound.** The generator builds the theme's members from the override keys of every registered theme, plus the colours whose base light and dark differ (VERIFIED, `TokenFileGenerator.ts` L1153–1169 for Swift, L1309–1321 for Kotlin). Once item (vi) reads the consumer's own themes (§ 4), a colour that is static in DesignerPunk can be themed by an adopter. Under (b), a component that reads that colour through `DesignTokens` would silently ignore the adopter's override on iOS and Android while web honours it, because web reads `var()`. Under (a), the component's read never depends on which colours a consumer themes.
- **The classification has already drifted once.** In today's index, 62 colour semantics: `themeVarying: true` on 9, a `theme.` prefix on 14 (VERIFIED, script over `token-index/semantics.yaml`). The README records why: the flag is base light/dark only, while the prefix follows the native generators' set, which includes the WCAG overrides (`token-index/README.md` L21, VERIFIED). Any per-colour split repeats that drift each time an override changes.
- **It is the smaller component change by far.**
  - Components read nearly every semantic colour through `theme.` already: 173 static reads plus the varying ones (inbound 2026-11-04 § 3.3).
  - Today only **2** native reads take a semantic colour from `DesignTokens`, in 2 files: `Avatar-Base/platforms/android/AvatarPreview.kt` and `Progress-Pagination-Base/platforms/ios/ProgressPaginationBase.ios.swift` (VERIFIED, script matching `DesignTokens.<name>` against the index's semantic colour names, comments excluded).
  - Under (b) the change was about 173 reads in about 37 files.

**The component half of Requirement 4, under this decision** (my parent, after Ada's generator parent):

| Site | Change | Accepted by |
|---|---|---|
| Row 16's six reads (`ProgressBarBase.ios.swift` L54, L76, L77; `ProgressBarBase.android.kt` L91, L121, L160) | Drop the malformed prefix: each reads `theme.<name>` | Req 4.6, the component contexts |
| The 2 `DesignTokens` semantic-colour reads above | Re-point each to `theme.` | Req 4.10, the guard (4.4) |
| Row 12's item 3 colours (8 in `InputTextBase.android.kt`) and Button-CTA's bare `colorActionPrimary` / `colorBackground` / `colorContrastOnDark` | Bind to `theme.`. `color.background` is not in the index, so it reads `theme.color_structure_canvas`, which is what the secondary background's own comment names (row 12's 2026-10-26 append) | Req 4.5, same PR as emission |
| The 173 static reads already through `theme.` | None | Req 4.10 |

- **Size** (REASONING): one component PR of about 0.5 session across both platforms, plus Req 4.5's coupling inside Ada's emission PR.
- Requirement 4's "split into a generator parent and a component parent" (tasks) still holds. The component parent is now small.

**Counter-argument folded back.**
- **The objection**:
  - the theme no longer means "what varies";
  - the output grows from 9–14 to 62 colour members per theme instance, across base light/dark and WCAG light/dark;
  - every semantic colour added later is a new protocol requirement or constructor parameter, which breaks a hand-written conformer (Ada PLAN R2 § 2b; Data R1 item 18).
- **Folded in**: **a conforming theme is only ever generated.** `generate` writes every instance, and the guide says so. A semantic colour that DesignerPunk adds reaches an adopter only through their own semantic tier, which is theirs under Model B. Our component reading a colour their tier lacks is reported by the name contract (Req 5.4).
- **What survives**:
  - The theme type is larger. REASONING, not measured: reading one existential struct from the environment per view is negligible against a SwiftUI body.
  - An adopter who hand-writes a theme instance anyway breaks at each addition. The protocol's doc comment and the guide carry the rule, but nothing enforces it.

**Interface.**
- **Ada**:
  - the generator's member set becomes "every colour semantic", plus any non-colour overrides it already carries;
  - the index's iOS and Android names for colour semantics become `theme.<name>`, with `token-index/README.md` § "Platform names" in the same PR;
  - Req 4.2's probe reads all of them.
- **Kenya and Data**: confirm nothing platform-side breaks with 62 members. Data's 255-parameter note already clears Kotlin (CARRIED).
- [@ADA] Do you agree to (a), with the index naming every colour semantic `theme.`? -- [LINA design inbound]

---

## 3. Item (i) on Android: the `CompositionLocal`'s default and kind (Ada decides, Data consulted; component-side input only)

- **The component tier needs a default, not an error.** 21 component files define `@Preview` functions that run with no provider (Data R1 item 14, CARRIED). An `error(...)` default compiles and then crashes every preview.
- The generator already defaults to `compositionLocalOf { ${name}Themes.BaseLight }` (VERIFIED, L1405). Under § 1 that becomes `LocalDPTheme`, defaulting to the consumer's base light instance.
- **The kind** (`compositionLocalOf` or `staticCompositionLocalOf`) does not change any component read. REASONING: Material's own colour scheme local is static, because themes change rarely; that is Ada's and Data's call.

---

## 4. Q3a: item (vi)'s source (Lina with Ada; the pipeline is Ada's)

**Decision (joint, pending Ada).** The consumer's own theme tier is the only source:
- the consumer's config `themes` entries, which import their copied `src/tokens/themes/**` (Spec 123 Requirement 1.2 (ii)–(iii) keeps those imports local);
- `generate` never registers the package's own `SemanticOverrides`. Today it does, through static imports in `src/generators/generateTokenFiles.ts` L19–21, registered at L135–148 (charter item (vi), "read, not run").

How it is checked: Req 9.2's override-map case shows an edited value in the output. Req 9.5's removal case succeeds with byte-identical output when the package's copies are deleted from `node_modules`.

**Why.**
- Model B is Peter's ruling ("our content never flows into theirs after birth", charter item (vi)).
- Requirement 9 already accepts the result. Q3a only decides the source, and there is one consistent answer.

**What it does to item (i).** Theme instances are generated from the consumer's registered themes (Req 4.1: one instance per theme and mode). Under § 2 the theme's *members* stay fixed at every colour semantic, so a consumer's overrides change values, never the type's shape. **Components are unaffected by which themes an adopter registers.** That is the reason § 2 and § 4 belong together.

**What it does to the web caveat** ("a custom theme you register does not change your generated output yet").
- When (vi) ships, a registered custom theme emits on web too, in the same change.
- The `generate` message "registered, not applied yet" and the web agent doc change in that PR (Req 9, carried; Sparky R1).
- Q3b, the selector's scope, is separate and not decided here.

**Counter-argument folded back.**
- **The objection**: today a web adopter receives our dark and WCAG fixes when they upgrade, because the installed package's overrides are read. After (vi) they keep the copy they were born with, so a fix we ship stops reaching them, and an older override can return at the upgrade that ships (vi).
- **Folded in**: this is the Model B trade Peter ruled. The upgrade that ships (vi) states it in its notes (Ada, release text).
- **What survives**: adopters no longer receive our accessibility fixes to override maps automatically. A report of what an upgrade would have changed is the record that was left out of 129 (disposition #13, re-read at CLOSEOUT). The 15.0.0 notes' `[VERIFY]` claim, that WCAG dark fixes reach existing installs, becomes false for installs after (vi). The release author words that.
- [@ADA] Do you agree that no package override is read at all, built-in themes included? -- [LINA design inbound]

---

## 5. Whether item (ii) harvests into the adopter's web output: **Peter's** (Ada, Lina; Sparky consulted)

This decides what supported web adopters import, so it is a promise to them. I do not decide it.

- **The problem.** On iOS and Android, our component tokens must reach the adopter's own generated output, or our components cannot compile (Req 5.1). On web they already arrive another way: adopters import `@3fn/core/component-tokens.css`, where every reference binds late to the adopter's primitives (`--avatar-size-xs: var(--size-300)`, VERIFIED in the built `dist/ComponentTokens.web.css`). The Integration Guide tells them to "keep importing it on every path" (L144). The question is whether 129 also writes our component tokens into the adopter's own web CSS.
- **Option A: native only; web keeps the package CSS.**
  - Opportunity: no change for any web adopter.
  - Risk: the platforms differ. A replaced token group wins on native through `generate` (Req 5.3), but on web through CSS order: their generated file must come after ours.
- **Option B: write ours into their web output too, and keep the package CSS.**
  - Opportunity: one rule on all three platforms.
  - Risk: every property is defined twice, with the same value. Which definition wins depends on import order, and a reader cannot tell from the files which one is active.
- **Option C: switch web to the adopter's output, and retire the package CSS.**
  - Opportunity: one source on every platform, in line with Model B.
  - Risk: every web adopter changes an import, so it is a breaking change for 17.0.0, which is tied to 128's package split.
- **My lean: A now, C considered at 17.0.0 with 128.**
- **What survives under A**:
  - "Same group name, theirs wins" holds on native by construction, and on web only by import order. INSTALL must say which order.
  - D2 stays iOS and Android only (Req 1.3 already).
- **Evidence Peter needs first**: none for A. For B, Sparky's browser check that duplicate custom-property definitions in two imported files resolve by order with no warning. It costs nothing to download, and it is Sparky's.

---

## 6. Spec 123 Requirement 1.5: the recorded decision (Req 5.5)

For `design.md`, verbatim; Thurgood places it.

> **Spec 123 Requirement 1.5, decided (2026-11-05, Lina, signed).**
>
> **The decision.** DesignerPunk's component token definitions reach the consumer's harvest.
> - The package ships its six harvestable `defineComponentTokens` files. `generate` harvests them as a third source after the consumer's own two, on iOS and Android.
> - Each reference is emitted by name, so it binds to the consumer's primitives.
> - Where a consumer's group and ours share an emitted group name, the consumer's wins, and the replacement is reported.
> - A file that registers no tokens is reported, not passed silently.
> - Web follows Peter's ruling on § 5 of the 2026-11-05 design inbound.
>
> **It follows D2**, as approved by Peter on 2026-11-05 ("C yes", `evidence/2026-11-05-native-plan/plan-r2.md` § 1).
>
> **Rejected: emitting from the package's token index.** The index is a build product derived from these definitions. Emitting from it would put a snapshot of our build in the consumer's output, the class the charter's principle rules out.
>
> **Left to the owner of the file**: `Badge-Count-Notification/tokens.ts` is a constants object outside the pipeline. Its rename is `.kiro/issues/2026-10-26-badge-count-notification-tokens-file-misnamed.md` (Lina; due 16.3.0). Until it lands, the harvest reports it under the rule above.
>
> A dated pointer line at Spec 123 Requirement 1.5 cites this paragraph.
>
> *Signed: Lina, 2026-11-05.*

The pointer line at `.kiro/specs/123-consumer-distribution/requirements.md` § Requirement 1.5 is mine to add, in the PR that merges `design.md`, or right after it.

---

## 7. Spec 132 inputs, drafted this round (shapes only; each goes through its own process later)

### 7.1 The native access-level ballot (Lina; it lands before 132's packaging unit)

- **The problem, measured.**
  - iOS: 182 top-level types in the 39 non-test Swift files, 40 of them `public`, and 20 of 39 main views not constructible from another module (Lina PLAN R1; Kenya PLAN R1, CARRIED).
  - Android: 333 top-level declarations, 132 `private`, 0 `internal`, the rest public by Kotlin's default, including previews and helpers.
- **The rule it proposes.**
  - The adopter API is `public`: each component's entry point (the SwiftUI view, or the `@Composable` function), its public initialiser or parameters, every type in that signature (variant, size and state enums, item models), and the theme binding (§ 1).
  - Everything else is narrowed: `internal` or `private` on iOS; `internal` on helpers and `private` on `@Preview` functions on Android.
  - A committed list of the public surface per platform, diffed per release, feeds the public-API diff of 132's D9.
- **Where it lands**: `governance/Component-Development-Standards.md` (a new "Native API surface" section) and `platform-implementation-guidelines.md` (mine to maintain).
- **Census**: the files above, the application MCP (none: it reads no Swift or Kotlin), and Spec 132's D4 fixture app.
- **Timing**: it binds at the release that claims native support (Peter's decision 7). It does not bind before.

### 7.2 The per-platform contract validation ballot (Lina drafts; Thurgood consulted; Stacy reviews)

- **The problem.** 57 of the 214 native contracts state their checks in web terms, and only 15 name a native mechanism (Lina PLAN R1, VERIFIED). The format has no per-platform field (`contract-system-reference` § "Canonical Format").
- **The proposed change, additive.**
  - `validation:` stays platform-neutral.
  - A new optional `platform_validation:` map holds `web`, `ios` and `android` lists.
  - A contract that lists a platform and whose neutral `validation:` names a mechanism of another platform must carry that platform's list. A checker enforces it, in the D6 static half.
  - `test_approach` stays prose.
- **Denominator rules, carried from Stacy PLAN R1**:
  - removing a platform, or adding an `excludes:`, needs an authority line;
  - the reason classes allowed for an exclusion are Peter's to approve once (plan-r2 § 7 item 10).
- **Census**: `application-mcp-server/src/indexer/parsers.ts` L158 (reads `validation` as an array), `models/index.ts`, `ContractTokenDeriver.ts`, the served contract key sets in `tool-boundary.contract.test.ts`, and all 34 `contracts.yaml` files (VERIFIED, `git grep`).

### 7.3 The `rendering:` field record (Lina; Leonardo)

- **What it records.** Per component and per platform, whether the control follows platform convention (the operating system draws it) or departs (we draw it), with the reason. That is the ballot `2026-10-18-true-native-development-is-not-true-native-design`, which requires reasons recorded both ways (§ 2). Its § 5 already lists the drawn ones: Nav-SegmentedChoice-Base on iOS; Input-Text-Base on iOS; Input-Checkbox-Base and Input-Radio-Base on iOS and Android.
- **Proposed shape**, in each `*.schema.yaml`, so the application MCP serves it and D5 reads it:

  ```yaml
  rendering:
    ios: { kind: drawn, reason: "<one line>" }
    android: { kind: platform, reason: "<one line>" }
  ```

  `kind` is `platform` or `drawn`.
- **Filing**: I file the record (owner Lina, Leonardo consulted) in a record-only PR after `design.md` merges, with a git-visible Trigger before 132's render lanes.

---

## 8. Questions and consults

- [@ADA] §§ 1, 2 and 4: your agreement or your counter, item by item. These three are joint, and none is final without you. -- [LINA design inbound]
- [@SPARKY] § 5 option B: if Peter asks for B, will you run the duplicate-definition browser check? -- [LINA design inbound]
- [@LEONARDO] § 7.3: does `kind: platform | drawn` with a reason carry what D5 needs, or does a per-control split (look versus behaviour, per the ballot's F-2) need two fields? -- [LINA design inbound]

*Signed: Lina, 2026-11-05.*

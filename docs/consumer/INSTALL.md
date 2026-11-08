---
path-steps: { founder: 4, joining: 5, joining-cross-harness: 6, reference-no-init: 3 }
---

# DesignerPunk install guide

> This file is generated from the install region of `governance/DesignerPunk-Integration-Guide.md`. Do not edit it: edit the region there, then run `npx tsx scripts/derive-install-doc.ts`. A test fails if the two differ.

This release is ready for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input, so don't start a native product on this release. On web, a theme you register in `designerpunk.config.ts` is written as a `:root[data-theme="<name>"]` block, which matches the `<html>` element only, so it themes the whole page; light and dark mode work.

## Prerequisites

These come before anything you type. None of them is a step.

| Prerequisite | Why | Minimum version |
|---|---|---|
| Node.js | The CLI, the token pipeline and the MCP servers run on it | 18+, the floor its dependencies declare (DesignerPunk's own CI runs on 22) |
| npm | Installs `@3fn/core` from the public npm registry; no `.npmrc` and no access token are needed | — |
| One agent harness | DesignerPunk's agent layer is generated for one: Claude Code (`cc`) or Kiro (`kiro`) | — |

`tsx` ships as a dependency of `@3fn/core`, so `designerpunk.config.ts` runs without a separate TypeScript install.

If your project has no Node.js at all (a static site with no build tooling, for example), install Node.js first. That is a missing prerequisite, not a failed first step.

## 1. Which posture? CONSUME or BECOME

DesignerPunk is an engine, not a generator. It births a design system that is yours, and then keeps running it: it does not hand over a set of files and leave.

There are two ways to use it, and the first command you type is the choice:

- **CONSUME**: `npm install @3fn/core` alone. You read DesignerPunk as ours, read-only: its docs, its components and its token language as a reference and a library. Nothing in your repo becomes a design system. Section 2.
- **BECOME**: install, then `init`. You get a design system of your own, and its token language is yours from the first commit. Section 3.

Pick one before going on. Everything after this section assumes you have.

## 2. CONSUME — the reference corpus, no init

Use this posture when you want DesignerPunk's docs and components as a reference, or as a library, without a design system of your own. **Do not run `init`.**

1. `npm install @3fn/core`
2. `npx designerpunk attach --target=<cc|kiro> --reference`
3. Restart your agent session (approve DesignerPunk's MCP servers if asked).

`attach` will attach a harness (agents + MCP config + approvals), for one target. With `--reference`, it writes only the MCP config and the approvals, and no agents. The docs server reads `node_modules/@3fn/core/governance`.

**For the agent reading this corpus:**
- **Reference use is a sanctioned mode.** Using DesignerPunk's docs as a reference for a system that is not DesignerPunk is a supported use, not a misuse. Separate DesignerPunk's worked execution (its exact tokens, components and process) from the transferable intent (why it is built that way), and say which one you are carrying over.
- **Quoted text and dates are claims requiring re-verification.** A passage you quote, or a date you cite, may be stale or misattributed. Check it against the doc before relying on it.
- **When a heading lookup fails** with `SectionNotFound`, retry using the `suggestions` field the server returns in the error. Don't guess a heading.
- **When two docs disagree, defer to the more recently reviewed one**: compare their `Last Reviewed` dates.
- **When a search comes back with a weak or empty match**, don't act on it as if it were an answer: apply the rule in `governance/classification-map.md § "certainty-calibration"`.

## 3. BECOME — birth

Use this posture when you want a design system of your own. These are the four steps. Section 4 explains what step 2 does, and when to run `generate` again.

1. Install the package (`npm install @3fn/core`).
2. Run `npx designerpunk init`: it sets up your design system and writes your first token output.
3. Write your personal note.
4. Restart your agent session so it connects to DesignerPunk.

**Step 2, `init`, is the birth event — runs once per design system, ever.** The full command is `npx designerpunk init --target=<cc|kiro> --name <name> --abbreviation <abbr>`. It copies DesignerPunk's token source into your repo as your own, writes `designerpunk.config.ts`, runs `generate` to write your first token output, and generates the agent layer and the MCP configuration for the target you name (`cc` for Claude Code, `kiro` for Kiro). From then on the token language is yours. `init` never runs again in this repo. A teammate joins by section 7, not by running it. `--name` and `--abbreviation` are your product's name and its short form, and `init` writes both into `designerpunk.config.ts`. Without them, `init` asks for each in a terminal; where no terminal is attached (an agent's shell, or CI), it stops with an error. So pass both, and `--target`. When `init` finishes it prints "Your token output is in `<output>`. Run `npx designerpunk generate` after every token change." If that `generate` fails, `init` still finishes the birth, leads with the re-run command and exits non-zero.

**If your repo is a TypeScript project with its own build**, two edits keep `init` from breaking it. Exclude `src/tokens/**` and `src/components/**` from your `tsconfig.json`: DesignerPunk's pipeline reads those files and your build does not, and the token source imports `@3fn/core/types`, which your module resolution may not find. And if your build writes to `dist/`, set `output` in `designerpunk.config.ts` to a directory outside it (for example `design-tokens/`) and run `npx designerpunk generate` again after you set it: the default, `./dist/tokens`, sits inside your build output, which is usually gitignored, and the commit policy commits generated output.

**Step 3, your personal note**: `.designerpunk/personal-note.local.md` — who you are, what you and your organization value, and how you like to work together — or, after the restart, ask your agent to walk you through it. Your agents read it every session (it stays on your machine).

**Step 4, the restart, and why.** Your agent tool loads its MCP configuration when a session starts. The session that ran `init` cannot see the servers `init` just configured, so its first queries would fail. **This is a rule, not a one-off**: any later change to the MCP configuration, such as adding a server or updating the package, also needs a new session. On first open, Claude Code asks twice. First it asks whether you trust the folder, and lists the tool permissions DesignerPunk pre-approved in `.claude/settings.json`; until you trust the folder, it ignores them. Then it asks which of the three new MCP servers to enable. All three are selected, so choose "Enable selected". It keeps that choice per clone, so each person answers once. Kiro asks nothing: the servers run on first open, with their read-only tools pre-approved in `.kiro/settings/mcp.json`.

## 4. Your language vs our updating surface

After birth, your repo holds two different kinds of thing.

- **Your language: the tokens.** `init` copied them into your repo, and they are yours. DesignerPunk never adds to them. `generate` reads your copy: the colour palette; the opacity values that colours with transparency are built from; the motion tokens (duration, easing and scale) and the layering tokens; the font-size and line-height values that icon sizes are calculated from; the whole DTCG/Figma export; spacing and the other non-colour primitives; and your semantic references. The exception is the dark and WCAG override maps, which `generate` reads by registration. For each of `dark`, `wcag` light and `wcag` dark that your config registers, it reads your own map (the entries `init` writes register all three). For each it does not register, it still applies DesignerPunk's map from the installed package, as before, and prints a warning on every run naming the config line that would make it yours, until the next major release (planned 17.0.0), after which an unregistered built-in theme is not applied.
- **Our updating surface: the components.** You use them by name, and they improve when you update the package.

**`generate` is the pipeline — run on every token change.** Run it whenever you change your own tokens. `init` was the birth event; it does not run again, however often you run `generate`. `validate` validates token definitions against the active source, with four checks: required fields, family membership, semantic references and mathematical relationships. It exits non-zero when any of them fails, and it names each token that fails. Run it after you edit token source files.

What `generate` writes, into the `output` directory set in `designerpunk.config.ts`:
- `DesignTokens.web.css` — CSS custom properties
- `DesignTokens.ios.swift` — Swift constants and the theme surface (see § Platforms › iOS)
- `DesignTokens.android.kt` — Kotlin constants and the theme surface (see § Platforms › Android)
- `ComponentTokens.web.css` / `.ios.swift` / `.android.kt` — component tokens
- `DesignTokens.dtcg.json` — DTCG standard format
- `DesignTokens.figma.json` — Figma Variables format

`generate` also writes `token-index/` at your project root. It is the index the application MCP server reads for token queries.

**The update lifecycle: three verbs, one sentence each.**
- **`npm update @3fn/core`** refreshes DesignerPunk's updating surface, the components, and never your language, the tokens.
- **`npx designerpunk sync`** comes after it: it reports package updates against the installed package — reports, never writes silently. It prints its report before changing anything, and changes DesignerPunk's MCP configuration and generated agent files only on your go.
- **`npx designerpunk generate`** comes after you change your own tokens.

**The asymmetry is intended.** After an update, a component may look different while your colours do not, because the components are ours to improve and the tokens are yours to change. The one exception left is a dark or WCAG override map your config does not register: `generate` applies DesignerPunk's for it, so the next `generate` after an update can change what it produces. Register the entries `init` writes and all three maps are yours. If an updated component needs a token your set does not have, `sync` tells you (section 5).

Commit your lockfile, so that a teammate installs the version you built against.

**Upgrading from 14.x**: follow the 15.0.0 release notes. `sync` converts the old manifest to `designerpunk.manifest.json`, and `sync --migrate-legacy --target=<cc|kiro>` removes what an earlier `init` copied and attaches the generated agent layer, in the same run. In that run, the report `sync` prints before applying shows your repo as it was before the conversion, and the old manifest, `.kiro/sync-manifest.json`, is kept with a note in it, not moved.

## Platforms

One sub-section per platform. A platform sub-section describes what works on that platform; the steps are the same on every platform, and live in sections 2, 3 and 7.

### Web

Web products are supported.

```typescript
// Import all web components
import '@3fn/core';
// or: import '@3fn/core/components';

// Import design tokens: DesignerPunk's base (see "What these two imports are" below)
import '@3fn/core/tokens.css';
import '@3fn/core/component-tokens.css';

// Optional: responsive grid, fonts, blend utilities
import '@3fn/core/grid.css';
import '@3fn/core/fonts/figtree.css';
import '@3fn/core/fonts/commit-mono.css';
import '@3fn/core/fonts/rajdhani.css';
import { BlendCalculator } from '@3fn/core/blend';
```

**What these two imports are.**
- `@3fn/core/tokens.css` is **DesignerPunk's own base**. It is generated from DesignerPunk's configuration, not yours, and it is the **zero-config evaluation path**: the components render against it with nothing built.
- `@3fn/core/component-tokens.css` is DesignerPunk's **component token tier**. Keep importing it on every path.

**Your own tokens.** After you run `npx designerpunk generate`, import your own `DesignTokens.web.css` from your configured `output` directory **in place of** `@3fn/core/tokens.css`. That file carries your token tier's values. Keep `@3fn/core/component-tokens.css`.

**Your own component tokens.** `generate` also writes `ComponentTokens.web.css` to the same directory. It holds the component tokens you define, and it does not carry DesignerPunk's. Import it **after** `@3fn/core/component-tokens.css`, so that yours comes later in the cascade:

```typescript
import '@3fn/core/component-tokens.css';
import './<your output directory>/ComponentTokens.web.css';
```

On web, "yours wins" is **per token, by order**: a token you define under the same name replaces ours, and a name you leave out keeps our value. That differs from iOS and Android, where your group replaces ours whole. The order holds within one entry file. A bundler that code-splits your CSS can reorder the chunks and put ours after yours, so check the built CSS if a token of yours does not take effect.

**A page with no build step** loads the browser bundle with a `<link>` and a `<script type="module">`, as the browser distribution guide shows (`governance/browser-distribution-guide.md` in the `@3fn/core` package; your agent reads it as `browser-distribution-guide`); link your own `DesignTokens.web.css` there too, in place of the bundle's base `tokens.css`. Serve that page over local HTTP (for example `python3 -m http.server`), not by opening the file: browsers do not load the module bundle from a `file://` page.

**Themes, for now:**
- **Dark mode** follows the user's preferred colour scheme, through CSS `light-dark()`. Set `color-scheme` on an element to force light or dark.
- **One theme block is baked in**: `data-theme="wcag"`. It ships in DesignerPunk's base CSS and is generated into yours. Its selector is `:root[data-theme="wcag"]`, so set the attribute on the `<html>` element; on any other element it matches nothing.
  ```html
  <html data-theme="wcag">
    <!-- DesignerPunk components on the page use the WCAG theme's values -->
  </html>
  ```
- **A theme you register in `designerpunk.config.ts` is written as a `:root[data-theme="<name>"]` block in your generated CSS.** Like the WCAG block, its selector matches only the `<html>` element, so set the attribute there; on any other element it matches nothing, and whether a subtree can be themed is not decided yet. A theme of one mode (`mode: 'light'` or `'dark'`) covers one colour scheme: the other scheme shows the base values, so the block writes `light-dark(<its value>, <the base value>)` for it. Register it with `mode: 'both'` (or in the `{ light, dark }` form) to give it its own look in both.

The full import list is under Available Imports, in the reference part of the Integration Guide (`governance/DesignerPunk-Integration-Guide.md` in the `@3fn/core` package; your agent reads it as `designerpunk-integration-guide`).

### iOS

**Native onboarding is not supported.** The shipped SwiftUI components are reference source, not a build input: they read a theme surface (`@Environment(\.dpTheme)`, `any DesignerPunkTheme`) under names fixed to DesignerPunk's own binding, which your `npx designerpunk generate` now writes into `DesignTokens.ios.swift`; and the package has no Swift package manifest. *(corrected 2026-11-07: the claim that `ContainerCardBase.ios.swift` does not parse was removed; .kiro/issues/2026-09-26-native-component-theme-hardcoding.md; prior text at 74d7566f5)*

What the package ships for iOS, and why it does not add up to a target yet:
- The package no longer ships `DesignTokens.ios.swift` or `ComponentTokens.ios.swift` under `dist/`: DesignerPunk's own base snapshots were retired. Your `npx designerpunk generate` writes `DesignTokens.ios.swift` from **your** configuration, and that is the only copy you have.
- `DesignTokens.ios.swift` writes every colour as a `Color(.displayP3, …)` constant with its channels computed at generation, so it needs no colour library.
- A product token that references a colour semantic is emitted into `ProductTokens.ios.swift` as an extension on `DesignerPunkTheme`, which `DesignTokens.ios.swift` defines. A product token that references a composite (typography, shadow or motion) is refused by `generate`, which names the token.
- Some of the shipped components read component tokens (`ButtonIcon.ios.swift`, for one). `generate` writes them into `ComponentTokens.ios.swift` in your output, and that file refers to `DesignTokens` members, which `DesignTokens.ios.swift` defines.
- Every colour semantic is a member of the generated theme (`colorActionPrimary` and `colorStructureCanvas` among them) and none is a `DesignTokens` member: read it through `\.dpTheme` or a `<YourName>Themes` instance. The theme has four instances today, base and WCAG in light and dark; a theme you register in `designerpunk.config.ts` adds none yet.

DesignerPunk's checks compile this source: the token files `generate` writes, and the components against them, compiled for an iOS 17.0 deployment target; not run on any device or simulator. The components compile except for pinned errors (listed in the Native status note). Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit). Where native support stands is in the Native status note at the end of "Platforms". *(corrected 2026-11-07: the clause "and the parse failure was reproduced with the Swift compiler's parse step" was removed; .kiro/issues/2026-09-26-native-component-theme-hardcoding.md; prior text at 74d7566f5. Corrected 2026-11-08: "This was checked by reading the source. No iOS build was run." was removed, since the compile harness now builds the Swift; Spec 129; prior text at 4d523157e)*

### Android

Android: reference source, not a build input. The Compose components under `src/components/core/*/platforms/android/` read their theme from `LocalDPTheme`, which `generate` writes into `DesignTokens.android.kt`, and there is no Gradle module for you to depend on. Native onboarding is not supported. DesignerPunk's checks compile this source: the token files `generate` writes, and the components against them, compiled for Android API 26 (`minSdk`); not run on any device or emulator. The components compile except for pinned errors (listed in the Native status note). *(corrected 2026-11-08: "This was checked by reading the source; no Android build has been run." was removed, since the compile harness now builds the Kotlin; Spec 129; prior text at 57f61241b)*

What the package ships for Android, and why it does not add up to a target yet:
- The package no longer ships `DesignTokens.android.kt` or `ComponentTokens.android.kt` under `dist/`: DesignerPunk's own base snapshots were retired. Your `npx designerpunk generate` writes `DesignTokens.android.kt` from **your** configuration, and that is the only copy you have.
- Three of the shipped components (Avatar, Badge-Label-Base and Button-Icon) read component tokens. `generate` writes them into `ComponentTokens.android.kt` in your output.
- The Kotlin packages `com.designerpunk.tokens` and `com.designerpunk.components.*` are reserved to DesignerPunk. Keep your own `.kt` files out of them. `generate` warns, naming the file, when it finds one outside its own output and your token source; it does not fail.
- Every colour semantic is a member of the generated `DesignerPunkTheme` data class (`color_action_primary` and `color_structure_canvas` among them) and none is a `DesignTokens` member: read it through `LocalDPTheme.current` or a `<YourName>Themes` instance. The WCAG colours are the `WcagLight` and `WcagDark` instances; a theme you register adds none yet.
- A product token that references a colour semantic is emitted as a read of `LocalDPTheme`, which `DesignTokens.android.kt` defines. A product token that references a composite is refused by `generate`, which names the token.

Platform requirements, for reference: the generated Kotlin writes every colour as a `Color(…, ColorSpaces.DisplayP3)` constant with its channels computed at generation, so it needs no colour library. The generated Kotlin files carry the Compose imports they use (`androidx.compose.ui`, `.text`, `.foundation` and `.animation`), so the Compose libraries are the dependency to add. The Compose BOM must be compatible with the component implementations. Where native support stands is in the Native status note at the end of "Platforms".

**Native status (iOS and Android).** Native onboarding is not supported yet. Don't start an iOS or Android product on this release. Web is the platform you can build on today.

What is true now:
- iOS: the token files `generate` writes compile: compiled for an iOS 17.0 deployment target; not run on any device or simulator.
- iOS: DesignerPunk's own SwiftUI component source compiles against those token files, except for pinned errors. A pinned error is a Swift compiler error that DesignerPunk's checks know about and list by file and message, each tagged to an open record that will fix it. `harness/expected/harness-ios-components.tsv` lists them, in the packaged source of Container-Base, Container-Card-Base, Badge-Label-Base, Button-Icon, Button-VerticalList-Item and -Set, the Input-*-Base components, the Nav-* components, and the blend utilities. Any error not on that list fails the check. Until the records are closed, treat the components as reference source, not something you build a product from.
- iOS "themed" is compile evidence only: the theme types exist and the components' theme reads resolve against them. Nothing here switches a theme at run time on iOS; that belongs to Spec 132.
- Android: the token files `generate` writes compile: compiled for Android API 26 (`minSdk`); not run on any device or emulator. Nothing here switches a theme at run time on Android: the `LocalDPTheme` and `<YourName>Themes` types compile, and that is all this checks.
- Android: DesignerPunk's own Jetpack Compose component source compiles against those token files, except for pinned errors. A pinned error is a Kotlin compiler error that DesignerPunk's checks know about and list by file and message, each tagged to an open record that will fix it. `harness/expected/harness-android-components.tsv` lists them, in the packaged source of Container-Base, Container-Card-Base, Button-VerticalList-Item and -Set, Button-Icon, Badge-Label-Base, Icon-Base, the Input-*-Base components, the Nav-* components, the Progress-* components, and the blend utilities. Any error not on that list fails the check. Until the records are closed, treat the components as reference source, not something you build a product from.
- DesignerPunk's checks build Swift and Kotlin to compile them. They do not link an app, run tests, or run anything on a device, simulator or emulator. *(corrected 2026-11-08: the iOS and Android lines above were rewritten from "reference source, nothing compiled" to what the compile harness checks, in Kenya's and Data's words; .kiro/specs/129-consumer-generation-completeness/completion/task-18-3-completion.md; prior text at 7689dd804)*

What is planned, in two parts:
- **Spec 129 (consumer-generation completeness)** is the first part. It makes the token files `generate` writes, and DesignerPunk's component source built against them, compile on iOS and Android in DesignerPunk's own checks. That is a compile check, not an app: it does not link an app or run tests, and it does not make the components something you can build a product from.
- **Spec 132** is the second part. It is the work that brings DesignerPunk's iOS and Android components into your own app, as a dependency, and shows that they build and render there. Support for building a native product starts with that work, not before.

This guide will say so here when native support exists. No date is promised for either part.

## 5. When sync reports a missing token

After an update, `sync` may print a line like this:

```
components now expect token '<name>' — <what it is for> (used by <components>). Add it to your set in <your token source>. Your tokens are yours; DesignerPunk never adds to them. DesignerPunk's value, for reference: <value> ('<token>' in DesignerPunk's language). See: install guide § "When sync reports a missing token".
```

It means an updated component references a token name that your token set does not define. DesignerPunk's own value for that token is shown for reference only. **It is a report, not a change.** `sync` cannot add the token for you, because your tokens are your language: adding to them is your decision. Add the token to your set, choosing its value, and then run `npx designerpunk generate`.

This is the one place where the two postures meet after birth: our updating surface asks something of your language, and the answer is yours.

## 6. Your agent layer

The agent files that `init` and `attach` generate are regenerated inside a self-labelled managed region, and are yours to extend outside it. Write your own additions outside the region's markers: `sync` refreshes what is inside them and leaves the rest alone.

## Adding a second harness

To use a second agent tool in the same repo, run:

```bash
npx designerpunk attach --target=<cc|kiro>
```

`attach` will attach a harness (agents + MCP config + approvals), for one target. It is safe to re-run. Restart your agent session afterwards, for the reason in section 3.

## 7. Joining an existing design system

**`init` is never the join mechanism.** `init` is the birth event, once per design system, ever: in a repo that already has a design system it refuses and prints these steps. (`init --re-scaffold` exists for a deliberate re-scaffold. It reports every file it would re-add before adding it.)

To join a design system someone else birthed:

1. Clone the product repo.
2. `npm install`
3. `npx designerpunk generate`
4. Fill in `.designerpunk/personal-note.local.md` (`generate` creates it) — or, after the restart, ask your agent to walk you through it.
5. Restart your agent session. Claude Code then asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both. Kiro asks nothing.

Your note is your own. You never inherit the founder's: it stays on each person's machine.

**If you use a different agent tool than the founder, or the agent layer is not committed**, add one step after step 3:

1. Clone the product repo.
2. `npm install`
3. `npx designerpunk generate`
4. `npx designerpunk attach --target=<cc|kiro>`
5. Fill in `.designerpunk/personal-note.local.md` (`generate` creates it) — or, after the restart, ask your agent to walk you through it.
6. Restart your agent session. Claude Code then asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both. Kiro asks nothing.

**Why `generate` on a join**: the platform output is already committed, so `generate` may change nothing there. It writes what is per-machine and never committed: `token-index/`, which the application MCP server reads, and your personal note. **If you ran `attach`**, commit what it wrote, so the next teammate on that agent tool does not run it again: the agent files (`.kiro/`, or `.claude/`, `.mcp.json` and `CLAUDE.md`) and the change to `designerpunk.manifest.json`. Do not commit `.claude/settings.local.json`: Claude Code keeps your per-clone choice of MCP servers there, and nothing DesignerPunk writes ignores it, so add it to your `.gitignore` if your global git ignore does not.

Which files the founder commits, and which each of you regenerates, is set by the commit policy (`docs/consumer/COMMIT-POLICY.md`).

## 8. CI needs

DesignerPunk declares what a design system needs verified, and why. It never names a CI vendor, a workflow syntax or a repo layout: you map each need onto whatever CI your repo has.

- **Every need ships with a gate-bite recipe**: introduce a deliberate failure, your check must go red, then revert. A check that never went red has not been shown to check anything.
- **Needs are tiered**: a minimal core, and optional hardening.
- **Every need states both costs**: what skipping it costs, and what adopting it costs (standing up CI, and keeping its bite proof working).
- An example from the minimal core: *committed platform output matches `generate`*. Its bite: edit a token without regenerating, and the check goes red.

The CI-needs starter spec, which `init` places in your repo's `specs/`, carries the needs. Your agent runs it. DesignerPunk scaffolds that spec and does not maintain integrations for particular CI vendors.

What this doc promises is bounded by what DesignerPunk can support at solo scale. A failure in an environment DesignerPunk does not control is owned by whoever makes the promise for that environment.

## 9. Ownership

**To own one component**, put your version in your repo's `src/components/`, declaring the component's name (the `component:` field of its `contracts.yaml`). Yours wins on its name, and every other component continues to come from the package.

**To own the engine too**, clone `github.com/3fn/DesignerPunk`. `init` already made the token language yours; the clone adds the engine and the components.

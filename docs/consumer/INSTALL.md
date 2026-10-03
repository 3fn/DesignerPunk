---
path-steps: { founder: 5, joining: 5, joining-cross-harness: 6, reference-no-init: 3 }
---

# DesignerPunk install guide

> This file is generated from the install region of `governance/DesignerPunk-Integration-Guide.md`. Do not edit it: edit the region there, then run `npx tsx scripts/derive-install-doc.ts`. A test fails if the two differ.

This release is ready for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input, so don't start a native product on this release. On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output yet; light and dark mode work.

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

Use this posture when you want a design system of your own. These are the five steps. Section 4 explains what steps 2 and 3 do, and why there are two of them.

1. `npm install @3fn/core`
2. `npx designerpunk init --target=<cc|kiro>`
3. `npx designerpunk generate`
4. Fill in your personal note — or, after the restart, ask your agent to walk you through it.
5. Restart your agent session (approve DesignerPunk's MCP servers if asked).

**Step 2, `init`, is the birth event — runs once per design system, ever.** It copies DesignerPunk's token source into your repo as your own, writes `designerpunk.config.ts`, and generates the agent layer and the MCP configuration for the target you name (`cc` for Claude Code, `kiro` for Kiro). From then on the token language is yours. `init` never runs again in this repo. A teammate joins by section 7, not by running it.

**Step 3, `generate`, is the pipeline — run on every token change.** It builds your platform token output from your own token source. Section 4 says when to run it again.

**Step 4, your personal note**: `.designerpunk/personal-note.local.md` — who you are and how you want to be worked with; your agents read it every session (it stays on your machine). You can fill it in by hand, or, after the restart, ask your agent to walk you through it.

**Step 5, the restart, and why.** Your agent tool loads its MCP configuration when a session starts. The session that ran `init` cannot see the servers `init` just configured, so its first queries would fail. **This is a rule, not a one-off**: any later change to the MCP configuration, such as adding a server or updating the package, also needs a new session. Some tools ask you once to approve project-declared MCP servers; approve DesignerPunk's.

## 4. Your language vs our updating surface

After birth, your repo holds two different kinds of thing.

- **Your language: the tokens.** `init` copied them into your repo, and they are yours wholesale. DesignerPunk never adds to them. One exception: `generate` applies DesignerPunk's own dark and WCAG override maps, not your copies in `src/tokens/themes/`, so editing those copies does not change your output yet.
- **Our updating surface: the components.** You use them by name, and they improve when you update the package.

**`generate` is the pipeline — run on every token change.** Run it whenever you change your own tokens. `init` was the birth event; it does not run again, however often you run `generate`. `validate` validates token definitions against the active source, and is worth running after you edit token source files.

What `generate` writes, into the `output` directory set in `designerpunk.config.ts`:
- `DesignTokens.web.css` — CSS custom properties
- `DesignTokens.ios.swift` — Swift constants (no theme surface yet; see § Platforms › iOS)
- `DesignTokens.android.kt` — Kotlin constants (no theme surface yet; see § Platforms › Android)
- `ComponentTokens.web.css` / `.ios.swift` / `.android.kt` — component tokens
- `DesignTokens.dtcg.json` — DTCG standard format
- `DesignTokens.figma.json` — Figma Variables format

`generate` also writes `token-index/` at your project root. It is the index the application MCP server reads for token queries.

**The update lifecycle: three verbs, one sentence each.**
- **`npm update @3fn/core`** refreshes DesignerPunk's updating surface, the components, and never your language, the tokens.
- **`npx designerpunk sync`** comes after it: it reports package updates against the installed package — reports, never writes silently. It prints its report before changing anything, and changes DesignerPunk's MCP configuration and generated agent files only on your go.
- **`npx designerpunk generate`** comes after you change your own tokens.

**The asymmetry is intended.** After an update, a component may look different while your colours do not, because the components are ours to improve and the tokens are yours to change. The exception above still applies: the dark and WCAG override values come from the installed package, so the next `generate` after an update can change them. If an updated component needs a token your set does not have, `sync` tells you (section 5).

Commit your lockfile, so that a teammate installs the version you built against.

**Upgrading from 14.x**: follow the 15.0.0 release notes. `sync` converts the old manifest to `designerpunk.manifest.json`, and `sync --migrate-legacy --target=<cc|kiro>` removes what an earlier `init` copied and attaches the generated agent layer, in the same run.

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

**Themes, for now:**
- **Dark mode** follows the user's preferred colour scheme, through CSS `light-dark()`. Set `color-scheme` on an element to force light or dark.
- **One theme block is baked in**: `data-theme="wcag"`. It ships in DesignerPunk's base CSS and is generated into yours. Its selector is `:root[data-theme="wcag"]`, so set the attribute on the `<html>` element; on any other element it matches nothing.
  ```html
  <html data-theme="wcag">
    <!-- DesignerPunk components on the page use the WCAG theme's values -->
  </html>
  ```
- **A theme you register in `designerpunk.config.ts` does not yet produce a `[data-theme="<name>"]` block in any generated CSS.** A custom `data-theme` value resolves against nothing yet.

The full import list is under Available Imports, in the reference part of the Integration Guide (`governance/DesignerPunk-Integration-Guide.md`).

### iOS

**Native onboarding is not supported.** The shipped SwiftUI components are reference source, not a build input: they read a theme surface (`@Environment(\.dpTheme)`, `any DesignerPunkTheme`) under names fixed to DesignerPunk's own configuration, which no shipped file defines and your `npx designerpunk generate` does not emit; the package has no Swift package manifest; and `ContainerCardBase.ios.swift` does not parse.

What the package ships for iOS, and why it does not add up to a target yet:
- `node_modules/@3fn/core/dist/DesignTokens.ios.swift` is DesignerPunk's **un-themed base snapshot**, generated from DesignerPunk's own configuration, not yours.
- `DesignTokens.ios.swift` also calls a `Color.oklch(...)` initializer (and a bare `oklch(...)`) that no shipped file defines and the package does not declare as a dependency. DesignerPunk's generator names ChromaKit for it.
- Product tokens that reference a theme-varying token are emitted into `ProductTokens.ios.swift` as an extension on `<YourName>Theme`; nothing defines or generates that type.
- `node_modules/@3fn/core/dist/ComponentTokens.ios.swift` is DesignerPunk's **component token tier**. Some of the shipped components read it (`ButtonIcon.ios.swift`, for one), and it refers to `SizingTokens`, `SpacingTokens` and `BorderWidthTokens`, which no shipped file defines.
- Native token output omits the **14 theme-varying semantic colours**, among them `colorActionPrimary` and `colorStructureCanvas`.
- Nine of the shipped components also spell the theme read as `@Environment(.dpTheme)`, without the key-path backslash.

This was checked by reading the source, and the parse failure was reproduced with the Swift compiler's parse step. No iOS build was run. Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit). iOS onboarding is a planned follow-up (Spec 129).

### Android

Android: reference source, not a build input. The Compose components under `src/components/core/*/platforms/android/` read their theme from `LocalDPTheme`, which nothing in this package defines and `generate` does not emit today, and there is no Gradle module. Native onboarding is not supported. This was checked by reading the source; no Android build has been run.

What the package ships for Android, and why it does not add up to a target yet:
- `node_modules/@3fn/core/dist/DesignTokens.android.kt` is DesignerPunk's **un-themed base snapshot**, generated from DesignerPunk's own configuration, not yours.
- `node_modules/@3fn/core/dist/ComponentTokens.android.kt` is DesignerPunk's **component token tier**. Three of the shipped components (Avatar, Badge-Label-Base and Button-Icon) read it.
- Native token output omits the same **14 theme-varying semantic colours**, among them `color_action_primary` and `color_structure_canvas`. Only `_wcag` variants of some of them are emitted.
- Product tokens that reference a theme-varying token are emitted as a read of `Local<your abbreviation>Theme`, which nothing defines.

Platform requirements, for reference: the generated Kotlin calls `Oklch(…).toComposeColor()`, which needs the colormath library (github.com/ajalt/colormath), and the file imports nothing, so you add the dependency and the imports yourself. The Compose BOM must be compatible with the component implementations. Android onboarding is a planned follow-up (Spec 129).

## 5. When sync reports a missing token

After an update, `sync` may print a line like this:

```
components now expect token '<name>' — <what it is for> (used by <components>). Add it to your set in <your token source>. Your tokens are yours; DesignerPunk never adds to them. DesignerPunk's value, for reference: <value> ('<token>' in DesignerPunk's language). See: install doc § "When sync reports a missing token".
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
5. Restart your agent session (approve DesignerPunk's MCP servers if asked).

Your note is your own. You never inherit the founder's: it stays on each person's machine.

**If you use a different agent tool than the founder, or the agent layer is not committed**, add one step after step 3:

1. Clone the product repo.
2. `npm install`
3. `npx designerpunk generate`
4. `npx designerpunk attach --target=<cc|kiro>`
5. Fill in `.designerpunk/personal-note.local.md` (`generate` creates it) — or, after the restart, ask your agent to walk you through it.
6. Restart your agent session (approve DesignerPunk's MCP servers if asked).

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

---
id: designerpunk-integration-guide
inclusion: manual
name: DesignerPunk-Integration-Guide
description: Everything a product developer needs to integrate DesignerPunk into a product repo
path-steps: { founder: 5, joining: 5, joining-cross-harness: 6, reference-no-init: 3 }
---

# DesignerPunk Integration Guide

**Date**: 2026-04-08
**Last Reviewed**: 2026-10-03
**Purpose**: Everything a product developer needs to integrate DesignerPunk into a product repo
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: product-development

---

<!-- designerpunk:install-region:begin -->

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
2. `npx designerpunk init --target=<cc|kiro> --name <name> --abbreviation <abbr>`
3. `npx designerpunk generate`
4. Fill in your personal note — or, after the restart, ask your agent to walk you through it.
5. Restart your agent session. Claude Code then asks you to trust the folder and to enable DesignerPunk's three MCP servers: accept both. Kiro asks nothing.

**Step 2, `init`, is the birth event — runs once per design system, ever.** It copies DesignerPunk's token source into your repo as your own, writes `designerpunk.config.ts`, and generates the agent layer and the MCP configuration for the target you name (`cc` for Claude Code, `kiro` for Kiro). From then on the token language is yours. `init` never runs again in this repo. A teammate joins by section 7, not by running it. `--name` and `--abbreviation` are your product's name and its short form, and `init` writes both into `designerpunk.config.ts`. Without them, `init` asks for each in a terminal; where no terminal is attached (an agent's shell, or CI), it stops with an error. So pass both.

**Step 3, `generate`, is the pipeline — run on every token change.** It builds your platform token output from your own token source. Section 4 says when to run it again.

**If your repo is a TypeScript project with its own build**, two edits keep `init` from breaking it. Exclude `src/tokens/**` and `src/components/**` from your `tsconfig.json`: DesignerPunk's pipeline reads those files and your build does not, and the token source imports `@3fn/core/types`, which your module resolution may not find. And if your build writes to `dist/`, set `output` in `designerpunk.config.ts` to a directory outside it (for example `design-tokens/`) and run `npx designerpunk generate` again: the default, `./dist/tokens`, sits inside your build output, which is usually gitignored, and the commit policy commits generated output.

**Step 4, your personal note**: `.designerpunk/personal-note.local.md` — who you are, what you and your organization value, and how you like to work together — or, after the restart, ask your agent to walk you through it. Your agents read it every session (it stays on your machine).

**Step 5, the restart, and why.** Your agent tool loads its MCP configuration when a session starts. The session that ran `init` cannot see the servers `init` just configured, so its first queries would fail. **This is a rule, not a one-off**: any later change to the MCP configuration, such as adding a server or updating the package, also needs a new session. On first open, Claude Code asks twice. First it asks whether you trust the folder, and lists the tool permissions DesignerPunk pre-approved in `.claude/settings.json`; until you trust the folder, it ignores them. Then it asks which of the three new MCP servers to enable. All three are selected, so choose "Enable selected". It keeps that choice per clone, so each person answers once. Kiro asks nothing: the servers run on first open, with their read-only tools pre-approved in `.kiro/settings/mcp.json`.

## 4. Your language vs our updating surface

After birth, your repo holds two different kinds of thing.

- **Your language: the tokens.** `init` copied them into your repo, and they are yours. DesignerPunk never adds to them. But part of your copy is not read yet. `generate` takes the following from the installed package, so editing them in your copy does not change your output yet: the colour palette; the dark and WCAG override maps; the opacity values that colours with transparency are built from; the motion tokens (duration, easing and scale) and the layering tokens; the font-size and line-height values that icon sizes are calculated from (your own font-size and line-height tokens are still read from your copy); and the whole DTCG/Figma export. Spacing and the other non-colour primitives, and your semantic references, are read from your copy.
- **Our updating surface: the components.** You use them by name, and they improve when you update the package.

**`generate` is the pipeline — run on every token change.** Run it whenever you change your own tokens. `init` was the birth event; it does not run again, however often you run `generate`. `validate` validates token definitions against the active source. One of its four checks, mathematical relationships, currently fails even on unmodified token source, so `validate` exits non-zero; that is a known defect in the checker, not in your tokens. Its other three checks are still worth reading after you edit token source files.

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

**The asymmetry is intended.** After an update, a component may look different while your colours do not, because the components are ours to improve and the tokens are yours to change. The exceptions above still apply: the colour palette, the dark and WCAG override maps, the opacity in composed colours, the motion and layering tokens, the font-size and line-height values behind icon sizes, and the DTCG/Figma export all come from the installed package, so the next `generate` after an update can change them. If an updated component needs a token your set does not have, `sync` tells you (section 5).

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

**A page with no build step** loads the browser bundle with a `<link>` and a `<script type="module">`, as the browser distribution guide shows (`governance/browser-distribution-guide.md` in the `@3fn/core` package; your agent reads it as `browser-distribution-guide`); link your own `DesignTokens.web.css` there too, in place of the bundle's base `tokens.css`. Serve that page over local HTTP (for example `python3 -m http.server`), not by opening the file: browsers do not load the module bundle from a `file://` page.

**Themes, for now:**
- **Dark mode** follows the user's preferred colour scheme, through CSS `light-dark()`. Set `color-scheme` on an element to force light or dark.
- **One theme block is baked in**: `data-theme="wcag"`. It ships in DesignerPunk's base CSS and is generated into yours. Its selector is `:root[data-theme="wcag"]`, so set the attribute on the `<html>` element; on any other element it matches nothing.
  ```html
  <html data-theme="wcag">
    <!-- DesignerPunk components on the page use the WCAG theme's values -->
  </html>
  ```
- **A theme you register in `designerpunk.config.ts` does not yet produce a `[data-theme="<name>"]` block in any generated CSS.** A custom `data-theme` value resolves against nothing yet.

The full import list is under Available Imports, in the reference part of the Integration Guide (`governance/DesignerPunk-Integration-Guide.md` in the `@3fn/core` package; your agent reads it as `designerpunk-integration-guide`).

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

<!-- designerpunk:install-region:end -->

## Walkthroughs

Each walkthrough is one thing you want to get done, written so you can follow it with your agent beside you. You don't need to read the install steps above first: each walkthrough names the part of them it needs, and your agent can read that part for you. "Your agent" means the AI agent in your agent tool, Claude Code or Kiro, working in your project folder.

Every walkthrough has the same six parts: **Goal**, **You'll need**, **Ask your agent** (words you can paste), **What the agent does**, **How you know it worked**, and **If not**.

| If you want to… | Walkthrough |
|---|---|
| look at DesignerPunk before committing to anything | Walkthrough: See DesignerPunk working |
| describe a screen so it can be built | Walkthrough: Specify your first screen |
| work in a design system a teammate already set up | Walkthrough: Join a teammate's design system |
| change a colour and see it on a web page | Walkthrough: Change a token and see it on web |
| make it look like your brand | Walkthrough: Make it look like your brand (coming with Spec 129) |
| build for iPhone or Android | Walkthrough: Build for iOS or Android (coming with Spec 129) |

### Walkthrough: See DesignerPunk working

**Goal**: see DesignerPunk's components and patterns from inside your agent tool, without setting up a design system of your own.

**You'll need**: Node.js and npm (see "Prerequisites"), Claude Code or Kiro, and a project folder. Nothing in the folder becomes a design system.

**Ask your agent**:

> Set DesignerPunk up in this folder as a reference only, following the install guide's section "2. CONSUME — the reference corpus, no init". Don't run init. Tell me when it's time to restart.

Then, once you have restarted your agent session:

> Show me DesignerPunk's component catalog, then the components it suggests for a form.

**What the agent does**:
- Runs the two commands in "2. CONSUME — the reference corpus, no init": it installs `@3fn/core`, then runs `attach` with `--reference`, which writes the MCP configuration and its approvals and no agents. Your agent tool may ask you to approve each command.
- Hands the restart to you. The session that ran the commands cannot see the servers they configured; the reason is step 5 of "3. BECOME — birth".
- After the restart, asks the Application MCP for `get_component_catalog()`, then `find_components({ context: "forms" })`.

**How you know it worked**: the catalog comes back as a list of components with their names, families and readiness, and the forms query names form components such as `Input-Text-Base` and `Button-CTA`. More checks are in "Verify — Explore the Component Catalog".

**If not**:
- The agent says it has no DesignerPunk tools: the session was not restarted, or the servers were not enabled when your agent tool asked. Restart, and accept them.
- A server shows as not connected: the checks are in "Configure Agent Connections".
- You want a design system of your own after all: that is the other posture, "3. BECOME — birth". The choice between the two is explained in "1. Which posture? CONSUME or BECOME".

### Walkthrough: Specify your first screen

**Goal**: describe a screen (what is on it, what it does, and which DesignerPunk components and tokens it uses) in a file your agents and teammates can find, check and build from.

**You'll need**: a design system of your own ("3. BECOME — birth") or a teammate's ("Walkthrough: Join a teammate's design system"). A reference-only setup is not enough: `attach --reference` does not configure the Product MCP, which is where screens are found.

**Ask your agent**:

> Ask Leonardo to specify a [settings] screen for our product: [what it is for, who uses it, what they need to get done there]. Start from the example screen in product/, put the new screen where find_screens reads it, and tell me if it needs a component that doesn't exist.

Leonardo is the product-architect agent in your agent layer; replace the words in brackets with your own.

**What the agent does**:
- Reads the example screen `init` placed at `product/experience-map/pages/example-home.yaml`, and the product overview at `product/overview.yaml`.
- Picks components and patterns with the Application MCP (for example `find_components`, `get_experience_pattern` and `validate_assembly`), and tokens by what they mean (for example `color.structure.canvas` or `space.inset.200`), not by pixel values.
- Writes the screen as `product/experience-map/pages/<name>.yaml` (or `<name>/<name>.yaml` when it is split into facet files), in the format in "Writing Screen Specs" and "UI Tree Convention (Draft)".
- Reads it back through the Product MCP: `find_screens({ context: "<name>" })`, then `get_screen_spec({ name: "<name>" })`.

**How you know it worked**: `find_screens` lists your screen, and `get_screen_spec` returns it with an empty `_componentGaps` list. A gap is a component the screen names that neither DesignerPunk nor your product has: a typo, an old name, or something still to be built.

**If not**:
- `find_screens` does not list the screen: check that the file is YAML and sits under `product/experience-map/` (the layout is in "Product Data Directory"). The servers pick up edits on their own (see "Starting the MCP servers by hand"), so ask again after a moment.
- `_componentGaps` is not empty: ask your agent whether each gap is a misspelling of an existing component or a component you need. A component only this product needs is a one-off ("One-off Component Metadata").
- The agent says it has no Product MCP tools: the folder was set up as a reference only, or the session was not restarted after setup.

### Walkthrough: Join a teammate's design system

**Goal**: work in a design system a teammate already set up, with your own agent layer and your own personal note.

**You'll need**: access to the product repo, Node.js and npm, and Claude Code or Kiro. You do **not** run `init`: it runs once for the whole design system, and your teammate already ran it.

**Ask your agent**, in the cloned repo:

> This repo already has a DesignerPunk design system. Walk me through joining it, following the install guide's section "7. Joining an existing design system". First check whether the agent layer for my agent tool is committed.

**What the agent does**:
- Checks whether the repo's committed agent layer is for your agent tool (`.claude/`, `.mcp.json` and `CLAUDE.md` for Claude Code; `.kiro/` for Kiro). <!-- LINA: verify --> If it is, the join is the five steps in "7. Joining an existing design system". If it is not, or nothing is committed, it is the six-step path in the same section, which adds `attach`.
- Runs the install and `npx designerpunk generate` for you. On a join, `generate` writes what is per-machine and never committed: `token-index/` and your personal note, `.designerpunk/personal-note.local.md`.
- If it ran `attach`, shows you what to commit so the next teammate on your agent tool does not run it again. The list, and the one file not to commit, are in the same section.
- Hands the restart to you. After the restart, it can walk you through your personal note.

**How you know it worked**: after the restart, your agent answers DesignerPunk questions from its MCP tools (try "show me the component catalog"), and `.designerpunk/personal-note.local.md` exists on your machine. Your note stays on your machine: you never inherit your teammate's.

**If not**:
- `init` refused and printed some steps: that is expected in a repo that already has a design system. The steps it prints are the join steps.
- No DesignerPunk tools after the restart: enable the servers when your agent tool asks. Claude Code keeps that choice per clone, so you answer once.
- Not sure which files to commit and which to regenerate: the commit policy, `docs/consumer/COMMIT-POLICY.md`, sets it.

### Walkthrough: Change a token and see it on web

**Goal**: change one of your design system's colours, such as the colour of primary actions, and see the change on a web page in light mode, dark mode and the WCAG theme.

**You'll need**: a design system of your own ("3. BECOME — birth"), and a web page that loads **your** generated `DesignTokens.web.css`, not DesignerPunk's base `@3fn/core/tokens.css`. The difference is explained in "Web", under "Platforms". A page that still loads the base file never shows your changes.

**Ask your agent**:

> Change our primary action colour, color.action.primary, to purple300. Regenerate the tokens, then show me what changed in light mode, dark mode and the WCAG theme.

Replace `purple300` with the palette colour you want.

**What the agent does**:
- Edits the token in your token source: in `src/tokens/semantic/ColorTokens.ts`, it changes `color.action.primary`'s palette reference from `cyan300` (the value `init` copied) to the one you asked for. <!-- ADA: verify -->
- Runs `npx designerpunk generate`.
- Shows you the result: in `DesignTokens.web.css`, in your configured `output` directory, the value of `--color-action-primary` in the `:root` block changes.

**How you know it worked**: on your page, anything coloured by the primary action colour, such as a `Button-CTA`'s fill or outline <!-- LINA: verify -->, shows the new colour in light mode and in dark mode. With `data-theme="wcag"` on the `<html>` element, it does not change, and that is expected.

**The exceptions**: DesignerPunk's built-in dark and WCAG overrides come from the installed package, not from your copy (see "4. Your language vs our updating surface"). Two of them pin action colours, so your change does not reach them:
- the WCAG theme pins `color.action.primary` to `teal300` inside `data-theme="wcag"`;
- the dark override pins `color.action.navigation` to `cyan100`.

The WCAG theme also pins `color.action.navigation`, to `teal500` (and `teal100` in dark mode). So a change to `color.action.navigation` shows in light mode only. <!-- ADA: verify -->

**If not**:
- Nothing changed on the page: check that the page loads your own `DesignTokens.web.css` from your `output` directory, not `@3fn/core/tokens.css`, and reload it.
- `generate` stopped with an "Orphaned override key": a token that DesignerPunk's dark or WCAG overrides name is missing from your token source, so no token files were written (see "Token Source Configuration"). Put the token back.
- You changed a palette colour itself (what `purple300` is) and nothing changed: the colour palette is one of the parts `generate` still takes from the installed package (see "4. Your language vs our updating surface"). Point the token at a different palette colour instead.
- `npx designerpunk validate` exits with an error from its mathematical-relationships check: that check currently fails even on unmodified token source, a known defect in the checker (see "Generating tokens — options"). Its other three checks are still worth reading.

### Walkthrough: Make it look like your brand (coming with Spec 129)

**Not available on this release.** A theme you register in `designerpunk.config.ts` does not change your generated output yet: it produces no `[data-theme="<name>"]` block and no native theme output (see "Themes"). Custom-theme output is delivered by Spec 129 (consumer-generation completeness), and this walkthrough is written when that lands.

What works today: pointing individual colour tokens at other palette colours ("Walkthrough: Change a token and see it on web"), light and dark mode, and the built-in WCAG theme.

### Walkthrough: Build for iOS or Android (coming with Spec 129)

**Not available on this release.** The iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference code you can read, not code you can build a product from yet. The reasons are in "iOS" and "Android", under "Platforms". iOS and Android onboarding is a planned follow-up (Spec 129), and this walkthrough is written when that lands.

## Reference

This part of the guide is reference, not setup steps. The install steps are the region at the top of this guide (and its copy, `docs/consumer/INSTALL.md`), and the walkthroughs are under "Walkthroughs". This part is written for your agent to look things up in: you can skip it and ask your agent instead.

### Configuring your design system

`init` writes `designerpunk.config.ts` at your project root. For `--name MyProduct --abbreviation MP` it reads:

```typescript
import { defineConfig } from '@3fn/core/config';
import { darkSemanticOverrides } from './src/tokens/themes/dark/SemanticOverrides.ts';
import { wcagSemanticOverrides } from './src/tokens/themes/wcag/SemanticOverrides.ts';

export default defineConfig({
  name: 'MyProduct',
  abbreviation: 'MP',
  tokenSource: './src/tokens',
  componentTokens: ['./src/components', './src/tokens/component'],
  themes: [
    { name: 'dark', mode: 'dark', overrides: darkSemanticOverrides },
    { name: 'wcag', mode: 'light', overrides: wcagSemanticOverrides },
  ],
  output: './dist/tokens',
});
```

The one other option is `productTokens`, a directory of product token YAML (see "Product Tokens"). `componentTokens` directories are scanned for `tokens.ts` and `*.tokens.ts` files. Paths resolve relative to the config file's directory. The `themes` entries are not applied by `generate` yet (see "Themes").

Without a config file, the pipeline uses defaults: name `DesignerPunk`, abbreviation `DP`, the installed package's own tokens, no themes, output `dist`.

### Token Source Configuration

Without `tokenSource`, the pipeline reads the installed `@3fn/core` package's tokens. That is the CONSUME posture. `init` copies the token source into `src/tokens/` and sets `tokenSource: './src/tokens'`, so in a born repo your tokens are read from your own repo:

```typescript
export default defineConfig({
  name: 'MyProduct',
  abbreviation: 'MP',
  tokenSource: './src/tokens',  // resolve tokens from local source
  output: './dist/tokens'
});
```

**Rules:**
- Path is resolved relative to the config file's directory
- Must be a **complete** token source — no fallback to the package for missing families
- Must export `getAllPrimitiveTokens()` from the root barrel and `getAllSemanticTokens()` from a `semantic/` subdirectory
- Dark and WCAG overrides are not read from `tokenSource` or from `themes`: `generate` applies DesignerPunk's own override maps from the installed package (section 4). Every semantic token those maps name must exist in your token source. If one is missing, `generate` reports an "Orphaned override key", writes no token files, leaves `token-index/` as it was, and exits 1.
- `npx designerpunk init` copies a complete token source to `src/tokens/` automatically

### Themes

`designerpunk.config.ts` accepts a `themes` list of `{ name, mode, overrides }`, with `mode` one of `'light'`, `'dark'` or `'both'`. `generate` does not apply it yet. A theme you register produces no `[data-theme]` block and no native theme output. Its overrides are not validated either, so a misspelled token name passes silently. The `dark` and `wcag` entries that `init` writes do not drive output either: `generate` applies DesignerPunk's built-in dark and WCAG overrides regardless. Light and dark mode work, and the `wcag` theme is built in. Custom-theme output is delivered by Spec 129 (consumer-generation completeness).

### Starting the MCP servers by hand

Your agent tool starts DesignerPunk's MCP servers itself, from the MCP configuration that `init` or `attach` writes. You do not need to start them. To start one by hand, for example to read its log:

```bash
npx designerpunk mcp:app      # Application MCP — component + token queries
npx designerpunk mcp:docs     # Docs MCP — steering doc queries
npx designerpunk mcp:product  # Product MCP — screen specs, domain objects, product architecture
```

Each command runs its server on stdio and writes its log to stderr. Run it from inside your project: the Application and Product servers find your design system from the directory they start in, while the data that ships with the package (docs, experience patterns, layout templates, family guidance) is read from the package. The Product MCP starts with an empty index where no `product/` directory exists; a repo `init` created has one, with an example screen (see "Specifying screens (Product MCP)" below).

**Data freshness is automatic.** MCP servers detect stale data and rebuild before responding (30-second threshold gate). If you edit product YAML, component schemas, or steering docs, the next query will serve fresh data automatically. No manual health checks or `rebuild_index` calls needed during normal operation.

### Configure Agent Connections

Your agent tool needs two things to connect to DesignerPunk: an MCP configuration that tells it how to start the servers, and agent prompts that tell each agent its role. `init` writes both for the target you name, and `attach` writes them for another target or for a repo `init` did not create. Do not write the MCP configuration by hand: its approvals are generated from the servers' own tool registrations, and a hand-copied list drifts from them.

#### The files `init` and `attach` write

- **Claude Code** (`cc`): `.mcp.json` (the servers) and `.claude/settings.json` (the approved read-only tools, under `permissions.allow`).
- **Kiro** (`kiro`): `.kiro/settings/mcp.json` (the servers, each with its approved read-only tools).

Both configure all three servers (docs, application, product). With `--reference`, only the docs and application servers are written, and no agents.

After the files are written, restart your agent session so it picks them up (section 3 says why). If a session shows a server as not connected, verify:
- `node_modules/@3fn/core/dist/mcp/` contains the bundled server files (they ship with the package)
- Your `@3fn/core` install completed without errors
- Paths in the MCP config resolve from your project root

#### Set up agent prompts

The agent prompts are generated for your harness, not copied by hand. `npx designerpunk init` emits them for the default target. To add another target, or to wire a repo that `init` did not create, run:

```bash
npx designerpunk attach --target=<cc|kiro>
```

`attach` will attach a harness (agents + MCP config + approvals), for one target. It is safe to re-run. To read DesignerPunk without becoming it (MCP config and approvals only, no agents), add `--reference`:

```bash
npx designerpunk attach --target=<cc|kiro> --reference
```

After `attach` finishes, restart your agent session so it picks up the MCP servers.

### Verify — Explore the Component Catalog

Once your agent session is connected, verify DesignerPunk is working by querying the component catalog:

```
get_component_catalog()
```
→ Should return DesignerPunk's components, plus any you have added in your own `src/components/`, with names, types, families, and readiness.

```
find_components({ context: "forms" })
```
→ Should return form-relevant components (Input-Text-Base, Button-CTA, etc.)

```
list_experience_patterns()
```
→ Should return the experience patterns that ship with DesignerPunk (simple-form, settings, onboarding, and others).

```
get_experience_pattern({ name: "simple-form" })
```
→ Should return the simple form assembly pattern with steps, components, and roles.

If these queries return results, the ecosystem is working.

### Generating tokens — options

```bash
npx designerpunk generate
```

The pipeline shows where tokens are being read from. With the config `init` writes:
```
📦 MyProduct (MP)
   Tokens: src/tokens  (local)
   Output: dist/tokens
   Themes: dark (dark), wcag (light) — registered, not applied yet: a theme you register does not change your generated output; dark mode and the wcag theme apply DesignerPunk's built-in overrides to your tokens
```
The `Themes:` line lists what your config registers, not what was applied (see "Themes").

The `(local)` annotation means tokens resolve from your configured `tokenSource` path. If `tokenSource` is omitted, you'll see `(package)` — meaning tokens come from the installed `@3fn/core` package.

**Generate options:**

| Flag | Effect |
|------|--------|
| `--force` | Regenerate product tokens even if their YAML is unchanged. System tokens are always regenerated. |
| `--product-only` | Skip the system token pipeline and regenerate product tokens only, from the existing `token-index/`. Run it from your project root. |

```bash
# Fast iteration on product tokens only
npx designerpunk generate --product-only

# Regenerate product tokens even if their YAML is unchanged
npx designerpunk generate --force
```

Product token generation automatically detects staleness — if your YAML source files haven't changed since the last build, generation is skipped with a log message. Use `--force` to override.

To validate token definitions without generating files:
```bash
npx designerpunk validate
```

This checks semantic reference integrity, required fields, mathematical relationships, and family membership. The mathematical-relationships check currently fails even on unmodified token source and makes `validate` exit non-zero (a known checker defect); read the other three checks' results after editing token source files.

`generate` writes the files listed in section 4, and `token-index/` at your project root.

### Running Component Tests

You can test your own components with the Jest preset that ships with `@3fn/core`. You extend the preset with one line and install 5 devDependencies.

#### Setup

Install test dependencies:

```bash
npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @types/node
```

If you ran `npx designerpunk init`, `jest.config.js` and `tsconfig.test.json` are already scaffolded. Otherwise, create them manually:

**jest.config.js**:
```javascript
module.exports = {
  ...require('@3fn/core/jest-preset'),
  roots: ['<rootDir>/src'],
};
```

**tsconfig.test.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "node16",
    "moduleResolution": "node16",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "downlevelIteration": true,
    "types": ["jest", "node"]
  },
  "include": ["src/**/*"]
}
```

#### Running Tests

```bash
npx jest --passWithNoTests       # Run all tests (a fresh repo has none yet: without the flag jest exits 1, "No tests found")
npx jest src/components/          # Run your own component tests, once you've added some
npx jest --testPathPattern=Button # Run tests matching "Button"
```

#### Shared Test Utilities

`@3fn/core/testing` exports test helpers (`registerComponent`, `createComponentFixture`, `cleanupDOM`, `waitForShadowDOM`, `setupTokenProperties`, `cleanupTokenProperties`, `setupBlendColorProperties`, `cleanupBlendColorProperties`, `readComponentCSS`). The preset maps all five `@3fn/core/*` subpaths (`testing`, `config`, `blend`, `types` and `build`) to the compiled files the package ships under `dist/`, so the helpers load under `@3fn/core/testing` in an installed package.

#### Notes

- The preset defaults to `jsdom` environment. All web component tests run in jsdom automatically.
- `jest-environment-jsdom` is required — without it, DOM APIs are unavailable.
- `@types/node` is required for contract tests that read CSS source from disk (the style-mock returns `''` for CSS imports, so filesystem reads are needed to verify CSS content).

---

### Available Imports

| Import Path | What You Get |
|-------------|-------------|
| `@3fn/core` | All web components (ESM bundle) |
| `@3fn/core/components` | Same (alias) |
| `@3fn/core/tokens.css` | DesignerPunk's base design tokens as CSS custom properties: the zero-config evaluation path. After `generate`, use your own `DesignTokens.web.css` instead (see Platforms › Web, in the install region) |
| `@3fn/core/component-tokens.css` | DesignerPunk's component-level tokens as CSS custom properties (required on every path) |
| `@3fn/core/config` | `defineConfig` function with TypeScript types |
| `@3fn/core/blend` | Blend calculation utilities |
| `@3fn/core/grid.css` | Responsive grid CSS |
| `@3fn/core/fonts/figtree.css` | Figtree font family (body/UI) |
| `@3fn/core/fonts/commit-mono.css` | Commit Mono font family (code/mono) |
| `@3fn/core/fonts/rajdhani.css` | Rajdhani font family (display) |
| `@3fn/core/types` | Token type definitions. The token source `init` copied into your repo imports them. |
| `@3fn/core/build` | `defineComponentTokens` and the component-token build types. Your component token files import it. |
| `@3fn/core/jest-preset` | Jest preset for testing your own web components (see Running Component Tests) |
| `@3fn/core/testing` | Test helpers for web components (see Running Component Tests) |

---

### Specifying screens (Product MCP)

Your agent tool starts the Product MCP from the MCP configuration that `init` writes (or `attach` without `--reference`); you do not start it yourself. `attach --reference` never configures it. `npx designerpunk mcp:product` also starts it by hand.

Resolves product data from:
1. `PRODUCT_DIR` env var (if set) — the generated configuration sets it to `./product`
2. `product/` at your design system's root
3. `./product/` relative to cwd (a repo with no design system)

Starts with an empty index if no product directory exists.

**Component gap detection** reads `component-meta.yaml` files to check the component references in your screen specs. It checks against DesignerPunk's own components (their metadata ships in the package) together with your own components in `src/components/` (or `COMPONENT_DIR`, if set). No configuration is needed.

### Product Data Directory

`init` scaffolds three of these: `overview.yaml` (fill in its `TODO`s), `templates/home-layout.yaml`, and `experience-map/pages/example-home.yaml`, a worked example screen to read, keep or delete. The tree below shows a fuller product. A screen can be a single file (`pages/<name>.yaml`) or a directory of facet files (`pages/<name>/<name>.yaml`).

```
product/
  overview.yaml              # Product context + config
  principles/
    design-direction.md      # Visual and UX philosophy (YAML frontmatter with keywords)
    cross-platform-strategy.md
  experience-map/
    verticals/               # Feature suites
      legislation/
        legislation.yaml
    flows/                   # Sequential experiences
      onboarding/
        onboarding.yaml
    pages/                   # Standalone feature pages
      dashboard/
        dashboard.yaml
  templates/                 # Product-specific layouts
    card-grid.yaml
    hero-section.yaml
  domain-objects/            # Product entities
    bill.yaml
    representative.yaml
  components/                # One-off components (Stemma subset)
    legislation-card/
      legislation-card.schema.yaml
      legislation-card.contracts.yaml  # Only if new accessibility behavior
  tokens/                    # Product tokens (Specs 108/109)
    layout.yaml              # Layout constraints (contentMaxWidth, contentIndent, etc.)
    motion.yaml              # Motion characteristics (flipDuration, etc.)
```

### Product Tokens

Product tokens are product-level values that don't belong in Rosetta (system tokens) or Stemma (component tokens). Define them in `product/tokens/{category}.yaml`:

```yaml
# product/tokens/layout.yaml
category: layout
description: Structural layout constraints

tokens:
  contentMaxWidth:
    value: 1336
    unitType: logical
    description: Maximum content column width
    rationale: "Optimized for 70-75 characters per line at body font size"
    platforms: [web, ios, android]

  contentIndent:
    ref: space300
    description: Left indent for section content
    platforms: [web, ios, android]
```

**Configuration** — add to `designerpunk.config.ts`:
```typescript
export default defineConfig({
  // ...existing config...
  productTokens: './product/tokens',
});
```

**Generation** — `npx designerpunk generate` produces, in a `product/` folder inside your configured `output` directory:
- `ProductTokens.web.css` (CSS custom properties)
- `ProductTokens.ios.swift` (Swift constants)
- `ProductTokens.android.kt` (Kotlin objects)

The Swift and Kotlin files are reference output, not a build input, while native onboarding is unsupported (§ Platforms): they reference your native `DesignTokens` output and, for a theme-varying `ref`, a theme type `generate` does not emit.

**Validation** — `npx designerpunk validate --product-tokens` checks ref integrity.

**MCP query** — `get_product_tokens({ category: "layout" })` returns tokens with resolved system token values.

**Governance** — see `Product-Token-Governance.md` for naming conventions, rationale requirements, and promotion signals.

### Writing Screen Specs

Each screen is a YAML file with platform branching:

```yaml
name: dashboard
type: feature-page
tags: [overview, navigation]          # Optional — searchable via find_screens context filter
status:
  spec: complete
  web: in-progress
  ios: not-started
  android: not-started

ux-direction: |
  Overview screen with stats, recent activity, and quick actions.

ui-tree:
  shared:
    - component: Nav-Header-App
      tokens:
        background: color.structure.surface
        text: color.contrast.onLight
    - component: Container-Base
      tokens:
        padding: space.inset.200
      children:
        - component: stats-bar    # One-off
        - component: activity-feed # One-off
  ios:
    navigation: TabBar root destination

state-model:
  shared:
    - loading
    - populated
    - error

template: card-grid                   # Optional — references product/templates/
```

**`tokens:` block convention**: Token references go in a dedicated `tokens:` block per UI tree node, separate from `props:`. Props describe what a component does (label, variant). Tokens describe how it looks (color, spacing). Only `tokens:` blocks are indexed by the Product MCP — tokens in `props:` are not discoverable via `find_screens({ usesToken })`.

Use canonical Rosetta token names as-is (dot-notation for semantic tokens like `color.action.primary`, flat names for primitives like `space100` or `bodyMd`). The indexer stores token names exactly as written — no normalization.

**`_componentGaps`**: When you query a screen spec via `get_screen_spec`, the response includes a `_componentGaps` array listing any component references that don't match the ecosystem catalog (`component-meta.yaml`) or product one-off components. Each gap includes the component name, issue type (`not-found`), and UI tree path. This catches typos, outdated names, and references to components that haven't been built yet.

### UI Tree Convention (Draft)

**Status**: Draft — to be revised after 3-5 real screen specs have been authored.

This convention defines the expected structure of `ui-tree` in screen spec YAML files. It's what the Product MCP indexer relies on for component extraction, token extraction, and gap detection. It's a convention, not a schema — the indexer handles deviations gracefully (log warnings, index what it can), never rejects specs.

#### Node Structure

```yaml
- component: ComponentName        # Required. System component or product one-off name.
  props:                          # Optional. Component configuration. NOT indexed.
    variant: elevated
    label: "Section Title"
  tokens:                         # Optional. Design token references. Indexed.
    background: color.structure.surface
    padding: space.inset.200
  children:                       # Optional. Array of child nodes. Traversed recursively.
    - component: ChildComponent
      props: { ... }
      tokens: { ... }
  repeat: "for-each item in data.items"  # Optional. List rendering. NOT indexed.
  content:                        # Optional. Text the screen shows that no component carries (a heading, body copy). NOT indexed.
    heading: "Section Title"
```

| Field | Type | Required | Indexed By |
|-------|------|----------|------------|
| `component` | string | Yes | Reverse index (component→screens), gap detector |
| `props` | object | No | Not indexed |
| `tokens` | object (string keys, string values) | No | Reverse index (token→screens) |
| `children` | array of nodes | No | Traversed recursively |
| `repeat` | string | No | Not indexed |
| `content` | object (string values) | No | Not indexed |

**What the indexer does per node**: reads `component` → adds to reverse index + checks gap detector. Reads `tokens` → adds each value to token reverse index. Recurses into `children`. Ignores everything else.

**What the indexer ignores**: `props` values are never treated as token references. Unknown nesting keys (anything other than `children`) are not traversed.

#### Platform Branching in UI Trees

```yaml
ui-tree:
  shared:                         # Always traversed
    - component: Nav-Header-App
  ios:                            # Node array → traversed for reverse indexes
    - component: Button-CTA       # Node array → traversed
  web:
    navigation: client-side route  # Metadata object → NOT traversed
```

- `shared` is always traversed for reverse indexes.
- A platform branch (`ios`, `android`, `web`) whose value is a node array is also traversed, so its components and tokens appear in `find_screens` results whether or not you filter by platform. A branch whose value is an object (metadata) is stored but not walked.
- `get_screen_spec({ name, platform })` returns `shared` merged with that platform's branch.

#### Token Reference Format

Use canonical Rosetta token names as-is. Dot-notation and flat names are both valid:

```yaml
tokens:
  background: color.structure.surface    # Dot-notation semantic
  gap: space100                          # Flat primitive
  fontSize: bodyMd                       # Flat typography
```

Token keys (left side) are descriptive labels — not indexed, no enforced vocabulary. Token values (right side) are stored exactly as written — no normalization, no validation against the token registry.

#### What This Convention Does NOT Cover

- Accessibility annotations (inline vs separate section — not yet standardized)
- Conditional rendering beyond `repeat` (`if`/`when` — not yet needed)
- Slot composition (named slots in the tree — undefined)
- Component substitution across platforms (branching handles it, no explicit annotation)

These will be addressed when real screen specs require them.

**Single file** for simple screens. **Multi-file** (split by facet) for complex screens:
```
pages/dashboard/
  dashboard.yaml           # Core: UX direction, UI tree, status
  dashboard.state.yaml     # State model
  dashboard.data.yaml      # Data sources
  dashboard.a11y.yaml      # Accessibility
```

Systems Components are referenced by name — resolve details from the Application MCP. One-off components include their schema and contracts inline from `product/components/`.

### One-off Component Metadata

One-off components use a Stemma subset — same rigor, less ceremony:

**Required**: name, purpose, composed-from with slot/role mapping, props with types and defaults, token references.

**Required when new behavior**: accessibility contracts (when the composition introduces behavior its parts don't cover).

**Not required**: family membership, full README, readiness tracking, three-platform review, component-meta.yaml, inheritance declarations.

### Principles with YAML Frontmatter

Principle files are markdown with optional YAML frontmatter for keyword-based discovery:

```markdown
---
name: design-direction
keywords: [visual-identity, color, typography, brand, dark-theme]
---

The marketing site uses a dark theme with cyan/teal electric accent...
```

The `keywords` array makes principles queryable via `find_principles({ keyword: "dark-theme" })`. Without frontmatter, the principle is still indexed (accessible via `get_product_overview`) but won't appear in keyword searches.

### Product MCP Example Queries

```
# Impact analysis: which screens use a specific component?
find_screens({ usesComponent: "Button-CTA" })

# Triage: which screens are blocked on iOS?
find_screens({ status: "blocked", platform: "ios" })

# Token impact: which screens reference a specific token?
find_screens({ usesToken: "color.action.primary" })

# Compound query: blocked iOS screens that use a specific component
find_screens({ usesComponent: "Nav-Header-App", status: "blocked", platform: "ios" })

# Context search: find screens related to legislation (matches type, name, or tags)
find_screens({ context: "legislation" })

# State model for platform implementation
get_screen_state_model({ screen: "legislation-list" })

# Direct one-off component lookup
get_product_component({ name: "legislation-card" })

# Find principles about theming
find_principles({ keyword: "dark-theme" })

# Which templates does the dashboard use?
find_templates({ usedBy: "dashboard" })

# Enriched experience map with component references and blocked reasons
list_experience_map({ status: "in-progress", platform: "web" })
```

---

### Governance Gradient

| Tier | Artifacts | Review Depth | Who Governs |
|------|-----------|-------------|-------------|
| **Design system** | Your tokens (all of them, including what `init` copied), and the components, patterns and templates that ship with `@3fn/core` | Full — contracts, metadata, multi-agent review, spec process | Ada (tokens), Lina (components), Thurgood (specs/tests) |
| **Product extending** | Product tokens (`product/tokens/`), one-off components, product templates | Schema compliance, naming conventions, accessibility contracts for new behavior | Ada/Lina consulted, Stacy audits at synthesis |
| **Product internal** | Screen compositions, product-specific layouts, one-off styling | Minimal — does it work? does it use the ecosystem correctly? | Platform agents self-governed, Stacy spot-checks |

**Principle**: Governance weight scales with blast radius. Design-system artifacts, which affect every screen, get full review. Product-specific artifacts that affect only this product get lighter review. When in doubt, consult the specialist.

**Promotion path**: When a product artifact proves reusable (a second product needs it, or it fills a gap in the ecosystem taxonomy), it gets promoted through the full spec process. The product version becomes the reference implementation. Full Stemma lifecycle applies at promotion, not at creation.

---

### CLI Commands

| Command | What It Does |
|---------|-------------|
| `npx designerpunk init` | the birth event — runs once per design system, ever. `--target=<cc\|kiro>` picks the harness. |
| `npx designerpunk generate` | the pipeline — run on every token change. `--force` regenerates product tokens even if unchanged; `--product-only` skips the system tokens. |
| `npx designerpunk sync` | reports package updates against the installed package — reports, never writes silently. `--dry-run` reports only; `--apply` applies without the confirmation; `--overwrite <path>` and `--restore <path>` apply one conflict or one deleted file; `--migrate-legacy` removes what an earlier `init` copied and attaches the generated agent layer. |
| `npx designerpunk validate` | validates token definitions against the active source. `--product-tokens` validates product token references against `token-index/`. |
| `npx designerpunk attach --target=<cc\|kiro>` | attach a harness (agents + MCP config + approvals), for one target. `--reference` writes only the MCP config and approvals, no agents. |
| `npx designerpunk mcp:app` | Start the Application MCP server by hand (component and token queries). Your agent tool normally starts it. |
| `npx designerpunk mcp:docs` | Start the Docs MCP server by hand (steering doc queries). Your agent tool normally starts it. |
| `npx designerpunk mcp:product` | Start the Product MCP server by hand (screen specs, domain objects, product architecture). Your agent tool normally starts it. |
| `npx designerpunk figma:push` | Push tokens to Figma (requires Figma Desktop + Console MCP). |
| `npx designerpunk figma:extract` | Extract design specs from Figma. |
| `npx designerpunk --help` | Show the command list. |

---

### Knowledge Base Setup (Kiro CLI)

For agents using `/knowledge` in Kiro CLI, recommended indexes for a product repo:

| Knowledge Base | Path | Include | Purpose |
|---------------|------|---------|---------|
| product-source | `./src` | `**/*.ts`, `**/*.tsx` | Product source code |
| product-screens | `./specs` or `./screens` | `**/*.md` | Screen specifications |
| designerpunk-application | `node_modules/@3fn/core/src/components/core` | `**/*.yaml` | Component schemas, contracts and metadata |

Agents primarily use MCP queries for design system knowledge. Knowledge bases supplement with searchable source access for deep dives.

---

### MCP Query Reference

### Application MCP (component and token queries)

| Query | Purpose |
|-------|---------|
| `get_component_catalog()` | List all components with summary |
| `find_components({ context, purpose, platform })` | Search by context or purpose |
| `get_component_full({ name })` | Complete metadata, contracts, tokens |
| `get_component_summary({ name })` | Quick summary |
| `get_prop_guidance({ component })` | Family selection guidance |
| `get_experience_pattern({ name })` | Assembly pattern with steps |
| `list_experience_patterns()` | All available patterns |
| `get_layout_template({ name })` | Page layout guidance |
| `list_layout_templates()` | All available templates |
| `validate_assembly({ assembly })` | Validate a component tree |
| `check_composition({ parent, child })` | Check parent-child compatibility |
| `search_tokens({ family?, tier?, name? })` | Find tokens by family, tier, or name |
| `get_token_details({ name })` | Full token: value, family, platforms, formula, theme-varying status, consumers |
| `get_token_family({ family })` | All tokens in a family with values and relationships |
| `get_token_consumers({ token })` | Components that reference a token |
| `get_design_philosophy()` | The design system's creative north star, aesthetic philosophy, and key characteristics |
| `get_design_rules()` | Named design rules as structured data (name, constraint, rationale) |
| `get_design_guidance({ category? })` | Design do's and don'ts as categorized directives |
| `get_color_strategy({ tier? })` | Color strategy vocabulary (Restrained/Committed/Full/Drenched) with usage guidance |
| `get_component_health()` | Index health status |
| `rebuild_index()` | Rebuild component + token index |

### Docs MCP (steering doc queries)

| Query | Purpose |
|-------|---------|
| `find_docs({ concept })` / `find_docs({ list: true })` | Discover docs by concept, or list all (paginated) |
| `get_document_summary({ path })` | Document outline (~200 tokens) |
| `get_document_full({ path })` | Complete document content |
| `get_section({ path, heading })` | Specific section by heading |
| `list_cross_references({ path })` | Cross-references in a document |
| `get_index_health()` | Index health status |
| `validate_metadata({ path })` | Check a document's required metadata fields |
| `rebuild_index()` | Rebuild the documentation index from scratch |

### Product MCP (product architecture queries)

| Query | Purpose |
|-------|---------|
| `get_product_overview()` | Product context, config, principles |
| `get_brand_context()` | Product brand identity: personality, voice, tone, anti-references, register |
| `list_experience_map({ status?, platform?, usesComponent?, usesDomainObject?, usesToken? })` | All verticals, flows, feature pages — enriched with `referencedComponents`, `referencedDomainObjects`, `blockedReasons`. Optional filters (all conjunctive). |
| `find_screens({ context?, status?, platform?, usesComponent?, usesDomainObject?, usesToken? })` | Discovery and impact analysis. Filters are conjunctive. `context` matches against screen type, name, and tags. Returns enriched screen summaries. |
| `get_screen_spec({ name, platform? })` | Full screen spec (optional platform filter). Includes `_componentGaps` for any components not found in the ecosystem catalog or product one-offs. |
| `get_screen_state_model({ screen })` | Returns the `state-model` section from a screen spec as-is, without the UI tree, accessibility, or UX direction. |
| `get_product_component({ name })` | Direct query for a product one-off component's schema and contracts, without fetching a full screen spec. |
| `get_domain_object({ name })` | Domain object definition + referencing screens |
| `find_principles({ keyword })` | Find design principles by keyword. Principles use YAML frontmatter with `keywords` array on markdown files. |
| `find_templates({ category?, usedBy? })` | Find product templates by category or by which screen uses them. Templates include `usedBy` arrays. |
| `list_product_templates()` | Product-specific layout and content patterns |
| `get_product_health()` | Index status, data counts, reverse index sizes, gap counts, warnings |
| `get_product_tokens({ category?, name?, platform?, promotionCandidate? })` | Product tokens, with resolved system token references |
| `rebuild_product_index()` | Re-index product data and rebuild all reverse indexes |

---

### Upgrading

After upgrading `@3fn/core` to a new version, run `sync`. It prints a report of everything DesignerPunk manages in your repo, compared with the installed package, before it changes anything:

```bash
# Report only (no modifications)
npx designerpunk sync --dry-run

# On a terminal: the report, then one confirmation
npx designerpunk sync

# Off a terminal (for example CI): the report, then apply without a prompt
npx designerpunk sync --apply
```

Coming from 14.x: follow the 15.0.0 release notes. `sync` converts the old `.kiro/sync-manifest.json` to `designerpunk.manifest.json`, and `sync --migrate-legacy --target=<cc|kiro>` removes what an earlier `init` copied and attaches the generated agent layer, in the same run.

### How Sync Works

1. Reads `designerpunk.manifest.json` at your repo root: what DesignerPunk wrote into your repo, and at which version.
2. Generates DesignerPunk's side of what it manages, for each target you have attached (the generated agent files, the managed region in `CLAUDE.md`, and DesignerPunk's own keys in your MCP configuration), and compares it with your files by content hash.
3. Classifies each item: **new**, **updated** (the package changed and you did not), **conflict** (you edited it), **deleted by you**, **removed from the package**, **never recorded**, or **unchanged**.
4. Prints the report. Nothing is written until you confirm on a terminal or pass `--apply`.
5. Updates the manifest. Commit it: it is the baseline your teammates' `sync` compares against.

`sync` never writes your token source (`src/tokens`) or your own components. When an updated component needs a token your set does not have, it tells you (section 5) and you decide.

### Conflict Resolution

A file you edited that also changed in the package is a **conflict**. `sync` never overwrites it. The report lists it, and you choose per path:
- keep your version: do nothing
- replace it with the package version: `npx designerpunk sync --overwrite <path>`

A file you deleted that DesignerPunk generated earlier is reported, and comes back only with `npx designerpunk sync --restore <path>`. `--accept-all` and `--force` are retired: `sync` prints a message that points to `--apply`.

### .designerpunkignore

To permanently exclude files from sync (files you have intentionally customized), list them in `.designerpunkignore`, which `init` creates. It uses `.gitignore` syntax:

```gitignore
# .designerpunkignore — uses .gitignore syntax
.claude/agents/ada.md
.kiro/agents/ada.json
```

Agents you write yourself are never managed and need no entry.

### CI/CD Integration

Off a terminal, `sync` reports and writes nothing unless you pass `--apply`:

```bash
npx designerpunk sync --apply  # Applies the updates without prompting. Conflicts and deleted files still need --overwrite <path> and --restore <path>.
```

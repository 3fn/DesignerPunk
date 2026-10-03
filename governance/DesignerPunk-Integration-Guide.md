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

This release is ready for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input, so don't start a native product on this release. On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output yet; light and dark mode work.

## Prerequisites

These come before anything you type. None of them is a step.

| Prerequisite | Why | Minimum version |
|---|---|---|
| Node.js | The CLI, the token pipeline and the MCP servers run on it | 18+ (22+ recommended) |
| npm | Installs `@3fn/core` from the public npm registry; no `.npmrc` and no access token are needed | 9+ |
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

**The asymmetry is intended.** After an update, a component may look different while your colours do not, because the components are ours to improve and the tokens are yours to change. If an updated component needs a token your set does not have, `sync` tells you (section 5).

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
- **One theme block is baked in**: `data-theme="wcag"`. It ships in DesignerPunk's base CSS and is generated into yours.
  ```html
  <div data-theme="wcag">
    <!-- DesignerPunk components inside use the WCAG theme's values -->
  </div>
  ```
- **A theme you register in `designerpunk.config.ts` does not yet produce a `[data-theme="<name>"]` block in any generated CSS.** A custom `data-theme` value resolves against nothing yet.

The full import list is in § Available Imports, below.

### iOS

**Native onboarding is not supported.** The shipped SwiftUI components are reference source, not a build input: they read a theme surface (`@Environment(\.dpTheme)`, `any DesignerPunkTheme`) under names fixed to DesignerPunk's own configuration, which no shipped file defines and your `npx designerpunk generate` does not emit; the package has no Swift package manifest; and `ContainerCardBase.ios.swift` does not parse.

What the package ships for iOS, and why it does not add up to a target yet:
- `node_modules/@3fn/core/dist/DesignTokens.ios.swift` is DesignerPunk's **un-themed base snapshot**, generated from DesignerPunk's own configuration, not yours.
- `node_modules/@3fn/core/dist/ComponentTokens.ios.swift` is DesignerPunk's **component token tier**. The shipped components require it.
- Native token output omits the **14 theme-varying semantic colours**, among them `colorActionPrimary` and `colorStructureCanvas`.
- Nine of the shipped components also spell the theme read as `@Environment(.dpTheme)`, without the key-path backslash.

This was checked by reading the source, and the parse failure was reproduced with the Swift compiler's parse step. No iOS build was run. Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit). iOS onboarding is a planned follow-up (Spec 129).

### Android

Android: reference source, not a build input. The Compose components under `src/components/core/*/platforms/android/` read their theme from `LocalDPTheme`, which nothing in this package defines and `generate` does not emit today, and there is no Gradle module. Native onboarding is not supported. This was checked by reading the source; no Android build has been run.

What the package ships for Android, and why it does not add up to a target yet:
- `node_modules/@3fn/core/dist/DesignTokens.android.kt` is DesignerPunk's **un-themed base snapshot**, generated from DesignerPunk's own configuration, not yours.
- `node_modules/@3fn/core/dist/ComponentTokens.android.kt` is DesignerPunk's **component token tier**. The shipped components require it.
- Native token output omits the same **14 theme-varying semantic colours**.

Platform requirements, for reference: the Compose BOM must be compatible with the component implementations. Android onboarding is a planned follow-up (Spec 129).

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

**To own one component**, put your version in your repo's `src/components/` under the component's name. Yours wins on its name, and every other component continues to come from the package.

**To own the engine too**, clone `github.com/3fn/DesignerPunk`. `init` already made the token language yours; the clone adds the engine and the components.

---

## Setup Loop

### 1. Install

GitHub Packages requires authentication. Create a `.npmrc` in your project root:

```
@designerpunk:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Set `GITHUB_TOKEN` as an environment variable with a personal access token that has `read:packages` scope. Then install:

```bash
npm install @3fn/core
```

### 2. Configure

Create `designerpunk.config.ts` at your project root:

```typescript
import { defineConfig } from '@3fn/core/config';

export default defineConfig({
  name: 'MyProduct',        // → generated type names (MyProductTheme)
  abbreviation: 'MP',       // → environment keys (MPThemeKey)
  output: './dist/tokens'   // → where generated token files land
});
```

For custom theming, add a theme:

```typescript
import { defineConfig } from '@3fn/core/config';
import { myOverrides } from './themes/my-theme/SemanticOverrides';

export default defineConfig({
  name: 'MyProduct',
  abbreviation: 'MP',
  // Token attribute: defaults to "data-theme".
  // If your product uses "data-theme" for another purpose,
  // this can be made configurable in a future version.
  themes: [
    { name: 'my-theme', mode: 'dark', overrides: myOverrides }
  ],
  tokenSource: './src/tokens',        // local token source (omit to use package defaults)
  componentTokens: ['./components'],  // product component tokens (if any)
  output: './dist/tokens'
});
```

If no config file exists, the pipeline uses defaults.

#### Token Source Configuration

By default, the pipeline reads token definitions from the installed `@3fn/core` package. If your product maintains local token source (for customization or contribution back to core), set `tokenSource`:

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
- Theme overrides are independent of `tokenSource` — they always resolve from the config's `themes` array
- `npx designerpunk init` copies a complete token source to `src/tokens/` automatically

**When to use `tokenSource`:**
- You're iterating on token values locally before contributing back to core
- You need product-specific primitive token customizations
- You want `npx designerpunk validate` to check your local edits

**When NOT to use `tokenSource`:**
- You only consume published tokens without modification (use the package default)
- You only need theme overrides (use the `themes` config instead)

#### Creating a Theme

A theme is a `SemanticOverrideMap` — a record of semantic token names mapped to replacement primitive references. Create a file in your product repo:

```typescript
// themes/marketing/SemanticOverrides.ts
import type { SemanticOverrideMap } from '@3fn/core/config';

export const marketingOverrides: SemanticOverrideMap = {
  // Swap action color from default cyan to teal
  'color.action.primary': { primitiveReferences: { value: 'teal400' } },
  'color.action.navigation': { primitiveReferences: { value: 'teal500' } },

  // Adjust surface for darker feel
  'color.structure.surface': { primitiveReferences: { value: 'black200' } },
};
```

**How to find which tokens to override:**
1. Query available semantic tokens: `search_tokens({ tier: "semantic", family: "color" })`
2. Get details on a specific token: `get_token_details({ name: "color.action.primary" })`
3. Browse primitive options: `get_token_family({ family: "color" })`

Each override replaces the `primitiveReferences` entirely — no partial merge. Only override tokens you want to change; everything else inherits from the base theme.

**Theme modes:**
- `mode: 'dark'` — dark-only theme (sets `color-scheme: dark` on web, dark theme struct on iOS/Android)
- `mode: 'light'` — light-only theme
- `mode: 'both'` — generates both light and dark contexts (not yet supported in M0a)

### 3. Start MCP Servers

```bash
npx designerpunk mcp:app      # Application MCP — component + token queries
npx designerpunk mcp:docs     # Docs MCP — steering doc queries
npx designerpunk mcp:product  # Product MCP — screen specs, domain objects, product architecture
```

All commands resolve data paths from the installed package automatically. No configuration needed for the default case. The Product MCP starts with empty data if no `product/` directory exists yet — that's expected for a new project. Create the directory when you're ready to write screen specs (see "Product MCP Setup" below).

**Data freshness is automatic.** MCP servers detect stale data and rebuild before responding (30-second threshold gate). If you edit product YAML, component schemas, or steering docs, the next query will serve fresh data automatically. No manual health checks or `rebuild_index` calls needed during normal operation.

On startup, each server prints its connection details:
```
DesignerPunk Application MCP started
  Protocol: stdio
  Data: [resolved path to component data]
  Ready for connections
```

### 4. Configure Agent Connections

Your Kiro agents need two things to connect to the MCP servers: a configuration file telling them how to reach the servers, and agent prompt files telling them what their role is.

#### 4a. Configure MCP server connections

Create `.kiro/settings/mcp.json` at your project root (Kiro reads this file on agent session startup to discover MCP servers):

```json
{
  "mcpServers": {
    "designerpunk-docs": {
      "command": "node",
      "args": [
        "./node_modules/@3fn/core/dist/mcp/docs-mcp.js"
      ],
      "env": {
        "MCP_STEERING_DIR": "./node_modules/@3fn/core/governance"
      },
      "disabled": false,
      "autoApprove": [
        "find_docs",
        "get_document_summary",
        "get_document_full",
        "get_section",
        "list_cross_references",
        "validate_metadata",
        "get_index_health",
        "rebuild_index"
      ]
    },
    "designerpunk-application": {
      "command": "node",
      "args": [
        "./node_modules/@3fn/core/dist/mcp/application-mcp.js"
      ],
      "env": {
        "COMPONENTS_DIR": "./src/components",
        "PATTERNS_DIR": "./node_modules/@3fn/core/experience-patterns",
        "TEMPLATES_DIR": "./node_modules/@3fn/core/layout-templates",
        "GUIDANCE_DIR": "./node_modules/@3fn/core/family-guidance",
        "REGISTRY_PATH": "./node_modules/@3fn/core/family-registry.yaml",
        "TOKEN_INDEX_DIR": "./token-index"
      },
      "disabled": false,
      "autoApprove": [
        "get_component_catalog",
        "get_component_summary",
        "get_component_full",
        "find_components",
        "validate_component",
        "get_component_health"
      ]
    }
  }
}
```

**This configuration uses direct-node invocation** — Kiro spawns the MCP server binaries directly from `node_modules/@3fn/core/dist/mcp/`, rather than going through the `npx designerpunk mcp:*` CLI wrappers. The direct path is more reliable for MCP protocol handshake over stdio.

**After saving `.kiro/settings/mcp.json`, restart your Kiro agent session** — agent sessions read the MCP config on startup; existing sessions won't pick up new servers or env var changes until restarted. A `rebuild_index` alone is NOT sufficient if you've changed directory paths — the server process must be restarted to read the new environment.

Once the agent session reconnects, it should show `designerpunk-docs` and `designerpunk-application` as connected MCP servers. If either reports connection failure, verify:
- `node_modules/@3fn/core/dist/mcp/` contains the bundled server files (they should ship with the package)
- Your `@3fn/core` install completed without errors
- Paths in `mcp.json` resolve from your project root

> **Template source**: this configuration is the canonical template shipped with `@3fn/core` at `src/cli/templates/mcp-config.json.template`. If you've run `npx designerpunk init`, the file was scaffolded automatically using this template. If you're configuring manually (or init skipped the file because it already existed), copy the JSON above.

#### 4b. Set up agent prompts

The agent prompts are generated for your harness, not copied by hand. `npx designerpunk init` emits them for the default target. To add another target, or to wire a repo that `init` did not create, run:

```bash
npx designerpunk attach --target=<cc|kiro>
```

`attach` will attach a harness (agents + MCP config + approvals), for one target. It is safe to re-run. To read DesignerPunk without becoming it (MCP config and approvals only, no agents), add `--reference`:

```bash
npx designerpunk attach --target=<cc|kiro> --reference
```

After `attach` finishes, restart your agent session so it picks up the MCP servers.

### 5. Verify — Explore the Component Catalog

With MCP servers running, verify the ecosystem is working by querying the component catalog:

```
get_component_catalog()
```
→ Should return all 34 production components with names, types, families, and readiness.

```
find_components({ context: "forms" })
```
→ Should return form-relevant components (Input-Text-Base, Button-CTA, etc.)

```
list_experience_patterns()
```
→ Should return all 9 experience patterns (simple-form, settings, onboarding, etc.)

```
get_experience_pattern({ name: "simple-form" })
```
→ Should return the simple form assembly pattern with steps, components, and roles.

If these queries return results, the ecosystem is working.

### 6. Generate Tokens

```bash
npx designerpunk generate
```

The pipeline shows where tokens are being read from:
```
📦 MyProduct (MP)
   Tokens: ./src/tokens  (local)
   Output: ./dist/tokens
   Themes: my-theme (dark)
```

The `(local)` annotation means tokens resolve from your configured `tokenSource` path. If `tokenSource` is omitted, you'll see `(package)` — meaning tokens come from the installed `@3fn/core` package.

**Generate options:**

| Flag | Effect |
|------|--------|
| `--force` | Skip staleness detection, always regenerate product tokens |
| `--product-only` | Skip system token pipeline, regenerate product tokens only (uses existing `token-index/`) |

```bash
# Fast iteration on product tokens only
npx designerpunk generate --product-only

# Force full regeneration
npx designerpunk generate --force
```

Product token generation automatically detects staleness — if your YAML source files haven't changed since the last build, generation is skipped with a log message. Use `--force` to override.

To validate token definitions without generating files:
```bash
npx designerpunk validate
```

This checks semantic reference integrity, required fields, mathematical relationships, and family membership. Run it after editing token source files to catch errors before generation.

Produces platform token files in your configured output directory:
- `DesignTokens.web.css` — CSS custom properties
- `DesignTokens.ios.swift` — Swift constants (no theme surface yet; see "iOS and Android" under step 7)
- `DesignTokens.android.kt` — Kotlin constants (no theme surface yet; see "iOS and Android" under step 7)
- `ComponentTokens.web.css` / `.ios.swift` / `.android.kt` — component tokens
- `DesignTokens.dtcg.json` — DTCG standard format
- `DesignTokens.figma.json` — Figma Variables format
- `token-index/` — structured YAML index (primitives, semantics, components) loaded by the Application MCP for token queries

**In 15.0.0, a custom theme you register does not yet change this output.**
- Web: no `[data-theme="<name>"]` block is generated.
- iOS/Android: no theme structs or instances are generated.

The web output carries DesignerPunk's base light/dark values and the baked `data-theme="wcag"` block. Theme emission is delivered by the consumer-generation completeness spec (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`).

### Platform Dependencies for OKLCH Color Output

The color system uses OKLCH format. Platform-specific dependencies are needed for native color rendering:

| Platform | Dependency | Purpose | Install |
|----------|-----------|---------|---------|
| **Web** | None | CSS `oklch()` is native (Chrome 111+, Safari 15.4+, Firefox 113+) | — |
| **iOS** | [ChromaKit](https://github.com/HarshilShah/ChromaKit) | `Color.oklch(L, C, H)` API | Swift Package Manager |
| **Android** | [colormath](https://github.com/ajalt/colormath) | `Oklch(L, C, H).toComposeColor()` | Gradle dependency |

`npx designerpunk init` scaffolds these dependencies in platform-specific config files. If upgrading from a pre-OKLCH version, `npx designerpunk sync` will flag the new dependency requirements.

### 7. Build Your Product

#### Web

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

**Themes, in this version:**
- **Dark mode** follows the user's preferred colour scheme, through CSS `light-dark()`. Set `color-scheme` on an element to force light or dark.
- **One theme block is baked in**: `data-theme="wcag"`. It ships in DesignerPunk's base CSS and is generated into yours.
  ```html
  <div data-theme="wcag">
    <!-- DesignerPunk components inside use the WCAG theme's values -->
  </div>
  ```
- **A theme you register in `designerpunk.config.ts` does not yet produce a `[data-theme="<name>"]` block in any generated CSS.** A custom `data-theme` value resolves against nothing in 15.0.0. Theme emission is delivered by the consumer-generation completeness spec (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`).

#### iOS and Android (not supported for onboarding in 15.0.0)

**Native onboarding is not supported in 15.0.0.** The package ships DesignerPunk's native component sources and token files, but in this version they do not form a target that compiles in your app:

- `node_modules/@3fn/core/dist/DesignTokens.ios.swift` and `node_modules/@3fn/core/dist/DesignTokens.android.kt` are DesignerPunk's **un-themed base snapshot**. They are generated from DesignerPunk's own configuration, not yours.
- `node_modules/@3fn/core/dist/ComponentTokens.ios.swift` and `node_modules/@3fn/core/dist/ComponentTokens.android.kt` are DesignerPunk's **component token tier**. The shipped components require them.
- The shipped iOS and Android components (`node_modules/@3fn/core/src/components/core/*/platforms/ios/` and `.../platforms/android/`) also read a **theme surface**: `@Environment(\.dpTheme)` on iOS and `LocalDPTheme.current` on Android. **Neither the base files nor your own `npx designerpunk generate` emits that theme surface in this version.**
- Native token output omits the **14 theme-varying semantic colours**, among them `colorActionPrimary` and `colorStructureCanvas`. Four of them were present in 14.1.0's base files and are absent from 15.0.0's:
  - Swift: `colorFeedbackSuccessText`, `colorTextDefault`, `colorTextMuted`, `colorTextSubtle`;
  - Kotlin: `color_feedback_success_text`, `color_text_default`, `color_text_muted`, `color_text_subtle`.

Copying these files into an Xcode project or an Android module therefore does not yield a compiling target.

Native onboarding is delivered by the consumer-generation completeness spec (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md`). It covers three things: the theme surface, DesignerPunk's component tier harvested by your own `generate`, and per-platform output paths.

Platform requirements, for reference: **iOS 17.0+** (SwiftUI, UIKit). On Android, the Compose BOM must be compatible with the component implementations.

---

## Running Component Tests

Product repos can run the same component tests that ship with `@3fn/core`. The package provides a Jest preset and shared test utilities — you extend the preset with one line and install 4 devDependencies.

### Setup

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
    "module": "commonjs",
    "moduleResolution": "bundler",
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

### Running Tests

```bash
npx jest                          # Run all tests
npx jest src/components/          # Run your own component tests, once you've added some
npx jest --testPathPattern=Button # Run tests matching "Button"
```

### Shared Test Utilities

Import from `@3fn/core/testing`:

```typescript
import {
  registerComponent,
  createComponentFixture,
  cleanupDOM,
  waitForShadowDOM,
  setupTokenProperties,
  cleanupTokenProperties,
} from '@3fn/core/testing';
```

**Minimal working test example:**

```typescript
/** @jest-environment jsdom */
import { registerComponent, createComponentFixture, cleanupDOM, waitForShadowDOM } from '@3fn/core/testing';
import { ButtonCTA } from '../platforms/web/ButtonCTA.web';

registerComponent('button-cta', ButtonCTA);

describe('Button-CTA', () => {
  afterEach(() => cleanupDOM());

  it('renders with label', async () => {
    const { element, cleanup } = createComponentFixture('button-cta', { label: 'Click me' });
    await waitForShadowDOM(element);

    const button = element.shadowRoot!.querySelector('button');
    expect(button).not.toBeNull();
    expect(button!.textContent).toContain('Click me');

    cleanup();
  });
});
```

### Stemma Validators

For `.stemma.test.ts` pattern tests (naming, token usage, accessibility validation):

```typescript
import { validateComponentName, validateTokenUsage } from '@3fn/core/testing';
```

These run static analysis against component schemas and source — no DOM required.

### Notes

- The preset defaults to `jsdom` environment. All web component tests run in jsdom automatically.
- `jest-environment-jsdom` is required — without it, DOM APIs are unavailable.
- `@types/node` is required for contract tests that read CSS source from disk (the style-mock returns `''` for CSS imports, so filesystem reads are needed to verify CSS content).
- If tests fail after updating `@3fn/core`, re-run `npx designerpunk init` to refresh component source. Stale source (from an older init) may cause test failures.

---

## Native Platform Sync — Target Model (M0b)

For M0b, the manual copy process will be replaced by CLI commands:

```bash
npx designerpunk sync:ios      # Copy all iOS files to configured Xcode project path
npx designerpunk sync:android  # Copy all Android files to configured Gradle module path
```

Configured via `designerpunk.config.ts`:
```typescript
export default defineConfig({
  // ...
  platforms: {
    ios: './MyProduct/DesignerPunk/',
    android: './app/src/main/java/com/myproduct/designerpunk/'
  }
});
```

Runs automatically as part of `npx designerpunk generate` when platform paths are configured.

---

## Available Imports

| Import Path | What You Get |
|-------------|-------------|
| `@3fn/core` | All 34 web components (ESM bundle) |
| `@3fn/core/components` | Same (alias) |
| `@3fn/core/tokens.css` | DesignerPunk's base design tokens as CSS custom properties: the zero-config evaluation path. After `generate`, use your own `DesignTokens.web.css` instead (see step 7, Build Your Product) |
| `@3fn/core/component-tokens.css` | DesignerPunk's component-level tokens as CSS custom properties (required on every path) |
| `@3fn/core/config` | `defineConfig` function with TypeScript types |
| `@3fn/core/blend` | Blend calculation utilities |
| `@3fn/core/grid.css` | Responsive grid CSS |
| `@3fn/core/fonts/figtree.css` | Figtree font family (body/UI) |
| `@3fn/core/fonts/commit-mono.css` | Commit Mono font family (code/mono) |
| `@3fn/core/fonts/rajdhani.css` | Rajdhani font family (display) |

---

## Product MCP Setup

### Starting the Product MCP

```bash
npx designerpunk mcp:product
```

Resolves product data from:
1. `PRODUCT_DIR` env var (if set)
2. `designerpunk.config.ts` product data path (if configured)
3. `./product/` relative to cwd (default)

Starts with empty data if no product directory exists (warning, not error).

**Component gap detection** reads `component-meta.yaml` files to validate component references in screen specs. Configure the component source directory:
- `COMPONENT_DIR` env var (if set)
- Default: `src/components` (your own component directory, once you've added components)

**In a product repo** (where DesignerPunk is installed as a package), set `COMPONENT_DIR` to point into the installed package's own components instead — useful for validating screen-spec references against DesignerPunk's own component set rather than your own:
```bash
COMPONENT_DIR=./node_modules/@3fn/core/src/components/core npx designerpunk mcp:product
```
Or add it to your MCP server configuration so it's set automatically on startup.

If `COMPONENT_DIR` is missing or empty, gap detection is disabled (all components pass). No crash.

### Product Data Directory

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

**Generation** — `npx designerpunk generate` produces:
- `dist/product/ProductTokens.web.css` (CSS custom properties)
- `dist/product/ProductTokens.ios.swift` (Swift constants)
- `dist/product/ProductTokens.android.kt` (Kotlin objects)

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
        padding: space.inset.normal
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
    padding: space.inset.normal
  children:                       # Optional. Array of child nodes. Traversed recursively.
    - component: ChildComponent
      props: { ... }
      tokens: { ... }
  repeat: "for-each item in data.items"  # Optional. List rendering. NOT indexed.
```

| Field | Type | Required | Indexed By |
|-------|------|----------|------------|
| `component` | string | Yes | Reverse index (component→screens), gap detector |
| `props` | object | No | Not indexed |
| `tokens` | object (string keys, string values) | No | Reverse index (token→screens) |
| `children` | array of nodes | No | Traversed recursively |
| `repeat` | string | No | Not indexed |

**What the indexer does per node**: reads `component` → adds to reverse index + checks gap detector. Reads `tokens` → adds each value to token reverse index. Recurses into `children`. Ignores everything else.

**What the indexer ignores**: `props` values are never treated as token references. Unknown nesting keys (anything other than `children`) are not traversed.

#### Platform Branching in UI Trees

```yaml
ui-tree:
  shared:                         # Always traversed
    - component: Nav-Header-App
  ios:                            # Traversed only when platform=ios requested
    - component: Button-CTA       # Node array → traversed
  web:
    navigation: client-side route  # Metadata object → NOT traversed
```

- `shared` is always traversed for reverse indexes.
- Platform branches (`ios`, `android`, `web`) are traversed only when they contain node arrays (at least one object with a `component` field). Metadata objects are stored but not walked.
- Without a platform filter, reverse indexes reflect the `shared` tree only.

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

## Governance Gradient

| Tier | Artifacts | Review Depth | Who Governs |
|------|-----------|-------------|-------------|
| **Ecosystem** | Tokens, components, patterns, templates that shipped with `@3fn/core` | Full — contracts, metadata, multi-agent review, spec process | Ada (tokens), Lina (components), Thurgood (specs/tests) |
| **Product extending** | Product-created tokens, one-off components, product templates | Schema compliance, naming conventions, accessibility contracts for new behavior | Ada/Lina consulted, Stacy audits at synthesis |
| **Product internal** | Screen compositions, product-specific layouts, one-off styling | Minimal — does it work? does it use the ecosystem correctly? | Platform agents self-governed, Stacy spot-checks |

**Principle**: Governance weight scales with blast radius. Ecosystem artifacts that affect all products get full review. Product-specific artifacts that affect only this product get lighter review. When in doubt, consult the specialist.

**Promotion path**: When a product artifact proves reusable (a second product needs it, or it fills a gap in the ecosystem taxonomy), it gets promoted through the full spec process. The product version becomes the reference implementation. Full Stemma lifecycle applies at promotion, not at creation.

---

## CLI Commands

| Command | What It Does |
|---------|-------------|
| `npx designerpunk generate` | Run token pipeline with local `designerpunk.config.ts` |
| `npx designerpunk mcp:app` | Start Application MCP server (component/token queries) |
| `npx designerpunk mcp:docs` | Start Docs MCP server (steering doc queries) |
| `npx designerpunk mcp:product` | Start Product MCP server (screen specs, domain objects, product architecture) |

---

## Knowledge Base Setup

For agents using `/knowledge` in Kiro CLI, recommended indexes for a product repo:

| Knowledge Base | Path | Include | Purpose |
|---------------|------|---------|---------|
| product-source | `./src` | `**/*.ts`, `**/*.tsx` | Product source code |
| product-screens | `./specs` or `./screens` | `**/*.md` | Screen specifications |
| designerpunk-application | `node_modules/@3fn/core/src/components/core` | `**/*.ts`, `**/*.yaml` | Component source and metadata |

Agents primarily use MCP queries for design system knowledge. Knowledge bases supplement with searchable source access for deep dives.

---

## MCP Query Reference

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

### Product MCP (product architecture queries)

| Query | Purpose |
|-------|---------|
| `get_product_overview()` | Product context, config, principles |
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
| `rebuild_product_index()` | Re-index product data and rebuild all reverse indexes |

---

## Upgrading

> **Note (2026-10-02, ballot `2026-10-02-integration-guide-native-scoping`).** This section describes the `sync` flow from **before 15.0.0**: `--accept-all`, `.kiro/sync-manifest.json`, and `sync` updating tokens and components. 15.0.0 retired that flow.
>
> **For the current upgrade path, use 15.0.0's release notes:**
> - `sync` prints its report before changing anything, and converts the manifest to `designerpunk.manifest.json`.
> - `sync --migrate-legacy --target=<cc|kiro>` removes what an earlier `init` copied and attaches the generated agent layer, in the same run.
>
> Spec 123 Task 19.4 reconciles this section.

After upgrading `@3fn/core` to a new version, run `sync` to detect and apply package changes:

```bash
# Preview what changed (no modifications)
npx designerpunk sync --dry-run

# Interactive sync (governance auto-applies, source confirms, conflicts prompt)
npx designerpunk sync

# Factory reset — overwrite all files to match package (no prompts)
npx designerpunk sync --accept-all
```

### How Sync Works

1. Compares your project files against the installed `@3fn/core` package using content hashes
2. Classifies each file: **New**, **Updated** (safe to apply), **Conflict** (you edited it), or **Unchanged**
3. Applies changes using a two-tier model:
   - **Governance** (steering docs, agent configs): auto-applied without prompting
   - **Source** (tokens, components, types): requires your confirmation
4. Updates `.kiro/sync-manifest.json` (commit this to git — it tracks sync state for your team)

### Conflict Resolution

When a file you've edited also changed in the package, sync prompts:
- `[s]kip` — keep your version
- `[o]verwrite` — replace with the package version
- `[d]iff` — view a unified diff, then decide

### .designerpunkignore

To permanently exclude files from sync (files you've intentionally customized):

```gitignore
# .designerpunkignore — uses .gitignore syntax
.kiro/agents/custom-agent.md
src/tokens/MyCustomTokens.ts
```

### CI/CD Integration

In non-interactive environments, sync automatically runs in dry-run mode. Use `--accept-all` to apply changes in CI pipelines:

```bash
npx designerpunk sync --accept-all  # Applies all updates without prompting
```

### OKLCH Color Migration (v12+)

When upgrading to the OKLCH color system version:

1. **Run sync** — updates token source files from RGBA to OKLCH channel primitives
2. **Regenerate** — `npx designerpunk generate` produces OKLCH output (CSS `oklch()`, Swift ChromaKit, Kotlin colormath)
3. **Add platform dependencies** — iOS: ChromaKit via SPM. Android: colormath via Gradle.
4. **Product color tokens** — convert any `value:` color fields from RGB/hex to OKLCH format: `value: "oklch(0.65 0.24 10)"`. Use an online converter or ask Ada for batch conversion.
5. **Verify** — CSS custom property names are unchanged (`var(--pink-300)` still works). Only the values change format.

**Visual changes**: Palette refinements (teal, green, orange) and blend re-tuning produce intentional visual differences. See release notes for details.

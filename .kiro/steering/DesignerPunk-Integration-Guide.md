---
inclusion: manual
name: DesignerPunk-Integration-Guide
description: Everything a product developer needs to integrate DesignerPunk into a product repo
---

# DesignerPunk Integration Guide

**Date**: 2026-04-08
**Last Reviewed**: 2026-05-07
**Purpose**: Everything a product developer needs to integrate DesignerPunk into a product repo
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: product-development

---

## Prerequisites

| Prerequisite | Why | Minimum Version |
|-------------|-----|-----------------|
| Node.js | Pipeline, MCP servers, CLI | 18+ (22+ recommended) |
| npm | Install `@3fn/core` from GitHub Packages | 9+ |
| TypeScript | Theme overrides and config are TypeScript files | 5.0+ |

`tsx` (TypeScript execution) ships as a dependency of `@3fn/core` — no separate install needed.

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
  // Theme attribute: defaults to "data-theme".
  // If your product uses "data-theme" for another purpose,
  // this can be made configurable in a future version.
  themes: [
    { name: 'my-theme', mode: 'dark', overrides: myOverrides }
  ],
  componentTokens: ['./components'],  // product component tokens (if any)
  output: './dist/tokens'
});
```

If no config file exists, the pipeline uses defaults.

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
        "MCP_STEERING_DIR": "./node_modules/@3fn/core/.kiro/steering"
      },
      "disabled": false,
      "autoApprove": [
        "get_documentation_map",
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
        "COMPONENTS_DIR": "./node_modules/@3fn/core/src/components/core",
        "PATTERNS_DIR": "./node_modules/@3fn/core/experience-patterns",
        "TEMPLATES_DIR": "./node_modules/@3fn/core/layout-templates",
        "GUIDANCE_DIR": "./node_modules/@3fn/core/family-guidance",
        "REGISTRY_PATH": "./node_modules/@3fn/core/family-registry.yaml",
        "TOKEN_INDEX_DIR": "./node_modules/@3fn/core/token-index"
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

**After saving `.kiro/settings/mcp.json`, restart your Kiro agent session** — agent sessions read the MCP config on startup; existing sessions won't pick up the new servers until restarted.

Once the agent session reconnects, it should show `designerpunk-docs` and `designerpunk-application` as connected MCP servers. If either reports connection failure, verify:
- `node_modules/@3fn/core/dist/mcp/` contains the bundled server files (they should ship with the package)
- Your `@3fn/core` install completed without errors
- Paths in `mcp.json` resolve from your project root

> **Template source**: this configuration is the canonical template shipped with `@3fn/core` at `src/cli/templates/mcp-config.json.template`. If you've run `npx designerpunk init`, the file was scaffolded automatically using this template. If you're configuring manually (or init skipped the file because it already existed), copy the JSON above.

#### 4b. Set up agent prompts

If using the product agent template:
```bash
cp -r node_modules/@3fn/core/product-template/agents/ .kiro/agents/
```

Then customize `[CUSTOMIZE]` markers in each prompt file with your product name, human lead, and domain-specific context. See `product-template/agents/README.md` for details.

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

Produces platform token files in your configured output directory:
- `DesignTokens.web.css` — CSS custom properties
- `DesignTokens.ios.swift` — Swift constants + theme protocol
- `DesignTokens.android.kt` — Kotlin constants + theme data class
- `ComponentTokens.web.css` / `.ios.swift` / `.android.kt` — component tokens
- `DesignTokens.dtcg.json` — DTCG standard format
- `DesignTokens.figma.json` — Figma Variables format
- `token-index/` — structured YAML index (primitives, semantics, components) loaded by the Application MCP for token queries

If you registered a custom theme, the output includes themed values scoped by `data-theme` attribute (web) or as additional theme structs/instances (iOS/Android).

### 7. Build Your Product

#### Web

```typescript
// Import all web components
import '@3fn/core';
// or: import '@3fn/core/components';

// Import design tokens
import '@3fn/core/tokens.css';
import '@3fn/core/component-tokens.css';

// Optional: responsive grid, fonts, blend utilities
import '@3fn/core/grid.css';
import '@3fn/core/fonts/inter.css';
import '@3fn/core/fonts/rajdhani.css';
import { BlendCalculator } from '@3fn/core/blend';
```

For theming, set the `data-theme` attribute on any HTML element:
```html
<div data-theme="my-theme">
  <!-- All DesignerPunk components inside inherit themed values -->
</div>
```

Base theme applies at `:root` with no attribute. Dark-only themes automatically set `color-scheme: dark`.

#### iOS (M0a — Manual Copy)

1. Locate Swift files in the installed package:
   - `node_modules/@3fn/core/dist/DesignTokens.ios.swift`
   - `node_modules/@3fn/core/dist/ComponentTokens.ios.swift`
   - Component platform files: `node_modules/@3fn/core/src/components/core/*/platforms/ios/`
   - Blend utilities: `node_modules/@3fn/core/src/blend/ThemeAwareBlendUtilities.ios.swift`

2. Copy into your Xcode project's source tree

3. Requirements:
   - Minimum deployment target: **iOS 17.0+**
   - Required frameworks: **SwiftUI**, **UIKit**

4. Theme consumption:
   ```swift
   @Environment(\.{abbreviation}Theme) var theme
   // Use: theme.colorActionPrimary
   // Static tokens: DesignTokens.spaceInset100
   ```

**Note**: `npx designerpunk sync:ios` is planned for M0b to automate this process.

#### Android (M0a — Manual Copy)

1. Locate Kotlin files in the installed package:
   - `node_modules/@3fn/core/dist/DesignTokens.android.kt`
   - `node_modules/@3fn/core/dist/ComponentTokens.android.kt`
   - Component platform files: `node_modules/@3fn/core/src/components/core/*/platforms/android/`
   - Blend utilities: `node_modules/@3fn/core/src/blend/ThemeAwareBlendUtilities.android.kt`

2. Copy into your Android module's source tree

3. Requirements:
   - Compose BOM version compatibility with component implementations
   - If using R8/ProGuard: include synced Kotlin files in keep rules

4. Theme consumption:
   ```kotlin
   val theme = Local{Abbreviation}Theme.current
   // Use: theme.colorActionPrimary
   // Static tokens: DesignTokens.space_inset_100
   ```

**Note**: `npx designerpunk sync:android` is planned for M0b to automate this process.

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
| `@3fn/core/tokens.css` | Design tokens as CSS custom properties |
| `@3fn/core/component-tokens.css` | Component-level tokens as CSS custom properties |
| `@3fn/core/config` | `defineConfig` function with TypeScript types |
| `@3fn/core/blend` | Blend calculation utilities |
| `@3fn/core/grid.css` | Responsive grid CSS |
| `@3fn/core/fonts/inter.css` | Inter font family |
| `@3fn/core/fonts/rajdhani.css` | Rajdhani font family |

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
- Default: `src/components/core`

**In a product repo** (where DesignerPunk is installed as a package), set `COMPONENT_DIR` to point into the installed package:
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
```

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
| `get_documentation_map()` | All indexed documents |
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

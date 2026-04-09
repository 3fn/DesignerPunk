# DesignerPunk Integration Guide

**Date**: 2026-04-08
**Last Reviewed**: 2026-04-08
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
| npm | Install `@designerpunk/core` from GitHub Packages | 9+ |
| TypeScript | Theme overrides and config are TypeScript files | 5.0+ |

`tsx` (TypeScript execution) ships as a dependency of `@designerpunk/core` — no separate install needed.

---

## Setup Loop

### 1. Install

```bash
npm install @designerpunk/core --registry https://npm.pkg.github.com
```

### 2. Configure

Create `designerpunk.config.ts` at your project root:

```typescript
import { defineConfig } from '@designerpunk/core/config';

export default defineConfig({
  name: 'MyProduct',        // → generated type names (MyProductTheme)
  abbreviation: 'MP',       // → environment keys (MPThemeKey)
  output: './dist/tokens'   // → where generated token files land
});
```

For custom theming, add a theme:

```typescript
import { defineConfig } from '@designerpunk/core/config';
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

### 3. Start MCP Servers

```bash
npx designerpunk mcp:app    # Application MCP — component queries
npx designerpunk mcp:docs   # Docs MCP — steering doc queries
```

Both commands resolve data paths from the installed package automatically. No configuration needed for the default case.

On startup, each server prints its connection details:
```
DesignerPunk Application MCP started
  Protocol: stdio
  Data: [resolved path to component data]
  Ready for connections
```

### 4. Configure Agent Connections

Connect your Kiro agents to the running MCP servers using the connection details printed at startup.

If using the product agent template:
```bash
cp -r node_modules/@designerpunk/core/product-template/agents/ .kiro/agents/
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

If you registered a custom theme, the output includes themed values scoped by `data-theme` attribute (web) or as additional theme structs/instances (iOS/Android).

### 7. Build Your Product

#### Web

```typescript
// Import all web components
import '@designerpunk/core';
// or: import '@designerpunk/core/components';

// Import design tokens
import '@designerpunk/core/tokens.css';
import '@designerpunk/core/component-tokens.css';

// Optional: responsive grid, fonts, blend utilities
import '@designerpunk/core/grid.css';
import '@designerpunk/core/fonts/inter.css';
import '@designerpunk/core/fonts/rajdhani.css';
import { BlendCalculator } from '@designerpunk/core/blend';
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
   - `node_modules/@designerpunk/core/dist/DesignTokens.ios.swift`
   - `node_modules/@designerpunk/core/dist/ComponentTokens.ios.swift`
   - Component platform files: `node_modules/@designerpunk/core/src/components/core/*/platforms/ios/`
   - Blend utilities: `node_modules/@designerpunk/core/src/blend/ThemeAwareBlendUtilities.ios.swift`

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
   - `node_modules/@designerpunk/core/dist/DesignTokens.android.kt`
   - `node_modules/@designerpunk/core/dist/ComponentTokens.android.kt`
   - Component platform files: `node_modules/@designerpunk/core/src/components/core/*/platforms/android/`
   - Blend utilities: `node_modules/@designerpunk/core/src/blend/ThemeAwareBlendUtilities.android.kt`

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
| `@designerpunk/core` | All 34 web components (ESM bundle) |
| `@designerpunk/core/components` | Same (alias) |
| `@designerpunk/core/tokens.css` | Design tokens as CSS custom properties |
| `@designerpunk/core/component-tokens.css` | Component-level tokens as CSS custom properties |
| `@designerpunk/core/config` | `defineConfig` function with TypeScript types |
| `@designerpunk/core/blend` | Blend calculation utilities |
| `@designerpunk/core/grid.css` | Responsive grid CSS |
| `@designerpunk/core/fonts/inter.css` | Inter font family |
| `@designerpunk/core/fonts/rajdhani.css` | Rajdhani font family |

---

## CLI Commands

| Command | What It Does |
|---------|-------------|
| `npx designerpunk generate` | Run token pipeline with local `designerpunk.config.ts` |
| `npx designerpunk mcp:app` | Start Application MCP server (component queries) |
| `npx designerpunk mcp:docs` | Start Docs MCP server (steering doc queries) |

---

## Knowledge Base Setup

For agents using `/knowledge` in Kiro CLI, recommended indexes for a product repo:

| Knowledge Base | Path | Include | Purpose |
|---------------|------|---------|---------|
| product-source | `./src` | `**/*.ts`, `**/*.tsx` | Product source code |
| product-screens | `./specs` or `./screens` | `**/*.md` | Screen specifications |
| designerpunk-components | `node_modules/@designerpunk/core/src/components/core` | `**/*.ts`, `**/*.yaml` | Component source and metadata |

Agents primarily use MCP queries for design system knowledge. Knowledge bases supplement with searchable source access for deep dives.

---

## MCP Query Reference

### Application MCP (component queries)

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
| `get_component_health()` | Index health status |
| `rebuild_index()` | Rebuild component index |

### Docs MCP (steering doc queries)

| Query | Purpose |
|-------|---------|
| `get_documentation_map()` | All indexed documents |
| `get_document_summary({ path })` | Document outline (~200 tokens) |
| `get_document_full({ path })` | Complete document content |
| `get_section({ path, heading })` | Specific section by heading |
| `list_cross_references({ path })` | Cross-references in a document |
| `get_index_health()` | Index health status |

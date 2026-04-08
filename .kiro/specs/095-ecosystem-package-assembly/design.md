# Design Document: Ecosystem Package Assembly

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Status**: Design Phase
**Dependencies**: Spec 094 (complete)

---

## Overview

This spec transforms the DesignerPunk repo into a publishable npm package (`@designerpunk/core`) that ships the full design system ecosystem. Two workstreams: WS2 restructures `package.json` and validates the package, WS6 produces agent configuration templates and documentation for product context.

---

## Architecture

### Package Structure

```
@designerpunk/core/
├── src/                          # TypeScript source (pipeline runtime via tsx)
│   ├── tokens/                   # Token definitions
│   ├── generators/               # Platform output generators
│   ├── resolvers/                # Semantic override resolution
│   ├── registries/               # Token and component registries
│   ├── validators/               # Semantic validation
│   ├── themes/                   # ThemeRegistry
│   ├── types/                    # PrimitiveToken, SemanticToken, etc.
│   ├── providers/                # Platform-specific format generators
│   ├── naming/                   # PlatformNamingRules
│   ├── blend/                    # BlendCalculator, platform utilities
│   ├── build/tokens/             # defineComponentTokens
│   ├── config/                   # defineConfig, ConfigLoader
│   ├── cli/                      # CLI entry point
│   ├── tools/release/            # Release analysis tooling
│   ├── styles/                   # Responsive grid CSS
│   ├── assets/fonts/             # Inter, Rajdhani
│   ├── components/core/          # 34 components (all platforms, tests, metadata)
│   └── __tests__/                # Cross-cutting governance tests
├── dist/                         # Compiled outputs
│   ├── browser/                  # ESM bundle (designerpunk.esm.js, .min.js only)
│   ├── config/                   # Compiled defineConfig + types (NEW — needs build step)
│   ├── cli/                      # Compiled CLI
│   ├── blend/                    # Compiled blend utilities
│   ├── DesignTokens.web.css      # Generated web tokens
│   ├── DesignTokens.ios.swift    # Generated iOS tokens
│   ├── DesignTokens.android.kt   # Generated Android tokens
│   ├── ComponentTokens.*         # Generated component tokens (3 platforms)
│   ├── DesignTokens.dtcg.json    # DTCG format
│   └── DesignTokens.figma.json   # Figma format
├── .kiro/
│   ├── steering/                 # All steering docs (Docs MCP data)
│   └── agents/                   # All 8 agent prompts
├── mcp-server/                   # Docs MCP server
├── application-mcp-server/       # Application MCP server
├── family-guidance/              # Family selection guidance (App MCP data)
├── experience-patterns/          # Assembly patterns (App MCP data)
├── layout-templates/             # Page layout guidance (App MCP data)
├── family-registry.yaml          # Canonical family names
├── browser-entry.ts              # ESM bundle source (34 component registrations)
├── designerpunk.config.ts        # Default config (DesignerPunk repo)
└── package.json                  # @designerpunk/core
```

### Consumer Import Paths

```typescript
// Web components (root or explicit)
import '@designerpunk/core';
import '@designerpunk/core/components';

// Tokens
import '@designerpunk/core/tokens.css';
import '@designerpunk/core/component-tokens.css';

// Config API (TypeScript type-checked)
import { defineConfig } from '@designerpunk/core/config';

// Blend utilities
import { BlendCalculator } from '@designerpunk/core/blend';

// CSS assets
import '@designerpunk/core/grid.css';
import '@designerpunk/core/fonts/inter.css';
import '@designerpunk/core/fonts/rajdhani.css';
```

### CLI Commands

```bash
npx designerpunk generate      # Run token pipeline with local config
npx designerpunk mcp:app       # Start Application MCP (zero-config)
npx designerpunk mcp:docs      # Start Docs MCP (zero-config)
```

MCP commands resolve data paths from the installed package via `require.resolve('@designerpunk/core/package.json')`. Print connection details on startup.

---

## Components and Interfaces

### package.json Changes

```json
{
  "name": "@designerpunk/core",
  "version": "10.2.0",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/browser/designerpunk.esm.js",
      "types": "./dist/browser-entry.d.ts"
    },
    "./components": {
      "import": "./dist/browser/designerpunk.esm.js",
      "types": "./dist/browser-entry.d.ts"
    },
    "./tokens.css": "./dist/DesignTokens.web.css",
    "./component-tokens.css": "./dist/ComponentTokens.web.css",
    "./config": {
      "import": "./dist/config/index.js",
      "types": "./dist/config/index.d.ts"
    },
    "./blend": {
      "import": "./dist/blend/index.js",
      "types": "./dist/blend/index.d.ts"
    },
    "./grid.css": "./src/styles/responsive-grid.css",
    "./fonts/inter.css": "./src/assets/fonts/inter/inter.css",
    "./fonts/rajdhani.css": "./src/assets/fonts/rajdhani/rajdhani.css"
  },
  "bin": {
    "designerpunk": "./dist/cli/designerpunk.js"
  },
  "files": [
    "src/",
    "!src/**/examples/",
    "dist/browser/designerpunk.esm.js",
    "dist/browser/designerpunk.esm.min.js",
    "dist/config/",
    "dist/cli/",
    "dist/blend/",
    "dist/DesignTokens.*",
    "dist/ComponentTokens.*",
    "dist/browser-entry.d.ts",
    "dist/TokenEngine.js",
    "dist/TokenEngine.d.ts",
    ".kiro/steering/",
    ".kiro/agents/",
    "mcp-server/",
    "application-mcp-server/",
    "family-guidance/",
    "experience-patterns/",
    "layout-templates/",
    "family-registry.yaml",
    "browser-entry.ts",
    "designerpunk.config.ts"
  ],
  "dependencies": {
    "tsx": "^4.x"
  }
}
```

**Note on `files` and `examples/` exclusion**: npm's `files` field does not support negation patterns. The `!src/**/examples/` entry above is aspirational. Implementation options: (a) use `.npmignore` for just the `examples/` exclusion while `files` handles the rest, (b) list `src/` subdirectories explicitly instead of `src/` as a whole, (c) accept that `examples/` ships (~1MB, harmless). Decision during implementation.

### Build Step: dist/config/

Add to the build pipeline:

```bash
# In package.json scripts
"build:config": "tsc --project tsconfig.config.json"
```

With a dedicated `tsconfig.config.json`:
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/config",
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/config/**/*.ts"]
}
```

This produces `dist/config/index.js`, `dist/config/index.d.ts`, `dist/config/defineConfig.js`, `dist/config/defineConfig.d.ts`, etc. Must run before `npm pack`. Sequencing: R4 completes before R3 AC 5 can be validated (Sparky R1 note).

### CLI MCP Commands

Extend the existing `src/cli/designerpunk.ts` with two new subcommands:

```typescript
// src/cli/designerpunk.ts — extended
case 'mcp:app':
  const pkgRoot = path.dirname(require.resolve('@designerpunk/core/package.json'));
  const componentsDir = path.join(pkgRoot, 'src/components/core');
  // Start Application MCP server with resolved paths
  // Print: protocol, data directory, ready status
  break;

case 'mcp:docs':
  const pkgRoot = path.dirname(require.resolve('@designerpunk/core/package.json'));
  const steeringDir = path.join(pkgRoot, '.kiro/steering');
  // Start Docs MCP server with resolved paths
  // Print: protocol, data directory, ready status
  break;
```

Zero-config: paths resolve from the package location. Config file can override data directories for products that add their own MCP data alongside the package's.

### Build-Time Validation Test

Single test file covering two drift categories:

```typescript
// src/__tests__/package-drift-validation.test.ts

describe('Package Drift Validation', () => {
  describe('Platform token references', () => {
    // Scan iOS .swift files for DesignTokens.* and theme.* references
    // Validate against generated DesignTokens.ios.swift + theme protocol properties
    // Scan Android .kt files for DesignTokens.* and theme.* references
    // Validate against generated DesignTokens.android.kt + theme data class properties
  });

  describe('ESM bundle registration', () => {
    // List all src/components/core/*/platforms/web/ directories
    // Parse browser-entry.ts for import statements
    // Assert every component with a web platform dir is imported
  });
});
```

---

## Agent Configuration Template

### Approach

Ship a `product-template/` directory (or equivalent) containing agent prompts pre-configured for the installed package context. Products copy this directory and customize.

Key differences from the repo prompts:
- MCP queries reference the package's steering docs (resolved via Docs MCP, not file paths)
- Knowledge base paths reference the package location (resolved via `require.resolve`)
- Product name, abbreviation, and domain-specific knowledge are placeholder values for customization

The template resolves package paths programmatically. For M0a (standard `node_modules`), direct path references work. The Integration Guide notes that path resolution may need to evolve for M0b (monorepo/workspace setups).

---

## Error Handling

| Error | When | Response |
|-------|------|----------|
| `npm pack` includes excluded files | Build validation | Fail CI with list of unexpected files |
| Export path doesn't resolve | Fresh-repo validation | Fail with the specific export and expected file |
| `dist/config/` missing | Build | Fail with "run build:config before pack" |
| MCP server can't find package data | `npx designerpunk mcp:app` | Fail with "cannot resolve @designerpunk/core — run npm install" |
| `browser-entry.ts` missing component | Validation test | Fail with component name and web platform directory |
| Platform file references non-existent token | Validation test | Fail with component, file, and invalid reference |

---

## Testing Strategy

### WS2: Package Assembly

**`files` field validation:**
- Run `npm pack --dry-run`, parse output, assert no excluded paths appear
- Assert all expected directories/files are present

**Export resolution:**
- In a temp directory, `npm install` the packed tarball
- For each export path, verify `require.resolve` or `import()` succeeds
- Verify the resolved file exists and is non-empty

**CLI validation:**
- `npx designerpunk generate` with a test config produces output
- `npx designerpunk mcp:app` starts and responds to a health check query
- `npx designerpunk mcp:docs` starts and responds to a document query

**ESM bundle:**
- Import the bundle, verify 34 custom elements are defined

**Build-time drift validation:**
- Platform token references (static + theme-aware patterns) resolve against generated output
- All web components registered in `browser-entry.ts`

### WS6: Agent Configuration

**Template validation:**
- Template prompts parse without errors
- Package path references resolve against the installed package
- MCP query examples in the Integration Guide return expected results

---

## Design Decisions

### Decision 1: Ship TypeScript Source for Pipeline

**Options Considered**: Compiled JS only, TypeScript source only, both
**Decision**: Both — `src/` for pipeline runtime (via `tsx`), `dist/` for consumer imports
**Rationale**: Token definitions are typed TypeScript objects. The entire pipeline chain imports them directly. Compiling to JS would lose the type information that generators depend on. Consumer-facing exports (`./config`, `./blend`, `./components`) ship as compiled JS with `.d.ts` for type checking.
**Trade-offs**: Larger package (~20-27MB). `tsx` as a runtime dependency.

### Decision 2: `files` Field (Allowlist)

**Options Considered**: `files` (allowlist), `.npmignore` (blocklist)
**Decision**: `files` field
**Rationale**: Explicit, auditable. New directories excluded by default. Can't accidentally ship specs, issues, or roadmap docs.
**Trade-offs**: Long `files` list. `examples/` exclusion may need `.npmignore` supplement since npm `files` doesn't support negation.

### Decision 3: ESM-Only Root Export

**Options Considered**: Dual CJS/ESM, ESM only
**Decision**: ESM only. Drop CJS `TokenEngine.js` condition.
**Rationale**: Pipeline doesn't `require()` the root. CJS and ESM conditions pointed to different APIs (dual-package hazard). M0a products use ESM.
**Trade-offs**: CJS consumers must use a bundler or import specific subpaths.

### Decision 4: CLI for MCP Startup

**Options Considered**: CLI commands, manual commands with paths, config-driven
**Decision**: CLI commands (`npx designerpunk mcp:app`, `mcp:docs`) with zero-config defaults. Config file as optional override.
**Rationale**: Product developers shouldn't construct `node_modules` paths manually. CLI resolves paths from the package location automatically.
**Trade-offs**: New CLI implementation work (R5 AC 2-3). Manual commands documented as escape hatch.

### Decision 5: Concrete Agent Template

**Options Considered**: Documentation only, concrete template prompts
**Decision**: Concrete template — products copy and customize
**Rationale**: Agent prompts encode governance (domain boundaries, collaboration protocols, quality standards). Shipping prompts that silently break in product context undermines the governance layer. A working template is more reliable than a guide explaining what to edit.
**Trade-offs**: Template maintenance — when repo prompts change, template needs updating.

---

## Integration Points

### Downstream

| Consumer | What | Interface |
|----------|------|-----------|
| Block C (MCP Infrastructure) | Package structure, data paths | MCP servers start from package via CLI |
| Phase 2 (marketing site) | Full package | `npm install @designerpunk/core` |
| Integration Guide | Setup documentation | Documents the package's consumption workflow |

### Upstream

| Provider | What | Interface |
|----------|------|-----------|
| Spec 094 (Block A) | Pipeline, config, CLI, theme registry | ✅ Complete |

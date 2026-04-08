# Spec 095: Ecosystem Package Assembly

**Date**: 2026-04-07
**Purpose**: Package DesignerPunk as `@designerpunk/core` — define what ships, how it's consumed, and how agents work in a product context
**Organization**: spec-guide
**Scope**: 095-ecosystem-package-assembly
**Status**: Design outline
**M0a Phase 1**: Block B (parallelizable with Block A — now complete)
**Primary Owners**: Lina (WS2), Thurgood (WS6)

---

## Problem Statement

Spec 094 made the token pipeline portable and the theme system extensible. But the pipeline, components, MCP data, and agent configurations aren't packaged for consumption. A product repo can't `npm install @designerpunk/core` yet — there's no `files` field, the `exports` map is incomplete, the CLI isn't in `bin`, and agent configurations assume the DesignerPunk repo structure.

This spec assembles everything into a publishable package and configures agents to work in a product context.

---

## Current State

### package.json

- **Name**: `designer-punk-v2` (needs to become `@designerpunk/core`)
- **Exports**: Only 4 entries (root, BlendUtilities, blend, tokens.css). Missing: `./config`, `./components`, `./component-tokens.css`, `./grid.css`, `./fonts/*`
- **Files**: No `files` field — `npm pack` would include everything (tests, specs, steering docs, release tooling)
- **Bin**: No `bin` field — `npx designerpunk generate` won't work from a product repo

### What needs to be in the package

From the artifact inventory (`docs/roadmap/product-packaging-inventory.md`) and Spec 094's new infrastructure:

| Category | Files | Export Path |
|----------|-------|-------------|
| ESM bundle (all 34 web components) | `dist/browser/designerpunk.esm.js` | `./components` or `.` |
| Design tokens CSS | `dist/DesignTokens.web.css` | `./tokens.css` |
| Component tokens CSS | `dist/ComponentTokens.web.css` | `./component-tokens.css` |
| Blend utilities | `dist/blend/` | `./blend` |
| Responsive grid | `src/styles/responsive-grid.css` | `./grid.css` |
| Fonts | `src/assets/fonts/` | `./fonts/inter.css`, `./fonts/rajdhani.css` |
| Config API | `src/config/` (compiled) | `./config` |
| Theme registry | `src/themes/` (compiled) | Internal (used by config) |
| Token sources | `src/tokens/` | Internal (used by pipeline) |
| Pipeline CLI | `src/cli/designerpunk.ts` | `bin.designerpunk` |
| Generators | `src/generators/` | Internal (used by pipeline) |
| Resolvers | `src/resolvers/` | Internal (used by pipeline) |
| Registries | `src/registries/` | Internal (used by pipeline) |
| Component metadata | `src/components/core/*/component-meta.yaml`, `contracts.yaml`, `*.schema.yaml` | Internal (used by MCP) |
| Family guidance | `family-guidance/*.yaml` | Internal (used by MCP) |
| Experience patterns | `experience-patterns/*.yaml` | Internal (used by MCP) |
| Layout templates | `layout-templates/*.yaml` | Internal (used by MCP) |
| Family registry | `family-registry.yaml` | Internal (used by MCP) |
| MCP servers | `mcp-server/`, `application-mcp-server/` | Internal (started by product) |
| iOS platform files | `src/components/core/*/platforms/ios/` | Internal (copied by product) |
| Android platform files | `src/components/core/*/platforms/android/` | Internal (copied by product) |
| iOS tokens | `dist/DesignTokens.ios.swift`, `dist/ComponentTokens.ios.swift` | Internal (copied by product) |
| Android tokens | `dist/DesignTokens.android.kt`, `dist/ComponentTokens.android.kt` | Internal (copied by product) |
| `tsx` | Dependency for config loading | `dependencies` |

### What must NOT be in the package

- Test files (`__tests__/`, `*.test.ts`)
- Spec history (`.kiro/specs/`)
- Steering docs (`.kiro/steering/`) — served by Docs MCP, not imported
- Release tooling (`src/tools/release/`)
- Completion docs, feedback docs
- Build artifacts that are regenerated (`dist/` test files)
- Roadmap docs (`docs/roadmap/`)

### Agent configurations

Current agent prompts reference:
- File paths relative to the DesignerPunk repo root
- MCP servers started from the repo
- Knowledge bases indexed from repo directories

In a product context, agents need to know:
- Where the installed package lives
- How to start MCP servers pointing at the package's data
- How to reference token sources, component metadata, and family guidance from the package

---

## Proposed Solution

### WS2: Component Library Package

1. **Rename package** to `@designerpunk/core`
2. **Define `files` field** — explicit list of what ships (see table above)
3. **Define `exports` map** — all consumer-facing entry points
4. **Add `bin` field** — `"designerpunk": "./dist/cli/designerpunk.js"` for `npx designerpunk generate`
5. **Add `tsx` as a dependency** — for TypeScript config loading in product repos
6. **Verify `npm pack`** — creates a tarball with only the intended files
7. **Publish to GitHub Packages** — `npm publish --registry https://npm.pkg.github.com`
8. **Validate install** — fresh repo, `npm install @designerpunk/core`, verify all exports resolve

### WS6: Agent Configurations for Product Context

1. **Document MCP server startup from a product repo** — how to start Application MCP and Docs MCP pointing at the installed package's data directories
2. **Create a product-context agent configuration template** — agent prompts that reference package paths instead of repo paths
3. **Document knowledge base setup for product repos** — what to index, include/exclude patterns for a product consuming the package
4. **Update Integration Guide** with the above

---

## Design Decisions (Settled from Prior Work)

| Decision | Source |
|----------|--------|
| Scoped package: `@designerpunk/core` | North Star decision log |
| Full ESM bundle, no tree-shaking for M0a | North Star decision log |
| Fonts bundled in package | North Star decision log |
| `tsx` for TypeScript config execution | Spec 094 Task 3.3 |
| Blend utilities ship at same version (tight coupling) | Ada R2 |
| All three platform outputs included (web, iOS, Android) | Artifact inventory |

---

## Open Questions

1. **Source vs compiled in the package**: Should the package include TypeScript source (`src/`) or only compiled JavaScript (`dist/`)? The pipeline needs TypeScript source (token definitions are `.ts` files). The CLI and config loader need compiled JS. This might mean shipping both — `src/` for the pipeline, `dist/` for runtime consumption. Ada should confirm what the pipeline actually needs at runtime.

2. **MCP server startup mechanism**: How does a product repo start the Application MCP and Docs MCP? Options: (a) `npx designerpunk mcp:app` and `npx designerpunk mcp:docs` CLI commands, (b) documented manual commands pointing at package paths, (c) a `designerpunk.config.ts` section for MCP configuration. This affects WS6 and the Integration Guide.

3. **Package size**: Including all platform files (iOS Swift, Android Kotlin), MCP server source, token source, generators, and the ESM bundle could make the package large. Should we measure and set a size budget? Or is size not a concern for M0a?

4. **`.npmignore` vs `files` field**: The `files` field is a whitelist (only listed files ship). `.npmignore` is a blacklist (everything ships except listed files). Whitelist (`files`) is safer — you can't accidentally ship steering docs or specs. But it requires listing every directory explicitly. Which approach?

---

## Scope Boundaries

### In Scope
- `package.json` restructuring (name, files, exports, bin, dependencies)
- `npm pack` validation
- GitHub Packages publish
- Fresh-repo install validation
- MCP server startup documentation for product context
- Agent configuration template for product repos
- Integration Guide contribution (Block B section)
- Knowledge base setup documentation

### Out of Scope
- Token pipeline changes (Spec 094 — complete)
- Theme registry changes (Spec 094 — complete)
- Component consumption migration (Spec 094 — complete)
- MCP server code changes (Block C — separate spec)
- Product MCP foundation (Block C — separate spec)
- Token data index (Block C — separate spec)
- Marketing theme creation (Phase 2)
- Tree-shaking / individual component exports (M0b)

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| Spec 094 (Block A) | Upstream | Pipeline, config, CLI, theme registry must be complete. ✅ Done. |
| Block C (MCP Infrastructure) | Downstream | MCP servers need to be startable from the package. Block C may adjust server startup based on how the package is structured. |
| Block D (Publish) | This IS the publish step | Package assembly + publish is Block B + Block D combined. |
| Phase 2 (marketing site) | Downstream | Marketing site installs this package. |

---

## Success Criteria

1. `npm pack` produces a tarball containing only intended files (no tests, specs, steering docs, release tooling)
2. A fresh repo can `npm install @designerpunk/core` and all exports resolve correctly
3. `npx designerpunk generate` works from a product repo with a `designerpunk.config.ts`
4. `import '@designerpunk/core/components'` registers all 34 web components
5. `import '@designerpunk/core/tokens.css'` loads all design tokens as CSS custom properties
6. `import { defineConfig } from '@designerpunk/core/config'` works with TypeScript type checking
7. MCP servers can be started from a product repo pointing at the installed package's data
8. Agent configuration template exists for product repos

---

## Feedback Requested

- **Ada**: Open Question 1 (source vs compiled) — what does the pipeline need at runtime?
- **Lina**: Package structure validation — are all 34 components and their platform files accounted for?
- **Sparky**: Does the export structure work for web build tooling (Vite, Astro, etc.)?
- **Leonardo**: Does the MCP startup mechanism work for your workflow?

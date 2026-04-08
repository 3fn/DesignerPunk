# Spec 095: Ecosystem Package Assembly

**Date**: 2026-04-07
**Updated**: 2026-04-08 (feedback incorporated)
**Purpose**: Package DesignerPunk as `@designerpunk/core` — define what ships, how it's consumed, and how agents work in a product context
**Organization**: spec-guide
**Scope**: 095-ecosystem-package-assembly
**Status**: Design outline — ready for review
**M0a Phase 1**: Block B (Block A complete)
**Primary Owners**: Lina (WS2), Thurgood (WS6)

---

## Problem Statement

Spec 094 made the token pipeline portable and the theme system extensible. But the pipeline, components, MCP data, and agent configurations aren't packaged for consumption. A product repo can't `npm install @designerpunk/core` yet — there's no `files` field, the `exports` map is incomplete, the CLI isn't in `bin`, and agent configurations assume the DesignerPunk repo structure.

This spec assembles everything into a publishable package and configures agents to work in a product context.

---

## Current State

### package.json

- **Name**: `designer-punk-v2` (needs to become `@designerpunk/core`)
- **Exports**: Only 4 entries (root, BlendUtilities, blend, tokens.css). `./BlendUtilities` is a legacy export pointing at a raw `.ts` file — remove in favor of `./blend`. `./tokens.css` points to wrong file (`dist/browser/tokens.css` instead of `dist/DesignTokens.web.css`). Missing: `./config`, `./components`, `./component-tokens.css`, `./grid.css`, `./fonts/*`.
- **Files**: No `files` field — `npm pack` would include everything
- **Bin**: No `bin` field — `npx designerpunk` commands won't work from a product repo
- **Root export**: CJS condition points to `TokenEngine.js` while ESM points to the component bundle — different APIs for `require` vs `import` (dual-package hazard). Pipeline doesn't `require()` the root (Ada R2 confirmed). Drop CJS condition.

### Build gap

`dist/config/` doesn't exist. The Spec 094 config module (`defineConfig`, `ConfigLoader`) lives in `src/config/` as TypeScript source but isn't compiled to `dist/`. The `./config` export needs compiled JS with `.d.ts` type declarations. This requires a build step addition in WS2.

---

## What Ships: The Full Ecosystem

The package IS the design system ecosystem. Everything a team needs to operate, extend, and govern a design system.

### Token Infrastructure
Pipeline, generators, registries, resolvers, validators, theme registry, config system, CLI. Ships as TypeScript source (`src/`) — the pipeline executes via `tsx` at runtime.

**Source directories** (all needed by the pipeline at runtime — Ada R1/R2):
- `src/tokens/` — token definitions
- `src/generators/` — platform output generators
- `src/resolvers/` — semantic override resolution
- `src/registries/` — token and component registries
- `src/validators/` — semantic validation
- `src/themes/` — ThemeRegistry
- `src/types/` — PrimitiveToken, SemanticToken, etc.
- `src/providers/` — platform-specific format generators
- `src/naming/` — PlatformNamingRules
- `src/blend/` — BlendCalculator, ColorSpaceUtils, platform utilities
- `src/build/tokens/` — defineComponentTokens
- `src/config/` — defineConfig, ConfigLoader
- `src/cli/` — CLI entry point

### Component Infrastructure
Stemma architecture, behavioral contracts, schemas, metadata, platform implementations (web/iOS/Android), ESM bundle.

**All 34 components verified** (Lina R1):
- `src/components/core/*/platforms/web/` — web implementations
- `src/components/core/*/platforms/ios/` — iOS implementations
- `src/components/core/*/platforms/android/` — Android implementations
- `src/components/core/*/component-meta.yaml` — MCP metadata
- `src/components/core/*/contracts.yaml` — behavioral contracts
- `src/components/core/*/*.schema.yaml` — component schemas
- `src/components/core/*/types.ts` — TypeScript types

### Governance Infrastructure
Steering docs, release tooling, test standards, process docs, audit methodology, all tests.

- `.kiro/steering/` — all steering docs (token governance, component development guide, process standards, etc.)
- `.kiro/agents/` — all 8 agent prompts
- `src/tools/release/` — release analysis tooling
- All test files (`__tests__/`, `*.test.ts`) — tests ARE the governance standards (Ada R1 revised position, endorsed by Peter and Stacy)

### MCP Infrastructure
- `mcp-server/` — Docs MCP server
- `application-mcp-server/` — Application MCP server
- `family-guidance/*.yaml` — family selection guidance
- `experience-patterns/*.yaml` — assembly patterns
- `layout-templates/*.yaml` — page layout guidance
- `family-registry.yaml` — canonical family names

### Generated Outputs
- `dist/DesignTokens.web.css` — web design tokens
- `dist/DesignTokens.ios.swift` — iOS design tokens
- `dist/DesignTokens.android.kt` — Android design tokens (canonical path, not `dist/android/`)
- `dist/ComponentTokens.web.css` / `.ios.swift` / `.android.kt` — component tokens
- `dist/DesignTokens.dtcg.json` — DTCG format
- `dist/DesignTokens.figma.json` — Figma format
- `dist/browser/designerpunk.esm.js` — ESM bundle (all 34 web components)
- `dist/browser/designerpunk.esm.min.js` — minified ESM bundle
- `dist/config/` — compiled config API with `.d.ts` types (needs build step)
- `dist/cli/designerpunk.js` — compiled CLI
- `dist/blend/` — compiled blend utilities

### What Must NOT Ship

- `.kiro/specs/` — spec history (DesignerPunk's implementation decisions)
- `.kiro/specs/*/completion/` — completion docs
- `.kiro/specs/*/feedback.md` — feedback docs
- `.kiro/issues/` — issue tracking
- `docs/roadmap/` — product planning
- `docs/specs/` — spec summaries
- `docs/releases/` — release notes
- `dist/browser/*.map` — source maps (4.4MB)
- `dist/browser/designerpunk.umd.*` — UMD bundles (legacy format)
- `dist/browser/*.html` — demo pages
- `dist/browser/demo-styles.css` — demo stylesheet
- `dist/__tests__/` — compiled test artifacts in dist
- `demos/` — top-level demo pages
- `**/examples/` — component usage examples (MCP is the learning path)
- `dist/android/` — duplicate token file (use `dist/DesignTokens.android.kt`)
- `dist/ios/` — duplicate token file (use `dist/DesignTokens.ios.swift`)
- `strategic-framework/` — DesignerPunk-specific planning
- `preserved-knowledge/` — DesignerPunk-specific history
- `scripts/` — repo-specific build scripts (pipeline CLI replaces these)

---

## Resolved Questions

| Question | Resolution | Source |
|----------|-----------|--------|
| Source vs compiled | Both. TypeScript source for the pipeline (`src/`), compiled JS for consumer imports (`dist/config/`, `dist/cli/`, `dist/blend/`, `dist/browser/`). `tsx` executes the pipeline chain at runtime. | Ada R1 |
| MCP startup mechanism | CLI commands: `npx designerpunk mcp:app`, `npx designerpunk mcp:docs`. Zero-config — CLI resolves package data paths via `require.resolve`. Config file is optional override. CLI prints connection details on startup. | Leo R1, Sparky R1, Ada R2 |
| Package size | ~20-27MB (Lina R1 measurement). Fonts are 5MB. Not a concern for M0a. Baseline established for future reference. | Lina R1, Peter |
| `files` vs `.npmignore` | `files` field (allowlist). Explicit, auditable, can't accidentally ship internal artifacts. npm doesn't support negation in `files`, so `examples/` exclusion handled by not listing those paths. | Thurgood R1, Ada R1 |
| Tests ship? | Yes. All tests ship. Test assertions ARE the governance standards. | Ada R1 revised, Peter, Stacy R1 |
| Root export | ESM-only (web components). Drop CJS `TokenEngine.js` condition. `./components` is an alias. Pipeline doesn't `require()` the root. | Sparky R1, Ada R2 |
| `./tokens.css` target | `dist/DesignTokens.web.css` (canonical generated output), not `dist/browser/tokens.css` (demo copy). | Sparky R1 |
| Agent config approach | Ship prompts + produce a concrete template for product context (not just documentation). Products copy and customize. | Leo R1, Stacy R1 |
| Native platform consumption | M0a: document as manual copy. M0b: `npx designerpunk sync:ios` / `sync:android` (deferred). Structure package to make future sync easy. | Data R1, Kenya R1 |

---

## Proposed Solution

### WS2: Component Library Package

1. **Rename package** to `@designerpunk/core`
2. **Add build step** for `dist/config/` — compile `src/config/` to JS with `.d.ts` type declarations
3. **Define `files` field** — allowlist of everything that ships (see "What Ships" above)
4. **Define `exports` map**:
   ```json
   {
     ".": { "import": "./dist/browser/designerpunk.esm.js", "types": "./dist/browser-entry.d.ts" },
     "./components": { "import": "./dist/browser/designerpunk.esm.js", "types": "./dist/browser-entry.d.ts" },
     "./tokens.css": "./dist/DesignTokens.web.css",
     "./component-tokens.css": "./dist/ComponentTokens.web.css",
     "./config": { "import": "./dist/config/index.js", "types": "./dist/config/index.d.ts" },
     "./blend": { "import": "./dist/blend/index.js", "types": "./dist/blend/index.d.ts" },
     "./grid.css": "./src/styles/responsive-grid.css",
     "./fonts/inter.css": "./src/assets/fonts/inter/inter.css",
     "./fonts/rajdhani.css": "./src/assets/fonts/rajdhani/rajdhani.css"
   }
   ```
5. **Remove legacy exports** — drop `./BlendUtilities`, drop CJS root condition
6. **Add `bin` field** — `"designerpunk": "./dist/cli/designerpunk.js"`
7. **Add CLI commands** — `generate`, `mcp:app`, `mcp:docs` (MCP commands resolve package data paths via `require.resolve`, print connection details on startup)
8. **Add `tsx` as a dependency** — runtime dependency for the entire pipeline execution chain, not just config loading
9. **Build-time validation test** — cross-reference `DesignTokens.*` usages in platform files against generated output AND verify all components with `platforms/web/` are registered in `browser-entry.ts`. One test, two drift categories.
10. **Clean up duplicate token files** — remove `dist/android/` and `dist/ios/` duplicates
11. **Verify `npm pack`** — tarball contains only intended files
12. **Publish to GitHub Packages**
13. **Validate install** — fresh repo, `npm install @designerpunk/core`, verify all exports resolve, `npx designerpunk generate` works

### WS6: Agent Configurations for Product Context

1. **Produce agent configuration template** — concrete set of prompts pre-configured for the "installed package" context. Resolves package paths programmatically via the config system, not hardcoded `node_modules` paths. Products copy and customize.
2. **Document prompt customization** — what to change (product name, domain-specific knowledge, product-specific MCP data)
3. **Document MCP server startup** — `npx designerpunk mcp:app` / `mcp:docs` with connection details
4. **Document knowledge base setup** — what to index, include/exclude patterns for a product repo
5. **Document native platform consumption (M0a workaround):**
   - iOS section: where to find Swift files in the installed package, how to manually copy into Xcode project, minimum deployment target (iOS 17.0+), required frameworks (SwiftUI, UIKit), note that `sync:ios` is coming in M0b
   - Android section: where to find Kotlin files, how to manually copy into Gradle module, minimum Compose BOM version, R8/ProGuard considerations, note that `sync:android` is coming in M0b
   - Document the target sync model so Kenya and Data have a clear picture of M0b
6. **Update Integration Guide** — full product setup loop: install → config → MCP servers → agent connections → verify → generate → build. Include platform-specific sections for web, iOS, and Android.

---

## Design Decisions (Settled)

| Decision | Source |
|----------|--------|
| Scoped package: `@designerpunk/core` | North Star decision log |
| Full ESM bundle, no tree-shaking for M0a | North Star decision log |
| Fonts bundled in package | North Star decision log |
| `tsx` as runtime pipeline dependency | Spec 094 Task 3.3, Ada R1 |
| Blend utilities ship at same version | Ada R2 (pre-launch feedback) |
| All three platform outputs included | Artifact inventory |
| Full ecosystem ships (tests, governance, agents, release tooling) | Peter + Ada R1 + Stacy R1 |
| `files` field (allowlist) | Thurgood R1, Ada R1 |
| ESM-only root export | Sparky R1, Ada R2 |
| CLI for MCP startup (zero-config) | Leo R1, Sparky R1 |
| Agent config template (concrete artifact, not just docs) | Leo R1, Stacy R1 |
| Native sync mechanism deferred to M0b | Data R1, Kenya R1 |

---

## Deferred to M0b

| Item | Rationale |
|------|-----------|
| `npx designerpunk sync:ios` | iOS files in npm package need to be synced to Xcode project. Manual copy documented for M0a. |
| `npx designerpunk sync:android` | Android files in npm package need to be synced to Gradle module. Manual copy documented for M0a. |
| Kotlin package namespace from config | Generator produces `com.designerpunk.*`. Product-specific namespaces require generator change. |
| Swift Package generation for local SPM | SPM could reference a local package — cleaner than file copy for iOS. |
| Compose BOM version compatibility | Document minimum Compose BOM version components are written against. Integration Guide item for M0b. |
| R8/ProGuard keep rules | Synced Kotlin files need keep rules if product uses code shrinking. Integration Guide item for M0b. |
| iOS framework dependency metadata | `UIKit` and `SwiftUI` need to be declared when sync tool generates `Package.swift`. |
| Tree-shaking / individual component exports | Full bundle for M0a. Side-effect-free individual exports for M0b. |
| Personal Note template | Replace Peter's note with template for other humans. Only one customer right now. |
| Exclude "A Vision of the Future.md" | Peter's philosophical foundation, not reusable ecosystem artifact. |

---

## Scope Boundaries

### In Scope
- `package.json` restructuring (name, files, exports, bin, dependencies)
- Build step for `dist/config/` compilation
- Legacy export cleanup
- Duplicate token file cleanup
- CLI MCP commands (`mcp:app`, `mcp:docs`)
- `npm pack` validation
- GitHub Packages publish
- Fresh-repo install validation
- Build-time validation test (platform token refs + `browser-entry.ts` registration)
- Agent configuration template for product context
- MCP server startup documentation
- Knowledge base setup documentation
- Integration Guide contribution (Block B section)

### Out of Scope
- Token pipeline changes (Spec 094 — complete)
- Theme registry changes (Spec 094 — complete)
- Component consumption migration (Spec 094 — complete)
- MCP server code changes for configurability (Block C)
- Product MCP foundation (Block C)
- Token data index (Block C)
- Native platform sync mechanism (M0b)
- Marketing theme creation (Phase 2)
- Tree-shaking / individual component exports (M0b)

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| Spec 094 (Block A) | Upstream | ✅ Complete |
| Block C (MCP Infrastructure) | Downstream | MCP servers need to be startable from the package. Block C may adjust based on package structure. |
| Phase 2 (marketing site) | Downstream | Marketing site installs this package. |

---

## Success Criteria

1. `npm pack` produces a tarball containing only intended files — no spec history, completion docs, feedback docs, roadmap docs, issues, source maps, UMD bundles, or demo pages
2. A fresh repo can `npm install @designerpunk/core` and all exports resolve correctly
3. `npx designerpunk generate` works from a product repo with a `designerpunk.config.ts`
4. `npx designerpunk mcp:app` and `npx designerpunk mcp:docs` start MCP servers with zero config, resolving data paths from the installed package
5. `import '@designerpunk/core'` and `import '@designerpunk/core/components'` both register all 34 web components
6. `import '@designerpunk/core/tokens.css'` loads design tokens from `dist/DesignTokens.web.css`
7. `import { defineConfig } from '@designerpunk/core/config'` works with TypeScript type checking
8. Build-time validation test passes — all platform token references resolve, all web components registered in bundle
9. Agent configuration template exists and resolves package paths programmatically
10. Integration Guide covers the full product setup loop

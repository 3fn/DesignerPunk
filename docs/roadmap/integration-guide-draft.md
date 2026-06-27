# DesignerPunk Integration Guide (Draft)

**Date**: 2026-04-07
**Status**: Placeholder — formalize as steering doc after Phase 1 ships
**Future location**: `.kiro/steering/DesignerPunk-Integration-Guide.md` (Docs MCP served)
**Purpose**: Everything a product developer needs to know to integrate DesignerPunk into a product repo

---

## Prerequisites

A product repo integrating `@designerpunk/core` needs:

| Prerequisite | Why | Notes |
|-------------|-----|-------|
| Node.js | Pipeline and MCP servers are Node-based | Version TBD after Phase 1 |
| (runtime TS loading) | Pipeline config (`designerpunk.config.ts`) is TypeScript, loaded at runtime | **Resolved (Spec 118):** the package loads it via its own **internal scoped `tsx` seam** (`tsx` is `@3fn/core`'s dependency) — NOT a consumer prerequisite. The consumer installs no TS runtime; ts-node is retired. |
| TypeScript | Theme overrides and config are TypeScript files | Version TBD |
| npm / package manager | Install `@designerpunk/core` from GitHub Packages | |

**Resolved (Spec 118):** runtime TS execution is **not a consumer concern** — `@3fn/core` loads the consumer's `designerpunk.config.ts` (and other consumer `.ts`) through its own per-site **scoped `tsx`** seam (Class B of the Module-Resolution Contract). The package depends on `tsx` internally; the consumer does not install ts-node, tsx, or any TS runtime. ts-node is retired from the governed surface. See `.kiro/steering/Rosetta-System-Architecture.md` § "Module-Resolution Contract (Spec 118)".

---

## Setup Steps

1. Install the package: `npm install @designerpunk/core`
2. Create `designerpunk.config.ts` at project root:
   ```typescript
   import { defineConfig } from '@designerpunk/core/config';

   export default defineConfig({
     name: 'MyProduct',
     abbreviation: 'MP',
     output: './dist/tokens'
   });
   ```
3. Run the pipeline: `npx designerpunk generate`
4. Import generated tokens in your project:
   - Web: `import '@designerpunk/core/tokens.css'` or reference the generated CSS in your output dir
   - iOS: Add generated Swift file to your Xcode project
   - Android: Add generated Kotlin file to your Gradle module
5. Import components: `import '@designerpunk/core/components'` (web ESM bundle)
6. For custom theming, create a `SemanticOverrides.ts` and register it in the config (see Configuration section)

---

## Configuration

### `designerpunk.config.ts`

```typescript
import { defineConfig } from '@designerpunk/core/config';
import { myThemeOverrides } from './themes/my-theme/SemanticOverrides';

export default defineConfig({
  // Theme attribute: defaults to "data-theme".
  // If your product uses "data-theme" for another purpose,
  // this can be made configurable in a future version.
  themes: [
    { name: 'my-theme', mode: 'dark', overrides: myThemeOverrides }
  ],
  // Component token paths (if product defines its own)
  componentTokens: [
    './components'  // product component tokens
  ],
  // Output directory for generated token files
  output: './dist/tokens'
});
```

If no config file exists, the pipeline uses defaults matching the DesignerPunk repo structure (backward compatibility).

---

## MCP Server Setup

### Application MCP
Serves component metadata, family guidance, experience patterns, layout templates, and token data.

```bash
# How to start — TBD after WS3 (configurable MCP servers)
```

### Docs MCP
Serves steering documentation and architectural guidance.

```bash
# How to start — TBD after WS3
```

### Product MCP
Starter scaffold for product-specific data. Connects to Application MCP and proxies design system queries.

```bash
# How to start — TBD after WS5 (Product MCP foundation)
```

---

## Cross-Block Dependencies

These are coordination points between Phase 1 specs that affect the integration experience:

| From | To | Dependency |
|------|----|-----------|
| Spec 094 (Block A) | Block B (WS2) | Package `exports` must include `./config` entry point for `defineConfig` |
| Spec 094 (Block A) | Block B (WS2) | Package `files` must include pipeline source and theme infrastructure |
| Spec 094 (Block A) | Block C (WS3) | MCP servers need to know where pipeline outputs land (configurable paths) |
| Spec 094 (Block A) | Block C (WS7) | Token index generation walks the same token sources the pipeline uses |
| Block B (WS2) | Block C (WS5) | Product MCP foundation needs to be included in the package |
| Block B (WS6) | All blocks | Agent configurations reference package paths — must align with actual package structure |

---

## Known Gaps (To Be Resolved During Phase 1)

- ~~Exact `ts-node` / TypeScript execution strategy for product repos~~ — **Resolved (Spec 118):** the package's internal scoped `tsx` seam loads consumer `.ts`; no consumer-side TS runtime. ts-node retired.
- MCP server startup commands and configuration
- Agent configuration for product context (how product agents find things)
- Whether `@designerpunk/core` includes source TypeScript or only compiled JavaScript
- Font loading strategy in product repos
- Blend utility import patterns

---

## Formalization Plan

After Phase 1 ships and Phase 2 (marketing site) validates the integration:
1. Replace all "TBD" sections with actual commands and configuration
2. Add troubleshooting section based on Phase 2 friction points
3. Move to `.kiro/steering/DesignerPunk-Integration-Guide.md`
4. Index in Docs MCP for agent access
5. Update agent resources to reference the guide

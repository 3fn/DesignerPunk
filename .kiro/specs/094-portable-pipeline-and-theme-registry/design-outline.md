# Spec 094: Portable Token Pipeline & Theme Registry

**Date**: 2026-04-07
**Purpose**: Make the token generation pipeline runnable from a product repo and replace the hardcoded theme system with a registry pattern
**Organization**: spec-guide
**Scope**: 094-portable-pipeline-and-theme-registry
**Status**: Design outline
**M0a Phase 1**: Block A (critical path — all other blocks depend on this)
**Primary Owner**: Ada

---

## Problem Statement

The token generation pipeline and theme infrastructure are hardcoded to the DesignerPunk repo structure. A product repo installing `@designerpunk/core` cannot:

1. Run the pipeline to generate themed token outputs
2. Create its own theme (e.g., a marketing theme with a dark cyan/teal palette)
3. Register that theme so the pipeline discovers and generates outputs for it

This blocks the entire M0a vision — products can't participate in the ecosystem without a portable, extensible pipeline.

---

## Current State

### Theme Infrastructure

- **`ThemeContext` is a hardcoded union**: `'light-base' | 'light-wcag' | 'dark-base' | 'dark-wcag'` in `src/tokens/themes/types.ts`
- **Three override files** exist at fixed paths: `src/tokens/themes/dark/SemanticOverrides.ts`, `src/tokens/themes/wcag/SemanticOverrides.ts`, `src/tokens/themes/dark-wcag/SemanticOverrides.ts`
- **`generateTokenFiles.ts` hardcodes imports** of all three override files and manually assembles the `ContextOverrideSet`
- **`SemanticOverrideResolver` hardcodes the four contexts** in its `resolve()` method
- Adding a new theme requires modifying the union type, creating an override file at a fixed path, updating the generator imports, and updating the resolver — all in the core repo

### Pipeline Path Assumptions

- `generateTokenFiles.ts` accepts an `outputDir` parameter but all token source imports are relative to the repo root
- `scripts/generate-platform-tokens.ts` imports component token files by hardcoded relative paths
- The `dist/` output directory is assumed to be at the repo root
- No configuration mechanism exists for pointing the pipeline at a different root or theme directory

---

## Proposed Solution

Two changes, sequenced (WS4 first, then WS1):

### WS4: Theme Registry Pattern

Replace the hardcoded `ThemeContext` union and manual override assembly with a registry that themes register themselves into.

**Core concept:**
- A `ThemeRegistry` that themes register with (name, mode, override map)
- `SemanticOverrideResolver` iterates over registered themes instead of hardcoded contexts
- Generators query the registry for available themes instead of importing fixed files
- The registry accepts themes from any location — core repo themes and product repo themes

**What a theme registration looks like (conceptual):**
```typescript
ThemeRegistry.register({
  name: 'marketing',
  mode: 'dark',
  overrides: marketingSemanticOverrides
});
```

**What changes:**
- `ThemeContext` type becomes dynamic (derived from registry) or replaced entirely
- `ContextOverrideSet` becomes registry-driven, not manually assembled
- `SemanticOverrideResolver.resolve()` iterates registered themes
- `generateTokenFiles.ts` no longer hardcodes override imports — it queries the registry
- Existing themes (base, wcag, dark, dark-wcag) register themselves using the same mechanism

**What doesn't change:**
- `SemanticOverride` and `SemanticOverrideMap` types — the override format stays the same
- How overrides work (primitive reference swapping) — the resolution mechanism is unchanged
- The mathematical foundation — token values and relationships are untouched

### WS1: Portable Token Pipeline

Abstract hardcoded paths so the pipeline can run from a product repo.

**Core concept:**
- A pipeline configuration that specifies: token source root, theme directories (core + product), output directory, component token paths
- The generation scripts accept this configuration instead of assuming repo-relative paths
- A product repo provides its config pointing at the installed package's token sources plus its own theme directory

**What a product repo's pipeline config looks like (conceptual):**
```yaml
# designerpunk.config.yaml (in product repo root)
pipeline:
  tokenSources: node_modules/@designerpunk/core/src/tokens
  themeDirectories:
    - node_modules/@designerpunk/core/src/tokens/themes  # core themes
    - ./themes  # product themes
  componentTokens:
    - node_modules/@designerpunk/core/src/components  # core component tokens
    - ./components  # product component tokens (if any)
  output: ./dist/tokens
```

**What changes:**
- `generateTokenFiles.ts` reads config instead of assuming paths
- `scripts/generate-platform-tokens.ts` reads config for component token imports
- Theme discovery walks configured directories, not just `src/tokens/themes/`
- Output directory is configurable
- A CLI command or npm script runs the pipeline from the product repo

**What doesn't change:**
- Token source file format (TypeScript exports)
- Override file format (SemanticOverrides.ts)
- Generator internals (TokenFileGenerator, platform builders, DTCG generator)
- Validation pipeline (semantic validation, override validation)

---

## Sequencing

**WS4 → WS1 is a hard dependency.** The registry pattern changes how the resolver discovers themes. The portable pipeline needs to know the registry's API to configure theme discovery. If WS1 went first, it would abstract paths around the old hardcoded theme system, then WS4 would change the theme system, requiring WS1 rework.

Ada's recommended sequence:
1. WS4: Build the theme registry, migrate existing themes to register themselves, update resolver and generators
2. WS1: Abstract paths, add configuration, make the pipeline runnable from a product repo using the registry from WS4

---

## Design Decisions (Settled)

| Decision | Rationale | Source |
|----------|-----------|--------|
| Registry pattern, not hardcoded third theme | Products register themes, resolver iterates. Avoids refactoring for M0b. | Peter + Ada R1 |
| Dark-only marketing theme | Design exploration is dark. No light variant. Reduces scope. | Peter |
| Option B: all themes in one CSS file, data-attribute scoped | Supports Component Showcase toggle, aligns with day/night mechanism, single import path. | Ada R1, endorsed by Leo and Lina |
| Theme registry must support external themes | Marketing theme lives in product repo. Pipeline discovers themes from configurable locations. | Ada R2 |
| YAML for pipeline config | Consistent with project metadata convention. | Project convention |

---

## Resolved Questions

All open questions resolved during design outline feedback (Ada R1/R2, Lina R1):

| Question | Resolution | Rationale |
|----------|-----------|-----------|
| Config format | TypeScript (`designerpunk.config.ts`) | Same language as pipeline. Explicit imports eliminate directory walking. Pattern used by Vite, Jest. (Ada R1) |
| Theme discovery | Explicit registration via config imports | Config IS the registry. No auto-discovery, no implicit coupling. Predictable and auditable. Resolved by config format choice. (Ada R1) |
| CSS scoping | `data-theme` attribute, no prefix, no `data-mode` | Matches existing pattern (`:root[data-theme="wcag"]`). Mode handled by `light-dark()` CSS function. No prefix — adding one later is non-breaking if needed. (Ada R1, Lina R1 challenge → Ada R2 withdrawal of `data-mode`) |
| Pipeline CLI | `npx designerpunk generate` | Reads config from working directory. Deferred to implementation — mechanism matters more than syntax. (Ada R1) |
| Backward compat | Hard constraint | DesignerPunk repo is first test case. Default config matches current behavior. Zero behavior change for core repo. |
| Component tokens | Same config mechanism as themes | Additional paths in config. Consistent pattern. (Ada R1) |

### CSS Output Pattern

```css
/* Base theme — no attribute, uses light-dark() for mode */
:root {
  color-scheme: light dark;
  --color-structure-canvas: light-dark(rgba(255,255,255,1), rgba(24,34,40,1));
}

/* WCAG theme — data-theme attribute, uses light-dark() for mode */
:root[data-theme="wcag"] {
  --color-action-primary: light-dark(rgba(26,83,92,1), rgba(0,240,255,1));
}

/* Marketing theme — data-theme attribute, dark-only (no light-dark()) */
:root[data-theme="marketing"] {
  color-scheme: dark;
  --color-structure-canvas: rgba(10,12,16,1);
  --color-action-primary: rgba(0,240,255,1);
}
```

### Config Pattern

```typescript
// designerpunk.config.ts
import { defineConfig } from '@designerpunk/core/config';
import { marketingOverrides } from './themes/marketing/SemanticOverrides';

export default defineConfig({
  // Theme attribute: defaults to "data-theme".
  // If your product uses "data-theme" for another purpose,
  // this can be made configurable in a future version.
  themes: [
    { name: 'marketing', mode: 'dark', overrides: marketingOverrides }
  ],
  output: './dist/tokens'
});
```

---

## Testing Strategy

This spec changes core infrastructure that 311 test suites depend on. Testing must be addressed before formalization, not discovered during implementation.

**WS4 (Theme Registry):**
- Registry unit tests: register, iterate, validate, duplicate detection
- Resolver tests: verify existing four-context resolution produces identical output through the registry
- CSS output snapshot test: capture current `dist/DesignTokens.web.css` before refactoring, assert byte-for-byte identical output after migration to registry (Ada R1)
- Regression: all existing token generation and validation tests must pass unchanged

**WS1 (Portable Pipeline):**
- Config loading tests: default config (DesignerPunk repo), custom config (product repo simulation)
- Path resolution tests: token sources, theme directories, output directory all resolve correctly from a non-repo-root location
- Integration test: simulate a product repo structure, run the pipeline, verify outputs match expected
- Backward compatibility: existing `npm run generate:platform-tokens` produces identical output before and after refactoring

**Post-migration regression gate:**
- Component behavioral contract test suite run after registry migration — validates components render correctly with the refactored token system (Lina R1)

**Critical constraint**: The DesignerPunk repo itself is the first consumer. If the refactoring breaks `npm test` or `npm run generate:platform-tokens`, the system we're packaging is broken.

---

## Scope Boundaries

### In Scope
- Theme registry implementation
- Migrate existing themes (base, wcag, dark, dark-wcag) to registry
- Pipeline configuration mechanism
- Path abstraction in generators and scripts
- Product repo theme creation workflow
- CSS output with data-attribute theme scoping
- Backward compatibility with existing DesignerPunk repo scripts
- Agent resource updates for Ada (theme registry knowledge)

### Out of Scope
- Creating the marketing theme itself (Phase 2 product work)
- Token data index for Application MCP (Block C, WS7)
- Product MCP foundation (Block C, WS5)
- Component library packaging (Block B, WS2)
- Full "configure your brand" onboarding workflow (M1)
- Token namespace collision prevention (noted for future, not Phase 1)

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| Block B (WS2: Component library package) | Downstream | Package `exports` must include `./config` entry point for `defineConfig`. Package `files` must include pipeline source and theme infrastructure. |
| Block C (WS3: Configurable MCP servers) | Downstream | MCP servers need to know where pipeline outputs land |
| Block C (WS7: Token data index) | Downstream | Index generation walks the same token sources the pipeline uses |
| Phase 2 (marketing theme) | Downstream | Product repo creates theme using this infrastructure |
| `ts-node` or equivalent TS execution | Implementation | Pipeline config is TypeScript — product repos need a way to execute it. Should be a package dependency or documented prerequisite. See `docs/roadmap/integration-guide-draft.md`. |

**Sequencing discipline**: Migrate existing themes to registry first (identical output), then add new capabilities (external themes, configurable paths). Do not refactor and extend simultaneously.

---

## Success Criteria

1. A product repo can install `@designerpunk/core`, create a `SemanticOverrides.ts`, register it as a theme, and run the pipeline to generate themed CSS/Swift/Kotlin/DTCG outputs
2. Existing DesignerPunk repo scripts (`npm run generate:platform-tokens`, `npm run prebuild`) continue to work without modification
3. The generated CSS contains all registered themes scoped by data attributes
4. The theme registry supports themes from both the core package and the product repo
5. All existing tests pass — no regressions in token generation, validation, or platform output

---

## Relationship to North Star

This spec is the critical path for M0a Phase 1. It enables the core promise of the ecosystem vision: "install DesignerPunk, configure it for your brand." Without a portable pipeline and extensible theme system, products can't participate — they can only consume static outputs.

See: `docs/roadmap/north-star-design-system-ecosystem.md` § "Mission", § "Phase 1: Package the Ecosystem"

---

## Feedback Requested

This design outline should be reviewed by:
- **Ada** (primary owner — technical feasibility, sequencing, scope accuracy)
- **Lina** (downstream consumer — component-side implications, CSS scoping, Shadow DOM inheritance)
- **Thurgood** (spec standards, test strategy, governance)

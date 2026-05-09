# Design Outline: Pipeline DX — Source Resolution & Validation

**Date**: 2026-05-09
**Spec**: 103 - Pipeline DX: Source Resolution & Validation
**Status**: Design Outline
**Author**: Thurgood (governance framing) → Ada (implementation ownership)
**Origin**: `.kiro/issues/ada-2026-05-09.md` — Issues 1, 2, and 4

---

## Problem Statement

Product repos consuming `@3fn/core` via the pipeline (`npx designerpunk generate`) encounter three related DX failures:

1. **Invisible source resolution**: The pipeline doesn't show where tokens are actually read from. The current "Source:" line shows `cwd`, not the actual token import path (`node_modules/@3fn/core/src/tokens/`). Developers edit the wrong file and get stale output.

2. **No configurable token source**: The pipeline loads tokens via static TypeScript imports hardcoded to the package's `src/tokens/` directory. Product repos that maintain local token source (for contribution back to core) must edit `node_modules/` directly — a fragile, undocumented workflow that's lost on every `npm install`.

3. **No token validation from product repos**: Token unit tests exist in `@3fn/core` but can't be run from product repos. After editing token definitions, the only validation is the pipeline's generation-time checks (semantic validation, cross-platform consistency), which don't cover mathematical relationships, naming conventions, or family constraints.

### Root Cause

`generateTokenFiles()` imports tokens via static paths:
```typescript
import { getAllPrimitiveTokens } from '../tokens';
import { getAllSemanticTokens } from '../tokens/semantic';
```

This means the pipeline **always** reads from the installed package's `src/tokens/`, regardless of any config. The `tokenSourceRoot` field in `ResolvedConfig` is set to `cwd` but never consumed by the generation logic.

---

## Proposed Solution

### 1. Transparent Source Display (Issue 1)

Replace the misleading "Source:" line with an accurate "Tokens:" line showing the actual resolution path:

```
📦 DP-Portfolio (DPP)
   Tokens: node_modules/@3fn/core/src/tokens  (package)
   Output: ./dist/tokens
   Themes: wcag (light)
```

When `tokenSource` is configured (see below):
```
📦 DP-Portfolio (DPP)
   Tokens: ./src/tokens  (local)
   Output: ./dist/tokens
   Themes: wcag (light)
```

The `(package)` vs `(local)` annotation makes the resolution mode immediately visible.

### 2. `tokenSource` Config Option (Issue 2)

Add a `tokenSource` field to `defineConfig()`:

```typescript
export default defineConfig({
  name: 'DP-Portfolio',
  abbreviation: 'DPP',
  tokenSource: './src/tokens',  // ← resolve tokens from local source
  output: './dist/tokens',
  themes: [{ name: 'wcag', mode: 'light', overrides: wcagOverrides }],
});
```

**Behavior**:
- **When omitted** (default): Pipeline reads from the installed package's `src/tokens/` (current behavior, no breaking change).
- **When set**: Pipeline dynamically imports token barrel files from the specified path instead of the package path.

**Resolution logic**:
1. Resolve `tokenSource` relative to config file directory
2. Verify the path contains expected barrel exports (`index.ts` with `getAllPrimitiveTokens`, `semantic/index.ts` with `getAllSemanticTokens`)
3. If verification fails, emit a clear error with expected structure
4. If verification passes, use dynamic `import()` from that path instead of static imports

**Key architectural decision**: This changes `generateTokenFiles()` from static imports to accepting token data as parameters (dependency injection), or using dynamic `import()` with the resolved path. The DI approach is cleaner — the CLI layer resolves tokens from the appropriate source and passes them to the generator.

### 3. Token Validation Command (Issue 4)

Add `npx designerpunk validate` (or `npx designerpunk generate --validate`) that runs token invariant checks against the active token source:

**Checks to include**:
- Mathematical relationship validation (modular scale ratios, baseline grid alignment)
- Naming convention compliance (token family naming patterns)
- Required field presence (all `PrimitiveToken` fields populated)
- Semantic reference integrity (all semantic tokens reference valid primitives)
- Family constraint validation (e.g., spacing tokens align to 4px grid)

**Source awareness**: Validation runs against whichever source the pipeline would use — if `tokenSource` is configured, validate local source; otherwise validate package source.

**Relationship to existing validation**: `generateTokenFiles()` already runs `SemanticTokenValidator` and `SemanticOverrideResolver` validation during generation. The new command surfaces these checks independently (without generating files) and adds primitive-level checks that generation doesn't currently perform.

---

## Scope Boundaries

### In Scope
- `tokenSource` config option in `defineConfig()` and `ConfigLoader`
- Dynamic token resolution in the CLI layer (passing resolved tokens to generator)
- Updated CLI output showing actual token source path and mode
- `npx designerpunk validate` command for standalone token validation
- Documentation updates for the new config option and validation command

### Out of Scope
- Categorical token type (Issue 3 — logged as future consideration, not blocking)
- Watch mode / hot reload when local source changes
- Automatic sync between local source and `node_modules/`
- Token contribution workflow (how edits flow back to core)

---

## Key Design Decisions to Resolve

### Decision 1: Dynamic Import vs Dependency Injection

**Option A — Dynamic import**: `generateTokenFiles()` uses `import(resolvedPath)` to load tokens from the configured source at runtime.
- Pro: Minimal API change to `generateTokenFiles()`
- Con: Dynamic imports in TypeScript have path resolution complexity; may need `tsx`/`ts-node` loader configured

**Option B — Dependency injection**: CLI layer resolves tokens (from either source), then passes token arrays to `generateTokenFiles(primitiveTokens, semanticTokens, config)`.
- Pro: Generator becomes source-agnostic; easier to test; cleaner separation
- Con: Changes `generateTokenFiles()` signature (internal, not public API)

**Recommendation**: Option B. The generator shouldn't know or care where tokens came from. The CLI is the orchestration layer that resolves sources.

### Decision 2: Validation as Separate Command vs Flag

**Option A — Separate command**: `npx designerpunk validate`
- Pro: Clear purpose, can have its own output format, doesn't slow down generation
- Con: Another command to remember

**Option B — Flag on generate**: `npx designerpunk generate --validate`
- Pro: Single workflow, validates then generates
- Con: Conflates two concerns; users may want to validate without generating

**Option C — Both**: `validate` as standalone command, `generate` always runs basic validation (current behavior), `generate --strict` adds the extended checks.

**Recommendation**: Option C. Keep current generation-time validation as-is. Add `validate` as a standalone command for comprehensive checks. This matches the existing pattern where `generate` already validates semantic references.

### Decision 3: Token Source Verification Strictness

When `tokenSource` is configured, how strict should path verification be?

**Option A — Strict**: Require exact barrel export structure matching `@3fn/core/src/tokens/`
- Pro: Catches misconfiguration early
- Con: Brittle if token structure evolves

**Option B — Minimal**: Only require `getAllPrimitiveTokens` and `getAllSemanticTokens` exports
- Pro: Flexible, only checks what the pipeline actually needs
- Con: May miss structural issues

**Recommendation**: Option B. The pipeline needs specific functions; verify those exist. Don't over-constrain the directory structure.

---

## Dependencies

- **Spec 094** (Portable Pipeline and Theme Registry): Established the current `defineConfig()`, `ConfigLoader`, and CLI architecture. This spec extends that foundation.
- **No blocking dependencies**: This work can proceed independently.

---

## Risks and Counter-Arguments

### Risk 1: Dynamic import complexity
TypeScript dynamic imports from arbitrary paths require the TypeScript loader (`tsx` or `ts-node`) to be active. Product repos already need this for `designerpunk.config.ts`, so the loader is present — but importing from a different directory may have module resolution edge cases.

**Mitigation**: If using DI approach (Option B), the CLI layer handles the dynamic import once and passes plain data to the generator. The generator never does dynamic imports.

### Risk 2: Two sources of truth
With `tokenSource` pointing at local files, developers now have two copies of tokens (local + `node_modules/`). This could cause confusion about which is "real."

**Mitigation**: The CLI output explicitly shows which source is active. Documentation should clarify that `tokenSource` is for development iteration — the published package remains the source of truth for consumers.

### Risk 3: Validation scope creep
"Token validation" could expand indefinitely. Where do we draw the line?

**Mitigation**: V1 validates what the pipeline needs to generate correctly (references, required fields, mathematical relationships). Additional checks can be added incrementally. The validator should be extensible but ship minimal.

---

## Stakeholder Review

- **Ada** (primary): Owns pipeline architecture, will implement. Should review dynamic import approach and validation scope.
- **Lina** (secondary): Component tokens use the same pipeline. Should confirm `componentTokens` config path isn't affected.
- **Leonardo** (informational): Product architect consuming the pipeline. Can validate DX improvements match product workflow needs.

---

## Open Questions

1. Should `tokenSource` support pointing at a directory (barrel import) or also individual files? Recommendation: directory only, matching the existing `src/tokens/` structure.

2. Should `validate` output be machine-readable (JSON) in addition to human-readable? Useful for CI integration but adds scope.

3. Should the pipeline warn if `tokenSource` is set but the local source appears to be a stale copy of the package source (e.g., older modification date)? Could prevent "edited the wrong copy" confusion.

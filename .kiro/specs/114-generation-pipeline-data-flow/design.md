# Design Document: Generation Pipeline Data Flow Restructure

**Date**: 2026-06-05
**Spec**: 114 - Generation Pipeline Data Flow Restructure
**Status**: Design Phase
**Dependencies**: Spec 104 (complete), Spec 109 (complete), Spec 103 (complete)

---

## Overview

This design restructures the `npx designerpunk generate` CLI's data flow so that all generators receive token data exclusively via function parameters. The key architectural change is eliminating static barrel imports from generators, making data flow explicit and unidirectional from CLI → generators. Additionally, system and product token generation are isolated into independent error boundaries, and product token generation gains staleness detection.

---

## Architecture

### Pipeline Data Flow (After Restructure)

```
┌─────────────────────────────────────────────────────────────────┐
│  npx designerpunk generate                                       │
│                                                                   │
│  1. loadConfig(cwd) → ResolvedConfig                             │
│                                                                   │
│  2. resolveTokens(config) → { primitiveTokens, semanticTokens }  │
│                                                                   │
│  3. loadComponentTokens(config) → RegisteredComponentToken[]      │
│       (allowOverwrite: true when tokenSourceMode === 'local')     │
│                                                                   │
│  4. computeThemeVaryingTokens(config, semantics, primitives) → Set<string>   │
│                                                                   │
│  ┌─── System Pipeline (try/catch) ──────────────────────────┐    │
│  │ 5. generateTokenFiles(tokens, config)                     │    │
│  │ 6. generateTokenIndex(dir, {                              │    │
│  │      primitiveTokens, semanticTokens,                     │    │
│  │      componentTokens, themeVaryingTokens })               │    │
│  └───────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ┌─── Product Pipeline (independent try/catch) ──────────────┐   │
│  │ 7. isProductTokenStale(config) → boolean                  │   │
│  │ 8. generateProductTokens(config)  (if stale or --force)   │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                   │
│  9. Exit: 0 if all succeeded, 1 if any failed                   │
└─────────────────────────────────────────────────────────────────┘
```

### `--product-only` Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  npx designerpunk generate --product-only                        │
│                                                                   │
│  1. loadConfig(cwd) → ResolvedConfig                             │
│  2. isProductTokenStale(config) → boolean                        │
│  3. generateProductTokens(config)  (if stale or --force)         │
│  4. Exit: 0 if succeeded, 1 if failed                           │
│                                                                   │
│  Skips: resolveTokens, loadComponentTokens, generateTokenFiles,  │
│         generateTokenIndex                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Components and Interfaces

### TokenIndexInput (Modified Interface)

**File**: `src/generators/generateTokenIndex.ts`

```typescript
import type { PrimitiveToken } from '../types/PrimitiveToken';
import type { SemanticToken } from '../types/SemanticToken';
import type { RegisteredComponentToken } from '../registries/ComponentTokenRegistry';

/**
 * Required input for token-index generation.
 * All data must be explicitly provided — no barrel import fallbacks.
 */
export interface TokenIndexInput {
  primitiveTokens: PrimitiveToken[];
  semanticTokens: SemanticToken[];
  componentTokens: RegisteredComponentToken[];
  themeVaryingTokens: Set<string>;
}

/**
 * Generate the token index YAML files.
 * @param tokenIndexDir - Output directory for YAML files.
 * @param input - Required resolved token data from the CLI.
 */
export function generateTokenIndex(tokenIndexDir: string, input: TokenIndexInput): void;
```

### loadComponentTokens (Modified Signature)

**File**: `src/cli/loadComponentTokens.ts`

```typescript
import type { RegisteredComponentToken } from '../registries/ComponentTokenRegistry';
import type { ResolvedConfig } from '../config/ConfigLoader';

/**
 * Discover and load component token files from configured source.
 * Returns all registered component tokens for downstream consumers.
 *
 * When tokenSourceMode is 'local', uses allowOverwrite: true to prevent
 * double-registration conflicts with package-internal side-effect imports.
 */
export function loadComponentTokens(config: ResolvedConfig): RegisteredComponentToken[];
```

### isProductTokenStale (New Function)

**File**: `src/cli/staleness.ts`

```typescript
import type { ResolvedConfig } from '../config/ConfigLoader';

/**
 * Check whether product token output is stale relative to YAML source.
 * Returns true if any source file is newer than the oldest output file,
 * or if any output file is missing.
 *
 * Always returns true when --force is present.
 */
export function isProductTokenStale(config: ResolvedConfig): boolean;

/**
 * Get all product token output file paths for the configured platforms.
 */
export function getProductTokenOutputPaths(config: ResolvedConfig): string[];
```

### computeThemeVaryingTokens (New Function)

**File**: `src/cli/themeVarying.ts`

```typescript
import type { PrimitiveToken } from '../types/PrimitiveToken';
import type { SemanticToken } from '../types/SemanticToken';
import type { ResolvedConfig } from '../config/ConfigLoader';

/**
 * Compute the full set of theme-varying token names from:
 * 1. Config's registered theme overrides (explicit override keys)
 * 2. Base light/dark differences (color semantics whose referenced
 *    primitive has different light vs dark values)
 *
 * Uses primitive-reference-level comparison (primitive NAME lookup)
 * rather than full rgba resolution, avoiding circular dependency
 * with generateTokenFiles.
 */
export function computeThemeVaryingTokens(
  config: ResolvedConfig,
  semanticTokens: SemanticToken[],
  primitiveTokens: PrimitiveToken[]
): Set<string>;
```

---

## Data Models

No new data models. Uses existing types:
- `PrimitiveToken` from `src/types/PrimitiveToken.ts`
- `SemanticToken` from `src/types/SemanticToken.ts`
- `RegisteredComponentToken` from `src/registries/ComponentTokenRegistry.ts`
- `ResolvedConfig` from `src/config/ConfigLoader.ts`

---

## Error Handling

### Independent Error Boundaries

The CLI wraps system and product pipelines in separate try/catch blocks. Each pipeline:
- Catches its own errors
- Logs structured status (✅/❌) for its stage
- Does NOT prevent the other pipeline from executing

### Exit Code Strategy

| System Result | Product Result | Exit Code | Output |
|:---:|:---:|:---:|---|
| ✅ | ✅ | 0 | All succeeded |
| ✅ | ❌ | 1 | Product failure reported |
| ❌ | ✅ | 1 | System failure + `--product-only` suggestion |
| ❌ | ❌ | 1 | Both failures reported |
| ✅ | ⏭ (up-to-date) | 0 | Product skipped with log |
| ❌ | ⏭ (up-to-date) | 1 | System failure, product was already current |

### Staleness Detection Logging

Every staleness check produces visible output:
- Stale: regenerates (existing behavior — shows generation output)
- Up-to-date: `⏭ Product tokens up-to-date (source unchanged since <timestamp>)`
- Forced: `🔄 Product tokens regenerated (--force)`

---

## Testing Strategy

### Unit Tests

**`src/cli/__tests__/staleness.test.ts`**
- Returns true when output file missing
- Returns true when source YAML newer than output
- Returns false when output newer than all sources
- Returns true when `--force` flag present regardless of timestamps
- Handles multiple output files (uses oldest as comparison)

**`src/generators/__tests__/generateTokenIndex.test.ts`** (update existing)
- Verify function requires input parameter (TypeScript compilation check)
- Verify output uses provided primitives (not package defaults)
- Verify output uses provided semantics (not package defaults)
- Verify output uses provided componentTokens
- Verify output uses provided themeVaryingTokens

**`src/cli/__tests__/loadComponentTokens.test.ts`** (update existing)
- Returns `RegisteredComponentToken[]` (not number)
- Uses `allowOverwrite: true` when tokenSourceMode is 'local'
- Does not use allowOverwrite when tokenSourceMode is 'package'

### Integration Tests

**`src/cli/__tests__/pipeline-independence.test.ts`** (new)
- System failure does not prevent product generation
- Product output files written even when system fails
- Exit code is 1 when either pipeline fails
- Structured output includes ✅/❌ per stage

**`src/cli/__tests__/product-only.test.ts`** (new)
- `--product-only` skips system token resolution
- `--product-only` uses existing token-index on disk
- `--product-only` applies staleness detection
- `--product-only` respects `--force` flag

### Regression Tests

- Existing `generate` behavior unchanged for repos without `tokenSource`
- `scripts/generate-token-index.ts` compiles and produces correct output
- No double-registration error in repos with local component tokens

---

## Design Decisions

### Decision 1: allowOverwrite vs clear() for Double-Registration

**Options Considered**:
1. `ComponentTokenRegistry.clear()` before loading — simple but creates empty-window
2. `allowOverwrite: true` registration option — atomic per-token, already implemented
3. Deduplication in registry (skip if same component) — requires equality check logic

**Decision**: Option 2 — `allowOverwrite: true`

**Rationale**: The registry already supports this option in its `registerBatch` implementation. It's atomic per-token (no window where the registry is empty), requires a single-line change in the caller, and produces identical behavior in the single-threaded CLI path. No new code needed in the registry itself.

**Trade-offs**: Slightly less explicit than `clear()` (reader must know what `allowOverwrite` does), but no behavioral risk.

### Decision 2: Staleness via mtime (not content hash)

**Options Considered**:
1. File modification time comparison — simple, correct for hand-authored files
2. Content hashing (SHA256) — correct even for machine-generated files with unchanged content
3. Manifest file (record of last-generated sources) — most robust, most complex

**Decision**: Option 1 — mtime comparison with `--force` escape hatch

**Rationale**: Product token YAML files are hand-authored. The scenario where a file is "touched" without content change is unlikely in normal workflow. Mtime comparison is simple, requires no additional files, and is correct for the actual use case. The `--force` flag covers the edge case without adding complexity.

**Trade-offs**: If a tool reformats YAML without changing semantics, mtime triggers unnecessary regeneration. This is harmless (regeneration is fast) and rare.

### Decision 3: Exit 1 on Partial Failure

**Options Considered**:
1. Exit 0 if any generation succeeded (optimistic)
2. Exit 1 if any generation failed (strict)
3. Configurable exit behavior via flag

**Decision**: Option 2 — strict, exit 1 on any failure

**Rationale**: CI/CD pipelines must know something is broken. Exit 0 on partial failure silently passes builds where the system is unhealthy. The fix for "I only need product tokens" is `--product-only`, not ignoring system failures. Structured output ensures the developer knows what worked and what to do next.

**Trade-offs**: Developers who don't care about system token health see exit 1 until they learn to use `--product-only`. The recommendation in error output mitigates this.

### Decision 4: Remove generateTokenIndex from generateProductTokens

**Options Considered**:
1. Update the call to pass explicit tokens
2. Remove the call entirely (CLI already generates index before product gen)

**Decision**: Option 2 — remove entirely

**Rationale**: The CLI calls `generateTokenIndex` with local-source-aware data before calling `generateProductTokens`. The call inside product gen was undoing that work by regenerating with package barrel defaults. Removing it eliminates the conflict and simplifies the product generator's responsibility (generate product tokens, don't manage the index).

**Trade-offs**: If someone calls `generateProductTokens` outside the CLI (directly in tests or scripts), they must ensure token-index is already current. This is acceptable — the function's contract is "reads token-index from disk," not "ensures token-index is fresh."

# Design Document: Pipeline DX — Source Resolution & Validation

**Date**: 2026-05-09
**Spec**: 103 - Pipeline DX: Source Resolution & Validation
**Status**: Design Phase
**Dependencies**: Spec 094 (Portable Pipeline and Theme Registry) — complete

---

## Overview

This design refactors the pipeline's token loading from static imports to dependency injection, adds a `tokenSource` config option for local source resolution, improves CLI output transparency, and introduces a standalone `validate` command. The core architectural change is small: the CLI layer resolves tokens and passes them to the generator as data.

---

## Architecture

### Current Flow (Before)

```
designerpunk.config.ts → ConfigLoader → ResolvedConfig
                                              ↓
CLI (designerpunk.ts) → generateTokenFiles(outputDir, config)
                              ↓
                    static import '../tokens' (hardcoded)
                    static import '../tokens/semantic' (hardcoded)
                              ↓
                    build registries → validate → resolve → generate
```

### New Flow (After)

```
designerpunk.config.ts → ConfigLoader → ResolvedConfig (with tokenSourceRoot)
                                              ↓
CLI (designerpunk.ts) → resolveTokens(config) → TokenInput { primitive[], semantic[] }
                              ↓                         ↓
                    [validate command]         generateTokenFiles(tokens, config)
                              ↓                         ↓
                    orchestrate validators     build registries → validate → resolve → generate
```

**Key change**: Token resolution moves from inside `generateTokenFiles()` to the CLI orchestration layer. The generator receives data, not paths.

---

## Components and Interfaces

### 1. Config Extension (`src/config/defineConfig.ts`)

```typescript
export interface DesignerPunkConfig {
  name?: string;
  abbreviation?: string;
  themes?: ConfigTheme[];
  componentTokens?: string[];
  output?: string;
  /** 
   * Path to local token source directory. When set, the pipeline resolves
   * primitive and semantic tokens from this path instead of the installed package.
   * Must be a complete token source (no fallback to package for missing families).
   * Path is resolved relative to the config file's directory.
   * When omitted, tokens resolve from the installed package's src/tokens/.
   */
  tokenSource?: string;
}
```

### 2. ConfigLoader Update (`src/config/ConfigLoader.ts`)

```typescript
export interface ResolvedConfig {
  // ... existing fields ...
  /** Resolved absolute path to token source root. */
  tokenSourceRoot: string;
  /** Whether token source is local (from config) or package (default). */
  tokenSourceMode: 'local' | 'package';
}
```

Resolution logic change:
```typescript
// Current: tokenSourceRoot = cwd (misleading, unused)
// New: tokenSourceRoot = resolved tokenSource path OR package src/tokens/
const tokenSourceRoot = userConfig.tokenSource
  ? path.resolve(configDir, userConfig.tokenSource)
  : resolvePackageTokensPath();  // node_modules/@3fn/core/src/tokens/ or local dev path

const tokenSourceMode: 'local' | 'package' = userConfig.tokenSource ? 'local' : 'package';
```

`resolvePackageTokensPath()` determines the package token path:
- In both development and consumption: `path.resolve(__dirname, '../../tokens')`
- This works because the bin entry loads `src/cli/designerpunk.ts` via tsx, so `__dirname` is always `src/cli/` whether running from the repo or from `node_modules/@3fn/core/`. The package ships `src/` in its `files` field.

### 3. Token Resolver (`src/cli/resolveTokens.ts`) — NEW

```typescript
import type { PrimitiveToken } from '../types/PrimitiveToken';
import type { SemanticToken } from '../types/SemanticToken';
import type { ResolvedConfig } from '../config/ConfigLoader';

export interface TokenInput {
  primitiveTokens: PrimitiveToken[];
  semanticTokens: SemanticToken[];
}

/**
 * Resolve tokens from the configured source.
 * Uses dynamic import to load from either package or local path.
 */
export async function resolveTokens(config: ResolvedConfig): Promise<TokenInput> {
  const sourcePath = config.tokenSourceRoot;

  // Verify barrel exports exist
  await verifyBarrelContract(sourcePath);

  // Dynamic import from resolved path
  const tokenBarrel = await import(sourcePath);
  const semanticBarrel = await import(`${sourcePath}/semantic`);

  const primitiveTokens: PrimitiveToken[] = tokenBarrel.getAllPrimitiveTokens();
  const semanticTokens: SemanticToken[] = semanticBarrel.getAllSemanticTokens();

  return { primitiveTokens, semanticTokens };
}

/**
 * Verify the token source directory exports the required barrel functions.
 */
async function verifyBarrelContract(sourcePath: string): Promise<void> {
  let tokenBarrel: any;
  let semanticBarrel: any;

  try {
    tokenBarrel = await import(sourcePath);
  } catch (err) {
    throw new Error(
      `Token source not found at: ${sourcePath}\n` +
      `Expected a barrel file (index.ts) exporting getAllPrimitiveTokens().`
    );
  }

  if (typeof tokenBarrel.getAllPrimitiveTokens !== 'function') {
    throw new Error(
      `Token source at ${sourcePath} does not export getAllPrimitiveTokens().\n` +
      `Expected: export function getAllPrimitiveTokens(): PrimitiveToken[]`
    );
  }

  try {
    semanticBarrel = await import(`${sourcePath}/semantic`);
  } catch (err) {
    throw new Error(
      `Semantic token source not found at: ${sourcePath}/semantic\n` +
      `Expected a semantic/ subdirectory with barrel file exporting getAllSemanticTokens().`
    );
  }

  if (typeof semanticBarrel.getAllSemanticTokens !== 'function') {
    throw new Error(
      `Semantic token source at ${sourcePath}/semantic does not export getAllSemanticTokens().\n` +
      `Expected: export function getAllSemanticTokens(): SemanticToken[]`
    );
  }
}
```

### 4. Generator Refactor (`src/generators/generateTokenFiles.ts`)

**New signature**:
```typescript
export function generateTokenFiles(tokens: TokenInput, config: ResolvedConfig): void
```

**Changes**:
- Remove static imports of `getAllPrimitiveTokens` and `getAllSemanticTokens`
- Remove `outputDir` parameter (use `config.outputDir`)
- Accept `TokenInput` as first parameter
- Use `tokens.primitiveTokens` and `tokens.semanticTokens` where the static imports were used
- Remove `if (require.main === module)` self-invocation block
- All internal logic (registry building, validation, theme resolution, generation) remains unchanged

**What stays the same**:
- `PrimitiveTokenRegistry` and `SemanticTokenRegistry` construction (from the injected arrays)
- `SemanticTokenValidator.validateSemanticReferences()` call
- `SemanticOverrideResolver` and theme resolution logic
- `TokenFileGenerator.generateAll()` call
- Component token generation via `ComponentTokenRegistry` (untouched)
- DTCG and Figma generation (untouched)

### 5. Validate Command (`src/cli/validate.ts`) — NEW

```typescript
import { loadConfig } from '../config/ConfigLoader';
import { resolveTokens } from './resolveTokens';
import { PrimitiveTokenRegistry } from '../registries/PrimitiveTokenRegistry';
import { SemanticTokenRegistry } from '../registries/SemanticTokenRegistry';
import { SemanticTokenValidator } from '../validators/SemanticTokenValidator';
import { MathematicalRelationshipParser } from '../validators/MathematicalRelationshipParser';

interface ValidationResult {
  passed: boolean;
  checks: CheckResult[];
}

interface CheckResult {
  name: string;
  passed: boolean;
  errors: string[];
}

export async function runValidate(): Promise<void> {
  const config = await loadConfig(process.cwd());
  const tokens = await resolveTokens(config);

  // Display source info
  const relativePath = path.relative(process.cwd(), config.tokenSourceRoot);
  console.log(`🔍 Validating tokens from: ${relativePath} (${config.tokenSourceMode})\n`);

  const results: CheckResult[] = [];

  // Check 1: Required field presence
  results.push(validateRequiredFields(tokens.primitiveTokens));

  // Check 2: Family membership (registration validation)
  results.push(validateFamilyMembership(tokens.primitiveTokens, tokens.semanticTokens));

  // Check 3: Semantic reference integrity
  results.push(validateSemanticReferences(tokens.primitiveTokens, tokens.semanticTokens));

  // Check 4: Mathematical relationship validation
  results.push(validateMathematicalRelationships(tokens.primitiveTokens));

  // Report results
  const passed = results.every(r => r.passed);
  reportResults(results, passed);
  process.exit(passed ? 0 : 1);
}
```

**Validation checks** (each reuses existing infrastructure):

1. **Required field presence**: Iterate `PrimitiveToken[]`, check all required fields are non-null/non-empty.
2. **Family membership**: Build `PrimitiveTokenRegistry` and `SemanticTokenRegistry` from token arrays — registration itself validates uniqueness and category membership.
3. **Semantic reference integrity**: Use `SemanticTokenValidator.validateSemanticReferences(semanticTokens, primitiveTokens)` — already exists.
4. **Mathematical relationships**: Use `MathematicalRelationshipParser.parse()` on each primitive's `mathematicalRelationship` field, check `isValid`.

### 6. CLI Update (`src/cli/designerpunk.ts`)

```typescript
case 'validate':
  await runValidate();
  break;
case undefined:
case 'generate':
  await runGenerate();
  break;
```

Updated `runGenerate()`:
```typescript
async function runGenerate() {
  const config = await loadConfig(process.cwd());
  const tokens = await resolveTokens(config);

  const relativePath = path.relative(process.cwd(), config.tokenSourceRoot);
  console.log(`📦 ${config.name} (${config.abbreviation})`);
  console.log(`   Tokens: ${relativePath}  (${config.tokenSourceMode})`);
  console.log(`   Output: ${path.relative(process.cwd(), config.outputDir)}`);
  if (config.themes.length > 0) {
    console.log(`   Themes: ${config.themes.map(t => `${t.name} (${t.mode})`).join(', ')}`);
  }
  console.log('');

  generateTokenFiles(tokens, config);
}
```

---

## Call Site Updates

| Call Site | Current | After |
|-----------|---------|-------|
| `src/cli/designerpunk.ts` line 80 | `generateTokenFiles(config.outputDir, config)` | `generateTokenFiles(tokens, config)` (tokens resolved above) |
| `src/generators/__tests__/ProductRepoSimulation.test.ts` (4 calls) | `generateTokenFiles(config.outputDir, config)` | `generateTokenFiles({ primitiveTokens: getAllPrimitiveTokens(), semanticTokens: getAllSemanticTokens() }, config)` |
| `scripts/generate-platform-tokens.ts` line 49 | `generateTokenFiles(outputDir)` | Remove this call — the script should use the CLI (`npx designerpunk generate`) or be updated to resolve tokens and pass them |
| `src/generators/generateTokenFiles.ts` line 259 | `if (require.main === module) { generateTokenFiles(outputDir) }` | Remove entirely — CLI supersedes this |

---

## Error Handling

### Missing Token Source

When `tokenSource` is configured but the path doesn't exist:
```
❌ Token source not found at: ./src/tokens
   Expected a barrel file (index.ts) exporting getAllPrimitiveTokens().
```

### Missing Barrel Export

When the directory exists but doesn't export the required function:
```
❌ Token source at ./src/tokens does not export getAllPrimitiveTokens().
   Expected: export function getAllPrimitiveTokens(): PrimitiveToken[]
```

### Missing Semantic Subdirectory

When the semantic barrel is missing:
```
❌ Semantic token source not found at: ./src/tokens/semantic
   Expected a semantic/ subdirectory with barrel file exporting getAllSemanticTokens().
```

### Validation Failures

When `validate` finds issues:
```
🔍 Validating tokens from: ./src/tokens (local)

✅ Required fields: 147 tokens checked, all valid
✅ Family membership: 147 primitives, 89 semantics registered
❌ Semantic references: 2 errors
   - color.action.primary references primitive 'colorPrimary500' which does not exist
   - color.surface.elevated references primitive 'colorNeutral50' which does not exist
✅ Mathematical relationships: 147 expressions valid

❌ Validation failed (1 of 4 checks failed)
```

---

## Design Decisions

### Decision 1: Dynamic Import in resolveTokens

**Options Considered**:
1. Dynamic `import()` from resolved path
2. `require()` with path manipulation
3. Read files and eval/compile manually

**Decision**: Dynamic `import()`.

**Rationale**: The TypeScript loader (`tsx` or `ts-node`) is already required for loading `designerpunk.config.ts`. Dynamic import leverages the same loader for token source resolution. No additional tooling needed.

**Trade-off**: Dynamic imports are async, making `resolveTokens` async. This is fine — the CLI is already async (`main()` is async).

### Decision 2: resolvePackageTokensPath Strategy

**Options Considered**:
1. Hardcode relative path from CLI file (`../../tokens`)
2. Use `require.resolve('@3fn/core/package.json')` to find package root
3. Use `__dirname` relative resolution

**Decision**: Relative from `__dirname` with fallback.

**Rationale**: In development, the CLI runs from within the repo — `__dirname` is `src/cli/`, so `../../tokens` is `src/tokens/`. In consumption, the CLI runs from `node_modules/@3fn/core/src/cli/` (or `dist/cli/`), so the same relative path still works. The `require.resolve` approach adds complexity for the same result.

### Decision 3: Validation Output Format

**Options Considered**:
1. Structured JSON output
2. Human-readable with emoji indicators
3. TAP format (Test Anything Protocol)

**Decision**: Human-readable with emoji indicators (matching existing pipeline output style).

**Rationale**: V1 is human-readable only (per feedback resolution J). The existing pipeline uses emoji + indented text. Matching that style keeps the CLI consistent. JSON output deferred to V2.

### Decision 4: scripts/generate-platform-tokens.ts Handling

**Options Considered**:
1. Update the script to use new signature
2. Remove the script entirely (CLI supersedes it)
3. Make it a thin wrapper around the CLI

**Decision**: Update to use new signature (import tokens explicitly, pass to generator).

**Rationale**: The script serves as a development convenience for running generation without the full CLI config. Removing it would break existing developer workflows. Updating it is minimal effort.

---

## Testing Strategy

### Unit Tests

- **resolveTokens**: Mock dynamic imports, verify barrel contract checking, verify error messages for missing exports
- **ConfigLoader**: Test `tokenSource` resolution (relative path, absent = package default, `tokenSourceMode` field)
- **validate command**: Mock token resolution, verify each check runs and reports correctly

### Integration Tests

- **ProductRepoSimulation.test.ts**: Update to new signature, verify identical output
- **End-to-end generate**: Verify CLI produces same output with package source (regression)
- **End-to-end validate**: Verify exit codes and output format

### Regression Safety

The key invariant: `generateTokenFiles(tokens, config)` produces **identical output** to the old `generateTokenFiles(outputDir, config)` when given the same token data. The `ProductRepoSimulation` tests serve as the regression gate.

---

## Scope Boundaries (Design-Level)

### This Design Covers
- `tokenSource` config field and ConfigLoader resolution
- `resolveTokens()` with barrel contract verification
- `generateTokenFiles()` signature change (DI)
- `validate` command orchestrating existing validators
- CLI output update (transparent source display)
- Call site updates (4 locations)
- Help text update

### This Design Does NOT Cover
- Component token resolution changes (remains registry-based)
- Theme override resolution changes (remains config-based)
- Watch mode or hot reload
- Machine-readable validation output
- Staleness detection
- Token contribution workflow

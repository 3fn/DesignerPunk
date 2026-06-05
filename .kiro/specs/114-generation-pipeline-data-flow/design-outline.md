# Design Outline: Generation Pipeline Data Flow Restructure

**Spec**: 114 - Generation Pipeline Data Flow Restructure
**Date**: 2026-06-05
**Status**: Design Outline (R2 — feedback incorporated)
**Agent**: Ada (implementation) + Thurgood (formalization)

---

## Problem Statement

The `npx designerpunk generate` pipeline has three interrelated defects that share a single root cause: generators import tokens directly from package-internal barrel files instead of receiving them as explicit function parameters.

**Defect 1 — Generator bypass** (filed May 9, v11.3.0): `generateTokenIndex.ts` still uses `getAllPrimitiveTokens()` and `getAllSemanticTokens()` from package barrel imports as fallback. When the optional `TokenIndexInput` parameter isn't provided, or for component tokens, the generator ignores the resolved local source. Additionally, `generateProductTokens.ts` calls `generateTokenIndex()` without input, undoing the local-source-aware index the CLI just generated.

**Defect 2 — Component token double-registration** (filed May 25, v11.7.1): `generateTokenIndex.ts` imports `ComponentTokenRegistry` which triggers side-effect imports of package component token files at module load time. When `loadComponentTokens()` later registers the same tokens from local source, the registry throws a conflict error.

**Defect 3 — Product token staleness** (filed June 4): No mechanism detects when product token YAML source files have been added or modified. `npx designerpunk generate` skips product token regeneration when output already exists, regardless of source changes. Additionally, the double-registration error (Defect 2) blocks the entire pipeline — including the independent product token generation.

**Root cause**: The generation pipeline was designed before `tokenSource` portability existed (Spec 104). Generators still assume they own their token data via static imports. The `tokenSource` feature added resolved inputs at the CLI level, but generators weren't fully migrated to consume them.

---

## Proposed Solution

Restructure the generation pipeline so that **all generators receive token data exclusively via function parameters** — no generator imports tokens directly from barrel files or triggers side-effect registrations.

### Design Principles

1. **Explicit data flow**: Every generator receives its inputs as function arguments. No static imports of token source files from generators.
2. **Single authority**: For any token category (primitive, semantic, component, product), there is exactly one load point in the pipeline. No dual-loading.
3. **Pipeline independence**: Product token generation cannot be blocked by system token errors (and vice versa). Each pipeline stage fails independently.
4. **Staleness detection**: The pipeline checks source-vs-output timestamps by default and logs the result either way (never silent skip).
5. **Honest failure reporting**: Partial success is still exit 1, with structured output showing what succeeded and what failed.

---

## Scope

### In Scope

- Remove static barrel imports (`getAllPrimitiveTokens`, `getAllSemanticTokens`) from `generateTokenIndex.ts`
- Remove side-effect-triggering `ComponentTokenRegistry` import from `generateTokenIndex.ts`
- Remove redundant `generateTokenIndex()` call from `generateProductTokens.ts` (line 29)
- Make `TokenIndexInput` parameter **required** (not optional) — callers must provide resolved tokens
- Add component token data and theme-varying set to `TokenIndexInput` interface
- Use `allowOverwrite: true` in component token registration when `tokenSourceMode === 'local'` (prevents double-registration atomically)
- Decouple product token generation from the system token pipeline error boundary
- Add source-vs-output staleness detection for product token YAML files (default on, `--force` to override)
- Add `--product-only` flag that skips system token resolution/generation entirely
- Update `scripts/generate-token-index.ts` to pass tokens explicitly
- Exit 1 on any pipeline failure with structured output showing per-stage success/failure

### Out of Scope

- Semantic token resolution logic (already correct in `resolveTokens.ts`)
- Theme registry architecture (working correctly)
- Product token YAML format changes (Spec 108 complete)
- Product token generator internals (Spec 109 complete — the generator itself works)
- New CLI commands (`sync` is Spec 111)
- Performance optimization (staleness detection is correctness, not speed)
- Product token ref validation under `--product-only` (explicitly excluded — preserves pipeline decoupling per Spec 109's existing behavior)

---

## Architecture

### Current Data Flow (Broken)

```
CLI (designerpunk.ts)
  │
  ├── resolveTokens(config) → { primitives, semantics }
  │
  ├── loadComponentTokens(config) → registers with global ComponentTokenRegistry (returns count)
  │
  ├── generateTokenFiles(tokens, config)     ← ✅ Receives tokens as params
  │
  ├── generateTokenIndex(dir, tokens?)       ← ⚠️ tokens optional, falls back to barrel imports
  │       └── import '../tokens'             ← 💥 SIDE EFFECT: registers package component tokens
  │       └── import ComponentTokenRegistry  ← 💥 DOUBLE REGISTRATION with loadComponentTokens
  │       └── creates fresh ThemeRegistry    ← ⚠️ ignores product themes from config
  │
  └── generateProductTokens(config)          ← ❌ Blocked if previous step throws
          └── calls generateTokenIndex()     ← 💥 UNDOES local-aware index (no input passed)
```

### Proposed Data Flow (Fixed)

```
CLI (designerpunk.ts)
  │
  ├── resolveTokens(config) → { primitives, semantics }
  │
  ├── loadComponentTokens(config) → returns RegisteredComponentToken[]
  │       (uses allowOverwrite: true when tokenSourceMode === 'local')
  │
  ├── computeThemeVaryingTokens(config, semantics, primitives) → Set<string>
  │
  │   ┌─── System Token Pipeline (try/catch) ───────────────────────┐
  ├── │ generateTokenFiles(tokens, config)                           │
  │   │ generateTokenIndex(dir, { primitives, semantics,             │
  │   │                           componentTokens, themeVaryingTokens }) │
  │   └─────────────────────────────────────────────────────────────┘
  │
  │   ┌─── Product Token Pipeline (independent try/catch) ──────────┐
  └── │ stalenessCheck(config) → stale? regenerate : log & skip     │
      │ generateProductTokens(config)                                │
      └─────────────────────────────────────────────────────────────┘

Exit code: 1 if ANY pipeline failed, 0 only if ALL succeeded
Output: structured per-stage status (✅/❌) with --product-only recommendation on partial failure
```

### `--product-only` Data Flow

```
CLI (designerpunk.ts --product-only)
  │
  ├── loadConfig(cwd)
  │
  ├── stalenessCheck(config) → stale? regenerate : log & skip
  │
  └── generateProductTokens(config)
        └── reads token-index/*.yaml (already on disk, no live resolution)

Skips: resolveTokens, loadComponentTokens, generateTokenFiles, generateTokenIndex
```

### Key Changes

**1. `generateTokenIndex.ts` — Eliminate barrel imports, receive all data**

Remove:
```typescript
import { getAllPrimitiveTokens } from '../tokens';
import { getAllSemanticTokens } from '../tokens/semantic';
import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry';
import { ThemeRegistry } from '../themes/ThemeRegistry';
import { darkSemanticOverrides } from '../tokens/themes/dark/SemanticOverrides';
import { wcagSemanticOverrides } from '../tokens/themes/wcag/SemanticOverrides';
import { darkWcagSemanticOverrides } from '../tokens/themes/dark-wcag/SemanticOverrides';
```

Change `TokenIndexInput` from optional to required, expand interface:
```typescript
export interface TokenIndexInput {
  primitiveTokens: PrimitiveToken[];
  semanticTokens: SemanticToken[];
  componentTokens: RegisteredComponentToken[];
  themeVaryingTokens: Set<string>;
}

export function generateTokenIndex(tokenIndexDir: string, input: TokenIndexInput): void {
  // Use input exclusively — no fallback to barrel imports
  // Use input.themeVaryingTokens instead of computing internally
}
```

**2. `loadComponentTokens.ts` — Return registered tokens, prevent conflicts atomically**

```typescript
export function loadComponentTokens(config: ResolvedConfig): RegisteredComponentToken[] {
  // Use allowOverwrite: true when local source (atomic, no empty-window)
  const registrationOpts = config.tokenSourceMode === 'local'
    ? { allowOverwrite: true }
    : undefined;

  // ... existing discovery and require() logic, passing registrationOpts ...

  // Return all registered tokens for downstream consumers
  return ComponentTokenRegistry.getAll();
}
```

**3. `generateProductTokens.ts` — Remove redundant token-index call**

Remove line ~29:
```typescript
// REMOVE: generateTokenIndex(tokenIndexDir);
// The CLI already generates the index before calling this function.
// Product generation reads existing token-index/*.yaml, doesn't regenerate it.
```

**4. `designerpunk.ts` CLI — Independent error boundaries with structured output**

```typescript
let systemFailed = false;
let productFailed = false;

// System token pipeline
try {
  const tokens = resolveTokens(config);
  const componentTokens = loadComponentTokens(config);
  const themeVaryingTokens = computeThemeVaryingTokens(config, tokens.semanticTokens);
  generateTokenFiles(tokens, config);
  generateTokenIndex(tokenIndexDir, {
    primitiveTokens: tokens.primitiveTokens,
    semanticTokens: tokens.semanticTokens,
    componentTokens,
    themeVaryingTokens,
  });
  console.log('✅ System tokens generated');
} catch (err) {
  systemFailed = true;
  console.error(`❌ System token generation failed: ${err.message}`);
}

// Product token pipeline (independent)
if (config.productTokens) {
  try {
    if (isProductTokenStale(config)) {
      generateProductTokens(config);
      console.log('✅ Product tokens generated');
    } else {
      console.log('⏭ Product tokens up-to-date (source unchanged)');
    }
  } catch (err) {
    productFailed = true;
    console.error(`❌ Product token generation failed: ${err.message}`);
  }
}

if (systemFailed || productFailed) {
  if (systemFailed && !productFailed) {
    console.error('\n💡 Use --product-only to generate product tokens independently.');
  }
  process.exit(1);
}
```

**5. Product token staleness detection (default on, `--force` overrides)**

```typescript
function isProductTokenStale(config: ResolvedConfig): boolean {
  if (process.argv.includes('--force')) return true;  // Always regenerate

  const outputPaths = getProductTokenOutputPaths(config);  // All platform files
  if (outputPaths.some(p => !fs.existsSync(p))) return true;  // Missing output = stale

  const oldestOutput = Math.min(...outputPaths.map(p => fs.statSync(p).mtimeMs));
  const yamlFiles = globSync(path.join(config.productTokensDir, '**/*.yaml'));

  return yamlFiles.some(f => fs.statSync(f).mtimeMs > oldestOutput);
}
```

**6. `scripts/generate-token-index.ts` — Pass tokens explicitly**

```typescript
// Package-internal script — allowed to import from barrels (it IS the package)
import { getAllPrimitiveTokens } from '../src/tokens';
import { getAllSemanticTokens } from '../src/tokens/semantic';
import { ComponentTokenRegistry } from '../src/registries/ComponentTokenRegistry';

// Import component tokens to populate registry
import '../src/tokens/component/progress';

const themeVaryingTokens = computeThemeVaryingFromOverrides();

generateTokenIndex(OUTPUT_DIR, {
  primitiveTokens: getAllPrimitiveTokens(),
  semanticTokens: getAllSemanticTokens(),
  componentTokens: ComponentTokenRegistry.getAll(),
  themeVaryingTokens,
});
```

---

## Risk Assessment

**Low risk**: `generateTokenFiles.ts` already receives tokens via params — no change needed.

**Medium risk**: Changing `generateTokenIndex`'s signature from optional to required params. Known callers that need updating:
- `src/cli/designerpunk.ts` — already passes tokens, needs component tokens + themeVarying added
- `src/cli/generateProductTokens.ts` — call should be REMOVED entirely
- `scripts/generate-token-index.ts` — needs explicit token passing (compile break otherwise)
- Test files calling `generateTokenIndex` directly — need input provided

**Low risk**: Using `allowOverwrite: true` for component token registration — already supported infrastructure in `ComponentTokenRegistry`, single-line change.

**Low risk**: Staleness detection — purely additive, no behavioral change to existing successful paths. Logs result in all cases (never silent).

---

## Dependencies

- Spec 104 (Token Source Portability) — complete, provides `tokenSource` and `loadComponentTokens`
- Spec 109 (Product Token Generation) — complete, provides `generateProductTokens` and `ProductTokenGenerator`
- Spec 103 (Pipeline DX Source Resolution) — complete, provides `resolveTokens` and `ConfigLoader`

No blocking dependencies. This spec builds on infrastructure that's already shipped.

---

## Success Criteria

1. `npx designerpunk generate` succeeds in repos with `tokenSource` configured and local component tokens (no double-registration error)
2. Generated token-index reflects local token source (not package defaults) for all token types including component tokens and theme-varying status
3. Adding a new product token YAML file and running `generate` produces updated output without manual intervention
4. System token generation failure does NOT prevent product token generation (output written, exit 1, `--product-only` suggested)
5. `npx designerpunk generate --product-only` regenerates product tokens without loading or validating system tokens
6. Existing repos without `tokenSource` continue to work unchanged (backward compatible)
7. Staleness detection logs its decision in all cases (never silently skips)

---

## Decisions Made (from R1 feedback)

| Decision | Choice | Rationale | Source |
|----------|--------|-----------|--------|
| Double-registration prevention | `allowOverwrite: true` | Atomic per-token, no empty-window race, already implemented | Ada R1 |
| `--product-only` scope | Skip all system resolution/generation | Product tokens only need `token-index/*.yaml` on disk | Ada R1 |
| Staleness detection mode | Default on, `--force` to override | Developer shouldn't need to know staleness is a risk | Sparky R1 |
| `loadComponentTokens` return type | `RegisteredComponentToken[]` via `getAll()` | Registry is the collector, no API changes needed | Ada R1 |
| Exit code on partial failure | Exit 1 with structured output | Partial success is still failure for CI; recommend `--product-only` | Ada R1 + Sparky R1 |
| Token-index ThemeRegistry | Pass `themeVaryingTokens: Set<string>` as input | Generator shouldn't compute themes internally (misses product themes) | Ada R1 |
| Redundant `generateTokenIndex` in product gen | Remove entirely | CLI already generates index before product gen runs | Ada R1 |

---

## Stakeholder Review

- **Ada** — Primary implementer. Owns all files being modified. ✅ Reviewed R1.
- **Sparky** — Consumer. Filed the product staleness issue. ✅ Reviewed R1.
- **Thurgood** — Spec formalization and test governance.

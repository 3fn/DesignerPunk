# @3fn/core Feedback — Generator Bypasses tokenSource for Primitives

**Date**: 2026-05-09
**Version tested**: 11.3.0
**Agent**: Ada — token development, pipeline integration
**Severity**: High — `tokenSource` feature doesn't fully work for its primary use case

---

## Bug: Primitive Token Output Ignores `tokenSource`

### Summary

When `tokenSource` is configured, the pipeline correctly loads and validates primitives from local source. But the generated output (CSS, Swift, Kotlin) still contains the **package's** primitive values, not the local ones. Local primitive edits pass validation but don't appear in output.

### Reproduction

1. Set `tokenSource: './src/tokens'` in `designerpunk.config.ts`
2. Edit a primitive value (e.g., change `fontFamilyBody` from Inter to Figtree in `src/tokens/FontFamilyTokens.ts`)
3. Run `npx designerpunk generate`
4. Pipeline reports `Tokens: src/tokens (local)` ✅
5. Validation passes ✅
6. Generated CSS still shows `--font-family-body: Inter` ❌

### Root Cause

`src/generators/TokenFileGenerator.ts` line 17:

```typescript
import { getAllPrimitiveTokens, getTokensByCategory, ... } from '../tokens';
```

The generator imports primitives directly from the package's own `src/tokens/` barrel. It does NOT receive primitives via `GenerationOptions`. Semantic tokens are correctly passed in (via the `semanticTokens` field), but primitives are hardcoded.

The pipeline's `resolveTokens()` correctly loads from local source, but the resolved `primitiveTokens` array is never passed to the generator — it's only used for semantic token resolution (looking up primitive references).

### Expected Behavior

Generated output should reflect the `tokenSource` primitives, not the package's built-in values.

### Suggested Fix

Pass resolved primitives through `GenerationOptions`, same pattern as semantic tokens:

```typescript
// In GenerationOptions interface:
export interface GenerationOptions extends BaseGenerationOptions {
  primitiveTokens: PrimitiveToken[];  // ← ADD THIS
  semanticTokens: Array<Omit<SemanticToken, 'primitiveTokens'>>;
  darkSemanticTokens: Array<Omit<SemanticToken, 'primitiveTokens'>>;
  // ...
}
```

Then in the generator, use `options.primitiveTokens` instead of `getAllPrimitiveTokens()`:

```typescript
// Before (hardcoded):
const primitives = getAllPrimitiveTokens();

// After (from resolved input):
const primitives = options.primitiveTokens;
```

The CLI already has the resolved primitives from `resolveTokens()` — it just needs to pass them through.

---

## Secondary Issue: Duplicate Component Token Conflict

### Summary

When `tokenSource` enables component token discovery, files with overlapping definitions in the same component directory cause "already registered" errors.

### Reproduction

`src/components/core/Avatar-Base/` contains both:
- `avatar.tokens.ts` — defines `avatar.size.xs`, `avatar.size.sm`, etc.
- `avatar-sizing.tokens.ts` — defines the same tokens

The `*.tokens.ts` glob discovers both files. Both call `defineComponentTokens()` with the same token names → conflict.

### Context

This doesn't occur without `tokenSource` because the package pipeline doesn't scan `src/components/` by default. It only surfaces when `componentTokens` config points at directories containing duplicate token files.

### Suggested Fix

Either:
- **Loader-side**: Detect duplicate registrations and skip (last-write-wins or first-write-wins with warning)
- **Lint-side**: Add a portability boundary test that flags duplicate token names across `*.tokens.ts` files in the same component directory

---

## Status of Previous Feedback Items

| Item | Version | Status |
|------|---------|--------|
| Show token source path in output | 11.2.0 | ✅ Fixed |
| Better error message for unresolved imports | 11.2.1 | ✅ Fixed |
| `@3fn/core/types` subpath export | 11.2.1 | ✅ Fixed |
| `npx designerpunk validate` command | 11.2.1 | ✅ Fixed |
| `@3fn/core/build` subpath export | 11.3.0 | ✅ Fixed |
| Inlined constants/UnitConverter for portability | 11.3.0 | ✅ Fixed |
| `src/types/` shipped with init | 11.3.0 | ✅ Fixed |
| Component token discovery from local source | 11.3.0 | ✅ Fixed |
| **Generator uses resolved primitives** | — | ❌ Open (this doc) |
| **Duplicate component token handling** | — | ❌ Open (this doc) |

---

## Impact on Our Workflow

Until the generator bug is fixed, we use the dual-edit workaround:
1. Edit `src/tokens/` (canonical source, committed to git)
2. Edit `node_modules/@3fn/core/src/tokens/` (runtime copy, lost on `npm install`)

This is fragile but functional. The `tokenSource` config is set and ready — once the generator reads from resolved input, the dual-edit becomes unnecessary.

---

## Manual Steps Required to Get `tokenSource` Working (11.3.0)

These are the steps I had to perform manually after `npm install @3fn/core@11.3.0` to get the pipeline running with `tokenSource: './src/tokens'`. Ideally these would be handled by `npx designerpunk init` or documented in a migration guide.

### 1. Copy `src/types/` from the package

```bash
cp -r node_modules/@3fn/core/src/types src/types
```

Without this, all token files fail with `Cannot find module '../types/PrimitiveToken'`.

### 2. Sync updated token files that had inlined dependencies

```bash
cp node_modules/@3fn/core/src/tokens/SpacingTokens.ts src/tokens/SpacingTokens.ts
cp node_modules/@3fn/core/src/tokens/semantic/TypographyTokens.ts src/tokens/semantic/TypographyTokens.ts
cp node_modules/@3fn/core/src/tokens/semantic/ColorTokens.ts src/tokens/semantic/ColorTokens.ts
```

The local copies still had `import { STRATEGIC_FLEXIBILITY_TOKENS } from '../constants/...'` and `import { UnitConverter } from '../../build/tokens/...'` — these were inlined in 11.3.0's package source but our local copies were stale.

**Note**: This overwrote our local font family edits in SpacingTokens.ts (it didn't — SpacingTokens doesn't have font families, but the principle applies: syncing files from the package can clobber local edits if you're not careful).

### 3. Rewrite `defineComponentTokens` imports in all component token files

8 files needed their import changed from relative paths to the package subpath:

```typescript
// Before (various relative paths):
import { defineComponentTokens } from '../../build/tokens';
import { defineComponentTokens } from '../../../build/tokens';

// After (all files):
import { defineComponentTokens } from '@3fn/core/build';
```

Files affected:
- `src/tokens/component/progress.ts`
- `src/components/core/Avatar-Base/avatar.tokens.ts`
- `src/components/core/Avatar-Base/avatar-sizing.tokens.ts`
- `src/components/core/Badge-Label-Base/tokens.ts`
- `src/components/core/Button-Icon/buttonIcon.tokens.ts`
- `src/components/core/Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts`
- `src/components/core/Input-Checkbox-Base/checkbox-sizing.tokens.ts`
- `src/components/core/Input-Radio-Base/radio-sizing.tokens.ts`

### 4. Fix relative imports in `src/tokens/component/progress.ts`

This file also had stale relative imports to sibling token files:

```typescript
// Before:
import { spacingTokens } from '../../tokens/SpacingTokens';
import { sizingTokens } from '../../tokens/SizingTokens';
import { borderWidthTokens } from '../../tokens/BorderWidthTokens';

// After:
import { spacingTokens } from '../SpacingTokens';
import { sizingTokens } from '../SizingTokens';
import { borderWidthTokens } from '../BorderWidthTokens';
```

### 5. Remove duplicate component token file

`src/components/core/Avatar-Base/avatar-sizing.tokens.ts` defines the same tokens as `avatar.tokens.ts`. Had to delete it to resolve the "already registered" conflict:

```bash
rm src/components/core/Avatar-Base/avatar-sizing.tokens.ts
```

### 6. Update `designerpunk.config.ts`

```typescript
// Added:
tokenSource: './src/tokens',

// Changed componentTokens from:
componentTokens: ['./src/components'],
// To:
componentTokens: ['./src/components/core'],
```

The broader `./src/components` path worked before but `./src/components/core` is more precise and matches the release notes' recommended pattern.

---

## Error Messages Encountered

| Error | Cause | Fix |
|-------|-------|-----|
| `Token source not found at: .../src/tokens` | `src/types/` missing — import chain fails, but error message incorrectly says "not found" | Copy `src/types/` from package |
| `Cannot find module '../../build/tokens'` | Component token files use relative import to internal build dir | Rewrite to `@3fn/core/build` |
| `Component token conflict: "avatar.size.xs" already registered` | Two `*.tokens.ts` files in same component dir define same tokens | Delete the duplicate file |

### Error Message Bug (from 11.2.1, still present in 11.3.0)

The "Token source not found" error triggers incorrectly when the barrel file exists but has unresolved deep imports. The detection logic:

```typescript
if (msg.includes('Cannot find module') && msg.includes(sourcePath)) {
```

This matches because the require stack in the error message includes the sourcePath (`src/tokens/index.ts`). The check should verify that the *missing module* is the sourcePath itself, not just that sourcePath appears anywhere in the error:

```typescript
// Fix: check that the missing module IS the source path, not a dependency of it
if (msg.includes(`Cannot find module '${sourcePath}'`) || 
    msg.includes(`Cannot find module "${sourcePath}"`)) {
```

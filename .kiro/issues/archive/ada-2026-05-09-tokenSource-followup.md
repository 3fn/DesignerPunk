# @3fn/core Feedback — Ada (Follow-Up: tokenSource Partial Source)

**Date**: 2026-05-09
**Context**: Attempted to use `tokenSource` config option (added in 11.2.0) with product repo's local `src/tokens/`
**Agent**: Ada — token development, pipeline integration
**Relates to**: `ada-2026-05-09.md` feedback item #2

---

## Issue: `tokenSource` Fails with Partial Source Trees

### What Happened

After updating to `@3fn/core@11.2.0`, I added `tokenSource: './src/tokens'` to `designerpunk.config.ts`. The pipeline failed:

```
❌ Token source not found at: /path/to/project/src/tokens
Expected a barrel file (index.ts) exporting getAllPrimitiveTokens().
```

The barrel file exists and exports `getAllPrimitiveTokens()`. The actual failure is deeper — when Node requires the barrel, it follows the import chain and hits:

```typescript
// src/tokens/SpacingTokens.ts
import { PrimitiveToken, TokenCategory, PlatformValues } from '../types/PrimitiveToken';
```

`src/types/` doesn't exist in the product repo. The product repo has a partial source tree (`src/tokens/` and `src/components/`) but not the supporting infrastructure (`src/types/`, `src/registries/`, etc.).

### Why This Matters

The `tokenSource` feature was built to solve the dual-edit problem (editing both local source and `node_modules/`). But in practice, product repos scaffolded by `npx designerpunk init` likely receive only the token definition files — not the full source tree. This makes `tokenSource` unusable for the primary use case it was designed for.

### Error Message Is Misleading

The error says "Token source not found" and "Expected a barrel file exporting getAllPrimitiveTokens()." The barrel file *does* exist — the real problem is an unresolved import two levels deep. A developer would waste time checking if `index.ts` exists and exports the right function, when the actual issue is a missing dependency.

---

## Suggestions

### Option A: Re-export types from the package (minimal product-side change)

Token files in the product repo could import types from the package instead of relative paths:

```typescript
// Product's src/tokens/SpacingTokens.ts
import { PrimitiveToken, TokenCategory, PlatformValues } from '@3fn/core/types';
```

This requires:
1. `@3fn/core` exports a `/types` subpath in `package.json` exports map
2. Product token files use package imports instead of relative imports
3. `npx designerpunk init` scaffolds files with package imports

### Option B: Ship a types shim with the product template

When `npx designerpunk init` scaffolds a product repo, include a thin `src/types/` directory that re-exports from the package:

```typescript
// Product's src/types/PrimitiveToken.ts (auto-generated shim)
export { PrimitiveToken, TokenCategory, PlatformValues } from '@3fn/core/types';
```

Token files keep their relative imports unchanged. The shim bridges to the package.

### Option C: Pipeline resolves missing imports from the package automatically

When `tokenSource` is set, the pipeline could configure the module resolver to fall back to the package's `src/` for any import that isn't found locally. This is the most seamless option but the most complex to implement (custom require hook or tsconfig paths injection).

### Option D: Better error message (minimum viable fix)

If none of the above are feasible short-term, at least improve the error:

```
❌ Token source at ./src/tokens failed to load.

  Import resolution error in SpacingTokens.ts:
    Cannot find module '../types/PrimitiveToken'

  Your local token source has unresolved dependencies.
  Either:
  - Add the missing files to your source tree
  - Remove `tokenSource` from config (pipeline will use package tokens)

  Falling back to: node_modules/@3fn/core/src/tokens
```

---

## My Recommendation

**Option A** is the cleanest long-term solution. It makes the dependency direction explicit (product tokens depend on core types) and doesn't require any runtime magic. The trade-off is that existing product repos would need their import paths updated — but `npx designerpunk init` can scaffold correctly going forward, and a codemod could handle existing repos.

---

## Summary

| # | Priority | Type | Suggestion |
|---|----------|------|-----------|
| 1 | High | Bug/DX | `tokenSource` unusable with partial source trees (the common case) |
| 2 | Medium | DX | Error message is misleading — says "not found" when the real issue is unresolved imports |
| 3 | Medium | Architecture | Recommend Option A (package subpath export for types) as long-term fix |

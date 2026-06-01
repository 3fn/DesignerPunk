# Bug: Component Token Double-Registration in Portable Token Source Mode

**Date**: 2026-05-25
**Package Version**: @3fn/core v11.7.1
**Severity**: Blocks `npx designerpunk generate` in any repo with local component tokens
**Discovered During**: Spec 003 (Portfolio System Readiness), Task 1

---

## Summary

When a product repo configures `tokenSource: './src/tokens'` (Spec 104 portable token source) and has component token files in `src/tokens/component/`, the `npx designerpunk generate` command fails with:

```
❌ Component token conflict: "progress.node.size.sm" already registered by Progress. Attempted registration by Progress.
```

The same component tokens are registered twice with the singleton `ComponentTokenRegistry`.

---

## Root Cause

`src/generators/generateTokenIndex.ts` (in the package) has a side-effect import:

```typescript
import '../tokens/component/progress';
```

This registers the **package's** Progress tokens with the global `ComponentTokenRegistry` singleton when the module is loaded.

Later, `loadComponentTokens()` (from `src/cli/loadComponentTokens.ts`) scans the **local** `src/tokens/component/` directory and requires `progress.ts`, which calls `defineComponentTokens()` again — second registration → conflict.

### Import Chain

1. CLI entry (`designerpunk.ts`) imports `generateProductTokens`
2. `generateProductTokens.ts` imports `generateTokenIndex`
3. `generateTokenIndex.ts` has `import '../tokens/component/progress'` (side-effect)
4. Package's `progress.ts` calls `defineComponentTokens()` → **first registration**
5. CLI calls `loadComponentTokens(config)` → scans local `src/tokens/component/`
6. Local `progress.ts` calls `defineComponentTokens()` → **second registration** → 💥

This happens regardless of whether `productTokens` is configured — the import chain is triggered at module load time.

---

## Affected Configurations

Any `designerpunk.config.ts` with:
```typescript
tokenSource: './src/tokens'  // local token source (Spec 104)
```

AND a `src/tokens/component/` directory containing token files that also exist in the package.

---

## Suggested Fixes (Package-Side)

### Option A: Remove side-effect import from generateTokenIndex.ts

`generateTokenIndex` should read component tokens from the `ComponentTokenRegistry` (which `loadComponentTokens` already populates) rather than importing them directly.

### Option B: Clear registry before local loading

Add `ComponentTokenRegistry.clear()` in the CLI before calling `loadComponentTokens()`, ensuring local source is the sole authority.

### Option C: Lazy-load generateTokenIndex

Only import `generateTokenIndex` when `productTokens` is configured (dynamic import), preventing the side-effect from firing when product tokens aren't in use.

---

## Current Workaround

Delete the local `src/tokens/component/progress.ts` — the package's version handles registration. This sacrifices Spec 104's local-source-of-truth principle but unblocks generation.

---

## Impact on DesignerPunk Portfolio

- `npx designerpunk generate` cannot produce platform output files
- Token-index cannot be regenerated (stale)
- Application MCP shows 217 primitives (missing our 3 new spacing tokens)
- Product token generation (Spec 003 Layer 2) is blocked

---

## Reproduction

```bash
# In any repo with @3fn/core v11.7.1 and tokenSource configured
npx designerpunk generate
# → ❌ Component token conflict: "progress.node.size.sm" already registered by Progress.
```

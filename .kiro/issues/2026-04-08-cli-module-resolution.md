# CLI Cannot Resolve Pipeline Modules in Product Repo

**Date**: 2026-04-08
**Severity**: High (blocks Task 5.4 — CLI validation)
**Agent**: Lina (found during fresh-repo validation)
**Blocks**: Spec 095 Task 5.4

## Problem

`dist/cli/designerpunk.js` uses `require('../generators/generateTokenFiles')` which expects compiled JS at `dist/generators/`. The generators ship as TypeScript source in `src/`, not compiled JS in `dist/`. When a product repo runs `npx designerpunk generate`, it fails:

```
Error: Cannot find module '../generators/generateTokenFiles'
Require stack:
- /node_modules/@3fn/core/dist/cli/designerpunk.js
```

Same issue affects `mcp:app` and `mcp:docs` commands if they import from `src/` paths.

## Root Cause

The CLI was compiled by `tsc` which resolved relative imports to `dist/` siblings. But only the CLI itself was compiled to `dist/cli/` — the generators, resolvers, config loader, and other pipeline modules remain as TypeScript source in `src/`. The compiled CLI can't import TypeScript source via `require()`.

## Recommended Fix

Register `tsx` as a require hook at the top of `src/cli/designerpunk.ts` before any pipeline imports:

```typescript
// Enable TypeScript imports for pipeline modules
require('tsx/cjs/api').register();
```

This lets the compiled CLI entry point import TypeScript source from `src/` at runtime. `tsx` is already a runtime dependency of the package.

After the fix: rebuild CLI (`tsc`), republish package, re-validate in fresh repo.

## Owner

Ada — this is a Task 1 (build steps) fix. The CLI compilation needs to account for the TypeScript source dependency chain.

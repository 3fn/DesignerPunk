# Task 2 Summary: Component Token Loading & Subpath Export

**Date**: 2026-05-09
**Purpose**: Component token portability — local edits propagate to all token tiers
**Organization**: spec-summary
**Scope**: 104-token-source-portability

---

## What Was Done

Added `@3fn/core/build` subpath export (for `defineComponentTokens`), implemented a component token loader with dual-pattern discovery (`{tokenSource}/component/*.ts` + `componentTokenDirs/**/*.tokens.ts`), and wired it into the CLI's generate flow.

## Why It Matters

Previously, setting `tokenSource` only affected primitive and semantic tokens — component tokens still loaded from the package, using stale primitive values. Now when `tokenSource` is set, ALL token tiers resolve from local source. Editing a spacing primitive propagates to component tokens that reference it.

## Key Changes

- `package.json` — `"./build"` subpath export for `defineComponentTokens`
- `src/cli/loadComponentTokens.ts` — discovers and loads component token files from local source
- `src/cli/designerpunk.ts` — calls `loadComponentTokens()` when `tokenSourceMode === 'local'`

## Impact

- Completes the all-or-nothing `tokenSource` story (primitive + semantic + component)
- No silent fallback — warning emitted if no component tokens found
- Default behavior unchanged when `tokenSource` is not set

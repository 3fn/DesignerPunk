# Task 3 Summary: Init Updates & Lint Boundary

**Date**: 2026-05-09
**Purpose**: Complete token source portability with init scaffolding and CI enforcement
**Organization**: spec-summary
**Scope**: 104-token-source-portability

---

## What Was Done

Updated `npx designerpunk init` to copy `src/types/` alongside tokens, split the token source copy to apply `rewriteBuildImports` only to component token files, updated the generated config with `tokenSource` and both `componentTokens` directories, and added a lint boundary test (42 checks) that prevents portability regressions at CI time.

## Why It Matters

The lint boundary is the prevention mechanism. Specs 103 and 104 fixed existing portability issues; the boundary ensures they can't recur. Any future token file that imports from `src/constants/`, `src/build/`, or `src/components/` will fail CI immediately — caught at authoring time, not consumption time.

## Key Changes

- `src/cli/init.ts` — Ships `src/types/`, splits token copy, applies `rewriteBuildImports`, removes dead `rewriteTypeImports`
- `src/tokens/__tests__/portability-boundary.test.ts` — 42 tests enforcing import restrictions
- `src/tokens/semantic/ColorTokens.ts` — Removed deprecated re-exports that violated boundary
- Generated config now includes `tokenSource: './src/tokens'` and `componentTokens: ['./src/components/core', './src/tokens/component']`

## Impact

- New product repos get a complete, working token source on first `npx designerpunk init`
- Portability regressions caught at CI time (not consumption time)
- Deprecated backward-compatibility re-exports removed (no consumers existed)

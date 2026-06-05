# Task 1.1 Completion: Create sync directory structure and PackageResolver

**Date**: 2026-06-05
**Task**: 1.1 Create sync directory structure and PackageResolver
**Type**: Setup
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/cli/shared/transforms.ts` | **Created** — Extracted `rewriteBuildImports` for shared use by `init` and `sync` |
| `src/cli/sync/PackageResolver.ts` | **Created** — Resolves installed `@3fn/core` location and version using `require.resolve` with fallback |
| `src/cli/init.ts` | **Modified** — Imports `rewriteBuildImports` from `./shared/transforms` instead of defining locally |
| `src/cli/__tests__/PackageResolver.test.ts` | **Created** — 4 unit tests covering resolve, error, version, and absolute path |

## Design Decisions

**Shared transforms location**: `src/cli/shared/transforms.ts` rather than `src/cli/sync/transforms.ts` because `init.ts` also needs it — this is genuinely shared CLI infrastructure.

**require.resolve with paths**: Uses `require.resolve('@3fn/core/package.json', { paths: [projectRoot] })` to support monorepos and hoisted deps. Falls back to direct `node_modules/@3fn/core` path if resolve fails.

**Test symlink handling**: Used `fs.realpathSync` on tmpDir to avoid macOS `/var` → `/private/var` symlink mismatch in assertions.

## Validation

- PackageResolver tests: 4/4 passing
- Init integration tests: 6/6 passing (no regression from extraction)
- Requirements covered: R1 AC1 (require.resolve), R1 AC3 (clear error message)

# Task 4.1/4.2 Completion: Implement Applier and Content Transforms

**Date**: 2026-06-05
**Task**: 4.1 Content transforms + 4.2 Applier
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/cli/sync/Applier.ts` | **Created** — `applyFile()`, `applyGovernance()`, `applySource()`, `applyForce()` |
| `src/cli/__tests__/Applier.test.ts` | **Created** — 9 unit tests covering copy, transform, manifest update, tier filtering, force warnings |

## Design Decisions

**Transform reuse**: Applier imports `rewriteBuildImports` from `../shared/transforms.ts` (already extracted in Task 1.1). No separate `sync/transforms.ts` needed — the shared location serves both `init` and `sync`.

**Manifest mutation in-place**: `applyFile` mutates the manifest object directly. The caller (runSync) saves it once at the end. This avoids repeated disk I/O during batch applies.

**Force mode logging**: When `--force` overwrites a conflict, logs `⚠️ overwritten (was locally modified): [path]` per R7 AC2.

## Validation

- Applier tests: 9/9 passing
- Requirements covered: R4 AC1 (governance auto-apply), R4 AC2 (source requires confirmation), R4 AC3 (conflict prompting — delegated to Prompter), R4 AC4 (transform on source .ts), R7 AC1-3 (force mode)

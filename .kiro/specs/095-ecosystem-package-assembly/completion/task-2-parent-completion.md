# Task 2 Parent Completion: Package.json Restructuring

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Task**: 2 - Package.json Restructuring
**Type**: Parent
**Validation Tier**: 3 - Comprehensive
**Agent**: Lina

---

## Summary

Restructured `package.json` from the legacy `designer-punk-v2` configuration to the `@designerpunk/core` ecosystem package. Four subtasks: rename + files allowlist, exports map, bin + tsx, cleanup duplicates.

## Changes

| Field | Before | After |
|-------|--------|-------|
| `name` | `designer-punk-v2` | `@designerpunk/core` |
| `main` | `./dist/TokenEngine.js` | `./dist/browser/designerpunk.esm.js` |
| `types` | `./dist/TokenEngine.d.ts` | `./dist/browser-entry.d.ts` |
| `files` | (none — everything shipped) | 32-entry allowlist |
| `exports` | 4 entries (root CJS+ESM, BlendUtilities, blend, tokens.css) | 9 entries (ESM-only root, components, tokens, config, blend, grid, fonts) |
| `bin` | (none) | `designerpunk` → `./dist/cli/designerpunk.js` |
| `dependencies.tsx` | (none) | `^4.19.0` |
| `dist/android/`, `dist/ios/` | Duplicate directories | Removed |

## Package Metrics

| Metric | Value |
|--------|-------|
| Packed size | 5.8 MB |
| Unpacked size | 19.9 MB |
| Total files | 1,481 |
| Excluded paths verified | 13 categories, all 0 files |

## Validation

| Check | Result |
|-------|--------|
| `npm test` | 318 suites, 8198 tests, all passing |
| `npm pack --dry-run` | Clean — no excluded paths |
| Bundler resolution tests | Updated and passing |

## Requirements Traced

- R1 AC 1: Package named `@designerpunk/core` ✅
- R2 AC 1-4: `files` allowlist defined, validated ✅
- R3 AC 1-10: All exports defined, legacy removed ✅
- R5 AC 6: `bin` field defined ✅
- R6 AC 1-2: `tsx` in dependencies ✅
- R8 AC 1-4: Duplicates and legacy exports removed ✅

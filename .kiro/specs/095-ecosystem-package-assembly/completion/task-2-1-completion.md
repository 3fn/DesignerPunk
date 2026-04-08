# Task 2.1 Completion: Rename Package and Define `files` Field

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Task**: 2.1 - Rename package and define `files` field
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Lina

---

## Summary

Renamed package from `designer-punk-v2` to `@designerpunk/core` and defined the `files` allowlist in `package.json`.

## Changes

- `name`: `designer-punk-v2` → `@designerpunk/core`
- Added `files` field with 32 entries

### `files` Allowlist Strategy

- `src/` ships as a single entry — includes all 34 components, platform files, tests, tokens, generators, pipeline source. No exclusion patterns needed (examples ship at ~1MB, harmless per Ada/Lina consensus).
- `dist/` entries are selective — ESM bundle (no UMD, no source maps), compiled config/CLI/blend (`.js` and `.d.ts` only, no `.map` or `__tests__/`), generated platform tokens (all three platforms + DTCG + Figma).
- MCP servers ship `src/` + `package.json` + `tsconfig.json` only — excludes `node_modules/`, `dist/`, `__tests__/` at the MCP server level. Initial dry run showed 144MB/14872 files when `mcp-server/` and `application-mcp-server/` were listed as whole directories (their `node_modules/` were included). Narrowing to `src/` + config files brought it to 20MB/1481 files.
- `.kiro/steering/` and `.kiro/agents/` ship. `.kiro/specs/`, `.kiro/issues/`, and all other `.kiro/` subdirectories excluded by allowlist.

## Validation

| Check | Result |
|-------|--------|
| `npm pack --dry-run` | 5.8MB packed, 19.9MB unpacked, 1481 files |
| Excluded: `.kiro/specs/` | 0 files ✅ |
| Excluded: `.kiro/issues/` | 0 files ✅ |
| Excluded: `docs/roadmap/`, `docs/specs/` | 0 files ✅ |
| Excluded: `demos/`, `scripts/`, `strategic-framework/`, `preserved-knowledge/` | 0 files ✅ |
| Excluded: `dist/browser/*.map`, `dist/browser/designerpunk.umd.*` | 0 files ✅ |
| Excluded: `dist/android/`, `dist/ios/` (duplicates) | 0 files ✅ |
| Excluded: `peter-michaels-allen-resume.json` | 0 files ✅ |
| `npm test` | 318 suites, 8193 tests, all passing |

## Requirements Traced

- R1 AC 1: Package name is `@designerpunk/core` ✅
- R2 AC 1: `files` field defined ✅
- R2 AC 2: `npm pack` contains only allowlisted files ✅
- R2 AC 3: Excluded paths not in tarball ✅
- R2 AC 4: New directories excluded by default (allowlist behavior) ✅

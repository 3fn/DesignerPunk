# Task 2 Summary: Generator DI Refactor & CLI Update

**Date**: 2026-05-09
**Purpose**: Source-agnostic token generation via dependency injection
**Organization**: spec-summary
**Scope**: 103-pipeline-dx-source-resolution

---

## What Was Done

Refactored `generateTokenFiles()` to accept token arrays as parameters instead of importing them via static paths. Updated all call sites (CLI, tests, scripts) and replaced the CLI's misleading "Source:" output with an accurate "Tokens:" line showing the resolution path and mode.

## Why It Matters

The generator no longer hardcodes where tokens come from. Combined with Task 1's `tokenSource` config, the pipeline can now read tokens from any configured path. The transparent CLI output eliminates the "edited the wrong file" confusion that triggered this spec.

## Key Changes

- `generateTokenFiles(tokens: TokenInput, config: ResolvedConfig)` — new DI signature
- Legacy `generateTokenFiles(outputDir, config?)` signature removed
- CLI output: `Tokens: src/tokens  (package)` or `Tokens: ./src/tokens  (local)`
- `if (require.main === module)` self-invocation removed (CLI supersedes)

## Impact

- No breaking changes to external consumers (internal API only)
- Foundation for Task 3 (validate command reuses same `resolveTokens()` path)
- Fixed latent bug: DTCG/Figma generation used stale `outputDir` variable

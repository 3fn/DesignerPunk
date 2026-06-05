# Release Notes — v11.9.0

**Date**: 2026-06-05
**Type**: Minor Release
**Specs**: 114 (Generation Pipeline Data Flow), 111 (Sync Command)
**Previous**: v11.8.0

---

## Summary

Pipeline reliability and upgrade DX release. Fixes three interrelated generation pipeline defects (double-registration, stale product tokens, barrel import bypass), adds product token staleness detection with `--product-only` fast path, and introduces `npx designerpunk sync` for detecting and applying stale files after package upgrades.

## Changes

### Generation Pipeline Data Flow (Spec 114)

- **Explicit token input**: `generateTokenIndex` receives all data via required `TokenIndexInput` parameter — no barrel imports, no fallback to package defaults
- **Double-registration fix**: `loadComponentTokens` uses `allowOverwrite: true` when `tokenSourceMode === 'local'`, eliminating "already registered" errors
- **Pipeline independence**: System token failure no longer blocks product token generation — independent try/catch boundaries with structured ✅/❌ output
- **Staleness detection**: Product token generation checks source YAML mtimes against output; regenerates automatically when stale, logs when skipping
- **`--product-only` flag**: Skips system token resolution entirely, regenerates product tokens using existing `token-index/*.yaml` on disk
- **`--force` flag**: Forces product token regeneration regardless of staleness
- **Redundant regeneration removed**: `generateProductTokens` no longer calls `generateTokenIndex` internally (was undoing local-source-aware index)
- **Theme-varying accuracy**: `computeThemeVaryingTokens` utility correctly includes base light/dark differences, not just explicit overrides

### Sync Command (Spec 111)

- **New CLI command**: `npx designerpunk sync` — detects and applies stale files after `@3fn/core` upgrades
- **Two-tier handling**: Governance files (steering, agents, skills) auto-apply if consumer hasn't modified; source files (tokens, components) always require confirmation
- **Manifest tracking**: `.kiro/sync-manifest.json` (committed) stores SHA-256 hashes at last sync for consumer-edit detection
- **Interactive conflict resolution**: Per-file skip/overwrite/diff prompts with in-terminal unified diff
- **`.designerpunkignore`**: Exclude files from sync permanently (`.gitignore`-style patterns)
- **`--dry-run`**: Preview without applying; auto-triggers in non-TTY environments
- **`--force`**: Overwrite all conflicts without prompting (factory reset)
- **Content transforms**: Source-tier `.ts` files receive `rewriteBuildImports` transform during sync (same as `init`)

### Other

- **Removed `Inter-4/` font directory** — unused font files cleaned from repo
- **Removed `avatar-sizing.tokens.ts`** — duplicate file causing double-registration conflicts
- **`token-index/README.md`** — documents provenance and consumption of generated index files
- **`rewriteBuildImports` extracted** — shared utility at `src/cli/shared/transforms.ts`
- **Dependencies added**: `minimatch` ^9.0.5 and `diff` ^7.0.0 as direct dependencies
- **Updated Integration Guide**: "Upgrading" section with sync workflow
- **Updated README**: `sync` command in getting-started CLI block

## Bug Fixes

- Fixed: `npx designerpunk generate` failing with "Component token conflict: already registered" in repos with `tokenSource` configured
- Fixed: Product token YAML additions not triggering regeneration (silent stale output)
- Fixed: System token error blocking entire pipeline including unrelated product generation
- Fixed: `generateProductTokens` redundantly re-generating token-index with package barrel defaults
- Fixed: Token-index `themeVarying` flags incorrect for product repos with custom themes

## Test Suite

- New tests: staleness detection, pipeline independence, product-only mode, themeVarying computation, generateTokenIndex explicit input, backward compatibility
- Sync module tests: PackageResolver, FileScanner, Classifier, Manifest, IgnoreFilter, Reporter, Prompter, Applier, integration

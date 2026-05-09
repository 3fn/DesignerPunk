# Task 1.1 Completion: Add `tokenSource` to Config Interface and ConfigLoader

**Date**: 2026-05-09
**Task**: 1.1 Add `tokenSource` to config interface and ConfigLoader
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/config/defineConfig.ts` (updated) — Added `tokenSource?: string` field to `DesignerPunkConfig` interface
- `src/config/ConfigLoader.ts` (updated) — Added `tokenSourceMode` to `ResolvedConfig`, updated resolution logic
- `src/config/__tests__/ConfigLoader.test.ts` (updated) — Replaced old test, added two new tests

---

## Implementation Details

### Approach

Added the `tokenSource` config option to the existing `defineConfig()` / `ConfigLoader` infrastructure established by Spec 094. The change is additive — when `tokenSource` is omitted, behavior defaults to package resolution (no breaking change).

### Key Decisions

1. **Package path resolution**: Used `path.resolve(__dirname, '../tokens')` from ConfigLoader's location (`src/config/`). This resolves to `src/tokens/` in both development (running from repo) and consumption (running from `node_modules/@3fn/core/src/config/`). Verified that `package.json` `files` field includes `src/`, confirming the path works for published packages.

2. **`tokenSourceMode` field**: Added as a discriminator to `ResolvedConfig` rather than requiring consumers to infer mode from path comparison. Makes CLI output trivial (`(${config.tokenSourceMode})`).

3. **Replaced `tokenSourceRoot = cwd`**: The previous implementation set `tokenSourceRoot` to the consumer's working directory, which was misleading and unused. Now it points to the actual token source path.

### Integration Points

- `ResolvedConfig.tokenSourceRoot` — consumed by `resolveTokens()` (Task 1.2) for dynamic token loading
- `ResolvedConfig.tokenSourceMode` — consumed by CLI output (Task 2.3) for `(local)` / `(package)` annotation
- `DesignerPunkConfig.tokenSource` — authored by product developers in `designerpunk.config.ts`

---

## Validation (Tier 2: Standard)

### Functional Validation
- ✅ ConfigLoader test suite: 10 tests passing
- ✅ Broader regression run: 326 suites, 8288 tests passing
- ✅ Default behavior (no `tokenSource`): resolves to package `src/tokens/`, mode = `'package'`
- ✅ Configured `tokenSource`: resolves relative to config dir, mode = `'local'`

### Requirements Compliance
- ✅ Req 1.1: `tokenSource` field causes pipeline to resolve from configured path
- ✅ Req 1.2: Omitting `tokenSource` preserves current default behavior
- ✅ Req 1.3: Path resolved relative to config file's directory
- ✅ Req 7.1: TSDoc on `tokenSource` field documents purpose, default, and complete-source requirement
- ✅ Req 7.3: TSDoc comment on `DesignerPunkConfig.tokenSource` explains resolution behavior

# Task 3 Completion: Portable Pipeline

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 3 - Portable Pipeline (WS1)
**Type**: Parent
**Validation Tier**: 3 - Comprehensive
**Agent**: Ada
**Status**: Complete

---

## Summary

Built the configuration system and CLI that makes the token pipeline runnable from any project. A product repo can now create a `designerpunk.config.ts`, configure its name, themes, and output directory, and run the pipeline via the CLI. The DesignerPunk repo itself has a default config that serves as both the working config and a reference example.

---

## Subtask Completion

| Subtask | Description | Status |
|---------|-------------|--------|
| 3.1 | Implement `defineConfig` and `ConfigLoader` | ✅ Complete |
| 3.2 | Abstract hardcoded paths in generators | ✅ Complete |
| 3.3 | Pipeline CLI | ✅ Complete |
| 3.4 | Integration test: product repo simulation | ✅ Complete |

---

## Architecture Decisions

### TypeScript Config (`designerpunk.config.ts`)

Products configure the pipeline via a TypeScript config file that explicitly imports and registers themes. This eliminates directory walking and implicit discovery — the config file IS the registry. Pattern established by Vite, Jest, and similar tools.

### `tsx` as TypeScript Execution Strategy

Decision: `tsx` (~2MB, esbuild-based, no `tsconfig.json` required) bundled as a dependency during Block B packaging. Phase 1 CLI uses native `import()` via existing `ts-node`. Implementation staged — decision made now, `tsx` wiring happens during packaging.

### Path Resolution

- Package location: `require.resolve('@designerpunk/core/package.json')` — handles npm workspaces, pnpm, yarn PnP
- Config-relative paths: output directory and component token directories resolve relative to the config file
- Fallback: when not installed as a package, resolves to cwd (DesignerPunk repo)

### Default Config at Repo Root

`designerpunk.config.ts` in the DesignerPunk repo root declares the default values explicitly. Serves as both the working config and a copy-paste reference for product repos.

---

## Artifacts Created/Modified

### New Files
- `src/config/defineConfig.ts` — `defineConfig()` API, `DesignerPunkConfig` interface
- `src/config/ConfigLoader.ts` — `loadConfig()`, `ResolvedConfig` interface
- `src/config/index.ts` — barrel export
- `src/config/__tests__/ConfigLoader.test.ts` — 9 tests
- `src/cli/designerpunk.ts` — CLI entry point
- `src/generators/__tests__/ProductRepoSimulation.test.ts` — 5 integration tests
- `designerpunk.config.ts` — repo root default config

### Modified Files
- `src/generators/generateTokenFiles.ts` — accepts optional `ResolvedConfig`
- `.kiro/specs/094-portable-pipeline-and-theme-registry/tasks.md` — `tsx` decision settled
- `docs/roadmap/m0a-roadmap.md` — `tsx` decision noted
- `docs/roadmap/m0a-deferred-items.md` — staged implementation tracked

---

## Validation Results

| Check | Result |
|-------|--------|
| `npm test` | 318 suites, 8193 tests, all passing |
| `npm run generate:platform-tokens` | All platforms generated, identical output |
| CLI test | `npx ts-node src/cli/designerpunk.ts generate` — loads config, runs pipeline |
| Product repo simulation | 5/5 integration tests passing |
| Snapshot regression (8 files) | All match pre-migration baselines |

---

## Requirements Traced

| Requirement | AC | Status |
|-------------|-----|--------|
| R4: Config | AC 1-6 (config loading, defaults, themes, output, exports) | ✅ |
| R5: Portable Paths | AC 1-5 (package resolution, defaults, relative paths, CLI) | ✅ |
| R6: Backward Compat | AC 1-2 (existing scripts unchanged) | ✅ |

---

## Lessons Learned

1. **The `tsx` decision was better made now than deferred.** Peter pushed back on deferring, and he was right — documenting the decision in three places (tasks, roadmap, deferred items) ensures it doesn't get lost or re-debated during Block B packaging.

2. **The config system is minimal by design.** `defineConfig` is an identity function — it exists for type checking and IDE support, not runtime logic. `loadConfig` does the real work (path resolution, defaults). This separation keeps the product-facing API simple while the internal resolution handles complexity.

3. **Product repo simulation tests are valuable even without a real package install.** The temp directory approach validates the config → pipeline → output chain without needing `npm publish` + `npm install`. The real package consumption test happens during Block B.

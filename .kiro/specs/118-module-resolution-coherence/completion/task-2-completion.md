# Task 2 Completion: Contract-Preserving Swap inside `loadConfig`

**Date**: 2026-06-24
**Task**: 2 — Contract-Preserving Swap inside `loadConfig` (Increment 1 keystone)
**Type**: Implementation
**Status**: Complete
**Validation Tier**: Tier 2 (Standard)
**Agent**: Ada (swap) + main-loop (seam refinement + verification)
**Covers subtask**: 2.1.

---

## Outcome

`loadConfig` now resolves consumer `.ts` configs (and their transitive relative raw-`.ts` imports) at runtime via **Approach A** (`tsx/cjs/api` namespaced `register` + scoped synchronous `require` + `unregister()` in `finally`) — the loader selected empirically in Task 1. This is the production fix that makes the documented config-load path work, and the genuine prerequisite for Spec 117's closeout.

## Artifacts Created / Changed

- `src/config/ConfigLoader.ts` — the swap. Adds an **injectable resolution seam**: an exported `ConfigModuleLoader` type and `defaultConfigModuleLoader` (Approach A), with `loadConfig(cwd, loadModule = defaultConfigModuleLoader)`. The single `await import(configPath)` load locus is replaced by `await loadModule(configPath)`.
- `src/config/__tests__/ConfigLoader.test.ts` — injects the shared jest-compatible loader at all 8 call sites (Approach A can't run inside jest).
- `src/__tests__/helpers/configModuleLoader.ts` — **shared TEST helper** exporting the jest-compatible loader (`jestConfigModuleLoader`); the single, documented home for the in-process-jest loader, keeping production free of test-awareness.
- `src/generators/__tests__/ProductRepoSimulation.test.ts` — a second in-process-jest caller; injects the shared helper (found by the full regression sweep).
- `tsconfig.json` — excludes `src/config/__resolution-matrix__` so Task 1's harness fixtures don't enter the build typecheck.
- `src/config/__resolution-matrix__/verify-real-loadconfig.js` — a real-`node` verification that the actual `loadConfig` resolves a faithful consumer config (sentinel check). Complements the standalone matrix.

## Implementation Details

### Approach
Replaced only the load locus inside the existing `try`; preserved the no-file DEFAULTS branch, the `loaded.default || loaded` unwrap, `configDir = path.dirname(configPath)`, the fail-loud `try/catch` re-wrap, the `__dirname`-based token-source resolution, and the `ResolvedConfig` shape. The function stays `async` (Approach A's scoped `require` is synchronous; `await` on it is harmless). All five callers and the two non-callers are untouched.

### Key Decision — injectable seam, NOT a `JEST_WORKER_ID` production fork
A genuine integration constraint surfaced: **Approach A cannot run inside a jest process** — tsx's scoped `require` appends a `?namespace=` tag that jest's module resolver rejects (`ENOENT`). The initial implementation detected `JEST_WORKER_ID` in production and fell back to the original (broken-resolver) `await import()`.

That was rejected (Peter-approved) for the seam because the env-fork:
- ships **test-environment detection in the production artifact** (`@3fn/core`), and `JEST_WORKER_ID` is set in *any* jest — including a **consuming product's** — so a consumer calling `loadConfig` in their jest would silently take the broken-resolver branch (a conditional copy of the very bug this spec exists to end);
- meant the in-process tests no longer exercised the production loader; and
- was a *silent* conditional path, against the spec's fail-loud + one-coherent-mechanism ethos.

The seam instead keeps production **unconditionally Approach A**; in-process jest tests **explicitly inject** a jest-compatible loader. A consumer who calls `loadConfig` inside jest without injecting gets a **loud** resolver error (a documented constraint), not a silent wrong answer.

### `unregister()` lifecycle
`defaultConfigModuleLoader` calls the returned `unregister()` in a `finally` — load-bearing for the no-ambient-residue criterion (e). The Task-3 subprocess guard will catch a dropped `unregister()` as residue.

## Validation (Tier 2: Standard)

### Functional (re-run independently in main loop)
- ✅ `npm run test:resolution-matrix` — Approach A green 4/4 (both authoring directions); undisturbed by the swap.
- ✅ Real `loadConfig` (real `node`, default loader) resolves the faithful-consumer fixture (compiled import + transitive raw-`.ts` `./my-overrides`) — sentinel matches. **The key proof the swap works in the production file.**
- ✅ `ConfigLoader` test suite: 10/10 pass (now injecting `jestLoad`).
- ✅ A resolution failure still THROWS the re-wrapped `Failed to load …` (fail-loud preserved).

### Full regression sweep (project-wide)
- ✅ **Full jest suite: 372 suites / 8961 tests pass** (`npm test`).
- ✅ **Full `tsc --noEmit`: 0 errors.**
- The sweep surfaced (and this task fixed) two regressions that the targeted unit checks missed:
  1. **Build typecheck break (from Task 1's harness):** the resolution-matrix *fixtures* live under `src/`, so `include: ["src/**/*"]` pulled them into `tsc` (which `npm run build` runs) → 8 errors. Fixed by adding `src/config/__resolution-matrix__` to `tsconfig.json` `exclude`.
  2. **A second in-process-jest `loadConfig` caller:** `src/generators/__tests__/ProductRepoSimulation.test.ts` also calls `loadConfig` in-process and hit Approach A's `?namespace=` collision. Fixed the **get-it-right way** — production `ConfigLoader` kept pure (no test-awareness), with a shared TEST helper (`src/__tests__/helpers/configModuleLoader.ts`) that both in-process test files inject. (Rejected adding a mutable default + test-only setter to production — that would be the same test-leak-into-production smell as the `JEST_WORKER_ID` fork.)

### Syntax / Types
- ✅ `tsc --noEmit` (strict): no type errors in `src/config/ConfigLoader.ts` or `src/config/index.ts`; the new `ConfigModuleLoader` type + optional `loadModule` param compile clean.
- ✅ No test-environment detection in the production loader (`grep`: no `JEST_WORKER_ID` / `process.env`).
- ✅ All five callers compile — the optional second param is contract-preserving; no call-signature errors.

### Requirements Compliance
- ✅ **R2 AC1** — carries own resolution, assumes no ambient loader (scoped register within the call; `unregister()` restores global state).
- ✅ **R2 AC2** — transitive relative raw-`.ts` imports resolve (matrix green).
- ✅ **R2 AC4** — forward-compatible: both ESM- and CJS-authored configs resolve.
- ✅ **R2 AC5** — swapped *inside* `loadConfig`, not via bin hooks.
- ✅ **R2 AC7** — scope is config-loader correctness; nothing bent toward expediting 117.
- ✅ **R2 AC8** — all five callers function; the two non-callers (`generateTokenFiles`, `ReleasePipeline.ts:125`) untouched.

## Lessons / Notes

- The "Approach A can't run inside jest" constraint is intrinsic (tsx `?namespace` vs jest resolver), not specific to our tests. The honest resolution is an explicit seam, not a production env-fork — a fork would have shipped a conditional copy of the bug, activated by the mere presence of jest (ours *or* a consumer's).
- `bin/designerpunk.js`'s bare `register()` is deliberately untouched — it persists for the CLI's own source execution until Increment 3a (coherent intermediate, certified by the Task-3 subprocess guard).

## Related Documentation

- Loader selection: [findings/loader-selection.md](../findings/loader-selection.md)
- Hands off to **Task 3** (consumer-config subprocess guard) and **Task 6** (117 closeout).
- [Task 2 Summary](../../../../docs/specs/118-module-resolution-coherence/task-2-summary.md)

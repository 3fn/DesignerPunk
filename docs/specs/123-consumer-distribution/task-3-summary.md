# Task 3 Summary: The packaging floor, `files[]`, and the platform closures

**Date**: 2026-09-26
**Purpose**: Concise summary of Task 3 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Built `scripts/floor-closure.ts`, computing both C5-named closures over the real `src/tokens/**` tree: closure 1 re-verifies rewrite completeness over a scratch copy transformed by Task 2's `rewriteByResolution` (an independent re-scan, not a reuse of that function's own escape detection); closure 2 computes the package's own runtime import closure (following `import`/`export from`/`require()`/dynamic `import()`, skipping `import type`/`export type`, walking the whole directory rather than tracing from one barrel entry). Closure 2 reproduced Ada's own R2 hand-measurement exactly — 16 files, zero differences. Narrowed `package.json`'s `files[]` to the U1-scoped packaging diet (wholesale `src/` removed; the declared floor, the 16 closure files, and the iOS/Android platform closures added; the steering/agent-copy directories deliberately left untouched, per the tasks round's own sequencing decision, since `init` still wholesale-copies from them in this unit). Built `scripts/pack-assert.ts` to verify the diet against a real `npm pack` listing (40 assertions). Committed the Kenya/Data native-component-distribution follow-up issue with both KEEP-WITH-FOLLOW-UP verdicts quoted, and routed two out-of-scope defects for Lina.

**Corrected at verification** (caught by the coordinator's review before parent completion): the `.gitkeep` row was first implemented as EXCLUDED on a misreading of an advisory as an open choice, when the settled tasks.md criterion had already ruled INCLUDE. Corrected: the 8 `platforms/android/.gitkeep` placeholder files now ship via an explicit `files[]` entry, `pack-assert.ts` asserts the ruled count of 8, and `tarball-target.json` was regenerated from the corrected pack.

## Why It Matters

The packaging floor is the one artifact every later unit's `files[]` change builds on top of, and the one place a silent over- or under-inclusion reaches every future consumer with no local symptom (`npm pack` is silent about both directions). Reusing an independent, regenerated closure computation — rather than a hand-maintained list embedded in the assertion script — is what keeps the diet honest as the source tree drifts: a future removal of a load-bearing file is caught by a red pack-assert run, not discovered by a consumer's broken install.

## Key Changes

- `scripts/floor-closure.ts` (new): both named closures, CLI + a `--bite-closure-1` bite mode.
- `scripts/pack-assert.ts` (new): 40 assertions against a real `npm pack --dry-run --json`, reading closure 2 from the regenerated `floor-closure.json`.
- `package.json`: `files[]` narrowed — REMOVED wholesale `"src/"`, `"product-template/"`, `"designerpunk.config.ts"`; ADDED the declared floor (`src/tokens/**`, `src/styles/`, `src/assets/fonts/**`, the component-metadata glob — corrected from a literal but non-working transcription of Req 4.2's text), the 16 closure-2 files explicit, `dist/mcp/tool-manifest.json` + `dist/name-contract.json` (Tasks 4/6's future outputs), and the iOS/Android platform closures (including the `.gitkeep` correction). `build:mcp-shared`'s esbuild file list also fixed (carried from Task 1 — it omitted `bornRepo.ts`/`errorCatalog.ts`, which both MCP servers `require()` from `dist/cli/shared/` at runtime).
- `floor-closure.json`, `tarball-target.json` (new, committed snapshots).
- `.kiro/issues/2026-09-26-native-component-distribution.md` (new): the chartered follow-up, owners and a corrected joint two-limb trigger.
- `scripts/__tests__/floor-closure.test.ts` (new, 15 tests, colocated `scripts/` Jest config).

## Impact

- The tarball goes from 2567 to 1597 entries (7.29MB → 5.86MB packed; 29.8MB → 21.3MB unpacked) — U5 asserts against this declared target.
- One attributed (not corrected) difference remains on record: Kenya R2's claimed `src/tokens/platforms/ios/**` count of 3 (including a `README.md`) doesn't match the tree (2 files; no such `README.md` exists in git history) — recorded as a likely measurement slip, orchestrator-confirmed as an acceptable attributed difference under the criterion's own "Differences are attributed" clause.
- Two items carried forward, out of this task's write scope: the package `README.md`'s "True implementations (Web Components, SwiftUI, Jetpack Compose)" line overstates iOS/Android readiness (Kenya R2) — lands at U3 (Task 19) or a direct fix; and the Lina-A7 `dist/components` CSS-require finding, relayed via the orchestrator, awaiting delivery to Lina.

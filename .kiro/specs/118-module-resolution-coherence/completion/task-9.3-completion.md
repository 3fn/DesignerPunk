# Task 9.3 Completion: Increment 3c — Finalize CJS + extensionless authoring; certify the close-state

**Date**: 2026-06-26
**Task**: 9.3 — Increment 3c: finalize CJS + extensionless authoring across the residual non-bundled surface; certify the reconciled-exports close-state (R8)
**Type**: Implementation
**Status**: **DONE & CERTIFIED.** The residual explicit-extension pocket is converged to extensionless authoring; the reconciled-trio close-state is green via the packed-install consumer guard (R8 AC4). Behavior-preserving.
**Validation Tier**: Tier 2
**Agent**: Ada (consumer-guard run) ; main-loop (scoping audit, the conversion, build/test verification, recording).
**Branch**: `spec-118-module-resolution-coherence`

---

## Context — what "the residual surface" turned out to be

3c finalizes CJS + extensionless authoring across "the leftover of what 9.1+9.2 did not already converge — nameable only after they land." With runtime unified to tsx (9.1), exports reconciled to `dist` (9.2), and the bin register retired (9.5), the residual was a **single isolated pocket of ESM-style explicit-extension authoring**: relative import/export-from/require specifiers carrying explicit `.js`/`.ts` extensions, inconsistent with the committed CJS-extensionless model.

A repo-wide audit (excluding tests, the `init.ts` template, and the build-excluded `__resolution-matrix__` fixtures) found exactly **29 such specifiers** across 10 files, all in one cluster:

| Location | Count | Form |
|---|---|---|
| `src/analytics/*` (6 files) | 19 | `from './X.js'` static import/export-from |
| `src/types/*` (`SemanticToken.ts`, `TranslationOutput.ts`) | 3 | `import type { ... } from './X.js'` |
| `src/workflows/TokenGenerationWorkflow.ts` | 3 | `from './X.js'` |
| `src/tokens/semantic/LayeringTokens.ts` | 4 | lazy `require('./X.js')` (circular-dep avoidance) |

**`src/components/` was already 0** explicit-extension imports — confirming the pocket is isolated and that 9.4's lint (web-source-only, `src/components/`) will be green the moment its polarity is set.

## What landed

Stripped the explicit `.js`/`.ts` extension from each of the 29 relative specifiers (e.g. `from './PrimitiveToken.js'` → `from './PrimitiveToken'`, `require('./ZIndexTokens.js')` → `require('./ZIndexTokens')`). Applied with a context-scoped `perl` substitution restricted to `from`/`require(`/`import(` specifiers ending in `.js`/`.ts` — **never** `.json`/`.css`/other asset extensions, and never non-import string literals. Net diff: 29 insertions / 29 deletions, authoring-only, no logic changed.

### Deliberately left untouched (out of scope)
- **`src/cli/init.ts` template string** (`generateConfig`, ~line 441-442): emits `import ... from './src/tokens/themes/.../SemanticOverrides.ts'` into the **consumer's** generated `designerpunk.config.ts`. This is consumer-authored form (raw-`.ts` transitive), resolved by the Increment-1 loader + scoped-tsx seams — and is **123-adjacent** (consumer source distribution form is Spec 123's call). Not the package's own non-bundled surface; flagged, not changed.
- **`src/config/__resolution-matrix__/fixtures/faithful-esm/`**: a faithful ESM-authored consumer fixture, deliberately `.js`-extensioned, and excluded from the build (`tsconfig.json` `exclude`). Touching it would defeat its purpose.

## Close-state certification (R8 AC4) — already delivered by 9.2, re-certified here

The task called for "a consumer-side assertion that imports `@3fn/core/{blend,build,types}` under both `import` and `require` from a faithful consumer, asserting they resolve to the shipped `dist`." **This assertion already exists** — 9.2/3b added it: `describe('Spec 118 Task 9.2 (3b) — reconciled-trio exports resolve to compiled dist')` (`tests/consumer-integration.test.ts:514`), two sub-tests covering all three subpaths under `require` and dynamic `import()`, asserting on-disk resolution under the installed package's `dist/`. No new test was needed; reading the guard first avoided a duplicate.

## Verification

Main-loop (these do not phantom — only the packed-install consumer subprocess does):
- `npx tsc --noEmit`: **clean.**
- `npm run build`: **exit 0** (the 5 pre-existing esbuild "types condition" exports-ordering warnings are unrelated noise — see below).
- `git diff token-index/`: **empty** — the authoring-only strip produced no generator-output drift (behavior-preserving).
- Full `npm test`: **8979/8979** (375/375 suites) — exact post-124 baseline, no regressions.

Consumer guard (the arbiter; Ada-run because it phantoms in main-loop Bash) — `npm run test:consumer`:
- **`Spec 118 Task 9.2 (3b) — reconciled-trio exports resolve to compiled dist`: PASS** (both `require` and `import()` sub-tests; all three subpaths → `dist`). This is 9.3's R8 AC4 close-state certifier.
- **`generate produces output files`: PASS** — `components.yaml` non-empty + contains `inputradio.box.sm` (N>0).
- Suite: 9 passed / 1 skipped (the pre-existing `validate` skip) / 10 total; clean exit.
- The known MCP-orphan teardown leak ("Jest did not exit") appeared — tracked noise, not a failure.

## Non-blocking observation (flagged, not actioned)
The build emits 5x `▲ [WARNING] "types" condition ... will never be used` from esbuild for the `config`/`types`/`build`/`blend`/`testing` export subpaths — a `package.json` exports **condition-ordering** nit (`types` placed after `import`/`require`). Pre-existing, orthogonal to 3c, and proven harmless (the reconciled-trio resolution tests are green). A candidate for a small follow-up (exports `types`-first ordering), or to fold into Task 11 governance — not part of this certification.

## Verification discipline held
- The packed-install consumer guard was the arbiter — never an in-repo load.
- `npm run build` run before certification; token-index diff checked for behavior preservation.
- The conversion diff was authored + reviewed in the main loop; the consumer-lane run was delegated to a subagent and its result verified here.

## Cross-references
- `findings/runtime-ts-resolution-target-model.md` (the ratified model 3c completes)
- `completion/task-9.2-completion.md` (the reconciled-trio exports + the consumer-guard assertion 9.3's close-state reuses)
- `tests/consumer-integration.test.ts:514` (the R8 AC4 reconciled-trio close-state assertion)

## What remains in Spec 118
- **9.4** — static-lint polarity (ban explicit extensions on `src/components/` web source; the scaffold's pre-written CJS selectors at `eslint.config.js:107-115`; prove-it-bites positive/negative check) **+ the class-invariant lint** (124 Impact 2: "no mutable-accumulate-read-back state crosses the scoped boundary"). `src/components/` is already extensionless, so the extension-ban polarity will be green on set.
- **Task 11** — governance: codify the brand contract (124) + the class invariant + the CJS/extensionless direction; the esbuild exports `types`-ordering nit can ride here.

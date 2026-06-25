# Task 9.1 Completion: Increment 3a — Runtime Unification (CORE) + the bin-register discovery

**Date**: 2026-06-25
**Task**: 9.1 — Increment 3a runtime unification (full ts-node removal → tsx)
**Type**: Implementation
**Status**: **CORE COMPLETE** (R6 one-mechanism satisfied). The bin-register retirement is **carved out to Task 9.5** (audit-first) — see § Discovery.
**Validation Tier**: Tier 2
**Agent**: Ada (mechanics) + main-loop (verification, scope decisions) ; Ada+Lina task review incorporated.
**Branch**: `spec-118-module-resolution-coherence`

---

## What was committed (the 3a core — verified green)

**One runtime TS mechanism: tsx. ts-node fully retired from the governed surface.**
- All **13** `package.json` ts-node invocations → tsx; the 2 *live* dev-shebang scripts (`verify-opacity-types.ts`, `categorize-tests.ts`) → tsx; `ProductMCPIntegration.test.ts`'s live `npx ts-node` spawn → tsx.
- **2 dead orphan scripts deleted** (`profile-incremental-analysis.ts` — imports the deleted `src/release-analysis/*`; `test-generated-types.ts` — drifted types). Both from Dec-2025 specs, wired to nothing. (Peter-approved.)
- **Shipped-CLI ts-node fallback pruned** (`src/cli/designerpunk.ts` `resolveTsRunner` → tsx-only, fail-loud).
- **Parity harness retired fully** (`ParityOrchestrator.ts`, `ParityNormalizationRules.ts`, `__parity__/run-parity.js`, 2 test suites, `test:parity` script) — its two-mechanism Increment-2 purpose is spent; evidence preserved in `findings/`. (Peter-approved; drops 17 tests.)
- **ts-node `devDependency` removed.**
- **typecheck-gate-loss mitigation (R6 AC3) — landed FIRST, before the swap:** `tsconfig.scripts.json` (extends base, inherits excludes, `noEmit`) + `typecheck:scripts` npm script, wired into `consumer-guard.yml`. Restores `tsc` coverage for the 2 `scripts/**` build-path generators that ts-node alone typechecked.
- **Injected loader seam KEPT + hardened** (`scripts/generate-platform-tokens.ts:52` — `loadConfig(cwd, (p) => import(p))`); comment upgraded to a DO-NOT-REMOVE guard (it prevents Approach A from tearing down tsx's ambient hook → the Inc-1 regression).
- **tsx pinned `~4.21.0`** (patch-only — no fallback executor remains, R6 AC4 concentration risk); pin-bump review gate via `.github/CODEOWNERS` on the dependency manifests.

**Grep-guard (corrected scope):** `grep -rn "ts-node" src/ scripts/ bin/ package.json` → only historical-doc references. **It intentionally does NOT cover the MCP dev sub-packages** (`application-mcp-server`, `mcp-server`), which retain their own ts-node **by design — the R12 AC4 documented exception** (Resolved Decision 2). "ts-node retired" = the root/governed surface, not the exempt bundled-MCP dev configs.

## Verification (main-loop, independent)
- `npm run build`: **exit 0** · `git diff token-index/`: **empty** (tsx generation reproduces the committed index) · `tsc --noEmit`: clean · `typecheck:scripts`: green.
- Full `npm test`: **374 suites / 8972 tests** (drop from 376/8989 = exactly the 17 retired parity tests; no other regression).
- Consumer lane (Ada): **pass** (certifies the bin path). MCP/browser boot-smoke + dynamic-import guards: pass.
- MCP servers unaffected: bundled (`dist/mcp/*.js`, node-run); MCP dirs untouched this session (git-confirmed); their ts-node dev configs intact (R12 exception).
- @3fn/core consumer surface clean: `tsx` stays a runtime dep (`~4.21.0`); `ts-node` was dev-only (never shipped); shipped `dist` byte-identical.

---

## The Discovery — why the bin-register retirement is carved out (Task 9.5)

The design slotted "retire the bin's bare `register()`" into 3a, and issue `2026-06-10-cli-bundle-remove-wildcard-export.md` documented a "correct fix" (esbuild-bundle the CLI, ~1–2 hrs). **Both under-modeled the register's real job.** Attempting the bundle (built clean, tsx external) **broke `npx designerpunk generate`**, proven by direct repro:

1. **Local mode** (what `init` configures): the CLI `require()`s the **consumer's raw `.ts`** — `resolveTokens` (`<consumer>/src/tokens`) and `loadComponentTokens` (component `.ts`). These resolve **only because the bin's global tsx register is present.** Remove it → "Token source not found."
2. **Package mode:** bundling shifts `__dirname` (`src/config` → `dist/cli`), so `ConfigLoader.ts:126`'s `path.resolve(__dirname, '../tokens')` points at `dist/tokens`; `loadComponentTokens` (scans for `.ts`) finds only `.js` → **silently zeroes component tokens** (re-introducing the Spec 117 R4 bug). `generateTokenIndex.ts:119` has the same shift.

**The honest finding:** the global register is load-bearing for loading the **consumer's** `.ts` at runtime, not just the CLI's own source. Three layers of documented understanding (design → issue → "documented fix") were each incomplete, each caught only by the consumer guard — the spec's "certify, don't assert" ethos earning its keep.

**Decision (Peter):** do NOT take a fourth guess. The bin-register retirement moves to **Task 9.5**, gated on a **consumer-runtime-TS-resolution audit** that maps the complete site inventory + the `__dirname` assumptions + the target coherent model *before* the fix. The register stays as a **documented coherent interim** (consumer-guard-green; R6 one-mechanism already satisfied without it). The bin's own doc block records this so no one "finishes the job" by deleting the line.

## Open items (handed off)
- **Task 9.5** — the consumer-runtime-TS-resolution audit + the true bin retirement (audit-first; Tier 3).
- **CODEOWNERS handle (Peter):** `.github/CODEOWNERS` uses the org `@3fn` as a placeholder for the pin-bump gate owner — replace with the real handle/team, and enable branch-protection "Require review from Code Owners" (same repo-settings action as the Consumer-Guard required check).
- **Cross-domain (Lina):** stale regen comments in `Avatar.ios.swift:50` / `Avatar.android.kt:96` (`npx ts-node src/generators/generateTokenFiles.ts` — both retired and the wrong entry); correct when next touching those platform outputs.

## Artifacts
`package.json`, `package-lock.json`, `tsconfig.scripts.json` (new), `bin/designerpunk.js` (interim doc block), `src/cli/designerpunk.ts` (fallback pruned), `scripts/{generate-token-types,generate-platform-tokens,extract-component-meta,categorize-tests,verify-opacity-types}.ts`, `src/__tests__/ProductMCPIntegration.test.ts`, `src/tools/integrity/cli/run-audit.ts`, `.github/workflows/consumer-guard.yml`, `.github/CODEOWNERS` (new), `findings/parity-harness-notes.md` (retirement note); deleted: 2 dead scripts + 5 parity files.

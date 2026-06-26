# Task 3 Completion: Contract + Harvest + Test-Migration — the Atomic Increment

**Date**: 2026-06-26
**Task**: 3 — `defineComponentTokens` return-contract (brand) + `loadComponentTokens` return-value harvest (sole writer) + `allowOverwrite` retirement + test migration
**Type**: Architecture
**Status**: **IMPLEMENTED & VERIFIED GREEN — not yet committed** (Peter reviews the diff). Dual-instance brand survival (R7) is **NOT yet certified** — it rides Task 4 (packed-install arbiter).
**Validation Tier**: Tier 3 — Comprehensive
**Agent**: Ada (implementation) + main-loop (independent verification); Lina + Ada pre-ratification review incorporated.
**Branch**: `spec-118-module-resolution-coherence`

---

## What was implemented (verified green; not yet committed)

**The last side-effect seam is now a return-value seam.** `defineComponentTokens` brands its return; `loadComponentTokens` harvests the brand and is the sole registry writer; the mutable-global `allowOverwrite` machinery is retired.

- **Contract / brand (`src/build/tokens/defineComponentTokens.ts`):**
  - Single **exported** `TOKEN_CONTRACT_BRAND = '@3fn/dp:tokenContract'` (one frozen-string source — caveat a).
  - Branded return via guarded `Object.defineProperty(values, TOKEN_CONTRACT_BRAND, { value: registeredTokens, enumerable: false, configurable: true, writable: false })` — **Option A** (non-enumerable string key; survives the module-duplication boundary by **value**, not object identity).
  - **Side-effect registration removed** (`registerBatch` call gone; value import of `ComponentTokenRegistry` dropped; `RegisteredComponentToken` type import kept).
  - Exported typed accessor `getTokenContract(candidate): RegisteredComponentToken[] | undefined` — reads via `hasOwnProperty`, never key-enumeration (caveat d).
  - Public return type unchanged (`ComponentTokenValues<T>`); brand absent from the type. JSDoc + both `@example` blocks rewritten (removed the "registers with the global registry" step; documented the branded-return + `getTokenContract` recovery).
  - Barrel re-exports `TOKEN_CONTRACT_BRAND` + `getTokenContract` (`src/build/tokens/index.ts`).
- **Harvest / sole writer (`src/cli/loadComponentTokens.ts`):**
  - Captures the `loadModule(...)` return at **both** scan sites (Source 1 `{tokenSourceRoot}/component/` and Source 2 `scanForTokenFiles`); a `harvestModule` helper iterates `Object.values(mod)`, collects via `getTokenContract`, dedupes re-export aliases first-seen-wins.
  - **Preserves Source-1-then-Source-2 directory-scan + authored-array order — NO sort** (Task-2 spike decision; a sort would reorder to alphabetical and break R6).
  - Registers harvested tokens into the canonical registry as **sole writer**; the `setDefaultAllowOverwrite(true)/finally(false)` dance and stale `allowOverwrite` docstrings removed.
- **Registry (`src/registries/ComponentTokenRegistry.ts`):** removed `setDefaultAllowOverwrite`, the `defaultAllowOverwrite` field, and `ComponentTokenRegistrationOptions.allowOverwrite` (the **Component** option only — shared `RegistrationOptions` and the primitive/semantic registries untouched). Kept the genuine duplicate-name conflict throw, `clear()`, and `registerBatch` (the harvest uses it).
- **Test migration — 7 files** (see § The migration surface):
  - Re-pointed to the branded return: `Badge-Label-Base/__tests__/tokens.test.ts`, `tokens/__tests__/ProgressTokenCompliance.test.ts`.
  - Rewritten side-effect-as-contract premise + added non-enumerability, idempotency, and a compile-time brand-absence assertion: `build/tokens/__tests__/defineComponentTokens.test.ts`.
  - Production-harvest reproduction in `beforeAll`: `tokens/__tests__/ProgressTokenTranslation.test.ts`.
  - Fixtures rewritten to author via `defineComponentTokens` + export the result: `tools/integrity/__tests__/consumer-package-mode.test.ts`.
  - Deleted retired-behavior tests: `cli/__tests__/loadComponentTokens.test.ts` (`allowOverwrite`/reset block), `registries/__tests__/ComponentTokenRegistry.test.ts` (the `allowOverwrite: true` case).

## Verification (main-loop, independent)
- `tsc --noEmit`: **clean** (exit 0).
- Full `npm test`: **374 suites / 8973 tests / 0 failed** — run **twice independently** (implementer + main loop), nothing skipped/gated.
- `npm run build`: **success** (only pre-existing `package.json` export-condition-ordering warnings — see Open items; no errors).
- `npx designerpunk generate`: **"Component tokens: 33"** (was **0** under the 118 dual-instance split — the defect this task fixes). `git diff token-index/` + `git status --porcelain token-index/`: **empty** → **R6 satisfied** (value AND order identical to committed).
- Brand core re-read in main loop: guarded `defineProperty`, no registry write, `getTokenContract` via `hasOwnProperty`, single brand source — matches spec.
- Real harvest is exercised same-process by `consumer-package-mode.test.ts` + `loadComponentTokens.test.ts` (the migrated Progress tests' manual reproductions are not the only coverage).
- **Hold-back honored:** no Spec 118 file or handoff touched (git-confirmed).

## The migration surface — 7 files, not the predicted 5 (honest note)
The pre-ratification review estimated the surface by static analysis and **under-counted twice**: review corrected 4 → 5 (Ada caught `ComponentTokenRegistry.test.ts`'s `allowOverwrite` case); implementation then surfaced **two more** via the full suite —
- `ProgressTokenCompliance.test.ts` — the same direct-registry-read pattern as Badge-Label (`getByComponent('Progress')` populated by an import side effect); **missed by an incomplete sweep**.
- `ProgressTokenTranslation.test.ts` — an **indirect** dependency (imports progress for the side effect so the `TokenFileGenerator` pipeline has tokens to translate); **structurally invisible to a `.has`/`.getByComponent` grep**.

The **full suite was the reliable detector**, exactly as Design Decision D5 (atomic increment, green at every boundary) intended — nothing shipped half-migrated. The surface is now **empirically complete**: zero bare side-effect imports of token files remain in tests, and the suite is green.

## Not yet done (open)
- **R7 — dual-instance brand survival: NOT certified.** Same-process green is necessary but not sufficient — a same-process test passes for both the correct string-key brand AND a broken plain `Symbol()` (one module copy). The authoritative proof rides the **packed-install arbiter** in **Task 4** — the final open delivery-gate condition.
- **Not committed** — awaiting Peter's review of the diff.

## Open items (handed off / to track)
- **Task 4** — dual-instance certification (packed-install arbiter), negative guard, class-invariant guard, isolation audit. **Use the existing arbiter; do NOT build a new dual-instance harness** (avoids a second `--detectOpenHandles` / "Jest did not exit" leak surface).
- **Likely closes** `.kiro/issues/bug-component-token-double-registration.md` — harvest-as-sole-writer eliminates double-registration by construction; confirm & close in Task 5.
- **Pre-existing, out of 124 scope — to seed:** (1) `package.json` export-condition warnings — `"types"` listed after `"import"`/`"require"` in all 7 conditional-export subpaths → unreachable for TS consumers (`package.json` untouched by 124); (2) token-index ordering ties to `readdirSync`/filesystem order — a canonical sorted order would be portable but requires a deliberate re-baseline.

## Artifacts
Source: `src/build/tokens/defineComponentTokens.ts`, `src/build/tokens/index.ts`, `src/cli/loadComponentTokens.ts`, `src/registries/ComponentTokenRegistry.ts`, `src/__tests__/helpers/tsModuleLoader.ts` (docstring). Tests: `src/build/tokens/__tests__/defineComponentTokens.test.ts`, `src/cli/__tests__/loadComponentTokens.test.ts`, `src/components/core/Badge-Label-Base/__tests__/tokens.test.ts`, `src/registries/__tests__/ComponentTokenRegistry.test.ts`, `src/tokens/__tests__/ProgressTokenCompliance.test.ts`, `src/tokens/__tests__/ProgressTokenTranslation.test.ts`, `src/tools/integrity/__tests__/consumer-package-mode.test.ts`. **Not committed** (Peter review pending).

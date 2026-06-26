# Task 3 Summary: Component-Token Return Contract — the Atomic Increment

**Date**: 2026-06-26
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 124-component-token-return-contract

## What Was Done

Converted the last side-effect seam to a **return-value seam**. `defineComponentTokens` now brands its (backward-compatible) flat value-map with a non-enumerable, string-keyed sidecar (`'@3fn/dp:tokenContract'`) carrying the rich `RegisteredComponentToken[]`; `loadComponentTokens` harvests that brand from each loaded module's exports and is the **sole** writer to the canonical registry; the mutable-global `allowOverwrite` machinery is retired. Shipped as one atomic increment (contract + harvest + 7-file test migration), verified green, not yet committed.

## Why It Matters

The component-token registry was the only consumer-`.ts` seam still relying on a shared-singleton **side effect** across the tsx boundary — which silently zeroed component tokens when the scoped require split the registry into two instances (the Spec 118 dual-instance blocker). Harvesting a **value-survivable brand** from the return removes the cross-boundary singleton entirely — the ratified target-model end-state ("seams consume return values, no shared mutable singleton across the boundary"). The registry becomes a harvest-populated store with a single writer, so `allowOverwrite` and the cross-test-pollution class retire *with* the change. This is the spine fix, not a leaf patch. The brand is a non-enumerable **string key** (not `Symbol.for`) deliberately, so no process-global is introduced and it stays portable across realms/loaders.

## Key Changes

- `src/build/tokens/defineComponentTokens.ts` — branded return (Option A); side-effect registration removed; exported `getTokenContract` accessor + single `TOKEN_CONTRACT_BRAND`; JSDoc rewritten.
- `src/build/tokens/index.ts` — barrel-exports the brand + accessor.
- `src/cli/loadComponentTokens.ts` — return-value harvest, sole writer, directory-scan order preserved (no sort), `allowOverwrite` dance removed.
- `src/registries/ComponentTokenRegistry.ts` — `setDefaultAllowOverwrite` + `allowOverwrite` option removed; conflict-throw and `clear()` kept.
- 7 test files migrated (5 predicted + 2 surfaced by the full suite).

## Impact

- ✅ `generate` **0 → 33 component tokens**; `git diff token-index/` empty (R6 — value AND order identical to committed).
- ✅ Full `npm test` **8973/8973**, `tsc` clean, `build` ok — verified **twice** (implementer + main loop); nothing skipped.
- ✅ Backward-compatible flat return preserved; brand invisible to spread / `Object.keys` / `JSON.stringify` (asserted).
- ✅ No process-global introduced (string-key brand, not `Symbol.for`); the real harvest path is exercised same-process (`consumer-package-mode`, `loadComponentTokens` tests).
- ⏳ **R7 dual-instance brand survival NOT yet certified** — rides Task 4 (packed-install arbiter); the one remaining delivery-gate condition. Same-process green can't prove cross-boundary survival.
- ↪ Likely closes the `component-token-double-registration` issue (confirm in Task 5); seeds two pre-existing items (`package.json` `"types"`-condition ordering; token-index filesystem-ordering portability).
- ⚠ **Not committed** — Peter reviews the diff. 118 untouched (hold-back intact).

# Export-Condition Inventory (R4 AC5)

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence, Task 7.3
**Agent**: Ada
**Scope**: Investigation-only. Inventory all export conditions; no code changed.

> Read directly from the **current** `package.json` `exports` (`package.json:66-111`) — NOT the design's table, which is stale (see `./config` discrepancy below). Every row verified against the live file.

---

## Full `exports` inventory (current `package.json:66-111`)

| Subpath | `import` | `require` | `types` | Notes |
|---------|----------|-----------|---------|-------|
| `.` | `dist/browser/designerpunk.esm.js` | — | `dist/browser-entry.d.ts` | **import-only** |
| `./components` | `dist/browser/designerpunk.esm.js` | — | `dist/browser-entry.d.ts` | **import-only** |
| `./tokens.css` | (string) `dist/DesignTokens.web.css` | — | — | plain CSS asset |
| `./component-tokens.css` | (string) `dist/ComponentTokens.web.css` | — | — | plain CSS asset |
| `./config` | `dist/config/index.js` | **`dist/config/index.js`** | `dist/config/index.d.ts` | **import + require (CHANGED — see below)** |
| `./types` | `src/types/index.ts` | `src/types/index.ts` | `src/types/index.ts` | **raw `.ts`, all 3 conditions** |
| `./build` | `src/build/tokens/index.ts` | `src/build/tokens/index.ts` | `src/build/tokens/index.ts` | **raw `.ts`, all 3 conditions** |
| `./blend` | `src/blend/index.ts` | `src/blend/index.ts` | `src/blend/index.ts` | **raw `.ts`, all 3 conditions** |
| `./jest-preset` | — | `dist/testing/jest-preset.js` | — | **require-only / CJS** |
| `./testing` | `dist/testing/index.js` | `dist/testing/index.js` | `dist/testing/index.d.ts` | import + require (both → dist) |
| `./grid.css` | (string) `src/styles/responsive-grid.css` | — | — | raw CSS asset |
| `./fonts/inter.css` | (string) `src/assets/fonts/inter/inter.css` | — | — | font asset |
| `./fonts/rajdhani.css` | (string) `src/assets/fonts/rajdhani/rajdhani.css` | — | — | font asset |
| `./fonts/figtree.css` | (string) `src/assets/fonts/figtree/figtree.css` | — | — | font asset |
| `./fonts/commit-mono.css` | (string) `src/assets/fonts/commit-mono/commit-mono.css` | — | — | font asset |
| `./package.json` | (string) `./package.json` | — | — | self JSON |

---

## The import-only / require-only asymmetry

The runtime subpaths split into three resolution shapes:

- **import-only** (`import` + `types`, no `require`): `.`, `./components` — both → the browser ESM bundle. A `require('@3fn/core')` or `require('@3fn/core/components')` resolves **nothing** (no `require` condition).
- **require-only**: `./jest-preset` → `dist/testing/jest-preset.js` (CJS). An `import '@3fn/core/jest-preset'` resolves nothing — by design, the preset is consumed via `require(...)` in a product `jest.config.js`.
- **both `import` + `require`**: `./config`, `./types`, `./build`, `./blend`, `./testing`.

## DISCREPANCY — `./config` now carries BOTH `import` and `require` (CHANGED since the design)

**The design's exports table is stale here.** The live `package.json:77-81`:
```json
"./config": {
  "import": "./dist/config/index.js",
  "require": "./dist/config/index.js",
  "types": "./dist/config/index.d.ts"
}
```

`./config` now has **both `import` and `require`**, both resolving to the **compiled** `dist/config/index.js` (not raw `.ts`). This was added by **Spec 118 Task 3** — the "`./config` exports barrier — Option C" fix surfaced + fixed by the consumer guard (tasks.md Task 3 DONE note: "Surfaced + fixed the `./config` exports barrier (Option C)").

Consequence to record explicitly:
- **`require('@3fn/core/config')` now resolves** (→ `dist/config/index.js`).
- **`require('@3fn/core')` (the `.` subpath) still resolves nothing** — `.` remains import-only. The two are no longer symmetric; `./config` was reconciled, `.` was not.

So the design's depiction of `./config` as missing a `require` condition is no longer accurate. Reality governs.

## The three raw-`.ts` subpaths — `./blend`, `./build`, `./types` (the second-instance hazard)

`package.json:82-96`. Each of these three carries **all three conditions — `import` + `require` + `types` — ALL pointing at raw `.ts` source** under `src/`:

- `./types` → `./src/types/index.ts` (×3)
- `./build` → `./src/build/tokens/index.ts` (×3)
- `./blend` → `./src/blend/index.ts` (×3)

These ship raw, un-compiled TypeScript across the package boundary. A consumer resolving any of them gets a `.ts` file Node cannot execute without a TS loader — the same class of failure Increment 1 fixed for the config-load path, here recurring at the **exports** surface (the "second instance"). This is the Increment 3b / R7 reconciliation target.

**`types` must be reconciled too — not just `import`/`require`.** Emphasizing for 3b (R7): each of these three subpaths points `types` at the raw `.ts` as well. If 3b moves `import`/`require` to compiled `dist/...` but **leaves `types` at the raw `.ts`**, consumer typechecking would resolve against a different file than runtime — a desync where the type surface and the runtime surface diverge. 3b must reconcile all three conditions in lockstep, `types` included.

## Coherence question carried into Group 9 / Increment 3b (inventory-only)

`require('@3fn/core')` — the `.` subpath — resolves **nothing** (import-only, `package.json:67-70`). This is recorded as an open coherence question to carry into Increment 3b (Group 9), **not** resolved here. Per the Increment-2 hard constraint (R4 AC1), this inventory does NOT propose the fix; it only flags that `.` is import-only while its sibling `./config` was made symmetric, so the question "should `require('@3fn/core')` resolve?" is live for the direction decision and 3b.

---

## What this feeds

- **Task 8 (direction decision):** the asymmetry pattern (import-only `.`/`./components`, require-only `./jest-preset`, the raw-`.ts` trio) is direction-relevant evidence.
- **Increment 3b (R7):** reconcile `./blend`, `./build`, `./types` across `import` + `require` + **`types`** to coherent compiled resolution; resolve the `.`-require coherence question. This is where Spec 117's exports path finally certifies.

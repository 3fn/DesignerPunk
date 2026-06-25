# ESM-Migration Cost Inventory — incl. jest-preset Blast Radius + Parking-Form Determination (R4 AC6 / OQ-3)

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence, Task 7.3
**Agent**: Ada
**Scope**: Investigation-only. Inventory ESM-migration cost; determine the OQ-3 parking form; no code changed.

> Verified against `package.json`, `src/testing/jest-preset.ts`, the **compiled** `dist/testing/jest-preset.js` (present on disk), and `src/cli/init.ts`. Cited file:line throughout.

---

## 1. The shipped `@3fn/core/jest-preset` — require-only / CJS (Spec 105)

`package.json:97-99`:
```json
"./jest-preset": { "require": "./dist/testing/jest-preset.js" }
```

- **Require-only, CJS.** Shipped to product consumers (Spec 105). Listed in `files` (`package.json:42-43`: `dist/testing/jest-preset.js` + `.d.ts`).
- A product consumes it via `module.exports = { ...require('@3fn/core/jest-preset'), ... }` (the usage `init` writes — see §3, and the preset's own doc header `src/testing/jest-preset.ts:9-14`).

**Blast radius of an ESM `"type":"module"` flip:** A `"type":"module"` flip on `@3fn/core` propagates to **every consuming product's test setup**. The preset is the test-config seam every consumer's `jest.config.js` spreads. If the flip strands the preset (CJS `module.exports` `.js` reinterpreted as ESM), every consuming product's jest boot breaks at once. This is the single highest-leverage cost line in an ESM migration and is the design's named OQ-3 concern. It is **not** a one-line `testEnvironment` flip (see §2).

## 2. The preset `moduleNameMapper` — raw-`.ts` targets couple it to Increment 3b (R7)

`src/testing/jest-preset.ts:53-60` (and identically in compiled `dist/testing/jest-preset.js:84-91`). `pkgRoot = path.resolve(__dirname, '../..')` (`src/testing/jest-preset.ts:34`). The actual mapping entries:

```js
moduleNameMapper: {
  '\\.css$':              styleMockPath,                              // style-mock.js
  '^@3fn/core/blend$':   path.join(pkgRoot, 'src/blend/index.ts'),   // RAW .ts
  '^@3fn/core/build$':   path.join(pkgRoot, 'src/build/tokens/index.ts'), // RAW .ts
  '^@3fn/core/types$':   path.join(pkgRoot, 'src/types/index.ts'),   // RAW .ts
  '^@3fn/core/testing$': path.join(pkgRoot, 'src/testing/index.ts'), // RAW .ts
  '^@3fn/core/config$':  path.join(pkgRoot, 'src/config/index.ts'),  // RAW .ts
}
```

Five `@3fn/core/*` entries rewrite to **raw `.ts` source under `pkgRoot`**. These raw-`.ts` mapping targets **couple the preset to the Group-8 / Increment-3b exports reconciliation** — the same `./blend`/`./build`/`./types` raw-`.ts` subpaths (plus `./testing`, `./config`) inventoried in `export-condition-inventory.md`. Migrating the preset is therefore **not** a one-line `testEnvironment` flip: the raw-`.ts` `moduleNameMapper` targets are an R7/3b concern that must move in step with the exports reconciliation. (Note: ts-jest *does* compile these raw `.ts` targets fine today via its transform; the coupling is that 3b will change where these subpaths *should* resolve, and the mapper must track that.)

## 3. SF-5 — two copies in lockstep (verify both)

The **same 5-entry `@3fn/core/*` → raw-`.ts` mapping** exists in **two** places that must stay in lockstep:

**(a)** the preset's `moduleNameMapper` — `src/testing/jest-preset.ts:55-59` (verified above).

**(b)** the consumer's `tsconfig.test.json` `paths`, written by `init` — `src/cli/init.ts:139-145`:
```js
paths: {
  '@3fn/core/blend':   ['./node_modules/@3fn/core/src/blend/index.ts'],
  '@3fn/core/build':   ['./node_modules/@3fn/core/src/build/tokens/index.ts'],
  '@3fn/core/types':   ['./node_modules/@3fn/core/src/types/index.ts'],
  '@3fn/core/testing': ['./node_modules/@3fn/core/src/testing/index.ts'],
  '@3fn/core/config':  ['./node_modules/@3fn/core/src/config/index.ts'],
}
```

Same five subpaths, same raw-`.ts` targets (the preset uses `pkgRoot`; init uses the consumer-relative `./node_modules/@3fn/core/...` path — equivalent destinations). **Verified both present.**

**Plus a third coupled artifact:** `init` also writes the consumer's `jest.config.js` (`src/cli/init.ts:119-123`): `module.exports = { ...require('@3fn/core/jest-preset'), roots: ['<rootDir>/src'] }`.

**Lockstep obligation for 3b:** any change to where these 5 subpaths resolve must update **all three** in lockstep — the preset `moduleNameMapper` (a), the `init`-written `tsconfig.test.json` `paths` (b), and the `init`-written `jest.config.js` consumption form (c). This is Ada SF-5; carried into the Increment-3b decomposition (tasks.md Group 9 / Increment 3b explicitly lists it).

---

## 4. Parking-form determination (OQ-3) — the key deliverable

**Question:** Does a coherent CJS "parking form" for the shipped preset exist — one that survives a `"type":"module"` flip on `@3fn/core` — so the escape-hatch *defer* branch (Task 8 / Group 10) is available?

### Evidence (read the actual compiled artifact)

`dist/testing/jest-preset.js` **exists on disk** (verified; 3465 bytes). Read directly, its form is **pure CJS**:
- `"use strict";` (`dist/testing/jest-preset.js:1`)
- `Object.defineProperty(exports, "__esModule", { value: true });` (`:60`)
- `const path = __importStar(require("path"));` (`:61`) — CommonJS `require`
- `module.exports = { testEnvironment: 'jsdom', ... }` (`:67-93`) — CommonJS export
- TS-emitted CJS interop helpers (`__importStar`, `__createBinding`, `__setModuleDefault`, `:27-59`)

No `import`/`export` ESM syntax; it is a `module.exports` `.js`.

### Reasoning

- Under the package's current default (no `"type"` field → CJS), a `.js` with `module.exports` is correctly interpreted as CommonJS.
- **An ESM `"type":"module"` flip would strand it:** Node would then interpret every `.js` in the package as ESM, and a `module.exports` `.js` throws (`module is not defined` / `exports is not defined` in ESM scope). The preset would break for every consumer — the §1 blast radius.
- **The parking form that survives the flip:** rename the shipped artifact to **`jest-preset.cjs`** and retarget the `./jest-preset` `require` condition (`package.json:98`) to it. A `.cjs` extension is **unambiguously CommonJS regardless of the package `"type"` field** — it survives the flip by construction.
- This is clean because the preset is **`require`-only** (`package.json:97-99`): there is **no `import` condition to satisfy**, so a `.cjs` retarget fully covers the subpath's contract. No dual-form (ESM + CJS) emission is needed.
- This matches Lina's recorded assessment (leaning YES). The compiled artifact I read confirms the premise: it is genuinely pure-CJS `module.exports`, exactly the form that strands under a flip but is rescued by the `.cjs` rename.

### Determination

**Parking form EXISTS.** A coherent CJS parking form for the preset is available: rename `dist/testing/jest-preset.js` → `dist/testing/jest-preset.cjs` and retarget the require-only `./jest-preset` condition to it. The `.cjs` form is CJS-unambiguous under `"type":"module"`, and the preset's require-only contract means no `import` condition is left unsatisfied. **Therefore the escape-hatch defer branch IS available** (Task 8 may elect to defer ESM-consolidation execution; the preset can be parked coherently rather than forced to migrate in-spec). Per tasks.md Group 10 item (c), this means the "preset migrates in-spec" contingency likely does NOT fire.

### Caveat to record (do NOT overclaim)

The parking form parks the preset **FORMAT** coherently (the `"type"`-flip strand is neutralized). It does **not** by itself deliver full coherence:
- The `moduleNameMapper` raw-`.ts` targets (§2) are an **R7 / Increment-3b** concern, *not* a `"type"`-flip strand. The `.cjs` parking form does not address them; 3b still must.
- So "parking form exists" answers *only* OQ-3 (does a flip-surviving CJS format exist) — it does not close 3b.

### Final-confirmation deferral

This is the **Increment-2 determination** (format-level reasoning from the verified compiled artifact). The **final** confirmation is deferred to an actual **`.cjs`-under-`"type":"module"` boot** through the **Group-10 close-state guard** (the shipped-preset close-state guard, R3 AC4 — exercising the preset via a faithful-consumer `init`-written `jest.config.js`, fail-loud). I am doing the Inc-2 determination, not the final boot. The guard remains required regardless of the determination (tasks.md Group 10 item (c)).

---

## Cost-inventory summary (feeds Task 8)

| Cost line | Magnitude | Coupling |
|-----------|-----------|----------|
| jest-preset `"type":"module"` strand | **High** — hits every consuming product's test boot | Mitigated by the `.cjs` parking form (EXISTS) |
| preset `moduleNameMapper` 5× raw-`.ts` | Medium | Coupled to Increment 3b (R7), not the flip |
| SF-5 two-copies-in-lockstep (preset + `init` `tsconfig.test.json` `paths` + `init` `jest.config.js`) | Medium | All three update in lockstep in 3b |
| Raw-`.ts` exports trio (`./blend`/`./build`/`./types`, incl. `types`) | Medium | Increment 3b (see `export-condition-inventory.md`) |

**OQ-3 verdict: parking form EXISTS → escape-hatch defer branch available.** Full coherence still requires Increment 3b; final boot confirmation deferred to the Group-10 close-state guard.

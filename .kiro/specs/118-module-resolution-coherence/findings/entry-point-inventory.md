# Entry-Point Inventory (R4 AC2)

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence, Task 7.3
**Agent**: Ada
**Scope**: Investigation-only. Inventory every runtime TS entry point; no code changed.

> Verified against the actual repo: `package.json` (scripts/bin), `bin/designerpunk.js`, `scripts/build-browser-bundles.js`, `package.json` `build:mcp`. Cited file:line throughout.

---

## Summary table

| # | Entry point | Mechanism | Source | Status |
|---|-------------|-----------|--------|--------|
| 1 | `bin/designerpunk.js` (prod CLI) | **tsx** (`tsx/cjs/api` register) | `bin/designerpunk.js:16-17` | **GOVERNED** |
| 2 | The dev/build/release scripts | **ts-node** | `package.json` scripts (13 invocations) | **GOVERNED** |
| 3 | application MCP server | esbuild bundle (`--format=cjs`) | `build:mcp` (`package.json:125`) | **EXEMPT (R12)** |
| 4 | docs MCP server | esbuild bundle (`--format=cjs`) | `build:mcp` (`package.json:125`) | **EXEMPT (R12)** |
| 5 | product MCP server | esbuild bundle (`--format=cjs`) | `build:mcp` (`package.json:125`) | **EXEMPT (R12)** |
| 6 | browser bundle | esbuild bundle (ESM/UMD) | `scripts/build-browser-bundles.js` | **EXEMPT (R12)** |
| 7 | tests | ts-jest (jest-preset) | `jest`/`ts-jest` transform | **GOVERNED** |

---

## 1. `bin/designerpunk.js` — the production CLI path (GOVERNED, tsx)

`package.json:112-114` declares the bin:
```
"bin": { "designerpunk": "./bin/designerpunk.js" }
```

`bin/designerpunk.js:16-17`:
```js
require('tsx/cjs/api').register();
require('../src/cli/designerpunk.ts').__main();
```

- It registers the **tsx** CJS hook (`tsx/cjs/api`), then `require`s the raw `.ts` CLI source and calls `__main()`.
- `__main()` is used instead of a `require.main === module` guard because Node sets `require.main` to `bin/designerpunk.js`, not the CLI module (documented `bin/designerpunk.js:6-13`).
- `tsx` is a runtime **dependency** (`package.json:185`, `"tsx": "^4.21.0"`) — correct, since it ships and runs in consumer context (`npx designerpunk ...`).
- **Spec-118 note:** This bare `register()` is the ambient hook that Increment 1 deliberately left in place (it executes the CLI's *own* source) and is retired only by Increment 3a (tasks.md Task 2 coherent-intermediate note). The config-load swap (Increment 1) was done *inside* `loadConfig`, not here.

## 2. The ts-node scripts (GOVERNED) — COUNT DISCREPANCY

**The design said "11 ts-node scripts." Reality: there are 13 `package.json` script entries that invoke ts-node** (a 14th `ts-node` grep hit, `package.json:174`, is the `devDependencies` declaration `"ts-node": "^10.9.0"`, not a script — excluded).

Verified list (`grep -n ts-node package.json`):

| Script | Line | Runs |
|--------|------|------|
| `generate:types` | 119 | `ts-node scripts/generate-token-types.ts` |
| `generate:platform-tokens` | 120 | `ts-node scripts/generate-platform-tokens.ts` |
| `extract:meta` | 121 | `ts-node scripts/extract-component-meta.ts` |
| `build:validate` | 128 | `npx ts-node src/validators/buildValidation.ts` |
| `release:analyze` | 139 | `npx ts-node src/tools/release/cli/release-tool.ts analyze` |
| `release:notes` | 140 | `npx ts-node src/tools/release/cli/release-tool.ts notes` |
| `release:run` | 141 | `npx ts-node src/tools/release/cli/release-tool.ts release` |
| `audit:mode-parity` | 146 | `npx ts-node src/validators/ModeParity.ts` |
| `audit:theme-drift` | 147 | `npx ts-node src/tools/ThemeFileGenerator.ts > ... && diff ...` |
| `generate:theme-skeleton` | 148 | `npx ts-node src/tools/ThemeFileGenerator.ts` |
| `figma:push` | 151 | `npx ts-node src/cli/figma-push.ts` |
| `figma:extract` | 152 | `npx ts-node src/cli/figma-extract.ts` |
| `figma:generate-component` | 153 | `npx ts-node scripts/figma-component-generator.ts` |

**Count: 13** (not 11). Flagging the discrepancy with the design's "11 ts-node scripts" — the inventory is governed by reality, not the design table.

**Build-path blast radius (relevant to Increment 3a / R6 AC3):** `prebuild` (`package.json:122`) chains `generate:types` + `generate:platform-tokens`, and `build` (`package.json:123`) chains `build:validate` — so **3 ts-node scripts sit on the `npm run build` critical path** (`generate:types`, `generate:platform-tokens`, `build:validate`). Two of those (`generate:types`, `generate:platform-tokens`) run `scripts/**`, which `tsconfig.json` `include: ["src/**/*"]` does **not** typecheck — ts-node is presently the only thing typechecking them. This is the R6 AC3 typecheck-gate-loss the design flags for the 3a mitigation.

## 3-5. The three esbuild-bundled MCP servers (EXEMPT, R12)

`build:mcp` (`package.json:125`) runs three `npx esbuild ... --bundle --platform=node --format=cjs` invocations producing `dist/mcp/{application-mcp,docs-mcp,product-mcp}.js` (verified present in `dist/mcp/`):
- `application-mcp-server/src/index.ts` → `dist/mcp/application-mcp.js`
- `mcp-server/src/index.ts` → `dist/mcp/docs-mcp.js`
- `product-mcp-server/src/index.ts` → `dist/mcp/product-mcp.js`

**Why exempt:** esbuild `--bundle` resolves every import at **build time** into a single self-contained file; the shipped artifact traverses no Node module resolution at runtime. They never hit the runtime TS-resolution mechanism this spec governs. (R12; documented as a coherent boundary in `findings/mcp-browser-exemption-boundary.md` and tasks.md Task 5.)

## 6. The browser bundle (EXEMPT, R12)

`build:browser` (`package.json:124`) runs `node scripts/build-browser-bundles.js`, which uses **esbuild** (`scripts/build-browser-bundles.js:21`, `const esbuild = require('esbuild')`) to bundle `src/browser-entry.ts` (`ENTRY_POINT`, ~line 26) into `dist/browser/designerpunk.esm.js` (+ `.min`, UMD variants).

**Why exempt:** same principle — bundling resolves imports at build time; the shipped `.esm.js` is self-contained and traverses no runtime Node resolution.

## 7. Tests via ts-jest (GOVERNED)

Tests run through `jest` with the `ts-jest` transform (`'^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }]`, `src/testing/jest-preset.ts:38-40`). ts-jest compiles TS per-file under jest's own module system; jest intercepts `import()` so it does **not** exercise Node's strict-ESM resolver (the reason the Task-3 consumer guard must run via subprocess, not in-process — tasks.md Task 3 "Lina MF-A"). Governed, and coupled to the exports reconciliation via the preset `moduleNameMapper` (see `esm-cost-inventory.md`).

---

## The tsx-vs-ts-node split (R6 / Increment 3a concern) — stated plainly

The repo runs **two different runtime TS-execution mechanisms** for non-bundled runtime TS:

- **tsx** — the production CLI bin (`bin/designerpunk.js:16`), shipped to consumers; tsx is a runtime `dependency`.
- **ts-node** — all 13 internal dev/build/release scripts; ts-node is a `devDependency` (`package.json:174`).

This is the R6/Increment-3a unification target: one mechanism for non-bundled runtime TS, retiring the split (and the bin's bare `register()`). **This inventory does not pick the mechanism** — that is gated on the Task-8 direction decision. It only records the split as it exists.

**Governed vs exempt, final tally:** Governed = the tsx bin (1), the 13 ts-node scripts, and tests (ts-jest). Exempt (R12, build-time bundling) = the 3 MCP servers + the browser bundle.

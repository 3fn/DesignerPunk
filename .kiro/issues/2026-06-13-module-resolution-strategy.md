# Issue: No Unified Module-Resolution Strategy (CJS ↔ ESM boundary churn)

**Discovered**: 2026-06-13
**Discovered During**: Spec 117 (Token-Index Generation Integrity), Task 2 (Finding 2 — CLI config-load)
**Severity**: High — the config-loading instance is **customer-facing**: the documented theme-override workflow breaks (see Bedrock Diagnosis). (Originally filed Medium; raised 2026-06-13 on evidence.)
**Type**: Technical Debt / Build Infrastructure
**Status**: Open — deferred to a dedicated spec (out of scope for 117)

---

## Description

Recurring `.ts` extension / module-resolution failures (and their add-then-remove "fixes") are symptoms of a single root cause: **the project has no unified, enforced module-resolution strategy across runtime entry points.** It mixes CommonJS-style authoring with ESM runtime paths, and the two have incompatible rules about import extensions and directory imports. Every time code crosses a CJS↔ESM boundary, extensionless/directory imports break in one context, get patched, and the patch fights the convention of another context.

This is the same class of problem Spec 117 addresses for token-index drift — point-fixes with no root cause and no guard, accumulating over time — but in the build/module-resolution domain.

## Root Cause

- **`tsconfig.json`**: `"module": "commonjs"` with default (node) resolution → **extensionless imports (`./foo`) and directory imports (`./config`) are correct and idiomatic.** This is the codebase's authoring convention (`tsc` + `tsx/cjs` honor it).
- **But specific runtime paths use strict ESM**, which *requires* explicit extensions and *forbids* directory imports:
  - `loadConfig` (`src/config/ConfigLoader.ts`) loads the config via `await import()` — a dynamic ESM import.
  - `bin/designerpunk.js` registers only `tsx/cjs/api` (hooks `require`), **not** the ESM `import` hook → the config's transitive import chain (`designerpunk.config.ts → ./src/config → ./defineConfig → …`) is resolved by Node's strict native ESM and fails.
  - The published package is an ESM bundle (`dist/browser/*.esm.js`); consumers under `nodenext` resolve strictly.

## Evidence

- **Finding 2 (this spec):** documented `generate`/`validate` CLI fails at config load — directory import `./src/config` rejected by ESM, then `./defineConfig` (extensionless) rejected next. A one-line config edit just moves the error down the chain.
- **Verified root cause:** adding `require('tsx/esm/api').register()` to `bin/designerpunk.js` (alongside the existing CJS register) makes the config-load path resolve extensionless/directory imports identically to the rest of the CLI → `generate` runs end-to-end (exit 0), config edit unnecessary. (Worktree-verified, Spec 117 Task 2.)
- **Prior instances of the same class:** `.kiro/issues/2026-04-08-cli-module-resolution.md` (resolved); `.kiro/issues/2026-06-10-cli-bundle-remove-wildcard-export.md` (referenced in `bin/designerpunk.js`).

## Recommended Holistic Direction (for a dedicated spec — NOT 117)

Anchor fact: **DesignerPunk loads consumer-authored `.ts` configs at runtime**, so on-the-fly TS execution (tsx) at runtime is permanent — "compile everything and drop tsx" cannot fully solve it. Therefore the sustainable path is **consistency, not migration**:

1. **Commit to the existing CommonJS/extensionless authoring convention** (valid, already pervasive). Avoid a mass ESM migration (adding `.js` to every relative import across `src/`) unless there is a *strategic* reason — high churn, low marginal benefit for this architecture.
2. **Make tsx registration complete and uniform at every runtime entry point** (both `require` and `import` hooks) so resolution is identical regardless of CJS/ESM path. (The Spec 117 bin fix is the first instance.)
3. **Add a recurrence guard** — a boot/smoke test that every CLI command actually starts. Would have caught Finding 2 the day it shipped.

Counter-argument (recorded): the ecosystem is moving toward ESM and the published package is already ESM, so a future full-ESM migration may be strategically justified. "Consistency + tsx" is the right pragmatic call *today*; a deliberate ESM migration would be its own spec, not a patch.

## Bedrock Diagnosis — EVIDENCED (2026-06-13, Thurgood)

A controlled 4-config experiment under the broken CJS-only tsx (worktree) isolates the true root and **corrects an earlier "source-repo-only" read — the bug is customer-facing.**

| Config under CJS-only tsx | Result |
|---|---|
| Source style: `import from './src/config'` (relative raw TS) | ❌ fails (extensionless chain) |
| Bare: no imports | ✅ loads |
| Consumer style: `import from <compiled dist/config/index.js>` only | ✅ loads |
| **Consumer (faithful): compiled `defineConfig` + relative `./my-overrides` (theme override)** | **❌ fails** |

**Root cause (the primitive, not the imports):** `loadConfig` (`ConfigLoader.ts:59`) loads user configs with raw `await import()`, which subjects the config **and every relative import inside it** to Node's strict ESM resolution. TypeScript authors — and the integration guide itself — write extensionless/directory relative imports. Strict ESM rejects them. Loading a `.ts` *entry* works; importing *compiled JS* works; **importing relative raw TS fails.**

**Customer-facing, not source-only.** The integration guide instructs consumers to import their own theme overrides relatively (`import { myOverrides } from './themes/my-theme/SemanticOverrides'`). The faithful-consumer experiment proves that documented pattern **fails** under the current CLI.

**Why every prior fix was a surface patch:**
- "Add `.ts` to our config" — fixes only our barrel import; consumers' relative theme imports still break.
- "Register tsx ESM" (Spec 117 Task 2 candidate) — *does* work (tsx's ESM loader resolves relative TS, including the consumer case) but props up the fragile primitive via a global hook rather than fixing the loading mechanism.
- "Bundle the CLI" (June-10 prior art) — **orthogonal**; bundles the CLI's *own* code, does not touch how user configs are loaded.

**Real fix direction:** load configs through a **TS-aware config loader** that resolves relative TS the way it's authored — tsx's programmatic `tsImport` (from `tsx/esm/api`, already a dependency), or a dedicated loader (`jiti` / `bundle-require`). This makes the documented theme-override workflow work, ends the `.ts` churn at its source, and removes the global-tsx-registration fragility. **This is the layer beneath "which import / which registration" — it is the loading primitive.**

**Remaining verification for the dedicated spec:** confirm the chosen loader resolves a consumer's relative raw-TS theme import end-to-end (close the loop that the fix covers the documented workflow).

## Prior Art & Competing Correct-Fix (added 2026-06-13, Thurgood)

**This exact root cause was already diagnosed on 2026-06-10** — see `.kiro/issues/2026-06-10-cli-bundle-remove-wildcard-export.md` ("Node 22's `await import()` uses ESM-style resolution which requires explicit extensions for relative TypeScript imports"). That issue:
- Prescribed a **different "correct fix": bundle the CLI** with esbuild (the pattern the MCP servers already use) → `bin/designerpunk.js` requires `dist/cli/designerpunk.js`; **no tsx runtime, no internal imports at consumer runtime.** Estimated ~1–2h ("the esbuild config already exists for MCP servers").
- Was marked **"Resolved" — but only the workaround was applied** (a `.ts` extension + `__main` + removing the `./src/*` wildcard export). The bundle correct-fix was never implemented.
- **The workaround then regressed:** June-10 set the import to `'./src/config/defineConfig.ts'` (explicit file); the current state is `'./src/config'` (extensionless barrel directory) — reintroducing the ESM failure. **This regression IS Finding 2**, and is concrete evidence of the add/remove `.ts` churn.

**Two competing holistic strategies the dedicated spec must weigh (do NOT pre-decide):**
1. **Keep tsx, make registration consistent** (this issue's original lean) — preserves extensionless authoring; lowest churn.
2. **Bundle the CLI / eliminate tsx-at-runtime** (June-10 prior art; matches the MCP-server pattern) — eliminates the whole CJS↔ESM-at-runtime class for the CLI.

**Unresolved wrinkle for BOTH:** DesignerPunk loads consumer-authored `.ts` configs at runtime (`await import(designerpunk.config.ts)`), which needs runtime TS handling regardless of whether the CLI itself is bundled. Bundling the CLI does not, by itself, solve consumer-config loading. The spec must resolve this.

**Process finding:** an issue marked "Resolved" via workaround, whose correct fix was never done and whose workaround silently regressed — the accumulation pattern at the process level. The dedicated spec should pair the chosen fix with a **boot/smoke guard** so the next regression is loud.

## Scope & Ownership

- **NOT Spec 117** — bolting this on would violate 117's bounded-scope/clean-exit discipline.
- **NOT solely Ada's domain** — repo-wide module resolution is build infrastructure, cross-cutting (token pipeline, components, tests). Likely **Thurgood-led** (governance/infra), with Peter and possibly all three agents.
- **Investigation-first**: the dedicated spec's first task is to **inventory every TS runtime entry point and its resolution mode** (bin, Jest, scripts, MCP servers, bundle, consumer contexts) before deciding. The "widespread vs contained" sizing is currently *unknown* — not yet inventoried.

## Deferral Rationale

- **Why**: cross-cutting build-infra concern beyond 117's token-index scope; requires its own investigation + a strategy decision that isn't Ada's to make alone.
- **Where**: a dedicated module-resolution-strategy spec (Thurgood-led).
- **Impact**: recurring developer friction + silent boot-failures at CJS↔ESM boundaries until addressed; not blocking (workarounds + the 117 bin fix unblock the immediate path).

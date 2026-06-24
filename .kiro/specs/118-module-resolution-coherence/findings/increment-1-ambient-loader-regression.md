# Increment-1 Regression: Approach-A `loadConfig` Breaks Ambient ts-node `.ts` Resolution

**Date**: 2026-06-24
**Status**: OPEN — regression on `main` (landed with Increment 1, `041aaea8`); surfaced by the first real CI run of the consumer-guard. Needs a 118 fix.
**Owner**: Ada (loader) + Thurgood (verification)
**Discovered during**: Spec 117 close-out / first push to `main` — the consumer-guard CI went red; verifying the fix uncovered this.

---

## Two independent issues surfaced (both 118-lane)

### (A) Consumer-guard packs without building → ships no compiled `dist/`

`tests/consumer-integration.test.ts` does `npm pack` with **no build step** (no `prepack`/`prepare`; the build only runs via `prepublishOnly` on `npm publish`, NOT on `npm pack`). `dist/` is gitignored. So in clean CI the tarball lacks `dist/config/index.js` (and other compiled outputs), and the consumer's `generate` fails: `Cannot find module '.../@3fn/core/dist/config/index.js'`.

- **Why it "passed" before:** the consumer-guard lane triggers only on push/PR to `main`; the 118 branch was never pushed/PR'd, so it had only ever run **locally**, where a stale `dist/` (built 2026-06-12) masked the gap.
- **This is independent of (B)** — it's purely a build-before-pack ordering gap in the lane. The consumer path uses the bin/tsx route (Approach A works there — the Task-3.1 faithful-config tests pass).
- **Fix options:** add a build step to `consumer-guard.yml` before `npm run test:consumer`, OR add `"prepack": "npm run build"` so `npm pack` matches `npm publish` (more faithful — the guard's whole point). **Blocked by (B):** any `npm run build` currently dies in prebuild (see below).

### (B) Approach-A `loadConfig` tears down the ambient ts-node loader (the regression)

`npm run build` dies in **`prebuild`** → `scripts/generate-platform-tokens.ts`:
```
❌ Error: Token source not found at: .../src/tokens
   Expected a barrel file (index.ts) exporting getAllPrimitiveTokens().
   at verifyBarrelContract (src/cli/resolveTokens.ts:51)
```
`src/tokens/index.ts` **does** export `getAllPrimitiveTokens` (line 293, unchanged since Spec 103). The real failure is a `require('.ts')` breaking **after** `loadConfig` runs.

**Minimal repro (decisive):**
```
# works:
npx ts-node -e "require('./src/tokens'); console.log('OK')"            → OK
# fails:
npx ts-node -e "(async()=>{const {loadConfig}=require('./src/config/ConfigLoader'); \
  await loadConfig(process.cwd()); require('./src/tokens')})()"        → Cannot find module './src/tokens'
```

**Mechanism:** Approach A (`defaultConfigModuleLoader`, `ConfigLoader.ts`) does `tsx/cjs/api` `register({namespace})` → scoped `require` → `unregister()` in `finally`. Its own doc: *"`register()` mutates `module._resolveFilename`/`module._extensions` **process-globally**; `unregister()` restores global state."* The closeout note states Approach A **"assumes no ambient loader."** But `generate-platform-tokens.ts` runs under **ts-node** (an ambient loader IS present). The register/unregister cycle does not restore ts-node's `.ts` hooks, so subsequent `require('.ts')` fails.

**Blast radius:** among `scripts/**`, only `generate-platform-tokens.ts` calls `loadConfig` → so the build-path damage is localized there (but it's in `prebuild`, so it breaks all of `npm run build`). The general risk surface is **any ts-node-hosted script that calls `loadConfig` then resolves `.ts`** — i.e. the "11 ts-node scripts" Increment 3a targets. The **bin/tsx path is NOT affected** (Approach A is designed for it; the documented CLI + the Task-3.1 guards pass).

**Why undetected in Increment 1:** Increment 1 verified the documented-CLI **config-load** path (bin/tsx). It did not run `npm run build` (which exercises the ts-node config-load path), and no publish happened. The faithful-consumer guard passed because it uses bin/tsx. So the ts-node-hosted `loadConfig` callers were never exercised.

## Recommended fix (interim, principled — uses 118's own seam)

118 added an injectable loader seam to `loadConfig` for exactly the "ambient loader already present" case (its doc: *"in-process jest tests inject a jest-compatible loader, e.g. `(p) => import(p)`"*). The ts-node build scripts are the same case. So:

```ts
// scripts/generate-platform-tokens.ts (and any ts-node script that loadConfig→require('.ts'))
const config = await loadConfig(process.cwd(), (p) => import(p));  // use the ambient ts-node loader
```

This avoids Approach A's global register/unregister in the ts-node context. It is aligned with **Increment 3a** (runtime-mechanism unification), which retires the ts-node/tsx split structurally — the seam injection is the correct interim until then.

## Input for Increment 2 (R4 entry-point inventory)

This is concrete evidence that **Approach A's "no ambient loader" assumption is already violated by the existing ts-node scripts.** Increment 2's entry-point inventory (Task 7.3) should explicitly sweep **`loadConfig`-callers running under ts-node** as a defect class, and the divergence/evidence work should record this regression as a confirmed real instance (not just a hypothesis).

## Current state

`main` is red on the consumer-guard lane until both (A) and (B) are fixed. The lane is not yet a required branch-protection check, so it does not block pushes — but it should be greened before it's made required.

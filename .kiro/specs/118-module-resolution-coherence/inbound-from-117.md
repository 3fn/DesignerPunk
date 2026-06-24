# Inbound from Spec 117 (Token-Index Generation Integrity) — for Spec 118

**Date**: 2026-06-24
**Status**: 117 complete & certified non-provisionally; on `main`. **Ada should read this before starting Increment 2.**

117 hands 118 **Increment 2** one substantive update and a few reuse confirmations.

## 1. The divergence hypothesis (Task 7.4) is largely pre-answered — likely a clean "refuted" exit

I2's hypothesis tests whether `token-index-generation-gaps` and `blendutilities-not-generated` **correlate with module-resolution divergence**. 117 root-caused both, and **neither is resolution-caused** — so 117 is the documented routing finding that lets the hypothesis exit cleanly (R4 AC7 "disproven"), not something to re-investigate:

- **`token-index-generation-gaps` — RESOLVED by 117** (issue now marked resolved). Causes were all **generation-logic**: an orphaned `getOklchMetadata` (OKLCH path existed but was never wired into the index), a second/divergent theme-varying computation, and `tokenSourceMode`-gated component loading. None touch CJS/ESM resolution.
- **`blendutilities-not-generated` (N1)** — the `BlendUtilityGenerator` write path is **dormant/never-wired** (`generateAllWithBlendUtilities` is never called by the pipeline). A wiring gap, not resolution. **Use the superseding issue for the disposition**, not the thin N1 note: `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md` (which also surfaced an orphaned `OklchBlendCalculator` / RGB-vs-OKLCH gap — same orphaned-OKLCH-path pattern as 117's own findings).

Net: I2 should be able to disposition both as **plausible-contributor: refuted**, citing 117, rather than escalating to root-cause.

## 2. Engine reuse — confirmed still valid

117's Task 5 only *added* `src/tools/integrity/Invariants.ts` (absolute P3/P5 invariants). It did **not** change `Normalizer.normalize` / `SemanticComparator.compare` / `inventory.ts` — your planned reuse stands. New options if useful: `Invariants.ts` gives a pattern for *absolute* invariants (caught defects the committed-vs-fresh re-diff is blind to — exactly how 117's rgba-in-both Finding 1 hid); and `run-audit.ts` was upgraded with provenance + a trust-gate verdict (you reuse the primitives directly, so this doesn't affect you).

## 3. Artifact state changed (if your two-fresh-tree parity reads the token-index)

117 corrected the committed token-index: primitives now carry mode-aware **OKLCH** (rgba 216→16, the 16 being the un-migrated shadow family), `semantics.yaml` `themeVarying` is the base-scoped **5** keys, and `components.yaml` is **33** (6 recovered). Your parity is two-*fresh*-tree (ts-node vs tsx), so committed state is less central — but the artifact *shape* is now OKLCH/mode-aware.

## 3b. ⚠ Increment-1 regression on `main` — fix before/with Increment 2

Surfaced when 117's close-out push triggered the **first real CI run** of the consumer-guard: Approach-A `loadConfig` **tears down the ambient ts-node loader**, so `npm run build` dies in `prebuild` (`generate-platform-tokens.ts` → `require('src/tokens')` fails right after `loadConfig`). Decisive repro + mechanism + recommended fix (inject the ambient seam `loadConfig(cwd, (p) => import(p))` in the ts-node scripts) in **[`findings/increment-1-ambient-loader-regression.md`](findings/increment-1-ambient-loader-regression.md)**. It is concrete evidence that Approach A's "no ambient loader" assumption is already violated by the existing ts-node scripts — **Increment 2's entry-point inventory should sweep `loadConfig`-callers-under-ts-node as a defect class.** (Companion gap in the same doc: the consumer-guard packs without building.)

## 4. Cross-spec tie (reaffirm)

117's restored trust is **config-load-path-only** until **118 Increment 3b** reconciles the raw-`.ts` exports (`./blend`/`./build`/`./types`). That tie survives 117's certification — your Increment 3b is what finally certifies 117's exports surface.

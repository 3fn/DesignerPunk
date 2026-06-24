# Task 3 Completion: Token-Index OKLCH Color + Theme-Varying — Merged Spine Fix (R3 + R5)

**Date**: 2026-06-24
**Task**: 3. Token-Index OKLCH Color + Theme-Varying — MERGED Spine Fix (R3 + R5) (Parent)
**Type**: Parent / Architecture
**Validation**: Tier 3 — Comprehensive
**Agent**: Ada (implementation) · main-loop verification (Claude)
**Status**: Complete — verified; pending commit

---

## Summary

Implemented the merged R3+R5 spine fix as a **single shared mode-resolution source** (ratified **Option B**). `generateTokenFiles` now returns a `ModeResolvedTokens` object that the token-index generator consumes, so the index reads the **same resolved truth that dist writes** — eliminating the prior three-way drift between dist, the index's collapsed primitive values, and a separate theme-varying computation.

- **R3** — color primitives in the token-index now carry mode-aware OKLCH (resolved value + `{hue, lightness, chroma}` channels) consistent with `dist/DesignTokens.web.css`. Residual `rgba(` dropped 216 → 16 (the 16 are the un-migrated shadow family — see Scope note).
- **R5** — semantic `themeVarying` flags now reproduce the **dist base-mode set** (the 5 dark-override keys), not committed's stale 10.

## Architecture: Option B (single shared source)

The ratified mechanics design (`findings/task-3-mechanics.md`) plus its §4.1 correction (from the live experiment) drove the implementation:

1. **New shared type** `src/generators/ModeResolvedTokens.ts` — resolved light/dark sets, a **base-scoped** theme-varying set, and a per-primitive OKLCH map. Its doc-comment carries the anti-conflation warning (the returned theme-varying set is deliberately distinct from the registry-wide internal Set).
2. **`generateTokenFiles` signature `void` → `ModeResolvedTokens`** (`src/generators/generateTokenFiles.ts`). It computes, in addition to its existing internal registry-wide `themeVaryingTokens` (10 keys; still fed to the non-web generators), a separate `baseThemeVaryingTokens` (seeded **empty**, populated only from the base light-vs-dark resolved-value diff = the 5 dark-override keys) and a `primitiveOklch` map (via the now-wired `getOklchMetadata` over `composedColorMap`). Early-abort/validation paths return `EMPTY_MODE_RESOLVED`.
3. **`generateTokenIndex` consumes `modeResolved`** (`src/generators/generateTokenIndex.ts`) — color primitives emit the mode-nested OKLCH `value` + sibling `oklch` channels; the semantic `themeVarying` flag reads the base-scoped set.
4. **`runGenerate` threads the shared source** (`src/cli/designerpunk.ts`); the separate `computeThemeVaryingTokens` call is removed.
5. **`src/cli/themeVarying.ts` (+ its test) deleted** — dead once the index sources theme-varying from dist's shared computation. The old `rgba(`-guard concern does not transfer (dist/index compare resolved *values*, not names).

**Dist output is provably unchanged:** the refactor only *adds* return values; `generator.generateAll({...})` still receives the same registry-wide `themeVaryingTokens` local. (Confirmed: 0 non-timestamp diffs across `DesignTokens.{web.css,ios.swift,android.kt}`.)

## Why two theme-varying sets coexist (the load-bearing subtlety)

The live experiment (mechanics doc §4.1) established that the in-memory registry-wide Set is **exactly committed's stale 10** — because `ThemeRegistry.getThemeVaryingTokens()` unions override keys across **all** registered themes (dark *and* wcag), and the web base `:root` block does **not** consume that Set (it emits `light-dark()` from a resolved-value diff). So the index must use a **base-scoped** set (5 keys) distinct from the registry-wide Set (10, still needed by non-web generators). Merging them would re-introduce the R5 over-marking. The two sets are kept distinct and doc-commented; an automated guard is recommended as a Task 5 follow-up.

## Verification (independently re-run in main loop)

- **R3**: `grep -c "rgba(" token-index/primitives.yaml` → 16 (was 216). The 16 = 4 shadow primitives × 4 mode/theme slots. Sample (`white100`): `value.{light,dark}.{base,wcag}: oklch(1 0 260)` + channels. Spot-checked index OKLCH == dist CSS (white100, gray400, pink300, cyan300 — identical).
- **R5**: `themeVarying: true` in `semantics.yaml` = exactly `{color.action.navigation, color.background.primary.subtle, color.icon.navigation.inactive, color.structure.border.subtle, color.structure.canvas}` — the 5 dark-override keys; the 5 WCAG-only over-marks are absent.
- **Dist parity**: 0 non-timestamp diffs across all three platform files.
- **Full suite**: `npm test` → **371 suites / 8955 tests passed**; `npx tsc --noEmit` → clean. (Both re-run independently of the implementing agent.)
- Artifacts were regenerated via the **documented CLI** (`node bin/designerpunk.js generate`) — the path Spec 118 Increment 1 unblocked — a positive early signal for Task 5.3's trust gate.

## Scope note — shadow color family (R3 "no rgba" criterion, scoped)

The 16 residual `rgba(` are the shadow color family (`shadowBlack/Blue/Orange/Gray100`), which the OKLCH migration (Spec 112) never covered — no OKLCH channel tokens, absent from `composedColorMap`, and emitted as rgba by dist itself. The index emitting them as rgba is faithful reproduction of dist, **not a divergence**. R3's "no rgba" criterion is therefore scoped to **OKLCH-migrated** color primitives; the shadow gap is logged as `.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md` (token-foundation follow-on, requires Peter's token review). It is **not** entered in the `IntentionalDivergenceManifest`.

## Out-of-scope condition surfaced (routed, not fixed)

Running `generate` under the shipped **package-mode** config zeroes `components.yaml` because `loadComponentTokens` is gated on `tokenSourceMode === 'local'`. This is exactly **R4 / Task 4** of this spec (it empirically confirms Task 4's premise). The committed 27-token `components.yaml` was restored so Task 3 does not regress it; the gate fix is Task 4.

## Files Changed

| File | Change |
|------|--------|
| `src/generators/ModeResolvedTokens.ts` | **New** — shared mode-resolved interface (+ anti-conflation doc-comment) |
| `src/generators/generateTokenFiles.ts` | Returns `ModeResolvedTokens`; builds base-scoped set + OKLCH map; dist-feeding path untouched |
| `src/generators/generateTokenIndex.ts` | Consumes `modeResolved`; emits mode-aware OKLCH + base-scoped `themeVarying` |
| `src/cli/designerpunk.ts` | `runGenerate` threads the shared source; drops `computeThemeVaryingTokens` |
| `src/cli/themeVarying.ts` + test | **Deleted** (dead) |
| `token-index/primitives.yaml` | Regenerated — OKLCH color primitives (216→16 rgba) |
| `token-index/semantics.yaml` | Regenerated — base-scoped `themeVarying` (5 keys) |
| Several `__tests__` (cli, generators, build/product) + `visualization.yaml` fixture | Updated to the new call shape; re-pointed stale-10 assertions to genuinely mode-varying tokens |

## Requirements Satisfied

- **R3** (AC1–AC4): OKLCH in token-index, no rgba (scoped to OKLCH-migrated primitives), routes through the intended OKLCH source (`getOklchMetadata` wired), mode-aware `value` shape per the `get_token_details` contract.
- **R5** (AC1–AC4): theme-varying = base light/dark diff, independent of `config.themes`, reproduces dist's base set; satisfied from the single shared fix (per the guiding principle — fix the spine, both readouts verified).

## Follow-ups (logged, not done here)

1. Shadow OKLCH migration — `.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md`.
2. Automated anti-conflation guard for the two theme-varying sets — Task 5 harness assertion.
3. R3 harness assertion (Task 5.1) must scope "no rgba" to `composedColorMap`-backed primitives.
4. Package-mode `components.yaml` emptying — **Task 4** (R4).

# @3fn/core Bug — product-token web generator drops units for `rem`/`em`

**Date**: 2026-06-12
**Reporter**: Sparky (web platform)
**Status**: ✅ Resolved — shipped in v12.0.5 (2026-06-12). See Resolution below.
**Versions**: confirmed broken on 12.0.4. NOTE: not actually a regression — product token generation is net-new in v12 (Specs 108/109) and did not exist in 11.8.0, so there is no working baseline to regress from. See Resolution.
**Severity**: High — emits invalid CSS for any product token using relative units; breaks live consumers
**Scope**: PRODUCT token web generator only. The SYSTEM token generator is unaffected.

---

## Resolution

**Shipped in v12.0.5** (2026-06-12). Fixed by adding `rem`/`em` cases to the product web emitter's
`formatCSSValue` (`src/build/product/emitters/WebEmitter.ts`), mirroring the system emitter.
Regression fixtures added in `WebEmitter.test.ts` (hero `rem`, fractional `rem`, `em` letter-spacing)
so the suffix cannot silently drop again. Fix commit `046fff3d`; tag `v12.0.5`.

**Correction to the original framing**: this was NOT a regression. Product token generation is
net-new in v12 (Specs 108 + 109); at the `v11.8.0` tag there is no product token generator, emitter,
or `--product-*` output. The `8rem` baseline the report attributes to 11.8.0 could not have come from
the product generator (it didn't exist) — it came from elsewhere (hand-authored CSS, or the system
typography tokens, which emit `rem` correctly). This was a v12-new feature that shipped with
incomplete `rem`/`em` handling from day one. (The "Pre-v12 (11.8.0)" column in the table below and the
"generator regression" note under Localization reflect the original — mistaken — premise; left intact
for the record.)

**Deeper finding (also fixed)**: the reason prior fixes appeared not to "stick" was a version-control
gap — an over-broad `build/` pattern in `.gitignore` was excluding the entire `src/build/`
product-token pipeline source (generator, emitters, `defineComponentTokens` helper) from the
repository. Earlier fixes were applied to disk but silently never committed (`git add` skips ignored
files). As a result v12.0.0–12.0.4 were published from working-tree state not in git, and the
committed tree was not buildable from a clean checkout. Resolved by anchoring the pattern to `/build/`
and committing the 26 recovered source files (commit `d8eb8501`); a clean-checkout build was verified.

## Deferred Follow-Up (separate from the resolved bug above)

**Native unit conversion for product `rem`/`em` — NOT urgent, NOT blocking.** The product pipeline's
native emitters (Swift/Kotlin) do not yet handle `rem`/`em`; they fall through to a bare number.
Approved direction (Peter, 2026-06-12): align the product emitters with the system's existing
cross-platform conversion rather than walling `rem`/`em` off from native — `em` → `em` on iOS/Android
(matches system letter-spacing), `rem` → native equivalent (pt/sp).

**Open sub-question for whoever implements it**: converting product `rem` to native bakes in a 16px
root, losing the user's Dynamic Type / `sp` font-scaling accessibility behavior. Resolve this tradeoff
before building the `rem → native` half. The `em → em` half is a clean, no-tradeoff change.
Owner: Ada (product token pipeline).

---

## Summary

In v12, the product-token web generator emits `unitType: rem` and `unitType: em` values **without
their unit suffix** — the raw number only. Pre-v12 the same tokens emitted with units. Any consumer
using these in a unit-requiring property (`font-size`, `letter-spacing`, etc.) gets an invalid,
unitless declaration that the browser drops.

## Expected vs actual

| Source (`product/tokens/typography.yaml`) | Pre-v12 (11.8.0) | v12.0.x (actual) | Expected |
|---|---|---|---|
| `statsHeroSize: { value: 8, unitType: rem }` | `--product-typography-stats-hero-size: 8rem` | `…: 8` | `…: 8rem` |
| `easterEggDisplay: { value: 4.5, unitType: rem }` | `…: 4.5rem` | `…: 4.5` | `…: 4.5rem` |
| `letterSpacingLabel: { value: 0.04, unitType: em }` | `…: 0.04em` | `…: 0.04` | `…: 0.04em` |

## Consumer impact

`font-size: var(--product-typography-stats-hero-size)` → resolves to `font-size: 8` → invalid →
declaration dropped → element renders at inherited/default size. Observed live on designerpunk.ai:
hero stat numbers, easter-egg display type, and label letter-spacing all render wrong.

## Localization (why this is the product generator, not authoring)

- The **system** generator emits relative units correctly: `dist/tokens/DesignTokens.web.css` has
  `--font-size-050: 0.8125rem`, `--font-size-100: 1rem`. (Its web converter explicitly returns
  `{ value, unit: "rem" }` for typography and `"px"` otherwise.)
- The **product** generator (`dist/tokens/product/ProductTokens.web.css`) emits the same families
  unitless.
- `unitType: logical` product tokens emit correctly **with** units (e.g. `--product-layout-content-max-width: 1336px`).
- The token YAML is unchanged and valid; identical authoring produced units before v12. So this is
  a generator regression specific to relative units (`rem`/`em`) in the **product web emitter**.

## Reproduction

1. Author a product token with `unitType: rem` (e.g. `statsHeroSize: { value: 8, unitType: rem }`).
2. `npx designerpunk generate`.
3. Inspect `dist/tokens/product/ProductTokens.web.css` → value emits as `8`, not `8rem`.

## Suggested fix (per Ada)

Add `rem`/`em` cases to the product web emitter's `formatCSSValue` (mirroring the system emitter):
`case 'rem': return `${value}rem``, `case 'em': return `${value}em``. Add rem/em regression-test
fixtures so the suffix can't silently drop again. Ship as a 12.0.5 patch. Preferred over consumer-side
`calc(var(--…) * 1rem)` workarounds, which spread per-property and must be reverted.

## Consumer-side status (dp-portfolio)

Not worked around yet — holding for the core patch per Ada's recommendation. Interim stopgap (only if
a release isn't fast): re-author affected product tokens as `unitType: logical` (→ px), which loses
`rem`/`em` scaling and has no valid equivalent for `em` letter-spacing — so it only half-covers.

## Related

Surfaced alongside a separate, still-open v12 token-removal investigation (distinct root cause:
generator unit handling vs. token removal). That investigation is tracked internally and remains
unresolved; it is intentionally not linked here.

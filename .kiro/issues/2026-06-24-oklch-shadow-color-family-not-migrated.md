# Shadow Color Family Was Never Migrated to OKLCH

**Date**: 2026-06-24
**Discovered during**: Spec 117 Task 3 (R3 OKLCH-in-token-index spine fix) — the only color primitives that could not be emitted as OKLCH
**Reporters**: Ada (Rosetta implementation), verified in main loop (Claude)
**Severity**: Low — pre-existing, internally consistent (index matches dist); not a regression and not a divergence
**Type**: Token foundation / incomplete migration (Spec 112 follow-on)
**Primary owner**: Ada (Rosetta tokens) — **requires Peter's token-creation review**
**Status**: Open — deferred (out of scope for Spec 117, which is token-index *integrity*, not token-foundation migration)

---

## Summary

The OKLCH migration (Spec 112) converted the chromatic and neutral color families to the OKLCH channel model (`composedColorMap`: hue/lightness/chroma channels → composed `ComposedColor` with a resolved `Oklch`). The **shadow color family** (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`) was **never included** — it remains defined as raw rgba in `src/tokens/ColorTokens.ts:1835` (`shadowColorTokens`), with no OKLCH channel tokens and no entry in `composedColorMap`.

During Spec 117 Task 3, the token-index OKLCH spine fix correctly emits OKLCH for every color primitive that *has* an OKLCH source. The 4 shadow primitives have none, so the index emits them as rgba — **exactly as `dist/DesignTokens.web.css` does** (dist resolves shadow colors via `var(--shadow-black-100)` etc., which are rgba; there is zero `oklch()` on any shadow line in dist). Index and dist therefore **agree**; this is faithful reproduction, **not** a generation divergence.

## Why this is NOT a Spec 117 "intentional divergence"

It was explicitly considered and rejected as a manifest divergence entry. A divergence would mean the index disagrees with dist — but here they agree (both rgba for shadows). The gap is *upstream* of the generation path: the OKLCH foundation simply does not cover the shadow family yet. Recording it as an integrity exception would mislabel an incomplete migration as an accepted output difference.

## Evidence

- `src/tokens/ColorTokens.ts:1835` — `shadowColorTokens`: 4 primitives, all rgba (e.g. `shadowBlue100` = `rgba(20, 25, 40, 1)` across light/dark × base/wcag), commented "mode-agnostic (always dark)."
- No `shadowHue` / `shadowLightness` / `shadowChroma` channel tokens exist under `src/tokens/color/channels/`.
- `composedColorMap` (`src/tokens/color/index.ts`) = chromatic ∪ neutral only; shadows absent.
- `dist/DesignTokens.web.css` — no `oklch()` on any shadow line; shadow tokens resolve through rgba primitive refs.
- Result in `token-index/primitives.yaml` after Task 3: 16 residual `rgba(` = 4 shadow primitives × {light.base, light.wcag, dark.base, dark.wcag}; every other color primitive is clean OKLCH (rgba count 216 → 16).

## Why Out of Scope for 117

Spec 117 is **token-index integrity** — making the index reproduce dist. The index already reproduces dist for shadows (both rgba). Migrating shadows to OKLCH is **token-foundation work**, not integrity work, and the only *correct* version is cross-cutting:

1. Design shadow **channel tokens** (hue/lightness/chroma) — new token creation (Ada + **Peter's review**).
2. Add composed shadow colors to `composedColorMap`; convert the 4 rgba values to OKLCH.
3. Update **dist** emission across web / iOS / Android shadow generators (`src/build/platforms/{Web,IOS,Android}ShadowGenerator.ts`).

The tempting shortcut — convert the 4 rgba to `oklch()` in the **index only** — is actively wrong: it would make the index diverge from dist (rgba), the exact failure mode Spec 117 exists to prevent. There is no cheap correct version; doing it inside 117 would create tokens and change dist output inside a spec meant to reconcile them.

## Recommended Disposition (for routing)

Complete the OKLCH migration for the shadow family as a **Spec 112 follow-on** (or a dedicated small spec):
1. Decide the canonical OKLCH channel values for the 4 shadow colors (convert from the existing rgba; preserve the "warm light → cool shadows" art-theory intent documented at `ColorTokens.ts:1828`).
2. Introduce shadow channel tokens + composed shadow colors; add to `composedColorMap`.
3. Update the three platform shadow generators so dist emits OKLCH consistently.
4. Re-run Spec 117's `GenerationIntegrityCheck` to confirm index still matches dist (now both OKLCH) — at which point the residual-16 rgba goes to zero with no divergence introduced.

## Cross-References

- Spec 117 Task 3 mechanics: `.kiro/specs/117-token-index-generation-integrity/findings/task-3-mechanics.md`
- Spec 117 Task 3 completion: `.kiro/specs/117-token-index-generation-integrity/completion/task-3-completion.md`
- Originating migration: Spec 112 (OKLCH migration) — chromatic + neutral only
- R3 criterion scoping: Spec 117 R3 "no rgba" is scoped to OKLCH-migrated color primitives; shadows tracked here (not in the `IntentionalDivergenceManifest`).

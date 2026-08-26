# Dual Color Source Divergence: DTCG/Figma Export Emits Different Colors Than CSS/Swift/Kotlin

**Date**: August 25, 2026
**Discovered By**: Ada, while settling the "Open question for Ada" in `.kiro/issues/2026-08-19-token-quick-reference-mode-resolution-stale.md`
**Spec**: None yet — spun out of the Token-Quick-Reference doc fix (`fix/token-quick-reference-mode-resolution`)
**Status**: Proposed — diagnosed with evidence, no pipeline code changed
**Priority**: High for design/code parity; **not** a build breakage — all platforms build and are internally self-consistent
**Impact**: Figma / Tokens Studio / Style Dictionary consumers of `dist/DesignTokens.dtcg.json` and `dist/DesignTokens.figma.json`
**Assigned To**: Ada (token pipeline) — needs Peter's routing decision on scope

---

## Summary

Two color sources are live. They are **not** in agreement, and each drives a different set of emitted
artifacts:

| Source | Shape | Drives |
|---|---|---|
| `src/tokens/color/` (OKLCH, Spec 112) | one `{ l, c, h }` per primitive, no mode/theme dimension | **CSS / Swift / Kotlin** (via `SemanticValueResolver`) |
| `src/tokens/ColorTokens.ts` (legacy, `@deprecated` Spec 115) | `light/dark × base/wcag` RGBA matrix | **DTCG / Figma primitive export**; the four shadow primitives on all platforms |

**19 of the 50 primitives present in both sources differ by more than 0.05 OKLCH lightness.** The worst
cases differ by >0.2 L — visibly different colors, not rounding.

## How the split arises (mechanism)

`SemanticValueResolver.resolveColorPrimitive()` (`src/resolvers/SemanticValueResolver.ts:24-41`) checks
`composedColorMap` **first** and returns early:

```typescript
const composed = composedColorMap.get(name);
if (composed) {
  const { l, c, h } = composed.resolved;
  return `oklch(${l} ${c} ${h})`;      // mode and theme arguments are IGNORED
}
// Legacy fallback: old ColorTokens.ts RGBA path
```

So for all 50 OKLCH primitives the legacy file's values — including its whole `light/dark` and
`base/wcag` matrix — are never read on the platform path. Only `shadowBlack100`, `shadowBlue100`,
`shadowOrange100`, `shadowGray100` (legacy-only, absent from `composedColorMap`) reach the legacy branch.

`DTCGFormatGenerator` does not use that resolver for primitives. `resolveColorValue()`
(`src/generators/DTCGFormatGenerator.ts:1240-1248`) reads `colorVal.light.base` straight off the legacy
token. Primitive DTCG output is therefore legacy RGBA.

## Evidence

### Divergent primitives (worst 8 of 19 over the 0.05 L threshold)

Legacy `light.base` converted to OKLCH (sRGB → OKLab → OKLCH) vs. the OKLCH source of record:

| Primitive | Legacy RGBA (→ DTCG/Figma) | Legacy as OKLCH | OKLCH source (→ CSS/Swift/Kotlin) | ΔL |
|---|---|---|---|---|
| `green400` | `rgba(0, 255, 136, 1)` | `oklch(0.876 0.228 152.5)` | `oklch(0.66 0.18 154)` | 0.216 |
| `gray300` | `rgba(38, 50, 58, 1)` | `oklch(0.310 0.022 237.6)` | `oklch(0.52 0.02 260)` | 0.210 |
| `green500` | `rgba(0, 204, 110, 1)` | `oklch(0.741 0.190 153.1)` | `oklch(0.54 0.14 154)` | 0.201 |
| `gray400` | `rgba(24, 34, 40, 1)` | `oklch(0.245 0.018 234.8)` | `oklch(0.42 0.018 260)` | 0.175 |
| `yellow300` | `rgba(249, 240, 2, 1)` | `oklch(0.932 0.200 106.9)` | `oklch(0.8 0.2 107)` | 0.132 |
| `gray500` | `rgba(16, 22, 26, 1)` | `oklch(0.196 0.012 237.4)` | `oklch(0.32 0.015 260)` | 0.124 |
| `white500` | `rgba(153, 153, 171, 1)` | `oklch(0.689 0.026 285.7)` | `oklch(0.8 0.015 260)` | 0.111 |
| `teal300` | `rgba(26, 83, 92, 1)` | `oklch(0.410 0.059 209.8)` | `oklch(0.52 0.08 209)` | 0.110 |

The whole gray ramp diverges. Note the hue drift too: legacy neutrals sit near h≈237, the OKLCH neutrals
are pinned to h=260.

### A single DTCG token that contradicts itself

`dist/DesignTokens.dtcg.json`, `semanticColor.color.icon.navigation.inactive`:

```json
"$value": "{color.gray300}",
"$extensions": { "designerpunk": { "modes": {
  "light": "oklch(0.52 0.02 260)",
  "dark":  "oklch(0.72 0.018 260)"
}}}
```

`$value` aliases the DTCG primitive `color.gray300`, which is emitted as `rgba(38, 50, 58, 1)`
(≈ `oklch(0.31 ...)`). The `modes.light` extension says `oklch(0.52 0.02 260)`. **The same token carries
two different light-mode colors in one file.** The extensions block is right (it routes through
`resolveSemanticTokenValue`, the same resolver CSS uses at
`DTCGFormatGenerator.ts:577-579`); the `$value` alias chain is wrong.

A standards-conformant DTCG consumer follows `$value`. Figma therefore gets the stale color.

### Dead code confirming the doc defect

`DTCGFormatGenerator.ts:588-596` branches on `colorVal.light.base !== colorVal.dark.base` to emit Level 1
mode metadata. **Zero of the 54 legacy primitives satisfy that predicate** — every one has
`light.base === dark.base`. The branch has never fired. This is the same false "primitives carry
light/dark values" model that produced the Token-Quick-Reference defect.

### Also inert: the primitive-tier `base`/`wcag` split

22 legacy primitives have `base !== wcag` (`black100`, `black200`, and the yellow/orange/pink/green
ramps, plus `teal300`). Because `resolveColorPrimitive` ignores its `theme` argument on the OKLCH path,
none of that reaches CSS/Swift/Kotlin. WCAG theming in shipped output comes **entirely** from
`src/tokens/themes/wcag/SemanticOverrides.ts` role remapping. The legacy primitive-tier WCAG values are
dead data that reads as live.

## Impact

- **Design/code parity is broken for Figma consumers** on the gray ramp and several chromatic steps. A
  designer picking `gray300` in Figma gets a near-black; the built product renders a mid-gray.
- **The DTCG file is internally inconsistent** — `$value` and `$extensions.designerpunk.modes` disagree on
  every semantic token whose primitive is in the divergent 19.
- **Not a runtime bug.** CSS/Swift/Kotlin are consistent with each other and with the OKLCH source. No
  platform renders the legacy values except via the four shadow primitives (which agree with themselves).
- **Governance risk**: the legacy file's live-looking mode and theme matrices are the documented root
  cause of at least three stale governance claims (Token-Quick-Reference, Rosetta-System-Architecture
  Stage 4, Component-Development-Guide step 8 — all corrected on `fix/token-quick-reference-mode-resolution`).

## Proposed resolution (needs Peter's decision — do not treat as settled)

**Option A — point DTCG at the OKLCH source (recommended).** Change
`DTCGFormatGenerator.resolveColorValue()` to read `composedColorMap` first, mirroring
`SemanticValueResolver.resolveColorPrimitive()`. Removes the divergence at the root and makes `$value`
agree with the modes extension. Deletes the dead Level 1 branch at `:588-596`.

*Counter-argument*: DTCG/Figma consumers may not handle `oklch()` — Figma's variable model historically
wants RGB(A). If so, the fix is to convert the OKLCH source to RGBA at the DTCG boundary rather than to
keep a second set of values. That is more code than Option A but keeps one source of truth. **This needs
verification against the actual Figma import path before choosing** — I have not tested it.

**Option B — finish the Spec 115 Phase B deletion.** Migrate the four shadow primitives to OKLCH, repoint
DTCG, delete `ColorTokens.ts`. Larger, but ends the class of defect rather than this instance. The file's
own header says Phase B will remove it.

**Option C — do nothing, document the split.** Cheapest. Leaves a live design/code parity break and a
self-contradicting export file. I do not recommend it, but it is a legitimate call if Figma export is not
currently consumed by anyone — **someone should confirm whether it is** before A or B gets scheduled.

Whichever is chosen, the DTCG/Figma output should get a regression test asserting a primitive's `$value`
matches the CSS emission for the same primitive. No such test exists today, which is why this drifted
silently.

## Evidence paths

- `src/resolvers/SemanticValueResolver.ts:24-41` (OKLCH-first early return; mode/theme ignored)
- `src/generators/DTCGFormatGenerator.ts:1240-1248` (legacy `light.base` for primitives)
- `src/generators/DTCGFormatGenerator.ts:573-598` (Level 2 correct; Level 1 branch dead)
- `src/generators/generateTokenFiles.ts:210-220` (already states "the OKLCH model has no primitive-tier mode variance")
- `src/tokens/ColorTokens.ts:1-11` (`@deprecated`, Spec 115 Phase B removal note)
- `src/tokens/color/primitives/chromatic.ts`, `src/tokens/color/channels/**` (OKLCH source of record)
- `dist/DesignTokens.dtcg.json` (`color.gray300`, `semanticColor.color.icon.navigation.inactive`)
- `dist/DesignTokens.web.css:527`, `:559` (CSS emissions)

## Decision needed

1. Is `dist/DesignTokens.figma.json` / `dist/DesignTokens.dtcg.json` actually consumed today? (Determines priority.)
2. Option A, B, or C — and whether it warrants a spec or runs issue-driven.

---

## Decision Question #1 ANSWERED (2026-08-25, Peter-prompted check)

**The export HAS a live consumer, and the divergence reaches it.** Peter's recollection confirmed: the DTCG/Figma export exists to connect tokens to canvas-based design tooling via **`figma-console-mcp`** (^1.10.1, a package.json dependency).

**The consumption chain, verified**: `npm run figma:push` (`src/cli/figma-push.ts`, Spec 054a) loads `dist/DesignTokens.dtcg.json` → transforms → `dist/DesignTokens.figma.json` → syncs Figma variables via figma-console-mcp. Spec 054b (design extract) reads back through the same MCP. The push tooling has been exercised in anger (054a known-issues ledger + March 2026 issue trail: duplicate collections, variable-binding gaps).

**Confirmed live impact example**: the pushed artifact carries `color/gray/300 = #26323A` in ALL THREE modes (light/dark/wcag) — the legacy RGBA value — while shipped platforms render gray300 at `oklch(0.52 0.02 260)`. A designer working from the synced Figma variables sees a significantly darker gray than any platform ships. The 19/50 divergent primitives above all reach Figma this way (semantic variables alias primitives — e.g. `color/icon/navigation/inactive` aliases `color/gray/300` in every mode — so the primitive-value staleness propagates to every aliased semantic).

**Priority consequence**: HIGH stands, and the frame sharpens — this is not a dormant export with hypothetical consumers; it is the design/code contract surface, and it currently lies to the design side. **Sequencing note**: any fix session should also check the 054a/054b issue trail (duplicate collections, extractor variable-binding gaps) — repairing values into a push pipeline with known sync defects risks conflating the two failure classes.

**Remaining decision (Peter, at the fix session)**: options A/B/C above, now weighted by a real consumer — the DTCG primitive `$value` path should almost certainly read the same OKLCH source as the platforms (option A's shape), with the legacy file's remaining sole-source roles (shadows, DTCG structure) migrated or explicitly recorded.

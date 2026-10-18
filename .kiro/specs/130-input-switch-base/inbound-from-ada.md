# Inbound from Ada: token read for the Spec 130 design outline (measured, 2026-10-17)

**Date**: 2026-10-17
**Author**: Ada (token co-owner, G1)
**Status**: INPUT, not a spec artifact; read-only consult; no token created
**Method**: WCAG contrast via the repo's `contrastRatio()` (`src/color/OklchConverter.ts`) over primitive values from `composedColorMap` (`src/tokens/color`); cross-checked against the generated `dist/DesignTokens.web.css` (`:root` lines 207–234 and 539–564; `[data-theme="wcag"]` block lines 931–937).

---

**Headline:** two of Lina's estimates were wrong in the direction that matters. C5 and C6 are both needed, not conditional, and C6 is wider than she drew it.

**How I measured (d).** I used the repo's own `contrastRatio()` from `src/color/OklchConverter.ts`, the same function the `SemanticColorContrast` guard uses. It ran on primitive values from `composedColorMap` (`src/tokens/color`). I cross-checked them against the generated `dist/DesignTokens.web.css`: `:root` at lines 207–234 and 539–564, and the `[data-theme="wcag"]` block at lines 931–937.

Values per context:
- **Canvas** (`color.structure.canvas`): white100 `oklch(1 0 260)` in light; gray400 `oklch(0.42 0.018 260)` in dark, from the dark override.
- **On fill** (`color.action.primary`): cyan300 `oklch(0.76 0.148 202.5)` in light-base and dark-base; teal300 `oklch(0.52 0.08 209)` in both wcag contexts. There is no dark-wcag override for it.
- **Thumb on** (`color.contrast.onAction`): black500, or white100 under wcag.
- **Off border/thumb** (`select.border.default`): gray200 `oklch(0.62 0.02 260)`.
- **Lina's C4 light value**: white300 `oklch(0.9 0.01 260)`.

I took the canvas to be the page background because Leonardo's tree puts the rows in Container-Base with no background. If the rows ever sit on `structure.surface` (white200, an iOS-style grouped list), the numbers drop further; those are given where they matter.

**(a) The 21 existing tokens.** All exist and none is deprecated. In the blend family only `blend.disabledDesaturate` is deprecated; hover and pressed are fine. Four picks are wrong or wrongly described:
1. **`color.action.primary` as the on fill fails 1.4.11.** Details in (d).
2. **`color.feedback.select.border.default` (gray200) as off border and off thumb fails.**
   - As the border on the dark canvas it measures 2.32.
   - As the thumb on white300 it measures 2.70 (Lina estimated ~3).
   - It also fails on dark today for the Input-Checkbox-Base and Input-Radio-Base unchecked borders. That is a class problem; see (g).
3. **`color.contrast.onAction` on the thumb is only correct while the track is `action.primary`.** The wcag theme flips `onAction` to white. Once the track moves to C5, the thumb should be `color.contrast.onLight` (black500). That passes in all four contexts: 6.73, 10.59, 3.94 and 8.78 against the fills I propose in (d).
4. **The focus ring is not 3:1.** `accessibility.focus.color` is a fixed cyan300 in every context; it does not follow wcag. It measures 1.98 on the light canvas. This is a system-wide defect, outside this unit, and the outline must not claim 3:1.

`tapAreaRecommended` and `scale096` as primitives are correct picks: no semantic exists for either, and both have prior context. The rest are right. `motion.buttonPress` for press timing stretches its button wording slightly, but the checkbox sets the precedent.

**(b) C1–C3 sizing.**
- **Right layer.** No semantic sizing fits. `icon.size100` (24) and `tapAreaComfortable` (56) have the right values but the wrong meaning.
- **They conform to the size scale.** size300 (24), size400 (32) and size700 (56) are on the 8-base scale. Track height = thumb + 2 × `space.inset.050`. Track width = 2 × thumb + 2 × inset, which is 56. Thumb travel = 24, which equals space300.
- **Naming.** Match the precedent (`component: 'InputSwitch'`, as with `InputCheckbox` and its `box.*` keys): `inputswitch.thumb`, `inputswitch.track.width`, `inputswitch.track.height`. Lina's `thumb.size` is acceptable too.
- **Surviving counter-argument:** both track dimensions derive from thumb + inset, so one token (C1) plus arithmetic would do. I would still tokenize all three: the checkbox box token is just as derivable and is tokenized, and every platform gets constants. The pick is Peter's.

**(c) C4.** Confirmed: no theme-varying neutral fill exists.
- The dark override file changes nine tokens: canvas, `border.subtle`, `icon.navigation.inactive`, the three text tokens, success text, and two action-blue tokens. `structure.surface.*` and every `select.*` token are fixed across modes.
- The closest in meaning, `color.feedback.select.background.default` (the unselected background, gray100), is not theme-varying, and Button-VerticalList-Item consumes it.
- **Proposal:** light white300, dark gray500. The fill does not need 3:1 (white300 on the canvas is 1.35; gray500 on gray400 is 1.50) because the off-state outline carries the boundary.
- **New finding: C4 is optional.** An outlined off track (no fill; outline and thumb both in the off-outline color below) passes everywhere: 5.51 in light, 3.41 in dark. That is the Material 3 pattern. C4 is needed only if Lina or Peter want a filled off track. This is a design fork, not mine to pick.
- **Naming fork:** extend the select family (for example `color.feedback.select.fill.default`), or start a new `color.control.*` family. My lean is the select family, since the checkbox and radio already express on/off through `select.*`. Counter-argument: "feedback" is the wrong word for control chrome, and that family's names are already odd ("rest" means selected).

**(d) Measured ratios against the 3:1 floor (WCAG 1.4.11).**

On fill against the canvas:

| Context | Pair | Ratio | Verdict |
|---|---|---|---|
| light-base | cyan300 vs white100 | 1.98 | FAIL (Lina est. 2.1) |
| light-base, rows on surface | cyan300 vs white200 | 1.71 | FAIL |
| dark-base | cyan300 vs gray400 | 4.27 | pass |
| light-wcag | teal300 vs white100 | 5.33 | pass |
| dark-wcag | teal300 vs gray400 | 1.59 | FAIL |

Thumb on the current fill passes everywhere: black on cyan300 10.59; white on teal300 5.33.

Alternatives for the on fill, light vs dark canvas:
- cyan400: 3.12 / 2.71. Fails dark, and only 2.70 on a white200 surface.
- cyan500: 5.20 / 1.63, and 4.50 on a white200 surface.

So no single cyan works in both modes, and C5 must be theme-varying.

**My C5 proposal:**

| Context | Fill | Fill vs canvas | Thumb (black500) on fill |
|---|---|---|---|
| light-base | cyan400 (or cyan500, below) | 3.12 | 6.73 |
| dark-base | cyan300 | 4.27 | 10.59 |
| light-wcag | teal300 | 5.33 | 3.94 |
| dark-wcag | teal200 | 3.54 | 8.78 |

Fork for Peter on light-base: cyan400 (closer to the brand cyan; 3.12 is a thin margin on the canvas and fails on a surface) or cyan500 (5.20 on the canvas, 4.50 on a surface; black thumb 4.04; much darker than the brand cyan).

Off state:
- gray200 thumb on white300 (C4 light): 2.70, FAIL.
- gray200 border on the light canvas: 3.64, pass.
- gray200 border on the dark canvas: 2.32, FAIL.

**My C6 proposal**, expanded to one theme-varying off-outline color that serves as both the off border and the off thumb: light gray300, dark gray100.

| Use | Light | Dark |
|---|---|---|
| Border vs canvas | 5.51 | 3.41 |
| Thumb vs C4 fill | 4.09 | 5.11 |

Those are exactly the values of `icon.navigation.inactive`. Do not reuse that token: its description limits it to navigation. The overlap does show the system lacks a general neutral indicator color.

**(e) Motion.** Covered; no candidate is missing.
- `motion.selectionTransition` (duration250 + easingStandard) handles thumb travel and the track color change. `motion.settleTransition` (350ms, decelerate) exists if Lina wants a fast snap with a slower color fade.
- Reduced motion is handled in each platform's own way (`prefers-reduced-motion`, `accessibilityReduceMotion`, the Android animator scale, per Token-Family-Motion), not by a token. No zero-duration primitive is needed.
- Native Toggle and Compose Switch animate themselves, so the tokens apply only where we draw the control.
- Surviving counter-argument: `selectionTransition`'s description lists "buttons, list items, checkboxes", not thumb movement. That is a one-line wording update, not a new token.

**(f) tapAreaRecommended tier.** The index is right. `src/tokens/TapAreaTokens.ts` defines it as a primitive token (44 × 1.09 ≈ 48). Core Goals is wrong, and the same line also cites `color.contrast.onPrimary`, which no longer exists (it was migrated to `onDark`; `ColorTokens.test.ts:1238` asserts its absence). The fix is a ballot on Core Goals: Thurgood for content consistency, me for the Rosetta example. Suggested examples: `color.contrast.onAction`, and `space.inset.050` or similar as the semantic sizing example. Not blocking.

**(g) Recommendation for Peter.**

What to bring, in order:
1. C5: the theme-varying on fill (cyan400 or cyan500 / cyan300 / teal300 / teal200), with the thumb moved to `color.contrast.onLight`.
2. C6: the theme-varying off outline (gray300 / gray100).
3. C4 (white300 / gray500), only if a filled off track is chosen.
4. C1–C3, the component sizing tokens.

What to decline:
- `action.primary` for the track.
- Plain fixed cyan400 for the fill.
- `select.border.default` for the off border or thumb.
- Reusing `icon.navigation.inactive`.
- Reusing `select.border.rest` as a fill.

**Class option:** the switch's failures are instances of two system gaps.
1. Nothing guards the 3:1 non-text floor; `SemanticColorContrast.test.ts` explicitly excludes it. As a result, the focus ring is 1.98 in light and `action.primary` is 1.59 in dark-wcag.
2. The select family has no dark coverage. The checkbox and radio unchecked border is 2.32 on dark, and their checked border (cyan400) is 2.71.

The fix is a non-text pairing in the guard plus select-family dark overrides. That is the deferred contrast-queue spec (`.kiro/issues/2026-09-12-semantic-contrast-adjudication-queue.md`), and its deferral trigger, the 125-B campaign close, has fired. Cost: visible changes to the checkbox, radio and Chip-Filter in dark mode, and Peter's adjudication; larger than G1. Surviving counter-argument: doing the class fix first delays G1, while doing switch-only tokens first risks the switch and checkbox drifting apart until the queue spec reconciles them.

**Consulted**: none needed. This is my own token-domain read; Lina owns the component design and Thurgood the outline.

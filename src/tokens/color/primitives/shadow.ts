/**
 * Composed Shadow Colour Primitives — OKLCH, the same colours as before.
 *
 * `shadowBlack100`, `shadowBlue100`, `shadowOrange100` and `shadowGray100` were defined only as
 * `rgba` (`ColorTokens.ts`), outside the composed palette, so no platform emitted them and the 15
 * shadow composites that name them pointed at nothing. They are re-expressed here in OKLCH, to the
 * values of Spec 129 design § 8 (Peter's P-2 (1): no token is created, no name changes, no colour
 * changes), and join the palette every platform file emits.
 *
 * Each converts back to its earlier `rgba` within Requirement 6.10's tolerance (a Jest test asserts
 * it): the sRGB hex of each value is the hex of the earlier `rgba`.
 *
 * There are no channel tokens. The shadow family's channel structure belongs with blend in the
 * colour-track spec (Spec 133); until then `channels` is absent, not invented.
 *
 * @see .kiro/specs/129-consumer-generation-completeness/design.md § 8
 * @see .kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md
 */

import type { ComposedColor } from './chromatic';

/**
 * A composed colour without channel tokens: `ComposedColor` minus `channels`. Only the shadow
 * family is one (Spec 129 design § 8).
 */
export type ShadowColor = Omit<ComposedColor, 'channels'>;

/**
 * Shadow colours are mode-agnostic (always dark). Order is the order the earlier `rgba` family
 * was declared in `ColorTokens.ts`.
 */
export const shadowColors: ShadowColor[] = [
  // rgba(0, 0, 0, 1)
  { name: 'shadowBlack100', family: 'shadowBlack', step: 100, resolved: { l: 0, c: 0, h: 0 } },
  // rgba(20, 25, 40, 1): warm light creates cool shadows
  { name: 'shadowBlue100', family: 'shadowBlue', step: 100, resolved: { l: 0.2161, c: 0.0306, h: 269.6 } },
  // rgba(25, 20, 15, 1): cool light creates warm shadows
  { name: 'shadowOrange100', family: 'shadowOrange', step: 100, resolved: { l: 0.1956, c: 0.0127, h: 67.0 } },
  // rgba(15, 20, 30, 1): ambient and overcast
  { name: 'shadowGray100', family: 'shadowGray', step: 100, resolved: { l: 0.1912, c: 0.0219, h: 263.8 } },
];

/** Lookup a composed shadow colour by name. */
export const shadowColorMap = new Map(shadowColors.map(c => [c.name, c]));

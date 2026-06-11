/**
 * Color Family Hues — OKLCH hue angle per chromatic family.
 *
 * Each family has exactly one hue value that defines its identity.
 * Derived from the median hue of each family's existing RGBA palette.
 *
 * @see Spec 112 R1 AC3
 */

export const colorHues = {
  pink: 10.0,
  orange: 39.5,
  yellow: 107.0,
  green: 154.0,
  cyan: 202.5,
  teal: 209.0,
  purple: 310.0,
} as const;

/**
 * Neutral hue — shared by white, gray, and black families.
 * Defaults to primary color hue for subtle brand complement.
 * Configurable per product via `designerpunk.config.ts`.
 *
 * @see Spec 112 R2 AC5-6
 */
export const neutralHue = 260.0;

export type ChromaticFamily = keyof typeof colorHues;

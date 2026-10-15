/**
 * Neutral family lightness scales — OKLCH L channel for white, gray, black.
 *
 * Three non-overlapping bands with buffer gaps:
 * - White: L 1.00 → 0.80 (bright surfaces, backgrounds, cards)
 * - Gray:  L 0.72 → 0.32 (structural elements, muted content, borders, body text)
 * - Black: L 0.28 → 0.00 (dark mode surfaces, deep containers, high-contrast anchors)
 *
 * Buffer gaps: white500→gray100 = 0.08, gray500→black100 = 0.04
 *
 * @see Spec 112 R2 AC1-4
 */

export const whiteLightness = {
  100: 1.00,
  200: 0.95,
  300: 0.90,
  400: 0.85,
  500: 0.80,
} as const;

export const grayLightness = {
  100: 0.72,
  200: 0.62,
  300: 0.52,
  400: 0.42,
  500: 0.32,
} as const;

export const blackLightness = {
  100: 0.28,
  200: 0.21,
  300: 0.14,
  400: 0.07,
  500: 0.00,
} as const;

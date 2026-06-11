/**
 * Neutral family chroma scales — OKLCH C channel for white, gray, black.
 *
 * Follows a parabolic curve: near-zero at extremes (white/black),
 * peaking in the gray mid-range (~0.020). This makes hue perceptible
 * in structural elements but invisible in surfaces and deep darks.
 *
 * All values ≤ 0.035 (neutral chroma ceiling).
 *
 * @see Spec 112 R2 AC7
 */

export const whiteChroma = {
  100: 0.000,
  200: 0.006,
  300: 0.010,
  400: 0.013,
  500: 0.015,
} as const;

export const grayChroma = {
  100: 0.018,
  200: 0.020,
  300: 0.020,
  400: 0.018,
  500: 0.015,
} as const;

export const blackChroma = {
  100: 0.013,
  200: 0.010,
  300: 0.008,
  400: 0.004,
  500: 0.000,
} as const;

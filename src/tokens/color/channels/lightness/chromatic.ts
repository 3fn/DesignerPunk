/**
 * Chromatic family lightness scales — OKLCH L channel per family per step.
 *
 * Each family has 5 lightness values (steps 100-500) that define its
 * light-to-dark progression. Values are per-family to preserve each
 * family's perceptual character and gamut capacity.
 *
 * Derived from existing RGBA palette conversion, rounded to clean values.
 * Validated: monotonically decreasing, min step ≥0.08.
 *
 * @see Spec 112 R1 AC1,4
 */

export const pinkLightness = {
  100: 0.92,
  200: 0.76,
  300: 0.65,
  400: 0.55,
  500: 0.40,
} as const;

export const orangeLightness = {
  100: 0.94,
  200: 0.84,
  300: 0.70,
  400: 0.60,
  500: 0.46,
} as const;

export const yellowLightness = {
  100: 0.98,
  200: 0.90,
  300: 0.80,
  400: 0.68,
  500: 0.56,
} as const;

export const greenLightness = {
  100: 0.97,
  200: 0.88,
  300: 0.78,
  400: 0.66,
  500: 0.54,
} as const;

export const cyanLightness = {
  100: 0.96,
  200: 0.87,
  300: 0.76,
  400: 0.64,
  500: 0.52,
} as const;

export const tealLightness = {
  100: 0.92,
  200: 0.72,
  300: 0.52,
  400: 0.38,
  500: 0.28,
} as const;

export const purpleLightness = {
  100: 0.93,
  200: 0.76,
  300: 0.60,
  400: 0.51,
  500: 0.40,
} as const;

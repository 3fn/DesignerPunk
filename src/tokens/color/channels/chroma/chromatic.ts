/**
 * Chromatic family chroma scales — OKLCH C channel per family per step.
 *
 * Each family has 5 explicit chroma values (steps 100-500).
 * Steps 300→500 must be equal or decreasing (darker = less saturation).
 * Values respect each hue's gamut capacity at its corresponding lightness.
 *
 * Derived from existing RGBA palette conversion, rounded to clean values.
 *
 * @see Spec 112 R1 AC5-6
 */

export const pinkChroma = {
  100: 0.045,
  200: 0.160,
  300: 0.242,
  400: 0.203,
  500: 0.141,
} as const;

export const orangeChroma = {
  100: 0.031,
  200: 0.089,
  300: 0.193,
  400: 0.162,
  500: 0.121,
} as const;

export const yellowChroma = {
  100: 0.061,
  200: 0.140,
  300: 0.200,
  400: 0.169,
  500: 0.133,
} as const;

export const greenChroma = {
  100: 0.029,
  200: 0.149,
  300: 0.208,
  400: 0.180,
  500: 0.140,
} as const;

export const cyanChroma = {
  100: 0.048,
  200: 0.108,
  300: 0.148,
  400: 0.125,
  500: 0.097,
} as const;

export const tealChroma = {
  100: 0.035,
  200: 0.100,
  300: 0.080,
  400: 0.060,
  500: 0.045,
} as const;

export const purpleChroma = {
  100: 0.046,
  200: 0.179,
  300: 0.286,
  400: 0.241,
  500: 0.183,
} as const;

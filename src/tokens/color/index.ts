/**
 * Color Token Module — Barrel Export
 *
 * Exports channel primitives, composed colors, and lookup utilities.
 */

// Channel primitives
export * from './channels';

// Composed color primitives
export { chromaticColors, chromaticColorMap, type ComposedColor } from './primitives/chromatic';
export { neutralColors, neutralColorMap } from './primitives/neutral';
export { shadowColors, shadowColorMap, type ShadowColor } from './primitives/shadow';

// All composed colors (unified lookup)
import { chromaticColors, chromaticColorMap } from './primitives/chromatic';
import { neutralColors, neutralColorMap } from './primitives/neutral';
import { shadowColors, shadowColorMap, type ShadowColor } from './primitives/shadow';
import type { ComposedColor } from './primitives/chromatic';

/** All composed color primitives (chromatic + neutral). */
export const allComposedColors: ComposedColor[] = [...chromaticColors, ...neutralColors];

/**
 * Every colour primitive the platform files define: the composed palette and the shadow colours
 * (Spec 129 design § 8). The web, iOS and Android emitters iterate this list and nothing else.
 */
export const allEmittedColors: Array<ComposedColor | ShadowColor> = [...allComposedColors, ...shadowColors];

/** Unified lookup map for any OKLCH-sourced color by name (palette and shadow colours). */
export const composedColorMap = new Map<string, ComposedColor | ShadowColor>([
  ...chromaticColorMap,
  ...neutralColorMap,
  ...shadowColorMap,
]);

/** Get a composed color by name, or undefined. */
export function getComposedColor(name: string): ComposedColor | ShadowColor | undefined {
  return composedColorMap.get(name);
}

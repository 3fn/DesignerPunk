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

// All composed colors (unified lookup)
import { chromaticColors, chromaticColorMap } from './primitives/chromatic';
import { neutralColors, neutralColorMap } from './primitives/neutral';
import type { ComposedColor } from './primitives/chromatic';

/** All composed color primitives (chromatic + neutral). */
export const allComposedColors: ComposedColor[] = [...chromaticColors, ...neutralColors];

/** Unified lookup map for any composed color by name. */
export const composedColorMap = new Map<string, ComposedColor>([
  ...chromaticColorMap,
  ...neutralColorMap,
]);

/** Get a composed color by name, or undefined. */
export function getComposedColor(name: string): ComposedColor | undefined {
  return composedColorMap.get(name);
}

/**
 * OKLCH Export Utilities — Converts OKLCH colors to sRGB hex for DTCG/Figma output.
 *
 * Uses CSS Color Level 4 §13.2 gamut mapping when values exceed sRGB.
 * Deterministic: same OKLCH input always produces same hex output.
 *
 * @see Spec 112 R5 AC1-5
 */

import { toSrgbHex, isInSrgbGamut, clampToGamut, type Oklch } from '../../color/OklchConverter';

export interface OklchExportResult {
  hex: string;
  gamutClamped: boolean;
  original: Oklch;
}

/**
 * Convert OKLCH to sRGB hex for DTCG/Figma export.
 * Clamps out-of-gamut values using CSS L4 algorithm and flags them.
 */
export function oklchToExportHex(l: number, c: number, h: number): OklchExportResult {
  if (isInSrgbGamut(l, c, h)) {
    return { hex: toSrgbHex(l, c, h), gamutClamped: false, original: { l, c, h } };
  }

  const clamped = clampToGamut(l, c, h);
  return {
    hex: toSrgbHex(clamped.l, clamped.c, clamped.h),
    gamutClamped: true,
    original: { l, c, h },
  };
}

/**
 * Format a DTCG color token entry from OKLCH source.
 * Output: `{ "$value": "#ff2a6d", "$type": "color" }`
 */
export function formatDtcgColorToken(name: string, l: number, c: number, h: number): {
  $value: string;
  $type: 'color';
  $extensions?: { 'com.designerpunk': { oklch: Oklch; gamutClamped: boolean } };
} {
  const result = oklchToExportHex(l, c, h);
  const entry: any = {
    $value: result.hex,
    $type: 'color' as const,
  };
  // Include OKLCH source in extensions for traceability
  entry.$extensions = {
    'com.designerpunk': {
      oklch: result.original,
      gamutClamped: result.gamutClamped,
    },
  };
  return entry;
}

/**
 * Native colour values — OKLCH resolved to Display P3 channels at generation time.
 *
 * A generated Swift or Kotlin file carries a colour as a constructor call with its channels
 * already computed, so no generated file depends on a colour library or a run-time converter:
 *
 *   iOS:     `Color(.displayP3, red: 0.9175, green: 0.2003, blue: 0.1386, opacity: 1)`
 *   Android: `Color(0.9175f, 0.2003f, 0.1386f, 1f, ColorSpaces.DisplayP3)`
 *
 * A colour outside Display P3 is mapped into it by CSS Color Level 4 §13.2 (ΔE_OK 0.02) before
 * its channels are written, so every channel is in 0–1. Compose's `Color` constructor throws at
 * run time for a channel outside 0–1; the Android token file would otherwise fail on first use.
 *
 * Channels are rounded to 4 decimal places. Same input, same bytes.
 *
 * @see Spec 129 design.md § 6 (Native colour construction)
 */

import { oklchToGamutRgb } from '../../color/OklchConverter';

/** Gamma-encoded Display P3 channels, rounded to 4 decimal places, each in 0–1. */
export interface NativeColorChannels {
  r: number;
  g: number;
  b: number;
}

/** Decimal places a native colour channel is written to. */
export const NATIVE_CHANNEL_PLACES = 4;

const round4 = (v: number): number => {
  const rounded = Number(v.toFixed(NATIVE_CHANNEL_PLACES));
  // Number(-0.00001.toFixed(4)) is -0; write 0.
  return rounded === 0 ? 0 : rounded;
};

/** OKLCH → the channels a native token file carries (gamut-mapped into Display P3, 4 dp). */
export function oklchToNativeChannels(l: number, c: number, h: number): NativeColorChannels {
  const { r, g, b } = oklchToGamutRgb(l, c, h, 'display-p3');
  return { r: round4(r), g: round4(g), b: round4(b) };
}

/** A number as it is written in Swift or Kotlin source: no trailing zeros, no `-0`. */
function plain(v: number): string {
  return String(v === 0 ? 0 : v);
}

/**
 * SwiftUI constructor for an OKLCH colour.
 * `Color(.displayP3, red: r, green: g, blue: b, opacity: a)`; `opacity` is always written.
 */
export function formatSwiftDisplayP3(l: number, c: number, h: number, alpha: number = 1): string {
  const { r, g, b } = oklchToNativeChannels(l, c, h);
  return `Color(.displayP3, red: ${plain(r)}, green: ${plain(g)}, blue: ${plain(b)}, opacity: ${plain(alpha)})`;
}

/**
 * Compose constructor for an OKLCH colour.
 * `Color(r, g, b, alpha, ColorSpaces.DisplayP3)`; `alpha` is always written.
 */
export function formatKotlinDisplayP3(l: number, c: number, h: number, alpha: number = 1): string {
  const { r, g, b } = oklchToNativeChannels(l, c, h);
  return `Color(${plain(r)}f, ${plain(g)}f, ${plain(b)}f, ${plain(alpha)}f, ColorSpaces.DisplayP3)`;
}

/** The `oklch(l c h)` or `oklch(l c h / alpha)` text a resolved semantic reference carries. */
const OKLCH_TEXT = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/;

/** Parse the text form, or `null` when the string is not an `oklch(…)` literal. */
export function parseOklchText(text: string): { l: number; c: number; h: number; alpha: number } | null {
  const m = OKLCH_TEXT.exec(text.trim());
  if (!m) return null;
  return { l: Number(m[1]), c: Number(m[2]), h: Number(m[3]), alpha: m[4] === undefined ? 1 : Number(m[4]) };
}

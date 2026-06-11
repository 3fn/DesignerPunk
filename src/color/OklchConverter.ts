/**
 * OklchConverter — Color space conversion and analysis for the OKLCH color system.
 *
 * Conversion pipeline: OKLCH → OKLab → linear sRGB → sRGB → hex
 * WCAG: OKLCH → linear sRGB → relative luminance → contrast ratio
 * Gamut mapping: CSS Color Level 4 §13.2 algorithm
 *
 * References:
 * - OKLab/OKLCH: https://bottosson.github.io/posts/oklab/
 * - CSS Color L4 gamut mapping: https://www.w3.org/TR/css-color-4/#css-gamut-mapping
 * - CIEDE2000: https://en.wikipedia.org/wiki/Color_difference#CIEDE2000
 *
 * @see Spec 112 design.md
 */

/** Standardized OKLCH color representation used across all color modules. */
export interface Oklch {
  /** Lightness: 0 (black) to 1 (white) */
  l: number;
  /** Chroma: 0 (neutral) to ~0.4 (maximum saturation) */
  c: number;
  /** Hue: 0-360 degrees */
  h: number;
}

// --- OKLCH → OKLab ---

function oklchToOklab(l: number, c: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  return [l, c * Math.cos(hRad), c * Math.sin(hRad)];
}

// --- OKLab → linear sRGB ---

function oklabToLinearSrgb(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bOut = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

  return [r, g, bOut];
}

// --- linear sRGB → sRGB (gamma) ---

function linearToSrgb(c: number): number {
  if (c <= 0.0031308) return 12.92 * c;
  return 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

function srgbToLinear(c: number): number {
  if (c <= 0.04045) return c / 12.92;
  return Math.pow((c + 0.055) / 1.055, 2.4);
}

// --- sRGB → OKLab (reverse) ---

function linearSrgbToOklab(r: number, g: number, b: number): [number, number, number] {
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);

  const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
  const bOut = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;

  return [L, a, bOut];
}

// --- Public API ---

/** Check if linear sRGB values are within [0, 1] gamut. */
export function isInSrgbGamut(l: number, c: number, h: number): boolean {
  const [L, a, b] = oklchToOklab(l, c, h);
  const [r, g, bVal] = oklabToLinearSrgb(L, a, b);
  const epsilon = 0.000075;
  return r >= -epsilon && r <= 1 + epsilon &&
         g >= -epsilon && g <= 1 + epsilon &&
         bVal >= -epsilon && bVal <= 1 + epsilon;
}

/** Convert OKLCH to sRGB hex string (e.g., "#ff2a6d"). */
export function toSrgbHex(l: number, c: number, h: number): string {
  const [L, a, b] = oklchToOklab(l, c, h);
  const [lr, lg, lb] = oklabToLinearSrgb(L, a, b);

  const r = Math.round(Math.max(0, Math.min(1, linearToSrgb(lr))) * 255);
  const g = Math.round(Math.max(0, Math.min(1, linearToSrgb(lg))) * 255);
  const bVal = Math.round(Math.max(0, Math.min(1, linearToSrgb(lb))) * 255);

  return '#' + [r, g, bVal].map(v => v.toString(16).padStart(2, '0')).join('');
}

/** Convert sRGB hex to OKLCH. */
export function fromSrgbHex(hex: string): Oklch {
  const h6 = hex.replace('#', '');
  const r = parseInt(h6.slice(0, 2), 16) / 255;
  const g = parseInt(h6.slice(2, 4), 16) / 255;
  const b = parseInt(h6.slice(4, 6), 16) / 255;

  const [L, a, bLab] = linearSrgbToOklab(srgbToLinear(r), srgbToLinear(g), srgbToLinear(b));
  const c = Math.sqrt(a * a + bLab * bLab);
  const hue = ((Math.atan2(bLab, a) * 180) / Math.PI + 360) % 360;

  return { l: L, c, h: c < 0.0001 ? 0 : hue };
}

/** Compute sRGB relative luminance from OKLCH (for WCAG). */
export function toRelativeLuminance(l: number, c: number, h: number): number {
  const [L, a, b] = oklchToOklab(l, c, h);
  const [lr, lg, lb] = oklabToLinearSrgb(L, a, b);

  // Clamp to gamut for luminance calculation
  const r = Math.max(0, Math.min(1, lr));
  const g = Math.max(0, Math.min(1, lg));
  const bVal = Math.max(0, Math.min(1, lb));

  return 0.2126 * r + 0.7152 * g + 0.0722 * bVal;
}

/** WCAG contrast ratio between two OKLCH colors. */
export function contrastRatio(color1: Oklch, color2: Oklch): number {
  const l1 = toRelativeLuminance(color1.l, color1.c, color1.h);
  const l2 = toRelativeLuminance(color2.l, color2.c, color2.h);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * CIEDE2000 ΔE₀₀ between two OKLCH colors.
 *
 * Converts to CIELab for the standard formula (OKLCH L is perceptual
 * but CIEDE2000 is defined on CIELab). Uses simplified approximation:
 * maps OKLab a,b scaled to CIELab range for ΔE₀₀ computation.
 */
export function deltaE00(color1: Oklch, color2: Oklch): number {
  // Convert to OKLab
  const [L1, a1, b1] = oklchToOklab(color1.l, color1.c, color1.h);
  const [L2, a2, b2] = oklchToOklab(color2.l, color2.c, color2.h);

  // Scale OKLab to approximate CIELab range (L: 0-100, a/b: ±128)
  const kL = 100, kAB = 230;
  return ciede2000(
    L1 * kL, a1 * kAB, b1 * kAB,
    L2 * kL, a2 * kAB, b2 * kAB
  );
}

/** CIEDE2000 implementation on Lab values. */
function ciede2000(L1: number, a1: number, b1: number, L2: number, a2: number, b2: number): number {
  const C1 = Math.sqrt(a1 * a1 + b1 * b1);
  const C2 = Math.sqrt(a2 * a2 + b2 * b2);
  const Cab = (C1 + C2) / 2;
  const Cab7 = Math.pow(Cab, 7);
  const G = 0.5 * (1 - Math.sqrt(Cab7 / (Cab7 + Math.pow(25, 7))));

  const a1p = a1 * (1 + G);
  const a2p = a2 * (1 + G);
  const C1p = Math.sqrt(a1p * a1p + b1 * b1);
  const C2p = Math.sqrt(a2p * a2p + b2 * b2);

  let h1p = (Math.atan2(b1, a1p) * 180) / Math.PI;
  if (h1p < 0) h1p += 360;
  let h2p = (Math.atan2(b2, a2p) * 180) / Math.PI;
  if (h2p < 0) h2p += 360;

  const dLp = L2 - L1;
  const dCp = C2p - C1p;

  let dhp: number;
  if (C1p * C2p === 0) {
    dhp = 0;
  } else if (Math.abs(h2p - h1p) <= 180) {
    dhp = h2p - h1p;
  } else if (h2p - h1p > 180) {
    dhp = h2p - h1p - 360;
  } else {
    dhp = h2p - h1p + 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI) / 360);

  const Lp = (L1 + L2) / 2;
  const Cp = (C1p + C2p) / 2;

  let hp: number;
  if (C1p * C2p === 0) {
    hp = h1p + h2p;
  } else if (Math.abs(h1p - h2p) <= 180) {
    hp = (h1p + h2p) / 2;
  } else if (h1p + h2p < 360) {
    hp = (h1p + h2p + 360) / 2;
  } else {
    hp = (h1p + h2p - 360) / 2;
  }

  const T = 1
    - 0.17 * Math.cos(((hp - 30) * Math.PI) / 180)
    + 0.24 * Math.cos(((2 * hp) * Math.PI) / 180)
    + 0.32 * Math.cos(((3 * hp + 6) * Math.PI) / 180)
    - 0.20 * Math.cos(((4 * hp - 63) * Math.PI) / 180);

  const SL = 1 + (0.015 * (Lp - 50) * (Lp - 50)) / Math.sqrt(20 + (Lp - 50) * (Lp - 50));
  const SC = 1 + 0.045 * Cp;
  const SH = 1 + 0.015 * Cp * T;

  const Cp7 = Math.pow(Cp, 7);
  const RT = -2 * Math.sqrt(Cp7 / (Cp7 + Math.pow(25, 7)))
    * Math.sin((60 * Math.exp(-((hp - 275) / 25) * ((hp - 275) / 25)) * Math.PI) / 180);

  const dE = Math.sqrt(
    (dLp / SL) ** 2 +
    (dCp / SC) ** 2 +
    (dHp / SH) ** 2 +
    RT * (dCp / SC) * (dHp / SH)
  );

  return dE;
}

/**
 * CSS Color Level 4 §13.2 gamut mapping.
 *
 * Binary search on chroma in OKLCH. Converges when either:
 * - The color is in sRGB gamut, OR
 * - ΔE₀₀ between current and clipped < 0.02 (JND threshold)
 */
export function clampToGamut(l: number, c: number, h: number): Oklch {
  if (isInSrgbGamut(l, c, h)) return { l, c, h };

  // Edge cases
  if (l >= 1) return { l: 1, c: 0, h };
  if (l <= 0) return { l: 0, c: 0, h };

  let lo = 0;
  let hi = c;
  let current: Oklch = { l, c, h };

  const JND = 0.02;
  const EPSILON = 0.0001;

  while (hi - lo > EPSILON) {
    const mid = (lo + hi) / 2;
    current = { l, c: mid, h };

    if (isInSrgbGamut(l, mid, h)) {
      lo = mid;
    } else {
      // Clip to gamut and check if perceptually close enough
      const clipped = clipToSrgb(l, mid, h);
      const dE = deltaE00(current, clipped);
      if (dE - JND < EPSILON) {
        // Close enough — accept the clipped version
        return clipped;
      }
      hi = mid;
    }
  }

  return { l, c: lo, h };
}

/** Hard-clip OKLCH to sRGB by clamping linear RGB channels. */
function clipToSrgb(l: number, c: number, h: number): Oklch {
  const [L, a, b] = oklchToOklab(l, c, h);
  const [lr, lg, lb] = oklabToLinearSrgb(L, a, b);

  const clampedR = Math.max(0, Math.min(1, lr));
  const clampedG = Math.max(0, Math.min(1, lg));
  const clampedB = Math.max(0, Math.min(1, lb));

  const [cL, ca, cb] = linearSrgbToOklab(clampedR, clampedG, clampedB);
  const cc = Math.sqrt(ca * ca + cb * cb);
  const ch = ((Math.atan2(cb, ca) * 180) / Math.PI + 360) % 360;

  return { l: cL, c: cc, h: cc < 0.0001 ? 0 : ch };
}

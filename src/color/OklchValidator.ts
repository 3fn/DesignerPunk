/**
 * OklchValidator — Constraint validation for OKLCH color families.
 *
 * Enforces:
 * - Lightness monotonicity (100→500 must decrease)
 * - Minimum step distance (≥0.08 between adjacent steps)
 * - sRGB gamut compliance per token
 * - P3 gamut check (warning, not error)
 * - Chroma monotonicity for steps 300→500 (equal or decreasing)
 * - Hue consistency within a family
 * - Neutral chroma ceiling (C ≤ 0.035)
 * - Neutral partition buffer gaps
 *
 * @see Spec 112 R1 AC6, R2 AC4, R8 AC2-3
 */

import { isInSrgbGamut, type Oklch } from './OklchConverter';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ColorFamily {
  name: string;
  hue: number;
  lightness: number[];  // steps 100-500 (index 0=100, 4=500)
  chroma: number[];     // steps 100-500
}

const MIN_STEP_DISTANCE = 0.08;
const NEUTRAL_CHROMA_CEILING = 0.035;

export class OklchValidator {
  /** Validate a complete color family against all constraints. */
  validateFamily(family: ColorFamily): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const lResult = this.validateLightnessScale(family.lightness, family.name);
    errors.push(...lResult.errors);
    warnings.push(...lResult.warnings);

    const cResult = this.validateChromaScale(family.chroma, family.name);
    errors.push(...cResult.errors);
    warnings.push(...cResult.warnings);

    // Gamut check for each composed token
    for (let i = 0; i < family.lightness.length; i++) {
      const step = (i + 1) * 100;
      const l = family.lightness[i];
      const c = family.chroma[i];
      const gResult = this.validateGamut(l, c, family.hue, `${family.name}${step}`);
      errors.push(...gResult.errors);
      warnings.push(...gResult.warnings);
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /** Validate lightness scale: must be monotonically decreasing with min step ≥0.08. */
  validateLightnessScale(steps: number[], familyName = ''): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const prefix = familyName ? `${familyName}: ` : '';

    for (let i = 1; i < steps.length; i++) {
      if (steps[i] >= steps[i - 1]) {
        errors.push(`${prefix}Lightness not monotonically decreasing: step ${(i) * 100}(${steps[i - 1]}) → step ${(i + 1) * 100}(${steps[i]})`);
      }
      const distance = steps[i - 1] - steps[i];
      if (distance > 0 && distance < MIN_STEP_DISTANCE - 1e-10) {
        errors.push(`${prefix}Lightness step distance ${distance.toFixed(3)} < ${MIN_STEP_DISTANCE} between steps ${i * 100} and ${(i + 1) * 100}`);
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /** Validate chroma scale: steps 300→500 must be equal or decreasing (darker = less chroma). */
  validateChromaScale(steps: number[], familyName = ''): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const prefix = familyName ? `${familyName}: ` : '';

    // Steps 300-500 are indices 2-4
    for (let i = 3; i < steps.length && i <= 4; i++) {
      if (steps[i] > steps[i - 1]) {
        errors.push(`${prefix}Chroma not monotonically decreasing for steps ${(i) * 100}→${(i + 1) * 100}: ${steps[i - 1]} → ${steps[i]}`);
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /** Check sRGB gamut compliance. P3-only values get a warning. */
  validateGamut(l: number, c: number, h: number, tokenName = ''): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const prefix = tokenName ? `${tokenName}: ` : '';

    if (!isInSrgbGamut(l, c, h)) {
      if (this.isInP3Gamut(l, c, h)) {
        warnings.push(`${prefix}oklch(${l}, ${c}, ${h}) exceeds sRGB gamut (P3 only)`);
      } else {
        errors.push(`${prefix}oklch(${l}, ${c}, ${h}) exceeds both sRGB and P3 gamut`);
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /** Validate hue consistency: all tokens in a family should reference the same hue. */
  validateHueConsistency(hues: number[], familyName = ''): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const prefix = familyName ? `${familyName}: ` : '';

    if (hues.length === 0) return { valid: true, errors, warnings };
    const reference = hues[0];
    for (let i = 1; i < hues.length; i++) {
      if (hues[i] !== reference) {
        errors.push(`${prefix}Hue inconsistency: expected ${reference}, got ${hues[i]} at index ${i}`);
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /** Validate neutral chroma ceiling (C ≤ 0.035 for all steps). */
  validateNeutralChroma(chroma: number[], familyName = ''): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const prefix = familyName ? `${familyName}: ` : '';

    for (let i = 0; i < chroma.length; i++) {
      if (chroma[i] > NEUTRAL_CHROMA_CEILING) {
        errors.push(`${prefix}Neutral chroma ${chroma[i]} exceeds ceiling ${NEUTRAL_CHROMA_CEILING} at step ${(i + 1) * 100}`);
      }
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /**
   * Validate neutral partition buffer gaps.
   * white500 → gray100: ≥0.08 gap
   * gray500 → black100: ≥0.04 gap
   */
  validateNeutralPartition(
    whiteLightness: number[],
    grayLightness: number[],
    blackLightness: number[]
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const EPSILON = 1e-10;

    const white500 = whiteLightness[whiteLightness.length - 1];
    const gray100 = grayLightness[0];
    const whiteGrayGap = white500 - gray100;

    if (whiteGrayGap < 0.08 - EPSILON) {
      errors.push(`White→Gray buffer gap ${whiteGrayGap.toFixed(3)} < 0.08 (white500=${white500}, gray100=${gray100})`);
    }

    const gray500 = grayLightness[grayLightness.length - 1];
    const black100 = blackLightness[0];
    const grayBlackGap = gray500 - black100;

    if (grayBlackGap < 0.04 - EPSILON) {
      errors.push(`Gray→Black buffer gap ${grayBlackGap.toFixed(3)} < 0.04 (gray500=${gray500}, black100=${black100})`);
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  /** Approximate P3 gamut check (P3 ≈ 25% larger chroma than sRGB). */
  private isInP3Gamut(l: number, c: number, h: number): boolean {
    // Rough heuristic: P3 gamut allows ~25% more chroma than sRGB at most L/H
    // A proper check would use the P3 color space matrices, but this catches
    // "way out of gamut" vs "just beyond sRGB but in P3"
    return isInSrgbGamut(l, c * 0.75, h);
  }
}

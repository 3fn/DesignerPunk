/**
 * OklchValidator — Constraint validation for OKLCH color families.
 *
 * Enforces:
 * - Lightness monotonicity (100→500 must decrease)
 * - Minimum step distance between adjacent steps (per family class — see below)
 * - sRGB gamut compliance per token
 * - P3 gamut check (warning, not error)
 * - Chroma monotonicity for steps 300→500 (equal or decreasing)
 * - Hue consistency within a family
 * - Neutral chroma ceiling (C ≤ 0.035)
 * - Neutral partition buffer gaps
 *
 * **Where this is enforced**: the standing token test suites, which the PR gate runs —
 * `src/tokens/__tests__/chromatic-channels.test.ts` (all 7 chromatic families through
 * `validateFamily`) and `src/tokens/__tests__/neutral-partition.test.ts` (white/gray/black
 * partition, chroma ceilings, and lightness scales). A color-family channel edit that
 * violates a constraint fails CI. This validator is deliberately NOT wired into
 * `npm run build` / `build:validate`: a consumer building from source should not have
 * their build fail over the ecosystem's own color math — authorship errors belong in the
 * authoring repo's test lane.
 *
 * **Minimum step distance is family-class-scoped.** 0.08 is calibrated for the chromatic
 * families, whose five steps span a wide lightness range. The neutral bands are narrower
 * by construction (white spans 1.00→0.80, black 0.28→0.00), so applying the chromatic
 * threshold to them would report a violation where the scale is correct. Each class
 * carries its own floor; see `MIN_STEP_DISTANCE`.
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
  /** Family class for lightness-step calibration. Defaults to 'chromatic'. */
  familyClass?: ColorFamilyClass;
}

/**
 * Family classes for lightness-scale validation. Chromatic families share one set of
 * constraints; each neutral band has its own, because the bands are narrow by design.
 */
export type ColorFamilyClass = 'chromatic' | 'white' | 'gray' | 'black';

/**
 * Minimum lightness distance between adjacent steps, per family class.
 *
 * - chromatic (0.08): five steps across a wide lightness range
 * - white (0.05): band spans 1.00 → 0.80, so 0.05 per step
 * - gray (0.08): band spans 0.72 → 0.32, so 0.10 per step — the chromatic floor holds
 * - black (0.07): band spans 0.28 → 0.00, so 0.07 per step
 *
 * These are floors, not targets: a family may exceed its floor freely.
 */
export const MIN_STEP_DISTANCE: Record<ColorFamilyClass, number> = {
  chromatic: 0.08,
  white: 0.05,
  gray: 0.08,
  black: 0.07,
};

const NEUTRAL_CHROMA_CEILING = 0.035;

export class OklchValidator {
  /** Validate a complete color family against all constraints. */
  validateFamily(family: ColorFamily): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const lResult = this.validateLightnessScale(
      family.lightness,
      family.name,
      family.familyClass ?? 'chromatic'
    );
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

  /**
   * Validate a lightness scale: monotonically decreasing, with adjacent steps at least
   * the family class's minimum distance apart.
   *
   * `familyClass` defaults to `'chromatic'` — the calibration this method was written
   * against. Neutral bands must pass their own class, or a correct narrow band reports
   * a false violation.
   */
  validateLightnessScale(
    steps: number[],
    familyName = '',
    familyClass: ColorFamilyClass = 'chromatic'
  ): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const prefix = familyName ? `${familyName}: ` : '';
    const minStep = MIN_STEP_DISTANCE[familyClass];

    for (let i = 1; i < steps.length; i++) {
      if (steps[i] >= steps[i - 1]) {
        errors.push(`${prefix}Lightness not monotonically decreasing: step ${(i) * 100}(${steps[i - 1]}) → step ${(i + 1) * 100}(${steps[i]})`);
      }
      const distance = steps[i - 1] - steps[i];
      if (distance > 0 && distance < minStep - 1e-10) {
        errors.push(`${prefix}Lightness step distance ${distance.toFixed(3)} < ${minStep} (${familyClass} minimum) between steps ${i * 100} and ${(i + 1) * 100}`);
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

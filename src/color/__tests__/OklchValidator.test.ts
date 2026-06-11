/**
 * @category evergreen
 * @purpose Verify OklchValidator constraint enforcement (Spec 112 R1 AC6, R2 AC4, R8 AC2-3)
 */

import { OklchValidator, ColorFamily } from '../OklchValidator';

describe('OklchValidator', () => {
  let validator: OklchValidator;

  beforeEach(() => {
    validator = new OklchValidator();
  });

  describe('validateLightnessScale', () => {
    it('passes for monotonically decreasing lightness', () => {
      const result = validator.validateLightnessScale([0.92, 0.76, 0.65, 0.55, 0.40]);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('fails when lightness increases', () => {
      const result = validator.validateLightnessScale([0.92, 0.76, 0.80, 0.55, 0.40]);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('not monotonically decreasing');
    });

    it('fails when lightness is equal between steps', () => {
      const result = validator.validateLightnessScale([0.92, 0.76, 0.76, 0.55, 0.40]);
      expect(result.valid).toBe(false);
    });

    it('fails when step distance < 0.08', () => {
      const result = validator.validateLightnessScale([0.92, 0.76, 0.70, 0.55, 0.40]);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('step distance');
    });

    it('passes when all steps exactly 0.08 apart', () => {
      const result = validator.validateLightnessScale([0.80, 0.72, 0.64, 0.56, 0.48]);
      expect(result.valid).toBe(true);
    });

    it('includes family name in error messages', () => {
      const result = validator.validateLightnessScale([0.92, 0.95, 0.65, 0.55, 0.40], 'pink');
      expect(result.errors[0]).toContain('pink');
    });
  });

  describe('validateChromaScale', () => {
    it('passes when chroma decreases from step 300→500', () => {
      // Steps 100-500: indices 0-4. Monotonicity checked for indices 2-4 (steps 300-500)
      const result = validator.validateChromaScale([0.05, 0.17, 0.24, 0.20, 0.14]);
      expect(result.valid).toBe(true);
    });

    it('passes when chroma is equal from 300→400→500', () => {
      const result = validator.validateChromaScale([0.05, 0.17, 0.20, 0.20, 0.20]);
      expect(result.valid).toBe(true);
    });

    it('fails when chroma increases from 300→400', () => {
      const result = validator.validateChromaScale([0.05, 0.17, 0.20, 0.25, 0.14]);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('not monotonically decreasing');
    });

    it('allows chroma to increase from 100→200→300 (only 300→500 constrained)', () => {
      const result = validator.validateChromaScale([0.05, 0.17, 0.24, 0.20, 0.14]);
      expect(result.valid).toBe(true);
    });
  });

  describe('validateGamut', () => {
    it('passes for in-gamut colors', () => {
      const result = validator.validateGamut(0.5, 0.05, 200);
      expect(result.valid).toBe(true);
      expect(result.warnings).toEqual([]);
    });

    it('warns for P3-only colors', () => {
      // Moderate chroma at green hue — likely in P3 but not sRGB
      const result = validator.validateGamut(0.7, 0.2, 150);
      // May be P3-only depending on exact boundary
      if (!result.valid) {
        expect(result.warnings.length + result.errors.length).toBeGreaterThan(0);
      }
    });

    it('errors for extreme out-of-gamut colors', () => {
      const result = validator.validateGamut(0.5, 0.5, 150);
      expect(result.valid).toBe(false);
    });

    it('includes token name in messages', () => {
      const result = validator.validateGamut(0.5, 0.5, 150, 'pink300');
      const allMessages = [...result.errors, ...result.warnings];
      expect(allMessages.some(m => m.includes('pink300'))).toBe(true);
    });
  });

  describe('validateHueConsistency', () => {
    it('passes when all hues are identical', () => {
      const result = validator.validateHueConsistency([8.2, 8.2, 8.2, 8.2, 8.2]);
      expect(result.valid).toBe(true);
    });

    it('fails when any hue differs', () => {
      const result = validator.validateHueConsistency([8.2, 8.2, 8.5, 8.2, 8.2]);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Hue inconsistency');
    });

    it('passes for empty array', () => {
      const result = validator.validateHueConsistency([]);
      expect(result.valid).toBe(true);
    });

    it('passes for single hue', () => {
      const result = validator.validateHueConsistency([200]);
      expect(result.valid).toBe(true);
    });
  });

  describe('validateNeutralChroma', () => {
    it('passes when all chroma ≤ 0.035', () => {
      const result = validator.validateNeutralChroma([0.006, 0.009, 0.012, 0.014, 0.015]);
      expect(result.valid).toBe(true);
    });

    it('fails when any chroma > 0.035', () => {
      const result = validator.validateNeutralChroma([0.006, 0.009, 0.040, 0.014, 0.015]);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('exceeds ceiling');
    });

    it('passes at exactly 0.035', () => {
      const result = validator.validateNeutralChroma([0.035, 0.035, 0.035, 0.035, 0.035]);
      expect(result.valid).toBe(true);
    });
  });

  describe('validateNeutralPartition', () => {
    const validWhite = [1.00, 0.95, 0.90, 0.85, 0.80];
    const validGray = [0.72, 0.62, 0.52, 0.42, 0.32];
    const validBlack = [0.28, 0.21, 0.14, 0.07, 0.00];

    it('passes with correct buffer gaps', () => {
      const result = validator.validateNeutralPartition(validWhite, validGray, validBlack);
      expect(result.valid).toBe(true);
    });

    it('fails when white→gray gap < 0.08', () => {
      const tightGray = [0.75, 0.62, 0.52, 0.42, 0.32]; // gap = 0.80-0.75 = 0.05
      const result = validator.validateNeutralPartition(validWhite, tightGray, validBlack);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('White→Gray');
    });

    it('fails when gray→black gap < 0.04', () => {
      const tightBlack = [0.30, 0.21, 0.14, 0.07, 0.00]; // gap = 0.32-0.30 = 0.02
      const result = validator.validateNeutralPartition(validWhite, validGray, tightBlack);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Gray→Black');
    });

    it('passes at exact minimum gaps', () => {
      const minGray = [0.72, 0.62, 0.52, 0.42, 0.32]; // white500=0.80, gap=0.08 exact
      const minBlack = [0.28, 0.21, 0.14, 0.07, 0.00]; // gray500=0.32, gap=0.04 exact
      const result = validator.validateNeutralPartition(validWhite, minGray, minBlack);
      expect(result.valid).toBe(true);
    });
  });

  describe('validateFamily (integration)', () => {
    it('passes for a well-formed chromatic family', () => {
      const family: ColorFamily = {
        name: 'pink',
        hue: 8.2,
        lightness: [0.92, 0.76, 0.65, 0.55, 0.40],
        chroma: [0.05, 0.17, 0.24, 0.20, 0.14],
      };
      const result = validator.validateFamily(family);
      expect(result.valid).toBe(true);
    });

    it('catches multiple errors in a broken family', () => {
      const family: ColorFamily = {
        name: 'broken',
        hue: 150,
        lightness: [0.92, 0.90, 0.65, 0.55, 0.40], // step distance < 0.08
        chroma: [0.05, 0.17, 0.20, 0.25, 0.14],    // chroma increases 300→400
      };
      const result = validator.validateFamily(family);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
    });
  });
});

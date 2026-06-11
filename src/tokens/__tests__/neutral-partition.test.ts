/**
 * @category evergreen
 * @purpose Verify neutral partition constraints: gaps, chroma ceiling, gamut, monotonicity (Spec 112 R2)
 */

import { OklchValidator } from '../../color/OklchValidator';
import { neutralHue } from '../color/channels/hues';
import { whiteLightness, grayLightness, blackLightness } from '../color/channels/lightness/neutral';
import { whiteChroma, grayChroma, blackChroma } from '../color/channels/chroma/neutral';

const validator = new OklchValidator();
const wL = Object.values(whiteLightness) as number[];
const gL = Object.values(grayLightness) as number[];
const bL = Object.values(blackLightness) as number[];
const wC = Object.values(whiteChroma) as number[];
const gC = Object.values(grayChroma) as number[];
const bC = Object.values(blackChroma) as number[];

describe('Neutral partition validation (Spec 112 R2)', () => {
  describe('buffer gaps', () => {
    it('white→gray gap ≥ 0.08', () => {
      const result = validator.validateNeutralPartition(wL, gL, bL);
      expect(result.valid).toBe(true);
    });

    it('white500 = 0.80, gray100 = 0.72 → gap = 0.08', () => {
      expect(wL[4]).toBe(0.80);
      expect(gL[0]).toBe(0.72);
    });

    it('gray500 = 0.32, black100 = 0.28 → gap = 0.04', () => {
      expect(gL[4]).toBe(0.32);
      expect(bL[0]).toBe(0.28);
    });
  });

  describe('chroma ceiling (≤ 0.035)', () => {
    it('white chroma within ceiling', () => {
      expect(validator.validateNeutralChroma(wC, 'white').valid).toBe(true);
    });

    it('gray chroma within ceiling', () => {
      expect(validator.validateNeutralChroma(gC, 'gray').valid).toBe(true);
    });

    it('black chroma within ceiling', () => {
      expect(validator.validateNeutralChroma(bC, 'black').valid).toBe(true);
    });
  });

  describe('parabolic chroma curve', () => {
    it('white chroma increases from 100→500 (approaching gray)', () => {
      for (let i = 1; i < wC.length; i++) {
        expect(wC[i]).toBeGreaterThanOrEqual(wC[i - 1]);
      }
    });

    it('gray chroma peaks in mid-range', () => {
      const max = Math.max(...gC);
      expect(max).toBe(0.020);
      // Peak is at steps 200-300
      expect(gC[1]).toBe(max);
      expect(gC[2]).toBe(max);
    });

    it('black chroma decreases from 100→500 (approaching zero)', () => {
      for (let i = 1; i < bC.length; i++) {
        expect(bC[i]).toBeLessThanOrEqual(bC[i - 1]);
      }
    });
  });

  describe('lightness ranges', () => {
    it('white spans L=1.00 to L=0.80', () => {
      expect(wL[0]).toBe(1.00);
      expect(wL[4]).toBe(0.80);
    });

    it('gray spans L=0.72 to L=0.32', () => {
      expect(gL[0]).toBe(0.72);
      expect(gL[4]).toBe(0.32);
    });

    it('black spans L=0.28 to L=0.00', () => {
      expect(bL[0]).toBe(0.28);
      expect(bL[4]).toBe(0.00);
    });

    it('all lightness scales are monotonically decreasing', () => {
      for (const scale of [wL, gL, bL]) {
        for (let i = 1; i < scale.length; i++) {
          expect(scale[i]).toBeLessThan(scale[i - 1]);
        }
      }
    });
  });

  describe('shared neutralHue', () => {
    it('neutralHue is defined', () => {
      expect(neutralHue).toBeDefined();
      expect(typeof neutralHue).toBe('number');
    });

    it('all neutral tokens are in sRGB gamut', () => {
      for (const [name, ls, cs] of [['white', wL, wC], ['gray', gL, gC], ['black', bL, bC]] as const) {
        for (let i = 0; i < 5; i++) {
          const result = validator.validateGamut(ls[i], cs[i], neutralHue, `${name}${(i + 1) * 100}`);
          expect(result.errors).toEqual([]);
        }
      }
    });
  });

  describe('5 steps per family', () => {
    it('white has 5 steps', () => { expect(wL).toHaveLength(5); expect(wC).toHaveLength(5); });
    it('gray has 5 steps', () => { expect(gL).toHaveLength(5); expect(gC).toHaveLength(5); });
    it('black has 5 steps', () => { expect(bL).toHaveLength(5); expect(bC).toHaveLength(5); });
  });
});

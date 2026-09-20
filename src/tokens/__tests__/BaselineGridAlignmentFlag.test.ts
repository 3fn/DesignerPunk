/**
 * @category evergreen
 * @purpose Guard the system-wide baselineGridAlignment predicate against per-family drift
 */
/**
 * Baseline Grid Alignment Flag — system-wide predicate guard
 *
 * The `baselineGridAlignment` flag had drifted to three different meanings across
 * families: "multiple of 8" (spacing, radius), "multiple of 4" (sizing, blur,
 * shadow offset), and "not applicable" (border width, breakpoint, density). The same
 * value (4) therefore carried different flags in different families, which made the
 * flag unusable by the family-agnostic consumers that read it (TokenSelector's
 * selection reasoning, ValidationReasoning, ErrorValidator's flag-consistency check).
 *
 * Settled predicate:
 *   baselineGridAlignment === true
 *     iff baseValue is an exact multiple of 8
 *     AND the family participates in the baseline grid (dimensional families).
 *
 * Non-participating families always carry `false` (meaning "not applicable").
 * Sub-grid values (4, 12, 20) are `false` — valid values, not grid-aligned ones.
 */

import { describe, test, expect } from '@jest/globals';
import { TokenCategory } from '../../types/PrimitiveToken';
import type { PrimitiveToken } from '../../types/PrimitiveToken';

import { spacingTokens } from '../SpacingTokens';
import { radiusTokens } from '../RadiusTokens';
import { sizingTokens } from '../SizingTokens';
import { blur } from '../BlurTokens';
import { shadowOffsetX, shadowOffsetY } from '../ShadowOffsetTokens';
import { tapAreaTokens } from '../TapAreaTokens';
import { borderWidthTokens } from '../BorderWidthTokens';
import { breakpointTokens } from '../BreakpointTokens';
import { densityTokens } from '../DensityTokens';
import { fontSizeTokens } from '../FontSizeTokens';
import { lineHeightTokens } from '../LineHeightTokens';

const BASELINE_GRID_UNIT = 8;

/** Families whose values live in the dimensional coordinate space the baseline grid measures. */
const PARTICIPATING_CATEGORIES: TokenCategory[] = [
  TokenCategory.SPACING,
  TokenCategory.RADIUS,
  TokenCategory.SIZING,
  TokenCategory.BLUR,
  TokenCategory.SHADOW,
  TokenCategory.TAP_AREA,
  TokenCategory.FONT_SIZE
];

const participating: Array<[string, Record<string, PrimitiveToken>]> = [
  ['spacing', spacingTokens],
  ['radius', radiusTokens],
  ['sizing', sizingTokens],
  ['blur', blur],
  ['shadowOffsetX', shadowOffsetX],
  ['shadowOffsetY', shadowOffsetY],
  ['tapArea', tapAreaTokens],
  ['fontSize', fontSizeTokens]
];

const nonParticipating: Array<[string, Record<string, PrimitiveToken>]> = [
  ['borderWidth', borderWidthTokens],
  ['breakpoint', breakpointTokens],
  ['density', densityTokens],
  ['lineHeight', lineHeightTokens]
];

describe('baselineGridAlignment predicate', () => {
  describe('participating families: flag === (baseValue % 8 === 0)', () => {
    test.each(participating)('%s tokens', (_family, tokens) => {
      for (const token of Object.values(tokens)) {
        const aligned = Number.isInteger(token.baseValue) && token.baseValue % BASELINE_GRID_UNIT === 0;
        expect({ name: token.name, flag: token.baselineGridAlignment }).toEqual({
          name: token.name,
          flag: aligned
        });
      }
    });
  });

  describe('non-participating families: flag is always false (not applicable)', () => {
    test.each(nonParticipating)('%s tokens', (_family, tokens) => {
      for (const token of Object.values(tokens)) {
        expect({ name: token.name, flag: token.baselineGridAlignment }).toEqual({
          name: token.name,
          flag: false
        });
      }
    });
  });

  test('participating categories are the dimensional families', () => {
    for (const [, tokens] of participating) {
      for (const token of Object.values(tokens)) {
        expect(PARTICIPATING_CATEGORIES).toContain(token.category);
      }
    }
  });

  test('sub-grid values (4, 12, 20) are never flagged as grid-aligned', () => {
    const subGridValues = [4, 12, 20, -4, -12, -20];
    for (const [, tokens] of [...participating, ...nonParticipating]) {
      for (const token of Object.values(tokens)) {
        if (subGridValues.includes(token.baseValue)) {
          expect({ name: token.name, flag: token.baselineGridAlignment }).toEqual({
            name: token.name,
            flag: false
          });
        }
      }
    }
  });
});

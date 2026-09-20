/**
 * Tap Area Token Definitions
 * 
 * Tap area tokens use precision multipliers to achieve specific accessibility targets
 * while maintaining baseline grid alignment where possible.
 * Base value: 44 units — WCAG 2.5.5 Target Size (Level AAA), which also exceeds the
 * WCAG 2.2 AA minimum of 24×24 (SC 2.5.8 Target Size (Minimum)).
 * Mathematical progression: Precision-targeted multipliers for accessibility compliance
 */

import { PrimitiveToken, TokenCategory, PlatformValues } from '../types/PrimitiveToken';

/**
 * Tap area token base value for mathematical calculations
 * (WCAG 2.5.5 Target Size, Level AAA — 44×44)
 */
export const TAP_AREA_BASE_VALUE = 44;

/**
 * Generate platform values for tapArea tokens
 */
function generateTapAreaPlatformValues(baseValue: number): PlatformValues {
  return {
    web: { value: baseValue, unit: 'px' },
    ios: { value: baseValue, unit: 'pt' },
    android: { value: baseValue, unit: 'dp' }
  };
}

/**
 * TapArea tokens with precision multipliers for accessibility targets
 */
export const tapAreaTokens: Record<string, PrimitiveToken> = {
  tapAreaMinimum: {
    name: 'tapAreaMinimum',
    category: TokenCategory.TAP_AREA,
    baseValue: TAP_AREA_BASE_VALUE,
    familyBaseValue: TAP_AREA_BASE_VALUE,
    description: 'Minimum tap area - WCAG 2.5.5 Target Size, Level AAA (44pt); exceeds the 24pt WCAG 2.2 AA minimum (SC 2.5.8)',
    mathematicalRelationship: 'base × 1 = 44 × 1 = 44',
    baselineGridAlignment: false,
    isStrategicFlexibility: false,
    isPrecisionTargeted: true, // Precision multiplier for accessibility targets
    platforms: generateTapAreaPlatformValues(TAP_AREA_BASE_VALUE)
  },

  tapAreaRecommended: {
    name: 'tapAreaRecommended',
    category: TokenCategory.TAP_AREA,
    baseValue: Math.round(TAP_AREA_BASE_VALUE * 1.09), // ~48pt for better usability
    familyBaseValue: TAP_AREA_BASE_VALUE,
    description: 'Recommended tap area - enhanced usability (48pt)',
    mathematicalRelationship: 'base × 1.09 = 44 × 1.09 ≈ 48',
    baselineGridAlignment: true, // 48 aligns with 8-unit grid (8 × 6)
    isStrategicFlexibility: false,
    isPrecisionTargeted: true, // Precision multiplier for accessibility targets
    platforms: generateTapAreaPlatformValues(48)
  },

  tapAreaComfortable: {
    name: 'tapAreaComfortable',
    category: TokenCategory.TAP_AREA,
    baseValue: Math.round(TAP_AREA_BASE_VALUE * 1.27), // ~56pt for comfortable interaction
    familyBaseValue: TAP_AREA_BASE_VALUE,
    description: 'Comfortable tap area - spacious interaction (56pt)',
    mathematicalRelationship: 'base × 1.27 = 44 × 1.27 ≈ 56',
    baselineGridAlignment: true, // 56 aligns with 8-unit grid (8 × 7)
    isStrategicFlexibility: false,
    isPrecisionTargeted: true, // Precision multiplier for accessibility targets
    platforms: generateTapAreaPlatformValues(56)
  },

  tapAreaGenerous: {
    name: 'tapAreaGenerous',
    category: TokenCategory.TAP_AREA,
    baseValue: Math.round(TAP_AREA_BASE_VALUE * 1.45), // ~64pt for generous interaction
    familyBaseValue: TAP_AREA_BASE_VALUE,
    description: 'Generous tap area - extra spacious interaction (64pt)',
    mathematicalRelationship: 'base × 1.45 = 44 × 1.45 ≈ 64',
    baselineGridAlignment: true, // 64 aligns with 8-unit grid (8 × 8)
    isStrategicFlexibility: false,
    isPrecisionTargeted: true, // Precision multiplier for accessibility targets
    platforms: generateTapAreaPlatformValues(64)
  }
};

/**
 * Array of all tap area token names for iteration
 */
export const tapAreaTokenNames = Object.keys(tapAreaTokens);

/**
 * Get tap area token by name
 */
export function getTapAreaToken(name: string): PrimitiveToken | undefined {
  return tapAreaTokens[name];
}

/**
 * Get all tap area tokens as array
 */
export function getAllTapAreaTokens(): PrimitiveToken[] {
  return Object.values(tapAreaTokens);
}

/**
 * Validate tap area meets accessibility requirements
 *
 * Thresholds follow the WCAG success criteria, not platform guidelines:
 * - ≥44: SC 2.5.5 Target Size (Level AAA)
 * - ≥24: SC 2.5.8 Target Size (Minimum) (Level AA, WCAG 2.2)
 * - <24: below the AA minimum
 *
 * Note: SC 2.5.8 additionally allows targets under 24×24 when sufficient spacing
 * or an equivalent alternative exists. This function checks size only; spacing
 * exceptions must be evaluated in component context.
 */
export function validateTapAreaAccessibility(tapAreaValue: number): {
  isAccessible: boolean;
  level: 'AA' | 'AAA' | 'Below AA';
  recommendation?: string;
} {
  if (tapAreaValue >= TAP_AREA_BASE_VALUE) {
    return { isAccessible: true, level: 'AAA' };
  }

  if (tapAreaValue >= 24) {
    return { isAccessible: true, level: 'AA' };
  }

  return {
    isAccessible: false,
    level: 'Below AA',
    recommendation: `Increase tap area to at least 24pt for WCAG 2.2 AA compliance (SC 2.5.8), or ${TAP_AREA_BASE_VALUE}pt for Level AAA (SC 2.5.5)`
  };
}
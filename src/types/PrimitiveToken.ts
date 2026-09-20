/**
 * Primitive Token Interface and Token Category Enum
 * 
 * Defines the foundational token structure for the Mathematical Token System.
 * Primitive tokens represent the base mathematical values with systematic naming
 * that align with the baseline grid or strategic flexibility requirements.
 */

/**
 * Token categories for primitive tokens with per-family mathematical foundations
 */
export enum TokenCategory {
  SPACING = 'spacing',
  FONT_SIZE = 'fontSize',
  FONT_FAMILY = 'fontFamily',
  FONT_WEIGHT = 'fontWeight',
  LINE_HEIGHT = 'lineHeight',
  LETTER_SPACING = 'letterSpacing',
  RADIUS = 'radius',
  DENSITY = 'density',
  TAP_AREA = 'tapArea',
  COLOR = 'color',
  BORDER_WIDTH = 'borderWidth',
  SHADOW = 'shadow',
  GLOW = 'glow',
  OPACITY = 'opacity',
  BLEND = 'blend',
  BREAKPOINT = 'breakpoint',
  EASING = 'easing',
  DURATION = 'duration',
  SCALE = 'scale',
  BLUR = 'blur',
  SIZING = 'sizing'
}

/**
 * Mode and theme structure for color tokens
 */
export interface ModeThemeValues {
  base: string;  // Base aesthetic theme
  wcag: string;  // WCAG 2.2 compliant theme
}

/**
 * Color token value structure supporting light/dark modes with base/wcag themes
 */
export interface ColorTokenValue {
  light: ModeThemeValues;
  dark: ModeThemeValues;
}

/**
 * Platform-specific values for cross-platform consistency with per-family unit application
 * 
 * Unit types:
 * - Standard units: px, rem, pt, dp, sp, em
 * - Unitless: unitless (for line-height, font-weight, etc.)
 * - Typography: fontFamily, fontWeight
 * - Color: hex, rgba (RGBA format for native alpha channel support)
 * - Percentage: % (for percentage-based values like border-radius: 50%)
 * - Shape: shape (for platform-specific shape values like iOS Circle())
 * - Percent: percent (for numeric percentage values like Android 50%)
 */
export interface PlatformValues {
  web: { value: number | string | ColorTokenValue; unit: 'px' | 'rem' | 'unitless' | 'fontFamily' | 'fontWeight' | 'em' | 'hex' | 'rgba' | '%' };
  ios: { value: number | string | ColorTokenValue; unit: 'pt' | 'unitless' | 'fontFamily' | 'fontWeight' | 'em' | 'hex' | 'rgba' | 'shape' };
  android: { value: number | string | ColorTokenValue; unit: 'dp' | 'sp' | 'unitless' | 'fontFamily' | 'fontWeight' | 'em' | 'hex' | 'rgba' | 'percent' };
}

/**
 * Primitive token interface representing foundational unitless mathematical values
 */
export interface PrimitiveToken {
  /** Token name following systematic naming (e.g., "space100", "fontSize125", "lineHeight100") */
  name: string;
  
  /** Token category for organizational purposes */
  category: TokenCategory;
  
  /** Unitless base value for this specific token */
  baseValue: number;
  
  /** Base value for the entire token family (e.g., 8 for spacing family) */
  familyBaseValue: number;
  
  /** Description of mathematical meaning and usage */
  description: string;
  
  /** Mathematical relationship to family base value */
  mathematicalRelationship: string;
  
  /**
   * Whether the token aligns with the 8-unit baseline grid.
   *
   * Predicate (system-wide): `true` iff `baseValue` is an exact multiple of 8 AND the
   * token's family participates in the baseline grid (dimensional families — spacing,
   * radius, sizing, blur, shadow offset, tap area, font size). Non-participating families
   * (border width, breakpoint, density, and all non-dimensional families) always carry
   * `false`, meaning "not applicable".
   *
   * Values on the 4-unit subgrid (4, 12, 20) are `false`: valid values, not grid-aligned
   * ones. Enforcement of the grid itself is narrower than this flag — ErrorValidator and
   * PassValidator only *require* alignment for spacing and radius.
   *
   * Guarded by `src/tokens/__tests__/BaselineGridAlignmentFlag.test.ts`.
   */
  baselineGridAlignment: boolean;
  
  /** Whether token is a strategic flexibility exception within its family */
  isStrategicFlexibility: boolean;
  
  /** Whether token uses precision multipliers for systematic alignment */
  isPrecisionTargeted: boolean;
  
  /** Generated platform-specific values maintaining mathematical relationships */
  platforms: PlatformValues;

  /** Easing type discriminator — cubic bezier or piecewise linear */
  easingType?: 'cubicBezier' | 'linear';

  /** Piecewise linear stops as [time, progress] pairs (normalized 0–1). Required when easingType is 'linear'. */
  stops?: Array<[number, number]>;

  /** Paired duration in ms for piecewise linear easings (curve shape is time-scale dependent) */
  easingDuration?: number;
}
/**
 * Mathematical Token System - Type Definitions
 * 
 * Barrel export file for all TypeScript interfaces and enums used throughout
 * the Mathematical Token System. Provides a single import point for all types.
 */

// Primitive Token Types
export type { PrimitiveToken, PlatformValues, ColorTokenValue, ModeThemeValues } from './PrimitiveToken';
export { TokenCategory } from './PrimitiveToken';

// Semantic Token Types  
export type { SemanticToken, TokenModifier } from './SemanticToken';
export { SemanticCategory } from './SemanticToken';

// Validation Result Types
export type { 
  ValidationResult, 
  UsagePatternResult, 
  ConsistencyValidationResult,
  ValidationLevel 
} from './ValidationResult';

// Translation Output Types
export type { 
  TranslationOutput,
  UnitConversionConfig,
  FormatGenerationConfig, 
  PathOrganizationConfig,
  TargetPlatform,
  OutputFormat
} from './TranslationOutput';

// Component Types
export type { InsetPadding } from './ComponentTypes';

// Oklch color type (Spec 123 Task 2, 19A.7 — the two type-only Oklch escapes in
// src/tokens/color/primitives/{chromatic,neutral}.ts need a public home to
// resolve for consumer type-checking after `src/types` stops being copied;
// design.md C4's mapping table rewrites those escapes to `@3fn/core/types`).
export type { Oklch } from '../color/OklchConverter';

// Generated Token Name Types
export type {
  ColorTokenName,
  OpacityTokenName,
  ShadowTokenName,
} from './generated/TokenTypes';
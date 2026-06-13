/**
 * Platform Generation Error
 * 
 * Error class for platform-specific token generation failures.
 * Handles errors that occur during web, iOS, or Android token generation.
 */

import { BuildError, createBuildError, Platform, ErrorSeverity } from './BuildError';

/**
 * Platform generation error codes
 */
export const PlatformGenerationErrorCodes = {
  PLATFORM_CONVERSION_FAILED: 'PLATFORM_GEN_CONVERSION_FAILED',
  INVALID_PLATFORM_SYNTAX: 'PLATFORM_GEN_INVALID_SYNTAX',
  PLATFORM_SPECIFIC_FAILURE: 'PLATFORM_GEN_SPECIFIC_FAILURE',
  UNIT_CONVERSION_ERROR: 'PLATFORM_GEN_UNIT_CONVERSION',
  FORMAT_GENERATION_ERROR: 'PLATFORM_GEN_FORMAT_ERROR',
} as const;

/**
 * Create a platform generation error for conversion failures
 */
export function createPlatformConversionError(params: {
  platform: Platform;
  tokenName: string;
  tokenType: 'duration' | 'easing' | 'scale' | 'motion';
  reason: string;
  originalValue?: unknown;
  severity?: ErrorSeverity;
}): BuildError {
  const { platform, tokenName, tokenType, reason, originalValue, severity = 'error' } = params;
  
  return createBuildError({
    code: PlatformGenerationErrorCodes.PLATFORM_CONVERSION_FAILED,
    message: `Failed to convert ${tokenType} token '${tokenName}' for ${platform} platform: ${reason}`,
    severity,
    category: 'build',
    platform,
    context: {
      tokenName,
      tokenType,
      reason,
      originalValue,
    },
    suggestions: [
      `Review ${platform} platform generation logic for ${tokenType} tokens`,
      'Check token value format and type',
      `Verify ${platform} platform supports the token value`,
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
      `docs/platforms/${platform}-generation.md`,
    ],
  });
}

/**
 * Create a platform generation error for invalid syntax
 */
export function createInvalidPlatformSyntaxError(params: {
  platform: Platform;
  tokenName: string;
  tokenType: 'duration' | 'easing' | 'scale' | 'motion';
  generatedValue: string;
  syntaxError: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { platform, tokenName, tokenType, generatedValue, syntaxError, severity = 'error' } = params;
  
  return createBuildError({
    code: PlatformGenerationErrorCodes.INVALID_PLATFORM_SYNTAX,
    message: `Generated ${platform} syntax for token '${tokenName}' is invalid: ${syntaxError}`,
    severity,
    category: 'build',
    platform,
    context: {
      tokenName,
      tokenType,
      generatedValue,
      syntaxError,
    },
    suggestions: [
      `Fix ${platform} syntax generation for ${tokenType} tokens`,
      'Verify platform-specific formatting rules',
      'Check for special characters or invalid identifiers',
    ],
    documentation: [
      `docs/platforms/${platform}-generation.md`,
    ],
  });
}

/**
 * Create a platform generation error for platform-specific failures
 */
export function createPlatformSpecificError(params: {
  platform: Platform;
  operation: string;
  reason: string;
  component?: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { platform, operation, reason, component, severity = 'error' } = params;
  
  return createBuildError({
    code: PlatformGenerationErrorCodes.PLATFORM_SPECIFIC_FAILURE,
    message: `${platform} platform generation failed during ${operation}: ${reason}`,
    severity,
    category: 'build',
    platform,
    component,
    context: {
      operation,
      reason,
    },
    suggestions: [
      `Review ${platform} platform builder implementation`,
      `Check ${operation} operation for ${platform} platform`,
      'Verify platform-specific dependencies are available',
    ],
    documentation: [
      `docs/platforms/${platform}-generation.md`,
    ],
  });
}

/**
 * Create a platform generation error for unit conversion failures
 */
export function createUnitConversionError(params: {
  platform: Platform;
  tokenName: string;
  fromUnit: string;
  toUnit: string;
  value: number;
  reason: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { platform, tokenName, fromUnit, toUnit, value, reason, severity = 'error' } = params;
  
  return createBuildError({
    code: PlatformGenerationErrorCodes.UNIT_CONVERSION_ERROR,
    message: `Failed to convert token '${tokenName}' from ${fromUnit} to ${toUnit} for ${platform}: ${reason}`,
    severity,
    category: 'build',
    platform,
    context: {
      tokenName,
      fromUnit,
      toUnit,
      value,
      reason,
    },
    suggestions: [
      'Verify unit conversion logic in UnitConverter',
      `Check ${platform} platform unit requirements`,
      'Ensure token value is valid for conversion',
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
      `docs/platforms/${platform}-generation.md`,
    ],
  });
}

/**
 * Create a platform generation error for format generation failures
 */
export function createFormatGenerationError(params: {
  platform: Platform;
  tokenName: string;
  tokenType: 'duration' | 'easing' | 'scale' | 'motion';
  format: string;
  reason: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { platform, tokenName, tokenType, format, reason, severity = 'error' } = params;
  
  return createBuildError({
    code: PlatformGenerationErrorCodes.FORMAT_GENERATION_ERROR,
    message: `Failed to generate ${format} format for ${tokenType} token '${tokenName}' on ${platform}: ${reason}`,
    severity,
    category: 'build',
    platform,
    context: {
      tokenName,
      tokenType,
      format,
      reason,
    },
    suggestions: [
      `Review ${format} format generation for ${platform}`,
      'Check token value compatibility with format',
      'Verify format template is correct',
    ],
    documentation: [
      `docs/platforms/${platform}-generation.md`,
    ],
  });
}

/**
 * Token Generation Error
 * 
 * Error class for token generation failures, particularly when semantic tokens
 * reference invalid or non-existent primitive tokens.
 */

import { BuildError, createBuildError, ErrorSeverity } from './BuildError';

/**
 * Token generation error codes
 */
export const TokenGenerationErrorCodes = {
  INVALID_PRIMITIVE_REFERENCE: 'TOKEN_GEN_INVALID_PRIMITIVE_REF',
  MISSING_PRIMITIVE_TOKEN: 'TOKEN_GEN_MISSING_PRIMITIVE',
  INVALID_TOKEN_STRUCTURE: 'TOKEN_GEN_INVALID_STRUCTURE',
  CIRCULAR_REFERENCE: 'TOKEN_GEN_CIRCULAR_REFERENCE',
  TYPE_MISMATCH: 'TOKEN_GEN_TYPE_MISMATCH',
} as const;

/**
 * Create a token generation error for invalid primitive references
 */
export function createInvalidPrimitiveReferenceError(params: {
  tokenName: string;
  primitiveReference: string;
  tokenType: 'duration' | 'easing' | 'scale' | 'motion';
  availableTokens?: string[];
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, primitiveReference, tokenType, availableTokens, severity = 'error' } = params;
  
  const suggestions: string[] = [
    `Verify that primitive token '${primitiveReference}' exists in the corresponding primitive token file`,
    `Check ${tokenType} token definitions for correct primitive references`,
  ];
  
  if (availableTokens && availableTokens.length > 0) {
    suggestions.push(`Available ${tokenType} tokens: ${availableTokens.slice(0, 5).join(', ')}${availableTokens.length > 5 ? '...' : ''}`);
  }
  
  return createBuildError({
    code: TokenGenerationErrorCodes.INVALID_PRIMITIVE_REFERENCE,
    message: `Token '${tokenName}' references non-existent primitive token '${primitiveReference}'`,
    severity,
    category: 'token',
    context: {
      tokenName,
      primitiveReference,
      tokenType,
      availableTokens,
    },
    suggestions,
    documentation: [
      'docs/tokens/motion-tokens.md',
      'docs/token-system-overview.md',
    ],
  });
}

/**
 * Create a token generation error for missing primitive tokens
 */
export function createMissingPrimitiveTokenError(params: {
  tokenName: string;
  requiredPrimitives: string[];
  tokenType: 'duration' | 'easing' | 'scale' | 'motion';
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, requiredPrimitives, tokenType, severity = 'error' } = params;
  
  return createBuildError({
    code: TokenGenerationErrorCodes.MISSING_PRIMITIVE_TOKEN,
    message: `Token '${tokenName}' requires primitive tokens that do not exist: ${requiredPrimitives.join(', ')}`,
    severity,
    category: 'token',
    context: {
      tokenName,
      requiredPrimitives,
      tokenType,
    },
    suggestions: [
      `Define missing primitive tokens: ${requiredPrimitives.join(', ')}`,
      `Check ${tokenType} primitive token definitions`,
      'Verify token generation order (primitives must be generated before semantics)',
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
    ],
  });
}

/**
 * Create a token generation error for invalid token structure
 */
export function createInvalidTokenStructureError(params: {
  tokenName: string;
  reason: string;
  tokenType: 'duration' | 'easing' | 'scale' | 'motion';
  expectedStructure?: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, reason, tokenType, expectedStructure, severity = 'error' } = params;
  
  const suggestions: string[] = [
    `Fix token structure for '${tokenName}': ${reason}`,
    `Review ${tokenType} token interface requirements`,
  ];
  
  if (expectedStructure) {
    suggestions.push(`Expected structure: ${expectedStructure}`);
  }
  
  return createBuildError({
    code: TokenGenerationErrorCodes.INVALID_TOKEN_STRUCTURE,
    message: `Token '${tokenName}' has invalid structure: ${reason}`,
    severity,
    category: 'token',
    context: {
      tokenName,
      reason,
      tokenType,
      expectedStructure,
    },
    suggestions,
    documentation: [
      'docs/tokens/motion-tokens.md',
    ],
  });
}

/**
 * Create a token generation error for circular references
 */
export function createCircularReferenceError(params: {
  tokenName: string;
  referencePath: string[];
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, referencePath, severity = 'error' } = params;
  
  return createBuildError({
    code: TokenGenerationErrorCodes.CIRCULAR_REFERENCE,
    message: `Token '${tokenName}' has circular reference: ${referencePath.join(' → ')} → ${tokenName}`,
    severity,
    category: 'token',
    context: {
      tokenName,
      referencePath,
    },
    suggestions: [
      'Remove circular reference in token definitions',
      'Ensure tokens only reference primitives or previously defined tokens',
      'Review token dependency graph',
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
    ],
  });
}

/**
 * Create a token generation error for type mismatches
 */
export function createTypeMismatchError(params: {
  tokenName: string;
  expectedType: string;
  actualType: string;
  propertyName?: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, expectedType, actualType, propertyName, severity = 'error' } = params;
  
  const propertyInfo = propertyName ? ` for property '${propertyName}'` : '';
  
  return createBuildError({
    code: TokenGenerationErrorCodes.TYPE_MISMATCH,
    message: `Token '${tokenName}'${propertyInfo} has type mismatch: expected ${expectedType}, got ${actualType}`,
    severity,
    category: 'token',
    context: {
      tokenName,
      expectedType,
      actualType,
      propertyName,
    },
    suggestions: [
      `Ensure token value${propertyInfo} is of type ${expectedType}`,
      'Check token definition for correct types',
      'Verify primitive token types match semantic token expectations',
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
    ],
  });
}

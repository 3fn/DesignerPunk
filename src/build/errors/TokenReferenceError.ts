/**
 * Token Reference Error
 * 
 * Error class for token reference failures, when tokens reference
 * non-existent tokens or have invalid reference paths.
 */

import { BuildError, createBuildError, ErrorSeverity } from './BuildError';

/**
 * Token reference error codes
 */
export const TokenReferenceErrorCodes = {
  TOKEN_NOT_FOUND: 'TOKEN_REF_NOT_FOUND',
  INVALID_REFERENCE_PATH: 'TOKEN_REF_INVALID_PATH',
  AMBIGUOUS_REFERENCE: 'TOKEN_REF_AMBIGUOUS',
  REFERENCE_TYPE_MISMATCH: 'TOKEN_REF_TYPE_MISMATCH',
  UNRESOLVED_REFERENCE: 'TOKEN_REF_UNRESOLVED',
} as const;

/**
 * Create a token reference error for non-existent tokens
 */
export function createTokenNotFoundError(params: {
  tokenName: string;
  referencedBy?: string;
  tokenType?: 'duration' | 'easing' | 'scale' | 'motion';
  availableTokens?: string[];
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, referencedBy, tokenType, availableTokens, severity = 'error' } = params;
  
  const referencedByInfo = referencedBy ? ` (referenced by '${referencedBy}')` : '';
  const typeInfo = tokenType ? ` ${tokenType}` : '';
  
  const suggestions: string[] = [
    `Define${typeInfo} token '${tokenName}' before referencing it`,
    'Check for typos in token name',
  ];
  
  if (availableTokens && availableTokens.length > 0) {
    // Find similar token names (simple string similarity)
    const similarTokens = availableTokens.filter(token => 
      token.toLowerCase().includes(tokenName.toLowerCase()) ||
      tokenName.toLowerCase().includes(token.toLowerCase())
    );
    
    if (similarTokens.length > 0) {
      suggestions.push(`Did you mean one of these? ${similarTokens.slice(0, 3).join(', ')}`);
    } else {
      suggestions.push(`Available tokens: ${availableTokens.slice(0, 5).join(', ')}${availableTokens.length > 5 ? '...' : ''}`);
    }
  }
  
  return createBuildError({
    code: TokenReferenceErrorCodes.TOKEN_NOT_FOUND,
    message: `Token '${tokenName}' does not exist${referencedByInfo}`,
    severity,
    category: 'token',
    context: {
      tokenName,
      referencedBy,
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
 * Create a token reference error for invalid reference paths
 */
export function createInvalidReferencePathError(params: {
  tokenName: string;
  referencePath: string;
  reason: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, referencePath, reason, severity = 'error' } = params;
  
  return createBuildError({
    code: TokenReferenceErrorCodes.INVALID_REFERENCE_PATH,
    message: `Token '${tokenName}' has invalid reference path '${referencePath}': ${reason}`,
    severity,
    category: 'token',
    context: {
      tokenName,
      referencePath,
      reason,
    },
    suggestions: [
      'Use correct token reference format (e.g., "duration250", "easingStandard")',
      'Verify reference path follows token naming conventions',
      'Check for special characters or invalid identifiers',
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
    ],
  });
}

/**
 * Create a token reference error for ambiguous references
 */
export function createAmbiguousReferenceError(params: {
  tokenName: string;
  referencePath: string;
  matchingTokens: string[];
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, referencePath, matchingTokens, severity = 'warning' } = params;
  
  return createBuildError({
    code: TokenReferenceErrorCodes.AMBIGUOUS_REFERENCE,
    message: `Token '${tokenName}' has ambiguous reference '${referencePath}': matches multiple tokens`,
    severity,
    category: 'token',
    context: {
      tokenName,
      referencePath,
      matchingTokens,
    },
    suggestions: [
      'Use more specific token reference path',
      `Matching tokens: ${matchingTokens.join(', ')}`,
      'Specify full token path to avoid ambiguity',
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
    ],
  });
}

/**
 * Create a token reference error for type mismatches
 */
export function createReferenceTypeMismatchError(params: {
  tokenName: string;
  referencedToken: string;
  expectedType: string;
  actualType: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, referencedToken, expectedType, actualType, severity = 'error' } = params;
  
  return createBuildError({
    code: TokenReferenceErrorCodes.REFERENCE_TYPE_MISMATCH,
    message: `Token '${tokenName}' references '${referencedToken}' with type mismatch: expected ${expectedType}, got ${actualType}`,
    severity,
    category: 'token',
    context: {
      tokenName,
      referencedToken,
      expectedType,
      actualType,
    },
    suggestions: [
      `Reference a ${expectedType} token instead of ${actualType}`,
      'Check token type compatibility',
      'Verify referenced token is of correct type',
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
    ],
  });
}

/**
 * Create a token reference error for unresolved references
 */
export function createUnresolvedReferenceError(params: {
  tokenName: string;
  unresolvedReferences: string[];
  reason?: string;
  severity?: ErrorSeverity;
}): BuildError {
  const { tokenName, unresolvedReferences, reason, severity = 'error' } = params;
  
  const reasonInfo = reason ? `: ${reason}` : '';
  
  return createBuildError({
    code: TokenReferenceErrorCodes.UNRESOLVED_REFERENCE,
    message: `Token '${tokenName}' has unresolved references${reasonInfo}`,
    severity,
    category: 'token',
    context: {
      tokenName,
      unresolvedReferences,
      reason,
    },
    suggestions: [
      `Resolve references: ${unresolvedReferences.join(', ')}`,
      'Ensure all referenced tokens are defined',
      'Check token generation order',
    ],
    documentation: [
      'docs/tokens/motion-tokens.md',
    ],
  });
}

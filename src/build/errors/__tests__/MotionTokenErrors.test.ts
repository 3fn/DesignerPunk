/**
 * @category evergreen
 * @purpose Verify build system generates required outputs with correct structure
 */
/**
 * Motion Token Error Tests
 * 
 * Tests for motion token-specific error classes:
 * - TokenGenerationError
 * - PlatformGenerationError
 * - TokenReferenceError
 */

import {
  // Token generation errors
  TokenGenerationErrorCodes,
  createInvalidPrimitiveReferenceError,
  createMissingPrimitiveTokenError,
  createInvalidTokenStructureError,
  createCircularReferenceError,
  createTypeMismatchError,
  // Platform generation errors
  PlatformGenerationErrorCodes,
  createPlatformConversionError,
  createInvalidPlatformSyntaxError,
  createPlatformSpecificError,
  createUnitConversionError,
  createFormatGenerationError,
  // Token reference errors
  TokenReferenceErrorCodes,
  createTokenNotFoundError,
  createInvalidReferencePathError,
  createAmbiguousReferenceError,
  createReferenceTypeMismatchError,
  createUnresolvedReferenceError,
  // Base types
  isBuildError,
} from '../index';

describe('TokenGenerationError', () => {
  describe('createInvalidPrimitiveReferenceError', () => {
    it('should create error with correct structure', () => {
      const error = createInvalidPrimitiveReferenceError({
        tokenName: 'motion.floatLabel',
        primitiveReference: 'duration999',
        tokenType: 'motion',
        availableTokens: ['duration150', 'duration250', 'duration350'],
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenGenerationErrorCodes.INVALID_PRIMITIVE_REFERENCE);
      expect(error.message).toContain('motion.floatLabel');
      expect(error.message).toContain('duration999');
      expect(error.severity).toBe('error');
      expect(error.category).toBe('token');
      expect(error.context.tokenName).toBe('motion.floatLabel');
      expect(error.context.primitiveReference).toBe('duration999');
      expect(error.suggestions.length).toBeGreaterThan(0);
    });
    
    it('should include available tokens in suggestions', () => {
      const error = createInvalidPrimitiveReferenceError({
        tokenName: 'motion.test',
        primitiveReference: 'invalid',
        tokenType: 'duration',
        availableTokens: ['duration150', 'duration250'],
      });
      
      const suggestionsText = error.suggestions.join(' ');
      expect(suggestionsText).toContain('duration150');
      expect(suggestionsText).toContain('duration250');
    });
  });
  
  describe('createMissingPrimitiveTokenError', () => {
    it('should create error with correct structure', () => {
      const error = createMissingPrimitiveTokenError({
        tokenName: 'motion.custom',
        requiredPrimitives: ['duration500', 'easingCustom'],
        tokenType: 'motion',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenGenerationErrorCodes.MISSING_PRIMITIVE_TOKEN);
      expect(error.message).toContain('motion.custom');
      expect(error.message).toContain('duration500');
      expect(error.message).toContain('easingCustom');
      expect(error.context.requiredPrimitives).toEqual(['duration500', 'easingCustom']);
    });
  });
  
  describe('createInvalidTokenStructureError', () => {
    it('should create error with correct structure', () => {
      const error = createInvalidTokenStructureError({
        tokenName: 'motion.invalid',
        reason: 'missing primitiveReferences property',
        tokenType: 'motion',
        expectedStructure: '{ name, primitiveReferences, category }',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenGenerationErrorCodes.INVALID_TOKEN_STRUCTURE);
      expect(error.message).toContain('motion.invalid');
      expect(error.message).toContain('missing primitiveReferences property');
      expect(error.context.expectedStructure).toBe('{ name, primitiveReferences, category }');
    });
  });
  
  describe('createCircularReferenceError', () => {
    it('should create error with correct structure', () => {
      const error = createCircularReferenceError({
        tokenName: 'motion.circular',
        referencePath: ['motion.a', 'motion.b', 'motion.c'],
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenGenerationErrorCodes.CIRCULAR_REFERENCE);
      expect(error.message).toContain('circular reference');
      expect(error.message).toContain('motion.a → motion.b → motion.c');
      expect(error.context.referencePath).toEqual(['motion.a', 'motion.b', 'motion.c']);
    });
  });
  
  describe('createTypeMismatchError', () => {
    it('should create error with correct structure', () => {
      const error = createTypeMismatchError({
        tokenName: 'motion.test',
        expectedType: 'number',
        actualType: 'string',
        propertyName: 'duration',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenGenerationErrorCodes.TYPE_MISMATCH);
      expect(error.message).toContain('motion.test');
      expect(error.message).toContain('duration');
      expect(error.message).toContain('number');
      expect(error.message).toContain('string');
      expect(error.context.propertyName).toBe('duration');
    });
  });
});

describe('PlatformGenerationError', () => {
  describe('createPlatformConversionError', () => {
    it('should create error with correct structure', () => {
      const error = createPlatformConversionError({
        platform: 'ios',
        tokenName: 'duration250',
        tokenType: 'duration',
        reason: 'invalid millisecond value',
        originalValue: 'invalid',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(PlatformGenerationErrorCodes.PLATFORM_CONVERSION_FAILED);
      expect(error.message).toContain('ios');
      expect(error.message).toContain('duration250');
      expect(error.message).toContain('invalid millisecond value');
      expect(error.platform).toBe('ios');
      expect(error.category).toBe('build');
      expect(error.context.originalValue).toBe('invalid');
    });
  });
  
  describe('createInvalidPlatformSyntaxError', () => {
    it('should create error with correct structure', () => {
      const error = createInvalidPlatformSyntaxError({
        platform: 'android',
        tokenName: 'easingStandard',
        tokenType: 'easing',
        generatedValue: 'CubicBezierEasing(invalid)',
        syntaxError: 'invalid parameter format',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(PlatformGenerationErrorCodes.INVALID_PLATFORM_SYNTAX);
      expect(error.message).toContain('android');
      expect(error.message).toContain('easingStandard');
      expect(error.message).toContain('invalid parameter format');
      expect(error.platform).toBe('android');
      expect(error.context.generatedValue).toBe('CubicBezierEasing(invalid)');
    });
  });
  
  describe('createPlatformSpecificError', () => {
    it('should create error with correct structure', () => {
      const error = createPlatformSpecificError({
        platform: 'web',
        operation: 'CSS generation',
        reason: 'file write failed',
        component: 'WebBuilder',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(PlatformGenerationErrorCodes.PLATFORM_SPECIFIC_FAILURE);
      expect(error.message).toContain('web');
      expect(error.message).toContain('CSS generation');
      expect(error.message).toContain('file write failed');
      expect(error.platform).toBe('web');
      expect(error.component).toBe('WebBuilder');
    });
  });
  
  describe('createUnitConversionError', () => {
    it('should create error with correct structure', () => {
      const error = createUnitConversionError({
        platform: 'ios',
        tokenName: 'duration250',
        fromUnit: 'milliseconds',
        toUnit: 'seconds',
        value: 250,
        reason: 'conversion factor not found',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(PlatformGenerationErrorCodes.UNIT_CONVERSION_ERROR);
      expect(error.message).toContain('duration250');
      expect(error.message).toContain('milliseconds');
      expect(error.message).toContain('seconds');
      expect(error.platform).toBe('ios');
      expect(error.context.value).toBe(250);
    });
  });
  
  describe('createFormatGenerationError', () => {
    it('should create error with correct structure', () => {
      const error = createFormatGenerationError({
        platform: 'android',
        tokenName: 'motion.floatLabel',
        tokenType: 'motion',
        format: 'Kotlin object',
        reason: 'invalid property name',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(PlatformGenerationErrorCodes.FORMAT_GENERATION_ERROR);
      expect(error.message).toContain('motion.floatLabel');
      expect(error.message).toContain('Kotlin object');
      expect(error.message).toContain('invalid property name');
      expect(error.platform).toBe('android');
    });
  });
});

describe('TokenReferenceError', () => {
  describe('createTokenNotFoundError', () => {
    it('should create error with correct structure', () => {
      const error = createTokenNotFoundError({
        tokenName: 'duration999',
        referencedBy: 'motion.custom',
        tokenType: 'duration',
        availableTokens: ['duration150', 'duration250', 'duration350'],
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenReferenceErrorCodes.TOKEN_NOT_FOUND);
      expect(error.message).toContain('duration999');
      expect(error.message).toContain('motion.custom');
      expect(error.category).toBe('token');
      expect(error.context.availableTokens).toEqual(['duration150', 'duration250', 'duration350']);
    });
    
    it('should suggest similar token names', () => {
      const error = createTokenNotFoundError({
        tokenName: 'duration25',
        tokenType: 'duration',
        availableTokens: ['duration150', 'duration250', 'duration350'],
      });
      
      const suggestionsText = error.suggestions.join(' ');
      expect(suggestionsText).toContain('duration250');
    });
  });
  
  describe('createInvalidReferencePathError', () => {
    it('should create error with correct structure', () => {
      const error = createInvalidReferencePathError({
        tokenName: 'motion.test',
        referencePath: 'invalid.path.here',
        reason: 'too many segments',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenReferenceErrorCodes.INVALID_REFERENCE_PATH);
      expect(error.message).toContain('motion.test');
      expect(error.message).toContain('invalid.path.here');
      expect(error.message).toContain('too many segments');
      expect(error.context.referencePath).toBe('invalid.path.here');
    });
  });
  
  describe('createAmbiguousReferenceError', () => {
    it('should create error with correct structure', () => {
      const error = createAmbiguousReferenceError({
        tokenName: 'motion.test',
        referencePath: 'duration',
        matchingTokens: ['duration150', 'duration250', 'duration350'],
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenReferenceErrorCodes.AMBIGUOUS_REFERENCE);
      expect(error.message).toContain('ambiguous');
      expect(error.severity).toBe('warning');
      expect(error.context.matchingTokens).toEqual(['duration150', 'duration250', 'duration350']);
    });
  });
  
  describe('createReferenceTypeMismatchError', () => {
    it('should create error with correct structure', () => {
      const error = createReferenceTypeMismatchError({
        tokenName: 'motion.test',
        referencedToken: 'color.primary',
        expectedType: 'duration',
        actualType: 'color',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenReferenceErrorCodes.REFERENCE_TYPE_MISMATCH);
      expect(error.message).toContain('motion.test');
      expect(error.message).toContain('color.primary');
      expect(error.message).toContain('duration');
      expect(error.message).toContain('color');
      expect(error.context.expectedType).toBe('duration');
      expect(error.context.actualType).toBe('color');
    });
  });
  
  describe('createUnresolvedReferenceError', () => {
    it('should create error with correct structure', () => {
      const error = createUnresolvedReferenceError({
        tokenName: 'motion.complex',
        unresolvedReferences: ['duration999', 'easingCustom'],
        reason: 'tokens not defined',
      });
      
      expect(isBuildError(error)).toBe(true);
      expect(error.code).toBe(TokenReferenceErrorCodes.UNRESOLVED_REFERENCE);
      expect(error.message).toContain('motion.complex');
      expect(error.message).toContain('tokens not defined');
      expect(error.context.unresolvedReferences).toEqual(['duration999', 'easingCustom']);
    });
  });
});

describe('Error Integration', () => {
  it('should create actionable error messages', () => {
    const error = createInvalidPrimitiveReferenceError({
      tokenName: 'motion.floatLabel',
      primitiveReference: 'duration999',
      tokenType: 'motion',
      availableTokens: ['duration150', 'duration250', 'duration350'],
    });
    
    expect(error.suggestions.length).toBeGreaterThan(0);
    expect(error.documentation.length).toBeGreaterThan(0);
    expect(error.timestamp).toBeInstanceOf(Date);
  });
  
  it('should provide context for debugging', () => {
    const error = createPlatformConversionError({
      platform: 'ios',
      tokenName: 'duration250',
      tokenType: 'duration',
      reason: 'invalid value',
      originalValue: { invalid: 'data' },
    });
    
    expect(error.context.tokenName).toBe('duration250');
    expect(error.context.tokenType).toBe('duration');
    expect(error.context.reason).toBe('invalid value');
    expect(error.context.originalValue).toEqual({ invalid: 'data' });
  });
  
  it('should support custom severity levels', () => {
    const warningError = createAmbiguousReferenceError({
      tokenName: 'motion.test',
      referencePath: 'duration',
      matchingTokens: ['duration150', 'duration250'],
      severity: 'warning',
    });
    
    expect(warningError.severity).toBe('warning');
    
    const criticalError = createTokenNotFoundError({
      tokenName: 'critical',
      severity: 'error',
    });
    
    expect(criticalError.severity).toBe('error');
  });
});

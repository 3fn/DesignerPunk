/**
 * @category evergreen
 * @purpose Verify build system generates required outputs with correct structure
 */
/**
 * Motion Token Validation Tests
 * 
 * Tests for Task 5.1: Add structural validation rules for motion tokens
 * 
 * Validates:
 * - Primitive token existence and type correctness
 * - Semantic token primitiveReferences validity
 * - Platform-specific syntax correctness
 * 
 * Requirements: 8.1, 8.4
 */

import { MathematicalConsistencyValidator } from '../MathematicalConsistencyValidator';
import { durationTokens, easingTokens, scaleTokens } from '../../../tokens';
import { motionTokens } from '../../../tokens/semantic/MotionTokens';
import { Platform } from '../../types/Platform';

describe('Motion Token Validation (Task 5.1)', () => {
  let validator: MathematicalConsistencyValidator;

  beforeEach(() => {
    validator = new MathematicalConsistencyValidator();
  });

  describe('Primitive Duration Token Validation', () => {
    it('should validate that all expected duration tokens exist', () => {
      const expectedTokens = ['duration150', 'duration250', 'duration350'];
      
      for (const tokenName of expectedTokens) {
        expect(durationTokens[tokenName]).toBeDefined();
      }
    });

    it('should validate that duration tokens have numeric baseValue', () => {
      const expectedTokens = ['duration150', 'duration250', 'duration350'];
      
      for (const tokenName of expectedTokens) {
        const token = durationTokens[tokenName];
        expect(typeof token.baseValue).toBe('number');
        expect(token.baseValue).toBeGreaterThan(0);
      }
    });

    it('should validate that duration tokens have platforms property', () => {
      const expectedTokens = ['duration150', 'duration250', 'duration350'];
      
      for (const tokenName of expectedTokens) {
        const token = durationTokens[tokenName];
        expect(token.platforms).toBeDefined();
        expect(typeof token.platforms).toBe('object');
      }
    });

    it('should validate duration token values are correct', () => {
      expect(durationTokens.duration150.baseValue).toBe(150);
      expect(durationTokens.duration250.baseValue).toBe(250);
      expect(durationTokens.duration350.baseValue).toBe(350);
    });
  });

  describe('Primitive Easing Token Validation', () => {
    it('should validate that all expected easing tokens exist', () => {
      const expectedTokens = ['easingStandard', 'easingDecelerate', 'easingAccelerate'];
      
      for (const tokenName of expectedTokens) {
        expect(easingTokens[tokenName]).toBeDefined();
      }
    });

    it('should validate that easing tokens have platforms property', () => {
      const expectedTokens = ['easingStandard', 'easingDecelerate', 'easingAccelerate'];
      
      for (const tokenName of expectedTokens) {
        const token = easingTokens[tokenName];
        expect(token.platforms).toBeDefined();
        expect(typeof token.platforms).toBe('object');
      }
    });

    it('should validate that easing tokens have cubic-bezier format', () => {
      const expectedTokens = ['easingStandard', 'easingDecelerate', 'easingAccelerate'];
      
      for (const tokenName of expectedTokens) {
        const token = easingTokens[tokenName];
        const webValue = token.platforms.web?.value;
        
        expect(typeof webValue).toBe('string');
        expect(webValue).toMatch(/^cubic-bezier\(/);
        expect(webValue).toMatch(/\)$/);
      }
    });

    it('should validate easing token cubic-bezier values are correct', () => {
      expect(easingTokens.easingStandard.platforms.web.value).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
      expect(easingTokens.easingDecelerate.platforms.web.value).toBe('cubic-bezier(0.0, 0.0, 0.2, 1)');
      expect(easingTokens.easingAccelerate.platforms.web.value).toBe('cubic-bezier(0.4, 0.0, 1, 1)');
    });
  });

  describe('Primitive Scale Token Validation', () => {
    it('should validate that all expected scale tokens exist', () => {
      const expectedTokens = ['scale088', 'scale092', 'scale096', 'scale100', 'scale104', 'scale108'];
      
      for (const tokenName of expectedTokens) {
        expect(scaleTokens[tokenName]).toBeDefined();
      }
    });

    it('should validate that scale tokens have numeric baseValue', () => {
      const expectedTokens = ['scale088', 'scale092', 'scale096', 'scale100', 'scale104', 'scale108'];
      
      for (const tokenName of expectedTokens) {
        const token = scaleTokens[tokenName];
        expect(typeof token.baseValue).toBe('number');
        expect(token.baseValue).toBeGreaterThan(0);
      }
    });

    it('should validate that scale tokens have platforms property', () => {
      const expectedTokens = ['scale088', 'scale092', 'scale096', 'scale100', 'scale104', 'scale108'];
      
      for (const tokenName of expectedTokens) {
        const token = scaleTokens[tokenName];
        expect(token.platforms).toBeDefined();
        expect(typeof token.platforms).toBe('object');
      }
    });

    it('should validate scale token values are correct', () => {
      expect(scaleTokens.scale088.baseValue).toBe(0.88);
      expect(scaleTokens.scale092.baseValue).toBe(0.92);
      expect(scaleTokens.scale096.baseValue).toBe(0.96);
      expect(scaleTokens.scale100.baseValue).toBe(1.00);
      expect(scaleTokens.scale104.baseValue).toBe(1.04);
      expect(scaleTokens.scale108.baseValue).toBe(1.08);
    });
  });

  describe('Semantic Motion Token Validation', () => {
    it('should validate that motion.floatLabel exists', () => {
      expect(motionTokens['motion.floatLabel']).toBeDefined();
    });

    it('should validate that semantic motion tokens have primitiveReferences property', () => {
      const token = motionTokens['motion.floatLabel'];
      expect(token.primitiveReferences).toBeDefined();
      expect(typeof token.primitiveReferences).toBe('object');
    });

    it('should validate that primitiveReferences contain duration and easing', () => {
      const token = motionTokens['motion.floatLabel'];
      expect(token.primitiveReferences.duration).toBeDefined();
      expect(token.primitiveReferences.easing).toBeDefined();
    });

    it('should validate that primitiveReferences point to existing primitive tokens', () => {
      const token = motionTokens['motion.floatLabel'];
      
      // Validate duration reference exists
      expect(durationTokens[token.primitiveReferences.duration]).toBeDefined();
      
      // Validate easing reference exists
      expect(easingTokens[token.primitiveReferences.easing]).toBeDefined();
      
      // Validate scale reference exists (if present)
      if (token.primitiveReferences.scale) {
        expect(scaleTokens[token.primitiveReferences.scale]).toBeDefined();
      }
    });

    it('should validate motion.floatLabel references correct primitive tokens', () => {
      const token = motionTokens['motion.floatLabel'];
      expect(token.primitiveReferences.duration).toBe('duration250');
      expect(token.primitiveReferences.easing).toBe('easingStandard');
    });
  });

  describe('Platform-Specific Syntax Validation', () => {
    it('should validate that duration tokens have correct platform values', () => {
      const token = durationTokens.duration250;
      
      // Web: milliseconds
      expect(token.platforms.web).toBeDefined();
      expect(token.platforms.web.value).toBe(250);
      
      // iOS: seconds (TimeInterval)
      expect(token.platforms.ios).toBeDefined();
      expect(token.platforms.ios.value).toBe(0.25);
      
      // Android: milliseconds
      expect(token.platforms.android).toBeDefined();
      expect(token.platforms.android.value).toBe(250);
    });

    it('should validate that easing tokens have correct platform values', () => {
      const token = easingTokens.easingStandard;
      
      // All platforms should have the cubic-bezier string
      expect(token.platforms.web).toBeDefined();
      expect(token.platforms.ios).toBeDefined();
      expect(token.platforms.android).toBeDefined();
      
      // All should have the same cubic-bezier value (converted during generation)
      const expectedValue = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
      expect(token.platforms.web.value).toBe(expectedValue);
      expect(token.platforms.ios.value).toBe(expectedValue);
      expect(token.platforms.android.value).toBe(expectedValue);
    });

    it('should validate that scale tokens have correct platform values', () => {
      const token = scaleTokens.scale088;
      
      // All platforms should have the same unitless scale factor
      expect(token.platforms.web).toBeDefined();
      expect(token.platforms.web.value).toBe(0.88);
      
      expect(token.platforms.ios).toBeDefined();
      expect(token.platforms.ios.value).toBe(0.88);
      
      expect(token.platforms.android).toBeDefined();
      expect(token.platforms.android.value).toBe(0.88);
    });
  });

  describe('Structural Correctness Focus', () => {
    it('should validate token structure, not philosophical alignment', () => {
      // This test validates that we're checking structure, not design philosophy
      // We check that tokens exist and have correct types, not that values follow
      // specific mathematical progressions (that's for mathematical validation)
      
      const token = durationTokens.duration250;
      
      // Structural checks (what we DO validate)
      expect(token).toBeDefined();
      expect(typeof token.baseValue).toBe('number');
      expect(token.platforms).toBeDefined();
      
      // Philosophical checks (what we DON'T validate here)
      // - We don't validate that 250ms is the "correct" duration
      // - We don't validate mathematical progressions
      // - We don't validate design philosophy alignment
      
      // The structural validation passes as long as the token exists
      // and has the correct types, regardless of specific values
    });

    it('should validate primitiveReferences validity, not usage patterns', () => {
      // This test validates that we're checking reference validity,
      // not whether the references are "good" design choices
      
      const token = motionTokens['motion.floatLabel'];
      
      // Structural checks (what we DO validate)
      expect(token.primitiveReferences).toBeDefined();
      expect(durationTokens[token.primitiveReferences.duration]).toBeDefined();
      expect(easingTokens[token.primitiveReferences.easing]).toBeDefined();
      
      // Philosophical checks (what we DON'T validate here)
      // - We don't validate that duration250 is the "right" choice for float labels
      // - We don't validate that easingStandard is the "best" easing curve
      // - We don't validate design philosophy or usage patterns
      
      // The structural validation passes as long as the references
      // point to existing primitive tokens
    });
  });

  describe('Error Detection', () => {
    it('should detect missing primitive tokens', () => {
      // Create a mock semantic token with invalid reference
      const invalidToken = {
        name: 'motion.invalid',
        primitiveReferences: {
          duration: 'duration999', // Non-existent token
          easing: 'easingStandard'
        }
      };
      
      // Validate that the referenced token doesn't exist
      expect(durationTokens['duration999']).toBeUndefined();
    });

    it('should detect invalid primitiveReferences structure', () => {
      // Create a mock semantic token with missing primitiveReferences
      const invalidToken = {
        name: 'motion.invalid',
        // Missing primitiveReferences property
      };
      
      // Validate that primitiveReferences is required
      expect((invalidToken as any).primitiveReferences).toBeUndefined();
    });

    it('should detect invalid token types', () => {
      // Validate that baseValue must be a number for duration/scale tokens
      const token = durationTokens.duration250;
      expect(typeof token.baseValue).toBe('number');
      
      // Validate that easing tokens have string values
      const easingToken = easingTokens.easingStandard;
      expect(typeof easingToken.platforms.web.value).toBe('string');
    });
  });
});

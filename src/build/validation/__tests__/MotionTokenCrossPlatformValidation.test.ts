/**
 * @category evergreen
 * @purpose Verify build system generates required outputs with correct structure
 */
/**
 * Motion Token Cross-Platform Equivalence Validation Tests
 * 
 * Tests cross-platform validation for motion tokens:
 * - Duration tokens: web ms = iOS seconds × 1000 = Android ms
 * - Easing tokens: cubic-bezier curves are mathematically equivalent
 * - Scale tokens: unitless values are identical across platforms
 * 
 * Requirements: 6.8
 * Task: 5.2 Add cross-platform equivalence validation
 */

import { CrossPlatformValidationReporter } from '../CrossPlatformValidationReporter';
import { TokenComparator } from '../TokenComparator';
import { PrimitiveTokenRegistry } from '../../../registries/PrimitiveTokenRegistry';
import { SemanticTokenRegistry } from '../../../registries/SemanticTokenRegistry';
import { durationTokens } from '../../../tokens/DurationTokens';
import { easingTokens } from '../../../tokens/EasingTokens';
import { scaleTokens } from '../../../tokens/ScaleTokens';
import { Platform } from '../../tokens/types';

describe('Motion Token Cross-Platform Equivalence Validation', () => {
  let reporter: CrossPlatformValidationReporter;
  let comparator: TokenComparator;
  let primitiveRegistry: PrimitiveTokenRegistry;
  let semanticRegistry: SemanticTokenRegistry;

  beforeEach(() => {
    reporter = new CrossPlatformValidationReporter();
    primitiveRegistry = new PrimitiveTokenRegistry();
    semanticRegistry = new SemanticTokenRegistry(primitiveRegistry);
    comparator = new TokenComparator(primitiveRegistry, semanticRegistry);
  });

  describe('Duration Token Equivalence', () => {
    it('should validate duration150: web ms = iOS seconds × 1000 = Android ms', () => {
      const result = reporter.validateMotionTokenEquivalence(
        { duration150: durationTokens.duration150 },
        {},
        {}
      );

      const duration150Result = result.durationResults.find(r => r.token === 'duration150');
      expect(duration150Result).toBeDefined();
      expect(duration150Result?.valid).toBe(true);
      expect(duration150Result?.message).toContain('150ms');
      expect(duration150Result?.message).toContain('0.15s');
    });

    it('should validate duration250: web ms = iOS seconds × 1000 = Android ms', () => {
      const result = reporter.validateMotionTokenEquivalence(
        { duration250: durationTokens.duration250 },
        {},
        {}
      );

      const duration250Result = result.durationResults.find(r => r.token === 'duration250');
      expect(duration250Result).toBeDefined();
      expect(duration250Result?.valid).toBe(true);
      expect(duration250Result?.message).toContain('250ms');
      expect(duration250Result?.message).toContain('0.25s');
    });

    it('should validate duration350: web ms = iOS seconds × 1000 = Android ms', () => {
      const result = reporter.validateMotionTokenEquivalence(
        { duration350: durationTokens.duration350 },
        {},
        {}
      );

      const duration350Result = result.durationResults.find(r => r.token === 'duration350');
      expect(duration350Result).toBeDefined();
      expect(duration350Result?.valid).toBe(true);
      expect(duration350Result?.message).toContain('350ms');
      expect(duration350Result?.message).toContain('0.35s');
    });

    it('should detect duration token mismatch', () => {
      const invalidToken = {
        ...durationTokens.duration250,
        platforms: {
          web: { value: 250, unit: 'unitless' },
          ios: { value: 0.3, unit: 'unitless' }, // Wrong: should be 0.25
          android: { value: 250, unit: 'unitless' }
        }
      };

      const result = reporter.validateMotionTokenEquivalence(
        { duration250: invalidToken },
        {},
        {}
      );

      const duration250Result = result.durationResults.find(r => r.token === 'duration250');
      expect(duration250Result).toBeDefined();
      expect(duration250Result?.valid).toBe(false);
      expect(duration250Result?.message).toContain('mismatch');
    });
  });

  describe('Easing Token Equivalence', () => {
    it('should validate easingStandard: cubic-bezier curves are equivalent', () => {
      const result = reporter.validateMotionTokenEquivalence(
        {},
        { easingStandard: easingTokens.easingStandard },
        {}
      );

      const easingStandardResult = result.easingResults.find(r => r.token === 'easingStandard');
      expect(easingStandardResult).toBeDefined();
      expect(easingStandardResult?.valid).toBe(true);
      expect(easingStandardResult?.message).toContain('cubic-bezier(0.4, 0.0, 0.2, 1)');
    });

    it('should validate easingDecelerate: cubic-bezier curves are equivalent', () => {
      const result = reporter.validateMotionTokenEquivalence(
        {},
        { easingDecelerate: easingTokens.easingDecelerate },
        {}
      );

      const easingDecelerateResult = result.easingResults.find(r => r.token === 'easingDecelerate');
      expect(easingDecelerateResult).toBeDefined();
      expect(easingDecelerateResult?.valid).toBe(true);
      expect(easingDecelerateResult?.message).toContain('cubic-bezier(0.0, 0.0, 0.2, 1)');
    });

    it('should validate easingAccelerate: cubic-bezier curves are equivalent', () => {
      const result = reporter.validateMotionTokenEquivalence(
        {},
        { easingAccelerate: easingTokens.easingAccelerate },
        {}
      );

      const easingAccelerateResult = result.easingResults.find(r => r.token === 'easingAccelerate');
      expect(easingAccelerateResult).toBeDefined();
      expect(easingAccelerateResult?.valid).toBe(true);
      expect(easingAccelerateResult?.message).toContain('cubic-bezier(0.4, 0.0, 1, 1)');
    });

    it('should detect easing curve mismatch', () => {
      const invalidToken = {
        ...easingTokens.easingStandard,
        platforms: {
          web: { value: 'cubic-bezier(0.4, 0.0, 0.2, 1)', unit: 'unitless' },
          ios: { value: 'cubic-bezier(0.5, 0.0, 0.2, 1)', unit: 'unitless' }, // Wrong curve
          android: { value: 'cubic-bezier(0.4, 0.0, 0.2, 1)', unit: 'unitless' }
        }
      };

      const result = reporter.validateMotionTokenEquivalence(
        {},
        { easingStandard: invalidToken },
        {}
      );

      const easingStandardResult = result.easingResults.find(r => r.token === 'easingStandard');
      expect(easingStandardResult).toBeDefined();
      expect(easingStandardResult?.valid).toBe(false);
      expect(easingStandardResult?.message).toContain('mismatch');
    });
  });

  describe('Scale Token Equivalence', () => {
    it('should validate scale088: unitless values are identical', () => {
      const result = reporter.validateMotionTokenEquivalence(
        {},
        {},
        { scale088: scaleTokens.scale088 }
      );

      const scale088Result = result.scaleResults.find(r => r.token === 'scale088');
      expect(scale088Result).toBeDefined();
      expect(scale088Result?.valid).toBe(true);
      expect(scale088Result?.message).toContain('0.88');
    });

    it('should validate scale100: unitless values are identical', () => {
      const result = reporter.validateMotionTokenEquivalence(
        {},
        {},
        { scale100: scaleTokens.scale100 }
      );

      const scale100Result = result.scaleResults.find(r => r.token === 'scale100');
      expect(scale100Result).toBeDefined();
      expect(scale100Result?.valid).toBe(true);
      expect(scale100Result?.message).toContain('1');
    });

    it('should validate scale108: unitless values are identical', () => {
      const result = reporter.validateMotionTokenEquivalence(
        {},
        {},
        { scale108: scaleTokens.scale108 }
      );

      const scale108Result = result.scaleResults.find(r => r.token === 'scale108');
      expect(scale108Result).toBeDefined();
      expect(scale108Result?.valid).toBe(true);
      expect(scale108Result?.message).toContain('1.08');
    });

    it('should detect scale factor mismatch', () => {
      const invalidToken = {
        ...scaleTokens.scale100,
        platforms: {
          web: { value: 1.0, unit: 'unitless' },
          ios: { value: 1.05, unit: 'unitless' }, // Wrong: should be 1.0
          android: { value: 1.0, unit: 'unitless' }
        }
      };

      const result = reporter.validateMotionTokenEquivalence(
        {},
        {},
        { scale100: invalidToken }
      );

      const scale100Result = result.scaleResults.find(r => r.token === 'scale100');
      expect(scale100Result).toBeDefined();
      expect(scale100Result?.valid).toBe(false);
      expect(scale100Result?.message).toContain('mismatch');
    });
  });

  describe('TokenComparator Motion Token Validation', () => {
    it('should validate duration token equivalence using TokenComparator', () => {
      const platforms: Platform[] = ['web', 'ios', 'android'];
      const result = comparator.validateMotionTokenEquivalence(
        durationTokens.duration250,
        platforms
      );

      expect(result.valid).toBe(true);
      expect(result.message).toContain('250ms');
      expect(result.message).toContain('0.25s');
      expect(result.details.web.value).toBe(250);
      expect(result.details.ios.value).toBe(0.25);
      expect(result.details.android.value).toBe(250);
    });

    it('should validate easing token equivalence using TokenComparator', () => {
      const platforms: Platform[] = ['web', 'ios', 'android'];
      const result = comparator.validateMotionTokenEquivalence(
        easingTokens.easingStandard,
        platforms
      );

      expect(result.valid).toBe(true);
      expect(result.message).toContain('cubic-bezier(0.4, 0.0, 0.2, 1)');
      expect(result.details.web.value).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
      expect(result.details.ios.value).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
      expect(result.details.android.value).toBe('cubic-bezier(0.4, 0.0, 0.2, 1)');
    });

    it('should validate scale token equivalence using TokenComparator', () => {
      const platforms: Platform[] = ['web', 'ios', 'android'];
      const result = comparator.validateMotionTokenEquivalence(
        scaleTokens.scale088,
        platforms
      );

      expect(result.valid).toBe(true);
      expect(result.message).toContain('0.88');
      expect(result.details.web.value).toBe(0.88);
      expect(result.details.ios.value).toBe(0.88);
      expect(result.details.android.value).toBe(0.88);
    });
  });

  describe('Complete Motion Token Validation', () => {
    it('should validate all motion tokens for cross-platform equivalence', () => {
      const result = reporter.validateMotionTokenEquivalence(
        durationTokens,
        easingTokens,
        scaleTokens
      );

      expect(result.valid).toBe(true);
      expect(result.durationResults).toHaveLength(3); // duration150, duration250, duration350
      expect(result.easingResults).toHaveLength(4); // easingStandard, easingDecelerate, easingAccelerate, easingGlideDecelerate
      expect(result.scaleResults).toHaveLength(6); // scale088, scale092, scale096, scale100, scale104, scale108

      // All duration tokens should be valid
      result.durationResults.forEach(r => {
        expect(r.valid).toBe(true);
      });

      // All easing tokens should be valid
      result.easingResults.forEach(r => {
        expect(r.valid).toBe(true);
      });

      // All scale tokens should be valid
      result.scaleResults.forEach(r => {
        expect(r.valid).toBe(true);
      });
    });
  });
});

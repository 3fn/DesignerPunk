/**
 * @category evergreen
 * @purpose Verify build system generates required outputs with correct structure
 */
/**
 * Android Motion Token Generation Tests
 * 
 * Tests for Android platform motion token generation methods.
 * Verifies that duration, easing, scale, and semantic motion tokens
 * are generated correctly in Kotlin format.
 * 
 * Requirements: 1.7, 2.7, 3.1, 5.1, 5.2, 6.3, 6.7
 */

import { AndroidBuilder } from '../platforms/AndroidBuilder';
import { durationTokens } from '../../tokens/DurationTokens';
import { easingTokens } from '../../tokens/EasingTokens';
import { scaleTokens } from '../../tokens/ScaleTokens';
import { motionTokens } from '../../tokens/semantic/MotionTokens';

describe('AndroidBuilder - Motion Token Generation', () => {
  let builder: AndroidBuilder;

  beforeEach(() => {
    builder = new AndroidBuilder();
  });

  describe('generateDurationTokens', () => {
    it('should generate Kotlin duration constants in milliseconds', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // Should contain object declaration
      expect(result).toContain('object Duration {');

      // Should generate duration150 constant
      expect(result).toContain('val Duration150 = 150');

      // Should generate duration250 constant
      expect(result).toContain('val Duration250 = 250');

      // Should generate duration350 constant
      expect(result).toContain('val Duration350 = 350');

      // Should include comments
      expect(result).toContain('/** duration150: 150ms */');
      expect(result).toContain('/** duration250: 250ms */');
      expect(result).toContain('/** duration350: 350ms */');
    });

    it('should use milliseconds for Android platform', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // Android uses milliseconds (not seconds like iOS)
      expect(result).toContain('150'); // Not 0.15
      expect(result).toContain('250'); // Not 0.25
      expect(result).toContain('350'); // Not 0.35
    });
  });

  describe('generateEasingTokens', () => {
    it('should generate Kotlin easing constants with CubicBezierEasing', () => {
      const result = builder.generateEasingTokens(easingTokens);

      // Should contain object declaration
      expect(result).toContain('object Easing {');

      // Should generate easingStandard constant
      expect(result).toContain('val EasingStandard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)');

      // Should generate easingDecelerate constant
      expect(result).toContain('val EasingDecelerate = CubicBezierEasing(0.0f, 0.0f, 0.2f, 1.0f)');

      // Should generate easingAccelerate constant
      expect(result).toContain('val EasingAccelerate = CubicBezierEasing(0.4f, 0.0f, 1.0f, 1.0f)');

      // Should include comments with cubic-bezier notation
      expect(result).toContain('/** easingStandard: cubic-bezier(0.4, 0.0, 0.2, 1) */');
    });

    it('should use float literals (f suffix) for CubicBezierEasing parameters', () => {
      const result = builder.generateEasingTokens(easingTokens);

      // All parameters should have 'f' suffix for Kotlin float literals
      expect(result).toMatch(/0\.4f/);
      expect(result).toMatch(/0\.0f/);
      expect(result).toMatch(/0\.2f/);
      expect(result).toMatch(/1\.0f/);
    });

    it('should generate PiecewiseLinearEasing for linear easing tokens', () => {
      const result = builder.generateEasingTokens(easingTokens);

      // Should generate the class
      expect(result).toContain('class PiecewiseLinearEasing(private val stops: List<Pair<Float, Float>>) : Easing');
      // Should generate the constant
      expect(result).toContain('val EasingGlideDecelerate = PiecewiseLinearEasing(listOf(');
      // Should use Kotlin Pair syntax
      expect(result).toMatch(/0f to 0f/);
    });
  });

  describe('generateScaleTokens', () => {
    it('should generate Kotlin scale constants', () => {
      const result = builder.generateScaleTokens(scaleTokens);

      // Should contain object declaration
      expect(result).toContain('object Scale {');

      // Should generate all scale constants
      expect(result).toContain('val Scale088 = 0.88f');
      expect(result).toContain('val Scale092 = 0.92f');
      expect(result).toContain('val Scale096 = 0.96f');
      expect(result).toContain('val Scale100 = 1.0f');
      expect(result).toContain('val Scale104 = 1.04f');
      expect(result).toContain('val Scale108 = 1.08f');

      // Should include comments
      expect(result).toContain('/** scale088: 0.88 */');
      expect(result).toContain('/** scale100: 1 */');
    });

    it('should use float literals (f suffix) for scale values', () => {
      const result = builder.generateScaleTokens(scaleTokens);

      // All scale values should have 'f' suffix for Kotlin float literals
      expect(result).toMatch(/0\.88f/);
      expect(result).toMatch(/1\.0f/);
      expect(result).toMatch(/1\.04f/);
    });
  });

  describe('generateSemanticMotionTokens', () => {
    it('should generate Kotlin objects for semantic motion tokens', () => {
      const result = builder.generateSemanticMotionTokens(motionTokens);

      // Should contain object declaration for motion.floatLabel
      expect(result).toContain('object MotionFloatLabel {');

      // Should reference duration primitive
      expect(result).toContain('val duration = Duration.Duration250');

      // Should reference easing primitive
      expect(result).toContain('val easing = Easing.EasingStandard');

      // Should include description comment
      expect(result).toContain('/** Float label animation for text input fields');
    });

    it('should compose primitive token references correctly', () => {
      const result = builder.generateSemanticMotionTokens(motionTokens);

      // Should use PascalCase for type names
      expect(result).toContain('Duration.Duration250');
      expect(result).toContain('Easing.EasingStandard');

      // Should not include raw values (only token references)
      expect(result).not.toContain('= 250');
      expect(result).not.toContain('cubic-bezier');
    });

    it('should handle optional scale references', () => {
      // Create a motion token with scale reference
      const motionWithScale = {
        'motion.testWithScale': {
          name: 'motion.testWithScale',
          primitiveReferences: {
            duration: 'duration250',
            easing: 'easingStandard',
            scale: 'scale088'
          },
          description: 'Test motion with scale'
        }
      };

      const result = builder.generateSemanticMotionTokens(motionWithScale);

      // Should include scale reference
      expect(result).toContain('val scale = Scale.Scale088');
    });
  });

  describe('Kotlin naming conventions', () => {
    it('should convert token names to PascalCase for types', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // Type names should be PascalCase
      expect(result).toContain('Duration150');
      expect(result).toContain('Duration250');
      expect(result).toContain('Duration350');
    });

    it('should handle dotted names correctly', () => {
      const result = builder.generateSemanticMotionTokens(motionTokens);

      // motion.floatLabel should become MotionFloatLabel
      expect(result).toContain('MotionFloatLabel');
    });
  });

  describe('Cross-platform consistency', () => {
    it('should maintain mathematical equivalence with web platform', () => {
      const androidDurations = builder.generateDurationTokens(durationTokens);

      // Android uses milliseconds (same as web)
      expect(androidDurations).toContain('150');
      expect(androidDurations).toContain('250');
      expect(androidDurations).toContain('350');
    });

    it('should use same cubic-bezier values as other platforms', () => {
      const androidEasings = builder.generateEasingTokens(easingTokens);

      // Should use Material Design standard curves
      expect(androidEasings).toContain('0.4f, 0.0f, 0.2f, 1.0f'); // Standard
      expect(androidEasings).toContain('0.0f, 0.0f, 0.2f, 1.0f'); // Decelerate
      expect(androidEasings).toContain('0.4f, 0.0f, 1.0f, 1.0f'); // Accelerate
    });

    it('should use same scale values as other platforms', () => {
      const androidScales = builder.generateScaleTokens(scaleTokens);

      // Scale values should match web and iOS
      expect(androidScales).toContain('0.88f');
      expect(androidScales).toContain('0.92f');
      expect(androidScales).toContain('0.96f');
      expect(androidScales).toContain('1.0f');
      expect(androidScales).toContain('1.04f');
      expect(androidScales).toContain('1.08f');
    });
  });

  describe('Kotlin syntax correctness', () => {
    it('should use correct Kotlin object syntax', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // Should use 'object' keyword for singleton objects
      expect(result).toContain('object Duration {');
      expect(result).toMatch(/}\s*$/); // Should close with }
    });

    it('should use correct Kotlin val syntax', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // Should use 'val' for immutable constants
      expect(result).toMatch(/val Duration\d+ = \d+/);
    });

    it('should use correct Kotlin comment syntax', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // Should use /** */ for documentation comments
      expect(result).toContain('/**');
      expect(result).toContain('*/');
    });
  });
});

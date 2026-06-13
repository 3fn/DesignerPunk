/**
 * @category evergreen
 * @purpose Verify build system generates required outputs with correct structure
 */
/**
 * iOS Motion Token Generation Tests
 * 
 * Tests iOS-specific motion token generation methods in iOSBuilder.
 * Validates Swift constant generation for duration, easing, scale, and semantic motion tokens.
 * 
 * Requirements: 1.6, 2.6, 3.1, 5.1, 6.2, 6.5, 6.6
 */

import { iOSBuilder } from '../platforms/iOSBuilder';
import { durationTokens } from '../../tokens/DurationTokens';
import { easingTokens } from '../../tokens/EasingTokens';
import { scaleTokens } from '../../tokens/ScaleTokens';
import { motionTokens } from '../../tokens/semantic/MotionTokens';

describe('iOSBuilder Motion Token Generation', () => {
  let builder: iOSBuilder;

  beforeEach(() => {
    builder = new iOSBuilder();
  });

  describe('generateDurationTokens', () => {
    it('should generate Swift TimeInterval constants for duration tokens', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // Should include MARK comment
      expect(result).toContain('// MARK: - Duration Tokens');

      // Should include enum declaration
      expect(result).toContain('public enum Duration {');

      // Should generate duration150 constant (150ms = 0.15s)
      expect(result).toContain('public static let duration150: TimeInterval = 0.15');

      // Should generate duration250 constant (250ms = 0.25s)
      expect(result).toContain('public static let duration250: TimeInterval = 0.25');

      // Should generate duration350 constant (350ms = 0.35s)
      expect(result).toContain('public static let duration350: TimeInterval = 0.35');

      // Should include comments with millisecond values
      expect(result).toContain('/// duration150: 0.15s (150ms)');
      expect(result).toContain('/// duration250: 0.25s (250ms)');
      expect(result).toContain('/// duration350: 0.35s (350ms)');
    });

    it('should convert milliseconds to seconds for TimeInterval', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // Verify conversion: 150ms = 0.15s
      expect(result).toContain('0.15');

      // Verify conversion: 250ms = 0.25s
      expect(result).toContain('0.25');

      // Verify conversion: 350ms = 0.35s
      expect(result).toContain('0.35');

      // Should NOT contain millisecond values in constants
      expect(result).not.toMatch(/TimeInterval = 150[^.]/)
      expect(result).not.toMatch(/TimeInterval = 250[^.]/)
      expect(result).not.toMatch(/TimeInterval = 350[^.]/)
    });
  });

  describe('generateEasingTokens', () => {
    it('should generate Swift Animation.timingCurve constants for easing tokens', () => {
      const result = builder.generateEasingTokens(easingTokens);

      // Should include MARK comment
      expect(result).toContain('// MARK: - Easing Tokens');

      // Should include enum declaration
      expect(result).toContain('public enum Easing {');

      // Should generate easingStandard constant
      expect(result).toContain('public static let easingStandard = Animation.timingCurve(0.4, 0.0, 0.2, 1)');

      // Should generate easingDecelerate constant
      expect(result).toContain('public static let easingDecelerate = Animation.timingCurve(0.0, 0.0, 0.2, 1)');

      // Should generate easingAccelerate constant
      expect(result).toContain('public static let easingAccelerate = Animation.timingCurve(0.4, 0.0, 1, 1)');

      // Should include comments with Animation.timingCurve values
      expect(result).toContain('/// easingStandard: Animation.timingCurve(0.4, 0.0, 0.2, 1)');
      expect(result).toContain('/// easingDecelerate: Animation.timingCurve(0.0, 0.0, 0.2, 1)');
      expect(result).toContain('/// easingAccelerate: Animation.timingCurve(0.4, 0.0, 1, 1)');
    });

    it('should use Animation.timingCurve format for iOS', () => {
      const result = builder.generateEasingTokens(easingTokens);

      // Should use Animation.timingCurve, not cubic-bezier
      expect(result).toContain('Animation.timingCurve');
      expect(result).not.toContain('cubic-bezier(');

      // Should have proper Swift syntax
      expect(result).toMatch(/Animation\.timingCurve\(\d+\.?\d*, \d+\.?\d*, \d+\.?\d*, \d+\.?\d*\)/);
    });

    it('should generate PiecewiseLinearEasing for linear easing tokens', () => {
      const result = builder.generateEasingTokens(easingTokens);

      // Should generate the struct
      expect(result).toContain('struct PiecewiseLinearEasing: CustomAnimation');
      // Should generate the constant
      expect(result).toContain('public static let easingGlideDecelerate = Animation(PiecewiseLinearEasing(');
      expect(result).toContain('duration: 0.35');
      // Should include stops
      expect(result).toMatch(/stops: \[\(0, 0\)/);
    });
  });

  describe('generateScaleTokens', () => {
    it('should generate Swift CGFloat constants for scale tokens', () => {
      const result = builder.generateScaleTokens(scaleTokens);

      // Should include MARK comment
      expect(result).toContain('// MARK: - Scale Tokens');

      // Should include enum declaration
      expect(result).toContain('public enum Scale {');

      // Should generate all scale constants
      expect(result).toContain('public static let scale088: CGFloat = 0.88');
      expect(result).toContain('public static let scale092: CGFloat = 0.92');
      expect(result).toContain('public static let scale096: CGFloat = 0.96');
      expect(result).toContain('public static let scale100: CGFloat = 1');
      expect(result).toContain('public static let scale104: CGFloat = 1.04');
      expect(result).toContain('public static let scale108: CGFloat = 1.08');

      // Should include comments
      expect(result).toContain('/// scale088: 0.88');
      expect(result).toContain('/// scale100: 1');
    });

    it('should use CGFloat type for scale values', () => {
      const result = builder.generateScaleTokens(scaleTokens);

      // Should use CGFloat type
      expect(result).toContain('CGFloat');

      // Should have proper Swift syntax
      expect(result).toMatch(/: CGFloat = \d+\.?\d*/);
    });
  });

  describe('generateSemanticMotionTokens', () => {
    it('should generate Swift structs for semantic motion tokens', () => {
      const result = builder.generateSemanticMotionTokens(motionTokens);

      // Should include MARK comment
      expect(result).toContain('// MARK: - Semantic Motion Tokens');

      // Should include struct declaration for motion.floatLabel
      expect(result).toContain('public struct MotionFloatLabel {');

      // Should reference primitive duration token
      expect(result).toContain('public static let duration = Duration.duration250');

      // Should reference primitive easing token
      expect(result).toContain('public static let easing = Easing.easingStandard');

      // Should include description comment
      expect(result).toContain('Standard motion for label floating up');
    });

    it('should compose primitive token references', () => {
      const result = builder.generateSemanticMotionTokens(motionTokens);

      // Should reference Duration enum
      expect(result).toContain('Duration.');

      // Should reference Easing enum
      expect(result).toContain('Easing.');

      // Should NOT contain hard-coded values
      expect(result).not.toContain('TimeInterval = 0.25');
      expect(result).not.toContain('Animation.timingCurve(0.4');
    });

    it('should convert token names to PascalCase for struct names', () => {
      const result = builder.generateSemanticMotionTokens(motionTokens);

      // motion.floatLabel should become MotionFloatLabel
      expect(result).toContain('struct MotionFloatLabel');

      // Should NOT use dot notation in struct names
      expect(result).not.toContain('struct motion.floatLabel');
    });

    it('should include scale reference if present', () => {
      // Create a motion token with scale
      const motionWithScale = {
        'motion.testScale': {
          name: 'motion.testScale',
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
      expect(result).toContain('public static let scale = Scale.scale088');
    });
  });

  describe('Cross-platform value equivalence', () => {
    it('should maintain mathematical equivalence for duration values', () => {
      const result = builder.generateDurationTokens(durationTokens);

      // iOS uses seconds, web uses milliseconds
      // 150ms = 0.15s, 250ms = 0.25s, 350ms = 0.35s
      expect(result).toContain('0.15');
      expect(result).toContain('0.25');
      expect(result).toContain('0.35');
    });

    it('should maintain mathematical equivalence for easing curves', () => {
      const result = builder.generateEasingTokens(easingTokens);

      // Same cubic-bezier parameters across platforms
      // Standard: (0.4, 0.0, 0.2, 1)
      expect(result).toContain('Animation.timingCurve(0.4, 0.0, 0.2, 1)');

      // Decelerate: (0.0, 0.0, 0.2, 1)
      expect(result).toContain('Animation.timingCurve(0.0, 0.0, 0.2, 1)');

      // Accelerate: (0.4, 0.0, 1, 1)
      expect(result).toContain('Animation.timingCurve(0.4, 0.0, 1, 1)');
    });

    it('should maintain mathematical equivalence for scale values', () => {
      const result = builder.generateScaleTokens(scaleTokens);

      // Same unitless scale factors across platforms
      expect(result).toContain('0.88');
      expect(result).toContain('0.92');
      expect(result).toContain('0.96');
      expect(result).toContain('1');
      expect(result).toContain('1.04');
      expect(result).toContain('1.08');
    });
  });

  describe('Swift syntax validation', () => {
    it('should generate valid Swift enum syntax', () => {
      const durationResult = builder.generateDurationTokens(durationTokens);
      const easingResult = builder.generateEasingTokens(easingTokens);
      const scaleResult = builder.generateScaleTokens(scaleTokens);

      // Should have public enum declarations
      expect(durationResult).toMatch(/public enum Duration \{/);
      expect(easingResult).toMatch(/public enum Easing \{/);
      expect(scaleResult).toMatch(/public enum Scale \{/);

      // Should have closing braces
      expect(durationResult).toContain('}');
      expect(easingResult).toContain('}');
      expect(scaleResult).toContain('}');
    });

    it('should generate valid Swift struct syntax', () => {
      const result = builder.generateSemanticMotionTokens(motionTokens);

      // Should have public struct declaration
      expect(result).toMatch(/public struct \w+ \{/);

      // Should have static let properties
      expect(result).toMatch(/public static let \w+ = /);

      // Should have closing brace
      expect(result).toContain('}');
    });

    it('should use proper Swift type annotations', () => {
      const durationResult = builder.generateDurationTokens(durationTokens);
      const scaleResult = builder.generateScaleTokens(scaleTokens);

      // Duration should use TimeInterval
      expect(durationResult).toContain(': TimeInterval');

      // Scale should use CGFloat
      expect(scaleResult).toContain(': CGFloat');
    });
  });
});

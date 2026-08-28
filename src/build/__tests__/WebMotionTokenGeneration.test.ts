/**
 * @category evergreen
 * @purpose Verify build system generates required outputs with correct structure
 */
/**
 * Web Motion Token Generation Tests
 * 
 * Tests CSS custom property generation for motion tokens (duration, easing, scale)
 * Validates Requirements 1.5, 2.5, 3.1, 5.1, 5.2, 6.1, 6.4
 */

import { WebMotionTokenFormatter } from '../platforms/WebMotionTokenFormatter';
import { durationTokens } from '../../tokens/DurationTokens';
import { easingTokens } from '../../tokens/EasingTokens';
import { scaleTokens } from '../../tokens/ScaleTokens';
import { motionTokens } from '../../tokens/semantic/MotionTokens';

describe('WebMotionTokenFormatter - Motion Token Generation', () => {
  let webBuilder: WebMotionTokenFormatter;

  beforeEach(() => {
    webBuilder = new WebMotionTokenFormatter();
  });

  describe('Requirement 1.5: Duration Token Generation for Web', () => {
    it('should generate CSS custom properties for duration tokens with ms suffix', () => {
      const result = webBuilder.generateDurationTokens(durationTokens);

      // Verify section header
      expect(result).toContain('/* Duration Tokens */');
      expect(result).toContain('/* Animation timing values in milliseconds */');

      // Verify duration150 (150ms)
      expect(result).toContain('--duration-150: 150ms;');

      // Verify duration250 (250ms)
      expect(result).toContain('--duration-250: 250ms;');

      // Verify duration350 (350ms)
      expect(result).toContain('--duration-350: 350ms;');
    });

    it('should use kebab-case naming for CSS variables', () => {
      const result = webBuilder.generateDurationTokens(durationTokens);

      // Verify kebab-case format (duration150 -> duration-150)
      expect(result).toMatch(/--duration-\d+:/);
      expect(result).not.toMatch(/--duration[A-Z]/); // No camelCase
    });

    it('should generate all duration tokens', () => {
      const result = webBuilder.generateDurationTokens(durationTokens);

      // Count generated tokens
      const tokenMatches = result.match(/--duration-\d+:/g);
      expect(tokenMatches).toHaveLength(3); // duration150, duration250, duration350
    });
  });

  describe('Requirement 2.5: Easing Token Generation for Web', () => {
    it('should generate CSS custom properties for easing tokens with cubic-bezier format', () => {
      const result = webBuilder.generateEasingTokens(easingTokens);

      // Verify section header
      expect(result).toContain('/* Easing Tokens */');
      expect(result).toContain('/* Animation curve definitions */');

      // Verify easingStandard
      expect(result).toContain('--easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);');

      // Verify easingDecelerate
      expect(result).toContain('--easing-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1);');

      // Verify easingAccelerate
      expect(result).toContain('--easing-accelerate: cubic-bezier(0.4, 0.0, 1, 1);');
    });

    it('should use kebab-case naming for CSS variables', () => {
      const result = webBuilder.generateEasingTokens(easingTokens);

      // Verify kebab-case format (easingStandard -> easing-standard)
      expect(result).toMatch(/--easing-[a-z]+:/);
      expect(result).not.toMatch(/--easing[A-Z]/); // No camelCase
    });

    it('should preserve cubic-bezier syntax exactly', () => {
      const result = webBuilder.generateEasingTokens(easingTokens);

      // Verify cubic-bezier format is preserved
      expect(result).toMatch(/cubic-bezier\(\d+\.\d+,\s*\d+\.\d+,\s*\d+\.\d+,\s*\d+\)/);
    });

    it('should generate all easing tokens', () => {
      const result = webBuilder.generateEasingTokens(easingTokens);

      // Count generated tokens (cubic-bezier + linear)
      const tokenMatches = result.match(/--easing-[a-z-]+:/g);
      expect(tokenMatches).toHaveLength(4);
    });

    it('should generate CSS linear() function for piecewise linear easing', () => {
      const result = webBuilder.generateEasingTokens(easingTokens);

      expect(result).toContain('--easing-glide-decelerate: linear(');
      expect(result).toMatch(/linear\(0,.*0\.012 0\.9%/);
      expect(result).toContain(', 1);');
      // Should NOT contain cubic-bezier for the linear token
      expect(result).not.toMatch(/glide-decelerate:.*cubic-bezier/);
    });
  });

  describe('Requirement 3.1: Scale Token Generation for Web', () => {
    it('should generate CSS custom properties for scale tokens as unitless values', () => {
      const result = webBuilder.generateScaleTokens(scaleTokens);

      // Verify section header
      expect(result).toContain('/* Scale Tokens */');
      expect(result).toContain('/* Transform scale factors (unitless) */');

      // Verify scale088 (0.88)
      expect(result).toContain('--scale-088: 0.88;');

      // Verify scale092 (0.92)
      expect(result).toContain('--scale-092: 0.92;');

      // Verify scale096 (0.96)
      expect(result).toContain('--scale-096: 0.96;');

      // Verify scale100 (1.00)
      expect(result).toContain('--scale-100: 1;');

      // Verify scale104 (1.04)
      expect(result).toContain('--scale-104: 1.04;');

      // Verify scale108 (1.08)
      expect(result).toContain('--scale-108: 1.08;');
    });

    it('should use kebab-case naming for CSS variables', () => {
      const result = webBuilder.generateScaleTokens(scaleTokens);

      // Verify kebab-case format (scale088 -> scale-088)
      expect(result).toMatch(/--scale-\d+:/);
      expect(result).not.toMatch(/--scale[A-Z]/); // No camelCase
    });

    it('should generate unitless scale values', () => {
      const result = webBuilder.generateScaleTokens(scaleTokens);

      // Verify no units are appended (unitless for CSS transform: scale())
      expect(result).not.toContain('px');
      expect(result).not.toContain('rem');
      expect(result).not.toContain('%');
    });

    it('should generate all scale tokens', () => {
      const result = webBuilder.generateScaleTokens(scaleTokens);

      // Count generated tokens
      const tokenMatches = result.match(/--scale-\d+:/g);
      expect(tokenMatches).toHaveLength(6); // scale088, scale092, scale096, scale100, scale104, scale108
    });
  });

  describe('Requirement 5.1, 5.2, 6.4: Semantic Motion Token Generation', () => {
    it('should generate CSS custom properties for semantic motion tokens with var() references', () => {
      const result = webBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify section header
      expect(result).toContain('/* Semantic Motion Tokens */');
      expect(result).toContain('/* Composed motion styles for specific animation contexts */');

      // Verify motion.floatLabel duration reference
      expect(result).toContain('--motion-float-label-duration: var(--duration-250);');

      // Verify motion.floatLabel easing reference
      expect(result).toContain('--motion-float-label-easing: var(--easing-standard);');
    });

    it('should use kebab-case naming for semantic motion tokens', () => {
      const result = webBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify kebab-case format (motion.floatLabel -> motion-float-label)
      expect(result).toMatch(/--motion-[a-z-]+:/);
      expect(result).not.toMatch(/--motion[A-Z]/); // No camelCase
      expect(result).not.toMatch(/--motion\./); // No dots
    });

    it('should reference primitive tokens using var() syntax', () => {
      const result = webBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify var() references to primitive tokens
      expect(result).toMatch(/var\(--duration-\d+\)/);
      expect(result).toMatch(/var\(--easing-[a-z]+\)/);
    });

    it('should generate separate properties for duration and easing', () => {
      const result = webBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify separate duration and easing properties
      expect(result).toContain('-duration:');
      expect(result).toContain('-easing:');
    });

    it('should handle optional scale property when present', () => {
      // Create a motion token with scale
      const motionWithScale = {
        'motion.scaleAnimation': {
          name: 'motion.scaleAnimation',
          primitiveReferences: {
            duration: 'duration250',
            easing: 'easingStandard',
            scale: 'scale088'
          }
        }
      };

      const result = webBuilder.generateSemanticMotionTokens(motionWithScale);

      // Verify scale property is generated
      expect(result).toContain('--motion-scale-animation-duration: var(--duration-250);');
      expect(result).toContain('--motion-scale-animation-easing: var(--easing-standard);');
      expect(result).toContain('--motion-scale-animation-scale: var(--scale-088);');
    });

    it('should not generate scale property when absent', () => {
      const result = webBuilder.generateSemanticMotionTokens(motionTokens);

      // motion.floatLabel doesn't have scale, so -scale property shouldn't exist
      expect(result).not.toContain('--motion-float-label-scale:');
    });
  });

  describe('Requirement 6.1: CSS Custom Property Format Consistency', () => {
    it('should follow consistent CSS custom property format across all motion token types', () => {
      const durationResult = webBuilder.generateDurationTokens(durationTokens);
      const easingResult = webBuilder.generateEasingTokens(easingTokens);
      const scaleResult = webBuilder.generateScaleTokens(scaleTokens);
      const motionResult = webBuilder.generateSemanticMotionTokens(motionTokens);

      // All should use -- prefix
      expect(durationResult).toMatch(/--[a-z0-9-]+:/);
      expect(easingResult).toMatch(/--[a-z0-9-]+:/);
      expect(scaleResult).toMatch(/--[a-z0-9-]+:/);
      expect(motionResult).toMatch(/--[a-z0-9-]+:/);

      // All should use kebab-case (lowercase letters, digits, and hyphens only)
      expect(durationResult).not.toMatch(/--[a-zA-Z0-9]*[A-Z]/);
      expect(easingResult).not.toMatch(/--[a-zA-Z0-9]*[A-Z]/);
      expect(scaleResult).not.toMatch(/--[a-zA-Z]*[A-Z]/);
      expect(motionResult).not.toMatch(/--[a-zA-Z]*[A-Z]/);

      // All should end with semicolon
      expect(durationResult).toMatch(/;\s*$/m);
      expect(easingResult).toMatch(/;\s*$/m);
      expect(scaleResult).toMatch(/;\s*$/m);
      expect(motionResult).toMatch(/;\s*$/m);
    });

    it('should include proper section headers and comments', () => {
      const durationResult = webBuilder.generateDurationTokens(durationTokens);
      const easingResult = webBuilder.generateEasingTokens(easingTokens);
      const scaleResult = webBuilder.generateScaleTokens(scaleTokens);
      const motionResult = webBuilder.generateSemanticMotionTokens(motionTokens);

      // All should have section headers
      expect(durationResult).toContain('/* Duration Tokens */');
      expect(easingResult).toContain('/* Easing Tokens */');
      expect(scaleResult).toContain('/* Scale Tokens */');
      expect(motionResult).toContain('/* Semantic Motion Tokens */');

      // All should have descriptive comments
      expect(durationResult).toContain('Animation timing values');
      expect(easingResult).toContain('Animation curve definitions');
      expect(scaleResult).toContain('Transform scale factors');
      expect(motionResult).toContain('Composed motion styles');
    });
  });

  describe('Integration: toKebabCase utility', () => {
    it('should convert camelCase to kebab-case correctly', () => {
      const durationResult = webBuilder.generateDurationTokens(durationTokens);

      // duration150 -> duration-150
      expect(durationResult).toContain('--duration-150');
      expect(durationResult).not.toContain('--duration150');
    });

    it('should convert dot notation to kebab-case correctly', () => {
      const motionResult = webBuilder.generateSemanticMotionTokens(motionTokens);

      // motion.floatLabel -> motion-float-label
      expect(motionResult).toContain('--motion-float-label');
      expect(motionResult).not.toContain('--motion.float-label');
    });

    it('should handle mixed camelCase and numbers correctly', () => {
      const scaleResult = webBuilder.generateScaleTokens(scaleTokens);

      // scale088 -> scale-088
      expect(scaleResult).toContain('--scale-088');
      expect(scaleResult).not.toContain('--scale088');
    });
  });
});

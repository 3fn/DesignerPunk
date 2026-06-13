/**
 * @category evergreen
 * @purpose Verify build system integration produces correct outputs for all platforms
 */
/**
 * Motion Token Cross-Platform Integration Tests
 * 
 * Integration tests for motion token generation across all platforms (web, iOS, Android)
 * Tests Requirements 6.1, 6.2, 6.3, 6.8
 * 
 * Validates:
 * - Motion tokens generate for all platforms
 * - Output files are created with correct syntax
 * - Mathematical equivalence is maintained across platforms
 * - Generated tokens can be imported and used
 */

import { WebBuilder } from '../platforms/WebBuilder';
import { iOSBuilder } from '../platforms/iOSBuilder';
import { AndroidBuilder } from '../platforms/AndroidBuilder';
import { durationTokens } from '../../tokens/DurationTokens';
import { easingTokens } from '../../tokens/EasingTokens';
import { scaleTokens } from '../../tokens/ScaleTokens';
import { motionTokens } from '../../tokens/semantic/MotionTokens';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

describe('Motion Token Cross-Platform Integration', () => {
  let webBuilder: WebBuilder;
  let iosBuilder: iOSBuilder;
  let androidBuilder: AndroidBuilder;
  let tempDir: string;

  beforeEach(async () => {
    webBuilder = new WebBuilder();
    iosBuilder = new iOSBuilder();
    androidBuilder = new AndroidBuilder();

    // Create temporary directory for output files
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'motion-token-integration-'));
  });

  afterEach(async () => {
    // Clean up temporary directory
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }
  });

  describe('Requirement 6.1, 6.2, 6.3: Motion tokens generate for all platforms', () => {
    it('should generate duration tokens for all platforms', () => {
      const webResult = webBuilder.generateDurationTokens(durationTokens);
      const iosResult = iosBuilder.generateDurationTokens(durationTokens);
      const androidResult = androidBuilder.generateDurationTokens(durationTokens);

      // Verify all platforms generated output
      expect(webResult).toBeTruthy();
      expect(webResult.length).toBeGreaterThan(0);

      expect(iosResult).toBeTruthy();
      expect(iosResult.length).toBeGreaterThan(0);

      expect(androidResult).toBeTruthy();
      expect(androidResult.length).toBeGreaterThan(0);
    });

    it('should generate easing tokens for all platforms', () => {
      const webResult = webBuilder.generateEasingTokens(easingTokens);
      const iosResult = iosBuilder.generateEasingTokens(easingTokens);
      const androidResult = androidBuilder.generateEasingTokens(easingTokens);

      // Verify all platforms generated output
      expect(webResult).toBeTruthy();
      expect(webResult.length).toBeGreaterThan(0);

      expect(iosResult).toBeTruthy();
      expect(iosResult.length).toBeGreaterThan(0);

      expect(androidResult).toBeTruthy();
      expect(androidResult.length).toBeGreaterThan(0);
    });

    it('should generate scale tokens for all platforms', () => {
      const webResult = webBuilder.generateScaleTokens(scaleTokens);
      const iosResult = iosBuilder.generateScaleTokens(scaleTokens);
      const androidResult = androidBuilder.generateScaleTokens(scaleTokens);

      // Verify all platforms generated output
      expect(webResult).toBeTruthy();
      expect(webResult.length).toBeGreaterThan(0);

      expect(iosResult).toBeTruthy();
      expect(iosResult.length).toBeGreaterThan(0);

      expect(androidResult).toBeTruthy();
      expect(androidResult.length).toBeGreaterThan(0);
    });

    it('should generate semantic motion tokens for all platforms', () => {
      const webResult = webBuilder.generateSemanticMotionTokens(motionTokens);
      const iosResult = iosBuilder.generateSemanticMotionTokens(motionTokens);
      const androidResult = androidBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify all platforms generated output
      expect(webResult).toBeTruthy();
      expect(webResult.length).toBeGreaterThan(0);

      expect(iosResult).toBeTruthy();
      expect(iosResult.length).toBeGreaterThan(0);

      expect(androidResult).toBeTruthy();
      expect(androidResult.length).toBeGreaterThan(0);
    });
  });

  describe('Requirement 6.1, 6.2, 6.3: Output files created with correct syntax', () => {
    it('should generate web output with valid CSS syntax', () => {
      const durationResult = webBuilder.generateDurationTokens(durationTokens);
      const easingResult = webBuilder.generateEasingTokens(easingTokens);
      const scaleResult = webBuilder.generateScaleTokens(scaleTokens);
      const motionResult = webBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify CSS custom property syntax (--name: value;)
      expect(durationResult).toMatch(/--duration-\d+:\s*\d+ms;/);
      expect(easingResult).toMatch(/--easing-[a-z]+:\s*cubic-bezier\([^)]+\);/);
      expect(scaleResult).toMatch(/--scale-\d+:\s*[\d.]+;/);
      expect(motionResult).toMatch(/--motion-[a-z-]+-duration:\s*var\(--duration-\d+\);/);
      expect(motionResult).toMatch(/--motion-[a-z-]+-easing:\s*var\(--easing-[a-z]+\);/);
    });

    it('should generate iOS output with valid Swift syntax', () => {
      const durationResult = iosBuilder.generateDurationTokens(durationTokens);
      const easingResult = iosBuilder.generateEasingTokens(easingTokens);
      const scaleResult = iosBuilder.generateScaleTokens(scaleTokens);
      const motionResult = iosBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify Swift constant syntax (let name: Type = value)
      expect(durationResult).toMatch(/let duration\d+:\s*TimeInterval\s*=\s*[\d.]+/);
      expect(easingResult).toMatch(/let easing[A-Z][a-z]+\s*=\s*Animation\.timingCurve\([^)]+\)/);
      expect(scaleResult).toMatch(/let scale\d+:\s*CGFloat\s*=\s*[\d.]+/);
      expect(motionResult).toMatch(/struct Motion[A-Z][a-zA-Z]+\s*\{/);
    });

    it('should generate Android output with valid Kotlin syntax', () => {
      const durationResult = androidBuilder.generateDurationTokens(durationTokens);
      const easingResult = androidBuilder.generateEasingTokens(easingTokens);
      const scaleResult = androidBuilder.generateScaleTokens(scaleTokens);
      const motionResult = androidBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify Kotlin constant syntax (val Name = value)
      expect(durationResult).toMatch(/val Duration\d+\s*=\s*\d+/);
      expect(easingResult).toMatch(/val Easing[A-Z][a-z]+\s*=\s*CubicBezierEasing\([^)]+\)/);
      expect(scaleResult).toMatch(/val Scale\d+\s*=\s*[\d.]+f/);
      expect(motionResult).toMatch(/object Motion[A-Z][a-zA-Z]+\s*\{/);
    });
  });

  describe('Requirement 6.8: Mathematical equivalence maintained across platforms', () => {
    it('should maintain equivalent duration values across platforms', () => {
      const webResult = webBuilder.generateDurationTokens(durationTokens);
      const iosResult = iosBuilder.generateDurationTokens(durationTokens);
      const androidResult = androidBuilder.generateDurationTokens(durationTokens);

      // Extract duration150 values from each platform
      // Web: --duration-150: 150ms;
      const webMatch = webResult.match(/--duration-150:\s*(\d+)ms/);
      expect(webMatch).toBeTruthy();
      const webValue = parseInt(webMatch![1]);

      // iOS: let duration150: TimeInterval = 0.15 (seconds)
      const iosMatch = iosResult.match(/let duration150:\s*TimeInterval\s*=\s*([\d.]+)/);
      expect(iosMatch).toBeTruthy();
      const iosValue = parseFloat(iosMatch![1]) * 1000; // Convert to ms

      // Android: val Duration150 = 150 (milliseconds)
      const androidMatch = androidResult.match(/val Duration150\s*=\s*(\d+)/);
      expect(androidMatch).toBeTruthy();
      const androidValue = parseInt(androidMatch![1]);

      // Verify mathematical equivalence
      expect(webValue).toBe(150);
      expect(iosValue).toBe(150);
      expect(androidValue).toBe(150);
    });

    it('should maintain equivalent easing curves across platforms', () => {
      const webResult = webBuilder.generateEasingTokens(easingTokens);
      const iosResult = iosBuilder.generateEasingTokens(easingTokens);
      const androidResult = androidBuilder.generateEasingTokens(easingTokens);

      // Extract easingStandard cubic-bezier values
      // Web: --easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
      const webMatch = webResult.match(/--easing-standard:\s*cubic-bezier\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
      expect(webMatch).toBeTruthy();
      const webCurve = [
        parseFloat(webMatch![1]),
        parseFloat(webMatch![2]),
        parseFloat(webMatch![3]),
        parseFloat(webMatch![4])
      ];

      // iOS: let easingStandard = Animation.timingCurve(0.4, 0.0, 0.2, 1.0)
      const iosMatch = iosResult.match(/let easingStandard\s*=\s*Animation\.timingCurve\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/);
      expect(iosMatch).toBeTruthy();
      const iosCurve = [
        parseFloat(iosMatch![1]),
        parseFloat(iosMatch![2]),
        parseFloat(iosMatch![3]),
        parseFloat(iosMatch![4])
      ];

      // Android: val EasingStandard = CubicBezierEasing(0.4f, 0.0f, 0.2f, 1.0f)
      const androidMatch = androidResult.match(/val EasingStandard\s*=\s*CubicBezierEasing\(([\d.]+)f,\s*([\d.]+)f,\s*([\d.]+)f,\s*([\d.]+)f\)/);
      expect(androidMatch).toBeTruthy();
      const androidCurve = [
        parseFloat(androidMatch![1]),
        parseFloat(androidMatch![2]),
        parseFloat(androidMatch![3]),
        parseFloat(androidMatch![4])
      ];

      // Verify mathematical equivalence
      expect(webCurve).toEqual([0.4, 0.0, 0.2, 1]);
      expect(iosCurve).toEqual([0.4, 0.0, 0.2, 1.0]);
      expect(androidCurve).toEqual([0.4, 0.0, 0.2, 1.0]);
    });

    it('should generate linear easing on all platforms', () => {
      const webResult = webBuilder.generateEasingTokens(easingTokens);
      const iosResult = iosBuilder.generateEasingTokens(easingTokens);
      const androidResult = androidBuilder.generateEasingTokens(easingTokens);

      // Web: CSS linear() function
      expect(webResult).toContain('--easing-glide-decelerate: linear(');
      // iOS: PiecewiseLinearEasing CustomAnimation
      expect(iosResult).toContain('easingGlideDecelerate = Animation(PiecewiseLinearEasing(');
      // Android: PiecewiseLinearEasing Easing implementation
      expect(androidResult).toContain('EasingGlideDecelerate = PiecewiseLinearEasing(');
    });

    it('should maintain equivalent scale values across platforms', () => {
      const webResult = webBuilder.generateScaleTokens(scaleTokens);
      const iosResult = iosBuilder.generateScaleTokens(scaleTokens);
      const androidResult = androidBuilder.generateScaleTokens(scaleTokens);

      // Extract scale088 values from each platform
      // Web: --scale-088: 0.88;
      const webMatch = webResult.match(/--scale-088:\s*([\d.]+);/);
      expect(webMatch).toBeTruthy();
      const webValue = parseFloat(webMatch![1]);

      // iOS: let scale088: CGFloat = 0.88
      const iosMatch = iosResult.match(/let scale088:\s*CGFloat\s*=\s*([\d.]+)/);
      expect(iosMatch).toBeTruthy();
      const iosValue = parseFloat(iosMatch![1]);

      // Android: val Scale088 = 0.88f
      const androidMatch = androidResult.match(/val Scale088\s*=\s*([\d.]+)f/);
      expect(androidMatch).toBeTruthy();
      const androidValue = parseFloat(androidMatch![1]);

      // Verify mathematical equivalence
      expect(webValue).toBe(0.88);
      expect(iosValue).toBe(0.88);
      expect(androidValue).toBe(0.88);
    });

    it('should maintain equivalent semantic motion token references across platforms', () => {
      const webResult = webBuilder.generateSemanticMotionTokens(motionTokens);
      const iosResult = iosBuilder.generateSemanticMotionTokens(motionTokens);
      const androidResult = androidBuilder.generateSemanticMotionTokens(motionTokens);

      // Verify motion.floatLabel references duration250 and easingStandard on all platforms
      // Web: var(--duration-250) and var(--easing-standard)
      expect(webResult).toContain('var(--duration-250)');
      expect(webResult).toContain('var(--easing-standard)');

      // iOS: duration250 and easingStandard
      expect(iosResult).toContain('duration250');
      expect(iosResult).toContain('easingStandard');

      // Android: Duration250 and EasingStandard
      expect(androidResult).toContain('Duration250');
      expect(androidResult).toContain('EasingStandard');
    });
  });

  describe('Generated tokens can be imported and used', () => {
    it('should generate web tokens that can be written to file and parsed', async () => {
      const durationResult = webBuilder.generateDurationTokens(durationTokens);
      const easingResult = webBuilder.generateEasingTokens(easingTokens);
      const scaleResult = webBuilder.generateScaleTokens(scaleTokens);
      const motionResult = webBuilder.generateSemanticMotionTokens(motionTokens);

      // Write to CSS file
      const cssContent = `:root {\n${durationResult}\n${easingResult}\n${scaleResult}\n${motionResult}\n}`;
      const cssPath = path.join(tempDir, 'motion-tokens.css');
      await fs.writeFile(cssPath, cssContent);

      // Verify file was created
      const fileExists = await fs.access(cssPath).then(() => true).catch(() => false);
      expect(fileExists).toBe(true);

      // Read and verify content
      const readContent = await fs.readFile(cssPath, 'utf-8');
      expect(readContent).toContain('--duration-150');
      expect(readContent).toContain('--easing-standard');
      expect(readContent).toContain('--scale-088');
      expect(readContent).toContain('--motion-float-label-duration');
    });

    it('should generate iOS tokens that can be written to file and parsed', async () => {
      const durationResult = iosBuilder.generateDurationTokens(durationTokens);
      const easingResult = iosBuilder.generateEasingTokens(easingTokens);
      const scaleResult = iosBuilder.generateScaleTokens(scaleTokens);
      const motionResult = iosBuilder.generateSemanticMotionTokens(motionTokens);

      // Write to Swift file
      const swiftContent = `import SwiftUI\n\n${durationResult}\n${easingResult}\n${scaleResult}\n${motionResult}`;
      const swiftPath = path.join(tempDir, 'MotionTokens.swift');
      await fs.writeFile(swiftPath, swiftContent);

      // Verify file was created
      const fileExists = await fs.access(swiftPath).then(() => true).catch(() => false);
      expect(fileExists).toBe(true);

      // Read and verify content
      const readContent = await fs.readFile(swiftPath, 'utf-8');
      expect(readContent).toContain('let duration150');
      expect(readContent).toContain('let easingStandard');
      expect(readContent).toContain('let scale088');
      expect(readContent).toContain('struct MotionFloatLabel');
    });

    it('should generate Android tokens that can be written to file and parsed', async () => {
      const durationResult = androidBuilder.generateDurationTokens(durationTokens);
      const easingResult = androidBuilder.generateEasingTokens(easingTokens);
      const scaleResult = androidBuilder.generateScaleTokens(scaleTokens);
      const motionResult = androidBuilder.generateSemanticMotionTokens(motionTokens);

      // Write to Kotlin file
      const kotlinContent = `package com.designerpunk.tokens\n\nimport androidx.compose.animation.core.*\n\n${durationResult}\n${easingResult}\n${scaleResult}\n${motionResult}`;
      const kotlinPath = path.join(tempDir, 'MotionTokens.kt');
      await fs.writeFile(kotlinPath, kotlinContent);

      // Verify file was created
      const fileExists = await fs.access(kotlinPath).then(() => true).catch(() => false);
      expect(fileExists).toBe(true);

      // Read and verify content
      const readContent = await fs.readFile(kotlinPath, 'utf-8');
      expect(readContent).toContain('val Duration150');
      expect(readContent).toContain('val EasingStandard');
      expect(readContent).toContain('val Scale088');
      expect(readContent).toContain('object MotionFloatLabel');
    });
  });

  describe('Complete cross-platform workflow', () => {
    it('should generate complete motion token files for all platforms', async () => {
      // Generate all token types for all platforms
      const webDuration = webBuilder.generateDurationTokens(durationTokens);
      const webEasing = webBuilder.generateEasingTokens(easingTokens);
      const webScale = webBuilder.generateScaleTokens(scaleTokens);
      const webMotion = webBuilder.generateSemanticMotionTokens(motionTokens);

      const iosDuration = iosBuilder.generateDurationTokens(durationTokens);
      const iosEasing = iosBuilder.generateEasingTokens(easingTokens);
      const iosScale = iosBuilder.generateScaleTokens(scaleTokens);
      const iosMotion = iosBuilder.generateSemanticMotionTokens(motionTokens);

      const androidDuration = androidBuilder.generateDurationTokens(durationTokens);
      const androidEasing = androidBuilder.generateEasingTokens(easingTokens);
      const androidScale = androidBuilder.generateScaleTokens(scaleTokens);
      const androidMotion = androidBuilder.generateSemanticMotionTokens(motionTokens);

      // Write complete files
      const webContent = `:root {\n${webDuration}\n${webEasing}\n${webScale}\n${webMotion}\n}`;
      const iosContent = `import SwiftUI\n\n${iosDuration}\n${iosEasing}\n${iosScale}\n${iosMotion}`;
      const androidContent = `package com.designerpunk.tokens\n\nimport androidx.compose.animation.core.*\n\n${androidDuration}\n${androidEasing}\n${androidScale}\n${androidMotion}`;

      await fs.writeFile(path.join(tempDir, 'motion-tokens.css'), webContent);
      await fs.writeFile(path.join(tempDir, 'MotionTokens.swift'), iosContent);
      await fs.writeFile(path.join(tempDir, 'MotionTokens.kt'), androidContent);

      // Verify all files exist
      const webExists = await fs.access(path.join(tempDir, 'motion-tokens.css')).then(() => true).catch(() => false);
      const iosExists = await fs.access(path.join(tempDir, 'MotionTokens.swift')).then(() => true).catch(() => false);
      const androidExists = await fs.access(path.join(tempDir, 'MotionTokens.kt')).then(() => true).catch(() => false);

      expect(webExists).toBe(true);
      expect(iosExists).toBe(true);
      expect(androidExists).toBe(true);

      // Verify file sizes are reasonable (not empty)
      const webStats = await fs.stat(path.join(tempDir, 'motion-tokens.css'));
      const iosStats = await fs.stat(path.join(tempDir, 'MotionTokens.swift'));
      const androidStats = await fs.stat(path.join(tempDir, 'MotionTokens.kt'));

      expect(webStats.size).toBeGreaterThan(100);
      expect(iosStats.size).toBeGreaterThan(100);
      expect(androidStats.size).toBeGreaterThan(100);
    });

    it('should maintain token count consistency across platforms', () => {
      const webDuration = webBuilder.generateDurationTokens(durationTokens);
      const iosDuration = iosBuilder.generateDurationTokens(durationTokens);
      const androidDuration = androidBuilder.generateDurationTokens(durationTokens);

      // Count tokens in each platform output
      const webCount = (webDuration.match(/--duration-\d+:/g) || []).length;
      const iosCount = (iosDuration.match(/let duration\d+:/g) || []).length;
      const androidCount = (androidDuration.match(/val Duration\d+\s*=/g) || []).length;

      // All platforms should have same number of duration tokens
      expect(webCount).toBe(3); // duration150, duration250, duration350
      expect(iosCount).toBe(3);
      expect(androidCount).toBe(3);
    });
  });
});

/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for SwiftEmitter — enum structure, types, theme-varying, duration conversion
 */

import { emitSwift } from '../emitters/SwiftEmitter';
import type { ResolvedCategory, GeneratorConfig } from '../ProductTokenGenerator';

const config: GeneratorConfig = {
  productTokensDir: '',
  tokenIndexDir: '',
  outputDir: '',
  configName: 'DesignerPunk',
  configAbbreviation: 'DP',
};

const categories: ResolvedCategory[] = [
  {
    name: 'layout',
    description: 'Layout tokens',
    tokens: [
      { name: 'contentMaxWidth', value: 1336, unitType: 'logical', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'Max width', platforms: ['web', 'ios', 'android'] },
      { name: 'contentIndent', value: null, unitType: null, ref: 'space300', resolvedPlatformPath: { web: '--space-300', ios: 'space300', android: 'space_300' }, themeVarying: false, description: 'Left indent', platforms: ['web', 'ios', 'android'] },
      { name: 'proseMeasureMax', value: 48, unitType: 'ch', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'Web only', platforms: ['web'] },
    ],
  },
  {
    name: 'motion',
    description: 'Motion tokens',
    tokens: [
      { name: 'flipDuration', value: null, unitType: null, ref: 'duration250', resolvedPlatformPath: { web: '--duration-250', ios: 'Duration.duration250', android: 'Duration.Duration250' }, themeVarying: false, description: 'Flip', platforms: ['web', 'ios', 'android'] },
      { name: 'flickerDuration', value: 800, unitType: 'duration', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'Flicker', platforms: ['web', 'ios'] },
    ],
  },
  {
    name: 'visualization',
    description: 'Viz tokens',
    tokens: [
      { name: 'dangerZoneBackground', value: null, unitType: null, ref: 'color.feedback.info.text', resolvedPlatformPath: { web: '--color-feedback-info-text', ios: 'theme.colorFeedbackInfoText', android: 'theme.color_feedback_info_text' }, themeVarying: true, description: 'Theme color', platforms: ['web', 'ios', 'android'] },
    ],
  },
];

describe('SwiftEmitter', () => {
  const output = emitSwift(categories, config);

  it('includes file header', () => {
    expect(output).toContain('Product tokens — generated');
    expect(output).toContain('Do not edit manually');
  });

  it('imports UIKit for static tokens', () => {
    expect(output).toContain('import UIKit');
  });

  it('imports SwiftUI for theme-varying tokens', () => {
    expect(output).toContain('import SwiftUI');
  });

  it('emits enum for static category', () => {
    expect(output).toContain('public enum ProductLayout {');
    expect(output).toContain('public enum ProductMotion {');
  });

  it('emits CGFloat for logical values', () => {
    expect(output).toContain('public static let contentMaxWidth: CGFloat = 1336');
  });

  it('emits ref with DesignTokens prefix', () => {
    expect(output).toContain('public static let contentIndent: CGFloat = DesignTokens.space300');
  });

  it('emits nested duration ref', () => {
    expect(output).toContain('public static let flipDuration: TimeInterval = DesignTokens.Duration.duration250');
  });

  it('converts ms to seconds for hard duration values', () => {
    expect(output).toContain('public static let flickerDuration: TimeInterval = 0.8');
  });

  it('excludes web-only tokens', () => {
    expect(output).not.toContain('proseMeasureMax');
  });

  it('emits theme-varying as protocol extension', () => {
    expect(output).toContain('public extension DesignerPunkTheme {');
    expect(output).toContain('var productVisualizationDangerZoneBackground: Color { self.colorFeedbackInfoText }');
  });
});

/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for KotlinEmitter — object structure, types, composable getters, imports
 */

import { emitKotlin } from '../emitters/KotlinEmitter';
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
      { name: 'flickerDuration', value: 800, unitType: 'duration', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'Flicker', platforms: ['web', 'ios', 'android'] },
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

describe('KotlinEmitter', () => {
  const output = emitKotlin(categories, config);

  it('includes package declaration', () => {
    expect(output).toContain('package com.designerpunk.product.tokens');
  });

  it('includes file header', () => {
    expect(output).toContain('Product tokens — generated');
    expect(output).toContain('Do not edit manually');
  });

  it('imports DesignTokens for refs', () => {
    expect(output).toContain('import com.designerpunk.tokens.DesignTokens');
  });

  it('imports dp for logical tokens', () => {
    expect(output).toContain('import androidx.compose.ui.unit.dp');
  });

  it('imports Composable for theme-varying', () => {
    expect(output).toContain('import androidx.compose.runtime.Composable');
    expect(output).toContain('import androidx.compose.runtime.ReadOnlyComposable');
    expect(output).toContain('import com.designerpunk.tokens.LocalDPTheme');
  });

  it('imports Color for theme-varying', () => {
    expect(output).toContain('import androidx.compose.ui.graphics.Color');
  });

  it('emits object for category', () => {
    expect(output).toContain('object ProductLayout {');
    expect(output).toContain('object ProductMotion {');
  });

  it('emits .dp for logical values', () => {
    expect(output).toContain('val contentMaxWidth = 1336.dp');
  });

  it('emits ref with DesignTokens prefix', () => {
    expect(output).toContain('val contentIndent = DesignTokens.space_300');
  });

  it('emits nested duration ref', () => {
    expect(output).toContain('val flipDuration = DesignTokens.Duration.Duration250');
  });

  it('emits duration as Int with ms comment', () => {
    expect(output).toContain('val flickerDuration: Int = 800 // ms');
  });

  it('excludes web-only tokens', () => {
    expect(output).not.toContain('proseMeasureMax');
  });

  it('emits theme-varying with composable getter', () => {
    expect(output).toContain('object ProductVisualization {');
    expect(output).toContain('val dangerZoneBackground: Color');
    expect(output).toContain('@Composable @ReadOnlyComposable get() = LocalDPTheme.current.color_feedback_info_text');
  });

  it('includes composition scope note when theme-varying', () => {
    expect(output).toContain('Theme-varying tokens use @Composable getters');
  });
});

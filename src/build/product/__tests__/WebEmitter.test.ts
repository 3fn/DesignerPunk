/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for WebEmitter — CSS output format, refs, unresolved fallback
 */

import { emitCSS } from '../emitters/WebEmitter';
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
      { name: 'proseMeasureMax', value: 48, unitType: 'ch', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'Max line length', platforms: ['web'] },
    ],
  },
  {
    name: 'motion',
    description: 'Motion tokens',
    tokens: [
      { name: 'flipDuration', value: null, unitType: null, ref: 'duration250', resolvedPlatformPath: { web: '--duration-250', ios: 'Duration.duration250', android: 'Duration.Duration250' }, themeVarying: false, description: 'Flip timing', platforms: ['web', 'ios', 'android'] },
      { name: 'flickerCurve', value: null, unitType: null, ref: 'easeInOutCustom', resolvedPlatformPath: null, themeVarying: false, description: 'Broken ref', platforms: ['web'] },
      { name: 'iosOnly', value: 100, unitType: 'logical', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'iOS only', platforms: ['ios'] },
    ],
  },
  {
    name: 'typography',
    description: 'Typography tokens',
    tokens: [
      { name: 'statsHeroSize', value: 8, unitType: 'rem', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'Hero stat size', platforms: ['web'] },
      { name: 'easterEggDisplay', value: 4.5, unitType: 'rem', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'Easter egg display', platforms: ['web'] },
      { name: 'letterSpacingLabel', value: 0.04, unitType: 'em', ref: null, resolvedPlatformPath: null, themeVarying: false, description: 'Label tracking', platforms: ['web'] },
    ],
  },
];

describe('WebEmitter', () => {
  const output = emitCSS(categories, config);

  it('includes file header', () => {
    expect(output).toContain('Product tokens — generated');
    expect(output).toContain('Do not edit manually');
  });

  it('wraps in :root block', () => {
    expect(output).toContain(':root {');
    expect(output).toContain('}');
  });

  it('emits category headers', () => {
    expect(output).toContain('/* Product tokens: layout */');
    expect(output).toContain('/* Product tokens: motion */');
  });

  it('emits hard-value token with correct unit', () => {
    expect(output).toContain('--product-layout-content-max-width: 1336px;');
  });

  it('emits ch unit correctly', () => {
    expect(output).toContain('--product-layout-prose-measure-max: 48ch;');
  });

  // Regression: rem/em product tokens must emit with their unit suffix.
  // Pre-fix these fell through formatCSSValue's default and emitted a bare
  // number (e.g. "8"), producing invalid CSS the browser drops.
  // See .kiro/issues/2026-06-12-product-generator-unit-drop.md
  it('emits rem unit with suffix (integer value)', () => {
    expect(output).toContain('--product-typography-stats-hero-size: 8rem;');
  });

  it('emits rem unit with suffix (fractional value)', () => {
    expect(output).toContain('--product-typography-easter-egg-display: 4.5rem;');
  });

  it('emits em unit with suffix', () => {
    expect(output).toContain('--product-typography-letter-spacing-label: 0.04em;');
  });

  it('emits ref token with var()', () => {
    expect(output).toContain('--product-layout-content-indent: var(--space-300);');
  });

  it('emits duration ref with var()', () => {
    expect(output).toContain('--product-motion-flip-duration: var(--duration-250);');
  });

  it('emits unresolved ref with warning comment', () => {
    expect(output).toContain('/* ⚠️ UNRESOLVED */ --product-motion-flicker-curve: initial;');
  });

  it('includes description as inline comment', () => {
    expect(output).toContain('/* Max width */');
    expect(output).toContain('/* Left indent */');
  });

  it('excludes tokens not targeting web', () => {
    expect(output).not.toContain('ios-only');
    expect(output).not.toContain('iosOnly');
  });
});

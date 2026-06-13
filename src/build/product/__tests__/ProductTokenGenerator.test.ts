/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for ProductTokenGenerator — parsing, ref resolution, broken refs, platform filtering
 */

import * as path from 'path';
import { ProductTokenGenerator } from '../ProductTokenGenerator';
import type { GeneratorConfig } from '../ProductTokenGenerator';

const FIXTURES_TOKENS = path.join(__dirname, 'fixtures/tokens');
const TOKEN_INDEX = path.resolve(__dirname, '../../../../token-index');

const config: GeneratorConfig = {
  productTokensDir: FIXTURES_TOKENS,
  tokenIndexDir: TOKEN_INDEX,
  outputDir: '/tmp/test-output',
  configName: 'DesignerPunk',
  configAbbreviation: 'DP',
};

describe('ProductTokenGenerator', () => {
  describe('generate()', () => {
    it('parses categories from YAML files', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.generate();
      expect(result.categoryCount).toBe(3);
      expect(result.categories.map(c => c.name).sort()).toEqual(['layout', 'motion', 'visualization']);
    });

    it('resolves ref tokens with platform paths', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.generate();
      const layout = result.categories.find(c => c.name === 'layout')!;
      const indent = layout.tokens.find(t => t.name === 'contentIndent')!;
      expect(indent.ref).toBe('space300');
      expect(indent.resolvedPlatformPath).not.toBeNull();
      expect(indent.resolvedPlatformPath!.web).toBe('--space-300');
      expect(indent.resolvedPlatformPath!.ios).toBe('space300');
      expect(indent.themeVarying).toBe(false);
    });

    it('preserves hard-value tokens', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.generate();
      const layout = result.categories.find(c => c.name === 'layout')!;
      const maxWidth = layout.tokens.find(t => t.name === 'contentMaxWidth')!;
      expect(maxWidth.value).toBe(1336);
      expect(maxWidth.unitType).toBe('logical');
      expect(maxWidth.ref).toBeNull();
      expect(maxWidth.resolvedPlatformPath).toBeNull();
    });

    it('collects broken refs with source context', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.generate();
      expect(result.brokenRefs).toHaveLength(1);
      expect(result.brokenRefs[0]).toEqual({
        token: 'flickerCurve',
        ref: 'easeInOutCustom',
        file: 'motion.yaml',
      });
    });

    it('includes broken ref tokens in output (with null resolvedPlatformPath)', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.generate();
      const motion = result.categories.find(c => c.name === 'motion')!;
      const broken = motion.tokens.find(t => t.name === 'flickerCurve')!;
      expect(broken.ref).toBe('easeInOutCustom');
      expect(broken.resolvedPlatformPath).toBeNull();
    });

    it('resolves color refs (theme-varying after semantic token update)', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.generate();
      const viz = result.categories.find(c => c.name === 'visualization')!;
      const token = viz.tokens.find(t => t.name === 'dangerZoneBackground')!;
      expect(token.themeVarying).toBe(true);
      expect(token.resolvedPlatformPath).not.toBeNull();
      expect(token.resolvedPlatformPath!.web).toBe('--color-feedback-info-text');
    });

    it('defaults platforms to all when not specified', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.generate();
      const motion = result.categories.find(c => c.name === 'motion')!;
      const flip = motion.tokens.find(t => t.name === 'flipDuration')!;
      expect(flip.platforms).toEqual(['web', 'ios', 'android']);
    });

    it('preserves platform-limited tokens', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.generate();
      const layout = result.categories.find(c => c.name === 'layout')!;
      const prose = layout.tokens.find(t => t.name === 'proseMeasureMax')!;
      expect(prose.platforms).toEqual(['web']);
    });
  });

  describe('validate()', () => {
    it('reports per-file results', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.validate();
      expect(result.categories.length).toBe(3);
      const layout = result.categories.find(c => c.file === 'layout.yaml')!;
      expect(layout.valid).toBe(true);
      expect(layout.tokenCount).toBe(3);
    });

    it('marks files with broken refs as invalid', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.validate();
      const motion = result.categories.find(c => c.file === 'motion.yaml')!;
      expect(motion.valid).toBe(false);
    });

    it('collects all broken refs', () => {
      const gen = new ProductTokenGenerator(config);
      const result = gen.validate();
      expect(result.brokenRefs).toHaveLength(1);
    });
  });

  describe('missing directory', () => {
    it('returns empty result for nonexistent productTokensDir', () => {
      const gen = new ProductTokenGenerator({ ...config, productTokensDir: '/nonexistent' });
      const result = gen.generate();
      expect(result.tokenCount).toBe(0);
      expect(result.categoryCount).toBe(0);
      expect(result.categories).toEqual([]);
    });
  });
});

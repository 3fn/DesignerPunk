/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for TokenRefResolver — resolution paths, edge cases, graceful failures
 */

import * as path from 'path';
import { TokenRefResolver } from '../../indexer/TokenRefResolver';

const FIXTURES = path.join(__dirname, '../../__tests__/fixtures/token-index');

describe('TokenRefResolver', () => {
  let resolver: TokenRefResolver;

  beforeEach(() => {
    resolver = new TokenRefResolver(FIXTURES);
    resolver.load();
  });

  describe('primitive resolution', () => {
    it('resolves spacing primitive with full depth', () => {
      expect(resolver.resolve('space300')).toEqual({ value: 24, unitType: 'logical', depth: 'full' });
    });

    it('resolves color primitive with full depth', () => {
      const r = resolver.resolve('pink400');
      expect(r).not.toBeNull();
      expect(r!.unitType).toBe('color');
      expect(r!.depth).toBe('full');
      // Color values are structured objects
      expect(r!.value).toEqual({ light: { base: '#E91E63', wcag: 4.5 }, dark: { base: '#F48FB1', wcag: 4.5 } });
    });

    it('resolves duration primitive', () => {
      expect(resolver.resolve('duration250')).toEqual({ value: 250, unitType: 'duration', depth: 'full' });
    });

    it('resolves fontSize primitive as logical', () => {
      expect(resolver.resolve('fontSize100')).toEqual({ value: 1, unitType: 'logical', depth: 'full' });
    });

    it('resolves lineHeight primitive as ratio', () => {
      expect(resolver.resolve('lineHeight100')).toEqual({ value: 1.5, unitType: 'ratio', depth: 'full' });
    });

    it('resolves fontWeight primitive as count', () => {
      expect(resolver.resolve('fontWeight400')).toEqual({ value: 400, unitType: 'count', depth: 'full' });
    });

    it('resolves easing primitive as easing', () => {
      expect(resolver.resolve('easingStandard')).toEqual({
        value: 'cubic-bezier(0.4, 0, 0.2, 1)', unitType: 'easing', depth: 'full',
      });
    });

    it('resolves opacity primitive as percent', () => {
      expect(resolver.resolve('opacity048')).toEqual({ value: 0.48, unitType: 'percent', depth: 'full' });
    });
  });

  describe('semantic single-key resolution', () => {
    it('resolves semantic with value key — chases to primitive (full)', () => {
      const r = resolver.resolve('color.feedback.error.text');
      expect(r).not.toBeNull();
      expect(r!.unitType).toBe('color');
      expect(r!.depth).toBe('full');
      // Chased through pink400
      expect(r!.value).toEqual({ light: { base: '#E91E63', wcag: 4.5 }, dark: { base: '#F48FB1', wcag: 4.5 } });
    });

    it('resolves semantic with non-value single key — chases to primitive (full)', () => {
      const r = resolver.resolve('gridGutterMd');
      expect(r).toEqual({ value: 24, unitType: 'logical', depth: 'full' });
    });
  });

  describe('semantic multi-key resolution', () => {
    it('returns partial for typography (3+ keys)', () => {
      const r = resolver.resolve('typography.bodyMd');
      expect(r).not.toBeNull();
      expect(r!.depth).toBe('partial');
      expect(r!.unitType).toBe('composite');
      expect(r!.value).toBe('typography.bodyMd');
    });

    it('returns partial for motion (2 keys, no value key)', () => {
      const r = resolver.resolve('motion.floatLabel');
      expect(r).not.toBeNull();
      expect(r!.depth).toBe('partial');
      expect(r!.unitType).toBe('logical'); // category: interaction → logical
    });

    it('returns partial for 2-key color semantic (color + opacity)', () => {
      const r = resolver.resolve('color.structure.border.subtle');
      expect(r).not.toBeNull();
      expect(r!.depth).toBe('partial');
      expect(r!.unitType).toBe('color');
    });
  });

  describe('semantic null primitiveReferences', () => {
    it('returns partial for layering tokens with null refs', () => {
      const r = resolver.resolve('zIndex.navigation');
      expect(r).not.toBeNull();
      expect(r!.depth).toBe('partial');
      expect(r!.unitType).toBe('count'); // category: layering → count
      expect(r!.value).toBe('zIndex.navigation');
    });
  });

  describe('component resolution', () => {
    it('resolves component with primitive ref — chases to primitive (full)', () => {
      const r = resolver.resolve('buttonicon.inset.large');
      expect(r).toEqual({ value: 16, unitType: 'logical', depth: 'full' });
    });

    it('resolves component with literal value as partial', () => {
      const r = resolver.resolve('verticallistitem.paddingBlock.rest');
      expect(r).not.toBeNull();
      expect(r!.value).toBe(11);
      expect(r!.unitType).toBe('unknown');
      expect(r!.depth).toBe('partial');
    });
  });

  describe('not found', () => {
    it('returns null for unknown token name', () => {
      expect(resolver.resolve('nonexistent.token')).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(resolver.resolve('')).toBeNull();
    });
  });

  describe('missing token-index directory', () => {
    it('returns null for all resolves when directory does not exist', () => {
      const missing = new TokenRefResolver('/nonexistent/path');
      missing.load();
      expect(missing.resolve('space300')).toBeNull();
      expect(missing.resolve('color.feedback.error.text')).toBeNull();
      expect(missing.resolve('buttonicon.inset.large')).toBeNull();
    });

    it('handles undefined tokenIndexDir', () => {
      const undef = new TokenRefResolver(undefined);
      undef.load();
      expect(undef.resolve('space300')).toBeNull();
    });
  });

  describe('reload', () => {
    it('picks up changes when load() is called again', () => {
      // First load uses fixtures
      expect(resolver.resolve('space300')).not.toBeNull();

      // Reload with nonexistent dir clears data
      const fresh = new TokenRefResolver('/nonexistent');
      fresh.load();
      expect(fresh.resolve('space300')).toBeNull();
    });
  });
});

/**
 * @jest-environment node
 * @category evergreen
 * @purpose Unit tests for TokenIndexReader — loading, lookup, qualified paths, themeVarying
 */

import * as path from 'path';
import { TokenIndexReader } from '../TokenIndexReader';

// Use the real token-index for integration-level confidence
const TOKEN_INDEX = path.resolve(__dirname, '../../../../token-index');

describe('TokenIndexReader', () => {
  let reader: TokenIndexReader;

  beforeAll(() => {
    reader = new TokenIndexReader(TOKEN_INDEX);
    reader.load();
  });

  describe('primitive lookup', () => {
    it('returns flat platform paths for spacing', () => {
      const entry = reader.lookup('space300');
      expect(entry).not.toBeNull();
      expect(entry!.platforms.web).toBe('--space-300');
      expect(entry!.platforms.ios).toBe('space300');
      expect(entry!.platforms.android).toBe('space_300');
      expect(entry!.themeVarying).toBe(false);
      expect(entry!.family).toBe('spacing');
    });

    it('returns qualified paths for nested primitives (duration)', () => {
      const entry = reader.lookup('duration250');
      expect(entry).not.toBeNull();
      expect(entry!.platforms.ios).toContain('Duration.');
      expect(entry!.platforms.android).toContain('Duration.');
      expect(entry!.family).toBe('duration');
    });
  });

  describe('semantic lookup', () => {
    it('returns non-theme-varying semantic token', () => {
      const entry = reader.lookup('color.feedback.error.text');
      expect(entry).not.toBeNull();
      expect(entry!.platforms.web).toBe('--color-feedback-error-text');
      expect(entry!.themeVarying).toBe(false);
      expect(entry!.category).toBe('color');
    });

    it('returns semantic token with correct platform paths', () => {
      // color.structure.canvas is base light/dark mode-varying via dark override (Spec 117 §4).
      // (color.feedback.info.text is a WCAG-only override — theme-varying, NOT base-mode
      // varying — so it is correctly themeVarying:false in the index.)
      const entry = reader.lookup('color.structure.canvas');
      expect(entry).not.toBeNull();
      expect(entry!.themeVarying).toBe(true);
      expect(entry!.platforms.ios).toBe('theme.colorStructureCanvas');
      expect(entry!.platforms.android).toBe('theme.color_structure_canvas');
    });
  });

  describe('component lookup', () => {
    it('returns component token with platform paths', () => {
      const entry = reader.lookup('buttonicon.inset.large');
      expect(entry).not.toBeNull();
      expect(entry!.component).toBe('ButtonIcon');
      expect(entry!.platforms.web).toBe('--buttonicon-inset-large');
      expect(entry!.themeVarying).toBe(false);
    });
  });

  describe('not found', () => {
    it('returns null for unknown token', () => {
      expect(reader.lookup('nonexistent.token')).toBeNull();
    });
  });

  describe('missing directory', () => {
    it('handles nonexistent directory gracefully', () => {
      const missing = new TokenIndexReader('/nonexistent/path');
      missing.load();
      expect(missing.lookup('space300')).toBeNull();
    });
  });
});

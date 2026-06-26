/**
 * @category evergreen
 * @purpose Verify Badge-Label-Base component tokens are correctly defined and registered
 */
/**
 * Badge-Label-Base Token Tests
 * 
 * Tests for the Badge-Label-Base component token definitions.
 * Verifies token values, registry registration, and metadata.
 * 
 * @see Requirements 4.8, 9.3, 9.4, 9.5 in .kiro/specs/044-badge-base/requirements.md
 */

import { getTokenContract } from '../../../../build/tokens';
import {
  BadgeLabelBaseTokens,
  getBadgeLabelMaxWidth,
  BadgeLabelBaseTokenReferences
} from '../tokens';

describe('Badge-Label-Base Tokens', () => {
  describe('Token Values', () => {
    test('should define maxWidth token with correct value', () => {
      expect(BadgeLabelBaseTokens['maxWidth']).toBe(120);
    });

    test('getBadgeLabelMaxWidth should return correct value', () => {
      expect(getBadgeLabelMaxWidth()).toBe(120);
    });
  });

  describe('Token References', () => {
    test('should document maxWidth as family-conformant value', () => {
      expect(BadgeLabelBaseTokenReferences.maxWidth.value).toBe(120);
      expect(BadgeLabelBaseTokenReferences.maxWidth.familyConformant).toBe(true);
      expect(BadgeLabelBaseTokenReferences.maxWidth.primitiveReference).toBeNull();
    });

    test('should document correct derivation', () => {
      expect(BadgeLabelBaseTokenReferences.maxWidth.derivation).toBe(
        'SPACING_BASE_VALUE × 15 = 8 × 15 = 120'
      );
    });
  });

  describe('Branded Contract', () => {
    // Spec 124: defineComponentTokens no longer self-registers; the rich tokens ride back
    // on the non-enumerable brand and are recovered via getTokenContract. (Was: a
    // Registry Registration block populated by the import side effect — now false-red.)
    test('should carry the maxWidth token on the branded return', () => {
      const tokens = getTokenContract(BadgeLabelBaseTokens);
      expect(tokens).toBeDefined();
      const token = tokens?.find(t => t.name === 'badgelabelbase.maxWidth');
      expect(token).toBeDefined();
    });

    test('should carry correct metadata for the maxWidth token', () => {
      const tokens = getTokenContract(BadgeLabelBaseTokens);
      const token = tokens?.find(t => t.name === 'badgelabelbase.maxWidth');
      expect(token).toBeDefined();
      expect(token?.name).toBe('badgelabelbase.maxWidth');
      expect(token?.component).toBe('BadgeLabelBase');
      expect(token?.family).toBe('spacing');
      expect(token?.value).toBe(120);
      expect(token?.primitiveReference).toBeUndefined();
      expect(token?.reasoning).toContain('Maximum width for truncated badges');
    });

    test('should brand exactly the one BadgeLabelBase token', () => {
      const tokens = getTokenContract(BadgeLabelBaseTokens);
      expect(tokens).toHaveLength(1);
      expect(tokens?.[0].name).toBe('badgelabelbase.maxWidth');
      expect(tokens?.[0].component).toBe('BadgeLabelBase');
      expect(tokens?.[0].family).toBe('spacing');
    });
  });

  describe('Mathematical Conformance', () => {
    test('maxWidth value should follow spacing family pattern (8 × multiplier)', () => {
      const SPACING_BASE_VALUE = 8;
      const maxWidth = BadgeLabelBaseTokens['maxWidth'];
      
      // 120 = 8 × 15, so it follows the spacing family pattern
      expect(maxWidth % SPACING_BASE_VALUE).toBe(0);
      expect(maxWidth / SPACING_BASE_VALUE).toBe(15);
    });
  });
});

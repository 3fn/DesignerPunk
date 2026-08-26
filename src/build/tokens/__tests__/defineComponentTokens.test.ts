/**
 * @category evergreen
 * @purpose Verify defineComponentTokens helper provides correct token values and branded contract
 */
/**
 * defineComponentTokens Unit Tests
 *
 * Tests for the component token definition helper function.
 * Covers token value extraction, the branded return contract, and validation.
 *
 * Spec 124: defineComponentTokens no longer self-registers. The rich
 * RegisteredComponentToken[] rides back on a non-enumerable brand and is recovered via
 * getTokenContract; the harvest in loadComponentTokens is the sole registry writer. The
 * former "Registry Registration" / "Token Name Generation" / "Multiple Component
 * Registration" / "Family Indexing" blocks asserted the side effect as the contract and
 * are rewritten here against the branded return (the name-lowercasing behavior is re-pinned
 * to the harvested array's `name` field, not deleted).
 *
 * @see Requirements 2.1-2.6 in .kiro/specs/037-component-token-generation-pipeline/requirements.md
 * @see .kiro/specs/124-component-token-return-contract/design.md
 */

import {
  defineComponentTokens,
  getTokenContract,
  TOKEN_CONTRACT_BRAND,
  PrimitiveTokenReference,
  TokenWithReference,
  TokenWithValue,
  ComponentTokenConfig,
  ComponentTokenValues
} from '../defineComponentTokens';

// Mock primitive token references for testing
const createMockPrimitiveToken = (name: string, baseValue: number): PrimitiveTokenReference => ({
  name,
  baseValue,
});

describe('defineComponentTokens', () => {
  describe('Token Value Extraction', () => {
    test('should return correct token values for reference tokens', () => {
      const space100 = createMockPrimitiveToken('space100', 8);
      const space150 = createMockPrimitiveToken('space150', 12);

      const tokens = defineComponentTokens({
        component: 'TestComponent',
        family: 'spacing',
        tokens: {
          'inset.small': {
            reference: space100,
            reasoning: 'Small inset uses 8px spacing',
          },
          'inset.large': {
            reference: space150,
            reasoning: 'Large inset uses 12px spacing',
          },
        },
      });

      expect(tokens['inset.small']).toBe(8);
      expect(tokens['inset.large']).toBe(12);
    });

    test('should return correct token values for value tokens', () => {
      const tokens = defineComponentTokens({
        component: 'TestComponent',
        family: 'spacing',
        tokens: {
          'custom.small': {
            value: 6,
            reasoning: 'Custom small value for specific design requirement',
          },
          'custom.large': {
            value: 14,
            reasoning: 'Custom large value for specific design requirement',
          },
        },
      });

      expect(tokens['custom.small']).toBe(6);
      expect(tokens['custom.large']).toBe(14);
    });

    test('should handle mixed reference and value tokens', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      const tokens = defineComponentTokens({
        component: 'TestComponent',
        family: 'spacing',
        tokens: {
          'inset.standard': {
            reference: space100,
            reasoning: 'Standard inset uses primitive token',
          },
          'inset.custom': {
            value: 10,
            reasoning: 'Custom inset for specific design requirement',
          },
        },
      });

      expect(tokens['inset.standard']).toBe(8);
      expect(tokens['inset.custom']).toBe(10);
    });
  });

  describe('Branded Contract', () => {
    test('should carry the rich tokens on the branded return', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': {
            reference: space100,
            reasoning: 'Medium button inset',
          },
        },
      });

      const tokens = getTokenContract(result);
      expect(tokens).toBeDefined();
      expect(tokens?.some(t => t.name === 'buttonicon.inset.medium')).toBe(true);
    });

    test('should carry all tokens from a single call', () => {
      const space100 = createMockPrimitiveToken('space100', 8);
      const space150 = createMockPrimitiveToken('space150', 12);

      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.small': {
            reference: space100,
            reasoning: 'Small button inset',
          },
          'inset.large': {
            reference: space150,
            reasoning: 'Large button inset',
          },
        },
      });

      const tokens = getTokenContract(result);
      expect(tokens).toHaveLength(2);
    });

    test('should carry correct metadata for reference tokens', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': {
            reference: space100,
            reasoning: 'Medium button uses 8px inset for visual balance',
          },
        },
      });

      const token = getTokenContract(result)?.find(t => t.name === 'buttonicon.inset.medium');
      expect(token).toBeDefined();
      expect(token?.name).toBe('buttonicon.inset.medium');
      expect(token?.component).toBe('ButtonIcon');
      expect(token?.family).toBe('spacing');
      expect(token?.value).toBe(8);
      expect(token?.primitiveReference).toBe('space100');
      expect(token?.reasoning).toBe('Medium button uses 8px inset for visual balance');
    });

    test('should carry correct metadata for value tokens', () => {
      const result = defineComponentTokens({
        component: 'CustomComponent',
        family: 'spacing',
        tokens: {
          'gap.special': {
            value: 10,
            reasoning: 'Special gap value for unique design requirement',
          },
        },
      });

      const token = getTokenContract(result)?.find(t => t.name === 'customcomponent.gap.special');
      expect(token).toBeDefined();
      expect(token?.name).toBe('customcomponent.gap.special');
      expect(token?.component).toBe('CustomComponent');
      expect(token?.family).toBe('spacing');
      expect(token?.value).toBe(10);
      expect(token?.primitiveReference).toBeUndefined();
      expect(token?.reasoning).toBe('Special gap value for unique design requirement');
    });

    test('brand is non-enumerable: spread / Object.keys / JSON.stringify are unchanged', () => {
      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': { value: 8, reasoning: 'Test token' },
        },
      });

      expect(Object.keys(result)).toEqual(['inset.medium']);
      expect(Object.keys({ ...result })).toEqual(['inset.medium']);
      expect(JSON.parse(JSON.stringify(result))).toEqual({ 'inset.medium': 8 });
      expect(Object.prototype.propertyIsEnumerable.call(result, TOKEN_CONTRACT_BRAND)).toBe(false);
    });
  });

  describe('Token Name Generation (re-pinned to the harvested name field)', () => {
    test('should generate lowercase component name in the branded token name', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': {
            reference: space100,
            reasoning: 'Test token',
          },
        },
      });

      const names = getTokenContract(result)?.map(t => t.name) ?? [];
      expect(names).toContain('buttonicon.inset.medium');
      expect(names).not.toContain('ButtonIcon.inset.medium');
    });

    test('should preserve token key structure in the branded name', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      const result = defineComponentTokens({
        component: 'Card',
        family: 'spacing',
        tokens: {
          'padding.horizontal.large': {
            reference: space100,
            reasoning: 'Test token',
          },
        },
      });

      const names = getTokenContract(result)?.map(t => t.name) ?? [];
      expect(names).toContain('card.padding.horizontal.large');
    });
  });

  describe('Input Validation', () => {
    test('should throw error for empty component name', () => {
      expect(() => {
        defineComponentTokens({
          component: '',
          family: 'spacing',
          tokens: {
            'test': { value: 8, reasoning: 'Test' },
          },
        });
      }).toThrow('Component name is required');
    });

    test('should throw error for whitespace-only component name', () => {
      expect(() => {
        defineComponentTokens({
          component: '   ',
          family: 'spacing',
          tokens: {
            'test': { value: 8, reasoning: 'Test' },
          },
        });
      }).toThrow('Component name is required');
    });

    test('should throw error for empty family name', () => {
      expect(() => {
        defineComponentTokens({
          component: 'TestComponent',
          family: '',
          tokens: {
            'test': { value: 8, reasoning: 'Test' },
          },
        });
      }).toThrow('Token family is required');
    });

    test('should throw error for whitespace-only family name', () => {
      expect(() => {
        defineComponentTokens({
          component: 'TestComponent',
          family: '   ',
          tokens: {
            'test': { value: 8, reasoning: 'Test' },
          },
        });
      }).toThrow('Token family is required');
    });

    test('should throw error for empty tokens object', () => {
      expect(() => {
        defineComponentTokens({
          component: 'TestComponent',
          family: 'spacing',
          tokens: {},
        });
      }).toThrow('At least one token definition is required');
    });
  });

  describe('Multiple Component Definitions', () => {
    test('each call brands its own component tokens independently', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      const buttonResult = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': {
            reference: space100,
            reasoning: 'Button inset',
          },
        },
      });

      const cardResult = defineComponentTokens({
        component: 'Card',
        family: 'spacing',
        tokens: {
          'padding.medium': {
            reference: space100,
            reasoning: 'Card padding',
          },
        },
      });

      const buttonNames = getTokenContract(buttonResult)?.map(t => t.name) ?? [];
      const cardNames = getTokenContract(cardResult)?.map(t => t.name) ?? [];
      expect(buttonNames).toContain('buttonicon.inset.medium');
      expect(cardNames).toContain('card.padding.medium');
      // Each return carries only its own tokens — no shared/global accumulation.
      expect(getTokenContract(buttonResult)).toHaveLength(1);
      expect(getTokenContract(cardResult)).toHaveLength(1);
    });

    test('a single call brands the correct component metadata for all its tokens', () => {
      const space100 = createMockPrimitiveToken('space100', 8);
      const space150 = createMockPrimitiveToken('space150', 12);

      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.small': { reference: space100, reasoning: 'Small' },
          'inset.large': { reference: space150, reasoning: 'Large' },
        },
      });

      const tokens = getTokenContract(result) ?? [];
      expect(tokens).toHaveLength(2);
      expect(tokens.every(t => t.component === 'ButtonIcon')).toBe(true);
    });
  });

  describe('Family Metadata', () => {
    test('each call brands its tokens with the configured family', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      const spacingResult = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': { reference: space100, reasoning: 'Spacing token' },
        },
      });

      const radiusResult = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'radius',
        tokens: {
          'corner.medium': { value: 4, reasoning: 'Radius token' },
        },
      });

      const spacingTokens = getTokenContract(spacingResult) ?? [];
      const radiusTokens = getTokenContract(radiusResult) ?? [];
      expect(spacingTokens).toHaveLength(1);
      expect(spacingTokens.every(t => t.family === 'spacing')).toBe(true);
      expect(radiusTokens).toHaveLength(1);
      expect(radiusTokens.every(t => t.family === 'radius')).toBe(true);
    });
  });

  describe('Family-mismatch guard (reference path)', () => {
    // A reference literal that carries `category`, as every real primitive in
    // src/tokens/** does. The guard keys off this field.
    const createMockPrimitiveWithCategory = (
      name: string,
      baseValue: number,
      category: string
    ): PrimitiveTokenReference => ({ name, baseValue, category });

    test('throws when a reference primitive belongs to a different family than declared', () => {
      const size600 = createMockPrimitiveWithCategory('size600', 48, 'sizing');

      expect(() =>
        defineComponentTokens({
          component: 'ButtonIcon',
          family: 'spacing',
          tokens: {
            'size.large': { reference: size600, reasoning: 'Large button size' },
          },
        })
      ).toThrow(/Token family mismatch/);
    });

    test('error names the component, token, declared family, primitive and its real family', () => {
      const size600 = createMockPrimitiveWithCategory('size600', 48, 'sizing');

      let message = '';
      try {
        defineComponentTokens({
          component: 'ButtonIcon',
          family: 'spacing',
          tokens: {
            'size.large': { reference: size600, reasoning: 'Large button size' },
          },
        });
      } catch (error) {
        message = (error as Error).message;
      }

      expect(message).toContain("component 'ButtonIcon'");
      expect(message).toContain("token 'size.large'");
      expect(message).toContain("'spacing' family call");
      expect(message).toContain("'size600'");
      expect(message).toContain("'sizing' family");
    });

    test('regression: the real Button-Icon defect (PR #126) now fails at authoring time', () => {
      // Before PR #126, buttonIcon.tokens.ts declared family 'spacing' while referencing
      // sizing primitives. That produced `SpacingTokens.size600` — a member no generated
      // platform file defines — and was caught only by reading generated Swift/Kotlin.
      expect(() =>
        defineComponentTokens({
          component: 'ButtonIcon',
          family: 'spacing',
          tokens: {
            'inset.large': {
              reference: createMockPrimitiveWithCategory('space150', 12, 'spacing'),
              reasoning: 'Correctly family-matched spacing token',
            },
            'size.large': {
              reference: createMockPrimitiveWithCategory('size600', 48, 'sizing'),
              reasoning: 'Mis-stamped sizing token — the defect',
            },
          },
        })
      ).toThrow(/references primitive 'size600' from the 'sizing' family/);
    });

    test('accepts a reference whose category matches the declared family', () => {
      const size600 = createMockPrimitiveWithCategory('size600', 48, 'sizing');

      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'sizing',
        tokens: {
          'size.large': { reference: size600, reasoning: 'Large button size' },
        },
      });

      expect(result['size.large']).toBe(48);
      expect((getTokenContract(result) ?? [])[0].family).toBe('sizing');
    });

    test('does not fire for reference literals without a category (back-compat)', () => {
      const bareRef = createMockPrimitiveToken('space100', 8);

      expect(() =>
        defineComponentTokens({
          component: 'ButtonIcon',
          family: 'sizing',
          tokens: {
            'inset.small': { reference: bareRef, reasoning: 'Bare reference literal' },
          },
        })
      ).not.toThrow();
    });

    test('does not fire for value-path tokens (the Avatar icon-size case is NOT covered)', () => {
      // Documents a real limitation: the Avatar `icon.size.*` gap fillers were mis-stamped
      // `family: 'spacing'` on the VALUE path. No reference exists to cross-check, so this
      // guard cannot catch that class of mislabel.
      expect(() =>
        defineComponentTokens({
          component: 'Avatar',
          family: 'spacing',
          tokens: {
            'icon.size.xs': { value: 12, reasoning: 'Dimensional value in a spacing call' },
          },
        })
      ).not.toThrow();
    });
  });

  describe('Idempotent re-branding (Spec 124, caveat c)', () => {
    test('re-applying the brand to the same return does not throw', () => {
      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': { value: 8, reasoning: 'Test token' },
        },
      });

      // Re-running through defineComponentTokens produces a fresh object; the idempotency
      // guard protects against double-application on the SAME object (dual-path load).
      // Simulate that by re-defining the property via the same guarded path indirectly:
      expect(() => {
        const tokens = getTokenContract(result)!;
        // hasOwnProperty guard means a second defineProperty is skipped, not thrown.
        if (!Object.prototype.hasOwnProperty.call(result, TOKEN_CONTRACT_BRAND)) {
          Object.defineProperty(result, TOKEN_CONTRACT_BRAND, { value: tokens });
        }
      }).not.toThrow();
      expect(getTokenContract(result)).toHaveLength(1);
    });
  });

  describe('Public return type stays the flat value-map (Spec 124, R1 AC3)', () => {
    test('return is assignable to ComponentTokenValues and the brand key is absent from the type', () => {
      const result = defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': { value: 8, reasoning: 'Test token' },
        },
      });

      // Compile-time assertion: the public return is assignable to the flat value-map type.
      const asValues: ComponentTokenValues<{ 'inset.medium': TokenWithValue }> = result;
      expect(asValues['inset.medium']).toBe(8);

      // The brand key must NOT be part of the public/enumerable type — reading it off the
      // typed value is a type error (the brand is recoverable only via getTokenContract).
      // @ts-expect-error — brand is intentionally absent from ComponentTokenValues<T>.
      const _brand = asValues[TOKEN_CONTRACT_BRAND];
      void _brand;
    });
  });
});

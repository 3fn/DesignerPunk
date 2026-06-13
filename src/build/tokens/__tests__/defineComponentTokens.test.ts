/**
 * @category evergreen
 * @purpose Verify defineComponentTokens helper provides correct token definition and registration
 */
/**
 * defineComponentTokens Unit Tests
 * 
 * Tests for the component token definition helper function.
 * Covers token value extraction, registry registration, and validation.
 * 
 * @see Requirements 2.1-2.6 in .kiro/specs/037-component-token-generation-pipeline/requirements.md
 */

import { 
  defineComponentTokens, 
  PrimitiveTokenReference,
  TokenWithReference,
  TokenWithValue,
  ComponentTokenConfig
} from '../defineComponentTokens';
import { ComponentTokenRegistry } from '../../../registries/ComponentTokenRegistry';

// Mock primitive token references for testing
const createMockPrimitiveToken = (name: string, baseValue: number): PrimitiveTokenReference => ({
  name,
  baseValue,
});

describe('defineComponentTokens', () => {
  beforeEach(() => {
    // Clear registry before each test to ensure isolation
    ComponentTokenRegistry.clear();
  });

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

  describe('Registry Registration', () => {
    test('should register tokens with ComponentTokenRegistry', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': {
            reference: space100,
            reasoning: 'Medium button inset',
          },
        },
      });

      expect(ComponentTokenRegistry.has('buttonicon.inset.medium')).toBe(true);
    });

    test('should register all tokens from a single call', () => {
      const space100 = createMockPrimitiveToken('space100', 8);
      const space150 = createMockPrimitiveToken('space150', 12);

      defineComponentTokens({
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

      const registeredTokens = ComponentTokenRegistry.getByComponent('ButtonIcon');
      expect(registeredTokens).toHaveLength(2);
    });

    test('should store correct metadata for reference tokens', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': {
            reference: space100,
            reasoning: 'Medium button uses 8px inset for visual balance',
          },
        },
      });

      const token = ComponentTokenRegistry.get('buttonicon.inset.medium');
      expect(token).toBeDefined();
      expect(token?.name).toBe('buttonicon.inset.medium');
      expect(token?.component).toBe('ButtonIcon');
      expect(token?.family).toBe('spacing');
      expect(token?.value).toBe(8);
      expect(token?.primitiveReference).toBe('space100');
      expect(token?.reasoning).toBe('Medium button uses 8px inset for visual balance');
    });

    test('should store correct metadata for value tokens', () => {
      defineComponentTokens({
        component: 'CustomComponent',
        family: 'spacing',
        tokens: {
          'gap.special': {
            value: 10,
            reasoning: 'Special gap value for unique design requirement',
          },
        },
      });

      const token = ComponentTokenRegistry.get('customcomponent.gap.special');
      expect(token).toBeDefined();
      expect(token?.name).toBe('customcomponent.gap.special');
      expect(token?.component).toBe('CustomComponent');
      expect(token?.family).toBe('spacing');
      expect(token?.value).toBe(10);
      expect(token?.primitiveReference).toBeUndefined();
      expect(token?.reasoning).toBe('Special gap value for unique design requirement');
    });
  });

  describe('Token Name Generation', () => {
    test('should generate lowercase component name in token name', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': {
            reference: space100,
            reasoning: 'Test token',
          },
        },
      });

      expect(ComponentTokenRegistry.has('buttonicon.inset.medium')).toBe(true);
      expect(ComponentTokenRegistry.has('ButtonIcon.inset.medium')).toBe(false);
    });

    test('should preserve token key structure in name', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      defineComponentTokens({
        component: 'Card',
        family: 'spacing',
        tokens: {
          'padding.horizontal.large': {
            reference: space100,
            reasoning: 'Test token',
          },
        },
      });

      expect(ComponentTokenRegistry.has('card.padding.horizontal.large')).toBe(true);
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

  describe('Multiple Component Registration', () => {
    test('should allow tokens from different components', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': {
            reference: space100,
            reasoning: 'Button inset',
          },
        },
      });

      defineComponentTokens({
        component: 'Card',
        family: 'spacing',
        tokens: {
          'padding.medium': {
            reference: space100,
            reasoning: 'Card padding',
          },
        },
      });

      expect(ComponentTokenRegistry.has('buttonicon.inset.medium')).toBe(true);
      expect(ComponentTokenRegistry.has('card.padding.medium')).toBe(true);
      expect(ComponentTokenRegistry.getAll()).toHaveLength(2);
    });

    test('should correctly index tokens by component', () => {
      const space100 = createMockPrimitiveToken('space100', 8);
      const space150 = createMockPrimitiveToken('space150', 12);

      defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.small': { reference: space100, reasoning: 'Small' },
          'inset.large': { reference: space150, reasoning: 'Large' },
        },
      });

      defineComponentTokens({
        component: 'Card',
        family: 'spacing',
        tokens: {
          'padding.medium': { reference: space100, reasoning: 'Medium' },
        },
      });

      expect(ComponentTokenRegistry.getByComponent('ButtonIcon')).toHaveLength(2);
      expect(ComponentTokenRegistry.getByComponent('Card')).toHaveLength(1);
    });
  });

  describe('Family Indexing', () => {
    test('should correctly index tokens by family', () => {
      const space100 = createMockPrimitiveToken('space100', 8);

      defineComponentTokens({
        component: 'ButtonIcon',
        family: 'spacing',
        tokens: {
          'inset.medium': { reference: space100, reasoning: 'Spacing token' },
        },
      });

      defineComponentTokens({
        component: 'ButtonIcon',
        family: 'radius',
        tokens: {
          'corner.medium': { value: 4, reasoning: 'Radius token' },
        },
      });

      expect(ComponentTokenRegistry.getByFamily('spacing')).toHaveLength(1);
      expect(ComponentTokenRegistry.getByFamily('radius')).toHaveLength(1);
    });
  });
});

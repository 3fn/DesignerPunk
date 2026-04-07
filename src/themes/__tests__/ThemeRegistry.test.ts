/**
 * @category evergreen
 * @purpose Verify ThemeRegistry registration, validation, and theme-varying computation
 */

import { ThemeRegistry, ThemeRegistration } from '../ThemeRegistry';

describe('ThemeRegistry', () => {
  let registry: ThemeRegistry;

  beforeEach(() => {
    registry = new ThemeRegistry();
  });

  describe('register', () => {
    test('accepts a valid theme registration', () => {
      const theme: ThemeRegistration = {
        name: 'marketing',
        mode: 'dark',
        overrides: {
          'color.action.primary': { primitiveReferences: { value: 'cyan300' } },
        },
      };

      registry.register(theme);
      expect(registry.size).toBe(1);
      expect(registry.get('marketing')).toBe(theme);
    });

    test('accepts multiple themes', () => {
      registry.register({ name: 'a', mode: 'dark', overrides: {} });
      registry.register({ name: 'b', mode: 'light', overrides: {} });
      registry.register({ name: 'c', mode: 'both', overrides: {} });

      expect(registry.size).toBe(3);
    });

    test('rejects duplicate theme name', () => {
      registry.register({ name: 'marketing', mode: 'dark', overrides: {} });

      expect(() => {
        registry.register({ name: 'marketing', mode: 'light', overrides: {} });
      }).toThrow("Theme 'marketing' is already registered");
    });

    test('rejects overrides referencing unknown semantic tokens when validator is set', () => {
      const knownTokens = new Set(['color.action.primary', 'color.structure.canvas']);
      registry.setSemanticValidator((name) => knownTokens.has(name));

      expect(() => {
        registry.register({
          name: 'bad',
          mode: 'dark',
          overrides: {
            'color.action.primary': { primitiveReferences: { value: 'cyan300' } },
            'color.nonexistent.token': { primitiveReferences: { value: 'pink400' } },
          },
        });
      }).toThrow("Theme 'bad' references unknown semantic token 'color.nonexistent.token'");
    });

    test('allows any overrides when no validator is set', () => {
      expect(() => {
        registry.register({
          name: 'anything',
          mode: 'dark',
          overrides: {
            'totally.made.up': { primitiveReferences: { value: 'whatever' } },
          },
        });
      }).not.toThrow();
    });
  });

  describe('get', () => {
    test('returns registered theme by name', () => {
      const theme: ThemeRegistration = { name: 'wcag', mode: 'both', overrides: {} };
      registry.register(theme);

      expect(registry.get('wcag')).toBe(theme);
    });

    test('returns undefined for unregistered name', () => {
      expect(registry.get('nonexistent')).toBeUndefined();
    });
  });

  describe('getAll', () => {
    test('returns empty array when no themes registered', () => {
      expect(registry.getAll()).toEqual([]);
    });

    test('returns themes in registration order', () => {
      registry.register({ name: 'first', mode: 'dark', overrides: {} });
      registry.register({ name: 'second', mode: 'light', overrides: {} });
      registry.register({ name: 'third', mode: 'both', overrides: {} });

      const names = registry.getAll().map((t) => t.name);
      expect(names).toEqual(['first', 'second', 'third']);
    });
  });

  describe('getThemeVaryingTokens', () => {
    test('returns empty set when no themes registered', () => {
      expect(registry.getThemeVaryingTokens().size).toBe(0);
    });

    test('returns empty set when themes have no overrides', () => {
      registry.register({ name: 'empty', mode: 'dark', overrides: {} });
      expect(registry.getThemeVaryingTokens().size).toBe(0);
    });

    test('returns union of overridden tokens across all themes', () => {
      registry.register({
        name: 'a',
        mode: 'dark',
        overrides: {
          'color.action.primary': { primitiveReferences: { value: 'cyan300' } },
          'color.structure.canvas': { primitiveReferences: { value: 'black500' } },
        },
      });
      registry.register({
        name: 'b',
        mode: 'both',
        overrides: {
          'color.action.primary': { primitiveReferences: { value: 'teal300' } },
          'color.text.default': { primitiveReferences: { value: 'gray100' } },
        },
      });

      const varying = registry.getThemeVaryingTokens();
      expect(varying.size).toBe(3);
      expect(varying.has('color.action.primary')).toBe(true);
      expect(varying.has('color.structure.canvas')).toBe(true);
      expect(varying.has('color.text.default')).toBe(true);
    });

    test('does not include tokens not overridden by any theme', () => {
      registry.register({
        name: 'a',
        mode: 'dark',
        overrides: {
          'color.action.primary': { primitiveReferences: { value: 'cyan300' } },
        },
      });

      const varying = registry.getThemeVaryingTokens();
      expect(varying.has('color.structure.canvas')).toBe(false);
    });
  });

  describe('clear', () => {
    test('removes all registered themes', () => {
      registry.register({ name: 'a', mode: 'dark', overrides: {} });
      registry.register({ name: 'b', mode: 'light', overrides: {} });

      registry.clear();
      expect(registry.size).toBe(0);
      expect(registry.getAll()).toEqual([]);
    });
  });
});

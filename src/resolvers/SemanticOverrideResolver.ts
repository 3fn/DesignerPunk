/**
 * SemanticOverrideResolver — Level 2 of the two-level mode-aware resolution system.
 *
 * Sits between Registry and Generation in the token pipeline. For dark mode,
 * swaps primitiveReferences on overridden tokens. For light mode, passes
 * tokens through unchanged.
 *
 * @see design.md § "Two-Level Resolution"
 * @see tasks.md Task 2.2
 */

import type { SemanticToken } from '../types/SemanticToken';
import type { SemanticTokenRegistry } from '../registries/SemanticTokenRegistry';
import type { SemanticOverrideMap, ThemeContext, ContextOverrideSet } from '../tokens/themes/types';
import type { ThemeRegistry } from '../themes/ThemeRegistry';
import type { ResolvedThemeSet } from '../themes/ResolvedThemeSet';

export interface OverrideValidationResult {
  valid: boolean;
  errors: string[];
}

export interface ResolvedTokenSets {
  light: SemanticToken[];
  dark: SemanticToken[];
}

export interface ContextResolvedTokenSets {
  'light-base': SemanticToken[];
  'light-wcag': SemanticToken[];
  'dark-base': SemanticToken[];
  'dark-wcag': SemanticToken[];
}

/** Apply a single override to a token (if present in the map). */
function applyOverride(token: SemanticToken, overrides: SemanticOverrideMap): SemanticToken {
  const override = overrides[token.name];
  if (!override) return token;
  return {
    ...token,
    primitiveReferences: override.primitiveReferences,
    modifiers: 'modifiers' in override ? override.modifiers : token.modifiers,
  };
}

export class SemanticOverrideResolver {
  constructor(
    private registry: SemanticTokenRegistry,
    private overrides: SemanticOverrideMap
  ) {}

  /** Validate all override keys exist in the semantic token registry. */
  validate(): OverrideValidationResult {
    const errors: string[] = [];
    for (const key of Object.keys(this.overrides)) {
      if (!this.registry.get(key)) {
        errors.push(`Orphaned override key "${key}": no matching semantic token in registry`);
      }
    }
    return { valid: errors.length === 0, errors };
  }

  /** Validate a ContextOverrideSet — all keys in all maps must exist in registry. */
  validateAll(contextOverrides: ContextOverrideSet): OverrideValidationResult {
    const errors: string[] = [];
    for (const [context, overrideMap] of Object.entries(contextOverrides)) {
      for (const key of Object.keys(overrideMap!)) {
        if (!this.registry.get(key)) {
          errors.push(`Orphaned override key "${key}" in ${context}: no matching semantic token in registry`);
        }
      }
    }
    return { valid: errors.length === 0, errors };
  }

  /** Resolve a single token for the given mode (Phase 1 API — backward compatible). */
  resolve(token: SemanticToken, mode: 'light' | 'dark'): SemanticToken {
    if (mode === 'light') return token;
    return applyOverride(token, this.overrides);
  }

  /** Produce light and dark token sets (Phase 1 API — backward compatible). */
  resolveAll(tokens: SemanticToken[]): ResolvedTokenSets {
    return {
      light: tokens.map(t => this.resolve(t, 'light')),
      dark: tokens.map(t => this.resolve(t, 'dark')),
    };
  }

  /**
   * Produce 4 context-resolved token sets from a ContextOverrideSet.
   * Each context applies its override maps in order: context-specific last wins.
   */
  resolveAllContexts(tokens: SemanticToken[], contextOverrides: ContextOverrideSet): ContextResolvedTokenSets {
    const contexts: ThemeContext[] = ['light-base', 'light-wcag', 'dark-base', 'dark-wcag'];
    const result = {} as ContextResolvedTokenSets;

    for (const ctx of contexts) {
      const overrideMap = contextOverrides[ctx];
      result[ctx] = tokens.map(t => overrideMap ? applyOverride(t, overrideMap) : t);
    }

    return result;
  }

  /**
   * Resolve tokens for all registered themes in a ThemeRegistry.
   * Returns a ResolvedThemeSet per context (mode × theme combination).
   *
   * For themes with mode 'both', produces two sets (light + dark).
   * For themes with mode 'dark' or 'light', produces one set.
   *
   * The base theme (light-base, dark-base) is always included as the
   * no-override baseline, even if no 'base' theme is registered.
   */
  resolveForRegistry(tokens: SemanticToken[], themeRegistry: ThemeRegistry): ResolvedThemeSet[] {
    const results: ResolvedThemeSet[] = [];

    // Always include the base contexts (no overrides)
    results.push({
      theme: null,
      contextKey: 'light-base',
      mode: 'light',
      themeId: 'base',
      tokens: tokens.map(t => ({ ...t })),
    });
    results.push({
      theme: null,
      contextKey: 'dark-base',
      mode: 'dark',
      themeId: 'base',
      tokens: tokens.map(t => ({ ...t })),
    });

    // Resolve each registered theme
    for (const theme of themeRegistry.getAll()) {
      const modes: Array<'light' | 'dark'> =
        theme.mode === 'both' ? ['light', 'dark'] :
        theme.mode === 'dark' ? ['dark'] :
        ['light'];

      for (const mode of modes) {
        results.push({
          theme,
          contextKey: `${mode}-${theme.name}`,
          mode,
          themeId: theme.name,
          tokens: tokens.map(t => applyOverride(t, theme.overrides)),
        });
      }
    }

    return results;
  }
}

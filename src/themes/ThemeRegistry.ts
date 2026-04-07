/**
 * Theme Registry
 *
 * Central collection of registered themes for the token pipeline.
 * Themes register with a name, mode, and semantic override map.
 * The registry validates registrations and provides the theme-varying
 * token set used by platform generators to split static vs themed output.
 *
 * @see design.md § "ThemeRegistry"
 * @see requirements.md R1, R2 AC 5
 */

import type { SemanticOverrideMap } from '../tokens/themes/types';

/** Mode determines how the pipeline generates output for this theme. */
export type ThemeMode = 'dark' | 'light' | 'both';

/** A registered theme: name, mode, and semantic overrides. */
export interface ThemeRegistration {
  name: string;
  mode: ThemeMode;
  overrides: SemanticOverrideMap;
}

/** Callback to validate that a semantic token name exists. */
export type SemanticTokenValidator = (tokenName: string) => boolean;

export class ThemeRegistry {
  private themes: Map<string, ThemeRegistration> = new Map();
  private semanticValidator: SemanticTokenValidator | null = null;

  /**
   * Set the validator used to check override references at registration time.
   * If set, register() rejects overrides referencing unknown semantic tokens.
   */
  setSemanticValidator(validator: SemanticTokenValidator): void {
    this.semanticValidator = validator;
  }

  /**
   * Register a theme. Throws on duplicate name or invalid override references.
   *
   * @throws Error if name is already registered
   * @throws Error if overrides reference unknown semantic tokens (when validator is set)
   */
  register(theme: ThemeRegistration): void {
    if (this.themes.has(theme.name)) {
      throw new Error(`Theme '${theme.name}' is already registered`);
    }

    if (this.semanticValidator) {
      for (const tokenName of Object.keys(theme.overrides)) {
        if (!this.semanticValidator(tokenName)) {
          throw new Error(
            `Theme '${theme.name}' references unknown semantic token '${tokenName}'`
          );
        }
      }
    }

    this.themes.set(theme.name, theme);
  }

  /** Get a theme by name. */
  get(name: string): ThemeRegistration | undefined {
    return this.themes.get(name);
  }

  /** Get all registered themes in registration order. */
  getAll(): ThemeRegistration[] {
    return Array.from(this.themes.values());
  }

  /** Number of registered themes. */
  get size(): number {
    return this.themes.size;
  }

  /**
   * Compute the union of all overridden token names across all registered themes.
   * Tokens in this set are theme-varying; everything else is static.
   */
  getThemeVaryingTokens(): Set<string> {
    const varying = new Set<string>();
    for (const theme of this.themes.values()) {
      for (const tokenName of Object.keys(theme.overrides)) {
        varying.add(tokenName);
      }
    }
    return varying;
  }

  /** Remove all registered themes. */
  clear(): void {
    this.themes.clear();
  }
}

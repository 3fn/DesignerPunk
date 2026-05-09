/**
 * DesignerPunk Configuration API
 *
 * Exported from `@3fn/core/config` for product repos.
 * Products create a `designerpunk.config.ts` that imports `defineConfig`
 * and explicitly registers themes and component token paths.
 *
 * @example
 * ```typescript
 * import { defineConfig } from '@3fn/core/config';
 * import { marketingOverrides } from './themes/marketing/SemanticOverrides';
 *
 * export default defineConfig({
 *   name: 'MyProduct',
 *   abbreviation: 'MP',
 *   themes: [
 *     { name: 'marketing', mode: 'dark', overrides: marketingOverrides }
 *   ],
 *   output: './dist/tokens'
 * });
 * ```
 *
 * @see Spec 094 design.md § "defineConfig"
 */

import type { SemanticOverrideMap } from '../tokens/themes/types';
import type { ThemeMode } from '../themes/ThemeRegistry';

/** Theme registration in the config file. */
export interface ConfigTheme {
  name: string;
  mode: ThemeMode;
  overrides: SemanticOverrideMap;
}

/** DesignerPunk pipeline configuration. */
export interface DesignerPunkConfig {
  /** Product name → generated type names (e.g., 'WrKingClass' → WrKingClassTheme). Default: 'DesignerPunk' */
  name?: string;
  /** Short form → environment keys (e.g., 'WKC' → WKCThemeKey). Default: 'DP' */
  abbreviation?: string;
  /** Themes to register. Each theme's overrides are imported directly in the config. Default: [] */
  themes?: ConfigTheme[];
  /** Directories to scan for `*.tokens.ts` component token files. Default: [] */
  componentTokens?: string[];
  /** Output directory for generated files. Default: 'dist' */
  output?: string;
  /**
   * Path to local token source directory. When set, the pipeline resolves
   * primitive and semantic tokens from this path instead of the installed package.
   * Must be a complete token source — no fallback to package for missing families.
   * Path is resolved relative to the config file's directory.
   * When omitted, tokens resolve from the installed package's `src/tokens/`.
   */
  tokenSource?: string;
}

/**
 * Define a DesignerPunk pipeline configuration.
 * Identity function with type checking — returns the config as-is.
 */
export function defineConfig(config: DesignerPunkConfig): DesignerPunkConfig {
  return config;
}

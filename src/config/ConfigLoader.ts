/**
 * Configuration Loader
 *
 * Loads `designerpunk.config.ts` from the working directory.
 * Falls back to defaults when no config file exists.
 * Resolves all paths relative to the config file's directory.
 *
 * @see Spec 094 design.md § "ConfigLoader"
 */

import * as path from 'path';
import * as fs from 'fs';
import type { DesignerPunkConfig, ConfigTheme } from './defineConfig';

/** Fully resolved configuration with absolute paths. */
export interface ResolvedConfig {
  /** Product name for generated type names. */
  name: string;
  /** Short form for environment keys. */
  abbreviation: string;
  /** Registered themes from config. */
  themes: ConfigTheme[];
  /** Resolved absolute path to token source root. */
  tokenSourceRoot: string;
  /** Whether token source is local (from config) or package (default). */
  tokenSourceMode: 'local' | 'package';
  /** Resolved absolute paths to component token directories. */
  componentTokenDirs: string[];
  /** Resolved absolute path to output directory. */
  outputDir: string;
  /** Directory the config file was loaded from (or cwd for defaults). */
  configDir: string;
}

const DEFAULTS = {
  name: 'DesignerPunk',
  abbreviation: 'DP',
  themes: [] as ConfigTheme[],
  componentTokens: [] as string[],
  output: 'dist',
};

/**
 * Load and resolve a DesignerPunk configuration.
 *
 * @param cwd - Working directory to search for config file. Defaults to process.cwd().
 * @returns Fully resolved configuration with absolute paths.
 */
export async function loadConfig(cwd: string = process.cwd()): Promise<ResolvedConfig> {
  const configPath = path.resolve(cwd, 'designerpunk.config.ts');
  let userConfig: DesignerPunkConfig = {};
  let configDir = cwd;

  if (fs.existsSync(configPath)) {
    try {
      // Dynamic import handles TypeScript via ts-node or similar loader
      const loaded = await import(configPath);
      userConfig = loaded.default || loaded;
      configDir = path.dirname(configPath);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to load ${configPath}: ${message}`);
    }
  }

  const name = userConfig.name || DEFAULTS.name;
  const abbreviation = userConfig.abbreviation || DEFAULTS.abbreviation;
  const themes = userConfig.themes || DEFAULTS.themes;
  const output = userConfig.output || DEFAULTS.output;
  const componentTokenPaths = userConfig.componentTokens || DEFAULTS.componentTokens;

  // Resolve token source: configured local path or package's src/tokens/
  const tokenSourceMode: 'local' | 'package' = userConfig.tokenSource ? 'local' : 'package';
  const tokenSourceRoot = userConfig.tokenSource
    ? path.resolve(configDir, userConfig.tokenSource)
    : path.resolve(__dirname, '../tokens');

  // Resolve paths relative to config directory
  const outputDir = path.resolve(configDir, output);
  const componentTokenDirs = componentTokenPaths.map(p => path.resolve(configDir, p));

  return {
    name,
    abbreviation,
    themes,
    tokenSourceRoot,
    tokenSourceMode,
    componentTokenDirs,
    outputDir,
    configDir,
  };
}

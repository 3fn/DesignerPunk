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
import { scopedTsRequire } from './scopedTsRequire';
import { resolvePackageRoot } from '../cli/shared/resolvePackageRoot';

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
  /** Resolved absolute path to product tokens directory, or undefined if not configured. */
  productTokens?: string;
}

const DEFAULTS = {
  name: 'DesignerPunk',
  abbreviation: 'DP',
  themes: [] as ConfigTheme[],
  componentTokens: [] as string[],
  output: 'dist',
};

/**
 * Loads a config module at runtime and returns its module namespace object
 * (the caller unwraps `.default`). The injectable resolution seam for
 * {@link loadConfig} — see {@link defaultConfigModuleLoader}.
 */
export type ConfigModuleLoader = (configPath: string) => unknown | Promise<unknown>;

/**
 * Default config-module loader — **Approach A** (Spec 118 Task 1 selection):
 * `tsx/cjs/api` namespaced `register` + scoped synchronous `require`.
 *
 * Spec 118 Task 9.5: this delegates to the SHARED {@link scopedTsRequire} primitive —
 * the single runtime-TS resolution mechanism behind all three per-site scoped seams
 * (config, `resolveTokens`, `loadComponentTokens`), replacing three inline copies of the
 * register/require/unregister cycle. The mechanism is unchanged: `register()` mutates
 * `module._resolveFilename` / `module._extensions` process-globally; the namespace scopes
 * requests; `unregister()` (in `finally`, inside `scopedTsRequire`) restores global state —
 * load-bearing for the no-ambient-residue criterion. (Task 1: `findings/loader-selection.md`.)
 *
 * Anchored at `__filename` so transitive relative imports inside the config resolve as
 * before. Returns synchronously; the loader type stays `Promise`-compatible for callers.
 *
 * Constraint: this loader **cannot run inside a jest process** — tsx's scoped require
 * appends a `?namespace=` tag that jest's module resolver rejects (ENOENT). In-process
 * jest tests must inject a jest-compatible loader via `loadConfig`'s `loadModule`
 * parameter (e.g. `(p) => import(p)`, `jestConfigModuleLoader`). Production (real-node)
 * execution uses this default unconditionally — there is deliberately NO test-environment
 * detection in this path.
 */
export const defaultConfigModuleLoader: ConfigModuleLoader = (configPath: string) =>
  scopedTsRequire(configPath, __filename);

/**
 * Load and resolve a DesignerPunk configuration.
 *
 * @param cwd - Working directory to search for config file. Defaults to process.cwd().
 * @param loadModule - Injectable config-module loader (resolution seam). Defaults to
 *   {@link defaultConfigModuleLoader} (Approach A). In-process jest tests inject a
 *   jest-compatible loader because Approach A cannot run inside jest (see that loader's docs).
 * @returns Fully resolved configuration with absolute paths.
 */
export async function loadConfig(
  cwd: string = process.cwd(),
  loadModule: ConfigModuleLoader = defaultConfigModuleLoader,
): Promise<ResolvedConfig> {
  const configPath = path.resolve(cwd, 'designerpunk.config.ts');
  let userConfig: DesignerPunkConfig = {};
  let configDir = cwd;

  if (fs.existsSync(configPath)) {
    try {
      // Resolution seam — production default is Approach A (tsx/cjs/api); see
      // defaultConfigModuleLoader. In-process jest tests inject a jest-compatible
      // loader. No test-environment detection lives in this path.
      const loaded = await loadModule(configPath);
      userConfig = (loaded as { default?: DesignerPunkConfig } & DesignerPunkConfig).default || (loaded as DesignerPunkConfig);
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

  // Resolve token source: configured local path or package's src/tokens/.
  // Package-mode default routes through the shared resolvePackageRoot() (Spec 118 Task
  // 9.5.2, Class C / B1) rather than `path.resolve(__dirname, '../tokens')`. The bare
  // __dirname form breaks under compile-to-dist (dist/config → dist/tokens, where no raw
  // .ts token source exists); resolving from the self-checking package root finds the
  // package's `src/tokens` regardless of whether this module runs from `src/` (tsx) or
  // `dist/` (compiled), so it survives the target model's compile-and-ship step.
  const tokenSourceMode: 'local' | 'package' = userConfig.tokenSource ? 'local' : 'package';
  const tokenSourceRoot = userConfig.tokenSource
    ? path.resolve(configDir, userConfig.tokenSource)
    : path.resolve(resolvePackageRoot(__dirname), 'src/tokens');

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
    productTokens: userConfig.productTokens ? path.resolve(configDir, userConfig.productTokens) : undefined,
  };
}

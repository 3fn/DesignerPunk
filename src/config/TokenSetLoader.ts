/**
 * Loads the {@link TokenSet} that `generate` passes to every generator (Spec 129 U9, Req 9.2).
 *
 * `loadTokenSet` reads each module of `TOKEN_MODULE_KEYS` from the token source root in one
 * scoped load, so a module two others import is one instance. `packageTokenSet` is the
 * package's own `src/tokens` (or `dist/tokens` when compiled), read lazily: it is what a
 * generator uses when its caller passes no set (tests, the repository's own build), and
 * `generate` never takes it, because `resolveTokens` always passes the source's set.
 */

import * as path from 'path';
import { scopedTsRequire, scopedTsRequireMany, type TsModuleLoader } from './scopedTsRequire';
import {
  OPTIONAL_TOKEN_MODULE_KEYS,
  TOKEN_MODULE_KEYS,
  type TokenModuleKey,
  type TokenModules,
  type TokenSet,
} from '../generators/TokenSet';

function missingMessage(root: string, key: string, detail: string): string {
  return (
    `Token source at ${root} cannot be read: ${key} failed to load.\n\n` +
    `  ${detail}\n\n` +
    `  \`generate\` reads the colour palette, the opacity values, the motion and layering tokens, ` +
    `the font-size and line-height values and the DTCG export's inputs from your copy of the token source.\n` +
    `  Restore the file from the package (\`node_modules/@3fn/core/src/tokens/${key}.ts\`) or remove ` +
    `\`tokenSource\` from the config to use the package's tokens.`
  );
}

/**
 * Load the token set from `root`.
 *
 * @param root - The resolved token source root (`config.tokenSourceRoot`).
 * @param loadModule - The runtime-TS seam. The default loads every module in one scoped
 *   `tsx` register; any other loader (the in-process jest one) is called once per module.
 */
export function loadTokenSet(root: string, loadModule: TsModuleLoader = scopedTsRequire): TokenSet {
  let modules: Map<TokenModuleKey, unknown> | undefined;
  let failures: Map<TokenModuleKey, string> = new Map();

  // Loaded on first use, all at once: `resolveTokens` callers that never generate (`validate`)
  // do not read the palette, and a module two others import stays one instance.
  const load = (): Map<TokenModuleKey, unknown> => {
    if (modules) return modules;
    const loaded = new Map<TokenModuleKey, unknown>();
    const failed = new Map<TokenModuleKey, string>();
    const keys = [...TOKEN_MODULE_KEYS];
    const ids = keys.map((k) => path.join(root, k));

    if (loadModule === scopedTsRequire) {
      const results = scopedTsRequireMany(ids, __filename);
      keys.forEach((key, i) => {
        const r = results[i];
        if (r.ok) loaded.set(key, r.module);
        else failed.set(key, r.error);
      });
    } else {
      keys.forEach((key, i) => {
        try {
          loaded.set(key, loadModule(ids[i], __filename));
        } catch (err) {
          failed.set(key, err instanceof Error ? err.message : String(err));
        }
      });
    }

    for (const [key, detail] of failed) {
      if (OPTIONAL_TOKEN_MODULE_KEYS.has(key)) continue;
      throw new Error(missingMessage(root, key, detail));
    }
    failures = failed;
    modules = loaded;
    return loaded;
  };

  return {
    root,
    has: (key) => load().has(key),
    mod: <K extends TokenModuleKey>(key: K): TokenModules[K] => {
      const m = load();
      if (!m.has(key)) throw new Error(missingMessage(root, key, failures.get(key) ?? 'not loaded'));
      return m.get(key) as TokenModules[K];
    },
  };
}

let cachedPackageSet: TokenSet | undefined;

/**
 * DesignerPunk's own token modules, read lazily and one at a time. Used only when a caller of a
 * generator passes no set. A plain `require`, so it rides whichever loader runs the caller (tsx,
 * jest, compiled `dist/`).
 */
export function packageTokenSet(): TokenSet {
  if (cachedPackageSet) return cachedPackageSet;
  const root = path.resolve(__dirname, '..', 'tokens');
  const cache = new Map<string, unknown>();
  const read = (key: string): unknown => {
    if (!cache.has(key)) cache.set(key, require(path.join(root, key)));
    return cache.get(key);
  };
  cachedPackageSet = {
    root,
    has: (key) => {
      try { read(key); return true; } catch { return false; }
    },
    mod: <K extends TokenModuleKey>(key: K): TokenModules[K] => read(key) as TokenModules[K],
  };
  return cachedPackageSet;
}

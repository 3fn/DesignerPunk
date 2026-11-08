/**
 * `platforms:` in `designerpunk.config.ts` (Spec 129 Req 12.2, 12.3; design § 12a).
 *
 * A platform the config names is written at its own folder; every other platform, web included, is written at
 * `output`. The key must be one of `PLATFORM_KEYS` and the folder must resolve inside the project, the folder the
 * config file is in. Anything else fails `generate`, naming the entry.
 */

import * as path from 'path';
import { PLATFORM_KEYS } from '../../config/platforms';
import type { PlatformKey, PlatformOutputs } from '../../config/platforms';
import { platformUnknownMessage, platformOutputInvalidMessage, platformOutputOutsideRootMessage } from './errorCatalog';

/** The folder of each platform the config names, absolute. Throws, naming the entry, on an unknown key or a folder outside the project. */
export function resolvePlatformOutputs(
  declared: unknown,
  configDir: string,
): Partial<Record<PlatformKey, { output: string }>> | undefined {
  if (declared === undefined) return undefined;
  if (declared === null || typeof declared !== 'object' || Array.isArray(declared)) {
    throw new Error(platformOutputInvalidMessage('platforms', 'it must map a platform key to { output: \'<path>\' }'));
  }
  const root = path.resolve(configDir);
  const resolved: Partial<Record<PlatformKey, { output: string }>> = {};
  for (const [key, entry] of Object.entries(declared as Record<string, unknown>)) {
    if (!(PLATFORM_KEYS as readonly string[]).includes(key)) throw new Error(platformUnknownMessage(key, PLATFORM_KEYS));
    const output = (entry as { output?: unknown } | null)?.output;
    if (typeof output !== 'string' || output.trim() === '') {
      throw new Error(platformOutputInvalidMessage(`platforms.${key}`, 'it needs an `output` path, as a non-empty string'));
    }
    const abs = path.resolve(root, output);
    const rel = path.relative(root, abs);
    if (rel === '' || rel.startsWith('..') || path.isAbsolute(rel)) {
      throw new Error(platformOutputOutsideRootMessage(key, output));
    }
    resolved[key as PlatformKey] = { output: abs };
  }
  return resolved;
}

/**
 * Where each product token file is written. The web file stays under `<output>/product`; a native file goes to its
 * platform's folder when `platforms:` names one (Spec 129 Req 12.2), else under `<output>/product` too.
 */
export function productTokenOutputPaths(config: { outputDir: string; platforms?: PlatformOutputs }): { web: string; ios: string; android: string } {
  const productDir = path.join(config.outputDir, 'product');
  return {
    web: path.join(productDir, 'ProductTokens.web.css'),
    ios: path.join(config.platforms?.ios?.output ?? productDir, 'ProductTokens.ios.swift'),
    android: path.join(config.platforms?.android?.output ?? productDir, 'ProductTokens.android.kt'),
  };
}

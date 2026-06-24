/**
 * Matrix row: faithful-consumer (ESM-authored).
 *
 * Reproduces the documented theme-override workflow's failure conjunction:
 *   (1) ESM-syntax `.ts` config under a typeless package,
 *   (2) a COMPILED import (`./compiled/defineConfig.js`, modeling
 *       `@3fn/core/config` → dist), and
 *   (3) a TRANSITIVE relative raw-`.ts` override import (`./my-overrides`)
 *       — no extension — which hits Node's strict-ESM resolver and fails
 *       `Cannot find module ... ./my-overrides`.
 *
 * The sentinel is produced ONLY by the transitive `./my-overrides` raw-`.ts`
 * import (Lina SF-A: positive sentinel, never "not DEFAULTS"), so the row is
 * green only if the transitive raw-`.ts` require actually resolved.
 */
import { defineConfig } from './compiled/defineConfig.js';
import { overrideSentinel } from './my-overrides';

export default defineConfig({
  name: 'FaithfulESM',
  abbreviation: 'FE',
  sentinel: overrideSentinel,
});

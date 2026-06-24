/**
 * COMPILED import target (models `@3fn/core/config` → dist CJS output).
 * Pure CJS (`module.exports`), as the project's dist is CJS. The ESM-authored
 * config imports it via `import { defineConfig } from './compiled/defineConfig.js'`,
 * exercising the ESM->CJS named-import interop that the real workflow relies on.
 */
'use strict';
function defineConfig(config) {
  return config;
}
module.exports = { defineConfig };

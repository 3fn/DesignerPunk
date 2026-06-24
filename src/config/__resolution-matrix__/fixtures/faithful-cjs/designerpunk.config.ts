/**
 * Matrix row: faithful-consumer (CJS-authored).
 *
 * Faithful CJS authoring of the same conjunction the ESM variant exercises:
 *   (1) `.ts` config (typeless package),
 *   (2) a COMPILED `require('./compiled/defineConfig.js')` (models dist), and
 *   (3) a TRANSITIVE relative raw-`.ts` override `require('./my-overrides')`
 *       (no extension) — the require that, without a TS-aware loader, fails
 *       `Cannot find module ... ./my-overrides`.
 *
 * Sentinel produced ONLY by the transitive `./my-overrides` raw-`.ts` require.
 */
const { defineConfig } = require('./compiled/defineConfig.js');
const { overrideSentinel } = require('./my-overrides');

module.exports = defineConfig({
  name: 'FaithfulCJS',
  abbreviation: 'FC',
  sentinel: overrideSentinel,
});

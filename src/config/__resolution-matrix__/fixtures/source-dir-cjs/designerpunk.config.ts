/**
 * Matrix row: source-directory import (CJS-authored).
 *
 * Faithful CJS authoring: real `require()` of a DIRECTORY (`./src/config`) with
 * no explicit `/index.ts`, exported via `module.exports`. Exercises the same
 * directory-index resolution as the ESM variant but through the CJS require path,
 * proving the loader does not silently assume a direction (R2 AC4).
 */
const { makeConfig, SENTINEL } = require('./src/config');

module.exports = makeConfig({ sentinel: SENTINEL });

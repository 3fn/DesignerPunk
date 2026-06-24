/**
 * Directory-import target (CJS). Resolved only via the bare directory specifier
 * `require('./src/config')` from the config — exercises directory-index resolution.
 */
const SENTINEL = 'source-dir-cjs:index-resolved';

function makeConfig(opts) {
  return {
    name: 'SourceDirCJS',
    abbreviation: 'SDC',
    sentinel: opts.sentinel,
  };
}

module.exports = { SENTINEL, makeConfig };

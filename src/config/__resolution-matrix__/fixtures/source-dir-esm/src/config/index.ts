/**
 * Directory-import target (ESM). Resolved only via the bare directory specifier
 * `./src/config` from the config — exercises directory-index resolution.
 */
export const SENTINEL = 'source-dir-esm:index-resolved';

export function makeConfig(opts: { sentinel: string }) {
  return {
    name: 'SourceDirESM',
    abbreviation: 'SDE',
    sentinel: opts.sentinel,
  };
}

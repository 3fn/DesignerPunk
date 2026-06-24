/**
 * Transitive relative raw-`.ts` override (ESM). Imported by the config as
 * `./my-overrides` (no extension). Carries the sentinel that ONLY this module
 * produces — the positive-sentinel target for the faithful-consumer ESM row.
 */
export const overrideSentinel = 'faithful-esm:my-overrides-resolved';

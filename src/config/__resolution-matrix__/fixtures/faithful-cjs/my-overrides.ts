/**
 * Transitive relative raw-`.ts` override (CJS). Required by the config as
 * `require('./my-overrides')` (no extension). Carries the sentinel that ONLY
 * this module produces — the positive-sentinel target for the faithful-consumer
 * CJS row.
 */
const overrideSentinel = 'faithful-cjs:my-overrides-resolved';
module.exports = { overrideSentinel };

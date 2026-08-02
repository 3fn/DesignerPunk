/**
 * Jest Configuration — Functional Lane
 *
 * Extends the base jest.config.js and adds the performance-lane exclusions.
 * The npm `test`, `test:watch`, and `test:coverage` scripts use this config.
 *
 * WHY A SEPARATE CONFIG (not the base config, not a CLI flag):
 *
 * 1. The exclusions cannot live in the base jest.config.js: config-level
 *    testPathIgnorePatterns also apply when `test:performance` selects by
 *    --testPathPatterns, which silently reduced that lane (and `test:all`)
 *    to zero performance tests (Spec 025 config interaction; see the NOTE
 *    in jest.config.js).
 *
 * 2. The exclusions cannot live in the npm script as a CLI flag:
 *    --testPathIgnorePatterns is an array-typed jest option, so a trailing
 *    `--testPathIgnorePatterns='…'` swallows any appended positional arg —
 *    `npm test -- <test-file-path>` appended the path as an ADDITIONAL
 *    ignore pattern, running the whole functional suite EXCEPT the named
 *    file (observed 2026-08-02).
 *
 * A lane config keeps the base config clean for the performance lanes AND
 * leaves the npm script flag-free, so `npm test -- <test-file-path>` selects
 * exactly the named file as documented in Start Up Tasks.
 */

const base = require('./jest.config.js');

module.exports = {
  ...base,
  testPathIgnorePatterns: [
    ...base.testPathIgnorePatterns,
    'performance/__tests__',
    '__tests__/performance',
    'PerformanceValidation',
  ],
};

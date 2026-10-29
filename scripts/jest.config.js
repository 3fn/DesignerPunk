/**
 * Colocated Jest config for scripts/.
 *
 * The root jest.config.js restricts `roots` to `src/`, `product-mcp-server/src` and
 * `scripts/completion-claims` (Spec 025 F1 — prevents duplicate test execution from dist/;
 * the third root, L37, added by #181 for the completion-criteria-parity checker's suites).
 * The root `npm test` (jest.functional.config.js, which spreads that config) therefore runs
 * the scripts/completion-claims suites and no other suite under scripts/. This config runs
 * every suite under scripts/ (`npm run test:scripts`), so the scripts/completion-claims
 * suites run in both lanes. This mirrors the existing tools/agent-generator pattern
 * (see its colocated tools/agent-generator/jest.config.js): a non-src TypeScript directory that
 * needs Jest carries its own colocated config + `test` script (see package.json's
 * `test:scripts`), run alongside the root suite rather than folded into its `roots`.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

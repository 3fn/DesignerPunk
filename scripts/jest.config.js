/**
 * Colocated Jest config for scripts/.
 *
 * The root jest.config.js restricts `roots` to `src/` and `product-mcp-server/src`
 * (Spec 025 F1 — prevents duplicate test execution from dist/), so the root `npm test` does
 * not discover tests under scripts/. This mirrors the existing tools/agent-generator pattern
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

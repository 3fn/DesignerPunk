/**
 * Colocated Jest config for tools/agent-generator/.
 *
 * The root jest.config.js restricts `roots` to `src/` and `product-mcp-server/src`
 * (Spec 025 F1 — prevents duplicate test execution from dist/), so the root
 * `npm test` does not discover tests under tools/agent-generator/. This mirrors
 * the existing mcp-server/ and application-mcp-server/ pattern: each non-src
 * TypeScript package that needs Jest carries its own colocated config + `test`
 * script (see package.json's `test:agent-generator`), run alongside the
 * root suite rather than folded into its `roots`.
 *
 * NOTE (flagged for Peter / Thurgood): this is a judgment call made to satisfy
 * "put the test in the functional lane" without editing files outside
 * tools/agent-generator/ (the root jest.config.js `roots` array). See the Task
 * 1.2 completion report for the tradeoff.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

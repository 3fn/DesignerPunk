module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // roots deliberately src-only: every test in this package lives under src/**/__tests__/.
  // A '<rootDir>/tests' root previously listed here pointed at an EMPTY, untracked directory —
  // it existed on local machines (so jest tolerated it) but not on a fresh CI checkout (git
  // does not track empty dirs), making `npm test` fail with "Directory ... in the roots[1]
  // option was not found" the first time the suite ran in CI (125-A Task 6, lane-timing run #1).
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**'
  ],
  // The @modelcontextprotocol/sdk ships ESM-only, which ts-jest/CommonJS cannot parse.
  // The tool-boundary contract test (Spec 121 Task 4) imports index.ts which imports the SDK.
  // We stub the SDK with minimal CJS shims so Jest can load index.ts and exercise handleTool.
  // The stubs provide only what index.ts needs at import + construction time; no transport logic.
  moduleNameMapper: {
    '^@modelcontextprotocol/sdk/server/index\\.js$': '<rootDir>/src/__tests__/__mocks__/mcp-sdk-server.js',
    '^@modelcontextprotocol/sdk/server/stdio\\.js$': '<rootDir>/src/__tests__/__mocks__/mcp-sdk-stdio.js',
    '^@modelcontextprotocol/sdk/types\\.js$': '<rootDir>/src/__tests__/__mocks__/mcp-sdk-types.js',
  },
};

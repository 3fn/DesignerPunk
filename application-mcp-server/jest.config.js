module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/tests/**/*.test.ts'],
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

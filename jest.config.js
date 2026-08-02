/**
 * Jest Configuration
 * 
 * This configuration addresses three infrastructure issues identified in Spec 025:
 * 
 * F1: Pattern 1 - Duplicate Test Execution (src + dist)
 *     - Restricts test discovery to src/ directory only
 *     - Prevents tests from running twice (once from src/, once from dist/)
 * 
 * F2: Pattern 2 - Missing Jest Configuration File
 *     - Centralizes configuration for better maintainability
 *     - Provides explicit patterns for test discovery
 * 
 * F3: Pattern 3 - No .d.ts Exclusion Pattern
 *     - Explicitly excludes .d.ts files from test discovery
 *     - Defensive programming against edge cases
 */

module.exports = {
  // TypeScript preset for ts-jest
  preset: 'ts-jest',
  
  // Default test environment is 'node' (Jest default)
  // Per-file @jest-environment annotations override this default
  // Web component tests use @jest-environment jsdom for DOM APIs
  // Most tests (token, build, validation) use default node environment
  testEnvironment: 'node',
  
  // Restrict test discovery to src/ directory only (F1)
  // This prevents duplicate test execution from dist/ directory
  roots: ['<rootDir>/src', '<rootDir>/product-mcp-server/src'],
  
  // Explicit test file patterns (F1, F2)
  // Only match files in __tests__ directories with .test.ts or .test.tsx extension
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx'
  ],
  
  // Exclude patterns (F1, F3)
  // NOTE: performance-test exclusion lives in jest.functional.config.js (used by
  // npm test / test:watch / test:coverage), NOT here. Config-level ignores also
  // apply when `test:performance` selects by pattern, which silently reduced that
  // lane (and `test:all`) to zero perf tests. It can't be a CLI flag either:
  // --testPathIgnorePatterns is array-typed, so a trailing flag swallows appended
  // positionals and breaks `npm test -- <test-file-path>` single-file runs.
  testPathIgnorePatterns: [
    '/node_modules/',           // Standard exclusion
    '/dist/',                   // Prevent duplicate execution (F1)
    '/coverage/',               // Exclude coverage reports
    '\\.d\\.ts$'                // Explicit .d.ts exclusion (F3)
  ],
  
  // Prevent module resolution from dist/ (F1)
  modulePathIgnorePatterns: [
    '<rootDir>/dist/'
  ],
  
  // Module name mapping for CSS imports
  // Web components import CSS files as strings for browser bundle compatibility
  // In Jest, we mock these imports to return an empty string
  // @see src/types/css.d.ts for TypeScript declaration
  // @see scripts/esbuild-css-plugin.js for build-time transformation
  // @see Requirements: 8.2, 8.3 (components render correctly in browser bundles)
  moduleNameMapper: {
    '\\.css$': '<rootDir>/src/__tests__/__mocks__/styleMock.js',
    '^@3fn/core/blend$': '<rootDir>/src/blend/index.ts',
    '^@3fn/core/build$': '<rootDir>/src/build/tokens/index.ts',
    '^@3fn/core/types$': '<rootDir>/src/types/index.ts',
    '^@3fn/core/testing$': '<rootDir>/src/testing/index.ts',
    '^@3fn/core/config$': '<rootDir>/src/config/index.ts',
  },
  
  // Timeout for infrastructure tests (F2)
  testTimeout: 10000, // 10 seconds

  // Test utilities organization (documented for reference):
  // - Shared fixtures: src/__tests__/fixtures/
  // - Component-specific: src/components/*/__tests__/test-utils.ts
  // - Setup files: src/components/*/__tests__/setup.ts

  // Console-fail hook (125-B, Requirement 11 / Design C8): fails a test on
  // unallowlisted console.error/console.warn output. NET-NEW as of this
  // wiring — root lanes ONLY (this file's `roots` above); sub-package suites
  // (mcp-server, application-mcp-server — own jest 29 configs) are NOT
  // covered — see governance/classification-map.md
  // § "console-fail-subpackage-deferred". Allowlist:
  // src/__tests__/console-allowlist.json.
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/console-fail-setup.ts'],
};

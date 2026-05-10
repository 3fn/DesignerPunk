/**
 * DesignerPunk Jest Preset
 *
 * Shareable Jest configuration for product repos consuming @3fn/core.
 * Provides ts-jest transform, jsdom environment, CSS module mocking,
 * and standard test patterns.
 *
 * Usage in product repo's jest.config.js:
 * ```js
 * module.exports = {
 *   ...require('@3fn/core/jest-preset'),
 *   roots: ['<rootDir>/src'],
 * };
 * ```
 *
 * @see Spec 105 design.md § "Jest Preset"
 */

import * as path from 'path';

const styleMockPath = path.resolve(__dirname, 'style-mock.js');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/__tests__/**/*.test.tsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '\\.d\\.ts$',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/dist/',
  ],
  moduleNameMapper: {
    '\\.css$': styleMockPath,
  },
  testTimeout: 10000,
};

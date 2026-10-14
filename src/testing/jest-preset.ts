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
 * **Required devDependencies** (install in your product repo):
 * ```
 * npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @types/node
 * ```
 *
 * `jest-environment-jsdom` is required because this preset sets
 * `testEnvironment: 'jsdom'`. Without it, Jest will error on startup.
 *
 * @see Spec 105 design.md § "Jest Preset"
 */

import * as path from 'path';
import { subpathMappings } from './presetMappings';

const styleMockPath = path.resolve(__dirname, 'style-mock.js');

// Resolve @3fn/core package root for subpath export mappings.
// In the published package, __dirname is node_modules/@3fn/core/dist/testing/ (the compiled preset
// that `exports["./jest-preset"]` serves). The package root is 2 levels up.
const pkgRoot = path.resolve(__dirname, '../..');

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
    // @3fn/core/{blend,build,types,testing,config} → the files package.json `exports` serves
    // (compiled dist/), derived, never hand-written: see presetMappings.ts.
    ...subpathMappings(pkgRoot),
  },
  testTimeout: 10000,
};

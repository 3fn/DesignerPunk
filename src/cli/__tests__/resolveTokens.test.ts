/**
 * @category evergreen
 * @purpose Verify resolveTokens() barrel contract verification and token loading (Spec 103)
 */

import * as path from 'path';
import { resolveTokens, verifyBarrelContract } from '../resolveTokens';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import type { ResolvedConfig } from '../../config/ConfigLoader';

// Spec 118 Task 9.5: resolveTokens/verifyBarrelContract default to the production scoped
// tsx loader (Approach A), which cannot run inside jest (the `?namespace=` ENOENT). In-process
// tests inject the jest-compatible loader. REAL scoped resolution is certified out-of-process
// by the consumer guard (npm run test:consumer), not here.

describe('verifyBarrelContract', () => {
  test('passes for valid token source (package src/tokens)', () => {
    const sourcePath = path.resolve(__dirname, '../../tokens');
    expect(() => verifyBarrelContract(sourcePath, jestTsModuleLoader)).not.toThrow();
  });

  test('throws when path does not exist', () => {
    expect(() => verifyBarrelContract('/nonexistent/path', jestTsModuleLoader)).toThrow(
      'Token source not found at: /nonexistent/path'
    );
  });

  test('throws when getAllPrimitiveTokens is missing', () => {
    // __dirname itself is a valid require path (resolves to __tests__/index if it existed)
    // but doesn't export getAllPrimitiveTokens — use a known module without that export
    const pathWithoutExport = path.resolve(__dirname, '../../config');
    expect(() => verifyBarrelContract(pathWithoutExport, jestTsModuleLoader)).toThrow(
      'does not export getAllPrimitiveTokens()'
    );
  });

  test('throws when semantic subdirectory is missing', () => {
    // Create a mock scenario: a path that has getAllPrimitiveTokens but no semantic/
    // Use jest mock to simulate this
    const fakePath = '/fake/tokens';
    jest.doMock(fakePath, () => ({ getAllPrimitiveTokens: () => [] }), { virtual: true });
    
    expect(() => verifyBarrelContract(fakePath, jestTsModuleLoader)).toThrow(
      'Semantic token source not found at: /fake/tokens/semantic'
    );

    jest.dontMock(fakePath);
  });

  test('throws when getAllSemanticTokens is missing from semantic barrel', () => {
    const fakePath = '/fake/tokens2';
    const fakeSemanticPath = '/fake/tokens2/semantic';
    jest.doMock(fakePath, () => ({ getAllPrimitiveTokens: () => [] }), { virtual: true });
    jest.doMock(fakeSemanticPath, () => ({ someOtherExport: true }), { virtual: true });

    expect(() => verifyBarrelContract(fakePath, jestTsModuleLoader)).toThrow(
      'does not export getAllSemanticTokens()'
    );

    jest.dontMock(fakePath);
    jest.dontMock(fakeSemanticPath);
  });
});

describe('resolveTokens', () => {
  test('resolves tokens from package source', () => {
    const config = {
      tokenSourceRoot: path.resolve(__dirname, '../../tokens'),
      tokenSourceMode: 'package',
    } as ResolvedConfig;

    const result = resolveTokens(config, jestTsModuleLoader);

    expect(result.primitiveTokens).toBeInstanceOf(Array);
    expect(result.primitiveTokens.length).toBeGreaterThan(0);
    expect(result.semanticTokens).toBeInstanceOf(Array);
    expect(result.semanticTokens.length).toBeGreaterThan(0);
  });

  test('throws with actionable error for invalid source', () => {
    const config = {
      tokenSourceRoot: '/nonexistent/path',
      tokenSourceMode: 'local',
    } as ResolvedConfig;

    expect(() => resolveTokens(config, jestTsModuleLoader)).toThrow('Token source not found');
  });
});

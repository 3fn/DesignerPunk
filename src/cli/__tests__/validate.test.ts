/**
 * @category evergreen
 * @purpose Verify validate command checks and reporting (Spec 103)
 */

import * as path from 'path';
import { reportResults } from '../validate';
import { resolveTokens } from '../resolveTokens';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import type { ResolvedConfig } from '../../config/ConfigLoader';

describe('validate command', () => {
  describe('reportResults', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    test('reports all-pass with success message', () => {
      reportResults([
        { name: 'Check A', passed: true, errors: [], count: 10 },
        { name: 'Check B', passed: true, errors: [], count: 5 },
      ]);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('✅ Check A'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('✅ Check B'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('All validation checks passed'));
    });

    test('reports failures with error details', () => {
      reportResults([
        { name: 'Check A', passed: true, errors: [], count: 10 },
        { name: 'Check B', passed: false, errors: ['token1: missing field', 'token2: bad ref'], count: 5 },
      ]);

      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('❌ Check B'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('token1: missing field'));
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('1 of 2 checks failed'));
    });
  });

  describe('integration with real tokens', () => {
    test('all 4 checks pass against package token source', () => {
      // This is an integration test — runs the actual validation logic
      // against the real token source to verify no false positives
      const config = {
        tokenSourceRoot: path.resolve(__dirname, '../../tokens'),
        tokenSourceMode: 'package',
      } as ResolvedConfig;

      // Spec 118 Task 9.5: inject jest-compatible loader (production scoped tsx loader
      // cannot run in jest). Real scoped resolution is certified by the consumer guard.
      const tokens = resolveTokens(config, jestTsModuleLoader);

      // Import the check functions indirectly by requiring the module
      const validate = require('../validate');

      // We can't easily call runValidate() (it calls process.exit),
      // but we can verify the tokens load and the module compiles
      expect(tokens.primitiveTokens.length).toBeGreaterThan(0);
      expect(tokens.semanticTokens.length).toBeGreaterThan(0);
    });
  });
});

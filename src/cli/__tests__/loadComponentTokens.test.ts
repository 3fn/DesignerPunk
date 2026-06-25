/**
 * @category evergreen
 * @purpose Verify loadComponentTokens() discovery, return type, and allowOverwrite (Spec 104, 114)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { loadComponentTokens } from '../loadComponentTokens';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { ComponentTokenRegistry } from '../../registries/ComponentTokenRegistry';
import type { ResolvedConfig } from '../../config/ConfigLoader';

// Spec 118 Task 9.5: loadComponentTokens defaults to the production scoped tsx loader
// (Approach A), which cannot run inside jest (the `?namespace=` ENOENT). In-process tests
// inject the jest-compatible loader. REAL scoped resolution of consumer component `.ts` is
// certified out-of-process by the consumer guard (npm run test:consumer), not here.

describe('loadComponentTokens', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-comp-tokens-'));
    ComponentTokenRegistry.clear();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    ComponentTokenRegistry.clear();
  });

  function makeConfig(overrides: Partial<ResolvedConfig> = {}): ResolvedConfig {
    return {
      name: 'Test',
      abbreviation: 'T',
      themes: [],
      tokenSourceRoot: path.join(tmpDir, 'tokens'),
      tokenSourceMode: 'local',
      componentTokenDirs: [],
      outputDir: path.join(tmpDir, 'dist'),
      configDir: tmpDir,
      ...overrides,
    } as ResolvedConfig;
  }

  describe('return type', () => {
    test('returns RegisteredComponentToken[] (empty when no tokens registered)', () => {
      fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
      const config = makeConfig();
      const result = loadComponentTokens(config, jestTsModuleLoader);
      expect(Array.isArray(result)).toBe(true);
    });

    test('returns registered tokens from the registry', () => {
      fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
      // Pre-register a token
      ComponentTokenRegistry.register({
        name: 'test.inset.sm',
        component: 'Test',
        family: 'spacing',
        value: 8,
        reasoning: 'test',
      });
      const config = makeConfig();
      const result = loadComponentTokens(config, jestTsModuleLoader);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('test.inset.sm');
    });
  });

  describe('discovery', () => {
    test('loads files from {tokenSourceRoot}/component/ without throwing', () => {
      const componentDir = path.join(tmpDir, 'tokens', 'component');
      fs.mkdirSync(componentDir, { recursive: true });
      fs.writeFileSync(path.join(componentDir, 'progress.ts'), 'module.exports = {};');
      fs.writeFileSync(path.join(componentDir, 'another.ts'), 'module.exports = {};');

      const config = makeConfig();
      expect(() => loadComponentTokens(config, jestTsModuleLoader)).not.toThrow();
    });

    test('excludes .test.ts and .d.ts files from component/', () => {
      const componentDir = path.join(tmpDir, 'tokens', 'component');
      fs.mkdirSync(componentDir, { recursive: true });
      // Write a file that would throw if loaded
      fs.writeFileSync(path.join(componentDir, 'valid.ts'), 'module.exports = {};');
      fs.writeFileSync(path.join(componentDir, 'valid.test.ts'), 'throw new Error("should not load");');
      fs.writeFileSync(path.join(componentDir, 'valid.d.ts'), 'throw new Error("should not load");');

      const config = makeConfig();
      expect(() => loadComponentTokens(config, jestTsModuleLoader)).not.toThrow();
    });

    test('discovers *.tokens.ts files recursively in componentTokenDirs', () => {
      const compDir = path.join(tmpDir, 'components');
      fs.mkdirSync(path.join(compDir, 'Button-Icon'), { recursive: true });
      fs.mkdirSync(path.join(compDir, 'Avatar-Base'), { recursive: true });
      fs.writeFileSync(path.join(compDir, 'Button-Icon', 'buttonIcon.tokens.ts'), 'module.exports = {};');
      fs.writeFileSync(path.join(compDir, 'Avatar-Base', 'avatar.tokens.ts'), 'module.exports = {};');
      fs.writeFileSync(path.join(compDir, 'Button-Icon', 'index.ts'), 'module.exports = {};');

      const config = makeConfig({ componentTokenDirs: [compDir] });
      expect(() => loadComponentTokens(config, jestTsModuleLoader)).not.toThrow();
    });

    test('skips __tests__ directories', () => {
      const compDir = path.join(tmpDir, 'components');
      fs.mkdirSync(path.join(compDir, '__tests__'), { recursive: true });
      fs.writeFileSync(path.join(compDir, '__tests__', 'mock.tokens.ts'), 'throw new Error("should not load");');

      const config = makeConfig({ componentTokenDirs: [compDir] });
      expect(() => loadComponentTokens(config, jestTsModuleLoader)).not.toThrow();
    });

    test('skips non-existent componentTokenDirs gracefully', () => {
      fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
      const config = makeConfig({ componentTokenDirs: ['/nonexistent/path'] });
      expect(() => loadComponentTokens(config, jestTsModuleLoader)).not.toThrow();
    });
  });

  describe('allowOverwrite', () => {
    test('uses allowOverwrite when tokenSourceMode is local', () => {
      fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
      // Pre-register a token that would conflict
      ComponentTokenRegistry.register({
        name: 'test.inset.sm',
        component: 'Test',
        family: 'spacing',
        value: 8,
        reasoning: 'original',
      });

      // Write a file that re-registers the same token via require
      const componentDir = path.join(tmpDir, 'tokens', 'component');
      fs.mkdirSync(componentDir, { recursive: true });
      const registryPath = require.resolve('../../registries/ComponentTokenRegistry').replace(/\\/g, '/');
      fs.writeFileSync(path.join(componentDir, 'reregister.ts'), [
        `// @ts-nocheck`,
        `const reg = require('${registryPath}');`,
        `reg.ComponentTokenRegistry.register({`,
        `  name: 'test.inset.sm',`,
        `  component: 'Test',`,
        `  family: 'spacing',`,
        `  value: 12,`,
        `  reasoning: 'local override',`,
        `});`,
      ].join('\n'));

      const config = makeConfig({ tokenSourceMode: 'local' });
      // Should not throw despite double registration
      expect(() => loadComponentTokens(config, jestTsModuleLoader)).not.toThrow();
      // Local version should win
      const result = ComponentTokenRegistry.get('test.inset.sm');
      expect(result?.value).toBe(12);
    });

    test('uses allowOverwrite when tokenSourceMode is package (Spec 117 R4)', () => {
      // Spec 117 R4: allowOverwrite travels with the loader, not the mode. Package mode
      // must tolerate double-registration (last-wins) exactly like local mode — the
      // previous mode-gated behavior (throw in package mode) was the bug R4 fixes.
      fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
      ComponentTokenRegistry.register({
        name: 'pkg.conflict',
        component: 'Pkg',
        family: 'spacing',
        value: 8,
        reasoning: 'original',
      });

      const componentDir = path.join(tmpDir, 'tokens', 'component');
      fs.mkdirSync(componentDir, { recursive: true });
      const registryPath = require.resolve('../../registries/ComponentTokenRegistry').replace(/\\/g, '/');
      fs.writeFileSync(path.join(componentDir, 'conflict.ts'), [
        `// @ts-nocheck`,
        `const r = require('${registryPath}');`,
        `r.ComponentTokenRegistry.register({`,
        `  name: 'pkg.conflict',`,
        `  component: 'Pkg',`,
        `  family: 'spacing',`,
        `  value: 12,`,
        `  reasoning: 'conflict',`,
        `});`,
      ].join('\n'));

      const config = makeConfig({ tokenSourceMode: 'package' });
      // Should not throw despite double registration; last-wins.
      expect(() => loadComponentTokens(config, jestTsModuleLoader)).not.toThrow();
      const result = ComponentTokenRegistry.get('pkg.conflict');
      expect(result?.value).toBe(12);
    });

    test('resets allowOverwrite after loading completes', () => {
      fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
      const config = makeConfig({ tokenSourceMode: 'local' });
      loadComponentTokens(config, jestTsModuleLoader);

      // After loadComponentTokens, registry should reject duplicates again
      ComponentTokenRegistry.register({
        name: 'after.test',
        component: 'After',
        family: 'spacing',
        value: 8,
        reasoning: 'first',
      });
      expect(() => ComponentTokenRegistry.register({
        name: 'after.test',
        component: 'After',
        family: 'spacing',
        value: 8,
        reasoning: 'duplicate',
      })).toThrow(/already registered/);
    });
  });
});

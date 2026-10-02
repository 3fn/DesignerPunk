/**
 * @category evergreen
 * @purpose Verify loadComponentTokens() discovery and return type (Spec 104, 114, 124 harvest)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { loadComponentTokens, harvestZeroWarning, ComponentTokenFileLoadError } from '../loadComponentTokens';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { ComponentTokenRegistry } from '../../registries/ComponentTokenRegistry';
import { defineComponentTokens, getTokenContract } from '../../build/tokens';
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
      // Fixtures above are deliberately unbranded (discovery-only test) — this now
      // legitimately fires the Spec 123 C11 harvest-zero lint (Task 8) added below;
      // local spy swallows the expected noise per this suite's own house pattern.
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      expect(() => loadComponentTokens(config, jestTsModuleLoader)).not.toThrow();
      warnSpy.mockRestore();
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

  // Spec 123 Task 8 (C11, Req 8): the harvest-zero lint. Reuses the same brand signal the
  // harvest already computes (getTokenContract) — no second detection mechanism.
  describe('harvest-zero lint (Spec 123 C11, Req 8)', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    test('an unbranded tokens.ts fires exactly one warning, exact string', () => {
      const compDir = path.join(tmpDir, 'components');
      fs.mkdirSync(path.join(compDir, 'Widget'), { recursive: true });
      const filePath = path.join(compDir, 'Widget', 'tokens.ts');
      // A plain semantic-reference map — structurally the confusion Req 8 targets, not a
      // defineComponentTokens value-registration file.
      fs.writeFileSync(filePath, 'module.exports = { widgetColor: "#000000" };');

      const config = makeConfig({ componentTokenDirs: [compDir] });
      loadComponentTokens(config, jestTsModuleLoader);

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(harvestZeroWarning(filePath));
    });

    test('a branded *.tokens.ts fires no warning', () => {
      const compDir = path.join(tmpDir, 'components');
      fs.mkdirSync(path.join(compDir, 'Widget'), { recursive: true });
      const defineTokensPath = require.resolve('../../build/tokens').replace(/\\/g, '/');
      fs.writeFileSync(
        path.join(compDir, 'Widget', 'widget.tokens.ts'),
        [
          `const { defineComponentTokens } = require('${defineTokensPath}');`,
          "module.exports = { widgetTokens: defineComponentTokens({",
          "  component: 'Widget',",
          "  family: 'spacing',",
          "  tokens: { 'inset.sm': { value: 8, reasoning: 'test' } },",
          "}) };",
        ].join('\n'),
      );

      const config = makeConfig({ componentTokenDirs: [compDir] });
      loadComponentTokens(config, jestTsModuleLoader);

      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  // Spec 124: the former `allowOverwrite` describe block (local/package double-registration
  // tolerance + reset-after-load) is deleted. The harvest is now the SOLE writer to the
  // canonical registry, so no double-registration path remains; setDefaultAllowOverwrite /
  // the allowOverwrite option were retired with this change.

  // Spec 124 Task 4.1 — Negative guard (R4): the brand is the SOLE inclusion criterion.
  // An unbranded module — even one exporting a value-map structurally indistinguishable
  // from a flat token value-map — harvests to ZERO. Safe same-process: the negative result
  // does not depend on the dual-instance boundary. If branded-only inclusion ever regresses
  // to structural detection, this REDS.
  describe('negative guard: unbranded module harvests to zero (Spec 124 R4)', () => {
    test('a module whose exports carry no brand harvests zero tokens', () => {
      const componentDir = path.join(tmpDir, 'tokens', 'component');
      fs.mkdirSync(componentDir, { recursive: true });
      // Plain value-maps + a string const + a getter — none branded. The first is
      // structurally identical to a flat token value-map ({ key: number }).
      fs.writeFileSync(
        path.join(componentDir, 'plain.ts'),
        [
          "module.exports = {",
          "  looksLikeTokens: { large: 12, small: 8 },", // structurally a flat value-map
          "  someString: 'not-a-token',",
          "  get derived() { return { medium: 10 }; },",
          "};",
        ].join('\n'),
      );

      const config = makeConfig();
      const result = loadComponentTokens(config, jestTsModuleLoader);

      // Branded-only inclusion: the structurally-token-like map is NOT collected.
      expect(result).toHaveLength(0);
      expect(ComponentTokenRegistry.getAll()).toHaveLength(0);
    });
  });

  // Spec 124 Task 4.2 — Class-invariant guard (R8 AC2): loading a branded module in
  // ISOLATION (without invoking the harvest) leaves the canonical ComponentTokenRegistry
  // EMPTY. This pins P4 (sole writer): defineComponentTokens must NOT self-register. If
  // someone re-adds a registerBatch/register side effect to defineComponentTokens, this
  // REDS loudly — the 124-local fail-loud guard the design (§4 "class-invariant guard")
  // mandates. (The broader lint codification is flagged for 118's 9.4 / Task 11, NOT here.)
  describe('class-invariant guard: defineComponentTokens does not self-register (Spec 124 R8)', () => {
    test('loading/invoking a branded module in isolation leaves the canonical registry empty', () => {
      ComponentTokenRegistry.clear();
      expect(ComponentTokenRegistry.getAll()).toHaveLength(0);

      // Author a branded result exactly as a consumer .tokens.ts would — calling
      // defineComponentTokens directly (the brand WRITE path) — WITHOUT running the harvest.
      const branded = defineComponentTokens({
        component: 'IsolationProbe',
        family: 'spacing',
        tokens: {
          'inset.sm': { value: 8, reasoning: 'class-invariant probe' },
        },
      });

      // The rich tokens rode back on the brand (proves the call did real work)...
      expect(getTokenContract(branded)).toHaveLength(1);
      // ...but the canonical registry is STILL empty — no self-registration side effect.
      // If defineComponentTokens ever registers as a side effect again, this fails loud.
      expect(ComponentTokenRegistry.getAll()).toHaveLength(0);
    });
  });

  // The 15.0.0 upgrade rehearsal (.kiro/issues/2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md):
  // a pre-123 copy of progress.ts in the SINGLE-family form fails defineComponentTokens's
  // family-mismatch guard (#127) at load. The harvest rethrows it as a
  // ComponentTokenFileLoadError naming the FILE (the guard names only the component).
  // Synthetic fixture in a temp dir — no tracked token file is edited.
  describe('a component-token file that throws at load is reported by file (15.0.0 rehearsal F1)', () => {
    function writeSingleFamilyProgress(dir: string): string {
      fs.mkdirSync(dir, { recursive: true });
      const defineTokensPath = require.resolve('../../build/tokens').replace(/\\/g, '/');
      const sizingPath = require.resolve('../../tokens/SizingTokens').replace(/\\/g, '/');
      const file = path.join(dir, 'progress.ts');
      fs.writeFileSync(
        file,
        [
          // Block-scoped: ts-jest compiles these fixtures as scripts, so a top-level const
          // would collide with another fixture's in the same run.
          '{',
          `const { defineComponentTokens } = require('${defineTokensPath}');`,
          `const { sizingTokens } = require('${sizingPath}');`,
          '// The pre-fix form: ONE spacing-family call that references a sizing primitive.',
          'module.exports = { ProgressTokens: defineComponentTokens({',
          "  component: 'Progress',",
          "  family: 'spacing',",
          "  tokens: { 'node.size.sm': { reference: sizingTokens.size150, reasoning: 'pre-fix copy' } },",
          '}) };',
          '}',
        ].join('\n'),
      );
      return file;
    }

    function thrownBy(fn: () => unknown): unknown {
      try {
        fn();
      } catch (err) {
        return err;
      }
      throw new Error('expected a throw');
    }

    test('Source 1 ({tokenSource}/component/): the error names the file and carries the guard message', () => {
      const file = writeSingleFamilyProgress(path.join(tmpDir, 'tokens', 'component'));
      const err = thrownBy(() => loadComponentTokens(makeConfig(), jestTsModuleLoader));
      expect(err).toBeInstanceOf(ComponentTokenFileLoadError);
      const e = err as InstanceType<typeof ComponentTokenFileLoadError>;
      expect(e.name).toBe('ComponentTokenFileLoadError');
      expect(e.file).toBe(file);
      expect(e.reason).toMatch(/^Token family mismatch in defineComponentTokens\(\) for component 'Progress'/);
    });

    test('Source 2 (componentTokens dirs): the same, for a *.tokens.ts', () => {
      const compDir = path.join(tmpDir, 'components');
      const dir = path.join(compDir, 'Progress');
      writeSingleFamilyProgress(dir);
      const tokensFile = path.join(dir, 'progress.tokens.ts');
      fs.renameSync(path.join(dir, 'progress.ts'), tokensFile);
      fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
      const err = thrownBy(() => loadComponentTokens(makeConfig({ componentTokenDirs: [compDir] }), jestTsModuleLoader));
      expect(err).toBeInstanceOf(ComponentTokenFileLoadError);
      expect((err as InstanceType<typeof ComponentTokenFileLoadError>).file).toBe(tokensFile);
      expect((err as InstanceType<typeof ComponentTokenFileLoadError>).reason).toMatch(/^Token family mismatch/);
    });
  });
});

/**
 * @category evergreen
 * @purpose Verify loadComponentTokens() discovery and return type (Spec 104, 114, 124 harvest)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { loadComponentTokens } from '../loadComponentTokens';
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
});

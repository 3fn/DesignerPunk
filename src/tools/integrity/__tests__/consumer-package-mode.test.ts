/**
 * @category evergreen
 * @purpose Spec 117 Task 5.2 — the R4 consumer blast-radius regression tests, in PACKAGE mode.
 *
 * The silent-failure surface has TWO halves, and source-repo testing alone exercises neither
 * from the consumer's seat:
 *
 *   (a) configured component-token sources silently DROPPED in package mode. A consumer product
 *       that authors its OWN componentTokens must have them loaded/indexed under package mode
 *       (the prior `tokenSourceMode === 'local'` gate zeroed them). This is the consumer blast
 *       radius design D6 calls out — invisible to source-repo-only testing. Covered here by a
 *       real fixture driven through the REAL loadComponentTokens in package mode.
 *
 *   (b) genuinely-empty sources silently NOT WARNED in package mode. The R4 AC3 "none found"
 *       warning must fire in package mode, not only local. Covered here by exercising runGenerate
 *       with a package-mode config and no discoverable component tokens, asserting console.warn.
 *
 * Neither half alone is sufficient (design Testing Strategy, R4 AC3 note). Task 4 verified
 * reachability empirically (live `generate`); these are the locked-in regression tests.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadComponentTokens } from '../../../cli/loadComponentTokens';
import { jestTsModuleLoader } from '../../../__tests__/helpers/tsModuleLoader';
import { ComponentTokenRegistry } from '../../../registries/ComponentTokenRegistry';
import type { ResolvedConfig } from '../../../config/ConfigLoader';

// Spec 118 Task 9.5: half (a) exercises the REAL loadComponentTokens, which now defaults to
// the production scoped tsx loader (cannot run in jest). Inject the jest-compatible loader.
// Half (b) jest.doMock's the module entirely, so no injection there. Real scoped resolution
// in a packed install is certified by the consumer guard.

const REGISTRY_PATH = require.resolve('../../../registries/ComponentTokenRegistry').replace(/\\/g, '/');

/** A package-mode ResolvedConfig (no tokenSource → tokenSourceMode 'package'). */
function packageModeConfig(overrides: Partial<ResolvedConfig>): ResolvedConfig {
  return {
    name: 'ConsumerProduct',
    abbreviation: 'CP',
    themes: [],
    // In package mode the primitive/semantic source root points at the PACKAGE's tokens;
    // the consumer does not author those. The relevant axis for R4 is componentTokenDirs.
    tokenSourceRoot: path.join(os.tmpdir(), 'pkg-token-root-does-not-exist'),
    tokenSourceMode: 'package',
    componentTokenDirs: [],
    outputDir: path.join(os.tmpdir(), 'consumer-dist'),
    configDir: os.tmpdir(),
    ...overrides,
  } as ResolvedConfig;
}

describe('Spec 117 R4 consumer blast radius — half (a): consumer authors own componentTokens (package mode)', () => {
  let fixtureDir: string;

  beforeEach(() => {
    ComponentTokenRegistry.clear();
    fixtureDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp117-consumer-fixture-'));
  });

  afterEach(() => {
    ComponentTokenRegistry.clear();
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });

  /**
   * Writes a consumer's own *.tokens.ts that registers a component token via the registry's
   * side-effect API — the exact shape a real consumer's defineComponentTokens() produces.
   */
  function writeConsumerComponentToken(name: string, value: number): string {
    const dir = path.join(fixtureDir, 'components', 'Consumer-Widget');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'consumerWidget.tokens.ts');
    fs.writeFileSync(
      file,
      [
        '// @ts-nocheck',
        `const { ComponentTokenRegistry } = require('${REGISTRY_PATH}');`,
        'ComponentTokenRegistry.register({',
        `  name: '${name}',`,
        "  component: 'ConsumerWidget',",
        "  family: 'spacing',",
        `  value: ${value},`,
        "  reasoning: 'consumer-authored component token',",
        '});',
      ].join('\n'),
    );
    return path.join(fixtureDir, 'components');
  }

  test('a package-mode consumer\'s OWN component tokens ARE loaded and indexed (not silently dropped)', () => {
    const componentsRoot = writeConsumerComponentToken('consumerwidget.inset.md', 16);
    const config = packageModeConfig({ componentTokenDirs: [componentsRoot] });

    // The corrected loader keys on SOURCE PRESENCE, not tokenSourceMode. In package mode
    // the consumer's componentTokenDirs must still be discovered + loaded.
    const loaded = loadComponentTokens(config, jestTsModuleLoader);

    const names = loaded.map((t) => t.name);
    expect(names).toContain('consumerwidget.inset.md');
    const tok = ComponentTokenRegistry.get('consumerwidget.inset.md');
    expect(tok?.value).toBe(16);
  });

  test('multiple consumer-authored tokens across files are all indexed in package mode', () => {
    writeConsumerComponentToken('consumerwidget.inset.md', 16);
    // A second file in the same tree.
    const dir2 = path.join(fixtureDir, 'components', 'Consumer-Panel');
    fs.mkdirSync(dir2, { recursive: true });
    fs.writeFileSync(
      path.join(dir2, 'consumerPanel.tokens.ts'),
      [
        '// @ts-nocheck',
        `const { ComponentTokenRegistry } = require('${REGISTRY_PATH}');`,
        "ComponentTokenRegistry.register({ name: 'consumerpanel.gap.sm', component: 'ConsumerPanel', family: 'spacing', value: 8, reasoning: 'consumer' });",
      ].join('\n'),
    );

    const config = packageModeConfig({ componentTokenDirs: [path.join(fixtureDir, 'components')] });
    const loaded = loadComponentTokens(config, jestTsModuleLoader);
    const names = loaded.map((t) => t.name).sort();
    expect(names).toContain('consumerwidget.inset.md');
    expect(names).toContain('consumerpanel.gap.sm');
  });
});

describe('Spec 117 R4 consumer blast radius — half (b): "none found" warning fires in PACKAGE mode', () => {
  // The warning lives in runGenerate (designerpunk.ts), fired when loadComponentTokens
  // returns []. We drive runGenerate with everything mocked except the warning path, and a
  // package-mode config, asserting the warning is emitted in package mode (not only local).
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(process, 'exit').mockImplementation((() => {}) as never);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test('runGenerate emits the "No component token files found" warning in package mode when none are discovered', async () => {
    jest.doMock('../../../generators/generateTokenFiles', () => ({
      generateTokenFiles: jest.fn().mockReturnValue({
        resolvedLight: [],
        resolvedDark: [],
        themeVaryingTokens: new Set<string>(),
        primitiveOklch: new Map(),
      }),
    }));
    jest.doMock('../../../generators/generateTokenIndex', () => ({ generateTokenIndex: jest.fn() }));
    jest.doMock('../../../cli/generateProductTokens', () => ({ generateProductTokens: jest.fn() }));
    jest.doMock('../../../cli/resolveTokens', () => ({
      resolveTokens: jest.fn().mockReturnValue({ primitiveTokens: [], semanticTokens: [] }),
    }));
    jest.doMock('../../../cli/staleness', () => ({ isProductTokenStale: jest.fn().mockReturnValue(false) }));
    jest.doMock('../../../registries/ComponentTokenRegistry', () => ({
      ComponentTokenRegistry: { getAll: () => [] },
    }));
    // The decisive part: loadComponentTokens returns [] (no sources discovered),
    // and the config is PACKAGE mode.
    jest.doMock('../../../cli/loadComponentTokens', () => ({
      loadComponentTokens: jest.fn().mockReturnValue([]),
    }));
    jest.doMock('../../../config/ConfigLoader', () => ({
      loadConfig: jest.fn().mockResolvedValue({
        name: 'Consumer',
        abbreviation: 'C',
        themes: [],
        tokenSourceRoot: '/pkg/tokens',
        tokenSourceMode: 'package',
        componentTokenDirs: [],
        outputDir: '/tmp/consumer-dist',
        configDir: '/tmp',
      }),
    }));

    const { runGenerate } = require('../../../cli/designerpunk');
    await runGenerate();

    const warned = warnSpy.mock.calls.some((args) =>
      String(args[0]).includes('No component token files found'),
    );
    expect(warned).toBe(true);
  });
});

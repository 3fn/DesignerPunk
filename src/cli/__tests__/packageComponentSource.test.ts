/**
 * @category evergreen
 * @purpose Spec 129 U8, design § 9: the harvest's third source (DesignerPunk's shipped definition files), per-group precedence and its reports
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  loadComponentTokens,
  isPackageComponentToken,
  notEmittedMessage,
  yoursReplaceMessage,
  ComponentTokenGroupDeclaredTwiceError,
  harvestZeroWarning,
  type PackageComponentTokenSource,
} from '../loadComponentTokens';
import { resolveComponentSources } from '../shared/componentSources';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { ComponentTokenRegistry } from '../../registries/ComponentTokenRegistry';
import type { ResolvedConfig } from '../../config/ConfigLoader';

const DEFINE = path.resolve(__dirname, '..', '..', 'build', 'tokens').replace(/\\/g, '/');

/** A definition file in the form the shipped six use: one `defineComponentTokens` call, one group. */
function definitionFile(group: string, keys: string[]): string {
  // An IIFE: ts-jest compiles each fixture as a script, so top-level names would collide across files.
  return [
    'module.exports = (() => {',
    `const { defineComponentTokens } = require('${DEFINE}');`,
    `return { ${group}Tokens: defineComponentTokens({`,
    `  component: '${group}', family: 'spacing',`,
    '  tokens: {',
    ...keys.map(k => `    '${k}': { reference: { name: 'space100', baseValue: 8, category: 'spacing' }, reasoning: 'r' },`),
    '  },',
    '}) };',
    '})();',
    '',
  ].join('\n');
}

describe('loadComponentTokens — the third source (Spec 129 U8, design § 9)', () => {
  let tmp: string;
  let pkgComponents: string;
  let consumerComponents: string;
  let reports: string[];

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-third-source-'));
    pkgComponents = path.join(tmp, 'pkg', 'src', 'components', 'core');
    consumerComponents = path.join(tmp, 'app', 'src', 'components');
    fs.mkdirSync(path.join(tmp, 'app', 'src', 'tokens', 'component'), { recursive: true });
    reports = [];
    ComponentTokenRegistry.clear();
  });
  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
    ComponentTokenRegistry.clear();
  });

  function component(root: string, dir: string, declared: string, files: Record<string, string>): string {
    const d = path.join(root, dir);
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, 'contracts.yaml'), `component: ${declared}\n`);
    for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(d, name), text);
    return d;
  }

  function config(): ResolvedConfig {
    return {
      name: 'T', abbreviation: 'T', themes: [],
      tokenSourceRoot: path.join(tmp, 'app', 'src', 'tokens'),
      tokenSourceMode: 'local',
      componentTokenDirs: [consumerComponents, path.join(tmp, 'app', 'src', 'tokens', 'component')],
      outputDir: path.join(tmp, 'app', 'dist'),
      configDir: path.join(tmp, 'app'),
    } as ResolvedConfig;
  }

  function packageSource(): PackageComponentTokenSource {
    const universe = resolveComponentSources([consumerComponents, pkgComponents]);
    const rank = universe.roots.indexOf(path.resolve(pkgComponents));
    return {
      name: '@3fn/core', version: '1.2.3',
      winners: universe.winners.filter(w => w.rank === rank),
      losers: universe.shadowed.filter(s => s.source.rank === rank),
    };
  }

  const load = () => loadComponentTokens(config(), jestTsModuleLoader, { packageSource: packageSource(), report: l => reports.push(l) });

  test('harvests the package definition files as a third source, after the consumer\'s own', () => {
    component(pkgComponents, 'Avatar-Base', 'Avatar-Base', { 'avatar.tokens.ts': definitionFile('Avatar', ['size.md']) });
    fs.writeFileSync(path.join(tmp, 'app', 'src', 'tokens', 'component', 'progress.ts'), definitionFile('Progress', ['node.size']));

    const tokens = load();

    expect(tokens.map(t => t.name)).toEqual(['progress.node.size', 'avatar.size.md']);
    expect(tokens.map(isPackageComponentToken)).toEqual([false, true]);
    expect(reports).toEqual([]);
  });

  test('a group any consumer file declares is the consumer\'s alone, and the replacement is reported', () => {
    component(pkgComponents, 'Avatar-Base', 'Avatar-Base', { 'avatar.tokens.ts': definitionFile('Avatar', ['size.md', 'size.lg']) });
    component(pkgComponents, 'Button-Icon', 'Button-Icon', { 'buttonIcon.tokens.ts': definitionFile('ButtonIcon', ['inset.large']) });
    fs.writeFileSync(path.join(tmp, 'app', 'src', 'tokens', 'component', 'avatar.ts'), definitionFile('Avatar', ['size.md']));

    const tokens = load();

    // Their `size.md`; DesignerPunk's `size.lg` is NOT emitted (per group, not per token).
    expect(tokens.map(t => t.name).sort()).toEqual(['avatar.size.md', 'buttonicon.inset.large']);
    expect(tokens.filter(isPackageComponentToken).map(t => t.name)).toEqual(['buttonicon.inset.large']);
    expect(reports).toEqual([yoursReplaceMessage('Avatar', false)]);
    expect(reports[0]).toBe("component tokens: Avatar — yours replace DesignerPunk's");
  });

  test('says "(copied at init)" where the consumer\'s file is byte-identical to ours', () => {
    const text = definitionFile('Avatar', ['size.md']);
    component(pkgComponents, 'Avatar-Base', 'Avatar-Base', { 'avatar.tokens.ts': text });
    fs.writeFileSync(path.join(tmp, 'app', 'src', 'tokens', 'component', 'avatar.ts'), text);

    load();

    expect(reports).toEqual(["component tokens: Avatar — yours replace DesignerPunk's (copied at init)"]);
  });

  test('a package group whose component directory loses the union is not emitted, and says so', () => {
    component(pkgComponents, 'Avatar-Base', 'Avatar-Base', { 'avatar.tokens.ts': definitionFile('Avatar', ['size.md']) });
    // Their component takes the name Avatar-Base, with no token file of its own.
    component(consumerComponents, 'Avatar-Base', 'Avatar-Base', {});

    const tokens = load();

    expect(tokens).toEqual([]);
    expect(reports).toEqual([notEmittedMessage('Avatar', 'Avatar-Base')]);
    expect(reports[0]).toBe("component tokens: Avatar — not emitted (DesignerPunk's Avatar-Base is replaced by yours)");
  });

  test('a package component the consumer replaced, whose tokens the consumer declares, reports only the replacement', () => {
    component(pkgComponents, 'Avatar-Base', 'Avatar-Base', { 'avatar.tokens.ts': definitionFile('Avatar', ['size.md']) });
    component(consumerComponents, 'Avatar-Base', 'Avatar-Base', { 'avatar.tokens.ts': definitionFile('Avatar', ['size.md']) });

    load();

    expect(reports).toEqual(["component tokens: Avatar — yours replace DesignerPunk's (copied at init)"]);
  });

  test('two consumer files declaring one group fail, naming both', () => {
    fs.writeFileSync(path.join(tmp, 'app', 'src', 'tokens', 'component', 'avatar.ts'), definitionFile('Avatar', ['size.md']));
    component(consumerComponents, 'Avatar-Base', 'Avatar-Base', { 'avatar.tokens.ts': definitionFile('Avatar', ['size.lg']) });

    let thrown: unknown;
    try { load(); } catch (e) { thrown = e; }

    expect(thrown).toBeInstanceOf(ComponentTokenGroupDeclaredTwiceError);
    const e = thrown as ComponentTokenGroupDeclaredTwiceError;
    expect(e.group).toBe('Avatar');
    expect(e.message).toContain(path.join(tmp, 'app', 'src', 'tokens', 'component', 'avatar.ts'));
    expect(e.message).toContain(path.join(consumerComponents, 'Avatar-Base', 'avatar.tokens.ts'));
    expect(ComponentTokenRegistry.getAll()).toEqual([]);
  });

  test('one file reached by both of the consumer\'s sources is not a duplicate', () => {
    // `init` writes componentTokens: [./src/components, ./src/tokens/component], and source 1 is
    // the second of those: the same file is scanned twice.
    fs.writeFileSync(path.join(tmp, 'app', 'src', 'tokens', 'component', 'tokens.ts'), definitionFile('Progress', ['node.size']));

    expect(() => load()).not.toThrow();
    expect(ComponentTokenRegistry.getAll().map(t => t.name)).toEqual(['progress.node.size']);
  });

  test('one file declaring a group in two defineComponentTokens calls is one declaration', () => {
    const two = [
      'module.exports = (() => {',
      `const { defineComponentTokens } = require('${DEFINE}');`,
      "const ref = { name: 'space100', baseValue: 8, category: 'spacing' };",
      "return {",
      "  A: defineComponentTokens({ component: 'Two', family: 'spacing', tokens: { 'a.x': { reference: ref, reasoning: 'r' } } }),",
      "  B: defineComponentTokens({ component: 'Two', family: 'spacing', tokens: { 'b.y': { reference: ref, reasoning: 'r' } } }),",
      "};",
      "})();",
    ].join('\n');
    fs.writeFileSync(path.join(tmp, 'app', 'src', 'tokens', 'component', 'two.ts'), two);

    expect(() => load()).not.toThrow();
  });

  test('a package definition file that registers no tokens is reported, not passed silently', () => {
    component(pkgComponents, 'Badge-Count-Notification', 'Badge-Count-Notification', {
      'tokens.ts': "module.exports = { BadgeCountNotificationTokens: { 'padding': 2 } };\n",
    });
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    try {
      load();
      const file = path.join(pkgComponents, 'Badge-Count-Notification', 'tokens.ts');
      expect(warn).toHaveBeenCalledWith(harvestZeroWarning(file));
    } finally {
      warn.mockRestore();
    }
  });

  test('without a package source the loader reads its two sources only', () => {
    component(pkgComponents, 'Avatar-Base', 'Avatar-Base', { 'avatar.tokens.ts': definitionFile('Avatar', ['size.md']) });

    expect(loadComponentTokens(config(), jestTsModuleLoader)).toEqual([]);
  });
});

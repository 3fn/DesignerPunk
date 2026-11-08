/**
 * @category evergreen
 * @purpose `platforms:` in `designerpunk.config.ts` (Spec 129 Task 15.3; Req 12.1-12.4; design § 12a): the key is one of
 *          `PLATFORM_KEYS`; an unknown key, or a folder that resolves outside the project, fails `generate` naming it; a
 *          named platform's files are written at its own folder, holding only that platform's files, and every other
 *          platform, web included, at `output`; the freshness check and the product tokens follow the same folders.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { PLATFORM_KEYS, platformOutputDir } from '../../config/platforms';
import { loadConfig } from '../../config/ConfigLoader';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { generateTokenFiles } from '../../generators/generateTokenFiles';
import { resolveTokens } from '../resolveTokens';
import { resolvePlatformOutputs } from '../shared/platformOutputs';
import { checkGeneratedOutputFresh } from '../freshness';
import { productTokenOutputPaths } from '../generateProductTokens';

describe('PLATFORM_KEYS', () => {
  it('is web, ios and android, and the validation reads it', () => {
    expect([...PLATFORM_KEYS]).toEqual(['web', 'ios', 'android']);
    for (const key of PLATFORM_KEYS) expect(resolvePlatformOutputs({ [key]: { output: './x' } }, '/p')).toEqual({ [key]: { output: path.resolve('/p', 'x') } });
  });
});

describe('resolvePlatformOutputs — fails naming the entry (Req 12.3)', () => {
  const root = path.resolve(os.tmpdir(), 'dp-platforms-root');

  it('resolves each folder against the config directory', () => {
    expect(resolvePlatformOutputs({ ios: { output: './ios/DesignerPunk' }, android: { output: 'android/designerpunk' } }, root)).toEqual({
      ios: { output: path.join(root, 'ios/DesignerPunk') },
      android: { output: path.join(root, 'android/designerpunk') },
    });
    expect(resolvePlatformOutputs(undefined, root)).toBeUndefined();
  });

  it('BITES on an unknown platform key, naming it and the platforms there are', () => {
    expect(() => resolvePlatformOutputs({ watchos: { output: './w' } }, root)).toThrow(/names "watchos".*"web", "ios", "android"/);
  });

  it.each(['../elsewhere', '../../x/ios', '/tmp/somewhere-else'])('BITES on a folder that resolves outside the project: %s', (output) => {
    expect(() => resolvePlatformOutputs({ ios: { output } }, root)).toThrow(new RegExp(`platforms\\.ios\\.output.*"${output.replace(/[./]/g, '\\$&')}".*outside your project`));
  });

  it('BITES on the project root itself, an entry with no output, and a non-object', () => {
    expect(() => resolvePlatformOutputs({ ios: { output: '.' } }, root)).toThrow(/outside your project/);
    expect(() => resolvePlatformOutputs({ ios: {} }, root)).toThrow(/platforms\.ios.*needs an `output` path/);
    expect(() => resolvePlatformOutputs({ ios: { output: '' } }, root)).toThrow(/platforms\.ios.*needs an `output` path/);
    expect(() => resolvePlatformOutputs('ios', root)).toThrow(/platforms.*must map a platform key/);
  });
});

describe('platforms: through loadConfig and generateTokenFiles (Req 12.2, 12.4)', () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-platforms-'));
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  const writeConfig = (platforms: string): void => {
    fs.writeFileSync(path.join(dir, 'designerpunk.config.ts'), [
      'export default {',
      "  name: 'PB', abbreviation: 'PB',",
      "  output: './dist/tokens',",
      `  platforms: ${platforms},`,
      '};',
    ].join('\n'));
  };
  const names = (d: string): string[] => (fs.existsSync(d) ? fs.readdirSync(d).sort() : []);

  it('fails loadConfig, and so generate, on an unknown key and on a folder outside the project', async () => {
    writeConfig("{ tvos: { output: './tv' } }");
    await expect(loadConfig(dir, jestConfigModuleLoader)).rejects.toThrow(/"tvos"/);
    const other = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-platforms-out-'));
    try {
      fs.writeFileSync(path.join(other, 'designerpunk.config.ts'), "export default { platforms: { ios: { output: '../ios' } } };");
      await expect(loadConfig(other, jestConfigModuleLoader)).rejects.toThrow(/platforms\.ios\.output.*"\.\.\/ios"/);
    } finally {
      fs.rmSync(other, { recursive: true, force: true });
    }
  });

  it('writes each named platform at its folder, holding only its files, and every other platform at output', async () => {
    writeConfig("{ ios: { output: './ios/DesignerPunk' }, android: { output: './android/designerpunk' } }");
    const config = await loadConfig(dir, jestConfigModuleLoader);
    generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);

    expect(names(path.join(dir, 'ios/DesignerPunk'))).toEqual(['ComponentTokens.ios.swift', 'DesignTokens.ios.swift']);
    expect(names(path.join(dir, 'android/designerpunk'))).toEqual(['ComponentTokens.android.kt', 'DesignTokens.android.kt']);
    const out = names(path.join(dir, 'dist/tokens'));
    expect(out).toEqual(expect.arrayContaining(['DesignTokens.web.css', 'ComponentTokens.web.css', 'DesignTokens.dtcg.json', 'DesignTokens.figma.json']));
    expect(out.filter((f) => /\.(swift|kt)$/.test(f))).toEqual([]);
  });

  it('naming web moves the web files and the DTCG and Figma files with it; iOS and Android stay at output', async () => {
    writeConfig("{ web: { output: './web/tokens' } }");
    const config = await loadConfig(dir, jestConfigModuleLoader);
    generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);
    expect(names(path.join(dir, 'web/tokens'))).toEqual(expect.arrayContaining(['DesignTokens.web.css', 'DesignTokens.dtcg.json', 'DesignTokens.figma.json']));
    const out = names(path.join(dir, 'dist/tokens'));
    expect(out).toEqual(expect.arrayContaining(['DesignTokens.ios.swift', 'DesignTokens.android.kt']));
    expect(out.filter((f) => /\.(css|json)$/.test(f))).toEqual([]);
  });

  it('with no platforms: every file is written at output, as before', async () => {
    fs.writeFileSync(path.join(dir, 'designerpunk.config.ts'), "export default { name: 'PB', abbreviation: 'PB', output: './dist/tokens' };");
    const config = await loadConfig(dir, jestConfigModuleLoader);
    expect(config.platforms).toBeUndefined();
    expect(platformOutputDir(config, 'ios')).toBe(config.outputDir);
    generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);
    expect(names(path.join(dir, 'dist/tokens'))).toEqual(expect.arrayContaining(['DesignTokens.ios.swift', 'DesignTokens.android.kt', 'DesignTokens.web.css']));
  });

  it('the freshness check compares each platform folder: a hand edit to a native file shows, under the platform it is in', async () => {
    writeConfig("{ ios: { output: './ios/DesignerPunk' } }");
    const config = await loadConfig(dir, jestConfigModuleLoader);
    generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);
    fs.mkdirSync(path.join(dir, '.git'), { recursive: true });
    const opts = { projectRoot: dir, configLoader: jestConfigModuleLoader, tsLoader: jestTsModuleLoader };
    // This test does not load the package's component tokens, which the check does, so ComponentTokens.* differ either way.
    const differing = async (): Promise<string[]> => {
      const r = await checkGeneratedOutputFresh(opts);
      if (r.state !== 'stale') throw new Error(`expected stale, got ${JSON.stringify(r)}`);
      expect(r.missing).toEqual([]);
      return r.differing.filter((f) => !f.includes('ComponentTokens'));
    };
    expect(await differing()).toEqual([]);
    fs.appendFileSync(path.join(dir, 'ios/DesignerPunk/DesignTokens.ios.swift'), '\n// edited by hand\n');
    expect(await differing()).toEqual(['ios/DesignTokens.ios.swift']);
    fs.rmSync(path.join(dir, 'ios/DesignerPunk/DesignTokens.ios.swift'));
    const r = await checkGeneratedOutputFresh(opts);
    expect(r.state === 'stale' && r.missing).toContain('ios/DesignTokens.ios.swift');
  });

  it('product tokens: the native files go to the platform folders, flat; the web file stays under output/product', async () => {
    writeConfig("{ ios: { output: './ios/DesignerPunk' }, android: { output: './android/designerpunk' } }");
    const config = await loadConfig(dir, jestConfigModuleLoader);
    expect(productTokenOutputPaths(config)).toEqual({
      web: path.join(dir, 'dist/tokens/product/ProductTokens.web.css'),
      ios: path.join(dir, 'ios/DesignerPunk/ProductTokens.ios.swift'),
      android: path.join(dir, 'android/designerpunk/ProductTokens.android.kt'),
    });
  });
});

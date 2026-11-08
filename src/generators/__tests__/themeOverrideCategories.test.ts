/**
 * @category evergreen
 * @purpose The colour-only rule for theme override maps (P1 record 2026-11-08-non-colour-theme-override-accepted-not-applied;
 *          Peter, 2026-11-08T15:12:38Z): `generate` refuses a non-colour key in any theme override map (dark, wcag,
 *          custom; plain and { light, dark } forms), naming the key, the map and the theme, and writes nothing.
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { findNonColourOverrideKeys } from '../themeOverrideCategories';
import type { ConfigTheme } from '../../config/defineConfig';
import { loadConfig } from '../../config/ConfigLoader';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { generateTokenFiles, TokenGenerationAbortedError } from '../generateTokenFiles';
import { resolveTokens } from '../../cli/resolveTokens';

const t = (name: string, mode: ConfigTheme['mode'] = 'both', overrides: ConfigTheme['overrides'] = {}): ConfigTheme => ({ name, mode, overrides });

describe('a non-colour key in a theme override map is refused, naming the key, the map and the theme', () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-noncolour-'));
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });
  afterEach(() => { fs.rmSync(dir, { recursive: true, force: true }); jest.restoreAllMocks(); });
  const cat = (k: string): string | undefined =>
    k.startsWith('color.') ? 'color' : k.startsWith('space.') ? 'spacing' : undefined;
  const ov = { primitiveReferences: { value: 'x' } };

  it.each([
    ['dark', 'dark', { 'color.a': ov, 'space.inset.100': ov }, 'overrides'],
    ['wcag', 'both', { light: { 'color.a': ov }, dark: { 'space.inset.100': ov } }, 'overrides.dark'],
    ['brand', 'light', { 'space.inset.100': ov }, 'overrides'],
    ['brand', 'both', { light: { 'space.inset.100': ov }, dark: {} }, 'overrides.light'],
  ] as Array<[string, ConfigTheme['mode'], ConfigTheme['overrides'], string]>)('refuses a spacing key in %s (%s)', (name, mode, overrides, mapName) => {
    const r = findNonColourOverrideKeys([t(name, mode, overrides)], cat);
    expect(r).toHaveLength(1);
    expect(r[0].message).toContain('"space.inset.100"');
    expect(r[0].message).toContain(`\`${mapName}\``);
    expect(r[0].message).toContain(`name: "${name}"`);
    expect(r[0].message).toContain('is not a colour token');
  });

  it('leaves a colour-only map in each kind alone, and leaves an unknown name to the orphan-key check', () => {
    expect(findNonColourOverrideKeys([
      t('dark', 'dark', { 'color.a': ov }),
      t('wcag', 'both', { light: { 'color.a': ov }, dark: { 'color.b': ov } }),
      t('brand', 'light', { 'color.a': ov, 'not.a.token': ov }),
    ], cat)).toEqual([]);
  });

  it('makes generate fail, naming the key, and write nothing; a colour-only dark map still generates', async () => {
    const write = (body: string, at: string = dir): void => {
      fs.writeFileSync(path.join(at, 'designerpunk.config.ts'), [
        'export default {', "  name: 'PB', abbreviation: 'PB',",
        `  themes: [ { name: 'dark', mode: 'dark', overrides: { ${body} } } ],`, '};',
      ].join('\n'));
    };
    write("'space.inset.100': { primitiveReferences: { value: 'space100' } }");
    const config = await loadConfig(dir, jestConfigModuleLoader);
    let error: unknown;
    try { generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config); } catch (e) { error = e; }
    expect(error).toBeInstanceOf(TokenGenerationAbortedError);
    expect((error as TokenGenerationAbortedError).stage).toBe('theme-config');
    expect((error as Error).message).toContain('space.inset.100');
    expect(fs.existsSync(config.outputDir)).toBe(false);

    const dir2 = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-noncolour-ok-'));
    write("'color.feedback.error.text': { primitiveReferences: { value: 'pink300' } }", dir2);
    const ok = await loadConfig(dir2, jestConfigModuleLoader);
    expect(() => generateTokenFiles(resolveTokens(ok, jestTsModuleLoader), ok)).not.toThrow();
    fs.rmSync(dir2, { recursive: true, force: true });
  });
});

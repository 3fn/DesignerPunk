/**
 * @category evergreen
 * @purpose The theme-instance rule's refusals (Spec 129 U9, design § 4, item 5 (a)-(h)). Each refusal was
 *          measured first under Req 10.4 and no readable config trips any, so each ships as a `generate`
 *          failure naming the config entry (completion/task-14-completion.md, "The refusals, measured").
 *          One test per refusal checks the rule; the last block checks that `generate` itself fails, names
 *          the entry, and writes nothing.
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { findThemeRefusals, findNonColourOverrideKeys, themeRefusalMessage } from '../themeRefusals';
import type { ConfigTheme } from '../../config/defineConfig';
import { loadConfig } from '../../config/ConfigLoader';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { generateTokenFiles, TokenGenerationAbortedError } from '../../generators/generateTokenFiles';
import { resolveTokens } from '../../cli/resolveTokens';

const t = (name: string, mode: ConfigTheme['mode'] = 'both', overrides: ConfigTheme['overrides'] = {}): ConfigTheme => ({ name, mode, overrides });
const rules = (themes: ConfigTheme[]): string[] => findThemeRefusals(themes).map(r => r.rule);

describe('refusal (a): the name is not an identifier on both platforms', () => {
  it.each([
    ['', 'is empty'],
    ['my theme', 'a character other than'],
    ['brand!', 'a character other than'],
    ['-brand', 'an empty word'],
    ['brand-', 'an empty word'],
    ['high--contrast', 'an empty word'],
    ['1st', 'begins with a digit'],
  ])('refuses %j', (name, why) => {
    const r = findThemeRefusals([t(name)]).filter(x => x.rule === 'a');
    expect(r).toHaveLength(1);
    expect(r[0].message).toContain(why);
    expect(r[0].message).toContain('themes[0]');
  });
  it('accepts letters, digits, "-" and "_" with a letter first', () => {
    expect(rules([t('high-contrast'), t('brand_2'), t('b2b'), t('Brand')])).toEqual([]);
  });
});

describe('refusal (b): a theme named "base"', () => {
  it('refuses base, naming the entry', () => {
    const r = findThemeRefusals([t('base', 'light')]);
    expect(r.map(x => x.rule)).toEqual(['b']);
    expect(r[0].entry).toBe(0);
  });
});

describe('refusal (c): "dark" with a mode other than dark, or in the { light, dark } form', () => {
  it('refuses mode light and mode both', () => {
    expect(rules([t('dark', 'light')])).toEqual(['c']);
    expect(rules([t('dark', 'both')])).toEqual(['c']);
  });
  it('refuses the pair form, even with mode dark', () => {
    expect(rules([t('dark', 'dark', { light: {}, dark: {} })])).toEqual(['c', 'g']);
  });
  it('accepts dark in mode dark with one map', () => {
    expect(rules([t('dark', 'dark')])).toEqual([]);
  });
});

describe('refusal (d): a reserved name spelled another way', () => {
  it.each(['WCAG', 'Dark', 'Base', 'D_ark', 'w-cag'])('refuses %s', (name) => {
    expect(rules([t(name)])).toContain('d');
  });
  it('accepts the exact reserved spellings', () => {
    expect(rules([t('wcag')])).toEqual([]);
    expect(rules([t('dark', 'dark')])).toEqual([]);
  });
});

describe('refusal (e): two names with the same Pascal name when letter case is ignored', () => {
  it('refuses high-contrast, high_contrast and highContrast, naming both entries', () => {
    const r = findThemeRefusals([t('high-contrast'), t('high_contrast'), t('highContrast')]).filter(x => x.rule === 'e');
    expect(r.map(x => x.entry)).toEqual([1, 2]);
    expect(r[0].message).toContain('themes[0]');
  });
  it('refuses a-b and ab (AB and Ab)', () => {
    expect(rules([t('a-b'), t('ab')])).toEqual(['e']);
  });
  it('accepts different names', () => {
    expect(rules([t('brand'), t('high-contrast')])).toEqual([]);
  });
});

describe('refusal (f): a name registered twice', () => {
  it('refuses the second entry, naming the first', () => {
    const r = findThemeRefusals([t('brand'), t('brand')]);
    expect(r.filter(x => x.rule === 'f')).toHaveLength(1);
    expect(r.find(x => x.rule === 'f')!.message).toContain('themes[0]');
  });
});

describe('refusal (g): a mode that is not light, dark or both; the pair form with a mode other than both', () => {
  it('refuses an unknown mode and an absent mode', () => {
    expect(rules([t('x', 'sepia' as never)])).toEqual(['g']);
    expect(rules([{ name: 'x', overrides: {} } as never])).toEqual(['g']);
  });
  it('refuses the pair form with mode light, naming both the form and the mode', () => {
    const r = findThemeRefusals([t('x', 'light', { light: {}, dark: {} })]);
    expect(r.map(x => x.rule)).toEqual(['g']);
    expect(r[0].message).toContain('{ light, dark }');
    expect(r[0].message).toContain('"light"');
  });
  it('accepts the pair form with mode both', () => {
    expect(rules([t('x', 'both', { light: {}, dark: {} })])).toEqual([]);
  });
});

describe('refusal (h): a Swift family case of self, init or allCases', () => {
  it.each([['self', 'self'], ['init', 'init'], ['all-cases', 'allCases'], ['allCases', 'allCases']])('refuses %s', (name, swiftCase) => {
    const r = findThemeRefusals([t(name)]);
    expect(r.map(x => x.rule)).toEqual(['h']);
    expect(r[0].message).toContain(`"${swiftCase}"`);
  });
});

describe('generate fails on a refused config, naming the entry, and writes nothing', () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-refusal-'));
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  it('refuses "base" at themes[1]', async () => {
    fs.writeFileSync(path.join(dir, 'designerpunk.config.ts'), [
      'export default {',
      "  name: 'PB', abbreviation: 'PB',",
      "  themes: [ { name: 'brand', mode: 'light', overrides: {} }, { name: 'base', mode: 'light', overrides: {} } ],",
      '};',
    ].join('\n'));
    const config = await loadConfig(dir, jestConfigModuleLoader);
    let error: unknown;
    try {
      generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(TokenGenerationAbortedError);
    expect((error as TokenGenerationAbortedError).stage).toBe('theme-config');
    expect((error as Error).message).toContain('themes[1]');
    expect((error as Error).message).toContain('"base"');
    expect(fs.existsSync(config.outputDir)).toBe(false);
  });

  it('the failure text lists every refusal and says nothing was written', () => {
    const text = themeRefusalMessage(findThemeRefusals([t('base'), t('self')]));
    expect(text).toContain('(b)');
    expect(text).toContain('(h)');
    expect(text).toContain('Nothing was written.');
  });
});

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

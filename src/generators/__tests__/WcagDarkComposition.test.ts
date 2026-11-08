/**
 * @category evergreen
 * @purpose The WCAG dark composition when the maps come from the config (Spec 129 U9; design § 4, the
 *          theme-instance rule, item 2; design § 10, "Effects"): `wcagDark` is the base dark context with `dark`,
 *          then `wcag` light, then `wcag` dark applied, each layer read from where the bridge says. For a config
 *          that registers `wcag` light only, the top layer is the package's built-in `dark-wcag` map, and the
 *          bridge warning names it.
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadConfig } from '../../config/ConfigLoader';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { generateTokenFiles } from '../generateTokenFiles';
import { resolveTokens } from '../../cli/resolveTokens';
import { darkWcagSemanticOverrides } from '../../tokens/themes/dark-wcag/SemanticOverrides';

const TOKENS = path.resolve(__dirname, '../../tokens');
const ref = (value: string) => `{ primitiveReferences: { value: '${value}' } }`;

describe('the WCAG dark composition, maps from the config', () => {
  let dir: string;
  let warn: jest.SpyInstance;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-wcag-dark-'));
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  const generate = async (themes: string): Promise<{ css: string; warnings: string[] }> => {
    fs.writeFileSync(path.join(dir, 'designerpunk.config.ts'), [
      'export default {',
      "  name: 'PB', abbreviation: 'PB',",
      `  tokenSource: ${JSON.stringify(TOKENS)},`,
      `  themes: [${themes}],`,
      '};',
    ].join('\n'));
    const config = await loadConfig(dir, jestConfigModuleLoader);
    generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);
    return {
      css: fs.readFileSync(path.join(config.outputDir, 'DesignTokens.web.css'), 'utf8'),
      warnings: warn.mock.calls.map(c => String(c[0])),
    };
  };
  const primitive = (css: string, name: string): string => {
    const m = new RegExp(`^  --${name}: (.+);$`, 'm').exec(css);
    if (!m) throw new Error(`no --${name} in the output`);
    return m[1];
  };
  const wcagBlock = (css: string): string => css.slice(css.indexOf(':root[data-theme="wcag"]'));
  const line = (block: string, token: string): string => block.split('\n').find(l => l.startsWith(`  --${token}:`)) ?? '';

  it('applies dark, then wcag light, then wcag dark; each layer is the config\'s, and no warning prints', async () => {
    // color.action.navigation: all three maps override it (dark -> pink100, wcag light -> pink200, wcag dark -> pink300).
    // color.icon.default: only dark (pink400) and wcag light (pink500) override it.
    const { css, warnings } = await generate([
      `{ name: 'dark', mode: 'dark', overrides: { 'color.action.navigation': ${ref('pink100')}, 'color.icon.default': ${ref('pink400')} } }`,
      `{ name: 'wcag', mode: 'both', overrides: { light: { 'color.action.navigation': ${ref('pink200')}, 'color.icon.default': ${ref('pink500')} }, dark: { 'color.action.navigation': ${ref('pink300')} } } }`,
    ].join(', '));
    const block = wcagBlock(css);
    const [p100, p200, p300, p400, p500] = [100, 200, 300, 400, 500].map(n => primitive(css, `pink-${n}`));
    // the member all three override: light half is wcag light, dark half is the TOP layer, wcag dark
    expect(line(block, 'color-action-navigation')).toBe(`  --color-action-navigation: light-dark(${p200}, ${p300});`);
    // the member only dark and wcag light override: wcag light applies over dark, in the dark scheme too
    expect(line(block, 'color-icon-default')).toBe(`  --color-icon-default: ${p500};`);
    // the base :root carries the dark layer alone
    const base = css.slice(0, css.indexOf(':root[data-theme="wcag"]'));
    expect(line(base, 'color-icon-default')).toContain(`, ${p400})`);
    expect(line(base, 'color-action-navigation')).toContain(`, ${p100})`);
    expect(p100).not.toBe(p200);
    expect(warnings.filter(w => w.includes('is not registered'))).toEqual([]);
  });

  it('for a config that registers wcag light only, the top layer is the package\'s built-in dark-wcag map, and the warning names it', async () => {
    const { css, warnings } = await generate([
      `{ name: 'dark', mode: 'dark', overrides: { 'color.action.navigation': ${ref('pink100')} } }`,
      `{ name: 'wcag', mode: 'light', overrides: { 'color.action.navigation': ${ref('pink200')} } }`,
    ].join(', '));
    const builtinTop = (darkWcagSemanticOverrides['color.action.navigation'].primitiveReferences as Record<string, string>).value;
    const p200 = primitive(css, 'pink-200');
    const top = primitive(css, builtinTop.replace(/(\d+)$/, '-$1'));
    expect(line(wcagBlock(css), 'color-action-navigation')).toBe(`  --color-action-navigation: light-dark(${p200}, ${top});`);
    const named = warnings.filter(w => w.includes("theme 'wcag' (dark) is not registered in designerpunk.config.ts"));
    expect(named).toHaveLength(1);
    expect(named[0]).toContain("{ name: 'wcag', mode: 'both', overrides: { light: wcagSemanticOverrides, dark: darkWcagSemanticOverrides } }");
    expect(warnings.some(w => w.includes("theme 'dark' (dark) is not registered"))).toBe(false);
  });
});

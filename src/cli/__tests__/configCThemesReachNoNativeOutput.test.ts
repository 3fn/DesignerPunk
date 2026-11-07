/**
 * @category evergreen
 * @purpose At U6 a config's custom themes reach no native output (Spec 129 Task 11; design § 4,
 *          the theme-instance rule, item 3): `generate`, run on config C in a temporary directory,
 *          emits the four fixed instances and the family cases `base` and `wcag` only on each
 *          platform, and prints "registered, not applied yet" for the themes it does not apply.
 *          Custom themes reach the emitter at U9.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadConfig } from '../../config/ConfigLoader';
import { jestConfigModuleLoader } from '../../__tests__/helpers/configModuleLoader';
import { jestTsModuleLoader } from '../../__tests__/helpers/tsModuleLoader';
import { generateTokenFiles } from '../../generators/generateTokenFiles';
import { resolveTokens } from '../resolveTokens';
import { generateThemesLine } from '../shared/errorCatalog';

describe('config C through generate, at U6', () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-config-c-'));
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  it('emits the four fixed instances and the base and wcag cases only, on both platforms', async () => {
    fs.writeFileSync(path.join(dir, 'designerpunk.config.ts'), [
      "export default {",
      "  name: 'PB', abbreviation: 'PB',",
      "  themes: [",
      "    { name: 'wcag', mode: 'both', overrides: {} },",
      "    { name: 'high-contrast', mode: 'both', overrides: {} },",
      "    { name: 'brand', mode: 'light', overrides: {} },",
      "    { name: 'default', mode: 'dark', overrides: {} },",
      "  ],",
      "};",
    ].join('\n'));
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    const config = await loadConfig(dir, jestConfigModuleLoader);
    expect(config.themes.map(t => t.name)).toEqual(['wcag', 'high-contrast', 'brand', 'default']);

    generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);

    const swift = fs.readFileSync(path.join(config.outputDir, 'DesignTokens.ios.swift'), 'utf8');
    const kotlin = fs.readFileSync(path.join(config.outputDir, 'DesignTokens.android.kt'), 'utf8');
    const swiftHolder = swift.slice(swift.indexOf('public enum PBThemes {'));
    expect([...swiftHolder.slice(0, swiftHolder.indexOf('\n}')).matchAll(/^    public static let (\w+):/gm)].map(m => m[1]))
      .toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
    const kotlinHolder = kotlin.slice(kotlin.indexOf('object PBThemes {'));
    expect([...kotlinHolder.slice(0, kotlinHolder.indexOf('\n}')).matchAll(/^    val (\w+) = DesignerPunkTheme\($/gm)].map(m => m[1]))
      .toEqual(['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark']);
    expect([...swift.slice(swift.indexOf('public enum PBThemeFamily')).split('\n}')[0].matchAll(/^    case (\S+)$/gm)].map(m => m[1])).toEqual(['base', 'wcag']);
    expect([...kotlin.slice(kotlin.indexOf('enum class PBThemeFamily')).split('\n}')[0].matchAll(/^    (\w+),?$/gm)].map(m => m[1])).toEqual(['Base', 'Wcag']);
    for (const bad of ['highContrast', 'HighContrast', 'brand', 'Brand', 'defaultDark', 'DefaultDark']) {
      expect(swift + kotlin).not.toContain(bad);
    }
  });

  it('prints "registered, not applied yet" for the registered themes', () => {
    const line = generateThemesLine([
      { name: 'wcag', mode: 'both' }, { name: 'high-contrast', mode: 'both' }, { name: 'brand', mode: 'light' }, { name: 'default', mode: 'dark' },
    ] as never);
    expect(line).toContain('high-contrast (both), brand (light), default (dark)');
    expect(line).toContain('registered, not applied yet');
  });
});

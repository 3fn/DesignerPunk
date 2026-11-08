/**
 * @category evergreen
 * @purpose From U9 a config's custom themes reach the output (Spec 129 Task 14; design § 4, the
 *          theme-instance rule, item 3): `generate`, run on config C in a temporary directory, emits
 *          the instance set and the family cases Task 11's exact-set test lists for config C (eight
 *          instances; the family `base`, `wcag`, `highContrast`, `brand`, `default`), and its
 *          `Themes:` line no longer says "registered, not applied yet".
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

describe('config C through generate, from U9', () => {
  let dir: string;
  beforeEach(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-config-c-'));
  });
  afterEach(() => {
    fs.rmSync(dir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  const writeConfigC = (): void => {
    fs.writeFileSync(path.join(dir, 'designerpunk.config.ts'), [
      "export default {",
      "  name: 'PB', abbreviation: 'PB',",
      "  themes: [",
      "    { name: 'wcag', mode: 'both', overrides: {} },",
      "    { name: 'high-contrast', mode: 'both', overrides: { 'color.action.primary': { primitiveReferences: { value: 'purple500' } } } },",
      "    { name: 'brand', mode: 'light', overrides: { 'color.action.primary': { primitiveReferences: { value: 'pink300' } } } },",
      "    { name: 'default', mode: 'dark', overrides: { 'color.action.primary': { primitiveReferences: { value: 'teal300' } } } },",
      "  ],",
      "};",
    ].join('\n'));
  };

  it('emits the eight instances and the five family cases, on both platforms', async () => {
    writeConfigC();
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const config = await loadConfig(dir, jestConfigModuleLoader);
    expect(config.themes.map(t => t.name)).toEqual(['wcag', 'high-contrast', 'brand', 'default']);

    generateTokenFiles(resolveTokens(config, jestTsModuleLoader), config);

    const swift = fs.readFileSync(path.join(config.outputDir, 'DesignTokens.ios.swift'), 'utf8');
    const kotlin = fs.readFileSync(path.join(config.outputDir, 'DesignTokens.android.kt'), 'utf8');
    const swiftHolder = swift.slice(swift.indexOf('public enum PBThemes {'));
    expect([...swiftHolder.slice(0, swiftHolder.indexOf('\n}')).matchAll(/^    public static let (\w+):/gm)].map(m => m[1]))
      .toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark', 'highContrastLight', 'highContrastDark', 'brandLight', 'defaultDark']);
    const kotlinHolder = kotlin.slice(kotlin.indexOf('object PBThemes {'));
    expect([...kotlinHolder.slice(0, kotlinHolder.indexOf('\n}')).matchAll(/^    val (\w+) = DesignerPunkTheme\($/gm)].map(m => m[1]))
      .toEqual(['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark', 'HighContrastLight', 'HighContrastDark', 'BrandLight', 'DefaultDark']);
    expect([...swift.slice(swift.indexOf('public enum PBThemeFamily')).split('\n}')[0].matchAll(/^    case (\S+)$/gm)].map(m => m[1]))
      .toEqual(['base', 'wcag', 'highContrast', 'brand', '`default`']);
    expect([...kotlin.slice(kotlin.indexOf('enum class PBThemeFamily')).split('\n}')[0].matchAll(/^    (\w+),?$/gm)].map(m => m[1]))
      .toEqual(['Base', 'Wcag', 'HighContrast', 'Brand', 'Default']);
    for (const bad of ['brandDark', 'defaultLight']) expect(swift + kotlin).not.toContain(bad);
  });

  it('the Themes: line no longer says "registered, not applied yet" for high-contrast, brand or default', () => {
    const line = generateThemesLine([
      { name: 'wcag', mode: 'both' }, { name: 'high-contrast', mode: 'both' }, { name: 'brand', mode: 'light' }, { name: 'default', mode: 'dark' },
    ] as never);
    expect(line).toContain('high-contrast (both), brand (light), default (dark)');
    expect(line).not.toContain('not applied yet');
    expect(line).toContain('registered and applied');
  });
});

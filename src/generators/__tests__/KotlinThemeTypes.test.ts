/**
 * @category evergreen
 * @purpose Verify Kotlin theme emission (Spec 129 Task 11; design § 4): the exact instance set,
 *          names, family, provider, selection, defaults, imports and resolved values, on output
 *          generated from the repository's real token definitions. Re-baselined from Spec 094's
 *          fixtures.
 */

import { TokenFileGenerator, type ThemeOverrideSet } from '../TokenFileGenerator';
import { realThemeContexts } from './helpers/realThemeContexts';

const generator = new TokenFileGenerator();
const contexts = realThemeContexts();
const MEMBER = 'color.action.primary';

function theme(name: string, mode: 'light' | 'dark' | 'both'): ThemeOverrideSet {
  const change = (tokens: typeof contexts.semanticTokens, lightness: string) =>
    tokens.map(t => (t.name === MEMBER ? { ...t, primitiveReferences: { value: `oklch(${lightness} 0.1 200)` } } : t));
  return { name, mode, lightTokens: change(contexts.semanticTokens, '0.31'), darkTokens: change(contexts.darkSemanticTokens, '0.62'), overrideKeys: new Set([MEMBER]) };
}

const configS = { ...contexts, productName: 'WrKingClass', abbreviation: 'WKC', themeOverrides: [] as ThemeOverrideSet[] };
const configC = {
  ...contexts, productName: 'PB', abbreviation: 'PB',
  themeOverrides: [theme('high-contrast', 'both'), theme('brand', 'light'), theme('default', 'dark')],
};
const kotlin = (o: typeof configS) => generator.generateNativeThemes('android', o).join('\n');
const holder = (out: string): string[] => {
  const start = out.indexOf('Themes {');
  const block = out.slice(start, out.indexOf('\n}', start));
  return [...block.matchAll(/^    val (\w+) = DesignerPunkTheme\($/gm)].map(m => m[1]);
};

describe('config S: the four fixed instances', () => {
  const out = kotlin(configS);

  it('the holder\'s members are exactly BaseLight, BaseDark, WcagLight, WcagDark, in that order', () => {
    expect(holder(out)).toEqual(['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark']);
    expect(out).not.toMatch(/val (DarkDark|Dark|Wcag) = DesignerPunkTheme\(/);
  });

  it('declares the fixed binding and no alias', () => {
    expect(out).toMatch(/^data class DesignerPunkTheme\($/m);
    expect(out).toMatch(/^object WrKingClassThemes \{$/m);
    expect(out).toContain('val LocalDPTheme = staticCompositionLocalOf { WrKingClassThemes.BaseLight }');
    expect(out).not.toMatch(/typealias|LocalWKCTheme|compositionLocalOf \{/);
  });

  it('the family has exactly Base and Wcag, each with a generated doc comment, and no Dark entry', () => {
    const body = out.slice(out.indexOf('enum class WrKingClassThemeFamily {'), out.indexOf('\n}', out.indexOf('enum class WrKingClassThemeFamily {')));
    expect([...body.matchAll(/^    (\w+),?$/gm)].map(m => m[1])).toEqual(['Base', 'Wcag']);
    expect(body).toContain('/** light: BaseLight · dark: BaseDark */');
    expect(body).toContain('/** light: WcagLight · dark: WcagDark */');
  });

  it('the provider has the exact signature and defaults, and a when branch for every family entry', () => {
    expect(out).toContain('@Composable\nfun WrKingClassTheme(\n    family: WrKingClassThemeFamily = WrKingClassThemeFamily.Base,\n    darkTheme: Boolean = isSystemInDarkTheme(),\n    content: @Composable () -> Unit\n) {');
    expect(out).toContain('WrKingClassThemeFamily.Base -> if (darkTheme) WrKingClassThemes.BaseDark else WrKingClassThemes.BaseLight');
    expect(out).toContain('WrKingClassThemeFamily.Wcag -> if (darkTheme) WrKingClassThemes.WcagDark else WrKingClassThemes.WcagLight');
    expect(out).toContain('CompositionLocalProvider(LocalDPTheme provides theme, content = content)');
  });

  it('every `when` branch names a holder member that is declared, and every member is named by a branch', () => {
    const named = new Set([...out.matchAll(/WrKingClassThemes\.(\w+)/g)].map(m => m[1]));
    for (const n of named) {
      if (n === 'BaseLight') continue;
      expect(holder(out)).toContain(n);
    }
    for (const m of holder(out)) expect(named.has(m)).toBe(true);
  });

  it('with no name the default applies: data class and provider function share the name DesignerPunkTheme', () => {
    const d = kotlin({ ...configS, productName: undefined, abbreviation: undefined } as never);
    expect(d).toContain('object DesignerPunkThemes {');
    expect(d).toContain('enum class DesignerPunkThemeFamily {');
    expect(d).toContain('data class DesignerPunkTheme(');
    expect(d).toContain('fun DesignerPunkTheme(\n    family: DesignerPunkThemeFamily = DesignerPunkThemeFamily.Base,');
  });
});

describe('config C: custom themes passed to the emitter', () => {
  const out = kotlin(configC);

  it('the holder\'s members are the eight Pascal forms, in order', () => {
    expect(holder(out)).toEqual(['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark', 'HighContrastLight', 'HighContrastDark', 'BrandLight', 'DefaultDark']);
    expect(out).not.toMatch(/val (BrandDark|DefaultLight|Brand|Default) = DesignerPunkTheme\(/);
  });

  it('the family entries are Base, Wcag, HighContrast, Brand, Default', () => {
    const start = out.indexOf('enum class PBThemeFamily {');
    const body = out.slice(start, out.indexOf('\n}', start));
    expect([...body.matchAll(/^    (\w+),?$/gm)].map(m => m[1])).toEqual(['Base', 'Wcag', 'HighContrast', 'Brand', 'Default']);
  });

  it('selection: a theme of one mode shows base in the scheme it does not cover', () => {
    expect(out).toContain('PBThemeFamily.HighContrast -> if (darkTheme) PBThemes.HighContrastDark else PBThemes.HighContrastLight');
    expect(out).toContain('PBThemeFamily.Brand -> if (darkTheme) PBThemes.BaseDark else PBThemes.BrandLight');
    expect(out).toContain('PBThemeFamily.Default -> if (darkTheme) PBThemes.DefaultDark else PBThemes.BaseLight');
  });

  it('the Brand and Default entries carry a doc comment naming each scheme and the base fallback', () => {
    expect(out).toContain('/** light: BrandLight · dark: BaseDark (no dark overrides; falls back to base) */');
    expect(out).toContain('/** light: BaseLight · dark: DefaultDark (no light overrides; falls back to base) */');
  });

  it('an unoverridden member takes the same-mode base value', () => {
    const block = (m: string) => out.slice(out.indexOf(`val ${m} = DesignerPunkTheme(`), out.indexOf('\n    )', out.indexOf(`val ${m} = DesignerPunkTheme(`)));
    const line = (m: string, member: string) => block(m).split('\n').find(l => l.includes(member))!.trim();
    expect(line('BrandLight', 'color_action_primary')).not.toBe(line('BaseLight', 'color_action_primary'));
    expect(line('BrandLight', 'color_structure_canvas')).toBe(line('BaseLight', 'color_structure_canvas'));
    expect(line('DefaultDark', 'color_structure_canvas')).toBe(line('BaseDark', 'color_structure_canvas'));
  });
});

describe('resolved values and imports on the real definitions', () => {
  it('finds zero Color.Unspecified, Color.clear and `unresolved`', () => {
    expect(kotlin(configS)).not.toMatch(/Color\.Unspecified|Color\.clear|unresolved/);
  });

  it('the theme block emits no import line, and the generated file has one import list at its head', () => {
    expect(kotlin(configS)).not.toMatch(/^import /m);
    const file = generator.generateAndroidTokens({ ...contexts, productName: 'WrKingClass', abbreviation: 'WKC' }).content;
    const lines = file.split('\n');
    const lastImport = lines.map((l, i) => (l.startsWith('import ') ? i : -1)).reduce((a, b) => Math.max(a, b), -1);
    const firstDecl = lines.findIndex(l => /^(data class|object|class|val|fun|@Composable|enum class)\b/.test(l));
    expect(lastImport).toBeGreaterThan(-1);
    expect(lastImport).toBeLessThan(firstDecl);
    for (const needed of ['androidx.compose.runtime.staticCompositionLocalOf', 'androidx.compose.runtime.CompositionLocalProvider', 'androidx.compose.runtime.Composable', 'androidx.compose.foundation.isSystemInDarkTheme']) {
      expect(file).toContain(`import ${needed}`);
    }
  });

  it('every member is a Display P3 Color constructor and every channel is within 0–1', () => {
    const out = kotlin(configS);
    const rows = out.split('\n').filter(l => /^        \w+ = Color\(/.test(l));
    const colours = contexts.semanticTokens.filter(t => t.category === 'color').length;
    expect(colours).toBeGreaterThan(50);
    expect(rows.length).toBe(colours * 4);
    for (const r of rows) {
      expect(r).toMatch(/Color\([\d.]+f, [\d.]+f, [\d.]+f, [\d.]+f, ColorSpaces\.DisplayP3\)/);
      for (const n of r.match(/[\d.]+f/g)!) expect(parseFloat(n)).toBeLessThanOrEqual(1);
    }
  });
});

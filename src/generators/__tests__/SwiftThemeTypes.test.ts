/**
 * @category evergreen
 * @purpose Verify Swift theme emission (Spec 129 Task 11; design § 4): the exact instance set,
 *          names, family, provider, selection, defaults and resolved values, on output generated
 *          from the repository's real token definitions. Re-baselined from Spec 094's fixtures.
 */

import { TokenFileGenerator, type ThemeOverrideSet } from '../TokenFileGenerator';
import { realThemeContexts } from './helpers/realThemeContexts';

const generator = new TokenFileGenerator();
const contexts = realThemeContexts();

/** A theme made of real resolved tokens with one member changed, so a fallback is observable. */
function theme(name: string, mode: 'light' | 'dark' | 'both', overrideName: string): ThemeOverrideSet {
  const change = (tokens: typeof contexts.semanticTokens, lightness: string) =>
    tokens.map(t => (t.name === overrideName ? { ...t, primitiveReferences: { value: `oklch(${lightness} 0.1 200)` } } : t));
  return {
    name,
    mode,
    lightTokens: change(contexts.semanticTokens, '0.31'),
    darkTokens: change(contexts.darkSemanticTokens, '0.62'),
    overrideKeys: new Set([overrideName]),
  };
}

const MEMBER = 'color.action.primary';
const configS = (name = 'WrKingClass', abbreviation = 'WKC') => ({
  ...contexts,
  productName: name,
  abbreviation,
  // Config S: dark (mode dark) and wcag (mode light) add no instance of their own.
  themeOverrides: [] as ThemeOverrideSet[],
});
const configC = () => ({
  ...contexts,
  productName: 'PB',
  abbreviation: 'PB',
  // wcag is built in; the others are config C's custom themes (passed straight to the emitter at U6).
  themeOverrides: [theme('high-contrast', 'both', MEMBER), theme('brand', 'light', MEMBER), theme('default', 'dark', MEMBER)],
});

const swift = (o: ReturnType<typeof configS>) => generator.generateNativeThemes('ios', o).join('\n');
const holderMembers = (out: string): string[] => {
  const start = out.indexOf('\npublic enum ');
  const open = out.indexOf('Themes {', start);
  const block = out.slice(open, out.indexOf('\n}', open));
  return [...block.matchAll(/^    public static let (\w+): any DesignerPunkTheme = \w+\(\)$/gm)].map(m => m[1]);
};

describe('config S: the four fixed instances', () => {
  const out = swift(configS());

  it('the holder\'s members are exactly baseLight, baseDark, wcagLight, wcagDark, in that order', () => {
    expect(holderMembers(out)).toEqual(['baseLight', 'baseDark', 'wcagLight', 'wcagDark']);
    for (const bad of ['darkDark', 'darkLight', 'public static let dark:', 'public static let wcag:']) {
      expect(out).not.toContain(bad);
    }
  });

  it('declares the fixed binding, whatever the consumer\'s name or abbreviation', () => {
    expect(out).toMatch(/^public protocol DesignerPunkTheme: Sendable \{$/m);
    expect(out).toMatch(/^public struct DPThemeKey: EnvironmentKey \{$/m);
    expect(out).toContain('var dpTheme: any DesignerPunkTheme {');
    expect(out).toMatch(/^public enum WrKingClassThemes \{$/m);
  });

  it('emits no alias: no typealias, no second key, no Local<ABBR>Theme', () => {
    expect(out).not.toContain('typealias');
    expect(out).not.toMatch(/WKCThemeKey|LocalWKCTheme/);
    expect(out).not.toMatch(/public protocol WrKingClassTheme\b/);
  });

  it('declares each backing struct as `public struct <Name><Pascal>Theme: DesignerPunkTheme, Equatable` with an implicit member', () => {
    for (const p of ['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark']) {
      expect(out).toContain(`public struct WrKingClass${p}Theme: DesignerPunkTheme, Equatable {`);
      expect(out).toContain(`static var wkc${p}: WrKingClass${p}Theme { WrKingClass${p}Theme() }`);
      expect(out).toContain(`public extension DesignerPunkTheme where Self == WrKingClass${p}Theme {`);
    }
  });

  it('declares each holder member on its own line, four spaces in, as the per-run instance check parses it', () => {
    expect(out).toContain('    public static let baseLight: any DesignerPunkTheme = WrKingClassBaseLightTheme()');
    expect(out).toContain('    public static let wcagDark: any DesignerPunkTheme = WrKingClassWcagDarkTheme()');
    expect(out.split('\n').filter(l => l.startsWith('\t')).length).toBe(0);
  });

  it('carries the `: Sendable` clause on the protocol and on the family', () => {
    expect(out).toMatch(/public protocol DesignerPunkTheme: Sendable \{/);
    expect(out).toMatch(/public enum WrKingClassThemeFamily: Sendable, Hashable, CaseIterable \{/);
    expect(out).not.toMatch(/ThemeFamily: String/);
  });

  it('the family has exactly base and wcag, each with a generated doc comment, and no dark case', () => {
    const cases = [...out.matchAll(/^    case (\S+)$/gm)].map(m => m[1]);
    expect(cases).toEqual(['base', 'wcag']);
    expect(out).toContain('/// light: baseLight · dark: baseDark');
    expect(out).toContain('/// light: wcagLight · dark: wcagDark');
  });

  it('the provider is `<name>Theme(_ family:)`, defaults to base, selects by an exhaustive switch with no default branch', () => {
    expect(out).toContain('func wrKingClassTheme(_ family: WrKingClassThemeFamily = .base) -> some View {');
    expect(out).toContain('@Environment(\\.colorScheme)');
    expect(out).toContain('content.environment(\\.dpTheme, theme)');
    const sw = out.slice(out.indexOf('switch family {'));
    expect(sw.slice(0, sw.indexOf('\n        }'))).not.toContain('default:');
    expect(out).toContain('case .base: return dark ? WrKingClassThemes.baseDark : WrKingClassThemes.baseLight');
    expect(out).toContain('case .wcag: return dark ? WrKingClassThemes.wcagDark : WrKingClassThemes.wcagLight');
  });

  it('DPThemeKey.defaultValue is the base light instance', () => {
    expect(out).toContain('public static let defaultValue: any DesignerPunkTheme = WrKingClassBaseLightTheme()');
  });

  it('with no name the default `DesignerPunk` applies', () => {
    const d = swift({ ...configS(), productName: undefined, abbreviation: undefined } as never);
    expect(d).toContain('public enum DesignerPunkThemes {');
    expect(d).toContain('public struct DesignerPunkBaseLightTheme: DesignerPunkTheme, Equatable {');
    expect(d).toContain('public enum DesignerPunkThemeFamily: Sendable, Hashable, CaseIterable {');
    expect(d).toContain('func designerPunkTheme(_ family: DesignerPunkThemeFamily = .base) -> some View {');
  });
});

describe('config C: custom themes passed to the emitter', () => {
  const out = swift(configC());

  it('the holder\'s members are exactly the eight, in order; no brandDark, defaultLight or unsuffixed names', () => {
    expect(holderMembers(out)).toEqual([
      'baseLight', 'baseDark', 'wcagLight', 'wcagDark', 'highContrastLight', 'highContrastDark', 'brandLight', 'defaultDark',
    ]);
    for (const bad of ['brandDark', 'defaultLight', 'darkDark']) expect(out).not.toContain(`let ${bad}:`);
    expect(out).not.toMatch(/public static let (brand|default|wcag):/);
  });

  it('the family has base, wcag, highContrast, brand and `default` (backticked), in order', () => {
    const cases = [...out.matchAll(/^    case (\S+)$/gm)].map(m => m[1]);
    expect(cases).toEqual(['base', 'wcag', 'highContrast', 'brand', '`default`']);
  });

  it('selection: brand shows brandLight / baseDark, default shows baseLight / defaultDark, highContrast both its own', () => {
    expect(out).toContain('case .highContrast: return dark ? PBThemes.highContrastDark : PBThemes.highContrastLight');
    expect(out).toContain('case .brand: return dark ? PBThemes.baseDark : PBThemes.brandLight');
    expect(out).toContain('case .`default`: return dark ? PBThemes.defaultDark : PBThemes.baseLight');
  });

  it('the family cases carry a doc comment naming each scheme and the base fallback for a single-mode theme', () => {
    expect(out).toContain('/// light: brandLight · dark: baseDark (no dark overrides; falls back to base)');
    expect(out).toContain('/// light: baseLight · dark: defaultDark (no light overrides; falls back to base)');
  });

  it('every instance declares every member with a resolved value; an unoverridden member takes the same-mode base', () => {
    const block = (s: string) => out.slice(out.indexOf(`public struct PB${s}Theme`), out.indexOf('}', out.indexOf(`public struct PB${s}Theme`)));
    const line = (s: string) => block(s).split('\n').find(l => l.includes('colorActionPrimary'))!;
    // brand (light) overrides the member; its dark half is base.
    expect(line('BrandLight')).toContain('Color(.displayP3');
    expect(line('BrandLight')).not.toBe(line('BaseLight'));
    // default (dark) overrides it in dark; the light half is base.
    expect(line('DefaultDark')).not.toBe(line('BaseDark'));
    // a member neither overrides is the same as base in the same mode.
    const other = (s: string) => block(s).split('\n').find(l => l.includes('colorStructureCanvas'))!;
    expect(other('BrandLight')).toBe(other('BaseLight'));
    expect(other('DefaultDark')).toBe(other('BaseDark'));
  });
});

describe('resolved values on the real definitions', () => {
  const out = swift(configS());

  it('finds zero Color.Unspecified, Color.clear and `unresolved`', () => {
    expect(out).not.toMatch(/Color\.Unspecified|Color\.clear|unresolved/);
  });

  it('every member is a Display P3 constructor (no sRGB two-decimal values)', () => {
    const lets = out.split('\n').filter(l => /^    public let \w+: Color = /.test(l));
    const colours = contexts.semanticTokens.filter(t => t.category === 'color').length;
    expect(colours).toBeGreaterThan(50);
    expect(lets.length).toBe(colours * 4);
    expect(lets.every(l => /Color\(\.displayP3, red: [\d.]+, green: [\d.]+, blue: [\d.]+, opacity: [\d.]+\)$/.test(l))).toBe(true);
  });

  it('the theme block emits no import line', () => {
    expect(out).not.toMatch(/^import /m);
  });

  it('the wcag instances differ from base for a member the wcag maps override', () => {
    const member = (s: string) => out.split('\n').filter(l => l.includes('public let colorActionPrimary')).map(l => l.trim());
    expect(new Set(member('x')).size).toBeGreaterThan(1);
  });
});

describe('the wcag case names its built-in source (design § 4, [LEONARDO R2])', () => {
  const wcagComment = (o: object, platform: 'ios' | 'android') => {
    const out = generator.generateNativeThemes(platform, o as ReturnType<typeof configS>).join('\n');
    const lines = out.split('\n');
    const i = lines.findIndex(l => /\bcase wcag\b|\bWcag\b\s*[,(]?/.test(l) && !/instance|Themes\./.test(l));
    return lines.slice(Math.max(0, i - 2), i + 1).join('\n');
  };
  it('names the bridge map on iOS and Android when a WCAG map is not registered', () => {
    const o = { ...configS(), wcagSource: { wcagLight: 'registered', wcagDark: 'bridge' } };
    expect(wcagComment(o, 'ios')).toContain('built-in dark-wcag map from @3fn/core applied');
    expect(wcagComment(o, 'android')).toContain('built-in dark-wcag map from @3fn/core applied');
  });
  it('adds nothing when both WCAG maps are the consumer\'s own, or no source is given', () => {
    const own = { ...configS(), wcagSource: { wcagLight: 'registered', wcagDark: 'registered' } };
    expect(swift(own as ReturnType<typeof configS>)).not.toContain('@3fn/core');
    expect(swift(configS())).not.toContain('@3fn/core');
  });
});

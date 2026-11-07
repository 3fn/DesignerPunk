/**
 * @category evergreen
 * @purpose Verify the shadow colours of Spec 129 Task 8.2 (Requirement 7; design § 8)
 *
 *   - the four shadow primitives are defined in OKLCH, to design § 8's values, and convert back
 *     to their earlier `rgba` within Requirement 6.10's tolerance (no colour change);
 *   - every shadow composite's colour primitive is emitted on web, iOS and Android;
 *   - the web composite uses its colour token's custom property, never a literal;
 *   - each native shadow composite is a generated `ShadowToken`, not a `Typography` constructor.
 */

import { TokenFileGenerator } from '../TokenFileGenerator';
import { getAllSemanticTokens } from '../../tokens/semantic';
import { composedColorMap } from '../../tokens/color';
import { colorTokens } from '../../tokens/ColorTokens';
import { resolveSemanticTokenValue } from '../../resolvers/SemanticValueResolver';
import { deltaE00, fromSrgbHex, toSrgbHex } from '../../color/OklchConverter';
import { oklchToNativeChannels } from '../oklch/NativeColorUtils';
import type { ColorTokenValue, PrimitiveToken } from '../../types/PrimitiveToken';

/** design.md § 8: Peter's P-2 (1). The values, as the design states them. */
const DESIGN_8: Record<string, { l: number; c: number; h: number }> = {
  shadowBlack100: { l: 0, c: 0, h: 0 },
  shadowBlue100: { l: 0.2161, c: 0.0306, h: 269.6 },
  shadowOrange100: { l: 0.1956, c: 0.0127, h: 67.0 },
  shadowGray100: { l: 0.1912, c: 0.0219, h: 263.8 },
};

/** The earlier definitions, in ColorTokens.ts. */
function earlierRgba(name: string): { r: number; g: number; b: number } {
  const token = (colorTokens as Record<string, PrimitiveToken>)[name];
  const base = (token.platforms.web.value as ColorTokenValue).light.base;
  const m = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*1\s*\)$/.exec(base);
  if (!m) throw new Error(`${name}: unexpected earlier value ${base}`);
  return { r: +m[1], g: +m[2], b: +m[3] };
}

const hexOf = ({ r, g, b }: { r: number; g: number; b: number }): string =>
  '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');

describe('the four shadow colour primitives are defined in OKLCH (design § 8)', () => {
  it.each(Object.keys(DESIGN_8))('%s has the value design § 8 states', name => {
    expect(composedColorMap.get(name)?.resolved).toEqual(DESIGN_8[name]);
  });

  it('creates no new name: exactly the four names the composites already referenced', () => {
    const shadowNames = [...composedColorMap.keys()].filter(n => n.startsWith('shadow')).sort();
    expect(shadowNames).toEqual(Object.keys(DESIGN_8).sort());
  });

  it.each(Object.keys(DESIGN_8))('%s converts back to its earlier rgba within ΔE₀₀ 0.1', name => {
    const earlier = earlierRgba(name);
    const source = fromSrgbHex(hexOf(earlier));
    const dE = deltaE00(DESIGN_8[name], source);
    expect(dE).toBeLessThanOrEqual(0.1);
  });

  it.each(Object.keys(DESIGN_8))('%s has the sRGB hex of its earlier rgba (no colour change)', name => {
    const { l, c, h } = DESIGN_8[name];
    expect(toSrgbHex(l, c, h)).toBe(hexOf(earlierRgba(name)));
  });

  it.each(Object.keys(DESIGN_8))('%s is inside Display P3 and its native channels are within 0–1', name => {
    const { l, c, h } = DESIGN_8[name];
    const ch = oklchToNativeChannels(l, c, h);
    for (const v of [ch.r, ch.g, ch.b]) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });
});

describe('every shadow composite, on every platform', () => {
  const semantics = getAllSemanticTokens();
  const shadows = semantics.filter(t => t.category === 'shadow');
  const light = semantics.map(t => resolveSemanticTokenValue(t, 'light', 'base'));
  const dark = semantics.map(t => resolveSemanticTokenValue(t, 'dark', 'base'));
  const generator = new TokenFileGenerator();
  const options = { semanticTokens: light, darkSemanticTokens: dark };
  const web = generator.generateWebTokens(options).content;
  const ios = generator.generateiOSTokens(options).content;
  const android = generator.generateAndroidTokens(options).content;

  const colorOf = (t: (typeof shadows)[number]): string => (t.primitiveReferences as Record<string, string>).color;
  const kebab = (s: string) => s.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/(\d+)/, '-$1').replace(/--/g, '-');

  it('there are 15 composites, naming two of the four colour primitives', () => {
    expect(shadows).toHaveLength(15);
    expect(new Set(shadows.map(colorOf))).toEqual(new Set(['shadowBlack100', 'shadowBlue100']));
  });

  it('web: each composite uses its colour token\'s custom property and no literal rgba', () => {
    for (const t of shadows) {
      const cssName = '--' + t.name.replace(/\./g, '-').replace(/([A-Z])/g, '-$1').toLowerCase();
      const line = web.split('\n').find(l => l.startsWith(`  ${cssName}:`));
      expect(line).toBeDefined();
      const colorProp = '--' + kebab(colorOf(t));
      expect(line!).toContain(`var(${colorProp})`);
      expect(line!).not.toMatch(/rgba?\(/);
    }
  });

  it('web: the three blue-tinted composites use --shadow-blue-100, not black', () => {
    const blue = shadows.filter(t => colorOf(t) === 'shadowBlue100');
    expect(blue.map(t => t.name).sort()).toEqual(['shadow.fab', 'shadow.sunrise', 'shadow.sunset']);
    for (const name of ['--shadow-fab', '--shadow-sunrise', '--shadow-sunset']) {
      const line = web.split('\n').find(l => l.startsWith(`  ${name}:`))!;
      expect(line).toContain('var(--shadow-blue-100)');
      expect(line).not.toContain('--shadow-black-100');
    }
  });

  it('web: the colour primitives the composites name are defined', () => {
    expect(web).toMatch(/^\s*--shadow-black-100: oklch\(0 0 0\);$/m);
    expect(web).toMatch(/^\s*--shadow-blue-100: oklch\(0\.2161 0\.0306 269\.6\);$/m);
  });

  it('iOS: every composite is a ShadowToken, none a Typography constructor', () => {
    const lines = ios.split('\n').filter(l => /static let shadow[A-Z]\w* = /.test(l) && !/: (CGFloat|Color)/.test(l));
    const composites = lines.filter(l => /= (ShadowToken|Typography)\(/.test(l));
    expect(composites).toHaveLength(15);
    expect(composites.every(l => /= ShadowToken\(offsetX: \w+, offsetY: \w+, blur: \w+, opacity: \w+, color: shadow(Black|Blue)100\)$/.test(l))).toBe(true);
    expect(ios).toMatch(/^public struct ShadowToken: Sendable \{$/m);
    expect(ios).toMatch(/static let shadowBlack100 = Color\(\.displayP3, /);
    expect(ios).toMatch(/static let shadowBlue100 = Color\(\.displayP3, /);
  });

  it('Android: every composite is a ShadowToken, none a Typography constructor', () => {
    const composites = android.split('\n').filter(l => /^\s+val shadow_\w+ = (ShadowToken|Typography)\(/.test(l));
    expect(composites).toHaveLength(15);
    expect(composites.every(l => /= ShadowToken\(offsetX = \w+, offsetY = \w+, blur = \w+, opacity = \w+, color = shadow_(black|blue)_100\)$/.test(l))).toBe(true);
    expect(android).toMatch(/^data class ShadowToken\($/m);
    expect(android).toMatch(/val shadow_black_100 = Color\(.*ColorSpaces\.DisplayP3\)/);
    expect(android).toMatch(/val shadow_blue_100 = Color\(.*ColorSpaces\.DisplayP3\)/);
  });

  it('the typography composites are untouched by the shadow type (still Typography until the type table lands)', () => {
    expect(ios.match(/= Typography\(/g)).toHaveLength(24);
    expect(android.match(/= Typography\(/g)).toHaveLength(24);
  });
});

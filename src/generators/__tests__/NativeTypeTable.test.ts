/**
 * @category evergreen
 * @purpose Verify the native type table, the font family, the import lists and the component
 *          references (Spec 129 Task 9.1; design §§ 5 and 7; Requirements 6.3, 6.4, 6.5, 5.9)
 *
 * One case per row of design § 5's table, per platform, on the generator's own output.
 */

import { TokenFileGenerator } from '../TokenFileGenerator';
import { ComponentTokenRegistry } from '../../registries/ComponentTokenRegistry';
import { getAllSemanticTokens } from '../../tokens/semantic';
import { resolveSemanticTokenValue } from '../../resolvers/SemanticValueResolver';
import { androidFontFamilyMember, iosFontFamilyName, parseFontStack } from '../native/FontFamilyStack';
import { computeKotlinImports } from '../native/KotlinImports';

const semantics = getAllSemanticTokens();
const options = {
  semanticTokens: semantics.map(t => resolveSemanticTokenValue(t, 'light', 'base')),
  darkSemanticTokens: semantics.map(t => resolveSemanticTokenValue(t, 'dark', 'base')),
};
const generator = new TokenFileGenerator();
const android = generator.generateAndroidTokens(options).content;
const ios = generator.generateiOSTokens(options).content;

/** The first line of `content` that declares `name`. */
const line = (content: string, name: string): string => {
  const found = content.split('\n').find(l => new RegExp(`\\b(val|let)\\s+${name}\\b`).test(l));
  if (!found) throw new Error(`no declaration of ${name}`);
  return found.trim();
};

describe('Android type table (design § 5)', () => {
  it('spacing, radius, tapArea, borderWidth, sizing: Dp', () => {
    expect(line(android, 'space_100')).toMatch(/^val space_100 = [\d.]+\.dp$/);
    expect(line(android, 'radius_100')).toMatch(/^val radius_100 = [\d.]+\.dp$/);
    expect(line(android, 'tap_area_minimum')).toMatch(/^val tap_area_minimum = [\d.]+\.dp$/);
    expect(line(android, 'border_width_100')).toMatch(/^val border_width_100 = [\d.]+\.dp$/);
    expect(line(android, 'size_150')).toBe('val size_150 = 12.dp');
  });

  it('fontSize: TextUnit in sp', () => {
    expect(line(android, 'font_size_100')).toBe('val font_size_100 = 16.sp');
  });

  it('lineHeight: Float ratio', () => {
    expect(line(android, 'line_height_100')).toBe('const val line_height_100: Float = 1.5f');
  });

  it('letterSpacing: TextUnit in em', () => {
    expect(line(android, 'letter_spacing_100')).toBe('val letter_spacing_100 = (0).em');
  });

  it('fontWeight: FontWeight', () => {
    expect(line(android, 'font_weight_400')).toBe('val font_weight_400 = FontWeight(400)');
  });

  it('radius_half: CornerSize(percent = 50)', () => {
    expect(line(android, 'radius_half')).toBe('val radius_half = CornerSize(percent = 50)');
  });

  it('fontFamily: FontFamily from the stack\'s generic family, no quotes in the file', () => {
    expect(line(android, 'font_family_body')).toMatch(/^val font_family_body = FontFamily\.SansSerif \/\/ Figtree,/);
    expect(line(android, 'font_family_mono')).toMatch(/^val font_family_mono = FontFamily\.Monospace /);
    expect(android).not.toMatch(/"-apple-system|""/);
  });

  it('typography composite: TextStyle with lineHeight in em', () => {
    expect(line(android, 'typography_body_md')).toBe(
      'val typography_body_md = TextStyle(fontSize = font_size_100, lineHeight = line_height_100.em, fontFamily = font_family_body, fontWeight = font_weight_400, letterSpacing = letter_spacing_100)',
    );
    expect(android).not.toContain('Typography(');
  });

  it('shadow composite: ShadowToken (unchanged by the table)', () => {
    expect(line(android, 'shadow_container')).toMatch(/= ShadowToken\(/);
  });

  it('color: Compose Color', () => {
    expect(line(android, 'pink_300')).toMatch(/= Color\(.*ColorSpaces\.DisplayP3\)$/);
  });
});

describe('iOS type table (design §§ 5, 7)', () => {
  it('spacing, radius, sizing, fontSize, lineHeight, letterSpacing: CGFloat', () => {
    for (const n of ['space100', 'radius100', 'size150', 'fontSize100', 'lineHeight100', 'letterSpacing100']) {
      expect(line(ios, n)).toMatch(new RegExp(`^public static let ${n}: CGFloat = `));
    }
  });

  it('fontWeight: Font.Weight', () => {
    expect(line(ios, 'fontWeight400')).toBe('public static let fontWeight400: Font.Weight = .regular');
    expect(line(ios, 'fontWeight700')).toBe('public static let fontWeight700: Font.Weight = .bold');
    expect(ios).not.toContain('UIFont.Weight');
  });

  it('radiusHalf: Circle()', () => {
    expect(line(ios, 'radiusHalf')).toBe('public static let radiusHalf = Circle()');
  });

  it('fontFamily: String?, the first entry unquoted, nil for a generic or system keyword', () => {
    expect(line(ios, 'fontFamilyBody')).toBe('public static let fontFamilyBody: String? = "Figtree"');
    expect(line(ios, 'fontFamilyMono')).toBe('public static let fontFamilyMono: String? = "Commit Mono"');
    expect(line(ios, 'fontFamilySystem')).toBe('public static let fontFamilySystem: String? = nil');
  });

  it('typography composite: TypographyToken, and the type carries a computed tracking in points', () => {
    expect(line(ios, 'typographyBodyMd')).toBe(
      'public static let typographyBodyMd = TypographyToken(fontSize: fontSize100, lineHeight: lineHeight100, fontFamily: fontFamilyBody, fontWeight: fontWeight400, letterSpacing: letterSpacing100)',
    );
    expect(ios).toMatch(/^public struct TypographyToken: Sendable \{$/m);
    expect(ios).toContain('public var tracking: CGFloat { letterSpacing * fontSize }');
    expect(ios).not.toMatch(/= Typography\(/);
  });

  it('color: SwiftUI Color', () => {
    expect(line(ios, 'pink300')).toMatch(/= Color\(\.displayP3, /);
  });
});

describe('font family stacks', () => {
  it('parses quoted entries with their commas and spaces', () => {
    expect(parseFontStack('"Commit Mono", "SF Mono", Monaco, monospace')).toEqual(['Commit Mono', 'SF Mono', 'Monaco', 'monospace']);
  });

  it('iOS: nil for sans-serif, system-ui, -apple-system and BlinkMacSystemFont as the first entry', () => {
    for (const k of ['sans-serif', 'system-ui', '-apple-system, Roboto', 'BlinkMacSystemFont, Arial']) {
      expect(iosFontFamilyName(k)).toBeNull();
    }
    expect(iosFontFamilyName('Inter, sans-serif')).toBe('Inter');
  });

  it('Android: the generic family, else Default', () => {
    expect(androidFontFamilyMember('Inter, sans-serif')).toBe('SansSerif');
    expect(androidFontFamilyMember('Georgia, serif')).toBe('Serif');
    expect(androidFontFamilyMember('Menlo, monospace')).toBe('Monospace');
    expect(androidFontFamilyMember('Inter')).toBe('Default');
  });
});

describe('Android import lists', () => {
  let componentContent = '';
  beforeAll(() => {
    ComponentTokenRegistry.clear();
    ComponentTokenRegistry.registerBatch('Probe', [
      { name: 'probe.inset.a', component: 'Probe', family: 'spacing', value: 12, primitiveReference: 'space150', reasoning: 'x' },
      { name: 'probe.text.b', component: 'Probe', family: 'fontSize', value: 14, reasoning: 'x' },
    ] as any);
    componentContent = new TokenFileGenerator().generateComponentTokens({ outputDir: '/unused' }).find(r => r.platform === 'android')!.content;
    ComponentTokenRegistry.clear();
  });

  /** Every `import` line comes before the first declaration (package line aside). */
  function importsPrecedeDeclarations(content: string): boolean {
    const lines = content.split('\n');
    const firstDecl = lines.findIndex(l => /^\s*(data class|object|class|val|const val|fun|private|public)\b/.test(l));
    const lastImport = lines.map((l, i) => (l.startsWith('import ') ? i : -1)).reduce((a, b) => Math.max(a, b), -1);
    return firstDecl === -1 || lastImport < firstDecl;
  }

  it('DesignTokens.android.kt: imports computed from the types it emits, all before the first declaration', () => {
    const imports = android.split('\n').filter(l => l.startsWith('import '));
    expect(imports).toEqual(computeKotlinImports(android).slice().sort());
    for (const needed of [
      'import androidx.compose.ui.unit.dp', 'import androidx.compose.ui.unit.sp', 'import androidx.compose.ui.unit.em',
      'import androidx.compose.ui.graphics.Color', 'import androidx.compose.ui.graphics.colorspace.ColorSpaces',
      'import androidx.compose.ui.text.TextStyle', 'import androidx.compose.ui.text.font.FontWeight',
      'import androidx.compose.ui.text.font.FontFamily', 'import androidx.compose.foundation.shape.CornerSize',
      'import androidx.compose.animation.core.CubicBezierEasing',
    ]) {
      expect(imports).toContain(needed);
    }
    expect(importsPrecedeDeclarations(android)).toBe(true);
    // The package line precedes the imports.
    expect(android.indexOf('package com.designerpunk.tokens')).toBeLessThan(android.indexOf('import '));
  });

  it('an import is present only when its symbol is used (no `sp` import for a file with no sp)', () => {
    expect(computeKotlinImports('package p\n\nobject X {\n    val a = 4.dp\n}\n')).toEqual(['import androidx.compose.ui.unit.dp']);
    expect(computeKotlinImports('package p\n\nobject X {\n    // 4.sp in a comment\n    val a = 1\n}\n')).toEqual([]);
  });

  it('ComponentTokens.android.kt: imports computed from the types it emits, all before the first declaration', () => {
    const imports = componentContent.split('\n').filter(l => l.startsWith('import '));
    expect(imports).toEqual(computeKotlinImports(componentContent).slice().sort());
    expect(imports.length).toBeGreaterThan(0);
    expect(imports).toContain('import androidx.compose.ui.unit.sp');
    expect(componentContent).toContain('val textB = 14.sp');
    expect(importsPrecedeDeclarations(componentContent)).toBe(true);
  });
});

describe('ComponentTokens refer to DesignTokens (design § 5; row 3)', () => {
  beforeEach(() => ComponentTokenRegistry.clear());
  afterAll(() => ComponentTokenRegistry.clear());

  it('iOS and Android reference the flat DesignTokens member, never a family type', () => {
    ComponentTokenRegistry.registerBatch('Probe', [
      { name: 'probe.inset.a', component: 'Probe', family: 'spacing', value: 12, primitiveReference: 'space150', reasoning: 'x' },
      { name: 'probe.size.b', component: 'Probe', family: 'sizing', value: 24, primitiveReference: 'size300', reasoning: 'x' },
      { name: 'probe.border.c', component: 'Probe', family: 'borderWidth', value: 1, primitiveReference: 'borderWidth100', reasoning: 'x' },
    ] as any);
    const results = new TokenFileGenerator().generateComponentTokens({ outputDir: '/unused' });
    const iosOut = results.find(r => r.platform === 'ios')!.content;
    const androidOut = results.find(r => r.platform === 'android')!.content;
    expect(iosOut).toContain('DesignTokens.space150');
    expect(iosOut).toContain('DesignTokens.size300');
    expect(iosOut).toContain('DesignTokens.borderWidth100');
    expect(androidOut).toContain('DesignTokens.space_150');
    expect(androidOut).toContain('DesignTokens.size_300');
    expect(androidOut).toContain('DesignTokens.border_width_100');
    for (const out of [iosOut, androidOut]) {
      expect(out).not.toMatch(/\b(Spacing|Sizing|BorderWidth)Tokens\b/);
    }
  });
});

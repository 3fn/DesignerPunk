/**
 * Native theme emission (Spec 129 Task 11; design § 4).
 *
 * One fixed binding (`DesignerPunkTheme`, `DPThemeKey`, `\.dpTheme`, `LocalDPTheme`), a holder of
 * instances named by the theme-instance rule, one value per (member, instance) resolved through
 * the same native colour path as the base output (design § 6), a family type and a provider.
 *
 * The rule (design § 4, "The theme-instance rule"): four fixed instances (`baseLight`,
 * `baseDark`, `wcagLight`, `wcagDark`), then one instance per mode each other registered theme
 * covers, named by the theme's words and a mode suffix. A theme of one mode shows base in the mode
 * it does not cover. Nothing here imports `scripts/harness/`: the shared module is an independent
 * copy, and `native-rules-emitter.test.ts` holds the two together.
 */

import { formatKotlinDisplayP3, formatSwiftDisplayP3, parseOklchText } from '../oklch/NativeColorUtils';
import { fromSrgbHex } from '../../color/OklchConverter';

/** A resolved semantic token as the generators receive it. */
export interface ResolvedColorToken {
  name: string;
  primitiveReferences?: Record<string, string>;
}

/** A registered theme other than `base`, `dark` and `wcag`. */
export interface EmitterTheme {
  name: string;
  mode: 'light' | 'dark' | 'both';
  /** Resolved tokens for the light mode (full set or overrides only; a missing token takes base light). */
  lightTokens: ReadonlyArray<ResolvedColorToken>;
  /** Resolved tokens for the dark mode (a missing token takes base dark). */
  darkTokens: ReadonlyArray<ResolvedColorToken>;
}

export interface ThemeEmitterInput {
  /** The consumer's `name` (`DesignerPunk` by default). */
  name: string;
  /** The consumer's `abbreviation` (`DP` by default). */
  abbreviation: string;
  /** Platform member name of each colour semantic, in member order: [semantic token name, native name]. */
  members: ReadonlyArray<{ token: string; swift: string; kotlin: string }>;
  baseLight: ReadonlyArray<ResolvedColorToken>;
  baseDark: ReadonlyArray<ResolvedColorToken>;
  wcagLight: ReadonlyArray<ResolvedColorToken>;
  wcagDark: ReadonlyArray<ResolvedColorToken>;
  /** Registered themes other than base, dark and wcag, in config order. Empty until U9. */
  themes: ReadonlyArray<EmitterTheme>;
}

type Platform = 'ios' | 'android';
type Scheme = 'light' | 'dark';

interface Instance {
  words: string[];
  scheme: Scheme;
  tokens: ReadonlyArray<ResolvedColorToken>;
  /** The map this instance is built from, for error messages. */
  label: string;
}

const upperFirst = (s: string): string => (s.length === 0 ? s : s[0].toUpperCase() + s.slice(1));
const lowerFirst = (s: string): string => (s.length === 0 ? s : s[0].toLowerCase() + s.slice(1));
const words = (name: string): string[] => name.split(/[-_]/);
const pascal = (w: readonly string[]): string => w.map(upperFirst).join('');
const lowerCamel = (w: readonly string[]): string => w.map((x, i) => (i === 0 ? lowerFirst(x) : upperFirst(x))).join('');
const suffix = (s: Scheme): string => (s === 'light' ? 'Light' : 'Dark');

/** Swift reserved words a family case can be (design § 4, "The theme family"). */
const SWIFT_RESERVED = new Set([
  'associatedtype', 'class', 'deinit', 'enum', 'extension', 'fileprivate', 'func', 'import', 'inout',
  'internal', 'let', 'operator', 'private', 'precedencegroup', 'protocol', 'public', 'rethrows', 'static',
  'struct', 'subscript', 'typealias', 'var', 'break', 'case', 'catch', 'continue', 'default', 'defer', 'do',
  'else', 'fallthrough', 'for', 'guard', 'if', 'in', 'repeat', 'return', 'throw', 'switch', 'where', 'while',
  'as', 'false', 'is', 'nil', 'super', 'throws', 'true', 'try',
]);

const pickOther = (themes: ReadonlyArray<EmitterTheme>): EmitterTheme[] =>
  themes.filter(t => t.name !== 'base' && t.name !== 'dark' && t.name !== 'wcag');

/** Every instance, in the rule's order: the four fixed, then each other theme's light before its dark. */
function buildInstances(input: ThemeEmitterInput): Instance[] {
  const out: Instance[] = [
    { words: ['base'], scheme: 'light', tokens: input.baseLight, label: 'baseLight' },
    { words: ['base'], scheme: 'dark', tokens: input.baseDark, label: 'baseDark' },
    { words: ['wcag'], scheme: 'light', tokens: input.wcagLight, label: 'wcagLight' },
    { words: ['wcag'], scheme: 'dark', tokens: input.wcagDark, label: 'wcagDark' },
  ];
  for (const t of pickOther(input.themes)) {
    if (t.mode === 'light' || t.mode === 'both') {
      out.push({ words: words(t.name), scheme: 'light', tokens: overlay(input.baseLight, t.lightTokens), label: `${t.name} light` });
    }
    if (t.mode === 'dark' || t.mode === 'both') {
      out.push({ words: words(t.name), scheme: 'dark', tokens: overlay(input.baseDark, t.darkTokens), label: `${t.name} dark` });
    }
  }
  return out;
}

/** The base context with a theme's tokens over it: a token the theme lacks takes the base value of the same mode. */
function overlay(base: ReadonlyArray<ResolvedColorToken>, over: ReadonlyArray<ResolvedColorToken>): ResolvedColorToken[] {
  const map = new Map(over.map(t => [t.name, t]));
  return base.map(b => map.get(b.name) ?? b);
}

/** A legacy `rgba(r, g, b, a)` value, read as sRGB and converted to OKLCH so it takes the same native colour path. */
function parseRgba(value: string): { l: number; c: number; h: number; alpha: number } | null {
  const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(value.trim());
  if (!m) return null;
  const hex = '#' + [m[1], m[2], m[3]].map(v => Number(v).toString(16).padStart(2, '0')).join('');
  const { l, c, h } = fromSrgbHex(hex);
  return { l, c, h, alpha: m[4] === undefined ? 1 : Number(m[4]) };
}

/** The resolved `oklch(…)` literal of a colour semantic; an unresolvable value stops generation, naming it. */
function resolvedOklch(tokens: ReadonlyArray<ResolvedColorToken>, token: string, label: string) {
  const t = tokens.find(x => x.name === token);
  const refs = t?.primitiveReferences;
  const value = refs?.value ?? refs?.default ?? (refs ? Object.values(refs)[0] : undefined);
  const parsed = typeof value === 'string' ? (parseOklchText(value) ?? parseRgba(value)) : null;
  if (!parsed) {
    throw new Error(`Theme emission: colour semantic '${token}' has no resolved OKLCH value in ${label} (found ${JSON.stringify(value)}).`);
  }
  return parsed;
}

const instanceName = (i: Instance, platform: Platform): string =>
  `${platform === 'ios' ? lowerCamel(i.words) : pascal(i.words)}${suffix(i.scheme)}`;

const swiftStruct = (name: string, i: Instance): string => `${name}${pascal(i.words)}${suffix(i.scheme)}Theme`;

/** The family cases, in order: base, wcag, then each other theme. */
function familyWords(input: ThemeEmitterInput): string[][] {
  return [['base'], ['wcag'], ...pickOther(input.themes).map(t => words(t.name))];
}

/** Which instance a family shows in a scheme (design § 4, "Selection" and the single-mode rule). */
function selected(input: ThemeEmitterInput, family: string[], scheme: Scheme): { words: string[]; scheme: Scheme } {
  const key = family.join('-');
  if (key === 'base' || key === 'wcag') return { words: family, scheme };
  const t = pickOther(input.themes).find(x => words(x.name).join('-') === key)!;
  const covered = t.mode === 'both' || t.mode === scheme;
  return covered ? { words: family, scheme } : { words: ['base'], scheme };
}

function familyComment(input: ThemeEmitterInput, family: string[], platform: Platform): string {
  const pick = (s: Scheme) => {
    const sel = selected(input, family, s);
    return instanceName({ ...sel, tokens: [], label: '' }, platform);
  };
  const light = pick('light');
  const dark = pick('dark');
  const key = family.join('-');
  const t = pickOther(input.themes).find(x => words(x.name).join('-') === key);
  const note = t && t.mode !== 'both'
    ? ` (no ${t.mode === 'light' ? 'dark' : 'light'} overrides; falls back to base)`
    : '';
  return `light: ${light} · dark: ${dark}${note}`;
}

/** Swift theme block: protocol, structs, holder, implicit members, key, environment value, family, provider. */
export function emitSwiftThemes(input: ThemeEmitterInput): string[] {
  const { name, abbreviation, members } = input;
  const inst = buildInstances(input);
  const lines: string[] = [];
  lines.push('');
  lines.push(`// MARK: - ${name} Theme System`);
  lines.push('');
  lines.push('public protocol DesignerPunkTheme: Sendable {');
  for (const m of members) lines.push(`    var ${m.swift}: Color { get }`);
  lines.push('}');

  for (const i of inst) {
    lines.push('');
    lines.push(`public struct ${swiftStruct(name, i)}: DesignerPunkTheme, Equatable {`);
    for (const m of members) {
      const c = resolvedOklch(i.tokens, m.token, i.label);
      lines.push(`    public let ${m.swift}: Color = ${formatSwiftDisplayP3(c.l, c.c, c.h, c.alpha)}`);
    }
    lines.push('    public init() {}');
    lines.push('}');
  }

  lines.push('');
  lines.push(`public enum ${name}Themes {`);
  for (const i of inst) {
    lines.push(`    public static let ${instanceName(i, 'ios')}: any DesignerPunkTheme = ${swiftStruct(name, i)}()`);
  }
  lines.push('}');

  const abbr = abbreviation.toLowerCase();
  for (const i of inst) {
    const s = swiftStruct(name, i);
    lines.push('');
    lines.push(`public extension DesignerPunkTheme where Self == ${s} {`);
    lines.push(`    static var ${abbr}${pascal(i.words)}${suffix(i.scheme)}: ${s} { ${s}() }`);
    lines.push('}');
  }

  lines.push('');
  lines.push('public struct DPThemeKey: EnvironmentKey {');
  lines.push(`    public static let defaultValue: any DesignerPunkTheme = ${swiftStruct(name, inst[0])}()`);
  lines.push('}');
  lines.push('');
  lines.push('public extension EnvironmentValues {');
  lines.push('    var dpTheme: any DesignerPunkTheme {');
  lines.push('        get { self[DPThemeKey.self] }');
  lines.push('        set { self[DPThemeKey.self] = newValue }');
  lines.push('    }');
  lines.push('}');

  const fam = familyWords(input);
  lines.push('');
  lines.push(`public enum ${name}ThemeFamily: Sendable, Hashable, CaseIterable {`);
  for (const f of fam) {
    const c = lowerCamel(f);
    lines.push(`    /// ${familyComment(input, f, 'ios')}`);
    lines.push(`    case ${SWIFT_RESERVED.has(c) ? `\`${c}\`` : c}`);
  }
  lines.push('}');

  lines.push('');
  lines.push(`private struct ${name}ThemeModifier: ViewModifier {`);
  lines.push(`    let family: ${name}ThemeFamily`);
  lines.push('    @Environment(\\.colorScheme) private var colorScheme');
  lines.push('');
  lines.push('    func body(content: Content) -> some View {');
  lines.push('        content.environment(\\.dpTheme, theme)');
  lines.push('    }');
  lines.push('');
  lines.push('    private var theme: any DesignerPunkTheme {');
  lines.push('        let dark = colorScheme == .dark');
  lines.push('        switch family {');
  for (const f of fam) {
    const c = lowerCamel(f);
    const l = instanceName({ ...selected(input, f, 'light'), tokens: [], label: '' }, 'ios');
    const d = instanceName({ ...selected(input, f, 'dark'), tokens: [], label: '' }, 'ios');
    lines.push(`        case .${SWIFT_RESERVED.has(c) ? `\`${c}\`` : c}: return dark ? ${name}Themes.${d} : ${name}Themes.${l}`);
  }
  lines.push('        }');
  lines.push('    }');
  lines.push('}');
  lines.push('');
  lines.push('public extension View {');
  lines.push(`    func ${lowerFirst(name)}Theme(_ family: ${name}ThemeFamily = .base) -> some View {`);
  lines.push(`        modifier(${name}ThemeModifier(family: family))`);
  lines.push('    }');
  lines.push('}');
  return lines;
}

/** Kotlin theme block: data class, holder, local, family, provider. No import lines: the file's one import list is computed. */
export function emitKotlinThemes(input: ThemeEmitterInput): string[] {
  const { name, members } = input;
  const inst = buildInstances(input);
  const lines: string[] = [];
  lines.push('');
  lines.push(`// ${name} Theme System`);
  lines.push('');
  lines.push('data class DesignerPunkTheme(');
  members.forEach((m, k) => lines.push(`    val ${m.kotlin}: Color${k < members.length - 1 ? ',' : ''}`));
  lines.push(')');
  lines.push('');
  lines.push(`object ${name}Themes {`);
  for (const i of inst) {
    lines.push(`    val ${instanceName(i, 'android')} = DesignerPunkTheme(`);
    members.forEach((m, k) => {
      const c = resolvedOklch(i.tokens, m.token, i.label);
      lines.push(`        ${m.kotlin} = ${formatKotlinDisplayP3(c.l, c.c, c.h, c.alpha)}${k < members.length - 1 ? ',' : ''}`);
    });
    lines.push('    )');
  }
  lines.push('}');
  lines.push('');
  lines.push(`val LocalDPTheme = staticCompositionLocalOf { ${name}Themes.BaseLight }`);

  const fam = familyWords(input);
  lines.push('');
  lines.push(`enum class ${name}ThemeFamily {`);
  fam.forEach((f, k) => {
    lines.push(`    /** ${familyComment(input, f, 'android')} */`);
    lines.push(`    ${pascal(f)}${k < fam.length - 1 ? ',' : ''}`);
  });
  lines.push('}');
  lines.push('');
  lines.push('@Composable');
  lines.push(`fun ${name}Theme(`);
  lines.push(`    family: ${name}ThemeFamily = ${name}ThemeFamily.Base,`);
  lines.push('    darkTheme: Boolean = isSystemInDarkTheme(),');
  lines.push('    content: @Composable () -> Unit');
  lines.push(') {');
  lines.push('    val theme = when (family) {');
  for (const f of fam) {
    const l = instanceName({ ...selected(input, f, 'light'), tokens: [], label: '' }, 'android');
    const d = instanceName({ ...selected(input, f, 'dark'), tokens: [], label: '' }, 'android');
    lines.push(`        ${name}ThemeFamily.${pascal(f)} -> if (darkTheme) ${name}Themes.${d} else ${name}Themes.${l}`);
  }
  lines.push('    }');
  lines.push('    CompositionLocalProvider(LocalDPTheme provides theme, content = content)');
  lines.push('}');
  return lines;
}

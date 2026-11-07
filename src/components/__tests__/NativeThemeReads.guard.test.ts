/**
 * @category temporary
 * @purpose Guard (two-sided): every component `theme.<member>` read in a native source names a member the generated Swift or Kotlin theme declares, and no native component reads a semantic colour from `DesignTokens`
 * @retirementCriteria The compile harness contexts `harness-ios-components` and `harness-android-components` are both required checks (Spec 129 Req 4.4; the harness then sees what this text check sees, and more)
 *
 * Native theme reads (Spec 129 Task 12.1; Req 4.4; design § 13)
 *
 * The generated theme (`ThemeEmitter`) declares the members a component may read as `theme.<member>`:
 * `var <member>: Color { get }` on the Swift protocol `DesignerPunkTheme`, and `val <member>: Color` on
 * the Kotlin data class of the same name. A component that reads a member the theme does not declare
 * does not compile. This guard builds the theme from DesignerPunk's real token definitions (the same
 * four contexts `generate` builds), then checks every `platforms/ios/*.swift` and
 * `platforms/android/*.kt` under src/components/core:
 *
 *   - side one, undeclared `theme.<member>`: the member is not in the declared set;
 *   - side two, `DesignTokens.<semantic colour>`: a read of a theme member through `DesignTokens`
 *     (Q13 (a): a colour resolves through the theme, not through the static token file).
 *
 * Both sides are checked against a pinned list that only shrinks: a violation not on the list fails,
 * and an entry on the list that no longer occurs fails too (so a fix has to remove its entry). The
 * list holds neither of the two reads Task 11.5 re-pointed (Q13 (a), Req 4.10).
 *
 * WHAT IT DOES NOT SEE (only the harness accepts these): reads with a malformed prefix
 * (`ProgressBarTokens.theme.…`, Kotlin `ProgressBarTokenstheme.…`); Button-CTA's bare reads; a
 * `theme` that is not in scope where it is read (a name guard cannot see scope; the compile can);
 * anything dynamic. It is a text check, not a compiler.
 *
 * Records: .kiro/issues/2026-09-26-native-component-theme-hardcoding.md; Spec 129 design § 13.
 * Does not import scripts/harness/ (Ada, post-MIDPOINT consult): the declared set comes from the
 * generator the consumer runs. TEMPORARY: retire per @retirementCriteria above.
 */

import * as fs from 'fs';
import * as path from 'path';
import { TokenFileGenerator } from '../../generators/TokenFileGenerator';
import { realThemeContexts } from '../../generators/__tests__/helpers/realThemeContexts';

const CORE = path.resolve(__dirname, '..', 'core');

/**
 * The pinned list: `<path relative to src/components/core> | <kind> | <member>`, kind `undeclared`
 * (side one) or `designtokens` (side two). Only shrinks. Empty at Task 12: no component reads an
 * undeclared member, and neither re-pointed `DesignTokens` read is here.
 */
export const PINNED: readonly string[] = [];

export interface Violation {
  kind: 'undeclared' | 'designtokens';
  member: string;
  line: number;
}

/** Code part of a line: comment-only lines and trailing `//` comments removed. */
function codeOf(line: string): string {
  const t = line.trim();
  if (t.startsWith('//') || t.startsWith('/*') || t.startsWith('*')) return '';
  const cut = line.search(/(^|\s)\/\//);
  return cut === -1 ? line : line.slice(0, cut);
}

/** Violations in one source's text, against the declared member set. Pure, so it can be bitten. */
export function findViolations(source: string, declared: ReadonlySet<string>): Violation[] {
  const out: Violation[] = [];
  source.split('\n').forEach((raw, i) => {
    const code = codeOf(raw).replace(/\/\*.*?\*\//g, '');
    // The lookbehind leaves out a prefixed read (`ProgressBarTokens.theme.x`): the guard cannot see it.
    for (const m of code.matchAll(/(?<![\w.])theme\.(\w+)/g)) {
      if (!declared.has(m[1])) out.push({ kind: 'undeclared', member: m[1], line: i + 1 });
    }
    for (const m of code.matchAll(/\bDesignTokens\.(\w+)/g)) {
      if (declared.has(m[1])) out.push({ kind: 'designtokens', member: m[1], line: i + 1 });
    }
  });
  return out;
}

function declaredMembers(platform: 'ios' | 'android'): Set<string> {
  const contexts = realThemeContexts();
  const text = new TokenFileGenerator()
    .generateNativeThemes(platform, { ...contexts, productName: 'DesignerPunk', abbreviation: 'DP', themeOverrides: [] })
    .join('\n');
  const re = platform === 'ios' ? /^ {4}var (\w+): Color \{ get \}$/gm : /^ {4}val (\w+): Color,?$/gm;
  return new Set([...text.matchAll(re)].map(m => m[1]));
}

function nativeSources(platform: 'ios' | 'android'): string[] {
  const ext = platform === 'ios' ? '.swift' : '.kt';
  const out: string[] = [];
  for (const comp of fs.readdirSync(CORE, { withFileTypes: true })) {
    if (!comp.isDirectory()) continue;
    const dir = path.join(CORE, comp.name, 'platforms', platform);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      if (f.isFile() && f.name.endsWith(ext)) out.push(path.join(dir, f.name));
    }
  }
  return out;
}

function scan(platform: 'ios' | 'android'): string[] {
  const declared = declaredMembers(platform);
  const found: string[] = [];
  for (const file of nativeSources(platform)) {
    const rel = path.relative(CORE, file).split(path.sep).join('/');
    for (const v of findViolations(fs.readFileSync(file, 'utf8'), declared)) {
      found.push(`${rel} | ${v.kind} | ${v.member}`);
    }
  }
  return [...new Set(found)].sort();
}

describe('the declared set is the generator\'s', () => {
  it.each(['ios', 'android'] as const)('%s: the theme declares colour members', platform => {
    const declared = declaredMembers(platform);
    expect(declared.size).toBeGreaterThan(40);
    expect(declared.has(platform === 'ios' ? 'colorStructureSurface' : 'color_structure_surface')).toBe(true);
  });
});

describe('the scan reads the real sources', () => {
  it.each(['ios', 'android'] as const)('%s: finds theme reads to check (about 173 static reads in all)', platform => {
    const n = nativeSources(platform)
      .map(f => [...fs.readFileSync(f, 'utf8').split('\n').map(codeOf).join('\n').matchAll(/(?<![\w.])theme\.\w+/g)].length)
      .reduce((a, b) => a + b, 0);
    expect(n).toBeGreaterThan(40);
  });
});

describe('side one and side two against the real sources', () => {
  const pinned = new Set(PINNED);
  const found = [...scan('ios'), ...scan('android')];

  it('no violation is off the pinned list', () => {
    expect(found.filter(f => !pinned.has(f))).toEqual([]);
  });

  it('no pinned entry is stale: a fix removes its entry', () => {
    expect(PINNED.filter(p => !found.includes(p))).toEqual([]);
  });

  it('the pinned list holds neither re-pointed DesignTokens read', () => {
    expect(PINNED.filter(p => p.includes('| designtokens |'))).toEqual([]);
  });
});

describe('the bite: a planted read in each direction', () => {
  const swift = new Set(['colorTextDefault']);
  const kotlin = new Set(['color_text_default']);

  it('flags an undeclared theme read, Swift and Kotlin', () => {
    expect(findViolations('let c = theme.colorNotThere', swift)).toEqual([{ kind: 'undeclared', member: 'colorNotThere', line: 1 }]);
    expect(findViolations('val c = theme.color_not_there', kotlin)).toEqual([{ kind: 'undeclared', member: 'color_not_there', line: 1 }]);
  });

  it('flags a semantic colour read through DesignTokens, Swift and Kotlin', () => {
    expect(findViolations('let c = DesignTokens.colorTextDefault', swift)).toEqual([{ kind: 'designtokens', member: 'colorTextDefault', line: 1 }]);
    expect(findViolations('val c = DesignTokens.color_text_default', kotlin)).toEqual([{ kind: 'designtokens', member: 'color_text_default', line: 1 }]);
  });

  it('passes a declared theme read, a non-colour DesignTokens read, a comment and a prefixed read', () => {
    expect(findViolations('let c = theme.colorTextDefault', swift)).toEqual([]);
    expect(findViolations('let s = DesignTokens.space100', swift)).toEqual([]);
    expect(findViolations('// theme.colorNotThere', swift)).toEqual([]);
    expect(findViolations('let c = ProgressBarTokens.theme.colorNotThere', swift)).toEqual([]);
  });
});

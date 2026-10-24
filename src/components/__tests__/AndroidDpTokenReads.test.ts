/**
 * @category temporary
 * @purpose Guard: no Android component calls `.dp` on a token the generator already emits as Dp, and fontSize reads agree with the type the generator emits
 * @retirementCriteria The platform build-verification harness (Spec 129) gates Android compilation, and the Android fontSize type is settled and its component sites fixed (Spec 129 design round, Ada's decision)
 *
 * Android Dp-typed token reads (interim guard; sibling of AndroidSizingDpReads)
 *
 * The Android generator emits spacing, radius, tapArea and borderWidth tokens
 * (and the semantic tokens that alias them: `border_default`,
 * `space_grouped_*`, `icon_size_*`, `tap_area_*`) as `Dp`
 * (`val border_width_100 = 1.dp`). `.dp` is an extension on Int, Float and
 * Double, not on Dp, so `DesignTokens.border_default.dp` does not compile.
 * Component-local objects such as `NavTabBarTokens` re-export those tokens
 * (`val minTapWidth = DesignTokens.tap_area_minimum`); `.dp` on such a member
 * is the same defect.
 *
 * Two rules, each read from the generator's ACTUAL output and two-sided:
 *
 *   1. Dp families (borderWidth, spacing, tapArea, radius). Emitted as Dp
 *      (today): no direct read and no derived-member use is followed by `.dp`.
 *      Emitted as Float: every direct read and member use must be followed by
 *      `.dp` (the rule flips).
 *   2. fontSize. Emitted as Dp (today): `.sp`/`.dp` after a `font_size_*`
 *      read is wrong, but 12 such lines in 5 files are KNOWN-OPEN, pinned
 *      below to the file and count: they wait on Spec 129's fontSize type
 *      decision (record `2026-10-24-android-component-unit-type-mismatches.md`
 *      groups B and C). The pin is two-sided: fixing one, or adding one,
 *      fails until the pin is updated. Emitted as Float: `.sp` and `.dp` after
 *      `font_size_*` are valid and the pin must be emptied. Any other shape
 *      fails until this guard is taught it.
 *
 * What it does NOT prove: that any Android file compiles. It is a text check
 * for one defect class (a unit-extension on the wrong generated type). It
 * cannot see group C (a Dp fontSize passed bare into a Float or TextUnit
 * position), which needs the type of the receiving parameter. Only a build
 * (the platform build-verification harness, Spec 129's first task) proves
 * Android compiles.
 *
 * Record: .kiro/issues/2026-10-24-android-component-unit-type-mismatches.md
 * TEMPORARY: retire per @retirementCriteria above.
 */

import * as fs from 'fs';
import * as path from 'path';
import { AndroidFormatGenerator } from '../../providers/AndroidFormatGenerator';
import { borderWidthTokens } from '../../tokens/BorderWidthTokens';
import { spacingTokens } from '../../tokens/SpacingTokens';
import { tapAreaTokens } from '../../tokens/TapAreaTokens';
import { radiusTokens } from '../../tokens/RadiusTokens';
import { fontSizeTokens } from '../../tokens/FontSizeTokens';

const COMPONENTS_ROOT = path.resolve(__dirname, '..');

/** Known-open fontSize `.sp`/`.dp` lines (group B), pinned by file. Retire with the fontSize decision. */
const PINNED_FONT_SIZE_UNIT_LINES: Record<string, number> = {
  'core/Badge-Count-Base/platforms/android/BadgeCountBase.android.kt': 3,
  'core/Badge-Count-Notification/platforms/android/BadgeCountNotification.android.kt': 3,
  'core/Chip-Base/platforms/android/ChipBase.android.kt': 2,
  'core/Chip-Filter/platforms/android/ChipFilter.android.kt': 2,
  'core/Chip-Input/platforms/android/ChipInput.android.kt': 2,
};

type Shape = 'Dp' | 'Float' | 'other';

function emittedShape(token: Parameters<AndroidFormatGenerator['formatToken']>[0]): { shape: Shape; emitted: string } {
  const emitted = new AndroidFormatGenerator('kotlin').formatToken(token).trim();
  if (/^val \w+ = -?[\d.]+\.dp$/.test(emitted)) return { shape: 'Dp', emitted };
  if (/^const val \w+: Float = /.test(emitted)) return { shape: 'Float', emitted };
  return { shape: 'other', emitted };
}

const DP_FAMILY_PROBES: Record<string, ReturnType<typeof emittedShape>> = {
  borderWidth: emittedShape(borderWidthTokens.borderWidth100),
  spacing: emittedShape(spacingTokens.space100),
  tapArea: emittedShape(tapAreaTokens.tapAreaMinimum),
  radius: emittedShape(radiusTokens.radius100),
};
const FONT_SIZE_PROBE = emittedShape(fontSizeTokens.fontSize100);

/** Direct reads of a token in the Dp families (semantic aliases included). */
const DP_FAMILY_NAME = '(?:border_default|border_emphasis|border_width_\\d+|space_\\w+|tap_area_\\w+|radius_\\w+|icon_size_\\d+)';

export function codeOf(line: string): string {
  const t = line.trim();
  if (t.startsWith('//') || t.startsWith('/*') || t.startsWith('*')) return '';
  const cut = line.search(/(^|\s)\/\//);
  return cut === -1 ? line : line.slice(0, cut);
}

export interface DpRead {
  line: number;
  what: string;
  hasDp: boolean;
  text: string;
}

/** Direct `DesignTokens.<dp family>` reads and `<Object>.<member>` uses, with whether `.dp` follows. */
export function dpFamilyReads(source: string): DpRead[] {
  const lines = source.split('\n');
  const reads: DpRead[] = [];

  // Members of component token objects that re-export a Dp-family token.
  const members: Array<{ obj: string; member: string }> = [];
  let obj: string | null = null;
  lines.forEach((raw) => {
    const code = codeOf(raw);
    const o = /^\s*(?:private\s+|internal\s+)?object\s+(\w+)/.exec(code);
    if (o) obj = o[1];
    else if (/^}/.test(code)) obj = null;
    const m = new RegExp(`^\\s*val\\s+(\\w+)\\s*=\\s*DesignTokens\\.${DP_FAMILY_NAME}\\s*$`).exec(code);
    if (obj && m) members.push({ obj, member: m[1] });
  });

  lines.forEach((raw, i) => {
    const code = codeOf(raw);
    if (!code) return;
    const isDeclaration = new RegExp(`^\\s*val\\s+\\w+\\s*=\\s*DesignTokens\\.${DP_FAMILY_NAME}\\s*$`).test(code);
    let m: RegExpExecArray | null;
    if (!isDeclaration) {
      const direct = new RegExp(`DesignTokens\\.(${DP_FAMILY_NAME})\\b(\\.dp\\b)?`, 'g');
      while ((m = direct.exec(code)) !== null) {
        reads.push({ line: i + 1, what: `DesignTokens.${m[1]}`, hasDp: Boolean(m[2]), text: raw.trim() });
      }
    }
    for (const { obj: o, member } of members) {
      const use = new RegExp(`\\b${o}\\.${member}\\b`, 'g');
      while ((m = use.exec(code)) !== null) {
        const after = code.slice(m.index + m[0].length);
        // `.dp` directly after, or after the `)` closing an if/else group whose first branch this is.
        const hasDp = /^\s*\)?\s*\.dp\b/.test(after) || (/^\s+else\s/.test(after) && /\)\s*\.dp\b/.test(after));
        reads.push({ line: i + 1, what: `${o}.${member}`, hasDp, text: raw.trim() });
      }
    }
  });
  return reads;
}

/** Code lines where `.sp` or `.dp` follows a `font_size_*` read on the same expression. */
export function fontSizeUnitLines(source: string): Array<{ line: number; text: string }> {
  const out: Array<{ line: number; text: string }> = [];
  source.split('\n').forEach((raw, i) => {
    if (/DesignTokens\.font_size_\d+\b[^,\n]*?\.(sp|dp)\b/.test(codeOf(raw))) {
      out.push({ line: i + 1, text: raw.trim() });
    }
  });
  return out;
}

function findAndroidSources(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '__tests__') continue;
      findAndroidSources(full, out);
    } else if (
      entry.name.endsWith('.kt') &&
      full.split(path.sep).join('/').includes('/platforms/android/')
    ) {
      out.push(full);
    }
  }
  return out;
}

describe('Android Dp-typed token reads agree with the generated type', () => {
  const files = findAndroidSources(COMPONENTS_ROOT).sort();
  const rel = (f: string) => path.relative(COMPONENTS_ROOT, f).split(path.sep).join('/');

  it('recognises the shape the generator emits for each Dp family and for fontSize', () => {
    for (const [family, p] of Object.entries(DP_FAMILY_PROBES)) {
      if (p.shape === 'other') {
        throw new Error(`AndroidFormatGenerator emitted an unrecognised ${family} shape:\n  ${p.emitted}\nTeach this guard the new shape before trusting it.`);
      }
    }
    if (FONT_SIZE_PROBE.shape === 'other') {
      throw new Error(`AndroidFormatGenerator emitted an unrecognised fontSize shape:\n  ${FONT_SIZE_PROBE.emitted}\nTeach this guard the new shape (e.g. TextUnit) before trusting it.`);
    }
  });

  it('scans the Android sources (not vacuous)', () => {
    const names = files.map(rel);
    expect(names).toContain('core/Nav-TabBar-Base/platforms/android/NavTabBarBase.android.kt');
    const total = files.reduce((n, f) => n + dpFamilyReads(fs.readFileSync(f, 'utf-8')).length, 0);
    expect(total).toBeGreaterThan(0);
    // Negative control: a Float-typed member (sizing) is not a Dp-family member.
    const tab = fs.readFileSync(path.join(COMPONENTS_ROOT, 'core/Nav-TabBar-Base/platforms/android/NavTabBarBase.android.kt'), 'utf-8');
    const whats = dpFamilyReads(tab).map((r) => r.what);
    expect(whats).toContain('NavTabBarTokens.minTapWidth');
    expect(whats).not.toContain('NavTabBarTokens.dotSize');
  });

  it('Dp-family reads: .dp is absent when the generator emits Dp, present when it emits Float', () => {
    const violations: string[] = [];
    // Family shapes agree today; if they diverge, the per-read family is not known textually, so refuse.
    const shapes = new Set(Object.values(DP_FAMILY_PROBES).map((p) => p.shape));
    if (shapes.size !== 1) {
      throw new Error(`Dp families now emit mixed shapes (${[...shapes].join(', ')}); split the family rule per prefix in this guard.`);
    }
    const shape = [...shapes][0];
    for (const file of files) {
      for (const r of dpFamilyReads(fs.readFileSync(file, 'utf-8'))) {
        if (shape === 'Dp' && r.hasDp) {
          violations.push(`${rel(file)}:${r.line} calls .dp on ${r.what}, already Dp (remove .dp)\n    ${r.text}`);
        }
        if (shape === 'Float' && !r.hasDp) {
          violations.push(`${rel(file)}:${r.line} reads ${r.what} (Float) without .dp\n    ${r.text}`);
        }
      }
    }
    if (violations.length > 0) {
      throw new Error(
        `Generator emits the Dp families as ${shape}. ${violations.length} Android read(s) disagree:\n\n` +
          violations.join('\n') +
          '\n\nRecord: .kiro/issues/2026-10-24-android-component-unit-type-mismatches.md (group A).'
      );
    }
  });

  it('fontSize reads: known-open .sp/.dp lines are exactly the pinned set while fontSize is Dp', () => {
    const actual: Record<string, number> = {};
    for (const file of files) {
      const n = fontSizeUnitLines(fs.readFileSync(file, 'utf-8')).length;
      if (n > 0) actual[rel(file)] = n;
    }
    if (FONT_SIZE_PROBE.shape === 'Dp') {
      // Dp.sp / Dp.dp do not compile; these are the pinned, known-open sites (groups B and C wait on Spec 129).
      expect(actual).toEqual(PINNED_FONT_SIZE_UNIT_LINES);
    } else {
      // Float: `.sp` / `.dp` after a Float fontSize are valid; the pin is stale and must be emptied.
      expect(Object.keys(PINNED_FONT_SIZE_UNIT_LINES)).toEqual([]);
    }
  });
});

describe('detector self-test (fixtures)', () => {
  it('finds direct reads with and without .dp, and skips comments', () => {
    const src = [
      '    borderWidth = DesignTokens.border_default,',
      '    borderWidth = DesignTokens.border_emphasis.dp,',
      '    // x = DesignTokens.space_200.dp',
      '    h = DesignTokens.size_700.dp,',
    ].join('\n');
    expect(dpFamilyReads(src).map((r) => [r.line, r.what, r.hasDp])).toEqual([
      [1, 'DesignTokens.border_default', false],
      [2, 'DesignTokens.border_emphasis', true],
    ]);
  });

  it('follows a Dp member of a token object, including the if/else form, and ignores a Float member', () => {
    const src = [
      'object T {',
      '    val a = DesignTokens.space_150',
      '    val b = DesignTokens.space_075',
      '    val f = DesignTokens.size_050',
      '}',
      'x = T.a.dp',
      'y = (if (s) T.a else T.b).dp',
      'z = T.a',
      'w = T.f.dp',
    ].join('\n');
    expect(dpFamilyReads(src).map((r) => [r.line, r.what, r.hasDp])).toEqual([
      [6, 'T.a', true],
      [7, 'T.a', true],
      [7, 'T.b', true],
      [8, 'T.a', false],
    ]);
  });

  it('finds .sp/.dp after a fontSize read', () => {
    const src = [
      '    fontSize = DesignTokens.font_size_075.sp,  // x',
      '    minWidth = (DesignTokens.font_size_050 * DesignTokens.line_height_050).dp,',
      '    fontSize = DesignTokens.font_size_075,',
      '    // fontSize = DesignTokens.font_size_075.sp',
    ].join('\n');
    expect(fontSizeUnitLines(src).map((l) => l.line)).toEqual([1, 2]);
  });
});

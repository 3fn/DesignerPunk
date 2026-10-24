/**
 * @category temporary
 * @purpose Guard: every Android sizing-primitive read agrees with the type the generator emits
 * @retirementCriteria The Android generator emits sizing as Dp, the interim .dp sites are removed (this guard enforces that), and the platform build-verification harness (Spec 129) gates Android compilation
 *
 * Android Sizing Reads: Float primitive -> Dp at the read (interim guard)
 *
 * The Android generator emits sizing primitives as `Float`
 * (`const val size_700: Float = 56f`; `AndroidFormatGenerator.getKotlinType`
 * has no `sizing` case), while spacing and radius are `Dp`
 * (`val space_200 = 16.dp`). Kotlin has no implicit Float -> Dp conversion,
 * so a component that passes `DesignTokens.size_*` to a `Dp` parameter does
 * not compile unless it converts with `.dp` at the read.
 *
 * This guard reads the generator's ACTUAL sizing output, then checks every
 * `platforms/android/*.kt` file under src/components against it:
 *
 *   - sizing emitted as Float (today): every `DesignTokens.size_N` read is
 *     followed by `.dp`, or reaches a Dp only through a listed Float carrier
 *     whose every use is followed by `.dp`.
 *   - sizing emitted as Dp (the class fix, Spec 129 intake): no read and no
 *     carrier use is followed by `.dp` (`Dp.dp` does not exist), so the class
 *     fix cannot land without removing the interim `.dp` sites in the same PR.
 *
 * What it does NOT prove: that any Android file compiles. It is a text
 * check, not a Kotlin compiler; it reads one defect class (sizing type at
 * the read) and nothing else. Only a build (the platform build-verification
 * harness, Spec 129's first task) proves Android compiles.
 *
 * Record: .kiro/issues/archive/2026-10-23-component-token-usage-findings-from-drift-pass.md
 * items 5 and 7. TEMPORARY: retire per @retirementCriteria above.
 */

import * as fs from 'fs';
import * as path from 'path';
import { AndroidFormatGenerator } from '../../providers/AndroidFormatGenerator';
import { sizingTokens } from '../../tokens/SizingTokens';

const COMPONENTS_ROOT = path.resolve(__dirname, '..');

/**
 * Float carriers: places where a sizing primitive is read WITHOUT `.dp`
 * into a component-local value that stays Float, and is converted with
 * `.dp` where it is used. `member` matches how the Float leaves its token
 * object; `locals` names any local that holds it. Every code line matching
 * `member` must either be `val <local> = …` for a listed local, or carry
 * `.dp` after the match; every use of a listed local must carry `.dp`
 * after it.
 */
interface FloatCarrier {
  file: string; // relative to src/components
  tokens: string[]; // the size_N names read bare into the carrier
  member: RegExp;
  locals: string[];
}

const FLOAT_CARRIERS: FloatCarrier[] = [
  {
    file: 'core/Nav-TabBar-Base/platforms/android/NavTabBarBase.android.kt',
    tokens: ['size_050'],
    member: /NavTabBarTokens\.dotSize\b/,
    locals: [],
  },
  {
    file: 'core/Progress-Bar-Base/platforms/android/ProgressBarBase.android.kt',
    tokens: ['size_050', 'size_100', 'size_150'],
    member: /ProgressBarTokens\.height\(/,
    locals: ['barHeight'],
  },
];

type SizingShape = 'Float' | 'Dp';

function emittedSizingShape(): { shape: SizingShape | null; emitted: string } {
  const emitted = new AndroidFormatGenerator('kotlin').formatToken(sizingTokens.size700).trim();
  if (/^const val size_700: Float = 56f$/.test(emitted)) return { shape: 'Float', emitted };
  if (/^val size_700 = 56(\.0)?\.dp$/.test(emitted)) return { shape: 'Dp', emitted };
  return { shape: null, emitted };
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

/** Code part of a line: comment-only lines and trailing `//` comments removed. */
export function codeOf(line: string): string {
  const t = line.trim();
  if (t.startsWith('//') || t.startsWith('/*') || t.startsWith('*')) return '';
  const cut = line.search(/(^|\s)\/\//);
  return cut === -1 ? line : line.slice(0, cut);
}

export interface SizingRead {
  line: number;
  token: string;
  hasDp: boolean;
  text: string;
}

export function sizingReads(source: string): SizingRead[] {
  const reads: SizingRead[] = [];
  source.split('\n').forEach((raw, i) => {
    const code = codeOf(raw);
    const re = /DesignTokens\.(size_\d+)\b(\.dp\b)?/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(code)) !== null) {
      reads.push({ line: i + 1, token: m[1], hasDp: Boolean(m[2]), text: raw.trim() });
    }
  });
  return reads;
}

/** Lines that use a carrier (member or listed local), with whether `.dp` follows the use. */
export function carrierUses(
  source: string,
  carrier: Pick<FloatCarrier, 'member' | 'locals'>
): Array<{ line: number; hasDp: boolean; isLocalDeclaration: boolean; text: string }> {
  const uses: Array<{ line: number; hasDp: boolean; isLocalDeclaration: boolean; text: string }> = [];
  const localDecl = carrier.locals.length
    ? new RegExp(`\\bval (${carrier.locals.join('|')})\\s*=`)
    : null;
  source.split('\n').forEach((raw, i) => {
    const code = codeOf(raw);
    if (!code) return;
    const patterns: RegExp[] = [
      carrier.member,
      ...carrier.locals.map((l) => new RegExp(`\\b${l}\\b`)),
    ];
    for (const p of patterns) {
      const m = p.exec(code);
      if (!m) continue;
      const isLocalDeclaration = Boolean(localDecl && localDecl.test(code));
      const after = code.slice(m.index + m[0].length);
      uses.push({ line: i + 1, hasDp: /\.dp\b/.test(after), isLocalDeclaration, text: raw.trim() });
      break;
    }
  });
  return uses;
}

describe('Android sizing reads agree with the generated sizing type', () => {
  const { shape, emitted } = emittedSizingShape();
  const files = findAndroidSources(COMPONENTS_ROOT).sort();
  const rel = (f: string) => path.relative(COMPONENTS_ROOT, f).split(path.sep).join('/');

  it('recognises the shape the generator emits for sizing', () => {
    if (shape === null) {
      throw new Error(
        `AndroidFormatGenerator emitted an unrecognised sizing shape:\n  ${emitted}\n` +
          'Update emittedSizingShape() in this guard to the new shape before trusting it.'
      );
    }
    expect(['Float', 'Dp']).toContain(shape);
  });

  it('scans the Android sources (not vacuous)', () => {
    const names = files.map(rel);
    expect(names).toContain('core/Button-CTA/platforms/android/ButtonCTA.android.kt');
    expect(names).toContain('core/Avatar-Base/platforms/android/Avatar.android.kt');
    const total = files.reduce((n, f) => n + sizingReads(fs.readFileSync(f, 'utf-8')).length, 0);
    expect(total).toBeGreaterThan(0);
  });

  it('every listed Float carrier still exists and reads what it lists', () => {
    for (const c of FLOAT_CARRIERS) {
      const full = path.join(COMPONENTS_ROOT, c.file);
      expect(fs.existsSync(full)).toBe(true);
      const bare = sizingReads(fs.readFileSync(full, 'utf-8'))
        .filter((r) => !r.hasDp)
        .map((r) => r.token);
      expect(bare.sort()).toEqual([...c.tokens].sort());
    }
  });

  it('converts or does not convert each sizing read, per the generated type', () => {
    const violations: string[] = [];

    for (const file of files) {
      const source = fs.readFileSync(file, 'utf-8');
      const carrier = FLOAT_CARRIERS.find((c) => c.file === rel(file));

      for (const r of sizingReads(source)) {
        if (shape === 'Float' && !r.hasDp) {
          if (carrier && carrier.tokens.includes(r.token)) continue; // checked at its uses below
          violations.push(
            `${rel(file)}:${r.line} reads DesignTokens.${r.token} (Float) without .dp\n    ${r.text}`
          );
        }
        if (shape === 'Dp' && r.hasDp) {
          violations.push(
            `${rel(file)}:${r.line} calls .dp on DesignTokens.${r.token}, now Dp (remove .dp)\n    ${r.text}`
          );
        }
      }

      if (carrier) {
        for (const u of carrierUses(source, carrier)) {
          if (u.isLocalDeclaration) continue;
          if (shape === 'Float' && !u.hasDp) {
            violations.push(
              `${rel(file)}:${u.line} uses a Float sizing carrier without .dp\n    ${u.text}`
            );
          }
          if (shape === 'Dp' && u.hasDp) {
            violations.push(
              `${rel(file)}:${u.line} calls .dp on a sizing carrier, now Dp (remove .dp; then empty its FLOAT_CARRIERS entry)\n    ${u.text}`
            );
          }
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `Generator emits sizing as ${shape}. ${violations.length} Android sizing read(s) disagree:\n\n` +
          violations.join('\n') +
          '\n\nRecord: .kiro/issues/archive/2026-10-23-component-token-usage-findings-from-drift-pass.md (items 5, 7).'
      );
    }
  });
});

describe('detector self-test (fixtures)', () => {
  it('finds bare and converted reads, and skips comments', () => {
    const src = [
      '    height = DesignTokens.size_500,',
      '    minWidth = DesignTokens.size_700.dp,',
      '    // height = DesignTokens.size_900,',
      '     * DesignTokens.size_1000 in KDoc',
      '    x = DesignTokens.space_200, // DesignTokens.size_050 in a trailing comment',
    ].join('\n');
    expect(sizingReads(src)).toEqual([
      expect.objectContaining({ line: 1, token: 'size_500', hasDp: false }),
      expect.objectContaining({ line: 2, token: 'size_700', hasDp: true }),
    ]);
  });

  it('reads carrier uses and their .dp', () => {
    const src = [
      '    val barHeight = ProgressBarTokens.height(size)',
      '        .height(barHeight.dp)',
      '        .width(barHeight)',
      '    .offset { (NavTabBarTokens.dotSize / 2).dp.toPx() }',
    ].join('\n');
    const bar = carrierUses(src, { member: /ProgressBarTokens\.height\(/, locals: ['barHeight'] });
    expect(bar.map((u) => [u.line, u.isLocalDeclaration, u.hasDp])).toEqual([
      [1, true, false],
      [2, false, true],
      [3, false, false],
    ]);
    const dot = carrierUses(src, { member: /NavTabBarTokens\.dotSize\b/, locals: [] });
    expect(dot.map((u) => [u.line, u.hasDp])).toEqual([[4, true]]);
  });
});

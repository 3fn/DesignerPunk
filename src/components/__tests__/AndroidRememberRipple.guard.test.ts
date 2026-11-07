/**
 * @category temporary
 * @purpose Guard: no Android component source imports or calls `rememberRipple`, which is deprecated at DeprecationLevel.ERROR from material-ripple 1.7 (the pinned Compose BOM maps to 1.12.1)
 * @retirementCriteria `harness-android-components` is a required check (Spec 129): the compile then reports an import or call of `rememberRipple` itself
 *
 * Android ripple (Spec 129 Task 12.3; Req 8.2)
 *
 * `rememberRipple` is replaced by `ripple(...)` at Button-Icon, Input-Checkbox-Base and Input-Radio-Base
 * (accepted by the harness). `VerticalListButtonItem.android.kt` imported `rememberRipple` and never
 * called it (`indication = null`): a dead import, and an error under the pinned Compose. This guard reads
 * code lines only (a comment may name the function) of every `platforms/android/*.kt` under core/, and
 * names VerticalListButtonItem.android.kt so the file is covered by name as well as by the sweep.
 *
 * WHAT IT DOES NOT ESTABLISH: that any file compiles; that `ripple(...)` is imported where it is called
 * (the harness is what sees that). A text check.
 *
 * Record: .kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md (A5, A6, A7).
 * TEMPORARY: retire per @retirementCriteria above.
 */

import * as fs from 'fs';
import * as path from 'path';

const CORE = path.resolve(__dirname, '..', 'core');
const NAMED = 'Button-VerticalList-Item/platforms/android/VerticalListButtonItem.android.kt';

/** Lines (1-based) of code, not comments, that name `rememberRipple`. Pure, so it can be bitten. */
export function rememberRippleLines(source: string): number[] {
  const hits: number[] = [];
  source.split('\n').forEach((raw, i) => {
    const t = raw.trim();
    if (t.startsWith('//') || t.startsWith('/*') || t.startsWith('*')) return;
    const cut = raw.search(/(^|\s)\/\//);
    const code = cut === -1 ? raw : raw.slice(0, cut);
    if (/\brememberRipple\b/.test(code)) hits.push(i + 1);
  });
  return hits;
}

function androidSources(): string[] {
  const out: string[] = [];
  for (const comp of fs.readdirSync(CORE, { withFileTypes: true })) {
    if (!comp.isDirectory()) continue;
    const dir = path.join(CORE, comp.name, 'platforms', 'android');
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      if (f.isFile() && f.name.endsWith('.kt')) out.push(path.join(dir, f.name));
    }
  }
  return out;
}

describe('no Android component names rememberRipple in code', () => {
  it('VerticalListButtonItem.android.kt has no rememberRipple import', () => {
    const file = path.join(CORE, NAMED);
    expect(fs.existsSync(file)).toBe(true);
    expect(rememberRippleLines(fs.readFileSync(file, 'utf8'))).toEqual([]);
  });

  it('no component file under core/ has one', () => {
    const bad = androidSources()
      .filter(f => rememberRippleLines(fs.readFileSync(f, 'utf8')).length > 0)
      .map(f => path.relative(CORE, f).split(path.sep).join('/'));
    expect(bad).toEqual([]);
  });

  it('the sweep reads the sources (not an empty directory walk)', () => {
    expect(androidSources().length).toBeGreaterThan(40);
  });
});

describe('the bite', () => {
  it('flags the import and the call', () => {
    expect(rememberRippleLines('import androidx.compose.material.ripple.rememberRipple')).toEqual([1]);
    expect(rememberRippleLines('x\n    indication = rememberRipple(bounded = true)')).toEqual([2]);
  });

  it('passes ripple(...) and a comment that names the function', () => {
    expect(rememberRippleLines('import androidx.compose.material.ripple.ripple\nindication = ripple(bounded = true)')).toEqual([]);
    expect(rememberRippleLines('// was rememberRipple\n * rememberRipple')).toEqual([]);
    expect(rememberRippleLines('val a = 1 // rememberRipple')).toEqual([]);
  });
});

/**
 * @category evergreen
 * @purpose Spec 129 U8 (13.2): the name contract over the component tier, the reserved Kotlin packages, and the freshness lines
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  findMissingReferences,
  missingReferenceMessage,
  readDeclaredNames,
  readPackagePrimitiveNames,
  type DeclaredNames,
} from '../shared/componentTokenReferences';
import {
  isReservedKotlinPackage,
  packageComponentSourceNames,
  reservedPackageMessage,
  scanReservedKotlinPackages,
} from '../shared/reservedKotlinPackages';
import { freshnessNotCheckedMessage, staleOutputMessage } from '../sync/ComponentTier';

let tmp: string;
beforeEach(() => { tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-tier-')); });
afterEach(() => fs.rmSync(tmp, { recursive: true, force: true }));

const write = (rel: string, text: string): string => {
  const f = path.join(tmp, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, text);
  return f;
};

const SPELLED = new Map([
  ['size500', { web: '--size-500', ios: 'size500', android: 'size_500' }],
  ['space150', { web: '--space-150', ios: 'space150', android: 'space_150' }],
]);

describe('the name contract over the component tier (Req 5.4)', () => {
  const declared = (over: Partial<DeclaredNames> = {}): DeclaredNames => ({
    web: new Set(['--size-500', '--space-150']),
    ios: new Set(['size500', 'space150']),
    android: new Set(['size_500', 'space_150']),
    ...over,
  });
  const refs = [
    { token: 'avatar.size.md', primitive: 'size500' },
    { token: 'buttonicon.size.medium', primitive: 'size500' },
    { token: 'badgelabelbase.padding', primitive: 'space150' },
  ];

  test('nothing is missing when every platform defines every referenced name', () => {
    expect(findMissingReferences(refs, declared(), SPELLED)).toEqual([]);
  });

  test('a deleted primitive is missing on every platform that lacks it, grouped with the tokens that read it', () => {
    const d = declared({ web: new Set(['--space-150']), ios: new Set(['space150']), android: new Set(['size_500', 'space_150']) });
    expect(findMissingReferences(refs, d, SPELLED)).toEqual([
      { primitive: 'size500', platforms: ['ios', 'web'], tokens: ['avatar.size.md', 'buttonicon.size.medium'] },
    ]);
  });

  test('a platform with no generated file is not judged, and a name the package does not know is not the consumer\'s gap', () => {
    const d = declared({ ios: null, android: null, web: new Set() });
    expect(findMissingReferences(refs, d, SPELLED).map(m => [m.primitive, m.platforms])).toEqual([['size500', ['web']], ['space150', ['web']]]);
    expect(findMissingReferences([{ token: 'x.y', primitive: 'unknown999' }], declared({ web: new Set() }), SPELLED)).toEqual([]);
  });

  test('readDeclaredNames reads the generated DesignTokens files of every platform', () => {
    write('out/DesignTokens.web.css', ':root {\n  /* --gone: 1; */\n  --size-500: 40px;\n}\n');
    write('out/DesignTokens.ios.swift', 'public enum DesignTokens {\n    public static let size500: CGFloat = 40\n}\n');
    write('out/DesignTokens.android.kt', 'object DesignTokens {\n    val size_500 = 40.dp\n}\n');
    const names = readDeclaredNames(path.join(tmp, 'out'));
    expect([...names.web!]).toEqual(['--size-500']);
    expect(names.ios!.has('size500')).toBe(true);
    expect(names.android!.has('size_500')).toBe(true);
    expect(readDeclaredNames(path.join(tmp, 'nowhere'))).toEqual({ web: null, ios: null, android: null });
  });

  test('readPackagePrimitiveNames reads the shipped index, and says why when it cannot', () => {
    write('pkg/token-index/primitives.yaml', 'tokens:\n  size500:\n    platforms:\n      web: "--size-500"\n      ios: size500\n      android: size_500\n');
    expect(readPackagePrimitiveNames(path.join(tmp, 'pkg')).names?.get('size500')).toEqual({ web: '--size-500', ios: 'size500', android: 'size_500' });
    expect(readPackagePrimitiveNames(path.join(tmp, 'none')).names).toBeNull();
  });

  test('the report line names the tokens, the primitive, the platforms and the remedy; a report, not a failure', () => {
    const line = missingReferenceMessage({ primitive: 'size500', platforms: ['ios', 'android', 'web'], tokens: ['a.x', 'b.y', 'c.z', 'd.w'] }, 'src/tokens/');
    expect(line).toBe(
      "component tokens: DesignerPunk's a.x, b.y, c.z and 1 more read 'size500', which your generated ios, android, web output does not define. " +
      'Until it is defined, the emitted ComponentTokens files do not compile. ' +
      "Restore 'size500' in src/tokens/, or declare the group yourself: a group you declare replaces DesignerPunk's.",
    );
    expect(missingReferenceMessage({ primitive: 'size500', platforms: ['web'], tokens: ['a.x'] }, 'src/tokens/', { by: '@3fn/core 17.0.0', tokens: ['a.x'] }))
      .toContain("reads 'size500', which your generated web output does not define (new in @3fn/core 17.0.0: a.x).");
  });
});

describe('the reserved Kotlin packages (O-11; warn, never fail)', () => {
  test('which packages are reserved', () => {
    for (const p of ['com.designerpunk.tokens', 'com.designerpunk.components', 'com.designerpunk.components.avatar']) expect(isReservedKotlinPackage(p)).toBe(true);
    for (const p of ['com.designerpunk.product', 'com.designerpunkx.tokens', 'com.acme.tokens', 'com.designerpunk.tokens.extra']) expect(isReservedKotlinPackage(p)).toBe(false);
  });

  test('warns on a reserved-package .kt file, skips the trees the design names, and ignores other packages', () => {
    write('android/Mine.kt', 'package com.designerpunk.components.avatar\n\nobject Mine\n');
    write('android/Yours.kt', 'package com.acme.app\n');
    write('android/Typed.kt', '// header\npackage com.designerpunk.tokens\n');
    write('node_modules/x/Skip.kt', 'package com.designerpunk.tokens\n');
    write('app/build/Skip.kt', 'package com.designerpunk.tokens\n');
    write('app/.gradle/Skip.kt', 'package com.designerpunk.tokens\n');
    write('dist/tokens/ComponentTokens.android.kt', 'package com.designerpunk.tokens\n');
    write('dist/tokens/product/ProductTokens.android.kt', 'package com.designerpunk.tokens\n');
    write('src/tokens/platforms/android/MotionTokens.kt', 'package com.designerpunk.tokens\n');
    const found = scanReservedKotlinPackages({ root: tmp, skipDirs: [path.join(tmp, 'dist', 'tokens'), path.join(tmp, 'src', 'tokens')] });
    expect(found.map(f => [f.file, f.package])).toEqual([
      ['android/Mine.kt', 'com.designerpunk.components.avatar'],
      ['android/Typed.kt', 'com.designerpunk.tokens'],
    ]);
  });

  test('a file with the name of one of our component sources is called a copy, with the pointer to sync --migrate-legacy', () => {
    write('pkg/src/components/core/Avatar-Base/platforms/android/Avatar.kt', 'package com.designerpunk.components.avatar\n');
    write('app/Avatar.kt', 'package com.designerpunk.components.avatar\n');
    const names = packageComponentSourceNames(path.join(tmp, 'pkg'));
    expect([...names]).toEqual(['Avatar.kt']);
    const [f] = scanReservedKotlinPackages({ root: path.join(tmp, 'app'), skipDirs: [], componentSourceNames: names });
    expect(f.looksLikeCopy).toBe(true);
    expect(reservedPackageMessage(f)).toBe(
      'Avatar.kt is in the Kotlin package com.designerpunk.components.avatar, which is reserved to DesignerPunk (com.designerpunk.tokens and com.designerpunk.components.*). ' +
      "A file of yours there can clash with DesignerPunk's in the same module; give it a package of your own. " +
      "It has the name of one of DesignerPunk's component sources, so it may be a copy: `npx designerpunk sync --migrate-legacy` removes the unmodified copies.",
    );
  });

  test('a file that is not a copy gets the warning without the pointer', () => {
    const msg = reservedPackageMessage({ file: 'android/Mine.kt', package: 'com.designerpunk.tokens', looksLikeCopy: false });
    expect(msg).toContain('android/Mine.kt is in the Kotlin package com.designerpunk.tokens, which is reserved to DesignerPunk');
    expect(msg).not.toContain('migrate-legacy');
  });
});

describe('the freshness lines of the name-contract run (Req 5.8)', () => {
  test('the stale line says how many files differ, names them, and what to run', () => {
    expect(staleOutputMessage('dist/tokens', ['DesignTokens.ios.swift', 'DesignTokens.web.css'], ['ComponentTokens.ios.swift'])).toBe(
      'your generated token output in dist/tokens is not what `npx designerpunk generate` would write now: ' +
      '2 files differ (DesignTokens.ios.swift, DesignTokens.web.css); 1 not written yet (ComponentTokens.ios.swift). ' +
      'The name contract above was read from that older output, so its answer may not hold. Run `npx designerpunk generate` and `sync` again.',
    );
  });

  test('a check that cannot run says so; it is not a clean report', () => {
    expect(freshnessNotCheckedMessage('boom')).toContain('not checked: whether your generated output matches what `generate` would write now (boom)');
  });
});

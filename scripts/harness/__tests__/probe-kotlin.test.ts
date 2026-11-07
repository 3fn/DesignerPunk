/**
 * probe-kotlin.test.ts — Spec 129 Task 4, subtasks 4.2 and 4.3.
 *
 * 4.2's criterion: "asserts, over a fixture index carrying `theme.` names and a fixture consumer config, that
 * `probe-kotlin.ts` emits one read per `theme.`-named colour semantic through `LocalDPTheme.current` and one
 * through each theme instance, plus one read per product-token fixture member, all inside `@Composable`,
 * with no `harness/android/**` change needed when item (i) emits". 4.3 moves the instance, family and product
 * rules to `native-rules.ts` (Thurgood's), adds the provider reads and the count groups, and adds the
 * per-run instance check, the `checks` the lane writes, and the lane's duplicate-name failure.
 *
 * The fixtures are `fixtures/kotlin/consumer/` (the manifest-shaped config, a token index, two product-token
 * files), `fixtures/kotlin/planted-internal/` (Req 2.7's planted non-public member), `fixtures/kotlin/holder/`
 * (generated-Kotlin cuts in the holder form Task 11 pins) and `fixtures/kotlin/packed-kt-files.txt` (the real
 * packed `.kt` list of 2026-11-06).
 *
 * What this file does NOT show: that the emitted probe Kotlin compiles. That is shown by the lane runs, and
 * `lane.ts --selftest` for the planted member.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  buildChecks,
  buildRunFiles,
  assertOneCopyPerName,
  duplicateBaseNames,
  isTestKotlin,
  packagedKotlin,
  parseToolchain,
  type GradleRun,
  type Plan,
} from '../../../harness/android/lane';
import {
  CHUNK_SIZE,
  PROBE_PACKAGE,
  checkThemeInstances,
  collectIndexNames,
  generateProbe,
  main,
  probeConfigFromManifest,
  readProbeIndex,
  readProductFiles,
  writeProbe,
  type ProbeIndex,
  type ProbeInput,
} from '../probe-kotlin';

const FIXTURES = path.join(__dirname, 'fixtures', 'kotlin');
const CONSUMER = path.join(FIXTURES, 'consumer');
const PLANTED = path.join(FIXTURES, 'planted-internal');
const HOLDER = path.join(FIXTURES, 'holder');

function manifest(dir: string): unknown {
  return JSON.parse(fs.readFileSync(path.join(dir, 'harness-consumer.json'), 'utf8'));
}

function fixtureInput(dir: string = CONSUMER): ProbeInput {
  return {
    index: readProbeIndex(path.join(dir, 'token-index')),
    config: probeConfigFromManifest(manifest(dir)),
    productFiles: readProductFiles(path.join(dir, 'product', 'tokens')),
  };
}

type Statement = { file: string; code: string; marker: string };

/** Every read statement of every file: the code before the `// @…` marker, and the marker. */
function statements(files: Readonly<Record<string, string>>): Statement[] {
  const out: Statement[] = [];
  for (const [file, text] of Object.entries(files)) {
    for (const line of text.split('\n')) {
      const m = /^ {4}(\S.*?) \/\/ (@.+)$/.exec(line);
      if (m && !m[1].endsWith('()')) out.push({ file, code: m[1], marker: m[2] });
    }
  }
  return out;
}

const probeArg = (code: string): string => (code.startsWith('probe(') ? code.slice('probe('.length, -1) : code);

const MEMBERS = ['BaseLight', 'BaseDark', 'WcagLight', 'WcagDark'];

describe('probe-kotlin: the fixture index and config (manifest themes dark and wcag)', () => {
  const out = generateProbe(fixtureInput());
  const all = statements(out.files);
  const exprs = all.map((s) => probeArg(s.code));

  it('counts the names the index gives for Android: lists expanded, null skipped, a theme name once', () => {
    const names = collectIndexNames(readProbeIndex(path.join(CONSUMER, 'token-index'))).map((n) => n.name);
    expect(names).toEqual([
      'Duration.Duration150',
      'MotionFloatLabel.duration',
      'MotionFloatLabel.easing',
      'ProgressTokens.connectorThickness',
      'color_feedback_success_background',
      'space_100',
      'theme.color_action_primary',
      'theme.color_text_default',
    ]);
    expect(out.groups.index).toEqual({ m: 8, n: 8 });
  });

  it('reads each primitive and semantic name relative to DesignTokens, and a component token as a top-level type', () => {
    expect(exprs).toEqual(expect.arrayContaining([
      'DesignTokens.space_100',
      'DesignTokens.Duration.Duration150',
      'DesignTokens.color_feedback_success_background',
      'DesignTokens.MotionFloatLabel.duration',
      'DesignTokens.MotionFloatLabel.easing',
      'ProgressTokens.connectorThickness',
    ]));
    expect(exprs).not.toContain('DesignTokens.ProgressTokens.connectorThickness');
  });

  it('reads each theme.-named colour semantic once through LocalDPTheme.current, as its index read', () => {
    const local = all.filter((r) => r.code.startsWith('probe(LocalDPTheme.current.'));
    expect(local.map((r) => probeArg(r.code)).sort()).toEqual(['LocalDPTheme.current.color_action_primary', 'LocalDPTheme.current.color_text_default']);
    expect(local.every((r) => r.marker.startsWith('@index '))).toBe(true);
  });

  it('reads each theme.-named semantic once through each instance the shared module gives: four, because dark and wcag add none', () => {
    for (const member of MEMBERS) {
      for (const prop of ['color_action_primary', 'color_text_default']) {
        expect(exprs.filter((e) => e === `HarnessConsumerThemes.${member}.${prop}`)).toHaveLength(1);
      }
    }
    expect(all.filter((r) => r.marker.startsWith('@instance '))).toHaveLength(2 * MEMBERS.length);
    expect(exprs.some((e) => /HarnessConsumerThemes\.Dark\./.test(e))).toBe(false);
    expect(out.instances).toEqual(MEMBERS);
    expect(out.groups.instances).toEqual({ m: 8, n: 8 });
  });

  it('uses DesignerPunk\'s fixed binding name, not the consumer\'s abbreviation (HX)', () => {
    const text = Object.values(out.files).join('\n');
    expect(text).not.toMatch(/LocalHX|HXTheme/);
    expect(text).toContain('import com.designerpunk.tokens.*');
  });

  it('reads one member per Android product-token member the shared module names, by file-name category', () => {
    const product = all.filter((r) => r.marker.startsWith('@product ')).map((r) => probeArg(r.code));
    expect(product).toEqual(['ProductBrandColors.spaceUnit', 'ProductHarness.actionPrimaryRef', 'ProductHarness.bodyTypographyRef']);
    expect(exprs).not.toContain('ProductHarness.webOnly');
    expect(out.groups.product).toEqual({ m: 3, n: 3 });
  });

  it('reads the family and the provider from outside :tokens: the default call, then per entry a read and a call', () => {
    const provider = all.filter((r) => r.marker.startsWith('@provider ')).map((r) => r.code);
    expect(provider).toEqual([
      'HarnessConsumerTheme { }',
      'probe(HarnessConsumerThemeFamily.Base)',
      'HarnessConsumerTheme(family = HarnessConsumerThemeFamily.Base) { }',
      'probe(HarnessConsumerThemeFamily.Wcag)',
      'HarnessConsumerTheme(family = HarnessConsumerThemeFamily.Wcag) { }',
    ]);
    expect(out.groups.provider).toEqual({ m: 5, n: 5 });
  });

  it('counts its reads: every group has n equal to m, and the total is their sum', () => {
    for (const g of Object.values(out.groups)) expect(g.n).toBe(g.m);
    expect(out.totalReads).toBe(8 + 8 + 3 + 5);
    expect(all).toHaveLength(out.totalReads);
  });

  it('puts every read inside a @Composable function, each function being @Composable but the one helper', () => {
    for (const [file, text] of Object.entries(out.files)) {
      const lines = text.split('\n');
      let inFunction: { composable: boolean } | null = null;
      lines.forEach((line, i) => {
        const fn = /^(?:private )?(?:inline )?fun (\w+)\(/.exec(line);
        if (fn) {
          const composable = lines[i - 1] === '@Composable';
          if (fn[1] === 'probe') expect(line).toBe('private inline fun probe(value: Any?) {}');
          else expect({ file, fn: fn[1], composable }).toEqual({ file, fn: fn[1], composable: true });
          inFunction = { composable };
        }
        if (/^ {4}\S.* \/\/ @/.test(line)) {
          expect(inFunction).not.toBeNull();
          expect(inFunction && inFunction.composable).toBe(true);
        }
        if (line === '}') inFunction = null;
      });
      expect(text).toContain('import androidx.compose.runtime.Composable');
      expect(text).toContain(`package ${PROBE_PACKAGE}`);
    }
  });

  it('writes each group in its own file, importing the product package only where it is read', () => {
    expect(Object.keys(out.files).sort()).toEqual(['ProbeFamily.kt', 'ProbeProduct.kt', 'ProbeThemeInstances.kt', 'ProbeThemeLocal.kt', 'ProbeTokens.kt']);
    expect(out.files['ProbeProduct.kt']).toContain('import com.designerpunk.product.tokens.*');
    expect(out.files['ProbeTokens.kt']).not.toContain('com.designerpunk.product.tokens');
    expect(out.files['ProbeFamily.kt']).toContain('import com.designerpunk.tokens.*');
  });

  it('writes probe-expected.txt with one m per group, for the :probe module\'s count task', () => {
    expect(out.expectedText).toBe(
      'index-names=8\ninstances=8\nproduct=3\nprovider=5\nfiles=ProbeFamily.kt,ProbeProduct.kt,ProbeThemeInstances.kt,ProbeThemeLocal.kt,ProbeTokens.kt\n',
    );
  });

  it('is deterministic, and independent of the order the index lists its entries and the product files are given', () => {
    const input = fixtureInput();
    const reversed: ProbeInput = {
      ...input,
      index: {
        primitives: Object.fromEntries(Object.entries(input.index.primitives).reverse()),
        semantics: Object.fromEntries(Object.entries(input.index.semantics).reverse()),
        components: Object.fromEntries(Object.entries(input.index.components).reverse()),
      } as ProbeIndex,
      productFiles: [...input.productFiles].reverse(),
    };
    expect(generateProbe(reversed)).toEqual(generateProbe(input));
    expect(generateProbe(input)).toEqual(out);
  });
});

describe('probe-kotlin: from the index and the config alone', () => {
  it('reads a new theme.-named semantic with no change to the generator', () => {
    const input = fixtureInput();
    const withNew: ProbeIndex = {
      ...input.index,
      semantics: { ...input.index.semantics, 'color.surface.raised': { category: 'color', platforms: { android: 'theme.color_surface_raised' } } },
    };
    const out = generateProbe({ ...input, index: withNew });
    const exprs = statements(out.files).map((s) => probeArg(s.code));
    expect(exprs).toContain('LocalDPTheme.current.color_surface_raised');
    for (const member of MEMBERS) expect(exprs).toContain(`HarnessConsumerThemes.${member}.color_surface_raised`);
    expect(out.groups.index.m).toBe(9);
    expect(out.groups.instances).toEqual({ m: 12, n: 12 });
  });

  it('reads a registered custom theme\'s instances and family entry as the shared module gives them', () => {
    const input = fixtureInput();
    const config = { ...input.config, themes: [...input.config.themes, { name: 'high-contrast', mode: 'both' }, { name: 'night', mode: 'dark' }] };
    const out = generateProbe({ ...input, config });
    const all = statements(out.files);
    const exprs = all.map((s) => probeArg(s.code));
    expect(exprs).toContain('HarnessConsumerThemes.HighContrastLight.color_text_default');
    expect(exprs).toContain('HarnessConsumerThemes.HighContrastDark.color_text_default');
    expect(exprs).toContain('HarnessConsumerThemes.NightDark.color_action_primary');
    expect(exprs).not.toContain('HarnessConsumerThemes.NightLight.color_action_primary');
    expect(exprs).toContain('HarnessConsumerThemeFamily.HighContrast');
    expect(exprs).toContain('HarnessConsumerThemeFamily.Night');
    expect(out.groups.instances).toEqual({ m: 2 * 7, n: 2 * 7 });
    expect(out.groups.provider).toEqual({ m: 1 + 2 * 4, n: 1 + 2 * 4 });
  });

  it('uses the manifest\'s name for <Name>Themes, <Name>ThemeFamily and <Name>Theme', () => {
    const input = fixtureInput();
    const text = Object.values(generateProbe({ ...input, config: { ...input.config, name: 'Acme' } }).files).join('\n');
    expect(text).toContain('AcmeThemes.BaseLight.color_text_default');
    expect(text).toContain('AcmeThemeFamily.Wcag');
    expect(text).toContain('AcmeTheme { }');
  });

  it('writes no theme file, and counts no instance read, when the index names no theme', () => {
    const input = fixtureInput();
    const noThemes: ProbeIndex = {
      ...input.index,
      semantics: Object.fromEntries(Object.entries(input.index.semantics).filter(([, e]) => !String(e.platforms?.android).startsWith('theme.'))),
    };
    const out = generateProbe({ ...input, index: noThemes });
    expect(Object.keys(out.files)).not.toContain('ProbeThemeLocal.kt');
    expect(Object.keys(out.files)).not.toContain('ProbeThemeInstances.kt');
    expect(out.instances).toEqual([]);
    expect(out.groups.index.m).toBe(6);
    expect(out.groups.instances).toEqual({ m: 0, n: 0 });
  });

  it('writes no family or provider read, and counts none, when asked not to (the planted-member self-test)', () => {
    const out = generateProbe({ ...fixtureInput(), provider: false });
    expect(Object.keys(out.files)).not.toContain('ProbeFamily.kt');
    expect(out.groups.provider).toEqual({ m: 0, n: 0 });
    expect(out.expectedText).toContain('provider=0\n');
  });

  it('reads an absent manifest `themes` as none, and still gives the four fixed instances', () => {
    const config = probeConfigFromManifest({ name: 'HarnessConsumer' });
    expect(config.themes).toEqual([]);
    const out = generateProbe({ ...fixtureInput(), config });
    expect(out.instances).toEqual(MEMBERS);
  });

  it('keeps `m` independent of what was emitted: it comes from the inputs, so a dropped read shows as n below m', () => {
    // Remove one instance line from the emitted text and recount, as the :probe module's count task does.
    const out = generateProbe(fixtureInput());
    const text = out.files['ProbeThemeInstances.kt'].split('\n').filter((l) => !l.includes('@instance WcagDark theme.color_text_default')).join('\n');
    const n = text.split('\n').filter((l) => l.includes('// @instance ')).length;
    expect(n).toBe(out.groups.instances.m - 1);
  });
});

describe('probe-kotlin: chunking and refusals', () => {
  const baseInput = (index: ProbeIndex): ProbeInput => ({ index, config: { name: 'X', themes: [] }, productFiles: [], provider: false });

  it(`splits a file's reads into private composables of at most ${CHUNK_SIZE}, all called by the public entry`, () => {
    const primitives: Record<string, { platforms: { android: string } }> = {};
    for (let i = 0; i < 120; i++) primitives[`p${i}`] = { platforms: { android: `space_${String(i).padStart(3, '0')}` } };
    const out = generateProbe(baseInput({ primitives, semantics: {}, components: {} }));
    const text = out.files['ProbeTokens.kt'];
    expect(text).toContain('fun ProbeTokens() {\n    ProbeTokens00()\n    ProbeTokens01()\n    ProbeTokens02()\n}');
    expect(text.match(/^private fun ProbeTokens\d\d\(\)/gm)).toHaveLength(3);
    expect(out.groups.index).toEqual({ m: 120, n: 120 });
  });

  it('counts a name that two entries share once', () => {
    const out = generateProbe(baseInput({
      primitives: { a: { platforms: { android: 'space_100' } }, b: { platforms: { android: 'space_100' } } },
      semantics: {},
      components: {},
    }));
    expect(out.groups.index).toEqual({ m: 1, n: 1 });
  });

  it('refuses a name that is not a Kotlin identifier path, rather than writing code from it', () => {
    const bad = (android: unknown) => () => generateProbe(baseInput({ primitives: { a: { platforms: { android } as never } }, semantics: {}, components: {} }));
    expect(bad('space 100')).toThrow(/not a Kotlin identifier/);
    expect(bad('a`b')).toThrow(/not a Kotlin identifier/);
    expect(bad('Duration..x')).toThrow(/not a Kotlin identifier/);
    expect(bad(42)).toThrow(/not a string/);
  });

  it('refuses a theme. name on anything but a category: color semantic', () => {
    const input = fixtureInput();
    expect(() => generateProbe({
      ...input,
      index: { ...input.index, semantics: { ...input.index.semantics, 'shadow.x': { category: 'shadow', platforms: { android: 'theme.shadow_x' } } } },
    })).toThrow(/not a category: color semantic/);
    expect(() => generateProbe({
      ...input,
      index: { ...input.index, primitives: { ...input.index.primitives, odd: { category: 'color', platforms: { android: 'theme.odd' } } } },
    })).toThrow(/not a category: color semantic/);
  });

  it('refuses a config name that would write bad Kotlin, and a manifest with no name', () => {
    const input = fixtureInput();
    expect(() => generateProbe({ ...input, config: { name: 'has space', themes: [] } })).toThrow(/config name is not a Kotlin identifier/);
    expect(() => probeConfigFromManifest({ themes: [] })).toThrow(/no `name`/);
  });

  it('passes a malformed product file to the shared module, which refuses it naming the file', () => {
    const input = fixtureInput();
    expect(() => generateProbe({ ...input, productFiles: [{ path: 'bad.yaml', doc: { tokens: ['a', 'b'] } }] })).toThrow(/bad\.yaml.*"tokens" is a list/);
    expect(() => generateProbe({ ...input, productFiles: [{ path: 'bad.yaml', doc: { tokens: { a: { platforms: 'ios' } } } }] })).toThrow(/bad\.yaml.*"platforms"/);
  });
});

describe('probe-kotlin: the per-run instance check', () => {
  const config = probeConfigFromManifest(manifest(CONSUMER));
  const check = (name: string) => checkThemeInstances(fs.readFileSync(path.join(HOLDER, `${name}.kt`), 'utf8'), config);

  it('passes when the holder declares exactly the shared module\'s instances, in order', () => {
    const r = check('ok');
    expect(r.ok).toBe(true);
    expect(r.line).toBe('theme instances: 4 of 4 as the shared module gives (BaseLight, BaseDark, WcagLight, WcagDark)');
  });

  it('fails once on a holder that declares an extra member, naming it', () => {
    const r = check('extra');
    expect(r.ok).toBe(false);
    expect(r.detail).toBe('extra DarkOnly');
  });

  it('fails once on a holder that lacks a member, naming it', () => {
    const r = check('missing');
    expect(r.ok).toBe(false);
    expect(r.detail).toBe('missing WcagDark');
  });

  it('fails on a holder in the wrong order, and on a member declared twice', () => {
    expect(check('order').ok).toBe(false);
    expect(check('order').detail).toMatch(/^order differs/);
    const dup = check('duplicate');
    expect(dup.ok).toBe(false);
    expect(dup.detail).toBe('extra WcagDark');
  });

  it('fails closed on a holder that is declared with no member in the pinned form', () => {
    const r = check('empty');
    expect(r.ok).toBe(false);
    expect(r.detail).toBe('holder found, no members parsed (HarnessConsumerThemes)');
  });

  it('fails closed when DesignerPunkTheme is declared and no holder is found', () => {
    const r = check('no-holder');
    expect(r.ok).toBe(false);
    expect(r.detail).toBe('DesignerPunkTheme is declared and no HarnessConsumerThemes holder was found');
  });

  it('prints `not checked` and does not fail when the generated code declares neither (every run before U6)', () => {
    const r = check('neither');
    expect(r).toEqual({ ok: true, detail: 'not checked', line: 'theme instances: not checked' });
  });

  it('uses the manifest\'s name for the holder it looks for', () => {
    const r = checkThemeInstances(fs.readFileSync(path.join(HOLDER, 'ok.kt'), 'utf8'), { ...config, name: 'Other' });
    expect(r.ok).toBe(false);
    expect(r.detail).toMatch(/no OtherThemes holder was found/);
  });
});

describe('probe-kotlin: the lane\'s checks, the run file and the setup failures', () => {
  const okText = fs.readFileSync(path.join(HOLDER, 'ok.kt'), 'utf8');
  const roots = { gen: '/w/gen', pkg: '/w/pkg', probe: '/w/probe' };
  const plan = (generatedText: string): Plan => ({
    laneDir: '/w/lane',
    genAbsolute: [],
    pkgAbsolute: [],
    floors: { gen: 3, pkg: 41 },
    roots,
    probeReads: { indexNames: 0, totalReads: 0 },
    config: probeConfigFromManifest(manifest(CONSUMER)),
    generatedText,
  });
  const header = (probeLine: string): string => [
    '> Task :tokens:compileDebugKotlin',
    'harness-sources: :tokens gen=3',
    'harness-toolchain: java.version=17.0.21',
    '',
    probeLine,
  ].join('\n');
  const counts = (a: string, b: string, c: string, d: string): string => [
    `probe: read ${a}`, `probe: instances read ${b}`, `probe: product read ${c}`, `probe: provider read ${d}`,
  ].join('\n');
  const run = (log: string): GradleRun => ({ log: `${log}\nBUILD SUCCESSFUL in 5s\n`, exitCode: 0 });

  it('writes one check per count line, ok when n equals m, plus the instance check', () => {
    const r = run(header(counts('8 of 8 index names', '8 of 8', '3 of 3', '5 of 5')));
    const checks = buildChecks(plan(okText), r);
    expect(checks.map((c) => [c.name, c.ok, c.detail])).toEqual([
      ['probe: read index names', true, '8 of 8'],
      ['probe: instances read', true, '8 of 8'],
      ['probe: product read', true, '3 of 3'],
      ['probe: provider read', true, '5 of 5'],
      ['theme instances', true, '4 of 4 as the shared module gives (BaseLight, BaseDark, WcagLight, WcagDark)'],
    ]);
  });

  it('fails a group whose n differs from m, and does so without the Gradle task failing', () => {
    const checks = buildChecks(plan(okText), run(header(counts('7 of 8 index names', '8 of 8', '3 of 3', '5 of 5'))));
    expect(checks.filter((c) => !c.ok).map((c) => [c.name, c.detail])).toEqual([['probe: read index names', '7 of 8']]);
  });

  it('fails closed when :tokens compiled and the probe printed no count line', () => {
    const checks = buildChecks(plan(okText), run(header('probe: read 8 of 8 index names')));
    expect(checks.filter((c) => !c.ok).map((c) => c.name)).toEqual(['probe: instances read', 'probe: product read', 'probe: provider read']);
  });

  it('writes the instance check\'s failure into the checks', () => {
    const bad = fs.readFileSync(path.join(HOLDER, 'missing.kt'), 'utf8');
    const checks = buildChecks(plan(bad), run(header(counts('8 of 8 index names', '8 of 8', '3 of 3', '5 of 5'))));
    expect(checks.filter((c) => !c.ok)).toEqual([{ name: 'theme instances', ok: false, detail: 'missing WcagDark' }]);
  });

  it('writes an empty checks array while :tokens fails (the probe was skipped; the blocked line stands in)', () => {
    const failed = ['> Task :tokens:compileDebugKotlin', 'e: file:///w/gen/DesignTokens.android.kt:1:1 Boom.', '> Task :tokens:compileDebugKotlin FAILED'].join('\n');
    expect(buildChecks(plan(okText), { log: `${failed}\nBUILD FAILED in 3s\n`, exitCode: 1 })).toEqual([]);
  });

  it('gives the token context the checks and the component context none', () => {
    const files = buildRunFiles(plan(okText), run(header(counts('8 of 8 index names', '8 of 8', '3 of 3', '5 of 5'))));
    expect(files['harness-android-tokens'].checks).toHaveLength(5);
    expect(files['harness-android-components'].checks).toEqual([]);
  });

  it('records the toolchain it ran and never stops on a pin mismatch (the comparator fails it as `toolchain`)', () => {
    const r = run(header(counts('8 of 8 index names', '8 of 8', '3 of 3', '5 of 5')).replace('17.0.21', '21.0.1'));
    expect(parseToolchain(r.log)).toEqual({ 'java.version': '21.0.1' });
    expect(buildRunFiles(plan(okText), r)['harness-android-tokens'].toolchain).toEqual({ 'java.version': '21.0.1' });
  });

  describe('one copy of each native file name (Stacy Medium-4)', () => {
    const packed = fs.readFileSync(path.join(FIXTURES, 'packed-kt-files.txt'), 'utf8').split('\n').filter((l) => l !== '' && !l.startsWith('#'));
    const generated = ['/c/dist/tokens/ComponentTokens.android.kt', '/c/dist/tokens/DesignTokens.android.kt', '/c/dist/tokens/product/ProductTokens.android.kt'];

    it('throws, naming both paths, on a planted pair with one base name', () => {
      expect(() => assertOneCopyPerName(['/p/src/a/Avatar.android.kt', '/p/src/b/Avatar.android.kt'])).toThrow(
        /step "prepare" failed: :dp would compile 1 file name\(s\) twice; first: Avatar\.android\.kt at \/p\/src\/a\/Avatar\.android\.kt and \/p\/src\/b\/Avatar\.android\.kt/,
      );
      expect(duplicateBaseNames(['/x/A.kt', '/y/B.kt', '/z/A.kt']).get('A.kt')).toEqual(['/x/A.kt', '/z/A.kt']);
    });

    it('passes on the real packed file list once the package\'s root token files are left out', () => {
      const pkg = packagedKotlin(packed);
      expect(pkg).toHaveLength(41);
      expect(() => assertOneCopyPerName([...pkg.map((p) => `/c/node_modules/@3fn/core/${p}`), ...generated])).not.toThrow();
    });

    it('would throw on the same list without the exclusion, so the exclusion is what keeps it passing', () => {
      const raw = packed.filter((p) => p.endsWith('.kt'));
      expect(raw.filter((p) => p.startsWith('dist/'))).toEqual(['dist/ComponentTokens.android.kt', 'dist/DesignTokens.android.kt']);
      expect(() => assertOneCopyPerName([...raw.map((p) => `/c/node_modules/@3fn/core/${p}`), ...generated])).toThrow(/ComponentTokens\.android\.kt|DesignTokens\.android\.kt/);
    });

    it('packagedKotlin leaves out both root token files and every test file', () => {
      const withTests = [
        ...packed,
        'src/components/core/Foo/platforms/android/FooTest.kt',
        'src/components/core/Foo/platforms/android/FooTests.kt',
        'src/components/core/Foo/platforms/android/test/Helper.kt',
        'src/components/core/Foo/platforms/android/androidTest/Helper.kt',
        'src/components/core/Foo/platforms/android/__tests__/Helper.kt',
        'src/components/core/Foo/platforms/android/README.md',
      ];
      const pkg = packagedKotlin(withTests);
      expect(pkg).toHaveLength(41);
      expect(pkg.some((p) => p.startsWith('dist/'))).toBe(false);
      expect(pkg.some((p) => isTestKotlin(p))).toBe(false);
      expect(isTestKotlin('src/components/core/Foo/platforms/android/FooTest.kt')).toBe(true);
      expect(isTestKotlin('src/components/core/Foo/platforms/android/Foo.android.kt')).toBe(false);
    });
  });
});

describe('probe-kotlin: the planted non-public member (Req 2.7)', () => {
  const planted = (): ProbeInput => ({ ...fixtureInput(PLANTED), provider: false });

  it('declares the member `internal` in the fixture tokens file, and the index names it', () => {
    const kt = fs.readFileSync(path.join(PLANTED, 'DesignTokens.android.kt'), 'utf8');
    expect(kt).toMatch(/^\s+internal val space_planted = /m);
    expect(kt).toMatch(/^\s+val space_public = /m);
    const names = collectIndexNames(readProbeIndex(path.join(PLANTED, 'token-index'))).map((n) => n.name);
    expect(names).toEqual(['space_planted', 'space_public']);
  });

  it('reads both members, so the index count is 2 of 2 and the planted one is left to the compiler', () => {
    const out = generateProbe(planted());
    expect(out.groups).toEqual({ index: { m: 2, n: 2 }, instances: { m: 0, n: 0 }, product: { m: 0, n: 0 }, provider: { m: 0, n: 0 } });
    expect(statements(out.files).map((r) => probeArg(r.code)).sort()).toEqual(['DesignTokens.space_planted', 'DesignTokens.space_public']);
    expect(Object.keys(out.files)).toEqual(['ProbeTokens.kt']);
  });

  it('places the probe in a package of its own, outside the reserved ones, so a module boundary stands between it and the tokens', () => {
    expect(generateProbe(planted()).files['ProbeTokens.kt']).toContain('package dpharness.probe');
    expect(PROBE_PACKAGE).not.toMatch(/^com\.designerpunk/);
  });
});

describe('probe-kotlin: the readers and the command line', () => {
  it('reads every product yaml in a folder, with its path and parsed document, sorted by name', () => {
    const files = readProductFiles(path.join(CONSUMER, 'product', 'tokens'));
    expect(files.map((f) => f.path)).toEqual(['brand-colors.yaml', 'harness.yaml']);
    expect((files[0].doc as { tokens: object }).tokens).toEqual({ spaceUnit: { value: 4, unitType: 'logical' } });
  });

  it('gives no product file for a missing folder', () => {
    expect(readProductFiles(path.join(CONSUMER, 'nope'))).toEqual([]);
  });

  it('writes src/*.kt and probe-expected.txt from a consumer root\'s manifest, and exits 0', () => {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'probe-kotlin-'));
    try {
      const lines: string[] = [];
      expect(main(['--consumer', CONSUMER, '--out', out], (l) => lines.push(l))).toBe(0);
      expect(fs.readdirSync(path.join(out, 'src')).sort()).toEqual(['ProbeFamily.kt', 'ProbeProduct.kt', 'ProbeThemeInstances.kt', 'ProbeThemeLocal.kt', 'ProbeTokens.kt']);
      expect(fs.readFileSync(path.join(out, 'probe-expected.txt'), 'utf8')).toMatch(/^index-names=8\ninstances=8\nproduct=3\nprovider=5\nfiles=/);
      expect(lines.join('\n')).toMatch(/index 8, instances 8, product 3, provider 5/);
      fs.writeFileSync(path.join(out, 'src', 'Stale.kt'), 'x');
      expect(main(['--consumer', CONSUMER, '--out', out], () => undefined)).toBe(0);
      expect(fs.existsSync(path.join(out, 'src', 'Stale.kt'))).toBe(false);
    } finally {
      fs.rmSync(out, { recursive: true, force: true });
    }
  });

  it('exits 2 on a usage error and 1 on an unreadable consumer, saying why', () => {
    const lines: string[] = [];
    expect(main(['--consumer', CONSUMER], (l) => lines.push(l))).toBe(2);
    expect(main(['--bogus'], (l) => lines.push(l))).toBe(2);
    expect(main(['--consumer', path.join(FIXTURES, 'missing'), '--out', os.tmpdir()], (l) => lines.push(l))).toBe(1);
    expect(lines.join('\n')).toMatch(/usage/);
    expect(lines.join('\n')).toMatch(/probe-kotlin: .*harness-consumer\.json/);
  });

  it('writeProbe returns the files it wrote, sorted', () => {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'probe-kotlin-w-'));
    try {
      const written = writeProbe(out, generateProbe({ ...fixtureInput(PLANTED), provider: false }));
      expect(written.map((f) => path.basename(f))).toEqual(['ProbeTokens.kt']);
    } finally {
      fs.rmSync(out, { recursive: true, force: true });
    }
  });
});

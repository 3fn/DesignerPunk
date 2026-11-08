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
  INFRA_FILE,
  RESOLVED_MARKER,
  RESOLVE_ARGS,
  RESOLVE_LOG,
  buildChecks,
  buildRunFiles,
  assertOneCopyPerName,
  classifyResolveFailure,
  defaultNameVerdict,
  removeTopLevelName,
  runDefaultName,
  topLevelNameCount,
  main as laneMain,
  type DefaultNameInputs,
  resolveAndReport,
  resolveFailureRunFiles,
  resolveStep,
  duplicateBaseNames,
  isTestKotlin,
  packagedKotlin,
  parseToolchain,
  type GradleRun,
  type GradleRunner,
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
  const GROUPS_OK = generateProbe(fixtureInput()).groups;
  const roots = { gen: '/w/gen', pkg: '/w/pkg', probe: '/w/probe' };
  const plan = (generatedText: string, probeGroups: Plan['probeGroups'] = GROUPS_OK): Plan => ({
    laneDir: '/w/lane',
    genAbsolute: [],
    pkgAbsolute: [],
    floors: { gen: 3, pkg: 41 },
    roots,
    probeReads: { indexNames: 0, totalReads: 0 },
    probeGroups,
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

  describe('while :tokens fails (the probe is blocked)', () => {
    const failed = ['> Task :tokens:compileDebugKotlin', 'e: file:///w/gen/DesignTokens.android.kt:1:1 Boom.', '> Task :tokens:compileDebugKotlin FAILED'].join('\n');
    const blockedRun: GradleRun = { log: `${failed}\nBUILD FAILED in 3s\n`, exitCode: 1 };

    it('counts the markers in the probe source the lane generated, with detail `blocked`, and still runs the instance check', () => {
      const checks = buildChecks(plan(okText), blockedRun);
      expect(checks.map((c) => [c.name, c.ok, c.detail])).toEqual([
        ['probe: read index names', true, 'blocked'],
        ['probe: instances read', true, 'blocked'],
        ['probe: product read', true, 'blocked'],
        ['probe: provider read', true, 'blocked'],
        ['theme instances', true, '4 of 4 as the shared module gives (BaseLight, BaseDark, WcagLight, WcagDark)'],
      ]);
    });

    it('still writes ok: false for a group whose generated source holds fewer reads than the inputs call for', () => {
      const short = { ...GROUPS_OK, product: { m: 3, n: 2 } };
      const checks = buildChecks(plan(okText, short), blockedRun);
      expect(checks.filter((c) => !c.ok)).toEqual([{ name: 'probe: product read', ok: false, detail: 'blocked: 2 of 3' }]);
    });

    it('runs the instance check regardless: a bad holder fails, and generated code with neither declaration is `not checked`', () => {
      const bad = fs.readFileSync(path.join(HOLDER, 'empty.kt'), 'utf8');
      expect(buildChecks(plan(bad), blockedRun).filter((c) => !c.ok).map((c) => c.name)).toEqual(['theme instances']);
      const neither = fs.readFileSync(path.join(HOLDER, 'neither.kt'), 'utf8');
      const last = buildChecks(plan(neither), blockedRun).slice(-1)[0];
      expect(last).toEqual({ name: 'theme instances', ok: true, detail: 'not checked' });
    });

    it('never writes an empty checks array for the token context', () => {
      expect(buildChecks(plan(okText), blockedRun)).toHaveLength(5);
    });
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

// ─── Task 19.1: the resolve step, the marker and the infra classifier ────────────────────────────

describe('probe-kotlin: the resolve step (Task 19.1)', () => {
  const RESOLVE = path.join(FIXTURES, 'resolve');
  /** A fixture's log (its `#harness-fixture` lines stripped) and the expectation its header states. */
  const fixture = (name: string): { log: string; expect: string } => {
    const text = fs.readFileSync(path.join(RESOLVE, name), 'utf8').split('\n');
    const expectLine = text.find((l) => l.startsWith('#harness-fixture expect: ')) ?? '';
    return { log: text.filter((l) => !l.startsWith('#harness-fixture ')).join('\n'), expect: expectLine.slice('#harness-fixture expect: '.length) };
  };
  const shape = (c: ReturnType<typeof classifyResolveFailure>): string => (c.kind === 'infra' ? `infra ${c.host} ${c.status} ${c.step}` : 'ordinary');

  describe('classifyResolveFailure', () => {
    it('classifies the log cut from run 42379456009 (job 128424053186) as infra, with its host and status', () => {
      const { log, expect: want } = fixture('resolve-403-cut.txt');
      expect(fs.readFileSync(path.join(RESOLVE, 'resolve-403-cut.txt'), 'utf8')).toMatch(/run 42379456009.*job 128424053186/);
      expect(classifyResolveFailure(log)).toEqual({ kind: 'infra', host: 'repo.maven.apache.org', status: 403, step: 'plugins' });
      expect(shape(classifyResolveFailure(log))).toBe(want);
    });

    it.each([
      ['resolve-429.txt', 'a 429 from the plugin portal'],
      ['resolve-503.txt', 'a 503 from Google Maven'],
      ['resolve-unknown-host.txt', 'an unknown host while the wrapper downloads the distribution'],
    ])('classifies %s as infra (%s)', (name) => {
      const { log, expect: want } = fixture(name);
      expect(shape(classifyResolveFailure(log))).toBe(want);
    });

    it('names the registry host for a transport failure, and the phase that failed', () => {
      expect(classifyResolveFailure(fixture('resolve-429.txt').log)).toEqual({ kind: 'infra', host: 'plugins.gradle.org', status: 429, step: 'plugins' });
      expect(classifyResolveFailure(fixture('resolve-503.txt').log)).toEqual({ kind: 'infra', host: 'dl.google.com', status: 503, step: 'dependencies' });
      expect(classifyResolveFailure(fixture('resolve-unknown-host.txt').log)).toEqual({ kind: 'infra', host: 'services.gradle.org', status: 'unknown-host', step: 'wrapper' });
    });

    it.each([
      ['resolve-404.txt', 'a 404 from Maven Central'],
      ['resolve-could-not-find.txt', 'a "Could not find" coordinate'],
    ])('classifies %s as ordinary (%s)', (name) => {
      const c = classifyResolveFailure(fixture(name).log);
      expect(c.kind).toBe('ordinary');
      expect(shape(c)).toBe(fixture(name).expect);
      if (c.kind === 'ordinary') expect(c.detail.length).toBeGreaterThan(0);
    });

    it('lets any ordinary signal win over an infra fault in the same log, so a real defect cannot hide behind a 403', () => {
      const mixed = `${fixture('resolve-403-cut.txt').log}\n> Could not find org.example:missing:1.0.\n`;
      expect(classifyResolveFailure(mixed).kind).toBe('ordinary');
      const noVariant = `${fixture('resolve-503.txt').log}\n   > No matching variant of org.example:lib:1.0 was found.\n`;
      expect(classifyResolveFailure(noVariant).kind).toBe('ordinary');
    });

    it('treats a 403 from a host that is not a registry as ordinary, and a log with no fault in it as ordinary', () => {
      const other = fixture('resolve-429.txt').log.replace(/plugins\.gradle\.org/g, 'artifacts.example.com');
      expect(classifyResolveFailure(other).kind).toBe('ordinary');
      expect(classifyResolveFailure('FAILURE: Build failed with an exception.\n\n* What went wrong:\nA problem occurred.\n').kind).toBe('ordinary');
      expect(classifyResolveFailure('').kind).toBe('ordinary');
    });

    it('reads a connection refused or timeout from a registry as infra, and from anything else as ordinary', () => {
      const refused = [
        '* What went wrong:', 'Execution failed for task \':resolveAll\'.', "   > Could not resolve a:b:1.",
        "      > Could not GET 'https://repo1.maven.org/maven2/a/b/1/b-1.pom'.", '         > Connect to repo1.maven.org:443 [repo1.maven.org/1.2.3.4] failed: Connection refused',
      ].join('\n');
      expect(classifyResolveFailure(refused)).toEqual({ kind: 'infra', host: 'repo1.maven.org', status: 'network', step: 'dependencies' });
      expect(classifyResolveFailure(refused.replace(/repo1\.maven\.org/g, 'corp.example.com')).kind).toBe('ordinary');
      expect(classifyResolveFailure(refused.replace('Connection refused', 'Read timed out')).kind).toBe('infra');
    });
  });

  describe('resolveStep and the marker', () => {
    const tmp = (): string => fs.mkdtempSync(path.join(os.tmpdir(), 'resolve-step-'));
    const ok: GradleRun = { log: 'BUILD SUCCESSFUL in 4s\n', exitCode: 0 };

    it('writes resolved.ok after a successful (fake) resolve, and no infra.json', () => {
      const work = tmp();
      try {
        expect(resolveStep(work, ok)).toEqual({ kind: 'ok' });
        expect(fs.existsSync(path.join(work, RESOLVED_MARKER))).toBe(true);
        expect(fs.existsSync(path.join(work, INFRA_FILE))).toBe(false);
        expect(fs.readFileSync(path.join(work, RESOLVE_LOG), 'utf8')).toBe(ok.log);
      } finally {
        fs.rmSync(work, { recursive: true, force: true });
      }
    });

    it('leaves resolved.ok absent after a failed resolve, and removes a stale one', () => {
      const work = tmp();
      try {
        fs.writeFileSync(path.join(work, RESOLVED_MARKER), '');
        fs.writeFileSync(path.join(work, INFRA_FILE), '{}');
        const failed: GradleRun = { log: fixture('resolve-403-cut.txt').log, exitCode: 1 };
        expect(resolveStep(work, failed).kind).toBe('infra');
        expect(fs.existsSync(path.join(work, RESOLVED_MARKER))).toBe(false);
        expect(JSON.parse(fs.readFileSync(path.join(work, INFRA_FILE), 'utf8'))).toEqual({ host: 'repo.maven.apache.org', status: 403, step: 'plugins' });
        expect(resolveStep(work, { log: fixture('resolve-404.txt').log, exitCode: 1 }).kind).toBe('ordinary');
        expect(fs.existsSync(path.join(work, RESOLVED_MARKER))).toBe(false);
        expect(fs.existsSync(path.join(work, INFRA_FILE))).toBe(false);
      } finally {
        fs.rmSync(work, { recursive: true, force: true });
      }
    });
  });

  describe('resolveAndReport: what the lane does between prepare and the compile', () => {
    const stub = (): Plan => ({
      laneDir: '/w/lane', genAbsolute: [], pkgAbsolute: [], floors: { gen: 3, pkg: 41 },
      roots: { gen: '/w/gen', pkg: '/w/pkg', probe: '/w/probe' }, probeReads: { indexNames: 0, totalReads: 0 },
      probeGroups: generateProbe(fixtureInput()).groups, config: probeConfigFromManifest(manifest(CONSUMER)), generatedText: '',
    });
    const run = (log: string, exitCode: number, seen: string[][] = []): GradleRunner => (_dir, _lane, args) => {
      seen.push([...(args ?? [])]);
      return { log, exitCode };
    };
    const withWork = (fn: (work: string) => void): void => {
      const work = fs.mkdtempSync(path.join(os.tmpdir(), 'resolve-report-'));
      try {
        fn(work);
      } finally {
        fs.rmSync(work, { recursive: true, force: true });
      }
    };

    it('on success runs only the resolve task, writes the marker, and goes on to compile', () => {
      withWork((work) => {
        const seen: string[][] = [];
        const lines: string[] = [];
        expect(resolveAndReport({ work, plan: stub(), androidDir: '/a' }, run('ok', 0, seen), (l) => lines.push(l))).toEqual({ proceed: true });
        expect(seen).toEqual([[...RESOLVE_ARGS]]);
        expect(fs.existsSync(path.join(work, RESOLVED_MARKER))).toBe(true);
      });
    });

    it('on an infra fault writes infra.json, writes no run file, and exits non-zero (so no harness-verdict is written)', () => {
      withWork((work) => {
        const lines: string[] = [];
        const r = resolveAndReport({ work, plan: stub(), androidDir: '/a' }, run(fixture('resolve-403-cut.txt').log, 1), (l) => lines.push(l));
        expect(r).toEqual({ proceed: false, code: 1 });
        expect(JSON.parse(fs.readFileSync(path.join(work, INFRA_FILE), 'utf8'))).toEqual({ host: 'repo.maven.apache.org', status: 403, step: 'plugins' });
        expect(fs.readdirSync(work).filter((n) => n.startsWith('run-'))).toEqual([]);
        expect(fs.existsSync(path.join(work, RESOLVED_MARKER))).toBe(false);
        expect(lines).toContain('harness-infra: repo.maven.apache.org 403 plugins');
      });
    });

    it('on an ordinary failure writes both run files with a failing resolve check and no compile, and exits 0', () => {
      withWork((work) => {
        const r = resolveAndReport({ work, plan: stub(), androidDir: '/a' }, run(fixture('resolve-could-not-find.txt').log, 1), () => undefined);
        expect(r).toEqual({ proceed: false, code: 0 });
        expect(fs.existsSync(path.join(work, INFRA_FILE))).toBe(false);
        expect(fs.existsSync(path.join(work, RESOLVED_MARKER))).toBe(false);
        for (const context of ['harness-android-tokens', 'harness-android-components']) {
          const file = JSON.parse(fs.readFileSync(path.join(work, `run-${context}.json`), 'utf8'));
          expect(file.checks).toHaveLength(1);
          expect(file.checks[0]).toMatchObject({ name: 'resolve', ok: false });
          expect(file.checks[0].detail).toMatch(/Could not find/);
          expect(file.gradle).toEqual({ log: RESOLVE_LOG, exitCode: 1 });
          expect(file.files.gen.compiled).toBe(0);
        }
      });
    });

    it('resolveFailureRunFiles gives the component context both tiers at zero compiled', () => {
      const files = resolveFailureRunFiles(stub(), { log: '', exitCode: 1 }, 'x');
      expect(files['harness-android-components'].files).toEqual({ gen: { compiled: 0, floor: 3 }, pkg: { compiled: 0, floor: 41 } });
      expect(files['harness-android-tokens'].files).toEqual({ gen: { compiled: 0, floor: 3 } });
    });
  });
});

// ─── The default-name compile (Task 20, U7a) ─────────────────────────────────────────────────────

describe('the default-name verdict (Task 20)', () => {
  const EVIDENCE = path.join(__dirname, '..', '..', '..', '.kiro', 'specs', '129-consumer-generation-completeness', 'evidence', '2026-11-07-mp4-default-name-run');
  // Data's committed log at c09b9be27 (a local run, self-attested), and the files beside it.
  const LOG = fs.readFileSync(path.join(EVIDENCE, 'gradle-tokens-and-probefamily.txt'), 'utf8');
  const PROBE = fs.readFileSync(path.join(EVIDENCE, 'ProbeFamily.kt'), 'utf8');
  const SPELLED_OUT = fs.readFileSync(path.join(EVIDENCE, 'consumer.designerpunk.config.spelled-out-reference.ts'), 'utf8');
  const NAME_UNSET = fs.readFileSync(path.join(EVIDENCE, 'consumer.designerpunk.config.ts'), 'utf8');

  const base = (): DefaultNameInputs => ({
    log: LOG,
    exitCode: 0,
    roots: { gen: '/c/dist/tokens', pkg: '/w/no-package', probe: '/w/lane/src' },
    probeSources: ['/w/lane/src/ProbeFamily.kt'],
    probeName: 'DesignerPunk',
    probeSource: PROBE,
    writtenKt: 3,
    resolved: { name: 'DesignerPunk', abbreviation: 'HX', themes: [{ name: 'dark', mode: 'dark' }, { name: 'wcag', mode: 'light' }] },
    configText: NAME_UNSET,
  });
  const TOKENS_HEADER = '> Task :tokens:compileDebugKotlin\n';
  const verdictOf = (changes: Partial<DefaultNameInputs>) => defaultNameVerdict({ ...base(), ...changes });
  const failsWith = (changes: Partial<DefaultNameInputs>, reason: RegExp): void => {
    const v = verdictOf(changes);
    expect(v.pass).toBe(false);
    expect(v.failures.join(' | ')).toMatch(reason);
    expect(v.line).toMatch(/^default-name: FAIL /);
  };

  it('passes on the committed MP-4 log with that run\'s other inputs', () => {
    const v = verdictOf({});
    expect(v.failures).toEqual([]);
    expect(v.pass).toBe(true);
    expect(v.line).toBe(
      'default-name: PASS name=DesignerPunk abbreviation=HX probe-name=DesignerPunk tokens=succeeded probe=succeeded keyed=0 unrooted=0 unattributed=0 warnings=0 gen=3 provider read 5 of 5',
    );
  });

  it('counts a planted w: line and still passes', () => {
    const v = verdictOf({ log: LOG.replace(TOKENS_HEADER, `${TOKENS_HEADER}w: file:///c/dist/tokens/DesignTokens.android.kt:3:1 Deprecated\n`) });
    expect(v.pass).toBe(true);
    expect(v.line).toContain('warnings=1');
  });

  describe('fails, once each, on', () => {
    it('one planted located e: line', () => {
      failsWith({ log: LOG.replace(TOKENS_HEADER, `${TOKENS_HEADER}e: file:///c/dist/tokens/DesignTokens.android.kt:3:1 Unresolved reference 'X'.\n`) }, /1 keyed diagnostic/);
    });
    it(':tokens FAILED with exit 1 and only an unlocated e: line', () => {
      failsWith({ exitCode: 1, log: LOG.replace(TOKENS_HEADER, '> Task :tokens:compileDebugKotlin FAILED\ne: The compiler crashed\n').replace('BUILD SUCCESSFUL', 'BUILD FAILED') }, /:tokens:compileDebugKotlin failed/);
    });
    it('one e: line whose path is under no root', () => {
      failsWith({ log: LOG.replace(TOKENS_HEADER, `${TOKENS_HEADER}e: file:///elsewhere/X.kt:1:1 Boom\n`) }, /1 unrooted diagnostic/);
    });
    it('no :tokens:compileDebugKotlin outcome', () => {
      failsWith({ log: LOG.replace(TOKENS_HEADER, '') }, /:tokens:compileDebugKotlin not-run/);
    });
    it('no :probe:compileDebugKotlin outcome', () => {
      failsWith({ log: LOG.replace('> Task :probe:compileDebugKotlin\n', '') }, /:probe:compileDebugKotlin not-run/);
    });
    it('a log with no closing BUILD line', () => {
      failsWith({ log: LOG.replace(/BUILD SUCCESSFUL.*\n?/, '') }, /no closing BUILD line/);
    });
    it('gen=0', () => {
      failsWith({ log: LOG.replace('gen=3', 'gen=0'), writtenKt: 0 }, /gen=0, expected at least 1/);
    });
    it('gen=2 against 3 written', () => {
      failsWith({ log: LOG.replace('gen=3', 'gen=2') }, /gen=2 against 3/);
    });
    it('a probe given a file besides ProbeFamily.kt', () => {
      failsWith({ probeSources: ['/w/lane/src/ProbeFamily.kt', '/w/lane/src/ProbeTokens.kt'] }, /\[ProbeFamily\.kt, ProbeTokens\.kt\]/);
    });
    it('no provider read line', () => {
      failsWith({ log: LOG.replace(/^probe: provider read .*\n/m, '') }, /no `provider read` line/);
    });
    it('provider read 0 of 0', () => {
      failsWith({ log: LOG.replace('provider read 5 of 5', 'provider read 0 of 0') }, /m=0, expected 5/);
    });
    it('provider read 4 of 5', () => {
      failsWith({ log: LOG.replace('provider read 5 of 5', 'provider read 4 of 5') }, /provider read 4 of 5/);
    });
    it('a run whose only provider read is the default DesignerPunkTheme { }', () => {
      const onlyDefault = PROBE.split('\n').filter((l) => !l.includes('// @provider ') || l.includes('@provider default')).join('\n');
      failsWith({ probeSource: onlyDefault, log: LOG.replace('provider read 5 of 5', 'provider read 1 of 1') }, /no provider read is a `family =` call/);
    });
    it('a log and probe source named for HarnessConsumer', () => {
      failsWith(
        { log: LOG.replace(/DesignerPunk/g, 'HarnessConsumer'), probeSource: PROBE.replace(/DesignerPunk/g, 'HarnessConsumer'), probeName: 'HarnessConsumer' },
        /provider read\(s\) do not name DesignerPunkTheme/,
      );
    });
    it('a resolved name of HarnessConsumer', () => {
      failsWith({ resolved: { ...base().resolved, name: 'HarnessConsumer' } }, /resolved name HarnessConsumer, expected DesignerPunk/);
    });
    it('a resolved abbreviation of DP', () => {
      failsWith({ resolved: { ...base().resolved, abbreviation: 'DP' } }, /resolved abbreviation DP, expected HX/);
    });
    it('a config copy that still declares a top-level name', () => {
      failsWith({ configText: SPELLED_OUT }, /still declares a top-level name/);
    });
  });

  describe('the config copy', () => {
    it('loses the top-level name and keeps every other line (abbreviation, the theme entries\' name: keys)', () => {
      const out = removeTopLevelName(SPELLED_OUT);
      expect(topLevelNameCount(SPELLED_OUT)).toBe(1);
      expect(topLevelNameCount(out)).toBe(0);
      expect(out.split('\n')).toEqual(SPELLED_OUT.split('\n').filter((l) => l !== "  name: 'DesignerPunk',"));
      expect(out).toContain("abbreviation: 'HX'");
      expect(out).toContain("{ name: 'dark', mode: 'dark'");
      expect(out).toContain("{ name: 'wcag', mode: 'light'");
    });
    it('matches the evidence run\'s own name-unset config', () => {
      expect(removeTopLevelName(SPELLED_OUT)).toBe(NAME_UNSET);
    });
    it('refuses a config with no top-level name', () => {
      expect(() => removeTopLevelName(NAME_UNSET)).toThrow(/0 top-level `name`/);
    });
  });

  describe('the option\'s one default-name: line', () => {
    const countLines = (lines: string[]): number => lines.filter((l) => l.startsWith('default-name:')).length;

    it('a setup failure prints FAIL setup, once', () => {
      const lines: string[] = [];
      const work = fs.mkdtempSync(path.join(os.tmpdir(), 'dn-work-'));
      const code = laneMain(['--default-name', '--consumer', path.join(work, 'missing'), '--work', path.join(work, 'out')], (l) => lines.push(l));
      expect(code).toBe(1);
      expect(countLines(lines)).toBe(1);
      expect(lines[lines.length - 1]).toMatch(/^default-name: FAIL setup \(/);
      fs.rmSync(work, { recursive: true, force: true });
    });
    it('a usage error prints one line too', () => {
      const lines: string[] = [];
      expect(laneMain(['--default-name', '--work', '/tmp/x'], (l) => lines.push(l))).toBe(2);
      expect(countLines(lines)).toBe(1);
      expect(lines[0]).toMatch(/^default-name: FAIL setup \(usage:/);
    });
    it('runDefaultName names the step that failed when the config has no top-level name to remove', () => {
      const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dn-consumer-'));
      fs.writeFileSync(path.join(root, 'harness-consumer.json'), JSON.stringify({ packageRoot: 'node_modules/@3fn/core' }));
      fs.writeFileSync(path.join(root, 'designerpunk.config.ts'), NAME_UNSET);
      const lines: string[] = [];
      const r = runDefaultName({ repoRoot: path.resolve(__dirname, '..', '..', '..'), consumer: root, work: path.join(root, 'out'), tempRoot: os.tmpdir(), log: (l) => lines.push(l) });
      expect(r.code).toBe(1);
      expect(r.line).toMatch(/^default-name: FAIL setup \(config: the config declares 0 top-level `name` properties/);
      expect(countLines(lines)).toBe(0);
      fs.rmSync(root, { recursive: true, force: true });
    });
  });
});

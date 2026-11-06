/**
 * probe-kotlin.test.ts — Spec 129 Task 4, subtask 4.2 (criterion: "asserts, over a fixture index carrying
 * `theme.` names and a fixture consumer config, that `probe-kotlin.ts` emits one read per `theme.`-named
 * colour semantic through `LocalDPTheme.current` and one through each `<Name>Themes` member, plus one read
 * per product-token fixture member, all inside `@Composable`, from the index and the config alone, with no
 * `harness/android/**` change needed when item (i) emits").
 *
 * The fixtures are `fixtures/kotlin/consumer/` (the manifest-shaped config, a token index, two product-token
 * files) and `fixtures/kotlin/planted-internal/` (Req 2.7's planted non-public member).
 *
 * What this file does NOT show: that the emitted Kotlin compiles. No Gradle toolchain has run it. It checks
 * the shape of what is emitted. Which theme instances a probe reads is open (Ada's proposal is in a consult
 * round); the member-set cases below state the CURRENT rule and are the cases to change with it.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  CHUNK_SIZE,
  LOCAL_THEME,
  PROBE_PACKAGE,
  ProbeIndex,
  collectIndexNames,
  generateProbe,
  main,
  probeConfigFromManifest,
  productObjectName,
  readProbeIndex,
  readProductTokenCategories,
  themeMemberNames,
  writeProbe,
} from '../probe-kotlin';

const FIXTURES = path.join(__dirname, 'fixtures', 'kotlin');
const CONSUMER = path.join(FIXTURES, 'consumer');
const PLANTED = path.join(FIXTURES, 'planted-internal');

function manifest(dir: string): unknown {
  return JSON.parse(fs.readFileSync(path.join(dir, 'harness-consumer.json'), 'utf8'));
}

function fixtureInput(dir: string = CONSUMER) {
  return {
    index: readProbeIndex(path.join(dir, 'token-index')),
    config: probeConfigFromManifest(manifest(dir)),
    productTokens: readProductTokenCategories(path.join(dir, 'product', 'tokens')),
  };
}

/** Every `probe(...)` line of every file: { file, expression, marker }. */
function reads(files: Readonly<Record<string, string>>): Array<{ file: string; expression: string; marker: string }> {
  const out: Array<{ file: string; expression: string; marker: string }> = [];
  for (const [file, text] of Object.entries(files)) {
    for (const line of text.split('\n')) {
      const m = /^\s+probe\((.+)\) \/\/ (@.+)$/.exec(line);
      if (m) out.push({ file, expression: m[1], marker: m[2] });
    }
  }
  return out;
}

const MEMBERS = ['BaseLight', 'BaseDark', 'Dark', 'WcagLight', 'WcagDark'];

describe('probe-kotlin: the fixture index and config', () => {
  const out = generateProbe(fixtureInput());
  const all = reads(out.files);
  const exprs = all.map((r) => r.expression);

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
    expect(out.expectedIndexNames).toBe(8);
    expect(out.indexReads).toBe(8);
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

  it('reads each theme.-named colour semantic once through LocalDPTheme.current', () => {
    const local = all.filter((r) => r.expression.startsWith(`${LOCAL_THEME}.current.`)).map((r) => r.expression).sort();
    expect(local).toEqual([`${LOCAL_THEME}.current.color_action_primary`, `${LOCAL_THEME}.current.color_text_default`]);
    expect(LOCAL_THEME).toBe('LocalDPTheme');
  });

  it('reads each theme.-named colour semantic once through each <Name>Themes member, named by the config name', () => {
    expect(themeMemberNames(probeConfigFromManifest(manifest(CONSUMER)))).toEqual(MEMBERS);
    for (const member of MEMBERS) {
      for (const prop of ['color_action_primary', 'color_text_default']) {
        const hits = exprs.filter((e) => e === `HarnessConsumerThemes.${member}.${prop}`);
        expect(hits).toHaveLength(1);
      }
    }
    expect(all.filter((r) => r.marker.startsWith('@instance '))).toHaveLength(2 * MEMBERS.length);
    expect(out.themeMembers).toEqual(MEMBERS);
  });

  it('uses DesignerPunk\'s fixed binding name, not the consumer\'s abbreviation (HX)', () => {
    const text = Object.values(out.files).join('\n');
    expect(text).not.toMatch(/LocalHX|HXTheme/);
    expect(text).not.toContain('HarnessConsumerTheme.'); // the instances come from <Name>Themes
  });

  it('reads one member per product-token fixture member that is on Android, by file-name category', () => {
    const product = all.filter((r) => r.marker.startsWith('@product ')).map((r) => r.expression).sort();
    expect(product).toEqual(['ProductBrandColors.spaceUnit', 'ProductHarness.actionPrimaryRef', 'ProductHarness.bodyTypographyRef']);
    expect(exprs).not.toContain('ProductHarness.webOnly');
    expect(productObjectName('brand-colors')).toBe('ProductBrandColors');
  });

  it('counts its reads: the index names once each, plus the instance and product reads', () => {
    expect(out.totalReads).toBe(8 /* index */ + 2 * MEMBERS.length /* instances */ + 3 /* product */);
    expect(all).toHaveLength(out.totalReads);
    expect(all.filter((r) => r.marker.startsWith('@index '))).toHaveLength(out.indexReads);
  });

  it('puts every read inside a @Composable function, each function being @Composable but the one helper', () => {
    for (const [file, text] of Object.entries(out.files)) {
      const lines = text.split('\n');
      let inFunction: { composable: boolean; name: string } | null = null;
      lines.forEach((line, i) => {
        const fn = /^(?:private )?(?:inline )?fun (\w+)\(/.exec(line);
        if (fn) {
          const composable = lines[i - 1] === '@Composable';
          if (fn[1] === 'probe') expect(line).toBe('private inline fun probe(value: Any?) {}');
          else expect({ file, fn: fn[1], composable }).toEqual({ file, fn: fn[1], composable: true });
          inFunction = { composable, name: fn[1] };
        }
        if (/^\s+probe\(/.test(line)) {
          expect(inFunction).not.toBeNull();
          expect(inFunction && inFunction.composable).toBe(true);
        }
        if (line === '}') inFunction = null;
      });
      expect(text).toContain('import androidx.compose.runtime.Composable');
      expect(text).toContain(`package ${PROBE_PACKAGE}`);
    }
  });

  it('writes the product-token reads in their own file, importing the product package only there', () => {
    expect(Object.keys(out.files).sort()).toEqual(['ProbeProduct.kt', 'ProbeThemeInstances.kt', 'ProbeThemeLocal.kt', 'ProbeTokens.kt']);
    expect(out.files['ProbeProduct.kt']).toContain('import com.designerpunk.product.tokens.*');
    expect(out.files['ProbeTokens.kt']).not.toContain('com.designerpunk.product.tokens');
    expect(out.files['ProbeTokens.kt']).toContain('import com.designerpunk.tokens.*');
  });

  it('writes probe-expected.txt for the :probe module\'s count task', () => {
    expect(out.expectedText).toBe(`index-names=8\nreads=${out.totalReads}\nfiles=ProbeProduct.kt,ProbeThemeInstances.kt,ProbeThemeLocal.kt,ProbeTokens.kt\n`);
  });

  it('is deterministic, and independent of the order the index and the product files list their entries', () => {
    const input = fixtureInput();
    const reversed = {
      ...input,
      index: {
        primitives: Object.fromEntries(Object.entries(input.index.primitives).reverse()),
        semantics: Object.fromEntries(Object.entries(input.index.semantics).reverse()),
        components: Object.fromEntries(Object.entries(input.index.components).reverse()),
      } as ProbeIndex,
      productTokens: [...input.productTokens].reverse().map((c) => ({ ...c, tokens: [...c.tokens].reverse() })),
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
      semantics: {
        ...input.index.semantics,
        'color.surface.raised': { category: 'color', platforms: { android: 'theme.color_surface_raised' } },
      },
    };
    const out = generateProbe({ ...input, index: withNew });
    const exprs = reads(out.files).map((r) => r.expression);
    expect(exprs).toContain('LocalDPTheme.current.color_surface_raised');
    for (const member of MEMBERS) expect(exprs).toContain(`HarnessConsumerThemes.${member}.color_surface_raised`);
    expect(out.expectedIndexNames).toBe(9);
  });

  it('reads a newly registered theme\'s instances: <Theme>Light and <Theme>Dark for both, <Theme> for one mode', () => {
    const input = fixtureInput();
    const config = { ...input.config, themes: [...input.config.themes, { name: 'brand', mode: 'both' as const }, { name: 'night', mode: 'dark' as const }] };
    expect(themeMemberNames(config)).toEqual([...MEMBERS, 'BrandLight', 'BrandDark', 'Night']);
    const exprs = reads(generateProbe({ ...input, config }).files).map((r) => r.expression);
    expect(exprs).toContain('HarnessConsumerThemes.BrandLight.color_text_default');
    expect(exprs).toContain('HarnessConsumerThemes.Night.color_action_primary');
  });

  it('uses the manifest\'s name for <Name>Themes', () => {
    const input = fixtureInput();
    const exprs = reads(generateProbe({ ...input, config: { ...input.config, name: 'Acme' } }).files).map((r) => r.expression);
    expect(exprs).toContain('AcmeThemes.BaseLight.color_text_default');
  });

  it('writes no theme file, and counts no theme instance, when the index names no theme', () => {
    const input = fixtureInput();
    const noThemes: ProbeIndex = {
      ...input.index,
      semantics: Object.fromEntries(Object.entries(input.index.semantics).filter(([, e]) => !String(e.platforms?.android).startsWith('theme.'))),
    };
    const out = generateProbe({ ...input, index: noThemes });
    expect(Object.keys(out.files)).not.toContain('ProbeThemeLocal.kt');
    expect(Object.keys(out.files)).not.toContain('ProbeThemeInstances.kt');
    expect(out.themeMembers).toEqual([]);
    expect(out.expectedIndexNames).toBe(6);
  });

  it('reads an absent manifest `themes` as none (the base instances only)', () => {
    const config = probeConfigFromManifest({ name: 'HarnessConsumer' });
    expect(config.themes).toEqual([]);
    expect(themeMemberNames(config)).toEqual(['BaseLight', 'BaseDark']);
  });
});

describe('probe-kotlin: chunking and refusals', () => {
  it(`splits a file's reads into private composables of at most ${CHUNK_SIZE}, all called by the public entry`, () => {
    const primitives: Record<string, { platforms: { android: string } }> = {};
    for (let i = 0; i < 120; i++) primitives[`p${i}`] = { platforms: { android: `space_${String(i).padStart(3, '0')}` } };
    const out = generateProbe({ index: { primitives, semantics: {}, components: {} }, config: { name: 'X', themes: [] }, productTokens: [] });
    const text = out.files['ProbeTokens.kt'];
    expect(text).toContain('fun ProbeTokens() {\n    ProbeTokens00()\n    ProbeTokens01()\n    ProbeTokens02()\n}');
    expect(text.match(/^private fun ProbeTokens\d\d\(\)/gm)).toHaveLength(3);
    expect(reads(out.files)).toHaveLength(120);
    expect(out.expectedIndexNames).toBe(120);
  });

  it('counts a name that two entries share once', () => {
    const out = generateProbe({
      index: {
        primitives: { a: { platforms: { android: 'space_100' } }, b: { platforms: { android: 'space_100' } } },
        semantics: {},
        components: {},
      },
      config: { name: 'X', themes: [] },
      productTokens: [],
    });
    expect(out.expectedIndexNames).toBe(1);
    expect(reads(out.files)).toHaveLength(1);
  });

  it('refuses a name that is not a Kotlin identifier path, rather than writing code from it', () => {
    const bad = (android: unknown) => () => generateProbe({
      index: { primitives: { a: { platforms: { android } as never } }, semantics: {}, components: {} },
      config: { name: 'X', themes: [] },
      productTokens: [],
    });
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

  it('refuses a theme mode or a config name that would write bad Kotlin', () => {
    const input = fixtureInput();
    expect(() => generateProbe({ ...input, config: { name: 'has space', themes: [] } })).toThrow(/config name is not a Kotlin identifier/);
    expect(() => generateProbe({ ...input, config: { name: 'X', themes: [{ name: 'x', mode: 'sepia' as never }] } })).toThrow(/expected light, dark or both/);
    expect(() => probeConfigFromManifest({ themes: [] })).toThrow(/no `name`/);
  });
});

describe('probe-kotlin: the planted non-public member (Req 2.7)', () => {
  it('declares the member `internal` in the fixture tokens file, and the index names it', () => {
    const kt = fs.readFileSync(path.join(PLANTED, 'DesignTokens.android.kt'), 'utf8');
    expect(kt).toMatch(/^\s+internal val space_planted = /m);
    expect(kt).toMatch(/^\s+val space_public = /m);
    const names = collectIndexNames(readProbeIndex(path.join(PLANTED, 'token-index'))).map((n) => n.name);
    expect(names).toEqual(['space_planted', 'space_public']);
  });

  it('reads both members, so the read count is 2 of 2 and the planted one is left to the compiler', () => {
    const out = generateProbe(fixtureInput(PLANTED));
    expect(out.expectedIndexNames).toBe(2);
    expect(out.indexReads).toBe(2);
    expect(reads(out.files).map((r) => r.expression).sort()).toEqual(['DesignTokens.space_planted', 'DesignTokens.space_public']);
    expect(Object.keys(out.files)).toEqual(['ProbeTokens.kt']);
  });

  it('places the probe in a package of its own, outside the reserved ones, so a module boundary stands between it and the tokens', () => {
    const out = generateProbe(fixtureInput(PLANTED));
    expect(out.files['ProbeTokens.kt']).toContain('package dpharness.probe');
    expect(PROBE_PACKAGE).not.toMatch(/^com\.designerpunk/);
  });
});

describe('probe-kotlin: the readers and the command line', () => {
  it('takes the product category from the file name, not the YAML category field', () => {
    const categories = readProductTokenCategories(path.join(CONSUMER, 'product', 'tokens'));
    expect(categories.map((c) => c.name)).toEqual(['brand-colors', 'harness']);
    expect(categories.find((c) => c.name === 'brand-colors')?.tokens).toEqual([{ name: 'spaceUnit', platforms: undefined }]);
  });

  it('gives no product category for a missing folder', () => {
    expect(readProductTokenCategories(path.join(CONSUMER, 'nope'))).toEqual([]);
  });

  it('writes src/*.kt and probe-expected.txt from a consumer root\'s manifest, and exits 0', () => {
    const out = fs.mkdtempSync(path.join(os.tmpdir(), 'probe-kotlin-'));
    try {
      const lines: string[] = [];
      expect(main(['--consumer', CONSUMER, '--out', out], (l) => lines.push(l))).toBe(0);
      expect(fs.readdirSync(path.join(out, 'src')).sort()).toEqual(['ProbeProduct.kt', 'ProbeThemeInstances.kt', 'ProbeThemeLocal.kt', 'ProbeTokens.kt']);
      expect(fs.readFileSync(path.join(out, 'probe-expected.txt'), 'utf8')).toMatch(/^index-names=8\nreads=\d+\nfiles=/);
      expect(lines.join('\n')).toMatch(/8 index names/);
      // a second run replaces a stale file
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
      const written = writeProbe(out, generateProbe(fixtureInput(PLANTED)));
      expect(written.map((f) => path.basename(f))).toEqual(['ProbeTokens.kt']);
    } finally {
      fs.rmSync(out, { recursive: true, force: true });
    }
  });
});

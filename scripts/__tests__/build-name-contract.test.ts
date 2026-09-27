/**
 * @category evergreen
 * @purpose Spec 123 Task 6 — `build-name-contract.ts` (design.md § "C7" name contract;
 * DD10, DD17; P1 ruled YES; test id `build-name-contract.test.ts`).
 *
 * Two layers:
 *  - SYNTHETIC worlds (hermetic): each failure mode of the build — bundle ⊆ src,
 *    an unrecorded dynamic site, the own-index check — proven to fail loudly.
 *  - The REAL compiled surface (needs `npm run build` — tsc + build:browser + the
 *    generated token CSS): the committed SITE_RECORD matches the scan, the expected
 *    dispositions hold, P1's filter holds, and the own-index bite
 *    (`--border-border-default`) fails with the message routed to Lina.
 */

import * as fs from 'fs';
import * as path from 'path';
import {
  buildNameContract,
  readBuildInputs,
  extractBundleReferences,
  scanDynamicSites,
  SITE_RECORD,
  OWN_INDEX_ROUTE,
  siteKey,
  PROJECT_ROOT,
  BUNDLE_REL,
} from '../build-name-contract';
import type { BuildInputs, TypeContract } from '../build-name-contract';

const TC: TypeContract = { hash: 'sha256:fixture', members: [] };

/** A one-component synthetic world: src/components/core/Demo-Base/ + its inlined CSS. */
function world(opts: { css: string; ts?: string; extraBundle?: string; record?: BuildInputs['siteRecord'] }): BuildInputs {
  const cssRel = 'src/components/core/Demo-Base/platforms/web/DemoBase.web.css';
  const tsRel = 'src/components/core/Demo-Base/platforms/web/DemoBase.web.ts';
  const tsText = opts.ts ?? "export const x = 1;\n";
  const bundle =
    `// css-as-string:/abs/checkout/${cssRel}\nvar DemoBase_default = ${JSON.stringify(opts.css)};\n` +
    `// ${tsRel}\n${tsText}\n${opts.extraBundle ?? ''}`;
  const files: Record<string, string> = { [cssRel]: opts.css, [tsRel]: tsText };
  return {
    bundle,
    designTokensCss: ':root {\n  --space-100: 8px;\n  --space-grouped-normal: var(--space-100);\n  --color-a: #fff;\n}\n',
    componentTokensCss: ':root {\n  --demo-size: var(--space-100);\n}\n',
    indexDocs: {
      primitive: { space100: { platforms: { web: '--space-100' } } },
      semantic: {
        'space.grouped.normal': { platforms: { web: '--space-grouped-normal' } },
        'color.a': { platforms: { web: '--color-a' } },
      },
      component: { 'demo.size': { component: 'Demo', platforms: { web: '--demo-size' } } },
    },
    readSource: (rel) => files[rel],
    componentSources: Object.entries(files).map(([rel, text]) => ({ rel, text })),
    siteRecord: opts.record ?? [],
    resolvers: {},
    schemaTokens: { 'Demo-Base': { spacing: ['space.grouped.normal'] } },
    typeContract: TC,
  };
}

describe('build-name-contract — synthetic worlds (each failure is loud)', () => {
  it('design bite row: add a var(--x) to a component CSS → it appears in the contract; bundle ⊆ src holds', () => {
    const before = buildNameContract(world({ css: '.a { gap: var(--space-grouped-normal); }' }));
    expect(before.errors).toEqual([]);
    expect(before.contract!.referencedNames.map((r) => r.name)).toEqual(['--space-100', '--space-grouped-normal']);

    const after = buildNameContract(world({ css: '.a { gap: var(--space-grouped-normal); color: var(--color-a); }' }));
    expect(after.errors).toEqual([]);
    const added = after.contract!.referencedNames.find((r) => r.name === '--color-a');
    expect(added).toMatchObject({ tier: 'semantic', token: 'color.a', value: '#fff', usedBy: ['Demo-Base'] });
  });

  it('bundle ⊆ src: a bundle-only name FAILS the build (esbuild synthesized/interpolated it)', () => {
    const r = buildNameContract(world({ css: '.a { gap: var(--space-grouped-normal); }', extraBundle: 'const s = "var(--color-a)";' }));
    expect(r.contract).toBeUndefined();
    expect(r.errors).toEqual([
      `name-contract bundle ⊆ src: '--color-a' is in ${BUNDLE_REL} but in no bundled source module — esbuild synthesized or interpolated it. Refusing to build.`,
    ]);
  });

  it('a name inside a CSS comment is not a reference (esbuild inlines component CSS with its comments)', () => {
    const r = buildNameContract(world({ css: '/* uses var(--color-a) */ .a { gap: var(--space-grouped-normal); }' }));
    expect(r.errors).toEqual([]);
    expect(r.contract!.referencedNames.map((x) => x.name)).not.toContain('--color-a');
  });

  it('OWN-INDEX CHECK: a static reference absent from OUR generated CSS fails the build, routed to Lina', () => {
    const r = buildNameContract(world({ css: '.a { border-width: var(--border-border-default); }' }));
    expect(r.contract).toBeUndefined();
    expect(r.errors).toHaveLength(1);
    expect(r.errors[0]).toContain("'--border-border-default' is referenced by Demo-Base");
    expect(r.errors[0]).toContain(OWN_INDEX_ROUTE);
  });

  it('component-internal: a property the component defines itself is excluded, not an own-index failure', () => {
    const r = buildNameContract(world({ css: ':host { --_demo-gap: var(--space-100); } .a { gap: var(--_demo-gap); }' }));
    expect(r.errors).toEqual([]);
    expect(r.contract!.excluded).toContainEqual(expect.objectContaining({ name: '--_demo-gap', class: 'component-tier', kind: 'component-internal' }));
  });

  it('component tier is EXCLUDED by P1 (recorded with its reason), never in referencedNames', () => {
    const r = buildNameContract(world({ css: '.a { width: var(--demo-size); }' }));
    expect(r.errors).toEqual([]);
    expect(r.contract!.referencedNames.map((x) => x.name)).toEqual(['--space-100']); // via ComponentTokens.web.css var()
    expect(r.contract!.excluded).toContainEqual(expect.objectContaining({ name: '--demo-size', class: 'component-tier', kind: 'component-token' }));
  });

  it('an UNRECORDED dynamic site fails the build; recording it (with a disposition) clears it', () => {
    const ts = 'export const f = (c: string) => `var(--${c})`;\n';
    const unrecorded = buildNameContract(world({ css: '.a{}', ts }));
    expect(unrecorded.contract).toBeUndefined();
    expect(unrecorded.errors.join('\n')).toMatch(/UNRECORDED DYNAMIC SITE: src\/components\/core\/Demo-Base\/platforms\/web\/DemoBase\.web\.ts:1 .*pattern: var\(--\$\{/);

    const recorded = buildNameContract(
      world({
        css: '.a{}',
        ts,
        record: [
          {
            file: 'src/components/core/Demo-Base/platforms/web/DemoBase.web.ts',
            text: 'export const f = (c: string) => `var(--${c})`;',
            component: 'Demo-Base',
            dispositions: [{ class: 'uncovered', reason: 'fixture' }],
          },
        ],
      }),
    );
    expect(recorded.errors).toEqual([]);
    expect(recorded.contract!.notChecked).toEqual([{ component: 'Demo-Base', site: expect.stringContaining('DemoBase.web.ts') }]);
  });

  it('the four scan patterns (plus helper calls) each find a site; comment lines are not sites', () => {
    const text = [
      'a = `var(--${x})`;',
      'b = `--${x}`;',
      'c = s.getPropertyValue(`--a-${x}`);',
      "d = '--' + x;",
      'e = tokenToCssVar(t);',
      '// f = `var(--${x})`;',
      ' * g = `var(--${x})`',
    ].join('\n');
    const sites = scanDynamicSites([{ rel: 'src/components/core/X/x.ts', text }]);
    expect(sites.map((s) => s.line)).toEqual([1, 2, 3, 4, 5]);
    const expected = ['var(--${', '`--${', 'getPropertyValue(`', "'--' +", 'helper-call'];
    sites.forEach((s, i) => expect(s.patterns).toContain(expected[i]));
  });

  it('partial names before an interpolation/concatenation are sites too (the bare patterns miss them)', () => {
    const text = ['a = `var(--chip-${v})`;', 'b = `--chip-${v}`;', "c = '--chip-' + v;"].join('\n');
    const sites = scanDynamicSites([{ rel: 'src/components/core/X/x.ts', text }]);
    expect(sites.map((s) => s.patterns[0])).toEqual(['var(--${', '`--${', "'--' +"]);
  });

  it('extractBundleReferences: cut names are not references; complete literals are', () => {
    const b = 'const a = `var(--x-${y})`; const b = "--whole"; const c = `--part-${z}-end`; const d = "var(--ok)";';
    const r = extractBundleReferences(b);
    expect([...r.varNames]).toEqual(['--ok']);
    expect([...r.literalNames]).toEqual(['--whole']);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// The real compiled surface
// ─────────────────────────────────────────────────────────────────────────────

describe('build-name-contract — the real compiled surface', () => {
  const inputs = readBuildInputs(PROJECT_ROOT);
  const real = buildNameContract(inputs);

  it('builds clean: no errors, and the counts are non-trivial', () => {
    expect(real.errors).toEqual([]);
    const c = real.contract!.counts;
    expect(c.bundledModules).toBeGreaterThan(50);
    expect(c.referencedSemantic).toBeGreaterThan(100);
    expect(c.referencedPrimitive).toBeGreaterThan(20);
  });

  it('P1: referencedNames carry only semantic and primitive tiers; the component tier is excluded with its reason', () => {
    const tiers = new Set(real.contract!.referencedNames.map((r) => r.tier));
    expect([...tiers].sort()).toEqual(['primitive', 'semantic']);
    const ct = real.contract!.excluded.filter((e) => e.kind === 'component-token');
    expect(ct.length).toBeGreaterThan(0);
    for (const e of ct) expect(e.reason).toMatch(/excluded by P1/);
  });

  it('the committed SITE_RECORD equals the scan exactly (no unrecorded site, no stale entry)', () => {
    const scanned = scanDynamicSites(inputs.componentSources).map(siteKey).sort();
    expect(SITE_RECORD.map(siteKey).sort()).toEqual(scanned);
  });

  it('the expected-today dispositions hold (located by content; line drift attributed in the completion doc)', () => {
    const sites = real.contract!.dynamicSites;
    const at = (file: string, text: string, occurrence = 1) =>
      sites.find((s) => s.file.endsWith(file) && s.text === text && s.occurrence === occurrence)!.dispositions.map((d) => d.class);
    // ContainerCardBase:166 (closed map) → (i)
    expect(at('ContainerCardBase.web.ts', 'const cssVarName = tokenToCssCustomProperty(tokenName);')).toEqual(['closed']);
    // token-mapping.ts closed maps → (i)
    expect(at('token-mapping.ts', 'return `padding: ${tokenToCssVar(tokenName)}`;')).toEqual(['closed']);
    expect(at('token-mapping.ts', 'return `z-index: ${tokenToCssVar(tokenName)}`;')).toEqual(['closed']);
    // ProgressPaginationBase:232 → (ii)
    expect(at('ProgressPaginationBase.web.ts', 'const stride = parseFloat(cs.getPropertyValue(`--progress-node-size-${size}-current`));')).toEqual(['component-tier']);
    // IconBase:200/:476 → (iii)
    expect(at('IconBase.web.ts', 'strokeColor = `var(--${color})`;', 1)).toEqual(['consumer-supplied']);
    expect(at('IconBase.web.ts', 'strokeColor = `var(--${color})`;', 2)).toEqual(['consumer-supplied']);
    // ContainerBase:224 → (iii)
    expect(at('ContainerBase.web.ts', 'const cssVarName = tokenToCssCustomProperty(background);')).toEqual(['consumer-supplied']);
    // token-mapping.ts typed props → (iii), the borderColor default resolved as (i)
    expect(at('token-mapping.ts', 'return `background: ${tokenToCssVar(color)}`;')).toEqual(['consumer-supplied']);
    expect(at('token-mapping.ts', 'const colorVar = borderColor ? tokenToCssVar(borderColor) : tokenToCssVar(BORDER_COLOR_TOKEN);')).toEqual([
      'consumer-supplied',
      'closed',
    ]);
    // Nothing is uncovered today.
    expect(real.contract!.notChecked).toEqual([]);
  });

  it('class (i) names and (iii) defaults resolve into referencedNames (own-index checked)', () => {
    const names = new Map(real.contract!.referencedNames.map((r) => [r.name, r]));
    for (const n of ['--z-index-modal', '--radius-050', '--color-structure-surface-tertiary', '--shadow-container', '--color-text-subtle']) {
      expect(names.has(n)).toBe(true);
    }
    // Icon-Base defaults are attributed to the component that SUPPLIES them.
    expect(names.get('--color-text-subtle')!.usedBy).toContain('Input-Text-Base');
  });

  it('component-internal properties (the --_ convention, JS-set --chrome-offset, blend-computed --_itp-hover-bg) are excluded with their reason', () => {
    const internal = new Map(real.contract!.excluded.filter((e) => e.kind === 'component-internal').map((e) => [e.name, e]));
    expect(internal.has('--_itp-hover-bg')).toBe(true);
    expect(internal.has('--chrome-offset')).toBe(true);
    expect([...internal.keys()].filter((n) => !n.startsWith('--_'))).toEqual(['--chrome-offset']);
    expect(internal.get('--_itp-hover-bg')!.reason).toMatch(/defined or set by the component itself/);
  });

  it('OWN-INDEX BITE: re-introduce --border-border-default in the Container-Base map → the build FAILS, routed to Lina', () => {
    const mapping = require(path.join(PROJECT_ROOT, 'src/components/core/Container-Base/platforms/web/token-mapping'));
    const broken: BuildInputs = {
      ...inputs,
      resolvers: {
        ...inputs.resolvers,
        'Container-Base.borderTokenMap': () => ({
          component: 'Container-Base',
          names: ['border.border.default', 'border.emphasis', 'border.heavy'].map(mapping.tokenToCssCustomProperty),
        }),
      },
    };
    const r = buildNameContract(broken);
    expect(r.contract).toBeUndefined();
    expect(r.errors).toEqual([
      expect.stringMatching(/^name-contract OWN-INDEX CHECK: '--border-border-default' is referenced by Container-Base \(site Container-Base/),
    ]);
    expect(r.errors[0]).toContain(OWN_INDEX_ROUTE);
  });

  it('a seventh site added to component source is caught at build, not missed', () => {
    const withSeventh: BuildInputs = {
      ...inputs,
      componentSources: [
        ...inputs.componentSources,
        { rel: 'src/components/core/Chip-Base/platforms/web/ChipBase.web.ts', text: 'const v = `var(--chip-${variant})`;' },
      ],
    };
    const r = buildNameContract(withSeventh);
    expect(r.contract).toBeUndefined();
    expect(r.errors.some((e) => e.includes('UNRECORDED DYNAMIC SITE') && e.includes('var(--chip-${variant})'))).toBe(true);
  });

  it('the written dist/name-contract.json (when present) is the current build', () => {
    const p = path.join(PROJECT_ROOT, 'dist/name-contract.json');
    expect(fs.existsSync(p)).toBe(true);
    const onDisk = JSON.parse(fs.readFileSync(p, 'utf8'));
    expect(onDisk.referencedNames).toEqual(real.contract!.referencedNames);
    expect(onDisk.typeContract).toEqual(real.contract!.typeContract);
  });
});

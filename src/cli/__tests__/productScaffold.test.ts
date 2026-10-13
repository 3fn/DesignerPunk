/**
 * @category evergreen
 * @purpose Spec 123 Task 22.3 (Lina's share) — the `product/` scaffold `init` places (design.md C27 erratum;
 * tasks.md Task 22's `product/` amendment): Leonardo's three files (`design-inputs/`) placed byte-equal at
 * `src/cli/templates/product/**` with the hashes his record names; `init`'s one substitution
 * (`__PRODUCT_NAME__`); the scaffold mechanics (kept on collision, recorded `generated`); and the VALIDITY GUARD
 * run here against the real `ProductIndexer` and the real package components: status `healthy` (zero warnings),
 * zero `_componentGaps`, every referenced template exists, honest status fields. The guard's TWO BITES:
 * (1) a misspelled component → a `not-found` gap, proving gap detection is live; (2) a missing referenced
 * template → the guard's own existence check. The same guard runs from the PACKED install, right after `init` and
 * before `generate`, in `tests/consumer-integration.test.ts`.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import {
  PRODUCT_NAME_PLACEHOLDER,
  PRODUCT_SCAFFOLD_SOURCE,
  listProductScaffoldFiles,
  productScaffoldContent,
  runInit,
} from '../init';
import { resolvePackageRoot } from '../shared/resolvePackageRoot';

/** The slice of `ProductIndexer` the guard reads. `require`d, not imported: `product-mcp-server/src` is outside the root `tsconfig`'s `rootDir`, so a typed import would fail `tsc`. */
interface IndexerLike {
  index(): Promise<void>;
  getHealth(): unknown;
  getCatalogSize(): number;
  getScreenSpecs(): Map<string, Record<string, unknown>>;
  getAllGaps(): Map<string, Array<{ component: string; issue: string }>>;
  getTemplates(): Array<Record<string, unknown>>;
  getTemplateScreens(name: string): string[];
  getReverseIndexes(): { domainObjectToScreens: Map<string, unknown> };
  getDomainObject(name: string): unknown;
  getOneOffComponents(): Map<string, unknown>;
  getOverview(): Record<string, unknown> | null;
}
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ProductIndexer } = require('../../../product-mcp-server/src/indexer/ProductIndexer') as {
  ProductIndexer: new (productDir: string, componentRoots: string[]) => IndexerLike;
};

const PKG_ROOT = resolvePackageRoot(path.join(__dirname, '..'));
const SPEC = path.join(PKG_ROOT, '.kiro/specs/123-consumer-distribution');
const INPUTS = path.join(SPEC, 'design-inputs');
const RECORD = fs.readFileSync(path.join(INPUTS, 'example-home.record.md'), 'utf8');

/** scaffold-relative path (under `product/`) → the design-input file Leonardo authored it as. */
const SOURCES: Record<string, string> = {
  'experience-map/pages/example-home.yaml': 'example-home.yaml',
  'templates/home-layout.yaml': 'home-layout.yaml',
  'overview.yaml': 'overview.yaml',
};

const gitBlobSha = (buf: Buffer) => crypto.createHash('sha1').update(`blob ${buf.length}\0`).update(buf).digest('hex');
const scaffoldBytes = (rel: string) => fs.readFileSync(path.join(PKG_ROOT, PRODUCT_SCAFFOLD_SOURCE, rel));
const tmp = () => fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-product-')));

// ---------------------------------------------------------------------------
// The guard — one function, used for the green case and for both bites.
// ---------------------------------------------------------------------------

/**
 * Violations of the scaffold's validity bar over `productDir`; `[]` = the bar holds. Binds (design C27 erratum):
 * index status `healthy` (zero warnings); zero `_componentGaps`; gap detection LIVE (a non-empty catalog); the
 * example screen indexed; every template (and domain-object) name a screen references exists; honest status
 * fields (iOS and Android `not-started`).
 */
async function guardProductTree(productDir: string, componentRoots: string[]): Promise<string[]> {
  const violations: string[] = [];
  const indexer = new ProductIndexer(productDir, componentRoots);
  await indexer.index();
  const health = indexer.getHealth() as { status: string; warnings: string[] };
  if (health.status !== 'healthy') violations.push(`status is ${health.status}, not healthy`);
  if (health.warnings.length > 0) violations.push(`warnings: ${health.warnings.join(' | ')}`);
  if (indexer.getCatalogSize() === 0) violations.push('gap detection is OFF (empty component catalog)');
  const screens = [...indexer.getScreenSpecs().keys()];
  if (!screens.includes('example-home')) violations.push('example-home is not indexed');
  for (const [screen, gaps] of indexer.getAllGaps()) {
    for (const g of gaps) violations.push(`gap in ${screen}: ${g.component} (${g.issue})`);
  }
  // The guard's OWN existence limb: the indexer indexes template and domain-object names without resolving them.
  const templateNames = new Set(indexer.getTemplates().map((t) => String(t.name)));
  for (const [name, spec] of indexer.getScreenSpecs()) {
    const ref = spec.template;
    if (typeof ref === 'string' && !templateNames.has(ref)) violations.push(`${name} references template "${ref}", which does not exist`);
    const status = spec.status as Record<string, string> | undefined;
    for (const p of ['ios', 'android']) {
      if (status && status[p] !== 'not-started') violations.push(`${name}: status.${p} is "${status[p]}", not "not-started" (native is not supported)`);
    }
  }
  for (const key of indexer.getReverseIndexes().domainObjectToScreens.keys()) {
    if (!indexer.getDomainObject(key)) violations.push(`domain object "${key}" is referenced and does not exist`);
  }
  return violations;
}

/** A scaffolded `product/` tree (init's substitution applied), written without running `init`. */
function writeScaffold(dest: string, name = 'Test'): string {
  const productDir = path.join(dest, 'product');
  for (const rel of listProductScaffoldFiles(PKG_ROOT)) {
    const target = path.join(productDir, rel);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, productScaffoldContent(PKG_ROOT, rel, name));
  }
  return productDir;
}

const COMPONENT_ROOTS = [path.join(PKG_ROOT, 'src/components/core')];

describe('the placed scaffold (22.3: placement, equality)', () => {
  test('the scaffold source is exactly the three files Leonardo authored', () => {
    expect(listProductScaffoldFiles(PKG_ROOT).sort()).toEqual(Object.keys(SOURCES).sort());
  });

  test.each(Object.entries(SOURCES))('%s is byte-equal to design-inputs/%s', (rel, input) => {
    expect(scaffoldBytes(rel).equals(fs.readFileSync(path.join(INPUTS, input)))).toBe(true);
  });

  test.each(Object.entries(SOURCES))('%s: its git hash-object equals the hash the 22.3 record names', (rel, input) => {
    const recorded = new RegExp(`\\| \`${input}\` \\| [^|]+ \\| \`([0-9a-f]{40})\``).exec(RECORD)?.[1];
    expect(recorded).toBeDefined();
    expect(gitBlobSha(scaffoldBytes(rel))).toBe(recorded);
  });

  test('the one placeholder: once in overview.yaml, never elsewhere; the unsubstituted file still parses', () => {
    const count = (s: string) => s.split(PRODUCT_NAME_PLACEHOLDER).length - 1;
    expect(count(scaffoldBytes('overview.yaml').toString())).toBe(1);
    expect(count(scaffoldBytes('templates/home-layout.yaml').toString())).toBe(0);
    expect(count(scaffoldBytes('experience-map/pages/example-home.yaml').toString())).toBe(0);
    expect((loadYaml(scaffoldBytes('overview.yaml').toString()) as { name: string }).name).toBe(PRODUCT_NAME_PLACEHOLDER);
  });
});

describe('init scaffolds the product/ tree (22.3: mechanics)', () => {
  let scratch: string;
  let original: string;
  beforeEach(() => {
    original = process.cwd();
    scratch = tmp();
    fs.mkdirSync(path.join(scratch, '.git'));
    process.chdir(scratch);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
  });
  afterEach(() => {
    process.chdir(original);
    jest.restoreAllMocks();
    fs.rmSync(scratch, { recursive: true, force: true });
  });
  const init = (name = 'Test') => runInit(['--name', name, '--abbreviation', 'T', '--skip-agents']);
  const read = (rel: string) => fs.readFileSync(path.join(scratch, 'product', rel), 'utf8');

  test('the scaffolded files equal Leonardo\'s authored files; overview equals the authored file after substituting a fixed test name', async () => {
    await init('Test');
    expect(read('experience-map/pages/example-home.yaml')).toBe(fs.readFileSync(path.join(INPUTS, 'example-home.yaml'), 'utf8'));
    expect(read('templates/home-layout.yaml')).toBe(fs.readFileSync(path.join(INPUTS, 'home-layout.yaml'), 'utf8'));
    expect(read('overview.yaml')).toBe(fs.readFileSync(path.join(INPUTS, 'overview.yaml'), 'utf8').replace(PRODUCT_NAME_PLACEHOLDER, 'Test'));
    expect(read('overview.yaml')).not.toContain(PRODUCT_NAME_PLACEHOLDER);
  });

  test.each(['Acme', 'He said "hi" \\ ok', "O'Brien: a #product", '日本語 プロダクト'])('the substituted overview parses back to the name: %s', async (name) => {
    await init(name);
    expect((loadYaml(read('overview.yaml')) as { name: string }).name).toBe(name);
  });

  test('every file written is recorded `generated` in the manifest, with the hash of the bytes written', async () => {
    await init('Test');
    const entries = JSON.parse(fs.readFileSync(path.join(scratch, 'designerpunk.manifest.json'), 'utf8')).entries;
    for (const rel of Object.keys(SOURCES)) {
      const bytes = fs.readFileSync(path.join(scratch, 'product', rel), 'utf8');
      expect(entries[`product/${rel}`]).toEqual({ hash: crypto.createHash('sha256').update(bytes).digest('hex'), grain: 'file', origin: 'generated' });
    }
  });

  test('RED (collision): an existing product/overview.yaml is kept byte-identical and not recorded; the other files are still written', async () => {
    fs.mkdirSync(path.join(scratch, 'product'), { recursive: true });
    fs.writeFileSync(path.join(scratch, 'product/overview.yaml'), 'name: Mine\n');
    await init('Test');
    expect(read('overview.yaml')).toBe('name: Mine\n');
    const entries = JSON.parse(fs.readFileSync(path.join(scratch, 'designerpunk.manifest.json'), 'utf8')).entries;
    expect(entries['product/overview.yaml']).toBeUndefined();
    expect(fs.existsSync(path.join(scratch, 'product/experience-map/pages/example-home.yaml'))).toBe(true);
  });
});

describe('the validity guard (22.3 / design C27 erratum) — over the REAL indexer and the real package components', () => {
  let scratch: string;
  beforeEach(() => {
    scratch = tmp();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('the scaffolded tree indexes with zero violations: healthy, zero warnings, zero gaps, live gap detection, template exists, honest status', async () => {
    expect(await guardProductTree(writeScaffold(scratch), COMPONENT_ROOTS)).toEqual([]);
  });

  test('what the indexer sees: one screen, one template used by it, no domain objects, no one-off components', async () => {
    const indexer = new ProductIndexer(writeScaffold(scratch), COMPONENT_ROOTS);
    await indexer.index();
    expect([...indexer.getScreenSpecs().keys()]).toEqual(['example-home']);
    expect(indexer.getTemplateScreens('home-layout')).toEqual(['example-home']);
    expect(indexer.getReverseIndexes().domainObjectToScreens.size).toBe(0);
    expect(indexer.getOneOffComponents().size).toBe(0);
    expect((indexer.getOverview() as { platforms: { shipsFirst: string[] } }).platforms.shipsFirst).toEqual(['web']);
  });

  test('BITE (1): a misspelled component name → a `not-found` gap, so gap detection is proven live', async () => {
    const productDir = writeScaffold(scratch);
    const page = path.join(productDir, 'experience-map/pages/example-home.yaml');
    fs.writeFileSync(page, fs.readFileSync(page, 'utf8').replace('component: Button-CTA', 'component: Button-CTAA'));
    const violations = await guardProductTree(productDir, COMPONENT_ROOTS);
    expect(violations).toContain('gap in example-home: Button-CTAA (not-found)');
  });

  test('BITE (1b): with NO component root, gap detection is off and the guard says so (the reason there are two bites)', async () => {
    const violations = await guardProductTree(writeScaffold(scratch), [path.join(scratch, 'no-such-components')]);
    expect(violations).toContain('gap detection is OFF (empty component catalog)');
  });

  test('BITE (2): a missing referenced template → the guard\'s own existence check (the indexer alone reports healthy)', async () => {
    const productDir = writeScaffold(scratch);
    fs.rmSync(path.join(productDir, 'templates/home-layout.yaml'));
    const indexer = new ProductIndexer(productDir, COMPONENT_ROOTS);
    await indexer.index();
    expect((indexer.getHealth() as { status: string }).status).toBe('healthy'); // the indexer does not resolve template names
    const violations = await guardProductTree(productDir, COMPONENT_ROOTS);
    expect(violations).toContain('example-home references template "home-layout", which does not exist');
  });

  test('BITE (3): a screen claiming iOS is built → the honest-status limb', async () => {
    const productDir = writeScaffold(scratch);
    const page = path.join(productDir, 'experience-map/pages/example-home.yaml');
    fs.writeFileSync(page, fs.readFileSync(page, 'utf8').replace(/ios: not-started/, 'ios: complete'));
    const violations = await guardProductTree(productDir, COMPONENT_ROOTS);
    expect(violations.some((v) => v.includes('status.ios is "complete"'))).toBe(true);
  });
});

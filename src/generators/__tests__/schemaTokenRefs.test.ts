/**
 * @jest-environment node
 * @category evergreen
 * @purpose The schema token-name guard (ruling 2026-10-23 § 3; `.kiro/issues/2026-06-25-component-schema-token-name-drift.md`).
 *   Every `tokens:` value in every `src/components/core/<Component>/*.schema.yaml` is an EXACT,
 *   case-sensitive key of the committed token index — `primitives.yaml`, `semantics.yaml` or
 *   `components.yaml` (a component token only through `components.yaml`, under its registry key
 *   `<component lowercased>.<key>`). And every declaration that resolves is listed in that
 *   entry's `consumers`, on all three tiers. No allowlist, no case-folding, no notation
 *   normalization.
 *
 *   It reads through `readSchemaTokenRefs` / `resolveSchemaTokenRefs`, the functions the
 *   token-index consumer map is built with, so the guard and the map cannot disagree about what
 *   "resolves" means. The same check WARNS in a consumer's `generate` (`schemaTokenReport`,
 *   src/cli/designerpunk.ts) and FAILS here.
 *
 *   It reads the COMMITTED `token-index/` on purpose: a PR that declares a token before
 *   regenerating the index fails here, which prompts the regeneration.
 *
 *   Owner: Ada (token vocabulary; this exercises generateTokenIndex.ts). Lina is consulted on the
 *   test and owns every fix it fails on (the schemas).
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { readSchemaTokenRefs, resolveSchemaTokenRefs } from '../generateTokenIndex';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const COMPONENTS_ROOT = path.join(REPO_ROOT, 'src', 'components', 'core');
const INDEX_DIR = path.join(REPO_ROOT, 'token-index');

type Tier = 'primitives' | 'semantics' | 'components';
const TIERS: Tier[] = ['primitives', 'semantics', 'components'];

function loadTier(tier: Tier): Record<string, { consumers?: string[]; component?: string }> {
  return (yaml.load(fs.readFileSync(path.join(INDEX_DIR, `${tier}.yaml`), 'utf-8')) as any).tokens;
}

describe('component schema token names resolve to token-index keys (the guard)', () => {
  const index = Object.fromEntries(TIERS.map(t => [t, loadTier(t)])) as Record<Tier, ReturnType<typeof loadTier>>;
  const keys = new Set<string>(TIERS.flatMap(t => Object.keys(index[t])));
  const read = readSchemaTokenRefs([COMPONENTS_ROOT]);
  const rel = (p: string) => path.relative(REPO_ROOT, p).split(path.sep).join('/');

  it('reads every schema under src/components/core (none shadowed, none unreadable)', () => {
    const onDisk = fs.readdirSync(COMPONENTS_ROOT, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .flatMap(d => fs.readdirSync(path.join(COMPONENTS_ROOT, d.name)).filter(f => f.endsWith('.schema.yaml')));
    expect(onDisk.length).toBeGreaterThan(0);
    expect(read.schemaCount).toBe(onDisk.length);
    expect(read.unreadable.map(u => `${rel(u.schemaPath)}: ${u.reason}`)).toEqual([]);
    expect(read.refs.length).toBeGreaterThan(0);
  });

  it('every tokens: value is an exact, case-sensitive key of primitives, semantics or components', () => {
    const { unresolved } = resolveSchemaTokenRefs(read.refs, keys);
    expect(unresolved.map(r => `${rel(r.schemaPath)} tokens.${r.group}: ${r.token}`)).toEqual([]);
  });

  it('every resolving declaration lists its component in that entry\'s consumers, on all three tiers', () => {
    const missing: string[] = [];
    for (const ref of read.refs) {
      const tier = TIERS.find(t => ref.token in index[t]);
      if (!tier) continue; // unresolved — the previous test names it
      const consumers = index[tier][ref.token].consumers;
      if (!Array.isArray(consumers) || !consumers.includes(ref.component)) {
        missing.push(`${tier}.yaml ${ref.token}: consumers lacks ${ref.component} (${rel(ref.schemaPath)})`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('every component-token key is its registry key, <component lowercased>.<key>', () => {
    const malformed = Object.entries(index.components)
      .filter(([key, entry]) => !key.startsWith(`${String(entry.component).toLowerCase()}.`))
      .map(([key, entry]) => `${key} (component ${entry.component})`);
    expect(malformed).toEqual([]);
  });
});

describe('readSchemaTokenRefs / resolveSchemaTokenRefs — the rule on fixtures', () => {
  let tmp: string;

  beforeEach(() => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'schema-token-refs-'));
  });

  afterEach(() => {
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  function schema(dir: string, body: string): void {
    fs.mkdirSync(path.join(tmp, dir), { recursive: true });
    fs.writeFileSync(path.join(tmp, dir, `${dir}.schema.yaml`), body);
  }

  it('exact keys only: a case variant and a platform identifier do not resolve', () => {
    schema('Button-Icon', [
      'name: Button-Icon',
      'tokens:',
      '  component:',
      '    - buttonicon.size.small',
      '    - buttonIcon.size.small',
      '  border:',
      '    - radius.full',
      '    - radiusFull',
    ].join('\n') + '\n');
    const keys = new Set(['buttonicon.size.small', 'radius.full']);
    const { refs } = readSchemaTokenRefs([tmp]);
    const { unresolved, consumerMap } = resolveSchemaTokenRefs(refs, keys);
    expect(unresolved.map(r => r.token)).toEqual(['buttonIcon.size.small', 'radiusFull']);
    expect(consumerMap.get('buttonicon.size.small')).toEqual(['Button-Icon']);
    expect(consumerMap.get('radius.full')).toEqual(['Button-Icon']);
  });

  it('reads array and scalar groups and {reference|name} objects; an empty group declares nothing; any other value is reported', () => {
    schema('Card', [
      'name: Card',
      'tokens:',
      '  color:',
      '    - reference: color.structure.surface',
      '    - name: color.structure.border',
      '  spacing: space.inset.100',
      '  empty:',
      '  size:',
      '    - 8',
    ].join('\n') + '\n');
    const { refs } = readSchemaTokenRefs([tmp]);
    expect(refs.map(r => `${r.group}:${r.token}`)).toEqual([
      'color:color.structure.surface',
      'color:color.structure.border',
      'spacing:space.inset.100',
      'size:8',
    ]);
    const { unresolved } = resolveSchemaTokenRefs(refs, new Set(['color.structure.surface', 'color.structure.border', 'space.inset.100']));
    expect(unresolved.map(r => r.token)).toEqual(['8']);
  });

  it('an unparseable schema is reported, not skipped', () => {
    schema('Broken', 'name: Broken\ntokens:\n  color: [unclosed\n');
    const { refs, unreadable } = readSchemaTokenRefs([tmp]);
    expect(refs).toEqual([]);
    expect(unreadable).toHaveLength(1);
    expect(unreadable[0].schemaPath).toBe(path.join(tmp, 'Broken', 'Broken.schema.yaml'));
  });
});

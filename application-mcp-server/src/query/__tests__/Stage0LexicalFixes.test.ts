/**
 * Stage-0 lexical fixes for `find_components` keyword discovery
 * (.kiro/issues/2026-10-07-find-components-lexical-and-metadata-defects.md — items 1, 2, 3, 5, 6).
 *
 * Uses a SYNTHETIC corpus (tmp dir) so behavior is pinned without coupling to live metadata
 * wording. The synthetic components mirror the SHAPE of the defect record's reproductions,
 * not any external query set.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { ComponentIndexer } from '../../indexer/ComponentIndexer';
import { ComponentQueryEngine, rankCompare, countOwnNameHits, RankKey } from '../QueryEngine';

interface FixtureComponent {
  name: string;
  family: string;
  purpose: string;
  contexts?: string[];
  whenToUse?: string[];
  contracts?: Record<string, string>; // conceptKey → category
  internalOnly?: boolean;
}

const FIXTURES: FixtureComponent[] = [
  // "tabs" reproduction shape: a component that IS tabs (name) vs one that merely lists a tabs context.
  { name: 'Fx-TabStrip-Base', family: 'FxNav', purpose: 'Navigation strip for moving between sections of an app', contracts: { interaction_focusable: 'interaction' } },
  { name: 'Fx-Counter-Base', family: 'FxBadge', purpose: 'A count shown on an icon', contexts: ['navigation-tabs'] },
  // Contract-category demotion (item 5) + internal-only (item 6).
  { name: 'Fx-Node-Base', family: 'FxProgress', purpose: 'Stateful node drawn inside a progress sequence', contracts: { validation_form_integration: 'validation' }, internalOnly: true },
  { name: 'Fx-Field-Base', family: 'FxForm', purpose: 'Collect text from the user', contracts: { validation_validatable: 'validation' } },
  // Name-hit tie-break (item 3): both purposes say "strip"; only Fx-TabStrip-Base has it in its OWN name.
  { name: 'Fx-Panel-Base', family: 'FxStrip', purpose: 'A panel that can sit in a strip layout' },
];

let tmpDir: string;
let engine: ComponentQueryEngine;

function writeComponent(root: string, c: FixtureComponent): void {
  const dir = path.join(root, c.name);
  fs.mkdirSync(dir, { recursive: true });
  const schema = [
    `name: ${c.name}`,
    'type: primitive',
    `family: ${c.family}`,
    'version: "1.0.0"',
    ...(c.internalOnly ? ['internal_only: true'] : []),
    `description: "Fixture component ${c.name}"`,
    'platforms: [web]',
  ].join('\n');
  fs.writeFileSync(path.join(dir, `${c.name}.schema.yaml`), schema + '\n');
  const contracts = Object.entries(c.contracts ?? {})
    .map(([k, cat]) => `  ${k}:\n    category: ${cat}\n    description: fixture\n    behavior: fixture\n    platforms: [web]`)
    .join('\n');
  fs.writeFileSync(
    path.join(dir, 'contracts.yaml'),
    `version: "1.0.0"\ncomponent: ${c.name}\nfamily: ${c.family}\ncontracts:\n${contracts || '  {}'}\n`,
  );
  const meta = [
    `purpose: "${c.purpose}"`,
    'usage:',
    '  when_to_use:',
    ...(c.whenToUse ?? ['fixture use']).map(w => `    - "${w}"`),
    '  when_not_to_use: []',
    'contexts:',
    ...(c.contexts ?? ['forms']).map(x => `  - "${x}"`),
    'alternatives: []',
  ].join('\n');
  fs.writeFileSync(path.join(dir, 'component-meta.yaml'), meta + '\n');
}

beforeAll(async () => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stage0-lexical-'));
  for (const c of FIXTURES) writeComponent(tmpDir, c);
  const indexer = new ComponentIndexer();
  await indexer.indexComponents(tmpDir);
  engine = new ComponentQueryEngine(indexer);
});

afterAll(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

type Row = { name: string; matchConfidence?: string; rank?: number; matchedOn?: { field: string; term: string }[]; viability: { internalOnly: boolean } };
const find = (keyword: string) => engine.findComponents({ keyword }).data as Row[];

describe('item 1 — stop words', () => {
  it('stop words never appear as matched evidence', () => {
    const rows = find('a strip for a tab');
    for (const r of rows) {
      for (const e of r.matchedOn ?? []) {
        expect(['a', 'for']).not.toContain(e.term);
      }
    }
  });

  it('a keyword made only of stop words yields the `none` empty contract (not the whole catalog)', () => {
    const result = engine.findComponents({ keyword: 'to a on or off' });
    expect(result.data).toEqual([]);
    expect(result.error).toBeNull();
  });

  it('a stop word in a purpose no longer manufactures `strong` ("a" in Fx-Counter-Base purpose)', () => {
    expect(find('a')).toEqual([]);
  });
});

describe('item 2 — plural folding', () => {
  it('"tabs" matches the component named Tab… at strong and ranks it first', () => {
    const rows = find('tabs');
    expect(rows[0].name).toBe('Fx-TabStrip-Base');
    expect(rows[0].matchConfidence).toBe('strong');
    expect(rows[0].matchedOn).toEqual([{ field: 'highSignal', term: 'tab' }]);
  });
});

describe('item 3 — tier-aware rank', () => {
  it('a strong row outranks a partial row regardless of alphabet ("tabs": TabStrip strong > Counter partial)', () => {
    const rows = find('tabs');
    const strip = rows.find(r => r.name === 'Fx-TabStrip-Base')!;
    const counter = rows.find(r => r.name === 'Fx-Counter-Base')!;
    expect(counter.matchConfidence).toBe('partial');
    expect(strip.rank!).toBeLessThan(counter.rank!);
  });

  it('own-name hit breaks a tier+coverage tie ahead of alphabetical order ("strip")', () => {
    const rows = find('strip');
    // Fx-Panel-Base sorts first alphabetically and also matches "strip" high-signal
    // (purpose + family FxStrip); Fx-TabStrip-Base carries "strip" in its OWN name.
    const panel = rows.find(r => r.name === 'Fx-Panel-Base')!;
    expect(panel.matchConfidence).toBe('strong');
    expect(rows[0].name).toBe('Fx-TabStrip-Base');
  });

  it('GUARD: rankCompare order is tier, then coverage, then own-name hit, then name', () => {
    const k = (o: Partial<RankKey>): RankKey => ({ name: 'M', matchConfidence: 'strong', coverage: 0.5, nameHits: 0, ...o });
    // tier beats everything below it
    expect(rankCompare(k({ name: 'Z', matchConfidence: 'strong', coverage: 0.1 }), k({ name: 'A', matchConfidence: 'partial', coverage: 1, nameHits: 3 }))).toBeLessThan(0);
    // coverage beats name hit and name
    expect(rankCompare(k({ name: 'Z', coverage: 1, nameHits: 0 }), k({ name: 'A', coverage: 0.5, nameHits: 2 }))).toBeLessThan(0);
    // name hit beats name
    expect(rankCompare(k({ name: 'Z', nameHits: 1 }), k({ name: 'A', nameHits: 0 }))).toBeLessThan(0);
    // name is the final, fixed display order
    expect(rankCompare(k({ name: 'A' }), k({ name: 'Z' }))).toBeLessThan(0);
  });

  it('own-name hits count the component name only — a family-only hit is not a name hit', () => {
    expect(countOwnNameHits('Fx-Panel-Base', [{ field: 'highSignal', term: 'strip' }])).toBe(0);
    expect(countOwnNameHits('Fx-TabStrip-Base', [{ field: 'highSignal', term: 'strip' }])).toBe(1);
  });

  it('ranks remain 1-based and contiguous', () => {
    const rows = find('strip tab');
    expect(rows.map(r => r.rank)).toEqual(rows.map((_, i) => i + 1));
  });
});

describe('item 5 — contract category tokens are low-signal; concept suffix stays high', () => {
  it('a category word ("validation") still matches, at partial, as low-signal', () => {
    const rows = find('validation');
    const names = rows.map(r => r.name).sort();
    expect(names).toEqual(['Fx-Field-Base', 'Fx-Node-Base']);
    for (const r of rows) {
      expect(r.matchConfidence).toBe('partial');
      expect(r.matchedOn).toEqual([{ field: 'lowSignal', term: 'validation' }]);
    }
  });

  it('the concept suffix stays high-signal ("validatable" → strong; "integration" → strong)', () => {
    expect(find('validatable').find(r => r.name === 'Fx-Field-Base')!.matchConfidence).toBe('strong');
    expect(find('integration').find(r => r.name === 'Fx-Node-Base')!.matchConfidence).toBe('strong');
  });

  it('the category prefix of an interaction_* key is low-signal too ("interaction")', () => {
    const strip = find('interaction').find(r => r.name === 'Fx-TabStrip-Base')!;
    expect(strip.matchConfidence).toBe('partial');
  });
});

describe('item 6 — declared internal-only, emitted as Layer-2 viability, never filtered', () => {
  it('schema `internal_only: true` surfaces as viability.internalOnly on the result', () => {
    const node = find('node').find(r => r.name === 'Fx-Node-Base')!;
    expect(node).toBeDefined(); // NOT filtered out — the caller gates
    expect(node.viability).toEqual({ internalOnly: true });
  });

  it('components without the declaration report internalOnly: false', () => {
    const rows = engine.findComponents({}).data as Row[];
    for (const r of rows) {
      expect(r.viability.internalOnly).toBe(r.name === 'Fx-Node-Base');
    }
  });

  it('viability rides on structured-filter results too (not keyword-only)', () => {
    const rows = engine.findComponents({ category: 'validation' }).data as Row[];
    expect(rows.find(r => r.name === 'Fx-Node-Base')!.viability.internalOnly).toBe(true);
  });

  it('internal-only does not change the match tier (Layer 1 untouched)', () => {
    expect(find('integration').find(r => r.name === 'Fx-Node-Base')!.matchConfidence).toBe('strong');
  });
});

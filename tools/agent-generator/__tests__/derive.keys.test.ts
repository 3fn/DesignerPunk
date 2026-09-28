/**
 * derive.keys.test.ts — Spec 123 Task 13.5: the orphaned-key and missing-row refusals (two of
 * Task 13's nine; design C17 L2-D1, C22, DD25; design § "Testing Strategy": "orphan / missing
 * row — derive.keys.test.ts — rename a canonical heading; drop a row — both refuse").
 *
 * Named tests (registered in check-catalog.ts):
 *   - "orphaned key (nine-check) refuses a key that names no current unit or entry, with the exact string"
 *   - "missing row (nine-check) refuses a unit or entry with no explicit disposition row, with the exact string"
 * Bites: task-13-5-completion.md.
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import {
  checkDispositionKeys,
  checkOverlayKeys,
  checkRecordKeys,
  keyUniverse,
  missingRowMessage,
  orphanedKeyMessage,
  type KeyFinding,
} from '../derive';
import { SHARED_CATALOG } from '../regrounding/dispositions';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const SOURCE = 'canonical/agents/twin.md';
const FILE = 'canonical/profiles/consumer/twin.dispositions.yaml';

const CHARTER = `---
agent: twin
writeScope:
  - src/**
  - docs/**
routes:
  docs:
    - id: guide
      when: always
---
# Twin

Intro.

## Alpha

Alpha body.

## Beta

Beta body.
`;

let root: string;
const write = (rel: string, text: string): void => {
  fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
  fs.writeFileSync(path.join(root, rel), text);
};
beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'derive-keys-'));
  write(SOURCE, CHARTER);
});
afterEach(() => fs.rmSync(root, { recursive: true, force: true }));

const retained = { disposition: 'retained' };
/** A complete dispositions doc for the CURRENT source: one explicit row per unit and leaf. */
const completeRows = () => {
  const u = keyUniverse(root, SOURCE);
  return {
    source: SOURCE,
    body: Object.fromEntries(u.units.map((a) => [a, retained])),
    frontmatter: Object.fromEntries(u.entryLeaves.map((p) => [p, retained])),
  };
};
const brief = (fs_: KeyFinding[]) => fs_.map((f) => `${f.check} ${f.key}`);

describe('the key universe', () => {
  it('reads body anchors, entry-tree nodes and leaves from the canonical source', () => {
    const u = keyUniverse(root, SOURCE);
    expect(u.units).toEqual(['#twin:preamble', '#alpha', '#beta']);
    expect(u.entryLeaves).toEqual(['agent', 'writeScope[src/**]', 'writeScope[docs/**]', 'routes.docs[guide]']);
    expect([...u.entryNodes]).toEqual(expect.arrayContaining(['writeScope', 'routes', 'routes.docs']));
  });

  it('a complete, current dispositions file is clean', () => {
    expect(checkDispositionKeys(completeRows(), FILE, keyUniverse(root, SOURCE))).toEqual([]);
  });
});

describe('orphaned key', () => {
  it('orphaned key (nine-check) refuses a key that names no current unit or entry, with the exact string', () => {
    const rows = completeRows();
    // The design's bite: RENAME a canonical heading. The row keyed to the old anchor now names nothing.
    write(SOURCE, CHARTER.replace('## Beta', '## Gamma'));
    const findings = checkDispositionKeys(rows, FILE, keyUniverse(root, SOURCE));
    expect(findings.filter((f) => f.check === 'orphaned-key')).toEqual([
      {
        check: 'orphaned-key',
        file: FILE,
        key: 'body #beta',
        message: 'disposition/overlay key #beta names nothing in canonical/agents/twin.md — the unit was renamed or removed; re-key or delete the row',
      },
    ]);
    // …and the renamed unit is row-less: a rename refuses on BOTH sides (L2-D1).
    expect(brief(findings)).toEqual(['orphaned-key body #beta', 'missing-row body #gamma']);
  });

  it('refuses an orphaned frontmatter key; a container key exists (its leaf-ness is 13.1’s)', () => {
    const rows = completeRows();
    const u = keyUniverse(root, SOURCE);
    const fm = { ...rows.frontmatter, 'writeScope[scripts/**]': retained, writeScope: retained };
    expect(brief(checkDispositionKeys({ ...rows, frontmatter: fm }, FILE, u))).toEqual(['orphaned-key frontmatter writeScope[scripts/**]']);
  });

  it('refuses orphaned overlay keys (@unit and @entry)', () => {
    const u = keyUniverse(root, SOURCE);
    const f = checkOverlayKeys({ units: { '#alpha': 'x', '#delta': 'x' }, entries: { 'writeScope[src/**]': 'x', 'commands[gone]': 'x' } }, 'o.md', u);
    expect(brief(f)).toEqual(['orphaned-key overlay-unit #delta', 'orphaned-key overlay-entry commands[gone]']);
    expect(f[0].message).toBe(orphanedKeyMessage('#delta', SOURCE));
  });

  it('refuses orphaned operative-set record keys', () => {
    const u = keyUniverse(root, SOURCE);
    expect(brief(checkRecordKeys({ units: { '#alpha': {}, '#omega': {} } }, 'r.yaml', u))).toEqual(['orphaned-key record #omega']);
  });

  it('every committed operative-set record keys only current units (the live corpus has no orphan)', () => {
    const dir = path.join(REPO_ROOT, 'canonical/operative-sets');
    const records = fs.readdirSync(dir).filter((f) => f.endsWith('.yaml'));
    expect(records.length).toBeGreaterThanOrEqual(4);
    const findings = records.flatMap((f) => {
      const record = loadYaml(fs.readFileSync(path.join(dir, f), 'utf8')) as { source: string; units: Record<string, unknown> };
      return checkRecordKeys(record, f, keyUniverse(REPO_ROOT, record.source));
    });
    expect(findings).toEqual([]);
  });
});

describe('missing row', () => {
  it('missing row (nine-check) refuses a unit or entry with no explicit disposition row, with the exact string', () => {
    // The design's bite: DROP a row. Absence is never read as `retained` (DD25).
    const rows = completeRows();
    delete (rows.body as Record<string, unknown>)['#alpha'];
    delete (rows.frontmatter as Record<string, unknown>)['writeScope[docs/**]'];
    const findings = checkDispositionKeys(rows, FILE, keyUniverse(root, SOURCE));
    expect(findings).toEqual([
      {
        check: 'missing-row',
        file: FILE,
        key: 'body #alpha',
        message: "#alpha in canonical/agents/twin.md has no disposition row — every unit carries an explicit row (write 'retained' if it ships as-is)",
      },
      {
        check: 'missing-row',
        file: FILE,
        key: 'frontmatter writeScope[docs/**]',
        message: missingRowMessage('writeScope[docs/**]', SOURCE),
      },
    ]);
  });

  it('a dispositions file with no rows at all refuses every unit and leaf (7 = 3 units + 4 leaves)', () => {
    expect(checkDispositionKeys({ source: SOURCE }, FILE, keyUniverse(root, SOURCE)).map((f) => f.check)).toEqual(Array(7).fill('missing-row'));
  });

  it('an always-set file (counterpart:) needs body rows only — the identity doc’s frontmatter is dropped (C19)', () => {
    const rows = completeRows();
    const always = { source: SOURCE, counterpart: 'templates/twin.md', body: rows.body };
    expect(checkDispositionKeys(always, FILE, keyUniverse(root, SOURCE))).toEqual([]);
  });

  it('the shared-catalog file needs one row per member id', () => {
    const u = keyUniverse(REPO_ROOT, SHARED_CATALOG);
    expect(u.members.length).toBeGreaterThan(0);
    const all = Object.fromEntries(u.members.map((id) => [id, retained]));
    expect(checkDispositionKeys({ source: SHARED_CATALOG, members: all }, '_shared.dispositions.yaml', u)).toEqual([]);
    const { [u.members[0]]: _dropped, ...rest } = all;
    expect(brief(checkDispositionKeys({ source: SHARED_CATALOG, members: { ...rest, 'no-such-member': retained } }, '_shared.dispositions.yaml', u))).toEqual([
      'orphaned-key members no-such-member',
      `missing-row members ${u.members[0]}`,
    ]);
  });
});

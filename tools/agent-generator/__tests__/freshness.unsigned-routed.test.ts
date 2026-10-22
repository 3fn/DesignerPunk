/**
 * freshness.unsigned-routed.test.ts — the sweep's two lists (signing ballot 2026-10-01 § 2 clause 3,
 * erratum ratified by Peter 2026-10-21; record `.kiro/issues/archive/2026-10-17-first-signatures-not-on-stale-list.md`).
 *
 * Fixtures FU1–FU9, FU30, FU31: specified by Stacy (`fixtures.md`, burst 1, 2026-10-21), built by
 * Thurgood. Every test name starts with its fixture id; the Expected column is the assertion.
 * T-UR is `fixtures/unsigned-routed/build.ts` (rows r1–r19, Stacy's table).
 *
 * FU3 is built at the sweep's grain, not through a green `diff-guard` CLI run: on a fixture root the
 * guard's tree compare needs the whole generator input (it throws on a missing
 * `canonical/shared/skills-map.yaml`), so a fixture root can never reach exit 0. What FU3 bites —
 * the list promoted to a finding — is the guard's sweep predicate (`findings.length > 0`), asserted
 * directly; the FAIL path (FU3b) runs the CLI.
 */
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { dump as dumpYaml, load as loadYaml } from 'js-yaml';
import { splitFrontmatter } from '../frontmatter';
import { parseCutoverLedger } from '../generate';
import { partition } from '../partition';
import { formatFreshness, runFreshnessSweep, routedPopulation, type FreshnessReport } from '../regrounding/freshness';
import { parseOverlay } from '../regrounding/overlay';
import { hashText } from '../regrounding/hash';
import { classifyCharter } from '../regrounding/triviality';
import { allFiles, FULL_TABLE, idOf, RENDERED, writeTree, type RowState, type TreeSpec } from './fixtures/unsigned-routed/build';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const roots: string[] = [];
const tmpRoot = (): string => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'unsigned-routed-'));
  roots.push(d);
  return d;
};
afterAll(() => {
  for (const d of roots) fs.rmSync(d, { recursive: true, force: true });
});

const build = (spec: TreeSpec): string => {
  const root = tmpRoot();
  writeTree(root, spec);
  return root;
};
const sweep = (root: string): FreshnessReport => runFreshnessSweep(root, { tracked: allFiles(root), renderedHash: RENDERED });
const lines = (root: string): string[] => formatFreshness(sweep(root));
/** The ids under one list header in a formatted output. */
function listed(out: string[], head: 'stale' | 'unsigned-routed'): string[] {
  const i = out.findIndex((l) => l.startsWith(`${head}: `));
  expect(i).toBeGreaterThan(-1);
  const ids: string[] = [];
  for (let j = i + 1; j < out.length && out[j].startsWith('  ') && !out[j].startsWith('  ['); j += 1) ids.push(out[j].trim().split(' — ')[0]);
  return ids;
}
const ONLY = (rows: Record<string, RowState | null>): TreeSpec => ({ rows });
const R1 = { disposition: 're-pointed', keep: 1 } as RowState;
const R6 = { disposition: 'no-consumer-counterpart' } as RowState;
const R14 = { disposition: 'no-consumer-counterpart', sig: 'stale' } as RowState;

// Stacy's table, by row: which list it is on.
const UNSIGNED = ['#alpha', '#beta', '#zeta', '#eta', 'fm:writeScope[a]', 'fm:writeScope[b]'];
const STALE_ROWS = ['#iota', '#kappa'];
const RECORD_STALE = 'canonical/operative-sets/kenya.yaml#nu';

describe('FU1–FU9: the sweep emits the stale list and the unsigned-routed list (T-UR)', () => {
  const full = (): string[] => lines(build(FULL_TABLE));

  it('FU1: over Stacy\'s table, unsigned = {r1,r2,r6,r7,r8,r9}; stale = {r14,r15,r19}', () => {
    const out = full();
    expect(listed(out, 'unsigned-routed')).toEqual(UNSIGNED.map(idOf));
    expect(listed(out, 'stale')).toEqual([RECORD_STALE, ...STALE_ROWS.map(idOf)]);
  });

  const ROW_CASES: [string, string, 'unsigned' | 'stale' | 'neither'][] = [
    ['r1', '#alpha', 'unsigned'],
    ['r2', '#beta', 'unsigned'],
    ['r3', '#gamma', 'neither'],
    ['r4', '#delta', 'neither'],
    ['r5', '#epsilon', 'neither'],
    ['r6', '#zeta', 'unsigned'],
    ['r7', '#eta', 'unsigned'],
    ['r8', 'fm:writeScope[a]', 'unsigned'],
    ['r9', 'fm:writeScope[b]', 'unsigned'],
    ['r10', 'fm:tools[x]', 'neither'],
    ['r11', 'fm:model', 'neither'],
    ['r13', '#theta', 'neither'],
    ['r14', '#iota', 'stale'],
    ['r15', '#kappa', 'stale'],
    ['r16', '#lambda', 'neither'],
    ['r17', '#gone', 'neither'],
    ['r18', '#mu', 'neither'],
  ];
  it.each(ROW_CASES)('FU1 (%s, %s): on the %s list, and listed at most once', (_r, key, want) => {
    const out = full();
    const u = listed(out, 'unsigned-routed').filter((id) => id === idOf(key)).length;
    const s = listed(out, 'stale').filter((id) => id === idOf(key)).length;
    expect([u, s]).toEqual(want === 'unsigned' ? [1, 0] : want === 'stale' ? [0, 1] : [0, 0]);
  });
  it('FU1 (r19, record #nu): on the stale list as a confirmation, never unsigned', () => {
    const out = full();
    expect(out).toContain(`  ${RECORD_STALE} — confirmation`);
    expect(listed(out, 'unsigned-routed').some((id) => id.startsWith('canonical/operative-sets/'))).toBe(false);
  });

  it('FU2: r14 stale + r6 unsigned → stale {r14}, unsigned {r6}, disjoint; bytes equal across runs and across a copied root', () => {
    const a = build(ONLY({ '#iota': R14, '#zeta': R6 }));
    const out = lines(a);
    expect(listed(out, 'stale')).toEqual([idOf('#iota')]);
    expect(listed(out, 'unsigned-routed')).toEqual([idOf('#zeta')]);
    expect(lines(a)).toEqual(out);
    const b = tmpRoot();
    fs.cpSync(a, b, { recursive: true });
    expect(lines(b)).toEqual(out);
  });

  it('FU3: only r1, r6 unsigned (else clean) → PASS, findings [], the head line unchanged, then both blocks — the list is never a finding', () => {
    const r = sweep(build(ONLY({ '#alpha': R1, '#zeta': R6 })));
    expect(r.findings).toEqual([]); // the guard's sweep predicate: findings.length > 0 → FAIL
    expect(formatFreshness(r)).toEqual([
      'operative-set-freshness: PASS — 1 record(s), 13 unit(s), 1 note(s), 1 dispositions file(s), 1 overlay(s)',
      'stale: 0 row(s)',
      'unsigned-routed: 2 row(s)',
      `  ${idOf('#alpha')} — re-pointed: below-half`,
      `  ${idOf('#zeta')} — no-consumer-counterpart`,
    ]);
  });

  it('FU3b: r14 stale + r6 unsigned → diff-guard exits 1; stderr: the FAIL line, the [stale-signature] line, then both blocks', () => {
    const root = build(ONLY({ '#iota': R14, '#zeta': R6 }));
    // The CLI reads the rendered hash from a committed rendering; with none, a signed row is
    // `signature-unverifiable` — so this root's FAIL carries that line too (the sweep's own rule).
    const run = spawnSync('npx', ['tsx', 'tools/agent-generator/diff-guard.ts', '--root', root], { cwd: REPO_ROOT, encoding: 'utf8' });
    expect(run.status).toBe(1);
    const err = run.stderr.split('\n');
    expect(err).toContain('diff-guard: FAIL (operative-set-freshness)');
    const at = err.indexOf('diff-guard: FAIL (operative-set-freshness)');
    expect(err[at + 1]).toMatch(/^operative-set-freshness: FAIL — /);
    expect(err).toContain('stale: 0 row(s)'); // unverifiable is not stale: its hash cannot be read
    expect(err).toContain('unsigned-routed: 1 row(s)');
    expect(err).toContain(`  ${idOf('#zeta')} — no-consumer-counterpart`);
    // With the rendered hash supplied, the same tree's stale block names r14.
    const out = lines(root);
    expect(out.filter((l) => l.startsWith('  [stale-signature]'))).toEqual(['  [stale-signature] signature on #iota is stale — its canonical or rendered content changed since signing; re-sign or refuse']);
    expect(listed(out, 'stale')).toEqual([idOf('#iota')]);
    expect(listed(out, 'unsigned-routed')).toEqual([idOf('#zeta')]);
  }, 60_000);

  it('FU4: r1 unsigned → signed → canonical unit edited → re-signed: unsigned only; neither; stale only; neither', () => {
    const root = build(ONLY({ '#alpha': R1 }));
    const step = (): [string[], string[]] => {
      const out = lines(root);
      return [listed(out, 'unsigned-routed'), listed(out, 'stale')];
    };
    expect(step()).toEqual([[idOf('#alpha')], []]);
    writeTree(root, ONLY({ '#alpha': { ...R1, sig: 'fresh' } }));
    expect(step()).toEqual([[], []]);
    // Edit the canonical unit: the pinned canonicalHash no longer matches (re-confirm the record too,
    // so the stale entry is the signature's alone).
    const charter = path.join(root, 'canonical/agents/kenya.md');
    fs.writeFileSync(charter, fs.readFileSync(charter, 'utf8').replace('Alpha rule 4 applies here.', 'Alpha rule 4 applies here, amended.'));
    const out = lines(root);
    expect(listed(out, 'unsigned-routed')).toEqual([]);
    expect(listed(out, 'stale')).toContain(idOf('#alpha'));
    // Re-sign against the edited unit.
    const disp = path.join(root, 'canonical/profiles/consumer/kenya.dispositions.yaml');
    const doc = loadYaml(fs.readFileSync(disp, 'utf8')) as any;
    const now = runFreshnessSweep(root, { tracked: allFiles(root), renderedHash: RENDERED });
    expect(now.stale?.map((s) => s.key)).toContain('#alpha');
    const unit = partition(splitFrontmatter(fs.readFileSync(charter, 'utf8'), 'x').body).units.find((u) => u.anchor === '#alpha')!.text;
    doc.body['#alpha'].signature.canonicalHash = hashText(unit);
    fs.writeFileSync(disp, dumpYaml(doc));
    const sheet = path.join(root, 'canonical/profiles/consumer/signatures/kenya.md');
    fs.writeFileSync(sheet, fs.readFileSync(sheet, 'utf8').replace(/^canonicalHash: .*$/m, `canonicalHash: ${hashText(unit)}`));
    const after = lines(root);
    expect(listed(after, 'unsigned-routed')).toEqual([]);
    expect(listed(after, 'stale').filter((id) => id === idOf('#alpha'))).toEqual([]);
  });

  it('FU5: r17 (orphan key) and r18 (unit without a row) are on neither list; the sweep still FAILs with today\'s messages', () => {
    const r = sweep(build({ rows: { '#mu': null }, orphan: true }));
    const out = formatFreshness(r);
    expect(listed(out, 'unsigned-routed')).toEqual([]);
    expect(listed(out, 'stale')).toEqual([]);
    expect(r.findings.map((f) => f.message)).toEqual([
      'disposition/overlay key #gone names nothing in canonical/agents/kenya.md — the unit was renamed or removed; re-key or delete the row',
      '#mu in canonical/agents/kenya.md has no disposition row — every unit carries an explicit row (write \'retained\' if it ships as-is)',
    ]);
  });

  it('FU6: a retained row whose unit has items, and a retained row whose unit has none → neither list', () => {
    // #epsilon has one item; #delta has none — both retained in the clean baseline.
    const out = lines(build(ONLY({ '#epsilon': { disposition: 'retained' }, '#delta': { disposition: 'retained' } })));
    expect(listed(out, 'unsigned-routed')).toEqual([]);
    expect(listed(out, 'stale')).toEqual([]);
  });

  it('FU7: the real profile, unmodified → stale 0, unsigned 0, the head line byte-identical to its pre-change form', () => {
    const r = runFreshnessSweep(REPO_ROOT);
    const out = formatFreshness(r);
    expect(out).toEqual([out[0], 'stale: 0 row(s)', 'unsigned-routed: 0 row(s)']);
    expect(out[0]).toMatch(/^operative-set-freshness: PASS — \d+ record\(s\), \d+ unit\(s\), \d+ note\(s\), \d+ dispositions file\(s\), \d+ overlay\(s\)$/);
  });

  it('FU8: the real profile with every signature removed → unsigned = the frozen signedPopulation oracle (360 at b42874bd0), stale ∅', () => {
    const root = tmpRoot();
    for (const d of ['canonical/agents', 'canonical/always-set', 'canonical/shared', 'canonical/operative-sets', 'canonical/profiles']) {
      if (fs.existsSync(path.join(REPO_ROOT, d))) fs.cpSync(path.join(REPO_ROOT, d), path.join(root, d), { recursive: true });
    }
    // Any canonical source the dispositions files name outside those dirs (always-set docs live in .kiro/steering).
    const dispFiles = [...allFiles(root)].filter((f) => f.endsWith('.dispositions.yaml'));
    for (const f of dispFiles) {
      const doc = loadYaml(fs.readFileSync(path.join(root, f), 'utf8')) as any;
      if (!fs.existsSync(path.join(root, doc.source))) {
        fs.mkdirSync(path.dirname(path.join(root, doc.source)), { recursive: true });
        fs.copyFileSync(path.join(REPO_ROOT, doc.source), path.join(root, doc.source));
      }
      for (const sec of ['body', 'frontmatter', 'members']) for (const row of Object.values<any>(doc[sec] ?? {})) delete row.signature;
      fs.writeFileSync(path.join(root, f), dumpYaml(doc, { lineWidth: -1 }));
    }
    const r = runFreshnessSweep(root, { tracked: allFiles(root), renderedHash: () => 'sha256:' + '0'.repeat(64) });
    expect(r.stale).toEqual([]);
    const got = (r.unsignedRouted ?? []).map((x) => `${x.file} ${x.section} ${x.key}`).sort();
    const want = oracle(root).sort();
    expect(got).toEqual(want);
    expect(got.length).toBe(oraclePopulationAtMain()); // 360 at b42874bd0 (Stacy's census)
    // The 16 signed-not-routed rows of the real profile are not among them.
    const signedNotRouted = signedRowsOutsidePopulation();
    expect(signedNotRouted.length).toBe(16);
    expect(got.filter((g) => signedNotRouted.includes(g))).toEqual([]);
  }, 60_000);

  it('FU9: the line grammar — entries, headers equal to their counts, finding lines unchanged', () => {
    for (const out of [full(), lines(build(ONLY({ '#iota': R14, '#zeta': R6 })))]) {
      for (const head of ['stale', 'unsigned-routed'] as const) {
        const i = out.findIndex((l) => l.startsWith(`${head}: `));
        expect(out[i]).toMatch(/^(stale|unsigned-routed): \d+ row\(s\)$/);
        const n = Number(/(\d+) row/.exec(out[i])![1]);
        const entries = listed(out, head);
        expect(entries).toHaveLength(n);
        for (let j = i + 1; j <= i + n; j += 1) expect(out[j]).toMatch(/^ {2}\S+#\S+ — [a-z-]+(: [a-z+-]+)?$/);
      }
      const head = out[0];
      expect(head).toMatch(/^operative-set-freshness: (PASS|FAIL) — \d+ record\(s\), /);
      for (const l of out.filter((x) => x.startsWith('  ['))) expect(l).toMatch(/^ {2}\[[a-z-]+\] /);
    }
  });
});

describe('FU30–FU31: determinism, no write, the paste', () => {
  it('FU30: two tmp roots give equal bytes; the sweep writes nothing', () => {
    const a = build(FULL_TABLE);
    const b = build(FULL_TABLE);
    const before = [...allFiles(a)].sort().map((f) => `${f}\0${fs.readFileSync(path.join(a, f), 'utf8')}`);
    expect(lines(a)).toEqual(lines(b));
    expect([...allFiles(a)].sort().map((f) => `${f}\0${fs.readFileSync(path.join(a, f), 'utf8')}`)).toEqual(before);
  });

  it('FU31: the documented paste is a contiguous sub-range, and a following round\'s act ids sit in exactly one list', () => {
    const out = lines(build(ONLY({ '#iota': R14, '#zeta': R6 })));
    const from = out.findIndex((l) => l.startsWith('operative-set-freshness: '));
    const paste = out.slice(from); // through the last list entry (formatFreshness ends there)
    expect(paste[paste.length - 1]).toBe(`  ${idOf('#zeta')} — no-consumer-counterpart`);
    const stale = listed(paste, 'stale');
    const unsigned = listed(paste, 'unsigned-routed');
    for (const act of [idOf('#iota'), idOf('#zeta')]) expect([stale.includes(act), unsigned.includes(act)].filter(Boolean)).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------------------------
// FU8's oracle: a FROZEN copy of `signedPopulation` from consumer-profile.real.test.ts at
// b42874bd0 (kept here, never imported from the module under test). Common-mode caveat (Stacy's
// residual): it calls classifyCharter too, so a defect inside the floor is invisible to both.
// ---------------------------------------------------------------------------------------------
const PROFILE = 'canonical/profiles/consumer';
const IDENTITY: Record<string, string> = {
  'core-goals': 'core-goals', 'ai-collaboration-principles': 'AI-Collaboration-Principles', 'spec-feedback-protocol': 'Spec-Feedback-Protocol',
  'start-up-tasks': 'start-up-tasks', 'task-completion-protocol': 'Task-Completion-Protocol', 'agent-directory': 'Agent-Directory',
  'designerpunk-systems-overview': 'DesignerPunk-Systems-Overview', 'civitas-system-overview': 'Civitas-System-Overview',
};
function oracle(root: string): string[] {
  const read = (rel: string) => fs.readFileSync(path.join(root, rel), 'utf8');
  const LEDGER = parseCutoverLedger(fs.readFileSync(path.join(REPO_ROOT, 'canonical/cutover-ledger.yaml'), 'utf8'));
  const disp = (file: string) => loadYaml(read(file)) as any;
  const signedPopulation = (bucket: string, recName: string | undefined) => {
    const file = `${PROFILE}/${bucket}.dispositions.yaml`;
    const d = disp(file);
    const want: string[] = [];
    if (recName) {
      const r = loadYaml(read(`canonical/operative-sets/${recName}.yaml`)) as any;
      const { body } = splitFrontmatter(read(d.source), d.source);
      const units = new Map(partition(body).units.map((u) => [u.anchor, u.text] as [string, string]));
      const ov = fs.existsSync(path.join(root, `${PROFILE}/${bucket}.overlay.md`)) ? parseOverlay(read(`${PROFILE}/${bucket}.overlay.md`), bucket) : undefined;
      const rendered = new Map<string, string>();
      for (const [a, t] of units) { const row = d.body[a]; if (row.disposition === 'retained') rendered.set(a, t); if (row.disposition === 're-pointed') rendered.set(a, ov!.units[a].text); }
      for (const x of classifyCharter({ canonicalUnits: units, renderedUnits: rendered, items: new Map(Object.entries(r.units).map(([a, u]: any) => [a, u.items])), rows: new Map(Object.entries(d.body)) }) as any[])
        if (x.entered && x.verdict === 'ROUTES') want.push(`${file} body ${x.anchor}`);
    }
    for (const sec of ['body', 'frontmatter', 'members']) for (const [k, row] of Object.entries<any>(d[sec] ?? {}))
      if (row.disposition === 'no-consumer-counterpart' || row.disposition === 'superseded-by') want.push(`${file} ${sec} ${k}`);
    return want;
  };
  const BUCKETS: [string, string | undefined][] = [...LEDGER.map((a) => [a, a] as [string, string]), ['_shared', undefined], ...Object.keys(IDENTITY).map((id) => [`always-set/${id}`, id] as [string, string])];
  return [...new Set(BUCKETS.flatMap(([b, r]) => signedPopulation(b, r)))];
}
/** The routed population on the real tree (all signed there) — the count FU8 expects. */
function oraclePopulationAtMain(): number {
  return oracle(REPO_ROOT).length;
}
/** Signed rows of the real profile that are outside the routed population. */
function signedRowsOutsidePopulation(): string[] {
  const read = (rel: string) => (fs.existsSync(path.join(REPO_ROOT, rel)) ? fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8') : undefined);
  const tracked = spawnSync('git', ['ls-files', 'canonical/profiles', 'canonical/operative-sets'], { cwd: REPO_ROOT, encoding: 'utf8' }).stdout.split('\n').filter(Boolean);
  const pop = new Set(routedPopulation(read, tracked).rows.map((r) => `${r.file} ${r.section} ${r.key}`));
  const out: string[] = [];
  for (const f of tracked.filter((x) => x.endsWith('.dispositions.yaml'))) {
    const d = loadYaml(read(f)!) as any;
    for (const sec of ['body', 'frontmatter', 'members']) for (const [k, row] of Object.entries<any>(d[sec] ?? {})) if (row?.signature && !pop.has(`${f} ${sec} ${k}`)) out.push(`${f} ${sec} ${k}`);
  }
  return out;
}

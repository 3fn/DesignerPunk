/**
 * Components calibration instrument — runner
 * (charter `.kiro/issues/2026-10-17-components-calibration-instrument-charter.md` §§ 5, 6, 8, 10).
 *
 * Run from SOURCE, never from dist:
 *   cd application-mcp-server && npx tsx src/calibration/run.ts \
 *     --fixture src/calibration/__fixtures__/components-calibration-q1.json \
 *     [--verify-only] [--arms status-quo,parity,r3] [--table] [--components <dir>]
 *
 *   --verify-only  fixture hash vs the guard test's pinned value, key schema, count floors,
 *                  pre-exposure flags (stored == recomputed), every keyed component exists.
 *                  Scores nothing.
 *   --arms         runs `findComponents({ keyword })` once per scored phrase on the corpus,
 *                  re-derives each row's tier per arm, re-sorts with the shipped `rankCompare`.
 *   --table        prints the per-query table and the § 6 headline (with and without pre-exposed rows).
 *
 * The catalog-read CONTROL arm (§ 8) is specified, not run: `--arms control` exits non-zero.
 * The matcher is not changed by this file.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentIndexer, tokenizeForMatch } from '../indexer/ComponentIndexer';
import { ComponentQueryEngine, countOwnNameHits, MatchConfidence, MatchedOnEntry, rankCompare } from '../query/QueryEngine';
import { ARMS, ArmName, ARM_NAMES, RowEvidence, statusQuoArm } from './arms';
import { preExposureSources, PreExposureSource } from './preExposure';

// ---------------------------------------------------------------------------------------------
// Fixture
// ---------------------------------------------------------------------------------------------

export type KeyClass = 'positive' | 'gap' | 'dropped';

export interface FixtureKey {
  class: KeyClass;
  accept: string[];
  closestSensible: string[];
  f4: null | { siblings: string[]; finding: string };
  note: string;
}

export interface FixtureRow {
  id: string;
  seat: string;
  phrase: string;
  need: string;
  seatLabel: 'A' | 'B';
  preExposed: PreExposureSource[];
  key: FixtureKey;
}

export const CALIBRATION_DIR = __dirname;
export const REPO_ROOT = path.resolve(__dirname, '../../../');
export const DEFAULT_FIXTURE = path.join(__dirname, '__fixtures__', 'components-calibration-q1.json');
export const DEFAULT_COMPONENTS_DIR = path.join(REPO_ROOT, 'src/components/core');
export const GUARD_TEST_PATH = path.join(__dirname, '__tests__', 'componentsCalibration.guard.test.ts');

export function sha256File(p: string): string {
  return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
}

/** The single pinned hash lives in the guard test; the runner reads it from there. */
export function readPinnedHash(guardTestPath = GUARD_TEST_PATH): string | null {
  const m = fs.readFileSync(guardTestPath, 'utf8').match(/PINNED_FIXTURE_SHA256\s*=\s*'([0-9a-f]{64})'/);
  return m ? m[1] : null;
}

export function loadFixture(p: string): FixtureRow[] {
  return JSON.parse(fs.readFileSync(p, 'utf8')) as FixtureRow[];
}

export interface FixtureCounts {
  total: number;
  positives: number;
  gaps: number;
  dropped: number;
  scored: number;
  gapShare: number;
  flagged: string[];
}

export function countFixture(rows: FixtureRow[]): FixtureCounts {
  const positives = rows.filter(r => r.key.class === 'positive').length;
  const gaps = rows.filter(r => r.key.class === 'gap').length;
  const dropped = rows.filter(r => r.key.class === 'dropped').length;
  const scored = positives + gaps;
  return {
    total: rows.length,
    positives,
    gaps,
    dropped,
    scored,
    gapShare: scored === 0 ? 0 : gaps / scored,
    flagged: rows.filter(r => r.key.class !== 'dropped' && r.preExposed.length > 0).map(r => r.id),
  };
}

/** Schema, floors (§ 3), pre-exposure (§ 2) and catalog-existence checks. Returns a list of problems. */
export function validateFixture(rows: FixtureRow[], catalog?: Set<string>): string[] {
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const r of rows) {
    if (!r.id || ids.has(r.id)) problems.push(`duplicate or empty id: ${r.id}`);
    ids.add(r.id);
    if (!r.phrase || !r.need || !r.seat) problems.push(`${r.id}: phrase/need/seat missing`);
    if (r.seatLabel !== 'A' && r.seatLabel !== 'B') problems.push(`${r.id}: seatLabel must be A or B`);
    const k = r.key;
    if (!k || !['positive', 'gap', 'dropped'].includes(k.class)) { problems.push(`${r.id}: bad key class`); continue; }
    if (!k.note) problems.push(`${r.id}: key note missing`);
    if (k.class === 'positive' && k.accept.length === 0) problems.push(`${r.id}: positive with empty accept`);
    if (k.class === 'gap' && k.accept.length !== 0) problems.push(`${r.id}: gap must have accept []`);
    if (k.class === 'dropped' && !k.f4) problems.push(`${r.id}: dropped row without an f4 record`);
    if (k.class !== 'dropped' && k.f4) problems.push(`${r.id}: f4 record on a non-dropped row`);
    if (k.class !== 'gap' && k.closestSensible.length !== 0) problems.push(`${r.id}: closestSensible only on gaps`);
    const recomputed = preExposureSources(r.phrase);
    if (JSON.stringify(recomputed) !== JSON.stringify(r.preExposed)) {
      problems.push(`${r.id}: stored preExposed ${JSON.stringify(r.preExposed)} != recomputed ${JSON.stringify(recomputed)}`);
    }
    if (catalog) {
      for (const c of [...k.accept, ...k.closestSensible, ...(k.f4?.siblings ?? [])]) {
        if (!catalog.has(c)) problems.push(`${r.id}: keyed component not in catalog: ${c}`);
      }
    }
  }
  const c = countFixture(rows);
  if (c.gaps < 8) problems.push(`floor: keyed gaps ${c.gaps} < 8 (top-up needed, charter § 3)`);
  if (c.gapShare < 1 / 3) problems.push(`floor: keyed gap share ${c.gapShare.toFixed(3)} < 1/3 (top-up needed, charter § 3)`);
  return problems;
}

// ---------------------------------------------------------------------------------------------
// Evaluation
// ---------------------------------------------------------------------------------------------

export interface RankedRow { name: string; tier: MatchConfidence; rank: number }

export interface QueryRun {
  id: string;
  /** per arm: rows in that arm's rank order */
  byArm: Partial<Record<ArmName, RankedRow[]>>;
}

export async function buildEngine(componentsDir = DEFAULT_COMPONENTS_DIR): Promise<{ engine: ComponentQueryEngine; catalog: Set<string> }> {
  const indexer = new ComponentIndexer();
  await indexer.indexComponents(componentsDir);
  return { engine: new ComponentQueryEngine(indexer), catalog: new Set(indexer.getIndex().keys()) };
}

type KeywordRow = { name: string; family: string; matchedOn?: MatchedOnEntry[]; matchConfidence?: MatchConfidence; rank?: number };

/** Evidence for each returned row of one keyword query. */
export function evidenceFor(phrase: string, rows: KeywordRow[]): RowEvidence[] {
  const totalTokens = new Set(tokenizeForMatch(phrase)).size;
  return rows.map(r => {
    const matchedOn = r.matchedOn ?? [];
    return { name: r.name, family: r.family, matchedOn, matchedTokens: new Set(matchedOn.map(m => m.term)).size, totalTokens };
  });
}

/** Re-derive tiers under one arm and re-sort with the SHIPPED rankCompare (imported unchanged). */
export function rankUnderArm(evidence: RowEvidence[], arm: ArmName): RankedRow[] {
  const keyed = evidence.map(e => ({
    e,
    key: {
      name: e.name,
      matchConfidence: ARMS[arm](e),
      coverage: e.totalTokens === 0 ? 0 : e.matchedTokens / e.totalTokens,
      nameHits: countOwnNameHits(e.name, e.matchedOn),
    },
  }));
  keyed.sort((a, b) => rankCompare(a.key, b.key));
  return keyed.map((k, i) => ({ name: k.e.name, tier: k.key.matchConfidence, rank: i + 1 }));
}

export function runQueries(engine: ComponentQueryEngine, rows: FixtureRow[], arms: ArmName[]): QueryRun[] {
  const out: QueryRun[] = [];
  for (const r of rows) {
    if (r.key.class === 'dropped') continue;
    const result = engine.findComponents({ keyword: r.phrase });
    const emitted = (result.data ?? []) as KeywordRow[];
    const evidence = evidenceFor(r.phrase, emitted);
    // Harness self-check: the status-quo arm must reproduce the shipped tier AND order exactly.
    evidence.forEach((e, i) => {
      if (statusQuoArm(e) !== emitted[i].matchConfidence) {
        throw new Error(`${r.id}: status-quo arm tier ${statusQuoArm(e)} != shipped ${emitted[i].matchConfidence} for ${e.name}`);
      }
    });
    const sq = rankUnderArm(evidence, 'status-quo');
    sq.forEach((row, i) => {
      if (row.name !== emitted[i].name) throw new Error(`${r.id}: status-quo re-sort differs from shipped order at rank ${i + 1}`);
    });
    const byArm: Partial<Record<ArmName, RankedRow[]>> = {};
    for (const a of arms) byArm[a] = a === 'status-quo' ? sq : rankUnderArm(evidence, a);
    out.push({ id: r.id, byArm });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// Scoring (charter § 6 definitions)
// ---------------------------------------------------------------------------------------------

export interface ArmScore {
  positives: number;
  hit1: number;
  hit2: number;
  /** CW pairs `${id}::${component}` — a `strong` in ranks 1–3 not in the key (F6) */
  cw: Set<string>;
  /** ids of positives whose keyed component is `strong` at rank ≤ 2 */
  strongTop2: Set<string>;
  /** gap outcome per id: none | partial (labeled closest match, F5 ii) | strong (F5 iii) */
  gapOutcome: Map<string, { outcome: 'none' | 'partial' | 'strong'; top: string | null; sensible: boolean | null }>;
}

export function scoreArm(rows: FixtureRow[], runs: QueryRun[], arm: ArmName, include: (r: FixtureRow) => boolean): ArmScore {
  const byId = new Map(rows.map(r => [r.id, r]));
  const s: ArmScore = { positives: 0, hit1: 0, hit2: 0, cw: new Set(), strongTop2: new Set(), gapOutcome: new Map() };
  for (const run of runs) {
    const r = byId.get(run.id)!;
    if (!include(r)) continue;
    const ranked = run.byArm[arm] ?? [];
    const accept = new Set(r.key.accept);
    ranked.slice(0, 3).forEach(row => { if (row.tier === 'strong' && !accept.has(row.name)) s.cw.add(`${r.id}::${row.name}`); });
    if (r.key.class === 'positive') {
      s.positives++;
      if (ranked[0] && accept.has(ranked[0].name)) s.hit1++;
      if (ranked.slice(0, 2).some(x => accept.has(x.name))) s.hit2++;
      if (ranked.slice(0, 2).some(x => accept.has(x.name) && x.tier === 'strong')) s.strongTop2.add(r.id);
    } else {
      const top = ranked[0] ?? null;
      const outcome = !top ? 'none' : ranked.slice(0, 3).some(x => x.tier === 'strong') ? 'strong' : 'partial';
      s.gapOutcome.set(r.id, { outcome, top: top?.name ?? null, sensible: top ? r.key.closestSensible.includes(top.name) : null });
    }
  }
  return s;
}

export interface Acceptance {
  fixedCW: number;
  newCW: string[];
  tsl: string[];
  net: number;
  r1: [number, number];
  r2: [number, number];
  accepted: boolean;
}

/** § 6: net ≥ +3, no new CW, R@1 and R@2 not lower — arm against status quo on the same subset. */
export function acceptance(sq: ArmScore, arm: ArmScore): Acceptance {
  const fixedCW = [...sq.cw].filter(x => !arm.cw.has(x)).length;
  const newCW = [...arm.cw].filter(x => !sq.cw.has(x));
  const tsl = [...sq.strongTop2].filter(x => !arm.strongTop2.has(x));
  const net = fixedCW - tsl.length;
  const r1: [number, number] = [sq.hit1, arm.hit1];
  const r2: [number, number] = [sq.hit2, arm.hit2];
  return { fixedCW, newCW, tsl, net, r1, r2, accepted: net >= 3 && newCW.length === 0 && arm.hit1 >= sq.hit1 && arm.hit2 >= sq.hit2 };
}

// ---------------------------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------------------------

const fmtRow = (x?: RankedRow): string => (x ? `${x.name} (${x.tier})` : '—');

export function formatTable(rows: FixtureRow[], runs: QueryRun[], arms: ArmName[]): string {
  const byId = new Map(rows.map(r => [r.id, r]));
  const L: string[] = [];
  L.push(`| id | class | P | ${arms.map(a => `${a}: rank 1 · 2 · 3`).join(' | ')} |`);
  L.push(`|---|---|---|${arms.map(() => '---').join('|')}|`);
  for (const run of runs) {
    const r = byId.get(run.id)!;
    const cells = arms.map(a => {
      const ranked = run.byArm[a] ?? [];
      const accept = new Set(r.key.accept);
      return ranked.slice(0, 3).map(x => {
        const mark = accept.has(x.name) ? ' ✓' : x.tier === 'strong' ? ' CW' : '';
        return fmtRow(x) + mark;
      }).join(' · ') || '— (none)';
    });
    L.push(`| ${r.id} | ${r.key.class} | ${r.preExposed.length ? 'P' : ''} | ${cells.join(' | ')} |`);
  }
  const subsets: Array<[string, (r: FixtureRow) => boolean]> = [
    ['all scored rows', () => true],
    ['without pre-exposed rows', r => r.preExposed.length === 0],
  ];
  for (const [label, include] of subsets) {
    L.push('', `### Headline — ${label}`, '', '| arm | positives | R@1 | R@2 | CW (pairs, ranks 1–3) | gaps: none / partial / strong |', '|---|---|---|---|---|---|');
    const scores = new Map(arms.map(a => [a, scoreArm(rows, runs, a, include)] as const));
    for (const a of arms) {
      const s = scores.get(a)!;
      const g = [...s.gapOutcome.values()];
      L.push(`| ${a} | ${s.positives} | ${s.hit1} | ${s.hit2} | ${s.cw.size} | ${g.filter(x => x.outcome === 'none').length} / ${g.filter(x => x.outcome === 'partial').length} / ${g.filter(x => x.outcome === 'strong').length} |`);
    }
    const sq = scores.get('status-quo');
    if (sq) {
      for (const a of arms.filter(x => x !== 'status-quo')) {
        const acc = acceptance(sq, scores.get(a)!);
        L.push('', `**${a} vs status quo (${label})**: fixed CW ${acc.fixedCW}; TSL ${acc.tsl.length}${acc.tsl.length ? ` [${acc.tsl.join(', ')}]` : ''}; net ${acc.net >= 0 ? '+' : ''}${acc.net}; new CW ${acc.newCW.length}${acc.newCW.length ? ` [${acc.newCW.join(', ')}]` : ''}; R@1 ${acc.r1[0]}→${acc.r1[1]}; R@2 ${acc.r2[0]}→${acc.r2[1]} → **${acc.accepted ? 'ACCEPTED' : 'NOT accepted'}** on this subset`);
      }
    }
  }
  // Rank-1 changes against status quo: listed, not gated (charter § 10, row "Rank reporting").
  if (arms.includes('status-quo') && arms.length > 1) {
    L.push('', '### Rank-1 changes against status quo (listed, not gated)', '');
    let n = 0;
    for (const run of runs) for (const a of arms.filter(x => x !== 'status-quo')) {
      const before = run.byArm['status-quo']?.[0]?.name, after = run.byArm[a]?.[0]?.name;
      if (before !== after) { L.push(`- ${run.id} (${a}): ${before ?? '—'} → ${after ?? '—'}`); n++; }
    }
    if (n === 0) L.push('- none');
  }
  return L.join('\n');
}

// ---------------------------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------------------------

export async function main(argv: string[]): Promise<number> {
  const arg = (name: string): string | undefined => {
    const i = argv.indexOf(name);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const fixturePath = path.resolve(arg('--fixture') ?? DEFAULT_FIXTURE);
  const componentsDir = path.resolve(arg('--components') ?? DEFAULT_COMPONENTS_DIR);
  const rows = loadFixture(fixturePath);
  const { engine, catalog } = await buildEngine(componentsDir);

  const hash = sha256File(fixturePath);
  const pinned = readPinnedHash();
  const problems = validateFixture(rows, catalog);
  if (pinned !== hash) problems.unshift(`fixture sha256 ${hash} != pinned ${pinned ?? '(none)'} in ${path.relative(REPO_ROOT, GUARD_TEST_PATH)}`);
  const c = countFixture(rows);
  console.log(`fixture: ${path.relative(REPO_ROOT, fixturePath)}  sha256 ${hash}`);
  console.log(`counts: ${c.total} rows — ${c.positives} positives, ${c.gaps} gap negatives, ${c.dropped} dropped (F4); gap share ${(c.gapShare * 100).toFixed(1)} %`);
  console.log(`pre-exposed (scored): ${c.flagged.length ? c.flagged.join(', ') : 'none'}`);
  if (problems.length) {
    console.error('VERIFY FAILED:\n- ' + problems.join('\n- '));
    return 1;
  }
  console.log('verify: OK');
  if (argv.includes('--verify-only')) return 0;

  const armsArg = arg('--arms');
  if (!armsArg) { console.error('nothing to run: pass --verify-only or --arms <list>'); return 2; }
  const requested = armsArg.split(',').map(s => s.trim());
  if (requested.includes('control')) {
    console.error('The catalog-read CONTROL arm is specified, not run (charter § 8). It has no code path here.');
    return 2;
  }
  const unknown = requested.filter(a => !ARM_NAMES.includes(a as ArmName));
  if (unknown.length) { console.error(`unknown arm(s): ${unknown.join(', ')}`); return 2; }
  const arms = ARM_NAMES.filter(a => requested.includes(a));
  const runs = runQueries(engine, rows, arms);
  console.log(`ran ${runs.length} scored phrases under: ${arms.join(', ')} (status-quo self-check passed)`);
  if (argv.includes('--table')) console.log('\n' + formatTable(rows, runs, arms));
  return 0;
}

if (require.main === module) {
  main(process.argv.slice(2)).then(code => process.exit(code), err => { console.error(err); process.exit(1); });
}

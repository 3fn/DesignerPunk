/**
 * `verify-signing-chain --ci` — links 1–3 (ballot 2026-10-01-signing-act-chain § 4.1) against
 * the fixtures Stacy specified in § 4.5: F1–F14, F12′ and the two controls. Every test name
 * starts with the fixture id; the Must column of § 4.5 is the assertion.
 *
 * The C1 function: the real `regrounding/c1.ts` + `signatures.ts` when on the tree (Spec 123
 * U2b), else a mirror of C1 (owner signs unless owner = profile author thurgood → stacy) — the
 * fixtures test the chain's logic, not C1 itself. F11's real-sweep case needs
 * `regrounding/freshness.ts` and is skipped (named, not silent) where it is absent.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { splitFrontmatter } from '../frontmatter';
import { partition } from '../partition';
import { NO_SIGNING_PATHS_LINE, runCi, type CiResult } from '../regrounding/verify-signing-chain';
import {
  cleanupTmp,
  commit,
  DISP,
  editRow,
  editSheet,
  g,
  hash,
  head,
  makeRepo,
  read,
  REAL_RG,
  resign,
  RG,
  RG_IS_REAL,
  SHEET,
  tmp,
  write,
} from './fixtures/signing-chain/helpers';

const STUB_SWEEP = (): { pass: boolean; lines: string[] } => ({ pass: true, lines: ['operative-set-freshness: PASS (fixture stub — the real sweep is F11b)'] });

function ci(repo: string, base: string, h = 'HEAD', since?: string): CiResult {
  return runCi({ repo, base, head: h, rg: RG, since, sweep: STUB_SWEEP });
}
const links = (r: CiResult): number[] => [...new Set(r.findings.map((f) => f.link))].sort();
const text = (r: CiResult): string => r.lines.join('\n');

/** A fixture repo on branch `pr`, cut from `main`'s base commit; returns [repo, base]. */
function pr(): [string, string] {
  const repo = makeRepo();
  const base = head(repo);
  g(repo, ['switch', '-q', '-c', 'pr']);
  return [repo, base];
}

afterAll(() => cleanupTmp());

describe(`verify-signing-chain --ci (links 1–3) — C1 from ${RG_IS_REAL ? 'regrounding/c1.ts (real)' : 'the test mirror (c1.ts not on this tree)'}`, () => {
  // ------------------------------------------------------------------ controls
  test('control: a clean `assent` act → pass', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'assent' });
    commit(repo, 'Re-sign #identity (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.rowsChecked).toBe(1);
    expect(text(r)).toContain('consistency, not identity');
  });

  test('control: a clean `refuse` act → pass', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'refuse', refuse: true });
    commit(repo, 'Refuse #identity (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.rowsChecked).toBe(1);
  });

  // ------------------------------------------------------------------ link 3
  test('F1: `Agent:` trailer ≠ `signer` → fail', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f1' });
    commit(repo, 'Re-sign #identity', ['Agent: data']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 3 && /Agent: trailer data ≠ c1Seat kenya/.test(f.message))).toBe(true);
  });

  test('F2: a signing commit with no `Agent:` trailer → fail', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f2' });
    commit(repo, 'Re-sign #identity', []);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 3 && /no Agent: trailer/.test(f.message))).toBe(true);
  });

  test('F3: two `Agent:` trailers → fail', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f3' });
    commit(repo, 'Re-sign #identity', ['Agent: kenya', 'Agent: data']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 3 && /2 Agent: trailers/.test(f.message))).toBe(true);
  });

  // ------------------------------------------------------------------ link 2
  test('F4 (a): the hunk edits `disposition` → fail', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f4a' });
    editRow(repo, DISP('kenya'), '#identity', (row) => ({ ...row, disposition: 'retained' }));
    commit(repo, 'Re-sign #identity', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 2 && /non-signature field\(s\) changed — disposition/.test(f.message))).toBe(true);
  });

  test("F4 (b): the hunk edits another seat's object → fail", () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f4b', seat: 'thurgood', signer: 'stacy' }); // stacy's object (C1 carve-out)
    commit(repo, 'Re-sign thurgood #identity', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 2 && /an object of seat stacy/.test(f.message))).toBe(true);
  });

  // ------------------------------------------------------------------ link 1
  test('F5: a re-sign with `canonicalHash`/`renderedHash` unchanged → fail', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f5', keepHashes: true, surviving: [] });
    commit(repo, 'Re-sign #identity (no hash moved)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(links(r)).toEqual([1]);
    expect(r.findings[0].message).toMatch(/not on the stale list \(F5\)/);
  });

  // ------------------------------------------------------------------ merges
  test.each(['--no-ff', '--ff-only'])('F6: a seat commit arriving through a merged side branch (%s) → pass', (mode) => {
    const [repo, base] = pr();
    g(repo, ['switch', '-q', '-c', 'seat']);
    resign(repo, { seed: `f6${mode}` });
    commit(repo, 'Re-sign #identity (kenya)', ['Agent: kenya']);
    g(repo, ['switch', '-q', 'pr']);
    g(repo, ['merge', '-q', mode, 'seat', '-m', 'Merge seat (no trailer)']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.rowsChecked).toBe(1);
  });

  /** Two side branches each re-sign #identity; merging the second conflicts. */
  function conflicted(): [string, string] {
    const [repo, base] = pr();
    g(repo, ['switch', '-q', '-c', 'a']);
    resign(repo, { seed: 'side-a' });
    commit(repo, 'Re-sign #identity (a)', ['Agent: kenya']);
    g(repo, ['switch', '-q', 'pr']);
    g(repo, ['switch', '-q', '-c', 'b']);
    resign(repo, { seed: 'side-b' });
    commit(repo, 'Re-sign #identity (b)', ['Agent: kenya']);
    g(repo, ['switch', '-q', 'pr']);
    g(repo, ['merge', '-q', '--no-ff', 'a', '-m', 'Merge a']);
    expect(() => g(repo, ['merge', '-q', '--no-ff', 'b', '-m', 'Merge b'])).toThrow();
    return [repo, base];
  }

  test("F7: a merge commit's conflict resolution edits a signature → fail", () => {
    const [repo, base] = conflicted();
    g(repo, ['checkout', '--theirs', '--', DISP('kenya'), SHEET('kenya')]);
    // The resolution writes signature content neither side carried.
    editRow(repo, DISP('kenya'), '#identity', (row) => ({ ...row, signature: { ...(row.signature as object), canonicalHash: hash('resolution'), renderedHash: hash('resolution:r') } }));
    g(repo, ['add', '-A']);
    g(repo, ['commit', '-q', '--no-edit']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 2 && /merge result on canonical\/profiles\/consumer\/kenya\.dispositions\.yaml equals neither parent/.test(f.message))).toBe(true);
  });

  test('F8: a later commit with a different trailer rewrites the hunk → fail', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f8-kenya' });
    commit(repo, 'Re-sign #identity (kenya)', ['Agent: kenya']);
    resign(repo, { seed: 'f8-data' });
    const later = commit(repo, 'Rewrite #identity signature', ['Agent: data']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.length).toBeGreaterThan(0);
    expect(r.findings.every((f) => f.sha === later)).toBe(true);
    expect(links(r)).toEqual([2, 3]);
  });

  // ------------------------------------------------------------------ CI path (unit halves)
  test('F9 (unit half): F1\'s defect in a PR that also refreshes the lock → fail (the CLI never reads canonical/generated.lock)', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f9' });
    write(repo, 'canonical/generated.lock', `${JSON.stringify({ inputClosure: 'refreshed-by-the-signing-session', outputs: 'refreshed' })}\n`);
    commit(repo, 'Re-sign #identity + lock refresh', ['Agent: data']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 3)).toBe(true);
  });

  test('F10 (unit half): a depth-1 checkout → fail loud', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f10' });
    commit(repo, 'Re-sign #identity (kenya)', ['Agent: kenya']);
    const shallow = path.join(tmp('shallow'), 'clone');
    g(path.dirname(shallow), ['clone', '-q', '--depth', '1', '--branch', 'pr', `file://${repo}`, shallow]);
    const r = runCi({ repo: shallow, base, head: 'HEAD', rg: RG, sweep: STUB_SWEEP });
    expect(r.ok).toBe(false);
    expect(r.historyError).toMatch(/shallow/);
    expect(text(r)).toMatch(/signing-chain: FAIL \(history\) — the checkout is shallow/);
  });

  test('F11 (a, ordering): the sweep runs first and fails the run on a range that touches no canonical/profiles/** path', () => {
    const [repo, base] = pr();
    write(repo, 'canonical/agents/kenya.md', `${read(repo, 'canonical/agents/kenya.md')}\nA canonical edit.\n`);
    write(repo, 'canonical/generated.lock', 'hand-computed matching lock\n');
    commit(repo, 'Canonical edit (no profile path)', []);
    const r = runCi({ repo, base, head: 'HEAD', rg: RG, sweep: () => ({ pass: false, lines: ['operative-set-freshness: FAIL — 1 stale unit (injected)'] }) });
    expect(r.ok).toBe(false);
    expect(r.lines).toContain(NO_SIGNING_PATHS_LINE); // the floor passed …
    expect(r.lines.indexOf('operative-set-freshness: FAIL — 1 stale unit (injected)')).toBeLessThan(r.lines.indexOf(NO_SIGNING_PATHS_LINE)); // … after the sweep
  });

  (REAL_RG?.sweep ? test : test.skip)('F11 (b, U2b-only — needs regrounding/freshness.ts): a stale unit with a hand-computed matching lock, from a canonical edit touching no canonical/profiles/** path → fail', () => {
    const repo = tmp('f11');
    g(repo, ['init', '-q', '-b', 'main']);
    const charter = '---\nagent: kenya\n---\n\n# Kenya\n\n## Identity\n\nYou are the iOS platform engineer.\n';
    write(repo, 'canonical/agents/kenya.md', charter);
    const unit = partition(splitFrontmatter(charter, 'canonical/agents/kenya.md').body).units.find((u) => u.anchor === '#identity');
    expect(unit).toBeDefined();
    const h = `sha256:${require('crypto').createHash('sha256').update(unit!.text, 'utf8').digest('hex')}`;
    write(
      repo,
      'canonical/operative-sets/kenya.yaml',
      `source: canonical/agents/kenya.md\nowner: kenya\nconfirmer: kenya\nunits:\n  "#identity":\n    canonicalHash: ${h}\n    items: []\n    confirmation: canonical/profiles/consumer/confirmations/kenya.md#identity\n`
    );
    write(repo, 'canonical/profiles/consumer/confirmations/kenya.md', `# Confirmations\n\n## \`#identity\`\n\nconfirmer: kenya\ncanonicalHash: ${h}\nitems: none\ndate: 2026-10-01\n`);
    write(repo, 'canonical/generated.lock', 'hand-computed matching lock\n');
    const base = commit(repo, 'base', []);
    const sanity = runCi({ repo, base, head: 'HEAD', rg: RG, sweep: REAL_RG!.sweep! });
    expect(sanity.sweepOk).toBe(true); // the fixture is fresh before the edit
    g(repo, ['switch', '-q', '-c', 'pr']);
    write(repo, 'canonical/agents/kenya.md', charter.replace('engineer.', 'engineer, edited.'));
    commit(repo, 'Canonical edit (no profile path)', []);
    const r = runCi({ repo, base, head: 'HEAD', rg: RG, sweep: REAL_RG!.sweep! });
    expect(r.ok).toBe(false);
    expect(r.sweepOk).toBe(false);
    expect(r.lines).toContain(NO_SIGNING_PATHS_LINE);
  });

  // ------------------------------------------------------------------ commit grain
  test('F12: a seat-trailered signing commit that also edits its own charter → fail', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f12' });
    write(repo, 'canonical/agents/kenya.md', `${read(repo, 'canonical/agents/kenya.md')}\nSelf-edit.\n`);
    commit(repo, 'Re-sign #identity + charter tweak', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 2 && /canonical\/agents\/kenya\.md: not a signing path/.test(f.message))).toBe(true);
  });

  test("F12′: F12 split across two commits with the same trailer → fail", () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'f12p' });
    commit(repo, 'Re-sign #identity', ['Agent: kenya']);
    write(repo, 'canonical/agents/kenya.md', `${read(repo, 'canonical/agents/kenya.md')}\nSelf-edit.\n`);
    commit(repo, 'Charter tweak', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 2 && /\(F12′\)/.test(f.message))).toBe(true);
  });

  test("F13: a conflicted merge whose result on a signature path equals neither parent's blob → fail", () => {
    const [repo, base] = conflicted();
    // Each side's own content, combined: dispositions takes a's row; the sheet keeps BOTH
    // re-sign paragraphs — no novel signature value, yet the sheet equals neither parent.
    g(repo, ['checkout', '--ours', '--', DISP('kenya')]);
    const ours = g(repo, ['show', `HEAD:${SHEET('kenya')}`]);
    const theirs = g(repo, ['show', `b:${SHEET('kenya')}`]);
    write(repo, SHEET('kenya'), `${ours.replace(/\n*$/, '')}\n\n${theirs.split('\n').filter((l) => l.startsWith('**Re-sign (side-b)')).join('\n')}\n`);
    g(repo, ['add', '-A']);
    g(repo, ['commit', '-q', '--no-edit']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 2 && /merge result on canonical\/profiles\/consumer\/signatures\/kenya\.md equals neither parent/.test(f.message))).toBe(true);
    expect(r.findings.some((f) => /kenya\.dispositions\.yaml equals neither/.test(f.message))).toBe(false);
  });

  test('F14: a row staled only by merging `main`, then re-signed → pass', () => {
    const repo = makeRepo();
    g(repo, ['switch', '-q', '-c', 'pr']);
    g(repo, ['switch', '-q', 'main']);
    write(repo, 'canonical/agents/kenya.md', `${read(repo, 'canonical/agents/kenya.md')}\nA main-side canonical edit.\n`);
    const mainTip = commit(repo, 'main: canonical edit', []);
    g(repo, ['switch', '-q', 'pr']);
    g(repo, ['merge', '-q', '--no-ff', 'main', '-m', 'Merge main into pr']);
    resign(repo, { seed: 'f14' });
    commit(repo, 'Re-sign #identity after main merge', ['Agent: kenya']);
    const r = ci(repo, mainTip);
    expect(r.findings).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.rowsChecked).toBe(1);
  });
});

// ---------------------------------------------------------------------------- beyond § 4.5
describe('verify-signing-chain --ci — behaviors beyond the § 4.5 table (not among the 25)', () => {
  test('a clean confirmation re-confirm (record unit canonicalHash + its sheet section) → pass', () => {
    const [repo, base] = pr();
    const h = hash('reconfirm');
    write(repo, 'canonical/operative-sets/kenya.yaml', read(repo, 'canonical/operative-sets/kenya.yaml').replace(/canonicalHash: .*/, `canonicalHash: ${h}`));
    write(repo, 'canonical/profiles/consumer/confirmations/kenya.md', read(repo, 'canonical/profiles/consumer/confirmations/kenya.md').replace(/canonicalHash: .*/, `canonicalHash: ${h}`));
    commit(repo, 'Re-confirm #identity (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.rowsChecked).toBe(1);
  });

  test('the floor: a range touching no signing path prints the no-signing-paths line and passes', () => {
    const [repo, base] = pr();
    write(repo, 'README.md', 'unrelated\n');
    commit(repo, 'Unrelated', []);
    const r = ci(repo, base);
    expect(r.ok).toBe(true);
    expect(r.lines).toContain(NO_SIGNING_PATHS_LINE);
  });

  test('the floor: a range touching canonical/profiles/** with zero signing rows FAILS (ballot § 4.1, read literally)', () => {
    const [repo, base] = pr();
    write(repo, DISP('kenya'), read(repo, DISP('kenya')).replace('# Fixture dispositions file', '# Fixture dispositions file (authoring edit)'));
    commit(repo, 'Authoring-only profile edit', ['Agent: thurgood']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(text(r)).toMatch(/FAIL \(floor\)/);
  });

  test('§ 2 clause 8: commits before R are excluded and counted; the rule does not reach back', () => {
    const [repo, base] = pr();
    resign(repo, { seed: 'pre-r' });
    commit(repo, 'Pre-R re-sign, wrong trailer', ['Agent: data'], { GIT_COMMITTER_DATE: '2026-01-01T00:00:00Z' });
    const r0 = commit(repo, 'R marker', [], { GIT_COMMITTER_DATE: '2026-06-01T00:00:00Z' });
    resign(repo, { seed: 'post-r' });
    commit(repo, 'Post-R re-sign', ['Agent: kenya'], { GIT_COMMITTER_DATE: '2026-07-01T00:00:00Z' });
    expect(ci(repo, base).ok).toBe(false); // without R, the pre-R act is walked
    const r = ci(repo, base, 'HEAD', r0);
    expect(r.ok).toBe(true);
    expect(text(r)).toMatch(/1 committed before R .* excluded/);
  });

  test('merging `main` into a branch whose profile differs from main is not a profile touch (floor reads the first-parent diff)', () => {
    const [repo] = pr();
    resign(repo, { seed: 'pre-r-ok' });
    commit(repo, 'Pre-R re-sign', ['Agent: kenya'], { GIT_COMMITTER_DATE: '2026-01-01T00:00:00Z' });
    g(repo, ['switch', '-q', 'main']);
    write(repo, 'README.md', 'main moves\n');
    const r0 = commit(repo, 'R marker on main', [], { GIT_COMMITTER_DATE: '2026-06-01T00:00:00Z' });
    g(repo, ['switch', '-q', 'pr']);
    g(repo, ['merge', '-q', '--no-ff', 'main', '-m', 'Merge main'], undefined, { GIT_COMMITTER_DATE: '2026-07-01T00:00:00Z' });
    const r = ci(repo, r0, 'HEAD', r0);
    expect(r.ok).toBe(true);
    expect(r.lines).toContain(NO_SIGNING_PATHS_LINE);
  });

  test('a record unit added with its record is the drafter\'s authoring, not a confirmation act', () => {
    const [repo, base] = pr();
    write(repo, 'canonical/operative-sets/kenya.yaml', `${read(repo, 'canonical/operative-sets/kenya.yaml')}  "#out-of-scope":\n    canonicalHash: ${hash('new-unit')}\n    items: []\n`);
    commit(repo, 'Draft #out-of-scope unit (profile author)', ['Agent: thurgood']);
    const r = ci(repo, base);
    expect(r.rowsChecked).toBe(0);
    expect(r.findings).toEqual([]);
  });

  test('a sheet section that names no signed row → fail (link 2)', () => {
    const [repo, base] = pr();
    write(repo, SHEET('kenya'), `${read(repo, SHEET('kenya'))}\n## \`#nowhere\`\n\nsigner: kenya\n`);
    commit(repo, 'Orphan section', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 2 && /names no dispositions row/.test(f.message))).toBe(true);
  });

  test('the fixture dispositions files parse (shape guard for editRow)', () => {
    const [repo] = pr();
    const d = loadYaml(read(repo, DISP('kenya'))) as { body: Record<string, unknown> };
    expect(Object.keys(d.body)).toEqual(['#identity', '#out-of-scope']);
    editSheet(repo, SHEET('kenya'), '#identity', { append: 'x' });
    expect(fs.existsSync(path.join(repo, SHEET('kenya')))).toBe(true);
  });
});

// ---------------------------------------------------------------------------- the workflow
describe('agent-generator.yml — the --ci step (F9/F10 CI-path structure; the C6 carve-out)', () => {
  const wf = loadYaml(fs.readFileSync(path.join(__dirname, '..', '..', '..', '.github', 'workflows', 'agent-generator.yml'), 'utf8')) as {
    jobs: { check: { strategy: { matrix: { include: { context: string }[] } }; steps: { name?: string; if?: string; uses?: string; run?: string; with?: Record<string, unknown> }[] } };
  };
  const steps = wf.jobs.check.steps;
  const chain = steps.filter((s) => (s.name ?? '').startsWith('Signing chain —'));

  test('F9 (structure): the verify step and its own setup steps carry no `noop` condition, and select only 122-diff-guard', () => {
    expect(chain.map((s) => s.name)).toEqual([
      'Signing chain — checkout (full history)',
      'Signing chain — setup Node.js',
      'Signing chain — install dependencies',
      'Signing chain — verify-signing-chain --ci (sweep first; links 1–3; never skips on noop)',
    ]);
    for (const s of chain) {
      expect(s.if ?? '').not.toMatch(/noop/);
      expect(s.if).toBe("matrix.context == '122-diff-guard'");
    }
    expect(chain[3].run).toBe('npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci');
    expect(wf.jobs.check.strategy.matrix.include.map((m) => m.context)).toContain('122-diff-guard');
  });

  test('F10 (structure): the step reads full history on both paths (its own checkout, fetch-depth 0, before any depth-1 checkout)', () => {
    expect(chain[0].uses).toMatch(/^actions\/checkout@/);
    expect(chain[0].with?.['fetch-depth']).toBe(0);
    const firstShallow = steps.findIndex((s) => s.name === 'Checkout');
    expect(steps.indexOf(chain[3])).toBeLessThan(firstShallow);
  });

  test('C6 lock rule kept for everything else: every pre-existing step keeps its noop condition', () => {
    const gated = steps.filter((s) => !(s.name ?? '').startsWith('Signing chain —'));
    expect(gated.find((s) => (s.name ?? '').startsWith('Early-exit green'))?.if).toBe("needs.setup.outputs.noop == 'true'");
    for (const s of gated.filter((x) => !(x.name ?? '').startsWith('Early-exit green'))) expect(s.if).toMatch(/needs\.setup\.outputs\.noop != 'true'/);
  });
});

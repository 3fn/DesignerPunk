/**
 * `verify-signing-chain --print <record file>#<anchor>` — item 1 of
 * `.kiro/issues/2026-11-05-signing-act-prevention-four-fixes.md`, pulled forward by Peter's ruling of
 * 2026-11-08 (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-u11-link7-recut.md`).
 *
 * Stacy's two fixtures (signing ballot § 4.5: she specifies, Thurgood builds), as she worded them:
 *   PF1 — "the mode's output contains the unit's evidence line, so a print before the commit anchors
 *         link 7";
 *   PF2 — "the hash equals the freshness sweep's for a stale unit".
 * PF2c (a `#frontmatter:<path>` row) and PF2d (a shared member) were added at Stacy's review of
 * `ee2504581`. Each is run on the confirmer's target (an operative-set record unit, `a`) and on the signer's
 * (a dispositions row, whose link-7 line is the rendering's, `b`): the mode prints a row's rendering
 * and `renderedHash` too, and `b` shows why — the canonical unit alone does not carry the rendered
 * line link 7 reads for a signature.
 *
 * Every case drives the CLI entry (`main(['--print', …])`) and reads its stdout, the one output a seat
 * sees. Over the fixture tree `fixtures/signing-chain/tree/` (its records are stale by construction:
 * `canonicalHash` 5555…, signature 1111…/2222…).
 */

import { evidenceLine, main, runAudit } from '../regrounding/verify-signing-chain';
import { runFreshnessSweep, staleRecordMessage } from '../regrounding/freshness';
import { partition } from '../partition';
import { splitFrontmatter } from '../frontmatter';
import { buildStore, cleanupTmp, commit, DISP, editRow, editSheet, g, makeRepo, metaFor, read, record, RG, SHEET, write } from './fixtures/signing-chain/helpers';

afterAll(() => cleanupTmp());

const RECORD = 'canonical/operative-sets/kenya.yaml';
const NOTE = 'canonical/profiles/consumer/confirmations/kenya.md';
const SOURCE = 'canonical/agents/kenya.md';
const RENDERED_LINE = "You are the iOS platform engineer for products built in your human lead's repo.";
const SESSION = 'sess-print';
const SPAWN = 'toolu_spawn_kenya_print';
const BRANCH = 'seat-kenya';

/** Run the CLI's print mode in `repo`; stdout, stderr and the exit code. */
function printed(repo: string, target: string): { code: number; out: string; err: string } {
  const out: string[] = [];
  const err: string[] = [];
  const log = jest.spyOn(console, 'log').mockImplementation((...a: unknown[]) => void out.push(a.join(' ')));
  const error = jest.spyOn(console, 'error').mockImplementation((...a: unknown[]) => void err.push(a.join(' ')));
  try {
    const code = main(['--print', target], repo);
    return { code, out: out.join('\n'), err: err.join('\n') };
  } finally {
    log.mockRestore();
    error.mockRestore();
  }
}

const hashLine = (out: string, field: 'canonicalHash' | 'renderedHash'): string | undefined =>
  new RegExp(`^${field}: (sha256:[0-9a-f]{64})$`, 'm').exec(out)?.[1];

const canonicalUnitText = (repo: string, anchor: string): string =>
  partition(splitFrontmatter(read(repo, SOURCE), SOURCE).body).units.find((u) => u.anchor === anchor)?.text ?? '';

/** The text between a `<<<<< begin <what>` line and its `>>>>> end <what>` line. */
const between = (out: string, what: string): string | undefined => {
  const lines = out.split('\n');
  const a = lines.indexOf(`<<<<< begin ${what}`);
  const b = lines.indexOf(`>>>>> end ${what}`);
  return a < 0 || b < a ? undefined : lines.slice(a + 1, b).join('\n');
};

const convention = (subject: string): string => `git commit -q -F - <<'EOF' && git log -1 --format='%H %s'\n${subject}\n\nAgent: kenya\nEOF`;

/**
 * A seat transcript: the spawn, the prompt snapshot, ONE print-mode call (its output verbatim, taken
 * before the commit), then the commit in the convention's form. `print: undefined` makes no print.
 */
function storeWith(o: { snapshot: string; printTarget: string; print: string | undefined; sha: string; subject: string }): string {
  const v = { SESSION, BRANCH, AGENT_ID: 'kp' };
  const lines = [record('subagentUser', { ...v, TEXT: `You are Kenya. ${o.subject}.` }), record('promptSnapshot', { ...v, SNAPSHOT: o.snapshot })];
  if (o.print !== undefined) {
    lines.push(
      record('subagentToolUse', { ...v, TOOL_ID: 'toolu_print', TOOL_NAME: 'Bash', INPUT: { command: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --print '${o.printTarget}'`, description: 'Print the whole unit' } })
    );
    lines.push(record('subagentToolResult', { ...v, TOOL_ID: 'toolu_print', OUTPUT: o.print }));
  }
  lines.push(record('subagentToolUse', { ...v, TOOL_ID: 'toolu_commit', TOOL_NAME: 'Bash', INPUT: { command: convention(o.subject), description: 'Commit the act' } }));
  lines.push(record('subagentToolResult', { ...v, TOOL_ID: 'toolu_commit', OUTPUT: `${o.sha} ${o.subject}` }));
  return buildStore({
    session: SESSION,
    main: [
      record('mainUser', { SESSION, BRANCH, TEXT: 'Orchestrate the act.' }),
      record('mainToolUse', { SESSION, BRANCH, TOOL_ID: SPAWN, TOOL_NAME: 'Agent', INPUT: { subagent_type: 'kenya', model: 'sonnet', description: 'Kenya: the act', run_in_background: true, prompt: 'You are Kenya.' } }),
    ],
    subagents: { kp: { lines, meta: metaFor('kenya', SPAWN) } },
  });
}

const snapshotOf = (repo: string): string => (splitFrontmatter(read(repo, '.claude/agents/kenya.md'), '.claude/agents/kenya.md').body ?? '').replace(/\n+$/, '');

/** A seat repo: print first (in the working tree, before the act), then the act, then the commit. */
function act(kind: 'confirmation' | 'signature'): { repo: string; base: string; sha: string; subject: string; print: string; target: string } {
  const repo = makeRepo();
  const base = g(repo, ['rev-parse', 'HEAD']).trim();
  g(repo, ['switch', '-q', '-c', BRANCH]);
  const target = kind === 'confirmation' ? `${RECORD}#identity` : `${DISP('kenya')}#identity`;
  const p = printed(repo, target);
  expect(p.code).toBe(0);
  const ch = hashLine(p.out, 'canonicalHash') as string;
  let subject: string;
  if (kind === 'confirmation') {
    subject = 'Re-confirm kenya #identity';
    write(repo, RECORD, read(repo, RECORD).replace(/canonicalHash: .*/, `canonicalHash: ${ch}`));
    write(repo, NOTE, read(repo, NOTE).replace(/canonicalHash: .*/, `canonicalHash: ${ch}`));
  } else {
    subject = 'Re-sign kenya #identity';
    const rh = hashLine(p.out, 'renderedHash') as string;
    editRow(repo, DISP('kenya'), '#identity', (row) => ({ ...row, signature: { ...(row.signature as Record<string, unknown>), canonicalHash: ch, renderedHash: rh } }));
    editSheet(repo, SHEET('kenya'), '#identity', { canonicalHash: ch, renderedHash: rh, append: '**Re-sign (print): ASSENT.** The whole unit and rendering, from the print-mode output.' });
  }
  const sha = commit(repo, subject, ['Agent: kenya']);
  return { repo, base, sha, subject, print: p.out, target };
}

describe('verify-signing-chain --print — the output', () => {
  test('an operative-set unit: the whole unit between its markers, then its hashText, in one output', () => {
    const repo = makeRepo();
    const p = printed(repo, `${RECORD}#identity`);
    expect(p.code).toBe(0);
    const unit = canonicalUnitText(repo, '#identity');
    expect(`${between(p.out, 'canonical unit')}\n`).toBe(unit.endsWith('\n') ? unit : `${unit}\n`);
    const lines = p.out.split('\n');
    expect(lines.findIndex((l) => l.startsWith('canonicalHash: '))).toBeGreaterThan(lines.indexOf('>>>>> end canonical unit'));
    expect(p.out).not.toMatch(/^renderedHash: /m); // a confirmer's target has no rendering leg
    expect(p.out).not.toContain('sha256:5555'); // never the pinned value
    expect(p.out).toMatch(/^read at [0-9a-f]{40} \(working tree\); clean$/m);
  });

  test('an unknown anchor, a non-record file, or a bare path exits 2 and prints nothing to stdout', () => {
    const repo = makeRepo();
    for (const t of [`${RECORD}#no-such-unit`, `${SOURCE}#identity`, RECORD, `${DISP('kenya')}#frontmatter:nope`]) {
      const p = printed(repo, t);
      expect([t, p.code]).toEqual([t, 2]);
      expect(p.out).toBe('');
      expect(p.err).toMatch(/^verify-signing-chain --print: /);
    }
  });

  test('working-tree changes to a path the print read are named on the read line', () => {
    const repo = makeRepo();
    write(repo, SOURCE, read(repo, SOURCE).replace('built with DesignerPunk.', 'built with DesignerPunk, edited.'));
    const p = printed(repo, `${RECORD}#identity`);
    expect(p.code).toBe(0);
    expect(p.out).toMatch(new RegExp(`^read at [0-9a-f]{40} \\(working tree\\); uncommitted changes in: .*${SOURCE}`, 'm'));
  });
});

describe("PF1 (Stacy): the mode's output contains the unit's evidence line, so a print before the commit anchors link 7", () => {
  test('PF1a — confirmation: the output contains the canonical unit\'s evidence line, and the print anchors link 7', () => {
    const s = act('confirmation');
    const line = evidenceLine(canonicalUnitText(s.repo, '#identity')) as string;
    expect(line).toBeDefined();
    expect(s.print).toContain(line);
    const acts = runAudit({ repo: s.repo, base: s.base, head: BRANCH, store: storeWith({ snapshot: snapshotOf(s.repo), printTarget: s.target, print: s.print, sha: s.sha, subject: s.subject }), rg: RG });
    expect(acts.length).toBeGreaterThan(0);
    for (const a of acts) expect([a.row, a.verdict, a.link]).toEqual([a.row, 'anchored', undefined]);
    // Control: the same act with no print reads FAIL 7 — the anchor is the print, nothing else.
    const bare = runAudit({ repo: s.repo, base: s.base, head: BRANCH, store: storeWith({ snapshot: snapshotOf(s.repo), printTarget: s.target, print: undefined, sha: s.sha, subject: s.subject }), rg: RG });
    for (const a of bare) expect([a.verdict, a.link]).toEqual(['FAIL', 7]);
  });

  test("PF1b — signature: the output contains the rendering's evidence line, and the print anchors link 7", () => {
    const s = act('signature');
    expect(s.print).toContain(RENDERED_LINE);
    // Why the mode prints the rendering: the canonical unit alone does not carry the line link 7 reads.
    expect(between(s.print, 'canonical unit')).not.toContain(RENDERED_LINE);
    const acts = runAudit({ repo: s.repo, base: s.base, head: BRANCH, store: storeWith({ snapshot: snapshotOf(s.repo), printTarget: s.target, print: s.print, sha: s.sha, subject: s.subject }), rg: RG });
    expect(acts.length).toBeGreaterThan(0);
    for (const a of acts) expect([a.row, a.verdict, a.link]).toEqual([a.row, 'anchored', undefined]);
    const bare = runAudit({ repo: s.repo, base: s.base, head: BRANCH, store: storeWith({ snapshot: snapshotOf(s.repo), printTarget: s.target, print: undefined, sha: s.sha, subject: s.subject }), rg: RG });
    for (const a of bare) expect([a.verdict, a.link]).toEqual(['FAIL', 7]);
  });
});

describe("PF2 (Stacy): the hash equals the freshness sweep's for a stale unit", () => {
  test("PF2a — a stale record unit: the printed canonicalHash is the sweep's `now`, and pinning it clears the stale finding", () => {
    const repo = makeRepo();
    const before = runFreshnessSweep(repo);
    expect(before.stale?.some((r) => r.file === RECORD && r.key === '#identity')).toBe(true);
    const p = printed(repo, `${RECORD}#identity`);
    const h = hashLine(p.out, 'canonicalHash') as string;
    expect(before.findings.map((f) => f.message)).toContain(staleRecordMessage(RECORD, '#identity', 'sha256:5555555555555555555555555555555555555555555555555555555555555555', h));
    write(repo, RECORD, read(repo, RECORD).replace(/canonicalHash: .*/, `canonicalHash: ${h}`));
    expect(runFreshnessSweep(repo).stale?.some((r) => r.file === RECORD && r.key === '#identity')).toBe(false);
  });

  test('PF2b — a stale signature: pinning the printed canonicalHash and renderedHash clears the stale-signature finding', () => {
    const repo = makeRepo();
    const row = (r: ReturnType<typeof runFreshnessSweep>): boolean => (r.stale ?? []).some((x) => x.file === DISP('kenya') && x.key === '#identity' && x.kind === 'signature');
    expect(row(runFreshnessSweep(repo))).toBe(true);
    const p = printed(repo, `${DISP('kenya')}#identity`);
    const ch = hashLine(p.out, 'canonicalHash') as string;
    const rh = hashLine(p.out, 'renderedHash') as string;
    expect([ch, rh].every(Boolean)).toBe(true);
    // A half-pin stays stale: each hash is checked, not just one.
    editRow(repo, DISP('kenya'), '#identity', (r) => ({ ...r, signature: { ...(r.signature as Record<string, unknown>), canonicalHash: ch } }));
    expect(row(runFreshnessSweep(repo))).toBe(true);
    editRow(repo, DISP('kenya'), '#identity', (r) => ({ ...r, signature: { ...(r.signature as Record<string, unknown>), canonicalHash: ch, renderedHash: rh } }));
    expect(row(runFreshnessSweep(repo))).toBe(false);
  });
  /**
   * PF2c and PF2d (Stacy's review of `ee2504581`): the same claim for a `#frontmatter:<path>` row and a
   * shared-catalog member, whose canonical side is `hashEntry(value)`, not `hashText(unit)`. The fixture
   * tree has neither, so each case adds one, rendered (a span in the sidecar) and signed with stale pins,
   * and commits it (the sweep reads tracked files).
   */
  const STALE = { canonicalHash: `sha256:${'3'.repeat(64)}`, renderedHash: `sha256:${'4'.repeat(64)}` };
  const RENDERING = 'canonical/_consumer-output/_canonical/agents/kenya.md';
  /** Append one rendered line for `spanSource` to the fixture rendering and its sidecar. */
  const renderLine = (repo: string, spanSource: string, line: string): void => {
    const lines = read(repo, RENDERING).replace(/\n*$/, '').split('\n');
    write(repo, RENDERING, `${[...lines, '', line].join('\n')}\n`);
    const sc = JSON.parse(read(repo, `${RENDERING}.attribution.json`)) as { spans: { lines: [number, number]; source: string }[] };
    sc.spans.push({ lines: [lines.length + 2, lines.length + 2], source: spanSource });
    write(repo, `${RENDERING}.attribution.json`, JSON.stringify(sc, null, 2));
  };
  const signatureRow = (evidence: string): string =>
    JSON.stringify({ disposition: 're-pointed', destination: 'x', signature: { signer: 'kenya', ...STALE, assent: { surviving: [] }, evidence } });
  const pinPrinted = (repo: string, file: string, key: string, target: string): void => {
    const p = printed(repo, target);
    expect(p.code).toBe(0);
    const ch = hashLine(p.out, 'canonicalHash') as string;
    const rh = hashLine(p.out, 'renderedHash') as string;
    expect([ch, rh].every(Boolean)).toBe(true);
    editRow(repo, file, key, (r) => ({ ...r, signature: { ...(r.signature as Record<string, unknown>), canonicalHash: ch, renderedHash: rh } }));
  };
  const staleRow = (repo: string, file: string, key: string): boolean =>
    (runFreshnessSweep(repo).stale ?? []).some((x) => x.file === file && x.key === key && x.kind === 'signature');

  test('PF2c — a stale `#frontmatter:<path>` row: pinning the printed canonicalHash and renderedHash clears the stale-signature finding', () => {
    const repo = makeRepo();
    renderLine(repo, `${SOURCE}#frontmatter:agent`, '- the agent entry, as the consumer reads it (fixture)');
    write(repo, DISP('kenya'), `${read(repo, DISP('kenya')).replace(/\n*$/, '')}\nfrontmatter:\n  "agent": ${signatureRow('canonical/profiles/consumer/signatures/kenya.md#frontmatter:agent')}\n`);
    commit(repo, 'fixture: a signed frontmatter row', []);
    expect(staleRow(repo, DISP('kenya'), 'agent')).toBe(true);
    const p = printed(repo, `${DISP('kenya')}#frontmatter:agent`);
    expect(between(p.out, 'canonical entry')).toBe('"kenya"'); // canonicalStringify of the entry's value
    expect(p.out).toContain('- the agent entry, as the consumer reads it (fixture)');
    pinPrinted(repo, DISP('kenya'), 'agent', `${DISP('kenya')}#frontmatter:agent`);
    expect(staleRow(repo, DISP('kenya'), 'agent')).toBe(false);
  });

  test('PF2d — a stale shared-catalog member: pinning the printed canonicalHash and renderedHash clears the stale-signature finding', () => {
    const repo = makeRepo();
    const CATALOG = 'canonical/shared/shared-catalog.yaml';
    const SHARED = DISP('_shared');
    write(repo, CATALOG, 'members:\n  - id: fixture-member\n    owner: kenya\n    text: "A shared member the consumer profile renders (fixture)."\n');
    renderLine(repo, `${CATALOG}#fixture-member`, '- A shared member the consumer profile renders (fixture).');
    write(repo, SHARED, `source: ${CATALOG}\nmembers:\n  "fixture-member": ${signatureRow('canonical/profiles/consumer/signatures/kenya.md#fixture-member')}\n`);
    commit(repo, 'fixture: a signed shared member', []);
    expect(staleRow(repo, SHARED, 'fixture-member')).toBe(true);
    const p = printed(repo, `${SHARED}#fixture-member`);
    expect(p.out).toMatch(/^canonical member: canonical\/shared\/shared-catalog\.yaml member fixture-member/m);
    pinPrinted(repo, SHARED, 'fixture-member', `${SHARED}#fixture-member`);
    expect(staleRow(repo, SHARED, 'fixture-member')).toBe(false);
  });
});

/**
 * `verify-signing-chain --audit` — links 4–7 (ballot 2026-10-01-signing-act-chain §§ 4.2–4.4)
 * against the harness fixtures H1, H2a, H2b, H3–H7 of § 4.5, and H2c (added at Stacy's
 * pre-merge read of PR #245, ruling 11). Each builds a fixture repo with one
 * seat commit (`Agent: kenya`, re-signing `#identity`) and a synthetic harness store whose record
 * shapes are `fixtures/signing-chain/harness/shapes.json` (copied from a real store).
 *
 * The last block covers the signer filter (`--signer` / `--exclude-signer`, ballot
 * 2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form S5): Thurgood's own unit tests and
 * Stacy's falsification fixtures F1–F16 for it (signing ballot § 4.5: she specifies, Thurgood builds),
 * over the overlay tree `fixtures/signing-chain/tree-signer/` (a stacy seat, a Thurgood-owned row,
 * a stacy confirmation unit, a data charter).
 */

import * as fs from 'fs';
import * as path from 'path';
import { splitFrontmatterText } from '../frontmatter';
import {
  candidateLines,
  filterLine,
  formatAudit,
  indexCandidates,
  inputSubjectOf,
  logFormProven,
  main,
  parseSignerFilter,
  runAudit,
  type ActVerdict,
} from '../regrounding/verify-signing-chain';
import {
  buildStore,
  cleanupTmp,
  editRow,
  hash,
  head,
  commit,
  COMMIT_FORMS,
  g,
  makeRepo,
  metaFor,
  read,
  record,
  resign,
  RG,
  write,
  type StoreSpec,
} from './fixtures/signing-chain/helpers';

const SESSION = 'sess-0001';
const SPAWN = 'toolu_spawn_kenya';
const SUBJECT = 'Re-sign #identity (kenya)';
const RENDERED_LINE = "You are the iOS platform engineer for products built in your human lead's repo.";

afterAll(() => cleanupTmp());

interface Seat {
  repo: string;
  base: string;
  sha: string;
  snapshot: string;
}

/** A repo whose branch `seat-kenya` carries one seat commit re-signing `#identity`. */
function seatRepo(before?: (repo: string) => void): Seat {
  const repo = makeRepo();
  const base = g(repo, ['rev-parse', 'HEAD']).trim();
  g(repo, ['switch', '-q', '-c', 'seat-kenya']);
  before?.(repo);
  resign(repo, { seed: 'audit' });
  const sha = commit(repo, SUBJECT, ['Agent: kenya']);
  const snapshot = (splitFrontmatterText(read(repo, '.claude/agents/kenya.md'))?.body ?? '').replace(/\n+$/, '');
  return { repo, base, sha, snapshot };
}

const mainSpawn = (subagentType = 'kenya'): string[] => [
  record('mainUser', { SESSION, BRANCH: 'seat-kenya', TEXT: 'Orchestrate the re-sign.' }),
  record('mainToolUse', {
    SESSION,
    BRANCH: 'seat-kenya',
    TOOL_ID: SPAWN,
    TOOL_NAME: 'Agent',
    INPUT: { subagent_type: subagentType, model: 'sonnet', description: 'Kenya: re-sign #identity', run_in_background: true, prompt: 'You are Kenya. Re-sign #identity.' },
  }),
];

interface SeatTranscriptOpts {
  agentId?: string;
  snapshot: string;
  readRendering?: boolean;
  commitCommand?: string;
  commitOutput?: string;
}

function seatTranscript(o: SeatTranscriptOpts): string[] {
  const AGENT_ID = o.agentId ?? 'k1';
  const v = { SESSION, BRANCH: 'seat-kenya', AGENT_ID };
  const lines = [record('subagentUser', { ...v, TEXT: 'You are Kenya. Re-sign #identity.' }), record('promptSnapshot', { ...v, SNAPSHOT: o.snapshot })];
  if (o.readRendering !== false) {
    lines.push(record('subagentToolUse', { ...v, TOOL_ID: 'toolu_read', TOOL_NAME: 'Read', INPUT: { file_path: '/repo/canonical/_consumer-output/_canonical/agents/kenya.md' } }));
    lines.push(record('subagentToolResult', { ...v, TOOL_ID: 'toolu_read', OUTPUT: `     1\t# Kenya — iOS Platform Engineer (fixture)\n     5\t${RENDERED_LINE}` }));
  }
  if (o.commitCommand !== undefined) {
    lines.push(record('subagentToolUse', { ...v, TOOL_ID: 'toolu_commit', TOOL_NAME: 'Bash', INPUT: { command: o.commitCommand, description: 'Commit the re-sign' } }));
    lines.push(record('subagentToolResult', { ...v, TOOL_ID: 'toolu_commit', OUTPUT: o.commitOutput ?? '' }));
  }
  return lines;
}

function audit(s: Seat, store: string): ActVerdict[] {
  return runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store, rg: RG });
}

/** The standard anchored shape: the seat commits with the convention and prints `<sha> <subject>`. */
function standard(s: Seat, over: Partial<StoreSpec['subagents'][string]> & { snapshot?: string; readRendering?: boolean; meta?: Record<string, unknown> | null } = {}): StoreSpec {
  return {
    session: SESSION,
    main: mainSpawn(),
    subagents: withMetaSibling({
      k1: {
        lines: seatTranscript({ snapshot: over.snapshot ?? s.snapshot, readRendering: over.readRendering, commitCommand: COMMIT_FORMS.convention, commitOutput: `${s.sha} ${SUBJECT}` }),
        meta: over.meta === undefined ? metaFor('kenya', SPAWN) : over.meta,
      },
    }),
  };
}

/**
 * A sibling subagent transcript that HAS its `.meta.json` and makes no commit call. A synthetic store
 * whose only subagent lacks a meta record is the store-shape canary's C2 (ballot
 * 2026-10-23-link4-candidate-first-sha-after-commit § 3), not H7's one-act link-5 negative case; a
 * real store holds metas for the other transcripts (every real store checked has one per subagent).
 */
function withMetaSibling(subagents: StoreSpec['subagents'], session: string = SESSION, branch: string = 'seat-kenya'): StoreSpec['subagents'] {
  if (!Object.values(subagents).some((s) => s.meta === null)) return subagents;
  return {
    ...subagents,
    sib: { meta: metaFor('kenya', 'toolu_spawn_sibling'), lines: [record('subagentUser', { SESSION: session, BRANCH: branch, AGENT_ID: 'sib', TEXT: 'A sibling transcript with its meta record.' })] },
  };
}

const only = (acts: ActVerdict[]): ActVerdict => {
  expect(acts).toHaveLength(1);
  return acts[0];
};

describe('verify-signing-chain --audit (links 4–7)', () => {
  test('H1: a rebased seat commit → reads `record absent`', () => {
    const s = seatRepo();
    const store = buildStore(standard(s)); // the transcript names the ORIGINAL sha
    g(s.repo, ['switch', '-q', 'main']);
    write(s.repo, 'README.md', 'main moves\n');
    const mainTip = commit(s.repo, 'main moves', []);
    g(s.repo, ['switch', '-q', 'seat-kenya']);
    g(s.repo, ['rebase', '-q', 'main']);
    const rebased = g(s.repo, ['rev-parse', 'HEAD']).trim();
    expect(rebased).not.toBe(s.sha);
    const v = only(runAudit({ repo: s.repo, base: mainTip, head: 'seat-kenya', store, rg: RG }));
    expect(v.verdict).toBe('record absent');
    expect(v.link).toBe(4);
  });

  test('H2a: the creating transcript plus another that only quotes the SHA → one candidate → `anchored`', () => {
    const s = seatRepo();
    const spec = standard(s);
    const q = { SESSION, BRANCH: 'seat-kenya', AGENT_ID: 'q1' };
    spec.subagents.q1 = {
      meta: metaFor('stacy', 'toolu_spawn_stacy'),
      lines: [
        record('subagentUser', { ...q, TEXT: `Audit ${s.sha.slice(0, 8)} ${SUBJECT} — the brief quotes it.` }),
        record('subagentToolUse', { ...q, TOOL_ID: 'toolu_grep', TOOL_NAME: 'Bash', INPUT: { command: "grep -rn 'git commit' notes.md" } }),
        record('subagentToolResult', { ...q, TOOL_ID: 'toolu_grep', OUTPUT: `notes.md:3:[seat-kenya ${s.sha.slice(0, 8)}] ${SUBJECT}` }),
        record('subagentToolUse', { ...q, TOOL_ID: 'toolu_log', TOOL_NAME: 'Bash', INPUT: { command: 'git log --oneline -3' } }),
        record('subagentToolResult', { ...q, TOOL_ID: 'toolu_log', OUTPUT: `${s.sha.slice(0, 8)} ${SUBJECT}\nabcdef0 base` }),
      ],
    };
    const v = only(audit(s, buildStore(spec)));
    expect(v.verdict).toBe('anchored');
    expect(v.link).toBeUndefined();
    expect(v.transcript).toMatch(/agent-k1\.jsonl$/);
  });

  test('H2b: the primary commits `Agent: kenya` quietly; the seat runs a failed commit plus `; git log -1` → reads `anomaly`', () => {
    const s = seatRepo();
    const spec: StoreSpec = {
      session: SESSION,
      main: [
        ...mainSpawn(),
        record('mainToolUse', { SESSION, BRANCH: 'seat-kenya', TOOL_ID: 'toolu_main_commit', TOOL_NAME: 'Bash', INPUT: { command: COMMIT_FORMS.quiet } }),
        record('mainToolResult', { SESSION, BRANCH: 'seat-kenya', TOOL_ID: 'toolu_main_commit', OUTPUT: '' }),
      ],
      subagents: {
        k1: {
          meta: metaFor('kenya', SPAWN),
          lines: seatTranscript({
            snapshot: s.snapshot,
            commitCommand: COMMIT_FORMS.semicolon,
            commitOutput: `On branch seat-kenya\nnothing to commit, working tree clean\n${s.sha} ${SUBJECT}`,
          }),
        },
      },
    };
    const v = only(audit(s, buildStore(spec)));
    expect(v.verdict).toBe('anomaly');
    expect(v.link).toBe(4);
    expect(v.widen).toBe(true);
  });

  test.each([
    ['piped, then `&&`', "git commit -q -m 'Re-sign #identity (kenya)' | tee commit.out && git log -1 --format='%H %s'"],
    ['`&&` then `;`', "git commit -q -m 'Re-sign #identity (kenya)' && git push; git log -1 --format='%H %s'"],
  ])('H2c: the seat commits with a form outside the closed set (%s) → reads `anomaly`', (_name, command) => {
    const s = seatRepo();
    const spec: StoreSpec = {
      session: SESSION,
      main: mainSpawn(),
      subagents: {
        k1: { meta: metaFor('kenya', SPAWN), lines: seatTranscript({ snapshot: s.snapshot, commitCommand: command, commitOutput: `${s.sha} ${SUBJECT}` }) },
      },
    };
    const v = only(audit(s, buildStore(spec)));
    expect(v.verdict).toBe('anomaly');
    expect(v.link).toBe(4);
    expect(v.widen).toBe(true);
  });

  test('H3: a main-session commit carrying a seat trailer → reads `FAIL`', () => {
    const s = seatRepo();
    const spec: StoreSpec = {
      session: SESSION,
      main: [
        record('mainUser', { SESSION, BRANCH: 'seat-kenya', TEXT: 'Just sign it.' }),
        record('mainToolUse', { SESSION, BRANCH: 'seat-kenya', TOOL_ID: 'toolu_main_commit', TOOL_NAME: 'Bash', INPUT: { command: COMMIT_FORMS.convention } }),
        record('mainToolResult', { SESSION, BRANCH: 'seat-kenya', TOOL_ID: 'toolu_main_commit', OUTPUT: `${s.sha} ${SUBJECT}` }),
      ],
      subagents: {},
    };
    const v = only(audit(s, buildStore(spec)));
    expect(v.verdict).toBe('FAIL');
    expect(v.link).toBe(4);
    expect(v.detail).toMatch(/main \(orchestrator\) session/);
  });

  test('H4: meta `agentType` ≠ signer → reads `FAIL` 5', () => {
    const s = seatRepo();
    const v = only(audit(s, buildStore(standard(s, { meta: metaFor('data', SPAWN) }))));
    expect(v.verdict).toBe('FAIL');
    expect(v.link).toBe(5);
  });

  test('H5: `prompt_snapshot` ≠ charter → reads `FAIL` 6', () => {
    const s = seatRepo();
    const v = only(audit(s, buildStore(standard(s, { snapshot: 'You are a different seat entirely.' }))));
    expect(v.verdict).toBe('FAIL');
    expect(v.link).toBe(6);
  });

  test("H6: the signed row's rendered line absent from every tool result → reads `FAIL` 7", () => {
    const s = seatRepo();
    const v = only(audit(s, buildStore(standard(s, { readRendering: false }))));
    expect(v.verdict).toBe('FAIL');
    expect(v.link).toBe(7);
  });

  test("H7: the transcript's meta record missing → reads `record absent` 5", () => {
    const s = seatRepo();
    const v = only(audit(s, buildStore(standard(s, { meta: null }))));
    expect(v.verdict).toBe('record absent');
    expect(v.link).toBe(5);
  });
});

describe('verify-signing-chain --audit — reporting (§ 4.4; not among the 25)', () => {
  test('one line per act, link-numbered, counts beside and never rolled into green', () => {
    const s = seatRepo();
    const acts = audit(s, buildStore(standard(s, { meta: null })));
    const lines = formatAudit(acts, 'branch seat-kenya');
    expect(lines[0]).toMatch(/consistency, not identity/);
    expect(lines[1]).toMatch(/^record absent 5 — canonical\/profiles\/consumer\/kenya\.dispositions\.yaml#identity — kenya — [0-9a-f]{8}/);
    expect(lines[2]).toMatch(/no total is green/);
    expect(lines[2]).toMatch(/anchored 0/);
  });

  test('ruling 9: a row that renders nothing reads `record absent` 7, never `anchored`', () => {
    const sidecar = 'canonical/_consumer-output/_canonical/agents/kenya.md.attribution.json';
    const s = seatRepo((repo) => {
      const m = JSON.parse(read(repo, sidecar)) as { spans: { source: string }[] };
      m.spans = m.spans.filter((x) => !x.source.endsWith('#identity'));
      write(repo, sidecar, `${JSON.stringify(m, null, 2)}\n`);
    });
    const v = only(audit(s, buildStore(standard(s))));
    expect(v.verdict).toBe('record absent');
    expect(v.link).toBe(7);
    expect(v.detail).toMatch(/renders nothing/);
  });

  test('a Kiro-declared commit with no harness record reads `unanchored`', () => {
    const s = seatRepo();
    const store = buildStore({ session: SESSION, main: mainSpawn(), subagents: {} });
    const v = only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store, rg: RG, kiro: [s.sha.slice(0, 8)] }));
    expect(v.verdict).toBe('unanchored');
  });

  test('the store layout the audit reads is the real one (<store>/<session>.jsonl, <store>/<session>/subagents/agent-<id>.{jsonl,meta.json})', () => {
    const s = seatRepo();
    const store = buildStore(standard(s));
    expect(fs.existsSync(path.join(store, `${SESSION}.jsonl`))).toBe(true);
    expect(fs.existsSync(path.join(store, SESSION, 'subagents', 'agent-k1.meta.json'))).toBe(true);
    expect(RENDERED_LINE).toBe(read(s.repo, 'canonical/_consumer-output/_canonical/agents/kenya.md').split('\n')[4]);
  });
});

describe('verify-signing-chain --audit — the lookup rule, unit level (§ 4.3; not among the 25)', () => {
  test('success evidence is a closed set: `&&` on the commit line or `set -e`; `;` and a bare newline are outside it', () => {
    expect(logFormProven(COMMIT_FORMS.convention)).toBe(true);
    expect(logFormProven('set -euo pipefail\ngit commit -q -m s\ngit log -1 --oneline')).toBe(true);
    expect(logFormProven(COMMIT_FORMS.semicolon)).toBe(false);
    expect(logFormProven('git commit -q -m s\ngit log -1 --oneline')).toBe(false);
    // Ruling 11: `&&` only — every operator from the commit to the log is `&&`.
    expect(logFormProven("git add -A && git commit -q -m 's; t | u' && git push && git log -1")).toBe(true);
    expect(logFormProven('git commit -q -m s 2>&1 && git log -1')).toBe(true);
    expect(logFormProven('git commit -q -m s | tee f && git log -1')).toBe(false);
    expect(logFormProven('git commit -q -m s && git push; git log -1')).toBe(false);
    expect(logFormProven('git commit -q -m s || true && git log -1')).toBe(false);
    // `set -e` counts only for a standalone commit.
    expect(logFormProven('set -e\ngit commit -q -m s | tee f\ngit log -1')).toBe(false);
    expect(logFormProven('set -e\ngit commit -q -m s || echo failed\ngit log -1')).toBe(false);
    expect(logFormProven('set -e\necho x | git commit -q -F -\ngit log -1')).toBe(false);
    expect(logFormProven('set -e\nmake && git commit -q -m s\ngit log -1')).toBe(true);
    expect(logFormProven('git commit -q -m s\nset -e\ngit log -1')).toBe(false);
  });

  test('one candidate per pass: a loop or a repeatedly-called shell function with `git log -1` yields every pass line; otherwise only the first log line', () => {
    const out = 'aaaaaaa1 one\nbbbbbbb2 two';
    const fn = "s() { git commit -q -m \"$1\" && git log -1 --format='%h %s'; }\ns one\ns two";
    expect(candidateLines(fn, out).map((c) => c.prefix)).toEqual(['aaaaaaa1', 'bbbbbbb2']);
    expect(candidateLines('git commit -q -m one && git log --oneline -2', out).map((c) => c.prefix)).toEqual(['aaaaaaa1']);
  });
});

// ============================================================================
// Ballot 2026-10-23-link4-candidate-first-sha-after-commit § 3 — the candidate is the first SHA
// printed after a proven commit, any line shape, with C's subject from the result or from that
// commit's own message; the store-shape canary. Exercised file:
// tools/agent-generator/regrounding/verify-signing-chain.ts. N1–N13, P1–P9, C1–C5 (+C2c).
// Every fixture satisfies links 5–7 as H1 does, so each verdict is decided at link 4.
// ============================================================================

interface Call {
  id: string;
  command: string;
  output: string;
}

const C = (s: Seat, n: number = 40): string => s.sha.slice(0, n);
const OTHER = 'd'.repeat(40);

/** Seat-transcript lines (links 5–7 satisfied) followed by the given Bash calls. */
function seatCalls(s: Seat, calls: Call[], agentId = 'k1'): string[] {
  const v = { SESSION, BRANCH: 'seat-kenya', AGENT_ID: agentId };
  const lines = seatTranscript({ snapshot: s.snapshot, agentId });
  for (const c of calls) {
    lines.push(record('subagentToolUse', { ...v, TOOL_ID: c.id, TOOL_NAME: 'Bash', INPUT: { command: c.command } }));
    lines.push(record('subagentToolResult', { ...v, TOOL_ID: c.id, OUTPUT: c.output }));
  }
  return lines;
}

const mainCalls = (calls: Call[]): string[] =>
  calls.flatMap((c) => [
    record('mainToolUse', { SESSION, BRANCH: 'seat-kenya', TOOL_ID: c.id, TOOL_NAME: 'Bash', INPUT: { command: c.command } }),
    record('mainToolResult', { SESSION, BRANCH: 'seat-kenya', TOOL_ID: c.id, OUTPUT: c.output }),
  ]);

/** A store whose one seat transcript holds the given calls. */
const oneSeatStore = (s: Seat, calls: Call[], main: string[] = mainSpawn()): string =>
  buildStore({ session: SESSION, main, subagents: { k1: { meta: metaFor('kenya', SPAWN), lines: seatCalls(s, calls) } } });

describe('verify-signing-chain --audit — the amended lookup rule (ballot 2026-10-23 § 3: N, P)', () => {
  const T = 'Agent: kenya';
  const fixed = (s: Seat, command: string, output: string): ActVerdict => only(audit(s, oneSeatStore(s, [{ id: 'toolu_c1', command, output }])));

  test('N1: another agent\'s call prints C, with no `git commit` in it → not a candidate', () => {
    const s = seatRepo();
    const store = buildStore({
      session: SESSION,
      main: mainSpawn(),
      subagents: {
        q1: { meta: metaFor('stacy', 'toolu_spawn_stacy'), lines: [record('subagentToolUse', { SESSION, BRANCH: 'seat-kenya', AGENT_ID: 'q1', TOOL_ID: 'toolu_q', TOOL_NAME: 'Bash', INPUT: { command: "git log -1 --format='%H %s'" } }), record('subagentToolResult', { SESSION, BRANCH: 'seat-kenya', AGENT_ID: 'q1', TOOL_ID: 'toolu_q', OUTPUT: `${C(s)} ${SUBJECT}` })] },
        // An unrelated, paired commit call keeps the store recognized (the canary would otherwise read it).
        d1: { meta: metaFor('kenya', SPAWN), lines: seatCalls(s, [{ id: 'toolu_d', command: `git commit -q -m 'D subject' && git log -1 --format='%H %s'`, output: `${OTHER} D subject` }], 'd1') },
      },
    });
    expect(only(audit(s, store)).verdict).toBe('record absent');
  });

  test('N2: the same seat prints C in a later call with no commit → not a candidate', () => {
    const s = seatRepo();
    const v = only(audit(s, oneSeatStore(s, [{ id: 'toolu_d', command: `git commit -q -m 'D subject' && git log -1 --format='%H %s'`, output: `${OTHER} D subject` }, { id: 'toolu_c1', command: "git log -1 --format='%H %s'", output: `${C(s)} ${SUBJECT}` }])));
    expect(v.verdict).toBe('record absent');
    expect(v.link).toBe(4);
  });

  test('N3: the call commits D, then `git log -2` prints D, then C → not a candidate for C', () => {
    const s = seatRepo();
    const v = fixed(s, `git commit -q -m 'D subject' && git log -2 --format='%H %s'`, `${OTHER} D subject\n${C(s)} ${SUBJECT}`);
    expect(v.verdict).toBe('record absent');
  });

  test('N4b: a primary\'s quiet commit C has subject S; the seat\'s `commit -q -m S …; git log -1 --format=%h` fails and prints C\'s SHA alone → `anomaly`, never `anchored`', () => {
    const s = seatRepo();
    const main = [...mainSpawn(), ...mainCalls([{ id: 'toolu_main_commit', command: COMMIT_FORMS.quiet, output: '' }])];
    const v = only(audit(s, oneSeatStore(s, [{ id: 'toolu_c1', command: `git commit -q -m '${SUBJECT}' -m '${T}'; git log -1 --format=%h`, output: `On branch seat-kenya\nnothing to commit, working tree clean\n${C(s)}` }], main)));
    expect(v.verdict).toBe('anomaly');
    expect(v.link).toBe(4);
    expect(v.widen).toBe(true);
  });

  test('N5: the main session prints C after its own commit (`commit D && git log -2`) → no candidate for C, and no spurious H3 `FAIL`', () => {
    const s = seatRepo();
    const main = [...mainSpawn(), ...mainCalls([{ id: 'toolu_main_d', command: `git commit -q -m 'D subject' && git log -2 --format='%H %s'`, output: `${OTHER} D subject\n${C(s)} ${SUBJECT}` }])];
    const store = buildStore({ session: SESSION, main, subagents: {} });
    expect(only(audit(s, store)).verdict).toBe('record absent');
  });

  test('N6: a bare SHA line, no subject in the result and none readable from the input (`-F <file>`, `%h`) → `record absent`', () => {
    const s = seatRepo();
    expect(fixed(s, 'git commit -q -F msg.txt && git log -1 --format=%h', C(s, 9)).verdict).toBe('record absent');
  });

  test('N7: `git commit -q … && git push`, no `git log`; the push output shows `old..C` → `record absent`', () => {
    const s = seatRepo();
    const v = fixed(s, `git commit -q -m '${SUBJECT}' && git push`, `To github.com:x/y.git\n   ${OTHER.slice(0, 9)}..${C(s, 9)}  seat-kenya -> seat-kenya`);
    expect(v.verdict).toBe('record absent');
  });

  test('N8: `-F <file>`, so no input subject — (a) `%H %s` anchors by the result route; (b) `%h` alone reads `record absent`', () => {
    const s = seatRepo();
    expect(fixed(s, "git commit -q -F msg.txt && git log -1 --format='%H %s'", `${C(s)} ${SUBJECT}`).verdict).toBe('anchored');
    expect(fixed(s, 'git commit -q -F msg.txt && git log -1 --format=%h', C(s, 9)).verdict).toBe('record absent');
  });

  test('N9: `git commit … && git -C <other> log -1` → the prefix fails: not a candidate for C', () => {
    const s = seatRepo();
    const v = fixed(s, `git commit -q -m '${SUBJECT}' && git -C /other/repo log -1 --format='%H %s'`, `${OTHER} other subject`);
    expect(v.verdict).toBe('record absent');
  });

  test('N10: `commit -q -m S && git push && git log -1 --format=%h%n%b`; the push prints `old..C` before the log → `anchored` (input route)', () => {
    const s = seatRepo();
    const v = fixed(s, `git commit -q -m '${SUBJECT}' && git push && git log -1 --format='%h%n%b'`, `To github.com:x/y.git\n   ${OTHER.slice(0, 9)}..${C(s, 9)}  seat-kenya -> seat-kenya\n${C(s, 9)}\nbody`);
    expect(v.verdict).toBe('anchored');
  });

  test('N11: `git rev-parse HEAD~1 && git commit -q -m S && git log …` — a hex token printed before the log → `record absent` (the first SHA is not C\'s)', () => {
    const s = seatRepo();
    const v = fixed(s, `git rev-parse HEAD~1 && git commit -q -m '${SUBJECT}' && git log -1 --format='%H %s'`, `${OTHER}\n${C(s)} ${SUBJECT}`);
    expect(v.verdict).toBe('record absent');
  });

  test('N12: the main session commits C with `-q -m S -m "Agent: kenya" && git log -1 --format=%h` → `FAIL` 4 (H3)', () => {
    const s = seatRepo();
    const main = [...mainSpawn(), ...mainCalls([{ id: 'toolu_main_c', command: `git commit -q -m '${SUBJECT}' -m '${T}' && git log -1 --format=%h`, output: C(s, 9) }])];
    const v = only(audit(s, buildStore({ session: SESSION, main, subagents: {} })));
    expect(v.verdict).toBe('FAIL');
    expect(v.link).toBe(4);
  });

  test('N13: `git commit -q -m S && git rev-parse HEAD`, no `git log` → `record absent`', () => {
    const s = seatRepo();
    expect(fixed(s, `git commit -q -m '${SUBJECT}' && git rev-parse HEAD`, C(s)).verdict).toBe('record absent');
  });

  test.each([
    ['P1 `&& … ;`', "&& git status --porcelain; npx tsx tools/x.ts"],
    ['P2 `&& …`', '&& npx tsx tools/x.ts'],
    ['P3 `&& … &&`', '&& git status --porcelain && npx tsx tools/x.ts'],
    ['P4 `; … ;`', '; git status --short; npx tsx tools/x.ts'],
    ['P5 `; … | head`', '; git status --short | head -3; npx tsx tools/x.ts'],
  ])('%s: #445\'s `-q -m S -m T && git log -1 --format=%h%n%B` with that tail → `anchored` (result route, next line)', (_n, tail) => {
    const s = seatRepo();
    const v = fixed(s, `git commit -q -m '${SUBJECT}' -m '${T}' && git log -1 --format='%h%n%B' ${tail}`, `${C(s, 9)}\n${SUBJECT}\n\n${T}\n`);
    expect(v.verdict).toBe('anchored');
  });

  test('P6: `%H%n%B | cat` (the full SHA; the pipe sits after the log) → `anchored`', () => {
    const s = seatRepo();
    const v = fixed(s, `git commit -q -m '${SUBJECT}' -m '${T}' && git log -1 --format='%H%n%B' | cat; git status --porcelain`, `${C(s)}\n${SUBJECT}\n\n${T}\n`);
    expect(v.verdict).toBe('anchored');
  });

  test('P7: `%h%n%b` (Lina\'s: the subject is not in the result) → `anchored` (input route, first `-m`)', () => {
    const s = seatRepo();
    const v = fixed(s, `git commit -q -m '${SUBJECT}' -m '${T}' && git log -1 --format='%h%n%b' && git status --porcelain && npx tsx tools/x.ts`, `${C(s, 9)}\n${T}\n`);
    expect(v.verdict).toBe('anchored');
  });

  test('P8: the conforming line read from governance/signing-seat-brief.md § "The commit line" → `anchored` (the document and the parser cannot drift apart)', () => {
    const s = seatRepo();
    const doc = fs.readFileSync(path.resolve(__dirname, '../../../governance/signing-seat-brief.md'), 'utf8');
    const section = doc.slice(doc.indexOf('### The commit line'));
    const block = /```bash\n([\s\S]*?)\n```/.exec(section);
    expect(block).not.toBeNull();
    const command = (block as RegExpExecArray)[1]
      .replace('<Seat> first signatures (C1): <rows> — <assent|refuse>', SUBJECT)
      .replace(/<Seat>/g, 'Kenya')
      .replace('<body>', 'body')
      .replace('<model attribution>', 'Claude');
    expect(command).toContain('&& git log -1 --format=');
    const v = fixed(s, command, `${C(s)} ${SUBJECT}`);
    expect(v.verdict).toBe('anchored');
  });

  test('P9: no `-q`, only the `[<branch> <sha>] <subject>` line → `anchored` (unchanged)', () => {
    const s = seatRepo();
    const v = fixed(s, `git commit -m '${SUBJECT}' -m '${T}' && git status --short`, `[seat-kenya ${C(s, 9)}] ${SUBJECT}\n 1 file changed, 2 insertions(+)`);
    expect(v.verdict).toBe('anchored');
  });
});

describe('verify-signing-chain --audit — the store-shape canary (ballot 2026-10-23 § 2b, § 2d; C1–C5)', () => {
  const canaryOf = (v: ActVerdict): void => {
    expect(v.verdict).toBe('anomaly');
    expect(v.link).toBe(4);
    expect(v.detail).toBe('store layout unrecognized');
    expect(v.widen).toBe(false);
    expect(v.canary).toBe(true);
  };
  const peterLines = (acts: ActVerdict[]): string[] => formatAudit(acts, 'branch seat-kenya').filter((l) => l.startsWith('**Open for Peter**:'));

  test('C1: a store with subagent transcripts but no paired commit call → `anomaly` 4 `store layout unrecognized`, sends no act into J', () => {
    const s = seatRepo();
    const store = buildStore({ session: SESSION, main: mainSpawn(), subagents: { k1: { meta: metaFor('kenya', SPAWN), lines: seatCalls(s, []) } } });
    const acts = audit(s, store);
    canaryOf(only(acts));
    expect(peterLines(acts)).toHaveLength(1);
  });

  test('C2: subagent transcripts exist and none has its `.meta.json` → the same', () => {
    const s = seatRepo();
    const store = buildStore({ session: SESSION, main: mainSpawn(), subagents: { k1: { meta: null, lines: seatCalls(s, [{ id: 'toolu_c1', command: COMMIT_FORMS.convention, output: `${C(s)} ${SUBJECT}` }]) } } });
    const acts = audit(s, store);
    canaryOf(only(acts));
    expect(peterLines(acts)).toHaveLength(1);
  });

  test('C2c: one recognized store and one store with no meta → only the second fires; acts in the recognized store read normally', () => {
    const s = seatRepo();
    const good = buildStore(standard(s));
    const bad = buildStore({ session: 'sess-0002', main: [], subagents: { b1: { meta: null, lines: [record('subagentUser', { SESSION: 'sess-0002', BRANCH: 'seat-kenya', AGENT_ID: 'b1', TEXT: 'x' })] } } });
    const acts = runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store: [good, bad], rg: RG });
    const v = only(acts);
    expect(v.verdict).toBe('anchored');
    expect(v.canary).toBeUndefined();
    expect(v.unrecognizedStores).toEqual([bad]);
    expect(peterLines(acts)).toHaveLength(1);
    expect(peterLines(acts)[0]).toContain(bad);
  });

  test('C2c′: an act with no candidate in the recognized store reads the canary while the unrecognized store is in the run', () => {
    const s = seatRepo();
    const good = buildStore({ session: SESSION, main: mainSpawn(), subagents: { k1: { meta: metaFor('kenya', SPAWN), lines: seatCalls(s, [{ id: 'toolu_d', command: `git commit -q -m 'D subject' && git log -1 --format='%H %s'`, output: `${OTHER} D subject` }, { id: 'toolu_c1', command: "git log -1 --format='%H %s'", output: `${C(s)} ${SUBJECT}` }]) } } });
    const bad = buildStore({ session: 'sess-0002', main: [], subagents: { b1: { meta: null, lines: [record('subagentUser', { SESSION: 'sess-0002', BRANCH: 'seat-kenya', AGENT_ID: 'b1', TEXT: 'x' })] } } });
    const acts = runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store: [good, bad], rg: RG });
    canaryOf(only(acts));
    expect(peterLines(acts)).toHaveLength(1);
  });

  test('C3: control — an empty or missing store → `record absent` 4, or `unanchored` for an act declared under `--kiro`', () => {
    const s = seatRepo();
    const empty = buildStore({ session: SESSION, main: [], subagents: {} });
    const missing = path.join(empty, 'does-not-exist');
    for (const store of [empty, missing]) {
      const v = only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store, rg: RG }));
      expect(v.verdict).toBe('record absent');
      expect(v.link).toBe(4);
      expect(only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store, rg: RG, kiro: [s.sha.slice(0, 8)] })).verdict).toBe('unanchored');
    }
  });

  test('C4: control — main-session transcripts with paired commit calls and no subagent transcripts → `record absent` 4, and `FAIL` 4 (H3) where a main-session candidate exists', () => {
    const s = seatRepo();
    const other = buildStore({ session: SESSION, main: [...mainSpawn(), ...mainCalls([{ id: 'toolu_m', command: `git commit -q -m 'D subject' && git log -1 --format='%H %s'`, output: `${OTHER} D subject` }])], subagents: {} });
    expect(only(audit(s, other)).verdict).toBe('record absent');
    const mine = buildStore({ session: SESSION, main: [...mainSpawn(), ...mainCalls([{ id: 'toolu_m', command: COMMIT_FORMS.convention, output: `${C(s)} ${SUBJECT}` }])], subagents: {} });
    expect(only(audit(s, mine)).verdict).toBe('FAIL');
  });

  test('C5: a run whose acts read the canary sends no act into J (`widen` false) and prints one Peter line for the run', () => {
    const s = seatRepo();
    const store = buildStore({ session: SESSION, main: mainSpawn(), subagents: { k1: { meta: null, lines: seatCalls(s, [{ id: 'toolu_c1', command: COMMIT_FORMS.convention, output: `${C(s)} ${SUBJECT}` }]) } } });
    const acts = audit(s, store);
    expect(acts.every((a) => !a.widen)).toBe(true);
    const lines = formatAudit(acts, 'branch seat-kenya');
    expect(lines.filter((l) => l.startsWith('**Open for Peter**:'))).toHaveLength(1);
    expect(lines.some((l) => /widening/.test(l))).toBe(false);
  });
});

// ============================================================================
// The link-4 dedupe (Peter, 2026-11-08T03:55:36Z, "Let's go (A) with the class option"; record
// .kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-link4-dedupe.md).
// Fixtures P9b–P9d, K1–K6, N3b, N5b: Stacy's specification (scratchpad link4 fixture spec,
// 2026-11-08), built by Thurgood. Two candidate lines in ONE tool call are one candidate for C
// when both prefixes are prefixes of C's full SHA and the subjects are equal; never across calls,
// transcripts or commits. Exercised file: tools/agent-generator/regrounding/verify-signing-chain.ts.
// ============================================================================

describe('verify-signing-chain --audit — link 4 counts one commit once (dedupe fixtures; P9b–d, K1–K6, N3b, N5b)', () => {
  const T = 'Agent: kenya';
  const br = (sha: string, subject: string): string => `[seat-kenya ${sha}] ${subject}\n 2 files changed, 9 insertions(+)`;
  const P9B_CMD = `git commit -F - <<'EOF' && git log -1 --format='%H %s'\n${SUBJECT}\n\n${T}\nEOF`;
  const p9bOut = (s: Seat): string => `${br(C(s, 9), SUBJECT)}\n${C(s)} ${SUBJECT}`;
  const verdict = (s: Seat, calls: Call[]): ActVerdict => only(audit(s, oneSeatStore(s, calls)));

  test('P9b: one call, no `-q`, the bracket line and the log line → ONE candidate, `anchored` (today: `anomaly` 4, "2 candidates")', () => {
    const s = seatRepo();
    const store = oneSeatStore(s, [{ id: 'toolu_c1', command: P9B_CMD, output: p9bOut(s) }]);
    expect(indexCandidates(store)).toHaveLength(1);
    expect(only(audit(s, store)).verdict).toBe('anchored');
  });

  test('P9c: `git commit -m S -m T && git log -1 --format=%h` (no `-q`; the subject from the input) → `anchored`', () => {
    const s = seatRepo();
    const v = verdict(s, [{ id: 'toolu_c1', command: `git commit -m "${SUBJECT}" -m "${T}" && git log -1 --format=%h`, output: `${br(C(s, 9), SUBJECT)}\n${C(s, 9)}` }]);
    expect(v.verdict).toBe('anchored');
  });

  test('P9d: P9b\'s call present in two stores under one `tool_use` id → one candidate, not two and not four', () => {
    const s = seatRepo();
    const calls = [{ id: 'toolu_c1', command: P9B_CMD, output: p9bOut(s) }];
    const stores = [oneSeatStore(s, calls), oneSeatStore(s, calls)];
    expect(indexCandidates(stores)).toHaveLength(1);
    expect(only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store: stores, rg: RG })).verdict).toBe('anchored');
  });

  test('K4: `commit S1 && commit S && git log -1` (no `-q`; makes D, then C) → C anchored from C9 and C40 merged; D\'s candidate is its own', () => {
    const s = seatRepo();
    const out = `${br('d'.repeat(9), 'S1')}\n${br(C(s, 9), SUBJECT)}\n${C(s)} ${SUBJECT}`;
    const store = oneSeatStore(s, [{ id: 'toolu_c1', command: `git commit -m "S1" && git commit -m "${SUBJECT}" && git log -1 --format='%H %s'`, output: out }]);
    expect(indexCandidates(store).map((c) => c.prefix).sort()).toEqual([C(s), 'd'.repeat(9)].sort());
    expect(only(audit(s, store)).verdict).toBe('anchored');
  });

  test('K5: both commits carry subject S — C anchored; D keeps its own D9 candidate (a dedupe keyed on the subject alone would drop it)', () => {
    const s = seatRepo();
    const out = `${br('d'.repeat(9), SUBJECT)}\n${br(C(s, 9), SUBJECT)}\n${C(s)} ${SUBJECT}`;
    const store = oneSeatStore(s, [{ id: 'toolu_c1', command: `git commit -m "${SUBJECT}" && git commit --allow-empty -m "${SUBJECT}" && git log -1 --format='%H %s'`, output: out }]);
    expect(indexCandidates(store).map((c) => c.prefix).sort()).toEqual([C(s), 'd'.repeat(9)].sort());
    expect(only(audit(s, store)).verdict).toBe('anchored');
  });

  test('K3b: #415\'s form without `-q` (heredoc, a newline, `git log -1 --format="%h %s" ;`) → `anchored`: the bracket line is success evidence (a) and the unproven log line names the same commit', () => {
    const s = seatRepo();
    const v = verdict(s, [{ id: 'toolu_c1', command: `git commit -F - <<'EOF'\n${SUBJECT}\n\n${T}\nEOF\ngit log -1 --format='%h %s' ;`, output: `${br(C(s, 9), SUBJECT)}\n${C(s, 9)} ${SUBJECT}` }]);
    expect(v.verdict).toBe('anchored');
  });

  test('K1: two commit-creating calls in one transcript, each printing P9b\'s two lines → `anomaly` 4, 2 candidates', () => {
    const s = seatRepo();
    const v = verdict(s, [
      { id: 'toolu_c1', command: P9B_CMD, output: p9bOut(s) },
      { id: 'toolu_c2', command: P9B_CMD, output: p9bOut(s) },
    ]);
    expect(v.verdict).toBe('anomaly');
    expect(v.link).toBe(4);
    expect(v.detail).toMatch(/^2 candidates/);
  });

  test('K1b: call 1 prints only the bracket line, call 2 only the log line → `anomaly` 4: the dedupe is per call, never across calls', () => {
    const s = seatRepo();
    const v = verdict(s, [
      { id: 'toolu_c1', command: `git commit -m "${SUBJECT}" -m "${T}"`, output: br(C(s, 9), SUBJECT) },
      { id: 'toolu_c2', command: "git commit -m 'x' && git log -1 --format='%H %s'", output: `${C(s)} ${SUBJECT}` },
    ]);
    expect(v.verdict).toBe('anomaly');
    expect(v.detail).toMatch(/^2 candidates/);
  });

  test('K2: K1 with the two calls in two subagent transcripts → `anomaly` 4', () => {
    const s = seatRepo();
    const call = (id: string): Call => ({ id, command: P9B_CMD, output: p9bOut(s) });
    const store = buildStore({
      session: SESSION,
      main: mainSpawn(),
      subagents: { k1: { meta: metaFor('kenya', SPAWN), lines: seatCalls(s, [call('toolu_c1')], 'k1') }, k2: { meta: metaFor('kenya', SPAWN), lines: seatCalls(s, [call('toolu_c2')], 'k2') } },
    });
    const v = only(audit(s, store));
    expect(v.verdict).toBe('anomaly');
    expect(v.link).toBe(4);
  });

  test('K3: #415\'s form verbatim (`-q`, heredoc, newline, `git log … ; git log … trailers`) → `anomaly` 4, one unproven candidate (H2b); the dedupe does not apply', () => {
    const s = seatRepo();
    const v = verdict(s, [
      {
        id: 'toolu_c1',
        command: `git commit -q -F - <<'EOF'\n${SUBJECT}\n\n${T}\nEOF\ngit log -1 --format='%h %s' ; git log -1 --format='%(trailers:key=Agent,valueonly)'`,
        output: `cat: illegal option -- A\nusage: cat [-belnstuv] [file ...]\n${C(s, 9)} ${SUBJECT}\nStacy`,
      },
    ]);
    expect(v.verdict).toBe('anomaly');
    expect(v.link).toBe(4);
    expect(v.detail).toMatch(/cannot show the commit succeeded/);
  });

  test('K6: a main-session call and a subagent call both name C, each with P9b\'s shape → `anomaly` 4 (several); one call\'s two lines count once, two calls twice', () => {
    const s = seatRepo();
    const call = { id: 'toolu_m', command: P9B_CMD, output: p9bOut(s) };
    const store = buildStore({ session: SESSION, main: [...mainSpawn(), ...mainCalls([call])], subagents: { k1: { meta: metaFor('kenya', SPAWN), lines: seatCalls(s, [{ ...call, id: 'toolu_c1' }]) } } });
    expect(indexCandidates(store)).toHaveLength(2);
    const v = only(audit(s, store));
    expect(v.verdict).toBe('anomaly');
    expect(v.detail).toMatch(/^2 candidates/);
  });

  test('N3b: N3 without `-q` — `[x D9] S1`, then `log -2` prints D, then C → one candidate (D\'s), none for C', () => {
    const s = seatRepo();
    const out = `${br('d'.repeat(9), 'S1')}\n${OTHER} S1\n${C(s)} ${SUBJECT}`;
    const store = oneSeatStore(s, [{ id: 'toolu_c1', command: `git commit -m 'S1' && git log -2 --format='%H %s'`, output: out }]);
    expect(indexCandidates(store).map((c) => c.prefix)).toEqual([OTHER]);
    expect(only(audit(s, store)).verdict).toBe('record absent');
  });

  test('N5b: N5 without `-q` — the main session prints C after its own commit → no candidate for C, and no spurious H3 `FAIL`', () => {
    const s = seatRepo();
    const out = `${br('d'.repeat(9), 'S1')}\n${OTHER} S1\n${C(s)} ${SUBJECT}`;
    const main = [...mainSpawn(), ...mainCalls([{ id: 'toolu_main_d', command: `git commit -m 'S1' && git log -2 --format='%H %s'`, output: out }])];
    const v = only(audit(s, buildStore({ session: SESSION, main, subagents: {} })));
    expect(v.verdict).toBe('record absent');
  });
});

describe('verify-signing-chain --audit — the input subject, unit level (ballot 2026-10-23 § 2a)', () => {
  test.each([
    ["git commit -q -m 'S one' -m T", 'S one'],
    ['git commit -q -m "S two" -m T', 'S two'],
    ['git commit -qm S3', 'S3'],
    ['git commit --message=S4 -m T', 'S4'],
    ["git commit -q -F - <<'EOF' && git log -1\nS five\n\nbody\nEOF", 'S five'],
    ["git add -A && git commit -q -m 'S; six && x' && git log -1", 'S; six && x'],
    ['git commit -q -F msg.txt && git log -1', undefined],
    ['git log -1', undefined],
  ])('%s → %s', (command, expected) => {
    expect(inputSubjectOf(command)).toBe(expected);
  });
});

// ============================================================================
// The signer filter — `--signer <seat>` / `--exclude-signer <seat>` (sitting-2 ballot S5).
// Fixtures F1–F16: Stacy's specification (2026-10-19), built by Thurgood. The oracle for every
// fixture: a filter is string equality on the printed `seat` column and on nothing else.
// ============================================================================

const SG = 'sess-signer';
const BR = 'mixed';
const STACY_RENDERED = "You are the product governance and claims verification seat in your human lead's repo.";
const STACY_IN_SCOPE = "You audit whether a completed task's claims match what actually shipped.";
const READ_OUTPUT: Record<string, string> = {
  kenya: `     1\t# Kenya — iOS Platform Engineer (fixture)\n     5\t${RENDERED_LINE}`,
  stacy: `     1\t# Stacy — Product Governance (fixture)\n     5\t${STACY_RENDERED}\n     9\t${STACY_IN_SCOPE}`,
};
const CONVENTION = (subject: string): string => `git commit -q -F - <<'EOF' && git log -1 --format='%H %s'\n${subject}\n\nAgent: x\nEOF`;
const H2C_FORM = (subject: string): string => `git commit -q -m '${subject}' && git push; git log -1 --format='%H %s'`;

/** `tree/` plus the `tree-signer/` overlay, on `main`; then branch `mixed`. */
function signerRepo(extra?: (repo: string) => void): { repo: string; base: string } {
  const repo = makeRepo();
  const dir = path.join(__dirname, 'fixtures', 'signing-chain', 'tree-signer');
  const layout = JSON.parse(fs.readFileSync(path.join(dir, 'layout.json'), 'utf8')) as Record<string, string>;
  for (const [dest, src] of Object.entries(layout)) if (!dest.startsWith('_')) write(repo, dest, fs.readFileSync(path.join(dir, src), 'utf8'));
  extra?.(repo);
  const base = commit(repo, 'base: signer overlay', []);
  g(repo, ['switch', '-q', '-c', BR]);
  return { repo, base };
}

const charterSnapshot = (repo: string, seat: string, at?: string): string => {
  const text = at ? g(repo, ['show', `${at}:.claude/agents/${seat}.md`]) : read(repo, `.claude/agents/${seat}.md`);
  return (splitFrontmatterText(text)?.body ?? '').replace(/\n+$/, '');
};

interface Tx {
  id: string;
  /** The spawned seat: the parent tool_use's subagent_type and (by default) meta agentType. */
  seat: string;
  /** meta agentType override; `null` omits the meta file (H7). */
  meta?: string | null;
  snapshot?: string;
  read?: string | false;
  commits: { sha: string; subject: string; command?: string; output?: string }[];
  /** F16: the first record carries no gitBranch / timestamp, so link 6 takes its fallback. */
  noBranch?: boolean;
}

function storeOf(repo: string, txs: Tx[], mainExtra: string[] = []): string {
  const main = [record('mainUser', { SESSION: SG, BRANCH: BR, TEXT: 'Orchestrate.' })];
  const subagents: StoreSpec['subagents'] = {};
  for (const t of txs) {
    const spawn = `toolu_spawn_${t.id}`;
    main.push(record('mainToolUse', { SESSION: SG, BRANCH: BR, TOOL_ID: spawn, TOOL_NAME: 'Agent', INPUT: { subagent_type: t.seat, model: 'sonnet', description: `${t.seat}: act`, prompt: `You are ${t.seat}.` } }));
    const v = { SESSION: SG, BRANCH: BR, AGENT_ID: t.id };
    const first = t.noBranch ? { ...v, BRANCH: undefined, TS: undefined } : v;
    const lines = [record('subagentUser', { ...first, TEXT: `You are ${t.seat}.` }), record('promptSnapshot', { ...v, SNAPSHOT: t.snapshot ?? charterSnapshot(repo, t.seat) })];
    const readSeat = t.read === undefined ? t.seat : t.read;
    if (readSeat) {
      lines.push(record('subagentToolUse', { ...v, TOOL_ID: `toolu_read_${t.id}`, TOOL_NAME: 'Read', INPUT: { file_path: `/repo/canonical/_consumer-output/_canonical/agents/${readSeat}.md` } }));
      lines.push(record('subagentToolResult', { ...v, TOOL_ID: `toolu_read_${t.id}`, OUTPUT: READ_OUTPUT[readSeat] }));
    }
    t.commits.forEach((c, n) => {
      lines.push(record('subagentToolUse', { ...v, TOOL_ID: `toolu_commit_${t.id}_${n}`, TOOL_NAME: 'Bash', INPUT: { command: c.command ?? CONVENTION(c.subject) } }));
      lines.push(record('subagentToolResult', { ...v, TOOL_ID: `toolu_commit_${t.id}_${n}`, OUTPUT: c.output ?? `${c.sha} ${c.subject}` }));
    });
    subagents[t.id] = { lines, meta: t.meta === null ? null : metaFor(t.meta ?? t.seat, spawn) };
  }
  return buildStore({ session: SG, main: [...main, ...mainExtra], subagents: withMetaSibling(subagents, SG, BR) });
}

const reconfirmStacy = (repo: string, seed: string): void => {
  const h = hash(seed);
  write(repo, 'canonical/operative-sets/stacy.yaml', read(repo, 'canonical/operative-sets/stacy.yaml').replace(/canonicalHash: .*/, `canonicalHash: ${h}`));
  write(repo, 'canonical/profiles/consumer/confirmations/stacy.md', read(repo, 'canonical/profiles/consumer/confirmations/stacy.md').replace(/canonicalHash: .*/, `canonicalHash: ${h}`));
};

/** The six commits of the shared range M (fixture spec § 1). */
type MName = 'M1' | 'M2' | 'M3' | 'M4' | 'M5' | 'M6';
const M_STEPS: Record<MName, { subject: string; trailer: string; row: string; make(repo: string): void; tx?: (sha: string, subject: string) => Omit<Tx, 'id'> }> = {
  M1: { subject: 'Re-sign kenya #identity', trailer: 'Agent: kenya', row: 'canonical/profiles/consumer/kenya.dispositions.yaml#identity', make: (r) => void resign(r, { seed: 'm1' }), tx: (sha, subject) => ({ seat: 'kenya', commits: [{ sha, subject }] }) },
  M2: { subject: 'Re-sign stacy #identity', trailer: 'Agent: stacy', row: 'canonical/profiles/consumer/stacy.dispositions.yaml#identity', make: (r) => void resign(r, { seed: 'm2', seat: 'stacy' }), tx: (sha, subject) => ({ seat: 'stacy', commits: [{ sha, subject }] }) },
  M3: {
    subject: 'Re-sign thurgood #trigger-types (stacy)',
    trailer: 'Agent: stacy',
    row: 'canonical/profiles/consumer/thurgood.dispositions.yaml#trigger-types',
    make: (r) => void resign(r, { seed: 'm3', seat: 'thurgood', key: '#trigger-types' }),
    tx: (sha, subject) => ({ seat: 'stacy', read: false, commits: [{ sha, subject }] }),
  },
  M4: { subject: 'Re-sign stacy #second', trailer: 'Agent: stacy', row: 'canonical/profiles/consumer/stacy.dispositions.yaml#second', make: (r) => void resign(r, { seed: 'm4', seat: 'stacy', key: '#second' }) },
  M5: { subject: 'Re-sign kenya #second', trailer: 'Agent: kenya', row: 'canonical/profiles/consumer/kenya.dispositions.yaml#second', make: (r) => void resign(r, { seed: 'm5', key: '#second' }), tx: (sha, subject) => ({ seat: 'kenya', commits: [{ sha, subject, command: H2C_FORM(subject) }] }) },
  M6: { subject: 'Re-confirm stacy #in-scope', trailer: 'Agent: stacy', row: 'canonical/operative-sets/stacy.yaml#in-scope', make: (r) => reconfirmStacy(r, 'm6'), tx: (sha, subject) => ({ seat: 'stacy', commits: [{ sha, subject }] }) },
};

interface Range {
  repo: string;
  base: string;
  store: string;
  sha: Partial<Record<MName, string>>;
  kiro?: string;
}

function buildM(names: MName[] = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6']): Range {
  const { repo, base } = signerRepo();
  const sha: Partial<Record<MName, string>> = {};
  const txs: Tx[] = [];
  for (const n of names) {
    const st = M_STEPS[n];
    st.make(repo);
    sha[n] = commit(repo, st.subject, [st.trailer]);
    if (st.tx) txs.push({ id: n.toLowerCase(), ...st.tx(sha[n] as string, st.subject) });
  }
  return { repo, base, sha, store: storeOf(repo, txs) };
}

/** Run `main` in `cwd`, capturing stdout, stderr and the exit code. */
function cli(argv: string[], cwd: string): { code: number; out: string[]; err: string[] } {
  const out: string[] = [];
  const err: string[] = [];
  const log = jest.spyOn(console, 'log').mockImplementation((...a: unknown[]) => void out.push(a.join(' ')));
  const error = jest.spyOn(console, 'error').mockImplementation((...a: unknown[]) => void err.push(a.join(' ')));
  try {
    return { code: main(argv, cwd), out, err };
  } finally {
    log.mockRestore();
    error.mockRestore();
  }
}

const MARKER = '--- machine-readable ---';
const run = (r: Range, ...extra: string[]) => cli(['--audit', '--branch', BR, '--base', 'main', '--store', r.store, ...(r.kiro ? ['--kiro', r.kiro] : []), ...extra], r.repo);
const human = (out: string[]): string[] => out.slice(0, out.indexOf(MARKER));
const isCounts = (l: string): boolean => l.startsWith('counts (');
/** The per-act lines: everything between the header (and filter line) and the counts line. */
const perAct = (out: string[]): string[] => human(out).filter((l, i) => i > 0 && !l.startsWith('filter --') && !isCounts(l));
const countsOf = (out: string[]): string => human(out).find(isCounts) as string;
const jsonOf = (out: string[]): { label: string; header: string; filter?: { mode: string; seat: string; selected: number; withheld: number }; acts: ActVerdict[] } =>
  JSON.parse(out[out.length - 1]);
const COUNTS = (n: number, a: number, u: number, ra: number, f: number, an: number): string =>
  `counts (beside the per-act lines, never in place of them; no total is green): ${n} act(s) — anchored ${a} · unanchored ${u} · record absent ${ra} · FAIL ${f} · anomaly ${an}`;
const labelOf = (line: string): string => line.split(' — ')[0];
const seatOfLine = (line: string): string => line.split(' — ')[2];

/** No trace of the withheld acts anywhere in a run's stdout or stderr (the F2 leak oracle). */
function expectNoTrace(res: { out: string[]; err: string[] }, r: Range, names: MName[]): void {
  const all = [...res.out, ...res.err].join('\n');
  for (const n of names) {
    const sha = r.sha[n] as string;
    expect(all).not.toContain(sha);
    expect(all).not.toContain(sha.slice(0, 8));
    expect(all).not.toContain(M_STEPS[n].subject);
    expect(all).not.toContain(M_STEPS[n].row);
  }
}

describe('verify-signing-chain --audit --signer / --exclude-signer (sitting-2 S5; Stacy fixtures F1–F16)', () => {
  let M: Range;
  let U: ReturnType<typeof cli>;
  beforeAll(() => {
    M = buildM();
    U = run(M);
  });

  test('M (the shared range): the unfiltered run reads the six verdicts the specification names', () => {
    expect(U.code).toBe(0);
    expect(perAct(U.out).map((l) => `${labelOf(l)} / ${seatOfLine(l)}`)).toEqual([
      'anchored / kenya',
      'anchored / stacy',
      'FAIL 7 / stacy',
      'record absent 4 / stacy',
      'anomaly 4 / kenya',
      'anchored / stacy',
    ]);
    expect(perAct(U.out)[4]).toMatch(/— widening \(§ 5\.4\)/);
  });

  test('F1: --signer stacy keeps M2, M3, M4, M6 — the #285 C1-collapse row and the meta-less act included', () => {
    const r = run(M, '--signer', 'stacy');
    expect(r.code).toBe(0);
    const h = human(r.out);
    expect(h[0]).toBe(U.out[0]);
    expect(h[1]).toBe('filter --signer stacy: 4 of 6 act(s) selected; 2 withheld');
    const lines = perAct(r.out);
    expect(lines.map(labelOf)).toEqual(['anchored', 'FAIL 7', 'record absent 4', 'anchored']);
    expect(lines.every((l) => l.includes(' — stacy — '))).toBe(true);
    expect(countsOf(r.out)).toBe(COUNTS(4, 2, 0, 1, 1, 0));
    expect(h[h.length - 1]).toBe(COUNTS(4, 2, 0, 1, 1, 0));
    expect(r.out[r.out.length - 2]).toBe(MARKER);
    expect(jsonOf(r.out).acts.map((a) => a.sha)).toEqual([M.sha.M2, M.sha.M3, M.sha.M4, M.sha.M6]);
    expectNoTrace(r, M, ['M1', 'M5']);
  });

  test('F2: --exclude-signer stacy keeps M1 and M5 only; no trace of a Stacy-signed act, by line, count or JSON', () => {
    const r = run(M, '--exclude-signer', 'stacy');
    expect(r.code).toBe(0);
    expect(human(r.out)[1]).toBe('filter --exclude-signer stacy: 2 of 6 act(s) selected; 4 withheld');
    const lines = perAct(r.out);
    expect(lines.map((l) => `${labelOf(l)} / ${seatOfLine(l)}`)).toEqual(['anchored / kenya', 'anomaly 4 / kenya']);
    expect(lines[1]).toMatch(/— widening \(§ 5\.4\)/);
    expect(countsOf(r.out)).toBe(COUNTS(2, 1, 0, 0, 0, 1));
    expect(r.out.some((l) => l.startsWith('FAIL'))).toBe(false);
    expect(r.out.join('\n')).not.toContain('"verdict":"FAIL"');
    expect(jsonOf(r.out).acts).toHaveLength(2);
    expectNoTrace(r, M, ['M2', 'M3', 'M4', 'M6']);
  });

  test('F3: partition and commutation — each kept line byte-identical to the unfiltered one, disjoint, covering, in order', () => {
    const a = run(M, '--signer', 'stacy');
    const b = run(M, '--exclude-signer', 'stacy');
    const key = (x: ActVerdict): string => `${x.sha} ${x.row}`;
    const ua = jsonOf(U.out).acts.map(key);
    const ka = jsonOf(a.out).acts.map(key);
    const kb = jsonOf(b.out).acts.map(key);
    // (a) byte-identical lines, (b) disjoint, covering, order kept.
    const ul = perAct(U.out);
    expect(perAct(a.out)).toEqual(ul.filter((_, i) => ka.includes(ua[i])));
    expect(perAct(b.out)).toEqual(ul.filter((_, i) => kb.includes(ua[i])));
    expect(ka.filter((k) => kb.includes(k))).toEqual([]);
    expect(ua.filter((k) => ka.includes(k) || kb.includes(k))).toEqual(ua);
    expect(ka).toEqual(ua.filter((k) => ka.includes(k)));
    // The JSON acts are the unfiltered acts, verdict and all (no recomputation under the filter).
    expect([...jsonOf(a.out).acts, ...jsonOf(b.out).acts].sort((x, y) => key(x).localeCompare(key(y)))).toEqual(
      [...jsonOf(U.out).acts].sort((x, y) => key(x).localeCompare(key(y)))
    );
    // (c) selected + selected = total; withheld = total − selected.
    const fa = jsonOf(a.out).filter as { selected: number; withheld: number };
    const fb = jsonOf(b.out).filter as { selected: number; withheld: number };
    expect(fa.selected + fb.selected).toBe(6);
    expect([fa.selected + fa.withheld, fb.selected + fb.withheld]).toEqual([6, 6]);
    // (d) the unfiltered run: no filter line, no filter key; formatAudit + marker + {label, header, acts}.
    expect(U.out.some((l) => l.startsWith('filter'))).toBe(false);
    expect(Object.keys(jsonOf(U.out))).toEqual(['label', 'header', 'acts']);
    const acts = runAudit({ repo: M.repo, base: M.base, head: BR, store: M.store, rg: RG, since: '2da748642e7f27ce09a8c414009d85083a4e18fa' });
    expect(U.out).toEqual([...formatAudit(acts, `branch ${BR}; store ${M.store}`), MARKER, JSON.stringify({ label: 'consistency, not identity', header: `branch ${BR}`, acts })]);
  });

  test('F3(d): regression pin — unfiltered formatAudit is byte-for-byte the pre-filter output', () => {
    const ACT: ActVerdict = {
      sha: '0123456789abcdef0123456789abcdef01234567',
      subject: 's',
      row: 'canonical/profiles/consumer/kenya.dispositions.yaml#identity',
      seat: 'kenya',
      verdict: 'anchored',
      detail: 'transcript sess/subagents/agent-k1.jsonl',
      spawnDepth: 1,
      model: 'sonnet',
      preRatification: false,
      widen: false,
    };
    const acts: ActVerdict[] = [
      ACT,
      { ...ACT, sha: 'fedcba9876543210fedcba9876543210fedcba98', row: 'canonical/profiles/consumer/thurgood.dispositions.yaml#identity', seat: 'stacy', verdict: 'FAIL', link: 7, detail: 'no tool result contains the row\'s rendered line "x"', widen: true, preRatification: true },
      { ...ACT, sha: '1111111122222222333333334444444455555555', seat: '(unknown)', verdict: 'record absent', link: 4, detail: 'no transcript shows this commit being created', spawnDepth: undefined, model: undefined },
    ];
    expect(formatAudit(acts, 'PR #1 (refs/pull/1/head = 01234567); store /s')).toEqual([
      'verify-signing-chain --audit — consistency, not identity — PR #1 (refs/pull/1/head = 01234567); store /s',
      'anchored — canonical/profiles/consumer/kenya.dispositions.yaml#identity — kenya — 01234567 — transcript sess/subagents/agent-k1.jsonl — spawnDepth 1, model sonnet',
      'FAIL 7 — canonical/profiles/consumer/thurgood.dispositions.yaml#identity — stacy — fedcba98 — no tool result contains the row\'s rendered line "x" — spawnDepth 1, model sonnet — widening (§ 5.4) — pre-ratification observation',
      'record absent 4 — canonical/profiles/consumer/kenya.dispositions.yaml#identity — (unknown) — 11111111 — no transcript shows this commit being created',
      'counts (beside the per-act lines, never in place of them; no total is green): 3 act(s) — anchored 1 · unanchored 0 · record absent 1 · FAIL 1 · anomaly 0',
    ]);
    const f = formatAudit(acts, 'h', { mode: 'exclude-signer', seat: 'stacy' });
    expect(f[1]).toBe(filterLine({ mode: 'exclude-signer', seat: 'stacy' }, 2, 3));
    expect(f[1]).toBe('filter --exclude-signer stacy: 2 of 3 act(s) selected; 1 withheld');
    expect(f).toHaveLength(5);
  });

  test('F4: zero Stacy acts — the 0 reading prints its denominator; an empty range reads 0 of 0', () => {
    const r = buildM(['M1', 'M5']);
    const a = run(r, '--signer', 'stacy');
    expect(a.code).toBe(0);
    expect(human(a.out)).toEqual([human(run(r).out)[0], 'filter --signer stacy: 0 of 2 act(s) selected; 2 withheld', COUNTS(0, 0, 0, 0, 0, 0)]);
    expect(a.out[a.out.length - 2]).toBe(MARKER);
    expect(jsonOf(a.out).acts).toEqual([]);
    const b = run(r, '--exclude-signer', 'stacy');
    expect(b.code).toBe(0);
    expect(human(b.out)[1]).toBe('filter --exclude-signer stacy: 2 of 2 act(s) selected; 0 withheld');
    expect(perAct(b.out).map(labelOf)).toEqual(['anchored', 'anomaly 4']);
    // The empty range: no signing commit.
    const { repo } = signerRepo();
    write(repo, 'README.md', 'not a signing act\n');
    commit(repo, 'docs: readme', []);
    const empty: Range = { repo, base: '', store: buildStore({ session: SG, main: [], subagents: {} }), sha: {} };
    for (const [flag, line] of [
      ['--signer', 'filter --signer stacy: 0 of 0 act(s) selected; 0 withheld'],
      ['--exclude-signer', 'filter --exclude-signer stacy: 0 of 0 act(s) selected; 0 withheld'],
    ]) {
      const e = run(empty, flag, 'stacy');
      expect(e.code).toBe(0);
      expect(human(e.out).slice(1)).toEqual([line, COUNTS(0, 0, 0, 0, 0, 0)]);
    }
  });

  test('F5: only Stacy acts — --exclude-signer stacy selects none and leaks none; --signer stacy selects both', () => {
    const r = buildM(['M2', 'M4']);
    const b = run(r, '--exclude-signer', 'stacy');
    expect(b.code).toBe(0);
    expect(human(b.out).slice(1)).toEqual(['filter --exclude-signer stacy: 0 of 2 act(s) selected; 2 withheld', COUNTS(0, 0, 0, 0, 0, 0)]);
    expect(jsonOf(b.out).acts).toEqual([]);
    expectNoTrace(b, r, ['M2', 'M4']);
    const a = run(r, '--signer', 'stacy');
    expect(human(a.out)[1]).toBe('filter --signer stacy: 2 of 2 act(s) selected; 0 withheld');
    expect(perAct(a.out)).toHaveLength(2);
  });

  test('F6: a Stacy act reading FAIL 5 (H4) — exit 0 under --signer stacy; invisible under --exclude-signer stacy', () => {
    const { repo } = signerRepo();
    resign(repo, { seed: 'f6-k' });
    const k = commit(repo, 'F6 kenya', ['Agent: kenya']);
    resign(repo, { seed: 'f6-s', seat: 'stacy' });
    const s = commit(repo, 'F6 stacy', ['Agent: stacy']);
    const r: Range = { repo, base: '', sha: {}, store: storeOf(repo, [{ id: 'k6', seat: 'kenya', commits: [{ sha: k, subject: 'F6 kenya' }] }, { id: 's6', seat: 'stacy', meta: 'data', commits: [{ sha: s, subject: 'F6 stacy' }] }]) };
    const a = run(r, '--signer', 'stacy');
    expect(a.code).toBe(0);
    expect(perAct(a.out)).toHaveLength(1);
    expect(perAct(a.out)[0]).toMatch(new RegExp(`^FAIL 5 — .* — stacy — ${s.slice(0, 8)} — meta agentType data ≠ signer stacy.* — widening \\(§ 5\\.4\\)`));
    expect(countsOf(a.out)).toBe(COUNTS(1, 0, 0, 0, 1, 0));
    const b = run(r, '--exclude-signer', 'stacy');
    expect(b.code).toBe(0);
    expect(perAct(b.out).map((l) => `${labelOf(l)} / ${seatOfLine(l)}`)).toEqual(['anchored / kenya']);
    expect(countsOf(b.out)).toBe(COUNTS(1, 1, 0, 0, 0, 0));
    const all = [...b.out, ...b.err].join('\n');
    expect(all).not.toMatch(/FAIL 5|≠ signer stacy|"verdict":"FAIL"/);
    expect(all).not.toContain(s.slice(0, 8));
  });

  test('F7: one commit, two seats — the filter is act-level; the kenya FAIL 5 is not hidden by its commit\'s Stacy act', () => {
    const { repo } = signerRepo();
    resign(repo, { seed: 'f7-s', seat: 'stacy' });
    resign(repo, { seed: 'f7-k' });
    const sha = commit(repo, 'F7 two seats', ['Agent: stacy']);
    const r: Range = { repo, base: '', sha: {}, store: storeOf(repo, [{ id: 's7', seat: 'stacy', commits: [{ sha, subject: 'F7 two seats' }] }]) };
    const u = perAct(run(r).out);
    expect(u.map((l) => `${labelOf(l)} / ${seatOfLine(l)}`).sort()).toEqual(['FAIL 5 / kenya', 'anchored / stacy']);
    const a = perAct(run(r, '--signer', 'stacy').out);
    const b = perAct(run(r, '--exclude-signer', 'stacy').out);
    expect(a.map((l) => `${labelOf(l)} / ${seatOfLine(l)}`)).toEqual(['anchored / stacy']);
    expect(b.map((l) => `${labelOf(l)} / ${seatOfLine(l)}`)).toEqual(['FAIL 5 / kenya']);
    expect(b[0]).toMatch(/meta agentType stacy ≠ signer kenya/);
    expect([...a, ...b].sort()).toEqual([...u].sort());
  });

  // F8 — every verdict class survives the filter, for a Stacy-signed act; one kenya control each.
  type F8Case = { name: string; label: string; widen: boolean; build(repo: string, s: { sha: string; subject: string }): { txs: Tx[]; mainExtra?: string[]; kiro?: boolean } };
  const F8: F8Case[] = [
    { name: 'H1 rebased', label: 'record absent 4', widen: false, build: (_r, s) => ({ txs: [{ id: 'st', seat: 'stacy', commits: [s] }] }) },
    {
      name: 'H2a quoted elsewhere',
      label: 'anchored',
      widen: false,
      build: (_r, s) => ({
        txs: [
          { id: 'st', seat: 'stacy', commits: [s] },
          { id: 'q1', seat: 'kenya', read: false, commits: [{ ...s, command: 'git log --oneline -3', output: `${s.sha.slice(0, 8)} ${s.subject}\nabcdef0 base` }] },
        ],
      }),
    },
    {
      name: 'H2b quiet primary + failed seat commit',
      label: 'anomaly 4',
      widen: true,
      build: (_r, s) => ({
        txs: [{ id: 'st', seat: 'stacy', commits: [{ ...s, command: `git commit -q -m '${s.subject}'; git log -1 --format='%H %s'`, output: `On branch ${BR}\nnothing to commit, working tree clean\n${s.sha} ${s.subject}` }] }],
        mainExtra: [
          record('mainToolUse', { SESSION: SG, BRANCH: BR, TOOL_ID: 'toolu_main_quiet', TOOL_NAME: 'Bash', INPUT: { command: COMMIT_FORMS.quiet } }),
          record('mainToolResult', { SESSION: SG, BRANCH: BR, TOOL_ID: 'toolu_main_quiet', OUTPUT: '' }),
        ],
      }),
    },
    { name: 'H2c outside the closed set', label: 'anomaly 4', widen: true, build: (_r, s) => ({ txs: [{ id: 'st', seat: 'stacy', commits: [{ ...s, command: H2C_FORM(s.subject) }] }] }) },
    {
      name: 'H3 main-session commit',
      label: 'FAIL 4',
      widen: true,
      build: (_r, s) => ({
        txs: [],
        mainExtra: [
          record('mainToolUse', { SESSION: SG, BRANCH: BR, TOOL_ID: 'toolu_main_commit', TOOL_NAME: 'Bash', INPUT: { command: CONVENTION(s.subject) } }),
          record('mainToolResult', { SESSION: SG, BRANCH: BR, TOOL_ID: 'toolu_main_commit', OUTPUT: `${s.sha} ${s.subject}` }),
        ],
      }),
    },
    { name: 'H4 meta agentType ≠ signer', label: 'FAIL 5', widen: true, build: (_r, s) => ({ txs: [{ id: 'st', seat: 'stacy', meta: 'data', commits: [s] }] }) },
    { name: 'H5 prompt_snapshot ≠ charter', label: 'FAIL 6', widen: true, build: (_r, s) => ({ txs: [{ id: 'st', seat: 'stacy', snapshot: 'You are a different seat entirely.', commits: [s] }] }) },
    { name: 'H6 rendered line never read', label: 'FAIL 7', widen: true, build: (_r, s) => ({ txs: [{ id: 'st', seat: 'stacy', read: false, commits: [s] }] }) },
    { name: 'H7 meta record missing', label: 'record absent 5', widen: false, build: (_r, s) => ({ txs: [{ id: 'st', seat: 'stacy', meta: null, commits: [s] }] }) },
    { name: 'Kiro-declared, no record', label: 'unanchored', widen: false, build: () => ({ txs: [], kiro: true }) },
  ];
  test.each(F8.map((c) => [c.name, c] as const))('F8: %s — the Stacy-signed line is kept whole by --signer stacy, absent from --exclude-signer stacy', (_n, c) => {
    const { repo } = signerRepo();
    resign(repo, { seed: `f8-${c.name}`, seat: 'stacy' });
    const subject = `F8 stacy (${c.name})`;
    let sha = commit(repo, subject, ['Agent: stacy']);
    const transcriptSha = sha;
    if (c.name.startsWith('H1')) {
      g(repo, ['switch', '-q', 'main']);
      write(repo, 'README.md', 'main moves\n');
      commit(repo, 'main moves', []);
      g(repo, ['switch', '-q', BR]);
      g(repo, ['rebase', '-q', 'main']);
      sha = head(repo);
      expect(sha).not.toBe(transcriptSha);
    }
    resign(repo, { seed: `f8-k-${c.name}`, key: '#second' });
    const k = commit(repo, 'F8 kenya control', ['Agent: kenya']);
    const built = c.build(repo, { sha: transcriptSha, subject });
    const r: Range = {
      repo,
      base: '',
      sha: {},
      store: storeOf(repo, [...built.txs, { id: 'kc', seat: 'kenya', commits: [{ sha: k, subject: 'F8 kenya control' }] }], built.mainExtra),
      kiro: built.kiro ? sha.slice(0, 8) : undefined,
    };
    const uLines = perAct(run(r).out);
    const mine = uLines.filter((l) => l.includes(` — ${sha.slice(0, 8)}`));
    expect(mine).toHaveLength(1);
    expect(labelOf(mine[0])).toBe(c.label);
    expect(seatOfLine(mine[0])).toBe('stacy');
    expect(mine[0].includes('widening (§ 5.4)')).toBe(c.widen);
    const a = perAct(run(r, '--signer', 'stacy').out);
    expect(a).toEqual(mine);
    const b = run(r, '--exclude-signer', 'stacy');
    expect(perAct(b.out)).toEqual(uLines.filter((l) => l.includes(` — ${k.slice(0, 8)}`)));
    expect([...b.out, ...b.err].join('\n')).not.toContain(sha.slice(0, 8));
  });

  test('F9: the filter keys on the printed seat — not the trailer, the owner or the meta (cases a–e)', () => {
    const orphan = 'canonical/profiles/consumer/orphan.dispositions.yaml';
    const { repo } = signerRepo((r) =>
      write(
        r,
        orphan,
        `# Fixture: a dispositions file with no source — its rows' owner does not resolve.\nbody:\n  "#x": ${JSON.stringify({ disposition: 'retained', signature: { signer: 'stacy', canonicalHash: hash('o:c'), renderedHash: hash('o:r'), assent: { surviving: [] }, evidence: 'canonical/profiles/consumer/signatures/orphan.md#x' } })}\n`
      )
    );
    const bump = (seed: string): void =>
      editRow(repo, orphan, '#x', (row) => ({ ...row, signature: { ...(row.signature as Record<string, unknown>), canonicalHash: hash(seed) } }));
    const cases: Record<string, { sha: string; seat: string }> = {};
    resign(repo, { seed: 'f9a', seat: 'stacy' });
    cases.a = { sha: commit(repo, 'F9a stacy row, kenya trailer', ['Agent: kenya']), seat: 'stacy' };
    resign(repo, { seed: 'f9b' });
    cases.b = { sha: commit(repo, 'F9b kenya row, stacy trailer', ['Agent: stacy']), seat: 'kenya' };
    resign(repo, { seed: 'f9c', seat: 'thurgood', key: '#trigger-types' });
    cases.c = { sha: commit(repo, 'F9c thurgood row, stacy trailer', ['Agent: stacy']), seat: 'stacy' };
    bump('f9d');
    cases.d = { sha: commit(repo, 'F9d no owner, no trailer', []), seat: '(unknown)' };
    bump('f9e');
    cases.e = { sha: commit(repo, 'F9e no owner, trailer Stacy', ['Agent: Stacy']), seat: 'stacy' };
    const r: Range = { repo, base: '', sha: {}, store: buildStore({ session: SG, main: [], subagents: {} }) };
    const lineFor = (lines: string[], c: string): string | undefined => lines.find((l) => l.includes(` — ${cases[c].sha.slice(0, 8)}`));
    const u = perAct(run(r).out);
    for (const c of Object.keys(cases)) expect(seatOfLine(lineFor(u, c) as string)).toBe(cases[c].seat);
    const a = perAct(run(r, '--signer', 'stacy').out);
    const b = perAct(run(r, '--exclude-signer', 'stacy').out);
    expect(Object.keys(cases).filter((c) => lineFor(a, c))).toEqual(['a', 'c', 'e']);
    expect(Object.keys(cases).filter((c) => lineFor(b, c))).toEqual(['b', 'd']);
    expect(a.length + b.length).toBe(u.length);
  });

  test('F10: seat argument case — Stacy / STACY are byte-identical to stacy, both flags', () => {
    const lower = { s: run(M, '--signer', 'stacy').out, x: run(M, '--exclude-signer', 'stacy').out };
    for (const v of ['Stacy', 'STACY']) {
      expect(run(M, '--signer', v).out).toEqual(lower.s);
      expect(run(M, '--exclude-signer', v).out).toEqual(lower.x);
    }
    expect(parseSignerFilter(['--signer', 'StAcY'])).toEqual({ filter: { mode: 'signer', seat: 'stacy' } });
  });

  test('F11: an unknown seat exits 2 naming flag and value, stdout empty; a real seat absent from the range reads 0 of T', () => {
    for (const [flag, v] of [
      ['--signer', 'stcy'],
      ['--exclude-signer', 'stcy'],
      ['--signer', 'stac'],
    ]) {
      const r = run(M, flag, v);
      expect(r.code).toBe(2);
      expect(r.out).toEqual([]);
      expect(r.err).toEqual([
        `verify-signing-chain --audit: unknown seat '${v}' for ${flag} — seats seen in range: kenya, stacy; roster: data, kenya, peter, stacy, thurgood`,
      ]);
    }
    const empty = run(M, '--signer', '');
    expect(empty.code).toBe(2);
    expect(empty.out).toEqual([]);
    expect(empty.err).toEqual(["verify-signing-chain --audit: --signer needs a seat name (got '')"]);
    const d = run(M, '--signer', 'data');
    expect(d.code).toBe(0);
    expect(human(d.out).slice(1)).toEqual(['filter --signer data: 0 of 6 act(s) selected; 6 withheld', COUNTS(0, 0, 0, 0, 0, 0)]);
    const x = run(M, '--exclude-signer', 'data');
    expect(x.code).toBe(0);
    expect(human(x.out)[1]).toBe('filter --exclude-signer data: 6 of 6 act(s) selected; 0 withheld');
    expect(perAct(x.out)).toEqual(perAct(U.out));
  });

  test('F12: both flags together exit 2, in either order, before any output', () => {
    for (const tail of [
      ['--signer', 'stacy', '--exclude-signer', 'stacy'],
      ['--signer', 'stacy', '--exclude-signer', 'kenya'],
      ['--exclude-signer', 'kenya', '--signer', 'stacy'],
    ]) {
      const r = run(M, ...tail);
      expect(r.code).toBe(2);
      expect(r.out).toEqual([]);
      expect(r.err).toEqual(['verify-signing-chain --audit: --signer and --exclude-signer are mutually exclusive']);
    }
  });

  test('F13: malformed spellings never fall through to an unfiltered run (the `=` form is refused: exit 2)', () => {
    const rows: [string[], RegExp][] = [
      [['--exclude-signer'], /--exclude-signer needs a seat name \(got nothing\)/],
      [['--exclude-signer', '--json'], /--exclude-signer needs a seat name \(got '--json'\)/],
      [['--exclude-signer=stacy'], /'--exclude-signer=stacy': write the seat as a separate argument/],
      [['--signer'], /--signer needs a seat name \(got nothing\)/],
      [['--exclude-signer', 'stacy', '--exclude-signer', 'kenya'], /--exclude-signer given more than once/],
    ];
    for (const [tail, msg] of rows) {
      const r = run(M, ...tail);
      expect(r.code).toBe(2);
      expect(r.out).toEqual([]);
      expect(r.err.join('\n')).toMatch(msg);
    }
    // F13g–i (orchestrator verification, 2026-10-19): an argument --audit does not know never runs
    // unfiltered. Bite: before the fix each read exit 0 with the full unfiltered output.
    const known = '--audit, --pr <N>, --branch <b>, --base <ref>, --store <dir>, --kiro <sha,…>, --signer <seat>, --exclude-signer <seat>, --json';
    for (const [tail, tok] of [
      [['--bogus'], '--bogus'], // g: an unknown flag
      [['--signer stacy'], '--signer stacy'], // h: flag and value pasted as one token
      [['--signr', 'stacy'], '--signr'], // i: a misspelt flag
      [['--exclude-signer', 'stacy', 'stray'], 'stray'], // a bare token where no value is expected
    ] as const) {
      const r = run(M, ...tail);
      expect(r.code).toBe(2);
      expect(r.out).toEqual([]);
      expect(r.err).toEqual([`verify-signing-chain --audit: unknown argument '${tok}' for --audit — known: ${known}`]);
    }
    // No --branch, no --pr: usage, exit 2, not a filtered empty run.
    const n = cli(['--audit', '--store', M.store, '--exclude-signer', 'stacy'], M.repo);
    expect(n.code).toBe(2);
    expect(n.out).toEqual([]);
    expect(n.err).toEqual(['verify-signing-chain --audit: pass --pr <N> or --branch <b>']);
  });

  test('F14: --json — one document {label, header, filter, acts}; acts the selected set; no trace of the withheld', () => {
    for (const [flag, mode, selected] of [
      ['--exclude-signer', 'exclude-signer', 2],
      ['--signer', 'signer', 4],
    ] as const) {
      const r = run(M, '--json', flag, 'stacy');
      expect(r.code).toBe(0);
      const doc = JSON.parse(r.out.join('\n')) as Record<string, unknown>;
      expect(Object.keys(doc)).toEqual(['label', 'header', 'filter', 'acts']);
      expect(doc.filter).toEqual({ mode, seat: 'stacy', selected, withheld: 6 - selected });
      expect((doc.acts as ActVerdict[]).length).toBe(selected);
      if (mode === 'exclude-signer') expectNoTrace(r, M, ['M2', 'M3', 'M4', 'M6']);
      else expectNoTrace(r, M, ['M1', 'M5']);
    }
    expect(Object.keys(JSON.parse(run(M, '--json').out.join('\n')))).toEqual(['label', 'header', 'acts']);
  });

  test('F15: --ci ignores both flags — byte-identical, over a clean range and a failing one', () => {
    const clean = buildM(['M1']);
    const { repo: bad } = signerRepo();
    resign(bad, { seed: 'f15' });
    commit(bad, 'F15 kenya row, data trailer', ['Agent: data']);
    for (const repo of [clean.repo, bad]) {
      const ci = ['--ci', '--base', 'main', '--head', BR];
      const plain = cli(ci, repo);
      for (const f of [['--signer', 'stacy'], ['--exclude-signer', 'stacy']]) {
        const r = cli([...ci, ...f], repo);
        expect(r).toEqual(plain);
      }
    }
    expect(cli(['--ci', '--base', 'main', '--head', BR], bad).code).toBe(1);
  });

  test('F16: filtering never changes a kept act\'s verdict through shared state (link 6\'s earliest-commit fallback)', () => {
    const { repo, base } = signerRepo();
    const snapshot = charterSnapshot(repo, 'stacy', base);
    resign(repo, { seed: 'f16-k' });
    write(repo, '.claude/agents/stacy.md', `${read(repo, '.claude/agents/stacy.md').replace(/\n*$/, '')}\n\nA later charter line.\n`);
    const c1 = commit(repo, 'F16 C1 kenya row', ['Agent: stacy']);
    resign(repo, { seed: 'f16-s', seat: 'stacy' });
    const c2 = commit(repo, 'F16 C2 stacy row', ['Agent: stacy']);
    const store = storeOf(repo, [
      { id: 's16', seat: 'stacy', snapshot, noBranch: true, commits: [{ sha: c1, subject: 'F16 C1 kenya row' }, { sha: c2, subject: 'F16 C2 stacy row' }] },
    ]);
    const r: Range = { repo, base: '', sha: {}, store };
    const u = perAct(run(r).out);
    const ofSha = (lines: string[], sha: string): string[] => lines.filter((l) => l.includes(` — ${sha.slice(0, 8)}`));
    expect(ofSha(u, c2).map(labelOf)).toEqual(['anchored']);
    expect(ofSha(u, c1).map((l) => `${labelOf(l)} / ${seatOfLine(l)}`)).toEqual(['FAIL 5 / kenya']);
    expect(perAct(run(r, '--signer', 'stacy').out)).toEqual(ofSha(u, c2));
    expect(perAct(run(r, '--exclude-signer', 'stacy').out)).toEqual(ofSha(u, c1));
    // The bite is real: a walk that never sees C1 (what a commit-list prefilter would do) flips C2 to FAIL 6.
    const pre = runAudit({ repo, base: c1, head: BR, store, rg: RG });
    expect(pre.map((a) => `${a.verdict} ${a.link}`)).toEqual(['FAIL 6']);
  });
});

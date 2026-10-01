/**
 * `verify-signing-chain --audit` — links 4–7 (ballot 2026-10-01-signing-act-chain §§ 4.2–4.4)
 * against the harness fixtures H1, H2a, H2b, H3–H7 of § 4.5. Each builds a fixture repo with one
 * seat commit (`Agent: kenya`, re-signing `#identity`) and a synthetic harness store whose record
 * shapes are `fixtures/signing-chain/harness/shapes.json` (copied from a real store).
 */

import * as fs from 'fs';
import * as path from 'path';
import { splitFrontmatterText } from '../frontmatter';
import { formatAudit, runAudit, type ActVerdict } from '../regrounding/verify-signing-chain';
import {
  buildStore,
  cleanupTmp,
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
function seatRepo(): Seat {
  const repo = makeRepo();
  const base = g(repo, ['rev-parse', 'HEAD']).trim();
  g(repo, ['switch', '-q', '-c', 'seat-kenya']);
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
    subagents: {
      k1: {
        lines: seatTranscript({ snapshot: over.snapshot ?? s.snapshot, readRendering: over.readRendering, commitCommand: COMMIT_FORMS.convention, commitOutput: `${s.sha} ${SUBJECT}` }),
        meta: over.meta === undefined ? metaFor('kenya', SPAWN) : over.meta,
      },
    },
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

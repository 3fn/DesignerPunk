/**
 * `verify-signing-chain --audit` reads every harness store, not one
 * (`.kiro/issues/2026-10-26-signing-chain-audit-reads-one-session-store.md`). A session started in a
 * `.claude/worktrees/<name>` worktree writes its transcripts to `~/.claude/projects/<slug>--claude-worktrees-<name>/`,
 * not to the main checkout's store; an audit that read only the main store printed
 * `record absent 4 — no transcript shows this commit being created` for acts whose transcripts exist.
 *
 * Fixture: one seat commit (`Agent: kenya`, re-signing `#identity`) and two stores — the main store
 * (an orchestrator session with no commit) and a worktree store holding the spawn and the seat's
 * transcript. Exercises `tools/agent-generator/regrounding/verify-signing-chain.ts`.
 */

import * as fs from 'fs';
import * as path from 'path';
import { splitFrontmatterText } from '../frontmatter';
import { defaultStore, defaultStores, main, runAudit, storeClause, WORKTREE_STORE_INFIX, type ActVerdict } from '../regrounding/verify-signing-chain';
import { buildStore, cleanupTmp, commit, COMMIT_FORMS, g, makeRepo, metaFor, read, record, resign, RG, tmp, type StoreSpec } from './fixtures/signing-chain/helpers';

const SESSION = 'sess-wt-0001';
const SPAWN = 'toolu_spawn_kenya_wt';
const SUBJECT = 'Re-sign #identity (kenya)';
const RENDERED_LINE = "You are the iOS platform engineer for products built in your human lead's repo.";

afterAll(() => cleanupTmp());

interface Seat {
  repo: string;
  base: string;
  sha: string;
  snapshot: string;
}

function seatRepo(): Seat {
  const repo = makeRepo();
  const base = g(repo, ['rev-parse', 'HEAD']).trim();
  g(repo, ['switch', '-q', '-c', 'seat-kenya']);
  resign(repo, { seed: 'stores' });
  const sha = commit(repo, SUBJECT, ['Agent: kenya']);
  const snapshot = (splitFrontmatterText(read(repo, '.claude/agents/kenya.md'))?.body ?? '').replace(/\n+$/, '');
  return { repo, base, sha, snapshot };
}

/** The worktree session: the spawn in its main file, the seat's transcript under it. */
function worktreeSpec(s: Seat): StoreSpec {
  const v = { SESSION, BRANCH: 'seat-kenya', AGENT_ID: 'kw1' };
  return {
    session: SESSION,
    main: [
      record('mainUser', { SESSION, BRANCH: 'seat-kenya', TEXT: 'Orchestrate the re-sign (worktree session).' }),
      record('mainToolUse', {
        SESSION,
        BRANCH: 'seat-kenya',
        TOOL_ID: SPAWN,
        TOOL_NAME: 'Agent',
        INPUT: { subagent_type: 'kenya', model: 'sonnet', description: 'Kenya: re-sign #identity', prompt: 'You are Kenya. Re-sign #identity.' },
      }),
    ],
    subagents: {
      kw1: {
        meta: metaFor('kenya', SPAWN),
        lines: [
          record('subagentUser', { ...v, TEXT: 'You are Kenya. Re-sign #identity.' }),
          record('promptSnapshot', { ...v, SNAPSHOT: s.snapshot }),
          record('subagentToolUse', { ...v, TOOL_ID: 'toolu_read_wt', TOOL_NAME: 'Read', INPUT: { file_path: '/repo/canonical/_consumer-output/_canonical/agents/kenya.md' } }),
          record('subagentToolResult', { ...v, TOOL_ID: 'toolu_read_wt', OUTPUT: `     1\t# Kenya — iOS Platform Engineer (fixture)\n     5\t${RENDERED_LINE}` }),
          record('subagentToolUse', { ...v, TOOL_ID: 'toolu_commit_wt', TOOL_NAME: 'Bash', INPUT: { command: COMMIT_FORMS.convention, description: 'Commit the re-sign' } }),
          record('subagentToolResult', { ...v, TOOL_ID: 'toolu_commit_wt', OUTPUT: `${s.sha} ${SUBJECT}` }),
        ],
      },
    },
  };
}

/** The main checkout's store: an orchestrator session that creates no commit. */
const mainOnlySpec = (): StoreSpec => ({
  session: 'sess-main-0001',
  main: [record('mainUser', { SESSION: 'sess-main-0001', BRANCH: 'main', TEXT: 'Plan the unit.' })],
  subagents: {},
});

const only = (acts: ActVerdict[]): ActVerdict => {
  expect(acts).toHaveLength(1);
  return acts[0];
};

/** Move a built store to `<home>/.claude/projects/<name>`. */
function place(store: string, home: string, name: string): string {
  const dest = path.join(home, '.claude', 'projects', name);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(store, dest, { recursive: true });
  return dest;
}

function cli(argv: string[], cwd: string, home?: string): { code: number; out: string[]; err: string[] } {
  const out: string[] = [];
  const err: string[] = [];
  const log = jest.spyOn(console, 'log').mockImplementation((...a: unknown[]) => void out.push(a.join(' ')));
  const error = jest.spyOn(console, 'error').mockImplementation((...a: unknown[]) => void err.push(a.join(' ')));
  try {
    return { code: home === undefined ? main(argv, cwd) : main(argv, cwd, home), out, err };
  } finally {
    log.mockRestore();
    error.mockRestore();
  }
}

describe('verify-signing-chain --audit — the store set (two stores)', () => {
  test('S1: the seat transcript only in the worktree store — main store alone reads `record absent` 4; both read `anchored`, transcript named by its store', () => {
    const s = seatRepo();
    const mainStore = buildStore(mainOnlySpec());
    const wtStore = buildStore(worktreeSpec(s));

    const alone = only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store: mainStore, rg: RG }));
    expect(alone.verdict).toBe('record absent');
    expect(alone.link).toBe(4);

    const both = only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store: [mainStore, wtStore], rg: RG }));
    expect(both.verdict).toBe('anchored');
    expect(both.transcript).toBe(path.join(path.basename(wtStore), SESSION, 'subagents', 'agent-kw1.jsonl'));

    // One store: the transcript stays relative to it, as before the store set existed.
    const single = only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store: wtStore, rg: RG }));
    expect(single.verdict).toBe('anchored');
    expect(single.transcript).toBe(path.join(SESSION, 'subagents', 'agent-kw1.jsonl'));
  });

  test('S2: the same record copied into both stores is one candidate (`anchored`, not `anomaly` 4); a store passed twice is read once', () => {
    const s = seatRepo();
    const a = buildStore(worktreeSpec(s));
    const b = tmp('store-copy');
    fs.cpSync(a, b, { recursive: true });
    expect(only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store: [a, b], rg: RG })).verdict).toBe('anchored');
    expect(only(runAudit({ repo: s.repo, base: s.base, head: 'seat-kenya', store: [a, a], rg: RG })).transcript).toBe(path.join(SESSION, 'subagents', 'agent-kw1.jsonl'));
  });

  test('S3: defaultStores — the main store, then every `<slug>--claude-worktrees-*` sibling sorted; never `<slug>-<anything else>`', () => {
    const s = seatRepo();
    const home = tmp('home');
    const mainStore = defaultStore(s.repo, home);
    const slug = path.basename(mainStore);
    const root = path.dirname(mainStore);
    for (const n of [slug, `${slug}${WORKTREE_STORE_INFIX}b-2`, `${slug}${WORKTREE_STORE_INFIX}a-1`, `${slug}-copy`, `${slug}-copy${WORKTREE_STORE_INFIX}x`, 'unrelated']) {
      fs.mkdirSync(path.join(root, n), { recursive: true });
    }
    fs.writeFileSync(path.join(root, `${slug}${WORKTREE_STORE_INFIX}file`), ''); // a file, not a store
    expect(defaultStores(s.repo, home)).toEqual([mainStore, path.join(root, `${slug}${WORKTREE_STORE_INFIX}a-1`), path.join(root, `${slug}${WORKTREE_STORE_INFIX}b-2`)]);
    // No projects directory at all: the main store alone (read as empty).
    const empty = tmp('home-empty');
    expect(defaultStores(s.repo, empty)).toEqual([defaultStore(s.repo, empty)]);
  });

  test('S4: CLI — `--store` repeated reads both stores; the header names them; one `--store` keeps the single-store header', () => {
    const s = seatRepo();
    const mainStore = buildStore(mainOnlySpec());
    const wtStore = buildStore(worktreeSpec(s));
    const two = cli(['--audit', '--branch', 'seat-kenya', '--base', 'main', '--store', mainStore, '--store', wtStore], s.repo);
    expect(two.code).toBe(0);
    expect(two.out[0]).toBe(`verify-signing-chain --audit — consistency, not identity — branch seat-kenya; ${storeClause([mainStore, wtStore])}`);
    expect(two.out[0]).toContain(`stores (2): ${mainStore}, ${wtStore}`);
    expect(two.out[1]).toMatch(/^anchored — /);

    const one = cli(['--audit', '--branch', 'seat-kenya', '--base', 'main', '--store', mainStore], s.repo);
    expect(one.out[0]).toBe(`verify-signing-chain --audit — consistency, not identity — branch seat-kenya; store ${mainStore}`);
    expect(one.out[1]).toMatch(/^record absent 4 — /);
  });

  test('S5: CLI with no `--store` reads the default set — the worktree store under the home anchors the act', () => {
    const s = seatRepo();
    const home = tmp('home-cli');
    const slug = path.basename(defaultStore(s.repo, home));
    const m = place(buildStore(mainOnlySpec()), home, slug);
    const w = place(buildStore(worktreeSpec(s)), home, `${slug}${WORKTREE_STORE_INFIX}fixture-wt`);
    const r = cli(['--audit', '--branch', 'seat-kenya', '--base', 'main'], s.repo, home);
    expect(r.code).toBe(0);
    expect(r.out[0]).toContain(`stores (2): ${m}, ${w}`);
    expect(r.out[1]).toMatch(/^anchored — .* — transcript .*fixture-wt/);
  });
});

/**
 * Fixture builders for `verify-signing-chain` (ballot 2026-10-01-signing-act-chain § 4.5).
 *
 * Every fixture is a throwaway git repository built in the OS temp dir from the static files in
 * `tree/` (placed by `tree/layout.json`), then mutated by the helpers below and committed with the
 * trailers the fixture names. Harness stores are built the same way from `harness/shapes.json`
 * (record shapes copied from a real Claude Code store; values synthetic).
 */

import { execFileSync } from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  loadRegrounding,
  mirrorRowSpanSource,
  SHARED_CATALOG_DEFAULT,
  type OwnerContext,
  type Regrounding,
} from '../../../regrounding/verify-signing-chain';

export const FIXTURES = __dirname;
export const REGROUNDING_DIR = path.join(__dirname, '..', '..', '..', 'regrounding');

/** The real regrounding modules when on the tree (U2b), else a mirror of C1 for links 1–3. */
export const REAL_RG = loadRegrounding(REGROUNDING_DIR);
export const RG: Regrounding = REAL_RG
  ? { ...REAL_RG, sweep: undefined }
  : {
      c1Seat: (owner) => (owner === 'thurgood' ? 'stacy' : owner),
      ownerOf: (source: string, memberId: string | undefined, ctx: OwnerContext) => {
        const m = /^canonical\/agents\/([^/]+)\.md$/.exec(source);
        if (m) return m[1];
        if (source === SHARED_CATALOG_DEFAULT) return memberId === undefined ? undefined : ctx.sharedOwners?.[memberId];
        return ctx.recordOwners?.[source];
      },
      rowSpanSource: mirrorRowSpanSource(SHARED_CATALOG_DEFAULT),
      sharedCatalog: SHARED_CATALOG_DEFAULT,
    };
export const RG_IS_REAL = REAL_RG !== undefined;

const ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: 'Fixture',
  GIT_AUTHOR_EMAIL: 'fixture@example.invalid',
  GIT_COMMITTER_NAME: 'Fixture',
  GIT_COMMITTER_EMAIL: 'fixture@example.invalid',
  GIT_CONFIG_NOSYSTEM: '1',
};

export function g(repo: string, args: string[], input?: string, env: Record<string, string> = {}): string {
  return execFileSync('git', args, { cwd: repo, encoding: 'utf8', input, env: { ...ENV, ...env }, stdio: ['pipe', 'pipe', 'pipe'] });
}

const tmpRoots: string[] = [];
export function tmp(prefix: string): string {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), `vsc-${prefix}-`));
  tmpRoots.push(d);
  return d;
}
export function cleanupTmp(): void {
  for (const d of tmpRoots.splice(0)) fs.rmSync(d, { recursive: true, force: true });
}

export function write(repo: string, rel: string, text: string): void {
  fs.mkdirSync(path.dirname(path.join(repo, rel)), { recursive: true });
  fs.writeFileSync(path.join(repo, rel), text);
}
export const read = (repo: string, rel: string): string => fs.readFileSync(path.join(repo, rel), 'utf8');

/** A repo on `main` holding the fixture tree, one base commit; returns its path. */
export function makeRepo(): string {
  const repo = tmp('repo');
  g(repo, ['init', '-q', '-b', 'main']);
  g(repo, ['config', 'commit.gpgsign', 'false']);
  const layout = JSON.parse(fs.readFileSync(path.join(FIXTURES, 'tree', 'layout.json'), 'utf8')) as Record<string, string>;
  for (const [dest, src] of Object.entries(layout)) write(repo, dest, fs.readFileSync(path.join(FIXTURES, 'tree', src), 'utf8'));
  commit(repo, 'base: fixture tree', []);
  return repo;
}

/** Stage everything and commit with `trailers` (e.g. `Agent: kenya`); returns the full SHA. */
export function commit(repo: string, subject: string, trailers: string[], env: Record<string, string> = {}): string {
  g(repo, ['add', '-A']);
  const msg = `${subject}\n\nFixture commit.\n${trailers.length ? `\n${trailers.join('\n')}\n` : ''}`;
  g(repo, ['commit', '-q', '--allow-empty', '-F', '-'], msg, env);
  return g(repo, ['rev-parse', 'HEAD']).trim();
}

export const head = (repo: string): string => g(repo, ['rev-parse', 'HEAD']).trim();
export const hash = (seed: string): string => `sha256:${crypto.createHash('sha256').update(seed).digest('hex')}`;

export const DISP = (seat: string): string => `canonical/profiles/consumer/${seat}.dispositions.yaml`;
export const SHEET = (seat: string): string => `canonical/profiles/consumer/signatures/${seat}.md`;

/** Rewrite one flow-style row line of a dispositions file (the U2b format: one row per line). */
export function editRow(repo: string, file: string, key: string, fn: (row: Record<string, unknown>) => Record<string, unknown> | undefined): void {
  const lines = read(repo, file).split('\n');
  const prefix = `  ${JSON.stringify(key)}: `;
  const i = lines.findIndex((l) => l.startsWith(prefix));
  if (i < 0) throw new Error(`row ${key} not in ${file}`);
  const next = fn(JSON.parse(lines[i].slice(prefix.length)));
  if (next === undefined) lines.splice(i, 1);
  else lines[i] = prefix + JSON.stringify(next);
  write(repo, file, lines.join('\n'));
}

/** Rewrite a sheet section's hash lines and append a paragraph. */
export function editSheet(repo: string, sheet: string, heading: string, h: { canonicalHash?: string; renderedHash?: string; append?: string; signer?: string }): void {
  const text = read(repo, sheet);
  const parts = text.split(/^(?=## )/m);
  const i = parts.findIndex((p) => p.startsWith(`## \`${heading}\``));
  if (i < 0) throw new Error(`section ${heading} not in ${sheet}`);
  let b = parts[i];
  if (h.canonicalHash) b = b.replace(/^canonicalHash: .*$/m, `canonicalHash: ${h.canonicalHash}`);
  if (h.renderedHash) b = b.replace(/^renderedHash: .*$/m, `renderedHash: ${h.renderedHash}`);
  if (h.signer) b = b.replace(/^signer: .*$/m, `signer: ${h.signer}`);
  if (h.append) b = `${b.replace(/\n*$/, '')}\n\n${h.append}\n`;
  parts[i] = b;
  write(repo, sheet, parts.join(''));
}

export interface ResignSpec {
  seat?: string; // the dispositions/sheet file stem (default kenya)
  key?: string;
  seed: string; // new hashes derive from it
  signer?: string;
  refuse?: boolean;
  keepHashes?: boolean; // F5: leave canonicalHash/renderedHash unchanged
  surviving?: string[];
}

/** A re-sign: the row's signature (and its sheet section) rewritten in the working tree. */
export function resign(repo: string, s: ResignSpec): { canonicalHash: string; renderedHash: string } {
  const seat = s.seat ?? 'kenya';
  const key = s.key ?? '#identity';
  let ch = hash(`${s.seed}:c`);
  let rh = hash(`${s.seed}:r`);
  editRow(repo, DISP(seat), key, (row) => {
    const sig = { ...(row.signature as Record<string, unknown>) };
    if (s.keepHashes) {
      ch = sig.canonicalHash as string;
      rh = sig.renderedHash as string;
    }
    sig.canonicalHash = ch;
    sig.renderedHash = rh;
    if (s.signer) sig.signer = s.signer;
    if (s.refuse) {
      delete sig.assent;
      sig.refuse = 'should-re-point';
    } else {
      delete sig.refuse;
      sig.assent = { surviving: s.surviving ?? ['role'] };
    }
    // Keep the field order of the real rows (signer, hashes, assent|refuse, evidence).
    const { evidence, ...rest } = sig;
    return { ...row, signature: { ...rest, evidence } };
  });
  editSheet(repo, SHEET(seat), key, {
    canonicalHash: ch,
    renderedHash: rh,
    signer: s.signer,
    append: `**Re-sign (${s.seed}): ${s.refuse ? 'REFUSE — should-re-point' : 'ASSENT'}.**`,
  });
  return { canonicalHash: ch, renderedHash: rh };
}

// ============================================================================
// Harness store
// ============================================================================

const SHAPES = JSON.parse(fs.readFileSync(path.join(FIXTURES, 'harness', 'shapes.json'), 'utf8')) as Record<string, unknown>;

/** Substitute `{{TOKENS}}`: a string that is exactly one token takes the value as-is. */
function fill(v: unknown, vars: Record<string, unknown>): unknown {
  if (typeof v === 'string') {
    const whole = /^\{\{([A-Z_]+)\}\}$/.exec(v);
    if (whole && whole[1] in vars) return vars[whole[1]];
    return v.replace(/\{\{([A-Z_]+)\}\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
  }
  if (Array.isArray(v)) return v.map((x) => fill(x, vars));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fill(x, vars)]));
  return v;
}

let uuid = 0;
export function record(shape: string, vars: Record<string, unknown>): string {
  uuid += 1;
  return JSON.stringify(fill(SHAPES[shape], { UUID: `uuid-${uuid}`, PARENT: `uuid-${uuid - 1}`, TS: new Date().toISOString(), ...vars }));
}

export interface StoreSpec {
  session: string;
  /** Lines of `<store>/<session>.jsonl`. */
  main: string[];
  /** agentId → transcript lines (+ optional meta; `meta: null` omits the meta file). */
  subagents: Record<string, { lines: string[]; meta?: Record<string, unknown> | null }>;
}

export function buildStore(spec: StoreSpec): string {
  const store = tmp('store');
  fs.writeFileSync(path.join(store, `${spec.session}.jsonl`), `${spec.main.join('\n')}\n`);
  const sub = path.join(store, spec.session, 'subagents');
  fs.mkdirSync(sub, { recursive: true });
  for (const [id, t] of Object.entries(spec.subagents)) {
    fs.writeFileSync(path.join(sub, `agent-${id}.jsonl`), `${t.lines.join('\n')}\n`);
    if (t.meta !== null) fs.writeFileSync(path.join(sub, `agent-${id}.meta.json`), JSON.stringify(t.meta ?? {}));
  }
  return store;
}

export const metaFor = (agentType: string, spawnId: string): Record<string, unknown> =>
  fill(SHAPES.meta, { AGENT_TYPE: agentType, SPAWN_ID: spawnId, DESCRIPTION: `${agentType}: re-sign (fixture)` }) as Record<string, unknown>;

/** The commit forms a seat or a primary runs (§ 4.3's closed set and its outside). */
export const COMMIT_FORMS = {
  /** The seat-brief convention in force from R: `&&` on the commit line, before the heredoc. */
  convention: "git commit -q -F - <<'EOF' && git log -1 --format='%H %s'\nRe-sign #identity (kenya)\n\nAgent: kenya\nEOF",
  /** Quiet commit, nothing printed (a primary committing quietly — H2b). */
  quiet: "git commit -q -F - <<'EOF'\nRe-sign #identity (kenya)\n\nAgent: kenya\nEOF",
  /** `;`-chained: the log prints the previous HEAD when the commit fails (H2b). */
  semicolon: "git commit -q -m 'Re-sign #identity (kenya)'; git log -1 --format='%H %s'",
};

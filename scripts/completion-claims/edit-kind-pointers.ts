/**
 * edit-kind-pointers.ts — the dated-pointer check on a PR's declared Edit-kind lines.
 *
 * Law: ballot .kiro/docs/ballots/2026-10-29-dated-pointer-paths-and-edit-kind-check.md § 5
 * (RATIFIED, Peter, 2026-10-29); the rule it reads is .kiro/docs/ballots/README.md
 * § "Conventions", Edit discipline, "Where the pointer is owed".
 *
 * AN AUDIT TOOL, NEVER A GATE. It is wired into no required check and adds no
 * EXPECTED_CONTEXTS entry. Stacy runs it as a limb of her governance-edit-kind read, on PRs
 * merged at or after the merge of the PR that applied the ballot (the start point is the
 * reader's selection, not this tool's: it reads whatever PR it is given). It exits 0 always.
 *
 * Usage:   npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <n>
 *
 * Reads:   `gh pr view <n> --json body,baseRefOid,headRefOid,mergeCommit` — the PR BODY,
 *          never the squash message — and the diff of the PR:
 *            merged: <mergeCommit>^1 .. <mergeCommit> (the repo is squash-merge-only, so the
 *                    merge commit's first parent is the merge base of the change it applied);
 *            open:   merge-base(<baseRefOid>, <headRefOid>) .. <headRefOid>.
 *          Both endpoints must be in the local repository (git fetch first).
 *
 * Decides, per `**Edit kind**:` line (Task-Completion-Protocol § "Branch and PR Conventions"):
 *   LAW or CORRECTION — the declared file's ADDED lines, limited to L<a>–<b> when the line
 *     gives a range (en dash or hyphen; new-file line numbers, the file as it stands at the
 *     merge commit):
 *       bound path (governance/**, .kiro/steering/**, .kiro/hooks/RELEASE-FLOW.md):
 *         ok when at least one added line matches POINTER_RE, else pointer-missing;
 *         governance/classification-map.md instead needs an added HISTORY_RE line;
 *       exempt path (canonical/agents/**, canonical/shared/**):
 *         ok when no added line matches POINTER_RE, else pointer-on-exempt;
 *       any other path: unlisted-path (a declared file the rule does not reach; not a finding).
 *   EXECUTION — listed: counted, never ok, never read as checked.
 *
 * Output:  one line per declared file or range, `<path>[ L<a>–<b>]\t<KIND>\t<verdict>`, then
 *          one count line. On any failure, exactly one line,
 *            edit-kind-pointers: unavailable (<reason>) — continue
 *          and no count line. The reason is a fixed phrase per stage; it never echoes the
 *          failing command's stderr, so no credential or token text can reach it.
 *
 * Reach, stated (ballot § 5): one verdict per declared file or range; only what an author
 * declared (an undeclared edit escapes it); lexical (a pointer quoted in backticks counts).
 *
 * Structure: the decision is pure — parseEditKindLines, parseAddedLines, judge, evaluate,
 * formatReport — over the body text and per-file diff text. The gh/git reads are the
 * injectable Adapter, so the tests never call gh.
 */

import { execFileSync } from 'child_process';

export type Kind = 'LAW' | 'CORRECTION' | 'EXECUTION';
export type Verdict = 'ok' | 'pointer-missing' | 'pointer-on-exempt' | 'listed' | 'unlisted-path';
export const VERDICTS: readonly Verdict[] = ['ok', 'pointer-missing', 'pointer-on-exempt', 'listed', 'unlisted-path'];

/** The dated pointer: the verb, then the date directly after it (ballot § 5, Ada R2). */
export const POINTER_RE = /\*\((amended|corrected|added|moved) \d{4}-\d{2}-\d{2}/i;
/** The register's pointer form: an added history line. */
export const HISTORY_RE = /^\s*- \{ date: \d{4}-\d{2}-\d{2}/;

export const REGISTER_PATH = 'governance/classification-map.md';

export type PathClass = 'register' | 'bound' | 'exempt' | 'unlisted';

export function classifyPath(p: string): PathClass {
  if (p === REGISTER_PATH) return 'register';
  if (p.startsWith('governance/') || p.startsWith('.kiro/steering/') || p === '.kiro/hooks/RELEASE-FLOW.md') {
    return 'bound';
  }
  if (p.startsWith('canonical/agents/') || p.startsWith('canonical/shared/')) return 'exempt';
  return 'unlisted';
}

export interface Declaration {
  path: string;
  range?: { a: number; b: number };
  kind: Kind;
}

export interface Parsed {
  declarations: Declaration[];
  /** `**Edit kind**:` lines whose grammar did not parse (counted, never judged). */
  unparsed: string[];
}

const MARKER_RE = /^\s*(?:[-*]\s+)?`?\*\*Edit kind\*\*:/;
const LINE_RE =
  /^\s*(?:[-*]\s+)?`?\*\*Edit kind\*\*:\s+`?([^\s`]+)`?(?:\s+L(\d+)\s*[–-]\s*(\d+))?\s+[—–]\s+(LAW|CORRECTION|EXECUTION)\b/;

/** Every `**Edit kind**:` line in a PR body. */
export function parseEditKindLines(body: string): Parsed {
  const declarations: Declaration[] = [];
  const unparsed: string[] = [];
  for (const raw of body.split(/\r?\n/)) {
    if (!MARKER_RE.test(raw)) continue;
    const m = LINE_RE.exec(raw);
    if (!m) {
      unparsed.push(raw.trim());
      continue;
    }
    const d: Declaration = { path: m[1], kind: m[4] as Kind };
    if (m[2] !== undefined && m[3] !== undefined) d.range = { a: Number(m[2]), b: Number(m[3]) };
    declarations.push(d);
  }
  return { declarations, unparsed };
}

export interface AddedLine {
  /** The line's number in the new file. */
  line: number;
  text: string;
}

/** The added lines of a unified diff for one file (`git diff -U0` or any context width). */
export function parseAddedLines(diff: string): AddedLine[] {
  const out: AddedLine[] = [];
  let next = 0;
  let inHunk = false;
  for (const raw of diff.split('\n')) {
    const h = /^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(raw);
    if (h) {
      next = Number(h[1]);
      inHunk = true;
      continue;
    }
    if (!inHunk) continue;
    if (raw.startsWith('+++') || raw.startsWith('---')) continue;
    if (raw.startsWith('+')) {
      out.push({ line: next, text: raw.slice(1) });
      next += 1;
    } else if (raw.startsWith(' ')) {
      next += 1;
    } else if (raw.startsWith('\\')) {
      // "\ No newline at end of file"
    }
    // '-' lines do not advance the new-file counter.
  }
  return out;
}

export function judge(d: Declaration, added: readonly AddedLine[]): Verdict {
  if (d.kind === 'EXECUTION') return 'listed';
  const cls = classifyPath(d.path);
  if (cls === 'unlisted') return 'unlisted-path';
  const lines = d.range ? added.filter((l) => l.line >= d.range!.a && l.line <= d.range!.b) : added;
  if (cls === 'register') return lines.some((l) => HISTORY_RE.test(l.text)) ? 'ok' : 'pointer-missing';
  const hasPointer = lines.some((l) => POINTER_RE.test(l.text));
  if (cls === 'bound') return hasPointer ? 'ok' : 'pointer-missing';
  return hasPointer ? 'pointer-on-exempt' : 'ok';
}

export interface Result {
  declaration: Declaration;
  verdict: Verdict;
}

export interface Evaluation {
  results: Result[];
  unparsed: string[];
}

/** The pure decision: body text and each declared file's added lines. */
export function evaluate(body: string, addedByPath: ReadonlyMap<string, readonly AddedLine[]>): Evaluation {
  const { declarations, unparsed } = parseEditKindLines(body);
  return {
    results: declarations.map((d) => ({ declaration: d, verdict: judge(d, addedByPath.get(d.path) ?? []) })),
    unparsed,
  };
}

export function formatReport(ev: Evaluation): string[] {
  const lines = ev.results.map(({ declaration: d, verdict }) => {
    const where = d.range ? `${d.path} L${d.range.a}–${d.range.b}` : d.path;
    return `${where}\t${d.kind}\t${verdict}`;
  });
  const counts = VERDICTS.map((v) => `${v} ${ev.results.filter((r) => r.verdict === v).length}`).join(', ');
  lines.push(`edit-kind-pointers: ${ev.results.length} declared — ${counts}; unparsed ${ev.unparsed.length}`);
  return lines;
}

export function unavailable(reason: string): string {
  return `edit-kind-pointers: unavailable (${reason}) — continue`;
}

/** The reads the tool makes. Each method throws on failure; run() turns that into one line. */
export interface PrView {
  body: string;
  baseRefOid: string;
  headRefOid: string;
  mergeCommit: { oid: string } | null;
}
export interface Adapter {
  prView(pr: number): PrView;
  /** The commit range [from, to] of the PR's diff. */
  range(view: PrView): { from: string; to: string };
  /** The unified diff of one path over the range (empty when the path is unchanged). */
  diff(from: string, to: string, path: string): string;
}

class StageError extends Error {}

/** One run: the report lines, or exactly one unavailable line. Never throws. */
export function run(pr: number, adapter: Adapter): string[] {
  let view: PrView;
  try {
    view = adapter.prView(pr);
  } catch {
    return [unavailable('gh pr view failed — gh not installed, not authenticated, or the PR not found')];
  }
  let span: { from: string; to: string };
  try {
    span = adapter.range(view);
  } catch {
    return [unavailable('the PR commits are not in the local repository — git fetch first')];
  }
  const { declarations } = parseEditKindLines(view.body ?? '');
  const added = new Map<string, AddedLine[]>();
  try {
    for (const d of declarations) {
      if (!added.has(d.path)) added.set(d.path, parseAddedLines(adapter.diff(span.from, span.to, d.path)));
    }
  } catch {
    return [unavailable('git diff failed')];
  }
  try {
    return formatReport(evaluate(view.body ?? '', added));
  } catch {
    return [unavailable('evaluation failed')];
  }
}

function git(args: string[]): string {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 });
}

/** The live adapter: gh for the PR body, git for the diff. */
export const liveAdapter: Adapter = {
  prView(pr: number): PrView {
    const out = execFileSync('gh', ['pr', 'view', String(pr), '--json', 'body,baseRefOid,headRefOid,mergeCommit'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const j = JSON.parse(out) as PrView;
    if (typeof j.body !== 'string') throw new StageError('no body');
    return j;
  },
  range(view: PrView) {
    if (view.mergeCommit && view.mergeCommit.oid) {
      const to = view.mergeCommit.oid;
      const from = git(['rev-parse', '--verify', `${to}^1`]).trim();
      return { from, to };
    }
    git(['cat-file', '-e', `${view.headRefOid}^{commit}`]);
    git(['cat-file', '-e', `${view.baseRefOid}^{commit}`]);
    const from = git(['merge-base', view.baseRefOid, view.headRefOid]).trim();
    return { from, to: view.headRefOid };
  },
  diff(from: string, to: string, path: string): string {
    return git(['diff', '--no-color', '--no-ext-diff', '-U0', from, to, '--', path]);
  },
};

export function parseArgs(argv: readonly string[]): number | null {
  const i = argv.indexOf('--pr');
  if (i < 0 || i + 1 >= argv.length) return null;
  const n = Number(argv[i + 1]);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export function main(argv: readonly string[], adapter: Adapter = liveAdapter, write: (s: string) => void = (s) => process.stdout.write(s)): number {
  try {
    const pr = parseArgs(argv);
    const lines = pr === null ? [unavailable('usage: --pr <n>')] : run(pr, adapter);
    write(lines.join('\n') + '\n');
  } catch {
    write(unavailable('unexpected error') + '\n');
  }
  return 0;
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

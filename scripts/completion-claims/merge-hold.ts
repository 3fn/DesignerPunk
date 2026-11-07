#!/usr/bin/env tsx
/**
 * merge-hold.ts — the merge-hold and law-ratified checks on a PR body.
 *
 * Law: ballot .kiro/docs/ballots/2026-11-07-merge-hold-and-law-ratified-checks.md, RATIFIED (Peter,
 * 2026-11-07T17:59:15Z): items 1 and 2 (the grammar, in Task-Completion-Protocol § "Branch and PR
 * Conventions"), item 3 (this script and its fixtures). Owner: Thurgood. Fixtures: Stacy's (§ 2 item 3).
 *
 * Two jobs share it:
 *   merge-hold    each `**Open for Peter**:` marker line is answered by a `**Peter answered**:` line after it
 *                 and before the next marker; the quoted words are found in the cited source (a file at the PR
 *                 head, or a comment on this PR). ADVISORY until five clean runs that parsed a marker.
 *   law-ratified  each `**Edit kind**:` LAW line cites a ballot that exists at the head and whose first
 *                 `**Status**:` line reads RATIFIED; each governance-path file the diff changes has a line.
 *                 REQUIRED once promoted (the grant, then Peter's branch-protection act).
 *
 * WHAT THESE CHECKS ARE NOT: they confirm that an answer or a ratification is PRESENT AND CITED. They cannot
 * confirm who gave it, because agents act through Peter's GitHub credential. A green result is not evidence
 * that Peter spoke. Every output line says so.
 *
 * Usage:   npx tsx scripts/completion-claims/merge-hold.ts --job merge-hold|law-ratified --pr <n>
 * Reads:   `gh pr view <n> --json body,headRefOid,baseRefOid,url` (the body through the API, never the event
 *          payload: a re-run replays the original payload), `git show <head>:<path>`, `git diff --name-status`.
 *          Exits 1 on a red verdict, 0 on green, 2 on a usage or read failure.
 * Record:  each run prints one `::notice title=merge-hold-read::` annotation carrying the body's sha256 and the
 *          marker and answer lines it parsed, verbatim (past about 60 KB: the hash and a line count, the full
 *          lines in the job summary), so a hand read can be of the same bytes.
 *
 * The decision is pure — parseBody, judgeMergeHold, judgeLawRatified — over injected readers; the gh and git
 * reads are the Adapter, so the tests never call gh.
 */

import { createHash } from 'crypto';
import { execFileSync } from 'child_process';
import * as fs from 'fs';
import { parseEditKindLines } from './edit-kind-pointers';

export const SUFFIX = ' — presence and citation only; authorship is not checked';

// ---------------------------------------------------------------------------------------------
// The body: fenced blocks, markers and answers
// ---------------------------------------------------------------------------------------------

export interface BodyLine {
  n: number;
  text: string;
  fenced: boolean;
}

/** Every line of the body, each flagged when it lies inside a fenced code block (``` or ~~~ fences). */
export function bodyLines(body: string): BodyLine[] {
  const out: BodyLine[] = [];
  let fence: string | null = null;
  body.split(/\r?\n/).forEach((text, i) => {
    const m = /^\s{0,3}(`{3,}|~{3,})/.exec(text);
    if (fence === null) {
      if (m) {
        fence = m[1][0];
        out.push({ n: i + 1, text, fenced: true });
        return;
      }
      out.push({ n: i + 1, text, fenced: false });
    } else {
      out.push({ n: i + 1, text, fenced: true });
      if (m && m[1][0] === fence) fence = null;
    }
  });
  return out;
}

/** The body with every fenced line blanked, for the Edit-kind reads. */
export function unfenced(body: string): string {
  return bodyLines(body)
    .map((l) => (l.fenced ? '' : l.text))
    .join('\n');
}

export const MARKER = '**Open for Peter**:';
export const ANSWER = '**Peter answered**:';

export interface Marker {
  kind: 'marker';
  n: number;
  text: string;
}
export interface Answer {
  kind: 'answer';
  n: number;
  text: string;
}

/** Marker and answer lines in order: at column 0, outside a fenced block (a quoted or indented line is not one). */
export function parseBody(body: string): Array<Marker | Answer> {
  const out: Array<Marker | Answer> = [];
  for (const l of bodyLines(body)) {
    if (l.fenced) continue;
    if (l.text.startsWith(MARKER)) out.push({ kind: 'marker', n: l.n, text: l.text });
    else if (l.text.startsWith(ANSWER)) out.push({ kind: 'answer', n: l.n, text: l.text });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// The quote match
// ---------------------------------------------------------------------------------------------

/**
 * The comparison's normalisation (ballot item 1): a leading `>` blockquote marker is dropped from each line,
 * `*` and `_` emphasis markers are removed, curly quotation marks become straight ones, and every run of
 * whitespace, line breaks included, becomes one space. Case and everything else are exact.
 */
export function normalizeQuote(text: string): string {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:>\s?)+/, ''))
    .join('\n')
    .replace(/[*_]/g, '')
    .replace(/[“”„‟]/g, '"')
    .replace(/[‘’‚‛]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export const quoteFound = (words: string, source: string): boolean => {
  const w = normalizeQuote(words);
  return w.length > 0 && normalizeQuote(source).includes(w);
};

// ---------------------------------------------------------------------------------------------
// merge-hold
// ---------------------------------------------------------------------------------------------

export type HoldVerdict =
  | 'ok'
  | 'unanswered'
  | 'answer-before-marker'
  | 'extra-answer'
  | 'answer-unparsed'
  | 'source-absent'
  | 'comment-other-pr'
  | 'comment-absent'
  | 'quote-not-found'
  | 'not-now-no-record';

export interface HoldFinding {
  n: number;
  verdict: HoldVerdict;
  detail: string;
}

export interface HoldContext {
  /** The repository, `owner/name`, and this PR's number. */
  repo: string;
  pr: number;
  /** A file's text at the PR head, or null when absent there. */
  fileAtHead: (path: string) => string | null;
  /** A comment's text from its URL's kind and id, or null when it cannot be read. */
  commentBody: (kind: 'issuecomment' | 'pullrequestreview' | 'discussion', id: number) => string | null;
}

const TIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?Z$/;
const ANSWER_RE = /^\*\*Peter answered\*\*: (\S+) — "(.*)" — (.+)$/;
const URL_RE = /^https:\/\/github\.com\/([\w.-]+\/[\w.-]+)\/(pull|issues)\/(\d+)#(issuecomment-|pullrequestreview-|discussion_r)(\d+)$/;
const RECORD_RE = /\.kiro\/issues\/[\w./-]+\.md/;

/** The verdict on one answer line, given its source. */
export function judgeAnswer(a: Answer, ctx: HoldContext): { verdict: HoldVerdict; detail: string } {
  const m = ANSWER_RE.exec(a.text);
  if (!m || !TIME_RE.test(m[1])) return { verdict: 'answer-unparsed', detail: 'the line is not `**Peter answered**: <ISO 8601 UTC time> — "<words>" — <source>`' };
  const [, , words, rest] = m;
  const source = rest.trim().split(/\s+/)[0].replace(/[.,;]+$/, '');
  if (/^not now\b/i.test(words.trim()) && !RECORD_RE.test(rest)) {
    return { verdict: 'not-now-no-record', detail: 'a "not now" answer names no .kiro/issues record the question is filed in' };
  }
  let text: string | null;
  const u = URL_RE.exec(source);
  if (/^https?:\/\//.test(source)) {
    if (!u) return { verdict: 'comment-absent', detail: `the cited URL is not a comment URL on a pull request: ${source}` };
    if (u[1] !== ctx.repo || u[2] !== 'pull' || Number(u[3]) !== ctx.pr) {
      return { verdict: 'comment-other-pr', detail: `the cited comment is on ${u[1]}/${u[2]}/${u[3]}, not on this PR (${ctx.repo}/pull/${ctx.pr})` };
    }
    const kind = u[4] === 'issuecomment-' ? 'issuecomment' : u[4] === 'pullrequestreview-' ? 'pullrequestreview' : 'discussion';
    text = ctx.commentBody(kind, Number(u[5]));
    if (text === null) return { verdict: 'comment-absent', detail: `the cited comment cannot be read: ${source}` };
  } else {
    text = ctx.fileAtHead(source);
    if (text === null) return { verdict: 'source-absent', detail: `the cited path is absent at the PR head: ${source}` };
  }
  if (!quoteFound(words, text)) return { verdict: 'quote-not-found', detail: `the quoted words are not in ${source} after normalisation` };
  return { verdict: 'ok', detail: source };
}

/** One finding per marker (its answer's verdict), and one per answer with no marker to belong to. */
export function judgeMergeHold(body: string, ctx: HoldContext): HoldFinding[] {
  const events = parseBody(body);
  const out: HoldFinding[] = [];
  let current: { f: HoldFinding; answered: boolean } | null = null;
  for (const e of events) {
    if (e.kind === 'marker') {
      current = { f: { n: e.n, verdict: 'unanswered', detail: 'no `**Peter answered**:` line follows this marker before the next one' }, answered: false };
      out.push(current.f);
    } else if (current === null) {
      out.push({ n: e.n, verdict: 'answer-before-marker', detail: 'an answer line with no marker before it' });
    } else if (current.answered) {
      out.push({ n: e.n, verdict: 'extra-answer', detail: 'a second answer for one marker' });
    } else {
      const j = judgeAnswer(e, ctx);
      current.f.verdict = j.verdict;
      current.f.detail = j.detail;
      current.answered = true;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// law-ratified
// ---------------------------------------------------------------------------------------------

export type LawVerdict = 'ok' | 'ballot-absent' | 'ballot-no-status' | 'ballot-not-ratified' | 'law-line-no-ballot' | 'no-edit-kind-line';

export interface LawFinding {
  where: string;
  verdict: LawVerdict;
  detail: string;
}

export interface ChangedFile {
  /** `A`, `M`, `D` or `R`. */
  status: string;
  /** The path as it stands at the merge commit; for a deletion, the old path. */
  path: string;
}

/** `RATIFIED` must be followed by whitespace, `*`, a backtick, `(` or the end (ballot item 2, A1). */
export const STATUS_RE = /^\*\*Status\*\*: [*`]*RATIFIED(?=[\s*`(]|$)/;

/** The governance paths whose changed files need an Edit-kind line (ballot F-2 (a): every `canonical/agents/**` file). */
export const isGovernancePath = (p: string): boolean =>
  p.startsWith('governance/') || p.startsWith('.kiro/steering/') || p === '.kiro/hooks/RELEASE-FLOW.md' || p.startsWith('canonical/agents/');

/** The first `**Status**:` line of a ballot's text, or null. */
export const firstStatusLine = (text: string): string | null => text.split(/\r?\n/).find((l) => l.startsWith('**Status**:')) ?? null;

const LAW_LINE_RE = /\*\*Edit kind\*\*:.*[—–]\s+LAW\b(?:\s*\(([^)]*)\))?/;
const MD_PATH_RE = /[\w./@-]+\.md/;

export function judgeLawRatified(body: string, changed: readonly ChangedFile[], fileAtHead: (path: string) => string | null): LawFinding[] {
  const text = unfenced(body);
  const { declarations } = parseEditKindLines(text);
  const out: LawFinding[] = [];
  for (const line of text.split(/\r?\n/)) {
    const m = LAW_LINE_RE.exec(line);
    if (!m) continue;
    const where = line.trim().slice(0, 120);
    const ballot = m[1] ? MD_PATH_RE.exec(m[1])?.[0] : undefined;
    if (!ballot) {
      out.push({ where, verdict: 'law-line-no-ballot', detail: 'a LAW line cites no ballot path' });
      continue;
    }
    const b = fileAtHead(ballot);
    if (b === null) {
      out.push({ where, verdict: 'ballot-absent', detail: `the cited ballot is absent at the PR head: ${ballot}` });
      continue;
    }
    const status = firstStatusLine(b);
    if (status === null) out.push({ where, verdict: 'ballot-no-status', detail: `${ballot} has no \`**Status**:\` line` });
    else if (!STATUS_RE.test(status)) out.push({ where, verdict: 'ballot-not-ratified', detail: `${ballot} Status reads: ${status.slice(0, 80)}` });
    else out.push({ where, verdict: 'ok', detail: ballot });
  }
  const declared = new Set(declarations.map((d) => d.path));
  for (const f of changed) {
    if (!isGovernancePath(f.path)) continue;
    if (declared.has(f.path)) out.push({ where: f.path, verdict: 'ok', detail: 'has an Edit-kind line' });
    else out.push({ where: f.path, verdict: 'no-edit-kind-line', detail: `the diff ${f.status === 'D' ? 'deletes' : f.status === 'R' ? 'renames to' : 'changes'} this governance file and the body has no \`**Edit kind**:\` line naming it` });
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// The persistent record of what a run read
// ---------------------------------------------------------------------------------------------

export const ANNOTATION_LIMIT = 60000;

export function bodyHash(body: string): string {
  return createHash('sha256').update(body, 'utf8').digest('hex');
}

/** The lines of the body the run parsed (markers and answers), verbatim. */
export function parsedLines(body: string): string[] {
  return parseBody(body).map((e) => `L${e.n}: ${e.text}`);
}

export const escapeAnnotation = (s: string): string => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');

/** The annotation message: the hash and the parsed lines, or (past the limit) the hash and a count. */
export function readRecord(body: string): { message: string; summary: string | null } {
  const lines = parsedLines(body);
  const full = `body-sha256: ${bodyHash(body)}\n${lines.join('\n')}`;
  if (full.length <= ANNOTATION_LIMIT) return { message: full, summary: null };
  return { message: `body-sha256: ${bodyHash(body)}\n${lines.length} marker and answer lines; the full lines are in the job summary`, summary: full };
}

// ---------------------------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------------------------

export function formatHold(findings: readonly HoldFinding[]): { lines: string[]; red: boolean; parsedMarker: boolean } {
  const lines = findings.map((f) => `L${f.n}\t${f.verdict}\t${f.detail}${SUFFIX}`);
  const red = findings.some((f) => f.verdict !== 'ok');
  lines.push(`merge-hold: ${findings.length} marker/answer finding(s), ${findings.filter((f) => f.verdict !== 'ok').length} red${SUFFIX}`);
  return { lines, red, parsedMarker: findings.length > 0 };
}

export function formatLaw(findings: readonly LawFinding[]): { lines: string[]; red: boolean } {
  const lines = findings.map((f) => `${f.where}\t${f.verdict}\t${f.detail}${SUFFIX}`);
  const red = findings.some((f) => f.verdict !== 'ok');
  lines.push(`law-ratified: ${findings.length} finding(s), ${findings.filter((f) => f.verdict !== 'ok').length} red${SUFFIX}`);
  return { lines, red };
}

// ---------------------------------------------------------------------------------------------
// The live adapter and the command line
// ---------------------------------------------------------------------------------------------

export interface PrView {
  body: string;
  headSha: string;
  baseSha: string;
  repo: string;
  number: number;
}

export interface Adapter {
  prView(n: number): PrView;
  fileAt(sha: string, path: string): string | null;
  changedFiles(base: string, head: string): ChangedFile[];
  commentBody(repo: string, kind: 'issuecomment' | 'pullrequestreview' | 'discussion', id: number, pr: number): string | null;
}

const sh = (cmd: string, args: string[]): string =>
  execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 });

export const liveAdapter: Adapter = {
  prView(n) {
    const j = JSON.parse(sh('gh', ['pr', 'view', String(n), '--json', 'body,headRefOid,baseRefOid,url'])) as { body: string; headRefOid: string; baseRefOid: string; url: string };
    const m = /github\.com\/([\w.-]+\/[\w.-]+)\/pull\/(\d+)/.exec(j.url);
    return { body: j.body ?? '', headSha: j.headRefOid, baseSha: j.baseRefOid, repo: m ? m[1] : '', number: n };
  },
  fileAt(sha, path) {
    try {
      return sh('git', ['show', `${sha}:${path}`]);
    } catch {
      return null;
    }
  },
  changedFiles(base, head) {
    const mb = sh('git', ['merge-base', base, head]).trim();
    const out = sh('git', ['-c', 'core.quotepath=off', 'diff', '--name-status', '-M', mb, head]);
    const files: ChangedFile[] = [];
    for (const l of out.split('\n')) {
      if (!l) continue;
      const f = l.split('\t');
      const status = f[0][0];
      files.push({ status, path: status === 'R' ? f[2] : f[1] });
    }
    return files;
  },
  commentBody(repo, kind, id, pr) {
    const route = kind === 'issuecomment' ? `repos/${repo}/issues/comments/${id}` : kind === 'discussion' ? `repos/${repo}/pulls/comments/${id}` : `repos/${repo}/pulls/${pr}/reviews/${id}`;
    try {
      return (JSON.parse(sh('gh', ['api', route])) as { body?: string }).body ?? '';
    } catch {
      return null;
    }
  },
};

const USAGE = 'usage: merge-hold.ts --job merge-hold|law-ratified --pr <n>';

export function main(argv: readonly string[], adapter: Adapter = liveAdapter, write: (s: string) => void = (s) => process.stdout.write(s)): number {
  const opts = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i].startsWith('--') || argv[i + 1] === undefined) {
      write(`${USAGE}\n`);
      return 2;
    }
    opts.set(argv[i].slice(2), argv[i + 1]);
  }
  const job = opts.get('job');
  const pr = Number(opts.get('pr'));
  if ((job !== 'merge-hold' && job !== 'law-ratified') || !Number.isInteger(pr) || pr < 1) {
    write(`${USAGE}\n`);
    return 2;
  }
  let view: PrView;
  try {
    view = adapter.prView(pr);
  } catch {
    write(`${job}: unavailable (the PR cannot be read) — continue\n`);
    return 2;
  }
  const rec = readRecord(view.body);
  write(`::notice title=merge-hold-read::${escapeAnnotation(rec.message)}\n`);
  if (rec.summary !== null && process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${rec.summary}\n`);
  if (job === 'merge-hold') {
    const f = judgeMergeHold(view.body, {
      repo: view.repo,
      pr,
      fileAtHead: (p) => adapter.fileAt(view.headSha, p),
      commentBody: (kind, id) => adapter.commentBody(view.repo, kind, id, pr),
    });
    const r = formatHold(f);
    write(r.lines.join('\n') + '\n');
    return r.red ? 1 : 0;
  }
  let changed: ChangedFile[];
  try {
    changed = adapter.changedFiles(view.baseSha, view.headSha);
  } catch {
    write(`law-ratified: unavailable (the diff cannot be read) — continue\n`);
    return 2;
  }
  const r = formatLaw(judgeLawRatified(view.body, changed, (p) => adapter.fileAt(view.headSha, p)));
  write(r.lines.join('\n') + '\n');
  return r.red ? 1 : 0;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}

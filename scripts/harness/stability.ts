#!/usr/bin/env tsx
/**
 * stability — the compile harness's stability record (Spec 129 Task 5.3; tasks.md § "Decision 6").
 * Owner: Thurgood.
 *
 * `evidence/harness-stability.md` is the OUTPUT of this script, never hand-kept (Stacy R1 § 3). It
 * reads three GitHub REST endpoints for the harness workflow and writes, per context, the fields
 * Decision 6 names (run id, head SHA, attempt, conclusion, the `cache` annotation, `created_at`,
 * `started_at`, `completed_at`, duration), then applies the promotion criterion's conditions:
 *
 *   condition 2   10 consecutive PULL-REQUEST runs with no break. A break is any of:
 *                 - a `cancelled` or `timed_out` conclusion;
 *                 - a job with no `harness-verdict` annotation (it failed before the comparator ran);
 *                 - attempts of one run that ended with different conclusions;
 *                 - a verdict change from the previous run with the SAME head SHA.
 *                 A break restarts the count; the breaking run is not itself counted.
 *   condition 3   three cold-cache runs, each under 10 minutes. Android: a pull-request run whose
 *                 `cache` annotation reads `miss`. iOS (no dependency cache): the first three
 *                 pull-request runs at the current Xcode pin. On BOTH platforms a run counts only if
 *                 its context reached the comparator (it carries `harness-verdict`).
 *   condition 5   (iOS only) queue time + duration of those three runs against the 10-minute
 *                 ceiling; queue time is `started_at - max(created_at, harness-generate.completed_at)`
 *                 of the same run and attempt.
 *
 * A dispatched run counts toward neither condition 2 nor condition 3 (Peter's Decision 2, "2 yes",
 * and tasks amendment 3 "D yes"); it is listed with the reason.
 *
 * Source endpoints (all under `repos/<owner>/<repo>`; the token is read from `GH_TOKEN`):
 *   - `actions/workflows/<file>/runs`          the runs (checks API's workflow side)
 *   - `actions/runs/<id>/jobs?filter=all`      every attempt's jobs, with their timestamps
 *   - `commits/<sha>/check-runs`               the checks API: each context's check-run conclusion
 *   - `check-runs/<job id>/annotations`        `harness-verdict` and `cache` (they outlast the logs)
 * A job's id equals its check run's id.
 *
 * The analysis (`normalize`, `analyze`, `render`) is pure; only `fetchRaw` and `main` touch the network.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';

// ---------------------------------------------------------------------------------------------
// Raw API shapes (only the fields read)
// ---------------------------------------------------------------------------------------------

export interface ApiRun {
  id: number;
  head_sha: string;
  event: string;
  run_attempt: number;
  conclusion: string | null;
  status?: string;
  created_at: string;
  head_branch?: string;
}
export interface ApiJob {
  id: number;
  run_id: number;
  run_attempt: number;
  name: string;
  head_sha: string;
  conclusion: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}
export interface ApiCheckRun {
  id: number;
  name: string;
  conclusion: string | null;
}
export interface ApiAnnotation {
  title: string | null;
  message: string;
}

export interface RawInput {
  runs: readonly ApiRun[];
  /** Keyed by run id: the `jobs?filter=all` list (every attempt). */
  jobsByRun: Readonly<Record<number, readonly ApiJob[]>>;
  /** Keyed by head SHA: the checks API's check runs. */
  checkRunsBySha: Readonly<Record<string, readonly ApiCheckRun[]>>;
  /** Keyed by job (check run) id. */
  annotationsByJob: Readonly<Record<number, readonly ApiAnnotation[]>>;
  /** Optional: head SHA -> the Xcode pin at that commit (`harness/pins.yaml` § ios § toolchain § xcode.version). */
  xcodePinBySha?: Readonly<Record<string, string>>;
}

// ---------------------------------------------------------------------------------------------
// Normalised records
// ---------------------------------------------------------------------------------------------

export const CONTEXTS = [
  'harness-android-tokens',
  'harness-android-components',
  'harness-ios-tokens',
  'harness-ios-components',
] as const;
export type Context = (typeof CONTEXTS)[number];
export type Platform = 'android' | 'ios';
export const platformOf = (c: Context): Platform => (c.startsWith('harness-ios') ? 'ios' : 'android');

export const CEILING_SECONDS = 600;

export interface JobRecord {
  context: Context;
  runId: number;
  attempt: number;
  event: string;
  headSha: string;
  /** The check run's conclusion (checks API), else the job's. */
  conclusion: string | null;
  jobConclusion: string | null;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  durationSeconds: number | null;
  /** `PASS` or `FAIL` from the `harness-verdict` annotation; null when the annotation is absent. */
  verdict: 'PASS' | 'FAIL' | null;
  cache: 'hit' | 'miss' | null;
  /** iOS only: seconds from `max(created_at, harness-generate.completed_at)` to `started_at`. */
  queueSeconds: number | null;
  xcodePin: string | null;
}

const ms = (iso: string | null): number | null => (iso === null ? null : Date.parse(iso));
const secs = (a: number | null, b: number | null): number | null => (a === null || b === null ? null : Math.round((b - a) / 1000));

/** `harness-ios-tokens (unit-branch)` -> `harness-ios-tokens`; null for any other job. */
export function contextOf(jobName: string): Context | null {
  const base = jobName.replace(/ \(unit-branch\)$/, '');
  return (CONTEXTS as readonly string[]).includes(base) ? (base as Context) : null;
}

/** The verdict word in a `harness-verdict: harness-x PASS` or `... FAIL (class, …)` message. */
export function parseVerdict(message: string): 'PASS' | 'FAIL' | null {
  const m = /harness-verdict: harness-[a-z-]+ (PASS|FAIL)\b/.exec(message);
  return m ? (m[1] as 'PASS' | 'FAIL') : null;
}

export function normalize(raw: RawInput): JobRecord[] {
  const runById = new Map(raw.runs.map((r) => [r.id, r]));
  const out: JobRecord[] = [];
  for (const run of raw.runs) {
    const jobs = raw.jobsByRun[run.id] ?? [];
    for (const job of jobs) {
      const context = contextOf(job.name);
      if (context === null) continue;
      const checks = raw.checkRunsBySha[job.head_sha] ?? [];
      const check = checks.find((c) => c.id === job.id);
      const notes = raw.annotationsByJob[job.id] ?? [];
      let verdict: 'PASS' | 'FAIL' | null = null;
      let cache: 'hit' | 'miss' | null = null;
      for (const a of notes) {
        if (a.title === 'harness-verdict') verdict = parseVerdict(a.message) ?? verdict;
        if (a.title === 'cache') {
          const m = /^(hit|miss)$/.exec(a.message.trim());
          if (m) cache = m[1] as 'hit' | 'miss';
        }
      }
      let queueSeconds: number | null = null;
      if (platformOf(context) === 'ios') {
        const gen = jobs.find((j) => j.run_attempt === job.run_attempt && /^harness-generate/.test(j.name));
        const ready = Math.max(ms(job.created_at) ?? 0, ms(gen?.completed_at ?? null) ?? 0);
        queueSeconds = ready > 0 ? secs(ready, ms(job.started_at)) : null;
      }
      out.push({
        context,
        runId: run.id,
        attempt: job.run_attempt,
        event: runById.get(job.run_id)?.event ?? run.event,
        headSha: job.head_sha,
        conclusion: check ? check.conclusion : job.conclusion,
        jobConclusion: job.conclusion,
        createdAt: job.created_at,
        startedAt: job.started_at,
        completedAt: job.completed_at,
        durationSeconds: secs(ms(job.started_at), ms(job.completed_at)),
        verdict,
        cache,
        queueSeconds,
        xcodePin: raw.xcodePinBySha?.[job.head_sha] ?? null,
      });
    }
  }
  return out;
}

// ---------------------------------------------------------------------------------------------
// The analysis
// ---------------------------------------------------------------------------------------------

export type BreakReason =
  | 'cancelled or timed out'
  | 'no harness-verdict annotation (failed before the comparator)'
  | 'attempts ended with different conclusions'
  | 'verdict changed with the same head SHA';

export interface RunSummary {
  runId: number;
  event: string;
  headSha: string;
  attempts: number;
  /** The last attempt. */
  last: JobRecord;
  attemptConclusions: (string | null)[];
  /** Why this run does not count toward conditions 2 and 3, for a dispatched run. */
  excluded: string | null;
  /** Condition 2: set when this (pull-request) run is a break. */
  breaks: BreakReason[];
  /** Condition 3: this run counts toward the cold-run clause. */
  coldCounts: boolean;
}

export interface ContextAnalysis {
  context: Context;
  platform: Platform;
  runs: RunSummary[];
  pullRequestRuns: number;
  dispatchedRuns: number;
  /** Condition 2: the number of non-break pull-request runs since the last break. */
  streak: number;
  streakMet: boolean;
  /** Condition 3. */
  coldRuns: RunSummary[];
  coldMet: boolean;
  /** Condition 5 (iOS): the counted runs whose queue time + duration exceeds the ceiling. */
  overCeiling: RunSummary[];
  queuePoor: boolean | null;
}

export interface Analysis {
  contexts: ContextAnalysis[];
}

export interface AnalyzeOptions {
  /** The current Xcode pin; iOS runs at another pin do not count toward condition 3. Null: count every pin. */
  currentXcodePin?: string | null;
}

const orderRuns = (a: RunSummary, b: RunSummary): number => a.runId - b.runId;

export function analyze(records: readonly JobRecord[], opts: AnalyzeOptions = {}): Analysis {
  const contexts: ContextAnalysis[] = [];
  for (const context of CONTEXTS) {
    const platform = platformOf(context);
    const mine = records.filter((r) => r.context === context);
    const byRun = new Map<number, JobRecord[]>();
    for (const r of mine) byRun.set(r.runId, [...(byRun.get(r.runId) ?? []), r]);
    const runs: RunSummary[] = [];
    for (const [runId, attempts] of byRun) {
      attempts.sort((a, b) => a.attempt - b.attempt);
      const last = attempts[attempts.length - 1];
      runs.push({
        runId,
        event: last.event,
        headSha: last.headSha,
        attempts: attempts.length,
        last,
        attemptConclusions: attempts.map((a) => a.conclusion),
        excluded: last.event === 'pull_request' ? null : `a ${last.event} run counts toward neither condition 2 nor condition 3`,
        breaks: [],
        coldCounts: false,
      });
    }
    runs.sort(orderRuns);

    // Condition 2: walk the pull-request runs in order.
    const pr = runs.filter((r) => r.excluded === null);
    let streak = 0;
    let prev: RunSummary | null = null;
    for (const run of pr) {
      const l = run.last;
      if (l.conclusion === 'cancelled' || l.conclusion === 'timed_out') run.breaks.push('cancelled or timed out');
      if (l.verdict === null) run.breaks.push('no harness-verdict annotation (failed before the comparator)');
      if (new Set(run.attemptConclusions).size > 1) run.breaks.push('attempts ended with different conclusions');
      if (prev && prev.last.verdict !== null && l.verdict !== null && prev.last.verdict !== l.verdict && prev.headSha === run.headSha) {
        run.breaks.push('verdict changed with the same head SHA');
      }
      if (run.breaks.length > 0) streak = 0;
      else streak++;
      prev = run;
    }

    // Condition 3: pull-request runs that reached the comparator.
    const reached = pr.filter((r) => r.last.verdict !== null);
    let cold: RunSummary[];
    if (platform === 'android') cold = reached.filter((r) => r.last.cache === 'miss');
    else {
      const atPin = reached.filter((r) => opts.currentXcodePin == null || r.last.xcodePin === opts.currentXcodePin);
      cold = atPin.slice(0, 3);
    }
    for (const r of cold) r.coldCounts = true;
    const underCeiling = cold.filter((r) => r.last.durationSeconds !== null && r.last.durationSeconds < CEILING_SECONDS);
    const coldMet = cold.length >= 3 && (platform === 'android' ? underCeiling.length >= 3 : underCeiling.length === cold.length);

    // Condition 5: iOS queue time + duration of the three counted runs.
    let overCeiling: RunSummary[] = [];
    let queuePoor: boolean | null = null;
    if (platform === 'ios') {
      overCeiling = cold.filter((r) => (r.last.queueSeconds ?? 0) + (r.last.durationSeconds ?? 0) > CEILING_SECONDS);
      queuePoor = cold.length >= 3 ? overCeiling.length > 0 : null;
    }

    contexts.push({
      context,
      platform,
      runs,
      pullRequestRuns: pr.length,
      dispatchedRuns: runs.length - pr.length,
      streak,
      streakMet: streak >= 10,
      coldRuns: cold,
      coldMet,
      overCeiling,
      queuePoor,
    });
  }
  return { contexts };
}

// ---------------------------------------------------------------------------------------------
// The record
// ---------------------------------------------------------------------------------------------

const fmt = (v: string | number | null): string => (v === null ? '-' : String(v));
const dur = (s: number | null): string => (s === null ? '-' : `${s}s`);

export interface RenderMeta {
  repo: string;
  workflow: string;
  /** ISO time the record was computed. */
  generatedAt: string;
  /** The repository head the record is committed against, for the reader. */
  note?: string;
}

export function render(analysis: Analysis, meta: RenderMeta): string {
  const lines: string[] = [];
  lines.push('# Harness stability record');
  lines.push('');
  lines.push('Computed by `scripts/harness/stability.ts`; never edited by hand (tasks.md § "Decision 6"). Re-run it before each promotion offer.');
  lines.push('');
  lines.push(`**Generated**: ${meta.generatedAt} · **Repository**: \`${meta.repo}\` · **Workflow**: \`${meta.workflow}\`${meta.note ? ` · ${meta.note}` : ''}`);
  lines.push('');
  lines.push('**Source endpoints** (all under `repos/' + meta.repo + '`; a job id is its check run id):');
  lines.push('- `actions/workflows/' + meta.workflow + '/runs`: the runs (id, head SHA, event, attempt, conclusion);');
  lines.push('- `actions/runs/<run id>/jobs?filter=all`: every attempt\'s jobs and their `created_at`, `started_at`, `completed_at`;');
  lines.push('- `commits/<head sha>/check-runs`: the checks API, each context\'s check-run conclusion;');
  lines.push('- `check-runs/<job id>/annotations`: the `harness-verdict` and `cache` annotations, which outlast the logs.');
  lines.push('');
  lines.push('**Rules applied** (conditions of § "Decision 6"). A dispatched run counts toward neither condition 2 nor condition 3. A run counts toward condition 3 only if its context reached the comparator (it carries `harness-verdict`). Duration is `completed_at - started_at`; the ceiling is ' + CEILING_SECONDS / 60 + ' minutes. For an iOS context, queue time is `started_at - max(created_at, harness-generate.completed_at)`.');
  lines.push('');
  for (const c of analysis.contexts) {
    lines.push(`## ${c.context}`);
    lines.push('');
    lines.push(`- Runs recorded: ${c.runs.length} (${c.pullRequestRuns} pull-request, ${c.dispatchedRuns} dispatched).`);
    lines.push(`- **Condition 2** (10 consecutive pull-request runs, no break): current streak ${c.streak} of 10 — ${c.streakMet ? 'met' : 'not met'}.`);
    if (c.platform === 'android') {
      lines.push(`- **Condition 3** (three cold-cache runs under 10 minutes; pull-request runs with \`cache: miss\` that reached the comparator): ${c.coldRuns.length} counted — ${c.coldMet ? 'met' : 'not met'}.`);
    } else {
      lines.push(`- **Condition 3** (the first three pull-request runs at the current Xcode pin that reached the comparator, each under 10 minutes): ${c.coldRuns.length} counted — ${c.coldMet ? 'met' : 'not met'}.`);
      lines.push(`- **Condition 5** (queue time + duration of those runs against 10 minutes): ${c.queuePoor === null ? 'not yet measurable (fewer than three counted runs)' : c.queuePoor ? 'POOR: ' + c.overCeiling.length + ' run(s) over the ceiling' : 'within the ceiling'}.`);
    }
    lines.push('');
    if (c.runs.length === 0) {
      lines.push('_No runs recorded._');
      lines.push('');
      continue;
    }
    lines.push('| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |');
    lines.push('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
    for (const r of c.runs) {
      const l = r.last;
      const counts = r.excluded !== null ? 'no (dispatched)' : r.coldCounts ? 'cond 2, cond 3' : 'cond 2';
      lines.push(
        `| ${r.runId} | \`${l.headSha.slice(0, 9)}\` | ${r.event} | ${r.attempts} | ${fmt(l.conclusion)} | ${fmt(l.verdict)} | ${fmt(l.cache)} | ${l.createdAt} | ${fmt(l.startedAt)} | ${fmt(l.completedAt)} | ${dur(l.durationSeconds)} | ${c.platform === 'ios' ? dur(l.queueSeconds) : 'n/a'} | ${counts} | ${r.breaks.length ? r.breaks.join('; ') : '-'} |`,
      );
    }
    lines.push('');
  }
  return lines.join('\n') + '\n';
}

// ---------------------------------------------------------------------------------------------
// Fetching (the only network code)
// ---------------------------------------------------------------------------------------------

async function api<T>(repo: string, path: string, token: string): Promise<T> {
  const res = await fetch(`https://api.github.com/repos/${repo}/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
  });
  if (!res.ok) throw new Error(`GET ${path}: ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export async function fetchRaw(repo: string, workflow: string, token: string, ref?: string): Promise<RawInput> {
  const runs = (await api<{ workflow_runs: ApiRun[] }>(repo, `actions/workflows/${workflow}/runs?per_page=100${ref ? `&branch=${encodeURIComponent(ref)}` : ''}`, token)).workflow_runs;
  const jobsByRun: Record<number, ApiJob[]> = {};
  const checkRunsBySha: Record<string, ApiCheckRun[]> = {};
  const annotationsByJob: Record<number, ApiAnnotation[]> = {};
  for (const run of runs) {
    const jobs = (await api<{ jobs: ApiJob[] }>(repo, `actions/runs/${run.id}/jobs?filter=all&per_page=100`, token)).jobs;
    jobsByRun[run.id] = jobs;
    for (const sha of new Set(jobs.map((j) => j.head_sha))) {
      if (!checkRunsBySha[sha]) checkRunsBySha[sha] = (await api<{ check_runs: ApiCheckRun[] }>(repo, `commits/${sha}/check-runs?per_page=100`, token)).check_runs;
    }
    for (const job of jobs) {
      if (contextOf(job.name) === null) continue;
      annotationsByJob[job.id] = await api<ApiAnnotation[]>(repo, `check-runs/${job.id}/annotations?per_page=100`, token);
    }
  }
  return { runs, jobsByRun, checkRunsBySha, annotationsByJob };
}

/** The Xcode pin at each head SHA, read from the local clone; a SHA the clone lacks gets no entry. */
export function readXcodePins(shas: readonly string[], repoDir: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const sha of shas) {
    try {
      const text = execFileSync('git', ['show', `${sha}:harness/pins.yaml`], { cwd: repoDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      const m = /^\s+xcode\.version:\s*"([^"]+)"/m.exec(text);
      if (m) out[sha] = m[1];
    } catch {
      /* the SHA or the file is not in the clone */
    }
  }
  return out;
}

const USAGE = 'usage: stability.ts --repo <owner/name> [--workflow native-harness.yml] [--branch <ref>] [--xcode-pin <version>] [--out <file>]';

export async function main(argv: readonly string[]): Promise<number> {
  const opts = new Map<string, string>();
  for (let i = 0; i < argv.length; i += 2) {
    if (!argv[i].startsWith('--') || argv[i + 1] === undefined) {
      console.error(USAGE);
      return 2;
    }
    opts.set(argv[i].slice(2), argv[i + 1]);
  }
  const repo = opts.get('repo');
  const token = process.env.GH_TOKEN;
  if (!repo || !token) {
    console.error(`${USAGE}; GH_TOKEN must be set`);
    return 2;
  }
  const workflow = opts.get('workflow') ?? 'native-harness.yml';
  const raw = await fetchRaw(repo, workflow, token, opts.get('branch'));
  raw.xcodePinBySha = readXcodePins([...new Set(raw.runs.map((r) => r.head_sha))], process.cwd());
  const analysis = analyze(normalize(raw), { currentXcodePin: opts.get('xcode-pin') ?? null });
  const text = render(analysis, { repo, workflow, generatedAt: new Date().toISOString().replace(/\.\d+Z$/, 'Z') });
  const out = opts.get('out');
  if (out) fs.writeFileSync(out, text);
  else process.stdout.write(text);
  return 0;
}

if (require.main === module) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (err) => {
      console.error(`stability: ${(err as Error).message}`);
      process.exit(1);
    },
  );
}

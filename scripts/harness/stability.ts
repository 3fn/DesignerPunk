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
 * An INFRA run (its job carries the `harness-infra` annotation, `<host> <status> <step>`, written when the
 * lane's resolve step met an environment fault and no comparator ran; tasks.md Task 19, amendment 7) is
 * neither a break nor a counted run for condition 2 and is never a cold run for condition 3. Two or more
 * consecutive infra runs of one context at one head SHA are a finding. An infra run whose attempts end with
 * different conclusions is still a break.
 *
 * A job that has not finished (tasks.md § "Decision 6", "A job that has not finished", amendment 11) is
 * decided per run and per context, never by the run's status alone. A job is FINISHED when the jobs API lists
 * it for the run's latest attempt (`run_attempt`) and it has a conclusion (and, where the checks API lists its
 * check run, that has one too). It ENDED WITH NO JOB when the run is `completed` and its latest attempt lists
 * no job for the context: a break for condition 2. It is UNFINISHED in every other state (a job not listed
 * yet, a re-run pending, a null status, a null conclusion). An unfinished job is listed, never skipped over:
 * it is neither a break nor a counted run, but an unfinished PULL-REQUEST job that comes before the last run a
 * condition reads leaves that condition "not yet measurable" for the context.
 *
 * The window is every run the runs endpoint lists, read page by page up to its `total_count`, with no branch
 * filter. A short read (fewer runs than `total_count`, a failed page, a branch filter) makes every condition of
 * every context "not yet measurable" and the record names the shortfall.
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
  /** The runs endpoint's `total_count`; absent in older fixtures (no window check). */
  totalCount?: number;
  /** True when the runs were read with a branch filter. */
  branchFiltered?: boolean;
  /** Shortfalls of the window read (a failed page, fewer runs than total_count); each makes every condition unmeasurable. */
  windowShortfalls?: readonly string[];
  /** Runs whose jobs, check runs or annotations were not read in full: their jobs read as unfinished. */
  incompleteRuns?: Readonly<Record<number, string>>;
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

export interface InfraFault {
  host: string;
  status: string;
  step: string;
}

/** `repo.maven.apache.org 403 resolve` -> its three fields; null when the message does not have them. */
export function parseInfra(message: string): InfraFault | null {
  const m = /^(\S+) (\S+) (\S+)$/.exec(message.trim());
  return m ? { host: m[1], status: m[2], step: m[3] } : null;
}

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
  /** The run's status (`completed`, `in_progress`, `queued`); null when the API record carries none. */
  runStatus: string | null;
  /** The job's class: finished; unfinished (every other state); or `ended-no-job` (completed run, latest attempt lists none). */
  state: 'finished' | 'unfinished' | 'ended-no-job';
  /** True when the latest attempt lists no job for the context (the record is synthetic). */
  noJobListed: boolean;
  /** Why an unfinished job is unfinished, for the record. */
  unfinishedWhy: string | null;
  /** `PASS` or `FAIL` from the `harness-verdict` annotation; null when the annotation is absent. */
  verdict: 'PASS' | 'FAIL' | null;
  /** From the `harness-infra` annotation (`<host> <status> <step>`); null when absent. */
  infra: InfraFault | null;
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

/**
 * A re-run of only some jobs lists the others again under the new attempt, as copies with new ids, no
 * annotations and the original job's `started_at` and `completed_at`. The attempt whose job actually ran
 * carries the annotations, so such a copy is dropped and the earlier attempt's job is the one read.
 */
export function carriedOver(job: ApiJob, siblings: readonly ApiJob[]): boolean {
  return siblings.some(
    (o) =>
      o.name === job.name &&
      o.run_attempt < job.run_attempt &&
      o.started_at !== null &&
      o.started_at === job.started_at &&
      o.completed_at === job.completed_at,
  );
}

export function normalize(raw: RawInput): JobRecord[] {
  const runById = new Map(raw.runs.map((r) => [r.id, r]));
  const out: JobRecord[] = [];
  for (const run of raw.runs) {
    const jobs = raw.jobsByRun[run.id] ?? [];
    const latest = run.run_attempt ?? Math.max(1, ...jobs.map((j) => j.run_attempt));
    const incomplete = raw.incompleteRuns?.[run.id];
    for (const context of CONTEXTS) {
      const mineAll = jobs.filter((j) => contextOf(j.name) === context);
      const listedAtLatest = mineAll.some((j) => j.run_attempt === latest);
      const synthetic = (state: JobRecord['state'], why: string | null): JobRecord => ({
        context,
        runId: run.id,
        attempt: latest,
        event: run.event,
        headSha: run.head_sha,
        runStatus: run.status ?? null,
        state,
        noJobListed: true,
        unfinishedWhy: why,
        conclusion: null,
        jobConclusion: null,
        createdAt: run.created_at,
        startedAt: null,
        completedAt: null,
        durationSeconds: null,
        verdict: null,
        infra: null,
        cache: null,
        queueSeconds: null,
        xcodePin: raw.xcodePinBySha?.[run.head_sha] ?? null,
      });
      if (incomplete !== undefined) {
        out.push({ ...synthetic('unfinished', incomplete), noJobListed: mineAll.length === 0 });
        continue;
      }
      if (!listedAtLatest) {
        if (run.status === 'completed') out.push(synthetic('ended-no-job', null));
        else out.push(synthetic('unfinished', mineAll.length > 0 ? `only an earlier attempt lists the job (attempt ${latest} pending)` : 'no job listed'));
        continue;
      }
      for (const job of mineAll) {
        if (carriedOver(job, jobs)) continue;
        const checks = raw.checkRunsBySha[job.head_sha] ?? [];
        const check = checks.find((c) => c.id === job.id);
        const notes = raw.annotationsByJob[job.id] ?? [];
        let verdict: 'PASS' | 'FAIL' | null = null;
        let cache: 'hit' | 'miss' | null = null;
        let infra: InfraFault | null = null;
        for (const a of notes) {
          if (a.title === 'harness-infra') infra = parseInfra(a.message) ?? infra;
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
        const conclusion = check ? check.conclusion : job.conclusion;
        let state: JobRecord['state'] = 'finished';
        let why: string | null = null;
        if (job.conclusion === null && check === undefined) [state, why] = ['unfinished', 'the job has no conclusion'];
        else if (job.conclusion === null) [state, why] = ['unfinished', 'the job has no conclusion (its check run does)'];
        else if (check !== undefined && check.conclusion === null) [state, why] = ['unfinished', 'the check run has no conclusion (the job does)'];
        out.push({
          context,
          runId: run.id,
          attempt: job.run_attempt,
          event: runById.get(job.run_id)?.event ?? run.event,
          headSha: job.head_sha,
          runStatus: runById.get(job.run_id)?.status ?? run.status ?? null,
          state,
          noJobListed: false,
          unfinishedWhy: why,
          conclusion,
          jobConclusion: job.conclusion,
          createdAt: job.created_at,
          startedAt: job.started_at,
          completedAt: job.completed_at,
          durationSeconds: secs(ms(job.started_at), ms(job.completed_at)),
          verdict,
          infra,
          cache,
          queueSeconds,
          xcodePin: raw.xcodePinBySha?.[job.head_sha] ?? null,
        });
      }
    }
  }
  return out;
}

/** The window of a raw read, for `analyze`. */
export function windowOf(raw: RawInput): WindowInfo {
  const shortfalls = [...(raw.windowShortfalls ?? [])];
  if (raw.branchFiltered) shortfalls.push('the runs were read with a branch filter');
  if (raw.totalCount !== undefined && raw.runs.length < raw.totalCount) shortfalls.push(`read ${raw.runs.length} of ${raw.totalCount} runs`);
  return { totalCount: raw.totalCount ?? null, runsRead: raw.runs.length, shortfall: shortfalls.length ? shortfalls.join('; ') : null };
}

/** `analyze(normalize(raw))` with the window of the raw read. */
export function analyzeRaw(raw: RawInput, opts: AnalyzeOptions = {}): Analysis {
  return analyze(normalize(raw), { ...opts, window: windowOf(raw) });
}

// ---------------------------------------------------------------------------------------------
// The analysis
// ---------------------------------------------------------------------------------------------

export type BreakReason =
  | 'cancelled or timed out'
  | 'no harness-verdict annotation (failed before the comparator)'
  | 'attempts ended with different conclusions'
  | 'verdict changed with the same head SHA'
  | 'ended with no job (the completed run\'s latest attempt lists none)';

export interface WindowInfo {
  totalCount: number | null;
  runsRead: number;
  /** Null when the window was read in full. */
  shortfall: string | null;
}

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
  /** True when the last attempt carries `harness-infra` and no `harness-verdict`. */
  infraRun: boolean;
  /** Condition 2: set when this (pull-request) run is a break. */
  breaks: BreakReason[];
  /** Condition 3: this run counts toward the cold-run clause. */
  coldCounts: boolean;
}

export interface ContextAnalysis {
  context: Context;
  platform: Platform;
  runs: RunSummary[];
  /** Runs whose job for this context is unfinished: listed, neither a break nor counted. */
  skippedRuns: { runId: number; status: string; headSha: string; event: string; attempt: number; noJobListed: boolean; why: string | null; xcodePin: string | null }[];
  /** Why condition 2 / condition 3 (and 5) cannot be measured yet; null when they can. */
  streakBlock: string | null;
  coldBlock: string | null;
  pullRequestRuns: number;
  dispatchedRuns: number;
  /** Every infra run of the context, in run order, with its host, status and step. */
  infraRuns: RunSummary[];
  /** Infra runs over all recorded runs of the context (0 when it has none). */
  infraRate: number;
  /** One line per place where two or more consecutive infra runs share a head SHA. */
  findings: string[];
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
  window: WindowInfo | null;
  contexts: ContextAnalysis[];
}

export interface AnalyzeOptions {
  /** The current Xcode pin; iOS runs at another pin do not count toward condition 3. Null: count every pin. */
  currentXcodePin?: string | null;
  window?: WindowInfo | null;
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
    const skippedRuns: ContextAnalysis['skippedRuns'] = [];
    for (const [runId, attempts] of byRun) {
      attempts.sort((a, b) => a.attempt - b.attempt);
      const last = attempts[attempts.length - 1];
      if (last.state === 'unfinished') {
        skippedRuns.push({
          runId,
          status: last.runStatus ?? 'unknown',
          headSha: last.headSha,
          event: last.event,
          attempt: last.attempt,
          noJobListed: last.noJobListed,
          why: last.unfinishedWhy,
          xcodePin: platform === 'ios' ? (last.xcodePin ?? 'unknown') : null,
        });
        continue;
      }
      runs.push({
        runId,
        event: last.event,
        headSha: last.headSha,
        attempts: attempts.length,
        last,
        attemptConclusions: attempts.map((a) => a.conclusion),
        excluded: last.event === 'pull_request' ? null : `a ${last.event} run counts toward neither condition 2 nor condition 3`,
        infraRun: last.infra !== null && last.verdict === null,
        breaks: last.state === 'ended-no-job' && last.event === 'pull_request' ? ["ended with no job (the completed run's latest attempt lists none)"] : [],
        coldCounts: false,
      });
    }
    runs.sort(orderRuns);
    skippedRuns.sort((a, b) => a.runId - b.runId);

    // Infra runs: listed per context, and two or more in a row at one head are a finding.
    const infraRuns = runs.filter((r) => r.infraRun);
    const findings: string[] = [];
    for (let i = 1; i < runs.length; i++) {
      if (!runs[i].infraRun || !runs[i - 1].infraRun || runs[i].headSha !== runs[i - 1].headSha) continue;
      let j = i;
      while (j + 1 < runs.length && runs[j + 1].infraRun && runs[j + 1].headSha === runs[i].headSha) j++;
      findings.push(`${context}: ${j - i + 2} consecutive infra runs at head ${runs[i].headSha.slice(0, 9)} (runs ${runs.slice(i - 1, j + 1).map((r) => r.runId).join(', ')}): ${runs[i].last.infra?.host} ${runs[i].last.infra?.status}`);
      i = j;
    }

    // Condition 2: walk the pull-request runs in order.
    const pr = runs.filter((r) => r.excluded === null);
    let streak = 0;
    let prev: RunSummary | null = null;
    for (const run of pr) {
      const l = run.last;
      if (l.state === 'ended-no-job') {
        streak = 0;
        prev = null;
        continue;
      }
      if (run.infraRun) {
        // An infra run is neither a break nor counted; only differing attempts break it.
        if (new Set(run.attemptConclusions).size > 1) {
          run.breaks.push('attempts ended with different conclusions');
          streak = 0;
        }
        continue;
      }
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
    const reached = pr.filter((r) => r.last.state === 'finished' && r.last.verdict !== null && !r.infraRun);
    let cold: RunSummary[];
    if (platform === 'android') cold = reached.filter((r) => r.last.cache === 'miss');
    else {
      const atPin = reached.filter((r) => opts.currentXcodePin == null || r.last.xcodePin === opts.currentXcodePin);
      cold = atPin.slice(0, 3);
    }
    for (const r of cold) r.coldCounts = true;

    // Not yet measurable: an unfinished pull-request job before the last run a condition reads.
    const shortfall = opts.window?.shortfall ?? null;
    const unfPr = skippedRuns.filter((r) => r.event === 'pull_request');
    const list = (xs: { runId: number }[]): string => xs.map((x) => x.runId).join(', ');
    let streakBlock: string | null = shortfall === null ? null : `the window is short (${shortfall})`;
    let coldBlock: string | null = streakBlock;
    if (streakBlock === null && pr.length > 0) {
      const newest = pr[pr.length - 1].runId;
      const before = unfPr.filter((r) => r.runId < newest);
      if (before.length > 0) streakBlock = `unfinished pull-request run ${list(before)} comes before the newest finished pull-request run ${newest}`;
    }
    if (coldBlock === null && platform === 'ios') {
      const pinOk = (r: { xcodePin: string | null }): boolean => opts.currentXcodePin == null || r.xcodePin === 'unknown' || r.xcodePin === opts.currentXcodePin;
      const third = cold.length >= 3 ? cold[2].runId : Infinity;
      const before = unfPr.filter((r) => r.runId < third && pinOk(r));
      if (before.length > 0) coldBlock = `unfinished pull-request run ${list(before)}${cold.length >= 3 ? ` comes before the third counted run ${third}` : ' may be one of the first three at the pin'}`;
    }
    const underCeiling = cold.filter((r) => r.last.durationSeconds !== null && r.last.durationSeconds < CEILING_SECONDS);
    const coldMet = coldBlock === null && cold.length >= 3 && (platform === 'android' ? underCeiling.length >= 3 : underCeiling.length === cold.length);

    // Condition 5: iOS queue time + duration of the three counted runs.
    let overCeiling: RunSummary[] = [];
    let queuePoor: boolean | null = null;
    if (platform === 'ios') {
      overCeiling = cold.filter((r) => (r.last.queueSeconds ?? 0) + (r.last.durationSeconds ?? 0) > CEILING_SECONDS);
      queuePoor = coldBlock === null && cold.length >= 3 ? overCeiling.length > 0 : null;
    }

    contexts.push({
      context,
      platform,
      runs,
      skippedRuns,
      infraRuns,
      infraRate: runs.length === 0 ? 0 : infraRuns.length / runs.length,
      findings,
      pullRequestRuns: pr.length,
      dispatchedRuns: runs.length - pr.length,
      streak,
      streakMet: streakBlock === null && streak >= 10,
      streakBlock,
      coldBlock,
      coldRuns: cold,
      coldMet,
      overCeiling,
      queuePoor,
    });
  }
  return { window: opts.window ?? null, contexts };
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
  if (analysis.window) {
    const w = analysis.window;
    lines.push(`**Window**: \`total_count\` ${w.totalCount ?? 'not read'}; ${w.runsRead} runs read${w.shortfall ? ` — **SHORT READ: ${w.shortfall}; every condition below is not yet measurable**` : ' — read in full'}.`);
    lines.push('');
  }
  lines.push('**Source endpoints** (all under `repos/' + meta.repo + '`; a job id is its check run id):');
  lines.push('- `actions/workflows/' + meta.workflow + '/runs`: the runs (id, head SHA, event, attempt, conclusion);');
  lines.push('- `actions/runs/<run id>/jobs?filter=all`: every attempt\'s jobs and their `created_at`, `started_at`, `completed_at`;');
  lines.push('- `commits/<head sha>/check-runs`: the checks API, each context\'s check-run conclusion;');
  lines.push('- `check-runs/<job id>/annotations`: the `harness-verdict` and `cache` annotations, which outlast the logs.');
  lines.push('');
  lines.push('**Rules applied** (conditions of § "Decision 6"). A dispatched run counts toward neither condition 2 nor condition 3. A run counts toward condition 3 only if its context reached the comparator (it carries `harness-verdict`). A run carrying `harness-infra` (an environment fault found before any comparison) is neither a break nor counted for condition 2 and is never a cold run; two or more consecutive infra runs at one head are printed as a finding. Each pull-request run is read per context and per job, not by the run\'s status: a job is finished when it is listed for the run\'s latest attempt with a conclusion; a completed run whose latest attempt lists no job for the context is a break; every other state is unfinished, and is listed in a skipped-runs table per context, neither a break nor counted. An unfinished pull-request job before the last run a condition reads leaves that condition not yet measurable. The window is every run the runs endpoint lists, read up to its `total_count`; a short read makes every condition not yet measurable. Duration is `completed_at - started_at`; the ceiling is ' + CEILING_SECONDS / 60 + ' minutes. For an iOS context, queue time is `started_at - max(created_at, harness-generate.completed_at)`.');
  lines.push('');
  for (const c of analysis.contexts) {
    lines.push(`## ${c.context}`);
    lines.push('');
    lines.push(`- Runs recorded: ${c.runs.length} (${c.pullRequestRuns} pull-request, ${c.dispatchedRuns} dispatched).`);
    lines.push(`- Infra runs (\`harness-infra\`): ${c.infraRuns.length} of ${c.runs.length} recorded, infra rate ${(c.infraRate * 100).toFixed(1)}%.`);
    for (const r of c.infraRuns) lines.push(`  - run ${r.runId} at \`${r.headSha.slice(0, 9)}\`: ${r.last.infra?.host} ${r.last.infra?.status} ${r.last.infra?.step}`);
    for (const f of c.findings) lines.push(`- **FINDING**: ${f}`);
    lines.push(`- **Condition 2** (10 consecutive pull-request runs, no break): current streak ${c.streak} of 10 — ${c.streakBlock !== null ? 'not yet measurable (' + c.streakBlock + ')' : c.streakMet ? 'met' : 'not met'}.`);
    if (c.platform === 'android') {
      lines.push(`- **Condition 3** (three cold-cache runs under 10 minutes; pull-request runs with \`cache: miss\` that reached the comparator): ${c.coldRuns.length} counted — ${c.coldBlock !== null ? 'not yet measurable (' + c.coldBlock + ')' : c.coldMet ? 'met' : 'not met'}.`);
    } else {
      lines.push(`- **Condition 3** (the first three pull-request runs at the current Xcode pin that reached the comparator, each under 10 minutes): ${c.coldRuns.length} counted — ${c.coldBlock !== null ? 'not yet measurable (' + c.coldBlock + ')' : c.coldMet ? 'met' : 'not met'}.`);
      lines.push(`- **Condition 5** (queue time + duration of those runs against 10 minutes): ${c.coldBlock !== null ? 'not yet measurable (' + c.coldBlock + ')' : c.queuePoor === null ? 'not yet measurable (fewer than three counted runs)' : c.queuePoor ? 'POOR: ' + c.overCeiling.length + ' run(s) over the ceiling' : 'within the ceiling'}.`);
    }
    lines.push('');
    if (c.skippedRuns.length > 0) {
      lines.push('**Unfinished jobs** (neither a break nor counted; a pull-request one before the last run a condition reads leaves that condition not yet measurable):');
      lines.push('');
      lines.push('| run id | head SHA | event | run status | attempt | job | Xcode pin |');
      lines.push('|---|---|---|---|---|---|---|');
      for (const r of c.skippedRuns) lines.push(`| ${r.runId} | \`${r.headSha.slice(0, 9)}\` | ${r.event} | ${r.status} | ${r.attempt} | ${r.noJobListed ? 'no job listed' : r.why ?? 'unfinished'} | ${r.xcodePin ?? 'n/a'} |`);
      lines.push('');
    }
    if (c.runs.length === 0) {
      lines.push('_No runs recorded._');
      lines.push('');
      continue;
    }
    lines.push('| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |');
    lines.push('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
    for (const r of c.runs) {
      const l = r.last;
      const counts = r.excluded !== null ? 'no (dispatched)' : r.infraRun ? 'no (infra)' : r.coldCounts ? 'cond 2, cond 3' : 'cond 2';
      lines.push(
        `| ${r.runId} | \`${l.headSha.slice(0, 9)}\` | ${r.event} | ${r.attempts} | ${l.conclusion !== null && l.jobConclusion !== null && l.conclusion !== l.jobConclusion ? `${l.conclusion} (check run; job ${l.jobConclusion})` : fmt(l.conclusion)} | ${l.verdict ?? (l.infra ? 'infra' : '-')} | ${fmt(l.cache)} | ${l.createdAt} | ${fmt(l.startedAt)} | ${fmt(l.completedAt)} | ${dur(l.durationSeconds)} | ${c.platform === 'ios' ? dur(l.queueSeconds) : 'n/a'} | ${counts} | ${r.breaks.length ? r.breaks.join('; ') : '-'} |`,
      );
    }
    lines.push('');
  }
  return lines.join('\n') + '\n';
}

// ---------------------------------------------------------------------------------------------
// Fetching (the only network code)
// ---------------------------------------------------------------------------------------------

type Get = (path: string) => Promise<unknown>;

const apiGet = (repo: string, token: string): Get => async (path) => {
  const res = await fetch(`https://api.github.com/repos/${repo}/${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
  });
  if (!res.ok) throw new Error(`GET ${path}: ${res.status} ${res.statusText}`);
  return res.json();
};

const sep = (path: string): string => (path.includes('?') ? '&' : '?');

/**
 * Every page of a list endpoint. `key` names the array in an object response (absent: the response is the
 * array). Reads until the items equal `total_count` (when the response carries one) or a page is short.
 * Throws if a page fails or if the items read fall short of `total_count`.
 */
async function pages<T>(get: Get, path: string, key?: string): Promise<{ items: T[]; total: number | null }> {
  const items: T[] = [];
  let total: number | null = null;
  for (let page = 1; page < 1000; page++) {
    const body = (await get(`${path}${sep(path)}per_page=100&page=${page}`)) as Record<string, unknown> | T[];
    const batch = (key ? (body as Record<string, T[]>)[key] : (body as T[])) ?? [];
    if (key && typeof (body as Record<string, unknown>).total_count === 'number') total = (body as { total_count: number }).total_count;
    items.push(...batch);
    if (total !== null ? items.length >= total : batch.length < 100) break;
    if (batch.length === 0) break;
  }
  if (total !== null && items.length < total) throw new Error(`${path}: read ${items.length} of ${total}`);
  return { items, total };
}

export async function fetchRaw(repo: string, workflow: string, token: string, ref?: string, get: Get = apiGet(repo, token)): Promise<RawInput> {
  const windowShortfalls: string[] = [];
  let runs: ApiRun[] = [];
  let totalCount: number | undefined;
  const runsPath = `actions/workflows/${workflow}/runs${ref ? `?branch=${encodeURIComponent(ref)}` : ''}`;
  for (let page = 1; page < 1000; page++) {
    try {
      const body = (await get(`${runsPath}${sep(runsPath)}per_page=100&page=${page}`)) as { total_count: number; workflow_runs: ApiRun[] };
      totalCount = body.total_count;
      runs.push(...body.workflow_runs);
      if (runs.length >= body.total_count || body.workflow_runs.length === 0) break;
    } catch (e) {
      windowShortfalls.push(`runs page ${page} failed: ${(e as Error).message}`);
      break;
    }
  }
  const jobsByRun: Record<number, ApiJob[]> = {};
  const checkRunsBySha: Record<string, ApiCheckRun[]> = {};
  const annotationsByJob: Record<number, ApiAnnotation[]> = {};
  const incompleteRuns: Record<number, string> = {};
  for (const run of runs) {
    try {
      const jobs = (await pages<ApiJob>(get, `actions/runs/${run.id}/jobs?filter=all`, 'jobs')).items;
      jobsByRun[run.id] = jobs;
      for (const sha of new Set(jobs.map((j) => j.head_sha))) {
        if (!checkRunsBySha[sha]) checkRunsBySha[sha] = (await pages<ApiCheckRun>(get, `commits/${sha}/check-runs`, 'check_runs')).items;
      }
      for (const job of jobs) {
        if (contextOf(job.name) === null) continue;
        annotationsByJob[job.id] = (await pages<ApiAnnotation>(get, `check-runs/${job.id}/annotations`)).items;
      }
    } catch (e) {
      incompleteRuns[run.id] = `a per-run list was not read in full (${(e as Error).message})`;
    }
  }
  return { runs, totalCount, branchFiltered: Boolean(ref), windowShortfalls, incompleteRuns, jobsByRun, checkRunsBySha, annotationsByJob };
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

const USAGE = 'usage: stability.ts --repo <owner/name> [--workflow native-harness.yml] [--branch <ref>] [--xcode-pin <version>] [--note <text>] [--out <file>]';

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
  const analysis = analyzeRaw(raw, { currentXcodePin: opts.get('xcode-pin') ?? null });
  const text = render(analysis, { repo, workflow, generatedAt: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), note: opts.get('note') });
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

/**
 * The stability script's tests (Spec 129 Task 5.3; tasks.md § "Decision 6"; Task 5's criterion on
 * `stability.test.ts`). Owner: Thurgood.
 *
 * Every case reads a recorded or API-shaped fixture under `fixtures/stability/` and asserts the
 * analysis against literals. `recorded-dispatch-run.json` is a real recording (native-harness.yml
 * run 42331622121, a dispatch); the others are synthetic, API-shaped files that each exercise one
 * rule. The script's tests never reach the network.
 */

import * as fs from 'fs';
import * as path from 'path';
import { ApiJob, ApiRun, RawInput, analyze, analyzeRaw, carriedOver, contextOf, fetchRaw, normalize, parseInfra, parseVerdict, render } from '../stability';

const load = (name: string): RawInput =>
  JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'stability', name), 'utf8')) as RawInput;

const ctx = (raw: RawInput, name: string, opts = {}) => {
  const a = analyze(normalize(raw), opts).contexts.find((c) => c.context === name);
  if (!a) throw new Error(`no ${name}`);
  return a;
};

describe('reading the API shapes', () => {
  it('maps a job name, with or without the dispatch suffix, to its context', () => {
    expect(contextOf('harness-ios-tokens')).toBe('harness-ios-tokens');
    expect(contextOf('harness-ios-tokens (unit-branch)')).toBe('harness-ios-tokens');
    expect(contextOf('harness-generate (unit-branch)')).toBeNull();
    expect(contextOf('lane-functional-root')).toBeNull();
  });
  it('reads the verdict word from the annotation, PASS or FAIL with classes', () => {
    expect(parseVerdict('harness-verdict: harness-android-tokens PASS')).toBe('PASS');
    expect(parseVerdict('harness-verdict: harness-android-tokens FAIL (format)')).toBe('FAIL');
    expect(parseVerdict('harness-verdict: harness-ios-tokens FAIL (check: probe: read; theme instances, toolchain)')).toBe('FAIL');
    expect(parseVerdict('something else')).toBeNull();
  });
  it('normalizes the recorded dispatch run: four contexts, conclusions from the checks API, annotations joined by job id', () => {
    const recs = normalize(load('recorded-dispatch-run.json'));
    expect(recs.map((r) => r.context).sort()).toEqual(['harness-android-components', 'harness-android-tokens', 'harness-ios-components', 'harness-ios-tokens']);
    const byCtx = Object.fromEntries(recs.map((r) => [r.context, r]));
    expect(byCtx['harness-android-tokens'].verdict).toBe('PASS');
    expect(byCtx['harness-android-tokens'].cache).toBe('hit');
    expect(byCtx['harness-android-components'].cache).toBe('hit');
    expect(byCtx['harness-ios-tokens'].verdict).toBe('PASS');
    expect(byCtx['harness-ios-tokens'].cache).toBeNull();
    expect(recs.every((r) => r.event === 'workflow_dispatch' && r.conclusion === 'success' && r.attempt === 1)).toBe(true);
    expect(byCtx['harness-ios-tokens'].durationSeconds).toBeGreaterThan(0);
    expect(byCtx['harness-ios-tokens'].queueSeconds).not.toBeNull();
    expect(byCtx['harness-android-tokens'].queueSeconds).toBeNull();
  });
});

describe('a dispatched run counts toward neither condition 2 nor condition 3', () => {
  it('the recorded dispatch run: four contexts, no pull-request run, streak 0, no cold run', () => {
    const analysis = analyze(normalize(load('recorded-dispatch-run.json')));
    for (const c of analysis.contexts) {
      expect(c.runs.length).toBe(1);
      expect(c.pullRequestRuns).toBe(0);
      expect(c.dispatchedRuns).toBe(1);
      expect(c.streak).toBe(0);
      expect(c.streakMet).toBe(false);
      expect(c.coldRuns).toEqual([]);
      expect(c.coldMet).toBe(false);
      expect(c.runs[0].excluded).toBe('a workflow_dispatch run counts toward neither condition 2 nor condition 3');
    }
  });
  it('an Android dispatch run with cache: miss and a verdict is not a cold run; a pull-request one is', () => {
    const c = ctx(load('mixed.json'), 'harness-android-tokens');
    expect(c.runs.find((r) => r.runId === 901)?.excluded).not.toBeNull();
    expect(c.runs.find((r) => r.runId === 901)?.coldCounts).toBe(false);
    expect(c.runs.find((r) => r.runId === 902)?.coldCounts).toBe(true);
  });
  it('an iOS dispatch run is not among the first three pull-request runs', () => {
    const c = ctx(load('mixed.json'), 'harness-ios-components');
    expect(c.coldRuns.map((r) => r.runId)).toEqual([907]);
  });
});

describe('condition 2: each break rule', () => {
  it('a cancelled run is a break, and the count restarts after it', () => {
    const c = ctx(load('break-cancelled.json'), 'harness-android-tokens');
    const r202 = c.runs.find((r) => r.runId === 202);
    expect(r202?.breaks).toEqual(['cancelled or timed out', 'no harness-verdict annotation (failed before the comparator)']);
    expect(c.runs.filter((r) => r.breaks.length > 0).map((r) => r.runId)).toEqual([202]);
    expect(c.streak).toBe(2);
  });
  it('a timed_out run is a break too', () => {
    const raw = load('break-cancelled.json');
    for (const cr of Object.values(raw.checkRunsBySha).flat()) if (cr.conclusion === 'cancelled') (cr as { conclusion: string }).conclusion = 'timed_out';
    const r202 = ctx(raw, 'harness-android-tokens').runs.find((r) => r.runId === 202);
    expect(r202?.breaks).toContain('cancelled or timed out');
  });
  it('a failed job with no harness-verdict annotation is a break (it died before the comparator)', () => {
    const c = ctx(load('break-no-verdict.json'), 'harness-android-tokens');
    expect(c.runs.find((r) => r.runId === 302)?.breaks).toEqual(['no harness-verdict annotation (failed before the comparator)']);
    expect(c.streak).toBe(1);
  });
  it('attempts that ended with different conclusions are a break', () => {
    const c = ctx(load('break-flaky-attempts.json'), 'harness-android-tokens');
    const r402 = c.runs.find((r) => r.runId === 402);
    expect(r402?.attempts).toBe(2);
    expect(r402?.attemptConclusions).toEqual(['failure', 'success']);
    expect(r402?.breaks).toEqual(['attempts ended with different conclusions']);
    expect(c.streak).toBe(1);
  });
  it('a verdict change with the same head SHA is a break; a change with a new head SHA is not', () => {
    const c = ctx(load('break-verdict-change.json'), 'harness-android-tokens');
    expect(c.runs.find((r) => r.runId === 502)?.breaks).toEqual(['verdict changed with the same head SHA']);
    expect(c.runs.find((r) => r.runId === 503)?.breaks).toEqual([]);
    expect(c.runs.find((r) => r.runId === 504)?.breaks).toEqual([]);
    expect(c.streak).toBe(2);
  });
  it('ten consecutive clean pull-request runs meet condition 2; a break at the sixth of twelve leaves a streak of six', () => {
    // streak.json lists each run's job for one context only; a real pull-request run lists all four, and a
    // completed run that lists none for a context is a break (Decision 6). So each context reads the runs that list it.
    const only = (name: string): RawInput => {
      const r = load('streak.json');
      const keep = r.runs.filter((x) => r.jobsByRun[x.id].some((j) => j.name === name));
      return { ...r, runs: keep };
    };
    const clean = ctx(only('harness-android-tokens'), 'harness-android-tokens');
    expect(clean.pullRequestRuns).toBe(12);
    expect(clean.streak).toBe(12);
    expect(clean.streakMet).toBe(true);
    const broken = ctx(only('harness-android-components'), 'harness-android-components');
    expect(broken.streak).toBe(6);
    expect(broken.streakMet).toBe(false);
  });
});

describe('condition 3: the cold runs', () => {
  it('Android: only a pull-request run that reached the comparator with cache: miss counts', () => {
    const c = ctx(load('mixed.json'), 'harness-android-tokens');
    // 902: miss + PASS (counts). 903: miss, no verdict (died before the comparator). 904: hit. 905: miss + FAIL verdict (reached the comparator, counts).
    expect(c.coldRuns.map((r) => r.runId)).toEqual([902, 905]);
    expect(c.runs.find((r) => r.runId === 903)?.coldCounts).toBe(false);
    expect(c.runs.find((r) => r.runId === 904)?.coldCounts).toBe(false);
    expect(c.coldMet).toBe(false);
  });
  it('a pull-request run without harness-verdict counts toward neither clause, though its cache annotation reads miss', () => {
    const c = ctx(load('mixed.json'), 'harness-android-tokens');
    const r903 = c.runs.find((r) => r.runId === 903);
    expect(r903?.last.cache).toBe('miss');
    expect(r903?.last.verdict).toBeNull();
    expect(r903?.coldCounts).toBe(false);
    expect(r903?.breaks).toEqual(['no harness-verdict annotation (failed before the comparator)']);
  });
  it('iOS: a pull-request run without harness-verdict is not among the first three counted runs', () => {
    const raw = load('mixed.json');
    const c = ctx(raw, 'harness-ios-components');
    expect(c.coldRuns.map((r) => r.runId)).toEqual([907]);
  });
  it('three cold Android runs, each under ten minutes, meet the clause', () => {
    const c = ctx(load('cold-met.json'), 'harness-android-tokens');
    expect(c.coldRuns.length).toBe(3);
    expect(c.coldMet).toBe(true);
  });
  it('one run over ten minutes leaves the clause unmet', () => {
    const c = ctx(load('cold-over-ceiling.json'), 'harness-android-tokens');
    expect(c.coldRuns.length).toBe(3);
    expect(c.coldRuns[1].last.durationSeconds).toBe(670);
    expect(c.coldMet).toBe(false);
  });
  it('iOS: the first three pull-request runs at the current Xcode pin count, a later one does not', () => {
    const raw = load('ios-queue.json');
    const c = ctx(raw, 'harness-ios-tokens');
    expect(c.coldRuns.map((r) => r.runId)).toEqual([801, 802, 803]);
    expect(c.coldMet).toBe(true);
  });
  it('iOS: a run at another Xcode pin does not count when a current pin is given', () => {
    const raw = load('ios-queue.json');
    raw.xcodePinBySha = { ['g1' + '0'.repeat(38)]: '26.5', ['g2' + '0'.repeat(38)]: '26.6', ['g3' + '0'.repeat(38)]: '26.6', ['g4' + '0'.repeat(38)]: '26.6' };
    const c = ctx(raw, 'harness-ios-tokens', { currentXcodePin: '26.6' });
    expect(c.coldRuns.map((r) => r.runId)).toEqual([802, 803, 804]);
  });
});

describe('condition 5: the iOS queue time', () => {
  it('starts at max(created_at, harness-generate.completed_at): created at the run start, generate finished later', () => {
    const r801 = normalize(load('ios-queue.json')).find((r) => r.runId === 801 && r.context === 'harness-ios-tokens');
    // generate completed at +300 s, the job was created at +10 s and started at +570 s
    expect(r801?.queueSeconds).toBe(270);
    expect(r801?.durationSeconds).toBe(340);
  });
  it('starts at created_at when the job was created after harness-generate finished', () => {
    const r802 = normalize(load('ios-queue.json')).find((r) => r.runId === 802 && r.context === 'harness-ios-tokens');
    // generate completed at +350 s, the job was created at +400 s and started at +460 s
    expect(r802?.queueSeconds).toBe(60);
    expect(r802?.durationSeconds).toBe(200);
  });
  it('queue time plus duration over ten minutes on a counted run makes the queue poor', () => {
    const c = ctx(load('ios-queue.json'), 'harness-ios-tokens');
    // run 801: 270 + 340 = 610 s > 600 s
    expect(c.overCeiling.map((r) => r.runId)).toEqual([801]);
    expect(c.queuePoor).toBe(true);
  });
  it('is not measurable with fewer than three counted runs', () => {
    expect(ctx(load('mixed.json'), 'harness-ios-components').queuePoor).toBeNull();
  });
  it('is null for an Android context', () => {
    expect(ctx(load('streak.json'), 'harness-android-tokens').queuePoor).toBeNull();
  });
});

describe('the rendered record', () => {
  const meta = { repo: 'owner/repo', workflow: 'native-harness.yml', generatedAt: '2026-11-07T12:00:00Z' };
  it('names the source endpoints and the Decision 6 fields, and says that dispatched runs count toward neither condition', () => {
    const text = render(analyze(normalize(load('recorded-dispatch-run.json'))), meta);
    for (const endpoint of ['actions/workflows/native-harness.yml/runs', 'actions/runs/<run id>/jobs?filter=all', 'commits/<head sha>/check-runs', 'check-runs/<job id>/annotations']) {
      expect(text).toContain(endpoint);
    }
    for (const field of ['run id', 'head SHA', 'attempt', 'conclusion', 'cache', 'created_at', 'started_at', 'completed_at', 'duration']) expect(text).toContain(field);
    expect(text).toContain('A dispatched run counts toward neither condition 2 nor condition 3');
    expect(text).toContain('no (dispatched)');
    expect(text).toContain('current streak 0 of 10 — not met');
    expect(text).not.toMatch(/\/Users\/|\/private\/tmp/);
  });
  it('shows a break and the cold count for a pull-request scenario', () => {
    const text = render(analyze(normalize(load('mixed.json'))), meta);
    expect(text).toContain('2 counted — not met');
    expect(text).toContain('no harness-verdict annotation (failed before the comparator)');
  });
});

describe('harness-infra runs (tasks.md Task 19; Decision 6 as amended by amendment 7)', () => {
  const AT = 'harness-android-tokens';
  const META = { repo: 'owner/repo', workflow: 'native-harness.yml', generatedAt: '2026-11-07T12:00:00Z' };

  it('reads <host> <status> <step> from the annotation', () => {
    expect(parseInfra('repo.maven.apache.org 403 resolve')).toEqual({ host: 'repo.maven.apache.org', status: '403', step: 'resolve' });
    expect(parseInfra('plugins.gradle.org timeout resolve')).toEqual({ host: 'plugins.gradle.org', status: 'timeout', step: 'resolve' });
    expect(parseInfra('two words')).toBeNull();
  });

  it('an infra run between two PASS runs at different heads leaves the count unbroken and uncounted', () => {
    const c = ctx(load('infra-between-passes.json'), AT);
    expect(c.infraRuns.map((r) => r.runId)).toEqual([1202]);
    expect(c.infraRuns[0].last.infra).toEqual({ host: 'repo.maven.apache.org', status: '403', step: 'resolve' });
    expect(c.runs.find((r) => r.runId === 1202)?.breaks).toEqual([]);
    expect(c.streak).toBe(2);
  });

  it('an infra run with cache: miss is counted toward no cold run', () => {
    const c = ctx(load('infra-cold-miss.json'), AT);
    expect(c.runs.find((r) => r.runId === 1301)?.last.cache).toBe('miss');
    expect(c.runs.find((r) => r.runId === 1301)?.infraRun).toBe(true);
    expect(c.coldRuns.map((r) => r.runId)).toEqual([1302]);
  });

  it('two consecutive infra runs at one head print the finding; a third at another head does not extend it', () => {
    const c = ctx(load('infra-two-at-one-head.json'), AT);
    expect(c.infraRuns.map((r) => r.runId)).toEqual([1401, 1402, 1403]);
    expect(c.infraRate).toBe(0.75);
    expect(c.findings).toEqual(['harness-android-tokens: 2 consecutive infra runs at head f00000000 (runs 1401, 1402): repo.maven.apache.org 403']);
    expect(c.streak).toBe(1);
    const text = render(analyze(normalize(load('infra-two-at-one-head.json'))), META);
    expect(text).toContain('**FINDING**: harness-android-tokens: 2 consecutive infra runs at head f00000000');
    expect(text).toContain('infra rate 75.0%');
    expect(text).toContain('no (infra)');
  });

  it('a single infra run prints no finding', () => {
    expect(ctx(load('infra-between-passes.json'), AT).findings).toEqual([]);
  });

  it('a run whose attempts end infra then PASS is a break', () => {
    const c = ctx(load('infra-then-pass-attempts.json'), AT);
    const r = c.runs.find((x) => x.runId === 1502);
    expect(r?.attemptConclusions).toEqual(['failure', 'success']);
    expect(r?.infraRun).toBe(false);
    expect(r?.breaks).toEqual(['attempts ended with different conclusions']);
    expect(c.streak).toBe(1);
  });

  it('an ordinary resolve failure (harness-verdict FAIL) is counted as a FAIL, not as infra', () => {
    const c = ctx(load('ordinary-resolve-fail.json'), AT);
    const r = c.runs.find((x) => x.runId === 1602);
    expect(r?.infraRun).toBe(false);
    expect(r?.last.verdict).toBe('FAIL');
    expect(r?.last.infra).toBeNull();
    expect(r?.breaks).toEqual([]);
    expect(c.infraRuns).toEqual([]);
    expect(c.streak).toBe(3);
    expect(c.coldRuns.map((x) => x.runId)).toEqual([1602]);
  });
});

describe('a partial re-run (run 42379456009, recorded): the verdict is read from the attempt whose job ran', () => {
  const raw = load('recorded-partial-rerun-42379456009.json');
  it.each(['harness-ios-tokens', 'harness-ios-components', 'harness-android-tokens'])('%s keeps attempt 1\'s PASS and is not a break', (name) => {
    const c = ctx(raw, name);
    expect(c.runs).toHaveLength(1);
    expect(c.runs[0].attempts).toBe(1);
    expect(c.runs[0].last.attempt).toBe(1);
    expect(c.runs[0].last.verdict).toBe('PASS');
    expect(c.runs[0].breaks).toEqual([]);
    expect(c.streak).toBe(1);
  });
  it('harness-android-components went FAIL then PASS: still a break by its differing attempts', () => {
    const c = ctx(raw, 'harness-android-components');
    expect(c.runs[0].attempts).toBe(2);
    expect(c.runs[0].attemptConclusions).toEqual(['failure', 'success']);
    expect(c.runs[0].last.verdict).toBe('PASS');
    expect(c.runs[0].breaks).toEqual(['attempts ended with different conclusions']);
    expect(c.streak).toBe(0);
  });
  it('carriedOver drops only a later attempt\'s copy of a job that did not re-run', () => {
    const jobs = raw.jobsByRun['42379456009'];
    const copies = jobs.filter((j) => j.run_attempt === 2);
    const dropped = copies.filter((j) => carriedOver(j, jobs)).map((j) => j.name).sort();
    expect(dropped).toEqual(['harness-android-tokens', 'harness-generate', 'harness-ios-components', 'harness-ios-tokens']);
    expect(copies.find((j) => j.name === 'harness-android-components' && carriedOver(j, jobs))).toBeUndefined();
  });
});

describe('a job that has not finished (tasks.md § "Decision 6", amendment 11; record 2026-11-07-stability-unfinished-job-read-as-measured)', () => {
  const IOS = 'harness-ios-tokens';
  const META = { repo: 'owner/repo', workflow: 'native-harness.yml', generatedAt: '2026-11-07T12:00:00Z' };
  type Mutable = {
    runs: (ApiRun & { run_attempt: number })[];
    jobsByRun: Record<number, ApiJob[]>;
    checkRunsBySha: Record<string, { id: number; name: string; conclusion: string | null }[]>;
    annotationsByJob: Record<number, { title: string | null; message: string }[]>;
    xcodePinBySha?: Record<string, string>;
  };
  const copy = (name: string): Mutable => JSON.parse(JSON.stringify(load(name))) as Mutable;
  const raw$ = (m: Mutable): RawInput => m as unknown as RawInput;
  const run$ = (m: Mutable, id: number) => m.runs.find((r) => r.id === id)!;
  /** Null a job's conclusion (job side, check-run side, or both). */
  const unfinishJob = (m: Mutable, jobId: number, sides: 'job' | 'check' | 'both' = 'both'): void => {
    for (const js of Object.values(m.jobsByRun)) for (const j of js) if (j.id === jobId && sides !== 'check') {
      j.conclusion = null;
      j.completed_at = null;
    }
    if (sides !== 'job') for (const crs of Object.values(m.checkRunsBySha)) for (const cr of crs) if (cr.id === jobId) cr.conclusion = null;
  };
  const section = (text: string, context: string): string => {
    const at = text.indexOf(`## ${context}`);
    const next = text.indexOf('\n## ', at + 1);
    return text.slice(at, next === -1 ? undefined : next);
  };
  const addJob = (m: Mutable, runId: number, id: number, name: string, conclusion: string | null, notes: { title: string; message: string }[]): void => {
    const r = run$(m, runId);
    m.jobsByRun[runId].push({ id, run_id: runId, run_attempt: r.run_attempt, name, head_sha: r.head_sha, conclusion, created_at: r.created_at, started_at: r.created_at, completed_at: conclusion === null ? null : r.created_at });
    m.checkRunsBySha[r.head_sha] = [...(m.checkRunsBySha[r.head_sha] ?? []), { id, name, conclusion }];
    m.annotationsByJob[id] = notes;
  };
  // ios-queue.json: runs 801..804, each lists harness-generate and harness-ios-tokens. Job 900041 is run 801's iOS job.

  it('1: a run-level unfinished iOS job (Kenya\'s mutation) reads conditions 3 and 5 not yet measurable, and names run 801', () => {
    const m = copy('ios-queue.json');
    run$(m, 801).status = 'in_progress';
    unfinishJob(m, 900041);
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === IOS)!;
    expect(c.skippedRuns.map((r) => r.runId)).toEqual([801]);
    expect(c.queuePoor).toBeNull();
    expect(c.coldMet).toBe(false);
    const text = section(render(analyzeRaw(raw$(m)), META), IOS);
    const c3 = text.split('\n').find((l) => l.startsWith('- **Condition 3**'))!;
    const c5 = text.split('\n').find((l) => l.startsWith('- **Condition 5**'))!;
    for (const l of [c3, c5]) {
      expect(l).toContain('not yet measurable');
      expect(l).toContain('801');
      expect(l).not.toContain('fewer than three');
    }
    expect(text).not.toContain('within the ceiling');
    expect(text).not.toContain('POOR');
  });
  it('1b: the run stays completed and only the job\'s conclusion is null: the same result', () => {
    const m = copy('ios-queue.json');
    unfinishJob(m, 900041, 'job');
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === IOS)!;
    expect(run$(m, 801).status).toBe('completed');
    expect(c.skippedRuns.map((r) => r.runId)).toEqual([801]);
    expect(c.queuePoor).toBeNull();
    expect(c.coldBlock).toContain('801');
  });
  it('2 (control): with run 804 unfinished, the cold runs are 801 to 803 and condition 5 is POOR', () => {
    const m = copy('ios-queue.json');
    unfinishJob(m, 900047);
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === IOS)!;
    expect(c.skippedRuns.map((r) => r.runId)).toEqual([804]);
    expect(c.coldRuns.map((r) => r.runId)).toEqual([801, 802, 803]);
    expect(c.coldBlock).toBeNull();
    expect(c.queuePoor).toBe(true);
  });
  it('3: an Android job that finished carrying harness-infra, in a run whose iOS job is queued, is on the infra list and in the rate', () => {
    const m = copy('ios-queue.json');
    run$(m, 801).status = 'in_progress';
    unfinishJob(m, 900041);
    addJob(m, 801, 990001, 'harness-android-tokens', 'failure', [{ title: 'harness-infra', message: 'repo.maven.apache.org 403 resolve' }]);
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === 'harness-android-tokens')!;
    expect(c.infraRuns.map((r) => r.runId)).toEqual([801]);
    expect(c.infraRate).toBeGreaterThan(0);
    expect(c.skippedRuns.map((r) => r.runId)).not.toContain(801);
  });
  it('4: a finished Android job that breaks the streak, in a run whose iOS job is queued, is a break for condition 2', () => {
    const m = copy('ios-queue.json');
    run$(m, 801).status = 'in_progress';
    unfinishJob(m, 900041);
    addJob(m, 801, 990002, 'harness-android-tokens', 'failure', []);
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === 'harness-android-tokens')!;
    expect(c.runs.find((r) => r.runId === 801)?.breaks).toEqual(['no harness-verdict annotation (failed before the comparator)']);
  });
  describe('5: an unfinished pull-request job older than the newest finished pull-request run', () => {
    const AT = 'harness-android-tokens';
    it('leaves condition 2 not yet measurable, names the run, and the streak is not met', () => {
      const m = copy('break-no-verdict.json');
      unfinishJob(m, m.jobsByRun[302].find((j) => j.name === AT)!.id);
      const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === AT)!;
      expect(c.skippedRuns.map((r) => r.runId)).toEqual([302]);
      expect(c.streakBlock).toContain('302');
      expect(c.streakMet).toBe(false);
      expect(section(render(analyzeRaw(raw$(m)), META), AT)).toMatch(/Condition 2\*\*.*not yet measurable \(.*302/);
    });
    it('control: an unfinished job after a clean streak leaves the streak where it was', () => {
      const m = copy('break-no-verdict.json');
      unfinishJob(m, m.jobsByRun[303].find((j) => j.name === AT)!.id);
      const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === AT)!;
      expect(c.skippedRuns.map((r) => r.runId)).toEqual([303]);
      expect(c.streakBlock).toBeNull();
      expect(c.streak).toBe(0); // 302 still breaks
    });
    it('control: an unfinished dispatched job in the same position blocks nothing and is listed', () => {
      const m = copy('break-no-verdict.json');
      run$(m, 302).event = 'workflow_dispatch';
      unfinishJob(m, m.jobsByRun[302].find((j) => j.name === AT)!.id);
      const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === AT)!;
      expect(c.skippedRuns.map((r) => [r.runId, r.event])).toEqual([[302, 'workflow_dispatch']]);
      expect(c.streakBlock).toBeNull();
    });
  });
  it('6: the skipped table gives the Xcode pin; an unknown pin blocks like the current pin, another known pin does not', () => {
    const m = copy('ios-queue.json');
    m.xcodePinBySha = { ['g2' + '0'.repeat(38)]: '26.6', ['g3' + '0'.repeat(38)]: '26.6', ['g4' + '0'.repeat(38)]: '26.6', ['g1' + '0'.repeat(38)]: '26.5' };
    unfinishJob(m, 900041);
    const other = analyzeRaw(raw$(m), { currentXcodePin: '26.6' }).contexts.find((x) => x.context === IOS)!;
    expect(other.skippedRuns[0].xcodePin).toBe('26.5');
    expect(other.coldBlock).toBeNull();
    delete m.xcodePinBySha['g1' + '0'.repeat(38)];
    const unknown = analyzeRaw(raw$(m), { currentXcodePin: '26.6' }).contexts.find((x) => x.context === IOS)!;
    expect(unknown.skippedRuns[0].xcodePin).toBe('unknown');
    expect(unknown.coldBlock).toContain('801');
    expect(unknown.queuePoor).toBeNull();
    expect(render(analyzeRaw(raw$(m), { currentXcodePin: '26.6' }), META)).toMatch(/\| 801 \| `g10000000` \| pull_request \| completed \| 1 \| the job has no conclusion[^|]*\| unknown \|/);
  });
  it('7: a run still in harness-generate lists no job for any context: every context lists 801 as no job listed', () => {
    const m = copy('ios-queue.json');
    run$(m, 801).status = 'in_progress';
    m.jobsByRun[801] = m.jobsByRun[801].filter((j) => j.name === 'harness-generate');
    const a = analyzeRaw(raw$(m));
    for (const c of a.contexts) expect(c.skippedRuns.map((r) => [r.runId, r.noJobListed])).toContainEqual([801, true]);
    const ios = a.contexts.find((x) => x.context === IOS)!;
    expect(ios.queuePoor).toBeNull();
    expect(ios.coldBlock).toContain('801');
    expect(render(a, META)).toContain('no job listed');
  });
  it('8: a pending re-run: only attempt 1\'s job is listed for a run at attempt 2; the context reads unfinished and attempt 1 is not read', () => {
    const m = copy('ios-queue.json');
    run$(m, 802).run_attempt = 2;
    run$(m, 802).status = 'in_progress';
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === IOS)!;
    expect(c.skippedRuns.map((r) => r.runId)).toEqual([802]);
    expect(c.skippedRuns[0].why).toContain('earlier attempt');
    expect(c.runs.map((r) => r.runId)).not.toContain(802);
    expect(c.coldBlock).toContain('802');
  });
  it('9: a completed run that lists no job for a context is a break for condition 2, and the record lists it', () => {
    const m = copy('ios-queue.json');
    m.jobsByRun[802] = m.jobsByRun[802].filter((j) => j.name !== IOS);
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === IOS)!;
    expect(c.runs.find((r) => r.runId === 802)?.breaks).toEqual(["ended with no job (the completed run's latest attempt lists none)"]);
    expect(c.streak).toBe(2); // 803, 804 after the break
    expect(section(render(analyzeRaw(raw$(m)), META), IOS)).toContain('ended with no job');
  });
  it('9b: a completed run whose latest attempt lists none while attempt 1 does reads as ended with no job', () => {
    const m = copy('ios-queue.json');
    run$(m, 802).run_attempt = 2;
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === IOS)!;
    const r = c.runs.find((x) => x.runId === 802)!;
    expect(r.breaks).toEqual(["ended with no job (the completed run's latest attempt lists none)"]);
    expect(r.last.verdict).toBeNull();
  });
  it('10: a run with no status and no job for the context reads unfinished; with its job finished it reads finished', () => {
    const m = copy('ios-queue.json');
    delete (run$(m, 801) as { status?: string }).status;
    delete (run$(m, 802) as { status?: string }).status;
    m.jobsByRun[801] = m.jobsByRun[801].filter((j) => j.name !== IOS);
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === IOS)!;
    expect(c.skippedRuns.map((r) => r.runId)).toEqual([801]);
    expect(c.runs.map((r) => r.runId)).toContain(802);
  });
  it('11: a job with a conclusion whose check run has none reads unfinished', () => {
    const m = copy('ios-queue.json');
    unfinishJob(m, 900041, 'check');
    const c = analyzeRaw(raw$(m)).contexts.find((x) => x.context === IOS)!;
    expect(c.skippedRuns.map((r) => r.runId)).toEqual([801]);
  });
  it('11b: both conclusions present and different: the check run\'s is read and the record prints both', () => {
    const m = copy('ios-queue.json');
    for (const crs of Object.values(m.checkRunsBySha)) for (const cr of crs) if (cr.id === 900041) cr.conclusion = 'failure';
    const a = analyzeRaw(raw$(m));
    expect(a.contexts.find((x) => x.context === IOS)!.runs.find((r) => r.runId === 801)?.last.conclusion).toBe('failure');
    expect(render(a, META)).toContain('failure (check run; job success)');
  });

  describe('the window (Stacy N-1)', () => {
    const SHA = (n: number): string => `p${String(n).padStart(3, '0')}`.padEnd(40, '0');
    /** 113 pull-request runs, ids 1..113, each with harness-generate and harness-ios-tokens (PASS), served newest first, 100 per page. */
    const stub = (opts: { failPage2?: boolean; total?: number } = {}) => {
      const runs = Array.from({ length: 113 }, (_, i) => 113 - i).map((id) => ({ id, head_sha: SHA(id), event: 'pull_request', run_attempt: 1, conclusion: 'success', status: 'completed', created_at: `2026-11-07T10:${String(id % 60).padStart(2, '0')}:00Z` }));
      const calls: string[] = [];
      const get = async (path: string): Promise<unknown> => {
        calls.push(path);
        const page = Number(/[?&]page=(\d+)/.exec(path)![1]);
        const per = Number(/[?&]per_page=(\d+)/.exec(path)![1]);
        if (/workflows\/.*\/runs/.test(path)) {
          if (opts.failPage2 && page === 2) throw new Error('GET runs page 2: 502 Bad Gateway');
          return { total_count: opts.total ?? 113, workflow_runs: runs.slice((page - 1) * per, page * per) };
        }
        const jobs = /actions\/runs\/(\d+)\/jobs/.exec(path);
        if (jobs) {
          const id = Number(jobs[1]);
          const mk = (jid: number, name: string) => ({ id: jid, run_id: id, run_attempt: 1, name, head_sha: SHA(id), conclusion: 'success', created_at: '2026-11-07T10:00:00Z', started_at: '2026-11-07T10:00:30Z', completed_at: '2026-11-07T10:03:00Z' });
          return { total_count: 2, jobs: [mk(id * 10, 'harness-generate'), mk(id * 10 + 1, IOS)] };
        }
        if (/check-runs\?/.test(path) && !/annotations/.test(path)) {
          const sha = /commits\/(\w+)\/check-runs/.exec(path)![1];
          const id = Number(sha.slice(1, 4));
          return { total_count: 1, check_runs: [{ id: id * 10 + 1, name: IOS, conclusion: 'success' }] };
        }
        const jid = Number(/check-runs\/(\d+)\/annotations/.exec(path)![1]);
        return jid % 10 === 1 ? [{ title: 'harness-verdict', message: 'harness-verdict: harness-ios-tokens PASS' }] : [];
      };
      return { get, calls };
    };
    it('12: a window of 113 runs at 100 per page is read in full; the three oldest runs stay the counted cold runs', async () => {
      const { get, calls } = stub();
      const r = await fetchRaw('o/r', 'native-harness.yml', 'tok', undefined, get);
      expect(r.runs).toHaveLength(113);
      expect(calls.filter((p) => /workflows\/.*\/runs/.test(p))).toHaveLength(2);
      const a = analyzeRaw(r);
      expect(a.window).toEqual({ totalCount: 113, runsRead: 113, shortfall: null });
      expect(a.contexts.find((x) => x.context === IOS)!.coldRuns.map((x) => x.runId)).toEqual([1, 2, 3]);
      expect(render(a, META)).toContain('`total_count` 113; 113 runs read — read in full');
    });
    it('13: a page that fails makes every condition of every context not yet measurable and names the shortfall', async () => {
      const r = await fetchRaw('o/r', 'native-harness.yml', 'tok', undefined, stub({ failPage2: true }).get);
      const a = analyzeRaw(r);
      expect(a.window?.shortfall).toContain('runs page 2 failed');
      for (const c of a.contexts) {
        expect(c.streakBlock).toContain('short');
        expect(c.coldBlock).toContain('short');
        expect(c.streakMet).toBe(false);
        expect(c.coldMet).toBe(false);
        expect(c.queuePoor).toBeNull();
      }
      expect(render(a, META)).toContain('SHORT READ');
    });
    it('13b: pages that hold fewer runs than total_count read as a short window too', async () => {
      const r = await fetchRaw('o/r', 'native-harness.yml', 'tok', undefined, async (path) => {
        const body = (await stub().get(path)) as { total_count?: number };
        return /workflows\/.*\/runs/.test(path) ? { ...body, total_count: 150 } : body;
      });
      expect(analyzeRaw(r).window?.shortfall).toBe('read 113 of 150 runs');
    });
    it('13c: a branch filter is a short window', async () => {
      const r = await fetchRaw('o/r', 'native-harness.yml', 'tok', 'main', stub().get);
      expect(analyzeRaw(r).window?.shortfall).toContain('branch filter');
    });
    it('13d: a per-run list that fails leaves that run\'s jobs unfinished', async () => {
      const { get } = stub();
      const r = await fetchRaw('o/r', 'native-harness.yml', 'tok', undefined, async (path) => {
        if (/actions\/runs\/50\/jobs/.test(path)) throw new Error('boom');
        return get(path);
      });
      const c = analyzeRaw(r).contexts.find((x) => x.context === IOS)!;
      expect(c.skippedRuns.map((x) => x.runId)).toEqual([50]);
    });
  });
});

describe('consult findings (Kenya D1/D2, Data default-name), fail-safe reads', () => {
  const IOS = 'harness-ios-tokens';
  const META = { repo: 'owner/repo', workflow: 'native-harness.yml', generatedAt: '2026-11-07T12:00:00Z' };
  const G = (n: number): string => `g${n}` + '0'.repeat(38);
  it('D1: a finished iOS run with an unknown pin, with a pin given, blocks conditions 3 and 5; a known other pin does not', () => {
    const raw = JSON.parse(JSON.stringify(load('ios-queue.json'))) as RawInput & { xcodePinBySha: Record<string, string> };
    raw.xcodePinBySha = { [G(2)]: '26.6', [G(3)]: '26.6', [G(4)]: '26.6' }; // run 801's SHA is unknown
    const c = ctx(raw, IOS, { currentXcodePin: '26.6' });
    expect(c.coldBlock).toContain('801');
    expect(c.coldMet).toBe(false);
    expect(c.queuePoor).toBeNull();
    raw.xcodePinBySha[G(1)] = '26.5';
    const known = ctx(raw, IOS, { currentXcodePin: '26.6' });
    expect(known.coldBlock).toBeNull();
    expect(known.coldRuns.map((r) => r.runId)).toEqual([802, 803, 804]);
  });
  it('D2: the record prints the pin used, or says every pin counts', () => {
    const raw = load('ios-queue.json');
    expect(render(analyze(normalize(raw), { currentXcodePin: '26.6' }), META)).toContain('**Xcode pin used for iOS condition 3**: 26.6.');
    expect(render(analyze(normalize(raw)), META)).toContain('none given, so every pin counts');
  });
  it('default-name: a PASS verdict on a job that concluded failure is neither clean nor cold; conditions 2 and 3 read not yet measurable', () => {
    const raw = JSON.parse(JSON.stringify(load('cold-met.json'))) as RawInput;
    const before = ctx(raw, 'harness-android-tokens');
    expect(before.coldMet).toBe(true);
    const victim = before.coldRuns[0].last;
    for (const crs of Object.values(raw.checkRunsBySha)) for (const cr of crs) if (cr.id === jobIdOf(raw, victim.runId)) (cr as { conclusion: string }).conclusion = 'failure';
    const c = ctx(raw, 'harness-android-tokens');
    expect(c.coldBlock).toContain(String(victim.runId));
    expect(c.coldBlock).toContain('PASS verdict');
    expect(c.streakBlock).toContain(String(victim.runId));
    expect(c.coldMet).toBe(false);
    expect(c.streakMet).toBe(false);
  });
});

function jobIdOf(raw: RawInput, runId: number): number {
  return raw.jobsByRun[runId].find((j) => j.name === 'harness-android-tokens')!.id;
}

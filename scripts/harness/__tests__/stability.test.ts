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
import { RawInput, analyze, contextOf, normalize, parseVerdict, render } from '../stability';

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
    const raw = load('streak.json');
    const clean = ctx(raw, 'harness-android-tokens');
    expect(clean.pullRequestRuns).toBe(12);
    expect(clean.streak).toBe(12);
    expect(clean.streakMet).toBe(true);
    const broken = ctx(raw, 'harness-android-components');
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

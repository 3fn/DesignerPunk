/**
 * The native-harness workflow's structure test (Spec 129 Task 19.2; tasks.md Task 19; design.md § 3,
 * "Verdicts name their side"). Owner: Thurgood.
 *
 * It parses `.github/workflows/native-harness.yml` and asserts, on the two Android jobs, that only a
 * resolved build saves the Gradle cache and that an environment fault is annotated `harness-infra`
 * from `harness-out/infra.json`, never beside a `harness-verdict`; on all four contexts, that the
 * `harness-verdict` step reads only `harness-out/compare.txt`; and, kept true from Task 5, that no
 * `if:` other than the forced-failure step reads the event or the dispatch inputs. The annotation
 * steps' shell is also run, in a temporary folder, so the exclusivity is observed and not only read.
 *
 * Recorded red once against the workflow at this unit's base (`c73f41ede`) in
 * `completion/task-19-completion.md`; green against the edited workflow.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface Step {
  name?: string;
  if?: string;
  run?: string;
  uses?: string;
}
interface Job {
  name?: string;
  if?: string;
  steps: Step[];
}

const WORKFLOW = path.resolve(__dirname, '../../../.github/workflows/native-harness.yml');
const doc = yaml.load(fs.readFileSync(WORKFLOW, 'utf8')) as { jobs: Record<string, Job> };

const ANDROID = ['harness-android-tokens', 'harness-android-components'] as const;
const CONTEXTS = ['harness-ios-tokens', 'harness-ios-components', ...ANDROID] as const;

const stepNamed = (job: string, name: string): Step => {
  const s = doc.jobs[job].steps.find((x) => x.name === name);
  if (!s) throw new Error(`${job} has no step "${name}"`);
  return s;
};
const normalize = (s: string): string => s.replace(/\s+/g, ' ').trim();

describe.each(ANDROID)('%s: only a resolved build saves the cache', (job) => {
  it('saves when harness-out/resolved.ok exists, not when gradle.txt does', () => {
    const cond = normalize(stepNamed(job, 'Save the Gradle cache').if ?? '');
    expect(cond).toContain("hashFiles('harness-out/resolved.ok') != ''");
    expect(cond).not.toContain('gradle.txt');
    expect(cond).toContain("steps.gradle-cache.outputs.cache-hit != 'true'");
    expect(cond).toContain('always()');
  });

  it('writes ::notice title=harness-infra from harness-out/infra.json when harness-out/compare.txt does not exist', () => {
    const run = stepNamed(job, 'Verdict annotation').run ?? '';
    expect(run).toContain('title=harness-infra');
    expect(run).toContain('harness-out/infra.json');
    // the infra branch is an else of the compare.txt test, so the two notices cannot both be written
    const verdictAt = run.indexOf('title=harness-verdict');
    const elseAt = run.search(/\n\s*(elif|else)\b/);
    const infraAt = run.indexOf('title=harness-infra');
    expect(verdictAt).toBeGreaterThan(-1);
    expect(elseAt).toBeGreaterThan(verdictAt);
    expect(infraAt).toBeGreaterThan(elseAt);
  });

  describe('the annotation step, run for real', () => {
    const run = (files: Record<string, string>): string => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-annot-'));
      try {
        fs.mkdirSync(path.join(dir, 'harness-out'));
        for (const [name, text] of Object.entries(files)) {
          fs.mkdirSync(path.dirname(path.join(dir, 'harness-out', name)), { recursive: true });
          fs.writeFileSync(path.join(dir, 'harness-out', name), text);
        }
        return execFileSync('bash', ['-e', '-c', stepNamed(job, 'Verdict annotation').run ?? ''], { cwd: dir, encoding: 'utf8' });
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    };
    const INFRA = JSON.stringify({ host: 'repo.maven.apache.org', status: 403, step: 'resolve' });
    const COMPARE = `FAIL check: x\nharness-summary: ${job}\nharness-verdict: ${job} PASS\n`;

    it('writes only the verdict when the comparator ran', () => {
      expect(run({ 'compare.txt': COMPARE })).toBe(`::notice title=harness-verdict::harness-verdict: ${job} PASS\n`);
    });
    it('writes only the infra notice, with host, status and step, when there is infra.json and no compare.txt', () => {
      expect(run({ 'infra.json': INFRA })).toBe('::notice title=harness-infra::repo.maven.apache.org 403 resolve\n');
    });
    it('also reads the self-test folder\'s infra.json (the lane --selftest default), when it is the only one', () => {
      expect(run({ 'selftest/infra.json': INFRA })).toBe('::notice title=harness-infra::repo.maven.apache.org 403 resolve\n');
    });
    it('writes only the verdict when both files exist', () => {
      const out = run({ 'compare.txt': COMPARE, 'infra.json': INFRA });
      expect(out).toContain('title=harness-verdict');
      expect(out).not.toContain('title=harness-infra');
    });
    it('writes nothing when neither exists (a job that died before either)', () => {
      expect(run({})).toBe('');
    });
  });
});

describe.each(CONTEXTS)('%s: a verdict is written only when the comparator ran', (job) => {
  it('the harness-verdict step reads only harness-out/compare.txt', () => {
    const steps = doc.jobs[job].steps.filter((s) => (s.run ?? '').includes('title=harness-verdict'));
    expect(steps.length).toBe(1);
    // the verdict branch is everything before any elif/else (the Android steps add an infra branch after it)
    const run = steps[0].run ?? '';
    const cut = run.search(/\n\s*(elif|else)\b/);
    const verdictBranch = cut === -1 ? run : run.slice(0, cut);
    expect(verdictBranch).toContain('title=harness-verdict');
    const files = new Set(verdictBranch.match(/harness-out\/[\w.-]+/g));
    expect([...files]).toEqual(['harness-out/compare.txt']);
  });
});

describe('the event and the inputs', () => {
  const FORBIDDEN = /github\.event_name|github\.event\.|github\.head_ref|github\.base_ref|github\.ref_name|github\.ref\b|inputs\./;
  it('no if: other than the forced-failure step reads the event, the refs or the dispatch inputs', () => {
    const offenders: string[] = [];
    for (const [id, job] of Object.entries(doc.jobs)) {
      if (job.if && FORBIDDEN.test(job.if)) offenders.push(`${id} (job)`);
      for (const s of job.steps) {
        if (s.if && FORBIDDEN.test(s.if) && !(s.name ?? '').startsWith('Forced failure')) offenders.push(`${id}: ${s.name}`);
      }
    }
    expect(offenders).toEqual([]);
  });
  it('the forced-failure step is the one that reads inputs.', () => {
    const readers = Object.entries(doc.jobs).flatMap(([id, job]) => job.steps.filter((s) => /inputs\./.test(s.if ?? '')).map((s) => `${id}: ${s.name}`));
    expect(readers).toEqual(['harness-generate: Forced failure (dispatch input force_generate_failure)']);
  });
});

describe('harness-android-tokens: the default-name step (Task 20, U7a)', () => {
  const NAME = 'Default-name compile (harness/android/lane.ts --default-name)';
  const steps = doc.jobs['harness-android-tokens'].steps as Array<Step & { 'continue-on-error'?: unknown }>;
  const names = steps.map((s) => s.name);
  const step = steps.find((s) => s.name === NAME)!;
  const run = step?.run ?? '';

  it('is exactly one step running --default-name, and no other job runs the option', () => {
    expect(steps.filter((s) => (s.run ?? '').includes('--default-name')).length).toBe(1);
    expect(step).toBeDefined();
    for (const [id, job] of Object.entries(doc.jobs)) {
      if (id === 'harness-android-tokens') continue;
      expect(job.steps.some((s) => (s.run ?? '').includes('--default-name'))).toBe(false);
    }
  });
  it('sits directly before "Upload the lane output", after "Save the Gradle cache"', () => {
    const at = names.indexOf(NAME);
    expect(names[at - 1]).toBe('Save the Gradle cache');
    expect(names[at + 1]).toMatch(/^Upload the lane output/);
  });
  it('has no if: key and no continue-on-error key', () => {
    expect(Object.keys(step)).not.toContain('if');
    expect(Object.keys(step)).not.toContain('continue-on-error');
  });
  it('runs the fixed command', () => {
    expect(run).toContain('npx tsx harness/android/lane.ts --default-name --consumer "${RUNNER_TEMP}/harness-consumer" --work "${GITHUB_WORKSPACE}/harness-out/default-name"');
  });
  it('annotates notice on a pass, error on a fail, and error when no line was printed', () => {
    expect(run).toContain('::notice title=default-name::$line');
    expect(run).toContain('::error title=default-name::$line');
    expect(run).toContain('::error title=default-name::no default-name line');
  });
  it('writes no path that an existing step reads', () => {
    const work = /--work "\$\{GITHUB_WORKSPACE\}\/(harness-out\/[\w-]+)"/.exec(run)?.[1];
    expect(work).toBe('harness-out/default-name');
    for (const p of ['harness-out/compare.txt', 'harness-out/infra.json', 'harness-out/selftest/infra.json', 'harness-out/resolved.ok', 'harness-out/run-harness-android-tokens.json']) {
      expect(p.startsWith(`${work}/`)).toBe(false);
      expect(run).not.toContain(p);
    }
  });
  it('leaves the other contexts and the existing android-tokens steps in place', () => {
    expect(Object.keys(doc.jobs).sort()).toEqual(['harness-android-components', 'harness-android-tokens', 'harness-generate', 'harness-ios-components', 'harness-ios-tokens']);
    for (const n of ['Lane (harness/android/lane.ts)', 'Comparator (scripts/harness/compare.ts)', 'Verdict annotation', 'Save the Gradle cache']) {
      expect(names).toContain(n);
    }
  });
});

describe('harness-generate: the d2-check step (Task 13.6, U8; grant .kiro/issues/2026-11-07-d2-check-step-grant.md)', () => {
  const NAME = 'D2 check (scripts/harness/d2-check.ts)';
  const COMMAND = 'npx tsx scripts/harness/d2-check.ts --consumer "${RUNNER_TEMP}/harness-consumer"';
  const steps = doc.jobs['harness-generate'].steps as Array<Step & { 'continue-on-error'?: unknown; 'working-directory'?: unknown }>;
  const names = steps.map((s) => s.name);
  const step = steps.find((s) => s.name === NAME)!;
  const run = step?.run ?? '';

  it('is exactly one step running d2-check.ts, in harness-generate only', () => {
    expect(step).toBeDefined();
    expect(steps.filter((s) => (s.run ?? '').includes('d2-check.ts')).length).toBe(1);
    for (const [id, job] of Object.entries(doc.jobs)) {
      if (id === 'harness-generate') continue;
      expect(job.steps.some((s) => (s.run ?? '').includes('d2-check'))).toBe(false);
    }
  });
  it('is the job\'s last step, directly after "Upload the consumer root"', () => {
    expect(names[names.length - 1]).toBe(NAME);
    expect(names[names.length - 2]).toBe('Upload the consumer root');
  });
  it('has no working-directory, if or continue-on-error key', () => {
    for (const k of ['working-directory', 'if', 'continue-on-error']) expect(Object.keys(step)).not.toContain(k);
  });
  it('runs the record\'s command line exactly, with no platform argument', () => {
    expect(run).toContain(COMMAND);
    expect(run.split('d2-check.ts').length - 1).toBe(1);
    expect(run).not.toMatch(/d2-check\.ts[^\n]*--(ios|android|platform)/);
  });
  it('annotates notice on PASS, error on FAIL and on the setup line, and error when no line was printed', () => {
    expect(run).toContain('::notice title=d2-check::$line');
    expect(run).toContain('::error title=d2-check::$line');
    expect(run).toContain('::error title=d2-check::no d2-check line');
    expect(run).toContain('for k in completeness ios android');
    expect(run).toContain('"^d2-check $k: "');
    expect(run).toContain('d2-check: FAIL setup (');
  });
  it('writes an exit-code annotation on every run, notice when the step passes and error when it fails', () => {
    expect(run).toMatch(/::notice title=d2-check::exit=/);
    expect(run).toMatch(/::error title=d2-check::exit=/);
  });

  describe('the step\'s shell, run for real against a stub script', () => {
    const exec = (stdout: string, exitCode: number): { out: string; status: number } => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'harness-d2-'));
      try {
        fs.mkdirSync(path.join(dir, 'bin'));
        fs.writeFileSync(path.join(dir, 'bin', 'npx'), `#!/bin/bash\ncat <<'EOT'\n${stdout}EOT\nexit ${exitCode}\n`, { mode: 0o755 });
        const r = require('child_process').spawnSync('bash', ['-e', '-c', run], {
          cwd: dir,
          encoding: 'utf8',
          env: { ...process.env, PATH: `${dir}/bin:${process.env.PATH}`, RUNNER_TEMP: dir },
        });
        return { out: r.stdout as string, status: r.status as number };
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    };
    const P = (k: string): string => `d2-check ${k}: PASS count=3 x\n`;
    const ALL = P('completeness') + P('ios') + P('android');

    it('three PASS lines and exit 0: three notices, a notice exit annotation, step passes', () => {
      const r = exec(ALL, 0);
      expect(r.status).toBe(0);
      expect(r.out.match(/::notice title=d2-check::d2-check /g)?.length).toBe(3);
      expect(r.out).toContain('::notice title=d2-check::exit=0 lines=3/3');
      expect(r.out).not.toContain('::error');
    });
    it('a FAIL line (exit 1): error on that line, the others still notices, step fails', () => {
      const r = exec(P('completeness') + 'd2-check ios: FAIL count=0 x\n' + P('android'), 1);
      expect(r.status).not.toBe(0);
      expect(r.out).toContain('::error title=d2-check::d2-check ios: FAIL count=0 x');
      expect(r.out).toContain('::error title=d2-check::exit=1 lines=3/3');
    });
    it('the setup line (exit 2): an error on it, step fails', () => {
      const r = exec('d2-check: FAIL setup (index missing)\n', 2);
      expect(r.status).not.toBe(0);
      expect(r.out).toContain('::error title=d2-check::d2-check: FAIL setup (index missing)');
      expect(r.out).toContain('::error title=d2-check::exit=2 lines=0/3');
    });
    it('no line at all: "no d2-check line" error, step fails', () => {
      const r = exec('', 0);
      expect(r.status).not.toBe(0);
      expect(r.out).toContain('::error title=d2-check::no d2-check line');
      expect(r.out).toContain('::error title=d2-check::exit=0 lines=0/3');
    });
    it('three PASS lines but exit 1: the step fails (the exit code counts)', () => {
      const r = exec(ALL, 1);
      expect(r.status).not.toBe(0);
      expect(r.out).toContain('::error title=d2-check::exit=1 lines=3/3');
    });
    it('exit 0 with a verdict line missing: the step fails', () => {
      const r = exec(P('completeness') + P('ios'), 0);
      expect(r.status).not.toBe(0);
      expect(r.out).toContain('::error title=d2-check::exit=0 lines=2/3');
    });
  });
});

describe('the workflow file against the d2-check grant (numstat)', () => {
  it('keeps every existing job and the four compile contexts\' "Require harness-generate" steps', () => {
    expect(Object.keys(doc.jobs).sort()).toEqual(['harness-android-components', 'harness-android-tokens', 'harness-generate', 'harness-ios-components', 'harness-ios-tokens']);
    for (const c of CONTEXTS) {
      expect(doc.jobs[c].steps[0].name).toBe('Require harness-generate');
      expect(doc.jobs[c].steps[0].run).toContain('"$GENERATE_RESULT" != "success"');
    }
  });
});

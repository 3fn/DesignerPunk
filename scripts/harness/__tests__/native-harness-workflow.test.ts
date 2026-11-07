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
        for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(dir, 'harness-out', name), text);
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

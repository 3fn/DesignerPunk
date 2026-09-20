/**
 * fixtures.test.ts — the falsification-fixture suite (Spec 127, design C7/DD4;
 * Req 6.5). Every fixture under __fixtures__/ encodes one of Stacy's fixture
 * specifications 1:1 (provenance in each expected.json); this suite asserts
 * every fixture produces its REQUIRED verdict — the checker "goes red on her
 * fixtures" as a STANDING test, never a one-time demonstration.
 *
 * The coverage floor (B-8): expected-classes.json enumerates the classes the
 * set MUST cover, and this suite fails when any class has zero fixtures — an
 * empty or thin set is red BY CONSTRUCTION (the mechanical form of "neither
 * agent may waive it"). The floor's own red-at-zero behavior is asserted by a
 * standing test below (Stacy A-5).
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseTasksMd, Parent } from '../tasks-md';
import {
  parseCompletionDoc,
  completionDocPattern,
  CompletionDoc,
} from '../completion-doc';
import {
  evaluateSpec,
  evaluateAmendment,
  resolveMode,
  parseRatificationRecord,
  uncoveredClasses,
  Finding,
  Emission,
} from '../verdict';
import { isMaterialAmendment } from '../materiality';

const FIXTURES = path.join(__dirname, '..', '__fixtures__');
const PROJECT_ROOT = path.join(__dirname, '..', '..', '..');

interface Expected {
  case: string;
  class: string;
  provenance: string;
  kind: 'parity' | 'amendment' | 'ratification';
  ratifiedAt: string;
  authoredAt?: string;
  ballotPath?: string;
  ratifiedMachine?: string;
  mode?: string;
  material?: boolean;
  verdicts: string[];
  messages?: string[];
  messageContains?: string[];
  messageNotContains?: string[];
  emissions: string[];
  emissionContains?: string[];
  mismatch?: { missing: string[]; extra: string[] };
  avMismatch?: { missing: string[]; extra: string[] };
  sourceFiles?: string[];
  parentsEvaluated?: string[];
  exit: 'red' | 'green';
}

interface RunResult {
  findings: Finding[];
  emissions: Emission[];
  sourceFiles: string[];
  parentsEvaluated: string[];
  material?: boolean;
  mode?: string;
  ratifiedMachine?: string;
}

/** Parity evaluation over one fixture directory (flat filenames — the SAME
 *  B-4 pattern the CLI's locator uses, applied to the fixture dir). */
function runParity(dir: string, exp: Expected): RunResult {
  const tasksText = fs.readFileSync(path.join(dir, 'tasks.md'), 'utf8');
  const tasks = parseTasksMd(tasksText, exp.case);
  const mode = resolveMode(tasks.declaredMode, exp.authoredAt, exp.ratifiedAt);
  const files = fs.readdirSync(dir);
  const locate = (p: Parent): CompletionDoc | undefined => {
    if (p.number === undefined) return undefined;
    const re = completionDocPattern(p.number);
    const matches = files.filter((f) => re.test(f)).sort();
    if (matches.length === 0) return undefined;
    const parsed = matches.map((f) =>
      parseCompletionDoc(fs.readFileSync(path.join(dir, f), 'utf8'), f)
    );
    return parsed.length === 1
      ? parsed[0]
      : { ...parsed[0], sourceFiles: parsed.flatMap((d) => d.sourceFiles) };
  };
  const r = evaluateSpec(tasks, mode as never, locate);
  return {
    findings: [...r.findings, ...r.parents.flatMap((p) => p.findings)],
    emissions: r.parents.flatMap((p) => p.emissions),
    sourceFiles: [], // filled below for the cases that assert it
    parentsEvaluated: r.parents.map((p) => p.parent),
    mode,
  };
}

function runFixture(dir: string, exp: Expected): RunResult {
  if (exp.kind === 'amendment') {
    const basePath = path.join(dir, 'tasks.base.md');
    const baseText = fs.existsSync(basePath)
      ? fs.readFileSync(basePath, 'utf8')
      : undefined;
    const headText = fs.readFileSync(path.join(dir, 'tasks.head.md'), 'utf8');
    const head = parseTasksMd(headText, exp.case);
    const mode = resolveMode(head.declaredMode, exp.authoredAt, exp.ratifiedAt);
    const findings: Finding[] = [];
    if (mode === 'non-compliant-no-declaration') {
      const r = evaluateSpec(head, mode, () => undefined);
      findings.push(...r.findings);
    }
    let material: boolean | undefined;
    if (baseText !== undefined) {
      material = isMaterialAmendment(baseText, headText);
      const f = evaluateAmendment(baseText, headText);
      if (f) findings.push(f);
    }
    return { findings, emissions: [], sourceFiles: [], parentsEvaluated: [], material, mode };
  }

  if (exp.kind === 'ratification') {
    const ballotFile = path.join(dir, 'ballot.md');
    const ballotText = fs.existsSync(ballotFile)
      ? fs.readFileSync(ballotFile, 'utf8')
      : undefined;
    const record = parseRatificationRecord(ballotText, exp.ballotPath!);
    if ('verdict' in record) {
      // The record gate PRECEDES evaluation — no parity results leak past it.
      return { findings: [record], emissions: [], sourceFiles: [], parentsEvaluated: [] };
    }
    const parity = runParity(dir, exp);
    return { ...parity, ratifiedMachine: record.date };
  }

  return runParity(dir, exp);
}

const fixtureDirs = fs.existsSync(FIXTURES)
  ? fs
      .readdirSync(FIXTURES)
      .filter((d) => fs.statSync(path.join(FIXTURES, d)).isDirectory())
      .sort()
  : [];

const manifest: { classes: string[] } = JSON.parse(
  fs.readFileSync(path.join(FIXTURES, 'expected-classes.json'), 'utf8')
);

const allExpected: Expected[] = fixtureDirs.map((d) =>
  JSON.parse(fs.readFileSync(path.join(FIXTURES, d, 'expected.json'), 'utf8'))
);

describe('the coverage floor (C7/B-8) — red by construction on a thin set', () => {
  test('every manifest class has at least one fixture', () => {
    expect(uncoveredClasses(manifest.classes, allExpected.map((e) => e.class))).toEqual([]);
  });

  test('STANDING red-at-zero: the floor run against an EMPTY fixture set reports every class uncovered (Stacy A-5)', () => {
    const uncovered = uncoveredClasses(manifest.classes, []);
    expect(uncovered).toEqual(manifest.classes);
    expect(uncovered.length).toBeGreaterThan(0);
  });

  test('every fixture declares a manifest class and a resolvable provenance spec', () => {
    for (const e of allExpected) {
      expect(manifest.classes).toContain(e.class);
      expect(fs.existsSync(path.join(PROJECT_ROOT, e.provenance))).toBe(true);
    }
  });

  test('the floor covers the six mutation classes plus every named surface class', () => {
    // The ruled floor of design C7 — the manifest may extend it, never shrink it.
    for (const ruled of [
      'drop', 'reword', 'relax', 'omit-doc', 'invent', 'absorb',
      'av-gate', 'deferral', 'exemption', 'declaration', 'materiality',
    ]) {
      expect(manifest.classes).toContain(ruled);
    }
  });
});

describe.each(fixtureDirs)('fixture: %s', (dirName) => {
  const dir = path.join(FIXTURES, dirName);
  const exp: Expected = JSON.parse(
    fs.readFileSync(path.join(dir, 'expected.json'), 'utf8')
  );

  test(`produces its required verdict (${exp.exit}: ${exp.verdicts.join(', ') || 'PASS'})`, () => {
    const r = runFixture(dir, exp);

    // exact verdict multiset
    expect([...r.findings.map((f) => f.verdict)].sort()).toEqual([...exp.verdicts].sort());

    // exit semantics
    expect(r.findings.length > 0 ? 'red' : 'green').toBe(exp.exit);

    // exact required messages (catalog strings verbatim, slots filled)
    const messages = r.findings.map((f) => f.message);
    for (const m of exp.messages ?? []) {
      expect(messages).toContain(m);
    }
    for (const sub of exp.messageContains ?? []) {
      expect(messages.some((m) => m.includes(sub))).toBe(true);
    }
    for (const sub of exp.messageNotContains ?? []) {
      expect(messages.some((m) => m.includes(sub))).toBe(false);
    }

    // structured multiset diffs (absorb ≠ drop; invent = unexpected-only)
    if (exp.mismatch) {
      const f = r.findings.find((x) => x.verdict === 'SET_MISMATCH');
      expect(f?.diff).toBeDefined();
      expect([...f!.diff!.missing].sort()).toEqual([...exp.mismatch.missing].sort());
      expect([...f!.diff!.extra].sort()).toEqual([...exp.mismatch.extra].sort());
    }
    if (exp.avMismatch) {
      const f = r.findings.find((x) => x.verdict === 'AV_SET_MISMATCH');
      expect(f?.diff).toBeDefined();
      expect([...f!.diff!.missing].sort()).toEqual([...exp.avMismatch.missing].sort());
      expect([...f!.diff!.extra].sort()).toEqual([...exp.avMismatch.extra].sort());
    }

    // exact emission-kind multiset — asserted POSITIVELY (a checker that
    // silently evaluates nothing fails every control here)
    expect([...r.emissions.map((e) => e.kind)].sort()).toEqual([...exp.emissions].sort());
    for (const sub of exp.emissionContains ?? []) {
      expect(r.emissions.some((e) => e.detail.includes(sub))).toBe(true);
    }

    // population / evaluation-shape assertions
    if (exp.parentsEvaluated) {
      expect([...r.parentsEvaluated].sort()).toEqual([...exp.parentsEvaluated].sort());
    }
    if (exp.mode) {
      expect(r.mode).toBe(exp.mode);
    }
    if (exp.material !== undefined) {
      expect(r.material).toBe(exp.material);
    }
    if (exp.ratifiedMachine) {
      // asserted as a VALUE read from ballot.md — never a parse boolean and
      // never a constant (DD2; the valid-control's decoy dates enforce this)
      expect(r.ratifiedMachine).toBe(exp.ratifiedMachine);
    }
    if (exp.sourceFiles) {
      // B-4 manifest naming: the run names the file(s) it evaluated
      const files = fs.readdirSync(dir);
      const parent = parseTasksMd(fs.readFileSync(path.join(dir, 'tasks.md'), 'utf8'))
        .parents.find((p) => p.ticked && p.number);
      const re = completionDocPattern(parent!.number!);
      expect(files.filter((f) => re.test(f)).sort()).toEqual([...exp.sourceFiles].sort());
    }
  });
});

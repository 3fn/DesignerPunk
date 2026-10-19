#!/usr/bin/env tsx
/**
 * check-completion-criteria-parity.ts — CLI entry for the parity checker
 * (Spec 127, design C5/C6; Reqs 6.1–6.4).
 *
 * Sanctioned by register row `governance/classification-map.md § "completion-
 * criteria-parity"` (check_state: proposed; the ARMING is Q2's decision, not
 * this script's — until armed the CI job runs NON-required and this check name
 * stays OUT of EXPECTED_CONTEXTS).
 *
 * Scan scope (DD1): the parity predicate runs as a FULL SCAN of the declared
 * population — every spec whose tasks.md declares `per-parent` — on every run.
 * Deterministic, self-healing, initially tiny by construction. The
 * declaration/materiality duties (Req 6.3) run DIFF-scoped against the merge
 * base when one is available (`--base <ref>`, or GITHUB_BASE_REF in CI).
 *
 * Modes:
 *   npm run check:completion-criteria-parity                  # full scan
 *   npx tsx scripts/check-completion-criteria-parity.ts --base origin/main
 *   npx tsx scripts/check-completion-criteria-parity.ts --verify-extraction
 *
 * Output contract (DD3): ONE format for humans, CI, and the claims pass —
 * per-spec per-parent verdict lines, the association manifest (Req 2.4.2),
 * emission lines scoped to parity's OWN surface (B-9), and a summary line
 * with pass/exempt/fail counts and the emission count. Exit non-zero on any
 * red or malformation; exit zero with emissions otherwise.
 *
 * Loud, never silent (D-2 record § 3, 2026-10-19): a requested merge base
 * that cannot be resolved, a failed authorship lookup, and a shallow clone
 * are each RED — before, the first two were a `note:`/`undefined` and exit 0,
 * turning the diff-scoped and declaration duties off without a trace.
 *
 * Framing (the (d8) sentence, carried where the instrument lives): nothing
 * here makes claim honesty owned, solved, or guaranteed. Any future reading
 * of a green `completion-criteria-parity` gate as evidence of claim honesty
 * will have made the error this spec exists to prevent.
 */

import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';
import {
  RATIFICATION_BALLOT_PATH,
  parseRatificationRecord,
  resolveMode,
  evaluateSpec,
  evaluateAmendment,
  formatUntickedLine,
  mergeBaseUnresolvable,
  authorshipUnresolvable,
  shallowCloneFinding,
  SHALLOW_CLONE_MESSAGE,
  Finding,
  SpecResult,
} from './completion-claims/verdict';
import { parseTasksMd, Parent } from './completion-claims/tasks-md';
import {
  locateCompletionDocs,
  parseCompletionDocs,
} from './completion-claims/completion-doc';
import { verifyExtraction } from './completion-claims/materiality';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SPECS_DIR = path.join(PROJECT_ROOT, '.kiro', 'specs');

/**
 * Every git call pipes stderr (D-2 low (c)): an inherited stderr printed
 * `fatal: path … exists on disk, but not in '<sha>'` on green runs. A failure
 * that matters is turned into a RED finding by the caller, quoting git's
 * first stderr line — never printed raw, never swallowed.
 */
function git(args: string[]): string {
  return execFileSync('git', args, {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function gitError(e: unknown): string {
  const err = e as { stderr?: string | Buffer; message?: string };
  const text = (err.stderr ? String(err.stderr) : err.message ?? String(e)).trim();
  return text.split('\n')[0] || 'git failed';
}

/** In CI every tasks.md is committed, so an empty history is a failure, not
 *  an uncommitted local file. */
const IN_CI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';

type Authorship = { date: string } | { uncommitted: true } | { error: string };

/**
 * Authorship date (DD2): the first-commit date of the file under
 * `git log --diff-filter=A --follow` — the ruled instrument, run verbatim.
 * Squash-merge makes it the merge date (correct: the date it entered main's
 * view); CI checks out with fetch-depth 0 so the history is present.
 *
 * D-2 low (b): a git error is `{ error }` (RED), never `undefined` → legacy.
 * Empty history is `{ error }` in CI; locally it is `{ uncommitted }` (a new
 * file not yet committed — reported as a note, resolved as before).
 */
function authorshipDate(relFile: string): Authorship {
  let out: string;
  try {
    out = git(['log', '--diff-filter=A', '--follow', '--format=%cs', '--', relFile]);
  } catch (e) {
    return { error: `git log failed: ${gitError(e)}` };
  }
  const dates = out.trim().split('\n').filter(Boolean);
  if (dates.length) return { date: dates[dates.length - 1] };
  return IN_CI ? { error: 'no commit adds this file in the fetched history' } : { uncommitted: true };
}

/** Is HEAD's repository a shallow clone? A git error here is also loud. */
function shallowCheck(): Finding | undefined {
  try {
    return git(['rev-parse', '--is-shallow-repository']).trim() === 'true'
      ? shallowCloneFinding()
      : undefined;
  } catch (e) {
    return authorshipUnresolvable('(repository)', `git rev-parse failed: ${gitError(e)}`);
  }
}

function main(): number {
  const args = process.argv.slice(2);

  if (args.includes('--verify-extraction')) {
    return runVerifyExtraction();
  }

  let baseRef: string | undefined;
  const baseIdx = args.indexOf('--base');
  if (baseIdx >= 0 && args[baseIdx + 1]) baseRef = args[baseIdx + 1];
  else if (process.env.GITHUB_BASE_REF) baseRef = `origin/${process.env.GITHUB_BASE_REF}`;

  console.log('== completion-criteria-parity ==');

  // ---- ratification record (C5/B-2): pinned path, machine line, loud red ----
  const ballotAbs = path.join(PROJECT_ROOT, RATIFICATION_BALLOT_PATH);
  const ballotText = fs.existsSync(ballotAbs)
    ? fs.readFileSync(ballotAbs, 'utf8')
    : undefined;
  const record = parseRatificationRecord(ballotText, RATIFICATION_BALLOT_PATH);
  if ('verdict' in record) {
    console.error(`RED: ${record.message}`);
    console.log('SUMMARY: parents evaluated 0, pass 0, fail 0; emissions 0; reds 1');
    return 1;
  }
  const ratifiedAt = record.date;
  console.log(`ratification record: ${ratifiedAt} (${RATIFICATION_BALLOT_PATH})`);

  // ---- full scan of the population ----
  const specDirs = fs
    .readdirSync(SPECS_DIR)
    .filter((d) => fs.existsSync(path.join(SPECS_DIR, d, 'tasks.md')))
    .sort();

  const results: SpecResult[] = [];
  // Run-level reds that belong to no spec (D-2 lows (a), (b)).
  const runFindings: Finding[] = [];
  const notes: string[] = [];
  let skippedSpecLevel = 0;
  let skippedLegacy = 0;
  let authorshipUnresolved = 0;
  let shallowChecked = false;
  let shallow = false;

  for (const specDir of specDirs) {
    const relFile = path.join('.kiro', 'specs', specDir, 'tasks.md');
    const text = fs.readFileSync(path.join(PROJECT_ROOT, relFile), 'utf8');
    const tasks = parseTasksMd(text, specDir);
    // Authorship dates are only consulted for UNDECLARED files (declaration
    // governs when present) — keeps the git cost proportional to the gap.
    let authoredAt: string | undefined;
    if (!tasks.declaredMode) {
      if (!shallowChecked) {
        shallowChecked = true;
        const sf = shallowCheck();
        if (sf) {
          runFindings.push(sf);
          shallow = sf.message === SHALLOW_CLONE_MESSAGE;
        }
      }
      if (shallow) {
        // A shallow clone dates every file at its boundary commit, so every
        // undeclared file would read post-ratification (measured: 153 false
        // NON_COMPLIANT reds). The one shallow red stands for them all.
        authorshipUnresolved++;
        continue;
      }
      const a = authorshipDate(relFile);
      if ('error' in a) {
        // Unresolvable, not legacy: the spec is left out of the population
        // and the run is red, so the declaration duty never goes off quietly.
        authorshipUnresolved++;
        runFindings.push(authorshipUnresolvable(relFile, a.error));
        continue;
      }
      if ('uncommitted' in a) notes.push(`note: ${relFile} has no commit yet — authorship unknown, resolved as legacy (local run only; in CI this is red)`);
      else authoredAt = a.date;
    }
    const mode = resolveMode(tasks.declaredMode, authoredAt, ratifiedAt);
    if (mode === 'legacy') {
      skippedLegacy++;
      continue;
    }
    if (mode === 'spec-level') {
      skippedSpecLevel++;
      continue;
    }
    const locate = (p: Parent) => {
      if (p.number === undefined) return undefined;
      const files = locateCompletionDocs(path.join(SPECS_DIR, specDir), p.number);
      return parseCompletionDocs(files);
    };
    results.push(evaluateSpec(tasks, mode, locate));
  }

  // ---- diff-scoped duties (Req 6.3) ----
  const diffFindings: { file: string; finding: Finding }[] = [];
  if (baseRef) {
    let mergeBase: string | undefined;
    try {
      mergeBase = git(['merge-base', baseRef, 'HEAD']).trim();
    } catch {
      // D-2 low (a): the duty was requested and cannot run — red, not a note.
      runFindings.push(mergeBaseUnresolvable(baseRef));
    }
    if (mergeBase) {
      const changed = git(['diff', '--name-only', mergeBase, 'HEAD'])
        .trim()
        .split('\n')
        .filter((f) => /^\.kiro\/specs\/[^/]+\/tasks\.md$/.test(f));
      for (const file of changed) {
        const abs = path.join(PROJECT_ROOT, file);
        if (!fs.existsSync(abs)) continue; // deleted
        const headText = fs.readFileSync(abs, 'utf8');
        // D-2 low (c): existence at the base is checked first (ls-tree prints
        // nothing for an absent path and never errors on it), so a tasks.md
        // ADDED in this change no longer makes `git show` print `fatal:`.
        let baseText: string | undefined;
        if (git(['ls-tree', '--name-only', mergeBase, '--', file]).trim() !== '') {
          baseText = git(['show', `${mergeBase}:${file}`]);
        } // else: added in this change — the authorship duty covers it
        // The amendment duty binds LEGACY files (declared files are already
        // in — or excluded from — the population; the full scan covers the
        // post-ratification-authored-undeclared red).
        const headParsed = parseTasksMd(headText);
        if (headParsed.declaredMode) continue;
        if (shallow) continue; // the run is already red (shallow clone)
        const a = authorshipDate(file);
        // A failed lookup is already a full-scan red for this file (same path).
        if ('error' in a) continue;
        const authoredAt = 'date' in a ? a.date : undefined;
        if (authoredAt && authoredAt > ratifiedAt) continue; // full-scan red already
        const finding = evaluateAmendment(baseText, headText);
        if (finding) diffFindings.push({ file, finding });
      }
    }
  }

  // ---- output (DD3: one contract) ----
  let pass = 0;
  let exempt = 0;
  let fail = 0;
  let reds = 0;
  let emissions = 0;

  for (const n of notes) console.log(n);
  for (const f of runFindings) {
    reds++;
    console.log(`RED [${f.verdict}] ${f.message}`);
  }

  for (const r of results) {
    console.log(`spec ${r.spec} (${r.mode}):`);
    for (const f of r.findings) {
      reds++;
      console.log(`  RED [${f.verdict}] ${f.message}`);
    }
    for (const a of r.associations) {
      console.log(`  association: ${a}`);
    }
    for (const p of r.parents) {
      const notEvaluated =
        p.findings.length === 0 &&
        p.emissions.some((e) => e.kind === 'completion-doc-not-found');
      if (notEvaluated) {
        // The named third state (C5/B-4): not red, not silent — and never a
        // PASS: an unevaluated parent counted as passing would be this law's
        // own misleading-green shape.
        console.log(`  parent ${p.parent}: not evaluated (completion doc not found)`);
      } else if (p.findings.length === 0 && p.emissions.some((e) => e.kind === 'exemption-honored')) {
        // D-2 low (d)(ii): an exemption-honored parent was counted in `pass`.
        // Its criteria table was waived, so it is counted apart.
        exempt++;
        console.log(`  parent ${p.parent}: EXEMPT (criteria table waived by the fixed-string exemption; no red on the duties evaluated)`);
      } else if (p.findings.length === 0) {
        pass++;
        console.log(`  parent ${p.parent}: PASS`);
      } else {
        fail++;
        for (const f of p.findings) {
          reds++;
          console.log(`  parent ${p.parent}: RED [${f.verdict}] ${f.message}`);
        }
      }
      for (const e of p.emissions) {
        emissions++;
        console.log(`  emission [${e.kind}] ${e.detail}`);
      }
    }
    // Informational only (Peter, 2026-09-26) — never counted toward
    // pass/fail/reds/emissions or the exit code. Printed once per spec, at
    // spec-header weight (un-indented) rather than interleaved with the
    // per-parent verdict lines above, so it stays legible regardless of how
    // long that list grows. Omitted entirely when the count is 0.
    const untickedLine = formatUntickedLine(r);
    if (untickedLine) console.log(untickedLine);
  }
  for (const d of diffFindings) {
    reds++;
    console.log(`${d.file}: RED [${d.finding.verdict}] ${d.finding.message}`);
  }

  // D-2 low (d)(i): `results` also holds undeclared non-compliant specs,
  // which were counted as "declared per-parent".
  const declaredPerParent = results.filter((r) => r.mode === 'per-parent').length;
  const undeclared = results.length - declaredPerParent;
  console.log(
    `population: ${specDirs.length} tasks.md — ${declaredPerParent} declared per-parent, ` +
      `${undeclared} undeclared post-ratification (red), ` +
      `${skippedSpecLevel} spec-level (skipped), ${skippedLegacy} legacy (skipped)` +
      (authorshipUnresolved ? `, ${authorshipUnresolved} authorship unresolvable (red)` : '')
  );
  console.log(
    `SUMMARY: parents evaluated ${pass + exempt + fail}, pass ${pass}, exempt ${exempt}, fail ${fail}; emissions ${emissions}; reds ${reds}`
  );
  return reds > 0 ? 1 : 0;
}

function runVerifyExtraction(): number {
  const { files, totals, digest } = verifyExtraction(PROJECT_ROOT);
  console.log('== completion-criteria-parity --verify-extraction ==');
  console.log('file, P1..P8, segments:');
  for (const f of files) {
    const c = f.counts;
    console.log(
      `  ${f.file}: P1=${c.P1} P2=${c.P2} P3=${c.P3} P4=${c.P4} P5=${c.P5} P6=${c.P6} P7=${c.P7} P8=${c.P8} segments=${c.segments}`
    );
  }
  console.log(
    `TOTALS (${files.length} files): P1=${totals.P1} P2=${totals.P2} P3=${totals.P3} ` +
      `P4=${totals.P4} P5=${totals.P5} P6=${totals.P6} P7=${totals.P7} P8=${totals.P8} segments=${totals.segments}`
  );
  console.log(`corpus digest: sha256:${digest}`);
  return 0;
}

process.exit(main());

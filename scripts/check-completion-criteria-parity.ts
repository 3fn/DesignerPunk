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
 * with pass/fail counts and the emission count. Exit non-zero on any red or
 * malformation; exit zero with emissions otherwise.
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

function git(args: string[]): string {
  return execFileSync('git', args, { cwd: PROJECT_ROOT, encoding: 'utf8' });
}

/**
 * Authorship date (DD2): the first-commit date of the file under
 * `git log --diff-filter=A --follow` — the ruled instrument, run verbatim.
 * Squash-merge makes it the merge date (correct: the date it entered main's
 * view); CI checks out with fetch-depth 0 so the history is present.
 */
function authorshipDate(relFile: string): string | undefined {
  try {
    const out = git(['log', '--diff-filter=A', '--follow', '--format=%cs', '--', relFile]);
    const dates = out.trim().split('\n').filter(Boolean);
    return dates.length ? dates[dates.length - 1] : undefined;
  } catch {
    return undefined;
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
  let skippedSpecLevel = 0;
  let skippedLegacy = 0;

  for (const specDir of specDirs) {
    const relFile = path.join('.kiro', 'specs', specDir, 'tasks.md');
    const text = fs.readFileSync(path.join(PROJECT_ROOT, relFile), 'utf8');
    const tasks = parseTasksMd(text, specDir);
    // Authorship dates are only consulted for UNDECLARED files (declaration
    // governs when present) — keeps the git cost proportional to the gap.
    const authoredAt = tasks.declaredMode ? undefined : authorshipDate(relFile);
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
      console.log(`note: cannot resolve merge base against ${baseRef} — diff-scoped duties skipped`);
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
        let baseText: string | undefined;
        try {
          baseText = git(['show', `${mergeBase}:${file}`]);
        } catch {
          baseText = undefined; // added in this change — the authorship duty covers it
        }
        // The amendment duty binds LEGACY files (declared files are already
        // in — or excluded from — the population; the full scan covers the
        // post-ratification-authored-undeclared red).
        const headParsed = parseTasksMd(headText);
        if (headParsed.declaredMode) continue;
        const authoredAt = authorshipDate(file);
        if (authoredAt && authoredAt > ratifiedAt) continue; // full-scan red already
        const finding = evaluateAmendment(baseText, headText);
        if (finding) diffFindings.push({ file, finding });
      }
    }
  }

  // ---- output (DD3: one contract) ----
  let pass = 0;
  let fail = 0;
  let reds = 0;
  let emissions = 0;

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
  }
  for (const d of diffFindings) {
    reds++;
    console.log(`${d.file}: RED [${d.finding.verdict}] ${d.finding.message}`);
  }

  console.log(
    `population: ${specDirs.length} tasks.md — ${results.length} declared per-parent, ` +
      `${skippedSpecLevel} spec-level (skipped), ${skippedLegacy} legacy (skipped)`
  );
  console.log(
    `SUMMARY: parents evaluated ${pass + fail}, pass ${pass}, fail ${fail}; emissions ${emissions}; reds ${reds}`
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

#!/usr/bin/env node
/**
 * Sweep 5 — corrected-state-holds (C8 row 5) — Spec 122 Task 7.2.
 *
 * **PRE-CUTOVER GATE ONLY** (Req 19 AC1's NAMED EXCEPTION — not standing post-cutover;
 * re-entry protection belongs to the class checks). Registered for the cutover window; its
 * removal after the last cutover is a recorded protection-list change (C9 keeps the count
 * assertion honest).
 *
 * Two assertions at cutover:
 *   1. ZERO `.web.tsx` matches in canonical source (count-asserted = 0) — the lina-prompt
 *      scaffolding bug class (34/34 web files are `.web.ts`).
 *   2. A SINGLE distinct concept-count value across `contract-system-reference` — extract
 *      all `\d+ (contract )?concepts` matches AFTER excluding historical-context lines (L3:
 *      lines matching `Originally|historical|migration|source names`), so a provenance
 *      sentence (live at lines 49/113, Lina-flagged) does not false-positive when rephrased.
 *      Pinned to the current-catalog assertion, not every integer-adjacent-to-"concepts".
 *
 * Prove-it-bites (Req 19 AC2): temporarily re-introduce `.web.tsx` on a scratch input —
 * see __tests__/sweep-5-corrected.test.ts (injected scan text) and the recorded live run.
 */

import * as path from 'path';
import {
  type SweepFinding,
  type SweepReport,
  assembleReport,
  repoRootFromHere,
  readFileIfExists,
  exitWithReport,
} from './common';
import { collectScanFiles } from './sweep-1-refs';

export const SWEEP_5 = '122-sweep-5-corrected-state';

/** L3 historical-context line exclusion (design C8 row 5, verbatim pattern set). */
export const HISTORICAL_LINE = /Originally|historical|migration|source names/;

/** The concept-count extractor (current-catalog assertion form). */
export const CONCEPT_COUNT = /(\d+)\s+(?:contract\s+)?concepts/g;

export interface Sweep5Inputs {
  /** Canonical authored source files: repoRoot-relative path → text (the `.web.tsx` scan). */
  scanFiles: Readonly<Record<string, string>>;
  /** The full text of `contract-system-reference` (governance/Contract-System-Reference.md). */
  contractReferenceText: string;
}

export function runSweep5(inputs: Sweep5Inputs): SweepReport {
  const findings: SweepFinding[] = [];

  // 1. Zero `.web.tsx` in canonical source, count-asserted.
  let webTsxCount = 0;
  for (const [relPath, text] of Object.entries(inputs.scanFiles)) {
    text.split('\n').forEach((line, i) => {
      if (line.includes('.web.tsx')) {
        webTsxCount += 1;
        findings.push({
          verdict: 'FAIL',
          path: `${relPath}:${i + 1}`,
          observed: 'canonical source references `.web.tsx` (34/34 live web files are `.web.ts`)',
          expected: '`.web.tsx` count in canonical source == 0 (count-asserted)',
          owner: 'lina',
        });
      }
    });
  }
  findings.push({
    verdict: 'INFO',
    path: 'web-tsx-count',
    observed: `count-assert: ${webTsxCount} \`.web.tsx\` occurrence(s) in canonical source (expected 0)`,
    expected: 'recorded count — the assertion is a number, not a vibe',
    owner: 'lina',
  });

  // 2. Single distinct concept-count across contract-system-reference (L3 exclusion).
  const counts = new Set<string>();
  const excludedLines: number[] = [];
  inputs.contractReferenceText.split('\n').forEach((line, i) => {
    if (HISTORICAL_LINE.test(line)) {
      if (/\d+\s+(?:contract\s+)?concepts/.test(line)) excludedLines.push(i + 1);
      return;
    }
    for (const m of line.matchAll(CONCEPT_COUNT)) counts.add(m[1]);
  });
  if (counts.size !== 1) {
    findings.push({
      verdict: 'FAIL',
      path: 'contract-system-reference',
      observed:
        counts.size === 0
          ? 'ZERO concept-count matches after L3 exclusion — the extractor found nothing to assert (extraction broken or doc restructured)'
          : `${counts.size} distinct concept-count values after L3 exclusion: {${[...counts].sort().join(', ')}}`,
      expected: 'exactly ONE distinct concept-count value (the current-catalog number)',
      owner: 'lina',
    });
  } else {
    findings.push({
      verdict: 'INFO',
      path: 'contract-system-reference',
      observed: `single distinct concept-count: ${[...counts][0]} (${excludedLines.length} historical-context line(s) excluded: ${excludedLines.join(', ') || 'none'})`,
      expected: 'recorded value + exclusions, for the sweep report',
      owner: 'lina',
    });
  }

  return assembleReport(SWEEP_5, findings);
}

// ============================================================================
// CLI wiring
// ============================================================================

function main(): void {
  const repoRoot = repoRootFromHere();
  const contractReferenceText =
    readFileIfExists(path.join(repoRoot, 'governance', 'Contract-System-Reference.md')) ?? '';
  if (contractReferenceText === '') {
    console.error('[sweep-5] governance/Contract-System-Reference.md not found — cannot assert');
    process.exit(1);
  }
  const report = runSweep5({ scanFiles: collectScanFiles(repoRoot), contractReferenceText });
  exitWithReport(report);
}

if (require.main === module) {
  main();
}

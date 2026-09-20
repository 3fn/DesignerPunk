/**
 * materiality.ts — the "materially amended" evaluator (Spec 127, design C4; Req 2.3).
 *
 * `extractPromiseSurface` applies the GENEROUS pattern set — deliberately
 * independent of the checker's strict grammar (a false-material costs one
 * declaration line; a false-immaterial reopens B4's side door). The set is
 * CLOSED, enumerated verbatim in the law ballot (§ 5.7, classes P1–P8), and
 * was verified once over the whole corpus with the result recorded there.
 *
 * Materiality = normalized-and-masked inequality of the extracted surface
 * before vs after a commit (one normalization concept + one named mask —
 * normalize.ts, shared by import).
 *
 * The narrative-prose gap is ACCEPTED as a stated decision (DD9): load-bearing
 * numbers in free prose between tasks are outside this surface; the guarded
 * channels are the LENS's question 5 and the claims pass.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { maskCheckboxes, normalizeCell } from './normalize';

/**
 * The closed pattern classes, keyed to the ballot's § 5.7 census (P1–P8).
 * Per-class line predicates; body-collecting classes pull their bullet bodies.
 */
const P1_TOP_LEVEL_CHECKBOX = /^- \[[xX ]\] /;
const P2_LABEL_FROZEN = /\*\*Success Criteria:\*\*/;
const P3_LABEL_COLON_OUTSIDE = /\*\*Success Criteria\*\*:/;
const P4_LABEL_HEADING = /^#{2,4} .*Success Criteria/;
const P5_PRIMARY_ARTIFACTS = /\*\*Primary Artifacts:\*\*/;
const P6_MERGE_GATE = /merge gate/i;
const P7_UNITS_CANONICAL = /^## Declared Merge Units/;
const P8_UNITS_BOLD_PROSE = /^\*\*Merge units \(/i;

export interface ExtractionCounts {
  P1: number; P2: number; P3: number; P4: number;
  P5: number; P6: number; P7: number; P8: number;
  segments: number;
}

/**
 * Grep-equivalent per-class counts, replicating ballot § 5.7's recipes EXACTLY
 * (line-counting where the recipe is `grep -c`/`wc -l` over lines, occurrence-
 * counting where it is `grep -o`). Deliberately DECOUPLED from the segment
 * extraction below: the U2 reconciliation is contractually forbidden from
 * attributing differences to extraction behaviour (Stacy BLOCKING-3), so the
 * counters must not inherit the extractor's consumption order.
 */
export function countPatternClasses(text: string): Omit<ExtractionCounts, 'segments'> {
  const lines = text.split('\n');
  const occurrences = (re: RegExp) => (text.match(re) ?? []).length;
  return {
    P1: lines.filter((l) => P1_TOP_LEVEL_CHECKBOX.test(l)).length,
    P2: occurrences(/\*\*Success Criteria:\*\*/g),
    P3: occurrences(/\*\*Success Criteria\*\*:/g),
    P4: lines.filter((l) => P4_LABEL_HEADING.test(l)).length,
    P5: occurrences(/\*\*Primary Artifacts:\*\*/g),
    P6: lines.filter((l) => P6_MERGE_GATE.test(l)).length,
    P7: lines.filter((l) => P7_UNITS_CANONICAL.test(l)).length,
    P8: lines.filter((l) => P8_UNITS_BOLD_PROSE.test(l)).length,
  };
}

/** A bullet line at any indent (bullet bodies of label/gate classes). */
const BULLET_RE = /^\s*[-*] /;

function collectBulletBody(lines: string[], start: number): { body: string[]; end: number } {
  const body: string[] = [];
  let i = start;
  let sawBullet = false;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      // blank lines tolerated between label and bullets / within the list
      if (sawBullet && i + 1 < lines.length && !BULLET_RE.test(lines[i + 1])) break;
      i++;
      continue;
    }
    if (BULLET_RE.test(line)) {
      body.push(line);
      sawBullet = true;
      i++;
      continue;
    }
    // continuation of a wrapped bullet: indented non-label text after a bullet
    if (sawBullet && /^\s+\S/.test(line) && !/^\s*\*\*[^*]+\*\*[:.]?/.test(line) && !/^#/.test(line)) {
      body.push(line);
      i++;
      continue;
    }
    break;
  }
  return { body, end: i };
}

export interface Extraction {
  /** Extracted segments, in document order. */
  segments: string[];
}

export function extractPromiseSurface(text: string): Extraction {
  const lines = text.split('\n');
  const segments: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (P1_TOP_LEVEL_CHECKBOX.test(line)) {
      segments.push(line);
      continue;
    }

    const isP2 = P2_LABEL_FROZEN.test(line);
    const isP3 = !isP2 && P3_LABEL_COLON_OUTSIDE.test(line);
    const isP4 = P4_LABEL_HEADING.test(line);
    if (isP2 || isP3 || isP4) {
      const { body, end } = collectBulletBody(lines, i + 1);
      segments.push(line, ...body);
      i = end - 1;
      continue;
    }

    if (P5_PRIMARY_ARTIFACTS.test(line)) {
      const { body, end } = collectBulletBody(lines, i + 1);
      segments.push(line, ...body);
      i = end - 1;
      continue;
    }

    if (P6_MERGE_GATE.test(line)) {
      const { body, end } = collectBulletBody(lines, i + 1);
      segments.push(line, ...body);
      i = end - 1;
      continue;
    }

    if (P7_UNITS_CANONICAL.test(line) || P8_UNITS_BOLD_PROSE.test(line)) {
      // The units block: the declaration line plus its table/paragraph forward,
      // to the first blank-line-then-heading boundary or next heading.
      const body: string[] = [];
      let j = i + 1;
      while (j < lines.length && !/^#/.test(lines[j])) {
        if (lines[j].trim() === '' && j + 1 < lines.length && lines[j + 1].trim() === '') break;
        body.push(lines[j]);
        j++;
      }
      segments.push(line, ...body);
      i = j - 1;
      continue;
    }
  }

  return { segments };
}

/** The canonical (normalized + masked) form of an extracted surface. */
export function canonicalSurface(text: string): string {
  const { segments } = extractPromiseSurface(text);
  return normalizeCell(maskCheckboxes(segments.join('\n')));
}

/** Req 2.3.2: a commit materially amends the file IFF the canonical surfaces differ. */
export function isMaterialAmendment(before: string, after: string): boolean {
  return canonicalSurface(before) !== canonicalSurface(after);
}

/**
 * `--verify-extraction` (Req 2.3.4): run the extractor over every
 * `.kiro/specs/<spec>/tasks.md`, print per-file segment counts, the per-class
 * totals (reconciled against ballot § 5.7's P1–P8 table — every difference
 * attributed to enumerated corpus changes, never to extraction behaviour),
 * and a corpus digest.
 */
export function verifyExtraction(projectRoot: string): {
  files: { file: string; counts: ExtractionCounts }[];
  totals: ExtractionCounts;
  digest: string;
} {
  const specsDir = path.join(projectRoot, '.kiro', 'specs');
  const files: { file: string; counts: ExtractionCounts }[] = [];
  const totals: ExtractionCounts = {
    P1: 0, P2: 0, P3: 0, P4: 0, P5: 0, P6: 0, P7: 0, P8: 0, segments: 0,
  };
  const hash = crypto.createHash('sha256');
  const specDirs = fs
    .readdirSync(specsDir)
    .filter((d) => fs.existsSync(path.join(specsDir, d, 'tasks.md')))
    .sort();
  for (const d of specDirs) {
    const file = path.join('.kiro', 'specs', d, 'tasks.md');
    const text = fs.readFileSync(path.join(projectRoot, file), 'utf8');
    const { segments } = extractPromiseSurface(text);
    const counts: ExtractionCounts = {
      ...countPatternClasses(text),
      segments: segments.length,
    };
    files.push({ file, counts });
    (Object.keys(totals) as (keyof ExtractionCounts)[]).forEach((k) => {
      totals[k] += counts[k];
    });
    hash.update(file);
    hash.update('\0');
    hash.update(normalizeCell(maskCheckboxes(segments.join('\n'))));
    hash.update('\0');
  }
  return { files, totals, digest: hash.digest('hex') };
}

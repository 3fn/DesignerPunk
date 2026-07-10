/**
 * Shared sweep infrastructure (C8) — Spec 122 Task 7.
 *
 * design.md § "C8 — The eight sweeps": each sweep is a mechanical algorithm producing a
 * {@link SweepReport}. Flagged deltas are NEVER auto-resolved: a delta the design routes to
 * an owner renders as an `ADJUDICATE:` block naming that owner (membership-vs-substance
 * seam), and the sweep FAILS until the delta is either fixed or covered by a recorded
 * adjudication (see {@link RecordedAdjudication}). Mechanical violations render as FAIL.
 * `INFO` findings (e.g. sweep 1's interim-crossRef enumeration) are always listed but never
 * fail the sweep — they exist so a standing state stays VISIBLE in every run report rather
 * than rotting silently.
 *
 * Every sweep module follows the C7 idiom (canonical-vs-truth.ts): a PURE, injectable
 * `runSweepN(inputs)` function (fakes in tests) + a `require.main` CLI that wires the real
 * repo (run via `npx tsx tools/agent-generator/sweeps/sweep-N-*.ts` — ts-node is retired).
 *
 * Traces to: Req 19 (eight checks, prove-it-bites, ADJUDICATE routing), design C8 table.
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================================================
// Finding + report shapes
// ============================================================================

/**
 * A single sweep finding.
 *  - FAIL: a mechanical violation — always fails the sweep.
 *  - ADJUDICATE: a delta needing an owner ruling — fails the sweep UNLESS a recorded
 *    adjudication covers it (the covering turns it into an `adjudicated` INFO entry).
 *  - INFO: visible-but-passing state (interim enumeration, recorded vacuous passes).
 */
export interface SweepFinding {
  verdict: 'FAIL' | 'ADJUDICATE' | 'INFO';
  /** The agent under check, when the finding is agent-scoped. */
  agent?: string;
  /** Pointer to the flagged entry (frontmatter path, file:line, row key, set-member id). */
  path: string;
  /** What the sweep observed. */
  observed: string;
  /** What was expected / claimed. */
  expected: string;
  /** The adjudicator/owner this finding routes to (ADJUDICATE names this in its block). */
  owner: string;
  /**
   * For ADJUDICATE findings: the stable key a {@link RecordedAdjudication} matches on
   * (e.g. `data/ambient/designed-minus-generated/start-up-tasks`).
   */
  adjudicationKey?: string;
  /** Set when a recorded adjudication covered this finding (verdict stays ADJUDICATE for the record, but it no longer fails the sweep). */
  adjudicatedBy?: RecordedAdjudication;
}

export interface SweepReport {
  /** The check context name, e.g. `122-sweep-1-refs`. */
  sweep: string;
  findings: SweepFinding[];
  /** True iff no FAIL and no uncovered ADJUDICATE — the sweep's exit-0 condition. */
  pass: boolean;
}

/** The three sanctioned rulings for an adjudicated delta (design C8 sweep-4 row). */
export type AdjudicationRuling = 'intentional-trim' | 'assessment-gap' | 'design-change';

/**
 * A recorded owner adjudication a sweep consumes so a RULED delta stops failing the gate
 * while staying visible. Production reads `canonical/adjudications.yaml` (tolerating its
 * absence — zero recorded adjudications). The `record` field cites where the ruling lives
 * (commit / cutover report / feedback round) — a ruling without a citable record is not a
 * record ("authority is a record").
 */
export interface RecordedAdjudication {
  /** The sweep context this ruling applies to, e.g. `122-sweep-4-ambient`. */
  sweep: string;
  /** Matches {@link SweepFinding.adjudicationKey}. */
  key: string;
  ruling: AdjudicationRuling;
  /** Who ruled. */
  owner: string;
  /** Citable record of the ruling (commit sha, report path, round stamp). */
  record: string;
}

/** Parse `canonical/adjudications.yaml` text (pure; tolerates absence/empty). */
export function parseAdjudications(yamlText: string | undefined): RecordedAdjudication[] {
  if (!yamlText) return [];
  // Lazy import shape-compatible with the other parsers (js-yaml is already a dependency).
  const { load } = require('js-yaml') as { load: (t: string) => unknown };
  const parsed = load(yamlText) as { adjudications?: RecordedAdjudication[] } | null;
  return parsed?.adjudications ?? [];
}

/**
 * Apply recorded adjudications to raw findings and assemble the report: an ADJUDICATE
 * finding whose (sweep, adjudicationKey) matches a record is marked covered; `pass` is
 * true iff nothing FAILs and every ADJUDICATE is covered.
 */
export function assembleReport(
  sweep: string,
  findings: SweepFinding[],
  adjudications: readonly RecordedAdjudication[] = []
): SweepReport {
  for (const f of findings) {
    if (f.verdict === 'ADJUDICATE' && f.adjudicationKey) {
      const match = adjudications.find((a) => a.sweep === sweep && a.key === f.adjudicationKey);
      if (match) f.adjudicatedBy = match;
    }
  }
  const failing = findings.some(
    (f) => f.verdict === 'FAIL' || (f.verdict === 'ADJUDICATE' && !f.adjudicatedBy)
  );
  return { sweep, findings, pass: !failing };
}

// ============================================================================
// Report formatting (ADJUDICATE: blocks name the owner — design C8 preamble)
// ============================================================================

export function formatSweepReport(report: SweepReport): string {
  const lines: string[] = [];
  const fails = report.findings.filter((f) => f.verdict === 'FAIL');
  const adjudicate = report.findings.filter((f) => f.verdict === 'ADJUDICATE' && !f.adjudicatedBy);
  const covered = report.findings.filter((f) => f.verdict === 'ADJUDICATE' && f.adjudicatedBy);
  const info = report.findings.filter((f) => f.verdict === 'INFO');

  lines.push(
    `${report.sweep}: ${report.pass ? 'PASS' : 'FAIL'} — ${fails.length} fail, ${adjudicate.length} unadjudicated, ${covered.length} adjudicated, ${info.length} info`
  );
  for (const f of fails) {
    lines.push(`  [FAIL] ${f.agent ? `${f.agent} @ ` : ''}${f.path}`);
    lines.push(`      observed: ${f.observed}`);
    lines.push(`      expected: ${f.expected}`);
  }
  for (const f of adjudicate) {
    lines.push(`  ADJUDICATE: owner=${f.owner} ${f.agent ? `agent=${f.agent} ` : ''}@ ${f.path}`);
    lines.push(`      key     : ${f.adjudicationKey ?? '<none>'}`);
    lines.push(`      observed: ${f.observed}`);
    lines.push(`      expected: ${f.expected}`);
    lines.push(`      → record a ruling (intentional-trim | assessment-gap | design-change) in canonical/adjudications.yaml, citing its record`);
  }
  for (const f of covered) {
    lines.push(
      `  [adjudicated:${f.adjudicatedBy!.ruling}] ${f.agent ? `${f.agent} @ ` : ''}${f.path} (owner=${f.adjudicatedBy!.owner}, record=${f.adjudicatedBy!.record})`
    );
  }
  for (const f of info) {
    lines.push(`  [info] ${f.agent ? `${f.agent} @ ` : ''}${f.path} — ${f.observed}`);
  }
  return lines.join('\n');
}

// ============================================================================
// Repo-file section refs (`<path> § "<heading>"`) — sweep 1's crossRef leg
// ============================================================================

/** A parsed repo-file section ref, e.g. `.kiro/docs/ballots/README.md § "The Ratification Protocol"`. */
export interface RepoSectionRef {
  filePath: string;
  heading?: string;
}

/** Parse a `<path> § "<heading>"` ref; a bare path (no `§`) is a file-only ref. */
export function parseRepoSectionRef(ref: string): RepoSectionRef | undefined {
  const m = ref.match(/^(\S+)(?:\s+§\s+"(.+)")?\s*$/);
  if (!m) return undefined;
  return { filePath: m[1], heading: m[2] };
}

/**
 * Resolve a repo-file section ref: the file exists, and (when a heading is given) some
 * markdown heading line CONTAINS the quoted string verbatim. Substring-of-a-heading (not
 * exact-line) so a ref may quote the stable stem of a heading that carries a date/ratifier
 * suffix. Returns a failure description, or undefined on success.
 */
export function resolveRepoSectionRef(
  ref: RepoSectionRef,
  repoRoot: string,
  readFile: (absPath: string) => string | undefined = defaultReadFile
): string | undefined {
  const abs = path.isAbsolute(ref.filePath) ? ref.filePath : path.join(repoRoot, ref.filePath);
  const text = readFile(abs);
  if (text === undefined) return `file "${ref.filePath}" does not exist`;
  if (ref.heading === undefined) return undefined;
  const headingLines = text.split('\n').filter((l) => /^#{1,6}\s/.test(l));
  const found = headingLines.some((l) => l.includes(ref.heading!));
  return found
    ? undefined
    : `file "${ref.filePath}" exists, but no markdown heading contains "${ref.heading}" verbatim`;
}

function defaultReadFile(absPath: string): string | undefined {
  try {
    return fs.readFileSync(absPath, 'utf8');
  } catch {
    return undefined;
  }
}

// ============================================================================
// Shared production readers (CLI wiring; each tolerates substrate emptiness)
// ============================================================================

/** Repo root, resolved from this module's location (tools/agent-generator/sweeps/). */
export function repoRootFromHere(): string {
  return path.resolve(__dirname, '..', '..', '..');
}

/** Read a file, undefined when absent. */
export function readFileIfExists(absPath: string): string | undefined {
  return defaultReadFile(absPath);
}

/** Read `canonical/adjudications.yaml`, tolerating absence. */
export function readAdjudications(repoRoot: string): RecordedAdjudication[] {
  return parseAdjudications(readFileIfExists(path.join(repoRoot, 'canonical', 'adjudications.yaml')));
}

/** List `canonical/agents/*.md` absolute paths (sorted; [] when the dir is absent/empty). */
export function listCanonicalAgentFiles(repoRoot: string): string[] {
  const dir = path.join(repoRoot, 'canonical', 'agents');
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .sort()
      .map((f) => path.join(dir, f));
  } catch {
    return [];
  }
}

/** CLI exit helper: print the report, exit 0 on pass / 1 on fail. */
export function exitWithReport(report: SweepReport): never {
  console.log(formatSweepReport(report));
  process.exit(report.pass ? 0 : 1);
}

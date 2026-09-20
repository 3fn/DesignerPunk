/**
 * completion-doc.ts — the completion-doc parser (Spec 127, design C3; Reqs 1.1–1.5).
 *
 * Locates a parent's completion doc(s) by the corpus-verified glob family and
 * parses the three-column criteria table, the forced-negative line, the
 * Additional-verification section (gate rows / artifact line / fixed-form
 * deferrals), and the fixed-string exemption note.
 */

import * as fs from 'fs';
import * as path from 'path';
import { normalizeCell } from './normalize';

export interface Row {
  criterion: string;
  status: '✅' | '⚠️' | '❌' | '—' | 'other';
  evidence: string;
  evidenceKind: 'path' | 'test' | 'command' | 'decision-record' | 'empty-or-prose';
  /**
   * A row whose Status cell is the em-dash `—` claims NO verdict — an
   * annotation row (the live Task-1 shape: a gate table carrying a single
   * "(none — no merge gate declared)" marker). Annotation rows are excluded
   * from the claimed multiset AND from evidence evaluation; marking a REAL
   * criterion/condition `—` removes it from the claimed set and therefore
   * still mismatches against the declared set — the shape cannot be abused.
   */
  claiming: boolean;
}

export interface CompletionDoc {
  /** B-4: all located glob-family matches — the verdict runs against the union. */
  sourceFiles: string[];
  rows: Row[];
  forcedNegative?: string;
  exemption?: 'valid' | 'malformed';
  /** The date slot of a VALID exemption string — carried into the emission so
   *  the claims pass can count usage and age it (Req 1.7/8.6). */
  exemptionDate?: string;
  av?: {
    present: boolean;
    gateRows: Row[];
    artifactLine?: string;
    deferrals: { path: string; unit: string }[];
    malformedDeferrals: string[];
  };
}

/**
 * Doc location (design C3/B-4): glob family
 * `task-N*(-<suffix>)?(-parent)?-completion.md` — the two dominant corpus forms
 * plus the agent-suffixed (`task-N-thurgood-completion.md`) and letter-suffixed
 * (`task-Na-`) shapes. Suffix segments must start with a LETTER: a numeric
 * segment (`task-2-3-completion.md`) is a SUBTASK doc, never a parent match.
 */
export function completionDocPattern(parentNumber: string): RegExp {
  return new RegExp(
    `^task-${escapeRe(parentNumber)}(?:[a-z])?(?:-[a-z][\\w]*)*-completion\\.md$`
  );
}

export function locateCompletionDocs(specDir: string, parentNumber: string): string[] {
  const completionDir = path.join(specDir, 'completion');
  if (!fs.existsSync(completionDir)) return [];
  const re = completionDocPattern(parentNumber);
  return fs
    .readdirSync(completionDir)
    .filter((f) => re.test(f))
    .map((f) => path.join(completionDir, f))
    .sort();
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Forced-negative line: exact prefix (Req 1.4). */
const FORCED_NEGATIVE_PREFIX = 'Unmet or partially met criteria:';

/** AV artifact forced-negative line: exact prefix (Req 1.5). */
const ARTIFACT_LINE_PREFIX = 'Primary Artifacts:';

/**
 * Deferral declarations by the FIXED form only — one regex, `→` and `->`
 * accepted (DD6). Free-prose near-misses are MALFORMED_DEFERRAL, never honored.
 */
const DEFERRAL_RE = /^Artifact deferred:\s*(\S+)\s*(?:→|->)\s*(.+)$/;

/**
 * The fixed-string exemption, verbatim except the date slot (Req 1.7):
 * `Criteria fidelity: exempt — spec in flight at ratification (<date>)`.
 */
const EXEMPTION_RE =
  /^Criteria fidelity: exempt — spec in flight at ratification \(([^)]+)\)$/;
const EXEMPTION_NEARMISS_RE = /^Criteria fidelity:/;

const AV_HEADING_RE = /^#{2,4}\s+Additional verification\s*$/i;

function parseStatus(cell: string): Row['status'] {
  const c = cell.trim();
  if (c.includes('✅')) return '✅';
  if (c.includes('⚠️') || c.includes('⚠')) return '⚠️';
  if (c.includes('❌')) return '❌';
  if (c === '—' || c === '-' || c === '–') return '—';
  return 'other';
}

/**
 * Evidence-kind classification by STATED heuristic (design C3 — Lina R1: the
 * heuristic is design surface, not implementation whim). Classification is
 * emission metadata plus the permitted-kind verdict input — never a TRUTH
 * verdict about the evidence.
 */
export function classifyEvidence(evidence: string): Row['evidenceKind'] {
  const e = evidence.trim();
  if (e === '') return 'empty-or-prose';
  // test: a *.test.* / __tests__ path, a jest suite/describe name, or an
  // `npm test`-family command.
  if (
    /\b[\w./-]*__tests__[\w./-]*/.test(e) ||
    /\b[\w./-]+\.test\.[a-z]+\b/.test(e) ||
    /\bnpm (run )?test\b/.test(e) ||
    /\bjest\b/.test(e)
  ) {
    return 'test';
  }
  // command: starts with (or quotes) a shell/npm/npx invocation and carries a
  // result clause (→, `->`, "exits", "returns", "passes", or a fenced result).
  // A backticked `invocation → result` pair is the same kind whatever the
  // invocation (an MCP tool call like `rebuild_index → 82 docs indexed` is a
  // command + its result in the guide's sense).
  if (
    (/(^|`)\s*(npm|npx|node|tsx|git|grep|bash|sh|find|diff|js-yaml)\b/.test(e) &&
      /(→|->|⇒|exit|return|pass|green|`.*`|\*\*)/.test(e)) ||
    /`[^`]+(?:→|->)[^`]*`/.test(e)
  ) {
    return 'command';
  }
  // decision-record: a ballot path, a PR number + date or review-comment
  // reference, a dated design-outline decision, or a feedback-doc stamp — and
  // (implementation note on the same heuristic) a QUOTED review confirmation
  // ("independently confirmed/verified … at review: …"), which is a
  // review-comment reference in substance; the live Task-1 corpus carries it.
  if (
    /\.kiro\/docs\/ballots\//.test(e) ||
    /ballot/i.test(e) ||
    /\bPR #\d+/.test(e) ||
    /#\d+.*\(\d{4}-\d{2}-\d{2}\)/.test(e) ||
    /review comment/i.test(e) ||
    /\b(?:confirmed|verified|re-?verified)\b[^.]*\bat review\b/i.test(e) ||
    /feedback\//.test(e) ||
    /design-outline/.test(e)
  ) {
    return 'decision-record';
  }
  // path: contains `/` plus an extension or resolves in-repo — and
  // (implementation note) a bare repo FILENAME with a known source extension
  // and optional `:line` anchor (`tasks.md:13`, `Process-Spec-Planning.md:2134`)
  // is the same kind: the criterion or surrounding doc names the directory.
  const pathMatch = e.match(/([\w.-]+(?:\/[\w.:*@$-]+)+\/?)/);
  if (pathMatch) {
    const p = pathMatch[1].split(':')[0];
    // ≥2 path separators (a directory artifact like `src/components/x/`),
    // an extension, or an in-repo resolution — a single `x/y` word pair
    // without either ("and/or") stays prose.
    if ((p.match(/\//g) ?? []).length >= 2 || /\.\w+$/.test(p.replace(/\/$/, '')) || fs.existsSync(p)) {
      return 'path';
    }
  }
  if (/(?:^|[\s`("'[])[\w-]+\.(?:md|ts|tsx|js|mjs|cjs|json|ya?ml|sh|css|swift|kt|html|txt|lock)(?::\d+)?\b/.test(e)) {
    return 'path';
  }
  return 'empty-or-prose';
}

interface Table {
  headerLine: number;
  rows: Row[];
}

/** Split a markdown table row into cells, honoring `\|` escapes. */
function splitCells(line: string): string[] {
  const cells: string[] = [];
  let cur = '';
  let i = 0;
  const s = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  while (i < s.length) {
    if (s[i] === '\\' && s[i + 1] === '|') {
      cur += '\\|';
      i += 2;
    } else if (s[i] === '|') {
      cells.push(cur);
      cur = '';
      i++;
    } else {
      cur += s[i];
      i++;
    }
  }
  cells.push(cur);
  return cells.map((c) => c.trim());
}

const SEPARATOR_RE = /^\|?\s*:?-{3,}/;

/** Parse every 3-column verdict table whose header matches `headerFirstCell`. */
function parseTables(lines: string[], headerFirstCell: RegExp): Table[] {
  const tables: Table[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (!lines[i].trimStart().startsWith('|')) continue;
    const cells = splitCells(lines[i]);
    if (cells.length < 3 || !headerFirstCell.test(cells[0])) continue;
    if (!(lines[i + 1] && SEPARATOR_RE.test(lines[i + 1]))) continue;
    const rows: Row[] = [];
    let j = i + 2;
    while (j < lines.length && lines[j].trimStart().startsWith('|')) {
      const c = splitCells(lines[j]);
      if (c.length >= 3) {
        const status = parseStatus(c[1]);
        rows.push({
          criterion: c[0],
          status,
          evidence: c[2],
          evidenceKind: classifyEvidence(c[2]),
          claiming: status !== '—',
        });
      }
      j++;
    }
    tables.push({ headerLine: i + 1, rows });
    i = j;
  }
  return tables;
}

export function parseCompletionDoc(text: string, sourceFile: string): CompletionDoc {
  const lines = text.split('\n');

  // Section split: everything from the Additional-verification heading to the
  // next same-or-higher-level heading is the AV section.
  let avStart = -1;
  let avLevel = 0;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(AV_HEADING_RE);
    if (m) {
      avStart = i;
      avLevel = (lines[i].match(/^#+/) ?? ['##'])[0].length;
      break;
    }
  }
  let avEnd = lines.length;
  if (avStart >= 0) {
    for (let i = avStart + 1; i < lines.length; i++) {
      const h = lines[i].match(/^(#{1,6})\s/);
      if (h && h[1].length <= avLevel) {
        avEnd = i;
        break;
      }
    }
  }
  const mainLines = avStart >= 0 ? lines.slice(0, avStart) : lines;
  const avLines = avStart >= 0 ? lines.slice(avStart, avEnd) : [];

  // Criteria table: header first cell `Criterion (verbatim)` (normalized contains "Criterion").
  const criteriaTables = parseTables(mainLines, /Criterion/i);
  const rows = criteriaTables.flatMap((t) => t.rows);

  // Forced-negative line (exact prefix, anywhere in the main body — Req 1.4
  // places it immediately after the table; presence is the predicate surface).
  let forcedNegative: string | undefined;
  for (const line of lines) {
    const t = line.trim().replace(/^\*\*|\*\*$/g, '');
    if (t.startsWith(FORCED_NEGATIVE_PREFIX)) {
      forcedNegative = line.trim();
      break;
    }
  }

  // Exemption note: verbatim match or near-miss (Req 1.7).
  let exemption: CompletionDoc['exemption'];
  let exemptionDate: string | undefined;
  for (const line of lines) {
    const t = line.trim();
    const m = t.match(EXEMPTION_RE);
    if (m) {
      exemption = 'valid';
      exemptionDate = m[1];
      break;
    }
    if (EXEMPTION_NEARMISS_RE.test(t)) {
      exemption = 'malformed';
      break;
    }
  }

  // AV section content.
  let av: CompletionDoc['av'];
  if (avStart >= 0) {
    const gateTables = parseTables(avLines, /Condition/i);
    const gateRows = gateTables.flatMap((t) => t.rows);
    let artifactLine: string | undefined;
    const deferrals: { path: string; unit: string }[] = [];
    const malformedDeferrals: string[] = [];
    for (const line of avLines) {
      const t = line.trim();
      if (!artifactLine && t.replace(/^\*\*|\*\*$/g, '').startsWith(ARTIFACT_LINE_PREFIX)) {
        artifactLine = t;
      }
      const d = t.match(DEFERRAL_RE);
      if (d) {
        deferrals.push({ path: d[1], unit: d[2].trim() });
      } else if (/^Artifacts? deferred\b/i.test(t)) {
        // A near-miss is an ATTEMPTED declaration failing the fixed form —
        // broad prose sniffing would false-positive on "no artifacts were
        // deferred"; a deferral never declared at all is the claims pass's
        // walk-back surface, not a parse malformation.
        malformedDeferrals.push(t);
      }
    }
    av = { present: true, gateRows, artifactLine, deferrals, malformedDeferrals };
  }

  return { sourceFiles: [sourceFile], rows, forcedNegative, exemption, exemptionDate, av };
}

/** Parse the union of located docs (B-4: multiple matches → union, manifest names each). */
export function parseCompletionDocs(files: string[]): CompletionDoc | undefined {
  if (files.length === 0) return undefined;
  const parsed = files.map((f) => parseCompletionDoc(fs.readFileSync(f, 'utf8'), f));
  if (parsed.length === 1) return parsed[0];
  const union: CompletionDoc = {
    sourceFiles: parsed.flatMap((p) => p.sourceFiles),
    rows: parsed.flatMap((p) => p.rows),
    forcedNegative: parsed.map((p) => p.forcedNegative).find(Boolean),
    exemption: parsed.some((p) => p.exemption === 'malformed')
      ? 'malformed'
      : parsed.map((p) => p.exemption).find(Boolean),
    exemptionDate: parsed.map((p) => p.exemptionDate).find(Boolean),
  };
  const avs = parsed.map((p) => p.av).filter((a): a is NonNullable<CompletionDoc['av']> => !!a);
  if (avs.length > 0) {
    union.av = {
      present: true,
      gateRows: avs.flatMap((a) => a.gateRows),
      artifactLine: avs.map((a) => a.artifactLine).find(Boolean),
      deferrals: avs.flatMap((a) => a.deferrals),
      malformedDeferrals: avs.flatMap((a) => a.malformedDeferrals),
    };
  }
  return union;
}

/** Normalized claimed-criteria multiset (claiming rows only — see Row.claiming). */
export function normalizedClaimedCells(rows: Row[]): string[] {
  return rows.filter((r) => r.claiming).map((r) => normalizeCell(r.criterion));
}

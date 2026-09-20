/**
 * verdict.ts — the parity predicate + emission format (Spec 127, design C5;
 * Reqs 2.5, 6.2–6.4; DD3).
 *
 * Pure evaluation over parsed structures — no git, no fs beyond what the
 * parsers did — so the falsification fixtures (C7) drive the SAME functions
 * the CLI runs. Every loud-failure string is string-equal to its design-
 * catalog row (asserted by verdict.test.ts's catalog-conformance cases).
 */

import {
  Parent,
  TasksFile,
  parentId,
  normalizedCriteria,
  parseTasksMd,
} from './tasks-md';
import {
  CompletionDoc,
  Row,
  normalizedClaimedCells,
  parseCompletionDoc,
} from './completion-doc';
import { isMaterialAmendment, canonicalSurface } from './materiality';
import { normalizeCell } from './normalize';

export type Verdict =
  | 'PASS'
  | 'SET_MISMATCH'
  | 'AV_SET_MISMATCH'
  | 'EVIDENCE_NONCOMPLIANT'
  | 'FORCED_NEGATIVE_MISSING'
  | 'AV_MISSING_OR_MALFORMED'
  | 'MALFORMATION'
  | 'NON_COMPLIANT_NO_DECLARATION'
  | 'MATERIAL_AMENDMENT_WITHOUT_DECLARATION'
  | 'RATIFICATION_RECORD_UNRESOLVABLE';

export interface Emission {
  kind:
    | 'declared-none-table-waiver'
    | 'exemption-honored'
    | 'av-deferral-declared'
    | 'completion-doc-not-found';
  detail: string;
}
// B-9: parity's OWN surface only — 'skipped-not-a-path' belongs to
// promised-artifact-exists when built; no 'rule-not-in-force' state exists (B-2).

export interface Finding {
  verdict: Exclude<Verdict, 'PASS'>;
  message: string;
  /** Structured multiset diff on SET_MISMATCH / AV_SET_MISMATCH — full
   *  normalized strings, both directions, so a fixture can pin the exact
   *  missing/unexpected sets (absorb ≠ drop; invent = unexpected-only). */
  diff?: { missing: string[]; extra: string[] };
}

export interface ParentResult {
  parent: string;
  findings: Finding[];
  emissions: Emission[];
}

/**
 * The emission text for a ticked parent with no completion doc (design C5/B-4):
 * a defined, named third state — not red (that would build Req 5.6's deferred
 * check by the back door), not silent (the forbidden dormancy).
 */
export const DOC_NOT_FOUND_EMISSION =
  "completion doc not found — not evaluated (doc presence is parent-completion-docs-present's surface, proposed/unbuilt; interim owner: the claims pass)";

/** Multiset difference: items of `a` not matched 1:1 in `b`. */
function multisetDiff(a: string[], b: string[]): string[] {
  const pool = [...b];
  const missing: string[] = [];
  for (const x of a) {
    const i = pool.indexOf(x);
    if (i >= 0) pool.splice(i, 1);
    else missing.push(x);
  }
  return missing;
}

/**
 * Link-shaped token for the ⚠️ follow-up MUST: a path token, an issue/PR
 * `#NNN` reference, a URL, or a `§`-anchored locatable-record citation
 * (`ballot § 8.1`) — the same locatable shapes the law admits as evidence.
 */
function hasLinkToken(e: string): boolean {
  return (
    /[\w.-]+(?:\/[\w.:*@$#-]+)+/.test(e) ||
    /#\d+/.test(e) ||
    /https?:\/\//.test(e) ||
    /§/.test(e)
  );
}

function evidenceFindings(
  rows: Row[],
  parent: Parent,
  label: 'criteria' | 'gate'
): Finding[] {
  const findings: Finding[] = [];
  for (const r of rows) {
    if (!r.claiming) continue;
    const name = `${r.criterion.slice(0, 60)}${r.criterion.length > 60 ? '…' : ''}`;
    if (r.evidence.trim() === '' || r.evidenceKind === 'empty-or-prose') {
      findings.push({
        verdict: 'EVIDENCE_NONCOMPLIANT',
        message: `parent ${parentId(parent)}: ${label} row "${name}" has an empty or prose-only Evidence cell`,
      });
    } else if (r.status === '⚠️' && !hasLinkToken(r.evidence)) {
      // The ⚠️ follow-up-link MUST (guide § Parent Success-Criteria Fidelity),
      // MECHANIZED BY PETER'S RULING (2026-09-19, U2 session — Stacy's
      // contested fixture `evidence-warn-row-without-followup`, disposition 1):
      // a ⚠️ row must link a tracking issue, follow-up task, or locatable
      // record; a link-less ⚠️ is a more polite ✅.
      findings.push({
        verdict: 'EVIDENCE_NONCOMPLIANT',
        message: `parent ${parentId(parent)}: ${label} row "${name}" is ⚠️ with no follow-up link (tracking issue, follow-up task, or locatable record)`,
      });
    }
  }
  return findings;
}

/**
 * The Req 2.5.3 predicate for one ticked parent of a declared per-parent spec.
 * `doc` is the parsed union of located completion docs, or undefined when none
 * was found.
 */
export function evaluateParent(
  parent: Parent,
  doc: CompletionDoc | undefined
): ParentResult {
  const id = parentId(parent);
  const findings: Finding[] = [];
  const emissions: Emission[] = [];

  const declaredNoneEarly = !Array.isArray(parent.criteria);
  // Req 2.2.2 — a tasks.md-SHAPE duty, independent of doc presence: a
  // recognized ticked parent in a declared spec with no well-formed block
  // fails loudly, never silently selects nothing (the dormancy defense).
  // An UNNUMBERED top-level checkbox (the 054a falsifier) is never a
  // criteria-owning parent unless a block follows it — it owes nothing.
  const blockNotFound =
    !declaredNoneEarly &&
    parent.form !== 'other' &&
    (parent.criteriaBlockLine === undefined ||
      (Array.isArray(parent.criteria) && parent.criteria.length === 0));
  if (blockNotFound) {
    findings.push({
      verdict: 'MALFORMATION',
      message: `declared per-parent, block not found for parent ${id}`,
    });
  }

  if (!doc) {
    emissions.push({ kind: 'completion-doc-not-found', detail: `parent ${id}: ${DOC_NOT_FOUND_EMISSION}` });
    return { parent: id, findings, emissions };
  }

  // Exemption adjudication first: a VALID fixed string waives the criteria
  // table (AV still owed — Req 1.6's same logic); a near-miss is loud.
  let tableWaivedByExemption = false;
  if (doc.exemption === 'valid') {
    tableWaivedByExemption = true;
    emissions.push({
      kind: 'exemption-honored',
      detail: `parent ${id}: fixed-string exemption honored (${doc.exemptionDate ?? 'undated'}) — criteria table waived`,
    });
  } else if (doc.exemption === 'malformed') {
    findings.push({
      verdict: 'MALFORMATION',
      message: `non-compliant exemption: not the fixed string 'Criteria fidelity: exempt — spec in flight at ratification (<date>)' (parent ${id})`,
    });
  }

  const declaredNone = !Array.isArray(parent.criteria);

  // ---- the criteria table ----
  if (!tableWaivedByExemption) {
    if (declaredNone) {
      // Declared-none waives the criteria table ONLY (B-3, Req 1.6). The doc
      // owes no table — but a doc CLAIMING criteria rows anyway claims against
      // an empty declared set, which is the invent class: expected = ∅.
      const reason = !Array.isArray(parent.criteria) ? parent.criteria.reason : '';
      emissions.push({
        kind: 'declared-none-table-waiver',
        detail: `parent ${id}: **Success Criteria:** none — ${reason} — criteria table waived (AV duties evaluated)`,
      });
      const claimed = normalizedClaimedCells(doc.rows);
      if (claimed.length > 0) {
        findings.push({
          verdict: 'SET_MISMATCH',
          message: `parent ${id}: declared-none parent claims ${claimed.length} criteria row(s) — expected none`,
        });
      }
    } else {
      const expected = normalizedCriteria(parent);
      if (expected.length === 0) {
        // block-not-found already reported above (shape duty); nothing to
        // compare — and for an unnumbered non-owning parent, nothing owed.
      } else {
        const claimed = normalizedClaimedCells(doc.rows);
        const missing = multisetDiff(expected, claimed);
        const extra = multisetDiff(claimed, expected);
        if (missing.length > 0 || extra.length > 0) {
          const parts: string[] = [];
          if (missing.length) parts.push(`missing from doc: ${missing.map((m) => JSON.stringify(m.slice(0, 80))).join('; ')}`);
          if (extra.length) parts.push(`not in tasks.md: ${extra.map((m) => JSON.stringify(m.slice(0, 80))).join('; ')}`);
          findings.push({
            verdict: 'SET_MISMATCH',
            message: `parent ${id}: criteria set mismatch — ${parts.join(' | ')}`,
            diff: { missing, extra },
          });
        }
        findings.push(...evidenceFindings(doc.rows, parent, 'criteria'));
        // Forced-negative line rides with the table duty (Req 1.4/1.6).
        if (!doc.forcedNegative) {
          findings.push({
            verdict: 'FORCED_NEGATIVE_MISSING',
            message: `parent ${id}: forced-negative line 'Unmet or partially met criteria:' not found`,
          });
        }
      }
    }
  }

  // ---- Additional verification (Req 1.5; B-3: same predicate, never shape-only) ----
  const avOwed = parent.primaryArtifacts.length > 0 || parent.mergeGate.length > 0;
  if (avOwed) {
    if (!doc.av?.present) {
      findings.push({
        verdict: 'AV_MISSING_OR_MALFORMED',
        message: `parent ${id}: 'Additional verification' section owed (parent declares ${parent.primaryArtifacts.length ? '**Primary Artifacts:**' : ''}${parent.primaryArtifacts.length && parent.mergeGate.length ? ' and ' : ''}${parent.mergeGate.length ? '**Merge gate:**' : ''}) but not found`,
      });
    } else {
      // Gate rows under THE SAME predicate: multiset verbatim-cell equality of
      // Condition cells against the parent's **Merge gate:** bullets.
      const expectedNorm = parent.mergeGate.map((g) => normalizeCell(g));
      const claimedGate = normalizedClaimedCells(doc.av.gateRows);
      const missing = multisetDiff(expectedNorm, claimedGate);
      const extra = multisetDiff(claimedGate, expectedNorm);
      if (missing.length > 0 || extra.length > 0) {
        const parts: string[] = [];
        if (missing.length) parts.push(`missing from doc: ${missing.map((m) => JSON.stringify(m.slice(0, 80))).join('; ')}`);
        if (extra.length) parts.push(`not in tasks.md: ${extra.map((m) => JSON.stringify(m.slice(0, 80))).join('; ')}`);
        findings.push({
          verdict: 'AV_SET_MISMATCH',
          message: `parent ${id}: merge-gate condition set mismatch — ${parts.join(' | ')}`,
          diff: { missing, extra },
        });
      }
      findings.push(...evidenceFindings(doc.av.gateRows, parent, 'gate'));

      // Primary-Artifacts forced-negative line, owed when the parent declares artifacts.
      if (parent.primaryArtifacts.length > 0 && !doc.av.artifactLine) {
        findings.push({
          verdict: 'AV_MISSING_OR_MALFORMED',
          message: `parent ${id}: 'Primary Artifacts:' forced-negative line owed but not found in the Additional-verification section`,
        });
      }

      for (let i = 0; i < doc.av.malformedDeferrals.length; i++) {
        findings.push({
          verdict: 'MALFORMATION',
          message: `malformed deferral: not the fixed form 'Artifact deferred: <path> → <unit>'`,
        });
      }
      for (const d of doc.av.deferrals) {
        // Informational — parsed AV content in the manifest; exclusion
        // semantics belong to promised-artifact-exists when built (B-9).
        emissions.push({ kind: 'av-deferral-declared', detail: `parent ${id}: Artifact deferred: ${d.path} → ${d.unit}` });
      }
    }
  }

  return { parent: id, findings, emissions };
}

export interface SpecResult {
  spec: string;
  mode: 'per-parent' | 'spec-level' | 'legacy' | 'non-compliant-no-declaration';
  findings: Finding[]; // spec-level findings (malformations, declaration duty)
  parents: ParentResult[];
  associations: string[]; // `parent N ← block at line L` (Req 2.4.2)
}

/**
 * Mode resolution (DD2): declaration governs when present; otherwise the
 * authorship date against the ratification date. Day granularity cannot order
 * same-day events, so a same-day undeclared file classifies LEGACY — the
 * merge-boundary residual DD2 records; the next PR touching it, or the claims
 * pass, catches it.
 */
export function resolveMode(
  declared: TasksFile['declaredMode'],
  authoredAt: string | undefined,
  ratifiedAt: string
): SpecResult['mode'] {
  if (declared) return declared;
  if (authoredAt && authoredAt > ratifiedAt) return 'non-compliant-no-declaration';
  return 'legacy';
}

/**
 * Evaluate one spec's tasks.md (already parsed) with its located completion
 * docs (a lookup the CLI provides; fixtures provide it inline).
 */
export function evaluateSpec(
  tasks: TasksFile,
  mode: SpecResult['mode'],
  locateDoc: (parent: Parent) => CompletionDoc | undefined
): SpecResult {
  const findings: Finding[] = [];
  const parents: ParentResult[] = [];
  const associations: string[] = [];

  if (mode === 'non-compliant-no-declaration') {
    findings.push({
      verdict: 'NON_COMPLIANT_NO_DECLARATION',
      message: `non-compliant tasks.md: authored post-ratification without a criteria-mode declaration`,
    });
    return { spec: tasks.spec, mode, findings, parents, associations };
  }
  if (mode !== 'per-parent') {
    return { spec: tasks.spec, mode, findings, parents, associations };
  }

  const poisoned = new Set<number>();
  for (const m of tasks.malformations) {
    findings.push({ verdict: 'MALFORMATION', message: m.message });
    if (m.parentLine !== undefined) poisoned.add(m.parentLine);
  }

  for (const p of tasks.parents) {
    if (p.criteriaBlockLine !== undefined) {
      associations.push(`parent ${parentId(p)} ← block at line ${p.criteriaBlockLine}`);
    }
    if (!p.ticked) continue;
    // A parent poisoned by a criteria-block malformation has NO computed
    // promise set — evaluating a fabricated one would assert parity against
    // fiction (Req 2.2.2's "never silently select nothing"); the malformation
    // finding above is the loud failure.
    if (poisoned.has(p.line)) continue;
    parents.push(evaluateParent(p, locateDoc(p)));
  }

  return { spec: tasks.spec, mode, findings, parents, associations };
}

/**
 * Diff-scoped duties (Req 6.3), evaluated for one changed LEGACY tasks.md:
 * material amendment (2.3's canonical-form comparison) without the declaration
 * added in the same change → red, canonical-form diff attached.
 */
export function evaluateAmendment(
  baseText: string | undefined,
  headText: string
): Finding | undefined {
  if (baseText === undefined) return undefined; // new file — authorship duty, not amendment duty
  const head = parseTasksMd(headText);
  if (head.declaredMode) return undefined; // declaration added/present = the opt-in path
  if (!isMaterialAmendment(baseText, headText)) return undefined;
  const before = canonicalSurface(baseText);
  const after = canonicalSurface(headText);
  let i = 0;
  while (i < Math.min(before.length, after.length) && before[i] === after[i]) i++;
  const ctx = (s: string) => s.slice(Math.max(0, i - 60), i + 120);
  return {
    verdict: 'MATERIAL_AMENDMENT_WITHOUT_DECLARATION',
    message:
      `material amendment without criteria-mode declaration (canonical-form diff attached)\n` +
      `  base: …${ctx(before)}…\n  head: …${ctx(after)}…`,
  };
}

/**
 * Ratification-record read (design C5/B-2, DD2): the machine line at the
 * ballot's pinned path, parsed by ONE regex, never prose. Absent file,
 * absent line, or an ambiguous multiple → LOUD RED. No vacuous-green state
 * exists by construction.
 */
export const RATIFICATION_BALLOT_PATH =
  '.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md';
export const RATIFIED_MACHINE_RE = /^Ratified-machine: (\d{4}-\d{2}-\d{2})$/gm;

export function parseRatificationRecord(
  ballotText: string | undefined,
  ballotPath: string
): { date: string } | Finding {
  const red: Finding = {
    verdict: 'RATIFICATION_RECORD_UNRESOLVABLE',
    message: `cannot resolve ratification record at ${ballotPath}`,
  };
  if (ballotText === undefined) return red;
  const matches = [...ballotText.matchAll(RATIFIED_MACHINE_RE)];
  if (matches.length !== 1) return red;
  return { date: matches[0][1] };
}

/**
 * The fixture coverage floor (C7/B-8): red by construction on an empty or
 * thin set. Returns the manifest classes with zero fixtures; the suite fails
 * on a non-empty return — including, by a standing test, when the fixture set
 * is empty (Stacy A-5: reconstructible from the shipped tree).
 */
export function uncoveredClasses(
  manifestClasses: string[],
  fixtureClasses: string[]
): string[] {
  const covered = new Set(fixtureClasses);
  return manifestClasses.filter((c) => !covered.has(c));
}

// Re-exports so the fixture runner and CLI have one import surface.
export { parseTasksMd } from './tasks-md';
export { parseCompletionDoc, parseCompletionDocs, locateCompletionDocs } from './completion-doc';

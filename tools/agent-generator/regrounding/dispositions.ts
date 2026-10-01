/**
 * The dispositions schema — Spec 123 Task 13.1 (design C17; Reqs 11.2, 11.3.6, 11.5; DD19,
 * DD25, DD26).
 *
 * A consumer-profile dispositions file declares, per canonical unit or entry, WHERE ITS FUNCTION
 * WENT in the consumer rendering. Three file kinds share this one schema (design C17, C19):
 *
 *   canonical/profiles/consumer/<agent>.dispositions.yaml      body: + frontmatter:
 *   canonical/profiles/consumer/_shared.dispositions.yaml      members: (shared-catalog ids)
 *   canonical/profiles/consumer/always-set/<id>.dispositions.yaml   body: (+ counterpart:, C19)
 *
 * ```yaml
 * source: canonical/agents/stacy.md            # the canonical file whose units/entries are keyed
 * body:
 *   "#the-owed-set-pipeline":                  # a partition() anchor (C13)
 *     disposition: re-pointed
 *     destination: "#the-owed-set-pipeline"
 *     removals: [ { text: "…", cites: subtraction-1 } ]
 *     signature: { … }                         # format + checks: Task 13.2 / 13.3
 *   "#identity": { disposition: retained }     # EXPLICIT — never implied by absence (DD25)
 * frontmatter:                                 # entryTree() LEAF paths (C13, DD26)
 *   "writeScope[.kiro/specs/**]": { disposition: no-consumer-counterpart, cites: subtraction-4 }
 *   "ambient[process-development-workflow#task-completion-workflow]": { disposition: retained }
 * ```
 *
 * THE FOUR PROPERTIES THIS SUBTASK OWNS (tasks.md 13.1):
 *   1. EXPLICIT ROWS — every row writes its term; `retained` is a term, not a default. A row
 *      with no `disposition:` is refused. (That every unit HAS a row is the missing-row refusal,
 *      Task 13.5 — this schema never reads absence as anything.)
 *   2. PER-MEMBER FRONTMATTER — a frontmatter key must name an entry-tree LEAF (a scalar leaf
 *      or a list member). A key naming a list or map is refused: its members are the rows (DD26).
 *      Checked when the caller supplies the canonical entry tree; a key naming NOTHING is the
 *      orphaned-key refusal (Task 13.5), not this one.
 *   3. NO RE-POINTED EMBEDS — an ambient embed (`ambient[…]`) takes retained | superseded-by |
 *      no-consumer-counterpart, never re-pointed (DD19).
 *   4. THE REJECTED TERM — `repo-bound-in-entirety` emits its own named error (Req 11.2.2),
 *      never the unknown-term error. It is one of Task 13's nine checks (check-catalog.ts).
 *
 * Row fields by term (the vocabulary names a DESTINATION — Req 11.2.1; design-outline § "The
 * vocabulary defect", whose table has `superseded-by` name the section that provides the
 * function):
 *
 *   term                     destination   removals   cites
 *   retained                 —             —          —
 *   re-pointed               required      allowed    —      (removal cites live per removal)
 *   superseded-by            required      —          allowed
 *   no-consumer-counterpart  —             —          allowed
 *
 * `signature` (any row) is format-checked through signatures.ts, which also runs the BARE check
 * (context-free, so it cannot be skipped). The STALE and SIGNER checks need current hashes and
 * owners, so they are separate calls (`checkSignatureFreshness`, `checkDispositionSigners`). `cites` values are `subtraction-1` … `subtraction-5`
 * (Req 11.1.2's five SUBTRACT bullets); whether a citation APPLIES is clause (iii), not this.
 *
 * WHAT THIS DOES NOT ESTABLISH: completeness (missing rows) or key currency (orphans) — 13.5;
 * that a destination derives from its source — 11.4's checker (Task 14); that a removal
 * citation applies — clause (iii); signature freshness or signer (separate calls, above).
 *
 * Traces to: Req 11.2.1–11.2.3, 11.3.3, 11.3.6; design C13, C17, DD19, DD25, DD26.
 */

import { load as loadYaml } from 'js-yaml';
import type { EntryTree } from '../partition';
import type { Disposition as SpanDisposition } from '../spans';
import { REJECTED_TERM_MESSAGE } from './check-catalog';
import { validateSignatureFormat } from './signatures';

// ============================================================================
// Vocabulary
// ============================================================================

/** The closed vocabulary (Req 11.2.1 + `retained`; design § "Data Models"). */
export const DISPOSITION_TERMS = Object.freeze(['retained', 're-pointed', 'superseded-by', 'no-consumer-counterpart'] as const);
export type Disposition = (typeof DISPOSITION_TERMS)[number];

// One vocabulary: spans.ts reads a subset type ("Task 13.1 owns the schema"); they must agree.
type Same<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
const vocabularyMatchesSpans: Same<Disposition, SpanDisposition> = true;
void vocabularyMatchesSpans;

/** The named rejected term (Req 11.2.2) — deliberately NOT in the vocabulary. */
export const REJECTED_TERM = 'repo-bound-in-entirety';

/** Terms an ambient embed may take (DD19). */
export const EMBED_TERMS: readonly Disposition[] = Object.freeze(['retained', 'superseded-by', 'no-consumer-counterpart']);

/** Req 11.1.2's five SUBTRACT bullets. */
export const SUBTRACTION_CITES = Object.freeze([
  'subtraction-1',
  'subtraction-2',
  'subtraction-3',
  'subtraction-4',
  'subtraction-5',
] as const);
export type SubtractionCite = (typeof SUBTRACTION_CITES)[number];

export const SHARED_CATALOG = 'canonical/shared/shared-catalog.yaml';

/** True iff a frontmatter entry path is an ambient embed (the same predicate spans.ts uses). */
export const isEmbedPath = (path: string): boolean => path.startsWith('ambient[');

// ============================================================================
// Shapes
// ============================================================================

export interface Removal {
  /** The removed text (clause (iii)'s block). */
  text: string;
  cites: SubtractionCite;
}

export interface DispositionRow {
  disposition: Disposition;
  /** Where the function went — a body anchor or `frontmatter:<path>` (re-pointed, superseded-by). */
  destination?: string;
  /** Blocks removed from a re-pointed unit, each with its authorizing clause. */
  removals?: Removal[];
  /** The authorizing clause for a whole-unit removal (superseded-by, no-consumer-counterpart). */
  cites?: SubtractionCite;
  /** signatures.ts `Signature` — format-checked on validation. */
  signature?: unknown;
}

export type RowSection = 'body' | 'frontmatter' | 'members';
export const ROW_SECTIONS: readonly RowSection[] = Object.freeze(['body', 'frontmatter', 'members']);

export interface DispositionsFile {
  /** Repo-relative canonical path the rows key into. */
  source: string;
  /** Always-set files only (C19): the shipped counterpart — the identity doc, or its template. */
  counterpart?: string;
  /** Keyed by partition() anchor. */
  body?: Record<string, DispositionRow>;
  /** Keyed by entryTree() leaf path. */
  frontmatter?: Record<string, DispositionRow>;
  /** Keyed by shared-catalog member id (source = the shared catalog). */
  members?: Record<string, DispositionRow>;
}

const ROW_FIELDS = Object.freeze(['disposition', 'destination', 'removals', 'cites', 'signature']);
const FILE_FIELDS = Object.freeze(['source', 'counterpart', ...ROW_SECTIONS]);

const APPLIES: Readonly<Record<Disposition, { destination: boolean; removals: boolean; cites: boolean }>> = {
  retained: { destination: false, removals: false, cites: false },
  're-pointed': { destination: true, removals: true, cites: false },
  'superseded-by': { destination: true, removals: false, cites: true },
  'no-consumer-counterpart': { destination: false, removals: false, cites: true },
};

// ============================================================================
// Findings
// ============================================================================

export type SchemaCheckId =
  | 'repo-bound-in-entirety' // one of Task 13's nine
  | 'unknown-term'
  | 'no-term'
  | 'missing-destination'
  | 'field-not-applicable'
  | 'unknown-field'
  | 'bad-cite'
  | 'bad-removal'
  | 'container-key'
  | 're-pointed-embed'
  | 'file-shape'
  | 'bare-signature' // one of Task 13's nine (signatures.ts)
  | 'signature-format';

export interface DispositionFinding {
  check: SchemaCheckId;
  file: string;
  /** `<section> <key>` when the finding is about one row. */
  row?: string;
  message: string;
}

export class DispositionsError extends Error {
  constructor(readonly findings: readonly DispositionFinding[]) {
    super(findings.map(formatFinding).join('\n'));
    this.name = 'DispositionsError';
  }
}

export const formatFinding = (f: DispositionFinding): string => `${f.file}${f.row ? ` [${f.row}]` : ''}: ${f.message}`;

export interface ValidationContext {
  /** The canonical frontmatter's entry tree — enables the per-member (container-key) check. */
  entries?: EntryTree;
  /** Body anchor → the unit's operative-set item ids — lets a signature's surviving ids be checked. */
  operativeItems?: Readonly<Record<string, readonly string[]>>;
}

// ============================================================================
// Validation
// ============================================================================

const isMap = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isCite = (v: unknown): v is SubtractionCite => typeof v === 'string' && (SUBTRACTION_CITES as readonly string[]).includes(v);
const isTerm = (v: unknown): v is Disposition => typeof v === 'string' && (DISPOSITION_TERMS as readonly string[]).includes(v);

/** Validate a parsed dispositions document. Returns every finding (empty = valid). */
export function validateDispositions(doc: unknown, file: string, context: ValidationContext = {}): DispositionFinding[] {
  const findings: DispositionFinding[] = [];
  const fileFinding = (message: string): void => {
    findings.push({ check: 'file-shape', file, message: `${file}: ${message}` });
  };

  if (!isMap(doc)) {
    fileFinding('a dispositions file is a mapping (source:, then body: / frontmatter: / members:)');
    return findings;
  }
  for (const key of Object.keys(doc)) {
    if (!FILE_FIELDS.includes(key)) {
      fileFinding(`unknown top-level key '${key}' — allowed: ${FILE_FIELDS.join(', ')}`);
    }
  }
  const source = doc.source;
  if (typeof source !== 'string' || source.length === 0) {
    fileFinding('names no source: — the canonical file its rows key into');
  }
  if (doc.counterpart !== undefined && (typeof doc.counterpart !== 'string' || doc.counterpart.length === 0)) {
    fileFinding('counterpart: must be a repo-relative path');
  }
  const shared = source === SHARED_CATALOG;
  if (doc.members !== undefined && !shared) {
    fileFinding(`members: rows apply only to the shared catalog (source: ${SHARED_CATALOG})`);
  }
  if (shared && (doc.body !== undefined || doc.frontmatter !== undefined)) {
    fileFinding('the shared catalog is keyed by member id — use members:, not body: / frontmatter:');
  }

  for (const section of ROW_SECTIONS) {
    const rows = doc[section];
    if (rows === undefined) continue;
    if (!isMap(rows)) {
      fileFinding(`${section}: must be a mapping of key → row`);
      continue;
    }
    for (const [key, row] of Object.entries(rows)) {
      validateRow(section, key, row, file, context, findings);
    }
  }
  return findings;
}

function validateRow(
  section: RowSection,
  key: string,
  row: unknown,
  file: string,
  context: ValidationContext,
  findings: DispositionFinding[]
): void {
  const at = `${section} ${key}`;
  const push = (check: SchemaCheckId, message: string): void => {
    findings.push({ check, file, row: at, message });
  };

  if (section === 'frontmatter' && context.entries) {
    const node = context.entries.get(key);
    if (node && node.kind !== 'leaf') {
      push(
        'container-key',
        `frontmatter key ${key} in ${file} names a ${node.kind} — list- and map-valued fields are keyed per member (e.g. writeScope[<glob>]); only scalar leaves are atomic`
      );
    }
    // node === undefined → the orphaned-key refusal (Task 13.5), not this check.
  }

  if (!isMap(row) || row.disposition === undefined || row.disposition === null) {
    push('no-term', `row ${key} in ${file} names no disposition — every row writes its term explicitly ('retained' if it ships as-is)`);
    return;
  }

  for (const field of Object.keys(row)) {
    if (!ROW_FIELDS.includes(field)) {
      push('unknown-field', `row ${key} in ${file} carries unknown field '${field}' — allowed: ${ROW_FIELDS.join(', ')}`);
    }
  }

  if (row.signature !== undefined) {
    const items = section === 'body' ? context.operativeItems?.[key] : undefined;
    for (const f of validateSignatureFormat(row.signature, key, items)) {
      push(f.check === 'bare-signature' ? 'bare-signature' : 'signature-format', f.message);
    }
  }

  const term = row.disposition;
  if (term === REJECTED_TERM) {
    push('repo-bound-in-entirety', REJECTED_TERM_MESSAGE);
    return;
  }
  if (!isTerm(term)) {
    push(
      'unknown-term',
      `disposition '${String(term)}' on ${key} in ${file} is not in the vocabulary — use ${DISPOSITION_TERMS.join(', ')}`
    );
    return;
  }

  if (section === 'frontmatter' && isEmbedPath(key) && !EMBED_TERMS.includes(term)) {
    push(
      're-pointed-embed',
      `ambient embed ${key} in ${file} cannot be re-pointed — re-grounding an embedded governance section edits its owner's doc; use ${EMBED_TERMS.join(', ')} (DD19)`
    );
  }

  const applies = APPLIES[term];
  const notApplicable = (field: string): void => push('field-not-applicable', `row ${key} in ${file}: '${field}' does not apply to a ${term} row`);

  if (applies.destination) {
    if (typeof row.destination !== 'string' || row.destination.length === 0) {
      push('missing-destination', `row ${key} in ${file} is ${term} but names no destination — the term says where the function went (destination:)`);
    }
  } else if (row.destination !== undefined) {
    notApplicable('destination');
  }

  if (row.cites !== undefined) {
    if (!applies.cites) notApplicable('cites');
    else if (!isCite(row.cites)) push('bad-cite', badCite(key, file, row.cites));
  }

  if (row.removals !== undefined) {
    if (!applies.removals) notApplicable('removals');
    else if (!Array.isArray(row.removals)) {
      push('bad-removal', `row ${key} in ${file}: removals must be a list of { text, cites }`);
    } else {
      row.removals.forEach((removal, i) => {
        if (!isMap(removal) || typeof removal.text !== 'string' || removal.text.length === 0) {
          push('bad-removal', `row ${key} in ${file}: removals[${i}] carries no text`);
          return;
        }
        for (const field of Object.keys(removal)) {
          if (field !== 'text' && field !== 'cites') {
            push('bad-removal', `row ${key} in ${file}: removals[${i}] carries unknown field '${field}' — allowed: text, cites`);
          }
        }
        if (!isCite(removal.cites)) push('bad-cite', badCite(`${key} removals[${i}]`, file, removal.cites));
      });
    }
  }
}

const badCite = (where: string, file: string, value: unknown): string =>
  `row ${where} in ${file}: cites '${String(value)}' is not a subtraction clause — use ${SUBTRACTION_CITES.join(', ')} (Req 11.1.2)`;

/** Parse a dispositions YAML file's text (no validation). */
export function parseDispositions(yamlText: string): unknown {
  return loadYaml(yamlText);
}

/** Parse and validate; throws {@link DispositionsError} carrying every finding. */
export function loadDispositions(yamlText: string, file: string, context: ValidationContext = {}): DispositionsFile {
  const doc = parseDispositions(yamlText);
  const findings = validateDispositions(doc, file, context);
  if (findings.length > 0) throw new DispositionsError(findings);
  return doc as DispositionsFile;
}

/**
 * tasks-md.ts — the `tasks.md` parser (Spec 127, design C2; Reqs 2.1, 2.2, 2.4;
 * lifecycle amendment T2-b).
 *
 * Parses one `tasks.md` into a `TasksFile`. The parser is STRICT — the frozen
 * grammar for declared specs. Legacy-form tolerance lives only where CLOSEOUT
 * needs it (the units-block fallback, DD7) and in the materiality extractor's
 * deliberately GENEROUS, independent pattern set (materiality.ts).
 */

import { normalizeCell } from './normalize';

export type Mode =
  | 'per-parent'
  | 'spec-level'
  | 'legacy'
  | 'non-compliant-no-declaration';

export interface Malformation {
  line: number;
  /** Exact loud-failure catalog string (design § Error Handling). */
  message: string;
  /**
   * The top-level parent line this malformation poisons, when it has one.
   * A poisoned parent has NO computed promise set (Req 2.2's "never silently
   * select nothing") — the verdict layer skips its evaluation entirely.
   */
  parentLine?: number;
}

export interface Parent {
  line: number;
  /** Parent-line form — recognition exists only to CLASSIFY the line (C2.2). */
  form: 'plain' | 'bold' | 'task-label' | 'other';
  /** Parent number as written (e.g. "1", "2a"); undefined for unnumbered. */
  number?: string;
  ticked: boolean;
  raw: string;
  criteria: string[] | { none: true; reason: string };
  /** Line of the associated criteria block's label (association manifest, Req 2.4.2). */
  criteriaBlockLine?: number;
  primaryArtifacts: { raw: string; path?: string; notAPath?: boolean }[];
  mergeGate: string[];
}

export interface UnitsBlock {
  line: number;
  form: 'canonical-heading' | 'bold-prose' | 'merge-unit-heading';
  raw: string;
}

export interface TasksFile {
  spec: string;
  /** The declared mode line, if present (mode resolution needs dates — verdict.ts). */
  declaredMode?: 'per-parent' | 'spec-level';
  parents: Parent[];
  unitsBlock?: UnitsBlock;
  malformations: Malformation[];
}

/** `**Criteria mode**: per-parent | spec-level` — house metadata style (Req 2.1.1). */
const MODE_RE = /^\*\*Criteria mode\*\*:\s*(per-parent|spec-level)\s*$/;

/** A checkbox line at any indent opens an association scope (Req 2.4.1). */
const CHECKBOX_RE = /^(\s*)- \[( |x|X)\] (.*)$/;

/** Frozen criteria label: colon inside the bold, any leading indentation (Req 2.2.1). */
const CRITERIA_LABEL_RE = /^\s*\*\*Success Criteria:\*\*\s*(.*)$/;

/** Declared-none: `**Success Criteria:** none — <one-line reason>` (Req 2.2.4). */
const NONE_RE = /^none\s*—\s*(.+)$/;

/**
 * Closed promise-block vocabulary (Req 1.5). Both labels are recognized in the
 * label-then-bullets form AND the inline form (`**Primary Artifacts:** \`a\`,
 * \`b\``) — the trailing capture is empty for the former. (Fix 2026-09-26, D2:
 * the `\s*$` anchoring silently missed Spec 123's inline form on all 28
 * parents, so none of them owed Additional verification.)
 */
const PRIMARY_ARTIFACTS_RE = /^\s*\*\*Primary Artifacts:\*\*(.*)$/;
const MERGE_GATE_RE = /^\s*\*\*Merge gate:\*\*(.*)$/;

/** A heading or thematic break — a structural boundary that ends any block. */
const HEADING_RE = /^#{1,6}\s/;
const THEMATIC_BREAK_RE = /^\s{0,3}(?:-\s*){3,}$|^\s{0,3}(?:\*\s*){3,}$|^\s{0,3}(?:_\s*){3,}$/;

/**
 * Split an inline Primary Artifacts list on TOP-LEVEL commas only — commas
 * inside backticks, braces, parentheses or brackets belong to the entry
 * (`src/cli/sync/{FileScanner,Classifier}.ts`, `index.ts` (StalenessGate, x)).
 */
function splitInlineList(text: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let inTick = false;
  let cur = '';
  for (const ch of text) {
    if (ch === '`') inTick = !inTick;
    else if (!inTick && (ch === '{' || ch === '(' || ch === '[')) depth++;
    else if (!inTick && (ch === '}' || ch === ')' || ch === ']')) depth = Math.max(0, depth - 1);
    if (ch === ',' && !inTick && depth === 0) {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((e) => e.trim()).filter(Boolean);
}

/**
 * Parent-line form classification (C2.2): plain-numbered, bold-numbered, and
 * `Task N: … (Parent)`. Recognition exists only to classify — an unnumbered
 * top-level checkbox associates like any other and is simply never a
 * criteria-owning parent unless a criteria block follows it (the 054a falsifier).
 */
function classifyParentLine(body: string): { form: Parent['form']; number?: string } {
  let m = body.match(/^(\d+[a-z]?)[.)]\s/);
  if (m) return { form: 'plain', number: m[1] };
  m = body.match(/^\*\*(\d+[a-z]?)[.)]?\s/);
  if (m) return { form: 'bold', number: m[1] };
  m = body.match(/^Task (\d+[a-z]?):.*\(Parent\)/);
  if (m) return { form: 'task-label', number: m[1] };
  return { form: 'other' };
}

/** A path-like token: contains `/` between word-ish segments (C2.4 — scan ANYWHERE in the bullet). */
const PATH_RE = /(?:^|[\s`("'])((?:\.{0,2}\/)?[\w.@$-]+(?:\/[\w.@$*{}[\]-]+)+\/?)/;
/** A bare repo filename with a known source extension (`package.json (modified)`). */
const BARE_FILE_RE =
  /(?:^|[\s`("'])([\w-]+\.(?:md|ts|tsx|js|mjs|cjs|json|ya?ml|sh|css|swift|kt|html|txt|lock))\b/;

function extractArtifactEntry(raw: string): Parent['primaryArtifacts'][number] {
  const m = raw.match(PATH_RE) ?? raw.match(BARE_FILE_RE);
  if (m) return { raw, path: m[1] };
  return { raw, notAPath: true };
}

/** Units-block recognition in strict precedence order (C2.5, B-7). */
const CANONICAL_UNITS_RE = /^## Declared Merge Units\b/;
const BOLD_PROSE_UNITS_RE = /^\*\*Merge units \(/i;
const MERGE_UNIT_HEADING_RE = /^#{1,6} .*merge unit/i;

/**
 * Bullet at any indent (used for criteria/artifact/gate bodies). Continuation
 * lines (non-bullet, non-blank, non-label, non-checkbox) fold into the previous
 * bullet; Req 2.5's normalization then absorbs the reflow.
 */
const BULLET_RE = /^\s*- (.*)$/;

export function parseTasksMd(text: string, spec = ''): TasksFile {
  const lines = text.split('\n');
  const malformations: Malformation[] = [];
  const parents: Parent[] = [];

  // ---- mode declaration: header block only (before the first checkbox line) ----
  let declaredMode: TasksFile['declaredMode'];
  for (const line of lines) {
    if (CHECKBOX_RE.test(line)) break;
    const m = line.match(MODE_RE);
    if (m) {
      declaredMode = m[1] as 'per-parent' | 'spec-level';
      break;
    }
  }

  // ---- units block (strict precedence order — B-7) ----
  let unitsBlock: UnitsBlock | undefined;
  const findUnits = (re: RegExp, form: UnitsBlock['form']) => {
    for (let i = 0; i < lines.length; i++) {
      if (re.test(lines[i])) return { line: i + 1, form, raw: lines[i] };
    }
    return undefined;
  };
  unitsBlock =
    findUnits(CANONICAL_UNITS_RE, 'canonical-heading') ??
    findUnits(BOLD_PROSE_UNITS_RE, 'bold-prose') ??
    findUnits(MERGE_UNIT_HEADING_RE, 'merge-unit-heading');

  // ---- walk: checkboxes open association scopes; blocks attach to the nearest
  //      preceding checkbox at ANY indent (Req 2.4.1) ----
  interface Scope {
    line: number;
    topLevel: boolean;
    parent?: Parent;
  }
  let currentScope: Scope | undefined;
  // Criteria blocks keyed by the checkbox line they associate to — for the
  // two-blocks-one-parent malformation (Req 2.4.1).
  const blocksByScope = new Map<number, number[]>();

  type Collector =
    | { kind: 'criteria'; parent: Parent; labelLine: number }
    | { kind: 'artifacts'; parent: Parent }
    | { kind: 'gate'; parent: Parent }
    | undefined;
  let collector: Collector;
  let lastBullet: { list: string[] } | undefined;

  const pushBullet = (list: string[], content: string) => {
    list.push(content);
    lastBullet = { list };
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;

    const cb = line.match(CHECKBOX_RE);
    if (cb) {
      collector = undefined;
      lastBullet = undefined;
      const topLevel = cb[1].length === 0;
      if (topLevel) {
        const { form, number } = classifyParentLine(cb[3]);
        const parent: Parent = {
          line: lineNo,
          form,
          number,
          ticked: cb[2] !== ' ',
          raw: line,
          criteria: [],
          primaryArtifacts: [],
          mergeGate: [],
        };
        parents.push(parent);
        currentScope = { line: lineNo, topLevel: true, parent };
      } else {
        currentScope = { line: lineNo, topLevel: false };
      }
      continue;
    }

    const crit = line.match(CRITERIA_LABEL_RE);
    if (crit) {
      collector = undefined;
      lastBullet = undefined;
      if (!currentScope) {
        malformations.push({
          line: lineNo,
          message: `malformed association: criteria block at line ${lineNo} precedes every checkbox`,
        });
        continue;
      }
      const seen = blocksByScope.get(currentScope.line) ?? [];
      seen.push(lineNo);
      blocksByScope.set(currentScope.line, seen);
      if (seen.length > 1 && currentScope.parent) {
        malformations.push({
          line: lineNo,
          message: `malformed association: two criteria blocks associate to parent ${parentId(currentScope.parent)} (lines ${seen[0]}, ${seen[1]})`,
          parentLine: currentScope.parent.line,
        });
        collector = undefined;
        lastBullet = undefined;
        continue;
      }
      // The parent rule keeps only blocks whose associated line is TOP-LEVEL.
      if (!currentScope.topLevel || !currentScope.parent) continue;
      const parent = currentScope.parent;
      parent.criteriaBlockLine = lineNo;
      const trailing = crit[1].trim();
      if (trailing) {
        const none = trailing.match(NONE_RE);
        if (none) {
          parent.criteria = { none: true, reason: none[1].trim() };
          // `none` + bullets is a loud malformation — collect bullets to detect it.
          collector = { kind: 'criteria', parent, labelLine: lineNo };
          continue;
        }
      }
      collector = { kind: 'criteria', parent, labelLine: lineNo };
      continue;
    }

    const pa = line.match(PRIMARY_ARTIFACTS_RE);
    if (pa) {
      collector = currentScope?.topLevel && currentScope.parent
        ? { kind: 'artifacts', parent: currentScope.parent }
        : undefined;
      lastBullet = undefined;
      // Inline form: the list is on the label line. Extraction is safe here —
      // the verdict layer reads only presence (the AV duty) and the unbuilt
      // promised-artifact-exists reads paths; any bullets that follow still
      // collect below.
      const inline = pa[1].trim();
      if (collector && inline) {
        for (const entry of splitInlineList(inline)) {
          collector.parent.primaryArtifacts.push(extractArtifactEntry(entry));
        }
      }
      continue;
    }
    const gate = line.match(MERGE_GATE_RE);
    if (gate) {
      const owner = currentScope?.topLevel ? currentScope.parent : undefined;
      collector = owner ? { kind: 'gate', parent: owner } : undefined;
      lastBullet = undefined;
      if (owner && gate[1].trim()) {
        // Inline gate conditions are NOT extracted: each condition is a
        // verbatim-matched row (Req 1.5, same predicate as 2.5), and splitting
        // prose into conditions would be a guess. Loud, never silent.
        malformations.push({
          line: lineNo,
          message: `malformed promise block: inline '**Merge gate:**' conditions at line ${lineNo} (parent ${parentId(owner)}) — gate conditions must be bullets`,
          parentLine: owner.line,
        });
        collector = undefined;
      }
      continue;
    }

    if (!collector) continue;

    if (line.trim() === '') {
      // Blank lines inside a block are tolerated, but a blank ends the
      // previous bullet: a non-bullet line after it is never a continuation.
      lastBullet = undefined;
      continue;
    }

    if (HEADING_RE.test(line) || THEMATIC_BREAK_RE.test(line)) {
      collector = undefined;
      lastBullet = undefined;
      continue;
    }

    const bullet = line.match(BULLET_RE);
    if (bullet) {
      const content = bullet[1];
      if (collector.kind === 'criteria') {
        const parent = collector.parent;
        if (!Array.isArray(parent.criteria)) {
          malformations.push({
            line: lineNo,
            message: `malformed criteria block: 'none' co-occurs with criteria (parent ${parentId(parent)})`,
            parentLine: parent.line,
          });
          collector = undefined;
          continue;
        }
        pushBullet(parent.criteria, content);
      } else if (collector.kind === 'artifacts') {
        collector.parent.primaryArtifacts.push(extractArtifactEntry(content));
        lastBullet = undefined;
      } else {
        pushBullet(collector.parent.mergeGate, content);
      }
      continue;
    }

    // Continuation line: an indented, non-bold-leading line DIRECTLY after a
    // bullet (no blank between) folds into it (Req 2.2.1).
    const isContinuation =
      lastBullet !== undefined && /^\s+\S/.test(line) && !/^\s*\*\*[^*]+\*\*/.test(line);
    if (isContinuation) {
      lastBullet!.list[lastBullet!.list.length - 1] += ' ' + line.trim();
      continue;
    }

    if (collector.kind === 'criteria') {
      // A criteria block runs to its structural boundary — the next checkbox,
      // criteria label, promise-block label, heading or thematic break (all
      // handled above). Any other non-bullet line inside it (a paragraph after
      // a blank, an indented bold-leading line such as `**Instrument**:`, an
      // italic scope line) is a LOUD malformation: the checker never guesses
      // which criterion it belongs to and never silently drops it or the
      // bullets after it (Req 2.2.1 one bullet = one criterion; Req 2.2.2 never
      // silently select nothing). Fix 2026-09-26, D1 — ruled (d), Peter.
      malformations.push({
        line: lineNo,
        message: `malformed criteria block: non-bullet line inside block at line ${lineNo} (parent ${parentId(collector.parent)})`,
        parentLine: collector.parent.line,
      });
      collector = undefined;
      lastBullet = undefined;
      continue;
    }

    // Artifact and gate bodies keep the original end-of-block rule: any other
    // non-bullet line ends them.
    collector = undefined;
    lastBullet = undefined;
  }

  return { spec, declaredMode, parents, unitsBlock, malformations };
}

/** Parent identifier for messages: the written number, else the line-based fallback. */
export function parentId(p: Parent): string {
  return p.number ?? `at line ${p.line}`;
}

/**
 * Normalized criteria multiset for the (c′) predicate (Req 2.5.2): multiset,
 * order-insensitive; duplicate bullets cannot collapse into one row.
 */
export function normalizedCriteria(p: Parent): string[] {
  return Array.isArray(p.criteria) ? p.criteria.map(normalizeCell) : [];
}

/**
 * The span function (C14) — Spec 123 Task 10.4.
 *
 * design.md § "C14. The span function" and Req 10.S / 10.8a Constraint 1: ONE shared
 * span-construction function, called by BOTH adapters. Before Task 10 the charter body was one
 * inline `passthrough → …#body` span, duplicated at `adapters/cc.ts` L244–247 and
 * `adapters/kiro.ts` L322–325; the frontmatter-derived sections were each one coarse render
 * span built inline in each adapter's rendering loops. Both are replaced by calls through
 * {@link emitSpans}, so the per-unit `op`/`source` choice lives in exactly one place and a
 * bite on it reaches every target.
 *
 * DIVISION OF LABOR — adapters supply only the per-target RENDERING (the text of each piece);
 * they never construct spans or decide provenance. `emitSpans` decides both:
 *
 *   BODY (plan `'body'`) — the body is partitioned by `partition()` (C13):
 *     retained    → `passthrough`, source `<file>#<anchor>`;
 *     re-pointed  → `render`,      source `<file>#<anchor>` — the CANONICAL ORIGIN, regardless
 *                   of transformation (10.S: `source` is provenance; `op` says how it got there);
 *     omitted     → no text, no span.
 *   FRONTMATTER ENTRY (`{ kind: 'entry' | 'member' }`) — the path is resolved against the
 *     frontmatter ENTRY TREE (C13) and must name a real entry (an adapter cannot cite a path
 *     that does not exist): `render`, source `<file>#frontmatter:<path>`; an ambient embed
 *     (`ambient[<docid>…]`) is `resolve` + `mode: embed`.
 *   SHARED-CATALOG MEMBER → `render`, source `canonical/shared/shared-catalog.yaml#<id>`.
 *   GENERATOR GLUE (banner, fences, WORKFLOW_RULES…) → `render`, source from a CLOSED table
 *     here — adapters name the glue, never its source string.
 *
 * PROFILES: the steward profile renders canonical text and takes no dispositions or overlay.
 * The consumer profile REQUIRES dispositions and reads them per unit / per leaf entry — an
 * explicit row every time (a missing row is never read as `retained`). Task 10 lands the body
 * half (retained / re-pointed / omitted) and frontmatter retained / omitted. Task 15.0 lands
 * frontmatter RE-POINTING: a re-pointed leaf renders its `## @entry <path> @ sha256:…` overlay
 * text (13.2, `regrounding/overlay.ts`) with `source` = the canonical `#frontmatter:<path>`; an
 * ambient embed can never be re-pointed (DD19) and throws. `AdapterContext.profile` (15.0,
 * default `'steward'`) selects the profile in both adapters.
 *
 * WHAT THIS DOES NOT ESTABLISH: that every adapter span routes through here. The arbiter for
 * that is Task 14's two-sided per-target bites (S-T-A7). The unit twin
 * (`spans.source-origin.test.ts`) tests this function only.
 *
 * Traces to: Req 10.1, 10.S (4–7), 10.8, 10.8a Constraint 1, 10.9; design C13, C14.
 */

import type { AttributionAccumulator, AttributionOp } from './attribution';
import type { YamlDoc } from './frontmatter';
import { entryTree, partition, type EntryTree, type PartitionUnit } from './partition';
import { renderPassThrough } from './render';

export type Profile = 'steward' | 'consumer';

export interface SpanSource {
  /** Repo-relative canonical path, e.g. `canonical/agents/lina.md` — the provenance prefix. */
  file: string;
  /** The canonical body (from the ONE splitter, frontmatter.ts). */
  body: string;
  /** The parsed canonical frontmatter. */
  frontmatter: YamlDoc;
}

/**
 * The disposition vocabulary a unit/entry row may carry (C17; DD19 adds `superseded-by` for
 * ambient embeds). Task 13.1 owns the schema; this is the subset `emitSpans` reads.
 */
export type Disposition = 'retained' | 're-pointed' | 'no-consumer-counterpart' | 'superseded-by';

export interface DispositionRow {
  disposition: Disposition;
  /** Where a re-pointed unit lands (C17). Interpreted by `derive()` (C22), not here. */
  destination?: string;
}

export interface Dispositions {
  /** Keyed by body anchor (`#the-owed-set-pipeline`). */
  body?: Record<string, DispositionRow>;
  /** Keyed by entry path (`writeScope[src/**]`). */
  frontmatter?: Record<string, DispositionRow>;
}

/** Re-grounded text per re-pointed unit/entry (C17's overlay, parsed — the file format is Task 13.2's). */
export interface Overlay {
  units?: Record<string, string>;
  entries?: Record<string, string>;
}

/** Generator-owned glue — the CLOSED set of non-canonical sources an adapter may name. */
export const GLUE_SOURCES = Object.freeze({
  'frontmatter-fence': 'C1:frontmatter',
  'generated-banner': 'O-3:generated-banner',
  'ambient-lane2-header': 'C11:lane2-header',
  'workflow-rules': 'WORKFLOW_RULES',
  'kiro-config': 'C1:frontmatter+ambient-manifest',
  // The Commands section's header/trailer when the agent declares no `commands` entry and the
  // section exists only for shared-catalog members.
  'shared-catalog-section': 'canonical/shared/shared-catalog.yaml',
} as const);
export type GlueId = keyof typeof GLUE_SOURCES;

/** The shared catalog's canonical path — the provenance prefix for its members. */
export const SHARED_CATALOG_SOURCE = 'canonical/shared/shared-catalog.yaml';

export type SpanPiece =
  /** A named frontmatter entry (a scalar leaf, or a container whose glue this text is). */
  | { kind: 'entry'; path: string; text: string }
  /** The `index`-th member of the list entry at `list` — keyed by the entry tree, not the adapter. */
  | { kind: 'member'; list: string; index: number; text: string }
  | { kind: 'shared'; id: string; text: string }
  | { kind: 'glue'; glue: GlueId; text: string };

/** `'body'` emits the canonical body per unit; a piece list emits frontmatter-derived text. */
export type SpanPlan = 'body' | readonly SpanPiece[];

export interface Rendered {
  text: string;
  lineCount: number;
}

/** Thrown when an emission request is malformed (an adapter or profile bug, never content). */
export class SpanEmissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SpanEmissionError';
  }
}

const entryTreeCache = new WeakMap<object, EntryTree>();
function treeFor(frontmatter: YamlDoc): EntryTree {
  let tree = entryTreeCache.get(frontmatter);
  if (!tree) {
    tree = entryTree(frontmatter);
    entryTreeCache.set(frontmatter, tree);
  }
  return tree;
}

/**
 * Emit one region of an artifact: append its spans to `acc` and return its text. Call it once
 * per region, in emission order (the accumulator tracks line position).
 */
export function emitSpans(
  acc: AttributionAccumulator,
  source: SpanSource,
  profile: Profile,
  dispositions: Dispositions | undefined,
  overlay: Overlay | undefined,
  plan: SpanPlan
): Rendered {
  if (profile === 'steward' && (dispositions !== undefined || overlay !== undefined)) {
    throw new SpanEmissionError(
      'emitSpans: the steward profile renders canonical text — it takes no dispositions or overlay.'
    );
  }
  if (profile === 'consumer' && dispositions === undefined) {
    throw new SpanEmissionError(
      'emitSpans: the consumer profile requires dispositions — every unit and entry carries an explicit row.'
    );
  }

  const blocks: { op: AttributionOp; source: string; text: string; mode?: 'embed' }[] = [];

  if (plan === 'body') {
    const units = partition(source.body).units;
    for (const unit of units) {
      const block = bodyBlock(source, unit, profile, dispositions, overlay);
      if (block) blocks.push(block);
    }
    // The body travels with a guaranteed trailing newline (the pre-123 inline sites'
    // `ensureTrailingNewline`) — applied to the LAST emitted block so line spans stay whole.
    const last = blocks[blocks.length - 1];
    if (last && !last.text.endsWith('\n')) last.text += '\n';
  } else {
    const tree = treeFor(source.frontmatter);
    for (const piece of plan) {
      const block = pieceBlock(source, tree, piece, profile, dispositions, overlay);
      if (block) blocks.push(block);
    }
  }

  let text = '';
  for (const block of blocks) {
    if (block.text.length === 0) continue;
    if (!block.text.endsWith('\n')) {
      throw new SpanEmissionError(
        `emitSpans: a rendered piece for "${block.source}" does not end with a newline — spans are whole lines.`
      );
    }
    acc.add(block.op, countLines(block.text), block.source, block.mode);
    text += block.text;
  }
  return { text, lineCount: countLines(text) };
}

function bodyBlock(
  source: SpanSource,
  unit: PartitionUnit,
  profile: Profile,
  dispositions: Dispositions | undefined,
  overlay: Overlay | undefined
): { op: AttributionOp; source: string; text: string } | undefined {
  const origin = `${source.file}${unit.anchor}`;
  // Retained text routes through renderPassThrough — the identity function BY CONTRACT
  // (Req 1 AC2: pass-through prose is never synthesized, summarized, or rewritten).
  if (profile === 'steward') return { op: 'passthrough', source: origin, text: renderPassThrough(unit.text) };

  const row = dispositions?.body?.[unit.anchor];
  if (row === undefined) {
    throw new SpanEmissionError(
      `emitSpans: body unit ${unit.anchor} in ${source.file} has no disposition row — never implied as retained.`
    );
  }
  switch (row.disposition) {
    case 'retained':
      return { op: 'passthrough', source: origin, text: renderPassThrough(unit.text) };
    case 're-pointed': {
      const regrounded = overlay?.units?.[unit.anchor];
      if (regrounded === undefined) {
        throw new SpanEmissionError(`emitSpans: re-pointed unit ${unit.anchor} in ${source.file} has no overlay text.`);
      }
      // 10.S: source is the CANONICAL ORIGIN; op names the transformation.
      return { op: 'render', source: origin, text: ensureTrailingNewline(regrounded) };
    }
    case 'no-consumer-counterpart':
    case 'superseded-by':
      return undefined; // omitted → no text, no span
  }
}

function pieceBlock(
  source: SpanSource,
  tree: EntryTree,
  piece: SpanPiece,
  profile: Profile,
  dispositions: Dispositions | undefined,
  overlay: Overlay | undefined
): { op: AttributionOp; source: string; text: string; mode?: 'embed' } | undefined {
  switch (piece.kind) {
    case 'glue':
      return { op: 'render', source: GLUE_SOURCES[piece.glue], text: piece.text };
    case 'shared':
      return { op: 'render', source: `${SHARED_CATALOG_SOURCE}#${piece.id}`, text: piece.text };
    case 'entry':
    case 'member': {
      const path = piece.kind === 'entry' ? piece.path : memberPath(tree, piece.list, piece.index, source.file);
      const node = tree.get(path);
      if (!node) {
        throw new SpanEmissionError(`emitSpans: no frontmatter entry "${path}" in ${source.file} — an adapter cited a path that does not exist.`);
      }
      if (profile === 'consumer' && node.kind === 'leaf') {
        const row = dispositions?.frontmatter?.[path];
        if (row === undefined) {
          throw new SpanEmissionError(
            `emitSpans: frontmatter entry ${path} in ${source.file} has no disposition row — never implied as retained.`
          );
        }
        if (row.disposition === 'no-consumer-counterpart' || row.disposition === 'superseded-by') return undefined;
        if (row.disposition === 're-pointed') {
          if (path.startsWith('ambient[')) {
            throw new SpanEmissionError(
              `emitSpans: ambient embed ${path} in ${source.file} cannot be re-pointed (DD19) — dispose it retained, superseded-by or no-consumer-counterpart.`
            );
          }
          const regrounded = overlay?.entries?.[path];
          if (regrounded === undefined) {
            throw new SpanEmissionError(`emitSpans: re-pointed frontmatter entry ${path} in ${source.file} has no overlay text.`);
          }
          // 10.S: source is the CANONICAL ORIGIN; op names the transformation.
          return { op: 'render', source: `${source.file}#frontmatter:${path}`, text: ensureTrailingNewline(regrounded) };
        }
      }
      const embed = path.startsWith('ambient[');
      return {
        op: embed ? 'resolve' : 'render',
        source: `${source.file}#frontmatter:${path}`,
        text: piece.text,
        ...(embed ? { mode: 'embed' as const } : {}),
      };
    }
  }
}

function memberPath(tree: EntryTree, list: string, index: number, file: string): string {
  const node = tree.get(list);
  if (!node || node.kind !== 'list') {
    throw new SpanEmissionError(`emitSpans: "${list}" in ${file} is not a list entry.`);
  }
  const path = node.children[index];
  if (path === undefined) {
    throw new SpanEmissionError(`emitSpans: "${list}" in ${file} has no member at index ${index}.`);
  }
  return path;
}

/** Line count of a block — the accumulator's unit (same rule the adapters have always used). */
export function countLines(text: string): number {
  if (text.length === 0) return 0;
  const withoutTrailingNewline = text.endsWith('\n') ? text.slice(0, -1) : text;
  if (withoutTrailingNewline.length === 0) return 1;
  return withoutTrailingNewline.split('\n').length;
}

function ensureTrailingNewline(text: string): string {
  return text.endsWith('\n') ? text : `${text}\n`;
}

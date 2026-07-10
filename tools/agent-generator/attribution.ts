/**
 * Attribution sidecar (C3.3) + totality checker (P2) — Spec 122 Task 2.4.
 *
 * design.md § "C3.3 Provenance": every emitted artifact gets a committed, diff-guarded
 * SIDECAR `<output>.attribution.json` mapping line spans to the pipeline op that produced
 * them (DD2 — sidecar over inline markers, so generated prompts stay clean while Req 1 AC3's
 * invariant is machine-checkable). Each span's `op` ∈ {resolve, render, passthrough}; a
 * `resolve` span rendered as an inline embed (CC per-agent lane, C11) carries `mode: embed`.
 *
 * P2 (attribution totality): {@link checkAttributionTotality} asserts the spans are TOTAL
 * (tile the whole artifact 1..N with no gap), NON-OVERLAPPING, and every op is in the
 * allowed set. This is checked mechanically alongside C6 — it is what makes "every byte is
 * attributable to exactly one of three ops" (Req 1 AC3) an inspectable property, not a
 * human reading.
 *
 * Traces to: Req 1 AC3 (three ops, totality), Req 1 AC4 (mechanically inspectable
 * provenance), P2.
 */

import { canonicalStringify, type JsonValue } from './canonical-json';

export type AttributionOp = 'resolve' | 'render' | 'passthrough';

const ALLOWED_OPS: ReadonlySet<string> = new Set<AttributionOp>(['resolve', 'render', 'passthrough']);

export interface AttributionSpan {
  /** Inclusive 1-based [startLine, endLine]. */
  lines: [number, number];
  op: AttributionOp;
  /** Provenance pointer, e.g. `id:platform-implementation-guidelines`, `WORKFLOW_RULES[summary-first]`. */
  source: string;
  /** Present only for a `resolve` span emitted as a generated inline embed (CC lane 2, C11). */
  mode?: 'embed';
}

export interface AttributionManifest {
  artifact: string;
  spans: AttributionSpan[];
}

export interface TotalityResult {
  valid: boolean;
  errors: string[];
}

/**
 * P2 totality check: the manifest's spans tile the artifact's `totalLines` exactly — total,
 * non-overlapping, each with a valid op. Returns every violation (not just the first) so a
 * failing artifact reports all its provenance defects at once.
 */
export function checkAttributionTotality(
  manifest: AttributionManifest,
  totalLines: number
): TotalityResult {
  const errors: string[] = [];
  const { artifact, spans } = manifest;

  // Per-span shape + op validity.
  spans.forEach((span, i) => {
    if (!ALLOWED_OPS.has(span.op)) {
      errors.push(`${artifact} span[${i}] has op "${span.op}" — must be one of resolve|render|passthrough.`);
    }
    const [start, end] = span.lines;
    if (!Number.isInteger(start) || !Number.isInteger(end)) {
      errors.push(`${artifact} span[${i}] lines [${start}, ${end}] must be integers.`);
    } else if (start < 1) {
      errors.push(`${artifact} span[${i}] starts at line ${start} — line numbers are 1-based.`);
    } else if (end < start) {
      errors.push(`${artifact} span[${i}] ends (${end}) before it starts (${start}).`);
    }
  });

  // Empty artifact: only an empty span set is total.
  if (totalLines <= 0) {
    if (spans.length > 0) {
      errors.push(`${artifact} has ${spans.length} span(s) but totalLines is ${totalLines}.`);
    }
    return { valid: errors.length === 0, errors };
  }

  // Coverage: sort by start, then require an exact tiling of [1, totalLines].
  const sorted = spans.slice().sort((a, b) => a.lines[0] - b.lines[0]);
  let cursor = 1;
  for (let i = 0; i < sorted.length; i += 1) {
    const [start, end] = sorted[i].lines;
    if (start > cursor) {
      errors.push(`${artifact} has an attribution GAP at lines ${cursor}..${start - 1} (no span covers them).`);
    } else if (start < cursor) {
      errors.push(`${artifact} has OVERLAPPING spans at line ${start} (already covered through ${cursor - 1}).`);
    }
    cursor = Math.max(cursor, end + 1);
  }
  if (cursor <= totalLines) {
    errors.push(`${artifact} has an attribution GAP at lines ${cursor}..${totalLines} (artifact ends unattributed).`);
  } else if (cursor > totalLines + 1) {
    errors.push(`${artifact} attributes past the artifact end (covers through ${cursor - 1}, artifact has ${totalLines} lines).`);
  }

  return { valid: errors.length === 0, errors };
}

/** Build an attribution manifest from an artifact path and its spans. */
export function buildAttribution(artifact: string, spans: AttributionSpan[]): AttributionManifest {
  return { artifact, spans };
}

/**
 * A small accumulator that appends spans in emission order, tracking the current line so an
 * emitter never has to compute line ranges by hand. `add(op, lineCount, source, mode)`
 * assigns the next `lineCount` lines to a span. The resulting spans are total-by-construction
 * as long as the emitter appends one span per emitted block.
 */
export class AttributionAccumulator {
  private readonly spans: AttributionSpan[] = [];
  private nextLine = 1;

  add(op: AttributionOp, lineCount: number, source: string, mode?: 'embed'): void {
    if (lineCount <= 0) return;
    const start = this.nextLine;
    const end = start + lineCount - 1;
    const span: AttributionSpan = { lines: [start, end], op, source };
    if (mode) span.mode = mode;
    this.spans.push(span);
    this.nextLine = end + 1;
  }

  /** Total lines assigned so far (== the artifact's line count when emission is complete). */
  get lineCount(): number {
    return this.nextLine - 1;
  }

  build(artifact: string): AttributionManifest {
    return buildAttribution(artifact, this.spans.slice());
  }
}

/** Serialize an attribution manifest to canonical (deterministic) JSON for committing. */
export function serializeAttribution(manifest: AttributionManifest): string {
  return canonicalStringify(manifest as unknown as JsonValue);
}

/**
 * Deterministic JSON serialization (P1 backbone) — Spec 122 Task 2.
 *
 * design.md § "The three content operations": "The generator is deterministic: sorted
 * collections, no timestamps, byte-identical outputs for identical inputs (precondition
 * for C6)." Every committed, diff-guarded JSON output (ambient manifests C3.2, attribution
 * sidecars C3.3, demotion deltas, the registry C5) is serialized through THIS function so
 * two runs over identical inputs produce byte-identical files — the property the C6
 * regenerate-and-diff guard rests on.
 *
 * Guarantees:
 *   - Object keys are emitted in sorted (code-unit) order, recursively, so key insertion
 *     order never leaks into output.
 *   - Arrays are emitted in their given order — ARRAY ORDER IS THE CALLER'S RESPONSIBILITY.
 *     Callers that key on set membership (e.g. ambient members) MUST sort the array by a
 *     stable key before serializing; this function does not reorder arrays because their
 *     order is often semantic.
 *   - Two-space indent, `\n` line endings, and a single trailing newline (POSIX text file).
 *   - No `Date`/timestamp handling: callers must not put non-deterministic values in.
 *
 * Traces to: P1 (Correctness Properties); precondition for C6 (Req 17).
 */

/** A JSON-serializable value. `undefined` object properties are dropped (as JSON.stringify does). */
export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue | undefined };

/**
 * Recursively produce a new value with all object keys sorted (code-unit order). Arrays
 * keep their order; primitives pass through. Used internally by {@link canonicalStringify};
 * exported for callers that need the sorted structure without stringifying.
 */
export function canonicalize(value: JsonValue): JsonValue {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((element) => canonicalize(element as JsonValue));
  }
  const sortedKeys = Object.keys(value).sort();
  const result: { [key: string]: JsonValue } = {};
  for (const key of sortedKeys) {
    const child = value[key];
    // Match JSON.stringify semantics: an explicit `undefined` property is omitted.
    if (child === undefined) continue;
    result[key] = canonicalize(child);
  }
  return result;
}

/**
 * Serialize a value to canonical JSON: recursively key-sorted objects, two-space indent,
 * a single trailing newline. Byte-identical for byte-identical (post-canonicalize) input.
 */
export function canonicalStringify(value: JsonValue): string {
  return `${JSON.stringify(canonicalize(value), null, 2)}\n`;
}

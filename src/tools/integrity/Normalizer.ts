/**
 * Normalizer — the semantic-equality pass (Design Decision D1; R2 AC2).
 *
 * Byte comparison is rejected: generated artifacts embed volatile fields
 * (ISO timestamps, `lastIndexTime`) and harmless ordering/formatting that
 * would produce constant false drift. The Normalizer transforms each side
 * into a canonical comparable form *before* comparison:
 *
 *   - yaml / json  → parsed structure with volatile keys/timestamp values stripped
 *                    (object comparison is key-order independent downstream).
 *   - css / swift / kotlin → text with generated-header timestamp lines removed
 *                    and trailing whitespace / line endings normalized.
 *
 * The rule set is intentionally small here; the complete set is finalized
 * during R2 harness completion (Task 5.1, Open Item 4). Rules are data-driven
 * and individually unit-tested (Testing Strategy: "a changed timestamp is
 * ignored; a changed value is not").
 */

import * as yaml from 'js-yaml';
import { ArtifactKind, NormalizationRule } from './types';

/** Volatile object keys dropped from structured artifacts regardless of value. */
const VOLATILE_KEYS = new Set(['lastIndexTime', 'generatedAt', 'generatedOn', 'timestamp']);

/** Full ISO datetime (date + 'T' + time) — the volatile signature in generated headers/fields. */
const ISO_DATETIME = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

export const DEFAULT_NORMALIZATION_RULES: NormalizationRule[] = [
  {
    appliesTo: ['yaml', 'json'],
    description:
      'Strip volatile keys (lastIndexTime, generatedAt, generatedOn, timestamp) and ISO-datetime-valued fields recursively from parsed structures.',
    apply: (value) => stripVolatile(value),
  },
  {
    appliesTo: ['css', 'swift', 'kotlin'],
    description:
      'Remove generated-header lines carrying an ISO datetime; trim trailing whitespace; normalize line endings.',
    apply: (value) => normalizeText(value as string),
  },
];

export class Normalizer {
  private readonly rules: NormalizationRule[];

  constructor(rules: NormalizationRule[] = DEFAULT_NORMALIZATION_RULES) {
    this.rules = rules;
  }

  /** Parse + normalize raw artifact content into a canonical comparable form. */
  normalize(raw: string, kind: ArtifactKind): unknown {
    let value: unknown = this.parse(raw, kind);
    for (const rule of this.rules) {
      if (rule.appliesTo === 'all' || rule.appliesTo.includes(kind)) {
        value = rule.apply(value, kind);
      }
    }
    return value;
  }

  private parse(raw: string, kind: ArtifactKind): unknown {
    if (kind === 'yaml') return yaml.load(raw);
    if (kind === 'json') return JSON.parse(raw);
    return raw; // text kinds are normalized as strings
  }
}

/** Recursively drop volatile keys and ISO-datetime-valued fields from a parsed structure. */
function stripVolatile(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(stripVolatile);
  }
  if (value !== null && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      if (VOLATILE_KEYS.has(key)) continue;
      if (typeof child === 'string' && ISO_DATETIME.test(child)) continue;
      out[key] = stripVolatile(child);
    }
    return out;
  }
  return value;
}

/** Drop generated-header timestamp lines; trim trailing whitespace; collapse to a single trailing newline. */
function normalizeText(raw: string): string {
  return raw
    .split(/\r?\n/)
    .filter((line) => !ISO_DATETIME.test(line))
    .map((line) => line.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '\n');
}

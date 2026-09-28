/**
 * Content hashes for the re-grounding records — Spec 123 Task 13.2.
 *
 * ONE definition, shared by operative-set records (C16 `canonicalHash`), overlay pins (C17,
 * L-D6) and signatures (C17 valve 1 — `canonicalHash` + `renderedHash`):
 *
 *   hashText(text)   = "sha256:" + hex SHA-256 over the exact UTF-8 bytes (the form the
 *                      committed C16 records already carry — `operative-set-records.test.ts`);
 *   hashEntry(value) = hashText(canonicalStringify(value)) — a frontmatter entry's value,
 *                      serialized deterministically (sorted keys) so YAML key order never
 *                      changes a pin.
 *
 * Traces to: design C16, C17 (valve 1, L-D6).
 */

import * as crypto from 'crypto';
import { canonicalStringify, type JsonValue } from '../canonical-json';

/** `sha256:` + 64 lowercase hex — the one accepted hash form. */
export const HASH_PATTERN = /^sha256:[0-9a-f]{64}$/;

export const hashText = (text: string): string =>
  'sha256:' + crypto.createHash('sha256').update(text, 'utf8').digest('hex');

export const hashEntry = (value: unknown): string => hashText(canonicalStringify(value as JsonValue));

export const isHash = (value: unknown): value is string => typeof value === 'string' && HASH_PATTERN.test(value);

/** The hex digest of a `sha256:<hex>` hash (the catalog's `sha256:<pinned>` placeholders take the hex). */
export const hexOf = (hash: string): string => hash.replace(/^sha256:/, '');

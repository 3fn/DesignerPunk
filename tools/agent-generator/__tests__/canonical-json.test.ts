/**
 * @category evergreen
 * @purpose Verify deterministic JSON serialization (P1): recursive key sorting, preserved
 *          array order, dropped-undefined, and byte-identical output for key-reordered
 *          inputs — the property C6's regenerate-and-diff guard rests on.
 */

import { canonicalize, canonicalStringify } from '../canonical-json';

describe('canonicalize — recursive key sorting', () => {
  it('sorts object keys at every depth, preserving array order', () => {
    const input = { b: 1, a: { d: [3, 1, 2], c: 4 } };
    expect(canonicalize(input)).toEqual({ a: { c: 4, d: [3, 1, 2] }, b: 1 });
  });

  it('drops undefined properties (JSON.stringify semantics)', () => {
    const input = { a: undefined, b: 2 };
    expect(canonicalize(input)).toEqual({ b: 2 });
  });

  it('passes primitives and null through unchanged', () => {
    expect(canonicalize(null)).toBeNull();
    expect(canonicalize(7)).toBe(7);
    expect(canonicalize('x')).toBe('x');
    expect(canonicalize(true)).toBe(true);
  });
});

describe('canonicalStringify — byte-identical determinism', () => {
  it('produces identical bytes for objects that differ only in key insertion order', () => {
    const a = canonicalStringify({ z: 1, m: { y: 2, x: 3 }, a: 4 });
    const b = canonicalStringify({ a: 4, m: { x: 3, y: 2 }, z: 1 });
    expect(a).toBe(b);
  });

  it('ends with exactly one trailing newline and uses two-space indent', () => {
    const out = canonicalStringify({ a: 1 });
    expect(out).toBe('{\n  "a": 1\n}\n');
    expect(out.endsWith('\n')).toBe(true);
    expect(out.endsWith('\n\n')).toBe(false);
  });

  it('does NOT reorder arrays (array order is the caller\'s responsibility)', () => {
    expect(canonicalStringify({ list: [3, 1, 2] })).toBe('{\n  "list": [\n    3,\n    1,\n    2\n  ]\n}\n');
  });
});

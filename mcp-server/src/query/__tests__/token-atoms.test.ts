/**
 * Tokenizer atom list (indexer fix 3, 2026-10-13 — .kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md).
 * Brand-cased platform names stay one token on both the indexed and the query side; other camelCase
 * words still split; the Stage 1 ST-N2 spurious `i` / `os` hits are gone.
 */

import { protectAtoms, TOKEN_ATOMS, TOKEN_ATOM_LIST_VERSION } from '../token-atoms';
import { findDocsConcept } from '../QueryEngine';
import { DocumentMetadata } from '../../models';

function doc(description: string): DocumentMetadata {
  return {
    path: 'd.md', id: 'd', purpose: '', layer: 2, relevantTasks: [], lastReviewed: '',
    organization: 'Thurgood', sections: [], tokenCount: 100, description,
  };
}

describe('atom list', () => {
  it('is versioned and holds exactly the v1 atoms', () => {
    expect(TOKEN_ATOM_LIST_VERSION).toBe(1);
    expect([...TOKEN_ATOMS]).toEqual(['iOS', 'iPadOS', 'macOS', 'tvOS', 'watchOS', 'iPhone', 'iPad']);
  });

  it('is frozen', () => {
    expect(Object.isFrozen(TOKEN_ATOMS)).toBe(true);
  });
});

describe('protectAtoms', () => {
  it.each([
    ['iOS', 'ios'],
    ['iPadOS', 'ipados'],
    ['macOS', 'macos'],
    ['tvOS', 'tvos'],
    ['watchOS', 'watchos'],
    ['iPhone', 'iphone'],
    ['iPad', 'ipad'],
  ])('%s → %s', (atom, lower) => {
    expect(protectAtoms(`on ${atom} today`)).toBe(`on ${lower} today`);
  });

  it('iPadOS is not read as iPad + OS (longest atom first)', () => {
    expect(protectAtoms('iPadOS')).toBe('ipados');
  });

  it('does not touch an atom spelling inside a longer word', () => {
    expect(protectAtoms('iPads')).toBe('iPads');
    expect(protectAtoms('myiOS')).toBe('myiOS');
  });

  it('leaves other camelCase words alone', () => {
    expect(protectAtoms('contentDescription')).toBe('contentDescription');
  });
});

describe('find_docs tokenization with atoms (symmetric: doc text and query)', () => {
  it.each(['iOS', 'iPadOS', 'macOS', 'tvOS', 'watchOS', 'iPhone', 'iPad'])(
    'doc text "%s" matches the lowercase query, as one token',
    (atom) => {
      const r = findDocsConcept([doc(`Guidance for ${atom} implementations`)], atom.toLowerCase());
      expect(r.data).toHaveLength(1);
      expect(r.data[0].matchedOn).toContain(`description:${atom.toLowerCase()}`);
    },
  );

  it('a brand-cased query matches lowercase doc text too', () => {
    const r = findDocsConcept([doc('ios notes')], 'iOS');
    expect(r.data[0].matchedOn).toContain('description:ios');
  });

  it('a non-atom camelCase word still splits (contentDescription → content + description)', () => {
    const r = findDocsConcept([doc('Use contentDescription for labels')], 'content');
    expect(r.data[0].matchedOn).toContain('description:content');
  });

  it('ST-N2: no spurious `i` / `os` tokens from "iOS" in the query or the doc', () => {
    const q = 'how to verify an iOS or Android build claim when no toolchain exists in this environment';
    const r = findDocsConcept([doc('Platform notes: iOS, Android')], q);
    const on = r.data[0].matchedOn;
    expect(on).toContain('description:ios');
    expect(on).not.toContain('description:i');
    expect(on).not.toContain('description:os');
  });
});

/**
 * Unit tests for the Components Layer-1 rubric tier derivation (Spec 121 Task 5.2).
 *
 * These exercise the pure `deriveMatchConfidence` function directly so the rubric is
 * reconstructable/auditable in isolation (Req 6.2 / P5), independent of the live index.
 * The headline case is THE VALIDATED FALSE-CONFIDENCE GUARD: low-signal-only ≥2-token
 * coverage MUST cap at `partial`, never `strong`.
 *
 * (The tool-boundary contract-fixture test that pins this through callTool is Task 4 — not here.)
 */

import { deriveMatchConfidence, MatchedOnEntry } from '../QueryEngine';

const high = (term: string): MatchedOnEntry => ({ field: 'highSignal', term });
const low = (term: string): MatchedOnEntry => ({ field: 'lowSignal', term });
const alias = (term: string): MatchedOnEntry => ({ field: 'aliases', term });

describe('deriveMatchConfidence (Components Layer-1 rubric)', () => {
  describe('none — zero tokens matched', () => {
    it('returns none when nothing matched', () => {
      expect(deriveMatchConfidence([], 0, 3)).toBe('none');
    });
  });

  describe('strong — high-signal-field hit', () => {
    it('single high-signal hit reaches strong', () => {
      // e.g. "button" landing in tokenized name on Button-CTA
      expect(deriveMatchConfidence([high('button')], 1, 1)).toBe('strong');
    });

    it('high-signal hit with partial coverage still reaches strong (first rubric clause)', () => {
      // one of three tokens lands high-signal — a high-signal hit alone qualifies
      expect(deriveMatchConfidence([high('button')], 1, 3)).toBe('strong');
    });

    it('multi-token full coverage with at least one high-signal field reaches strong', () => {
      // "primary action button" — three high-signal tokens on Button-CTA
      expect(
        deriveMatchConfidence([high('primary'), high('action'), high('button')], 3, 3)
      ).toBe('strong');
    });

    it('mixed high+low full coverage reaches strong (a high-signal field is present)', () => {
      expect(deriveMatchConfidence([high('text'), low('input'), low('field')], 3, 3)).toBe('strong');
    });
  });

  describe('partial — low-signal only', () => {
    it('single low-signal token is partial', () => {
      expect(deriveMatchConfidence([low('onboarding')], 1, 1)).toBe('partial');
    });

    it('THE GUARD: low-signal-only ≥2-token FULL coverage caps at partial, NOT strong', () => {
      // Both tokens of a 2-token query land in a shared low-cardinality contexts value
      // (e.g. "onboarding flows"). Signal-class-blind coverage would call this strong;
      // the guard caps it at partial.
      expect(deriveMatchConfidence([low('onboarding'), low('flows')], 2, 2)).toBe('partial');
    });

    it('THE GUARD: three low-signal tokens at full coverage still cap at partial', () => {
      expect(
        deriveMatchConfidence([low('settings'), low('screen'), low('region')], 3, 3)
      ).toBe('partial');
    });

    it('aliases-only matches are treated as low-signal for tiering (do not lift to strong)', () => {
      // aliases stand in for a term the author chose not to put in a high-signal field
      expect(deriveMatchConfidence([alias('dropdown'), alias('select')], 2, 2)).toBe('partial');
    });
  });

  describe('reconstructability (P5)', () => {
    it('tier is a pure function of (matchedOn signal classes, matchedTokens, totalTokens)', () => {
      // Same coverage numbers, different signal class → different tier. Proves the tier is
      // recomputable from the emitted evidence alone, not an opaque label.
      const strong = deriveMatchConfidence([high('x'), high('y')], 2, 2);
      const partial = deriveMatchConfidence([low('x'), low('y')], 2, 2);
      expect(strong).toBe('strong');
      expect(partial).toBe('partial');
      expect(strong).not.toBe(partial);
    });
  });
});

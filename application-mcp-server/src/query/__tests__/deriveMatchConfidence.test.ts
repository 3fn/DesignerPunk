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

import { deriveMatchConfidence as derive, ComponentIdentity, MatchedOnEntry, MatchConfidence } from '../QueryEngine';

// Most cases below are about signal class and coverage, not identity: they use a component whose
// name and family share no token with the test terms, so the R3 anchor (clause i) never fires.
const NEUTRAL: ComponentIdentity = { name: 'Zz-Neutral-Base', family: 'Zz' };
const deriveMatchConfidence = (m: MatchedOnEntry[], matched: number, total: number, id: ComponentIdentity = NEUTRAL): MatchConfidence =>
  derive(m, matched, total, id);

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
    it('single high-signal hit on the component\'s own name reaches strong (R3 clause i)', () => {
      // e.g. "button" landing in tokenized name on Button-CTA
      expect(deriveMatchConfidence([high('button')], 1, 1, { name: 'Button-CTA', family: 'Button' })).toBe('strong');
    });

    it('DELIBERATE FLIP (rubric amendment 2026-10-17, R3): a lone high-signal hit at 1/3 with no name/family anchor is now partial', () => {
      // Was: "high-signal hit with partial coverage still reaches strong (first rubric clause)".
      // R3 replaced clause 1: a lone purpose / concept-suffix hit needs (ii)'s support.
      expect(deriveMatchConfidence([high('button')], 1, 3)).toBe('partial');
      // The same hit on the component's own name still reaches strong (clause i).
      expect(deriveMatchConfidence([high('button')], 1, 3, { name: 'Button-CTA', family: 'Button' })).toBe('strong');
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
    it('tier is a pure function of (matchedOn signal classes, matchedTokens, totalTokens, name, family)', () => {
      // Same coverage numbers, different signal class → different tier. Proves the tier is
      // recomputable from the emitted evidence alone, not an opaque label.
      const strong = deriveMatchConfidence([high('x'), high('y')], 2, 2);
      const partial = deriveMatchConfidence([low('x'), low('y')], 2, 2);
      expect(strong).toBe('strong');
      expect(partial).toBe('partial');
      expect(strong).not.toBe(partial);
    });
  });

  describe('GUARD — R3 "names beat purpose" (rubric amendment 2026-10-17)', () => {
    const own: ComponentIdentity = { name: 'Input-Checkbox-Base', family: 'FormInput' };
    const nav: ComponentIdentity = { name: 'Nav-TabBar-Base', family: 'Navigation' };

    it('(i) single-token own-name hit → strong', () => {
      expect(deriveMatchConfidence([high('checkbox')], 1, 1, own)).toBe('strong');
    });
    it('(i) single-token family hit → strong', () => {
      expect(deriveMatchConfidence([high('navigation')], 1, 1, nav)).toBe('strong');
    });
    it('(i) own-name hit with unmatched modifiers stays strong at 1/3', () => {
      expect(deriveMatchConfidence([high('checkbox')], 1, 3, own)).toBe('strong');
    });
    it('single-token purpose-only hit (no anchor) → partial', () => {
      expect(deriveMatchConfidence([high('switch')], 1, 1, { name: 'Nav-SegmentedChoice-Base', family: 'Navigation' })).toBe('partial');
    });
    it('lone concept-suffix hit at 1/2 → partial', () => {
      expect(deriveMatchConfidence([high('error')], 1, 2, { name: 'Button-VerticalList-Item', family: 'Button' })).toBe('partial');
    });
    it('(ii) 2 of 3 matched with one high-signal → strong; exactly half (1 of 2, 2 of 4) is not "more than half"', () => {
      expect(deriveMatchConfidence([high('user'), low('profile')], 2, 3)).toBe('strong');
      expect(deriveMatchConfidence([high('x'), low('y')], 2, 4)).toBe('partial');
      expect(deriveMatchConfidence([high('x')], 1, 2)).toBe('partial');
    });
    it('an anchor term that matched only low-signal still needs a high-signal hit somewhere (gate first)', () => {
      expect(deriveMatchConfidence([low('checkbox')], 1, 1, own)).toBe('partial');
    });
    it('anchor tokens use the matcher normalization (camelCase split, plural fold)', () => {
      expect(deriveMatchConfidence([high('tab')], 1, 2, nav)).toBe('strong');
      expect(deriveMatchConfidence([high('input')], 1, 2, { name: 'Zz-Base', family: 'FormInput' })).toBe('strong');
    });
  });
});

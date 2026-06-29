/**
 * find_docs Layer-1 rubric derivation — focused unit tests (Spec 121 Task 5.2/5.3)
 *
 * Exercises the docs rubric (discovery-confidence-rubric.md, Docs section) directly
 * against `findDocsConcept` with synthetic DocumentMetadata fixtures, so the tier
 * derivation is tested in isolation from disk I/O. The boundary calibration
 * fixtures (Task 4.4) are NOT authored here.
 *
 * Asserts:
 *   - the three distinct Layer fields are emitted, never collapsed
 *   - `partial` vs `none` is distinguishable from response shape alone (P4)
 *   - the incidental-token guard caps a lone high-field token at `partial`
 *   - a stop-word-only query → `none`
 *   - the tier is reconstructable from emitted matchedOn + coverage (P5)
 */

import { findDocsConcept } from '../QueryEngine';
import { DocumentMetadata } from '../../models';

// ---------------------------------------------------------------------------
// Fixture builder
// ---------------------------------------------------------------------------

function doc(overrides: Partial<DocumentMetadata>): DocumentMetadata {
  return {
    path: '.kiro/steering/Fixture.md',
    id: 'fixture',
    purpose: '',
    layer: 2,
    relevantTasks: [],
    lastReviewed: '',
    organization: 'Thurgood',
    sections: [],
    tokenCount: 100,
    ...overrides,
  };
}

// A doc that mirrors Process-Spec-Planning's high-signal surfaces.
const specPlanning = doc({
  path: '.kiro/steering/Process-Spec-Planning.md',
  title: 'Process-Spec-Planning',
  description:
    'Standards for creating spec documents — requirements format (EARS patterns, INCOSE quality rules), design document structure.',
  purpose: 'Standards for creating requirements, design, and task documents for feature specifications',
  sections: ['Requirements Document Format', 'Design Document Format'],
  relevantTasks: ['spec-creation'],
});

// A doc where "avatar" appears once, incidentally, in the description — the
// validated incidental-token guard case (rubric: "avatar" in Token-Family-Sizing).
const sizingTokens = doc({
  path: '.kiro/steering/Token-Family-Sizing.md',
  title: 'Token-Family-Sizing',
  description:
    'Sizing scale tokens for widths and heights — used by controls such as the avatar, buttons, and inputs.',
  purpose: 'Sizing family token definitions',
  sections: ['Scale', 'Usage'],
  relevantTasks: ['token-development'],
});

// A placeholder doc that is a textbook strong match but non-viable.
const modalPlaceholder = doc({
  path: '.kiro/steering/Component-Family-Modal.md',
  title: 'Component-Family-Modal',
  description: 'Modal component family (placeholder) — planned overlay components.',
  purpose: 'Structural documentation for Modals component family (placeholder)',
  sections: ['Family Overview'],
  relevantTasks: ['component-development'],
  viability: { placeholder: true, deprecated: false },
});

// A doc whose only match for "widget" is the low-signal path basename — the
// title/description/sections deliberately do NOT contain "widget", so the only
// hit is the body-proxy low-signal field (→ partial, never none / never strong).
const lowSignalOnly = doc({
  path: '.kiro/steering/Widget-Internals.md',
  title: 'Internal Plumbing',
  description: 'Internal plumbing notes.',
  purpose: 'Internal notes',
  sections: ['Notes'],
  relevantTasks: [],
});

describe('find_docs Layer-1 rubric derivation', () => {
  describe('three distinct fields (never collapsed)', () => {
    it('emits matchConfidence, viability, and rank as distinct fields', () => {
      const res = findDocsConcept([specPlanning], 'spec planning');
      expect(res.data).toHaveLength(1);
      const e = res.data[0];

      // Layer 1 ≠ Layer 2 ≠ Layer 3 — three separate keys.
      expect(e.matchConfidence).toBeDefined();
      expect(e.viability).toEqual({ placeholder: false, deprecated: false });
      expect(typeof e.rank).toBe('number');
      // matchedOn is mandatory whenever matchConfidence is emitted (Decision 1).
      expect(Array.isArray(e.matchedOn)).toBe(true);
      expect(e.matchedOn.length).toBeGreaterThan(0);
    });
  });

  describe('strong tier', () => {
    it('exact multi-token title match → strong ("spec planning")', () => {
      const res = findDocsConcept([specPlanning], 'spec planning');
      expect(res.data[0].matchConfidence).toBe('strong');
    });

    it('single high-signal token at 100% coverage → strong ("EARS")', () => {
      const res = findDocsConcept([specPlanning], 'EARS');
      expect(res.data[0].matchConfidence).toBe('strong');
      // Reconstructable: the description hit is in matchedOn.
      expect(res.data[0].matchedOn.some((m) => m.startsWith('description:'))).toBe(true);
    });
  });

  describe('incidental-token guard (the validated false-confidence fix)', () => {
    it('a lone incidental high-field token below 50% coverage → partial, not strong', () => {
      // 4 salient tokens; only "avatar" hits (in description). coverage = 1/4 = 25%.
      const res = findDocsConcept([sizingTokens], 'avatar profile presence indicator');
      expect(res.data).toHaveLength(1);
      expect(res.data[0].matchConfidence).toBe('partial');
      // The lone high-field hit is still surfaced (auditable), just capped.
      expect(res.data[0].matchedOn).toContain('description:avatar');
    });
  });

  describe('partial tier (body-only / low-signal → partial, never none)', () => {
    it('a low-signal-only (path-basename) match → partial', () => {
      // "widget" only appears in the path basename (low signal).
      const res = findDocsConcept([lowSignalOnly], 'widget');
      expect(res.data).toHaveLength(1);
      expect(res.data[0].matchConfidence).toBe('partial');
      expect(res.data[0].matchedOn).toContain('path:widget');
    });
  });

  describe('none tier (empty contract)', () => {
    it('a stop-word-only query → none (empty contract)', () => {
      const res = findDocsConcept([specPlanning], 'the and of with');
      expect(res.data).toEqual([]);
      expect(res.error).toBeNull();
      expect(res.matchConfidence).toBe('none');
    });

    it('zero salient-token matches in any field → none (empty contract)', () => {
      const res = findDocsConcept([specPlanning], 'zzqxnonexistentconcept');
      expect(res.data).toEqual([]);
      expect(res.matchConfidence).toBe('none');
    });
  });

  describe('partial vs none distinguishable from shape alone (P4)', () => {
    it('partial ⇒ non-empty data with a tier; none ⇒ empty contract', () => {
      const partialRes = findDocsConcept([lowSignalOnly], 'widget');
      const noneRes = findDocsConcept([lowSignalOnly], 'zzqxnonexistent');

      // partial: data is non-empty, entries carry a tier, no top-level matchConfidence.
      expect(partialRes.data.length).toBeGreaterThan(0);
      expect(partialRes.data[0].matchConfidence).toBe('partial');
      expect(partialRes.matchConfidence).toBeUndefined();

      // none: data empty, top-level matchConfidence: 'none'.
      expect(noneRes.data).toEqual([]);
      expect(noneRes.matchConfidence).toBe('none');
    });
  });

  describe('Layer 2 viability is a distinct gate, not folded into matchConfidence', () => {
    it('a strong placeholder doc still reports placeholder via viability', () => {
      const res = findDocsConcept([modalPlaceholder], 'modal');
      expect(res.data).toHaveLength(1);
      // strong match (exact title token, 100% coverage) ...
      expect(res.data[0].matchConfidence).toBe('strong');
      // ... but non-viable, surfaced via the SEPARATE viability field.
      expect(res.data[0].viability).toEqual({ placeholder: true, deprecated: false });
    });
  });

  // Spec 119-A Layer-3 RANK-only title tie-breaker (rank-only; matchConfidence untouched).
  describe('title rank tie-breaker (Spec 119-A)', () => {
    // Same coverage+tier for "color": one doc has it in the TITLE (IS about color),
    // the other only in its DESCRIPTION (mentions color).
    const colorFamily = doc({
      path: '.kiro/steering/Token-Family-Color.md',
      title: 'Token-Family-Color',
      description: 'Color scale tokens.',
      purpose: 'Color family token definitions',
      sections: ['Scale'],
    });
    const mentionsColor = doc({
      path: '.kiro/steering/Accessibility-Notes.md',
      title: 'Accessibility-Notes',
      description: 'Guidance on color contrast and legibility.',
      purpose: 'Accessibility guidance',
      sections: ['Contrast'],
    });

    it('a title hit out-ranks an equal-coverage description hit', () => {
      // mentionsColor listed FIRST: without the tie-breaker, input/corpus order
      // would rank it #1; the tie-breaker must actively reorder the title doc to #1.
      const res = findDocsConcept([mentionsColor, colorFamily], 'color');
      expect(res.data[0].path).toBe('.kiro/steering/Token-Family-Color.md');
      expect(res.data[0].rank).toBe(1);
    });

    it('does NOT change the confidence tier — both remain strong (rank-only)', () => {
      const res = findDocsConcept([mentionsColor, colorFamily], 'color');
      expect(res.data.every((e) => e.matchConfidence === 'strong')).toBe(true);
    });

    it('only breaks EXACT ties — a higher-coverage non-title match still wins', () => {
      // 2/2 tokens in description (score 6) must beat 1/2 in title (score ~3.5).
      const twoTokenDesc = doc({
        path: '.kiro/steering/Color-Theme-Overrides.md',
        title: 'Theme-Overrides',
        description: 'How color theme values are overridden per mode.',
      });
      const oneTokenTitle = doc({
        path: '.kiro/steering/Color.md',
        title: 'Color',
        description: 'Generic notes.',
      });
      const res = findDocsConcept([oneTokenTitle, twoTokenDesc], 'color theme');
      expect(res.data[0].path).toBe('.kiro/steering/Color-Theme-Overrides.md');
    });
  });
});

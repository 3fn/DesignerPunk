/**
 * materiality.test.ts — the generous extraction + canonical-form comparison
 * (Spec 127, design C4; Req 2.3): each pattern class, tick-only diff
 * immaterial, strike-through material, wrapped-line reflow immaterial;
 * class 4's whole-section body (ballot sitting-2 S6).
 */

import { normalizeCell } from '../normalize';
import {
  extractPromiseSurface,
  countPatternClasses,
  isMaterialAmendment,
  canonicalSurface,
} from '../materiality';

const BASE = `# Plan

**Type**: Implementation

- [ ] 1. Build the module

  **Success Criteria:**
  - the module exports two functions
  - the suite passes

  **Primary Artifacts:**
  - scripts/foo.ts

  **Merge gate:**
  - \`npm test\` green

- [ ] 2. Document it
`;

describe('extractPromiseSurface — the generous pattern set (closed, ballot § 5.7)', () => {
  test('extracts top-level checkbox lines (P1), any parent form', () => {
    const { segments } = extractPromiseSurface(BASE);
    expect(segments).toContain('- [ ] 1. Build the module');
    expect(segments).toContain('- [ ] 2. Document it');
  });

  test('extracts frozen criteria labels with bullet bodies (P2)', () => {
    const { segments } = extractPromiseSurface(BASE);
    expect(segments.join('\n')).toContain('the module exports two functions');
  });

  test('extracts the colon-outside form (P3) — the non-frozen shape the strict grammar refuses', () => {
    const text = '- [ ] 1. Legacy task\n\n**Success Criteria**:\n- legacy criterion body\n';
    const { segments } = extractPromiseSurface(text);
    expect(segments.join('\n')).toContain('legacy criterion body');
  });

  test('extracts heading-form criteria (P4) with bullet bodies', () => {
    const text = '## Success Criteria\n\n- heading-form criterion\n';
    const { segments } = extractPromiseSurface(text);
    expect(segments.join('\n')).toContain('heading-form criterion');
  });

  test('extracts Primary Artifacts (P5) and merge-gate lines (P6) with bodies', () => {
    const { segments } = extractPromiseSurface(BASE);
    expect(segments.join('\n')).toContain('scripts/foo.ts');
    expect(segments.join('\n')).toContain('`npm test` green');
  });

  test('extracts the canonical units heading (P7) and the 122 bold-prose form (P8)', () => {
    const p7 = '## Declared Merge Units (named up front)\n\n| Unit | Parents |\n|---|---|\n| U1 | 1 |\n';
    expect(extractPromiseSurface(p7).segments.join('\n')).toContain('| U1 | 1 |');
    const p8 = '**Merge units (the structure).** Eleven units, one PR each.\n';
    expect(extractPromiseSurface(p8).segments.join('\n')).toContain('Eleven units');
  });

  test('indented subtask checkboxes are NOT top-level promise surface', () => {
    const text = '- [ ] 1. Parent\n  - [ ] 1.1 Subtask detail\n';
    const { segments } = extractPromiseSurface(text);
    expect(segments).toContain('- [ ] 1. Parent');
    expect(segments.join('\n')).not.toContain('1.1 Subtask detail');
  });
});

describe('countPatternClasses — grep-equivalent per-class counts (§ 5.7 reconciliation)', () => {
  test('counts match the recipes: lines for P1/P4/P6/P7/P8, occurrences for P2/P3/P5', () => {
    const c = countPatternClasses(BASE);
    expect(c).toEqual({ P1: 2, P2: 1, P3: 0, P4: 0, P5: 1, P6: 1, P7: 0, P8: 0 });
  });

  test('a label mentioned INSIDE criterion text still counts (grep semantics, not extractor semantics)', () => {
    const text =
      '- [ ] 1. T\n  **Success Criteria:**\n  - the doc reproduces **Primary Artifacts:** blocks\n';
    expect(countPatternClasses(text).P5).toBe(1);
  });
});

describe('materiality — normalized-and-masked inequality (Req 2.3.2)', () => {
  test('a tick-only diff is IMMATERIAL (the mask absorbs it)', () => {
    const ticked = BASE.replace('- [ ] 1. Build the module', '- [x] 1. Build the module');
    expect(isMaterialAmendment(BASE, ticked)).toBe(false);
  });

  test('date/annotation edits outside the surface are IMMATERIAL automatically', () => {
    const dated = BASE.replace('**Type**: Implementation', '**Type**: Implementation\n**Date**: 2026-09-20');
    expect(isMaterialAmendment(BASE, dated)).toBe(false);
  });

  test('a wrapped-line reflow of a criterion is IMMATERIAL', () => {
    const wrapped = BASE.replace(
      '  - the module exports two functions',
      '  - the module exports\n    two functions'
    );
    expect(isMaterialAmendment(BASE, wrapped)).toBe(false);
  });

  test('a criterion word change IS material', () => {
    const relaxed = BASE.replace('the suite passes', 'the suite mostly passes');
    expect(isMaterialAmendment(BASE, relaxed)).toBe(true);
  });

  test('strike-through supersession of a parent IS material (the 118 pattern costs the declaration line)', () => {
    const struck = BASE.replace('- [ ] 2. Document it', '- [ ] ~~2. Document it~~');
    expect(isMaterialAmendment(BASE, struck)).toBe(true);
  });

  test('removing a Primary Artifacts entry IS material', () => {
    const dropped = BASE.replace('  - scripts/foo.ts\n', '');
    expect(isMaterialAmendment(BASE, dropped)).toBe(true);
  });

  test('canonicalSurface is stable across NBSP/zero-width copy-paste artifacts', () => {
    const pasted = BASE.replace('exports two functions', 'exports two​functions');
    // NBSP collapses to a space; the zero-width strips — the join differs:
    // 'two functions' vs 'twofunctions' is a REAL glyph-content change, so
    // only the NBSP variant is immaterial.
    const nbspOnly = BASE.replace('exports two functions', 'exports two functions');
    expect(canonicalSurface(nbspOnly)).toBe(canonicalSurface(BASE));
    expect(canonicalSurface(pasted)).not.toBe(canonicalSurface(BASE));
  });
});

/**
 * Class 4 takes its whole section (ballot
 * 2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form S6). Each
 * stop shape the old bullet-body rule truncated at gets a fixture, and a
 * reworded criterion after the old stop point must read MATERIAL. The bite:
 * the pre-S6 extractor goes red on five of the six tests in this block; the
 * Primary Artifacts pin passes under both rules, which is what it pins.
 */
describe('class 4 — the heading label takes its whole section (S6)', () => {
  // Shape 1: intro prose (001, 002, 003, web-format-cleanup).
  const INTRO_PROSE = `- [x] 9. Final task

## Success Criteria

Spec is complete when:

- every token resolves to a primitive
- the suite passes with zero skips
`;

  // Shape 2: bold sub-labels (010, 011, 012).
  const BOLD_SUB_LABEL = `## Success Criteria

**Critical Success** (Required):
- the release pipeline publishes to both registries

**Nice to Have**:
- the changelog links every PR
`;

  // Shape 3: a numbered list (011-inset, 034, 119-B, issue-fix-*, release-detection).
  const NUMBERED = `## Success Criteria

1. Every inset token carries its new name
2. No component references a retired name
`;

  test('intro prose: the bullets after it are in the surface', () => {
    expect(extractPromiseSurface(INTRO_PROSE).segments.join('\n')).toContain('the suite passes with zero skips');
  });

  test('intro prose: a reworded criterion after the old stop point IS material', () => {
    const relaxed = INTRO_PROSE.replace('with zero skips', 'with few skips');
    expect(isMaterialAmendment(INTRO_PROSE, relaxed)).toBe(true);
  });

  test('bold sub-label: every sub-group is in the surface, and rewording one IS material', () => {
    expect(extractPromiseSurface(BOLD_SUB_LABEL).segments.join('\n')).toContain('the changelog links every PR');
    const relaxed = BOLD_SUB_LABEL.replace('to both registries', 'to one registry');
    expect(isMaterialAmendment(BOLD_SUB_LABEL, relaxed)).toBe(true);
  });

  test('numbered list: the items are in the surface, and deleting one IS material', () => {
    expect(extractPromiseSurface(NUMBERED).segments.join('\n')).toContain('No component references a retired name');
    const dropped = NUMBERED.replace('2. No component references a retired name\n', '');
    expect(isMaterialAmendment(NUMBERED, dropped)).toBe(true);
  });

  test('a **Primary Artifacts:** label inside a class-4 section is taken in, with no change to the normalized surface', () => {
    const text = `## Success Criteria

- the module ships

**Primary Artifacts:**
- scripts/foo.ts
`;
    const { segments } = extractPromiseSurface(text);
    // taken in once, by the section, not re-extracted as its own class-5 block
    expect(segments.filter((l) => l.includes('**Primary Artifacts:**'))).toHaveLength(1);
    expect(canonicalSurface(text)).toBe(
      normalizeCell('## Success Criteria\n- the module ships\n**Primary Artifacts:**\n- scripts/foo.ts')
    );
  });

  test('the section ends at the next heading of any level, a thematic break or a top-level checkbox line', () => {
    const afterHeading = '## Success Criteria\n\n- in\n\n### Notes\n\n- out\n';
    expect(extractPromiseSurface(afterHeading).segments.join('\n')).not.toContain('- out');
    const afterBreak = '## Success Criteria\n\n- in\n\n---\n\n- out\n';
    expect(extractPromiseSurface(afterBreak).segments.join('\n')).not.toContain('- out');
    const afterCheckbox = '## Success Criteria\n\n- in\n\n- [ ] 2. Next task\n  - out\n';
    const surface = extractPromiseSurface(afterCheckbox).segments;
    expect(surface).toContain('- [ ] 2. Next task'); // the checkbox is still its own class-1 segment
    expect(surface.join('\n')).not.toContain('  - out');
  });
});

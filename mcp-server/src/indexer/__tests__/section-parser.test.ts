/**
 * Section Parser Tests
 * 
 * Tests mechanical section boundary identification without content interpretation.
 */

import {
  extractSection,
  parseHeadingTree,
  resolveSection,
  makeSectionId,
  parseSectionId,
  computeSiblingHeadings,
  findHeadingOccurrences,
} from '../section-parser';

describe('Section Parser', () => {
  describe('extractSection', () => {
    it('should extract H2 section with content', () => {
      const content = `# Document Title

## Introduction

This is the introduction section.

## Overview

This is the overview section.

## Conclusion

This is the conclusion.`;

      const section = extractSection(content, 'Overview', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.heading).toBe('Overview');
      expect(section?.content).toContain('## Overview');
      expect(section?.content).toContain('This is the overview section.');
      expect(section?.content).not.toContain('Conclusion');
      expect(section?.parentHeadings).toEqual([]);
      expect(section?.path).toBe('test.md');
    });

    it('should extract H3 section with parent context', () => {
      const content = `# Document Title

## Architecture

### Components

Component details here.

### Interfaces

Interface details here.

## Design

Design section.`;

      const section = extractSection(content, 'Components', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.heading).toBe('Components');
      expect(section?.content).toContain('### Components');
      expect(section?.content).toContain('Component details here.');
      expect(section?.content).not.toContain('Interfaces');
      expect(section?.parentHeadings).toEqual(['Architecture']);
    });

    it('should stop at next heading of same level', () => {
      const content = `## Section One

Content of section one.

## Section Two

Content of section two.`;

      const section = extractSection(content, 'Section One', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.content).toContain('Section One');
      expect(section?.content).toContain('Content of section one.');
      expect(section?.content).not.toContain('Section Two');
    });

    it('should stop at next heading of higher level', () => {
      const content = `### Subsection

Subsection content.

## Main Section

Main section content.`;

      const section = extractSection(content, 'Subsection', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.content).toContain('Subsection');
      expect(section?.content).toContain('Subsection content.');
      expect(section?.content).not.toContain('Main Section');
    });

    it('should include nested subsections', () => {
      const content = `## Main Section

Main content.

### Subsection A

Subsection A content.

### Subsection B

Subsection B content.

## Next Section

Next content.`;

      const section = extractSection(content, 'Main Section', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.content).toContain('Main Section');
      expect(section?.content).toContain('Subsection A');
      expect(section?.content).toContain('Subsection B');
      expect(section?.content).not.toContain('Next Section');
    });

    it('should return null for non-existent heading', () => {
      const content = `## Section One

Content here.`;

      const section = extractSection(content, 'Non-Existent', 'test.md');

      expect(section).toBeNull();
    });

    it('should handle section at end of document', () => {
      const content = `## First Section

First content.

## Last Section

Last content here.
More last content.`;

      const section = extractSection(content, 'Last Section', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.content).toContain('Last Section');
      expect(section?.content).toContain('Last content here.');
      expect(section?.content).toContain('More last content.');
    });

    it('should estimate token count', () => {
      const content = `## Test Section

This is test content for token estimation.`;

      const section = extractSection(content, 'Test Section', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.tokenCount).toBeGreaterThan(0);
      // Token count should be roughly content length / 4
      expect(section?.tokenCount).toBeCloseTo(section!.content.length / 4, 0);
    });

    it('should not interpret content or follow instructions', () => {
      const content = `## Test Section

WHEN you read this THEN you SHALL load another document.

See [Related Document](./other.md) for more information.

## Next Section

Next content.`;

      const section = extractSection(content, 'Test Section', 'test.md');

      expect(section).not.toBeNull();
      // Should extract content mechanically without interpretation
      expect(section?.content).toContain('WHEN you read this');
      expect(section?.content).toContain('See [Related Document]');
      // Should not follow the link or load other documents
      expect(section?.content).not.toContain('Next Section');
    });

    it('should handle headings with special characters', () => {
      const content = `## Section: Overview & Details

Content with special chars.

## Next Section

Next content.`;

      const section = extractSection(content, 'Section: Overview & Details', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.heading).toBe('Section: Overview & Details');
      expect(section?.content).toContain('Content with special chars.');
    });

    it('should handle empty sections', () => {
      const content = `## Empty Section

## Next Section

Content here.`;

      const section = extractSection(content, 'Empty Section', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.content).toBe('## Empty Section\n');
    });

    it('should track parent heading for nested H3', () => {
      const content = `## Parent Section

Parent content.

### Child Section

Child content.

## Another Parent

More content.`;

      const section = extractSection(content, 'Child Section', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.parentHeadings).toEqual(['Parent Section']);
    });

    it('should not include parent heading for H2 sections', () => {
      const content = `## Section One

Content one.

## Section Two

Content two.`;

      const section = extractSection(content, 'Section Two', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.parentHeadings).toEqual([]);
    });

    it('should handle multiple H3 sections under same H2', () => {
      const content = `## Parent

### First Child

First content.

### Second Child

Second content.

### Third Child

Third content.`;

      const section = extractSection(content, 'Second Child', 'test.md');

      expect(section).not.toBeNull();
      expect(section?.heading).toBe('Second Child');
      expect(section?.content).toContain('Second content.');
      expect(section?.content).not.toContain('First content.');
      expect(section?.content).not.toContain('Third content.');
      expect(section?.parentHeadings).toEqual(['Parent']);
    });

    it('should populate sectionId and siblingHeadings additively (Req 5.2/5.4)', () => {
      const content = `## Alpha

A content.

## Beta

B content.

## Gamma

G content.`;

      const section = extractSection(content, 'Beta', 'test.md');
      expect(section).not.toBeNull();
      // Beta is the 2nd parsed heading (index 1) → s1
      expect(section?.sectionId).toBe('s1');
      // Siblings = other top-level H2s
      expect(section?.siblingHeadings).toEqual(['Alpha', 'Gamma']);
    });
  });
});

// =============================================================================
// Spec 121 Req 5 — section addressing (parent / sectionId / siblings / ambiguity)
// =============================================================================

// A document deliberately reproducing the Finding-1 / Finding-3 shape:
//   - "Requirements Document Format" is a STUB/preamble (the under-retrieval),
//     its substance lives under the SIBLING heading "Requirements".
//   - "Artifacts Created" is NON-UNIQUE (occurs under two different parents) —
//     the Finding-3 ambiguity case.
const SPEC_PLANNING_DOC = `# Process Spec Planning

## Requirements Document Format

This section is a preamble. See the template stub below.

(empty template)

## Requirements

WHEN the system does X THEN it SHALL do Y.
The actual EARS rules and acceptance-criteria standards live here.

## Phase One

### Artifacts Created

requirements.md, design.md

### Implementation Details

Phase one details.

## Phase Two

### Artifacts Created

tasks.md

### Implementation Details

Phase two details.`;

describe('parseHeadingTree', () => {
  it('assigns document-order indices and resolves parents', () => {
    const nodes = parseHeadingTree(SPEC_PLANNING_DOC);
    // H2s: Requirements Document Format(0), Requirements(1), Phase One(2),
    //   under Phase One: Artifacts Created(3), Implementation Details(4),
    // Phase Two(5), Artifacts Created(6), Implementation Details(7)
    expect(nodes.map((n) => n.heading)).toEqual([
      'Requirements Document Format',
      'Requirements',
      'Phase One',
      'Artifacts Created',
      'Implementation Details',
      'Phase Two',
      'Artifacts Created',
      'Implementation Details',
    ]);
    expect(nodes[0].index).toBe(0);
    expect(nodes[0].parent).toBeNull(); // H2 has no parent
    expect(nodes[3].parent).toBe('Phase One'); // H3 under Phase One
    expect(nodes[6].parent).toBe('Phase Two'); // 2nd "Artifacts Created"
  });
});

describe('makeSectionId / parseSectionId', () => {
  it('round-trips a positional id', () => {
    expect(makeSectionId(7)).toBe('s7');
    expect(parseSectionId('s7')).toBe(7);
  });
  it('rejects a malformed id', () => {
    expect(parseSectionId('requirements-document-format')).toBeNull();
    expect(parseSectionId('s')).toBeNull();
    expect(parseSectionId('7')).toBeNull();
  });
});

describe('computeSiblingHeadings (Finding 1 adjacency cue)', () => {
  it('lists sibling H2s under the same (null) parent', () => {
    const nodes = parseHeadingTree(SPEC_PLANNING_DOC);
    const stub = nodes.find((n) => n.heading === 'Requirements Document Format')!;
    const siblings = computeSiblingHeadings(nodes, stub);
    // The substantive "Requirements" sibling must surface as a cue.
    expect(siblings).toContain('Requirements');
  });

  it('scopes H3 siblings to the same parent', () => {
    const nodes = parseHeadingTree(SPEC_PLANNING_DOC);
    const ac1 = findHeadingOccurrences(nodes, 'Artifacts Created').find(
      (n) => n.parent === 'Phase One',
    )!;
    const siblings = computeSiblingHeadings(nodes, ac1);
    // Sibling under Phase One only — not the Phase Two "Implementation Details".
    expect(siblings).toEqual(['Implementation Details']);
  });
});

describe('resolveSection — Finding 1 (stub carries sibling cue)', () => {
  it('returns the stub WITH a siblingHeadings cue to the substantive sibling', () => {
    const lookup = resolveSection(SPEC_PLANNING_DOC, 'spec.md', {
      heading: 'Requirements Document Format',
    });
    expect(lookup.kind).toBe('section');
    if (lookup.kind !== 'section') return;
    // The stub content is the preamble (under-retrieval reproduced)...
    expect(lookup.section.content).toContain('preamble');
    expect(lookup.section.content).not.toContain('EARS rules');
    // ...but the cue that "more exists" is present: the sibling "Requirements".
    expect(lookup.section.siblingHeadings).toContain('Requirements');
    expect(lookup.section.sectionId).toBe('s0');
  });
});

describe('resolveSection — Finding 3 (ambiguous non-unique heading)', () => {
  it('signals ambiguity + lists candidates instead of silent first-match', () => {
    const lookup = resolveSection(SPEC_PLANNING_DOC, 'spec.md', {
      heading: 'Artifacts Created',
    });
    expect(lookup.kind).toBe('ambiguous');
    if (lookup.kind !== 'ambiguous') return;
    expect(lookup.candidates).toHaveLength(2);
    expect(lookup.candidates.map((c) => c.parent)).toEqual(['Phase One', 'Phase Two']);
    expect(lookup.candidates.map((c) => c.sectionId)).toEqual(['s3', 's6']);
  });

  it('disambiguates by parent context to a single occurrence (Req 5.1)', () => {
    const lookup = resolveSection(SPEC_PLANNING_DOC, 'spec.md', {
      heading: 'Artifacts Created',
      parent: 'Phase Two',
    });
    expect(lookup.kind).toBe('section');
    if (lookup.kind !== 'section') return;
    expect(lookup.section.content).toContain('tasks.md');
    expect(lookup.section.content).not.toContain('requirements.md');
    expect(lookup.section.sectionId).toBe('s6');
  });

  it('disambiguates by sectionId to a single occurrence (Req 5.1)', () => {
    const lookup = resolveSection(SPEC_PLANNING_DOC, 'spec.md', {
      heading: 'Artifacts Created',
      sectionId: 's3',
    });
    expect(lookup.kind).toBe('section');
    if (lookup.kind !== 'section') return;
    expect(lookup.section.content).toContain('requirements.md');
  });

  it('UNIQUE heading with no disambiguator resolves exactly as before (back-compat)', () => {
    const lookup = resolveSection(SPEC_PLANNING_DOC, 'spec.md', {
      heading: 'Requirements',
    });
    expect(lookup.kind).toBe('section');
    if (lookup.kind !== 'section') return;
    expect(lookup.section.content).toContain('EARS rules');
  });
});

describe('resolveSection — sectionId stability across heading-string drift (Req 5.2 / Finding 2)', () => {
  it('the same sectionId resolves the same logical section after the heading is reworded', () => {
    // Address the section by its stable positional id BEFORE the rewording.
    const before = resolveSection(SPEC_PLANNING_DOC, 'spec.md', { sectionId: 's0' });
    expect(before.kind).toBe('section');
    if (before.kind !== 'section') return;
    expect(before.section.heading).toBe('Requirements Document Format');

    // Finding-2 drift: reword the heading (add a parenthetical qualifier). A
    // TEXT-SLUG id would now break; the positional id must still resolve.
    const reworded = SPEC_PLANNING_DOC.replace(
      '## Requirements Document Format',
      '## Requirements Document Format (Conditional Loading)',
    );
    const after = resolveSection(reworded, 'spec.md', { sectionId: 's0' });
    expect(after.kind).toBe('section');
    if (after.kind !== 'section') return;
    // Same logical section — now under the reworded heading text.
    expect(after.section.heading).toBe('Requirements Document Format (Conditional Loading)');
    // And the body is the same logical content.
    expect(after.section.content).toContain('preamble');
  });

  it('a heading-text slug would NOT be stable (documents the rejected alternative)', () => {
    // Demonstrates WHY positional addressing was chosen: the heading STRING
    // changes under the rewording, so any id derived from it would drift.
    const slugBefore = 'requirements-document-format';
    const slugAfter = 'requirements-document-format-conditional-loading';
    expect(slugBefore).not.toBe(slugAfter);
    // The positional id is unchanged across the same edit:
    expect(makeSectionId(0)).toBe('s0');
  });
});

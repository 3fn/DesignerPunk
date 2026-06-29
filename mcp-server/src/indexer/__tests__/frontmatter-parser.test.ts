/**
 * Frontmatter + viability parser — unit tests (Spec 121 Task 5.x)
 *
 * Pins extraction of the high-signal title/description surfaces and the doc-level
 * Layer-2 viability gate (placeholder / deprecated).
 */

import { extractFrontmatterInfo, slugifyTitle } from '../frontmatter-parser';

const SPEC_PLANNING = `---
inclusion: manual
name: Process-Spec-Planning
description: Standards for creating spec documents — requirements format (EARS patterns), design document structure.
---

# Spec Planning Standards

**Date**: 2025-01-10
`;

const MODAL_PLACEHOLDER = `---
inclusion: manual
name: Component-Family-Modal
description: Modal component family (placeholder) — planned overlay components.
---

# Modals Components

**Date**: 2026-01-02

## Family Overview

**Family**: Modals
**Readiness**: 🔴 Placeholder

> ⚠️ **Placeholder Status**: This family is structurally defined but not yet implemented.
`;

const NO_FRONTMATTER = `# Plain Doc

**Date**: 2026-01-01
**Purpose**: A plain doc with no frontmatter.
`;

const DEPRECATED_FM = `---
name: Old-Thing
status: deprecated
description: An old doc.
---

# Old Thing
`;

describe('extractFrontmatterInfo', () => {
  it('extracts frontmatter name (title) + description as high-signal surfaces', () => {
    const info = extractFrontmatterInfo(SPEC_PLANNING);
    expect(info.title).toBe('Process-Spec-Planning');
    expect(info.description).toContain('EARS patterns');
    expect(info.viability).toEqual({ placeholder: false, deprecated: false });
  });

  it('derives placeholder viability from the Readiness/callout/(placeholder) markers', () => {
    const info = extractFrontmatterInfo(MODAL_PLACEHOLDER);
    expect(info.title).toBe('Component-Family-Modal');
    expect(info.viability.placeholder).toBe(true);
    expect(info.viability.deprecated).toBe(false);
  });

  it('falls back to the first H1 when no frontmatter name is present', () => {
    const info = extractFrontmatterInfo(NO_FRONTMATTER);
    expect(info.title).toBe('Plain Doc');
    expect(info.description).toBeUndefined();
    expect(info.viability).toEqual({ placeholder: false, deprecated: false });
  });

  it('derives deprecated viability from frontmatter status (forward-compatible)', () => {
    const info = extractFrontmatterInfo(DEPRECATED_FM);
    expect(info.viability.deprecated).toBe(true);
    expect(info.viability.placeholder).toBe(false);
  });

  it('does not treat a body horizontal rule as frontmatter', () => {
    const noFm = extractFrontmatterInfo('# Title\n\nbody\n\n---\n\nmore body\n');
    expect(noFm.title).toBe('Title');
    expect(noFm.description).toBeUndefined();
  });
});

// ===========================================================================
// Spec 119-A: slugifyTitle + id / idSource extraction
// ===========================================================================

describe('slugifyTitle (Spec 119-A Component 1)', () => {
  it('lowercases, converts spaces to hyphens', () => {
    expect(slugifyTitle('Token Governance')).toBe('token-governance');
  });

  it('converts underscores to hyphens', () => {
    expect(slugifyTitle('AI_Collaboration_Principles')).toBe('ai-collaboration-principles');
  });

  it('strips characters outside [a-z0-9-]', () => {
    expect(slugifyTitle('Cross-Platform vs. Platform-Specific (Decision)!'))
      .toBe('cross-platform-vs-platform-specific-decision');
  });

  it('collapses repeated hyphens and trims leading/trailing hyphens', () => {
    expect(slugifyTitle('  --Start   Up   Tasks--  ')).toBe('start-up-tasks');
  });

  it('keeps digits', () => {
    expect(slugifyTitle('Spec 119-A Notes')).toBe('spec-119-a-notes');
  });

  // The 10 space-bearing filenames' titles (Req 3 rename targets): slug must be
  // the kebab form the rename produces, with `id` unchanged by the rename.
  it('produces kebab ids for the space-bearing titles', () => {
    expect(slugifyTitle('Core Goals')).toBe('core-goals');
    expect(slugifyTitle('Start Up Tasks')).toBe('start-up-tasks');
    expect(slugifyTitle('Cross-Platform vs Platform-Specific Decision Framework'))
      .toBe('cross-platform-vs-platform-specific-decision-framework');
    expect(slugifyTitle('Component Development Guide')).toBe('component-development-guide');
    expect(slugifyTitle('Completion Documentation Guide')).toBe('completion-documentation-guide');
  });

  it('returns empty string for a title with no slug-safe characters', () => {
    expect(slugifyTitle('!!! ??? ...')).toBe('');
  });
});

describe('extractFrontmatterInfo — id / idSource (Spec 119-A Req 2 AC9)', () => {
  it('passes through an explicit frontmatter id (idSource=frontmatter)', () => {
    const info = extractFrontmatterInfo(
      `---\nname: Token Governance\nid: token-governance\n---\n\n# Token Governance\n`,
    );
    expect(info.id).toBe('token-governance');
    expect(info.idSource).toBe('frontmatter');
  });

  it('does not re-derive when an explicit id differs from the name slug', () => {
    // Decision 3: id can intentionally drift from title; explicit wins, no re-slug.
    const info = extractFrontmatterInfo(
      `---\nname: Renamed Title\nid: original-id\n---\n\n# Renamed Title\n`,
    );
    expect(info.id).toBe('original-id');
    expect(info.idSource).toBe('frontmatter');
  });

  it('derives the kebab-slug of name when no explicit id (idSource=derived-name)', () => {
    const info = extractFrontmatterInfo(
      `---\nname: Rosetta System Architecture\ndescription: x\n---\n\n# Something Else\n`,
    );
    expect(info.id).toBe('rosetta-system-architecture');
    expect(info.idSource).toBe('derived-name');
  });

  // The 14-doc path flagged by Task 1: docs with NO `name:` field fall back to H1.
  it('falls back to the H1 slug when there is no name field (idSource=derived-h1)', () => {
    const info = extractFrontmatterInfo(
      `---\ninclusion: always\ndescription: a doc with no name field\n---\n\n# Personal Note\n\nbody\n`,
    );
    expect(info.id).toBe('personal-note');
    expect(info.idSource).toBe('derived-h1');
  });

  it('derives from H1 when there is no frontmatter block at all (derived-h1)', () => {
    const info = extractFrontmatterInfo(`# Plain Doc Title\n\nbody\n`);
    expect(info.id).toBe('plain-doc-title');
    expect(info.idSource).toBe('derived-h1');
  });

  it('reports idSource=none + undefined id when there is no id, name, or H1', () => {
    const info = extractFrontmatterInfo(`Just some prose with no heading and no frontmatter.\n`);
    expect(info.id).toBeUndefined();
    expect(info.idSource).toBe('none');
  });

  it('reports none (not id="") when name/H1 slug collapses to empty', () => {
    const info = extractFrontmatterInfo(`---\nname: "!!! ???"\n---\n\nbody\n`);
    // No usable slug from name and no H1 → none, never id ''.
    expect(info.id).toBeUndefined();
    expect(info.idSource).toBe('none');
  });

  it('prefers name-slug over H1 when both exist', () => {
    const info = extractFrontmatterInfo(
      `---\nname: The Name Field\n---\n\n# A Different H1\n`,
    );
    expect(info.id).toBe('the-name-field');
    expect(info.idSource).toBe('derived-name');
  });
});

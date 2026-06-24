/**
 * Frontmatter + viability parser — unit tests (Spec 121 Task 5.x)
 *
 * Pins extraction of the high-signal title/description surfaces and the doc-level
 * Layer-2 viability gate (placeholder / deprecated).
 */

import { extractFrontmatterInfo } from '../frontmatter-parser';

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

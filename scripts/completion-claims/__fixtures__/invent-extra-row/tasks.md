# Implementation Plan: 121 — Badge Count Variants

**Date**: 2026-11-02
**Spec**: 121 — Badge Count Variants
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 2. Ship the Badge-Count-Base web implementation

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - `Badge-Count-Base` renders counts above 99 as `99+` without layout shift
  - The component satisfies every contract listed on its schema, verified by the contract suite
  - Count changes are announced to assistive technology via a polite live region

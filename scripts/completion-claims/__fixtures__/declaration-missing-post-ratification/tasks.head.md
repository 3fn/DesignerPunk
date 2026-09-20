# Implementation Plan: 145 — Chip Filter Variants

**Date**: 2026-12-14
**Spec**: 145 — Chip Filter Variants
**Author**: Lina

## Declared Merge Units

| Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units) |
|---|---|---|---|
| **U1 — The variants** | Task 1 | Task 1 | — |

## Tasks

- [ ] 1. Ship the Chip-Filter variants

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Chip-Filter-Base renders selected and unselected states from semantic tokens only
  - The web implementation announces selection changes to assistive technology
  - The iOS implementation announces selection changes to assistive technology
  - The Android implementation announces selection changes to assistive technology

  **Primary Artifacts:**
  - src/components/chip/ChipFilterBase.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens

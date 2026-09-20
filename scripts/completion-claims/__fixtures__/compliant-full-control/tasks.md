# Implementation Plan: 172 — Chip Family Cross-Platform Parity

**Date**: 2027-03-09
**Spec**: 172 — Chip Family Cross-Platform Parity
**Author**: Lina
**Criteria mode**: per-parent

## Declared Merge Units

| Unit | Parents | Gating parent | Midpoint carrier (specs ≥ 3 units) |
|---|---|---|---|
| **U1 — Web + iOS** | Task 1 | Task 1 | — |
| **U2 — Android** | Task 2 | Task 2 | — |

## Tasks

- [x] 1. Bring Chip-Filter-Base to parity on web and iOS

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Chip-Filter-Base resolves every color through the semantic layer, with no primitive references in component code
  - The web implementation announces selection changes to assistive technology, verified against the component contract
  - The iOS implementation announces selection changes to assistive technology, verified against the component contract
  - The Android implementation announces selection changes to assistive technology, verified against the component contract
  - The visual direction for the selected state is approved by Leonardo before the PR opens

  **Primary Artifacts:**
  - src/components/chip/ChipFilterBase.ts
  - src/components/chip/__tests__/ChipFilterBase.contracts.test.ts
  - src/components/chip/platforms/android/ChipFilterBase.kt

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens
  - `npx tsc --noEmit` clean before the PR opens

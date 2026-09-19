# Implementation Plan: 131 — Navigation Family Cutover

**Date**: 2026-11-16
**Spec**: 131 — Navigation Family Cutover
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 2. Cut the Navigation family over to the new contract set

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Every Navigation component declares the `navigation_traversable` contract in its schema
  - The contract suite passes for all five Navigation components
  - No consumer-facing prop names change in this cutover

  **Primary Artifacts:**
  - src/components/navigation/schemas/
  - src/components/navigation/__tests__/contracts.test.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens
  - Both platform demos reviewed by Leonardo and the review comment linked

# Implementation Plan: 136 — Kotlin Generator Parity

**Date**: 2026-12-01
**Spec**: 136 — Kotlin Generator Parity
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 3. Bring the Kotlin generator to parity with Swift

  **Type**: Implementation
  **Agent**: Ada (main session)

  **Success Criteria:**
  - The Kotlin generator emits every token family the Swift generator emits
  - Generated Kotlin constant names follow the platform naming rule in the architecture doc
  - The drift audit reports zero differences between the two generators' family coverage

  **Primary Artifacts:**
  - src/generators/kotlin/
  - src/generators/kotlin/__tests__/fixtures/
  - docs/token-system-overview.md (modified)

  **Merge gate:**
  - `npm run audit:theme-drift` green before the PR opens

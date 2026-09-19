# Implementation Plan: 141 — In-Flight Migration Pass

**Date**: 2026-09-10
**Spec**: 141 — In-Flight Migration Pass
**Author**: Lina
**Criteria mode**: per-parent

## Tasks

- [x] 5. Complete the in-flight migration of the Badge family

  **Type**: Implementation
  **Agent**: Lina (main session)

  **Success Criteria:**
  - Every Badge component resolves its tokens through the semantic layer
  - The Badge contract suite passes on all three platforms

  **Primary Artifacts:**
  - src/components/badge/
  - src/components/badge/__tests__/contracts.test.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens

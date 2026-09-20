# Implementation Plan: 139 — Claims Pipeline Tooling

**Date**: 2026-12-07
**Spec**: 139 — Claims Pipeline Tooling
**Author**: Thurgood
**Criteria mode**: per-parent

## Tasks

- [x] 2. Build the claims-pipeline modules

  **Type**: Implementation
  **Agent**: Thurgood (main session)

  **Success Criteria:**
  - The normalization module implements the four rules and the checkbox mask with its own suite
  - The tasks.md parser recognizes all three parent forms with its own suite

  **Primary Artifacts:**
  - scripts/completion-claims/normalize.ts
  - scripts/completion-claims/tasks-md.ts
  - scripts/completion-claims/materiality.ts

  **Merge gate:**
  - `npm test` green on the unit branch before the PR opens

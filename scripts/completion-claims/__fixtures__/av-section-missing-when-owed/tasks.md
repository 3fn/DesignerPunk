# Implementation Plan: 133 — Release Tooling Rewrite

**Date**: 2026-11-23
**Spec**: 133 — Release Tooling Rewrite
**Author**: Thurgood
**Criteria mode**: per-parent

## Tasks

- [x] 1. Replace the release manager with the delta pipeline

  **Type**: Implementation
  **Agent**: Thurgood (main session)

  **Success Criteria:**
  - The delta pipeline derives the release delta from merged unit PRs with no manual list
  - `npm run release:dry-run` produces the same delta as the retired tool on the last three releases
  - The 36 retired files are deleted and no import references survive

  **Primary Artifacts:**
  - scripts/release/delta-pipeline.ts
  - .kiro/hooks/RELEASE-FLOW.md

  **Merge gate:**
  - The dry-run comparison output is pasted into the completion doc
  - `npm test` green including the release suites

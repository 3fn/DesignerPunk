# Task 1 Completion: Replace the release manager with the delta pipeline

**Date**: 2026-11-27
**Task**: 1. Replace the release manager with the delta pipeline
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The delta pipeline derives the release delta from merged unit PRs with no manual list | ✅ | `scripts/release/delta-pipeline.ts` |
| `npm run release:dry-run` produces the same delta as the retired tool on the last three releases | ✅ | `npm run release:dry-run → identical delta on v13.2.0, v13.3.0, v14.0.0` |
| The 36 retired files are deleted and no import references survive | ✅ | `npx tsc --noEmit → 0 errors` |

Unmet or partially met criteria: None

## Overall Integration Story

The delta pipeline now reads merged unit PRs directly, which removes the hand-maintained
release list that produced two mis-stated deltas in the previous cycle. The retired tool's
36 files are gone; the RELEASE-FLOW document points at the new commands throughout.

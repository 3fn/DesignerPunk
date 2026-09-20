# Task 2 Completion: Build the claims-pipeline modules

**Date**: 2026-12-10
**Task**: 2. Build the claims-pipeline modules
**Type**: Implementation
**Status**: Complete

## Success Criteria Verification

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The normalization module implements the four rules and the checkbox mask with its own suite | ✅ | `normalize.test.ts › four rules applied in order` |
| The tasks.md parser recognizes all three parent forms with its own suite | ✅ | `tasks-md.test.ts › plain, bold and task-label parent forms` |

Unmet or partially met criteria: None

### Additional verification

| Condition (verbatim) | Status | Evidence |
|---|---|---|
| `npm test` green on the unit branch before the PR opens | ✅ | `npm test → 0 failures, 418 suites` |

Primary Artifacts: all shipped as declared, except as noted below

Artifact deferred to U3: scripts/completion-claims/materiality.ts — ships with the charters unit

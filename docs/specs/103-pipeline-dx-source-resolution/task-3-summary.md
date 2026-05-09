# Task 3 Summary: Validate Command

**Date**: 2026-05-09
**Purpose**: Standalone token validation for product repos
**Organization**: spec-summary
**Scope**: 103-pipeline-dx-source-resolution

---

## What Was Done

Added `npx designerpunk validate` — a standalone CLI command that runs 4 token validation checks (required fields, family membership, semantic references, mathematical relationships) against the active token source and reports results with specific error details.

## Why It Matters

Product repos editing token definitions can now validate correctness without generating files. This catches mathematical relationship violations, missing fields, and broken semantic references before committing changes — filling the gap where token unit tests couldn't be run from product repos.

## Key Changes

- `src/cli/validate.ts` — `runValidate()` orchestrating 4 checks via existing validators
- `src/cli/designerpunk.ts` — `validate` command registered, help text updated
- Exit code 0 on all-pass, 1 on any failure (CI-friendly)

## Impact

- Product developers get immediate feedback on token edits
- No new validation logic — reuses `SemanticTokenValidator`, `MathematicalRelationshipParser`, and registry registration
- Source-aware: validates whichever source the pipeline would use for generation

# Task 3.2 Completion: Update Integration Guide

**Date**: 2026-05-10
**Task**: 3.2 Update Integration Guide
**Type**: Setup
**Status**: Complete

---

## Artifacts Modified

- `.kiro/steering/DesignerPunk-Integration-Guide.md` — Added "Running Component Tests" section

## Implementation Details

### Approach

Added a new section between "Build Your Product" (section 7) and "Native Platform Sync" covering the complete test setup workflow for product repos.

### Section Contents

| Subsection | Content |
|-----------|---------|
| Setup | 4 devDependencies, `jest.config.js` (one-line spread), `tsconfig.test.json` (full options) |
| Running Tests | `npx jest` commands with path filtering examples |
| Shared Test Utilities | Import example with all 6 commonly-used utilities |
| Minimal Working Example | Complete test file showing fixture creation, shadow DOM wait, assertion, cleanup |
| Stemma Validators | Import path for `.stemma.test.ts` pattern |
| Notes | jsdom default, `jest-environment-jsdom` requirement, stale source guidance |

### Key Decisions

- **Included full `tsconfig.test.json`** in the guide (not just a reference) — developers need to see the exact options
- **Minimal working example** uses Button-CTA as the reference component — it's the most familiar component and demonstrates the full lifecycle (register → fixture → shadow DOM → assert → cleanup)
- **Stale source note** addresses Leonardo's concern from the design-outline review

## Requirements Compliance

| Requirement | AC | Status |
|-------------|-----|--------|
| 5.1 | "Running Component Tests" section with devDeps, config, and run commands | ✅ |
| 5.2 | Note that `jest-environment-jsdom` is required | ✅ |
| 5.3 | Note stale source scenario with re-run init guidance | ✅ |

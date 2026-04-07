# Task 0 Completion: Prereqs — ESM Bundle Fix + Metadata Correction

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 0 - Prereqs: ESM Bundle Fix + Metadata Correction
**Agent**: Lina
**Tier**: 2 - Standard

---

## Summary

Fixed two pre-existing issues blocking M0a: four web components missing from the ESM bundle (`browser-entry.ts`), and incorrect metadata on Nav-Header-Base's `component-meta.yaml`.

---

## Changes

### ESM Bundle Fix (`src/browser-entry.ts`)

**Problem**: 4 of 34 components with web implementations were not registered in the browser entry point, meaning they would not be included in `dist/browser/designerpunk.esm.js`.

**Missing components**: Nav-Header-Base, Nav-Header-App, Nav-Header-Page, Progress-Bar-Base

**Fix**:
- Added imports for all four components
- Added `safeDefine` registrations (Nav-Header-Base before App and Page, since both compose it)
- Added to main export statement
- Added intuitive aliases (`NavHeader`, `NavHeaderAppElement`, `NavHeaderPageElement`, `ProgressBar`)

**Result**: 34 imports, 34 registrations — zero gap between web implementations and bundle.

### Nav-Header-Base Metadata Fix (`src/components/core/Nav-Header-Base/component-meta.yaml`)

**Problem**: `when_to_use` contained Nav-SegmentedChoice-Base / Nav-TabBar-Base copy ("Switching between 2–5 mutually exclusive content views", "Persistent bottom navigation between 3–5 top-level app destinations"). This was incorrect for an internal-only structural primitive.

**Fix**:
- Replaced `when_to_use` with internal-only guidance ("Building a semantic header variant...", "Internal composition target for Nav-Header-App and Nav-Header-Page")
- Added `when_not_to_use` redirecting to semantic variants ("Product-level screen headers — use Nav-Header-App or Nav-Header-Page", "Direct use in product code — this is an internal structural primitive")

### Test Update (`src/__tests__/browser-distribution/component-registration.test.ts`)

- Updated export assertion string to include the four new components

---

## Validation

| Check | Result |
|-------|--------|
| `npm test` | 311 suites, 8138 tests, all passing |
| Application MCP server tests | 16 suites, 179 tests, all passing |
| Web impl vs bundle diff | Zero — all 34 components accounted for |
| Nav-Header-Base metadata | Correct internal-only guidance, redirects to semantic variants |

---

## Notes

- The running Application MCP server instance shows 27 components (stale). The disk index confirms 34. Will resolve on next server restart.
- This task also builds on the `rebuild_index` tool added to the Application MCP server earlier (pre-spec work), which enables reindexing without server restart going forward.

# ESM Bundle Reconciliation: Missing Validation Step

**Date**: 2026-04-06
**Severity**: Medium
**Agent**: Thurgood
**Found by**: Lina (M0a pre-launch feedback R1)

## Problem

Components can get web platform implementations without being added to `browser-entry.ts` (the ESM bundle entry point). Four components were found with web implementations but missing from the bundle: Nav-Header-Base, Nav-Header-App, Nav-Header-Page, Progress-Bar-Base.

This happened silently — no test or checklist step connects "component has web platform file" to "component is registered in browser-entry.ts."

## Recommendation

Build-time validation test: compare web platform directories (`src/components/core/*/platforms/web/*.web.ts`) against bundle registrations in `browser-entry.ts`. Fails if any component has a web implementation but isn't registered.

This is automated and can't be forgotten, unlike a checklist item.

## Priority

Not M0a-blocking (the four missing components are being fixed as Phase 1 prereqs). But the validation test should be added to prevent recurrence. Small spec or inline fix during Phase 1 workstream 2 (component library package).

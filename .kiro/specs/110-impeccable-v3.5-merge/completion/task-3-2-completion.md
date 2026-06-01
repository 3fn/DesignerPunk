# Task 3.2 Completion: Evaluate and Merge critique.md

**Date**: 2026-06-01
**Task**: 3.2 Evaluate and selectively merge critique.md
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `.kiro/skills/impeccable/reference/critique.md` — Added Purpose/Hard Invariants, softened detector requirement, updated invocation, removed live server steps, replaced teach reference

## Implementation Details

### Changes Made

| Change | Detail |
|--------|--------|
| Added § Purpose | Adapted from upstream — defines the deliverable (chat response primary, snapshot archive) |
| Added § Hard Invariants | Adapted from upstream — Assessment A required, Assessment B optional, isolation rule, sequential fallback |
| Detector made optional | "A skipped detector does NOT invalidate the critique" — explicit in Hard Invariants |
| Detector invocation updated | `npx impeccable detect` → `node .kiro/skills/impeccable/scripts/detect.mjs` |
| Browser visualization simplified | Removed 8-step `npx impeccable live` flow (we don't have that script). Kept as optional one-line mention. |
| Anti-Patterns Verdict | Added "Detector not run for this critique" fallback language |
| `impeccable teach` reference | Replaced with `get_brand_context()` MCP query |
| Visual overlays section | Softened from "required deliverable" to "if used, summarize" |

### Evaluation Rationale

The upstream critique.md treats the detector as mandatory ("A skipped detector is a failed critique run"). This conflicts with our architecture where:
1. The detector was just adopted (Task 2) and may not always be appropriate
2. Our MCP-based workflow doesn't have the `npx impeccable live` browser visualization server
3. The design review (Assessment A) is the primary value; detector evidence strengthens but doesn't gate

The two-assessment orchestration model is valuable structure that we preserved. The isolation rule (A must finish before B enters synthesis) prevents anchoring bias.

## Validation (Tier 2: Standard)

- ✅ Requirement 4.6: Two-assessment orchestration model adopted (Assessment A: design, Assessment B: evidence)
- ✅ Requirement 4.6: Detector made optional enhancement, not required
- ✅ Requirement 4.7: No dangling references to unavailable features (npx impeccable live removed)
- ✅ Requirement 4.8: `impeccable teach` replaced with `get_brand_context()` MCP query
- ✅ Requirement 7.4: Conflict noted — upstream requires detector, DesignerPunk makes it optional

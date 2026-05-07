# Task 1.5 Completion: Review and Update Living Roadmap Docs Case-by-Case

**Date**: 2026-05-06
**Task**: 1.5 Review and update living roadmap docs case-by-case
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

Modified 5 files (4 roadmap + 1 bonus), left 2 roadmap files unchanged as historical record (no new files created):

**Updated (living guidance, 16 references reconciled):**
- `docs/roadmap/north-star-design-system-ecosystem.md` — 6 references (Status: "Vision document — hypothesis, not commitment")
- `docs/roadmap/m0a-roadmap.md` — 5 references (Status: "Tentative — sequence based on dependencies")
- `docs/roadmap/m0a-process-scaffolding.md` — 3 references (Status: "Draft v3")
- `docs/roadmap/m0a-package-exports.md` — 2 references (Status: "Draft — needs validation during M0a")

**Bonus fix (active doc outside original scope, 1 reference):**
- `docs/token-system-overview.md` — 1 reference (cited as active documentation in Core Goals)

**Left as historical record (no changes, 20 references preserved):**
- `docs/roadmap/integration-guide-draft.md` — 10 references (Status: "Placeholder — formalize as steering doc after Phase 1 ships"; Phase 1 shipped, superseded by live Integration Guide)
- `docs/roadmap/m0a-pre-launch-feedback.md` — 10 references (historical feedback collection artifact)

**Total**: 5 files updated, 17 references reconciled, 2 files left as historical, 20 references preserved as record.

## Implementation Details

### Approach

Applied case-by-case review using the `Status` metadata field in each file's header as the primary signal. Files with status indicating active/living guidance ("Vision document," "Tentative," "Draft v3," "Draft — needs validation") were updated. Files with status indicating superseded or archival ("Placeholder — formalize as steering doc after Phase 1 ships," or no status with historical purpose field) were preserved as-is.

For updated files, used strReplace with `replaceAll: true` on `@designerpunk/core` → `@3fn/core`. All 4 updated roadmap files used `@designerpunk/core` exclusively — no orphan-scope references.

For the bonus fix (`docs/token-system-overview.md`), the reference was an orphan-scope import in a code example (`@designerpunk/tokens/BlendUtilities`). Applied targeted strReplace to reconcile both scope and preserve the subpath structure.

### Key Decisions

**Preserve integration-guide-draft.md as historical.** This file explicitly states "formalize as steering doc after Phase 1 ships" and Phase 1 (Spec 095) has shipped. The live `DesignerPunk-Integration-Guide.md` is its formalized successor. Updating the draft would be revisionism — rewriting what "was intended at the time" to match what exists now. The draft serves future readers as a record of the original scope and thinking; leaving its `@designerpunk/core` references intact preserves that historical snapshot.

**Preserve m0a-pre-launch-feedback.md as historical feedback.** This file has no explicit "superseded" marker but its purpose ("Collect agent feedback on M0a planning artifacts before launch") is inherently historical. Agent feedback from a specific planning moment shouldn't be retroactively edited — doing so would misrepresent what agents actually said at the time.

**Update living vision/roadmap docs to match reality.** `north-star-design-system-ecosystem.md` is a vision doc that describes the DesignerPunk future. Keeping it at `@designerpunk/core` would create cognitive dissonance between vision and shipped reality. Updating brings the vision doc into alignment with what actually exists. Same reasoning for `m0a-roadmap.md`, `m0a-process-scaffolding.md`, and `m0a-package-exports.md` — all active planning artifacts that should reflect the current state of the system.

**Include docs/token-system-overview.md as bonus fix.** Not in my original Task 1.5 scope (which was limited to `docs/roadmap/`). But grep revealed 1 orphan-scope reference, and Core Goals explicitly cross-references this doc as authoritative token system documentation. The effort to include was one strReplace; the consequence of omitting was leaving one active doc drift-positive for other consumers to rediscover later. Chose inclusion and documented here for transparency.

**Did not update Last Reviewed on roadmap docs.** Roadmap docs don't follow the steering-doc `Last Reviewed` convention — they use date-stamped status fields instead. Applying the steering-doc convention would be inconsistent with the existing file format.

### Integration Points

- Vision and roadmap docs are typically read by Peter and occasionally referenced during spec formalization. Post-rename, these surfaces now align with the shipped package name, reducing cognitive mismatch between vision-level thinking and implementation-level reality.
- The preserved historical docs (integration-guide-draft, m0a-pre-launch-feedback) remain discoverable and accurate snapshots of their respective moments in the project's history.
- `docs/token-system-overview.md` is cross-referenced from Core Goals as authoritative token documentation. Fixing its reference prevents downstream reader confusion when following the Core Goals link trail.

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ All 5 modified files remain valid Markdown
- ✅ No broken internal section links introduced
- ✅ Code block syntax preserved

### Functional Validation
- ✅ Grep verification: updated files have zero `@designerpunk/` references post-edit
- ✅ Grep verification: left-alone files (`integration-guide-draft.md`, `m0a-pre-launch-feedback.md`) still show their original 10 references each (historical preservation confirmed)
- ✅ Replacement count: 6+5+3+2+1 = 17 references replaced, matching pre-edit grep counts for updated files

### Integration Validation
- ✅ `docs/roadmap/` as a directory is not in the drift detection scan scope — leaving historical docs with old references does not block Parent 1 completion
- ✅ Vision doc reads coherently with updated package name (flow from "build DesignerPunk as ecosystem" to "install `@3fn/core`" is consistent)
- ✅ M0a roadmap's reference to publishing to GitHub Packages now matches the reality of `@3fn/core` publishing
- ✅ Core Goals' cross-reference to `docs/token-system-overview.md` still resolves; the linked doc now shows `@3fn/core` imports

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 1 (living roadmap docs, evaluated case-by-case): addressed. Living docs updated; historical docs preserved with documented rationale.

## Findings for Completion Documentation

**Classification pattern observation for future drift reconciliation:**

Roadmap docs fall into two natural categories based on `Status` metadata:

1. **Living/active** (update to match reality): Status indicators like "Vision document," "Tentative," "Draft [v3/ — needs validation during X]."
2. **Historical/superseded** (preserve as record): Status indicators like "Placeholder — formalize as steering doc after Phase X," or purpose indicates historical collection (feedback, deprecated audits).

This classification is worth capturing as a pattern for future cross-surface reconciliation work. When scope drifts in documentation, the Status field is usually the clearest signal whether to update or preserve.

**Bonus observation:** `docs/token-system-overview.md` being out of my original task scope but containing active drift is a mild Civitas process signal. The original task scoping (Task 1.5 listed only `docs/roadmap/`) didn't catch this because the file is in `docs/` (top-level, not in a subdirectory). For future drift reconciliation specs, scope should probably include `docs/**/*.md` rather than specific subdirectories, with explicit exclusions for historical locations (`docs/specs/`, `docs/releases/`, `docs/migration/`, etc.).

# Task 9.2 Completion: All Canonical-Source Edits

**Date**: 2026-08-02 · **Unit**: U-final · **Type**: Implementation subtask

## The R6 AC3 amendment (Peter, 2026-08-02 — the load-bearing ruling of this task)

Implementation surfaced a genuine premise gap: the (b)-grade doc-id-only route form (`THEN consult <doc> (summary-first)`) — assumed landable by R7 AC3, the design, and all four reviewers — was NOT expressible by the 122 generator (`DocRoute.section` required; render unconditional; sweep-1 heading-verifying). Escalated to Peter with three options + counter-arguments rather than improvised. **Peter ruled: amend R6 AC3, minimal schema change.** Scope as ruled and implemented (5 files):

- `schema.ts`: `DocRoute.section?` optional + `DocRoute.replaces?` (both doc-commented citing this amendment)
- `render.ts`: section-less branch → `THEN consult <doc> (summary-first)`
- `sweeps/sweep-1-refs.ts`: doc-grain resolution leg for section-less routes
- `sweeps/sweep-8-demotion.ts`: `routes.docs[].replaces` joins the demotion-coverage union (a promoted route is a stronger "where content lives now" than the cue it supersedes)
- `pipeline.ts`: ref collection + resolution branch
- Tests: render (b)-form case + `collectReplacesKeys` docs-leg case; agent-generator suite 27/333 green

Explicitly OUT of the amendment: the Commands-placement renderer change (class-fit stays recorded-accepted-misfit per findings G1); everything else in the generator.

## Canonical content edits (all per the owner-confirmed findings)

- **97 cue→route conversions** across all 8 agents (ada 20, lina 27, leonardo 11, data 7, kenya 8, sparky 7, stacy 8, thurgood 9), `replaces:` markers preserved onto the routes; incl. Ada's amended retarget (resolution-patterns → token-quick-reference) and the six round-2 token-lookup amendments.
- **8 route additions**: leonardo ×2 (product-handoff-protocol; designerpunk-integration-guide), data Android-patterns **(a)**, sparky contract-names, stacy test-dev-standards, thurgood process-dev-workflow, thurgood 118 row **(a)**, lina 118 row **(a)** — Lina's verbatim per Component 3 (annotations recorded in the findings, not restated in canonical).
- **Thurgood's 118 heading corrected at landing**: the generator's emission gate rejected the design's "CI-Enforced Guards" paraphrase; live heading "CI-Enforced Guards (Spec 118)" (spec-stamped — stronger stability class) landed verbatim. Downgrade path armed, not needed.
- **2 fallback additions** (Lina's rulings): `ApplicationMCPServerSource` (lina), `web-components` (sparky).
- **4c cue**: ONE shared-catalog `governance-rule` member (`certainty-calibration-cue`) — design-verbatim statement, crossRef to the register entry (the canonical enumeration home); renders into all 8 prompts. Placement note: shared members render into Commands pending the G1 placement fix — recorded, deliberate.
- **PDW fold-item**: 32 legacy snippets → `id` form (0 residual); docs index rebuilt in-task (R11 AC5).
- **Ada's row re-verified** (R7 AC2): present + resolving (formal record in findings § Task 9 verification record).
- Class-fit: recorded-accepted-misfit (G1) — no canonical change (the audit's own conditional fallback).

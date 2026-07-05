# Task 1 Completion: Draft the Workflow-Law Ballot

**Date**: 2026-07-05
**Type**: Documentation | **Validation**: Tier 2 (conjunctive: SHALL/SHALL NOT contract content AND other specs' decisions depend on it — 125-B consumes the map seeds; 122's ratchet consumes the ratified protocol)
**Status**: COMPLETE — ballot RATIFIED (Peter, 2026-07-05, unmodified, both strike-defaults accepted; record committed `b3c9c74a` before any application, per record-first)

## Artifacts Created/Updated

- `task-1-workflow-ballot.md` — v1 draft (Thurgood) → review round (Stacy required: APPROVE-WITH-AMENDMENTS ×8; Lina smoke: NEEDS-CLARIFICATION ×3) → v2 fold (all 11 incorporated, none declined) → post-round correction ([THURGOOD R3]: AM-4's historical premise corrected per Peter against the written law; subtask commit+push recorded as a deliberate NEW process change) → RATIFIED.

## Tier 2 Validation (per-criterion)

- **Req 3.1** (all live surfaces, draft-time re-grep, atomic, auditable sweep): fresh grep found **15 live surfaces (+1 config)** — the count's third correction (11→12→15); Stacy independently re-verified at fifteen, no sixteenth; sweep pattern set extended (AM-1) to bare `git push` on executables + filename sweep, closing the one surface the content-grep couldn't see. ✅
- **Req 3.2** (record-first): ballot Item 14.1; honored in practice — ratification committed before application. ✅
- **Req 3.4** (prune-with-arm seeds, handoff-not-ratified): Item 12. ✅
- **Req 3.5** (release-analysis relocation): Item 1e — post-merge non-required job on `main` (claim-vs-fact rationale); bake-in watch item for output visibility. ✅
- **Req 3.6** (completion-state): Item 1d, nine points — complete at MERGE; branch asserts / merge ratifies; taskStatus on-branch pre-PR; stop-and-wait composes unchanged; changes-requested + conflict states defined (AM-3/5); squash-only configured at Task 3 (AM-6). ✅
- **Req 3.7** (checks-only merge ≠ ratification): 1d.9 + Item 2e. ✅
- **Req 1.4** (emergency path): Item 1f, with logging + in-repo-rollback cross-ref (AM-7). ✅
- **Req 4.2** (merge rule): Item 1c — agents open PRs; Peter merges on green; delegation only as recorded rule; governance-law carve-out. ✅
- Receiving-spec cross-references resolve: 125-A tasks.md Tasks 2–4 consume the ballot's contracts (11a two-mode tooling, squash-only config, atomic-window list); 125-B seed location fixed. ✅

## Implementation Notes

Strike-options resolved at ratification: **Cursor rules MIGRATE** (actively-maintained runtime; deprecation-header alternative documented but unused); **`complete-task.sh` rename STANDS** (mechanical zero-hits sweep preserved). Subtask flow is a **deliberate amendment** (Peter): subtasks now commit AND push the task branch (old flow: no subtask commit step; hook fired at parent only) — forward-looking grounds recorded in 1a.2. Process note for bake-in: a reviewer's plausible recollection about the old flow was corrected by the ballot's own before-text — the record-first principle catching drift pre-ratification.

## Next

Task 2 (tooling rework — PAT scope remediation first) awaits authorization.

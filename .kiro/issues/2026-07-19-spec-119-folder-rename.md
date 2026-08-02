# Spec 119 Folder Rename: pre-reframe folder name → `119-agent-experience-architecture`

**Date**: 2026-07-19
**Discovered during**: Flagged at the AXA reframe (design-outline consolidation, 2026-06-28); re-flagged in the 119-B scope pass (2026-07-16); this issue file created so the deferral has an owner and a trigger instead of prose flags
**Reporters**: Thurgood (original flag); Claude (main-loop, durability upgrade per Peter's direction 2026-07-19)
**Severity**: Low — cosmetic/navigational; the folder name reflects the spec's pre-reframe identity ("Steering Progressive Disclosure Redesign") while the spec family has been Agent Experience Architecture (AXA) since 2026-06-27
**Type**: Spec-infrastructure hygiene (atomic folder rename + cross-reference sweep)
**Primary owner**: Thurgood (Civitas steward — spec infrastructure)
**Status**: **EXECUTED 2026-08-02** (PR #TBD) — trigger fired at 119-B closeout (recorded in `.kiro/specs/119-B-capability-routing-measurement/completion/task-10-completion.md`), before Spec 123 opened. One atomic `git mv` + one repo-wide cross-reference sweep (zero-hits re-grep verified); full `npm test` green. The exact pre-rename folder slug is preserved in git history and the PR diff; it is deliberately not repeated here so a repo grep for it returns zero.

*Original trigger (for the record): execute at 119-B closeout, before Spec 123 opens — the last natural quiet moment: no in-flight formalization referencing the folder, the 119 family complete, 123 not yet consuming. If the trigger passed unexecuted, a deliberate keep-the-old-name decision was to be recorded instead.*

---

## Summary

Spec 119 was reframed from "Steering Progressive Disclosure Redesign" to "Agent Experience Architecture (AXA)" (Option A, Peter-approved, 2026-06-27). The spec folder still carried the pre-reframe name (the kebab-case slug of the old title). The design outline flagged the rename as a "structural follow-up (flagged, NOT done)" deferred "to avoid path churn mid-draft"; the 119-B scope pass re-noted it. Two natural quiet moments (post-119-A close, post-122 close) have already passed without execution — the capture was prose flags in two documents, with no owner or trigger. This file fixes the capture.

## Why deferred (and why the trigger is what it is)

- **Not during formalization/execution**: the 119-B scope pass, requirements, and feedback docs all live in or cite paths into the folder; renaming mid-spec churns every fresh reference and risks colliding with the 125-B observation window's PR stream for zero functional gain.
- **At 119-B closeout**: the 119 family's active work is done; 123's inbounds cite specs by their own directories and have not yet accumulated references into 119's folder beyond what one sweep covers.

## Execution notes (for the future session)

- **One atomic rename + one cross-reference sweep, single PR.** `git mv`, then grep the repo for the old folder slug and update every hit (known reference classes: the folder's own docs, `119-B-deferred-obligations.md` citations, the 119-B spec's "Formalizes against" header and feedback Context-for-Reviewers, 125-B's inbound, any completion docs citing the scope pass).
- The rename does NOT touch `119-A-steering-relocation-serving-contract/` or `119-B-capability-routing-measurement/` — those names are pillar-accurate. Only the family-root folder renames.
- Not a governance-law change (no ballot needed); ordinary PR through the gate. It is also not a 125-B trigger surface — but if the observation window is somehow still open at execution time, note the PR counts as an ordinary observed PR like any other.

## Cross-References

- Original flag: `.kiro/specs/119-agent-experience-architecture/design-outline.md` § "AXA Reframe" (Reconciliation bullet) and § "Design History" closing note
- Re-flag: `.kiro/specs/119-agent-experience-architecture/119-B-scope-pass.md` § "Part 2" (noted-in-passing)
- The reframe authority: design-outline § "⭐ AXA Reframe — AUTHORITATIVE (2026-06-27, Option A, Peter-approved)"

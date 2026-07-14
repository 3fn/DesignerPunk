# Task 2 Summary: U1-p — The Prune PR

**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Task**: 2 (U1-p unit) | **Agent**: Thurgood (Sonnet)
**Detailed doc**: `.kiro/specs/125-B-classification-map/completion/task-2-parent-completion.md`

## What This Task Did

Applied the pre-adjudicated candidate prune (Task 1.4) that removes the npm-test rule's imperative
*what*-restatements — now mechanically owned by the 125-A required checks — from two governance surfaces
(`Task-Completion-Protocol.md`, `Process-Development-Workflow.md`), regenerated the one generated agent prompt that
embeds the pruned ambient (`thurgood.md`), and left all teaching (lane selection, Jest-not-Vitest command forms)
untouched. Authored the ratification ballot per the record-first protocol.

## Key Outcomes

- **3 hunks applied** across 2 hand-edited surfaces (S2-1, S2-2 in Task-Completion-Protocol.md; S3-1 in
  Process-Development-Workflow.md), verbatim per the Task 1.4 assessment — zero drift from the cited before-text.
- **Zero hunks on `start-up-tasks.md`** — the assessment's verified finding (no imposter clause exists there); noted
  as a reconciliation against the task's original "three surfaces" phrasing, not silently skipped.
- **`thurgood.md` regenerated**, confirmed the only one of 16 generated prompts affected.
- **All four A2 patterns → zero hits** across live surfaces and regenerated outputs; **Jest-not-Vitest education
  confirmed intact**.
- **Full validation green**: `npm test` (377/8987), `tsc --noEmit` clean, `sweep-1-refs` PASS, `diff-guard`
  full-run-green.
- **Ballot authored**: `.kiro/docs/ballots/2026-07-14-npm-test-imperative-prune.md`, status `DRAFT` — awaiting
  Peter's ratification (not self-ratified, per protocol).
- **Register updated**: `classification-map.md § "npm-test-before-complete"` gained a history line and an
  accuracy-corrected `education.disposition`.

## Not Done (by design)

No commit, no PR, no ratification — the coordinator presents the ballot to Peter and handles git/PR; the
observation window (Task 3.1) opens only at the U1-p unit's eventual merge.

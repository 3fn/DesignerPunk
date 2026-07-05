# Task 1 Summary: Workflow-Law Ballot (125-A)

**Date**: 2026-07-05 | **Status**: COMPLETE — RATIFIED (Peter, unmodified, both strike-defaults)

The ballot rewriting DesignerPunk's task-completion law for the PR-gated world was drafted (Thurgood), reviewed (Stacy required + Lina consumer smoke — 11 amendments, all folded), corrected (Peter's recollection of the old subtask flow, verified against the written law), and ratified via the record-first protocol's first live use.

**The law in four lines**: agents work on branches (subtasks commit + push as they finish — a deliberate new behavior); parent completion opens a PR carrying work, docs, and the completion claim; **Peter's merge is the acceptance** — checks green first, nothing reaches `main` otherwise, admins included; stop-and-wait is unchanged.

**Key facts**: 15 live instruction surfaces (+1 config) move atomically — the enumeration was corrected three times (11→12→15), each by a fresh mechanical pass; the migration sweep now sees bare `git push` and filenames, not just the literal `commit-task`; the old scripts become hard-fail tombstones under the new name `complete-task.sh`; release analysis moves to a post-merge job; squash-merge becomes the only merge method, configured not conventional.

**Application is deliberately deferred**: law docs remain untouched until Task 4's atomic window, gated behind Task 2 (tooling + PAT scopes + release-flow reconciliation) and Task 3 (branch protection).

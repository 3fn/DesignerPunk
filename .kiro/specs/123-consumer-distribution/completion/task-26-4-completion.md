# Task 26.4 Completion: The cold-observation table

**Date**: 2026-10-15
**Agent**: Leonardo (Opus), PRIMARY on Task 26 — operator

## What changed

- **New**: `.kiro/specs/123-consumer-distribution/validation/cold-observation-table.md`, reproduced in `task-26-completion.md`. It is the input to 26.5.
- **All four cells read "observed"**: cc founder-cold (`trio-1-backend`), cc teammate-cold (`join-kiro-to-cc`), kiro founder-cold (`trio-3-pm`) and kiro teammate-cold (`join-cc-to-kiro`).
- `trio-2-designer`'s `cannot-tell` is footnoted and not counted, as is the same-harness CC probe in `join-cc-to-kiro`.
- **What the cells say**:
  - Claude Code asks two things at first open: trust, which surfaces the 40 pre-approvals, and then enabling the three servers. That holds for founder and teammate alike, and the allow-list is ignored until trust.
  - Kiro asks nothing.

## Targeted check and result

- Each cell cites its record's `cold-observation:` field and its clean-state field (F7/J7). Both schema checks (trio § 9; join § 14.2) confirm the cells are present and well-formed.

## Application-time adaptations

- None. The table is a standalone file under `validation/`, so 26.5 and Task 28 can cite one path, and it is also reproduced in the parent completion doc.

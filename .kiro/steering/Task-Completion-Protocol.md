---
id: task-completion-protocol
inclusion: always
name: Task-Completion-Protocol
description: Operational law for ending a task — when to write completion docs, which tier, the parent-vs-subtask sequence, and the stop-and-wait-for-authorization rule. Load when completing any task or subtask.
---

# Task Completion Protocol

**Date**: 2026-06-29
**Last Reviewed**: 2026-06-29
**Purpose**: The end-of-task operational sequence (completion docs, tiers, parent vs. subtask, stop-and-wait) — operational law, always loaded
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 1
**Relevant Tasks**: all-tasks

> **Operational law (always-loaded).** This is the authoritative end-of-task sequence. The pre-task checklist (date check, governance health, Jest command selection, authorization-to-START rules) lives in the always-loaded **Start Up Tasks**. This doc owns the **end** of a task; Start Up Tasks owns the **start**.

---

## CRITICAL: Do Not Mark a Task Complete Before Its Required Steps

**DO NOT mark a task complete before completing the required steps for that task type.** Task types are defined in `tasks.md` — check the `**Type**:` field (Setup / Implementation / Architecture / Documentation).

**📖 Query the Completion Documentation Guide via MCP for detailed guidance:**
```
get_section({ path: "completion-documentation-guide", heading: "Two-Document Workflow" })
get_section({ path: "completion-documentation-guide", heading: "Documentation Tiers" })
```

---

## The Sequence by Task Scope

### For SUBTASKS
1. [ ] Run targeted tests relevant to the change (not the full suite)
2. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-M-completion.md`
3. [ ] Mark subtask complete (use the `taskStatus` tool)
4. [ ] **STOP** and wait for user authorization

### For PARENT TASKS (Implementation or Architecture type)
1. [ ] Run full validation (`npm test`) — see Start Up Tasks for test-command selection
2. [ ] Mark parent task complete (use the `taskStatus` tool) **AFTER** validation passes
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md`
4. [ ] Create summary doc: `docs/specs/[spec]/task-N-summary.md`
5. [ ] Commit changes: `./.kiro/hooks/commit-task.sh "Task N Complete: Description"` (runs release analysis automatically)
6. [ ] **STOP** and wait for user authorization

### For PARENT TASKS (Setup or Documentation type)
1. [ ] Verify artifacts created/updated as specified
2. [ ] Mark parent task complete (use the `taskStatus` tool)
3. [ ] Create completion doc: `.kiro/specs/[spec]/completion/task-N-completion.md`
4. [ ] Create summary doc: `docs/specs/[spec]/task-N-summary.md`
5. [ ] Commit changes: `./.kiro/hooks/commit-task.sh "Task N Complete: Description"` (runs release analysis automatically)
6. [ ] **STOP** and wait for user authorization

---

## Tier Selection (which docs, how much detail)

- **Subtasks**: a single completion doc (`task-N-M-completion.md`). No summary doc.
- **Parent tasks**: BOTH a detailed completion doc (`.kiro/specs/[spec]/completion/`) AND a concise summary doc (`docs/specs/[spec]/`).
- The Completion Documentation Guide (queried by `id` above) is the canonical source for the two-document workflow and documentation tiers — pull it when you need depth.

---

## Key Rules

- **Implementation / Architecture tasks**: validation MUST pass before marking complete.
- **All parent tasks**: create BOTH the completion doc AND the summary doc.
- **All tasks**: STOP after completion — never auto-proceed to the next task. Authorization to START the next task is governed by Start Up Tasks.
- **Parent vs. subtask** is the load-bearing distinction: subtasks get targeted tests + a completion doc; parents get full validation + completion doc + summary doc + commit.

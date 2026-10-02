---
id: designerpunk-start-up-tasks
inclusion: always
---


# Start Up Tasks

**Date**: 2025-10-20
**Last Reviewed**: 2026-09-29
**Purpose**: Essential pre-task checklist for every task (date check, governance health, Jest commands, test selection, authorization-to-start). End-of-task sequence: see Task Completion Protocol.
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 1
**Relevant Tasks**: all-tasks

1. Check the **CURRENT** date

2. **Civitas Governance Health Check**
   
   IF it's been longer than your team's cadence since the last governance health check (keep its date recorded here), THEN flag: "Governance health check overdue — Thurgood (Civitas steward) should run the health check before proceeding."
   
   *Only Thurgood runs the health check. All agents check the date and flag if overdue.*

3. **CRITICAL: Wait for User Authorization Before Starting New Tasks**
   
   **WHEN reporting the completion of a task THEN you MUST:**
   - **STOP and WAIT for user authorization before starting the next task**
   - Do NOT automatically proceed to the next task in the task list
   - Do NOT assume the user wants you to continue
   
   **User Authorization Required:**
   - User must explicitly request the next task
   - User may want to review your work first
   - User may want to provide additional context
   - User may want to change direction
   
   **Example Completion Pattern:**
   ```
   ✅ Task 2.2 Complete: Implemented Icon iOS confirmed actions
   
   Summary:
   - Added token-only sizing approach
   - Added testID support via accessibilityIdentifier
   - Updated preview to use token references
   
   [STOP HERE - WAIT FOR USER TO REQUEST NEXT TASK]
   ```
   
   **NEVER do this:**
   - ❌ "Task 2.2 complete. Now starting Task 2.3..."
   - ❌ Automatically reading files for the next task
   - ❌ Beginning implementation without explicit user request

4. **CRITICAL: Use your repo's own test runner**
   
   **WHEN running tests THEN you MUST use the commands your repo defines** — read them from its `package.json` (or its build tool's config) before you run anything, and never guess a runner's flags.

5. **Test Command Selection Guidelines**
   
   **WHEN validating a subtask THEN** run the tests relevant to the change (not the full suite).
   
   **WHEN validating a parent task THEN** run your repo's full functional suite.
   
   **WHEN the task involves performance changes THEN** also run your performance suites, on an otherwise-idle machine (they are wall-clock-sensitive).

6. **Delegation and model tier — before delegating, and before deciding whether to**
   
   **First ask WHETHER this work is yours to do at all** (Agent-Directory § "Primary Agent (Orchestrator)"). Then, for anything you do delegate:
   
   Before delegating to a subagent, choose its model tier by the task's cognitive demand — do NOT let it silently inherit the session model:
   - **Implementing** an already-settled design/spec/contract → the cheaper capable tier (currently **Sonnet**).
   - **Deciding** — architecture, consequential/hard-to-reverse calls, cross-cutting tradeoffs, multiple failure modes → the higher tier (currently **Opus**). An escalation on a concrete signal, not a default-when-unsure.
   - Calibrate in BOTH directions relative to the session model: **downgrade** for implementation, **upgrade** for a decide task. Omitting the tier inherits the session's — a silent default, so decide it consciously.
   - **Always independently verify subagent output** before trusting it — delegate-then-verify is the guardrail, not the tier.
   - **Verify placement, not just content**, when you delegate a **file edit**: hand the subagent **absolute paths** to the intended tree, and after it reports done **confirm the edit landed there** (a subagent can act on a different working tree and still report success — in Claude Code, nested worktrees let its relative paths resolve into the parent repo).
   
   Full policy + per-harness field mechanics: query `process-orchestration-model-selection` via the docs MCP.

7. **Ending a task: see Task Completion Protocol**
   
   The end-of-task sequence (when to write completion docs, which tier, the parent-vs-subtask distinction, and the stop-and-wait-for-authorization rule) is **operational law in the always-loaded Task Completion Protocol** — it is already in context. Follow it when completing any task or subtask.
   
   **One rule worth restating here at the start:** when you report a task complete, **STOP and wait for user authorization** before starting the next one (see #3 above). Task Completion Protocol owns the rest of the end-of-task sequence.

8. **Starting a PARENT task: list its instruments first**

   Before a parent's first subtask starts, list every instrument each success criterion's evidence depends on (test, check, fixture, file, command, upstream artifact) — each one that exists (with where, and what in it the criterion reads), is built by one of this parent's subtasks, or is MISSING (with who owns it). **Any MISSING stops the subtasks that depend on it, before code**; route it. A gap found later is recorded with its kind (never listed, or listed but not fit for the criterion), never silently fixed.

---
id: start-up-tasks
inclusion: always
name: Start-Up-Tasks
description: Essential pre-task checklist — date verification, governance health check, Jest test commands, test selection guidelines, and authorization-to-start rules. Load when beginning any task execution or running tests. (End-of-task sequence lives in Task Completion Protocol.)
---

# Start Up Tasks

**Date**: 2025-10-20
**Last Reviewed**: 2026-07-09
**Purpose**: Essential pre-task checklist for every task (date check, governance health, Jest commands, test selection, authorization-to-start). End-of-task sequence: see Task Completion Protocol.
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 1
**Relevant Tasks**: all-tasks

1. Check the **CURRENT** date

2. **Civitas Governance Health Check**
   
   IF it's been >30 days since last governance health check **[2026-06-29]**, THEN flag: "Governance health check overdue — Thurgood (Civitas steward) should run the monthly health check before proceeding."
   
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

4. **CRITICAL: This project uses Jest, NOT Vitest**
   
   **WHEN running tests THEN you MUST use Jest commands (NOT Vitest commands)**
   
   ✅ **CORRECT Jest commands** (durations measured 2026-07-03, warm cache, dev machine — first/cold runs are slower):
   - `npm test` - Run unit/integration tests (functional lanes only, timing-assertion-free; ~1 min)
   - `npm run test:all` - Run ALL tests including performance (~1 min — no longer a costlier lane)
   - `npm run test:performance` - Run the performance-lane suites (seconds)
   - `npm run test:performance:isolated` - Run the serialized PerformanceValidation suite (seconds). **NOT included in `test:performance`** — full performance validation requires BOTH commands (or `test:all`)
   - `npm test -- <test-file-path>` - Run specific test file
   - `npm run test:watch` - Run tests in watch mode
   - `npm run test:coverage` - Run tests with coverage
   
   > **Lane semantics reworked 2026-07-03** (commit `29bba7de`; Spec 125 design-outline addendum): default lanes are timing-assertion-free and deterministic; wall-clock assertions live only in the performance lanes. Historical note: `test:performance`/`test:all` silently selected ZERO performance tests from ~May 2026 (Spec 025 config interaction) until this rework — treat any pre-July-2026 lane-duration claim as void.
   
   ❌ **WRONG - These are Vitest commands that will FAIL:**
   - `npm test -- --run` - Jest doesn't have a `--run` flag
   - `vitest` - This project doesn't use Vitest
   
   **Key difference:** Jest runs tests once by default. Vitest uses `--run` for single execution, but Jest doesn't need or support this flag.

5. **Test Command Selection Guidelines**
   
   **WHEN validating regular task completion THEN:**
   - Use `npm test` (default - excludes performance tests)
   - Fast, deterministic feedback loop (~1 minute warm)
   - Sufficient for most development validation
   
   **WHEN validating parent task completion THEN:**
   - **Default**: Use `npm test` (comprehensive functional validation)
   - **If task modifies release tool or is performance-critical**: Use `npm run test:all` (adds the performance suites; the cost difference is now seconds, so when in doubt, run `test:all`)
   
   **WHEN task involves performance changes THEN:**
   - Run BOTH `npm run test:performance` AND `npm run test:performance:isolated` (perf coverage is split across the two lanes), or simply `npm run test:all`
   - Performance assertions are wall-clock-sensitive: run them on an otherwise-idle machine, not concurrently with other suites
   
   **Decision tree:**
   ```
   Is this a parent task completion?
   ├─ YES → Does task modify release tool or performance systems?
   │   ├─ YES → npm run test:all (includes performance regression tests)
   │   └─ NO → npm test (comprehensive functional validation)
   └─ NO → Does task involve performance changes?
       ├─ YES → npm run test:performance + test:performance:isolated (or test:all)
       └─ NO → npm test (default)
   ```
   
   **Key distinction:**
   - `npm test` validates all functionality (functional lanes only; timing-assertion-free)
   - `npm run test:all` additionally runs the performance suites (seconds of extra cost, but wall-clock-sensitive — avoid under heavy machine load)
   - Most parent tasks only need functional validation
   
   **Default assumption**: Use `npm test` for parent tasks unless working on release tool or performance systems.

6. **Model-tier calibration — when this task will delegate to subagents**
   
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
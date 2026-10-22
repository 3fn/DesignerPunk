## @unit #item-civitas-governance-health-check @ sha256:431d69a79f5a20615aeea797e290d1ed6f45e7e887e8bb43b4399336e363098a
2. **Civitas Governance Health Check**
   
   IF it's been longer than your team's cadence since the newest health-check record, THEN flag: "Governance health check overdue — Thurgood (Civitas steward) should run the health check before proceeding."
   
   *Only Thurgood runs the health check; its committed record is the date. All agents read the newest record and flag if overdue.*

## @unit #item-critical-this-project-uses-jest-not-vitest @ sha256:f75f87b00a0dafa053d0b2da2229ab451e79ced7621723927163505605e171d0
4. **CRITICAL: Use your repo's own test runner**
   
   **WHEN running tests THEN you MUST use the commands your repo defines** — read them from its `package.json` (or its build tool's config) before you run anything, and never guess a runner's flags.

## @unit #item-test-command-selection-guidelines @ sha256:3df356662cb6f1dbb2a10bd046eada681e3cac69ead4d3f3f2ffff6187bc47db
5. **Test Command Selection Guidelines**
   
   **WHEN validating a subtask THEN** run the tests relevant to the change (not the full suite).
   
   **WHEN validating a parent task THEN** run your repo's full functional suite.
   
   **WHEN the task involves performance changes THEN** also run your performance suites, on an otherwise-idle machine (they are wall-clock-sensitive).

## @unit #item-starting-a-parent-task-write-its-instruments-block-first @ sha256:bab2eca6c2b9f830775c12ea924c2ccb0a2899fffad979c2289d262a94200dca
8. **Starting a PARENT task: list its instruments first**

   Before a parent's first subtask starts, list every instrument each success criterion's evidence depends on (test, check, fixture, file, command, upstream artifact) — each one that exists (with where, and what in it the criterion reads), is built by one of this parent's subtasks, or is MISSING (with who owns it). **Any MISSING stops the subtasks that depend on it, before code**; route it. A gap found later is recorded with its kind (never listed, or listed but not fit for the criterion), never silently fixed.

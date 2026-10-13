Spec: 123-consumer-distribution
Unit: U4 — Content policy (`u4-content`; parents 23–24; gating parent 24)
Task: 24 — U1b backward check, the release recipe (B-U4), and the changelog step (+ 23 — The banner predicate, guard, and banners)
Agent: Thurgood (Sonnet, Task 23); Thurgood (Opus, Task 24)
Completion docs:
- Task 23: `.kiro/specs/123-consumer-distribution/completion/task-23-completion.md`; subtasks `task-23-1-completion.md`, `task-23-2-completion.md`, `task-23-3-completion.md`; instruments `task-23-instruments.md`; summary `docs/specs/123-consumer-distribution/task-23-summary.md`
- Task 24: `.kiro/specs/123-consumer-distribution/completion/task-24-completion.md`; subtasks `task-24-1-completion.md`, `task-24-2-completion.md`; instruments `task-24-instruments.md`; summary `docs/specs/123-consumer-distribution/task-24-summary.md`
- Rulings record: `.kiro/specs/123-consumer-distribution/completion/u4-rulings-2026-10-13.md`
- U1b record: `.kiro/specs/123-consumer-distribution/validation/u1b-backward-check.md`
- B-U4: `.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md`
Validation: Orchestrator, worktree `wt-u4` at `ccf4dbeb8` + the refreshed lock and the Task 24 docs (2026-10-13): `npx tsc --noEmit` exit 0 · `npm test` 395 suites / 9550 tests passed · `npm run test:scripts` 19 / 453 · `mcp-server` suite 42 / 697 · `application-mcp-server` suite 31 / 432 · `npm run check:122:diff-guard` operative-set-freshness PASS, diff-guard no-op-green (lock refreshed: `inputClosure` only; `outputs` unchanged) · `npx tsx scripts/audience-banner/predicate.ts` → `18 match; 18 carry`, exit 0 · completion-criteria-parity 29/29 PASS. `test:consumer` not run locally (the Consumer Guard workflow runs it at the gate).

**Consulted**: Lina — generator owner, (b) + class fix, owner read of 7 banners; Stacy — criterion author, ARMING at merge, floor before columns; Ada — predicate v1 confirmed, fork (B); Thurgood ×2 — PRIMARY seats

Tripwire: declared 6, now 6; parents unchanged; successor branch: none

## What this unit ships

- **Audience banners on the served governance corpus** (Task 23). The convention lives in one module, `scripts/audience-banner/predicate.ts`: Ada's predicate v1 with its declared under-inclusion limit, the template and its recogniser, and the presence guard.
  - The guard reports `18 match; 18 carry` and runs in the existing required lane `lane-functional-root` (`npm run test:scripts`).
  - There are 20 banners: the 18 matched docs, plus `Component-Readiness-Status` and `Component-Quick-Reference`. Those two are declared outside the predicate's guard, and a separate declared-list test asserts they are present.
  - The banner text was owner-reviewed: Lina confirmed 7, and the orchestrator read the 13 Thurgood-owned banners independently.
- **The U1b audience-ruling backward check** (Task 24.1). It covers every Spec 125-B `governance/` prune: 3 commits and 7 hunks, enumerated from `git log`, plus Ada's D-T-A6 residual (19 served docs name 67 `src/` files the package no longer ships). It produced 25 findings, routed to the owners and not fixed here.
- **The release recipe** (Task 24.2, under B-U4 § 4).
  - Every release writes one hand-authored consumer `CHANGELOG.md` entry.
  - From release 4, every release re-runs the onboarding persona trio, as a record, not a gate.
  - Applied in `governance/release-management-system.md` and `.kiro/hooks/RELEASE-FLOW.md`.
- **`tasks.md` amendments** (Peter's rulings items 1, 2 and 6): Task 23's criterion 4 evidence set, Task 24's Primary Artifacts (+ `RELEASE-FLOW.md`), and Task 23's declared two-doc band.
- **The lock**, refreshed once at the unit's close. Only `inputClosure` moved; `outputs` is unchanged.

## Ratification and carve-outs

- **Governance carve-out**: Peter-merged. The diff touches B-U4 (`.kiro/docs/ballots/`), `governance/**` (20 banners plus the recipe), `.kiro/hooks/RELEASE-FLOW.md`, and non-checkbox hunks in `tasks.md` (`bdfdc9951`, `4ef03c2e0`).
- **B-U4 ratification**: Peter's merge of this PR ratifies both sections (form r1, ruling item 4). A record-only follow-up then stamps the `Status` and section-status lines `RATIFIED (Peter, <date>) — merge <sha>` and adds the README entry.
- **B-U4 § 2 ordering**: the ballot's adding commit `757803488` is an ancestor of every governed content commit (`fd18cab72`, `4ef03c2e0`, `f0f019a77`). The merge `ccf4dbeb8` carries `main`'s side only and touches no governed path. The output is pasted in `task-24-completion.md`.
- **ARMING**: Stacy's ARMING event fires at this merge, because the banner guard arms inside an existing required lane. The notice block is in `.kiro/specs/123-consumer-distribution/completion/task-23-3-completion.md` § 3.

## Owed after merge

- docs-MCP `rebuild_index` on `main`, since served `governance/` docs changed (orchestrator).
- The B-U4 status stamp and ballots README entry, as a record-only follow-up (orchestrator).
- The release-4 CHANGELOG line for the banners (at release-4 prep).
- Stacy's ARMING read.

## Not criterion failures, stated

- Task 24 criterion 2 (B-U4 RATIFIED) and criterion 3 (this tripwire line) are ⚠️ in the completion doc until this PR exists and merges. Both have their follow-ups named.
- Ada's not-shipped `src/` path findings wait on the chartered path-labelling convention (`.kiro/issues/2026-10-13-src-path-convention-for-served-governance-docs.md`).
- The banner guard's dormancy goes undetected until the named-guard selection floor lands (`.kiro/issues/2026-10-13-named-guard-selection-floor-then-map-column-derivation.md`).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

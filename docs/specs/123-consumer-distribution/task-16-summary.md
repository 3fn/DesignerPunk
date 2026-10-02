# Task 16 Summary: Consumer emission lane, `attach`, the `init` agent layer, legacy migration, and generated-surface `sync`

**Date**: 2026-10-01
**Purpose**: Concise summary of Task 16 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Task 16 turned the guarded consumer rendering from Task 15 into an agent layer that a real install emits, records and keeps in sync.

- **The emission lane.** `emitConsumer` renders the agent layer for one target from inputs the package ships, read relative to the package root only. It starts no server, writes nothing and emits no attribution sidecar. A prepack `derive()` writes `dist/consumer-canonical/`, and `build:generator` bundles the lane to `dist/generator/consumer-entry.js`. Its output equals the guarded rendering byte for byte (Claude Code 16/16 files, Kiro 24/24).
- **`attach` and `init`.** `attach` adds a harness (agents, MCP config and approvals) to a born repo, or the reference servers only with `--reference`, which never makes the repo born. `init` now emits the agent layer through the same code path for one target (bare `init` = the profile's default target) and stops copying `.kiro/agents`, `.kiro/steering` and `governance/`.
- **Packaging.** `files[]` gains the lane's inputs and the eight identity docs, and drops `.kiro/agents/`, the steering glob and `dist/{ios,android,web}`. Peter's personal note no longer ships. `pack-assert.ts` checks all of it (78 assertions).
- **`sync`.** `sync` reconciles the generated surfaces of the attached targets at file, region (`CLAUDE.md`) and key grain. A release-1 consumer's copied docs are reported as legacy copies, and `--migrate-legacy` is offered only together with `attach`, in one flow that leaves no copies behind.
- **The packed install.** A test packs the package, installs it, and runs `init` for each target. It checks the file set and keys, the Kiro resources and the Kenya/Data knowledge paths, and that no emitted file contains the steward-only process phrases.

## Why It Matters

This is the agent layer a consumer receives from release 2. Task 17 deletes the legacy paths, and Task 18's G2 gate audits this unit.

## Key Changes

- New: `tools/agent-generator/consumer-entry.ts`, `src/cli/attach.ts`, `src/cli/shared/vocabulary.ts`, `src/cli/sync/RegionGrain.ts`, the release-1 cohort fixture, and the parity, paths, degradation, attach, cohort, generated-surface and region tests.
- Changed: `src/cli/init.ts`, `src/cli/sync/{index,Migration,Classifier,Manifest}.ts`, `src/cli/shared/errorCatalog.ts`, `src/cli/designerpunk.ts`, the CC and Kiro adapters, `registry.ts`, `consumer-profile.ts`, `package.json` (`files[]`, `build:generator`), `scripts/pack-assert.ts`, and `tests/consumer-integration.test.ts`.

## Impact

- All eleven criteria are met. Task 15's one partial row (the two snapshot trims) is discharged by 16.3's negations.
- Three CI red windows occurred along the way, and all are closed: the lane build after 16.1, the 119-A relocation gate after 16.3 (Thurgood's #249), and Consumer Guard from 16.3 to 16.6.
- Carried forward, each with an issue: the out-of-grant agent-generator residuals and the Req 13 design erratum (before U2b's PR), and C19's personal-note warning (Task 22). Two items need routing: dead copy-apply code, and `generated.lock`'s checkout-dependent input hash.

## Cross-References

- Completion doc: `.kiro/specs/123-consumer-distribution/completion/task-16-completion.md`
- Instruments block: `.kiro/specs/123-consumer-distribution/completion/task-16-instruments.md`
- Subtask docs: `.kiro/specs/123-consumer-distribution/completion/task-16-{1,2,3,4,5,6}-completion.md`, `task-16-5-cohort-capture.md`

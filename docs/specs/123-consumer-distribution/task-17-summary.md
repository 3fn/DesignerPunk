# Task 17 Summary: Legacy-path deletion and the L686 edit under B-U2

**Date**: 2026-10-02
**Purpose**: Concise summary of Task 17 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Task 17 removed the consumer-agent template tree that Task 16's generated agent layer replaced, and made sure no check or document still points at it.

- **The no-op came first.** The drift script's scan list lost the legacy directory, `main()` now runs only when the script is the entry point, and the list is exported. A new test runs the script in a temp project where every scan directory is absent and asserts exit 0 and `0 files scanned`. A positive control keeps a vacuous exit from passing. Dropping the script's existence guard turns both red.
- **The tree is gone.** Nine files under the legacy directory were deleted. Integration Guide § 4b now teaches `attach` in the CLI's own words and no longer teaches a copy command.
- **The sweep is decidable.** Every file the repo grep still returns for the legacy path has a row in a closed-vocabulary table: 12 files plus one row for the spec records. The `pack-assert.ts` absence assertion is kept live. At parent close the scoped grep over `governance/` and `.kiro/steering/` returns exactly two hits.
- **The register rule was edited under B-U2** by Thurgood (17.3), with one refresh of `canonical/generated.lock`. The guard is `no-op-green` with no lock diff at close.
- **The rule and the script cannot drift apart.** A standing parity test compares the one path group in the rule with `SCAN_DIRS`, fails loud if the block or group is absent, and was bitten both ways on copied mini-trees.
- **The workflow comment** was replaced by a `SCAN_DIRS` pointer in its own PR to `main` (#256) under the issue-row grant.

## Why It Matters

A deleted directory that three places still enumerated would have left a check that scans it, a rule that names it and a guide that copies from it. The parity test turns the last of those from a convention into a failing test.

## Key Changes

- Changed: `scripts/check-package-name-drift.js`, `governance/DesignerPunk-Integration-Guide.md` (§ 4b), `governance/classification-map.md` (L686 and one history line), `canonical/generated.lock` (once).
- New: `scripts/__tests__/check-package-name-drift.test.ts`, `scripts/__tests__/package-name-scope-parity.test.ts`.
- Deleted: the nine files of the legacy template tree.

## Impact

- All six criteria are met, with no unmet row. The branch-head dispatch at `57a06fb7` is six of six green; the gate runs on the U2b PR.
- The instruments block ends at 28 rows (exists 18, built-here 10, missing 0) with two `unlisted` gaps self-reported: the Agent Generator context and the Section Citation Guard.
- Owed after U2b merges: the docs `rebuild_index` (orchestrator or Thurgood) and the grant issue's archive move (orchestrator). Task 18, U2b's gating parent, needs Peter's go.

## Cross-References

- Completion doc: `.kiro/specs/123-consumer-distribution/completion/task-17-completion.md`
- Instruments block: `.kiro/specs/123-consumer-distribution/completion/task-17-instruments.md`
- Subtask docs: `.kiro/specs/123-consumer-distribution/completion/task-17-{1,2,3,4}-completion.md`

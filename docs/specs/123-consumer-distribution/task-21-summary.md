# Task 21 Summary: The starter specs

**Date**: 2026-10-12
**Purpose**: Concise summary of Task 21 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Task 21 ships two starter specs that `init` places in a consumer's repo for their agents to run.

- **The CI-needs spec** (`src/cli/templates/starter-specs/ci-needs/`) declares four needs:
  - two at minimal core, including design C25's "committed platform output matches `generate`";
  - two as optional hardening.

  Each need has a why, a check, a bite recipe and a two-sided price line. Every bite recipe was run red in a scratch repo born from the packed tarball. The spec's tasks take the consumer's agent from inventory to an armed gate, and a fresh session checks the close.
- **The re-grounding spec** (`src/cli/templates/starter-specs/regrounding/`) is consumer-Thurgood's first assignment:
  - re-point his charter at the consumer's repo, in the closed disposition vocabulary;
  - establish `specs/`;
  - formalize one real spec;
  - **report what did not transfer**.

  Consumer-Stacy then verifies the formalized spec's claims.
- **`init` scaffolds both into `specs/`** (21.3, Lina). It never overwrites: an existing file is kept and reported. Each written file is recorded in the manifest, and `--re-scaffold` lists a deleted one rather than re-adding it silently.
- **Shipping**: the files ship through the existing `src/cli/templates/` `files[]` entry. They are guarded by `pack-assert` rows and the exact template set (22.3b, Ada).
- **The structure test** (`scripts/__tests__/starter-specs.test.ts`, 28 tests) asserts:
  - the tiers, bite recipes and prices;
  - the need count;
  - the report task;
  - the vocabulary against `vocabulary.ts`;
  - a repo-specifics deny-list.

## Why It Matters

A consumer's CI needs only bite if someone proves they go red. The starter spec makes that proof the agent's job, and prices both adopting and skipping each need. The re-grounding spec turns "the charter was written for another repo" into a reviewed, reported decision instead of a silent gap.

## Evidence and Limits

- **Tests**:
  - `npm test`: 9550 passed. `tsc`: clean.
  - `test:scripts`: 404. `init.test.ts`: 59.
  - `test:consumer`: 53 passed, 1 skipped.
  - MCP suites: green.
  - `test:pack-contents`: the starter-spec rows pass. The lane fails three assertions in the pre-existing in-repo-`generate` contamination class, unrelated to this task.
- **Open**: no record yet of Ada's confirmation of one replacement sentence in N1's check, or of Lina's on N2's `sync` check. Consumer-Stacy's owed-set query needs an adoption file that no born repo creates (a charter seam, outside this task).
- **Unverified**: the recipes inside a real CI (the consumer's arming step). The re-grounding spec's proof is U5's conformance run.
- Full record: `.kiro/specs/123-consumer-distribution/completion/task-21-completion.md`.

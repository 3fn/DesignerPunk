# Task 5 Summary: Filename Normalization (Mass-Rename of 10 Space-Bearing Files)

**Date**: 2026-06-29
**Purpose**: Concise summary of parent task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Renamed (via `git mv`, history preserved) the 10 verified space-bearing steering files in `.kiro/steering/` to kebab-case/no-spaces, the sequencing step that runs after the Task 2 resolver + Task 3 frozen legacy-path manifest are live and before Task 6 relocation. Each file's Task-4-frozen frontmatter `id:` is byte-unchanged (the rename touches only the filename). Updated the functional `always`-inclusion wiring keyed on the renamed filenames: the agent-definition `resources[]` arrays across all 8 agent JSONs (`file://`/`skill://` entries repointed by filename, schemes + directory preserved) and `scripts/governance-check.sh`'s `STARTUP_FILE` constant. Recorded the kebab-case/no-spaces filename standard as input for the Task 12 conventions doc. Also fixed 2 Thurgood-domain test-infra files (`src/__tests__/browser-distribution/`) that hardcoded the old `Browser Distribution Guide.md` path.

## Why It Matters

Filenames become tool- and shell-safe and decoupled from document identity (identity is the immutable `id`; a rename changes only the filename). Critically, the agent `resources[]` `file://`/`skill://` wiring is loaded by Kiro's resource loader, which is NOT covered by the Docs-MCP legacy-path fallback — so a rename that ignored those entries would silently break per-session ambient context. Old space-bearing path references elsewhere (prose, prompts) keep resolving via the frozen manifest's `legacy-fallback` during the transition window.

## Verified Outcome

- ✅ **10/10 renamed** as pure `git mv` renames (`R` status); each `id:` confirmed unchanged and matching the frozen legacy-path manifest. `.kiro/steering` = 89 `.md`, **zero space-bearing filenames** remain.
- ✅ **`always`-inclusion wiring updated**: `resources[]` entries in all 8 agent JSONs (identity: `core-goals`, `personal-note`, `start-up-tasks`; non-identity-in-resources: `completion-documentation-guide`, `cross-platform-vs-platform-specific-decision-framework`, `technology-stack`); `governance-check.sh:107`. All 8 JSONs re-validated as well-formed.
- ✅ **Both resolution directions proven** (real on-disk indexer, throwaway probe removed): `core-goals`/`technology-stack` by-id → `strategy:'id'`; OLD `.kiro/steering/Core Goals.md` & `.kiro/steering/Technology Stack.md` → `strategy:'legacy-fallback'`; same indexed key in each case.
- ✅ Index rebuilt: `healthy`, **89 docs**, 0 errors/warnings.
- ✅ mcp-server `tsc` clean; `npx jest --runInBand` 35 suites / 582 tests (the 1 transient failure = the known unseeded fast-check flake in `parsing-properties.test.ts`, green on serial re-run).
- ✅ root `tsc` clean; root `npm test` **377 suites / 8990 tests / 0 failed**.

## Honest Notes

- **The Docs-MCP legacy-path fallback does NOT cover Kiro's `file://`/`skill://` resource loader** — that is why the agent `resources[]` filename updates were mandatory (prose path refs, which DO go through the MCP resolver, were left to the fallback).
- **Meta-guide (`00-Steering...`) judgment call**: renamed per Req 3 AC2. It is not in any `resources[]` array (its always-load is frontmatter-driven, filename-independent), its `#[[file:]]` bulk-load is already gone, and the only functional reference is a dormant spec-020 (2025) script — no risk to Task 10's removal; renaming arguably makes that removal cleaner.
- **Non-identity `resources[]` entries**: I updated the filename now (not just at Task 7.3) to avoid a broken-resource window between Task 5 and Task 7.3; Task 7.3 still owns the `governance/` directory repoint for those.
- **Live MCP server is stale** — it returned `FileNotFound` for OLD paths (predates the Task 2/3 resolver/seeding code). On-disk source is correct and proven directly; the live server needs a **restart** (not just `rebuild_index`) to observe legacy-fallback through the MCP tools.
- **Left as-is (deliberate)**: `sync-manifest.json` (regenerated at Task 7.3), `extract-doc-structure.sh` (dormant spec-020 script), and all historical/spec/completion/prose references (Req 10 AC2 + fallback).

## Next

- **Not committed** — main loop re-runs both suites + tsc, **restarts the live MCP server** + rebuilds the index, spot-checks the 10 renames + both resolution directions, and commits on `spec-119a-relocation`.
- Unblocks Task 6 (relocate non-identity docs → `governance/`); the rename preserves each frozen `id`.

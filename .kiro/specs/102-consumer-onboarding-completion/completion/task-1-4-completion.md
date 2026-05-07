# Task 1.4 Completion: Change init.ts copyDir to Merge Mode (Gap 3)

**Date**: 2026-05-07
**Task**: 1.4 Change `init.ts` copyDir to merge mode (Gap 3)
**Type**: Implementation
**Status**: Complete

---

## Artifacts

- **Modified**: `src/cli/init.ts` — replaced directory-level skip with per-file merge mode

---

## Implementation Details

### The Fix

Replaced the `copyDir()` function entirely. Old behavior: if destination directory existed, skip the entire copy. New behavior: recursively walk source, copy each file individually, skip individual files when destination equivalent exists (never overwrite).

New helpers added:

- **`CopyResult` interface** — tracks `added`, `skipped`, `skippedFiles` (up to `SKIPPED_FILE_LIST_THRESHOLD = 10`), and `warnings`
- **`copyDir(src, dest, opts)` returning `CopyResult`** — entry point; calls the recursive walker
- **`copyDirRecursive(src, dest, opts, result)` — internal walker** — handles per-file copy decisions and subdirectory recursion; mutates the result object
- **`reportCopy(label, result)` — summary emitter** — prints warnings, adds/skipped counts, and a per-file list when skipped count is ≤10

### Output Format (Integration Test Contract)

Summary format is part of Gap 3's public behavior, asserted by the integration test at `src/cli/__tests__/init.test.ts` (Task 1.6). JSDoc comment on `CopyResult` documents this. Intentional format changes can update the assertion alongside the code; the contract catches unintended drift, not wording freezes.

Format examples observed during functional testing:

- `✓ token source: 50 new files`
- `✓ steering docs: 87 existing files preserved`
- `✓ token source: 3 new files, 5 existing files preserved` (mixed case; simulated)
- Per-file list appears only when `skipped > 0 && skipped ≤ 10`

### Caller Updates

Four `copyDir` callers in `runInit()` updated from boolean-return pattern to `CopyResult`/`reportCopy` pattern:
- `src/tokens/` (step 3)
- `src/components/core/` (step 4, gated by `--skip-components`)
- `.kiro/agents/` (step 6, gated by `--skip-agents`)
- `.kiro/steering/` (step 7)

Non-`copyDir` artifacts (`.npmrc`, `designerpunk.config.ts`, `product/overview.yaml`) still use `createFileIfNotExists` with its existing skip-if-exists message — these are single-file operations where skip-if-exists is the right semantic.

### Key Decisions

**Return `CopyResult` from `copyDir` rather than log from within.** Callers have caller-specific labels ("token source", "steering docs", etc.) that wouldn't fit inside `copyDir`. Separating the work (`copyDir`) from the reporting (`reportCopy`) keeps concerns clean and lets tests assert against the raw result object without parsing console output.

**10-file threshold for per-file skipped list.** Balance between useful ("which 3 files were preserved?") and noisy ("scrolled 50 lines of preserved files"). Threshold lives in a named constant (`SKIPPED_FILE_LIST_THRESHOLD`) so it's easy to adjust if consumer feedback suggests a different number.

**Collect up to 10 skipped file paths during walk.** Even though we only display them when the total count is ≤10, we still need to collect them during the walk. Capped collection prevents memory growth if a massive directory has many skipped files but we only need the count (not the list) for display.

**Preserve existing warning semantics.** The `source not found: ...` warning message moved into `CopyResult.warnings` and is emitted by `reportCopy` instead of by `copyDir` directly. Same information surfaces in consumer output; now routed through the reporting helper for consistency.

### Validation

Functional test via ad-hoc scratch-repo scenario (mirrors Peter's DP-PortfolioSite case):

1. Create scratch repo with pre-seeded `.kiro/steering/designerpunk.md` (1 custom file)
2. Run `npx ts-node designerpunk.ts init ...` against the source repo
3. Expected: 87 new steering files added, pre-existing `designerpunk.md` preserved
4. Result: ✅ `.kiro/steering/` has 88 files; `designerpunk.md` content unchanged (`"my custom product steering doc"`)

Re-runnability test (second init against same repo):

1. Run init again against the already-populated scratch repo
2. Expected: "N existing files preserved" messages; no new files copied; no overwrites
3. Result: ✅ `✓ token source: 50 existing files preserved`, `✓ steering docs: 87 existing files preserved`, no overwrites

Full test suite: ✅ 325 suites / 8,281 tests pass post-change.

### Integration Points

- **Closes Gap 3 from consumer-onboarding-gaps.md** — a consumer with any pre-existing files in `.kiro/steering/` (or `.kiro/agents/`, `src/tokens/`, `src/components/core/`) now gets the missing ones added alongside their customizations
- **Enables Task 1.6's integration test** — the test asserts against the exact summary output format captured above; the docstring on `CopyResult` makes the test's dependency explicit
- **Will show real benefit when `npx designerpunk init` is re-run against DP-PortfolioSite** — the 86 missing steering docs that were silently skipped in Spec 101 Task 2.3 will now be added alongside Peter's `designerpunk.md`

### Notes

**One subtle behavior worth naming**: files that exist in the consumer's destination but NOT in the source are left completely alone (no detection, no warning). This is the right behavior — it matches the "consumer customizations are sacred" principle — but it's an emergent property of the per-file comparison, not an explicit check. If a future feature requires detecting "extra" files in the destination (e.g., warning about stale artifacts), that's separate work.

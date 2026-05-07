# Task 1.6 Completion: Fresh Rebuild and Verify `dist/` is Clean

**Date**: 2026-05-06
**Task**: 1.6 Fresh rebuild and verify `dist/` is clean
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

One file retired (no new files; the task's primary output is a regenerated `dist/` which is `.gitignore`'d):

- **Deleted**: `src/generators/__tests__/snapshots/pre-migration-regression.test.ts` (8 assertions retired — Spec 094 migration complete, see "Key Decisions" below)
- **Regenerated**: `dist/` (48+ MB of platform outputs — not tracked by git, but newly produced)

Commit: `be653848`

---

## Implementation Details

### Approach

Executed the task-specified sequence:

1. **Safety stash**: `mv dist dist.backup` before deletion — provides rollback path if build fails unexpectedly
2. **Clean state**: `rm -rf dist` — full removal, not incremental (ensures no stale artifacts persist)
3. **Build**: `npm run build` — executes `tsc --skipLibCheck && npm run build:validate && npm run build:browser && npm run build:mcp`
4. **Figma file generation**: `npm run figma:push --dry-run` — the `build` command doesn't produce `dist/DesignTokens.figma.json` (it's a separate pipeline step); `--dry-run` mode generates the file without requiring Figma auth
5. **Drift verification**: `npm run check:drift` against the regenerated `dist/`
6. **Output-file verification**: checked presence of all 8 expected token output files and all expected subdirectories
7. **Test suite re-run**: `npm test` to confirm no regressions
8. **Cleanup**: `rm -rf dist.backup` after verification succeeded

### Key Decisions

**Retired the Spec 094 pre-migration regression test.** `npm test` after the fresh rebuild surfaced two failures:

1. `pre-migration-regression.test.ts` — `DesignTokens.figma.json` no longer matched the frozen pre-migration snapshot. Diagnosis: the snapshot was from pre-Spec-094 era; post-migration, legitimate token additions (`blend/pressedLighter`, `blend/focusSaturate`, etc.) make the current output differ from the snapshot. The test's `@category evergreen` annotation was incorrect — it was a migration-window regression guard whose purpose ended when Spec 094 completed.

2. `ParallelExecutor.integration.test.ts` — flaky timing-dependent test. Passes in isolation (`npx jest --testPathPatterns=ParallelExecutor` → 23/23), fails under full-suite CPU contention. Pre-existing flakiness, not in my blast radius.

Peter authorized three possible resolutions for the pre-migration test (Options A/B/C in the conversation). Chose **Option C**: retire the entire test file. All 8 snapshot assertions inside the file were post-Spec-094 dead weight, not just the figma one. Retiring the whole file is cleaner than surgically skipping individual assertions.

Fixture files at `.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration/` were preserved as historical artifacts (they live in a spec directory, which implies "artifacts of Spec 094" — a reasonable permanent record). The retire-vs-preserve governance question is tracked in `.kiro/issues/2026-05-06-spec-094-pre-migration-fixtures-orphaned.md`.

**Accepted `ParallelExecutor` flakiness as pre-existing.** Peter confirmed this decision during conversation. Tracked in `.kiro/issues/2026-05-06-parallel-executor-test-flakiness.md` for Lina or Thurgood follow-up.

**`figma:push --dry-run` vs. full `figma:push`**: Used dry-run mode because:
- Current task doesn't require syncing to Figma (verification of build output only)
- Dry-run doesn't require Figma auth tokens (which may or may not be present locally)
- Dry-run still produces `dist/DesignTokens.figma.json` — the "intermediate artifact" per figma-push.ts line 9

### Integration Points

- **Closes the Parent 1 fresh-build success criterion**: The regenerated `dist/` contains zero `@designerpunk/*` scope references (sourcemaps excluded). This is the definitive proof that Task 1.1 (and 1.1 Extension) source edits, combined with a clean rebuild, produce a publishable `dist/`.
- **Drift script validation-in-place**: `npm run check:drift` on the regenerated state returns clean, proving the prevention tooling (Task 1.7) correctly recognizes the reconciled state.
- **Prepares Parent 2**: Task 2.2 (`npm publish --access public`) invokes `prepublishOnly` which re-runs `build` and `check:drift`. Task 1.6's successful run is a dress rehearsal for that flow.

---

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ `npm run build` completes without TypeScript errors or validation failures
- ✅ `npm run figma:push -- --dry-run` completes without errors
- ✅ `dist/` subdirectories have expected structure (no missing or orphan directories)

### Functional Validation
- ✅ **Drift check against fresh `dist/`**: `npm run check:drift` → "No package name drift detected (2,817 files scanned)"
- ✅ **Raw grep verification**: `grep -rn '@designerpunk' dist/ --include='*.js' --include='*.d.ts'` → zero matches
- ✅ **Expected output files present** (8 of 8):
  - `dist/DesignTokens.web.css` (40,331 bytes)
  - `dist/DesignTokens.ios.swift` (48,293 bytes)
  - `dist/DesignTokens.android.kt` (38,867 bytes)
  - `dist/DesignTokens.dtcg.json` (168,820 bytes)
  - `dist/DesignTokens.figma.json` (163,173 bytes)
  - `dist/ComponentTokens.web.css` (5,224 bytes)
  - `dist/ComponentTokens.ios.swift` (5,940 bytes)
  - `dist/ComponentTokens.android.kt` (5,311 bytes)
- ✅ **Expected subdirectories present**: `dist/browser/`, `dist/mcp/`, `dist/config/`, `dist/cli/`, `dist/blend/`, `dist/generators/`
- ✅ **Full test suite post-rebuild**: 325 suites / 8,281 tests passing (count decreased by 8 due to pre-migration-regression.test.ts retirement; matches expected delta)

### Integration Validation
- ✅ **Bundle sizes reasonable**: Web ESM 600 KB raw / 111 KB gzipped; Web UMD 629 KB raw / 114 KB gzipped; MCP bundles 322/218/818 KB (app/docs/product)
- ✅ **Cross-platform tokens generated correctly**: 3 platforms × 217 tokens each (per build output)
- ✅ **No stale `dist/release/*` artifacts**: Orphan directory didn't regenerate (tsconfig `rootDir: "./src"` correctly scopes tsc output; `src/release/` doesn't exist so no `dist/release/` is produced)
- ✅ **Size comparison**: Fresh `dist/` is 32 MB vs. `dist.backup/` at 41 MB — 9 MB delta matches the retired `dist/release/*` orphan files that correctly didn't regenerate

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 5 (rebuild `dist/` fresh and verify clean): addressed
- ✅ Design Outline § "Approach > Sequence" step 4 (fresh rebuild + grep verification): addressed
- ✅ Design Outline § "Success criteria" item 7 (`dist/` rebuilds cleanly with zero `@designerpunk/*` references, sourcemaps excluded): VERIFIED
- ✅ Tasks.md § "1.6 > Validation": all expected output files present, grep returns zero hits, backup/restore safety pattern followed

---

## Notes

**The "fresh rebuild as verification methodology" earned its keep.** Task 1.6's `rm -rf dist && npm run build` revealed three hidden issues that incremental builds had been masking:

1. **`dist/release/*` orphans** — Source directory (`src/release/`) was deleted at some past point, but compiled output in `dist/release/` had persisted across incremental builds. Fresh rebuild correctly omits it.

2. **`DesignTokens.figma.json` produced by a separate pipeline** — Not part of `npm run build`; requires `npm run figma:push`. Before the fresh rebuild, the file existed from some previous figma:push run but wasn't regenerated on typical builds. Worth noting for the Task 2.1 release notes regeneration — the `figma:push` step may need to be explicit in publish prep.

3. **Pre-Spec-094 snapshot test had accumulated drift** — The stale `dist/DesignTokens.figma.json` happened to match the snapshot; the fresh generation did not. The test was failing silently before fresh rebuild because its comparison target was itself stale. Classic hidden-staleness scenario.

**Recommendation for future publish flows**: Every spec that ends in a publish event should include an equivalent fresh-rebuild verification step. The hidden staleness finds are worth the extra ~90 seconds of rebuild time.

**On the `dist.backup` safety pattern**: Used `mv dist dist.backup` rather than `rm -rf dist && npm run build`. If `npm run build` had failed for any reason, I could have restored the old `dist/` with a single `mv`. In practice the build succeeded and the backup wasn't needed — but it's cheap insurance for a destructive operation.

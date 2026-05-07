# Task 1.7 Completion: Fresh Rebuild and Verify `dist/` Clean

**Date**: 2026-05-07
**Task**: 1.7 Fresh rebuild and verify `dist/` clean
**Type**: Implementation
**Status**: Complete

---

## Artifacts

No new files created by this task directly. `dist/` regenerated via fresh build:

- **Regenerated**: full `dist/` tree (32 MB, all expected outputs present)
- **Retired**: `dist.backup/` (post-verification cleanup)

---

## Implementation Details

### Sequence

1. `mv dist dist.backup` — safety stash before deletion (same pattern as Spec 101 Task 1.6)
2. Fresh build: `npm run build` — ran cleanly, produced MCP bundles (322 KB app, 218 KB docs, 818 KB product) + Web bundles + tokens
3. Figma JSON: `npm run figma:push -- --dry-run` — generated `dist/DesignTokens.figma.json` (163 KB) via the separate figma pipeline step (same as Spec 101 Task 1.6)
4. Drift check: `npm run check:drift` — "No package name drift detected (2,818 files scanned)" — up from Spec 101's 2,817 due to the new `init.test.ts` file added in Task 1.6
5. Output verification: all 8 expected token output files present; all 6 expected subdirectories present
6. Integration test against fresh build: `npx jest --testPathPatterns='init\.test'` — all 6 tests pass in 1.32s
7. Full test suite: 326 suites / 8,287 tests pass
8. Cleanup: `rm -rf dist.backup` after verification confirmed clean

### Validation Results

| Check | Result |
|-------|--------|
| `npm run build` exit code | 0 (success) |
| `npm run check:drift` | ✓ No drift (2,818 files scanned) |
| `dist/` size (new vs backup) | 32 MB vs 32 MB (parity — no orphan artifacts) |
| MCP bundles | `application-mcp.js` 322 KB, `docs-mcp.js` 218 KB, `product-mcp.js` 818 KB |
| Token output files (8 expected) | All 8 present with sensible sizes |
| Subdirectories (6 expected) | All present: `browser/`, `mcp/`, `config/`, `cli/`, `blend/`, `generators/` |
| Integration test against fresh build | 6/6 pass (1.32s) |
| Full test suite | 326/326 suites pass, 8,287/8,287 tests pass |

### Key Decisions

**Followed Spec 101 Task 1.6's pattern exactly.** Stash-before-delete, build, figma:push --dry-run (since `npm run build` doesn't generate the figma file), drift check, run integration test, cleanup. No deviation. The pattern is proven.

**Confirmed integration test passes against fresh build specifically.** The test runs against compiled source via ts-jest, not against `dist/` — so strictly speaking, rebuilding `dist/` doesn't affect test outcomes. But re-running the integration test after rebuild is a cheap explicit verification that nothing subtle broke in the build → CI → test chain. Cost: 1.3 seconds. Benefit: one less unknown going into Parent 2.

**No stale artifacts this time.** Spec 101 Task 1.6 discovered orphan `dist/release/*` files (compiled output from deleted source). This Spec 102 rebuild produces a `dist/` that's **the same size as the backup**, meaning no orphans were carried into the backup AND none snuck in post-cleanup. Healthy state.

### Integration Points

- **Closes Parent 1 Success Criteria**: `dist/` rebuilds cleanly, drift detection passes against live reconciled state — both explicitly listed in tasks.md § "Task 1 > Success Criteria"
- **Baseline for Task 2.2 version bump and Task 2.3 publish**: the `dist/` on disk now is what will ship when `npm publish` runs
- **Validates no regressions from Tasks 1.1–1.6**: if any of the source edits had broken the build or drift, this task would have caught it before Parent 2

### Notes

**On the drift script's 2,818-file count**: increment from Spec 101's 2,817 exactly accounts for the new `src/cli/__tests__/init.test.ts` added in Task 1.6. Every file was scanned; none flagged drift. Drift script is working as intended.

**On `dist.backup` as an insurance pattern**: zero cost, near-zero chance of needing it (the build has been working reliably through Spec 101 and 102 so far), but maintains the "destructive operations get a reversal path" principle from the task spec. Would use the same pattern again.

**Parent 1 is now complete** — all 7 Ada-track subtasks (1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7) done. Thurgood's track (1.8–1.13) is the remaining Parent 1 work before the human gate. Once his track lands, Peter reviews and authorizes Parent 2 (publish + verify + tag).

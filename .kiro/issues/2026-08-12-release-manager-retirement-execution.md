# Issue: Release-Manager Retirement — Execution (Q6 ballot application)

**Date**: 2026-08-12
**Authority**: ballot `.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md` (RATIFIED — Peter, 2026-08-12; the ballot is the design, this issue is the checklist)
**Owner**: Thurgood coordinates; steering/governance edits Peter-merged
**Status**: OPEN — execute in a dedicated session. **Re-run the reference sweep at execution start** (`grep -rln "release:analyze\|release:notes\|release:run\|release-tool\|release manager\|release-analysis\|NpmPublisher\|release-management"`) — the inventory below is point-in-time (2026-08-12), never load-bearing.

---

## Checklist (per-file adjudication classes from the ballot)

### DELETE (tool + machinery)
- [ ] `src/tools/release/` (24 TS files incl. `NpmPublisher.ts`) + its 11 `*.test.ts`
- [ ] `.github/workflows/release-analysis.yml` (never a required context — no gate/window consequence)
- [ ] `scripts/validate-release-setup.js`, `scripts/diagnose-release-issues.js`, `scripts/__fixtures__/discovery-oracle.ts` (verify this fixture is release-only before deleting — it matched the sweep; if shared, retarget instead)
- [ ] `.kiro/hooks/release-manager.sh`, `.kiro/hooks/release-detection-manual.kiro.hook`, `.kiro/hooks/analyze-after-commit-README.md` (verify no live hook registration references them)
- [ ] `package.json` scripts: `release:analyze`, `release:notes`, `release:run`, `validate:release-setup`, `diagnose:release-issues`
- [ ] Full `npm test` + `tsc` after deletions (11 test files leave the suite; count change is expected — record before/after)

### UPDATE (law + live teaching surfaces — governance PR, Peter-merged)
- [ ] `.kiro/steering/Task-Completion-Protocol.md` :80 — "preserving the atomic-commit-per-task history the release tool scans" → title-discipline rationale stands on its own (the changelog spine)
- [ ] `.kiro/steering/start-up-tasks.md` — test-command decision tree ×3: "modifies release tool" branch → re-anchor (e.g., "performance-critical systems" alone)
- [ ] `governance/release-management-system.md` — REWRITE to the recipe mental-model + the C1 "discovering what changed and why" chain (squash titles → `docs/releases/` notes → task summaries → ballots/register)
- [ ] `.kiro/hooks/RELEASE-FLOW.md` — add the derive-classify-ratify section (v14's proven sequence incl. dual-registry playbook pointer + guard scripts)
- [ ] `.kiro/hooks/complete-task.sh` — remove the "Release analysis runs post-merge" banner line
- [ ] Remaining governance references, adjudicate each: `Process-Development-Workflow.md`, `Process-Hook-Operations.md`, `Process-Spec-Planning.md`, `completion-documentation-guide.md`, `Test-Failure-Audit-Methodology.md`, `BUILD-SYSTEM-SETUP.md`, `.kiro/hooks/README.md`, `docs/testing/test-infrastructure-guide.md`
- [ ] Docs-MCP `rebuild_index` after governance edits; steering-metadata validation on touched docs

### ARCHIVE or DELETE (per-file call at execution; git history preserves regardless)
- [ ] `docs/release-management/` (6 guides — document the dead tool's auth/config/env/troubleshooting)
- [ ] `docs/examples/tutorials/01–06` + `docs/examples/integrations/` (github-actions.yml, gitlab-ci.yml, existing-project, migration-guide) + `docs/examples/README.md` release content — NOTE: if any example teaches consumer-side CI patterns worth salvaging, route content to the 123 install-doc effort instead of deleting blind
- [ ] `docs/roadmap/release-system-review.md` (065-era; keep-as-history likely)

### KEEP untouched (verify only)
- [ ] Publish guard scripts (`check:drift`, `verify:token-index-clean`, `prepublishOnly` chain) — regression-check they run standalone
- [ ] `docs/releases/` records; the hand-authored-notes practice
- [ ] Spec 065 / 101 records (history)

### Cross-spec notes
- [ ] Record the "serve release notes to consumers?" question in 123's inbound set (per the ballot's C1 deferral)
- [ ] If a U1b wave window is OPEN at execution time: this work's PRs are ordinary observed PRs (not instrument PRs — this is Q6 work, not 125-B measurement); no special handling

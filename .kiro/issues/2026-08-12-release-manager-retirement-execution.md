# Issue: Release-Manager Retirement — Execution (Q6 ballot application)

**Date**: 2026-08-12
**Authority**: ballot `.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md` (RATIFIED — Peter, 2026-08-12; the ballot is the design, this issue is the checklist)
**Owner**: Thurgood coordinates; steering/governance edits Peter-merged
**Status**: IN EXECUTION (2026-08-12, session-direct with Peter live; issue amended per the two safeguards agreed with Peter before execution began). **Re-run the reference sweep at execution start** (`grep -rln "release:analyze\|release:notes\|release:run\|release-tool\|release manager\|release-analysis\|NpmPublisher\|release-management"`) — the inventory below is point-in-time (2026-08-12), never load-bearing.

---

## Declared merge units (safeguard 1 — the coherent-unit law applied to issue work; agreed with Peter 2026-08-12)

- **PR 1 — the KILL PR** (`chore/release-manager-retirement-kill`): all DELETE-class items + the ARCHIVE/DELETE-class docs adjudications. Mechanically reviewable mass deletion; full suite + tsc verify (suite count drops by the tool's 11 test files — record before/after).
- **PR 2 — the LAW-AND-TEACHING PR** (`chore/release-manager-retirement-law`): all UPDATE-class items (steering amendments, the mental-model rewrite, RELEASE-FLOW addition, banner fix, governance-reference adjudications). Small diff, high scrutiny, governance-law carve-out — Peter-merged with full attention.
- **Safeguard 2**: the rewritten `release-management-system.md` receives a **Stacy consult** (scoped, returned-as-data, folded) before PR 2 opens — it is consumer-shipped educational content.
- PR 2 branches from main AFTER PR 1 merges (sequential dependent units; the rewrite describes a world where the tool is already gone).

## Checklist (per-file adjudication classes from the ballot)

### DELETE (tool + machinery)
- [x] `src/tools/release/` (24 TS files incl. `NpmPublisher.ts`) + its 11 `*.test.ts` — DELETED (PR 1); suite 9020→8891 tests (−129 = the tool's own), tsc clean
- [x] `.github/workflows/release-analysis.yml` — DELETED (PR 1)
- [x] `scripts/validate-release-setup.js`, `scripts/diagnose-release-issues.js` — DELETED (PR 1). **`discovery-oracle.ts` KEPT — sweep FALSE POSITIVE**: it is 119-A's frozen discovery map-oracle (measurement fixture), merely contains the word "release"; verify-before-delete caught it
- [x] hook surfaces ×3 — DELETED (PR 1); no external registrations referenced them (verified)
- [x] `package.json` scripts ×5 — REMOVED (PR 1); JSON validity asserted
- [x] `npm test` 8891/8891 green (before: 9020) + `tsc` clean (PR 1)

### UPDATE (law + live teaching surfaces — governance PR, Peter-merged)
- [ ] `.kiro/steering/Task-Completion-Protocol.md` :80 — "preserving the atomic-commit-per-task history the release tool scans" → title-discipline rationale stands on its own (the changelog spine)
- [ ] `.kiro/steering/start-up-tasks.md` — test-command decision tree ×3: "modifies release tool" branch → re-anchor (e.g., "performance-critical systems" alone)
- [ ] `governance/release-management-system.md` — REWRITE to the recipe mental-model + the C1 "discovering what changed and why" chain (squash titles → `docs/releases/` notes → task summaries → ballots/register)
- [ ] `.kiro/hooks/RELEASE-FLOW.md` — add the derive-classify-ratify section (v14's proven sequence incl. dual-registry playbook pointer + guard scripts)
- [ ] `.kiro/hooks/complete-task.sh` — remove the "Release analysis runs post-merge" banner line
- [ ] Remaining governance references, adjudicate each: `Process-Development-Workflow.md`, `Process-Hook-Operations.md`, `Process-Spec-Planning.md`, `completion-documentation-guide.md`, `Test-Failure-Audit-Methodology.md`, `BUILD-SYSTEM-SETUP.md`, `.kiro/hooks/README.md`, `docs/testing/test-infrastructure-guide.md`
- [ ] Docs-MCP `rebuild_index` after governance edits; steering-metadata validation on touched docs

### ARCHIVE or DELETE (per-file call at execution; git history preserves regardless)
- [x] `docs/release-management/` — DELETED (PR 1; git history preserves)
- [x] `docs/examples/` SURGICAL delete (PR 1): tutorials/ + integrations/ + configurations/ + README.md removed — ALL release-tool content, already marked SUPERSEDED-do-not-follow since 2026-06-27 and documenting the PRE-065 CLI (two generations dead; nothing salvageable for 123 — the CI examples configure the dead tool, not consumer CI). **KEPT: `design-outline-example.md` + `design-exploration/`** (non-release content sharing the dir)
- [x] `docs/roadmap/release-system-review.md` — KEPT as history (PR 1 decision; 065-era analysis record)

### KEEP untouched (verify only)
- [ ] Publish guard scripts (`check:drift`, `verify:token-index-clean`, `prepublishOnly` chain) — regression-check they run standalone
- [ ] `docs/releases/` records; the hand-authored-notes practice
- [ ] Spec 065 / 101 records (history)

### Cross-spec notes
- [ ] Record the "serve release notes to consumers?" question in 123's inbound set (per the ballot's C1 deferral)
- [ ] If a U1b wave window is OPEN at execution time: this work's PRs are ordinary observed PRs (not instrument PRs — this is Q6 work, not 125-B measurement); no special handling

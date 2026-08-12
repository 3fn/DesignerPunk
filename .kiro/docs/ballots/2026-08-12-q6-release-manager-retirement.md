# Ballot Measure: Q6 Resolution — Retire the Release Manager (kill-and-rewrite)

**Date**: 2026-08-12
**Author**: Thurgood (Civitas steward), from the Q6 discussion session (2026-08-11 evening → 2026-08-12 morning)
**Status**: **RATIFIED (Peter, 2026-08-12)** — ratified in-session after the chartered audit pre-work was presented (inventory + consumption trace + the v14.0.0 live-trial evidence), Peter's two concerns addressed and folded into scope, recorded record-first before the execution PR.
**Purpose**: Resolve parked question Q6 (chartered by Peter 2026-07-12, Spec 125 design-outline §10: *"How does the release manager evolve with the new infrastructure — what do we keep, kill, or evolve?"* with audit pre-work owed). **Verdict: KILL the tool; capture its surviving value as documentation.**

---

## The evidence (audit pre-work, discharged)

1. **Live trial (v14.0.0, 2026-08-12)**: of the tool's five functions, the release used ZERO. `release:analyze` recommended 13.0.1-patch and classified all 34 changes "Other"; `release:notes` generated "No consumer-facing changes" against a breaking component wave; `release:run` was skipped so it would not overwrite the correct hand-authored notes; tag + GitHub release took two ordinary commands; `NpmPublisher.ts` was never wired. Record: `docs/releases/release-14.0.0.md` (authorship note), PR #114.
2. **Structural blindness, permanent and growing**: the tool reads spec task-summary docs; issue-driven work (a recorded standing practice) is invisible to it. Its fix would be a rewrite of its input layer onto squash-PR titles — data the PR gate already makes answerable with one `git log`.
3. **Consumption trace**: the structured `.json`/`.internal` artifacts have ZERO consumers (code, agents, knowledge bases, docs — swept). The post-merge `release-analysis` workflow prints (wrong) analysis to run summaries nobody reads.
4. **What actually protected the release** — the publish guard scripts (`check:drift`, `verify:token-index-clean`, the `prepublishOnly` chain) — is NOT part of the release manager and is untouched by this ballot.
5. **Trajectory**: the tool itself replaced a 203-file predecessor (Spec 065). This verdict continues that simplification one step further, now that the gate provides what the tool compensated for.

## Peter's two concerns, addressed in scope (2026-08-12)

- **C1 — agents' "what changed and why" discovery**: lives in the record chain (squash titles → release notes → task summaries → ballots/register), NOT in the tool. The rewritten mental-model doc SHALL carry a "discovering what changed and why" section teaching that chain (MCP-served + consumer-shipped). The release-notes documents practice CONTINUES (proven consumer: 123's `inbound-from-13.0.0-release.md`). **Recorded deferral**: whether release notes should ship/serve to consumers is a Spec 123 consideration (upgrade/sync story), not decided here.
- **C2 — dependency sweep before deletion**: swept 2026-08-12 — **36 referencing files**, including 2 always-loaded steering docs (Task-Completion-Protocol "the release tool scans" clause; start-up-tasks' test-command decision tree keying on "modifies release tool" ×3), 7 governance docs, 12 `docs/examples/` tutorials + CI-integration examples, 3 hook surfaces + `complete-task.sh`'s banner, 2 diagnostic scripts, the CI workflow, and the tool + 11 test files. Full inventory + per-file adjudication: the execution issue (below).

## The ratified verdict

1. **KILL**: `src/tools/release/` (24 files) + its 11 test files; `.github/workflows/release-analysis.yml`; `scripts/validate-release-setup.js` + `scripts/diagnose-release-issues.js` (+ fixture); `release-manager.sh`, the release-detection hook, `analyze-after-commit` hook surfaces; the `release:*`, `validate:release-setup`, `diagnose:release-issues` package scripts. `NpmPublisher.ts` dies with the tool.
2. **REWRITE**: `governance/release-management-system.md` becomes the mental model of the RECIPE (derive delta from squash titles → classify consumer-facing impact → Peter ratifies the bump → hand-authored notes → guard scripts protect publish → manual tag + `gh release create`), including the C1 discovery-chain section. `RELEASE-FLOW.md` gains the derive-classify-ratify section. Steering-law amendments (TCP clause; start-up-tasks decision-tree branch) ride a Peter-merged governance PR.
3. **ARCHIVE / keep-as-history**: `docs/release-management/` guides and `docs/examples/` release tutorials + CI templates (adjudicated per-file at execution — archive location or deletion with the history in git); Spec 065/101 records untouched (history).
4. **KEEP untouched**: publish guard scripts; the notes-documents practice; `docs/releases/` records; squash-title discipline (its value is now the changelog spine itself, independent of any tool).

## Execution

Issue-driven per the recorded pattern (this ballot is the design): `.kiro/issues/2026-08-12-release-manager-retirement-execution.md` carries the inventory checklist. Execution runs as its own focused session; the sweep re-runs at execution start (point-in-time counts are never load-bearing). Steering/governance edits are governance-law: Peter-merged. Removing `release-analysis.yml` is NOT a required-check-set change (it was never a required context) — no measurement-window consequence.

## Counter-arguments on the record (AICP)

- Killing loses structured release metadata → it has zero consumers; if 123's install-doc/upgrade story needs structured release data, build against that real requirement then.
- Evolve-instead (input-layer rewrite onto PR titles) → maintains a standing tool for a quarterly task a session performs in minutes; rejected as machinery without a bite.
- The tool represents past investment (065's rebuild) → the investment's surviving value IS the simplification trajectory this ballot continues.

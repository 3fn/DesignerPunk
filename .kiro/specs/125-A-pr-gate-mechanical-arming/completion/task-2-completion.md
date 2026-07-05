# Task 2 Completion: Rework Task Tooling for Branch → PR → Merge

**Date**: 2026-07-05
**Type**: Implementation | **Validation**: Tier 2
**Status**: COMPLETE — built and proven, NOT activated (behavioral cutover is Task 4's atomic window; old scripts verified untouched)

## Artifacts

- `.kiro/hooks/complete-task.sh` (NEW) — one completion command, two modes: `--subtask` (commit + push branch, no PR) / parent default (commit + push + open PR + report URL). Shellcheck-clean, bash-3.2-safe. Fossil `TASKS_FILE` not carried forward.
- `package.json` — publish lifecycle reconciled per Req 4.4(a): `verify:token-index-clean` gate in `prepublishOnly`; `postpublish` reduced to warn-only tripwire. **No git write or push remains anywhere in the publish lifecycle.**
- `.kiro/hooks/RELEASE-FLOW.md` (NEW) — the release sequence under the gate; Task 4's law application references it.
- `.github/workflows/release-analysis.yml` (NEW) — ballot 1e plumbing: non-required `release:analyze` on push-to-main, output in the run summary; actions@v5 (Req 8 rider partially banked).

## Tier 2 proof record (agent-run; main-loop re-verified items marked ✓✓)

1. **Subtask mode**: branch `task/125-A-2-proof-subtask` pushed, no PR opened, remote `main` unchanged.
2. **Parent mode**: real PR opened by the script — [PR #9](https://github.com/3fn/DesignerPunk/pull/9), 1b-conformant title/body (`Spec:` full directory name); 1d.7 resume path proven (fix-push re-reported same PR, no duplicate); closed unmerged, branches deleted (✓✓ verified CLOSED).
3. **Credential loud-fail**: invalid token → died at preflight, actionable scope-naming message, zero git mutation; no-credentials variant likewise. No fallback path exists.
4. **Never-main structural**: refusal fires before any git call; `assert_not_main` re-fires before commit AND before push; push refspec pinned; credential helper pinned to the preflighted token (✓✓ re-run on main: refusal + HEAD unchanged).
5. **postpublish smoke**: dirty token-index blocks publish at prepublishOnly; grep confirms no push in lifecycle scripts (✓✓ diff reviewed).
6. **Regression**: `npm test` 8987/8987 + `tsc` clean (✓✓ re-run in main loop).

## Design decisions

Mode selection = explicit `--subtask` flag (simple beats clever). postpublish = pre-publish verification, not auto-PR (publish stays deterministic; artifact and committed index guaranteed in sync). Repo slug derived from `git remote`, not hardcoded. `--organize`/`--validate-metadata` folded per ballot 11c. PAT scopes re-verified functionally from the agent's seat (push + PR write proven live).

## Preconditions cleared for Task 3

PAT: Contents ✓ / Pull requests ✓ / Administration ✓ (verified 2026-07-05). Release-flow reconciliation ✓ (this task). Remaining Task 3 blocker: Task 4 staged to land back-to-back (per T-A9).

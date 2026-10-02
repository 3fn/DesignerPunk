# Grant: Thurgood refreshes `canonical/generated.lock` on the 15.0.0 release PR's branch

**Date**: 2026-10-02
**Status**: ACTIVE (a grant; it does nothing until Peter's merge activates it)
**Owner**: Thurgood.
- He owns the instrument. The register row `never-hand-edit-122-generated` (`governance/classification-map.md`) carries `verification.owner: thurgood`, with `122-diff-guard` as its check, and the lock is that guard's own write.
- Owning the row is not a write-scope grant; this file is the grant (README rule 8).
**Trigger**: **the 15.0.0 release PR's branch** (`chore/release-v15.0.0`), after the commit that bumps `package.json`. **Expiry**: when that PR merges (README rule 8).
**Source**: Peter's 15.0.0 release rulings of 2026-10-02 (relayed by the orchestrator); Thurgood's release-prep consult of the same day (§ 3, "the lock on the release PR"); the precedent `archive/2026-10-01-task-18-lock-refresh.md` (#253, #258).

---

**Grant paths**: `canonical/generated.lock`

## Why it is needed

The version bump edits `package.json`, which is in the lock's input closure (`INPUT_CLOSURE_FILES`, `tools/agent-generator/diff-guard.ts` L72). The release PR therefore moves the lock's `inputClosure`. `outputs` is expected to stay unmoved, but that is the guard's to say, not this file's. The Task 18 lock grant expired at U2b's merge (#262), and `canonical/**` is outside Thurgood's charter write scope.

**Why a refresh and not a stale lock**: a stale `inputClosure` with unmoved `outputs` keeps the guard's full path green, but it denies the C6 no-op to every later PR on `main` until someone refreshes it. One refresh on the release PR is cheaper than a standing slow path.

## Grant

- **Rule 8.** Activated by Peter's merge of the PR whose body names this file and this path list: the PR that carries this file onto `main` (the release-picks PR).
  - **The fixing PR is the 15.0.0 release PR.** The refresh commit lands on its branch, and the grant expires when that PR merges.
  - The release PR's body names this file and restates `**Grant paths**: canonical/generated.lock`.
  - No ratification authority. No governance-law path. An edit by Thurgood outside the list, on that branch, is a claims-pass finding.
- **Guard-written only.** The lock is **never hand-edited**.
  - The only write is `npm run check:122:diff-guard`'s own full-run write, from a checkout of the release branch at its current pushed head whose `git status --porcelain` is empty.
  - After the run, `git status --porcelain` shows **only** `canonical/generated.lock`, or nothing.
- **Stop and report; this is not a refresh** if:
  - the guard's `outputs` value moves;
  - the guard asks for a re-sign, or any freshness or signing check fails;
  - the run leaves any file other than the lock changed;
  - resolving the lock would take a hand edit.

  Report to the orchestrator, naming Lina (generator machinery) and Stacy. A moved `outputs` means the generated surface changed, which is its owner's work, not this grant's.
- **One commit per refresh**, touching exactly `canonical/generated.lock`:
  - **Subject**: `generated.lock refresh after the 15.0.0 version bump (123)`, or the form the branch already uses for a refresh.
  - **Body** carries `Grant: .kiro/issues/2026-10-02-release-15-lock-refresh-grant.md` and ends `Agent: thurgood`.
  - **Push**: fast-forward only, never force, never amend. A rejected push means fetch, re-run the guard from a clean tree at the new head, and commit again.
- **When it applies.** Once, after the version-bump commit is on the branch, and again after any later commit on the branch that touches a closure root or file (`canonical`, `skills`, `tools/agent-generator`, the three MCP `src/`, `governance`, `.kiro/steering`, `package.json`, `.kiro/hooks/complete-task.sh`). A commit under `docs/`, `token-index/`, `CHANGELOG.md`, `README.md` or `package-lock.json` does not move it.
- **The trigger log** is `.kiro/specs/123-consumer-distribution/lock-refresh-trigger-log.md`. It gets a dated "release 15.0.0" section when the refresh happens, written then and not now. Each entry states who ran the guard, the SHA, the verdict string, the freshness finding count, and the refresh commit SHA or "no diff".

## Agreement with Ada's companion grant

`2026-10-02-release-15-files-grant.md` (owner Ada) covers `package.json`, `package-lock.json`, `CHANGELOG.md`, `README.md`, the release notes, `docs/releases/15.0.0/**` and `token-index/**` on the same release PR, and states that `canonical/generated.lock` is NOT in its list and is covered by this separate grant. The two lists are disjoint, and each names the other. This file does not touch any path Ada's grant lists; the version bump itself is made under hers, and the refresh follows it under this one.

## The post-tag arming flip: its own grant is owed, not granted here

Peter ruled on 2026-10-02 that `completion-criteria-parity` is armed now and the **flip lands after the v15.0.0 tag**. That PR will need **its own grant**, named here as owed:
- `.github/**` for the required-context wiring, which carries M1's excluded acts unless named and admitted (a new required context is one of them);
- `tools/agent-generator/verify-gate-registration.sh` (`EXPECTED_CONTEXTS` and its count-assert);
- `canonical/generated.lock` (that script is under a closure root, so the flip moves the lock again).

The register row's flip and the branch-protection change are not grantable by an issue: the row is a governance-law path (Peter-merged), and branch protection is Peter's act. Nothing in this file grants any of this.

## Closing

When the release PR merges, the grant expires. The outcome (the trigger log's last entry and the count of refresh commits) is recorded here, dated, and the file moves to `archive/` (README rule 5).

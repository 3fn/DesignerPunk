# Grant: write scope for the 15.0.0 release PR's version, notes, CHANGELOG, README and token-index files

**Date**: 2026-10-02
**Status**: ACTIVE (a grant; it does nothing until Peter's merge activates it)
**Owner**: Ada (the 15.0.0 release's packaging seat)
**Trigger**: **the 15.0.0 release PR** (RELEASE-FLOW § "The sequence", step 3). The grant is activated by Peter's merge of the PR whose body names this file and lists the paths below (`.kiro/issues/README.md` rule 8). It expires as stated under "Duration".
**Source**:
- Peter's rulings at the 15.0.0 release-prep sitting, 2026-10-02 (relayed by the orchestrator).
- Ada's release-prep checklist, step 2: the release PR's files sit outside every charter's write scope, and the Task 18 grant that covered `CHANGELOG.md` expired at U2b's merge.
- Ballot `2026-09-27-ci-regime-standing-scope` § 3 (the issue-row grant).

---

**Grant paths**: `package.json`, `package-lock.json`, `CHANGELOG.md`, `README.md`, `docs/releases/release-15.0.0.md`, `docs/releases/15.0.0/**`, `token-index/**`

## What each path is for

- **`package.json`, `package-lock.json`**: the version bump to 15.0.0 (`npm version 15.0.0 --no-git-tag-version`). Nothing else in `package.json` changes under this grant.
- **`CHANGELOG.md`**: the two `[Unreleased]` entries become one `## [15.0.0]` section, per Ada's reconciliation draft, which Stacy can check bullet by bullet.
- **`README.md`**: the version badge (14.1.0 → 15.0.0) and its notes link. No other README change.
- **`docs/releases/release-15.0.0.md`**: the hand-authored release notes.
- **`token-index/**`**: the regenerated token index from `npm run build` on the release branch (RELEASE-FLOW step 2). This includes absorbing `2026-09-26-committed-token-index-stale.md`'s known drift, which the release PR cites.
- **`docs/releases/15.0.0/**`**: the publish-rail record, `docs/releases/15.0.0/publish-verification.txt` (RELEASE-FLOW step 6).

## Fixing PRs and duration

- **The fixing PR is the 15.0.0 release PR** for every path except `docs/releases/15.0.0/**`. The grant over those paths **expires at the release PR's merge**.
- **`docs/releases/15.0.0/**` is written by RELEASE-FLOW step 6's post-publish release-record PR.** That is a second PR, which by construction cannot exist before the publish. The grant over that one path expires at that PR's merge.
  - *This two-PR extent is stated explicitly because rule 8 speaks of "the fixing PR" in the singular.*
  - If Peter's merge does not admit it, the release-record PR needs its own grant.
- Both PRs cite this file and their path list. **An edit outside the list is a claims-pass finding.**

## What this grant does not cover

- **`canonical/generated.lock` is NOT in this list.**
  - The version bump moves the lock's `inputClosure` (`package.json` is in `INPUT_CLOSURE_FILES`, `tools/agent-generator/diff-guard.ts` L72).
  - That refresh is covered by **Thurgood's separate grant**, and the lock is written only by a green `check:122:diff-guard` run.
- **`governance/**` is never granted here.** An issue cannot grant a governance-law path (rule 8; ballot § 3 clause 5).
  - The Integration Guide edit 15.0.0 needs is **Ada's record-first ballot**, owed under `2026-10-01-integration-guide-m0a-vs-snapshot-negative.md`.
  - The same holds for `.kiro/steering/**`, `.kiro/docs/ballots/**` and agent charters.
- **No ratification authority.** The grant is additive to charter scope and nothing else.

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

---

## 2026-10-03 — Re-activation: a new grant for the 15.0.0 record corrections

**Why**: both original extents have expired. The release-PR paths expired at #271's merge, and `docs/releases/15.0.0/**` expired at #273's merge. Stacy's RELEASE claims pass, phase 2 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-15.0.0.md` § PHASE 2), routed corrections to Ada on two of those files.
- **Source**: Peter's ruling, 2026-10-03, relayed verbatim by the orchestrator: *"Let's go with your recommendations, but anything deferred I want captured."* Pick 5 of the recommendations he accepted was "yes to a separate grant for Ada's record corrections" (the full list is in `.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`, section 2026-10-03).
- **Grantee**: Ada.
- **Activation**: Peter's merge of the PR whose body names this section (`.kiro/issues/README.md` rule 8).
- **Expiry**: the corrections PR's merge.
- **This section grants; it corrects nothing.** The corrections are made in a later PR, after this grant merges.

**Grant paths**: `docs/releases/release-15.0.0.md`, `docs/releases/15.0.0/publish-verification.txt`

This line supersedes the 2026-10-02 `**Grant paths**:` line above for any PR citing this section. That line's extents have expired.

**What each correction is**:
- **(i) Stacy's R-3, a dated erratum to `docs/releases/release-15.0.0.md`.**
  - L153 says the release "is published under three manual guards (fresh-clone publish; …)".
  - The fresh-clone guard did not hold for the public npm publish, which was built in the working checkout. Guards 2 and 3 held in effect on both artifacts.
  - The erratum is appended and dated. L153 is not rewritten.
- **(ii) Inherited errors in `docs/releases/15.0.0/publish-verification.txt`**, copied from the orchestrator's divergence write-up, which the orchestrator has since corrected:
  - **The docs bundle embeds NO js-yaml** on either registry. "js-yaml 3.14.2 (docs)" (L155) was read from the nested lock, not the bundle. `application-mcp.js` has one js-yaml root on each registry, nested 4.1.1 versus root 4.2.0, the same major.
  - **"Neither server's source imports … js-yaml directly"** (L157–158) is wrong for the application server: `application-mcp-server/src/indexer/*` imports `js-yaml`.
  - **"tool-boot-smoke and agent-generator … test the nested shape"** (L161ff.) is wrong.
    - Those lanes *build* the nested-shape `dist/mcp/{docs,application}-mcp.js`, but they boot the nested servers' `tsc` builds and never the bundles.
    - The only lanes that run the shipped bundles are consumer-guard's (`test:smoke:mcp-boot`, `test:consumer`), in root shape.
    - The shape public npm shipped therefore had no CI execution.
- *Not a pending correction*: Stacy's R-4 (the 02:12–02:17Z 404s read as indexing lag) was already corrected before #273 merged, in `087f7697` (merged in `eadc7f45`). Stacy's #275 marks it resolved, so it needs no grant.

**Not covered**: anything else in `docs/releases/**`, `CHANGELOG.md` and the GitHub release body. Whether the GitHub release body is edited is Peter's or the orchestrator's call (R-3's route). An edit outside the two paths is a claims-pass finding.

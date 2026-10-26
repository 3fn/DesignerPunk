# Grant: write scope for 16.1.0's third release PR (CHANGELOG L37, RL-28; the release notes' count line and L66's post-F list, before the tag)

**Date**: 2026-10-26
**Owner**: Thurgood (the 16.1.0 release author)
**Trigger**: `release:16.1.0:phase-1` — 16.1.0's third release PR, branch `release/16.1.0-fix-2`. Its squash commit is the new final S, which phase 1's second dated addendum reads. The grant is activated by Peter's merge of a PR whose body names this file and lists the paths below (`.kiro/issues/README.md` rule 8). It expires at the release-fix PR's merge.
**Class**: P3 improvement · grant
**Source**: Stacy's RELEASE phase-1 addendum on the final S `dddf46d4f` (#500), in `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` on `chore/release-16.1.0-claims-pass-phase-1` (commit `3713247be`, PR #497): finding RL-28 (packed `CHANGELOG.md` L37 says "Other token docs were not checked for such names yet"; Ada checked them in #495), and observations O-31 and O-32. Peter's ruling on the fork RL-27 and RL-28 share, chat, relayed by the orchestrator, verbatim, received before 2026-10-26T14:04:13Z (the orchestrator's clock): *"Fix it now, and do the whole-file sweep"*. That is option (a): fix before the tag, with a new S, 5.1 run again, and a second dated phase-1 addendum. RL-27's guidelines sweep is Lina's, in her own PR; this grant does not cover it.
- **Why a new grant**: the fix-1 grant (`.kiro/issues/archive/2026-10-26-release-16-1-fix-1-files-grant.md`, archived in this PR) expired over `CHANGELOG.md` and `docs/releases/release-16.1.0.md` at #499's merge (`ff3e7dad7`). The 16.1.0 files grant's `docs/releases/16.1.0/**` path is still open, for step 6, and covers neither file.

---

**Grant paths**: `CHANGELOG.md`, `docs/releases/release-16.1.0.md`

## What each path is for

- **`CHANGELOG.md`**: the `[16.1.0]` entry only, one sentence: L37's "Other token docs were not checked for such names yet (tracked: `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md`)" (RL-28). It becomes a sentence that carries the count from that record's § "Corrections and the vetted list (2026-10-26, Ada)": 56 strings in 15 docs that are not keys, of which 36 are wrong names that ship in this release and 20 are example names not yet marked as examples. The tracking pointer stays. Nothing else in L37 or the entry changes.
- **`docs/releases/release-16.1.0.md`**: two hunks only.
  - (a) **The count line** that Peter's F-3 answer asks for (ballot `2026-10-26-governance-examples-guard`: "the release notes carry the count"): one bullet added under § "Known limitations (disclosed, tracked)", with the same count and record as the CHANGELOG sentence; and L55's "Two additions" becomes "Three additions", so the sentence that introduces the bullets stays true.
  - (b) **L66's post-F list** (O-32): the PRs after F that changed shipped paths gain #496, #499, #500, Lina's RL-27 sweep PR and the fix PR; the grant PR this file rides is named as changing none; and the list of what no trio run saw gains what those PRs changed. "No trio run saw these changes" stays true.

`canonical/generated.lock` is not listed: #499 changed `CHANGELOG.md` and left the lock unmoved, so the guard's input closure does not hold it. If a green `npm run check:122:diff-guard` moves the lock anyway, the author stops and reports.

## What this grant does not cover

Anything else, including any other line of either file and `governance/platform-implementation-guidelines.md` (Lina's sweep). An edit outside the list is a claims-pass finding.

# Grant: write scope for 16.1.0's second release PR (the CHANGELOG fixes RL-19, RL-20 and RL-21 before the tag)

**Date**: 2026-10-26
**Owner**: Thurgood (the 16.1.0 release author)
**Trigger**: `release:16.1.0:phase-1` — 16.1.0's second release PR, branch `release/16.1.0-fix-1`. Its squash commit is the new S, which phase 1's dated addendum reads. The grant is activated by Peter's merge of a PR whose body names this file and lists the paths below (`.kiro/issues/README.md` rule 8). It expires at the release-fix PR's merge.
**Class**: P3 improvement · grant
**Source**: Stacy's RELEASE phase-1 pass on S = `a95d6bf3d` (PR #497), findings RL-19, RL-20 and RL-21 in the packed `CHANGELOG.md` `[16.1.0]` entry. Peter's ruling, chat, relayed by the orchestrator, verbatim, received before 2026-10-26T12:42:58Z (clock): *"Re: 1, (A)"*, which is option (a): fix before the tag, with a new S, 5.1 run again, and a dated phase-1 addendum.
- **Why a new grant**: the 16.1.0 files grant (`.kiro/issues/2026-10-25-release-16-1-files-grant.md`) expired over `CHANGELOG.md` at #494's merge. Only its `docs/releases/16.1.0/**` path is still open, for step 6.

---

**Grant paths**: `CHANGELOG.md`, `canonical/generated.lock`

## What each path is for

- **`CHANGELOG.md`**: the `[16.1.0]` entry only, three edits:
  - **RL-21**: the heading's `— TBD —` becomes the date, in the form 15.1.0 and 16.0.0 used.
  - **RL-20**: the "no … shipped file … was removed" sentence becomes true. `dist/components/core/Button-CTA/Button-CTA.refs.{js,d.ts}` were removed.
  - **RL-19**: the Kiro known-limitation sentence becomes true.
- **`canonical/generated.lock`**: only if the guard's input closure includes `CHANGELOG.md` and moves. It is written by a green `npm run check:122:diff-guard`, never by hand. If `outputs` moves, the author stops and reports.

## What this grant does not cover

Anything else. The release notes do not repeat RL-19's sentence, so `docs/releases/release-16.1.0.md` is not on the list. An edit outside the list is a claims-pass finding.

# Issue: `d2-check.ts`'s header does not name the F-4 block as the rules for later edits, and its grant

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P3 improvement · grant
**Trigger**: `manual` — the event that owes the close is the merge of the fixing PR (branch `chore/129-d2-check-header-fix`, not yet opened), which this record names as its own event (rule 1). The close is rule 5's dated outcome line giving the fixing PR number and its `git diff -U0` result, then the archive move.
**Source**: Stacy's ARMING batch-4 finding F1 (Low), in `.kiro/specs/129-consumer-generation-completeness/completion/arming-reads-2026-11-08-batch-4.md` on PR #759; and ballot `.kiro/docs/ballots/2026-11-07-native-lane-ownership.md` § 8, "F-4 as ruled", "Where the application PR carries these rules", item (iv): the script's own header "names this block as the rules for later edits". U8 shipped the header without it (L1–L28 at `main` cite only "Peter's F-4 ruling, 2026-11-08"). Filed by Thurgood on the orchestrator's routing.

---

## Why a grant

Under F-4 (b), since U8's merge `scripts/harness/d2-check.ts` has no standing holder. It moves by spec row or per-fix grant, and a grant never goes to the seat holding `src/generators/**` in that unit (Ada). Thurgood is not that holder. The edit is comment-only, so the ballot's consult duty on Ada, which attached to changes outside the comments under F-4 (a), is not owed: F-4 as ruled names no consult, and item 6's bar names no recipient.

## The act

Add comment lines to the file header of `scripts/harness/d2-check.ts`. No code line, no test, no deletion.

**Grant paths**:
- `scripts/harness/d2-check.ts` — comment lines only; no test change.

**Header text to add** (inside the existing header comment, after the paragraph that begins "The design rule"):

```
 * Rules for every later edit: ballot 2026-11-07-native-lane-ownership § 8, "F-4 as ruled" (the law
 * home; read it before changing this file). It holds R-1 (this design rule, enforced by the grep case
 * in d2-check.test.ts), R-2 (the falsification cases are append-only), R-3 (the count floor: no
 * `count=0`, and on a change outside the comments the base and the changed script print equal counts
 * on the same consumer), and R-4 (the fixing PR cites its spec row or grant and pastes R-1's result and
 * R-3's two runs). This file has no standing holder: a change needs a spec row or a per-fix grant,
 * never to the seat holding `src/generators/**` in that unit.
```

## Acceptance of the fixing PR

- `git diff -U0 origin/main...HEAD -- scripts/harness/d2-check.ts` shows only added comment lines; `git diff --numstat` deletions are `0`; `.github/**` is untouched and no other file changes.
- `npm test -- scripts/harness/__tests__/d2-check.test.ts` passes, including its grep test (R-1).
- The PR body cites this record as the grant and names the ballot block (R-4).
- The PR touches an instrument path, so it fires Stacy's ARMING instrument-path limb and the F-4 (b) read: the cited grant, the writer not the `src/generators/**` holder, R-1's case passing, R-2's deletions-zero, R-3's runs (for a comment-only change the two counts are equal by construction; the PR says so).
- The grant is activated by Peter's merge of the PR that carries this record, and the fixing PR is diffed against the list as it stands then. It archives at the fixing PR's merge (rule 5).

## Outcome (2026-11-08)

Closed by the fixing PR #762 (branch `chore/129-d2-check-header-fix`, commit `8720b23d2`). `git diff -U0` shows 8 comment lines added to `scripts/harness/d2-check.ts` and 0 deleted; no other file changed. R-1: `d2-check.test.ts` 27/27, grep case included. R-3's two runs were not made: a comment-only change prints equal counts by construction. One departure from the header text above: the last sentence does not name the glob `src/generators/**` literally, because R-1's grep bans that literal in the file; it reads "never to the seat holding the generator sources in that unit (the ballot names the glob)". Archived at #762's merge, per rule 5 (the move is in this PR). — Thurgood

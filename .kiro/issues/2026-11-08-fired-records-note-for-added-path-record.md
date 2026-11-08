# Issue: the `fired-records` check says nothing when a PR adds a `path:` record on a path it touches

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P3 improvement · defect
**Trigger**: `manual` — the event that owes the close is the merge of this record's own fixing PR, the PR-mode change below. It is named once it opens, and its PR body cites this record. Any PR that changes `scripts/issues-owned.sh` before then reads this record first.
**Source**: ballot `.kiro/docs/ballots/2026-11-08-closeout-cracks.md`, F-6 (a), ratified with items 1 and 3 (Peter, 2026-11-08T20:36:57Z, "Ratified"). The record of the ruling is `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ratifies-cracks-ballot-items-1-3.md`. This record is F-6's surviving counter, filed under rule 10 in the follow-up to that ratification. The fixes are `[STACY R3]` § 3, in the ballot's § 10.

---

## The gap

- **F-6 (a) rules the case**: a `path:` record does not fire at the merge that adds it. The seat mode, `compare.ts` and the PR mode at `c8fd9640d` all read it that way.
- **So the #727 shape now gets no fire and no listing.** An owner who files a `path:` record on a path its own PR touches, meaning "this PR is the event", sees nothing. The record waits for the next touch, which may be a different event from the one its prose names.
- **The remedy is the owner's**: write `merge:#<N>`. The only text that tells them is the README rule 11 sentence of ballot site 3.3, applied in § 5 step 3a.

## The act

Add a note to the PR mode of `scripts/issues-owned.sh` (my standing scope), with a case in `scripts/__tests__/issues-owned.test.ts` that is red at its base:
- **When**: a record the diff **adds** carries a `path:` token, and one of its globs matches a file in this PR's diff. That is the #727 shape, and only it. An added `path:` record whose globs this diff does not touch prints nothing, as now.
- **Its own state**, never `fires-here` (`[STACY R3]` § 3): `added-touches-own-path	<path>	<owners>	<token>	(does not fire here; fires at the next touch — write merge:#<N> if this PR is the event)`. Under `GITHUB_ACTIONS=true` it is a `::notice title=fired-records::`, not a warning.
- **Counted apart**: the count line gains a separate field for it. The `fires-here`, re-ruled, closed and already-fired counts are unchanged, so item 3 (d)'s listed count does not move mid-cycle. The cycle began at #803's merge, `4704b4949`.
- **The walk** that closes item 3 (d)'s cycle counts these notes apart from the listed, mismatch, disputed and unavailable counts.

**Not in this act**: any change to what fires, to the seat mode, or to `compare.ts`.

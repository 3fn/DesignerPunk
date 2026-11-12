# `verify-signing-chain` link 7 applies F-2 (b) to acts made before #816, which the shape-review ballot does not bind

**Date**: 2026-11-09
**Owner**: Thurgood (the instrument, `tools/agent-generator/regrounding/verify-signing-chain.ts`, standing scope)
**Class**: P2 obligation (record) · defect *(set 2026-11-09, Thurgood, rule 12)*. The audit gives a false `FAIL 7` on old acts, and § 5.3 sends each such verdict to Peter as an `**Open for Peter**:` line. No gate reads it, because `--audit` never gates and `--ci` reads only a PR's own acts.
**Trigger**: `release:16.4.0:phase-1`. The next RELEASE delegate audit re-reads old PRs, so the fix is owed before that walk.
*Trigger re-ruled 2026-11-12 (Thurgood, owner, rules 9 and 11). The 16.3.0 walk's grep ran at `c3fd1893a`, before #848 added this record, so the walk could not row it; #848 merged 28 s before the walk record (#851), so the post-walk-filing exemption does not reach it, and it lapsed at S. The original prose ("the fix is owed before that walk") meant the release after 16.3.0, which is a token-form miss: the token names 16.4.0. The fix is mine, in my tooling PR (`tools/agent-generator/regrounding/verify-signing-chain.ts`, standing scope), due by 16.4.0's S and before the next RELEASE delegate audit; re-tokened to `merge:#<N>` once the PR opens. Authority: the owner's act under rules 9 and 11. Peter's batch ruling of 2026-11-12T13:29:02Z ("As recommended"), `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md` (branch `chore/ruling-records-home-b` @ `253892f34a78f8f45347dd0e3b26f08da90bbbee`), records that this record does not escalate (a P2 `(record)`, first lapse) and that its owner settles it; his 2026-11-09T04:27:04Z ruling above is unchanged. Superseded token, kept: `release:next:phase-1`.*
**Source**: Peter, 2026-11-09T04:27:04Z, "Proceed as you recommend." (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-ruling-delegate-audit-16-3-0.md`). The 12 flagged lines of the 16.3.0 delegate audit stand as recorded, and this record is filed. Found in my annotations on PR #848 (Ada's file, `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-16.3.0-ada.md`).

---

## The defect

The shape-review ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` says, under **Retroactivity**: "none (clause 8). The rule binds acts committed after the application PR's merge. No old act is re-judged." F-2 (b) landed in PR 1, #816, squash `8c31c7fa1e229e7f8ae0962a28a0ddef90fc95f7`, merged 2026-11-08T21:22:12Z. F-2 (b) says that link 7 on a row that renders nothing anchors on the print record.

`verify-signing-chain.ts`, link 7, the F-2 (b) branch: every signature act on a row that renders nothing is read through `printRecordMatches`, whenever the act was made, and with no print record it reads `FAIL 7`. The FAIL line is "the row renders nothing and no tool result carries its print record …". An act made before #816 could not have carried that record: `--print` itself landed in #779 at 2026-11-08T14:20Z.

**Instances** (16.3.0 delegate audit): 10 × `FAIL 7`. *(Added 2026-11-12, Thurgood, owner: 19 more `FAIL 7` on #758, from Stacy's signing-act walk of the non-Stacy acts, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.3.0.md` Appendix A (draft PR #857) and my consult read of 2026-11-12. They are acts on rows that render nothing (`writeScope` rows), made before #816, and read `record absent 7` before it, so they are this defect and not an act defect. The three rendered-line FAILs of that walk (Data `#in-scope` on #758, Kenya twice on #775) are not this defect: they come from link 7's original branch, are unclassified, and are owed a per-act read by me.)*
- #758: 3 acts on `e3abde8f`, made 2026-11-08T01:43Z.
- #746: 7 acts on `81012d85`, made 2026-11-07T23:47Z.

Before #816, these acts read `record absent 7` ("the row renders nothing — there is no rendered line to find"). Leonardo's re-read of #758 at #772 recorded them that way.

## The fix

Gate the F-2 (b) branch on the act's position in history: it applies only to an act made after #816. An earlier act keeps the pre-#816 verdict, `record absent 7`, "the row renders nothing — there is no rendered line to find".

**The cut, corrected 2026-11-12 (Thurgood, owner).** The first text here keyed on "the act's commit is not an ancestor of `8c31c7fa1`". That cannot work. A signing act is a commit on a PR branch, and a squash merge never makes the branch's commits ancestors of the squash: `d85aaa85` and `c08bf675` both predate #816 and are not its ancestors. So the test would read every old act as new. The cut keys on **the act's PR squash**: the act is old if the squash of the PR that carries it is an ancestor of `8c31c7fa1`, and for a PR that was unmerged at #816, on the act's committer time against #816's `mergedAt` (2026-11-08T21:22:12Z). The fixture cases below are re-cut to match, with one case of each kind.

The same reach question applies to the other shape-review rules the instrument reads: link 1 by list membership, and F-3 (a)'s later-rendering `record absent 7`. The fixing PR checks each one against clause 8 and states what it found.

**Fixture case** (`tools/agent-generator/__tests__/verify-signing-chain.audit.test.ts`):
- A signature act on a row that renders nothing, in a PR whose squash is an ancestor of `8c31c7fa1` (or, for a PR unmerged at #816, committed before #816's `mergedAt`), with no print record in its transcript, reads `record absent 7`, never `FAIL 7`. The case uses a branch commit that is not itself an ancestor of `8c31c7fa1`, as `d85aaa85` is not.
- The same act in a PR merged after #816, or committed after #816's `mergedAt`, reads `FAIL 7`.
- The first case is red against the current code, which reads it `FAIL 7`. The second case guards the cut.

**Not changed by the fix**: Peter's ruling. The 12 lines on #848 stand as recorded, and every act stays in his J for 16.3.0.

## Close

The fixing PR adds rule 5's dated outcome line naming itself, and archives this record.

## Lapse (2026-11-12)

Firing commit `6f507c039` (#852, the squash tagged `v16.3.0`: release 16.3.0's S). First lapse of a P2 `(record)` record (no escalation). Read from Stacy's RELEASE 16.3.0 phase-1 record, § "The rule-11 read at S" (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.3.0.md`, draft PR #857), and appended by the owner (rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else. Signed Thurgood (owner), 2026-11-12.


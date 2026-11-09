# `verify-signing-chain` link 7 applies F-2 (b) to acts made before #816, which the shape-review ballot does not bind

**Date**: 2026-11-09
**Owner**: Thurgood (the instrument, `tools/agent-generator/regrounding/verify-signing-chain.ts`, standing scope)
**Class**: P2 obligation (record) · defect *(set 2026-11-09, Thurgood, rule 12)*. The audit gives a false `FAIL 7` on old acts, and § 5.3 sends each such verdict to Peter as an `**Open for Peter**:` line. No gate reads it, because `--audit` never gates and `--ci` reads only a PR's own acts.
**Trigger**: `release:next:phase-1`. The next RELEASE delegate audit re-reads old PRs, so the fix is owed before that walk.
**Source**: Peter, 2026-11-09T04:27:04Z, "Proceed as you recommend." (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-ruling-delegate-audit-16-3-0.md`). The 12 flagged lines of the 16.3.0 delegate audit stand as recorded, and this record is filed. Found in my annotations on PR #848 (Ada's file, `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-16.3.0-ada.md`).

---

## The defect

The shape-review ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` says, under **Retroactivity**: "none (clause 8). The rule binds acts committed after the application PR's merge. No old act is re-judged." F-2 (b) landed in PR 1, #816, squash `8c31c7fa1e229e7f8ae0962a28a0ddef90fc95f7`, merged 2026-11-08T21:22:12Z. F-2 (b) says that link 7 on a row that renders nothing anchors on the print record.

`verify-signing-chain.ts`, link 7, the F-2 (b) branch: every signature act on a row that renders nothing is read through `printRecordMatches`, whenever the act was made, and with no print record it reads `FAIL 7`. The FAIL line is "the row renders nothing and no tool result carries its print record …". An act made before #816 could not have carried that record: `--print` itself landed in #779 at 2026-11-08T14:20Z.

**Instances** (16.3.0 delegate audit): 10 × `FAIL 7`.
- #758: 3 acts on `e3abde8f`, made 2026-11-08T01:43Z.
- #746: 7 acts on `81012d85`, made 2026-11-07T23:47Z.

Before #816, these acts read `record absent 7` ("the row renders nothing — there is no rendered line to find"). Leonardo's re-read of #758 at #772 recorded them that way.

## The fix

Gate the F-2 (b) branch on the act's position: it applies only to an act whose commit is not an ancestor of `8c31c7fa1` (#816's squash). An earlier act keeps the pre-#816 verdict, `record absent 7`, "the row renders nothing — there is no rendered line to find".

The same reach question applies to the other shape-review rules the instrument reads: link 1 by list membership, and F-3 (a)'s later-rendering `record absent 7`. The fixing PR checks each one against clause 8 and states what it found.

**Fixture case** (`tools/agent-generator/__tests__/verify-signing-chain.audit.test.ts`):
- A signature act on a row that renders nothing, committed before the #816 cut, with no print record in its transcript, reads `record absent 7`, never `FAIL 7`.
- The same act committed after the cut reads `FAIL 7`.
- The first case is red against the current code, which reads it `FAIL 7`. The second case guards the cut.

**Not changed by the fix**: Peter's ruling. The 12 lines on #848 stand as recorded, and every act stays in his J for 16.3.0.

## Close

The fixing PR adds rule 5's dated outcome line naming itself, and archives this record.

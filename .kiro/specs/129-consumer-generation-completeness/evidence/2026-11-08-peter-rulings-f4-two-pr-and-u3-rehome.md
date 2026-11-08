# Peter's rulings: F-4 (a) applied as two PRs; U3 re-homed as its own charter

**Recorded by**: the orchestrator. Each time was read from the clock (`date -u`) when Peter's words arrived.

## The exchange

1. **Context.** Peter ratified the signing-act shape-review ballot with F-4 (a) at 2026-11-08T17:45:34Z (record `2026-11-08-peter-ratifies-signing-act-shape-review.md`). The ratified text conflicts with itself on when F-4 (a)'s 261 re-signs happen:
   - L480 says "at application … in one round".
   - Stacy's spliced R2, at L812, says "Peter's call … cheapest if it rides U3".

   The orchestrator's summary to Peter said "timed with U3's round". The Status commit `4942c9550` added § 5 item 5a and a stopgap paragraph, which is F-4 (c)'s text. Peter then asked about 125-B's status, and at 18:32:31Z said "Yes, run the U3 and F-4 consult".
2. **2026-11-08T18:56:04Z**, Peter: "Re: Bucket 1, 799 and 800 are merged / Re: Bucket 3, Let Thurgood and Stacy some to a position they agree on / Re: Bucket 4, I'm fine with them not being part of 131; but I feel the subject matters are compatible: I've been thinking that one of the ways we can reduce governance and maintain alignment is moving to more mechanical mechanisms and less review — maybe even translating some documentation and ballots to CI or similar. Honest thoughts?" (He means "come to a position".)
3. **What Thurgood and Stacy agreed (Bucket 3).** Two cross-read rounds. Both signed the bridge with amendments.
   - The ballot is applied as **two sequential PRs**. It counts as "applied" only when both have merged.
   - **PR 1**: the code, fixtures, seat brief and register, with items 1–3 and F-1/F-2/F-3 as ratified. F-4 (a)'s pin is not switched on. Until PR 2 merges, a re-disposition of a rendering-less row moves no hash, and the claims pass reads it by hand. § 2a's "Re-disposition" paragraph and S4's line land in PR 2 together with the pin. PR 1 keeps the table cell's current reading. (Thurgood, Stacy.)
   - **PR 2**: the F-4 (a) disposition pin and the 261 re-signs, in one PR, **merged before the next release's squash S**. Phase 1 reads at S that no signed row still pins `sha256:37517e5f…`.
   - **#801's Status commit** records only Peter's words and his four picks. § 5 item 5a and the U3 parenthetical and stopgap (F-4 (c)'s text) are removed. "Timed with U3" is labelled as the orchestrator's addition.
   - **Stacy's re-attestation record** gets the Trigger `manual`, on an identity that distinguishes seats existing (signing-act-chain ballot L265). The monthly walk counts `manual` records.
   - **Surviving counter**: 261 re-assents to unchanged judgments, closing a gap with no instances on record.
4. **What Thurgood planned (Bucket 4).** Option (i), close 125-B and re-home U3, which Peter chose by saying "I'm fine with them not being part of 131":
   1. A ballot re-points TCP L93/L129 and the `record-first-ratification` register row to the charter. Peter ratifies it.
   2. The charter record `.kiro/issues/2026-11-08-125b-u3-governance-layer.md`: P3 charter, Trigger `manual` on Peter creating the distinct identity. It holds Req 13 and the re-attestation duty. Stacy re-rules her re-attestation record in the same PR. Peter merges.
   3. A 125-B tasks amendment: Task 5 ticked, with its parent doc and summary; Task 6 and the U3 table row replaced by pointers to the charter; the ballot applied. Peter merges.
   4. Stacy's 125-B CLOSEOUT pass.
5. **2026-11-08T19:02:15Z**, Peter, on recording the "mechanical over review" idea as an inbound to Spec 131: "Yes, please". That is now PR #802.
6. **2026-11-08T19:06:05Z**, Peter: **"Re: Bucket 2, 798 is merged / Re: Buckets 3 and 4, proceed as the relevant team members recommend"**

## What was ruled

- **Bucket 3.** Peter adopts the two-PR application in item 3, with every amendment listed there. #801's Status commit is corrected to match before it merges.
- **Bucket 4.** Peter adopts Thurgood's four-step U3 re-home in item 4. Step 1's ballot still goes to Peter for ratification as written. "Proceed as recommended" approves the plan, not the ballot's text.

# Peter's ruling: the audit's link-4 double count is a bug, fixed by the class option

**Recorded by**: the orchestrator, timestamped from the clock at receipt (`date -u`).
**Context**: `verify-signing-chain --audit` link 4 counts one commit twice when one call prints both git's `[<branch> <sha9>] <subject>` line and a `git log -1 --format='%H %s'` line. Every act made in the no-`-q` briefed form then reads `anomaly 4`: about 15 on #758 and 1 on #763. This is the record `.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md`, § 1 item 2.

## The exchange

1. **2026-11-08T03:44:32Z**, Peter: "Re: (a), let's do that investigation first, please". This answered option (a), fix link 4 now, and its caveat: does changing `tools/agent-generator/regrounding/` force a re-run of the ARMING bite evidence?
   - Thurgood and Stacy found independently that it does not.
   - The empty-diff clause (ballot `2026-10-01-signing-act-chain` L92) was a one-time gate on the `--ci` row's flip to `armed`.
   - Link 4 belongs to `--audit`, which has no check state.
   - None of the six later tool PRs (#409, #423, #437, #445, #524, #657) re-ran a bite.
   - Stacy also found that the ratified ballot `2026-10-23-link4-candidate-first-sha-after-commit` is unapplied and touches the same code.
2. **Peter**: "Is there any way to determine if this is a bug or designed? Honest thoughts?"
   - The orchestrator's answer was that it is a bug.
   - The code comment at `verify-signing-chain.ts` L1238 says: "One candidate per tool call and commit: the [branch sha] line and the log line of one call are the same candidate". It arrived with the code in `669b51b09` (#262). The dedupe key compares the printed prefix strings, and those differ (9 characters against 40), so the dedupe never fires.
   - Ballot `2026-10-01-signing-act-chain` § 4.3 says "one per pass".
   - Every test fixture uses `git commit -q`, so the double print was never tested.
3. **2026-11-08T03:55:36Z**, Peter: **"Let's go (A) with the class option"**.

## What was ruled

- **(A)**: the double count is a defect against the stated rule. The fix needs no new law. The fixing PR cites the L1238 comment and § 4.3 as the evidence. Stacy's fixture pins the behaviour: one call with both lines is one candidate and reads `anchored`, and her controls must still read `anomaly`.
- **The class option**: one combined PR. It applies the ratified 2026-10-23 link-4 ballot (its § 5) and the dedupe fix, with Stacy's fixtures, after #763's merge, because both PRs carry the lock. After merge, it re-reads the falsely flagged acts (#445, #758, #763) on the fixed instrument.
- **Not ruled here**: a one-sentence clarification of the 2026-10-23 § 2a text. That is left optional for Spec 131's pass.

The record `2026-10-26-signing-chain-audit-false-verdicts.md` has a Trigger of Spec 131's requirements. Its owner, Thurgood, re-rules it for fix 2 under rules 9 and 11, citing this record.

# Peter's rulings, 2026-11-07 23:17Z and 23:23Z: native harness lane ownership after U12

**Recorded by**: the orchestrator (primary session). This is a record of rulings, not law.

## Peter's words, verbatim

**Received 2026-11-07T23:17:52Z** (`date -u`, at receipt):

> Re: press settings and `consumer.ts`, Inform to leans to the relevant agents to better inform the lean if necessary
> Re: Thurgood owning, I can confirm "no" and we can pursue the class option?

**Received 2026-11-07T23:23:23Z** (`date -u`, at receipt):

> Re: 1, Both approved as recommended
> Re: 2, 744 is merged
> Re: 3, Looks like some checks failed

## What each part answered

This section is the orchestrator's paraphrase. Only the quoted lines above are Peter's.

**The question.** The gap is that the native harness lanes' producer code has no standing owner once Spec 129's tasks-row grants end at U12. Data raised it in the charter-scope ballot consult. Peter asked for it in designer terms, then directed a consult ("Let's do the consultation first", 2026-11-07T22:30:08Z; record `evidence/2026-11-07-peter-rulings-charter-ballot-and-ripple.md`). Three rounds followed: a consult, a cross-read, and a test of the orchestrator's leans. Data, Kenya, Thurgood, Stacy and Ada took part. Their answers were kept as session scratch files, and their substance is restated here.

- **"Thurgood owning… 'no'".** Thurgood does not own every producer, which all four seats who weighed in advised.
- **"…pursue the class option".** The per-role split goes into one ballot:
  - Data and Kenya each hold standing scope over their own platform's lane files (`harness/<platform>/**` and their `probe-*`/`parse-*` pieces).
  - `scripts/harness/compare.ts` goes to Thurgood, with Data and Kenya reviewing.
  - `native-harness.yml` gets a grant per fix, per the `.github/**` grants ballot (#745).
  - No seat holds standing write over `harness/expected/**`; it changes only under a spec row or an issue-row grant.
  - The producer paths join Stacy's ARMING instrument-path read.
  - Data holds the pen, and Kenya writes the iOS clause.
  - Sequence: after #745 and after the charter-scope application PR, in place before U12 merges. Android activates at U12's merge, and iOS at the merge of the first iOS promotion.
- **"Re: 1, Both approved as recommended".** The two leans, as tested by all five seats in round 3:
  - **`harness/pins.yaml`, option (b).** Each platform seat holds standing scope over its own section only (`ios:` Kenya, `android:` Data). A move made under standing scope must meet all of these:
    - the base run's red is an environment or toolchain failure;
    - only the image and toolchain fields change;
    - the move leaves `harness/expected/**`, `harness/protected-set.txt`, the fixtures and the deployment target unchanged;
    - the lane is green at the PR head (a CI re-measure, cited);
    - Thurgood reviews it.

    With those files fixed, `compare.ts` cannot accept a new failure (L837–849), so a move cannot hide failures. The `consumer:` section of `pins.yaml`, which Ada flagged, gets an owner in the ballot. Data verified that Android also takes its JDK from the runner image, so an image update alone can turn Android red.
  - **`scripts/harness/consumer.ts`, option (a).** Ada holds standing scope, under these conditions:
    - Thurgood reviews every change, and Data and Kenya review manifest and layout changes;
    - each change shows a generated-file diff from CI;
    - a repair shows red before green;
    - the same files stay unchanged;
    - a change that shrinks the generated set goes by spec row;
    - Stacy's ARMING read covers it.

    **What survives:** Ada writes both the generator and its test driver. The invariant and the reviewers narrow that gap but do not remove it. Ada named this herself, and every seat accepted it.
- **"Re: 2, 744 is merged".** The charter-scope ballot (`f28a1fefd`) is merged. Its application PR follows.
- **"Re: 3, Looks like some checks failed".** This refers to #745. The failing check is `merge-hold`: three `**Open for Peter**:` markers (F-1, F-2 and ratification) have no answer yet. That is the hold working, not a defect.
- **Not answered in these messages:** #745's F-1, F-2 and ratification, and the go for U7a.

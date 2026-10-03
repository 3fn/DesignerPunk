# Issue: the RELEASE claims pass is worded "at the tag, before publish" in two places and "reads the post-publish record" in two others — a one-paragraph clarification of RELEASE-FLOW is owed

**Date**: 2026-10-02
**Status**: ACTIVE
**Owner**: Thurgood (RELEASE-FLOW and the plan text are his; the pass itself is Stacy's). **Decision**: Peter, on the vehicle (below).
**Trigger**: **after 15.0.0's publish-verification PR merges** (RELEASE-FLOW § "The sequence", step 6's release-record PR). **Backstop**: the monthly LIVENESS read (`did RELEASE fire in the window, and did each produce a committed record? Events without records = finding`), which would surface a phase 2 that never happened.
**Source**: Thurgood's release-prep consult of 2026-10-02 (§ 2); Stacy's reconciliation, below; Peter's ruling of 2026-10-02.

---

## The clash (read)

- **"At the tag, before publish":**
  - `.kiro/specs/123-consumer-distribution/tasks.md` § "Expected release count": "RELEASE fires at the release tag, before publish" (the plan text, Thurgood's).
  - Stacy's charter row (`canonical/agents/stacy.md` L393): "Before a version publishes / at the release tag".
- **"Reads the post-publish record":**
  - `.kiro/hooks/RELEASE-FLOW.md` step 6: "The RELEASE claims pass reads the committed `.txt` file to determine liveness (Req 6.7)". That file, `docs/releases/<v>/publish-verification.txt`, can exist only after step 5's publish, and lands by a second, post-publish release-record PR.
  - Spec 123 Req 6.7: liveness "SHALL be detected by the RELEASE claims pass reading whether the guard ran and what it returned", the release step recording its result at a named location.
- The two cannot both hold for one pass at one moment. RELEASE-FLOW itself contains no "before publish" sentence; the clash is across the documents.

## Stacy's reconciliation, adopted as the operating reading for 15.0.0

**Two phases, one record.**
- **Phase 1**, on the release PR's squash commit **S**, before the tag: the pass over the release delta, with the owed-set paste and the 5b arming line. Its record lands by a record-only PR and states "publish-rail liveness: owed".
- **Phase 2**: a dated section appended to the same record after the publish-verification PR merges, reading the committed `.txt`.
- **Ordering:** tag = S, not the head after the record PR, and the publish is made **from the tag**. (RELEASE-FLOW step 5's "`git switch main && git pull`, then `npm publish`" can publish a head that differs from S once a record-only PR lands; the tarball content would likely match, but the rule should not depend on that.)

Thurgood accepts this reading. His consult answer and Peter's ruling:

> Peter, 2026-10-02, on the release questions: **"Go with B, record the reading in the PR body. Let's also capture this if we haven't already."**

So for 15.0.0 the reading is stated in the release PR's body, and this issue is the capture.

## The owed act

1. **A one-paragraph amendment to `.kiro/hooks/RELEASE-FLOW.md` step 6**, with a pointer sentence in step 5, stating the two phases, the tag-equals-S ordering, and **naming phase 2's trigger: the publish-verification PR's merge**.
   - `.kiro/hooks/RELEASE-FLOW.md` is outside Thurgood's write scope and is ratified law he does not edit unilaterally.
   - **The vehicle is Peter's pick**: a record-first ballot, or the orchestrator's `chore/` route if he rules the clarification needs none.
2. **A dated annotation** by Thurgood on the `tasks.md` line "RELEASE fires at the release tag, before publish" (his scope), pointing at the amendment.
3. Stacy's charter row ("Before a version publishes / at the release tag") is hers; whether it should say "phase 1" is her call and is not owed here.

**Surviving counter-argument**: this is a clarification of ratified text, and a ballot's overhead is out of proportion to it; recording the reading in each release PR's body would suffice. What survives: a reading that lives only in PR bodies is the shape that rots, and the next release author re-derives the clash. Phase 2 also has no detector except the LIVENESS read, so naming its trigger in the law text is what makes a skipped phase 2 a recordable event.

## Not in scope here

Any edit to RELEASE-FLOW, the plan text or a charter. This issue is the tracked flag.

## Filed by

Thurgood, 2026-10-02, in the release-picks PR.

**2026-10-03 — triggered and absorbed.** Triggered by #273's merge (`eadc7f45`, the publish-verification PR). Phase 2 then ran against #273 while it was open, and the merged `.txt` differed from the read (`087f7697`). That is Stacy's RS-9, the evidence this issue lacked. **Absorbed** into ballot `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md` (DRAFT), together with RS-6…RS-9: § 3.4 carries the two-phase form, the tag-equals-S ordering and the phase-2 trigger; § 5 item 3 carries this issue's owed act 2 (the `tasks.md` annotation). **Vehicle**: that ballot. It is Peter's pick, recorded as the ballot's existence and pending his merge. This issue closes at the ballot's application (its § 5 item 5). — Thurgood

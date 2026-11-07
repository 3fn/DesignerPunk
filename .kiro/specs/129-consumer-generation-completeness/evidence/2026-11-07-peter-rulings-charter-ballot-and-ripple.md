# Peter's rulings, 2026-11-07 22:16Z and 22:30Z: the charter-scope ballot (picks and ratification) and the Android ripple

**Recorded by**: the orchestrator (primary session). This is a record of rulings, not law.

## Peter's words, verbatim

**Received 2026-11-07T22:16:40Z** (`date -u`, at receipt):

> Re: 1, Yes
> Re: 2,
>
> * F-1, (a)
> * F-2, Yes
> * F-3, As recommended
> * F-4, (a)
>
> Re: 4, I missed what I needed to be informed about this. Could you clarify in designer terms, please?

**Received 2026-11-07T22:30:08Z** (`date -u`, at receipt):

> Re: charter-scope ballot, ratified
> Re: Let's do the consultation first

## What each part answered

The paraphrase below is the orchestrator's. Only the quoted lines above are Peter's.

- **"Re: 1, Yes": the Android ripple fork** (`.kiro/issues/2026-11-07-android-ripple-workaround-detectors-blind.md`). Peter adopted the third option, which Lina, Data and Leonardo each recommended independently:
  - **The rule.** Android's `ripple(...)` press feedback is allowed only where a component's spec and contract declare it, which today means Button-Icon (spec 093 and the Button family decision), Input-Checkbox-Base (spec 046) and Input-Radio-Base (spec 047).
  - **What the detectors do.** They learn the new `ripple(` name and keep banning the ripple everywhere else, so the blend-token pressed state of shaped surfaces (spec 031) stays enforced.
  - **The class form.** The allow-list is read from each component's contract, not hard-coded.
  - **Follow-ups.**
    - Write Checkbox and Radio into the family-level press-feedback decision.
    - Refresh the Button family doc's stale `rememberRipple` name.
    - Check whether Compose's ripple ignores the `pressedDarker` alpha. This was flagged but not verified.
  - **The history the ruling rests on**, which Peter asked to have read from the spec:
    1. Spec 005 chose ripple on Android.
    2. Spec 031 banned ripple as a pressed-state workaround on the CTA.
    3. Specs 035, 046 and 047 required ripple.
    4. Spec 093 recorded the press-feedback decision for the button family.
- **"Re: 2": the charter-scope ballot's forks** (`.kiro/docs/ballots/2026-11-07-thurgood-charter-scope-harness-and-merge-hold.md` § 7, PR #744):
  - **F-1, (a).** The `merge-hold.yml` bound is B1–B5 as folded, the strict form.
  - **F-2, Yes.** Stacy's instrument-path limb reaches the harness paths (site 6(b)).
  - **F-3, As recommended.** The demotion read stays in its record and is not written into the charters now.
  - **F-4, (a).** Kenya and Data **review** `native-rules.ts` changes in their platform. That is Peter's "B Thurgood" word, unchanged. A review entry in the same unit satisfies the duty.
- **"Re: charter-scope ballot, ratified" (22:30:08Z).** Peter ratified the charter-scope ballot with the picks above. The orchestrator asked for this confirmation explicitly, because the 22:16 message gave the picks without the word "ratified".
- **"Re: 4…clarify in designer terms" and "Let's do the consultation first".** These concern the native harness lanes' producers, which have no standing owner after U12: Data's Android lane (`lane.ts`, `compare.ts`, the workflow's report steps), and later Kenya's iOS lane. Peter asked for the explanation, received it, and directed a consult before any ruling. The options are (i) per-repair grants or (ii) standing charter scope for Data and Kenya.
- **Not answered in these messages:**
  - #745 (the `.github/**` grants ballot): its F-1, F-2 and ratification;
  - the go for U7a (Task 20).

# Nav-SegmentedChoice-Base's `accessibility_aria_controls` says the attribute "resolves to no element"; in Chromium it is empty and the element reference resolves

**Date**: 2026-10-25
**Filed by**: Lina, under README rule 10, from her read of the 16.1.0 walk row E6 (E6-1 PASS: with a matching panel the code sets `ariaControlsElements = [panel]` and the reference resolves) against the sentence #484 put in `src/components/core/Nav-SegmentedChoice-Base/contracts.yaml` (`accessibility_aria_controls`, behavior, L360-364).
**Owner**: **Lina**
**Class**: P2 obligation (record) · defect *(rule 12. My read: not P0. The sentence understates what the component does (the reference resolves in Chromium where a panel exists), so no consumer is promised more than they get, and Peter's ruling that no tab-to-panel association is provided on web stands. The surviving counter-argument: under the falsity floor (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7) any false served sentence is P0 whichever way it errs, and this contract is served. Stacy may read it as P0; that is her finding to Peter, not an upgrade by her or by me (rule 12). Only Peter downgrades a P0.)*
**Trigger**: `merge:#N` *(the fixing PR; rule 1 and the 2026-10-22 trigger grammar: the event that owes the close. Re-tokened to the PR number once it exists. Only the owner writes or changes this line (rule 9).)*
**Consulted**: none needed for a filing; Stacy's floor read of the class is pending.

---

## The defect

The behavior text said the `aria-controls="[id]-panel-[value]"` attribute "is set for tooling only and resolves to no element". In Chromium with a matching panel, the component sets `ariaControlsElements = [panel]`; the attribute then reads as empty, and the reference resolves. Where no such panel is found, or the browser has no `ariaControlsElements`, the attribute is set. The `test_approach` also presented the jsdom test double of the HTML reflection rules as if it were the behaviour.

## The correction (this PR)

Behavior sentence now reads: "The `aria-controls="[id]-panel-[value]"` attribute is set where no such panel is found or the browser has no `ariaControlsElements`; where the element reference is set, the attribute reads as empty." The preceding sentence (no tab-to-panel association is provided on web) is untouched, per Peter's ruling. `test_approach` says the double is a stand-in and records the Chromium observation.

## Left for a decision (not touched, per the brief)

The first `validation:` line of the same contract (L368) still reads "web - the reference resolves to no element; no association is provided". It carries the same claim as the corrected sentence. Whether to correct it in this PR or leave it for Peter's call on timing is open to the orchestrator and Peter.

## What closes it

This PR's merge; the fixing PR's merge adds rule 5's dated outcome line here and archives the record.

# Nav-SegmentedChoice-Base's `accessibility_aria_controls` says the attribute "resolves to no element"; in Chromium it is empty and the element reference resolves

**Date**: 2026-10-25
**Filed by**: Lina, under README rule 10, from her read of the 16.1.0 walk row E6 (E6-1 PASS: with a matching panel the code sets `ariaControlsElements = [panel]` and the reference resolves) against the sentence #484 put in `src/components/core/Nav-SegmentedChoice-Base/contracts.yaml` (`accessibility_aria_controls`, behavior, L360-364).
**Owner**: **Lina**
**Class**: P2 obligation (record) · defect *(rule 12. My read: not P0. The sentence understates what the component does (the reference resolves in Chromium where a panel exists), so no consumer is promised more than they get, and Peter's ruling that no tab-to-panel association is provided on web stands. The surviving counter-argument: under the falsity floor (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7) any false served sentence is P0 whichever way it errs, and this contract is served. Stacy may read it as P0; that is her finding to Peter, not an upgrade by her or by me (rule 12). Only Peter downgrades a P0.)*
**Trigger**: `merge:#486` *(the fixing PR; rule 1 and the 2026-10-22 trigger grammar: the event that owes the close. Only the owner writes or changes this line (rule 9).)*
**Consulted**: none needed for a filing; Stacy's floor read of the class is pending.

---

## The defect

The behavior text said the `aria-controls="[id]-panel-[value]"` attribute "is set for tooling only and resolves to no element". In Chromium with a matching panel, the component sets `ariaControlsElements = [panel]`; the attribute then reads as empty, and the reference resolves. Where no such panel is found, or the browser has no `ariaControlsElements`, the attribute is set. The `test_approach` also presented the jsdom test double of the HTML reflection rules as if it were the behaviour.

## The correction (this PR)

Behavior sentence now reads: "The `aria-controls="[id]-panel-[value]"` attribute is set where no such panel is found or the browser has no `ariaControlsElements`; where the element reference is set, the attribute reads as empty." The preceding sentence (no tab-to-panel association is provided on web) is untouched, per Peter's ruling. `test_approach` says the double is a stand-in and records the Chromium observation.

## Second correction (2026-10-25, Lina, at the orchestrator's direction)

The first `validation:` line (L368) carried the same claim as the corrected sentence ("web - the reference resolves to no element; no association is provided"). It now reads: "web - where the element reference is set, the attribute reads empty and the reference resolves; where ariaControlsElements is absent, the attribute is set and no association is provided". Why: the same E6-1 observation falsifies it; the orchestrator widened the brief to cover it. Same PR.

## RULED (Peter, 2026-10-26; chat, relayed by the orchestrator)

The question was: the contract's kept sentence (Peter's ruled text, #484 / E6-2), "on web no tab-to-panel association is provided", sits against the code and `Nav-SegmentedChoice-Base/README.md` L264, which set `ariaControlsElements` to the panel in browsers that support it (E6-1 PASS in Chromium) and provide no association only where the browser lacks it. May the sentence read "on web, no tab-to-panel association is provided where the browser lacks `ariaControlsElements`; where it is supported, the element reference is set", or does the ruled text stand as is?

Peter's words, in chat: "Re: 1, Yes" (item 1 in the orchestrator's list to him was this question). Received between 2026-10-26T00:18:30Z (the commit time of `bbe368e16`, #491's head, Thurgood's push, converted from 2026-10-25T20:18:30-04:00 as read in `git log -1 --format=%cI`) and 2026-10-26T00:21:54Z (clock bounds, per the orchestrator's correction of an earlier wrong estimate). Applied in this PR: the contract's behavior text now reads "On web, no tab-to-panel association is provided where the browser lacks ariaControlsElements; where it is supported, the element reference is set." The README L264 already says this and is unchanged.

## What closes it

This PR's merge; the fixing PR's merge adds rule 5's dated outcome line here and archives the record.

## Lapse (2026-10-27)

*(Appended under README rule 11 and Start Up Tasks item 9, by Lina, the owner, at session start: `./scripts/issues-owned.sh Lina` printed `FIRED@2f724018` for this record at `origin/main` `08b9c7a8e`.)* The Trigger token `merge:#486` fired at #486's squash commit `2f724018e81339214a016ff74aed45191dbf4906`, and no commit that is an ancestor of it closed this record (rule 5's outcome line, or the archive move) or re-ruled it. The record said so itself ("the fixing PR's merge adds rule 5's dated outcome line here"), and I did not add it in #486. This is the record's first lapse. Its class is P2 obligation (record) · defect, so rule 11's escalation to Peter (the second lapse of a P2 `(record)`) is not reached; it is closed in the same commit as this heading. Lina.

## Outcome (2026-10-27)

*(Appended under README rules 5 and 9 by Lina, the owner. The date is `date -u` at the write.)* **Done in #486** (`2f724018`, merged 2026-10-26): read in `src/components/core/Nav-SegmentedChoice-Base/contracts.yaml` at `origin/main` `08b9c7a8e`, `accessibility_aria_controls`: (1) the behavior text reads "On web, no tab-to-panel association is provided where the browser lacks ariaControlsElements; where it is supported, the element reference is set", and "The aria-controls=\"[id]-panel-[value]\" attribute is set where no such panel is found or the browser has no ariaControlsElements; where the element reference is set, the attribute reads as empty" (L360-367); (2) the first `validation:` line reads "web - where the element reference is set, the attribute reads empty and the reference resolves; where ariaControlsElements is absent, the attribute is set and no association is provided" (L371); (3) `test_approach` records the jsdom double as the test's stand-in and the Chromium observation (L374-385); (4) no "resolves to no element" claim remains about the attribute (the only hit, L372, is the no-such-element case and is correct). Peter's ruling "Re: 1, Yes" (2026-10-26) is applied as the third commit's text; README L264 already agreed. **Not closed here, and not mine to close:** Stacy's floor read of the class (the header says it is pending; this record carries no line from her). It does not hold the close, because the fix it would be about has shipped; if she reads the record as P0, that is her finding to Peter, and the record being in `archive/` does not stop it (rule 4 brings it back). This record is archived in this commit. Lina.

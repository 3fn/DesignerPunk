# Issue: trigger (d) has fired — Peter's Stacy-signed sample has read `0 / N` at consecutive walks

**Date**: 2026-10-03
**Status**: ACTIVE (chartered under the trigger; **Peter decides whether it becomes a spec**)
**Owner**: Thurgood (instrument owner, register row `signing-act-consistency`; ballot `2026-10-01-signing-act-chain` § 8 names him as the chartering seat)
**Trigger**: **before the next RELEASE claims pass**, the first under the hermetic-publish law: the 15.0.1 or 15.1.0 publish, or release 3 (Spec 123 U3), whichever comes first. By then Peter has picked an option below, or has recorded "keep as is", so that the next `0 / N` is a decision and not drift.
**Source**:
- ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 5.3 and § 8, trigger (d);
- Stacy's RELEASE 15.0.0 record, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-15.0.0.md` § "Recorded events (not findings)": "Trigger (d) fires … Thurgood charters an issue (owner + named trigger); Peter decides whether it becomes a spec."

---

## The fact

**Ballot § 5.3**: *"For acts Stacy signed, **Peter runs `--audit` and J** (the C1 collapse-seat rule; Stacy will not rule on her own acts). The claims-pass record carries the line `Peter sample (Stacy-signed): <k> / <N>`, and **`0 / N` when empty, never omitted**."*
- **Why Peter**: under C1, Stacy signs every row whose owner is the profile author (Thurgood), as well as her own. She cannot audit herself, so the collapse seat for her acts is Peter's.
- **What the duty is**:
  - one `verify-signing-chain --audit` command over the signing PRs, reading links 4–7 for every Stacy act (minutes; the scan itself is sub-second);
  - J (blind re-judgment) on a sample of her acts, about 15 minutes per blind seat. Planned at about 3 seats.

**The readings**:

| Walk | Reading |
|---|---|
| MIDPOINT (123) | `0 / 297` |
| RELEASE 15.0.0 (phase 1, then restated in phase 2) | `0 / 309` |
| Since #285 (two further Stacy assents on `#trigger-types` and her own unit) | `0 / 311` (reported by the orchestrator; not re-counted by Thurgood) |

**Trigger (d)'s second clause** ("Peter's Stacy-signed sample reads `0 / N` at two consecutive walks") fired at the RELEASE 15.0.0 walk. A later sample does not un-fire it.

## Options (Peter's pick)

- **(1) Peter runs it.** One `--audit` command, plus J on about 3 Stacy-signed acts, before the next RELEASE pass. This is the ballot as written.
  - Cost: about an hour of Peter's time per release.
- **(2) Delegate by recorded rule, never by a verbal grant, to a non-Stacy seat.** The seat must be one that is not the profile author (so not Thurgood): Ada, Lina or Leonardo, rotating.
  - The rule is a ballot amendment to § 5.3, Peter-ratified. The delegate runs `--audit` and J; the line becomes `Delegate sample (Stacy-signed, <seat>): k / N`.
  - Cost: one small ballot, and about 30 minutes of agent seat time per release.
- **(3) Shrink the Stacy-signed population.** Change C1 so that the counterpart seat for profile-author-owned rows is not Stacy alone, for example by rotating it. Stacy then signs only her own rows, and Peter's sample shrinks to those.
  - Cost: a C1 change across Spec 123's tooling (`c1.ts`, the freshness and signing checks, about 300 re-attributed rows). Spec-scale.
- **(1+2) Hybrid.** Delegate the mechanical `--audit` (links 4–7) by recorded rule. Peter keeps J on at least one act per release, recorded separately as `Peter sample (Stacy-signed): k / N`.

## Lean, with the counter-argument folded back

- **Lean: (1+2).**
  - Three readings of `0` show that a duty bound to Peter's seat alone does not run at his current bursty pace. That is RS-7's class: a guard bound to a seat that does not perform the step.
  - The `--audit` half is mechanical, so a delegate loses nothing on it.
  - J is the half where an independent human matters most, so Peter keeps a minimal, fixed slice of it.
- **Counter-argument applied**: delegation turns part of a human check on Stacy into an agent check on Stacy. Under "consistency, not identity", agents checking agents is exactly what the chain cannot certify.
  - Folded in: Peter keeps J, and the delegate's line is recorded separately, so the two readings never merge into one number.
- **What survives**: if Peter's one-act J also reads `0` at the next RELEASE, the hybrid has failed the same way the original did. The honest next step is then (3), the population change, as a spec, and not a further delegation.
- **Fork, surfaced and not picked**: whether J by a delegate counts toward § 5.3 at all, or is recorded only as supplementary evidence. That is Peter's call.

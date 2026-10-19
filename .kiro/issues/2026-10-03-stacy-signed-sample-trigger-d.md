# Issue: trigger (d) has fired — Peter's Stacy-signed sample has read `0 / N` at consecutive walks

**Date**: 2026-10-03
**Status**: ACTIVE (chartered under the trigger; **Peter decides whether it becomes a spec**) *(2026-10-19, Thurgood: S5 ratified and applied by PR `chore/ballot-sitting-2-application`; closes after the instrument PR, § "S5 applied (2026-10-19)".)*
**Owner**: Thurgood (instrument owner, register row `signing-act-consistency`; ballot `2026-10-01-signing-act-chain` § 8 names him as the chartering seat)
**Trigger**: `manual` — the `verify-signing-chain --audit --signer <seat>` / `--exclude-signer <seat>` instrument PR merges (Stacy-specified fixtures; signing ballot § 4.5). *(Re-ruled 2026-10-19, Thurgood: S5 is ratified (Peter, 2026-10-19, § 8) and its § 5.3 amendment applied in PR `chore/ballot-sitting-2-application`; the sitting ballot's § 6 says this record "closes after the instrument PR", so the close moves there. Authority: the owner's Trigger-line right (README rule 9) and ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` (RATIFIED, Peter 2026-10-18/19). The superseded 2026-10-18 Trigger line, verbatim, is the next line.)*
**Superseded trigger (re-ruled 2026-10-19; verbatim)**: `manual` — the capped sitting's ballot (sitting item S5, the § 5.3 amendment, a rider) merges, or Peter records in this file that the hybrid is withdrawn in favor of "keep as is"; written as `merge:#<N>` once the ballot PR is known. *(Re-ruled 2026-10-18, Thurgood: the old event fired at the 15.1.0 RELEASE pass (the pick was not recorded in the issue, rulings row 18 says "lapsed before 15.1.0's pass") and again at 16.0.0's. Authority: the owner's Trigger-line right (README rule 9), re-ruled under rule 11 in a diff carrying this dated reason, and Peter's routing of 2026-10-18 ("Go on the W-1 records PR and the capped sitting", relayed in the orchestrator's brief; the PR body cites it). The superseded trigger, verbatim:)* **before the next RELEASE claims pass**, the first under the hermetic-publish law: the 15.0.1 or 15.1.0 publish, or release 3 (Spec 123 U3), whichever comes first. By then Peter has picked an option below, or has recorded "keep as is", so that the next `0 / N` is a decision and not drift.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-18, Thurgood, rule 12. The § 5.3 duty is bound to Peter's seat and has read `0 / N` at three consecutive walks (MIDPOINT, RELEASE 15.0.0, RELEASE 15.1.0) and `0 / 0` at 16.0.0, so the guard on Stacy-signed acts is weaker than the ballot's claim; the owed act is the recorded pick and the § 5.3 amendment.)*
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

## Pick recorded, and a conflict in the record (2026-10-18)

*Signed: Thurgood (owner). Nothing above is rewritten. The health check of 2026-10-17 (W-2 list, `.kiro/docs/civitas-health-checks/2026-10-17.md` L83) found that this file "still lacks the pick"; this section supplies what the record holds and names what it does not settle.*

- **The pick Peter ruled (PR-10, the hybrid, option 1+2)**: `.kiro/specs/123-consumer-distribution/tasks.md` L215 — "**Trigger (d)** (`.kiro/issues/2026-10-03-stacy-signed-sample-trigger-d.md`): **PR-10 RULED, the hybrid (option 1+2)**. Peter: "Re: walkthrough 2, hybrid"." Also `feedback/tasks.md` L1126: its vehicle, "the issue record plus a § 5.3 ballot amendment", was named and left outside that amendment. Under the hybrid a delegate non-Stacy seat runs the mechanical `--audit`, and Peter keeps J on at least one Stacy act per release, recorded separately (`claims-pass-release-15.1.0.md` L357).
- **The conflict**: the release-4 rulings record, row 18 (`.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md` L30), reads for "Trigger (d) (lapsed before 15.1.0's pass)": "**Keep as is** (the orchestrator's pick, recorded as such; Peter did not object)". 16.0.0's claims pass reads it as the operative state ("keep as is", `claims-pass-release-16.0.0.md` L189, L364). The 2026-10-17 health check records the pick as "ruled (PR-10 hybrid) and carried by ruling at 16.0.0 (row 18)", which conflates the two: **row 18 is not a restatement of PR-10; it is a different disposition, and its authority is the orchestrator's pick plus Peter's non-objection**, under his blanket line at the top of that record ("I align with the class options and all recommendations otherwise if the other agents are in agreement"). Both are Peter-attributed; they point opposite ways (a delegate runs `--audit` and Peter keeps J, versus no change to § 5.3).
- **I do not choose between them here.** The reading that reconciles them is that row 18 decided what to do at 16.0.0 (no recorded rule exists yet, so run nothing new) and PR-10 still names the destination; if that is right, the capped sitting's amendment is the hybrid's vehicle. If row 18 withdrew the hybrid, the sitting records "keep as is" and the trigger-(d) record closes without a § 5.3 amendment. Peter's word decides.
- **Routed to the capped sitting of 2026-10-18, item S5, a rider**: Thurgood drafts the § 5.3 amendment for the hybrid (delegate line `Delegate sample (Stacy-signed, <seat>): k / N`, Peter's `Peter sample (Stacy-signed): k / N` kept separate; the sub-fork of whether a delegate's J counts toward § 5.3 at all is carried from § "Lean"), with an `**Open for Peter**:` line putting the PR-10 versus row-18 question to him; the PR is not merged until his answer is on the record, dated before the merge. Edit kind per ballot 2026-10-18-governance-edit-kinds.
- **Closes** when the amendment merges (hybrid) or Peter's recorded answer closes it as "keep as is", by rule 5's dated outcome line and the archive move.

## Lapse (2026-10-18)

*Signed: Thurgood (owner), observed under README rule 11 as applied in #408.*

- **Fired events**: the old trigger, the next RELEASE claims pass, fired at the 15.1.0 pass, #348, `1caddd21d2bb26b25ef5016a1c46b8303714e292` (2026-10-13), and again at the 16.0.0 pass, #382, `308a588f3de39ff1a85d1498ca00989738f2e3b6` (2026-10-16); rulings row 18 already calls it "lapsed before 15.1.0's pass". No commit that is an ancestor of the event's commit closed this record (rule 5's dated outcome line, or the archive move) or re-ruled it (its Trigger line changed in a diff carrying a dated reason and authority). The record stayed open across both.
- **Consequence (rule 11)**: first lapse of a P2 (guard) → escalation to Peter: spec / drop / fix-now. The sitting-2 ballot's § 5.3 rider (item S5) is the proposed fix-now vehicle, so Peter's go on the sitting answers it; answered 2026-10-19: Q1 ruled; S5 is the vehicle.

## Ruling (2026-10-19) — the hybrid stands

*Signed: Thurgood (owner), recording Peter's answer given in chat on #414, 2026-10-19: Q1 = "hybrid" (his words: "Re: 1, decision 1, hybrid"). The record of the answer is this line and the PR's held `**Open for Peter**:` line marked answered; the orchestrator relayed it.*

- **The hybrid (PR-10, option 1+2) stands as the destination.** Rulings row 18 ("Keep as is", `release-4-rulings-2026-10-15.md` L30) governed **16.0.0 only** (Stacy's scope-line reading); it is not a withdrawal of PR-10. Its owed note, "Thurgood · note at the next ballot touch", is **discharged by this line**.
- **The hybrid's rules return to sitting 2 as item S5 (R3)** after the three-seat consult now running: Ada and Lina have answered (a new duty needing a charter line and their signature; fine with the rotation; the first delegate walk covers the 314-act backlog); Leonardo is pending. The Trigger stays `manual` (S5 merges).

## S5 applied (2026-10-19)

*Signed: Thurgood (owner). Nothing above is rewritten.*

- **Ruled**: ballot `.kiro/docs/ballots/2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form.md` S5, **ratified as redrafted at R4** (Peter, 2026-10-19, § 8): F-S5-Q1 the hybrid; F-S5-walks one; F-S5-J (i), J is Peter's alone; F-S5-triage (b), a `FAIL` or `anomaly` on a Stacy-signed act goes straight to Peter, Thurgood annotates and never filters, and a recorded slip never removes an act from J; F-S5-record in place, pointer only; F-S5-seats three (Ada, Lina, Leonardo).
- **Applied by PR `chore/ballot-sitting-2-application`** (Thurgood): the signing ballot §§ 5.1, 5.3, 5.4 and 8 (d) rewritten in place, each with a dated pointer to the prior text at `3b84122c9`; the register comments and a history line on `signing-act-consistency`; the "Delegate signing audit" bullet in Ada's, Lina's and Leonardo's charters (each seat re-confirms and re-signs its own `#in-scope`); Stacy's delegate-audit pointer in her claims-pass record section, her text (her re-confirm and re-sign).
- **Trigger (d) does not un-fire.** It fired at the walks this record lists, and this application changes the rule it reads from, not the fact that it fired.
- **Closes after the instrument PR** (`--signer` / `--exclude-signer` on `--audit`), by rule 5's dated outcome line and the archive move. The interim bullet in § 5.3 governs until it merges. **The first delegate walk** (Ada) is at the next MIDPOINT, CLOSEOUT or RELEASE, covers the backlog from #262's population inclusive, and is briefed by Thurgood; #285's `FAIL 7` goes to Peter by name in that walk's PR.

- 2026-10-19 (Thurgood): trigger fired at #413 (`3b84122c9`, the sitting's ratification); read as re-ruled by the ratification it carried, which named this record's fix vehicle, so no lapse under rule 11; token re-keyed to the `--signer` / `--exclude-signer` instrument PR (Trigger line above). *(The coordinator's reading, recorded as such; reversible if Peter reads it otherwise.)*

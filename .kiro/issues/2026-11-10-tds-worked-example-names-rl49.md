# Test-Development-Standards names tests, functions and a class that do not exist (RL-49): waived for 16.3.0, fix owed by the next S

**Date**: 2026-11-10
**Owner**: Thurgood (the doc's owner; the fix is his, by Peter's waiver below)
**Class**: P0 false-claim · defect *(set 2026-11-10, Thurgood, owner, rule 12, on the orchestrator's relay of the consult. The doc is packed in the tarball and embedded in the Stacy and Thurgood charters, so a reader meets the false names as instruction. The walk record's definition has no carve-out for worked examples, and my walk-time "worked examples" reading is withdrawn. A P0 escalates at its first lapse, rule 11.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S: the fixing PR merged, with this record's rule 5 outcome line. Re-tokened to `merge:#<N>` once the fixing PR opens (rule 1: the event, not the vehicle). If it is still open at the next walk, it returns to Peter.
**Source**: Stacy's RELEASE 16.3.0 phase-1 finding RL-49 (`.kiro/issues/2026-11-10-release-16.3.0-phase-1-findings.md`, draft PR #857, branch `records/16.3.0-phase-1-stacy`); the walk record's floor-class conditional (`.kiro/issues/2026-11-09-release-16.3.0-walk.md` L71).
**Consulted**: Stacy (finding and conditions) and a separate Thurgood consult, in the 2026-11-10 joint position recorded in the waiver record below. Lina is consulted on the component API names at the fix (Scope).

---

## The defect

At S `6f507c039`, `governance/Test-Development-Standards.md` L87–L88 and L1045–L1047 name `Icon.test.ts`, `Icon.accessibility.test.ts`, `createIcon()` and an `Icon` class. None exists. What exists is `src/components/core/Icon-Base/__tests__/IconBase.test.ts`, `createIconBase` and `IconBaseElement`. The doc is packed, and the section is embedded in two charters.

## The waiver (floor-class, Peter's alone: RELEASE-FLOW 3a)

**Peter, received 2026-11-10T01:59:34Z**: "Yes, I waive RL-49 as stated". The question put to him: "RL-49: do you waive `Test-Development-Standards.md` L87–88 and L1045–1047 for 16.3.0, fixed after the tag under a record owned by Thurgood, due by the next release's S, with the 26 code-example calls in the same fix? Yes, or No (fix before the tag)." His record: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-10-peter-waives-rl49-16-3-0.md` (branch `chore/ruling-rl49-waiver` @ `9bf9dec5b`).

The waiver is for release 16.3.0 only. Tag v16.3.0 may be pushed at S with these lines as they are. 16.3.0 consumers keep the stale names until the next release. Floor status stays on the row until the fix merges.

## Scope of the fix

- `governance/Test-Development-Standards.md` L87–L88 and L1045–L1047.
- The 26 `createIcon(` / `createButtonCTA(` calls in the doc's code fences (Stacy's count; `git grep -n -E 'createIcon\(|createButtonCTA\(' governance/Test-Development-Standards.md` at S prints 28 lines, which include prose lines), each made real (`createIconBase` / `IconBaseElement`) or marked generic, as the owner decides.
- Regenerating the two charters that embed the section (Stacy's and Thurgood's), with the seats' re-confirms. Authoring never moves `canonicalHash`; the confirmer's act does.
- Lina is consulted on the component API names.
- Edit kind `CORRECTION` (`**Edit kind**: <path> — CORRECTION (<this record>; truth: the Icon-Base files named above)`), with the sweep line in the PR body (`.kiro/docs/ballots/README.md` § "A CORRECTION's sweep"): the class is "names of tests, functions and classes in worked examples that do not exist", over `governance/**` and the charters, every left hit filed under rule 10.

## The process miss, and the class option

- **The miss**: the walk record made these lines a floor-class row if the release PR left them, and #852 left them. A written conditional reached phase 1 as a held tag, not as a row with a state. The author (me) read the lines as worked examples and did not run the definition against them.
- **The surviving counter, as stated to Peter**: the walk's own written conditional is waived here, which weakens the next one.
- **The class option** (it goes to the Spec 131 inbound): a required `**Open for Peter**:` line on the release PR for each item a sweep leaves under a walk conditional; and Stacy's S-3 addition: the conditional is written as a walk row with a state, which phase 1 resolves.

## Close

The fixing PR adds rule 5's dated outcome line here, naming the merge, and moves this file to `archive/`.

*Filed: Thurgood, 2026-11-10, as owner.*

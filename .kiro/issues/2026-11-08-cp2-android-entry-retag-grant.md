# Issue: CP-2's Android entry is tagged to the charter, and Req 1.5 says the repair record; the grant

**Date**: 2026-11-08
**Owner**: Lina
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` is closed or re-ruled (it is archived or carries a `## Outcome`). The retag must merge before that, by Peter's ruling of 2026-11-08T16:53:31Z (the charter record stays open until this retag merges). The close is this record's rule 5 outcome line, giving the fixing PR's number and the one-cell diff.
**Source**: Spec 129 CLOSEOUT claims pass, finding CP-2 (`completion/claims-pass.md`, PR #791); Requirement 1.5 ("The component-tier entries 129 does not close SHALL be tagged to one record that Lina files"); Peter's rulings of 2026-11-08T16:53:31Z and 2026-11-08T17:02:40Z ("Re: 2, Yes, please"), recorded in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-cracks-ballot-and-routing.md` on `origin/chore/ruling-cracks-ballot-and-routing`.
**Consulted**: Thurgood (the harness lists); Data (the Android lane).

---

## What was read

`harness/expected/harness-android-components.tsv` L11 at `origin/main`:
`pkg:src/components/core/Button-Icon/platforms/android/ButtonIcon.android.kt | Unresolved reference 'ButtonIconTokens'.` count 3, tag `2026-10-02-consumer-generation-completeness-spec.md`.

`harness/expected/**` has no standing owner (Lina's, Data's and Thurgood's charters each say it is not theirs), so the retag needs this grant.

## Whose matter the entry is

**The repair record's, with the cause still open.** The name is not a component-side misspelling: `ButtonIcon.android.kt` L89-L99 uses `ButtonIconTokens.insetSmall/Medium/Large`, and the token index (`token-index/components.yaml`, `buttonicon.inset.*`) names the same `ButtonIconTokens.*` for Android. So the component agrees with the name contract. The routing table of `2026-11-07-native-component-repair-from-first-harness-run.md` tagged this entry and its iOS and Android siblings to the charter's item (ii) ("clearing at U8; per Ada"). The siblings cleared; this one did not. What survives is a residual that is no longer "the component tier has not reached generate", and Req 1.5 then has it tagged to the repair record. I have not diagnosed why it survives. That is a read of the harness's Android composition (does the generated output include `ButtonIconTokens` for this compile?), and I make it under the repair record, with Data verifying. If the diagnosis lands on the generator or the name contract, I hand it to Ada and re-tag then, by a further grant.

## Grant paths

`harness/expected/harness-android-components.tsv`, only L11's tag column: `2026-10-02-consumer-generation-completeness-spec.md` becomes `2026-11-07-native-component-repair-from-first-harness-run.md`. No other cell or line changes. The entry count stays 94.

## The fixing PR

The PR also adds the charter record's closing outcome line, written by its owners Ada and me. The PR body carries `**Consulted**:` for Thurgood and Data.

## Acceptance

1. The diff of the granted file is one line, one cell.
2. `harness/expected/harness-android-components.tsv` still has 94 entries.
3. The harness's expected-list format check passes.

Counter-argument and what survives: the entry may be the generator's, not the component's (the index and the component agree, so the fault may be in what `generate` emits). Retagging now satisfies Req 1.5's SHALL and keeps the tag on an open record, but it names the wrong owner if Ada's diagnosis wins. What survives: the tag records where the entry is tracked, not what caused it, and the repair record must carry a dated diagnosis line before Spec 132 receives it.

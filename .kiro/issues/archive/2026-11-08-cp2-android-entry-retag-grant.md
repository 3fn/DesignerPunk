# Issue: CP-2's Android entry is tagged to the charter, and Req 1.5 says the repair record; the grant

**Date**: 2026-11-08
**Owner**: Lina
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` is closed or re-ruled; the entry must be dealt with before then (Peter, 2026-11-08T16:53:31Z). The close is this record's rule 5 outcome line with the fixing PR number.
**Source**: Spec 129 CLOSEOUT claims pass, finding CP-2 (`completion/claims-pass.md`, PR #791); Requirement 1.5 ("The component-tier entries 129 does not close SHALL be tagged to one record that Lina files"); Peter's rulings of 2026-11-08T16:53:31Z and 2026-11-08T17:02:40Z ("Re: 2, Yes, please"), recorded in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-cracks-ballot-and-routing.md` on `origin/chore/ruling-cracks-ballot-and-routing`.
**Consulted**: Thurgood (the harness lists); Data (the Android lane).

---

## What was read

`harness/expected/harness-android-components.tsv` L11 at `origin/main`:
`pkg:src/components/core/Button-Icon/platforms/android/ButtonIcon.android.kt | Unresolved reference 'ButtonIconTokens'.` count 3, tag `2026-10-02-consumer-generation-completeness-spec.md`.

`harness/expected/**` has no standing owner (Lina's, Data's and Thurgood's charters each say it is not theirs), so the retag needs this grant.

## Revision (2026-11-08, Lina): fix, not retag

Data diagnosed the entry from native-harness run 42502210216: `ComponentTokens.android.kt` emits `object ButtonIconTokens` in `com.designerpunk.tokens` (L10, L41), but `ButtonIcon.android.kt` (package `com.designerpunk.components.core`) imports only `DesignTokens`, `DesignerPunkTheme` and `LocalDPTheme` from it, so L98-L100 cannot resolve. Generation is fine; this is the repair record's class (b). Avatar cleared at #757 by the same import. D2 does not check imports.

**Fix** (my charter scope, `src/components/**`): add `import com.designerpunk.tokens.ButtonIconTokens` to `ButtonIcon.android.kt`.

**Grant paths**: `harness/expected/harness-android-components.tsv`, only the removal of L11 (the `ButtonIcon.android.kt` `Unresolved reference 'ButtonIconTokens'.` entry). The entry count goes 94 to 93; no entry is added or changed.

**Badge-Label-Base is not included.** Its `private object BadgeLabelBaseTokens` shadows the generated object, but dropping it is not equally small: the local object also carries `cornerRadius` and other locals, and the generated `maxWidth` is already `120.dp`, while L287 applies `.dp` again. That is a multi-line repair with a unit change; its entry stays tagged to the repair record.

**Acceptance**: `harness-android-components` is green at the fixing PR's head with 93 entries and no new entries. I could not run the harness locally; the removal stands only if that run is green, else the entry returns.

**Consulted**: Data (diagnosis, Android lane); Thurgood (harness lists). The fixing PR also adds the charter record's closing outcome line (Ada and Lina).

---

## Outcome

**Closed 2026-11-08 (Lina, owner; rule 5).** The fixing PR is #797 (`chore/129-cp2-retag-grant`). Its diff to the granted file is one line: L11, the `ButtonIcon.android.kt` `Unresolved reference 'ButtonIconTokens'.` entry, removed (94 to 93 entries), alongside the component fix in `src/components/**` (`import com.designerpunk.tokens.ButtonIconTokens`). Whether the removal holds is decided by that PR's `harness-android-components` run. The grant expires with this close. Archived under rule 5.

# Apply ballot 2026-10-26-governance-examples-guard-adoption: the one application PR (sites 1 to 7)

**Date**: 2026-10-26
**Owner**: Thurgood (authoring the application PR; the instrument's owner, register row `governance-examples`). Lina commits site 1d and Stacy her re-confirmations, first signature and site 7 in the same PR (ballot § 4.2 steps 2 and 3). Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, in the Status commit of the ballot's PR (#525), because Peter's condition of 2026-10-26 ("any that have deferred or follow-up work require a plan to be addressed") makes the plan a record and not a sentence in a PR body.
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-26, Thurgood, rule 12. Until the application merges, `pending.json` is in no seat's scope and no ARMING read fires on `scripts/governance-examples/**`: the guard is weaker than the claim that the instrument paths are watched. The sub-tag is `(guard)` for that window.)*
**Trigger**: `merge:#536` — the application PR (branch `chore/apply-governance-examples-guard-adoption`) owes the close. *(Re-ruled 2026-10-29, Thurgood, owner, rule 1: the application PR is open as #536, as the old line directed. Was: `release:next:phase-1` — the event that owes the close is the next release's S: the application PR is merged by then. **Start condition (prose)**: the PR opens on the later of two merges, both required: #525 (the ballot's RATIFIED Status) and #519 (the build PR; the sites read `pending.json`, the row and the grant record, which are on `main` only after it). When the application PR opens, this line is re-ruled to `merge:#<N>` with a dated reason (rule 1).)*
**Source**: `.kiro/docs/ballots/2026-10-26-governance-examples-guard-adoption.md`, **RATIFIED (Peter, 2026-10-26)**, F-1 (a). Its § 3 gives every edit site byte for byte, its § 4.2 the order and the checks, and its § 9 the plan this record carries.

---

## What is owed

One application PR, Peter-merged, merging alone because it touches the lock (ballot § 4.2): sites 1 to 7, with the dragged site 1d, from the ballot's § 3 as resolved in its § 9.

- **Sites**: 1a, 1b, 1c under (a), 2, 2b (`canonical/agents/stacy.md`); 3 (`canonical/agents/thurgood.md` `writeScope`); 4 (register row, `education` and `history` only); 5 (six-roots Errata ledger line); 6 (the build grant record's dated line, at its archive path); 7 (Stacy's Trigger-token edit); 1d (Lina's byte-identical `semguard.md` copy).
- **The baseline it relies on**: none adopted here. It is #519's: the `pending.json` header at #519's merge, `adopted: bdbe72a32 2026-10-26; entries: 69 (token-name 56, declared-path 9, shape 2, import 2)` as that PR carries it. The application PR cites the header it finds on `main`.
- **Checks**: `npm test`, `npm run test:scripts`, `check:section-citations`, `check:122:diff-guard` (no-op-green after the lock refresh), `verify-signing-chain`, the straggler sweep and the volatile-fact hand check (ballot § 4.2 steps 4, 5 and 8).

## Fallback

If the PR has not opened at the next release's phase 1, this record lapses there (rule 11): a P2 `(guard)` record's first lapse goes to Peter with exactly spec, drop or fix-now. Until it merges, the interim of ballot § 4.2 step 7 stands.

## Close

Closed at the application PR's merge by a dated outcome line here, and archived (rule 5), in that PR.

*Signed: Thurgood, 2026-10-26.*

## Lapse (2026-10-29)

Firing commit `639ef70f6` (#536, merged 2026-10-29T01:47:07Z): the record's own Trigger, `merge:#536`. No ancestor of `639ef70f6` closed this record. #536 re-ruled the Trigger to `merge:#536` in `dc16932d1`, but it carried no outcome line, though this record's § "Close" and rule 11 ("A fixing PR closes its record by adding rule 5's outcome line in the same PR") both put the close in that PR. So under rule 11's letter the firing is a lapse: this record's first, one distinct SHA.
- **The cause is my miss, not the rule.** I re-ruled the Trigger to the PR's own number inside that PR without adding the close in the same PR. The O-23 grant (#530) shows the right shape: its outcome line rode the fixing PR, written before the merge.
- **Escalation (rule 11: a P2 `(guard)` escalates at its first lapse)**: the record goes to Peter with exactly three options, **spec**, **drop** or **fix-now**. I do not pick among them. The obligation itself was discharged by the firing commit, and the outcome below records it.
- This is not the standing-record form named in `.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md`. This record is a one-shot owed-act, and its close was simply late.

*Signed: Thurgood, 2026-10-29.*

## Outcome

**Outcome (2026-10-29, Thurgood, rule 5)**: done in #536, squash `639ef70f6`. The ballot's sites 1 to 7 and Lina's dragged site 1d are applied.
- **My authoring commits**: `6a29412fe` (sites 1a/1b/1c under F-1 (a), 2 and 2b), `e870cf84d` (3), `c1fd0e06e` (operative-set, overlay and disposition follow-through), `ad9d4053c` (site 3's disposition row, unsigned), `9e084afb6` (4), `f8dda7539` (5), `dc346fb19` (6, which names #536 since `dc16932d1`).
- **Lina**: `848594a81` (1d).
- **Stacy's acts**:
  - `d069e7dbd`: re-confirm `#the-trigger-set-the-114-superset-table-names-never-numbers`.
  - `82faa95b1`: re-confirm `#the-claims-pass-record-claims-passmd-the-template`.
  - `c39cb18f2` and `6afc2c053`: the two re-signs.
  - `4f9ed1fee`: first signature, `writeScope[scripts/governance-examples/**]`.
  - `9c5c0dfb7`: site 7.
- **The one FAIL Peter let stand**: link 7's `FAIL 7` on `82faa95b1`, recorded in Stacy's dated line `d94305288` on `.kiro/issues/2026-10-26-signing-chain-audit-false-verdicts.md`.
- **Regeneration and lock**: regeneration `35d04844a`. The lock at the squash reads `inputClosure` `856f263e…e3eb` and `outputs` `93a08c13…2cc3`; `outputs` moved from main's `07422646…1586` with the seat renderings.
- **The two #519 reads, Stacy's**: the registry-path ARMING read `8f5d4e432` on `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md`, and the new-barrier ARMING read `074f892f1`.
- **Checks at the PR head**: `verify-signing-chain --ci` PASS (5 rows across 5 signing commits), `check:122:diff-guard` `no-op-green`, `check:section-citations` PASS. The full-suite counts are in the ballot's § 8 ledger line of 2026-10-29.
- **Moved to `archive/` in the closing PR** (branch `chore/close-adoption-application-record`).


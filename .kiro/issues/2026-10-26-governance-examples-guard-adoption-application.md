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

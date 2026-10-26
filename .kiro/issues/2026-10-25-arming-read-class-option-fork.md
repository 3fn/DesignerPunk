# The instrument-path ARMING limb has no detector: the class option (a)/(b), unpicked

**Date**: 2026-10-25
**Status**: ACTIVE — owed. The fork is Peter's; both options are LAW or owner tooling, so nothing here is applied by its owner.
**Owner**: Stacy. The limb is hers: her charter's ARMING row, instrument-path limb (ballot `.kiro/docs/ballots/2026-10-17-standing-write-scope-six-roots.md` § 3 item 4, applied by #397, `096e11f99`). The text of (a) and (b) below is Thurgood's seat or the register's to edit, once Peter picks. **Split from** `.kiro/issues/2026-10-24-instrument-path-arming-reads-missed.md` § 4 on 2026-10-25 (Stacy, owner, rules 9 and 10), so that the eight owed reads could close on their own event.
**Trigger**: `release:next:phase-1` — Peter's pick between (a), (b) or drop, and the PR that applies it (the edit is LAW under (a) and (b) alike), before the next release's RELEASE phase 1. At that walk this record is closed by a dated outcome line naming the PR, or carried with the fork still open for Peter (rule 1: a P2 that would ride a later change takes this token). *Why this token and not `manual`:* `manual` is a P3's, and this is not a P3 (see Class). A `manual` record never lapses, and this limb already failed seven times without anything noticing.
**Class**: P2 obligation (guard) · charter *(set 2026-10-25, Stacy, owner, rule 12. The limb is the only reader of a weakened checker that leaves the required-check set unchanged (my charter, ARMING row). With no detector it fires on nothing: it depends on my reading the merge list, and it missed seven merges. That is a guard weaker than its claim, so `(guard)`, not `(record)`. Not P3: the alternative reading is that, with the eight reads done, the miss is cured and the detector is an improvement; I reject it, because the cure is a one-off backfill and the cause (§ 2 of the source record) is untouched. The cost of being wrong is rule 11's: at the first lapse it goes to Peter with spec / drop / fix-now, and that is the pick this record exists to put.)*
**Source**: `.kiro/issues/2026-10-24-instrument-path-arming-reads-missed.md` §§ 2 and 4 (the miss, its class, the two options), and § 5 (the eight reads, 2026-10-25). The finding behind it: Stacy's cross-check in `.kiro/specs/131-governance-simplification/evidence/2026-10-24-ballot-audit.md`, row `2026-10-17-standing-write-scope-six-roots`.
**Consulted**: none needed — this records a fork on a seat of my own; the options are Thurgood's and Peter's to take up.

---

## Why the limb has no detector (from the source record, § 2)

Nothing fires this limb. Its sibling, the registry-path limb, has a standing record with a `path:` Trigger, so `scripts/issues-owned.sh` prints `FIRED@<sha>` at my session start. This limb has no record and no token: its paths are about 19 globs, and rule 1's `path:` token takes one glob. No LIVENESS item asks for it either.

## The class option (surfaced, not picked) — verbatim from the source record's § 4

Two options would give this limb a detector. Both add a reader obligation or change tooling, so both are LAW or owner tooling, not mine to apply:
- **(a) A standing home plus a multi-path token.** This record becomes the standing home for the limb's reads, like the registry record. Rule 1's grammar, or `scripts/issues-owned.sh`, learns a token that names a path list, for example a register row's instrument list. *Cost*: a rule 1 edit (LAW) and a tooling change by its owner (Thurgood).
- **(b) A LIVENESS query.** Thurgood's LIVENESS gains an item that lists instrument-path merges in the window that have no appended read here, and prints `OWED` for each, as his item 4 does for grant activation reads. *Cost*: one charter row in Thurgood's seat (LAW), and minutes per walk.

*Counter-argument*: both add a mechanism to a governance system that Spec 131 is trying to shrink. *What survives*: without one of them, this limb depends on my memory, and it has already failed seven times. The next RELEASE pass catches it only after the delta has grown.

*Context added at the split (2026-10-25, Stacy):* "this record" in (a) meant the source record, which closes at this walk's merge with its eight reads in its § 5. Under (a) the standing home would be **this** record, and later reads would be appended here. Under (b) no standing home is needed; the LIVENESS item lists the unread merges. A third option, **drop** (the limb stays as written and depends on my reading the merge list at each RELEASE, the named backstop), is Peter's to take; its cost is the surviving counter-argument above, now evidenced seven times. Who edits what: under (a) rule 1's text is LAW (Peter) and `scripts/issues-owned.sh` is Thurgood's; under (b) Thurgood's charter row is LAW (Peter). My own edit in either case is none: I read what the detector prints.

## Lapse (2026-10-26)

Firing commit `38f4ece47` (#505, the squash tagged `v16.1.0`: release 16.1.0's S, RELEASE-FLOW step 5). Signed Stacy (owner, rule 11; observed by my RELEASE phase-1 claims pass, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` § "What lapses at S", and reported there and in each later section of that record; appended now).

- **The firing event**: this record's Trigger, `release:next:phase-1`, resolved to release 16.1.0 when it was set. Phase 1 first read it at #494's squash and re-read it at each later S. S moved to `38f4ece47`, the commit that was tagged and published, so that is the one firing commit named here. The record was added by the walk commit itself (`264c25661`, #469, row 27, "carried — fork line A"), which is an ancestor of the walk's merge, so rule 11's post-walk carry does not apply.
- **What lapsed**: the close this Trigger names. Neither Peter's pick between (a), (b) or drop, nor a PR that applies it, is in any ancestor of `38f4ece47`. The record is unchanged since the walk. Line A has been open for Peter since #469. Peter's 2026-10-25 words ("Fix all of them as the owners recommend") do not reach it: this record surfaces its options and recommends none.
- **What the limb saw in the window**: nothing to miss. `git log --first-parent 264c25661..0218632d1` over the instrument paths (ballot `2026-10-17-standing-write-scope-six-roots` § 4 B, `scripts/check-completion-criteria-parity.ts`, `scripts/completion-claims/**` and the three steward-verb tool files) lists no commit. The gap is unchanged: the limb still has no detector, and its next miss would again be found only at a RELEASE.
- **Count**: first lapse (one distinct SHA). Class **P2 obligation (guard)**: **a first lapse escalates** (rule 11). The record goes to Peter with exactly three options:
  - **spec**: a spec whose design outline names this record. Carried out at that outline's merge; until then each later lapse returns it to Peter with his answer quoted.
  - **drop**: the limb stays as written in my charter and depends on my reading the merge list at each RELEASE, the named backstop. Its cost is this record's surviving counter-argument (seven misses before the backfill).
  - **fix-now**: a git-visible trigger no later than the next release's S. The fix is option (a) or option (b) above, both LAW, and the pick between them is his as well. The current token, `release:next:phase-1`, already meets the deadline.
- **My line: report, escalate, and carry. No re-rule, no close.** The token stays `release:next:phase-1`, and now resolves to the release after 16.1.0. I do not pick among the three options; the record never recommended (a) or (b), and I do not start now. Whatever he answers is recorded here by a dated line, with his words.

*Signed: Stacy, 2026-10-26.*

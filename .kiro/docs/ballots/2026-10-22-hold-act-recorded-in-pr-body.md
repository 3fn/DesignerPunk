# Ballot Measure: a hold is recorded in the PR body's acts list, never as a sheet edit (signing-act ballot § 2, the hold form)

**Date**: 2026-10-22
**Drafted by**: Thurgood (Civitas steward; author of ballot `2026-10-01-signing-act-chain` and owner of `verify-signing-chain`; owner of `.kiro/issues/2026-10-03-hermetic-publish-path-follow-ups.md`, whose item 4 this measure fixes).
**Authority to draft**: Peter, chat, 2026-10-22, verbatim: **"Fix now."** (relayed by the orchestrator). He ruled item 2 of the orchestrator's list, the rule-11 escalation of hermetic item 4 at its second lapse, which offered exactly three options: spec, drop or fix-now. The fix-now shape is this seat's sizing the same morning, shape (a), text only.
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Required reviewer**: **Stacy** (R1). She reads clause 6 (iv)'s acts list at every claims pass, she is the census reader, and the holds at #284 were a Stacy seat's.
**Class**: LAW — an amendment to a ratified ballot's standing rule (§ 2 of `2026-10-01-signing-act-chain`), one sentence. It is the owed fix of a P2 obligation (record) · defect (hermetic item 4), not a new obligation.
**Amends**: `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 2 clause 6 (one sentence, plus its dated pointer and an Errata-section ledger line). `governance/classification-map.md` row `signing-act-consistency` (one history line; rule line, `checks` and `check_state` unchanged).
**Census**: not in scope — `verify-signing-chain` (`--ci` and `--audit`) and the C16 `operative-set-freshness` sweep — rule text, no instrument change. The edit site is the law `signing-act-consistency` cites, so the item is presumptively in scope, which is why this line takes the "not in scope" form rather than the bare "none". A hold, as this rule records it, writes nothing either instrument reads. It adds no commit, no sheet section and no signature field. No input's verdict or surface can change, and link 1 and F5 are untouched (§ 2).
**Cap**: one sentence. **Retroactivity**: none. The rule binds holds made after its application merge, and #284's holds stay on record at `refs/pull/284/head` as they are.

> **Conflict of interest, stated first.** I wrote the ballot whose gap this is, I own the instrument that misreads a hold, I own the record that lapsed, and I authored both amendments it lapsed at. Stacy's review and Peter's ruling are the checks.

---

## 1. The defect, and its lapses

**The gap** (hermetic record § 4, 2026-10-03): a seat's correct "hold until X" has no recorded act form.
- A C16 confirmation has no refuse counterpart.
- On a signature, a refuse at unchanged hashes turns the later assent into an F5 (`--ci`: "a re-sign with `canonicalHash`/`renderedHash` unchanged → fail").
- So the instrument reads a correct hold as an F5 sheet-only edit. Instance: #284, `b87a26ca` and `94ab3909`. #284 was closed and re-cut.

**The interim rule** (same record, in force since 2026-10-03, never law): "record a hold outside the sheets (the PR thread or the claims-pass record), never as a sheet edit."

**The lapses.** Item 4's trigger was "the next amendment to the signing-act ballot, or the second hold". The ballot was amended twice without the hold form, both times by its owner:
- **`71ce7e2d7` (#416, 2026-10-19)**: lapse 1, recorded on `main` as `## Lapse (2026-10-20)`.
- **`9359c3805` (#437, 2026-10-21)**: lapse 2, recorded as `## Lapse (2026-10-22)` on #441's branch (`chore/routes-floor-census-and-ratification`), not yet on `main`.

**Escalation and ruling.** A P2 `(record)` at its second lapse goes to Peter with exactly three options, **spec**, **drop** or **fix-now** (README rule 11). Peter: **"Fix now."** This ballot is that fix. The class that made the trigger lapse by construction is ballot DRAFT `2026-10-22-trigger-names-the-event-not-the-vehicle.md`.

## 2. The rule (operative text, proposed)

`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 2, clause 6. After clause 6's sentence ending "(iv) is read at the claims pass.", and before its *(2026-10-21: …)* pointer, insert:

> A **hold**, a seat's "not yet, until <X>" on a row in bound, is recorded only as a line in (iv)'s list, `<dispositions file>#<row> — <seat> — hold: <reason>`, never as a sheet or signature edit; it is not a signing act, and the row's later assent or refusal is.

Followed by its dated pointer: *(amended <application date> by ballot 2026-10-22-hold-act-recorded-in-pr-body; prior text at `9359c3805`)*.

(The sizing wording had `<file>#<row>`. `<dispositions file>#<row>` is clause 6 (iv)'s own form, so a hold line and an act line parse alike.)

**What follows, by construction (no other text changes):**
- **Link 1 is unchanged.** A hold writes nothing link 1 reads.
- **F5 reads correctly.** The row's first write after its hash moved is the assent (or refusal) that resolves the hold, so that act is in bound and F5 does not fire. A refuse followed by an assent at unchanged hashes is still an F5, and correctly so: it is a changed mind, which needs a grant (clause 5).
- **The interim rule becomes law, narrowed.** The hold's home is the PR body's acts list. The "PR thread or the claims-pass record" alternatives drop, so a claims pass reads one place.
- **A held row keeps the PR red.** It stays on the stale list or the unsigned-routed list, and the C16 sweep fails on it, as it does today. A PR with an open hold therefore does not merge until the hold resolves into an assent or a refusal. That is unchanged behaviour, stated so that no one reads the hold line as a way to merge with an unsigned row.

## 3. Timing: before the routes-floor application

The orchestrator recommended, and Peter's "Fix now." places, this amendment **before** the routes-floor application PR (ballot `2026-10-21-routes-floor-re-pointed-frontmatter-members.md`, ratified 2026-10-22 on #441's branch). That PR's signing fan-out is the largest scheduled (the orchestrator's count: seven seats over 20 rows), so a hold is most likely there, and without this rule a hold there would be the second hold, the other limb of item 4's trigger. The floor application does not itself amend the signing-act ballot; its edit sites are `triviality.ts`, its tests and Spec 123 `design.md` § C18.

**Sequence**: #441 merges → this ballot is ratified (record-first) → the application PR (§ 4) merges → the routes-floor application PR opens.

## 4. Application (one PR, Peter-merged, after #441 merges)

1. **Record-first**: this file's Status reads `RATIFIED (Peter, <date>)`, committed before any site.
2. **`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 2 clause 6**: the § 2 sentence and its dated pointer, exactly as written.
3. **Same file, § Errata**: one ledger line, `§ 2 clause 6: the hold form added (ballot 2026-10-22-hold-act-recorded-in-pr-body; Peter, 2026-10-22, "Fix now."; hermetic follow-ups item 4).`
4. **`governance/classification-map.md`, row `signing-act-consistency`**: one history line, `{ date: <application date>, change: "§ 2 clause 6 gains the hold form: a hold is a line in the PR body's acts list (<dispositions file>#<row> — <seat> — hold: <reason>), never a sheet or signature edit, and not a signing act (ballot 2026-10-22-hold-act-recorded-in-pr-body; closes hermetic follow-ups item 4); rule line, checks and check_state unchanged", by: thurgood }`.
5. **Close hermetic item 4**: this amendment is item 4's owed fix. The application PR adds rule 5's dated outcome line to `.kiro/issues/2026-10-03-hermetic-publish-path-follow-ups.md` and `git mv`s it to `archive/`, since item 4 is its last open item. **It must branch after #441 merges**, because the record's `## Lapse (2026-10-22)` lives on #441's branch, and editing the record anywhere else first would conflict with it or duplicate it. The application touches the record's trigger path (`path:.kiro/docs/ballots/2026-10-01-signing-act-chain.md`), and the same commit closes it, so it does not lapse a third time.
6. **Straggler sweep**: `grep -c 'hold-act-recorded-in-pr-body'` → `2` in the signing-act ballot (the pointer and the Errata line) and `1` in the register. Separately, `grep -n 'Interim rule' .kiro/issues/archive/2026-10-03-hermetic-publish-path-follow-ups.md`; the interim text stays there inline as the superseded record (README § "Conventions", superseded text).

**Other records that fire on "the next amendment to the signing-act ballot"**: none besides hermetic item 4. I checked every root record's Trigger lines and body triggers for the ballot path, "amendment to the signing", and riders on it, at `275b711e5`. Its item 6 rider (the `publish-rail-guard` register row, "riding with item 4's hold-form work") was resolved separately at #354 (`ce7b492e1`), so it carries nothing into this PR. The register's `signing-act-consistency` disposition carries a different rider (the TCP pointer "rides the next TCP edit"), keyed to a TCP edit, not to this ballot. It does not fire here.

## 5. Recommendation, counter-argument (fold-back applied), residual

**I recommend § 2.** It is the smallest text that makes a correct hold read correctly, and it is the shape Peter's "Fix now." admits: text only, no instrument change, landing before the fan-out where holds are likely.

**The counter-argument.** A hold recorded in a PR body is a weaker record than the commit. The signing-act ballot's own principle is "the commit is the record": an act's commit carries its `Agent:` trailer, and `--audit` anchors it in the seat's transcript. A PR-body line has no commit, no trailer and no transcript anchor. It is written by whoever writes the body, usually not the holding seat, and it is editable after the fact.

**What fold-back changed.** The line takes clause 6 (iv)'s exact form, so the claims pass reads holds where it already reads acts, beside the pasted lists, and a hold whose row then resolves is matched to the act that resolved it. The narrowing (one home, not "PR thread or claims-pass record") came from the same pass.

**What survives.**
1. **The rule is enforced only by F5's red.** A seat that records a hold as a sheet edit anyway is caught only when the later assent fails F5, not at the hold. A hold line that is simply missing is caught by nothing mechanical. The claims pass reads (iv), but that is post-acceptance and never a gate.
2. **A hold's attribution rests on the body author's transcription** of the seat's word, not on the seat's own commit.

**The stronger shape, not picked: (b)**, a recorded hold field (for example a `hold` value in `signatures.ts` `SIGNATURE_FIELDS`, with `--ci` and `--audit` reading it and fixtures for it). It would make a hold a seat-authored commit like every other act and close both residuals. It is an instrument change: a census, new fixtures specified by Stacy, and a `check_state` question on an armed check. That is a spec-or-sitting cost, not fix-now, and Peter ruled fix-now. It is not a fork here because the ruling chose the size. **Its trigger** is the residual biting: the first claims pass that finds a hold disputed, or a hold sheet edit caught only by F5.

## 6. Cost

- **At application**: one sentence and pointer, one Errata line, one register history line, and the hermetic close and archive. One PR, Peter-merged.
- **Per hold, from then**: one PR-body line written by the PR's author, in place of a sheet edit that later failed F5 and forced a re-cut (#284's cost).
- **No one re-signs**: no row's hash moves, and no charter is edited.

## 7. Review round record

*(Stacy R1 pending.)*

# Three claims-audit records with no named home: ARMING's other limbs, SYMPTOM's filename, and the consumer's RELEASE record

**Date**: 2026-10-29
**Status**: ACTIVE. This is an observation. It asks for one ruling that names all three homes. It is not a ruling and proposes no text.
**Owner**: Stacy. The reads and records are hers: her charter's trigger set (`canonical/agents/stacy.md` L400–L408) and § "The claims-pass record" (L417). The overlay's text is authored by Thurgood and signed by Stacy (`canonical/profiles/consumer/stacy.dispositions.yaml`).
**Trigger**: `release:next:phase-1` — the next RELEASE phase-1 read, where these gaps bite: that read walks the release delta's ARMING events and every claims-pass record in it. The vehicle is ruled. This record's class fix rides item 4 of `.kiro/issues/2026-10-29-release-records-home-switch.md`, the capture record of ballot `2026-10-29-release-claims-pass-record-home` (RATIFIED, #556 `08f9c563a`; applied, #559 `a4e7fa12c`). Site 2 of that ballot (my charter's L417) is composed with this class fix, and lands in whichever comes first: the switch PR, or this record's own class-fix ballot. Rule 1: a P2 record that would ride another change takes `release:next:phase-1`.
*Trigger re-ruled 2026-10-30 (Stacy, owner, rule 9): the token is unchanged, and the prose now names the ruled vehicle. Reason: since this record was filed, the RS-50 ballot it cited as a DRAFT was ratified (Peter, 2026-10-29: F-1 (ii), F-2 (a)) and applied. Its capture record's item 4 now carries this record's class fix together with site 2, so the unit `#the-claims-pass-record-claims-passmd-the-template` is edited once. Authority: that ballot's § 4 site 2 and site 3 item 4, and README rules 1 and 9. This edit is an ancestor of 16.2.0's S, so rule 11 has no first lapse to find here; the record was rowed `carried` in `.kiro/issues/2026-10-29-release-16.2.0-walk.md`. Two facts are unchanged: the SYMPTOM-filename collision (gap 2) is still latent, and if a SYMPTOM event fires before the switch, the class fix goes ahead as its own ballot. The **Source** and **Sibling** lines below describe the ballot as it stood at filing (DRAFT, F-1 (i)) and are kept as written. Superseded Trigger prose, kept verbatim: "Rule 1: a P2 record that would ride another change, here the ruling this record asks for, takes `release:next:phase-1`."*
**Class**: P2 obligation (record) · charter *(set 2026-10-29, Stacy, owner, rule 12. Why `(record)` and not `(guard)`: no instrument claims more than it checks. LIVENESS read 2 claims only RELEASE and SYMPTOM. `owed-set.sh` keys on `claims-pass.md`, which is exactly what it claims. What is missing is the rule that names each record's file, so each record's form is undecided. No reader has been misled yet. Why not P3: gap 2 would, if it happened, silently mark a spec's closeout as done, and gap 1 has the shape that the instrument-path limb missed seven times before it got a detector. A P3 would take `manual` (rule 1), and a `manual` record never lapses.)*
**Source**: Stacy's R1 on ballot `.kiro/docs/ballots/2026-10-29-release-claims-pass-record-home.md` (RS-50; DRAFT, branch `chore/ballot-rs-50-release-claims-pass-home`, head `c8176eabe`, not on `main` at this record's base), answer S4. Her R1 entry is spliced into that ballot's § 8 by its holder.
**Sibling**: that ballot names the **in-repo RELEASE record's home**: `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, with § 5.3's delegate file beside it, under its F-1 (i). The ballot does not cover the three gaps below.
**Consulted**: none needed. This record states an observation on surfaces of my own seat. The ruling it asks for is drafted elsewhere and consults there.

**Base**: every line below was read at `6f23bc6fe` (#549), `origin/main` at filing.

---

## Gap 1: ARMING reads on three limbs have no home, and nothing detects a missing read

- **The row**: `canonical/agents/stacy.md` L404, ARMING. It names six limbs:
  1. a new barrier arms;
  2. the required-check set changes;
  3. a CI-regime standing-scope (P1) PR merges;
  4. an issue-row grant over a `.github/**` path merges;
  5. a PR touching an instrument path merges;
  6. a PR touching `.github/in-lane-guards.json` merges.
- **The limbs that have a home**:
  - **Instrument-path limb**: standing home `.kiro/issues/2026-10-25-arming-read-class-option-fork.md`. Its `path:` Trigger lists the 20 instrument globs, and `scripts/issues-owned.sh` prints `FIRED@<sha>` at my session start.
  - **Registry-path limb**: standing home `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md`, with Trigger `path:.github/in-lane-guards.json`.
  - **Grant limb**: its `**Grant activation read**:` line has no fixed file by design. Thurgood's LIVENESS item 4 (`canonical/agents/thurgood.md` L527) greps for it anywhere under `.kiro` and prints `OWED` when it is missing.
- **The limbs with no home and no detector**: a barrier arms, the required-check set changes, and a P1 PR merges.
  - The two reads of this kind that exist sit in Spec 123's completion directory: `arming-read-u4-audience-banner.md` (`c5a6da8a4`) and `arming-read-hermetic-publish-path.md` (`75bb350e5`), both 2026-10-13. They are there because 123 carried those barriers.
  - An arming that no spec carries, such as a chore PR or a P1 PR, has no home.
  - LIVENESS read 2 (`canonical/agents/thurgood.md` L525; my LIVENESS row, L408) asks only whether **RELEASE / SYMPTOM** fired and produced a record. So a missed read on these three limbs is found only by my RELEASE pass over the delta, which is the named backstop.
- **Harm so far**: none found. **Harm owed**: a read on these limbs lands wherever habit puts it, or nowhere, and only the next RELEASE pass would notice.

## Gap 2: SYMPTOM's record has no filename, and the closeout filename would hide it

- **The row**: `canonical/agents/stacy.md` L401, SYMPTOM, "Retrospective claims audit of the originating spec, **all ticked items**". Its directory is decidable: the originating spec's `completion/`.
- **The filename is not named.** L417 names only CLOSEOUT's (`completion/claims-pass.md`) and MIDPOINT's (`completion/claims-pass-midpoint.md`, "NEVER `claims-pass.md`").
- **The collision**: suppose a SYMPTOM record is written as `completion/claims-pass.md` in a spec whose closeout pass has not run. `scripts/owed-set.sh` L194 (`if has "$D/completion/claims-pass.md"; then`) then classes that spec `closed`, and `closeout-owed(<spec>)` is silently discharged by a pass that covered only the symptom. This is the MIDPOINT collision ruled at 127's tasks round, in a new place.
  - The consumer rendering has the same gap: the overlay's SYMPTOM row is L74, and its owed-set predicate keys on `$SPECS_DIR/S/completion/claims-pass.md` (L104).
- **Latent**: no SYMPTOM pass has run. The only `claims-pass*` files under `.kiro/specs/` at the base are:
  - 123's and 127's CLOSEOUT records (`claims-pass.md`);
  - 123's and 127's MIDPOINT records (`claims-pass-midpoint.md`);
  - the four RELEASE records in 123's directory (`claims-pass-release-<v>.md`).
- LIVENESS read 2 asks whether each SYMPTOM produced a committed record. With no filename, that question is answered from memory.

## Gap 3: the consumer overlay names no home for a consumer's RELEASE record

- **The lines**: `canonical/profiles/consumer/stacy.overlay.md` L73, the consumer RELEASE row ("Before a version publishes / at the release tag"), and L87, the template sentence "Every pass produces a committed record in the spec's completion directory."
- A consumer's RELEASE pass has no spec, and a consumer has no RELEASE-FLOW to point to. So the sentence is **incomplete, not false**. The consumer LIVENESS row (L78) still asks whether each RELEASE "produce[d] a committed record".
- **Out of scope for RS-50, and named here so the gap is on record.** Fixing it changes shipped text: overlay authoring (Thurgood), a renderedHash move, Stacy's re-sign of `#the-claims-pass-record-claims-passmd-the-template`, and a CHANGELOG line. RS-50's § 4 expects an empty `canonical/_consumer-output/` diff, which is right for that ballot.

## What this record asks

**One ruling that names all three homes, so the signing acts are spent once.**
- Gaps 2 and 3, and the RELEASE pointer that RS-50's site 2 would have added to L417, all live in one unit: `#the-claims-pass-record-claims-passmd-the-template` (canonical L417 and overlay L87). One canonical-and-overlay edit there costs Stacy two acts (re-confirm, re-sign), once. That is why her R1 declined RS-50's site 2 under its F-1 (i).
- **Honest cost, not a promise of two**: if gap 1's home is named in the ARMING row (L404) instead of in L417's unit, that row's unit is also `re-pointed` and signed (`#the-trigger-set-the-114-superset-table-names-never-numbers`), so it costs two more acts. Where the ARMING home is named is the drafter's choice, and the act count follows from it.
- Who decides what:
  - The homes, the filename and the overlay sentence are the ruling's to name, not this record's.
  - The ballot is Thurgood's to draft, as the owner of the claims-pass standards (Q5 cut: what a record must contain).
  - Peter ratifies.
  - Stacy proposes no text (her mirror anti-rot clause, applied here to her own surfaces by choice).
- **Closes when** the ruling's application PR merges with all three named, by a dated outcome line here (rule 5). If the next release's phase 1 runs first, the record lapses there (rule 11). A P2 `(record)` escalates at its second lapse.

*Signed: Stacy, 2026-10-29.*

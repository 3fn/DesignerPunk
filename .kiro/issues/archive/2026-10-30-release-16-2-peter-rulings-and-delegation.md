# Peter's words of 2026-10-30 for release 16.2.0: the rulings, and the one-off delegation to the collective

**Date**: 2026-10-30
**Owner**: Thurgood (release author for 16.2.0). Interested: Stacy, who verifies at RELEASE phase 1 every citation of this record.
**Trigger**: `release:next:phase-1` — the event that owes the close is 16.2.0's S. By then, each row decided under § "Delegation" has either landed or been re-ruled, citing this record by its merge SHA. The last record-only PR before S that cites this record adds rule 5's outcome line here, listing those rows. Phase 1 reads it there or in `archive/`. Why this token and not `manual`: rule 1 gives `manual` only to a P3, and this record is read at a named event.
**Class**: P2 obligation (record) · charter *(set 2026-10-30, Thurgood, rule 12. It charters a one-off, scoped delegation and records the rulings it rests on. No reader is misled, so it is `(record)`. It is not P3, because a P3 takes `manual`, and a `manual` record is never read at the release this delegation serves.)*
**Source**: the orchestrator's receipt log for these chat messages, sections "Next release + spec order" through "Fork 4 outcome + collective delegation". Each quote below is copied from that log as the orchestrator recorded it. The log is a session scratch file, not committed; this record is the committed form.
**Why this record exists**: Task-Completion-Protocol § "The Merge Rule": "Any later **delegation of merge-on-green must be a recorded rule** (ballot or committed record with date and scope) — never a verbal grant. The relayed-authority lesson: authority is a record." The delegation below is not a merge delegation, but the same principle applies. A chat line becomes citable authority only as a committed record with its date and scope, merged before anything cites it (Stacy's condition, collective round 3).
**Consulted**: Stacy — her round-3 confirm set this record's form: its own record-only PR, merged first, cited `path @ sha`, and checked with `git merge-base --is-ancestor`.

---

## Rulings

All five quotes are Peter's, in chat, relayed by the orchestrator. The clock is "received before" the orchestrator's `date -u` at receipt. Peter's words are quoted verbatim. Where what a ruling decided is the orchestrator's reading, it is flagged as one.

### R0 — the release go and the spec order (before 2026-10-30T00:07:19Z)

> "Thank you for the warning; I forgot about 129. Proceed as you recommend, please"

- **What it ruled**, as the orchestrator's reading of "as you recommend": start the next release now with phase 1 first, the walk record being the readiness check; tag and publish only if phase 1 is clean. The spec order stays as ruled on 2026-10-24, 129 → 131 → 128 → 130.
- **Flag**: "clean" is his word in the reading, not in the quote. The collective's working reading of it is B1 (round 2).

### R5 — the escalation package's five forks (before 2026-10-30T14:46:25Z)

> "Re: 1, Yes. Be mindful of any inbound we'd want to provide if we need to make updates to the spec / Re: 2, Fix now, but be sure to capture it for 131 if you think it warrants further exploration there, too. / Re: 3, CORRECTION / Re: 4, Let's have the three of them discuss it / Re: 5, What's the ask of me here? / Honest thoughts on these?"

- **Fork 1**: a record-only amendment naming records in Spec 129's placeholder outline counts as rule 11's spec answer. Any update to 129's outline comes with an inbound.
- **Fork 2** (`2026-10-24-steward-verb-carve-out-drop-limb-unapplied.md`): fix-now. Capture it for 131 if it warrants further exploration there.
- **Fork 3** (#473's kind question, `2026-10-25-owed-set-law-text-after-closing-commit-anchor.md`): CORRECTION, for the sentences that describe the script. The ballot's § 7.5 counting block and the judgment-point paragraph stay asked. *(The scope "for the script-describing sentences" is the orchestrator's reading of "CORRECTION" against the option put to him.)*
- **Fork 4**: Thurgood, Lina and Kenya discuss it. The outcome is R7.
- **Fork 5**: a question back ("What's the ask of me here?"), not a ruling.
- **Not ruled by R5**: the bump; F1 and F3; the bulk answers on the 39 records; the two definitions.

### R6 — decision-framework item 1a, the thinking (before 2026-10-30T15:05:25Z)

> "Re: ballot question, my thinking is this: if it's caught in a planning stage, pause and ask a human. If it's discovered mid-development, record, proceed, and notify after. Honest thoughts?"

- **What it is**: thinking offered for comment, not a ruling.

### R6c — the 1a measure, confirmed (before 2026-10-30T15:15:17Z)

> "Confirm and review, please"

- **What it ruled**, as the orchestrator's reading, flagged for overturn: R6's rule as the measure. Planning → pause and ask a human; development → record, proceed, notify before acceptance. It carries the converged definitions:
  - the boundary is the plan's approval, decidable in-repo as the merge of the plan artifact;
  - notify is one fixed `**Departures**:` PR-body line before acceptance;
  - a `discoverable:` field;
  - "a human" in place of "Peter".
- **The two recommendations it confirmed**, as read: the class clause is design-only, in `design-language/design-philosophy.yaml`'s Native-Behavior Rule, with the framework citing it; and there is no brand-critical exception.
- **"Review"** means the ballot's review round. Lina authors the measure text, Thurgood drafts the ballot file, and Kenya, Leonardo and Stacy review. The ballot is #568, which ratifies only by Peter's word on it.

### R7 — fork 4 accepted, and the delegation (before 2026-10-30T15:38:13Z)

> "Good to go on fork 4. Honestly, I'd like you to collaborate with the other agents to make a collective recommendation and proceed on the other open questions and decide when and how they should be acted on — now, in a later scheduled spec, or their own spec. Honest thoughts?"

- **Fork 4's outcome is accepted.**
  - **`2026-10-12-steward-canonical-claims-theme-output.md`**: a CORRECTION PR before 16.2.0's S, authored by Thurgood in Kenya's words, Kenya reviewing.
    - **Correction, recorded after the receipt**: the outcome put to him said "0 acts". The authoring seat later found two re-sign acts owed by Kenya, and found that no seat holds standing write over that charter prose. That PR waits on the authority line under § "Not in this record".
  - **`2026-10-19-decision-framework-consistency-after-tnd.md`**: fix-now by 16.3.0's S. Lina's items 2 and 3 plus her 1b keep line, with item 1a as #568's measure.
- **The delegation**: § "Delegation" below.
- **Flag**: his "Honest thoughts?" invites pushback. The collective's honest answer (collective round 1, the law question) is the scope in § "Delegation", put back to him with the one-word list. Until he answers that list, the scope below is the collective's reading, and the parts it excludes stay his.

### R8 — the one-word list (before 2026-10-30T17:23:42Z)

*(Appended 2026-10-30, Thurgood, owner, rule 9. Peter, chat, relayed by the orchestrator, verbatim. His answers follow the numbered list at the end of the collective's disposition sheet r2.1. Each reading below states which item it answers and what it rules; where the reading is the orchestrator's or mine, it is flagged.)*

> "Re: 1, 16.2.0 / Re: 2, Yes / Re: 3, Wait and capture (possibly as an inbound) / Re: 4, "Ratify as recommended", plus F-C: "(ii)" Leonardo's own small ballot / Re: 5, Gate / Re: 6, Ratify / Re: 7, B / Re: 8, your launch time / Re: 9, Ratify"

Item 10 (drops) was "none proposed", so nothing was asked and nothing was answered.

1. **The bump: 16.2.0, RATIFIED** (RELEASE-FLOW § "Deriving the delta" item 3). The CHANGELOG's "Changed" line names `token-index/`'s `platforms` shape and the lag in `TokenIndexer.ts`'s declared type.
2. **The authority line: Yes.** It names the files and authors as the sheet worded them:
   - **Thurgood** authors `canonical/agents/kenya.md` L182 and L206 in Kenya's words, plus `.claude/agents/kenya.md`, `.kiro/agents/kenya-prompt.md` and `canonical/generated.lock`. Kenya re-signs the two frontmatter members, `commands[platform-tokens]` and `commands[product-screen-commands]`.
   - **Lina** authors `governance/platform-implementation-guidelines.md` L744–L774 (F1), and `governance/Component-Development-Guide.md` § "Component Token Files" with its two adjacent sites (F3).

   It authorizes authorship, one-off, for these files only. Each merge is still Peter's. It moves no standing write scope.
3. **H's class: wait for Spec 131, and capture it, possibly as an inbound.** The class is an owner with no standing write over the CORRECTIONs of the docs or charters it owns, four instances in a week. The owed act is mine: a 131 inbound naming the class and its four instances. *Reading (mine)*: "possibly" leaves the form open; an inbound is the form the record names.
4. **#568: "Ratify as recommended", plus F-C (ii), Leonardo's own small ballot.**
   - *Reading (orchestrator's and mine, flagged)*: "as recommended" is the sheet r2.1's recommendation. That is F-A as the pair with Leonardo's clause folded in ("for work whose kind has a plan (a spec, a product screen), a missing plan is itself planning, so ask"), and F-B (a) at zero extra acts if composed in one edit.
   - The fold is not yet in #568's text, and Lina's, Ada's, Stacy's and Kenya's read of the clause is owed. The ratification covers #568's text at the commit that applies the fold, if those reads raise no change. A changed text goes back to him.
   - **F-C (ii)**: Leonardo authors the small ballot on Integration Guide § "Writing Screen Specs", fix-now by 16.3.0's S, as a key in the existing `ui-tree.<platform>:` branch.
     - *Reading (mine)*: his "(ii)" is the decision, not an authority line for Leonardo's `governance/` edit. That ballot's own ratification will authorize its application.
5. **The G-4 gate: Gate.** "128's React (web) binding design is not approved before G-4's design merges." It sits inside the ruled order 129 → 131 → 128 → 130 and does not reorder it. 128's outline and its React Native half are not gated.
6. **The prop-mapping ballot, property half: Ratify.**
   - The text is Sparky's R3b sentence, verbatim (sheet r2.1, row E): "On web, the served schema states how the element takes each non-callback prop: as a JS property of the served name, or, where none exists, as its kebab-case attribute only, marked attribute-only. The served name is never changed to match the element, and the element is not renamed. Every attribute-only prop is a listed G-4 finding."
   - *Reading (mine, flagged)*: this is a ratification given before the ballot file exists. It binds that sentence only. If Lina's R1 on the schema-field cost changes the sentence, the change goes back to him. The Status line of the ballot, when filed, cites `R8@<sha>` item 6.
7. **sync-migration: B.** `.kiro/issues/2026-10-24-sync-migration-unlisted-copy-floor.md`: Lina's option B, the migration says `modified` only when every version that could have made the copy was retrieved.
8. **The trio: "your launch time".**
   - *Reading (the orchestrator's, flagged)*: run the trio in full before S. The operator (Leonardo) schedules it, and Peter launches the sessions when it is scheduled (Decision 1, 2026-10-14). Its absence at S is a finding, not something that holds the tag; he did not say "Hold".
   - Its precondition is the grant record `.kiro/issues/2026-10-30-release-16-2-trio-grant.md`, filed in this record's PR.
9. **The later ballots: Ratify.** These are steward-verb's drop (`2026-10-24-steward-verb-carve-out-drop-limb-unapplied.md`), b-ci (`.kiro/docs/ballots/2026-10-24-ballot-audit-fix-now-law.md`, DRAFT at #460), decision-framework 1a (#568, item 4 above) and F3 if it needs a ballot.
   - *Reading (mine, flagged)*: each is ratified in the text the collective recommends when it is filed, with no fork left open in it.
   - #460 has open forks (F-1 to F-4) and Stacy's R1 owed. Its forks go to him as forks; this "Ratify" does not pick them.
   - A text that changes after his word, or a fork found at review, goes back to him.

### R9 — the release's definition of done (before 2026-10-30T18:52:50Z)

*(Appended 2026-11-01, Thurgood, owner, rule 9. Peter's words reached the "Project state assessment" session's orchestrator, in the Spec 131 thread, not this release's orchestrator. They are quoted as that thread's brief carries them, `16-2-definition-of-done-brief.md`, a session file, not committed. This section is their committed form.)*

**His aim**, his words, dated 2026-10-30 in the brief. The brief records no separate receipt time for it:

> "1. get through these last PRs and obnoxiously many-small issues to get to a stable, clean 16.2.0; and defer as many as optimal to either planned or new future specs. 2. Update 128, 129, 130, and 131 with the changes from the latest releases while still aiming to achieve those goals of thinning the governance volume under the conditions we outlined, removing layers, etc. I felt it was important to have as clean, functional project state as possible going into that more formally so that we were making decisions based on facts rather than claims."

**The ruling**, received before 2026-10-30T18:52:50Z (that orchestrator's `date -u` at receipt):

> "Yes, please"

He was answering this offer: *"I can turn criteria 1 and 3 into a short brief for the 16.2.0 release work, so it carries them as its definition of done."*

**What Peter read before his "Yes, please"** *(corrected 2026-11-01, Thurgood, on the Spec 131 session orchestrator's account, relayed by this release's orchestrator)*. "Criteria 1 and 3" in the offer are items 1 and 3 of that orchestrator's message to Peter. He read the message before answering: it was shown to him by the Spec 131 session's orchestrator after 2026-10-30T18:30:39Z (that orchestrator's last `date -u` before the turn) and before 2026-10-30T18:52:50Z (its receipt of his "Yes, please").

Item 1, verbatim:

> "**Define "clean" before you start, or 16.2.0 never stabilises.** So far, cleanup has generated more records than it closed: root records went from 103 to 143 while issues were being worked. Each small issue processed through the current machinery tends to produce a lapse, a re-rule, a standards item or a grant. Concrete exit criteria would stop that:
> - P0 and P1 product defects are fixed, or disclosed in the release notes;
> - every root record is fixed, closed, or routed to a named spec. Routing is one line per record, or one batch record per destination spec like #575, not a re-rule in place;
> - no new ballots during 16.2.0 unless the release needs them;
> - **root records go down across 16.2.0, not up.** That's the measure that the cleanup is cleaning."

Item 3, verbatim:

> "**Capture the baseline as numbers when 16.2.0 ships.** It's one generated snapshot record, not a new mechanism: root record count and words; ballot count; always-loaded words; walk rows; grant records per release; product share of commits; oldest P0/P1 age; open forks per spec. That's the "before" for 131's success metrics..."

Item 2 was not in the offer (native facts stop at web and the package).

The offer, verbatim: "If you'd like, I can turn criteria 1 and 3 into a short brief for the 16.2.0 release work, so it carries them as its definition of done." Answer: "Yes, please".

**What his words cover**:
- the four bullets of item 1 as shown, including "not a re-rule in place" and "root records go down across 16.2.0, not up";
- the snapshot of item 3.

**What they do not cover**, the brief's additions:
- "re-triggering to the next release is not a state";
- the release-blocking exception;
- "archiving a routed record counts";
- "standards implications go to the RS queue";
- any reading of "named spec" (for example, whether it covers 125-B).

These are the brief's, and they go to Peter as the collective's forks where they matter.

*Superseded, kept verbatim (my 2026-11-01 reading, now corrected: it misread "criteria 1 and 3" as the brief's criteria 1 and 3):*

> **What it ruled.**
> - *By his words*: the offer, which names **criteria 1 and 3** (P0/P1 fixed or disclosed; no new ballots).
> - *By the brief* (that orchestrator's text, written after his "Yes, please"): four criteria.
> - *Reading (mine, flagged; corrected 2026-11-01 on Stacy's read)*: nothing on record shows he read criteria 2 and 4 as worded. The clauses "re-ruling … is not a state" and "archiving a … routed record counts" are put back to him as forks, with the collective's next package. Until he answers, criteria 1 and 3 are his ruling; criteria 2 and 4 are the brief's, and the release works to them as the stricter reading.
> - *Superseded, kept verbatim*: "**What it ruled**, as the brief states it (the brief is that orchestrator's text; his \"Yes, please\" adopts it):".

The brief's text:
- **16.2.0's definition of done, four exit criteria:**
  1. P0 and P1 product defects are fixed, or disclosed in the notes by record path.
  2. Every root `.kiro/issues/` record is fixed, closed, or routed to a named spec. Re-ruling in place or re-triggering to the next release is not a state, except for named release-blocking records.
  3. No new ballots during 16.2.0 unless the release needs one, saying why in one line; standards implications go to the RS queue for Spec 131.
  4. The root count at S is below the count at the walk's start, with both stated in the walk record.
- **Native stays a claim**: "reference source, not compile-verified" (#453's form).
- **One generated baseline record at S**: `.kiro/specs/131-governance-simplification/evidence/<date>-baseline-16.2.0.md`, with its figures at `38f4ece47` beside them.
- The brief states its own limits: "The four criteria are Peter's definition of done for this release, recorded as his ruling. They are not standing law." Whether any of it becomes standing practice is Spec 131's question.

**Where R9 meets earlier rulings**: it is later than R8. Where they meet, R9 is his later word.
- The delegation's "fix-now by 16.3.0's S" vehicle (§ "Delegation"; the walk record's delegation table) is superseded for every record that is not release-blocking. Each is fixed before S, or routed.
- R5 item 2, steward-verb "Fix now", and R8 item 9's "Ratify" do not conflict with R9. "Now" means before S.
- *Reading (mine, flagged)*: R9 adds no new mechanism. The routing form is put back to Peter as a fork: in place, the default the collective now proposes (Stacy), or archived. *(Corrected 2026-11-01. Superseded, kept verbatim: "The routing form (a routed record archived with a dated outcome line naming the spec's intake) is the collective's working assumption, put back to Peter with the sheet r3.")*

Cite R9 as `R9@<the squash of the PR that added it>`.

### R10 — the two forks the Spec 131 session put to him: the R7/R8 rows count, and the reach (before 2026-11-01T13:42:54Z)

*(Appended 2026-11-01, Thurgood, owner, rule 9. Peter answered the "Project state assessment" session's orchestrator (the Spec 131 thread), not this release's. This release's orchestrator relayed the words and the text put to him. Both are quoted here, because he answered by adopting a recommendation rather than restating it.)*

**His words**, in chat, received before 2026-11-01T13:42:54Z (that orchestrator's `date -u` at receipt), verbatim:

> "Proceed as you recommend"

**The text put to him immediately before**, verbatim, the deciding parts:

> Fork 1 — "do the R7/R8 rows count? (a) Yes, as an explicit exception to 'not a re-rule in place': rows you disposed of under R7/R8, with their trigger and second-lapse guard, count as a valid state for 16.2.0. … (b) No, the bullet stands as written: those rows must be fixed, closed or routed to a spec before 16.2.0 is clean."
>
> Fork 2 — "how far does it reach? (a) The 44 due rows each reach a state, the rest are batch-routed where cheap, and the record count is the measure. (b) All 141 root records reach a state."
>
> Recommendation: "(a) on both. Please answer fork 1 in terms of the bullet, for example 'R7/R8 rows are an exception to "not a re-rule in place",' so the records carry one reading, not two."

**What it ruled.** *Reading (that orchestrator's, adopted here; flagged)*: his words adopt the recommendation, "(a) on both". He did not use the suggested exception wording himself.
- **Fork 1 (a).** The rows disposed of under R7 and R8 are an exception to R9 item 1's "not a re-rule in place". With their Trigger and second-lapse guard, each counts as a valid state for 16.2.0. "R7/R8" in that session's terms means the dispositions ruled under DLG and R8 in this record, the collective's sheet r2.1, which the walk record's § "Decided under Peter's 2026-10-30 delegation" carries. Their re-rules go ahead in Stacy's form, before S, citing `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`, `R5@d34fc778…` or `R8@0184efb3fd7b2956677351fdf84899767a5ac74a` as each row names.
- **Fork 2 (a).** The 44 due rows each reach a state. The other root records are batch-routed where cheap, and the root count is the measure (R9 item 1's last bullet).
- **What it does not rule**: the routing form (in place or archived), the standing class, the P3 list, and "named spec". Those stay the collective's open questions to him.

Cite R10 as `R10@<the squash of the PR that added it>`.

### R11 — Peter's 2026-11-01 authority lines (one at a time, chat, relayed by the orchestrator)

*(Appended 2026-11-01, Thurgood, owner, rule 9. Each line was put to Peter alone and answered alone. Below are the text put to him, verbatim from the orchestrator's receipt log, and his word, verbatim, each with its clock bound (the orchestrator's `date -u` at receipt). Each line authorizes the named authorship, one-off, for the files named. Each merge stays his. No line moves standing write scope. Further lines are appended as ruled.)*

**Line 1 — Kenya's overlay pins**, before 2026-11-01T14:47:54Z.
- *Put to him*: "add `canonical/profiles/consumer/kenya.overlay.md` L145 and L157 to the item-2 authority line, Thurgood as author (bump the two checksum pins), so Kenya can re-sign her two entries and the steward-canonical record closes before S; alternative named: route to 131."
- *His word*: "Yes"
- *What it rules*: R8 item 2's line, which named Thurgood for `canonical/agents/kenya.md` L182/L206, the two renderings and the lock, now also covers `kenya.overlay.md` L145 and L157.

**Line 2 — Stacy's F2 sentences**, before 2026-11-01T14:51:23Z.
- *Put to him*: "Thurgood authors, as a CORRECTION (his R5 fork-3 word "CORRECTION"), the two sentences on the owed set after a closing commit in `canonical/agents/stacy.md` L445 and L449 and their consumer copies in `canonical/profiles/consumer/stacy.overlay.md` L112 and L116; Stacy re-confirms and re-signs (two acts); a CHANGELOG line; floor-class, release-blocking, F-gating. Alternative named: none available (routing would ship a false consumer-facing charter sentence)."
- *His word*: "Yes"
- *What it rules*: Thurgood authors those four lines as a CORRECTION. The truth referent is `scripts/owed-set.sh`. Stacy makes the two acts. The release notes carry a CHANGELOG line.

**Line 3 — F1 widened to L730**, before 2026-11-01T14:52:23Z.
- *Put to him*: "Lina corrects `governance/platform-implementation-guidelines.md` L730 (the same class of wrong Android spacing-type claim as the L744–L776 fix in #577), one-paragraph CORRECTION under the same record, F-gating. Alternative named: leave it and disclose by record path in the notes."
- *His word*: "Yes"
- *What it rules*: Lina authors the L730 CORRECTION under the F1 record (`2026-10-26-android-guidelines-spacing-float-dp-claim.md`).

**Line 4 — F3 widened to four CDG sites**, before 2026-11-01T14:55:48Z.
- *Put to him*: "Lina adds `governance/Component-Development-Guide.md` L490, L997–L1001, L1059–L1074 and L1810 to #578 as the same CORRECTION under the same record (F3, floor-class, F-gating); Thurgood's two retired line-998 pending entries then match. Alternative named: merge #578 with only the named section fixed and disclose the four sites."
- *His word*: "Re: line 4, yes"
- *What it rules*: Lina authors those four sites in #578, under the F3 record (`2026-10-25-cdg-component-token-files-teaches-a-reference-map.md`). Thurgood's removal of the two line-998 `pending.json` entries rides the same PR (`361b4f344`).

**Line 5 — the owned-doc and charter CORRECTION authorship class, "ballot now" or "wait"**, before 2026-11-01T15:01:50Z.
- *Put to him*: "his 2026-10-30 "Wait and capture (possibly as an inbound)" carried the collective's condition "unless a fifth instance arrives"; the condition fired (about eleven instances incl. today's lines). Options: wait stands (answer lines 8/10/11 as lines; the instance count goes onto 131's OWNERS row as evidence) vs an interim small ballot now (barred by criterion 3 unless the release needs it; it does not)."
- *His word*: "Yes, wait stands"
- *What it rules*: no interim ballot during 16.2.0. The class (an owner has no standing write over the CORRECTIONs of the docs or charters it owns) stays routed to Spec 131's OWNERS row (map row 15). Lines 8, 10 and 11 are answered as per-instance lines. The instance count goes onto the OWNERS row's evidence: Spec 131's outline § 13, capture line 2.

**Line 6 — ratify #573, the screen-spec idiom ballot (F-C.1 to F-C.3), as filed**, before 2026-11-01T15:05:00Z.
- *Put to him*: "ratify `.kiro/docs/ballots/2026-10-30-screen-spec-idiom-per-node.md` as filed — each UI-tree node with a platform-idiom choice states it (follow, or part with a reason) in Integration Guide § "Writing Screen Specs"; the key sits on the node wherever it lives (departs from his R8 item-4 wording "a key in the existing ui-tree.<platform>: branch" because restating a shared node in a platform branch creates a second node — Leonardo's evidence, Kenya withdrew); Leonardo authors the application; F-gating. Alternatives named: send back for the branch form; hold for 131."
- *His word*: "Ratify as filed"
- *What it rules*:
  - The ballot `2026-10-30-screen-spec-idiom-per-node.md` (#573) is ratified as filed, F-C.1 to F-C.3, so its Status becomes RATIFIED under the record-first protocol.
  - The key sits on the node wherever it lives. That supersedes R8 item 4's "a key in the existing `ui-tree.<platform>:` branch" wording for this ballot.
  - Leonardo authors the application, which is F-gating.
- *Criterion 3* (no new ballots during 16.2.0 unless the release needs one): the ballot was filed 2026-10-30, before R9's brief existed, and is one of the three in flight that R9's re-plan let stand.

**Line 7 — ratify the rest of #579 beyond Sparky's sentence**, before 2026-11-01T15:06:17Z.
- *Put to him*: "ratify as filed `.kiro/docs/ballots/2026-10-30-web-prop-property-or-attribute-only.md` beyond Sparky's sentence (R8 item 6): site 1's second paragraph (Lina's G-4 wording, no repo path); site 2 with the third marker value `web: unmapped` (props reaching the element as neither property nor attribute; `children` as slot content) and Leonardo's last sentence; site 2c (Component Schema Format L154/L163 `type: callback` → signature-string form); the conditional banners (guard's own report at the application base); same-PR tests. Alternatives named: send back `unmapped` for a hand-kept exclusion list; hold for G-4/128."
- *His word*: "Ratify as filed"
- *What it rules*:
  - With R8 item 6 (Sparky's sentence), #579 is now ratified in full, so its Status becomes RATIFIED under the record-first protocol.
  - Lina authors the application, which is F-gating.
- *Criterion 3*: the ballot was filed 2026-10-30, before R9's brief, and is in flight under R9's re-plan, as #573 is.

**Line 8 — `design-language/design-philosophy.yaml` L53**, before 2026-11-01T15:12:30Z.
- *Put to him* (Thurgood's draft line): "Yes: Leonardo authors `design-language/design-philosophy.yaml` L53, the Native-Behavior Rule's constraint, replacing that line with ballot 2026-10-30-departure-timing-plan-vs-build § 3 site 2's After byte for byte, as one commit on `chore/apply-ballot-departure-timing` before it merges. One-off, this file and line only; it moves no standing write scope." Alternatives named: its own PR after the application merges; leave the site out (framework and served philosophy would disagree until 131).
- *His word*: "Yes, on the application branch"
- *What it rules*:
  - Leonardo has one-off authorship of that file and line.
  - It is one commit, on the application branch of ballot `2026-10-30-departure-timing-plan-vs-build` (#568), before that PR merges. The application PR carries it.
  - The new text is § 3 site 2's After, byte for byte. No standing write scope moves.

**Line 9 — #568's corrected site-1a text (L138/L139) after the R4 reads**, before 2026-11-01T15:13:29Z.
- *Put to him*: "ratify the corrected site-1a text — L138 last sentence "A spec task (work done for a spec: it executes a row of that spec's merged `tasks.md`, or its PR names the spec in `Spec:`, whatever its branch) or a product screen is plan-kind work; with no approved plan it is still in planning, so ask." and L139 "Work of any other kind (in this repo, a PR whose `Spec:` is `none`, such as an issue-driven `fix/` or `chore/` PR, whatever surface it touches) is in development from its start.", plus "through the screen's architect" → "through the product's architect" at L138 and L181 (Lina's Final, with Ada's anchor and Kenya's note). Alternatives named: decline (ratified text applies unchanged, correction reverted); another round."
- *His word*: "Ratify the corrected text"
- *What it rules*:
  - #568's ratification (R8 items 4 and 9) extends to the corrected text: L138's last sentence and L139 as quoted, and "through the product's architect" at L138 and L181.
  - The application carries the corrected text.

**Line 10 — the TDS and Civitas-overview CORRECTIONs**, before 2026-11-01T15:18:36Z.
- *Put to him* (Thurgood's drafted line): "Re: 10, Yes: Thurgood authors, as CORRECTIONs, (a) `governance/Test-Development-Standards.md` L1556–L1902, the workflow examples, so each declared test file and schema shape exists or is marked hypothetical (Lina consulted on L1884); and (b) `.kiro/steering/Civitas-System-Overview.md` L39, which drops 'built in Spec 081: 14 tools' for 'built in Spec 081 and extended by specs 096 and 097', with no count. The merges stay mine." Options presented: yes to both; yes to (b) only; no (both ride 16.3.0 on their re-rules).
- *Thurgood's read, received before the answer*: (a) is six sites, about 20 lines and about 1 h, off the critical path. (b) moves consumer unit `#what-civitas-contains` (item `what-civitas-con-8`), so Stacy owes a re-confirm and a re-sign. His lean was yes to both. Stacy's and Lina's reads were still pending at receipt.
- *His word*: "Yes to both"
- *What it rules*: Thurgood authors both, one-off, for these lines only. The merges stay Peter's. No standing write scope moves.
  - (a) is the six sites of `governance/Test-Development-Standards.md`: four `generic` markers (EXECUTION under ballot `2026-10-26-governance-examples-guard` § 2.3) and the L1902 and L1884 CORRECTIONs, with Lina consulted on L1884.
  - (b) is the L39 CORRECTION of `.kiro/steering/Civitas-System-Overview.md`.
  - *Recorded after the answer*: Stacy's read arrived after it.
    - On the TDS examples: now. They owe no signing acts of hers, the text is false in a served doc, and the fix cuts guard-pending entries.
    - On Civitas-System-Overview L39: at 16.3.0. No consumer reads the false count, the renderedHash does not move, and it costs her two acts. Her dissent on cost is on L39 only.
    - Peter's "Yes to both" covers both, and the ruling stands.
  - *Both PRs are F-gating*, because both files ship. The TDS examples are in `governance/`. The Civitas overview ships as an identity doc, though its consumer rendering never carried the count.
- *Sub-item, 2026-11-01: the TDS range widened to L1964*, before 2026-11-01T15:33:01Z.
  - *Put to him*: "#609's L1884 correction left Example 4's phase 3 (L1952–L1954, L1962–L1964) listing the old made-up contract names, contradicting the corrected block; outside line 10's L1556–L1902. Options (Thurgood's): widen line 10 to L1964 (one more commit on #609, same record, three lines; his lean) or a 16.3.0 record."
  - *His word*: "Let's widen line 10 to L1964"
  - *What it rules*: line 10 (a)'s range is now `governance/Test-Development-Standards.md` L1556–L1964. That brings in Example 4's Phase 3 (L1952–L1954 and L1962–L1964 at the base), corrected to Input-Text-Email's real contract names in #609.
- *Sub-item, 2026-11-01: (b)'s sentence re-authored after Stacy's refusal*, before 2026-11-01T15:38:35Z.
  - *Why it went back to him*: the wording he approved under line 10 named Spec 096, and that was false. Spec 096 never touched the Product MCP (Stacy's refusal of the first draft, with her tool-count history from `product-mcp-server/src/index.ts`).
  - *Put to him*: "the first wording he approved ("extended by specs 096 and 097") was false — 096 never touched the Product MCP (Stacy's refusal; tool count in `product-mcp-server/src/index.ts`: 081 → 7, 097 → 12, 107 → 13, 108 → 14). Re-authored sentence: "Product MCP: serves product-specific context from a consumer's `product/` directory (built in Spec 081 and extended by specs 097, 107 and 108; shipped in the package as `dist/mcp/product-mcp.js`). This repository has no `product/` directory, so here it serves an empty product set." with the dated pointer saying the old "14 tools" was false as history and the count is volatile."
  - *His word*: "Confirm"
  - *What it rules*: (b)'s L39 is the sentence as re-authored at `b03d0c43a3fbc0bb953d59bd324c44f20c1c3629` (#612), quoted in full:
    > - Product MCP: serves product-specific context from a consumer's `product/` directory (built in Spec 081 and extended by specs 097, 107 and 108; shipped in the package as `dist/mcp/product-mcp.js`). This repository has no `product/` directory, so here it serves an empty product set. *(corrected 2026-11-01: "built in Spec 081: 14 tools" was false as history, since Spec 081 built 7 and specs 097, 107 and 108 took it to 14, and the count is volatile; .kiro/issues/2026-10-27-civitas-overview-product-mcp-provenance-false.md; prior text at 465af3544)*
  - Stacy still owes her two acts on `#what-civitas-contains`: she re-confirms it and re-signs it.

**Line 11 — Ada's authorship of the 18 governance docs in #595**, before 2026-11-01T15:21:15Z.
- *Put to him*: "(A) one line naming Ada as author of the 18 `governance/` files listed in #595's body, CORRECTIONs and markers, one-off, merge Peter's (Ada's ask; Thurgood's read agrees); (B) his word that the walk record's "Ada · sweep PR" row under the delegation suffices (Ada's alternative; weak — the delegation excludes write scope); hold for 131. Also: `governance/a-vision-of-the-future.md` is his own voice (Thurgood's read; no charter owner) — Ada's two corrections stay or he makes them himself."
- *His word*: "(A), and the vision file stays Ada's"
- *What it rules*:
  - Ada authors the 18 `governance/` files named in #595's body, CORRECTIONs and markers, one-off; each merge stays his.
  - `governance/a-vision-of-the-future.md` is written in his voice and has no charter owner. Ada's two corrections to it stay hers, by his word.
  - No standing write scope moves.

**Line 12 — the 17.0.0 charter** (Peter's own record `2026-10-20-17-0-0-release-charter.md`), before 2026-11-01T15:29:54Z.
- *His words first*, verbatim, with one typo corrected and labelled ("at 17" read as "a 17"): "I don't really plan releases that way... I focus more on what direction we take and versioning is a consequence. I would imagine adding react and react native would warrant a 17 release. Honest thoughts?"
- *Put to him in reply* (the orchestrator's honest read): adding React/RN is additive (a minor on its own); what warrants a major is the web element public-contract cleanup (G-4 items E2–E7) that React binding needs, and 128's own inbound says generated React wrappers do not ship before that cleanup. "Proposed charter in his words: 17.0.0 is the major where the web element's public contract is cleaned up (G-4) and React and React Native bind to it (128); breaking changes ship together there; no date; sequencing 129 → 131 → 128 → 130 unchanged; caveat "unless 128's design shows the binding needs no breaking change". A record, not law (criterion 3 untouched). Alternative named: "standing exception" (name no number before 128's design)."
- *His word*: "Charter it in those words"
- *What it rules*:
  - The 17.0.0 charter record is `.kiro/issues/2026-11-01-17-0-0-release-charter.md`, filed by Thurgood for Peter. Its Trigger is 128's `design.md`.
  - The 2026-10-20 record closes by pointing at it.
  - E2–E7, 128's wrapper-sequencing rule and the blend deprecation's next-major removal take their start condition from it.
  - It is a record, not law.

**Line 13 — F2's L1 and L3: `.kiro/hooks/RELEASE-FLOW.md` § 5a and Thurgood's charter** (the owed-set record `2026-10-25-owed-set-law-text-after-closing-commit-anchor.md`, items L1 and L3), before 2026-11-01T15:34:54Z.
- *Put to him* (Thurgood's drafted line): "Thurgood authors, as a CORRECTION (your 2026-10-30 fork-3 word, R5), the sentences that describe `scripts/owed-set.sh` in two places: `.kiro/hooks/RELEASE-FLOW.md` § 5a, L66 (how the ratification boundary is read), L71 (`touch-only`), L72 (`candidate`), L74 (the heuristics sentence) and L76 (the unit-class anchors); `canonical/agents/thurgood.md` L543 and L545, in the LIVENESS paragraph on the owed-set query. The change: they say what the script has done since #473. A commit counts from its committer's or its UTC day on or after the ratification date. `touch-only` and the anchor come from the spec's closing commit. A spec with no closing commit reads `closure undecidable`. Stacy re-confirms and re-signs Thurgood's charter unit (two acts). L78, the 'one judgment point' paragraph, and the 2026-09-19 ballot's § 7.5 counting block stay asked." Fork inside (Thurgood's): add L78's first sentence ("the anchor printed is the most recent first-parent commit touching the spec", now false) as a CORRECTION, or leave L78 whole for its own round. Options: yes incl. L78's first sentence (Thurgood's lean); yes, L78 whole; no (16.3.0).
- *His word*: "Yes, including L78's first sentence"
- *What it rules*:
  - Thurgood authors, one-off, as a CORRECTION under R5 fork 3, the sentences describing `scripts/owed-set.sh` at `.kiro/hooks/RELEASE-FLOW.md` § 5a L66, L71, L72, L74, L76 and L78's first sentence, and at `canonical/agents/thurgood.md` L543 and L545.
  - Stacy's two acts on Thurgood's charter unit are owed: she re-confirms it and re-signs it.
  - L78's "one judgment point" paragraph after its first sentence, and the 2026-09-19 ballot's § 7.5 counting block, stay asked. This line does not reach them.
  - Not F-gating. `.kiro/hooks/RELEASE-FLOW.md` is not packed. Thurgood's consumer charter (`canonical/_consumer-output/_canonical/agents/thurgood.md`) renders LIVENESS items 1 and 2 only; L543 and L545 do not render to it (checked at origin/main, 2026-11-01).

**Line 14 — fork B, the routing form**, before 2026-11-01T15:40:52Z.
- *Put to him*: "his R9 item-1 bullet ("routed to a named spec. Routing is one line per record, or one batch record per destination spec like #575, not a re-rule in place") read two ways. (i) Route in place (Stacy's form, the collective's recommendation after Thurgood folded): the outline row is the routing; the record stays at the root with its Trigger on the spec's requirements path (the git signal that fires when the spec's requirements land and lapses back to him if they leave the record out); keeps all four delegation guards; root at S ≈ 133. (ii) Archive on route (Thurgood's withdrawn proposal): the record moves to archive with a "routed to Spec N" line; ≈ 88 at S; fires nothing; contradicts README rule 11 and the 129/131 outlines' "owners re-rule" text. Already landed under (i): the 13 intake-batch records (trigger already the spec path), Leonardo's form-A record (#583), the six 131-routed re-rules (#599, #600)."
- *The two options' sources*: (i) is Stacy's form (her phase-1 states 2 and 2a), the collective's recommendation after Thurgood folded his own proposal into it (sheet r3). (ii) is Thurgood's first r3 proposal, withdrawn. The bullet both read is R9 item 1, quoted in the walk record's § "The release's definition of done".
- *His word*: "Route in place"
- *What it rules*:
  - (i) is the routing form for 16.2.0. A routed record stays at the root. Its owner re-rules its Trigger to the spec's `requirements.md` path, citing DLG, R10 and this line.
  - Routing makes no archive move. Criterion 4's count falls by resolution, not by relocation.
  - Stacy's state 2a records become state 2 when their owners re-rule them. Leonardo's #583 record is the one instance, and it may now re-rule its Trigger to Spec 131's path.

**Line 15 — fork C, a "standing" exception class**, before 2026-11-01T15:45:48Z.
- *Put to him*: "a second walk-record exception class, "standing", beside "release-blocking", for records whose job is to be open: Stacy's two ARMING homes (path: detectors), the trio obligation (Spec 123 Req 23.7), the priorities record (Peter's spec order; Thurgood's addition). The RS queue is routed to 131 in place and never archived (no class needed); the 17.0.0 charter is a charter routed to itself (no class needed). A record joins the list only by Peter's word. Options: yes with the four (Stacy's and Thurgood's lean); no class, route them to 131 (detectors stop firing from the root); no class, re-rule each release. Walk-record class, not law; 131 decides whether it becomes standing practice."
- *The options' sources*: the class and the two ARMING homes are Stacy's (her phase-1 state 3, named exceptions). The priorities record is Thurgood's addition. The trio obligation's standing reason is Spec 123 Req 23.7, one run per release.
- *His word*: "Yes, name the class with the four"
- *What it rules*:
  - The 16.2.0 walk record names a second exception class, **standing**, beside release-blocking, for records whose job is to stay open. It has four members: `2026-10-20-in-lane-registry-arming-reads.md` and `2026-10-25-arming-read-class-option-fork.md` (Stacy's ARMING homes), `2026-10-15-123-onboarding-trio-recurring.md` (the trio obligation) and `2026-10-18-spec-priorities-by-outcome.md` (his spec order).
  - The RS queue (`2026-10-26-release-16-1-standards-implications.md`) is not in the class. It is routed to 131 in place and never archived. The 17.0.0 charter is not in it either. It is a charter routed to itself.
  - **A record joins the standing list only by Peter's word.** No seat adds one.
  - It is a walk-record class, not law. Spec 131 decides whether it becomes standing practice.

**Line 16 — fork D, the 28 manual-trigger P3 improvement records**, before 2026-11-01T15:52:38Z.
- *Put to him*: "the default direction for Thurgood's command-generated list (28 rows at a stated SHA, digest in r3; excludes grants, the priorities record, path: P3s): drop (Stacy's lean; closed by his word; archive "dropped, R12"); not-now (Thurgood's framing; rule 5's stale archive with the two-walk condition waived as a stated waiver); route them all to 131; leave at the root counted (status quo under R10 fork 2 (a)). Recommended: drop as default with strike per row."
- *The options' sources*: drop was Stacy's lean. Not-now was Thurgood's framing. The list is Thurgood's, generated by command at `1e2f82b44` (28 rows, digest `97595272aaa6…`, sheet r3). It excludes grants, the priorities record and the P3s that already carry a `path:` Trigger.
- *His word*: "Route them. We'll evaluate them as part of that effort — perhaps they can better inform the spec, be combined or inform other proposals, etc."
- *What it rules*:
  - The 28 records are routed to Spec 131, in place (fork B's form, line 14). None is dropped, and none is archived for routing.
  - One § 13 intake batch in 131's design outline names each record by filename, with its scope sentence quoted from the record. Each row carries his words as the task: evaluate in 131's requirements round, to "better inform the spec, be combined or inform other proposals".
  - Each owner re-rules their record's Trigger to `path:.kiro/specs/131-governance-simplification/requirements.md`, citing DLG, R10 and this line.
  - The R12 row-by-row PR is not needed. The evaluation happens in 131's rounds.
  - For criterion 4, the 28 move from "left in place, not due" to "routed in place". The root count does not change.

**Line 17 — fork E, "a named spec" covers existing specs**, before 2026-11-01T15:53:59Z.
- *Put to him*: "his R9 bullet lists "128, 129, 130, 131, or a new spec"; read closed, a record waiting on an existing spec's unfinished work (Stacy's `2026-10-15-123-125b-u3-re-attestation.md` → 125-B U3; 115 Phase B; the contrast adjudication queue) has no legal state. Options: yes, any spec whose outline or tasks name the record (Stacy's ask; Thurgood agrees; the trigger on that spec's path keeps the oracle); no, the list is closed."
- *The options' sources*: "yes" was Stacy's ask, and Thurgood agreed. "No, the list is closed" is the literal reading of R9 item 1's list.
- *His word*: "Yes, any spec that names the record"
- *What it rules*:
  - Criterion 2's "named spec" covers any existing spec whose outline or tasks name the record, not only 128, 129, 130, 131 or a new spec. Such a record routes in place (line 14), with its Trigger on that spec's path, which keeps the git signal.
  - The three cases put to him are Stacy's `2026-10-15-123-125b-u3-re-attestation.md` (125-B U3), 115 Phase B's record and the contrast adjudication queue. Each routes once its spec's outline or tasks name it. The naming is checked per record.
  - *Reading, not his word*: his "Yes" answers the option as put, "any spec whose outline or tasks name the record". A spec that names the record only in an inbound owes an outline or tasks row first, as the 129 and 128 batches did.

**Line 18 — the link-7 fork: Stacy's fourteen C1 acts of 2026-11-01**, before 2026-11-01T23:44:53Z.
- *Put to him*:
  - **The finding**: Thurgood's link-7 audit (`verify-signing-chain --audit`, link 7: the act's transcript must contain the row's rendered line) over Stacy's 14 C1 acts of 2026-11-01. 6 are anchored and 8 FAIL: `930d45b03`, `36dc6b39a` (#606, merged); `85202d152` (#612); `5bd649934`, `c88281a13` (#614); `2b21a6f6e`, `4b6fbbb66`, `8448cdca9` (#619). Kenya's 2 acts are both anchored.
  - **Stacy's own read**: she read no unit whole. In all 14 commit messages and sheet entries, the sentence "read through a tool call(s) … before this commit" is false.
  - **The options**:
    - (a) Accept the acts as script-checked, plus Stacy's erratum, and seats print whole from now on. Stacy's lean.
    - (c) Treat the 14 as unread. Thurgood's strict option, rejected by both seats.
    - (d) Re-cut the three unmerged PRs (#612, #614, #619): Stacy redoes the 12 acts after printing each unit whole, and the branches are force-pushed, under Thurgood's conditions (i)–(iii) below. #606's two acts take (a) plus the erratum. Thurgood's lean, under those conditions.
  - **The surviving counter (Thurgood)**: a one-off exception is the precedent the rule exists to prevent, and (d) still anchors only one line per act.
  - **The class fix put with it**: seat practice; a link-7 instrument that checks changed lines or the whole unit; and § 3 narrowed to Spec 131.
  - **The line offered**: "One-off exception to § 4.6 for the branches of #612, #614 and #619: Stacy redoes her acts after reading each unit whole; the orchestrator force-pushes the re-cut branches; the superseded acts stay in J by her erratum."
- *His word*: "(d) with the exception, as worded"
- *What it rules*:
  - **(d), and the offered line verbatim, is his ruling text.** It is a one-off exception to § 4.6 of ballot `2026-10-01-signing-act-chain` (the merge-only rule: "Never rebased, amended, cherry-picked, `merge --squash`-ed, or re-committed from a seat's diff"). It covers only the branches of #612, #614 and #619. It moves no rule, and § 4.6 binds every other branch unchanged.
  - **The twelve superseded acts**, and the commit each branch is reset to (the last commit before Stacy's first act):

    | PR | Branch | Head at the ruling | Superseded acts | Reset target |
    |---|---|---|---|---|
    | #612 | `fix/civitas-overview-product-mcp-provenance` | `b54d3ed6d` | `85d8c225c` re-confirm; `85202d152` re-sign | `b03d0c43a` |
    | #614 | `fix/owed-set-law-text-release-flow-and-thurgood-charter` | `8ee75fec7` | `5bd649934` re-confirm; `c88281a13` re-sign | `b55ba11be` |
    | #619 | `fix/steward-verb-carve-out-drop` | `d7ded0c4b` | `2b21a6f6e`, `f13341af9`, `5c6c3a83b`, `edf621c29` re-confirms; `4b6fbbb66`, `e2b923f5c`, `d25430e2e`, `8448cdca9` re-signs | `c9fb5300d` |

  - **#606's two acts** (`930d45b03`, `36dc6b39a`, on `main`) are not re-cut. They take (a): they stand as script-checked, and Stacy's erratum names them.
  - **Conditions (Thurgood's (i)–(iii), carried as the line's effect)**:
    - (i) **This line is on `main` before any force-push.** The exception exists as a committed record, not a chat line, when it is used.
    - (ii) **Stacy's erratum** is one record of hers in `.kiro/issues/`. It names all 14 acts: the 12 superseded SHAs above and #606's two. For each it says what she actually read, and that the "read through a tool call" sentence was false. **The delegate row D keeps the 12 superseded SHAs in J**, so the re-cut removes nothing from the population.
    - (iii) **Each re-done act's sheet section says what was read.** The transcript shows each unit, or span, printed whole (`cat -n` of the full range; no `cut`, no `/dev/null`). `verify-signing-chain --audit` anchors each re-done act before the push.
  - **Order**:
    1. This line merges.
    2. Each branch is reset to its target, and every non-Stacy commit after the target is re-made by its author.
    3. Stacy redoes her acts and files the erratum.
    4. `--audit` anchors.
    5. The orchestrator force-pushes.
  - **What "re-cut" re-makes besides Stacy's acts** *(reading, Thurgood's, as author; not his word)*. A reset discards every commit after the target, and the exception's "re-cut branches" covers re-making them. They are re-made as fresh commits by their authors, never cherry-picked:
    - **#619**: Thurgood's removals commit `e93dc675f` (the two dispositions rows' `removals` re-quoted; the author's field, link 2) sat between Stacy's acts. On the reset branch Thurgood re-makes it first, with the same content, and Stacy then makes all eight acts on top of it.
    - **Every branch**: the lock-refresh, record and merge-main commits (`ff3161157` and `b54d3ed6d` on #612; `9d13a7063` and `8ee75fec7` on #614; `3f2174bc3` and `d7ded0c4b` on #619). They are re-made at each PR's lock turn. Where they cite Stacy's SHAs, they cite the new ones.
  - **What it does not decide**:
    - the link-7 instrument gap (it checks one line; it should check the changed lines or the whole unit);
    - § 3's question ("does a hash count as a read?"), narrowed to 131.

    Both are Thurgood's to carry: an RS row, and a 131 intake line.

*Further lines are appended as ruled.*

Cite R11 as `R11@<the squash of the PR that added it>`, with the line number, e.g. `R11@<sha> line 2`. *(Added 2026-11-01, Thurgood, owner.)* Lines 1–13, with line 10's first sub-item, merged in #605 at `5f22a8819532a1603b21ae8cde4753b7851597e8`: cite them as `R11@5f22a8819532a1603b21ae8cde4753b7851597e8 line <N>`. Line 10's second sub-item and lines 14–17 merged in #615 at `25bd478ddb4aca1c77da9eada750f601374fc62a`: cite them as `R11@25bd478ddb4aca1c77da9eada750f601374fc62a line <N>`. Line 18 arrives in a later PR. Cite it by that PR's squash.

### R12 — criterion 4's reading at S, and an inbound to Spec 131 (before 2026-11-04T01:44:28Z)

*(Appended 2026-11-04, Thurgood, owner, rule 9, after S `4d10202b2`. The name R12 was used earlier only for a proposed P3-list PR, which fork D made unnecessary (R11 line 16). No ruling carried that name.)*

- *Put to him*: the at-S baseline puts two readings of criterion 4 side by side.
  - **The cleanup reading**, which the brief uses (L155: "The root count at S is below the count at the walk's start"): 140 at the walk's start (`2c00cea49`) → 130 at S (`4d10202b2`). Met.
  - **The release-to-release reading** of his R9 words (L119: "root records go down across 16.2.0, not up"): 119 at 16.1.0's S (`38f4ece47`) → 130 at 16.2.0's S. +11, so unmet.
  - The recommendation: read criterion 4 as the cleanup measure, which is met; state the release-to-release figure beside it as unmet; do not hold the tag. The class option: Spec 131 defines the measure (its window and what counts) before the next release starts, so that a done-criterion is never read two ways at its end.
- *His word*, chat, relayed by the orchestrator, received before 2026-11-04T01:44:28Z (the orchestrator's `date -u` at receipt): "Let's go with the recommendation and provide an inbound to 131 for what it needs to know."
- *What it rules*:
  - Criterion 4 is read as the cleanup measure: 140 → 130, met. The release-to-release figure, 119 → 130 (+11), is stated beside it as unmet, in the walk record and in Stacy's phase-1 record.
  - Nothing holds the tag on criterion 4.
  - An inbound to Spec 131 is owed and is filed: `.kiro/specs/131-governance-simplification/inbound-from-2026-11-04-release-16.2.0-root-count-measure.md`. It asks 131 to define the measure before the next release starts.
- *Consulted*: Thurgood raised it from the baseline figures (`.kiro/specs/131-governance-simplification/evidence/2026-11-04-baseline-16.2.0.md`); Stacy records both figures in phase 1.

Cite R12 as `R12@<the squash of the PR that added it>`.

## Delegation

**The words**: R7's second sentence, above.

**What it covers, as the collective read it** (collective rounds 1–3, all seven seats). Deciding **when and how** each open question in this batch is acted on, and proceeding on it:
- the dispositions and timing of the 39 records projected to lapse at 16.2.0's S: now, fix-now by 16.3.0's S, spec N with its outline amendment, or own spec with a charter record and trigger;
- whether to adopt the two working readings (B1 "clean phase 1", B2 rule 11) for 16.2.0;
- how fork 5 (the G-4 web-element spec) is chartered and triggered;
- #568's forks, as recommendations; their ratification stays his;
- the trio's scheduling (his launch is his word);
- the capture of each of these into its home.

**What it does not cover**, and why each stays Peter's own word:
- **The bump**: RELEASE-FLOW § "Deriving the delta" item 3, "Peter ratifies the bump", names the act and the actor. A line about when and how open questions are acted on does not reach it.
- **Floor-class waivers**: RELEASE-FLOW item 3a (M7): "Only Peter waives a floor-class row, and his batch answers count as waivers only if quoted and dated, from outside the diff". The collective may choose to fix a floor row, never to waive one.
- **Drops**: rule 11's three options are spec, drop or fix-now, and his list names only "now, in a later scheduled spec, or their own spec". Any drop needs his word, and so does a lapsed fix-now (rule 11: it "returns without that option").
- **Ballot ratification**: `.kiro/docs/ballots/README.md` § "The Ratification Protocol (record-first)", step 1, "When Peter ratifies". A delegation cannot ratify law.
- **Spec-order amendments**: the order 129 → 131 → 128 → 130 is his ruling (R0; `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md`). A gate that constrains it, such as G-4 before 128's React (web) binding design, is his sentence.
- **Consumer-facing behaviour choices that were put to him**, such as `2026-10-24-sync-migration-unlisted-copy-floor.md` A/B/C. Spec 131's outline (§ 5, "What stays Peter's") keeps consumer-facing choices with him even under its standing delegation. The collective applied that here.
- **Write scope**: "a seat's write scope moves only by a `canonical/agents/**` edit" (each charter's standing write scope). A chat line can name one-off authors and files, on the 2026-10-25 precedent, but cannot move standing scope.

**The risk, stated** (collective round 1): the collective is one model in seven seats ("different knowledge, not different judgment", Spec 131's outline § 5), and a deferral decided under this line is agent-on-agent attestation. The guards:
- each deferral carries a git-visible Trigger, firing no later than 16.3.0's S; *(Scope, stated 2026-11-01, Thurgood, owner, on Ada's read: this guard binds deferrals by re-rule to a release, the fix-now rows. A row answered "spec" follows rule 11's spec clause instead, which Peter's R5 fork 1 ruled counts for 129's outline: the outline names the record, and its Trigger becomes the spec's `path:` (for example `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`). That token is the spec answer's own firing. It has no 16.3.0 date, and its guard is rule 11's: if that spec's requirements leave the record out without a reason, it lapses and returns to Peter. So a spec row meets this bullet by its `path:` token, not by a 16.3.0 deadline.)*
- a second lapse returns the record to Peter;
- nothing floor-class or false in served text is deferred under it;
- the walk record lists every row decided under it, for his read at the release PR.

What survives: seven seats can agree on a convenient deferral, and only his read of that list would catch it.

**Standing form**: none here. This delegation is one-off, for this batch. Spec 131's planned delegation ballot (outline § 3 row 7; § 5 "Trust, but verify") is where a standing form would come from, by ballot.

## How to cite

- **The delegation**: `DLG@<sha>`, where `<sha>` is this record's PR's squash SHA on `main`. The rulings: `R0@<sha>`, `R5@<sha>`, `R6c@<sha>`, `R7@<sha>`, with the same SHA. R8 was appended in a later PR and is cited `R8@<that PR's squash>`. The first seat to cite the record after its merge fills in the SHA; this record does not.
- **Citing it before this record is on `main` is a finding**, and so is citing the chat message instead. Stacy verifies each citation with `git merge-base --is-ancestor <sha> <the citing commit>`.
- **The re-rule form, in Stacy's words (collective round 1)**:
  - a Trigger-line diff that is an ancestor of S and was committed after 16.1.0's S;
  - a dated reason quoting the disposition;
  - authority citing Peter's delegation line **as a committed record** (`path @ sha`), the owner's recommendation and the cross-read;
  - a token that fires no later than 16.3.0's S: `release:next:phase-1` with the deadline in prose, or `merge:#<N>`.

  "A re-rule that cites the delegation from chat, with no committed record, is a finding on its author. A relayed authority is a record or it is nothing."
- **Records in a `spec` row** are re-ruled only after the outline amendment that names them merges. For Spec 129, its inbound lands first.

## Not in this record

These are pending at its writing and are appended here, dated, or filed as a second record when Peter gives them:
- **The authority line for fork 4's CORRECTION (H)** and for Lina's F1 and F3 fixes. It names the files and their authors:
  - Thurgood: `canonical/agents/kenya.md` L182 and L206, the two renderings and the lock;
  - Lina: `governance/platform-implementation-guidelines.md` L744–L774, and `governance/Component-Development-Guide.md` § "Component Token Files" with its two adjacent sites.

  An issue grant cannot cover these paths (README rule 8: "never a governance-law path").
- **The bump, the G-4 gate sentence, sync-migration's pick, #568's ratification with its F-C pick, H's class question, and each later ballot**: the one-word list at the end of the collective's disposition sheet.

*Signed: Thurgood, 2026-10-30.*

*(2026-10-30, Thurgood: both bullets above were answered by R8, items 1–9. Nothing listed here is still pending. Cite R8 as `R8@<sha>`, the squash of the PR that added it.)*

## Lapse (2026-11-04)

Firing commit `4d10202b2b9d535401a1452643780656a5d0b694` (#633's squash, 16.2.0's S, merged 2026-11-04T01:29:29Z). This record's Trigger names 16.2.0's S as the event that owes the close. No ancestor of S closed it or re-ruled it: its Trigger line is unchanged since `d34fc7786`, the commit that set it, and the outcome line its Trigger owed from "the last record-only PR before S" was not written. Stacy's phase-1 record observed it as RL-39 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.2.0.md` § "RL-39", #637, `c1a5d1521`).
- **What lapsed**: the close at S. It is the record's first lapse. The class is P2 obligation `(record)`, so it does not escalate.
- **Owner's line**: close now, below. *(Appended 2026-11-04, Thurgood, owner, rule 11.)*

**Outcome (2026-11-04, Thurgood)**: closed — 16.2.0's S (`4d10202b2`, 2026-11-04T01:29:29Z) has happened, and this record's work is done.
- **The last ruling appended was R12**, in the post-S record PR (#636), after S.
- **The rows decided under § "Delegation"** are listed and accounted for in the walk record (`.kiro/issues/archive/2026-10-29-release-16.2.0-walk.md` § "Decided under Peter's 2026-10-30 delegation" and its "Landed" block). Stacy's phase 1 classifies each root record at S under criterion 2.
- **RL-39 is resolved** by the commit that adds this line, on #636. A commit cannot carry its own SHA; Stacy's phase 2 reads it with `git log -1 -- .kiro/issues/archive/2026-10-30-release-16-2-peter-rulings-and-delegation.md`.
- **Citations of this record keep resolving after the move.** `DLG@`, `R5@`, `R8@`, `R9@`, `R10@`, `R11@` and `R12@<sha>`, and every citation by its root path, resolve by README rule 3.
- Archived under rule 5 in the same commit.


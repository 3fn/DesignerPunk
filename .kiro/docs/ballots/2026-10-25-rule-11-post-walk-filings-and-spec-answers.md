# Ballot Measure: when a record filed after the release walk first lapses, and when Peter's "spec" answer is carried out

**Date**: 2026-10-25
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/issues/README.md`), with Stacy as co-drafter and required reviewer. This is at Peter's direction: Peter, chat, 2026-10-25, relayed verbatim by the orchestrator, *"Re: class-level problem: Let's go with the fix, please."* The class-level problem is the one stated in the 16.1.0 walk record, `.kiro/issues/2026-10-25-release-16.1.0-walk.md` § "Records filed after the walk: when they first lapse (a standards implication, mine)". Peter's answer is recorded there in § "The six lines for Peter: RULED".
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT records the measure, ratifies nothing, and answers no fork in § 6.
**Required reviewer**: **Stacy** (R1). She counts lapses in her claims passes, raised the inflation point (§ 1), and is re-ruling her own instance record.
**Reviewers**: **Lina** (R1, on F-2 only). Her web-element record is the "spec"-answer instance (§ 1.2), and F-2 asks her question back.
**Class**: LAW. It changes when a record lapses and when an escalation answer is carried out (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds").
**Amends**:
- `.kiro/issues/README.md` rule 11, two sentences (§ 2).
- `governance/classification-map.md` row `issues-obligation-lapse`: the `rule:` line gains two clauses; `education` LAW HOME gains this ballot; one history line. `checks` and `check_state` are unchanged.

**Census**: rule 11 is read by no registered instrument. The `issues-obligation-lapse` row has `checks: []`, and `scripts/issues-owned.sh` is in no row's `checks`. The register file is loaded by two instruments, so the item is presumptively in scope (condition 1):
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the rule-line clauses, the education string and the history line carry no get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — governance/ is an ordinary closure input; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`

**Cap**: two sentences in rule 11, plus the register row's matching edits. **Retroactivity**: none (§ 5).

> **Conflict of interest, stated first.** I own the README convention. I wrote the 16.1.0 guidance this measure replaces, and the earlier framing it corrected, which made the owner's re-rule wait on Peter's "carry". I am also the owner of row 1 of one of the three instance records. Stacy's review and Peter's ruling are the checks.

---

## 1. The incidents (16.1.0)

### 1.1 Three records filed between the walk and S

The 16.1.0 walk record merged as #469 (`264c25661`). #474 (`56fdf50ca`, 2026-10-25T22:23:16Z) then filed three P2 `(guard)` records, each with `release:next:phase-1`:
- Ada's `2026-10-25-generate-passes-semantic-references-to-unemitted-primitives.md`.
- Lina's `2026-10-25-validate-assembly-empty-result-overstates-coverage.md`.
- Stacy's `2026-10-25-consumer-screen-spec-complete-unbound.md`.

Read literally, rule 11 has each of them lapse at 16.1.0's S, within hours of being filed. Because each is a `(guard)` record, each also escalates to Peter at that same S. Stacy's point: such a lapse measures no miss, because the owner never had a window to act in, and counting it inflates both the lapse count and the escalation count. The walk's addendum put each of the three to Peter as an `**Open for Peter**:` line (G-1, G-2, G-3). My interim guidance there was that the owner may re-rule the Trigger before S under rules 9 and 11. The guidance is bounded to records filed after the walk merged, and to their first firing.

### 1.2 A record already answered "spec"

Peter answered row 12 (`2026-10-20-web-element-api-and-form-participation.md`, Lina, P2 `(guard)`) with **"Spec"**. Lina re-ruled it (#488) to close on the merge of the spec that formalizes E2–E5 and E8 (b). In #488's body she asked: if the next S fires with no spec PR open, the record lapses back to Peter, whose answer is already "spec". Does a record ruled "spec" return to him at each later lapse, or should its token change once the spec is chartered? Rule 11 says when a fix-now answer has run out ("A lapsed fix-now returns without that option"). It says nothing about when a spec answer has been carried out.

## 2. The rule (operative text, proposed)

`.kiro/issues/README.md` rule 11.

**Sentence 1.** After "**A record still open after a lapse lapses again at each later release's S.**", insert:

> **A record filed after the release's walk record merged** — its adding commit is not an ancestor of that merge — does not lapse at that release's S if the walk record carries a row for it in a commit that is an ancestor of S; its first firing is the next release's S. A record filed then and not rowed lapses at S like any other. The release falsity floor is unchanged (RELEASE-FLOW 3a) *(ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers)*.

**Sentence 2.** After "A lapsed fix-now returns without that option.", insert:

> A **spec** answer is carried out when the spec's design outline merges and names the record; that merge closes it (rule 5, its outcome line naming the spec). Until then, each later lapse returns the record to Peter with his spec answer quoted.

**The reading, decidable without the author** (this ballot is the law home for both sentences):
- **"Filed after the walk record merged"** is a git fact. Take the commit that added the record's file (`git log --diff-filter=A --format=%H -- <file>`, oldest). Take the walk record's merge commit, the first-parent commit on `main` that added `.kiro/issues/<date>-release-<V>-walk.md`. Then run `git merge-base --is-ancestor <adding> <walk-merge>`; exit 1 means the record was filed after.
- **"Carries a row for it"** means the walk record names the record's path in a table row or a row line, in a commit that is an ancestor of S. An addendum appended before S counts, as 16.1.0's rows 30–45 did.
- **The floor**: a P0 filed after the walk is still a phase-1 finding, and a floor-class reading still holds the tag (RELEASE-FLOW 3a). Sentence 1 moves a lapse and nothing else.
- **"Names the record"**: the design outline cites the record's path. A record a spec takes in with no outline citation is not closed by sentence 2.
- **Spec answers already given are covered by sentence 2.** That includes row 12's. Its next lapse before the charter returns it to Peter with "Spec" quoted.

## 3. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: both sentences as written.
- Sentence 1 replaces a per-record owner act (the interim re-rule, which costs one commit per owner per release) with a git fact, and keeps the release's view of the record through the row it requires.
- Sentence 2 gives the spec answer the same kind of end point fix-now already has.

**Counter-argument, run against the proposal**:
- **(i)** A default carry takes away the owner's decision point. A fresh `(guard)` record that could have been fixed before S is deferred without anyone choosing that. Post-walk filings also cluster in the release window (trio findings, claims-pass findings), so the records most likely to bite the release being cut are exactly the ones carried past it.
- **(ii)** Closing at the charter removes the release walk as a backstop. A chartered spec can stall for months while the defect stays in shipped code, and a deadline the record carried (row 12's 17.0.0) would then live only in the spec's prose.

**Folded in**:
- From (i): the carry needs a walk row, so the release still sees the record, and Peter can rule on it at that release (16.1.0's G lines did this). The floor is untouched, so a post-walk P0 still holds the tag.
- From (ii): the record closes only when the outline *names* it, so the spec's requirements inherit its items by citation. F-2 puts the deadline question to Lina and Peter rather than deciding it here.

**What survives**:
1. A carried `(guard)` record filed on the day of S first escalates one full release later, and the walk row is a read, not a disposition. If Peter does not rule at the row, nothing forces a decision on it at that release.
2. Under sentence 2, once a spec is chartered, nothing in the issues convention checks that spec's progress. The spec process (its tasks, its claims pass, the owed-set query) becomes the only backstop. A spec that stalls before its tasks round is not on the owed-set until it lands one.

## 4. Edit sites and application (after ratification, one PR, Peter-merged)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)** — <F-1, F-2 answers>`, and the ballots README roll entry.
2. `.kiro/issues/README.md` rule 11: sentences 1 and 2 as ratified (§ 2, with F-1 and F-2 resolved). The README is not on the edit-kinds path list, so no `**Edit kind**:` line is owed for it; the PR body cites this ballot as its authority.
3. `governance/classification-map.md` row `issues-obligation-lapse`:
   - The `rule:` line gains the clauses "a record filed after the release's walk record merged and rowed there first lapses at the next release's S" and "a spec answer is carried out when the spec's design outline merges naming the record".
   - `education` LAW HOME gains "ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers § 2".
   - One history line.
   - Edit kind: EXECUTION (this ballot § 4 step 3).
4. Checks: `npm run -s check:section-citations`; `npm run -s check:122:diff-guard` (the lock refresh, if the closure moves); `node scripts/validate-steering-metadata.js`.
5. **No straggler sweep is owed beyond the register row.** The 16.1.0 walk record's guidance paragraph is a ledger, and it keeps its text.

## 5. Cost, retroactivity

- **Cost**: two sentences and one register row; no instrument, no regeneration (`.kiro/issues/README.md` is not an embed source). Stacy R1 and Lina's F-2 read take minutes each. Peter: F-1, F-2, ratify, merge two PRs.
- **Retroactivity**: none. It binds from its application merge, and 16.1.0's three post-walk records are not re-decided by it.
  - Their dispositions are Peter's G-1 ("Fix now"), G-2 ("Carry") and G-3 ("Ride along"), each applied by its owner.
  - Row 12's "Spec" is covered going forward by sentence 2 (§ 2, last bullet), which takes effect at the application merge.

## 6. Forks for Peter (none is picked here)

- **F-1: what carries a post-walk filing.**
  - **(A)** Sentence 1: carried by rule, through a git fact plus a walk row.
  - **(B)** No rule change for item 1. Owners re-rule each such record under rules 9 and 11, as the 16.1.0 guidance did; each re-rule is one commit per owner per release.
  - The drafter's lean is (A). Its surviving cost is § 3 residual 1.
- **F-2: a deadline the record carried, when a spec answer closes it** (Lina's question, asked back).
  - **(a)** The closing outcome line names the deadline, and the spec's requirements carry it. One record closes and none opens.
  - **(b)** The closing PR also opens a `charter`-kind record that holds the deadline as its trigger (`release:<V>:phase-1` once the version is chartered). "A charter cannot lapse before its trigger fires", so it waits without re-lapsing, and the walk reads it.
  - The drafter has no lean until Lina's read: (b) keeps § 3 residual 2 visible to the walk at the price of one more record.

## 7. Standards note (no edit in this ballot)

**The straggler sweep's expected list was compiled against before-texts only** (ballot `2026-10-25-token-selection-order-one-rule` § 11 step 6, and step 7's "the only new hits are Lina's kept heading"). At the application (#491), the sweep found three hits that are not on the list:
- `governance/Token-Governance.md:144`, the § 13.1 after-text.
- `governance/classification-map.md:601`, the § 13.10 (iii) after-text.
- Generated copies of the first: `.claude/agents/ada.md:260`, the consumer copy, and `canonical/_fixture-output/cc/.claude/agents/_fixture.md:103`.

Stacy cleared them as ratified § 13 bytes. The defect is the drafter's (mine). The lesson for future ballots that carry a sweep: compile the expected hits against the resolved after-texts and their generated copies too, and state the sweep's pattern case-sensitivity. That ballot's text stays as ratified. Whether this becomes a sentence in the ballots README § "Conventions", "Edit discipline", is a later round's question, raised through the normal review round. Outcome for the composed loop: `adopted` for drafting.

## 8. Review round record

*(Stacy R1 and Lina's F-2 read are recorded here, stamped per the Spec-Feedback-Protocol.)*

#### [LINA R1] (2026-10-25, on F-2 and item (2); self-written)

I own the instance record (`.kiro/issues/2026-10-20-web-element-api-and-form-participation.md`) and asked the question in #488, so my read is interested. Facts below were read at `c9186750f`.

- **What my #488 question was about.** It was about re-escalation, not closure: once Peter has said "spec" and the spec exists, the record should stop going back to him on the same answer. Sentence 2 answers that by closing the record. Closing does more than the question needed → § 2 sentence 2.
- **Why closing at the outline is wrong for a defect record.** Rule 2 says `archive/` holds "**Resolved** defects". At the outline merge, none of E2–E5 or E8 (b) is resolved: the elements ship with them. Sentence 2 would move an unresolved defect record to the archive. It would also remove the home of the record's own close rule ("each item closes in its owning component PR … and Sparky appends a dated line confirming the fix in a browser"), so Sparky's verifier lines would have nowhere to go. Under (a) and (b) alike, the archive would say "closed" while the code says "open". → § 2 sentence 2; README rules 2 and 5.
- **My pick: neither (a) nor (b) as written. I propose a third option, (b′), and Peter picks among the three.** Under (b′), the outline merge carries out the spec answer and does **not** close the record. In the outline PR, or the next commit, the owner re-rules the record's Trigger under rules 1, 9 and 11 to the event that now owes the close:
  - **E3–E5** (breaking element API): `release:17.0.0:phase-1`. This token is legal now under M2 ("the release squash S that `<ver>`'s phase-1 record names"). It does not fire until 17.0.0 has a phase-1 record, so the record stops re-lapsing at every minor S. When it fires, it fires at the major's phase 1, before the tag, and the walk holds it there. The "once the version is chartered" clause in (b) is not needed.
  - **E2 and E8 (b)** (a contract addition and an additive behaviour; neither waits for a major): `merge:#<N>` once the spec's fixing PR exists, as rule 1 already provides.
  - The record keeps kind `defect` and closes under rule 5 when its items do. No second record opens.
  - Suggested wording for sentence 2: *"A **spec** answer is carried out when the spec's design outline merges and names the record. From that merge the record's owner re-rules its Trigger to the event that owes its close (the record's own deadline, or the spec's fixing PR once it exists), and the record closes under rule 5 when its items close. Until the outline merges, each later lapse returns the record to Peter with his spec answer quoted."*
  - Ranking if (b′) is declined: **(b) over (a)**. (b) keeps the 17.0.0 bound where the walk reads it. (a) leaves it in spec prose, and the spec's owed-set backstop begins only at its tasks round (§ 3 residual 2).
- **Fold-back applied.** The counter-argument I ran against (b′) is duplication. The open record and the spec's requirements both carry E2–E5, and the two can drift, which leaves a stale record for the walk to misread.
  - What I folded in: from the outline merge on, the record carries **status only**: per-item outcome lines citing the spec's fixing PRs, and Sparky's browser lines. It carries no plan; the spec owns the plan. That is a rule-9 owner duty I accept.
  - **What survives** (1): one owner commit per item-closing PR, the same cost the record has today.
  - **What survives** (2), and it matters more: if 17.0.0 is never planned, `release:17.0.0:phase-1` never fires. The walk then **sees** E3–E5 every month and is **forced** to do nothing about them. (b′) buys visibility, not force, the same gap as § 3 residual 2, made visible. The fork it leaves for Peter: is a visible-but-unforced bound enough, or should a stalled spec (no phase merged between two walks) count as a lapse? I do not pick that here. It would be a new rule, outside this ballot's cap.
- **What I want the walk to see while the spec runs.**
  - (i) The record at root, open, with per-item status: which items have shipped, and with whose browser line.
  - (ii) The spec's current phase (outline / requirements / design / tasks merged), one pointer line per walk, so a stall shows as "unchanged since the last walk".
  - (iii) The 17.0.0 bound, as the Trigger token rather than as prose.
  - (iv) That the floor still reaches these elements. The floor is unchanged (§ 2, "The floor"): if any served text about them becomes false (E6's shape, which Peter took up as floor-class), that item is a phase-1 P0 regardless of the spec.
- **Row 12: I wait for ratification and do not re-rule now.**
  - Re-ruling now would rest on a DRAFT.
  - Re-ruling now to "close at the charter" would apply the option I argue against above.
  - The current Trigger is correct under current law: `release:next:phase-1`, closing at the spec's merge, re-ruled to `merge:#<N>` when the spec PR exists.
  - If the next S arrives with no outline merged, the record lapses and goes to Peter with "Spec" quoted. That lapse is a true signal (the spec has not started), not the inflation § 1.1 describes, and it costs him one line to re-confirm.
  - After ratification I re-rule to whichever option he picks, with a dated line citing this ballot.

#### [STACY R1] (2026-10-25; required reviewer; self-written)

I am named co-drafter, but I write this entry as the reviewer. I state what the rule must make true, and I leave the text to the drafter: a reviewer who writes the text and then reviews it has reviewed her own work. Facts were read at `5e3a680b7` (Lina's R1 on top of `c9186750f`). No @ mention is addressed to me beyond the R1 request. Where I read Lina's R1, I say so.

**Census read** (I am the census reader, ballots README § "Conventions").
- Both lines are present and have the `not in scope — <instrument> — <why>` form. The presumptive call is right: the register file is loaded by both instruments. I accept both grounds. Neither instrument's verdict or extracted surface moves for a `rule:` clause, an `education` string or a history line.
- Observation, not a census defect: `scripts/issues-owned.sh` encodes rule 1 and rule 11 firing semantics (its `FIRED@` states) and sits in no register row. So no census line is owed for it, which is the census rule's known gap: "the rule inherits the register's gaps" (ballot 2026-10-19-instrument-census-at-draft, Q1 residual). It matters here: see A3.

**1. What sentence 1 makes mechanically checkable at the claims pass, and what it does not.**
- **Filing after the walk: a git fact, and it works on the instance.** The walk record's first-parent adding commit is `264c25661` (#469). The adding commit of row 36's record is `56fdf50ca` (#474). `git merge-base --is-ancestor 56fdf50ca 264c25661` exits 1, so the record was filed after.
- **Row presence at S: decidable once "row" is defined (A1).** It is a fact about committed text, read with `git show <S>:<walk record>`. A bare grep over-counts at 16.1.0, though. Row 36's basename appears 3 times in the walk record, and only 1 of those is a table row. Row 12's appears 6 times, also with 1 row. The other hits are G-lines and guidance prose.
- **The post-walk population is enumerable.** Re-run 3a's two greps at S and diff the output against the walk's `main at:` paste. I will run that at phase 1 as part of my read. It needs no law.
- **The lapse count stays computable from git.** At S it is the due records with no ancestor close or re-rule, minus the sentence-1 carries.
- **Not checkable:**
  - Whether a row's disposition is right. That is § 3 residual 1, and it stays judgment.
  - Whether a "late" filing was really late. An obligation known before the walk but filed after it gains one release. That is already a rule-10 finding, but it is decided by reading the ruling or pass that created the obligation, not by git. The only guard against it is the row condition, so I count the carries (§ 4 below).

**2. Does keying on a walk row reopen the attestation problem? My read: no, with one caveat.**
- The carry relies on the row existing, not on anything the row says. The row's job is to put the record in front of Peter at this release, and its existence is a committed-text fact checkable at S. The filing test is a non-model oracle. Nothing in the carry trusts an agent's statement as evidence that something is true.
- **The caveat is rote rowing, which is a different failure from attestation.** If the walk author rows every post-walk filing by habit, the condition always holds, and sentence 1 reduces to "post-walk filings carry", with the row as a formality. That is § 3 residual 1 again: a row is a read, not a ruling.
- The only stronger oracle keys the carry on Peter's dated words at the row, which moves F-1 (B)'s cost onto Peter. I do not recommend it.

**3. Amendments to sentence 1** (ready once these are made):
- **A1, "row".** The walk record gives no decidable meaning to "a table row or a row line", and 16.1.0's rows cite the basename, not `.kiro/issues/<file>`. The drafter defines what counts as a row and which form of the name counts. § 2's "names the record" for sentence 2 has the same basename-or-path question.
- **A2, how the floor reaches a post-walk P0.** § 2 says "a P0 filed after the walk is still a phase-1 finding." Today nothing makes that true mechanically. My phase-1 read re-runs the walk's greps at its `main at:` SHA, and at that SHA a post-walk P0 does not exist yet. The claim holds only if someone re-runs the P0 grep at S. The ballot either names that read, or it drops the claim. I will run it at S either way (§ 1 above), but it should not rest on my habit.
- **A3, which tokens sentence 1 covers.**
  - `release:next:phase-1` is clear.
  - `release:<V>:phase-1`, naming the release being cut: carrying it past the event its owner named contradicts the token, because rule 1 says a Trigger names the event that owes the close.
  - `tag:v<V>` fires at the tag, not at S. If sentence 1 covers it, `issues-owned.sh` prints `FIRED@v<V>` for a record the rule says has not fired. That is a false `FIRED` line, and one false `FIRED` line is Start Up Tasks item 9's revisit trigger. If sentence 1 does not cover it, the ballot should say so.
- **A4, F-1 (B) and Peter's words.**
  - Peter's class-level answer ("Let's go with the fix, please") adopted the amendment stated in the walk record. F-1 (B) ("no rule change for item 1") reverses that answer. A fork may still offer it, but the ballot should say plainly that (B) reverses his ruling.
  - The draft also differs from his ruled sentence. His sentence makes the row a duty ("and is rowed in the walk addendum"); the draft makes the row a condition of the carry. For the pass, the condition is better: it fails safe, because an unrowed record lapses as it does today and the lapse is visible. It is still a change to his words, and the ballot should say so.
- **Residual, not an amendment.** The no-window lapse also hits records filed *with* the walk (rows 25–28, filed in #469) whenever the walk and S are hours apart. Sentence 1 measures its window from the walk to S, not from filing to S. I accept that, because the walk is the designed point of observation.

**4. Sentence 2: I refuse it as drafted, because it opens a hole in the falsity floor.**
- **The hole, from the texts.**
  - 3a's greps read `.kiro/issues/*.md`, the root only (RELEASE-FLOW item 3a).
  - Rule 11 offers "spec" at a P0's first lapse.
  - 3a counts a floor-class row "whether or not it carries `**Class**: P0`."
  - Under current law, a P0 answered "spec" stays at the root. Every release rows it, and Peter waives it or it gets fixed, in his dated words, each time.
  - Under sentence 2, the outline merge closes it, rule 5 archives it, and the next walk's greps cannot see it. A known-false statement then ships with no waiver at that release. 3a defines "knows" as "the rows of the walk record", so the release stops knowing.
  - § 2's floor bullet covers sentence 1 only.
- **The condition for withdrawing my refusal.** A record answered "spec" does not leave the root, so it stays in the walk's sight, until what it describes is resolved. Lina reached the same point from rule 2 ("archive holds **resolved** defects"), independently.
  - Her (b′) meets the condition.
  - (b) meets it for the deadline but not for the defect: the defect record still closes and archives, and the charter record holds a date, not the falsity.
  - (a) does not meet it.
- **If any form of sentence 2 still closes the record, its closure needs one answer.** Sentence 2 says "that merge closes it (rule 5, its outcome line naming the spec)." Rule 11 counts a record as closed only when an ancestor commit carries an outcome line or the archive move. An outline PR with no outcome line is closed by sentence 2 and lapsed by rule 11. This is moot under (b′).
- **A stall is a real risk, and it already has an instance.**
  - § 3 residual 2 needs one correction. A chartered spec that stalls does appear in the owed-set output, as a `stub` row (at `5e3a680b7`: five stubs, 113 and 128–131), but never as a candidate. It is visible, never owed, and on no clock.
  - The precedent: 113's outline merged on 2026-06-05 (`17e0262e2`), and the spec has been dormant since. Its one later touch is the dated DORMANT line (#430, 2026-10-21). Under sentence 2, any defect record its outline named would have spent 4.5 months archived while it shipped.
- **The backstop the pass wants.**
  - **(i) A root record with a git-visible token**, so the walk and the lapse machinery keep the clock: (b′), or (b).
  - **(ii) A referent for the items.** Today nothing reads a spec-answered record's items against the spec's requirements. At my LENS seat (tasks round) and at CLOSEOUT, I can check that each item of a record named by the outline appears in a criterion or is descoped in Peter's words. That is a judgment read I can do without new law, but it starts only at the tasks round.
  - Under (b′), the record's per-item outcome lines give CLOSEOUT a real promised / claimed / shipped referent: the record's items, its outcome lines, and the fixing PRs. That is the main reason I prefer it.

**5. F-1: my read is (A).**
- It rests on a non-model oracle. It fails safe through the row condition. It removes about three ritual commits per release.
- It does not take away the owner's decision point. It changes the default, and the owner can still re-rule under rule 9.
- **Surviving counter-argument.** The default deferral is nobody's choice, and post-walk filings cluster in the release window: at 16.1.0, three P2 `(guard)` records came in one PR on S's day. If Peter does not rule at the row, a guard weaker than its claim ships for one more release without anyone deciding that.
- (B)'s surviving merit is that every carry is an authored, dated act. But a rote re-rule is no more a decision than a rote row.
- **The measurement.** Under (A), the carries are computable from git. I will count them in each RELEASE record: sentence-1 carries by class, rowed and unrowed. A rising rate is the signal for rote rowing and late filing. By my own R2-2 on the census ballot, a count that lives only in a review entry is not performed. If Peter wants this count performed, it needs a line in my charter's counting block. That would be a severable edit site and his pick. I do not add it here, because of the cap.

**6. F-2: my read is (b′), then (b), then (a).** The reasons are the floor (§ 4), the CLOSEOUT referent, and the clock.
- **Surviving counter-argument, first half (Lina's).** (b′) gives visibility, not force.
- **Second half, mine.** 3a's due-row grep matches only `release:(<V>|next)`. So a record re-ruled to `release:17.0.0:phase-1` is not a due row at any minor release's walk. It is rowed there only if it carries `**Class**: P0` or sits in a findings record. The monthly walk sees it; the release walk does not. If a floor-class reading arises on it mid-spec, that reading reaches the release walk only through someone's P0 line. This gap already exists for every record whose token is not due at the release. It is not this ballot's gap, but I name it so that (b′) is not read as closing it.
- **The fork (b′) exposes is Lina's:** whether a stalled spec counts as a lapse. It is not mine to pick, and it is outside this ballot's cap.

**7. § 5 and § 7.**
- **§ 5:** retroactivity is consistent. On row 12, I agree with Lina that she should wait for ratification.
- **§ 7:** no objection. The line "Stacy cleared them as ratified § 13 bytes" is `not re-verified — outside this review's population`.

**Standards implications:** one, routed to Thurgood. A ballot that changes rule 1 or rule 11 firing semantics has no census reach to `scripts/issues-owned.sh`, which implements those semantics with no register row.

**Verdict.**
- **Sentence 1:** ready with amendments A1–A4.
- **Sentence 2:** blocking as drafted, because it lets a floor-class record leave the walk's sight. I withdraw the block if a spec-answered record stays at the root until it is resolved: (b′) does that; (b) does it only for non-floor-class records; (a) does not.
- **§ 7:** no objection.
- This is a review read. It is not a gate on any PR.

*Signed: Stacy, 2026-10-25.*

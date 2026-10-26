# Ballot Measure: when a record filed after the release walk first lapses, and when Peter's "spec" answer is carried out

**Date**: 2026-10-25 (R2: 2026-10-26)
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/issues/README.md`), at Peter's direction. Peter, chat, 2026-10-25, relayed verbatim by the orchestrator, *"Re: class-level problem: Let's go with the fix, please."* The class-level problem is the one stated in the 16.1.0 walk record, `.kiro/issues/2026-10-25-release-16.1.0-walk.md` § "Records filed after the walk: when they first lapse (a standards implication, mine)". Peter's answer is recorded there in § "The six lines for Peter: RULED". *(R2: Stacy reviews rather than co-drafts. She writes no text she then reviews (her R1). Sentence 2's text is Lina's, from her R1.)*
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT records the measure, ratifies nothing, and answers no fork in § 6.
**Required reviewer**: **Stacy** (R1 done; R2 on this revision). She counts lapses in her claims passes, raised the inflation point (§ 1), and is the census reader.
**Reviewers**: **Lina** (R1 done, on F-2 and item (2)). Her web-element record is the "spec"-answer instance (§ 1.2).
**Class**: LAW. It changes when a record lapses, when an escalation answer is carried out, and, at the severable site 3, what phase 1 reads (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds").
**Amends**:
- `.kiro/issues/README.md` rule 11, two sentences (§ 2).
- `governance/classification-map.md` row `issues-obligation-lapse`: the `rule:` line gains two clauses; `education` LAW HOME gains this ballot; one history line. `checks` and `check_state` are unchanged.
- **Site 3, severable (F-3)**: `.kiro/hooks/RELEASE-FLOW.md`, the **Phase 1** bullet of step 6's "The RELEASE claims pass runs in two phases" (L199 at `a03b92f02`), one sentence. Also `governance/classification-map.md` row `release-falsity-floor`, one history line and a POINTER-GRADE entry.

**Census** (amended at R2 for site 3):
- Rule 11 is read by no registered instrument. The `issues-obligation-lapse` row has `checks: []`. `scripts/issues-owned.sh` implements rule 1 and rule 11 firing semantics, but it is in no row's `checks`, so no census line is owed for it. That is the census rule's known gap (Stacy R1), and § 7 records it. Sentence 1 is limited to `release:next:phase-1`, for which the script prints `due:next` and computes no lapse. Its output is therefore unchanged, and it can print no false `FIRED` line.
- The register file is loaded by two instruments, so the item is presumptively in scope (condition 1):
  - `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the rule-line clauses, the education strings and the history lines carry no get_section / get_document_* citation`
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — governance/ is an ordinary closure input; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`
- Site 3's file, `.kiro/hooks/RELEASE-FLOW.md`, is cited as law by the `education` of two rows with registered checks, so the item is presumptively in scope (condition 2):
  - `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts) — site 3 adds a read to phase 1, a claims-pass step; no dry-run, publish or tag check, assertion or floor changes`
  - `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh) — site 3 does not touch step 6; no rail assertion or verdict changes`
  - The `release-falsity-floor` row has `checks: []`, so no census line is owed for it.

**Cap**: two sentences in rule 11, one sentence in RELEASE-FLOW (severable), and the two register rows' matching edits. **Retroactivity**: none (§ 5).

> **Conflict of interest, stated first.** I own the README convention. I wrote the 16.1.0 guidance this measure replaces, and the earlier framing it corrected, which made the owner's re-rule wait on Peter's "carry". I owned row 1 of one of the three instance records. I also authored the walk text that sentence 1's row condition reads. Stacy's review, Lina's review and Peter's ruling are the checks.

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

> **A record filed after the release's walk record merged** — its adding commit is not an ancestor of that merge — whose Trigger token is `release:next:phase-1` does not lapse at that release's S if the walk record has a row for it at S; its first firing is then the next release's S. A record filed then and not rowed lapses at S like any other. A row is a line of the walk record that begins `|` and contains the record's file name (`<date>-<slug>.md`, with or without a `.kiro/issues/` prefix). Records whose token is `release:<V>:phase-1` or `tag:v<V>` are not carried. The release falsity floor is unchanged (RELEASE-FLOW 3a) *(ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers)*.

**Sentence 2** (Lina's wording, R1). After "A lapsed fix-now returns without that option.", insert:

> A **spec** answer is carried out when the spec's design outline merges and names the record. From that merge the record's owner re-rules its Trigger to the event that owes its close (the record's own deadline, or the spec's fixing PR once it exists), and the record closes under rule 5 when its items close. Until the outline merges, each later lapse returns the record to Peter with his spec answer quoted.

**The reading, decidable without the author** (this ballot is the law home for both sentences):
- **"Filed after the walk record merged"** is a git fact.
  - Take the record's adding commit: `git log --diff-filter=A --format=%H -- <file>`, the oldest result.
  - Take the walk record's merge: the first-parent commit on `main` that added `.kiro/issues/<date>-release-<V>-walk.md`.
  - Run `git merge-base --is-ancestor <adding> <walk-merge>`. Exit 1 means the record was filed after the walk merged.
  - At 16.1.0 the walk merge is `264c25661`, and row 36's adding commit is `56fdf50ca`, which gives exit 1 (Stacy R1, § 1).
- **"Has a row for it at S"** (A1): run `git show <S>:<walk record> | grep '^|' | grep -F <file name>`, and count one or more lines.
  - A G-line, guidance prose or a pointer is not a row. At 16.1.0, row 36's file name appears three times in the walk record and only one of those lines is a row (Stacy R1).
  - An addendum appended before S counts, as 16.1.0's rows 30–45 did.
  - The row is a **condition** of the carry, not a duty on the walk's author. Stacy R1, A4, notes that this differs from Peter's ruled sentence ("and is rowed in the walk addendum"), which makes the row a duty. The condition fails safe: an unrowed record lapses as it does today, and the lapse is visible. **It is a change to his words, and it is put to him as such at ratification (§ 6, F-1).**
- **Which tokens** (A3):
  - Only `release:next:phase-1` is carried.
  - A `release:<V>:phase-1` that names the release being cut is the event its owner chose, so carrying it would contradict rule 1.
  - A `tag:v<V>` fires at the tag, not at S, and `scripts/issues-owned.sh` would print `FIRED@v<V>` for a record the rule called unfired, which is a false `FIRED` line.
- **The floor** (A2): sentence 1 moves a lapse and nothing else. **The draft's claim that "a P0 filed after the walk is still a phase-1 finding" is withdrawn as written**: under current law nothing re-reads the root at S, so no reader sees such a P0. Site 3 (F-3, severable) names that read. If site 3 is struck, a post-walk P0 reaches the release only through someone's P0 line, as it does today.
- **"Names the record"** (sentence 2): the design outline contains the record's file name, with or without a `.kiro/issues/` prefix, by the same `grep -F` test.
- **"Re-rules its Trigger"** (sentence 2) is a re-rule in rule 11's sense: the Trigger line changed in a diff carrying a dated reason and authority. Peter's spec answer, quoted, is the authority. The outline PR can carry the re-rule, or the owner's next commit can.
  - The record stays at the root and keeps its kind, so the walk's greps and 3a's floor still see it (Stacy R1, § 4). It is archived only under rule 5, when its items are resolved, because rule 2 says `archive/` holds resolved defects (Lina R1).
  - From the outline merge on, the record carries **status only**: per-item outcome lines citing the spec's fixing PRs, and verifiers' lines. The spec carries the plan. This is an owner's rule-9 duty, which Lina accepts (R1).
- **Spec answers already given** are covered by sentence 2 from the application merge on. That includes row 12. Lina waits for ratification and then re-rules it to the option Peter picks (her R1).

**Site 3 (severable, F-3)**: `.kiro/hooks/RELEASE-FLOW.md`, the **Phase 1** bullet (L199 at `a03b92f02`). After "It covers the release delta, the walk record (item 3a: its paste, its `main at:` SHA and each row's disposition), the 5a owed-set paste, the 5b arming line and 5.1's tally.", insert:

> It also re-runs item 3a's two greps at S and reads each hit the walk record does not row: a P0 among them is a floor-class row for this release, owed a fix or Peter's quoted, dated waiver before the tag; any other is listed with its rule-11 state *(ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers, site 3)*.

Stacy already runs this read by habit (R1, § 1). Site 3 makes it the law's read, so it no longer rests on one reviewer's habit (her A2).

## 3. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**:
- **Sentence 1 as amended (F-1 (A))**: a git fact plus a row condition, limited to `release:next:phase-1`. It replaces a per-record owner act (the interim re-rule, about three ritual commits a release) and fails safe.
- **Sentence 2 in Lina's (b′) form (F-2 (b′))**: the spec answer has an end point, and the record keeps the clock and the floor's sight until what it describes is resolved. Stacy withdraws her block for this form (R1, § 4 and verdict).
- **Site 3 included (F-3 include)**: without it, § 2's floor bullet can promise nothing about a post-walk P0.

**Counter-argument, run against the proposal**:
- **(i)** A default carry is a deferral nobody chose. Post-walk filings cluster in the release window: at 16.1.0, three P2 `(guard)` records came in one PR on S's day. If Peter does not rule at the row, a guard weaker than its claim ships for one more release by default.
- **(ii)** Under (b′), once the outline merges, the record's clock is whatever its owner re-rules it to. A deadline nobody plans (`release:17.0.0:phase-1`, with 17.0.0 uncharted) never fires. The walk then sees the items every month and is forced to do nothing (Lina R1).
- **(iii)** Site 3 adds a step to the claims pass at the release's most crowded point, between 5.1 and the tag.

**Folded in**:
- From (i): the carry needs a row, so Peter sees the record at that release and may rule on it there, as he did at 16.1.0. Stacy will count carries by class, rowed and unrowed, in each RELEASE record (R1, § 5). A rising rate is the signal for rote rowing and late filing. Whether that count belongs in her charter's counting block is her edit and Peter's pick. It is outside this ballot's cap.
- From (ii): the record stays at the root as a `defect`, with per-item status, so a stall is visible at each monthly walk. The 17.0.0 bound is carried as a token rather than as prose.
- From (iii): the read reuses 3a's two commands at S, and Stacy runs it already. Its new cost is only that it is required.

**What survives**:
1. A carried `(guard)` record filed on S's day first escalates one release later, and a row is a read, not a ruling. If the rowing is rote, the row condition always holds (Stacy R1, § 2).
2. **A stalled spec has no clock.** A chartered spec that stalls appears in the owed-set output only as a `stub` row, never as a candidate: visible, never owed (Stacy R1, § 4, correcting the R1 draft's residual). Spec 113 is the instance: its outline merged on 2026-06-05 (`17e0262e2`), and its only later touch is the DORMANT line (#430, 2026-10-21). Under (b′) a record its outline named would sit at the root, seen at every walk, with a token that need not fire. **Whether a stalled spec should count as a lapse is a new rule. It is outside this ballot's cap, and it is recorded here as an open question for a later ballot, not as a fork.**
3. 3a's due-row grep matches only `release:(<V>|next)`. So a record re-ruled under (b′) to `release:17.0.0:phase-1` is not a due row at any minor release's walk. The monthly walk sees it; the release walk does not, unless it carries `**Class**: P0` (Stacy R1, § 6). This gap already exists for every record whose token is not due at the release. It is named so that (b′) is not read as closing it.
4. The no-window lapse also reaches records filed *with* the walk whenever the walk and S are hours apart (16.1.0's rows 25–28). Sentence 1 measures its window from the walk to S, because the walk is the designed point of observation (Stacy R1, residual).

## 4. Edit sites and application (after ratification, one PR, Peter-merged)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)** — <F-1, F-2, F-3 answers>`, and the ballots README roll entry.
2. `.kiro/issues/README.md` rule 11: sentences 1 and 2 as ratified (§ 2, with F-1 and F-2 resolved). The README is not on the edit-kinds path list, so no `**Edit kind**:` line is owed for it; the PR body cites this ballot.
3. `governance/classification-map.md` row `issues-obligation-lapse`:
   - The `rule:` line gains the clauses "a `release:next:phase-1` record filed after the release's walk record merged and rowed there first lapses at the next release's S" and "a spec answer is carried out when the spec's design outline merges naming the record; the owner then re-rules the Trigger, and the record closes when its items do".
   - `education` LAW HOME gains "ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers § 2".
   - One history line.
   - `**Edit kind**: governance/classification-map.md — EXECUTION (this ballot § 4 step 3)`.
4. **If F-3 is "include"**:
   - `.kiro/hooks/RELEASE-FLOW.md` gets site 3's sentence: `**Edit kind**: .kiro/hooks/RELEASE-FLOW.md — LAW (.kiro/docs/ballots/2026-10-25-rule-11-post-walk-filings-and-spec-answers.md)`.
   - The `release-falsity-floor` row's `education` gains a POINTER-GRADE entry ("RELEASE-FLOW Phase 1, the S re-read (this ballot, site 3)"), and the row gains one history line, under the same EXECUTION line as step 3.
5. Checks:
   - `npm run -s check:section-citations`.
   - `npm run -s check:122:diff-guard` (the lock refresh, if the closure moves).
   - `node scripts/validate-steering-metadata.js`.
   - **`npm run test:scripts`**: the audience-banner guard scans `governance/*.md` (`scripts/audience-banner/predicate.ts`, `SCAN_SCOPE`), and the register edits add "ballot" strings to `governance/classification-map.md` (§ 7).
   - The census lines re-read at application.
6. **No straggler sweep is owed beyond the register rows and site 3.** The 16.1.0 walk record's guidance paragraph is a ledger, and it keeps its text.

## 5. Cost, retroactivity

- **Cost**: two sentences in the README, one in RELEASE-FLOW (severable), and two register rows. No instrument changes and no regeneration: neither file is an embed source. Stacy's R2 and Lina's reading of R2 take minutes each. Peter answers F-1, F-2 and F-3, ratifies, and merges two PRs.
- **Retroactivity**: none. The ballot binds from its application merge, and 16.1.0's post-walk records are not re-decided by it.
  - Their dispositions were Peter's G-1 ("Fix now", fixed by #489), G-2 ("Carry", re-ruled by Lina) and G-3 ("Ride along", fixed by #490; Stacy closed the record).
  - Lina's CDG record was filed with #491 and re-ruled by her on the release branch.
  - Row 12's "Spec" is covered by sentence 2 from the application merge on.

## 6. Forks for Peter (none is picked here)

- **F-1: what carries a post-walk filing.**
  - **(A)** Sentence 1 as amended: carried by rule, through a git fact plus a row condition. The row is a condition, not his sentence's duty (§ 2).
  - **(B)** No rule change for item 1: owners re-rule each such record under rules 9 and 11, as the 16.1.0 guidance did. **(B) reverses Peter's class-level answer ("Let's go with the fix, please")**, which adopted a rule change (Stacy R1, A4). It is listed because it is the cost-free way back.
  - The drafter leans (A), and so does Stacy (R1, § 5). The cost that survives is § 3 residual 1.
- **F-2: what a spec answer does to the record.**
  - **(b′)**, Lina's: sentence 2 as written. The record stays at the root and the owner re-rules it to the event that owes its close.
  - **(b)**: the outline merge closes the record and opens a `charter`-kind record holding the deadline.
  - **(a)**: the outline merge closes the record, and the deadline goes into the spec's requirements.
  - **Stacy blocks (a)** and accepts (b) only for non-floor-class records, because a closed and archived record leaves 3a's sight (R1, § 4).
  - Lina's ranking and Stacy's are the same: (b′), then (b), then (a). The drafter leans (b′). The cost that survives is § 3 residuals 2 and 3.
- **F-3: site 3, the S re-read in phase 1.**
  - **Include**: the floor reaches a post-walk P0 by a named read.
  - **Strike**: § 2's floor bullet then promises nothing about post-walk P0s, and they reach the release only through someone's P0 line.
  - The drafter leans include. The cost that survives is § 3's (iii): one required step at the crowded point.

## 7. Standards notes (no edit in this ballot)

1. **The straggler sweep's expected list was compiled against before-texts only** (ballot `2026-10-25-token-selection-order-one-rule` § 11 step 6, and step 7's "the only new hits are Lina's kept heading"). At its application (#491), the sweep found hits that are not on the list:
   - `governance/Token-Governance.md:144`, the § 13.1 after-text;
   - `governance/classification-map.md:601`, the § 13.10 (iii) after-text;
   - generated copies of the first: `.claude/agents/ada.md:260`, the consumer copy, and `canonical/_fixture-output/cc/.claude/agents/_fixture.md:103`.

   Stacy cleared them as ratified § 13 bytes. The defect is the drafter's (mine). **Lesson**: a ballot that carries a sweep compiles its expected hits against the resolved after-texts and their generated copies too, and states whether the pattern is case-sensitive.
2. **The same application's step-10 check list left out `npm run test:scripts`** (#491). Ada's § 13.1 after-text carried an amendment note containing "ballot", which is the audience-banner guard's predicate string 4. That made `governance/Token-Governance.md` match the predicate, and `lane-functional-root` went red until Ada added a banner (`0df43455b`). **Lesson**: a ballot's application check list names the lanes whose guards read its edit sites, not only the checks its own text implies. This ballot's § 4 step 5 does that.
3. **`scripts/issues-owned.sh` has no register row** (Stacy R1, standards implication). The script implements rule 1 and rule 11 firing semantics. So a ballot that changes those semantics has no census reach to it, and its effect on the script's output is checked only if the drafter thinks to. This ballot checks it by hand (the census block: sentence 1 changes no `due:next` or `FIRED` line). **The class fix**: add the script to the `issues-obligation-lapse` row's `checks`, which brings it under the census rule. That is a register change of mine, owed in a later round, not in this ballot's cap.

**Outcomes for the composed loop**: item 1 is `adopted` for drafting. Item 2 is `adopted` and applied in § 4 step 5. Item 3 is `adopted` for drafting.

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

#### [THURGOOD R2] (2026-10-26; incorporation; drafter)

I answered the @ mentions first: neither R1 addresses me by @, and both route items to me in their text.

- **Stacy A1 ("row")**: adopted. A row is a line of the walk record that begins `|` and contains the record's file name, with or without a `.kiro/issues/` prefix, read at S with `git show`. "Names the record" in sentence 2 uses the same test. → § 2 sentence 1 and the reading.
- **Stacy A2 (the floor's reach)**: adopted, both halves of her either/or.
  - The draft's claim that a post-walk P0 "is still a phase-1 finding" is withdrawn as written.
  - Site 3 names the read: RELEASE-FLOW's Phase 1 bullet re-runs 3a's two greps at S. It is severable, as F-3, so Peter can strike it and keep the withdrawal.
  - → § 2, "The floor" and site 3; § 4 step 4; § 6 F-3. The census block gains two not-in-scope lines for site 3's file, which two rows' `education` cites (condition 2).
- **Stacy A3 (tokens)**: adopted. Sentence 1 carries only `release:next:phase-1`. It does not carry `release:<V>:phase-1` (the owner's named event) or `tag:v<V>` (which would make `issues-owned.sh` print a false `FIRED` line). I checked the script's output by hand: `release:next:phase-1` prints `due:next` and computes no lapse, so its output is unchanged. → § 2; the census block.
- **Stacy A4 (Peter's words)**: adopted. F-1 (B) is labelled as reversing his class-level answer. The row is a condition where his sentence made it a duty; § 2 says so, and F-1 puts that change to him. → § 2; § 6 F-1.
- **Stacy § 4 (sentence 2 blocked) and Lina R1 ((b′))**: adopted. Sentence 2 is now Lina's wording, verbatim.
  - The record stays at the root until it is resolved, is re-ruled at the outline merge, and closes under rule 5.
  - Stacy's closure question ("an outline PR with no outcome line") is moot under (b′), because the outline merge closes nothing.
  - (a) and (b) stay in F-2 with Stacy's block stated: she blocks (a), and accepts (b) only for non-floor-class records.
  - → § 2, § 3, § 6 F-2.
- **Lina's fold-back (status only)**: carried into § 2's reading as an owner duty, which she accepts.
- **Stacy's correction to residual 2** (a stalled spec shows as a `stub`, with 113 as the instance): adopted. → § 3 residual 2.
- **Lina's stall fork** (should a stalled spec count as a lapse?): recorded as an open question for a later ballot, not as a fork here. It is a new rule, outside this ballot's cap, and neither reviewer picks it. → § 3 residual 2.
- **Stacy § 6, second half** (a `release:17.0.0` token is not a due row at a minor walk): adopted as § 3 residual 3, named so that (b′) is not read as closing it.
- **Stacy's carry count**: recorded in § 3 as her own commitment. Whether it goes in her charter's counting block is her edit and Peter's pick. It is outside this cap.
- **Stacy's standards implication** (`issues-owned.sh` has no register row): adopted for drafting as § 7 item 3. The class fix, adding the script to `issues-obligation-lapse`'s `checks`, is my register change in a later round.
- **The orchestrator's `test:scripts` item**: § 7 item 2. It is applied here as § 4 step 5's `test:scripts` line, because the register edits add "ballot" strings inside the banner guard's scan scope.
- **Not changed**: Stacy's residual on records filed *with* the walk is kept as § 3 residual 4, with her reasoning. § 5 and § 7 item 1 are unchanged in substance.
- **Status**: still DRAFT. R2 asks Stacy to re-read A1–A4 and sentence 2 as revised, and Lina to read sentence 2 in place.

#### [STACY R2] (2026-10-26; required reviewer; self-written)

I write this as the reviewer. I wrote no text in R2, and I suggest wording below only as the exact fix where I mark something "not as meant". Facts were read at `81a08d084` (the R2 diff against `e28905b3b` touches this file only). I re-ran the row test against the walk record at `HEAD`: `git show HEAD:.kiro/issues/2026-10-25-release-16.1.0-walk.md | grep '^|' | grep -cF <name>` returns 1 for each of the four instance records (rows 12, 36 and the two guard records), against 3, 3, 3 and 6 for the bare-name grep. I also read `scripts/issues-owned.sh` for the `release:?*:phase-1` and `tag:?*` branches, and 3a and the Phase 1 bullet in `.kiro/hooks/RELEASE-FLOW.md` at `a03b92f02`. I did not run the application edits, because none is applied. A "row" below means the test the ballot now defines.

**Per item: adopted as meant, or not.**
- **A1 (row): adopted as meant.** The test is decidable and gives the right count on all four instances. One residual, below the bar for a fix: the test is "a line beginning `|` that contains the file name", not "the record's own row", so a table row of another record that merely cites this file would count as its row. That error fails toward the carry. At 16.1.0 it did not occur (each name sits in exactly one `|` line). I record it as a count I will make: carries whose only row is a citing row. Sentence 2's "names the record" uses the same `grep -F` test, as I asked.
- **A2 (floor reach): adopted as meant.** The withdrawal is explicit and the claim is no longer in the text as a promise. Sentence 1's closing clause, "The release falsity floor is unchanged (RELEASE-FLOW 3a)", is true with or without site 3, which is what makes site 3 severable (below).
- **A3 (tokens): adopted as meant.** Only `release:next:phase-1` is carried. I confirmed the script by hand: that token takes the `release:?*:phase-1` branch and prints `due:next`, and the script computes no lapse for it, so sentence 1 changes no `FIRED` line. `tag:v<V>` is excluded, which is the false-`FIRED` case. The census block says the output is unchanged, and it is.
- **A4 (Peter's words): adopted as meant.** F-1 (B) says it reverses his class-level answer. The row-as-condition change from his duty is stated in § 2 and put to him in F-1.
- **Sentence 2 condition: met.** My condition was that a spec-answered record stays at the root until what it describes is resolved. Sentence 2 in Lina's wording does that: the outline merge re-rules the Trigger, it closes nothing, and rule 5 closes the record when its items close. 3a's greps, which read the root only, keep seeing it. My R1 closure question is moot, as the drafter says. One edge I read and accept: if the owner does not re-rule after the outline merges, the old Trigger keeps firing and the record keeps returning to Peter. That fails safe and is visible, so no fix.
- **My block is withdrawn.** For (b′), it falls by its own condition. For F-2 it stays where I put it: (a) is blocked, and (b) is accepted only for non-floor-class records. The ballot states that accurately.

**Site 3 / F-3.**
- **Right home: yes.** The Phase 1 bullet is the only point where S exists as a commit. 3a runs before the release branch, so it cannot see a post-walk filing, and my phase-1 read already re-runs the walk's greps there. Naming the read in the Phase 1 bullet makes it the law's read rather than my habit, which is what A2 asked.
- **Severable without weakening sentence 1: yes.** Sentence 1 moves a lapse and promises nothing about the floor. Struck, the ballot says plainly (§ 2 floor bullet, § 6 F-3) that a post-walk P0 reaches the release only through someone's P0 line. That is today's state, stated honestly, so nothing is weakened. What would be weakened is only the reach the ballot now claims for the floor, and the text says so.
- **One wording amendment, non-blocking (A5).** Site 3 says a post-walk P0 is "owed a fix or Peter's quoted, dated waiver before the tag". Two things are underspecified. (1) It does not say how the P0 reaches Peter. 3a puts floor-class rows to him as `**Open for Peter**:` lines in the walk record's PR, held until he answers, and the phase-1 record lands later in a record-only PR. (2) "Owed ... before the tag" can be read as making my phase-1 read a gate on the tag. My charter says the RELEASE pass is non-negotiable and never a gate on any PR. Exact fix, one clause: after "owed a fix or Peter's quoted, dated waiver before the tag", add "(put to him as an `**Open for Peter**:` line in the phase-1 record's PR, which that rule holds until he answers; the read reports, and the tag stays his act)". Also, "does not row" should say "does not row under rule 11's row test", so the two sites use one test. If Peter prefers the sentence unchanged, I read it as the floor restated and not as a gate, but I would rather the text say so.

**Final reads.**
- **F-1: (A).** A git fact plus a row condition; fails safe; removes about three ritual re-rule commits per release. **Surviving counter-argument** (the drafter's § 3 (i) and residual 1, and mine): the carry is a default nobody chose, and post-walk filings cluster on S's day. A guard weaker than its claim ships one more release unless Peter rules at the row. If rowing becomes rote, the condition always holds. I will count carries by class, rowed and unrowed, in each RELEASE record. That count is not in my counting block, so it is performed only if Peter adds it there (his pick, outside this cap).
- **F-2: (b′) > (b) > (a).** (b′) keeps the floor's sight and gives CLOSEOUT a referent: the record's items, its outcome lines and the fixing PRs. **Surviving counter-argument**: visibility without force. A stalled spec (113 is the instance, a `stub` in the owed-set output) has no clock, and a `release:17.0.0:phase-1` token is not a due row at any minor release's walk (residuals 2 and 3). The ballot names both and does not claim to close them. Whether a stalled spec counts as a lapse is Peter's later ballot, not a fork here.
- **F-3: include**, with A5. **Surviving counter-argument**: one more required step at the release's most crowded point (§ 3 (iii)). A second one is mine: the law then names my seat's read, so a skipped read becomes a visible duty failure, not a habit lapse. I accept that. It is the point of A2.

**Standards implications:** none new. § 7 items 1–3 are adopted for drafting by the drafter. Item 3 (the script's missing register row) stays his later register change.

**Verdict: ready for ratification.** Sentence 1 and sentence 2 are adopted as I meant. A5 is a one-clause wording fix to site 3, which I recommend folding in before the Status commit but do not treat as blocking, since the F-3 text without it is still a floor restatement. Sentence 2's block is withdrawn. This is a review read. It is not a gate on any PR.

*Signed: Stacy, 2026-10-26.*

#### [LINA R2] (2026-10-26; self-written)

Read at `c41b978fa`. This entry answers [THURGOOD R2]'s ask that I read sentence 2 in place.

- **Sentence 2 reads as I meant, with no fix.** It is my R1 wording verbatim. The reading carries the rest: the record stays at the root, keeps its kind, carries status only from the outline merge, and is archived only under rule 5. One case is left without a bound: the reading says "the outline PR can carry the re-rule, or the owner's next commit can", and nothing bounds how soon that next commit comes. I accept that edge for the reason Stacy gives in her R2: until I re-rule, the old Trigger keeps firing, which fails safe and is visible. I will carry row 12's re-rule in the outline PR so that the gap is zero for it. → § 2 sentence 2 and the reading.
- **Row 12 is covered from *this* ballot's application merge on, not from #491's.** § 2 and § 5 both say "the application merge", meaning this ballot's. #491 is the token-selection application and has nothing to do with rule 11. Between now and that merge, row 12 runs under rule 11 as it stands. Its Trigger is `release:next:phase-1`, so if the next S comes first with no spec PR open, the record lapses there. As a P2 `(guard)` it goes to Peter with "Spec" quoted. My R1 accepted that lapse as a true signal (the spec has not started) that costs him one line. From the application merge on, sentence 2's last clause governs the same case. One condition belongs to me: sentence 2 fires only if the outline "names the record" by the `grep -F` test. When Thurgood drafts that outline, I will ask that it cite `2026-10-20-web-element-api-and-form-participation.md` by file name. → § 2, "Spec answers already given"; § 5.
- **F-2, final: (b′) > (b) > (a).** My read is unchanged from R1 and matches Stacy's. *Surviving counter-argument*: (b′) gives visibility, not force. A stalled spec has no clock (§ 3 residual 2), and a `release:17.0.0:phase-1` token is not a due row at a minor walk (residual 3). I agree that the stall question is a later ballot and not a fork here.

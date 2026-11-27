# Ballot Measure: rule 11's lapse window (B2), and what a walk record's `carried` row is

**Date**: 2026-11-27 (drafted from 2026-11-27T14:01:46Z, `date -u`; R2 from 2026-11-27T14:35:50Z)
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/issues/README.md` and of `.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md`, which carries B2's deadline). Direction: Peter, 2026-11-12T13:29:02Z, "As recommended", on the 16.3.0 lapse batch, whose class option reads "B2 goes to its own small ballot now, with Thurgood drafting. It includes a line that a 'carried' walk row is not a re-rule" (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md` § "What was ruled"). The orchestrator's brief to draft: Peter, 2026-11-27, "Let's brief Thurgood now".
**Status**: **DRAFT (R2)**, not ratified. No edit site below is applied. A merge of this file while this line reads DRAFT records the measure, ratifies nothing and answers no fork in § 6. Only Peter's dated words in this Status line ratify it (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"). *R1 head `bb2a902d9`. R2 folds `[STACY R1]` (§ 8) and adds two severable items (3 and 5) and two sites (4 and 5).*
**Required reviewer**: **Stacy** (R1 done, § 8). The standing-records record names her ("LAW; Peter ratifies, record-first; Stacy required reviewer", § "The fix"). She wrote B2's corrected wording, she counts lapses in every RELEASE phase 1, and she is the census reader.
**Reviewers**: none further. Lina set B2's deadline and Ada read its spec-row consequence; both agreed in consult-163 (rounds 1–3, 2026-11-12) that B2 goes to its own ballot. Lina's #868 depends on item 1's reading of a prose-only Trigger change, which § 2 decides and § 5 applies to her record.
**Consulted**: Stacy — R1 (§ 8): signs item 1's intent, not its R1 text; one input undecidable (which token fires at a relapse-only S), fixed by her quoted sentences, folded; closes unwindowed accepted on two conditions, both folded; F-1: an intake file does not meet "the spec taking the record in", Peter's pick; census reason corrected; one always-loaded straggler (start-up-tasks L136) found, now site 4. Thurgood, Lina, Ada — consult-163 rounds 1–3 (2026-11-12), with Stacy: B2 to its own ballot, with the `carried` line. Item 3 is my class option from my A-5 erratum consult (2026-11-27).
**Class**: LAW. It changes when a record lapses (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds").
**Amends**:
- `.kiro/issues/README.md` rule 11: its first sentence replaced (item 1); **severable** one clause in the spec-answer sentence (item 2, F-1) and one sentence after "A lapsed fix-now returns without that option." (item 3, F-3).
- `governance/classification-map.md` row `issues-obligation-lapse`: the `rule:` line, the LAW HOME, one history line (§ 4 step 3).
- `.kiro/steering/start-up-tasks.md` item 9, L136, one sentence (site 4).
- `.kiro/hooks/RELEASE-FLOW.md` item 3a, L37, one sentence after the disposition list (site 5).

**Cap**: rule 11's first sentence; its two restatements (start-up-tasks L136, RELEASE-FLOW 3a); the register row; and, severable, items 2 and 3. **Not in the cap**: the standing-records sentence ("a firing owes a read, not a close"), which stays routed to Spec 131 by its record's Trigger (§ 5); the waiting-spec figure (RELEASE-FLOW 3a's figure lines); any script.

**Retroactivity**: none. The 16.2.0 and 16.3.0 lapse reads already used B2 as the working reading. This ballot gives that reading standing from its application merge and re-decides no past lapse (§ 5). Stacy walked 13 rows of 16.2.0 and 8 of 16.3.0 by script against the R2 text (her Q1, Q6).

> **Conflict of interest, stated first.** I own the README and wrote most of rule 11. Eight of the fifteen records that lapsed at 16.3.0's S are mine, and one of them (`2026-11-07-github-grant-coverage-check`) lapses only because of the clause this ballot makes law. I also wrote the outline-row clause F-1 offers, and its R1 wording had a defect (§ 6 F-1). Item 3 would bind two of my own fix-now records (b-ci, github-grant) and the instrument half of a5. Stacy's review and Peter's ruling are the checks.

---

## 1. The gap

**Rule 11's first sentence today** (`.kiro/issues/README.md` L20 at `3a3bd072b`):

> A record **lapses** at a firing event (rule 1) when no commit that is an ancestor of the event's commit closed it (rule 5's dated outcome line, or the archive move) or re-ruled it (its Trigger line changed in a diff carrying a dated reason and authority).

It has no lower bound. Read literally, any re-rule anywhere in a record's history saves it from every later firing, and the commit that set a token can also count as the re-rule that saves the record at that token's first firing. Neither is the rule's intent, and both were read differently by two owners at 16.3.0.

**B2**, Stacy's corrected wording, has been the working reading since 16.2.0 (`.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md` § "The working reading for 16.2.0"; carried in Spec 131's outline § 13, L305):

> "lapses unless a commit after the token's previous firing (or, at its first, after the commit that set it), and an ancestor of the event's commit, closed it or changed its Trigger line with a dated reason and authority; the commit that set the token is not itself a re-rule"

**Its deadline fired at 16.3.0's S** (`6f507c039`): "131's README rule 11 is ratified by 16.3.0's S, or the working reading B2 goes to its own ballot then" (that record's Trigger prose). Spec 131 has no `requirements.md`. Every lapse in Stacy's 16.3.0 table rests on B2 (`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.3.0.md` § "The rule-11 read at S"; RL-52 (c)).

**The two 16.3.0 instances.**
1. **The setting commit.** `2026-11-07-github-grant-coverage-check` had no rule-1 token at `9d89982f8` (#752). #851 (`5d72723ea`) backticked it, "the event is unchanged". On the letter, #851 changed the Trigger line with a dated reason and is an ancestor of S, so no lapse (Stacy's first reading). On B2, #851 set the token and is not a re-rule, so the record lapses (Thurgood's reading, then both). The batch counted it on B2 (row 3).
2. **The `carried` row.** The 16.3.0 walk record carried 13 rows "with SHA and home", and #851's body said "other owners' carried rows are re-ruled by them before S". No owner did, and all 13 lapsed (RL-52 (a)). The walk's row was read by some owners as if it re-ruled their record. On the letter it cannot: it is not the record's Trigger line. The rule does not say so, RELEASE-FLOW 3a lists **carried** beside **lapse** as if they were alternatives, and one sentence of rule 11 (the post-walk carry) does make a row matter.

---

## 2. The rule (operative text, proposed)

### Item 1 — rule 11's first sentence (B2, with the `carried` line)

**Before**: the sentence quoted in § 1.

**After** (in place of it):

> A record **lapses** at a firing event (rule 1) unless a commit that is an ancestor of the event's commit closed it (the archive move, or a dated outcome line by which the record's own text closes the whole record; an outcome of a part, such as a half, an item or a row, closes nothing), or a commit in its **window** re-ruled it (its Trigger line changed in a diff carrying a dated reason and authority; a change to the line's prose alone, its token unchanged, is a re-rule when it carries both). Its window is the commits that are ancestors of the event's commit and not of its **start**. The start is the record's previous firing event and, when the event fires the record by its own Trigger token (rule 1), also **the commit that set that token**: the newest commit, an ancestor of the event's commit, whose diff added the record or changed its Trigger token to that token. That commit is not itself a re-rule. At a release's S that fires a record only because it is still open after a lapse, no token fires, and its start is its previous firing event alone. Nothing outside the record's own file, at the root or under `archive/`, closes or re-rules it: a walk record's row, `carried` or any other, a PR body and a plan line are neither, and the post-walk carry below moves a record's first firing without re-ruling it *(ballot 2026-11-27-rule-11-lapse-window-b2, item 1)*.

**The reading, decidable without the author** (this ballot is the law home):
- **"Its Trigger token"** is rule 1's backticked token: `sed -nE 's/^\*\*Trigger\*\*: `([^`]*)`.*/\1/p'` on the first `**Trigger**: ` line, the reading `scripts/issues-owned.sh` uses (`token_of`). A line with no backticked token has no token.
- **The setting commit**, when the event fires the record by its own token: walk `git log --first-parent --format=%H <E> -- <file>` newest first. The first commit `c` whose token equals the firing token, while `c^` has another token, no token, or no file, is the setting commit. At a release's S that fires the record only under "lapses again at each later release's S", no token fires and there is no setting commit in the start (Stacy R1, Q1).
- **When each token fires** (rule 1, read once for the window):
  - **`release:<V>:phase-1`** fires at release V's **S**, the commit its `v<V>` tag points at. That is the commit every `## Lapse` heading has named (`v16.1.0` → `38f4ece47`, `v16.2.0` → `4d10202b2`, `v16.3.0` → `6f507c039`; Stacy VERIFIED). The one exception is a walk record's own token, which RELEASE-FLOW 3a now says fires at the merge of the phase-1 record that reads it (site 5), the precedent of the 16.1.0–16.3.0 walk rows. *[The drafter's pick between S and the phase-1 record's merge, which Stacy left to me. Why S: the fix-now deadline is "no later than the next release's S", and a phase-1-merge event would give every owner the days between S and phase 1 that Peter's "due by 16.4.0's S" does not give. Why the walk record apart: it is read in phase 1 and closes after it, so an S event would make every walk record lapse.]*
  - **`path:`** fires once, at the first first-parent commit after its setting commit (never at it) that touches one of its globs; a later touch is not a firing (Stacy R1, Q1; the seat mode's `FIRED@<earliest>`, the PR mode's `already-fired@`, and `compare.ts` read it so already).
  - **`merge:#<N>`** fires at merge #N.
  - **`tag:v<V>`** fires at the commit the tag points at.
  - **`manual`** is not computable (rule 6). A `manual` record's previous firing event is the commit its newest `## Lapse` heading names, or none.
- **"A release's S"**, for the relapse sentence, is the commit its `v<V>` tag points at, for every token kind.
- **"The record's previous firing event"**: the newest earlier commit, an ancestor of `<E>`, at which the record fired under rule 1 or lapsed under this rule. A record that never fired before has none, and its window starts at the setting commit.
- **Window membership**: `git merge-base --is-ancestor <c> <E>` exits 0, and `git merge-base --is-ancestor <c> <start>` exits 1 for each start that exists.
- **"Re-ruled"**: the window commit's diff of the file has a `-` or `+` line beginning `**Trigger**: `, as the `fired-records` check reads it, and the changed text carries a dated reason and authority. The second half is read, as it is today.
- **A prose-only change is a re-rule when it carries both** *(decided here, explicitly)*. A Trigger-line change that keeps the token, with a dated reason and an authority in the changed text, re-rules; one that carries neither re-rules nothing. This is B2's own wording ("changed its Trigger line with a dated reason and authority"), the read-through re-rule the capture record's Lapse paragraph prescribes (`.kiro/issues/2026-10-29-release-records-home-switch.md`, "read-through prose with the date … and the ballot named"), and the reading behind Stacy's 16.2.0 table, which counts `1e2f82b44`, a prose re-rule. The other reading is F-2 (§ 6). Its effect on Lina's #868 is in § 5.
- **What counts as a close.** The archive move, or a dated outcome line by which the record's own text closes the whole record. An outcome of a part (a half, an item, a row) closes nothing; at `6f507c039` four open root records carry such part-outcomes (Stacy R1, Q2). Whether the line closes the whole record is read from its words, as "dated reason and authority" is.
- **Closes are not windowed**, with one bound: **a close counts only after the commit that last added the record at the root** (rule 4's move back included), so an old archive move on a resurrected record's ancestor line is not a close (Stacy R1, condition 2). Windowing closes would make a done-but-unclosed record (rule 6: "closed as done-but-unclosed (no lapse)") lapse at every later S until archived; rule 5's walk finding covers that case instead.
- **"Nothing outside the record's own file"**: the test is the record's file, at the root or under `archive/` (so the archive move itself counts). A walk record, a claims-pass record, a rulings record and a PR body are other files. A `carried` row is a read of the record, not an edit to it.
- **The post-walk carry is untouched.** The sentence that begins "**A record filed after the release's walk record merged**" keeps its row condition. The new text says only that the row moves the first firing and is not a re-rule. A carried post-walk record fires at the next S, and its window then starts at its setting commit.

**What it changes, against today's letter**:
1. A re-rule before a record's previous firing no longer saves it from a later firing. Today's letter has no lower bound; B2 supplies it, and rule 11's "lapses again at each later release's S" already assumed one.
2. The setting commit no longer saves the record at its own token's first firing (instance 1).
3. A part-outcome is named as not a close.
4. A `carried` row, a PR body and a plan line are named as not a re-rule (instance 2). This already held by the letter; the text now says so.
5. A record added in PR #N with `merge:#N` has an empty window, so it lapses at its own merge unless that PR closes it. That agrees with rule 11's "A fixing PR closes its record by adding rule 5's outcome line in the same PR" (Stacy R1, Q1).

**What it does not change**: what fires a record (rule 1), beyond reading `path:` as firing once; the post-walk carry; the spec-answer sentence (unless F-1); the count (distinct SHAs); escalation; grants; the release falsity floor.

### Item 2 — severable, only if F-1 is taken: the spec answer carried out by an intake file

In rule 11's spec-answer sentence (L20 at `3a3bd072b`), **before**: "A **spec** answer is carried out when the spec's design outline merges and names the record." **After**:

> A **spec** answer is carried out when the spec's design outline, or an `inbound-from-*.md` file in the spec's directory, merges and names the record *(ballot 2026-11-27-rule-11-lapse-window-b2, item 2)*.

"Names the record" keeps its existing test (`grep -F` of the record's file name, with or without a `.kiro/issues/` prefix). If item 2 is taken, Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" needs its hand-add clause widened to "or an `inbound-from-*` file names" (Stacy R1, Q4); that is outside this cap and is filed under README rule 10 at application.

### Item 3 — severable, only if F-3 is taken: a fix-now record keeps its release token

In rule 11, after "A lapsed fix-now returns without that option.", insert:

> A record answered **fix-now** keeps the `release:<V>:phase-1` token of the deadline the answer sets until its fixing PR closes it under rule 5 in that PR; its owner does not re-token it to `merge:#<N>` *(ballot 2026-11-27-rule-11-lapse-window-b2, item 3)*.

**Why.** Re-tokening a fix-now record to `merge:#<N>` when its PR opens is a re-rule, and after it nothing fires at S: the deadline Peter's answer set ("a git-visible trigger no later than the next release's S") becomes prose. Item 1's window does not close this gap, because a re-token inside the window is still a re-rule. Found in my A-5 erratum consult (2026-11-27, `[THURGOOD R1]` on that ballot, "(i)").

**This changes Peter's ruled mechanics**, and is put to him as such: his 2026-11-12 batch answer reads "fix-now records carry `release:16.4.0:phase-1`, re-tokened to `merge:#<N>` once the fixing PR opens". At `3a3bd072b` no fix-now record has been re-tokened yet (b-ci, github-grant, readiness, icon-base and a5 each still carry `release:16.4.0:phase-1`), so item 3 needs no re-rule on `main`. The prose of each that says it will be re-tokened becomes a plan the rule bars; each owner may leave it, or reword it in a dated line (rule 9).

**Why it rides this ballot rather than its own**: it is one sentence of the same rule, in the same register row, and its application is the same PR. A separate ballot costs a second round and a second `canonical/generated.lock` refresh, and the lock refreshes serialize (§ 4 step 7).

### Site 4 — `.kiro/steering/start-up-tasks.md` item 9, L136 (the always-loaded restatement)

- **Before** (the sentence that changes): `A fired record that no ancestor of the firing commit closed or re-ruled has lapsed (README rule 11).`
- **After**: `A fired record has lapsed unless it was closed, or re-ruled after its previous firing and after the commit that set its token (README rule 11).`
- **Pointer**, at the end of the bullet: `*(amended <application date> by ballot 2026-11-27-rule-11-lapse-window-b2, site 4; prior text at `3a3bd072b`)*`.
- **Why**: Stacy R1, Q5. After item 1 the old sentence under-reads lapses at every seat's session start, and the R1 straggler grep (`re-ruled it`) did not reach it.

### Site 5 — `.kiro/hooks/RELEASE-FLOW.md` item 3a, L37 (the walk author's reading)

- **After** "… or **lapse** (rule 11).", insert: `A **carried** row is a read, not a re-rule: a carried record lapses at S unless its own file closes or re-rules it before S (README rule 11). The walk record's own token fires at the merge of the phase-1 record that reads it, not at S. *(added <application date> by ballot 2026-11-27-rule-11-lapse-window-b2, site 5)*`
- **Why**: RL-52 (a) was a plan written against 3a's disposition list, which sets **carried** beside **lapse** as alternatives (Stacy R1, Q3). The second sentence is the walk-record exception named in § 2.

---

## 3. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: item 1 and sites 4–5 as written. F-1: leave it (lean). F-2: (A), as written (lean). F-3: take it (lean).

**Counter-arguments, run against item 1**:
- **(i) New law inside a simplification that will rewrite rule 11 anyway.** Spec 131 rewrites the README. A ballot now is churn.
- **(ii) A window needs the previous firing, and nothing prints it.** `issues-owned.sh` prints `due:<v>` and `FIRED@<sha>` but computes no lapse.
- **(iii) B2 is harsher than the letter.** Records that the letter saves will lapse. At 16.3.0 one did (github-grant), and it escalated.
- **(iv) Windowing closes as B2 does would make rule 6 and rule 11 disagree; not windowing them puts the weight on what a close is** (Stacy R1, Q2).
- **(v) The R1 text re-decided 13 past rows** at 16.2.0 and 8 at 16.3.0 by reading the record's current token as firing at a relapse-only S (Stacy R1, Q1).

**Folded in**:
- From (i): the text is written so Spec 131 can adopt it as it stands. Without it, every release reads its lapses on a reading whose deadline has passed (RL-52 (c)). 131 is parked behind Spec 132's first family in order (x′).
- From (ii): every step is a git command (§ 2). § 7's script is the class option, and Stacy has specified its nine fixtures (§ 8).
- From (iii): the harshness is the point. A record whose owner changed nothing since its token was set has not been read.
- From (iv): closes are not windowed, and a close is defined (whole record; after the last add at the root), per Stacy's two conditions.
- From (v): Stacy's replacement sentences for the start, folded verbatim, with her wording fix to "a release's S".

**What survives**:
1. **The window is computed by hand.** Until an instrument computes it, each RELEASE phase 1 rebuilds it per record, as Stacy did at 16.3.0. A script is the class option (§ 7), not in this cap.
2. **"Closes the whole record" and "a dated reason and authority" are reads, not greps.** The part-outcome test is still a reading of the record's words, and a rewording that happens to carry a date and an authority counts as a re-rule (F-2).
3. **The standing-record problem stays** (§ 5).
4. **Labels lag the rule.** After item 1, the `fired-records` PR mode labels a diff that sets the firing token `re-ruled-here`, and `scripts/harness/compare.ts` (L1152–L1156) reads any Trigger-line change as stopping a lapse. Both are labels, outside the census, and both are fixture cases for § 7's script (Stacy R1, Q5).
5. **The walk-record exception is one more rule.** A walk record's token fires at a different event from every other release token.

---

## 4. Edit sites and application (after ratification, one PR, Peter-merged)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**` with his words and his F-1, F-2 and F-3 answers, and the ballots README roll entry.
2. **`.kiro/issues/README.md` rule 11**: item 1 as ratified, item 2 if F-1 is taken, item 3 if F-3 is taken. The README is not a governance path, so no `**Edit kind**:` line is owed for it. The PR body cites this ballot, and the README carries the inline ballot citation (`.kiro/docs/ballots/README.md` § "Conventions").
3. **`governance/classification-map.md` row `issues-obligation-lapse`**:
   - `rule:` line: "a record neither closed nor re-ruled by an ancestor of a firing commit lapses" becomes "a record not closed by an ancestor of a firing commit (the archive move, or an outcome line closing the whole record), and not re-ruled by a commit in its window (after its previous firing and, when its own token fires, after the commit that set that token, which is not a re-rule; nothing outside the record's file counts, a walk record's `carried` row included), lapses". If F-1 is taken, "when the spec's design outline merges naming the record" becomes "when the spec's design outline, or an inbound-from-*.md file in its directory, merges naming the record". If F-3 is taken, the line gains "a fix-now record keeps its release token until its fixing PR closes it".
   - `education` LAW HOME gains "ballot 2026-11-27-rule-11-lapse-window-b2 § 2 (rule 11's lapse window, what a close is, and the `carried` row)"; POINTER-GRADE gains "start-up-tasks item 9; RELEASE-FLOW 3a's carried sentence".
   - One history line. `checks` and `check_state` unchanged.
4. **Sites 4 and 5** as written.
5. **`.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md`**: one dated body line, mine as owner (rule 9): "B2's half is discharged by ballot 2026-11-27-rule-11-lapse-window-b2 (applied at #<N>); the standing-records question stays, Trigger unchanged." The Trigger line is not touched.
6. **The PR body carries**:
   - `**Edit kind**: governance/classification-map.md — EXECUTION (.kiro/docs/ballots/2026-11-27-rule-11-lapse-window-b2.md § 4 step 3)`;
   - `**Edit kind**: .kiro/steering/start-up-tasks.md — LAW (.kiro/docs/ballots/2026-11-27-rule-11-lapse-window-b2.md)`;
   - `**Edit kind**: .kiro/hooks/RELEASE-FLOW.md — LAW (.kiro/docs/ballots/2026-11-27-rule-11-lapse-window-b2.md)`;
   - the `**Consulted**:` line; the census lines re-run at its base; the straggler sweep lines.
7. **Lock order.** `governance/` and `.kiro/steering/` are input-closure roots, so this application refreshes `canonical/generated.lock` (and regenerates the always-loaded surfaces that render start-up-tasks). The records-home application (`2026-11-27-release-records-home-now`) and the A-5 erratum application refresh it too. **Order, proposed: this application first, then records-home, then A-5.** This one is the smallest regeneration and has no seat acts, so it clears the lock slot fastest; records-home carries five first signatures and Stacy's re-sign, which a rebase over this one does not disturb (no shared text site). Each later PR rebases and regenerates after the earlier merges. The orchestrator names the order in each brief.
8. **Checks**, each pasted in the PR body: `npm run -s check:section-citations`; `npm run -s check:122:diff-guard`; `node scripts/validate-steering-metadata.js`; `npm run test:scripts`; `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <N>`; `bash scripts/issues-owned.sh --pr <N> --base origin/main --head HEAD`; the `law-ratified` and `merge-hold` checks at the head.
9. **Straggler sweep**: `git grep -n -F "re-ruled" -- .kiro/issues/README.md governance canonical/agents .kiro/steering .kiro/hooks/RELEASE-FLOW.md` (widened from R1's `re-ruled it`, Stacy R1, Q5), and `git grep -n -F "carried" -- .kiro/hooks/RELEASE-FLOW.md`. Each section holding a hit is read whole and listed `true`, `fixed` or `left: <reason>`. Expected: README L15 (rule 6), RELEASE-FLOW L41 and L56 read whole; start-up-tasks L136 `fixed` (site 4); RELEASE-FLOW 3a's **carried** `fixed` (site 5).
10. **Not edited**: Spec 131's outline § 13 (131's rewrite takes rule 11 as it then stands); `scripts/issues-owned.sh` and `scripts/harness/compare.ts` (§ 3 residual 4).

---

## 5. Census, standing records, retroactivity, the #868 dependency

**Census** (`.kiro/docs/ballots/README.md` § "Conventions", "Instrument census"). The README's rule 11 is cited as law by the `education` of row `issues-obligation-lapse`, whose `checks` names `fired-records` (condition 2). The register file and `.kiro/steering/start-up-tasks.md` are loaded by instruments (condition 1). RELEASE-FLOW is cited by the education of two rows with checks (condition 2).
- `**Census**: not in scope — fired-records (scripts/issues-owned.sh --pr; warn-only) — item 1 edits no file the check loads and no code it runs: the PR mode reads git and the records only, lists records a merge fires by token, labels any changed Trigger line re-ruled-here without reading a dated reason, bounds a path: fire by the commit that last changed a Trigger line (already-fired@), reads no walk record and computes no lapse; every line it prints at a given base and head is the same before and after` *(Stacy R1, Q5, verbatim; the R1 reason was false in two clauses)*
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — the rule-line clause, the LAW HOME string, the history line and sites 4–5 carry no get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ and .kiro/steering/ are input-closure roots) — both are ordinary closure inputs; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts) — its scope excludes the register and includes start-up-tasks.md; site 4's sentence carries no token name, no CSS attribute and no example block, so its verdict for that file is unchanged`
- `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh) — site 5 adds a sentence to 3a's walk text; no rail text, exit code, assertion or verdict changes`
- `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts) — site 5 is text in the row's education home that the script does not read`
- **The seat mode** of `scripts/issues-owned.sh` is in no row's `checks`. It bounds a `path:` fire by the commit that last changed a Trigger line. That agrees with item 1's start where the last Trigger change set the token. Where a prose-only re-rule followed the setting commit, the seat mode's bound is later than item 1's, and it can print a later `FIRED@`, or none, for a record item 1 reads as fired earlier (Stacy R1, Q5). Recorded, no line owed.

**Standing records.** The standing-records sentence is the other half of the record that carries B2, and is not in this cap. Peter's class option named B2 and the `carried` line; my consult-163 R1 offered "B2 plus the standing-records sentence" as a fork, and the batch did not carry it to him. It stays routed to Spec 131 by the record's `path:` Trigger.

**Retroactivity**: none. With the R2 start text, every 16.2.0 and 16.3.0 row Stacy walked reads as the tables read it (her Q6; the dated-reason half of each token change UNVERIFIED by her one by one). Not windowing closes decides no row differently (token-docs' close `d0624830c` follows its setting commit `ddb4d9482`). Her own disclosed gap stands as a fact about her 16.3.0 pass, not this ballot: it read the due release-token hits and not the relapse candidates with `path:` or `manual` tokens.

**The #868 dependency** (Lina's `.kiro/issues/2026-09-26-native-component-distribution.md`, draft PR #868). Lina appends Lapse headings at `4d10202b2`, `693b39b54` and `6f507c039`, and reads `a953ac70d` (#723) as not a re-rule. Under item 1 as written (F-2 (A)):
- The record's token `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` was set at `19c1dea43` (2026-11-05; the previous token `path:harness/**`). `a953ac70d` (2026-11-07) changes the Trigger line's prose with the token unchanged, and carries a dated reason and authority: "*(Reworded 2026-11-07, Kenya and Data, rule 9 … **Reason**: Peter, received 2026-11-07T17:46Z: "Let's capture 132 with what we have so far …")*". VERIFIED at `3a3bd072b`.
- **`4d10202b2`** (16.2.0's S, a relapse-only S): start = the `d7385b4c2` lapse; no Trigger change between them on the first-parent line. **The heading stands.**
- **`693b39b54`** (the `path:` token's first firing, Spec 129's CLOSEOUT): start = the later of `4d10202b2` and the setting commit `19c1dea43`; `a953ac70d` is in the window and re-rules it. **Not a lapse under (A).** Under F-2 (B) it is a lapse.
- **`6f507c039`** (16.3.0's S, a relapse-only S): start = the previous firing event `693b39b54`; no Trigger change after it. **The heading stands under (A) and (B).** This differs from #868's note, which says both later headings fall under the reading that counts a prose-only change.
- Headings are append-only. A heading that this ballot reads as not a lapse is not erased; Lina's record says how it reads, and the lapse count (distinct SHAs) counts only lapses. That is #868's owners' line to write after ratification, not this ballot's.

---

## 6. Forks for Peter (none is picked here)

- **F-1: is a spec answer carried out by an intake file, without an outline edit?** (Severable item 2; Peter has not ruled on it.)
  - **(a) Take it**: "the spec's design outline, or an `inbound-from-*.md` file in the spec's directory, merges and names the record". An outline edit resets the waiting-spec figure (RELEASE-FLOW 3a; ballot `2026-11-04-waiting-spec-row`); an intake file does not.
  - **(b) Leave it**: each spec answer costs one chore PR adding an outline row, as #859 did for the RS queue (`029c66cb7`).
  - **(c) Leave it, and stop a line that only names a record from restarting the waiting-spec figure** (Stacy R1, Q4; she gave no text). The figure is counted from "the outline's last-touching commit". (c) removes (b)'s cost without moving acceptance to the filer. It needs a RELEASE-FLOW 3a edit and a change to the script that counts the figure (`baseline-snapshot.sh` L143), which my outline-row consult costed as ballot-sized (a marker convention or a hunk read). No text is drafted; if Peter picks (c), it is drafted at R3 or as its own ballot.
  - **A correction to my own clause.** The outline-row consult offered "an `inbound-*.md` file". That reach is wrong: some directories hold files addressed to *another* spec (`119-B-capability-routing-measurement/inbound-to-123-from-119-B.md`). At the base: 59 `inbound*` files, 53 `inbound-from-…`, 5 `inbound-to-…`, and 131's ledger, which is the formalizer's own running ledger and not intake (Stacy R1, Q4).
  - **The drafter leans (b).** **Stacy reads an intake file as not meeting the test.** Of the 53 intake files' adding commits, 4 carry an `Agent:` trailer and 49 carry none, so who filed one cannot be decided from git.
  - **Surviving counter to (a)**: a record's owner could carry out Peter's spec answer by filing a file, with no act by the formalizer: the answer becomes self-attested.
  - **Surviving counter to (b)**: every future spec answer edits the outline, and each edit resets that spec's figure; for an `open` row it delays a re-ask.
  - **Surviving counter to (c)**: a ballot-sized change (law, script and a marker in every waiting outline) for a figure that decides nothing on a `park` row.
- **F-2: does a prose-only Trigger change, with a dated reason and authority, re-rule?** (Decided in item 1 as (A); the alternative is put to Peter because #868's lapse count depends on it.)
  - **(A) Yes**, as item 1 writes it.
  - **(B) No**: only a change to the token re-rules. Item 1's parenthesis would read "(its Trigger token changed in a diff carrying a dated reason and authority)".
  - **The drafter leans (A).** It is B2's wording, the read-through re-rule the capture record's ratified Lapse paragraph prescribes, and the reading behind the 16.2.0 table.
  - **Surviving counter to (A)**: a rewording made for another reason that happens to carry a date and an authority saves its record from the event its token still names. #723 is the instance: the token did not move, and the record's own text expected its lapse at CLOSEOUT.
  - **Surviving counter to (B)**: it re-decides past rows (Stacy's 16.2.0 table counts `1e2f82b44`, a prose re-rule) and breaks the read-through pattern a ratified record uses on purpose; those records would then lapse at each S unless their owners move the token.
- **F-3: does a fix-now record keep its release token until its fixing PR closes it?** (Severable item 3.)
  - **Take it**: the S deadline stays a firing event, not prose.
  - **Leave it**: Peter's 2026-11-12 mechanics stand, re-token to `merge:#<N>` when the fixing PR opens.
  - **The drafter leans take it.** It changes Peter's ruled words, so it is put as a change to them.
  - **Surviving counter if taken**: a `merge:#<N>` token fires at the merge itself, so a fixing PR that merges without closing its record is seen at once; under the release token it is seen only at S.
  - **Surviving counter if left**: the deadline Peter's fix-now answer sets is enforced by nothing once the PR opens; a fixing PR that stalls past S is never a lapse.

---

## 7. Class option

**A lapse projection, by script**: given a firing event, print each root record's setting commit, window start and the in-window Trigger-line changes and closes. The 16.2.0 walk had one by hand and 16.3.0's did not (Stacy's S-1 in the 16.3.0 pass). **Cost**: one script under `scripts/` (my scope), Stacy's nine falsification fixtures (§ 8, her § 7 list), and a RELEASE-FLOW 3a line that pastes its output. That is LAW for the paste and EXECUTION for the script. **Not in this cap**: filed under README rule 10 at this ballot's application if Peter ratifies item 1. The same record carries the two label lags of § 3 residual 4.

---

## 8. Review round record

#### [STACY R1]

*I read the ballot at `bb2a902d9` (branch `ballot/b2-rule-11-lapse-reading`, base `3a3bd072b`), in a detached worktree of my own, on 2026-11-27. This is a read-only review and I committed nothing. VERIFIED means I checked it at that head with the command named. UNVERIFIED means I did not check it.*

**Verdict: I sign item 1's intent but not its text as drafted.** One input is not decidable: which token "fires" at a release's S that fires a record only under "lapses again at each later release's S". Read literally, the text re-decides 13 rows of the 16.2.0 table. One text change (Q1) fixes it. With that change, every 16.2.0 and 16.3.0 row I walked reads as the tables read it. I accept that closes are not windowed, on two conditions (Q2). If both are folded in, there is no F-2. On F-1, my read is that an intake file does not meet "the spec taking the record in" (Q4). The pick is Peter's. On the census, the not-in-scope call holds, but its reason does not as written. The straggler sweep also misses one always-loaded restatement (Q5).

**Q1: can I decide the three inputs from § 2's commands, without asking you?** → § 2 item 1, "The reading"

- **The setting commit**: decidable with § 2's walk when the event fires the record by its own token. VERIFIED: for `2026-11-07-github-grant-coverage-check` the walk returns `5d72723ea`, as the 16.3.0 correction row reads.
- **Not decidable: which token fires at a release's S that fires a record only because "a record still open after a lapse lapses again at each later release's S".** At such an S, the record's current token does not fire by rule 1. "The token that fires" can then be read as the record's current token, or as none. The two readings give different tables.
  - **At 16.2.0's S** (VERIFIED, by script, per record): 14 records that lapsed at 16.1.0's S (`38f4ece47`) had their token changed before 16.2.0's S (`4d10202b2`). Examples: b-ci, `release:next:phase-1` → `release:16.3.0:phase-1` at `58cab211d`; full-survival, → `path:.kiro/specs/131-governance-simplification/requirements.md` at `846335f98`. Under the current-token reading, each change is that token's setting commit, which is "not itself a re-rule". 13 of the 14 then lapse again at `4d10202b2`. The exception is arming-read-class-option-fork, which has a later prose re-rule, `1e2f82b44`. My 16.2.0 table read none of the 13 as lapsing (5 rows, 2 lapses).
  - **At 16.3.0's S** (VERIFIED, same script): 8 open relapse candidates with `path:` or `manual` tokens lapse at `6f507c039` under the current-token reading: full-survival, in-repo-generate, drawn-control, token-promotion, issues-owned-fired, owed-set-law-text, web-prop-mapping, and trigger (d), whose re-rule `95ed466d7` follows its 16.2.0 lapse.
  - **It also contradicts rule 11's spec-answer sentence.** That sentence has the owner "re-rule its Trigger to the event that owes its close". The current-token reading makes that re-rule worth nothing at the next S.
  - **The precedent applies the setting-commit bound only when the event fires the record by its own token.** That covers both tables, and my own record's Trigger prose ("lapses there for the second time").
  - **Change**: replace item 1's second and third sentences, up to "Nothing outside", and keep the first sentence:
    > Its window is the commits that are ancestors of the event's commit and not of its **start**. The start is the record's previous firing event and, when the event fires the record by its own Trigger token (rule 1), also **the commit that set that token**: the newest commit, an ancestor of the event's commit, whose diff added the record or changed its Trigger token to that token. That commit is not itself a re-rule. At a release's S that fires a record only because it is still open after a lapse, no token fires, and its start is its previous firing event alone. Nothing outside the record's own file closes or re-rules it: [unchanged to the end of the sentence]
  - **With the change**, b-ci reads no lapse at 16.2.0, because `58cab211d` is in its window after `38f4ece47`. It reads a lapse at 16.3.0, because it fires by `release:16.3.0:phase-1` and nothing follows `58cab211d`. Both match the tables.
  - I checked this by hand on b-ci, full-survival, trigger (d), token-docs and signing-act-prevention (VERIFIED). For the other rows, whether each token change carries "a dated reason and authority" is UNVERIFIED. I did not read them one by one.
  - § 2's setting-commit bullet then reads its "firing token" as the token that fires the record by rule 1, and as none at a relapse-only S.
- **The previous firing event**: decidable for `merge:#` and for release tokens. Three inputs need a sentence each:
  - **`path:`**: on the letter, every touch of a glob is a rule-1 event. `scripts/issues-owned.sh` reads only the first touch after the last Trigger change: `FIRED@<earliest>` in the seat mode, `already-fired@` in the PR mode (VERIFIED, L246–L250 and L312–L317). Proposed bullet: "A `path:` token fires once, at the first first-parent commit after its setting commit (never at it) that touches one of its globs; a later touch is not a firing."
    - "never at it" also covers a re-rule that sets a `path:` token its own diff touches. All three readers (seat mode, PR mode, `compare.ts`) already treat that as no fire. Rule 11's adding-commit sentence reaches only the adding commit.
  - **`manual`**: not computable (rule 6). Proposed: "A `manual` record's previous firing event is the commit its newest `## Lapse` heading names, or none."
  - **`release:<V>:phase-1`**: the Lapse headings name S. But the 16.1.0, 16.2.0 and 16.3.0 walk-record rows say the walk's own `release:<V>:phase-1` "fires at this record's merge", meaning the phase-1 record's merge. Those are two precedents, and the text should pick one. The text is yours, so I do not pick.
  - **A wording fix**: "For a release token, a release's S is the commit its `v<V>` tag points at". The relapse S applies to every token kind, so drop "For a release token". VERIFIED: `v16.1.0` → `38f4ece47`, `v16.2.0` → `4d10202b2`, `v16.3.0` → `6f507c039`, the SHAs the Lapse headings name.
- **The window**: decidable once the start is (VERIFIED: `git merge-base --is-ancestor` over first-parent squashes).
  - One consequence earns a line under § 2 "What it changes". A record added in PR #N with `merge:#N` has an empty window, so it lapses at its own merge unless that PR closes it. That agrees with rule 11's "A fixing PR closes its record by adding rule 5's outcome line in the same PR". No change asked.

**Q2: do I accept that closes are not windowed, or hold B2's words?** → § 2 "Closes are not windowed"; § 6 "Not a fork"

- **I accept it.** B2 windowed closes by accident of drafting, not by choice: both instances it was built for were re-rules. Windowed closes would make a closed but not yet archived `release:next:phase-1` record lapse at the next S, against rule 6.
- **But not windowing them puts all the weight on what counts as a close.** Item 1 leaves that to "rule 5's dated outcome line".
  - VERIFIED: at `6f507c039`, four open root records carry dated outcomes of a part:
    - web-prop-mapping: "## Outcome, the property half (2026-11-01)";
    - drawn-control: "**Outcome (web items, rule 5)**";
    - in-repo-generate: "## Outcome of row (g) (2026-11-08, Ada, rule 5)";
    - trigger (d): "## Partial outcome (2026-11-04, …)".
  - If closes are windowed, a misread part-outcome saves its record for one window. If they are not, it saves it forever. token-docs was contested on exactly this question at 16.3.0.
- **There is also one decidable hole.** A record moved back from `archive/` (rule 4) still has its old archive move on its ancestor line. Unwindowed, that move reads as a close forever. No instance exists today (VERIFIED: no root record has history under `archive/`).
- **My two conditions:**
  1. In item 1's first sentence, change "closed it (rule 5's dated outcome line, or the archive move)" to "closed it (the archive move, or a dated outcome line by which the record's own text closes the whole record; an outcome of a part, such as a half, an item or a row, closes nothing)".
  2. In § 2's "Closes are not windowed" bullet, add: "A close counts only after the commit that last added the record at the root (rule 4's move back included)."
- If condition 1 is not folded in, I hold B2's words: closes windowed is the safer default. It then goes to Peter as F-2 at R2.

**Q3: does the `carried` line give my RL-52 (a) what it needs?** → § 2 item 1, the third sentence; § 4 step 6

- **Yes.** It says that a walk row, a PR body and a plan line are not re-rules, which is what RL-52 (a) needs.
  - It does not break the post-walk carry. The carry moves the first firing, the row re-rules nothing, and the carried record's window then starts at its setting commit (§ 2 bullet). VERIFIED against the carry sentence at `3a3bd072b`.
- **A wording fix**: the "file path" test should read "the record's file, at the root or under `archive/`". As written, the archive move (which changes the path) fails the bullet's own test.
- **What RL-52 (a) also needs is outside the README.**
  - #851's plan was written against RELEASE-FLOW 3a. Its disposition list sets "**carried** (one bulk line: SHA, home, trigger)" beside "**lapse** (rule 11)" as alternatives.
  - § 4 step 6 keeps 3a's rows as "walk vocabulary". I propose no text, since RELEASE-FLOW is yours. I ask that 3a's sweep line be marked `fixed`, or give a reason why an owner reading "carried" will not take it as discharging the S.

**Q4: is an `inbound-from-*.md` file "the spec taking the record in"? Does the `inbound-to-*` correction hold?** → § 2 item 2; § 6 F-1

- **"Names the record" is a grep, and an intake file passes it. "The spec taking the record in" is not a grep.**
  - Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" defines **intake** as the formalizer's disposition at the requirements round.
  - An `inbound-from-<seat>-*.md` file is written by the seat that sends it. VERIFIED: of the 53 at base, the adding commits of 4 carry an `Agent:` trailer and 49 carry none. So who filed one cannot be decided from git.
  - If F-1 is taken, a record's owner carries out Peter's spec answer by filing a file, and the answer becomes self-attested.
- **My read: an intake file does not meet the test. The pick is Peter's.**
- **The counter "nothing is lost at formalization" is narrower than written.**
  - The E2 grep runs over the records. Its hand-add clause reaches only "a record the outline cites but the grep misses".
  - A record named in an intake file, but not itself naming the spec in the grep's form, is never met at formalization.
  - If F-1 is taken, that clause needs "or an `inbound-from-*` file names" too. That is outside this cap.
- **The `inbound-to-*` correction holds.** VERIFIED: 59 inbound files at `3a3bd072b` (53 `inbound-from-*`, 5 `inbound-to-*`, 1 ledger), all at depth 1.
  - Two `inbound-to-125-B-*` files sit in 125's directory, so `inbound-from-*` in 125-B's directory misses them. That miss errs on the safe side.
  - The 131 ledger is the formalizer's own running ledger ("Holder: Thurgood (Spec 131's formalizer)"), not a seat's intake. I would not count it.
- **A third option for Peter's fork** (no text from me): leave "design outline", and stop a line that only names a record from restarting the waiting-spec figure.
  - The figure is counted from "the outline's last-touching commit" (RELEASE-FLOW 3a, VERIFIED).
  - This removes the cost of leaving F-1 out without moving acceptance to the filer.

**Q5: do the `fired-records` not-in-scope line and the seat-mode note hold?** → § 5; § 4 step 6

- **The `fired-records` call holds.** Item 1 edits no file the PR mode loads and no code it runs. So every line it prints at a given base and head is the same before and after (VERIFIED, `scripts/issues-owned.sh` at the head).
- **Its reason is false in two clauses:**
  1. "reads … no earlier firing": the PR mode computes `already-fired@<sha>` from an earlier first-parent touch (L246–L250).
  2. "a diff that sets a token where the base had none is not listed before or after": a diff that sets a `path:` token it also touches, or a `merge:#` naming its own PR, is listed `re-ruled-here` (L226, L242). Only a token that does not fire in PR mode goes unlisted, such as #851's `release:` token.
- Proposed line:
  `**Census**: not in scope — fired-records (scripts/issues-owned.sh --pr; warn-only) — item 1 edits no file the check loads and no code it runs: the PR mode reads git and the records only, lists records a merge fires by token, labels any changed Trigger line re-ruled-here without reading a dated reason, bounds a path: fire by the commit that last changed a Trigger line (already-fired@), reads no walk record and computes no lapse; every line it prints at a given base and head is the same before and after`
- **Recorded, not a census line**:
  - After item 1, `re-ruled-here` labels a diff that sets the firing token as a re-rule, which item 1 says it is not. That is a label, so outside the census. It is a fixture case for § 7's script.
  - `scripts/harness/compare.ts` (your scope; VERIFIED that no register row names it) also reads "A re-rule stops a lapse (README rule 11)" as any Trigger-line change (L1152–L1156). Same gap, same home.
- **The seat-mode note holds as conditioned.** It should also state the other case: where a prose-only re-rule followed the setting commit, the seat mode's bound is later than item 1's. It can then print a later `FIRED@`, or none, for a record that item 1 reads as fired earlier.
- **The straggler sweep (§ 4 step 6) misses one restatement.**
  - VERIFIED: `.kiro/steering/start-up-tasks.md` L136 (item 9, always loaded) reads "A fired record that no ancestor of the firing commit closed or re-ruled has lapsed (README rule 11)".
  - The grep for `re-ruled it` does not reach it. After item 1, that sentence under-reads lapses at every seat's session start.
  - Widen the grep to `re-ruled`, which adds 3 hits in the swept roots to read whole (README L15, RELEASE-FLOW L41, L56). Then either put L136 in the cap or file it `left:` with a rule-10 record. Its After is your text.

**Q6: does any 16.2.0 or 16.3.0 row read differently under item 1 as written?**

- **As written: yes, under the current-token reading in Q1.** At 16.2.0, 13 records lapse that the table did not count (named in Q1, VERIFIED). At 16.3.0, the 8 relapse candidates named in Q1 lapse too.
  - With Q1's change, none of the rows I walked reads differently (VERIFIED for the records named above).
- **Not windowing closes decides no row differently.** VERIFIED for token-docs: its close `d0624830c` follows its setting commit `ddb4d9482` and precedes 16.2.0's S. So it was closed, not open, at 16.2.0, and in its window at 16.3.0 either way.
- **A gap in my own pass, disclosed.** My 16.3.0 rule-11 table read only the due release-token hits. It did not read the relapse candidates with `path:` or `manual` tokens.
  - On the tables' reading none of them lapses, since each was re-ruled after its last lapse (the commits are VERIFIED; the dated-reason half is UNVERIFIED). So no lapse was missed, but the table does not show it.
  - That gap is mine. § 7's projection would print those rows.

**§ 7 class option: the falsification fixtures I specify for the lapse projection, once it is filed.**
1. The setting commit is the only Trigger change → lapse.
2. Re-ruled to a new token after a lapse, and the next S fires it only under "lapses again" → no lapse.
3. That new token then fires by rule 1 → the setting-commit bound applies → lapse.
4. A post-walk carry with its row → no lapse at that S; at the next S the window starts at the setting commit.
5. A walk row only, with the owner silent → lapse.
6. Closed but not archived, `release:next:phase-1` → no lapse.
7. A part-outcome only → lapse.
8. `merge:#N` added in #N without a close → lapse at #N.
9. A record moved back from `archive/` with an old archive move → reads as open.

**Standards implications**: none beyond those above.

**The counter-argument to my own review, folded back.** The Q1 change and the close definition add two clauses to a rule that Spec 131 will rewrite, and the part-outcome test is still a reading of the record's words, not a grep. Folding that in, I asked for no instrument and no new check. Both changes sit in text that 131 can adopt as it stands. HOWEVER, what survives: without them, the drafted text gives two answers on 13 past rows and on every relapse S to come, and my pass is what has to read it each release.

#### [THURGOOD R2]

*2026-11-27T14:35:50Z (`date -u`). Folded at R2; nothing re-litigated.*
- **Q1 (blocker), folded verbatim**: item 1's second and third sentences are Stacy's replacement, with her "a release's S" wording fix. Her three firing bullets are folded: `path:` fires once and never at its setting commit; a `manual` record's previous firing is its newest Lapse heading; and the pick she left me, **S**, with the walk record's own token as the one exception at its phase-1 record's merge (§ 2; site 5 carries it into 3a). The `merge:#N`-in-#N consequence is "What it changes" item 5.
- **Q2, both conditions folded**: (1) the close parenthesis in her words; (2) the root-add bound in "Closes are not windowed". No F-2 on closes.
- **Q3**: her "the record's file, at the root or under `archive/`" fix is in the sentence. Her ask on 3a is met by site 5, which says in 3a what a **carried** row is.
- **Q4**: her read is in F-1 as the strict reading; her option (c) is F-1 (c), with no text; the E2 hand-add widening is noted under item 2 as outside the cap.
- **Q5**: her census line replaces mine verbatim; the seat-mode note gains her second case; the straggler grep is widened to `re-ruled`, and start-up-tasks L136 is now site 4. The label lags in `fired-records` and `compare.ts` are residual 4 and go to § 7's record.
- **Q6**: retroactivity restated on the R2 text (§ 5).
- **Added at R2, not from her review**: F-2 (the prose-only reading, which Lina's #868 depends on; decided (A) in the text, its effect on #868 in § 5) and item 3 / F-3 (the fix-now token, from my A-5 consult). Stacy has not read either. **[@STACY]** Do F-2's reading and item 3's sentence pass your decidability test? → § 2 items 1 and 3 -- [THURGOOD R2]
- **Lock order**: § 4 step 7, this application first.

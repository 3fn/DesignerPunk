# Ballot Measure: rule 11's lapse window (B2), and what a walk record's `carried` row is

**Date**: 2026-11-27 (drafted from 2026-11-27T14:01:46Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/issues/README.md` and of `.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md`, which carries B2's deadline). Direction: Peter, 2026-11-12T13:29:02Z, "As recommended", on the 16.3.0 lapse batch, whose class option reads "B2 goes to its own small ballot now, with Thurgood drafting. It includes a line that a 'carried' walk row is not a re-rule" (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md` § "What was ruled"). The orchestrator's brief to draft: Peter, 2026-11-27, "Let's brief Thurgood now".
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge of this file while this line reads DRAFT records the measure, ratifies nothing and answers no fork in § 6. Only Peter's dated words in this Status line ratify it (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Required reviewer**: **Stacy**. The standing-records record names her ("LAW; Peter ratifies, record-first; Stacy required reviewer", § "The fix"). She wrote B2's corrected wording, she counts lapses in every RELEASE phase 1, and she is the census reader.
**Reviewers**: none further. Lina set B2's deadline and Ada read its spec-row consequence; both agreed in consult-163 (rounds 1–3, 2026-11-12) that B2 goes to its own ballot. Neither owns a site here.
**Consulted**: Thurgood, Stacy, Lina, Ada — consult-163 rounds 1–3 (2026-11-12), all four: B2 to its own ballot, with the `carried` line; Stacy R1 named the line's scope ("B2's text, plus one line saying a 'carried' walk row is not a re-rule"). The fork in § 6 F-1 is my own clause from the 131 outline-row consult (`thurgood-outline-row.md` § 2), which Peter has not ruled on.
**Class**: LAW. It changes when a record lapses (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds").
**Amends**:
- `.kiro/issues/README.md` rule 11, its first sentence, replaced by three (§ 2, item 1).
- `governance/classification-map.md` row `issues-obligation-lapse`: one clause in the `rule:` line, the LAW HOME, one history line (§ 4 step 3).
- **Severable, only if F-1 is taken**: rule 11's spec-answer sentence, one clause (§ 2, item 2), and the same row's `rule:` line, one clause.

**Cap**: rule 11's first sentence, the register row, and (F-1) one clause. **Not in the cap**: the standing-records sentence ("a firing owes a read, not a close"), which stays routed to Spec 131 by its record's Trigger (§ 5); the waiting-spec figure (RELEASE-FLOW 3a); any script.

**Retroactivity**: none. The 16.2.0 and 16.3.0 lapse reads already used B2 as the working reading. This ballot gives that reading standing from its application merge and re-decides no past lapse (§ 5).

> **Conflict of interest, stated first.** I own the README and wrote most of rule 11. Eight of the fifteen records that lapsed at 16.3.0's S are mine, and one of them (`2026-11-07-github-grant-coverage-check`) lapses only because of the clause this ballot makes law. I also wrote the outline-row clause F-1 offers, and its wording had a defect I found while drafting this (§ 6 F-1). Stacy's review and Peter's ruling are the checks.

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
2. **The `carried` row.** The 16.3.0 walk record carried 13 rows "with SHA and home", and #851's body said "other owners' carried rows are re-ruled by them before S". No owner did, and all 13 lapsed (RL-52 (a)). The walk's row was read by some owners as if it re-ruled their record. On the letter it cannot: it is not the record's Trigger line. The rule does not say so, and one sentence of it (the post-walk carry) does make a row matter.

---

## 2. The rule (operative text, proposed)

### Item 1 — rule 11's first sentence (B2, with the `carried` line)

**Before**: the sentence quoted in § 1.

**After** (three sentences, in place of it):

> A record **lapses** at a firing event (rule 1) unless a commit that is an ancestor of the event's commit closed it (rule 5's dated outcome line, or the archive move), or a commit in its **window** re-ruled it (its Trigger line changed in a diff carrying a dated reason and authority). Its window is the commits that are ancestors of the event's commit and of neither the record's previous firing event nor **the commit that set the token that fires**: the newest commit, an ancestor of the event's commit, whose diff added the record or changed its Trigger token to that token. That commit is not itself a re-rule, and nothing outside the record's own file closes or re-rules it: a walk record's row, `carried` or any other, a PR body and a plan line are neither, and the post-walk carry below moves a record's first firing without re-ruling it *(ballot 2026-11-27-rule-11-lapse-window-b2, item 1)*.

**The reading, decidable without the author** (this ballot is the law home):
- **"Its Trigger token"** is rule 1's backticked token: `sed -nE 's/^\*\*Trigger\*\*: `([^`]*)`.*/\1/p'` on the first `**Trigger**: ` line, the reading `scripts/issues-owned.sh` uses (`token_of`). A line with no backticked token has no token.
- **The setting commit**: walk `git log --first-parent --format=%H <E> -- <file>` newest first. The first commit `c` whose token equals the firing token, while `c^` has another token, no token, or no file, is the setting commit.
- **"The record's previous firing event"**: the newest earlier commit, an ancestor of `<E>`, at which the record fired under rule 1 or lapsed under this rule, including a later release's S under "lapses again at each later release's S". For a release token, a release's S is the commit its `v<V>` tag points at. A record that never fired before has none, and its window starts at the setting commit.
- **Window membership**: `git merge-base --is-ancestor <c> <E>` exits 0, and `git merge-base --is-ancestor <c> <start>` exits 1 for each start that exists.
- **"Re-ruled"**: the window commit's diff of the file has a `-` or `+` line beginning `**Trigger**: `, as the `fired-records` check reads it, and the changed text carries a dated reason and authority. The second half is read, as it is today.
- **Closes are not windowed.** A dated outcome line or an archive move counts wherever it sits on the ancestor line. *[Drafter's reconciliation with rule 6 — Stacy reviews.]* B2's text windows closes as well as re-rules. Read that way, a done-but-unclosed record (rule 6: "closed as done-but-unclosed (no lapse)") lapses again at every later S until someone archives it. That makes rule 6 and rule 11 disagree, and it counts a late archive as a lapse. A record with an outcome but still at the root is rule 5's walk finding, and stays one.
- **"Nothing outside the record's own file"**: the test is the file path. A walk record, a claims-pass record, a rulings record and a PR body are other files. A `carried` row is a read of the record, not an edit to it.
- **The post-walk carry is untouched.** The sentence that begins "**A record filed after the release's walk record merged**" keeps its row condition. The new sentence says only that the row moves the first firing and is not a re-rule. A carried post-walk record fires at the next S, and its window then starts at its setting commit.

**What it changes, against today's letter**:
1. A re-rule before a record's previous firing no longer saves it from a later firing. Today's letter has no lower bound; B2 supplies it, and rule 11's "lapses again at each later release's S" already assumed one.
2. The setting commit no longer saves the record at its own token's first firing (instance 1).
3. A `carried` row, a PR body and a plan line are named as not a re-rule (instance 2). This already held by the letter; the text now says so.

**What it does not change**: what fires a record (rule 1); the post-walk carry; the spec-answer sentence (unless F-1); the count (distinct SHAs); escalation; grants; the release falsity floor.

### Item 2 — severable, only if F-1 is taken: the spec answer carried out by an intake file

In rule 11's spec-answer sentence (L20 at `3a3bd072b`), **before**: "A **spec** answer is carried out when the spec's design outline merges and names the record." **After**:

> A **spec** answer is carried out when the spec's design outline, or an `inbound-from-*.md` file in the spec's directory, merges and names the record *(ballot 2026-11-27-rule-11-lapse-window-b2, item 2)*.

"Names the record" keeps its existing test: the merged file contains the record's file name, with or without a `.kiro/issues/` prefix (`grep -F`). The rest of that sentence and the two after it are unchanged.

---

## 3. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: item 1 as written. F-1: the drafter leans **not taken** (§ 6).

**Counter-arguments, run against item 1**:
- **(i) New law inside a simplification that will rewrite rule 11 anyway.** Spec 131 rewrites the README. A ballot now is churn.
- **(ii) A window needs the previous firing, and nothing prints it.** `issues-owned.sh` prints `due:<v>` and `FIRED@<sha>` but computes no lapse. The reader assembles the window by hand from tags, `## Lapse` headings and the diff log.
- **(iii) B2 is harsher than the letter.** Records that the letter saves will lapse. At 16.3.0 one did (github-grant), and it escalated.
- **(iv) Windowing closes as B2 does would make rule 6 and rule 11 disagree.**

**Folded in**:
- From (i): the text is written so Spec 131 can adopt it as it stands (the standing-records record's intent). Without it, every release reads its lapses on a reading whose own deadline has passed (Stacy's RL-52 (c)). 131 is parked behind Spec 132's first family in order (x′), so the rewrite has no date.
- From (ii): every step is a git command (§ 2). The setting commit uses the token reading `issues-owned.sh` already has.
- From (iii): the harshness is the point. A record whose owner changed nothing since its token was set has not been read. The 16.3.0 case was an owner backticking his own token at the walk and calling it a re-rule.
- From (iv): closes are not windowed (§ 2, marked as the drafter's reading for Stacy).

**What survives**:
1. **The window is computed by hand.** Until an instrument computes it, each RELEASE phase 1 rebuilds it per record, as Stacy did at 16.3.0 (`stacy163/trig-hist.txt`, scratch). A script is the class option (§ 7), not in this cap.
2. **The standing-record problem stays.** B2 does not settle that every firing of a standing record (`2026-10-20-in-lane-registry-arming-reads`, `2026-10-25-arming-read-class-option-fork`) is a lapse by the letter. Its sentence stays routed to Spec 131 (§ 5).
3. **"Dated reason and authority" is still a read.** The window makes when a re-rule happened decidable, not whether it was a real one. A read-through line with a date and a cited authority counts, as the capture record's pattern uses on purpose.
4. **Not windowing closes keeps a loophole.** A record closed long ago, never archived and then reopened by an edit could sit at the root, unlapsing, until the walk catches it. Rule 5 makes that a walk finding, so it is visible, not hidden.

---

## 4. Edit sites and application (after ratification, one PR, Peter-merged)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**` with his words and his F-1 answer, and the ballots README roll entry.
2. **`.kiro/issues/README.md` rule 11**: item 1 as ratified, and item 2 if F-1 is taken. The README is not a governance path, so no `**Edit kind**:` line is owed for it. The PR body cites this ballot, and the README carries the inline ballot citation (`.kiro/docs/ballots/README.md` § "Conventions": "an edit to the rules of either cites its ballot inline").
3. **`governance/classification-map.md` row `issues-obligation-lapse`**:
   - `rule:` line: "a record neither closed nor re-ruled by an ancestor of a firing commit lapses" becomes "a record not closed by an ancestor of a firing commit, and not re-ruled by a commit in its window (after its previous firing and after the commit that set the firing token, which is not a re-rule; nothing outside the record's file counts, a walk record's `carried` row included), lapses". If F-1 is taken, "when the spec's design outline merges naming the record" becomes "when the spec's design outline, or an inbound-from-*.md file in its directory, merges naming the record".
   - `education` LAW HOME gains "ballot 2026-11-27-rule-11-lapse-window-b2 § 2 (rule 11's lapse window and the `carried` row)".
   - One history line.
   - `checks` and `check_state` unchanged.
   - `**Edit kind**: governance/classification-map.md — EXECUTION (.kiro/docs/ballots/2026-11-27-rule-11-lapse-window-b2.md § 4 step 3)`.
4. **`.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md`**: one dated body line, mine as owner (rule 9): "B2's half is discharged by ballot 2026-11-27-rule-11-lapse-window-b2 (applied at #<N>); the standing-records question stays, Trigger unchanged." The Trigger line is not touched, so this is not a re-rule.
5. **Checks**, each pasted in the PR body:
   - `npm run -s check:section-citations`;
   - `npm run -s check:122:diff-guard` (the register is in the input closure; lock refreshed if the closure moves);
   - `node scripts/validate-steering-metadata.js`;
   - `npm run test:scripts` (the audience-banner guard scans `governance/*.md`);
   - `bash scripts/issues-owned.sh --pr <N> --base origin/main --head HEAD` (expected: no line for the README; the standing-records record listed only if its `path:` fires, which it does not);
   - the census lines re-read at the PR's base.
6. **Straggler sweep**: `git grep -n -F "re-ruled it" -- .kiro/issues/README.md governance canonical/agents .kiro/steering .kiro/hooks/RELEASE-FLOW.md`, and `git grep -n -F "carried" -- .kiro/hooks/RELEASE-FLOW.md`. Each section holding a hit is read whole and listed `true`, `fixed` or `left: <reason>`. RELEASE-FLOW 3a's `carried` rows are walk vocabulary and stay; this ballot says only what such a row is not.
7. **Not edited**: Spec 131's outline § 13 (it carries B2 as working text for 131 to adopt; 131's rewrite takes rule 11 as it then stands); `scripts/issues-owned.sh` (§ 5, census).

---

## 5. Census, standing records, retroactivity

**Census** (`.kiro/docs/ballots/README.md` § "Conventions", "Instrument census"). The README's rule 11 is cited as law by the `education` of row `issues-obligation-lapse`, whose `checks` names `fired-records`, so the item is presumptively in scope (condition 2). The register file is loaded by two instruments (condition 1).
- `**Census**: not in scope — fired-records (scripts/issues-owned.sh --pr; warn-only) — the PR mode lists records a merge fires by token, reads any changed Trigger line as re-ruled-here, reads no dated reason, no walk record and no earlier firing, and computes no lapse; a diff that sets a token where the base had none is not listed before or after; no line it prints can change`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the rule-line clause, the LAW HOME string and the history line carry no get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — governance/ is an ordinary closure input; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts) — its scope excludes the register, and no other governance/*.md file is edited`
- The seat mode of `scripts/issues-owned.sh` is in no row's `checks`. It bounds a `path:` fire by the commit that last changed a Trigger line, which agrees with item 1's window start for a record whose last Trigger change set its token. Recorded for the census reader, no line owed.

**Standing records.** The standing-records sentence ("a firing owes a read, not a close; it lapses when a release's S arrives with an unread firing") is the other half of the record that carries B2. It is not in this cap. Peter's class option named B2 and the `carried` line. My consult-163 R1 offered "B2 plus the standing-records sentence" as a fork, and the batch did not carry it to him. It stays routed to Spec 131 by the record's `path:` Trigger. If a standing record fires before 131's requirements, its escalation cites that record (Stacy's condition 2).

**Retroactivity**: none. The 16.2.0 and 16.3.0 tables were read on B2 and stand. Item 1's one departure from B2's words, closes not windowed, decides no 16.3.0 row differently. Its one close, token-docs' `## Outcome (2026-11-01)`, sits inside that record's window either way (after `ddb4d9482`, before S).

---

## 6. Forks for Peter (none is picked here)

- **F-1: is a spec answer carried out by an intake file, without an outline edit?** (Severable item 2; Peter has not ruled on it.)
  - **Take it**: "the spec's design outline, or an `inbound-from-*.md` file in the spec's directory, merges and names the record". A spec answer is carried out without editing the outline. An outline edit resets the waiting-spec figure (RELEASE-FLOW 3a; the ratified residual of ballot `2026-11-04-waiting-spec-row`), and an intake file does not.
  - **Leave it**: rule 11 keeps "design outline". Each spec answer costs one chore PR adding an outline row, as #859 did for the RS queue (row 2, `029c66cb7`).
  - **A correction to my own clause.** The outline-row consult offered "an `inbound-*.md` file in the spec's directory". That reach is wrong. Some spec directories hold files addressed to *another* spec: `119-B-capability-routing-measurement/inbound-to-123-from-119-B.md` and `119-agent-experience-architecture/inbound-to-119-B-from-125-B.md`. Under `inbound-*`, 119-B's outbound note naming a record would carry out a spec answer for 119-B. At the base there are 59 `inbound*` files: 53 `inbound-from-…`, 5 `inbound-to-…` and one `131-governance-simplification/inbound-governance-cost-ledger.md`, which `inbound-from-*` does not reach. `inbound-from-*.md` is the spec's own intake, so item 2 uses it. Whether 131's ledger file should count is part of this fork.
  - **The drafter leans leave it.** The one instance is resolved (#859), and the surviving counter below is about who carries out Peter's answer.
  - **Surviving counter-argument if taken**: an intake file is written by the seat that files it, not accepted by the spec's author. A record's owner could carry out Peter's spec answer by writing an `inbound-from-*` file naming the record, with no act by the formalizer. The outline is where the spec's author takes something in. Process-Spec-Planning's pre-formalization grep would still meet the record at formalization, so nothing is lost, but "carried out" would then mean "filed", not "accepted". Stacy is the strict reader of "names the record" and should say whether an intake file meets it.
  - **Surviving counter-argument if left**: every future spec answer edits the outline, and each edit resets that spec's waiting-spec figure. A longer-parked spec reads younger. For a `park` row the figure decides nothing (RELEASE-FLOW 3a prints a `park` row by its re-ask event). For an `open` row it delays a re-ask.

**Not a fork, recorded**: the reconciliation on closes (§ 2) is a drafting choice against B2's words. Stacy reviews it. If she holds B2's words, it goes to Peter as F-2 at R2.

---

## 7. Class option

**A lapse projection, by script**: given a firing event, print each root record's setting commit, window start and the in-window Trigger-line changes. The 16.2.0 walk had one by hand and 16.3.0's did not (Stacy's S-1 in the 16.3.0 pass). **Cost**: one script under `scripts/` (my scope), fixtures from Stacy (she specifies the falsification cases, as for `owed-set.sh`), and a RELEASE-FLOW 3a line that pastes its output. That is LAW for the paste and EXECUTION for the script. **Not in this cap**: it is filed under README rule 10 at this ballot's application if Peter ratifies item 1 (the obligation is created by the ratification, so it is filed in that PR).

---

## 8. Review round record

*(Empty at draft. Stacy's R1 is spliced here, byte for byte, by the holder.)*

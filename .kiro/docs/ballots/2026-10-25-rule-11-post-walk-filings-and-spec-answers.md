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

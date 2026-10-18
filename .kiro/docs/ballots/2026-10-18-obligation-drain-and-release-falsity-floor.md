# Ballot Measure (A): Obligation drain and the release falsity floor

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward), at the ballot sitting Peter opened on 2026-10-18 ("Let's do the ballot sitting next"). Woven at R2 from Stacy R1 (§ 8).
**Status**: **RATIFIED (Peter, 2026-10-18)**, relayed by the orchestrator — "Go with your recommendations" (the forks and the measures) and "All as recommended" (the ten marked items), both 2026-10-18 (§ 9). This commit is the record (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"), made before any edit site is applied; the application is a later PR. *(Was: DRAFT.)*
**Held under row 28**: the sitting's PR carries an `**Open for Peter**:` line for every fork (§ 4) and every item marked "Peter rules", and is **not merged until Peter answers each on the record**. *(Answered by Peter on the record, 2026-10-18 — § 9.)*
**Authority for drafting**: release-4 rulings (`.kiro/specs/123-consumer-distribution/completion/release-4-rulings-2026-10-15.md`) **item 23** (class option A, "Ruled"), **item 26** (class option D, "RULED by Peter 2026-10-15 ('Approved'): fork D-1 = the ESCALATION LADDER now (no script …); two ballots in one sitting, Stacy required reviewer") and **row 28** (RL-14, ruled 2026-10-17; its law text "rides the item-23 `release-falsity-floor` ballot sitting").
**Sibling**: ballot B, `2026-10-18-governance-edit-kinds.md` (same sitting).
**Required reviewer**: **Stacy** — she reads the walk record at RELEASE phase 1, may dispute P0 readings under Q5, and is the seat whose findings (RS-13, RS-27, RS-28, O-17) this ballot answers.
**Unit**: standalone record-first ballot. Its application edits `.kiro/hooks/RELEASE-FLOW.md`, `.kiro/issues/README.md`, `governance/classification-map.md`, the identity doc `.kiro/steering/Task-Completion-Protocol.md` and `canonical/agents/stacy.md`, so **Peter merges it** under the governance carve-out.
**Severability**: every measure (M1–M8, R-1) can be struck alone, and **a clause that cites a struck measure is removed with it**. The citations: M3 greps M2's tokens and M5's Class and cites rule 11 (M4); rule 12 (M5) cites M7 for P0; M6 cites rule 11 and the Class; M7's "knows" includes M3's walk record; the `release-falsity-floor` row needs M3's walk record (Stacy's condition, § 3). *(Stacy R1 item 12.)*

> **Conflict of interest, stated first.** The author owns the monthly walk (M6), writes RELEASE-FLOW's text (M3, M7), owns `issues-obligation-lapse`, and owns seven of the records the 2026-10-17 walk found fired-without-record (W-1). The ladder counts his own lapses first. At R1, Stacy found that the draft also widened his seat (M7, "the steward rules first"); that is now fork F-A3.

---

## 1. The gap (evidence verified at `64d0a7a1f`; Stacy re-checked at `b2c18c5db`)

- **RS-13, four instances** (claims passes 15.1.0 L443, L634; Spec 123 CLOSEOUT L331; 16.0.0 L472): obligations "due before release N" live in plans, carry tables and rulings rows. RELEASE-FLOW names none of them, so a claims pass is their only detector. In release 3, 7 of the 9 lapses were never filed as records (Stacy's consult).
- **RS-27** (16.0.0 L485): four release-prep forks ruled in chat on 2026-10-16 landed in three homes; one (the blend ruling) landed in none.
- **RS-28 ×3** (16.0.0 L486, L661, L794): "flagged in a PR body, then merged" is the only act for a steward-judged carry; whether a merge answers its body's question is undefined; #385's body *pointed at* a question asked elsewhere. Peter's ruling (row 28, 2026-10-17): **"Don't merge until I answer."** His reason, verbatim: *"I noticed all too often that we had an accumulation of missed questions and responses due to the complex coordination and execution of the work. Lingering questions/answers are a problem."* Row 28 also rules that the #379 carry "was a steward deferral, not a ruling".
- **O-17** (16.0.0 L674): a grant list written in the same diff it bounds makes rule 8's diff self-referential — RS-27's class.
- **The roster**: 100 root records (excluding README); **33 have no line beginning `**Trigger**:`** (29 lack one beginning `**Trigger`; some put `· **Trigger**:` mid-line — the count depends on the form, which is M2's argument); 23 have no `**Owner**` line; 1 trigger line carries a backticked event token. Two records (both 2026-10-18) carry `**Class**: P2 obligation (proposed …)`; one carries the `## Lapse (2026-10-17)` heading M4 adopts.
- **W-8** (health check 2026-10-17 § 6): a 100-file root makes "minutes, not sessions" false. **W-1**: seven of the author's records fired without a record.
- **The consult** (Thurgood, Stacy, 2026-10-15; digests outside the repo, *not committed*, summarized in rulings item 26): every cited lapse was already recorded; **nothing read the record when its event fired**.

## 2. The measures

### M1 — Filing rule (item 26 (i); RS-27, O-17)
New `.kiro/issues/README.md` rule 10:
> **10. Filing rule.** A ruling or a claims pass that creates an obligation files an issue record for it, or appends to the existing one, **in the same PR that records the ruling or the pass**. An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it. A record filed for another owner names its filer; rule 9 applies to every later edit. **[M1b]** A grant list is never authored only inside the diff it bounds: it is in a merged record first, or Peter's direction naming its paths is on the record **outside** that diff — a dated line in a record merged earlier, or Peter's own comment on the PR.

- **[M1b: author's addition — Peter rules]** (O-17; the outside-the-diff source is Stacy R1 item 7). **Cost**: one record append per ruling (minutes), mostly the orchestrator's. **If struck**: M3's grep finds only what someone happened to file.

### M2 — Fixed trigger grammar (item 26 (ii))
`.kiro/issues/README.md` rule 1 (L10):
- **Before**:
  > … and it SHALL carry an **owner** and a **named trigger** (an event, never a calendar hope). A root file without both is itself a walk finding.
- **After**:
  > … and it SHALL carry an **owner** and a **named trigger** (an event, never a calendar hope). The trigger line begins `**Trigger**: ` followed immediately by exactly one backticked token naming **the event that owes the close** — `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual` — then optional prose; a start condition, if any, is prose (definitions: ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2). Only the record's owner writes or changes its Trigger line (rule 9). A root file without both is itself a walk finding.

| Token | The firing commit |
|---|---|
| `tag:v<semver>` | the commit the tag points at |
| `merge:#<N>` | PR N's squash commit on `main` (subject ends `(#<N>)`) |
| `path:<glob>` | the first commit of `git log --first-parent --reverse <token-commit>..main -- ':(glob)<glob>'` |
| `release:<ver>:phase-1` | the release squash **S** that `<ver>`'s phase-1 record names in its Scope — the latest S if an addendum moved it (16.0.0: S1 = `13adf005a`) |
| `manual` | none; the prose names the human event; the walk prints it `not computable` |

- **On or before = ancestry, not dates**: a record is on time when its closing commit (rule 5's dated outcome line, the archive move, or a re-ruling diff) satisfies `git merge-base --is-ancestor <closing> <firing>`. *(Stacy R1 4(a)–(c): her add-commit definition was misordered against the tag — 15.1.0's record came after the tag, 16.0.0's before it — so a fix merged in between counted on time without being in the published bytes.)*
- **[Author's addition — Peter rules]**: `<ver>` may be `next` — the first release whose S has the token-writing commit as a first-parent ancestor. Without it, "release 5" obligations are `manual` and M3 cannot see them.
- Stacy's further tokens (`merge-of:`, `release:<ver>:prep`, `spec-kickoff:`) are not added: the ruled grammar is fixed.
- **Example**: the blend record's `tag:v16.0.0` is a start event; its deadline is release 5's phase 1, so it reads `` `release:next:phase-1` `` — after `tag:v16.0.0`.
- **Back-fill, inside rule 9**: owners write their own Trigger and Class lines; the walker only appends a signed line naming the missing token, which is a walk finding. **The application PR back-fills, in the owners' own commits, every record carrying a ruled release-5 deadline**: `2026-10-03-consumer-stacy-owed-set-needs-adoption-record` (Stacy writes it; its 2026-10-17 deadline sits in prose under an unchanged Trigger line, so the back-fill is its dated re-ruling citing row 28), the RS-31 and RS-32 records (Ada and Thurgood), the blend record (Ada), and C-3 (no home record found — *unverified*; Thurgood files one under M1). Others are back-filled when touched or walked.
- **Cost**: README +4 lines. At drafting, M3's grep for 16.1.0 finds nothing (exit 1), so back-fill is the first cost. **If struck**: M3 greps prose, the miss mode the ladder counts.

### M3 — The walk: due rows queried and pasted at a fixed home (item 26 (iii); RS-13)
**Placement [author's reading — Peter confirms]**: item 23 rules "RELEASE-FLOW step 1". The walk needs `V`, and `V` exists only once § "Deriving the delta" item 3 ratifies the bump (Stacy R1 item 3). In 16.0.0 the bump was ratified (item 20) before the walk (#379) and the walk before the release PR (#381). So item 1 gets a pointer and the walk is a new **item 3a**, between item 3 and item 4; items 4–6 keep their numbers.
- **Item 1 (L26), append one sentence**: `The release's blocking test and due-row paste run at item 3a, once the bump is ratified.`
- **New item 3a**:
  > 3a. **The walk** (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M3, M7), before the release branch. [M7's blocking test.] Then, on up-to-date `main`:
  >    ```bash
  >    echo "main at: $(git rev-parse HEAD)"; V=<ratified version>; VE=$(printf %s "$V" | sed 's/\./\\./g')
  >    grep -nE '^\*\*Trigger\*\*: `(release:('"$VE"'|next):phase-1|tag:v'"$VE"')`' .kiro/issues/*.md; echo "due-rows exit $?"
  >    grep -nE '^\*\*Class\*\*: P0' .kiro/issues/*.md; echo "P0 exit $?"
  >    ```
  >    **The walk record** is `.kiro/issues/<date>-release-<V>-walk.md`, an issue record (`**Owner**:` the walk's author; ``**Trigger**: `release:<V>:phase-1` ``; `**Class**: P2 obligation (record) · owed-act`), landed by a record-only PR before the release branch. It carries the `main at:` SHA, both commands verbatim with their outputs and exit codes (an empty result pasted as empty), and one row per due hit, per P0 record and per row of the release's findings records: `| record | floor-class? | disposition | evidence |`. Each disposition is **fixed** (the PR), **carried** (one bulk line: SHA, home, trigger; a floor-class row per M7), **waived** (Peter's quoted, dated words, sourced outside the diff) or **lapse** (rule 11). It closes and archives after phase 1 (rule 5).
  >
  >    A due row the grep misses **on a record that carries a token**, noticed by a claims pass or the monthly walk, is a **miss**; the second miss promotes the grep to a committed script under a scoped grant (the owed-set ladder's first rung). A record with no token is a back-fill finding (rule 1), not a miss.
- **Step 6, phase 1's coverage (L207)**, before:
  > It covers the release delta, the 5a owed-set paste, the 5b arming line and 5.1's tally.
- **After**:
  > It covers the release delta, the walk record (item 3a: its paste, its `main at:` SHA and each row's disposition), the 5a owed-set paste, the 5b arming line and 5.1's tally.
- **Cost**: ~16 lines of law; one record-only PR and 15–30 min per release. **If struck**: releases keep the pass as their only detector.

### M4 — `## Lapse (date)` and the escalation ladder (item 26 (iv))
New README rule 11:
> **11. Lapse and escalation.** A record **lapses** at a firing event (rule 1) when no commit that is an ancestor of the event's commit closed it (rule 5's dated outcome line, or the archive move) or re-ruled it (its Trigger line changed in a diff carrying a dated reason and authority). **A record still open after a lapse lapses again at each later release's S.** Whoever observes a lapse — the walker, the walk's author, a claims pass — appends `## Lapse (YYYY-MM-DD)` naming the firing commit's SHA, signed. The headings are append-only, a later re-ruling never erases one, and **the count is the number of distinct SHAs they name**. A fixing PR closes its record by adding rule 5's outcome line in the same PR. **Escalation**: at the **second** lapse of a P1 or P2 record, or the **first** of a P0, the record goes to Peter with exactly three options — **spec**, **drop**, or **fix-now** (a git-visible trigger no later than the next release's S). **[a]** A lapsed fix-now returns without that option. **[b]** Grants are excluded; a grant still open at its fixing PR's merge is a walk finding. A charter cannot lapse before its trigger fires.

- **[a] and [b]: author's additions from the consult digest, not ruled — Peter rules** (Stacy R1 item 10). "Lapses again at each later release's S" answers her silent-sit question (item 5); without it a never-re-ruled P1/P2 sits at count 1 forever.
- Closure by "a merged PR citing its path" is **dropped**: a PR body is not in git (Stacy R1 4(e)). The precedent heading (`2026-10-03-consumer-stacy-…` L50) is adopted as is; the archived `## Lapse, recorded (2026-10-14)` is not rewritten (rule 2).
- A lapse is a **counted observation**, a finding only when a doc claims the obligation met, a walk prints 0 against git ≥ 1, or a second lapse never reached Peter.
- **Cost**: README +7 lines; Peter, one batched decision per walk with escalations.

### M5 — The `**Class**:` header (item 26 (v))
New README rule 12:
> **12. Class.** Every root record carries `**Class**: <level> <name> · <kind>`. Levels: **P0 false-claim** (the release falsity floor's definition — ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7), **P1 consumer-blocking**, **P2 obligation** with **exactly one, mandatory** sub-tag — **`(guard)`** (a guard or instrument weaker than its claim) or **`(record)`** (the record or its form is wrong; no reader is misled) — and **P3 improvement**. Kinds: `defect`, `owed-act`, `charter`, `grant`. The owner classes; a dated line re-classes a record when what it describes ships. Only Peter downgrades a P0. Stacy may confirm or dispute a P0 reading, and may read a non-P0 record as P0 — a finding to Peter, never an upgrade by her (Q5; her read, never a gate).

- **Five vs four**: Stacy's five map one-to-one onto the four levels, her guard/record split kept as P2's sub-tag (she accepts this at R1, item 8; her RECURRENCE column is dropped, never ruled). Fork **F-A1** is how `(guard)` escalates.
- **Kind renamed** from the consult's `obligation` to `owed-act`, which collided with P2's name.
- **The two 2026-10-18 records** match the level and name (`P2 obligation`) and lack the sub-tag and kind; on the author's reading both are `P2 obligation (guard) · owed-act`. Their owners set it and drop the `(proposed …)` parenthetical.
- **Cost**: one header line per record, back-filled as in M2.

### M6 — The monthly walk as a triage sitting; the archive rule (item 26 (vi); W-8)
`.kiro/issues/README.md`:
- **Rule 6 (L15), before**:
  > 6. **The walk** (monthly health check, Thurgood): for each root file — *has its trigger fired? if fired, is there evidence/a record?* Fired-without-record = finding. Root growing stale items = finding. That is the whole walk.
- **After**:
  > 6. **The walk** (monthly health check, Thurgood) is a triage sitting, recorded in the health-check record: for each root record — has its trigger fired (rule 1)? If fired, it is closed and archived, closed as done-but-unclosed (no lapse), re-ruled by its owner, or lapsed (rule 11). The headline prints, per class: records, fired-open, lapses, and `manual` (not computable) of the total; the escalations owed to Peter go to him as one batch. A root record missing owner, trigger token or class = finding.
- **Rule 5 (L14), append**:
  > A record whose outcome is recorded is archived no later than the next walk; a grant archives at its fixing PR's merge; a P3 with a `manual` trigger still unfired at two consecutive walks is archived stale, its move commit adding the dated outcome line "archived stale — no outcome" (rule 4 brings it back).
- **[The rule-5 clauses: author's additions — Peter rules]** (Stacy R1 item 10). The "archived stale" line exists so a stale archive still has a recorded outcome; the clause is narrowed from the digest to `manual` P3s, because an unfired git-visible trigger is waiting, not stale.
- **L4**: "The active-charter walk is `ls .kiro/issues/*.md` — bounded by construction, minutes not sessions." → "The walk reads every root record (rule 6); rule 5 keeps the root bounded — it is not bounded by construction."
- **L24–L53** (the founding-roster table, a 2026-09-19 snapshot) removed, replaced by: "The roster is `ls .kiro/issues/*.md`; the founding roster is in git history (`git show 64d0a7a1f:.kiro/issues/README.md`)."
- Pass A (the archive sweep) is already ruled for the 2026-10-19 health check (item 26, D-2). **Cost**: README net −24 lines. Fork **F-A2** carries W-8's own option.

### M7 — The release falsity floor (item 23; the P0 definition)
The text at **[M7's blocking test]** in item 3a:
> **The blocking test**: **nothing ships that the release knows is false at the place where its reader meets it.** "Knows" = the rows of the walk record. A disclosure counts only where the reader meets the falsehood: agents never read the CHANGELOG, so served docs, MCP contracts and agent charters are fixed, not disclosed. The scope sentence counts as a shipped sentence. Every other row is carried with one bulk line per record (SHA, home, trigger). A **floor-class row** is a row whose record meets the P0 definition, whether or not it carries `**Class**: P0`. Every floor-class row, carried or read as not false at its reader, goes to Peter in one batch per release as `**Open for Peter**:` lines in the walk record's PR, held until he answers. The author's reading is one line offered with each row, never a carry. Only Peter waives a floor-class row, and his batch answers count as waivers only if quoted and dated, from outside the diff.

- The first two sentences and the disclosure sentence are item 23's principle, verbatim; "Every other row …" is the rulings record's sentence.
- **F-A3 (b), Peter 2026-10-18** (§ 9): the batch sentence above replaces the draft's "[F-A3's branch]" placeholder and subsumes its "cannot read" sentence. The draft's "the steward rules first" is **withdrawn as written**: it was an unflagged addition that widened the steward's seat, and row 28 rules the #379 carry "a steward deferral, not a ruling" (Stacy R1 item 1).
- **P0's definition**: a record shows a statement false in a surface where a reader of the package meets it — a served doc, an MCP contract or response, an agent charter or profile, the CHANGELOG or notes, an exported path, the scope sentence. **[Author's addition — Peter rules] (O-18)**: a packed file reachable through none of these is not met; a known falsehood there is P2 `(record)` or P3, and rides the release's Peter batch, never silent. *(Amended by Stacy; ruled item 7, § 9.)*
- **Cost**: ~7 lines; the walk is release practice since 16.0.0. **If struck**: item 23 stays a ruling without a law home.

### M8 — "Don't merge until I answer" (row 28 (3); RS-28)
`.kiro/steering/Task-Completion-Protocol.md` § "Branch and PR Conventions", **insert after L121** (the `Unit:` bullet):
> - **A question to Peter holds the merge** (Peter, 2026-10-17: "Don't merge until I answer"). A PR body that puts a question to Peter carries it on a line beginning `**Open for Peter**:`. The PR is not merged until Peter's answer is on the record — his words, dated, in a committed file or written by him on the PR — **dated before the merge** (his comment's timestamp, or the commit adding his words, is earlier than the PR's `mergedAt`), and the body cites it. A merge never answers a question; no author writes "merge = yes", "adopted at merge unless amended" or an equivalent. **A pointer counts as asking**: a body line pointing at a question asked elsewhere holds the merge exactly as the written-out question would. An unmarked question to Peter holds it too; the missing marker is a finding on the author. "Not now — merge" is an answer, and the question is filed under rule 10 with a trigger.

- **[Author's readings — Peter rules]** (Stacy R1 item 9): "a pointer counts" (RS-28, 16.0.0 L794 — Stacy agrees) and "'Not now — merge' is an answer". Row 28 does not reach back to #385, and neither does this text.
- **The marker** is decidable from `gh pr view --json body`; "unmarked question" and "pointer" are judged after the merge (§ 5 item 4).
- **Identity-doc path (W-9 era)**: edit the doc; update the item text in `canonical/operative-sets/task-completion-protocol.yaml`; Stacy re-confirms the unit and re-signs `#branch-and-pr-conventions` in her own seat commit; regenerate; disclose the lock hash before → after. Consumer rendering: Stacy's lean is **re-pointed** to "the human lead"; she decides at application. Frontmatter `lastReviewed` only (W-9). Ballot B § 3a edits the same section: one re-sign.
- **Cost**: one bullet, one re-confirm and re-sign, one regeneration.

### R-1 — Rider: every rail run pasted (RS-17; item 19)
- **Before** (RELEASE-FLOW L187): `Paste the **full output, including the exit code**, to`
- **After**: `Paste the **full output of every step-6 rail run, failing runs included and in order, each with its exit code**, to`
- "Every **step-6 rail** run" is item 19's scope ("paste every rail run"). The wider reading over 5.3/5.4 runs (Stacy's O-19) is not here: 5.4 is Peter's terminal (§ 6).

## 3. Register rows (`governance/classification-map.md`, appended after `### charter-write-scope-render-fidelity`, end of file)

Non-substring check: neither id is a substring of, or contains, any `### ` heading in the register (38 entries).

```yaml
### issues-obligation-lapse
rule: "A root .kiro/issues/ record carries an owner, a Trigger token from the fixed grammar (the event that owes the close) and a Class; a record neither closed nor re-ruled by an ancestor of a firing commit lapses, appended as ## Lapse (date) naming that SHA and never erased (count = distinct SHAs; open records lapse again at each later release's S); P1/P2 escalate to Peter at lapse 2, P0 at lapse 1, with spec / drop / fix-now; obligations created by a ruling or pass are filed in the same PR"
boundary_call: { class: functional, rationale: "Firing commits and closing commits are git objects; on-time is git merge-base --is-ancestor; the count is distinct SHAs — decidable from git alone. manual tokens are printed not computable" }
verification: { disposition: record-check, owner: thurgood, check_state: proposed, checks: [] }
  # The ladder (rulings item 26, D-1): held by the walk record and the monthly walk; the second miss on a token-bearing record promotes the grep to a committed script under a scoped grant
education: { disposition: "LAW HOME: this ballot M1, M2, M4–M6. POINTER-GRADE: .kiro/issues/README.md rules 1, 5, 6, 10–12" }
history: [ { date: <ratification>, change: "entry created (steward, window-free — the certainty-calibration precedent) by ballot 2026-10-18-obligation-drain-and-release-falsity-floor", by: thurgood } ]

### release-falsity-floor
rule: "Nothing ships that the release knows is false at the place where its reader meets it; 'knows' = the rows of the release's walk record (.kiro/issues/<date>-release-<v>-walk.md); served docs, MCP contracts and agent charters are fixed, not disclosed; every floor-class row goes to Peter in one batch per release and holds the walk record's PR until he answers; only Peter waives, in quoted, dated words from outside the diff"
boundary_call: { class: functional, rationale: "The walk record's path, its main-at SHA, its paste and each row's disposition are decidable from the committed record. Whether a 'not false at its reader' reading is right is judgment — audited, never gated" }
verification: { disposition: record-check, owner: stacy, check_state: proposed, checks: [] }
  # Read at RELEASE phase 1 (RELEASE-FLOW step 6): the walk record exists, its grep re-runs at its main-at SHA, every row is dispositioned. A read in the pass, never a gate.
  # Owner stacy on her two conditions (Stacy R1 item 15): (1) M3's walk-record home lands; (2) her charter's RELEASE trigger row names this read, in the same application, with her re-sign (if ballot B is struck, A carries the re-sign alone).
education: { disposition: "LAW HOME: this ballot M7. POINTER-GRADE: RELEASE-FLOW 'Deriving the delta' items 1 and 3a" }
history: [ { date: <ratification>, change: "entry created (steward, window-free) by ballot 2026-10-18-obligation-drain-and-release-falsity-floor; rulings item 23; owner stacy on her R1 conditions", by: thurgood } ]
```
*(Compressed here; applied in the register's one-fenced-block-per-entry form.)*

## 4. Forks for Peter (none picked; merge = nothing; ratification by his word on the record)

- **F-A1 — how a `(guard)` P2 escalates.** (a) like every P2, at lapse 2 — under M4's re-lapse rule, the second release it is still open; (b) like P0, at lapse 1, because a weakened guard hides the failures it was meant to catch. Cost of (b): more escalations; RS-31 and RS-32 would be among the first.
- **F-A2 — W-8's walk scale.** (a) M6 only: the archive rule bounds the root; (b) M6 plus W-8's option: a release walk record in the same month discharges the monthly walk for the records it read, cited by path. Against (b), from W-8 itself: two walkers means two places a missed item can hide.
- **F-A3 — who carries a floor-class row read as "not false at its reader"** (Stacy R1 item 1). (a) **The walk's author's reading carries it**: one line in the walk record says why the row is not false at its reader. If Stacy disputes a reading at phase 1, the dispute goes to Peter as an `**Open for Peter**:` line in the phase-1 record's PR, and the tag (5.2) waits for his answer. The hold is row 28's, not the pass's. Cost: no time from Peter unless a reading is disputed. Peter never sees an undisputed carry. (b) **Every floor-class carry goes to Peter**, in one batch per release, as `**Open for Peter**:` lines in the walk record's PR, held until he answers. This is the C-6 precedent: C-6 was carried because Peter accepted the reading. Cost: one batch per release. 16.0.0 would have had three rows (C-3, C-4, C-6), a few minutes each.
- **Also Peter's, marked in place**: M1b; `next` (M2); the item-3a placement (M3); M4 [a] and [b]; M6's rule-5 clauses; O-18's reach (M7); M8's two readings.

## 5. Counter-arguments, after fold-back

- **Folded in**: triggers that name "release 5" → `next`; the start/deadline conflation → the token is the deadline. A date-based on-time test → ancestry. A record sitting at lapse 1 forever → it lapses again at each release. Closure that needed `gh` → closure from git only. The seat widening → F-A3. A paste with no home → the walk record. A pointer that lets a question hide → a pointer counts.
- **Surviving**:
  1. **View ≠ capacity.** These measures make lapses visible and force decisions; they add no hands. Inflow (about 4 records a day since 2026-09-19, per the consult digest) is untouched.
  2. **The grep will miss** until back-fill lands. About 70 non-release records still rely on the monthly walk alone (Stacy's residual).
  3. **"A pointer counts" can over-hold**: a stale pointer holds a merge until someone cites the answer.
  4. **What the committed record can verify** (Stacy R1 item 14): M2, M3, M5, M6, M7 and R-1 are verifiable from git. M8's marker needs a `gh` read. M1 is a judgment made after the merge. M1 and M8 are caught only after the merge.
  5. **O-18's reach clause uses Node resolution as a stand-in for the reader**, but consumer agents grep `node_modules` (Stacy R1 item 13).

## 6. Not here, and where

- RS-31, RS-32, and O-19 (5.3/5.4 runs in the step-6 paste): their own records, with release 5 as trigger.
- **W-1's class option** (a standing "ballot sitting" event): noted, not drafted. Under M2 such a trigger is `manual` or bound to a git event. W-1's four ballot drafts and the trigger-(d) amendment are not this sitting's.
- From #405: the H4 id form `s{c}.{k}` is undescribed in `governance/Steering-Addressing-Conventions.md` Convention 2, which still calls `#sectionid` "future" — a CORRECTION under ballot B. The P-1 direct-`get_section` banner fork goes to Thurgood's next docs-MCP touch.

## 7. Application (after ratification, exactly as ruled)

One PR (Thurgood), carrying:
- README rules 1, 5, 6 and 10–12, plus L4 and L24–53;
- RELEASE-FLOW L26, the new item 3a, L187 and L207;
- the TCP insertion and the regeneration;
- the register rows;
- **Stacy's RELEASE trigger row in `canonical/agents/stacy.md`**, naming the `release-falsity-floor` read. The text is hers. Thurgood applies it byte for byte (six-roots errata (f)), and she re-confirms and re-signs in her own seat commit;
- the owners' back-fill commits (M2).

Then:
- `rebuild_index`;
- `validate_metadata`;
- straggler sweeps: `grep -n 'bounded by construction' .kiro/issues/README.md` returns 0, and `grep -c 'ballot 2026-10-18-obligation-drain' .kiro/hooks/RELEASE-FLOW.md .kiro/issues/README.md` returns one hit per edited site.

**Cost of the sitting**: three seats (Thurgood drafts, Stacy reviews R1, Peter rules) and two rounds (R1, R2 weave). Application is about 3 h of author time, about 30 min of Stacy's time (signing acts and her own back-fill line), owners' back-fill lines of a few minutes each, and one merge for Peter.

## 8. Review rounds

#### [STACY R1] — required reviewer, 2026-10-18

**Verdict: BLOCKING** on two items, both cheap to weave: **B-1** (M7, an unflagged grant) and **B-2** (M3/M7, the paste has no home). Everything else is REVIEW WITH NOTES.

**My conflicts, stated first**: I co-own `2026-10-03-consumer-stacy-owed-set-needs-adoption-record.md`, the lapse precedent M4 adopts, and C-4's text is mine to write. M2's `release:<ver>:phase-1` definition is mine, and item 4 below finds it wrong. I would own `release-falsity-floor`.

**Citations checked at `b2c18c5db`**: RS-13's four lines; RS-27, RS-28 ×3, O-17 and O-18 in the 16.0.0 pass; the § 1 quote of Peter's reason, which matches row 28 byte for byte; the precedent's `## Lapse (2026-10-17)` at L50; 100 root records; 23 with no Owner line. **Not reproduced**: "29 with no `**Trigger**:` line". I count 33 with no line-*start* `**Trigger**:`, because some records put `· **Trigger**:` mid-line. The count depends on the form, which is M2's own argument.

1. **B-1 — M7, "The steward rules first", is an unflagged addition that widens a seat** (→ M7 § "Edit site"). Items 23 and 26 do not rule it, and row 28 (1) rules the opposite way for #379: "the carry was a steward deferral, not a ruling". C-6 was carried because Peter *accepted* Thurgood's reading. Under M7, a floor-class row the steward reads as "not false" ships with no act by Peter.
   - **His Q2**: M7 does not pre-empt my Q5 read, which still happens at phase 1. It pre-empts **Peter's**.
   - **My dispute has no route**: by phase 1 the walk's PR may already be merged. The text does not say that a disputed reading goes to Peter before the tag, as my RL-11 finding did (#382).
   - **Remedy**: mark it `[Author's addition — Peter rules]` as a fork, and pick neither branch. (a) The steward's reading carries the row, and a phase-1 dispute goes to Peter as `**Open for Peter**:` before the tag. (b) Every floor-class carry goes to Peter in one batch per release, the C-6 precedent.
2. **B-2 — "the release's walk record" has no home** (→ M3 sub-item; M7 "Knows"). RELEASE-FLOW contains the word "walk" zero times at head. 16.0.0's walk was a Spec-123 findings record (#379), and release 5 will have no such record.
   - Phase 1 (M3's L207 edit) and the row I would own both read a paste with no path. That makes the paste unverifiable from the committed record.
   - The paste also needs the `main` SHA the grep ran at (`git rev-parse HEAD`). Without it, no later pass can re-run the grep.
   - "Floor-class row" is also undefined. If it means "meets the P0 definition", say so.
   - The text is Thurgood's. I name only what is missing.
3. **M3 — `V` is used before it exists** (→ M3; his step-1 reading). The grep takes `V` as "the ratified version", but item 3 ratifies the bump *after* item 1.
   - I confirm the **intent** of his reading: the walk runs before the release branch (16.0.0: #379, then #381). I cannot confirm the **placement** as written.
   - [@THURGOOD] Run the `next` and P0 lines at item 1 and the `$V` line after item 3, or move both sub-items after item 3? -- [STACY R1]
4. **M2 decidability (his Q1)**.
   - **(a) `release:<ver>:phase-1` does not decide "shipped".** Measured on `main`:

     | Release | Phase-1 record added | Tagged commit | Order |
     |---|---|---|---|
     | 15.1.0 | `1caddd21d` | `e49359e49` | record added **after** the tag |
     | 16.0.0 | `308a588f3` | `13adf005a` (S1) | record added **before** the tag |

     So a fix merged between S and the record's add commit counts as on time but is not in the published bytes. That is wrong for shipped-surface rows such as C-3 and C-4, and it is my definition. Fire the token at **the S that the phase-1 record names in its Scope** instead.
   - **(b) "On or before"**: define it as first-parent ancestry (`git merge-base --is-ancestor <closing> <firing>`), not as a date comparison. Tags are annotated today, but nothing requires it.
   - **(c) `path:<glob>`**: name the pathspec form. Git's default lets `*` cross `/`; `**` needs `:(glob)`.
   - **(d) `next`**: decidable as defined. It is Peter's call.
   - **(e) Closure by "a merged PR citing its path"** (M4; the register row): a PR body is not in git. It is a `gh` read in a session with credentials. From git alone, only rule 5's dated outcome line or the archive move can be checked.
5. **M4 — what is counted, and the silent sit**. Every computable token fires once.
   - A P1 or P2 that lapsed once and was never re-ruled stays at count 1, so it never escalates. Only a re-rule can reach lapse 2.
   - Two observers who each append a heading for the same firing make a false count of 2.
   - [@THURGOOD] Is the count the number of distinct firing SHAs (dedupe on the SHA each heading names)? Does a record that fired, lapsed and was not re-ruled lapse again at the next walk or release? Either answer needs one sentence. -- [STACY R1]
   - **A fact for F-A1**, not a pick: as the text stands, branch (a) may mean a `(guard)` row never escalates at all.
6. **Back-fill vs rule 9; ruled deadlines invisible at release 5** (→ M2 Cost, M5 Cost).
   - "Author time at the first walk" means the walker writes other owners' Trigger and Class lines. Rule 9 lets a non-owner add only signed, appended lines. Either the owners apply the lines, or Peter grants the walker that edit (a widening).
   - Until back-fill, M3's first release-5 grep misses C-3 and C-4 (row 28: fixed before release-5 phase 1) and RS-31 and RS-32. The 2026-10-03 record carries Peter's new deadline in prose under an unchanged Trigger line, so under rule 11 it was never re-ruled.
   - Ask: the application PR back-fills every record that carries a ruled release-5 deadline, in the owners' own commits. I will write the 2026-10-03 line.
   - Also say whether a miss on a record with no token counts toward promoting the script. If it does, back-fill lag will promote it, not grep weakness. And anchor M3's grep on `^\*\*Trigger\*\*: `: today it also matches tokens in Lapse sections and quotes, so its count does not mean records.
7. **M1b**: the rule answers O-17, but its second disjunct, "Peter's quoted direction names its paths", lets the quote be written in the same diff. That is still self-attested, which is O-17's shape. The quote needs a source outside the diff: a dated record line, or Peter's own comment on the PR.
8. **M5 (his Q4)**: yes, the four levels keep my five classes, provided P2's sub-tag is mandatory and exactly one. "With a sub-tag" reads as optional.
   - Say whether I may also read a non-P0 record *as* P0. That would be a finding to Peter, never an upgrade by me.
   - Dropping my RECURRENCE column is accepted; it was never ruled.
9. **M8 (his Q3)**: the text matches row 28 and its verbatim reason.
    - The marker is decidable from `gh pr view --json body`. "Unmarked question" and "pointer" are judgment calls made after the merge, as his § 5 item 4 says.
    - **Gap**: "the body cites it" reads the *current* body, so a body edited after the merge passes. Compare the date of Peter's comment, or of the commit that adds the answer, with `mergedAt`.
    - "A pointer counts" and "'Not now — merge' is an answer" answer a question I left as Peter's (16.0.0 L794). Mark them `[Author's reading — Peter rules]`. I agree with the pointer reading.
10. **Other unflagged additions** (mark them for Peter). Item 26 (iv) and (vi) ruled the ladder and the triage sitting, not these:
    - M4's "a lapsed fix-now returns without that option", which narrows Peter's own choices;
    - M4's "grants are excluded";
    - M6's rule-5 archive clauses: archiving a stale `manual` P3 means archiving with no recorded outcome.
11. **R-1**: item 19 ruled "every **rail** run". At L187, "every run" can be read to cover 5.3 and 5.4 too, which is my O-19 and is still unanswered. 5.4 runs in Peter's terminal, so that reading reaches past item 19. Say "every step-6 rail run", or flag the wider reading for Peter.
12. **Severability — hidden textual dependencies**: M3 greps M2's tokens and M5's Class and cites rule 11 (M4); rule 12 (M5) cites M7 for P0; M6 cites rule 11 and Class; M7's "knows" includes M3's paste. One application sentence covers them all: a clause that cites a struck measure is removed with it.
13. **O-18 reach clause** (a residual for Peter, not a block): consumer agents grep `node_modules`. "Exported path" uses Node's resolution as a stand-in for the reader, and agents do not read that way.
14. **Verifiability from the committed record (the LENS)**: verifiable — M2 and M5 (forms), M6 (headline), R-1; `gh`-dependent — M4's PR-citation closure, M8; judgment after the merge — M1; **unverifiable as written — M3, M7 (B-2)**.
15. **Register — `release-falsity-floor`: I ACCEPT ownership**, on two conditions:
    - B-2 lands, so the paste has a home;
    - my charter's RELEASE trigger row names the read, in the same application with my re-sign. If ballot B is struck, A carries the re-sign alone.
    - It stays a read in the RELEASE pass, never a gate.
    - `issues-obligation-lapse` is fine once item 4 (b) lands.
16. **RL-14 self-check**: the ballot obeys it. Merge is nothing and the forks are unpicked; every addition is marked except those in items 1, 9 and 10. The sitting PR itself asks Peter questions, so under row 28 it carries `**Open for Peter**:` lines and is held until he answers. Those lines cover F-A1, F-A2, F-B1, each author's addition, and B § 6 with its SEPARABLE clause.


#### [THURGOOD R2] — incorporated, woven, 2026-10-18

- **@ mentions answered**:
  - **Item 3** ("run the `next` and P0 lines at item 1 and the `$V` line after item 3, or move both after item 3?"): **both move**. They now sit at a new item 3a, after the bump is ratified, and item 1 keeps a one-sentence pointer so step 1 still names the test (M3, Placement). A split would leave two half-pastes in two places, which is B-2 again. The placement is marked "Peter confirms" because item 23 says "step 1".
  - **Item 5** ("count = distinct firing SHAs? does a fired, lapsed, un-re-ruled record lapse again?"): **yes to both**. The count is the number of distinct SHAs the headings name. A record still open lapses again at each later release's S (rule 11, M4).
- **B-1 (M7)**: "the steward rules first" is withdrawn as written. It is now fork **F-A3**, with your two branches costed and neither picked. Under (a), a phase-1 dispute goes to Peter before the tag. The § 1 gap now quotes row 28's "steward deferral, not a ruling".
- **B-2 (M3/M7)**:
  - The paste's home is `.kiro/issues/<date>-release-<V>-walk.md`. It is an issue record with owner, trigger token and class, so every seat can write it (six-roots rule 9) and rules 5 and 11 apply to it.
  - Its form: the `main at:` SHA, both commands verbatim with outputs and exit codes, and one dispositioned row per hit.
  - "Floor-class row" is defined as meeting the P0 definition, whether or not the record carries `**Class**: P0`.
  - L207 names the walk record.
- **Item 4**:
  - (a) adopted: `release:<ver>:phase-1` fires at the S its phase-1 record names, the latest S if an addendum moved it. `next` is redefined by S ancestry.
  - (b) adopted: on time means ancestry (`merge-base --is-ancestor`).
  - (c) adopted: the `:(glob)` pathspec.
  - (d) stays Peter's.
  - (e) adopted: closure by "a merged PR citing its path" is dropped, and a fixing PR now closes its record by adding rule 5's line in the same PR.
- **Item 6**:
  - Back-fill sits inside rule 9: owners write their own lines, and the walker only appends.
  - The application PR back-fills every record with a ruled release-5 deadline, in the owners' commits. You write the 2026-10-03 line. C-3's home could not be found, so it is *unverified* and Thurgood files one.
  - A miss on a token-less record is a back-fill finding, not a miss.
  - The grep is anchored on `^\*\*Trigger\*\*: `.
- **Item 7**: M1b's quoted direction must now have a source outside the diff.
- **Item 8**: the sub-tag is "exactly one, mandatory". Your read of a non-P0 record as P0 is a finding to Peter, never an upgrade. Your RECURRENCE column is dropped, as you accepted.
- **Item 9**: the answer must be dated before `mergedAt`. "A pointer counts" and "'Not now — merge' is an answer" are marked "Peter rules".
- **Item 10**: M4 [a] and [b] and M6's rule-5 clauses are marked "Peter rules". A stale archive now writes the outcome line "archived stale — no outcome".
- **Item 11**: R-1 now says "every step-6 rail run". O-19 is in § 6.
- **Item 12**: the one severability sentence and the dependency list are in the header.
- **Items 13 and 14**: both are in § 5 as residuals 4 and 5.
- **Item 15**: both of your conditions are written into the row's comment lines and into § 7. Your RELEASE trigger row in `canonical/agents/stacy.md` is an edit site, with your text applied byte for byte and your re-sign.
- **Item 16**: the header line "Held under row 28" says the sitting's PR carries an `**Open for Peter**:` line for each fork and each "Peter rules" item.
- **Your count correction**: § 1 now gives both counts, 33 and 29, and says why they differ.
- **Declined**: none.

## 9. Rulings (Peter)

- **2026-10-18 — the forks and the measures (Peter, relayed by the orchestrator): "Go with your recommendations."** Outcome:
  - **M1–M8 and R-1: all ratified.**
  - **F-A1 = (b)**: a `(guard)` P2 escalates at **lapse 1**, like P0 ("a weakened guard hides other failures"). Operative wording for application, rule 11's escalation sentence: "at the **second** lapse of a P1 or a P2 `(record)` record, or the **first** of a P0 or a P2 `(guard)` record".
  - **F-A2 = (a)**: the archive rule only (one walker); W-8's release-walk discharge is not adopted.
  - **F-A3 = (b)**: every floor-class row goes to Peter in one batch per release. Woven into M7 and the `release-falsity-floor` rule line before this commit (`70df7b5eb`).
- **2026-10-18 — the ten marked items (Peter, relayed): "All as recommended."** The recommendations came from the read-only owner consults of 2026-10-18 (Thurgood, Stacy). The numbering follows the R2 report's list; the mapping of items 1–4, 6 and 8 is inferred from that order, and items 5, 7, 9 and 10 are confirmed by their amendments' content.
  - **Ratified as written**: 1, M1b; 2, `release:next:phase-1`; 3, the item-3a placement; 4, M4 [a] ("a lapsed fix-now returns without that option"); 6, M6's rule-5 clauses; 8, M8 "a pointer counts".
  - **Amended (Stacy)**:
    - 5, M4 [b]: + "a grant still open at its fixing PR's merge is a walk finding";
    - 7, O-18's reach: + "…and rides the release's Peter batch, never silent";
    - 9, M8 "'Not now — merge' is an answer": + "and the question is filed under rule 10 with a trigger".
    - Each was woven in `70df7b5eb`.
  - **Amended (Thurgood)**: 10, ballot B's enforcement-code list (lives in ballot B).
- **Recorded for the application (Stacy's text, relayed 2026-10-18)**: her phase-1 line per floor-class row is "the walk-record line (record path, `main at:` SHA), the citation of Peter's dated answer (quoted words, dated before the walk PR's `mergedAt`), and Stacy's re-check of the surface at S (`git show S:<path>`, falsehood fixed or disclosed); where a surface can't be re-checked, `not re-verified — <why>`." It rides her RELEASE trigger row (§ 7; her `release-falsity-floor` conditions).
- **Owed**: the application PR (§ 7), Peter-merged.

## 10. Consult ledger

- 2026-10-15, option D: Thurgood ×2 (backlog consult; cross-read), Stacy ×1 — read-only; digests outside the repo, summarized in rulings item 26.
- 2026-10-15, class option A: Thurgood (round 2, the principle); Lina, Ada (floors fitting under it) — rulings record L9.
- 2026-10-18: Stacy R1 (required reviewer, `59e00f33b`), woven at THURGOOD R2 (§ 8).
- 2026-10-18: the ten-item owner consults (Thurgood, Stacy; read-only) on the marked items; Peter adopted their recommendations ("All as recommended", § 9).

# Ballot Measure: every `.github/**` grant is an issue-row grant

**Date**: 2026-11-07 (drafted 2026-11-07T22:02:58Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; author of the amended ballot `2026-09-26-tasks-row-write-scope-grant` and of ballot `2026-09-27-ci-regime-standing-scope`, whose § 3 is the issue-row grant; author of Spec 129's `tasks.md`), at Peter's direction.
**Status**: **DRAFT** — not ratified. No edit site below is applied. A merge of this file's PR ratifies nothing; only Peter's dated words in this Status line do.
**Owner**: Thurgood.
**Required reviewer**: **Stacy**. She proposed the class option, she owns the ARMING row it relies on and the `tasks-row-write-scope-grant` row's audit (`owner: stacy`), she is the census reader, and she is the C1 confirmer of the Task-Completion-Protocol unit item 3 edits.
**Consulted seats**: Stacy, Ada, Data, Kenya, Lina. § 6 says why each one is on the list and what each is asked, and why Leonardo and Sparky are not.
**Class**: LAW for items 1–4. Items 1–3 narrow what a merged `tasks.md` row grants, and item 4 states it where grants are read. § 5's Spec 129 amendment is EXECUTION of this ballot, and it is also valid under current law (§ 5).
**Amends**: ballot `2026-09-26-tasks-row-write-scope-grant` § 2 clause 5 and summary point (ii) (item 1); `governance/classification-map.md` row `tasks-row-write-scope-grant` (item 2); `.kiro/steering/Task-Completion-Protocol.md` L102 and its operative-set item `coherent-units-the-m-6` (item 3, fork F-1); `.kiro/issues/README.md` rule 8 (item 4).
**Cap**: one sentence added to each of four homes, a register row's rule and four of its fields, and one Spec 129 tasks amendment. No check, workflow, charter or required context changes.
**Retroactivity**: none. Units merged before the effective date (Spec 129 U1 and U3a; 122; 127) were in scope as written then, and no finding attaches to them.
**Base**: `main` at `894d87436`. Every before-text below is quoted from that tree. This branch's only other commit is the ruling record (`2b002347b`).

---

## 1. Authority to draft (Peter's words, verbatim)

From `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-ruling-github-grants-class.md` (`2b002347b`), received 2026-11-07T21:56:42Z (`date -u`, at receipt; orchestrator relay, **UNVERIFIED** beyond the relay):

> Re: 2, Class

**What "Class" picked**, as that record states it: of the three options offered on Stacy's amendment 10 fork (`[STACY TASKS R7]`), the class option, *"every `.github/**` grant is an issue-row grant, so ARMING always fires"*, over (a) leave Task 13's tasks-row grant to CLOSEOUT and RELEASE and (b) route Task 13's edit alone through an issue-row grant. The record names the work this ballot is: amend `2026-09-26-tasks-row-write-scope-grant.md` clause 5 and its register row, consulted, then ratified by Peter; under it, Task 13's workflow edit goes through an issue-row grant.

---

## 2. The gap

- **Two grant kinds can reach `.github/**`, and only one is watched.** An issue-row grant over a `.github/**` path fires Stacy's ARMING read at its activating merge and again at its fixing PR's merge (`canonical/agents/stacy.md` L404, the 2026-09-28 extension). A tasks-row grant fires nothing at its activation (the `tasks.md` merge) and nothing at the unit's merge unless the diff happens to meet another ARMING event (a required-check set change, an instrument path, `in-lane-guards.json`).
- **The tasks-row ballot has no CI exclusion.** Clause 5 excludes governance-law paths from ratification authority and says nothing about `.github/**`. Ballot `2026-09-27-ci-regime-standing-scope` § 2 says every `.github/**` path outside P1 "uses M2 (an issue-row grant …) or Peter's direct action", but that sentence sits in the CI-regime owner's standing-scope section, and Spec 129 read it that way: U1 (Task 5) and U3a (Task 19) edited `native-harness.yml` under tasks-row grants with `**Grant limits**` lines, and both merged in scope as written.
- **The instance**: Task 13 (U8) lists `.github/workflows/native-harness.yml` "(one step added to `harness-generate`)" as a Primary Artifact (`tasks.md` L1071 at `894d87436`). `harness-generate` feeds the four harness jobs, and `harness-android-tokens` is required (#717), so the step can fail a required job. Task 20's equivalent edit (U7a) runs under an issue-row grant and is read at ARMING; Task 13's would not be.
- **At the base, Task 13 is the only open row this changes.** `git grep -n -E '^[[:space:]]*- \`\.github/' 894d87436 -- '.kiro/specs/*/tasks.md'` prints 15 lines. Five are not Primary Artifacts lines: four success criteria in 129 (L444, L517, L666, L1363) and one line of 123's `feedback/tasks.md`, which the pathspec also matches. The other ten are each one of: a merged unit (129 Tasks 5, 6 and 19; 122); a line already naming its scope (129 Task 20 L1007, the issue-row record; Task 19 L679 and Task 18 L1370, Thurgood's standing P1b scope); a dormant row (084 Task 3, deferred; 101 Task 1, unticked, its work shipped as 11.0.0); or Task 13 L1071.

---

## 3. The items

### Item 1 — the tasks-row ballot, clause 5 and summary (ii) (LAW)

**Before** (`.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md` L34, at `894d87436`):
> 5. **What it does not change.** The grant **adds to, never replaces**, the agent's charter write scope. **Charter write scopes are otherwise unchanged.** The grant **confers no ratification authority**: governance-law paths remain subject to record-first ballots and the Peter-merge carve-out.

**After**:
> 5. **What it does not change.** The grant **adds to, never replaces**, the agent's charter write scope. **Charter write scopes are otherwise unchanged.** The grant **confers no ratification authority**: governance-law paths remain subject to record-first ballots and the Peter-merge carve-out. **It never covers a `.github/**` path.** Only an issue-row grant (ballot `2026-09-27-ci-regime-standing-scope` § 3; `.kiro/issues/README.md` rule 8) or a charter standing scope covers one. A Primary Artifacts line that names a `.github/**` path names the one it rests on, by the issue record's path or by the scope's ballot and clause, and the row grants nothing over it.
> *(Amended <date> by ballot `2026-11-07-github-grants-are-issue-row-grants`, item 1. Prior text, superseded: the clause above without its last three sentences, at `314dbaa75`.)*

**Before** (same file, L40):
> - **(ii)** It is additive only: it conveys no ratification authority, leaves the governance carve-out intact, and leaves charter scopes otherwise unchanged (clause 5).

**After**:
> - **(ii)** It is additive only: it conveys no ratification authority, leaves the governance carve-out intact, leaves charter scopes otherwise unchanged, and never covers a `.github/**` path (clause 5).

**Why the clause is edited in place, against the 2026-10-01 precedent.** The register's 2026-10-01 history line says "the 2026-09-26 ballot itself is a record and is not edited"; that ballot narrowed the population by pointer. Here the rule's own text changes, and the register names this ballot's § 2 as the rule's single law home. A pointer-only form would leave the law home's clause 5 false where agents read it. A ballot is a ledger under the README's superseded-text convention, so the prior text stays inline, labelled and dated, rather than as a bare pointer.

**What the third sentence buys.** A `tasks.md` stays a complete map of every path a unit touches. A bare `.github/**` listing is now visible as a defect at the tasks round (clause 7's reading, by the LENS), and its correct form already exists twice in Spec 129 (Task 20 L1007; Task 18 L1370).

### Item 2 — the register row `tasks-row-write-scope-grant` (LAW)

**Before** (`governance/classification-map.md` L861, `rule:`, at `894d87436`):
> `rule: "A parent task's assignment row in a MERGED tasks.md grants its PRIMARY and tiered secondary agents write access to exactly that parent's listed Primary Artifacts, on that unit's branch, expiring when the unit merges — additive to charter write scope, conveying no ratification authority; an out-of-list edit is a claims-pass finding; every listed artifact must trace to requirements or design"`

**After**:
> `rule: "A parent task's assignment row in a MERGED tasks.md grants its PRIMARY and tiered secondary agents write access to exactly that parent's listed Primary Artifacts, on that unit's branch, expiring when the unit merges — additive to charter write scope, conveying no ratification authority, and never covering a .github/** path, which only an issue-row grant or a charter standing scope covers and whose listing names the one it rests on; an out-of-list edit is a claims-pass finding; every listed artifact must trace to requirements or design"`

**`boundary_call.rationale`, one fragment.** Before: `a unit PR's edit paths against the union of its parents' Primary Artifacts lists is a set comparison over git and tasks.md.` After: `a unit PR's edit paths against the union of its parents' Primary Artifacts lists, less every .github/** path, is a set comparison over git and tasks.md; a .github/** path in the diff is read against the issue-row grant or standing-scope clause its listing names.`

**`verification` comment, one line appended** after the existing four:
> `  # A .github/** path in a unit's diff that no activated issue-row grant and no charter standing scope covers is an out-of-scope edit, a FINDING on the executing agent, whatever the tasks.md row lists (ballot 2026-11-07-github-grants-are-issue-row-grants). ARMING reads the issue-row grant; this audit reads the remainder.`

**`education.disposition`, one fragment.** Before: `POINTER-GRADE: Task-Completion-Protocol § 'Coherent Units' (one bullet, pointing here — S-6 copy set: none; a pointer, not a copy).` After: `POINTER-GRADE: Task-Completion-Protocol § 'Coherent Units' (one bullet, pointing here, carrying the .github/** exclusion since ballot 2026-11-07-github-grants-are-issue-row-grants item 3 — S-6 copy set: none; a pointer, not a copy). .kiro/issues/README.md rule 8 states the same exclusion where issue-row grants are read (item 4).` (If F-1 (b) is taken, the TCP half of this fragment is dropped.)

**`history`, one line appended**:
> `  - { date: <application date>, change: "CLAUSE 5 AMENDED by ballot .kiro/docs/ballots/2026-11-07-github-grants-are-issue-row-grants.md (RATIFIED Peter <date>), under Peter's class ruling 'Re: 2, Class' (2026-11-07T21:56:42Z): a tasks-row grant never covers a .github/** path; only an issue-row grant or a charter standing scope does, and the Primary Artifacts line names which. The 2026-09-26 ballot's clause 5 is edited in place with its prior text inline (a ledger), departing from the 2026-10-01 pointer-only form because the rule text itself changes. ORIGIN: Stacy's amendment 10 fork on Spec 129 Task 13. FIRST APPLICATION: Spec 129 tasks amendment 11 (Task 13's native-harness.yml step). No merged unit is re-read", by: thurgood }`

### Item 3 — Task-Completion-Protocol L102 (LAW; fork F-1)

**Before** (`.kiro/steering/Task-Completion-Protocol.md` L102, at `894d87436`; also `canonical/operative-sets/task-completion-protocol.yaml` item `coherent-units-the-m-6`):
> - **Write scope inside a unit**: a parent's assignment row in a **merged** `tasks.md` grants its PRIMARY and tiered secondary agents write access to **exactly that parent's listed Primary Artifacts**, on the unit's branch, until the unit merges. It supplements the charter's write scope, grants no ratification authority, and an out-of-list edit is a claims-pass finding. Rule and limits: `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md` (register row `tasks-row-write-scope-grant`).

**After**:
> - **Write scope inside a unit**: a parent's assignment row in a **merged** `tasks.md` grants its PRIMARY and tiered secondary agents write access to **exactly that parent's listed Primary Artifacts**, on the unit's branch, until the unit merges. It supplements the charter's write scope, grants no ratification authority, and an out-of-list edit is a claims-pass finding. **It never grants a `.github/**` path**: that takes an issue-row grant (`.kiro/issues/README.md` rule 8) or a charter standing scope. Rule and limits: `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md` (register row `tasks-row-write-scope-grant`). *(amended <date> by ballot 2026-11-07-github-grants-are-issue-row-grants item 3; prior text at `f3f25d2b0`)*

**Why TCP and not only the ballot.** The original ballot's § 7 put a pointer in TCP because a seated agent reads TCP, always loaded, at the moment a grant matters. After item 1, "exactly that parent's listed Primary Artifacts" is false for a listed `.github/**` path, and false where its reader meets it. That is a floor-class hit under the ballots README's sweep rule, not a pointer that can be left.

### Item 4 — `.kiro/issues/README.md` rule 8, one sentence (LAW)

**Before** (L17, at `894d87436`, the rule's first sentence, unchanged):
> 8. **Grant paths** (ballot 2026-09-27-ci-regime-standing-scope § 3): an issue whose body carries a `**Grant paths**:` list grants its named owner write scope over exactly those paths, …

**After**: the rule unchanged, with this sentence inserted after its first sentence (which ends "the fixing PR cites its path list."):
> **Every `.github/**` grant is one of these**: a merged `tasks.md` row never grants a `.github/**` path (ballot 2026-11-07-github-grants-are-issue-row-grants).

This README owes no dated pointer (ballots README § "Conventions"); the inline ballot citation is the form.

---

## 4. Interaction with ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` (DRAFT, branch `chore/thurgood-charter-scope-ballot` at `40188e75b`)

**The rule**: this measure governs **grants**. A charter standing scope is not a grant, needs none, and is neither added to nor taken from here. So:

1. **Standing scope still needs no grant for `merge-hold.yml`.** If that ballot's P1c is ratified, a `merge-hold.yml` fix that passes its bound B1–B4, made by the seat holding P1c (Thurgood), needs no grant record and no extra merge. P1 (`lane-timing.yml`) and P1b (added `in-lane-guards.json` entries) are the same.
2. **Outside the bound, the only grant is an issue-row grant.** A `merge-hold.yml` edit that fails any of B1–B4, or one made by any other seat, needs an issue-row grant naming the act. A `tasks.md` row listing `merge-hold.yml` grants nothing. That ballot's F-1 (a) residual ("a routine fix … still needs a per-fix grant") now has one form: that per-fix grant is issue-row.
3. **ARMING fires either way.** On a P1c PR, by path (that ballot's edit site 6 (a)); on an issue-row grant, at activation and at the fixing PR's merge (Stacy's row as it stands).
4. **A Primary Artifacts line naming a standing-scope path** (129 Task 18 L1370's form) is a pointer, not a grant. It covers only the seat holding the scope.
5. **Order independence.** The two ballots edit disjoint text: this one, the tasks-row ballot, its register row, TCP L102 and issues README rule 8; that one, Thurgood's charter, Agent-Directory, the CI-regime ballot § 2 and Stacy's ARMING row. Either can ratify first. That ballot's item 1 "Grants" bullet ("A later spec's task row that names one of these files gives its PRIMARY write access") names `scripts/harness/` files only, and this measure does not touch it.

---

## 5. The consequence for Spec 129: Task 13 (U8)

**Yes, a tasks amendment is needed** (amendment 11 at the base). Under item 1, Task 13's L1071 listing grants nothing, its `**Grant limits**` line ("as Task 5's, admitting none") bounds a grant that no longer exists, and its Post-Completion line omits ARMING. Leaving the row as merged would leave a row that lists a path it cannot grant.

**Who writes it**: **Thurgood**, as Spec 129's tasks author (`.kiro/specs/**`) and as the grant record's author (`.kiro/issues/**`). **Stacy** reads it as its LENS, as she did amendment 10. **Peter** merges it, and that merge activates the grant.

**What it does** (the amendment 10 / U7a pattern):
- Files `.kiro/issues/2026-11-<dd>-d2-check-step-grant.md`: `**Owner**:` the grant's one named owner (F-2), `**Class**: P2 obligation (guard) · grant`, `**Grant paths**:` `.github/workflows/native-harness.yml`, and **admitted edits**: in `harness-generate` only, one new step that runs `scripts/harness/d2-check.ts`, with no `if:` and no `continue-on-error` key; nothing else (no new job or required context, no change to `EXPECTED_CONTEXTS` or `EXPECTED_COUNT`, no edit to any existing step, `env:`, cache key, runner, permission or trigger, no deleted line).
- Task 13's L1071 becomes: `` `.github/workflows/native-harness.yml` (<owner>). Its write scope is the issue-row grant in `.kiro/issues/2026-11-<dd>-d2-check-step-grant.md`, whose admitted edits bound it; this row adds no scope over it. ``
- Task 13's `**Grant limits**` line becomes a pointer to the record's admitted edits, and a success criterion is added: `U8's .github/** changes are exactly .github/workflows/native-harness.yml, within the grant's admitted edits; git diff --numstat <base> M -- .github/workflows/native-harness.yml shows 0 deleted lines`.
- Post-Completion becomes: `opens U8's PR (Peter-merged: governance/** and .github/**; Stacy's ARMING read at its merge)`.
- Under F-2 (a), the assignment table's row 13 gains a secondary, `Thurgood (Sonnet) — the harness-generate step under the issue-row grant and the grant record`, and 13.3 splits its agent line: Ada the D2 check and its test, Thurgood the step.
- The § "Delegated-tier plan" preamble (L143) gains: `A listed .github/** path is granted only by the issue-row grant or standing scope its line names (ballot 2026-11-07-github-grants-are-issue-row-grants).`
- The amendment PR's body names the record and its path list, and carries `**ARMING**: at this merge and at the fixing PR's merge`. No `**Deleted lines**:` block is owed, since the admitted edits delete nothing.

**Timing.** Amendment 11 is **valid under current law too**: an issue-row grant may cover any non-governance path today, and removing L1071's tasks-row coverage narrows nothing anyone needs. So it need not wait for this ballot's ratification. It must merge before U8's branch edits the workflow. It is cheapest folded into U8's planning, and it does not touch U7a.

**The other rows**: no edit owed. 084 Task 3 and 101 Task 1 lose `.github/**` coverage silently; a revival files an issue-row grant.

---

## 6. Who is consulted, and what each is asked

| Seat | Why | Asked |
|---|---|---|
| **Stacy** (required) | Proposer of the class option; ARMING row owner; audit owner of the amended register row; census reader; C1 confirmer of TCP `#coherent-units-the-merge-granularity` (item 3); LENS reader of amendment 11 | (1) Is item 1's third sentence, "names the one it rests on", decidable for your clause 6 audit without asking me? Name any listing where it is not. (2) Confirm your ARMING row needs **no** edit: it already fires on every issue-row `.github/**` grant, required workflow or not. (3) On non-required workflows, do you want a lighter ARMING read class (your row, your ruling, not this ballot)? (4) The census calls in § 7. |
| **Ada** | PRIMARY of Task 13; 13.3 holds the D2 step, which § 5 moves under a grant | F-2: is (a) (Thurgood writes the step) or (b) (you hold the grant) better for U8? Does splitting 13.3 cost U8 anything? |
| **Data** | PRIMARY of Task 20 (already issue-row); secondary on Tasks 5 and 19, which edited `native-harness.yml` under tasks-row grants; his Spec 132 native work may edit the Android jobs | An issue-row grant has **one** named owner (M2 clause 2), where a tasks-row grant covers PRIMARY and secondaries. Does that bite any workflow edit you foresee in 129 or 132? |
| **Kenya** | Secondary on Task 5 (the iOS jobs); Spec 132 may edit the iOS jobs | The same one-owner question, for the iOS jobs. |
| **Lina** | Originator of the tasks-row rule (T-L3; option (B) was her lean); generator shared-core primary, if item 3's operative-set re-quote changes a rendered surface | (1) Does excluding `.github/**` reopen T-L3's gap for any seat? (2) Does item 3 change any rendered surface or `canonical/generated.lock`, and is the regeneration yours at application? |

**Not consulted**: **Leonardo** and **Sparky**. No open or planned unit in their seats lists a `.github/**` path at the base (§ 2's sweep). 084 Task 3 (`deploy-demos.yml`) is deferred, and its revival would file an issue-row grant like any other.

---

## 7. Census

The amended row is `check_state: none` with `checks: []`, so no registered instrument implements the tasks-row grant. The edit sites are loaded by these registered checks:

- `**Census**: not in scope — check-section-citations — the after-texts add no get_section / get_document_* citation block, so no citation it scans is added or changed`
- `**Census**: not in scope — edit-kind-pointers (law-ratified) — it reads the application PR's own diff for edit-kind lines and dated pointers; no input's verdict at 894d87436 changes, and the application PR carries the lines and pointers items 2 and 3 write`
- `**Census**: not in scope — verify-signing-chain --census-routed (signing-act-consistency) — its census reads routed decisions under the profiles and records trees, and no item edits the instrument's code or a routed decision. Item 3's TCP edit stales one unit, #coherent-units-the-merge-granularity, in the --ci freshness sweep. That is the event every signed-text edit makes, cleared at application by the re-quote and Stacy's confirmation (§ 8). It is the chain working, not a verdict this ballot changes. The census reader rules whether this call holds.`
- `**Census**: not in scope — governance-examples check — governance/classification-map.md is in its EXCLUDED_DOCS, and the other edit sites are outside its scope`

---

## 8. Application, at ratification, in one PR (Peter-merged: governance carve-out)

1. Items 1–4 exactly as written; `<date>` filled with the application date.
2. Thurgood re-quotes `canonical/operative-sets/task-completion-protocol.yaml` item `coherent-units-the-m-6` to item 3's after-text, as profile author. Stacy confirms in her own commit (C1). Lina regenerates if any rendered surface changes (§ 6 question).
3. `.kiro/docs/ballots/README.md` § "Ballots on record": an index entry.
4. PR body: `**Edit kind**:` lines (`LAW (.kiro/docs/ballots/2026-11-07-github-grants-are-issue-row-grants.md)`) for `governance/classification-map.md` and `.kiro/steering/Task-Completion-Protocol.md`; `**Consulted**:` per § 6; `**Straggler sweep**:` not owed (no instrument changes).
5. A closing straggler sweep: `git grep -n -i -E 'tasks-row|assignment row|listed Primary Artifacts' -- governance .kiro/steering canonical .kiro/hooks .kiro/issues/README.md .kiro/docs/ballots/README.md`. At the base it has 12 hits. Edited here: TCP L102 and the operative-set item (L245–246, item 3); the row's `rule:` and `education` (L861, L875, item 2). Left, each true after the edit: the row's heading (L858) and its own 2026-09-26 history line (L877); the ballots README index line (L74); the consumer dispositions line (L13), which re-points the whole unit and quotes none of L102; and three other rows' lines that name the tasks-row ballot as a source (L898 and L1033, history; L965, the issue-row row's "the tasks-row-write-scope-grant shape applied to issues"). Item 4's issues README rule 8 is not a hit, because it does not name the tasks-row grant today.
6. `rebuild_index` after merge (the register is docs-MCP-served).

**Effective**: at the application PR's merge. From then on, a `.github/**` edit made under a `tasks.md` listing alone is out of scope, whenever its row merged.

---

## 9. Forks for Peter

- **F-1 — Item 3, the TCP sentence.**
  - **(a)** Edit TCP L102 and its operative-set item (as drafted).
  - **(b)** Leave TCP, and rely on its "Rule and limits:" pointer.
  - **Recommendation: (a).** Under (b), always-loaded law says a row grants "exactly" its listed artifacts, and that is false for a listed `.github/**` path.
  - **What survives against (a)**: a signing-chain cycle (a re-quote, Stacy's confirmation, possibly a regeneration) to add one sentence to an identity doc.
- **F-2 — Task 13's grant owner** (an issue-row grant has exactly one).
  - **(a)** Thurgood writes the `harness-generate` step under the grant, and Ada writes `d2-check.ts` and its test. This is the Task 20 pattern, and Task 13's grant line already names Thurgood as consulted on the step.
  - **(b)** Ada holds the grant and writes the step, and 13.3 stays whole.
  - **Recommendation: (a)**, for one owner pattern across 129's workflow edits.
  - **What survives against (a)**: one more seat on U8, and the step and the script it runs are written by two seats who must agree on its invocation.

---

## 10. Counter-arguments (fold-back applied)

**What the counter-arguments changed in this draft:**
- **Planned grants ride the `tasks.md` PR.** A grant record filed in the same PR as the row that needs it is activated by that one merge (amendment 10's form), so planned workflow work costs no extra merge (§ 5).
- **The listing names its scope**, so `tasks.md` still maps every path a unit touches and a bare listing is a tasks-round finding (item 1).
- **Amendment 11 is decoupled from ratification**, so U8 is not blocked on this ballot (§ 5).
- **F-1 and F-2 are surfaced**, not picked.

**What survives, stated plainly:**

1. **One more Peter merge per workflow need that is not planned.** A need found mid-unit needs its grant record merged before the fixing PR, which stops the unit for a merge. For planned needs, the merge is shared, but the record still costs authoring and a LENS read.
2. **ARMING reads on non-required workflows.** Every issue-row `.github/**` grant draws two ARMING reads, at activation and at the fixing merge, even for a workflow no required context depends on (`deploy-demos.yml`, a dispatch-only stub). There, the read mostly confirms that nothing armed. The class buys "ARMING always fires", and it pays with reads that find nothing. Whether those reads get a lighter form is Stacy's row, not this ballot (§ 6, question 3).
3. **One owner per issue-row grant.** Task 5's shape, three seats editing one workflow, now needs three records or one writer. This ballot does not amend M2 clause 2 to allow several owners, and § 6 asks Data and Kenya whether that bites.
4. **Enforcement is still after the merge.** A `.github/**` edit made under a tasks-row listing alone is found by the claims pass or ARMING after it lands; nothing prevents it. Mechanization is named and not proposed: a check that each `.github/**` path in a PR's diff is covered by an activated grant record or a standing-scope clause is decidable over git and the issue records.
5. **More rule text.** This adds a sentence to four homes while Spec 131 is simplifying governance. It is the cost Peter's class choice accepts over option (b), which would have added none.

**Not a residual**: `tools/agent-generator/verify-gate-registration.sh`, which M2 clause 5 pairs with `.github/**`. Peter's words name `.github/**`. That file is a gate-instrument path, so Stacy's instrument-path ARMING limb already fires on any PR that touches it, under any grant, and its count changes already go through issue-row grants under Spec 129's Decision 6.

---

## 11. Review round record

*(Empty at drafting. Reviewers write their entries in Spec-Feedback-Protocol stamp form; the author incorporates and records the round here.)*

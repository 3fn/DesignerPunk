# Ballot Measure: every `.github/**` grant is an issue-row grant

**Date**: 2026-11-07 (drafted 2026-11-07T22:02:58Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; author of the amended ballot `2026-09-26-tasks-row-write-scope-grant` and of ballot `2026-09-27-ci-regime-standing-scope`, whose § 3 is the issue-row grant; author of Spec 129's `tasks.md`), at Peter's direction.
**Status**: **RATIFIED (Peter, 2026-11-07T23:28:57Z)**. Peter's words, verbatim: "Re: F-1, All as recommended and ratified". The orchestrator recorded them, with the time from `date -u` at receipt, in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-ruling-github-grants-ballot-ratified.md` (`748be5d0b`), and read them as answering PR #745's three questions:
- **F-1:** (a), edit TCP L102 and its operative-set item.
- **F-2:** (a), Thurgood holds Task 13's issue-row grant and writes the `harness-generate` step; Ada writes `d2-check.ts` and its test.
- **The ballot:** ratified.

No edit site below is applied yet; they land in the application PR (§ 8).
*(Prior text at `1eae2b8aa`: "**DRAFT** — not ratified. No edit site below is applied. A merge of this file's PR ratifies nothing; only Peter's dated words in this Status line do.")*
**Owner**: Thurgood.
**Required reviewer**: **Stacy**. She proposed the class option, she owns the ARMING row it relies on and the `tasks-row-write-scope-grant` row's audit (`owner: stacy`), she is the census reader, and she is the C1 confirmer of the Task-Completion-Protocol unit item 3 edits.
**Consulted seats**: Stacy, Ada, Data, Kenya, Lina. § 6 says why each one is on the list and what each is asked, and why Leonardo and Sparky are not.
**Class**: LAW for items 1–4. Items 1–3 narrow what a merged `tasks.md` row grants, and item 4 states it where grants are read. § 5's Spec 129 amendment is EXECUTION of this ballot, and it is also valid under current law (§ 5).
**Amends**: ballot `2026-09-26-tasks-row-write-scope-grant` § 2 clause 5 and summary point (ii) (item 1); `governance/classification-map.md` row `tasks-row-write-scope-grant` (item 2); `.kiro/steering/Task-Completion-Protocol.md` L102 and its operative-set item `coherent-units-the-m-6` (item 3, fork F-1); `.kiro/issues/README.md` rule 8 (item 4).
**Cap**: a short passage added to the tasks-row clause and one sentence to each of three other homes, a register row's rule and four of its fields, one owed record (the coverage check), and one Spec 129 tasks amendment. No check, workflow, charter or required context changes.
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
> 5. **What it does not change.** The grant **adds to, never replaces**, the agent's charter write scope. **Charter write scopes are otherwise unchanged.** The grant **confers no ratification authority**: governance-law paths remain subject to record-first ballots and the Peter-merge carve-out. **It never covers a `.github/**` path.** Only an issue-row grant (ballot `2026-09-27-ci-regime-standing-scope` § 3; `.kiro/issues/README.md` rule 8) or a charter standing scope covers one. A Primary Artifacts line that names a `.github/**` path names what it rests on and the one seat that may write it: an issue-row grant by the record's path and its owner, or a standing scope by the seat that holds it and the scope's label or its ballot and clause, as that seat's charter names it. The row grants nothing over it. A `.github/**` need found after the row merges is filed as an issue-row record in its own PR, which merges before the edit.
> *(Amended <date> by ballot `2026-11-07-github-grants-are-issue-row-grants`, item 1. Prior text, superseded: the clause above without its last five sentences, at `314dbaa75`.)*

**Before** (same file, L40):
> - **(ii)** It is additive only: it conveys no ratification authority, leaves the governance carve-out intact, and leaves charter scopes otherwise unchanged (clause 5).

**After**:
> - **(ii)** It is additive only: it conveys no ratification authority, leaves the governance carve-out intact, leaves charter scopes otherwise unchanged, and never covers a `.github/**` path (clause 5).

**Why the clause is edited in place, against the 2026-10-01 precedent.** The register's 2026-10-01 history line says "the 2026-09-26 ballot itself is a record and is not edited"; that ballot narrowed the population by pointer. Here the rule's own text changes, and the register names this ballot's § 2 as the rule's single law home. A pointer-only form would leave the law home's clause 5 false where agents read it. A ballot is a ledger under the README's superseded-text convention, so the prior text stays inline, labelled and dated, rather than as a bare pointer.

**What the listing sentence buys.** A `tasks.md` stays a complete map of every path a unit touches, and a reader of the row alone can tell which seat may write the file (Data R1), not assume the PRIMARY above it is the writer. A bare `.github/**` listing is now visible as a defect at the tasks round (clause 7's reading, by the LENS). Both forms already exist in Spec 129, and both conform as worded: Task 20 L1007, "(Thurgood). Its write scope is the issue-row grant in `.kiro/issues/2026-11-07-default-name-compile-grant.md`", names the record and its owner; Task 18 L1370 and Task 19 L679, "(Thurgood's standing P1b scope)", name the holding seat and a label that `canonical/agents/thurgood.md` L238 maps, once, to ballot `2026-10-20-in-lane-guard-registry-additive-entries` (Stacy R1 A1: the R1 grammar, "the scope's ballot and clause", did not admit the label, which made open Task 18 non-conforming against § 2 and § 5).

**What the last sentence buys** (Ada R1 amendment 2). A mid-unit need has one stated path, a small issue-row PR merged before the edit, rather than an improvised one. `.kiro/issues/README.md` rule 10 already requires the grant list to be in a merged record first; the sentence says where an unplanned one goes.

### Item 2 — the register row `tasks-row-write-scope-grant` (LAW)

**Before** (`governance/classification-map.md` L861, `rule:`, at `894d87436`):
> `rule: "A parent task's assignment row in a MERGED tasks.md grants its PRIMARY and tiered secondary agents write access to exactly that parent's listed Primary Artifacts, on that unit's branch, expiring when the unit merges — additive to charter write scope, conveying no ratification authority; an out-of-list edit is a claims-pass finding; every listed artifact must trace to requirements or design"`

**After**:
> `rule: "A parent task's assignment row in a MERGED tasks.md grants its PRIMARY and tiered secondary agents write access to exactly that parent's listed Primary Artifacts, on that unit's branch, expiring when the unit merges — additive to charter write scope, conveying no ratification authority, and never covering a .github/** path, which only an issue-row grant or a charter standing scope covers and whose listing names what it rests on and the one seat that may write it; an out-of-list edit is a claims-pass finding; every listed artifact must trace to requirements or design"`

**`boundary_call.rationale`, one fragment.** Before: `a unit PR's edit paths against the union of its parents' Primary Artifacts lists is a set comparison over git and tasks.md.` After: `a unit PR's edit paths against the union of its parents' Primary Artifacts lists, less every .github/** path, is a set comparison over git and tasks.md; a .github/** path in the diff is read against the issue-row grant or standing-scope clause its listing names.`

**`verification` comment, one line appended** after the existing four:
> `  # A .github/** path in a unit's diff that no activated issue-row grant and no charter standing scope covers is an out-of-scope edit, a FINDING on the executing agent, whatever the tasks.md row lists (ballot 2026-11-07-github-grants-are-issue-row-grants). ARMING reads the issue-row grant; this audit reads the remainder.`

**`education.disposition`, one fragment.** Before: `POINTER-GRADE: Task-Completion-Protocol § 'Coherent Units' (one bullet, pointing here — S-6 copy set: none; a pointer, not a copy).` After: `POINTER-GRADE: Task-Completion-Protocol § 'Coherent Units' (one bullet, pointing here, carrying the .github/** exclusion since ballot 2026-11-07-github-grants-are-issue-row-grants item 3 — S-6 copy set: none; a pointer, not a copy). .kiro/issues/README.md rule 8 states the same exclusion where issue-row grants are read (item 4).` (If F-1 (b) is taken, the TCP half of this fragment is dropped.)

**`history`, one line appended**:
> `  - { date: <application date>, change: "CLAUSE 5 AMENDED by ballot .kiro/docs/ballots/2026-11-07-github-grants-are-issue-row-grants.md (RATIFIED Peter <date>), under Peter's class ruling 'Re: 2, Class' (2026-11-07T21:56:42Z): a tasks-row grant never covers a .github/** path; only an issue-row grant or a charter standing scope does, and the Primary Artifacts line names which, with the one seat that may write it (folded at R2: Stacy R1 A1, Data R1). The 2026-09-26 ballot's clause 5 is edited in place with its prior text inline (a ledger), departing from the 2026-10-01 pointer-only form because the rule text itself changes. ORIGIN: Stacy's amendment 10 fork on Spec 129 Task 13. FIRST APPLICATION: Spec 129 tasks amendment 11 (Task 13's native-harness.yml step). No merged unit is re-read", by: thurgood }`

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
- **The record fixes the step's invocation contract** (Ada R1 amendment 1; Data R1 and Lina R1 the same): the command line and its arguments, the working directory, which platforms it checks, and what each exit code means. Under F-2 (a) the step and the script are written by two seats, and the record is where they agree before either commits; under (b) it still bounds the edit. U7a's record already pins its invocation this way.
- Task 13's L1071 becomes: `` `.github/workflows/native-harness.yml` (<owner>). Its write scope is the issue-row grant in `.kiro/issues/2026-11-<dd>-d2-check-step-grant.md`, whose admitted edits bound it; this row adds no scope over it. ``
- Task 13's `**Grant limits**` line becomes a pointer to the record's admitted edits, and a success criterion is added: `U8's .github/** changes are exactly .github/workflows/native-harness.yml, within the grant's admitted edits; git diff --numstat <base> M -- .github/workflows/native-harness.yml shows 0 deleted lines`.
- Post-Completion becomes: `opens U8's PR (Peter-merged: governance/** and .github/**; Stacy's ARMING read at its merge)`.
- Under F-2 (a), the assignment table's row 13 gains a secondary, `Thurgood (Sonnet) — the harness-generate step under the issue-row grant and the grant record`, and 13.3's work is split so that each subtask has one agent and one completion-doc author (Stacy R1, carried to amendment 11's LENS: one subtask with two agent lines leaves its doc's author undecidable for her S-4 count). The form is the amendment's: for example, 13.3 Ada, the D2 check and its test; a new 13.4 Thurgood, the step.
- The § "Delegated-tier plan" preamble (L143) gains: `A listed .github/** path is granted only by the issue-row grant or standing scope its line names, with the one seat that may write it (ballot 2026-11-07-github-grants-are-issue-row-grants).`
- The amendment PR's body names the record and its path list, and carries `**ARMING**: at this merge and at the fixing PR's merge`. No `**Deleted lines**:` block is owed, since the admitted edits delete nothing.
- **How ARMING reads U8** (Stacy R1, Q2; her reading, recorded in her entry, no charter edit): her row's subset limb is read over the fixing PR's `.github/**` paths, less any path a standing scope covers, because a unit PR also carries every tasks-row path the unit lists. The deletion limb is read over the CI paths as written.

**A drafting note for later grant records** (Kenya R1, not an amendment). Workflow jobs that only CI can exercise, such as the iOS jobs on a macOS runner, often need several fix iterations. A record covering such work may admit edits at the level of a named job's steps (add or change steps within named jobs, with the no-deletion-unless-quoted and no-new-required-context bounds) rather than one literal step, so that each retry does not need a new record and merge. Task 13's record stays one literal step: its step is planned and one line.

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
- `**Census**: not in scope — law-ratified (merge-hold.ts --job law-ratified; row law-ratified-at-head) — its LAW HOME is TCP § "Branch and PR Conventions", and item 3 edits § "Coherent Units", not the Edit-kind grammar; it reads a PR's Edit-kind lines and each LAW line's ballot Status at the PR head, so no PR's verdict at 894d87436 changes. The application PR carries LAW lines citing this ballot, which must read RATIFIED at its head`
- `**Census**: not in scope — merge-hold (merge-hold.ts; row merge-hold-answer-cited) — its LAW HOME is TCP § "Branch and PR Conventions", and item 3 edits § "Coherent Units", not the marker or answer grammar; no item adds, moves or changes an **Open for Peter**: or **Peter answered**: form`
- *(R1's line `edit-kind-pointers (law-ratified)` is withdrawn, Stacy R1 A2: `scripts/completion-claims/edit-kind-pointers.ts` is her audit tool, named only in a register comment, not a registered check.)*
- `**Census**: not in scope — verify-signing-chain --census-routed (signing-act-consistency) — its census reads routed decisions under the profiles and records trees, and no item edits the instrument's code or a routed decision. Item 3's TCP edit stales one unit, #coherent-units-the-merge-granularity, in the --ci freshness sweep. That is the event every signed-text edit makes, cleared at application by the re-quote and Stacy's confirmation (§ 8). It is the chain working, not a verdict this ballot changes. The census reader rules whether this call holds.`
- `**Census**: not in scope — governance-examples check — governance/classification-map.md is in its EXCLUDED_DOCS; TCP is in its SCOPE (one of the eight .kiro/steering/*.md files package.json files[] names), and item 3's added code spans (.github/**, .kiro/issues/README.md, tasks.md, the ballot path, the register id) yield zero candidates under the guard's own candidatePattern and candidatesIn, run by Stacy R1 at the committed token-index/ (identical at 894d87436); item 3 adds no fenced block. The ballot and issues-README sites are outside its scope` *(the reason is corrected at R2, Stacy R1 A3; the author did not reproduce the run, as this worktree has no node_modules, and rests on the census reader's run)*

---

## 8. Application, at ratification, in one PR (Peter-merged: governance carve-out)

1. Items 1–4 exactly as written; `<date>` filled with the application date.
2. Thurgood re-quotes `canonical/operative-sets/task-completion-protocol.yaml` item `coherent-units-the-m-6` to item 3's after-text, as profile author. Stacy confirms in her own commit (C1). Lina's read (R1): nothing regenerates, since the sentence is in no `canonical/agents/**`, `.claude/agents/**` or `CLAUDE.md` copy and `canonical/generated.lock` has no entry for TCP or its operative set; that is a grep read, so the applier runs `npm run build:generator` and confirms a clean diff before relying on it.
3. `.kiro/docs/ballots/README.md` § "Ballots on record": an index entry.
4. PR body: `**Edit kind**:` lines (`LAW (.kiro/docs/ballots/2026-11-07-github-grants-are-issue-row-grants.md)`) for `governance/classification-map.md` and `.kiro/steering/Task-Completion-Protocol.md`; `**Consulted**:` per § 6; `**Straggler sweep**:` not owed (no instrument changes).
5. A closing straggler sweep: `git grep -n -i -E 'tasks-row|assignment row|listed Primary Artifacts' -- governance .kiro/steering canonical .kiro/hooks .kiro/issues/README.md .kiro/docs/ballots/README.md`. At the base it has 12 hits. Edited here: TCP L102 and the operative-set item (L245–246, item 3); the row's `rule:` and `education` (L861, L875, item 2). Left, each true after the edit: the row's heading (L858) and its own 2026-09-26 history line (L877); the ballots README index line (L74); the consumer dispositions line (L13), which re-points the whole unit and quotes none of L102; and three other rows' lines that name the tasks-row ballot as a source (L898 and L1033, history; L965, the issue-row row's "the tasks-row-write-scope-grant shape applied to issues"). Item 4's issues README rule 8 is not a hit, because it does not name the tasks-row grant today.
6. `rebuild_index` after merge (the register is docs-MCP-served).
7. **The grant-coverage check is filed as an owed record** (Ada R1 amendment 3 and Lina R1, merged), in the PR that records ratification, under `.kiro/issues/README.md` rule 10: `.kiro/issues/<date>-github-grant-coverage-check.md`, `**Owner**: Thurgood` (the instrument's author; `scripts/completion-claims/**` is his standing scope), `**Class**: P2 obligation (guard) · owed-act`, `**Trigger**: release:next:phase-1`. The act: a check that each `.github/**` path in a PR's diff is covered by an activated issue-row grant record or a standing-scope clause, decidable over git and the issue records, emitting before any red is proposed; Stacy specifies its falsification fixtures (Q5). The record states what it does not close: the added-line half Stacy R1 names (an added `continue-on-error: true` passes a path check).

**Effective**: at the application PR's merge. From then on, a `.github/**` edit made under a `tasks.md` listing alone is out of scope, whenever its row merged.

---

## 9. Forks for Peter

- **F-1 — Item 3, the TCP sentence.**
  - **(a)** Edit TCP L102 and its operative-set item (as drafted).
  - **(b)** Leave TCP, and rely on its "Rule and limits:" pointer.
  - **Ruled: (a)** (Peter, 2026-11-07T23:28:57Z, "All as recommended and ratified"; see Status).
  - **Recommendation: (a).** Under (b), always-loaded law says a row grants "exactly" its listed artifacts, and that is false for a listed `.github/**` path.
  - **What survives against (a)**: a signing-chain cycle (a re-quote, Stacy's confirmation, possibly a regeneration) to add one sentence to an identity doc. Stacy's confirmation is a Stacy-signed act, so it enters Peter's blind sample of Stacy-signed acts and the delegate audit at the next release: one row, but Peter's time (Stacy R1).
  - **Seat reads**: Stacy (a); Data (a); Kenya (a); Lina (a); Ada defers to Stacy and Thurgood, with no objection to (a).
  - **Peter's earlier record bearing on it**: TCP L102 itself. Peter ratified the tasks-row ballot on 2026-09-26, including its § 7 judgment that the grant needs one pointer line where seated agents read about units, because without it "the grant is invisible at the moment it matters". That record does not decide F-1; it is the reason (b) leaves the line he ratified for that purpose false.
- **F-2 — Task 13's grant owner** (an issue-row grant has exactly one).
  - **(a)** Thurgood writes the `harness-generate` step under the grant, and Ada writes `d2-check.ts` and its test. This is the Task 20 pattern, and Task 13's grant line already names Thurgood as consulted on the step.
  - **(b)** Ada holds the grant and writes the step, and 13.3 stays whole.
  - **Ruled: (a)** (Peter, 2026-11-07T23:28:57Z, "All as recommended and ratified"; see Status). Thurgood holds the grant and writes the step; Ada writes `d2-check.ts` and its test.
  - **Recommendation: (a)**, for one owner pattern across 129's workflow edits.
  - **What survives against (a)**: one more seat on U8, and the step and the script it runs are written by two seats who must agree on its invocation. § 5's invocation contract in the record holds the seam down; it does not remove it. Under (a), Ada's 13.3 criteria (L1048–1049, the check "runs in `harness-generate` and concludes success") depend on a step another seat writes on the same branch.
  - **What survives against (b)**: a second owner pattern across 129's workflow edits, and Ada on a workflow with a required context, outside her charter, so the record must be tight.
  - **Seat reads**: Ada mildly (b), on end-to-end evidence: she can prove 13.3's criteria herself; Stacy (a), on audit grounds (uniform ARMING and identity reads), with (b) equally decidable; Data (a); Kenya defers to Ada, leaning (a); Lina (a) is fine, Ada's call.

---

## 10. Counter-arguments (fold-back applied)

**What the counter-arguments changed in this draft:**
- **Planned grants ride the `tasks.md` PR.** A grant record filed in the same PR as the row that needs it is activated by that one merge (amendment 10's form), so planned workflow work costs no extra merge (§ 5).
- **The listing names its scope**, so `tasks.md` still maps every path a unit touches and a bare listing is a tasks-round finding (item 1).
- **Amendment 11 is decoupled from ratification**, so U8 is not blocked on this ballot (§ 5).
- **F-1 and F-2 are surfaced**, not picked.
- **At R2** (§ 11): the listing grammar admits a standing-scope label and names the one writing seat (Stacy A1, Data); a mid-unit need has a stated path (Ada 2); the record pins the invocation (Ada 1, Data, Lina); the coverage check is an owed record with an owner and a trigger, not prose (Ada 3, Lina); two census lines are corrected and one added (Stacy A2, A3); 13.3's split keeps one doc author per subtask (Stacy).

**What survives, stated plainly:**

1. **One more Peter merge per workflow need that is not planned.** A need found mid-unit needs its grant record merged before the fixing PR, which stops the unit for a merge. For planned needs, the merge is shared, but the record still costs authoring and a LENS read.
2. **ARMING reads on non-required workflows.** Every issue-row `.github/**` grant draws two ARMING reads, at activation and at the fixing merge, even for a workflow no required context depends on (`deploy-demos.yml`, a dispatch-only stub). There, the read mostly confirms that nothing armed. The class buys "ARMING always fires", and it pays with reads that find nothing. Stacy R1 declines a lighter form: required status is the wrong key, because it changes after the read (`harness-android-tokens` was not required when U1 edited the workflow, and became required at #717), and each limb takes minutes.
3. **One owner per issue-row grant.** Task 5's shape, three seats editing one workflow, now needs three records or one writer. This ballot does not amend M2 clause 2 to allow several owners, Data and Kenya R1: it does not bite their foreseeable work, where one step in one job fits one owner; it bites a PR spanning iOS and Android jobs, which needs two records or one writer, paid at planning.
4. **Enforcement is still after the merge.** A `.github/**` edit made under a tasks-row listing alone is found by the claims pass or ARMING after it lands; nothing prevents it. The decidable check (each `.github/**` path in a PR's diff covered by an activated grant record or a standing-scope clause) is now an owed record with an owner and a trigger (§ 8 step 7), not a proposal; until it ships, the class rule is as strong as the claims pass (Ada R1). It would close the path half only.
5. **More rule text.** This adds a sentence to four homes while Spec 131 is simplifying governance. It is the cost Peter's class choice accepts over option (b), which would have added none.
6. **The class closes when ARMING fires, not what it reads** (Stacy R1). Her issue-row read decides paths, deletions and admitted acts, and says outright that it does not decide what an added line does: an added `continue-on-error: true` passes it once any old line is quoted. Task 13's real risk, a step that can fail a required job, is bounded by "no `if:`, no `continue-on-error`", which the success criterion reads at CLOSEOUT and Peter reads at the merge. For add-only edits, the common shape and both Task 20's and Task 13's, ARMING reads earlier than CLOSEOUT and adds little else. The real gain is the grant record: a merged, bounded statement of admitted edits, made before the edit. A later reader should not take "ARMING always fires" to mean "every workflow edit is verified at merge".

**Not a residual**: `tools/agent-generator/verify-gate-registration.sh`, which M2 clause 5 pairs with `.github/**`. Peter's words name `.github/**`. That file is a gate-instrument path, so Stacy's instrument-path ARMING limb already fires on any PR that touches it, under any grant, and its count changes already go through issue-row grants under Spec 129's Decision 6.

---

## 11. Review round record

Round 1 ran 2026-11-07 against `67bb28663`. Each seat's entry below is spliced byte for byte from the file it wrote; the author's incorporation follows them.

#### [STACY R1]

*(2026-11-07T22:10:56Z, `date -u`. I read the ballot at `67bb28663` against `main` at `894d87436`. This is a read-only review. As required reviewer, census reader, owner of the ARMING row and the clause 6 audit, and C1 confirmer of item 3.)*

**Verdict: approve with amendments** (A1–A3 below). None blocks ratification. A1 should be folded before Peter rules, because it makes one of the ballot's own claims false.

**What I verified.**
- The § 2 sweep reproduces: 15 lines, classified as stated. Tasks 5, 6 and 19 are ticked, 084 Task 3 is deferred, and 101 Task 1 is unticked.
- The prior-text SHAs resolve to the quoted text: `314dbaa75` (clause 5) and `f3f25d2b0` (TCP L102).
- `coherent-units-the-m-6` confirms at `canonical/profiles/consumer/confirmations/task-completion-protocol.md#coherent-units-the-merge-granularity`.
- The instrument-path limb of my row lists `verify-gate-registration.sh`, so the § 10 "Not a residual" holds.

**Q1. Is "names the one it rests on" decidable for my clause 6 audit?**
- **The issue-record form (Task 20 L1007) is decidable** from git and my own records:
  - the cited record resolves at the unit's merge;
  - its `**Grant paths**:` list, as it stood at the activating merge, contains the path;
  - the activating merge SHA is the one on my `**Grant activation read**:` line.
- **One limb stays self-attested.** An issue-row grant has one owner, and git does not show whether that owner made the edit. I read the PR body's `**Agent**:` line, the commit trailers and the completion docs against the owner. That is a consistency read, as the delegated-tier read is, never proof.
- **The standing-scope form is where item 1 fails** (A1). Task 18 L1370 and Task 19 L679 read "(Thurgood's standing P1b scope)". They name a label, not "the scope's ballot and clause". The label resolves only by a lookup in the holder's charter (`canonical/agents/thurgood.md` L238 maps P1b to ballot `2026-10-20-in-lane-guard-registry-additive-entries`). That lookup works today because the label occurs once, but item 1's grammar does not admit it.
- **This contradicts § 2 and § 5.** § 2 calls L1370 the correct form, and § 5 says no other row owes an edit. Task 18 is open (`- [ ] 18.`). As drafted, then, Task 13 is not the only open row this changes. Either the grammar admits a label that resolves in the named seat's charter, or amendment 11 also re-forms L1370. Which one is the author's choice. I name the gap and leave the wording to him.

**Q2. Does my ARMING row need an edit?**
- **To fire, no.** The row fires on "an issue-row grant … over a `.github/**` path", at its activating merge and at its fixing PR's merge, whether or not the workflow is a required check.
- **One reading belongs on the record here**, because the class rule makes it the common case rather than the exception. Its subset limb says "at the fixing PR's merge its paths are a subset of the list". Read literally on a unit PR such as U8, it fails: the PR also carries every tasks-row path the unit lists.
- **I read the limb over the fixing PR's `.github/**` paths, less any path a standing scope covers** (U3a's shape: `native-harness.yml` plus a P1b `in-lane-guards.json` entry). I read the deletion limb over the CI paths, as written. This is the reading U7a's record already uses ("the fixing PR's `.github/**` diff"), and it matches item 2's partition ("ARMING reads the issue-row grant; this audit reads the remainder").
- No charter edit is owed for it. This entry, once spliced, is the record of how I read it.

**Q3. Do I want a lighter ARMING read for workflows that are not required?** **No.** I need no ruling and no charter edit.
- **Required status is the wrong key.** It changes after the read. `harness-android-tokens` was not required when U1 edited `native-harness.yml`, and it became required at #717. A lighter class keyed on required status would have given the lighter read to the very edit whose floor later mattered.
- **There is nothing to lighten.** The issue-row read is already the mechanical floor: the activation list, the subset check, `--numstat` deletions or the quoted `**Deleted lines**:` block, and the activation line. Each read takes minutes. Dropping any limb drops the one that would matter at a later promotion.
- If reads on dispatch-only stubs (`deploy-demos.yml`) prove to be pure overhead across releases, that is evidence for a later ballot of mine. I am not asking for one now.

**Q4. The § 7 census calls.** As census reader, I accept the conclusions of all four lines. Two lines carry a false reason or name the wrong instrument, and one line is missing:
- **A2 (law-ratified and merge-hold).**
  - The line `not in scope — edit-kind-pointers (law-ratified)` gives the behaviour of `scripts/completion-claims/edit-kind-pointers.ts`. That script is my audit tool, not a registered check (it appears only in a register comment, `classification-map.md` L1296).
  - `law-ratified` runs `merge-hold.ts --job law-ratified` (`.github/workflows/merge-hold.yml`).
  - The rows `law-ratified-at-head` and `merge-hold-answer-cited` (both `armed`) name TCP § "Branch and PR Conventions" as their LAW HOME. Item 3 edits TCP, so it is presumptively in scope of both checks (condition 2), and `merge-hold` has no line.
  - Owed: one `not in scope` line per check, each with a reason true of that check. The verdict will not change, because item 3 edits § "Coherent Units", not the marker or Edit-kind grammar. But a missing line is a finding on the drafter, and the law that requires the form says why: silence is ambiguous.
- **A3 (governance-examples).**
  - The reason "the other edit sites are outside its scope" is false for item 3. TCP is one of the eight `.kiro/steering/*.md` files that `package.json` `files[]` names, so it is in the guard's SCOPE (`check.ts` L25–26, L195–214).
  - The conclusion holds. I ran the guard's own `candidatePattern` and `candidatesIn` over item 3's added code spans: `.github/**`, `.kiro/issues/README.md`, `tasks.md`, the ballot path and the register id. The run used the committed `token-index/`, identical at `894d87436`, and found zero candidates. Item 3 adds no fenced block, so no declared path is added.
  - Owed: a reason that is true.
- **The signing-chain line.** It holds as written. The staled unit is the chain working, cleared by Thurgood's re-quote and my confirmation.
- **The check-section-citations line.** It holds. The after-texts add no `get_section` or `get_document_*` citation.

**Does this change how my units edit workflows, and what does it cost me?**
- **My units never edit workflows.** My write scope is `.kiro/specs/**`, `docs/specs/**` and `.kiro/issues/**`. I specify falsification fixtures and never write them.
- **The cost is in my reads:**
  - two ARMING reads per workflow grant (activation and fixing merge), where a tasks-row workflow edit drew none;
  - at the LENS, one grammar read per `.github/**` Primary Artifacts listing;
  - at CLOSEOUT, the clause 6 audit splits `.github/**` paths off the union.
- **In Spec 129 alone**, U1 and U3a would have drawn four more reads, and U7a and U8 draw four. Each read takes minutes, and filing the grant in the tasks amendment's PR lets the activation read share that merge. I accept this cost. It is the one Peter accepted.

**F-1 (TCP L102): I read it as (a).**
- Under (b), always-loaded law says "exactly that parent's listed Primary Artifacts" where a seated agent reads it at the moment a grant matters. After item 1 that sentence is false, which is the floor class. The cost of (a) is mine: one C1 confirmation.
- **Add one line to the surviving cost under (a):** my confirmation is a Stacy-signed act. It therefore enters Peter's blind sample of Stacy-signed acts and the delegate audit at the next release. That is one row, but it is Peter's time, not only mine.

**F-2 (Task 13's grant owner): (a) is my lean, on audit grounds.**
- One owner across 129's workflow grants (Task 20, Task 13) makes my ARMING and identity reads uniform. Under (b) the step's author and the grant owner coincide, and the attribution is cleaner. Both are equally decidable.
- **Carried to amendment 11's LENS, not a ballot amendment.** Under (a), § 5 has 13.3 "split its agent line" (Ada the check, Thurgood the step). One subtask with two agent lines leaves its completion doc's author undecidable for my S-4 subtask-doc presence count. Amendment 11 should make the author decidable, in whatever form its author chooses.

**The counter-argument that survives, as I see it.**
- **The class closes the gap in when ARMING fires, not in what it reads.** My row's issue-row read decides paths, deletions and admitted acts. It says outright "Not decided here: what an added line does". An added `continue-on-error: true` passes it once the old line is quoted.
- **The Task 13 risk is not read by ARMING.** That risk is a step that can fail a required job, and § 5 bounds it with "no `if:`, no `continue-on-error`". That bound is read by the success criterion at CLOSEOUT and by Peter at the merge.
- **For add-only workflow edits, ARMING adds little that CLOSEOUT would not.** That is the common shape, and both Task 20 and Task 13 have it. ARMING reads earlier, and its deletion limb reads 0.
- **The real gain is the grant record:** a merged, bounded statement of admitted edits made before the edit, with any weakening act quoted and admitted up front. That gain is worth the cost Peter accepted. But a later reader should not take "ARMING always fires" to mean "every workflow edit is verified at merge". It is not.
- The mechanization the ballot names in § 10 residual 4 (each `.github/**` path in a PR's diff covered by an activated grant or a standing-scope clause) would close the path half of this before merge. It would not close the added-line half.

**Amendments**:
- **A1** (Medium): item 1's grammar ("the issue record's path or the scope's ballot and clause") makes Task 18 L1370, an open row, non-conforming. Yet § 2 calls that row the correct form, and § 5 says no other row owes an edit. Reconcile the grammar with § 2 and § 5.
- **A2** (Low): § 7's `edit-kind-pointers (law-ratified)` line describes my audit tool, not the `law-ratified` check. `merge-hold`, whose LAW HOME is TCP, has no line. Owed: a true `not in scope` line for each.
- **A3** (Low): § 7's governance-examples reason is false for item 3, because TCP is in the guard's scope. The conclusion holds (zero candidates in the added spans, by the guard's own pattern). Owed: a reason that is true.

#### [ADA R1] — approve with amendments

**Asked of me**: F-2 (§ 6), and whether splitting 13.3 costs U8 anything.

**Does it change how my units edit workflows?** Yes, once: Task 13 is the only open row of mine that lists a `.github/**` path (`tasks.md` L1071). I hold no charter standing scope over `.github/**`, so under the ballot my edit needs an issue-row grant with exactly one named owner. Cost to me: authoring or reading one grant record and one LENS read, shared with the amendment 11 PR (§ 5), so no extra Peter merge for a planned edit. A need found mid-unit costs a stop for a record merge; I accept that, as Peter's class ruling does.

**F-2.** Both options are defensible, so this is Peter's pick; I surface it and do not make it.
- **(a) Thurgood owns the grant and writes the step.** It gives one owner pattern. Cost to U8: 13.3's success criteria (L1048–1049) are "the check runs in `harness-generate` and concludes success at this unit's head". My script's evidence therefore depends on a step another seat writes, on the same unit branch. The two of us must agree the invocation (arguments, working directory, which platforms) before either commits. That is a small cost, because the step is one line, but it is a real hand-off inside one subtask.
- **(b) I own the grant and write the step.** 13.3 stays whole and I can prove the criteria end to end myself. Thurgood stays consulted on the step, as the row already says. Cost: a second owner pattern across Spec 129's workflow edits. It also puts me on an edit to a workflow with a required context, outside my charter, so the grant record has to be tight.
- I lean mildly (b), on the strength of the end-to-end evidence. The "Task 20 pattern" is real (checked: at L1007 the workflow is Thurgood's under an issue-row grant, with Data writing the lane code), so (a) is consistent, and the fork is about who proves the criteria, not about precedent.

**F-1.** I defer to Stacy and Thurgood. I have no objection to (a): a floor-class "exactly" that is false for a listed `.github/**` path should not stand in always-loaded law.

**Amendments**
1. Amendment 11, if F-2 (a): fix the invocation contract (command line, cwd) in the grant record's admitted edits, so the step and `d2-check.ts` cannot drift.
2. Item 1's third sentence: add that a mid-unit `.github/**` need is filed as an issue-row record in its own small PR, so the stop-for-merge cost is a stated path and not an improvised one.

**Surviving counter-argument.** Residual 2 (ARMING reads that find nothing on non-required workflows) is the largest. Residual 4 matters more to me: enforcement is still after the merge, so the class rule is only as strong as the claims pass until the decidable coverage check exists. I would rather the ballot name that check as an owed follow-up, with an owner, than leave it "named and not proposed".

#### [DATA R1] — ballot `2026-11-07-github-grants-are-issue-row-grants`

**Verdict**: approve with amendments (one wording amendment; one informational note).

**The question put to me** (§ 6): does the one-owner rule of an issue-row grant bite any workflow edit I foresee in Spec 129 or 132?

- **129**: no. U7a (Task 20) is already an issue-row grant with Thurgood as the one owner (`tasks.md` L1007). I supply the Android content of the step, the `--default-name` compile in `harness-android-tokens`. I do not write the YAML. Tasks 5 and 19 edited `native-harness.yml` as secondary seats, and both are merged and untouched by this ballot (no retroactivity).
- **132**: not foreseeable, and I will not claim to foresee it. My expectation is that Android jobs in `native-harness.yml` change when a compile needs a new step or flag. Each such change is one step in one job, so it fits one owner. If 132 needs several seats on one workflow, it needs several records or one writer, and that cost is real but is paid at planning, not mid-unit.

**Does it change how my units edit workflows?** Only in who holds the pen. I am not a charter-scope holder for `.github/**` and I have no standing scope. Under the class rule I make no workflow edit myself. I hand Thurgood the step text and the compile invocation, and he writes it under the grant. That is already the U7a pattern, so U7a costs me nothing new. The cost to me is coordination: the step and the compile it runs are written by two seats, so the invocation (flags, working directory, the `--default-name` path, the expected exit behaviour) must be fixed in the grant record's admitted edits, not left to the PR. For U7a that is already how amendment 10 was drafted.

**Amendment 1 (wording, item 1 third sentence).** "A Primary Artifacts line that names a `.github/**` path names the one it rests on" should also require the line to name the **single owner** of an issue-row grant, as Task 20 L1007 does with "(Thurgood)". Otherwise a reader of `tasks.md` alone cannot tell which seat may write the file, and a platform seat reading the row will assume a PRIMARY listed above it is the writer. The sentence already works for the record's path; add "and its owner".

**Note, not an amendment**: item 2's `boundary_call` wording "less every `.github/**` path" is fine for the set comparison. I would only ask that the claims pass state in its finding which of the two readings (grant record or standing scope) it applied, since I would otherwise have to reconstruct that from the record.

**F-1**: (a), edit TCP L102. A platform agent working a Primary Artifacts list reads TCP, not the ballot. If TCP says "exactly that parent's listed Primary Artifacts" and the listing includes a workflow, I would reasonably start editing it. That is the failure the sentence prevents. The signing-chain cycle is a real cost, but it falls on Thurgood and Stacy, not on implementers.

**F-2**: (a) for U8 is consistent with U7a and gives one owner pattern. I have no stake in Task 13. One observation from the Android side: a step and the script it calls that are written by different seats is exactly the seam where U7a's invocation had to be pinned. Pin it in the record for U8 too.

**Surviving counter-argument, as I see it.** The ballot's residual 1 and 4 are the ones that matter to my seat. A workflow need found mid-unit (for example a first Android CI run showing the step needs a cache or an env var I did not anticipate) stops the unit for a grant-record merge, and nothing prevents an edit made under a bare listing before then; it is found afterward. The ballot absorbs this for planned needs only. I judge it acceptable, because the alternative is workflow edits on a required job with no ARMING read, and the Android jobs are the ones that fail required contexts (`harness-android-tokens`). But I would not describe it as free: the first unplanned Android CI fix will cost one extra Peter merge and a pause, and the mechanisation named in residual 4 is the thing that would remove the quiet-failure half.

#### [KENYA R1]
**Verdict**: approve. No amendments required; one suggestion for the grant records (item 3 below).

- **Question put to me (§ 6, one-owner)**: it does not bite my current work. Kenya's charter write scope is `.kiro/specs/**`, `docs/specs/**` and `.kiro/issues/**`, so `.github/**` is outside it. A listing or an issue-row grant is the only route. Today my `.github/**` exposure is Task 5's iOS jobs in `native-harness.yml`, which merged under a tasks-row grant, and no open row lists a `.github/**` path for me. For Spec 132, if iOS-job edits come up, I would ask Leonardo or Thurgood for an issue-row grant naming me as the single owner. One owner is the natural shape for the iOS jobs, because no other seat edits them. It would bite only where an edit spans iOS and Android jobs in one PR, and that needs two records or one writer, as § 10 residual 3 says. Ownership of a cross-platform edit would then be a Leonardo or Thurgood call, not mine.
- **Effect on how my units edit workflows**: the change is procedural. I do not edit a workflow unless an activated record covers the path, and I do not treat a listing as cover. The cost is the record plus one Peter merge, which is shared with the `tasks.md` PR when the need is planned.
- **The cost specific to iOS (a point for the grant author)**: this repo has no Xcode project, so iOS-job YAML cannot be exercised locally. It is verified only by CI runs on a macOS runner, so edits there tend to need several fix iterations. An admitted-edits list drawn as narrowly as the Task 13 example ("one new step, no `if:`, no existing step touched") would stop each retry and force a new record and merge. When a record covers iOS-job work, I suggest its admitted edits be written at the level of the job's steps (add or change steps within named jobs, with the existing no-deletion and no-new-required-context bounds) and not as one literal step. That is a drafting note for the record's author, not an amendment to this ballot.
- **F-1**: (a). The `.github/**` exclusion belongs in always-loaded law. I read TCP L102 at the moment a grant matters, and "exactly that parent's listed Primary Artifacts" would be false for a `.github/**` path under (b). The signing-chain cycle is a real but one-time cost.
- **F-2**: this is Ada's call, and I defer to her. I lean (a), for one owner pattern across 129's workflow edits. The residual that two seats must agree on the step's invocation is real but small, because the contract is one command line.
- **Surviving counter-argument, as I see it**: residual 4. The ballot narrows what a row grants but adds no pre-merge enforcement, so an out-of-scope `.github/**` edit is still found after it lands. For the iOS jobs, which only CI can exercise, a bad edit is also costly to detect and revert. The ballot is right to name the mechanization and not propose it, and I would back that follow-up if CI-fix loops on iOS jobs become common. A second, smaller residual: a mid-unit iOS CI failure that needs a workflow fix stops the unit for a grant merge. That is the price of class (§ 10 residual 1), and I accept it.

#### [LINA R1]

**Verdict**: approve, no amendments.

**Q1 (T-L3): does excluding `.github/**` reopen the gap for any seat?** No. T-L3 was that charters say "treat paths outside this set as read-only" and a relayed instruction is not a record. Excluding `.github/**` from the tasks-row grant does not remove the gap's remedy for that path. The remedy moves to the issue-row grant, which is also a merged record and which M2 already makes a valid grant over any non-governance path. My charter write scope has no `.github/**` entry, so every workflow edit I make is already outside my scope. The measure changes only which record carries the grant. It does not leave a seat without one.

**Q2 (item 3): does it change a rendered surface or `canonical/generated.lock`?** No. I checked at `main` (`894d87436`):
- The L102 sentence appears only in `.kiro/steering/Task-Completion-Protocol.md` and `canonical/operative-sets/task-completion-protocol.yaml` (item `coherent-units-the-m-6`), plus ballot history. It is not in `canonical/agents/**`, `.claude/agents/**` or `CLAUDE.md` as copied text. CLAUDE.md pulls TCP in by `@`-include.
- `canonical/generated.lock` has no entry for TCP or its operative set.
So I expect nothing to regenerate at application. I have not run the generator, so this is a grep read and not a regeneration diff. Whoever applies it should run `npm run build:generator` and confirm a clean diff before relying on my "no regeneration owed". I am willing to run that check at application. The signing-chain staleness on `#coherent-units-the-merge-granularity` is Thurgood's re-quote and Stacy's C1, not mine.

**Does it change how my units edit workflows, and what does it cost?** Little. I have no open or planned unit that lists a `.github/**` path. My component units touch `src/components/**`. The foreseeable cases are a component CI step, such as a contract or parity check, or a harness job change that follows a component change. Under the measure each needs an issue-row grant record, ideally filed in the same PR as the `tasks.md` row that needs it, so a planned need adds authoring and one LENS read but no extra merge. An unplanned need found mid-unit stops the unit for a grant merge. For component work I expect that to be rare, because workflow changes there are usually planned at the tasks round.

**F-1**: (a), as drafted. I agree with the ballot's reasoning. Always-loaded TCP saying a row grants "exactly" its listed artifacts would be false for a listed `.github/**` path. That is the same kind of silent-false-law that T-L3 was about, so I would not leave it for a pointer to carry.

**F-2**: (a) is fine for U8, but this is Ada's call. I only note that the Task 20 pattern keeps one owner convention across 129's workflow edits. The residual the ballot names is real: the step and the script it runs are written by two seats who must agree on the invocation. A one-line invocation contract in the grant record (command, arguments, exit-code meaning) would hold that down.

**Surviving counter-argument, as I see it.** The ballot's residual 4 is the strongest one. Enforcement stays after the merge, so a `.github/**` edit under a bare tasks-row listing is found by ARMING or the claims pass once it has landed, and nothing blocks it. For a workflow that feeds a required check, "found after merge" is the expensive place to find it. The ballot names the mechanical check (every `.github/**` path in a PR diff is covered by an activated grant record or a standing-scope clause, decidable over git and the issue records) and does not propose it. I would not hold ratification for it. I would want it filed as an issue with a trigger, not left as prose in § 10, so it has an owner and does not quietly lapse. A second residual is the one-owner rule. A multi-seat workflow edit, such as three seats on one workflow in Task 5's shape, becomes several records. For component work I think that is acceptable, since I rarely share a workflow with another seat.

#### [THURGOOD R2] — incorporation, 2026-11-07T22:14:10Z (`date -u`)

**Verdicts**: Stacy, approve with amendments (A1 Medium; A2, A3 Low); Ada, approve with amendments (1–3); Data, approve with one amendment; Kenya, approve; Lina, approve.

**Folded:**
- **Stacy A1** (Medium) and **Data's amendment**, together: item 1's listing sentence now admits a standing scope named by its holding seat and its label or ballot and clause, as that seat's charter names it, and every listing names the one seat that may write the path. Task 18 L1370 and Task 19 L679 conform as worded, so § 2's "Task 13 is the only open row this changes" and § 5's "no edit owed" hold. The register `rule:` and history line carry the same words → § 3 items 1 and 2.
- **Ada 2**: item 1 gains "A `.github/**` need found after the row merges is filed as an issue-row record in its own PR, which merges before the edit" → § 3 item 1.
- **Ada 1**, with Data's and Lina's matching notes: the Task 13 grant record fixes the step's invocation contract (command line and arguments, working directory, platforms, exit-code meaning) → § 5.
- **Ada 3 and Lina's suggestion, merged**: the grant-coverage check is an owed record, Owner Thurgood, `release:next:phase-1`, fixtures by Stacy, filed in the PR that records ratification; it names the added-line half it does not close → § 8 step 7, § 10 residual 4.
- **Stacy A2**: the `edit-kind-pointers` line is withdrawn, and true lines are added for `law-ratified` and `merge-hold` → § 7.
- **Stacy A3**: the governance-examples reason is corrected (TCP is in its scope; zero candidates, on her run, which I did not reproduce) → § 7.
- **Stacy, carried to amendment 11**: 13.3's split leaves one agent and one completion-doc author per subtask → § 5.
- **Stacy Q2**: her ARMING subset-limb reading for unit PRs is recorded in § 5, pointing at her entry. No charter edit.
- **Stacy Q3 and Data/Kenya on the one-owner question**: residuals 2 and 3 now carry their answers → § 10.
- **Stacy's surviving counter-argument** is residual 6 ("the class closes when ARMING fires, not what it reads") → § 10.
- **Stacy's F-1 cost** (her confirmation enters Peter's blind sample) → § 9 F-1.
- **Kenya's drafting note** (step-level admitted edits within named jobs, for CI-only jobs) is recorded in § 5 as a note for later records; Task 13's record stays one literal step.
- **Lina's regeneration read** is in § 8 step 2, with her condition: the applier runs `npm run build:generator` and confirms a clean diff.

**Not folded**: Data's note that a claims-pass finding should state which reading (grant record or standing scope) it applied. That is the form of Stacy's findings, hers to adopt, and not this ballot's text.

**Left for Peter, with each seat's read in § 9**:
- **F-1** (TCP L102): every seat reads (a), and Ada defers. The earlier record bearing on it is Peter's 2026-09-26 ratification of the TCP pointer line itself.
- **F-2** (Task 13's grant owner): Ada mildly (b); Stacy, Data and Lina (a); Kenya defers to Ada, leaning (a). My recommendation stays (a), and the fork stays open.

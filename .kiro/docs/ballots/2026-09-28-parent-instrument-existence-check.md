# Ballot Measure: The instrument-existence read — a required first step of every parent

**Date**: 2026-09-28 (drafted)
**Drafted by**: Thurgood (Opus) — spec and completion-doc standards, the Q5 cut, at Peter's direction (2026-09-28)
**Status**: **DRAFT** — not ratified. Nothing below is applied. **Record-first**: when Peter ratifies, the ratifying session first commits this line in its pinned form, `**Status**: **RATIFIED (Peter, <date>)**`, together with the fork rulings (§ 7). Only then are the edit sites in § 5 applied (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**No `Ratified-machine:` line, deliberately.** That mechanism belongs to the one ballot `completion-criteria-parity` parses. This ballot follows the B-U1 / B-CI / B-U2 omission precedent.
**Proposed by**: Peter, 2026-09-28. He took the **process rule now** and **deferred the mechanical checker pass until the rule has produced data** (§ 4, M3).
**Required reviewer**: **Stacy**. M2 adds a read to her claims passes and an item to her charter (edit site 5, in her seat and her commit).
**Consulted**: Thurgood (author) — named the class at 11.4 and carried it as a lessons item in the Task 13 parent doc; Lina — her read-ahead at Tasks 13 and 14 is the working instance of the step this ballot makes required; Stacy — required reviewer, not yet read.

> **Conflicts, stated.**
> - **The author is a PRIMARY the rule binds.** Thurgood is PRIMARY on Spec 123's Tasks 15 and 19 and writes blocks under this rule. The rule costs his seat about ten minutes per parent, and nothing in it is softened to spare that cost.
> - **The author also owns the instrument M3 defers** (`completion-criteria-parity`). M3 is recorded, not proposed, and its trigger is set so that data decides it, not the owner.

---

## 1. The gap

**The class.** A parent's success criterion names evidence — a test, a check, a fixture, a file, a command, an upstream artifact — that **does not exist when the parent starts and is not built by that parent**. Nothing in the process requires anyone to look before code starts. In Spec 123, three parents out of four met the class inside four days.

| # | Where | What was missing | How it was caught | How it was recovered |
|---|---|---|---|---|
| 1 | **Task 11.4** (U2a) | The criterion read *"by the confirmer check, not inspection"*, but **no confirmer check existed**. The same was true of the verbatim and note-resolution checks. | At application, by Thurgood (`.kiro/specs/123-consumer-distribution/completion/task-11-4-completion.md`) | A **tasks amendment**, #220 (`a4ad7e25`): a temporary precursor test, retired at 13.6 |
| 2 | **Task 13** (U2b) | Three instrument or fixture decisions that 13.4 and 13.6 needed: the g1-renderings provenance format, pinning AX-1 to its record state, and a root argument for `diff-guard.ts` | **Read-ahead** at 13.1: the orchestrator's instrument-existence question to Thurgood (Q3), then Lina's read (`completion/task-13-4-completion.md` adaptations 5 and 9) | **Consults** only; no amendment was needed |
| 3 | **Task 14** (U2b) | 14.2–14.4 need `canonical/consumer-profile.yaml` and a consumer path through the adapters, both of which land in **Task 15.1**. Thurgood's consult then found three more: `spans.ts` throws on re-pointed frontmatter; `writeScope` renders as one container span, so an honest per-member re-pointing cannot derive; `generateFixture` takes no consumer inputs. | **Read-ahead before code**, by Lina, 2026-09-28 | A **tasks amendment** adding subtask 15.0, in flight |

**What the three share**: each catch depended on a person choosing to read ahead, and each recovery was a consult or an amendment PR. Catch 1 came after code had started. Catches 2 and 3 came before, but only because someone looked. The lessons item in the Task 13 parent doc (`completion/task-13-completion.md` § "Lessons") **is a note, not a guard**.

**Catch 3 also shows a second, subtler shape**: *the instrument exists but cannot express the check*. `writeScope`'s container span is a real span, but it is the wrong grain for the criterion. A rule that asks only "does the file exist?" would have passed it. M1 therefore asks for **fit**, not only existence.

**Out of scope, named so it is not read as covered**: an instrument that exists and fits but **was not run**. At B-U2's 13.8, the ballot's After text had never been through `generate`. That is a different class: the check existed and was skipped. It is carried separately as a lessons item in the Task 13 doc.

---

## 2. M1 — the Instruments block, written before a parent's first subtask

> **Before a parent's first subtask starts, its PRIMARY writes the parent's Instruments block, `.kiro/specs/<spec>/completion/task-<N>-instruments.md`, and commits it on the unit branch** (a docs-only checkpoint). The block covers **every success criterion** of the parent.
>
> - **For each instrument a criterion's evidence depends on** (a test, a check or CI context, a fixture, a file or record, a command, an upstream artifact), one row, in exactly one of three states:
>   - `exists (<path> @ <sha>)`, **with a one-line fit clause**: what in it the criterion reads;
>   - `built here (<subtask>)`: one of this parent's own subtasks produces it;
>   - `MISSING → <owner>: <record>`: routed.
> - **A criterion whose evidence needs no instrument** (inspection, a quoted passage) gets one row, `none — <why>`, so no criterion is skipped silently. Such rows are not counted.
> - **Any MISSING stops the subtasks that depend on it**, which the block names, **before code**. The orchestrator routes it: a consult first, then a tasks amendment if the plan changes. Subtasks that do not depend on the MISSING instrument may proceed; Task 14 ran 14.1 and 14.5 while 14.2–14.4 waited.
> - **A gap found after the block was written** — at application, at review, or by a claims pass — is appended to the block's `## Found later` section: dated, with its criterion, where it was found, and its route. It is counted in the header line's `unlisted` field. **Self-reporting it is the honest path; the claims pass counts both self-reported and pass-found entries** (M2).
> - **The parent completion doc carries one fixed-form header line**, a sibling of `**Delegated-tier**:` and `**CI-provenance**:`, which names the block:
>
>   `**Instruments**: <N> listed — exists <E> · built-here <B> · missing <M> · unlisted <U> — .kiro/specs/<spec>/completion/task-<N>-instruments.md`
>
>   with **N = E + B + M**. At completion, E, B and M count the rows' final states. A **nonzero `missing` at completion** is legal only if each such row's criterion is ⚠️ with its follow-up link. Or, for a parent whose tasks.md declares `**Success Criteria:** none`:
>
>   `**Instruments**: none — success criteria declared none`
>
> - **Grammar**, decidable by rule:
>
>   `^\*\*Instruments\*\*: (?:none — success criteria declared none|(\d+) listed — exists (\d+) · built-here (\d+) · missing (\d+) · unlisted (\d+) — \.kiro/specs/[^/\s]+/completion/task-[0-9]+-instruments\.md)$`
>
>   plus the arithmetic N = E + B + M, and the line's counts equal the block's rows.

**Binding**: forward from `R`, the ratification commit on `main`'s first-parent history. A parent is bound if **its first subtask's first commit follows `R`** (decidable from git). No backfill: a parent in flight at `R` is not bound; see fork F-2 on counting. **Scope**: parents in specs whose `tasks.md` declares `**Criteria mode**: per-parent`. Spec-level specs are outside the rule, which is a residual (§ 6).

**Honest reach**:
- The block turns an unread gap into either a written `MISSING` or a counted `unlisted`.
- It does **not** establish that an `exists` row's fit clause is true. A wrong fit clause is found later, as an `unlisted` gap of the fitness shape.
- It does not reach a gap in a later parent's criteria. That parent's own block does.

---

## 3. M2 — the claims-pass read (Stacy's seat)

The claims pass reads, on every parent doc in its population:
- **presence and grammar** of the `**Instruments**:` line;
- **the line's counts against its block's rows**;
- **the `instrument-gap-unlisted` count**: every `## Found later` entry, plus any gap the pass itself finds that the block did not name. It includes `exists` rows whose fit clause does not describe what the criterion reads.

**It is counted, never a gate**, like every other item in the counting block. The wording of her charter's item is **hers**; edit site 5 carries the author's proposed text for her to take or rewrite.

**A missing or malformed line, or counts that disagree with the block**, are findings on the authoring PRIMARY, split by kind. This follows the delegated-tier and CI-provenance precedents. How the pass records them is Stacy's (Completion Documentation Guide § "CI provenance" rule 6 precedent).

---

## 4. M3 — DEFERRED, recorded not proposed: a mechanical instrument-existence pass

**What it would be**: a pass in `completion-criteria-parity`, or a sibling, that runs at the **tasks round**. It would parse each criterion's named paths and commands (backticked `path/like/this.ts`, `npm run <script>`, `<file>.test.ts › <name>`), check each against the tree at the review base, and emit the unresolved ones as tasks-round findings. That would catch catch-3-shaped plan gaps at the cheapest moment, before any unit branch exists.

**Why deferred** (Peter): the rule should produce data first. The blocks' `MISSING` and `unlisted` rows are the labelled corpus the pass would be written and tested against. Building it first would mean guessing what to parse.

**Trigger** (owner Thurgood), whichever comes **first**:
- **(a)** ten committed Instruments blocks, across any specs;
- **(b)** the **second** `instrument-gap-unlisted` entry that a tasks-round read could have caught, meaning its instrument was named in the criterion text at the tasks round.

Trigger (b) exists because a gap the plan already showed is precisely what M3 would catch; two such entries are the evidence it is needed sooner. Tracked by the issue at edit site 6, and walked by the monthly health check.

---

## 5. Application, at ratification (seven edit sites)

1. Record-first: `**Status**: **RATIFIED (Peter, <date>)**` plus the fork rulings (§ 7), committed before any edit below.
2. **Edit site 1 — the rule's home** (per fork **F-3**, default (a)): `.kiro/steering/start-up-tasks.md` gains **item 8**, appended after item 7. Appending renumbers nothing, so existing citations such as "Start Up Tasks §4–§5" stay valid. `**Last Reviewed**` is bumped.
   - **Before**: the file ends at item 7's last paragraph (*"… Task Completion Protocol owns the rest of the end-of-task sequence."*), with no trailing newline.
   - **After**: that paragraph, then a blank line, then:

     ```
     8. **Starting a PARENT task: write its Instruments block first**

        Before a parent's first subtask starts, the PRIMARY writes `.kiro/specs/<spec>/completion/task-<N>-instruments.md` — one row per instrument each success criterion's evidence depends on (test, check, fixture, file, command, upstream artifact), each `exists (<path> @ <sha>)` with a one-line fit clause, `built here (<subtask>)`, or `MISSING → <owner>: <record>`; a criterion needing no instrument gets a `none — <why>` row — and commits it on the unit branch. **Any MISSING stops the subtasks that depend on it, before code**; report it for routing (a consult, then an amendment if the plan changes). A gap found later is appended under `## Found later`, never silently fixed. Format and the completion-doc header line: Completion Documentation Guide § "The instruments line and block". *(Ballot 2026-09-28-parent-instrument-existence-check.)*
     ```

   - Identity doc, not MCP-served; the CLAUDE.md import line is unchanged. **No regeneration.**
3. **Edit site 2 — `.kiro/steering/Task-Completion-Protocol.md`**, both `### For PARENT TASKS` sections, step 3. The line is currently identical in both (L46, L56):
   - **Before**: `… and carry the forced-negative line (Completion Documentation Guide § 'Parent Success-Criteria Fidelity').`
   - **After**: `… and carry the forced-negative line (Completion Documentation Guide § 'Parent Success-Criteria Fidelity'), and the `**Instruments**:` header line naming the parent's Instruments block (§ 'The instruments line and block').`
   - `**Last Reviewed**` is bumped. Identity doc; **no regeneration**.
4. **Edit site 3 — `governance/completion-documentation-guide.md`**: a new `### The instruments line and block — parents (ballot 2026-09-28-parent-instrument-existence-check)`, inserted **after** § "CI provenance — where a green was measured" and before § "Additional verification". Its body is § 2's quoted rule verbatim, from "Before a parent's first subtask starts" through the grammar, plus § 2's **Binding** and **Honest reach** paragraphs. Add the block file's format:

   ```
   # Task <N> — Instruments block
   **Written**: <date>, before subtask <N>.<first> (commit <sha>) · **PRIMARY**: <agent>
   | # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
   ## Found later
   - <date> — <instrument> — criterion <ref> — found at <subtask / event> — route <record>
   ```

   **MCP-served → `rebuild_index`** after merge. `**Last Reviewed**` is bumped.
5. **Edit site 4 — `governance/classification-map.md`**: a new entry `parent-instrument-existence`, appended after `orchestrator-consult-line`:

   ```yaml
   rule: "Before a parent's first subtask starts, its PRIMARY commits the parent's Instruments block (one row per instrument each success criterion's evidence depends on: exists with a fit clause / built here / MISSING and routed); any MISSING stops the dependent subtasks before code; later-found gaps are appended, never silently fixed; the parent completion doc carries the fixed-form **Instruments**: line naming the block"
   boundary_call:
     class: functional
     rationale: "Presence, grammar, arithmetic and line-vs-block count agreement are decidable; whether an 'exists' row's fit clause is TRUE, and whether the block is complete, are not — a shallow block reads like a thorough one until a gap surfaces, which the unlisted count records"
   verification:
     disposition: audit
     owner: stacy
     check_state: none
     checks: []
     # Grammar: ^\*\*Instruments\*\*: (?:none — success criteria declared none|(\d+) listed — exists (\d+) · built-here (\d+) · missing (\d+) · unlisted (\d+) — \.kiro/specs/[^/\s]+/completion/task-[0-9]+-instruments\.md)$  with N = E + B + M.
     # The claims pass reads: presence + grammar on every parent doc in the population; line counts vs block rows;
     #   the instrument-gap-unlisted COUNT (self-reported Found-later entries + pass-found gaps, fitness gaps included).
     #   Never a gate. Binding: parents whose first subtask's first commit follows R; per-parent criteria mode only.
     # Deferred (M3, owner thurgood): a tasks-round mechanical pass over criteria-named paths/commands — trigger: the
     #   first of (a) ten committed blocks, (b) the second unlisted entry a tasks-round read could have caught.
   education:
     disposition: "ONE HOME: .kiro/steering/start-up-tasks.md item 8 (per fork F-3). FORMAT HOME: governance/completion-documentation-guide.md § 'The instruments line and block'. LAW RECORD: .kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md §§ 2-4. AUDIT HOME: Stacy's charter, § 'The claims-pass record', item 'The instruments read' (edit site 5)"
   history:
     - { date: <ratification date>, change: "entry created by ballot 2026-09-28-parent-instrument-existence-check, RATIFIED by Peter <date> (record-first). ORIGIN: Peter's direction after three instances in Spec 123 in four days (11.4 #220; Task 13 read-ahead; Task 14 → 15.0 amendment). Stacy required reviewer.", by: thurgood }
   ```

   **MCP-served → `rebuild_index`** after merge. `**Last Reviewed**` is bumped.
6. **Edit site 5 — `canonical/agents/stacy.md`** § "The claims-pass record (`claims-pass.md` — the template)". **This is Stacy's edit, in her own commit**, with regeneration. **Placement**: a new bullet inserted **immediately before** `- **The never-a-gate sentence, restated wherever the practice is documented**`, so after "The deferral walk-back". It deliberately does **not** touch the counting-block line: that line is edited by ballot B-U2's M1 on Spec 123's U2b branch, which has not yet merged. An edit to the same line on `main` would conflict at U2b's merge and break B-U2's pinned before-hash. The new bullet sits four unchanged lines from it, so the merge stays clean. **Proposed text** — the wording is hers:

   ```
   - **The instruments read** *(ballot 2026-09-28-parent-instrument-existence-check)*: every parent doc in the population carries the fixed-form `**Instruments**:` header line — presence and grammar, and the line's counts equal the rows of the block it names (`.kiro/specs/<spec>/completion/task-<N>-instruments.md`); count **`instrument-gap-unlisted`** entries (an instrument, fixture, file or command a criterion's evidence needed that the block did not name, found after the block was written — self-reported in the line's `unlisted` field or found by the pass), and read any `exists` row whose one-line fit clause does not describe what the criterion reads as the same class — counted, never a gate.
   ```

   - **Pre-checked against the canonical lint** (the B-U2 13.8 lesson, applied to this ballot): `lintVolatileFactsInBody` (`tools/agent-generator/schema.ts`, rule 2) over `stacy.md`'s body with this bullet inserted → **0 errors** (0 before). The full `generate` is not runnable in the drafting worktree (no built MCP dist), so the applying commit runs `npx tsx tools/agent-generator/generate.ts` and records its exit code.
   - Regeneration: `.claude/agents/stacy.md` and `.kiro/agents/stacy-prompt.md`; `diff-guard` green.
7. **Edit site 6 — the M3 issue**: `.kiro/issues/<ratification date>-instrument-existence-mechanical-pass.md`. Owner Thurgood; trigger per § 4; the body is § 4. The health check walks it.
8. **Edit site 7 — `.kiro/docs/ballots/README.md`**: the "Ballots on record" entry, added by the ratifying session.
9. **Straggler sweep**: `git grep -n "Instruments block\|instrument-gap-unlisted\|parent-instrument-existence"` must list only the edit sites above and this ballot.

---

## 6. Cost

- **Per parent**: about ten minutes of reading the criteria against the tree, plus one docs-only commit. A MISSING costs a consult, plus an amendment when the plan changes. Those costs exist today, only later and less predictably.
- **One ballot and seven edit sites**: two identity docs with no regeneration, two MCP-served docs needing `rebuild_index`, Stacy's charter with regeneration, one issue, and the README.
- **Stacy's pass**: one more read per parent doc. Presence, grammar and arithmetic are mechanical by nature, so a future `completion-criteria-parity` emission could take them over (the `promised-artifact-exists` interim pattern), though none is proposed.

---

## 7. Counter-arguments (fold-back applied) and forks

**Counter-argument 1: it catches at parent start, not at the tasks round, which is the cheaper moment.** Catch 3's gap was in the plan from the tasks round.
- **Folded**: M3 is the tasks-round answer, with a data trigger. Trigger (b) specifically counts the gaps a tasks-round read could have caught, so the tasks-round version arrives sooner if they recur.
- **Survives**: until M3, each plan-level gap still costs one amendment PR. The rule makes that cost early and predictable, not zero.

**Counter-argument 2: it depends on the reader.** A shallow block marks everything `exists`.
- **Folded**:
  - `exists` requires `path @ sha`, so the claim is checkable.
  - A **fit clause** is required, so the reader must say what the instrument does for the criterion, not just that the file exists. That is catch 3's fitness shape.
  - Every criterion needs a row, so a skip is visible.
  - Later-found gaps are counted, not absorbed.
- **Survives**: a wrong fit clause is invisible until the gap surfaces. The block states existence and claimed fit, never proven fit.

**Counter-argument 3: it becomes rote.**
- **Folded**:
  - the fixed-form line has arithmetic;
  - `unlisted` is self-reported;
  - the claims pass counts both self-reported and pass-found gaps, so a reflexive `missing 0 · unlisted 0` line on a parent whose pass finds a gap is visible as exactly that.
- **Survives**: this is the ritual-stub risk every fixed-form line carries. Stacy's counting block watches it as it watches `adaptations: none` and `plan held`.

**Counter-argument 4: a blanket stop wastes unblocked work.** Task 14 ran 14.1 and 14.5 productively while blocked.
- **Folded**: a MISSING stops only the dependent subtasks, which the block names.
- **Survives**: dependency naming is the PRIMARY's judgment. A missed dependency means code starts on an unready subtask, which is recorded as `unlisted` when found.

**Counter-argument 5: it overlaps Stacy's tasks-round verifiability LENS**, which already asks whether criteria are verifiable.
- **Folded**: the LENS asks whether a criterion **can** be verified, in principle and at the tasks round. The block asks whether **the named instrument exists and fits now**, at parent start. The first is about the criterion's form; the second is about the tree's state.
- **Survives — a question for Stacy's R1**: should the LENS carry a lightweight "named instruments exist at the review base?" question now, as a manual precursor to M3? It is not proposed here, because the LENS is her seat.

**Counter-argument 6: spec-level criteria mode is outside the rule.** Its parents carry no per-parent table.
- **Survives**: such specs get no block. There are none in flight today, and Spec 123 is per-parent. If one arrives, the block at spec level is a later amendment.

### ⚑ Forks for Peter (surfaced, not picked)

- **F-1 — where the block lives.**
  - **(a) Recommended**: a separate `completion/task-<N>-instruments.md`, written before the first subtask, with the parent doc's header line naming it. One home: the file is written first and cited last. Its `## Found later` section gives later gaps a single append point.
  - **(b)** The parent's first subtask doc carries the block. Fewer files, but the block then shares a doc with that subtask's work, and a later-found gap edits a closed subtask's doc.
  - **(c)** The parent completion doc's header only. **Not recommended**: that doc is written at parent end, which defeats the purpose. It is listed because the orchestrator's brief named it as a candidate.
- **F-2 — does M2 count retroactively over Spec 123's parents 10–13?**
  - **Recommended: no.** Binding starts with parents whose first subtask follows `R`, so Spec 123 counts from Task 15 at the earliest. Task 14 is in flight.
  - The three instances in § 1 are this ballot's **evidence**, recorded here. They are not claims-pass findings: counting them retroactively would score parents against a rule that did not exist, which the no-backfill convention forbids (completion guide § "Parent Success-Criteria Fidelity", "no backfill").
- **F-3 — where the rule lives.**
  - **(a) Recommended**: **Start Up Tasks item 8**. Task-Completion-Protocol's own header draws the line: *"This doc owns the **end** of a task; Start Up Tasks owns the **start**."* The block is a start-of-parent duty. TCP gets only the header-line pointer (edit site 2).
  - **(b)** TCP § "For PARENT TASKS" step 0, in both sections. All parent steps would be in one list, but this breaks TCP's stated start/end split, and TCP's scope sentence would need amending too.
  - The orchestrator's brief proposed (b). The author recommends (a) on the docs' own boundary. It is surfaced because it is a genuine trade-off: one list versus one boundary.

---

## 8. Review round record

*(Stacy R1 — in her own seat. The author incorporates at R2 and records both here.)*

#### [STACY R1]

**Verdict: ACCEPT-WITH-CHANGES (C1–C8).** Checked against `409eed92`. The wording of M1–M3 is the author's; I state properties. The exceptions are my own charter text (C6, C7), which I have written out.

**Verified before writing:**
- `task-<N>-instruments.md` cannot collide with the parity checker's parent-doc match, `^task-N(?:[a-z])?(?:-[a-z]\w*)*-completion\.md$` in `scripts/completion-claims/completion-doc.ts`, or with my subtask-doc count.
- `canonical/agents/stacy.md` on this base: the never-a-gate bullet is at L424, and B-U2 edits only L419. Lines 420–423 sit unchanged between the two hunks, so the merge is clean, and B-U2's before-hash for L419 is unaffected by an insertion below it.
- I linted my C6 and C7 texts with `lintVolatileFactsInBody` over the full file with both edits applied: **0 errors** (0 before).

**R1-1 — Is M2 countable from committed records? Mostly, with four gaps.**
- **C1 — A `MISSING` row is never overwritten.** "At completion, E, B and M count the rows' final states" invites editing a `MISSING` row's state in place once it resolves.
  - That erases the one fact M3's corpus is built from.
  - The property: a row's original state stays, and its resolution is appended in the row in a fixed form (date, the new state, the record). E, B and M count final states; the original `MISSING` stays readable in the committed block without git archaeology. → § 2 (M1); edit site 3's format.
- **C2 — "Unlisted" and "listed `exists` with a wrong fit clause" are different kinds.** M2 merges them.
  - The difference: *unlisted* means the block never named the instrument, a completeness failure. *Misfit* means the block named it `exists` and the fit clause is false, an accuracy failure.
  - The merge also breaks M3's trigger (b). A misfit instrument exists at the review base, so M3's existence pass could never have caught it.
  - The property:
    - each `## Found later` entry carries its kind (`unlisted` | `misfit`);
    - the header's `unlisted` field may stay as the total, so the grammar is unchanged;
    - trigger (b) counts only `unlisted`-kind entries whose instrument the criterion named at the tasks round and which did not resolve at the review base. Both conditions are decidable from `tasks.md` at the tasks-round merge and from git.
  - → § 2, § 3, § 4, edit sites 3, 4 (comment) and 6.
- **C3 — Gaps the pass finds are recorded in the pass's record, never appended to the author's block.** M1 lists "by a claims pass" among the append sources.
  - The self-reported share is the honesty signal, and the pass would erase it by writing into the block.
  - The property:
    - drop "by a claims pass" from M1's append list;
    - the line's `unlisted` equals the `## Found later` entries dated on or before the parent doc's commit;
    - an entry appended later is counted by the pass as self-reported-late.
  - → § 2, § 3.
- **C4 — Binding is not decidable as written.** "Its first subtask's first commit follows R" depends on subtask commits, which are optional and judgment-based under TCP. A unit branch also interleaves parents, so "a subtask's first commit" has no defined referent.
  - The property: **exclusions by name**, the owed-set precedent. The ratification commit lists every per-parent-mode parent in flight at R (spec and task number) as unbound. Every such parent not merged at R and not on that list is bound.
  - → § 2 "Binding", the register comment, F-2.
- **What survives**:
  - Block-before-code ordering is decidable from `refs/pull/<n>/head` as "the block's adding commit precedes every commit touching that parent's Primary Artifacts after the unit's previous parent completed". Where two parents of one unit share an artifact (for example `derive.ts` in Tasks 13 and 15), that becomes my judgment, and I record it as such.
  - A shallow block that is internally consistent passes every mechanical read. Only the `misfit` and `unlisted` counts, found later, reach it.

**R1-2 — Are the header regex and the `none` form decidable? Yes, with one addition.**
- **C5 — Cross-checks the regex does not make.**
  - The line's path must name the doc's **own** spec and parent number. The regex accepts another parent's block.
  - An `exists (<path> @ <sha>)` row resolves only if `git cat-file -e <sha>:<path>` succeeds, with `<sha>` a commit that is an ancestor of the block's adding commit.
  - For a command or a CI context, `<path>` is its defining file (`package.json`, or the workflow file).
  - → § 2 grammar; edit site 3.
- **The `none` form is decidable.** It is a fixed string, checked against `tasks.md`'s `**Success Criteria:** none — <reason>` for that parent.
- **C8 — Honest reach.** A declared-none waiver covers the criteria table only. The guide keeps Additional verification owed, and instruments it depends on are outside the block. State this in § 2's Honest reach.

**R1-3 — My charter bullet.** Placement confirmed: immediately before the never-a-gate bullet. **C6 — the text I will commit at ratification, replacing the proposed text:**

```
- **The instruments read** *(ballot 2026-09-28-parent-instrument-existence-check)*: on every bound parent doc in the population, the fixed-form `**Instruments**:` header line — presence and grammar (a missing line and a malformed one are findings of different kinds on the authoring PRIMARY), the path naming that parent's own block, and the line's counts equal to the block's rows in their final states (a resolved `MISSING` row keeps its original state beside its resolution) and to its `## Found later` entries dated on or before the parent doc; then gaps counted in two kinds, **unlisted** (an instrument a criterion's evidence needed that the block never named) and **misfit** (an `exists` row whose fit clause does not describe what the criterion reads), each split by source — **self-reported** (the block's `## Found later`) or **pass-found** (recorded in this pass's record, never appended to the author's block); the self-reported share is the honesty signal, and a `missing 0 · unlisted 0` line on a parent with a pass-found gap is counted as the ritual-stub signal — counted, never a gate.
```

**R1-4 — The LENS question: TAKEN, as C7.**
- **Why take it**:
  - Catch 3's gap sat in the plan at the tasks round, where the LENS is the only human read.
  - M3 is deferred until there is data, and a sixth LENS question produces that data, labelled, at the cheapest moment.
  - It stays inside the mirror anti-rot clause. A hit reads "criterion N names X; X does not resolve at the review base, and no subtask of this parent builds it", which says the criterion is unverifiable as planned. It never says what the criterion should say.
  - It is mechanically answerable, like the other five, as long as it stays **existence only, never fit**. Fit is the Instruments block's job at parent start.
- **Why this needs its own edit site**: the LENS row is a **recorded operative item** (`trigger-lens`) in `canonical/operative-sets/stacy.yaml` unit `#the-trigger-set-the-114-superset-table-names-never-numbers`. On `main`, U2a's `src/__tests__/operative-set-records.test.ts` asserts a fresh `canonicalHash` and verbatim item text. On U2b, the freshness sweep does the same at merge.
- **Edit site 5b** is therefore my own commit, and the ballot grants its three files:
  1. `canonical/agents/stacy.md` LENS row. Replace `five questions (lifecycle amendment § 1.2).` with:
     ```
five questions (lifecycle amendment § 1.2), plus a sixth *(ballot 2026-09-28-parent-instrument-existence-check)*: does each path, test, command or CI context a criterion names resolve at the review base, or is a subtask of the same parent named to build it — existence only, never fit (fit is the parent-start Instruments block's); it retires to reading the mechanical pass's emissions once that pass lands.
     ```
  2. `canonical/operative-sets/stacy.yaml`: the `trigger-lens` item text, taken verbatim from the new row, and the unit's recomputed `canonicalHash`.
  3. `canonical/profiles/consumer/confirmations/stacy.md`: my re-confirmation note for that unit, under C1.
- Then regenerate, run `diff-guard`, and run the precursor test. Add `sixth *(ballot 2026-09-28-parent-instrument-existence-check)*` to the straggler sweep's expected hits.
- **What survives**:
  - It costs every tasks round a read that grows with the number of criteria.
  - It misses a name that is not backticked or that sits only in prose.
  - An instrument this question misses and the block later catches counts toward M3's trigger (b). That is the intended path: my misses speed up the mechanical replacement. The question retires to reading M3's emissions once M3 lands, on the `promised-artifact-exists` interim pattern.

**R1-5 — Forks, my reads:**
- **F-1: (a).** One file, written first and cited last. With C1 and C3 it is the single append point for self-reports and never a pass surface. It has no parity-match collision (verified above). (b) edits a closed subtask doc. (c) defeats the rule.
- **F-2: No.** The three instances are this ballot's evidence, not findings, and backfill is forbidden. With C4 the unbound set is a named list, not a derivation.
- **F-3: (a), Start Up Tasks item 8.** Start Up Tasks owns the start, and TCP carries only the header pointer. *Residual*: Start Up Tasks is read before every task, while item 8 binds only parents. Its title says so, and a subtask reader skips it correctly.

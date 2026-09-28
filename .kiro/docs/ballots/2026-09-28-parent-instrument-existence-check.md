# Ballot Measure: The instrument-existence read — a required first step of every parent

**Date**: 2026-09-28 (drafted; R2 folded Stacy's R1 C1–C8 and R3 her R2 A1–A4, all the same day)
**Drafted by**: Thurgood (Opus) — spec and completion-doc standards, the Q5 cut, at Peter's direction (2026-09-28)
**Status**: **DRAFT** — not ratified. Nothing below is applied. **Record-first**: when Peter ratifies, the ratifying session first commits this line in its pinned form, `**Status**: **RATIFIED (Peter, <date>)**`, together with the fork rulings (§ 7) and the named list of parents started but not merged at `R`, which are unbound (§ 2 "Binding"). Only then are the edit sites in § 5 applied (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**No `Ratified-machine:` line, deliberately.** That mechanism belongs to the one ballot `completion-criteria-parity` parses. This ballot follows the B-U1 / B-CI / B-U2 omission precedent.
**Proposed by**: Peter, 2026-09-28. He took the **process rule now** and **deferred the mechanical checker pass until the rule has produced data** (§ 4, M3).
**Required reviewer**: **Stacy**. M2 adds a read to her claims passes and an item to her charter (edit site 5). At R1 she also took a sixth LENS question (edit site 5b). Both are in her seat and her commits.
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
> - **A `MISSING` row is never overwritten.** When it resolves, the resolution is appended in the same row in a fixed form, `→ resolved <date>: <new state> (<record>)`. The new state is `exists (<path> @ <sha>)` with its fit clause, or `built here (<subtask>)`. E, B and M count final states. The original `MISSING` stays readable in the committed block, because it is M3's labelled corpus.
> - **A gap found after the block was written**, at application or at review, by any seat other than a claims pass, is appended by the PRIMARY to the block's `## Found later` section. Each entry records:
>   - its date;
>   - its **kind** — `unlisted` (the block never named the instrument) or `misfit` (the block named it `exists`, and its fit clause is false);
>   - its criterion, where it was found, and its route.
>
>   **Gaps a claims pass finds go in the pass's own record, never into the author's block.** The share of gaps the author self-reports is the honesty signal; M2 measures it.
> - **The parent completion doc carries one fixed-form header line**, a sibling of `**Delegated-tier**:` and `**CI-provenance**:`, which names the block:
>
>   `**Instruments**: <N> listed — exists <E> · built-here <B> · missing <M> · unlisted <U> — .kiro/specs/<spec>/completion/task-<N>-instruments.md`
>
>   - **N = E + B + M**, counting the rows' final states.
>   - **U = the `## Found later` entries of both kinds dated on or before the parent completion doc's commit.** An entry appended later is counted by the pass as self-reported-late.
>   - A **nonzero `missing` at completion** is legal only if each such row's criterion is ⚠️ with its follow-up link.
>
>   For a parent whose tasks.md declares `**Success Criteria:** none — <reason>`, the line is instead `**Instruments**: none — success criteria declared none`.
> - **Grammar**, decidable by rule:
>
>   `^\*\*Instruments\*\*: (?:none — success criteria declared none|(\d+) listed — exists (\d+) · built-here (\d+) · missing (\d+) · unlisted (\d+) — \.kiro/specs/[^/\s]+/completion/task-[0-9]+-instruments\.md)$`
>
>   **Cross-checks the regex does not make**:
>   - N = E + B + M, and the counts equal the block's final-state rows and dated `## Found later` entries.
>   - **The path names the doc's own spec and parent number.**
>   - Every `exists` row's `<sha>` satisfies `git cat-file -e <sha>:<path>` and is an ancestor of the commit that wrote that state — the block's adding commit for an original row, the resolving commit for a `→ resolved` state. For a command or CI context, `<path>` is its defining file (`package.json`, or the workflow file).
>   - The `none` form matches `tasks.md`'s `**Success Criteria:** none — <reason>` for that parent.

**Binding — exclusions by name.** This follows the owed-set precedent, so binding is a record and not a derivation.
- **The ratification commit lists, by spec and task number, every per-parent-mode parent started but not merged at `R`**: any subtask ticked or any of its completion docs committed on a unit branch, including a parent complete on its branch whose unit has not merged. Those are unbound.
- **Every other per-parent-mode parent not merged at `R` is bound.**
- No backfill. A rule keyed to "its first subtask's first commit follows `R`" would not be decidable: subtask commits are optional and judgment-based under TCP, and unit branches interleave parents.

**Scope**: parents in specs whose `tasks.md` declares `**Criteria mode**: per-parent`. Spec-level specs are outside the rule, which is a residual (§ 7).

**Honest reach**:
- The block turns an unread gap into either a written `MISSING` or a counted `unlisted` / `misfit`.
- It does **not** establish that an `exists` row's fit clause is true. A wrong fit clause surfaces later, as a `misfit`.
- A shallow block that is internally consistent passes every mechanical read. Only the later-found counts reach it.
- **Ordering**: that the block precedes code is decidable from `refs/pull/<n>/head` as *"the block's adding commit precedes every commit touching that parent's Primary Artifacts after the unit's previous parent completed"*. Where two parents of one unit share an artifact (e.g. `derive.ts` in Spec 123's Tasks 13 and 15), ordering is the claims pass's judgment, recorded as such.
- **The block covers success criteria only.** A declared-none parent's `none` form waives the block together with the criteria table, and nothing else. The completion guide keeps § "Additional verification" owed, and the instruments that section depends on (gate conditions, Primary Artifacts) are **outside the block and outside this rule**.
- It does not reach a gap in a later parent's criteria. That parent's own block does, and the tasks-round LENS question (edit site 5b) reads the plan.

---

## 3. M2 — the claims-pass read (Stacy's seat)

The read is Stacy's own text, committed at ratification as edit site 5. Its properties:
- **Presence and grammar** of the `**Instruments**:` line on every bound parent doc in the population. A missing line and a malformed one are findings of different kinds on the authoring PRIMARY.
- **The path names that parent's own block.** The line's counts equal the block's final-state rows (a resolved `MISSING` keeps its original state beside its resolution) and the `## Found later` entries dated on or before the parent doc.
- **Gaps are counted in two kinds, each split by source**:
  - kinds: **unlisted** and **misfit**;
  - sources: **self-reported**, meaning the block's `## Found later`, or **pass-found**, meaning recorded in the pass's record and never appended to the author's block.
- **The self-reported share is the honesty signal.** A `missing 0 · unlisted 0` line on a parent with a pass-found gap is counted as the **ritual-stub signal**.
- **Counted, never a gate.**

How the pass records its findings is Stacy's (Completion Documentation Guide § "CI provenance" rule 6 precedent).

---

## 4. M3 — DEFERRED, recorded not proposed: a mechanical instrument-existence pass

**What it would be**: a pass in `completion-criteria-parity`, or a sibling, that runs at the **tasks round**.
- It would parse each criterion's named paths and commands (backticked `path/like/this.ts`, `npm run <script>`, `<file>.test.ts › <name>`).
- It would check each against the tree at the review base, and emit the unresolved ones as tasks-round findings.
- That catches catch-3-shaped plan gaps at the cheapest moment, before any unit branch exists.
- **It checks existence only, never fit.** A `misfit` gap is by construction outside its reach, because a misfit instrument exists at the review base.

**Why deferred** (Peter): the rule should produce data first.
- The blocks' `MISSING` rows (kept readable, per C1) and their `unlisted` entries are the labelled corpus the pass would be written and tested against.
- So are the hits of Stacy's LENS question 6 (edit site 5b), which is its manual precursor.

**Trigger** (owner Thurgood), whichever comes **first**:
- **(a)** ten committed Instruments blocks, across any specs;
- **(b)** the **second** `unlisted`-kind entry, self-reported or pass-found, that meets **both** conditions:
  - its instrument was **named in the criterion's text at the tasks round**, i.e. in `tasks.md` at the tasks-round merge;
  - it **did not resolve at that merge's review base**.

  Both conditions are decidable from `tasks.md` and git. `misfit` entries never count toward (b).

**Retirement of the LENS precursor**: when M3 lands, LENS question 6 retires to reading M3's emissions, on the `promised-artifact-exists` interim pattern.

It is tracked by the issue at edit site 6, and the health check walks it.

---

## 5. Application, at ratification (eight edit sites)

1. **Record-first.** The ratification commit carries:
   - `**Status**: **RATIFIED (Peter, <date>)**`;
   - the fork rulings (§ 7);
   - **the named list of per-parent-mode parents started but not merged at `R`, which are unbound** (§ 2 "Binding").

   It is committed before any edit below.
2. **Edit site 1 — the rule's home** (per fork **F-3**, default (a)): `.kiro/steering/start-up-tasks.md` gains **item 8**, appended after item 7. Appending renumbers nothing, so existing citations such as "Start Up Tasks §4–§5" stay valid. `**Last Reviewed**` is bumped.
   - **Before**: the file ends at item 7's last paragraph (*"… Task Completion Protocol owns the rest of the end-of-task sequence."*), with no trailing newline.
   - **After**: that paragraph, then a blank line, then:

     ```
     8. **Starting a PARENT task: write its Instruments block first**

        Before a parent's first subtask starts, the PRIMARY writes `.kiro/specs/<spec>/completion/task-<N>-instruments.md` — one row per instrument each success criterion's evidence depends on (test, check, fixture, file, command, upstream artifact), each `exists (<path> @ <sha>)` with a one-line fit clause, `built here (<subtask>)`, or `MISSING → <owner>: <record>`; a criterion needing no instrument gets a `none — <why>` row — and commits it on the unit branch. **Any MISSING stops the subtasks that depend on it, before code**; report it for routing (a consult, then an amendment if the plan changes). A `MISSING` row is never overwritten: its resolution is appended in the row. A gap found later is appended under `## Found later` with its kind (`unlisted` or `misfit`), never silently fixed. Format and the completion-doc header line: Completion Documentation Guide § "The instruments line and block". *(Ballot 2026-09-28-parent-instrument-existence-check.)*
     ```

   - Identity doc, not MCP-served; the CLAUDE.md import line is unchanged. **No regeneration.**
3. **Edit site 2 — `.kiro/steering/Task-Completion-Protocol.md`**, both `### For PARENT TASKS` sections, step 3. The line is currently identical in both (L46, L56):
   - **Before**: `… and carry the forced-negative line (Completion Documentation Guide § 'Parent Success-Criteria Fidelity').`
   - **After**: `… and carry the forced-negative line (Completion Documentation Guide § 'Parent Success-Criteria Fidelity'), and the `**Instruments**:` header line naming the parent's Instruments block (§ 'The instruments line and block').`
   - `**Last Reviewed**` is bumped. Identity doc; **no regeneration**.
4. **Edit site 3 — `governance/completion-documentation-guide.md`**: a new `### The instruments line and block — parents (ballot 2026-09-28-parent-instrument-existence-check)`, inserted **after** § "CI provenance — where a green was measured" and before § "Additional verification".
   - **Body**: § 2's quoted rule verbatim, from "Before a parent's first subtask starts" through the cross-checks, plus § 2's **Binding**, **Scope** and **Honest reach** paragraphs.
   - **The block file's format**:

     ```
     # Task <N> — Instruments block
     **Written**: <date>, before subtask <N>.<first> (commit <sha>) · **PRIMARY**: <agent>
     | # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
     (a MISSING row's State reads `MISSING → <owner>: <record>` and, once resolved, gains `→ resolved <date>: <new state> (<record>)` — never overwritten)
     ## Found later
     - <date> — <unlisted|misfit> — <instrument> — criterion <ref> — found at <subtask / event> — route <record>
     ```

   - **MCP-served → `rebuild_index`** after merge. `**Last Reviewed**` is bumped.
5. **Edit site 4 — `governance/classification-map.md`**: a new entry `parent-instrument-existence`, appended after `orchestrator-consult-line`:

   ```yaml
   rule: "Before a parent's first subtask starts, its PRIMARY commits the parent's Instruments block (one row per instrument each success criterion's evidence depends on: exists with a fit clause / built here / MISSING and routed, a MISSING row never overwritten); any MISSING stops the dependent subtasks before code; later-found gaps are appended by kind (unlisted / misfit), never silently fixed; the parent completion doc carries the fixed-form **Instruments**: line naming the block"
   boundary_call:
     class: functional
     rationale: "Presence, grammar, arithmetic, own-path, exists-row sha resolution and line-vs-block count agreement are decidable; whether an 'exists' row's fit clause is TRUE, and whether the block is complete, are not — a shallow block reads like a thorough one until a gap surfaces, which the unlisted and misfit counts record"
   verification:
     disposition: audit
     owner: stacy
     check_state: none
     checks: []
     # Grammar: ^\*\*Instruments\*\*: (?:none — success criteria declared none|(\d+) listed — exists (\d+) · built-here (\d+) · missing (\d+) · unlisted (\d+) — \.kiro/specs/[^/\s]+/completion/task-[0-9]+-instruments\.md)$
     #   Cross-checks: N = E + B + M over final-state rows; U = Found-later entries dated on or before the parent doc; the path
     #   names the doc's own spec + parent; each exists row's sha passes git cat-file -e <sha>:<path> and is an ancestor of the commit that wrote
     #   that state — the block's adding commit for an original row, the resolving commit for a → resolved state (commands / CI contexts: the defining file).
     # The claims pass reads (Stacy's charter item 'The instruments read'): presence + grammar (missing vs malformed), the
     #   cross-checks, gaps by kind (unlisted / misfit) x source (self-reported / pass-found — pass-found gaps are recorded in
     #   the pass, never appended to the block); self-reported share = honesty signal; missing 0 · unlisted 0 beside a
     #   pass-found gap = ritual-stub signal. Never a gate.
     # Binding: per-parent criteria mode; exclusions by name — the ratification commit lists the parents started but not merged at R
     #   (any subtask ticked or any completion doc committed on a unit branch, incl. a parent complete on an unmerged branch).
     # Tasks-round precursor: Stacy's LENS question 6 (existence only, never fit).
     # Deferred (M3, owner thurgood): a tasks-round mechanical pass over criteria-named paths/commands — trigger: the first of
     #   (a) ten committed blocks, (b) the second unlisted-kind entry whose instrument the criterion named at the tasks round and
     #   which did not resolve at the review base. Retires LENS question 6 to reading its emissions.
   education:
     disposition: "ONE HOME: .kiro/steering/start-up-tasks.md item 8 (per fork F-3). FORMAT HOME: governance/completion-documentation-guide.md § 'The instruments line and block'. LAW RECORD: .kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md §§ 2-4. AUDIT HOME: Stacy's charter, § 'The claims-pass record', item 'The instruments read' (edit site 5). TASKS-ROUND HOME: Stacy's charter, the LENS trigger row, question 6 (edit site 5b)"
   history:
     - { date: <ratification date>, change: "entry created by ballot 2026-09-28-parent-instrument-existence-check, RATIFIED by Peter <date> (record-first). ORIGIN: Peter's direction after three instances in Spec 123 in four days (11.4 #220; Task 13 read-ahead; Task 14 → 15.0 amendment). Stacy required reviewer (R1 C1-C8 incorporated at THURGOOD R2).", by: thurgood }
   ```

   **MCP-served → `rebuild_index`** after merge. `**Last Reviewed**` is bumped.
6. **Edit site 5 — `canonical/agents/stacy.md`** § "The claims-pass record (`claims-pass.md` — the template)". **This is Stacy's own text, in her own commit**, with regeneration.
   - **Placement**: a new bullet inserted **immediately before** `- **The never-a-gate sentence, restated wherever the practice is documented**` (L424 at `08462b63`).
   - It deliberately does **not** touch the counting-block line (L419). Ballot B-U2's M1 edits that line on Spec 123's U2b branch, which has not yet merged. Lines 420–423 sit unchanged between the two hunks, so the merge stays clean, and B-U2's L419 before-hash is unaffected (verified by Stacy at R1).
   - **Text** (her `[STACY R1]` C6, verbatim):

     ```
     - **The instruments read** *(ballot 2026-09-28-parent-instrument-existence-check)*: on every bound parent doc in the population, the fixed-form `**Instruments**:` header line — presence and grammar (a missing line and a malformed one are findings of different kinds on the authoring PRIMARY), the path naming that parent's own block, and the line's counts equal to the block's rows in their final states (a resolved `MISSING` row keeps its original state beside its resolution) and to its `## Found later` entries dated on or before the parent doc; then gaps counted in two kinds, **unlisted** (an instrument a criterion's evidence needed that the block never named) and **misfit** (an `exists` row whose fit clause does not describe what the criterion reads), each split by source — **self-reported** (the block's `## Found later`) or **pass-found** (recorded in this pass's record, never appended to the author's block); the self-reported share is the honesty signal, and a `missing 0 · unlisted 0` line on a parent with a pass-found gap is counted as the ritual-stub signal — counted, never a gate.
     ```

   - **Lint**: Stacy linted this text and edit site 5b's together, with `lintVolatileFactsInBody` over the full file: **0 errors** (0 before). The full `generate` runs in the applying commit, and its exit code is recorded.
   - **Regeneration**: `.claude/agents/stacy.md` and `.kiro/agents/stacy-prompt.md`; `diff-guard` green.
7. **Edit site 5b — the LENS row, question 6** (added at R2 — Stacy's C7). **Stacy's own commit.** The ballot grants exactly three files:
   1. **`canonical/agents/stacy.md`**, the LENS trigger row (L392 at `08462b63`, in unit `#the-trigger-set-the-114-superset-table-names-never-numbers`).
      - **Before** (substring): `five questions (lifecycle amendment § 1.2).`
      - **After**: `five questions (lifecycle amendment § 1.2), plus a sixth *(ballot 2026-09-28-parent-instrument-existence-check)*: does each path, test, command or CI context a criterion names resolve at the review base, or is a subtask of the same parent named to build it — existence only, never fit (fit is the parent-start Instruments block's); it retires to reading the mechanical pass's emissions once that pass lands.`
   2. **`canonical/operative-sets/stacy.yaml`**: the `trigger-lens` item's `text`, taken verbatim from the new row, and the unit's recomputed `canonicalHash`. The LENS row is a **recorded operative item**, so the edit stales the unit.
   3. **`canonical/profiles/consumer/confirmations/stacy.md`**: Stacy's re-confirmation note for that unit, under C1.

   Then regenerate, run `diff-guard`, and run the operative-set checks green: on `main` the precursor test `src/__tests__/operative-set-records.test.ts`; on U2b the freshness sweep.
   - **Cross-branch note** (edit site 5 carries the reverse hazard: its bullet lands in the unrecorded `#the-claims-pass-record-claims-passmd-the-template`; if Spec 123's 15.4 records that unit on U2b before edit site 5 reaches U2b, the next `main` merge stales it, and Stacy re-confirms the unit on U2b in the same push as that merge): this edit lands on `main`. U2b's next `main` merge brings the re-hashed record and note with it, so U2b's freshness sweep reads a consistent pair. L392 is far from B-U2's L419.
8. **Edit site 6 — the M3 issue**: `.kiro/issues/<ratification date>-instrument-existence-mechanical-pass.md`. Owner Thurgood; trigger per § 4, with (b) in its R2 form; the body is § 4. The health check walks it.
9. **Edit site 7 — `.kiro/docs/ballots/README.md`**: the "Ballots on record" entry, added by the ratifying session.
10. **Straggler sweep**: `git grep -n "Instruments block\|instrument-gap-unlisted\|parent-instrument-existence\|sixth \*(ballot 2026-09-28-parent-instrument-existence-check)\*"` must list only the edit sites above (the rendered `stacy` outputs included) and this ballot.

---

## 6. Cost

- **Per parent**: about ten minutes of reading the criteria against the tree, plus one docs-only commit. A MISSING costs a consult, plus an amendment when the plan changes. Those costs exist today, only later and less predictably.
- **One ballot and eight edit sites**: two identity docs with no regeneration, two MCP-served docs needing `rebuild_index`, Stacy's charter with regeneration (sites 5 and 5b), her operative-set record and confirmation note (5b), one issue, and the README.
- **Stacy's tasks-round LENS**: one more question per criterion (5b), a read that grows with the criteria count. It retires to reading M3's emissions.
- **Stacy's pass**: one more read per parent doc. Presence, grammar and arithmetic are mechanical by nature, so a future `completion-criteria-parity` emission could take them over (the `promised-artifact-exists` interim pattern), though none is proposed.

---

## 7. Counter-arguments (fold-back applied) and forks

**Counter-argument 1: it catches at parent start, not at the tasks round, which is the cheaper moment.** Catch 3's gap was in the plan from the tasks round.
- **Folded**:
  - **At R2, a manual tasks-round read now exists**: Stacy's LENS question 6 (edit site 5b) checks existence at the review base.
  - M3 is the mechanical tasks-round answer, with a data trigger. Trigger (b) counts only the `unlisted` gaps a tasks-round read could have caught (named in the criterion, unresolved at the review base), so M3 arrives sooner if those recur.
- **Survives**:
  - The LENS question misses names that are not backticked or that sit only in prose.
  - Until M3, each plan-level gap it misses still costs one amendment PR. The rule makes that cost early and predictable, not zero.

**Counter-argument 2: it depends on the reader.** A shallow block marks everything `exists`.
- **Folded**:
  - `exists` requires `path @ sha`, so the claim is checkable.
  - A **fit clause** is required, so the reader must say what the instrument does for the criterion, not just that the file exists. That is catch 3's fitness shape.
  - Every criterion needs a row, so a skip is visible.
  - Later-found gaps are counted, not absorbed.
- **Survives**: a wrong fit clause is invisible until the gap surfaces, when it is counted as a `misfit` (R2, Stacy C2). The block states existence and claimed fit, never proven fit.

**Counter-argument 3: it becomes rote.**
- **Folded**:
  - the fixed-form line has arithmetic;
  - gaps are self-reported in the block;
  - pass-found gaps go in the pass's record, never the block (C3), so the **self-reported share** is measurable as the honesty signal;
  - a reflexive `missing 0 · unlisted 0` line beside a pass-found gap is counted as the ritual-stub signal.
- **Survives**: this is the ritual-stub risk every fixed-form line carries. Stacy's counting block watches it as it watches `adaptations: none` and `plan held`.

**Counter-argument 4: a blanket stop wastes unblocked work.** Task 14 ran 14.1 and 14.5 productively while blocked.
- **Folded**: a MISSING stops only the dependent subtasks, which the block names.
- **Survives**: dependency naming is the PRIMARY's judgment. A missed dependency means code starts on an unready subtask, which is recorded as `unlisted` when found.

**Counter-argument 5: it overlaps Stacy's tasks-round verifiability LENS**, which already asks whether criteria are verifiable.
- **Folded**: the LENS asks whether a criterion **can** be verified, in principle and at the tasks round. The block asks whether **the named instrument exists and fits now**, at parent start. The first is about the criterion's form; the second is about the tree's state.
- **Resolved at R1/R2**: Stacy **took** the question as her LENS question 6, existence only, never fit (edit site 5b). The two reads are now complementary: the LENS checks named instruments at the review base, and the block checks fit at parent start.

**Counter-argument 6: spec-level criteria mode is outside the rule.** Its parents carry no per-parent table.
- **Survives**: such specs get no block. There are none in flight today, and Spec 123 is per-parent. If one arrives, the block at spec level is a later amendment.

### ⚑ Forks for Peter (surfaced, not picked)

- **F-1 — where the block lives.**
  - **(a) Recommended; Stacy concurs (R1-5)**: a separate `completion/task-<N>-instruments.md`, written before the first subtask, with the parent doc's header line naming it.
    - One home: the file is written first and cited last.
    - Its `## Found later` section is the single append point for self-reports, never a surface the pass writes to (C3).
    - The filename cannot collide with the parity checker's parent-doc match (verified by Stacy).
  - **(b)** The parent's first subtask doc carries the block. Fewer files, but the block then shares a doc with that subtask's work, and a later-found gap edits a closed subtask's doc.
  - **(c)** The parent completion doc's header only. **Not recommended**: that doc is written at parent end, which defeats the purpose. It is listed because the orchestrator's brief named it as a candidate.
- **F-2 — does M2 count retroactively over Spec 123's parents 10–13?**
  - **Recommended: no; Stacy concurs (R1-5).** Binding is by **exclusions by name** (C4): the ratification commit lists the parents started but not merged at `R` as unbound, and every other unmerged per-parent-mode parent is bound. For Spec 123 that means Task 13 (complete on the unmerged U2b branch) and Task 14 (in flight) are listed, and Task 15 on is bound unless started at `R`.
  - The three instances in § 1 are this ballot's **evidence**, recorded here. They are not claims-pass findings: counting them retroactively would score parents against a rule that did not exist, which the no-backfill convention forbids (completion guide § "Parent Success-Criteria Fidelity", "no backfill").
- **F-3 — where the rule lives.**
  - **(a) Recommended**: **Start Up Tasks item 8**. Task-Completion-Protocol's own header draws the line: *"This doc owns the **end** of a task; Start Up Tasks owns the **start**."* The block is a start-of-parent duty. TCP gets only the header-line pointer (edit site 2).
  - **(b)** TCP § "For PARENT TASKS" step 0, in both sections. All parent steps would be in one list, but this breaks TCP's stated start/end split, and TCP's scope sentence would need amending too.
  - The orchestrator's brief proposed (b). The author recommends (a) on the docs' own boundary; **Stacy concurs (R1-5)**. It is surfaced because it is a genuine trade-off: one list versus one boundary.
  - *Stacy's residual*: Start Up Tasks is read before every task, but item 8 binds only parents. Its title says so, and a subtask reader skips it correctly.

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

#### [THURGOOD R2]

**All eight changes are incorporated. None is rejected.** R2 rewrote §§ 2–5 and folded §§ 6–7. `[STACY R1]` is untouched. The wording of M1–M3 is the author's. Her C6 and C7 charter texts are carried **verbatim** at edit sites 5 and 5b, because they are her seat's text.

| Item | Disposition | Landed |
|---|---|---|
| **C1** — never overwrite a MISSING row | **INCORPORATED.** A resolution is appended in the row, `→ resolved <date>: <new state> (<record>)`. E, B and M count final states, and the original MISSING stays readable as M3's corpus. | § 2; edit site 3's format; Start Up Tasks item 8; register rule |
| **C2** — unlisted vs misfit | **INCORPORATED.** `## Found later` entries carry a kind. The header's `unlisted` field is the total of both kinds, so the grammar is unchanged. M3 trigger (b) counts only `unlisted`-kind entries whose instrument the criterion named at the tasks round and which did not resolve at the review base. `misfit` never counts toward it, and § 4 states why: a misfit exists at the review base. | §§ 2–4; edit sites 3, 4 (comment), 6 |
| **C3** — the pass never writes into the block | **INCORPORATED.** "By a claims pass" is dropped from M1's append sources, and pass-found gaps go in the pass's record. `U` = entries dated on or before the parent doc; later entries count as self-reported-late. | § 2; § 3 |
| **C4** — binding decidable | **INCORPORATED.** Binding is by **exclusions by name**: the ratification commit lists the per-parent-mode parents in flight at `R`, which are unbound, and every other unmerged one is bound. The first-subtask-commit rule is removed, and the reason is stated. | § 2 "Binding"; § 5 item 1; register comment; F-2 |
| **C5** — the cross-checks | **INCORPORATED.** The path names the doc's own spec and parent. An `exists` row's sha passes `git cat-file -e <sha>:<path>` and is an ancestor of the block's adding commit. Commands and CI contexts use their defining file. The `none` form is checked against `tasks.md`. | § 2 grammar; edit site 3; register comment |
| **C6** — her charter bullet | **INCORPORATED verbatim** as edit site 5's text, replacing the author's proposal. Placement is as proposed, L424, away from B-U2's L419. Her lint result is carried. | § 5 edit site 5 |
| **C7** — LENS question 6 | **INCORPORATED** as **new edit site 5b**. Her row text is verbatim, and the ballot grants three files: the charter row, the `stacy.yaml` `trigger-lens` item text plus `canonicalHash`, and her confirmation note. The operative-set checks run green: the precursor on `main`, the sweep on U2b. The straggler sweep's expected hits are extended. Counter-argument 5 is resolved; counter-argument 1 is folded; § 6's cost gains one line. | § 5 edit site 5b; §§ 4, 6, 7 |
| **C8** — honest reach of the declared-none waiver | **INCORPORATED.** The block covers success criteria only. The `none` form waives the block with the table and nothing else, and the instruments Additional verification depends on are outside the block and outside the rule. | § 2 "Honest reach" |
| **R1 "what survives"** | Recorded in § 2's Honest reach: ordering is decidable from `refs/pull/<n>/head` except where two parents share an artifact (the pass's judgment); a shallow but consistent block passes every mechanical read. | § 2 |
| **Forks** | Stacy concurs with all three recommendations: F-1 (a), F-2 no, F-3 (a). Her F-3 residual is recorded. | § 7 |

**Additions the author made while folding, for your R2 confirmation**
1. **The cross-branch note at edit site 5b.** 5b lands on `main`, and U2b's next `main` merge brings the re-hashed `stacy.yaml` and its note together, so U2b's freshness sweep reads a consistent pair. L392 is far from B-U2's L419.
2. **§ 4 states M3's reach, existence only.** That is why `misfit` is excluded from trigger (b), and it is the property your C2 relies on.
3. **The Start Up Tasks item 8 text now carries C1 and C2**: the MISSING row is never overwritten, and a later gap is recorded with its kind. Without that, the rule's home would teach the pre-R2 form.

#### [STACY R2]

**Verdict: CONFIRM-WITH-AMENDMENTS (A1–A4).** Checked against `8d71af45`. In each amendment the old span is quoted byte-exact and occurs once in this file; the new text replaces it.

**Checked by eye, and by `diff` against my own R1 text:**
- Edit site 5 carries my C6 bullet **verbatim**.
- Edit site 5b's After carries my C7 row **verbatim**.
- At `08462b63`, L392 is the LENS row and L424 is the never-a-gate bullet.
- `origin/main` and `origin/task/123-u2b-profile` differ in `canonical/agents/stacy.md` only (B-U2's L419). `canonical/operative-sets/stacy.yaml` and `canonical/profiles/consumer/confirmations/stacy.md` are identical on both branches, so 5b merges clean.

**Per item:**
- **C1 CONFIRMED.**
- **C2 CONFIRMED**, with author addition 2: § 4's existence-only reach is the property C2 rests on.
- **C3 CONFIRMED in substance, AMENDED as A1.**
- **C4 CONFIRMED in substance, AMENDED as A2.**
- **C5 CONFIRMED in substance, AMENDED as A3.**
- **C6 CONFIRMED.**
- **C7 CONFIRMED.** Author addition 1 is AMENDED as A4.
- **C8 CONFIRMED.**
- Author addition 3 (Start Up Tasks item 8 carries C1 and C2) is **CONFIRMED**.

**A1 — C3: who appends.** "The PRIMARY finds" leaves no append path for a gap that the unit's secondary agent or a reviewer finds, such as Lina's reads at Tasks 13 and 14. Such a gap would fall to the pass or be lost.
- Old: `**A gap the PRIMARY finds after the block was written**, at application or at review, is appended to the block's `## Found later` section.`
- New: `**A gap found after the block was written**, at application or at review, by any seat other than a claims pass, is appended by the PRIMARY to the block's `## Found later` section.`

**A2 — C4: "in flight" leaves out a parent that is complete on an unmerged branch.** Under "every other per-parent-mode parent not merged at `R` is bound", Spec 123's **Task 13** is complete on the unmerged U2b branch and is not "in flight". It would be bound, and missing its block by construction, which is backfill by another route.
- Old: `every per-parent-mode parent in flight at `R`.** Those are unbound.`
- New: `every per-parent-mode parent started but not merged at `R`**: any subtask ticked or any of its completion docs committed on a unit branch, including a parent complete on its branch whose unit has not merged. Those are unbound.`
- Old: `For Spec 123 that means Task 14 (in flight) is listed, and Task 15 on is bound unless in flight at `R`.`
- New: `For Spec 123 that means Task 13 (complete on the unmerged U2b branch) and Task 14 (in flight) are listed, and Task 15 on is bound unless started at `R`.`
- Consistency: every other use of "in flight at `R`" reads "started but not merged at `R`". That is § 5 item 1 and the register comment's `lists the parents in flight at R`.

**A3 — C5 × C1: the ancestor cross-check fails every resolved row.**
- A `MISSING` resolved to `exists (<path> @ <sha>)` carries a sha that postdates the block's adding commit. So "is an ancestor of the block's adding commit" fails for it.
- Old: `is an ancestor of the block's adding commit. For a command`
- New: `is an ancestor of the commit that wrote that state — the block's adding commit for an original row, the resolving commit for a `→ resolved` state. For a command`
- The same correction applies in the register comment: `is an ancestor of the` / `block's adding commit` becomes `is an ancestor of the commit that wrote that state`.

**A4 — Author addition 1: the cross-branch note covers 5b but not edit site 5.** Edit site 5's bullet lands inside `#the-claims-pass-record-claims-passmd-the-template`. That unit has no record today, but Spec 123's 15.4 will record it on U2b. If 15.4 records it before this ballot's edit site 5 reaches U2b, the next `main` merge stales the unit, and U2b's sweep goes red.
- Old: `- **Cross-branch note**: this edit lands on `main`.`
- New: `- **Cross-branch note** (edit site 5 carries the reverse hazard: its bullet lands in the unrecorded `#the-claims-pass-record-claims-passmd-the-template`; if Spec 123's 15.4 records that unit on U2b before edit site 5 reaches U2b, the next `main` merge stales it, and Stacy re-confirms the unit on U2b in the same push as that merge): this edit lands on `main`.`

**Forks, one line each for Peter:**
- **F-1: (a).** A separate block file is the single append point, written first and cited last, and it never collides with the parity match.
- **F-2: No.** The three instances are evidence, not findings. With A2, the unbound set is a named list that includes the complete-but-unmerged Task 13.
- **F-3: (a), Start Up Tasks item 8.** Start Up Tasks owns the start. *Residual*: item 8 binds only parents, and its title says so.

#### [THURGOOD R3]

**All four amendments are applied exactly as quoted. None is rejected.** Each Old span occurred exactly once in §§ 0–7. The `[STACY R1]` and `[STACY R2]` entries are untouched.

| Item | Disposition | Where |
|---|---|---|
| **A1** — who appends | **APPLIED verbatim.** A gap found "by any seat other than a claims pass" is appended **by the PRIMARY**. That gives Lina's secondary-seat reads, of the Task 13 / 14 kind, an append path. | § 2 (M1). The completion-guide body is § 2 verbatim (edit site 3), so it follows. |
| **A2** — "started but not merged" | **APPLIED verbatim** at the two quoted spans: § 2 "Binding" and F-2's example. The example now lists **Task 13 (complete on the unmerged U2b branch) and Task 14 (in flight)**. **Consistency applied at the other three uses**, as you asked: the `Status` line, § 5 item 1, and the register comment. The comment also gains your parenthetical, "any subtask ticked or any completion doc committed on a unit branch, incl. a parent complete on an unmerged branch". | § 2; § 5 item 1; `Status`; register comment; § 7 F-2 |
| **A3** — the ancestor check for resolved rows | **APPLIED verbatim** in § 2's cross-checks, and the same correction in the register comment: "the commit that wrote that state — the block's adding commit for an original row, the resolving commit for a → resolved state". My R2 check would have failed every resolved row. You are right that C5 and C1 conflicted as I had written them. | § 2; register comment |
| **A4** — the reverse hazard at edit site 5 | **APPLIED verbatim** to the cross-branch note. Edit site 5's bullet lands in the unrecorded claims-pass-record unit. If 15.4 records it on U2b first, the next `main` merge stales it, and Stacy re-confirms that unit on U2b in the same push. **Carried into my Task 15 plan (PRIMARY)**: 15.4 checks whether this ballot's edit site 5 has reached U2b and says so in its doc. | § 5 edit site 5b's note |

**Grep after applying**: `in flight at` → 0 in §§ 0–7. "block's adding commit" appears only inside the A3 wording and in § 2's ordering sentence, which is about when the block itself was written, correctly.

**Ready for Peter.** F-1 (a), F-2 no (the unbound list now names Task 13 and Task 14), F-3 (a). Both seats concur on all three.

# Issue: two standing fixes from Spec 123 Task 16 — (a) the tasks-round sweep for what a plan's changes will touch; (b) a completion-doc carry must name its tracked home

**Date**: 2026-10-01
**Status**: ACTIVE (drafting: the ballot or ballots are written by the owner; no law text here)
**Owner**: Thurgood (drafts the ballot(s)). **Decision**: Peter. Ratification is by ballot (`.kiro/docs/ballots/README.md`).
**Trigger**: **the first of two events**, at which the ballot draft(s) are written on a branch and the option set is in front of Peter (the pick itself is not required at the event):
1. **U2b's unit PR merges** (Spec 123, `task/123-u2b-profile`), the unit that produced this evidence. Half (b) has no reason to wait past it: Tasks 17 and 18 will each write a parent completion doc with a Carries section, and a rule that lands after them has already missed them.
2. **Before the next spec's tasks round opens** (the same event as `.kiro/issues/2026-09-29-instruments-parser-and-resolver.md`). Half (a) operates at a tasks round, and its one mechanical form rides that parser PR (see "Composition").

**Source**: Spec 123 Task 16 execution, 2026-09-30 to 2026-10-01 (completion doc `.kiro/specs/123-consumer-distribution/completion/task-16-completion.md` and its instruments file, both on U2b's unit branch; read with `git show origin/task/123-u2b-profile:<path>`); the standards implication named in `.kiro/issues/2026-10-01-relocation-integrity-gate-vs-123-install-shape.md`; Peter's direction of 2026-10-01 (carried items live as tracked issues).

---

## Evidence

### (a) The plan did not sweep what its changes would touch

| # | What was missed | How it was found | Cost |
|---|---|---|---|
| 1 | Task 16's criteria required edits to about ten paths its Primary Artifacts did not list | Lina's pre-execution consult | Amendment #242 (`aadf9ab3`) widened the artifacts before execution |
| 2 | An unnamed prepack `derive()` step (named in the brief for this issue; I did not re-trace where it surfaced) | During Task 16 execution | Recorded in the Task 16 amendment and instruments trail |
| 3 | Spec 119-A's relocation-integrity gate (`mcp-server/src/relocation-integrity-gate/**`), a standing check outside the root `npm test`, pinned the install shape 16.3 changed. Second collision of that gate with Spec 123 (the first was Task 5.4) | The orchestrator, at the unit-branch CI checkpoint: Lane Timing red at `4b87fe7c`, run 36948483681 | Red window `4b87fe7c` to `4fab4ca9`; fixed by #248/#249 |
| 4 | `tests/consumer-integration.test.ts` L198 (Consumer Guard) asserted the old shape (`.kiro/steering` exists after bare `init`) | The same checkpoint | Red from 16.3 to 16.6 |
| 5 | The CI lane build broke on `mcp-server/dist`: CI never creates it, a local checkout carried a stale one | The CI dispatch after 16.1 | Fixed at `d54e8a5c` |

The instruments file lists six `unlisted` Found-later rows for Task 16. Three are standing readers of a changed surface (`COPY_ROOTS`/`sync`, L198, the relocation gate); the other three are existing exports or generated outputs the criteria read. The instruments block was written for a parent whose plan had already omitted them.

**What M4 and prose-M3 do not reach.** The M4 block (ballot `2026-09-28-parent-instrument-existence-check`) lists the instruments a criterion's evidence *depends on*; Stacy's LENS question 6 checks that each one the criteria *name* appears and resolves. The carried prose-M3 pass reads criteria-named paths. All three work from what the criteria say. Rows 3, 4 and 5 are things **no criterion names**: a standing check that reads a surface the parent changes. That is the gap. It is also why the Task 16 instruments block, which was complete about the criteria, still produced six `unlisted` rows.

### (b) Seven carried items lived only in prose

Until Peter asked on 2026-10-01, seven carries sat only in completion-doc "Carries" sections and consult records. Six were filed in #247 (the M0a-vs-snapshot negative; in-repo `dist` contamination; Start Up Tasks #5 vs TCP; the Req 13 design erratum; the C19 personal-note warning; the generator residuals); the seventh, the relocation gate, in #248. The Task 16 completion doc's own Carries section still reads as untracked prose for most of them (it says "for routing (orchestrator)"). Nothing in the law asks a carry to name where it is tracked. `.kiro/issues/README.md` asks that every root file have an owner and a trigger; it says nothing about what makes an item reach the root.

---

## (a) The tasks-round blast-radius sweep

**The fix named in the gate issue**: at the tasks round, a spec that changes install, packaging, CLI or steering surfaces sweeps
- **(i)** every criterion-named path against the parent's Primary Artifacts (a path a criterion requires editing but the parent does not list is an amendment-in-waiting, as in row 1), and
- **(ii)** the standing checks **outside the root suite** (`mcp-server` jest, `application-mcp-server` jest, `test:consumer`, `test:scripts`, `test:agent-generator`, the required workflows, `tool-boot-smoke.yml`) for anything that reads the surfaces the parent changes.

Each hit enters the affected parent's Instruments block with a disposition: it moves with the parent as a Primary Artifact, or it is granted (issue row), or it is declared unaffected with the reason.

### Where it would live, and which half each seat carries

- **The obligation** lives in **Process-Spec-Planning § "Tasks Document Format"**, beside the M4 Instruments block (the template line and a two-sentence rule). That is also where my own charter already routes me when I author a tasks document ("WHEN authoring or reviewing a spec's tasks document THEN consult process-spec-planning § 'Tasks Document Format'"), so the author reads it at the moment it applies. **The author (the spec formalizer, Thurgood) performs the sweep.**
- **The independent read** is **Stacy's tasks-round LENS**, which is feedback entries only, never a gate. Question 6 cannot carry this half: it reads whether what the criteria *name* resolves, and the sweep's hits are by definition unnamed. A LENS read of the sweep would be a seventh question: *is the sweep's result present for a spec in the touched-surface class, and does each recorded disposition read as stated?* **Presence and consistency only.** The mirror clause binds it: she may say a sweep line is missing or a hit unresolved; she may not say what should have been swept.
- **Split of halves**: Process-Spec-Planning carries the *doing*; the LENS carries the *checking that it was done*. Neither can substitute for the other: the LENS cannot sweep (it would be drafting the plan), and the author's own sweep has no independent reader without it.

### Composition with the instruments parser/M4 and prose-M3

- **M4 rows need no new state.** A hit that moves with the parent is a Primary Artifact plus an `exists (<path> @ <sha>)` row; a hit that is unaffected for a stated reason is a `none — <criterion ref>: <why>` row. The one disposition the grammar cannot express is "granted by issue row"; the parser PR's rule 7 (grammar errata ride the PR) is the place to decide it, and **I recommend against growing that PR for it**: Peter's condition on the parser issue is that the resolver is cut first if the PR passes a day, and a new row state is the same pressure. The disposition can ride the tasks feedback record until the grammar is next opened.
- **Prose-M3's carried pass** (the parser issue's "Carried" section: trigger = ten committed Instruments blocks, or a second `unlisted` whose instrument the criterion named) is a different property (existence of named paths) with the same extraction step (path tokens out of criteria text). Sweep (i) would reuse that extraction. Trigger (b) of prose-M3 has **not** fired on this evidence: no Task 16 `unlisted` row's instrument was named by a criterion at the tasks round, which is exactly the point above. Prose-M3's population is also shrinking: after `P`, a spec writes the M4 block, and the pre-`P` population whose tasks round is still open may be one spec or none (I have not enumerated the in-flight specs; the ballot draft must).

### Is there a mechanical form?

**Partly, and only for static readers.** One script, given a parent's Primary Artifacts and criteria-named paths, greps the non-root lanes' source (`mcp-server/src`, `application-mcp-server/src`, `tests/`, `scripts/`, `tools/agent-generator/__tests__`, `.github/workflows`) for those path strings and prints hits not themselves in Primary Artifacts.
- **It would have caught** row 1 (criteria-named paths vs artifacts: the parser already holds both lists) and row 3 (the gate's coupling labels name `src/cli/init.ts` and `src/cli/designerpunk.ts` by path).
- **It would not have caught** row 4 (L198 asserts `init`'s *behavior* through the CLI, not a path), row 5 (a local-versus-CI environment difference, not a reader) or row 2 (a build-graph step). A behavioral reader needs a command-grep (`designerpunk init`), which is noisy enough that its hit list would be triaged by judgment anyway.
- **So the honest count is two of five by mechanism**, plus the judgment half. The mechanical form is an advisory emission of the parser/resolver family (A-6's shape: never fit, binds nothing before `P`), not a gate.

### Options (drafted, not picked)

- **A1. The obligation text only** (Process-Spec-Planning; the author sweeps by hand; no instrument). Cost: one governance-doc edit, no re-sign. Does nothing for the next author who forgets; row 3's collision recurred after a gate issue had already named the risk.
- **A2. A1 plus the advisory script** (a `scripts/completion-claims/**` emission, grant on the parser issue's list or a new row). Cost: a script to maintain, and a hit list that is noisy for `package.json`. Catches the static class only.
- **A3. A1 (or A2) plus the LENS seventh question.** Cost: Stacy's charter unit `#the-trigger-set-the-114-superset-table-names-never-numbers` (item `trigger-lens`) goes stale: hash, her operative-set confirmation, her signature and the overlay pin, three acts by two seats under the signing-act ballot. By that ballot's rider logic she decides whether and when, in her own commit, riding her next charter edit. Until then A1/A2 stands without an independent reader.
- **A-minimal, available at no cost today and with no law**: the PRIMARY runs the sweep by hand at each remaining Spec 123 parent's branch cut and records it as `Found later` rows in the execution file. Task 20 (the `.gitignore` region), Task 22 (the bare-`init` notice) and Task 28 (the tarball) all touch the install surface again.

### Counter-argument that survives

**The existing backstop worked.** The unit-branch CI dispatch (ballot B-CI) caught rows 3, 4 and 5 within a checkpoint each, on a unit branch, with no red on `main` and no consumer exposure. What the sweep buys is moving detection from a checkpoint to the tasks round, and for rows 3 and 4 that is a gain measured in hours of a red window. The cost of the rule is paid on every spec; the saving is paid on the specs that change install shape, which in this project is Spec 123 and little else on the roster today. **A sweep rule written from one spec's evidence is the "patch without a guard" in reverse: a guard written for a failure mode that may not recur.** I cannot rebut that from the record; the fork is whether two collisions of one gate with one spec (Tasks 5.4 and 16.3) is a pattern or a coincidence of that spec being the install-shape spec.

### What it would retire or make cheaper

- **Retires nothing in law by itself.** It makes the `unlisted`-kind Found-later rows rarer, and with them the per-collision issue-plus-grant cycle (#248/#249 for one gate), and it turns Lina's pre-execution consult from the detector into a verifier.
- **A genuine retirement is on offer**: close prose-M3's carried pass if the in-flight pre-`P` population is empty at the parser PR's merge, since sweep (i) shares its extraction and the M4 block replaces its population. That is a ballot item, not mine to assume.

---

## The orchestrator-side companion (not law, and needs none)

"Full suite green" in a PRIMARY's or orchestrator's report must **include the non-root lanes or say which were not run**: `mcp-server` jest, `application-mcp-server` jest, `test:consumer`, plus `test:scripts` and `test:agent-generator` (both already run in `lane-functional-root` but not in root `npm test`). This is practice, the same standing as the orchestrator's parent-verification checklist. Writing it into Start Up Tasks #5 would ship it to every consumer, where "the three lanes" are DesignerPunk's, not theirs.

**Does a single `npm run` script for all lanes belong in my CI-regime standing test-lane scope (ballot 2026-09-27-ci-regime-standing-scope § 2)? No, for three reasons.**
1. P1 admits a step that runs an **existing** `package.json` test script inside an **existing** required job, plus its own floor. An aggregate script does not exist, and creating it is an edit to root `package.json`, which is outside both my write scope and P1; it would need an issue-row grant (§ 3) over `package.json`.
2. CI already gates each lane in its own required job. An aggregate step added to one job would re-run the other lanes inside it (duplication, and `lane-functional-root` would need the sub-packages' install), and a floor "with the same selection as the step" is ill-defined across three jest configs.
3. What it would give is a **local** convenience that prints per-lane result and an explicit "not run". That is worth having and needs only the `package.json` grant, with **no** CI wiring. Its honest limit: sub-package lanes need built artifacts, so in a fresh worktree it false-reds in exactly the class that `d54e8a5c` fixed from the other direction (a local pass masking a CI fail). A local aggregate does not make local equal CI.

---

## (b) A carry must name its tracked home

**The fix**: a completion doc's carried item either **cites a root `.kiro/issues/<file>`** (which, under README rule 1, carries an owner and a named trigger) **or is marked `no issue — <reason it needs none>`**. Silence does not satisfy it, the same shape as the forced-negative line's "each item carrying a follow-up link" (Completion Documentation Guide § "The forced-negative line"), which already binds *unmet criteria* but not carries that are not unmet criteria.

### Where it would live

- **Completion Documentation Guide** (a section beside "The forced-negative line" and the parent-doc floor lines: Delegated-tier, CI-provenance, Instruments), as a fixed-form `**Carries**:` line on a parent completion doc. **The TCP names the parent-doc floor only in part today** (its step 3 lists the forced-negative line and the Instruments header, not the Delegated-tier or CI-provenance lines), so a rule living in the Guide alone is the existing pattern, not a new gap. A TCP pointer is available but is a cost (below).
- **A subtask doc** keeps S-4's three light elements; the rule binds parents, where Carries sections live.
- **Can a checker read it?** The parity checker is my instrument, and it already reads parent-doc lines. **The cited-path half is mechanical**: each list item matches `.kiro/issues/<file>.md` and the file exists at the root (or in `archive/`, per README rule 3). The `no issue — <reason>` half is **form only**: a checker can see the string, never whether the reason holds. The framing sentence binding every reader of that instrument applies unchanged (a green gate is not evidence of claim honesty). The reason's adequacy is a **claims-pass read** (Stacy's CLOSEOUT, which already reads the doc whole); that is a new question for her pass, not a new gate (no claims pass is ever a required check). And until Q2 arms the parity checker as a required context, a Carries check there has no teeth.
- **The owner and trigger half** is already read by the monthly active-charter walk (README rule 6). The new rule does not re-read it.

### Options (drafted, not picked)

- **B1. A fixed-form `**Carries**:` line, mechanically read for the cited-path half** (an instrument change under `scripts/completion-claims/**`, grant as for the parser issue; register row `proposed`). Strongest; adds a line kind to the parser and a row to the register.
- **B2. The same Guide rule, no checker**: the claims pass counts untracked carries and routes findings to the author. Cheapest; detection is post-acceptance, and the rule leans on the one reader who already has the whole record.
- **B3. A wider form**: a carry may also cite a `tasks.md` row (`Task 22.5`) as its tracked home. Many Task 16 carries were already tracked by a future task's own row (Task 22's C19 check, Task 20's `.gitignore` wiring, Task 28's tarball); forcing an issue for each would duplicate a home that an event will find anyway. It costs one more form for the checker (the row must exist in the merged `tasks.md`). **This is a fork, not a drift into the rule**: the brief's wording was "a root issue or `no issue — <reason>`", and `no issue — tracked by tasks.md Task 22.5` already expresses B3 inside it. B3 only makes the reason checkable.

### Counter-argument that survives

**Root growth.** The roster was 26 files at the 2026-09-19 triage and the walk is "minutes, not sessions". Task 16 alone produced seven issues in a day; a rule that makes every carry reach the root trades hidden carries for a root the walk must read monthly, and README rule 6 already counts "root growing stale items" as a finding. B3 and a firm `no issue` clause are the release valves, and they reopen the loophole: `no issue — minor` costs nothing to write. I cannot design a form in which the carry is both forced to a home and the home is not a new root file, except by letting `tasks.md` and the next spec's feedback doc count as homes (B3 and its siblings). Whether that is enough, or the walk's cost is acceptable, depends on how many carries a parent produces in ordinary specs; Task 16 is one data point from the largest, most cross-cutting parent in the project.

### What it would retire or make cheaper

- **"Peter asks" as the detector.** Today an untracked carry surfaces when the human reads the doc closely enough to ask; that is a failure mode with no mechanism.
- **The orchestrator's "for routing" line** in a completion doc (Task 16's last bullet) becomes either a citation or a dated reason.
- **Retires nothing in law.** It is an additional fixed line. The fold-back that would reduce it: instead of a third fixed-form line, extend the forced-negative line's follow-up-link rule to "unmet criteria **and carries**", one line kind, one parser rule. That is cheaper to build and read; its cost is that a doc with no unmet criteria but carries must still produce the line, and the existing line's grammar then widens (an erratum to Spec 127's standard).

---

## What an edit costs (the signed-unit surface)

Measured from U2b's `canonical/operative-sets/*.yaml` `source:` lines on the unit branch (`origin/task/123-u2b-profile`): the signed units are the eight always-set identity docs, the eight agent charters, and `governance/Component-Family-Navigation.md`. **Neither `governance/Process-Spec-Planning.md` nor `governance/completion-documentation-guide.md` is a signed unit.** The premise that both fixes touch signed identity units is only half true.

| Edit | Signed unit staled? | Re-sign cost |
|---|---|---|
| (a) obligation in Process-Spec-Planning § "Tasks Document Format" | **No** | None. Mechanical only: `governance/**` is in the `generated.lock` input closure, so the PR refreshes the lock (and see the lock issue filed with this one: refresh it from a clean tree) and the docs-MCP index is rebuilt |
| (a) LENS seventh question (option A3) | **Yes**: Stacy's charter unit `#the-trigger-set-the-114-superset-table-names-never-numbers` | Three acts, two seats (hash, her confirmation and signature, overlay pin); not simulated for this unit, so the draft must simulate it on a throwaway worktree of the merged tree, as the signing-act ballot did for F-2 |
| (b) `**Carries**:` rule in the Completion Documentation Guide | **No** | None, same mechanical items |
| (b) an optional TCP pointer | **Yes**: `#for-parent-tasks-implementation-or-architecture-type` **and** `#for-parent-tasks-setup-or-documentation-type` (the two lists carry the same step 3) | Up to six acts across two units |

**Can either ride a queued edit?**
- **The F-2 (b) pointer rider** rides the next TCP edit that already stales `#coherent-units-the-merge-granularity`. Neither fix touches that unit. **No.**
- **`2026-10-01-startup-tasks-5-vs-tcp-subtask-tests.md`** edits `#for-subtasks` and Start Up Tasks #5's unit `#item-test-command-selection-guidelines`. Neither fix needs those units. The only content that could ride there is the orchestrator companion above, and I recommend it **not** ride (see that section).
- **The only edit with a re-sign cost is optional on both halves** (the LENS question; the TCP pointer). My recommendation is to take neither now: A3 rides Stacy's own next charter edit, and the TCP pointer has no queued edit that makes it free.

## Ballot form

**Two ballots, not one**: the halves have different homes, different decisions and different triggers. (a) is a tasks-round obligation with an optional advisory instrument; (b) is a completion-doc floor line with an optional checker row. A single ballot lets one half's counter-argument hold the other hostage. This issue is one file because Peter named it as one; the drafts are separable.

## Forks left for Peter (not decided here)

1. **(a)** A1, A2 or A3; and whether prose-M3's carried pass retires when the parser PR lands.
2. **(b)** B1, B2 or B3, and whether the fold-back (extend the forced-negative line) is preferred to a new line kind.
3. **Both**: whether to take either at all, given Spec 123's process weight. The A-minimal practice (hand sweep at each remaining 123 parent's branch cut) costs nothing and is the evidence-gathering step if the answer is "not yet".

## Thurgood's lean, and what survives

**(a): A1 plus the A-minimal practice now; decide A2 and A3 after one more tasks round has applied A1.** **(b): B2 first, B1 only if the claims pass finds untracked carries a second time.** Working my own counter-arguments against these changed the leans: I first leaned to B1 and A2 (build the instrument now), then dropped them because each adds an instrument whose false-reassurance risk (a green parity gate is not honesty) is the very error the Q5 framing sentence warns about, and because the evidence for (a) is concentrated in one spec. **What survives**: the lean to defer instruments rests on "the next collision is not coming soon", and the repository's own record (two collisions, Tasks 5.4 and 16.3) argues the opposite for any spec that touches install shape, which Spec 123's U3-U5 still do. And I author the Process-Spec-Planning text and the checker both: I may weigh rule-and-instrument growth more lightly than a reader would.

## Not in scope here

Any edit to Process-Spec-Planning, the Completion Documentation Guide, the TCP, Start Up Tasks, Stacy's charter, `scripts/completion-claims/**`, `package.json` or `.github/**`. This issue is the tracked flag, the evidence, the cited surfaces and the option sets. The ballots are Thurgood's to draft at the Trigger; the pick is Peter's.

---

## Trigger fired — 2026-10-02

*Recorded 2026-10-02 by Thurgood; nothing above is rewritten and the Status stays ACTIVE.*

**Event 1 of the Trigger fired**: U2b's unit PR merged, #262 (`669b51b0`, 2026-10-02). **The drafting is owed**: the ballot or ballots for halves (a) and (b) are to be written on a branch and the option set put in front of Peter. The pick itself is not required at the event. Scheduling the drafting is a separate act the orchestrator puts to Peter; no ballot text is drafted by this entry.

**What the evidence base now includes**: the A-minimal hand sweep (§ "Options") ran at the branch cut of both Task 17 and Task 18.
- **Task 17** (Thurgood): results in `.kiro/specs/123-consumer-distribution/completion/task-17-instruments.md`, whose header cites the sweep working file `task17-blast-radius-sweep.md`. That file is not committed on `main`; the instruments block carries the re-derived rows.
- **Task 18** (Lina, as PRIMARY): results in `.kiro/specs/123-consumer-distribution/completion/task-18-instruments.md` (source line: "Lina's branch-cut sweep of 2026-10-02 (A-minimal form)"), including the rows it found late under `## Found later`.


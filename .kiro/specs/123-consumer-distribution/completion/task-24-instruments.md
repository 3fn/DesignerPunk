# Task 24 — Instruments block

**Written**: 2026-10-13, before subtask 24.1 (unit head `8007105fa`; `task/123-u4-content`) · **PRIMARY**: Thurgood (Opus)

**Binding**: the instrument-existence ballot (`.kiro/docs/ballots/2026-09-28-parent-instrument-existence-check.md`) is RATIFIED (Peter, 2026-09-29). Spec 123 stays on M1's execution-time form (ballot § 4a: "Specs planned before `P`, Spec 123 included"). No subtask of Task 24 has started. This block is its own commit, before any 24.x subtask.
**Sha convention**: each `exists` row names the commit that last touched `<path>` as of `8007105fa`. Each was checked with `git cat-file -e <sha>:<path>` and `git merge-base --is-ancestor <sha> 8007105fa`, and every one passed (run 2026-10-13, every path cited below). Where a command has no file of its own, `<path>` is its defining file (`package.json`, the tool's source) or the record that prescribes it.
**Criteria order**: Task 24's criteria in `tasks.md` order (`.kiro/specs/123-consumer-distribution/tasks.md` @ `cdb8296fa`, L1470–1473). The parity parser (`parseTasksMd` + `normalizedCriteria`, `scripts/completion-claims/tasks-md.ts` @ `9b6d269f4`), run at `8007105fa`, reads **3** criterion rows for Task 24 and 0 malformations in the file: **C1** the U1b record (denominator from `git log`; the D-T-A6 residual; findings routed as explicit messages) · **C2** B-U4 RATIFIED before its edits apply; it carries the trio obligation (23.7) and the recurring changelog step (21.2) · **C3** the U4 PR body carries the tripwire line.
**Source**: Thurgood's sweep of 2026-10-13, every fact by command at `8007105fa` unless the row says "read". The orchestrator's brief proposed a commit list for C1; it was re-enumerated here and differs (row 1.2; O-5).

| # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
|---|---|---|---|---|---|
| 1.1 | C1 the record | `.kiro/specs/123-consumer-distribution/validation/u1b-backward-check.md` (the `validation/` directory does not exist at `8007105fa`) | built here (24.1) | — | 24.1 |
| 1.2 | C1 the denominator, enumerated from `git log` | `git log --first-parent --format='%h %cs %s' 8007105fa -- governance/ \| grep '(125-B)'`, then per commit `git show -U0 --format= <sha> -- governance/ ':!governance/classification-map.md'` for the content hunks; output pasted in the record | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `cdb8296fa`) | L1471 prescribes "the denominator enumerated from `git log` in the record". Run at writing: **10** `(125-B)` commits touch `governance/`. **Prunes (3 commits, 7 content hunks; `Last Reviewed` metadata hunks excluded)**: `4992e5926` Task 2 pilot prune (U1-p) — 1 hunk, `Process-Development-Workflow.md` L75; `cbf9929c9` wave 1 — 1 hunk, same doc L249; `1301c2de1` wave 2 — 5 hunks (`Component-Development-Standards.md` ×3, `Contract-System-Reference.md` ×1, `platform-implementation-guidelines.md` ×1). **Not prunes, excluded by name**: `7b7773cfa`, `6df1375ad`, `5ea404e58`, `4024fdbef` (register rows only); `d0f709f9f`, `13b0d474e` (waves 3–4, "rows-only, no prune" — the waves are stated, not counted); `4fe6ce9f9` (+2 lines to `Product-Handoff-Protocol.md`, an addition) | 24.1 |
| 1.3 | C1 a second enumeration, so the subject-tag filter cannot silently miss a prune | the three prune ballots; the campaign closeout's count; the pilot's unit table | exists (`.kiro/docs/ballots/2026-07-14-npm-test-imperative-prune.md` @ `4992e5926`; `.kiro/docs/ballots/2026-08-12-wave-1-workflow-gate-prune.md` @ `cbf9929c9`; `.kiro/docs/ballots/2026-08-25-wave-2-component-test-gov-prune.md` @ `1301c2de1`; `.kiro/specs/125-B-classification-map/completion/u1b/campaign-closeout.md` @ `4024fdbef`; `.kiro/specs/125-B-classification-map/tasks.md` @ `4024fdbef`) | closeout L75: "Prunes: 2 (12 hunks total, waves 1–2)"; 125-B `tasks.md` L25 names U1-p (Task 2) as the pilot's prune unit. The closeout's 12 counts `governance/` and `.kiro/steering/` hunks together, so it does not equal row 1.2's `governance/`-only 6 for waves 1–2; the record reconciles the two counts per ballot, and any prune a ballot names that row 1.2 lacks is added | 24.1 |
| 1.4 | C1 the scope | Req 21.1; design-outline § 6.5 | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`; `.kiro/specs/123-consumer-distribution/design-outline.md` @ `a062f44b3`) | Req 21.1 (L779) and § 6.5 (L633–637): "scoped to `governance/` prunes only", findings "routed to the owning domain agent rather than fixed in 123". Wave 1 and the pilot also pruned `.kiro/steering/Task-Completion-Protocol.md`; those hunks are out of scope and excluded by name. Req 21.1 says "the campaign's prunes"; the criterion says "every 125-B `governance/` prune" (O-5) | 24.1 |
| 1.5 | C1 the yardstick, "consumer-serving needs" | Req 20 (gate 4a, ruled) | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`) | L751–770: the corpus ships whole and MCP-served (20.1); banners state worked example vs transferable (20.8). Each pruned clause is read as a consumer agent would meet the served doc, where an internal redundancy can be load-bearing (outline § 6.5) | 24.1 |
| 1.6 | C1 the D-T-A6 residual, as Ada recorded it | `[D-T-A6]` in Ada's R1 | exists (`.kiro/specs/123-consumer-distribution/feedback/tasks.md` @ `53a3d413b`) | L296: served governance docs pointing at file paths under `src/` no longer shipped (`src/validators/**`, `src/generators/**`) "now point at nothing inside `node_modules`" — "U4 banner and backward-check territory (Task 24)"; L685 places it here | 24.1 |
| 1.7 | C1 D-T-A6: what "no longer shipped" means | `npm pack --dry-run --json` over `files[]` | exists (`package.json` @ `cdb8296fa`; `scripts/pack-assert.ts` @ `cdb8296fa`) | `files[]` is the authoritative shipped list (also `governance/release-management-system.md` L37); `pack-assert.ts` L3–4 asserts against the same `--dry-run --json` listing, so "not shipped" in the record means absent from that listing, never judged from `files[]` by eye | 24.1 |
| 1.8 | C1 D-T-A6: the candidate set and its intersection | `git grep -n -o -E 'src/[A-Za-z0-9_./*-]+' -- governance/`, minus the pack listing (row 1.7); glob or prefix strings judged per entry | built here (24.1) | — | 24.1. Baseline at `8007105fa`: 396 mentions, 223 unique strings, 50 files; Ada's two named roots alone: 8 files, 32 matching lines |
| 1.9 | C1 routing: who owns each finding | the domain map | exists (`.kiro/steering/Agent-Directory.md` @ `183140558`) | names domain ownership (Ada: Rosetta; Lina: Stemma and the two platform-guideline docs; Thurgood: governance and process docs). **Partial fit**: it lists no per-doc owners, so the record proposes each doc's owner and the orchestrator confirms before any message goes | 24.1 |
| 1.10 | C1 findings routed as explicit messages | one message text per owning agent, in the record, with a delivery line appended when sent | built here (24.1) | — | 24.1. Delivery is the orchestrator's: this seat cannot message another agent (O-6) |
| 1.11 | C1 each prune's verdict | — | none — the verdict is a reading of the removed text against row 1.5's yardstick; no instrument decides it | — | 24.1 |
| 2.1 | C2 the ballot | `.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md` (date set by the drafting day) | built here (24.2; or U4's first content commit under O-1 (a)) | — | 24.2 (and 23.2, under O-1 (a)) |
| 2.2 | C2 "RATIFIED before its edits apply" — the protocol | the record-first protocol | exists (`.kiro/docs/ballots/README.md` @ `54d35a2f6`) | § "The Ratification Protocol": step 1, the ballot's `Status` is committed `RATIFIED (Peter, <date>)` "before any law edit is applied"; step 2, the applier checks only that committed fact | 24.2 |
| 2.3 | C2 the two precedent forms | B-U1's in-session stamp; B-U3's merge-as-ratification and its § 2 ordering | exists (`.kiro/docs/ballots/2026-09-27-123-b-u1-publish-rail.md` @ `d566b30ff`; `.kiro/docs/ballots/2026-10-03-123-b-u3-install-guide.md` @ `cdb8296fa`) | B-U1 L5–7: Peter ruled in session, and the `RATIFIED` stamp was committed with the edits on the unit branch. B-U3 L5–6: `**Status**: DRAFT`, "Peter's merge of U3's unit PR is the ratification"; L28–35: the ordering instrument. B-U3's L5 still reads DRAFT on `main` after the merge (O-2) | 24.2 |
| 2.4 | C2 the RATIFIED check | `grep -n '^\*\*Status\*\*: \*\*RATIFIED' <B-U4 path>` | exists (`.kiro/specs/123-consumer-distribution/completion/task-19-instruments.md` @ `cdb8296fa`) | § "Found later", first entry: the corrected form; the plan's unbolded grep exits 1 on the house form. Under merge-as-ratification the check cannot pass before the merge (O-2) | 24.2 |
| 2.5 | C2 the ordering instrument | B-U4 § 2: `git merge-base --is-ancestor <B-U4 adding commit> <c>` for every U4 commit `c` that changes a governed file | built here (24.2; B-U3 § 2's pattern) | — | 24.2; 23.2 under O-1 (a) |
| 2.6 | C2 the trio obligation (23.7) | Req 23.7; the obligation's placement; Task 28's exit record | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`; `.kiro/specs/123-consumer-distribution/tasks.md` @ `cdb8296fa`) | Req 23.7 (L814): the recurring obligation's home in the release recipe "is a ballot-measure change" and it exits as a committed record with owner and trigger. `tasks.md` L418 places it at "Task 28.4 + B-U4"; L1565–1568 make 28.4's `.kiro/issues/` record its tracked home. B-U4 and that record must name each other | 24.2 |
| 2.7 | C2 the recurring changelog step (21.2) | Req 21.2; DD16; the CHANGELOG and its packaging | exists (`.kiro/specs/123-consumer-distribution/requirements.md` @ `669b51b09`; `.kiro/specs/123-consumer-distribution/design.md` @ `cdb8296fa`; `CHANGELOG.md` @ `cdb8296fa`; `package.json` @ `cdb8296fa`) | Req 21.2 (L780) asks the disposition be decided and recorded; DD16 (L1098) decided it, a consumer `CHANGELOG.md`. `CHANGELOG.md` L1–5 states its convention (one entry per release, plain language); L7 opens the release-3 `[Unreleased]` block; `files[]` lists `CHANGELOG.md` first. B-U4 makes the per-release entry a recipe step | 24.2 |
| 2.8 | C2 the edit target | the release recipe doc | exists (`governance/release-management-system.md` @ `54d35a2f6`) | L11, the existing banner, ends "(Whether DesignerPunk's release notes themselves ship to consumers is an open Spec 123 question, deferred by the Q6 ballot.)", stale under DD16. § "The Release Recipe" L33–41; step 4 (L40) is where the changelog step lands; L35 names `RELEASE-FLOW.md` as the operational sequence (O-3, O-4) | 24.2 |
| 2.9 | C2 the operational sequence the recipe points to | `RELEASE-FLOW.md` § "The sequence" | exists (`.kiro/hooks/RELEASE-FLOW.md` @ `54d35a2f6`) | step 2 (L117) already lists "release notes / changelog updates", generically; § "Deriving the delta" L22–30 is the judgment half. **Not a Task 24 Primary Artifact and outside this seat's write scope** (O-3) | 24.2 |
| 2.10 | C2 the deferral B-U4 closes | the Q6 ballot | exists (`.kiro/docs/ballots/2026-08-12-q6-release-manager-retirement.md` @ `2dbc3a932`) | L36: "if 123's install-doc/upgrade story needs structured release data, build against that real requirement then", the deferral L11 of the target doc cites | 24.2 |
| 2.11 | C2 every enumerated edit site applied (STRAGGLER) | B-U4's before→after table, and one grep per site after application | built here (24.2) | — | 24.2 |
| 3.1 | C3 the referent and the line form | § "Split tripwire" | exists (`.kiro/specs/123-consumer-distribution/tasks.md` @ `cdb8296fa`) | L265: U4 declared **6**, threshold **+2**; L245–252 the two limbs; L254–255 the line `Tripwire: declared <n>, now <m>; parents unchanged\|added; successor branch: none\|<sha>` | 24.3 |
| 3.2 | C3 the current count | `grep -cE '^  - \[.\] (23\|24)\.[0-9a-z]+' .kiro/specs/123-consumer-distribution/tasks.md` | exists (`.kiro/specs/123-consumer-distribution/completion/task-22-completion.md` @ `8007105fa`) | L58 is the U3 form of the command. Run at writing: **6** (parents 23–24 unchanged) | 24.3 |
| 3.3 | C3 Limb 2 | `git ls-remote --heads origin 'task/123-u5*'` | exists (same file and line as 3.2) | Run 2026-10-13T12:34Z: empty. `task/123-u4*` is not on `origin` yet; `origin` `main` is `e3bc68a6f`, ahead of `8007105fa` (content not read) | 24.3 |
| 3.4 | C3 the PR opener | `complete-task.sh` parent mode, `--unit` | exists (`.kiro/hooks/complete-task.sh` @ `90fb0e71e`) | L755–764 build the body from Spec, Task, Unit, Agent, completion docs and Validation. **No Tripwire and no Consulted field**, so both are added after open | 24.3 |
| 3.5 | C3 the body that carries the line | `completion/u4-pr-body.md`, applied with `gh pr edit <n> --body-file`; the PR URL and a `gh pr view <n> --json body` check appended to Task 24's completion doc in a commit pushed after open | built here (24.3; precedent `.kiro/specs/123-consumer-distribution/completion/u3-pr-body.md` @ `cdb8296fa`) | — | 24.3 |

**Counts (at writing, 2026-10-13)**: N = 26: exists 19 · built-here 7 · missing 0 · unlisted 0. Row 1.11 is a `none` row and is not counted.

**Resolutions of MISSING rows** are appended in-row, in the form `→ resolved <date>: <new state> (<record>)`. The original `MISSING` stays readable.

## What the rows mean for scheduling

- **No MISSING row**, so nothing is stopped by an instrument. What gates the work is the open items, not the rows:
  - **24.1** can start now. It needs only the orchestrator's owner confirmations (row 1.9) before its messages go (O-6).
  - **B-U4's draft** comes first if O-1 is ruled (a), before 24.1 and before any 23.2 banner commit.
  - **24.2's edits** wait for the B-U4 ruling (O-2) and, for `RELEASE-FLOW.md`, for O-3.
  - **24.3** waits for Task 23's close and for 24.1–24.2.

## Notes bearing on the rows (not criteria)

- **N1 — Post-unit obligations** (`tasks.md` L359): docs-MCP `rebuild_index` after U4 merges. As steward, I also run `node scripts/validate-steering-metadata.js` after 24.2's edit. Neither is a criterion, and the completion doc cites them as owed.
- **N2 — The worktree at session start** showed ` M docs/tokens.css`, which is not this seat's. It was gone from `git status` at writing. Recorded only so nobody reads it as Task 24's.

## Open items

These were found while writing. **None is resolved here, and `tasks.md` is not edited.**

- **O-1 — When B-U4 is written, and whether it governs the banners.**
  - *Recommendation*: **(a)**. Draft B-U4 now, as U4's first content commit after the two instruments blocks. Give it two separately ratifiable sections:
    - **§ Banners** is light, on B-U3's model: the template (23.1's exported text), the predicate as the membership rule, and the owner-review form. There is no vote per banner.
    - **§ Release recipe** carries the changelog step, the trio obligation, and the disposition of L11's stale clause.
  - Add a **§ 2 ordering instrument** over every U4 commit that changes `governance/*.md` text, except the instruments blocks.
  - *Why*:
    - `tasks.md` L130 lists the banners beside B-U4 under "record-first".
    - TCP § "Completion State in the PR Flow" point 9 says a checks-only merge is not ratification for governance-law changes.
    - Peter's ruling on Task 19's O-3 made "the ballot precedes every content commit it governs" this spec's unit precedent.
    - The one shared file (O-4) gets one governing record.
    - Drafting costs hours, and 23.1 (code and test) is not blocked by it.
  - *Folded in from the counter-argument*: DD13's own residual ("bundling delays everything if one item is contested") is why the sections are ratifiable separately, so a contested recipe item cannot hold the banners.
  - *What survives*:
    1. If O-2 goes to the in-session form, **23.2 waits on a Peter sitting it did not wait on in the plan**. U4 is not on release 3's path, so the cost is calendar time, but Peter's pace is bursty.
    2. **Task 24's seat would author the record that governs Task 23's edits.** That is a cross-parent dependency the plan never declared: Task 23's criteria and Primary Artifacts do not name B-U4. A reviewer can fairly read it as plan drift that needs a tasks amendment.
    3. **(b) is defensible.** Req 20 already ratified the banners, so § Banners re-records a ruling. L130's "banners" can also be read as a merge-rule entry (Peter merges), not a ballot entry.
  - **Which reading of L130 is right is Peter's fork, not mine.** Task 23's seat recommends the same order (its O-4).
- **O-2 — The ratification form (a fork; the pick is Peter's).**
  - **(r1)** B-U3's merge-as-ratification. `Status` stays DRAFT until the merge, and criterion 2 can only be evidenced after the merge, the same ⚠️ structure as Task 22's tripwire row. B-U3's L5 still reads DRAFT on `main` (row 2.3), so a reader who checks the record finds an unratified ballot.
  - **(r2)** B-U1's in-session form. Peter rules on the drafted text, the stamp is committed with or before the first governed edit, and row 2.4's grep passes before any edit.
  - *Lean*: **(r2)**. The criterion's literal text, the README protocol's step 1, and my charter's verify-RATIFIED rule all read the committed `Status` line.
  - *Residual*: (r2) needs a sitting before edits. (r1) needs none and is Peter's most recent precedent.
  - Related: **B-U3 has no entry in `.kiro/docs/ballots/README.md` § "Ballots on record"** (B-U1 is at L47 and B-U2 at L69; B-U3 has none). Ada flagged the same gap for #268's ballot. B-U4 will repeat it unless someone with a grant adds the entries, and the README is outside Task 24's Primary Artifacts and my write scope.
- **O-3 — The recipe's operational home is not in Task 24's Primary Artifacts.**
  - `governance/release-management-system.md` L35 sends readers to `.kiro/hooks/RELEASE-FLOW.md` for the operational sequence (row 2.9). A recurring step written only in the summary doc leaves the operational sequence saying "release notes / changelog updates" generically. That is a content-consistency gap, and consistency is my steward lane.
  - Options:
    - **(i)** B-U4 edits the governance doc only, and records that RELEASE-FLOW step 2 already covers it generically.
    - **(ii)** A tasks amendment adds `.kiro/hooks/RELEASE-FLOW.md` to Task 24's Primary Artifacts, so the T1-(B) row grant covers it. Task 7 listed that file for B-U1, so there is precedent.
  - *Lean*: (ii). It changes a merged plan, so it goes through a consult first. Stacy holds a verbatim copy of step 5a's pipeline, but 5a is not touched.
- **O-4 — The shared file, `governance/release-management-system.md`.**
  - It matches Ada's predicate (4 matching lines: L11, 26, 50, 54). It is the one doc already carrying an `Audience framing` banner (L11), and it is Task 24's Primary Artifact.
  - *Recommendation*:
    - **23.2's commit replaces L11 only.** The template banner replaces the old banner, stale parenthetical included.
    - **24.2's commits touch only L13–54**, including the `Last Reviewed` / `Last Updated` lines L14–15, which only 24.2 touches.
    - The two seats never hold uncommitted edits to the file at the same time. The orchestrator commits one before the other starts.
    - B-U4 § Release recipe records that DD16 answered the removed parenthetical, so its removal is not silent.
  - *Separability check*: run `git show -U0 --format= <c> -- governance/release-management-system.md` for each U4 commit `c`. Each commit's hunks fall inside one parent's range. That makes the ordering judgment the guide gives the claims pass ("where two parents of one unit share an artifact") a read of disjoint hunks.
  - **This differs from Task 23's O-3**, which has this seat apply the banner. I recommend against that: C3's evidence ("each banner uses a template", inspected per doc) should sit in Task 23's own commits. The orchestrator rules.
  - *Residual*: under O-1 (b), 23.2 removes a sentence about a law's status before the record that answers it exists. It is a small ordering wart.
- **O-5 — The denominator's population.**
  - The criterion ("every 125-B `governance/` prune") is wider than Req 21.1 and § 6.5 ("the campaign's prunes"; in 125-B's naming the U1b campaign is waves 1–4, and the pilot is U1).
  - The record **includes the pilot prune `4992e5926`**. A superset satisfies both texts, and it states the population.
  - The brief's list omitted `4992e5926` (the pilot prune) and two register-only commits (`7b7773cfa`, `6df1375ad`). Every one is enumerated and classified (row 1.2).
  - Wave 4 sent its contradiction rewrites to owner fix PRs instead of pruning (closeout L45). Those are rewrites, not prunes, so they are excluded by name and not reviewed.
- **O-6 — Routing.**
  - This seat cannot message another agent, so the orchestrator delivers each message and the record carries the delivery line (row 1.10).
  - Two of the D-T-A6 candidate docs are mine: `Test-Development-Standards.md` (8 lines) and `Process-Spec-Planning.md` (4 lines). Findings in them route to me, after 123 (Req 21.1: not fixed in 123). Their committed issue record would go under `.kiro/issues/`, which is outside Task 24's Primary Artifacts and my write scope, so the orchestrator writes it or grants it.
- **O-7 — A trace defect, recorded and not amended.** Task 24 traces "Req 21.1–21.3" (L1468), but Req 21 has acceptance criteria 1–2 only (`requirements.md` L779–780; L782 is the unit break).
- **O-8 — The trio step points forward.**
  - The trio protocol and fixtures (`tests/onboarding-trio/`, the frozen-prompt discipline) are built by Task 25, in U5. At U4's merge, a recipe step naming them would point at a path that does not exist.
  - *Lean*: B-U4 words the step to start at release 4, once Task 25's protocol is committed. It names Task 28.4's issue record as the obligation's tracked home, and leaves the owner and trigger to that record (Req 23.7), so it does not pre-pick them.

## Found later

## Surviving counter-argument to this block

**"missing 0" understates what blocks Task 24.** The things that actually stop 24.2 are written as open items, not rows: Peter's two rulings (O-1, O-2) and a write grant for `RELEASE-FLOW.md` (O-3). The guide counts only instruments, so a header line reading `missing 0` will look cleaner than the unit's state is. Several `exists` rows also carry partial fits that the counts do not show:
- row 1.3: the closeout's 12 is not row 1.2's count until reconciled;
- row 1.9: the domain map names no per-doc owner;
- row 2.9: a file this seat cannot edit.

A stricter author would have made O-3 a `MISSING → orchestrator` row that stops 24.2's application. I did not, because the grant is a precondition on the edit rather than evidence for a criterion. A claims reader may weigh that line differently.

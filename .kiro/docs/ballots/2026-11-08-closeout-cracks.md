# Ballot Measure: the CLOSEOUT cracks — a harness run on every push to `main`, ticks that match their docs, a PR-time list of the records a merge fires, and the header lines checked against their grammars

**Date**: 2026-11-08 (drafted from 2026-11-08T17:14:59Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `completion-criteria-parity`, `scripts/owed-set.sh`, `scripts/issues-owned.sh`, `scripts/harness/stability.ts` and `compare.ts`; holder of the CI regime's standing test-lane scope)
**Status**: **Items 1 and 3 RATIFIED (Peter, 2026-11-08T20:36:57Z), with F-1 (a), F-2 (a) and F-6 (a). Items 2 and 4 remain DRAFT, with F-3, F-4 and F-5.**
- **Peter's words, verbatim**:
  - 2026-11-08T19:40:29Z: "Ask Thurgood and Stacy to workout any disagreements on F-1, F-2, and/or F-6 and go with their collective recommendations, please". The joint pick is in § 10, `[STACY R3]` and `[THURGOOD R4]`.
  - 2026-11-08T20:36:57Z: "Ratified". This answered the orchestrator's question: "Do you ratify items 1 and 3, with F-1 (a), F-2 (a) and F-6 (a)? Items 2 and 4 stay in draft regardless."
- **The record**: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ratifies-cracks-ballot-items-1-3.md` (`f8fb986d9`), recorded with `date -u` at receipt.
- **What is ratified**: items 1 and 3, their edit sites (1.1–1.4, 3.1–3.4) and § 5 steps 1, 3a, 5 and 6, as they stand at `d68460752`. The `**Amends**:` header is not ratified as a whole; it lists every item's files.
- **What is held**: items 2 and 4, their sites, § 5 steps 2, 3b and 4, and forks F-3, F-4 and F-5. They are DRAFT until parity's census mode exists and their census lines are re-run in the first form at the base of a later ratification (`[STACY R2]` § 3 (iii); B-6).
- **Item 3's warn-only half shipped before ratification**, as #803 (merged `4704b4949`, 2026-11-08T19:40:26Z) under grant #798. Item 3 (d)'s cycle starts at `4704b4949`. § 5 step 6's pre-merge head `0d62b341f` is superseded by that SHA.
- **Record-first**: this commit is the record, made before any ratified site is applied. *(Prior text at `d68460752`: "**DRAFT** — not ratified. … Ratifiable now: items 1 and 3 … Held DRAFT: items 2 and 4 …")*
**Owner**: Thurgood. Stacy owns the text of her own charter's edit site (§ 4, site 2.7) and of the register row she owns (site 4.5).
**Required reviewer**: **Stacy** — mandate: attack the width, and the false-fire and false-emission arithmetic. She is the census reader, and she specifies the owed-set script's falsification cases (my charter, LIVENESS). Her ARMING read fires on item 1 (its workflow grant and `stability.ts`), item 3's workflow grant, and item 4's parity change. It does **not** fire on item 3's script or item 2 (d)'s owed-set change, because `scripts/issues-owned.sh` and `scripts/owed-set.sh` are not on her instrument-path list (`[STACY R1]` A-6).
**Consulted seats**:
- **Data** and **Kenya** — item 1, consulted in round 1 (§ 6, Q1–Q4). Their answers were relayed by the orchestrator and are recorded in § 10 as a relayed summary, not as their words. Neither changes its lane rules. On F-1, Kenya leans (a) and Data leans (b). Both say no to F-2.
- **Ada** — items 2 and 3, where they touch her (§ 6, Q5–Q6): consulted, relayed by the orchestrator. Her answer is in § 10 ("Round 2 — Ada consulted"). Q5's first half is answered by the record: #795 ticked Task 15.
- The consults that preceded Peter's ruling (mine and Stacy's, summarised in the ruling record's § "The exchange") are the source of items 1 (a), 2, 3 and 4. They are not a consult on this text.
**Consulted**: Data — item 1: no lane-rule change; routed reds carry run ID, image version and observed toolchain values; cache keys exclude `github.event_name`; F-1 (b), F-2 no; Kenya — item 1: no lane-rule change; a routed red opens a record; F-1 (a), F-2 no; Stacy — required reviewer: R1 object, R2 B-1–B-5 met, B-6 stands, items 1 and 3 may go first; Ada — item 3: `--pr 774` at `c8fd9640d` lists the dual-instance record `fires-here`, so CP-3 would have been caught at U5; no misfires seen (`release:` and `manual` records not run); F-3 (a), F-5 (a), F-6 (a).
**Unit**: a standalone record-first ballot on `main`. It names edits to `governance/**`, `.kiro/hooks/RELEASE-FLOW.md` and two charters, so **Peter merges it** under the governance carve-out. Application follows ratification, in the PRs of § 5.
**Class**: LAW. Items 2–4 add verdicts and emissions to instruments and change what law text says they do; item 1 assigns a standing read to a seat.
**Amends**: ballot `2026-11-07-native-lane-ownership` § 2 L68 (ledger line); `governance/completion-documentation-guide.md` (§ "The forced-negative line", § "The instrument's honest reach"); `governance/classification-map.md` rows `completion-criteria-parity`, `issues-obligation-lapse`, `parent-instrument-existence`; `.kiro/hooks/RELEASE-FLOW.md` L87; `.kiro/issues/README.md` rule 6; `canonical/agents/thurgood.md` (LIVENESS, the owed-set paragraph); `canonical/agents/stacy.md` and `canonical/profiles/consumer/stacy.overlay.md` (the owed-set `open` class, Stacy's seat); `.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md` (a new section).
**Base**: `main` at `bf4cd7677`. Every before-text below is quoted from that tree. The CLOSEOUT record is read at `origin/chore/129-closeout-claims-pass` `a91717278`. `main` has since taken #791 (`693b39b54`, that record) and #796 (`929972713`, Lina's re-rule of two records #791 fired). Neither touches a before-text quoted here. Item 3 cites both.
**Authority to draft**: Peter, 2026-11-08T17:02:40Z, "Re: 1, Yes, please / Re: 2, Yes, please", recorded at receipt in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-cracks-ballot-and-routing.md` (`e0f330057`, joined into this branch).

> **Conflict of interest, stated first.** Every instrument this ballot changes is mine: parity, the owed-set script, `issues-owned.sh`, `stability.ts`. Item 1 also names me as the reader. A steward who proposes more instruments for himself to own, and a standing read for himself to perform, has the incentive the anti-rot clause exists for. The checks below are: each item states what it would have caught in Spec 129 by citing Stacy's findings, never mine; each item states its false-fire or false-emission count before it can fail anything (items 3 and 4 are warn-only); and the one item that fails a PR at once (item 2's red) is the narrowest, with its census owed before it leaves DRAFT.

---

## 1. Authority (Peter's words, verbatim)

From the ruling record (`e0f330057`), put to Peter after the orchestrator consulted Thurgood and Stacy:

> - **1 (a)**: run `native-harness` on every push to `main`, with a named reader. This needs a small ballot, a grant for the workflow, and a `stability.ts` change, with Data and Kenya consulted.
> - **1 (b)**: require PR branches to be up to date before merge. This is a branch-protection setting, and Peter's.
> - **2**: parity goes red when a parent's completion doc exists but its box is unticked. The owed-set uses the same key. This is a ballot, and Thurgood's.
> - **3**: a PR-time check that lists the records the diff fires, warn-only for one cycle.
> - **4**: Thurgood's header-format check, S-3.

Peter, **2026-11-08T17:02:40Z**: **"Re: 1, Yes, please / Re: 2, Yes, please"**.

What was ruled, as the record reads it: Thurgood drafts one ballot carrying 1 (a), 2, 3 (warn-only first) and 4; Stacy reviews; Data and Kenya are consulted on the harness trigger; Ada where the owed-set and records touch her. **(b) is Peter's to apply; his toggle is the act** (§ 3, item 1, "Peter's act"). This ballot does not change repository settings and does not ask an agent to.

---

## 2. The gap — four cracks the CLOSEOUT exposed

Every finding cited here is Stacy's, from `completion/claims-pass.md` (#791) and `completion/claims-pass-midpoint.md` (#733). Her own S-lines name each class and leave its remedy to me.

| Crack | What happened in 129 | Her S-line | The instrument that could not see it |
|---|---|---|---|
| **A. The shipped tree was never measured** | U12's branch did not carry #784–#786, so `a17cb2b34` was "a tree no PR head carried". No harness run measured it until a dispatch after the pass asked (CP-6) | S-1 | `native-harness.yml` runs on `pull_request` and `workflow_dispatch` only (L33–40) |
| **B. An unticked box hides a finished parent** | Task 15's doc said every row ✅; its box stayed `- [ ]`. Parity printed "not evaluated"; the owed-set printed `open`, hiding the CLOSEOUT owe (CP-1). Task 14's Unmet list named a row marked ✅ (CP-4) | S-2 | Parity and the owed-set both read the checkbox as the claim |
| **C. Records fire at merges, and nobody sees them fire** | Five lapses in 129: the dual-instance record at U5 (CP-3), the staleness record at U8 (CP-14), Kenya's erratum at its own carrying merge and the probe defect at U12 (CP-12), and two of Stacy's standing ARMING records (CLOSEOUT SF-1); MIDPOINT's MP-3 and SF-1 are the same shape at U1 | (MP S-5; CP-3 "same shape as MP-3") | `issues-owned.sh` prints `FIRED@<sha>` only at a seat's next session start, after the merge, when rule 11 has already counted the lapse |
| **D. Published grammars that nothing runs** | Instruments lines 14/20 parse; CI-provenance lines 12/22 (CP-9, CP-10; MIDPOINT MP-8, and her self-correction on provenance) | S-3 | The guide prints both regexes (L180, L246); no check calls them |

**Why one ballot.** The four share one cause: a fact the record states (a tree shipped, a parent finished, a record fired, a line is malformed) is decidable from git at the moment of the merge, and is read only later, by a person, if at all. Items 1–4 move each read to the merge, or to the push that follows it.

---

## 3. The items

### Item 1 — `native-harness` runs on every push to `main`, and a named reader acts on a red

**The rule.**
- (a) `native-harness.yml` runs on `push` to `main`, as well as on `pull_request` and `workflow_dispatch`. A push run's jobs are named `<context> (main)`, so a push run never reports under a required context name. Push runs share one concurrency group without cancelling a run in progress, so a burst of merges is measured at least at its newest squash, and every squash that ships is contained in a measured tree. No cache key reads `github.event_name` (`[DATA]`): the one keyed cache, Gradle's (L320), is keyed on `runner.os` and three files, and stays so, so a push run on `main` writes a cache the PR runs restore.
- (b) A push run counts toward neither Decision 6 condition 2 nor condition 3 (as a dispatched run does today). `stability.ts` reports push runs separately from dispatched runs and lists each red push run. A red push run is not a new demotion trigger; where it is an infra fault, Decision 6 step 6's existing trigger (b) reads it.
- (c) **The reader is Thurgood.** The read, its cadence, and what the reader does on a red are written into the demotion-read charter record (site 1.4), which is already Thurgood's standing harness read and is re-homed with it.
- (d) The native-lane-ownership ballot's statement that "the workflow cannot show a red on `main` by itself" is amended by a ledger line (site 1.3). The reference runs that ballot's P1, C1 and C3, and Ada's item 5, rest on stay `workflow_dispatch` runs unless F-1 (b) is ruled.

**Reader — my position on the brief's proposal.** I agree that the reader should be me. I own the comparator and the stability script that read the run, and I already read every promoted context for demotion. A red needs triage before it is anyone's repair: infra, environment, a fired tag, or a tree regression. Each class has an owner, and the triage step routes it there. The lane owners (Data, Kenya) repair an environment red. A record's owner closes or re-rules a fired tag (`[STACY R1]` B-5). Ada or the PR author fixes a tree regression. Data and Kenya did not ask to be readers for their platforms (Q3). **This is not a fork.** The residual is in § 8: I read only when a session opens in my seat.

**What the reader does on a red** (site 1.4, the text):
1. **Same session**: read each failed job's `harness-verdict` and `harness-infra` annotations (they outlive the logs).
2. **Classify**:
   - *infra* (`harness-infra`, no verdict): re-run the failed jobs once (`gh run rerun <id> --failed`). Green → one log line, nothing filed. Infra again → read it as *environment*.
   - *environment* (a toolchain-field mismatch, or the same red on a dispatch at the last green push run's head, with `git diff --quiet <that head> <red head> -- harness scripts/harness .github/workflows/native-harness.yml` exiting 0): route to the lane owner, Data (Android) or Kenya (iOS), under their standing repair scope.
   - *tag* (a `FAIL tag:` verdict line; `compare.ts`'s tag rules, which on a push run read the head's own first-parent history, L1141–1143): a list entry is tagged to a root record that has fired and is still open, or that is closed. Route to **the tagged record's owner(s)**, who close or re-rule it (rule 9). Where the entry itself should move to another record, route also to the lane owner whose list holds it. Never to the squash's author, who may not touch the record (`[STACY R1]` B-5; #791 → #796 is this class).
   - *tree regression* (anything else): find the first red squash between the last green push run's head and the red head (dispatch the squashes the concurrency group skipped), and route to that squash's PR author (its `Agent:` line) and to the owner of the failing entry's domain.
3. **Open a record for every routed red** under rule 10, in the same session, Owner the routed seat and filed by Thurgood, so that the owner sees it at session start through `issues-owned.sh` (`[KENYA]`: she reads only at session start). For a *tag* red, the record is a dated line appended to the tagged record (any seat may append; rule 9), not a new file. The record or line carries the run ID and URL, the red head SHA, the failing context, the runner image (`ImageOS` and `ImageVersion` from the job's "Set up job" log), and, for an environment red, the observed toolchain values the comparator printed against the pinned ones (`[DATA]`). Class **P1 consumer-blocking** when a tier that compiled stops compiling (a release carrying it ships it), else **P2 (guard)**. Trigger `release:next:phase-1`, or `merge:#<N>` once a fix PR exists, so the release walk reads it as a floor-class row.
4. **Tell Peter in that session** when the red context is in `EXPECTED_CONTEXTS`: every PR's merge ref now carries the break.
5. **Never** move an expected list, a pin or the protected set to turn a red green. Those acts are the lane owners' and Ada's, under their own scopes.

**Peter's act (b), recorded, not applied.** GitHub's branch-protection setting "Require branches to be up to date before merging" on `main` would have stopped U12 merging without #784–#786 in its tree (CP-6), because the PR's checks would have re-run on an updated branch. It is Peter's setting (Settings → Branches), like branch protection and squash-only (Task-Completion-Protocol § "Branch Cleanup"). **This ballot makes no edit for it.** If Peter applies it, the application record (§ 5, step 7) carries his words and the time of his toggle; until he does, item 1 is detection only. With (b) on, item 1 still matters: a break from outside the repository (a runner image's JDK or Xcode) shows on the next push without any PR being stale.

**Edit sites.**

*Site 1.1 — `.github/workflows/native-harness.yml`, through issue-row grant G-1* (filed at application, § 5 step 1; Owner Thurgood; **Consulted** Data, Kenya; `**Grant paths**: .github/workflows/native-harness.yml`; the activating PR carries `**ARMING**: at this merge and at the fixing PR's merge`).
- `on:` (L33–35). Before:
  ```
  on:
    pull_request:
    workflow_dispatch:
  ```
  After:
  ```
  on:
    pull_request:
    push:
      branches: [main]
    workflow_dispatch:
  ```
- A workflow-level `concurrency:` key after `permissions:` (L42–43), new:
  ```
  concurrency:
    group: ${{ github.event_name == 'push' && 'native-harness-push-main' || format('native-harness-{0}', github.run_id) }}
    cancel-in-progress: false
  ```
  Only push runs share the group; every other run has its own. GitHub keeps one running and one pending run per group, so in a burst the pending squash is replaced by the newest one, never the running one.
- The five job `name:` lines (L49, L129, L196, L267, L406). Before, for `harness-generate` (the others alike):
  `name: ${{ github.event_name == 'workflow_dispatch' && 'harness-generate (unit-branch)' || 'harness-generate' }}`
  After:
  `name: ${{ github.event_name == 'workflow_dispatch' && 'harness-generate (unit-branch)' || github.event_name == 'push' && 'harness-generate (main)' || 'harness-generate' }}`
  `deriveJobContext` (`tools/agent-generator/coverage-map.ts` L732) takes the last `|| '<X>'` fallback, so the context it derives is unchanged.
- The header comment (L15–16, L28–29). Three sentences change, and one is kept:
  - L15, the trigger sentence, gains push and the `(main)` suffix.
  - L16, "A dispatched run has no merge base, so its comparator runs `--no-base`", becomes "A dispatched or push run is not a pull request, so its comparator runs `--no-base`" (`[STACY R1]` A-5).
  - L28, "Not a required context. It is in neither EXPECTED_CONTEXTS …", is false at `bf4cd7677`: `harness-android-tokens` is in `EXPECTED_CONTEXTS` since #717 (`verify-gate-registration.sh` L95). It is corrected.
  - "No `if:` in this file reads github.event_name" stays true and is kept.
- Unchanged: the comparator's `--base` choice (L174, L241, L339, L475) already sends every non-`pull_request` run to `--no-base`, so a push run checks the compiles and the expected list, and does not re-check additions or retags, which the PR read.
- **`git diff --numstat` deletions**: the five `name:` lines and the header-comment lines the hunk rewrites; the `on:` block and `concurrency:` are insertions only. Each deleted line is quoted in G-1's `**Deleted lines**:` block (`.kiro/issues/README.md` rule 8).

*Site 1.2 — `scripts/harness/stability.ts` and `scripts/harness/__tests__/stability.test.ts`* (my standing scope; ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` item 1). Merges **before** site 1.1: at `bf4cd7677`, `contextOf` (L178–180) strips only ` (unit-branch)`, so a `(main)` job would be dropped silently.
- `contextOf`: strip ` (unit-branch)` or ` (main)`.
- `ContextAnalysis` gains `pushRuns`; `dispatchedRuns` counts `workflow_dispatch` only (L536 today counts every non-PR run).
- The report line (L592) becomes `Runs recorded: N (p pull-request, d dispatched, q push).` and each context gains `- Push runs on main: q; red: <run id> @ <sha> (<verdict or infra>), …` (or `none`).
- The runs table (L621) prints `no (<event>)` for an excluded run, not `no (dispatched)`, so a push run reads as a push run there too (`[STACY R1]` A-4).
- The "Rules applied" sentence (L587) adds: "A push run on `main` counts toward neither condition 2 nor condition 3; red push runs are listed for the reader (ballot 2026-11-08-closeout-cracks item 1)."
- Falsification cases, each red against the base code: a job named `harness-ios-tokens (main)` with `event: push` is attributed to its context and counted as a push run, not dropped and not counted as dispatched; a red push run is listed; a push run never enters condition 2's streak.
- Owed reviews: none under the charter-scope ballot (no change to how iOS queue time, the Xcode pin, condition 3's iOS rule or condition 5 is computed). Kenya and Data are consulted under item 1 anyway, because the `(main)` jobs share their runners.

*Site 1.3 — ballot `2026-11-07-native-lane-ownership` § 2, a ledger line after L68.* L68 stays as ruled. After it:
> *Amended 2026-11-xx by ballot 2026-11-08-closeout-cracks item 1 (ledger line; the sentence above is kept as ruled): from that item's application, `native-harness.yml` also runs on `push` to `main`, so a break that a merge brings shows on `main` at that merge, or, in a burst of merges, at the newest squash of the burst. A break from outside the repository with no merge still shows first on whichever PR, push or dispatch runs next. The reference runs of P1, C1 and C3 and of item 5 remain `workflow_dispatch` runs; a push run is not one.* [Under F-1 (b), the last sentence is replaced by F-1 (b)'s text.]

*Site 1.4 — `.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md`, a new section `## The push-run read` after § "Where each read is recorded".* Owners Thurgood and Stacy (rule 9); I write it, Stacy reviews. Text: the reader rule above (items 1–5 of "What the reader does on a red"), plus:
- **When**: at every session start in my seat (this record's Trigger is `manual`, so `./scripts/issues-owned.sh Thurgood` prints it every session), at every monthly walk and every release S beside the demotion read, and whenever a seat or Peter reports a red push run.
- **The query**: `gh run list --workflow native-harness.yml --event push --branch main -L 5 --json databaseId,headSha,conclusion,status,createdAt`.
- **The log**: one dated line per red read, `<date> run <id> @ <sha> — <infra|environment|tag|tree> — <record filed or line appended, or re-run green>`, appended under the section.
- **Honest reach**: between my sessions nothing reads a red but Peter's own GitHub notification for the push his merge made (GitHub notifies the actor of a failed run they triggered; that this reaches Peter depends on his notification settings, unverified).

**Cost.**
- **Runner time**: one harness run per merge. Measured on 2026-11-08: a run takes 3–4 minutes of wall time (runs 42502208361 and 42502210216: `harness-generate` 80 s, then four contexts in parallel, 79–161 s). `main` took 181 first-parent commits from 2026-11-01 to `bf4cd7677`, about 23 a day. The repository is public, so standard runners cost no money.
- **Queue contention, the real cost**: each push run holds two macOS jobs. In a burst of merges, push runs queue against PR runs for the same macOS concurrency. That lengthens PR queue time, which is what Decision 6 condition 5 measures for iOS promotion. The concurrency group caps push runs at one running and one pending; how much this moves condition 5 is a question for Kenya (Q2), not measured.
- **Authoring**: G-1's record and one workflow PR; the `stability.ts` PR with three cases; the ledger line; the record section. About one working session.
- **Reading**: each red costs a triage session; a green costs nothing.

**What it would have caught in Spec 129.** **CP-6**: the push run at `a17cb2b34` (16:21:37Z) would have measured the shipped tree half an hour before Stacy's pass asked for the dispatch (runs 42502208361 and 42502210216, 16:53Z). It would also have measured `c91fb9b15` (#785), `7689dd804` and `5ec03fe25` at their own merges; CP-6 names those three as never measured with U12. It catches nothing else in 129's findings: every other harness red in the window showed on a PR first. The one red a push run would have shown on `main` is the #791 tag red. At `693b39b54` it would have gone red at #791's merge, at the same moment as the open PRs, not before them, and under the folded reader it routes to Lina, the tagged record's owner (`[STACY R1]` B-5).

**Census.**
- `**Census**: not in scope — stability.ts and compare.ts — named in no register row's checks (git grep -n -F stability.ts governance/classification-map.md @ bf4cd7677 → 0 hits); Decision 6 is the rule text it follows, and this item changes no condition`
- `**Census**: not in scope — verify-gate-registration.sh and audit:coverage-map — no context name changes: deriveJobContext keeps the last || '<X>' fallback (coverage-map.ts L732); EXPECTED_CONTEXTS unchanged`

**Surviving counter.** **The push run tells us little that the next PR's run would not.** When `main` is broken, every later PR's merge ref carries the break, so the next harness run on any PR goes red anyway. What the push run adds is narrower than it looks: attribution to the squash that broke it, a measurement of the last tree before a release (CP-6's exact case), and a red that no PR author has to debug as their own. It does **not** catch an outside break between merges; F-2 (a schedule) does. If merges are rare in a stretch, the push trigger is nearly idle and the schedule is what would help. Fold-back took in the concurrency group (so a burst cannot flood the macOS queue) and the `(main)` suffix (so a push run never wears a gate name). It could not absorb the residual: on a quiet `main`, item 1 adds almost nothing, and on a busy one it competes with PR runs for macOS time.

---

### Item 2 — parity goes red when a parent's completion doc exists but its box is unticked; the owed-set uses the same key; the Unmet list may not name a met row

**The rule.**
- (a) **Parity red.** In a per-parent spec, a parent whose box is unticked (`- [ ]`) while its completion doc exists at the scanned tree is a red. "Its completion doc" is any file parity's own locator reads as the parent's doc (`completionDocPattern`, `completion-doc.ts`: `task-<N>` with an optional letter and letter-led suffix segments, so `task-<N>-completion.md`, `task-<N>-parent-completion.md` (125-B's naming) and `task-<N>-<seat>-completion.md` all count; `[STACY R1]` A-2). The red reads: `UNTICKED_WITH_COMPLETION_DOC — parent <N>: its completion doc exists and its box is unticked; tick it, or remove the doc`. A poisoned parent stays excluded (its malformation is already red). The informational unticked line counts only parents with no doc.
- (b) **Subtask docs.** A parent whose box is unticked while one of its subtask docs (`task-<N>-<M>-completion.md`, with an optional letter-led `-<seat>` suffix) exists, and its own doc does not, is **an emission** (`unticked-with-subtask-docs`), not a red. [F-3 decides this; the brief reads "(or its subtask docs)" as red.]
- (c) **Stacy's companion: the Unmet list names no met row.** From application, each item of the forced-negative list names its row in a fixed form: the item begins `criterion <n>`, with `<n>` the row's 1-based position in the doc's criteria table. Parity emits `unmet-names-met-row — parent <N>: criterion <n> is listed as unmet and its Status is ✅` when such an item names a ✅ row. An item that does not begin `criterion <n>`, in a doc added after application, emits `unmet-item-unnamed`. Docs added before application are read only for the first emission.
- (d) **The owed-set's `open` class uses the same key, and the adoption leg is kept** (`[STACY R1]` B-1).
  - **The claim.** An unticked parent with its own doc (as (a) reads it), or with a subtask doc, is **doc-claimed**. Its claiming commit is the first-parent commit that added its newest such doc.
  - **The class.** A spec with any unticked parent that is not doc-claimed stays `open`, with `N of M` as today. A spec whose every unticked parent is doc-claimed is classed by the existing rules, with each doc-claimed parent read as if it were ticked at its claiming commit:
    - its closing commit is the newest of those claiming commits and the commit that ticked the last ticked parent;
    - the `touch-only` test then applies to that closing commit unchanged: a closing commit before adoption, with no `completion/task-*` file added after adoption, prints `touch-only`;
    - otherwise the spec prints `candidate`.
  - **The reason.** A candidate's reason keeps what the class rules already print, the unit class `a|b|c` and the anchor `<sha> <date>`, and adds `<k> unticked parent(s) claimed by their own doc: <ids>` or `… claimed by subtask docs only: <ids>`. The two claims are different evidence, and the read Stacy owes is different (OS-4).
  - **The instances.** At `35cb08f43`, 046 and 101 print `touch-only` (newest docs `c6d6d4be8`, 2026-02-06, and `947c7fef1`, 2026-05-06; nothing added under `completion/` since adoption), not `candidate`.
- (e) **[Author's addition — Peter rules, F-5.]** The same key in the other direction, **diff-scoped** (`[STACY R1]` A-1): a subtask that the PR's diff ticks (a `- [x]` subtask line the diff adds) with no subtask doc at the head is an emission, `ticked-subtask-without-doc`. A doc with a letter-led `-<seat>` suffix (123's `task-11-2-lina-completion.md`) counts as the doc. Standing ticks are not read, so the 16 standing instances at `35cb08f43` (14 in 127, 2 in 123) emit nothing. This is the S-4 floor (Task-Completion-Protocol, subtask step 2) that Stacy counts by hand (CLOSEOUT CP-7: 62/66).

**Why (c) has a form, and is not keyed on the existing text.** I ran the obvious key first: any `row <n>`, `criterion <n>` or `C<n>` token in the Unmet line and the list under it, against that row's Status. Over the 54 parent docs with a criteria table at `bf4cd7677` it gives **20 emissions, and 1 of them is true** (CP-4, Task 14 row 15). The others name the spec's own row numbers ("row 15's record"), historical notes ("row 10 was ⚠️ … and is now ✅"), or criteria inside a `None.` line. With `criterion <n>` and `C<n>` only, it gives 9 emissions and **misses CP-4**, which writes "Row 15". A free-text key is noise or blind. The form makes it decidable, and binds forward. (Scripts and output: § Census appendix.)

**Edit sites.**
- *Site 2.1 — `scripts/completion-claims/verdict.ts`* (`evaluateSpec`, L365–376; `formatUntickedLine`, L397–400), `completion-doc.ts` (the forced-negative capture, L282–291, reads the line and the `- ` list items under it up to the first blank line or heading; a subtask-doc locator), and `scripts/check-completion-criteria-parity.ts` (the new finding and emissions in its output). Fixtures under `scripts/completion-claims/__fixtures__/` and cases in `__tests__/`, each red against the base: the unticked-with-doc red; the subtask-doc emission; the Unmet emissions; the poisoned parent still excluded.
- *Site 2.2 — `scripts/owed-set.sh`* (L213–218, the `open` branch, and the closing-commit read) and `scripts/__tests__/owed-set.test.ts`. The cases are Stacy's (my charter, LIVENESS; `[STACY R1]` § 3), OS-1 to OS-7, as written there:
  - OS-1: a candidate from a parent's own doc;
  - OS-2: `touch-only` before adoption (the 046 and 101 shapes);
  - OS-3: `open` with one parent that has no doc;
  - OS-4: a candidate claimed by subtask docs only;
  - OS-5: a `task-<N>-parent-completion.md` doc. This ballot rules it a doc, as parity's locator reads it.
  - OS-6: the count line's row-sum identity;
  - OS-7: `closed` wins.

  The shell matches the locator's two regexes. A case in the test asserts that the two agree, so that the owed-set and parity cannot read a doc differently.
- *Site 2.3 — `governance/completion-documentation-guide.md` § "The forced-negative line", L151.* Before:
  > — or a list, **each item carrying a follow-up link**. **Silence does not satisfy it.** (The shape is imported from the Product-Handoff-Protocol's four `None / or list each` forced-negative sections; the line itself is new here.)

  After:
  > — or a list, **each item carrying a follow-up link**. **Silence does not satisfy it.** Each item begins `criterion <n>`, where `<n>` is the row's 1-based position in this doc's criteria table, and names a row whose Status is ⚠️ or ❌. A row that is now met is not listed; its history goes in its Evidence cell or under § "Errata to a completion doc". (The shape is imported from the Product-Handoff-Protocol's four `None / or list each` forced-negative sections; the line itself is new here.) *(amended 2026-11-xx by ballot 2026-11-08-closeout-cracks item 2 (c); prior text at `bf4cd7677`)*
- *Site 2.4 — the same guide, § "The instrument's honest reach" (L369 onward)*, one added sentence: "Parity reads a box against its doc in both directions: an unticked parent whose doc exists is red, an unticked parent with only subtask docs and a ticked subtask with no doc are emissions; the tick is still an assertion, and parity never reads whether the parent's work is done. *(added 2026-11-xx by ballot 2026-11-08-closeout-cracks item 2)*"
- *Site 2.5 — `governance/classification-map.md` row `completion-criteria-parity`*: the `rule` line gains ", and a per-parent parent whose completion doc exists SHALL be ticked"; one `history` line naming this ballot, the red, the three emissions, and the binding. `check_state` stays `armed`. The B-9 scope (emissions on parity's own surface) is widened by the same line to the tick-against-doc and Unmet reads.
- *Site 2.6 — `.kiro/hooks/RELEASE-FLOW.md` L87.* Before:
  > - `open` — at least one unticked parent (`- [ ]` at column 0); the reason gives `N of M` and says a checkbox is an assertion, not a merge fact.

  After:
  > - `open` — at least one unticked parent (`- [ ]` at column 0) with no completion doc and no subtask doc; the reason gives `N of M` and says a checkbox is an assertion, not a merge fact. An unticked parent with a doc is read as ticked when its newest doc was added, and the spec is then classed `candidate` or `touch-only` by the rules below, with the reason naming the parent and whether its own doc or only subtask docs claim it. *(amended 2026-11-xx by ballot 2026-11-08-closeout-cracks item 2 (d); prior text at `bf4cd7677`)*
- *Site 2.7 — `canonical/agents/stacy.md` L445 and `canonical/profiles/consumer/stacy.overlay.md` L112* — the `open` class, before `` `open` (at least one unticked parent; `` — **Stacy's seat, her text**, to the same meaning as site 2.6.
- *Site 2.8 — `canonical/agents/thurgood.md` L560*, before: `` `open` (an unticked parent, `- [ ]` at column 0 — a checkbox is an assertion, not a merge fact, and the reason says so); `` After: `` `open` (an unticked parent, `- [ ]` at column 0, with no completion doc and no subtask doc — a checkbox is an assertion, not a merge fact, and the reason says so; an unticked parent with a doc is read as ticked when its newest doc was added, so its spec is a `candidate` or `touch-only`, and the reason names the parent and its claim); ``. Sites 2.7 and 2.8 regenerate the rendered surfaces (`npm run build:generator`), refresh `canonical/generated.lock`, and need each affected seat's re-confirmation and re-signature (the signing chain; the P1b precedent, #427).

**Cost.**
- **Authoring**: parity change with four fixture cases, the owed-set change with Stacy's cases, five law sites, and two charter sites with their regeneration and signing acts. The charter sites are the expensive part: about one session for the code, and one more for the signing chain across Thurgood's and Stacy's surfaces.
- **On every PR**: a red adds a fix-the-box step. At `bf4cd7677` the red fired on exactly one parent in the repository (129 Task 15). #795 ticked it, so at `35cb08f43` it fires on **none**, and § 5 step 2's precondition is met.
- **On the claims passes**: at `35cb08f43`, (d) moves 046 and 101 from `open` to `touch-only`, and prints **no** new candidate. 102 and 125-B stay `open`. At `bf4cd7677` it would have moved 129 to `candidate`, which is CP-1's hidden owe. A future candidate costs Stacy one read; that is the asymmetry her charter already accepts ("a wrong exclusion hides an owe").

**What it would have caught in Spec 129.**
- **CP-1**: (a) reds #777's PR gate, because `task-15-completion.md` was on the branch and the box was not. Ada ticks it before the merge; parity evaluates parent 15 (54/54, as Stacy's scratch copy shows). (d) makes the owed-set print 129 as `candidate` after U12's merge instead of `open`, which is the hidden owe CP-1 names: parent 15's claiming commit (#777, 2026-11-08) is after adoption.
- **CP-4**: (c) catches it only under the new form. Under 129's actual text ("Row 15, last clause"), no decidable key both catches it and stays quiet (above).
- **CP-7** (four ticked subtasks without docs, 18.1, 18.2, 18.4, 20.2): (e) emits all four on the PRs that ticked them (#781 and #747), if F-5 adds it. It would not catch CP-7's second half (18.4 ticked while its parent row read ⚠️); that is S-4, which this ballot leaves alone (§ 9).

**Census.**
- `**Census**: owed — completion-criteria-parity (scripts/check-completion-criteria-parity.ts, scripts/completion-claims/**) — the instrument has no census mode at bf4cd7677 and its row carries no census field; under ballot 2026-10-19-instrument-census-at-draft § 4 I build it (a per-file sha256 of the canonical surface plus the verdict, from --verify-extraction) as EXECUTION in my scope, and this item does not leave DRAFT until the census line is re-run in the first form. Heuristic hand count, re-run at 35cb08f43: 0 parents in 3 per-parent specs change verdict (129 parent 15 was the one at bf4cd7677, and #795 ticked it); 0 subtask-doc emissions; (c) and (e) are bound forward or diff-scoped and fire on 0 docs at application (16 standing ticked subtasks without a doc are not read)`
- `**Census**: not in scope — owed-set.sh — named in no register row's checks (git grep -n -F owed-set governance/classification-map.md @ bf4cd7677 → 1 hit, L1162, a history line naming stacy#frontmatter:commands[owed-set], not a checks entry); heuristic at 35cb08f43: 2 of 4 open specs (046, 101) become touch-only, 0 become candidates`
- `**Census**: not in scope — 122-diff-guard, canonical-vs-truth, the sweeps and verify-signing-chain — sites 2.7 and 2.8 are their ordinary inputs, regenerated, lock-refreshed and re-signed at application`
- *This draft's first census line is not in any of the README's three forms.* That is a defect of the draft, stated so the census reader does not have to find it: the census mode is owed before ratification can be asked for on this item.

**Surviving counter.** **A red on "doc exists, box unticked" makes the tick a chore an agent clears, not a claim it makes.** The box was never the fact; the merge is. Parity now forces the box and the doc to agree, and the cheapest way through a red is to tick the box, which is exactly what a parent that is *not* done would do to get green. The red moves the failure from "silently unevaluated" to "evaluated", which is better, and parity then checks every row; but it cannot tell a finished parent from a ticked one. Fold-back took in two things: (b) keeps subtask docs at emission, so a unit branch's checkpoint dispatches do not go red after every subtask; and (c) binds the Unmet form forward, so old docs do not light up. Stacy's B-1 took in the adoption leg, so a pre-adoption spec with a forgotten box is `touch-only`, not a candidate. What could not be absorbed: a post-adoption spec whose box was left unticked for a reason (a parent dropped, or split) becomes a candidate, and the row will ask Stacy to read it, every release, until someone ticks or rules it.

---

### Item 3 — a PR-time list of the records the merge fires (warn-only for one cycle)

**Its clearest case landed while this was drafted: #791 and #796.** #791, the CLOSEOUT pass (`693b39b54`), added `completion/claims-pass.md`. That path was the Trigger of five root records, the 129 charter and Lina's component-repair record among them. Nobody re-ruled them in #791, and both have harness entries tagged to them. So the harness tag check (`compare.ts`; Req 1.4: a tag is an open root record whose Trigger can fire) failed **every open PR**, `FAIL tag: … FIRED@693b39b54 and that is still open`, until Lina's re-rule merged as #796 (`929972713`). The PR mode built below, run on #791's own diff, lists all five, both of those two included. A lapse that rule 11 counts quietly became a red on every PR, which the next lapse of a tagged record will do again.

**The warn-only half is built outside this ballot.** Peter, relayed 2026-11-08: "Let's pursue that class fix if we aren't already." Listing fired records changes no rule, so its warn-only form needs no ballot. The script is in my standing scope; the CI step is a new non-required workflow, which is an issue-row grant (README rule 8; not one of M1's excluded acts). They are on two branches:
- `scripts/issues-owned.sh --pr` (site 3.1 below), with its cases; the #791 falsification case is red at base, which reads `--pr` as an unknown seat;
- the grant record `.kiro/issues/2026-11-08-fired-records-warn-workflow-grant.md`, on its own branch `chore/fired-records-warn-grant` (`d6b7df5af`), which carries `pr-records.yml`'s exact text (site 3.2 below). It merges first, so the grant list is in a merged record before the diff it bounds (rule 10); the workflow is then added to `chore/fired-records-warn-check`, the fixing PR.

**What stays in this ballot**: the law and register text that names the check (sites 3.3 and 3.4), the cycle's counts, and the later decision on a failing version, which is a required context and Peter's. Item 3 can be ratified on its own; nothing in it depends on items 1, 2 or 4.

**The rule.**
*(The text below states what `c8fd9640d` builds, read by read (`[STACY R1]` B-3). Where the built check reads less than rule 11 says, it says so.)*
- (a) On every pull request, a non-required check, `fired-records`, lists each root `.kiro/issues/` record whose Trigger fires at this PR's merge. It reads the records at the PR head, and also the base's root records that the head has moved to `archive/`. It matches as `issues-owned.sh`'s seat mode does:
  - a `path:` token (or list) whose glob matches a file in `git diff --name-only --no-renames <B> <m>`, where `B` is the merge base and `m` the head, with the same `:(glob)` pathspec (a rename is read as its old and new paths);
  - a `merge:#<N>` token whose `<N>` is the PR's own number (the brief's `merge:#this`).
- (b) **Each listed record** is printed with its owners and one state:
  - `fires-here`: it fires at this merge, it is still at the root at the head, and its `**Trigger**:` line is unchanged;
  - `closed-here`: it is at the root at the merge base and in `archive/` at the head. **The archive move is the only close the check reads.** A dated outcome line added in the diff is not read. Such a record prints `fires-here`, with the reason "this diff edits the record" when the diff touches the file.
  - `re-ruled-here`: a `**Trigger**:` line of the record changed in the diff. The record is read by its base token. **Rule 11's "dated reason and authority" is not read**; that stays the walk's and the pass's read.
  - `already-fired@<sha>`: a `path:` record whose fire, read the seat mode's way at the merge base, is at an earlier first-parent commit. This merge is not its event.
  - **A grant**: a `fires-here` grant carries the reason `grant`. Grants do not lapse (rule 11), and one still open after its fixing PR's merge is a walk finding (rule 5).
  - **A record added in this diff** fires here **only by `merge:#<N>`** (CP-12's erratum on #778). An added `path:` record does **not** fire at the merge that adds it, and is not listed, because the seat mode and `compare.ts` (`firedState`, L1180–1191; a record new at the head is ruled in the diff, L1153–1156) both bound a `path:` fire by the commit that last changed a Trigger line, and the adding merge is that commit (`[STACY R1]` B-2; #727). README rule 11 does not decide this case in words; F-6 asks Peter to let the rule say what the three instruments do.
- (c) **The annotations.** A `fires-here` line is a `::warning title=fired-records::` annotation, or a `::notice` when the diff edits the record (it may carry its own outcome line, which is not read): `<path> (<owners>) fires at this merge (<token>); under README rule 11 it lapses here unless this diff closes or re-rules it`. A grant's annotation instead says that a grant archives at its fixing PR's merge, and that one still open after it is a walk finding. The job also writes the list to its step summary. **It never fails** in the cycle: the script exits 0, and the step adds `|| true`.
- (d) **The cycle** runs from the check's merge through the first monthly walk at least 28 days after it. That walk's record carries three counts:
  - **listed**: `fires-here` lines on PRs that merged, **warnings and notices counted separately**;
  - **mechanical mismatches**: records listed (warning or notice) at a merged PR's last head that `issues-owned.sh` does not print `FIRED@<that squash>` for after the merge, plus records it does print `FIRED@<squash>` for that the check did not list (misses). Since `c8fd9640d` the two read an added `path:` record alike, so it is not a mismatch by construction;
  - **owner-disputed fires**: listed records whose owner writes, on the record, that the touch was not the event its prose names (MIDPOINT S-5's class; `merge-hold-promotion-reads` fired on #732).

  - **unavailable runs**: runs whose step summary carries an `issues-owned: unavailable` line, so that "0 listed" and "not run" stay apart. The step ends `|| true`, so such a run reads green (`[STACY R2]` A-7).

  **The false-fire count** is the mismatches plus the disputed fires.
- (e) **The later decision.** At that walk I offer Peter three options with the counts: **fail** (the check fails a PR with a `fires-here` line; it becomes a required context, which is an `EXPECTED_CONTEXTS` change and his branch-protection act), **keep warn-only**, or **retire**. Nothing in this ballot decides it.

**Edit sites.**
- *Site 3.1 — `scripts/issues-owned.sh`*, a PR mode: `--pr <N> --base <ref> --head <ref>` (**built**, `chore/fired-records-warn-check` @ `c8fd9640d`, standing scope). It does what (a)–(c) say and exits 0 always. Cases in `scripts/__tests__/issues-owned.test.ts` ("--pr (fired-records)", 11 cases, 43/43 with the seat mode's):
  - #791's shape;
  - an added `merge:#<own>` record that fires;
  - an added `path:` record that does not fire (B-2, red at `5bc58ec75`);
  - re-ruled; archived; edited; a list; already-fired; a grant;
  - the quiet cases; the annotations; fail-soft.
- *Site 3.2 — `.github/workflows/pr-records.yml`, new, through the grant record above, called G-2 here* (Owner Thurgood; `**Grant paths**: .github/workflows/pr-records.yml`; ARMING line on the activating PR). On `pull_request`, one job `fired-records` with `fetch-depth: 0` and `permissions: contents: read`. No `if:`, no `continue-on-error` (the script exits 0 by design). Not added to `EXPECTED_CONTEXTS` or `complete-task.sh`'s `REQUIRED_WORKFLOWS`. Item 4 (c)'s ARMING step is **not** in G-2. If F-4 keeps it, it needs a dated amendment to G-2 before its fixing PR, which adds a second step and `pull-requests: read`.
- *Site 3.3 — `.kiro/issues/README.md` rule 6*, one sentence after "The headline prints …": "Between walks, the `fired-records` check lists on each PR the records its merge fires, by rule 1's `path:` and `merge:#<N>` tokens with `<N>` the PR's own number, reading an archive move as a close and a changed Trigger line as a re-rule; it warns and never fails until Peter rules otherwise (ballot 2026-11-08-closeout-cracks item 3). The walk after its first cycle records its listed (warnings and notices apart), mismatch and disputed counts." Under F-6 (a), rule 11 also gains: "A record's adding commit is its first Trigger change: a `path:` record does not fire at the merge that adds it, and a `merge:#<N>` record fires at merge #<N> whenever it was added. An owner who means the adding PR to be the event writes `merge:#<N>`." (README edits cite their ballot inline; no pointer is owed.)
- *Site 3.4 — `governance/classification-map.md` row `issues-obligation-lapse`*: `checks` becomes `["fired-records (warn-only; .github/workflows/pr-records.yml -> bash scripts/issues-owned.sh --pr; non-required; ballot 2026-11-08-closeout-cracks item 3)"]`, `check_state` stays `proposed`, one `history` line.

**Cost.**
- **Authoring**: done for the script (`c8fd9640d`) and the grant record (`d6b7df5af`), one session; one workflow PR remains, after G-2's activating merge.
- **On every PR**: one Ubuntu job of under a minute (a full-history checkout, then a diff and a loop over about 80 root records), and a warning on the PRs that fire something.
- **On the walk**: the three counts, read from the annotations (which outlive the logs) and from `issues-owned.sh` after each merge. A query, not a recollection.

**What it would have caught in Spec 129.** From the PR mode at `c8fd9640d` replayed over every first-parent merge from `8d8ba1425` (#678) to `929972713` (#796), 106 merges (§ Census appendix C; it reads each squash against its parent, not each PR's last head against its merge base):
- **#791 → #796**: on #791, all five records keyed on `claims-pass.md`, the charter and Lina's repair record among them, which then failed the tag check on every open PR.
- **CP-3**: `fires-here` on #774 for `2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` (Ada).
- **CP-14**: `fires-here` on #757 for `2026-10-12-generate-staleness-decided-by-file-times.md` (Ada).
- **CP-12**: `fires-here` on #778 for `2026-11-08-kenya-u11-link7-erratum.md` (Kenya; added in that PR), and on #781 for `2026-11-08-probe-swift-providerreads-not-mainactor.md` (Kenya).
- **CLOSEOUT SF-1**: on #781 for `2026-10-20-in-lane-registry-arming-reads.md`, and on #740 for `2026-10-25-arming-read-class-option-fork.md` (Stacy). Its later touches (#756, #769, #779 and others) print `already-fired@<sha>`, not a fresh warning.
- **MIDPOINT SF-1**: on #708 for the same registry record.
- **MIDPOINT MP-3**: on #707 for the two records keyed on `task-5-completion.md`. `2026-11-06-complete-task-stages-untracked-paths-outside-parent.md` warns as a lapse. `2026-11-06-native-harness-dispatch-stub-grant.md` carries the reason `grant`, which is a rule-5 walk finding, not a lapse (Stacy's own correction of MP-3, `[STACY R1]` § 1).
- It would **not** have closed any of them: it warns the PR author and names the owner, who may not be the author. Whether a warning changes behaviour is what the cycle measures.

**Census.**
- `**Census**: exempt — (1) the instrument does not exist at bf4cd7677 (issues-obligation-lapse carries checks: []); ran: scripts/issues-owned.sh --pr @ c8fd9640d over the 106 first-parent merges 8d8ba1425^..929972713 (§ Census appendix C); count: heuristic at c8fd9640d, 27 fires-here lines on 14 of 106 merges, 20 warnings and 7 notices (appendix C)`
- `**Census**: not in scope — check-section-citations, 122-diff-guard — site 3.4 is an ordinary governance/ input; no citation is added`

**Surviving counter.** **A warning on the PR goes to the wrong seat.** The record's owner is often not the PR's author: the claims pass #791 fires five records owned by Ada, Lina, Kenya and Data, and Stacy writes the pass. Under rule 11, every one of them lapses at that merge unless the pass PR closes it, and rule 9 forbids Stacy to close another seat's record. So for one class of record — a `path:` trigger on a file another seat writes — the warning reports a lapse nobody could have prevented in that PR. That is a fault of rule 11 against cross-seat path triggers, not of the check, and it is outside this ballot (§ 9). But it means the `fail` option in (e) cannot be ruled on the counts alone: a failing check would block the claims pass for records it may not touch. Fold-back took in the `already-fired` state (so standing records do not re-warn on every touch), the added-record cases (a `merge:` record fires, a `path:` record does not, as the other two instruments read it), and the grant reason. What survives: the warning's audience and the record's owner are different people, and the check cannot fix that.

---

### Item 4 — S-3: the header lines checked against their published grammars (emission-only first)

**The rule.**
- (a) One module, `scripts/completion-claims/header-lines.ts`, holds the published grammars verbatim: the CI-provenance regex (`completion-documentation-guide.md` L180), the Instruments regex (L246), item 2 (c)'s Unmet item form, and the ARMING literal. A test asserts each regex string equals the guide's code span, so a guide change that the module does not follow goes red in the module's own test. Items 2 and 3 build on it: item 2's Unmet read and item 3's PR-body read use its parsers.
- (b) **Completion docs** — parity, diff-scoped against the merge base (as its declaration duties already are), reads each parent completion doc the PR adds or changes and emits:
  - `ci-provenance-missing` (no line) and `ci-provenance-malformed` (a line that does not match);
  - `instruments-line-malformed`; and, **only on a line the regex accepts**, the guide's decidable cross-checks: `instruments-count-mismatch` (N ≠ E + B + M, or the counts differ from the block's final-state rows, excluding `none` rows, which guide L226 says are not counted, and its dated `## Found later` entries) and `instruments-path-mismatch` (the path names another spec or parent). A rejected line gets only `-malformed` (`[STACY R1]` A-3).

  **Emissions only** in the cycle (F-4).
- (c) **The ARMING line — recommended dropped (F-4 (c)).** The draft keyed it on the PR whose diff changes a `**Grant paths**` block. Rule 8 keys it on the **activating** PR, "Peter's merge of a PR whose body names the grant", and the two differ: G-2 is filed and activated by one PR, while G-1 is filed in § 5 step 1 and activated in step 5 (`[STACY R1]` B-4). If Peter keeps it, the predicate is rule 8's own:
  - the PR body (`gh pr view <n> --json body`, fence-aware, as `merge-hold.ts` reads it) names a root record whose `**Grant paths**` block names a `.github/` path;
  - and the PR's diff touches none of those paths, so it is not that grant's fixing PR.

  Then the body must carry a column-0 line, outside a fence, that begins `**ARMING**: at this merge and at the fixing PR's merge`; otherwise a warning, `arming-line-missing`. Prose may follow the literal (#716 does). Stacy's grant-limb ARMING read already reads that line, from the body, at the activating merge.
- (d) **The cycle and the decision** are item 3's: the same walk counts emissions, false emissions (a line the grammar rejects that the guide's prose permits, or the reverse), and offers Peter red / keep / retire for (b) and fail / keep / retire for (c).

**Edit sites.**
- *Site 4.1 — `scripts/completion-claims/header-lines.ts`, new*, with `__tests__/header-lines.test.ts` (the guide-equality assertions, and one accept and one reject case per grammar, taken from 129's docs: Task 15's `PR gate #777 @ 7d982b215` rejected; a `see <path>` Instruments line rejected).
- *Site 4.2 — parity's diff-scoped duties* (`scripts/check-completion-criteria-parity.ts`, `verdict.ts`): the five emissions; fixtures red at base.
- *Site 4.3 — only under F-4 (a): `scripts/completion-claims/arming-line.ts`, new*, reusing `bodyLines` from `merge-hold.ts` (L53); called by a second `pr-records.yml` step under a dated amendment to G-2; exits 0; cases for present, absent, fenced, prose-after, and a fixing PR that names its grant (not read).
- *Site 4.4 — `governance/completion-documentation-guide.md` § "CI provenance" rule 1 and § "The instruments line and block"*, one sentence each: "Parity emits on a doc the PR adds or changes whose line is missing or does not match this grammar (ballot 2026-11-08-closeout-cracks item 4); it does not fail the PR. *(added 2026-11-xx by ballot 2026-11-08-closeout-cracks item 4)*"
- *Site 4.5 — `governance/classification-map.md` row `parent-instrument-existence`* (Stacy's row, her ruling): `checks` gains the parity emissions; `check_state` `none` → `proposed`; "Never a gate" stays true while the read emits. Parity's own row gains the same emissions in its history line (site 2.5's line names both items).

**Cost.**
- **Authoring**: one module with its guide-equality test, five parity emissions with fixtures, the ARMING script. About one session, most of it fixtures.
- **On every PR**: nothing extra for docs (parity already runs); under F-4 (a), the ARMING step is inside item 3's job.
- **On authors**: a unit PR whose doc lines are malformed gets emissions to fix. In 129, 6 of 20 Instruments lines and 10 of 23 provenance lines would have emitted.

**What it would have caught in Spec 129.**
- **CP-9** (and MIDPOINT MP-8): six Instruments lines (Tasks 13, 15, 16, 17, 18, 20) emit `instruments-line-malformed`; Task 14 and Task 20 emit `instruments-count-mismatch` (27 listed against 28 rows; 14 against 15). Task 18's unresolved `MISSING` rows are not a grammar matter and are not caught.
- **CP-10**: ten of 23 provenance lines emit `ci-provenance-malformed`, on Tasks 8, 9, 11, 13–18 and Task 20's second line (MIDPOINT's three included). Stacy corrects CP-10 to 13 of 23 parsing (`[STACY R1]` § 1).
- **ARMING**: nothing. Neither pass found a missing or malformed activation line in 129. The ARMING half is prospective, and F-4 (c) drops it.

**Census.**
- `**Census**: owed — completion-criteria-parity — as item 2; the emissions change no verdict, but they are output the claims pass reads, so I treat them as in scope rather than claim the messages-only carve-out. Heuristic, my run of the two guide regexes over every parent doc at bf4cd7677: 129 Instruments 14 ok / 6 bad; 129 provenance 13 ok / 10 bad of 23 lines; 123 Instruments 16 / 1, provenance 15 / 7. Re-run at 35cb08f43 with the same result; Stacy reproduces both and corrects her CP-10 to 13 of 23`
- `**Census**: not in scope — parent-instrument-existence — checks: [] at bf4cd7677, so no registered instrument; site 4.5 adds one`
- `**Census**: exempt — (1) arming-line.ts does not exist at bf4cd7677; ran: gh pr list --state merged -L 60 --search 'ARMING in:body' (12 PRs with a line beginning **ARMING**, 2 in the activation form, #716 and #724; whether an activating PR lacked the line was not checked); count: heuristic`

**Surviving counter.** **A grammar check rewards form over fact.** The provenance lines that fail in 129 fail mostly because their authors wrote what was true in prose ("Task 18 names its runs in prose"), and Stacy re-read every fact behind them and found them true. A check that makes them reformat costs each author time and buys a line a machine can parse — which is what rule 2 needs ("every run result … is local unless its run is listed on a CI-provenance line") — but not a truer one. Fold-back took in emission-only, diff-scoping (only docs the PR touches), and one module whose test pins it to the guide, so the grammar cannot drift into a second copy. What survives: these lines exist so the claims pass can read them mechanically; if Stacy reads them by hand anyway, the check saves her nothing and costs every author something.

---

## 4. Edit sites, by file (the application inventory)

| File | Sites | Kind at application | Who writes |
|---|---|---|---|
| `.github/workflows/native-harness.yml` | 1.1 | grant G-1 | Thurgood |
| `.github/workflows/pr-records.yml` (new) | 3.2; 4 (c) under F-4 | grant G-2 (`2026-11-08-fired-records-warn-workflow-grant.md`; 4 (c) by its amendment) | Thurgood |
| `scripts/harness/stability.ts`, `stability.test.ts` | 1.2 | standing scope | Thurgood |
| `scripts/check-completion-criteria-parity.ts`, `scripts/completion-claims/{verdict,completion-doc,header-lines,arming-line}.ts`, fixtures, tests | 2.1, 4.1–4.3 | standing scope | Thurgood |
| `scripts/owed-set.sh`, `owed-set.test.ts` | 2.2 | standing scope; Stacy's cases | Thurgood |
| `scripts/issues-owned.sh`, `issues-owned.test.ts` | 3.1 | standing scope (**built**, `c8fd9640d`) | Thurgood |
| `governance/completion-documentation-guide.md` | 2.3, 2.4, 4.4 | LAW (this ballot) | Thurgood |
| `governance/classification-map.md` | 2.5, 3.4, 4.5 | LAW (this ballot) | Thurgood; 4.5 on Stacy's word |
| `.kiro/hooks/RELEASE-FLOW.md` L87 | 2.6 | LAW (this ballot) | Thurgood |
| `.kiro/issues/README.md` rule 6 | 3.3 | LAW (this ballot) | Thurgood |
| `canonical/agents/thurgood.md` L560 | 2.8 | LAW (this ballot) | Thurgood |
| `canonical/agents/stacy.md` L445, `canonical/profiles/consumer/stacy.overlay.md` L112 | 2.7 | LAW (this ballot) | Stacy |
| ballot `2026-11-07-native-lane-ownership` after L68 | 1.3 | ledger line | Thurgood |
| `.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md` | 1.4 | record section (rule 9) | Thurgood; Stacy co-owner |
| G-1's grant record (new); G-2's (written, `d6b7df5af`) | § 5 steps 1, 6 | rule 10 filing | Thurgood |

---

## 5. Application steps (after ratification; each a PR Peter merges)

1. **Ratification record.** The session that receives Peter's words updates this Status line and commits it, before any site is applied (README § "The Ratification Protocol"). **The record names the items and forks it ratifies.** A ruling on items 1 and 3 now leaves items 2 and 4 DRAFT, and their own ratification is a later record. G-1's grant record is filed in the same PR (rule 10: a grant list is in a merged record before the diff it bounds). G-2's is already written (step 6).
2. **Held with items 2 and 4. Census, then item 2's and item 4's code** (one PR, mine), after items 2 and 4 are ratified with their census in the first form, re-run at the base of that ratification (`[STACY R2]` § 3 (iii)). First the census mode for parity (EXECUTION under ballot 2026-10-19 § 4) and the register's `census` field; then the census is re-run at the PR's base, compared with this ballot's appendix, and the instrument change ships. **Precondition**: Ada's checkbox PR for CP-1 has merged (`git show origin/main:.kiro/specs/129-consumer-generation-completeness/tasks.md | grep -c '^- \[ \] 15\.'` prints 0), or this PR goes red on itself and blocks every PR after it. **Met** at `35cb08f43` (#795). The PR body carries the `**Straggler sweep**:` line for `check-completion-criteria-parity.ts` and `owed-set.sh` (README § "Conventions").
3. **Law and register sites, split by item** (`[STACY R2]` § 3 (ii)). Each PR carries `**Edit kind**:` LAW lines citing this ballot, dated pointers on `governance/**` and RELEASE-FLOW, `validate-steering-metadata.js`, and a docs MCP `rebuild_index`.
   - **3a, with items 1 and 3**: site 3.3 (README rule 6, and rule 11 under F-6 (a)) and site 3.4 (the `issues-obligation-lapse` row). One PR, mine.
   - **3b, held with items 2 and 4**: sites 2.3–2.6 and 4.4, and register sites 2.5 and 4.5 (Stacy's word on 4.5). Site 2.5's history line names items 2 and 4, so it waits for them.
4. **Held with item 2. Charter sites 2.7 and 2.8** (one PR; Stacy writes 2.7 in her seat). `npm run build:generator`, lock refresh, re-confirm and re-sign each affected surface (`verify-signing-chain --audit --pr <n>`).
5. **Item 1, code first**: the `stability.ts` PR (site 1.2), then the activating PR for G-1 with its ARMING line, then the workflow PR (site 1.1). Sites 1.3 and 1.4 ride with the workflow PR. **ARMING** fires at G-1's activating merge and at the workflow PR's merge (Stacy's row).
6. **Item 3**'s warn-only half is under way outside the ballot.
   - G-2 (`.kiro/issues/2026-11-08-fired-records-warn-workflow-grant.md`) was activated by #798, merged 2026-11-08T19:05:30Z (`77958cbb6`).
   - Its fixing PR is **#803** (`chore/fired-records-warn-check`, head `0d62b341f`). It carries the PR mode, `pr-records.yml` byte-identical to G-2's block, and G-2's outcome line and archive move.
   - The cycle of item 3 (d) starts at #803's merge.
   - Sites 3.3 and 3.4 land in step 3a, after ratification. Item 4 (c)'s `arming-line.ts` (site 4.3) follows only under F-4 (a), by a dated amendment to G-2.
7. **Peter's act (b)**, if he takes it: his words and the time of the toggle are recorded by the session that receives them, in an evidence record cited from this ballot's Status line. No agent changes the setting.
8. **Straggler sweep** over each item's edit class (`git grep -n -F` for `pull_request` and `workflow_dispatch` in `harness/README.md` and the charters; for `unticked` across `canonical/`, `governance/`, RELEASE-FLOW; for `Unmet or partially met` in `governance/`), listed in the last PR's body.

---

## 6. Questions for the consulted seats

*(Q1–Q4 answered at round 1 by Data and Kenya, relayed; Q6 answered by Ada, relayed; § 10. Q5's first half is answered by #795.)*

- **Q1 (Data, Kenya)** — Does a push run need anything the PR run does not: a different cache key, a toolchain step that reads the event, a lane behaviour on `--no-base`?
- **Q2 (Kenya)** — The macOS concurrency: with at most one push run running and one pending, how much does a merge burst move condition 5's queue time? Is the group enough, or should push runs skip iOS while an iOS PR run is queued?
- **Q3 (Data, Kenya)** — Is routing "environment" reds to you, with the reader filing the record, the right split? Would you rather be the reader for your platform?
- **Q4 (Data, Kenya)** — F-1: should a push run at the merge base serve as the reference run `R` in P1, C1 and C3? It would give C3's fallback a run to find, where that ballot's `[ADA R1]` A2 and `[STACY R4]` (b) found it "usually does not exist".
- **Q5 (Ada)** — Item 2's red lands on your Task 15 first. Is your checkbox PR for CP-1 on a path to merge before step 2, and is there any reason a box is left unticked on purpose in specs you own?
- **Q6 (Ada)** — Item 3's replay lists your records most often (U5's four, the dual-instance and staleness records). Does a `fires-here` warning on the PR reach you in time, given that you often are the PR's author?

---

## 7. Forks for Peter

Each fork names the option I recommend and its surviving counter. The pick is Peter's.

- **F-1 — Can a push run serve as a reference run?** (item 1) *Leans: Stacy (a), Kenya (a), Data (b). Data's reason: C3's fallback fails in exactly the repair cases.*
  - **(a) Recommended: not in this ballot.** P1, C1 and C3 and Ada's item 5 keep `workflow_dispatch` reference runs. *Counter*: C3's fallback keeps failing in exactly the repair case (`[ADA R1]` A2 and `[STACY R4]` (b) in that ballot: nothing dispatches `main` on a schedule, and artifacts expire after seven days), which a push run at the merge base would fix.
  - **(b)** A push run on `main` at `B`, or at a first-parent ancestor of `B` with no change to `harness scripts/harness .github/workflows/native-harness.yml`, serves as `R`. That is edits to Ada's charter (L326), the lane-ownership ballot's P1, C1, C3 (ledger lines), and Data's and Kenya's consults. *Counter*: it widens this ballot into three seats' write-scope conditions, which is a scope change (always LAW, always that seat's consult), and it was not in Peter's question.
- **F-2 — Add a schedule?** (item 1) *Leans: Stacy (a); Data and Kenya say no, for now.*
  - **(a) Recommended: no.** *Counter*: an outside break with no merge stays unseen until the next PR or push.
  - **(b)** A `schedule:` run on `main` every 6 days or less (Ada's class option in the lane-ownership ballot § 8, "not vetted with Thurgood or Data"; this is my vetting, and Data and Kenya vetted it at round 1). *Counter*: a third event class for `stability.ts`, macOS time on idle days, and a red no merge caused, which the reader must triage cold.
- **F-3 — Subtask docs: red or emission?** (item 2 (b)) *Leans: Stacy (a); Ada (a).*
  - **(a) Recommended: emission.** The parent's own doc reds; subtask docs alone emit. *Counter*: a unit that merges with a parent's subtask docs and no parent doc (the 046 shape) is only an emission.
  - **(b) Red, as the brief reads.** *Counter*: every checkpoint dispatch on a unit branch goes red from the first subtask doc until the parent completes. Those runs are feedback, not the gate, but a permanently red feedback run teaches agents to ignore red.
  - **(c)** Red on the parent's doc only, with no subtask-doc read. *Counter*: it loses the 046 shape entirely.
- **F-4 — Item 4's form in the cycle.** *Lean: Stacy (c); (a) once B-4's predicate is fixed. My recommendation moves from (a) to (c) at round 2.*
  - **(a) Emission-only for (b), decided with item 3 at the walk; keep the ARMING half on rule 8's predicate (4 (c) as rewritten).** *Counter*: a second script and a G-2 amendment for a guard with no observed miss.
  - **(b) Red for docs the PR adds, from application.** *Counter*: it changes Stacy's `parent-instrument-existence` row's "Never a gate", which is her ruling. A first red on the grammar would also fall on unit PRs already in flight.
  - **(c) Recommended: emission-only for (b), and the ARMING half dropped.** The ARMING half caught nothing in 129, and Stacy's grant-limb read already reads the line from the body at the activating merge. *Counter*: between the activating merge and her read, a missing line goes unflagged. Emissions are also easy to ignore, and the 129 rates (6/20 and 10/23) came from authors who could already read the grammar.
- **F-5 — Item 2 (e), the reverse key (ticked subtask with no doc → emission).** [Author's addition.] *Leans: Stacy (a), only diff-scoped, as (e) now is; Ada (a).*
  - **(a) Recommended: include, diff-scoped.** It is the same tick-against-doc read, cheap, and it turns Stacy's S-4 hand count (CP-7) into a line on the PR that ticks. *Counter*: it counts docs, not their content; a ritual subtask doc passes it.
  - **(b) Leave it out.** *Counter*: it was not in Peter's question, and S-4's harder half (a tick that contradicts its parent row) stays a judgment either way.

- **F-6 — An added `path:` record: does it fire at the merge that adds it?** (item 3, `[STACY R1]` B-2) Rule 11's words do not decide it. A commit is its own ancestor, and the adding diff does add a Trigger line.
  - **(a) Recommended: no.** *Leans: Stacy (a), at R2; Ada (a).* README rule 11 gains the sentence in site 3.3, which is what `issues-owned.sh`, `compare.ts` and (since `c8fd9640d`) the PR mode already do. *Counter*: a record filed on a path its own PR touches (#727's `merge-hold-promotion-reads`) does not fire until the next touch. An owner who meant "this PR is the event" must use `merge:#<N>`, and nothing tells them except site 3.3's sentence (`[STACY R2]` § 4).
  - **(b) Yes.** Then the seat mode, `compare.ts`'s `firedState` and the PR mode all change, and so does the harness tag rule's reading of a record added beside its tagged entry. *Counter*: that is three instruments' code and a harness rule (design § 3's), changed to follow a reading no record has relied on.

**Not a fork: the reader.** The brief proposes me; I agree (§ 3 item 1). Data and Kenya did not ask for their platforms (Q3); Kenya's condition, a record per routed red, is folded into step 3.

---

## 8. The counter-argument, worked against the whole draft

**The strongest objection**: *this is four new instruments, all owned by one seat, to catch failures that one person already caught.* Stacy's CLOSEOUT found every one of these cracks, by reading. Her charter says passes are never gates. These items do not make the passes gates, but they move her catches into machinery I own and that runs before her. If the machinery works, her pass finds less. A pass that finds less looks like a system that fails less, whether or not it does. That is the error Spec 127's framing sentence names for parity ("any future reading of a green … gate as evidence of claim honesty"), and it applies to every check here.

**What fold-back changed**:
1. Items 3 and 4 are **warn-only** with a **false-fire count** before any decision. The walk measures whether they work before they can block.
2. Item 2's red is the **narrowest** of the four. At `bf4cd7677` it fires on one parent in the repository.
3. Item 2 (c) was **rebuilt**. The free-text key I first drafted would have emitted 20 times on today's corpus, with 1 true; the new form binds forward.
4. Item 1's reader rule says **what the reader never does** (move a list, a pin or the protected set).
5. Each item names **what it would not have caught**. The reader of this ballot does not have to infer a reach the items do not have.

**What survives**:
- **Concentration, at its true size** (`[STACY R1]` A-6). Every new instrument here is mine, and the one standing read is mine. If I am wrong about a grammar or a key, the instrument that is wrong and the steward who would notice are the same seat. The outside reads are Stacy's:
  - her census read;
  - her ARMING read, which fires on item 1's workflow and `stability.ts`, on G-1 and G-2, and on item 4's parity change;
  - her cases for the owed-set.

  **Item 3's script and item 2 (d)'s owed-set change get no ARMING read.** `issues-owned.sh` and `owed-set.sh` are not on her instrument-path list, so those two changes are read only by her cases and at RELEASE. Round 1 found two defects in exactly those two (B-1, B-2). That is the residual's evidence, not its cure.
- **Stacy's method commitment** (`[STACY R1]` § 5), recorded here as hers. From the first pass after any of these instruments lands, her Method section names, for each crack class A–D, whether the class was read from an instrument's output or re-read by hand, and counts the two apart from pass-found findings. That makes a shorter findings list say why it is shorter. It does not stop a reader taking a short list as a clean spec.
- **Stated plainly**: if these instruments work, the claims passes will find fewer things. That will not mean there are fewer things to find.
- **The fork this exposes**: whether S-1–S-3 should become instruments at all, or stay as the pass's own counting block, read by Stacy with the regexes and the queries this ballot writes, with no CI step. That is the "no item" option. Its cost is Stacy's time on every pass, and lapses that are found only at CLOSEOUT, as these were. Its benefit is no new machinery and no green that reads as honesty. I have not made it a numbered fork because Peter's "Yes, please" chose instruments; I surface it so that the choice is visible.

---

## 9. Out of scope

- **Link 4 and the signing-act shape review** (Peter's brief): the shape review is its own ballot, owed before 125-B U3 (CLOSEOUT, "U12" records). Nothing here touches `verify-signing-chain`.
- **Rule 11 against cross-seat path triggers** (item 3's surviving counter): a record whose `path:` is a file another seat writes lapses at a merge its owner cannot close in. That is a README rule 9/11 matter for its own measure. Item 3 will count it; it does not change it.
- **S-4** (CLOSEOUT CP-7's 18.4: a subtask ticked while its parent row reads ⚠️): left with Stacy's own words, "whether a rule should, and what it says, is Thurgood's". It is not decided here, because no decidable key exists today: a subtask names no parent row.
- **The instance fixes** (CP-1–CP-4, CP-7, CP-8, CP-11–CP-13): routed by Peter's Q2 ruling to their owners as ordinary PRs. This ballot depends on CP-1's fix only (§ 5 step 2).
- **(b)**, require up-to-date branches: Peter's act, recorded in § 3 item 1, not edited.

---

## 10. Review round record

### Round 1 — required reviewer (spliced byte for byte from Stacy's file)

### [STACY R1] (required reviewer; census reader; owed-set case author; ARMING reader)

#### [STACY R1] — the replay, the census and the after-texts, read against `bf4cd7677` and `35cb08f43`

**Read at** `1e1513eb6` (the ballot, `origin/chore/ballot-closeout-cracks`), on 2026-11-08 (`date -u` at writing: 2026-11-08T18:00:26Z). Before-texts were read at `bf4cd7677`, and what has moved since at `origin/main` `35cb08f43`. The PR mode was read at `6b76a744b`, copied to my scratchpad and run from the main checkout. It reads refs only, so nothing in the tree was touched. Nothing was committed or pushed. **The branch moved while I read**: it is now at `cb620e6f2` (G-2's record moves to `chore/fired-records-warn-grant` `d6b7df5af`; the script head is `5bc58ec75`). I read that delta. `git diff 6b76a744b 5bc58ec75 -- scripts/issues-owned.sh` changes two comment lines only, so the replay below holds at `5bc58ec75`. No finding below depends on the moved text.

**Verdict: OBJECT. Five blocks (B-1 to B-5) are owed before this goes to Peter, plus the census the draft already says is owed (B-6).** Items 1 and 3 are the right instruments, and the replay holds as claimed: every lapse my two passes reported is on the list. But item 2 (d) drops the owed-set predicate's adoption leg, so today it prints two candidates and neither is owed. Item 3's PR mode disagrees with the seat mode and with `compare.ts` about whether a record fires at the merge that adds it. Item 3's rule text describes a check other than the one built. Item 4 (c) keys the ARMING line on the wrong PR. And item 1's reader has no class for a red from the tag check, which is the one red in the window that a push run would have shown. None of these reopens a ruling.

**1. Reproduced**

- **The replay (§ 3 item 3; appendix C): reproduced exactly, with a wrong denominator.** I ran `issues-owned.sh --pr <N> --base <c>^ --head <c>` under `GITHUB_ACTIONS=true` over each first-parent squash whose subject ends `(#<N>)`.
  - Over `8d8ba1425..bf4cd7677` there are **103** such merges (not 104), giving 23 `fires-here` (16 warnings, 7 notices) on 14 merges.
  - The appendix's totals come out exactly only when I add #678 (`8d8ba1425` itself; it fires nothing), #791 and #796. That makes **106 merges** and gives `fires-here` **28 on 15 merges (21 warnings, 7 notices)**, `already-fired` 15, `re-ruled-here` 4, `closed-here` 20, and `unavailable` 0.
  - So the appendix's range (`..bf4cd7677`) and its count ("104") contradict its own #791 rows. § 3 item 3 names the range as running "to `929972713`", which is the range that reproduces.
  - **#791 on its own**: five `fires-here`, byte for byte as G-2's record prints them.
- **"Every lapse your passes reported" holds.** On the list:
  - MP-3's two (#707);
  - MIDPOINT SF-1 (#708);
  - CLOSEOUT SF-1 (#740; #781 registry);
  - CP-14 (#757);
  - CP-3 (#774);
  - CP-12 (#778 erratum; #781 probe defect);
  - S-5's #732.

  None is missing. **A self-correction this exposes**: MP-3's second record is `2026-11-06-native-harness-dispatch-stub-grant.md`, which is a **grant**. Rule 11 excludes grants ("a grant still open at its fixing PR's merge is a walk finding"), so my MP-3 should have called it a rule-5 walk finding, not a lapse. The replay prints it with reason `grant`. The appendix's class table follows my MP-3 and puts it among the "9 lapses a pass reported", so that row is really 8 lapses plus 1 grant, and the grant row is 6, not 5. The total of 21 is unchanged.
- **The owed-set at `bf4cd7677`**: `0 candidates; excluded: 2 closed, 5 open, 23 stub, 4 touch-only`, exactly. Appendix A's table of unticked parents and docs is right for all five specs.
- **Per-parent specs**: there are 3. Unticked parents with their own doc: 1 (129 parent 15). Unticked parents with subtask docs only: 0. **That has moved**: #795 ticked Task 15, so at `35cb08f43` § 5 step 2's precondition grep prints `0`, and item 2 (a) fires on **0** parents. The precondition is met, and the red has no live instance.
- **Item 2 (c), the free-text Unmet key (appendix B)**: my own implementation gives 19 and 8 emissions where the draft gives 20 and 9. The difference is all in 123, and comes from where the list capture stops. 127 gives 2 and 129 gives 11, as drafted. CP-4 is in the wide set and not in the narrow one, as drafted. The shape holds. The counts are heuristic on both sides.
- **Item 4, the two guide regexes (appendix D), verbatim from L180 and L246**:
  - Instruments: 123 16/1, 129 14/6.
  - CI-provenance: 123 15/7, and 129 **13 ok / 10 bad of 23**.

  **Thurgood's 23 is right, and my CLOSEOUT's "12 of 22" (CP-10) is wrong.** Tasks 5, 19 and 20 carry two lines each. The ten failures agree: Tasks 8, 9, 11, 13–18, and Task 20's second line. I owe CP-10 an appended erratum in my record. That is mine to do, and I file it in my next PR on 129's completion directory.
- **Before-texts, all as quoted**:
  - guide L151;
  - RELEASE-FLOW L87;
  - `stacy.md` L445 and the overlay L112;
  - `thurgood.md` L560;
  - `native-harness.yml` L33–35, the five `name:` lines and the four `--base` lines;
  - `stability.ts` L178–180, L536, L587 and L592.

  `deriveJobContext` (L727–739) takes the trailing `|| '<X>'` fallback. Under Actions precedence the three-arm expression is `(a && b) || (c && d) || 'X'`, so the derived context is unchanged.
- **Census lines, by form**:
  - Item 1's two `not in scope` lines are in form. One nit: "`git grep -n -F owed-set governance/classification-map.md` → 0 hits" is 1 hit at `bf4cd7677`. It is L1162, a history line naming `stacy#frontmatter:commands[owed-set]`, not a `checks` entry, so the claim behind the parenthetical holds.
  - Item 3's `exempt — (1)` line is in form, and its count reproduces (above, once the denominator is 106).
  - Item 4's ARMING `exempt` line: not re-verified — I did not run the `gh pr list` search in this pass.
  - Items 2 and 4's `owed —` lines are in no form (B-6).

**2. Blocks**

- **B-1 (High): item 2 (d) makes a spec owed with no reference to the adoption date.**
  - **The predicate** (my charter, verbatim): `closeout-owed(S)` holds only if the final unit's merge "is dated on or after the ratification date". The script enforces this through `touch-only`, whose test is "the closing commit predates ratification, and no `completion/task-*` was added after it".
  - **(d) as written** makes a spec whose only unticked parents have docs a `candidate`, anchored on "the first-parent commit that added the newest such doc". It does not apply the touch-only test to that anchor.
  - **The two instances**:
    - 046's newest doc is `task-7-4-completion.md`, added `c6d6d4be8` on 2026-02-06.
    - 101's is `task-1-completion.md`, added `947c7fef1` on 2026-05-06.
    - Neither spec added a `completion/` file after 2026-09-19 (`git log --first-parent --diff-filter=A --since=2026-09-19` prints 0 for each).
  - **At `35cb08f43`**, where 129 is `closed`, (d) prints **2 candidates, and 0 of them are owed**. The census heuristic "3 of 5 open specs become candidates" overcounts by those two.
  - **Owed**:
    - (d) says what the closing commit is for a parent its doc claims, and the touch-only test applies to it.
    - The candidate reason keeps what my charter says a candidate row carries: the unit class `a|b|c` and the anchor `<sha> <date>`. (d)'s reason string has neither.
    - The cases in § 3 (OS-2 and OS-1) pin both.
    - Site 2.6 and my site 2.7 then carry the same meaning. The words are Thurgood's at 2.6 and mine at 2.7.
- **B-2 (High): the PR mode says an added `path:` record fires at its own merge, and the two instruments it claims to mirror say it does not.**
  - **The instruments**:
    - The seat mode (`issues-owned.sh`, the `path:` branch) and `compare.ts` `firedState` (L1180–1191, "by the rules `scripts/issues-owned.sh` applies") both search `tc..ground`, where `tc` is the last commit that changed a `**Trigger**:` line. For a record added in a squash, `tc` is that squash, so neither fires it there.
    - `compare.ts` also treats a record new at the head as ruled in the diff (L1153–1156).
    - The PR mode prints `fires-here (added in this diff)`.
  - **The instance**: `2026-11-07-merge-hold-promotion-reads.md`, added in #727 with `path:.github/workflows/merge-hold.yml`.
    - The PR mode warns on #727.
    - The seat mode printed `FIRED@cd340c59b` (#732), which is what my MIDPOINT SF-1 recorded.
    - So the cycle's "mechanical mismatches" count (item 3 (d)) will contain every added `path:` record by construction.
    - Appendix C's "disputed-fire class" row puts #727 beside #732 and calls both owner disputes. #732 is an owner dispute (S-5). #727 is the instruments disagreeing.
  - **The `merge:#<N>` case is unaffected.** CP-12's erratum is `merge:#778`, and all three instruments fire it at #778.
  - **Rule 11 does not decide the `path:` case.** Is the adding commit "an ancestor of the event's commit" that "re-ruled it"? In git a commit is its own ancestor, and the adding diff does add a Trigger line. I say only that it is undecided. Which reading holds is the drafter's and then Peter's.
  - **Owed**: either the rule text decides it and the three instruments agree, or (d) names the class and keeps it out of the mismatch count.
- **B-3 (Medium): item 3's rule text, and the counts (d) reads, describe a check other than the one built.**
  - **Closing**: (b) defines `closed-here` and `re-ruled-here` as "closes it (rule 5: archive move, or a dated outcome line added)". The script reads only the archive move. A record whose dated outcome line is added in the diff prints `fires-here (this diff edits the record)`, and its annotation is a `::notice`, not a warning. G-2's own "Known reach" says so (`d6b7df5af` L131).
  - **Annotations**: (c) says "each `fires-here` line is a `::warning`". 7 of the replay's 28 are notices.
  - **Re-ruling**: the script's re-rule test is any `[-+]**Trigger**:` line in the diff. Rule 11's is "its Trigger line changed in a diff carrying a dated reason and authority".
  - **Renames**: the script diffs with `--no-renames`, and (a) does not say so.
  - **The count**: (d)'s "**listed**: `fires-here` lines on PRs that merged" counts notices or it does not, and the walk's three counts depend on which.
  - **Owed**: the rule text states what is built, or the script reads what the rule text says. One of the two, before ratification, because site 3.3 puts the check's description into README rule 6.
- **B-4 (Medium): item 4 (c) keys the ARMING line on the PR that files the grant. Rule 8 keys it on the PR that activates the grant.**
  - **Rule 8**: activation is "Peter's merge of a PR whose body names the grant", and "a `.github/**` grant's **activating** PR carries … `**ARMING**: …`".
  - **4 (c)** fires when "the PR's diff changes a root record's `**Grant paths**` block". That is the predicate of Thurgood's LIVENESS read 4, which his charter calls "a superset" at walk grain, where a false candidate costs one look. At PR grain it both over-fires and misses.
  - **The ballot's own § 5** shows both:
    - G-1 is filed in step 1 (the ratification PR) and "activated" in step 5.
    - If step 1's body names G-1, step 1 is its activation, and step 5's "activating PR" is not one.
    - If it does not, 4 (c) emits `arming-line-missing` on step 1, and never reads step 5, whose diff need not touch the block.
  - **The `cb620e6f2` move makes it concrete.** G-2 is filed and activated by the same PR. G-1 is not.
  - **Owed**: 4 (c) keys on the body naming a grant, or it drops out under F-4 (c), which is my lean (§ 4).
- **B-5 (Medium): item 1's reader has no class for a red from the tag check, so the #791 shape is routed to the wrong seat.**
  - **The mechanism**: on a push run the comparator runs `--no-base`, and the tag rules read the head's own first-parent history (`compare.ts` L1141–1143, `ground = baseSha ?? headSha`).
  - **#791 at `693b39b54`**: Lina's repair record was tagged, open and fired. A push run there would have gone red with `FAIL tag: … FIRED@693b39b54`.
  - **The misroute**: under § 3 item 1 step 2, that verdict is neither *infra* nor *environment*, so it is a *tree regression*. It goes to the squash's `Agent:`, which is me for #791, and to "the owner of the failing entry's domain". The remedy is the record owner's close or re-rule, and rule 9 forbids me to make it.
  - **Owed**: a class for a `FAIL tag:` verdict, routed to the owner of the tagged record. The words are the drafter's.
  - **Consequence for item 1's reach**: this is the one red in the window that a push run would have shown on `main`. It would have shown at the same merge as on the PRs, not before them, so "catches nothing else" stands.
- **B-6 (as drafted, standing): the census for items 2 and 4 is void until it is in the first form.** The draft says so itself, and I hold it to that. I reproduce both digests at the census line's `<sha>` when the census mode exists. Until then, items 2 and 4 cannot leave DRAFT, and 2 (c)'s "fire on 0 docs at application" and 4 (b)'s rates are heuristic.

**3. My cases for `owed-set.sh` (site 2.2; my charter, LIVENESS)**. Each case is red at the base unless marked.

- **OS-1**: a spec whose only unticked parent has its own `task-<N>-completion.md`, added after adoption, prints `candidate`. The reason names the parent and that its box is unticked, and keeps the unit class and anchor `<sha> <date>`. At the base it prints `open`.
- **OS-2** (B-1): the same spec, with every doc added before adoption and no `completion/task-*` added after it, prints `touch-only`, never `candidate`. These are the 046 and 101 shapes.
- **OS-3**: one doc-claimed unticked parent plus one with no doc prints `open`, with `N of M` as today. Not red at the base.
- **OS-4**: an unticked parent with subtask docs only, added after adoption, prints `candidate`. Its reason says the claim is subtask docs only, apart from OS-1's own-doc claim. They are different evidence, and the read I owe is different.
- **OS-5**: a parent doc named `task-<N>-parent-completion.md` (125-B's naming, present at `bf4cd7677`) is read the way the ballot rules: as a doc, or as absent with the reason saying so. The case pins whichever is ruled.
- **OS-6**: with the reclassification, the count line's row-sum identity holds.
- **OS-7**: a spec with `completion/claims-pass.md` prints `closed`, whatever its boxes say. Not red at the base.

**4. Amendments (not blocks)**

- **A-1, item 2 (e) has no census, and as written it emits on standing docs.** Over the three per-parent specs at `bf4cd7677`, ticked subtasks with no `task-<N>-<M>-completion.md` number **20 of 230**:
  - 127: 14 (all of 1.1–3.3, ticked on 2026-09-19, S-4's own date);
  - 123: 2 (11.2, which has `task-11-2-lina-completion.md` and `-stacy-`, and 30.3);
  - 129: 4 (CP-7).

  At `35cb08f43` the count is **16 of 233**, because #794 fixed 129's four. Parity is a full scan, so (e) prints 16 standing emissions on every PR, 2 of them on docs that exist under a seat suffix. Owed: (e) is diff-scoped to subtask ticks the PR adds, or bound forward from a named commit; the ballot says whether a `-<seat>` suffix counts; and the census line covers (e).
- **A-2, 125-B's `task-<N>-parent-completion.md`**: items 2 (a) and (d) key on `task-<N>-completion.md`, so they read 125-B's parent docs as absent. 125-B stays `open` either way, through parent 6. OS-5 pins it.
- **A-3, item 4 (b) `instruments-count-mismatch`**: guide L226 says `none` rows "are not counted". The after-text compares "the block's final-state rows" and does not exclude them, so a block with a `none` row emits falsely. Task 20's line is also listed under both `-malformed` and `-count-mismatch`. A line the regex rejects gives no counts to compare, so the second needs a stated lenient parse, or it does not apply.
- **A-4, `stability.ts` L621**: the runs table prints `no (dispatched)` for every excluded run. Site 1.2 does not name it, so a push run would read as dispatched in the table while the report line counts it as push.
- **A-5, the `native-harness.yml` header**: the draft says "Two existing sentences are false" and names one. L16, "A dispatched run has no merge base, so its comparator runs `--no-base`", needs the push event too.
- **A-6, ARMING reach, for § 8's concentration residual**:
  - Items 1 and 4 fire my instrument-path limb: `stability.ts` and `scripts/completion-claims/**` are on the list.
  - G-1 and G-2 fire my grant limb.
  - `scripts/owed-set.sh` and `scripts/issues-owned.sh` are **not** on the instrument-path list. So the script half of item 3 and item 2 (d) get no ARMING read: only my cases (§ 3, for the owed-set) and RELEASE.
  - The header's "the ARMING read that items 1, 3 and 4 fire" is right for item 3's workflow and wrong for its script. I state this so the residual is counted at its true size, not to widen the list here.

**5. The surviving counter (§ 8)**

I agree that it survives, and that no revision absorbs it. My side of it is method, not law. From the first pass after any of these instruments lands, my Method section names, per crack class (A–D), whether the class was read from an instrument's emissions or re-read by hand, and counts the two apart from pass-found findings. Then a pass that finds less says which instrument took the find and whether I checked behind it. This is the existing per-row method-honesty duty applied to classes, and it needs no edit site. It does not stop a reader taking a short findings list as a clean spec. Nothing does, and § 8 says so plainly. I do not reopen the no-item option: Peter's "Yes, please" chose instruments.

**6. Fork leans**

- **F-1: (a).** Admitting push runs as `R` is three seats' write-scope conditions, and Peter did not ask about it.
  - *Surviving*: C3's fallback keeps failing in the repair case until someone takes it up.
- **F-2: (a).**
  - *Surviving*: on a quiet `main` an outside break is seen first by a PR author, as now. Item 1's own counter says that is when (b) would help.
- **F-3: (a)**, emission.
  - *Surviving*: the 046 shape stays an emission. At `35cb08f43` it has no per-parent instance.
- **F-4: (c)**, emission-only for (b), and the ARMING half dropped.
  - Given B-4 the predicate is wrong as drafted, and it caught nothing in 129. My grant-limb read at the activating merge already reads that line, from the PR body. With B-4 fixed I would take (a).
  - *Surviving*: between the activating merge and my read, a missing line is unflagged.
- **F-5: (a), only with A-1**, diff-scoped or bound forward.
  - *Surviving*: (e) counts docs, not their content. A ritual subtask doc passes it, and the stub rate stays in my counting block.

**Review**: object — B-1 (item 2 (d) drops the adoption leg: 2 candidates at `35cb08f43`, 0 owed), B-2 (an added `path:` record fires at its own merge in the PR mode and not in the seat mode or `compare.ts`, so the mismatch count is polluted by construction; #727), B-3 (item 3 (b)/(c)/(d) describe closing, re-ruling and annotations other than `6b76a744b`/`5bc58ec75` builds), B-4 (item 4 (c) keys the ARMING line on the filing diff; rule 8 keys it on the activating PR's body), B-5 (item 1's reader routes a `FAIL tag:` red, the #791 shape, to the squash author, who may not touch the record), B-6 (items 2 and 4's census owed, as drafted); replay reproduced at 106 merges, not 104

### Round 1 — consulted seats on item 1 (relayed)

*Relayed by the orchestrator on 2026-11-08. This is a summary of Data's and Kenya's answers in the relay's words, not their own entries. If either seat writes an entry, it is spliced here byte for byte.*

- **Neither seat changes its lane rules.**
- **F-1**: Kenya leans (a). Data leans (b), because C3's fallback fails in exactly the repair cases.
- **F-2**: both say no to a schedule, for now.
- **Kenya**: a routed red should open a record, because she reads only at session start.
- **Data**: a routed red should carry the run ID, the runner image version and the observed toolchain values, and cache keys should exclude `github.event_name`.

### [THURGOOD R2] — round 1 folded (2026-11-08)

**Read**: `[STACY R1]` above (her objection, six blocks and six amendments), and the relayed Data and Kenya answers. Each block is answered below, with where it was folded. **The script half moved.** `chore/fired-records-warn-check` is at `c8fd9640d` (B-2). The replay is re-run there over Stacy's 106 merges, and the census heuristics at `35cb08f43`. **Status stays DRAFT.**

**Blocks.**
- **B-1 — taken.** Item 2 (d) now reads a doc-claimed parent as ticked at its claiming commit (the first-parent commit that added its newest doc). The closing-commit and `touch-only` rules then apply unchanged, so the adoption leg holds. The candidate reason keeps the unit class and the anchor `<sha> <date>`, and says whether the parent's own doc or only subtask docs claim it.
  - 046 and 101 now print `touch-only`; at `35cb08f43` (d) adds 0 candidates.
  - Sites 2.2, 2.6 and 2.8 carry this meaning; site 2.7 is yours.
  - Your cases OS-1 to OS-7 are site 2.2's cases as you wrote them. OS-5 is ruled: a `-parent-` doc is a doc, as parity's locator reads it.
- **B-2 — taken, in the script and in the ballot.** An added `path:` record no longer fires at the merge that adds it, in the PR mode (`c8fd9640d`). The new case is red at `5bc58ec75`, and the suite is 43/43. An added `merge:#<N>` record still fires, as all three instruments read it.
  - Item 3 (b) states the rule and cites `compare.ts` L1153–1156 and L1180–1191.
  - Rule 11's words still do not decide the case. F-6 asks Peter to let the rule say what the instruments do, and site 3.3 carries the sentence under F-6 (a).
  - #727 leaves the warning list, and the disputed class is 1 (#732).
- **B-3 — taken: the rule text now states what is built.** Item 3 (a)–(d) say:
  - the archive move is the only close read, and a dated outcome line is not;
  - a re-rule is any changed Trigger line, and rule 11's dated reason and authority are not read;
  - the diff is read with `--no-renames`;
  - annotations are warnings or notices;
  - the listed count keeps warnings and notices apart.

  Site 3.3's README sentence says the same. I chose to describe the built check, not to make the script read outcome lines, because an outcome line has no fixed grammar to read. The cycle's counts will show what that costs.
- **B-4 — taken, and my F-4 recommendation moves to (c).** Item 4 (c) is recommended dropped. If Peter keeps it under F-4 (a), its predicate is rule 8's: the body names a root grant record with a `.github/` path, and the diff touches none of that record's paths, so the PR is not that grant's fixing PR. Site 4.3 follows only under (a).
- **B-5 — taken.** Item 1's reader has a *tag* class. A `FAIL tag:` red goes to the tagged record's owners, plus the lane owner where the entry should move, and never to the squash's author. #791 → #796 is the class. "What it would have caught" for item 1 now says that a push run at `693b39b54` would have gone red on the tag check at #791's merge, at the same moment the PRs did, and would have routed to Lina.
- **B-6 — stands, as you hold it.** The census for items 2 and 4 is still owed: parity has no census mode, and building one is the EXECUTION PR of § 5 step 2. The heuristics are re-run at `35cb08f43` and labelled heuristic. The census lines say "owed", which is no README form, so items 2 and 4 cannot leave DRAFT. I do not read B-6 as met.

**Amendments.**
- **A-1 — taken.** (e) is diff-scoped to ticks the PR adds, and a `-<seat>` suffix counts. The 16 standing instances are not read.
- **A-2 — taken**, through OS-5 and (a)'s locator sentence.
- **A-3 — taken.** The count cross-check runs only on a line the regex accepts, and `none` rows are excluded.
- **A-4 — taken** into site 1.2 (L621).
- **A-5 — taken** into site 1.1 (L16).
- **A-6 — taken** into the header and § 8. The concentration residual is stated at its true size.

**Consults.**
- **Kenya's record per routed red — taken** into item 1 step 3. For a tag red, the record is a dated line on the tagged record.
- **Data's run ID, image and toolchain values — taken** into step 3.
- **Data's cache keys — already true.** The one keyed cache is Gradle's (L320): `runner.os` and three files, with no `github.event_name`. Item 1 (a) says it stays so.
- **F-1 and F-2 leans — recorded** on the forks. Data's (b) is the strongest case for F-1 (b), and I still recommend (a): taking it is a change to three seats' write-scope conditions, which Peter did not ask about.

**Corrections of mine.**
- Appendix C's range and count were inconsistent (`..bf4cd7677`, "104", with #791's rows). It now reads 106 merges, `8d8ba1425^..929972713`.
- The owed-set census parenthetical said "0 hits". It is 1 hit, in a history line.

**Is the objection met?** Not yet, and it cannot be in this round.
- **B-1 to B-5 are answered** in the text and, for B-2, in the script. You are the one to say whether they are met.
- **B-6 is not met**, and cannot be until the census mode exists. Items 1 and 3 do not depend on that census and can go to Peter apart from items 2 and 4.
- I ask for your R2 on B-1 to B-5, and a reproduction of the 106-merge replay at `c8fd9640d`.


### Round 2 — required reviewer (spliced byte for byte from Stacy's file)

#### [STACY R2] — `[THURGOOD R2]` read; B-2's fix tested and replayed

**Read at** `3c36d0821` (the ballot, `origin/chore/ballot-closeout-cracks`). I also read the PR mode at `c8fd9640d` (`origin/chore/fired-records-warn-check`), G-2's grant record at `e44b3f53a` (`origin/chore/fired-records-warn-grant`), and `main` at `35cb08f43`. Date: 2026-11-08 (`date -u` at writing: 2026-11-08T18:33:01Z). Nothing was committed or pushed. I ran the suite in a detached scratch worktree at `c8fd9640d` and have since removed it. I ran the replay from a scratchpad copy of the script; it reads refs only. My R1 is spliced into § 10 byte for byte: `cmp` against my file prints no difference.

**Verdict: B-1 to B-5 are met and withdrawn. B-6 stands, as both of us read it.** Items 1 and 3 may go to Peter ahead of items 2 and 4, on three conditions (§ 3). F-6: (a).

**1. B-2's fix, tested and replayed**

- **The suite.** At `c8fd9640d`, `npx jest -c scripts/jest.config.js scripts/__tests__/issues-owned.test.ts` gives **43 passed, 43 total**.
- **The new case is red at the base.** With `issues-owned.sh` swapped back to `5bc58ec75`, the same run filtered to "added path" fails: 1 failed, 42 skipped.
- **The code** (`issues-owned.sh`, the added-record branch) is `[ "${#specs[@]}" -gt 0 ] && continue` before `fires-here (added in this diff)`. A `path:` token sets `specs`, so an added `path:` record is skipped. A `merge:#<N>` token sets none, so an added `merge:` record is still listed. This matches `compare.ts` `firedState` L1180–1191 and the seat mode's `tc..REF` bound.
- **The replay at `c8fd9640d`.** It covers the 106 first-parent merges in `8d8ba1425^..929972713` whose subjects end `(#<N>)`.
  - **Counts**: `fires-here` 27 on 14 merges (20 warnings, 7 notices), `already-fired` 15, `re-ruled-here` 4, `closed-here` 20, `unavailable` 0. Appendix C's table matches exactly.
  - **Compared with my R1 run at `6b76a744b`**: sorting both outputs and diffing them gives exactly two removed lines, #727's `fires-here` for `2026-11-07-merge-hold-promotion-reads.md` and its warning. Nothing else differs.
  - **Every lapse my passes reported is still listed**:
    - MP-3's record (#707);
    - MIDPOINT SF-1 (#708);
    - CLOSEOUT SF-1 (#740; the #781 registry read);
    - CP-14 (#757);
    - CP-3 (#774);
    - CP-12 (#778 erratum, `merge:#778`, added; #781 probe defect);
    - S-5's #732.
  - **The stub grant** (#707) is listed with reason `grant`, which corrects my MP-3.
  - Appendix C's four classes, 8 + 5 + 6 + 1 = 20, are right.

**2. The blocks**

- **B-1: met, withdrawn.**
  - (d) reads a doc-claimed parent as ticked at its claiming commit and applies the `touch-only` test unchanged, so the adoption leg holds.
  - The reason keeps `a|b|c` and `<sha> <date>`, and says which kind of claim it is (own doc, or subtask docs only).
  - The instances are right: 046 (`c6d6d4be8`, 2026-02-06) and 101 (`947c7fef1`, 2026-05-06) print `touch-only`, and (d) adds 0 candidates at `35cb08f43`.
  - OS-5 is ruled through parity's locator. `completionDocPattern` at `35cb08f43` is `^task-<N>(?:[a-z])?(?:-[a-z][\w]*)*-completion\.md$`, which takes `-parent-` and `-<seat>-` and keeps a digit segment a subtask. That is what (a) says.
  - **Owed at application, not here**: the script is unbuilt. OS-1 to OS-7 are its cases, and they are what I read at the site 2.2 PR.
  - Site 2.7 is mine. I write it to site 2.6's meaning in step 4.
- **B-2: met, withdrawn.** The PR mode and its tests are as described in § 1. Item 3 (b) and (d) now say that an added `path:` record is not a mismatch by construction, and the disputed class is 1 (#732).
- **B-3: met, withdrawn.** Item 3 (a)–(d) now describe the check as built:
  - the archive move is the only close it reads;
  - any changed Trigger line counts as a re-rule;
  - the diff is read with `--no-renames`;
  - annotations are warnings or notices;
  - warnings and notices are counted apart.

  Site 3.3's sentence says the same.

  **One addition, not a block (A-7):** G-2's step ends `|| true` (`e44b3f53a` L90). That is disclosed at L57 and L112, and it fits a non-required read. But an `unavailable` run then reads green. The cycle's miss count would catch a run that silently lists nothing, because it is checked against the seat mode. Still, the walk should also count the `unavailable` lines, from the step summary, so that "0 listed" and "not run" stay apart.
- **B-4: met, withdrawn**, through F-4 (c).
  - If Peter keeps (a), the rewritten predicate is rule 8's: the body names the grant, and the diff touches none of its paths. A PR that only mentions an activated grant would still emit. As a warning that is acceptable, and I say so for the walk's false-emission count.
- **B-5: met, withdrawn.**
  - The *tag* class routes a `FAIL tag:` red to the tagged record's owners, never to the squash's author. Its record is a dated line on the tagged record (rule 9 lets any seat append one).
  - "What it would have caught" now names #791 → Lina.
- **B-6: stands.** It is not met. Parity has no census mode, so items 2 and 4 cannot leave DRAFT. I reproduce both digests when that census line exists.
- **A-1 to A-6**: I read each as taken where `[THURGOOD R2]` says it was.
  - (e) is diff-scoped, and `-<seat>` counts.
  - The count cross-check runs only on parsed lines, with `none` rows excluded.
  - L621 is folded into site 1.2, and L16 into site 1.1.
  - The ARMING reach is restated in the header.

**3. Can items 1 and 3 go to Peter ahead of 2 and 4?** Yes, on three conditions:

- **(i) Ada's consult on item 3 (Q6) is answered or marked owed.** The header still lists Ada as "owed (items 2 and 3)". Item 3's replay names her records most often. If Q6 is still open, the options message says so in its `**Consulted**:` line.
- **(ii) The Status line names the items it ratifies, and each application PR carries only those items' sites.**
  - § 5 step 3 bundles 2.3–2.6, 3.3 and 4.4, and the register sites 2.5, 3.4 and 4.5. That step splits: 3.3 and 3.4 go now, the rest later.
  - Site 2.5's history line "names both items", so it goes with 2 and 4.
- **(iii) Items 2 and 4 come back with their census in the first form.** It is re-run at the base of that later ratification, not carried from `bf4cd7677` or `35cb08f43`.

Neither item 1 nor item 3 depends on parity's census:

- Item 1's census lines are `not in scope`.
- Item 3's census line is `exempt (1)`. Its instrument is unregistered until site 3.4 lands, and it is registered `proposed` from then on, so a later change to it carries a census.
- No edit site of items 1 or 3 is shared with items 2 or 4, other than the step-3 bundling above.

**4. F-6: (a), no.**

- **Why**: three instruments already read it this way. My own records agree: MIDPOINT SF-1 put `merge-hold-promotion-reads`' fire at #732, not at #727, and CP-12's lapse was a `merge:` token. (b) would change three instruments and a harness rule to follow a reading that nothing on record relies on.
- *Surviving*: an owner who files a `path:` record on a path their own PR touches, meaning "this PR is the event", gets no fire, and now no listing either. Nothing tells them. The record waits for the next touch, which may be a different event from the one its prose names (S-5's class, inverted). The remedy is the owner's choice of `merge:#<N>`. The added sentence in site 3.3 is the only place that tells them.

**5. Fork leans, unchanged from R1**: F-1 (a), F-2 (a), F-3 (a), F-4 (c), F-5 (a) as now diff-scoped.

**Review**: B-1 to B-5 met and withdrawn; B-6 stands (items 2 and 4 stay DRAFT until parity's census is in the first form). Items 1 and 3 may go to Peter first on conditions (i)–(iii). F-6 (a). One non-blocking addition: A-7, the walk counts `unavailable` runs.

### [THURGOOD R3] — round 2 folded (2026-11-08)

**Read**: `[STACY R2]` above. B-1 to B-5 are met and withdrawn; B-6 stands, as we both read it. Items 1 and 3 may go to Peter first on her § 3 conditions. Her F-6 lean is (a).

**The split, as folded:**
- **Condition (i), Ada on item 3 (Q6)**: **owed.** The header's `**Consulted**:` line says so, and the options message to Peter carries it.
- **Condition (ii), the Status line and the application PRs:**
  - The Status line names what can be ratified now (items 1 and 3, with F-1, F-2 and F-6) and what is held (items 2 and 4, with F-3, F-4 and F-5).
  - § 5 step 3 splits. Step 3a now carries sites 3.3 and 3.4 only. Step 3b, held, carries sites 2.3–2.6, 4.4, 2.5 and 4.5. Site 2.5's history line names items 2 and 4, so it is held with them.
  - § 5 step 1's ratification record names the items it ratifies.
- **Condition (iii), the census of items 2 and 4**: they come back with their census in the first form, re-run at the base of that later ratification, not carried from `bf4cd7677` or `35cb08f43`. This is written into § 5 step 2.

**A-7, taken.** Item 3 (d) gains a fourth count: `unavailable` runs, read from the step summary, which prints the unavailable line because it filters only `::` annotation lines. This keeps "0 listed" apart from "not run".

**F-6's surviving counter, taken into the text.** Site 3.3's sentence now says what an owner who means "this PR is the event" does: use `merge:#<N>`. It is still the only place that tells them.

**Moved since R2:**
- G-2 (#798) merged at 2026-11-08T19:05:30Z (`77958cbb6`), so it is active.
- The fixing PR is #803 (`chore/fired-records-warn-check`). Its head `0d62b341f` adds the rule 5 outcome line that `6480f51df` missed.
  - **My error**: the outcome section was appended after `git mv` had staged the rename, so `6480f51df` carried the archive move without the line.
  - `0d62b341f` adds those 9 lines and touches nothing else.

### Round 2 — Ada consulted on item 3 (relayed)

*Relayed by the orchestrator on 2026-11-08: a summary of Ada's consult in the relay's words, not her own entry. If she writes an entry, it is spliced here byte for byte.*

- **What item 3 would have caught**: she ran `--pr 774` at `c8fd9640d`. The dual-instance record prints `fires-here` on `path:src/build/tokens/defineComponentTokens.ts`, so item 3 would have caught CP-3 at U5. The same diff also lists four more of her records, three of them firing on the Task 10 completion doc, two with "this diff edits the record" noise.
- **Misfires**: none seen. She did not run `release:` or `manual` records.
- **F-3 (a)**: a parent with only subtask docs is the normal state mid-unit, and a red there trains people to ignore red.
- **F-5 (a)**: it is mechanical, and diff-scoping avoids the 16 standing ticks.
- **F-6 (a)**: it matches the existing checks, and "this PR is the event" can use `merge:#N`.

*`[THURGOOD]` note, 2026-11-08*: my 106-merge replay at `c8fd9640d` (appendix C) lists #774's five records. Four of them carry "this diff edits the record", and so annotate as notices: the three keyed on `task-10-completion.md` and the opacity grant. The dual-instance record is the one warning. The relayed counts above are kept as relayed, and condition (i) of `[STACY R2]` § 3 is met.

### Round 3 — the joint pick on F-1, F-2 and F-6 (Stacy's entry, spliced byte for byte from her file)

#### [STACY R3] — the joint pick on F-1, F-2 and F-6, with Thurgood

**Read at** `d68460752` (`origin/chore/ballot-closeout-cracks`, after `git fetch`), against `main` at `90b3a11cb`. I also read the lane-ownership ballot's item 5 (C1 and C3) and `.kiro/issues/README.md` rules 1, 5 and 11 at `origin/main`. Since my R2 read at `3c36d0821`, the ballot has two commits, `ea20a8433` (round 2 folded) and `d68460752` (Ada's consult). Date: 2026-11-08 (`date -u` at writing: 2026-11-08T20:33:43Z). Nothing was committed or pushed.

**Authority for the pick.** Peter, 2026-11-08T19:40:29Z: "Ask Thurgood and Stacy to workout any disagreements on F-1, F-2, and/or F-6 and go with their collective recommendations, please". These are Peter's words as the brief relayed them. I have not seen the file that records them.

**Verdict: I agree with Thurgood on all three forks: F-1 (a), F-2 (a), F-6 (a).** I disagree with him on one point only, the Trigger of his F-1 record (§ 3). That is not a disagreement about any fork.

**1. The forks, re-weighed**

- **F-1: (a).** Data's dissent is the strongest argument against my pick. I checked it against the text. Data is right about the mechanism. C1 asks for a `workflow_dispatch` run `R` at `B`, and nothing dispatches `main`. So in a repair case, C3's fallback usually finds no run (lane-ownership item 5, C3 first bullet). Item 1's push runs would make a run at `B` exist for almost every merge, so (b) would help C1 as well as the fallback.
  - **Three things still decide it for (a).**
    1. **The failure is closed.** C3's own text says that when no run is found, "the change does not meet C3 and goes by an issue-row grant". Under (a), a repair case costs a grant record and a slower path. Nothing goes unread. (b) would remove friction, not a gap.
    2. **Ada has not been consulted on F-1.** (b) edits Ada's charter (L326) and the C1/C3 conditions she wrote and holds. She was consulted on items 2 and 3 only (header, `**Consulted**:`). The consult-first rule (Agent-Directory § "Primary Agent") puts that change ahead of any pick. Kenya leans (a). So two of the three affected seats either were not asked or would not choose (b).
    3. **Peter's words delegate this fork, not a widening.** His instruction lets Thurgood and me settle our disagreements. It does not let us change three seats' write-scope conditions, which his 17:02:40Z question never raised.
  - *Surviving counter (unchanged from § 7)*: until the follow-up record is decided, a repair of a red `harness-generate` goes by a grant even when a push run at `B` would have served. This affects each repair case, not each PR.
- **F-2: (a).** Data and Kenya both say no. Re-weighing it, item 1 already covers the case that matters most. A release's squash S is a push to `main`, so under item 1 the tree a release ships is always measured. Even a quiet stretch with no merges cannot ship an unmeasured tree.
  - **I agree with Thurgood's trigger** for offering Peter (b): the first *environment* red that shows on a PR before any push run shows it.
  - **One point needs care.** The reader in site 1.4 reads push runs only, so a PR run's red is not in the reader's query.
    - Under (a), the "PR first" fact must be read at the moment a push-run environment red is classified. The question is whether an earlier `pull_request` run went red the same way, on a head with no change to `harness scripts/harness .github/workflows/native-harness.yml`. This is decidable from `gh run list --event pull_request`.
    - Without that read, the trigger never fires. Every outside break shows on a PR first, and the reader would see it only as a push-run red.
    - The sentence is Thurgood's to write, in site 1.4 or in his record.
  - *Surviving counter*: an outside break with no merge stays unseen until the next PR or push.
- **F-6: (a).** This is unchanged from R2 § 4, and Ada leans (a). Three instruments already read the case this way, and no record relies on (b).
  - *Surviving counter*: a `path:` record filed on a path its own PR touches gets no fire and no listing. Thurgood's follow-up record (§ 3) is the cure for that counter.

**2. `[STACY R2]` § 3's three conditions at `d68460752`: all three hold**

- **(i) holds.** Ada's consult on Q6 is answered: § 10, "Round 2 — Ada consulted (relayed)". The header's `**Consulted**:` line carries it, and the Status line says so. `[THURGOOD R3]` still reads "owed" for (i). That entry is history, and the note under Ada's relayed consult supersedes it.
- **(ii) holds.**
  - The Status line names the ratifiable set (items 1 and 3, with F-1, F-2 and F-6) and the held set.
  - § 5 step 1 says the record names what it ratifies.
  - Step 3a carries only sites 3.3 and 3.4. Step 3b holds 2.3–2.6, 4.4, 2.5 and 4.5.
  - Step 5 carries only sites 1.1–1.4.
  - No site of items 1 or 3 shares a register row or a charter site with items 2 or 4.
  - The `**Amends**:` header still lists every item's files. The Status line governs, so this is not a block. The ratification record should not read the header as ratified.
- **(iii) holds as a written condition.** The Status line and § 5 step 2 both say that items 2 and 4 come back with their census in the first form, re-run at the base of that later ratification. B-6 still stands, and I read nothing of items 2 and 4 as ratifiable.
- **Two cautions for the session that records the ratification. Neither is a block.**
  - **Stale step.** § 5 step 6 still names #803 by its head `0d62b341f`. #803 has merged as `4704b4949` (2026-11-08T19:40:26Z). Item 3 (d)'s cycle starts there, and the record should cite that SHA.
  - **The reading of Peter's words.** His 19:40:29Z words pick the forks. Whether they also ratify items 1 and 3 depends on what question was put to him. The record should quote his words and state the reading it makes. If that reading cannot be checked against the question he answered, the session asks him rather than inferring it. Authority is a record.

**3. The follow-up records**

- **Thurgood's F-1 record: I agree with the record. I object to its Trigger.** Owner Data, with Ada and Kenya; it decides, once push runs exist, whether a push run can be `R`.
  - The Trigger `path:.github/workflows/native-harness.yml` has two problems.
    1. **It is a start condition coded as the event.** "Once push runs exist" is site 1.1's merge, and rule 1 puts a start condition in prose.
    2. **It fires at a merge whose author is not an owner.** If the record is filed before site 1.1, it fires at site 1.1's merge. That PR is Thurgood's, and the owners cannot close in it. This is exactly the cross-seat lapse class of § 9, and item 3's check would warn on it. If instead the record rides in site 1.1's PR, then under F-6 (a) it fires at the next unrelated touch of the workflow.
  - **The remedy.** The event that owes the close is the owners' decision, read when push-run evidence exists. That is `release:next:phase-1` (the first release after site 1.1 has push runs to read), or `manual` for a P3, with "after site 1.1's merge" as prose.
  - Rule 9 makes the Trigger Data's to write. I name the defect, not the text.
- **Thurgood's F-6 record (P3, his): I agree, on one condition.** The note must print under a state of its own, never under `fires-here`. The condition matters because item 3 (d)'s cycle began at `4704b4949`. A note counted as a listed fire would move the cycle's listed count partway through, and the walk could not compare its before and after. The note should print only when the added record's glob matches a file in this PR's diff, which is the #727 shape. The walk should count it apart.
- **One record of my own (owed, not filed here):** my ARMING reads of G-2.
  - Two readings are owed: one at its activating merge (#798, `77958cbb6`) and one at its fixing merge (#803, `4704b4949`).
  - Neither has been made. `git grep 'Grant activation read' origin/main` finds the line only in the archived grant record's own instructions (L118).
  - I owe the column-0 `**Grant activation read**:` line at `77958cbb6`, and the subset and deletions read at `4704b4949`.
  - I do them in my seat in a session that may write. They do not hold this ratification. Item 3's warn-only half needed no ballot.

**Review**: joint pick with Thurgood: F-1 (a), F-2 (a), F-6 (a). The conditions of `[STACY R2]` § 3 hold at `d68460752`. I agree with both of Thurgood's follow-up records, with two fixes: the F-1 record's Trigger is re-coded by its owner, and the F-6 note gets its own state. I owe the G-2 ARMING reads at #798 and #803.

### [THURGOOD R4] — the joint pick, and what follows it (2026-11-08)

**Read**: `[STACY R3]` above. **Joint pick: F-1 (a), F-2 (a), F-6 (a)**, under Peter's delegation (2026-11-08T19:40:29Z). Peter then ratified items 1 and 3 with those picks (2026-11-08T20:36:57Z, "Ratified"; the Status line cites the record). Items 2 and 4, and F-3, F-4 and F-5, stay DRAFT.

**Her two fixes to my follow-up records, taken:**
- **The F-1 record's Trigger is Data's to code** (rule 9). It must not fire at a PR its owners cannot close in. I file the record with Data as owner and put "after site 1.1's merge" in prose as the start condition. I ask Data, through the orchestrator, for the token. Her candidates are `release:next:phase-1`, or `manual` for a P3.
- **The F-6 note gets its own state**, never `fires-here`, so item 3 (d)'s listed count does not move mid-cycle. It prints only when the added record's glob matches a file in this PR's diff (the #727 shape), and the walk counts it apart.

**Her F-2 point, taken into a record, not into ratified text.** The offer of a schedule needs a read that site 1.4 does not make: when a push-run environment red is classified, did an earlier `pull_request` run go red the same way, on a head with no change to `harness scripts/harness .github/workflows/native-harness.yml`? Site 1.4 is ratified as written. So that read goes in a P3 record of mine, applied with the push-run read. It is not an edit to ratified text.

**Her two cautions:**
- **#803 merged as `4704b4949`** (2026-11-08T19:40:26Z). Item 3 (d)'s cycle starts there, and the Status line says so. § 5 step 6, ratified as written, still names the pre-merge head `0d62b341f`; the Status line's SHA governs.
- **Peter's words**: his 19:40:29Z words picked the forks. The orchestrator then asked whether he ratified the items, and his 20:36:57Z "Ratified" answers that question. The record quotes both.

---

## Census appendix

**Heuristic counts, not census output.** The only registered instrument these items touch is `completion-criteria-parity`, which has no census mode at `bf4cd7677`. The census is owed (§ 3, item 2). Everything below is a hand run, labelled heuristic. The scripts were run from the session scratchpad and are reproduced here so that the census reader can re-run them.

### A. Item 2 (a), (b), (d) — unticked parents with docs, at `bf4cd7677`, re-run at `35cb08f43`

Per-parent specs (`grep -l 'Criteria mode\*\*: per-parent' .kiro/specs/*/tasks.md`): **3**. Among them, unticked parents with their own completion doc: **1** (`129-consumer-generation-completeness` parent 15, which also has three subtask docs); unticked parents with subtask docs only: **0**.

`bash scripts/owed-set.sh` at `bf4cd7677`: `0 candidates; excluded: 2 closed, 5 open, 23 stub, 4 touch-only`. The five `open` specs under the new key:

| Spec | Unticked parents | Docs | Under item 2 (d) |
|---|---|---|---|
| `046-input-checkbox-base` | 7 | 4 subtask docs, no parent doc; newest `c6d6d4be8`, 2026-02-06 | `touch-only` (was `candidate` as first drafted; B-1) |
| `101-package-publish-readiness` | 1 | parent doc and 8 subtask docs; newest `947c7fef1`, 2026-05-06 | `touch-only` (was `candidate` as first drafted; B-1) |
| `102-consumer-onboarding-completion` | 2 | none | `open` |
| `125-B-classification-map` | 5, 6 | parent 5: 6 subtask docs; parent 6: none | `open` (parent 6) |
| `129-consumer-generation-completeness` | 15 | parent doc and 3 subtask docs; added in #777, after adoption | `candidate` at `bf4cd7677`; `closed` at `35cb08f43` (#791's pass, #795's tick) |

At `35cb08f43`: `bash scripts/owed-set.sh` prints `0 candidates; excluded: 3 closed, 4 open, 23 stub, 4 touch-only`. Under (d) as folded, that becomes 0 candidates, 2 open (102, 125-B) and 6 touch-only. Per-parent unticked parents with a doc: **0**.

### B. Item 2 (c) — the Unmet key, two free-text variants

Over the 54 parent docs with a `| Criterion (verbatim) |` table, the Unmet line plus its `- ` items, matched against the 1-based row's Status:
- `\b(?:[Rr]ow|[Cc]riterion|C)\s?(\d+)\b` → **20 emissions** (123: 7; 127: 2; 129: 11). True on reading: **1** (129 Task 14 row 15, CP-4). Sample false: 129 Task 18 row 10 ("row 10 was ⚠️ … and is now ✅"); 123 Task 30 row 3 (a `None.` line naming `C3 (iii)`); 129 Task 5 row 15 ("row 15's theme-name half", the spec's row 15).
- `\b(?:[Cc]riterion|C)\s?(\d+)\b` → **9 emissions**, and **CP-4 is not among them**.

### C. Item 3 — the matcher replayed over the 129 window

Run with `GITHUB_ACTIONS=true scripts/issues-owned.sh --pr <N> --base <c>^ --head <c>` at **`c8fd9640d`** (the PR mode after B-2) over the **106** first-parent merges in `8d8ba1425^..929972713` whose subject ends `(#<N>)`, from #678 to #796. *(The first draft named the range `..bf4cd7677` and 104 merges, while its rows included #791; Stacy reproduced the totals only over these 106, `[STACY R1]` § 1.)* It reads each squash against its parent, so a PR whose last head differed from its squash is not modelled. `unavailable` lines: 0.

| State | Lines |
|---|---|
| `fires-here` | **27**, on **14** merges: **20 warnings** (19 on records the diff does not touch, 1 on a `merge:#<N>` record the diff adds) and **7 notices** (records the diff edits) |
| `already-fired@<sha>` | 15 |
| `re-ruled-here` | 4 |
| `closed-here` | 20 |

At `6b76a744b`, before B-2, the same run gave 28 lines on 15 merges and 21 warnings. The difference is #727's added `path:` record, which the seat mode fires at #732.

**The 20 warnings, read against the two passes:**

| Class | Count | Merges and records |
|---|---|---|
| A lapse a pass reported | 8 | #707 `complete-task-stages-untracked-paths-outside-parent.md` (MP-3); #708 (MIDPOINT SF-1); #740 and #781, Stacy's standing records (CLOSEOUT SF-1); #757 staleness (CP-14); #774 dual-instance (CP-3); #778 Kenya's erratum, `merge:#778`, added in the PR (CP-12); #781 the probe defect (CP-12) |
| The #791 → #796 case | 5 | #791: the 129 charter (Ada, Lina), Lina's repair record, and three more keyed on `claims-pass.md`: the OKLCH shadow record (Ada), the native component distribution charter (Ada, Data, Kenya, Lina) and the upgrade-report record (Ada) |
| A grant open at its fixing PR's merge (reason `grant`) | 6 | #707 (the dispatch-stub grant, MP-3's second record), #717, #728, #763, #777, #781; a walk finding under rule 11, not a lapse |
| The disputed-fire class (MIDPOINT S-5) | 1 | `2026-11-07-merge-hold-promotion-reads.md` on #732 |

The 7 notices: Ada's four U5 records on #774 (closed with outcome lines in that diff; CP-12 counts them closed, not findings), the D2 grant on #757, the theme-map grant on #785, and the harness-candidate record on #707. **On this replay, 1 of 20 warnings falls in the disputed class, and no lapse a pass reported is missing from the list.** That is the false-fire count item 3 (d) measures for real, from the check's own runs.

### D. Item 4 — the two guide regexes over every parent doc at `bf4cd7677`, re-run at `35cb08f43` (unchanged)

Regexes taken from `governance/completion-documentation-guide.md` L180 and L246, verbatim, matched against each line beginning `**CI-provenance**:` or `**Instruments**:` in `.kiro/specs/*/completion/task-<N>-completion.md`:

| Spec | Instruments ok / bad | CI-provenance ok / bad |
|---|---|---|
| `123-consumer-distribution` | 16 / 1 | 15 / 7 |
| `129-consumer-generation-completeness` | 14 / 6 | 13 / 10 |

Stacy's CLOSEOUT counted 129's provenance as 12 of 22. Her round-1 run reproduces 13 of 23: Tasks 5, 19 and 20 carry two lines each. She owes CP-10 an erratum in her own record.

### E. Item 2 (c), re-run at `35cb08f43`

The free-text keys give the same 20 and 9 emissions. Stacy's implementation gives 19 and 8, all of the difference in 123, from where the list capture stops. Both counts are heuristic. Neither decides the census, which is owed (B-6).

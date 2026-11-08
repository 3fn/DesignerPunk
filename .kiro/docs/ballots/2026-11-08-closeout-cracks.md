# Ballot Measure: the CLOSEOUT cracks — a harness run on every push to `main`, ticks that match their docs, a PR-time list of the records a merge fires, and the header lines checked against their grammars

**Date**: 2026-11-08 (drafted from 2026-11-08T17:14:59Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; owner of `completion-criteria-parity`, `scripts/owed-set.sh`, `scripts/issues-owned.sh`, `scripts/harness/stability.ts` and `compare.ts`; holder of the CI regime's standing test-lane scope)
**Status**: **DRAFT** — not ratified. No edit site below is applied. A merge of this file's PR ratifies nothing; only Peter's dated words in this Status line do.
**Owner**: Thurgood. Stacy owns the text of her own charter's edit site (§ 4, site 2.7) and of the register row she owns (site 4.5).
**Required reviewer**: **Stacy** — mandate: attack the width, and the false-fire and false-emission arithmetic. She is the census reader, she keeps the ARMING read that items 1, 3 and 4 fire, and she specifies the owed-set script's falsification cases (my charter, LIVENESS).
**Consulted seats**: **owed, not yet performed.** This draft was written in one seat, with no consult round. Before review closes:
- **Data** and **Kenya** — item 1: the push trigger, the `(main)` job suffix, the concurrency group, macOS queue contention, and what a red push run routes to them (§ 6, questions Q1–Q4).
- **Ada** — items 2 and 3, where they touch her: the parity red lands on her Task 15 first (CP-1), and item 3's list names her records most often in the 129 replay (§ 6, Q5–Q6).
- The consults that preceded Peter's ruling (mine and Stacy's, summarised in the ruling record's § "The exchange") are the source of items 1 (a), 2, 3 and 4. They are not a consult on this text.
**Consulted**: none performed at draft — owed: Data, Kenya (item 1); Ada (items 2 and 3). Stacy reviews.
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
- (a) `native-harness.yml` runs on `push` to `main`, as well as on `pull_request` and `workflow_dispatch`. A push run's jobs are named `<context> (main)`, so a push run never reports under a required context name. Push runs share one concurrency group without cancelling a run in progress, so a burst of merges is measured at least at its newest squash, and every squash that ships is contained in a measured tree.
- (b) A push run counts toward neither Decision 6 condition 2 nor condition 3 (as a dispatched run does today). `stability.ts` reports push runs separately from dispatched runs and lists each red push run. A red push run is not a new demotion trigger; where it is an infra fault, Decision 6 step 6's existing trigger (b) reads it.
- (c) **The reader is Thurgood.** The read, its cadence, and what the reader does on a red are written into the demotion-read charter record (site 1.4), which is already Thurgood's standing harness read and is re-homed with it.
- (d) The native-lane-ownership ballot's statement that "the workflow cannot show a red on `main` by itself" is amended by a ledger line (site 1.3). The reference runs that ballot's P1, C1 and C3, and Ada's item 5, rest on stay `workflow_dispatch` runs unless F-1 (b) is ruled.

**Reader — my position on the brief's proposal.** I agree that the reader should be me. I own the comparator and the stability script that read the run, and I already read every promoted context for demotion. A red needs triage before it is anyone's repair: environment, merge skew, or a tree regression. The lane owners (Data, Kenya) own the repair of the first and Ada or the PR author the third, and the triage step routes it to them. **This is not a fork.** The residual is in § 8: I read only when a session opens in my seat.

**What the reader does on a red** (site 1.4, the text):
1. **Same session**: read each failed job's `harness-verdict` and `harness-infra` annotations (they outlive the logs).
2. **Classify**:
   - *infra* (`harness-infra`, no verdict): re-run the failed jobs once (`gh run rerun <id> --failed`). Green → one log line, nothing filed. Infra again → read it as *environment*.
   - *environment* (a toolchain-field mismatch, or the same red on a dispatch at the last green push run's head, with `git diff --quiet <that head> <red head> -- harness scripts/harness .github/workflows/native-harness.yml` exiting 0): route to the lane owner, Data (Android) or Kenya (iOS), under their standing repair scope.
   - *tree regression* (anything else): find the first red squash between the last green push run's head and the red head (dispatch the squashes the concurrency group skipped), and route to that squash's PR author (its `Agent:` line) and to the owner of the failing entry's domain.
3. **File** a root record under rule 10 in the same session: Owner the routed seat, filed by Thurgood. Class **P1 consumer-blocking** when a tier that compiled stops compiling (a release carrying it ships it), else **P2 (guard)**. Trigger `release:next:phase-1`, or `merge:#<N>` once a fix PR exists, so the release walk reads it as a floor-class row.
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
- The header comment (L15–16, L28–29). The trigger sentence gains push and the `(main)` suffix. Two existing sentences are false at `bf4cd7677` and are corrected in the same hunk: "Not a required context. It is in neither EXPECTED_CONTEXTS …" (`harness-android-tokens` is in `EXPECTED_CONTEXTS` since #717, `verify-gate-registration.sh` L95), and "No `if:` in this file reads github.event_name" stays true and is kept.
- Unchanged: the comparator's `--base` choice (L174, L241, L339, L475) already sends every non-`pull_request` run to `--no-base`, so a push run checks the compiles and the expected list, and does not re-check additions or retags, which the PR read.
- **`git diff --numstat` deletions**: the five `name:` lines and the header-comment lines the hunk rewrites; the `on:` block and `concurrency:` are insertions only. Each deleted line is quoted in G-1's `**Deleted lines**:` block (`.kiro/issues/README.md` rule 8).

*Site 1.2 — `scripts/harness/stability.ts` and `scripts/harness/__tests__/stability.test.ts`* (my standing scope; ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` item 1). Merges **before** site 1.1: at `bf4cd7677`, `contextOf` (L178–180) strips only ` (unit-branch)`, so a `(main)` job would be dropped silently.
- `contextOf`: strip ` (unit-branch)` or ` (main)`.
- `ContextAnalysis` gains `pushRuns`; `dispatchedRuns` counts `workflow_dispatch` only (L536 today counts every non-PR run).
- The report line (L592) becomes `Runs recorded: N (p pull-request, d dispatched, q push).` and each context gains `- Push runs on main: q; red: <run id> @ <sha> (<verdict or infra>), …` (or `none`).
- The "Rules applied" sentence (L587) adds: "A push run on `main` counts toward neither condition 2 nor condition 3; red push runs are listed for the reader (ballot 2026-11-08-closeout-cracks item 1)."
- Falsification cases, each red against the base code: a job named `harness-ios-tokens (main)` with `event: push` is attributed to its context and counted as a push run, not dropped and not counted as dispatched; a red push run is listed; a push run never enters condition 2's streak.
- Owed reviews: none under the charter-scope ballot (no change to how iOS queue time, the Xcode pin, condition 3's iOS rule or condition 5 is computed). Kenya and Data are consulted under item 1 anyway, because the `(main)` jobs share their runners.

*Site 1.3 — ballot `2026-11-07-native-lane-ownership` § 2, a ledger line after L68.* L68 stays as ruled. After it:
> *Amended 2026-11-xx by ballot 2026-11-08-closeout-cracks item 1 (ledger line; the sentence above is kept as ruled): from that item's application, `native-harness.yml` also runs on `push` to `main`, so a break that a merge brings shows on `main` at that merge, or, in a burst of merges, at the newest squash of the burst. A break from outside the repository with no merge still shows first on whichever PR, push or dispatch runs next. The reference runs of P1, C1 and C3 and of item 5 remain `workflow_dispatch` runs; a push run is not one.* [Under F-1 (b), the last sentence is replaced by F-1 (b)'s text.]

*Site 1.4 — `.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md`, a new section `## The push-run read` after § "Where each read is recorded".* Owners Thurgood and Stacy (rule 9); I write it, Stacy reviews. Text: the reader rule above (items 1–5 of "What the reader does on a red"), plus:
- **When**: at every session start in my seat (this record's Trigger is `manual`, so `./scripts/issues-owned.sh Thurgood` prints it every session), at every monthly walk and every release S beside the demotion read, and whenever a seat or Peter reports a red push run.
- **The query**: `gh run list --workflow native-harness.yml --event push --branch main -L 5 --json databaseId,headSha,conclusion,status,createdAt`.
- **The log**: one dated line per red read, `<date> run <id> @ <sha> — <infra|environment|tree> — <record filed, or re-run green>`, appended under the section.
- **Honest reach**: between my sessions nothing reads a red but Peter's own GitHub notification for the push his merge made (GitHub notifies the actor of a failed run they triggered; that this reaches Peter depends on his notification settings, unverified).

**Cost.**
- **Runner time**: one harness run per merge. Measured on 2026-11-08: a run takes 3–4 minutes of wall time (runs 42502208361 and 42502210216: `harness-generate` 80 s, then four contexts in parallel, 79–161 s). `main` took 181 first-parent commits from 2026-11-01 to `bf4cd7677`, about 23 a day. The repository is public, so standard runners cost no money.
- **Queue contention, the real cost**: each push run holds two macOS jobs. In a burst of merges, push runs queue against PR runs for the same macOS concurrency. That lengthens PR queue time, which is what Decision 6 condition 5 measures for iOS promotion. The concurrency group caps push runs at one running and one pending; how much this moves condition 5 is a question for Kenya (Q2), not measured.
- **Authoring**: G-1's record and one workflow PR; the `stability.ts` PR with three cases; the ledger line; the record section. About one working session.
- **Reading**: each red costs a triage session; a green costs nothing.

**What it would have caught in Spec 129.** **CP-6**: the push run at `a17cb2b34` (16:21:37Z) would have measured the shipped tree half an hour before Stacy's pass asked for the dispatch (runs 42502208361 and 42502210216, 16:53Z). It would also have measured `c91fb9b15` (#785), `7689dd804` and `5ec03fe25` at their own merges; CP-6 names those three as never measured with U12. It catches nothing else in 129's findings: every other harness red in the window showed on a PR first.

**Census.**
- `**Census**: not in scope — stability.ts and compare.ts — named in no register row's checks (git grep -n -F stability.ts governance/classification-map.md @ bf4cd7677 → 0 hits); Decision 6 is the rule text it follows, and this item changes no condition`
- `**Census**: not in scope — verify-gate-registration.sh and audit:coverage-map — no context name changes: deriveJobContext keeps the last || '<X>' fallback (coverage-map.ts L732); EXPECTED_CONTEXTS unchanged`

**Surviving counter.** **The push run tells us little that the next PR's run would not.** When `main` is broken, every later PR's merge ref carries the break, so the next harness run on any PR goes red anyway. What the push run adds is narrower than it looks: attribution to the squash that broke it, a measurement of the last tree before a release (CP-6's exact case), and a red that no PR author has to debug as their own. It does **not** catch an outside break between merges; F-2 (a schedule) does. If merges are rare in a stretch, the push trigger is nearly idle and the schedule is what would help. Fold-back took in the concurrency group (so a burst cannot flood the macOS queue) and the `(main)` suffix (so a push run never wears a gate name). It could not absorb the residual: on a quiet `main`, item 1 adds almost nothing, and on a busy one it competes with PR runs for macOS time.

---

### Item 2 — parity goes red when a parent's completion doc exists but its box is unticked; the owed-set uses the same key; the Unmet list may not name a met row

**The rule.**
- (a) **Parity red.** In a per-parent spec, a parent whose box is unticked (`- [ ]`) while `completion/task-<N>-completion.md` exists at the scanned tree is a red: `UNTICKED_WITH_COMPLETION_DOC — parent <N>: its completion doc exists and its box is unticked; tick it, or remove the doc`. A poisoned parent stays excluded (its malformation is already red). The informational unticked line counts only parents with no doc.
- (b) **Subtask docs.** A parent whose box is unticked while one of its subtask docs (`task-<N>-<M>-completion.md`) exists, and its own doc does not, is **an emission** (`unticked-with-subtask-docs`), not a red. [F-3 decides this; the brief reads "(or its subtask docs)" as red.]
- (c) **Stacy's companion: the Unmet list names no met row.** From application, each item of the forced-negative list names its row in a fixed form: the item begins `criterion <n>`, with `<n>` the row's 1-based position in the doc's criteria table. Parity emits `unmet-names-met-row — parent <N>: criterion <n> is listed as unmet and its Status is ✅` when such an item names a ✅ row. An item that does not begin `criterion <n>`, in a doc added after application, emits `unmet-item-unnamed`. Docs added before application are read only for the first emission.
- (d) **The owed-set's `open` class uses the same key.** An unticked parent with its own completion doc, or with a subtask doc, does not make its spec `open`. A spec whose every unticked parent has such a doc is a `candidate`; its reason names each such parent and says the box is unticked: `<k> unticked parent(s) with completion docs: <ids> (box unticked; the doc is the claim)`. Its anchor is the first-parent commit that added the newest such doc. A spec with any unticked parent that has no doc stays `open`.
- (e) **[Author's addition — Peter rules, F-5.]** The same key in the other direction: a ticked subtask with no `task-<N>-<M>-completion.md` is an emission, `ticked-subtask-without-doc`. This is the S-4 floor (Task-Completion-Protocol, subtask step 2) that Stacy counts by hand (CLOSEOUT CP-7: 62/66).

**Why (c) has a form, and is not keyed on the existing text.** I ran the obvious key first: any `row <n>`, `criterion <n>` or `C<n>` token in the Unmet line and the list under it, against that row's Status. Over the 54 parent docs with a criteria table at `bf4cd7677` it gives **20 emissions, and 1 of them is true** (CP-4, Task 14 row 15). The others name the spec's own row numbers ("row 15's record"), historical notes ("row 10 was ⚠️ … and is now ✅"), or criteria inside a `None.` line. With `criterion <n>` and `C<n>` only, it gives 9 emissions and **misses CP-4**, which writes "Row 15". A free-text key is noise or blind. The form makes it decidable, and binds forward. (Scripts and output: § Census appendix.)

**Edit sites.**
- *Site 2.1 — `scripts/completion-claims/verdict.ts`* (`evaluateSpec`, L365–376; `formatUntickedLine`, L397–400), `completion-doc.ts` (the forced-negative capture, L282–291, reads the line and the `- ` list items under it up to the first blank line or heading; a subtask-doc locator), and `scripts/check-completion-criteria-parity.ts` (the new finding and emissions in its output). Fixtures under `scripts/completion-claims/__fixtures__/` and cases in `__tests__/`, each red against the base: the unticked-with-doc red; the subtask-doc emission; the Unmet emissions; the poisoned parent still excluded.
- *Site 2.2 — `scripts/owed-set.sh`* (L213–218, the `open` branch) and `scripts/__tests__/owed-set.test.ts`. Stacy specifies the falsification cases (my charter, LIVENESS); my minimum: a spec open only through a doc-carrying unticked parent prints `candidate` with the reason above (red at base, which prints `open`); a spec with one doc-less unticked parent still prints `open`.
- *Site 2.3 — `governance/completion-documentation-guide.md` § "The forced-negative line", L151.* Before:
  > — or a list, **each item carrying a follow-up link**. **Silence does not satisfy it.** (The shape is imported from the Product-Handoff-Protocol's four `None / or list each` forced-negative sections; the line itself is new here.)

  After:
  > — or a list, **each item carrying a follow-up link**. **Silence does not satisfy it.** Each item begins `criterion <n>`, where `<n>` is the row's 1-based position in this doc's criteria table, and names a row whose Status is ⚠️ or ❌. A row that is now met is not listed; its history goes in its Evidence cell or under § "Errata to a completion doc". (The shape is imported from the Product-Handoff-Protocol's four `None / or list each` forced-negative sections; the line itself is new here.) *(amended 2026-11-xx by ballot 2026-11-08-closeout-cracks item 2 (c); prior text at `bf4cd7677`)*
- *Site 2.4 — the same guide, § "The instrument's honest reach" (L369 onward)*, one added sentence: "Parity reads a box against its doc in both directions: an unticked parent whose doc exists is red, an unticked parent with only subtask docs and a ticked subtask with no doc are emissions; the tick is still an assertion, and parity never reads whether the parent's work is done. *(added 2026-11-xx by ballot 2026-11-08-closeout-cracks item 2)*"
- *Site 2.5 — `governance/classification-map.md` row `completion-criteria-parity`*: the `rule` line gains ", and a per-parent parent whose completion doc exists SHALL be ticked"; one `history` line naming this ballot, the red, the three emissions, and the binding. `check_state` stays `armed`. The B-9 scope (emissions on parity's own surface) is widened by the same line to the tick-against-doc and Unmet reads.
- *Site 2.6 — `.kiro/hooks/RELEASE-FLOW.md` L87.* Before:
  > - `open` — at least one unticked parent (`- [ ]` at column 0); the reason gives `N of M` and says a checkbox is an assertion, not a merge fact.

  After:
  > - `open` — at least one unticked parent (`- [ ]` at column 0) with no completion doc and no subtask doc; the reason gives `N of M` and says a checkbox is an assertion, not a merge fact. An unticked parent with a doc makes its spec a `candidate` instead, and the reason names it. *(amended 2026-11-xx by ballot 2026-11-08-closeout-cracks item 2 (d); prior text at `bf4cd7677`)*
- *Site 2.7 — `canonical/agents/stacy.md` L445 and `canonical/profiles/consumer/stacy.overlay.md` L112* — the `open` class, before `` `open` (at least one unticked parent; `` — **Stacy's seat, her text**, to the same meaning as site 2.6.
- *Site 2.8 — `canonical/agents/thurgood.md` L560*, before: `` `open` (an unticked parent, `- [ ]` at column 0 — a checkbox is an assertion, not a merge fact, and the reason says so); `` After: `` `open` (an unticked parent, `- [ ]` at column 0, with no completion doc and no subtask doc — a checkbox is an assertion, not a merge fact, and the reason says so; an unticked parent with a doc makes its spec a `candidate`, and the reason names it); ``. Sites 2.7 and 2.8 regenerate the rendered surfaces (`npm run build:generator`), refresh `canonical/generated.lock`, and need each affected seat's re-confirmation and re-signature (the signing chain; the P1b precedent, #427).

**Cost.**
- **Authoring**: parity change with four fixture cases, the owed-set change with Stacy's cases, five law sites, and two charter sites with their regeneration and signing acts. The charter sites are the expensive part: about one session for the code, and one more for the signing chain across Thurgood's and Stacy's surfaces.
- **On every PR**: a red adds a fix-the-box step. At `bf4cd7677` the red fires on exactly one parent in the repository (129 Task 15), so **application must follow Ada's checkbox PR for CP-1** (§ 5), or every PR in the repository goes red, because parity is a full scan.
- **On the claims passes**: the owed-set may print more candidates. At `bf4cd7677`, three of today's five `open` specs move to `candidate` (046, 101 and 129; 046 through subtask docs only), and 102 and 125-B stay `open`. Each candidate costs Stacy a read; that is the asymmetry her charter already accepts ("a wrong exclusion hides an owe").

**What it would have caught in Spec 129.**
- **CP-1**: (a) reds #777's PR gate, because `task-15-completion.md` was on the branch and the box was not. Ada ticks it before the merge; parity evaluates parent 15 (54/54, as Stacy's scratch copy shows). (d) makes the owed-set print 129 as `candidate` after U12's merge instead of `open`, which is the hidden owe CP-1 names.
- **CP-4**: (c) catches it only under the new form. Under 129's actual text ("Row 15, last clause"), no decidable key both catches it and stays quiet (above).
- **CP-7** (four ticked subtasks without docs, 18.1, 18.2, 18.4, 20.2): (e) emits all four on #781 and #747, if F-5 adds it. It would not catch CP-7's second half (18.4 ticked while its parent row read ⚠️); that is S-4, which this ballot leaves alone (§ 9).

**Census.**
- `**Census**: owed — completion-criteria-parity (scripts/check-completion-criteria-parity.ts, scripts/completion-claims/**) — the instrument has no census mode at bf4cd7677 and its row carries no census field; under ballot 2026-10-19-instrument-census-at-draft § 4 I build it (a per-file sha256 of the canonical surface plus the verdict, from --verify-extraction) as EXECUTION in my scope, and this item does not leave DRAFT until the census line is re-run in the first form. Heuristic hand count: 1 parent in 3 per-parent specs changes verdict (129 parent 15: not evaluated → red); 0 subtask-doc emissions; the Unmet emissions bind forward and fire on 0 docs at application`
- `**Census**: not in scope — owed-set.sh — named in no register row's checks (git grep -n -F owed-set governance/classification-map.md @ bf4cd7677 → 0 hits); heuristic: 3 of 5 open specs become candidates`
- `**Census**: not in scope — 122-diff-guard, canonical-vs-truth, the sweeps and verify-signing-chain — sites 2.7 and 2.8 are their ordinary inputs, regenerated, lock-refreshed and re-signed at application`
- *This draft's first census line is not in any of the README's three forms.* That is a defect of the draft, stated so the census reader does not have to find it: the census mode is owed before ratification can be asked for on this item.

**Surviving counter.** **A red on "doc exists, box unticked" makes the tick a chore an agent clears, not a claim it makes.** The box was never the fact; the merge is. Parity now forces the box and the doc to agree, and the cheapest way through a red is to tick the box, which is exactly what a parent that is *not* done would do to get green. The red moves the failure from "silently unevaluated" to "evaluated", which is better, and parity then checks every row; but it cannot tell a finished parent from a ticked one. Fold-back took in two things: (b) keeps subtask docs at emission, so a unit branch's checkpoint dispatches do not go red after every subtask; and (c) binds the Unmet form forward, so old docs do not light up. What could not be absorbed: the owed-set's new candidates include specs whose box was left unticked for a reason (a parent dropped, or split), and a candidate row will ask Stacy to read each, every release, until someone ticks or rules it.

---

### Item 3 — a PR-time list of the records the merge fires (warn-only for one cycle)

**Its clearest case landed while this was drafted: #791 and #796.** #791, the CLOSEOUT pass (`693b39b54`), added `completion/claims-pass.md`. That path was the Trigger of five root records, the 129 charter and Lina's component-repair record among them. Nobody re-ruled them in #791, and both have harness entries tagged to them. So the harness tag check (`compare.ts`; Req 1.4: a tag is an open root record whose Trigger can fire) failed **every open PR**, `FAIL tag: … FIRED@693b39b54 and that is still open`, until Lina's re-rule merged as #796 (`929972713`). The PR mode built below, run on #791's own diff, lists all five, both of those two included. A lapse that rule 11 counts quietly became a red on every PR, which the next lapse of a tagged record will do again.

**The warn-only half is built outside this ballot.** Peter, relayed 2026-11-08: "Let's pursue that class fix if we aren't already." Listing fired records changes no rule, so its warn-only form needs no ballot. The script is in my standing scope; the CI step is a new non-required workflow, which is an issue-row grant (README rule 8; not one of M1's excluded acts). They are on two branches:
- `scripts/issues-owned.sh --pr` (site 3.1 below), with its cases; the #791 falsification case is red at base, which reads `--pr` as an unknown seat;
- the grant record `.kiro/issues/2026-11-08-fired-records-warn-workflow-grant.md`, on its own branch `chore/fired-records-warn-grant` (`d6b7df5af`), which carries `pr-records.yml`'s exact text (site 3.2 below). It merges first, so the grant list is in a merged record before the diff it bounds (rule 10); the workflow is then added to `chore/fired-records-warn-check`, the fixing PR.

**What stays in this ballot**: the law and register text that names the check (sites 3.3 and 3.4), the cycle's counts, and the later decision on a failing version, which is a required context and Peter's. Item 3 can be ratified on its own; nothing in it depends on items 1, 2 or 4.

**The rule.**
- (a) On every pull request, a non-required check, `fired-records`, lists each root `.kiro/issues/` record at the PR head whose Trigger fires at this PR's merge, by the same matching `issues-owned.sh` uses: a `path:` token (or list) whose glob matches a file in `git diff --name-only <B> <m>` (`B` the merge base, `m` the head), with the same `:(glob)` pathspec; and a `merge:#<N>` token whose `<N>` is the PR's own number (the brief's `merge:#this`).
- (b) Each listed record is printed with its owners and one state:
  - `fires-here` — it fires at this merge, and this diff neither closes it (rule 5: archive move, or a dated outcome line added) nor re-rules it (a changed `**Trigger**:` line);
  - `closed-here` or `re-ruled-here` — it fires, and this diff closes or re-rules it;
  - `already-fired@<sha>` — it fired at an earlier first-parent commit (`issues-owned.sh`'s own read at the base), so this merge is not its event.
  A `fires-here` grant carries the reason `grant`: grants do not lapse (rule 11), and one still open after its fixing PR's merge is a walk finding (rule 5). A record **added** in this diff whose Trigger fires at this merge is `fires-here`: its Trigger line is new, not changed (CP-12's erratum is this case; the 129 replay shows a naive diff calls it re-ruled).
- (c) Each `fires-here` line is a `::warning title=fired-records::` annotation: `<path> (<owners>) fires at this merge — <token>; under rule 11 it lapses here unless this diff closes or re-rules it`. The job also writes the list to its step summary. **It never fails** in the cycle; it exits 0, like `issues-owned.sh`.
- (d) **The cycle** runs from the check's merge through the first monthly walk at least 28 days after it. That walk's record carries three counts:
  - **listed**: `fires-here` lines on PRs that merged;
  - **mechanical mismatches**: records listed at a merged PR's last head that `issues-owned.sh` does not print `FIRED@<that squash>` for after the merge, plus records it does print `FIRED@<squash>` for that the check did not list (misses);
  - **owner-disputed fires**: listed records whose owner writes, on the record, that the touch was not the event its prose names (MIDPOINT S-5's class; `merge-hold-promotion-reads` fired on #732).

  **The false-fire count** is the mismatches plus the disputed fires.
- (e) **The later decision.** At that walk I offer Peter three options with the counts: **fail** (the check fails a PR with a `fires-here` line; it becomes a required context, which is an `EXPECTED_CONTEXTS` change and his branch-protection act), **keep warn-only**, or **retire**. Nothing in this ballot decides it.

**Edit sites.**
- *Site 3.1 — `scripts/issues-owned.sh`*, a PR mode: `--pr <N> --base <ref> --head <ref>` (**built**, `chore/fired-records-warn-check` @ `5bc58ec75`, standing scope). It uses the seat mode's token reading and `:(glob)` matching, reads records at the head (so a record the PR adds is seen), reads a record re-ruled in the diff by its base token, and exits 0 always. Cases in `scripts/__tests__/issues-owned.test.ts` ("--pr (fired-records)", 10 cases, 42/42 with the seat mode's): #791's shape; an added record firing at its own merge; re-ruled; archived; edited; a list; already-fired; the quiet cases; the annotations; fail-soft.
- *Site 3.2 — `.github/workflows/pr-records.yml`, new, through the grant record above, called G-2 here* (Owner Thurgood; `**Grant paths**: .github/workflows/pr-records.yml`; ARMING line on the activating PR). On `pull_request`, one job `fired-records` with `fetch-depth: 0` and `permissions: contents: read`. No `if:`, no `continue-on-error` (the script exits 0 by design). Not added to `EXPECTED_CONTEXTS` or `complete-task.sh`'s `REQUIRED_WORKFLOWS`. Item 4 (c)'s ARMING step is **not** in G-2. If F-4 keeps it, it needs a dated amendment to G-2 before its fixing PR, which adds a second step and `pull-requests: read`.
- *Site 3.3 — `.kiro/issues/README.md` rule 6*, one sentence after "The headline prints …": "Between walks, the `fired-records` check lists on each PR the records its merge fires, by rule 1's `path:` and `merge:#<N>` tokens with `<N>` the PR's own number; it warns and never fails until Peter rules otherwise (ballot 2026-11-08-closeout-cracks item 3). The walk after its first cycle records its listed, mismatch and disputed counts." (README edits cite their ballot inline; no pointer is owed.)
- *Site 3.4 — `governance/classification-map.md` row `issues-obligation-lapse`*: `checks` becomes `["fired-records (warn-only; .github/workflows/pr-records.yml -> bash scripts/issues-owned.sh --pr; non-required; ballot 2026-11-08-closeout-cracks item 3)"]`, `check_state` stays `proposed`, one `history` line.

**Cost.**
- **Authoring**: done for the script (`5bc58ec75`) and the grant record (`d6b7df5af`), one session; one workflow PR remains, after G-2's activating merge.
- **On every PR**: one Ubuntu job of under a minute (a full-history checkout, then a diff and a loop over about 80 root records), and a warning on the PRs that fire something.
- **On the walk**: the three counts, read from the annotations (which outlive the logs) and from `issues-owned.sh` after each merge. A query, not a recollection.

**What it would have caught in Spec 129.** From the PR mode replayed over every first-parent merge from `8d8ba1425` to `929972713` (§ Census appendix C; it reads each squash against its parent, not each PR's last head against its merge base):
- **#791 → #796**: on #791, all five records keyed on `claims-pass.md`, the charter and Lina's repair record among them, which then failed the tag check on every open PR.
- **CP-3**: `fires-here` on #774 for `2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` (Ada).
- **CP-14**: `fires-here` on #757 for `2026-10-12-generate-staleness-decided-by-file-times.md` (Ada).
- **CP-12**: `fires-here` on #778 for `2026-11-08-kenya-u11-link7-erratum.md` (Kenya; added in that PR), and on #781 for `2026-11-08-probe-swift-providerreads-not-mainactor.md` (Kenya).
- **CLOSEOUT SF-1**: on #781 for `2026-10-20-in-lane-registry-arming-reads.md`, and on #740 for `2026-10-25-arming-read-class-option-fork.md` (Stacy). Its later touches (#756, #769, #779 and others) print `already-fired@<sha>`, not a fresh warning.
- **MIDPOINT SF-1**: on #708 for the same registry record.
- **MIDPOINT MP-3**: on #707 for the two records keyed on `task-5-completion.md` (`2026-11-06-native-harness-dispatch-stub-grant.md`, `2026-11-06-complete-task-stages-untracked-paths-outside-parent.md`).
- It would **not** have closed any of them: it warns the PR author and names the owner, who may not be the author. Whether a warning changes behaviour is what the cycle measures.

**Census.**
- `**Census**: exempt — (1) the instrument does not exist at bf4cd7677 (issues-obligation-lapse carries checks: []); ran: scripts/issues-owned.sh --pr @ 6b76a744b over the 129 window's first-parent merges (§ Census appendix C); count: heuristic, 28 fires-here lines on 15 of 104 merges, 21 of them warnings (appendix C)`
- `**Census**: not in scope — check-section-citations, 122-diff-guard — site 3.4 is an ordinary governance/ input; no citation is added`

**Surviving counter.** **A warning on the PR goes to the wrong seat.** The record's owner is often not the PR's author: the claims pass #791 fires five records owned by Ada, Lina, Kenya and Data, and Stacy writes the pass. Under rule 11, every one of them lapses at that merge unless the pass PR closes it, and rule 9 forbids Stacy to close another seat's record. So for one class of record — a `path:` trigger on a file another seat writes — the warning reports a lapse nobody could have prevented in that PR. That is a fault of rule 11 against cross-seat path triggers, not of the check, and it is outside this ballot (§ 9). But it means the `fail` option in (e) cannot be ruled on the counts alone: a failing check would block the claims pass for records it may not touch. Fold-back took in the `already-fired` state (so standing records do not re-warn on every touch) and the added-record case. What survives: the warning's audience and the record's owner are different people, and the check cannot fix that.

---

### Item 4 — S-3: the header lines checked against their published grammars (emission-only first)

**The rule.**
- (a) One module, `scripts/completion-claims/header-lines.ts`, holds the published grammars verbatim: the CI-provenance regex (`completion-documentation-guide.md` L180), the Instruments regex (L246), item 2 (c)'s Unmet item form, and the ARMING literal. A test asserts each regex string equals the guide's code span, so a guide change that the module does not follow goes red in the module's own test. Items 2 and 3 build on it: item 2's Unmet read and item 3's PR-body read use its parsers.
- (b) **Completion docs** — parity, diff-scoped against the merge base (as its declaration duties already are), reads each parent completion doc the PR adds or changes and emits:
  - `ci-provenance-missing` (no line) and `ci-provenance-malformed` (a line that does not match);
  - `instruments-line-malformed`, and the guide's decidable cross-checks: `instruments-count-mismatch` (N ≠ E + B + M, or the counts differ from the block's final-state rows and dated `## Found later` entries) and `instruments-path-mismatch` (the path names another spec or parent).

  **Emissions only** in the cycle (F-4).
- (c) **The ARMING line** — step 2 of `pr-records.yml` (site 3.2). When the PR's diff changes a root record's `**Grant paths**` block so that it names a `.github/` path (the predicate of my LIVENESS read 4), the PR body (`gh pr view <n> --json body`, read the way `merge-hold.ts` reads it, fence-aware) must carry a line that begins, at column 0 and outside a fenced block, `**ARMING**: at this merge and at the fixing PR's merge` (rule 8). Otherwise a warning: `arming-line-missing`. Prose may follow the literal (#716 does).
- (d) **The cycle and the decision** are item 3's: the same walk counts emissions, false emissions (a line the grammar rejects that the guide's prose permits, or the reverse), and offers Peter red / keep / retire for (b) and fail / keep / retire for (c).

**Edit sites.**
- *Site 4.1 — `scripts/completion-claims/header-lines.ts`, new*, with `__tests__/header-lines.test.ts` (the guide-equality assertions, and one accept and one reject case per grammar, taken from 129's docs: Task 15's `PR gate #777 @ 7d982b215` rejected; a `see <path>` Instruments line rejected).
- *Site 4.2 — parity's diff-scoped duties* (`scripts/check-completion-criteria-parity.ts`, `verdict.ts`): the five emissions; fixtures red at base.
- *Site 4.3 — `scripts/completion-claims/arming-line.ts`, new*, reusing `bodyLines` from `merge-hold.ts` (L53); called by `pr-records.yml` step 2; exits 0; cases for present, absent, fenced, and prose-after.
- *Site 4.4 — `governance/completion-documentation-guide.md` § "CI provenance" rule 1 and § "The instruments line and block"*, one sentence each: "Parity emits on a doc the PR adds or changes whose line is missing or does not match this grammar (ballot 2026-11-08-closeout-cracks item 4); it does not fail the PR. *(added 2026-11-xx by ballot 2026-11-08-closeout-cracks item 4)*"
- *Site 4.5 — `governance/classification-map.md` row `parent-instrument-existence`* (Stacy's row, her ruling): `checks` gains the parity emissions; `check_state` `none` → `proposed`; "Never a gate" stays true while the read emits. Parity's own row gains the same emissions in its history line (site 2.5's line names both items).

**Cost.**
- **Authoring**: one module with its guide-equality test, five parity emissions with fixtures, the ARMING script. About one session, most of it fixtures.
- **On every PR**: nothing extra for docs (parity already runs); the ARMING step is inside item 3's job.
- **On authors**: a unit PR whose doc lines are malformed gets emissions to fix. In 129, 6 of 20 Instruments lines and 10 of 22 provenance lines would have emitted.

**What it would have caught in Spec 129.**
- **CP-9** (and MIDPOINT MP-8): six Instruments lines (Tasks 13, 15, 16, 17, 18, 20) emit `instruments-line-malformed`; Task 14 and Task 20 emit `instruments-count-mismatch` (27 listed against 28 rows; 14 against 15). Task 18's unresolved `MISSING` rows are not a grammar matter and are not caught.
- **CP-10**: ten provenance lines emit `ci-provenance-malformed`, on Tasks 8, 9, 11, 13–18 and one of Task 20's (MIDPOINT's three included; this is Stacy's self-correction case).
- **ARMING**: nothing. Neither pass found a missing or malformed activation line in 129; the ARMING half is prospective (F-4 offers to drop it).

**Census.**
- `**Census**: owed — completion-criteria-parity — as item 2; the emissions change no verdict, but they are output the claims pass reads, so I treat them as in scope rather than claim the messages-only carve-out. Heuristic, my run of the two guide regexes over every parent doc at bf4cd7677: 129 Instruments 14 ok / 6 bad; 129 provenance 13 ok / 10 bad of 23 lines; 123 Instruments 16 / 1, provenance 15 / 7. My 129 provenance count (23 lines) differs from Stacy's (22); both are reported, and the census, once it exists, decides`
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
| `scripts/issues-owned.sh`, `issues-owned.test.ts` | 3.1 | standing scope (**built**, `5bc58ec75`) | Thurgood |
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

1. **Ratification record.** The session that receives Peter's words updates this Status line and commits it, before any site is applied (README § "The Ratification Protocol"). G-1's grant record is filed in the same PR (rule 10: a grant list is in a merged record before the diff it bounds). G-2's is already written (step 6).
2. **Census, then item 2's and item 4's code** (one PR, mine). First the census mode for parity (EXECUTION under ballot 2026-10-19 § 4) and the register's `census` field; then the census is re-run at the PR's base, compared with this ballot's appendix, and the instrument change ships. **Precondition**: Ada's checkbox PR for CP-1 has merged (`git show origin/main:.kiro/specs/129-consumer-generation-completeness/tasks.md | grep -c '^- \[ \] 15\.'` prints 0), or this PR goes red on itself and blocks every PR after it. The PR body carries the `**Straggler sweep**:` line for `check-completion-criteria-parity.ts` and `owed-set.sh` (README § "Conventions").
3. **Law sites 2.3–2.6, 3.3, 4.4, and register sites 2.5, 3.4, 4.5** (one PR, mine, Stacy's word on 4.5). `**Edit kind**:` LAW lines citing this ballot; dated pointers on `governance/**` and RELEASE-FLOW; `validate-steering-metadata.js`; docs MCP `rebuild_index`.
4. **Charter sites 2.7 and 2.8** (one PR; Stacy writes 2.7 in her seat). `npm run build:generator`, lock refresh, re-confirm and re-sign each affected surface (`verify-signing-chain --audit --pr <n>`).
5. **Item 1, code first**: the `stability.ts` PR (site 1.2), then the activating PR for G-1 with its ARMING line, then the workflow PR (site 1.1). Sites 1.3 and 1.4 ride with the workflow PR. **ARMING** fires at G-1's activating merge and at the workflow PR's merge (Stacy's row).
6. **Item 3** is already under way outside the ballot. G-2's record is on `chore/fired-records-warn-grant` (`d6b7df5af`), and its PR activates G-2. The PR mode is on `chore/fired-records-warn-check` (`5bc58ec75`), which becomes the fixing PR once `pr-records.yml` is added after G-2's activating merge. The cycle of item 3 (d) starts at that merge, whose date goes in G-2's outcome line. Sites 3.3 and 3.4 land with step 3, after ratification. Item 4 (c)'s `arming-line.ts` (site 4.3) follows only if F-4 keeps it, under a dated amendment to G-2.
7. **Peter's act (b)**, if he takes it: his words and the time of the toggle are recorded by the session that receives them, in an evidence record cited from this ballot's Status line. No agent changes the setting.
8. **Straggler sweep** over each item's edit class (`git grep -n -F` for `pull_request` and `workflow_dispatch` in `harness/README.md` and the charters; for `unticked` across `canonical/`, `governance/`, RELEASE-FLOW; for `Unmet or partially met` in `governance/`), listed in the last PR's body.

---

## 6. Questions for the consulted seats (owed before review closes)

- **Q1 (Data, Kenya)** — Does a push run need anything the PR run does not: a different cache key, a toolchain step that reads the event, a lane behaviour on `--no-base`?
- **Q2 (Kenya)** — The macOS concurrency: with at most one push run running and one pending, how much does a merge burst move condition 5's queue time? Is the group enough, or should push runs skip iOS while an iOS PR run is queued?
- **Q3 (Data, Kenya)** — Is routing "environment" reds to you, with the reader filing the record, the right split? Would you rather be the reader for your platform?
- **Q4 (Data, Kenya)** — F-1: should a push run at the merge base serve as the reference run `R` in P1, C1 and C3? It would give C3's fallback a run to find, where that ballot's `[ADA R1]` A2 and `[STACY R4]` (b) found it "usually does not exist".
- **Q5 (Ada)** — Item 2's red lands on your Task 15 first. Is your checkbox PR for CP-1 on a path to merge before step 2, and is there any reason a box is left unticked on purpose in specs you own?
- **Q6 (Ada)** — Item 3's replay lists your records most often (U5's four, the dual-instance and staleness records). Does a `fires-here` warning on the PR reach you in time, given that you often are the PR's author?

---

## 7. Forks for Peter

Each fork names the option I recommend and its surviving counter. The pick is Peter's.

- **F-1 — Can a push run serve as a reference run?** (item 1)
  - **(a) Recommended: not in this ballot.** P1, C1 and C3 and Ada's item 5 keep `workflow_dispatch` reference runs. *Counter*: C3's fallback keeps failing in exactly the repair case (`[ADA R1]` A2 and `[STACY R4]` (b) in that ballot: nothing dispatches `main` on a schedule, and artifacts expire after seven days), which a push run at the merge base would fix.
  - **(b)** A push run on `main` at `B`, or at a first-parent ancestor of `B` with no change to `harness scripts/harness .github/workflows/native-harness.yml`, serves as `R`. That is edits to Ada's charter (L326), the lane-ownership ballot's P1, C1, C3 (ledger lines), and Data's and Kenya's consults. *Counter*: it widens this ballot into three seats' write-scope conditions, which is a scope change (always LAW, always that seat's consult), and it was not in Peter's question.
- **F-2 — Add a schedule?** (item 1)
  - **(a) Recommended: no.** *Counter*: an outside break with no merge stays unseen until the next PR or push.
  - **(b)** A `schedule:` run on `main` every 6 days or less (Ada's class option in the lane-ownership ballot § 8, "not vetted with Thurgood or Data"; this is my vetting, and Data's is Q1). *Counter*: a third event class for `stability.ts`, macOS time on idle days, and a red no merge caused, which the reader must triage cold.
- **F-3 — Subtask docs: red or emission?** (item 2 (b))
  - **(a) Recommended: emission.** The parent's own doc reds; subtask docs alone emit. *Counter*: a unit that merges with a parent's subtask docs and no parent doc (the 046 shape) is only an emission.
  - **(b) Red, as the brief reads.** *Counter*: every checkpoint dispatch on a unit branch goes red from the first subtask doc until the parent completes. Those runs are feedback, not the gate, but a permanently red feedback run teaches agents to ignore red.
  - **(c)** Red on the parent's doc only, with no subtask-doc read. *Counter*: it loses the 046 shape entirely.
- **F-4 — Item 4's form in the cycle.**
  - **(a) Recommended: emission-only, decided with item 3 at the walk; keep the ARMING half.** *Counter*: emissions are easy to ignore, and the 129 rates (6/20 and 10/22) came from authors who could already read the grammar.
  - **(b) Red for docs the PR adds, from application.** *Counter*: it changes Stacy's `parent-instrument-existence` row's "Never a gate", which is her ruling. A first red on the grammar would also fall on unit PRs already in flight.
  - **(c) As (a), without the ARMING half.** *Counter*: the ARMING half caught nothing in 129, so it is a guard with no observed miss. Dropping it saves one script.
- **F-5 — Item 2 (e), the reverse key (ticked subtask with no doc → emission).** [Author's addition.]
  - **(a) Recommended: include.** It is the same tick-against-doc read, cheap, and it turns Stacy's S-4 hand count (CP-7) into a line.
  - **(b) Leave it out.** *Counter*: it was not in Peter's question, and S-4's harder half (a tick that contradicts its parent row) stays a judgment either way.

**Not a fork: the reader.** The brief proposes me; I agree (§ 3 item 1). If Peter or the lane owners would rather the reader be the lane owner per platform, Q3 asks them, and their answer may make it a fork in review.

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
- **Concentration.** Every new instrument here is mine, and the one standing read is mine. If I am wrong about a grammar or a key, the instrument that is wrong and the steward who would notice are the same seat. Stacy's census read, and her ARMING read at each workflow merge, are the only outside reads. Her review should test that, not only the text.
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

*(Empty at draft. Stacy's review, and the Data, Kenya and Ada consults, are spliced here byte for byte from their own files, and folded at `[THURGOOD R2]`.)*

---

## Census appendix

**Heuristic counts, not census output.** The only registered instrument these items touch is `completion-criteria-parity`, which has no census mode at `bf4cd7677`. The census is owed (§ 3, item 2). Everything below is a hand run, labelled heuristic. The scripts were run from the session scratchpad and are reproduced here so that the census reader can re-run them.

### A. Item 2 (a), (b), (d) — unticked parents with docs, at `bf4cd7677`

Per-parent specs (`grep -l 'Criteria mode\*\*: per-parent' .kiro/specs/*/tasks.md`): **3**. Among them, unticked parents with their own completion doc: **1** (`129-consumer-generation-completeness` parent 15, which also has three subtask docs); unticked parents with subtask docs only: **0**.

`bash scripts/owed-set.sh` at `bf4cd7677`: `0 candidates; excluded: 2 closed, 5 open, 23 stub, 4 touch-only`. The five `open` specs under the new key:

| Spec | Unticked parents | Docs | Under item 2 (d) |
|---|---|---|---|
| `046-input-checkbox-base` | 7 | 4 subtask docs, no parent doc | `candidate` |
| `101-package-publish-readiness` | 1 | parent doc and 8 subtask docs | `candidate` |
| `102-consumer-onboarding-completion` | 2 | none | `open` |
| `125-B-classification-map` | 5, 6 | parent 5: 6 subtask docs; parent 6: none | `open` (parent 6) |
| `129-consumer-generation-completeness` | 15 | parent doc and 3 subtask docs | `candidate` |

### B. Item 2 (c) — the Unmet key, two free-text variants

Over the 54 parent docs with a `| Criterion (verbatim) |` table, the Unmet line plus its `- ` items, matched against the 1-based row's Status:
- `\b(?:[Rr]ow|[Cc]riterion|C)\s?(\d+)\b` → **20 emissions** (123: 7; 127: 2; 129: 11). True on reading: **1** (129 Task 14 row 15, CP-4). Sample false: 129 Task 18 row 10 ("row 10 was ⚠️ … and is now ✅"); 123 Task 30 row 3 (a `None.` line naming `C3 (iii)`); 129 Task 5 row 15 ("row 15's theme-name half", the spec's row 15).
- `\b(?:[Cc]riterion|C)\s?(\d+)\b` → **9 emissions**, and **CP-4 is not among them**.

### C. Item 3 — the matcher replayed over the 129 window

For each first-parent commit `c` in `8d8ba1425..bf4cd7677` whose subject ends `(#<N>)` (104 merges), each root record at `c` whose `path:` globs match `git diff --name-only c^ c` (as `:(glob)` pathspecs), or whose `merge:#<N>` equals the merge's own number. The replay reads the squash, not each PR's last head. A naive "Trigger line in the diff" test calls a record **added** in the diff re-ruled; the replay shows that on #778, and site 3.1's added-record case fixes it.

Run with `scripts/issues-owned.sh --pr <N> --base <c>^ --head <c>` at `6b76a744b` (the PR mode with the grant reason) over the 104 merges whose subject ends `(#<N>)`. It reads each squash against its parent, so a PR whose last head differed from its squash is not modelled.

| State | Lines |
|---|---|
| `fires-here` | **28**, on **15** merges: 21 warnings (19 on records the diff does not touch, 2 on records the diff adds) and 7 notices (records the diff edits) |
| `already-fired@<sha>` | 15 |
| `re-ruled-here` | 4 |
| `closed-here` | 20 |

**The 21 warnings, read against the two passes:**

| Class | Count | Merges and records |
|---|---|---|
| A lapse a pass reported | 9 | #707 ×2 (MP-3); #708 (MIDPOINT SF-1); #740 and #781, Stacy's standing records (CLOSEOUT SF-1); #757 staleness (CP-14); #774 dual-instance (CP-3); #778 Kenya's erratum, added in the PR (CP-12); #781 the probe defect (CP-12) |
| The #791 → #796 case | 5 | #791: the 129 charter (Ada, Lina), Lina's repair record, and three more keyed on `claims-pass.md`: the OKLCH shadow record (Ada), the native component distribution charter (Ada, Data, Kenya, Lina) and the upgrade-report record (Ada) |
| A grant open at its fixing PR's merge (reason `grant`) | 5 | #717, #728, #763, #777, #781; a walk finding under rule 11, not a lapse |
| The disputed-fire class (MIDPOINT S-5) | 2 | `2026-11-07-merge-hold-promotion-reads.md` on #727 (added in the PR) and #732 |

The 7 notices: Ada's four U5 records on #774 (closed with outcome lines in that diff; CP-12 counts them closed, not findings), the D2 grant on #757, the theme-map grant on #785, and the harness-candidate record on #707. **On this replay, 2 of 21 warnings fall in the disputed class, about 10%, and no lapse a pass reported is missing from the list.** That is the false-fire count item 3 (d) measures for real, from the check's own runs.

### D. Item 4 — the two guide regexes over every parent doc at `bf4cd7677`

Regexes taken from `governance/completion-documentation-guide.md` L180 and L246, verbatim, matched against each line beginning `**CI-provenance**:` or `**Instruments**:` in `.kiro/specs/*/completion/task-<N>-completion.md`:

| Spec | Instruments ok / bad | CI-provenance ok / bad |
|---|---|---|
| `123-consumer-distribution` | 16 / 1 | 15 / 7 |
| `129-consumer-generation-completeness` | 14 / 6 | 13 / 10 |

Stacy's CLOSEOUT counts 129's provenance as 12 of 22. My run finds 23 lines. Both are reported; the census, once built, decides.

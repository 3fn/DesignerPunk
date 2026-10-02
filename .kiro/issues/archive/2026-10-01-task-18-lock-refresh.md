# Issue + grant: Thurgood refreshes `canonical/generated.lock` on U2b's unit branch from Task 17's close to U2b's merge

**Date**: 2026-10-01
**Status**: CLOSED 2026-10-02 (see § "Closed — 2026-10-02" at the end of this file)
**Owner**: Thurgood.
- Peter's ruling names him.
- He also owns the instrument. The register row `never-hand-edit-122-generated` (`governance/classification-map.md`) carries `verification.owner: thurgood`, with `122-diff-guard` as its check, and the lock is that guard's own write.
**Trigger**: each event under § "When it applies", from **Task 17's parent close** on `task/123-u2b-profile` until **U2b's unit PR opens** (Task 18.3). **Expiry**: when U2b's unit PR merges (README rule 8).
**Source**: Peter's ruling of 2026-10-01, relayed by the orchestrator, and Thurgood's Task 17 branch-cut sweep. The sweep found that, after 17.3's one refresh, merges into the unit branch still move the lock and no parent's grant covers refreshing it.

---

## The ruling, verbatim

Peter, 2026-10-01: **"Retire the relocation-gate checks; Thurgood refreshes the lock in Task 18."** This file records the second half. The first half is recorded in `.kiro/issues/2026-10-01-relocation-integrity-gate-vs-123-install-shape.md`, § "2026-10-01 — Peter's ruling — RETIRE".

## Why a grant is needed

The table below was read on `task/123-u2b-profile` at `24a00821`.

| Parent | Does its row grant the lock? |
|---|---|
| Task 16 | It listed `canonical/generated.lock` (16.1), and Task 16 is closed |
| Task 17 | It lists the lock for **one** refresh, at 17.3, and requires that a re-run at parent close produce no lock diff |
| Task 18 | Its Primary Artifacts are Stacy's verdict record (cited), the U2 completion doc's 24.3 table, and `CHANGELOG.md` (release 2). **The lock is not among them** |

Between Task 17's close and U2b's PR, at least these move the lock's `inputClosure` (outputs unchanged):

- Merging `main` into the unit branch after the out-of-grant residuals PR (`.kiro/issues/2026-10-01-agent-generator-out-of-grant-residuals.md` item 2, which edits `tools/agent-generator/generate.ts`, a closure root, and which lands before 18.1). The lock on `main` is computed over `main`'s tree, so after the merge the unit branch's lock is stale or in conflict.
- The relocation-gate retirement PR (`chore/relocation-gate-retire-a4-a7`), if it merges after Task 17 closes. `mcp-server/src` is a closure root.
- Any other merge of `main` that touches `governance/**`, `.kiro/steering/**`, `canonical/**`, `skills/**`, `tools/agent-generator/**`, the three MCP servers' `src/`, `package.json` or `.kiro/hooks/complete-task.sh`.

## Grant

**Grant paths**: `canonical/generated.lock`

- **Rule 8.** The grant is activated by Peter's merge of the PR whose body names this file and this path list.
  - **The fixing PR is U2b's unit PR.** The refresh commits land on its branch, `task/123-u2b-profile`, and the grant expires when that PR merges.
  - U2b's PR body names this file and its path list. Lina opens that PR at 18.3, and the orchestrator carries this line into her 18.3 brief. It names a grant, not a seat.
  - The grant confers no ratification authority and touches no governance-law path. An edit by Thurgood outside the list, on that branch, is a claims-pass finding.
- **Guard-written only.**
  - The only write is `npm run check:122:diff-guard`'s own full-run write. The lock is **never hand-edited**.
  - The run is made from a checkout of the unit branch at its current pushed head whose `git status --porcelain` is empty. The closure counts untracked files that are not ignored; since #251 it lists from git and excludes ignored files.
  - After the run, `git status --porcelain` shows **only** `canonical/generated.lock`, or nothing.
- **Stop and report; this is not a refresh** if:
  - the guard's `outputs` value moves;
  - the guard asks for a re-sign, or any freshness or signing check fails;
  - the run leaves any file other than the lock changed;
  - resolving the lock would take a hand edit.

  Report to the orchestrator, naming Lina (generator machinery) and Stacy (G2's witness, below). A moved `outputs` means the generated surface changed. That is its owner's work, not this grant's.
- **One commit per refresh**, touching exactly `canonical/generated.lock`:
  - **Subject**: `generated.lock refresh after merging <what> (123)`, the form already on the branch (e.g. `56c5cd7e`).
  - **Body**: carries `Grant: .kiro/issues/2026-10-01-task-18-lock-refresh.md` and ends `Agent: thurgood`.
  - **Push**: fast-forward only, never force, never amend. A rejected push means fetch, re-run the guard from a clean tree at the new head, and commit again.
- **When the triggering merge conflicts in the lock**, the agent making the merge takes either side; the refresh commit then carries the guard's value. The merge itself is not this grant's act.

## When it applies

1. **After each merge of `main`, or of a fixing PR, into `task/123-u2b-profile`**, from Task 17's parent-close commit until U2b's unit PR opens.
   - Run the guard. If it writes no lock diff, there is no commit; record the run in the trigger log below.
   - Merges **before Task 17's close** belong to Task 17: they are absorbed by 17.3's one refresh, or they wait, so that Task 17's close-time re-run produces no diff. They are not this grant's.
2. **Once before 18.1's G2 request**: a confirming run on the head that pass four will be requested on. Its result (no diff, or the refresh commit SHA) is recorded in the trigger log, dated, so that pass four reads a lock that agrees with its tree.
3. **After 18.1's request, no refresh under this grant without Stacy's dated go, recorded in this file.**
   - The lock is part of the tree her verdict reads.
   - A merge that moves it in that window is reported to Stacy and the orchestrator, not refreshed.
   - While `outputs` is unmoved, a stale lock keeps the guard's full path green (Task 17's 17.3 note), so waiting costs a full-path run in CI, not a red.

## The recusal, stated plainly

Thurgood is recused from G2 because he authored the consumer profile's dispositions that the pass-four verdict judges (tasks.md § "Gate seat layout", the G2 row; Task 18's third criterion, "Thurgood authors no line of it").

**This grant does not seat Thurgood in Task 18, and it does not touch the recusal.**

- He authors no line of Task 18's completion doc, the 24.3 table, `CHANGELOG.md`, `g2-consequence-texts.md` or the verdict record.
- He requests nothing of Stacy, reads no verdict, and makes no claim about the G2 tree.
- His name is not added to Task 18's row.

A lock refresh is the guard's mechanical write. Its value is whatever the guard computes from a clean tree, and no disposition, criterion or verdict enters it. Every case in which a refresh would need a judgment (moved `outputs`, a re-sign, a hand-resolved conflict) is a stop, above.

**Why an issue-row grant and not a tasks.md amendment to Task 18's row**:

1. An amendment would put the recused agent's name on the gate's own row. The seat layout chose Lina for Task 18 "so the acceptance claim never sits with the recused seat — no reader can take the recusal as partial". A name on that row can be read as partial even when the act is mechanical.
2. Under the row-grant rule (ballot `2026-09-26-tasks-row-write-scope-grant`), a row grants its PRIMARY and its tiered secondaries. Listing Thurgood there makes him a secondary of the gate parent, and that is a seat.
3. A non-checkbox `tasks.md` hunk is a consult-trigger surface: Lina as the row's PRIMARY, Stacy as the verdict seat. This grant sits outside the line, as Stacy's verdict record does.

**The surviving counter-argument**: a reader of Task 18's row alone will not see that refresh commits land on the branch during her parent. The mitigations are the U2b PR body's citation, the orchestrator's 18.x briefs, and this file's trigger log. Each is weaker than a line on the row.

## Stacy's interest

- **The lock is a witness for G2's pass four.** Pass four reads this tree, and a lock that disagrees with its tree is a weak witness (`.kiro/issues/2026-10-01-generated-lock-input-closure-differs-by-checkout.md` § "Cost today"). That is why there is a confirming run before 18.1, and why nothing is refreshed after 18.1 without her go.
- **Her MIDPOINT read of out-of-list edits** (U2b's merge is U2's MIDPOINT):
  - The lock is outside Task 18's Primary Artifacts, and outside Task 17's after 17.3. This file is the record that puts Thurgood's refresh commits in-list.
  - The mechanical read is `git log --format='%h %s' <Task-17-close>..<U2b-head> -- canonical/generated.lock`. Each commit listed either sits inside another live grant that lists the lock, or carries this grant in its body, has `git show --name-only` equal to exactly `canonical/generated.lock`, and leaves no lock diff when the guard is re-run on it.
  - **Disclosure**: the refresh author is the recused profile author. The read above checks presence and mechanics, never a verdict.

## Consulted

Neither Stacy nor Lina was consulted before this record was filed.

- **Stacy should be told before the first refresh under this grant**, on one question: does § "When it applies" item 3 (no refresh after 18.1 without her go) leave her witness as she needs it?
- **Lina should be told before 18.x begins** that refresh commits may land on her branch, fast-forward, between her merges.

*(Amendment 2026-10-02 — correction: both have now been consulted. **Stacy** read the grant as G2's witness and gave conditions W1, W3, W4 and W5, plus a round-2 addition on lock-move attribution (below); the consult the paragraph above says was owed has happened. **Lina** has been told that refresh commits may land on the unit branch, fast-forward only, between her merges. Peter ruled on the package on 2026-10-02: "Go with your recommendations on all four".)*

## Amendments

*(Amendment 2026-10-02 — dated, append-style; nothing above is rewritten. **The path list is unchanged: `canonical/generated.lock`.** The grant was activated by the merge recorded at A1; these amendments change conditions and records, not what the fixing PR is diffed against, so no re-activation is claimed. Peter merges the PR carrying them, and its body names this file and restates the list.)*

- **A1 — the activating merge (Stacy W5).** The grant was activated by Peter's merge of **#253, `a75e442c`** (2026-10-01), whose body names this file and `canonical/generated.lock`. The wording of § "Grant", Rule 8 above ("the PR whose body names this file and this path list") is read as that merge, never as U2b's merge. U2b's unit PR is the **fixing** PR and the grant's expiry event.
- **A2 — where Stacy's go is recorded (Stacy W3).** § "When it applies" item 3 says her dated go is "recorded in this file". It cannot be: `.kiro/issues/**` is outside her write scope. Her go is recorded by her in **`.kiro/specs/123-consumer-distribution/completion/g2-witness-log.md`**. Every refresh commit body under item 3 cites that path and the commit that carries her go, and so does the trigger-log entry.
- **A3 — the confirming run's head (Stacy W1).** The confirming run before 18.1 names its SHA, **H0**, and the head the request is made on, **H**. Either H0 equals H, or `git diff --name-only H0 H` contains no path under the closure roots or the guarded roots (the roots as defined in `tools/agent-generator/diff-guard.ts` `INPUT_CLOSURE_ROOTS` and `INPUT_CLOSURE_FILES`, and `tools/agent-generator/generate.ts` `guardedRoots`). Commits that touch only `.kiro/specs/**` or `.kiro/issues/**`, such as the log's own commits, 18.0's, and the request record, move no part of the lock. The same test applies to any commit between H0 and H.
- **A4 — what each log entry carries (Stacy W4 and her round-2 addition).** Every entry states: who ran the guard (or that no run was made), the SHA it ran at, the verdict string the guard printed, and the freshness finding count. For a merge that moves the lock, the entry also names **exactly one grant that owns the move**, including the form "deferred to <grant>" (for example a lock move that the residuals fix's merge causes and that VALVE-1's refresh will absorb). **No refresh by this grant in between.** An entry for a merge that moves nothing says so.
- **A5 — the window (gap (b)).** Item 1's window runs **to U2b's merge**, not to the PR's opening, **subject to item 3** after the 18.1 request. An update-from-`main` after the PR opens that moves the lock is then reported, and refreshed only with Stacy's dated go (A2); while `outputs` is unmoved, a stale lock keeps the guard's full path green.
- **A6 — where the trigger log lives (gap (a)).** `.kiro/issues/**` is outside Thurgood's charter write scope, so he cannot append to a log in this file. **The log lives at `.kiro/specs/123-consumer-distribution/lock-refresh-trigger-log.md`**, a path in his scope and not a Task 18 record. Entries there are committed on `task/123-u2b-profile`, authored `Agent: thurgood`. The `## Trigger log` section below stays empty by design and points there. The recusal is unchanged: that file records the guard's mechanical result, never a disposition, criterion or verdict.

## Trigger log

*(Append-only, dated: each triggering merge, the guard's result, and the refresh commit SHA or "no diff".)*

*(Amendment 2026-10-02 — the log lives at `.kiro/specs/123-consumer-distribution/lock-refresh-trigger-log.md`, A6 above. This section stays empty by design.)*

## Closing

When U2b's unit PR merges to `main`, the grant expires. The outcome (the trigger log's last entry, and the count of refresh commits) is recorded here, dated, and the file moves to `archive/` (README rule 5).

---

## Closed — 2026-10-02

*Recorded 2026-10-02 by Thurgood. Nothing above is rewritten; the Status line is the only edit outside this section.*

**Outcome**: the grant expired at U2b's merge, #262 (`669b51b0`, 2026-10-02), as § "Grant" provides (README rule 8). **Refresh commits made under this grant: ZERO.** Checked with `git log 7071e39f --grep='task-18-lock-refresh'`: only #253 (`a75e442c`) and #258 (`2e6fdbed`) mention the file, and no lock-touching commit carries a `Grant:` line naming it.

- **The one lock refresh in the window** was `823c583d` (Lina, `canonical/generated.lock` only), under the VALVE-1 grant (`archive/2026-09-30-valve-1-per-trim-spans.md`). It absorbed three moves, VALVE-1's own (including `outputs`), `fafae2b0`'s, and #259's, so exactly one grant owned them. This grant made no refresh in between, as A4 requires.
- **Confirming runs**: Thurgood's at `7071e39f`, `npm run check:122:diff-guard` → `no-op-green`, freshness findings 0, nothing written. Lina's at the requested head H = `c1b67b8f`, `no-op-green`, freshness 0 (`completion/task-18-1-completion.md` § R2). Stacy accepted Lina's run as the confirming run the request carried.
- **A2 / W3**: `completion/g2-witness-log.md` was never created. No refresh was owed after 18.1's request, so no go was needed.
- **Amendments**: #258 (`2e6fdbed`), A1–A6 above. The trigger log lives at `.kiro/specs/123-consumer-distribution/lock-refresh-trigger-log.md`, where its closing entry is recorded (this section's "Closing" clause).
- **The recusal held**: Thurgood authored no line of Task 18's records.
- **SHA note**: unit-branch SHAs cited above (`7071e39f`, `823c583d`, `c1b67b8f`, `fafae2b0`) exist as objects but are not ancestors of `main`; they reached `main` inside #262's squash. `a75e442c` and `2e6fdbed` are on `main` directly.
- **Moved to `archive/`** by `git mv`, per README rule 5.

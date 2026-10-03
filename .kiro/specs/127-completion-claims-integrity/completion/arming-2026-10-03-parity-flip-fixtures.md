# ARMING groundwork: the falsification fixtures for the `completion-criteria-parity` gate-bite (owed act 1)

**Event**: none fired yet. This is the **specification half of owed act (1)**: the register row `governance/classification-map.md` § "completion-criteria-parity", history 2026-10-02 ("ARMING SITTING … OWED ACTS (1): … Stacy specifying the falsification fixtures and Thurgood building and running them"), and its 2026-09-19 "GATE-BITE OUTSTANDING" line. The ARMING read itself fires later, at the flip PR's merge, and gets its own record.
**Requirement**: Spec 127 `requirements.md` Req 6 AC **6** ("Gate-bite proven red on a throwaway PR (the #121 pattern) before any required flip, cited on the register row"). § 5 item 12 covers the 6.4/6.6 citation.
**Grant**: `.kiro/issues/2026-10-03-completion-criteria-parity-flip.md` (owner Thurgood). It was activated by **#289**, squash `cb28f011`, which adds only the two issue files (`git show --stat cb28f011`).
**Author**: Stacy (specifies) · **Builder and runner**: Thurgood · **Date**: 2026-10-03 · **Read at**: `main` @ `80bbc9fa`. Re-checked at `cb28f011`: #289 changes no checker, workflow or fixture-target path.
**Grain and purpose**: what Thurgood builds and runs on the throwaway PR, what each run must show, and what the flip PR must cite so the ARMING read can be given.
**Why this is its own PR**: the flip PR's diff must be **its grant paths plus `governance/classification-map.md`** (the issue § "Governance paths", clause 6). This record is under `.kiro/specs/**`, so carrying it in the flip PR would put an out-of-list path in that diff.
**Status**: a specification and audit record. **Never a gate**: no pass, at any grain, is a required check, a review gate, or a blocking condition on any PR.

## Orchestrator-routed decisions folded in (2026-10-03; each reversible by Peter)

- **D-1. The optional ratification-record bite (row 7) is DROPPED.** It edits `.kiro/docs/ballots/**`. That path is outside Thurgood's write scope and outside the flip grant, and the grant itself says an issue can never grant a governance-law path. **What is lost**: the CLI's early-return path (`RED: cannot resolve ratification record …`) has no CI-level red. **What is kept**: jest proof (`ratification-record-ballot-absent`, `ratification-record-line-reworded`) and C-open's `ratification record: 2026-09-19 (…)` line, which proves the CI read resolves. The flip record restates this drop.
- **D-2. The Medium finding (§ 5 item 1, Status marks not enforced) goes to Peter as a fork**: fix before the flip, or flip and record it. This record states the finding and the fork and does not pre-empt the pick.

## Event 1 of the grant (its activating merge, #289): read at this record

ARMING fires at the activating merge of an issue-row grant over a `.github/**` path. Two checks:
- **Does the list name a governance-law path?** It does not: the list is `verify-gate-registration.sh`, `completion-criteria-parity.yml`, `canonical/generated.lock`, and the issue explicitly excludes `governance/**`.
- **Are the M1-excluded acts it admits named?** Yes: (a) the new required context and (b) `EXPECTED_COUNT` 18 → 19.

**Event 1 passes.** Event 2, the fixing PR's merge, is read at the flip.

## 0. What the bite has to prove, and what it does not

- **The class coverage is already proven, and the bite does not repeat it.** `scripts/completion-claims/__tests__/fixtures.test.ts` runs 31 encoded fixtures, and `expected-classes.json` holds 17 classes, red at zero. The suite runs in `lane-functional-root`, because `jest.config.js` roots include `scripts/completion-claims`. Local run at `80bbc9fa`: `Test Suites: 6 passed, 6 total · Tests: 154 passed, 154 total`.
- **The bite proves the GATE PATH, which jest cannot reach.** That path has five parts:
  1. the workflow fires on `pull_request` to `main`;
  2. the CLI's exit code turns the check-run named exactly `completion-criteria-parity` to `failure`;
  3. the full scan reaches a real spec tree in the CI checkout;
  4. the **diff-scoped duties actually run in CI**, meaning `GITHUB_BASE_REF` resolves to `origin/main` and `git merge-base` resolves;
  5. **`git log --diff-filter=A --follow` authorship dating works in CI** (`fetch-depth: 0`).

  Parts 4 and 5 have **silent-green failure modes** (§ 5 items 4–5), so each needs its own bite.
- **Exit paths in `main()`**: the per-parent finding, the spec-level finding, the diff-scoped finding (its own `reds++` loop), and the early return on the ratification record. Each path gets at least one isolated bite, except the early return, which was dropped (D-1) and keeps jest proof only.
- **Provenance of every expected line below**: I simulated each fixture with the real CLI at `80bbc9fa` in a scratch repo. The repo was built with `git archive 80bbc9fa` (scripts, `.kiro/specs`, the ratification ballot, package.json), `node_modules` was symlinked, and the base was committed dated 2026-09-01 so that legacy files stay legacy. Fixture commits were dated 2026-10-03. The CLI was run as `npx tsx scripts/check-completion-criteria-parity.ts --base main`. **The CI run is the proof. The simulation only fixes the expected strings.** Base counts will shift if `main` moves, so every count below is written as "base + k".

## 1. The fixture set

### 1.1 The synthetic fixture spec (present in every commit, controls included)

Directory: `.kiro/specs/zz-gate-bite-never-merge/`. It is declared, so the materiality and authorship duties skip it.

`tasks.md`:
- The header `**Criteria mode**: per-parent`.
- Five ticked parents `- [x] N. Fixture parent N` (N = 1–5). Each has its `**Success Criteria:**` block **immediately after the parent line, before its subtask**, holding exactly these three bullets:
  - ``Alpha: `npm run check:completion-criteria-parity` exits 0 on the control commit``
  - ``Beta: the fixture spec declares `**Criteria mode**: per-parent` ``
  - ``Gamma: the control run's SUMMARY line reports `reds 0` ``
- Each of those parents has one ticked subtask `- [x] N.1 Fixture subtask`.
- Ticked parent 6, `- [x] 6. Fixture parent 6 (declared none)`, carries `**Success Criteria:** none — a declared-none parent, present so the waiver path runs in every control`.

`completion/task-N-completion.md` for N = 1–5 (one doc per parent, so the bundled defects cannot collapse into one diff):

```
| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| Alpha: `npm run check:completion-criteria-parity` exits 0 on the control commit | ✅ | `npm run check:completion-criteria-parity` → exit 0 |
| Beta: the fixture spec declares `**Criteria mode**: per-parent` | ✅ | .kiro/specs/zz-gate-bite-never-merge/tasks.md:3 |
| Gamma: the control run's SUMMARY line reports `reds 0` | ✅ | `npm run check:completion-criteria-parity` → `SUMMARY: … reds 0` |

Unmet or partially met criteria: None
```

`completion/task-6-completion.md`: no table, and the line `Unmet or partially met criteria: None`.

### 1.2 The CI fixtures, in push order (one throwaway PR, one push per commit)

Each commit is **the control state plus exactly the named defect**. The commit that introduces a fixture also restores the previous fixture's files to control. Applied to the simulation, each defect alone reproduced exactly the lines below.

| # | Id | Exit path | The defect, exactly | Expected CLI result | Expected red line (verbatim; `…` means the checker's own 80-char truncation) |
|---|---|---|---|---|---|
| 1 | **C-open** (CONTROL) | none | The synthetic spec only | **exit 0**. `SUMMARY: parents evaluated <base+6>, pass <base+6>, fail 0; emissions <base+1>; reds 0`. At `80bbc9fa`: `parents evaluated 27, pass 27, fail 0; emissions 1; reds 0` | None. The check-run conclusion must be **success**. It also proves the full scan is green at the bite base (the DD1 arming-day residual) |
| 2 | **B-omit-real** (omitted row, on a **real** accepted doc) | per-parent | `.kiro/specs/127-completion-claims-integrity/completion/task-3-completion.md`: delete the table row beginning ``| `npm test` is green at parent completion`` | exit 1, `pass <base+5>, fail 1 … reds 1` | `  parent 3: RED [SET_MISMATCH] parent 3: criteria set mismatch — missing from doc: "`npm test` is green at parent completion — **the generator suites read canonical"` |
| 3 | **B-bundle** (per-parent classes, one per parent) | per-parent ×5 | **P1 paraphrase**: the Beta cell becomes `Beta: the fixture spec opts into per-parent criteria mode`. **P2 renumber**: prefix the three cells with `1. ` `2. ` `3. `. **P3 invent**: append the row `\| Delta: the gate-bite proof is cited on the register row \| ✅ \| governance/classification-map.md \|`. **P4 doc declares none**: replace the table with `**Success Criteria:** none — not applicable to this parent` and keep the forced-negative line. **P5 exemption near-miss**: append `Criteria fidelity: exempt - spec in flight at ratification (2026-09-19)` (a hyphen-minus where the fixed string has an em-dash) | exit 1, `pass <base+1>, fail 5; … reds 5`. At `80bbc9fa`: `parents evaluated 27, pass 22, fail 5; emissions 1; reds 5` | Five lines, **all required**:<br>`parent 1: RED [SET_MISMATCH] … missing from doc: "Beta: the fixture spec declares `**Criteria mode**: per-parent`" \| not in tasks.md: "Beta: the fixture spec opts into per-parent criteria mode"`<br>`parent 2: RED [SET_MISMATCH] …` with 3 missing and `not in tasks.md: "1. Alpha: …"; "2. Beta: …"; "3. Gamma: …"`<br>`parent 3: RED [SET_MISMATCH] parent 3: criteria set mismatch — not in tasks.md: "Delta: the gate-bite proof is cited on the register row"`<br>`parent 4: RED [SET_MISMATCH] …` with only the 3 rows missing from the doc<br>`parent 5: RED [MALFORMATION] non-compliant exemption: not the fixed string 'Criteria fidelity: exempt — spec in flight at ratification (<date>)' (parent 5)` |
| 4 | **B-tasks-none-bullets** (a `tasks.md`-state defect) | spec-level | In the synthetic `tasks.md`, directly under parent 6's `none — …` line, add `  - Epsilon: a bullet under a declared-none block` | exit 1. Parent 6 is poisoned and not evaluated. `parents evaluated <base+5> … emissions <base>; reds 1` | `  RED [MALFORMATION] malformed criteria block: 'none' co-occurs with criteria (parent 6)` |
| 5 | **B-undeclared** (declaration duty; **proves CI authorship dating**) | spec-level, through `git log` | Add `.kiro/specs/zz-gate-bite-undeclared/tasks.md` with no `**Criteria mode**` line: `# Implementation Plan: zz undeclared (NEVER MERGE)`, a blank line, then `- [ ] 1. Undeclared parent` | exit 1, `reds 1` | `  RED [NON_COMPLIANT_NO_DECLARATION] non-compliant tasks.md: authored post-ratification without a criteria-mode declaration` |
| 6 | **B-material** (legacy materiality; **proves the diff-scoped duties run in CI**) | diff-scoped | `.kiro/specs/001-token-data-quality-fix/tasks.md` (authored 2025-11-17, legacy): change line 53 `- [x] 1. Audit Semantic Tokens and Generate Report` to `… and Publish Report`. **Add no declaration** | exit 1, `reds 1` | `.kiro/specs/001-token-data-quality-fix/tasks.md: RED [MATERIAL_AMENDMENT_WITHOUT_DECLARATION] material amendment without criteria-mode declaration (canonical-form diff attached)`, followed by `base: …` / `head: …` context lines showing `Generate` → `Publish` |
| 7 | ~~**B-ratification**~~ **DROPPED (D-1)** | early return | (was: `.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md:33`, `Ratified-machine: 2026-09-19` → `Ratified-machine 2026-09-19`) | (was: exit 1, `SUMMARY: parents evaluated 0 … reds 1`) | (was: stderr `RED: cannot resolve ratification record at …`). Not run; see D-1 |
| 8 | **C-close** (CONTROL) | none | Restore all files to the C-open state | Must equal C-open's SUMMARY exactly | None. Conclusion must be **success**. This proves each red was caused by its fixture and not by drift in the environment |

**Every run, every row (1–6, 8)**:
- (a) The run log contains **zero** `note: cannot resolve merge base` lines. One such line on any run is a finding: the diff duties were skipped green.
- (b) The log prints `ratification record: 2026-09-19 (…)`.
- (c) A bite's `reds` count equals the number stated above. **An extra red makes the bite over-determined.** Re-run it after fixing the stray defect, and never cite it as is.
- (d) Expect one `fatal: path '.kiro/specs/zz-gate-bite-never-merge/tasks.md' exists on disk, but not in '<sha>'` stderr line on every run, because the PR adds that file. It is benign; see § 5 item 6. Row 5 adds a second one for the undeclared file.

### 1.3 Characterizations: the gate's reach limits, recorded so nobody reads a green as coverage

All of these are **expected GREEN (exit 0)**. They may be run **locally** on the throwaway branch with `npx tsx scripts/check-completion-criteria-parity.ts --base origin/main`, because they assert checker logic, not wiring. Paste the verbatim output with the commit SHA. A characterization that comes out **red** is a finding, because it means the behaviour changed since this spec.

| Id | Defect | Result in the simulation | What it records |
|---|---|---|---|
| **K-reorder** (the "reordered set" you asked for) | Swap the Alpha and Gamma rows in a doc | `reds 0`, PASS | **Lawful, not a defect.** Guide § "Parent Success-Criteria Fidelity": "multiset equality, order-insensitive: reordering is not a mutation class". Renumbering, which changes the cell text, IS a defect and is bundled at row 3 P2 |
| **K-exempt-verbatim** (exemption misuse) | Replace a doc's table **and its forced-negative line** with the verbatim `Criteria fidelity: exempt — spec in flight at ratification (2026-09-19)`. The parent belongs to a spec created 2026-10-03 | `reds 0`. `emission [exemption-honored] parent 1: fixed-string exemption honored (2026-09-19) — criteria table waived`, and the parent is **counted in `pass`** | The checker never checks eligibility or the date. Misuse is the claims pass's to count (Req 8.6, "the ruled abuse detector"), never the gate's |
| **K-untick** | Untick parent 1 in `tasks.md` and leave its doc defective (one row deleted) | `reds 0`, plus `spec zz-…: 1 parent(s) unticked — not evaluated` | Unticking removes the claim from the gate. A defective doc under an unticked parent belongs to the claims pass |
| **K-misnamed** | Rename `task-1-completion.md` to `task-one-completion.md` | `reds 0`, `parent 1: not evaluated (completion doc not found)` plus the emission | The doc-not-found third state is working by design. Doc presence is `parent-completion-docs-present`'s surface, which is unbuilt |
| **K-status-nonmark** | Beta's Status `✅` becomes `Partial`, with Evidence `` `npm test` → 3 failing ``. The control pair: the same row with `⚠️` gives `RED [EVIDENCE_NONCOMPLIANT] … is ⚠️ with no follow-up link` | `reds 0`, PASS | **A gap against the law, not by design.** See § 5 item 1 |

## 2. Separate PRs or one PR

- **None of these needs a separate PR, and none is commit-grain.** The parity predicate is a **full scan of the tree**. The diff duties compare **merge-base..HEAD as trees** (`git diff --name-only <mb> HEAD` and `git show <mb>:<file>`). A revert therefore removes a defect from both, unlike the F9 shape in signing-act-chain, where a revert cannot remove the defect from `base..head`.
- **So use one throwaway PR, with commit-grain isolation**, under two conditions:
  - **Push each commit by itself, and wait for its run to finish before the next push.** A push of several commits fires one `synchronize` event, which runs on the tip only, so the intermediate fixtures would never run.
  - **Each fixture commit's cumulative tree diff against the merge base must be the synthetic spec plus that one defect.** Record `git diff --stat $(git merge-base origin/main HEAD) HEAD` for each commit. This matters most for rows 5 and 6, the diff-scoped and authorship paths, where a leftover file from an earlier fixture would contaminate the run.
- **Do not stack the throwaway PR on the flip PR.** This **corrects the grant's § "The sequence" step 2**, which says "stacked on the flip branch so they run the flip-branch workflow". The workflow's trigger is `pull_request: branches: [main]`, so **a PR whose base is the flip branch gets no run at all**. The flip PR does change `completion-criteria-parity.yml`, though only its header comment (grant: "header comment only (L3–13) … No step, trigger, job name or runner change"). So: **cut the throwaway branch from the flip PR's head and open it against `main`**. That way the run uses the flip-branch workflow, as the grant intends, and actually fires. If it is cut from `main` instead, § 4 item 6 applies with the comment-only reading.
- **Fork, surfaced for Peter (the default is the one specified above).** The alternative is one isolated commit per fixture: rows 3's five defects become five runs, about 11 runs in total instead of 7. The counter-argument, folded back in: the five per-parent defects share one code path (the per-parent loop, then `reds++`, then exit 1). Isolating them adds no wiring evidence, so bundling them is equivalent evidence. **What survives**: inside the bundle, each fixture's context-level red is over-determined. Each defect's bite rests on **its own RED line being present**, not on the run's conclusion. Rows 2, 4, 5 and 6 are isolated because each exercises a distinct path.

## 3. Never-merge marking and cleanup (required)

- **Branch**: `chore/never-merge-ccp-gate-bite`. Cut it from `main` (or from the flip head; see § 2).
- **PR**: opened as a **DRAFT** against `main`. A draft cannot be merged without being taken out of draft, which makes never-merge mechanical and not only conventional. Draft PRs still fire `pull_request` (`opened` and `synchronize`), and the workflow has no draft filter.
- **Title**: `DO NOT MERGE — gate-bite: completion-criteria-parity (register row; Req 6.6)`. This is the grant's wording ("titled and bodied `DO NOT MERGE — gate-bite`") and replaces the `[NEVER MERGE]` prefix drafted earlier.
- **Body, first line**: `DO NOT MERGE — gate-bite. Throwaway gate-bite PR for completion-criteria-parity; closed unmerged after the C-close run.` The body also carries:
  - the fixture table (ids, and the head SHA per push, filled in as the work proceeds);
  - a pointer to this spec record;
  - `**Consulted**: none needed — the sitting assigns the fixture spec (Stacy) and the build (Thurgood) by name`. The PR touches `.kiro/specs/**/tasks.md` and possibly a ballot, which are trigger surfaces;
  - **no** `Stacked-on:`.
- **No label is required.** The draft state and the title carry the marking.
- **Close after C-close's run concludes**:
  - Close the PR, never merge it.
  - Delete the remote branch with `git push origin --delete chore/never-merge-ccp-gate-bite` (auto-delete fires only on merge) and delete the local branch too.
  - The commits stay reachable at `refs/pull/<n>/head`, so cite SHAs from there.
- **Record `gh pr view <n> --json state,isDraft,mergedAt,headRefOid,baseRefOid`**, which should show `CLOSED`, `mergedAt: null`, and the base SHA. Run it in a session that holds credentials; this seat reads none.
- **Log retention**: Actions logs expire, so URLs alone rot. **The flip PR's recorded change must carry each run's RED line and SUMMARY line verbatim**, beside the URL.

## 4. What the flip PR's recorded change must cite for this seat to give the ARMING read at its merge

ARMING fires on two events: the flip PR's merge (a new barrier arms, and the required-check set changes) and the merge of its issue-row grant. Cite the following.

1. **For each CI fixture (rows 1–6 and 8)**:
   - the throwaway PR number;
   - the run URL **with its run id and job id**;
   - the PR head SHA (`refs/pull/<n>/head`) and the merge SHA the run checked out (from the checkout step's `HEAD is now at …`);
   - the check-run **name**, string-equal to `completion-criteria-parity` (from the check-runs API `name` field, not the workflow display name `Completion Criteria Parity`);
   - the conclusion (`failure` for bites, `success` for the controls);
   - the verbatim RED line(s) and the SUMMARY line;
   - the `note: cannot resolve merge base` count, which must be 0.
2. **Both controls green**, with C-close's SUMMARY equal to C-open's.
3. **The throwaway PR's final state**: `CLOSED`, unmerged, draft; its base SHA (the **bite base**).
4. **The characterizations (§ 1.3)**, verbatim local output plus commit SHA, **restated as the honest-reach line** in the register history entry, next to the (d8) sentence. A green `completion-criteria-parity` gate is not evidence of claim honesty.
5. **The flip itself, in ONE commit** (Req 6.6 and the 2026-09-19 history line):
   - `check_state: proposed → armed`;
   - the register history line **appended** (the GATE-BITE OUTSTANDING line is superseded by a new entry, never edited) and citing item 1's runs;
   - `checks[]` with the not-yet-required qualifier removed. Thurgood's call, but the 2026-09-19 FIRST-INSTANCE line's consequence note becomes moot and should say so;
   - `EXPECTED_CONTEXTS` gaining the exact string `"completion-criteria-parity"`, and `EXPECTED_COUNT=18 → 19`, in `tools/agent-generator/verify-gate-registration.sh`.
6. **The empty-diff condition (the signing-act § 4.1 analogue), checked by this seat at the read**: `git diff <bite base> <flip merge SHA> -- scripts/check-completion-criteria-parity.ts scripts/completion-claims/ .github/workflows/completion-criteria-parity.yml` is **empty**. In addition, the `check:completion-criteria-parity` line of `package.json` and line 33 of the ratification ballot are byte-equal at both SHAs. **One allowance**: a workflow diff made **only of `#` comment lines inside the header** (the grant's L3–13 rewrite) counts as empty, checked with `git diff -U0 … | grep '^[+-][^+-]' | grep -v '^[+-]\s*#'` → no output. **Any other difference means the bites are re-run before the row reads armed.**
7. **The flip PR's own `completion-criteria-parity` run is green**, plus the push-on-`main` run at the squash SHA (full-scan green on `main` at arming; DD1). A commit cannot cite its own run, so this seat's ARMING record supplies these two.
8. **`fixtures.test.ts` green at the flip head**: the `lane-functional-root` run, with the suite and test counts quoted (6 / 154 at `80bbc9fa`).
9. **Owed acts (3) and (4)**:
   - The issue-row grant's path list at activation. This seat checks extent at the merge: paths ⊆ the list, and `--numstat` deletions are 0 on CI paths unless the grant names the act.
   - Peter's branch-protection act, followed by **`verify-gate-registration.sh` PASS at 19**, its output pasted.

   Until item 9 is in, this seat's read is **ARMED-CONDITIONAL**, the precedent being `arming-signing-act-consistency.md`.

## 5. Wrong, ambiguous, or worth a decision

1. **MEDIUM. Status marks are not enforced, so the ⚠️ follow-up-link MUST can be escaped (K-status-nonmark).**
   - **What the law says**: the register rule requires "a Status mark … per row", and the guide's Status vocabulary is closed to ✅ / ⚠️ / ❌.
   - **What `parseStatus` does**: any cell other than an em-dash counts as `claiming`, and the follow-up-link check fires only when the status is `⚠️`.
   - **Why it matters**: a partial result written as `Partial` (or `Done`, or `N/A`), with test or command evidence and no link, passes. That is the "more polite ✅" Peter's 2026-09-19 ruling mechanized against, reached by a different spelling.
   - **Route**: to Thurgood, explicitly.
   - **Fork for Peter (D-2; surfaced, not picked here)**: (a) fix before the flip, or (b) flip and record it as a known gap. This seat does not say what the rule text should say (the mirror anti-rot clause).
   - **Counter-argument**: Req 6.4's enumerated verdict surface does not list status validity, so Thurgood could legitimately contest a red fixture here as out of scope for the rule as authored. That is why it is a characterization in this spec and not a bite.
2. **CORRECTION to the brief.** The "commit-grain bite / stacked never-merge throwaway" form is in **`.kiro/docs/ballots/2026-10-01-signing-act-chain.md` § 4.1** (the `check_state` bullet). The hermetic-publish ballot has no § 4.1: its § 4 is the register row and has no bite text. The parity bites are not commit-grain anyway, and stacking would get no CI run (§ 2).
3. **CORRECTION to the brief.** "Reordered set" is **lawful** under the guide (order-insensitive multiset), so it is a characterization and not a bite. Renumbering is the bite.
4. **LOW–MEDIUM. Silent-green in CI: an unresolvable merge base.** If `git merge-base origin/main HEAD` fails, the CLI prints `note: … diff-scoped duties skipped` and exits 0. I confirmed this in the simulation with `--base origin/nonexistent`. The only CI proof that this does not happen is B-material, which is why § 1.2 (a) greps for the note on every run. Routed to Thurgood: whether to make it loud is his call as owner.
5. **LOW–MEDIUM. Silent-green in CI: the authorship lookup.** `authorshipDate()` catches every git error and returns `undefined`, and `resolveMode` then reads the file as **legacy**. Missing history (a shallow fetch) therefore turns the declaration duty off silently. B-undeclared is its only CI proof. Routed to Thurgood.
6. **LOW. Misleading log noise.** Every PR that **adds** a `tasks.md` prints `fatal: path … exists on disk, but not in '<sha>'` to stderr on a green run. `git show` runs before the declared or authorship short-circuit, and `execFileSync` inherits stderr. A green run containing "fatal" invites misreading. Cosmetic. To Thurgood.
7. **LOW. Over-counts in the output.**
   - (i) The population line counts an undeclared non-compliant spec as "declared per-parent": B-undeclared prints `4 declared per-parent` with 3 actually declared. `results.length` includes it.
   - (ii) An exemption-honored parent is counted in `pass` (K-exempt-verbatim).

   The claims pass reads emissions, not `pass`. Still, anyone who reads the SUMMARY as a coverage count will over-count. To Thurgood.
8. **Sequencing transient**:
   - With `EXPECTED_COUNT=19` merged before Peter's settings act, `verify-gate-registration.sh` **fails, by design** (MISSING).
   - If Peter acts first, it fails UNEXPECTED.

   Either order has a window. Name the order in the flip PR. The grant's step 4 adds a third case: a FAIL that names the retired `122-sweep-5-corrected-state` is the pending 2026-08-21 Settings action, not a flip defect. My read accepts it only if that is the **sole** failure, the output is pasted, and it is named as such. My suggestion: merge first, then Peter's act. My read waits for the PASS at 19.
9. **B-ratification: DROPPED (D-1).** It edits `.kiro/docs/ballots/**`, which is outside Thurgood's write scope and outside the grant. The early-return path keeps jest proof only, and C-open proves the CI read resolves. The flip record restates the drop.
10. **Ambiguity in the sitting text**: "a deliberately defective completion doc" (singular). Taken literally, a single bite discharges Req 6.6. I read the requirement as proving the gate path, which needs rows 5 and 6 (neither is a completion-doc defect). If Peter reads it literally, rows 3–6 are surplus. I recommend against that reading, because rows 5 and 6 are the only CI evidence for items 4 and 5 above.
11. **Arming-day consequence (DD1, restated and not a new guard)**: once the check is required, the full scan makes **any** red in 123 or 127 (or any later declared spec) block every PR to `main`. C-open and the flip-head run are the evidence that the scan is green at arming.
12. **LOW. A citation error on the register row.** The row's 2026-09-19 GATE-BITE OUTSTANDING line and design § Testing Strategy cite the bite as **"Req 6.4"**. In `requirements.md`, Req 6 AC **4** is the verdict surface and AC **6** is the gate-bite. Design C6 and `tasks.md:146` already say 6.6. The flip's new history line should cite **Req 6.6**, and the old line stays as written, because history is append-only. To Thurgood.

---

**Standards implications**: items 1, 4, 5 and 12 above. They go to Thurgood on the EDUCATION route. Item 1 additionally carries the fork for Peter.

# ARMING read: the audience-banner presence guard, armed at U4's merge

**Event**: ARMING, limb "a new barrier arms" (trigger row, `canonical/agents/stacy.md`; generated `.claude/agents/stacy.md` L186). Required by Req 20.6 ("WHEN the presence guard arms THEN Stacy's ARMING event fires"). Per my U4 consult ruling, it fires at the U4 **merge** whether or not the required-context set changes (`completion/u4-rulings-2026-10-13.md` L5). The notice is Thurgood's, sent verbatim (`completion/task-23-3-completion.md` § 3).
**What armed**: `scripts/audience-banner/__tests__/audience-banner.test.ts`, over `scripts/audience-banner/predicate.ts` (predicate v1, scan scope `governance/*.md`). It checks `predicate-match ⇒ banner-present` and nothing wider. The two declared out-of-predicate docs have their own presence test.
**Where it lives**: an existing required lane. Context `lane-functional-root`, step "Run scripts/\*\* test suite (npm run test:scripts)" (`.github/workflows/lane-timing.yml` L259–260), selected by `scripts/jest.config.js`. No new context and no workflow edit.
**Merge**: PR #329, "U4 content policy (123)". Squash **`2a85df7fc77791d1b65e6ec3980c959746244802`** on `main`, committed 2026-10-13T19:30:42-04:00. PR head `6b12546adab609e8718a7d14aeac4b8f009fbd2e`.
**Reader**: Stacy · **Read date**: 2026-10-13 · **Tree read**: worktree `chore/123-u4-post-merge-records`, HEAD = `2a85df7fc`. `git diff --quiet 2a85df7fc HEAD -- scripts tools .github canonical governance` is clean, so every read below is a read of `main` at the merge. The orchestrator's three uncommitted record edits were present and untouched (see § 3 for the one that the parity read sees).
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.

---

## VERDICT: **ARMED**, with the accepted residual unchanged and one Medium finding on the class charter's step-1 route (§ 6), routed to Thurgood.

The guard is on `main`. It is selected by a required lane's config, it passes at the merge with the scoped line Thurgood predicted, and the merge touched no CI path. The coverage map is null for this guard, as predicted, for a stated structural reason. Gate registration is unchanged at 19. `completion-criteria-parity` is not dormant.

## 1. Gate registration (`verify-gate-registration.sh`) — **measured by the orchestrator**, not by me

The orchestrator ran it from the credentialed main checkout, at `2a85df7fc`'s content. Pasted result, as relayed:

```
PASS: all 19 required contexts present, count-asserted (N=19 recorded in this script)
```

The listing ended `lane-functional-root`, `lane-mcp-server-suite`, `lane-typecheck`. **I did not run it**, because it reads branch protection through the API and I hold no credentials. What I cross-read from the file at `2a85df7fc`:
- `lane-functional-root` is in `EXPECTED_CONTEXTS` (L69), and `EXPECTED_COUNT=19` (L88). `completion-criteria-parity` is the 19th entry ("armed 2026-10-03").
- `audit:coverage-map` independently reports `required contexts : 19 (verify-gate-registration.sh EXPECTED_CONTEXTS)` (§ 2).
- The merge changed no registration surface. `git show --name-only --format= 2a85df7fc | grep -cE '^\.github/|verify-gate-registration|scripts/jest\.config|package\.json$'` → `0`. **No P1 limb fires**: the merge has no `lane-timing.yml` diff, so the extent and additivity checks have nothing to read.

**PR #329's gate — also orchestrator-read** (`gh pr checks`): 18 required checks passed at head `6b12546ad`. **Unreconciled count, not a finding**: 18 against 19 required contexts. Branch protection (admins included) accepted the merge, which is platform evidence that every required context reported. The likely reason is how `gh pr checks` lists checks, but I could not confirm it without credentials. The orchestrator can close it with one `gh pr checks 329 --required` listing in the records PR.

## 2. Coverage-of-coverage (`npm run audit:coverage-map`) — **measured by me**

```
$ npm run audit:coverage-map        # exit=0
audit:coverage-map: PASS (surfaces PASS · lanes PASS)
  total surfaces      : 496
  guarded             : 495
  blank               : 1
  adjudicated-blank   : 1
    [adjudicated] canonical/generated.lock

  lanes (required-check steps vs local lane roots; sweep: audit:coverage-map:lanes): PASS
    required contexts : 19 (verify-gate-registration.sh EXPECTED_CONTEXTS) -> 20 job run(s) in 7 workflow(s)
    ...
    (i)  required-only — ...
      compared, no gap: npm run test, npm run test [application-mcp-server], npm run test [mcp-server], npm run test:agent-generator, npm run test:guard:dynamic-import, npm run test:scripts
    (ii) local-only    — ...
      compared, no gap: application-mcp-server/jest.config.js (32), jest.functional.config.js (395), scripts/jest.config.js (19), tools/agent-generator/jest.config.js (59)
    inventory ...
      [jest-listing] npx jest --config scripts/jest.config.js --listTests  <- lane-functional-root
    stale adjudications ...:
      (none)
```

(Abridged only where `...` appears. The elided lines are the pre-existing adjudicated rows, which are unchanged from the U3g ARMING record's read.)

**The expected null, recorded with its reason.** The map shows **no new row and no new column for this guard**. That is correct, and it is a structural property of the map, not evidence of anything about the guard:
- **No row**: `governance/*.md` are outside the map's surface class. `enumerateSurfaces` (`tools/agent-generator/coverage-map.ts` L140) returns the files under `guardedRoots()` plus `canonical/**`. I computed the set directly at `2a85df7fc`: `surfaces 496 governance/ 0 scripts/audience-banner 0`. `grep -c "governance/" canonical/coverage-map.yaml` → `0`.
- **No column**: the map's columns are the required contexts, and an in-lane guard is not one. The guard appears only indirectly. The lanes section counts `scripts/jest.config.js (19)` as "compared, no gap", and the 19 files include the guard (§ 4). That says the lane's selection and the required step agree. It does **not** say this file is among them by name.

The surface total (496) and the adjudicated blank (`canonical/generated.lock`) match Thurgood's `fd18cab72` reading in the notice. No drift between the unit head and the squash.

## 3. `completion-criteria-parity` dormancy (C4-1) — **measured by me**

```
$ npx tsx scripts/check-completion-criteria-parity.ts      # exit=0
== completion-criteria-parity ==
ratification record: 2026-09-19 (.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md)
spec 123-consumer-distribution (per-parent):
  association: parent 1 ← block at line 441
  ... (parents 2–22, 31, 29, 30, 23, 24, 25–28 associated)
  parent 1: PASS
  ... (parents 2–22, 31, 29, 30 PASS)
  parent 23: PASS
  parent 24: PASS
spec 123-consumer-distribution: 4 parent(s) unticked — not evaluated (no completion claim yet)
spec 127-completion-claims-integrity (per-parent):
  parent 1: PASS
  parent 2: PASS
  parent 3: PASS
population: 155 tasks.md — 2 declared per-parent, 0 spec-level (skipped), 153 legacy (skipped)
SUMMARY: parents evaluated 30, pass 30, fail 0; emissions 0; reds 0
```

**Not dormant.** It resolved its ratification record and evaluated 30 parents, U4's two (23 and 24) among them. It is still a required context (the 19th `EXPECTED_CONTEXTS` entry). Nothing for Thurgood to repair.

**Bound, stated**: the script reads the working tree, which carries the orchestrator's uncommitted edit to `task-24-completion.md`. I read that diff: it changes only the header's `**CI-provenance**` line and its note (two lines), not the criteria table the checker parses. The parent-24 result therefore stands for `main`. A green here says the criteria rows are reproduced with status and evidence. It says nothing about whether the claims are true (Spec 127's framing sentence).

## 4. The guard itself, at `main` — **measured by me**

```
$ npx tsx scripts/audience-banner/predicate.ts      # exit=0
audience-banner guard — predicate v1 coverage over governance/*.md (83 scanned): 18 match; 18 carry
  [carry  ] governance/AI-Collaboration-Framework.md
  [carry  ] governance/Component-Development-Guide.md
  [carry  ] governance/Component-Development-Standards.md
  [carry  ] governance/Component-Meta-Data-Shapes-Governance.md
  [carry  ] governance/Contract-System-Reference.md
  [carry  ] governance/MCP-Evolution-Roadmap.md
  [carry  ] governance/MCP-Relationship-Model.md
  [carry  ] governance/Process-Development-Workflow.md
  [carry  ] governance/Process-File-Organization.md
  [carry  ] governance/Process-Hook-Operations.md
  [carry  ] governance/Process-Orchestration-Model-Selection.md
  [carry  ] governance/Process-Spec-Planning.md
  [carry  ] governance/Process-Task-Type-Definitions.md
  [carry  ] governance/Test-Behavioral-Contract-Validation.md
  [carry  ] governance/classification-map.md
  [carry  ] governance/completion-documentation-guide.md
  [carry  ] governance/component-meta-authoring-guide.md
  [carry  ] governance/release-management-system.md

$ npx jest --config scripts/jest.config.js --listTests | wc -l
      19
$ npx jest --config scripts/jest.config.js --listTests | grep audience-banner
scripts/audience-banner/__tests__/audience-banner.test.ts        # (absolute prefix stripped)

$ npx jest --config scripts/jest.config.js scripts/audience-banner
  ...
  the declared list banded outside the predicate (Ruling 6 (B); not predicate coverage)
    ✓ governance/Component-Readiness-Status.md (declared, not matched) carries a conforming audience banner
    ✓ governance/Component-Quick-Reference.md (declared, not matched) carries a conforming audience banner
Test Suites: 1 passed, 1 total
Tests:       45 passed, 45 total
```

The scoped line equals Thurgood's `fd18cab72` reading exactly. The file is in the lane's selection (19 of 19 resolved files). It is the claim the notice makes: **predicate coverage over the scan scope, never "the corpus is bannered"** (Req 20.3).

**Not measured by me**: the CI run of the guard at the PR head. #329's required checks were orchestrator-read (§ 1). I did not read the `lane-functional-root` job log for `PASS …audience-banner.test.ts` with `18 carry` at `6b12546ad`. Thurgood's CI evidence is at earlier heads, with `0 carry` (`task-23-3-completion.md` § 2). So the first CI green **at the banners** is evidenced by the merge's required-check pass, not by a log line anyone has quoted. The lane step has no `if:`, and the floor runs first, so a passing context implies the suite ran. That inference is sound, but it is not a read.

## 5. The accepted residual (Peter, ruling 1), restated and unchanged

**The guard's dormancy is undetected.** The lane's floor counts files (≥ 1; 19 resolve). If this file dropped out of selection (a `testMatch` edit, or a rename out of `__tests__`), the floor would pass and the guard would go dormant. Neither read above would show it: `audit:coverage-map` has no row and no column for the guard (§ 2), and `verify-gate-registration.sh` sees only the context. **Req 20.6's own parenthetical** ("a guard that lives only in a script nobody registered is the same artifact as no guard") is met at the **lane** grain, not at the **file** grain. That gap is exactly this residual.

The class fix is chartered: `.kiro/issues/2026-10-13-named-guard-selection-floor-then-map-column-derivation.md`. Step 1 is the named-guard selection floor (owner: Stacy), then step 2, map-column derivation (Lina with Stacy). Until step 1 lands, the only protection is the in-test non-vacuity: the matched set is non-empty and equals `grep -lE`'s. It protects the guard's logic, not its selection. **Detection of this guard's dormancy today: claims passes and the LENS question 6, by hand.**

## 6. Findings (two routes, additive)

**F-1 (Medium) — the class charter's step-1 route does not fit the P1 scope it names, and it seats me as the auditor of my own PR.** The charter (§ "Step 1") costs step 1 as "one registry + one P1 PR whose diff is exactly `lane-timing.yml`", with owner Stacy. Measured against `.kiro/docs/ballots/2026-09-27-ci-regime-standing-scope.md` § 2:
- **Seat.** P1 is **Thurgood's** standing write scope (edit sites 1–3; Agent-Directory § "Thurgood" **Owns**). My write scope is `.kiro/specs/**` and `docs/specs/**`, and `.github/**` is not in it. **My ARMING row is the read that audits every P1 PR** (extent, additivity, floor selection, lanes row). If I author the P1 PR, my ARMING read audits my own PR. That is the co-signer argument that keeps every claims pass off the merge path, here showing up on the authoring side.
- **Act.** P1 admits "a step that runs an existing `package.json` test script … plus that step's own did-it-really-run floor … **Nothing else**". A named-file assertion added to the **existing** `scripts/**` floor step is not plainly a new test-script step or its own floor. Whether "that step's own floor" covers strengthening an existing floor is a reading I will not settle from my seat, because it is the excluded-act line the ballot made decidable. Separately, **if the registry is its own file, the "diff is exactly `lane-timing.yml`" check fails by construction.**
- **Fork, surfaced and not picked** (the pick is Peter's): **(a)** Thurgood executes step 1, under P1 if the reading holds or under an M2 issue-row grant if it does not. I specify the registry's required entries and the falsification fixtures, and I keep the ARMING read. **(b)** I keep authorship under an M2 grant scoped to me, and the ARMING read of that one PR moves to Thurgood, a named exception to the row. **(c)** An amendment ballot widens P1 to name "a named-file assertion in an existing lane floor". That is the widest option, and it is the one P1's narrowing at R2 argued against.
- **Remediation route**: an explicit message to **Thurgood** (CI-regime owner; the P1-reading question is his to answer) and to the **orchestrator** (the charter's author of record, for Peter's fork). It is not a file-only finding. No U4 claim is affected: the charter is out of U4's scope by its own § "Not in scope".

**No finding on U4's shipped guard or its registration evidence.** The four ruled evidence items (`task-23-3-completion.md` § 2) reproduce at `main` for the parts I can measure (ii)–(iv). Item (i) is read from the file and corroborated by the orchestrator's gate-registration PASS.

## 7. Standards implications

`Standards implications:` **two, for Thurgood (EDUCATION route; co-drafted, authored by Thurgood where they land in standards, by me where they land in my trigger row):**
1. **The in-lane ARMING clarification (the candidate I said I would carry).** For a guard that rides an existing required lane, the ARMING row's two named reads (`audit:coverage-map` and `verify-gate-registration.sh`) are **structurally null**: neither can see a file inside a lane. This read had to add the lane's `--listTests` naming the file and the guard's own scoped line to say anything about the guard. The row should name those two reads, `npx jest --config <lane config> --listTests | grep <guard file>` and the guard's scoped output at the merge SHA, as **the ARMING reads for an in-lane guard until the named-guard selection floor lands**. After that, they become the floor's emission. Req 20.6's wording has the same gap: it names only the two null reads. The trigger-row text is mine, so I author that edit by ballot (the 2026-09-27 precedent, "Stacy owns and applies this edit"). Whether Req 20.6-style criteria should name the in-lane reads is Thurgood's question, as spec-standards owner.
2. **The pre-registered null worked, and is worth keeping as a pattern.** The notice stated the expected null, its reason and its exact numbers (496 / 495 / 1, `grep -c` → 0) **before** the read. That turned a null map result from an ambiguous "nothing showed up" into a falsifiable prediction that held. Candidate guidance for ARMING notices: **when a read is expected to be null, the notice states the null, its structural reason and the numbers it expects.**

## Counting block (ARMING-scoped; the pass-level metrics do not apply to an ARMING read)

- Reads named by the trigger row: 3 (coverage-map, gate registration, parity dormancy). **Measured by me: 2. Orchestrator-measured: 1** (gate registration), labelled.
- Reads added for the in-lane case: 3 (predicate line, `--listTests`, the guard's own Jest run), all measured by me.
- CI-side reads: **0 by me.** #329's checks are orchestrator-read, and the 18-vs-19 count is unreconciled (§ 1).
- Findings: 1 (F-1, Medium, charter route; not on U4's claims).

## Addendum — the two items Stacy asked the credentialed seat to close (orchestrator, 2026-10-13; measured, not Stacy's)

1. **19, not 18.** `gh pr checks 329 --required` lists 19 contexts, all `pass`: 122-canonical-vs-truth, 122-diff-guard, 122-sweep-1-refs, 122-sweep-2-skills, 122-sweep-3-dupes, 122-sweep-4-ambient, 122-sweep-6-declarations, 122-sweep-7-dispositions, 122-sweep-8-demotion, 125B-tool-boot-smoke, Check package name drift, Consumer Guard, Section Citation Guard, completion-criteria-parity, lane-application-mcp-server-suite, lane-build-validate, lane-functional-root, lane-mcp-server-suite, lane-typecheck. The earlier "18" was a whitespace-split count of the unfiltered listing, not a missing context.
2. **The CI log at the merged head, read.** Lane Timing run `38483999316` (`pull_request`, head `6b12546adab609e8718a7d14aeac4b8f009fbd2e`), job `lane-functional-root`: the selection-floor step lists `scripts/audience-banner/__tests__/audience-banner.test.ts`; the `npm run test:scripts` step logs `PASS scripts/audience-banner/__tests__/audience-banner.test.ts` and the scoped line `audience-banner guard — predicate v1 coverage over governance/*.md (83 scanned): 18 match; 18 carry` at `2026-10-13T23:27:28Z`. This is the first CI line reading `18 carry` — the one task-23-3-completion.md § 2 said would come from the gate.

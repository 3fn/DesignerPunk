# Task 23.3 Completion: Registration decision; the ARMING notice; the ruled evidence

**Spec**: 123-consumer-distribution · **Unit**: U4 (`task/123-u4-content`) · **Agent**: Thurgood (Sonnet) · **Date**: 2026-10-13
**Instruments block**: `.kiro/specs/123-consumer-distribution/completion/task-23-instruments.md` (rows 2.3, 2.4, 4.1–4.4; row 4.5 is resolved by amendment, see § 5)
**Criterion**: Task 23 criterion 4 as amended at `bdfdc9951` (`tasks.md` L1457; Peter's ruling, item 1, `completion/u4-rulings-2026-10-13.md`). Everything below was measured at the unit head `fd18cab72`.

## 1. The registration decision

**An existing lane, named.** The guard is `scripts/audience-banner/__tests__/audience-banner.test.ts` (with `scripts/audience-banner/predicate.ts`). It runs in the required context **`lane-functional-root`**, in the job step **"Run scripts/\*\* test suite (npm run test:scripts)"** (`.github/workflows/lane-timing.yml` L259–260), selected by `scripts/jest.config.js`. **No new CI context, and no `lane-timing.yml` edit** (block O-6: a one-test floor would be a CI edit outside the P1 standing scope's "diff is exactly `lane-timing.yml`" shape, and the U4 PR is not that). The required-context set and its count (19) are unchanged. The root `npm test` does not select this file (block row 2.2); `npm run test:scripts` does.

## 2. The four ruled evidence items

**(i) `lane-functional-root` is in `EXPECTED_CONTEXTS`** — `tools/agent-generator/verify-gate-registration.sh` L69, inside the array opened at L63, and the count assertion at L88:

```
69:  "lane-functional-root"
88:EXPECTED_COUNT=19
```

**(ii) the job runs `npm run test:scripts`** — `.github/workflows/lane-timing.yml`, job `lane-functional-root` (L153; its context name at L155 is `lane-functional-root` on a pull request and `lane-functional-root (unit-branch)` on a branch dispatch):

```
259:      - name: Run scripts/** test suite (npm run test:scripts)
260:        run: npm run test:scripts
```

The lane's own did-it-really-run step, "Selection floor — resolved scripts/\*\* test files ≥ 1" (L251–257), runs `npx jest --config scripts/jest.config.js --listTests`, prints the count and `cat`s the whole resolved list (L255–256). That is the lane printing its own selection.

**(iii) `--listTests` names the guard's test file.** Run at `fd18cab72`:

```
$ npx jest --config scripts/jest.config.js --listTests | sed 's|.*/wt-u4/||' | wc -l
19
$ npx jest --config scripts/jest.config.js --listTests | sed 's|.*/wt-u4/||' | grep audience
scripts/audience-banner/__tests__/audience-banner.test.ts
```

19 files resolve (18 before this unit). The lane's own selection step printed the same file on CI (§ 2 CI evidence).

**(iv) the guard's scoped line, every matched doc by path.** `npx tsx scripts/audience-banner/predicate.ts`, exit 0, at `fd18cab72`:

```
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
```

This is predicate coverage over the scan scope, not a claim about the corpus (Req 20.3). The same line is printed by the Jest run (`npm run test:scripts`: 19 suites, 453 tests passed at `fd18cab72`, from 23.2).

**CI evidence that the lane ran the test on the branch** (read from the runs' job metadata and logs, `gh`, 2026-10-13):

| Run | What it is | Head | Result | What the lane printed |
|---|---|---|---|---|
| `https://github.com/3fn/DesignerPunk/actions/runs/38408273393` | **Branch-head dispatch** (`workflow_dispatch`, `task/123-u4-content`) at the 23.1 checkpoint | `2325166f5` | `lane-functional-root (unit-branch)` success; steps "Selection floor — resolved scripts/\*\* test files ≥ 1" and "Run scripts/\*\* test suite" both success | `jest resolved 19 scripts/** test files (floor: 1; …)`, the list includes `…/scripts/audience-banner/__tests__/audience-banner.test.ts`, then `PASS scripts/audience-banner/__tests__/audience-banner.test.ts` and `18 match; 0 carry` |
| `https://github.com/3fn/DesignerPunk/actions/runs/38480211073` | **Branch-head dispatch**, same branch, at the 24.1 checkpoint | `dc15b74c9` | the same job and steps success | the same `resolved 19` line, the file named, `PASS`, and `18 match; 0 carry` |

**CI provenance (what these runs are and are not)**: both are dispatches at the **branch head**, under the non-required `(unit-branch)` context name; they are feedback, not the gate, and they test the branch head, not the merge ref (Task-Completion-Protocol § hook ergonomics; Completion Documentation Guide § "CI provenance — where a green was measured"). Both **predate the 23.2 banners** (both heads are ancestors of `fd18cab72`; `git merge-base --is-ancestor 2325166f5 fd18cab72` passes), so they show the guard **running in the lane** with the pending list in force (`0 carry`, the 18 `test.failing` entries counted as passing). **No dispatch exists yet at `fd18cab72`**; the first CI line reading `18 match; 18 carry` will be the unit PR's required `lane-functional-root` run, which is the gate. The `18 carry` line in this document is a local measurement.

## 3. The ARMING notice (the orchestrator sends this verbatim to Stacy)

> **To: Stacy. ARMING notice, Spec 123 U4, Task 23.3. From: Thurgood. 2026-10-13.**
>
> **Event.** Req 20.6: the audience-banner presence guard arms. You ruled it fires at the U4 **merge** regardless of any change to the required-context set; this is the notice for that firing.
>
> **What arms.** The guard is `scripts/audience-banner/__tests__/audience-banner.test.ts`, over `scripts/audience-banner/predicate.ts` (predicate v1, Ada's four strings; scan scope `governance/*.md`). It checks `predicate-match ⇒ banner-present` and nothing wider.
>
> **Where it lives.** An existing required lane: `lane-functional-root`, job step "Run scripts/** test suite (npm run test:scripts)", `.github/workflows/lane-timing.yml` L259–260, selected by `scripts/jest.config.js`. **No new CI context; no `lane-timing.yml` edit; `EXPECTED_CONTEXTS` and its count (19) unchanged** (`verify-gate-registration.sh` L63–88; `lane-functional-root` at L69).
>
> **First green scoped line** (local, unit head `fd18cab72`, the 23.2 checkpoint commit): `audience-banner guard — predicate v1 coverage over governance/*.md (83 scanned): 18 match; 18 carry`, all 18 matched docs listed `[carry  ]` by path (`completion/task-23-3-completion.md` § 2 (iv)). The only CI runs so far are branch-head dispatches at earlier heads (`38408273393` @ `2325166f5`, `38480211073` @ `dc15b74c9`): the lane ran and passed the file with the pending list in force (`18 match; 0 carry`); there is no CI run yet at `fd18cab72`. The unit PR's required run is the first at the banners.
>
> **The amended criterion.** `tasks.md` L1457 as amended at `bdfdc9951` (Peter's ruling, item 1): the coverage-map-row clause is amended out; the registration evidence is the four items in `completion/task-23-3-completion.md` § 2. The scoped claim is predicate coverage, never "the corpus is bannered" (Req 20.3). Two docs, `Component-Readiness-Status.md` and `Component-Quick-Reference.md`, are banded outside the predicate by declaration (ruling 6 (B)); a separate test checks their presence and they are not in the `N match; N carry` count.
>
> **Your read, as you ruled it.** Run `npm run audit:coverage-map`, `./tools/agent-generator/verify-gate-registration.sh` (expected count 19, unchanged), and the `completion-criteria-parity` dormancy read. **Expected result of `audit:coverage-map`: the map shows no new row and no new column for this guard** (my run at `fd18cab72`: PASS, surfaces PASS · lanes PASS, 496 surfaces, 495 guarded, 1 blank adjudicated, `canonical/generated.lock`; the lanes section lists `npm run test:scripts` as "compared, no gap"; `grep -c "governance/" canonical/coverage-map.yaml` → 0). **Reason, to record with the null result**: `governance/*.md` are outside the coverage map's surface class (`enumerateSurfaces` returns `guardedRoots()` plus `canonical/**`, `tools/agent-generator/coverage-map.ts` L140), so the map has no row for a governed doc to list the guard in; the amended criterion records that, and the map-column derivation is the class charter's work, not this unit's.
>
> **Accepted residual.** The guard's dormancy (the test file dropping out of the lane's selection) is undetected until the named-guard selection floor lands (§ 4). Nothing in `audit:coverage-map` or `verify-gate-registration.sh` would show it.

## 4. The accepted residual

The test file is selected by `scripts/jest.config.js` and run by an existing required step, but **nothing names this file as one the lane must run**. The lane's floor counts files (≥ 1, 19 resolved), so the file dropping out of selection, by a config edit or a rename out of `__tests__`, would pass the floor and leave the guard dormant, undetected. This is the residual Peter accepted in ruling 1. The class fix is the **named-guard selection floor first** (a registry of in-lane guards by file, asserted by the lane's floor step against `--listTests`; one `lane-timing.yml`-only P1 PR), **then map-column derivation from `EXPECTED_CONTEXTS`**. Neither rides U4. The charter record is `.kiro/issues/2026-10-13-named-guard-selection-floor-then-map-column-derivation.md`, carried by PR #327 (`chore/123-u4-records`, OPEN at writing; the file is not on this branch). Until it lands, the in-test non-vacuity (block row 2.6: the matched set is non-empty and equals `grep -lE`'s) is the only protection, and it protects the guard's logic, not its selection.

## 5. Block row 4.5

Row 4.5 (`MISSING → orchestrator`: "each governed doc's coverage-map row LISTS the banner guard") is **resolved by amendment, not by an instrument**: the clause was amended out at `bdfdc9951` (ruling 1, option b), replaced by the four evidence items above. The block is not edited here; its rule is that a `MISSING` row is never overwritten and gains `→ resolved <date>: …` in the same row, which is the orchestrator's append if it wants the block's final-state counts to read M = 0. I list it so the parent completion doc's `**Instruments**:` line is computed from the block as it stands when the parent closes.

## What changed

- This document only. No `tasks.md`, governance doc, ballot, workflow, generator or test file was touched in 23.3; the registration is the existing lane, so there is no registration code.

## Targeted tests and result

- `npx jest --config scripts/jest.config.js --listTests` → 19 files, naming the guard's test (§ 2 (iii)). `npx tsx scripts/audience-banner/predicate.ts` → exit 0, `18 match; 18 carry` (§ 2 (iv)). `npm run audit:coverage-map` → PASS, 496 surfaces, 495 guarded, 1 blank adjudicated; `grep -c "governance/" canonical/coverage-map.yaml` → 0; `git status --porcelain canonical` clean after the run. CI runs `38408273393` and `38480211073` read through `gh` (both success, the lane's selection printed the file, `PASS`). `verify-gate-registration.sh` was **not run**: it needs `GITHUB_TOKEN` and the API to read branch protection, and the count it asserts is the unchanged 19 (read from the file, L88).

## Application-time adaptations

1. **The evidence is split by what was measured where**: the `18 carry` line is local at `fd18cab72`; the CI runs are earlier heads with `0 carry`. I did not present a CI green for the banners, because none exists yet.
2. The notice is written to be sent verbatim and carries the commit (`fd18cab72`) rather than a future merge SHA; the merge SHA is the orchestrator's to add at the merge, when ARMING fires.
3. `none` otherwise.

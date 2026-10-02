# ARMING read: `signing-act-consistency --ci`, armed at #245's merge into U2b

**Event**: ARMING — register row `signing-act-consistency` (`governance/classification-map.md`), `--ci` scope. "ARMING fires at the fixing PR's merge into U2b's unit branch" (the row's own scope comment; ballot `2026-10-01-signing-act-chain.md` § 4.1).
**Ballot**: `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`, RATIFIED Peter 2026-10-01, `R` = `2da74864` (#243).
**Grant**: `.kiro/issues/2026-10-01-verify-signing-chain-ci-step.md` (Thurgood, the instrument's owner; build delegated, verified in his seat).
**Fixing PR**: #245, "verify-signing-chain: --ci (sweep first, links 1–3) inside 122-diff-guard + --audit (links 4–7), with the § 4.5 fixtures (signing-act chain)". PR head `1def3166`; squash-merged as **`75aa8c22`** into `task/123-u2b-profile`.
**Ratification PR**: #244, "Ballot RATIFIED: signing-act-chain — R recorded (#243 → 2da74864)". PR head `8decfc98`; squash-merged as **`dff78bcd`** on `main`.
**Executing agent**: Thurgood, under the issue-row grant. **PR opener**: the orchestrator.
**Reader**: Stacy · **Read date**: 2026-10-01 · **Filed**: 2026-10-01
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is a required check, a review gate, or a blocking condition on any PR.

---

## VERDICT: **ARMED**. The condition this seat set (#244 merges before #245) is discharged. No finding.

The row's `--ci` scope was read `ARMED-CONDITIONAL` against #245 at its PR head (`1def3166`), conditional on Peter merging #244 (the ratification + erratum record) before #245 (the fixing PR). That condition is now met by commit history, not by assertion:

- `dff78bcd` (#244) committed `2026-10-01T19:40:09-04:00`, on `main`.
- `75aa8c22` (#245) committed `2026-10-01T19:40:26-04:00`, 17 seconds later, squash-merged into `task/123-u2b-profile`.
- The unit branch head `ff0fadb6` ("Merge origin/main (#244 ratification record + erratum) into task/123-u2b-profile") carries both as parents (`75aa8c22 dff78bcd`), confirming `dff78bcd` is reachable and precedes `75aa8c22` in the branch's own history.
- `dff78bcd` is an ancestor of `origin/main`.

The row therefore reads `armed`, not `proposed` — the condition's only failure mode (#245 merging first, leaving the row `proposed` until #244 lands) did not occur.

## Scope

- **Population**: one fixing PR, #245, read at its PR head `1def3166` (the pre-merge read, stamped `[STACY — ARMING read, #245 @ 1def3166]`) plus this post-merge discharge check over the two merge commits and the unit branch head.
- **The checks**, per the ballot § 4.1 arming condition and the issue's criterion:
  - the erratum (ballot § 3 link 2; § 4.1 stacked route) landed in #244 before #245 merges;
  - the F9 commit-grain bite, via the stacked-PR route (ballot § 4.1, ruling 2 of `[STACY R2]`), reads as accepted evidence, over-determination noted and not adjudicated by this seat;
  - the § 4.5 fixture set, both suites, green;
  - the lane-functional-root build fix (blocking `test:agent-generator` from running in CI) landed;
  - the register row's own `checks[]` population and `check_state: armed` text;
  - the fixing PR's own CI runs, both the full path and the `noop` path;
  - extent — the diff stays inside the grant plus the register hunk.

## Findings

**No finding against #245 or #244.**

**One open question, routed and not re-opened here** (Ruling 3, `[STACY R2]` ruling 3 / pr-body § "Ruling 3 — orphan sheet-section fixture pair"): whether a cleanup-only commit that removes an orphan sheet section should pass the § 4.1 floor (today it reads `FAIL (floor)` because zero rows are checked over a range touching `canonical/profiles/**`). This is a **ballot-text question for Thurgood as the standard's author**, not a defect in #245 — the fixture asserts current behavior correctly and Ruling B (below) finds no erratum is owed for it. Carried to **Standards implications**.

## Method: the sample, named, and how many of the total

Seven items verified against #245 at its PR head `1def3166`, plus the discharge check above. 1 of 1 fixing PR in the population; 1 of 1 arming condition.

| Check | How verified | Result |
|---|---|---|
| **The erratum** (ballot § 3 link 2; § 4.1 stacked route) | `8decfc98`'s (#244's) § 3 link 2 text matches the row's scope text word for word; the § 4.1 stacked route is present, with dated errata lines | verified, OPEN at the #245 head — resolved by #244 merging first (see VERDICT) |
| **F9: no re-bite** | Base `1f7e1c91`, bite PR #246 closed unmerged, `noop=true`, then `FAIL link 3 … Agent: trailer data ≠ c1Seat kenya` on run `36885636467`. Over-determined: three extra FAILs present (link 2 seat — same wrong trailer; link 2 lock — the bite commit carries the lock, which real U2b signing commits never do, so the checker is correctly red on an artifact of the bite's own construction; link 1 no-hash — the bite's shape). `ok` needs zero findings across all links, so link 3 alone reds the step; the trailer condition is met | verified, no re-bite needed |
| **Fixtures** | Both suites (`verify-signing-chain.test.ts`, `verify-signing-chain.audit.test.ts`) PASS in CI (`lane-functional-root`, run `36891685515`, at head `1def3166`) | verified, PASS |
| **Lane fix** | The `lane-functional-root` build fix (blocking `test:agent-generator` from running at all) merge-base is `d54e8a5c` | verified |
| **The register row** | `check_state: armed`; scope text matches ruling 5's per-object wording; `checks[]` populated at `governance/classification-map.md` L178, with its un-gated setup block at L157–176 | verified, with one note (below) |
| **The CI runs** | Lane Timing `36891685515`: five jobs green, `test:agent-generator` ran. `122-diff-guard` in `36891685541`: steps 2–5 succeeded; `operative-set-freshness: PASS — 373 unit(s)`; `signing-chain: PASS` with 0 rows over `d54e8a5c..1def3166`. That run took the full (non-`noop`) path; the F9 and restore runs (`36885636467`, `36880556269`) covered the `noop` path | verified, both paths covered |
| **Extent** | `git show --stat` on the relevant range: empty beyond the test file and the register hunk. One line removed: old L16, the workflow header comment, named in the PR body. `--name-only` ⊆ the grant paths plus the register hunk. No step's `if:` names `noop` | verified, clean |

**Note on the register row's history line**: its "final green" citation (`36880556269`) ran on commit `1f7e1c91`, not on the arming commit itself — a commit cannot cite its own run. This seat's ledger line (below) carries the correct arming-head green (`36891685541`/`36891685515`) instead. **No re-commit of the register is owed for this** — the register text is not wrong, only incomplete; this record supplies the arming-head citation the register's own history line could not self-cite.

## Rulings (carried verbatim from the pre-merge read)

**Ruling A**: the F9 evidence is accepted as recorded. Its claim, that the step runs under `noop` and link 3 fires, is shown.

**Ruling B**: the literal § 4.1 floor stands, with no erratum. Failing closed is right for a zero-row detector. I scanned every sheet at `1def3166` and found 0 orphan sections, and adding one now fails link 2, so a removal-only range can't happen on this population. If one ever does, Thurgood words the erratum, not me (the anti-rot clause).

## Ledger line

```
2026-10-01 ARMING signing-act-consistency --ci — #245 @ 1def3166 — green 36891685541/36891685515; bites F10 36879685299, F11 36880277736, F9 36885636467 (#246 stacked, base 1f7e1c91; FAILs L3 trailer, L2 seat, L1 no-hash, L2 lock — over-determined, accepted); extent clean; fixtures 30/59; conditional on #244 (8decfc98) merging first — Stacy
```

**Discharge of the condition** (recorded at filing, 2026-10-01): #244 merged to `main` at `dff78bcd` (`2026-10-01T19:40:09-04:00`); #245 squash-merged into `task/123-u2b-profile` at `75aa8c22` (`2026-10-01T19:40:26-04:00`), 17 seconds later. The unit branch head `ff0fadb6` carries both as parents. **#244 before #245 — the condition holds. The row reads `armed`, unconditionally, as of this filing.**

## Limits (carried forward, not resolved here)

1. **The fixed-string orphan scan.** Ruling B's "I scanned every sheet at `1def3166` and found 0 orphan sections" was a literal/fixed-string scan for `## ` sheet sections keyed to no disposition row or operative-set unit — not a structural parse of every sheet format in the population. A section header in a form the scan's string match does not anticipate would not be caught by this read; the claim "0 orphan sections" is bounded by that method, not a guarantee against every possible heading shape.
2. **The 59-vs-51 test count, not reconciled.** `[THURGOOD R2]`'s `report-r2.md` reported the signing-chain suites at **51 tests** on the merged tree at that round. The final count at `10264b80` (and carried through to `1def3166`) is **59 tests** (2 suites, all pass, 0 skipped) — a growth of 8 tests from Ruling 3's orphan-sheet-section fixture pair (`test.each`, 6 must-fail rows, 1 must-pass) plus incidental additions. This seat did not re-derive the arithmetic test-by-test to confirm 51 + 8 = 59 accounts for every added test exactly; the final 59 is accepted on the PR's own reported count and the CI run's green, not on a reconciled addition. Fixtures are counted at **30 by id** against **59 Jest tests** — the id-to-test ratio is not 1:1 (`test.each` rows, workflow-structure tests) and this seat did not map every test to an id.

## Standards implications

1. **The § 4.1 floor's removal-only behavior** (Ruling 3 / Ruling B): whether a cleanup-only commit that removes an orphan sheet section, and nothing else, should pass the § 4.1 floor instead of reading `FAIL (floor)` on zero rows checked. This is a question for **Thurgood**, as the ballot's author — the text is clear as ratified; it may not be teaching the intended thing for the removal-only case. Not a finding against #245 (the fixture correctly asserts current, ratified behavior).
2. No other standards implication.

---

**Provenance**: CI run excerpts, PR bodies and git evidence read from the local checkout (`git log`, `git show --stat`, `git merge-base --is-ancestor`) and from CI logs/PR text relayed by the orchestrator session that ran this PR's build and verification. This seat reads no credentials.

# Task 18.1 — the pass-four request (request record and subtask doc)

**Agent**: Lina (Opus), Task 18's PRIMARY and executing agent · **Date**: 2026-10-02
**To**: Stacy, who authors the verdict record at `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md`, outside the delegated-tier line.

This record requests pass four (G2) on the head named in R1. Nothing in it states, predicts or prefers a verdict.

---

## R1 — The head

- **H** = `c1b67b8f09897cf2b3b17859d8aa182e73188e8c`, on `task/123-u2b-profile`.
- **H is pushed**: after `git fetch origin`, `git rev-parse HEAD origin/task/123-u2b-profile` printed `c1b67b8f09897cf2b3b17859d8aa182e73188e8c` twice.
- **This record's commit** is H's child. `git diff --name-only c1b67b8f <this commit>` lists this file alone.

## R2 — The confirming guard run at H (Lina's)

- **Before**: `git status --porcelain` at H printed nothing.
- **Command**: `npm run check:122:diff-guard`, from the main checkout at H, exit 0. Its verdict lines:
  ```
  operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
  diff-guard: no-op-green
  ```
- **Freshness findings**: 0.
- **After**: `git status --porcelain` printed nothing. The run wrote no file and did not write the lock.
- **Thurgood's trigger log**, cited by path and SHA only: `.kiro/specs/123-consumer-distribution/lock-refresh-trigger-log.md` @ `c1b67b8f`.

## R3 — The signing-chain check at H

- **Run**: Agent Generator (122), run 37060682770, `https://github.com/3fn/DesignerPunk/actions/runs/37060682770`. It is a branch-head dispatch whose `headSha` is `c1b67b8f09897cf2b3b17859d8aa182e73188e8c`.
- **Conclusion**: `completed`, `success`. The job `122-diff-guard (unit-branch)`, which runs the `verify-signing-chain --ci` step, concluded `success`.
- **The step's own lines**, from `gh run view 37060682770 --log`:
  ```
  verify-signing-chain --ci — consistency, not identity (ballot 2026-10-01-signing-act-chain § 4.1)
  operative-set-freshness: PASS — 17 record(s), 373 unit(s), 17 note(s), 17 dispositions file(s), 17 overlay(s)
  signing-chain: range 823806a2..HEAD — 265 commit(s); 206 committed before R 2da74864 excluded (ballot § 2 clause 8 — the rule does not reach back)
  signing-chain: 4 row(s) checked across 2 signing commit(s)
  signing-chain: PASS — consistency, not identity
  ```
- **The other five dispatches at H**: 37060651819, 37060666250, 37060674432, 37060691256 and 37060700374 (Lane Timing). Lane Timing was the last to finish; at this record's writing (2026-10-02T20:32Z) `gh run view 37060700374` read `completed success`. These are cited for provenance, not as evidence for this request.

## R4 — The pre-declared consequence texts

- **Path**: `.kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md`.
- **C0** = `30186762c567d5463902b51f565fcee0d19822c1`. It contains that file alone.
- **Ancestry**: `git merge-base --is-ancestor 30186762 c1b67b8f` → exit `0`.
- **Freeze**: the file is frozen from C0 through U2b's merge, so `git diff 30186762 <U2b PR head> -- <path>` is to be empty.

## R5 — The G1 record

`.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` @ `24c7f060` (U2a, #222). It is cited and not restated.

## R6 — The Req 11.8.6 precondition evidence (paths)

- **10.G bite**: `.kiro/specs/123-consumer-distribution/completion/task-10-2-completion.md` § "Bites recorded red (each mutation applied to production code, the named test file run, then reverted; the file then re-ran 45/45)" @ `24c7f060`.
- **10.8a bite**: `.kiro/specs/123-consumer-distribution/completion/task-10-5-completion.md` § "Twin bite recorded red (applied to `spans.ts`, the twin run, reverted; then 12/12)" @ `24c7f060`.

## R7 — Scope sources and the domain instruments (pointers only)

**Scope sources**, at H:
- Req 11.4.2: `.kiro/specs/123-consumer-distribution/requirements.md` § "11.4 The pre-stated falsification criterion (verbatim)", item 2.
- Req 11.6.5d: the same file, § "11.6", item 5d.
- Design § "Gates and sequencing", the U2 step 8 / G2 entry: `.kiro/specs/123-consumer-distribution/design.md` § "Gates and sequencing (Stacy S-D-B3, S-D-A7; P2 ruled branch A)".
- Attack (a)'s source: `.kiro/specs/123-consumer-distribution/design-outline.md`, the subsection "#### PRE-STATED FALSIFICATION CRITERION — so pass four is a one-line verification, not a fourth design round" (it follows § "7.2 The re-grounding contract (R5)"), the paragraph "Pass four, scoped in advance".

**Domain instruments**, at H. These are an inventory only: no claim is made about their result.

| Instrument | Where |
|---|---|
| The partition (C13) | `tools/agent-generator/partition.ts` (`partition`, `entryTree`); `__tests__/partition.golden.test.ts`, `entry-tree.test.ts` |
| The spans (C14, 10.S) | `tools/agent-generator/spans.ts` (`emitSpans`), both adapters' consumer branches; `__tests__/spans.source-origin.test.ts`, `consumer-rendering.survivors.test.ts`, `consumer-rendering.ground-truth-spans.test.ts` (the VALVE-1 per-row spans, merged at `7071e39f`) |
| Derivation (C15) | `tools/agent-generator/regrounding/derivation.ts` (`checkDerivation`); `__tests__/derivation.test.ts` (body), `derivation.frontmatter.test.ts` (frontmatter), `grain-guard.two-sided.test.ts`, `semantics-guard.test.ts`, `semantics-guard.fixture.test.ts` |
| The triviality floor (C18) | `tools/agent-generator/regrounding/triviality.ts`; `__tests__/triviality.{assignment,floor,g1,records}.test.ts`, `consumer-profile.real.test.ts` |
| The operative-set records and the freshness sweep (half (2), 11.6.5d) | `canonical/operative-sets/*.yaml`; `tools/agent-generator/regrounding/freshness.ts`; `__tests__/operative-set-freshness.test.ts` |
| Always-set members | `canonical/profiles/consumer/always-set/`; `canonical/_consumer-output/{cc/.claude/identity,kiro/.kiro/steering}/`; `__tests__/consumer-profile.real.test.ts` |
| The derived canonical | `tools/agent-generator/derive.ts`; `canonical/_consumer-output/_canonical/` |

## R8 — Every fixing PR and seat merge since the U2b cut, with its authority

The cut is `ba015900`, on `main`; the first unit-branch commit is `f2e44303`. The list comes from `git log --first-parent --format='%h %s' 24c7f060..c1b67b8f`. Merges of `origin/main` into the branch are listed once, as a class. Where I cannot name an authority with certainty, the row says so.

| Commit | What entered | Authority |
|---|---|---|
| `4cd542fa` | `task/123-u2b-lina-13-0` (13.0, Lina's C1 confirmation of the third F unit) | Task 13's row (Lina, tiered secondary, 13.0), amendment #225 |
| `e81906ad`, `49d09c57` | `task/123-u2b-lina-13-4` | Task 13's row (Lina, 13.4–13.6) |
| `9395258b` | `chore/123-bu2-stacy-r2` (`8f9bec83`: "Ballot B-U2: Stacy R2 confirm") | B-U2's review round. B-U2 is authored at 13.7 and rides U2b (`tasks.md` § "Sequencing decisions" item 9). **I cannot name the write grant for a reviewer's entry on the ballot file with certainty.** |
| `97761972` | `task/123-u2b-lina-13-6-add` | Task 13's row (Lina, 13.4–13.6) |
| `ec42eff3` | `task/123-u2b-thurgood-15-0` | Task 15's row (15.0, Thurgood) |
| `ac2208f5`, `7ec72fa2`, `0c171c28`, `04aa1b0a`, `dc6e44dc`, `fa52754f`, `aaa1555f`, `2574bec7`, `33d25f21`, `da90ba2b`, `bb637c64`, `54a194fb`, `5e1d5906`, `e25c16e6`, `d93008e3`, `1a7cb11a`, `7c4508f0`, `c26c13a6`, `bde47d60`, `4c118d45`, `17ca7624`, `611dda4a`, `3bd520a6` | The 15.4/15.5 first-render seat branches (`fr1`–`fr4`, `fr1b`, `sparky-l323`) | **No grant.** Task 15's signing fan-out ran outside its row grant, before R (`2da74864`). It is Stacy's Medium finding against the plan, with no retroactive grant (ballot `2026-10-01-signing-act-chain` § 6.4; disclosure `39a1b106`). |
| `37900997`, `d6ea41d2`, `a92e40b8`, `e05ba8a2`, `9fa08db1` | Task 16 seat branches (16.4, the cohort, 16.2, 16.3, 16.6) | Task 16's row (Lina) |
| `31cca17c` | `origin/task/123-u2b-profile` merged into the local branch (a sync, no new content) | none needed |
| `75aa8c22` (#245) | `verify-signing-chain` `--ci`/`--audit` | Issue-row grant `.kiro/issues/2026-10-01-verify-signing-chain-ci-step.md`, filed with #243 (`2da74864`) |
| `98600a69` (#249) | Relocation-gate legs A4/A7 rewritten | Issue-row grant `.kiro/issues/2026-10-01-relocation-integrity-gate-vs-123-install-shape.md`, filed and activated by #248 (`884cbb98`) |
| `08500f20` (#251) | The diff-guard's input closure listed from git | Issue-row grant `.kiro/issues/2026-10-01-generated-lock-input-closure-differs-by-checkout.md`, filed by #250 (`c5072436`) |
| `09a7aecd` | `task/123-u2b-gate-residual-moves` (R1–R3 moved into Task 16's tests) | Task 16's row, plus Peter's ruling of 2026-10-02, "Move all three, and remove the legs" (#254, `b26bb1bf`) |
| `1a1c0901` (#255) | Relocation-gate legs A4/A7 retired | The relocation-gate issue's second grant (#253) |
| `e00a5217` (#259) | Agent-generator residuals (resolver and registry splits) | Issue-row grant `.kiro/issues/2026-10-01-agent-generator-out-of-grant-residuals.md` (#247, `ad17a22a`), widened by #260 (`823806a2`); Peter: "Go with A" |
| `7071e39f` (#261, non-squash merge) | VALVE-1 per-row spans (`1a2ff94f`), Kenya's re-sign `c2fba158`, Data's re-sign `2d243aa4`, the lock refresh `823c583d` | VALVE-1's issue-row grant (#242, `aadf9ab3`; narrowed by #243, `2da74864`); the signing-act ballot § 2 for `c2fba158` and `2d243aa4`; Peter: "You run it — I authorize it for this one PR" |
| `fafae2b0` (direct commit) | The Req 13 degradation warning's remedy clause | Task 16's row (post-close) |
| `8ebdae96`, `a26d45d1`, `c1b67b8f` (direct commits) | Thurgood's on-branch acts: the Req 13 design erratum, and the trigger log's creation and entries. None is a Task 18 artifact. | Thurgood's charter (`.kiro/specs/**`) for the erratum; the trigger log per #258 (main `2e6fdbed`) |
| Merges of `origin/main`: `7bd5a128`, `622a8280`, `6caf3ea3`, `2a96b911`, `d7e66501`, `c34ee564`, `e4dfa9e3`, `c81323ff`, `1dea07f7`, `ff0fadb6`, `e5350cad`, `65764594`, `c6e45f8a`, `24a00821`, `b5f4cd07`, `d622773a`, `43716418`, `eae1a07c`, `4d08f3f3`, `58011a7c` | `main`'s merged PRs | Each PR's own merge on `main` by Peter |

## R9 — Disclosure

I, Lina, authored the machinery pass four tests: the partition (C13), the span emission (C14) and the derivation check (C15). I also authored this branch's VALVE-1 per-row spans (`1a2ff94f`). The MIDPOINT disclosure (`tasks.md` § "Declared Merge Units", Stacy's condition 2) covers it: MIDPOINT checks that Task 18's applied edit is byte-equal to its pre-declared text (R4) and confined to the domains the verdict names.

---

## Subtask floor (18.1)

- **What changed**: this record only.
- **Targeted checks**: the confirming guard run at H (R2) and the ancestry command (R4).
- **Application-time adaptations**:
  - 18.1's `tasks.md` tick moves to the 18.2 commit, accepted by Stacy, so that this commit carries this record alone.
  - The confirming run is mine, at exactly H, accepted by Stacy. Thurgood's trigger-log entry is cited by path and SHA only.

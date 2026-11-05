# The Eleven Required-Check Jobs Run on `ubuntu-latest`, a Label GitHub Moves Without a PR; Pin Them to `ubuntu-24.04`

**Date**: 2026-11-05
**Filed by**: Thurgood, under rule 10, executing Peter's follow-up ruling of 2026-11-05T04:36:29Z: "Yes to all three follow-ups", the one he read being "Thurgood files a record to pin our 11 required checks, so GitHub's move of `ubuntu-latest` to 26.04 doesn't change them silently." The offer was my [THURGOOD R4] Q5 entry in Spec 129's feedback. Read at `origin/main` `45f5262ee`.
**Owner**: Thurgood (the instrument's workflows and the gate's contexts). **Consulted**: Data (the 26.04 move, Q5 R2 and R3).
**Class**: P2 obligation (guard) · owed-act *(set 2026-11-05, Thurgood, rule 12. The required gate is the instrument that says "this environment ran this check". Its environment can change on GitHub's schedule with no commit, so the claim "the same checks ran as last week" is weaker than it reads. No reader is misled today, which keeps this out of P0, and nothing is broken, which keeps it out of P1. The opposing read is P3 improvement: a runner move that breaks a job fails loudly and is repaired after the fact, so nothing is silent. I class it (guard) because the break is not the only outcome: a job can pass on a new image with different tool versions and the gate then certifies something nobody reviewed.)*
**Trigger**: `merge:#657` — the fixing PR (`chore/pin-required-runner-images`), whose merge owes this record's close under rule 5. *(Re-ruled 2026-11-05 by Thurgood, rule 9, on Peter's go of 2026-11-05T04:41:33Z, "Yes, pin now; keep 655 at P1", now that the fixing PR exists. Before this: `release:next:phase-1`, the event being GitHub's move of `ubuntu-latest`, which no git-visible token expresses.)*

---

## What is true at `45f5262ee`

Read from `.github/workflows/*.yml` and `tools/agent-generator/verify-gate-registration.sh`:

- **Eleven required-check jobs** run on `runs-on: ubuntu-latest`. They are the jobs that carry the nineteen `EXPECTED_CONTEXTS` (the array and `EXPECTED_COUNT=19`):

  | Workflow | Job | Required contexts it produces |
  |---|---|---|
  | `lane-timing.yml` | `lane-typecheck`, `lane-build-validate`, `lane-functional-root`, `lane-mcp-server-suite`, `lane-application-mcp-server-suite` | 5 |
  | `agent-generator.yml` | `check` (matrix) | 9 (the `122-*` contexts) |
  | `consumer-guard.yml` | `consumer-guard` | 1 (`Consumer Guard`) |
  | `package-name-drift.yml` | `check-drift` | 1 (`Check package name drift`) |
  | `section-citations.yml` | `section-citations` | 1 (`Section Citation Guard`) |
  | `tool-boot-smoke.yml` | `tool-boot-smoke` | 1 (`125B-tool-boot-smoke`) |
  | `completion-criteria-parity.yml` | `completion-criteria-parity` | 1 |

  That is 11 jobs, 19 contexts (5 + 9 + 1 + 1 + 1 + 1 + 1).
- **A twelfth `ubuntu-latest` line** is `agent-generator.yml`'s `setup` job (`122-setup`). It is not a required context, but the nine `122-*` contexts `need` it, so it moves with them. The total is 12 `runs-on` lines across 7 workflow files, and no other `runs-on` value appears in `.github/workflows/`.
- No workflow pins an image today. `.github/in-lane-guards.json` and the gate script name no runner.

## The 26.04 move: UNVERIFIED here

The claim is Data's (Q5 R2 and R3, restated in his plan round: "`ubuntu-latest` moves to 26.04 this month"). Data's stated source is the `actions/runner-images` readme. I did not read it: this session has no downloads, and nothing in the repo carries that readme. Treat the date, and the target version, as **unverified**. The record does not depend on them: whatever the label points at, it moves without a PR, and `ubuntu-24.04` is a published image label that Data read the readme for in R2 (VERIFIED by him, not by me). A pin fails loudly if GitHub ever retires the image; that is a visible failure, not a silent one. **The first act of the fix is to read the readme and cite it in the fixing PR.**

## The fix

Change each of the 12 `runs-on: ubuntu-latest` lines to `runs-on: ubuntu-24.04`. One line each, no other change, no removed line.

- **Who may make it.** Re-pinning is a runner change. My standing CI scope (ballot 2026-09-27-ci-regime-standing-scope § 2) names "env/cache/runner" as excluded, so it is not mine to do on standing scope. It needs **Peter's own go** or an **issue-row grant** (rule 8). A grant would list the seven workflow files above, activate when Peter merges a PR whose body names it, and carry that PR's `**ARMING**: at this merge and at the fixing PR's merge` line. **This record carries no `**Grant paths**` block**, so nothing is activated by its merge: a block naming `.github/` would owe an activation read at the next walk (LIVENESS read 4). If Peter chooses the grant route, I add the block in a follow-up edit to this record, merged before the fixing PR.
- **The fixing PR's evidence.** The `git diff --numstat` of the seven files shows 12 insertions and 12 deletions; the required contexts keep the same names (the gate script's assert is unchanged and `EXPECTED_COUNT` stays 19); and the PR's checks pass on the pinned image. Deleting a line on a CI path means the PR quotes the 12 lines in a `**Deleted lines**:` block (rule 8).
- **After the fix.** A pin is a decision to re-read: the image is retired by GitHub on its own schedule (the readme names the dates), and moving the pin is a runner change like this one. The fixing PR adds a dated line to this record naming the next re-read, and the record then closes under rule 5.

## What this is not

- **It does not touch the native harness.** The macOS and Android probes in Spec 129's native plan pin their own labels (`ubuntu-24.04` for the Android lane per Data's plan round; the Xcode and macOS image pin is Kenya's). That work is Spec 129's, not this record's.
- **It is not a change to which checks are required.** No context is added, renamed or removed, `EXPECTED_CONTEXTS` and `EXPECTED_COUNT` are untouched, and branch protection is Peter's.
- **It is not a statement that 26.04 breaks anything.** Nothing here was run on 26.04. The point is that a change of environment should arrive as a reviewed commit.

## Counter-argument that survives

Pinning trades a silent move for a silent staleness: `ubuntu-24.04` is patched by GitHub within its image, but when it is retired the 12 lines fail all at once, on GitHub's date, and every PR is blocked until someone repins. `ubuntu-latest` spreads that cost over time instead of paying it in one step. I weigh the single visible failure over a gradual unreviewed one, because a failure can be seen and an unreviewed environment change cannot. If Peter reads the other way, the same record closes as "declined, with the reason", and the Trigger is not re-ruled to `manual`.

**Fork surfaced, not picked**: pin now (Peter's go or a grant, before the move) versus pin at the next release (the move may land first). I recommend before the move, because the Trigger's event is the move, and the next release's date is not known to me.

## Fork answered (2026-11-05)

**Peter, 2026-11-05T04:41:33Z** (`date -u` at receipt, orchestrator relay), answering "Should Thurgood pin the jobs to `ubuntu-24.04` now, before GitHub moves `ubuntu-latest`, or wait until the next release?": "Yes, pin now; keep 655 at P1". The fork is answered for pinning now. His go is the authority for the runner change, so this record takes no `**Grant paths**` block. The fixing PR is `chore/pin-required-runner-images`; the Trigger is re-ruled to it once it is open. The second clause concerns another record and changes nothing here. — Thurgood

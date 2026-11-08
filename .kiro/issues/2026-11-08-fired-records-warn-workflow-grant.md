# Issue: the CI step of the warn-only `fired-records` check (a new non-required workflow), and its grant

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.github/workflows/pr-records.yml` — the event that owes the close is the fixing PR's merge, which adds that file. The close is this record's rule 5 outcome line and its archive move in the fixing PR. The outcome line gives the fixing PR's `.github/**` diff, its `--numstat` (one file added, 0 deletions), and its own `fired-records` run URL with the `fired-records:` count line.
**Source**: Peter, 2026-11-08, relayed by the orchestrator: "Let's pursue that class fix if we aren't already." The class is CLOSEOUT crack C: records fire at merges, and no one sees them fire. It is item 3 of the DRAFT ballot `.kiro/docs/ballots/2026-11-08-closeout-cracks.md` (on `chore/ballot-closeout-cracks`).

---

## Why the warn-only check needs a grant and not a ballot

- **It changes no rule.** It reads README rules 1 and 11 as written, and lists what they already say a merge does.
- **The script half is in my standing write scope**: `scripts/issues-owned.sh` and `scripts/__tests__/issues-owned.test.ts`. It is the `--pr` mode on `chore/fired-records-warn-check` at `6b76a744b`.
- **The CI half is a new workflow file.** No seat's standing scope covers it, so it takes this issue-row grant (rule 8). It is none of M1's excluded acts (below).
- **The failing, required version is not granted here.** It is the ballot's item 3 (e), and Peter's.

## Why now: #791 and #796

- **#791**, Spec 129's CLOSEOUT claims pass (`693b39b54`), added `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`.
- That path was the Trigger of five root records. Two of them have harness entries tagged to them: the 129 charter (`2026-10-02-consumer-generation-completeness-spec.md`, Ada and Lina) and Lina's component-repair record (`2026-11-07-native-component-repair-from-first-harness-run.md`).
- Nobody re-ruled them in #791. The harness tag check (`compare.ts`, Req 1.4) then failed **every open PR** with `FAIL tag: … FIRED@693b39b54 and that is still open`.
- **#796** (Lina's re-rule, `929972713`) is the fix.

The PR mode, run on #791's own diff, lists all five before the merge:

```
$ scripts/issues-owned.sh --pr 791 --base 693b39b54^ --head 693b39b54
fires-here	.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md	Ada	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fires-here	.kiro/issues/2026-09-26-native-component-distribution.md	Ada, Data, Kenya, Lina	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fires-here	.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md	Ada, Lina	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fires-here	.kiro/issues/2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md	Ada	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fires-here	.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md	Lina	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fired-records: 5 fire(s) here, 0 re-ruled here, 0 closed here, 0 already fired; PR #791, merge base bf4cd7677, head 693b39b54
```

The mode was also replayed over Spec 129's 104 merges (the ballot's Census appendix C). It gave 21 warnings, which include every lapse the MIDPOINT and CLOSEOUT passes reported. Two of the 21 are in the disputed-fire class (MIDPOINT S-5).

---

## The grant

**Grant paths**: `.github/workflows/pr-records.yml`

- **No `.github/in-lane-guards.json` entry is needed.** The PR mode's cases are in `scripts/__tests__/issues-owned.test.ts`, which `scripts/jest.config.js` selects (`testMatch: ['**/__tests__/**/*.test.ts']`). That file is already run by the unconditional step "Run scripts/** test suite (npm run test:scripts)" of the required job `lane-functional-root` (`lane-timing.yml` L259–260). A registry entry for it would be an added entry under my standing P1b scope, which needs no grant, so this list does not name the file.
- **The fixing PR** is branch `chore/fired-records-warn-check`. It already carries the script half (`6b76a744b`). The workflow file is added to it **after this record's PR merges**, so the grant list is in a merged record before the diff it bounds (rule 10).

## What the job does

The job is **non-required and warn-only**. On every pull request, it lists the root records whose Trigger the PR's merge fires and never fails the PR.
- **The read** is `scripts/issues-owned.sh --pr <N> --base <base sha> --head <head sha>`: the seat mode's own token reading and `:(glob)` matching, over the PR's diff from its merge base.
- **Each record gets one state**: `fires-here`, `re-ruled-here`, `closed-here` or `already-fired@<sha>`. A `fires-here` grant carries the reason `grant`.
- **The output**:
  - one `::warning title=fired-records::` annotation per `fires-here` record (a `::notice` where the diff edits the record);
  - the list in the step summary;
  - the count line in the log.
- **The exit**: 0 always. The script exits 0 by design, and the step's command adds `|| true`, so an unexpected shell error cannot turn the context red.

The workflow file, exactly. A fixing PR that differs from it is out of list, unless a dated line in this record, added before that PR's merge, names the change.

```yaml
# pr-records.yml — warn-only PR-time reads of the records a merge fires.
# Grant: .kiro/issues/2026-11-08-fired-records-warn-workflow-grant.md (README rule 8). Not a required
# context: it is in neither EXPECTED_CONTEXTS nor complete-task.sh's REQUIRED_WORKFLOWS, and it never
# fails a PR. A failing version is ballot 2026-11-08-closeout-cracks item 3 (e)'s, and Peter's.
name: pr-records

on:
  pull_request:

permissions:
  contents: read

jobs:
  fired-records:
    runs-on: ubuntu-24.04
    timeout-minutes: 5
    steps:
      - name: Checkout (full history; the read compares the merge base with the head)
        uses: actions/checkout@v5
        with:
          fetch-depth: 0

      - name: The records this merge fires (scripts/issues-owned.sh --pr)
        env:
          PR_NUMBER: ${{ github.event.pull_request.number }}
          BASE_SHA: ${{ github.event.pull_request.base.sha }}
          HEAD_SHA: ${{ github.event.pull_request.head.sha }}
        run: |
          out=$(bash scripts/issues-owned.sh --pr "$PR_NUMBER" --base "$BASE_SHA" --head "$HEAD_SHA") || true
          printf '%s\n' "$out"
          {
            echo '### Records this merge fires (warn-only)'
            echo
            echo 'Under `.kiro/issues/README.md` rule 11, a `fires-here` record lapses at this merge unless this diff closes or re-rules it. A grant does not lapse; one still open after its fixing PR merges is a walk finding.'
            echo
            echo '```'
            printf '%s\n' "$out" | grep -v '^::' || true
            echo '```'
          } >> "$GITHUB_STEP_SUMMARY"
```

## What it must never do

**M1's excluded acts, carried** (ballot `2026-09-27-ci-regime-standing-scope` § 2, through M2 clause 5):
- **Peter's, verbatim**: "New required contexts, changes to `EXPECTED_CONTEXTS`'s count, branch protection and repo settings stay Peter's." The fixing PR adds no required context. It does not touch `tools/agent-generator/verify-gate-registration.sh`, `EXPECTED_CONTEXTS` or `complete-task.sh`'s `REQUIRED_WORKFLOWS`, and it asks no one to change branch protection.
- **The author's addition**: no step, selection floor or execution assertion is removed or weakened. The fixing PR adds one file and changes no other `.github/**` path, so `git diff --numstat` deletions on CI paths are 0 and no `**Deleted lines**:` block is owed.

**And, for this job**:
- **Never fails a PR.** It has no `exit 1` and no failing assertion, and nothing reads its conclusion as a gate. Making it fail is the ballot's item 3 (e), Peter's ruling, and a separate grant.
- **Never writes.** `permissions: contents: read` only. It posts no PR comment or review, and it pushes and edits nothing. It never closes, re-rules, archives or edits a record: those acts are the record's owner's (rule 9).
- **No other trigger, no `if:`, no `continue-on-error`.** It runs on `pull_request` only: never `pull_request_target`, `push`, `schedule` or `workflow_dispatch`. It has no `if:` and no `continue-on-error`; the step's `|| true` is the only exit-code handling.
- **No secret** beyond the default token, which is read-only here, and no network call beyond the checkout.

## ARMING

- **The activating PR** (this record's PR) carries `**ARMING**: at this merge and at the fixing PR's merge`.
- **The ARMING read** is Stacy's, at both merges (her charter, ARMING row). At this merge she reads the list: it names no governance-law path and admits no M1-excluded act. She writes the column-0 line `**Grant activation read**: .kiro/issues/2026-11-08-fired-records-warn-workflow-grant.md @ <activating-merge sha, 9 characters>`. At the fixing PR's merge she reads that its `.github/**` paths are a subset of this list as it stood at the activating merge, with deletions 0.

## The cycle (warn-only), for the record

- The check is warn-only from the fixing PR's merge through the first monthly walk at least 28 days later.
- That walk's record counts:
  - **listed**: `fires-here` lines;
  - **mechanical mismatches**: a record listed at a PR's last head that the seat mode does not print `FIRED@<squash>` for after the merge, plus a `FIRED@<squash>` the check did not list;
  - **owner-disputed fires**: a listed record whose owner writes on it that the touch was not the event its prose names.
- Whether it then fails a PR is the ballot's item 3 (e), and Peter's decision.

## Known reach

- **A dated outcome line in the diff is not read.** That record prints `fires-here` with "(this diff edits the record)", and its annotation is a notice.
- **A record whose `path:` is a file another seat writes** is listed on a PR whose author may not close it (rule 9). #791's five are this case. The check reports it; it does not resolve it.

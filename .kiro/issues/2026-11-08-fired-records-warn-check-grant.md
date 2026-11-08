# Issue: a warn-only PR-time check that lists the records a merge fires (`fired-records`), and its grant

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.github/workflows/pr-records.yml` — the event that owes the close is the fixing PR's merge, which adds that file. The close is this record's rule 5 outcome line: the fixing PR's `.github/**` diff, its `--numstat` (deletions 0, a new file), and the first run's URL with its `fired-records:` count line.
**Source**: Peter, 2026-11-08, relayed by the orchestrator: "Let's pursue that class fix if we aren't already." The class is CLOSEOUT crack C (ballot draft `.kiro/docs/ballots/2026-11-08-closeout-cracks.md` item 3, on `chore/ballot-closeout-cracks`). **The warn-only version needs no ballot.** It reads README rules 1 and 11 as written and changes no rule. The script half is in my standing scope (`scripts/issues-owned.sh`, its test). The CI half is a new, non-required workflow, which is this issue-row grant (`.kiro/issues/README.md` rule 8). It is not one of M1's excluded acts: no required context, no `EXPECTED_CONTEXTS` change, no branch-protection or settings change, and no step removed or weakened. **The failing, required version is the ballot's**, and so is the register row's `checks` entry.

---

## Why now — #791 and #796

- **#791**, Spec 129's CLOSEOUT claims pass (`693b39b54`), added `.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`.
- That path was the Trigger of five root records, among them the 129 charter (`2026-10-02-consumer-generation-completeness-spec.md`, Ada and Lina) and Lina's component-repair record (`2026-11-07-native-component-repair-from-first-harness-run.md`). Both have harness entries tagged to them.
- Nobody re-ruled them in #791. The harness tag check (`compare.ts`, Req 1.4: an entry's tag is an open root record whose Trigger can fire) then failed **every open PR**: `FAIL tag: … FIRED@693b39b54 and that is still open`.
- **#796** (Lina's re-rule, `929972713`) is the fix, and it is green.

The check this record grants would have printed both records on #791 before its merge:

```
$ scripts/issues-owned.sh --pr 791 --base 693b39b54^ --head 693b39b54
fires-here	.kiro/issues/2026-06-24-oklch-shadow-color-family-not-migrated.md	Ada	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fires-here	.kiro/issues/2026-09-26-native-component-distribution.md	Ada, Data, Kenya, Lina	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fires-here	.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md	Ada, Lina	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fires-here	.kiro/issues/2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md	Ada	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fires-here	.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md	Lina	path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md
fired-records: 5 fire(s) here, 0 re-ruled here, 0 closed here, 0 already fired; PR #791, merge base bf4cd7677, head 693b39b54
```

The same mode on #778 prints Kenya's erratum (`merge:#778`, added in that PR; CLOSEOUT CP-12), and on #774 the dual-instance record (CP-3).

---

## The act

**Grant paths**: `.github/workflows/pr-records.yml`

Add **one new workflow file**, `.github/workflows/pr-records.yml`, with exactly this content (a fixing PR that differs from it is out of list, except for a change this record names in a dated line before that PR's merge):

```yaml
# pr-records.yml — warn-only PR-time reads of the records a merge touches.
# Grant: .kiro/issues/2026-11-08-fired-records-warn-check-grant.md (rule 8). Not a required context:
# it is in neither EXPECTED_CONTEXTS nor complete-task.sh's REQUIRED_WORKFLOWS. Every step exits 0 by
# design (the scripts are reads, never gates); a later failing version is ballot
# 2026-11-08-closeout-cracks item 3's, and Peter's.
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
          out=$(bash scripts/issues-owned.sh --pr "$PR_NUMBER" --base "$BASE_SHA" --head "$HEAD_SHA")
          printf '%s\n' "$out"
          {
            echo '### Records this merge fires (warn-only)'
            echo
            echo 'Under `.kiro/issues/README.md` rule 11, a `fires-here` record lapses at this merge unless this diff closes or re-rules it.'
            echo
            echo '```'
            printf '%s\n' "$out" | grep -v '^::'
            echo '```'
          } >> "$GITHUB_STEP_SUMMARY"
```

- **The read** is the PR mode of `scripts/issues-owned.sh` (its header and `scripts/__tests__/issues-owned.test.ts`, "--pr (fired-records)"). The PR mode prints `::warning title=fired-records::` per `fires-here` record when `GITHUB_ACTIONS=true` (a `::notice` when the diff edits the record), so the warnings are annotations, which outlive the logs.
- **Not in this grant**: an `if:`, a `continue-on-error`, any other workflow file, `EXPECTED_CONTEXTS`, `complete-task.sh`'s `REQUIRED_WORKFLOWS`, and branch protection.
- **ARMING**: the activating PR carries `**ARMING**: at this merge and at the fixing PR's merge`. No line is deleted on a CI path (a new file), so no `**Deleted lines**:` block is owed.

## The cycle and its counts (warn-only)

- The check is warn-only from the fixing PR's merge through the first monthly walk at least 28 days later. That walk's record carries three counts:
  - **listed**: `fires-here` lines on merged PRs;
  - **mechanical mismatches**: a record listed at a PR's last head without `FIRED@<squash>` from the seat mode after the merge, and a `FIRED@<squash>` the check did not list;
  - **owner-disputed fires**: a listed record whose owner writes on the record that the touch was not the event its prose names.
- Whether it then fails a PR is ballot `2026-11-08-closeout-cracks` item 3 (e), and Peter's decision.

## Known reach

- A dated outcome line added in the diff is not read: such a record prints `fires-here` with "(this diff edits the record)", and its annotation is a notice.
- A record whose `path:` is a file another seat writes (the five above) is listed on a PR whose author may not close it (rule 9). The check reports that; it does not resolve it (the ballot's § 9).

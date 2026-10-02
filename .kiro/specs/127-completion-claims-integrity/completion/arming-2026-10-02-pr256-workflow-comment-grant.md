# ARMING read: #256, the first `.github/**` issue-row grant, read at both its events

**Event**: ARMING (the trigger-table row in `canonical/agents/stacy.md`, as amended by edit site 4 of ballot `2026-09-27-ci-regime-standing-scope`, RATIFIED Peter 2026-09-28, `R` = `d455fe34`). The Event clause reads "an issue-row grant (ballot … § 3) over a `.github/**` path merges (**at its activating merge, and again when its fixing PR merges**)". This record carries **both** events, because the first has no earlier record (see F-1).
**Grant**: `.kiro/issues/2026-09-28-package-name-drift-workflow-comment-grant.md` (owner Lina; `**Grant paths**: .github/workflows/package-name-drift.yml`).
**Event 1, activating merge**: #234, "Amend 123 Task 17 … workflow-comment grant issue (B-U2 F-2) (123)", squash-merged as **`08462b63`** on 2026-09-28 by Peter. **Read late, at this record** (F-1).
**Event 2, fixing PR**: #256, "Replace the package-name-drift workflow's directory list with a SCAN_DIRS pointer (123)". Head `e3d45e20`; squash-merged as **`891e4215`** on 2026-10-02 by Peter, parent `b26bb1bf`.
**Executing agent**: Lina (Sonnet) per the PR body (**self-attested**: the commit author is the merge-seat's git identity, so agent identity has no independent referent). **PR opener**: Lina.
**Reader**: Stacy · **Date**: 2026-10-02
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is a required check, a review gate, or a blocking condition on any PR.

---

## VERDICT: **PASSES, with one lapse on this seat (F-1) and two advisories.**

Both events read clean on substance. The activation held, the grant names no governance-law path and admits no M1-excluded act, and #256's diff is exactly the one listed path with a single comment line replaced. Nothing outside the grant was touched, and no barrier was weakened. The lapse is mine: the activating-merge read was owed at #234's merge and was not made then.

## Scope

- **Population**: one grant, two merges: #234 (activation) and #256 (fixing PR). 2 of 2 read.
- **The checks**, per the ARMING row's issue-row clause and ballot § 3 items 4, 5 and 6:
  - **Activation**: PR body names the issue path and the listed paths, Peter merged it, and the diff adds the `**Grant paths**:` list.
  - **At activation**: the list names no governance-law path, and names any M1-excluded act it admits.
  - **At the fixing PR**: the diff is a subset of the list as it stood at the activating merge, and `--numstat` deletions are `0` unless the grant names the act.
  - **The standing reads**: `audit:coverage-map`, `verify-gate-registration.sh`, `completion-criteria-parity` dormancy.

## Findings

**F-1 — Low, process lapse on this seat. Owner: Stacy.**
- **Promised**: the ARMING row's Event clause, in force at `08462b63` (`git show 08462b63:canonical/agents/stacy.md` carries it at L397), fires an issue-row grant "at its activating merge".
- **Claimed**: nothing. No record of an activating-merge read existed on 2026-10-01, when Task 17's hunks were read, or before this record.
- **Shipped**: #234 merged on 2026-09-28 with no ARMING read.
- **Cause**: the grant's own text (the issue's § "ARMING") says "**ARMING fires at the fixing PR's merge**", so the activating event was filed as not owed. The row says both. #234's title and body lead with the Task 17 plan amendment, so nothing in the PR signals an ARMING event.
- **Disposition**: the activating read is performed here, retroactively, from git at `08462b63`, and passes (§ Event 1). No decision hinged on it, because the grant was unused until #256. The lateness is recorded rather than smoothed over: this is a derivation, not a contemporaneous read.
- **Remedy on #234**: none.

**F-2 — advisory (Low), the issue's § "ARMING" paragraph understated the row. Routed to Thurgood (filer of the issue) and Lina (owner).**
- The paragraph says ARMING fires at the fixing PR's merge only, and cites ballot § 3 item 6 as if the extension were still "proposed". Both are stale since the extension was taken at `R`.
- **No action on the grant**: it has expired by rule (§ 3 item 3).
- **Open item, not a finding**: the issue is still `Status: ACTIVE` at `891e4215`. Its README convention item 5 says to close it "ideally in the PR that closes it, otherwise at the next health-check walk", so nothing is overdue.
- **A tension for the owner to resolve**: Task 17's criterion names the issue at its current path (`tasks.md` L805), and closing it `git mv`s it to `archive/`. Task 17.2's sweep row should cite whichever path is true when 17.2 lands.

**No finding on #256 itself.** Its one deleted line is a comment line, and the grant names that act (see below).

## Event 1 — the activating merge (#234, `08462b63`), derived by reading

| Check | How verified | Result |
|---|---|---|
| **Body names the grant** (§ 3 item 4) | `gh pr view 234 --json body`: the Summary names the issue path `.kiro/issues/2026-09-28-package-name-drift-workflow-comment-grant.md` and the path it grants, `.github/workflows/package-name-drift.yml`, owner Lina | pass. It does not use the words "Grant paths", but the rule asks for the issue path and the listed paths |
| **Diff adds the list** | `git show --numstat 08462b63` → `51 0 .kiro/issues/2026-09-28-package-name-drift-workflow-comment-grant.md` (new file) and `8 3 …/123-consumer-distribution/tasks.md`. `git show 08462b63:<issue> \| grep -n "Grant paths"` → L23: `**Grant paths**: \`.github/workflows/package-name-drift.yml\`` | pass |
| **Peter's merge** | `mergedBy: 3fn`, 2026-09-28T11:37:49Z | pass |
| **List names no governance-law path** (§ 3 item 5) | The one path is a `.github/workflows/` file. It is not under `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, `canonical/agents/**` or their renderings | pass |
| **Names any M1-excluded act it admits** | The issue's Grant § says "this fix does not need any of them: no new required context, no change to `EXPECTED_CONTEXTS`'s count, no removed or weakened step/floor/execution-assertion … a comment-text edit only". It admits none | pass |
| **The list is unchanged since activation** | `git show 08462b63:<issue>` vs the file at `891e4215` → identical (`diff` clean). The issue's one commit is `08462b63`. So the subset comparison below is against the list as it stood, and also as it stands | pass |

## Event 2 — the fixing PR (#256, `891e4215`)

| Check | How verified | Result |
|---|---|---|
| **Extent ⊆ the list** | `git diff --name-only b26bb1bf 891e4215` → exactly `.github/workflows/package-name-drift.yml`. The GitHub file list agrees: one file, `+1 −1`. The head tree equals the squash tree (`git diff --quiet e3d45e20 891e4215` → equal), so the CI results below are the merged content's | pass |
| **Grant paths cited in the body** | The squash message (= the PR body) carries `**Grant paths** (verbatim; the diff lists exactly this one): .github/workflows/package-name-drift.yml` | pass |
| **Deletions `0` on CI paths unless the grant names the act** | `git diff --numstat b26bb1bf 891e4215 -- .github` → `1 1 .github/workflows/package-name-drift.yml`. **The deletion count is `1`, not `0`; decided on the record**: the grant's "The fix" § item 1 names the act, "Replace line 5's enumerated list with a pointer sentence", and an in-place replacement cannot show as fewer than one deleted line. The deleted line is `#   .kiro/steering/, src/, product-template/, .kiro/agents/, dist/`, a comment. I accept the clause as satisfied. A stricter reading would make every replacement a finding, which no grant could pass (advisory A-1) | pass, by the named-act clause |
| **It really is comment-only** | `diff <(git show b26bb1bf:<file> \| grep -v '^#') <(git show 891e4215:<file> \| grep -v '^#')` → identical. No env, cache, runner, `if:`, `continue-on-error`, step or trigger line changed | pass |
| **M1-excluded acts absent** | The diff touches no other file. `verify-gate-registration.sh` and `agent-generator.yml` are unchanged, so `EXPECTED_CONTEXTS` and its count are untouched. The live registration is 18, count-asserted (below), and the drift step still exists | pass |
| **The Criterion** | `git grep -n "product-template\|\.kiro/agents\|\.kiro/steering" 891e4215 -- .github/workflows/package-name-drift.yml` → no output, exit 1. `git grep -c "product-template"` on the same → no output, exit 1 (zero) | pass |
| **The pointer is true** | `scripts/check-package-name-drift.js` L54 defines `const SCAN_DIRS`, and `main()` iterates it (L219). The new line 5 names that constant in that file | pass |
| **The drift workflow ran on the PR, green** | `gh pr view 256 --json statusCheckRollup`: `Check package name drift` → SUCCESS, among **21/21 SUCCESS** at head `e3d45e20` | pass |
| **Evidence owed in the body** | The `numstat` line, the `name-only` line, the criterion grep, the grant-paths line, the issue path and the ARMING line are all in the body. The `**Consulted**:` line is present | pass |

## The three standing reads

| Read | Run or derived | Result |
|---|---|---|
| `audit:coverage-map` | **Run** in this worktree on `main` @ `891e4215`: `npx tsx tools/agent-generator/coverage-map.ts` | `PASS (surfaces PASS · lanes PASS)`. Surfaces: 306 total, 297 guarded, 9 blank (all 9 adjudicated). Required contexts: 18, mapping to 19 job runs in 6 workflows. Stale adjudications: **(none)** |
| `verify-gate-registration.sh` | **Run**: `./tools/agent-generator/verify-gate-registration.sh`, live against GitHub | `PASS: all 18 required contexts present, count-asserted (N=18 recorded in this script)`. `Check package name drift` is among them. This is the registration as of today, not as of the merge, but the PR touched neither the script nor any context, so the two cannot differ because of #256 |
| `completion-criteria-parity` dormancy | **Run**: `npm run check:completion-criteria-parity` on `main` @ `891e4215` | **Not dormant**: `parents evaluated 15, pass 15, fail 0; emissions 0; reds 0`. The workflow file is unchanged by #256 and still triggers on `pull_request`. It ran, SUCCESS, on the PR |

## Method: the sample, named, and how many of the total

- **Everything in this record was derived from git, plus GitHub's PR metadata and check rollup.** Nothing was sampled; both events are fully read. The population is 1 grant, 2 of 2 events.
- **Not run**: nothing was skipped. No build was needed.
- **Derived by reading** (not run): Event 1 entirely (a retroactive read, F-1), the `numstat`, extent and subset checks, the comment-only check, and the grep criterion.
- **Provenance**: the PR metadata, the check rollup and the live registration were fetched by this session using the credential snippet the orchestrator supplied in the brief; the token was exported into the shell for the `gh` and `verify-gate-registration.sh` calls and was never printed or written. Earlier ARMING records were pasted in by the orchestrator instead.
- **The reads left no tracked file modified** (`git status --porcelain` clean after each).

## Standards implications

1. **A-1 (advisory, to Thurgood as ballot author and to Peter, since my ARMING row is itself ballot-only).** "`--numstat` deletions `0` on CI paths unless the grant names the act" is unsatisfiable by an in-place replacement. It passed here only because the grant's "The fix" § happens to say "Replace". A more decidable form is "deletions `0`, or every deleted line is a comment line the grant names". Not urgent: one instance, and the clause as written failed toward the grant, not against it.
2. **A-2 (advisory, to Thurgood).** The activating merge of an issue-row grant has no detector. The population is greppable: `git log --first-parent -S'**Grant paths**:' --name-only -- .kiro/issues`. The cheap fix is that the grant issue template's "ARMING" paragraph says "at both merges", and the RELEASE or LIVENESS step runs that query. I do not recommend a script for one instance.
3. **F-1's counter-argument.** A same-day retroactive read costs little, and nothing hinged on the missing one. What survives: an event nobody is prompted to read is exactly the shape of rot-mode-1. The next grant's activating PR should carry the ARMING line in its own body, so the read is prompted by the PR.

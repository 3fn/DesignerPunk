# Issue: build the merge-hold and law-ratified checks, and promote `law-ratified` to required (grant)

**Date**: 2026-11-07
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:tools/agent-generator/verify-gate-registration.sh` — the event that owes the close is the promotion PR's merge, which edits that file (`EXPECTED_CONTEXTS` and `EXPECTED_COUNT` 20 → 21 for `law-ratified`). The close is this record's rule 5 outcome line after Peter's branch-protection act: the pasted `PASS: all 21 required contexts present, count-asserted (N=21 …)` line from a credentialed session (ballot item 5, and the #716 → #717 → #718 precedent). `merge-hold`'s own promotion is a separate record.
**Source**: ballot `.kiro/docs/ballots/2026-11-07-merge-hold-and-law-ratified-checks.md`, RATIFIED (Peter, 2026-11-07T17:59:15Z): "Re: 2, Ratified. F-1, 5; F-2, Yes; F-3, Yes" (merged as #722, `d1d886d42`). Item 3 specifies the checks; item 4 the two register rows; item 5 this route.

---

## The act

Build one workflow, `.github/workflows/merge-hold.yml`, with two jobs, `merge-hold` and `law-ratified`, both non-required in the build PR. Then, in a second PR after a throwaway PR shows `law-ratified` red, **promote `law-ratified` to required**: add it to `EXPECTED_CONTEXTS` and raise `EXPECTED_COUNT` by one (20 → 21). `merge-hold` stays advisory until 5 clean runs that parsed at least one marker (F-1 = 5); its promotion goes through its own record.

## Grant

**Grant paths**:
- `.github/workflows/merge-hold.yml`
- `tools/agent-generator/verify-gate-registration.sh`
- `governance/classification-map.md`

Per `.kiro/issues/README.md` rule 8 and ballot `2026-09-27-ci-regime-standing-scope` § 3:
- The grant holds on the build PR's branch and on the promotion PR's branch, and expires when the promotion PR merges.
- It is activated by Peter's merge of the record-only PR that adds it, whose body carries `**ARMING**: at this merge and at the fixing PR's merge`.
- It confers no ratification authority and is additive to Thurgood's charter scope. Scripts under `scripts/completion-claims/**`, `.github/in-lane-guards.json` entries (P1b) and `.kiro/issues/**` are within Thurgood's standing scope and are not granted here.

**Admitted edits**, nothing else:
1. Build PR: create `.github/workflows/merge-hold.yml` (two jobs, `pull_request` to `main`, types `opened, synchronize, reopened, edited`); add the two register rows of ballot item 4 (`merge-hold-answer-cited` and `law-ratified-at-head`) to `governance/classification-map.md`, `check_state: proposed` until armed.
2. Promotion PR: in `tools/agent-generator/verify-gate-registration.sh`, add `law-ratified` to `EXPECTED_CONTEXTS` and raise `EXPECTED_COUNT` 20 → 21, with the register row `law-ratified-at-head` set to `armed` and a history line.

**The excluded act this grant admits, named** (ballot `2026-09-27-ci-regime-standing-scope` § 3 clause 5): **a new required context, and `EXPECTED_COUNT` 20 → 21, for `law-ratified` only.** Not admitted: `merge-hold` becoming required; any other `.github/**` path; any change to `complete-task.sh`'s `REQUIRED_WORKFLOWS` (the workflow dispatches on `pull_request` only); any removal or weakening of a step, floor or execution assertion; any demotion.

The build PR creates a file and deletes no line on a CI path, so it carries no `**Deleted lines**:` block; the promotion PR quotes the lines it replaces.

## Order, and what Peter does

1. This record-only PR merges (activates the grant).
2. The build PR lands the workflow, the script `scripts/completion-claims/merge-hold.ts` with its test and 17 fixtures, the register rows, and `.kiro/issues/<date>-merge-hold-promotion-reads.md` (owner Stacy). It merges after the law-text application PR (ballot § 6 step 2).
3. A throwaway PR shows `law-ratified` red (a LAW line citing a DRAFT ballot; a governance file with no line); the run is cited in the promotion PR.
4. Promotion PR merges. **Peter then adds the required status check named exactly `law-ratified`** in Settings, Branches, `main`. A credentialed session runs `bash tools/agent-generator/verify-gate-registration.sh` and pastes the `N=21` PASS line into this record.

## Counter-argument and what survives

Making `law-ratified` required early is safe because it is decidable from git (ballot § 7); the ballot's residuals stand: forgeable by an agent holding Peter's credential, kind evasion is not decidable from git, and the presence limb is file-grain.

---

## Outcome (rule 5), 2026-11-07

**`law-ratified` promoted and ARMED.** The promotion PR merged as #728 (`4a8486389`) at 2026-11-07T19:00:43Z, after the build PR #727 and the throwaway PR #726's red run (42400738704). Peter then made his branch-protection change. At 2026-11-07T19:02:37Z the orchestrator session, a credentialed session, verified through the API that `main` requires 21 contexts, including `law-ratified` and `harness-android-tokens`, with `main` the only rule.

The orchestrator then ran `bash tools/agent-generator/verify-gate-registration.sh` on `main` at `4a8486389`, after Peter's act. Its last line (the ARMED evidence of the lifecycle's step 4), pasted as relayed by the orchestrator:

`PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`

The grant expired at #728's merge. `merge-hold` stays advisory until five clean runs that parsed a marker; its promotion has its own record (`.kiro/issues/2026-11-07-merge-hold-promotion-reads.md` lists the reads owed). This PR records the line and, under rule 5, archives this record; it arms Stacy's ARMING read.

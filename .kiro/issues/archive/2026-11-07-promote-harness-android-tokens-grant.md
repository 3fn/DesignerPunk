# Issue: promote `harness-android-tokens` to a required check (the first promotion), and its grant

**Date**: 2026-11-07
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:tools/agent-generator/verify-gate-registration.sh` — the event that owes the close is the change PR's merge, which edits that file (`EXPECTED_CONTEXTS` and `EXPECTED_COUNT` 19 → 20). The close is this record's rule 5 outcome line after Peter's branch-protection act: the pasted `PASS: all 20 required contexts present, count-asserted (N=20 …)` line, run by a credentialed session. That line is the ARMED evidence (`tasks.md` § "Decision 6", "The promotion lifecycle", step 4).
**Source**: Peter's "a with both additions and short amendment", received 2026-11-07T15:36:39Z (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-ruling-promotion-android-tokens.md`, which states the costs he accepted). The plan text is Spec 129 tasks amendment 8 (#715, `b98f7c5eb`): `tasks.md` § "Decision 6", "The promotion lifecycle", steps 1 to 4.

---

## The act

**Promote `harness-android-tokens` to required**, and so raise `EXPECTED_COUNT` from 19 to 20.

The offer (lifecycle step 1): `scripts/harness/stability.ts` re-run at `origin/main` @ `b98f7c5eb` lists, for `harness-android-tokens`:
- **Condition 2**: 18 consecutive pull-request runs, no break (the streak). Run ids and head SHAs: 42334777875 `7f913164a`, 42335435837 `901d72002`, 42336147392 `c0d7281e9`, 42336916041 `c16d4a79d`, 42339305095 `96be4806e`, 42339822561 `97067e0dc`, 42341951949 `4bb7b43dd`, 42344710377 `cd52a9bd2`, 42378872101 `78dcd0f39`, 42379456009 `df293bda6`, 42380304363 `5c2d27d75`, 42381118398 `fd3f8648d`, 42383642198 `1e1dd5360`, 42383947129 `17bb37828`, 42384684480 `cba101c76`, 42385313762 `b99105b0d`, 42386475858 `00d7e5fb2`, 42387838286 `8352ba070`.
- **Condition 3**: 9 cold-cache runs (pull-request runs with `cache: miss` that reached the comparator), each under 10 minutes (120 s to 156 s): 42334777875, 42339305095, 42341951949, 42378872101, 42379456009, 42381118398, 42383642198, 42386475858, 42387838286.
- Infra runs: 0 of 38 recorded (infra rate 0.0%).
- **Condition 1**: the floor case holds. The toolchain case is per platform, and **the Android case is owed**; the change PR adds it (below).
- Conditions 4 and 5 are iOS only.

The record is committed in the change PR.

---

## Grant

**Grant paths**:
- `tools/agent-generator/verify-gate-registration.sh`
- `.kiro/hooks/complete-task.sh`
- `scripts/harness/__tests__/compare.test.ts`

Per `.kiro/issues/README.md` rule 8 and the lifecycle (step 2):
- The grant holds on the change PR's branch only, and expires when that PR merges.
- It is activated by Peter's merge of the PR whose body names this record and this path list: the record-only PR that adds it (its body carries `**ARMING**: at this merge and at the fixing PR's merge`).
- It confers no ratification authority and is additive to Thurgood's charter scope.

**Admitted edits** (the lifecycle's step 3, nothing else):
1. `verify-gate-registration.sh`: add `harness-android-tokens` to `EXPECTED_CONTEXTS` and raise `EXPECTED_COUNT` by one (19 → 20).
2. `complete-task.sh`: add `native-harness.yml` to `REQUIRED_WORKFLOWS` (the first promotion only), and raise the script's count assertion for that array and its comment.
3. `compare.test.ts`: add the Android toolchain-mismatch falsification case (an `android.toolchain.*` field that differs from its pin fails class `toolchain`), condition 1's owed case. `compare.test.ts` is already a registered in-lane guard, so no registry change.

**Excluded acts** (none is admitted here): no other required context; no branch-protection setting (Peter's act in Settings, after the merge); no `.github/**` path; no removing or weakening of a step, floor or execution assertion; no demotion.

The change PR deletes lines only where a count or a comment is replaced; its body quotes each deleted line in a `**Deleted lines**:` block.

---

## What Peter sets

After he merges the change PR: in Settings, Branches, the branch protection of `main`, add the required status check named exactly **`harness-android-tokens`** (the pull-request job name; the dispatch name `harness-android-tokens (unit-branch)` is not it). Then a credentialed session runs `bash tools/agent-generator/verify-gate-registration.sh` and pastes its PASS line here as this record's rule 5 outcome line.

## Counter-argument and what survives

The costs Peter accepted are in his ruling record. What survives: no context has lived through a real registry outage, so the demotion thresholds are guesses (`.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md`), and the context's list holds 18 entries, so its PASS means the failures match the list, not that the code compiles.

---

## Outcome (rule 5), 2026-11-07

**Promoted and ARMED.** The change PR merged as #717 (`6572a601e`) at 2026-11-07T16:12:33Z. Peter then changed `main`'s branch protection. At 2026-11-07T16:15:46Z the orchestrator session, a credentialed session, verified through the API that `main` requires 20 contexts, including `harness-android-tokens`. The stray branch-pattern rule Peter first created was deleted, and `main` is now the only rule.

The orchestrator then ran `bash tools/agent-generator/verify-gate-registration.sh` on `main` at `6572a601e`, after Peter's act. Its last line (the ARMED evidence of lifecycle step 4), pasted as relayed by the orchestrator:

`PASS: all 20 required contexts present, count-asserted (N=20 recorded in this script)`

The grant expired at #717's merge. This PR records the line and, under rule 5, archives the record; it arms Stacy's ARMING read.

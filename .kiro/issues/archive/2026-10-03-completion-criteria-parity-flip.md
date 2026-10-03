# Issue: the `completion-criteria-parity` required flip — the grant for its PR, and the sequence of its four owed acts

**Date**: 2026-10-03
**Status**: ACTIVE. It carries a grant that does nothing until Peter's merge activates it.
**Owner**: Thurgood (the register row `completion-criteria-parity` is `owner: thurgood`).
**Trigger**: **Peter's ruling of 2026-10-03, "Let's start with #1"**. The flip lands as its own PR after the `v15.0.0` tag, which is now cut.
**Source**: `governance/classification-map.md` § `completion-criteria-parity`, history line dated 2026-10-02 ("ARMING SITTING, RECORDED … DECISION: ARMED … OWED ACTS …"). Peter's ruling there, verbatim: *'Go with A, arm now and land the flip after the tag'*. Also that row's 2026-09-19 "GATE-BITE OUTSTANDING" line.

---

## The four owed acts (by pointer, not restated)

All four are listed in the row's 2026-10-02 line, under "OWED ACTS":
1. **The gate-bite proof.** Stacy specifies the falsification fixtures; Thurgood builds and runs them; the run URLs are cited in the flip's recorded change.
2. **`EXPECTED_CONTEXTS` +1 with its count-assert**, in the same recorded change as the `check_state` flip.
3. **This issue-row grant.**
4. **Peter's branch-protection act** adding the context.

## The named-and-admitted act (ballot 2026-09-27-ci-regime-standing-scope § 3, clause 5)

> **What it does not change.** The grant is additive to charter scope and confers **no ratification authority**. **An issue can never grant a governance-law path**: `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, and agent charters, prompts or configs (`canonical/agents/**` and their renderings). Those stay ballot-only. **An issue-row grant over any `.github/**` path or `tools/agent-generator/verify-gate-registration.sh` carries M1's excluded acts** (no new required context, no change to `EXPECTED_CONTEXTS`'s count, no removing or weakening a step, floor or execution assertion), **unless the issue's grant line names the act and Peter's merge admits it.**

**This grant line names two M1-excluded acts, and Peter's merge of the PR that adds it admits them:**
- **(a) A new required context**, `completion-criteria-parity`. The job's `name:` is fixed at authoring (`.github/workflows/completion-criteria-parity.yml` L32) and cited on the register row. The protection-list entry itself is Peter's Settings act (owed act 4); this grant covers the repo side only.
- **(b) A change to `EXPECTED_CONTEXTS`'s count, 18 → 19**, in `tools/agent-generator/verify-gate-registration.sh`.

Nothing else from M1's excluded set is admitted: no step, floor or execution assertion is removed or weakened.

**Grant paths**: `tools/agent-generator/verify-gate-registration.sh`, `.github/workflows/completion-criteria-parity.yml`, `canonical/generated.lock`

- **Grantee**: Thurgood, this issue's named owner.
- **Activation**: Peter's merge of the PR whose diff adds this list and whose body names this grant (`.kiro/issues/README.md` rule 8).
- **Expiry**: the flip PR's merge.
- **What each path is for**:
  - **`tools/agent-generator/verify-gate-registration.sh`**: the two lines the script itself requires. It has a count-assert form today (`EXPECTED_COUNT=18`, L83; asserted at L132–138), and its header states the rule: "arming OR retiring a required check updates EXPECTED_CONTEXTS in the SAME recorded change (C9)". The +1 is:
    - one array entry after `"Section Citation Guard"`: `"completion-criteria-parity"   # armed <flip date> (Spec 127; register § completion-criteria-parity; gate-bite runs cited there)`;
    - `EXPECTED_COUNT=18` → `EXPECTED_COUNT=19`;
    - one header line naming the arming, in the form of the 2026-08-21 lines.
  - **`.github/workflows/completion-criteria-parity.yml`**: its header comment only (L3–13). That comment says the job "lands NON-REQUIRED" and "Do NOT add this context to EXPECTED_CONTEXTS before that recorded change". It is rewritten to say the context is required from the flip, citing the register row's flip line. **No step, trigger, job name or runner change.**
  - **`canonical/generated.lock`**: `tools/agent-generator/**` is in the diff-guard's input closure (`INPUT_CLOSURE_ROOTS`), and so is `governance/**`, which holds the register row. The script edit and the row flip both move the lock's `inputClosure`, so the flip PR refreshes the lock from a green `check:122:diff-guard` full run.
- **Governance paths: not grantable, and not in this list.** The register row flip (`check_state: proposed → armed`, plus its history line) is in `governance/classification-map.md`. Its authority is the recorded 2026-10-02 ARMING ruling above, applied in a Peter-merged PR under the governance carve-out.
  - **Note for Stacy's ARMING read and the claims pass**: the flip PR's `git diff --name-only` is therefore *this list plus `governance/classification-map.md`*. That governance path is named here, ahead of time, so it reads as the carve-out it is, not as an out-of-list edit (clause 6).
- **The gate-bite fixtures need no grant.** They live on a **throwaway branch** under `.kiro/specs/<fixture-spec>/` (a `tasks.md` and the deliberately defective `completion/*.md`). `.kiro/specs/**` is inside Thurgood's charter write scope, and the branch is **never merged**: each throwaway PR is titled and bodied `DO NOT MERGE — gate-bite`, then closed, not merged. A never-merged diff writes nothing onto `main`, so no grant extent applies to it.

## The sequence

1. **Stacy's fixture specification**, recorded in her own seat (a fresh seat is writing it now). It names each defect class, its expected red, and a clean control.
2. **Thurgood builds the fixtures and runs them** on the throwaway PR(s), stacked on the flip branch so they run the flip-branch workflow, marked never-merge and closed after the runs. **Recorded**: each red run URL with its emitted finding, and the control's green run URL.
3. **The flip PR**, Peter-merged under the carve-out. In one recorded change:
   - `verify-gate-registration.sh` +1, with the count at 19;
   - the register row `check_state: proposed → armed`, with a history line citing the bite run URLs and the control's green. `armed_at` is omitted, meaning `pr-gate` (the register's default);
   - the workflow header comment updated;
   - `canonical/generated.lock`, refreshed from a green full run.

   Its PR body carries the `**Consulted**:` line and cites this grant.
4. **Peter's branch-protection act**: Settings → Branches → `main` → add the required context `completion-criteria-parity`.
   - Then `verify-gate-registration.sh` is run and must PASS at 19. A FAIL that names the retired `122-sweep-5-corrected-state` still on the protection list is the pending Settings action recorded on 2026-08-21, not a flip defect. Whether it is still pending is to be read at that run.
5. **Stacy's ARMING read**, at the flip PR's merge.

**Framing, binding every reader** (from the row): a green `completion-criteria-parity` gate is **not** evidence of claim honesty. Arming removes nothing from the claims-pass audit duty.

---

**2026-10-03 — CLOSED: all four owed acts are done.**
- **(1) The gate-bite**: fixture specification by Stacy (#291, `f41d4e0b`); built and run by Thurgood on throwaway PR #290. That PR is closed unmerged and still a draft, and its commits are at `refs/pull/290/head`. Six fixture runs were made (row 7 dropped by the orchestrator), and both controls were green.
- **(2) `EXPECTED_CONTEXTS` +1**: 18 → 19, with the register row `check_state: proposed → armed`, in one recorded change, **#292 (`8bd4bb50`)**.
- **(3) This grant**: activated by #289 (`cb28f011`), with the named-and-admitted acts. **It expired at #292's merge.** The diff was the three grant paths plus the register row under the carve-out, as named.
- **(4) Peter's branch-protection act**, about 14:4xZ 2026-10-03: the live protection list is 19, and `verify-gate-registration.sh` PASSES at 19 on `main`. #292's own parity run and the push run on `main` at `8bd4bb50` were both green.
- **Stacy's ARMING read**: pending, by pointer. Her seat is writing it under `.kiro/specs/127-completion-claims-integrity/completion/`.
- **The known gap D-2 and the lows** moved to `.kiro/issues/2026-10-03-completion-criteria-parity-status-marks-gap.md`.
- **Archived** per `.kiro/issues/README.md` rule 5. — Thurgood

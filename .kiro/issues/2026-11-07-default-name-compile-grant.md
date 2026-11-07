# Issue: the default-name compile step in `harness-android-tokens` (Spec 129 U7a, Task 20), and its grant

**Date**: 2026-11-07
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-20-completion.md` — the event that owes the close is U7a's merge, which brings that doc to `main`. The close is this record's rule 5 outcome line: the fixing PR's `.github/**` diff, its deleted-line count, and the run URL of the step at head H.
**Source**: Peter's "Re: 4, Let's go with Ada's recommendation, but Ada should see weigh in on the amendment with Data and Thurgood", received 2026-11-07T20:21:05Z (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-07-peter-rulings-post-midpoint.md`; "should see weigh in" is read as "should weigh in"). The plan text is Spec 129 tasks amendment 10: `tasks.md` Task 20 (U7a). The gap it fills is the MIDPOINT pass's S-1 (`completion/claims-pass-midpoint.md`): no harness context compiles the default config name, `DesignerPunk`, which is the one name under which Android's theme type `data class DesignerPunkTheme` and the provider `fun DesignerPunkTheme(…)` share a name in one package.

---

## The act

Add **one step** to the `harness-android-tokens` job of `.github/workflows/native-harness.yml`. The step runs `harness/android/lane.ts --default-name` (Task 20): a second `generate` in a copy of the downloaded consumer with the top-level `name` removed, then a compile of `:tokens` and of `:probe` given only `ProbeFamily.kt`. It passes only when both compiles succeed with 0 keyed, `unrooted` and `unattributed` diagnostics, and the resolved name is `DesignerPunk`. `HarnessConsumer` stays the harness consumer's name. The step is an addition, never a replacement.

`harness-android-tokens` is a required check (#717, `6572a601e`). The step adds a way for that required job to fail. It adds no context and changes no count.

---

## Grant

**Grant paths**:
- `.github/workflows/native-harness.yml`

Per `.kiro/issues/README.md` rule 8:
- The grant holds on U7a's branch only, and expires when U7a's PR merges.
- It is activated by Peter's merge of the PR whose body names this record and this path list: Spec 129 tasks amendment 10's PR, whose body carries `**ARMING**: at this merge and at the fixing PR's merge`.
- It confers no ratification authority and is additive to Thurgood's charter scope.

**Admitted edits** (nothing else):
1. In the `harness-android-tokens` job only, one new step, placed directly before the "Upload the lane output" step, after "Save the Gradle cache". It runs the default-name option and writes one `default-name` annotation (`::notice` on a pass, `::error` on a fail). It carries no `if:` key and no `continue-on-error` key.
2. A comment above that step.

**Excluded acts** (none is admitted here): no new job and no new required context; no change to `EXPECTED_CONTEXTS` or `EXPECTED_COUNT`; no edit to any other job, or to any existing step, `env:`, cache key, runner, permission or trigger; no deleted line (the fixing PR's `git diff --numstat` deletions for the file are 0, so no `**Deleted lines**:` block is owed); no removing or weakening of a step, floor or execution assertion; no change to any iOS job.

---

## Counter-argument and what survives

The step raises the false-red surface of a required job, to guard a regression nobody has proposed. Data's local run at `3610718aa` already compiled the default name (`evidence/2026-11-07-mp4-default-name-run/`). What survives: that run is self-attested, so only a CI context makes the default name's evidence independent before any release that carries U6, and U8 and later units change what `:tokens` holds, which the step then compiles under the default name. *(Corrected 2026-11-07 in the review fold, `[ADA TASKS R5]` fix 1: the earlier text said U8 adds `DesignerPunk*`-shaped names; U8 adds `<Component>Tokens` names, which cannot clash with the default name.)* A flake in the step counts toward the demotion read's attempts-differ signal (`tasks.md` § "Decision 6", step 6 (b)), the same as any flake in the job, and an environment fault in the copy or the second `generate` carries no `harness-infra` (the compile runs `--offline`, so a registry is never reached).

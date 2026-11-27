# Issue: the Android render probe's workflow (can a free `ubuntu-24.04` runner run an Android emulator?), and its grant

**Date**: 2026-11-27
**Owner**: Data (the Android render lane's seat in Spec 132; Android co-owner of `.kiro/issues/2026-09-26-native-component-distribution.md`). **Filed by**: Data, under README rule 8, at the orchestrator's direction after Peter's answer of 2026-11-27T16:44:48Z, "Spec with (a), and start 132's outline round now".
**Class**: P2 obligation (guard) · grant *(set 2026-11-27, Data, rule 12. Without the probe, Spec 132's outline round decides Android's render lane and runner class on a guess. Not P1: no consumer is blocked.)*
**Trigger**: `path:.github/workflows/android-render-probe.yml`. The event that owes the close is the fixing PR's merge: the first commit on `main` that adds this file. The fixing PR carries rule 5's outcome line, with the probe's results recorded as described under "The result", in the same PR.
**Source**:
- The native plan, approved by Peter ("A yes, B (a), C yes; (x′) as defined", 2026-11-05T04:07:43Z). `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md`:
  - L172, "Probes, before 132's outline": "**Data's Android render probe**: a dispatched job on `ubuntu-24.04` checking whether `/dev/kvm` is usable, how long a system image takes to download and boot, one instrumented smoke test and one Robolectric Compose test. Both are recorded in the distribution charter, not as spec tasks, and neither is a gate."
  - L154: "Android emulator on a standard ubuntu runner (KVM) | **UNVERIFIED.** Data's probe settles it."
- The distribution charter's obligation (1) (`.kiro/issues/2026-09-26-native-component-distribution.md`, Trigger line). No grant was ever filed for the probe, so it never ran.
**Consulted**: none needed. This files the plan's own probe with the grant it always needed. The grant's limits are the M1 floor plus the acts named below.

---

## Why the probe runs, and what it decides

- **It feeds Spec 132's outline round**, which Peter started on 2026-11-27. On Android, "renders in the app" is proven by an emulator running the built app. Robolectric is a lower, labelled kind of evidence (plan-r2 L123 and L134).
- **It decides whether Android needs paid runners.** plan-r2 § 7 decision 6: "**A billed larger runner only if** the probe shows no KVM on `ubuntu-24.04`." If KVM works on the free runner, D5's Android lane can run on the standard queue. If not, the outline puts the choice to Peter: a billed larger runner, or the lower evidence kind.
- **It is not a gate**, and it adds no required context.

---

## Grant

**Grant paths**:
- `.github/workflows/android-render-probe.yml`

Per `.kiro/issues/README.md` rule 8 and ballot `2026-09-27-ci-regime-standing-scope` § 3:
- The grant holds on the fixing PR's branch only, and expires when that PR merges.
- It is activated by Peter's merge of the PR whose body names this record and this path list. That PR is the one adding this record, and its body carries `**ARMING**: at this merge and at the fixing PR's merge`.
- It confers no ratification authority and is additive to Data's charter scope.
- The probe's Gradle project goes under `harness/android/render-probe/**`, which is in Data's standing scope (ballot `2026-11-07-native-lane-ownership` item 1). The grant does not cover it and does not need to.

**Admitted edits** (nothing else):
1. **One new file**, `.github/workflows/android-render-probe.yml`.
2. **Triggers**: `workflow_dispatch`, and `pull_request` with a `paths:` filter listing exactly `.github/workflows/android-render-probe.yml` and `harness/android/render-probe/**`.
   - **This act is named here and admitted by the activating merge.** The filter means the workflow runs only on a PR that touches the probe, so it adds no check to any other PR.
   - Without it, the probe could not run before the fixing PR merges, because GitHub dispatches only a workflow whose file is on the default branch. A fix found on the first run would then need a second grant.
3. **Permissions**: `permissions: contents: read`.
4. **One job**, on `runs-on: ubuntu-24.04` with a `timeout-minutes:` of at most 60. Its steps, in order:
   1. Checkout.
   2. Record `/dev/kvm`: whether it exists, its mode and group, and whether the runner user can open it.
   3. The udev rule GitHub documents for its Linux runners (`KERNEL=="kvm", GROUP="kvm", MODE="0666"`), applied with `sudo`, then record `/dev/kvm` again. **This act is named here and admitted**: it changes only the ephemeral VM.
   4. JDK 17 from the image (`JAVA_HOME_17_X64`), as the harness selects it.
   5. Download one AOSP system image with the image's own `sdkmanager`, and time it. The image is `system-images;android-<api>;default;x86_64`, once at API 26 (Core Goals' minimum) and once at the harness's `compileSdk`, 36.
   6. Create an AVD for each, boot it headless (`-no-window -no-audio -no-boot-anim`), and time the wait until `sys.boot_completed` is 1.
   7. Run one instrumented Compose smoke test (`connectedDebugAndroidTest`) in the render-probe app, at each API level.
   8. Run one Robolectric Compose test (`testDebugUnitTest`) in the same app.
   9. Print one summary line per measurement, each beginning `render-probe: `, and upload the logs as an artifact with `retention-days: 7`.
5. **A comment header** naming this record, plan-r2 L172, and the distribution charter as the result's home.

**Excluded acts** (M1, M2 clause 5; none is admitted here):
- no new required context;
- no change to `EXPECTED_CONTEXTS` or its count;
- no change to `complete-task.sh`'s `REQUIRED_WORKFLOWS`: the probe is not a required workflow, and the completion tooling does not dispatch it;
- no removing or weakening of a step, floor or execution assertion;
- no other `.github/**` path;
- no edit to `native-harness.yml` or any other workflow.

The fixing PR creates a file and deletes no line on a CI path, so this record carries no `**Deleted lines**:` block.

**Also excluded, specific to this probe:**
- **No licence acceptance.** The workflow runs no `sdkmanager --licenses` and pipes no `yes` into any tool. The AOSP `default` images are read as covered by the SDK licence the runner image already ships accepted (REASONING; data-plan-r1 L268 reads the image the same way). If `sdkmanager` asks for a licence that is not accepted, the step fails, the probe reports it, and the question goes to Peter. It is not answered by the workflow.
- **No larger or billed runner.** A larger runner is the decision this probe informs (plan-r2 § 7 decision 6), so it cannot be its instrument.
- **No `schedule` or `push` trigger.**
- **No DesignerPunk component source and no repository secret.** The app is a toy: one `Text` in a `MaterialTheme`, asserted displayed. The probe measures the runner, not our components.

**Run budget**:
- Runs happen on the fixing PR's branch after the grant is active: one run per push of the probe.
- Each re-run of an infra failure, for example a registry 5xx or a download timeout, is named in the outcome line.
- After the fixing PR merges, the file stays on `main` as `workflow_dispatch` only, for Spec 132's later re-reads. What then edits it is 132's task row or a new grant.

---

## The result (what the fixing PR records)

Before its merge, the fixing PR appends a dated, signed section to `.kiro/issues/2026-09-26-native-component-distribution.md`. It records the measured values from the run at the fixing PR's head, with the run URL and each `render-probe:` line pasted, since artifacts expire after 7 days:
- `/dev/kvm` before and after the udev step;
- the system-image download time per API level;
- the boot time to `sys.boot_completed`, per API level;
- the instrumented smoke test's result per API level;
- the Robolectric test's result;
- the runner image version.

A failure is a result, recorded the same way. In the same PR, this record gains rule 5's outcome line and archives, and the distribution charter's obligation (1) is recorded as met.

---

## Counter-argument and what survives

**"Measure it in 132's tasks instead of filing a grant now."**
- The plan put the probe before 132's outline so that the outline round opens on measured numbers. The round has now started.
- A grant costs one record PR and one Peter merge. Folded: the probe runs on its own PR's branch, so the round can read its numbers as soon as that PR's run finishes, without waiting for any merge.

**What survives:**
- One run is a sample of one. Boot time on a shared free runner varies, and KVM availability depends on GitHub's runner fleet, which can change without notice, as image 20261122.23's JDK change did on 2026-11-27.
- The probe shows that a run can work, not that it works steadily. Steadiness is a D5 lane question for 132, read over many runs, the way the compile harness's tiers are promoted on measured stability.

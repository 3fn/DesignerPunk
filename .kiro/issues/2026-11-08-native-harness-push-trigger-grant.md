# Issue: the push trigger on `native-harness.yml` (cracks ballot item 1, site 1.1), and its grant (G-1)

**Date**: 2026-11-08
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.github/workflows/native-harness.yml` — the event that owes the close is the fixing PR's merge (branch `chore/cracks-item1-push-trigger`), which changes that file. The close is this record's rule 5 outcome line and its archive move, made in that PR.
**Source**: ballot `.kiro/docs/ballots/2026-11-08-closeout-cracks.md` item 1, site 1.1 and § 5 step 5. The ballot is RATIFIED for items 1 and 3 (Peter, 2026-11-08T20:36:57Z, "Ratified"), and the record of the ruling is `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ratifies-cracks-ballot-items-1-3.md` (#808). Site 1.1 names this grant, G-1: "filed at application, § 5 step 1; Owner Thurgood; **Consulted** Data, Kenya". It is filed now, in its own PR, so that the grant list is in a merged record before the diff it bounds (rule 10).
**Consulted**: Data and Kenya, at the ballot's round 1 on item 1 (relayed; ballot § 10). Neither changes their lane rules. Data asked that cache keys exclude `github.event_name`, which they already do: the Gradle cache key reads `runner.os` and three files, and this diff changes no key.

---

## The grant

**Grant paths**: `.github/workflows/native-harness.yml`

The fixing PR applies **exactly the diff below** to `.github/workflows/native-harness.yml`, with `git apply` at its own base. If the file has moved since `3987b4b06` and the diff no longer applies, the fixing PR stops and this record gets a dated line before any other change is made. The fixing PR also carries ballot sites 1.3 (a ledger line in ballot `2026-11-07-native-lane-ownership`) and 1.4 (a section in `.kiro/issues/2026-11-07-promoted-harness-contexts-demotion-read.md`). Neither is a `.github/**` path, and neither is granted here.

**What the diff does**:
- **`on:`** gains `push: branches: [main]`. This is an insertion only.
- **A workflow-level `concurrency:` key**: only push runs share a group, and `cancel-in-progress` is false.
- **The five job `name:` expressions** gain a `push` arm, `<context> (main)`. `deriveJobContext` (`tools/agent-generator/coverage-map.ts`) still takes the last `|| '<X>'` fallback, so every derived context is unchanged (checked: all five).
- **Header and job comments** say the same. The ballot names L15–16 and L28–29. Two more comment lines change with them, as corrections, because each would read incomplete beside the new arm:
  - L26: the job-name sentence gains the `(main)` suffix;
  - L47–48: the shadowing comment.
- **The comparator's `--base` choice is unchanged.** Every run that is not a `pull_request` already runs `--no-base`.

**Not in this grant**:
- any `if:` or `continue-on-error`;
- any cache key, step, runner, environment or job other than the `name:` lines;
- `EXPECTED_CONTEXTS`, `complete-task.sh`'s `REQUIRED_WORKFLOWS`, and branch protection.

**M1's excluded acts, carried** (ballot `2026-09-27-ci-regime-standing-scope` § 2):
- **No new required context.** `harness-android-tokens` stays the one required context this workflow produces, under its unsuffixed name. A push run reports under `(main)`, which never matches it.
- **No change to `EXPECTED_CONTEXTS`** or its count, and no branch protection or repository setting.
- **No step, floor or assertion is removed or weakened.** The 11 deleted lines are 6 comment lines and the 5 `name:` lines, each re-added with one more arm. They are quoted in the block below.

```diff
diff --git a/.github/workflows/native-harness.yml b/.github/workflows/native-harness.yml
index 3265ab24a..4ad0c4f09 100644
--- a/.github/workflows/native-harness.yml
+++ b/.github/workflows/native-harness.yml
@@ -12,8 +12,10 @@
 # lane wrote. Each context fails, never skips, when harness-generate failed or its artifact is absent.
 # The last step of harness-generate runs the D2 check (scripts/harness/d2-check.ts); see .kiro/issues/2026-11-07-d2-check-step-grant.md.
 #
-# Triggers: `pull_request` with no `paths:` filter (every unit PR runs all four contexts, Req 2.10), and
-# `workflow_dispatch`. A dispatched run has no merge base, so its comparator runs `--no-base`.
+# Triggers: `pull_request` with no `paths:` filter (every unit PR runs all four contexts, Req 2.10),
+# `push` to `main` (each squash that ships is measured; ballot 2026-11-08-closeout-cracks item 1), and
+# `workflow_dispatch`. A dispatched or push run is not a pull request, so its comparator runs `--no-base`.
+# Push runs share one concurrency group, so a burst of merges is measured at least at its newest squash.
 #
 # The verdict annotation: after the comparator, a step with `if: always()` reads the comparator's output
 # file and writes `::notice title=harness-verdict::<verdict line>` for a PASS and a FAIL alike, and writes
@@ -23,15 +25,20 @@
 # No `if:` in this file reads github.event_name, github.event.*, head_ref, base_ref, ref or ref_name, and
 # only one reads inputs.*: the forced-failure step of harness-generate (dispatch input
 # force_generate_failure, Req 2.11's evidence run). So a context fails rather than skips on every trigger.
-# Job `name:` expressions are not `if:` and read github.event_name for the "(unit-branch)" dispatch suffix.
+# Job `name:` expressions are not `if:` and read github.event_name for the "(unit-branch)" dispatch suffix
+# and the "(main)" push suffix; the concurrency group reads it too. Neither is a step condition.
 #
-# Not a required context. It is in neither EXPECTED_CONTEXTS nor complete-task.sh's
-# REQUIRED_WORKFLOWS while it measures (tasks.md Task 5, criterion 11).
+# Required context: `harness-android-tokens`, in EXPECTED_CONTEXTS since its promotion (#717,
+# tools/agent-generator/verify-gate-registration.sh); the other three compile contexts are not required.
+# This workflow is in complete-task.sh's REQUIRED_WORKFLOWS. A push run's `(main)` names never match a
+# required context name.
 
 name: native-harness
 
 on:
   pull_request:
+  push:
+    branches: [main]
   workflow_dispatch:
     inputs:
       force_generate_failure:
@@ -42,11 +49,17 @@ on:
 permissions:
   contents: read
 
+# Only push runs share a group; every other run has its own. GitHub keeps one running and one pending run
+# per group, so in a burst the pending squash is replaced by the newest one, never the running one.
+concurrency:
+  group: ${{ github.event_name == 'push' && 'native-harness-push-main' || format('native-harness-{0}', github.run_id) }}
+  cancel-in-progress: false
+
 jobs:
   harness-generate:
     # This name expression is a job name, not a step condition. On a dispatch it reads "(unit-branch)", the same
-    # convention lane-timing.yml uses, so a branch-head dispatch run never shadows a gate name.
-    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-generate (unit-branch)' || 'harness-generate' }}
+    # convention lane-timing.yml uses, and on a push to main "(main)", so neither run ever shadows a gate name.
+    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-generate (unit-branch)' || github.event_name == 'push' && 'harness-generate (main)' || 'harness-generate' }}
     runs-on: ubuntu-24.04
     timeout-minutes: 30
     steps:
@@ -126,7 +139,7 @@ jobs:
   # ---------------------------------------------------------------------------------------------
 
   harness-ios-tokens:
-    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-ios-tokens (unit-branch)' || 'harness-ios-tokens' }}
+    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-ios-tokens (unit-branch)' || github.event_name == 'push' && 'harness-ios-tokens (main)' || 'harness-ios-tokens' }}
     needs: harness-generate
     if: ${{ !cancelled() }}
     runs-on: macos-26
@@ -193,7 +206,7 @@ jobs:
           retention-days: 7
 
   harness-ios-components:
-    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-ios-components (unit-branch)' || 'harness-ios-components' }}
+    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-ios-components (unit-branch)' || github.event_name == 'push' && 'harness-ios-components (main)' || 'harness-ios-components' }}
     needs: harness-generate
     if: ${{ !cancelled() }}
     runs-on: macos-26
@@ -264,7 +277,7 @@ jobs:
           retention-days: 7
 
   harness-android-tokens:
-    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-android-tokens (unit-branch)' || 'harness-android-tokens' }}
+    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-android-tokens (unit-branch)' || github.event_name == 'push' && 'harness-android-tokens (main)' || 'harness-android-tokens' }}
     needs: harness-generate
     if: ${{ !cancelled() }}
     runs-on: ubuntu-24.04
@@ -403,7 +416,7 @@ jobs:
           retention-days: 7
 
   harness-android-components:
-    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-android-components (unit-branch)' || 'harness-android-components' }}
+    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-android-components (unit-branch)' || github.event_name == 'push' && 'harness-android-components (main)' || 'harness-android-components' }}
     needs: harness-generate
     if: ${{ !cancelled() }}
     runs-on: ubuntu-24.04
```

**Deleted lines** (`git diff -U0 --no-renames <base>..<m> -- .github/workflows/native-harness.yml`, the lines beginning `-`, without their `-`; 11, equal to `--numstat`'s deletions):

```
# Triggers: `pull_request` with no `paths:` filter (every unit PR runs all four contexts, Req 2.10), and
# `workflow_dispatch`. A dispatched run has no merge base, so its comparator runs `--no-base`.
# Job `name:` expressions are not `if:` and read github.event_name for the "(unit-branch)" dispatch suffix.
# Not a required context. It is in neither EXPECTED_CONTEXTS nor complete-task.sh's
# REQUIRED_WORKFLOWS while it measures (tasks.md Task 5, criterion 11).
    # convention lane-timing.yml uses, so a branch-head dispatch run never shadows a gate name.
    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-generate (unit-branch)' || 'harness-generate' }}
    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-ios-tokens (unit-branch)' || 'harness-ios-tokens' }}
    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-ios-components (unit-branch)' || 'harness-ios-components' }}
    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-android-tokens (unit-branch)' || 'harness-android-tokens' }}
    name: ${{ github.event_name == 'workflow_dispatch' && 'harness-android-components (unit-branch)' || 'harness-android-components' }}
```

## ARMING

- **The activating PR** carries `**ARMING**: at this merge and at the fixing PR's merge`. Stacy's grant-limb read fires at both merges.
- **At this merge**: the list names no governance-law path, and admits no M1-excluded act. Each deleted line is read either as an excluded act or as not one, and none is one: comments, and `name:` expressions re-added with a push arm. The read writes the column-0 `**Grant activation read**:` line.
- **At the fixing PR's merge**: its `.github/**` paths are a subset of this list, and each deleted line matches a line in the block above as it stood at the activating merge.

## Known hazard

The Trigger is a `path:` token on a shared workflow file. If another PR, under its own grant, touches `native-harness.yml` before the fixing PR, this record fires there. A grant does not lapse (rule 11), but one still open after a firing that was not its fixing PR is a walk finding, and `fired-records` will list it on that PR with the reason `grant`. Kept as `path:` to match the precedent of `2026-11-08-fired-records-warn-workflow-grant.md`. If it fires early, I re-rule it to `merge:#<N>` for the fixing PR.

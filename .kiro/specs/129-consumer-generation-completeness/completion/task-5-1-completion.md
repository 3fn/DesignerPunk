# Task 5.1 Completion: The workflow: jobs, labels, triggers, artifact hand-off

**Date**: 2026-11-07
**Task**: 5.1 (Spec 129, Unit 1, parent 5)
**Agent**: Thurgood (Sonnet), with Kenya's and Data's lanes as the steps the jobs call

## What changed

`.github/workflows/native-harness.yml` replaces the dispatch stub with the real workflow.
- `harness-generate` (first copy, `b6235fc0c`) runs `scripts/harness/consumer.ts` once and uploads the consumer root as one artifact.
- `2563e46cf` adds the four contexts `harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens` and `harness-android-components` and the `pull_request` trigger (no `paths:`). Each needs `harness-generate`, fails when its result is not `success`, downloads the artifact, runs its lane and then the comparator, and writes the `harness-verdict` notice.
- `9754b985c` uploads each context's `harness-out`; `d5ed8f08f` splits the Gradle cache into `cache/restore` and `cache/save` under `if: always()`; `2b8448e52` adds the `force_generate_failure` dispatch input (5.3).

## Targeted tests run

- `node -e` YAML parse of the file → jobs `harness-generate, harness-ios-tokens, harness-ios-components, harness-android-tokens, harness-android-components`; `on` keys `pull_request, workflow_dispatch`; `pull_request` has no `paths`.
- Dispatches: 42313523264 (the probe, first copy), 42323442828, 42323861901, 42324880305, 42325607106, 42331622121, 42332232400 (forced failure), 42332252550, 42333520571. The last reads four `harness-verdict … PASS` and `cache: hit` on both Android contexts.

## Application-time adaptations

1. **A lane-output upload step was added** to every context (`9754b985c`): the first dispatch showed that the Gradle log and the run file are not in the job log. It is not in the criteria.
2. **`actions/cache` was replaced by `cache/restore` plus `cache/save`** (`d5ed8f08f`): `actions/cache` saves only when the job succeeds, so while the contexts failed every Android run read `cache: miss`. The save runs when Gradle ran and the key was not restored; `hit` means an earlier run, passing or failing, saved the key.
3. **Contexts install with `npm ci --ignore-scripts`**; only `harness-generate` runs the package's build.
4. **The comparator's base** is `HEAD^1` on a pull request and `--no-base` on a dispatch, chosen in the step's `run:`, not in an `if:`.
5. **The JDK is the image default**, selected from `JAVA_HOME_17_X64`, because `harness/pins.yaml` pins `java.version` to the image's 17.0.21.

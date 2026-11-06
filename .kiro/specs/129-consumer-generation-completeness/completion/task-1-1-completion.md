# Task 1.1 Completion: Driver: pack, install, `init`, `generate`, artifact layout

**Date**: 2026-11-06
**Task**: 1.1 Driver: pack, install, `init`, `generate`, artifact layout (Spec 129, Task 1, Unit 1)
**Agent**: Ada (Sonnet) · **Type**: Implementation · **Status**: Complete on the branch (accepted at U1's merge)

## What changed

- `scripts/harness/consumer.ts` (new): runs `npm pack` in the repository (the only command that runs there), installs the tarball into a consumer root outside the repository, runs the installed CLI's `init --name <n> --abbreviation <a>` and `generate`, and writes the root as one directory a CI job can upload. Each step is named, and a failing `pack`, `install`, `init` or `generate` prints `harness-consumer: step "<step>" failed: …` and exits 1. It also writes `harness-consumer.json` (the manifest the lanes read) and `harness-tarball-files.txt` (the packed file list, for the floor).
- `harness/pins.yaml` (new): the `consumer` section only (`name: HarnessConsumer`, `abbreviation: HX`, the fixture folder and its in-consumer path). Shaped for Kenya's `ios` and Data's `android` sections to follow as top-level keys.
- `scripts/harness/__tests__/consumer.test.ts` (new): 42 tests, 38 of them for the driver (step-failure messages and exit status, command order, only `npm pack` runs in the repository, no argument names a repository path, `--out` guards, the `DP` refusal, config edit, output-folder reading, pruning); the other 4 are 1.2's.
- Consumer-root layout the lanes read (also in the file's header comment): `designerpunk.config.ts`, `token-index/`, each platform's output folder (named in `harness-consumer.json` `platformOutputs`), `node_modules/@3fn/core/` (the packed package, in place; `pkg:` paths are relative to it), `harness-consumer.json`, `harness-tarball-files.txt`.

## Targeted tests run

- `npm run test:scripts -- scripts/harness` → 1 suite, 42 passed. `scripts/jest.config.js` (`rootDir` `scripts`, `testMatch` `**/__tests__/**/*.test.ts`) selects `scripts/harness/__tests__/`: confirmed by that run, which found the suite through that config.
- Bite check, run once and reverted: removing the `DP` refusal and the step name from the error text turned 15 of 42 red (every step-failure case, the three `DP` cases, the two `--out` guards, the missing-fixture-output case); restored, 42 green.
- Real run, offline, no download, consumer root in the session scratchpad (outside the repo): `npx tsx scripts/harness/consumer.ts --out <scratchpad>/consumer-run1 --pack-ignore-scripts --offline` → `ok`, 6 s, `@3fn/core@16.2.0`, abbreviation `HX`, 3 Swift and 3 Kotlin generated files, 1701 files in the tarball, consumer root 30 MB (27 MB of it the packed package).
- Real run with `prepack` on (the CI form: `npm pack` runs `npm run build`), `--offline`: `ok`, 16.8 s wall; the manifest (but for the tarball hash) and `dist/tokens/**` are byte-identical to the first run.
- The fixture's two refs reach the generated native files as the plan expects: `ProductTokens.ios.swift` L7 `public static let actionPrimaryRef: CGFloat = DesignTokens.theme.colorActionPrimary` and L8 `… bodyTypographyRef: CGFloat = DesignTokens.typographyBodyMd`; `ProductTokens.android.kt` L9 `val actionPrimaryRef = DesignTokens.theme.color_action_primary`, L10 `val bodyTypographyRef = DesignTokens.typography_body_md`. These are the non-compiling shapes of `2026-10-26-token-index-platform-name-readers.md` item 3, which Task 5's first full run lists.
- `npx tsc --noEmit --strict` over the two files → 0 errors.
- Not run: the `Consumer Guard` suite (`npm run test:consumer`); this subtask changes no file it reads.

## Application-time adaptations

1. **Pruned `node_modules/`.** The uploaded root keeps `node_modules/@3fn/core` only (27 MB), not the package's dependency tree (the `tsx` and MCP SDK trees would make the artifact large, and no lane reads them). `--keep-node-modules` turns this off. Not in the criterion; it is my call, flagged for Thurgood (Task 5.1) and for Kenya and Data, who read `pkg:` paths from `node_modules/@3fn/core`.
2. **`package.json` is written by the driver**, not by `npm init -y`: deterministic, one fewer command.
3. **The driver checks that `generate` wrote the product-token fixture's output** (`ProductTokens.ios.swift` and `ProductTokens.android.kt`) and a `token-index/semantics.yaml`, and fails the `package` step if not. Without it a fixture that was never read would leave the lanes compiling nothing of it.
4. **Output folders come from the consumer's resolved config**, read by running the installed `dist/config/ConfigLoader.js`'s `loadConfig` in the consumer root under plain `node`. `platforms.<platform>.output` is honoured when the resolved config carries it, else `outputDir`. Today `ResolvedConfig` has no `platforms` key, so all three platforms resolve to `dist/tokens`. **Task 15 must make `ResolvedConfig` carry the resolved `platforms.<platform>.output` paths** (or tell me to read the raw config another way); the test `platformOutputFolders … (the U10 shape)` fixes the shape the driver expects.
5. **`--pack-ignore-scripts`** (not in the criterion) lets a local run use an already-built tree; CI uses the default.
6. **`init` is run bare** (default agent target, agent layer written), as a consumer runs it; the agent layer adds hidden folders (`.claude`, `.designerpunk`) the lanes do not read. `actions/upload-artifact` skips hidden files by default, which is harmless here; Task 5.1 should not set `include-hidden-files`.
7. The pin file's `consumer` keys are `name`, `abbreviation`, `productTokensFixture`, `productTokens`. Criterion 2 names only the abbreviation.

# Task 1 Completion: The packed-install consumer driver (U1)

**Date**: 2026-11-06
**Spec**: 129 - Consumer-Generation Completeness
**Task**: 1. The packed-install consumer driver (U1) · subtasks 1.1, 1.2, 1.3
**Type**: Parent · **Validation**: Tier 3 - Comprehensive
**Agent**: Ada (Sonnet) · **Status**: Complete on the unit branch `task/129-compile-harness-t1`, accepted at U1's merge; criterion 5's last clause is pending Lina's PR (⚠️ below)
**Delegated-tier**: plan held
**CI-provenance**: local
**Instruments**: 16 listed — exists 10 · built-here 5 · missing 1 · unlisted 1 — .kiro/specs/129-consumer-generation-completeness/completion/task-1-instruments.md

---

## Success criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| `scripts/harness/consumer.ts` runs `npm pack`, installs the tarball into a scratch directory, runs `init` and `generate`, and writes the consumer root as one directory a CI job can upload, reading nothing from the repository's own `dist/`. | ✅ | `scripts/harness/consumer.ts`; suites `consumer.test.ts › runDriver — pack, install, init, generate, one consumer root › runs the four commands in order and writes the manifest, the tarball list and the pruned root` and `› runDriver — the repository is touched only by npm pack` (3 cases: only `npm pack` runs in the repository, no argument names a repository path, the installed CLI runs by absolute path in the consumer root). Real runs outside the repo, offline: `npx tsx scripts/harness/consumer.ts --out <scratchpad>/consumer-run1 --pack-ignore-scripts --offline` → `ok`, 6 s; and without `--pack-ignore-scripts` (`prepack` builds) → `ok`, 16.8 s; the two roots' manifests and `dist/tokens/**` are identical. The driver never reads the repository's `dist/` itself; the only repository command is `npm pack`, whose tarball is the package under test (`task-1-1-completion.md`). The upload folder is one directory, `node_modules/` pruned to `@3fn/core`, layout in the file's header. |
| The scratch consumer's config abbreviation is not `DP`, and `harness/pins.yaml` § `consumer` names it. | ✅ | `harness/pins.yaml` (`consumer.abbreviation: HX`); `consumer.test.ts › readConsumerPins — the abbreviation is not DP › the committed harness/pins.yaml § consumer names an abbreviation that is not DP`, and `› BITES on abbreviation DP` / `dp` / `Dp`; the real run's consumer config reads `abbreviation: 'HX'` and `harness-consumer.json` records `"abbreviation": "HX"`. |
| The harness input includes the product-token fixture at `harness/fixtures/product-tokens/`, holding one token that `ref`s a WCAG-only colour and one that `ref`s a composite token. | ✅ | `harness/fixtures/product-tokens/harness.yaml` (`actionPrimaryRef` → `color.action.primary`, `bodyTypographyRef` → `typography.bodyMd`); `consumer.test.ts › the product-token fixture at harness/fixtures/product-tokens/ › holds exactly two tokens, both refs`, `› one token refs a WCAG-only colour that exists in the shipped index`, `› one token refs a composite token that exists in the shipped index`, `› the oracle bites …`; `driver › copies the fixture in and points the consumer config at it`; the real run's `generate` wrote both tokens into `ProductTokens.ios.swift` (L7, L8) and `ProductTokens.android.kt` (L9, L10). |
| The driver exits non-zero, naming the step, when `npm pack`, the install, `init` or `generate` fails. | ✅ | `consumer.test.ts › runDriver — a failing step is named, and the exit status is non-zero`: `throws a HarnessStepError naming step "pack", "install", "init" or "generate" when that command exits 1` (4 cases), `main() returns 1 and prints \`step "<step>" failed\` to stderr` (4 cases), `a command that cannot start is a failure of its step too`, `stops at the failing step`. Bite check: with the step name removed from the message and the `DP` refusal removed, 15 of 42 went red; restored, 42 green (`task-1-1-completion.md`). |
| `scripts/pack-assert.ts` fails on any packed file under `platforms/android/res/` whose path is not `res/<type>[-<qualifiers>]/<name>.<ext>` with an Android resource type and an allowed extension, shown by a case in `scripts/__tests__/pack-assert.test.ts` with a `README.md` under `res/drawable/` red once, and passes at this unit's head. | ⚠️ | The rule, the red case and the unit tests are met: `scripts/pack-assert.ts` section 11 (`nativeResourceFindings`); `pack-assert.test.ts › nativeResourceFindings … › BITES once on a README.md under res/drawable/ …` (red strings recorded in `task-1-3-completion.md`); `npm run test:scripts` → 25 suites, 813 passed. **"Passes at this unit's head" is NOT met on this branch**: `npx tsx scripts/pack-assert.ts` at the head → `103/108 assertions passed`, with `FAIL: native resources: src/components/core/Icon-Base/platforms/android/res/drawable/README.md is a valid Android resource file — file name \`README\` must use only lowercase letters, digits and underscores` and `FAIL: native resources: every packed file under platforms/android/res/ is res/<type>[-<qualifiers>]/<name>.<ext> with an allowed extension — 51 checked, 1 not`, because the README is still at that path. **Pending Lina's PR** (`fix/129-u1-preconditions-lina`; instruments row 16). A simulation on the real packed path list with that one path removed gives `PASS 50 packed`, `PASS 50 checked, 0 not`; it is not the evidence. The same run shows 3 `publish path:` FAILs that come from this worktree's symlinked `node_modules`, not from the rule. |

Unmet or partially met criteria: Criterion 5, the clause "passes at this unit's head" only: the README still sits at `src/components/core/Icon-Base/platforms/android/res/drawable/README.md` on this branch; follow-up: Lina's PR (`fix/129-u1-preconditions-lina`) and `.kiro/issues/2026-11-05-icon-base-android-drawable-readme-breaks-resource-merge.md`. After `main` carries it and is merged into the unit branch, the real-tree run is repeated and this row is amended in place.

## Additional verification

Primary Artifacts: all shipped as declared

(`scripts/harness/consumer.ts`, `scripts/harness/__tests__/consumer.test.ts`, `harness/fixtures/product-tokens/harness.yaml`, `harness/pins.yaml` with the `consumer` section only, `scripts/pack-assert.ts`, `scripts/__tests__/pack-assert.test.ts`.) No `**Merge gate:**` is declared for Task 1.

## What was built

- **Driver** (`scripts/harness/consumer.ts`): `prepare` → `pack` → `install` → `init` → `configure` → `generate` → `package`. Output: one consumer root outside the repository.
- **Fixture and pin file** (`harness/fixtures/product-tokens/harness.yaml`, `harness/pins.yaml` § `consumer`).
- **Native resource rule** (`scripts/pack-assert.ts` section 11).
- **The artifact layout the lanes read** (Kenya, Data):
  - `harness-consumer.json` at the root names everything else: `packageRoot` (`node_modules/@3fn/core`; a `pkg:` path is relative to it), `tokenIndex` (`token-index`), `productTokens`, `platformOutputs.{web,ios,android}` (each platform's generated-output folder, relative to the root; a `gen:` path is relative to that folder), `generated.{ios,android}` (generated `.swift` and `.kt` files, relative to that folder, sorted), and the package's name, version, tarball name and SHA-256.
  - `harness-tarball-files.txt` is the packed tarball's file list, sorted, relative to the package root (for the floor).
  - Lanes read output folders from the manifest and never hard-code `dist/tokens`.
  - `node_modules/` holds only `@3fn/core`; hidden folders (`.claude`, `.designerpunk`) are in the root and are not lane inputs.

## Validation

- `npm run test:scripts` → 25 suites, 813 tests passed (includes the new `scripts/harness/__tests__/consumer.test.ts`, 42 tests, and `scripts/__tests__/pack-assert.test.ts`, 77 tests).
- `npx tsc -p tsconfig.scripts.json` → no errors.
- `npm test`, `test:consumer`, the `mcp-server` and `application-mcp-server` suites were **not** run: no file they read changed. `npm test` does not run `test:scripts` (tasks.md § "Sub-suites"), so `test:scripts` is the suite that matters here.
- Real runs of the driver, offline, outside the repo: 2, both `ok` (task-1-1-completion.md).
- This unit's PR carries the records its diff fires (tasks.md § "Conventions"): `harness/**` and `scripts/harness/**` are `path:` Triggers of `2026-11-05-icon-base-android-drawable-readme-breaks-resource-merge.md` and `2026-09-26-native-component-distribution.md` (both owed their close or re-rule before U1, per § "Unit preconditions"); that list is the unit author's at PR-open.

## Application-time adaptations (parent level)

- `task-1-1-completion.md`: pruned `node_modules/`, the driver's own `package.json`, a check that the fixture reached `generate`'s output, the output folders read through the installed `ConfigLoader`, `--pack-ignore-scripts`, bare `init`.
- `task-1-3-completion.md`: the rule's extension table is my reading; dotfiles under `res/` are red; Lina's PR edits one line of `scripts/pack-assert.ts` (section 8's `51` → `50`) in a hunk this task does not touch.
- Open for Task 15 (U10): `ResolvedConfig` carries no `platforms` key yet, so every platform's output folder resolves to `output` today. The driver and its test already honour `platforms.<platform>.output` once the resolved config carries it.

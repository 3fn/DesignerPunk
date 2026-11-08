# Task 15 Completion: `init` runs `generate`, and `platforms:` writes each platform where its build reads it (U10)

**Date**: 2026-11-08
**Spec**: 129 - Consumer-Generation Completeness
**Task**: 15. `init` runs `generate`, and `platforms:` writes each platform where its build reads it (U10) · subtasks 15.1 to 15.3
**Type**: Parent · **Validation**: Tier 3 - Comprehensive
**Agent**: Ada (Sonnet), PRIMARY, with Thurgood (Sonnet, 15.2, on `task/129-15-thurgood`, joined at `7538658d6`) · **Status**: Complete on the unit branch `task/129-15-init-platforms`; accepted at U10's merge, not before.
**Delegated-tier**: plan held
**CI-provenance**: ⚠️ not yet measured — the PR is not open; the PR gate run and the four harness contexts at head H are owed (the CI line and the last criterion's row are filled at the PR's green, in a `completion/**`-only push)
**Instruments**: 16 listed — exists 13 · built-here 2 · none 1 · missing 0 · unlisted 0 — .kiro/specs/129-consumer-generation-completeness/completion/task-15-instruments.md

---

## Success criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| After `init` alone, a `Consumer Guard` case finds the token output and `token-index/`, and a `generate` run straight after writes byte-identical output. | ✅ | `tests/consumer-integration.test.ts` › `init produces a working project` (asserts `dist/tokens/DesignTokens.web.css` and `token-index/components.yaml` after `init`, and snapshots every file under `dist/tokens` and `token-index/`) and `generate produces output files` (`expect(outputSnapshot(tempDir)).toEqual(afterInit)`). |
| Personal-note creation stays in the CLI layer, and `src/generators/generateTokenFiles.ts` gains no personal-note code. | ✅ | `git diff origin/main -- src/generators/generateTokenFiles.ts` holds only the `platforms:` routing (`platformOutputDir`, `placed`, `dirFor`); no `personalNote` name. `init` still creates the note in its own Step 12; `runGenerate(force, { fromInit })` only keeps `generate` quiet about it. |
| When `generate` fails inside `init`, `init` finishes the config, the copied token source and the agent layer, prints `generate`'s message led by the re-run command, and exits non-zero, accepted by a `Consumer Guard` case. | ✅ | `Consumer Guard` › `generate failing inside init: the birth finishes, the message leads with the re-run command, and init exits non-zero` (a file named `dist` stands where `dist/tokens` belongs; asserts non-zero, the re-run line before `System token generation failed`, and config, manifest, `src/tokens` and `.claude/agents` present); Jest in `src/cli/__tests__/init.test.ts` (three cases) and `errorCatalog.test.ts`. |
| INSTALL's founder path has the four steps of design § 14 in Leonardo's text, its `path-steps` front matter reads `founder: 4`, and `install-doc.test.ts` passes, all in this diff. | ⚠️ | 15.2 (Thurgood, `5e4334aa6`, joined byte-identical at `7538658d6`): Guide L6 and L69–L82, `docs/consumer/INSTALL.md` re-derived, `install-doc.test.ts`'s `FOUNDER_ORDER`; Leonardo confirmed the four steps. `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc`: 79 of 81 pass. **The 2 reds read README's "Getting Started" (`README § "Getting Started": exactly path-steps.founder numbered items` and `every path list ends with it`)**, outside the Primary Artifacts; the grant is PR #776, and Thurgood makes the README edit on his seat branch once Peter merges it. Not met until then. |
| `init`'s closing message names the output folder and `generate`'s role in design § 14's words. | ✅ | `errorCatalog.test.ts › after a successful generate the message names the output folder …`; `Consumer Guard` asserts "Your token output is in dist/tokens. Run `npx designerpunk generate` after every token change." |
| The config accepts `platforms:` with keys from `PLATFORM_KEYS = ['web', 'ios', 'android']` in `src/config/`, and the CLI validation imports the constant. | ✅ | `src/config/platforms.ts` (`PLATFORM_KEYS`); `src/cli/shared/platformOutputs.ts` imports it; `src/cli/__tests__/platformOutputs.test.ts` › `PLATFORM_KEYS` (13 pass). |
| A `Consumer Guard` case with a `platforms:` config in Spec 132's D4 layout (`ios/<dir>`, `android/<dir>`, beside a root `package.json`) finds each named platform's files at its path and every other platform, web included, at `output`. | ✅ | `Consumer Guard` › `Spec 129 Task 15.3 — platforms: in the D4 layout` › `each named platform's files are at its path, alone there, and web and the rest are at output` (`ios/DesignerPunk`: the two `.swift`; `android/designerpunk`: the two `.kt`; `dist/tokens`: web CSS and DTCG, no `.swift`/`.kt`; root `package.json` present). |
| An unknown platform key, or a path resolving outside the project root, fails `generate` with a message naming it, accepted by Jest tests. | ✅ | `platformOutputs.test.ts` › `BITES on an unknown platform key`, `BITES on a folder that resolves outside the project` (three paths), `fails loadConfig, and so generate …`; the packed-install `Consumer Guard` cases `an unknown platform key fails generate, naming it` and `a folder outside the project fails generate, naming it`. |
| A folder `platforms:` names holds only that platform's files, and `pack-assert` fails when a generated native file name equals a packaged native source file name. | ✅ | `platformOutputs.test.ts › writes each named platform at its folder, holding only its files …`; `scripts/pack-assert.ts` section 12 (`generatedNativeNameFindings`) with five cases in `scripts/__tests__/pack-assert.test.ts` (86 pass), one of them red once on a packaged `DesignTokens.ios.swift`. `Consumer Guard` also asserts no generated name equals a packaged native name in the installed package. |
| The harness consumer uses the same D4 layout through `harness/pins.yaml` § `consumer`, and the four lists' `gen:` keys are unchanged in this diff (the `gen:` path rule). | ✅ | `harness/pins.yaml` § consumer `platforms: { ios: ios/DesignerPunk, android: android/designerpunk }`; `scripts/harness/consumer.ts` (`readConsumerPins`, `addPlatforms`) and `consumer.test.ts` (50 pass). `git diff origin/main --stat -- harness/expected harness/ios harness/android` is empty; none of the four lists holds a `gen:` key. The lanes ran against this layout only at the PR's harness runs (row below). |
| All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions). | ⚠️ | Owed: the PR is not open. The runs come from the PR; each URL and summary line is pasted here at head H. |

Unmet or partially met criteria: criterion 4 (the two README reds wait for grant #776 and Thurgood's README edit); the last criterion (harness contexts, at the PR). No other criterion is unmet.

**The Guide and the lock (⚠️)**: Task 15 edits the Integration Guide (Thurgood: L6, L69–L82, L314 step 5 → 4; mine: a new entry `### Platform output folders`, L470–L473, the config reference). `npx tsx tools/agent-generator/diff-guard.ts` reads `full-run-green (input-closure-changed)` on `canonical/registry/tool-registry.json`. I restored the rewritten `canonical/generated.lock` each time; **the lock is not refreshed in this diff**: Lina refreshes it when U10 is next in the lock queue (U11 is ahead). INSTALL did not change for the L470 entry (`derive-install-doc.ts` reads another region).

## Additional verification

Local, at `ba22cbffe`: `npx tsc --noEmit` clean; `npm test` 438 suites / 10305 tests pass; `npx jest --config scripts/jest.config.js` 1583 pass with the 2 README reds above; `application-mcp-server` 582 pass; `mcp-server` 765 pass on a clean run after `npm ci` (before it: `mcp-server/node_modules` was absent and the suite fell back to root `fast-check` 4.4.0, which has no `stringOf`, so `tests/property/parsing-properties.test.ts` failed to compile; that was the environment, not the diff; `tests/performance/performance.test.ts` is wall-clock and failed 2 timing cases once under load and passed on re-run); `npm run check:completion-criteria-parity`: 50 evaluated, 0 fail; `npx tsx scripts/pack-assert.ts --pack`: 112/115, the 3 reds are the `publish path … resolves every module from the root node_modules/` rows (a working checkout's nested `node_modules`: the script names row (j), a fresh clone never shows them) and none is a section-12 row; `npm run test:consumer`: 93 passed, 93 total (local, at `ba22cbffe`).

**Consumer Guard cases changed by `init` running `generate`**: `tests/consumer-integration.test.ts` L270 (the numbered list no longer begins at `generate`), the `C6: token index fails loud when born and absent/empty` case (removes the index `init` now writes, then tests the born-and-absent state), and the `PRODUCT GUARD` case (the index exists after `init`). Existing in-process `runInit` call sites in `src/cli/__tests__/` (init, overRewriteArbiter, productScaffold, sync, sync.name-contract) pass a stub `generate`, since the production loader cannot run under jest.

**Consults on the record (15.3)**: Kenya — `ios/DesignerPunk`, flat, no lane change; Data — `android/designerpunk`, no lane change (detail in `task-15-3-completion.md`). Leonardo — the four founder steps are faithful, step 2 matches `errorCatalog.ts` L689 (the coordinator's relay; 15.2 doc).

**Outside the Primary Artifacts but inside `src/cli/**` and `scripts/` standing scope**: `src/cli/freshness.ts`, `staleness.ts`, `generateProductTokens.ts`, `designerpunk.ts`, `shared/{errorCatalog,platformOutputs,componentTokenReferences}.ts`, the `src/cli/__tests__/` files above, `scripts/__tests__/pack-assert.test.ts` (follows `scripts/pack-assert.ts`).

Primary Artifacts: all shipped as declared. `README.md` is not a Primary Artifact and is not edited here.

## Findings

- **Product-token native files move with `platforms:`.** A named platform's `ProductTokens.*` file goes to its folder, flat; without `platforms:` it stays at `output/product`. The criterion does not name product tokens; Req 12.4's "only that platform's files" and the harness's own `ProductTokens.*` check require it.
- **`staleness.test.ts` mocks `generateProductTokens`**, so the shared path function lives in `shared/platformOutputs.ts` (found when the first placement failed 9 cases).
- **A freshness test artifact**: `checkGeneratedOutputFresh` loads the package's component tokens and a plain `generateTokenFiles` does not, so a Jest test over it filters `ComponentTokens.*` from `differing`.

## Subtask docs

`task-15-1-completion.md`, `task-15-2-completion.md` (Thurgood), `task-15-3-completion.md`.

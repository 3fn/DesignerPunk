# Task 3 — Instruments block

**Written**: 2026-11-06 (UTC), before subtask 3.1 (seat branch `task/129-compile-harness-t3`, cut at the unit head `f68487af5`) · **PRIMARY**: Kenya (Sonnet)

**Form**: M1's execution-time block (Start Up Tasks item 8). `tasks.md` § "Conventions for every parent" says no 129 parent carries a plan-time `**Instruments:**` block.
**Sha convention**: each `exists` row names the commit that last touched `<path>` as of `f68487af5`, from `git log -1 --format=%h -- <path>`. Where a command has no file of its own, `<path>` is its defining file.
**Source**: every fact below is by command or file read at `f68487af5` in this worktree on 2026-11-06, unless the row says otherwise.
**Criteria order** (Task 3's nine success criteria, `tasks.md` order): C1 Stage T invocation · C2 Stage P probe, read count, blocked state · C3 `probe-swift.test.ts` theme reads · C4 Stage C file set and order · C5 the T5 baseline · C6 per-stage self-tests · C7 toolchain read and match · C8 `pins.yaml` § `ios` · C9 the run-time floor per tier.

| # | Criterion | Instrument | State | Fit (one line) | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | C1, C4, C5 | the compile-id and parser interface: `ParseSwift`, `SwiftParseInput`, `Roots`, `RunFile` in `scripts/harness/compare.ts` | exists (`scripts/harness/compare.ts` @ `f7aebd396`) | the lane calls the parser per stage with `ios.T`/`ios.P`/`ios.C`/`ios.T5` and writes the run file `compare.ts` reads | 3.2, 3.3 |
| 2 | C1, C2, C4–C6 | the Swift diagnostic parser | exists (`scripts/harness/parse-swift.ts` @ `e9c777434`) | returns `<root>:<path> \| <message>` keys; the self-tests count keys from it | 3.2, 3.3 |
| 3 | C2, C6 | `harness/README.md` § "The parser interface" and § "The comparator", the run-file format and the `files` and `toolchain` fields | exists (`harness/README.md` @ `3a9f02500`) | L291–L309 give the run file the lane must write; toolchain fields are compared as strings, both directions | 3.2, 3.3 |
| 4 | C7, C8 | the pin file's shape: `ios.toolchain` a mapping of field to quoted string | exists (`harness/pins.yaml` @ `f06d42102`; shape in `harness/README.md` @ `3a9f02500`) | `consumer` section is in place; `ios` is built here (row 9) | 3.1, 3.3 |
| 5 | C1–C5, C9 | the consumer root layout the lane reads: `harness-consumer.json`, `harness-tarball-files.txt`, `token-index/`, `<platform output>/`, `node_modules/@3fn/core/` | exists (`scripts/harness/consumer.ts` @ `f06d42102`) | ran it locally at `f68487af5` after `npm run build`: `--pack-ignore-scripts --prefer-offline`, 6 s, 3 generated Swift files, 1700 tarball files, `HX` abbreviation | 3.2, 3.3 |
| 6 | C2, C3 | the token index and its name rule: `token-index/README.md` § "Platform names" (iOS names are `DesignTokens` members; `theme.` names are read through a theme instance; `components.yaml` names are top-level) | exists (`token-index/README.md` @ `08b9c7a8e`) | read the real index from the local consumer: 213 primitive, 192 semantic (6 list entries) and 33 component iOS names, 14 `theme.` | 3.2 |
| 7 | C2, C3 | the theme instances the probe reads, and their names | exists (design.md § 4, @ `8d8ba1425`), but the emitter is not built: Task 11 (U6) | the design gives the holder `<Name>Themes` and implicit members; today's output has no theme surface. The probe derives instance names from the consumer's config by one function, which is the single place Task 11 amends | 3.2 |
| 8 | C1, C4–C6 | a Swift toolchain on this Mac, for the local shape check | exists (Xcode 27.2, 27B52, Apple Swift 6.4.2, `iPhoneSimulator27.2.sdk`; `xcodebuild -version` and `swiftc --version` run 2026-11-06) | not the pinned toolchain: local runs check shape only, diagnostics differ from 26.6's (the brief; K-7) | 3.2, 3.3 |
| 9 | C8 | `harness/pins.yaml` § `ios` | built here (3.1) | — | 3.1, then 3.2, 3.3 |
| 10 | C8 | the `macos-26` readme for the Xcode 26.6 build and app path, and the SDK version | exists (`actions/runner-images` `images/macos/macos-26-arm64-Readme.md`, image `20261026.0455.2`, `curl` 2026-11-06T14:20:08Z) | gives 26.6 / `17F113` / `/Applications/Xcode_26.6.app` and `iphonesimulator26.5` | 3.1 |
| 11 | C7, C8 | the Xcode 26.6 **SDK build** and **Swift version/build** | MISSING → Kenya: read by the lane's `--read-toolchain` on the first `macos-26` run (the probe dispatch, or the first full run). The readme does not state them and no 26.6 is installed here; I will not guess. Until then those four pins hold a placeholder that cannot match, so the toolchain match fails closed and names the observed values | 3.3 reads them; 3.1 sets the placeholder |
| 12 | C1–C9, "CI half" | `.github/workflows/native-harness.yml` and a dispatchable stub of it on `main` | MISSING → Thurgood: tasks amendment 2 (`origin/task/129-tasks-amendment-2`, under review) then the stub PR then the probe dispatch (Peter's "1 A", 2026-11-06T14:04:52Z). Task 5.1 writes the real file | none of 3.1–3.3 (CI evidence only) |
| 13 | C1, C2, C4–C7, C9 on the pinned toolchain | the first full run of `native-harness.yml` against the unit branch, Tasks 3 and 4 joined | MISSING → Thurgood (Task 5): needs row 12, then Task 4's Android lanes on the branch | none of 3.1–3.3 (the parent's completion) |
| 14 | C2, C3 | `scripts/harness/probe-swift.ts`, `scripts/harness/__tests__/probe-swift.test.ts`, `scripts/harness/__tests__/fixtures/swift/**` | built here (3.2) | — | 3.2 |
| 15 | C1, C4–C7, C9 | `harness/ios/**`: the lane runner and its self-test fixtures | built here (3.2 stages and floor; 3.3 self-tests and toolchain match) | — | 3.2, 3.3 |
| 16 | the tests run in CI (no criterion names it; C3 and the self-tests need it) | `npm run test:scripts` (`jest --config scripts/jest.config.js`, `rootDir` = `scripts/`) and `lane-functional-root`'s step | exists (`scripts/jest.config.js` @ `7447a31be`; `.github/workflows/lane-timing.yml` @ `c22c17a78`) | selects `scripts/**/__tests__/*.test.ts` only. A test under `harness/ios/` would NOT be selected, so lane helper tests that must run in CI import from `scripts/harness/__tests__/` | 3.2, 3.3 |

**Counts**: listed **16** — exists **10** (rows 1, 2, 3, 4, 5, 6, 7, 8, 10, 16) · built-here **3** (rows 9, 14, 15) · missing **3** (rows 11, 12, 13). N = E + B + M = 10 + 3 + 3 = 16.

**The MISSING rows block no local subtask.** Row 11 blocks only a *matching* pin: 3.1 records what the readme gives and fails closed on the rest (see the row). Rows 12 and 13 are CI evidence, which waits for the stub, the probe and the first full run, as the brief says.

**Note on row 7**: it is `exists` as a design statement and unbuilt as an emitter. If the instance names the emitter chooses differ from the probe's derivation, the first probe run that gets past Stage T shows it as `probe:` entries (the read count would still be n = m). That is a finding for Ada and Task 11, not a Task 3 blocker.

## Found later

- **unlisted** (found in 3.2, 2026-11-06): the consumer's registered themes, which the probe needs (C3). Row 5's instrument, `harness-consumer.json`, does not carry them, and the consumer's `node_modules` is pruned to the packed package, so the package's own config loader cannot load the config beside it. Resolved 2026-11-06: Ada's `38d1d8ac0` writes `themes` into the manifest; the lane reads it (`probeConfigFromManifest`) and no longer loads the config.
- **misfit** (found in 3.2, 2026-11-06): row 7 said the instance names would come from design § 4 by one derivation function. Design § 4 and Req 4.1 give the set only by example ("base light and dark, WCAG light and dark"), and `init`'s scaffolded config registers `dark` (mode dark) and `wcag` (mode light), which the example does not match. The derivation is mine, in `themeInstances` (`probe-swift.ts`), recorded in `task-3-2-completion.md` § 3 item 3.
- **unlisted** (appended at 3.4, 2026-11-06, `[STACY TASKS R4]` Low-1; each is an instrument built or relied on by 3.4 that the 3.4 criteria add and the table above does not list):
  1. `scripts/harness/native-rules.ts` and its test (Task 5's 5.4, Thurgood): the shared module the probe imports. Exists on the unit branch at `4252ccc64`.
  2. The comparator's `checks` route (Task 5's 5.4): `RunFile.checks` and the `check` class in `scripts/harness/compare.ts` at `4252ccc64`. The lane's count lines and the per-run instance check are written into it.
  3. The per-run instance check: built here, in `harness/ios/lane.ts` (`checkThemeInstances`), tested in `probe-swift.test.ts`. Read for real only at U6.
  4. The product reads, the provider reads and the `harness consumer config` check: built here (`probe-swift.ts`, `lane.ts`).
  5. `ROOT_TOKEN_FILES` in `scripts/pack-assert.ts`: relied on, imported by the lane for the root-token-file exclusion (exists at `4252ccc64`).
  6. The committed fixture folder `harness/fixtures/product-tokens/` (Ada's, Task 1): the instrument for the product-read count test; exists at `4252ccc64`.

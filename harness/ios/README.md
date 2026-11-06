# The iOS lanes

**Spec**: 129 (Consumer-Generation Completeness), Task 3 · **Owner**: Kenya · **Formats, comparator, lists**: `harness/README.md` (Thurgood)

One script, `lane.ts`, runs both iOS contexts. The workflow (Task 5.1) calls it, then calls the comparator on what it wrote.

## Calling it

From the repository root, on a `macos-26` runner, after `harness-generate`'s artifact is downloaded to `<consumer>`:

```
npx tsx harness/ios/lane.ts harness-ios-tokens     --consumer <consumer> --out <dir>
npx tsx scripts/harness/compare.ts --context harness-ios-tokens     --run <dir>/run.json (--base HEAD^1 | --no-base)

npx tsx harness/ios/lane.ts harness-ios-components --consumer <consumer> --out <dir>
npx tsx scripts/harness/compare.ts --context harness-ios-components --run <dir>/run.json (--base HEAD^1 | --no-base)
```

- `--consumer` is the root `scripts/harness/consumer.ts` wrote (it holds `harness-consumer.json`).
- `--pins <file>` defaults to `harness/pins.yaml`.
- The lane exits **1** for what the comparator cannot see: a toolchain mismatch (`FAIL toolchain`, or `FAIL toolchain missing` when the pinned Xcode folder is absent), a failed self-test (`FAIL self-test`), a setup fault (`FAIL setup`), and a probe whose read count differs from the index's (`FAIL probe`; `run.json` is still written, so the comparator can run beside it). Compile errors are data: they give exit 0, and the comparator decides.
- Make the comparator step run even when the lane step exits 1 on a probe count, and let the lane's own exit status fail the job as well.
- The lane reads the consumer only through the files `consumer.ts` wrote (`harness-consumer.json`, including its `name` and `themes`, `harness-tarball-files.txt`, `token-index/`, the generated folder, the installed package). It does not load the consumer's config. It runs under the repository's `tsx`.

## What it writes into `<dir>`

| Path | What |
|---|---|
| `run.json` | the run file `compare.ts --run` reads (`harness/README.md` § "The comparator's command line") |
| `logs/<stage>.txt` | each stage's captured compiler output (`T`, `P`, `C`, `T5`), and the self-tests' as `selftest-*` |
| `probe/Probe.swift` | the generated probe (Stage P's input), written whether or not Stage P ran |
| `T/`, `P/`, `C/`, `T5/`, `selftest/` | each stage's object files; `T/` holds `DPHarnessTokens.swiftmodule` |

`<dir>` is emptied at the start. Log files end `.txt`, never `.log` (the repository's `.gitignore` ignores `*.log`).

## Reading the toolchain the first time

`harness/pins.yaml` § `ios` § `toolchain` holds four fields that read `UNMEASURED: …`, because the runner-images readme does not state Xcode 26.6's SDK build or Swift version. On the first `macos-26` run:

```
npx tsx harness/ios/lane.ts --read-toolchain
```

prints all eight fields as pin lines (the Xcode folder it selects is the pin's, when that folder exists). Paste the four `UNMEASURED` ones into the pin file. Until then the toolchain match fails closed.

## The self-test fixtures (`selftest/`)

- `missing-return.swift`: a function that falls off its end. Every stage compiles it first under its own flags and fails the context unless it gets exactly one `missing return` error (`-typecheck` would exit 0).
- `planted/`: a two-member token file with one `internal` member, and a two-name index. Stage P's self-test builds it as a module, generates a real probe from the planted index, compiles it by plain `import`, and fails the context unless the read count is `2 of 2` and the compiler gives exactly one `inaccessible due to 'internal' protection level` entry.

Both fixtures move with an Xcode pin if the compiler's wording changes: the verdict functions are `judgeMissingReturn` and `judgePlanted` in `lane.ts`.

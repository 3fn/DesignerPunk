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
- The lane exits **1** only where the comparator would have nothing to read, so there is no run file and no `harness-verdict` annotation: `FAIL toolchain missing` (the pinned Xcode folder is absent), `FAIL self-test`, and `FAIL setup` (a setup fault, or a native file name that two files of the set share, named with every path). Everything else is data in `run.json`, and the comparator decides:
  - **A toolchain field that differs from the pin does not stop the lane.** It records the versions it read, still compiles, and the comparator fails the context as `toolchain`; that run carries the annotation like any FAIL.
  - **`checks`** (`harness-ios-tokens` only; the component context writes an empty array): one entry per probe count line (`probe: index names`, `instances`, `product`, `provider`, `key`; `ok` when `n = m`), a `probe: product key` entry for each product key that is not a Swift identifier, `harness consumer config` (the theme-instance rule's refusals applied to our own fixture), and `theme instances` (the per-run check). The comparator fails the context as class `check` for each `ok: false`. The lane exits 0 for them.
  - **The count lines print in both states**, compiled and "generated, not compiled": `probe: read <n> of <m> index names` (the index's names, a `theme.` name once), then `probe: instances read …`, `probe: product read …`, `probe: provider read …`, `probe: key read …`.
  - **`theme instances:`** prints the per-run check: the generated `<Name>Themes` holder's members against the shared module's instances for the manifest's themes. `not checked` (ok) only while the generated Swift declares neither the holder nor `DesignerPunkTheme`; a holder from which no member parses, or `DesignerPunkTheme` with no holder, fails.
- Make the annotation step run after the comparator on every outcome, and the comparator step run whenever the lane wrote `run.json`.
- The lane reads the consumer only through the files `consumer.ts` wrote (`harness-consumer.json`, including its `name`, `themes` and `productTokens`, `harness-tarball-files.txt`, `token-index/`, the product-token folder, the generated folder, the installed package). It does not load the consumer's config. It runs under the repository's `tsx`.

## What it writes into `<dir>`

| Path | What |
|---|---|
| `run.json` | the run file `compare.ts --run` reads (`harness/README.md` § "The comparator's command line") |
| `logs/<stage>.txt` | each stage's captured compiler output (`T`, `P`, `C`, `T5`), and the self-tests' as `selftest-*` |
| `probe/Probe.swift` | the generated probe (Stage P's input), written whether or not Stage P ran; it reads the index's names, the theme instances, the product tokens, the provider and the key |
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

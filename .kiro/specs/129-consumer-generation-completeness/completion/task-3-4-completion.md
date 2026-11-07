# Task 3.4 Completion: The probe imports the shared module

**Date**: 2026-11-06
**Task**: 3.4 (Spec 129, Unit 1, parent 3)
**Agent**: Kenya (Sonnet, as planned)
**Branch**: `task/129-compile-harness-t3`. First step: the unit head `4252ccc64` (Task 5's 5.4, the shared module and the comparator's `checks`) merged in as `7df7ee5b5`; the three ticks on 3.1 to 3.3 survived the merge (it was clean). **3.4 and Task 3 are not ticked**, as directed.

## 1. What changed

- **`scripts/harness/probe-swift.ts`** (rewritten around the shared module). It imports `instanceNames`, `holderName`, `providerReads`, `swiftProviderFunction`, `productCategories`, `productReads` and `BINDING` from `scripts/harness/native-rules.ts` and keeps no copy of a rule: `themeInstances` and `themeHolder` are gone, and so is every `Light`/`Dark` derivation. What stays in the probe is its own: how the index's names are rooted (`DesignTokens.` for primitives and semantics, top-level for components, a `theme.` name read through an instance), and the text of each read. New: `loadProductFiles` and `loadProductCategories` (every `*.yaml` directly in the `productTokens` folder, a file that does not parse skipped), `indexLookup` (a `ref` resolved through semantics then primitives), and the reads in five groups, each with its own `n` (counted from the generated text) and `m` (counted from the inputs):
  - `index names`: distinct names the index gives iOS, a `theme.` name once;
  - `instances`: `_ = <Name>Themes.<instance>.<member>`, `theme.` colours × the module's instances;
  - `product`: `_ = Product<Cat>.<key>` (static) or `_ = EnvironmentValues().dpTheme.product<Cat><Key>` (a theme member, once);
  - `provider`: `_ = EmptyView().<name>Theme()` and one `(.<case>)` per case of the family;
  - `key`: `_ = EnvironmentValues().dpTheme`.
- **`harness/ios/lane.ts`**:
  - **The `checks` array.** `harness-ios-tokens` writes into the run file one check per count line (`probe: index names`, `instances`, `product`, `provider`, `key`; `ok` when `n = m`), one `probe: product key` check per product key that is not a Swift identifier, `harness consumer config` (the theme-instance rule's refusals, applied to the fixture), and `theme instances`. `harness-ios-components` writes an empty array. The lane exits 0 for all of them; the comparator fails the context as `check`.
  - **The per-run instance check** (`checkThemeInstances`): the generated `<Name>Themes` holder's members against the module's instances. It parses the open line `public enum <Name>Themes {` at column 0, reads to the first `}` at column 0, and takes lines matching four spaces then `public static let <name>: any DesignerPunkTheme =`. It prints `theme instances: …`. It fails on a missing, extra or reordered member, on a holder from which no member parses ("holder found, no members parsed"), on a holder declared twice, and on `DesignerPunkTheme` declared with no holder; it passes with `not checked` only when neither is declared (every run before U6).
  - **The pin check moved to the comparator.** A toolchain field that differs from the pin no longer stops the lane: it records what it read, still compiles, and the comparator fails the context as `toolchain`. A pinned app folder that is absent still stops it (`toolchain missing`).
  - **The root token files and duplicates.** `selectFiles` leaves out the `.swift` entries of `ROOT_TOKEN_FILES` (`scripts/pack-assert.ts`), by name, and no longer drops a packaged file because a generated one shares its name. Any two files of the set that share a native file name stop the lane as `setup`, naming every path (`pkg:` / `gen:`).
  - Exit codes: the lane exits 1 only where there is no run file to read: `toolchain missing`, `self-test`, `setup`.
- **`harness/ios/README.md`**: the exit codes, the `checks`, the count lines and the `theme instances:` line as above.
- **`scripts/harness/__tests__/probe-swift.test.ts`**, with the fixtures `fixtures/swift/product/**`, `fixtures/swift/product-bad/**` and `fixtures/swift/config-c.json`: rewritten for all of the above.
- **`task-3-instruments.md`**: six `unlisted` rows appended under `## Found later` (the shared module, the `checks` route, the per-run check, the product and provider reads, `ROOT_TOKEN_FILES`, the committed fixture folder).

## 2. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/harness/__tests__/probe-swift.test.ts`: **86 passed**. `scripts/harness` (6 suites): **471 passed**. `npm run test:scripts`: 30 suites, **1242 passed**. `npx tsc -p tsconfig.scripts.json --noEmit`: exit 0, no output.
- What the 86 pin, by Task 3 criterion:
  - **Product reads**: over a fixture folder, a static token, a theme member read once for any number of instances, a `platforms` list absent / naming ios / not naming ios / empty, the category from the file name and not from `category:`, a hyphenated file name (`brand-colors` gives `ProductBrandColors`), a file in a subfolder not read, a file with no `tokens` key contributing none, a file that does not parse skipped, a key that is not a Swift identifier (no read written, the count then differs so a check fails), and `n = m`. **Over the committed fixture folder `harness/fixtures/product-tokens/`** the product reads equal the number of its tokens whose `platforms` list is absent or names ios, counted by the test from the YAML itself, so U6's removal of the composite changes no assertion.
  - **No local copy**: `probe-swift.ts` imports `./native-rules`, defines none of `themeInstances`, `themeHolder`, and its instances equal `instanceNames` for config S, config C (`highContrast` both, `brand` light, `default` dark: eight instances) and no themes.
  - **Group counts**: each of the five lines in its format (`probe: read 9 of 9 index names`, `probe: instances read 12 of 12`, …), a dropped read and a doubled read changing a group's `n`, 0 of 0 for an empty group, a new `theme.` colour or a new registered theme adding reads with no code change, and every group `n = m` against the repository's committed index.
  - **The per-run check**: it passes on the module's four instances; it fails on an extra member, on a missing member, on the right members in another order, on a holder from which nothing parses (a wrong indent; a name list `let a, b`; an empty holder), on `DesignerPunkTheme` with no holder, and on a holder declared twice; it prints `not checked` with neither declared; and its open and member forms equal the module's `swiftHolderOpenLine` and `swiftHolderMemberLine`.
  - **Root token files and duplicates**: the files left out equal `ROOT_TOKEN_FILES`'s Swift entries; two files sharing a native file name are reported with both paths, and the lane fails as `setup` naming them and writes no run file.
  - **Toolchain**: a differing field is recorded and the lane still compiles and exits 0; `toolchain missing` and the self-tests still stop it.
- **A local run under Xcode 27.2 (27B52, Swift 6.4.2), shape only**, on a fresh `consumer.ts` output (manifest with `themes`), with a copy of the pins carrying 27.2's values:
  - `harness-ios-tokens` printed `probe: blocked (token module not built)`, then `probe: read 438 of 438 index names`, `probe: instances read 56 of 56`, `probe: product read 2 of 2`, `probe: provider read 3 of 3`, `probe: key read 1 of 1`, and `theme instances: not checked`; the run file's seven checks were all ok.
  - Both self-tests passed on the real compiler (the missing-return fixture; the planted `internal` member at 2 of 2 with one inaccessible entry).
  - I compiled the generated `Probe.swift` against a stub module (the real Stage T does not build): 482 "cannot find in scope" and 5 "no member" errors and **no syntax error**, so every read form parses, the provider calls with `.base` and `.wcag` included.
  - `harness-ios-components`: floor and compiled `gen 3, pkg 41` (the two package root token files left out, no duplicate); `checks` empty.
  - `scripts/harness/compare.ts --no-base` accepted both run files (empty scratch lists): only `FAIL new`. With a pins copy whose `xcode.build` was changed, the same run file made the comparator print `FAIL toolchain: ios.toolchain.xcode.build observed "27B52", pinned "0BAD0"`, verdict `FAIL (toolchain, new)`.
- These counts are Xcode 27.2's and are not baselines.

## 3. Application-time adaptations

1. **A count line that disagrees fails its check even while the probe is blocked.** Design § 3 says that while the probe is blocked the count lines are written `ok: true` with detail `blocked`. I write `ok: n = m` and append `(blocked)` to the detail. The two agree whenever the generator is right (every case above); they differ only if the generator drops a read, and a generator fault does not need the compiler to be seen. Reverting is one expression.
2. **The first line has no parenthetical breakdown any more.** `probe: read <n> of <m> index names` is exactly the Req 2.7 form. The per-group lines carry what the old breakdown did.
3. **`swiftHolderMemberLine` is unindented in the module** (`4252ccc64`). The per-run check does not call it to build its pattern: it parses the pinned form (four spaces, `public static let <name>: any DesignerPunkTheme =`) and a test asserts the module's text, once indented, equals it. The Task 11 pin I wrote for amendment 4 asks for the module's line to carry the four spaces; the check works either way.
4. **The planted self-test probe reads no provider.** The planted token module declares no provider, so `generateProbe` takes `provider: false` there; otherwise the self-test would expect a second error it must not have.
5. **`harness consumer config` is a check in the tokens context only**, and runs the module's `checkHarnessConsumerConfig` on the manifest's themes. Block 5 of design § 4 says the module applies the refusals to the harness consumer's own config; it does not say where. The component context has nothing of its own to check, so its `checks` stays empty.
6. **The lane imports `ROOT_TOKEN_FILES` from `scripts/pack-assert.ts`**, not a restated list, so U12 (which retires the root files) changes one place; a test asserts the equality. The cost is that the lane loads that script's module graph; it has a `require.main` guard, so nothing runs.
7. **The manifest has no registration form**, so the `{ light, dark }` pair is invisible to the lane's reader until Task 14 adds one (`probeConfigFromManifest` says so in a comment). It is right for U1 to U8.
8. **The provider and the family are read before they exist.** At U1 the generated code declares neither, so once Stage T builds, the provider and family lines would produce `probe:` entries. That is expected and tagged to row 2's record (Task 3's criterion); I have not run it, because Stage T does not build yet.

## 4. Criteria I could not meet, or could not show

- **Everything on the pinned toolchain.** No run under Xcode 26.6 exists; the four `UNMEASURED` pins still make the toolchain check fail closed on the first `macos-26` run.
- **The product-read count for the harness consumer on a CI run.** Locally it is 2 of 2 (the fixture's two tokens); the criterion's instrument is the Jest test over the committed folder, which passes. The first full run's iOS log, pasted in Task 5's doc, will show the figures.
- **The per-run check against a real emitted holder.** Nothing emits a holder before U6, so the check printed `not checked` on real output. It is exercised on fixtures here; Task 11 reads it at U6.
- **A compiled Stage P over the real token module.** Stage T does not build the generated Swift yet (rows 5, 8 and others), so the real Stage P compile has not run beyond the planted self-test and the stub-module syntax check above.
- Not a Task 3 criterion but a loose end: `swiftHolderMemberLine` indentation (item 3 of § 3), a one-line change in Thurgood's module.

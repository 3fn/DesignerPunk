# MP-4: default-name evidence for the shipped `DesignerPunkTheme { }` (Spec 129)

**Author and run**: Data, 2026-11-07T20:25:39Z (clock at the time of writing the files). **A local run**, on Data's host with the scratch toolchain; no CI context produced it. It is self-attested: the files show what the run printed, and nothing here makes the run independently reproducible. Stacy's host has no JDK.
**Tree**: `origin/main` @ `3610718aa`, built and packed with `scripts/harness/consumer.ts` (`--pins` = a copy of `harness/pins.yaml` whose only change is `consumer.name: DesignerPunk`; see `pins-diff.txt`).
**Toolchain** (the `harness/pins.yaml` § `android` pins, as Gradle printed them in `gradle-tokens-and-probefamily.txt`): Java 17.0.21, Gradle 9.8.2, Kotlin 2.4.21, AGP 9.5.0, Compose BOM 2026.09.00.

## Dated line (Data's own act)

2026-11-07, Data: I re-ran the default-name check at `origin/main` @ `3610718aa` with the consumer's `name` truly unset, and `:tokens` plus a probe module holding only `ProbeFamily.kt` compiled with 0 errors and 0 warnings (`BUILD SUCCESSFUL`). `DesignerPunkTheme { }` resolved to the provider function, not the `data class` constructor, and the other four provider reads (`DesignerPunkThemeFamily.Base`/`Wcag`, and the `family =` calls) resolved too: the module printed `probe: provider read 5 of 5`.

Two corrections to my earlier account:
1. **"`:probe` compiled" was a per-file read.** In the 2026-11-07 run `:probe` failed overall (23 diagnostics, all in `ProbeTokens.kt`) and produced no bytecode; I read `ProbeFamily.kt` as having no diagnostics. This run is a module compile: `:probe:compileDebugKotlin` ran and succeeded over `ProbeFamily.kt` alone.
2. **The earlier run spelled the name out.** The harness always passes `init --name`, so that consumer's config held `name: 'DesignerPunk'`. In this run the line is removed (`consumer.designerpunk.config.ts` has no `name`; `consumer.designerpunk.config.spelled-out-reference.ts` is the config before removal) and `generate` was re-run. The installed `loadConfig` resolves `name = DesignerPunk` from `ConfigLoader.ts`'s default. `generate` into an empty `dist/tokens` produced output byte-identical (`diff -r`) to the spelled-out run's.

## What this does not show

- The probe module here holds only `ProbeFamily.kt`; its other count lines read `0 of 443`, `0 of 248`, `0 of 1`, by construction. This is not the lane's verdict, only the default-name provider read.
- `:dp` was not built. Its diagnostics in the original trace (`DesignerPunkTheme` unresolved at `ContainerBase.android.kt:542`, `:557`, `TokenMapping.kt:220`, `:293`) belong to the component repairs, not to this check.
- The packed tarball's sha256 differs from the original run's (`d2f42ae5…bf3b` here, `d4ac153b…f4fa9` there); the generated `.kt` files are what carry the claim, and their checksum matches (below).

## Files

| File | What it is |
|---|---|
| `gradle-tokens-and-probefamily.txt` | the full Gradle log of this run (1,731 bytes), untrimmed |
| `consumer-build.txt`, `generate-name-unset.txt`, `lane-prepare.txt` | the consumer build, the `generate` run after `name` was removed, and the lane's prepare log (paths shortened to `<scratch>` and `<repo>`) |
| `consumer.designerpunk.config.ts` | the consumer's config used for the run: no `name` |
| `consumer.designerpunk.config.spelled-out-reference.ts` | the same config before the line was removed |
| `harness-consumer.json` | the consumer's manifest |
| `probe.sources.used`, `ProbeFamily.kt` | the one probe source compiled, and its text |
| `pins-diff.txt` | `harness/pins.yaml` against the pins copy used |
| `original-c19-trace/` | the 2026-11-07 C19 run: its consumer build, its two run JSONs, its config (name spelled out), its pins copy, and `gradle-trimmed-diagnostics.txt` (the `e:`, `FAILED`, `BUILD`, toolchain and `probe:` lines of the full 106 KB log; 327 `e:` lines) |

## Checksums (sha256)

| Artifact | sha256 |
|---|---|
| `gradle-tokens-and-probefamily.txt` (this run) | `1ed979cfcaa61f542acb6ea52e6bc946d70b1000ed3f95b8c182e9fb8154ded4` |
| `ProbeFamily.kt` | `a19d0eaad59c0a673f86714e92aac1fb44498a6167789b6e825398f46876d0cf` |
| generated `DesignTokens.android.kt`, this run (name unset) | `cc8b60a03473dd78c7b4a6126fdedfd45f2b623d557b851879c730e6a71f9d4d` |
| generated `DesignTokens.android.kt`, original run (name spelled out) | `cc8b60a03473dd78c7b4a6126fdedfd45f2b623d557b851879c730e6a71f9d4d` |
| generated `ComponentTokens.android.kt`, this run | `a14684304eb7eee7b3e43bf203d52874659dbcef536fc1caad05bf9bc3b9d39a` |
| generated `product/ProductTokens.android.kt`, this run | `029443f56bcb2cce39377f500b006ab9874282e9219540a8f2102612d9eaada4` |
| original full Gradle log (not committed, 106 KB; trimmed in `original-c19-trace/`) | `f0fd86901f1e3bba4e9ffad57c63143aad84c953cab31722f22915d362ef321f` |
| original lane log (untrimmed, not committed) | `6c33ee152c0a608cc13fc70e01f3eaf9cde28e365c126bc174510c997fe3d1f4` |
| original consumer build log | `5c6502e1dc20166c7d3528eec27837d479c3adf8381e263c4db59cdb34aff555` |
| original pins copy | `804d7169d0f89f239c2b6b52662e9c33fe0326fc3a9ad0f4576cba424389c784` |
| this run's tarball (`harness-consumer.json`) | `d2f42ae5718a41189846e660ad1f6d53b5988be3be52c907be6e827a2005bf3b` |

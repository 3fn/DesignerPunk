# Task 3.1 Completion: Re-read the `macos-26` readme at the cut; set the pins

**Date**: 2026-11-06
**Task**: 3.1 (Spec 129, Unit 1, parent 3)
**Agent**: Kenya (Sonnet, as planned)
**Branch**: `task/129-compile-harness-t3`, cut from `task/129-compile-harness` at `f68487af5`

## 1. What changed

- **`harness/pins.yaml`** gains its `ios` section (the only section this task touches). It names the runner label `macos-26`; the Xcode pin 26.6, build `17F113`, app `/Applications/Xcode_26.6.app`; the SDK version 26.5; the deployment target 17.0 (Core Goals' iOS minimum); the compile flags and the two Swift language modes (6 for Stages T and P, 5 for Stage C and the T5 baseline) as pinned keys the lane reads; and a statement that the pins are harness pins, not minimums.
- **The re-read.** `curl` of `actions/runner-images` `images/macos/macos-26-arm64-Readme.md` at 2026-11-06T14:20:08Z. The U1 branch was cut today, so this read is "the unit's cut". Image `20261026.0455.2`, macOS 26.6.2 (25G83): the same image as the tasks round's 2026-11-05 read. Xcode 26.6 (`17F113`) is still the newest 26 minor and is the image default; Xcode 27 is still only a public preview (readme announcement, issue 14404). The date and image version are recorded in the section's `image:` block.
- **Four toolchain pins are NOT set to a real value**: `sdk.build`, `swift.driver`, `swift.version` and `swift.build`. The readme states none of them for Xcode 26.6, and no Xcode 26.x is installed here. They hold `UNMEASURED: set from the first macos-26 read`, a value that cannot match, so the toolchain match fails closed on the first `macos-26` run and names what it observed. `harness/ios/lane.ts --read-toolchain` (3.3) prints the observed fields as pin lines. This is recorded as `MISSING` in `task-3-instruments.md` row 11.

## 2. Targeted tests run

- The comparator's own reader on the file: `parsePins` (`scripts/harness/compare.ts`) read `harness/pins.yaml` and returned exactly one error, `section "android" is missing or not a mapping`, which is Task 4's section. `ios.toolchain` parsed as eight quoted-string fields (`xcode.version`, `xcode.build`, `xcode.app`, `sdk.version`, `sdk.build`, `swift.driver`, `swift.version`, `swift.build`). So the file reads as a whole only when Task 4 lands its section.
- `js-yaml` loads the file and the keys are `consumer`, `ios`.
- No Jest suite covers a pin value. The invocation test in 3.2 reads this section.

## 3. Application-time adaptations

1. **A pin that cannot be measured yet is a placeholder that fails closed, not a guess.** The brief and Req 2.8 want the SDK and Swift pinned. I know Xcode 26.6's version, build and path (readme) and its SDK version (readme's "Installed SDKs": `iphonesimulator26.5` for Xcode 26.5 and 26.6; not confirmed by `xcrun --show-sdk-version`). I do not know its SDK build number or its Swift version, and a guess would either match by luck or fail with a misleading message. The cost: the first full run fails `toolchain` once and a pin-only commit follows before baselines are cut. Task 5.2's baselines are cut after that fix.
2. **The readme date is today's, not the tasks round's.** The tasks round read it 2026-11-05 (image `20261026.0455.2`); the unit's cut is 2026-11-06 and the image is unchanged. No pin moved.
3. **Flag keys are pinned, not just described.** Req 2.8 asks the pin file to pin the flags. The `compile:` block carries each flag as a key, so the lane builds its invocation from the file and a flag edit is a pin change that exception (a) of Req 3.5 sees.
4. **The `android` section is absent**, so `harness/pins.yaml` is not a well-formed whole until Task 4. Nothing in Task 3 depends on the whole.
5. **Observation, not acted on.** `actions/runner-images` also publishes an `xcode-27-arm64` release series (a tag dated 2026-11-04). Whether a `macos-26` label can carry Xcode 27 is not in the macos-26 readme. K-7 says to pin the newest Xcode 26 minor, and Peter's decision 6 approves `macos-26` only, so I did not look further.

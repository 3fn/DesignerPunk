# Task 3.3 Completion: Self-tests (K-4) and the toolchain match (K-6)

**Date**: 2026-11-06
**Task**: 3.3 (Spec 129, Unit 1, parent 3)
**Agent**: Kenya (Sonnet, as planned)
**Branch**: `task/129-compile-harness-t3`; one commit with 3.2 (see `task-3-2-completion.md` § 3, item 1)

## 1. What changed

- **The self-tests, in `harness/ios/lane.ts`** (`selfTestMissingReturn`, `selfTestPlanted`, and the verdict functions `judgeMissingReturn` and `judgePlanted`):
  - **Case 1, at the start of Stages T and C, under each stage's own flags**: `harness/ios/selftest/missing-return.swift` must give exactly one error, and it must be `missing return`. A `-typecheck` would give none, so this shows the invocation compiles. Failure is `FAIL self-test: Stage <T|C>: …`, exit 1, and no run file.
  - **Case 2, at Stage P**: a two-member token file with one `internal` member (`planted/PlantedTokens.swift`) is built as a real module by the Stage T invocation, a real probe is generated from the planted two-name index, and the probe is compiled by plain `import`. It must give a read count of 2 of 2 and exactly one `'plantedInternal' is inaccessible due to 'internal' protection level` entry. It runs whether or not the real Stage T built a module.
- **The toolchain match, in `harness/ios/lane.ts`** (`laneEnv`, `readToolchain`, `parseToolchain`, `toolchainMismatches`): the lane sets `DEVELOPER_DIR` to `<ios.toolchain.xcode.app>/Contents/Developer`; fails `toolchain missing` when that folder is absent; reads Xcode's version, build and app path (`xcodebuild -version`, `xcode-select -p`), the simulator SDK version and build (`xcrun --show-sdk-version`, `--show-sdk-build-version`) and Swift's driver, version and build (`xcrun swiftc --version`); and fails `toolchain`, naming each field, on any difference from `harness/pins.yaml` in either direction, before compiling anything. The same fields go into the run file's `toolchain`, which the comparator checks again.
- **`--read-toolchain`**: prints the running toolchain as pin lines, for filling the four `UNMEASURED` pins (3.1) on the first `macos-26` run.

## 2. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/harness/__tests__/probe-swift.test.ts`: 50 passed. The cases for this subtask:
  - the verdict functions: one `missing return` error passes; a compiler that accepts the file fails with "it typechecked and did not compile"; a different error, and a second error, fail; the planted verdict passes on one inaccessible entry and fails on none, on another error, and on a read count other than 2 of 2;
  - the toolchain parse on a 26.6-shaped sample and on Xcode 27.2's recorded output, including the `swift-driver version:` line that the real tool prints on stderr; a match, a changed field, a missing field and an unpinned extra field;
  - a pin still holding `UNMEASURED: …` shows as a mismatch against any real reading;
  - through the whole lane against a fake `swiftc`: a Swift version differing from the pin fails `toolchain`, naming `swift.version: observed "6.3.1", pinned "6.2.0"`, compiles nothing and writes no run file; an absent app folder fails `toolchain missing` and runs no command; a compiler that accepts the missing-return fixture fails `self-test` at Stage T, and at Stage C for the component context; `DEVELOPER_DIR` is the pinned folder on every command.
- **Under the real Xcode 27.2 (27B52), where the fixtures matter**: both self-tests passed in the real runs of 3.2:
  - `Stage T self-test (missing return) ok: gen:missing-return.swift | missing return in global function expected to return 'Int'`, and the same under Stage C's Swift 5 flags;
  - `Stage P self-test (planted internal member) ok: probe:Probe.swift | 'plantedInternal' is inaccessible due to 'internal' protection level (read count 2 of 2)`, from a real `-emit-module` and a real plain-`import` probe.
- The toolchain match passed against a pins copy carrying 27.2's values (`xcode.version "27.2"`, build `27B52`, SDK `27.2` / `24B8118`, Swift driver `1.168.6`, `6.4.2`, `swiftlang-6.4.2.1.9`); the same eight fields came from `--read-toolchain`.
- `npx tsc -p tsconfig.scripts.json --noEmit`: exit 0.

## 3. Application-time adaptations

1. **The toolchain match has not run against the pinned toolchain, and cannot until a `macos-26` run exists.** Four of the eight pinned fields hold a placeholder (3.1, § 3 item 1), so on the first `macos-26` run the match fails closed and names what it observed. That is a pin-only commit away from green, and it must land before Task 5.2 cuts baselines. The match and the self-tests are written and exercised here, locally and against a fake, not under 26.6.
2. **`swiftc --version` is read from stderr and stdout together.** The real tool prints `swift-driver version: …` on stderr and the rest on stdout; my first parse took stdout only and failed on this Mac. The fix and a test with the split streams are in. This is the kind of fault only a real run finds, which is why the local run was worth doing.
3. **The self-tests run before the real stage and fail the context on their own, with no run file.** K-4 and design § 3 say the self-test "runs first, and fails the context on its own". With no run file the comparator step has nothing to read, so the job fails at the lane step. The alternative, a run file marking the self-test failed, needs a field `compare.ts` does not read; adding one is Thurgood's file.
4. **The planted self-test builds its token module with Stage T's own invocation (module `DPHarnessTokens`, Swift 6, `-emit-module`) in a separate folder.** That makes it the same code path the real Stage P uses, and its result does not depend on the real Stage T, so Stage P is self-tested even while the real tokens do not build.
5. **K-5's text guard is not mine** (`tokenIndexPlatformNames.test.ts`, Ada's, and its retirement when Stage P first prints a full read count). Nothing here changes it.

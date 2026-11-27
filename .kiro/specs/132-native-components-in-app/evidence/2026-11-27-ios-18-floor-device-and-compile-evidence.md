# The iOS 18 floor: which simulator device types run iOS 17 and not 18, and what an 18.0 target changes in compilation

**Date**: 2026-11-27 (device data read 18:3x UTC; compile comparison run 18:5x UTC)
**Author**: Kenya (iOS)
**Why**: Peter ruled Spec 132's P-6 at 2026-11-27T18:32:45Z, "(B), raise to iOS 18", and confirmed it at 18:36:18Z after being told that the floor drops three iPads ("Yes, (B) still stands, raise to iOS 18"). The device fact behind that confirmation was in no committed file. This file records it, with the command that produced it, for ballot `2026-11-27-core-goals-ios-minimum-18` (§ 1; draft #888) to cite. § 2 is the evidence for that ballot's question 3 to Kenya.

**Labels**: **VERIFIED** = run on this Mac, output below. **UNVERIFIED** = not run.

## 1. Simulator device types: iOS runtime range per iPhone and iPad (VERIFIED)

**Source and its limit.** The data comes from CoreSimulator's device-type profiles, the `minRuntimeVersion` and `maxRuntimeVersion` keys of each `profile.plist` under `/Library/Developer/CoreSimulator/Profiles/DeviceTypes`. That is Apple's simulator data, installed with Xcode. It is not Apple's hardware compatibility list, though it agrees with my training-data recall of which iPads iPadOS 18 dropped (UNVERIFIED as a hardware claim).

**Toolchain**: Xcode 27.2 (27B52); `simctl` from CoreSimulator-1174.21; macOS 27.2.1.

**Command** (run as `sh <file>`):

```sh
D=/Library/Developer/CoreSimulator/Profiles/DeviceTypes
for p in "$D"/iPhone*.simdevicetype "$D"/iPad*.simdevicetype; do
  f="$p/Contents/Resources/profile.plist"
  [ -f "$f" ] || continue
  mn=$(plutil -extract minRuntimeVersionString raw "$f" 2>/dev/null || plutil -extract minRuntimeVersion raw "$f" 2>/dev/null)
  mx=$(plutil -extract maxRuntimeVersionString raw "$f" 2>/dev/null || plutil -extract maxRuntimeVersion raw "$f" 2>/dev/null || echo "-")
  echo "$(basename "$p" .simdevicetype)|$mn|$mx"
done
```

**How it is read.** A device type "runs iOS 17" when `min ≤ 17.x` and `max ≥ 17.0`, where `-` means no maximum. It "runs iOS 17 and not 18" when, in addition, `max < 18.0`.

**Result**: of 89 iPhone and iPad device types, 52 run iOS 17. Of those 52:
- **24 iPhones, and none stops before 18.** The oldest iPhones that run 17, the iPhone Xs, Xs Max and Xʀ, have `max` 18.99. The iPhone 8, 8 Plus and X stop at 16.9, so they never ran 17.
- **Three iPads stop at 17.99**: they run iPadOS 17 and not 18.
  - iPad (6th generation): `11.3|17.99`
  - iPad Pro (10.5-inch): `10.3|17.99`
  - iPad Pro (12.9-inch) (2nd generation): `10.3|17.99`

**Full output** (`name|min|max`, in the order the command prints):

```
iPhone 11 Pro Max|13.0|-
iPhone 11 Pro|13.0|-
iPhone 11|13.0|-
iPhone 12 Pro Max|14.1|-
iPhone 12 Pro|14.1|-
iPhone 12 mini|14.1|-
iPhone 12|14.1|-
iPhone 13 Pro Max|15.0|-
iPhone 13 Pro|15.0|-
iPhone 13 mini|15.0|-
iPhone 13|15.0|-
iPhone 14 Plus|16.0|-
iPhone 14 Pro Max|16.0|-
iPhone 14 Pro|16.0|-
iPhone 14|16.0|-
iPhone 15 Plus|17.0|-
iPhone 15 Pro Max|17.0|-
iPhone 15 Pro|17.0|-
iPhone 15|17.0|-
iPhone 16 Plus|18.0|-
iPhone 16 Pro Max|18.0|-
iPhone 16 Pro|18.0|-
iPhone 16|18.0|-
iPhone 16e|18.3|-
iPhone 17 Pro Max|26.0|-
iPhone 17 Pro|26.0|-
iPhone 17|26.0|-
iPhone 17e|26.3|-
iPhone 18 Pro Max|27.0|-
iPhone 18 Pro|27.0|-
iPhone 6s Plus|9.0|15.255.255
iPhone 6s|9.0|15.255.255
iPhone 7 Plus|10.0|15.255.255
iPhone 7|10.0|15.255.255
iPhone 8 Plus|11.0|16.9
iPhone 8|11.0|16.9
iPhone Air|26.0|-
iPhone Duo|27.1|-
iPhone SE (1st generation)|9.3|15.255.255
iPhone SE (2nd generation)|13.4.1|-
iPhone SE (3rd generation)|15.4|-
iPhone X|11.0|16.9
iPhone Xs Max|12.0|18.99
iPhone Xs|12.0|18.99
iPhone Xʀ|12.0|18.99
iPad (10th generation)|16.1|-
iPad (5th generation)|10.3|16.9
iPad (6th generation)|11.3|17.99
iPad (7th generation)|13.0|18.99
iPad (8th generation)|13.0|26.99
iPad (9th generation)|15.0|-
iPad (A16)|18.3|-
iPad Air (3rd generation)|12.2|26.99
iPad Air (4th generation)|12.2|-
iPad Air (5th generation)|15.4|-
iPad Air 11-inch (M2)|17.4|-
iPad Air 11-inch (M3)|18.3|-
iPad Air 11-inch (M4)|26.3|-
iPad Air 13-inch (M2)|17.4|-
iPad Air 13-inch (M3)|18.3|-
iPad Air 13-inch (M4)|26.3|-
iPad Air 2|8.0|15.255.255
iPad Pro (10.5-inch)|10.3|17.99
iPad Pro (11-inch) (1st generation)|12.0|26.99
iPad Pro (11-inch) (2nd generation)|13.4|-
iPad Pro (11-inch) (3rd generation)|14.5|-
iPad Pro (11-inch) (4th generation) (16GB)|16.1|-
iPad Pro (11-inch) (4th generation)|16.1|-
iPad Pro (12.9-inch) (1st generation)|9.1|16.9
iPad Pro (12.9-inch) (2nd generation)|10.3|17.99
iPad Pro (12.9-inch) (3rd generation)|12.0|26.99
iPad Pro (12.9-inch) (4th generation)|13.4|-
iPad Pro (12.9-inch) (5th generation)|14.5|-
iPad Pro (12.9-inch) (6th generation) (16GB)|16.1|-
iPad Pro (12.9-inch) (6th generation)|16.1|-
iPad Pro (9.7-inch)|10.0|16.9
iPad Pro 11-inch (M4) (16GB)|17.4|-
iPad Pro 11-inch (M4)|17.4|-
iPad Pro 11-inch (M5) (16GB)|26.0|-
iPad Pro 11-inch (M5)|26.0|-
iPad Pro 13-inch (M4) (16GB)|17.4|-
iPad Pro 13-inch (M4)|17.4|-
iPad Pro 13-inch (M5) (16GB)|26.0|-
iPad Pro 13-inch (M5)|26.0|-
iPad mini (5th generation)|12.2|26.99
iPad mini (6th generation)|15.0|-
iPad mini (A17 Pro)|18.1|-
iPad mini (A20 Pro)|27.2|-
iPad mini 4|9.0|15.255.255
```

## 2. What an iOS 18.0 deployment target changes in the harness's compiles (VERIFIED locally; on the pinned toolchain UNVERIFIED)

**Inputs**: `@3fn/core` 16.3.0, packed from `3a3bd072b`. Its iOS component, blend, generator and provider sources are unchanged at `e03d3ae3f`: `git diff --stat 3a3bd072b e03d3ae3f` over those paths prints nothing. A scratch consumer ran `init --name Probe --abbreviation pr`, then `generate`.

**Compiler**: this Mac's Xcode 27.2 (Swift 6.4.2), not the lane's pinned Xcode 26.6.

**Invocations**: `swiftc -typecheck -wmo -diagnostic-style llvm -parse-as-library -sdk <iphonesimulator> -target arm64-apple-ios<v>-simulator`, at `v` = 17.0 and 18.0.
- **Token tier**: `-swift-version 6 -module-name DPHarnessTokens`, over the consumer's `DesignTokens.ios.swift` and `ComponentTokens.ios.swift`.
- **Component tier**: `-swift-version 5 -module-name DesignerPunk`, over the consumer's token files plus every non-test package `.swift`, leaving out the package's root `dist/` token files.

| Tier | 17.0 | 18.0 |
|---|---|---|
| Token tier | 0 errors, 0 warnings | 0 errors, 0 warnings |
| Component tier | 64 errors, 13 warnings (11 are `'onChange(of:perform:)' was deprecated in iOS 17.0`) | 64 errors, 13 warnings (the same 11) |

**The component tier's sets of `error:` and `warning:` lines, with line and column removed, are identical at the two targets** (`diff` prints nothing).
- So on this toolchain an 18.0 target changes no harness key and adds no deprecation warning. The harness keys on errors only (Spec 129 design K-2).
- That the pinned Xcode 26.6 behaves the same is UNVERIFIED. The iOS harness contexts run at the ballot's application head are the check.

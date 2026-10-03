# Issue: nine shipped iOS files read the theme environment key without the key-path backslash, so defining the theme surface alone would not make the tree type-check

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Lina (component content, `src/components/core/**/platforms/ios/*.swift`); Kenya as the iOS verifier
**Trigger**: **the same event as the theme-hardcoding fix**, whichever fires first of the two named in `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md` (the native component distribution follow-up, or the platform build-verification charter's evaluation), **or Spec 129's design phase opening on scope item (i) (theme emission), whichever is earliest**. Why: the nine spellings are inseparable from the 27-site rename in that issue: both edit the same lines' neighbours, and a fix that defines or renames the theme surface without correcting these nine would still fail `swiftc -typecheck`. Correcting the nine spellings alone is cheap and independent of the rename (a one-character change per file), but it is not observable without a defined key, so it does not need its own date. Not blocking release 2 or 3: iOS ships as labelled reference source (release 15.0.0 notes; Spec 123 Task 19).
**Source**: Kenya's review entry `[KENYA R1]`, item B1, in `.kiro/specs/123-consumer-distribution/feedback/tasks.md` on branch `origin/chore/123-u3-amendment` (the entry's `[@KENYA]` answer and item B1). Peter, 2026-10-03: "let's capture the issue." Kenya routed it to me through Leonardo; it was not in my theme-hardcoding issue.

---

## The gap

`.kiro/issues/2026-09-26-native-component-theme-hardcoding.md` item 2 counts 27 sites that hardcode `@Environment(\.dpTheme)`. That count mixes two spellings. Nine of the 27 omit the key-path backslash and write `@Environment(.dpTheme)`. Kenya reports that this spelling parses but does not type-check even when the key **is** defined: `generic parameter 'T' could not be inferred`. The backslash form compiles. So the fix in the earlier issue ("a fixed protocol the consumer's `generate` conforms to, or components generic over the theme") is necessary but not sufficient: it would leave these nine files failing.

## What I verified on `main` (e25fd512)

All greps are `grep -rn --include='*.swift'` over `src/`.

- **The nine files, VERIFIED** (`@Environment(.dpTheme) private var theme`, no backslash):

| # | File (under `src/components/core/`) | Line |
|---|---|---|
| 1 | `Progress-Bar-Base/platforms/ios/ProgressBarBase.ios.swift` | 47 |
| 2 | `Badge-Label-Base/platforms/ios/BadgeLabelBase.ios.swift` | 211 |
| 3 | `Progress-Indicator-Label-Base/platforms/ios/ProgressIndicatorLabelBase.ios.swift` | 50 |
| 4 | `Progress-Indicator-Node-Base/platforms/ios/ProgressIndicatorNodeBase.ios.swift` | 129 |
| 5 | `Badge-Count-Notification/platforms/ios/BadgeCountNotification.ios.swift` | 226 |
| 6 | `Badge-Count-Base/platforms/ios/BadgeCountBase.ios.swift` | 184 |
| 7 | `Progress-Indicator-Connector-Base/platforms/ios/ProgressIndicatorConnectorBase.ios.swift` | 78 |
| 8 | `Avatar-Base/platforms/ios/Avatar.ios.swift` | 292 |
| 9 | `Progress-Pagination-Base/platforms/ios/ProgressPaginationBase.ios.swift` | 67 |

  Kenya's list matches mine file for file and line for line.
- **The backslash form: 18 sites; both spellings together: 27.** `@Environment(\.dpTheme)` appears 18 times and `Environment(\?.dpTheme)` (either spelling) 27 times, so 18 + 9 = 27, matching the earlier issue's total. VERIFIED.
- **Nothing defines the surface, VERIFIED**: zero `protocol|struct|class DesignerPunkTheme` and zero `var dpTheme` in any `.swift` file under `src/`.
- **The type-check failure, reproduced by me with a probe** (host `swiftc`, iOS 17.0 simulator target; the probe is a 4-line file kept in scratch and **not citable**, so the content is here): an `EnvironmentKey` `DPThemeKey`, an `EnvironmentValues` extension adding `var dpTheme: Int`, and a view with `@Environment(\.dpTheme) private var theme`. With the backslash, `swiftc -typecheck -sdk <iphonesimulator> -target arm64-apple-ios17.0-simulator` exits 0. Replacing only `\.dpTheme` with `.dpTheme` exits 1 with `error: generic parameter 'T' could not be inferred` at the property wrapper. This reproduces Kenya's finding. It is a probe, not a build of the tree.
- **Parse behaviour, reproduced**: `swiftc -parse` on `ProgressBarBase.ios.swift` exits 0, so the nine files do parse, as Kenya said.
- **The unterminated comment still reproduces, VERIFIED**: `swiftc -parse src/components/core/Container-Card-Base/platforms/ios/ContainerCardBase.ios.swift` reports `ContainerCardBase.ios.swift:962:2: error: unterminated '/*' comment`, with the comment started at line 816 (`/**` under `// MARK: - View Extension`).
- **UNVERIFIED by me**: that the nine files have no other type errors once the key is defined and spelled correctly; I did not typecheck any shipped file. Kenya's measured first post-parse error in the earlier issue was `NavHeaderBase.ios.swift:42` (a different, theme-name error), which shows the shipped tree has other failures before these nine are reached. Also UNVERIFIED: Kenya's claim that `TokenFileGenerator.ts:1028` (`generateThemeOverrideBlocks`) has no production caller (it is in Kenya's `[@KENYA]` answer and bears on Spec 129, not on this issue; I did not re-grep it).

## Relation

- **`.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`**: this is a correction to its item 2 (27 sites, two spellings), and a fifth reason the iOS tree cannot compile as shipped. That issue should be read with this one; I have not edited it.
- **Spec 129** (`.kiro/specs/129-consumer-generation-completeness/design-outline.md`): scope item (i) (theme emission, by pointer to `.kiro/issues/2026-06-28-spec-094-platform-theme-emission-unwired.md`) and the open question on whether 128 or 129 owns native theme emission (the outline's open questions, item 2). Whichever spec owns emission, the components' side of the contract (what spelling they read) is mine and sits here.

## Fix shape (not done here)

1. Correct the nine spellings to `@Environment(\.dpTheme)`: one character each, nine files. Independent of everything else.
2. Then the rename or generic-over-theme change in the earlier issue, for all 27 sites, once the owner of the emitted theme surface (Spec 128 or 129; Ada's generator seat for the emitter) has fixed the name contract.
3. Verification: Kenya re-runs `swiftc -typecheck` on the touched files with a defined key. The platform build-verification charter (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`) is the standing home for a repeatable check.

## Grant paths

None filed yet (README rule 8: filed before the fixing PR opens, after the shape is picked). **Proposed list for the fixing PR**, for the correction in step 1 alone:

- `src/components/core/Progress-Bar-Base/platforms/ios/ProgressBarBase.ios.swift`
- `src/components/core/Badge-Label-Base/platforms/ios/BadgeLabelBase.ios.swift`
- `src/components/core/Progress-Indicator-Label-Base/platforms/ios/ProgressIndicatorLabelBase.ios.swift`
- `src/components/core/Progress-Indicator-Node-Base/platforms/ios/ProgressIndicatorNodeBase.ios.swift`
- `src/components/core/Badge-Count-Notification/platforms/ios/BadgeCountNotification.ios.swift`
- `src/components/core/Badge-Count-Base/platforms/ios/BadgeCountBase.ios.swift`
- `src/components/core/Progress-Indicator-Connector-Base/platforms/ios/ProgressIndicatorConnectorBase.ios.swift`
- `src/components/core/Avatar-Base/platforms/ios/Avatar.ios.swift`
- `src/components/core/Progress-Pagination-Base/platforms/ios/ProgressPaginationBase.ios.swift`

These are under `src/components/**`, which is Lina's charter write scope, so a grant is not strictly needed for them. **Whether `canonical/generated.lock` moves is UNVERIFIED**: I have not checked whether `src/components/**` is in the diff-guard input closure (the closure roots I read in `tools/agent-generator/diff-guard.ts` do not list it, which suggests no lock move; confirm at the fixing PR). The full 27-site rename (step 2) would need its own list, plus whatever the emitter owner's change needs; that is not proposed here.

## Counter-argument and what survives

- **Against a separate issue**: it is one more record about a tree that is already labelled reference source and that cannot compile for four other reasons; the nine spellings could be a line added to the earlier issue. Fold-back: I kept it separate because Kenya's finding changes what "fixed" means for the earlier issue (defining the surface is not sufficient), and because a reader following the earlier issue alone would believe the rename completes the work. **What survives**: two records for one tree can drift; the earlier issue should gain a one-line pointer here when its fix is scheduled (I did not edit it, to keep this chore append-only).
- **Against fixing the nine now**: the correction is unobservable without a defined key, so a one-character edit in nine files with no test that can fail before or after is unverifiable churn, and it lands in files the rename will touch anyway. **What survives**: that is why the trigger is the rename's event, not a date; if Peter wants the nine corrected earlier on Kenya's probe alone, that is a cheap, low-risk PR, and the pick is his.
- **Against trusting my probe**: it checks the language rule, not the shipped files. Kenya's and my probes agree, but neither proves the nine files compile after the edit. Marked UNVERIFIED above.

# Issue: native components hardcode theme names — cannot compile against any born repo's tokens (+ one shipped Swift file doesn't parse)

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Lina (component content); Kenya/Data as platform verifiers
**Trigger**: fix rides the "native component distribution" follow-up (Kenya/Data's shared charter out of Spec 123 Task 3.5's KEEP-WITH-FOLLOW-UP: first iOS/Android product spec, or the platform build-verification charter's evaluation, whichever first) — OR earlier at Lina's convenience; the parse defect (item 3) is independent and cheap
**Source**: Spec 123 tasks-round platform consults (KENYA R1, DATA R1 in `.kiro/specs/123-consumer-distribution/feedback/tasks.md`), both measured against the real tree; Kenya ran `swiftc -typecheck` (iOS 17 simulator)

## The defect (cross-platform, same class)

1. **Android**: 25 of 41 Compose component files hardcode `LocalDPTheme`. Every born repo's `generate` emits `Local<ABBR>Theme` from the consumer's own abbreviation, so our shipped components can never compile against any consumer's tokens.
2. **iOS twin**: 27 sites hardcode `@Environment(\.dpTheme)` and 11 hardcode `any DesignerPunkTheme` across the SwiftUI tree — same generator-derived naming (`TokenFileGenerator.ts:1243–1250`), same consequence. Confirmed by typecheck: first post-parse error is exactly this (`NavHeaderBase.ios.swift:42`).
3. **Parse defect (independent)**: `ContainerCardBase.ios.swift:816` opens a `/**` comment that never closes — the file does not parse as shipped. Possible harness-charter trigger-2 instance (Thurgood's call, flagged in his tasks-round incorporation).
4. Related known: the generated `ComponentTokens.ios.swift` fails to compile on its own (issue 2026-08-13) and `AvatarTokens` is declared in both that file and `Avatar.ios.swift`.

## Why it matters under Model B

The Spec 123 platform verdicts (KEEP the native trees as labelled reference source) are premised on the trees being useful reading; the theme-name hardcoding is why they can never be more than that today. Any future native distribution (SPM source package / Gradle source module — the shapes both consults identified as Model-B-compatible) requires fixing this first: either a fixed protocol the consumer's `generate` conforms to (generator change, Ada's seat) or components generic over the theme.

## Filed by

Steward (main-loop), 2026-09-26, at Kenya's and Data's routing (both flagged it independently; Kenya confirmed Data's Android finding has the iOS equivalent).

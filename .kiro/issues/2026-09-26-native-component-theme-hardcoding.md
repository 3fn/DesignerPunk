# Issue: native components hardcode theme names — cannot compile against any born repo's tokens (+ one shipped Swift file doesn't parse)

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Lina (component content); Kenya/Data as platform verifiers
**Class**: P2 obligation (record) · defect *(set 2026-10-20, Lina, rule 12. Accepted. The native trees ship as labelled reference source (15.0.0 notes), so no reader is misled and the package claims nothing it cannot hold; but the defect is real and still live (25 Android component files still reference LocalDPTheme, grep 2026-10-20) and the trees cannot compile against any born repo's tokens until it is fixed.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md` — Spec 129's claims pass, which reads whether the requirements that took this record in were met; the record closes there when its items are fixed, or is re-ruled there. *(Re-ruled 2026-11-05, Lina, owner, rules 9 and 11. Reason: taken into Spec 129's requirements as Requirement 4.7 (the theme-name defect under a non-`DP` consumer, Requirement 2.2, and the `ContainerCardBase.ios.swift` L816 parse defect before the harness unit's first PR), bound by 1.4. This record is not among the records the requirements file's path fires (its Trigger was `manual`); E2 sets its target, which corrects the one design-outline.md § 3 row 15 planned ("this spec's `requirements.md`") (#658 at `0a2534311`, its § "Record dispositions" names it through `feedback/requirements.md` § "Context for Reviewers", E2's list; it is not one of the table's seventeen). Re-ruled to the claims pass per E2 (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec") until Spec 129's tasks.md numbers the carrying parent, when it is re-ruled again to that parent's completion doc. Authority: E2; Peter's go for the requirements round, received 2026-11-05T04:34:05Z ("652, 653 and 654 are merged; go for requirements"). The superseded Trigger line is quoted verbatim at the end of this record.)*
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

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 27, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P2 obligation (record) · defect` (the native trees ship labelled as reference source).

*(2026-11-05, Lina, owner, rules 9 and 11: Trigger re-ruled as above. The superseded Trigger line, verbatim:)*

> **Trigger**: `manual` — the native component distribution follow-up starts, or the platform build-verification charter's evaluation opens, or Spec 129's design phase opens on scope item (i), whichever is first; the parse defect (item 3) is independent and cheap. *(was: fix rides the "native component distribution" follow-up (Kenya/Data's shared charter out of Spec 123 Task 3.5's KEEP-WITH-FOLLOW-UP: first iOS/Android product spec, or the platform build-verification charter's evaluation, whichever first) — OR earlier at Lina's convenience; the parse defect (item 3) is independent and cheap. The Spec 129 arm is taken from the 2026-10-03 iOS key record, which ties its trigger to the same event.)*

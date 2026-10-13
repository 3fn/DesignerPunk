# Issue: the native consumer profiles never tell their agents that native onboarding is unsupported on this release, nor what in the shipped native output does not resolve

**Date**: 2026-10-12
**Status**: ACTIVE. **No fix is authorized by this record.**
**Owner**: **Leonardo**, product architecture: whether the consumer agent layer must carry the release's scope sentence, and where. **Thurgood**: profile author; authoring, the operative-set and disposition mechanics, the re-sign round. **Kenya** (iOS) and **Data** (Android): the wording for their own overlays, and their signatures. **Peter**: the fork below.
**Trigger**, two events, depending on the branch Peter picks:
- **Add now**: **U3c's squash-merge to `main`.** U3c (Task 31) deliberately does not widen to this. The work then lands in the first PR after that merge which opens a native-overlay authoring and re-sign round, and **before the release-3 tag**, because the consumer agent layer ships in release 3.
- **Leave silent**: **Spec 129's requirements round opening.** The gap is written there as a requirement, and it closes when the platforms do.
- Either way, the monthly walk checks this record against both events.
**Grant paths**: none.
**Source**:
- Kenya's and Data's U3c reads, on `task/123-u3c-profile-corrections`: `.kiro/specs/123-consumer-distribution/completion/task-31-reads/kenya.md` § "Overlay vs Task 19's iOS sub-section", the "Omissions" bullet; `…/task-31-reads/data.md` § Q2 "FORK" and § "What in my overlay the Task 19 Android sub-section now contradicts", item 4.
- Thurgood's 31.2 `## Found later` (`…/completion/task-31-instruments.md`, the 2026-10-12 rows: steward-side canonical text; Ada's notes).

---

## The gap (verified by `git grep`, 2026-10-12)

The Integration Guide's § Platforms tells a human reader four things. Kenya and Data wrote the sentences at Task 19, and they are verified at `task/123-u3-onboarding` `a22bd890b`:
1. **Native onboarding is not supported on this release**: the SwiftUI and Compose components are reference source, not a build input. Sources: `governance/DesignerPunk-Integration-Guide.md:160`, `:174`, and the scope sentence at `:23`.
2. **The generated native colour output calls an OKLCH function that nothing defines**:
   - iOS: `DesignTokens.ios.swift` calls `Color.oklch(...)`, which no shipped file defines and no declared dependency provides (`:164`).
   - Android: the Kotlin calls `Oklch(…).toComposeColor()`, which needs the colormath library, and the file imports nothing (`:182`).
3. **iOS `ComponentTokens.ios.swift` refers to `SizingTokens`, `SpacingTokens` and `BorderWidthTokens`**, which no shipped file defines (`:166`).
4. **Ada's note** (Thurgood's 31.2 `## Found later`): the shipped native components hard-code their theme read, as `@Environment(\.dpTheme)` on iOS and `LocalDPTheme` on Android, under names fixed to DesignerPunk's own configuration.
   - The guide states the theme surface is absent (`:160`, `:174`).
   - The hard-coding itself is tracked in `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`, and the iOS backslash defect in `.kiro/issues/2026-10-03-ios-theme-environment-key-missing-backslash.md`.

**The agent layer those seats run under says none of it.**
- `git grep -i -E "not supported|reference source|oklch|chromakit|colormath|SizingTokens|SpacingTokens|BorderWidthTokens|dpTheme|LocalDPTheme"` over `canonical/profiles/consumer/{kenya,data}.overlay.md`, at `origin/task/123-u3c-profile-corrections` (after 31.2): **0 hits** in each.
- **The whole consumer agent layer is silent, not only the native overlays**: `git grep -i "ready for building web products\|native onboarding"` over `canonical/` and `tools/agent-generator` returns **0 files** on both branches. The release's scope sentence reaches people through `docs/consumer/INSTALL.md` and the README, never through an agent's always-loaded text.
- After U3c, the overlays do say what `generate` does not produce (the theme surface; Kenya's and Data's `theming-1` replacements, "plans to address … Spec 129"). They still do not tell an agent that a native product should not be started on this release, or that the shipped native output will not compile as-is.

**Why it matters (Leonardo):**
- A human who reads INSTALL.md is stopped at the scope sentence. An agent asked by that same human to "build the iOS screen" is not.
- Consumer-Kenya and consumer-Data are the seats most likely to be asked to build on native, and they are the ones not told. They will start from the theme-free `DesignTokens` and the reference components. The first sign of the gap will be a compile failure, not the scope sentence.
- This is the class D-live-1 named: the doc corrected, the agent prompt not.

## The fork (Peter's call; surfaced, not picked)

**(A) Add the scope sentence to the two native overlays now: one line each, true today.**
- Proposed line (Kenya and Data own the final words):
  `Native onboarding is not supported on this release: DesignerPunk's iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input, and the generated native token output does not compile as-is (see the Integration Guide's § Platforms). Don't start a native product on this release; DesignerPunk plans to address it (Spec 129).`
- It points to the guide for the OKLCH, `SizingTokens`-family and `dpTheme` specifics, rather than copying them into a prompt, where they would go stale.
- **Cost**:
  - an authoring commit on `canonical/profiles/consumer/**`;
  - a re-sign round for whichever rows the freshness sweep then marks stale (the `#in-scope` unit if it lands there; it is unsigned today);
  - a lock refresh;
  - all before the release-3 tag.
- **Surviving counter**: it adds a claim the profile must take back when Spec 129 lands, so it carries a known expiry. If 129's open question 2 moves native theme emission to Spec 128 (Ada's note), "Spec 129" in an agent prompt goes stale before the platforms arrive. Writing the line without a spec number ("plans to address it") avoids that, at the cost of telling the agent less.

**(B) Leave the agent layer silent until Spec 129 lands the platforms.**
- The gap closes when the claim becomes false. Nothing has to be taken back, and no re-sign round runs before the tag.
- **Surviving counter**: for the whole of release 3, a consumer's native seat can start a native product that the release says not to start. The scope sentence exists to prevent exactly that failure, and the agent is the one reader it does not reach. U3c's `theming-1` replacements reduce this but do not remove it: they say a surface is missing, not "don't build".

**Class-level option (input for the fork; its cost is higher):** carry the release scope sentence once, in an always-loaded consumer member that every seat reads, rather than per overlay. Web seats and Leonardo would then also know that custom themes do not emit, which they do not today either.
- **Cost**: it touches `canonical/shared` or the consumer identity set (U3's no-overlap paths), and a scope sentence in an identity member changes with every release.
- **Not vetted with Thurgood** (the profile and generator author); if Peter wants this option, Thurgood is consulted first.
- My lean, if asked: (A) for release 3, since the native seats are the ones at risk, and the class option as a Spec 129 requirement.

## What the walk checks

- Has U3c merged? If (A) was chosen and the release-3 tag is cut with no native-overlay scope line, that is a finding.
- If (B) was chosen: has Spec 129's requirements round opened without a requirement carrying this gap? That is a finding.
- No ruling yet: surface it to Peter at the walk. That is not a finding.

## Closing

Record the outcome here (dated) and `git mv` this file to `archive/` when either:
- the native overlays carry the line and are re-signed ((A)); or
- Spec 129's requirements carry the gap by name ((B)).

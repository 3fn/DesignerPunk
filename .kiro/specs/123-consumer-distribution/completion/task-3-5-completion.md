# Task 3.5 Completion — Record Kenya's and Data's KEEP-WITH-FOLLOW-UP verdicts quoted; the honest label; commit the shared follow-up issue; route the two defects

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 3 · **Agent**: Ada (Sonnet)

## Kenya's verdict (iOS `.swift`) — QUOTED from `feedback/tasks.md` § "[KENYA R1]"

> **VERDICT for Task 3.5 (`.swift`): KEEP-WITH-FOLLOW-UP.** *"The SwiftUI tree is not a consumable build input today. It binds `DesignerPunkTheme`/`\.dpTheme`, one file does not parse, and there is no package manifest. But it is the only iOS component material a consumer or consumer-Kenya has. Cutting it removes the iOS surface before any replacement exists; keeping it costs a labelled reference tree, not a false promise. Keep it as reference source, and charter real SPM distribution as a follow-up."*
>
> **What working the counter-argument changed.** The counter: ~700 KB of source that fails against every born tier is a false affordance, so CUT is more honest. That is why the verdict carries the honest-label condition below.
>
> **What survives.** The label does not stop a human browsing `node_modules` from trying it. If tarball honesty is weighed above consumer-agent reference access, CUT with Ada's D-T-A4(ii) "no iOS component implementations ship" line is defensible. That is a fork for Peter if contested; I lean KEEP.

Confirmed at R2 (§ "[KENYA R2]"): *"(a) Pack-assertion rows — CONFIRMED COMPLETE... (b) Verdict and label — FAITHFUL, both the quoted verdict and the label form... None of the three is blocking. From my seat, Task 3 is ready once the steward folds or declines these advisories."*

## Data's verdict (Android `.kt`) — QUOTED from `feedback/tasks.md` § "[DATA R1]"

> **VERDICT for Task 3.5: KEEP-WITH-FOLLOW-UP.** *"The `.kt` tree is not a consumable build input today, but it is the only Android component material a consumer or consumer-Data has. Cutting it removes the Android surface before any replacement exists, while keeping it costs a labelled reference tree, not a false promise. Keep it as reference source, and charter real Compose distribution as a follow-up."*

Confirmed at R2 (§ "[DATA R2]"): *"(b) Verdict quote + label placement — CONFIRMED faithful. The generic label is my wording. My named causes (hardcoded `LocalDPTheme`, no Gradle module) are carried by 'plus each platform's named causes.'"*

**Neither verdict is CUT** — Task 3's escalation trigger ("a 3.5 verdict reads CUT") does not fire.

## The honest label

Per both verdicts and both R2 confirmations: **"reference source, not a build input; does not compile against a born repo's own tier as shipped"** — plus each platform's named causes:
- **iOS**: binds `DesignerPunkTheme`/`\.dpTheme` (OUR OWN config-derived names, never the consumer's); `ContainerCardBase.ios.swift:816` does not parse; no `Package.swift`.
- **Android**: hardcodes `LocalDPTheme`; no Gradle module.

This label is recorded here and in `.kiro/issues/2026-09-26-native-component-distribution.md` (below). Per Kenya R2's placement finding (item (b)), the label ALSO belongs on the package `README.md` (npm ships it in every tarball regardless of `files[]`, and it is the surface a `node_modules`-browsing or npm-page reader actually meets — today it reads *"True implementations (Web Components, SwiftUI, Jetpack Compose)"*, the exact false affordance her R1 residual named) and on Task 19's install doc (both U3 scope, outside this Primary Artifact's write scope on this branch — flagged in the orchestrator report below, not silently deferred without a trace).

## The committed follow-up issue

**`.kiro/issues/2026-09-26-native-component-distribution.md`** — committed as part of this subtask. Contents (summary; full text in the file):
- **Owners**: Kenya (iOS) + Data (Android) design the distribution shape; Lina owns the component content the shape requires; Ada owns the generator-side theme-conformance change.
- **Trigger** (corrected to Kenya R2's and Data R2's joint two-limb wording, NOT the original narrower "shared with harness trigger 1"): *"first Android/iOS product-spec kickoff, or any evaluation of the harness charter (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`), whichever fires first."* This corrects Task 3's original text, which named only the harness charter's FIRST trigger limb — both reviewers held that ANY of the harness charter's own triggers (e.g. its trigger 2, an invalid-platform-code incident, which Kenya's own `:816` finding could independently fire) should also wake this issue.
- **Cites** `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md` as a PRECONDITION (the theme-binding/hardcoding fix has to land before either distribution shape is buildable) rather than duplicating its defect inventory.
- **The two shapes**, per-platform, summarized from Kenya R1 and Data R1: iOS SPM source package (theme-binding inversion via a fixed protocol or generic-over-theme components; access-control pass; distribution-channel decision); Android Gradle source module (LocalDPTheme fix; minSdk decision; res relocation; tokens-module dependency shape). Both explicitly rule OUT a binary artifact (`.xcframework` / AAR) under Model B — it bakes DesignerPunk's own token VALUES into compiled bytecode.
- **Status**: CHARTERED, not scheduled — no build work is authorized by filing this issue.

## The two defects routed to Lina

I have no channel to Lina directly. Both messages below are included in my report to the orchestrator (Peter), for relay, per the brief's instruction. Both are cited by reference (path + line), not duplicated as new prose beyond what's needed to route them.

**Message 1 — the Lina A7 finding** (design.md § "C5", pre-named): `dist/components/**/*.web.js` files `require("./X.web.css")`, and `dist/components` ships **zero** `.css` files. Verified current on this tree: `find dist/components -name "*.css" | wc -l` → **0**; `grep -l "require(\"./.*\.web\.css\")" dist/components/**/*.web.js` → multiple matches (e.g. `Button-Icon/platforms/web/ButtonIcon.web.js`, `Button-CTA/platforms/web/ButtonCTA.web.js`, `Input-Checkbox-Base/platforms/web/InputCheckboxBase.web.js`). Closure 2 does not traverse `dist/components` (it walks `src/tokens/**`'s runtime import graph, an entirely separate surface), so this defect is invisible to Task 3's own instruments — it is out of 123's scope and routed as a latent defect. Consumers load components through the browser bundle (`dist/browser/designerpunk.esm.js`), which inlines the CSS, so this is not currently consumer-visible; it would surface if anything ever imported `dist/components/**` directly.

**Message 2 — the `ContainerCardBase.ios.swift:816` parse defect** (Kenya R1, `feedback/tasks.md` § "[KENYA R1]"): `src/components/core/Container-Card-Base/platforms/ios/ContainerCardBase.ios.swift` opens a `/**` comment at line 816 that is never closed. Verified current on this tree (`sed -n '810,820p'` shows the unterminated `/**` at line 816, followed by `// View.if extension defined in Container-Base`). Everything after line 816 is swallowed by the open comment — the file does not parse as shipped. This is already filed at `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md` item 3, cited here rather than re-filed. Thurgood's own tasks-round incorporation flagged this as a possible instance of the harness charter's trigger 2 ("any evaluation of the harness charter... an invalid-platform-code incident") — that determination is his to make, not mine.

## Targeted tests + result

No new test surface for this subtask (it is a recording/routing/filing subtask, not a code change). Verification commands (all re-run and reproduced above): the `dist/components` CSS-count grep, the `ContainerCardBase.ios.swift` line range, and the `README.md` non-existence check for `src/tokens/platforms/ios/` (shared with Task 3.4).

## Application-time adaptations

1. **The README.md label placement (package `README.md`, Task 19's install doc) is NOTED here but not applied** — both are outside this Primary Artifacts list on this branch (`.kiro/README.md` isn't a Task 3 Primary Artifact; Task 19 is a U3 parent). Flagged in the orchestrator report rather than silently dropped.
2. **The iOS `src/tokens/platforms/ios/**` count correction (3→2, Task 3.4) is cross-referenced here** since it was discovered while re-checking Kenya's own R2 measurement for this subtask's quoting — not duplicated in full (see Task 3.4's completion doc).

## Known issues

- Package `README.md`'s "True implementations (Web Components, SwiftUI, Jetpack Compose)" line still overstates iOS/Android readiness — flagged for U3 (Task 19) or a direct Peter/Thurgood decision on whether it's in-scope sooner, per Kenya R2's advisory. Not fixed here (out of Task 3's write scope).

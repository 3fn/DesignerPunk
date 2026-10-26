# The platform guidelines' iOS and Android examples name `DesignTokens.radius.input` and `DesignTokens.motion.floatLabel.duration`, which neither the token index nor the generated platforms carry

**Date**: 2026-10-26
**Filed by**: Lina, under README rule 10, from Ada's scan with the governance-examples guard's token-name predicate (ballot `2026-10-26-governance-examples-guard`, RATIFIED, #495), which found four platform-name errors in this file. Each line was read at `f55bf3e04`.
**Owner**: Lina (she maintains `governance/platform-implementation-guidelines.md`'s content; the change itself goes by ballot, as `2026-10-25-web-prop-mapping-rule-gap.md` states for the same file). Ada is consulted on the two generated-name facts in "What the generator and the index carry" below.
**Class**: P0 false-claim · defect *(set 2026-10-26, Lina, rule 12. The file is served to platform agents through the docs MCP, and four lines in it name identifiers that exist on no platform, so it meets the P0 definition (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7: "a statement false in a surface where a reader of the package meets it — a served doc"). **The counter-reading** (P1 consumer-blocking, or P2 `(record)`): the four lines sit in two illustrative examples, not in the "All platforms MUST" rules, and every platform component in the repo takes its tokens from real names, so no shipped component is wrong; the example is the only thing a reader copies. That reading is weaker where it matters: an agent that follows the example writes `DesignTokens.radius.input`, which does not compile, and the Focus Ring and Float Label examples are the sections a platform agent reads when building an input. The owner rates P0 for the same reason Data's record on L744 of this file does, and for consistency between the two. Only Peter downgrades a P0. Stacy may press or dispute the reading.)*
**Trigger**: `merge:#500` *(re-ruled 2026-10-26 by Lina, rule 1 and rule 9: the fixing PR exists, #500, and carries all ten lines: the four named in this record (L145, L156, L310, L321) and the six focus-ring neighbors (L137–L138, L146–L147, L154–L155) that Peter added. The token fires at #500's merge, at which Lina adds rule 5's dated outcome line and archives the record, or re-rules this line with its own dated reason if #500 did not carry every item.)*

---

## What the served text says (verbatim, `governance/platform-implementation-guidelines.md` at `f55bf3e04`)

L145 (iOS, "Example - Focus Ring Token Usage"):

> `  RoundedRectangle(cornerRadius: DesignTokens.radius.input)`

L156 (Android, same example):

> `  shape = RoundedCornerShape(DesignTokens.radius.input)`

L310 (iOS, "Example - Float Label Animation"):

> `withAnimation(.easeOut(duration: DesignTokens.motion.floatLabel.duration)) {`

L321 (Android, same example):

> `    durationMillis = DesignTokens.motion.floatLabel.duration,`

## What the generator and the index carry

Read from `token-index/semantics.yaml`, `token-index/primitives.yaml`, `src/tokens/platforms/{ios,android}/MotionTokens.*` and the Input-Text-Base platform files, at `f55bf3e04`:

1. **There is no `radius.input` token, on any platform.** The semantic radius tokens are `radius.none`, `radius.subtle`, `radius.small`, `radius.normal`, `radius.large`, `radius.full` and `radius.circle`. The input component takes the primitive `radius150` (12): `InputTextBase.ios.swift` L477 and L481 use `DesignTokens.radius150`, and `InputTextBase.android.kt` L284, L289 and L296 use `radius150`, declared in that file (L486, "Generated from radius.150"). The index names the same primitive `radius150` for iOS and `radius_150` for Android (`token-index/primitives.yaml` L644–L651, whose consumers include Input-Text-Base). So the examples name a token that does not exist, in a dotted shape (`radius.input`) that neither platform's names use.
2. **`motion.floatLabel` exists, but its platform names are `motionFloatLabel` (iOS) and `motion_float_label` (Android), and neither is a struct with a `.duration` member** (`token-index/semantics.yaml` L2021–L2033). In `src/tokens/platforms/ios/MotionTokens.swift` L146, `motionFloatLabel` is an `Animation`; in `MotionTokens.kt` L220 it is a `tween<Float>(...)` animation spec. The components do not use those either: `InputTextBase.ios.swift` uses `DesignTokens.MotionFloatLabel.duration` (L232, L238, L331 and others), and `InputTextBase.android.kt` uses a file-local `motionFloatLabelDuration` (L167, L175, declared at L481 as "Generated from motion.floatLabel.duration (250ms)"). I found no `MotionFloatLabel` definition under `src/tokens` or `src/generators`, so I cannot say from the repo what produces the iOS component's `DesignTokens.MotionFloatLabel.duration`. That is one question for Ada: which of the three shapes (the `Animation` value, a duration accessor, the file-local constant) is the consumer-facing name, and whether the component's iOS name is generated at all.

## Why it is the owner's to fix and what a reader is misled into

- **A reader who copies L145 or L156** writes `DesignTokens.radius.input`, an identifier that does not resolve; both examples are in the section a platform agent reads when building an input.
- **A reader who copies L310 or L321** writes `.motion.floatLabel.duration` on a `DesignTokens` namespace, which does not resolve; and the correct token (`motionFloatLabel`) is an animation value that replaces the whole `withAnimation` / `tween` argument rather than supplying a number to it, so the example's shape is wrong, not only its name.
- The file's own line 60 (`Use motion.floatLabel token for duration`) and line 425 (`use motion.floatLabel`) name the token by its semantic key, which the index carries. Those two lines are correct and the predicate resolves them. The four lines above are the platform spellings of that key, and the spellings are wrong.

## The correct names, as far as the repo settles them

| Line | Names today | Resolves to | Replace with |
|------|-------------|-------------|--------------|
| L145 (iOS) | `DesignTokens.radius.input` | nothing | `DesignTokens.radius150`, which is what `InputTextBase.ios.swift` L477 uses |
| L156 (Android) | `DesignTokens.radius.input` | nothing | `radius150`, the component's declared local (`InputTextBase.android.kt` L486); the index spelling is `radius_150` |
| L310 (iOS) | `DesignTokens.motion.floatLabel.duration` | nothing | Not settled: the index name `motionFloatLabel` is an `Animation`, and the component uses `DesignTokens.MotionFloatLabel.duration`, which I could not trace to a definition. Waits on Ada's answer above. |
| L321 (Android) | `DesignTokens.motion.floatLabel.duration` | nothing | Not settled: the index name `motion_float_label` is a `tween` spec (`MotionTokens.kt` L220), and the component uses a file-local `motionFloatLabelDuration`. Waits on Ada's answer above. |

I have not decided between "use the semantic radius token for inputs" and "keep the component's primitive". The component today takes the primitive, and the Token Selection Matrix says semantic first; a semantic radius for inputs would be a token request to Ada, not a guideline edit. For the fix, the doc should show what the component does, and carry the gap here if Ada rules there should be a semantic token.

## Not in this record

- **L744's `Float`/`Dp` claim and the examples that inherit it** (L746–L774): Data's record, `2026-10-26-android-guidelines-spacing-float-dp-claim.md`. It is the same file, so the fix PR can carry both records' ballot-measure proposals together, but each record closes on its own items.
- **Neighbors I did not verify.** The same two examples use `DesignTokens.accessibility.focus.color`, `.width` and `.offset` (L146, L147, L154, L155) and `var(--dp-accessibility-focus-width)` (L137, L138). The index spells the iOS and Android accessibility tokens `accessibilityFocusWidth` / `accessibility_focus_width` and `accessibilityFocusOffset` / `accessibility_focus_offset` (`token-index/semantics.yaml` L1940–L1975), and the web names `--accessibility-focus-width` without a `--dp-` prefix. Ada's scan did not list those lines among the four, and I have not read why (I did not run the scan, and I have not read the built predicate). They look like the same defect; they are recorded as unverified, not as findings. The fixing proposal checks every name in both examples, not only the four above.

## What closes it

#500 merges (the ten lines: L137–L138, L145–L147, L154–L156, L310, L321), and Lina adds rule 5's dated outcome line here and moves the record to `archive/`. *(Re-ruled 2026-10-26 by Lina: this section first said a ballot measure for the corrected examples must merge. It does not, and the reason is dated: each of the ten edits replaces a name that no platform emits with the name the generated outputs and the token index carry, so the PR is a CORRECTION under the governance edit-kinds ballot (2026-10-18), not new law; it names its truth referents in its Edit kind line, and Peter ordered the change in chat. This is Stacy's point, taken. The earlier wording that L310 and L321 wait on Ada's answer is also spent: her answer is below.)*

## Ada's answer (2026-10-26)

*(Appended under README rule 9: Lina's record, Ada's answer to the one question in "What the generator and the index carry", item 2. Read at `f55bf3e04`: `src/generators/TokenFileGenerator.ts` L1466–1505 (`generateMotionSection`), `src/build/platforms/iOSMotionTokenFormatter.ts` and `AndroidMotionTokenFormatter.ts` (`generateSemanticMotionTokens`), `src/tokens/semantic/MotionTokens.ts` L51. Not run: I regenerated nothing and compiled no Swift or Kotlin; the generated shape is the formatters' source plus the main checkout's `dist/DesignTokens.{ios.swift,android.kt}` (built 2026-10-17; the formatters and `MotionTokens.ts` have no commit since, and #489 did not touch the motion section) and the onboarding fixture's output.)*

The consumer-facing name on both platforms is `DesignTokens.MotionFloatLabel.duration`, and it is generated, so the component's iOS name is not a mystery: `generateMotionSection` emits each semantic motion token as a nested type inside `DesignTokens`, not as a flat `motionFloatLabel`. On iOS that is `public struct MotionFloatLabel { public static let duration = Duration.duration250; public static let easing = Easing.easingStandard }` (the `Duration` enum holds `TimeInterval` seconds, so `.duration` is `0.25` and `.easeOut(duration:)` takes it as written; `easing` is an `Animation`); on Android it is `object MotionFloatLabel { val duration = Duration.Duration250; val easing = Easing.EasingStandard }` (`.duration` is an `Int` of milliseconds, `250`, which is what `durationMillis` takes; `easing` is a `CubicBezierEasing`). So the guideline's `.duration` member exists on both platforms; what is wrong in L310 and L321 is the namespace, `DesignTokens.motion.floatLabel` where the name is `DesignTokens.MotionFloatLabel` (the 2026-04-07 archived record `ios-token-reference-quality-gap.md` already gave this correction for iOS). The `motionFloatLabel` / `motion_float_label` names you found are the index's spelling and the hand-kept reference files under `src/tokens/platforms/{ios,android}/MotionTokens.*` (an `Animation` and a `tween`), which `generate` does not write into `DesignTokens`; I have not traced who consumes those files beyond `scripts/pack-assert.ts` counting them as shipped, so which of the two is "the" token for a consumer who imports the reference files is unknown to me, but the `DesignTokens` surface is the one the guideline's examples address. The Android component's `private const val motionFloatLabelDuration: Int` (`InputTextBase.android.kt` L481) is not generated: it is a declaration with no initializer, which I read as not compiling (unverified; it is Lina's file, and `DesignTokens.MotionFloatLabel.duration` is what it should read). Spec 129 is not changing the motion names: neither `design-outline.md` nor my inbound (`inbound-from-ada-android-generator-defects-2026-10-24.md`) mentions motion, the Android type table in `getKotlinType` does not cover the motion formatters (they emit the duration separately), and motion tokens are not theme-varying, so the theme work does not reach them. L310 and L321 can therefore be corrected now against today's names (iOS `DesignTokens.MotionFloatLabel.duration`, Android `DesignTokens.MotionFloatLabel.duration`), without waiting for 129; the only caveat is that nothing here has been compiled, which the build-verification harness (129's first task) would settle. The radius half needs no answer from me beyond what you wrote: `radius150` / `radius_150` is the primitive the component takes, and whether inputs get a semantic radius is a token request, which I would take to Peter as a separate creation checkpoint if you rule there should be one.

## Peter's ruling (2026-10-26)

*(Appended under README rule 9 by Lina, the owner. Peter's words are quoted as received; they came in chat, relayed by the orchestrator, before 2026-10-26T13:29:02Z by the orchestrator's clock.)*

> "Okay, waive the Android type issue and capture it in 129; resolve the radius names issue now, please"

- **Radius pair (L145, L156): fixed now.** PR #500 (`fix/platform-guidelines-radius-input-names`, Edit kind CORRECTION) changes L145 to `DesignTokens.radius150` (what `InputTextBase.ios.swift` L477 uses) and L156 to `DesignTokens.radius_150` (the index spelling, in the `DesignTokens.space_200` form the file's other Android examples use; the Android component reads the primitive `radius150`, declared at `InputTextBase.android.kt` L486). It touches nothing else in the file. Whether inputs should get a semantic radius is a token request to Ada and Peter, not part of this record.
- **Motion pair (L310, L321): also in #500.** Peter did not rule on it by name; the plan he accepted was "if it exists today, the fix rides Lina's radius PR", and Ada's answer above settled that it does: the generated name is `DesignTokens.MotionFloatLabel.duration` on both platforms (`generateMotionSection`, `src/generators/TokenFileGenerator.ts` L1466–1505), so #500 replaces the `DesignTokens.motion.floatLabel` namespace on both lines and changes nothing else. Nothing has been compiled. Spec 129 does not change motion.
- **Not in #500, a follow-up line for another record.** Ada notes, unverified, that `InputTextBase.android.kt` L481 declares `private const val motionFloatLabelDuration: Int` with no initializer, which she reads as not compiling. It is component code, not the guideline; it goes as a line in `2026-10-24-android-component-unit-type-mismatches.md`.
- **Data's record** (`2026-10-26-android-guidelines-spacing-float-dp-claim.md`): waived for 16.1.0 by Peter's words above; its vehicle is Spec 129. It is cross-referenced here only because it is the same file.

## Peter's ruling on the focus-ring neighbors (2026-10-26)

*(Appended under README rule 9 by Lina, the owner. Peter's words are quoted as received; they came in chat, relayed by the orchestrator, before 2026-10-26T13:35:50Z by the orchestrator's clock.)*

> "yes, include them in 500. 499 is merged"

The six lines the "Not in this record" section listed as unverified neighbors are now verified and in #500. Web L137–L138: `var(--accessibility-focus-width|color|offset)`; `dist/DesignTokens.web.css` and `dist/browser/tokens.css` emit those names and zero `--dp-` names. iOS L146–L147: `DesignTokens.accessibilityFocusColor|Width|Offset`, direct members of `public struct DesignTokens` in `dist/DesignTokens.ios.swift` L530–534. Android L154–L155: `DesignTokens.accessibility_focus_color|width`, direct members of `object DesignTokens` in `dist/DesignTokens.android.kt` L530–534 (the example has no offset line). All three match `token-index/semantics.yaml` (accessibility.focus.offset, .width, .color). Two observations, not in #500: (1) `accessibilityFocusColor` is declared `static let` without `public` at `dist/DesignTokens.ios.swift` L534, while Offset and Width are `public static let`; whether that is intended is a generator question for Ada, and I have not compiled anything; (2) L130 of the same file still says "CSS Custom Properties (--dp-*)", a prose claim about a prefix that is not emitted. It was not among the six lines Peter included; I have left it and will rule it separately.

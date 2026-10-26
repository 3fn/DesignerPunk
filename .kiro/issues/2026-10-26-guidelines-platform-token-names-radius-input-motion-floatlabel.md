# The platform guidelines' iOS and Android examples name `DesignTokens.radius.input` and `DesignTokens.motion.floatLabel.duration`, which neither the token index nor the generated platforms carry

**Date**: 2026-10-26
**Filed by**: Lina, under README rule 10, from Ada's scan with the governance-examples guard's token-name predicate (ballot `2026-10-26-governance-examples-guard`, RATIFIED, #495), which found four platform-name errors in this file. Each line was read at `f55bf3e04`.
**Owner**: Lina (she maintains `governance/platform-implementation-guidelines.md`'s content; the change itself goes by ballot, as `2026-10-25-web-prop-mapping-rule-gap.md` states for the same file). Ada is consulted on the two generated-name facts in "What the generator and the index carry" below.
**Class**: P0 false-claim · defect *(set 2026-10-26, Lina, rule 12. The file is served to platform agents through the docs MCP, and four lines in it name identifiers that exist on no platform, so it meets the P0 definition (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7: "a statement false in a surface where a reader of the package meets it — a served doc"). **The counter-reading** (P1 consumer-blocking, or P2 `(record)`): the four lines sit in two illustrative examples, not in the "All platforms MUST" rules, and every platform component in the repo takes its tokens from real names, so no shipped component is wrong; the example is the only thing a reader copies. That reading is weaker where it matters: an agent that follows the example writes `DesignTokens.radius.input`, which does not compile, and the Focus Ring and Float Label examples are the sections a platform agent reads when building an input. The owner rates P0 for the same reason Data's record on L744 of this file does, and for consistency between the two. Only Peter downgrades a P0. Stacy may press or dispute the reading.)*
**Trigger**: `release:next:phase-1` *(rule 1: a P0 that would ride the fixing change takes this token, and `merge:#<N>` once the fixing PR exists. Only the owner writes or changes this line (rule 9).)*

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

The ballot measure for the file's corrected examples merges (the four lines above, with the neighbors read), and the fixing PR adds rule 5's dated outcome line here and moves the record to `archive/`. The ballot measure waits on Ada's answer to the one question in item 2 only for L310 and L321; L145 and L156 can be corrected without it.

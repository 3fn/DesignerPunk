# Ballot Measure: True Native Development is not True Native Design

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward), at Peter's direction.
- R2 revision after Leonardo's and Lina's R1 reads.
- R3 revision after the three platform seats' R1 reads.
- R4 records Peter's rulings and the five seats' reads of his F-1 reframing.
- R5 records the owners' confirmations of their site wordings. All rounds are dated the same day.
**Status**: **DRAFT (R5, after the confirmations round).** Peter's answers of 2026-10-18 are recorded in § 8 as relayed, not ratified: F-2 is ruled, F-3 is ruled and edit site 5 is dropped. F-1 (iv) awaits his approval. Nothing in § 6 is applied until this record says RATIFIED (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Origin**: Peter's answer on Spec 130 fork P-1, given in chat on 2026-10-18 and relayed by the orchestrator. It is recorded at `.kiro/specs/130-input-switch-base/feedback.md` § "[PETER R0]". He agreed the answer should become law through this ballot, not stay a feedback line.
**Reviewers of record**:
- **Required**: **Leonardo** (product architect; he consumes the design philosophy) and **Lina** (owner of `governance/cross-platform-vs-platform-specific-decision-framework.md`).
- **R1 reviewers of record**: **Kenya, Data and Sparky**. Kenya asked for the slot. Sites 7 and 8 are their charters, and the platform claims in § 7 are theirs to verify.
- All five R1 reads, and the five reads of Peter's F-1 reframing, are in § 10.
**Unit**: this draft is standalone. The application PR edits `governance/**` and `canonical/**`, so **Peter merges it** under the governance carve-out.

---

## 1. The principle

> **"True Native Development does not necessarily mean True Native Design, and design needs to be able to part from native design to solve a product team's own user needs and branding."** — Peter, 2026-10-18

**The floor is the law's second half.** All five reads agree the sentence holds only with it. Leonardo: "It does not survive if worded as 'native idiom is not binding' with no behavioral floor."

1. **Implementation is always native.** That means build-time platform separation and **the platform's own rendering and accessibility stack**. This wording comes from Sparky (a)1. "UI framework" would have excluded the React and React Native targets that Spec 128 is chartered to admit.
2. **Accessibility semantics are always platform-correct.** Role, state, name, activation, focus and announcements behave as the platform's native control would. The rule needs a referent on every platform:
   - **On web**, "platform-correct" means the WAI-ARIA role contract, the APG keyboard pattern and the HTML-AAM mappings (Sparky (a)2).
   - **Where a platform has no native control**, the component uses that platform's closest documented trait pattern and records the choice (Kenya (a)1).
3. **Interaction the platform owns is never replaced.** That is back and history, scrolling, text selection, and keyboard and IME, together with the platform services a native control takes part in (§ 3 item 10). This part comes from the F-2 ruling; the list is Sparky's platform-owned interaction.
4. **System surfaces and structural idioms are never replaced.** Their contents may be styled.

**A departure in design never licenses a departure in semantics.** (Lina, verbatim.)

**Design covers control behavior too** (F-2, ruled 2026-10-18 and relayed; § 8). The floor above lists what design never chooses. Everything else, look and component behavior alike, is a design choice the spec records, whether it follows platform convention or not.

## 2. What it changes

- **True Native Architecture is a development axis.** It does not bind visual design to platform idiom.
- **Design is a choice.** It may follow native idiom or depart from it, to serve a product's users and brand. Under the floor, a token-drawn control becomes an admissible default rather than a recorded deviation.
- **Why this matters**: Leonardo (a) puts it as "Native controls limit what a theme can reach." On iOS the system Toggle draws its own off track in system colors, out of a theme's reach.
- **Reasons are recorded both ways.** Every component records its visual choice and each behavioral choice, with the reason, whether it follows platform convention or departs (Leonardo (d)3; the F-2 ruling; edit site 3).
- **Review splits along the floor.** A departure in look or in component behavior needs a recorded reason. A departure from the floor is not allowed. Leonardo (a) drew the split between visual and behavioral departures; the F-2 ruling moves it to the floor.

## 3. What a departure must carry: law-level categories, by platform

These are categories, not the switch's list. Each component lists its own instances in `contracts.yaml` (Lina (c)). The list merges Lina's (c) 1–11, Leonardo's (b) 1–8, and the platform reads: Kenya (a), Data (a), Sparky (a). Platform notes are the seats' own; confidence levels are theirs, where they gave them.

1. **Role and state.** Announced as the floor's referent would announce them, and localized.
   - **Never override the platform's default state strings.** A custom string makes localization our job (Data).
   - **Never a mimic**: no control that looks native and carries different semantics.
   - Sources: Lina 1–2; Leonardo 1, 7.
2. **Name and description.**
   - The visible label is the name, as one combined element.
   - No usage hint the screen reader already speaks (Data (a), from the checkbox defect in § 5).
   - Source: Lina 3.
3. **Activation by every input path the platform supports.** These are screen-reader double-tap, a hardware keyboard (Tab to focus; Enter and Space to activate), Full Keyboard Access, Switch Control and Switch Access, Voice Control, and D-pad.
   - iOS Voice Control: `.accessibilityInputLabels` adds alternate names (Kenya).
   - Compose: Space under `clickable` is unverified (Data).
   - Web: Space is required (Sparky).
   - Sources: Lina 4; Leonardo 2.
4. **Focus**: one stop, with a visible indicator.
   - Web: `:focus-visible`.
   - Android: a drawn control draws its own D-pad and keyboard focus indicator (Data).
   - Sources: Lina 5; Leonardo 2.
5. **Touch target**: **the higher of the token floor and the platform minimum** (Data). For how this applies to existing components, see F-3 (ruled).
   - On Android the minimum interactive size is 48dp, which equals `tapAreaRecommended`. `tapAreaMinimum` (44) alone fails.
   - Sources: Lina 6; Leonardo 3.
6. **User accessibility and display settings, per platform.**
   - **iOS** (Kenya (a)2–4):
     - Dynamic Type means the label reflows and the row stacks at accessibility sizes. The control does not scale; UISwitch does not.
     - Reduce Motion.
     - Reduce Transparency, `accessibilityReduceTransparency`.
     - Increase Contrast, `colorSchemeContrast == .increased`. It doubles the contrast contexts; see F-3.
     - Bold Text.
     - Button Shapes, `accessibilityShowButtonShapes`.
     - On/Off Labels. A drawn switch reads `UIAccessibility.isOnOffSwitchLabelsEnabled` and observes its change notification; there is no SwiftUI environment value (medium confidence).
     - Large Content Viewer, `.accessibilityShowsLargeContentViewer`, for controls that do not scale with text.
   - **Android** (Data (a)):
     - Font scale, nonlinear up to 200% on API 34+, so the row reflows.
     - Remove animations, and the animator duration scale.
     - High-contrast text.
     - Bold text, `fontWeightAdjustment` (API 31+).
     - Display size.
     - Possibly the API 34 system contrast level (moderate confidence).
     - Android has no forced-colors equivalent.
   - **Web** (Sparky (a)):
     - Text scale, browser zoom to 400% and reflow (WCAG 1.4.10), and text-spacing overrides (1.4.12).
     - `prefers-reduced-motion`.
     - `prefers-contrast`, using values from the current spec.
     - **Forced colors, named explicitly.** A drawn thumb painted with `background-color` disappears, because backgrounds are forced to Canvas. It needs a system-color border or `forced-color-adjust` handling. Web-Authoring-Standards Hard Rule 6 already requires this.
   - Sources: Lina 7, 9; Leonardo 2.
7. **Right-to-left mirroring, written in leading and trailing terms.**
   - SwiftUI: `.offset(x:)` and hand-computed thumb positions do not flip (Kenya).
   - Compose: Canvas, `drawBehind` and `absoluteOffset` do not mirror; `Modifier.offset` does (Data).
   - Web: logical insets or `:dir(rtl)` (Sparky).
   - Sources: Lina 8; Leonardo 2.
8. **The feedback the native control gave.**
   - iOS haptics reproduced with `.sensoryFeedback`, which honours the System Haptics setting (Kenya, medium confidence).
   - Compose M3 `Switch` gives no haptic (Data, moderate confidence), so a haptic on Android is a design choice, not an obligation.
   - Pressed, hover and state-layer feedback.
   - Sources: Lina 10–11.
9. **Floors that system controls gave free.**
   - The 3:1 non-text contrast floor in every theme context (see F-3).
   - **State never carried by color alone**, WCAG 1.4.1. This is unconditional, so it moved here from item 6 (Sparky).
   - The Contract Rule's per-platform tests.
   - Source: Leonardo 8.
10. **Interaction, divided by the F-2 ruling.**
    - **Interaction the platform owns is floor** (§ 1.3): back gestures, scroll physics, text selection, keyboard and IME behavior.
    - **So are the platform services the native control took part in** (Sparky): autofill and password managers, form participation and restoration, find-in-page.
    - **Component-local interaction is a design choice.** Examples are thumb drag, whether the row or label toggles, and Enter on a switch. The spec records each choice and its reason.
    - Sources: Leonardo 4; the F-2 ruling.
11. **System surfaces and structural idioms are never replaced** (§ 1.4).
    - The most common iOS failure is hiding the nav bar to draw a custom back button. That kills the interactive edge-swipe-back gesture (Kenya (a)8).
    - Sources: Leonardo 5–6.

## 4. What it does NOT change

- **The decision framework's "it depends" stays.** This ballot names the design axis. It picks no component's answer.
- **The 2026-10-18 accessibility punt is a separate decision.** On P-6 and P-13, Peter deferred the *system-wide* contrast fix to a later redesign. This ballot neither reopens nor relaxes it. F-3 (ruled, § 8) is where the two meet: the floor binds new controls, and existing controls when they are modified.
- **Forced colors is not part of the punt** (Sparky (d)). It is a ratified Hard Rule that has not been carried out. It stays outside F-3 and goes to Lina's defect record.
- **Build-time separation, the Rosetta pipeline and the behavioral contracts are unchanged.**

## 5. Already true: the catalog departs today, and drifts

**Precedents** (Lina (d)). The law describes the catalog as it already is:
- Nav-SegmentedChoice-Base: drawn on iOS.
- Input-Text-Base: a Material float label, drawn on iOS; `BasicTextField` on Android.
- Input-Checkbox-Base and Input-Radio-Base: drawn on iOS and Android.
- Nav-TabBar-Base and Progress-Bar-Base: no `TabView` or `ProgressView` on iOS.

**Cautionary instances, one per platform.**

**iOS.** `InputCheckboxBase.ios.swift:306` reads `.accessibilityAddTraits(.isButton)`; the line is verified. **This is probable drift, and it shows the rule had no referent where no native control exists** (Kenya (a)1):
- `.isButton` plus a value was the standard pattern before iOS 17's `.isToggle`.
- The checkbox has three states, and `.isToggle` is binary.
- The fix is § 1.2's trait-pattern rule, not a verdict on this line.

**Android** (Data (a); lines verified 2026-10-18):
- `InputCheckboxBase.android.kt` L429–433 hard-codes English `stateDescription` ("checked", "unchecked", "partially checked"). That overrides TalkBack's localized default strings — item 1.
- L445–449 and L482 append "Double tap to check" to `contentDescription`. TalkBack speaks the hint twice — item 2.
- L465 sizes to `tapAreaMinimum`, 44dp, which is below 48dp — item 5.
- No focus handling was found — item 4.
- Data counts seven components on the deprecated `rememberRipple`. A grep on 2026-10-18 found four component sources: Input-Radio-Base, Input-Checkbox-Base, Button-Icon and Button-VerticalList-Item. The routed record re-counts.

**Web** (Sparky V1, V2):
- `forced-colors` appears **0** times in `src/` (confirmed), despite Hard Rule 6.
- All **34** `prefers-contrast` queries use `high` (confirmed). That is an obsolete draft value, so the queries are very likely dead. Sparky's confidence comes from training data, and this needs a real browser check before anyone acts.

**Surfaced, routed.** These are defects in Lina's components. They route to **Lina's own record and change**, not this unit, and are named in § 11. This ballot cites them as evidence only.

## 6. Edit sites (applied only after RATIFIED)

Each site uses its owner's text. **Sites 1, 4, 6, 7 and 8 carry the F-2 ruling**: design covers control behavior, and the floor names what it never chooses. Kenya, Data and Sparky each said all five must carry the same answer. Where a seat's wording was written before the ruling, it was re-proposed at R4. **Each owner has now confirmed or supplied its own wording** (their R3 entries in § 10), and the owners' words are what appear below.

| # | Site | Owner | Merge rule | Signing cost |
|---|---|---|---|---|
| 1 | `governance/cross-platform-vs-platform-specific-decision-framework.md` L23, "Key Principle". Replaced by Lina's (a) text, amended once for Spec 128 (she confirmed), plus her two F-2 sentences and one bullet change (her R3). See 6.1. | Lina | `governance/**`, so Peter merges | None. Leonardo loads it as an ambient file, and the baseline lists ids, not hashes. |
| 2 | Same doc, Decision Criteria Q2 (L103), Q3 (L113) and Q4 (L126). See 6.2. | Lina | Peter merges | None |
| 3 | Same doc, § "Documentation Requirements" (L313, L317). Made symmetric. See 6.3. | Lina | Peter merges | None |
| 4 | `design-language/design-philosophy.yaml`: Leonardo's named rule, after "The Break-Glass Rule" (L49–51), before `guidance:` (L53). This file is what `get_design_philosophy` and `get_design_rules` serve (`application-mcp-server/src/index.ts` L754, L814). See 6.4. | Peter (author, Spec 107 Req 8); Leonardo (consumer) | Peter merges. It ships in the package (`package.json` `files`: `design-language/`). | None |
| 5 | ~~`preserved-knowledge/true-native-architecture-concepts.md` addendum~~ **DROPPED** (Peter, 2026-10-18, relayed; § 8). The directory is historical context. See 6.5 for the follow-up. | — | — | — |
| 6 | `canonical/agents/leonardo.md` L439 and L441, in Leonardo's wording (his R3). See 6.6. | Leonardo | `canonical/**`, so Peter merges, then regenerate | Items `consistent-not-identical` (`leonardo.yaml` L399) and `native-2` (L407–410) move. Leonardo re-confirms the unit at `confirmations/leonardo.md` L197–201, with **a fresh ruling** on his sentence "accepting a non-native idiom on one platform violates them". |
| 7 | `canonical/agents/kenya.md` L340 and `kenya.yaml` L247–250 (`implement-3`). The R4 wording, which Kenya accepted (her R3). See 6.7. | Kenya | Peter merges, then regenerate | Kenya re-confirms `#step-3-implement` (`confirmations/kenya.md` L116–120). Kenya's straggler check of L258, L319, L366, L370 and L450 found nothing to edit. |
| 8a | `canonical/agents/data.md` L343 and `data.yaml` L251–254 (`implement-3`). Data's own wording (his R3). See 6.7. | Data | Peter merges, then regenerate | Data re-confirms `#step-3-implement` (`confirmations/data.md` L120). |
| 8b | `canonical/agents/data.md` L451 and `data.yaml` L527–530 (`native-1`), "Material 3 as base". Data's straggler, the counterpart of site 6's "Material 3 base". See 6.8. | Data | Peter merges, then regenerate | Data re-confirms `#android-specific-guidance:preamble` (`confirmations/data.md` L242–248). |
| 9 | `governance/Component-Development-Guide.md` L723: a scoping note on SF Symbols. See 6.9. | Lina | Peter merges | None |
| 10 | `.kiro/specs/130-input-switch-base/design-outline.md` § "2. Settled decisions": one row. See 6.10. | Thurgood | Merged with the R1 unit | None |

**Total signing cost: four C1 re-confirmations.** Leonardo has one, with a fresh ruling. Kenya has one. Data has two, both plain re-signs, because his 2026-09-29 rulings contain no sentence that contradicts this law. The owning seats make them in the execution PR. Under the signing-act chain's M1 they need no grant. The execution PR regenerates `canonical/_consumer-output/**` and the agent outputs, and `122-diff-guard` must be green.

**6.1, Key Principle.** The current text at L23:
> **Key Principle**: Neither cross-platform consistency nor platform-specific idioms are always correct. The right choice depends on context, user expectations, and design system goals.

The replacement is Lina's (a), with **one amendment**: in her first bullet, "the platform's own UI framework" becomes "the platform's own rendering and accessibility stack" (Sparky (a)1, Spec 128). **Lina confirmed the amendment** (read-only, 2026-10-18, verbatim): "ACCEPT. I take 'the platform's own rendering and accessibility stack are not a choice' as my text for edit site 1. … The new phrase admits React (DOM plus ARIA) and React Native (native views plus native accessibility APIs), which is what Spec 128 needs. It still excludes self-drawn surfaces such as canvas or Flutter-style rendering, which is the intent." **F-2 is ruled, and the text for it is Lina's own (her R3, verbatim).** She declined R4's proposed sentence. Her two sentences sit after the bullets. In her third bullet, "within the limits above" becomes "within the limits of this principle", so that the bullet also covers those two sentences.
> **Key Principle**: True Native Development does not mean True Native Design. Three axes, two of them fixed:
> - **Implementation is always native.** Build-time platform separation and the platform's own rendering and accessibility stack are not a choice.
> - **Accessibility semantics are always platform-correct.** Role, state, name, activation, focus and announcements behave exactly as the platform's native control would. That is not a choice either.
> - **Design is a choice.** Look, and interaction conventions within the limits of this principle, may follow the platform's native idiom or depart from it to serve the product's users and brand. Neither is always correct; the right choice depends on context, user expectations and design system goals.
>
> A departure in design never licenses a departure in semantics.
>
> Two more limits are not a choice: interaction the platform owns (back and history, scrolling, text selection, keyboard and IME, and the platform services a native control takes part in) is never replaced, and system surfaces and structural idioms are never replaced, though their contents may be styled. Every visual and behavioral choice is recorded with its reason.

**6.2, Decision Criteria** (Lina's consequential edits):
- L103: `- **Strong platform convention**: Use platform idiom` becomes `- **Strong platform convention**: Consider platform idiom`
- L113: `- **Superior platform UX**: Use platform idiom` becomes `- **Superior platform UX**: Consider platform idiom`
- After Q3's block, add: `Accessibility semantics stay native whatever is chosen for design.`
- L126: `- **No**: Pause and ask for guidance` becomes `- **No**: Record the departure`. The example line stays.

**6.3, Documentation Requirements** (Leonardo (d)3, widened by the F-2 ruling to cover behavioral choices):
- L313: `**When using platform-specific idioms**, document in component README:` becomes `**Every component documents its visual and behavioral choices** — native idiom or departure — in its README:`
- L317: `1. **Rationale**: Why platform idiom chosen over cross-platform pattern` becomes `1. **Rationale**: Why each visual and behavioral choice (native idiom or departure) was made`

**6.4, the design-philosophy rule.** The constraint is Leonardo's version amended for F-2 (his R2 (e)), verbatim. He amended only the constraint, so the rationale stays as in his R1 (c).
```yaml
  - name: "The Native-Behavior Rule"
    constraint: "True Native is how DesignerPunk is built, not a requirement on how it looks or behaves: design may follow a platform's idiom or part from it for a product's user needs or brand, carried by tokens and themes, with each choice recorded. Accessibility semantics, interaction the platform owns, and system surfaces never part."
    rationale: "Native controls cap theming; native behavior is what users and assistive technology rely on."
```

**6.5: DROPPED.** Peter (relayed; quoted in § 8) describes the `preserved-knowledge/` directory as historical context: the ideas DesignerPunk is built from, not current reference material. This ballot therefore does not edit it.
- **Follow-up, not this ballot.** Three live docs still point to `preserved-knowledge/true-native-architecture-concepts.md` as current architectural guidance:
  - `.kiro/steering/core-goals.md` L33
  - `governance/Component-Development-Guide.md` L31
  - `governance/cross-platform-vs-platform-specific-decision-framework.md` L351
- **Owner**: Thurgood (Civitas content consistency).
- **Cost**: the Core Goals edit needs its own ballot and an identity-doc re-sign. The two governance pointers are in Lina's docs, so she is consulted.

**6.6, Leonardo's charter** (his R3). His L439 adds floor part 2, accessibility semantics, which he calls "the part a drawn control is most likely to lose".
- L439: `Each platform should feel native:` becomes `Each platform should feel native in structure, in accessibility semantics, and in the interaction the platform owns:`
- L441: `(Scaffold, Material 3 base, system bars)` becomes `(Scaffold, Material 3 structure, system bars)`. Leonardo accepted it (his R3).

**6.7, Kenya's and Data's step lines.** Re-proposed by Thurgood at R4 from their R1 wordings to follow the F-2 ruling, then confirmed at R3:
- **Kenya** accepted as drafted: "The tail's 'feel native in structure' is enough because the opening clause already holds 'the interaction iOS owns' to the § 1.3 floor."
- **Data** supplied his own wording, which adds text selection and keyboard.
- **What carries over from R1**: their shape, which qualifies the leading clause and not only the tail.
- **What changes**: Kenya (c) warned that "behavioral" and "gestures" would contradict site 1 under Lina's reading, and that reading is now ruled. So behavior is narrowed to what the platform owns.
- Kenya, L340 and `implement-3`: `Follow iOS structural idioms and the interaction iOS owns (navigation, system surfaces, system gestures, accessibility) — the screen should feel native in structure; its look and component behavior follow the spec, which may choose iOS convention or depart from it`
- Data, L343 and `implement-3` (his R3, verbatim): `Follow Android structural idioms and the interaction Android owns (system surfaces, back, scroll, text selection, keyboard and IME, accessibility) — the screen should feel native in structure; its look and component behavior follow the spec's design choices.`
- Each `label` is regenerated.

**6.8, Data's Android guidance** (L451 and `native-1`, his wording; accepted as written at his R3): `Jetpack Compose composables with Material 3 as structural base (Scaffold, system bars); visuals follow DesignerPunk tokens and the spec`

**6.9, the Component Development Guide scoping note**, after the example's code block (ends L725):
> *Scope note (ballot `2026-10-18-true-native-development-is-not-true-native-design`): "platform-native visual consistency" is this example's reason, not a requirement — a component's icons may depart from the platform's native set when its design calls for it.*

**6.10, the Spec 130 settled row:**

| Decision | Source |
|---|---|
| True Native Development is not True Native Design, with the behavioral floor. Native idiom does not bind the switch's look or component behavior, so drawn or token-defined geometry is admissible on every platform. Semantics and platform-owned interaction are never drawn. | Ballot `2026-10-18-true-native-development-is-not-true-native-design` |

**Straggler sweep**, run 2026-10-18 over `governance`, `.kiro/steering`, `design-language` and `canonical`:
- R1's sweep did not grep the charters. Leonardo found sites 6–8a, and Data found 8b.
- Kenya's check found nothing further in Kenya's charter. Data keeps L366, L440 and L471, because they describe knowledge or fallback order, not a mandate.
- **Candidates for Lina's read, not proposed**: the framework's motion § "When to Pause and Ask" (L165–170), "Platform idiom conflicts with design system consistency" and "Animation is critical to brand expression".
- Core Goals is consistent and is not edited by this ballot. Its `preserved-knowledge` pointer is the 6.5 follow-up.
- The application PR re-runs the sweep, including over `canonical/agents/**`.

## 7. Consequences for Spec 130 P-1

Native look stops being the presumed default. (a), native look, stays legitimate, and (b) and (c) are admissible. Lina's lean has moved: "draw the visuals on all three platforms, but never draw the semantics." Under that lean, the platform seats read it like this. **Nothing is picked: P-1 is ruled at R1.**

**iOS** (Kenya (b), knowledge-grade: there is no Xcode target):
- `Toggle` with a custom `ToggleStyle`.
- Implicit preservation of the toggle trait is **not reliable**. Spec 130 should make `.accessibilityRepresentation { Toggle(configuration) }` plus `.isToggle` a **contract requirement**.
- Expected announcement: "‹label›, switch button, on/off, double-tap to toggle setting" (medium-high confidence). On-device confirmation is owed.
- Lost under a custom style:
  - The UISwitch haptic (high confidence). Reproduce it with `.sensoryFeedback(…, trigger: configuration.isOn)`, and settle on a device which feedback matches.
  - Thumb drag. Rebuild it with a `DragGesture` or give it up.
  - The On/Off Labels glyphs, unless the setting is read (§ 3 item 6).
- **Under F-1 (iv), which is pending** (Kenya R2 (c)): one drawn `ToggleStyle` and **no public style parameter**. SwiftUI's built-in `.switch` style survives only as a **test oracle** that the drawn style's VoiceOver output is compared against. It is not API. Kenya's R1 "explicit style parameter" was written for (i).

**Android** (Data (b), high confidence on semantics):
- `Modifier.toggleable(…, role = Role.Switch)` on the row supplies the role, localized On/Off, activation and focusability, provided `stateDescription` and `contentDescription` are **not** overridden.
- A drawn switch rebuilds:
  - The row's minimum height.
  - The state layer via `ripple(...)`, not `rememberRipple`.
  - An explicit focus indicator.
  - Motion on motion tokens. Watch for animator scale being applied twice.
  - RTL-safe thumb placement.
- Compose M3 `Switch` has no thumb drag to rebuild (moderate confidence).

**Web** (Sparky (a)):
- `<button type="button" role="switch" aria-checked>`, as the outline already names. Sparky's reasons:
  - Space and Enter both activate it natively.
  - One element owns the focus ring, the target size and the forced-colors styling.
  - It is not form-associated, which fits P-3(a).
  - State styling keys on `[aria-checked="true"]`.
- The cost that survives: `aria-checked` has to be kept in sync from script. A unit test pins it.

**Geometry** is 56×32 everywhere under Lina's lean, so C1–C3 apply on all three platforms. Under F-1 (iv) the switch's spec would record `rendering: designed` on every platform. On web it must: there is no native switch, and `native` would be invalid.

**P-2** is a component decision under the F-2 ruling, so it goes to Spec 130 R1. Kenya R2 (e) recommends that the whole row toggles on every platform. Verify that taps cancel when the list scrolls.

## 8. Rulings (Peter)

*Peter answered in chat on 2026-10-18, and the orchestrator relayed it. Everything below is recorded as relayed, **not as ratified**. Ratification is the record-first act in `.kiro/docs/ballots/README.md`, which here is Peter's merge of the PR carrying it.*

- **Ratify / modify / reject:** *(open)*

- **F-1, what DesignerPunk's own components ship when no design choice is made. Option (iv) is proposed and PENDING Peter's approval.**
  - **Peter** (relayed, verbatim): *"Though well considered, I'm unsure about that framing. The wording seems strange to have a default of 'our look' and yet have an opt-out of the native style. Doesn't having to opt-in to a default defeat the purpose of default? I could be misunderstanding, so correct me if my thinking is flawed. I would put it to the agents for consideration before blindly approving, but maybe 'our look by default; but in the absence of a specified design, fallback to native controls'."*
  - **The ballot's own defect.** All five seats ACCEPT (iv) over (i). All five also say his critique of (i) slightly misread it, and that the misreading came from the ballot's R3 wording, not from his reasoning. Lina: *"Under (i), our look ships when the consumer chooses nothing, so nobody opts in to the default. The "opt-out" means opting out of our look and into native. "Native-look opt-out" reads as the reverse, so that's a defect in the ballot's text, not in his reasoning."*
  - **(iv)**: *"our look by default; in the absence of a specified design, fall back to native controls."* This is an **authoring-time rule**, not a consumer switch. There is one rendering path per component per platform, and **no opt-out API**.
  - **The test, which converged across the five reads:**
    1. **An explicit per-platform field**, `rendering: designed | native`, in the component's spec or metadata. It is never inferred from missing tokens (Data).
    2. **`designed` means geometry and every state are specified on that platform** (Data). Leonardo puts it as "drawn token geometry and color tokens for every state". A partial design is a fork for Peter (Data). It never falls back silently; Kenya calls the fallback "all-or-nothing per component and platform".
    3. **A spec that is silent on a platform ships native, and the silence is a finding** (Lina). Ecosystem components cannot ship without a spec. A product one-off with no spec at all falls back to native (Lina).
    4. **`native` is invalid where the platform has no native control.** That covers the iOS checkbox, radio and float label, and the web switch, segmented control, tabs and tab bar. On such a widget, a silent spec **blocks**; it does not fall back (Sparky). Falling back to a checkbox for a switch "is exactly the placeholder's role bug" (Sparky).
    5. **A web `native` entry declares `color-scheme` and `accent-color`** (Sparky).
    6. **Android `native` means the stock Material 3 control.** It shows M3's baseline purple unless the DesignerPunk theme is mapped into `MaterialTheme` (Data).
    7. **The choice is made per component, never per screen.** Screen specs cite the result (Leonardo).
  - **Data's wrapper-and-slot** stays as a component convention, not as an F-1 condition (Data; Lina). Semantics stay where they are when a component moves from native to designed.
  - **Counters that survive:**
    - A consumer who wants native look on a control DesignerPunk designed has no route except forking it (all five).
    - What ships depends on how far authoring got. A late design ships native, and a design that arrives later is a visual breaking change (Data).
    - Partial styling, such as tint only, has no clear status. Leaving a control undesigned becomes the cheap path, and one screen can mix drawn and native controls (Leonardo).
    - R-3 lands on every iOS consumer (Kenya; Lina).
  - **Superseded by (iv), pending Peter's approval.** These stay for the record; R3's analysis of them is in § 10:
    - (i) Our look by default, with a native-look opt-out. This is the defective R3 wording.
    - (ii) Native look by default, with a brand opt-in.
    - (iii) Silent: each component decides.
  - **Approval of (iv):** *(open)*

- **F-2: RULED (relayed). "Design" covers control behavior.**
  - **Peter** (verbatim): *"'Design' also covers control behavior, but sometimes the design might choose a platform convention – and sometimes it might not. That's why it's so critical to be thorough and developing component specs."*
  - **Reading.** Lina's broad reading, with two parts attached:
    - **The floor (§ 1) lists what design never chooses**: accessibility semantics; interaction the platform owns (back, scroll, text selection, keyboard and IME); and system surfaces and structural idioms.
    - **Documentation is symmetric**: every spec records each behavioral choice and its reason (site 3).
  - **Sites.** Site 4 adopts Leonardo's amended Native-Behavior Rule (his R2 (e)). Sites 1, 6, 7 and 8 follow this reading (§ 6).
  - **P-2** (whole-row tap) becomes a component decision under this ruling. Kenya's recommendation, that the whole row toggles on every platform, goes to Spec 130 R1, not to this ballot.
  - R3's three formulations stay on record in § 10.

- **F-3: RULED (relayed). The floor binds new controls, and existing controls when they are modified.**
  - **Peter** (verbatim): *"Let's apply it to: 1. all new controls and 2. existing controls when they are being modified. That is to say: everything from here-on-out will meet the standard, and grandfathered components must align when we work to update them."*
  - **What "modified" means.** The orchestrator flagged the need for a definition, and Data confirmed this one: a change to the component's **rendering or contracts**, not to its metadata or docs. Retiring the settings placeholder edits `settings.yaml`, not Input-Checkbox-Base, so it does not modify the checkbox.
  - **What the ruling covers**: **§ 3 item 9** (contrast) **and § 3 item 5** (touch target). The 44dp checkbox stays until its rendering or contracts change. Data: "44dp meets WCAG; 48dp is Android platform guidance."
  - **Forced colors stays outside the ruling** (Sparky). It is a ratified Hard Rule that was not carried out, and it goes to Lina's defect record (§ 11).
  - **Not answered by the ruling: does "every theme context" include iOS Increase Contrast?** That would double the contexts to eight on iOS (Kenya R1 (a)4). This is carried to Spec 130 R1 for the switch's own contexts. It does not block ratification.

- **Edit site 5: DROPPED (relayed).**
  - **Peter** (verbatim): *"Well... no one. The preserved-knowledge directory is context and lessons learned from the previously failed attempts at building what is now DesignerPunk. They're the ideas DP is built from, so they're historical context rather than anything that we would point to today as reference material."*
  - The follow-up is at § 6.5.

## 9. Counter-arguments (after fold-back)

**Folded in:**
- **Forfeiting free native behavior** (Leonardo (d)1; Lina (e); Kenya (b)). The floor (§ 1) and the categories (§ 3) make semantics law. The iOS representation contract (§ 7) and Android's no-override rule are the concrete fixes.
- **iOS consumers expect the system toggle** (Leonardo (d)2). The law permits departure and never mandates it. `product-dp.md:77`, "Reinventing standard affordances for flavor", still governs. The rest becomes F-1.
- **Unrecorded drawn-by-default choices.** Documentation is now symmetric (site 3).
- **Load on the platform reviewers.** The three seats are now reviewers of record.
- **No native look on Android or web** (Data (e); Sparky (c)). This lowers R-1's staleness on those platforms, and it reshaped F-1.
- **An opt-out API that lasts forever, two geometries, and an unused path that rots** (Data R1 (e)). F-1 (iv) removes all three: one rendering path, no opt-out.

**What survives:**
- **(R-1) Owned accessibility is recurring work, and it goes stale.** Each drawn control is accessibility code DesignerPunk writes and tests on each platform it draws. Native controls pick up OS redesigns and new settings for free; drawn ones only "when we notice" (Lina (e)). Leonardo: "a permanent maintenance and staleness cost. It is a real cost, not a reason to reject the law."
- **(R-2) The check that would catch drift does not exist, on any platform.** "The law still licenses departures that today we can only check by reading code" (Lina (e)). Per platform:
  - **iOS** (Kenya (f)): no VoiceOver, haptic or On/Off Labels claim can be verified in this repo. There is no Xcode target. The checkbox shows that reading code misses things.
  - **Android** (Data (f)): the gap has already happened. The precedent component breaks items 1, 2 and 5 and nobody noticed. Compose semantics assertions (`assertIsOn`, a role matcher, `assertHeightIsAtLeast`) would close Android's half, once the harness exists.
  - **Web** (Sparky (e)): even a written Hard Rule was not carried out (V1, V2). Sparky's class option, *not vetted with Lina*: a static CSS check in the web tests, requiring a `forced-colors` block on every interactive component and rejecting unknown media-feature values. Its residual: existence is not correctness, and jsdom cannot evaluate media queries. Sparky R2 (d): the check belongs on Lina's defect record, not in this ballot's execution.
  - The harness is chartered and unbuilt: `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`. Its § 3 triggers, whichever fires first:
    1. The first product spec kickoff.
    2. One generator-emits-invalid-platform-code incident.
    3. The 125-B post-campaign queue review.
  - This ballot neither fires nor evaluates that charter. Whether evaluation is owed now is a question for the next charter walk.
- **(R-3) Drawn controls go visually stale inside native chrome** (Kenya (f)). The floor keeps the nav bars, sheets, keyboards and grouped lists native, and Apple redesigns them every year (Liquid Glass now). The drawn controls sitting inside them do not follow. That makes visual coherence a recurring cost at every iOS release. It is distinct from R-1, which is about accessibility going stale.

## 10. Review rounds

#### [LEONARDO R1] — 2026-10-18 — read-only consult, entered verbatim
*Source: Leonardo — read-only consult on "True Native Development ≠ True Native Design" (2026-10-18) — VERBATIM. The headings are demoted to fit this document; the words are unchanged.*

Read: the decision framework, `design-language/design-philosophy.yaml` (what `get_design_philosophy` and `get_design_rules` serve), `preserved-knowledge/true-native-architecture-concepts.md`, outline § 11, my canonical prompt and its consumer confirmations, the iOS and Android `Input-Checkbox-Base` source, Impeccable `product-dp.md`, the 2026-10-12 Settings ledger.

##### (a) Does the sentence hold, and what changes for me
It holds, with one clarification. "Native design" has to mean the native *visual* idiom (how a control looks). It cannot mean native *interaction, accessibility semantics or system surfaces*. Two things in the wording are right: it permits departure rather than requiring it ("not necessarily"), and it ties departure to a reason (user needs, branding).
The strongest point in its favour is one the sentence leaves out. Native controls limit what a theme can reach. On iOS the system Toggle draws its own off track in system colors, so a product's theme overrides never reach it. A product team can only rebrand a control the system draws itself.
What changes in my specs:
- The control is drawn the same way everywhere. A token-drawn control becomes an admissible default on all three platforms rather than a recorded deviation. Visual parity (geometry, color, motion tokens) becomes a review criterion. Interaction and accessibility parity stay required exactly as now.
- Settings rows: the structure stays native: the iOS grouped inset list (my anchor), `NavigationStack`, `Scaffold`. Only the switch's appearance becomes ours.
- The Restrained direction becomes fully expressible. "Cyan only on the active switch" was only partly controllable under P-1(a): the off state is system gray, and native tinting controls only the on color. Under this law the whole switch, off track included, is token-carried.
- My review checklist changes. The item "platform-specific deviations intentional and documented" splits in two. Visual departures from native need a reason. Behavioral departures from native are not allowed.

##### (b) What it must explicitly NOT loosen
1. Accessibility semantics. The native role, trait and state must be announced. For a switch: on iOS the toggle trait (or a custom `ToggleStyle` keeping `Toggle` semantics), on Android `Role.Switch` plus toggleable state, on web `role="switch"` plus `aria-checked`. Evidence of what drawn controls lose: iOS `Input-Checkbox-Base` uses `.accessibilityAddTraits(.isButton)` (`src/components/core/Input-Checkbox-Base/platforms/ios/InputCheckboxBase.ios.swift:306`), so it announces as a button.
2. User accessibility settings must still work. Dynamic Type and font scale, Reduce Motion, Increase Contrast, Bold Text, Differentiate Without Color (state not carried by color alone), Voice Control and Switch Control naming, Full Keyboard Access, focus visibility, right-to-left mirroring.
3. Touch targets. `tapAreaMinimum` and `tapAreaRecommended` floors.
4. Interaction conventions users rely on. Thumb drag and haptics on the iOS toggle, back gestures, scroll physics, text selection, keyboard and IME behavior.
5. System-level surfaces. Share sheet, keyboard, permission prompts, system alerts, sheet presentation mechanics (detents, swipe to dismiss), status and navigation bars, safe areas, context menus. We may style their *contents*, never replace them.
6. Navigation and structural idioms. The `NavigationStack` / `Scaffold` / system-bars structure stays native.
7. No "looks native, behaves differently" controls. A drawn control must not mimic a native control while carrying different semantics.
8. Floors that system controls give for free. A departure takes on the 3:1 non-text contrast floor in all four theme contexts, and the Contract Rule's per-platform tests.

##### (c) Text I'd accept verbatim
I prefer a named rule, because rules constrain selection and can be retrieved by name:
- Name: "The Native-Behavior Rule"
- Constraint: "True Native is how DesignerPunk is built, not a requirement on how it looks: visual design may part from platform idiom when a product's user needs or brand require it, carried by tokens and themes. Behavior never parts — accessibility semantics, input and gesture conventions, and system surfaces remain each platform's own."
- Rationale: "Native controls cap theming; native behavior is what users and assistive technology rely on."
If Thurgood prefers a characteristic instead of a rule, the first sentence of the constraint works on its own.

##### (d) Strongest counter-arguments, and what survives
1. Forfeiting free native behavior and OS evolution (the strongest one). Native controls inherit OS redesigns (iOS's recent toggle restyle) and accessibility behavior at no cost. Drawn controls freeze, drift and lag. The checkbox `.isButton` trait shows the loss is real here, not hypothetical. Folded in: (b) as a tested contract, and P-1(b), whose iOS custom `ToggleStyle` keeps `Toggle` semantics. That is the cheapest way to honor both. Survives: a permanent maintenance and staleness cost. It is a real cost, not a reason to reject the law.
2. iOS consumers expect the system toggle, and drawn controls read as a web app. Folded in: the law permits, it does not mandate. `product-dp.md:77` ("Reinventing standard affordances for flavor") still governs, so branding is a valid reason and flavor is not. Survives, and it is a fork for Peter, not me: `Input-Switch-Base` makes this choice for every consumer. A product that wants the system look gets it only if the component offers a native rendering option. Options: P-1(b) or (c) with no native option, or a native escape hatch.
3. Recording reasons. The framework's § "Documentation Requirements" only asks for a reason when choosing a platform idiom. Under this law, drawn-by-default could go unrecorded. Folded in: make the requirement symmetric, so every component records its visual choice and the reason either way. Survives: a little authoring overhead.
Verdict: the law survives as a permission with (b) as its floor. It does not survive if worded as "native idiom is not binding" with no behavioral floor.

##### (e) Existing text that supports or contradicts it
Already says it, in part: the framework's "Key Principle" is already permissive. Its Example 3 (loading indicators): "Brand-critical contexts: Use cross-platform design system spinner." Its Criterion 4 → "Pause and ask… Platform color scheme conflicts with brand colors." This law answers that question, so the line should be updated. Precedent: both iOS and Android `Input-Checkbox-Base` are already drawn (iOS is weak precedent, no native checkbox).
Contradicts it, and these sites are NOT in Thurgood's three-site list:
- `canonical/agents/leonardo.md:440` § "What Consistent Means in True Native": "Each platform should feel native", and "Android uses Compose idioms (Scaffold, **Material 3 base**…)". "Material 3 base" implies M3 visuals.
- My confirmation of that section, `canonical/profiles/consumer/confirmations/leonardo.md:201` (2026-09-29): "accepting a non-native idiom on one platform violates them." Pinned to a canonical hash, so editing the section means I re-confirm it.
- `canonical/agents/kenya.md:340` and `canonical/agents/data.md:343`: "the screen should feel native". Their operative-sets carry the same line (`canonical/operative-sets/kenya.yaml:250`, `data.yaml:254`).
- The ballot should either edit these to "feel native in structure and behavior", or state that they mean exactly that. Left alone, platform agents will keep reading "feel native" as a visual requirement.
Ambiguous: `preserved-knowledge/true-native-architecture-concepts.md:429` "maintain native performance and user experience" — "user experience" is the word the addendum should pin down; the doc says nothing about visual appearance. `governance/Component-Development-Guide.md:723`: SF Symbols for "platform-native visual consistency" — a mild tension for icons, worth a scoping note.
Related: `.kiro/issues/archive/2026-10-12-leonardo-settings-call-ledger.md:137` (Restrained direction assumed control of the switch color, which only this law makes fully true on iOS); P-10 (filled vs outlined off track) is the visual decision this law opens up on iOS.

#### [LINA R1] — 2026-10-18 — read-only consult, entered verbatim
*Source: Lina — read-only consult on the True-Native-Design ballot, Spec 130 P-1 (2026-10-18) — VERBATIM. The headings are demoted to fit this document; the words are unchanged.*

Read: the framework doc (line 23 is the Key Principle), `preserved-knowledge/true-native-architecture-concepts.md`, `design-language/design-philosophy.yaml`, the 130 outline §§ 5, 6.2 and 11, my own inbound § 8, Thurgood's record of the rulings (feedback.md:24–28); spot-read iOS and Android component sources for (c) and (d).

##### (a) Key Principle: replacement text I would accept
> **Key Principle**: True Native Development does not mean True Native Design. Three axes, two of them fixed:
> - **Implementation is always native.** Build-time platform separation and the platform's own UI framework are not a choice.
> - **Accessibility semantics are always platform-correct.** Role, state, name, activation, focus and announcements behave exactly as the platform's native control would. That is not a choice either.
> - **Design is a choice.** Look, and interaction conventions within the limits above, may follow the platform's native idiom or depart from it to serve the product's users and brand. Neither is always correct; the right choice depends on context, user expectations and design system goals.
>
> A departure in design never licenses a departure in semantics.

Two consequential edits the ballot must name. Otherwise my doc contradicts itself:
- Decision Criteria Q2/Q3. "Strong platform convention: Use platform idiom" and "Superior platform UX: Use platform idiom" become "consider". Add one line: semantics stay native whatever is chosen for design.
- Q4. "Platform color scheme conflicts with brand colors → Pause and ask for guidance." Under the new law brand may win on the design axis, so this becomes "record the departure". It no longer needs a pause.
The ballot also has to say whether "design" covers interaction conventions or only visuals. P-2 (iOS label pressability) turns on that answer. My wording above includes interaction.

##### (b) P-1: what the principle changes
The principle does not choose (c). It only removes native look as a constraint. It does remove the reason my (b) used M3 geometry on Android: 52×32 was a nativeness concession and nothing else. So my lean changes to: draw the visuals on all three platforms, but never draw the semantics.
- Web: a drawn `<button role="switch">` (unchanged).
- iOS: `Toggle` with a custom `ToggleStyle`, which keeps Toggle's semantics. Kenya must verify that VoiceOver still reads "switch button, on/off" under a custom style. Unverified.
- Android: drawn track and thumb inside the row's `Modifier.toggleable(role = Role.Switch)`. The outline already puts semantics on that modifier, not on `Switch()`. So drawing on Android costs little accessibility code. `Switch()` was only buying M3 geometry, ripple and motion.
- Geometry: 56×32 everywhere. C1–C3 then apply on all three platforms, which also strengthens Ada's P-11 (b). Peter's outlined off state is the M3 pattern anyway.
Counter: Android users get a switch that looks and moves unlike every other switch on their phone, such as the M3 thumb that grows on press. We also give up free M3 updates and must rebuild the state layer, ripple and 48dp minimum-interactive sizing ourselves. On iOS, a custom style likely drops the system "On/Off Labels" glyphs and the UISwitch haptic (see c).

##### (c) What a drawn control must carry, because the native one gives it free
Law level, as categories. Each component lists its own in `contracts.yaml`; the switch list belongs in 130, not the ballot.
1. Role. `role="switch"`, iOS `.isToggle`, Android `Role.Switch`. Never `.isButton` plus a value string.
2. State. Announced as on/off, not "checked", and localized. A consumer revert updates it with no extra announcement; failure messaging is G5's job.
3. Name and description. The visible label is the name, as one combined element. Helper text is the description.
4. Activation. Web: Space required, Enter supported. iOS: VoiceOver double-tap, Full Keyboard Access, Switch Control. Android: TalkBack double-tap, D-pad and keyboard.
5. Focus. One tab stop with a visible indicator. On Android the drawn control must draw its own keyboard/D-pad focus indicator.
6. Touch target. `tapAreaRecommended`, plus Android's 48dp minimum interactive size.
7. Reduced motion. `prefers-reduced-motion`, `accessibilityReduceMotion`, and the system animator scale.
8. RTL. Thumb travel mirrors (on = trailing).
9. System display settings. Web forced-colors (system colors). iOS "On/Off Labels" and Increase Contrast (candidate; Kenya).
10. Haptics. iOS: likely reproduce with `.sensoryFeedback(.selection, trigger:)`, since UISwitch gives one. Unverified; Kenya. Android: none by default; TOGGLE_ON/OFF on API 34+ is optional (Data).
11. Pressed and hover feedback. Ripple / state layer on Android, hover on web.

##### (d) Existing departures: the principle is descriptive, not new
- Nav-SegmentedChoice-Base: iOS draws it (no `Picker(.segmented)`, its own glide easing).
- Input-Text-Base: the float label is a Material pattern, drawn on iOS. Android is built on `BasicTextField`, not `OutlinedTextField`.
- Input-Checkbox-Base and Input-Radio-Base: iOS has no native checkbox or radio at all, and Android draws both rather than using Material's.
- Nav-TabBar-Base and Progress-Bar-Base: iOS uses neither `TabView` nor `ProgressView`. That comes from a grep only.
A cautionary case from (d): the drawn iOS checkbox announces as `.isButton` (InputCheckboxBase.ios.swift:306). That is exactly the semantics drift (c) is meant to prevent.

##### (e) My surviving counter to this as law
A drawn control permanently moves the platform's accessibility work onto us. Native controls pick up new OS settings and redesigns for free; drawn ones get them only when we notice, and the repo shows we don't reliably notice (the checkbox above). The verification that would catch it does not exist yet: there is no native build or announcement harness, the one chartered 2026-09-17 is unbuilt, and Stacy has already flagged that the switch's announcement claims are unverifiable. Making departures conditional on (c) was the most I could fold in. The law still licenses departures that today we can only check by reading code.
There is also a fork the ballot should surface, not settle. Peter's wording is about product teams. Applied to ecosystem components, DesignerPunk's brand departure ships to every consumer as the default, and a consumer who wants native look has to fork the component. Options: (i) The ecosystem default departs, with an opt-out to native look. (ii) The ecosystem default is native look, with an opt-in to brand. (iii) The law is silent, and each component decides. That pick is Peter's.

#### [THURGOOD R2] — 2026-10-18 — incorporation, woven into the body

Every R1 item is accounted for below. Nothing was declined.
- **The floor becomes the law's second half** (Leonardo (a), (b), and his verdict in (d); Lina (a)). § 1 states it in three parts and carries Lina's closing line verbatim. → § 1
- **Each owner's text goes on that owner's surface, verbatim.** Lina's (a) replaces the framework's Key Principle (site 1). Leonardo's (c) named rule replaces R1's characteristic line in `design-philosophy.yaml` (site 4). R1's own proposed sentence for site 1 is withdrawn. → § 6.1, § 6.4
- **Lina's consequential framework edits** (her (a)): Q2/Q3 "use" becomes "consider", plus the semantics line; Q4 "pause and ask" becomes "record the departure". → site 2, § 6.2
- **Leonardo's symmetric documentation requirement** (his (d)3). → site 3, § 6.3
- **Leonardo's (e) sites, which R1's sweep missed because it did not grep charters**: his charter L440, Kenya L340, Data L343, their operative-set items, and his confirmation L201. They are added as sites 6–8, with the signing cost named: three C1 re-confirms, and one of them a fresh ruling. He also found the Component Development Guide L723 SF Symbols note (site 9) and the preserved-knowledge L429 "user experience" (folded into the 6.5 addendum). I verified each line against the files on 2026-10-18.
- **Law-level categories**: Lina's (c) 1–11 and Leonardo's (b) 1–8, merged into one list under the floor, each item cited back to its sources. The switch's own list stays in Spec 130. → § 3
- **Precedents and the cautionary instance** (Lina (d); Leonardo (b)1). I verified the `.isButton` line at L306. → § 5
- **P-1 consequences** (Lina (b), whose lean has moved; Leonardo (a)): recorded, nothing picked. → § 7
- **Forks surfaced, not absorbed**:
  - **F-1**, the ecosystem default (Lina (e); Leonardo (d)2; R1's R-2).
  - **F-2**, interaction in "design": the one point where the two reads diverge. As drafted, each owner's text would carry a different answer on its own surface, so the pick is also a consistency repair.
  - **F-3**, my own. Leonardo's (b)8 brings the 3:1 floor into the law, and Peter punted the system-wide contrast fix the same day. That meeting point is a fork, not a reading I may choose for him. → § 8
- **Residuals**: R-1, recurring and stale-prone accessibility ownership (Leonardo (d)1; Lina (e)). R-2, the missing verification instrument (Lina (e)), with the harness charter and its triggers named. → § 9
- **A straggler I noticed, not proposed**: the framework's motion § "When to Pause and Ask" (L165–170) has two lines that become design-axis choices under this law. They are flagged for Lina's read. → § 6 sweep
- **Open slots**: Kenya, Data and Sparky. The orchestrator consults them on this R2 draft.

#### [KENYA R1] — 2026-10-18 — read-only consult on R2, entered verbatim
*Source: [KENYA R1] — read-only consult on ballot R2 (HEAD 6f4a6fd3c), 2026-10-18 — VERBATIM. The headings are demoted to fit this document; the words are unchanged.*

I edited nothing and ran nothing that writes, and no call was denied. I read §§ 1–10, kenya.md L330–350, operative item `implement-3`, my `#step-3-implement` confirmation, and InputCheckboxBase.ios.swift L296–312.

**Caveat on every SwiftUI claim below:** I am answering from knowledge, not from a build. This repo has no Xcode target, so this is code-reading-grade evidence, which is exactly R-2.

##### (a) ACCEPT the principle and the floor, with CHANGES to § 3 for iOS
The floor is right, and the iOS catalog already lives under it. My changes:
1. **Item 1 needs a rule for controls iOS doesn't have.** "Announced as the native control would" means nothing for a checkbox or radio, because iOS has neither. Add: "where the platform has no native control, use its closest documented trait pattern, and record the choice." This also changes how § 5's cautionary case should read. The checkbox's `.isButton` plus `accessibilityValue` was the standard iOS pattern before iOS 17 shipped `.isToggle`. Our floor is 17.0, so `.isToggle` is available, and for binary state the case against `.isButton` holds. But the checkbox has three states, and `.isToggle` is binary. I believe `.isToggle` also makes VoiceOver say "switch button" (medium-low confidence), which is wrong for a checkbox. So I'd word § 5 as "probable drift, and it shows the rule has no referent where no native control exists," not as plain verified drift. The `.isButton` line is real; the diagnosis is the softer part.
2. **Item 6 is missing four iOS settings:** Reduce Transparency (`accessibilityReduceTransparency`) — matters more now that iOS 26's Liquid Glass materials surround our controls; Button Shapes (`accessibilityShowButtonShapes`) for drawn buttons; On/Off Labels — UISwitch draws I/O glyphs when this is on; as far as I know there is no SwiftUI environment value for it; a drawn switch has to read `UIAccessibility.isOnOffSwitchLabelsEnabled` and observe its change notification (medium confidence); Large Content Viewer (`.accessibilityShowsLargeContentViewer`) for controls that don't scale with text — applies directly to the drawn Nav-TabBar-Base.
3. **Item 6, Dynamic Type, needs a narrower meaning.** UISwitch does not scale with text size; its label does. For a switch, "text scale" should mean the label reflows and the row stacks at accessibility sizes, not that the control scales. Otherwise teams will over-build.
4. **Item 6, Increase Contrast, interacts with F-3.** Native controls respond to `colorSchemeContrast == .increased`. If item 9's "four theme contexts" means light/dark × two themes, Increase Contrast doubles that to eight on iOS. Name it, or state that it is excluded.
5. **Item 7, RTL, has a SwiftUI trap worth recording.** `.offset(x:)` and hand-computed thumb positions do not flip under right-to-left layout. Drawn travel must be written in leading/trailing terms.
6. **Item 8, haptics: add "honours the System Haptics setting."** `.sensoryFeedback` should respect it already (medium confidence).
7. **Item 3, Voice Control:** fine. `.accessibilityInputLabels` covers alternate names; the visible label stays the name.
8. **Item 11, structural idioms:** add the iOS failure that happens most often. Hiding the nav bar to draw a custom back button kills the interactive edge-swipe-back gesture. That breaks the floor and should be named.

##### (b) Lina's two unverified claims
**1. Toggle with a custom `ToggleStyle`: does it keep the toggle trait and the "switch button, on/off" announcement?** My belief: **not reliably.** My confidence that it is preserved implicitly is low to medium. I recall the style's `makeBody` output becoming the accessibility content, so a body built from a tap gesture reads the label and drops the state. **The robust fix doesn't depend on that belief.** Inside `makeBody`, add `.accessibilityRepresentation { Toggle(configuration) }` (iOS 15+), so VoiceOver sees a standard Toggle. Belt and braces: `.isToggle` (iOS 17+). With that, I'm medium-high confident in the expected announcement: "‹label›, switch button, on/off, double-tap to toggle setting," localized for free. Spec 130 should make that representation a contract requirement rather than lean on implicit behavior. It still needs on-device VoiceOver confirmation, which R-2 says we can't do yet.
**2. Does UISwitch's haptic survive a custom style?** **No** (high confidence). Nothing in a custom style is UISwitch. It has to be reproduced with `.sensoryFeedback(…, trigger: configuration.isOn)`, which is iOS 17+ and inside our floor. I'm only medium confident that `.selection` matches UISwitch; it may be closer to a light impact. Spec 130 should settle that on a device. **Also lost (high confidence):** thumb drag. UISwitch lets you drag the thumb, and a custom style needs its own `DragGesture` or gives that up. That is Leonardo's (b)4 "thumb drag" made concrete. The On/Off Labels glyphs are lost too, per (a)2.

##### (c) My edit site (6.7): CHANGES
Swapping only the tail leaves the first clause, "Follow iOS idioms and conventions", unqualified, and that is the half I'd actually read as a visual mandate. My wording:
> "Follow iOS structural and behavioral idioms (navigation, system surfaces, gestures, accessibility) — the screen should feel native in structure and behavior; its look follows the spec, which may depart from native idiom"
Two notes: **This wording depends on F-2.** If F-2 goes Lina's way, "behavior" and "gestures" here would contradict her Key Principle. Whichever way F-2 lands, sites 6–8 need the same answer. **My straggler check** (grep of `native` in kenya.md): L258, L319, L366, L370 and L450 are all about development or idiom advice, so none needs editing. The re-confirmation cost doesn't change my view: it is one unit, five items, and I'd re-confirm `#step-3-implement` in the execution PR.

##### (d) F-2: does "design" cover interaction conventions?
**My read is closer to Leonardo's, with a test that may dissolve the fork.** I'm surfacing it; the pick is Peter's. **Proposed test:** design may *add* affordances to native interaction; it may never *remove or contradict* a convention users rely on. Removing or contradicting is floor: back swipe, scroll physics, text selection, keyboard and IME, thumb drag. Adding is design. **P-2 under this test.** The iOS convention, as I understand it, is that only the switch toggles; a Settings row label is inert (medium-high confidence). Making the whole row tappable removes nothing users rely on. Nobody depends on the label being inert, and it widens the touch target. VoiceOver behaves the same either way, because the combined element toggles on double-tap. So under my test, whole-row tap is admissible on iOS. Under a strict Leonardo reading, it is not. **Counter:** "additive" is in the eye of the drafter. A tappable row can collide with rows that navigate, or with swipe actions, and it changes what users expect from Settings rows platform-wide. The add/remove line would also need its own case law, which is the per-component re-argument F-1(iii) is trying to avoid.

##### (e) F-1: the ecosystem default, from the seat that implements it
**On iOS, the two-paths cost is asymmetric, and the options don't say so:** Where a native control exists (Toggle, ProgressView, segmented Picker), the native path is nearly free: `.toggleStyle(.switch)` plus `.tint()`, with no accessibility code of our own. Where none exists (checkbox, radio, float label), there is nothing to opt out *to*. So any opt-out should be scoped to "where a native control exists." **My read:** **(i)**, our look by default, with a native opt-out scoped as above, and the switch built as a `ToggleStyle`. Then the opt-out is a SwiftUI idiom, not a fork. One catch: an internally applied style beats a consumer's outer `.toggleStyle`, so the component needs an explicit style parameter. Bonus: the native path doubles as the test oracle for the drawn path's announcement. **(iii) is worst for me:** no predictable default, and the question gets re-argued at every component's P-1. **Counter:** (i) puts R-1 staleness on every iOS consumer who never chose it. The native default under (ii) gets OS redesigns for free, including iOS 26's Liquid Glass toggle, and what DesignerPunk's look gains by being the default may not be worth that.

##### (f) My surviving counter to the law
**A drawn control sits inside native chrome that Apple redesigns every year.** The floor requires native nav bars, sheets, keyboards and grouped lists, and those pick up each new look (Liquid Glass is the current one) automatically. Our drawn controls sit inside that frame and don't. That makes visual coherence a recurring cost at every iOS release, not a one-time design decision. It is distinct from R-1, which is accessibility going stale; this is visual staleness against the frame the law obliges us to keep. **R-2 is sharper on iOS.** I cannot verify any VoiceOver, haptic or On/Off Labels claim in this repo. Today the iOS half of the floor is checked only by reading code, and the checkbox shows that reading code misses things. I'd ask that R-2 say so explicitly for iOS.
**Formal reviewer slot (§ 8):** I'd take it. Sites 7 and 8 are charter edits on the platform seats, and the iOS claims in § 7 are mine to verify.

#### [DATA R1] — 2026-10-18 — read-only consult on R2, entered verbatim
*Source: [DATA R1] — read-only consult on the R2 ballot draft (2026-10-18) — VERBATIM. The headings are demoted to fit this document; the words are unchanged.*

I read §§ 1–11, my charter at L343/L451, `operative-sets/data.yaml`, `confirmations/data.md#step-3-implement`, and the Android `Input-Checkbox-Base`/`Input-Radio-Base` sources. I edited nothing, committed nothing, and no call was denied. HEAD is `6f4a6fd3c` and the tree is clean.

**(a) ACCEPT the principle and the floor, with CHANGES to § 3.** The Android repo gives a reason for the floor that the ballot does not yet cite. Our existing drawn Android checkbox, which § 5 lists as a precedent, already drifts on three of the § 3 categories (verified today):
- **Item 1 (localized state).** `InputCheckboxBase.android.kt:429-433` hard-codes English `stateDescription` ("checked"/"unchecked"/"partially checked"). That overrides the localized strings TalkBack would read by default.
- **Item 2 (name).** L445-449 and L482 add "Double tap to check" to `contentDescription`. TalkBack already says its own usage hint, so users hear it twice, and it is wrong for keyboard and Switch Access users.
- **Item 5 (touch target).** L465 sizes to `tapAreaMinimum` (44dp). That is below Android's 48dp minimum interactive size, which equals `tapAreaRecommended` (48).
- **Item 4 (focus).** grep finds no focus handling. The only focus cue is whatever the ripple's focus state layer draws, and I have not checked whether that is visible enough.
- **R-1 staleness.** Seven Android components still use the deprecated `rememberRipple`.
This is the Android counterpart of the iOS `.isButton` example, and § 5 should name it. Changes to § 3:
- **Item 5:** say "the higher of the token floor and the platform minimum". On Android, `tapAreaMinimum` alone does not meet the floor. That makes the existing checkbox and radio an F-3-style question for item 5 as well as item 9.
- **Item 1:** add "disabled state". Also add the advice not to override the platform's default state strings; a custom string takes localization onto us.
- **Item 3:** add hardware keyboard (Tab to focus, Enter and Space to activate). Compose `clickable` covers Enter and D-pad centre. I am not sure it covers Space, so verify. Web requires Space.
- **Item 6, Android settings:** font scale (nonlinear up to 200% on API 34+, so the row must reflow), Remove animations / animator duration scale, high-contrast text, bold text (`fontWeightAdjustment`, API 31+), display size, and possibly the API 34 system contrast level (moderate confidence). Android has no forced-colors equivalent.
- **Item 7:** say that Canvas and `drawBehind` drawing does not mirror for RTL. `Modifier.offset` mirrors; `absoluteOffset` and Canvas do not.
- **Item 8:** on Android the native control gives nothing for free here. I believe Compose M3 `Switch` triggers no haptic (moderate confidence), so TOGGLE_ON/OFF (API 34+) is a design choice, not something we owe. The category wording is fine as written.

**(b) Lina's claim: I confirm it, with additions.** My confidence is high on semantics and moderate on the M3 internals.
- `Modifier.toggleable(value, interactionSource, indication, role = Role.Switch, onValueChange)` provides the role, the On/Off toggleable state, the click action, enabled/disabled, and focusability. With Role.Switch, Compose reports the node as `android.widget.Switch` and supplies localized default "On"/"Off" state text. TalkBack then reads label, "Switch", and the state, activates on double-tap, and announces the change. That needs almost no extra accessibility code, as long as we do **not** override `stateDescription` or `contentDescription`, which is the checkbox's mistake.
- In the row-owns-semantics pattern the outline already uses, `Switch(onCheckedChange = null)` is purely visual: it has no semantics and no minimum size. So yes, it was buying geometry, ripple and motion. It also buys M3's state colors (hover, focus, press, disabled), the thumb that grows on press (only if the interactionSource is shared), and future M3 updates.
- A drawn switch has to rebuild: 1. The row's minimum height: `tapAreaRecommended`, or `minimumInteractiveComponentSize()`. 2. The state layer: `indication = ripple(...)`, the current API, not `rememberRipple`. 3. An explicit D-pad/keyboard focus indicator using the accessibility.focus tokens and `collectIsFocusedAsState`. 4. Thumb motion with `animateDpAsState` on motion tokens. Compose's clock should already respect animator scale (moderate confidence). The existing components also read `ANIMATOR_DURATION_SCALE` themselves, so check it is not applied twice. 5. RTL-safe thumb placement. 6. Disabled visuals.
- I believe Compose M3 `Switch` has no thumb drag (moderate confidence), so drag is not something we would be rebuilding on Android.

**(c) My edit site: I accept the direction, but the wording is incomplete.** Changing only the tail leaves "Follow Android idioms and conventions", the start of the line, readable as a rule about visuals. My wording for L343 and `implement-3`: "Follow Android structural and behavioral idioms — the screen should feel native in structure and behavior; its look follows the spec's design choice."
- **There is also a straggler the sweep missed:** L451 / `native-1` (`#android-specific-guidance:preamble`), "Jetpack Compose composables with Material 3 as base". It is the exact counterpart of Leonardo's "Material 3 base", which site 6 edits. My proposed text: "Jetpack Compose composables with Material 3 as structural base (Scaffold, system bars); visuals follow DesignerPunk tokens and the spec."
- L366, L440 and L471 can stay. They describe knowledge or fallback order, not a mandate.
- The cost becomes **two** re-confirmations instead of one: `#step-3-implement` and `#android-specific-guidance:preamble`. Both are re-signs. My 2026-09-29 rulings were plain "CONFIRMED as drafted", with no sentence that contradicts the law the way Leonardo's does. The cost does not change my view.

**(d) F-2.** My read sits between the two owners, and I am surfacing it as a third option, not picking. The test is whether the user's expectation of what happens depends on the thing.
- **Behavior, which never departs:** activation, back and predictive back, scroll physics and overscroll stretch, IME, text selection.
- **Feedback presence, also floor:** a press must produce perceptible feedback. On Android, a tap with no state layer reads as a dead tap.
- **Feedback form, which is design:** ripple versus our own state layer, thumb grows on press or not. Those are M3's look, not conventions users rely on, and Compose M3 users get no drag anyway.
- So this mostly follows Leonardo's text, with feedback form carved out as design. Counter: the line between presence and form is a judgment call that will be re-argued per component. Leonardo's "input and gesture conventions never part" could also ban a branded gesture pattern that replaces no system gesture, which Lina's wording allows.

**(e) F-1.** My read is (i), our look by default with a native-look opt-out, **on one condition:** semantics live on a wrapper the component owns, and rendering is a swappable visual slot.
- On Android under that architecture, the native path is `Switch(onCheckedChange = null)` inside the same toggleable row. That is one semantics layer and one accessibility test set, with only the visuals differing. § 8's "two renderings and two sets of tests" overstates the cost here, and likely on iOS too (default versus custom `ToggleStyle`, same `Toggle`).
- Android also weakens (ii)'s premise. There is no single native look on Android: M3 `Switch` is Google's library look, and OEM Settings apps such as One UI draw their own.
- The class option is the semantics-wrapper plus rendering-slot rule. It costs a convention in the component guide and a one-time refactor where semantics currently sit on the rendering.
- Counter: an opt-out is API surface forever. M3 geometry (52×32) differs from 56×32, so layout and C1–C3 diverge between the two paths. The less-used native path will rot without tests.

**(f) My surviving counter to the law.** R-2 is not hypothetical on Android; it is already true. The floor holds only as far as something checks it, and on Android nothing can. This repo has no Gradle or Compose UI test run, and our precedent component already breaks items 1, 2 and 5 without anyone noticing.
- Compose semantics assertions (`assertIsOn`, a role matcher, `assertHeightIsAtLeast`) are cheap and would close the Android half of R-2, but only once the chartered harness exists.
- The law still licenses Android departures that today we can only check by reading code, as I did here.
- What I folded in: Android's fragmented native look lowers the staleness part of R-1 for Android. It does nothing for R-2.

#### [SPARKY R1] — 2026-10-18 — read-only consult on R2, entered verbatim
*Source: Sparky R1: web seat. Read-only consult on ballot 2026-10-18-true-native-development-is-not-true-native-design (R2, HEAD 6f4a6fd3c) — VERBATIM. The headings are demoted to fit this document; the words are unchanged.*

I read §§ 1–9 and grepped the web catalog under `src/components/core/*/platforms/web`. I edited nothing, committed nothing, and no call was denied.

##### Two verified facts that bear on the ballot (grep, 2026-10-18)
- **V1. No forced-colors support in the web catalog.** `forced-colors` appears 0 times in `src/` (34 web components). Web-Authoring-Standards Hard Rule 6 already makes forced-colors a hard requirement and says "existing components may need remediation." That remediation has not happened. The brief's premise that "the web seat ships forced-colors anyway" is false today.
- **V2. The catalog's high-contrast support probably never runs.** All 34 `prefers-contrast` queries use the value `high`, in 18 components (checkbox, radio, Button-CTA, Chip and others). The current spec (Media Queries Level 5) has `more | less | custom | no-preference`; `high` was an old draft value. An unknown value makes the media query never match, so these blocks are very likely dead code. Confidence is high, but this comes from my training data: check it in a real browser before anyone acts on it.
Together these are the web version of R-2. A written rule existed and the catalog still didn't carry this category. It belongs to Lina's domain, routed via Leonardo or Thurgood. I'm reporting it, not fixing it.

##### (a) The principle and floor: CHANGES (small)
I accept the principle. Two changes:
1. **Floor part 1's wording collides with Spec 128.** "The platform's own UI framework" read literally rules out React and React Native, which 128 is chartered to admit. Custom Elements and Shadow DOM qualify, React does not. Suggested wording: "the platform's own rendering and accessibility stack."
2. **Floor part 2 has nothing to point at on the web.** "Exactly as the platform's native control would" assumes a native control exists. The web has no native switch, segmented control or tabs. Safari 17.4+ ships a non-standard `<input type="checkbox" switch>`, and it is not cross-browser as far as I know. Add: *on web, "platform-correct" means the WAI-ARIA role contract, the APG keyboard pattern and the HTML-AAM mappings.*
**The § 3 categories, checked for web:** Covered: forced colors and `prefers-contrast` (item 6), reduced motion (6), Space required / Enter supported (3), `:focus-visible` (4), hover and pressed feedback (8), RTL (7). **Item 6:** "text scale" should read "text scale, browser zoom to 400% / reflow (1.4.10), and text-spacing overrides (1.4.12)." Drawn controls with fixed block sizes clip under these. **Move "differentiate without color" from item 6 to item 9.** On the web it isn't a user setting. It is unconditional WCAG 1.4.1. **Item 6 or 8 should name forced-colors behavior explicitly.** A drawn thumb painted with `background-color` disappears in forced-colors mode, because backgrounds are forced to Canvas. It needs a system-color border or `forced-color-adjust` handling. The native control gets this for free; a drawn one does not. **Item 7:** RTL thumb travel needs logical insets or `:dir(rtl)`. Hard Rule 1's `translateX` exception doesn't apply here, because direction matters for the thumb. **Possible missing category: platform services the native control took part in.** Autofill and password managers, form participation and restoration, find-in-page. The switch doesn't need it; Input-Text-Base would if it were ever drawn. Fold it into item 10 or add it.
**`<button role="switch">` vs `<input type="checkbox" role="switch">`.** Neither is "native" in the iOS sense; both are drawn visuals over standard semantics. The existing web checkbox already uses that pattern: a visually hidden native input with a drawn sibling. Under the floor, both are admissible if they meet the APG switch contract. I pick the **`<button type="button" role="switch" aria-checked>`** the outline already names: Space and Enter both activate it natively (a checkbox ignores Enter, and inside a form Enter submits it); the track and thumb live inside the focusable element — one element owns the focus ring, the target size and the forced-colors ButtonText/ButtonFace styling, with no visually-hidden-sibling workaround; it is not form-associated, which fits P-3(a) (an input inside Shadow DOM doesn't join the outer form without ElementInternals anyway, so the checkbox's "free form participation" isn't free here); styling keyed on `[aria-checked="true"]` ties the visual state to the announced state. Counter-argument: the button makes us keep `aria-checked` in sync with JavaScript, which is a bug class the checkbox's native `checked` doesn't have. The checkbox route would also allow progressive enhancement to Safari's `switch` attribute later. That sync risk is my surviving cost. It's cheap to pin with a unit test (toggle → `aria-checked` flips), so I keep the button.

##### (b) F-2: does "design" cover interaction?
From the web seat, both owners are half right. "Interaction conventions" bundles two different things: 1. **Interaction the platform owns**: scrolling, back and history, text selection, IME, browser and OS shortcuts, Tab order, zoom, context menu. These are floor and never depart. Leonardo is right here. 2. **Interaction local to a component**: whether the label or row toggles (P-2), drag-to-toggle, Enter on a switch. Above the APG minimum the web has no native idiom to bind to. That is design, within § 3. Lina is right here. **Class option to surface:** split F-2 along that line, worded "Look, and component-local interaction, within the limits above." Cost: one boundary definition, then the same consistency repair to sites 6.1 and 6.4. The surviving counter: some things sit on the line. Thumb drag on iOS is a UISwitch behavior that users rely on, yet it is component-local. Someone still has to rule on those cases. The pick is Peter's.

##### (c) F-1: the default when a consumer makes no choice
On the web it is close to moot. The UA stylesheet isn't one native look: it differs across Chrome, Safari and Firefox, and there is no cross-browser native switch. Option (ii) "native look by default" has no stable meaning on the web. The nearest web equivalent of "native with brand" is `accent-color`, which tints native checkbox, radio, range and progress. It is the counterpart of iOS tint-only. A native-ish look on the web could also be a **token theme mapped to CSS system colors**, not a second rendering path. Custom properties reach through Shadow DOM, so the web pays none of the "two renderings" cost. Does this change the answer for the other platforms? I think it does. A law-level (ii) would be undefined on the web, so any default must read "native where the platform has one." That makes the opt-out a per-platform capability, not a promise across the system. The two-path cost then falls on iOS and Android only. My lean is (i) with that per-platform caveat. The counter: (i) puts our brand on every iOS consumer by default, which is Leonardo's (d)2 and it survives. The pick is Peter's.

##### (d) F-3: does the 3:1 floor bind existing components?
Fix the premise first. Forced-colors does not discharge item 9. Forced-colors replaces author colors with system colors, so it says nothing about 3:1 contrast in our four theme contexts. And per V1, the web doesn't ship forced-colors today anyway. Keep two things apart: **Forced-colors (and V2's dead queries)** is an already-ratified Hard Rule that hasn't been carried out. It is not part of the punt, so F-3 should not absorb it in either direction. **The 3:1 contrast floor:** my lean is (i), new departures only. The switch meets it and the checkbox and radio stay on the contrast-queue record. The counter that survives: under (i), a Settings screen shows a compliant switch next to a checkbox that fails in dark mode. That inconsistency is visible, and it lands on the first screen 130 serves. The pick is Peter's.

##### (e) My surviving counter-argument to the law
The web has always been in the "drawn" world, because most of its composite widgets have no native element. So R-1 and R-2 have already played out on the web. With a written Hard Rule in place, the catalog still shipped no forced-colors support and, very likely, high-contrast queries that never match. The law alone will not carry the floor; instruments will. **Class option, not yet vetted with Lina:** a static CSS check run with the web tests. Every interactive web component must have a `forced-colors` block, and no media feature may use an unknown value. Cost: a small script, plus remediating the interactive subset of 34 components. Its residual: checking that the block exists is not checking that it is correct. Real forced-colors behavior needs a browser, and our Jest/jsdom setup can't evaluate media queries. So R-2 survives on the web too, just narrower.

##### Paths
- Hidden native input pattern: `src/components/core/Input-Checkbox-Base/platforms/web/InputCheckboxBase.web.ts` (L473–484); hidden-input CSS (L216) and `prefers-contrast: high` (L444): `…/InputCheckboxBase.web.css`; web mapping in the outline (§ 5.1, L75).

#### [THURGOOD R3] — 2026-10-18 — incorporation of the platform reads, woven into the body

Every item in the three platform reads is accounted for below.
- **Floor wording** (Sparky (a)1, a must-fix). "UI framework" becomes "rendering and accessibility stack", in § 1 and in site 1's text. **Lina's site-1 text is amended by another reviewer. Her confirmation is recorded at § 6.1.** → § 1, § 6.1
- **The floor's referent on every platform.**
  - Web is WAI-ARIA, APG and HTML-AAM (Sparky (a)2).
  - Platforms with no native control use the closest documented trait pattern, and the choice is recorded (Kenya (a)1).
  - → § 1.2
- **§ 5's iOS case is softened** to "probable drift; it shows the rule has no referent where no native control exists", following Kenya's three-state reasoning. → § 5
- **§ 3, per platform.**
  - Kenya (a)2–8: Reduce Transparency, Button Shapes, On/Off Labels, Large Content Viewer, Dynamic Type narrowed to label reflow, Increase Contrast (to F-3), the RTL `.offset(x:)` trap, haptics honouring System Haptics, and nav-bar hiding killing edge-swipe-back.
  - Data (a): the higher of the token floor and the platform minimum; no state-string overrides; hardware keyboard; the Android settings; Canvas and `drawBehind` not mirroring; haptics as design on Android.
  - Sparky (a): zoom, reflow and text spacing; 1.4.1 moved to item 9; forced colors named; logical insets; platform services folded into item 10.
  - → § 3
- **Declined, with the reason: Data's "add disabled state" to item 1.** `governance/classification-map.md` § "no-disabled-states" (Peter, 2026-07-15, zero exceptions) leaves no disabled state for the floor to govern, and Spec 130 excludes it by the same law. "Disabled visuals" is omitted from § 7's Android rebuild list for the same reason. If Data meant a platform-imposed disabled state outside DesignerPunk's components, that is a question for Lina and Peter, not this ballot. *Closed at R4: Data withdrew it. In his R2 (e) he says he meant enabled/disabled semantics, and the no-disabled-states rule stands.*
- **§ 5 gains the Android and web counterparts** (Data (a); Sparky V1, V2). I verified each against the source on 2026-10-18.
  - Data's "seven components on `rememberRipple`" does not match my grep, which found four component sources. The discrepancy is recorded, not resolved.
  - The defects route to Lina's own record and change, not this unit. → § 5 "Surfaced, routed", § 11
- **F-2 is presented as three formulations of one split** (Leonardo strict; Lina broad; the platform seats' converging middle line from Kenya, Sparky and Data). Each comes with what it does to P-2. → § 8
- **F-1**:
  - All three platform seats lean (i), with conditions.
  - Data's wrapper-and-slot class option corrects R2's "two renderings and two sets of tests".
  - The counters are kept.
  - → § 8
- **F-3**:
  - Forced colors moves out of the fork (Sparky (d)).
  - Sparky's lean and counter are recorded.
  - Data's touch-target sub-question and Kenya's Increase Contrast sub-question are added.
  - → § 4, § 8
- **Sites**:
  - Kenya's and Data's own wordings for 7 and 8a.
  - Data's straggler becomes site 8b, so the signing cost rises to **four** re-confirms, two of them Data's.
  - All three seats say sites 6–8 must carry the same F-2 answer.
  - → § 6
- **§ 7 brought up to date**:
  - iOS: `ToggleStyle` plus the representation contract, the lost haptic, thumb drag and glyphs, and the explicit style parameter.
  - Android: the toggleable row with no string overrides, and the rebuild list.
  - Web: `<button role="switch">` with Sparky's reasons and surviving cost.
  - → § 7
- **R-2 sharpened per platform**, with the harness triggers cited once. **Kenya's (f) visual-staleness counter is added as R-3**, kept separate from R-1. → § 9
- **Reviewers of record**: Kenya, Data and Sparky are recorded as R1 reviewers of record, so the § 8 slot that asked about them is retired. → header

*Source: "F-1 (iv) reads on Peter's reframing (2026-10-18) — VERBATIM". Peter's words come first, then the five seats. The words are unchanged.*

#### [PETER R4] — 2026-10-18 — Peter's answers (chat), relayed by the orchestrator

*Relayed. This records what he said, not a ratification.*

"Though well considered, I'm unsure about that framing. The wording seems strange to have a default of 'our look' and yet have an opt-out of the native style. Doesn't having to opt-in to a default defeat the purpose of default? I could be misunderstanding, so correct me if my thinking is flawed. I would put it to the agents for consideration before blindly approving, but maybe 'our look by default; but in the absence of a specified design, fallback to native controls'."
Also ruled same message: F-2 — "'Design' also covers control behavior, but sometimes the design might choose a platform convention – and sometimes it might not. That's why it's so critical to be thorough and developing component specs." F-3 — "Let's apply it to: 1. all new controls and 2. existing controls when they are being modified. That is to say: everything from here-on-out will meet the standard, and grandfathered components must align when we work to update them." Edit site 5 — "Well... no one. The preserved-knowledge directory is context and lessons learned from the previously failed attempts at building what is now DesignerPunk. They're the ideas DP is built from, so they're historical context rather than anything that we would point to today as reference material."

#### [LINA R2] — 2026-10-18 — read of Peter's F-1 reframing, read-only, verbatim

(a) On substance his thinking holds; what misled him is our wording. Under (i), our look ships when the consumer chooses nothing, so nobody opts in to the default. The "opt-out" means opting out of our look and into native. "Native-look opt-out" reads as the reverse, so that's a defect in the ballot's text, not in his reasoning. His proposal is also a different kind of option. It's a rule applied when the spec is written, not a consumer switch.
(b) I accept it as (iv), and I'd pick it over (i). It fits his F-2 ruling, which already makes the spec record each choice. It also keeps one rendering path per platform, which matters while R-2 (no native test harness exists) still stands. And Kenya's "only where a native control exists" scoping falls out of it without extra wording. Data's wrapper-and-slot convention should still apply, so a native path can be added later without breaking anything. F-3 doesn't change my pick.
(c) The test is a per-platform entry in the component's design spec: either `designed` (tokens and geometry) or `native`. Spec silent on a platform: ship native, and the silence is a finding. `native` where no native control exists (the iOS checkbox): invalid, so it must be designed. No spec at all: native fallback for product one-offs. Ecosystem components can't ship without a spec.
(d) The counter that survives: a consumer who wants native look on a control we designed has to fork it (Kenya's counter). Kenya's R-3 also lands on every iOS consumer: our drawn controls fall behind the native chrome around them at each iOS redesign.

#### [LEONARDO R2] — 2026-10-18 — read of Peter's F-1 reframing, read-only, verbatim

(a) Peter's critique of (i) misreads it a little. Under (i), nobody opts in to the default; a consumer only opts out, to native. His own framing is still sound, but it is a different rule: it is decided when the component is designed, not chosen by the consumer at runtime.
(b) Yes, I'd take it as (iv) and pick it over (i). Each control has one rendering path, there is no opt-out API, and a control we haven't designed has a sane state: native.
(c) The test: a control has a "specified design" on a platform when its Stemma spec gives drawn token geometry and color tokens for every state on that platform. Otherwise it falls back to native. This is decided per component, never per screen. My screen specs cite the result, they don't decide it: the component name; per platform, either "designed" (with its tokens) or "native" (with the system control, e.g. SwiftUI `Toggle` or M3 `Switch`, plus any tokens still applied, such as tint).
(d) Surviving counter: a control styled only partly (e.g. on-color tint only) has no clear status; leaving a control undesigned becomes the cheap path; one screen can mix drawn and native controls; my (d)2 residual survives: a consumer wanting the native look for a designed control has no route. Data's semantics-wrapper option could add that route later without new API now.
(e) Yes, F-2 changes my wording. Amended: "True Native is how DesignerPunk is built, not a requirement on how it looks or behaves: design may follow a platform's idiom or part from it for a product's user needs or brand, carried by tokens and themes, with each choice recorded. Accessibility semantics, interaction the platform owns, and system surfaces never part."

#### [KENYA R2] — 2026-10-18 — read of Peter's F-1 reframing, read-only, verbatim

(a) Peter's thinking is sound; the flaw was in my wording. By "native opt-out" I meant a runtime escape from our look back to the native control, not opting into a default. His version is clearer.
(b) I accept (iv) over (i). It drops a second rendering path that would have to be maintained and tested, and the native fallback goes only where no design is specified.
(c) A decidable test: a component has a specified design on a platform if its spec or `contracts.yaml` records the visual choice with tokens for that platform (site 3). If not, it renders the platform's native control. The test needs one more clause for controls iOS doesn't have: checkbox, radio and float label have nothing to fall back to, so they must carry a specified design. For the switch, I ship one drawn `ToggleStyle` and no public style parameter. The native path survives only as a test fixture: SwiftUI's built-in `.switch` style is the oracle the drawn style's VoiceOver output is compared against. It is not API.
(d) Surviving counter: a consumer who wants the system Toggle on a switch DesignerPunk has designed must fork it. Also, the fallback is all-or-nothing per component and platform, so a partial spec (geometry set, haptic not) never falls back.
(e) Yes, Spec 130 must record P-2. My recommendation: make the whole row toggle on every platform. It departs from the iOS Settings convention, removes nothing users rely on, and gives a larger target. Verify that taps cancel when the list scrolls.

#### [SPARKY R2] — 2026-10-18 — read of Peter's F-1 reframing, read-only, verbatim

(a) Is Peter's thinking flawed? Only slightly. A default with an opt-out is coherent: you never opt in to a default. But his rule is a different and better one: an authoring-time rule, not a runtime switch. On the web, the "native" fallback has one meaning per kind of control: Simple controls (checkbox, radio, text, select, range, progress): the browser's own `<input>` or element, plus `accent-color` and `color-scheme`. That is a valid fallback. Composite widgets with no native element (switch, segmented control, tabs, tab bar): no fallback exists. The ARIA pattern with no custom CSS is not a visible control. Falling back to a checkbox for a switch is exactly the placeholder's role bug. Lina's rule that "`native` is invalid where no native control exists" covers this; the ruling should name the checkbox case explicitly.
(b) Accept as option (iv), over (i)? Yes. It drops the opt-out API that would last forever (Data's counter), and costs the web nothing. One condition: on the web, a silent spec on a widget with no native element must block, not fall back to native and log a finding.
(c) Surviving counter. The browser's native styling differs across Chrome, Safari and Firefox. Without `color-scheme` it can also fail our dark themes and the 3:1 contrast rule. A web entry marked `native` should have to declare `color-scheme` and `accent-color`, or it ships inconsistent, off-brand controls.
(d) Where the static CSS check belongs. Lina's defect record. It enforces a ratified rule that was never carried out (Hard Rule 6), and the dead `prefers-contrast: high` queries fall under the same rule. The contrast queue covers 3:1 ratios, not this. Adding a check to this ballot's execution would widen its scope; § 9 R-2 can point to it.

#### [DATA R2] — 2026-10-18 — read of Peter's F-1 reframing, read-only, verbatim

(a) Is Peter's thinking flawed? A little. Under (i), nobody opts into the default; the opt-out is how you leave it. Even so, (iv) is the better rule. On Android, "native" should mean the stock Material 3 control.
(b) Accept (iv) over (i)? Yes. It removes my API-surface, two-geometry and rot counter. The wrapper still matters, but as a convention, not as an F-1 condition. Semantics stay put when a component moves from native fallback to a designed rendering. It also stops native-fallback controls from overriding their state strings, which is the checkbox's drift.
(c) Decidable test for "no specified design": set an explicit per-platform `rendering: designed | native` field in the component metadata. Never infer it from missing tokens. "Designed" requires geometry and every state to be specified. A partial design is a fork for Peter.
(d) Surviving counter: What ships depends on how far authoring got. A late design ships native, and a design that arrives later is a visual breaking change. On Android, native-fallback controls take their colors from `MaterialTheme`. Unless we map the DesignerPunk theme into it, they show Material 3's baseline purple.
(e) Grandfathering: The 44dp checkbox stays until its rendering or contract changes. That holds only if F-3 covers § 3 item 5, so confirm. 44dp meets WCAG; 48dp is Android platform guidance. Retiring the placeholder edits `settings.yaml`, not the checkbox, so it does not count as modifying it. "Disabled": I meant enabled/disabled semantics. With no disabled states, I withdraw it.

#### [THURGOOD R4] — 2026-10-18 — the rulings round, woven into the body

- **Peter's answers are recorded as relayed, never as ratified**, each quoted in full. → § 8, plus the verbatim block below
- **F-2 ruled.**
  - The floor gains "interaction the platform owns" as its own part (§ 1.3), and system surfaces move to § 1.4.
  - § 2's review split moves from "visual vs behavioral" to "the floor vs everything else".
  - § 3 item 10 divides platform-owned interaction (floor) from component-local interaction (design, recorded).
  - Site 3 now covers behavioral choices, and site 4 is Leonardo's amended rule, verbatim.
  - Sites 1, 6 and 7 are re-proposed to follow the ruling. **Each owner confirms its own at execution**: Lina for the one proposed sentence in 6.1, and Leonardo, Kenya and Data for their lines. Their R1 wordings predate the ruling.
  - Site 8b is unchanged.
  - P-2 goes to Spec 130 R1.
  - → § 1, § 2, § 3, § 6, § 7, § 8
- **F-3 ruled.**
  - Recorded with the "modified" definition the orchestrator flagged and Data confirmed, and with item 5 covered.
  - Forced colors stays outside.
  - **One part is not answered**: Kenya's Increase Contrast sub-question, carried to Spec 130 R1 and named rather than dropped. → § 8
- **Site 5 dropped.**
  - The row is kept and struck, so the site numbers stay stable.
  - 6.5 now holds the historical-context note.
  - It also records the **follow-up, which is not this ballot**: three live pointers still present `preserved-knowledge/true-native-architecture-concepts.md` as current guidance. → § 6.5
- **F-1 (iv)**:
  - It is written as an authoring-time rule, with the test the five reads converged on.
  - The ballot owns the R3 wording defect.
  - (i), (ii) and (iii) are kept as superseded, pending Peter's approval.
  - The counters are kept.
  - Kenya's R1 "explicit style parameter" in § 7 is replaced by her R2 position: no public parameter, and the built-in style used as a test oracle.
  - → § 7, § 8
- **Data withdrew "disabled state"** (his R2 (e)). My R3 decline is closed in place. → [THURGOOD R3]
- **The R3 line on Lina's confirmation now points to § 6.1.** → [THURGOOD R3]
- **Sparky's R2 (d)**: the static CSS check belongs on Lina's defect record, not this ballot's execution. → § 9 R-2, § 11

*Source: "R5 seat confirmations on the R4 re-proposed site wordings (2026-10-18) — VERBATIM". The words are unchanged.*

#### [LINA R3] — 2026-10-18 — confirmation of the site wording, verbatim
*Lina — site 6.1: DECLINES Thurgood's ⟨proposed⟩ sentence as worded; her exact text instead*

"I don't accept Thurgood's sentence as worded. Its parenthesis is shorter than floor part 3: it leaves out 'history' and 'the platform services a native control takes part in (§ 3 item 10)'. It also drops part 4's 'their contents may be styled'. The exact text I want instead:
> Two more limits are not a choice: interaction the platform owns (back and history, scrolling, text selection, keyboard and IME, and the platform services a native control takes part in) is never replaced, and system surfaces and structural idioms are never replaced, though their contents may be styled. Every visual and behavioral choice is recorded with its reason.
There's also a placement problem. These sentences go at the end of the principle, but my third bullet says 'within the limits above', so it wouldn't cover them. In that bullet, 'within the limits above' should become 'within the limits of this principle'. Without that change, the text contradicts the F-2 ruling.
My F-1 report from earlier stands: I accept Peter's framing as (iv), I pick it over (i), and the per-platform `designed`/`native` entry in the design spec is the test for 'absence of a specified design'."

#### [KENYA R3] — 2026-10-18 — confirmation of the site wording, verbatim
*Kenya — site 6.7: ACCEPT*

"ACCEPT the R4 § 6.7 wording for kenya.md L340 and `implement-3`, as drafted at 82ce61a2f. It is the text I'll re-confirm at execution; I edited nothing. The tail's 'feel native in structure' is enough because the opening clause already holds 'the interaction iOS owns' to the § 1.3 floor."

#### [LEONARDO R3] — 2026-10-18 — confirmation of the site wording, verbatim
*Leonardo — site 6.6: one addition to L439; L441 ACCEPT*

"Not a plain ACCEPT: I want one addition to L439. Please use:
`Each platform should feel native in structure, in accessibility semantics, and in the interaction the platform owns:`
The R4 wording leaves out floor part 2 of § 1 (accessibility semantics are always platform-correct), and that is the part a drawn control is most likely to lose. L441 (`Material 3 structure`): ACCEPT."

#### [DATA R3] — 2026-10-18 — confirmation of the site wording, verbatim
*Data — site 6.8 ACCEPT; site 6.7 one change, exact wording*

"ACCEPT 6.8 as written. For 6.7 I want one change: R4's list of interaction Android owns leaves out text selection and keyboard, which the § 1 floor item 3 names. Exact wording for L343 and `implement-3`: `Follow Android structural idioms and the interaction Android owns (system surfaces, back, scroll, text selection, keyboard and IME, accessibility) — the screen should feel native in structure; its look and component behavior follow the spec's design choices.`"

#### [THURGOOD R5] — 2026-10-18 — confirmations woven in; the owners' words replace mine

- **6.1 (Lina).** My ⟨proposed⟩ sentence is withdrawn. She was right that it was shorter than the floor: it dropped "history", the platform services clause and "their contents may be styled". Her two sentences replace it, verbatim, after the bullets. Her third bullet now reads "within the limits of this principle". The ⟨proposed⟩ mark is removed. → § 6.1
- **6.6 (Leonardo).** His L439 adds accessibility semantics, floor part 2. L441's `Material 3 structure` is accepted. → § 6.6
- **6.7 (Kenya).** Accepted as drafted at `82ce61a2f`, and her reason is quoted. → § 6.7
- **6.7 (Data).** His exact wording replaces mine and adds text selection and keyboard. 6.8 is accepted as written. → § 6.7, § 6.8
- **§ 8 is unchanged.** Approval of F-1 (iv), and ratify / modify / reject, remain Peter's.
- **§ 11.** The confirmations that were owed at execution are now recorded as confirmed. Execution still owes the C1 re-confirmations of the moved units: Leonardo 1, Kenya 1, Data 2. → § 11

## 11. Consult ledger

- **Peter**, 2026-10-18 (relayed by the orchestrator): the principle, verbatim, and the instruction that it becomes law through a short ballot. His full-roster answer on Spec 130 ("insight over cost") is in its R0.
- **Leonardo**, 2026-10-18 (R1, read-only): the law holds only with the behavioral floor. He offered the Native-Behavior Rule and found sites 6–9.
- **Lina**, 2026-10-18 (R1, read-only): she offered the three-axes Key Principle and the consequential edits. Her P-1 lean has moved. Her surviving counter became R-2. **Confirmed** (read-only, 2026-10-18): the site-1 amendment, quoted in § 6.1 — "ACCEPT. I take 'the platform's own rendering and accessibility stack are not a choice' as my text for edit site 1. … The new phrase admits React (DOM plus ARIA) and React Native (native views plus native accessibility APIs), which is what Spec 128 needs. It still excludes self-drawn surfaces such as canvas or Flutter-style rendering, which is the intent."
- **Kenya**, 2026-10-18 (R1 reviewer of record, read-only): she accepted with § 3 changes and gave the trait-pattern rule. She found implicit `ToggleStyle` semantics unreliable and proposed the representation contract, the add/remove F-2 test, F-1 (i) scoped, and R-3.
- **Data**, 2026-10-18 (R1 reviewer of record, read-only): he accepted with § 3 changes. He supplied the Android drift evidence and site 8b (two re-confirms), the presence/form F-2 test, and the F-1 wrapper-and-slot class option.
- **Sparky**, 2026-10-18 (R1 reviewer of record, read-only): she accepted with floor-wording changes. She reported V1 and V2, the platform-owned/component-local F-2 split, F-1 as moot on web, the forced-colors separation in F-3, and the static CSS check class option (not vetted with Lina).
- **Peter**, 2026-10-18 (second message, relayed): ruled F-2 and F-3, dropped site 5, and proposed F-1 (iv). He asked that the seats consider (iv) before he approves it. All of this is recorded in § 8 as relayed.
- **F-1 (iv) reads**, 2026-10-18, read-only: **Lina, Leonardo, Kenya, Sparky and Data all ACCEPT (iv) over (i).** All five say R3's (i) wording, not Peter's reasoning, caused the misreading. Their decidable-test clauses are converged in § 8. Leonardo amended his site-4 rule for F-2. Kenya's P-2 recommendation goes to Spec 130 R1. Data withdrew "disabled state" and confirmed the F-3 "modified" definition and item 5 coverage.
- **Follow-up, not this ballot**: the three live pointers to `preserved-knowledge/true-native-architecture-concepts.md` (§ 6.5). Owner Thurgood. Core Goals needs a ballot and an identity-doc re-sign; Lina is consulted on her two docs.
- **Site wordings confirmed**, 2026-10-18, read-only, R3 entries in § 10:
  - Lina supplied her own 6.1 text and the bullet change.
  - Leonardo supplied his own L439 and accepted L441.
  - Kenya accepted 6.7 as drafted.
  - Data supplied his own 6.7 line and accepted 6.8.
  - Nothing remains to confirm.
- **Still owed at execution**: the C1 re-confirmations of the moved signed units, made by the owning seats in the execution PR: Leonardo 1 (with a fresh ruling), Kenya 1, Data 2.
- **Surfaced, routed to Lina**: the defects in § 5 belong to her components, and the fixes go to her own record and change, not this unit:
  - iOS: `.isButton` probable drift.
  - Android: `InputCheckboxBase.android.kt` L429–433, L445–449, L482 and L465; no focus handling; `rememberRipple` (count disputed, seven vs four).
  - Web: V1, zero `forced-colors`; V2, 34 `prefers-contrast: high` queries, which need a browser check.
  - Also Sparky's static-CSS-check class option, for her consult. Sparky R2 (d) places it on this record.
  - Also forced colors, kept outside F-3 by the ruling.
  - The orchestrator routes this. The record is not opened in this unit.

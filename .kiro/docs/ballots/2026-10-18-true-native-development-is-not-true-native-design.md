# Ballot Measure: True Native Development is not True Native Design

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward), at Peter's direction. R2 revision on the same day, after Leonardo's and Lina's R1 reads.
**Status**: **DRAFT (R2).** Nothing in § 6 is applied until this record says RATIFIED (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Origin**: Peter's answer on Spec 130 fork P-1, given in chat on 2026-10-18 and relayed by the orchestrator. It is recorded at `.kiro/specs/130-input-switch-base/feedback.md` § "[PETER R0]". He agreed the answer should become law through this ballot, not stay a feedback line.
**Required reviewers**: **Leonardo** (product architect; he consumes the design philosophy) and **Lina** (owner of `governance/cross-platform-vs-platform-specific-decision-framework.md`). Both R1 reads are in (§ 10).
- **Kenya, Data and Sparky**: their slots are open. The orchestrator is consulting them on this R2 draft, and whether they are formal reviewers is a § 8 slot.
**Unit**: this draft is standalone. The application PR edits `governance/**` and `canonical/**`, so **Peter merges it** under the governance carve-out.

---

## 1. The principle

> **"True Native Development does not necessarily mean True Native Design, and design needs to be able to part from native design to solve a product team's own user needs and branding."** — Peter, 2026-10-18

**The floor is the law's second half.** Both owners' reads agree the sentence holds only with it. Leonardo: "It does not survive if worded as 'native idiom is not binding' with no behavioral floor." The floor has three parts:
1. **Implementation is always native.** That means build-time platform separation and the platform's own UI framework.
2. **Accessibility semantics are always platform-correct.** Role, state, name, activation, focus and announcements behave exactly as the platform's native control would.
3. **System surfaces and structural idioms are never replaced.** Their contents may be styled.

**A departure in design never licenses a departure in semantics.** (Lina, verbatim.)

Whether "design" covers interaction conventions or only visuals is fork **F-2** in § 8. The two owners differ on it.

## 2. What it changes

- **True Native Architecture is a development axis.** It does not bind visual design to platform idiom.
- **Design is a choice.** It may follow native idiom or depart from it, to serve a product's users and brand. Under the floor, a token-drawn control becomes an admissible default rather than a recorded deviation.
- **Why this matters (Leonardo (a))**: "Native controls limit what a theme can reach." On iOS the system Toggle draws its own off track in system colors, and a product's theme cannot reach it.
- **Reasons are recorded both ways.** Every component records its visual choice and the reason, whether it follows native idiom or departs from it (Leonardo (d)3; edit site 3).
- **Review splits in two (Leonardo (a))**: "Visual departures from native need a reason. Behavioral departures from native are not allowed."

## 3. What a departure must carry: law-level categories

These are categories, not the switch's list. The categories merge Lina's (c) 1–11 and Leonardo's (b) 1–8, cited by their numbers. Each component lists its own instances in `contracts.yaml`; the switch's list belongs to Spec 130, not here (Lina (c)).

1. **Role and state**, announced as the native control would announce them, and localized. Never a mimic: no control that looks native and carries different semantics. (Lina 1–2; Leonardo 1, 7)
2. **Name and description.** The visible label is the name, as one combined element. (Lina 3)
3. **Activation by every input path the platform supports**: screen reader, keyboard, Full Keyboard Access, Switch Control, Voice Control naming, D-pad. (Lina 4; Leonardo 2)
4. **Focus**: one stop, with a visible indicator. (Lina 5; Leonardo 2)
5. **Touch target floors**: `tapAreaMinimum` and `tapAreaRecommended`, plus each platform's minimum interactive size. (Lina 6; Leonardo 3)
6. **User accessibility and display settings**: text scale, reduced motion, increased contrast, bold text, differentiate without color, forced colors, and on/off labels. (Lina 7, 9; Leonardo 2)
7. **Right-to-left mirroring.** (Lina 8; Leonardo 2)
8. **The feedback the native control gave for free**: haptics, and pressed, hover and state-layer feedback. (Lina 10–11)
9. **Floors that system controls gave for free**: the 3:1 non-text contrast floor in all four theme contexts, and the Contract Rule's per-platform tests. (Leonardo 8; see fork **F-3**)
10. **Interaction conventions users rely on**: thumb drag, back gestures, scroll physics, text selection, keyboard and IME behavior. (Leonardo 4; its reach is fork **F-2**)
11. **System surfaces and structural idioms**, which are never replaced. These are part of the floor (§ 1.3). (Leonardo 5–6)

## 4. What it does NOT change

- **The decision framework's "it depends" stays.** This ballot names the design axis. It picks no component's answer.
- **The 2026-10-18 accessibility punt is a separate decision.** On P-6 and P-13, Peter deferred the *system-wide* contrast fix to a later redesign. This ballot neither reopens nor relaxes it. How § 3 item 9 meets it is fork F-3.
- **Build-time separation, the Rosetta pipeline and the behavioral contracts are unchanged.**

## 5. Already true: the catalog departs today (Lina (d))

**Precedents**:
- Nav-SegmentedChoice-Base: drawn on iOS.
- Input-Text-Base: a Material float label, drawn on iOS; on Android, `BasicTextField`.
- Input-Checkbox-Base and Input-Radio-Base: drawn on iOS and Android.
- Nav-TabBar-Base and Progress-Bar-Base: no `TabView` or `ProgressView` on iOS (from a grep only).

For the catalog, this law describes what already happens.

**The cautionary instance**: the drawn iOS checkbox announces as a button. Its source, `src/components/core/Input-Checkbox-Base/platforms/ios/InputCheckboxBase.ios.swift:306`, reads `.accessibilityAddTraits(.isButton)` (verified 2026-10-18). This is the semantics drift that § 1.2 and § 3 item 1 exist to prevent.

## 6. Edit sites (applied only after RATIFIED)

Each site uses its owner's own text verbatim where the owner offered it.

| # | Site | Owner | Merge rule | Signing cost |
|---|---|---|---|---|
| 1 | `governance/cross-platform-vs-platform-specific-decision-framework.md` L23, "Key Principle". Replaced by Lina's (a) text. See 6.1. | Lina | `governance/**`, so Peter merges | None. Leonardo loads the doc as an ambient file, and the baseline lists ids, not hashes. The edit reaches his context directly. |
| 2 | Same doc, Decision Criteria Q2 (L103), Q3 (L113) and Q4 (L126). See 6.2. | Lina | Peter merges | None |
| 3 | Same doc, § "Documentation Requirements" (L313, L317). Made symmetric. See 6.3. | Lina | Peter merges | None |
| 4 | `design-language/design-philosophy.yaml`: Leonardo's named rule (c), inserted after "The Break-Glass Rule" (L49–51), before `guidance:` (L53). It replaces R1's characteristic line. This is the file `get_design_philosophy` and `get_design_rules` serve (`application-mcp-server/src/index.ts` L754, L814). See 6.4. | Peter (author, Spec 107 Req 8); Leonardo (consumer) | Peter merges. It ships in the package (`package.json` `files`: `design-language/`) and reaches consumers at the next release. | None |
| 5 | `preserved-knowledge/true-native-architecture-concepts.md`: an addendum after the closing line, pinning "user experience" at L429. See 6.5. | Unowned (preserved knowledge, so an addendum and never a rewrite) | Peter merges, riding the application PR. Who writes it is a § 8 slot. | None |
| 6 | `canonical/agents/leonardo.md` L439–441, § "What 'Consistent' Means in True Native". See 6.6. | Leonardo | `canonical/**`, so Peter merges, then regenerate | It moves operative-set items `consistent-not-identical` and `native-2` (`canonical/operative-sets/leonardo.yaml` L399 and L407–410). Leonardo re-confirms the unit pinned at `canonical/profiles/consumer/confirmations/leonardo.md` L197–201 (C1). That ruling's sentence, "accepting a non-native idiom on one platform violates them", needs a fresh ruling, not just a re-sign. |
| 7 | `canonical/agents/kenya.md` L340 and `canonical/operative-sets/kenya.yaml` L247–250 (`implement-3`). See 6.7. | Kenya | Peter merges, then regenerate | Kenya re-confirms `#step-3-implement` (`confirmations/kenya.md` L116–120). |
| 8 | `canonical/agents/data.md` L343 and `canonical/operative-sets/data.yaml` L251–254 (`implement-3`). See 6.7. | Data | Peter merges, then regenerate | Data re-confirms `#step-3-implement` (`confirmations/data.md` L120). |
| 9 | `governance/Component-Development-Guide.md` L723: a scoping note on the example's "platform-native visual consistency" reason for SF Symbols. See 6.8. | Lina | Peter merges | None |
| 10 | `.kiro/specs/130-input-switch-base/design-outline.md` § "2. Settled decisions": one row. See 6.9. | Thurgood | Applied at R1 incorporation and merged with that R1 unit | None |

**Total signing cost: three C1 re-confirmations**, one unit each for Leonardo, Kenya and Data. Leonardo's includes a fresh ruling on his 2026-09-29 sentence. All three are made by the owning seat in the execution PR. Under the signing-act chain's M1, these signing acts need no grant. The execution PR regenerates `canonical/_consumer-output/**` and the agent outputs, and `122-diff-guard` must be green.

**6.1, Key Principle.** The current text at L23:
> **Key Principle**: Neither cross-platform consistency nor platform-specific idioms are always correct. The right choice depends on context, user expectations, and design system goals.

After the edit (Lina (a), verbatim). The last bullet's "interaction conventions" clause depends on **F-2**: if F-2 goes Leonardo's way, those five words leave.
> **Key Principle**: True Native Development does not mean True Native Design. Three axes, two of them fixed:
> - **Implementation is always native.** Build-time platform separation and the platform's own UI framework are not a choice.
> - **Accessibility semantics are always platform-correct.** Role, state, name, activation, focus and announcements behave exactly as the platform's native control would. That is not a choice either.
> - **Design is a choice.** Look, and interaction conventions within the limits above, may follow the platform's native idiom or depart from it to serve the product's users and brand. Neither is always correct; the right choice depends on context, user expectations and design system goals.
>
> A departure in design never licenses a departure in semantics.

**6.2, Decision Criteria** (Lina's consequential edits):
- L103: `- **Strong platform convention**: Use platform idiom` becomes `- **Strong platform convention**: Consider platform idiom`
- L113: `- **Superior platform UX**: Use platform idiom` becomes `- **Superior platform UX**: Consider platform idiom`
- After Q3's block, add: `Accessibility semantics stay native whatever is chosen for design.`
- L126: `- **No**: Pause and ask for guidance` becomes `- **No**: Record the departure`. The example line stays.

**6.3, Documentation Requirements** (Leonardo (d)3):
- L313: `**When using platform-specific idioms**, document in component README:` becomes `**Every component documents its visual choice** — native idiom or departure — in its README:`
- L317: `1. **Rationale**: Why platform idiom chosen over cross-platform pattern` becomes `1. **Rationale**: Why this visual choice (native idiom or departure) was made`

**6.4, the design-philosophy rule** (Leonardo (c), verbatim), at the existing rules' indentation:
```yaml
  - name: "The Native-Behavior Rule"
    constraint: "True Native is how DesignerPunk is built, not a requirement on how it looks: visual design may part from platform idiom when a product's user needs or brand require it, carried by tokens and themes. Behavior never parts — accessibility semantics, input and gesture conventions, and system surfaces remain each platform's own."
    rationale: "Native controls cap theming; native behavior is what users and assistive technology rely on."
```
If F-2 goes Lina's way, "input and gesture conventions" leaves the constraint's second sentence.

**6.5, the preserved-knowledge addendum:**
> **Addendum (2026-10-18, ballot `2026-10-18-true-native-development-is-not-true-native-design`)**: "True Native", and "native performance and user experience" above, describe development and behavior (build-time separation, native implementation, native accessibility semantics), not visual appearance; design may depart from native idiom while implementation and semantics stay native.

**6.6, Leonardo's charter** (proposed; Leonardo confirms the wording at execution):
- L439: `Consistent does NOT mean identical. Each platform should feel native:` becomes `Consistent does NOT mean identical. Each platform should feel native in structure and behavior:`
- L441: `(Scaffold, Material 3 base, system bars)` becomes `(Scaffold, Material 3 structure, system bars)`

**6.7, Kenya's and Data's charters:** `— the screen should feel native` becomes `— the screen should feel native in structure and behavior`. This applies to each charter line and to its operative-set `text`, and the `label` is regenerated.

**6.8, the Component Development Guide scoping note**, added after the example's code block (ends L725):
> *Scope note (ballot `2026-10-18-true-native-development-is-not-true-native-design`): "platform-native visual consistency" is this example's reason, not a requirement — a component's icons may depart from the platform's native set when its design calls for it.*

**6.9, the Spec 130 settled row:**

| Decision | Source |
|---|---|
| True Native Development is not True Native Design, with the behavioral floor. Native idiom does not bind the switch's look, so drawn or token-defined geometry is admissible on every platform. Semantics are never drawn. | Ballot `2026-10-18-true-native-development-is-not-true-native-design` |

**Straggler sweep.** Run 2026-10-18 over `governance`, `.kiro/steering`, `design-language` and `canonical`:
- R1's sweep did not grep the charters. Leonardo did, and found sites 6–8.
- **Candidates for Lina's read**: the framework's motion § "When to Pause and Ask" (L165–170), the lines "Platform idiom conflicts with design system consistency" and "Animation is critical to brand expression". These are design-axis choices under this law. They are not proposed here.
- Core Goals is consistent and is not edited.
- The application PR re-runs the sweep, including over `canonical/agents/**`.

## 7. Consequences for Spec 130 P-1

- Native look stops being the presumed default. Option (a) stays legitimate; (b) and (c) are admissible.
- **Lina's lean has moved** (her (b)): "draw the visuals on all three platforms, but never draw the semantics." Under it:
  - iOS keeps `Toggle` with a custom `ToggleStyle`. Kenya must verify VoiceOver; this is unverified.
  - Android draws inside `Modifier.toggleable(role = Role.Switch)`.
  - Geometry is 56×32 everywhere, so C1–C3 apply on all three platforms.
- **Leonardo (a)**: the Restrained direction becomes fully expressible, and P-10 becomes a visual decision on iOS too.
- **Nothing is picked here.** P-1 is ruled at R1. F-1 below bears directly on the switch, because the switch makes the default choice for every consumer.

## 8. Rulings (Peter)

*Empty: the ballot is DRAFT.*
- **Ratify / modify / reject:**
- **F-1, what DesignerPunk's own components ship when a consumer makes no choice.** Raised by both owners; this was R1's R-2. Lina (e): "Applied to ecosystem components, DesignerPunk's brand departure ships to every consumer as the default, and a consumer who wants native look has to fork the component." Leonardo (d)2: "A product that wants the system look gets it only if the component offers a native rendering option."
  - **(i) Departed look by default, with a native-look opt-out.** The brand reaches every consumer. Cost: every drawn component also maintains a native rendering path, which means two renderings and two sets of tests.
  - **(ii) Native look by default, with a brand opt-in.** Defaults keep the native behavior for free, which lowers R-1. Cost: the same two paths. DesignerPunk's own look becomes opt-in, which sits against the philosophy. On iOS, the Restrained direction is only partly reachable through the native path (Leonardo (a)).
  - **(iii) Silent; each component decides at its own P-1.** Cost: no rule. Each component re-argues the question, and consumers cannot predict what they will get. Without an escape hatch, a consumer who wants native look forks the component.
- **F-2, does "design" cover interaction conventions?** The two owners' texts differ, and as drafted they would land on two different surfaces of the same law. The pick decides which wording changes (6.1 or 6.4). P-2, iOS label pressability, turns on it.
  - **Lina (a)**: *"Look, and interaction conventions within the limits above, may follow the platform's native idiom or depart from it."*
  - **Leonardo (c)**: *"Behavior never parts — accessibility semantics, input and gesture conventions, and system surfaces remain each platform's own."* His (b)4 adds: *"Interaction conventions users rely on. Thumb drag and haptics on the iOS toggle, back gestures, scroll physics, text selection, keyboard and IME behavior."*
- **F-3, § 3 item 9 and the accessibility punt.** Leonardo's (b)8 makes the 3:1 non-text floor something a departure takes on. Peter's consequence (c) already applies it to the switch. Choose one:
  - **(i)** Item 9 binds **new** departures, and existing drawn components that fail (checkbox and radio in dark mode) stay under the punt on the contrast-queue record until the redesign.
  - **(ii)** Item 9 binds existing departures too, which reopens part of the punt.
  - **(iii)** Item 9 leaves this ballot and waits for the redesign.
  - Drafted as (i), but it is Peter's call, not absorbed.
- **Who writes edit site 5** (preserved knowledge, outside every charter's scope):
- **Kenya, Data and Sparky: do they review this ballot, or first meet it at Spec 130 R1?** The orchestrator recommends they review it, citing Peter's "insight over cost". Their slots are in § 10.

## 9. Counter-arguments (after fold-back)

**Folded in:**
- **Forfeiting free native behavior** (Leonardo (d)1; Lina (e)). The floor (§ 1) and the carried categories (§ 3) make semantics law, held by contracts. The P-1 path Lina now leans to keeps `Toggle` and `Role.Switch` semantics.
- **iOS consumers expect the system toggle** (Leonardo (d)2). The law permits departure and never mandates it. `product-dp.md:77`, "Reinventing standard affordances for flavor", still governs: branding is a reason, flavor is not. The rest of this counter becomes F-1.
- **Unrecorded drawn-by-default choices** (Leonardo (d)3). Documentation is now symmetric (site 3).
- **More load on the platform reviewers.** The law permits departure and never requires it. Whether the platform seats review this ballot is a § 8 slot.

**What survives:**
- **(R-1) Owned accessibility is recurring work, and it goes stale.** Each drawn control is accessibility code DesignerPunk writes and tests on each platform it draws. Native controls pick up OS redesigns and new settings for free; drawn ones get them "only when we notice" (Lina (e)). Leonardo calls this "a permanent maintenance and staleness cost. It is a real cost, not a reason to reject the law."
- **(R-2) The check that would catch drift does not exist** (Lina (e)). There is no native build or announcement harness. Stacy has already flagged the switch's announcement claims as unverifiable. "The law still licenses departures that today we can only check by reading code."
  - The harness is chartered and unbuilt: `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`.
  - Its § 3 triggers are, whichever fires first: (1) the first product spec kickoff; (2) one generator-emits-invalid-platform-code incident; (3) the 125-B post-campaign queue review.
  - This ballot neither fires nor evaluates that charter. Whether its evaluation is owed now is a question for the next charter walk.
  - The checkbox's `.isButton` (§ 5) shows the gap is real.

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

#### [KENYA R1]
*(pending: consult on the R2 draft)*

#### [DATA R1]
*(pending: consult on the R2 draft)*

#### [SPARKY R1]
*(pending: consult on the R2 draft)*

## 11. Consult ledger

- **Peter**, 2026-10-18 (relayed by the orchestrator): the principle, verbatim, and the instruction that it becomes law through a short ballot. His full-roster answer on Spec 130 ("insight over cost") is in its R0.
- **Leonardo**, 2026-10-18: R1 read in (read-only consult). It holds only with the behavioral floor. It offers the Native-Behavior Rule and finds sites 6–9.
- **Lina**, 2026-10-18: R1 read in (read-only consult). It offers the three-axes Key Principle and the consequential edits. Her P-1 lean has moved. Her surviving counter is R-2.
- **Kenya, Data and Sparky**: pending, to be consulted on R2. Whether they are formal reviewers is a § 8 slot.

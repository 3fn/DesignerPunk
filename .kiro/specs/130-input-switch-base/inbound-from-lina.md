# Inbound from Lina: G1 on/off switch — domain input to the Spec 130 design outline

**Date**: 2026-10-17
**Author**: Lina (component owner; G1 owner per `.kiro/issues/2026-10-13-component-gaps-from-settings-ledger.md` § G1)
**Status**: **INPUT, not a spec artifact.** Thurgood authors `design-outline.md` and `feedback.md` from this (Peter's 2026-09-19 authoring ruling; Specs 127–129 precedent). Lina is a required R1 reviewer of that outline. Nothing here is a ruling. Positions are marked **Settled-by-record** (already ruled elsewhere; cited), **Lean** (my recommendation, with its counter-argument), or **Fork** (options for Thurgood to carry to Peter).
**Trigger**: Peter's go to formalize G1 (2026-10-17), the first of G1's three triggers.
**Scope of this file**: domain input only. No code, no scaffolding, no tokens created, no edits to the settings pattern, the Form-Inputs family doc, Input-Checkbox-Base or `canonical/**`.

**Sources read**: G1 record (above); Leonardo's ledger, now at `.kiro/issues/archive/2026-10-12-leonardo-settings-call-ledger.md` (N5, N10, N11; rows D3, D5, D8, D14; Appendix A `settings.yaml`); `experience-patterns/settings.yaml`; Input-Checkbox-Base (`types.ts`, schema, `contracts.yaml`, `component-meta.yaml`, `checkbox-sizing.tokens.ts`, the three platform files); docs MCP `component-family-form-inputs` (Component Hierarchy, Platform-Specific Behaviors, Accessibility Considerations) and `contract-system-reference` § "Concept Catalog"; `governance/classification-map.md` § "no-disabled-states"; ballot `2026-09-19-disabled-input-parity.md`.

**How tokens were verified**: `search_tokens` and `get_token_details` are served by the Application MCP but are not in my seat's tool list. I called them on the same server build (`application-mcp-server/dist/index.js`, the `.mcp.json` launch env, index healthy: 217 primitive / 193 semantic / 33 component tokens) over stdio. Every token marked EXISTING below came back from that server by name.

---

## 1. Family, name, inheritance

- **Family**: Form-Inputs. **Settled-by-record** (G1 disposition).
- **Name**: `Input-Switch-Base`. **Lean.**
  - Why "Switch": it is the ARIA role (`role="switch"`), the Compose component (`Switch`) and the word in the needs (N5, N11). Why not "Toggle": SwiftUI's `Toggle` is a generic boolean control that also renders as a checkbox (macOS) or a button, and "toggle button" already means `aria-pressed` in this catalog (Chip-Filter's `accessibility_aria_pressed`, `interaction_toggle_selection`). "Switch" names exactly one role.
  - The two catalog texts that point at this gap use other words: Nav-SegmentedChoice-Base `whenNotToUse` ("use a switch or toggle component") and Button-CTA `whenNotToUse` ("Toggle component when available"). Both get the real name at migration (§ 5).
- **Inheritance**: **sibling primitive** to Input-Checkbox-Base, not a variant of it. **Lean.**
  - Why: a variant inherits its parent's contracts and props through `inherits:`, minus `omits`. Input-Checkbox-Base's contract set is built for a deferred, form-submitted choice (`validation_form_integration`, `state_indeterminate`, `state_error`, a checkmark through Icon-Base). Inheriting it would mean omitting most of it and re-declaring the role. A variant that omits most of its parent is a sibling with a misleading `inherits:` line.
  - The distinction the family doc should teach (ballot measure at spec time): **checkbox = a choice that takes effect when the form is submitted; switch = a setting that takes effect the moment it changes.** That one sentence is also the selection guidance for `component-meta.yaml`.
  - No composition: the switch draws its own track and thumb; it does not compose Icon-Base.
  - Counter-argument that survives: the two siblings will share some token and layout choices (label typography, helper text, focus ring, tap area) with nothing structural keeping them in step. The family doc and a parity test are the only guards. I accept that cost over a variant relationship that misdescribes behavior.

## 2. Props

Cross-platform contract (proposed `types.ts` surface), with each platform's idiom:

| Prop | Type | Web | iOS (SwiftUI) | Android (Compose) | Notes |
|---|---|---|---|---|---|
| `checked` | `boolean`, **required** | `checked` attribute/property | `@Binding var isOn: Bool` | `checked: Boolean` | Controlled (Fork F5). Name follows `aria-checked` and the family's `checked`. |
| `onChange` | `(checked: boolean) => void` | `onChange` property + `change` event | `onChange: ((Bool) -> Void)?` (alongside the binding, as the checkbox does) | `onCheckedChange: (Boolean) -> Unit` | Fires on every user toggle (tap, label tap, Space/Enter). |
| `label` | `string`, **required** | visible label, the accessible name | `Toggle` label, the accessible name | `Text` in the toggleable row, merged semantics | Always visible in v1 (see "not in v1"). Label **pressability** is Fork F2 for iOS. |
| `helperText` | `string?` | `aria-describedby` | combined into the element (`accessibilityHint` or merged child; Kenya to confirm) | merged into row semantics | N5's "optional one-line explanation". |
| `testID` | `string?` | `data-testid` | `accessibilityIdentifier` | `testTag` | Family convention. |
| `id` | `string?` | label/describedby association | — | — | Web only, as on the checkbox; generated if absent. |

**Platform-specific, not cross-platform**: web `change` event and the `onChange` property (Web Component idiom); iOS `Binding`; Android `Modifier` parameter (Compose convention, as `InputCheckboxBase` takes `modifier`).

**What the switch must NOT take from Input-Checkbox-Base**, and why:

| Checkbox prop | Why the switch omits it |
|---|---|
| `indeterminate` | A switch has two states. "Partially on" is a parent-checkbox pattern, not a setting. |
| `size` (`sm`/`md`/`lg`) | **Lean**: one size in v1. Native switches have one size on iOS and Android, and the settings rows need one. Counter-argument: a dense list may later want a smaller switch, and adding `size` later is additive, so the cost of waiting is low. |
| `labelAlign`, `labelTypography` | These exist for Input-Checkbox-Legal's long consent text. A switch label is a short setting name; the label sits leading and the switch trailing (N5 "switch on the right", the iOS/Android settings convention). |
| `errorMessage` | Fork F4. Save failure is a transient event (G5), not a field error. |
| `name`, `value` | Fork F3. A switch applies immediately; it does not submit with a form. |
| `required` | A setting is never "required to be on". Needing a user to turn something on is consent, which is Input-Checkbox-Legal's job. |
| `disabled` | **Settled-by-record, does not survive the brief.** DesignerPunk has no disabled states (`classification-map.md` § "no-disabled-states", Peter 2026-07-15, zero exceptions). `state_disabled` goes under `excludes:` with the standard reason. Per the ratified disabled-input-parity ballot (2026-09-19, option (d)), a consumer-set `disabled` is inert at runtime, and the web element MAY emit the development-time warning (D2) because this is a new scaffold. No "saving" lock either: the settings flow is optimistic (`toggle → optimistic update → save → saved | failed`), so the control stays live while saving. |

**Not in v1, named so the outline can decide to keep it out**: a visually hidden label (a switch inside a row whose label lives elsewhere). G6's fix made Input-Radio-Set's group label required; v1 requires a visible label. If a consumer needs a label-less switch, that is a later additive prop.

## 3. Platforms and behavioral contracts

### Platform mapping

- **Web**: Web Component `<input-switch-base>`, Shadow DOM, CSS logical properties. Inner control `<button type="button" role="switch" aria-checked="true|false">`, named by the visible label (`aria-labelledby`), helper text by `aria-describedby`. Not form-associated (Fork F3). `:focus-visible` ring. `prefers-reduced-motion` and `prefers-contrast` handled as on the checkbox. Sparky to confirm the `<button>` base over `<input type="checkbox" role="switch">`: the button base gives Enter/Space activation and no form participation for free.
- **iOS**: SwiftUI `Toggle(isOn:)`. VoiceOver reads a Toggle as "<label>, switch button, on/off" (iOS 17 is our floor, so the `.isToggle` trait exists). How it is drawn is Fork F1. **Finding**: the iOS placeholder today announces as a **button** (`.accessibilityAddTraits(.isButton)` with value "checked"), not as a checkbox. The record's "checkbox, checked" is accurate for web and Android only.
- **Android**: Jetpack Compose. The documented whole-row pattern: `Row(Modifier.toggleable(value = checked, role = Role.Switch, onValueChange = onCheckedChange))` containing the label column and `Switch(checked, onCheckedChange = null)`. TalkBack reads "<label>, switch, on/off" and double-tap toggles. Reduced motion via the system animator scale, as `InputCheckboxBase.android.kt` already does.

### Contracts

All concepts below already exist in the Concept Catalog (137), so no concept ballot is needed if the Fork F7 lean holds.

| Contract | What it requires for the switch | Platforms |
|---|---|---|
| `accessibility_role` | Announces as a switch: web `role="switch"`, iOS Toggle/`.isToggle`, Android `Role.Switch`. The visible label is the accessible name. (Chip-Base uses this concept for its button role; Fork F7.) | all |
| `state_checked` | On/off is exposed as state: web `aria-checked`, iOS value on/off, Android `toggleableState`. Announced "on"/"off", not "checked". State is shown by thumb position as well as track color, so it does not rely on color alone (WCAG 1.4.1). Thumb travel and track color change use `motion.selectionTransition`. | all |
| `state_controlled` | The component renders `checked` and never shows a state the consumer did not set. On save failure, the consumer sets `checked` back and the switch snaps back. This is what makes the ledger's "control reverts to the last saved value" deterministic. | all |
| `interaction_pressable` | Tapping the switch or the label toggles it (Fork F2 for iOS). Keyboard: **Space toggles (required)**, **Enter toggles (supported)**. APG marks Enter optional for switches. **Lean** on supporting it: the `<button>` base does it natively, and Input-Checkbox-Base's `interaction_pressable` already lists both keys. | all |
| `interaction_focusable` | One tab stop for the control. | all |
| `interaction_focus_ring` | `:focus-visible` ring from `accessibility.focus.*`, 3:1 contrast. | all |
| `interaction_hover` | Web only: `blend.hoverDarker` on the track. | web |
| `interaction_pressed` | Press feedback: web/iOS `blend.pressedDarker` (optionally `scale096`, the checkbox precedent); Android ripple. | all |
| `accessibility_reduced_motion` | With reduced motion on, the thumb moves and the track changes color instantly. | all |
| `accessibility_touch_target` | The interactive row is at least `tapAreaRecommended` tall (48). | all |
| `content_helper_text` | Helper text is read with the control (web `aria-describedby`; iOS/Android merged). | all |

**Excludes** (each needs its reason line in `contracts.yaml`): `state_disabled` (standard reason); `state_indeterminate` (two-state control); `validation_form_integration` (Fork F3); `state_error` (Fork F4).

**Hand-off to G5 (transient message)**: the switch owns none of the failure UI. The consumer reverts `checked` (by `state_controlled`) and raises the transient "Couldn't save that change. Try again." message, announced politely (WCAG 4.1.3). Until G5 ships, that message is platform-native (the ledger's interim). The outline should state this boundary so no one adds a failure prop to the switch to fill G5's gap.

## 4. Tokens

Semantic first. **EXISTING** means returned by name from the Application MCP (§ header). **CANDIDATE** means a proposal for Ada and Peter, never created here. Contrast figures marked *est.* are my rough OKLCH-lightness estimates, not measurements. Ada measures.

### EXISTING (21)

| Use | Token | Tier → reference | Note |
|---|---|---|---|
| On track fill | `color.action.primary` | semantic → cyan300 | Fork F6: est. ~2.1:1 against a white canvas, so the track edge may fail WCAG 1.4.11. |
| On thumb | `color.contrast.onAction` | semantic → black500 | Est. ~9.8:1 on cyan300. Pairs with `action.primary` by design. 0 consumers today. |
| Off track border, off thumb | `color.feedback.select.border.default` | semantic → gray200 | The checkbox's unchecked border. As off thumb on a white300 track it is est. ~3:1, marginal (C6). |
| Off track border width | `border.emphasis` | semantic → borderWidth200 | Checkbox precedent. |
| Focus ring | `accessibility.focus.color` / `.width` / `.offset` | semantic → cyan300 / borderWidth200 / space025 | 3 tokens. |
| Thumb travel, track color | `motion.selectionTransition` | semantic → duration250 + easingStandard | Checkbox precedent. |
| Press feedback timing | `motion.buttonPress` | semantic → duration150 + easingAccelerate | Checkbox precedent. |
| Press scale (optional) | `scale096` | **primitive** | Checkbox precedent (prior context). |
| Hover (web) | `blend.hoverDarker` | semantic → blend200 | |
| Pressed | `blend.pressedDarker` | semantic → blend300 | |
| Row tap area | `tapAreaRecommended` | **primitive** (48) | The index tiers it primitive, although Core Goals cites it as a semantic example. Prior context: the record and the settings pattern ("All controls meet tapAreaRecommended"). |
| Label | `typography.labelMd` + `color.text.default` | semantic | `text.default` is theme-varying. |
| Helper | `typography.caption` + `color.text.muted` | semantic | `text.muted` is theme-varying. Checkbox precedent. |
| Track padding (thumb inset) | `space.inset.050` | semantic → space050 (4) | |
| Label column ↔ switch gap | `space.related.normal` | semantic → space200 (16) | |
| Label ↔ helper | `space.grouped.minimal` | semantic → space025 | Checkbox precedent. |
| Track and thumb shape | `radius.full` | semantic → radiusMax | Full radius on a square thumb renders a circle, so `radius.circle` is not needed. |

(The rows hold 21 tokens: the focus ring is 3, label and helper are 2 each.)

### CANDIDATE (4 firm, 2 conditional)

| # | Candidate | Would reference | Why no existing token fits |
|---|---|---|---|
| C1 | component `inputswitch.thumb.size` | `size300` (24) | No semantic sizes a control thumb. Precedent: `inputcheckbox.box.*` and `inputradio.box.*` are component tokens over sizing primitives. 24 matches the Material 3 on-thumb. |
| C2 | component `inputswitch.track.width` | `size700` (56) | Same reason. 56×32 is close to native proportions (iOS 51×31, M3 52×32). The alternative 48×24 with a 20 thumb (size600/size300/size250) is also on-scale if Peter or Ada want it smaller. |
| C3 | component `inputswitch.track.height` | `size400` (32) | Documents thumb + 2 × `space.inset.050`, as `inputcheckbox.box.*` documents icon + 2 × inset. Could be derived instead of tokenized; Ada's call. |
| C4 | semantic, **theme-varying** neutral off-track fill (name is Ada's) | `white300` in light; a dark-theme primitive Ada chooses | `color.structure.surface.secondary` has the right light value (white300) but is **not theme-varying**, so it would render as a bright pill on a dark canvas. `color.structure.border.subtle` is theme-varying but is a border semantic. No neutral control-fill semantic exists. |
| C5 | *conditional* semantic on-track fill | `cyan400` | Only if Ada measures `color.action.primary` below 3:1 against the canvas (Fork F6). cyan400 is est. ~3.4:1 against white and ~6:1 with a black thumb. The existing cyan400 semantics are `select.border.rest` and `select.text.rest`, a border and a text name borrowed for a fill. |
| C6 | *conditional* semantic off-thumb | Ada's choice | Only if `select.border.default` (gray200) fails 3:1 against C4 in either theme. |

Component tokens C1–C3 need explicit human approval before use (Token Governance). Every candidate is Ada's to create and Peter's to review.

**Platform reach**: sizing (C1–C3) applies where we draw the control: web always, and iOS under Fork F1 option (b). Compose `Switch` has fixed M3 geometry, so on Android only the colors map (`SwitchDefaults.colors(...)` takes all six track/thumb/border colors).

**Found in passing (not fixed here; Input-Checkbox-Base is out of bounds for this unit)**: Input-Checkbox-Base's schema lists four token names the index does not have: `typography.titleMedium`, `typography.titleSmall`, `radiusSmall`, `borderEmphasis` (the served names are `radius.small` and `border.emphasis`; the web CSS actually uses `typography.label*`). Leonardo's `settings.yaml` copied `typography.titleSmall` into every placeholder node, so the screen spec names a token that does not exist. `validate_assembly`'s new prop checker (T3) does not check the `tokens:` map, which is why this got through. The fix belongs to me on the next Input-Checkbox-Base touch. It is to be logged on the gaps issue in its own change, not in this unit.

## 5. Settings-screen migration, and the Spec 128 angle

When the switch ships:

1. **Settings pattern** (`experience-patterns/settings.yaml`): the two `role: toggle` nodes become `Input-Switch-Base`; both `componentGap` hints go; the line "Toggle controls must announce their current state — on or off" is then met by the component's own contract. **Write scope**: `experience-patterns/` is not under any of my six roots as written, so this edit needs a task-row grant in the spec's `tasks.md`.
2. **Catalog guidance**, all in my scope:
   - Input-Checkbox-Base `component-meta.yaml`: "Settings toggle" moves from `when_to_use` to `when_not_to_use` → Input-Switch-Base, plus a new `alternatives` entry.
   - The Nav-SegmentedChoice-Base and Button-CTA `whenNotToUse` lines name Input-Switch-Base.
   - Rebuild the index. Acceptance probe: re-run ledger D8 (`find_components({keyword:"on/off switch"})`). It should return Input-Switch-Base as `strong` rank 1, where today it returns a tablist.
3. **Form-Inputs family doc**: add the switch (hierarchy, contracts, schema, metadata, the checkbox/switch distinction from § 1), by ballot measure.
4. **Screen specs**: Leonardo's `settings.yaml` lives in a disposable scratch consumer, so what changes is the next real settings screen spec, and Leonardo's pattern-level guidance:
   - The four N5 rows (Push notifications, Email digest, Haptic feedback, Show activity status) become `Input-Switch-Base` with `label`, `helperText` and `checked` bound to the preference.
   - Drop `size: md`. Drop the nonexistent `typography.titleSmall`.
   - The accessibility line "Switch placeholders announce as 'checkbox, checked/unchecked' (GAP G1 compromise)" becomes "each switch announces '<label>, switch, on/off'".
   - The `component-gaps` G1 entry and the `# GAP G1` node comments are removed.
   - The failure transition is unchanged (revert + G5 message).
5. **Spec 128**: G1 trigger 3 exists because a React / React Native binding built against the placeholder would carry the checkbox role into two more emissions. Two clean options for the outline:
   - (i) Spec 130 lands before 128's first component binding starts (this outline's lean, since 128 is still gated).
   - (ii) 128 records the switch as not yet available and binds no settings toggle until it is.

   Either way, 128 must never bind Input-Checkbox-Base in a "switch" role.

## 6. Size and sequencing

- **Size: medium, upper edge.** Confirmed, with additions the record did not count:
  - one to two candidate semantic colors with theme variance (Ada);
  - three candidate component tokens;
  - a native-vs-drawn decision per platform (F1);
  - a family-doc ballot;
  - a write grant for the pattern file;
  - three catalog-guidance edits.

  No new contract concepts if F7 holds.
- **Suggested shape, for Thurgood to judge**: tokens first (Ada; Peter reviews each candidate), then the component (types → contracts → three platforms → tests → component-meta → README), then migration (pattern, guidance, family doc, index rebuild, D8 probe). Whether that is one merge unit or two (tokens as their own PR, since Peter reviews tokens before they land) is a tasks-phase call.
- **Settled-by-record, not reopened**: build a system switch, not a product one-off (Peter, fork 1 (i), 2026-10-13).
- **Counter-argument to building now, what survives**: the only evidence for the prop surface is one settings screen in a disposable scratch consumer. The v1 shape (leading visible label, trailing switch, optional helper, one size) fits that screen. A second consumer may need things v1 excludes: a label-less switch in a table row, a smaller size, a switch inside a form. Each is an additive change later, not a breaking one, but the risk of fitting the switch to one layout stands until a second screen uses it.

## 7. Proposed reviewers (Spec Feedback Protocol § "Stakeholder Identification")

- **Ada** (required): co-owner for tokens. Rules on C1–C6, the contrast measurements behind F6/C5/C6, and C4's dark-theme value.
- **Leonardo** (required): the consumer. Confirms the v1 props cover his rows, owns the screen-spec migration (§ 5.4), weighs in on F2 and on the excluded label-less case.
- **Kenya** (required): iOS. Verifies F1 option (b) keeps the Toggle's VoiceOver semantics; rules on F2 (iOS label pressability against platform convention); helper-text reading.
- **Data** (required): Android. Rules on accepting M3 fixed geometry or custom drawing (F1); confirms the `toggleable(role = Role.Switch)` row pattern under TalkBack.
- **Sparky** (required): web. Rules on the `<button role="switch">` base, Enter handling, non-participation in forms (F3), forced-colors/high-contrast rendering.
- **Thurgood**: outline author; contract-catalog conformance and test lanes.
- **Stacy** (requirements and tasks rounds, optional at outline): checks that each success criterion is verifiable, especially the cross-platform announcement claims, which today have no native build harness.

## 8. Forks left open (options for Thurgood to carry; none is mine to pick)

- **F1 — Rendering per platform.**
  - (a) Native look everywhere: iOS `Toggle` tinted with the on color only (off track and thumb stay system colors); Compose `Switch` with token colors; web drawn.
  - (b) iOS `Toggle` with a custom `ToggleStyle` drawing token geometry and colors (keeps Toggle semantics; Kenya to verify); Compose `Switch` with token colors and M3 geometry; web drawn. **Lean (b).**
  - (c) Drawn on all three with explicit switch semantics: full visual parity, but the most a11y code to own.

  Counter to (b): Android's geometry (52×32) and web/iOS's (56×32) differ.
- **F2 — iOS label pressability.**
  - (a) The whole row toggles on all platforms, as the record's "pressable label" contract and the checkbox precedent have it. **Lean.**
  - (b) iOS follows platform convention (in iOS Settings only the switch toggles), a recorded platform-specific deviation.

  Counter to (a): it departs from the iOS idiom. VoiceOver is unaffected either way.
- **F3 — Form participation.**
  - (a) None: immediate-apply is the switch's contract; deferred submission is the checkbox's job. **Lean.**
  - (b) Form-associated, with `name`/`value`.

  Counter to (a): a "remember me" style switch inside a form would have to use the checkbox.
- **F4 — Inline error.**
  - (a) Excluded: failure goes through consumer revert plus G5. **Lean.**
  - (b) An `errorMessage` prop, as on the checkbox.

  Counter to (a): until G5 ships, a failed save has no system-owned message.
- **F5 — Controlled only.**
  - (a) `checked` required, controlled. **Lean**: it makes revert-on-failure deterministic.
  - (b) Uncontrolled by default, as the checkbox's optional `checked` is.

  Counter to (a): more consumer code for a simple case.
- **F6 — On-track color.** For Ada, with Peter's review.
  - (a) `color.action.primary` (cyan300; Leonardo's "cyan only on the active switch"; est. ~2.1:1 against the canvas).
  - (b) Reuse a cyan400 select semantic (passes by estimate; borrows a border/text name for a fill).
  - (c) New semantic C5 over cyan400.

  My lean: (a) if Ada's measurement passes 1.4.11 for the track edge, otherwise (c).
- **F7 — Role contract concept.**
  - (a) Reuse the existing `accessibility_role`. **Lean**: no ballot needed; Chip-Base precedent.
  - (b) Propose `accessibility_switch_role` (ballot), following the `radiogroup_role` / `progressbar_role` precedent.

  Counter to (a): a generic `accessibility_role` is less searchable by concept.

## 9. What in the record or brief did not survive my reading

1. The brief listed `disabled` among the props. It is excluded by register law (§ 2).
2. The ledger path in the brief is stale: the ledger now sits in `.kiro/issues/archive/`.
3. "Announces 'checkbox, checked'" is true for web and Android. The iOS placeholder announces as a button (§ 3).
4. The record's "pressable label" contract conflicts with iOS convention (F2).
5. Retiring the placeholder edits `experience-patterns/settings.yaml`, which is outside my standing write scope as written (§ 5.1).
6. The record's "medium" holds, but undercounts the token work: one to two theme-varying semantics plus three component tokens (§ 6).
7. Input-Checkbox-Base's schema names four tokens that do not exist, and the screen spec inherited one of them (§ 4, found in passing).
8. `tapAreaRecommended` is primitive-tier in the index, although Core Goals cites it as a semantic example (§ 4). That is a content-consistency flag for Thurgood, not a blocker.

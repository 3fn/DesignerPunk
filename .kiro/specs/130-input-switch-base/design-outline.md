# Design Outline: 130 — Input-Switch-Base (the on/off switch, gap G1)

**Date**: 2026-10-17
**Spec**: 130 — Input-Switch-Base
**Author**: Thurgood (spec formalization, per Peter's 2026-09-19 authoring ruling)
**Status**: **DRAFT for Peter's read (R0).** No reviewer round has run. Nothing here is built, scaffolded or created; no token exists because of this file.
**Domain input**: Lina (component owner, G1 owner) — `.kiro/specs/130-input-switch-base/inbound-from-lina.md` (commit `719454218`). Input, not a spec artifact. This outline cites it by section (`inbound § N`) rather than restating it.
**Token co-owner**: Ada. Every candidate token below is a proposal for Ada and needs **Peter's review before it is created** (Core Goals: no token is created without human review; component tokens need explicit approval before use).
**Trigger**: Peter's go to formalize G1 (2026-10-17) — the first of G1's three named triggers (`.kiro/issues/2026-10-13-component-gaps-from-settings-ledger.md` § G1).
**Feedback**: `.kiro/specs/130-input-switch-base/feedback.md`

**Verification marks used below**: **[L]** = verified by Lina against the Application MCP by name (inbound header). **[T]** = verified by me in source or by grep, today, at the path given. **[unverified]** = neither; treat as a premise to check.

---

## 1. Problem and need (by pointer)

The need is Leonardo's Settings ledger: `.kiro/issues/archive/2026-10-12-leonardo-settings-call-ledger.md` (archived; the G1 record's path predates the move).
- **N5** — four rows with an on/off switch that applies immediately: Push notifications, Email digest, Haptic feedback, Show activity status (label, optional one-line explanation, switch trailing).
- **N10** — a switch that could not be saved snaps back and a brief message says so.
- **N11** — each switch is announced with its label and its on/off state.
- **D3** — the settings pattern declares the switch a gap and names Input-Checkbox-Base its placeholder. **D5** — no switch among the 12 `settings-screens` components. **D8** — the existence check returned a tablist as `strong` rank 1; no switch exists.

The system has no switch. The placeholder has the wrong role (§ 3.1, correction C-3) and contradicts its own pattern's accessibility line: `experience-patterns/settings.yaml` says "Toggle controls must announce their current state — on or off (WCAG 4.1.2)" **[T]**, and the placeholder cannot meet it.

## 2. Settled decisions (recorded, not reopened)

| Decision | Source |
|---|---|
| A **system** switch, not a product one-off. Interim until it ships = Input-Checkbox-Base + helper text, with the gap named at every node. | Peter, 2026-10-13, Settings STOP 2, fork 1 **(i)** — ledger § "Impeccable — STOP 2 of 2", ruling line |
| Family: **Form-Inputs**. | G1 record § Disposition |
| Size: **medium** (one primitive, three platforms, contracts, component-meta, placeholder retired). Confirmed in § 8 with the undercount corrected. | G1 record § Disposition |
| Ada is token co-owner; formalization goes through Thurgood. | G1 record § Disposition |
| **No disabled state.** `state_disabled` goes under `excludes:` with the standard reason; a consumer-set `disabled` is inert, and the new web element may emit the development-time warning. | `governance/classification-map.md` § "no-disabled-states" (Peter, 2026-07-15, zero exceptions); ballot `2026-09-19-disabled-input-parity.md` option (d); Component Development Guide § "No Disabled States" |

## 3. Name and inheritance

**Settled in this outline (author), open to any R1 reviewer to reopen:**
- **Name: `Input-Switch-Base`.** "Switch" is the ARIA role, the Compose component and the word in N5/N11. "Toggle" is ambiguous here: SwiftUI's `Toggle` also renders as a checkbox or button, and "toggle" already means `aria-pressed` in this catalog (Chip-Filter). Reasoning: inbound § 1.
- **Sibling primitive, not a variant of Input-Checkbox-Base.** A variant inherits contracts and props minus `omits`; the switch would omit most of the checkbox (form integration, indeterminate, error, Icon-Base checkmark) and re-declare the role. A variant that omits most of its parent is a sibling with a misleading `inherits:` line. No composition: the switch draws its own track and thumb.
- **The teaching sentence** the family doc and `component-meta.yaml` carry: *a checkbox is a choice that takes effect when the form is submitted; a switch is a setting that takes effect the moment it changes.*

**Surviving counter-argument**: two siblings will share label typography, helper text, focus ring and tap area with nothing structural keeping them in step. The family doc and a parity test are the only guards. I accept that over an inheritance line that misdescribes behavior; it becomes a requirement (§ 10), not a hope.

## 4. Prop surface

### 4.1 Cross-platform (proposed `types.ts` surface — inbound § 2 table)

| Prop | Type | Note |
|---|---|---|
| `checked` | `boolean`, required | Controlled (fork **P-5**). |
| `onChange` | `(checked: boolean) => void` | Fires on every user toggle. Compose idiom: `onCheckedChange`. |
| `label` | `string`, required, visible | The accessible name. A visually hidden label is **not in v1** (additive later). |
| `helperText` | `string?` | N5's one-line explanation; read with the control. |
| `testID` | `string?` | Family convention. |

**Platform-specific**: web `id` (label/describedby association; generated if absent), `change` event and the `onChange` property; iOS `Binding<Bool>`; Android `Modifier`.

### 4.2 What the switch must NOT inherit from Input-Checkbox-Base

| Checkbox prop | Disposition |
|---|---|
| `indeterminate` | Out. A switch has two states. |
| `size` (`sm`/`md`/`lg`) | Out of v1 (Lina lean; one native size on iOS and Android; additive later). Note for whoever adds it: the catalog already runs two size vocabularies (`sm/md/lg` on Form-Inputs, `small/medium/large` on Button-CTA), and the Settings screen spec wrote the wrong one for Button-CTA (gaps issue § "Note for Leonardo"). |
| `labelAlign`, `labelTypography` | Out. They exist for long consent text; a switch label is a short setting name, leading, with the switch trailing. |
| `errorMessage` | Fork **P-4**. |
| `name`, `value` | Fork **P-3**. |
| `required` | Out. Requiring a user to turn something on is consent, Input-Checkbox-Legal's job. |
| `disabled` | Out, by register law (§ 2). Also no "saving" lock: the flow is optimistic, so the control stays live while saving. |

## 5. Platforms and behavioral contracts

### 5.1 Platform mapping (inbound § 3)

- **Web**: `<input-switch-base>`, Shadow DOM; inner `<button type="button" role="switch" aria-checked>`, named by the visible label, described by helper text; `:focus-visible`; `prefers-reduced-motion`. Sparky confirms the `<button>` base.
- **iOS**: SwiftUI `Toggle(isOn:)` (iOS 17 floor, so the `.isToggle` trait exists). Drawing is fork **P-1**.
- **Android**: whole-row `Modifier.toggleable(value, role = Role.Switch, onValueChange)` around the label column and `Switch(checked, onCheckedChange = null)`; reduced motion via the system animator scale, as the checkbox does.

### 5.2 Contracts — all from existing Concept Catalog concepts

The Concept Catalog lists `aria_role`, `role`, `reduced_motion`, `touch_target`, `checked`, `controlled`, `pressable`, `focusable`, `focus_ring`, `hover`, `pressed` **[T]** (`governance/Contract-System-Reference.md` lines 57, 73, 85). `content_helper_text` is **[L]** only.

| Contract | Requirement | Platforms |
|---|---|---|
| `accessibility_role` | Announces as a switch: `role="switch"` / Toggle `.isToggle` / `Role.Switch`; visible label is the name. (Fork **P-7** on the concept name.) | all |
| `state_checked` | On/off exposed as state and announced "on"/"off", not "checked". Thumb position as well as track color carries state (WCAG 1.4.1). Motion via `motion.selectionTransition`. | all |
| `state_controlled` | Renders only the `checked` the consumer set; on save failure the consumer sets it back and the switch snaps back. | all |
| `interaction_pressable` | Tapping the switch or label toggles (fork **P-2** for iOS). Space toggles (required); Enter toggles (supported). | all |
| `interaction_focusable` | One tab stop. | all |
| `interaction_focus_ring` | `accessibility.focus.*`, 3:1. | all |
| `interaction_hover` | `blend.hoverDarker` on the track. | web |
| `interaction_pressed` | Press feedback; Android ripple. | all |
| `accessibility_reduced_motion` | Instant thumb move and color change under reduced motion. | all |
| `accessibility_touch_target` | Interactive row at least `tapAreaRecommended` tall. | all |
| `content_helper_text` | Helper text read with the control. | all |

**Excludes** (each with its reason line): `state_disabled` (standard reason), `state_indeterminate`, `validation_form_integration` (if P-3 (a)), `state_error` (if P-4 (a)).

### 5.3 Immediate-apply semantics and the G5 hand-off

The switch applies on change and owns **none** of the failure UI. On a failed save the consumer reverts `checked` (by `state_controlled`) and raises the transient "Couldn't save that change. Try again." message, announced politely (WCAG 4.1.3). Until G5 ships, that message is platform-native (ledger's interim). **The outline fixes this boundary so no one adds a failure prop to the switch to fill G5's gap.** Rapid re-toggling while a save is in flight is the consumer's sequencing to own, and requirements must say so explicitly (§ 10).

## 6. Tokens

Table and reasoning: inbound § 4. Summary here, split as briefed.

### 6.1 EXISTING (21 tokens) — all **[L]**; spot-checked **[T]** where marked

`color.action.primary` **[T]** (on track; see P-6) · `color.contrast.onAction` **[T]** (on thumb) · `color.feedback.select.border.default` **[T]** (off border, off thumb; see C6) · `border.emphasis` · `accessibility.focus.color` / `.width` / `.offset` · `motion.selectionTransition` **[T]** · `motion.buttonPress` **[T]** · `scale096` (**primitive**, checkbox precedent = prior context) · `blend.hoverDarker` · `blend.pressedDarker` · `tapAreaRecommended` (**primitive**, see C-8) · `typography.labelMd` + `color.text.default` **[T]** · `typography.caption` + `color.text.muted` **[T]** · `space.inset.050` · `space.related.normal` · `space.grouped.minimal` · `radius.full`.

### 6.2 CANDIDATE — proposals for Ada; each **requires Peter's review before creation**

| # | Candidate | Would reference | Why no existing token fits | State |
|---|---|---|---|---|
| C1 | component `inputswitch.thumb.size` | `size300` (24) | No semantic sizes a control thumb; precedent `inputcheckbox.box.*` | firm |
| C2 | component `inputswitch.track.width` | `size700` (56) | Same; alternative 48×24/20 also on-scale | firm |
| C3 | component `inputswitch.track.height` | `size400` (32) | Documents thumb + 2 × inset; could be derived instead (Ada's call) | firm |
| C4 | semantic, **theme-varying** neutral off-track fill (name: Ada) | `white300` light; dark primitive: Ada | `color.structure.surface.secondary` **[T]** has the light value but is not theme-varying; `color.structure.border.subtle` **[T]** is a border semantic | firm |
| C5 | semantic on-track fill | `cyan400` | Only if `color.action.primary` fails WCAG 1.4.11 against the canvas | **conditional — Ada measuring at authoring; her result not yet folded** |
| C6 | semantic off-thumb | Ada's choice | Only if gray200 fails 3:1 against C4 in either theme | **conditional — as C5** |

Lina's contrast figures are her estimates, not measurements. **Platform reach**: C1–C3 apply where the control is drawn (web; iOS under P-1 (b)/(c)); on Android only the colors map.

## 7. Settings-screen migration

### 7.1 What retires, and where

When the switch ships, every surface that points at the gap is re-pointed. Lina's inbound § 5 names five (the pattern, three component-meta files, the family doc); I count **fourteen** **[T]** (grep, 2026-10-17):

| Surface | Change | Write path |
|---|---|---|
| `experience-patterns/settings.yaml` (2 `role: toggle` nodes) | → `Input-Switch-Base`; both `componentGap` hints removed | **outside Lina's six roots → needs a `tasks.md` row grant** (C-5) |
| `Input-Checkbox-Base/component-meta.yaml` | "Settings toggle" moves to `when_not_to_use` → Input-Switch-Base; new `alternatives` entry | Lina |
| `Input-Radio-Set`, `Input-Checkbox-Legal`, `Input-Text-Base` `component-meta.yaml` | "Settings toggle — use Input-Checkbox-Base" → Input-Switch-Base | Lina |
| `Button-CTA`, `Button-Icon`, `Button-VerticalList-Set`, `Button-VerticalList-Item` `component-meta.yaml` | "use Toggle component when available" → Input-Switch-Base | Lina |
| `Nav-SegmentedChoice-Base/component-meta.yaml` | "use a switch or toggle component" → Input-Switch-Base | Lina |
| `family-guidance/form-inputs.yaml` (line 59), `family-guidance/navigation.yaml` (line 18) | re-point; read-both protocol with the family docs | Lina |
| `governance/Component-Family-Form-Inputs.md` | add the switch (hierarchy, contracts, schema, tokens, metadata, the § 3 teaching sentence); "Settings toggle" row re-pointed. The "Settings Panel with Checkboxes" example (with a Save button) **stays** — it is the deferred-submit case the checkbox is for | **ballot measure** (governance/**) |
| `governance/Component-Family-Button.md` (line 545) | re-point | **ballot measure** |

Then rebuild both MCP indexes. **Acceptance probe**: re-run ledger D8, `find_components({keyword:"on/off switch"})`; Input-Switch-Base should return `strong` rank 1.

### 7.2 What changes in Leonardo's screen spec

The ledger's `settings.yaml` lives in a disposable scratch consumer, so what changes is the **next real settings screen spec** and Leonardo's pattern-level guidance: the four N5 rows become `Input-Switch-Base` (`label`, `helperText`, `checked` bound to the preference); `size: md` and the nonexistent `typography.titleSmall` drop (C-7); the announcement line becomes "each switch announces '<label>, switch, on/off'"; the G1 gap entry and node comments go; the failure transition is unchanged (revert + G5 message).

### 7.3 Spec 128 must not bind against the placeholder

G1's third trigger exists because a React / React Native binding built against the placeholder would carry the checkbox role into two more emissions. Spec 128 is a STUB, gated on the v15.0.0 tag (exists **[T]**) and the completion-criteria-parity required-flip (state not checked here). **Either way, 128 never binds Input-Checkbox-Base in a switch role.** How that is recorded is fork **P-8**. A design note for 128's binding work: the switch is controlled and not form-associated, which avoids the controlled-input and form-association breakage 128's inbound records for today's inputs (`inbound-from-react-rn-sitting-2026-10-02.md` § 2 "Verified repo facts") — Sparky to confirm.

## 8. Scope and size

**In scope**: tokens (C1–C4, conditionally C5–C6; Ada, Peter reviews each); the component (types → contracts → three platforms → tests → component-meta → README → HTML canaries); migration (§ 7.1's fourteen surfaces, two family-doc ballots, index rebuilds, the D8 probe).

**Out of scope**: G5 (transient message), a label-less switch, sizes, form participation (unless P-3 (b)), any fix to Input-Checkbox-Base's schema (C-7).

**Size: medium, upper edge.** The record's "medium" holds on the component; it undercounts the token work (one to two theme-varying semantics plus three component tokens) and the migration surface (fourteen surfaces, not one). Whether that is one merge unit or two (tokens first as their own PR, since Peter reviews tokens before they land) is a tasks-phase call.

**Surviving counter-argument to building now**: the only evidence for the prop surface is one settings screen in a disposable scratch consumer. v1 (leading visible label, trailing switch, optional helper, one size, controlled, no form participation) fits that screen. A second consumer may want what v1 excludes — a label-less switch in a table row, a smaller size, a switch inside a form. Each is additive, not breaking, but the risk of fitting the component to one layout stands until a second screen uses it. Against waiting: G1's second trigger (a second screen) would then build against the placeholder too, and Spec 128's trigger would compound the role defect into more emissions.

## 9. Corrections to the record (none silent)

| # | What the record or brief says | What holds | Disposition |
|---|---|---|---|
| C-1 | Brief listed `disabled` among the props | Excluded by register law (§ 2) | Dropped; recorded in § 4.2 |
| C-2 | The G1 record and brief cite `.kiro/issues/2026-10-12-leonardo-settings-call-ledger.md` | It is now at `.kiro/issues/archive/…` **[T]** | Cited correctly here; the G1 record's pointer can be fixed on its next touch (Lina's file) |
| C-3 | G1 record: the placeholder "announces 'checkbox, checked'" | True on web and Android; the iOS placeholder carries `.accessibilityAddTraits(.isButton)` with a "checked" value **[T]** (`InputCheckboxBase.ios.swift:306`) — VoiceOver hears a button | The defect is worse on iOS than recorded; § 1 |
| C-4 | G1 record: contract "pressable label" | Conflicts with iOS Settings convention, where only the switch toggles | Fork **P-2** |
| C-5 | Retiring the placeholder is in the component owner's lane | `experience-patterns/settings.yaml` is outside Lina's standing six roots | `tasks.md` row grant (§ 7.1) |
| C-6 | Size "medium" | Holds, but undercounts tokens and a fourteen-surface migration | § 8 |
| C-7 | — | Input-Checkbox-Base's schema lists `typography.titleMedium`, `typography.titleSmall`, `radiusSmall`, `borderEmphasis` **[T]** (`Input-Checkbox-Base.schema.yaml:134-142`), names the index does not serve **[L]**; the Settings screen spec copied `typography.titleSmall` | Logged on the gaps issue **in its own change, not this unit** (Lina, next Input-Checkbox-Base touch) |
| C-8 | Core Goals cites `tapAreaRecommended` as a **semantic** example ("Token Selection Priority", item 1) **[T]** | It is defined in `src/tokens/TapAreaTokens.ts` as a `PrimitiveToken` **[T]** and indexed primitive **[L]**. The same Core Goals line cites `color.contrast.onPrimary`; my grep finds it only in a test file under `src/tokens/` **[T — grep only, MCP not queried]** | **Civitas content-consistency flag (mine).** Cross-domain: Ada adjudicates the token tier; any Core Goals edit is a ballot (identity doc). Not a blocker for this spec; tracked separately |

## 10. Documentation requirements to draft at formalization

Per `governance/Process-Spec-Planning.md` § "Documentation Requirements" (Governance Enforcement, line 246), requirements.md will carry Ubiquitous-pattern documentation requirements for:
- **Component README** at the component directory, with the Component Development Guide § "README-First Documentation" sections: overview, related docs, usage (web/iOS/Android), API (props table, and the § 4.2 exclusions with reasons), token consumption, accessibility (WCAG 4.1.2, 1.4.1, 1.4.11, 2.1.1, 2.4.7, 4.1.3 for the G5 hand-off; each cited per contract), platform notes (the P-1/P-2 outcomes).
- **HTML canaries** (Component Development Guide workflow step 6).
- **`component-meta.yaml`** carrying the § 3 teaching sentence as selection guidance.
- **Family doc + companion YAML** (§ 7.1), by ballot, read-both protocol.
- **Token documentation** for each candidate Peter approves (Token Quick Reference / family doc — Ada).
- **A sibling-parity requirement** (§ 3 counter-argument): shared label/helper/focus/tap-area choices between Input-Checkbox-Base and Input-Switch-Base are asserted by a test, not by prose.
- **Evidence class for announcement criteria**: "announces '<label>, switch, on'" on iOS and Android has no CI harness today (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`). Requirements must say whether each such criterion is met by a unit-level semantics assertion, a manual assistive-technology check, or both — so the claims pass has something decidable to verify.
- **Consumer sequencing** (§ 5.3): rapid re-toggle during a save is the consumer's to own, stated in the README.

No waiver is proposed.

## 11. Open forks for Peter

Options with costs; leans are the proposer's and are marked. Forks P-1 through P-7 are Lina's F1–F7; **P-2, P-3 and P-7 want their platform or catalog reviewer's R1 read before a ruling is meaningful** — Peter may rule now or let R1 converge them first.

- **P-1 — Rendering per platform** (Lina F1). (a) Native look everywhere, iOS tinted with the on color only — cost: the off state uses system colors, so token parity is partial. (b) iOS custom `ToggleStyle` drawing token geometry (keeps Toggle semantics — Kenya verifies), Compose `Switch` with token colors and M3 geometry, web drawn — cost: Android 52×32 vs web/iOS 56×32. **Lina's lean.** (c) Drawn on all three with explicit switch semantics — cost: full visual parity, the most accessibility code to own.
- **P-2 — iOS label pressability** (Lina F2; Kenya). (a) Whole row toggles everywhere — cost: departs from the iOS Settings idiom. **Lina's lean.** (b) iOS: only the switch toggles, a recorded platform deviation — cost: a cross-platform difference in tap behavior to document and test.
- **P-3 — Form participation** (Lina F3; Sparky). (a) None — cost: a "remember me" switch inside a form must use the checkbox. **Lina's lean.** (b) Form-associated with `name`/`value` — cost: blurs the § 3 teaching sentence and adds form-association surface Spec 128 would bind.
- **P-4 — Inline error** (Lina F4). (a) Excluded; failure = consumer revert + G5 — cost: until G5 ships, a failed save has no system-owned message. **Lina's lean.** (b) `errorMessage` prop — cost: a field-error affordance for what is a transient event, and a prop G5 would later make redundant.
- **P-5 — Controlled only** (Lina F5). (a) `checked` required — cost: more consumer code in the simple case. **Lina's lean.** (b) Uncontrolled default, as the checkbox — cost: revert-on-failure becomes non-deterministic.
- **P-6 — On-track color** (Lina F6; Ada measures, Peter reviews). (a) `color.action.primary` (cyan300) — cost: may fail 1.4.11 for the track edge (Lina's estimate ~2.1:1). (b) Reuse a cyan400 select semantic — cost: borrows a border/text name for a fill. (c) New semantic C5 over cyan400 — cost: one more token. **Lina's lean: (a) if Ada's measurement passes, else (c).**
- **P-7 — Role contract concept** (Lina F7). (a) Reuse `accessibility_role` (Chip-Base precedent; no ballot) — cost: less searchable by concept. **Lina's lean.** (b) Propose `accessibility_switch_role` by ballot (the `radiogroup_role` / `progressbar_role` precedent) — cost: a Concept Catalog ballot on the critical path.
- **P-8 — How Spec 128's dependency is recorded** (mine). (a) A one-line dependency in 128's STUB outline: "no settings-toggle binding before 130 merges" — cost: an edit to a STUB in my seat; small. (b) 130 is simply expected to land first, nothing recorded — cost: relies on sequencing memory, which is the failure mode G1's third trigger exists to catch. (c) 128 records the switch as unavailable and binds no toggle until it is — cost: same edit as (a), stated from 128's side. I see no defensible case for (b); it is listed because it is the default if nobody acts.
- **P-9 — Class option: forward references to components that do not exist** (mine). The switch gap was pointed at in fourteen places in four different wordings ("Toggle component when available", "switch or toggle component", `componentGap` hints, "Settings toggle — use Input-Checkbox-Base"), and the same "when available" form already exists for Textarea and Search (Form-Inputs family doc § "When to Use Form Inputs"). (a) Fix this instance only (§ 7.1) — cost: the next component to land repeats the grep, and a missed reference keeps steering agents to a placeholder. (b) Give forward references one form (a named gap id, e.g. `gap: G1`) and a cheap check that lists every live reference to a gap id, run when a gap closes — cost: a convention, a small script, and one migration of existing references; it touches Lina's catalog files, so it is her consult before it is anyone's recommendation. **Not vetted with Lina yet**; carried to R1 as an option, not a recommendation.

## 12. Reviewers (Spec Feedback Protocol § "Stakeholder Identification")

- **Lina** — **required, R1**: component owner; reads this outline against her inbound and settles or reopens § 3; rules P-7; owns § 7.1's catalog edits and the P-9 consult.
- **Ada** — required: token co-owner; C1–C6, the contrast measurements behind P-6/C5/C6, C4's dark-theme value, and the C-8 tier question.
- **Leonardo** — required: the consumer; confirms v1 covers his rows, owns § 7.2, weighs in on P-2 and on the excluded label-less case.
- **Kenya** — required: iOS; verifies P-1 (b) keeps Toggle semantics, rules P-2, confirms helper-text reading under VoiceOver.
- **Data** — required: Android; M3 geometry vs drawn (P-1), the `toggleable(role = Role.Switch)` row under TalkBack.
- **Sparky** — required: web; the `<button role="switch">` base, Enter handling, P-3, forced-colors rendering, the § 7.3 binding note.
- **Stacy** — optional at outline; **required at the requirements and tasks rounds** for verifiability, especially § 10's announcement-evidence classes.

## 13. What formalization needs next (requirements.md gate)

1. R1 round on this outline (§ 12), with Lina first.
2. Ada's contrast measurements folded (C5/C6 resolved to created-candidate or dropped).
3. Peter's rulings on P-1 through P-9, or an explicit direction to carry any of them into the requirements round as open items.
4. Incorporation woven into this outline (not appended), and Peter's approval of the outline.
5. Then requirements.md, EARS-pattern, with § 10's documentation requirements, under the sequential formalization gate (Spec Feedback Protocol § "Sequential Formalization Gate").

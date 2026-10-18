# Design Outline: 130 — Input-Switch-Base (the on/off switch, gap G1)

**Date**: 2026-10-17
**Spec**: 130 — Input-Switch-Base
**Author**: Thurgood (spec formalization, per Peter's 2026-09-19 authoring ruling)
**Status**: **DRAFT for Peter's read (R0); Ada's token read folded (2026-10-17, § 6).** No reviewer round has run. Nothing here is built, scaffolded or created; no token exists because of this file.
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
| `interaction_focus_ring` | Visible focus ring from `accessibility.focus.*`. **No 3:1 claim**: the ring is a fixed cyan300 in every context and measures 1.98 on the light canvas (Ada) — a system defect outside this unit (§ 9 C-9). | all |
| `interaction_hover` | `blend.hoverDarker` on the track. | web |
| `interaction_pressed` | Press feedback; Android ripple. | all |
| `accessibility_reduced_motion` | Instant thumb move and color change under reduced motion. | all |
| `accessibility_touch_target` | Interactive row at least `tapAreaRecommended` tall. | all |
| `content_helper_text` | Helper text read with the control. | all |

**Excludes** (each with its reason line): `state_disabled` (standard reason), `state_indeterminate`, `validation_form_integration` (if P-3 (a)), `state_error` (if P-4 (a)).

### 5.3 Immediate-apply semantics and the G5 hand-off

The switch applies on change and owns **none** of the failure UI. On a failed save the consumer reverts `checked` (by `state_controlled`) and raises the transient "Couldn't save that change. Try again." message, announced politely (WCAG 4.1.3). Until G5 ships, that message is platform-native (ledger's interim). **The outline fixes this boundary so no one adds a failure prop to the switch to fill G5's gap.** Rapid re-toggling while a save is in flight is the consumer's sequencing to own, and requirements must say so explicitly (§ 10).

## 6. Tokens

Lina's table and reasoning: inbound § 4. **Ada's token read (2026-10-17) is folded here; her tables are quoted verbatim.** She measured with the repo's own `contrastRatio()` (`src/color/OklchConverter.ts`, the function the `SemanticColorContrast` guard uses), on primitive values from `composedColorMap`, cross-checked against the generated `dist/DesignTokens.web.css`. Her canvas assumption: the rows sit on `color.structure.canvas` (white100 light; gray400 dark), as Leonardo's tree has them; on `structure.surface` (white200, an iOS-style grouped list) the numbers drop further. **Her headline: C5 and C6 are needed, not conditional, and C6 is wider than Lina drew it.** The record of her read is the consult she returned to the orchestrator; it is not committed in this spec directory.

### 6.1 EXISTING — all **[L]**; spot-checked **[T]** where marked; four picks corrected by Ada

`color.action.primary` **[T]** · `color.contrast.onAction` **[T]** · `color.feedback.select.border.default` **[T]** · `border.emphasis` · `accessibility.focus.color` / `.width` / `.offset` · `motion.selectionTransition` **[T]** · `motion.buttonPress` **[T]** · `scale096` (**primitive**) · `blend.hoverDarker` · `blend.pressedDarker` · `tapAreaRecommended` (**primitive**) · `typography.labelMd` + `color.text.default` **[T]** · `typography.caption` + `color.text.muted` **[T]** · `space.inset.050` · `space.related.normal` · `space.grouped.minimal` · `radius.full`.

Ada: "All exist and none is deprecated." `tapAreaRecommended` and `scale096` "as primitives are correct picks: no semantic exists for either, and both have prior context." **Four picks are wrong or wrongly described** (Ada, verbatim):

| # | Lina's pick | Ada's read |
|---|---|---|
| 1 | `color.action.primary` as the on fill | "fails 1.4.11. Details in (d)." → replaced by **C5** (§ 6.2) |
| 2 | `color.feedback.select.border.default` (gray200) as off border and off thumb | "As the border on the dark canvas it measures 2.32. As the thumb on white300 it measures 2.70 (Lina estimated ~3). It also fails on dark today for the Input-Checkbox-Base and Input-Radio-Base unchecked borders. That is a class problem" → replaced by **C6** (§ 6.2) |
| 3 | `color.contrast.onAction` on the thumb | "only correct while the track is `action.primary`. The wcag theme flips `onAction` to white. Once the track moves to C5, the thumb should be `color.contrast.onLight` (black500). That passes in all four contexts: 6.73, 10.59, 3.94 and 8.78" → **thumb on = `color.contrast.onLight`** |
| 4 | `accessibility.focus.*` at 3:1 | "The focus ring is not 3:1. `accessibility.focus.color` is a fixed cyan300 in every context; it does not follow wcag. It measures 1.98 on the light canvas. This is a system-wide defect, outside this unit, and the outline must not claim 3:1." → **this outline makes no 3:1 claim for the focus ring** (§ 5.2, § 9 C-9) |

**Motion** (Ada (e)): "Covered; no candidate is missing." `motion.settleTransition` exists if Lina wants a fast snap with a slower color fade. Reduced motion is handled per platform, not by a token. Native Toggle and Compose Switch animate themselves, so motion tokens apply only where the control is drawn. Her surviving counter: `selectionTransition`'s description names "buttons, list items, checkboxes", not thumb movement — "a one-line wording update, not a new token" (Ada's, at the token task).

### 6.2 CANDIDATE — proposals for Ada; each **requires Peter's review before creation**

**Measured ratios against the 3:1 floor (WCAG 1.4.11), on fill against the canvas** (Ada (d), verbatim):

| Context | Pair | Ratio | Verdict |
|---|---|---|---|
| light-base | cyan300 vs white100 | 1.98 | FAIL (Lina est. 2.1) |
| light-base, rows on surface | cyan300 vs white200 | 1.71 | FAIL |
| dark-base | cyan300 vs gray400 | 4.27 | pass |
| light-wcag | teal300 vs white100 | 5.33 | pass |
| dark-wcag | teal300 vs gray400 | 1.59 | FAIL |

Single-cyan alternatives (Ada): "cyan400: 3.12 / 2.71 (fails dark, and only 2.70 on a white200 surface); cyan500: 5.20 / 1.63, and 4.50 on a white200 surface. So no single cyan works in both modes, and C5 must be theme-varying."

**C5 — theme-varying on fill. NEEDED.** (Ada's proposal, verbatim)

| Context | Fill | Fill vs canvas | Thumb (black500) on fill |
|---|---|---|---|
| light-base | cyan400 (or cyan500, below) | 3.12 | 6.73 |
| dark-base | cyan300 | 4.27 | 10.59 |
| light-wcag | teal300 | 5.33 | 3.94 |
| dark-wcag | teal200 | 3.54 | 8.78 |

The light-base value is fork **P-6**.

**C6 — theme-varying off outline, serving both the off border and the off thumb. NEEDED** (wider than Lina's conditional off-thumb). Ada: "gray200 thumb on white300 (C4 light): 2.70, FAIL. gray200 border on the light canvas: 3.64, pass. gray200 border on the dark canvas: 2.32, FAIL." Her proposal, light gray300, dark gray100:

| Use | Light | Dark |
|---|---|---|
| Border vs canvas | 5.51 | 3.41 |
| Thumb vs C4 fill | 4.09 | 5.11 |

"Those are exactly the values of `icon.navigation.inactive`. Do not reuse that token: its description limits it to navigation. The overlap does show the system lacks a general neutral indicator color."

**C4 — theme-varying neutral off-track fill. OPTIONAL** (Ada's new finding). Light white300, dark gray500. "The fill does not need 3:1 (white300 on the canvas is 1.35; gray500 on gray400 is 1.50) because the off-state outline carries the boundary." And: "An outlined off track (no fill; outline and thumb both in the off-outline color below) passes everywhere: 5.51 in light, 3.41 in dark. That is the Material 3 pattern. C4 is needed only if Lina or Peter want a filled off track." → fork **P-10**. Naming of C4/C6 → fork **P-12**. Confirmed: no theme-varying neutral fill exists today — the dark override file changes nine tokens, and `structure.surface.*` and every `select.*` token are fixed across modes.

**C1–C3 — component sizing tokens.** Ada (b): "Right layer. No semantic sizing fits." `icon.size100` (24) and `tapAreaComfortable` (56) "have the right values but the wrong meaning." On the 8-base scale: thumb `size300` (24), track height `size400` (32) = thumb + 2 × `space.inset.050`, track width `size700` (56) = 2 × thumb + 2 × inset; thumb travel 24 = space300. **Naming, per the `InputCheckbox` / `box.*` precedent**: `inputswitch.thumb`, `inputswitch.track.width`, `inputswitch.track.height` (`component: 'InputSwitch'`; Lina's `thumb.size` "is acceptable too"). One token plus arithmetic vs three → fork **P-11**.

**Platform reach**: C1–C3 apply where the control is drawn (web; iOS under P-1 (b)/(c)); on Android only the colors map (`SwitchDefaults.colors(...)`).

**Ada's order to bring to Peter** (verbatim): "1. C5: the theme-varying on fill (cyan400 or cyan500 / cyan300 / teal300 / teal200), with the thumb moved to `color.contrast.onLight`. 2. C6: the theme-varying off outline (gray300 / gray100). 3. C4 (white300 / gray500), only if a filled off track is chosen. 4. C1–C3, the component sizing tokens."

**Ada's decline list** (verbatim): "`action.primary` for the track; plain fixed cyan400 for the fill; `select.border.default` for the off border or thumb; reusing `icon.navigation.inactive`; reusing `select.border.rest` as a fill."

**The class behind these candidates** (Ada): the switch's failures are instances of two system gaps — nothing guards the 3:1 non-text floor (`SemanticColorContrast.test.ts` explicitly excludes it), and the select family has no dark coverage. That is the deferred contrast-queue spec; how G1 sequences against it is fork **P-13**.

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

**In scope**: tokens (C5 and C6, needed; C4 only if P-10 picks a filled off track; C1–C3, or C1 alone under P-11 (a); Ada designs, Peter reviews each); the component (types → contracts → three platforms → tests → component-meta → README → HTML canaries); migration (§ 7.1's fourteen surfaces, two family-doc ballots, index rebuilds, the D8 probe).

**Out of scope**: G5 (transient message), a label-less switch, sizes, form participation (unless P-3 (b)), any fix to Input-Checkbox-Base's schema (C-7).

**Size: medium, upper edge.** The record's "medium" holds on the component; it undercounts the token work (two theme-varying semantics, C5 and C6, measured as needed; a third, C4, if P-10 picks a filled track; plus one to three component tokens) and the migration surface (fourteen surfaces, not one). Whether that is one merge unit or two (tokens first as their own PR, since Peter reviews tokens before they land) is a tasks-phase call.

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
| C-8 | Core Goals cites `tapAreaRecommended` as a **semantic** example ("Token Selection Priority", item 1) **[T]** | It is defined in `src/tokens/TapAreaTokens.ts` as a `PrimitiveToken` **[T]** and indexed primitive **[L]**. The same Core Goals line cites `color.contrast.onPrimary`; my grep finds it only in a test file under `src/tokens/` **[T — grep only, MCP not queried]** | **Adjudicated by Ada (2026-10-17): the index is right, Core Goals is wrong.** `tapAreaRecommended` is a primitive (44 × 1.09 ≈ 48); `color.contrast.onPrimary` no longer exists (migrated to `onDark`; `ColorTokens.test.ts:1238` asserts its absence). **A Core Goals ballot is owed** — Thurgood (content consistency) + Ada (the Rosetta example); her suggested examples: `color.contrast.onAction`, and `space.inset.050` or similar for semantic sizing. Not blocking this spec; drafted separately |
| C-9 | G1 record: the switch "likely needs … on/off color semantics"; Lina's table: focus ring at 3:1 | Ada (measured): `accessibility.focus.color` is a fixed cyan300 in every context, does not follow wcag, and measures **1.98** on the light canvas. A system-wide focus-ring defect | No 3:1 focus claim in this spec (§ 5.2, § 10). The defect belongs to the contrast-queue class (fork **P-13**), not to G1 |
| C-10 | G1 record: on/off color semantics as a switch-local need | Ada (measured): the select family has **no dark coverage** — Input-Checkbox-Base and Input-Radio-Base unchecked borders are 2.32 on dark, their checked border (cyan400) 2.71; `color.action.primary` is 1.59 in dark-wcag; nothing guards the 3:1 non-text floor (`SemanticColorContrast.test.ts` excludes it) | The switch's color failures are instances of two system gaps, not switch-local. Sequencing against the class fix is fork **P-13** |

## 10. Documentation requirements to draft at formalization

Per `governance/Process-Spec-Planning.md` § "Documentation Requirements" (Governance Enforcement, line 246), requirements.md will carry Ubiquitous-pattern documentation requirements for:
- **Component README** at the component directory, with the Component Development Guide § "README-First Documentation" sections: overview, related docs, usage (web/iOS/Android), API (props table, and the § 4.2 exclusions with reasons), token consumption, accessibility (WCAG 4.1.2, 1.4.1, 1.4.11 with Ada's measured ratios per context, 2.1.1, 2.4.7, 4.1.3 for the G5 hand-off; each cited per contract; no focus-ring 3:1 claim while C-9 stands), platform notes (the P-1/P-2 outcomes).
- **HTML canaries** (Component Development Guide workflow step 6).
- **`component-meta.yaml`** carrying the § 3 teaching sentence as selection guidance.
- **Family doc + companion YAML** (§ 7.1), by ballot, read-both protocol.
- **Token documentation** for each candidate Peter approves (Token Quick Reference / family doc — Ada).
- **A sibling-parity requirement** (§ 3 counter-argument): shared label/helper/focus/tap-area choices between Input-Checkbox-Base and Input-Switch-Base are asserted by a test, not by prose.
- **Evidence class for announcement criteria**: "announces '<label>, switch, on'" on iOS and Android has no CI harness today (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`). Requirements must say whether each such criterion is met by a unit-level semantics assertion, a manual assistive-technology check, or both — so the claims pass has something decidable to verify.
- **Consumer sequencing** (§ 5.3): rapid re-toggle during a save is the consumer's to own, stated in the README.

No waiver is proposed.

## 11. Open forks for Peter

Options with costs; leans are the proposer's and are marked. Forks P-1 through P-7 are Lina's F1–F7 (P-6 rewritten on Ada's measurements); P-10 through P-13 come from Ada's token read. **P-9 and P-13 are the class-level options** (Agent-Directory § "Present one class-level option"): P-13 is Ada's and vetted in her consult; P-9 is mine and not yet vetted. **P-2, P-3 and P-7 want their platform or catalog reviewer's R1 read before a ruling is meaningful** — Peter may rule now or let R1 converge them first.

- **P-1 — Rendering per platform** (Lina F1). (a) Native look everywhere, iOS tinted with the on color only — cost: the off state uses system colors, so token parity is partial. (b) iOS custom `ToggleStyle` drawing token geometry (keeps Toggle semantics — Kenya verifies), Compose `Switch` with token colors and M3 geometry, web drawn — cost: Android 52×32 vs web/iOS 56×32. **Lina's lean.** (c) Drawn on all three with explicit switch semantics — cost: full visual parity, the most accessibility code to own.
- **P-2 — iOS label pressability** (Lina F2; Kenya). (a) Whole row toggles everywhere — cost: departs from the iOS Settings idiom. **Lina's lean.** (b) iOS: only the switch toggles, a recorded platform deviation — cost: a cross-platform difference in tap behavior to document and test.
- **P-3 — Form participation** (Lina F3; Sparky). (a) None — cost: a "remember me" switch inside a form must use the checkbox. **Lina's lean.** (b) Form-associated with `name`/`value` — cost: blurs the § 3 teaching sentence and adds form-association surface Spec 128 would bind.
- **P-4 — Inline error** (Lina F4). (a) Excluded; failure = consumer revert + G5 — cost: until G5 ships, a failed save has no system-owned message. **Lina's lean.** (b) `errorMessage` prop — cost: a field-error affordance for what is a transient event, and a prop G5 would later make redundant.
- **P-5 — Controlled only** (Lina F5). (a) `checked` required — cost: more consumer code in the simple case. **Lina's lean.** (b) Uncontrolled default, as the checkbox — cost: revert-on-failure becomes non-deterministic.
- **P-6 — Light-base value of C5, the on fill** (Lina F6, rewritten on Ada's measurements; Ada designs, Peter reviews). `color.action.primary` is out: 1.98 on the light canvas, 1.59 in dark-wcag (§ 6.2). C5 is theme-varying either way (dark-base cyan300, light-wcag teal300, dark-wcag teal200); the fork is light-base only. (a) **cyan400** — 3.12 on the canvas, black thumb 6.73; closer to the brand cyan; cost: a thin margin on the canvas, and 2.70 (FAIL) if rows ever sit on a white200 surface. (b) **cyan500** — 5.20 on the canvas, 4.50 on a white200 surface, black thumb 4.04; cost: much darker than the brand cyan, so the restrained "cyan only on the active switch" direction reads differently. No lean recorded by Ada.
- **P-7 — Role contract concept** (Lina F7). (a) Reuse `accessibility_role` (Chip-Base precedent; no ballot) — cost: less searchable by concept. **Lina's lean.** (b) Propose `accessibility_switch_role` by ballot (the `radiogroup_role` / `progressbar_role` precedent) — cost: a Concept Catalog ballot on the critical path.
- **P-8 — How Spec 128's dependency is recorded** (mine). (a) A one-line dependency in 128's STUB outline: "no settings-toggle binding before 130 merges" — cost: an edit to a STUB in my seat; small. (b) 130 is simply expected to land first, nothing recorded — cost: relies on sequencing memory, which is the failure mode G1's third trigger exists to catch. (c) 128 records the switch as unavailable and binds no toggle until it is — cost: same edit as (a), stated from 128's side. I see no defensible case for (b); it is listed because it is the default if nobody acts.
- **P-9 — Class option: forward references to components that do not exist** (mine). The switch gap was pointed at in fourteen places in four different wordings ("Toggle component when available", "switch or toggle component", `componentGap` hints, "Settings toggle — use Input-Checkbox-Base"), and the same "when available" form already exists for Textarea and Search (Form-Inputs family doc § "When to Use Form Inputs"). (a) Fix this instance only (§ 7.1) — cost: the next component to land repeats the grep, and a missed reference keeps steering agents to a placeholder. (b) Give forward references one form (a named gap id, e.g. `gap: G1`) and a cheap check that lists every live reference to a gap id, run when a gap closes — cost: a convention, a small script, and one migration of existing references; it touches Lina's catalog files, so it is her consult before it is anyone's recommendation. **Not vetted with Lina yet**; carried to R1 as an option, not a recommendation.
- **P-10 — Off track: filled or outlined** (from Ada (c); decides C4). (a) **Filled** — C4 (white300 / gray500) as the off fill, C6 as outline and thumb; cost: one more theme-varying token, and the fill itself sits at 1.35 / 1.50 against the canvas (the outline carries the boundary). (b) **Outlined** (no fill; outline and thumb both C6) — the Material 3 pattern, passes everywhere (5.51 light, 3.41 dark); cost: departs from the iOS filled-track look, and interacts with P-1 (native iOS draws its own off track). Ada: "a design fork, not mine to pick." Lina and Leonardo read it at R1.
- **P-11 — Sizing: three component tokens or one plus arithmetic** (Ada's surviving counter in (b)). (a) **One** (`inputswitch.thumb`), with track height = thumb + 2 × `space.inset.050` and width = 2 × thumb + 2 × inset derived in each platform; cost: three platforms each carry the arithmetic, and it diverges from the checkbox, whose equally derivable box is tokenized. (b) **Three** (`inputswitch.thumb`, `inputswitch.track.width`, `inputswitch.track.height`); cost: two tokens that restate a derivation. **Ada's lean: (b)** — "every platform gets constants."
- **P-12 — Naming family for C4 and C6** (Ada (c)). (a) **Extend `color.feedback.select.*`** (e.g. `color.feedback.select.fill.default`); cost: "feedback" is the wrong word for control chrome, and the family's names are already odd ("rest" means selected). (b) **New `color.control.*` family**; cost: a new family, and the checkbox and radio stay on `select.*`, so on/off chrome lives in two families. **Ada's lean: (a)** — the checkbox and radio already express on/off through `select.*`. Bears on P-13: the queue spec would add select-family dark overrides.
- **P-13 — Sequencing against the contrast queue (class option, Ada's, vetted)**. The class: nothing guards the 3:1 non-text floor, and the select family has no dark coverage (§ 9 C-9, C-10). The fix is a non-text pairing in the `SemanticColorContrast` guard plus select-family dark overrides — the deferred contrast-queue spec, `.kiro/issues/2026-09-12-semantic-contrast-adjudication-queue.md`, whose deferral trigger (125-B campaign close) **has fired**. Class cost: Input-Checkbox-Base, Input-Radio-Base and Chip-Filter visibly change in dark mode; Peter adjudicates the colors; larger than G1. Surviving counter (Ada): doing the class fix first delays G1; doing switch-only tokens first risks the switch and the checkbox drifting apart until the queue spec reconciles them. (a) **G1 tokens now, queue spec after**, with a reconciliation line in this spec (the queue spec re-measures and may re-point C5/C6); cost: possible token churn, and a window where the switch passes 3:1 and its checkbox sibling does not. (b) **Queue spec first**, G1 waits; cost: G1 waits behind a larger, design-adjudicated spec while the placeholder keeps its wrong role. (c) **G1 tokens designed to the queue's rules now** (theme-varying, measured against the non-text floor in all four contexts, named where the queue would put them — which P-12 decides), so they survive the queue spec unchanged; cost: G1 pre-commits naming and rules the queue spec has not yet formalized, and this spec carries the queue's first instances. No lean recorded; it is Peter's sequencing call.

## 12. Reviewers (Spec Feedback Protocol § "Stakeholder Identification")

- **Lina** — **required, R1**: component owner; reads this outline against her inbound and settles or reopens § 3; rules P-7; owns § 7.1's catalog edits and the P-9 consult.
- **Ada** — required: token co-owner. **Her R1 is a read on her own fold-in** (§ 6, § 9 C-8 to C-10, P-6, P-10 to P-13): did this outline quote her correctly and draw the right forks from her read. The C-8 Core Goals ballot is drafted with her separately.
- **Leonardo** — required: the consumer; confirms v1 covers his rows, owns § 7.2, weighs in on P-2 and on the excluded label-less case.
- **Kenya** — required: iOS; verifies P-1 (b) keeps Toggle semantics, rules P-2, confirms helper-text reading under VoiceOver.
- **Data** — required: Android; M3 geometry vs drawn (P-1), the `toggleable(role = Role.Switch)` row under TalkBack.
- **Sparky** — required: web; the `<button role="switch">` base, Enter handling, P-3, forced-colors rendering, the § 7.3 binding note.
- **Stacy** — optional at outline; **required at the requirements and tasks rounds** for verifiability, especially § 10's announcement-evidence classes.

## 13. What formalization needs next (requirements.md gate)

1. R1 round on this outline (§ 12), with Lina first.
2. Ada's R1 read on her fold-in (§ 6); her measurements are already folded (C5, C6 needed; C4 optional).
3. Peter's rulings on P-1 through P-13, or an explicit direction to carry any of them into the requirements round as open items.
4. Incorporation woven into this outline (not appended), and Peter's approval of the outline.
5. Then requirements.md, EARS-pattern, with § 10's documentation requirements, under the sequential formalization gate (Spec Feedback Protocol § "Sequential Formalization Gate").

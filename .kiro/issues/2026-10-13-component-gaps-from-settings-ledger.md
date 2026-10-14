# Component gaps and tool lessons from the Settings-screen ledger

**Date**: 2026-10-13
**Owner**: **Lina** (components and the Application MCP). Per-item co-owners are named where they differ.
**Trigger (record as a whole)**: Peter's merge of this record's PR. That starts G6 (my first pick, see § Priority). Every other item waits on its own named trigger below.
**Closes when**: every item below has either executed (fix merged) or moved into a spec or its own record. The outcome is recorded here, dated, and then this file is `git mv`'d to `archive/`.
**Source**: `.kiro/issues/2026-10-12-leonardo-settings-call-ledger.md`. Its § "Component gaps surfaced" routes G1–G5 and two tool lessons "to Lina after Peter's go"; Lina's D-row column adds G6 and one more tool lesson.
**Ruling**: Peter, 2026-10-13: D2 = NO-GO (no Stage 2 for components); "route the gaps to Lina".
**Scope of this record**: dispositions only. No implementation, spec authoring, token creation or component creation rides this PR.

> **Naming note.** In the ledger's direction section, Leonardo used "G6" for "headings as text content". He recorded that as by design per the settings pattern, a note and not a gap. **G6 in this record is a different item**: Lina's D15 finding (Input-Radio-Set has no group label).

---

## The six component gaps

### G1 — On/off switch
- **Need**: N5. Four rows with an on/off control that applies immediately; each announced as a switch with its on/off state (N11). Ledger D3, D5, D8.
- **Catalog today**:
  - No switch exists.
  - Input-Checkbox-Base ("single boolean toggle choice … for forms and settings") is the settings pattern's own declared placeholder. It is the wrong role: it announces "checkbox, checked", not "switch, on", and it looks like a form control, not a settings switch.
  - D8's rank-1 `strong` (Nav-SegmentedChoice-Base) is a tablist whose own `whenNotToUse` says "Binary on/off toggle — use a switch or toggle component".
  - Button-CTA's `whenNotToUse` also points at a "Toggle component when available".
- **Interim specced**: Input-Checkbox-Base with helper text; the gap is named at every node. Peter chose this over a product one-off switch (fork 1 (i), 2026-10-13).
- **Disposition**: **new component, spec candidate**.
  - Family: Form-Inputs. Working name `Input-Switch-Base`; the name is settled in the spec.
  - Size: **medium** — one primitive, three platforms, contracts (switch role and state, pressable label, reduced motion), a component-meta entry, and the settings pattern's placeholder retired.
  - Likely needs track/thumb sizing and on/off color semantics, so **Ada** is co-owner for tokens. Spec formalization goes through **Thurgood**.
- **Trigger**: Peter's go to formalize, OR a second product screen needs an on/off control, OR Spec 128's first React/React Native component binding starts (a binding would otherwise be built against the placeholder).

### G2 — Modal / Dialog / Sheet
- **Need**: N8. A confirm before Delete account: title, what will be lost, Cancel and Delete, focus trapped, title announced (N11). Ledger D9.
- **Catalog today**: nothing. The Modal family is a placeholder (`governance/Component-Family-Modal.md`: Modal-Base plus planned Dialog, Sheet, Drawer and Popover). `Container-Base` `layering: modal` exists but gives no focus trap, scrim, dismissal or presentation. D9's rank-1 `strong` was Button-CTA, which goes *inside* a dialog and is not one.
- **Interim specced**: the product one-off `confirm-sheet` (Container-Base with role dialog, plus two Button-CTAs) over platform-native dialogs (`.confirmationDialog`/`.alert`, `AlertDialog`, `<dialog>`).
- **Disposition**: **new components, spec candidate**.
  - Modal family: Modal-Base plus the two semantics this screen needs (Dialog for confirm, Sheet for the iOS presentation). Drawer and Popover stay planned.
  - Size: **large** — a family primitive, focus management, scrim, dismissal and motion on three platforms.
  - The placeholder family doc gets promoted (ballot measure on the doc).
  - Co-owners: Ada (scrim/overlay color and motion tokens, if missing), Thurgood (spec).
- **Trigger**: a second product screen needs a confirm or overlay, OR G3 is formalized (they ship together; see G3).

### G3 — Destructive Button-CTA variant
- **Need**: N8. Delete account and its confirm button must read as destructive (the brief said "a red Delete"). Ledger D12.
- **Catalog today**:
  - Button-CTA `variant` is `'primary' | 'secondary' | 'tertiary'`; there is no destructive option, and the family also declares a **neutral** variant gap.
  - Error *feedback* semantics exist (`color.feedback.error.text/background/border`). Whether a destructive *action* fill with an on-color contrast pair exists is Ada's call.
  - **Content-correctness finding (my doc)**: `governance/Component-Family-Button.md` § "Visual Variant Selection" recommends "Destructive action → primary (with error color)". The component cannot do that, and a hand-rolled color override on a system component is not allowed. The row describes a capability that never shipped.
- **Interim specced**: `secondary` on the page and `primary` inside the confirm, per the Dialog Actions pattern; the copy carries the meaning. Peter chose this (fork 2 (a), 2026-10-13). My ledger judgment: right interim.
- **Disposition**: **variant/prop on an existing component (Button-CTA)**.
  - Size: **small–medium** — one prop value, a contract, tokens, three platforms, guidance.
  - **Fork for the spec, not mine to pick**: (a) a fourth `variant: 'destructive'`, which loses hierarchy because a destructive action can then be only one weight; vs (b) an orthogonal `tone: 'default' | 'destructive'` crossed with the existing hierarchy, which is more general but adds 3×2 states to test. The neutral-variant gap belongs to the same decision.
  - The family-doc row above is corrected by ballot measure in the same PR.
  - Co-owner: Ada (destructive-action semantic color, on-color contrast).
- **Trigger**: G2's spec is formalized (the confirm dialog's destructive action is where G3 lands first), OR Peter's go, whichever comes first.

### G4 — Button-VerticalList-Item trailing value + chevron
- **Need**: N4. Rows that show the current value and a "›", and open another screen; each announced as a button with its label and current value (N11). Ledger D3, D11.
- **Catalog today**:
  - Button-VerticalList-Item props are `label`, `description`, `leadingIcon`, `visualState`, `error`, `checkmarkTransition`, `transitionDelay`, `onClick`, `onFocus`, `onBlur`, `testID`. There is no trailing slot.
  - The settings pattern declares this gap itself ("detail-value row variant").
  - The interim puts the value in `description`, which sits under the label (not trailing) and has no disclosure affordance.
- **Interim specced**: `description` carries the value ("English", "List").
- **Disposition**: **prop on an existing component (Button-VerticalList-Item)**.
  - Size: **small–medium** — e.g. `trailingValue?: string` plus a disclosure chevron. Its accessible name must compose label and value.
  - It must be specified against the Set's `select` and `multiSelect` modes, which already use the trailing area for the checkmark. The likely answer is that the chevron and value are tap-mode only; the spec decides.
  - No new tokens expected (`color.text.muted` and Icon-Base exist). I'll check that at spec time.
- **Trigger**: Peter's go, OR a second screen needs value rows. It is cheap and settings-shaped, so it is the next component item after G6 and G1.

### G5 — Transient message (toast / snackbar)
- **Need**: N10. A brief "Couldn't save that change" when a switch fails to save, announced as a status message (WCAG 4.1.3). Ledger D10.
- **Catalog today**: nothing. D10's rank-1 `strong` (Badge-Count-Notification) is a count badge. **No family fits**: Badge is static, Loading is a placeholder for progress, Modal is blocking. Only Android has a native snackbar; iOS has no native toast, so "platform-native" means something different on iOS.
- **Interim specced**: a platform-native transient message.
- **Disposition**: **new component in a new family, spec candidate**.
  - Stemma Step 1 applies: no family doc exists, so a Feedback/Notification family doc must be drafted and approved (ballot measure) before scaffolding.
  - Size: **large** — new family, live-region and status contracts, timing and queueing, motion, three platforms (iOS custom).
  - Co-owners: Ada (tokens), Thurgood (spec).
- **Trigger**: a second product screen needs a transient message, OR Peter's go to open the family. It comes last because of the family-doc prerequisite and because the interim is acceptable for one screen.

### G6 — Input-Radio-Set group label (Lina's D15 finding)
- **Need**: N6. The Theme choice must be announced as a group named "Theme" (WCAG 4.1.2, plus 1.3.1 for the group relationship). Ledger D15.
- **Catalog today**:
  - Input-Radio-Set's own contract `accessibility_radiogroup_role` says "Set uses role="radiogroup" (web) **with appropriate label**". But the schema has **no** label prop (`selectedValue`, `onSelectionChange`, `required`, `error`, `errorMessage`, `size`, `testID`).
  - I found no group-label wiring in the web, iOS or Android implementations.
  - So a contract is unmet in a component whose web readiness is `production-ready`. This is a **defect**, not just a missing feature.
- **Interim specced**: "Theme" as section text above the set. That puts the text on screen but does not wire it as the group's accessible name.
- **Disposition**: **prop on an existing component (Input-Radio-Set) — a contract defect fix**.
  - Size: **small** — a group label prop (plain text, or a reference to visible text), wired on web (`aria-label`/`aria-labelledby`), iOS (group `accessibilityLabel` / `accessibilityElement(children: .contain)`) and Android (group `semantics { contentDescription }` or a heading reference).
  - Includes a behavioral contract test that fails today, a schema prop, a component-meta and README note, and an index rebuild.
  - Issue-driven, not a spec: one component, one contract, already specified by its own contracts.yaml.
- **Trigger**: Peter's merge of this record (the record's trigger).
- **Status**: ~~IN PROGRESS (2026-10-13, branch `fix/input-radio-set-group-label`)~~ → **DONE on branch, 2026-10-13; accepted at the fix PR's merge (PR #___)**.
  - Fix: a required `accessibilityLabel` prop (web attribute `accessibility-label` → `aria-label` on the radiogroup; iOS `.accessibilityLabel(accessibilityLabel)` on the `.contain` group; Android `contentDescription` beside `selectableGroup()`). Schema 2.0.0 (breaking: new required prop); `contracts.yaml` 1.1.0 turns "with appropriate label" into checkable validation lines.
  - Behavioral contract tests `accessibility_radiogroup_role: accessible name` in `InputRadioSet.test.ts` failed before the fix and pass after; the iOS/Android halves are checked by source in `InputRadioSet.stemma.test.ts`. No native build ran (no harness).
  - **Correction to "Catalog today" above**: iOS did label the group, with a hardcoded `.accessibilityLabel("Radio group")`. That names the role, not the choice, so the defect stood; the fix replaces it.

---

## Tool lessons (Application MCP — Lina's write scope)

### T1 — `validate_assembly` cannot see `product/components/` (ledger V1 vs S7)
- **What happened**: V1 reported 9 "not found in catalog" errors, all product one-offs (`text-content`, `profile-row`, `confirm-sheet`). The Product MCP indexed the same three and reported 0 gaps. The two servers disagree about what a known component is.
- **Disposition**: **defect, deferred with trigger**. The fix crosses servers and data roots. Either the Application MCP indexes `product/components/*.schema.yaml` as a further root (root resolution lives in `src/cli/shared/mcpDataRoots.ts`, Ada's packaging surface, so Ada consults), or one-off names are validated through the Product MCP. That design question is close to the MCP shared-code class charter (2026-10-13, Thurgood), so the two are read together.
- A cheap interim that stays in my scope, if wanted sooner: report an unknown kebab-case name as a **warning** ("not a system component; a product one-off?") instead of an error. It is not taken here.
- **Trigger**: a second product screen is specced with one-offs, OR the Product MCP stops being conceptual (a product spec ships it).

### T2 — Structured `find_components` filter rows carry no tier / `matchedOn`
- **Disposition**: **by design**. An exact-match filter (`context`, `category`, `concept`) has no confidence gradient: every returned row satisfies the filter exactly, so `matchConfidence` and `matchedOn` would carry no information. The components rubric scores keyword mode only ("structured filters are exact constraints"; Thurgood's conformance note (d) agrees). The ledger handled these rows correctly as untiered.
- **Follow-up (small, mine)**: one sentence in the `find_components` tool description (`application-mcp-server/src/index.ts`) saying filter results are exact and untiered, and that order is alphabetical, so a caller does not read order as rank.
- **Trigger**: the next change to `find_components` or its tool description.

### T3 — `validate_assembly` does not check prop values (Lina's D12 finding)
- **What happened**: `Button-CTA` with `size: "md"` passed V1. The schema type is `'small' | 'medium' | 'large'`. `application-mcp-server/src/validation/AssemblyValidator.ts` checks existence, composition and assembly accessibility only; props reach only the conditional composition rules.
- **Disposition**: **defect to fix**, in `AssemblyValidator.ts`.
  - Check string-literal prop values against schema union-literal types. Skip binding expressions (`{…}`) and non-literal types. Flag required props that are missing.
  - Size: **small**. The question of error vs warning for a bad literal is settled in the fix PR; I lean error, because an invalid literal is never right.
- **Trigger**: Peter's merge of this record. It is second in my queue after G6: small, entirely in my scope, and it stops a whole class of spec bugs reaching platform agents.

---

## Note for Leonardo's next session (do NOT fix here)

The scratch consumer's `product/experience-map/pages/settings/settings.yaml` (ledger Appendix A) and `product/components/confirm-sheet/confirm-sheet.schema.yaml` (Appendix C) set `Button-CTA` `size: md` in three places: the page Delete CTA, and the confirm and cancel buttons inside confirm-sheet. Button-CTA takes `small | medium | large`, so each should be `size: medium`. The `size: md` values on Input-Checkbox-Base and Input-Radio-Set are valid (their type is `'sm' | 'md' | 'lg'`). The appended ledger copy stays verbatim; the fix is Leonardo's, in the consumer.

---

## Priority (Lina)

**G6 → T3 → G1 → G4 → G3 + G2 (together) → T1 → G5 → T2 (rides the next touch).**

First pick, **G6**: a production-ready component fails its own accessibility contract today, and it is the smallest fix with no token or spec dependency.

---

## Outcomes

*(dated entries appended here as items execute)*

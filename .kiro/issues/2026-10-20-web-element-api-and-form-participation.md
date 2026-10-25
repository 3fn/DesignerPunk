# Web element API and form participation: one contract violation, one contract gap and five element-API defects

**Date**: 2026-10-20
**Type**: DEFECT RECORD. It records defects and fixes nothing. No component file changes with this record.
**Owner**: **Lina** (the components and their contracts are hers; she authors and edits this body under README rule 9). **Verifier**: **Sparky** (web), who verifies each fix in its owning component PR and may append dated, signed lines here.
**Trigger**: `release:next:phase-1` — E2–E7 are owed no later than **17.0.0**, which **no record plans** (`.kiro/issues/2026-10-16-blend-deprecation-next-major-doc-correction.md:17` reads "17.0.0, which no record plans"; their start condition is the 17.0.0 charter, an open process slot in the Spec 128 identity ballot, `.kiro/docs/ballots/2026-10-20-spec-128-platform-admission-identity.md` § 6, "Who charters 17.0.0, and when?"). Each item closes in its owning component PR; a release's S reads whether they have. *(Re-ruled 2026-10-25, Lina, owner, rules 9 and 11, after E1 closed at #450. The recorded intent was `release:17.0.0:phase-1` on E1's close. **I did not follow it**, because rule 1 as amended (ballot 2026-10-22-trigger-names-the-event-not-the-vehicle) forbids it for the remaining class: a P2 that would ride a later change takes `release:next:phase-1`, and 17.0.0 is a vehicle no record plans, so a token naming it would read as a deadline nobody holds. The 17.0.0 deadline stays in the prose above as the start condition. The token is unchanged from the prior line, whose E1 reading was: "the release falsity floor's due point for item E1, a P0: fixed, or waived by Peter in that release's floor batch (ballot `2026-10-18-obligation-drain-and-release-falsity-floor` M7)". Consequence, stated plainly: P2 `(guard)` records escalate to Peter at the first lapse (rule 11), so if E6 and E7 are unfixed at the next release's S this record goes to Peter with spec / drop / fix-now.)*
**Class**: P2 obligation (guard) · defect *(re-classed 2026-10-25, Lina, rule 12, after E1 shipped at #450; the prior text said it is re-set when E1 ships. The highest remaining item sets the level. E2 is a contract gap with no reader misled (`(record)`). E3–E5 are element-API defects that are REASONING in a real browser, not served falsehoods. **E6 and E7 are `(guard)`**: E6's own contract validation (`Nav-SegmentedChoice-Base/contracts.yaml:362–363`) passes against an `aria-controls` that resolves to nothing, and E7 is a contract `test_approach` no test carries out. Rule 12 allows exactly one sub-tag; `(guard)` is the one that matches the weaker-than-its-claim items, and it is the stricter escalation. **Residual**: if a browser run shows E6's `aria-controls` is falsely claimed by the served contract, E6 meets M7's P0 definition and this record is re-classed P0 with a dated line (or E6 moves to its own record). That is not proven, so I do not class on it. Was, set 2026-10-20: P0 false-claim · defect, on item E1 alone (the Input-Checkbox-Base `validation_form_integration` contract, served by the application MCP, said web checkboxes take part in native form submission and the element did not). E1 is fixed and browser-verified in Chromium, so no merged item is left to read as a floor-class row.)*
**Found by**: Sparky's R1 read and Lina's cross-read on the Spec 128 identity ballot (§ 7 there). Every file:line below was **VERIFIED (Lina, 2026-10-20)** in source at `f9b82e033`. Anything about runtime browser behaviour is marked **REASONING**: Jest/jsdom is not a browser, and nothing here was run in one.
**Walked**: monthly, in the health check's active-charter walk (README rule 6).
**Status**: **OPEN** for E2–E7. **E1 is FIXED and closed** (merged 2026-10-24/25 as #450, `07cfb7c41`), browser-verified in Chromium 152.0.7977.149 (Sparky's lines under E1); Safari 16.4+ and Firefox are still owed (Sparky). E2–E7 are unfixed. *(2026-10-25, Lina, owner, rules 5 and 9: E1 closed at its fixing PR's merge. Was: "**OPEN**. E1 has a fix on branch `fix/checkbox-form-participation-e1` (2026-10-23), not yet merged and not yet browser-verified; E1 closes only with Sparky's browser line (§ \"What closes this record\"). E2–E7 are unfixed." The Trigger line and Class are unchanged by this line; see the 2026-10-25 line under E1 for what the merge left open.)*

---

## Why this is its own record

These defects are owed to **plain web consumers**, whatever Spec 128's F-6 decides. They are not a React cost (Spec 128 ballot § 2, F-6, "Sequencing"). F-6's sequencing rule is that generated React wrappers do not ship before this cleanup.

**Relation to `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md`**: that record holds the True Native ballot's routed drawn-control items (I1, A1–A7, W1, W2). It closes item by item in owning PRs, with Kenya, Data and Sparky verifying. This record is a different class: web element-API and form-participation defects, plus one contract violation and one contract gap. Nothing here duplicates an item there. A component PR that fixes items from both records names both IDs.

---

## E1. Input-Checkbox-Base violates its own required `validation_form_integration` contract on web (P0)

- **The contract**: `src/components/core/Input-Checkbox-Base/contracts.yaml:143–161` reads "Checkbox participates in native form submission. Value is included in form data when checked." It is `required: true` with `platforms: [web, ios, android]`. Input-Checkbox-Legal inherits it (`Input-Checkbox-Legal/contracts.yaml:4`, `inherits: Input-Checkbox-Base`). Both READMEs repeat the claim (`Input-Checkbox-Base/README.md:46`, `Input-Checkbox-Legal/README.md:106`).
- **The element**: the native `<input type="checkbox" name=…>` is rendered **inside the shadow root** (`Input-Checkbox-Base/platforms/web/InputCheckboxBase.web.ts:103` `attachShadow`, `:457` `name`, `:474` `type="checkbox"`). The element is not form-associated: no `static formAssociated`, no `attachInternals`, no `setFormValue`. Across all 34 web components, only `Input-Radio-Base/platforms/web/InputRadioBase.web.ts:83` (`formAssociated = true`) and `:121` (`attachInternals()`) are. Legal also renders in its own shadow root (`InputCheckboxLegal.web.ts:88`).
- **What does work**: form **reset**. It is wired by hand: a listener on the closest ancestor form (`InputCheckboxBase.web.ts:341–343`, `:353–355`), tested at `__tests__/InputCheckboxBase.test.ts:482–512`.
- **REASONING**: a form owns only controls in its own tree, so a checkbox inside a shadow root is not in the outer form's `FormData` or submission. This needs a real browser to confirm (see E7).
- **Fix shape (Lina's read; the fix PR decides)**: make the element form-associated with `ElementInternals` (`setFormValue` on check/uncheck, plus `formResetCallback`, which replaces the hand-wired listener). This is additive, so it need not wait for a major. The alternative, narrowing the contract to exclude web, would make the contract match by giving up the behaviour. That is a contract change, and it is Peter's call if it is ever proposed.
- **Not verified**: what "native form submission" means on iOS and Android. Neither platform has an HTML form, and this record does not examine the native implementations.

### E1 fix (2026-10-23, Lina) — branch `fix/checkbox-form-participation-e1`, awaiting merge and Sparky's browser line

- **What changed**: `InputCheckboxBase.web.ts` and `InputCheckboxLegal.web.ts` are form-associated custom elements (`static formAssociated = true`, guarded `attachInternals()`, `setFormValue` on every state change, `formResetCallback`). Legal has its own internals: its wrapped Base is in Legal's shadow root, with no form owner, so it adds no entry. Behaviour matches the native checkbox: checked → `name=value` (`value` defaults to "on"; `value=""` submits ""), unchecked → no entry, indeterminate is visual only, unnamed → no entry, reset → unchecked. The D1 shape from Input-Radio-Base is carried over (a `disabled` attribute is stripped on sight; `formDisabledCallback` is a no-op), because form association would otherwise let a consumer-set `disabled` drop the value silently. The hand-wired `reset` listener stays only as a fallback where form association is unsupported.
- **Found and fixed in the same branch (VERIFIED in jsdom, before and after)**: on a Legal checkbox with the default `requiresExplicitConsent`, the user's own click was refused as a pre-check. The box drew checked, `checked` read false, the "Pre-checked state not allowed" warning fired, and any later attribute change unchecked the box. The fix exempts the Base-originated path from consent enforcement. Without it, Legal could not have submitted a value.
- **Contract**: `contracts.yaml:143–161` is unchanged. Its submission lines now hold on web. Two things stay open for Peter (in the PR body): the reset line says "restores initial checked state", while Spec 046 Requirement 8.8 and the code reset to unchecked; and the iOS/Android meaning above.
- **E7**: this branch decides that jsdom cannot prove submission. jsdom 26.1.0 (read in source) has no `setFormValue`, never calls `formResetCallback`, and does not put a form-associated element into `FormData`. The tests assert the value the component registers with a spied `ElementInternals`. Real submission needs a browser. E7 stays open for an automated real-browser lane.
- **Owed by this fix, outside Lina's write scope** (rule 10): (1) the consumer `CHANGELOG.md` `## [Unreleased]` line: "**Input-Checkbox-Base and Input-Checkbox-Legal now submit with their form on web.** A checked box adds `name=value` to `FormData` (`value` defaults to `"on"`), as a native checkbox does; before, neither submitted anything. **If you added a hidden input to work around this, remove it, or the value is submitted twice.** Setting `disabled` on either has no effect: the attribute is removed so it cannot drop the value. Needs a browser with form-associated custom elements (Safari 16.4+). Also fixed: a user's click on `Input-Checkbox-Legal` is no longer refused as a pre-check." (2) `demos/checkbox-demo.html`: add an `<input-checkbox-legal name="tos">` to the section-6 form and list every `FormData` entry, so duplicates show. (3) `governance/Component-Family-Form-Inputs.md:217` and `:1324` describe the hidden native input as what makes the form work; a ballot-model proposal is in the PR body. (4) `governance/classification-map.md` `no-disabled-states` scope 6 names Input-Radio-Base as the only D1 carve-out; Input-Checkbox-Base and Input-Checkbox-Legal now need the same carve-out in the future guard (Thurgood's register).

- **2026-10-23, browser verification (Sparky; rule 9 appended line)**: Lina's 7-step check run in **Chromium 152.0.7977.149** (real pointer clicks, hard load, fresh bundle confirmed by `formAssociated === true` on both elements), driven by the orchestrator per Sparky's runbook against `dist/browser/` built at `9e437bafd`, and **judged by Sparky**. **All 7 steps PASS, with no console error and no console warning**:
  - as loaded `[["updates","yes"]]`; marketing checked adds it once; all unchecked `[]`;
  - reset unchecks all four and `[]` (updates unchecks on reset: Lina's Open-for-Peter (1), not a failure);
  - indeterminate leaves `[["updates","yes"]]`;
  - `disabled` on Base is stripped and the value stays;
  - `form.elements` lists three `input-checkbox-base` and one `input-checkbox-legal`;
  - Legal: one real click gives `checked === true`, exactly one entry `[["tos","accepted"]]`, zero "Pre-checked state not allowed" warnings, and the box stays checked after a later attribute change (the consent-refusal fix holds); reset gives `[]`;
  - `form="outside-form"`: the entry is in outside-form's FormData (`[["outside","yes"]]`) and not in demo-form's (`[]`).
  - Extras: section 7's standalone Legal logs exactly one `consent-change`. The results table with verbatim `FormData` strings is in the PR body.
  - **One sub-check not proven**: that a Legal that has had `disabled` set still keeps its value. The attribute strip was observed on Legal; the retention read came after the form was reset in the same step. The Base equivalent is proven. The code path has the same shape, but this line does not claim it.
  - **Not run**: Safari (16.4+; the pane has none) and Firefox. **The contract's "native form submission" is browser-proven in Chromium only; Safari remains owed.**
  - **Status per this record's rule**: the fix is browser-verified in Chromium and **awaits merge**. E1 closes at the PR's merge (README rule 5/11); the P0 Class and the Trigger stay as they are, and Lina re-rules the Trigger to `merge:#<N>` / E2's `release:17.0.0:phase-1` as the Trigger line above describes. I have not edited the Status, Class or Trigger lines (Lina's, rules 9 and 12).
- **2026-10-23, follow-on (Sparky)**: the Legal-disabled sub-check above is **closed, PASS** (Chromium 152, fresh load, real pointer click): after the click `[true, "[[\"tos\",\"accepted\"]]"]`; after `setAttribute('disabled','')` `[false, true, "[[\"tos\",\"accepted\"]]"]`, so the attribute is stripped and the value is kept, as on Base. **Still owed: Safari (16.4+) and Firefox.** The status above is unchanged: browser-verified in Chromium, E1 closes at the PR's merge.

- **2026-10-25 (Lina, owner; rules 5 and 10): E1 closed at #450's merge (`07cfb7c41`).** The fix is merged and browser-verified in Chromium 152 (Sparky's lines above). Four things the merge left, each with its home:
  1. **Reset vs the contract** (the PR's `Open for Peter` (1)): **Peter has not ruled, and #450 merged with the question open.** It is filed as its own record, `.kiro/issues/2026-10-25-checkbox-reset-semantics-contract-vs-code.md`.
  2. **E7 real-browser test lane** (the PR's `Open for Peter` (2)): **Peter has not ruled, and #450 merged with the question open.** It is filed as `.kiro/issues/2026-10-25-real-browser-test-lane-for-form-participation.md`, owner Thurgood. E7 stays open here until that record has an outcome.
  3. **iOS/Android meaning of "native form submission"** (the PR's residual (3)): unexamined; the contract claims `platforms: [web, ios, android]` and neither native platform has an HTML form. It stays an unverified line of E1 above. Lina carries it into the contract's next review; no ruling is asked.
  4. **Safari 16.4+ and Firefox** (the PR's residual (4)): not run; owed by Sparky, as his lines above say. "Native form submission" is browser-proven in Chromium only until they are.
  The Trigger stays `release:next:phase-1` for E2–E7 and the Class is re-set to P2 obligation (guard) in the follow-up commit (see those lines).

## E2. Text inputs carry no form-participation contract (gap); Input-Radio-Set is borderline

- `src/components/core/Input-Text-Base/contracts.yaml` lists ten contracts (`:6`–`:237`), and none is `validation_form_integration`. Email, Password and PhoneNumber inherit Input-Text-Base (`contracts.yaml:4` in each) and add none. So no platform promises that a text field submits with a form. On web it does not: `InputTextBase.web.ts` has no `attachInternals`. Email nests `<input-text-base>` inside its own shadow root (`InputTextEmail.web.ts:50`, `:139–153`), so association and labelling would cross two boundaries.
- The concept exists in the catalog (`governance/Contract-System-Reference.md:89`, `:111`). Adding it to Input-Text-Base is a contract change, and the web element must then satisfy it (E1's fix shape).
- **Input-Radio-Set** carries `validation_group_required` (`Input-Radio-Set/contracts.yaml:45`) and no form contract. Spec 128's converged F-6 rule makes "takes part in constraint validation" part of `validation_form_integration`, so the set is borderline: either the set carries the contract, or its children's contract covers the group. This is open and decided in the contract change.

## E3. Input-Text-Base rebuilds its shadow DOM on `error-message` and `is-success`

- `InputTextBase.web.ts:189–218`: a `value` change updates the inner input directly and returns early (`:192–199`). A change to `error-message` (`:200`) or `is-success` (`:207`) falls through to `render()` (`:216–217`). `render()` rebuilds the container through `innerHTML` (`:288`), then clears and refills the shadow root (`:329` `this._shadowRoot.innerHTML = ''`).
- **REASONING (needs a real browser)**: replacing the `<input>` drops focus and caret, so live validation while the user types loses their place.

## E4. `delegatesFocus` only on three components

- Only `ButtonVerticalListItem.web.ts:273`, `ButtonVerticalListSet.web.ts:174` and `InputRadioSet.web.ts:91` pass `delegatesFocus: true`. On the text inputs and checkboxes, calling `.focus()` on the host does not reach the inner control (**REASONING**). That breaks "focus the first invalid field".

## E5. Event and property names on six generated-set components

- **ButtonVerticalListItem**: dispatches `CustomEvent('focus')` and `CustomEvent('blur')` (`ButtonVerticalListItem.web.ts:942`, `:957`). The four Input-Text files do the same (e.g. `InputTextBase.web.ts:368`, `InputTextEmail.web.ts:204`).
- **NavTabBar**: `selection-change` (`NavTabBarBase.web.ts:293`).
- **NavSegmentedChoice**: `selection-change` (`NavSegmentedChoiceBase.web.ts:345`, `:382`).
- **ChipFilter**: `selectionchange`, unhyphenated (`ChipFilter.web.ts:502–503`).
- **ButtonCTA**: property `buttonVariant` (`ButtonCTA.web.ts:323`, `:331`) where `types.ts:149` has `variant`. The `variant` attribute is observed (`:153`).
- **Button-Icon**: property `buttonVariant` (`ButtonIcon.web.ts:363`, `:434`) where `types.ts:159` has `variant`.
- **REASONING**: native focus already reaches the host, so host listeners can fire twice, and ancestors see a bubbling `focus` that native never produces. A wrapper generator maps `types.ts` mechanically, so every mismatch becomes a hand-kept exception.

## E6. NavSegmentedChoice's `aria-controls` cannot reach its panels

- The element renders in an open shadow root (`NavSegmentedChoiceBase.web.ts:81`). Each segment gets `aria-controls="${id}-panel-${value}"` (`:262–266`), and the panels belong to the adopter, outside the shadow root. The contract is `accessibility_aria_controls`, `required: true` (`Nav-SegmentedChoice-Base/contracts.yaml:352–366`).
- **REASONING**: ID references do not cross a shadow root, so the reference resolves to nothing. ARIA reference-target support, which could change this, is **UNVERIFIED**. The contract's own validation (`:362–363`) checks only that the attribute is present, so it passes against a reference that resolves to nothing. That is a guard weaker than its claim.

## E7. No test covers `FormData` submission

- The checkbox tests cover reset only (`InputCheckboxBase.test.ts:482–512`). No test in Input-Checkbox-Base, Input-Checkbox-Legal or Input-Text-Base reads `FormData` or submits a form. That is why E1 passed unseen. The contract's own `test_approach` (`contracts.yaml:157–160`, "Place checkbox in form, check it, submit / Verify value in form data") was never carried out. Whether jsdom can prove submission, or a real browser is needed, is decided in E1's fix PR.
- **2026-10-23 (Lina)**: decided in E1's fix branch: jsdom cannot prove it (see E1 fix). The new `InputCheckboxBase.form.test.ts` and `InputCheckboxLegal.form.test.ts` cover the registered value per state transition, not the submission. E7 stays open: closing it needs a real-browser test lane, which is test infrastructure (Thurgood's) and a call for Peter.

---

## Sparky's counter, recorded

A generated wrapper could ship **before** 17.0.0 with an alias table, so that the later element break is non-breaking for React. This is acceptable **only with an expiry pinned to 17.0.0** (Sparky R1; Spec 128 ballot § 2, F-6). This record does not adopt or reject it. If it is taken, the alias table's expiry is written into this record when it is.

## Not in this record

- Sparky's report of a parallel `onChange` property alongside a `change` event on the inputs and checkboxes. I did not re-verify it here, and it is not in scope.
- SSR import-safety (all 34 modules call `define` at module scope). That is vertical-wide, and it is decided by inbound § 10 Q2, not here.

## What closes this record (README rules 5 and 11)

Each item closes in its owning component PR. The PR names the item ID (E1–E7), and Sparky appends a dated line confirming the fix in a browser. E1 first: at the next release's phase 1 it is fixed or carried to Peter's floor batch. When every item has an outcome line, the record moves to `archive/`.

## Walk log

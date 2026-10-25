# Input-Checkbox reset: the contract says "restores initial checked state", the code resets to unchecked

**Date**: 2026-10-25
**Type**: DEFECT RECORD (a contract statement and the code disagree; a fork between two fixes is Peter's). It fixes nothing; no component or contract file changes with this record.
**Owner**: **Lina** (the contract and the element are hers; she edits this body under README rule 9). **Verifier**: Sparky (web), who may append dated, signed lines.
**Filed by**: Lina, under rule 10, from the `**Open for Peter**` (1) line in #450's body. **#450 merged (2026-10-24/25, `07cfb7c41`) with that question open.** Peter has not ruled on the record. Under the don't-merge-until-answered rule a merge never answers a question, so this record is the filing that rule requires. Nothing below is his answer.
**Class**: P0 false-claim · defect *(set 2026-10-25, Lina, rule 12. The Input-Checkbox-Base contract is served by the application MCP, and its `validation_form_integration` says "Form reset returns checkbox to initial state" and validates "Form reset restores initial checked state" (`src/components/core/Input-Checkbox-Base/contracts.yaml:143–161`). Sparky's Chromium 152 run (2026-10-23) saw the demo's "Receive product updates", loaded checked, become unchecked on reset. For a Base authored `checked`, the contract's statement is false at the place an agent meets it (M7's P0 definition: "a statement false in … an MCP contract"). If Peter reads "initial state" as "unchecked", the contract is not false and he says so in the floor batch; the class costs that routing and no more. Only Peter downgrades a P0. Input-Checkbox-Legal inherits the contract (`inherits: Input-Checkbox-Base`).)*
**Trigger**: `merge:#471` — the fixing PR, which closes this record (rule 11) by recording the outcome and archiving it. *(was: `release:next:phase-1` — the release falsity floor's due point for a P0: fixed, or waived by Peter in that release's floor batch (ballot `2026-10-18-obligation-drain-and-release-falsity-floor` M7). Start condition (prose): Peter's ruling between options (a) and (b) below; the fixing PR then names this record. When it merges the owner re-rules this line to `merge:#<N>` with a dated reason (rule 11). *(The brief suggested `manual` naming the fixing PR; rule 1 allows that only for a P3, and this record is P0.)*)* *(Re-ruled 2026-10-25, Lina, rules 1 and 9: the vehicle PR now exists, so the Trigger names its number, per ballot 2026-10-22-trigger-names-the-event-not-the-vehicle.)*
**Status**: **CLOSED** 2026-10-25 by #471 (`83cfae189`); see the outcome line at the foot. RULED (a) 2026-10-25 (Peter, chat, relayed; see the owner line). *(Was: "waiting on Peter's ruling. Peter has not ruled.")*

---

## The disagreement

- **Contract** (`Input-Checkbox-Base/contracts.yaml:143–161`, `validation_form_integration`, `required: true`, `platforms: [web, ios, android]`): reset "returns checkbox to initial state"; validation "Form reset restores initial checked state".
- **Code** (`InputCheckboxBase.web.ts` `formResetCallback()` → `_resetToUnchecked()`, and the fallback reset listener): resets to **unchecked**. Source comment: "Requirements: 8.8 — Form reset returns checkbox to unchecked state" (Spec 046 Req 8.8).
- **Native `<input type="checkbox">`**: reset restores the authored `checked` attribute.
- **Observed** (Sparky, Chromium 152.0.7977.149, 2026-10-23, in the E1 record): the demo's "Receive product updates" (loaded checked) unchecks on reset. A native checkbox would stay checked.
- The two agree for a checkbox that is authored unchecked, which is most of them. They differ for a Base authored `checked`.

## The fork (Peter's)

- **(a) Restore the authored state.** Native semantics. The contract holds as written. Spec 046 Req 8.8 is superseded (Peter or the spec owner amends it). A small behaviour change for anyone who relied on reset-to-unchecked. **Lina leans (a).**
- **(b) Reword the contract to "returns to unchecked".** A contract change that matches today's code, and Req 8.8. Smaller, and no behaviour change, but it gives up the native behaviour a plain web consumer expects, and it is Peter's call as a contract change.

## Surviving counter-argument to my lean

- Legal blocks a pre-checked state when `requiresExplicitConsent` is on, so for the default Legal, (a) and (b) give the same result and only Base would change. A split behaviour between Base and Legal is not a bug, but it is one more thing to document.
- (a) needs the element to remember the authored `checked` state separately from the current one. That is a new piece of state, and the attribute/property reflection rules (does a later `setAttribute('checked')` redefine "authored"?) would need a ruling of their own. (b) needs no such rule.
- Neither option was tested in a browser; the tests cover the registered value per transition, not the reset.


## Ruling (2026-10-25)

Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". At the release 16.1.0 walk (Floor batch line 8) that adopts **(a)**, restore the authored state. *Unverified by me: chat only. His words are committed in the walk record.*

## Outcome (2026-10-25)

**2026-10-25 — Lina (owner): RESOLVED-pending-merge, branch `fix/release-16.1.0-floor-lina`, in the commit that adds this line, and pending Sparky's browser line below.**
- **Code.** Input-Checkbox-Base remembers `{ checked, indeterminate }` at its **first** connect (`_defaultState`), and `formResetCallback` and the fallback `reset` listener restore it (`_resetToDefault`). Input-Checkbox-Legal remembers `checked` at first connect, after explicit consent is enforced, so a refused pre-check is never a default. Its reset goes through the `checked` setter, so a pre-check is refused if consent became required since. Neither fires `change`, `onChange` or `consent-change` on reset, matching a native reset.
- **The sub-question I raised in the walk ("whether a pre-connect property set counts as authored").** No owner pick existed for it, so Peter's words did not reach it. I took it as the owner, because it is component behaviour and the contract stays as written. The rule: the state at first connect is authored. A `checked` property set before insertion writes the same attribute, so the element cannot tell the two apart without another piece of state. "Initial state", the contract's word, is the state at first connect. A later `setAttribute('checked')` is state, not a new default. That differs from a native input, and both READMEs say so. If Peter wants native's rule (a pre-connect property set is not authored), it is a follow-up and needs a new piece of state.
- **Indeterminate.** Base also restores an authored `indeterminate`. The contract's behaviour line says "returns checkbox to initial state", and clearing an authored indeterminate would leave that line false. Native reset does not touch `indeterminate`. This is the one place where Base's behaviour is neither native's nor the old code's, and the README states it.
- **Contract.** `contracts.yaml` is unchanged; its text is now true on web. iOS and Android have no form reset to compare.
- **Spec 046 Req 8.8.** An amendment line was appended under AC 8 in `requirements.md` (AC 8's text is kept). `tasks.md` is not touched.
- **READMEs.** Base § "Form Reset" and Legal's form list, each with a "Changed in 16.1.0" note.
- **Tests.** Checkbox suites: 5 suites, 191 tests pass. Changed: the Base reset tests now cover authored checked + indeterminate restored after the user's click; authored unchecked; state set after connect is not a default; a pre-connect property set is authored; moving the element keeps the first default; no change event or `onChange`; the fallback listener both ways. Legal: an authored pre-check with `requires-explicit-consent="false"` is restored with no `consent-change`; a refused pre-check resets to unchecked. Mutation check: four mutations (Base resets to unchecked; the default is re-captured at every connect; indeterminate is always cleared; Legal resets to unchecked), and each turns tests red (7, 1, 2 and 2 tests).
- **Found while fixing. Neither is in my write scope, and both are named in the PR body:**
  - `governance/Component-Family-Form-Inputs.md` L217 (MCP-served) still says "Form reset returns checkbox to unchecked state (pre-checked checkboxes not supported per DesignerPunk philosophy)". **After this merge that sentence is false at an MCP reader**, which is the same P0 class. It needs a CORRECTION before S, either in the row-3 CORRECTION PR or by a grant to me on this branch.
  - `demos/checkbox-demo.html` L285 says "form reset always returns checkboxes to unchecked state". That is false now, and it is the page Sparky verifies on.
- **Sparky's browser line (owed, closes this record with rule 5).** Run in Chromium on the demo page: "Receive product updates" (loaded checked) stays checked across Reset; a box authored unchecked that the user checked unchecks on Reset; an authored-checked box the user unchecked comes back checked, and the FormData dump after Reset shows its entry; a default Legal the user checked unchecks on Reset; no `change` or `consent-change` fires on Reset (DevTools event listener breakpoint or console).

- **2026-10-25, browser verification (Sparky; rule 9 appended line)**: the row 8 check run in **Chromium 152.0.7977.149** (Claude desktop built-in pane, real pointer clicks, each JS expression in its own call), served from `dist/browser` built by `npm run build:browser` at `b4a4e3755` (`fix/release-16.1.0-floor-lina`), driven by the orchestrator per Sparky's runbook (`row8-e6-browser-runbook.md`; the clicks and reads were performed by the orchestrator at Sparky's direction) and **judged by Sparky from the pasted output**. Fresh load first: `typeof q('tos').onConsentChange` returned `"function"`, and the initial `FormData` was `[["updates","yes"]]`. The verbatim results are in `row8-e6-browser-results.md` (session scratchpad); each line below is the observed value:
  - Sparky, 2026-10-25, Chromium 152.0.7977.149, fix-lina@b4a4e3755: **R8-1 PASS**: authored-checked box survives Reset (fresh load, click Reset Form): `[true,true,true,"[[\"updates\",\"yes\"]]"]`.
  - Sparky, 2026-10-25, Chromium 152.0.7977.149, fix-lina@b4a4e3755: **R8-2 PASS**: authored-unchecked box the user checked unchecks. After the click `[true,"[[\"marketing\",\"yes\"],[\"updates\",\"yes\"]]"]`; after Reset `[false,"[[\"updates\",\"yes\"]]"]`.
  - Sparky, 2026-10-25, Chromium 152.0.7977.149, fix-lina@b4a4e3755: **R8-3 PASS**: authored-checked box the user unchecked comes back. After the click `[false,"[]"]`; after Reset `[true,true,"[[\"updates\",\"yes\"]]"]` (property, inner input, and the FormData entry all restored).
  - Sparky, 2026-10-25, Chromium 152.0.7977.149, fix-lina@b4a4e3755: **R8-4 PASS**: default Legal the user checked unchecks. After the click `[true,"[[\"updates\",\"yes\"],[\"tos\",\"accepted\"]]"]`; after Reset `[false,"[[\"updates\",\"yes\"]]"]`.
  - Sparky, 2026-10-25, Chromium 152.0.7977.149, fix-lina@b4a4e3755: **R8-5 PASS**: no events on Reset. After marketing on, updates off, ToS on (`[true,false,true]`, 16 events logged by the clicks), one call `(ev.length=0, form.reset(), [...])` returned `[false,true,false,[]]`: no `change`, `onChange`, `consent-change` or `onConsentChange` entry.
  - Sparky, 2026-10-25, Chromium 152.0.7977.149, fix-lina@b4a4e3755: **R8-6 PASS**: the demo's "Form Reset" note contains "authored state" (`true`), so the build carries the corrected L285 text.
  - Sparky, 2026-10-25, Chromium 152.0.7977.149, fix-lina@b4a4e3755: **R8-X PASS** (extra, not in Lina's six): injected form with Base authored `indeterminate`, `checked` set as a property before insertion, `checked` attribute set after connect, all then flipped, then `f.reset()`: `[true,true,false,"[[\"pb\",\"y\"]]"]`. An authored `indeterminate` is restored, a pre-connect property set counts as authored, and a later attribute set is state and not a new default. That last point is the owner's sub-question rule above, observed as stated.
  - **Status per this record's rule**: all six checks and the extra PASS in Chromium. The behaviour is browser-verified and awaits merge. Safari and Firefox were not run (not in the pane). I have not edited the Status, Class or Trigger lines (Lina's, rules 9 and 12); Lina adds rule 5's outcome line and archives at the merge.

## What closes this record (rules 5 and 11)

Peter's ruling on (a) or (b) is on the record, the fixing PR (the code and Req 8.8 for (a); `contracts.yaml` and both READMEs for (b)) names this record, and Sparky appends a dated line confirming reset in a browser. Then the owner adds rule 5's outcome line and archives it.

## Owner line (2026-10-25, Lina, rule 9): RULED (a), before S

On Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". *Unverified here: chat only (chat, relayed). Peter may confirm the relay on the PR; his words are now committed in this record.* Read against the 16.1.0 walk (row 8). The adoption is of my recommendation, **(a)**: restore the authored state. The contract holds as written; Spec 046 Req 8.8 is superseded and the fixing PR amends it, which is Peter's authority exercised by this ruling.
- **Status**: no longer waiting on Peter. The Start condition in the Trigger line is met by the ruling above.
- **Inside (a), still mine to decide in the PR and say so in its body**: whether a pre-connect property set counts as authored (my ask in the walk's line 8). My default: the authored state is the `checked` attribute present at connection, and a later `setAttribute` does not redefine it.
- **Branch**: `fix/release-16.1.0-floor-lina`. About half a day plus one Chromium run by Sparky, whose dated line closes the verification. The E7 claim fix rides the same PR (see the web-element record).
- **Trigger**: stays `release:next:phase-1`. I change it to `merge:#<N>` when the fixing PR opens.
- **Surviving residual**: the new authored-state piece and its reflection rule, and the Base/Legal split, as written above.

*Signed: Lina, 2026-10-25.*

## Outcome line (rule 5; Lina, 2026-10-25)

**Closed by #471, merged 2026-10-25 as `83cfae189`** (branch `fix/release-16.1.0-floor-lina`); the Trigger `merge:#471` is met. **Status**: **CLOSED**. **Claimed**: the served `validation_form_integration` contract says form reset "returns checkbox to initial state", and the code reset to unchecked. **Closed**: ruling (a), restore the authored state, as ruled by Peter (chat, 2026-10-25, relayed verbatim in the Ruling section above), merged as `48b6dae8c`: Input-Checkbox-Base restores `{ checked, indeterminate }` as of first connect, Legal restores `checked` after consent is enforced, neither fires `change` on reset, Spec 046 Req 8.8 amended, both READMEs and `governance/Component-Family-Form-Inputs.md` L217 and `demos/checkbox-demo.html` L285 corrected. The contract text is unchanged and now true on web. **Browser**: Sparky's lines above, Chromium 152.0.7977.149 at `b4a4e3755`: R8-1 to R8-6 and R8-X PASS. Safari and Firefox were not run. Checkbox suites 191 tests; four mutations each turn tests red. The fix closed it; no waiver was taken.

**Stays open (each with its owner and record; none blocks this close):**
- *Peter, optional follow-up (Lina)*: if he wants native's rule (a pre-connect property set is not authored), it needs a new piece of state. Nothing asks for it now; it is the "Surviving residual" in the owner line below.
- *Real-browser coverage of form participation (Thurgood; Peter's call)*: `2026-10-25-real-browser-test-lane-for-form-participation.md`. The jsdom tests do not prove submission; E7's lane stays open there and in `2026-10-20-web-element-api-and-form-participation.md`.

*Signed: Lina, 2026-10-25.*

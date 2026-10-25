# Input-Checkbox reset: the contract says "restores initial checked state", the code resets to unchecked

**Date**: 2026-10-25
**Type**: DEFECT RECORD (a contract statement and the code disagree; a fork between two fixes is Peter's). It fixes nothing; no component or contract file changes with this record.
**Owner**: **Lina** (the contract and the element are hers; she edits this body under README rule 9). **Verifier**: Sparky (web), who may append dated, signed lines.
**Filed by**: Lina, under rule 10, from the `**Open for Peter**` (1) line in #450's body. **#450 merged (2026-10-24/25, `07cfb7c41`) with that question open.** Peter has not ruled on the record. Under the don't-merge-until-answered rule a merge never answers a question, so this record is the filing that rule requires. Nothing below is his answer.
**Class**: P0 false-claim · defect *(set 2026-10-25, Lina, rule 12. The Input-Checkbox-Base contract is served by the application MCP, and its `validation_form_integration` says "Form reset returns checkbox to initial state" and validates "Form reset restores initial checked state" (`src/components/core/Input-Checkbox-Base/contracts.yaml:143–161`). Sparky's Chromium 152 run (2026-10-23) saw the demo's "Receive product updates", loaded checked, become unchecked on reset. For a Base authored `checked`, the contract's statement is false at the place an agent meets it (M7's P0 definition: "a statement false in … an MCP contract"). If Peter reads "initial state" as "unchecked", the contract is not false and he says so in the floor batch; the class costs that routing and no more. Only Peter downgrades a P0. Input-Checkbox-Legal inherits the contract (`inherits: Input-Checkbox-Base`).)*
**Trigger**: `release:next:phase-1` — the release falsity floor's due point for a P0: fixed, or waived by Peter in that release's floor batch (ballot `2026-10-18-obligation-drain-and-release-falsity-floor` M7). Start condition (prose): Peter's ruling between options (a) and (b) below; the fixing PR then names this record. When it merges the owner re-rules this line to `merge:#<N>` with a dated reason (rule 11). *(The brief suggested `manual` naming the fixing PR; rule 1 allows that only for a P3, and this record is P0.)*
**Status**: **OPEN** — waiting on Peter's ruling. Peter has not ruled.

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

## What closes this record (rules 5 and 11)

Peter's ruling on (a) or (b) is on the record, the fixing PR (the code and Req 8.8 for (a); `contracts.yaml` and both READMEs for (b)) names this record, and Sparky appends a dated line confirming reset in a browser. Then the owner adds rule 5's outcome line and archives it.

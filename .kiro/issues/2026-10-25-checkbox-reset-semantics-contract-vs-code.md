# Input-Checkbox reset: the contract says "restores initial checked state", the code resets to unchecked

**Date**: 2026-10-25
**Type**: DEFECT RECORD (a contract statement and the code disagree; a fork between two fixes is Peter's). It fixes nothing; no component or contract file changes with this record.
**Owner**: **Lina** (the contract and the element are hers; she edits this body under README rule 9). **Verifier**: Sparky (web), who may append dated, signed lines.
**Filed by**: Lina, under rule 10, from the `**Open for Peter**` (1) line in #450's body. **#450 merged (2026-10-24/25, `07cfb7c41`) with that question open.** Peter has not ruled on the record. Under the don't-merge-until-answered rule a merge never answers a question, so this record is the filing that rule requires. Nothing below is his answer.
**Class**: P0 false-claim · defect *(set 2026-10-25, Lina, rule 12. The Input-Checkbox-Base contract is served by the application MCP, and its `validation_form_integration` says "Form reset returns checkbox to initial state" and validates "Form reset restores initial checked state" (`src/components/core/Input-Checkbox-Base/contracts.yaml:143–161`). Sparky's Chromium 152 run (2026-10-23) saw the demo's "Receive product updates", loaded checked, become unchecked on reset. For a Base authored `checked`, the contract's statement is false at the place an agent meets it (M7's P0 definition: "a statement false in … an MCP contract"). If Peter reads "initial state" as "unchecked", the contract is not false and he says so in the floor batch; the class costs that routing and no more. Only Peter downgrades a P0. Input-Checkbox-Legal inherits the contract (`inherits: Input-Checkbox-Base`).)*
**Trigger**: `release:next:phase-1` — the release falsity floor's due point for a P0: fixed, or waived by Peter in that release's floor batch (ballot `2026-10-18-obligation-drain-and-release-falsity-floor` M7). Start condition (prose): Peter's ruling between options (a) and (b) below; the fixing PR then names this record. When it merges the owner re-rules this line to `merge:#<N>` with a dated reason (rule 11). *(The brief suggested `manual` naming the fixing PR; rule 1 allows that only for a P3, and this record is P0.)*
**Status**: **OPEN**, RULED (a) 2026-10-25 (Peter, chat, relayed; see the owner line at the foot). Fix owed before S. *(Was: "waiting on Peter's ruling. Peter has not ruled.")*

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

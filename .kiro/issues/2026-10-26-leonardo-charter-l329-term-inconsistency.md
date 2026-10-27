# Leonardo's charter L329 sets product tokens apart from "Rosetta (system tokens) or Stemma (component tokens)", which reads component tokens as outside "system tokens"; the scoped creation rule puts them inside

**Date**: 2026-10-26
**Filed by**: Leonardo, under README rule 10, for the promise in `[LEONARDO R3]` item 5 on `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (commit `de11865bc`, PR #493, on `origin/chore/ballot-system-tokens-and-planning`, not on `main` at filing): "I will bring it as a CORRECTION after application, in my file". The promise named no record and no trigger, so nothing fired it (Stacy R3; Ada R5). This record is the record and the trigger. Every line below was read at `origin/main` `6615a6774`. Rule 9 applies to every later edit.
**Owner**: Leonardo (the charter's Product Configuration Context prose is his seat's text). Thurgood's `governance/DesignerPunk-Integration-Guide.md` L697 carries the same inconsistency and is his; the two corrections are worded together (see "Consulted").
**Class**: P2 obligation (record) · defect *(set 2026-10-26, Leonardo, rule 12. The record's form is wrong and no reader is misled into a wrong act: L329 states no creation rule, and the rule that governs creation names component tokens in its own words, so a reader of the scoped rule is not led to treat a component token as outside review. It is P2 and not P3 so that the promise cannot lapse silently as an unrecorded plan line: a P3 would take `manual`, and the claims pass counts this among the promised records. It is not `(guard)`: no guard or instrument is weaker than its claim here.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. The earlier event, stated in prose: after ballot `2026-10-26-system-token-review-and-token-planning`'s application merges, the fixing CORRECTION PR opens and this trigger is re-ruled to `merge:#<N>` of that PR (rule 11: Trigger changed in a diff carrying a dated reason and authority). No `merge:#<N>` token is written now because the application PR does not exist at filing and the ballot is unratified; the application's PR number is not mine to guess.

---

## Finding

`canonical/agents/leonardo.md` L329, at `6615a6774`, inside § "Product Tokens":

> Products define product-level values in `product/tokens/{category}.yaml` — values that don't belong in Rosetta (system tokens) or Stemma (component tokens): layout constraints, motion characteristics, product-specific colors.

**The term it conflicts with.** "System tokens" in the scoped rule. L329 sets two parallel parentheses: Rosetta is glossed "(system tokens)" and Stemma is glossed "(component tokens)", so a reader takes component tokens to be a separate kind from system tokens. The creation rule as the ballot's site 1 and site 2 set it, and Product-Token-Governance L40 as it stands on `main`, say otherwise:

- `governance/Product-Token-Governance.md` L40: "Component tokens are orthogonal — they are system-level tokens with component-scoped consumption, governed by Ada + Lina." Component tokens are inside "system-level tokens".
- `governance/Token-Governance.md` § "Token Creation Governance" L168–171 (current text): "Creating ANY token (semantic, primitive, or component) requires human review." The ballot's after-text (site 2) scopes this to system tokens and defines them to include component tokens, declared with `defineComponentTokens()` (Lina R1 item 4). That after-text is a draft until the ballot ratifies and applies.

So L329 uses "system tokens" for the Rosetta tokens only (primitive and semantic), while the rule it sits beside uses "system tokens" for primitive, semantic and component tokens. Same words, two extents: an inconsistency of terms. It is not a trap: L329 states no creation rule, and the scoped rule names component tokens in its own words, so reading L329 does not change what a reader may create. The cost is a charter that teaches a vocabulary the governing text does not use, and a reader who learns "system token" from L329 and then reads the scoped rule meets the term with a wider extent.

**Where it was found.** Ada, drafting the ballot (`[ADA R2]`, § 5): she listed L329 and `governance/DesignerPunk-Integration-Guide.md` L697 ("values that don't belong in Rosetta (system tokens) or Stemma (component tokens)") as the two sites that "read component tokens as outside 'system tokens'", and did not edit either because neither states a creation rule. She asked me and Thurgood whether either is a trap for a reader of the scoped rule; my answer is `[LEONARDO R3]` item 5 ("an inconsistency of terms, not a trap").

## The fix

A CORRECTION of L329's prose in `canonical/agents/leonardo.md` (and its regeneration, as the generator run requires), in a governance path: `canonical/agents/**` prose, so the PR carries an Edit-kind line (ballot 2026-10-18-governance-edit-kinds): `**Edit kind**: canonical/agents/leonardo.md L329 — CORRECTION (this record; truth: governance/Token-Governance.md § "Token Creation Governance" as amended by ballot 2026-10-26-system-token-review-and-token-planning, and governance/Product-Token-Governance.md L40)`. The truth is the scoped rule's definition and PTG L40; the correction restores L329 to that term and changes no rule.

**Worded together with Thurgood's L697 CORRECTION**: the two CORRECTION PRs use the same term for the same extent (Thurgood R2 item 6). This record leaves the wording to the PR, by design: if it fixed a sentence here, a second copy of the wording would exist to drift from Thurgood's. Whichever PR opens second reads the first's term before it words its own, and cites it.

**Who applies, and no grant is claimed here.** `canonical/agents/**` is outside Leonardo's standing write scope (his charter's write scope is `.kiro/specs/**`, `docs/specs/**`, `product/**`, `.kiro/issues/**`), and a grant is never authored only in the diff it bounds, nor granted over a governance-law path (rule 8, rule 10). The fixing PR's brief names who applies it and what grant or direction covers that; Leonardo supplies the wording and the owner's confirmation.

**The charter's re-sign.** The ballot's application re-signs Leonardo's `#out-of-scope` unit; L329 is in § "Product Tokens" (the `#product-tokens` units are Sparky, Kenya and Data's, with Leonardo's own units read against the overlay set). Whether L329's edit moves a signed unit's hash, and so whether it owes a re-sign or re-confirm, is read at the fixing PR by running the generator and the signing check; it is not asserted here.

## Closing

The record closes under rule 5 in the fixing PR: a dated outcome line appended here, in the same PR, citing the CORRECTION's commit; then `git mv` to `archive/`. If Thurgood's L697 CORRECTION merges first and its term differs from the one Leonardo would have chosen, the outcome line says which term was taken and why.

**Consulted**: Thurgood — his L697 correction is worded together with this one (his R2 item 6)

*(2026-10-27, Leonardo, owner)* **Vehicle**: the fix rides the one CORRECTION PR that Thurgood's `.kiro/issues/2026-10-27-integration-guide-l697-component-tokens-term.md` names (§ "Vehicle"). L697 and L329 land in one PR so the two lines match: L329 in my words, applied byte for byte by Thurgood.
- That PR is not open. The Trigger stays `release:next:phase-1` and is re-ruled to `merge:#<N>` of that PR when it opens.
- Plans row 7 of the ballot gives my C1 intent, `merge:#<application PR>`. I do not take it: the application PR (#535) does not carry L329, so that token would fire before the fix exists.
- L329 is item `product-tokens-where` of my `#product-tokens` unit. That unit is retained and has a confirmation section, so the correction owes Thurgood's re-author of the item and my re-confirm. It owes no re-sign.
- I owe Thurgood the L329 wording at his L697 record's pending consult.

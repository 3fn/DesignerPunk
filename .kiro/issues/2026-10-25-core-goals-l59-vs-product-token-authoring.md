# Core Goals L59 ("Creating ANY token: Always requires human review") reads against Product-Token-Governance's authoring workflow, where platform agents add product tokens with review by audit

**Date**: 2026-10-25
**Owner**: Ada (token governance; the resolution is one sentence in Core Goals or in Product-Token-Governance, and both are Rosetta-adjacent law she is consulted on)
**Consulted**: Leonardo — product-token authoring is his consumers' workflow (he authors them at screen specification; the platform agents who add them during implementation are his consumers). His read is **owed in R1 of the application** of `.kiro/docs/ballots/2026-10-25-token-selection-order-one-rule.md`; it does not block this filing.
**Filed by**: Ada, under README rule 10, in the #480 draft PR (branch `chore/ballot-token-selection-order-r2`), from her R1 and R2 reads of that ballot (§ 1; § 4 "Not edited"; § 11 step 11). Rule 9 applies to every later edit.
**Class**: P2 obligation (record) · defect *(set 2026-10-25, Ada, rule 12. The record is wrong in one of two places and no consumer is blocked: a reader of Core Goals L59 and a reader of Product-Token-Governance § "Authoring Workflow" are told opposite things about who may create a product token, but the indexer enforces naming and rationale mechanically either way and the workflow is the one in use, so no reader is misled about what the system does. The resolution is a Core Goals or Product-Token-Governance sentence, which is LAW, so P2 and not P3.)*
**Trigger**: `release:next:phase-1` — closes at the application PR's merge or at the next Core Goals ballot, whichever comes first; the trigger becomes `merge:#<N>` at that PR's open. *(Set 2026-10-25, Ada, rule 9. A P2 record that would ride another change takes `release:next:phase-1`, then `merge:#<N>` once the vehicle PR exists, per rule 1.)*

---

## What is wrong

Read at `4512dd72e`.

- `.kiro/steering/core-goals.md` L59: "**Creating ANY token**: Always requires human review — no autonomous token creation." `governance/Token-Governance.md` L186 says the same ("Creating ANY token (semantic, primitive, or component) requires human review. ... AI agents should never autonomously create tokens.").
- `governance/Product-Token-Governance.md` § "Authoring Workflow" (L56–62): "**Platform agents** (Sparky, Kenya, Data) may add product tokens during implementation when they discover needs not anticipated in the screen spec." There is no per-token human checkpoint. The review is the indexer (naming and `rationale` presence, mechanically) and a later governance audit of rationale quality (L230: "Thurgood and Stacy review this during quality audits, not the indexer at index time").

Both cannot be read as written for a product token. A platform agent that follows the product workflow breaks L59 as a reader would take it; a platform agent that follows L59 cannot use the workflow it is given.

**This ballot did not cause it.** Both texts predate `2026-10-25-token-selection-order-one-rule`, which changes neither sentence. It surfaced because the ballot's site 2 rewrites the nearby Core Goals L73–74 order and its site 8 repoints Product-Token-Governance L77 ("per Core Goals token priority"), which put the two documents side by side. **L59 stays after site 2; Token-Governance L186 is unchanged.**

## The fork (the pick is Peter's)

- **(A) Tighten Product-Token-Governance to a checkpoint.** A platform agent proposes a product token and a human (Leonardo, as the vertical's naming authority, or Peter) approves it before it is authored. L59 and L186 stand as written. *Cost*: the workflow slows at the point the document was written to speed it, and it adds a routing step Product-Token-Governance L56–62 deliberately omits ("enforcement is the indexer's job, not a human routing step").
- **(B) Scope L59 (and L186) to system tokens.** "Creating ANY system token ... requires human review"; product tokens are governed by Product-Token-Governance, where review is the indexer plus a later audit. *Cost*: it narrows a rule stated as non-negotiable, and it makes the audit the only human look at a product token, which is a weaker guard than the sentence a reader takes from L59 today.

**Ada's pick: (B)**, with the product side's limit stated in the same sentence: a product token is `ref:` to a system token where one is within tolerance (Product-Token-Governance § "System-First Value Selection"), so the human-review rule stays where a new value enters the system, and the audit covers the product vertical where a value stays inside one consumer's scope.

**What survives against (B):** the Rosetta rule that creation needs a human exists because "token creation is an architectural decision that affects the entire design system" (Token-Governance L188). A product token affects one vertical, which is the argument for (B), but a `value:` product token with a thin rationale is a new design value created with no human in the loop and caught only if an audit later reads it. (A) closes that and (B) does not. If Peter reads that as an unacceptable gap, (A) with the checkpoint limited to `value:` tokens (a `ref:` token needs no review) is the middle he can pick; Ada did not take it because it splits one workflow into two and leaves "product token" ambiguous in the review rule.

**Not folded in:** whether the audit cadence is frequent enough to stand as the review for (B). That is Thurgood's and Stacy's to say, and no audit of product-token rationale quality has been run in this record's reading.

## Fix shape

One sentence in whichever document Peter's pick names, in the ballot's application PR or at the next Core Goals ballot. The application PR closes this record by a dated outcome line (rule 5) and cites this file in its close-out line (ballot § 11 step 11). Leonardo's read of the product workflow is owed in R1 of the application.

## Outcome of the application (2026-10-25, Ada) — what it changed, and what it left open

Written under README rule 5 for the application PR #491 of `.kiro/docs/ballots/2026-10-25-token-selection-order-one-rule.md` (head `2a3a2e678`), as § 11 step 11 asks. **The application did not decide this record's fork, so this is not a closing outcome and the file stays at the root.**

- **Core Goals L59 ("Creating ANY token: Always requires human review") is byte-unchanged**, as the ballot said it would stay (§ 4 "Not edited"). The ballot's Core Goals edits are at L51 (`MUST use semantic tokens first, except a component's own token inside that component …`, F-2 (B)), L58 (`Component tokens: Use freely inside the component they belong to, for the property they were made for; any other use requires explicit human approval`, F-1 (b) with F-2 (B)) and L61 (the token-selection section replaced by one pointer line to Token Governance § "Token Selection Matrix"; the construction rule moved to Token Governance, F-3 (A)). None of these touches who may create a token. `governance/Token-Governance.md` § "Universal Rule: Human Review Required" ("Creating ANY token … requires human review", L169 in the PR) is also unchanged.
- **`governance/Product-Token-Governance.md` L77 was repointed** (site 8): "Check semantic tokens first per Core Goals token priority" became "Check semantic tokens first, then primitives, in the order of Token Governance § "Token Selection Matrix"; step 5 below decides `ref:` or `value:`." That removed a reference to a section Core Goals no longer holds. It states no per-token checkpoint, and § "Authoring Workflow" (L56–62) is unchanged.
- **So the contradiction stands as filed**: L59 and Token-Governance L169 read "any token needs human review", and Product-Token-Governance § "Authoring Workflow" lets platform agents add product tokens with review by audit. Neither the (A) nor the (B) of "The fork" was applied, and Peter has not ruled between them. The F-1 (b) class rule the ballot adds ("A use-time checkpoint applies only where that use was not reviewed when the token was made") is about using a token, not creating one, and does not answer it.
- **The Trigger's prose is not met.** It said the record "closes at the application PR's merge or at the next Core Goals ballot, whichever comes first". The merge does not close it. The Trigger token (`release:next:phase-1`) is unchanged, so no firing event is passed and the record is not lapsed by this PR's merge. Open owed acts, unchanged: Peter's pick of (A) or (B); Leonardo's read of the product workflow (his R1 on the application, owed per "Consulted" above; I find no entry from him on this record at the head above); Thurgood's and Stacy's read of whether an audit cadence can stand as the review under (B).
- **Counter-argument to leaving it open**: the application PR is the vehicle this record named, and a record whose named vehicle merged without resolving it invites a quiet archive. *What survives*: archiving here would delete an unresolved contradiction in always-loaded law from the walk's view; the honest status is "application merged, fork open", and the next walk reads it that way.

*Signed: Ada, 2026-10-25.*

## Ballot drafted (2026-10-26, Ada)

Peter resolved the fork in chat on 2026-10-26, relayed verbatim by the orchestrator (*unverified here: chat only*). He chose (B), scoping, and added a planning duty: *"creating system tokens needs human review"* and *"product teams should surface and discuss token gaps during planning and before implementation"*, then *"Proceed as the team recommends"* (00:38:29Z). The DRAFT ballot is `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md`. It scopes L59, Token-Governance L186–188, the register row's `rule:`, Ada's asserted string and `.cursor/rules/tokens.mdc` L23 to system tokens. It adds the duty to Product-Token-Governance § "Authoring Workflow" and Web-Authoring-Standards L102, L239 and L281. It scopes four charter Out-of-Scope lines (Leonardo, Sparky, Kenya, Data). Leonardo's consult surfaced two forks for Peter (§ 8: F-A, the escape hatch's shape; F-B, who "discussed" is with). The record stays open: its trigger is unchanged and becomes `merge:#<N>` when the ballot's application PR opens. That PR closes this record by a dated outcome line (ballot § 12 step 11).

## Leonardo's read (2026-10-26) — the product-token authoring workflow, as its owner

Appended under README rule 9 (any seat may append a dated, signed line). This is the read the "Consulted" header owed. It does not re-argue the ballot.

- **Where the resolution lives.** Peter ruled the two texts reconcilable on 2026-10-26 (his reframe, 00:28:49Z: creating system tokens needs human review; product teams surface and discuss token gaps during planning and before implementation). Ballot `2026-10-26-system-token-review-and-token-planning` (#493) codifies it: item 1 scopes human review to system tokens (the fork's (B)), item 2 adds the planning duty. The fork, the open acts and the Trigger are read there; my R1 on that ballot is the full text of my read.
- **My position as the authoring owner.** Product tokens are mine to plan and author at screen specification. The planning duty belongs at spec time: the spec's `tokens:` blocks name every token a screen uses and every need no system token covers, so the discussion happens before the build and not ad hoc during it. A platform agent that finds a missed need surfaces it to me as a Tier 1 clarification; it does not fill it silently, and it never becomes a hard-coded or `props:` value. That is the workflow this record's "What is wrong" section reads against L59, and under (B) the two no longer conflict.
- **Leans, unchanged from my R1.** F-A: (i), stop and ask on the one value, with the nearest system token as the interim. F-B: (c), a human reads the token list at spec time and I decide missed needs. The picks are Peter's. The surviving cost I named stands: under (c) a non-colour `value:` token found mid-build reaches a human only as a line in an Implementation Report, so I am the only check on its rationale until the implementation-time check exists.
- **Open acts left to the others, as filed**: Peter's pick of F-A and F-B; Thurgood's and Stacy's read of whether an audit cadence can stand as the review. Nothing about the record's status or Trigger changes with this line.

*Signed: Leonardo, 2026-10-26.*

## Ratified (2026-10-27, Ada)

Appended under README rule 9.

- **The ballot is ratified whole.** Ballot `2026-10-26-system-token-review-and-token-planning` is **RATIFIED (Peter, 2026-10-26/27)**. Its Status line quotes his relayed words with the orchestrator's clock bounds, and labels "Ada's plan" as the orchestrator's reading.
  - **Item 1** resolves this record's fork as **(B)**: L59, Token-Governance § "Token Creation Governance", the register `rule:`, Ada's asserted string and `.cursor/rules/tokens.mdc` L20 are scoped to system tokens.
  - **Item 2** adds the planning duty, with **F-A (i)**, **F-B (c)** and **F-A-h (h1)**.
  - The orchestrator's earlier split reading (item 2 carried to Spec 129) is withdrawn and was never applied.
  - Leonardo's read above stands as written. Its assumption, "under (B) the two no longer conflict", holds under the whole ballot, so no `[@LEONARDO]` line is owed.
- **Close and trigger.** The application PR closes this record by a dated outcome line (ballot § 12 step 11). When that PR opens, the Trigger becomes `merge:#<N>` (rule 1). It is not changed now, because the PR does not exist yet.
- **The open acts this record named are answered**:
  - Peter's pick: (B), plus item 2.
  - Leonardo's read: appended above, and his C1 in the ballot's § 13.
  - Whether an audit cadence can stand as the review: answered by item 2's planning duty and item 3's checks rather than by an audit alone. The follow-ups are in the ballot's § "Plans (Peter's condition)".

*Signed: Ada, 2026-10-27.*

# Web-Authoring-Standards § "Common Mistakes" L373–375 teach "create the product token" for a hard-coded gap, where L239 now says the spec names the token or the gap is surfaced

**Date**: 2026-10-27
**Filed by**: Lina, under README rule 10, in the application PR of ballot `2026-10-26-system-token-review-and-token-planning` (#535; § 5 "Not edited"; § 12 step 11; § "Plans (Peter's condition)" row 4; [LINA R2] item 5; flagged by [SPARKY R1] item 4). Read at the application branch head `5a563ce37`.
**Owner**: Lina (`governance/Web-Authoring-Standards.md` is her file). Sparky consulted on the replacement.
**Class**: P3 improvement · defect *(set 2026-10-27, Lina, rule 12. The ✅ line is right whenever the screen spec names that token; it teaches the wrong act only for a need the spec missed, which L239 now routes to Leonardo and a marked gap. The doc's own L239 and L102 carry the rule, in the section Sparky is routed to for this moment, so a reader who follows the routes is not misled; the example is the only place a reader who skims the code blocks meets the old "create it" shape. Not P0: no statement in the example is false, it is incomplete against L239. The counter-reading (P2 `(record)`, Sparky R1 item 4 rated the risk low, so not higher): Common Mistakes is the part of the doc an agent copies from, and the ❌'s label names "without creating product token" as the failure, which for a missed need is now the opposite of the rule. Stacy may read it otherwise; that is a finding to Peter, never an upgrade by her.)*
**Trigger**: `merge:#539` *(re-ruled 2026-10-29 by Lina, rules 1, 9 and 11: the fixing PR exists, #539 (`fix/web-authoring-common-mistakes-token-gap`, head `39a80eff0`), and the event that owes the close is its merge, at which I add rule 5's dated outcome line and archive the record. Authority: this record's own plan, which named this re-rule at #535's merge; Peter's ratification of the ballot that the PR corrects against. Was: `merge:#535`, the application PR, which fired as designed at `0577bb24cd98`.)*

---

## The three lines (read through a tool at `5a563ce37`, `governance/Web-Authoring-Standards.md` L373–375, inside § "Common Mistakes", the closing code block)

```
/* ❌ Hard-coded value without creating product token */
gap: 24px; /* "I'll tokenize this later" — no you won't, session memory is lost */
/* ✅ */ gap: var(--product-spacing-gap-section-spacing);
```

## Why they no longer fit

- L239 (§ "Product Token Authoring (Sparky)" → "The Rule", applied by #535): a value no system token covers is a product token. If the screen spec names it, use it. If the spec does not, it is a need the spec missed: Sparky surfaces it to Leonardo as a Tier 1 clarification, uses the nearest system token with a `/* token-gap: <need> */` marker (or leaves the value out with the marker), and **the gap is never filled with a hard-coded value**. The product token is written only once the screen spec names it. Product-Token-Governance § "Authoring Workflow" is the rule on every platform.
- **L373's ❌ label** says the fault is "without creating product token". Under (i) that is the fault only when the spec names the token; for a missed need, creating one is not Sparky's act.
- **L374** (the ❌ code and comment): still right. A hard-coded `24px` is the failure; "I'll tokenize this later" is a deferral lost to session memory, and the `token-gap` marker is the deferral that survives (it lives in source and in the batched message; Sparky R1).
- **L375's ✅** is right when the spec names `product.spacing.gap.sectionSpacing`. It carries no condition, so it reads as the answer to any gap.

## The replacement I intend (byte-ready; `<date>` and `<sha>` filled at the fixing PR)

Same three-line shape, so no line numbers move and the closing fence stays at L376. L374 is untouched. L373 and L375 change.

```
/* ❌ Hard-coded value, with no product token the screen spec names and no gap surfaced to Leonardo (§ "The Rule" above) *(Amended <date> by ballot 2026-10-26-system-token-review-and-token-planning, CORRECTION; prior text at <sha>.)* */
gap: 24px; /* "I'll tokenize this later" — no you won't, session memory is lost */
/* ✅ The screen spec names the token; for a need it missed, surface it and mark the gap (§ "The Rule" above) *(Amended <date> by ballot 2026-10-26-system-token-review-and-token-planning, CORRECTION; prior text at <sha>.)* */ gap: var(--product-spacing-gap-section-spacing);
```

`<sha>` is the base of the fixing PR (`git log -1 --format=%h origin/main`), the point at which the prior text is recoverable. The pointers sit inside the CSS comments because the lines are in a code fence; the README's superseded-text bullet (2026-10-19) requires a dated pointer, and a fence leaves no other place.

## Which kind: CORRECTION, with the one doubt named

**CORRECTION** (ballot 2026-10-18-governance-edit-kinds): the edit replaces two labels that state a rule (the ❌'s failure and the ✅'s answer) with what the named referent states. Truth referent: `governance/Web-Authoring-Standards.md` § "The Rule" (L239) as amended by #535, and `governance/Product-Token-Governance.md` § "Authoring Workflow". It adds no step, no marker form (the marker is L239's) and no example code beyond the one line already there. **The doubt**: "mark the gap" in the ✅ label names an act (the marker) that the ✅ line's code does not show, which a reader could call new content; and the CORRECTION/LAW test is "when in doubt, LAW". If Stacy's governance-edit-kind read at the fixing PR reads it so, the PR carries the LAW edit-kind line (`.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` is the nearest ballot, but a LAW edit needs its own ballot, and then this record is re-ruled to carry that). The lean is CORRECTION.

## What closes it

The fixing PR merges, and I add rule 5's dated outcome line and archive the record. Ordering: #535 merges (this record fires); I open the fixing PR from `main` after it and re-rule the Trigger to `merge:#<N>`; the PR body carries the `**Edit kind**:` line per part (L373, L375 CORRECTION) and a `**Sweep**:` line if the batch ballot 2026-10-26-release-flow-batch-16-1 (RS-40) is in force by then. Sparky is consulted on the label wording before the PR opens. Not in this record: L92, L235 and L361 (the ballot left them; they classify the value and stay true).

## Lapse (2026-10-29)

*(Appended under README rule 11 and Start Up Tasks item 9, by Lina, the owner.)* The Trigger token `merge:#535` fired at #535's squash commit `0577bb24cd98` (the application PR of ballot `2026-10-26-system-token-review-and-token-planning`), and no commit that is an ancestor of it closed this record or re-ruled its Trigger. That was by design: the fix cites L241 as amended, which reaches `main` at that merge, so the re-rule to the fixing PR could only follow it (the Trigger's own note said so). This is the record's first lapse. Its class is P3 improvement · defect, below rule 11's escalation to Peter; the record is re-ruled in the same commit as this heading. Lina.

## The fixing PR (2026-10-29)

*(Appended under README rule 9 by Lina, the owner.)* **#539** carries the fix as commit `39a80eff0f4a52e4bd810bc2100318af2baae68e` on `fix/web-authoring-common-mistakes-token-gap`, from `origin/main` `6f51055ba`: L375 and L377 of `governance/Web-Authoring-Standards.md` are replaced byte for byte from "The replacement I intend" above (`<date>` 2026-10-29, `<sha>` `6f51055ba`), L376 untouched. **Kind claimed: CORRECTION**, for the reason in "Which kind" above; the commit message states it. **The doubt is Stacy's and mine:** "mark the gap" in the ✅ label names an act the code line does not show, which her governance-edit-kind read could take as new content. The claim is that the label points at § "The Rule" (L241) for that act and states none; if that read goes the other way, the edit is LAW and needs its own ballot, and this record is re-ruled to carry it. Validation on the branch: `npm run test:scripts` 23 suites, 671 tests (audience-banner guard 22 match, 22 carry; governance-examples guard green), `check:section-citations` PASS. The record closes at #539's merge.

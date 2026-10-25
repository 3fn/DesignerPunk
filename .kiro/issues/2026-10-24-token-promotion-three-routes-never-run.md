# Promotion (product artifact → system) is described three ways, and the review it starts from has never run

**Date**: 2026-10-24
**Filed by**: Ada, under rule 10, from my Spec 131 R1 read (`.kiro/specs/131-governance-simplification/feedback/design-outline.md` § "[ADA R1]", (b) item 4). Re-read at `e4e61eea2`.
**Owners**: Ada (`governance/Product-Token-Governance.md` § "Promotion Signals"; token evaluation); Stacy (the Lessons Synthesis Review, `canonical/agents/stacy.md` § "Operational Mode: Lessons Synthesis Review"); Thurgood (`governance/MCP-Relationship-Model.md` § "Promotion Path", and the triage step it gives him). Leonardo leads the Integration Guide (`2026-10-03-integration-guide-designer-friendly-rewrite-charter.md`) and owns its L944 sentence's wording; Lina owns the component half ("Full Stemma lifecycle applies at promotion"). Each writes their own part (rule 9).
**Class**: P2 obligation (record) · defect *(set 2026-10-24, Ada, filer, rule 12. Three served texts describe one procedure three ways, and none has an instance, so the procedure's form is wrong. Not P0 as I read it: each text describes a route, not a past event, and no text says a promotion has happened. The reading Stacy may press: "Stacy's Lessons Synthesis Reviews surface these patterns" is present tense about a review with no record, which a consumer agent meets as fact. That reading would make it P0; it is hers to give, and Peter's to rule.)*
**Trigger**: `release:next:phase-1` — the next release's walk reads whether the three texts agree on one route. *(Set 2026-10-24, Ada, rule 9. A P2 that rides no named change takes the release token; no spec names this record, and my R1 placed it outside Spec 131's scope. At the second lapse it goes to Peter with spec / drop / fix-now (rule 11).)*

---

## The three routes — VERIFIED by reading

1. **Product-Token-Governance** § "Promotion Signals" (L258–266): trigger = two or more verticals define tokens for the same need; "**Process**: Stacy's Lessons Synthesis Reviews surface these patterns. Ada evaluates whether a system semantic should be created. Peter approves the promotion." Optional `promotionCandidate: true` flag on the token.
2. **MCP-Relationship-Model** § "Promotion Path" (L157–180): product discovery → Lessons Synthesis Review (Stacy) → classified "pattern candidate" or "systemic" → **Tier 3 System Escalation Request → Thurgood** → Thurgood triages to Ada (token), Lina (component) or himself → "Nothing gets promoted without human review (Peter approves routing)." Peter approves the *routing* here, not the promotion.
3. **DesignerPunk-Integration-Guide** L944: "When a product artifact proves reusable (a second product needs it, or it fills a gap in the ecosystem taxonomy), it gets promoted through **the full spec process**." No Stacy, no triage, and a second trigger (a taxonomy gap).

They differ on the entry trigger (two verticals; two verticals; a second product *or* a taxonomy gap), on the steps (two, five, a spec), and on what Peter approves (the promotion; the routing; the spec's gates).

## Never run

- `git ls-files | grep -iE 'lessons|lsr'` → empty: no Lessons Synthesis Review record exists in the repo. Stacy's charter defines the mode (`canonical/agents/stacy.md` L506). The review has not been skipped: its trigger (`governance/Product-Handoff-Protocol.md` L175 and L177, a feature or flow implemented across active platforms, or a screen with significant discoveries) has never fired, because this repo has no product screen. "Never run" means "never triggered", not "owed and not done". *(Added 2026-10-24, Ada, rule 9, on Stacy's review.)*
- `promotionCandidate` is read for product tokens: `product-mcp-server/src/indexer/ProductTokenIndexer.ts` L204 takes `entry.promotionCandidate`, L55 filters on it, and `product-mcp-server/src/index.ts` L160 exposes `get_product_tokens({ promotionCandidate })`. In `src/` it appears in `src/build/tokens/ComponentToken.ts`, `ComponentTokenGenerator.ts`, its test, and `src/build/validation/__tests__/TokenComparator.test.ts`. No one has run the query against a real product. *(Corrected 2026-10-24, Ada, rule 9, on Stacy's review, with Lina's and Thurgood's `TokenComparator.test.ts` addition. Superseded text, kept: "`promotionCandidate` appears only in `src/build/tokens/ComponentToken.ts`, `ComponentTokenGenerator.ts` and its test; no product-token schema or file reads it (UNVERIFIED beyond `grep -rln promotionCandidate src`)." It was wrong: my grep stopped at `src/`.)*
- Components have no counterpart signal (`[LINA R1]` (b), "Lifecycle check (component tier)", in the same feedback file; hers to file).

This is the gap in Peter's "The system knows how to evaluate and promote tokens and/or components" (`feedback/design-outline.md` § "[PETER R0]" item 4), which he asked Ada, Lina and Thurgood to validate outside Spec 131.

## Fix shape (one line; not done here)

The owners agree one route and one entry trigger; the three texts state it once and point to it.

## Readers (trust, but verify)

- **Stacy**: whether the review has run anywhere I did not look, and the P0 reading.
- **Thurgood**: the triage step and whether `MCP-Relationship-Model` keeps it.
- **Leonardo**: the Integration Guide sentence.
- **Lina**: component promotion.
- **Peter**: what he approves at promotion.

**No fix is authorized by this record.**

## Review (2026-10-24, Leonardo) — trust, but verify
- Checked: `governance/DesignerPunk-Integration-Guide.md:944` → the line is there and the record's quote is accurate, with two notes. (1) The quote is partial: the line goes on, "The product version becomes the reference implementation. Full Stemma lifecycle applies at promotion, not at creation." The record names the second sentence as Lina's half and does not quote it, which is fine. (2) The bold on "the full spec process" is the record's, not the guide's. The record's "No Stacy, no triage" is true of that sentence alone. The Governance Gradient table six lines above it (L936–L940) does name Stacy ("Stacy audits at synthesis", Product extending tier) and lists "spec process" in the design-system tier's review depth, so "the full spec process" reads there as the design-system tier's review, not as a fourth route invented in the guide.
- Checked: ownership → mine as guide lead (`2026-10-03-integration-guide-designer-friendly-rewrite-charter.md` Owner line: Leonardo lead; Lina CLI/sync/testing/MCP-config sections; Thurgood governance, doc-id and routing). The sentence is not new work of mine: it came in with commit `95aaf34fa` (2026-04-10, "Task 3 Complete: Agent Reframing and Integration Guide"), predating the 2026-10 rewrite, which left the Governance Gradient untouched. That charter parks "re-scoping the Governance Gradient to posture B" with no trigger set, and L944 sits inside that parked region. The wording is mine to change; the route it should state is not mine to choose (Ada/Stacy/Thurgood/Peter, per the record's fix shape).
- Checked: the record's route 3 trigger ("a second product *or* a taxonomy gap") → correct as to the guide. The guide says "a second product", while the other two routes say "two or more verticals". `MCP-Relationship-Model` § "Promotion Path" defines cross-product as cross-vertical within one organization, so "second product" and "two verticals" may be one trigger worded two ways. The record counts that as a difference; I would call it a wording drift on the same trigger, with the taxonomy-gap clause as the one real addition. I verified this only by reading both texts, not by checking any consumer.
- Checked: does the record state my part correctly → yes. "Leonardo leads the Integration Guide and owns its L944 sentence's wording" is right. I would not read "owns" as "decides the route", and the record doesn't. I will rewrite the sentence once the owners agree the route (the record's fix shape), as a pointer to the one served statement, and add no route of my own.
- Not checked: whether any Lessons Synthesis Review has run outside the repo (Stacy's), and the `promotionCandidate` grep beyond `src` (the record already marks it UNVERIFIED).
- Finding: agree. Nit: the guide's "second product" may be the same trigger as "two verticals" in different words, and the Gradient table does name Stacy near L944, so route 3 is less isolated than "No Stacy" suggests; neither changes the class or trigger.

## Review (2026-10-24, Lina) — trust, but verify
- Checked: `governance/DesignerPunk-Integration-Guide.md` L944 → the sentence is there verbatim ("promoted through the full spec process … Full Stemma lifecycle applies at promotion, not at creation"). It is the Guide's sentence (Leonardo-led wording), not a Lina-owned text; I own the component half it points at. My charter `canonical/agents/lina.md` L385 is a fourth statement of the component route ("when a product one-off proves reusable, scaffold the full Stemma structure for ecosystem inclusion"): consistent with the Guide, silent on trigger, Stacy's review and triage.
- Checked: `grep -rl promotionCandidate src` → only `src/build/tokens/ComponentToken.ts`, `ComponentTokenGenerator.ts` and two tests (one is `src/build/validation/__tests__/TokenComparator.test.ts`, beyond Ada's list). `grep -rli promot src/components` finds nothing: no component schema, meta or README carries a promotion flag or signal. `git ls-files | grep -iE 'lessons|lsr'` → empty. All reproduce.
- Finding: **agree** on the component side: no component counterpart to the token-side signal exists, there is no instance of a component promotion, and the Tier 3 route to Lina (MCP-Relationship-Model) has never been exercised. Component-side nuance: components are admitted by a Stemma-lifecycle path (family doc, contracts, readiness tracking), so "promotion" for a component is a tier change (one-off to ecosystem) rather than a token-style evaluate-and-create. That difference is part of what the single route has to state. I will file the component promotion signal as the record's Lina part when the owners start on the route; I have not filed it now. Gap: I did not read `MCP-Relationship-Model.md` L157–180 line by line; I relied on Ada's description for the Thurgood triage step.

*Signed: Lina, 2026-10-24.*

## Review (2026-10-24, Stacy) — trust, but verify
- Checked: the three routes against their sources (`sed -n` on each) → all three quoted right. `governance/Product-Token-Governance.md` § "Promotion Signals" is L258, its "**Process**" line L264 and the `promotionCandidate` line L266; `governance/MCP-Relationship-Model.md` § "Promotion Path" is L157, with the flow block and "Nothing gets promoted without human review (Peter approves routing)" below it; `governance/DesignerPunk-Integration-Guide.md` L944 is word for word. Leonardo's nits (the bold is the record's; "second product" and "two verticals" may be one trigger in two wordings) I accept; the taxonomy-gap clause is the real difference.
- Checked: whether a Lessons Synthesis Review record exists → none. `git ls-files | grep -i lesson` → empty; the landing path `governance/Product-Handoff-Protocol.md` § "Lessons Synthesis Review" names (L211, `.kiro/specs/[spec]/completion/lessons-synthesis-[feature].md`) → `git ls-files '.kiro/specs/*/completion/lessons-synthesis-*'` → 0 files; my incremental capture file (`lessons-in-progress.md`) → 0 files. Every `git grep -il "lessons synthesis"` hit is a charter, a protocol, a spec that designs the review, or a test fixture; none is a review. One correction to the title's reading: the review has not been skipped. Its trigger (Product-Handoff-Protocol L176–178: a feature or flow implemented across active platforms, or a screen with significant discoveries) has never fired, because this repo has no product screen implementations (`git ls-files | grep -i screen`, excluding tests, fixtures and specs → no product screen; `product-mcp-server` holds only fixtures). "Never run" is true; "owed and not done" would not be.
- Checked: the record's `promotionCandidate` bullet, which it marks UNVERIFIED → **wrong as written.** Beyond `src`, `git grep -ln promotionCandidate -- product-mcp-server` → `product-mcp-server/src/{index.ts,models.ts,indexer/ProductIndexer.ts,indexer/ProductTokenIndexer.ts}`. `ProductTokenIndexer.ts` L204 reads `entry.promotionCandidate` from product-token entries, and L55 filters on it; `index.ts` L160 exposes the filter as `get_product_tokens({ promotionCandidate })`, which my charter uses for promotion monitoring. Product tokens do carry the flag, and a reader exists. What no one has done is run the query against a real product. Ada's bullet is hers to correct (rule 9).
- Checked: co-ownership → **accepted** for the Lessons Synthesis Review part (`canonical/agents/stacy.md` § "Operational Mode: Lessons Synthesis Review", including its product-token promotion monitoring bullet). Not mine: which route is the law, and the Thurgood triage step.
- Finding: **agree** with the Class `P2 obligation (record) · defect`, with the scoping above: three descriptions with different triggers and different approval acts, and no instance of any of them. **P0 read: not P0** (I do not press the reading Ada offered). "Stacy's Lessons Synthesis Reviews surface these patterns" describes the procedure that runs when its trigger fires, not a past event. A consumer agent who meets it learns how promotion is meant to work, and that is true of my charter today. The trigger is a product's second vertical, and the consumer is the first place it can fire. The three texts differ on details, but none says a thing happened that did not. Nothing for Peter from this read beyond the record's own Peter line.

*Signed: Stacy, 2026-10-24.*

## Review (2026-10-24, Thurgood) — trust, but verify
- Checked: `governance/MCP-Relationship-Model.md` § "Promotion Path", L157–182, at `e4e61eea2`: product discovery → Lessons Synthesis Review (Stacy) → "pattern candidate" or "systemic" → Tier 3 System Escalation Request → Thurgood → triage to Ada, Lina or Thurgood. L182: "Nothing gets promoted without human review (Peter approves routing)." Result: quoted right. L155 ("Inward (product → system)") states the same Tier 3 → Thurgood route for a missing component, so that is a fourth place the route is written, and it agrees with route 2. Product-Token-Governance L258–266 and Integration Guide L944 are also quoted right. `promotionCandidate` has one more hit than the record lists: `src/build/validation/__tests__/TokenComparator.test.ts`.
- Finding: **agree**, with one addition on my part. **The triage step MCP-Relationship-Model gives me appears nowhere in my charter.** `grep -n -i 'escalation\|triage\|promot' canonical/agents/thurgood.md` → 0 hits. The senders' side is written: `canonical/agents/stacy.md` L121, L379, L518 and `canonical/agents/leonardo.md` L396 route Tier 3 to me. So the route has a sender and no receiver. `git grep -l 'System Escalation Request'` finds charters and Spec 070 drafts only, and no request record anywhere. My part, for the owners' one route: either my charter gets a receiving mode (a `canonical/agents/**` edit, Peter-merged) or MCP-Relationship-Model drops the Thurgood hop. I have no preference until the owners agree the route. form: ok (Owners, Class P2 (record) · defect, Trigger `release:next:phase-1` correct for a P2 that no spec names; filer named).
- **Co-ownership accepted** for MCP-Relationship-Model § "Promotion Path" and the triage step.

— Thurgood, 2026-10-24
- Erratum (Stacy, 2026-10-24): in my review above, the Product-Handoff-Protocol trigger lines are L175 and L177, not "L176–178".

## Owner response (2026-10-24, Ada)

- **Stacy**: the `promotionCandidate` bullet and the "never run" reading are corrected in place, above (§ "Never run", both dated). Her P0 read (not P0) settles the reading I offered; the Class stays P2 (record).
- **Lina, Thurgood**: `TokenComparator.test.ts` added to the same bullet.
- **Thurgood**: the route has a sender and no receiver. Stacy's and Leonardo's charters send Tier 3 requests to him; his charter has no mode that receives them. That is a fourth defect in the same procedure, and it goes into the owners' one route: a receiving mode, or MCP-Relationship-Model drops the hop. I do not pick between them. Class and Trigger are unchanged.
- **Leonardo**: accepted. "Second product" and "two verticals" may be one trigger worded twice; the taxonomy-gap clause is the real difference. The body's count of "three entry triggers" should be read that way.

*Signed: Ada, 2026-10-24.*

## Co-owner pick (2026-10-25, Thurgood, rule 9): drop the hop

Ada's owner response left one choice to me: "a receiving mode, or MCP-Relationship-Model drops the hop." **My pick: drop the hop.** MCP-Relationship-Model § "Promotion Path" routes the Tier 3 request straight to the owning domain agent (Ada for a token, Lina for a component), and Peter arbitrates where the domain is unclear, as the Agent-Directory routing table already does. I do not add a receiving mode to my charter.
- **Effort**: one served-doc edit plus the four sender lines (`canonical/agents/stacy.md` L121, L379, L518; `canonical/agents/leonardo.md` L396), as a LAW item in the owners' one-route change, Peter-merged.
- **Surviving counter-argument**: a triage hop catches a misrouted request before it costs an owner's session. Dropping it moves that burden to the sender, who may not know which domain owns a cross-cutting gap.
- Read in the 16.1.0 walk (row 23). Nothing is edited here; the route is still the owners' to agree.

*Signed: Thurgood, 2026-10-25.*

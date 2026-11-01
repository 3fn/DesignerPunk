# A screen spec has no field that records the human lead's approval, so the departure-timing boundary for product work cannot be read from the spec

**Date**: 2026-10-30
**Owner**: **Leonardo** (filer, and the consuming seat: screen specs are mine). **Thurgood** triages the fix to the Product MCP's owner (the Product MCP is Spec 081's; no seat's charter names it).
**Filed by**: Leonardo, under README rule 10, from the departure-timing ballot's R1 (my L-3), and as the collective's row D under Peter's delegation (`.kiro/issues/2026-10-30-release-16-2-peter-rulings-and-delegation.md` @ `d34fc77868f649d3c67bd1b1da47bc6f2a805920`). Rule 9 applies to every later edit.
**Class**: P3 improvement · defect *(set 2026-10-30, Leonardo, rule 12. No served sentence is false and no consumer is blocked. A rule about to be law needs a fact the spec format cannot hold, so the rule is read from a proxy.)*
**Trigger**: `path:governance/cross-platform-vs-platform-specific-decision-framework.md`. The next commit to that file is expected to be the application of ballot `2026-10-30-departure-timing-plan-vs-build` site 1a. That is when the product boundary becomes a rule a builder applies. At that event the triage decision (below) is owed. *(Set 2026-10-30, Leonardo, rule 1. `merge:#<N>` is not available: the application PR does not exist yet. I re-rule to `merge:#<N>` when it opens, per ballot 2026-10-22-trigger-names-the-event-not-the-vehicle.)*
**Consulted**: none needed. This files a gap found in a review round. The fix route is Thurgood's triage, and any schema change is consulted there.

---

## The reader that needs the field

Ballot `2026-10-30-departure-timing-plan-vs-build` (DRAFT, PR #568, R3 head `6bad5e9b3`) sets the boundary between planning and development. For product work it is **"the human lead's dated go in the screen spec's review (Product-Token-Governance § "Authoring Workflow"), read from the spec's `status:` block once the platform's status leaves `not-started`"** (§ 2, L77). A plan with no recorded approval is still in planning (L78). A departure found before the boundary is asked of a human; one found after it is recorded, built and named.

So a platform agent (Kenya, Data, Sparky, or a consumer's) has to decide, at the moment it finds an idiom conflict, whether the screen spec it builds from carries the lead's dated go.

## What the spec format holds

- `status:` is a free map: `status: Record<string, string>` (`product-mcp-server/src/models.ts` L44). Its documented values are `not-started, in-progress, complete, blocked` (`product-mcp-server/src/index.ts` L30, `find_screens`'s `status` filter). None of them records approval.
- The Integration Guide says the value is the author's, unchecked: "`status.spec` is a value the spec's author sets, and nothing in DesignerPunk checks it: `complete` means the author says the spec is finished, not that … a person's review was confirmed" (`governance/DesignerPunk-Integration-Guide.md` L781).
- A platform's status leaving `not-started` is therefore an agent-writable proxy for "work has started", not a record that a human approved the plan. The spec has no field for the lead's go: who, when, and where their words are.
- Prior instance of the same gap: `archive/2026-10-25-consumer-screen-spec-complete-unbound.md` (a `complete` spec whose components' readiness nothing checked).

## What is owed at the trigger (triage, Thurgood)

One of these, decided by triage, not by this record:
- **(a) A field.** An optional `approval:` block in the screen spec (for example `by`, `date`, and `where`, the path or PR where the lead's own words are), stored by the indexer and served by `get_screen_spec`, plus a `find_screens` filter. The ballot's L77 reading then points at the field instead of at `status:`. Cost: an indexer and model change, an Integration Guide edit (LAW, `governance/`), and a consumer-visible MCP addition.
- **(b) Doc only.** The lead's go stays where Product-Token-Governance already puts it (the screen spec's review, in the lead's words, dated). The ballot's L77 drops the `status:` proxy, and the boundary is read from that citation. Cost: none in code. But it cannot become a Product MCP check, and every builder has to find the review by hand.
- **(c) Route to Spec 131.** 131 B (d)'s freeze treats (a)'s Integration Guide edit as new law, and the record waits for 131 to place it.

My recommendation as the consuming seat: **(a)**, because it is the only option that makes the boundary decidable by a reader without judgment. **Surviving counter**: it is a schema addition for a rule that has not been applied in a single product yet. (b) costs nothing and is honest about where the go lives.

## Outcome

*(none yet)*

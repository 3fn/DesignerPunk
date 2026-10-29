# The first product build's token-planning count: missed needs per screen, discussions that changed a token, and whether the lead's decisions reached a record

**Date**: 2026-10-27
**Owner**: Leonardo (takes the count). Rule 9 applies to every later edit.
**Reader**: Stacy reads the count at the Review as the check on it, because I would be measuring the yield of my own decisions (ballot § 4; her R1 item 6). She is the reader, not an owner.
**Filed by**: Leonardo, under README rule 10, in the application PR (#535) of ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (§ 4 "Follow-ups"; § 12 step 11; § "Plans (Peter's condition)" row 2; [LEONARDO R1] item 3, [LEONARDO C1] item 3).
**Class**: P2 obligation (record) · owed-act *(set 2026-10-27, Leonardo, rule 12. The ratified F-A (i) rests on my estimate of how often a build misses a need. That estimate is reasoning, not data (§ 10 residuals 1 and 5). This count is the only thing that tests it, and it is how F-A re-opens. No reader is misled and no check claims to measure this, so it is neither P0 nor `(guard)`. It is P2 and not P3 because a P3 `manual` record is archived stale after two unfired walks, long before a product build exists, and the claims pass counts this record among the nine.)*
**Trigger**: `manual` — the event that owes the close is the first product build's Lessons Synthesis Review: Stacy's review after the first screen built in a product repo under the amended Product-Token-Governance § "Authoring Workflow". This repo has no `product/`, so no git-visible token expresses that event here (the same reason as `.kiro/issues/2026-10-27-product-implementation-time-checks.md`).
**Grant paths**: none.
**Consulted**: none needed — ballot § 4 sets the owner, the reader and the event, and Stacy accepted the reader's seat at her R1 item 6.

---

## What is counted

Sources: the first product build's Implementation Reports (section "Decisions Made During Implementation") and the screen spec amendments.

1. **Missed needs per screen.** The token needs the spec missed, per screen and per platform. Needs raised while reading the spec, before building, are counted separately from needs found during the build.
2. **Discussions that changed the token.** Of those needs, how many ended differently from the platform agent's proposal: a different name, `ref:`, `value:` or tier; snapped to a system token; or escalated as a system gap. How many were kept as proposed.
3. **The second count** ([LEONARDO C1] item 3):
   - (a) whether the first product build had a PR gate, meaning units merge through a PR on a protected branch;
   - (b) for each decision that went to the lead under `⟦F-B2⟧` (c), a colour value or a system gap: whether the lead's decision reached a record in the lead's own words, dated, in the screen spec's review or the unit's PR, as site 3 requires.

## How it is read

- **The re-open rule is the ballot's**: a high count re-opens F-A for (iii). The ballot does not say what "high" means. So that the reading is not chosen after the numbers are known, I set mine now. It is a proposal, and Stacy may dispute it at the Review. Either of these re-opens F-A:
  - more than one missed need per screen per platform on average, which makes (i)'s relay the cost § 10 residual 5 describes;
  - fewer than one discussion in five changing the token, which is § 10 residual 1, cost with no yield.
  A re-open is a ballot. The pick between (i) and (iii) is Peter's.
- **The second count is not about F-A.** If the build had no PR gate, or a lead's decision did not reach a record, that is a finding for consumer onboarding and governance. It is filed as its own record at the Review.

## Close

At the Review, rule 5: a dated outcome line here with the three counts, Stacy's read and the outcome. The outcome is either F-A re-opened, naming the ballot draft, or not re-opened, with the reason, and it names any record filed from the second count. Then archive.

*(2026-10-29, Leonardo, owner)* **A fourth count**, from the close of `.kiro/issues/archive/2026-10-27-leonardo-gate-rule-value-token-not-trivial.md`: any `value:` product token introduced on a Trivial modification (Gate System, "minor modification") without the discussion with the lead that Product-Token-Governance § "Authoring Workflow" requires. A non-zero count re-opens that record's question, whether my route's trigger "defining a product token during screen specification" reaches minor modifications. The remedy then is the route's trigger, not the Gate System.

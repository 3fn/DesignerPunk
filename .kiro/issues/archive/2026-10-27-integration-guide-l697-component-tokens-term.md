# Integration Guide L697 sets product tokens apart from "Rosetta (system tokens) or Stemma (component tokens)", which reads component tokens as outside "system tokens"

**Date**: 2026-10-27
**Owner**: Thurgood (the Integration Guide's reference remainder is his: ballot `2026-10-03-123-b-u3-install-guide` § 4). Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, at the application of ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` ([THURGOOD R2] item 5; § "Plans (Peter's condition)" row 6).
**Consulted**: Leonardo — <pending: one wording for L697 and his charter's L329, so the two lines match>
**Class**: P2 obligation (record) · defect *(set 2026-10-27, Thurgood, rule 12; the same reading as Leonardo's L329 record. L697 states no creation rule. The rule that governs, Core Goals L59 as applied, names component tokens itself, so no reader is misled into a wrong act. It is a wrong term in a reference doc.)*
**Trigger**: `release:next:phase-1` — closes at the merge of the CORRECTION PR below, and becomes `merge:#<N>` once that PR is open. The earlier event, in prose: the ballot's application PR merges, since the falsity begins there.

---

## The line

- **`governance/DesignerPunk-Integration-Guide.md` L697** (at `bad7222ef`): "Product tokens are product-level values that don't belong in Rosetta (system tokens) or Stemma (component tokens)."
- **Truth after the application**:
  - Token Governance § "Token Creation Governance", as amended by site 2: "A system token is a Rosetta token: a primitive or semantic token in the token source, or a component token …".
  - `governance/Product-Token-Governance.md` L40: "Component tokens are orthogonal — they are system-level tokens with component-scoped consumption".
- **Sibling**: Leonardo's `canonical/agents/leonardo.md` L329 carries the same phrase. His record is `.kiro/issues/2026-10-26-leonardo-charter-l329-term-inconsistency.md` (#522).

## Vehicle

- **One CORRECTION PR carrying both lines**, so they say the same thing. L697 in Thurgood's words; L329 in Leonardo's, applied byte for byte by Thurgood as his charter's applier, with Leonardo's re-confirm and re-sign if L329 sits in a signed unit.
- The PR body carries one `**Edit kind**:` line per file, each `CORRECTION (<record>; truth: Token Governance § "Token Creation Governance" as amended, and Product-Token-Governance L40)`, Peter-merged under the governance carve-out.
- A docs MCP `rebuild_index` follows; the Integration Guide is served.
- **L851 is not this record's**: it rides R3-16's fixing PR (ballot § 4).

## Close

Rule 5's dated outcome line in the CORRECTION PR, and the archive move there.

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

## Outcome (2026-10-29, Thurgood, owner)

**Fixed on branch `fix/integration-guide-l697-leonardo-l329`, in the PR of this branch: the one CORRECTION PR that carries both lines.** The PR number is in its body, not here.
- **L697** (`governance/DesignerPunk-Integration-Guide.md`) now reads *"Product tokens are product-level values that are not system tokens (Rosetta's primitive, semantic or component tokens)."* It carries its CORRECTION pointer (prior text at `3e2c722e6`). Applied at `a8591e753`.
- **L329** (`canonical/agents/leonardo.md`) takes the same clause in Leonardo's words, applied byte for byte at `a8591e753`. At `13333ef23` its dated pointer was removed under Peter's RS-54 ruling (charters carry no inline pointer). Leonardo re-confirmed `#product-tokens` at `a6d3d128a`; no signature is owed, because the unit stays `retained`. His record (`.kiro/issues/archive/2026-10-26-leonardo-charter-l329-term-inconsistency.md`) closed in the same PR at `4c04d28b4`.
- **The consult** this record's `**Consulted**:` line left pending happened: Leonardo's fu1 read gave the wording both lines now carry. He declined my first draft ("neither Rosetta's (primitive or semantic) nor a component's (Stemma)") because Token Governance L171 makes a component token a Rosetta token.
- **Truth**: Token Governance § "Token Creation Governance" L171 ("A system token is a Rosetta token: … or a component token"), and the Systems Overview's Rosetta Layer 3, the component tokens.
- **L851** is not this record's. It rides R3-16's fixing PR.
- **Why the close is written now**: this record closes in its fixing PR (rule 11), so no Trigger re-rule is owed. If the PR does not merge, this line and the archive move do not land either.

Closed under rule 5 and archived in the same PR.

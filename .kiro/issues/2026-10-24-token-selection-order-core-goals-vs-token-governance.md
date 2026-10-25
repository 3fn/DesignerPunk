# Core Goals and Token-Governance give two different token-selection orders, both as "MUST"

**Date**: 2026-10-24
**Filed by**: Ada, under rule 10, from my Spec 131 R1 read (`.kiro/specs/131-governance-simplification/feedback/design-outline.md` § "[ADA R1]", (b) item 1) and R2 proposal 3 (§ "[ADA R2]", "(2) Proposals"). Re-read at `e4e61eea2`.
**Owners**: Ada (Token-Governance § "Token Selection Matrix", and the ambient `token-governance` embed it renders into my charter); Thurgood (`.kiro/steering/core-goals.md`, the editor named for that file in `2026-10-23-served-docs-teach-non-key-token-names.md`). Each writes their own part (rule 9).
**Decides**: **Peter.** Which order is the law is his pick (`.kiro/steering/` is his surface, and the edit is Peter-merged). Neither owner picks it.
**Class**: P0 false-claim · defect *(set 2026-10-24, Ada, filer, rule 12, on the M7 reading. Both texts are met by agent readers: Core Goals is always loaded, and ships to consumers as `designerpunk-core-goals.md`; Token-Governance is served by the docs MCP. Each says its order MUST be followed, and they cannot both be the law, so the release knows one of them is false where an agent meets it. The reading Stacy may press: a normative order is not a statement of fact, and neither text is false until Peter picks; then it is P2 (record). I keep P0 on the precedent of the served-docs record, which classed a wrong example inside this same section P0. Only Peter downgrades.)*
**Trigger**: `release:next:phase-1`. The next release's walk reads it: fixed, waived in writing, or blocking (M7). *(Set 2026-10-24, Ada, rule 9. A P0 takes the release token; the close needs one Peter answer and one edit per owner, and rides no other change.)*

---

## The two orders

**Core Goals** (`.kiro/steering/core-goals.md` L67–71, § "Token Selection Priority (MUST follow this order)"):
1. Semantic tokens
2. **Primitive tokens**
3. **Component tokens referencing primitives** — "create a component token that references the primitive"
4. Hard-coded values, with user approval

**Token-Governance** (`governance/Token-Governance.md` L37–67, § "Token Selection Matrix", "follow this priority order"):
1. Semantic concept token exists? Use it.
2. **Component token exists?** Use it (human checkpoint).
3. **Primitive token exists?** Use it (context or acknowledgment).
4. No existing token works? **Stop**: human checkpoint; the human decides component vs new primitive vs new semantic.

Steps 2 and 3 are inverted. Core Goals also puts **creating** a component token inside selection (its step 3), where Token-Governance says steps 1–3 only **use** existing tokens and step 4 is creation (its "Key Insight", L67). Core Goals' own governance list, eight lines earlier, says "Creating ANY token: Always requires human review" (L59); its step 3 says "create" without naming that checkpoint.

**Who loads both**: every seat (Core Goals is always loaded), and every seat that pulls Token-Governance; my charter embeds Token-Governance's usage rules as ambient law. A consumer's agents get both through the consumer canonical set.

`grep -rln 'Token Selection Priority\|Token Selection Matrix' .kiro/docs/ballots .kiro/issues governance/classification-map.md` → no ballot or record has ruled the order.

## Fix shape (one line; not done here)

Peter picks one order **in a ballot record**, and both texts are then rewritten to it. This is a **LAW** edit under ballot 2026-10-18-governance-edit-kinds, not a CORRECTION: a normative order has no truth referent to read it from, so the ballot comes before either text is edited (Thurgood). My R2 proposal 3 is one shape the ballot can take: Core Goals' token section becomes a pointer to Token-Governance with one order, which also removes Core Goals' part of `2026-10-23-served-docs-teach-non-key-token-names.md` (L68). Core Goals is an identity doc: the edit takes its consumer always-set re-sign and regeneration path (signatures, confirmations, overlay, `canonical/generated.lock`). *(Corrected 2026-10-24, Ada, rule 9, on Thurgood's review. Superseded text, kept: "Peter picks one order; the other text is rewritten to it. My R2 proposal 3 is one way: … Core Goals is an identity doc: the edit takes its re-sign and regeneration path.")*

## Readers (trust, but verify)

- **Peter**: the pick.
- **Thurgood**: the Core Goals edit and its identity-doc path.
- **Lina**: component tokens are hers to consume; whether "existing component token before primitive" fits how components read tokens.
- **Stacy**: the P0 reading (above).

**No fix is authorized by this record.**

## Review (2026-10-24, Thurgood) — trust, but verify
- Checked: `.kiro/steering/core-goals.md`. The § "Token Selection Priority (MUST follow this order)" heading is at L67 and the items at L68–71: semantic → primitive → "create a component token that references the primitive" → hard-coded. L59 reads "Creating ANY token: Always requires human review". Result: quoted right. `governance/Token-Governance.md` § "Token Selection Matrix", L37–65, reads semantic → component token **exists** → primitive **exists** → STOP. The "Key Insight" at L67 reads "Steps 1-3 are about USING … Step 4 is about CREATING". Result: quoted right. Steps 2 and 3 are inverted, and Core Goals' step 3 creates a token inside selection. Both texts claim the order as binding. Core Goals ships to consumers as signed copies: `canonical/_consumer-output/{cc/.claude/identity,kiro/.kiro/steering}/designerpunk-core-goals.md`, `canonical/profiles/consumer/{signatures,confirmations}/core-goals.md`, `always-set/core-goals.overlay.md`.
- Finding: **agree**. The two orders conflict, and no ballot or record rules between them; I re-ran Ada's grep and it returns nothing. **The edit is LAW, not a CORRECTION**: picking the normative order has no truth to read it from, so under ballot 2026-10-18-governance-edit-kinds Peter's pick needs a ballot record before either text is edited. The Core Goals edit then takes the consumer always-set re-sign and regeneration path (signatures, confirmations, overlay, `canonical/generated.lock`). On class, I accept P0 under M7: an agent that follows either MUST breaks the other at the place where it reads them. Stacy's counter, that a normative order is not a statement of fact, is recorded above and is hers to press. form: ok (Owners, Decides, Class level·kind, Trigger `release:next:phase-1` correct for a P0 under rule 1; filer named, rule 10).
- **Co-ownership accepted** for the Core Goals part: the edit and its identity-doc path. Overlap: the L68 example in `2026-10-23-served-docs-teach-non-key-token-names.md` is the same section. One PR closes both if Peter takes Ada's pointer form.

— Thurgood, 2026-10-24

## Review (2026-10-24, Stacy) — trust, but verify
- Checked: `sed -n 54,75p .kiro/steering/core-goals.md` and `sed -n 37,67p governance/Token-Governance.md` → both orders are as the record states. Core Goals L66 says "MUST follow this order"; it puts primitive (2) before component (3), and its step 3 says "create a component token". Token-Governance's matrix puts component (2) before primitive (3), and step 4 is STOP for any creation. One more thing the record does not state: Token-Governance's step 4 never offers "hard-coded values", which is Core Goals' step 4. So the two texts also disagree on the last resort.
- Checked: who meets each text → Core Goals ships with the order: `grep -c "Token Selection Priority (MUST follow this order)"` → 1 in `canonical/_consumer-output/cc/.claude/identity/designerpunk-core-goals.md` and 1 in `canonical/_consumer-output/kiro/.kiro/steering/designerpunk-core-goals.md`. Core Goals L62–63, in the shipped copies too, sends the reader to `get_section({ path: "token-governance", heading: "Token Selection Matrix" })` "for detailed governance". It presents the matrix as the detailed form of its own order, and the matrix inverts that order.
- Checked: prior ruling → `git grep -n -iE "Token Selection Priority|Token Selection Matrix" -- .kiro/docs/ballots .kiro/issues governance/classification-map.md`, excluding this record → no ballot or record has ruled the order. This reproduces.
- Finding: **agree** with the body and the owners. The pick is Peter's.
- **P0 read: confirm.** I tested Ada's own counter-argument, and it does not hold for me. That counter-argument says a normative order is not false until Peter picks. But the M7 test is what the release *knows*, and here the release knows that at least one shipped MUST tells its reader to do what the other forbids. That does not depend on which order Peter picks: whichever he picks, one of the two texts is false where an agent meets it. One shipped sentence is also false today, independent of the pick: Core Goals L62–63 says the matrix is the detailed form of its own order. My ground differs from Ada's. I do not lean on the served-docs precedent, because a removed key is a fact, a different kind of falsehood. The cost of P0 here is close to zero. At the release walk the row goes to Peter as an `**Open for Peter**:` line, and the record's close needs his answer anyway.
- Note for the fixer, not a finding: if Peter takes Ada's R2 proposal 3 (Core Goals' section becomes a pointer), L62–63 and L66–71 go together, and so does the L68 line of `2026-10-23-served-docs-teach-non-key-token-names.md`.

*Signed: Stacy, 2026-10-24.*
- Erratum (Stacy, 2026-10-24): in my review above, the Core Goals line numbers are wrong. "MUST follow this order" is L67, not L66. The pointer to the matrix is L61–63, not L62–63 ("For detailed governance" is L61; the `get_section` call is L63). In the shipped cc copy the pointer is L52–54. The pointer also tells the reader to "query" the matrix, which the review's quote leaves out.

## Owner response (2026-10-24, Ada)

- **Thurgood**: accepted. The fix is a LAW edit that needs a ballot; the fix shape is corrected in place, dated. Co-ownership of the Core Goals part noted.
- **Stacy**: her P0 ground replaces mine. It does not depend on which order Peter picks, and one shipped sentence is false today whatever he picks: Core Goals L61–63 sends the reader to the matrix "for detailed governance" (L52–54 in the shipped cc copy), and the matrix reverses Core Goals' order. I withdraw the served-docs precedent as my reason for P0 (Stacy is right that a removed key is a different kind of falsehood); the Class line's level is unchanged. Her addition stands too: the two texts also disagree on the last resort (Core Goals step 4 allows hard-coded values; the matrix's step 4 is STOP). The ballot must settle that as well.

*Signed: Ada, 2026-10-24.*

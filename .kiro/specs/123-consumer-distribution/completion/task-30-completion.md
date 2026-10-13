# Task 30 Completion: the G2 cycle-2 gate parent (U3g gating parent)

*(The parent close is written at 30.3, above this section. The section below is the verdict's consequence, applied at 30.2 byte-equal to `completion/g2-cycle-2-consequence-texts.md` @ C0′ `8d27e02b3`. No later edit touches it.)*

## 24.3 acceptance table

Requirement 24.3's labels for the re-grounding contract's instruments (Req 24.3: the list that follows "The acceptance table SHALL label the three instruments" in `requirements.md`), with (v)'s mechanical half placed by G2 cycle 2 under Requirement 11.8.2. For release 3 onward this table supersedes the one in `.kiro/specs/123-consumer-distribution/completion/task-18-completion.md` § "24.3 acceptance table" (pass four), which stays as that verdict's record and is not edited. Each row states what its passing does not establish (R26.8).

| Instrument | Label (Req 24.3) | What a pass does not establish |
|---|---|---|
| (i), (ii), (iii) with applicability verification, (iv) present-routes, and the all-`no-consumer-counterpart` floor | Deterministic clauses | Each clause establishes only its own stated property (Req 11.3–11.5); none establishes that a re-grounded unit's function survived. |
| `no-consumer-counterpart` signatures | Routed clause — mechanically enforced routing of a judgment the check cannot make | The routing is enforced; the judgment is the signer's, and a hollow assent passes it. |
| The behavioral instruments (Req 24.1 two-beat conformance run; 24.2 trio probe) | Behavioral backstop — non-deterministic, per-release, sampling | A sample: agents and domains it does not exercise are named per run (Req 24.2a), and an unexercised one is not covered. |
| (v)'s mechanical half — body units | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), and applied to the committed consumer profile and every committed target rendering on every PR (`tools/agent-generator/__tests__/derivation.shipped-profile.test.ts`) | Attacks outside `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-attacks.md`; the check's named limitations (Req 11.7.1 text the rendering gained, 11.7.2 inversion or deadening inside a retained unit, 11.7.4 transform quality); the named limits below; that a re-grounded unit's function survived (the C18 floor's and the signer's). |
| (v)'s mechanical half — frontmatter entries | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), on the declared targets (`cc`, `kiro`, the Kiro agent JSON included), applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below; that an entry's re-grounded value means what the canonical value meant (no per-field rule: the check reads the derived value's emptiness only). |
| (v)'s mechanical half — always-set member units | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below, L4 in particular. |
| (v)'s mechanical half — the shared-catalog member | Deterministic, with respect to G2 cycle 2's attack set (G2 cycle 2 HOLDS), decided in member-id space, applied on every PR by the same standing test | Attacks outside the cycle-2 attack set; the named limitations above; the named limits below, L5 in particular. |

**Named limits this verdict carries** (Peter's ruling of 2026-10-12, "accept", recorded in `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-refusal-conditions.md` § 6; the rows are `g2-cycle-2-attacks.md` § 2.4; the ruling's § "What this reading does not reach"). Each one re-grounds a unit or entry **in place** and names it as its own destination, so the check returns `VERIFIED` by construction:

- **L3 — a permission widened in place.** A `writeScope[…]` member re-pointed to a wider glob (for example `**`) passes, and no signer reads it.
- **L5 — the shared governance rule hollowed in place.** The one shared-catalog member is rendered into every agent and its row is unsigned. Emptied, with itself as its destination, it passes and reaches no human.
- **L1 — a body unit reduced to one token in place.** It passes the check; the C18 triviality floor routes it to a signer.
- **L2 — a frontmatter entry emptied in place.** It passes; no signature is owed and it reaches no human.
- **L4 — an always-set unit reduced to one token in place.** It passes; whether the C18 floor routes it is stated in the verdict record.

L3 and L5 are routed to Thurgood as a permission question, for a later C16/C18 touch.

The verdict, and its findings if any, are in Stacy's record: the highest-numbered `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-<n>.md` on the U3g branch (cycle 2, or cycle 3 if it ran), cited and not restated (Req 11.8.4). Planned dependency: `tasks.md` Task 27 (step 27.4, U5) is planned to read this table for Requirement 24.3's labelling.


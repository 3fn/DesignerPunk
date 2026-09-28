# Operative-set confirmation — `start-up-tasks` (C1 carve-out)

**Record**: `canonical/operative-sets/start-up-tasks.yaml`
**Source**: `.kiro/steering/start-up-tasks.md`. This is an always-set member. Under path (B) (Req 12.1a), the shipped doc is the canonical counterpart.
**Owner**: Thurgood, because this is a Civitas governance-layer doc. **Profile author**: Thurgood.
**Confirmer**: **Stacy**. Under C1 (Req 11.6.5d; design C16), the owner is the profile author here, so the counterpart verification seat confirms.
**Date**: 2026-09-27 · Spec 123 Task 11.3
**Scope**: the two units that carry exemplars G and G′ only. The rest of the doc's units are confirmed at 15.4.

**Closed-negative disclosure (S-D-A11)**: *not independently re-verified. Confirmed by the auditing seat.* I confirm these two operative sets, I constructed exemplars G and G′ on them, and I run G1 over them.

**Seat reach (C16, stated at its true reach)**: this note lands in its own `Agent: stacy` commit. That separates the seats. It does not authenticate them, because one git identity cannot show which seat wrote a file. The open obligation still applies: interim records are re-attested once when 125-B U3 lands.

## How I classified the items

- **The criterion is normativity, not form (5c).** An item is operative if and only if a consumer implementation could violate it. I counted items. I did not check kinds (11.6.2).
- **Each item's `text` is the complete operative text** (C16's one dependence).
  - A **condition that scopes an obligation** is part of that obligation's text. `wait-1` therefore carries its `WHEN … THEN you MUST:` line.
  - A **pure group label** is not part of any item's text, because each member states its own modality (`must`, `Do NOT`, `❌`). `**User Authorization Required:**` and `**NEVER do this:**` are pure group labels.
  - The item's own title line (`N. **…**`) is a label, and clause (c) discounts it.
- **List markers are formatting**, so item texts start after the `- `.
- **Every `text` is a verbatim substring of its unit, and every hash is the unit's exact bytes.** I checked both mechanically (see the construction record).

## `#item-critical-wait-for-user-authorization-before-starting-new-tasks`

- **canonicalHash**: `sha256:5b862be78bc845ce6770093cc0affb912163fe10eafae3ea84f52d46419bbc32` (body lines 20–49)
- **Operative items: 7.** `wait-1` … `wait-7`.

| id | Kind | Why it is operative |
|---|---|---|
| wait-1 | obligation | An agent that reports completion and keeps going violates it. The `WHEN` trigger is part of the text. |
| wait-2 | obligation | Auto-advancing through the task list violates it. |
| wait-3 | obligation | Treating silence or momentum as consent violates it. |
| wait-4 | obligation | Taking an implicit signal as authorization violates it. The required form is an explicit request. |
| wait-5 | member | Announcing completion and starting the next task in the same turn violates it. |
| wait-6 | member | Preparatory reading for the next task violates it. This is narrower than wait-2 and still a separate prohibition. |
| wait-7 | member | Starting implementation with no explicit request violates it. |

**Excluded as non-operative**:
- The three `User may want to …` bullets. They give the reasons for waiting, and nobody can violate a reason.
- The `**Example Completion Pattern:**` block. It illustrates wait-1, and its closing `[STOP HERE …]` line repeats wait-1 without adding a constraint.
- The item title and the two pure group labels.

## `#item-civitas-governance-health-check`

- **canonicalHash**: `sha256:81d0a0079ab252f6cd829b654d963401e76ae66dfc084bb0634844041c06552b` (body lines 14–19)
- **Operative items: 4.** `hc-1` … `hc-4`.

| id | Kind | Why it is operative |
|---|---|---|
| hc-1 | obligation | Not flagging past the interval violates it. It covers the interval test against the last-check marker `[2026-09-19]`, and the duty to flag. |
| hc-2 | route | This is the flag's content. It routes the overdue check to the steward and orders it before proceeding. Flagging the wrong party violates it, and so does proceeding past the flag. |
| hc-3 | obligation | A non-steward agent running the health check violates it. |
| hc-4 | obligation | Any agent that skips the date check violates it. This duty is universal, so it is wider than hc-1's conditional flag. |

**Decomposition note**: hc-1 and hc-2 come from one sentence. I split them at `THEN flag:` because the message carries a separate function: the route to the steward and the before-proceeding order. Each piece is a verbatim substring. Taken together they are the complete sentence, so no remainder is truncated. Splitting makes the denominator larger. That makes clearing harder, never easier, so the split is safe for the denominator attack in 5d.

**Excluded as non-operative**: the item title `2. **Civitas Governance Health Check**`.

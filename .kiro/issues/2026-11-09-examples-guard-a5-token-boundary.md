# The examples guard's A-5 matches `var(--name` as a prefix, so a longer custom-property name false-fires

**Date**: 2026-11-09
**Owner**: Lina (the predicate); Thurgood (the instrument, `scripts/governance-examples/`)
**Filed by**: Lina, under README rule 10, from the ride-along Peter ratified on ballot `2026-11-08-governance-examples-guard-attribute-predicate` (2026-11-09T02:16:20Z: "Ratified, (b), and yes to both ride-alongs").
**Class**: P2 obligation (guard) · defect *(set 2026-11-09, Lina, rule 12. A guard that fires on a correct example is weaker than its claim in the safe direction: the doc owner is asked to fix a non-defect. Two such entries ship parked.)*
**Trigger**: `release:16.4.0:phase-1` — the event that owes the close is the merge of the PR that gives A-5 a token boundary (v2), after Peter ratifies the A-5 erratum ballot; `merge:#<N>` once that PR opens. *(Re-ruled 2026-11-12, Lina, owner, rules 1, 9 and 11: Peter, received 2026-11-12T13:29:02Z, "As recommended", ruling `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md` row 6: fix-now via an A-5 erratum ballot. Prior token `release:next:phase-1`, lapsed at `6f507c039`.)*

---

## What is wrong

A-5 fails a `--name` declaration when its value "contains `var(--name`". The match is a prefix: `--shadow-container: var(--shadow-container-offset-x) …` (`governance/Token-Family-Shadow.md` L380) and `--shadow-fab: var(--shadow-fab-offset-x) …` (L388) reference different, longer properties and are correct. Both are on the pending list, marked "false fire, A-5 v2".

## Fix

A-5 v2: `var(--name` followed by `,` or `)` or whitespace (the end of the name), not another name character. Fixture: the two lines above stay green; `--a: var(--a)` and `--a: var(--a, 1px)` stay red. The two pending entries are then removed in that PR.

*Signed: Lina, 2026-11-09.*

## Lapse (2026-11-12)

Firing commit `6f507c039` (#852, the squash of Release 16.3.0: release 16.3.0's S). This record's Trigger was `release:next:phase-1`, and no ancestor of S closed or re-ruled it. Appended by the owner at session start (rule 11). Signed Lina, 2026-11-12.

## Disposition (2026-11-12, Lina, owner, rules 1, 9 and 11)

**Authority**: Peter, received 2026-11-12T13:29:02Z: "As recommended". Ruling `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md`, row 6.

**Fix-now, via an A-5 erratum ballot that Peter ratifies** (A-5 is ratified law, so the predicate change needs the erratum; Thurgood owns the instrument, `scripts/governance-examples/`, and is consulted on the ballot). Trigger `release:16.4.0:phase-1`; it becomes `merge:#<N>` once the fixing PR opens.

**If the erratum is not ratified by 16.4.0's S, this record lapses again and fix-now is gone** (rule 11: a lapsed fix-now returns without that option). The later answer is then spec or drop only.

*Signed: Lina, 2026-11-12.*

# The examples guard's A-5 matches `var(--name` as a prefix, so a longer custom-property name false-fires

**Date**: 2026-11-09
**Owner**: Lina (the predicate); Thurgood (the instrument, `scripts/governance-examples/`)
**Filed by**: Lina, under README rule 10, from the ride-along Peter ratified on ballot `2026-11-08-governance-examples-guard-attribute-predicate` (2026-11-09T02:16:20Z: "Ratified, (b), and yes to both ride-alongs").
**Class**: P2 obligation (guard) · defect *(set 2026-11-09, Lina, rule 12. A guard that fires on a correct example is weaker than its claim in the safe direction: the doc owner is asked to fix a non-defect. Two such entries ship parked.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the merge of the PR that gives A-5 a token boundary (v2). It needs an erratum or a new ballot, since A-5 is ratified law.

---

## What is wrong

A-5 fails a `--name` declaration when its value "contains `var(--name`". The match is a prefix: `--shadow-container: var(--shadow-container-offset-x) …` (`governance/Token-Family-Shadow.md` L380) and `--shadow-fab: var(--shadow-fab-offset-x) …` (L388) reference different, longer properties and are correct. Both are on the pending list, marked "false fire, A-5 v2".

## Fix

A-5 v2: `var(--name` followed by `,` or `)` or whitespace (the end of the name), not another name character. Fixture: the two lines above stay green; `--a: var(--a)` and `--a: var(--a, 1px)` stay red. The two pending entries are then removed in that PR.

*Signed: Lina, 2026-11-09.*

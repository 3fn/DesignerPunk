# The governance-examples guard's attribute half: the six hits found at adoption

**Date**: 2026-11-09
**Owners**: Lina (`Component-Family-Badge.md`, `Component-Family-Form-Inputs.md`; A-5's text); Ada (`Token-Family-Shadow.md`); Thurgood (`start-up-tasks.md`, as Civitas steward; that doc's edits are Peter-merged). Each owner rules the disposition of their own rows, and rule 9 applies to every later edit.
**Class**: P2 obligation (record) · defect *(set 2026-11-09, Thurgood, filer, rule 12)*. These are pending entries of an armed guard, and the guard reads them as failing. Three of the six are false fires, a defect in the predicate's reach rather than in the docs. *(corrected 2026-11-09, Thurgood, filer: "Four of the six" read against this record's own table, which marks three rows **False fire**: `start-up-tasks.md` L98 and `Token-Family-Shadow.md` L380 and L388; Stacy's read of #838, F1, in PR #842. Prior text: "Four of the six are false fires".)*
**Trigger**: `release:next:phase-1`. The RELEASE pass reads P against the baseline header (ballot `2026-10-26-governance-examples-guard` § 2.4). Each fixing PR removes its own entry, which otherwise goes stale and red.
**Source**: the build PR of ballot `.kiro/docs/ballots/2026-11-08-governance-examples-guard-attribute-predicate.md` (RATIFIED, Peter, 2026-11-09T01:38:37Z, F-1 (a)), item 4: hits found at adoption go on the pending list, each homed in a record. This is their home, and it is filed under rule 10.

---

## The hits (`scripts/governance-examples/pending.json` at the build PR; key: doc, half, string, occurrence 0)

| Doc (line at adoption) | Half | String | Reading | Disposition (proposed; the owner rules) | Owner |
|---|---|---|---|---|---|
| `.kiro/steering/start-up-tasks.md` (L98) | tag | `test-file-path` | **False fire.** `npm test -- <test-file-path>` is a placeholder in the decision-tree diagram, an untagged fence indented three spaces. A-1 reads untagged fences. | `<!-- example: generic -->` on the fence (an EXECUTION marker hunk, § 8.5), or the fence tagged `text`. | Thurgood; Peter merges |
| `governance/Component-Family-Badge.md` (L403) | tag | `list-item` | The example's container is not a DesignerPunk element. | `<!-- example: consumer -->` on the fence, since the container is the consumer's own element (A-2), or a registered container. | Lina |
| `governance/Component-Family-Badge.md` (L412) | tag | `card-header` | As above. | As above. | Lina |
| `governance/Component-Family-Form-Inputs.md` (L1098) | attribute | `autocomplete` | `<input-text-password>` neither observes nor reads `autocomplete`. Per Stacy's R1 read, the element sets its own value. | Remove the attribute from the example, or have the element read it. | Lina |
| `governance/Token-Family-Shadow.md` (L380) | css-self-reference | `--shadow-container` | **False fire.** The value references `var(--shadow-container-offset-x)` and its siblings, not `--shadow-container` itself. A-5's text is a substring test ("contains `var(--name`"), and the build applies it as written. | Hold until A-5 bounds the name (a predicate v2, Lina's record `.kiro/issues/2026-11-09-examples-guard-a5-token-boundary.md`). The entry is parked in `pending.json`, marked "false fire, A-5 v2" (Peter, 2026-11-09T02:16:20Z, ride-along 1). Once the v2 lands, the entry goes stale and that PR removes it. | Lina (A-5); Ada (doc) |
| `governance/Token-Family-Shadow.md` (L388) | css-self-reference | `--shadow-fab` | **False fire**, the same shape as L380 (`var(--shadow-fab-offset-x)` and siblings). | As above. | Lina (A-5); Ada (doc) |

## Close

When every row above has left `pending.json`, the last fixing PR adds rule 5's dated outcome line naming that PR and archives this record.

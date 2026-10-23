# Served Docs and Charters Teach Token Names That Are Not Token-Index Keys

**Date**: 2026-10-23
**Filed by**: Thurgood, under rule 10. The obligation is Ada's drift ruling of 2026-10-23, § 6 ("Root cause, and one correction I owe"). The drift record's Outcome line names that ruling as "a separate CORRECTION proposal", and no committed record held it. The lines below were re-read on branch `fix/schema-token-name-drift-and-consumer-index`.
**Owners**: Ada (token docs), Lina (component docs and her charter line), Thurgood (`.kiro/steering/core-goals.md`). Each owner writes their own part (rule 9). An owner who files a part as its own record writes the move here as a dated line.
**Class**: P0 false-claim · defect *(set 2026-10-23, Thurgood, filer, rule 12, on the M7 reading. Each line below is served to an agent reader, as a governance doc, an always-loaded steering doc, or an agent charter shipped to consumers. Each names a token key that does not exist: removed, or a platform identifier written in the key's place. An agent that follows the line declares or reads a name the token index does not hold, and that is the drift `2026-06-25-component-schema-token-name-drift.md` fixed. The reading Stacy may press: an example in a doc is guidance, not a claim. I class it P0 because core goals says "MUST use semantic tokens first" and its example is a token that was removed. Only Peter downgrades.)*
**Trigger**: `release:next:phase-1`. The release-5 walk reads it: fixed, waived in writing, or blocking.

---

## What is false, and where (re-read 2026-10-23)

- **Core goals** (Thurgood): `.kiro/steering/core-goals.md` L68. "Semantic tokens … (e.g., `tapAreaRecommended` for touch targets, `color.contrast.onPrimary` for content on primary backgrounds)". `color.contrast.onPrimary` was removed in 2026-01 (Spec 052). `tapAreaRecommended` is a key in `token-index/primitives.yaml`, not in `semantics.yaml`. The consumer copies carry the same line: `canonical/_consumer-output/{cc/.claude/identity,kiro/.kiro/steering}/designerpunk-core-goals.md`, and `dist/consumer-canonical/always-set/core-goals.overlay.md`.
- **Lina's charter** (Lina; a `canonical/agents/lina.md` edit, Peter-merged): `canonical/agents/lina.md` L501 is the same sentence, word for word. It renders into the consumer charter (`canonical/_consumer-output/cc/.claude/agents/lina.md` L183 and the Kiro twin).
- **Token docs** (Ada): `governance/Token-Family-Radius.md` names the semantic radii by their iOS identifiers (`radiusSmall` L94, `radiusFull` L97 and L165). `governance/Token-Quick-Reference.md` L238, L244 and L249 say `borderDefault`. Ada's ruling also names `Token-Family-Border.md` and `rosetta-system-principles.md`. Those two were not re-read here.
- **Component docs** (Lina): `governance/Component-Family-{Avatar,Button,Chip,Form-Inputs,Icon}.md` and `governance/Component-Inheritance-Structures.md` carry at least one of `borderDefault`, `color.error.strong`, `blend.iconLighter` or `accessibility.tapArea.recommended`. Grep at this branch; the line-level list is the fixing PR's.

## Fix shape

A correction of each line to the token-index key, with the truth referent being the committed `token-index/` files. A platform identifier stays only where the doc is showing that platform's code. Each edit is to a governance path, so the PR carries an `**Edit kind**:` line per file (ballot 2026-10-18-governance-edit-kinds) and Peter merges it. **Class option**: one CORRECTION PR across all owners' lines, with `src/generators/__tests__/schemaTokenRefs.test.ts`'s rule as the shared definition of "a key". Cost: one PR touching three seats' docs and one charter, plus a regeneration for the charter line. Surviving counter-argument: the guard already catches every wrong name a schema declares, so the docs' error costs a red test, not a wrong shipped schema. The falsity is at the doc's reader, though, and M7 counts it there.

Not in scope: declared-versus-read completeness (`2026-10-23-component-token-usage-findings-from-drift-pass.md` item 4).

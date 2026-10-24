# A Born Repo's Token Index Lacks DesignerPunk's Own Component Tokens

**Date**: 2026-10-23
**Filed by**: Ada, found while fixing R1-7 (`.kiro/issues/2026-10-15-123-u5-instrument-findings.md`) and the schema token-name drift (`.kiro/issues/2026-06-25-component-schema-token-name-drift.md`) on branch `fix/schema-token-name-drift-and-consumer-index`
**Owner**: Ada (`src/cli/**`: `generate`'s component-token harvest and `init`'s copy steps). Lina is consulted on the fix (the component-token files live in her component directories).
**Class**: P0 false-claim · defect *(set 2026-10-23, Ada, rule 12, on the reading the drift record and R1-7 were classed under: in a born repo the Application MCP's `get_token_details` answers "not found" for a token DesignerPunk's shipped Avatar-Base reads, and `get_token_consumers` answers `[]` for it. That is an MCP response a package reader meets, and it is wrong. One reading Stacy may press: "not in your index" is true of the consumer's index, so the response is incomplete rather than false; I class it P0 because the tool is named for the question it answers wrongly. Only Peter downgrades.)*
**Trigger**: `release:next:phase-1` — the release-5 walk reads it: fixed, waived in writing, or blocking.

---

## What happens

In a repo created with `init`, `generate` indexes only the component tokens in the repo's own token source: `{tokenSourceRoot}/component/*.ts` and the config's `componentTokens` directories (`./src/components`, `./src/tokens/component`), harvested by `loadComponentTokens`. `init` copies `src/tokens/component/` (the Progress components' tokens) but no longer copies `src/components/core/` (Spec 123 Req 19A), and that is where the other component-token files live: `Avatar-Base/avatar.tokens.ts`, `Button-Icon/buttonIcon.tokens.ts`, `Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts`, `Input-Checkbox-Base/checkbox-sizing.tokens.ts`, `Input-Radio-Base/radio-sizing.tokens.ts`, `Badge-Label-Base/tokens.ts`. So a born repo's `token-index/components.yaml` holds 10 component tokens (Progress), where the package's holds 33.

**Observed** (packed install of this branch, `init` then `generate`, read with the built Application MCP `TokenIndexer`): `components.yaml` 10 entries; `avatar.size.md` → `getDetails` null, `getConsumers` `[]`; `progress.node.size.md` → found, four consumers. `generate` prints: "Note: 16 of DesignerPunk's component-token names (for example avatar.icon.size.xs) are not in your token index, because generate indexes only the component tokens in your own token source; …" (`packageComponentTokensNotIndexedMessage`, added on that branch, so the gap is said at the tool, not only in the CHANGELOG).

This was already true in 16.0.0 and was not disclosed. R1-7's fix makes it visible: DesignerPunk's schemas are now read in a born repo, and their component-token names find no entry.

## Fix shapes (the pick is Peter's; not ruled here)

- **(a) `generate` harvests DesignerPunk's component tokens too**, for every package component the consumer has not replaced (the same union and same-name precedence as `resolveComponentSources`). Their values then come from the package, which matches where the CSS they name comes from (the package's component-token stylesheet). Cost: `loadComponentTokens` reads package `.tokens.ts` files at `generate` time (Spec 118's module-resolution contract applies), and the consumer's `ComponentTokens.*` output grows.
- **(b) `init` copies the component-token files**, as it copies `src/tokens/component/`. Cost: a consumer copy that drifts from the package on upgrade, which is what Req 19A removed `src/components/core` to avoid.
- **(c) Index only**: add the package's component-token entries to the born repo's `components.yaml` without generating output for them. Cost: the index then names tokens the consumer's own output does not emit, which needs saying in each entry.

**Class option**: (a) — one universe for components and their tokens, read the same way; cost as stated. Surviving counter-argument: it couples a consumer's generated component-token output to the installed package version, the same coupling the R1-7 fix accepted for the consumer map, and here it changes emitted files, not only the index.

## Cross-references

- CHANGELOG `## [Unreleased]` → "Known limitations in this release" names this record.
- Ada's drift ruling of 2026-10-23, § 4 (quoted in the fixing PR's body) — the union read whose counter-argument this extends.

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

## Owner line (2026-10-25, Ada, rule 9): my pick moved from (a) to (c)

Found in the 16.1.0 walk (row 2). The class option above names (a). I now recommend **(c), fed from the package's own shipped `token-index/components.yaml`**, for 16.1.0. Two facts, read at `652074c6b`:

- **No `.tokens.ts` ships.** The package's `files[]` includes only `src/components/**/{*.schema.yaml,contracts.yaml,component-meta.yaml}` from `src/components/core`. So (a) would need a `files[]` change (a grant, as `package.json` is outside my write scope), a `pack-assert.ts` floor change, and loading package TypeScript from `node_modules` under Spec 118's contract. That is a packaging change under Spec 123's containment, not only a CLI change.
- **The package already emits these tokens to the consumer's page.** `./component-tokens.css` (→ `dist/ComponentTokens.web.css`) defines `--avatar-size-md` and the rest, and INSTALL tells consumers to keep importing it. The shipped `components.yaml` entries carry references and platform names, not resolved values. So an index entry taken from the package is true of what the page loads. (a) would emit each of those tokens a second time into the consumer's own `ComponentTokens.web.css`.

**Lina agrees with (c) over (a)** (named in the 16.1.0 walk). **Surviving counter-argument**: (c) gives a born repo two sources of component-token truth, its own generated tokens and package entries fixed at the installed version. Each added entry must therefore carry the package version it came from, so a reader can tell. If Spec 129 decides consumers own component-token output, (a) is the end state and (c) is reworked.

Effort for (c): about 0.5–1 day; (a): about 2–3 days plus the grant. The pick between (c), (a) and a written waiver is Peter's; this line does not rule it.

*Signed: Ada, 2026-10-25.*

# A Born Repo's Token Index Lacks DesignerPunk's Own Component Tokens

**Date**: 2026-10-23
**Filed by**: Ada, found while fixing R1-7 (`.kiro/issues/2026-10-15-123-u5-instrument-findings.md`) and the schema token-name drift (`.kiro/issues/2026-06-25-component-schema-token-name-drift.md`) on branch `fix/schema-token-name-drift-and-consumer-index`
**Owner**: Ada (`src/cli/**`: `generate`'s component-token harvest and `init`'s copy steps). Lina is consulted on the fix (the component-token files live in her component directories).
**Class**: P0 false-claim · defect *(set 2026-10-23, Ada, rule 12, on the reading the drift record and R1-7 were classed under: in a born repo the Application MCP's `get_token_details` answers "not found" for a token DesignerPunk's shipped Avatar-Base reads, and `get_token_consumers` answers `[]` for it. That is an MCP response a package reader meets, and it is wrong. One reading Stacy may press: "not in your index" is true of the consumer's index, so the response is incomplete rather than false; I class it P0 because the tool is named for the question it answers wrongly. Only Peter downgrades.)*
**Trigger**: `merge:#470` — the fixing PR, which closes this record (rule 11) by recording the outcome and archiving it. *(was: `release:next:phase-1` — the release-5 walk reads it: fixed, waived in writing, or blocking.)* *(Re-ruled 2026-10-25, Ada, rules 1 and 9: the vehicle PR now exists, so the Trigger names its number, per ballot 2026-10-22-trigger-names-the-event-not-the-vehicle.)*

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

- CHANGELOG `## [Unreleased]` → "Known limitations in this release" named this record until the fix (2026-10-25); the fix rewrites that bullet and adds a "Changed" bullet.
- Ada's drift ruling of 2026-10-23, § 4 (quoted in the fixing PR's body) — the union read whose counter-argument this extends.

## Owner line (2026-10-25, Ada, rule 9): my pick moved from (a) to (c)

Found in the 16.1.0 walk (row 2). The class option above names (a). I now recommend **(c), fed from the package's own shipped `token-index/components.yaml`**, for 16.1.0. Two facts, read at `652074c6b`:

- **No `.tokens.ts` ships.** The package's `files[]` includes only `src/components/**/{*.schema.yaml,contracts.yaml,component-meta.yaml}` from `src/components/core`. So (a) would need a `files[]` change (a grant, as `package.json` is outside my write scope), a `pack-assert.ts` floor change, and loading package TypeScript from `node_modules` under Spec 118's contract. That is a packaging change under Spec 123's containment, not only a CLI change.
- **The package already emits these tokens to the consumer's page.** `./component-tokens.css` (→ `dist/ComponentTokens.web.css`) defines `--avatar-size-md` and the rest, and INSTALL tells consumers to keep importing it. The shipped `components.yaml` entries carry references and platform names, not resolved values. So an index entry taken from the package is true of what the page loads. (a) would emit each of those tokens a second time into the consumer's own `ComponentTokens.web.css`.

**Lina agrees with (c) over (a)** (named in the 16.1.0 walk). **Surviving counter-argument**: (c) gives a born repo two sources of component-token truth, its own generated tokens and package entries fixed at the installed version. Each added entry must therefore carry the package version it came from, so a reader can tell. If Spec 129 decides consumers own component-token output, (a) is the end state and (c) is reworked.

Effort for (c): about 0.5–1 day; (a): about 2–3 days plus the grant. The pick between (c), (a) and a written waiver is Peter's; this line does not rule it.

*Signed: Ada, 2026-10-25.*

## Owner line (2026-10-25, Ada, rule 9): RULED (c), under Peter's batch ruling

On Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are now committed in this record.* Read against the 16.1.0 walk (row 2), where my pick is (c), fed from the package's own shipped `token-index/components.yaml`, each added entry carrying the package version it came from.
- **Ruled**: (c). The waiver and (a) are not taken. (a) remains the end state only if Spec 129 decides consumers own component-token output.
- **Fixing branch**: `fix/release-16.1.0-born-repo-index-c`. About 0.5–1 day, in `src/cli/**` (my scope); Lina is consulted on the fix. No `package.json` or `pack-assert.ts` change, so no grant.
- **Trigger**: stays `release:next:phase-1` until the fixing PR opens. At open I change it to `merge:#<N>` in the same diff (rule 1: a P0 that rides a vehicle takes the vehicle once it exists), with a dated reason. The record closes by rule 5's outcome line in that PR (rule 11). As a P0 it must merge before S; an unmerged P0 at S lapses and goes to Peter on the first lapse.
- **Surviving counter-argument** (unchanged): (c) gives a born repo two sources of component-token truth until Spec 129 rules.

*Signed: Ada, 2026-10-25.*

## Ruled and fixed here (2026-10-25)

**Ruling**: Peter, chat 2026-10-25, on the 16.1.0 floor batch, verbatim: "Fix all of them as the owners recommend; T is (A)". My recommendation for this record (walk row 2) was shape (c), fed from the package's own shipped `token-index/components.yaml`, so (c) is the ruled shape.

**Fixed here** (Ada, 2026-10-25), on branch `fix/release-16.1.0-born-repo-index-c`. The fixing PR's number goes on the Trigger line when the PR opens: `**Trigger**: \`merge:#<N>\` — the fixing PR; …`.

What the fix does:
- **Index only.** In a consumer repo (born, or package mode), `generate` merges the installed package's shipped `components.yaml` entries into the repo's own `token-index/components.yaml`.
- **Which entries.** It merges the entries for every package component the repo has not replaced. "Replaced" is decided by the shared resolver `resolveComponentSources` (`src/cli/shared/componentSources.ts`), by declared name.
- **What a merged entry carries.** The package's references and platform names; `definedBy`; and `source: { package, version }`, the version it came from. Its consumers are counted over the repo's own universe.
- **What is not merged.** A key in the repo's own token source wins and keeps its untagged entry. The token-source tier (no `definedBy`, for example the Progress tokens `init` copies) is never merged.
- **`definedBy`.** The package's own build now writes it on every component-token entry harvested from a component directory: 23 of the 33 shipped entries. This is the only change to the shipped index.
- **Unchanged.** `files[]` does not change, and no platform output changes. The merged tokens are defined by the package's `component-tokens.css` as `var(--size-…)`, so the page's value follows the repo's own primitive. That is the same value the index resolves.
- **The note retires.** `packageComponentTokensNotIndexedMessage` is removed.

**Lina's surviving counter-argument (two sources of truth; an upgrade without `generate` must be detectable)**:
- **The tag.** Each merged entry carries the version it came from.
- **`sync` reports it.** On every run, `sync` compares the repo's index with the installed package (`assessIndexedPackageComponentTokens`). It names the older version, or the count of entries the installed version adds, and counts `generate` as still to do. So the closing line is not the all-clear. An index written before this fix (no tags) reads as behind.
- **The Application MCP's staleness gate does not cover it, and cannot.** `StalenessGate` re-reads data files whose mtime changed under the repo's own roots. It exempts `node_modules` as immutable, and it never writes `token-index/`. So an upgrade changes nothing it watches. The gate does not compare the repo's own entries with their token source either: an index is as current as the last `generate` for both kinds.
- **What is left for Lina's server.** A health warning when a merged entry's `source.version` is not the installed version. It is listed under deferred, below.

**Lina's `get_token_details` not-found caveat** (her walk cross-read, item 2) **is not needed under (c)**. It was the waive path only, and she says so ("If Peter picks (c), this caveat is not needed"). `get_token_details("avatar.size.md")` now finds the token in a born repo, so the hedge would only weaken a correct "not found".

**Verified on a packed install** of this branch (`npm pack`, `npm install` of the tarball, `init`, `generate`). The queries ran over stdio against the packed `dist/mcp/application-mcp.js`, launched as the consumer's `.mcp.json` launches it:
- `get_token_details avatar.size.md`: found, with `primitiveReferences.value: size500`, `definedBy: Avatar-Base` and `source: {package: '@3fn/core', version: 16.0.0}`. It resolves to 40.
- `get_token_consumers avatar.size.md`: `[Avatar-Base]`.
- `space300`: unchanged. `primitives.yaml` and `semantics.yaml` are byte-identical to a `generate` run without the shipped index, and so is `dist/`.
- `components.yaml`: 33 entries, 23 of them tagged.
- Package mode: the same 23 entries are merged.
- `sync --dry-run` after a simulated upgrade reports the index as behind. It reports nothing when the index is current.

**Deferred** (each owner named; none blocks this fix):
- *Lina, `application-mcp-server/**`.* In `TokenIndexer`, add a warning (it surfaces in `get_component_health`) when a component entry's `source.version` differs from the installed package's version: "token-index/components.yaml holds DesignerPunk's component tokens from @3fn/core <X>; <Y> is installed. Run `npx designerpunk generate`." Also add `definedBy?: string` and `source?: { package: string; version: string }` to `TokenIndexEntry`. Both fields already pass through at runtime (`loadTier` spreads the entry).
- *The Consumer Guard (`tests/consumer-integration.test.ts`; `tests/**` is in no seat's scope).* The assertion is in the fixing PR's body.
- *`token-index/README.md`.* It describes `components.yaml` without consumers, `definedBy` or `source`, and names a retired standalone script. It is outside my write scope as listed. The text is in the fixing PR's body.
- *The end state, unchanged from the ruling's counter-argument.* If Spec 129 decides that consumers own component-token output, shape (a) supersedes this, and the merge retires.

#470 merged 2026-10-25 (`25dacf3e2`); row 2 closes under rule 5 at Ada's outcome line (hers to write); walk row 2 → fixed before S.

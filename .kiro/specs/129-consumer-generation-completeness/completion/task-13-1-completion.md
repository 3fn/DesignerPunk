# Task 13.1 Completion: Ship the six files; harvest as the third source; per-group precedence and reports

**Date**: 2026-11-08
**Task**: 13.1 (Spec 129, Unit 8, parent 13)
**Agent**: Ada (Sonnet, as planned)
**Branch**: `task/129-13-component-tier`, cut from `beccbf134`

## 1. What changed

- **Ships** (`package.json` `files[]`): the six definition files, named one by one (`Avatar-Base/avatar.tokens.ts`, `Badge-Label-Base/tokens.ts`, `Button-Icon/buttonIcon.tokens.ts`, `Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts`, `Input-Checkbox-Base/checkbox-sizing.tokens.ts`, `Input-Radio-Base/radio-sizing.tokens.ts`). `Badge-Count-Notification/tokens.ts` (a constants object) does not ship. `scripts/pack-assert.ts` asserts each by `HARVESTABLE_COMPONENT_TOKEN_FILES`; four cases in `scripts/__tests__/pack-assert.test.ts`.
- **The harvest** (`src/cli/loadComponentTokens.ts`): a third source, taken from the package component directories that won the union, per group. A group any consumer file declares is the consumer's alone. Prints `component tokens: <G> — yours replace DesignerPunk's` (with ` (copied at init)` when the consumer's file is byte-identical to ours) and `component tokens: <Group> — not emitted (DesignerPunk's <Component> is replaced by yours)`. Two consumer files declaring one group throw `ComponentTokenGroupDeclaredTwiceError`, naming both. A package file that registers nothing is reported by the existing harvest-zero warning. `isPackageComponentToken` marks the harvested tokens.
- **`generate`** (`src/cli/designerpunk.ts`): builds the third source from the component union in a consumer repo (never in DesignerPunk's own). The index is no longer merged from the package's shipped index: the same harvest writes the output and the index, tagged `source: {package, version}` (`generateTokenIndex` takes `harvestedPackageTokens`). The damaged-install warning now names `src/components/core`.
- **Web** (`TokenFileGenerator.generateComponentTokens`, `generateTokenFiles`): harvested tokens are left out of `ComponentTokens.web.css` (`excludeFromWeb`). Web keeps the package's `component-tokens.css` (design § 9).
- **`sync`'s staleness read** (`packageComponentTokens.ts`): `mergePackageComponentTokens` takes `ownGroups`, so a group the consumer replaced is not expected of the index.
- **Tests**: `packageComponentSource.test.ts` (new, 10 cases); one case added to `packageComponentTokens.test.ts`; a `Consumer Guard` describe in `tests/consumer-integration.test.ts` (6 cases, own scratch install).

## 2. Targeted tests run

- `npm test`: 429 suites, 2 failed, both "MCP server should be built" (`dist/mcp` not built in this worktree). Before this diff the same two fail here.
- `npx jest --roots='<rootDir>/tests' --testMatch='**/consumer-integration.test.ts' --runInBand -t "Spec 129 Task 13"`: 6 passed. They show, on a packed install: the six files installed; iOS and Android carry the groups, with `DesignTokens.size500` / `DesignTokens.size_500` read by name; web has no `--avatar-`; the index entries carry the package tag and `definedBy`; **a change to `size500` (40 to 48) shows in `DesignTokens.ios.swift` while `sizeMd` still reads `DesignTokens.size500`**; a consumer `avatar.ts` replaces the group and `generate` prints the replace line.
- `scripts/harness/consumer.ts --out` over this branch: the index holds the same 33 component-token names as `token-index/components.yaml` in this repo (symmetric difference empty), 23 of them tagged.
- `scripts` lane, `pack-assert.test.ts`: 81 passed. `tsc --noEmit`: clean.

## 3. Application-time adaptations

- **`generate` no longer reads the package's shipped index** (`readPackageComponentTokenIndex`) at all. Plan text says "harvest as the third source", and a second read of the shipped index would put back the groups a consumer replaced (Req 5.2). `sync` still reads it, to tell staleness.
- **The web exclusion is not named in the 13.1 row.** It follows from design § 9 ("Web: not harvested in 129"): without it `ComponentTokens.web.css` defines each of our properties a second time.
- **The duplicate-group failure is not a catalogued row.** It prints through `generate`'s existing "System token generation failed:" line and names both files. A catalogue row is Lina's/Thurgood's to ask for.
- **Residual** (a risk, not a finding): a consumer whose pre-123 tree holds a copy of an Avatar token file in `src/components/core/Avatar-Base/` and another in `src/tokens/component/` now fails `generate` (two files, one group). The design says so; the first `generate` after upgrade is where they find out.
- Files outside the Primary Artifacts list: none beyond `scripts/__tests__/pack-assert.test.ts` (follows `scripts/pack-assert.ts`).

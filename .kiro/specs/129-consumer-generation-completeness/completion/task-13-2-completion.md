# Task 13.2 Completion: The name contract over the component tier; the reserved-package warning; R5 freshness

**Date**: 2026-11-08
**Task**: 13.2 (Spec 129, Unit 8, parent 13)
**Agent**: Ada (Sonnet, as planned)
**Branch**: `task/129-13-component-tier`

## 1. What changed

- **Names (Req 5.4)**: `src/cli/shared/componentTokenReferences.ts` reads every platform's generated `DesignTokens.*` output (web custom properties, Swift `let`/`var`, Kotlin `val`) and the package's shipped `token-index/primitives.yaml` for the per-platform spelling. `generate` prints one warning per primitive that a harvested DesignerPunk token reads and the output lacks (a report, exit 0). `sync` prints the same from the installed package's index, marking tokens the installed version adds (`new in @3fn/core X: ...`).
- **Reserved packages**: `src/cli/shared/reservedKotlinPackages.ts`; `generate` warns naming each `.kt` file in `com.designerpunk.tokens` or `com.designerpunk.components.*`, skipping `node_modules`, `build/`, `.gradle/`, `.git`, its own output and the token source root; a file named like one of our component sources gets the `sync --migrate-legacy` pointer.
- **Freshness (R5, Req 5.8)**: `src/cli/freshness.ts` regenerates into a temporary directory and compares byte for byte outside ISO timestamps. `src/cli/staleness.ts` no longer reads file times: `isProductTokenStale` renders the product tokens into a temporary directory (`generateProductTokens(config, { renderTo })`) and compares. `sync`'s name-contract section (`src/cli/sync/ComponentTier.ts`, hooked in `index.ts` by a few lines, to keep Lina's 13.4 merge small) says when the output is not what `generate` would write now, or that it could not check.
- **Shared**: `src/cli/packageComponentSource.ts` builds the third source for `generate` and the freshness check.
- **Tests**: `componentTier.test.ts` (12), `staleness.test.ts` rewritten (14), four `Consumer Guard` cases (deleted primitive on every platform with exit 0 plus `sync`; an introduced reference; freshness with the edited source's mtime set a day back; a reserved-package file).

## 2. Targeted tests run

`npm test`: 430 suites, only the two "MCP server should be built" failures (no `dist/mcp` here; the same two fail before this diff). `npm run test:consumer`: 71 passed, 1 skipped. `npm run test:scripts`: 1508 passed. `tsc --noEmit` clean.

## 3. Application-time adaptations

- The name check is a new report beside `NameContract.ts`, not a change to it: P1 (component tier NEVER) stays for the web-surface contract.
- `sync` now runs a regeneration into a temp directory when output exists: about 2 seconds added. A check that cannot run prints a "not checked" line.
- `sync`'s old `mergePackageComponentTokens` rule is per group now (`ownGroups`), done in 13.1.
- **Not done here, for Lina**: the served sentence that "INSTALL says so" about the reserved packages (design § 9) is a `governance/` edit and sits with 13.5's guide text. Flagging.
- Until Lina's 13.4 removes the hand-written `AvatarTokens` / `BadgeLabelBaseTokens` enums, the iOS and Android component harness contexts will see duplicate declarations; the plan couples that removal to this diff.

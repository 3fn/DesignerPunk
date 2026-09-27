# Task 1 Summary: Birth detection, root policy, indexer anchoring, and live reindex

**Date**: 2026-09-26
**Purpose**: Concise summary of Task 1 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Implemented `findDesignSystemRoot` (`src/cli/shared/bornRepo.ts`) — the birth-detection walk that classifies a directory as `born` / `package-mode` / `partial` (four sub-cases) / `unborn`, per design.md's C2/C3. Added birth-aware data-root resolvers (`resolveComponentRoots`, `resolveTokenIndexRoot`, `resolveProductRoot`) and wired them into the CLI runner and both consuming MCP servers' bootstraps. Upgraded the application server's `ComponentIndexer` to a multi-root (consumer ∪ package) union with live reindex on consumer-root file changes (Lina, subtask 1.4). Closed a package-mode theme-resolution regression by having `generate` write the live tier into `token-index/meta.json` and having the theme readers follow it. `generate` now anchors both its read and write sides at the discovered root and refuses (with an exact catalog string) in any partial state, rather than guessing from a bare `process.cwd()`.

## Why It Matters

Under Model B, DesignerPunk needs to reliably tell whether a directory it's operating in is the engine's own package, a consumer's born design system, a mid-setup partial state, or nothing at all — and to resolve the right token tier, component roots, and MCP data paths accordingly. Getting this wrong silently serves the wrong tokens/components as if they were the consumer's own (the exact class of defect issue 2026-09-12 already surfaced once for theme resolution). This task is the shared foundation every later Task 1 unit's consumer-facing behavior (`init`, `sync`, packaging, the consumer emission lane) builds on.

## Key Changes

- `src/cli/shared/bornRepo.ts` (new): `findDesignSystemRoot` — nine classified cases, four boundary behaviors, three accepted token-barrel export forms, the steward exemption, and (Peter's ruling) refusal on a non-literal `tokenSource`.
- `src/cli/shared/mcpDataRoots.ts`: three new birth-aware resolvers, table-driven-tested against design.md's C3.
- `src/cli/designerpunk.ts`: consumer-owned data-root env defaults removed from the runner; `spawnServer` lets user-set env win and never passes a `cwd` option; `generate` anchors at the discovered root and refuses in all four partial states.
- `application-mcp-server/src/indexer/ComponentIndexer.ts` (+ `ModeClassifier.ts`, `TokenIndexer.ts`, new `resolveThemeTierRoot.ts`, `watcher/FileWatcher.ts`): multi-root union at pass 1 with declared-name precedence, live reindex over the consumer root only, and theme resolution that follows `token-index/meta.json`'s recorded tier.
- `src/generators/generateTokenIndex.ts`: writes `token-index/meta.json`'s `tierDir`.
- `src/cli/shared/errorCatalog.ts` (new): the design.md loud-failure catalog strings, string-conformance tested, wired into `generate`'s refusals and both MCP servers' (application + product) bootstrap logging.
- `figma-push.ts` / `figma-extract.ts`: config lookup anchored at the discovered root instead of a bare `process.cwd()`.
- ~90 new/updated tests across `src/cli/__tests__/`, `application-mcp-server/src/**/__tests__/`, `product-mcp-server/src/__tests__/`; every load-bearing behavior has a recorded, reverted-and-restored bite.

## Impact

- Closes the C2/C3 root-policy contract for every downstream Task 1 consumer: `init`'s refusal (Task 2), the packaging floor (Task 3), `sync` (Task 5), the name contract (Task 6).
- Two accepted adaptations beyond the design's literal wording, both explicitly ruled: `generate` refuses in all four partial sub-cases, not only the two design.md names (orchestrator, 2026-09-26); a non-literal `tokenSource` refuses rather than silently falling to package-mode (Peter, 2026-09-26, option (a)).
- One carried item for Task 3: `build:mcp-shared`'s esbuild script needs `bornRepo.ts` and `errorCatalog.ts` added to its compiled-file list (currently produced only by a full root `tsc` build).

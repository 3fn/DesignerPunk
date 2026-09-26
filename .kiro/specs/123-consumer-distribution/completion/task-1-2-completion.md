# Task 1.2 Completion — The resolvers + the type-level declaration test for both servers

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 1 · **Agent**: Ada (Sonnet)

## What changed

- `src/cli/shared/mcpDataRoots.ts`: added three birth-aware resolvers per C3 —
  - `resolveComponentRoots({ envValue?, dsRoot, packageRoot }) → { roots: string[]; sources: DataRootSource[] }` — the consumer ∪ package UNION (`env` or `bornRoot/src/components` when `born`, else absent) plus the package root, always present.
  - `resolveTokenIndexRoot({ envValue?, dsRoot, packageRoot }) → TokenIndexResolution` — a discriminated `{ ok: true, path, source, tokenOrigin? } | { ok: false, reason: 'empty-env-value' | 'run-generate' | 'partial', partialCase? }`, branching on `dsRoot.state` exactly per C3's four bullets (explicit-env-absent-or-empty errors in any posture; `born`/`package-mode` error with `run-generate` if the index dir is absent/empty; `partial` returns its own named sub-case, never `run-generate`; `unborn` returns the package index labelled `source: 'package-consume'`, `tokenOrigin: 'designerpunk-reference'`).
  - `resolveProductRoot({ envValue?, dsRoot, cwd }) → ResolvedDataRoot` — env, else `bornRoot/product` for any non-unborn state with a resolved root, else `cwd/product` (unchanged pre-123 behavior).
  - `DataRootSource` gained the `'package-consume'` literal (unborn token-index case).
  - The old `resolveConsumerOwnedRoot` is kept, unchanged, marked `@deprecated` with a comment explaining why (see "Application-time adaptations").
- `application-mcp-server/src/index.ts` and `product-mcp-server/src/index.ts`: exported (previously module-private) `ResolvedDataRoot` and `McpDataRootsModule`, and added the new resolver signatures plus a shape-only `DesignSystemRootShape` mirror of `bornRepo.ts`'s `DesignSystemRoot` (no logic — avoids a cross-sub-package import, consistent with the existing local-declaration pattern this file already used for `ResolvedDataRoot`). `resolveConsumerOwnedRoot` stays declared (marked deprecated) so the existing bootstrap block keeps compiling.
- New tests:
  - `src/cli/__tests__/mcpDataRoots.test.ts` (21 tests) — per-resolver branch coverage for all three new resolvers, plus the C3 "Root | Keys | Resolves via | Runner default" table conformance test (asserts exactly 4 rows; each row's resolver function is defined; the three consumer-owned rows carry `runnerDefault: 'none'` and the package-owned row carries `'pkgRoot'`).
  - `application-mcp-server/src/__tests__/mcpDataRootsDeclaration.test.ts` (5 tests) and `product-mcp-server/src/__tests__/mcpDataRootsDeclaration.test.ts` (5 tests) — the type-level declaration tests: each loads the REAL compiled module via the same dist-require the production bootstrap uses, and asserts every function the local `McpDataRootsModule` interface declares exists and returns the shape that interface promises. This is the mechanical guard C3 calls for (Lina R2 A8): "an unchecked `as` cast against a hand-written interface... a return-shape change that misses one declaration site compiles clean and fails at runtime."
- Rebuilt `dist/cli/shared/{mcpDataRoots,resolvePackageRoot}.js` via `npm run build:mcp-shared` (the `import type` from `bornRepo.ts` is erased by esbuild — no runtime dependency added).

## Targeted tests + result

- `npx jest src/cli/__tests__/mcpDataRoots.test.ts` → **21/21 passed**.
- `npx jest application-mcp-server/src/__tests__/mcpDataRootsDeclaration.test.ts` (run from `application-mcp-server/`, its own jest config) → **5/5 passed**.
- `npx jest product-mcp-server/src/__tests__/mcpDataRootsDeclaration.test.ts` (root jest config; `product-mcp-server/src` is a root jest `roots` entry) → **5/5 passed**.
- Full `application-mcp-server` suite (`npx jest` from that package) → **348/348 passed, 25 suites** — no regressions from the exported/added interface members.
- `npx tsc --noEmit` at repo root, `application-mcp-server/`, and `product-mcp-server/` → all three **clean** (no errors).

## Application-time adaptations

1. **`resolveConsumerOwnedRoot` kept, not removed.** C3 clearly supersedes it (it doesn't know about `born`/`package-mode`/`partial`), but removing it would require rewiring the three servers' `require.main` bootstrap blocks to (a) call `findDesignSystemRoot` first and (b) restructure `ComponentIndexer`'s single-string `componentsDir` into the multi-root array the union needs — both of which are Task 1.4's (Lina, indexer) and 1.5's (`generate`'s tier-aware writes) territory, not 1.2's. Kept it **unchanged**, marked `@deprecated` with a comment naming exactly what supersedes it and why, so the servers keep compiling and behaving exactly as before until 1.4/1.5/1.6 land.
2. **Surfaced, not resolved: the bootstrap-wiring fork.** The three servers' actual `require.main` blocks still call the OLD `resolveConsumerOwnedRoot`/hardcoded cwd logic — the NEW resolvers exist, are fully unit-tested, and are declared in both servers' local interfaces, but are **not yet wired into the live bootstrap path**. This is a deliberate sequencing choice I'm flagging rather than resolving unilaterally: wiring them in now would require picking `roots[0]` (silently dropping union semantics) or changing `DataPaths.componentsDir`'s shape ahead of 1.4's indexer work. Left for whichever of 1.4/1.5/1.6 actually rewires `ComponentIndexer` to consume the array.
3. **`resolvePackageRoot` anchor-depth adjustment**, same pattern as 1.1: called `resolvePackageRoot(path.dirname(__dirname))` conceptually wherever a caller sits one level deeper than the utility's two-levels-below assumption; the new declaration tests do the equivalent (`path.resolve(__dirname, '..')`) from each sub-package's `src/__tests__/`.
4. **The "type-level declaration test" is a runtime structural check, not a TS compile-time `const _check: Interface = realModule` assignment.** A genuine compile-time cross-package check would require importing `src/cli/shared/mcpDataRoots.ts`'s real exported types into each sub-package's TS program, which crosses the documented `rootDir` boundary the CONSUMPTION CONTRACT exists to avoid. The runtime dist-require-and-shape-assert form mirrors exactly how the production bootstrap consumes the module and catches precisely the failure mode C3 names (a return-shape change invisible to `tsc`, visible only at runtime).

## Notes for Lina (Task 1.4) and for whoever wires 1.5/1.6

- `resolveComponentRoots(dsRoot, packageRoot, envValue?)` is ready to feed `ComponentIndexer`'s pass-1 union once it accepts an array of roots — call it with the result of `findDesignSystemRoot(process.cwd())` as `dsRoot`.
- `resolveTokenIndexRoot` returns a discriminated union (`ok: true/false` with a `reason`) — no message strings are constructed yet; that's Task 1.6's catalog-string job. Consumers should switch on `reason` (`'empty-env-value' | 'run-generate' | 'partial'`) to select the right catalog message, and read `.partialCase` when `reason === 'partial'`.
- `resolveProductRoot` is a straightforward drop-in for the product server's bootstrap once it's wired to call `findDesignSystemRoot` first.

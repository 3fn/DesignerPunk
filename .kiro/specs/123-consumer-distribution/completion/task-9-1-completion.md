# Task 9.1 Completion — Birth/posture cases, incl. package-mode generate from the packed install + the drop-a-file bite

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 9 · **Agent**: Thurgood (Sonnet)
**Delegated-tier**: plan held

## What changed

Added `tests/consumer-integration.test.ts § "Spec 123 Task 9.1 — birth/posture cases (C6)"` — seven of the 19 U1-scheduled C6 named cases, plus the separate "package-mode generate from the PACKED install" criterion (Ada D-T-B1), all run against the shared packed install (`beforeAll`'s one pack → install), using fresh fixture subdirectories under a `.git`-FILE boundary (see the shared `gitBoundary` helper's doc comment — every fixture here is otherwise a subdirectory of the already-born outer `tempDir`, and without the boundary the walk would ascend into `tempDir`'s own birth signals).

Named cases (`it()` titles, all prefixed `C6:`):
1. **token index fails loud when born and absent/empty** — a fresh `init`'d fixture, before `generate` ever runs: MCP boot stderr contains the exact `bornIndexAbsentMessage`.
2. **init refuses in a born repo / partial** — re-running `init` against the already-born `tempDir` refuses with `initBornRepoMessage`; a `tier-no-config` fixture refuses `init` with `partialTierNoConfigMessage`.
3. **tier-only partial** — the same `tier-no-config` fixture: `generate` refuses with the partial string (never "run generate"), and the MCP server logs the same partial string (never the born "run generate" line).
4. **stranger repo with src/tokens** — a JWT-utility-shaped `src/tokens/index.ts` (no DesignerPunk exports, no config) classifies `unborn`, never partial.
5. **installed package dir is never born** — walking from `node_modules/@3fn/core/src` (itself born-shaped — it ships a real tier) never classifies there; the walk skips it and finds the CONSUMER's own root.
6. **package-mode posture** — a config with no `tokenSource` and no local barrel: absent/empty index → `packageModeIndexAbsentMessage`; present index → `tokenOrigin: designerpunk-package-mode`.
7. **unused-local-tier** — a config with no `tokenSource` PLUS a local DesignerPunk barrel: `generate` refuses with `partialUnusedLocalTierMessage`.

Plus, separately (not one of the 19): **package-mode generate from the PACKED install** — a fresh package-mode fixture's `generate` succeeds, producing `dist/DesignTokens.web.css` (flat `dist/` — this fixture's config carries no `output` override, so `ConfigLoader`'s DEFAULT applies; only `init`'d configs set `output: './dist/tokens'`) and `token-index/primitives.yaml`.

## Targeted tests + result

`npm run test:consumer` (full file, since these cases share the outer pack → install) — all 8 `it()`s in this subtask's describe block **PASS**. See the parent completion doc for the full-suite run.

## Application-time adaptations

1. **Scope narrowed for "unused-local-tier"**: design.md's row also names an MCP-level check ("BOTH `generate` and the MCP server refuse with the partial message"). While writing it, the MCP-level half surfaced a genuine, pre-existing packaging defect unrelated to Task 9: a bundled `application-mcp.js`'s inlined `bornRepo.findDesignSystemRoot` mis-resolves its own `packageRoot` (esbuild bundling collapses `__dirname` to the bundle's own directory, one level shallower than `bornRepo.ts`'s real un-bundled position), corrupting the `isSteward` check this partial sub-case depends on. **Not fixed here** — `bornRepo.ts` is Task 1's Primary Artifact, not Task 9's. Filed: `.kiro/issues/2026-09-27-bundled-resolvepackageroot-isSteward-drift.md` (owner: Ada). The test itself keeps only the `generate`-refusal half, which design.md's row also requires and which is unaffected by the bug — the "tier-only partial" case (unaffected by this bug) already exercises the row's MCP-message property.
2. **The drop-a-closure-2-file bite** (package-mode generate's own criterion) is a MANUAL verification, not automated test code — a packaging mutation (edit `package.json`, re-pack, re-install) is not something a running suite can safely execute mid-run. Executed manually; see the parent completion doc's "Bites executed" section for the transcript, including a disclosed substitution (the literally-named `src/constants/**` file turned out not to be load-bearing for `generate` at runtime — only referenced in a comment, not imported — so I substituted a genuinely load-bearing closure-2 member, `src/types/PrimitiveToken.ts`, to demonstrate the property the criterion actually cares about).
3. **Path assertion for the package-mode-generate fixture**: initially asserted `dist/tokens/DesignTokens.web.css` (copying the `init`'d-fixture convention used elsewhere in this file); corrected to flat `dist/DesignTokens.web.css` once the actual `ConfigLoader` default (`output: 'dist'`, no `/tokens` suffix) was confirmed — `init` is what sets the `/tokens` suffix, and this fixture never runs `init`.

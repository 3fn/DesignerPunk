# Task 1 Completion — Birth detection, root policy, indexer anchoring, and live reindex

**Spec**: 123 — Consumer Distribution · **Unit**: U1 — Distribution substrate & packaging truth (Tasks 1–9, gated at Task 9) · **Type**: Implementation · **Validation**: Tier 3
**Agent (plan)**: PRIMARY Ada (Sonnet); Lina (Opus) — 1.4
**Delegated-tier**: plan held
**Traces**: Reqs 2.1, 2.1a, 2.5, 15A.3, 19A.5a, 3.7a · design C2, C3, DD3, DD23, DD24

---

## Success Criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| `findDesignSystemRoot` returns the specified `state`, `partialCase` and `tierDir` for **nine named cases**: (1) born · (2) package-mode · (3) partial `config-no-tier` · (4) partial `unused-local-tier` · (5) partial `tier-no-config` · (6) partial `manifest-only` · (7) unborn · (8) the steward exemption · (9) a consume-posture manifest alone → unborn. **Instrument**: `bornRepo.test.ts`, one test per case, with the count asserted. | ✅ verified met | `src/cli/__tests__/bornRepo.test.ts` — `NINE_NAMED_CASES` data table (one entry per case) consumed by `test.each`, plus `test('exactly nine named cases are defined', () => expect(NINE_NAMED_CASES.length).toBe(9))`. Bite (delete case 9) → `Expected: 9, Received: 8` → restored (task-1-1-completion.md addendum). |
| Each of the walk's four boundary behaviors has a named case whose removal turns it red, recorded in the subtask doc: the start at `process.cwd()`; test-then-stop at `.git` incl. `.git` as a file; the `node_modules` skip; consume-posture manifests ignored. | ✅ verified met | `src/cli/__tests__/bornRepo.test.ts` › describe block `findDesignSystemRoot — the walk's four boundary behaviors` (4 tests). Bites 1–4 recorded red then restored — task-1-1-completion.md § "Bites recorded red". |
| The three barrel export forms (function, const/let, re-export) each classify born — three cases. | ✅ verified met | `src/cli/__tests__/bornRepo.test.ts` › describe block `findDesignSystemRoot — the three accepted barrel export forms` (3 tests, all pass). |
| The resolvers return C3's table values for every row. **Instrument**: a table-driven test whose row count equals C3's table rows, with the count asserted. | ✅ verified met | `src/cli/__tests__/mcpDataRoots.test.ts` — `C3_TABLE` (4 rows: component, token index, product, package-owned), each row's `call()` invoking the real resolver against a value transcribed from design.md's C3, `expect(C3_TABLE.length).toBe(4)`. Bites (delete a row; mutate `resolveTokenIndexRoot`'s unborn `source`) → red → restored (task-1-2-completion.md addendum). |
| **The union is applied at indexer pass 1; precedence keys on the declared component name.** A fork fixture whose directory name differs from its declared name, inheriting a package parent, resolves and wins. Bite (union after pass 1) recorded red. | ✅ verified met | `application-mcp-server/src/indexer/__tests__/MultiRootIndexing.test.ts › (i) applies the union at pass 1: a fork with a different directory name, inheriting a package parent, resolves and wins on its DECLARED name`. Bite recorded red in task-1-4-completion.md (Lina) § "Bites" #1. |
| **A consumer component ADDED or EDITED while the server runs is reflected in `get_component_catalog`** (T-L2). The watcher and `StalenessGate` watch the **consumer root**; the package root is exempt as immutable. Bite (watch the package root only) recorded red. *Scope: one add and one edit, exercised on the application server.* | ✅ verified met | `application-mcp-server/src/__tests__/consumerRootLiveReindex.test.ts` (3 tests: watched-set/gate, staleness gate ADD+EDIT, file watcher ADD+EDIT). Bite recorded red in task-1-4-completion.md (Lina) § "Bites" #2. |
| **Pass 3's composed-token resolution runs across both roots, and the reindex path does not reuse a stale `lastProjectRoot`.** One test each. | ✅ verified met | `MultiRootIndexing.test.ts › (iii) pass 3 resolves composed tokens across BOTH roots, in both directions` and `› (iv) the token reindex path anchors on bornRoot — never a component-root derivation, never a stale anchor` (updated at Task 1.5 for the added `explicitTierDir` third argument — task-1-5-completion.md § "Bites recorded red" #2). |
| **The theme root follows the served index's recorded `tierDir`.** Bite (the hardcoded `projectRoot/src/tokens/themes` read) recorded red. | ✅ verified met | `application-mcp-server/src/indexer/__tests__/ThemeRootFollowsIndex.test.ts` (7 tests: `resolveThemeTierRoot` precedence + malformed-JSON safety; the package-mode regression closed; `ComponentIndexer.options.tierDir` threading). Bite recorded red in task-1-5-completion.md § "Bites recorded red" #1. Also confirmed end-to-end via a compiled-bootstrap smoke test (real `dist/mcp/application-mcp.js`, real `meta.json`) — task-1-5-completion.md § "Targeted tests + result". |
| **`spawnServer`**: user-set data-root env wins, and **no `cwd` option is passed**. A runner test fails on either violation. | ✅ verified met | `src/cli/__tests__/spawnServer.test.ts` (3 tests). Bites (env-precedence order reverted; `cwd` option added) → red → restored — task-1-3-completion.md § "Bites recorded red". |
| Every catalog string this parent emits is string-equal to its design row (conformance test over the born, partial ×4, package-mode and TOKEN_INDEX_DIR rows). | ✅ verified met | `src/cli/__tests__/errorCatalog.test.ts` — 7 rows (born · partial ×4 · package-mode · explicit `TOKEN_INDEX_DIR`) transcribed independently from design.md and compared `toBe` (string equality) against `src/cli/shared/errorCatalog.ts`'s output; row count asserted and bitten (task-1-6-completion.md § "Bites recorded red"). Wiring into both MCP servers' bootstraps confirmed by `application-mcp-server/src/__tests__/errorCatalogWiring.test.ts` and `product-mcp-server/src/__tests__/errorCatalogWiring.test.ts`, plus the compiled-bootstrap smoke test (task-1-5-completion.md). |

Unmet or partially met criteria: None

---

## Additional verification

**Primary Artifacts: all shipped as declared** — `src/cli/shared/bornRepo.ts` (new); `src/cli/shared/mcpDataRoots.ts`; `src/cli/designerpunk.ts`; `application-mcp-server/src/indexer/{ComponentIndexer,TokenIndexer}.ts`; `application-mcp-server/src/**/ModeClassifier.ts`; `application-mcp-server/src/watcher/FileWatcher.ts`; `application-mcp-server/src/index.ts` (StalenessGate); both servers' declaration sites (`application-mcp-server/src/index.ts`, `product-mcp-server/src/index.ts`); tests. Two additional implementation files were created to satisfy the criteria without being separately named in the declared list (not a deviation — supporting implementation, not a substitute for a declared artifact): `src/cli/shared/errorCatalog.ts` and `application-mcp-server/src/indexer/resolveThemeTierRoot.ts`.

---

## Adaptations

1. **`generate` refuses in all four partial sub-cases, not only the two design.md names by name (`tier-no-config`, `unused-local-tier`).** design.md L195's prose reads: *"`generate` refuses in `tier-no-config` (D-B2), in `unused-local-tier` (D2-B1), and in a subdirectory of a partial repo."* Flagged during execution (task-1-5-completion.md adaptation #1) and **ACCEPTED as a recorded adaptation by the orchestrator, 2026-09-26**: refusing for all four is consistent with C2's refuse-don't-guess principle and D-B2's rationale, and all four "partial: X" catalog rows are refusal-shaped by construction. Evidence: `src/cli/__tests__/generateRefusals.test.ts` (5 tests, covering all four sub-cases plus the subdirectory case).
2. **A `tokenSource` key present with a non-literal value classifies `partial`/`config-no-tier` and refuses, rather than falling through to `package-mode`** — **Peter's ruling, 2026-09-26, option (a)**: keep the textual (never-loaded) `tokenSource` read; treat a present-but-unreadable value as a refusal, not an absence. The existing `config-no-tier` catalog string is reused, with its `<tokenSource>` slot filled by the fixed phrase `(a non-literal tokenSource value in designerpunk.config.ts)` when the real value cannot be resolved. Evidence: `src/cli/__tests__/bornRepo.test.ts › findDesignSystemRoot — non-literal tokenSource (Peter, 2026-09-26, option (a))`; `src/cli/shared/bornRepo.ts`'s `TokenSourceRead` discriminated union and `DesignSystemRoot.attemptedTokenSource` field.
3. **The `bornRepo.ts` tier/`tokenSource` reads are textual (regex over file content), never a loaded/executed config module** — an application-time interpretation of "resolution follows `ConfigLoader` exactly" (design.md C2), chosen because `findDesignSystemRoot` sits on the indexer's watch-triggered reindex path (Task 1.4) which can fire per file save; executing arbitrary consumer TypeScript on every such trigger would be unsafe and slow. `ConfigLoader` itself still loads the config for real generation. Residual risk (a non-literal `tokenSource` cannot be resolved) is closed by adaptation #2 above. Recorded in task-1-1-completion.md's file header and addendum.
4. **The package-root watch exemption keys on ACTUAL immutability (`isImmutableContext` — under `node_modules/`), not on component ROLE** (Lina, Task 1.4). The criterion says the package root is exempt "as immutable"; in every consumer install the package root sits under `node_modules/` so the two readings coincide. In the steward repo the package root IS the working tree (not immutable there), so it stays watched — the pre-123 behavior, and consistent with the steward's own env naming it as the consumer root. Recorded in task-1-4-completion.md adaptation #1.
5. **`reindexComponent`'s removal loop, fixed in scope** (Lina, Task 1.4): the pre-123 loop's second clause (`path.basename(componentDir) === dir`) was always true, so every watcher-triggered reindex deleted an arbitrary first entry from the index — a live ADD's catalog count would net to unchanged (+1 add, −1 random removal). Replaced with an exact per-directory `indexKeyByDir` map. Required for the live-ADD success criterion to be true at all. Recorded in task-1-4-completion.md adaptation #2.

Smaller adaptations (naming fallback for contracts-less components, `COMPONENT_DIR` accepted as a second env key, `resolveConsumerOwnedRoot` kept deprecated rather than deleted, the `runProductOnly`/`tokenOrigin`-on-responses scope decisions, the product-server declaration test's un-bitten duplicate logic) are recorded in their respective subtask completion docs (task-1-1 through task-1-6) and are not restated here.

---

## Known issues / carried items

- **Pre-existing `FileWatcher.test.ts` timing flake**: observed once, in a mixed full-suite run of `application-mcp-server`, failing on a timing-sensitive `fs.watch` assertion; passed in isolation and on two subsequent full-suite reruns. Not introduced by this task (no `FileWatcher.ts` logic changed in Tasks 1.5/1.6; the file itself was last touched at Task 1.4). Not filed as a new issue — a known class of flake for `fs.watch`-based tests under parallel worker contention.
- **Carried to Task 3**: `build:mcp-shared`'s esbuild-only script compiles only `resolvePackageRoot.ts` and `mcpDataRoots.ts`; `bornRepo.js` and `errorCatalog.js` are produced only by a full root `tsc` build. `package.json` (Task 3's Primary Artifact) needs both files added to that esbuild file list. Flagged first at task-1-4-completion.md (Lina, for `bornRepo.ts`) and restated at task-1-5-completion.md (for `errorCatalog.ts`).

---

## Validation

- `npx tsc --noEmit` at repo root, `application-mcp-server/`, and `product-mcp-server/` → clean (all three).
- `npm test` (root, functional lane) → **376 suites, 9135 tests, all pass**.
- `npx jest` from `application-mcp-server/` (its own jest config) → **29 suites, 369 tests, all pass**.
- `npx jest product-mcp-server/src/__tests__/` run **from the repo root** (its correct invocation — `product-mcp-server` has no local jest config, so a bare `cd product-mcp-server && npx jest` resolves an unrelated config and must not be used) → **9 suites, 96 tests, all pass**.
- Compiled-bootstrap smoke test (real `dist/mcp/application-mcp.js` and `dist/mcp/product-mcp.js`, run as child processes against scratch fixture repos): a `tier-no-config` partial repo → both servers print the exact `partial: tier-no-config` catalog string verbatim; a package-mode repo with `token-index/meta.json`'s `tierDir` pointed at this repo's real `src/tokens` → 9 warnings (theme found, no "not found" warning); repointed at a nonexistent directory → 10 warnings (the theme-not-found warning reappears) — a real, non-mocked confirmation that `meta.json`'s `tierDir` genuinely drives theme resolution.
- Every bite across Tasks 1.1–1.6 was reverted, run to a confirmed red result, and restored, with `git status --porcelain`/`git diff` checked clean of stray residue after each restore — see each subtask completion doc's "Bites recorded red" section for the individual red outputs.
- Orchestrator independently re-ran and confirmed: root `npm test` (376/9135), `application-mcp-server` jest (29/369), `product-mcp-server` via root jest (9/96), `tsc` ×3 clean, and spot-checked `C3_TABLE`'s real-resolver calls (orchestrator verification message, 2026-09-26).

## Subtask completion docs

`.kiro/specs/123-consumer-distribution/completion/task-1-1-completion.md` (Ada, incl. 2026-09-26 addendum), `task-1-2-completion.md` (Ada, incl. addendum), `task-1-3-completion.md` (Ada), `task-1-4-completion.md` (Lina), `task-1-5-completion.md` (Ada), `task-1-6-completion.md` (Ada).

---

## Addendum (2026-09-26, U1 fix-up — before Task 4, Peter-authorized)

Two born-repo regressions in Task 1's Primary Artifacts, found by the steward during U1 verification and fixed on this branch as a Task 1 fix-up (not a new parent). Both are cases the parent's own verification walk did not exercise: my "release-1 consumer path" trace (`feedback/tasks.md` § "[ADA R2]" answer (b)) confirmed birth detection, config emission, token/component copy, and MCP config, but never actually ran a screen-spec query or a `generate` invocation against a BORN fixture with real component content on one side and package content on the other — both defects only manifest once real DATA is walked through the born-vs-package split, which the trace's table-of-steps format didn't surface. **The orchestrator's miss, stated plainly**: neither Task 1's parent verification nor its independent re-run (the "Orchestrator independently re-ran and confirmed" line above) exercised the product server's gap-detection path or `generate`'s component-schema scan in a BORN fixture — both were verified only by config-shape and birth-state assertions, never by an end-to-end data walk. Filed and resolved per `.kiro/issues/2026-09-26-product-server-component-root.md` (main-side fix in #209; this addendum is the U1-side half).

### Fix 1 — product-server bootstrap passed only `roots[0]`, not the union

`product-mcp-server/src/index.ts`'s bootstrap (Task 1.5) resolved the precedence-ordered component root set (`resolveComponentRoots`) but then took only `roots[0]` (the precedence WINNER) rather than passing the whole set through to `GapDetector`. In a born repo, `roots[0]` is `<bornRoot>/src/components`, which post-`init` (Task 2) holds only a README — so `GapDetector.loadCatalog()` found zero components, and every DesignerPunk component named in a screen spec reported `not-found`. Gap detection silently became "everything is a gap" in exactly the repos 123 exists to serve.

**Fix** (mirrors #209's main-side `GapDetector`/`ProductIndexer`/`ProductMCPServer` widening to `string | string[]`, already merged):
- `componentDir` is now typed `string | string[]`.
- The `const component: ResolvedDataRoot = { path: componentRoots.roots[0], ... }` single-root extraction is removed.
- The boot log now logs every root (`components[0]`, `components[1]`, …), not one.
- `componentDir = componentRoots.roots` (the load-bearing line) — the FULL precedence-ordered set flows into `ProductIndexer` → `GapDetector`, which builds its catalog as the union (consumer ∪ package), the same rule the application server's `ComponentIndexer` follows at pass 1 (Task 1.4).
- The catch-path comment (the `DEFAULT_COMPONENT_DIR` fallback, reached only when root `dist/` is unbuilt) reworded to state plainly that this path is dev-repo-only and birth-aware resolution is unavailable there — `DEFAULT_COMPONENT_DIR` itself is UNCHANGED, per the issue's own "Resolution (main side)" § "Item 2" (changing it would regress the dev-repo path, since in this repo cwd == the package root and `src/components/core` is exactly where components live).

**Test**: `product-mcp-server/src/__tests__/ProductIndexerBornRepoRootSet.test.ts` (new, 2 tests), exercising `ProductIndexer` directly (the level the bootstrap constructs), not just `GapDetector` in isolation (already covered by #209's own `GapDetector.test.ts` additions):
- A born-repo fixture (consumer `src/components/` holding only a README) plus a package root, with a screen spec naming a package component (`Button-CTA`) → `indexer.getGaps('test-screen')` is `[]` — no gap.
- **Bite** (a standing regression test, not a one-off revert-and-restore — it literally reproduces the pre-fix construction): passing `roots[0]` only (`new ProductIndexer(productDir, consumerComponentsRoot)`, the exact pre-fix bootstrap shape) → `getGaps('test-screen')` returns `[{ component: 'Button-CTA', issue: 'not-found' }]` — **RED**, reproducing the defect exactly.

Run: `npx jest product-mcp-server/src/__tests__/` from the repo root → **10 suites, 106 tests, all pass** (was 9/96 pre-#209; #209 added `GapDetector.test.ts`'s 8-test describe block, this fix-up adds 2 more).

### Fix 2 — `generate`'s component-schema scan root pointed at a path `init` no longer writes to

`src/cli/designerpunk.ts:155`'s `componentSchemaDir = path.resolve(config.configDir, 'src/components/core')` fed the token-index's Class C′ consumer map (`generateTokenIndex.ts`'s `buildConsumerMap`). Its own comment said this was "the location `init` writes to" — true before Task 2, false after: `init` now gives a born repo an empty `src/components/` (no `core/` copy; Req 19A.2 removes it, Req 19A.6 creates the flat directory directly), so a born repo's token-index consumer map scanned a directory that either doesn't exist or holds only the consumer's README, and the `consumers:` field for every semantic/primitive token stayed empty for that consumer's own components.

**Design citation, checked before touching anything** (per the coordinator's instruction to search design intent first, not assume): `requirements.md` Req 3.5 states — *"The Class C′ fixture SHALL be re-premised: it builds on the `src/components/core` copy, which Requirement 19A removes ... It SHALL be re-authored to build the consumer's component tree **FROM NOTHING** — which is the stronger test, proving C′ for a consumer owning zero schemas."* This settles the question: the design's own intent is that Class C′ (the token-index consumer map) reflects the BORN CONSUMER'S OWN component tree at `src/components/` (never the removed `core/` copy), proven specifically for the from-nothing case. No other design.md/requirements.md text names `componentSchemaDir` directly; Req 3.5 is the load-bearing citation.

**Fix**: new exported `resolveComponentSchemaDir(dsRoot, configDir)` in `src/cli/designerpunk.ts`:
- `dsRoot.state === 'born'` → `<dsRoot.root>/src/components` (the flat, post-123 convention), UNLESS that directory holds no components AND a legacy `src/components/core/` nested level (a pre-123, not-yet-`sync`-migrated consumer) DOES hold components — mirroring `ComponentIndexer.collectComponentSources`'s own precedence (Task 1.4): a `core/` that is not itself a component dir but contains component dirs is a legacy level.
- Every other state (`package-mode` — including the steward repo's own dev-mode classification — `partial`, `unborn`) → UNCHANGED: `<configDir>/src/components/core`, exactly as before. `generate` already refuses outright on `partial` before this function is reached, so only `born` and `package-mode`/`unborn` are live branches in practice.
- Verified live against THIS repo (not just simulated): `findDesignSystemRoot(process.cwd())` here classifies `state: 'package-mode'`, and `resolveComponentSchemaDir` returns the byte-identical `src/components/core` path the old hardcoded line produced — confirmed via a direct `npx tsx -e` run, not inferred.

**Test**: `src/cli/__tests__/resolveComponentSchemaDir.test.ts` (new, 6 tests):
- Born repo, flat component (`src/components/MyButton/`) → the flat root.
- Born repo, freshly born (README only, no components) → still the flat root (never the legacy path).
- Born repo, legacy pre-123 layout (`src/components/core/LegacyButton/`, no flat components) → the legacy root.
- `package-mode` (the steward repo's own dev-mode classification) → unchanged, `<configDir>/src/components/core`.
- `unborn` → falls through to the same unchanged default.
- **Bite**: asserts the fixed resolver's output for a born, flat-tree fixture is NOT the pre-fix hardcoded `<configDir>/src/components/core` path, and that the pre-fix path resolves to nothing on disk while the fixed path resolves to the consumer's real tree — i.e., restoring the hardcoded path is the exact regression this test would catch.

`backward-compat.test.ts`'s existing `componentSchemaDir` expectation (`require('path').resolve('/tmp', 'src/components/core')`) is UNCHANGED and still passes: that test calls the real (unmocked) `findDesignSystemRoot(process.cwd())`, which — running under Jest from this repo's root — classifies `package-mode`, so `resolveComponentSchemaDir` takes the unchanged branch.

### Validation (this addendum)

- `npx tsc --noEmit` → clean.
- `npm test` (root) → **380 suites, 9187 tests, all pass** (was 378/9171 at Task 3's own completion; +2 suites / +16 tests — 8 from #209's `GapDetector.test.ts` additions already on `main`, 6 from `resolveComponentSchemaDir.test.ts`, 2 from `ProductIndexerBornRepoRootSet.test.ts`).
- `npx jest product-mcp-server/src/__tests__/` (from repo root) → **10 suites, 106 tests, all pass**.
- `npx jest` from `application-mcp-server/` → **29 suites, 369 tests, all pass** (unaffected — no `application-mcp-server` files touched).
- `npm run test:scripts` → **8 suites, 168 tests, all pass** (unaffected).
- `npx tsx scripts/pack-assert.ts` (after a fresh `npm run build`) → **40/40 assertions still pass**; `product-mcp-server/src/**` still confirmed NOT ADDED (unchanged shipping status) — no packaging-floor regression from this fix-up.
- `npx tsx scripts/check-completion-criteria-parity.ts` → re-run after this addendum; **`parent 1: PASS`** (unchanged — this addendum adds to Task 1's completion doc but does not alter its Success Criteria table, which is unaffected by a fix-up scoped to Primary Artifacts, not criteria text).
- Both bites (the `ProductIndexer` roots[0]-only reproduction; the `resolveComponentSchemaDir` pre-fix-path comparison) are standing regression tests, kept red-if-reverted, not one-off revert-and-restore checks against the working tree.

### Files touched

`product-mcp-server/src/index.ts` (Task 1 Primary Artifact), `src/cli/designerpunk.ts` (Task 1 Primary Artifact), plus two new test files: `product-mcp-server/src/__tests__/ProductIndexerBornRepoRootSet.test.ts`, `src/cli/__tests__/resolveComponentSchemaDir.test.ts`. Cites `.kiro/issues/2026-09-26-product-server-component-root.md` (moved to `.kiro/issues/archive/` in this same commit, status RESOLVED) and PR #209 (the main-side `GapDetector` fix this addendum's Fix 1 depends on).

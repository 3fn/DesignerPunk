# Task 1.4 Completion — Indexer: all four written interactions

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 1 · **Agent**: Lina (Opus) — secondary on Ada's Task 1 row
**Write scope**: charter (`application-mcp-server/**`, `.kiro/specs/**`); every edited path is also a Task 1 Primary Artifact (T1-(B) ballot verified to read RATIFIED before the first edit).

## What changed

**(i) Multi-root at pass 1, precedence on the declared name, the legacy `core/` level** — `application-mcp-server/src/indexer/ComponentIndexer.ts`
- `indexComponents(componentsDir: string | string[], …, options?: { projectRoot? })` — the first argument is now the ROOT SET in precedence order (consumer first, package last). A single string is still accepted (legacy single-root callers unchanged). Roots are resolved and deduped.
- Pass 1 collects every component dir across the roots (`collectComponentSources`), resolves ONE winner per **declared** name (contracts `component`; the schema `name` when a component has no contracts; the dir name only as a last resort), and fills `contractsCache` from the winners **before** any assembly. Pass 2 assembles only the winners. A same-root duplicate gets a warning; a consumer component shadowing a package one is silent (that is a fork).
- The legacy level: under a root, a `core/` dir holding component dirs is indexed as one level, ranked with that root, with a `Legacy component level: …` warning on each load. A `core/` that is itself another root in the set (the steward repo's `src/components` → `src/components/core`) is left to that root, so there are no duplicates and no warning.
- `reindexComponent` is precedence-aware. A shadowed package dir can't overwrite a fork. A consumer dir added over a package one of the same declared name replaces it. Only the entry the reindexed dir produced is removed (see adaptation 2).

**(ii) `FileWatcher` + `StalenessGate` + `ComponentIndexer.dataDirs` over the consumer root, with the package root exempt**
- New `mutableComponentRoots(roots)` (exported from `ComponentIndexer.ts`) returns the roots that are not immutable (`isImmutableContext`, i.e. not under `node_modules/`). One rule feeds all three surfaces:
  - `ComponentIndexer.dataDirs` = mutable component roots + the other data dirs.
  - `FileWatcher` (`watcher/FileWatcher.ts`) now takes `string | string[]` and runs one watcher per mutable root; change paths are root-relative, and `core/<Name>/…` resolves correctly.
  - The `StalenessGate` wiring in `index.ts`: `dataDirs` = mutable component roots + non-immutable other dirs. `isImmutable` is now "nothing mutable to scan", where it used to be "componentsDir is in node_modules".
- `index.ts`:
  - `DataPaths.componentsDir: string | string[]` plus `projectRoot?`.
  - One `fullIndex()` helper now serves `start()`, the gate's `onRebuild`, `rebuild_index` and the testable server.
  - Test seams on `createTestableServer(paths, { stalenessThresholdMs? })`: `initialize()` now marks the gate indexed, plus `startWatching` / `stopWatching` / `getWatchedDirs`.

**(iii) Pass 3 across both roots** — pass 3 (`resolveComposedTokens`) runs over the precedence-resolved union index. A consumer component composing a package child resolves that child's tokens. A package component composing a child the consumer forked gets the **fork's** tokens.

**(iv) `lastProjectRoot` replaced by `bornRoot`** — the field is now `bornRoot`, set on every full index from the caller's explicit anchor (`options.projectRoot`, i.e. C3's `projectRoot = bornRoot`). The legacy `root/../../..` derivation is used only when no anchor is passed, and then from the **package** (lowest-precedence) root. `reindexTokens` reads `bornRoot`, and the anchor is never re-derived from a component root.

**Application-server bootstrap wiring (orchestrator ruling)** — `index.ts` `require.main` block
- `findDesignSystemRoot(process.cwd())` is called via `require('../../dist/cli/shared/bornRepo')` — the same consumption contract as `mcpDataRoots`, with a new shape-only `BornRepoModule` declaration.
- `resolveComponentRoots({ envValue: COMPONENTS_DIR || COMPONENT_DIR, dsRoot, packageRoot })` feeds `componentsDir`.
- `projectRoot = dsRoot.root ?? packageRoot`.
- `resolveTokenIndexRoot` is wired: `ok` → path, logged with its `tokenOrigin`; not ok → `tokenIndexDir` undefined, with a structural reason logged (catalog strings are 1.6's work — `TODO(Spec 123 Task 1.6)` at the site).
- The boot log gains lines for the design-system root state and the project root, plus one line per component root.
- The product server's bootstrap and the theme-root/`tierDir` reads are untouched (1.5).

## Targeted tests + result

- New `application-mcp-server/src/indexer/__tests__/MultiRootIndexing.test.ts` — **6/6 pass**:
  - (i) the fork wins and resolves, with the catalog count asserted at 4;
  - (i) legacy `core/` recognized, with the warning on each of 2 loads (count 5);
  - (i) steward layout: no duplicates;
  - (iii) composed tokens across roots, both directions;
  - (iv) the reindex anchor is `bornRoot`, and it is not stale across re-anchoring;
  - reindex precedence.
- New `application-mcp-server/src/__tests__/consumerRootLiveReindex.test.ts` — **3/3 pass**. It runs on the application server via `callTool('get_component_catalog')`:
  - the watched set is `[consumerRoot]` and the package root is absent from the gate (a package edit is not reflected);
  - staleness gate: one ADD (count +1) and one EDIT (purpose updated);
  - file watcher, with the gate disabled: one ADD and one EDIT.
- `mcpDataRootsDeclaration.test.ts` (application) — **+1 test** (the `BornRepoModule` parity against the real `dist/cli/shared/bornRepo.js`); the file passes in full.
- The whole `application-mcp-server` suite: **27 suites, 358 tests, all pass** (was 25/348; +2 suites, +10 tests).
- `npx tsc --noEmit` is **clean** at the repo root and in `application-mcp-server`.
- Full `npm test` (root): **373 suites, 9114 tests, all pass**.
- Compiled-bootstrap smoke (`application-mcp-server/dist/index.js`), all three cases **0 warnings**:
  - steward, no env → `package-mode`, 34 components;
  - steward with the `.mcp.json` env → the env and package roots dedupe, 34 components;
  - an empty scratch dir → `unborn → package`, token-index `package-consume` / `designerpunk-reference`, 34 components.
- The esbuild bundle inlines `findDesignSystemRoot`.

### Bites (each: file copied aside → mutated → run → copied back; `diff -q` against the saved copy confirmed identical after restore)

1. **Union after pass 1** (the contracts cache is filled during the pass-2 assembly loop instead of at pass 1) → **RED**: `(i) applies the union at pass 1 …` — `expect(fork.contracts.active.interaction_pressable?.source).toBe('inherited')` — `Expected: "inherited" Received: undefined`. Restored → green.
2. **Watch the package root only** (`watchedComponentRoots = componentRoots.slice(-1)`) → **RED, 3/3**:
   - watched-set test: `- Expected - 1 / + Received + 1`;
   - gate test: `Expected value: "Consumer-Added"  Received array: ["Card-Consumer", "Widget-Primary", "Panel-Base", "Widget-Base"]`;
   - watcher test: `Expected: true  Received: false`.

   *My first attempt at this bite failed to compile (TS6133: `mutableComponentRoots` unused) and ran 0 tests. I did not count that as red; I re-applied it with the import kept referenced, and the result above is from that second run.* Restored → green.
3. *(Beyond the criteria, for non-vacuity)*
   - (iv): `bornRoot` derived from `roots[0]` → RED: `Expected: "/tokens-a", "<tmp>/dp-multiroot-…"  Received: "/tokens-a", "<tmp>"`.
   - Legacy recognition removed → RED: `Received: null`.

   Both restored.

## Application-time adaptations

1. **Exemption keyed on immutability, not on role.** The criterion says the package root is exempt *as immutable*. `mutableComponentRoots` exempts any root under `node_modules/`, and in every consumer install that is exactly the package root. In the steward repo the package root is the working tree; it stays watched there, which is the pre-123 behaviour, and the steward's env names it as the consumer root anyway. The two readings (always exempt the package entry, vs. exempt the immutable root) differ only in the steward and `npm link` cases. I don't believe this changes intent, but I'm flagging it in case the design meant "role".
2. **Defect fixed in scope: `reindexComponent`'s removal loop.** The pre-123 loop tested `meta.name === dir || path.basename(componentDir) === dir`. The second clause is always true, so every watcher-triggered reindex deleted an **arbitrary first entry** from the index. With a live ADD this left the catalog count unchanged: +1 from the add, −1 from a random entry. It is replaced by an exact per-directory `indexKeyByDir` map. This is required for the add criterion to be true at all.
3. **Missing-root warning only when NO root exists.** Before, a single missing root warned and returned. Now, if at least one root exists, a missing root (e.g. a born repo with no `src/components` yet) is skipped silently rather than degrading health. When all roots are missing, the old warn-and-return still applies.
4. **The declared name falls back to the schema `name`** when a component has no `contracts.yaml` (the design names the contracts `component` field). Without this, a contracts-less component couldn't take part in precedence.
5. **`COMPONENT_DIR` is accepted** as a second key after `COMPONENTS_DIR`, per C3's table ("`COMPONENTS_DIR` / `COMPONENT_DIR`").
6. **`resolveConsumerOwnedRoot` stays declared** in the application interface. It is still exercised by Ada's declaration test and still used by the product server; the application bootstrap no longer calls it.

## Left for Ada (1.5 / 1.6) and one build note

- **`bornRepo.js` in dist comes only from root `tsc`.** `build:mcp-shared` (esbuild) emits only `resolvePackageRoot` and `mcpDataRoots`. The full `npm run build` runs `tsc` first, so the bundle and the tsc artifact resolve. A standalone `build:mcp-shared` on a fresh tree would not produce `bornRepo.js`, and the bootstrap would fall to its legacy-defaults catch branch with a warning. Adding `src/cli/shared/bornRepo.ts` to `build:mcp-shared` would close this, but `package.json` is outside Task 1's Primary Artifacts (Task 3 lists it), so I did not edit it.
- **1.5, theme root:**
  - `modeClassifier.load(projectRoot)` and `tokenIndexer.indexTokens(dir, projectRoot)` still read `<projectRoot>/src/tokens/themes/…`. `projectRoot` is now `dsRoot.root`.
  - In a **package-mode** consumer that path has no themes, so mode classification degrades until 1.5 points these reads at `meta.json` `tierDir`. Before this change, package-mode resolved `projectRoot` to the package root.
  - `reindexTokens` passes `bornRoot`; 1.5 may switch it to the tier. The (iv) test spies on `indexTokens`' second argument and will need the matching update.
- **1.6, strings:**
  - the token-index unavailable line (`reason: run-generate | partial | empty-env-value`, `TODO` at the site);
  - `start()`'s stale `Token index not available (Spec 096 pending)` line, which now fires whenever the resolver refuses;
  - `tokenOrigin` labelling on responses (it only reaches the boot log today).
- **Product server bootstrap**: untouched (1.5, per the ruling).
- **Out of scope (for the record)**: deleting a consumer fork does not restore the package component until the next full rebuild. Neither the watcher (which only reacts to `.yaml` changes on existing dirs) nor the mtime-based gate sees a deletion. This was already the case for any deletion before 123.

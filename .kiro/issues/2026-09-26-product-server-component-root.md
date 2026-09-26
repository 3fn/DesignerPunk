# Issue: product server's component root — gap detection breaks in born repos (U1-introduced), plus a stale fallback constant

**Date**: 2026-09-26
**Status**: ACTIVE
**Owner**: Lina (the `GapDetector` / component-catalog side); the U1 bootstrap line is a Task 1 artifact on `task/123-u1-substrate`
**Trigger**: **before the U1 unit PR merges (Spec 123 Task 9)** — item 1 is a regression that exists only on the U1 branch and would ship in release 1. Item 2 rides the same fix.
**Source**: steward verification of Spec 123 U1 Task 2 (Ada flagged item 2 in her Task 2 handoff); item 1 found while scoping item 2. Peter ruled 2026-09-26: own Lina issue, not folded into Task 4.

## 1. Gap detection reads only the precedence winner — in a born repo that is the consumer's empty `src/components/` (HIGH, U1 branch only)

Task 1.5 wired `product-mcp-server/src/index.ts`'s bootstrap to the birth-aware resolver, but — because `ProductIndexer`/`GapDetector` are single-root — it takes `resolveComponentRoots(...).roots[0]` (the comment at the call site says so) rather than the union.

- Born repo: `roots[0]` = `<bornRoot>/src/components`. After `init` (Task 2) that directory **exists and holds only a README**.
- `GapDetector.loadCatalog()` (`product-mcp-server/src/indexer/GapDetector.ts`) scans one directory for `*/component-meta.yaml`. It finds none, so the catalog is empty — and because the directory *exists*, it does **not** hit the "gap detection disabled" path.
- Result: every DesignerPunk component named in a screen spec reports `not-found`. Gap detection silently turns into "everything is a gap" in exactly the repos 123 exists to serve (the BECOME posture).
- On `main` today this doesn't occur (the fallback path copies `src/components/core` into consumers). It is introduced by U1.

**Fix shape (proposed, owner decides)**: `GapDetector` accepts the precedence-ordered root set and builds its catalog as the union (consumer ∪ package — the same rule the application server's `ComponentIndexer` now follows at pass 1, Task 1.4). Also check the package layout level (`src/components/core/` vs `src/components/`) the way Task 1.4's legacy-`core/` handling does. Then the U1 bootstrap passes `componentRoots.roots` instead of `roots[0]` (Task 1's artifact, edited on the U1 branch).

**Suggested sequencing (clean record)**: a Lina `fix/` PR to `main` making `GapDetector` root-set-capable (harmless on `main`) → the U1 branch syncs from `main` → the one-line bootstrap change lands on the U1 branch as a Task 1 artifact edit, recorded as a dated addendum to `task-1-completion.md`.

**Test**: a born-repo fixture (consumer `src/components/` holding only a README) where a package component named in a spec reports `ok`; bite = pass `roots[0]` only → red.

## 2. Stale fallback constant (LOW)

`product-mcp-server/src/index.ts`: `const DEFAULT_COMPONENT_DIR = 'src/components/core';` — used only when the root `dist/` is unbuilt (the `require('../../dist/cli/shared/…')` catch path). Stale against the post-U1 consumer convention (`src/components`). Correct it, or make the catch path log that birth-aware resolution is unavailable instead of guessing.

## Filed by

Steward (main-loop), 2026-09-26, at Peter's direction.

## Resolution (main side) — 2026-09-26

**By**: Lina, on `fix/product-server-gapdetector-root-set` (cut from `main` at `a6b737c3`). **Status stays ACTIVE** — the issue closes when the U1-side bootstrap change below lands on `task/123-u1-substrate`.

### Item 1, main half — `GapDetector` is root-set capable

- `product-mcp-server/src/indexer/GapDetector.ts`: the constructor takes `string | string[]` — a precedence-ordered root set (consumer first, package last, the order `resolveComponentRoots` produces) or the legacy single root. Roots are resolved and deduped. `loadCatalog()` builds the catalog as the **union** of every existing root. A component is still recognized by `component-meta.yaml`, and catalog names are still directory names, so exact-match semantics are unchanged.
- Legacy `core/` level, mirroring `ComponentIndexer.collectComponentSources` on the U1 branch (Task 1.4): if a root holds a `core/` that has no `component-meta.yaml` of its own but contains component directories, that `core/` counts as one legacy level. Its components join the catalog, and a named `Legacy component level: …` stderr line is logged. If that `core/` is *itself* another root in the set (the steward-repo shape: consumer `src/components` plus package `src/components/core`), it is left to that root and no warning is logged.
- "Gap detection disabled" now fires only when **no** root exists. The message format is unchanged (`Component directory not found: <roots> — gap detection disabled`), so the existing console-allowlist pattern for this suite still matches.
- Types were widened so the U1 edit stays in the bootstrap block: `ProductIndexer`'s constructor now takes `componentDir: string | string[]` (default unchanged), and `ProductMCPServer`'s constructor (`index.ts` line 169) takes `componentDir: string | string[]`. The U1 branch does not touch line 169, so syncing from `main` merges cleanly.
- Tests (`product-mcp-server/src/__tests__/GapDetector.test.ts`, new `describe('with a precedence-ordered root set (born repo)')`, 8 tests):
  - README-only consumer `src/components/` plus a package root: package component → `ok`, unknown → `not-found`, catalog size 5, no stderr.
  - A consumer-only component → `ok` (size 6).
  - A consumer fork of a package name is counted once.
  - A missing root next to an existing one does not disable detection.
  - Every root missing → disabled, and one-offs still resolve.
  - The legacy `core/` level is counted, with its warning.
  - A steward-shape `core/` that is itself a root is not double-counted and logs no warning.
  - The single-string form still works.
- **Bite**: making `loadCatalog` read only `roots[0]` turned 6 of the 8 new tests red. The lead red line: `README-only consumer root: package components are in the catalog`, `expect(detector.getCatalogSize()).toBe(5)`, got `0`. After restoring the file, no bite residue remains.

### Item 2 — `DEFAULT_COMPONENT_DIR = 'src/components/core'`: left unchanged, deliberately

It is not stale in any context where it can run:
- **On `main`**, `init` still copies into `src/components/core`, and the package root *is* `src/components/core`. The constant is correct.
- **On U1**, the constant is reached only through the bootstrap's `catch` path, which fires when the root `dist/cli/shared/*` modules are unbuilt. In a consumer install that cannot happen: the esbuild bundle (`dist/mcp/product-mcp.js`) inlines those requires at build time. So the path is effectively dev-repo only. There, cwd is the package root, and `src/components/core` is exactly where the components live, so the fallback lands on the right data.
- Changing it to `src/components` would *regress* that dev-repo path. `src/components/core` would then be read as a legacy level, and a spurious "move them up" warning would be logged on every load.

The honest improvement is on the U1 side, not here. When the bootstrap change below lands, the catch-path comment should say that the fallback is the dev-repo package root and that birth-aware resolution is unavailable. No constant edit on either branch.

### U1-side change (NOT applied here — lands on `task/123-u1-substrate` after Task 3, as a Task 1 artifact edit with a dated addendum to `task-1-completion.md`)

Prerequisite: sync U1 from `main` after this fix merges. Line numbers below are from `origin/task/123-u1-substrate` @ `82051e7b`. All edits are in `product-mcp-server/src/index.ts`:

1. **L585**: `let componentDir: string = process.env.COMPONENT_DIR || DEFAULT_COMPONENT_DIR;` → `let componentDir: string | string[] = process.env.COMPONENT_DIR || DEFAULT_COMPONENT_DIR;`
2. **L607–609 comment**: replace the "has not been upgraded to multi-root … take the precedence WINNER (roots[0]) … rather than the union" text with a note that GapDetector builds its catalog as the union of the full root set (this issue).
3. **L615–618**: remove the single-root `const component: ResolvedDataRoot = { path: componentRoots.roots[0], source: componentRoots.sources[0] };`.
4. **L633**: `logRoot('components', component);` → log every root, e.g. `componentRoots.roots.forEach((r, i) => logRoot(\`components[${i}]\`, { path: r, source: componentRoots.sources[i] }));`.
5. **L652**: `componentDir = component.path;` → `componentDir = componentRoots.roots;` (**the load-bearing line**).
6. Optional: the catch-path comment (item 2 above).

Other call sites were checked and need nothing further:
- `ProductMCPServer` (L169) → `ProductIndexer` → `GapDetector` already pass `string | string[]` through after this fix.
- The staleness gate watches only `productDir`, so it is unaffected.
- Existing string callers (the `ProductIndexerWalk`/`Spec108` tests and `src/__tests__/integration/Spec107-DesignLanguageContext.test.ts`) keep working unchanged.

Suggested U1 test: a bootstrap-level or `ProductIndexer`-level born-repo case, passing `[bornRoot/src/components, packageRoot/src/components/core]`, with a screen spec naming a package component and asserting no `_componentGaps`. The bite is passing `roots[0]` → the gap appears.

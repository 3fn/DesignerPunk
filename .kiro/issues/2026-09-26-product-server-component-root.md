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

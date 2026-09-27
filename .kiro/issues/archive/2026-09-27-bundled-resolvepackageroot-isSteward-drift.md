# Issue: a bundled `application-mcp.js`'s inlined `bornRepo.ts` mis-resolves its own `packageRoot`, corrupting the `isSteward` check

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Ada (Task 1 primary agent; `src/cli/shared/bornRepo.ts` / `resolvePackageRoot.ts` are her Primary Artifacts, not Task 9's)
**Trigger**: next touch of `bornRepo.ts`'s internal `resolvePackageRoot` call, or before any spec relies on `unused-local-tier` vs `package-mode` disambiguation being correct inside a BUNDLED (esbuild) server.
**Source**: Spec 123 U1 Task 9 (Thurgood), found while writing the "unused-local-tier" C6 consumer-guard case against the packed install.

## The gap

`findDesignSystemRoot` (`src/cli/shared/bornRepo.ts`) calls, internally:

```ts
const packageRoot = resolvePackageRoot(path.dirname(__dirname));
```

This assumes `bornRepo.ts`'s own file sits at `src/cli/shared/` — ONE level deeper than `designerpunk.ts`/`init.ts` (`src/cli/`), so `path.dirname(__dirname)` compensates before handing off to `resolvePackageRoot`'s own "two levels up" logic (see that function's LEVELS-UP ASSUMPTION doc comment).

That assumption breaks when `bornRepo.ts` is **inlined into an esbuild bundle** (`dist/mcp/application-mcp.js`, `dist/mcp/product-mcp.js`, `dist/mcp/docs-mcp.js` — `build:mcp-shared`'s stated "the require is statically resolved and INLINED at build time"). Inside the bundle, `__dirname` for every inlined module resolves to the BUNDLE FILE's own directory (`dist/mcp/`), not the module's original source-tree depth. So `path.dirname(__dirname)` yields `dist` (one level too shallow), and `resolvePackageRoot('dist')` computes `dist/../..` = one level ABOVE the real package root (`node_modules/@3fn/`) — no `package.json` there, so it warns and falls back to `process.cwd()`:

```
[resolvePackageRoot] WARNING: no package.json two levels above <pkg>/dist — falling back to cwd (<cwd>). Package-relative data may not resolve.
```

**Where it bites**: this bogus `packageRoot` feeds `isSteward = path.resolve(dir) === path.resolve(packageRoot)` inside `evaluateDirectory`'s `hasConfig && !hasTokenSource` branch (the package-mode vs `unused-local-tier` disambiguation). When a packed consumer runs the bundled server from a directory that happens to equal the bogus fallback (`process.cwd()` — which it always does, since the fallback IS `cwd`), `isSteward` evaluates **true** for every non-steward consumer, misclassifying a real `unused-local-tier` fixture as `package-mode` instead.

**Blast radius, empirically checked**: `dsRoot.state`/`dsRoot.root` themselves are UNAFFECTED for `born`/`config-no-tier`/`tier-no-config`/`manifest-only`/`unborn` — this function is called only inside the `hasConfig && !hasTokenSource` branch, and only changes the OUTCOME when a local DesignerPunk-shaped barrel is ALSO present (i.e. only `unused-local-tier` vs `package-mode`). It also corrupts `packageOwnedTierDir` in that same branch (unused when the branch resolves to `package-mode`, since `tierDir` is then the package's own tier by design — so the practical effect is narrower still, but the disambiguation itself is wrong).

**Masked in this repo's own dev use**: the steward's own `cwd` when running its own bundled `mcp:app` usually already equals the real package root, so the bogus fallback happens to coincide with the CORRECT value there — which is presumably why this has not surfaced before now.

## Scope

Not fixed here (`bornRepo.ts` is Task 1's Primary Artifact, not Task 9's — Thurgood's write scope for Task 9 is `tests/consumer-integration.test.ts` + fixtures). A minimal fix likely replaces the file-depth-compensated `resolvePackageRoot(path.dirname(__dirname))` call with a depth-independent upward walk for `package.json` (the same class of fix `resolvePackageRoot`'s own doc comment already anticipates: *"If a future caller does NOT sit two levels below the package root, do not fork this logic — generalize THIS function instead."*).

## Filed by

Thurgood (Spec 123 U1 Task 9), 2026-09-27. Test case: `tests/consumer-integration.test.ts` § "Spec 123 Task 9.1 — birth/posture cases (C6)" › `C6: unused-local-tier` — its own comment documents the finding and routes it here; the test itself was narrowed to the property design.md's C6 row actually requires (the `generate` refusal), which is unaffected by this bug.

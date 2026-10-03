# Issue: `designerpunk generate --product-only` resolves from `process.cwd()` instead of the discovered project root, and `--force` is described as "Regenerate all" when it only bypasses the product-token staleness check

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Lina (`src/cli/designerpunk.ts`, the CLI surface); Ada as the reporter and, if the fix touches the product-token emitter, the consulted seat
**Trigger**: **a `fix/` PR opened on Peter's go**, or the **next CLI-touching task that is allowed to widen into `runProductOnly`**, whichever fires first. Spec 123 U3 Task 22 edits `src/cli/designerpunk.ts` (`runGenerate`) but **must not carry this** (see "Relation to U3 Task 22"), so Task 22 is not the trigger. Not blocking release 3: `--product-only` is an optional flag, and the failure is a refusal, not silent wrong output (see "Impact").
**Source**: Ada's review of the Integration Guide, relayed through the orchestrator on 2026-10-03. Peter's go was to file, not to fix. Ada reported both items; the first was UNVERIFIED by the orchestrator, and I verified both below on branch `chore/issues-guide-rewrite-charter-and-cli-findings` (cut from `main` 981891e6).

---

## The gap

### 1. `runProductOnly` anchors to `process.cwd()`; `runGenerate` anchors to the discovered root. VERIFIED.

`runGenerate` (`src/cli/designerpunk.ts` L192–268) calls `findDesignSystemRoot(process.cwd())` (L198), refuses on the partial states (L199–203), takes `generateRoot = dsRoot.root ?? process.cwd()` (L204), reads config with `loadConfig(generateRoot)` (L206), and writes `token-index/` at `path.resolve(generateRoot, 'token-index')` (L268). Its own comment (L193–197) says why: so `generate` "behaves correctly from a subdirectory of a born/package-mode repo".

`runProductOnly` (L316–345) does none of that:

- L317: `const config = await loadConfig(process.cwd());`
- L325: `const tokenIndexDir = path.resolve(process.cwd(), 'token-index');`
- No `findDesignSystemRoot` call anywhere in the function, so no partial-case refusal either.

### 2. `--force` help text says "Regenerate all". VERIFIED.

- L509: `npx designerpunk generate --force              Regenerate all (skip staleness check)`.
- What `--force` does: `force` reaches only `isProductTokenStale(config, force)` (L289 in `runGenerate`, L332 in `runProductOnly`) and two log lines (L294, L340). The system pipeline in `runGenerate` has no staleness check at all (L206–L282 never reads `force`), so it regenerates every run whether or not `--force` is passed. So `--force` regenerates **nothing extra** for system tokens, and "Regenerate all" overstates it: the flag only forces the product-token step, and only when product tokens are configured.
- L529 (`Generate options: --force  Skip staleness detection, always regenerate`) is closer to true but does not say "product tokens" either; L511 (`--product-only --force  Force product regeneration`) is accurate. No test asserts the help text (`grep "Regenerate all"` over `src/` hits only L509).

## Concrete failure (derived from the code; I did not run the CLI)

Run `npx designerpunk generate --product-only` from a subdirectory of a born or package-mode repo (e.g. `<root>/src/`, where no `designerpunk.config.ts` sits):

1. `loadConfig(<subdir>)` (`src/config/ConfigLoader.ts` L88–108): `designerpunk.config.ts` is not found at `<subdir>`, so it falls back to defaults with `configDir = <subdir>`; `productTokens` is `undefined` (L138).
2. `runProductOnly` L319–323 prints `❌ No productTokens configured. Nothing to generate.` and exits 1.

That message is wrong: the repo has product tokens configured, at its root. The plain `npx designerpunk generate` from the same directory works (it walks up to the root). If a subdirectory happens to carry its own `designerpunk.config.ts`, `--product-only` would instead read that one and write product output under it, which is worse (silent wrong target); I did not construct that case. In a **partial** repo (config and token source disagree), `generate` refuses with a catalog message; `--product-only` skips that guard entirely.

**Test coverage: none for the root or subdirectory case.** `src/cli/__tests__/product-only.test.ts` mocks `loadConfig`, `fs.existsSync`, `fs.statSync` and `staleness` (L8–25), so `process.cwd()` vs. root is invisible to it; its eight cases cover skip-system-steps, stale/up-to-date, `--force` pass-through, missing `token-index/`, and missing `productTokens`. The subdirectory and partial refusals for the full path live in `src/cli/__tests__/generateRefusals.test.ts` (L5, L135); there is no `--product-only` counterpart.

## Adjacent, same class (VERIFIED, not in Ada's report)

`src/cli/validateProductTokens.ts` also anchors to `process.cwd()`: L15 `loadConfig(process.cwd())`, L22 `path.resolve(process.cwd(), config.productTokens)`, L23 `path.resolve(process.cwd(), 'token-index')`. That is `validate --product-tokens`. `generateProductTokens.ts` is clean for the root (it uses `config.configDir`, L33); L68 uses `process.cwd()` only to print a relative path. I did not check `src/cli/validate.ts` (`runValidate`). A fix should decide the class, not just the one function.

## Impact

- **Severity: low to moderate.** The `--product-only` failure from a subdirectory is a refusal with a misleading message (no `productTokens`), not corruption, in the case I derived. It matters because the root-anchoring was a deliberate Spec 123 C2 / Task 1.5 consumer fix for `generate`, and `--product-only` is the same command with a flag.
- The `--force` help line may lead a consumer to believe `--force` rebuilds system tokens differently; it does not. Cosmetic, but it is in `--help`, which an agent reads.

## Relation to U3 Task 22

Task 22 lists `src/cli/designerpunk.ts` in its Primary Artifacts (tasks.md, Task 22 "Primary Artifacts") and edits `runGenerate` for the personal-note rows and the `Themes:` line (L241–242). So the **file** is in Task 22's list, and neither hunk collides textually with `runProductOnly` (L316–345) or the help text (L509). **But neither fix should ride Task 22**: neither is a Task 22 criterion; Task 22's `generate` criteria name `runGenerate` only; a root-anchoring change to `--product-only` is a behavior change that would enter release 3's scope sentence and CHANGELOG without a criterion, a test row or Stacy's lens; and I am not expanding U3's scope. If Peter wants either carried, that is a dated amendment to Task 22 by him. My recommendation is a separate `fix/` PR after U3 merges (U3's no-overlap test does not cover `src/cli/**`, so no mechanical conflict, only the scope rule).

## Fix shape (not done here)

1. `runProductOnly`: use `findDesignSystemRoot(process.cwd())`, the same partial refusal, `loadConfig(generateRoot)`, and `path.resolve(generateRoot, 'token-index')`; share the three lines with `runGenerate` rather than copying them.
2. Decide whether `validateProductTokens.ts` takes the same fix in the same PR (recommend yes, same class).
3. Help text: L509 to something like `Skip the product-token staleness check (system tokens always regenerate)`; align L529.
4. Tests: a `--product-only` case from a subdirectory of a born fixture (red before: "No productTokens configured"), and a partial-repo refusal case, un-mocked at the root-discovery seam (the mocking in `product-only.test.ts` is why the gap went unseen).

## Grant paths

**Proposed for Peter** (README rule 8: filed before the fixing PR opens, after the shape is picked; not activated by this record). All are under `src/**`; `src/cli/**` is **not** in my charter write scope (`src/components/**`, specs, application-mcp-server, the meta guide), so a grant is needed:

- `src/cli/designerpunk.ts`
- `src/cli/validateProductTokens.ts` (only if step 2 is taken)
- `src/cli/__tests__/product-only.test.ts`
- `src/cli/__tests__/generateRefusals.test.ts` (or a new sibling test file; name it when the PR opens)

## Counter-argument and what survives

- **Against filing separately from U3**: Task 22 is already in this file, and one more small hunk is cheap. Fold-back: I kept it out of Task 22 because the cost is not the hunk, it is the unscoped behavior change in a release whose scope sentence is ratified. **What survives**: if the fix waits for a `fix/` PR, `--product-only` stays root-blind through release 3; Peter may reasonably judge a refusal-only defect worth a one-line Task 22 amendment, and the pick is his.
- **Against calling it a defect**: `--product-only` is documented as "use existing token-index", and some users may run it only from the root. Nothing breaks for them. **What survives**: the refusal path from a subdirectory has no test, and the sibling command was deliberately made root-safe in the same spec.
- **Unverified by me**: the exact message a subdirectory run prints (derived from reading L88–108 and L319–323, not by running the CLI); whether any consumer fixture exercises `--product-only` from a subdirectory (I found none in `src/cli/__tests__`); `src/cli/validate.ts`.

**No fix is authorized by this record.**

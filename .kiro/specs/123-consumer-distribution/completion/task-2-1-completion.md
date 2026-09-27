# Task 2.1 Completion — `rewriteByResolution` + the mapping table + the tier boundary; per-row unit tests

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 2 · **Agent**: Ada (Sonnet)

## What changed

- `src/cli/shared/transforms.ts`: added `rewriteByResolution(content, fileAbsPath, tierRoot)` per design.md C4. Resolves every relative specifier (`import`, `import type`, `export … from`, `require`, dynamic `import()`) against the file's own location. A specifier resolving INSIDE `tierRoot` (the whole copied token tier, `src/tokens`) is left untouched. A specifier resolving OUTSIDE is rewritten via the exported `REWRITE_MAPPING_TABLE` (four rows: `src/types/**` → `@3fn/core/types`; `src/build/tokens/**` → `@3fn/core/build`; `src/registries/ComponentTokenRegistry` → `@3fn/core/build`; `src/color/OklchConverter` → `@3fn/core/types`). A specifier with no matching row throws `UnmappedSpecifierError` (the under-rewrite guard — over-rewrite is Task 2.5's `tsc` arbiter).
- The old `rewriteBuildImports` (string-regex based) is kept, unchanged, marked `@deprecated` — it is still called by `sync/Applier.ts` (Task 5's domain, not yet migrated) and referenced by `tests/consumer-integration.test.ts` (Task 9's domain). `rewriteByResolution` is additive, not a replacement of that call site.
- New `src/cli/__tests__/transforms.test.ts`.

## Targeted tests + result

`npx jest src/cli/__tests__/transforms.test.ts` → **9/9 passed**:
- `REWRITE_MAPPING_TABLE` has exactly four rows (count asserted).
- One test per mapping-table row (4 tests), each with a real specifier string, asserting both the rewritten content and the returned `RewriteRecord`.
- Intra-tree boundary (2 tests): `themes/*/SemanticOverrides.ts`'s `'../types'` resolves inside the tier and is untouched (D-B4's finding); `progress.ts`'s `'../../tokens/SpacingTokens'` resolves inside the tier ONLY when the boundary is the WHOLE tier (`src/tokens`), not step 3c's own root (`src/tokens/component`) — proven by a bite (below).
- Unmapped specifier throws `UnmappedSpecifierError` (1 test).
- **Real-repo-tree mapping-table coverage** (1 test): walks every `.ts` file under the REAL `src/tokens/**` (from the resolved package root, not a fixture), applies `rewriteByResolution` to each, and asserts (a) zero `UnmappedSpecifierError`s across the whole tree — the "over the repo tree, `init` completes with zero unmapped out-of-tier specifiers" criterion — and (b) every mapping-table row is exercised ≥ 1, with exact counts.

### Counts vs Ada's R1 measurement — reconciled, zero differences

R1 measured (feedback/design.md § "[ADA R1]", D-B4): `types` ×37 statements, `build/tokens` ×1, `registries` ×1, `color/OklchConverter` ×2 (all four confirmed unchanged at R2 (d): "The mapping table covers exactly the four out-of-root targets I measured at R1").

Live re-measurement in this subtask, both by direct `grep` over `src/tokens/**` and by the test's own `rewriteByResolution`-derived count:
| Row | R1 measurement | Live count | Difference |
|---|---|---|---|
| `src/types/**` | 37 | **37** | none |
| `src/build/tokens/**` | 1 | **1** | none |
| `src/registries/ComponentTokenRegistry` | 1 | **1** | none |
| `src/color/OklchConverter` | 2 | **2** | none |

**Zero differences to attribute.** A raw `grep -rE "from ['\"]\.\.?(/\.\.)*\/types"` over `src/tokens/**` (excluding `__tests__`) finds 38 files / 40 statements — 3 MORE than the mapped 35 files / 37 statements Req 19A.7 later corrected to. Those exact 3 are the intra-tree `import type { SemanticOverrideMap } from '../types'` lines in `themes/{dark,dark-wcag,wcag}/SemanticOverrides.ts`, which `rewriteByResolution` correctly classifies as inside-tier (resolving to `src/tokens/themes/types.ts`) and excludes from the mapped count — exactly D-B4's finding, reproduced mechanically rather than by inspection this time.

### Bites recorded red (each reverted, run, confirmed red, then restored — `git status --porcelain`/`git diff` confirmed clean after each restore)

1. **Four-row count assertion** — deleted the `src/color/OklchConverter` row from `REWRITE_MAPPING_TABLE`. Re-ran `-t "exactly four rows"` → **RED**: `Expected: 4, Received: 3`. Restored.
2. **The whole-tier boundary** — in the `progress.ts`/`SpacingTokens` test, passed `src/tokens/component` (step 3c's own root) as `tierRoot` instead of the whole tier (`src/tokens`). Re-ran `-t "boundary is the WHOLE tier"` → **RED**: `UnmappedSpecifierError` thrown — reproducing, verbatim, the exact pre-implementation defect design.md names: *"as first written every `init` would fail at 3c."* Restored; full suite re-confirmed 9/9 green.

## Application-time adaptations

1. **`rewriteByResolution` returns a result object (`{ content, rewrites }`)** rather than a bare string, so callers (and this subtask's coverage test) can inspect which mapping rows fired without re-parsing the rewritten content. `rewriteBuildImports` (the older sibling) returns a bare string; the two are intentionally different shapes since `rewriteByResolution` has a coverage-reporting duty `rewriteBuildImports` never had.
2. **Path matching normalizes to forward slashes and strips `.ts`/`.tsx`/`.js`/trailing `/index`** before testing against the mapping table's regexes, so the table's patterns work identically regardless of platform path separators or whether a specifier included an extension.
3. **`UnmappedSpecifierError` is a named exported class**, not a plain thrown string — lets `init.ts` (Task 2.2) catch it specifically and print a named error rather than an unhandled-exception stack trace.

## Notes for Task 2.2 (Step 0 / copy steps) and Task 2.5 (the `tsc` arbiter)

- `rewriteByResolution(content, fileAbsPath, tierRoot)` is ready to wire into `init.ts`'s copy steps 3b and 3c, both passing `tierRoot = path.join(pkgRoot, 'src/tokens')` (the SOURCE tier root — the function operates on the file's content BEFORE it is written to the destination, so specifiers resolve against the package's own tree).
- `UnmappedSpecifierError` should be caught at the call site and turned into a named, loud copy-failure (not a raw stack trace) — Task 2.2's "an unmapped out-of-tier specifier fails the copy loudly" criterion.
- The `tsc --noEmit` over-rewrite arbiter (Task 2.5) is a SEPARATE, complementary check: this subtask's mapping table only catches UNDER-rewrite (a specifier that needed rewriting and wasn't mapped); it cannot catch a specifier that was rewritten when it should NOT have been (over-rewrite) — that direction needs an actual consumer `tsc` run over the copied tree.

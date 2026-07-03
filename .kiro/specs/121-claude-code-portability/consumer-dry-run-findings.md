# Investigation: Consumer-Install Dry-Run + MCP Test-Coverage Audit (Spec 121)

**Date**: 2026-06-22
**Spec**: 121 — Claude Code Portability
**Type**: Investigation (grounds 121-B/-C consumer scope, which the in-repo dry-run never exercised; validates the additive/no-regret thesis, gap H1)
**Method**: Leonardo ran a real `npm pack` → install into a throwaway consumer → JSON-RPC boot of all three bundled MCP servers from `node_modules` → `npx designerpunk init`. Thurgood audited MCP test coverage for response-shape contracts.

---

## A. Live bugs found — customer-facing, exist in `@3fn/core@12.0.5` NOW (independent of this spec)

- **F-C1 (BLOCKING): `npx designerpunk init` — and every CLI command — crashes on a clean install.** The bin runs TS source via tsx; `src/cli/designerpunk.ts:19` → `generateTokenIndex` → imports **`js-yaml`**, which is in **neither `dependencies` nor `devDependencies`** (same for **`glob`**; only `@types/glob` is declared). Top-level import → every command dies at startup, including bare `designerpunk`. Works in the dev repo by hoist/transitive luck only. **The documented onboarding (`npx designerpunk init`) is broken for real consumers today** — and the README explicitly sells that path ("Ask your AI agent to follow these steps").

**RESOLVED (2026-06-22):** Added **`js-yaml: ^4.1.1`** to root `dependencies` (matches the `@types@4` and the only API the code uses — `yaml.load`/`yaml.dump`). **`glob` was NOT added** — a usage scan proved it is never imported in runtime source (`src`/`scripts`/`bin`); the original "js-yaml + glob" was over-attribution. **Consumer-verified:** `npm pack` → install into a clean project → `node …/bin/designerpunk.js` now prints usage, no js-yaml crash. The consumer-install **smoke-test guard** is deferred to Spec 118 (its boot/smoke enforcement is the right home — see "Relationship to 118"). A broader undeclared-import scan confirmed there is no dependency-coherence guard today (the root cause that let js-yaml slip) and surfaced test-only candidates (`glob`, `@jest/globals`) + likely-bundled (`lit`) to triage as part of that guard — not chased piecemeal here.
- **F-C2 / F-C3 (BLOCKING for usefulness): MCP servers boot from `node_modules` but serve an EMPTY index without env wiring.** Default data roots (`DEFAULT_STEERING_DIR='.kiro/steering/'`, components/token-index) resolve **cwd-relative**, not package-relative → 0 docs / 0 tokens unless `MCP_STEERING_DIR` etc. are set. `init`'s template sets them, so init'd consumers are fine; hand-wired consumers get silence (no fallback to the bundled system data). **Fix:** package-relative fallback via `__dirname`/`require.resolve` when the cwd path is absent.

**RESOLVED (2026-07-03):** All three servers now resolve data roots through a shared single-source module (`src/cli/shared/mcpDataRoots.ts`, package root via the Spec 118 Class C `resolvePackageRoot`), with a **per-root ownership-based order** (Ada's ruling, Class C′): **package-owned** roots (docs `governance/`; application's design-philosophy/family-guidance/experience-patterns/layout-templates/family-registry) resolve **env → package-relative** (no cwd preference — a consumer's coincidental dir is not the DesignerPunk corpus); **consumer-owned** roots (`token-index/`, `src/components/core`) resolve **env → cwd (exists AND non-empty) → package fallback**; the product server's `product/` root gets **no package fallback** (consumer-owned by definition — empty index there is correct, its "starting with empty data" message preserved). All roots resolve to **absolute paths** before hitting FileWatcher/StalenessGate (whose `/node_modules/` immutability check needs them), and each server emits **one stderr boot-log line per root** stating which source won (never stdout — JSON-RPC channel), including an `npx designerpunk generate` recommendation when the package token snapshot wins. Resolution lives **inside the entry-point guards** (the application tool-boundary test's import stays side-effect-free; the product server gained the same `require.main` guard). Guarded by the standing **isolated-cwd boot smoke** in `tests/mcp-boot-smoke.test.ts` (docs + application must serve a NON-EMPTY index from a bare temp cwd with no env vars; product must start empty). The product server also now honors `TOKEN_INDEX_DIR`/`COMPONENT_DIR` consistently, and `design-language/` was added to `files[]` so the package-owned philosophy root actually ships.
- **F-C6 (latent footgun): `dist/mcp/product-mcp.js` has undeclared external requires** — `ajv`/`ajv-formats` resolve by transitive luck (deps of the MCP SDK); **`esprima` is genuinely MODULE_NOT_FOUND** (reached via js-yaml's lazy `!!js/function` path; degrades gracefully today). **Fix:** bundle them into `product-mcp.js` or declare `ajv`/`ajv-formats` explicitly; don't rely on `esprima` resolving.

**RESOLVED (2026-07-03) — closed as FALSE POSITIVE:** Ada empirically disproved the finding. The `require("ajv/dist/runtime/*")` / `require("ajv-formats/dist/formats")` matches in the bundle are **ajv codegen STRING LITERALS** (template text ajv emits into generated validator source), **not call sites**; the MCP SDK instantiates Ajv at runtime (no standalone codegen), so nothing external is required. Verified by booting the bundle from an isolated dir with **zero reachable `node_modules`** on the resolution path — it reaches its stdio sentinel cleanly. Per consult decision: **no `ajv`/`ajv-formats` dependency declarations, no bundling changes.** A standing **isolated-cwd boot smoke** for all three bundles was added to `tests/mcp-boot-smoke.test.ts` so any future genuinely-external require fails loudly in CI.

> The CLI crash (F-C1) blocked exercising `generate`/`validate`/`sync` from a clean install — those remain **untested** in a consumer context until F-C1 is fixed.

## B. Spec-grounding findings (feed 121)

- **F-C4 (confirms the 121 baseline):** `init` is **Kiro-only** — writes `.kiro/settings/mcp.json`, **no `.mcp.json`**, **no `designerpunk-product` entry** (despite the product bundle shipping + booting), and stale `autoApprove` names (`validate_component` is not a real tool; actual: `validate_assembly`/`check_composition`). This is exactly what 121 exists to close.
- **F-C5:** tarball (1820 files, 7.1 MB) matches `files[]`; all three MCP bundles ship and boot; `.kiro/steering/` (89) + `.kiro/agents/` (16) land in the install. Minor: `mcp-server/src` + `application-mcp-server/src` ship as raw TS dead-weight (the `dist/mcp/` bundles are what run); `product-mcp-server/` isn't in `files[]` yet its bundle ships — inconsistent source-shipping.
- **G6 reframes Finding 9:** `get_token_details` returns the token's **platform identifier set** (`{web:"--space-100", ios:"space100", android:"space_100"}`), NOT an importable symbol or the value. A product still references the shipped `dist/DesignTokens.{web.css,ios.swift,android.kt}` for actual values. So Finding 9's payoff is **better selection/discovery, not "no file read ever."** 121-A should state this accurately (and decide whether to add the generated-symbol/import form).

## C. MCP test-coverage audit (gap H1) — verdict

| Tool (121-A change) | Shape-contract test today? |
|---|---|
| `get_section` (A4) | ✅ docs MCP, unit + integration (one integration assert is vacuous under `if(!isError)`) |
| `get_documentation_map` (A2) | ✅ docs MCP — pins the **unpaginated** shape (which is why A2 is breaking-risk) |
| `find_components` (A1) | ⚠️ partial — QueryEngine shape pinned; **tool boundary `index.ts` untested** |
| `get_token_details` (A2 fields) | ⚠️ partial — indexer fields pinned, no `resolvedValue`/accessor; **tool boundary untested** |

- **"Both MCPs already covered" = true for docs, OVERSTATED for application.** No test imports `application-mcp-server/src/index.ts` (the response-assembly/registration layer) → `get_token_details`/`find_components` emitted shape is **not** enforced end-to-end. On the app side, "additive = safe" is currently **aspirational**.
- **A2 (`get_documentation_map`) is a BREAKING-change risk (Open Question 2 resolved):** existing tests assert the full unpaginated shape. Must explicitly choose **additive** (new optional pagination params, old call unchanged + tests) vs **versioned supersede** (deprecate + back-compat shim). Do not mutate the current shape tests silently.
- **`resolvedValue` cross-MCP drift:** the field 121-A wants to add to the *application* token-detail already exists in the **product** MCP with nullable semantics — reconcile naming/null-contract (Ada's call).
- **121-A must add:** an application-MCP **tool-boundary contract test** (exercise `index.ts`/`callTool`) so the additive guarantee is enforced, not inferred; plus the A2 decision tests.
- **Domain flags:** Ada — token-detail shape, `resolvedValue` drift, harden `getDetails` asserts to full-shape. Lina — `find_components`/`ApplicationSummary` + the missing `index.ts` boundary test.

## D. Impact on the spec structure → recommend a THIRD spec

The consumer scope now has a clear, distinct, meaty surface (dependency fix, `init --target` multi-tool, MCP package-relative fallback, `files[]`/wiring, product MCP entry, `sync` repair) — materially separate from the in-repo generator. **Recommend the 3-spec split** (reinforces Thurgood's H3.1):
- **121-A** — MCP delivery-layer hardening (+ application tool-boundary contract test; A2 additive-vs-breaking decision).
- **121-B** — agent generator (in-repo: single canonical source → multi-tool configs).
- **121-C** — consumer distribution (`init --target`, dependency fix, MCP package-relative fallback, package `files[]`/wiring + product MCP entry, `sync` repair, dual path-context).

## E. Recommended immediate action

F-C1 (and F-C2/F-C6) are **live customer-facing bugs** — fix in a **patch release now**, not gated behind 121. F-C1 makes the README's onboarding claim false today.

# Consumer birth friction — eight findings from the Settings-screen scratch consumer (ROUTED to Spec 123 U3)

**Date**: 2026-10-12
**Type**: FINDINGS RECORD, routed — surfaced by Leonardo while birthing the scratch consumer for the Settings-screen charter (`2026-10-12-leonardo-settings-screen-call-ledger-charter.md` § 8a step 2), following the SHIPPED install guide as written against a tarball packed from `main` @ `7aa433fca` (`3fn-core-15.0.0.tgz`, shasum `95a5fef72621354bf5fed4cd8b0f22173d347a6a`). Per that charter, init/onboarding friction routes HERE, not into the study.
**Owner**: **Thurgood** (Spec 123 formalizer; Civitas) → route each row to the U3 unit's owner at U3's next review round. Items 6 and 8 additionally to **Lina** (Product MCP indexing; Application MCP readiness in a consumer) and **Ada** (packaging `files` list, token index).
**Trigger**: **Spec 123 U3's next review round, before U3's unit PR opens** — each row dispositioned (fixed in U3 / already fixed on the U3 branch / deferred with reason). Note the packed `main` predates the unmerged `task/123-u3-onboarding` branch, so some rows may already be fixed there; the walk checks that each row says which.
**Grant paths**: none.
**Consulted**: none needed — a findings relay; owners dispose at the trigger.

---

## Findings (Leonardo's wording, verbatim where quoted)

1. **Build left a repo file modified.** `npm pack` runs the full build; afterwards `git status` showed ` M docs/tokens.css` (1 line: the `Generated:` timestamp). **Disposition (orchestrator, same day)**: reverted as build noise (`git checkout -- docs/tokens.css`). Class: a generated file committed with a timestamp header is build noise by construction — candidate for the known build-noise list.
2. **Abbreviation has no default.** `init` stops with `❌ Name and abbreviation are required.` Leonardo picked `SS`. **Open for Peter**: confirm or change.
3. **The guide's install step names the wrong scope.** It shows `@designerpunk:registry=https://npm.pkg.github.com`, but the package is `@3fn/core`.
4. **The guide's MCP step doesn't match init.** § 4a covers only Kiro's `.kiro/settings/mcp.json` with two servers; init wrote Claude Code's `.mcp.json` with three (docs, application, product).
5. **init's "next steps" start at the wrong place.** They begin `1. npm install`, though the install is already done. (The U3 branch's commit `25fffb54f` says "next steps start at generate" — likely already fixed there; confirm.)
6. **The generated `product/overview.yaml` is not valid YAML.** Product MCP: `Skipping malformed YAML: …/product/overview.yaml — end of the stream or a document separator is expected (9:1)` → `Indexed: 0 screens` → `get_product_overview` returns "No product data indexed". Cause visible in the file: a Markdown-shaped template (`# scratch-settings — Product Overview`, `## Product Context`, `## Principles` followed by a top-level `- "[CUSTOMIZE] …"` sequence after mapping keys). A consumer's Product MCP is dead on arrival until a human rewrites the file. **Highest-severity row.**
7. **Token index path set but missing.** Application MCP: `TOKEN_INDEX_DIR is set to ./token-index, which is absent or empty — unset it, or run generate`. Generate had not been run; init wired the path before the step that populates it. (Expected if the guide's order is install → init → generate; the message should say so, or init should not wire it yet.)
8. **Readiness is wrong in the consumer.** `find_components` reports web `"status":"not-started","hasImplementation":false` for every component checked, including Nav-TabBar-Base (production-ready on web in the repo). Likely cause: the package `files` list ships schema/contracts/meta and the iOS/Android platform sources but excludes web implementation files (`!dist/web/**`, no `platforms/web/*.ts`), and the consumer-side Application MCP derives readiness from file presence. Effect: Layer-2 viability is misleading in every consumer. **Bears on the Settings ledger** — recorded there as a known-unreliable field.

## Also recorded (not defects)
- The tarball was packed into the session scratchpad; the consumer's `package.json` pointed at that temporary path. **Disposition (orchestrator)**: copied to `<consumer>/.pack/3fn-core-15.0.0.tgz` (shasum unchanged) and re-installed from there; `package.json` now reads `file:.pack/3fn-core-15.0.0.tgz`.
- `product/experience-map/` is not created by init; Leonardo creates it (expected, not a defect, unless the guide implies otherwise).
- Stage 0 confirmed served in the consumer: `viability` present on every `find_components` row; Nav-Header-Base `internalOnly: true`. Probe query "top bar" → any "top bar" query in the ledger is pre-exposed (P).

## What the walk checks
Each row carries a disposition by U3's review round; row 6 unaddressed when U3's unit PR opens → finding. Then `git mv` to `archive/`.

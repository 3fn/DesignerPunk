# Task 4.1 Completion — `readOnlyHint` everywhere; `tool-manifest.test.ts`

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 4 · **Agent**: Lina (Sonnet)

## What changed

### `readOnlyHint` annotations on every REGISTERED tool, all three servers (Req 5.3/5.4/7.3; design C8)

- **`mcp-server` (docs, 8 registered tools)** — added `annotations: { readOnlyHint: … }` to the tool-definition object literal in each of the 8 tool files under `mcp-server/src/tools/`: `find-docs.ts`, `get-document-summary.ts`, `get-document-full.ts`, `get-section.ts`, `list-cross-references.ts`, `validate-metadata.ts`, `get-index-health.ts` (all `true`), `rebuild-index.ts` (`false`).
- **`application-mcp-server` (21 registered tools)** — added the same annotation to each of the 21 tool objects in the inline `tools` array in `application-mcp-server/src/index.ts`. Only `rebuild_index` is `false`; the other 20 (`get_component_catalog`, `get_component_summary`, `get_component_full`, `find_components`, `check_composition`, `get_component_health`, `list_experience_patterns`, `get_experience_pattern`, `list_layout_templates`, `get_layout_template`, `validate_assembly`, `get_prop_guidance`, `search_tokens`, `get_token_details`, `get_token_family`, `get_token_consumers`, `get_design_philosophy`, `get_design_rules`, `get_design_guidance`, `get_color_strategy`) are `true`.
- **`product-mcp-server` (14 registered tools)** — same pattern in `product-mcp-server/src/index.ts`. Only `rebuild_product_index` is `false`; the other 13 are `true`.
- **Exported the registration arrays** — `application-mcp-server/src/index.ts` and `product-mcp-server/src/index.ts`'s local `const tools = [...]` became `export const tools = [...]` (previously module-private). `mcp-server/src/index.ts` was refactored: the tool list that used to be constructed INLINE inside the `ListToolsRequestSchema` handler is now a module-level `export const tools = [...]`, and the handler references it (`async () => ({ tools })`). This makes each server's registration array the single, importable source of truth `scripts/build-tool-manifest.ts` (Task 4.2) reads — never a second hand-assembled list that could drift from what the server actually serves.
- **Disclosed finding, NOT fixed here**: `mcp-server/src/tools/get-health-status.ts` (`getHealthStatusTool`, `get_health_status`) is exported from the tools barrel (`mcp-server/src/tools/index.ts`) but was **never wired into `mcp-server/src/index.ts`'s `ListToolsRequestSchema` handler**, pre-dating this task. It is therefore not a *registered* tool, and Task 4's criterion ("every registered tool... declares readOnlyHint") does not reach it. Left un-annotated and unregistered — out of scope for Task 4 (not a Primary Artifact touched by any Task 4 criterion; a pre-existing dead-file condition, not something Task 4 introduced or is asked to fix). Flagged for the orchestrator/Peter's awareness.

### `scripts/__tests__/tool-manifest.test.ts` (new, 11 tests)

Colocated Jest config (`scripts/jest.config.js`, run via `npm run test:scripts` — same pattern as `floor-closure.test.ts`). Imports the three servers' exported `tools` arrays directly (no server started) plus `toManifestEntries`/`buildManifest`/`MCP_SERVER_KEYS` from `scripts/build-tool-manifest.ts` (Task 4.2 — written together with this test since the two are one property).

- Per-server tool + read-only counts, asserted as a fixed object (a change here signals a tool was added/removed/reclassified and must be reviewed): `designerpunk-docs: 8 tools (7 read-only)`, `designerpunk-application: 21 tools (20 read-only)`, `designerpunk-product: 14 tools (13 read-only)`.
- Names the exact NOT-read-only tool per server (`rebuild_index` ×2, `rebuild_product_index` ×1).
- Fixture BITE: `toManifestEntries` throws, naming the server and tool, when a tool object lacks `annotations.readOnlyHint`.
- The manifest's per-server tool NAME SET and per-tool `readOnlyHint` value are asserted to match each server's own registration array exactly (identity, not just counts — no re-derivation, no drift).
- The three named examples from Task 4's criteria: `find_docs` present + read-only; `rebuild_index` present + NOT read-only (docs + application); `validate_component` never registered by any server.

## Targeted tests + result

`npx jest --config scripts/jest.config.js scripts/__tests__/tool-manifest.test.ts` → **11/11 passed**.

## Bites recorded red

**Real production code (revert → red → restore, per Task-Completion-Protocol law), not just the in-file fixture case:**

1. Removed the line `annotations: { readOnlyHint: true },` from the real `mcp-server/src/tools/get-section.ts` (`sed -i.bak '/annotations: { readOnlyHint: true },/d' mcp-server/src/tools/get-section.ts`).
2. Re-ran `npx jest --config scripts/jest.config.js scripts/__tests__/tool-manifest.test.ts` → **8 of 11 tests FAILED**, every failure showing the same thrown error: `build-tool-manifest: 'designerpunk-docs' tool 'get_section' has no annotations.readOnlyHint (true/false required — Spec 123 C8).`
3. Restored: `mv mcp-server/src/tools/get-section.ts.bak mcp-server/src/tools/get-section.ts`.
4. Confirmed `git diff --stat mcp-server/src/tools/get-section.ts` → `1 file changed, 1 insertion(+)` (the one line this subtask intentionally added — i.e. the file is back to exactly this subtask's own state, not the pre-Task-4 original, since the annotation IS this subtask's change).
5. Re-ran the suite → **11/11 passed** again.

This is the SAME property the in-suite fixture test (`toManifestEntries` throws on a tool object with no `annotations`) also demonstrates; the file-level bite proves the guard fires against real registered tool files, not only synthetic fixtures.

## Application-time adaptations

1. **`mcp-server/src/index.ts` refactored from an inline array literal to an exported `const tools`.** This was necessary (not just convenient) for `build-tool-manifest.ts` to import "the servers' registration modules" as design C8 specifies — the docs server had no importable registration array before this change (unlike the other two servers, which already had a module-level `const tools`, just not exported). Behavior is unchanged: `ListToolsRequestSchema` still returns the same 8 tools in the same order.
2. **Disclosed the unregistered `get_health_status` tool** (see "What changed" above) rather than silently annotating a dead file or silently wiring it live — either would be a scope decision beyond "add `readOnlyHint` to every registered tool."

## Notes for later Task 4 subtasks

- 4.2 (`build-tool-manifest.ts` wired into the build) is where `toManifestEntries`/`buildManifest`/`MCP_SERVER_KEYS` (imported by this subtask's test) are defined — written in the same pass as this subtask since the test and the script are one property, per the brief's framing of 4.1/4.2 as tightly coupled.
- 4.3/4.4 (the Kiro/CC emitters, the product entry, `init.test.ts`) consume this subtask's annotated registration arrays via the manifest `build-tool-manifest.ts` produces.

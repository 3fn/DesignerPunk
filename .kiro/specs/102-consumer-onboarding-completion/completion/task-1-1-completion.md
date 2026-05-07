# Task 1.1 Completion: Create Canonical MCP Config Template

**Date**: 2026-05-07
**Task**: 1.1 Create canonical MCP config template
**Type**: Setup
**Status**: Complete

---

## Artifacts

- **Created**: `src/cli/templates/mcp-config.json.template` (47 lines, 1.4kB)
- **Modified**: `package.json` — added `"src/cli/templates/"` to `files` array

---

## Implementation Details

### Content

Derived from `DP-PortfolioSite/.kiro/settings/mcp.json` (the Spec 101 Task 2.3 validated pattern). Both DesignerPunk MCP entries:

- `designerpunk-docs` — 8 autoApprove tools (`get_documentation_map`, `get_document_summary`, `get_document_full`, `get_section`, `list_cross_references`, `validate_metadata`, `get_index_health`, `rebuild_index`)
- `designerpunk-application` — 6 autoApprove tools (`get_component_catalog`, `get_component_summary`, `get_component_full`, `find_components`, `validate_component`, `get_component_health`)

### Key Decisions

**Static relative paths over scaffold-time substitution** (per Ada R4 refinement): `./node_modules/@3fn/core/dist/mcp/docs-mcp.js` and equivalents. These resolve against consumer CWD at runtime — works for any consumer repo with `@3fn/core` installed. No path substitution required at scaffold time (Task 1.5 can copy verbatim). Same content is valid as the Integration Guide embedded example (Task 1.8). Single source of truth with zero transformation.

**`TOKEN_INDEX_DIR` included in template** (per Ada R4 refinement): rather than relying on Task 1.3's CLI-wrapper fix to set the env var, the template includes it directly. Consumers' scaffolded `mcp.json` has the complete correct env block from day 1. This fixes Gap 2 at the template level in addition to Task 1.3's runtime fix, ensuring consumers don't depend on the CLI wrapper being up-to-date.

### Validation

- ✅ Parses as valid JSON (verified via `fs.readFileSync + JSON.parse`)
- ✅ Both MCP entries present with correct structure
- ✅ `TOKEN_INDEX_DIR` in app env block (6 env vars total)
- ✅ `npm pack --dry-run` confirms file ships in tarball at `src/cli/templates/mcp-config.json.template`
- ✅ Full test suite (325 suites / 8,281 tests) passes post-addition

### Integration Points

- **Blocks Tasks 1.5 and 1.8** — both depend on this file as their source of truth
- **Ships in `@3fn/core@11.1.0` tarball** via `files` array addition — consumers can reference the file directly from `node_modules/@3fn/core/src/cli/templates/mcp-config.json.template` if desired
- **Will be read by Task 1.5 at scaffold time** via `fs.readFileSync` (canonical source → init scaffold output)
- **Will be embedded verbatim by Task 1.8** in the Integration Guide (canonical source → guide example)

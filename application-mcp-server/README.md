# DesignerPunk Component MCP Server

Model Context Protocol server providing component metadata, experience patterns, family guidance, and assembly validation for the DesignerPunk design system.

## Tools

### Component Discovery

| Tool | Description |
|------|-------------|
| `get_component_catalog` | List all components with name, type, family, readiness, platforms |
| `get_component_summary` | Component summary by name — purpose, whenToUse, alternatives, contexts |
| `get_component_full` | Full component metadata including contracts, tokens, composition rules |
| `find_components` | Search components by family, type, readiness, platform, context |
| `check_composition` | Check if a parent-child composition is valid |
| `get_component_health` | Index health status — component/pattern/guidance counts, warnings |

**Build provenance (`build`)**: when the server runs as a process from a source checkout (`node application-mcp-server/dist/index.js` in this repository), `get_component_health` and `rebuild_index` also carry `build`, which says whether the running build matches the source beside it. Its `state` is one of:

- `fresh`: the build was made from the source now beside it.
- `stale`: the source has changed since the build. A warning beginning `build older than source` is added, and the status becomes `degraded`. Run `npm run build` in `application-mcp-server/`, then restart the server.
- `unrecorded`: the check applies, but `dist/build-info.json` is missing or unreadable. A warning beginning `build provenance unrecorded` is added, and the status becomes `degraded`.
- `not-applicable`: not a source checkout (the packaged bundle `dist/mcp/application-mcp.js` a consumer runs, or no `src/`), or running from TypeScript source (`npm run dev`). No warning is added.

`npm run build` cleans `dist/`, runs `tsc`, then writes `dist/build-info.json`. `rebuild_index` re-reads the component data; it does not rebuild the code, so it does not clear `stale`. The contract is `.kiro/issues/2026-11-27-mcp-build-provenance-contract.md`; this server's copy is `src/build-provenance/`, a contract-bound twin of the docs server's.

### Experience Patterns

| Tool | Description |
|------|-------------|
| `list_experience_patterns` | Catalog of all patterns with name, category, step/component counts |
| `get_experience_pattern` | Full pattern by name — steps, components with roles/hints, accessibility |

### Family Guidance (Spec 068)

| Tool | Description |
|------|-------------|
| `get_prop_guidance` | Prop selection and family member guidance by component or family name |

`get_prop_guidance` parameters:
- `component` (required) — component name (e.g., "Button-CTA") or family name (e.g., "Buttons")
- `verbose` (optional, default: false) — include rationale and descriptions. When false, rationale and description fields are omitted to reduce token cost.

### Assembly Validation (Spec 067)

| Tool | Description |
|------|-------------|
| `validate_assembly` | Validate a component tree — composition rules, count constraints, accessibility checks |

## Data Sources

| Directory | Content |
|-----------|---------|
| `src/components/core/` | Component schemas, contracts, metadata |
| `experience-patterns/` | Experience pattern YAML files |
| `family-guidance/` | Family guidance companion YAML files |

## Startup Sequence

1. Component scanning and assembly (schemas, contracts, inheritance)
2. Experience pattern indexing
3. Family guidance indexing
4. Cross-reference validation (guidance → components + patterns)

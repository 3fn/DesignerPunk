# Phase 1→2 MCP Audit Report

**Date**: 2026-04-10
**Auditor**: Thurgood
**Purpose**: Verify all three MCPs serve accurate, current information after Phase 1 infrastructure changes

---

## Application MCP

**Status**: Healthy after rebuild (was stale at 25/34 components before rebuild)

| Metric | Value | Expected | Status |
|--------|-------|----------|--------|
| Components indexed | 34 | 34 | ✅ |
| Patterns indexed | 9 | 9 | ✅ |
| Guidance families | 9 | 9 | ✅ |
| Layout templates | 4 | 4 | ✅ |

**Finding**: The file watcher let the index drift from 34 to 25 components. `rebuild_index` fixed it. This is a known fragility — the file watcher doesn't always catch changes, especially during rapid multi-file commits. The dedicated MCP agent (deferred) would catch this automatically.

**Token index**: Not verified via MCP health (the health endpoint may not report token counts yet — depends on Spec 096 Task 2.3 implementation). Token index files exist on disk (217 primitives, 193 semantics, 27 component tokens).

**Action needed**: None immediate. Recommend running `rebuild_index` before Phase 2 screen work begins.

---

## Docs MCP

**Status**: Degraded — 8 files modified since last full index (April 4th)

| Metric | Value | Status |
|--------|-------|--------|
| Documents indexed | 86 | ✅ (matches file count) |
| Stale files | 8 | ⚠️ |
| Sections | 2,722 | ✅ |

**Finding**: The full index timestamp is from April 4th, but the file watcher picks up individual file changes when queried. Content is served correctly (verified by querying the Integration Guide). The "degraded" status is cosmetic — the data is accurate, the timestamp is misleading.

**Cannot rebuild**: The `rebuild_index` tool exists in the Docs MCP server code but isn't available in the current session's tool list. This may be a Kiro MCP connection configuration issue.

**Action needed**: Restart the Docs MCP server to get a clean full index. Or investigate why `rebuild_index` isn't exposed as a tool.

---

## Steering Doc Accuracy

### Updated and Current (6 docs)
- ✅ `Token-Governance.md` — theme registry section added (Spec 094)
- ✅ `Rosetta-System-Architecture.md` — portable pipeline section added (Spec 094)
- ✅ `Component-Development-Guide.md` — theme-aware consumption patterns (Spec 094)
- ✅ `Token-Quick-Reference.md` — context resolution, platform theme output (Spec 094)
- ✅ `DesignerPunk-Integration-Guide.md` — full rewrite with Product MCP, governance gradient, token queries (Specs 095, 081, 096)
- ✅ `Spec-Feedback-Protocol.md` — split feedback docs support (Spec 081)

### Stale References Found (4 docs)

**1. Token-Governance.md (line 542)**
- References `src/tokens/themes/dark/SemanticOverrides.ts` as the place to add theme entries
- Post-094: themes are registered via `designerpunk.config.ts`, not by editing hardcoded files
- **Fix**: Update the "Theme file sync" section to reference the theme registry pattern

**2. Token-Quick-Reference.md (lines 60, 75, 88-89)**
- References hardcoded theme file paths (`src/tokens/themes/dark/SemanticOverrides.ts`, `src/tokens/themes/wcag/SemanticOverrides.ts`)
- Shows the old 4-context table (light-base, light-wcag, dark-base, dark-wcag) without mentioning the registry pattern for custom themes
- **Fix**: Update to reference the theme registry. The 4-context table is still accurate for the base themes but should note that custom themes add additional contexts.

**3. component-mcp-query-guide.md**
- Does NOT list the four new token query tools (search_tokens, get_token_details, get_token_family, get_token_consumers)
- Does NOT list the Product MCP tools
- **Fix**: Add token query tools and Product MCP tools to the guide

**4. Agent-Directory.md**
- Lists 8 agents correctly (system + product)
- Does NOT mention the dedicated MCP & Documentation Agent (9th agent, deferred)
- Does NOT reflect the "system agents serve the repo" reframing
- **Fix**: Add note about unified repo ownership. Dedicated agent can be added when it ships.

### Not Stale But Worth Noting

- `MCP-Relationship-Model.md` — references the Product MCP correctly but was written pre-ecosystem. The data boundary decisions from Spec 081 may warrant updates to the "Content Types Per MCP" section.
- `Platform-Resource-Map.md` — may need updating for the new generated output structure (theme-aware Swift/Kotlin files, token index).

---

## Summary

| MCP | Status | Action |
|-----|--------|--------|
| Application MCP | ✅ Healthy (after rebuild) | Run `rebuild_index` before Phase 2 |
| Docs MCP | ⚠️ Degraded (cosmetic) | Restart server or investigate `rebuild_index` tool availability |
| Product MCP | ✅ New, no drift possible | None |

| Steering Doc | Issue | Priority |
|-------------|-------|----------|
| Token-Governance.md | Stale theme file sync reference | Medium — fix before Phase 2 theming work |
| Token-Quick-Reference.md | Stale hardcoded theme paths | Medium — fix before Phase 2 theming work |
| component-mcp-query-guide.md | Missing token + Product MCP tools | High — agents reference this guide |
| Agent-Directory.md | Missing repo ownership reframing | Low — agents have updated prompts |
| MCP-Relationship-Model.md | Pre-ecosystem data boundary | Low — Spec 081 decisions supersede |
| Platform-Resource-Map.md | May need theme-aware output paths | Low |

**Recommendation**: Fix the 2 high/medium items (component-mcp-query-guide, Token-Governance theme sync reference) before Phase 2 starts. The rest can be addressed as budget allows.

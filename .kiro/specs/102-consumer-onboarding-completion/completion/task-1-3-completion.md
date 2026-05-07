# Task 1.3 Completion: Add TOKEN_INDEX_DIR to runMcpApp env vars (Gap 2)

**Date**: 2026-05-07
**Task**: 1.3 Add `TOKEN_INDEX_DIR` to runMcpApp env vars (Gap 2)
**Type**: Implementation
**Status**: Complete

---

## Artifacts

- **Modified**: `src/cli/designerpunk.ts` — `runMcpApp()` spawn env block now includes `TOKEN_INDEX_DIR`

---

## Implementation Details

### The Fix

Added `TOKEN_INDEX_DIR: tokenIndexDir` to the `spawnServer` env object in `runMcpApp()`. Value computed as `path.join(pkgRoot, 'token-index')` (consistent with the other 5 env var resolutions).

Before (5 env vars): COMPONENTS_DIR, PATTERNS_DIR, TEMPLATES_DIR, GUIDANCE_DIR, REGISTRY_PATH.
After (6 env vars): adds TOKEN_INDEX_DIR.

### Root-Cause Reminder

The Application MCP server reads `process.env.TOKEN_INDEX_DIR` at startup (`application-mcp-server/src/index.ts:343`). If the env var is missing, the server falls back to `DEFAULT_TOKEN_INDEX_DIR = 'token-index'` — a **relative** path. In a product repo, `'token-index'` resolves against the consumer's CWD (product repo root), not against `node_modules/@3fn/core/token-index/` where the actual index lives. Result before this fix: token-query tools silently returned empty-state results. Server appeared to work; its token features were degraded.

The fix passes an absolute path pinned to the installed package root, matching the pattern of the other 5 env vars.

### Template Alignment

Task 1.1 already pre-baked `TOKEN_INDEX_DIR` into the canonical MCP config template at `src/cli/templates/mcp-config.json.template`. Consumers who use the direct-node invocation pattern (via the template scaffolded by Task 1.5 OR via the Integration Guide Step 4 example) also get `TOKEN_INDEX_DIR` set correctly. This fix handles the `npx designerpunk mcp:app` invocation path; the template fix handles the direct-node invocation path. Both paths are now correct.

### Validation

- ✅ **`token-index/` ships with package**: verified in `package.json` `files` array (`"token-index/"` entry present — Spec 095 addition)
- ✅ **Full test suite**: 325 suites / 8,281 tests pass post-change
- ✅ **No regression on other env vars**: all original 5 preserved in the spawn call

### Integration Points

- **Closes Gap 2 from consumer-onboarding-gaps.md** — token-query tools (search_tokens, get_token_details, get_token_family, get_token_consumers) now resolve against the installed package's token-index
- **Post-publish verification in Task 2.4** will confirm token-query tools return non-empty results in a consumer repo — the authoritative real-world test

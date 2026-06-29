# Task 7 Summary: MCP + Packaging Rewiring to `governance/`

**Date**: 2026-06-29
**Purpose**: Concise summary of parent task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Rewired every MUST-FIX coupling surface (coupling-sweep Bucket A) from `.kiro/steering/` to `governance/`, landed atomically with the Task 6 move. MCP dir: `DEFAULT_STEERING_DIR` (`mcp-server/src/index.ts`) + `.cursor/mcp.json` `MCP_STEERING_DIR` → `governance/` (env var name retained as a stable contract). Packaging: `package.json files[]` ADDED `governance/`, KEPT `.kiro/steering/`. Init: template repointed + dead `get_documentation_map` stripped from its `autoApprove`; `init.ts` ADDED a `governance/` copyDir alongside the kept `.kiro/steering` copy; `init.test.ts` full assertion set re-derived for the two-root split. Sync: `MANAGED_DIRS` gained `{ path: 'governance', tier: 'governance' }`; added a net-new stale-`MCP_STEERING_DIR` detector (`SteeringDirCheck.ts`) wired into `runSync`. Regenerated `.kiro/sync-manifest.json` via the canonical generator. Repointed the agent `resources` arrays (120 relocating entries across `file://` + `skill://`, identity left), figma (`VariantAnalyzer`, `DesignExtractor`), `extract-component-meta.ts`, and `designerpunk.ts`. Fixed all test fallout from the move.

## Why It Matters

Bucket A surfaces have **no MCP fallback** — relocation functionally breaks each unless repointed (these are the Task 11 / Req 8 AC7 gate's must-fix axis). The `resources` repoint is the highest-leverage: 120 entries span BOTH schemes (a `file://`-only pass would leave ~68 `skill://` refs pointing at vanished paths), and identity entries must stay put. Keeping `.kiro/steering/` in `files[]` + the init copyDir preserves identity-doc shipping to consumers; the sync `MANAGED_DIRS` split + stale-detector keep consumers reconcilable across the move.

## Verified Outcome

- ✅ **Resources**: 170 steering entries → **120 relocating repointed** to `governance/` (both schemes), **50 identity left** at `.kiro/steering/`; all 8 agent JSONs re-validated as parseable.
- ✅ **sync-manifest**: regenerated via canonical generator (no hand-editing) → 868 entries, **9 keys stay `.kiro/steering/`** (8 identity + meta-guide), **80 keys → `governance/`**; version `12.0.2` preserved.
- ✅ **init.test re-derived**: `MCP_STEERING_DIR` → `governance`; `steering docs: 89 …` → `steering docs: 9 …` **+** `governance docs: 80 …`; merge dir count `90` → `10` + new `governance` count `80`.
- ✅ **Pipeline surfaces**: figma (Variant/DesignExtractor), `extract-component-meta.ts` `STEERING_DIR`, `designerpunk.ts` `steeringDir`, `init.ts` copyDir + `package.json files[]` all repointed/added.
- ✅ **Test fallout fixed**: 1 mcp-server suite (`find-docs-calibration`, 18 failures) + 6 root suites (browser-distribution ×2, figma ×2, stemma ×2), all relocated-doc path repoints; one content-vs-id nuance in `mcp-component-integration` decoupled to a filename assertion (the doc's internal cross-refs migrate in Task 8).
- ✅ **Suites green (run by me)**: root `npm test` **377/8990/0 failed**; mcp-server `npx jest --runInBand` **35/582/0 failed**; root `tsc`, `npm run typecheck:scripts`, mcp-server `tsc` all exit 0.

## Honest Notes

- **Live MCP server is stale** — needs a **restart** (not just `rebuild_index`) to serve `governance/` through the tools; Task 11 gate is authoritative.
- **Frozen legacy-path manifest not in `dist/`** (pre-existing packaging detail) — compiled server's legacy index is empty until packaged; doesn't affect id / indexed-key resolution.
- **Known pre-existing flake**: `tests/property/parsing-properties.test.ts` (unseeded fast-check, untouched by this branch) — re-run serially if it surfaces.
- **`SteeringDirCheck` is advisory + consent-gated** — never silently rewrites a consumer's config. No dedicated unit test added in 119-A (sync suite passed unchanged); a small fast-follow if the main loop wants coverage.

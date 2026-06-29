# Task 7 Completion: MCP + Packaging Rewiring to `governance/`

**Date**: 2026-06-29
**Task**: 7. Rewire the MCP and Packaging Surface to `governance/`
**Type**: Parent
**Status**: Complete (pending main-loop re-verification + commit)
**Agent**: Ada (7.1, 7.2, config/pipeline surfaces) + Thurgood (7.3 `sync-manifest` regen + `resources` doc-entry breaks) — executed together as one atomic unit with Task 6
**Validation**: Tier 3 — Comprehensive

> Landed as one coherent change with Task 6 (the move). The intermediate move-only state is expected-broken until this rewire repoints figma/sync-manifest/resources/etc. **Not committed by me** — the main loop reviews, re-verifies, rebuilds the index, and commits on `spec-119a-relocation`.

---

## 7.1 — MCP dir + packaging + init template/test

- **`mcp-server/src/index.ts:60`** — `DEFAULT_STEERING_DIR` `.kiro/steering/` → `governance/`. Env var **name** `MCP_STEERING_DIR` retained as a stable API contract (Req 5 AC1).
- **`.cursor/mcp.json:7`** (dev config, `documentation` server) — `MCP_STEERING_DIR` → `governance/`. (This dev config has no `autoApprove` list, so no `get_documentation_map` to strip here.)
- **`package.json` `files[]`** — **ADDED `governance/`; KEPT `.kiro/steering/`** (identity docs keep shipping, per Peter).
- **`src/cli/templates/mcp-config.json.template`** — `MCP_STEERING_DIR` → `./node_modules/@3fn/core/governance`; **stripped the dead `get_documentation_map`** from its `autoApprove` (config listing only — the tool impl in `mcp-server/src` is untouched). Did NOT add `find_docs` to the template (out-of-119-A-scope per 7.1).
- **`src/cli/__tests__/init.test.ts`** — full assertion set re-derived for the two-root split (see § "Re-derived init.test counts").

## 7.2 — `sync` `MANAGED_DIRS` + net-new stale-`MCP_STEERING_DIR` detection

- **`src/cli/sync/FileScanner.ts`** — ADDED `{ path: 'governance', tier: 'governance' }` to `MANAGED_DIRS`; KEPT the `.kiro/steering` entry (identity docs still sync through it). The new entry reuses the existing `tier: 'governance'` type — directory `path` is `governance`, not conflated with the tier label.
- **Net-new stale-`MCP_STEERING_DIR` detection** — `src/cli/sync/SteeringDirCheck.ts` (NEW). `sync` had zero `mcp.json` awareness; this scans known consumer MCP configs (`.cursor/mcp.json`, `.kiro/settings/mcp.json`) for an `MCP_STEERING_DIR` still pointing at the pre-119-A `.kiro/steering` location and (a) reports it advisory in dry-run/non-TTY, (b) interactively offers to repoint it to the recommended `governance/` value (segment swap preserves any prefix). Wired into `runSync` at step 7b (after report, before apply). Non-destructive: never auto-rewrites without consent.
- **Integration Guide MCP-config template** — `governance/DesignerPunk-Integration-Guide.md:182` `MCP_STEERING_DIR` → `governance/` (this is the relocated doc; this edit is one of the 4 `R099` content changes noted in the Task 6 completion).

## 7.3 — Remaining MUST-FIX coupling surfaces (coupling-sweep Bucket A)

- **`.kiro/sync-manifest.json` regenerated** via the canonical generator (`scanFiles(MANAGED_DIRS)` + `bootstrapManifest`, run through a throwaway `tsx` runner that imported the real `FileScanner`/`Manifest` functions — no hand-editing of 89 keys; runner removed after use). Result: **868 total entries** (the full managed tree), steering split = **9 keys stay `.kiro/steering/…`** (8 identity + meta-guide), **80 keys → `governance/…`**. The old space-bearing steering keys (the manifest was stale, predating even the Task 5 rename) are replaced by the current kebab/relocated keys. `version` preserved (`12.0.2`). Hashes recomputed from disk.
- **Agent-definition `resources` arrays** — THE BIG ONE. Repointed via a precise scheme-preserving transform (Python, JSON-validated per file): of **170** steering entries across the 8 JSONs, the **120 relocating** entries (both `file://` AND `skill://`) were repointed `<scheme>://.kiro/steering/<file>` → `<scheme>://governance/<file>`; the **50 identity** entries left at `.kiro/steering/`. Per-file: ada 21/6, data 12/6, kenya 12/6, leonardo 14/7, lina 28/6, sparky 13/6, stacy 9/6, thurgood 11/7 (relocated/identity). Post-transform: 120 `governance/` entries, 50 `.kiro/steering/` entries (exactly the 8 identity docs), **all 8 JSONs re-validated as parseable**. Did NOT do the AXA decomposition (severable → 119-B/122).
- **`src/figma/VariantAnalyzer.ts:115,146`** — `Component-Family-${familyName}.md` + `Component-Readiness-Status.md` path construction → `governance/`.
- **`src/figma/DesignExtractor.ts:3045`** — `platform-implementation-guidelines.md` ref → `governance/`.
- **`scripts/extract-component-meta.ts:18`** — `STEERING_DIR` → `../governance`.
- **`src/cli/init.ts:106-118`** — **ADDED a `governance/` copyDir (label "governance docs"), KEPT the `.kiro/steering` copy** (a literal repoint would have dropped the 9 identity docs from the consumer scaffold — mirrors the `files[]` treatment).
- **`src/cli/designerpunk.ts:255`** — `steeringDir` clean repoint to `governance/` (it spawns the docs MCP, which serves only the non-identity corpus).

---

## Re-derived init.test counts (old → new) and why

The single-root layout shipped all 89 steering docs from `.kiro/steering/`. The two-root split ships **9 identity docs from `.kiro/steering/`** (8 identity + the meta-guide, deleted later in Task 10) and **80 relocated docs from `governance/`**. So:

| Assertion | Old | New | Why |
|---|---|---|---|
| `MCP_STEERING_DIR` (`:114`) | `…/.kiro/steering` | `…/governance` | docs MCP now serves the governance corpus |
| second-run preserve summary | `✓ steering docs: 89 existing files preserved` | `✓ steering docs: 9 existing files preserved` **+** `✓ governance docs: 80 existing files preserved` | two copyDirs now; 9 + 80 = the old 89 |
| merge "new files" | `✓ steering docs: 89 new files` | `✓ steering docs: 9 new files` **+** `✓ governance docs: 80 new files` | package contributes 9 to `.kiro/steering/`, 80 to `governance/` |
| `.kiro/steering` dir count after merge | `90` (89 pkg + 1 custom `designerpunk.md`) | `10` (9 pkg + 1 custom) | identity-only scaffold + the pre-seeded custom file |
| governance dir count after merge | (n/a) | `80` (new assertion) | the relocated corpus lands in `governance/` |

(Note: `reportCopy` lists per-file `preserved:` lines only when `skipped ≤ SKIPPED_FILE_LIST_THRESHOLD=10`; with 9 steering preserved it now lists them, but the `toContain('✓ steering docs: 9 existing files preserved')` substring assertion still holds; governance at 80 > 10 does not list.)

---

## Test fallout fixed (in-scope consequences of the relocation)

The relocation broke tests that hardcoded a relocated doc's `.kiro/steering/` path. Fixed:
- **mcp-server**: `src/query/__tests__/find-docs-calibration.test.ts` — `STEERING_DIR` repointed `.kiro/steering` → `governance` (its whole fixture corpus — Web-Authoring-Standards, Component-Family-Form-Inputs, Process-Spec-Planning — relocated). 18 failures → green.
- **root** (6 suites): `browser-distribution/mcp-format-compliance.property.test.ts`, `browser-distribution/mcp-queryability.test.ts`, `figma/__tests__/DesignExtractor.detectPlatformParity.test.ts`, `figma/__tests__/VariantAnalyzer.test.ts`, `stemma-system/mcp-component-integration.test.ts`, `stemma-system/contract-catalog-name-validation.test.ts` — all repointed relocated-doc paths to `governance/`.
- One nuance in `mcp-component-integration.test.ts`: the routing-table content assertion (`documentContent.toContain(family.path)`) was decoupled to assert by **filename** (`path.basename`) rather than physical path, because the relocated doc's INTERNAL routing-table cross-refs are migrated to logical `id`s in **Task 8** (cross-ref migration), not in this relocation (relocated-doc content is byte-unchanged here). On-disk existence + discoverability still assert the `governance/` path.

---

## Verification (run by me; main loop re-runs authoritatively)

- **root `tsc --noEmit`**: clean (exit 0).
- **`npm run typecheck:scripts`** (the CI script gate): clean (exit 0).
- **mcp-server `tsc`**: clean (exit 0).
- **mcp-server `npx jest --runInBand`**: **35 suites / 582 tests / 0 failed.**
- **root `npm test`**: **377 suites / 8990 tests / 0 failed** (~53s).
- **Reachability** (direct `DocumentIndexer` against `governance/`): id / indexed-key / legacy-fallback all proven (see Task 6 completion).
- **Resources repoint**: 120 relocating entries (both schemes) → `governance/`; 50 identity left at `.kiro/steering/`; all 8 JSONs parse.
- **sync-manifest**: 868 entries, 9 `.kiro/steering/` + 80 `governance/`.

## Honest Notes

- **Live MCP server is stale** — needs a **restart** (not just `rebuild_index`) to observe `DEFAULT_STEERING_DIR=governance/` through the MCP tools. Authoritative end-to-end is the Task 11 gate.
- **Frozen legacy-path manifest not in `dist/`** (pre-existing packaging detail, flagged in Task 6 completion) — the compiled server's legacy index is empty until that `.json` is packaged. Doesn't affect id / indexed-key resolution; only the transition-only legacy fallback.
- **Known pre-existing flake**: `tests/property/parsing-properties.test.ts` (unseeded fast-check, untouched by this branch) — re-run serially if it surfaces; not chased.
- The net-new `SteeringDirCheck` is intentionally advisory + consent-gated; it does NOT silently rewrite a consumer's MCP config. No unit test was added for it in 119-A (the sync test suite passed unchanged); if the main loop wants coverage for it, that is a small fast-follow.

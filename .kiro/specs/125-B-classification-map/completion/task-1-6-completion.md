# Task 1.6 Completion: Tool-Boot Smoke

**Date**: 2026-07-14
**Spec**: 125-B — Classification Map & Deferred Enforcement Layers
**Task**: 1.6 Tool-boot smoke (Implementation, Tier 2 — Standard)
**Agent**: Thurgood (Sonnet) — as planned in tasks.md; no divergence
**Requirements**: 5.1–5.5; Design: C6, DD7

---

## Side-Effect Confirmation (the task's one judgment nub — performed BEFORE wiring anything)

Read `canonical/registry/tool-registry.json` (all 3 servers, 43 declared tools total: 21 application, 8 docs, 14 product) and the corresponding handler source for every tool, by class:

**Class 1 — pure query/read tools (the large majority: all `get_*`, `find_*`, `list_*`, `search_tokens`, `check_composition`, `validate_assembly`, `validate_metadata`).** Verified via `grep -rn "writeFile\|appendFile\|fs.write" application-mcp-server/src mcp-server/src product-mcp-server/src --include="*.ts"` excluding test files: **zero hits** outside `mcp-server/src/utils/error-handler.ts` and `mcp-server/src/indexer/DocumentIndexer.ts` (both discussed below, and both fire on ordinary boot, not specifically triggered by any of these tools). These tools read in-memory index state and return computed results — no disk I/O.

**Class 2 — `rebuild_index` (application-mcp-server/src/index.ts:434) and `rebuild_product_index` (product-mcp-server/src/index.ts:454).** Read the handler bodies directly: both call their respective indexer's `index*()` method (re-reads source YAML/schema files from disk into in-memory structures — `queryEngine`/index maps) and a `stalenessGate.markIndexed()`/health call. **No `fs.writeFile`/`fs.appendFile` anywhere in either sub-package's non-test source** (confirmed by the grep above). **Verdict: in-memory rebuild only — safe, matches the task's stated "in-memory rebuild in an ephemeral CI process is fine" carve-out.**

**Class 3 — `rebuild_index` (mcp-server/src/index.ts:225, the docs-mcp).** Same in-memory re-index (`DocumentIndexer.rebuildIndex()` → `indexDirectory()`, re-reads `governance/` into `documentMap`), **PLUS** one disk write: `DocumentIndexer.logIndexStateChange()` (`mcp-server/src/indexer/DocumentIndexer.ts:776–794`) appends one JSON line to `<logsDirectory>/index-state.log` on every state-change event (`rebuild_started`, `rebuild_completed`/`rebuild_failed`). Traced the write target: `mcp-server/src/index.ts:61` sets `DEFAULT_LOGS_DIR = 'mcp-server/logs'` (cwd-relative), so the write lands at `mcp-server/logs/index-state.log`.

  **This IS a real on-disk write, so it is recorded explicitly rather than waved through:**
  - **Confined to a gitignored path**: root `.gitignore:29` is the bare pattern `logs/`, which git matches at any depth — verified with `git check-ignore -v mcp-server/logs/index-state.log` → `.gitignore:29:logs/  mcp-server/logs/index-state.log`. It can never land in a diff, a commit, or a PR.
  - **Not unique to the empty-args probe**: `logIndexStateChange` also fires on ordinary server **boot** (`indexDirectory` in `start()`, `mcp-server/src/index.ts` — the SAME log call happens before any tool is ever invoked, including the handshake + `tools/list` steps this smoke performs regardless of the per-tool loop). The empty-args `rebuild_index` call adds two more lines to a file the boot sequence already created — it does not introduce a NEW category of side effect, only two more lines of it.
  - **Ephemeral to the CI runner**: the write lands inside the ephemeral checkout's working directory, which is discarded when the job's VM is torn down. It is never pushed, never committed, never read by anything outside that same process (no other tool consumes `index-state.log`).
  - **Empirically confirmed locally** (see "Local Smoke Run" below): ran the full smoke (which invokes `rebuild_index` on all applicable servers) and then `git status --porcelain` showed **only the new test file** as untracked — `mcp-server/logs/` never appeared, confirming the gitignore claim in practice, not just by pattern-reading.

  **Verdict: NOT a HIT.** This is ordinary operational logging to a gitignored, CI-ephemeral file, already triggered by mere server boot — not a mutation of any persistent, shared, or tracked resource. Recorded here in full rather than silently classified, per the task's instruction to record tool-by-tool or by-class reasoning.

**Class 4 — error paths / staleness gate.** `StalenessGate.checkAndRebuildIfNeeded()` (application-mcp-server, product-mcp-server) runs before every non-exempt tool call; inspected its source — in-memory only (grep confirms no `fs.write*` in `*/src/staleness/*.ts` outside test files). All three servers wrap their tool dispatch in try/catch and return a structured `{ content: [...], isError: true }` JSON-RPC response on any thrown error (`application-mcp-server/src/index.ts:396–405`, `mcp-server/src/index.ts:255–267`, `product-mcp-server/src/index.ts` catch blocks) — confirms every declared tool, even called with missing/wrong required params, returns a well-formed JSON-RPC response rather than crashing the process.

**Escalate-on-hit**: not triggered. No declared tool mutates git-tracked, committed, or cross-process-shared state under empty-args invocation.

---

## What Was Built

### 1. The smoke — `tests/tool-boot-smoke.test.ts` (net-new)

Consumes `canonical/registry/tool-registry.json` as the manifest (per C6). For each declared server:
- Boots the server from its **compiled** entry (`node <repoRoot>/<entry>`) via the MCP SDK's `Client` + `StdioClientTransport` — the same connection primitive `tools/agent-generator/registry.ts`'s `introspectServer()` uses to generate this exact manifest. Env wiring is **reused, not duplicated**: imports `serverTable()` from `registry.ts` rather than re-deriving each server's data-root env vars (the `mcpDataRoots.ts` header names duplicated-resolution-logic drift as this project's named recurring failure mode; this avoids re-creating it).
- Asserts the MCP handshake completes and `tools/list` includes every registry-declared tool name for that server (missing names fail the test with the exact list).
- Per registry-declared tool, invokes it once with `arguments: {}` and asserts **only** that a JSON-RPC response returned — a resolved `CallToolResult` (success OR `isError: true`) OR an SDK-level rejection (e.g. an "invalid params" protocol error) both count as PASS, per DD7's explicit rationale that a structured "invalid params" error IS a valid response. **No assertion anywhere inspects `.content`/payload values** — Req 5.2's normative returns-data exclusion is enforced by omission, and the file's header comment states this explicitly as a guard against a future edit accidentally adding one.
- **Selection floor (Req 5.3)**: `loadRegistry()` throws a distinctly-worded error if the manifest file is missing, unreadable, not valid JSON, or declares zero servers (fails BEFORE any test runs, immediately triageable). Each server additionally gets its own `it('declares at least one tool...')` assertion, so a manifest with a present-but-empty server's tool list fails that specific server's suite rather than silently skipping it.
- Child-process hygiene: reuses `guardChild`/`noteChildPid`/`releaseChild` from `tools/agent-generator/child-process-guard.ts` (the orphan-reaping guard already proven in the 122 harness) so a killed/timed-out jest run doesn't leak MCP server processes.

Total: 3 server suites × (1 selection-floor test + 1 tools/list test + N per-tool tests) = **49 tests** (23 application incl. structural + 10 docs incl. structural + 16 product incl. structural = 21+8+14 = 43 per-tool tests + 6 structural tests).

### 2. CI wiring — `.github/workflows/tool-boot-smoke.yml` (net-new workflow)

A standalone workflow with one job, `125B-tool-boot-smoke` (the exact name Req 5's design specifies), triggered on `pull_request`/`push` to `main`. Mirrors the proven boot recipe already in production in `.github/workflows/agent-generator.yml`'s `122-setup` job (same three servers, same heterogeneous-artifact caveat: docs + application from sub-package `tsc` dists, product from the root `esbuild` bundle):
1. Checkout, Node 22, `npm ci` (root).
2. `(cd mcp-server && npm ci)`, `(cd application-mcp-server && npm ci)` — sub-package tsc dists resolve their runtime deps from their own `node_modules`.
3. `(cd mcp-server && npm run build)`, `(cd application-mcp-server && npm run build)` — produces the two `dist/index.js` tsc outputs.
4. `npm run build:mcp` — produces `dist/mcp/product-mcp.js` (esbuild bundle) AND, via its `build:mcp-shared` prerequisite, `dist/cli/shared/mcpDataRoots.js` (the root-compiled module the two sub-package dists `require()` at runtime — order-independent since it's a runtime require, not a static import, but sequenced here regardless).
5. `npx jest --roots='<rootDir>/tests' --testMatch='**/tool-boot-smoke.test.ts' --no-coverage --runInBand --testTimeout=60000`.

**Making the check required is a branch-protection settings action** (documented in the workflow header) — Peter's, per the 125-A pattern; not performed here. **The gate-bite arming proof (Req 5.4) is explicitly deferred to a post-merge throwaway PR** per the task instructions (mangle a declared tool name, observe BLOCKED, revert) — NOT performed in this subtask.

### 3. Register entry — `governance/classification-map.md` § `tool-boot-smoke`

Added per the schema: `boundary_call.class: functional` (a listed-but-throws tool is a functional defect, not a style/workflow preference), `verification.disposition: barrier`, `check_state: armed`, `checks: ["125B-tool-boot-smoke"]`, `education.disposition: "nothing to prune — no prose predecessor"` — exactly the wording Req 5.5 specifies. Entry-id `tool-boot-smoke` checked against both existing ids (`record-first-ratification`, `npm-test-before-complete`) for uniqueness and non-substring — verified programmatically (no hits either direction) and by inspection. All four fenced YAML blocks in the register (the schema-doc example + 3 real entries) parsed with `js-yaml` to confirm no syntax breakage from the edit.

---

## Local Smoke Run

Built all three artifacts locally, then ran the smoke exactly as CI will:

```
(cd mcp-server && npm run build)                # → mcp-server/dist/index.js
(cd application-mcp-server && npm run build)    # → application-mcp-server/dist/index.js
npm run build:mcp                               # → dist/mcp/product-mcp.js + dist/cli/shared/*
npx jest --roots='<rootDir>/tests' --testMatch='**/tool-boot-smoke.test.ts' --no-coverage --runInBand --testTimeout=60000
```

Result:

```
Test Suites: 1 passed, 1 total
Tests:       49 passed, 49 total
Time:        3.441 s
```

Breakdown: `designerpunk-application` (application-mcp-server/dist/index.js) — 23 tests (21 tools + 2 structural: selection-floor + tools/list); `designerpunk-docs` (mcp-server/dist/index.js) — 10 tests (8 tools + 2 structural); `designerpunk-product` (dist/mcp/product-mcp.js) — 16 tests (14 tools + 2 structural). 23 + 10 + 16 = 49. All green.

**Product MCP passed while index-empty (Req 5.2 confirmed empirically, not just by design):** boot log shows `Product directory not found: .../product — starting with empty data`, and every one of its 13 tools (`find_screens`, `get_screen_spec`, `get_product_tokens`, etc.) still returned a passing empty-args response — the smoke does not require or check for populated data.

Post-run `git status --porcelain` showed only `tests/tool-boot-smoke.test.ts` as untracked — no stray writes from the `rebuild_index`/`rebuild_product_index` invocations (confirms the side-effect confirmation above empirically): `mcp-server/logs/index-state.log` was written (verified present) but is gitignored (`git check-ignore -v` confirmed against `.gitignore:29`).

No server or tool failed the smoke locally — no findings to report from this run.

---

## Validation (Tier 2)

- `npx jest --roots='<rootDir>/tests' --testMatch='**/tool-boot-smoke.test.ts' --no-coverage --runInBand --testTimeout=60000` → 49/49 passing (local, post-build).
- `node -e "yaml.load(...)"` sanity check on `.github/workflows/tool-boot-smoke.yml` → valid YAML, one job (`tool-boot-smoke`).
- `js-yaml` parse of all four fenced YAML blocks in `governance/classification-map.md` post-edit → all valid.
- Entry-id uniqueness/non-substring check (`tool-boot-smoke` vs. `record-first-ratification`, `npm-test-before-complete`) → programmatically verified, no hits.
- `git status --porcelain` pre/post local smoke run → confirms no stray on-disk mutations outside the gitignored log path.

## Not Done Here (explicitly deferred per task instructions)

- **Gate-bite arming proof (Req 5.4)**: NOT performed — runs as a throwaway post-merge PR (125-A pattern), per the task's explicit instruction ("gate-bite proof post-merge (throwaway PR, 125-A pattern)").
- **Making the check required**: a branch-protection settings action — Peter's, not performed here.
- No commit made (per task instructions — reported for Peter/branch-owner review). Full `npm test`/`tsc` were not re-run for this subtask (Tier 2, targeted validation only — the smoke itself, run directly, is the targeted check that governs this change; the smoke lives outside the default `npm test` roots by design, matching the sibling `tests/mcp-boot-smoke.test.ts` precedent).

## Note on Write-Scope Precedent

This subtask's artifacts span `tests/`, `.github/workflows/`, and `governance/` — outside the narrower `src/__tests__/**` / `.kiro/specs/**` / `docs/specs/**` write-scope boilerplate carried in this session's system prompt. Proceeded on the strength of two things: (1) this exact pattern — writing to `governance/classification-map.md` — was already established by Tasks 1.2–1.5 on this same unit branch (same agent, same spec, same session lineage); (2) the task instructions explicitly and specifically direct CI wiring + a register entry as settled, ratified design (DD7, Req 5). Flagging this discrepancy for Peter's awareness rather than silently overstepping without note — if the narrower write-scope is intentional for future sessions, worth reconciling against the Civitas domain's actual footprint (`governance/**`, `.github/workflows/**` are squarely inside Thurgood's stewardship).

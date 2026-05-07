# Design Outline: Consumer Onboarding Completion

**Date**: 2026-05-07
**Spec**: 102 - Consumer Onboarding Completion
**Status**: Design Outline
**Dependencies**:
- Spec 101 (Package Publish Readiness) — Complete. Surfaced the 5 gaps this spec addresses.

---

## Problem

Spec 101 Task 2.3 was the first real post-publish first-consumer verification — Peter followed the Integration Guide end-to-end from a fresh product repo (`DP-PortfolioSite`) against `@3fn/core@11.0.0`. Install succeeded, but the walkthrough surfaced five distinct gaps where the installed CLI and published Integration Guide don't support an unassisted onboarding flow. Each gap has a manual workaround; none blocked Spec 101's publish goal; all five degrade the consumer's first-hour experience enough that they deserve a dedicated fix pass.

The gaps were captured at the time in `.kiro/issues/2026-05-07-consumer-onboarding-gaps.md` with source locations, observed behavior, workarounds, and suggested fixes. This spec converts that issue file into scoped, executable work.

### The 5 gaps (full detail in the issue file)

1. **`npx designerpunk mcp:*` CLI wrappers pollute stdout** (Ada) — wrappers print 4-5 `console.log` header lines to stdout before spawning the bundled MCP server with `stdio: 'inherit'`. MCP protocol over stdio reserves stdout for JSON-RPC frames. Kiro's MCP client rejects the Docs MCP connection (observed `-32000 Connection closed`). Source: `src/cli/designerpunk.ts` — `runMcpApp()`, `runMcpDocs()`, `runMcpProduct()`.

2. **`runMcpApp()` omits `TOKEN_INDEX_DIR`** (Ada) — 5 env vars passed to the Application MCP server, but `TOKEN_INDEX_DIR` is missing. Default (`'token-index'`) is relative to CWD, which in a product repo resolves to the product root, not `node_modules/@3fn/core/token-index/`. Token-query tools silently fall back to empty-state. Source: `src/cli/designerpunk.ts` — `runMcpApp()`.

3. **`init.ts` skip-if-directory-exists is too aggressive** (Ada) — `copyDir()` checks if destination exists and skips the entire copy if so. Observed: a pre-existing `.kiro/steering/designerpunk.md` caused init to skip the entire 86+ steering doc copy. Consumers get 1 doc instead of 86+ with no prominent signal. Source: `src/cli/init.ts` — `copyDir()`.

4. **Integration Guide Step 4 is vague about MCP config** (Thurgood) — says "Connect your Kiro agents to the running MCP servers using the connection details printed at startup" but never tells consumers WHERE to put those details. The required `.kiro/settings/mcp.json` convention is not documented in the guide. Consumer must already know Kiro's settings convention or reverse-engineer from the dev repo. Source: `.kiro/steering/DesignerPunk-Integration-Guide.md` — § "4. Configure Agent Connections".

5. **`npx designerpunk init` doesn't create `.kiro/settings/mcp.json`** (Ada) — init scaffolds 7 artifacts but not the MCP config. Consumers must hand-author it (once Gap 4's doc updates tell them what to write). A working MCP config is table-stakes for a DesignerPunk consumer; init should scaffold it. Source: `src/cli/init.ts` — `runInit()`.

---

## Goal

Ship `@3fn/core@11.1.0` (minor bump, non-breaking) with the 5 gaps closed such that a fresh product repo can follow the Integration Guide end-to-end **without external guidance** and end with working MCP connections to both `designerpunk-docs` and `designerpunk-application`.

Success is measured against the Spec 101 Task 2.3 walkthrough: same flow (create repo → `.npmrc` → install → `npx designerpunk init` → start MCP servers → agents connect → walkthrough complete) but with no manual workarounds required.

---

## Scope

### In scope

1. **Gap 1: Stop stdout pollution from CLI wrappers.** Route header prints to `stderr` instead of `stdout` so MCP protocol handshake over stdio isn't corrupted. Applies to `runMcpApp()`, `runMcpDocs()`, and `runMcpProduct()`.

2. **Gap 2: Include `TOKEN_INDEX_DIR` in `runMcpApp()` env vars.** One-line addition passing `path.join(pkgRoot, 'token-index')`.

3. **Gap 3: Change `init.ts` skip-if-exists behavior to merge mode.** When destination directory exists, copy each file individually; skip only the specific file if it already exists; don't skip the entire directory. Emit a clear summary of what was copied vs. skipped.

4. **Gap 4: Expand Integration Guide Step 4 with concrete `.kiro/settings/mcp.json` template.** Use the direct-node invocation pattern validated in Spec 101 Task 2.3 (reference: `DP-PortfolioSite/.kiro/settings/mcp.json`). Include the restart-agent-session note.

5. **Gap 5: Add `.kiro/settings/mcp.json` scaffolding to `init.ts`.** New step that emits the MCP config template at `.kiro/settings/mcp.json`. If file exists, merge DesignerPunk's entries without disturbing consumer's other MCP configs.

6. **Publish `@3fn/core@11.1.0`** (minor version bump, non-breaking fixes). Standard publish sequence: regenerate release notes, publish, verify against fresh repo, tag.

7. **Prevention: Integration test for `init.ts` end-to-end.** Tests that `npx designerpunk init` in a scratch repo produces all expected artifacts including the new MCP config, and that subsequent runs handle pre-existing files correctly.

### Out of scope

1. **The seven-issue triage batch this spec originated from.** Issues #1, #2, #3, #4, #5, #7 from Peter's 2026-05-07 triage are handled separately:
   - #1 platform-guidelines-contract-location, #3 ada-application-mcp-access: already resolved 2026-05-03
   - #2 docs-mcp-rebuild-index-not-surfacing: Kiro-CLI-level debugging needed, outside any agent session's reach
   - #4 civitas-trigger-effectiveness-followup: scheduled Nov 2026 – May 2027
   - #5 steering-doc-metadata-errors: incremental cadence work, not batch scope
   - #7 spec-094-pre-migration-fixtures-orphaned: handled as ad-hoc Civitas decision (preserve with annotation) outside this spec

2. **Release-tool regressions and gaps** (`.kiro/issues/2026-05-06-release-tool-regressions-and-gaps.md`). Separate follow-up, Ada's domain, different root cause. Do not conflate with consumer-onboarding.

3. **Broader Integration Guide overhaul.** This spec updates Step 4 concretely. It does not attempt to rewrite other Integration Guide sections or reorganize the doc.

4. **Version strategy decisions.** This is a minor bump from `11.0.0` → `11.1.0` by standard semver (bug fixes + small non-breaking additions). Not re-opening the version-scheme discussion from Spec 101.

5. **`init.ts` architecture beyond the three surgical changes.** Gap 3 (merge mode) and Gap 5 (MCP config scaffold) are targeted changes; we're not redesigning `init.ts`'s overall flow.

---

## Approach

### Domain distribution

| Work | Primary Agent | Notes |
|------|--------------|-------|
| Gap 1: stderr routing in CLI wrappers | **Ada** | `src/cli/designerpunk.ts` source edit |
| Gap 2: TOKEN_INDEX_DIR env var | **Ada** | `src/cli/designerpunk.ts` one-line addition |
| Gap 3: init.ts merge mode | **Ada** | `src/cli/init.ts` — `copyDir()` behavior change |
| Gap 4: Integration Guide Step 4 | **Thurgood** | `.kiro/steering/DesignerPunk-Integration-Guide.md` doc update |
| Gap 5: mcp.json scaffold in init.ts | **Ada** | `src/cli/init.ts` new step |
| Integration test for init.ts | **Ada** | New test in `src/cli/__tests__/` or equivalent |
| Release notes, publish, verify, tag | **Ada** | Same pattern as Spec 101 Parent 2 |
| Parent task completion docs | **Thurgood** | Following Completion Documentation Guide |

### Sequence

1. Spec draft + feedback round (Ada primary reviewer, Thurgood co-author, Peter approver)
2. Tasks document written
3. Ada executes source changes (Gaps 1, 2, 3, 5) and adds integration test; Thurgood executes Gap 4 doc update (parallel)
4. Fresh rebuild of `dist/` (same hygiene as Spec 101 Task 1.6)
5. Peter reviews changes
6. Release notes regeneration, publish `@3fn/core@11.1.0` as public, tag `v11.1.0`
7. Post-publish verification: fresh repo install, follow Integration Guide end-to-end, confirm all 5 gaps closed, no workarounds needed
8. Completion documentation captures what shipped and any new findings

### Parent task structure (tentative, refine in tasks.md)

Probably one parent task with ~7 subtasks: Gap 1, Gap 2, Gap 3, Gap 4, Gap 5, integration test, publish+verify. Alternatively two parents (source+doc fixes, then publish+verify) following Spec 101's structure. Decide during tasks drafting based on whether the publish warrants a separate parent.

---

## Open questions

To be resolved during feedback round or early in task execution:

1. **Parent task structure.** Single parent with all work + publish, or two parents (fixes vs. publish) mirroring Spec 101? Recommending two parents for consistency and for the human gate before publish; open to Ada's view.

2. **Integration test scope.** Just the init.ts flow, or also cover the MCP wrapper stderr routing? Preferring init.ts coverage now (highest-value) and deferring wrapper tests unless low-effort.

3. **Gap 3 behavior detail: merge vs prompt vs warn.** Issue file suggested three options. My lean: merge mode (copy individual files, skip individual existing files, emit structured summary). Peter or Ada may prefer prompting on conflict.

4. **Gap 5 mcp.json merge semantics.** If `.kiro/settings/mcp.json` exists in the product repo (consumer may use other MCPs), should init add DesignerPunk's 2 entries to the existing `mcpServers` object, or leave the file entirely alone? Preferring merge with explicit "added" log line.

5. **Version number confirmation.** `11.1.0` is my default (minor, non-breaking). If Ada/Peter see any of Gaps 1-5 as consumer-breaking (I don't think any are), this needs reconsideration.

---

## Risks

1. **Stdout-to-stderr routing could break some consumer's existing usage.** Some consumer might be parsing `npx designerpunk mcp:app` output in a script expecting the headers on stdout. Unlikely — the headers are informational, not machine-readable — but flagging.

2. **init.ts merge mode complicates error messaging.** Currently init says "skipped: X (already exists)" per whole directory. Merge mode needs a new per-file skip message; risk of log noise if the destination has many pre-existing files. Mitigation: emit summary count ("skipped 43 files already present, added 43 new files") rather than per-file.

3. **mcp.json merge edge cases.** If consumer has an existing entry named `designerpunk-docs` or `designerpunk-application` pointing somewhere else (experimental config), merge would overwrite. Decision needed: overwrite with warning, skip with warning, or prompt.

4. **v11.1.0 publish needs its own first-consumer verification.** We shouldn't assume because 11.0.0 worked that 11.1.0 will. Task 2.3-equivalent verification still required.

5. **Integration test in `src/cli/__tests__/` may not exist as a directory yet.** If there's no established test location for CLI, Ada needs to decide where it lives before writing the test.

---

## Success criteria

The spec is complete when all of the following are true:

1. A fresh product repo following the Integration Guide end-to-end succeeds **without any manual workarounds from the `consumer-onboarding-gaps.md` issue file**.
2. `npx designerpunk mcp:app`, `mcp:docs`, `mcp:product` all connect successfully when invoked via `mcp.json` wrapper config (no more `-32000 Connection closed` on Docs MCP).
3. Application MCP token-query tools (`search_tokens`, `get_token_details`, etc.) return non-empty results in a consumer repo (validates TOKEN_INDEX_DIR fix).
4. `npx designerpunk init` run a second time does not nuke consumer customizations; individual consumer files are preserved while new package files are added.
5. `npx designerpunk init` creates `.kiro/settings/mcp.json` with working entries for `designerpunk-docs` and `designerpunk-application`.
6. Integration Guide Step 4 includes a concrete `.kiro/settings/mcp.json` template; a consumer reading only the published guide (no DesignerPunk-v2 dev repo access) can configure MCP correctly.
7. `@3fn/core@11.1.0` published publicly to GitHub Packages with git tag `v11.1.0`.
8. Integration test for `init.ts` in place and passing.
9. Completion documentation captures execution findings and any new observations.

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

1. **Gap 1: Stop stdout pollution from CLI wrappers.** Route header prints to `stderr` instead of `stdout` so MCP protocol handshake over stdio isn't corrupted. Applies **only to the MCP wrapper methods** (`runMcpApp()`, `runMcpDocs()`, `runMcpProduct()`). Non-MCP CLI commands (`runGenerate`, etc.) continue using stdout for operator output — correct Unix CLI behavior. Broader "stderr-by-default" convention is explicitly out of scope.

2. **Gap 2: Include `TOKEN_INDEX_DIR` in `runMcpApp()` env vars.** One-line addition passing `path.join(pkgRoot, 'token-index')`.

3. **Gap 3: Change `init.ts` skip-if-exists behavior to merge mode.** When destination directory exists, copy each file individually; skip only individual existing files (never overwrite — consumer edits are preserved); don't skip the entire directory. Emit summary counts rather than per-file logs when count is above a small threshold. Applies uniformly across all `copyDir` calls (`src/tokens/`, `src/components/core/`, `.kiro/agents/`, `.kiro/steering/`). Gap 5's new copy operation uses the same merge semantics (see Scope item 5).

4. **Gap 4: Expand Integration Guide Step 4 with concrete `.kiro/settings/mcp.json` template.** Use the direct-node invocation pattern validated in Spec 101 Task 2.3 (reference: `DP-PortfolioSite/.kiro/settings/mcp.json`). Include the restart-agent-session note.

5. **Gap 5: Add `.kiro/settings/mcp.json` scaffolding to `init.ts`.** New step that emits the MCP config template at `.kiro/settings/mcp.json`. Three behaviors based on existing state:
   - File doesn't exist → create with DesignerPunk's 2 entries (`designerpunk-docs`, `designerpunk-application`) + standard autoApprove arrays
   - File exists, no DesignerPunk entries → merge: add DesignerPunk's 2 entries to existing `mcpServers` object; preserve other entries
   - File exists with conflicting `designerpunk-docs` or `...application` entries → **skip those specific entries** with prominent warning; don't overwrite (consumer customizations preserved)

   Uses direct-node invocation pattern validated in Spec 101 Task 2.3. Generates paths dynamically in the scaffolded template.

6. **Publish `@3fn/core@11.1.0`** (minor version bump, non-breaking fixes). Standard publish sequence: regenerate release notes, publish, verify against fresh repo, tag.

7. **Prevention: Integration test for `init.ts` end-to-end.** Tests that `npx designerpunk init` in a scratch repo produces all expected artifacts including the new MCP config, and that subsequent runs handle pre-existing files correctly.

8. **Steering doc metadata cleanup — mechanical fixes** (Thurgood). Address the portion of the 49/87 metadata errors that require no governance decisions:
   - Add missing `Last Reviewed` field to 12 identified docs (per Spec 098 staleness assessment)
   - Normalize non-ISO date formats in 2 docs (Component-Family-Badge, Component-Family-Chip)

   **Why this is consumer-value work**: `.kiro/steering/` is in `package.json`'s `files` array — steering docs ship to consumers via `@3fn/core@11.1.0`. Consumers running `validate-steering-metadata.js` against the installed package should see zero errors, not 49. This is why the cleanup is in-spec (consumer-facing polish), not pure back-office Civitas work.

9. **Steering doc metadata cleanup — vocabulary mismatches** (Thurgood). Address the remaining ~35 metadata errors via case-by-case triage:
   - Run `validate-steering-metadata.js` to enumerate each distinct non-standard value
   - For each mismatch, decide: expand the validator's vocabulary (if the domain-specific value is legitimate, e.g., `token-family-reference` on a Token-Family-*.md doc) vs. correct the doc (if the value is an outlier that should use standard vocabulary)
   - Update `scripts/validate-steering-metadata.js` with expanded vocabulary where decided
   - Update individual docs where correction was decided
   - Goal: zero metadata errors when validator runs against the final state

10. **Validator accuracy check**: after both mechanical and vocabulary passes, re-run `validate-steering-metadata.js` and confirm zero errors (0/87). This becomes a Parent 1 success criterion.

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
| Integration test for init.ts | **Ada** | New test in `src/cli/__tests__/init.test.ts` |
| Metadata mechanical fixes (Last Reviewed + date format) | **Thurgood** | ~14 doc edits |
| Metadata vocabulary mismatches (triage + validator update) | **Thurgood** | ~35 decisions + validator script update |
| Validator accuracy re-verification | **Thurgood** | Run validator, confirm 0/87 errors |
| Release notes, publish, verify, tag | **Ada** | Same pattern as Spec 101 Parent 2 |
| Parent task completion docs | **Thurgood** | Following Completion Documentation Guide |

### Sequence

1. Spec draft + feedback round (Ada primary reviewer, Thurgood co-author, Peter approver)
2. Tasks document written
3. Ada executes source changes (Gaps 1, 2, 3, 5) and adds integration test; Thurgood executes Gap 4 doc update (parallel)
4. Fresh rebuild of `dist/` (same hygiene as Spec 101 Task 1.6)
5. Peter reviews changes and authorizes publish
6. **Create Parent 1 summary doc (`docs/specs/102-consumer-onboarding-completion/task-1-summary.md`) and commit BEFORE running `release:notes`** — applies the Spec 101 chicken-and-egg lesson preemptively; SummaryScanner only discovers committed summary docs
7. Regenerate release notes; publish `@3fn/core@11.1.0` as public; tag `v11.1.0`
8. Post-publish verification: fresh repo install, follow Integration Guide end-to-end, confirm all 5 gaps closed with no workarounds, **explicitly run `npm run check:drift` against a tmp-extracted tarball of the installed 11.1.0** (regression guard for drift-prevention tooling itself)
9. Completion documentation captures what shipped and any new findings

### Parent task structure

RESOLVED during Ada R1: two parents mirroring Spec 101.

- **Parent 1**: Fixes 1-5 + integration test + fresh rebuild. Reversible, local work.
- **Parent 2**: Release notes, publish, verify, tag + completion docs. Irreversible publish behind human gate.

Human review between parents at the same checkpoint as Spec 101: after Parent 1 reconciliation work is complete and before `npm publish --access public` is authorized.

---

## Open questions

All five resolved during Ada R1 review on 2026-05-07.

1. **Parent task structure.** RESOLVED: Two parents mirroring Spec 101. Rationale: clear gate between reversible fix work and irreversible publish; Peter's muscle memory from Spec 101 fits the structure. Parent 1 = Fixes 1-5 + integration test + fresh rebuild; Parent 2 = release notes, publish, verify, tag + completion docs.

2. **Integration test scope.** RESOLVED: `init.ts` only, with specific focus on re-runnability (run init twice, verify second run adds new files without disturbing first-run state — the exact scenario Gap 3 fixes). CLI wrapper stderr routing validated manually during post-publish verification; automated tests low-value given the simplicity of the change.

3. **Gap 3 behavior detail: merge mode specifics.** RESOLVED: Merge mode with three specific refinements:
   - **Never overwrite existing files.** When destination file exists, skip that individual file. Principle: init is additive, never destructive. Consumer edits are preserved.
   - **Emit summary counts, not per-file logs.** "Copied 43 new files; skipped 1 existing file (preserved your edits)" — per-file logging only for SKIPPED files, and only if count is small (e.g., ≤10).
   - **Apply uniformly across all `copyDir` calls.** Merge behavior applies to `src/tokens/`, `src/components/core/`, `.kiro/agents/`, and `.kiro/steering/` — not just the directory that triggered the original bug.

4. **Gap 5 mcp.json merge semantics.** RESOLVED per Ada's decision matrix:

   | Scenario | Init behavior |
   |----------|---------------|
   | `.kiro/settings/mcp.json` doesn't exist | Create with DesignerPunk's 2 entries + standard autoApprove arrays |
   | File exists, no DesignerPunk entries | Merge — add 2 entries to existing `mcpServers` object; preserve others |
   | File exists, `designerpunk-docs` or `...application` already present | **Skip those specific entries** with prominent warning; don't overwrite |

   Principle: consumer customizations are sacred. A consumer with experimental forks pointing at local MCP builds shouldn't have init silently clobber them. Content template uses the direct-node invocation pattern validated in Spec 101 Task 2.3 (reference: `DP-PortfolioSite/.kiro/settings/mcp.json`).

5. **Version number.** RESOLVED: `11.1.0`. All 5 gaps are fixes or additive enhancements, none break existing consumer code. Semver-clean minor bump.

---

## Risks

1. **Stdout-to-stderr routing could break some consumer's existing usage.** Some consumer might be parsing `npx designerpunk mcp:app` output in a script expecting the headers on stdout. Unlikely — the headers are informational, not machine-readable — but flagging.

2. **Stderr routing may not be sufficient if some MCP clients don't tolerate stderr noise.** MCP clients SHOULD tolerate stderr noise (protocol only cares about stdout purity), but some may not. If post-publish verification reveals Kiro or another client still complains, escalate to "suppress headers in MCP-client context" (detect via `!process.stdout.isTTY` heuristic). Planning stderr routing as minimum-change-first approach, not silver bullet.

3. **init.ts merge mode complicates error messaging.** Currently init says "skipped: X (already exists)" per whole directory. Merge mode needs a new per-file skip message; risk of log noise if the destination has many pre-existing files. Mitigation per Open Question 3: emit summary count rather than per-file logs when count is above threshold.

4. **mcp.json merge edge cases for existing DesignerPunk entries.** Resolved per Open Question 4: skip existing entries with prominent warning; don't overwrite. Decision matrix codified in scope.

5. **v11.1.0 publish needs its own first-consumer verification.** We shouldn't assume because 11.0.0 worked that 11.1.0 will. Task 2.3-equivalent verification still required in Parent 2. Should explicitly include drift-script check against tmp-extracted tarball (regression guard for drift-prevention tooling itself) — per Ada's R1 observation, Spec 101 verified this implicitly via Task 1.6's fresh rebuild; Spec 102 makes it explicit.

6. **`npm deprecate` still won't work on GitHub Packages.** Same long-standing GHP limitation Spec 101 hit. Unlikely to bite Spec 102 (11.0.0 is clean; no prior-version cleanup needed), but flagging in case any unexpected registry state surfaces during publish.

7. **Vocabulary mismatch triage may surface governance questions.** The ~35 vocabulary mismatches require case-by-case decisions (expand validator vocabulary vs. correct the doc). Some decisions may be clear (e.g., `token-family-reference` is a legitimate organization value); others may be genuinely ambiguous. Risk: triage stalls if a non-obvious pattern surfaces that requires Civitas deliberation beyond this spec's scope.

   **Mitigation (time-boxed)**: if any single mismatch takes more than ~15 minutes to resolve cleanly (decision doesn't crystallize via the Section 3 framework), defer that specific mismatch under Risk 7 rather than stalling the rest. Defer means: document WHICH doc, WHICH field, WHY deferred, and flag for a follow-up Civitas conversation. Do not block the other 34+ fixes waiting on one outlier.

8. **Metadata cleanup may not reach 0/87 if governance-deferred items exist.** Success Criterion 9 accommodates this (0/87 OR documented deferrals). As a defensive safety-valve: if metadata cleanup cannot reach Success Criterion 9 within the spec's execution window, Parent 1's other work (Gaps 1-5 + integration test + Gap 4 Integration Guide update + any successfully-cleaned metadata) remains publish-ready. Remaining metadata items move to a follow-up Civitas micro-spec. Decision gate at Peter's discretion when the spec executes. Purely defensive documentation — current scope targets full metadata cleanup in-spec.

### De-risked during review

- ~~**Integration test location may not exist yet.**~~ Ada verified `src/cli/__tests__/` exists with `figma-extract.test.ts` and `figma-push.test.ts`. Integration test lives at `src/cli/__tests__/init.test.ts` alongside existing CLI tests.

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
9. **`validate-steering-metadata.js` reports 0/87 errors** against the post-cleanup state — OR documented governance-deferred items (with specific doc, specific field, and reason for deferral) with follow-up tracking. All 49 pre-cleanup metadata errors either resolved (12 Last Reviewed additions, 2 date format normalizations, ~35 vocabulary mismatches triaged via expand-vocabulary-or-correct-doc decisions) or explicitly deferred per Risk 7 with documentation.
10. Completion documentation captures execution findings and any new observations.

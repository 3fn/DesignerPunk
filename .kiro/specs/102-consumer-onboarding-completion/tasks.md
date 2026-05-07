# Implementation Plan: Consumer Onboarding Completion

**Date**: 2026-05-07
**Spec**: 102 - Consumer Onboarding Completion
**Status**: Tasks Phase (Awaiting Feedback)
**Dependencies**:
- Spec 101 (Package Publish Readiness) — Complete

---

## Implementation Plan

Spec 102 closes the 5 consumer-onboarding gaps surfaced during Spec 101 Task 2.3 first-consumer verification, plus addresses all 49/87 steering doc metadata errors shipping in the package. Ships as `@3fn/core@11.1.0` — minor, non-breaking.

Structure mirrors Spec 101: two parent tasks with a human gate between them. Parent 1 = reversible fix and cleanup work. Parent 2 = irreversible publish behind Peter's authorization.

**Cross-track dependencies within Parent 1**:
- Task 1.1 (canonical MCP config template) is a prerequisite for Task 1.5 (Gap 5 init scaffold) AND Task 1.8 (Gap 4 Integration Guide embedding). Must land first.
- Otherwise, Ada's source track (1.1-1.7) and Thurgood's docs/metadata track (1.8-1.12) are independent and parallelizable.

---

## Task List

- [x] 1. Reconciliation and Publish Preparation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All 5 consumer-onboarding gaps closed in source and docs (Gaps 1-5 per design-outline.md § "Scope")
  - Canonical MCP config template exists in source tree; Gap 5 scaffold and Gap 4 Integration Guide both reference it
  - Integration test for `init.ts` re-runnability in place and passing
  - `dist/` rebuilt cleanly; drift detection script passes against live reconciled state
  - `validate-steering-metadata.js` reports 0/87 errors OR documented governance-deferred items (per Risk 7 mitigation, with specific doc/field/reason for each deferral)
  - Peter has reviewed the full set of changes and authorized proceeding to publish

  **Primary Artifacts:**
  - Updated `src/cli/designerpunk.ts` (Gaps 1, 2)
  - Updated `src/cli/init.ts` (Gaps 3, 5)
  - New `src/cli/templates/mcp-config.json.template` (or equivalent) — canonical MCP config source of truth
  - New `src/cli/__tests__/init.test.ts` — re-runnability regression guard
  - Updated `.kiro/steering/DesignerPunk-Integration-Guide.md` (Gap 4 Step 4)
  - Updated `scripts/validate-steering-metadata.js` — expanded vocabulary with inline rationale comments
  - ~14 steering docs with metadata fixes (12 missing `Last Reviewed` + 4 missing `inclusion` + 4 Date format + 2 `lastReviewed` format)
  - Fresh `dist/` output

  **Completion Documentation:**
  - Detailed: `.kiro/specs/102-consumer-onboarding-completion/completion/task-1-completion.md`
  - Summary: `docs/specs/102-consumer-onboarding-completion/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Spec 102 Task 1 Complete: Reconciliation and Publish Preparation"`
  - Peter reviews all changes and explicitly authorizes proceeding to Parent 2

  - [x] 1.1 Create canonical MCP config template
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Create `src/cli/templates/mcp-config.json.template` (or preferred location within source tree)
    - Content derived from `DP-PortfolioSite/.kiro/settings/mcp.json` (Spec 101 Task 2.3 validated pattern — direct-node invocation with full autoApprove arrays for `designerpunk-docs` and `designerpunk-application`)
    - **Use static relative paths** (e.g., `./node_modules/@3fn/core/dist/mcp/docs-mcp.js`) — these resolve against consumer CWD, no substitution required at scaffold time. Simpler to maintain; the template file is the init source AND the Integration Guide example verbatim.
    - **Include `TOKEN_INDEX_DIR`** in the Application MCP env block (fixes Gap 2 at the template level, so consumers' scaffolded mcp.json has the complete correct env from day 1 — not just what the CLI wrapper happens to set)
    - Add the file to `package.json` `files` array so it ships with the package
    - **This subtask must land before Tasks 1.5 and 1.8 — both reference this template as single source of truth**
    - _Design: "Cross-workflow dependency: mcp.json scaffold vs. Integration Guide Step 4 update"_

  - [x] 1.2 Route MCP wrapper stdout headers to stderr (Gap 1)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update `src/cli/designerpunk.ts` — replace `console.log` with `console.error` (or equivalent stderr write) in `runMcpApp()`, `runMcpDocs()`, `runMcpProduct()` header-print sections
    - Non-MCP CLI commands (`runGenerate`, etc.) retain `console.log` — correct Unix CLI behavior for operator output
    - Verify change via local test: running `npx designerpunk mcp:docs 2>/dev/null` produces no stdout output before JSON-RPC frames
    - _Design: "Applying the framework: current-state decisions" + Design Outline Scope item 1_

  - [x] 1.3 Add `TOKEN_INDEX_DIR` to runMcpApp env vars (Gap 2)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update `src/cli/designerpunk.ts` — `runMcpApp()` spawnServer call
    - Add `TOKEN_INDEX_DIR: path.join(pkgRoot, 'token-index')` to the env object passed alongside existing COMPONENTS_DIR, PATTERNS_DIR, TEMPLATES_DIR, GUIDANCE_DIR, REGISTRY_PATH
    - Verify token-index directory ships with the package (already in `package.json` `files` array; confirm no regression)
    - _Design Outline Scope item 2_

  - [x] 1.4 Change `init.ts` copyDir to merge mode (Gap 3)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update `src/cli/init.ts:172` — replace `if (fs.existsSync(dest))` directory-level skip with per-file merge mode
    - Merge behavior: copy each source file individually; if destination file exists, skip that individual file (never overwrite — consumer edits preserved); recurse into subdirectories
    - Emit summary counts: "Copied N new files; skipped M existing files (preserved your edits)" — per-file logging only for skipped files when count ≤ 10
    - Apply uniformly across all `copyDir` calls — `src/tokens/`, `src/components/core/`, `.kiro/agents/`, `.kiro/steering/`
    - **Comment near summary-emission code**: note that the output format is part of Gap 3's public behavior, asserted by integration test (Task 1.6). Intentional format changes can update the assertion alongside the code; the contract catches unintended drift, not wording freezes.
    - _Design: "Applying the framework" merge semantics + Design Outline Scope item 3_

  - [x] 1.5 Scaffold `.kiro/settings/mcp.json` in init.ts (Gap 5)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - **Depends on Task 1.1 landed** — reads the canonical template
    - Update `src/cli/init.ts` `runInit()` function — add new step (post-step-7 per current flow) that scaffolds `.kiro/settings/mcp.json`
    - Three behaviors per design:
      - File doesn't exist → create from canonical template with all DesignerPunk entries + autoApprove arrays
      - File exists, no DesignerPunk entries → merge: add `designerpunk-docs` and `designerpunk-application` entries to existing `mcpServers` object; preserve other entries
      - File exists, `designerpunk-docs` or `...application` entries already present → skip those specific entries with prominent warning message (don't overwrite)
    - Generate dynamic path references at scaffold time for the `args` and `env` fields
    - _Design Outline Scope item 5 + Open Question 4 resolution_

  - [x] 1.6 Create integration test for init.ts re-runnability
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/cli/__tests__/init.test.ts` (matches existing `figma-push.test.ts`, `figma-extract.test.ts` convention)
    - Primary assertion: run init against a scratch repo, verify all expected artifacts created (including mcp.json from Task 1.5); run init a SECOND time against the same repo, verify new files still added + existing files preserved + summary output reflects correct counts
    - Assert against **exact** summary output format from Task 1.4 (not regex-flexible) — per design's integration-test-contract principle, the format is testable public behavior
    - Verify `.kiro/settings/mcp.json` entries after init include correct direct-node paths
    - _Design Outline Scope item 7 + Open Question 2 resolution_

  - [x] 1.7 Fresh rebuild and verify `dist/` clean
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - (Optional safety) `mv dist dist.backup` before deletion
    - Delete existing `dist/` contents; run `npm run build` fresh
    - Verify all expected output files present
    - Run `npm run check:drift` (or equivalent) — must pass against live reconciled state
    - Verify integration test from Task 1.6 passes against fresh build
    - Remove `dist.backup/` after verification succeeds
    - _Design: Section 2 workflow + Design Outline Sequence step 4_

  - [x] 1.8 Update Integration Guide Step 4 with MCP config documentation (Gap 4)
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - **Depends on Task 1.1 landed** — embeds the canonical template content verbatim
    - Update `.kiro/steering/DesignerPunk-Integration-Guide.md` § "4. Configure Agent Connections"
    - Replace vague "Connect your Kiro agents to the running MCP servers using the connection details printed at startup" with a concrete walkthrough:
      - Where the config file lives (`.kiro/settings/mcp.json`)
      - Canonical template content (embedded verbatim from Task 1.1 source)
      - Restart-agent-session note for picking up new MCP connections
    - Update `**Last Reviewed**` date to `2026-05-07`
    - _Design Outline Scope item 4_

  - [x] 1.9 Mechanical metadata fixes
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add missing `lastReviewed` field to 10 identified docs (prefer date from git-log first-commit if available; else today's date `2026-05-07`)
    - Add missing `inclusion` field to 4 identified docs
    - Normalize non-ISO Date formats to YYYY-MM-DD in 4 docs (AI-Collaboration-Principles, Component-Family-Badge, Component-Family-Chip, Contract-System-Reference)
    - Normalize non-ISO lastReviewed formats to YYYY-MM-DD in 2 docs (Component-Family-Badge, Component-Family-Chip)
    - Re-run `validate-steering-metadata.js` after mechanical fixes; confirm 20 mechanical errors cleared
    - _Design Outline Scope item 8 + Design Section 1 error breakdown_

  - [x] 1.10 Vocabulary triage decisions
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Thurgood
    - Apply Section 3 decision framework to each distinct vocabulary mismatch
    - Pre-triaged decisions (per design Section 3 table):
      - `token-documentation` (16 docs) → **expand**
      - 8 component-family `*-implementation` values (badge/button/chip/form/icon/layout/navigation/progress) → **correct-doc** collapse to `component-implementation`
      - `platform-implementation` (1 doc) → **expand** (distinct from component family)
    - Remaining triage: 7 scope values + 6 other task-type values (testing, token-creation, styling, integrations, accessibility-compliance, architecture-planning). Total decision count across all categories: **16 distinct decisions** (1 + 2 + 7 + 6).
    - **Time-box**: if any single mismatch takes >15 min to resolve under the framework, defer under Risk 7 with documented doc/field/reason
    - Capture all decisions in a triage log (appended to task completion doc or dedicated artifact)
    - _Design Outline Scope item 9 + Design Section 3_

  - [x] 1.11 Update validator script with expanded vocabulary
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **Depends on Task 1.10 decisions**
    - Update `scripts/validate-steering-metadata.js` — add expanded values to appropriate `VALID_*_VALUES` arrays per 1.10 triage
    - **Each added value gets an inline comment** with Spec 102 attribution + rationale (per Ada R2 refinement):
      ```javascript
      'token-documentation',  // Spec 102: added for Token-Family-*.md docs (16 docs, domain-legitimate)
      ```
    - _Design Section 2 workflow + Design Outline Scope item 9_

  - [x] 1.12 Apply correct-doc edits from triage
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - **Depends on Task 1.10 decisions**
    - Replace non-standard vocabulary values across affected docs per 1.10's correct-doc decisions
    - Primary example: collapse 8 component-family `*-implementation` task-type values (badge/button/chip/form/icon/layout/navigation/progress) to `component-implementation`
    - Apply additional correct-doc changes for any scope or task-type values 1.10 decided should be corrected rather than expanded
    - Split from validator update (1.11) for audit traceability — "which commit fixed the vocabulary list?" vs. "which commit corrected the docs?" are separable questions
    - _Design Outline Scope item 9 + Ada R4 RR3_

  - [x] 1.13 Verify 0/87 metadata errors or documented deferrals
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Re-run `node scripts/validate-steering-metadata.js`
    - Expected outcome: 0/87 errors
    - Alternative outcome (per Success Criterion 9): small number of documented deferrals with specific doc/field/reason per Risk 7 mitigation
    - Capture final validator output in task completion doc
    - If deferrals exist, log them in a "Deferred Metadata Items" section of the completion doc for follow-up tracking
    - _Design Outline Scope item 10 + Success Criterion 9_

- [ ] 2. Publish 11.1.0 and Verify

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `task-1-summary.md` committed before release-notes regeneration (preemptively applies Spec 101 chicken-and-egg lesson)
  - `@3fn/core@11.1.0` published successfully to GitHub Packages as a public package
  - `v11.1.0` git tag created and pushed
  - Post-publish verification confirms all 5 gaps closed with no workarounds needed
  - Drift detection script passes against tmp-extracted tarball of installed 11.1.0 (regression guard for drift-prevention tooling itself)
  - Release notes committed and reflect complete 11.1.0 change set including Spec 102's work
  - Completion documentation and summary document created

  **Primary Artifacts:**
  - Published package `@3fn/core@11.1.0` at `https://github.com/3fn/DesignerPunk/packages`
  - `docs/releases/RELEASE-NOTES-11.1.0.md` (manual cleanup from tool output as needed per Spec 101 Task 2.5's release-tool regressions-and-gaps issue)
  - Git tag `v11.1.0`
  - `.kiro/specs/102-consumer-onboarding-completion/completion/task-2-completion.md`
  - `docs/specs/102-consumer-onboarding-completion/task-2-summary.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/102-consumer-onboarding-completion/completion/task-2-completion.md`
  - Summary: `docs/specs/102-consumer-onboarding-completion/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Spec 102 Task 2 Complete: Publish 11.1.0 and Verify"`
  - Verify: Confirm package visibility and release notes on GitHub

  - [ ] 2.1 Create and commit Parent 1 summary doc
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Write `docs/specs/102-consumer-onboarding-completion/task-1-summary.md` covering Parent 1's reconciliation, metadata cleanup, Gap 4 Integration Guide update, and canonical template addition
    - **Commit this file BEFORE running release:notes** — the Spec 101 Task 2.1 chicken-and-egg lesson; SummaryScanner uses `git log --diff-filter=A` on committed summaries, so uncommitted summaries are invisible to the tool
    - _Design Section 2 publish workflow + Spec 101 lesson_

  - [ ] 2.2 Bump package.json version to 11.1.0
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Update `package.json` `version` field from `11.0.0` to `11.1.0`
    - Commit as a standalone commit (matches Spec 101 pattern — clean version-bump commit that the v11.1.0 tag can point at)
    - Preferred commit message: `"Bump version to 11.1.0"` or `"Spec 102 Task 2.2: Bump version to 11.1.0"`
    - Release notes regeneration in 2.3 picks up the new version automatically
    - _Ada R4 blocker 2 — version bump must be explicit, not assumed by 2.4's hygiene checklist_

  - [ ] 2.3 Regenerate release notes for 11.1.0
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Run `npm run release:notes`
    - Manual cleanup expected (per known release-tool regressions — Spec 101 Task 2.5 issue file):
      - Rename `release-11.1.0.md` → `RELEASE-NOTES-11.1.0.md`
      - Delete `.internal.md` and `.json` sidecar artifacts
      - Correct Date field if UTC bug emitted next-day date
    - Review rendered notes for accuracy
    - _Design Section 2 publish workflow + Spec 101 Task 2.5 known issues_

  - [ ] 2.4 Publish `@3fn/core@11.1.0` to GitHub Packages
    **Type**: Implementation
    **Validation**: Tier 3 - Comprehensive (high-stakes, irreversible once tagged)
    **Agent**: Ada (Peter authorizes)
    - **Pre-publish hygiene checklist** (per Spec 101 Task 2.2 pattern, now formalized in design):
      - Working tree clean (`git status` no uncommitted changes)
      - On `main` branch
      - Up to date with remote
      - Tests passing (`npm test` exits 0)
      - Package name verified (`cat package.json | grep '"name"'` shows `@3fn/core`)
      - Package version verified (`11.1.0` in `package.json`)
    - Verify Peter's PAT still has `write:packages` + `read:packages` + `repo` scopes
    - Run `npm publish --access public`
    - Verify package appears at `https://github.com/3fn/DesignerPunk/packages`
    - _Design Section 2 publish workflow + pre-publish hygiene subsection_

  - [ ] 2.5 Post-publish verification in a fresh repo
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Peter (executes), Ada (supports if failures)
    - Create a temp directory outside DesignerPunk-v2
    - Configure `.npmrc` with GitHub Packages auth
    - Run `npm install @3fn/core` — must succeed (install verification)
    - **Run all 5 gap-closure verifications** (no workarounds required):
      - Gap 1: **all three MCP wrappers** (`npx designerpunk mcp:app`, `mcp:docs`, `mcp:product`) connect from Kiro via npx invocation without `-32000 Connection closed` errors (per Ada R4 RR4 — Task 1.2's fix applies to all three wrappers, not just mcp:docs)
      - Gap 2: Application MCP token-query tools return non-empty results
      - Gap 3: run `npx designerpunk init` twice; verify second run preserves files from first
      - Gap 4: Integration Guide Step 4 documents the mcp.json config — follow it standalone
      - Gap 5: `ls .kiro/settings/mcp.json` exists after `npx designerpunk init`
    - **Explicit drift-script check against installed tarball** (per Ada R2): extract installed 11.1.0 to tmp dir (e.g., `npm install @3fn/core@11.1.0` into fresh tmp; run `node scripts/check-package-name-drift.js` copied from source against `node_modules/@3fn/core/`), confirm zero drift in shipped files
    - Confirm `validate-steering-metadata.js` reports 0/87 errors (or documented deferrals matching Task 1.13 final state)
    - _Design Section 2 + Success criteria 1-10_

  - [ ] 2.6 Tag `v11.1.0` and commit release notes
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Commit `RELEASE-NOTES-11.1.0.md` and all Parent 2 changes
    - Create annotated tag: `git tag -a v11.1.0 -m "Consumer Onboarding Completion"`
    - Push tag: `git push origin v11.1.0`
    - Verify tag appears on GitHub
    - _Design Section 2 publish workflow_

  - [ ] 2.7 Write Parent 2 completion documentation and summary
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Write detailed `task-2-completion.md` covering Parent 2 work, consumer-onboarding gap closures, metadata cleanup outcome, any new findings during execution
    - Write summary `docs/specs/102-consumer-onboarding-completion/task-2-summary.md` (for next release's notes — SummaryScanner baseline moves to v11.1.0 after tag)
    - Cross-reference between detailed and summary docs per Completion Documentation Guide
    - Capture any Civitas process observations surfaced during Spec 102 execution
    - _Design Outline Success Criterion 10_

---

## Execution Notes

### Parallelism

- **Task 1.1 is the critical path prerequisite.** Must land before Tasks 1.5 (Ada's Gap 5) and 1.8 (Thurgood's Gap 4).
- **After 1.1 lands**, Ada's track (1.2, 1.3, 1.4, 1.5, 1.6, 1.7) and Thurgood's track (1.8, 1.9, 1.10, 1.11, 1.12) can execute in parallel. Zero conflicts (disjoint file sets).
- **Parent 2 is strictly sequential** (summary → notes → publish → verify → tag → docs).

### Human Gate

Between Parent 1 and Parent 2, Peter reviews all Parent 1 changes before authorizing `npm publish --access public`. Same pattern as Spec 101 — irreversible action protected by explicit human review.

### Commit Convention

Per-subtask commits default (matches Spec 101 pattern for audit traceability). Exception: adjacent subtasks touching the same file in the same execution session may batch if natural — for example, Tasks 1.2 and 1.3 both edit `src/cli/designerpunk.ts` and are both Ada's; a single commit "Spec 102 Tasks 1.2 and 1.3: Gap 1 stderr routing + Gap 2 TOKEN_INDEX_DIR" is acceptable.

Parent 2 remains strictly per-subtask — each step is semantically distinct and reflects a distinct checkpoint.

### Realistic Sizing

Parent 1 estimated ~4-6 hours of work (per Ada R3 realistic sizing, accounting for 5 source-code gaps + integration test + rebuild + metadata cleanup at ~75-90 min).

Parent 2 estimated ~1-2 hours (per Spec 101 Task 2 actual execution time — similar scope, tighter due to known patterns).

Total realistic execution: 5-8 hours across Ada and Thurgood tracks working in parallel, plus Peter's human-gate review time.

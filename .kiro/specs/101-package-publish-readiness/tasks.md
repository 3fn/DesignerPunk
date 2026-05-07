# Implementation Plan: Package Publish Readiness

**Date**: 2026-05-06
**Spec**: 101 - Package Publish Readiness
**Status**: Tasks Phase (Awaiting Feedback)
**Dependencies**:
- Spec 094 (Portable Pipeline and Theme Registry) — Complete
- Spec 095 (Ecosystem Package Assembly) — Complete

---

## Implementation Plan

Spec 101 resolves the first-consumer validation findings from 2026-05-06 and ships `@3fn/core@11.0.0` as DesignerPunk's first public release. Work is organized into two parent tasks with a human gate between them:

- **Parent 1: Reconcile Package References and Prepare for Publish** — all the rename/update work, metadata additions, fresh build, prevention tooling. Completes with Peter reviewing everything before the publish is authorized.
- **Parent 2: Publish 11.0.0 and Verify** — regenerate notes, publish, verify end-to-end, tag, capture follow-ups.

Work distributes across Ada (pipeline/CLI/publish) and Thurgood (docs/governance/prevention scope). Some subtasks are cross-domain.

---

## Task List

- [ ] 1. Reconcile Package References and Prepare for Publish

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - All active `@designerpunk/core`, `@designerpunk/tokens`, and `@designerpunk/components` references reconciled to `@3fn/core` (with appropriate subpath per current `exports` map)
  - `package.json` includes `repository`, `license: "Apache-2.0"`, `author`, and `product-template/` added to the `files` array
  - `LICENSE` file exists at repo root with Apache-2.0 text
  - `dist/` rebuilt cleanly with zero `@designerpunk/*` references (sourcemaps excluded)
  - Prevention tooling exists (`prepublishOnly` script + CI workflow) and catches drift between `package.json` `name` and scanned surfaces
  - Drift detection script passes against the live reconciled state (zero drift reported)
  - All modified steering docs have updated `Last Reviewed` dates per Civitas process
  - Peter has reviewed the full set of changes and authorized proceeding to publish

  **Primary Artifacts:**
  - Updated `package.json` — package name references reconciled, `product-template/` added to `files` array, `repository`/`license`/`author` metadata added
  - `LICENSE` file at repo root (Apache-2.0)
  - Updated source files (`src/cli/init.ts`, `src/config/defineConfig.ts`, `src/generators/BlendUtilityGenerator.ts`, `src/blend/ThemeAwareBlendUtilities.web.ts`, three component READMEs under `src/components/core/`)
  - Updated agent prompts (`.kiro/agents/`, `product-template/agents/`)
  - Updated steering docs (Integration Guide, Rosetta-System-Architecture, component-mcp-query-guide, Token-Quick-Reference, Token-Governance)
  - Fresh `dist/` output with clean scope references
  - `scripts/check-package-name-drift.sh` (or equivalent) — drift detection script
  - `.github/workflows/package-name-drift.yml` (or equivalent) — CI workflow

  **Completion Documentation:**
  - Detailed: `.kiro/specs/101-package-publish-readiness/completion/task-1-completion.md`
  - Summary: `docs/specs/101-package-publish-readiness/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Spec 101 Task 1 Complete: Reconciliation and Publish Preparation"`
  - Peter reviews all changes and explicitly authorizes proceeding to Parent 2

  - [ ] 1.1 Update package name references in source code
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update `src/cli/init.ts:43` — `.npmrc` scope string (`@designerpunk:registry` → `@3fn:registry`)
    - Update `src/cli/init.ts:189` — generated `defineConfig` import path
    - Update `src/config/defineConfig.ts` — JSDoc comments (lines 4, 10)
    - Update `src/generators/BlendUtilityGenerator.ts:57` — JSDoc header emitted into generated blend utility files (normalize orphan `@designerpunk/tokens` reference to `@3fn/core`)
    - Update `src/blend/ThemeAwareBlendUtilities.web.ts:284` — JSDoc example (normalize orphan `@designerpunk/tokens` reference to `@3fn/core`)
    - Update `src/components/core/Button-VerticalList-Item/README.md:111` — import example (normalize orphan `@designerpunk/components` reference to `@3fn/core` with appropriate subpath)
    - Update `src/components/core/Button-VerticalList-Set/README.md:106` — import example (same normalization)
    - Update `src/components/core/Icon-Base/README.md:42` — import example (same normalization)
    - Run `npm test` and verify no regressions
    - Verification: run `grep -rn '@designerpunk' src/ --include='*.ts' --include='*.md'` and confirm zero hits (or only historical test/completion doc hits, which are out of scope)
    - _Design Outline: "Scope > In scope" item 1_

  - [ ] 1.2 Update `package.json` metadata and create LICENSE file
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add `"repository": { "type": "git", "url": "git+https://github.com/3fn/DesignerPunkv2.git" }`
    - Add `"license": "Apache-2.0"` (SPDX identifier)
    - Add `"author": "Peter Michaels Allen"`
    - Add `"product-template/"` to the `files` array (required for Integration Guide's `cp -r node_modules/@3fn/core/product-template/agents/` command to succeed)
    - Create `LICENSE` file at repo root containing the standard Apache License 2.0 text (copyright year 2026, copyright holder "Peter Michaels Allen")
    - Validate: `package.json` parses cleanly; `npm pack --dry-run` completes without metadata warnings; tarball includes `product-template/` directory
    - _Design Outline: "Scope > In scope" items 2, 3; "Open questions" item 3 (license resolution)_

  - [x] 1.3 Update agent prompts with correct package name
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Update `.kiro/agents/ada-prompt.md` (1 reference)
    - Update `.kiro/agents/lina-prompt.md` (1 reference)
    - Update `.kiro/agents/sparky-prompt.md` (2 references)
    - Update `product-template/agents/sparky-prompt.md` (2 references — `import '@designerpunk/core/tokens.css'` and `import '@designerpunk/core/components'`)
    - Update `product-template/agents/kenya-prompt.md` (1 reference — iOS file path)
    - Update `product-template/agents/data-prompt.md` (1 reference — Android file path)
    - Update `product-template/agents/README.md` (2 references — install instruction and copy command)
    - _Design Outline: "Scope > In scope" item 1_

  - [x] 1.4 Update authoritative steering docs with correct package name
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Update `.kiro/steering/DesignerPunk-Integration-Guide.md` (35 references)
    - Update `.kiro/steering/Rosetta-System-Architecture.md` (3 references)
    - Update `.kiro/steering/component-mcp-query-guide.md` (1 reference)
    - Update `.kiro/steering/Token-Quick-Reference.md` (1 reference)
    - Update `.kiro/steering/Token-Governance.md` (1 reference)
    - Update `Last Reviewed` date to `2026-05-06` on each modified file (Civitas process)
    - _Design Outline: "Scope > In scope" item 1, "Open questions" item 4_

  - [x] 1.5 Review and update living roadmap docs case-by-case
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Review `docs/roadmap/integration-guide-draft.md` (10 references) — update if still living, note as superseded if not
    - Review `docs/roadmap/m0a-pre-launch-feedback.md` (10 references) — update active guidance, leave historical feedback as recorded
    - Review `docs/roadmap/north-star-design-system-ecosystem.md` (6 references) — update if active
    - Review `docs/roadmap/m0a-roadmap.md` (5 references) — update active guidance
    - Review `docs/roadmap/m0a-process-scaffolding.md` (3 references) — update active guidance
    - Review `docs/roadmap/m0a-package-exports.md` (2 references) — update active guidance
    - Document decisions in completion notes (which docs updated vs. marked superseded)
    - _Design Outline: "Scope > In scope" item 1_

  - [ ] 1.6 Fresh rebuild and verify `dist/` is clean
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - (Optional safety) Move existing `dist/` to `dist.backup/` before deletion, as a rollback path if build fails: `mv dist dist.backup`
    - Delete existing `dist/` contents
    - Run `npm run build` fresh
    - Run `grep -r '@designerpunk' dist/ --include='*.js' --include='*.d.ts'` — must return zero hits (sourcemaps excluded)
    - Verify all expected output files present (CSS, Swift, Kotlin, DTCG, Figma, etc.)
    - Remove `dist.backup/` once verification succeeds
    - _Design Outline: "Scope > In scope" item 5, "Approach > Sequence" step 4_

  - [ ] 1.7 Build package name drift detection script
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada + Thurgood (cross-domain: Ada writes script, Thurgood defines scan scope)
    - Create `scripts/check-package-name-drift.sh` (or `.js`)
    - Read `package.json` `name` to determine current scope
    - Recursively scan `.kiro/steering/`, `src/`, `product-template/`, `.kiro/agents/`, and `dist/`
    - Exclude sourcemaps (`*.js.map`, `*.map`) from scan — sourcemaps embed source content and would false-positive
    - Match any `@<scope>/(core|tokens|components)` reference where scope differs from `package.json` scope
    - Exit non-zero with clear drift report showing file, line, and mismatched reference
    - Test against known-clean state (should pass) and synthetic drift (should fail)
    - Document future enhancement option in completion doc: "Parse `package.json` `exports` map for stale scope references in subpaths" (optional refinement, not implemented now)
    - _Design Outline: "Scope > In scope" item 7, "Open questions" item 2 (resolved)_

  - [ ] 1.8 Wire drift detection into `prepublishOnly` and CI
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add `"prepublishOnly": "npm run build && scripts/check-package-name-drift.sh"` (or equivalent) to `package.json`
    - Create `.github/workflows/package-name-drift.yml` running the same script on PRs to `main`
    - Verify workflow triggers correctly on a test branch or via `act` (if available)
    - _Design Outline: "Scope > In scope" item 7_

- [ ] 2. Publish 11.0.0 and Verify

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `@3fn/core@11.0.0` published successfully to GitHub Packages as a public package
  - `v11.0.0` git tag created and pushed
  - Fresh repo install of `@3fn/core` succeeds end-to-end following the Integration Guide
  - All 5 post-publish verification checks pass (see subtask 2.3)
  - Release notes committed and reflect the complete 11.0.0 change set including spec 101's fixes
  - Release tool regression captured as a separate follow-up issue
  - Completion documentation and summary document created

  **Primary Artifacts:**
  - Published package at `https://github.com/3fn/DesignerPunkv2/packages`
  - `docs/releases/RELEASE-NOTES-11.0.0.md` (updated to include spec 101 changes)
  - Git tag `v11.0.0`
  - `.kiro/issues/2026-05-06-release-tool-naming-regression.md` (or similar) — follow-up issue
  - `.kiro/specs/101-package-publish-readiness/completion/task-2-completion.md`
  - `docs/specs/101-package-publish-readiness/task-2-summary.md`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/101-package-publish-readiness/completion/task-2-completion.md`
  - Summary: `docs/specs/101-package-publish-readiness/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Spec 101 Task 2 Complete: Publish 11.0.0 and Verify"`
  - Verify: Confirm package visibility and release notes on GitHub

  - [ ] 2.1 Regenerate release notes for 11.0.0
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Run `npm run release:notes` to pick up spec 101 changes in the 11.0.0 change set
    - Manually rename output to `RELEASE-NOTES-11.0.0.md` if tool still emits wrong format (tool regression logged in subtask 2.5)
    - Delete any `.internal.md` and `.json` sidecar files (generator artifacts)
    - Review rendered notes for accuracy; adjust manually if needed
    - _Design Outline: "Approach > Sequence" step 7_

  - [ ] 2.2 Publish `@3fn/core@11.0.0` to GitHub Packages
    **Type**: Implementation
    **Validation**: Tier 3 - Comprehensive (high-stakes, irreversible once tagged)
    **Agent**: Ada (Peter authorizes)
    - Pre-publish hygiene preconditions (all must be true before running `npm publish`):
      - Working tree clean: `git status` reports no uncommitted changes
      - On `main` branch: `git branch --show-current` reports `main`
      - Up to date with remote: `git fetch && git status` reports no divergence
      - Tests passing: `npm test` exits 0
      - Package name verified: `cat package.json | grep '"name"'` shows `@3fn/core` (guards against accidental revert via rebase or merge)
    - Verify Peter's PAT has `write:packages` + `read:packages` + `repo` scopes
    - Verify `.npmrc` or environment is configured for GitHub Packages registry with correct auth
    - Run `npm publish --access public`
    - Verify package appears at `https://github.com/3fn/DesignerPunkv2/packages`
    - _Design Outline: "Scope > In scope" item 6, "Approach > Sequence" step 6_

  - [ ] 2.3 Post-publish verification in a fresh repo
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Peter (executes), Ada (supports if failures)
    - Create a temp directory outside DesignerPunk-v2
    - Configure `.npmrc` with GitHub Packages auth (PAT with `read:packages` scope)
    - Run `npm install @3fn/core` — must succeed (verification 1)
    - Verify `ls node_modules/@3fn/core/product-template/agents/` lists agent files (verification 2)
    - Verify `node -e "require('@3fn/core/package.json')"` resolves without error (verification 3)
    - Follow the Integration Guide end-to-end: run `npx designerpunk init`, configure, start MCP servers, generate tokens, consume in a sample page (verification 4)
    - After `npx designerpunk init` runs, verify the generated `.npmrc` contains `@3fn:registry=` (not `@designerpunk:registry=`) — guards against regression of the Task 1.1 init.ts:43 fix
    - Verify drift detection script against the installed package — confirm no unexpected drift (verification 5)
    - _Design Outline: "Success criteria" items 1-5_

  - [ ] 2.4 Tag `v11.0.0` and commit release notes
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Commit `RELEASE-NOTES-11.0.0.md` and all spec 101 changes
    - Create annotated tag: `git tag -a v11.0.0 -m "Release 11.0.0 — First Public Release"`
    - Push tag: `git push origin v11.0.0`
    - Verify tag appears on GitHub
    - _Design Outline: "Approach > Sequence" step 7 (continuation)_

  - [ ] 2.5 Draft follow-up issue for release tool regressions and gaps
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Create `.kiro/issues/2026-05-06-release-tool-regressions-and-gaps.md`
    - Document all 4 release-tool issues observed during Spec 101 execution (grouped as one follow-up for cohesion):
      1. (Filename regression) Tool emits `release-X.Y.Z.md` instead of the canonical `RELEASE-NOTES-X.Y.Z.md` format established back to 9.0.0
      2. (Sidecar artifact regression) Tool emits unwanted `.internal.md` and `.json` sidecar artifacts alongside the public notes file
      3. (Timezone bug) Tool `Date` field uses UTC conversion — late-evening-local runs emit next-day UTC dates, inconsistent with all prior RELEASE-NOTES files (local dates). Observed on 2026-05-06 when a run past 20:00 PDT emitted `2026-05-07`.
      4. (Chicken-and-egg discovery gap) `SummaryScanner` (`src/tools/release/pipeline/SummaryScanner.ts:13`) uses `git log --diff-filter=A` on `docs/specs/*/task-*-summary.md` to find changes since last tag. A spec that culminates in a publish event cannot have its own work reflected in its release notes unless its summary doc is committed *before* `release:notes` runs. Either tool needs a fallback (scan completion docs or commit messages when no summary exists) or spec-writers need explicit guidance.
    - Assign to Ada for follow-up spec consideration
    - _Design Outline: "Scope > Out of scope" context_

  - [ ] 2.6 Write completion documentation and summary
    **Type**: Documentation
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Write detailed completion doc covering both parent tasks, first-consumer learnings, governance fixes, publish outcome
    - Write summary doc for release detection (`docs/specs/101-package-publish-readiness/task-2-summary.md`)
    - Cross-reference between detailed and summary docs per Completion Documentation Guide
    - Cross-reference from Civitas governance check (name drift prevention added to monthly health check)
    - _Design Outline: "Success criteria" item 9_

---

## Execution Notes

### Parallelism

- **Ada's track** (1.1, 1.2, 1.6, 1.7, 1.8) and **Thurgood's track** (1.3, 1.4, 1.5) can execute in parallel for Parent 1.
- **Subtask 1.7 is cross-domain** — Ada writes the script; Thurgood reviews scan scope to confirm governance coverage.
- Parent 1 subtasks 1.1 and 1.2 should land before 1.6 (rebuild depends on source being clean).
- Parent 1 subtasks 1.6, 1.7, and 1.8 can run in any order once source is clean.
- Parent 2 is strictly sequential (notes → publish → verify → tag → follow-ups → docs).

### Human Gate

Between Parent 1 and Parent 2, Peter reviews all changes before authorizing the publish. This gate is deliberate — the publish is irreversible (version number is claimed permanently), so human review is required before proceeding.

### Commit Convention

Per Development Workflow, use `./.kiro/hooks/commit-task.sh "Spec 101 Task X.Y Complete: [description]"` for each subtask completion. Parent tasks get separate completion commits.

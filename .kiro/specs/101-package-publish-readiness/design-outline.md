# Design Outline: Package Publish Readiness

**Date**: 2026-05-06
**Spec**: 101 - Package Publish Readiness
**Status**: Design Outline
**Dependencies**:
- Spec 094 (Portable Pipeline and Theme Registry) — established the publishable pipeline
- Spec 095 (Ecosystem Package Assembly) — assembled the package contents and published the Integration Guide
- Both specs: Complete. Referenced for context, not blockers.

---

## Problem

On 2026-05-06, Peter attempted the first real first-consumer install of DesignerPunk by running `npm install @designerpunk/core` from a new product repository, following the DesignerPunk Integration Guide. The install returned 404.

Investigation surfaced three connected gaps:

1. **Package name drift.** The Integration Guide and roughly 50 other files across the repository reference `@designerpunk/core`, but `package.json` declares `@3fn/core`. The package.json name is correct — GitHub Packages requires the npm scope to match the owning GitHub account/organization, and the DesignerPunk repo is hosted under the `3fn` GitHub account. The Integration Guide and related artifacts were written to an aspirational name that never reconciled with the technical hosting constraint.

2. **Missing `product-template/` in the shipped package.** The Integration Guide instructs consumers to copy agent prompts via `cp -r node_modules/@designerpunk/core/product-template/agents/ .kiro/agents/`. The `product-template/` directory exists in the source repository but is not listed in `package.json`'s `files` array, which means it will not ship when the package is published — even after the name is corrected, that copy command will silently fail.

3. **No package has been published yet.** Version 10.2.5 in `package.json` reflects internal iteration, not published history. Nothing has been published under either `@designerpunk/core` or `@3fn/core`.

### Why this matters

- The portfolio site (the project that surfaced this issue) is blocked on installing `@3fn/core` as a dependency.
- The Integration Guide is authoritative for all future consumers. Every next product that follows it will hit the same 404 until the references are reconciled.
- This is the first real first-consumer validation event for DesignerPunk's distribution story. The learnings are worth preserving as a structured record.
- A governance gap — the drift went undetected for approximately 4 weeks between Spec 095's completion and this discovery — deserves a prevention mechanism.

---

## Goal

Ship DesignerPunk as `@3fn/core` to GitHub Packages (public) such that a fresh product repository can follow the Integration Guide and successfully install, consume, and build against the package. Add governance tooling to prevent this class of drift from recurring.

---

## Scope

### In scope

1. **Reconcile active references from `@designerpunk/core` (and orphan scopes `@designerpunk/tokens`, `@designerpunk/components`) to `@3fn/core`** across:
   - Functional source code:
     - `src/cli/init.ts` — two distinct fixes: line 43 (`.npmrc` scope generation) and line 189 (`defineConfig` import in generated config)
     - `src/config/defineConfig.ts` — JSDoc comments
     - `src/generators/BlendUtilityGenerator.ts` — emits JSDoc header into generated blend utility files
     - `src/blend/ThemeAwareBlendUtilities.web.ts` — JSDoc example reference
   - Component READMEs that ship via `src/` tree:
     - `src/components/core/Button-VerticalList-Item/README.md`
     - `src/components/core/Button-VerticalList-Set/README.md`
     - `src/components/core/Icon-Base/README.md`
   - Consumer-facing artifacts (`product-template/agents/` prompts, `product-template/agents/README.md`)
   - Local development agent prompts (`.kiro/agents/`)
   - Active authoritative steering docs (`DesignerPunk-Integration-Guide.md`, `Rosetta-System-Architecture.md`, `component-mcp-query-guide.md`, `Token-Quick-Reference.md`, `Token-Governance.md`)
   - Living roadmap docs (`docs/roadmap/integration-guide-draft.md` and others, evaluated case-by-case)

2. **Add `product-template/` to `package.json` `files` array** so agent prompts ship with the package.

3. **Add publish-required `package.json` metadata:**
   - `repository: { type: "git", url: "git+https://github.com/3fn/DesignerPunkv2.git" }` — required by GitHub Packages for scoped-package-to-repo association
   - `license: "UNLICENSED"` (or another explicit license) — prevents publish warnings
   - `author: "Peter Michaels Allen"` — standard metadata

4. **Reconcile orphan multi-package references** (`@designerpunk/tokens`, `@designerpunk/components`) — these reference a multi-package architecture that never materialized (Spec 095 consolidated to single-package). Normalize to `@3fn/core` with appropriate subpath per current `exports` map.

5. **Rebuild `dist/` fresh and verify clean** before publish — the scan found stale scope references in built artifacts (`dist/config/ConfigLoader.js`, `dist/config/defineConfig.js`, `dist/cli/designerpunk.js`, `dist/blend/ThemeAwareBlendUtilities.web.js`) that would ship even after source is corrected. Verification: `grep -r '@designerpunk' dist/ --include='*.{js,d.ts}'` must return zero hits (sourcemaps excluded).

6. **First publish of `@3fn/core` to GitHub Packages as a public package.** Publish command: `npm publish --access public`. `--access public` is required; scoped packages default to private.

7. **Add prevention tooling** — `prepublishOnly` script and CI check on PRs to main. Both scan for package name drift across `.kiro/steering/`, `src/`, `product-template/`, `.kiro/agents/`, and `dist/`. Pre-commit hook skipped as unnecessary friction.

8. **Document first-consumer learnings** in the spec's completion documentation.

### Out of scope

1. **Historical spec records.** Specs 081, 094, 095, 097, 100 contain `@designerpunk/core` references in their requirements, design, design-outline, tasks, feedback, and completion documents. These record intent at the time and will not be modified. A single retrospective note in the Integration Guide or spec feedback can explain the history if needed.

2. **GitHub account restructuring.** Creating a `designerpunk` GitHub organization and migrating the package to `@designerpunk/core` is a larger restructure outside this spec. This spec takes the `3fn` account as fixed.

3. **Version strategy.** Whether to publish as `10.2.5`, reset to `0.1.0`, or choose another version for the first public release is flagged as an open question but not resolved in this spec's core scope.

4. **Comprehensive audit of all 54 files with matches.** Only active/consumed references need correction. Historical records, test fixtures that mirror real imports, and internal notes are evaluated individually but not exhaustively rewritten.

5. **Portfolio site construction.** The portfolio site that triggered this discovery is a separate product-development effort owned by Leonardo and Sparky. This spec unblocks that work but does not include it.

6. **`init.ts`-vs-Integration-Guide agent source inconsistency.** The CLI `init` command copies agent prompts from `.kiro/agents/` (full 13-22KB development prompts), while the Integration Guide directs consumers to copy from `product-template/agents/` (slim 2-4KB `[CUSTOMIZE]`-marked templates). Two different consumer experiences depending on which flow a consumer follows. Flagged for a follow-up spec. The first-consumer verification pass in this spec will likely expose it; completion doc will note the observation.

7. **Release tool naming regression.** The release tool (`npm run release:notes`) generated `release-11.0.0.md` (lowercase, no "NOTES") plus unwanted `.internal.md` and `.json` sidecar artifacts. The canonical format is `RELEASE-NOTES-X.Y.Z.md` (established back to `RELEASE-NOTES-9.0.0.md`). Manually cleaned up for this publish (see feedback.md for timeline). Tool fix is a separate follow-up issue for Ada, logged during execution (see Task 2.5). Not in scope for this spec.

---

## Approach

### Domain distribution

| Work | Primary Agent | Notes |
|------|--------------|-------|
| Source code fixes (`src/cli/init.ts`, `src/config/defineConfig.ts`) | **Ada** | Pipeline/CLI is Rosetta domain |
| `package.json` `files` array update | **Ada** | Packaging is Rosetta domain |
| Publish command execution | **Ada** | Ada owns the pipeline and publish path; Peter authorizes |
| Prevention tooling (script + integration point) | **Ada** + **Thurgood** | Ada builds the script (pipeline concern), Thurgood governs where it hooks in (CI? pre-commit? pre-publish?) |
| Steering doc reconciliation | **Thurgood** | Civitas infrastructure |
| Product-template agent prompts | **Thurgood** | Consumer-facing governance artifacts |
| `.kiro/agents/` local agent prompts | **Thurgood** | Agent prompts are Civitas-stewarded |
| Publish authorization | **Peter** | Human lead |
| Final approval of all changes | **Peter** | Human lead |

### Sequence

1. Spec draft + feedback round (Ada primary reviewer, Thurgood co-author, Peter approver)
2. Tasks document written
3. Ada executes source changes (including `package.json` metadata); Thurgood executes doc changes (can happen in parallel)
4. Fresh rebuild of `dist/`; grep verification that no `@designerpunk/*` references remain in built artifacts (sourcemaps excluded)
5. Peter reviews changes
6. Ada publishes `@3fn/core` publicly with `npm publish --access public`
7. Post-publish verification loop (see Success criteria for the five concrete checks)
8. Prevention tooling added: `prepublishOnly` script + CI workflow
9. Completion documentation captures first-consumer learnings

---

## Open questions

To be resolved before or early in task execution:

1. **Version for first public publish.** RESOLVED: `11.0.0`. Rationale: the release tool's automated analysis (`npm run release:analyze`) recommended `11.0.0` with 90% confidence based on 19 real changes since tag `v10.2.0`, including 3 breaking changes that warrant a major bump under strict semver. Continuity with internal 10.x history is preserved (internal iteration via LinkedIn comms anchored on `10.2.5`). Major bump correctly signals breaking change from pre-public state. Counter-argument acknowledged: `11.x` overstates public API history on cold discovery — auditors won't see the prior 10 majors anywhere. Mitigation: completion doc will note that version `11.0.0` reflects internal iteration continuity, not public release history, and release notes generated for 11.0.0 reference predecessor `10.2.0` with documented change set.

2. **Prevention tooling placement.** RESOLVED: `prepublishOnly` script + CI check on PRs to main. Skip pre-commit (adds friction without proportional benefit over CI). Script scans `.kiro/steering/`, `src/`, `product-template/`, `.kiro/agents/`, and `dist/` for any `@<scope>/(core|tokens|components)` references where scope doesn't match `package.json` `name` scope. Excludes sourcemaps (`*.js.map`). Exits non-zero with clear drift report.

3. **License for first public publish.** RESOLVED: `Apache-2.0`. Rationale: Apache-2.0 provides the patent grant that protects novel methodology work, attribution requirement for downstream use, and permissive open-source licensing aligned with maximum adoption for the portfolio-site career-positioning goal. BSL and other source-available options evaluated and declined — the career advantage of permissive open source outweighs the modest protective value of source-available for a project without current commercial infrastructure. Trademark filing on "DesignerPunk" recommended separately as the appropriate mechanism for brand protection.

4. **Annotation of historical spec records.** Should a single "reconciled to `@3fn/core` on 2026-05-06" note be added to the top of each historical spec that referenced the old name? Or leave untouched and let this spec's completion doc be the sole record? **Decision needed from Peter** — leaning toward "leave untouched" since completion docs are the canonical record for the event. [CONFIRMED by Peter during feedback round: leave untouched.]

5. **Last Reviewed date updates.** Civitas process calls for updating `Last Reviewed` dates on steering docs after content changes. Will be handled as part of the doc reconciliation tasks — flagging explicitly so it's not forgotten.

---

## Risks

1. **Shipping `.kiro/agents/` may be unintended exposure.** The `files` array includes `.kiro/agents/`, meaning consumers receive your development agent prompts (Ada, Lina, Thurgood, Leonardo, Stacy, Sparky, Kenya, Data). This is likely intentional (dogfooding, demonstrating methodology), but worth an explicit confirm during feedback that it's the current intent.

2. **First publish could fail for reasons beyond name drift.** Even with `repository`, `license`, `author` added, GitHub Packages may reject the publish for metadata mismatch, scope/owner mismatch, or PAT scope issues. If publish fails, the spec should capture the additional unblocking work.

3. **Completion timing.** The portfolio site depends on this unblocking. If the spec takes longer than a day or two, Peter may want a temporary unblock (local file dependency instead of published package) to keep portfolio work moving while the spec completes.

### De-risked during feedback

- ~~Tests referencing `@designerpunk/core` in fixtures or mocks.~~ Ada verified — zero matches across `src/**/*.test.ts`. One existing test (`src/__tests__/browser-distribution/bundler-resolution.test.ts`) already asserts `packageJson.name === '@3fn/core'`.

---

## Success criteria

The spec is complete when all of the following are true:

1. `npm install @3fn/core` from a fresh, authenticated product repository succeeds.
2. Package is visible at `https://github.com/3fn/DesignerPunkv2/packages`.
3. `ls node_modules/@3fn/core/product-template/agents/` lists agent prompt files (validates `files` array fix).
4. `node -e "require('@3fn/core/package.json')"` resolves without error (validates basic module resolution).
5. Running the full Integration Guide walkthrough end-to-end in a fresh repo produces a working setup (install, configure, start MCP servers, generate tokens, consume tokens/components in a sample page).
6. No active references to `@designerpunk/core`, `@designerpunk/tokens`, or `@designerpunk/components` remain in source code, `product-template/`, `.kiro/agents/`, or authoritative steering docs.
7. `dist/` rebuilds cleanly with zero `@designerpunk/*` references (sourcemaps excluded).
8. Prevention tooling exists (`prepublishOnly` script + CI workflow) and triggers a failure if the package name drifts between `package.json` and active steering docs/source/dist.
9. Completion documentation captures the first-consumer learnings and the governance fix, suitable for reference when the next consumer validation surfaces similar drift.

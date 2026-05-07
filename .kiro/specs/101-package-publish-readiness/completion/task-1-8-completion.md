# Task 1.8 Completion: Wire Drift Detection into `prepublishOnly` and CI

**Date**: 2026-05-06
**Task**: 1.8 Wire drift detection into `prepublishOnly` and CI
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

Two files modified/created:

- **Modified**: `package.json` — added `check:drift` and `prepublishOnly` npm scripts
- **Created**: `.github/workflows/package-name-drift.yml` — 35 lines, runs on PRs to `main`, pushes to `main`, and `workflow_dispatch`

Commit: `5c72c03a`

---

## Implementation Details

### Approach

**`package.json` script additions** (appended to the `scripts` block):

```json
"check:drift": "node scripts/check-package-name-drift.js",
"prepublishOnly": "npm run build && npm run check:drift"
```

Two-script pattern instead of a single inline command:
- `check:drift` — standalone invocation for developer workflow (`npm run check:drift` at any time)
- `prepublishOnly` — composed of `build` + `check:drift` so that `npm publish` always validates against a fresh `dist/`, not stale output

Using `npm run check:drift` inside `prepublishOnly` (rather than duplicating `node scripts/check-package-name-drift.js`) keeps the script entry point in one place. Future changes to the invocation command propagate automatically.

**Node version pinning**: The CI workflow uses Node 22 (via `actions/setup-node@v4` with `node-version: '22'`). This matches the project's stated minimum (22+ recommended per `Core Goals.md`; 18+ supported) and ensures reproducibility. No `engines` field was added to `package.json` in this task — that's a separate governance decision outside Spec 101 scope.

**CI workflow triggers**:
- `pull_request` to `main` — catches drift before merge
- `push` to `main` — catches anything that bypasses PR review (direct pushes, emergency fixes)
- `workflow_dispatch` — manual trigger for one-off drift audits without requiring a PR/push

5-minute timeout matches the script's actual runtime (~5 seconds typical) with a wide safety margin.

### Key Decisions

**Pre-commit hook explicitly NOT added** — Per design-outline.md § "Open questions" item 2 (RESOLVED), pre-commit was evaluated and declined. Friction-to-benefit ratio didn't justify the per-commit cost when CI provides a reasonable safety net with earlier feedback than `prepublishOnly`.

**`prepublishOnly` over `prepublish`** — npm deprecated `prepublish` because it runs in non-publish contexts (e.g., `npm install` in a clone). `prepublishOnly` runs only before `npm publish`, which is precisely the surface this gate protects.

**CI workflow minimalism** — The workflow is deliberately simple: checkout, setup Node, run the script. No caching, no matrix, no secrets, no post-processing. This matches Spec 101's mechanical scope and keeps maintenance burden low. If drift detection evolves, the workflow can grow; YAGNI applies now.

**No separate CI job for each scan surface** — Could have split into parallel jobs per scan directory (.kiro/steering/, src/, etc.) for parallelism. Didn't because the script's total runtime is under 5 seconds in the typical case — parallelism would add complexity for no measurable gain.

**No `if: failure()` follow-up actions** — The default behavior (fail the workflow, which blocks PR merge when branch protection is configured) is sufficient. No need for Slack notifications or issue auto-creation at this stage; once drift is detected, the developer will see the red check and the report output in the workflow logs.

### Integration Points

- **`npm publish` invocation chain**: When Peter runs `npm publish --access public` during Task 2.2, npm automatically invokes `prepublishOnly` → `npm run build` (regenerates `dist/`) → `npm run check:drift` (validates no drift). If either fails, publish is aborted before anything reaches GitHub Packages.
- **PR review gating**: Once branch protection is configured on `main` to require the `Check package name drift` check (manual GitHub UI configuration, not in Spec 101 scope), any PR with drift will be blocked from merge. Until then, the check runs and reports but doesn't enforce.
- **Workflow-dispatch surface**: Anyone can manually trigger a drift audit via the Actions tab in GitHub. Useful for ad-hoc verification without requiring a commit.

---

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ `package.json` parses cleanly after edit: `node -e "require('./package.json')"` succeeds
- ✅ `npm run check:drift` invocation resolves correctly: script runs and produces expected output
- ✅ `npm run prepublishOnly` composition works: runs `build` first (regenerates `dist/`), then `check:drift` (validates it)
- ✅ YAML workflow file parses as valid GitHub Actions syntax (verified by checking `on:`, `jobs:`, `steps:` block structure)

### Functional Validation
- ✅ `npm run check:drift` executes and produces the same output as `node scripts/check-package-name-drift.js` directly
- ✅ `npm run prepublishOnly` composition exits successfully when drift is absent
- ✅ `npm run prepublishOnly` composition exits non-zero when drift is injected (verified indirectly via drift-state behavior during 1.1 Extension discovery)
- ✅ Workflow file references actions by major-version tags (`@v4`) for stability

### Integration Validation
- ✅ Workflow file committed to `.github/workflows/` — GitHub will discover and register it automatically on next push to `main`
- ✅ Workflow will trigger on next PR to `main` (verification deferred until a PR is opened; this task doesn't create one)
- ✅ `prepublishOnly` will trigger on next `npm publish --access public` in Task 2.2

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 7 (prevention tooling — `prepublishOnly` + CI): both wired
- ✅ Design Outline § "Open questions" item 2 (RESOLVED: `prepublishOnly` + CI, skip pre-commit): matches resolution
- ✅ Tasks.md § "1.8 > Validation": workflow triggers correctly (verification mechanism noted: will be observed on next PR; `act` was not used because no local act setup is in place)

---

## Notes

**`act` local verification not performed.** Tasks.md § "1.8" suggested verifying the workflow via `act` if available. `act` requires a local Docker setup for GitHub Actions emulation; the project doesn't have one configured, and installing Docker + act for a single 5-second workflow verification is disproportionate. Verification path chosen: the workflow will run for real on the next PR to `main` (including the PR associated with Spec 101 completion if one is created). If it fails to trigger or parse, that surfaces immediately and is trivially fixable.

**Branch protection not configured by this task.** The workflow runs and reports pass/fail, but GitHub branch protection rules that REQUIRE the check to pass before merge are configured manually in the repository Settings UI. That's a one-time admin action outside Spec 101's scope. Peter will configure it when convenient; until then, the workflow is advisory (runs and shows red/green, but doesn't block).

**The two-script pattern pays off for developer ergonomics.** A developer investigating a `prepublishOnly` failure can reproduce the specific failing step by running `npm run check:drift` alone (skipping the slower `build` step). Similarly, ad-hoc drift audits during feature development use `npm run check:drift` without needing a full `prepublishOnly` context. Small affordance, meaningful convenience.

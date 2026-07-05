# Release Analysis Placement

> **UPDATED (2026-07-05, ballot 125-A Task 1, Item 11e)**: the commit-time analysis integration this document described is retired with the direct-commit flow. Release analysis now runs **post-merge on `main`**. The sections below describe the current placement; the original commit-hook integration content is retained only as a historical record at the bottom.

## Current Placement (ballot Item 1e)

**Release analysis runs post-merge on `main`** — merged history is the analysis's correct input (it answers "what has accumulated on the release line since the last release" by scanning summary docs via git log; a branch-side run would count unmerged work and re-count on every push).

- **Mechanism**: `.github/workflows/release-analysis.yml` — a **non-required** workflow job triggered on push to `main` (i.e., after a PR merges) runs `release:analyze` and surfaces output in the workflow run summary. Non-blocking and informational, preserving the old fails-silently semantics.
- **On-demand detail**: `npm run release:analyze` locally, any time.
- **The completion tooling does not run analysis**: `complete-task.sh` commits, pushes, and opens the PR — analysis fires when Peter's merge lands the work on `main`. (The old `--no-analyze` flag retired with `commit-task.sh`.)

## Where to Look

- Analysis output: the `release-analysis` workflow run summary on GitHub (Actions tab), one run per merge to `main`.
- Release sequence under the PR gate: `.kiro/hooks/RELEASE-FLOW.md`.
- The law: `.kiro/steering/Task-Completion-Protocol.md` § "Completion State in the PR Flow".

---

## Historical Record — retired commit-time integration

*Everything below described the pre-gate design (analysis triggered by `commit-task.sh` after direct commits to `main`, with an optional Kiro agent hook). The scripts it references (`analyze-after-commit.sh` in `.kiro/hooks/` and `.kiro/agent-hooks/`) were part of that design; `commit-task.sh` is now a hard-fail tombstone. This is a record, not instruction — do not wire analysis back into commit time.*

- The Git-hook variant ran quick analysis (<10s) after each task-completion commit, non-blocking, with a lock file (`.kiro/release-analysis/.analysis-lock`, 30s max age) to prevent concurrent runs during rapid commits.
- The agent-hook variant (`.kiro/agent-hooks/release-analysis-on-task-completion.json`) triggered on task-completion events, silent unless erroring.
- `HookIntegrationManager` (`src/release-analysis/hooks/HookIntegrationManager.ts`) installed the integration via `npm run release:hooks:install git`.
- Requirements it addressed: 9.1 (automatic analysis after task-completion commits), 9.4 (graceful failure), 9.6 (concurrent request handling) — the post-merge workflow preserves 9.4's non-blocking semantics; 9.1's trigger moved from commit-time to merge-time; 9.6 is moot (one run per merge).

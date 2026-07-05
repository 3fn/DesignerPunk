# Tasks: 125-A — PR Gate + Mechanical Arming

**Date**: 2026-07-05
**Status**: DRAFT — pending the collective review round; task types per the ratified four-type taxonomy (ballot 2026-07-05)

---

## Task Group 1 — Phase 0: the PR gate

- [ ] **1. Draft the workflow-law ballot**
  **Type**: Documentation
  **Validation**: Tier 2 (conjunctive criterion met: the ballot carries SHALL/SHALL NOT contract content AND this spec's downstream tasks depend on it)
  Draft the ballot proposing exact before→after edits for ALL ELEVEN surfaces enumerated in `../125-mechanical-enforcement-strategy/inbound-from-122.md` §3 (2 always-loaded steering + 6 governance docs + 3 hook docs/scripts), moved atomically: the PR-flow sequence agents follow, the merge rule (recommended: agents open PRs, Peter merges or delegates merge-on-green), branch/PR conventions, where release analysis moves, and the prune-with-arm what/why splits (recorded as 125-B map seed entries). Route per `.kiro/docs/ballots/README.md`; Peter ratifies. (First planned use of the record-first protocol.)

- [ ] **2. Rework `commit-task.sh` + task tooling for branch → PR → merge**
  **Type**: Implementation
  **Validation**: Tier 2
  Branch creation, commit, push, PR open (documented title/body convention), PR URL reported; merge behavior per the ratified ballot; actionable failure when `gh` credentials are absent (NEVER silent fallback to direct push); release-flow reconciliation (version-bump + `postpublish` token-index push traverse or are explicitly exempted from the gate) per Req 4.4.

- [ ] **3. Enable branch protection + required checks v1**
  **Type**: Setup
  **Validation**: Tier 1
  Protect `main`: required status checks = the currently-green armed set (consumer-guard jobs + drift detection); enforce for administrators; no required reviews. NOTE: needs repo-admin permission — either Peter clicks Settings → Branches, or the fine-grained PAT gains Administration read/write (it currently lacks even Contents write). Record the check-set baseline per Req 2.2.

- [ ] **4. Apply the ratified law + prove the flow end-to-end**
  **Type**: Implementation
  **Validation**: Tier 2
  Apply the ballot's law edits (record-first: only after committed RATIFIED status) across all eleven surfaces atomically, ending with the mechanical residual-instruction sweep (Req 3.1) and Thurgood's cross-surface consistency check; then run ONE real task through the full new flow — branch, PR, checks, merge — as the acceptance proof. Verify a direct push to `main` is rejected (prove-the-gate-bites).

- [ ] **5. BAKE-IN GATE (blocking checkpoint — not a task to rush)**
  **Type**: Documentation
  **Validation**: Tier 1
  ≥5 working days of ordinary work through the gate. Log every ergonomics finding (friction, check latency, tooling gaps) in this spec; resolve or get Peter's explicit acceptance for each. Peter check-in closes the gate and authorizes Group 2.

## Task Group 2 — Phase 1a: mechanical arming (blocked on Task 5)

- [ ] **6. Measure cold-cache CI timing for the candidate lanes**
  **Type**: Setup
  **Validation**: Tier 1
  Run full `tsc --noEmit`, `build:validate`, root `npm test`, and both sub-package suites as non-required workflow jobs; record cold-cache durations. IF total exceeds ~10 min THEN pause for Peter's latency acceptance (Req 6.3).

- [ ] **7. Wire the four lanes with selection-floor + scope guards**
  **Type**: Implementation
  **Validation**: Tier 2
  Workflow jobs for: full typecheck, `build:validate`, root functional suite, `mcp-server` suite, `application-mcp-server` suite. Each test lane: explicit cwd/config, `--listTests` selection floor, and a recorded prove-it-bites run (artificially emptied selection → lane fails) per Req 7. Rider: bump `actions/checkout` / `actions/setup-node` (Req 8).

- [ ] **8. Promote the lanes to required checks**
  **Type**: Setup
  **Validation**: Tier 1
  Add the Group-2 lanes to branch protection's required set. Verify a PR with a deliberate type error and a PR with a deliberate test failure are both blocked (gate-bites proof at the platform level).

- [ ] **9. Closeout: completion docs + handbacks**
  **Type**: Documentation
  **Validation**: Tier 1
  Completion + summary docs per Task-Completion-Protocol (as amended by this very spec — eat the dogfood). Handbacks: inbound note to **122** ("the gate is armed and OPEN for your registrants — diff-guard, canonical-vs-truth, sweeps, tool-boot smoke; required-check baseline attached") and seed note to **125-B** (deferred: warn→fail candidates observed during arming, CODEOWNERS layer, the tool-boot smoke arming once 122's registry exists, the map seed entries from Task 1's what/why splits, any ergonomics findings). Update the umbrella 125 outline's status.

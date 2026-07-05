# Tasks: 125-A — PR Gate + Mechanical Arming

**Date**: 2026-07-05
**Status**: DRAFT — pending the collective review round; task types per the ratified four-type taxonomy (ballot 2026-07-05)

---

## Task Group 1 — Phase 0: the PR gate

- [x] **1. Draft the workflow-law ballot** ✅ COMPLETE — RATIFIED (Peter, 2026-07-05)
  **Type**: Documentation
  **Validation**: Tier 2 (conjunctive criterion met: the ballot carries SHALL/SHALL NOT contract content AND **other specs' decisions depend on it** — 125-B's classification map consumes the what/why seed entries, and 122's first-generation ratchet consumes the ratified protocol) [grounds corrected per T-A1]
  Draft the ballot for ALL live instruction surfaces carrying the direct-commit flow — **re-grep at draft time with per-surface counts** (the enumeration has been wrong twice: 11 → 12; latest known set = inbound-from-122 §3's eleven + `.cursor/rules/designerpunk-core.mdc:32`), moved atomically. Ballot contents: the PR-flow sequence; the **completion-state definition** (task complete at merge; taskStatus/docs/stop-and-wait placement — Req 3.6); the merge rule (agents open PRs, Peter merges on green; governance-law carve-out; delegation only as a recorded rule); branch/PR conventions; where release analysis moves; the residual-sweep pattern set + instruction-vs-historical scope split; the prune-with-arm what/why splits (handoff seeds for 125-B, not ratified rows); the Cursor rules file migrated or deprecated per **Peter's runtime decision (open input)**. Route per `.kiro/docs/ballots/README.md`; Peter ratifies. (First planned use of the record-first protocol.)

- [ ] **2. Rework `commit-task.sh` + task tooling for branch → PR → merge**
  **Type**: Implementation
  **Validation**: Tier 2
  **Builds and proves — does NOT activate** [T-A9]: the reworked script's behavioral cutover lands in Task 4's atomic window with the doc surfaces, avoiding a half-migrated-corpus window. Scope: branch creation, commit, push, PR open (documented title/body convention), PR URL reported; merge behavior per the ratified ballot; actionable failure when credentials are absent or under-scoped (NEVER silent fallback to direct push). **First checklist item: PAT scope remediation** (Contents: write + Pull requests: write; Administration for Task 3 or Peter clicks) — verified blocker, recorded in completion docs [T-A3]. Release-flow reconciliation per Req 4.4's two forms, with a reconciliation smoke proven BEFORE Task 3 (the postpublish mid-publish hard-fail) [T-A4, S].

- [ ] **3. Enable branch protection + required checks v1**
  **Type**: Setup
  **Validation**: Tier 1
  **BLOCKED ON**: Req 4.4 reconciliation proven (Task 2) AND Task 4 staged to land back-to-back — the platform must not reject what the law still instructs, and publishes must not hard-fail mid-flight [T-A4, T-A9]. Protect `main`: required status checks = the currently-green armed set (consumer-guard jobs + drift detection); enforce for administrators; no required reviews; no path-filtered required contexts (Req 2.3). Needs repo-admin permission — Peter clicks Settings → Branches, or the PAT gains Administration (see Task 2's remediation). Record the check-set baseline per Req 2.2 and the documented emergency procedure per Req 1.4.

- [ ] **4. Apply the ratified law + prove the flow end-to-end**
  **Type**: Implementation
  **Validation**: Tier 2
  The atomic window [T-A9]: apply the ballot's law edits across ALL surfaces (record-first: only after committed RATIFIED status) AND land Task 2's script cutover together, ending with the ballot-defined residual-instruction sweep (Req 3.1) and Thurgood's cross-surface consistency check; then run ONE real task through the full new flow — branch, PR, checks, merge — as the acceptance proof. Verify a direct push to `main` is rejected **using an admin credential, stated in the proof record** — a non-admin rejection proves nothing about the bypass Req 1.1 closes [S].

- [ ] **5. BAKE-IN GATE (blocking checkpoint — not a task to rush)**
  **Type**: Documentation
  **Validation**: Tier 1
  Closure evidence per Req 5 [T-A6, S]: ≥5 distinct working days each with ≥1 ordinary-work PR merged through the gate; a findings ledger in this spec with every entry resolved or "Peter-accepted (date)"; and Peter's closure as a **dated check-in record in this spec** (authority is a record). Closure authorizes Group 2.

## Task Group 2 — Phase 1a: mechanical arming (blocked on Task 5)

- [ ] **6. Measure cold-cache CI timing for the candidate lanes**
  **Type**: Setup
  **Validation**: Tier 1
  Run full `tsc --noEmit`, `build:validate`, root `npm test`, and both sub-package suites as non-required workflow jobs; record **wall-clock to all-green** in both cold-cache and cached steady-state forms (Req 6.3) [T-A7]. IF cold-cache wall-clock exceeds ~10 min THEN pause for Peter's latency acceptance. The baseline is the headroom budget recorded for 122's future registrants [S].

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
  Completion + summary docs per Task-Completion-Protocol (as amended by this very spec — eat the dogfood). Handbacks: inbound note to **122** ("the gate is armed and OPEN for your registrants — diff-guard, canonical-vs-truth, sweeps, tool-boot smoke; required-check baseline + latency headroom attached") and seed note to **125-B**, physically located in the umbrella dir as `../125-mechanical-enforcement-strategy/inbound-to-125-B-from-125-A.md` [S] (deferred: warn→fail candidates observed during arming, CODEOWNERS layer + PR-approval-as-ratification, the tool-boot smoke once 122's registry exists, the map seed entries from Task 1's what/why splits — handoff records, not ratified rows — and any ergonomics findings routed forward). Update the umbrella 125 outline's status.

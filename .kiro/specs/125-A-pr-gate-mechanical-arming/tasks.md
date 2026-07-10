# Tasks: 125-A — PR Gate + Mechanical Arming

**Date**: 2026-07-05
**Status**: Tasks 1–5 COMPLETE (Task 5 bake-in closed 2026-07-10, PR #41). **Group 2 (Tasks 6–9): round 1 run + incorporated + RATIFIED (Peter, 2026-07-10** — Thurgood R1 AWA + Stacy R1 AWA in feedback.md § "Tasks 6–9 Feedback"; three decision points ratified: non-jest lane guards adopted, per-lane gate-bites adopted, inverse-drift handback recorded**)**. Task types per the ratified four-type taxonomy (ballot 2026-07-05).

---

## Task Group 1 — Phase 0: the PR gate

- [x] **1. Draft the workflow-law ballot** ✅ COMPLETE — RATIFIED (Peter, 2026-07-05)
  **Type**: Documentation
  **Validation**: Tier 2 (conjunctive criterion met: the ballot carries SHALL/SHALL NOT contract content AND **other specs' decisions depend on it** — 125-B's classification map consumes the what/why seed entries, and 122's first-generation ratchet consumes the ratified protocol) [grounds corrected per T-A1]
  Draft the ballot for ALL live instruction surfaces carrying the direct-commit flow — **re-grep at draft time with per-surface counts** (the enumeration has been wrong twice: 11 → 12; latest known set = inbound-from-122 §3's eleven + `.cursor/rules/designerpunk-core.mdc:32`), moved atomically. Ballot contents: the PR-flow sequence; the **completion-state definition** (task complete at merge; taskStatus/docs/stop-and-wait placement — Req 3.6); the merge rule (agents open PRs, Peter merges on green; governance-law carve-out; delegation only as a recorded rule); branch/PR conventions; where release analysis moves; the residual-sweep pattern set + instruction-vs-historical scope split; the prune-with-arm what/why splits (handoff seeds for 125-B, not ratified rows); the Cursor rules file migrated or deprecated per **Peter's runtime decision (open input)**. Route per `.kiro/docs/ballots/README.md`; Peter ratifies. (First planned use of the record-first protocol.)

- [x] **2. Rework `commit-task.sh` + task tooling for branch → PR → merge** ✅ COMPLETE (built + proven; activation at Task 4)
  **Type**: Implementation
  **Validation**: Tier 2
  **Builds and proves — does NOT activate** [T-A9]: the reworked script's behavioral cutover lands in Task 4's atomic window with the doc surfaces, avoiding a half-migrated-corpus window. Scope: branch creation, commit, push, PR open (documented title/body convention), PR URL reported; merge behavior per the ratified ballot; actionable failure when credentials are absent or under-scoped (NEVER silent fallback to direct push). **First checklist item: PAT scope remediation** (Contents: write + Pull requests: write; Administration for Task 3 or Peter clicks) — verified blocker, recorded in completion docs [T-A3]. Release-flow reconciliation per Req 4.4's two forms, with a reconciliation smoke proven BEFORE Task 3 (the postpublish mid-publish hard-fail) [T-A4, S].

- [x] **3. Enable branch protection + required checks v1** ✅ COMPLETE (protection LIVE on `main`, 2026-07-05; admin-credential rejection proven)
  **Type**: Setup
  **Validation**: Tier 1
  **BLOCKED ON**: Req 4.4 reconciliation proven (Task 2) AND Task 4 staged to land back-to-back — the platform must not reject what the law still instructs, and publishes must not hard-fail mid-flight [T-A4, T-A9]. Protect `main`: required status checks = the currently-green armed set (consumer-guard jobs + drift detection); enforce for administrators; no required reviews; no path-filtered required contexts (Req 2.3). Needs repo-admin permission — Peter clicks Settings → Branches, or the PAT gains Administration (see Task 2's remediation). Record the check-set baseline per Req 2.2 and the documented emergency procedure per Req 1.4.

- [x] **4. Apply the ratified law + prove the flow end-to-end** ✅ COMPLETE at merge (applied 2026-07-05 on `task/125-A-4-apply-workflow-law`; sweep PASS; this task's own PR is the acceptance proof)
  **Type**: Implementation
  **Validation**: Tier 2
  The atomic window [T-A9]: apply the ballot's law edits across ALL surfaces (record-first: only after committed RATIFIED status) AND land Task 2's script cutover together, ending with the ballot-defined residual-instruction sweep (Req 3.1) and Thurgood's cross-surface consistency check; then run ONE real task through the full new flow — branch, PR, checks, merge — as the acceptance proof. Verify a direct push to `main` is rejected **using an admin credential, stated in the proof record** — a non-admin rejection proves nothing about the bypass Req 1.1 closes [S].

- [ ] **5. BAKE-IN GATE (blocking checkpoint — not a task to rush)**
  **Type**: Documentation
  **Validation**: Tier 1
  Closure evidence per Req 5 [T-A6, S]: ≥5 distinct working days each with ≥1 ordinary-work PR merged through the gate; a findings ledger in this spec with every entry resolved or "Peter-accepted (date)"; and Peter's closure as a **dated check-in record in this spec** (authority is a record). Closure authorizes Group 2.

## Task Group 2 — Phase 1a: mechanical arming (blocked on Task 5)

- [x] **6. Record the lane timing measurements (residual — the lanes themselves SHIPPED early, PR #38)**
  **Type**: Setup
  **Validation**: Tier 1
  *(v2 — re-scoped to the residual per THURGOOD R1 T1; the five lanes merged as non-required jobs in PR #38 (2026-07-10), with three PR-runs' findings fixed in-flight — see `lane-timing.yml` inline comments + feedback.md round context.)* Residual: (a) dispatch the `workflow_dispatch cold: true` run — **requires Peter's Actions-write click** (session PATs lack the scope); (b) record BOTH cold-cache AND cached steady-state wall-clock PER LANE (Req 6.3), plus the head-push→all-green wall-clock (felt latency — NOT sum-of-lanes); (c) assert the ~10-min cold ceiling — IF breached THEN pause for Peter's latency acceptance. **Cold-cache recording is a COMPLETION BLOCKER** (STACY R1): steady-state alone does not satisfy Req 6.3. Steady-state samples to date: typecheck 37s · build-validate 26s · mcp-server 23s · app-mcp 24s · functional-root ~3m54s (incl. full build). The recorded baseline is the headroom budget for 122's future registrants [S].

- [x] **7. Wire the FIVE lanes with did-it-really-run guards**
  **Type**: Implementation
  **Validation**: Tier 2
  *(v2 — five lanes, not four; per-lane guard mapping per THURGOOD R1 T2 + STACY R1 items 1–2; the two non-jest guards are a scope extension RATIFIED by Peter 2026-07-10.)*
  - **Three test lanes** (`lane-functional-root`, `lane-mcp-server-suite`, `lane-application-mcp-server-suite`): explicit cwd/config; `--listTests` selection floor (recorded floor value + derivation + date); prove-it-bites (artificially emptied selection → lane FAILS) per Req 7.
  - **`lane-typecheck`** (non-jest): compiled-file-count floor — assert `tsc --listFilesOnly` count ≥ a recorded floor, so a silently-narrowed tsconfig cannot green.
  - **`lane-build-validate`** (non-jest): execution assertion — non-zero validated-token count / explicit success sentinel asserted in output; "ran and validated" is checkable, not assumed.
  - **Evidence form (STACY R1 — scope auditable, not asserted)**: each lane's record = the CI run URL **plus the resolved selection output** (`--listTests` file list or count+path-sample for test lanes; file-count / sentinel output for the other two), committed in `task-7-completion.md`. The floor proves non-empty; the recorded list proves correct-scope.
  - Rider: bump `actions/checkout` / `actions/setup-node` (Req 8 — the Node-20 deprecation warnings are live on every current run).

- [ ] **8. Promote the lanes to required checks**
  **Type**: Setup
  **Validation**: Tier 1
  *(v2 — per-lane gate-bites + set-assertion, RATIFIED Peter 2026-07-10.)* Add the five lane contexts to branch protection's required set. **Per-lane gate-bites proof**: one deliberate-failure PR per promoted lane (type error → `lane-typecheck`; a build-validate assertion failure; one failing test seeded in EACH of the three suites' scopes), each shown BLOCKED at the platform; record = the five PR URLs in the Task-9 closeout completion doc (STACY R1 items 2–3). **Set-assertion at promotion** (STACY R1 item 5): record the promoted required-context set (the five names) and paste the `gh api` branch-protection read into the record; Task 9 hands the five names to 122's `verify-gate-registration.sh` so the monthly count-assert covers them standing.

- [ ] **9. Closeout: completion docs + handbacks**
  **Type**: Documentation
  **Validation**: Tier 1
  *(v2 — deferred-list amendments per THURGOOD R1 T4a/T4b [registry identification corrected in SESSION R2] + STACY R1 items 4–5, RATIFIED Peter 2026-07-10.)* Completion + summary docs per Task-Completion-Protocol (as amended by this very spec — eat the dogfood). Handbacks:
  - Inbound note to **122**: "the gate is armed and OPEN for your registrants — diff-guard, canonical-vs-truth, sweeps, tool-boot smoke; required-check baseline + latency headroom attached" — **plus the five promoted context names, to fold into `verify-gate-registration.sh`'s asserted set** (converts Task 8's one-time set-assertion into standing monthly coverage).
  - Seed note to **125-B** at `../125-mechanical-enforcement-strategy/inbound-to-125-B-from-125-A.md` [S], carrying: **bake-in findings 1 and 3 cited BY LEDGER NUMBER** (the two OPEN→125-B items; findings 4/5/6 are dispositioned at closure and NOT carried — no over-handing); warn→fail candidates observed during arming; CODEOWNERS layer + PR-approval-as-ratification; **the tool-boot smoke — 122's manifest (`canonical/registry/tool-registry.json`, 122 Task 4) EXISTS on `task/122-substrate` pending U1's merge, a live candidate rather than a wait-for-existence deferral**; the map seed entries from Task 1's what/why splits (handoff records, not ratified rows); **the inverse-drift observation (STACY R1 item 4): armed lanes rebuild-from-clean — incremental-path integrity and stale-artifact masking are unguarded, future-check candidate**; and any ergonomics findings routed forward.
  - Update the umbrella 125 outline's status.

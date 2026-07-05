# Requirements: 125-A — PR Gate + Mechanical Arming

**Date**: 2026-07-05
**Status**: DRAFT — pending the collective review round (Thurgood + Stacy) under Peter's sequential-gate waiver

---

## Requirement 1 — All changes to `main` arrive via gated PRs

**User story**: As the project lead, I want every change to `main` to pass the required checks before merging, so that enforcement fires regardless of any agent's choice.

**Acceptance criteria**:
1. WHEN branch protection is enabled THEN direct pushes to `main` SHALL be rejected — **including for administrators** (a solo repo where the admin bypasses teaches every agent using those credentials that the gate is optional).
2. WHEN a PR's required checks fail THEN merging SHALL be blocked by the platform, not by convention.
3. WHEN a PR's required checks pass THEN it SHALL be mergeable without human review approval (checks-only in this spec; required-review arrives with 125-B's CODEOWNERS layer).
4. A documented **emergency procedure** SHALL exist (Peter temporarily lifts protection via settings; each use logged in this spec) — a gate with no legitimate emergency path teaches ad-hoc bypass. [T-A10]

## Requirement 2 — Phase 0's required-check set is the currently-green set, unchanged

**Acceptance criteria**:
1. The initial required checks SHALL be exactly the existing armed lanes (the consumer-guard workflow's jobs and package-name drift detection) — no new checks in Phase 0.
2. WHEN the gate goes live THEN the required-check set SHALL be recorded (names + workflow file refs) in this spec's completion docs, as the baseline Phase 1a extends.
3. The required-check set SHALL be OPEN by construction, defined operationally: adding a check SHALL require only (a) a workflow job producing a named status context and (b) adding that context name to the protection list — nothing else. Required checks SHALL NOT be path-filtered (a filtered required context that never triggers sits "Expected" forever and blocks the merge — the one way the open set silently closes) [T-A2]. This AC is verified by Task 8 adding the Group-2 lanes without redesign — not by assertion [S]. Known future registrants (per `../125-mechanical-enforcement-strategy/inbound-from-122.md` §1): Phase 1a's lanes, then 122's regenerate-and-diff guard, canonical-vs-truth check, the seven input-fidelity sweeps, and the tool-boot smoke.

## Requirement 3 — The workflow law changes via the record-first ratification protocol

**User story**: As the project lead, I want the Task-Completion-Protocol change drafted, recorded, and ratified per `.kiro/docs/ballots/README.md`, so the first operational-law change under the new protocol demonstrates it.

**Acceptance criteria**:
1. A ballot SHALL propose the exact before→after edits for **every live instruction surface** carrying the direct-commit flow. The ballot SHALL re-run the surface-enumeration grep at draft time with per-surface occurrence counts — enumerated lists are floors, not ceilings (the count has been wrong twice already: eleven per inbound-from-122 §3, then a twelfth found in review: `.cursor/rules/designerpunk-core.mdc:32`, a Cursor-runtime instruction file the original grep's categories missed) [T-A5, S]. The Cursor rules file SHALL be migrated or formally deprecated per Peter's runtime decision (open input to Task 1). All surfaces SHALL move **atomically** — a half-migrated corpus tells agents two different completion flows. Application SHALL end with a mechanical residual-instruction sweep whose pattern set (beyond the literal `commit-task`: "push to main", "commit directly", etc.) and scope split are ballot-defined and auditable: **instruction surfaces migrate; historical records (~139 spec tasks.md/completion files) are explicitly left as records** [S].
2. The law edits SHALL NOT be applied before the ballot's committed status is `RATIFIED (Peter, <date>)`.
3. WHEN the law is applied THEN the ballot's application record, metadata validation, and (for MCP-served docs) index rebuild SHALL be completed per the ballot's own mechanics; Thurgood's cross-surface consistency check SHALL cover the sweep (inbound §3).
4. **Prune-with-arm, applied reflexively** (inbound §4): where the gate now mechanically owns a *what* (e.g., checks run on every PR), the rewritten prose SHALL shift that text from instruction to context (*why/when*) rather than leaving imperative prose to coexist with the barrier — and the ballot SHALL record each what/why split it makes as seed entries for 125-B's classification map. Seed entries are **handoff records for 125-B, not ratified map rows** [S].
5. The ballot SHALL decide where `commit-task.sh`'s release-analysis step moves in the PR flow (e.g., at merge) — inbound §3's hooks note.
6. The ballot SHALL define the **completion state** in the PR flow: whether a task is complete at PR-open or at merge, where `taskStatus` fires, where completion/summary docs land (on-branch), and where the stop-and-wait rule sits. Under the recommended merge rule, **the merge is the authorization act** — stop-and-wait composes with it; the ballot SHALL state this explicitly so eight agents don't improvise eight answers [S — the load-bearing gap].
7. Throughout 125-A, a checks-only merge SHALL NOT constitute ratification: layer-1 record-first (`.kiro/docs/ballots/README.md`) remains the ratification mechanism for governance-law changes until 125-B's CODEOWNERS layer delivers platform-verified approval [T-A8].

## Requirement 4 — `commit-task.sh` (and task tooling) produce the PR flow

**Acceptance criteria**:
1. WHEN an agent completes a task THEN the tooling SHALL create a branch, commit, push, open a PR (title/body per a documented convention), and report the PR URL — not push to `main`.
2. WHEN required checks pass THEN the documented flow SHALL define who/what merges — both reviewers converge on: agents open branches/PRs; Peter merges on green during bake-in; delegation of merge-on-green is decided WITH bake-in data, and any delegation SHALL be a **recorded rule** (ballot or committed follow-up), never a verbal grant [relayed-authority lesson]. Standing carve-out regardless of delegation: PRs touching governance law stay Peter-merged (the closest ratification proxy until 125-B's CODEOWNERS) [T+S convergence].
3. The tooling SHALL work with the credential setup actually present on the dev machine; WHEN credentials are missing or under-scoped THEN it SHALL fail with an actionable message, not fall back to direct push. **PAT scope remediation is an explicit precondition** [T-A3, verified blocker]: the current fine-grained PAT lacks Contents write (cannot push a branch) — Task 2 SHALL verify/upgrade to Contents: write + Pull requests: write (Administration for Task 3, or Peter performs Task 3 in Settings), recorded in completion docs.
4. The release flow SHALL be reconciled with branch protection in one of two forms [T+S convergence — no standing exemption]: (a) traverse — version-bump commits via a release PR, and the `postpublish` token-index push restructured (regenerated on the release branch pre-merge, or auto-opening its own PR); or (b) IF bake-in evidence proves traversal unacceptable THEN a narrowly-scoped, documented bypass actor with its bypass surface stated plainly. Verified blocker [T-A4]: `package.json:137`'s `postpublish` pushes directly to `main` — the next publish after Task 3 fails MID-PUBLISH unless reconciled first; no release SHALL occur in the Task-3→reconciliation window.

## Requirement 5 — Bake-in gate between Phase 0 and Phase 1a

**Acceptance criteria**:
1. Phase 1a tasks SHALL NOT begin until ≥5 distinct working days **each with ≥1 ordinary-work PR merged through the gate** (calendar alone is claimable by a quiet week) [T-A6, S].
2. Ergonomics findings SHALL be logged in a findings ledger in this spec, each entry marked resolved or "Peter-accepted (date)" before Phase 1a.
3. Gate closure SHALL be a **dated Peter check-in recorded in this spec** — authority is a record, not a recollection [S].

## Requirement 6 — Phase 1a arms the wholesale mechanical check set

**Acceptance criteria**:
1. The following SHALL each become required, blocking checks: full-project typecheck (`tsc --noEmit`), `build:validate`, the full root functional suite (`npm test`), and the two MCP sub-package suites (`mcp-server`, `application-mcp-server`).
2. WHEN any lane fails THEN merge SHALL be blocked; there SHALL be no warn-only lanes in this set (warn→fail promotions of *assertions* remain 125-B).
3. BEFORE promotion to required, CI timing SHALL be measured and recorded as **wall-clock from PR head push to all-required-checks-complete** (checks run in parallel; sum-of-lanes is not the felt latency), in BOTH cold-cache and cached steady-state forms [T-A7, S]; IF cold-cache wall-clock exceeds ~10 minutes THEN promotion SHALL pause for Peter's explicit acceptance. The measured baseline SHALL be recorded in completion docs as the headroom budget 122's future check registrants draw against [S]. IF latency ever becomes a problem THEN the remedy is caching/parallelism — NEVER path-filtering required checks (Req 2.3) [T].

## Requirement 7 — Armed means verified non-empty AND correct scope

**User story**: As the steward of the 2026-07-03 empty-lane lesson, I want every armed lane to prove it ran the intended selection, so an empty or mis-scoped green can never read as a pass.

**Acceptance criteria**:
1. Each armed test lane SHALL assert a selection floor (e.g., `--listTests` count ≥ a recorded floor) and fail loud if under it.
2. Each armed lane SHALL run from an explicit working directory and config (no inherited-cwd ambiguity).
3. Each floor guard SHALL have a prove-it-bites verification recorded (artificially empty selection → lane fails) before the lane is trusted. Per lane, the Task 7 completion doc SHALL record the floor value, **its derivation with date** (e.g., N% of the current `--listTests` count), and the failing-run evidence — a floor without provenance rots into "≥1" [S].

## Requirement 8 — CI chore rider

**Acceptance criteria**:
1. WHILE touching the workflows, `actions/checkout` and `actions/setup-node` SHALL be bumped past the Node-20 deprecation warnings.

## Requirement 9 — Negative scope holds

**Acceptance criteria**:
1. This spec SHALL NOT add new lint rules, warn→fail assertion promotions, CODEOWNERS/required-review, classification-map content, or consumer-side enforcement. WHEN such work is discovered mid-execution THEN it SHALL be routed to 125-B or 123 via inbound note, not absorbed.

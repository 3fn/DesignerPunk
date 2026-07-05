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

## Requirement 2 — Phase 0's required-check set is the currently-green set, unchanged

**Acceptance criteria**:
1. The initial required checks SHALL be exactly the existing armed lanes (the consumer-guard workflow's jobs and package-name drift detection) — no new checks in Phase 0.
2. WHEN the gate goes live THEN the required-check set SHALL be recorded (names + workflow file refs) in this spec's completion docs, as the baseline Phase 1a extends.
3. The required-check mechanism SHALL accommodate adding checks without redesign — the set is OPEN by construction. Known future registrants (per `../125-mechanical-enforcement-strategy/inbound-from-122.md` §1): Phase 1a's lanes, then 122's regenerate-and-diff guard, canonical-vs-truth check, the seven input-fidelity sweeps, and the tool-boot smoke. Phase 0 builds the gate they plug into, not the checks.

## Requirement 3 — The workflow law changes via the record-first ratification protocol

**User story**: As the project lead, I want the Task-Completion-Protocol change drafted, recorded, and ratified per `.kiro/docs/ballots/README.md`, so the first operational-law change under the new protocol demonstrates it.

**Acceptance criteria**:
1. A ballot SHALL propose the exact before→after edits for **all eleven grep-verified surfaces** enumerated in `../125-mechanical-enforcement-strategy/inbound-from-122.md` §3 (2 always-loaded steering docs, 6 governance-corpus docs, 3 hook docs/scripts), replacing direct `commit-task.sh` commit-to-main with branch → PR → checks → merge. The eleven SHALL move **atomically** — a half-migrated corpus tells agents two different completion flows. Application SHALL end with a mechanical sweep for residual direct-commit instruction (not trust in the enumerated list — the `.web.tsx` 9-vs-2 datapoint, inbound §6).
2. The law edits SHALL NOT be applied before the ballot's committed status is `RATIFIED (Peter, <date>)`.
3. WHEN the law is applied THEN the ballot's application record, metadata validation, and (for MCP-served docs) index rebuild SHALL be completed per the ballot's own mechanics; Thurgood's cross-surface consistency check SHALL cover the sweep (inbound §3).
4. **Prune-with-arm, applied reflexively** (inbound §4): where the gate now mechanically owns a *what* (e.g., checks run on every PR), the rewritten prose SHALL shift that text from instruction to context (*why/when*) rather than leaving imperative prose to coexist with the barrier — and the ballot SHALL record each what/why split it makes as seed entries for 125-B's classification map.
5. The ballot SHALL decide where `commit-task.sh`'s release-analysis step moves in the PR flow (e.g., at merge) — inbound §3's hooks note.

## Requirement 4 — `commit-task.sh` (and task tooling) produce the PR flow

**Acceptance criteria**:
1. WHEN an agent completes a task THEN the tooling SHALL create a branch, commit, push, open a PR (title/body per a documented convention), and report the PR URL — not push to `main`.
2. WHEN required checks pass THEN the documented flow SHALL define who/what merges — reviewer decision point, with the recommended answer from `inbound-from-122.md` §5: agents open branches/PRs (composing cleanly with the existing "never push to main without asking" rule); Peter merges on green or explicitly delegates merge-on-green.
3. The tooling SHALL work with the credential setup actually present on the dev machine (`gh` authenticated via the `.env` token or equivalent); WHEN credentials are missing THEN it SHALL fail with an actionable message, not fall back to direct push.
4. The release flow (`release:run`, npm publish steps) SHALL be reconciled with branch protection (version-bump commits and `postpublish` token-index pushes must traverse the gate or be explicitly exempted — reviewer decision point).

## Requirement 5 — Bake-in gate between Phase 0 and Phase 1a

**Acceptance criteria**:
1. Phase 1a tasks SHALL NOT begin until ≥5 working days of ordinary task work have flowed through the gate.
2. Ergonomics findings during bake-in SHALL be logged in this spec and resolved or explicitly accepted before Phase 1a.

## Requirement 6 — Phase 1a arms the wholesale mechanical check set

**Acceptance criteria**:
1. The following SHALL each become required, blocking checks: full-project typecheck (`tsc --noEmit`), `build:validate`, the full root functional suite (`npm test`), and the two MCP sub-package suites (`mcp-server`, `application-mcp-server`).
2. WHEN any lane fails THEN merge SHALL be blocked; there SHALL be no warn-only lanes in this set (warn→fail promotions of *assertions* remain 125-B).
3. BEFORE promotion to required, cold-cache CI timing for each lane SHALL be measured and recorded; IF the total gate time exceeds ~10 minutes THEN promotion SHALL pause for Peter's explicit acceptance of the latency.

## Requirement 7 — Armed means verified non-empty AND correct scope

**User story**: As the steward of the 2026-07-03 empty-lane lesson, I want every armed lane to prove it ran the intended selection, so an empty or mis-scoped green can never read as a pass.

**Acceptance criteria**:
1. Each armed test lane SHALL assert a selection floor (e.g., `--listTests` count ≥ a recorded floor) and fail loud if under it.
2. Each armed lane SHALL run from an explicit working directory and config (no inherited-cwd ambiguity).
3. Each floor guard SHALL have a prove-it-bites verification recorded (artificially empty selection → lane fails) before the lane is trusted.

## Requirement 8 — CI chore rider

**Acceptance criteria**:
1. WHILE touching the workflows, `actions/checkout` and `actions/setup-node` SHALL be bumped past the Node-20 deprecation warnings.

## Requirement 9 — Negative scope holds

**Acceptance criteria**:
1. This spec SHALL NOT add new lint rules, warn→fail assertion promotions, CODEOWNERS/required-review, classification-map content, or consumer-side enforcement. WHEN such work is discovered mid-execution THEN it SHALL be routed to 125-B or 123 via inbound note, not absorbed.

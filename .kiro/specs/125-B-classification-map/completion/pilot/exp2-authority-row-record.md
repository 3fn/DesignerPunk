# Experiment 2 — Authority-Row Resolution (Evidence Record)

**Date**: 2026-07-14
**Task**: 125-B Task 1.3 | **Traces**: Reqs 3.1–3.4; Design C1, C2
**Rule under resolution**: *"governance-law changes require Peter's ratification"* (+ its agent-facing form, the verify-the-record rule)
**Register entry produced**: `governance/classification-map.md § "record-first-ratification"`
**Method**: every surface claim below verified against the live file this session (2026-07-14, branch `task/125-B-u1-s`); enumeration by repo-wide search (`record-first`, `verify the committed ballot`, `requires Peter's ratification`), NOT by trusting the design's list.

---

## 1. Surface Enumeration (Req 3.1)

**Operative surfaces (carry the rule as live guidance/definition):**

| # | Surface | Location (verified) | Role |
|---|---------|---------------------|------|
| S1 | Ballots README | `.kiro/docs/ballots/README.md` — § "The Ratification Protocol (record-first) — approved by Peter, 2026-07-05" (:16); protocol steps :20–:22 | THE protocol definition (layer 1). Defines the record-check mechanics: record-first commit of `RATIFIED` status (:20); the applying agent's one mechanical fact (:21); report-if-missing, symmetric failure-modes note (:22) |
| S2 | Canonical catalog statement | `canonical/shared/shared-catalog.yaml` — member `record-first-ratification` (:30–:58); `statement:` at :33–:38; `source:` cites S1; `crossRef` currently interim → ballots README (`crossRefStatus: interim`, :53) | The rule's SINGLE canonical statement (stated once, owner: thurgood) — 122's propagation source |
| S3 | Task-Completion-Protocol | `.kiro/steering/Task-Completion-Protocol.md` — :93 ("A checks-only merge is NOT ratification… record-first ballot protocol… PR-approval-as-ratification arrives with 125-B's CODEOWNERS layer"); :125 ("delegation of merge-on-green must be a recorded rule… authority is a record"); :126 (the standing carve-out — governance-law paths stay Peter-merged); :153 (Key Rules restatement) | Always-loaded operational law: teaches the gate-verifies-mechanics-not-authority boundary + the carve-out that stands in for the barrier until U3 |
| S4 | Generated agent prompts (16 surfaces, one source) | All 8 `.claude/agents/*.md` + all 8 `.kiro/agents/*-prompt.md` — verified: the S2 statement propagates VERBATIM (sample: `.claude/agents/ada.md:420`; Kiro-side count: 8/8 files match) | The agent-facing what+why, delivered per-agent via 122's generator; auto-regen keeps them slaved to S2 |

**Enumerated and excluded as non-operative** (found by search, consciously not counted as rule surfaces):
- `.claude/worktrees/**` copies — stale worktree duplicates of S1/S3 and spec docs, not independent surfaces.
- `canonical/_fixture-output/**` — generator test fixtures.
- Individual ballot files (`.kiro/docs/ballots/2026-07-*.md`) — *instances* of ratification records, not statements of the rule.
- Spec-history docs (122's design/requirements/tasks/completions, 119-B's deferred obligations, 125's own docs) — records of how the rule came to be, not operative guidance surfaces.
- `CLAUDE.md` — carries S3 by `@`-import (a delivery vehicle for S3, not a distinct statement).

## 2. Per-Scope Verification Owners (Req 3.2 — the settled split, recorded)

| Scope | Disposition | Check state | Owner | Ground |
|-------|-------------|-------------|-------|--------|
| Gated surfaces (`governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, agent prompts/configs) | **barrier** (PR-approval-as-ratification: branch protection + CODEOWNERS → Peter) | **proposed** — U3 delivers; until then the S3:126 standing carve-out is the operative proxy (Peter-merges these paths) | thurgood (Peter executes the platform settings) | Req 13; design C9 |
| Ungated artifacts (outside the gate's reach) | **record-check** (committed ballot status) | **armed** — IN FORCE since 2026-07-05, as a PROCEDURAL agent-performed check, NOT a CI lane (see § 5, enum-fit note) | thurgood | S1 :20–:22; ratified authority row (outline §3.1, requirements Req 3) |

## 3. Per-Surface Education Assessments (Req 3.2 — two-blade verdicts, recorded)

| Surface | Blade 1 (teaches how/why vs. restates a gate's what?) | Blade 2 (churn-rate fit?) | Verdict |
|---------|--------------------------------------------------------|---------------------------|---------|
| S1 ballots README | TEACHES: the protocol's mechanics AND its why (:22's symmetric-failure-modes rationale is genuine education). No CI gate exists for it to impersonate — it defines the procedural check itself | Stable protocol definition in a durable home — fits | **KEEP** |
| S2 catalog statement | The DRY canonical source — data, not prose; stating-once is the anti-drift mechanism itself | Single-owner statement; regen keeps consumers fresh — the churn-rate architecture working as designed | **KEEP** |
| S3 Task-Completion-Protocol | TEACHES the boundary (gate verifies mechanics, never authority; delegation needs a record) + carries the operative carve-out — operational law, not a nag; no armed check owns what it states | Stable law in the always-loaded home — fits; :93 self-describes its own supersession point ("arrives with 125-B's CODEOWNERS layer"), which is churn-awareness, not churn-mismatch | **KEEP** |
| S4 generated prompts (×16) | Carries the agent-facing WHAT + WHY. **Not an imposter**: no CI barrier exists today for it to duplicate — for ungated artifacts this text IS the operative verification instruction (the procedural record-check) | Slaved to S2 via auto-regen — cannot drift by construction | **KEEP** — with a recorded RE-ASSESS trigger: when U3 arms the barrier for gated surfaces, the what-half's scope narrows (the record-check remains operative for ungated artifacts) |

**No surface was assessed an imposter. Zero prune actions arise from this row** — which is itself a finding: the authority row is a coexistence-by-design case (canonical statement + propagation + law + protocol), exactly what the realigned methodology predicts for a healthy multi-surface rule.

## 4. Contradiction Scan (Req 3.2)

Pairwise across S1–S4 on the three load-bearing claims:

| Claim | S1 | S2 | S3 | S4 | Verdict |
|-------|----|----|----|----|---------|
| Record-first is the ratification mechanism NOW (layer 1 in force) | :20–:22 | statement + source | :93, :153 | verbatim S2 | **CONSISTENT** |
| The gate/merge does NOT confer authority today; the barrier (layer 2) is FUTURE (125-B U3) | (silent — protocol scope) | (silent) | :93 explicitly | (silent) | **CONSISTENT** (no surface claims a live barrier) |
| Relay handling: verify the record; report-if-missing; never trust-or-refuse on relay alone | :21–:22 | :33–:38 | :125 (authority is a record) | verbatim S2 | **CONSISTENT** |

**No contradictions. No surface pretends to BE the enforcement** (none claims a CI gate enforces authority today; S3 explicitly disclaims it at :93). The one *interim* artifact is S2's crossRef (`crossRefStatus: interim`, catalog :53) — a marked, machine-readable interim by design, resolved by Task 1.5, not a contradiction.

## 5. The 122-Coordination Deliverable (Req 3.3 — DISCHARGED)

- **Canonical source located**: `canonical/shared/shared-catalog.yaml` member `record-first-ratification` (:30–:58) — the rule is stated ONCE there with a single named owner (thurgood), per 122 Req 13/DD13's design.
- **Agreement by construction CONFIRMED**: the S2 statement propagates verbatim into all 16 generated prompt surfaces (sample verified `.claude/agents/ada.md:420`; all 8 Kiro prompts grep-match). The register entry does not restate the rule in competing words — its `rule:` line is a one-line summary that CITES the same source chain (entry → catalog → ballots README), and its education disposition names S2 as the single statement. No divergent wording was authored; **no canonical-source edit or regeneration is needed** (the edit+regen fix path was not triggered).
- **Follow-up (Task 1.5, not this task)**: the catalog's interim crossRef re-points at this entry; the entry's `crossRef:` field already carries the reciprocal half (`canonical/shared/shared-catalog.yaml#record-first-ratification`) — authored now because it is true independently of when the forward ref re-points.

**Pilot finding worth carrying to the closeout (register-schema enum fit):** the ungated scope's record-check is IN FORCE but is a *procedural agent-performed* check, not a CI lane — `check_state: armed` is used with the check named explicitly as procedural. If U1b's waves surface more procedural-check rows, the closeout should consider whether the check-state enum wants a `procedural`/`in-force` distinction; recorded here rather than silently stretching the enum.

## 6. What the Register Row Records

`governance/classification-map.md § "record-first-ratification"` — boundary call **operational** (scoped rationale); verification **scoped** (barrier/proposed for gated surfaces; record-check/armed-procedural for ungated); education **KEEP all surfaces, zero prunes, one re-assess trigger at U3 arming**; reciprocal crossRef to the catalog; history dated + attributed to this experiment with this record as evidence.

*A future reader can audit this resolution from this record alone: every claim carries a path + line reference verified 2026-07-14.*

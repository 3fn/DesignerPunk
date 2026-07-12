# Inbound: Spec 122 Coordination + Session Findings → Spec 125 (Phase 0/1)

**Date**: 2026-07-05
**Source**: Spec 122 design-outline feedback rounds (R1/R2 + Stacy native) + the 122↔125 sequencing discussion (Peter + Claude)
**Status**: One decided sequencing fact; the rest is coordination requirements and empirics for Phase 0/1 formalization.

> **DISPOSITION (2026-07-11): MOSTLY CONSUMED.** §1 sequencing ("125 before 122") happened; §3
> protocol-rewrite-by-hand done in 125-A; §5 self-merge ergonomics adopted; §6 is informational evidence.
> Still-live pieces are carried in `125-B-backlog.md`: §2 tool-boot smoke → backlog item 3; §4 prune-with-arm
> → backlog item 1. Read the backlog, not this note, for open 125-B work.

---

## 1. Sequencing DECIDED (Peter, 2026-07-05): 125 Phase 0 lands BEFORE 122 starts

Consequence for Phase 0's design: **the required-check set must be extensible without redesign**, because 122 will register checks onto the gate as it builds. Known future registrants from 122's outline:
- the **regenerate-and-diff guard** (122 §3 — its central "loud CI failure" claim presupposes this gate; without Phase 0 it is authored-but-unarmed by 125's own taxonomy),
- the **canonical-vs-truth check** (122 §3a mitigation 2),
- the **seven §8 input-fidelity sweeps** (122 §8 — designed to "run mechanically in the pipeline's own CI"),
- the **tool-boot smoke** (see #2).

Phase 0 doesn't build any of these — it builds the gate they later plug into. Naming them now prevents a required-check architecture that assumes a closed check set.

**Sequencing benefit worth banking:** because Phase 0 lands first, 122's first-generation cutover (§3b one-way ratchet) will ratchet in the *post-Phase-0* PR-flow protocol — not the stale direct-commit flow — the same way 13.0.0 became the published cutover baseline. Doing it in this order means 122 never generates the old workflow.

## 2. The tool-boot smoke — a designed 122→125 handoff (from Peter's Q5)

Peter asked whether we should test that every aggregated tool actually works (motivated by live finds: empty Product MCP, the phantom-route class). The resolved split:
- **122 enumerates** — the master tool registry (declaration-keyed, index-agnostic) is the manifest of what to smoke.
- **125 arms** — a CI smoke asserting each registry tool is **declared and responds without error** to a cheap call. Extends the existing `consumer-guard.yml` MCP boot-smoke precedent (which ran green on first exercise 2026-07-05).
- **Calibration guard (Stacy, 122 feedback):** assert *declared + responds*, **never** *returns data*. A declared-but-index-empty tool (Product MCP in this repo: `get_product_health` → `indexed:false`) is expected and correct; asserting data would false-positive every Product-MCP tool here. Same keying rule as 122's §8 sweep 6.

## 3. Phase 0's protocol rewrite propagates BY HAND pre-122 — the touched surfaces, enumerated

The Task-Completion-Protocol rewrite (direct `commit-task.sh` → branch/PR/merge) hits hand-maintained surfaces that 122 would later generate but which do not exist as generated outputs yet. Grep-verified 2026-07-05 (`commit-task` references):
- **Always-loaded steering (reaches every agent via Kiro injection + the `CLAUDE.md` import):** `.kiro/steering/Task-Completion-Protocol.md`, `.kiro/steering/core-goals.md`.
- **Governance corpus (MCP-served):** `Component-Development-Standards.md`, `Process-Development-Workflow.md`, `Process-File-Organization.md`, `Process-Spec-Planning.md`, `completion-documentation-guide.md`, `release-management-system.md`.
- **Hooks:** `commit-task.sh` itself + `README.md` + `analyze-after-commit-README.md` (note: commit-task.sh runs release analysis — the PR flow must decide where that moves, e.g. at merge).

Agent prompts (`.kiro/agents/`, `.claude/agents/`) carry **no** direct commit-task references — the protocol reaches them via the always-layer, so the two steering docs are the load-bearing edits. All 11 surfaces must move **together** (a half-migrated corpus tells agents two different completion flows — exactly the cross-surface inconsistency Thurgood's stewardship exists to catch; loop him in on the sweep).

## 4. Prune-with-arm applies to Phase 0 itself — the first classification-map entries

125 §5's pruning obligation, applied reflexively: once the gate *runs* `npm test`/`tsc` as required checks, the protocol prose that says "run npm test before marking complete" shifts from **instruction (what)** to **context (why/when)** — the barrier owns the what. Phase 0's protocol rewrite should make that split deliberately and record it as the classification map's first concrete entries, rather than leaving the old imperative prose to coexist with the gate (the OB-7 coexistence anti-pattern 125 §5 already names).

## 5. Solo-dev PR ergonomics (recommendation, feeds §9's open question)

From the sequencing discussion: in a solo repo the gate's value is the **required-check set, not code review** — there is no second human. Expected ergonomic: **self-merge on green checks**, with agents opening branches/PRs instead of committing to main (existing rule "never push without asking" composes cleanly: agents open the PR; Peter merges — or delegates merge-on-green explicitly). Peter owns the final call (125 §7).

## 6. Empirical support for §5's honesty guard: the `.web.tsx` 9-vs-2 datapoint

The 122 feedback round's hand-verified list said the `.web.tsx` defect existed at **2** sites; the mechanical sweep found **9** across 5 files (`3dd50f94`). Hand enumeration undercounted 4.5× on a defect actively being watched. Direct evidence for 125's own principle that checks must be mechanical/exhaustive, and for defaulting rules to "barrier" only after confirming the check actually sweeps the full surface ("armed = verified non-empty AND correct scope," per the lane-viability inbound).

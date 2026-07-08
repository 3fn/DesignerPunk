# Inbound to Spec 122 — Orchestration Model Selection

**From**: `.kiro/docs/ballots/2026-07-07-orchestration-model-tiering.md` (governance-law ballot)
**Date**: 2026-07-07
**Status**: coordination note — **no 122 artifact change is requested**. A design constraint + one optional enhancement.

## What the ballot settles

The model tier is chosen **per task at delegation time, not per agent**. Agents carry **no default tier**: a generated subagent definition **omits `model:`** and inherits the session model. The policy lives in `governance/Process-Orchestration-Model-Selection.md`; the per-task recommendation rides `tasks.md` `**Agent**:` (`<agent> (<Model>)`).

## Constraint for the generator (light)

- Generated `.claude/agents/*.md` **do not emit a per-agent `model:`** — no per-agent tier table, nothing to duplicate from the policy, nothing to recalibrate as the lineup shifts. This is the *opposite* of adding a schema field: the C1 canonical schema needs **no** tier field. (As of the RATIFIED 122 design, C1 carries no `model`/tier field and no CC-native block analogous to `kiro:` — leave it that way for tiering.)

## Load-bearing dependency (MUST-CARRY)

The policy's **primary enforcement surface is the always-loaded cue** in `.kiro/steering/start-up-tasks.md` (item 6, "Model-tier calibration"). Today that reaches every agent only via the `CLAUDE.md` `@`-import — the OB-7 interim stopgap 122 is chartered to retire/supersede. **When 122 replaces the CLAUDE.md always-layer, it MUST carry that calibration cue into whatever always-layer supersedes it** (shared always-set / generated ambient). If the cutover drops it, the spine silently vanishes and only the spec-backup + verify-net remain — a silent degradation of the exact failure the policy exists to prevent. This is a must-carry, not optional; the "loud-not-silent inherit" below only *partially* substitutes.

## Optional enhancement (non-binding — 122's call)

- Inherit is silent: under a top-tier session, an un-specified subagent runs top-tier (this over-spent on 2026-07-06). If 122 or the harness can surface the inherited tier at spawn — a **loud-not-silent** inherit — that closes the footgun without reintroducing a per-agent default. Flagged as the one place 122 could add mechanical value; not required.

## If 122 diverges

If a future 122 decision introduces a per-agent tier mechanism after all, update the policy doc's "The default: inherit the session model" section to match. No schema edit is requested by this ballot.

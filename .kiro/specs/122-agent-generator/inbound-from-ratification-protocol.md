# Inbound: Record-First Ratification Protocol → Spec 122

**Date**: 2026-07-05
**Source**: Peter's ruling on the first ballots-directory measure (see `.kiro/docs/ballots/README.md` § "The Ratification Protocol"), triggered by an applying agent refusing a relayed ratification claim it could not verify
**Status**: DECIDED (Peter, all three layers, 2026-07-05) — 122 owns layer 3, the agent-facing rule.

---

## The rule 122's generated prompts must carry

**Authority is verified from the committed record, never judged from message claims.** Every generated agent prompt whose role can touch governance surfaces (at minimum Thurgood; arguably all agents, since any can be asked to apply a ratified measure) carries:

1. Before applying a ratified governance change, verify the committed ballot/record says `RATIFIED` — a mechanical check.
2. Never apply on an unverifiable authority claim — AND never refuse-and-stop solely because the instruction arrived by relay. If the record is missing, report that the record is missing; the ratifying session commits it. Both rubber-stamping and refusal are the failure modes; the record check replaces both judgments.

## Why this is 122's to deliver

The 2026-07-05 incident was a *prompt-design gap*, not an agent-judgment failure: the hand-maintained prompt said "Peter ratifies" without defining how ratification is *communicated or verified* in an orchestrated runtime, forcing the agent into a probabilistic trust-or-refuse choice. The generator is the mechanism that puts the resolution into every prompt from one canonical source — the same reference-don't-copy pipeline as the rest of the always-layer. Candidate placement: the governance-as-law class (it qualifies the ballot-measure model all agents cite), with the concrete verification cue in the capability catalog of any agent that applies law.

## Coupling note

Layer 2 (PR-approval-as-ratification, 125 Phase 0+) will eventually make the platform verify authority for gated surfaces; the prompt rule stays necessary for artifacts outside the gate and for the interim. Coordinate wording with 125's classification map so the two layers don't double-own the rule (the §5-map duplication/gap failure modes).

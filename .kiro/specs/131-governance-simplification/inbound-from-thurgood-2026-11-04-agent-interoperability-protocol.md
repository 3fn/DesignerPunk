# Inbound from Thurgood: the 2026-03-07 agent interoperability outline, carried into 131 as a consideration

**Date**: 2026-11-04
**Author**: Thurgood (owner of the source outline, and Spec 131's formalizer), at Peter's direction.
**Peter's words**: chat, relayed by the orchestrator, 2026-11-04T13:23:25Z, verbatim: *"2. Let's create an inbound regarding the protocol for 131"* and *"4. We can use the inbounds as considerations for our approach rather than direction. They might inform our thinking and direction, but they were developed without the context of where we are now."*
**Status of 131**: design outline merged, paused at the edge of requirements (`design-outline.md`). This note rules nothing.
**Consulted**: none needed. An inbound records a consideration and rules none.

---

## What this is

**A consideration, not direction** (Peter, item 4 above). The source outline was written 2026-03-07, before the orchestrator role, the generator (Spec 122), the PR gate (125-A), the committed inbound, feedback and issue-record habit, and the current eight-seat roster. Read it as an earlier author's thinking about a problem 131 may or may not still have.

## The source

`.kiro/specs/XXX-agent-interoperability-protocol/design-outline.md` (the directory stays where it is; PR #644's triage closes it as an outline). It names three problems under "Problem Statement", and I do not restate its text:

1. Peter is the bottleneck for every cross-agent handoff.
2. Context is lossy when a human summarizes one agent's finding for another.
3. Handoffs leave no record of what was requested, delivered or pending.

Its answer was agent cards, a filesystem task-handoff format and, later, A2A transport. None was built.

## What has since been answered (checked at base `9819f72ee`)

- **Who coordinates.** The orchestrator role: `.kiro/steering/Agent-Directory.md` § "Primary Agent (Orchestrator)" (it briefs owners, consults them before recommending, and leaves a `**Consulted**:` record). Problem 1 is moved off Peter in part; it is not removed, because the orchestrator relays.
- **Lossy relay and untraceability, partly.** Findings and requests now travel as committed files, not only chat: inbounds (48 `inbound*` files under `.kiro/specs/*/`, and four others in this directory), per-phase feedback docs (58 `feedback*` paths under specs), and root records in `.kiro/issues/` that carry an `**Owner**` and a `**Trigger**` (`.kiro/issues/README.md` rules 1, 9, 10). Rule 10 files the obligation in the same PR as the ruling.
- **A machine-readable "who hands to whom".** Each canonical charter carries `routes.agents` entries (`target`, `when`, `disposition`), for example `canonical/agents/ada.md` L142–148. That is a thin version of the outline's agent cards, generated into every harness by Spec 122.
- **Not answered, or not verified.** I did not verify how often a briefed seat's context is lost in an orchestrator brief: briefs are not committed under a fixed path that I could find, so that part of problem 2 is **unverified**. Nothing records a pending cross-seat request unless someone filed it.

## What is still open (a question for 131's rounds, not an answer)

**Can one seat hand work to another seat directly, with a record, without Peter or the orchestrator relaying it?** Today a seat's only route is a message that the orchestrator or Peter carries, or a committed file that someone then points the next seat at. 131's thinning goal may say this question is out of scope, or that the existing inbound and issue-record machinery already is the answer. Both are defensible. 131 would be the one to rule, not this note.

## One constraint to carry (the orchestrator's note, not Peter's words)

Autonomy must rest on non-model oracles: a handoff is proven by something git or CI can check (a committed file, a check that runs), never by one agent attesting another's act. This is the same line 131 already holds, from Peter's aim (`design-outline.md` § 1, and `synthesis-2026-10-23.md`, which quotes it) and the "derivation over attestation" principle of `design-outline.md` § 5. Any answer to the open question should clear it.

## Asked of the round that opens 131's next phase (the orchestrator's suggestion)

Write one disposition line for this inbound in that round's feedback entry: what it took, what it left, and why.

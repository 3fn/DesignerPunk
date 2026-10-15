# Task 27 Summary: Re-grounding conformance (24.1 two-beat) (U5)

**Date**: 2026-10-15
**Purpose**: Concise summary of Task 27 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

- **One conformance run** on Claude Code, in a fresh clone of the Claude Code-born `order-status` fixture, from two frozen prompts committed before any session (`404cc4a13`). Peter launched every session from macOS Terminal.
- **Identity probes** (fresh sessions, before the beats): consumer-Thurgood and consumer-Stacy each named their job, one DesignerPunk tool from their routes, and one thing outside their scope. All three answers matched their rendered charters (`.claude/agents/thurgood.md`, `stacy.md`) for both agents.
- **Beat 1**: consumer-Thurgood worked the shipped re-grounding starter spec, tasks 1–5.
  - He re-pointed 26 charter items, each with one of the spec's three dispositions and a reason.
  - He wrote `specs/README.md` and **formalized a real spec**, `specs/001-order-status-page/` (outline, feedback, requirements, design, tasks).
  - He wrote a report closing "I can do my job here".
  - The bar: **formalized: yes**. No generated agent file was edited.
- **Beat 2**, strictly after beat 1 in the same repo: consumer-Stacy did the spec's task 6.
  - She opened 30 of 30 claims: 24 verified, 2 false or inaccurate, 1 approval set claimed but not shipped, 3 not checked.
  - She wrote her pass under her own heading, marked it "Never a gate", with a Standards-implications line.
- **The 24.3 labelling**: the acceptance table lists (v)'s mechanical half as deterministic **only because** G2 returned PASSES (pass four) and HOLDS (cycle 2), and **only for the named domains**. Each row is scoped to the cycle-2 attack set. Req 24.5's honest posture is stated: guarded non-deterministically, per release, by a sampling instrument.

## What It Found

- `Button-CTA` declares a loading-state contract its web implementation does not have (Lina).
- The docs MCP's `get_section` splits fenced templates (Thurgood).
- A served spec-planning doc binds a consumer to a parser the package itself says it removed (Thurgood).
- Stacy's owed-set query assumes a path the consumer scaffold does not create (Thurgood).
- In the consumer's own spec, a heading-token choice rested on a false premise about the generated CSS (Stacy caught it).

## Residuals

- **The Kiro renderings of Thurgood and Stacy are unexercised by 24.1.** This exits through Task 28's obligation set if Thurgood judges it one.
- **The approvals were given in advance**, because a headless session cannot ask.
- **Only Thurgood was told to commit**, so Stacy's pass is uncommitted in the consumer repo.
- **One sample**: re-running per release is Task 28.4's obligation.

## Related

- Completion: `.kiro/specs/123-consumer-distribution/completion/task-27-completion.md`
- Records: `.kiro/specs/123-consumer-distribution/validation/conformance-beat-1.md`, `conformance-beat-2.md`

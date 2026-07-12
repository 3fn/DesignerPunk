# Inbound: WordPress-Thesis Strategy → Spec 125

**Date**: 2026-07-04
**Source**: `docs/roadmap/2026-07-04-wordpress-thesis-strategy.md` (Peter + Claude strategy session, post-Astryx-launch + full-project-audit + "loops" discussion)
**Status**: Considerations for formalization — **NOT decisions.** The outline's phasing and right-sizing caveat stand; nothing here expands Phase 0/1's core.

> **DISPOSITION (2026-07-11): MOSTLY SPENT.** §1 sequencing + §2 execution-loop reframing are spent
> (Phase 0/1 shipped in 125-A). Still-live: §3 the autonomy dial → carried as `125-B-backlog.md` item 7
> (ELECTIVE, with its activation trigger intact).

---

## 1. Sequencing: Phase 0/1 pulled forward, before Spec 122 (proposed, strategy-level)

The strategy note proposes 125 Phase 0 (PR flow) + Phase 1 (arm authored checks) land **before 122**, for three compounding reasons: (a) Phase 0's gate is what arms 122's regenerate-and-diff guard (already noted in this spec's outline); (b) a governance-branded product cannot expose itself to external consumers (123) with its own enforcement authored-but-unarmed; (c) it's the smallest-surface/highest-leverage item on the board. **Kill-switch (Peter's Decision Point 4):** if Phase 1 balloons, cut to armed full-typecheck + `build:validate` only and proceed — the threshold is Peter's call at formalization.

## 2. Reframing support (context): 125 is execution-loop signal repair

In the loops taxonomy (Voss, 2026-07), an agent's execution loop is only as good as its environment feedback — and the audit-verified state (tsx strips types unchecked; `build:validate` idle; Stemma contract tests unarmed) means agents currently receive *silence* on wrong actions. This is the Orbit trigger restated: 125 repairs the execution loop's feedback signals. Independent confirmation of the phasing priority; no scope change.

## 3. OPTIONAL FEATURE — the autonomy dial (immediate OR deferred implementation; Peter's election)

**The idea:** today's stop-and-wait-at-every-task-boundary rule (Start Up Tasks #3 / Task Completion Protocol) makes human review do double duty — *judgment* AND *mechanical correctness-checking* — because nothing else checks correctness. Each check Phase 1 arms transfers part of the correctness half to machinery. The autonomy dial is a **documented policy mapping armed checks → autonomy expansions they purchase** — e.g., once full typecheck + `build:validate` + the scoped Stemma lane are required checks, agents may iterate autonomously against the gates *within* a task (subtask boundaries un-gated), with human authorization retained at parent-task boundaries; the oversight loop (goals, budgets, culling) stays human, per the Agent Directory's Peter-decides law.

**Framing constraints (deliberate):**
- **Optional.** This is an elective feature, not part of Phase 0/1's core. Two valid elections: (a) **immediate** — a short policy section written as part of Phase 1 closeout; (b) **deferred** — parked with an activation trigger. Peter elects at formalization or later.
- **Activation trigger if deferred:** revisit at Phase 1 closeout review (when the first checks actually arm) — trigger it like a tracker item so "optional" does not decay into "never."
- **Lightweight by construction:** a policy document/section amending Task-Completion-Protocol scope (which Phase 0 already touches for PR-flow), NOT new machinery. If it needs tooling, it has over-grown its brief.
- **One-way-door caution:** each dial notch should be per-task-class and reversible (a regression that slips an armed gate is evidence to notch back down).

**Counter-argument (recorded):** the dial may be premature at current scale — with one human and armed gates, the stop-and-wait cost may already be tolerable, and the real bottleneck (per even Anthropic's factory team) is human *conceptualization*, which the completion/summary-doc system addresses, not gate friction. If Phase 1 lands and stop-and-wait doesn't chafe, defer indefinitely.

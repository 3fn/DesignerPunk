---
id: process-orchestration-model-selection
inclusion: manual
name: Process-Orchestration-Model-Selection
description: How an orchestrating agent picks a model tier for delegated subagent work — match the tier to the task's cognitive demand (decide vs. implement) weighted by blast radius, default to inheriting the session model, and always independently verify subagent output. Load when delegating work to subagents or deciding which model a subagent should run.
---

# Orchestration Model Selection

**Date**: 2026-07-07
**Last Reviewed**: 2026-07-09
**Purpose**: How an orchestrating agent chooses the model tier for delegated subagent work, and why verification — not the tier — is the guardrail (content AND placement)
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: agent-architecture, general-task-execution

---

## The Policy (one sentence)

**Match the model tier to the task's cognitive demand — *decide* vs. *implement*, weighted by *blast radius* — default to inheriting the session model, and always independently verify subagent output. Delegate-then-verify is the guardrail, not the tier.**

## The Axis: decide vs. implement

The question is never "is this a subagent?" It is "what cognition does this task demand?"

- **Implement** — carry out an already-settled design, contract, or spec: component/token/test authoring against a fixed model, scripted or mechanical multi-file sweeps with a defined pattern, ports/transcriptions, measurements and probes, applying a ratified ballot. The hard calls are made; the work is faithful execution.
- **Decide** — produce architecture, make a consequential or hard-to-reverse call, weigh cross-cutting tradeoffs, or reason through multiple failure modes: spec design and review rounds, ballot drafting, incorporation/adjudication passes, choosing a system boundary or a new cross-component contract.

**Weight by blast radius.** A wrong *implementation* detail is usually local and cheap to fix under verification. A wrong *architectural* call propagates and is costly to unwind — that is exactly where marginal model capability earns its cost, and exactly the wrong place to chase savings.

## The tiering rule

- **Implement against a settled design/contract/spec → the cheaper capable tier** (currently Sonnet). Bias toward it for concrete work: on Spec 121 the cheaper tier was *diligent*, not merely adequate — it caught real edge cases (a comma-tokenizer bug, an empty-owner schema gap, a latent import-time side effect) rather than silently papering over them.
- **Decide → the higher tier** (currently Opus).
- **The main orchestration loop stays top-tier.** Synthesis, cross-checking subagent output, and human-facing judgment are the highest-leverage cognition in the session; do not downgrade the loop that verifies everything else.

## The default: inherit the session model

When the orchestrator does not specify a tier, a subagent **inherits the session model**. Agents carry **no per-agent default tier** — the tier is a property of the *task*, chosen at delegation, not a fixed attribute of the agent (the same agent does implement-work on one task and decide-work on another).

Inherit is the right default because it **fails expensive, not wrong**: forgetting to specify runs the task at the orchestrator's own tier — over-provisioned for cheap work (a *cost* failure: visible in spend and session limits, self-correcting) rather than under-powered for consequential work (a *quality* failure: silent, shipped). But inherit is **silent in both directions**, so it is only safe alongside the always-visible calibration rule:

- **Calibrate bidirectionally relative to the session model** — *downgrade* for implementation, *upgrade* for a decide task. Do not assume inherit is safe because the session is usually top-tier: under a cheaper session, a forgotten decide task would silently under-power.
- Omitting the tier is a decision, not a non-decision. Make it consciously.

## The real guardrail: delegate-then-verify

**The safety mechanism is independent verification by the main loop, NOT the model tier.** Every subagent's output is re-checked before it is trusted: re-run the relevant tests and type-check, read the actual diff, spot-check against the contract. That review layer is what catches problems — including from capable tiers (a subagent once wrote a contrast *ratio* into a field expecting a color *value*; the main-loop review caught it, not the tier). The rule holds regardless of which tier ran the work: a higher tier is never a substitute for verifying; a cheaper tier under verification is safe *because* it is verified.

**Verification covers placement, not just content.** When you delegate a **file edit**, the check is two-part: the content is correct AND the edit landed **where you intended** — in the intended working tree, on the intended branch. A subagent can silently act on a *different* working tree than you meant and report success anyway, because relative paths resolve from *its* working directory, not yours. Defend against it on both ends: **hand the subagent absolute paths to the intended tree** when you delegate, and **after it reports done, confirm the change is where you expect** (`git status`/`git diff` in the intended tree, or read the file at its absolute path) before you trust or commit it. This extends the content-verification rule above to *placement*; a "done" report is a claim about content, never a guarantee about location.

- **Claude Code symptom (harness-specific).** CC nests worktrees *inside* the repo (`.claude/worktrees/<name>/`), so upward path or module resolution from a subagent (`../../../`) can cross the worktree boundary into the **parent repo** — a delegated edit lands on the parent-repo copy instead of the worktree branch, esbuild reads the parent's `package.json`, etc. Observed 3× in one session. The placement check above is the mitigation; the durable fix is upstream (place worktrees as *siblings* of the repo, not nested — a Claude Code harness-behavior request), which this guardrail does not own. Other harnesses carry this symptom note only if they reproduce the nesting condition.

## Escalation, not default-when-unsure

The higher tier is an **escalation with a concrete trigger**, not a fallback for uncertainty. Reflexively reaching for it "to be safe" quietly gives back the cost savings without a proven need. Escalate on a concrete signal — the task requires *choosing between non-obvious tradeoffs* or *reasoning through multiple failure modes* — not on a vague sense that the work is important.

## The load-bearing qualifier

The way to keep delegated work in the cheaper tier is to **front-load the architecture into the spec** so the subagent *implements a decided design*. Across Spec 121 the cheaper tier was safe because the hard calls were made in the requirements/design phase *before* any subagent ran (one task was typed "Architecture," yet its decisions were already settled in the spec — implementation in practice). The corollary is the trigger: **if a subagent must *make* the architectural call** — an open module-resolution strategy, a new cross-MCP contract, a system boundary — **that is the higher tier regardless of it being "a subagent."** Task **Type** is a *prior, not the answer*: an Architecture-typed task whose design is genuinely settled implements at the cheaper tier, and an Implementation-typed task that still requires a consequential call is a decide task — confirm the design is actually settled before downgrading, rather than reading the tier off the Type label.

## Recording the tier per task (spec-driven work)

Spec-driven work has a natural place to pre-record the judgment: the task's `**Agent**:` metadata in `tasks.md`, set at formalization, when the author knows whether the architecture is settled. Format: `**Agent**: <agent> (<Model>)` (e.g. `Thurgood (Sonnet)`; cross-domain `Agent A (Model) + Agent B (Model)`) — the model rides the *task*, so the same agent may carry different models on different tasks. The recorded model is **advisory as of authoring**: the executing orchestrator re-checks it against the current model lineup (delegate-then-verify is the net). It jumpstarts calibration even if this policy is not loaded — the concrete name is actionable without the policy's vocabulary. See `Process-Spec-Planning.md` § "Agent Assignment" for the field rule. This is a *reinforcement* for spec work, not a replacement for the always-visible rule, which covers all orchestration.

## Why the tier matters (cost rationale)

Capability tiers are priced differently (higher tier ≈ higher $/token on both input and output; ordering as of 2026-07: Opus > Sonnet > Haiku). Two consequences: a *minor-version* downgrade within a tier saves nothing (same price) — the real lever is **tier**, not version; and running a cheaper *subagent* tier than the orchestrator also **preserves the main-loop prompt cache**, whereas switching the *main* model mid-conversation would invalidate it.

## Still calibrating (this section is expected to move)

The concrete tier assignments track the current model lineup and **will change** as models change. Recalibration lands *here*, not in the policy above.

- Current mapping (set 2026-07-06/07, Fable-era): **Sonnet** = implementation against settled specs; **Opus** = the decide tier (design, review, adjudication, ballot drafting); **Fable** = the main orchestration loop only.
- Treat specific tier *names* as the current instantiation of the *policy*, not as the policy. When the lineup shifts, re-map the names; the decide-vs-implement axis and delegate-then-verify guardrail are the stable parts.

## Per-harness field mechanics (mechanics, not policy)

*How* an orchestrator selects a tier is harness-specific; the policy above is not.

- **Claude Code**: the subagent's `model:` frontmatter (or the Agent-tool `model` param) accepts a tier alias (`sonnet` / `opus` / `haiku` / `fable`), a full model ID, or `inherit`. **Omitting it means `inherit` — the session's current model.** Under a top-tier session, omission silently runs every subagent top-tier; set `model:` explicitly for cheaper work. Generated agent definitions carry **no** `model:` — they inherit by design; the tier is chosen per invocation.
- **Kiro**: model-selection mechanism may differ and is not characterized here. Document it when a Kiro orchestrator needs it; the policy is identical across harnesses.

## MCP Query

```
get_document_full({ path: "process-orchestration-model-selection" })
get_section({ path: "process-orchestration-model-selection", heading: "The tiering rule" })
get_section({ path: "process-orchestration-model-selection", heading: "The default: inherit the session model" })
```

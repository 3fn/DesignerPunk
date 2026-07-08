# Ballot Measure: Orchestration Model Selection (canonize "right model for the right task")

**Date**: 2026-07-07
**Status**: `RATIFIED (Peter, 2026-07-08)` — approved by Peter after R1 + Thurgood R2 (CONFIRM-WITH-TWEAKS) incorporated. Application (Item 6) proceeds on this branch → Peter-merged PR.
**Author**: Claude Code (main loop), at Peter's request (2026-07-07)
**Reviewers**: Stacy (process quality / accuracy), Thurgood (Civitas steward / governance-doc infrastructure + content-consistency)
**Review Round 1**: Stacy APPROVE-WITH-AMENDMENTS · Thurgood APPROVE-WITH-AMENDMENTS · all amendments incorporated, all open questions resolved
**Ratifier**: Peter
**Class**: governance-law addition — one net-new Civitas process standard, two edits to existing law (one always-loaded steering doc, one spec-process standard), and one Spec 122 coordination handoff. Peter-merged per the standing governance-law carve-out.

---

## The Problem

The "right model for the right task" orchestration practice — match a delegated subagent's model tier to the task's cognitive demand, and always independently verify its output — currently exists **only in an agent's private memory** (`subagent-model-tiers.md`, validated across Spec 121, amended 2026-07-06 for the Fable era). Private agent memory is not project governance:

- It is not MCP-served, so no orchestrator can discover it via `find_docs`.
- It is not reviewable or ratified — it is one session's accumulated judgment, not a shared standard.
- It has already cost real money while unwritten: the 125-A / 122-formalization session ran **every** subagent at top tier by default (omitting `model:` under a Fable session silently inherits Fable), and hit a session limit mid-draft as a direct consequence (audited 2026-07-06). A discoverable, always-visible rule is the mechanism that prevents that silent-inherit trap.

Peter asked (2026-07-07) whether to canonize this as governance. Decided direction: **yes**, as its own lean record-first ballot — not baked in ad hoc, and guarded against sprawl.

## Design Summary — one control point, three layers, one net, one feedback loop

Converged with Peter across 2026-07-07. The tier is chosen at **one control point — the delegation moment — per task, not per agent.** Around that:

- **Default = inherit the session model.** Generated agents carry **no per-agent tier**; a subagent runs at the session tier unless the orchestrator decides otherwise. Rationale: inherit **fails-expensive, not fail-wrong** — an over-provisioned model on a cheap task wastes cost (visible, self-correcting via spend/limits), whereas a fixed cheap floor would fail on *quality* (a weak model on a high-blast-radius decide task — the worse, silent direction).
- **Spine — always-visible rule** (`start-up-tasks.md`): a short, **bidirectional** pre-delegation calibration cue, always-loaded. Because a query-on-demand policy fails at exactly the moment it's needed — proven by the 2026-07-06 incident, where the orchestrator that "should have known" didn't, because the default was silent and no rule was in front of it. This layer is the primary enforcement surface, not an add-on.
- **Spec backup — jumpstart** (`tasks.md` `**Agent**:` line): each task names its recommended model per task (concrete name, advisory as of authoring), set at spec formalization — the moment the author knows whether the architecture is settled. Self-contained context that survives even if the spine fails to load. Also a *forcing function*: writing the rec forces the decide-vs-implement classification at authoring time.
- **Net — delegate-then-verify**, under everything. The main loop independently verifies subagent output before trusting it; that review layer, not the tier, is the real guardrail.
- **Feedback loop — completion-doc capture** (`Task-Completion-Protocol.md`, Item 4): when the *actual* `agent (model)` diverges from the task's plan, the completion doc records the delta — making the measure **self-correcting** (the standing detector the reviewers found missing; feeds recalibration + audits). Exception-based, cheap.

Per-agent default tiers are **not** created (that would anchor the tier to the agent and be wrong exactly at the high-blast-radius boundary). Spec 122 receives a light handoff: agents inherit; the C1 schema needs **no** tier field.

## The Rule (normative content this ballot encodes)

Full text is the doc body in Item 1. In brief — the axis is *decide vs. implement*, weighted by *blast radius*:

- **Implement against a settled design/contract/spec** → the cheaper capable tier (currently Sonnet). Bias toward it for concrete work — on Spec 121 the cheaper tier was *diligent*, catching real edge cases, not merely adequate.
- **Decide — architecture, consequential/hard-to-reverse calls, cross-cutting tradeoffs, reasoning through multiple failure modes** → the higher tier (currently Opus). Escalation on a concrete signal, **not** a default-when-unsure.
- **Main orchestration loop stays top-tier** — synthesis and verification are the highest-leverage cognition.
- **Load-bearing qualifier**: front-load architecture into the spec so subagents *implement a decided design*. If a subagent must *make* the architectural call, that is the higher tier regardless of it being "a subagent."
- **Verify regardless of tier.** Delegate-then-verify holds whatever ran the work.

## Considered Alternatives (counter-arguments — recorded, not hidden)

- **Per-agent default tier** (e.g. Ada→Sonnet). *Rejected.* Decide-vs-implement is a property of the **task**, not the agent; a per-agent default is wrong precisely where it matters most (Ada *designing* a token architecture is a decide task the default would run cheap) and re-creates the "always Sonnet" anchoring error.
- **A conservative cheap floor as the omission backstop.** *Rejected.* Fails on *quality* when forgotten (cheap model on a decide task) — the worse direction. Inherit-the-session-model fails on *cost* instead, which is visible and self-correcting.
- **Leave it in private memory.** *Rejected.* Invisible to every other orchestrator — the exact failure the 2026-07-06 cost incident demonstrates.
- **Record the tier as intent-words (`decide`/`implement`) on tasks instead of concrete model names.** *Considered and reversed.* Intent-words resist model-lineup drift, but the backup exists for the case where the **policy vocabulary isn't loaded** — and a concrete name (`Sonnet`) needs no vocabulary, while `decide` is policy jargon. Concrete name chosen; drift mitigated by framing it **advisory as of authoring** (the orchestrator re-checks against the current lineup; a stale name on a completed task is harmless, on an open task a one-line update, and caught by verify anyway).
- **Honest residual (accepted with mitigants):** with no per-agent default, the safety concentrates in a *behavioral* rule with no hard mechanical backstop — if the spine fails to load AND the spec backup is absent (ad hoc work), only delegate-then-verify catches a mis-tier. Mitigants: the default fails-expensive not-wrong; the spec backup covers spec-driven work; verify is the net under all; and 122 can later make inherit *loud-not-silent* (Item 5) without reintroducing a per-agent table. We are betting on visibility over mechanism — stated out loud, given we have one receipt of that bet failing.

## Open Questions — all RESOLVED (Review Round 1)

*(Discoverability and encoding resolved by Peter 2026-07-07: spine home = `start-up-tasks.md`; task encoding = concrete model name.)*

1. **Naming — RESOLVED.** `Process-Orchestration-Model-Selection` / `process-orchestration-model-selection`: no id collision, and no existing doc hosts agent-orchestration tiering (Thurgood R1 enumerated the `Process-*` set and verified every "orchestration" governance hit is `BuildOrchestrator` *code*). Keep — `Process-` is the best-fitting prefix (no `Policy-*` family exists).
2. **Type→tier cross-reference — RESOLVED (add it).** Both reviewers converged; Peter approved 2026-07-08. A one-line pointer in `Process-Task-Type-Definitions.md` (Item 3c) — cross-reference hygiene, not a policy layer.
3. **Scope — RESOLVED (cross-project confirmed).** Delegation tiering is orchestration-harness behavior and references no DesignerPunk domain surface (Stacy R1).

---

## Review Round 1 — incorporated (2026-07-08)

Both reviewers returned **APPROVE-WITH-AMENDMENTS**; no blocking concerns. The main loop **verified the load-bearing claims before incorporating** (delegate-then-verify): the sync-manifest entry shape is uniform `{ hash, "managed": true }` across all 81 `governance/` entries (A1 confirmed); C1-has-no-model-field and the spine-rides-the-CLAUDE.md-import were confirmed against the ratified 122 design and CLAUDE.md's own OB-7 banner.

#### [STACY R1]
- Faithful, coherent, lean, honest. Incorporated: Type-precedence sentence → Item 1 § "The load-bearing qualifier"; advisory-not-authoritative-**never-a-binding** + rote-decay auditor → Item 3b + Follow-up obligations; post-deployment audit obligation → Follow-up obligations (now backed by the Item 4 capture). OQ2 → add the cross-ref (Item 3c); OQ3 → cross-project confirmed.
- Standing counter-argument (recorded): thin evidence base (one failure receipt + one success) for the most expensive real estate there is (always-loaded); the spine could decay to skim-past boilerplate with no detector → answered by the one-time post-deployment audit obligation, not by an edit.

#### [THURGOOD R1]
- Metadata valid, naming clean (OQ1 resolved), MCP-service mechanics correct, 122 handoff faithful to the ratified design + `cc-agent-model.md`. Incorporated: A1 sync-manifest entry shape → Item 6 step 6; **must-carry the spine across the CLAUDE.md supersession** → Item 5 (his highest-leverage catch); A3 memory-note pointer → Item 6 step 8; Item 2 receipt-trim → Item 2. OQ2 → add the cross-ref (Item 3c).
- Highest-leverage catch: the spine's delivery rides the very `CLAUDE.md` import 122 is chartered to retire — now a must-carry in the 122 handoff, weighted above the memory-note hygiene fix.

#### [THURGOOD R2] — targeted confirm of the post-R1 additions (Items 3c + 4), 2026-07-08
**CONFIRM-WITH-TWEAKS.** Item 4's **Before**-block confirmed character-exact against the live `Task-Completion-Protocol.md` § "Key Rules" (last bullet, flat list — clean append, no cascade). Always-loaded home + weight correct; the cheap-framing endorsed as *correctly inverting* the rote-stamp-override disincentive (a signal to collect, not a deviation to excuse); the agent-evolution vs. model-evolution split praised as what lets the detector feed its two distinct consumers. No content-consistency conflict across Task-Completion-Protocol / Completion Documentation Guide / Process-Spec-Planning § "Agent Assignment" (Item 4 is the closing half of Item 3b's plan→execute→record loop). Two tweaks, both incorporated: **T1** — Item 6 step 9 now names the managed doc `completion-documentation-guide`, the field placement (after `**Status**`), and adds its **re-hash + `rebuild_index`** (main-loop-verified 2026-07-08 that the doc is `managed: true` — the one real gap: without it the MCP copy goes stale); **T2** — the coverage note above (detector fires on planned work only).

---

## Item 1 — NEW: `governance/Process-Orchestration-Model-Selection.md`

Full proposed content (lands verbatim at Apply, after ratification):

````markdown
---
id: process-orchestration-model-selection
inclusion: manual
name: Process-Orchestration-Model-Selection
description: How an orchestrating agent picks a model tier for delegated subagent work — match the tier to the task's cognitive demand (decide vs. implement) weighted by blast radius, default to inheriting the session model, and always independently verify subagent output. Load when delegating work to subagents or deciding which model a subagent should run.
---

# Orchestration Model Selection

**Date**: 2026-07-07
**Last Reviewed**: 2026-07-07
**Purpose**: How an orchestrating agent chooses the model tier for delegated subagent work, and why verification — not the tier — is the guardrail
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: any task that delegates work to a subagent

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
````

---

## Item 2 — EDIT: `.kiro/steering/start-up-tasks.md` (the always-visible spine)

Insert a new pre-delegation calibration item and renumber the trailing item. This is always-loaded steering content (delivered to every agent via the `CLAUDE.md` import), so the cue reaches orchestrators without a query.

**Before** (current item 6 heading — the final numbered item):
```
6. **Ending a task: see Task Completion Protocol**
```

**After**:
```
6. **Model-tier calibration — when this task will delegate to subagents**
   
   Before delegating to a subagent, choose its model tier by the task's cognitive demand — do NOT let it silently inherit the session model:
   - **Implementing** an already-settled design/spec/contract → the cheaper capable tier (currently **Sonnet**).
   - **Deciding** — architecture, consequential/hard-to-reverse calls, cross-cutting tradeoffs, multiple failure modes → the higher tier (currently **Opus**). An escalation on a concrete signal, not a default-when-unsure.
   - Calibrate in BOTH directions relative to the session model: **downgrade** for implementation, **upgrade** for a decide task. Omitting the tier inherits the session's — a silent default, so decide it consciously.
   - **Always independently verify subagent output** before trusting it — delegate-then-verify is the guardrail, not the tier.
   
   Full policy + per-harness field mechanics: query `process-orchestration-model-selection` via the docs MCP.

7. **Ending a task: see Task Completion Protocol**
```

*(The body beneath the old item 6 is unchanged; only its heading number moves 6 → 7. Apply verifies no other item references the old number.)*

## Item 3 — EDIT: `governance/Process-Spec-Planning.md` (the per-task recommendation rule)

**3a — the tasks template** (`## Task List`). The placeholder appears on every subtask line (≥2 occurrences — apply as replace-all, then straggler-sweep, per the edit discipline):

**Before**:
```
    **Agent**: [Agent name]
```

**After**:
```
    **Agent**: [Agent name (Model)]
```

**3b — the `**Agent Assignment**` rule block.**

**Before**:
```
**Agent Assignment**:
- All tasks and subtasks must include **Agent** metadata field
- Indicates the optimal agent based on domain boundaries (Ada: tokens/pipeline, Lina: components/tests, Thurgood: governance/specs)
- For cross-domain tasks, use `Agent A + Agent B` with rationale
- Agent field is a recommendation — Peter may route differently based on context
- Parent tasks use Type: Parent with Tier 3: Comprehensive validation
- Type determines which validation tier and documentation tier to apply
```

**After**:
```
**Agent Assignment**:
- All tasks and subtasks must include **Agent** metadata field
- Indicates the optimal agent based on domain boundaries (Ada: tokens/pipeline, Lina: components/tests, Thurgood: governance/specs)
- For cross-domain tasks, use `Agent A + Agent B` with rationale
- Agent field is a recommendation — Peter may route differently based on context
- **Recommended model rides the Agent field, per task**: `**Agent**: Thurgood (Sonnet)` — agent, then model in parentheses. The model is the *task's* tier, not the agent's — the same agent may carry different models on different tasks (implement-work → the cheaper tier; a decide task → the higher tier). Cross-domain: `Agent A (Model) + Agent B (Model)`.
- The model is a **concrete name and advisory as of authoring, never a binding** — the executing orchestrator re-checks it against the current model lineup (delegate-then-verify is the net). It jumpstarts tier calibration even when the always-loaded cue is absent; a stale or rote stamp is re-derived at delegation, never treated as permission to skip calibration.
- When the recommended tier **diverges from what the task's Type implies** (an Architecture task run at the cheaper tier because design already settled the calls, or the reverse), add a one-line reason. See `process-orchestration-model-selection` for the decide-vs-implement axis.
- Parent tasks use Type: Parent with Tier 3: Comprehensive validation
- Type determines which validation tier and documentation tier to apply
```

**3c — the Type→tier cross-reference** (Open Question 2, Peter-approved 2026-07-08 — a cross-reference pointer, not a policy layer). In `governance/Process-Task-Type-Definitions.md` § "Overview":

**Before**:
```
This document defines the four task types used in the Spec Planning Standards to determine appropriate validation depth and completion documentation detail. Task types are determined during the planning phase and guide execution practices.
```

**After**:
```
This document defines the four task types used in the Spec Planning Standards to determine appropriate validation depth and completion documentation detail. Task types are determined during the planning phase and guide execution practices. Task type also informs the **recommended model tier** for delegated work (Architecture → *decide* / higher tier; Setup / Implementation / Documentation → *implement* / cheaper tier) — see `process-orchestration-model-selection`.
```

## Item 4 — EDIT: `.kiro/steering/Task-Completion-Protocol.md` (delegated-tier capture — the feedback loop)

*Added post-Review-Round-1 at Peter's direction (2026-07-08). This is the **standing detector** the design was missing: it makes every completed task a planned-vs-actual data point, feeding the recalibration + audit obligations below. Exception-based (records only divergence), cheap-framed (a data-point, not a justification to defend — so it never discourages the correct override of a rote stamp), and lean on the always-loaded surface (one rule; fuller field guidance lives in the MCP-served Completion Documentation Guide).*

Append one bullet to the `## Key Rules` block.

**Before**:
```
- **A checks-only merge is NOT ratification**: governance-law changes still ratify via the record-first ballot protocol (`.kiro/docs/ballots/README.md`).
```

**After**:
```
- **A checks-only merge is NOT ratification**: governance-law changes still ratify via the record-first ballot protocol (`.kiro/docs/ballots/README.md`).
- **Delegated-tier capture (exception-based)**: if the agent/model that actually did the work **diverged** from the task's planned `**Agent**: <agent> (<Model>)` — a different tier, or additional agents pulled in — record the delta and a one-line reason in the completion doc. A plan that held needs no note. This is a cheap data-point, **not** a justification to defend (overriding a stale or rote stamp is the *correct* move) — it feeds model-tier recalibration and process audits. Agent-evolution (routing/scope estimate was off) and model-evolution (cognitive-demand estimate was off) are distinct signals — note which. See `process-orchestration-model-selection`.
```

## Item 5 — NEW: `.kiro/specs/122-agent-generator/inbound-from-orchestration-tiering.md`

Coordination handoff (matches the spec's existing `inbound-from-*.md` pattern). Full proposed content (lands verbatim at Apply):

````markdown
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
````

## Item 6 — Application mechanics (record-first)

Applied **only after** Peter ratifies. Per the ratification protocol (`README.md`):

1. The ratifying session **first** sets this ballot's `Status:` to `RATIFIED (Peter, <date>)` and **commits that record** before any edit lands.
2. Resolve Open Questions 1–3; incorporate review changes woven, not appended.
3. Create `governance/Process-Orchestration-Model-Selection.md` (Item 1).
4. Apply Items 2 (start-up-tasks.md), 3 (Process-Spec-Planning.md), and 4 (Task-Completion-Protocol.md) exactly as written — before-text must match or stop on that block and report.
5. Create `.kiro/specs/122-agent-generator/inbound-from-orchestration-tiering.md` (Item 5).
6. **Register for MCP service + resync managed steering** (Thurgood, Civitas steward): add the new `governance/` doc's `.kiro/sync-manifest.json` entry — shape `{ "hash": "<tooling-computed sha256>", "managed": true }`, matching all 81 existing `governance/` entries (never hand-write the hash) — and re-hash the edited managed steering docs `.kiro/steering/start-up-tasks.md` and `.kiro/steering/Task-Completion-Protocol.md` via the doc-sync tooling; run `validate_metadata`; then `rebuild_index`; confirm `find_docs`/`get_document_full` resolve `process-orchestration-model-selection`.
7. **Straggler sweep** (protocol discipline — the enumerated list is never trusted alone): grep `governance/`, `.kiro/steering/`, `.kiro/specs/` for `**Agent**: [Agent name]` (template stragglers), and for references to "model tier"/"subagent model"/`subagent-model-tiers` that should now point at the new doc rather than the private memory note.
8. **Author-side — dual-source-drift guard** (Thurgood A3): add a one-line pointer atop the private agent-memory note `subagent-model-tiers.md` — "Canonized as `process-orchestration-model-selection`; that doc is now authoritative" — so the memory note defers to the governance doc rather than competing with it as a second live source.
9. **Completion-doc template** (Thurgood, completion-doc standards owner): in `governance/completion-documentation-guide.md` (MCP-served, **managed** — verified 2026-07-08), add an optional exception-based field to the Detailed Completion Document template's metadata block, placed after `**Status**` — e.g. `Delegated-tier: planned <agent (Model)> → actual <agent (Model)> — <reason>` — present ONLY when a divergence occurred, so the Item 4 capture has a documented home. Because this doc is managed, **re-hash `governance/completion-documentation-guide.md` via the doc-sync tooling and re-run `rebuild_index`** (Thurgood R2 T1) so the template change surfaces via MCP instead of going stale on disk.

## Item 7 — Review path

Per the ballot lifecycle and Spec-Feedback-Protocol stamp format:

1. **Stacy** — process-quality / accuracy: is the policy faithful to the practice as validated (Spec 121 + the 2026-07-06 Fable amendment)? Is the three-layer design (spine / spec-backup / verify-net) coherent, and lean enough to avoid process-creep? Does the `tasks.md` `**Agent**:` change fit the spec-authoring flow without rote-classification decay?
2. **Thurgood** — Civitas steward: doc metadata + naming + MCP-service mechanics (Item 6 step 6); the always-loaded steering edits (Items 2 and 4) and their resync; content-consistency against `core-goals.md`, `start-up-tasks.md`, `Task-Completion-Protocol.md`, `Process-Spec-Planning.md`, and the 122 design; adjudicate Open Questions 1–2.
3. Author incorporates (woven), records the round, and re-submits to Peter for ratification.
4. **Post-R1 additions needing a targeted confirm (not a full new round):** the Item 3c cross-ref and the **Item 4 delegated-tier capture** were added after Round 1 at Peter's direction (2026-07-08). Item 4 edits an always-loaded steering doc on Thurgood's completion-doc-standards surface, so it warrants a **targeted Thurgood confirm** (resync + completion-doc-template consistency, Item 6 steps 6 & 9) before ratification — a spot-check, not a re-review of the whole ballot.

## Follow-up obligations (recorded)

- **Continuous calibration signal (Item 4 — the standing detector):** the delegated-tier capture in completion docs turns every finished task into a planned-vs-actual data point. It is consumed two ways, and a **named consumer is required or the capture is write-only**: (a) **recalibration** — Ada/Thurgood fold accumulated divergences into the policy doc's dated "Still calibrating" section; (b) **rote-decay detection** — a task list stamped one tier by momentum, or systematic planned-cheaper→actual-higher divergence, tells Stacy's process/parity audits that formalization is under-classifying cognitive demand. This replaces the standalone "no detector" gap the reviewers flagged.
- **Post-deployment validation (one-time):** after the first real multi-agent spec runs under this policy, read the Item 4 capture to confirm orchestrators actually calibrated per task rather than inherited-and-forgot — one receipt of the policy working *as deployed* (not just as reasoned) converts it from a bet to a validated standard (Stacy + Thurgood R1). Now backed by real data (Item 4), not a fresh audit.
- **Coverage note (Thurgood R2):** the Item 4 detector fires only on **planned (spec-driven)** work — ad hoc delegation has no `**Agent**: <agent> (<Model>)` to diverge from, so recalibration/audit data is spec-work-only by construction. That is the same population as the policy's accepted residual for ad hoc work (§ "Considered Alternatives") — the detector reinforces the better-guarded path; it is not full coverage.

## Scope decisions (recorded)

- **One control point, per task** — the tier is chosen at delegation; no per-agent default tier is created (rejected as agent-anchoring, wrong at the high-blast-radius boundary).
- **Default = inherit** — fails-expensive-not-wrong; safe only alongside the always-visible bidirectional rule.
- **Net-new policy doc, not folded in** — no existing `governance/` process doc hosts multi-agent orchestration (verified 2026-07-07). Reconsiderable per Open Question 1.
- **Five enacted edit sites, bounded** — one new doc, **two** always-loaded steering edits (the spine in `start-up-tasks.md`; the delegated-tier capture in `Task-Completion-Protocol.md`, Item 4), one spec-process edit (the backup, `Process-Spec-Planning.md`), and one **one-line cross-ref** in `Process-Task-Type-Definitions.md` (Item 3c). The cross-ref is reference hygiene and the capture is feedback hygiene — **neither is a new policy *layer***; the design stays three layers (spine / spec-backup / verify-net) plus the completion-doc feedback loop that keeps them self-correcting. This is the measure's full footprint.
- **Policy harness-agnostic; mechanics quarantined** — tier names and the `model:` field live in labelled sections (§ "Still calibrating", § "Per-harness field mechanics") so recalibration and harness differences never touch the rule.
- **122 gets a note, not a schema edit** — the ratified 122 design is unmodified; the handoff *reduces* generator scope (emit no per-agent tier), respecting anti-creep.
- **Peter-merged** — governance-law change under the standing carve-out; a checks-only merge is not ratification (the record-first protocol is).

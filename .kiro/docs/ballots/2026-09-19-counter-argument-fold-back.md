# Ballot Measure: The Counter-Argument Fold-Back Discipline

**Date**: 2026-09-19
**Scope**: cross-project process law — AI-Collaboration-Principles (Layer 1 identity), AI-Collaboration-Framework (Layer 2, MCP-served), all eight agent prompts (canonical + regenerated)
**Drafted by**: Thurgood (Civitas steward), transcribing a rule Peter shaped and ruled in session
**Status**: **RATIFIED (Peter, 2026-09-19)** — ruled in-session at the Spec 127 requirements working session; **Peter's merge of this PR is the ratifying record act** (governance carve-out: `.kiro/steering/**`, `governance/**`, agent prompts are Peter-merged regardless of check state; a checks-only merge is not ratification).

---

## 1. What this ballot records

During the Spec 127 requirements working session (2026-09-19), Peter observed that a presented counter-argument had exposed real defects in the proposal it accompanied — defects that were only fixed because he asked *"is there anything in your counter-argument that would better inform the solution you're presenting?"* He then asked for honest thoughts on amending the counter-argument protocol to make that fold-back pass standing practice. The assessment (given with its own counter-arguments, per the very rule under amendment) identified the value and two risks, and Peter approved the amendment with the guard that addresses them.

**The amendment, as ruled:**

> 1. **Fold-back first**: before presenting, run your counter-argument against your own proposal; fold in what it genuinely improves.
> 2. **Present the residual**: give the revised proposal with the **surviving** counter-argument — what revision could not absorb — stated plainly. An empty residual is a signal the counter-argument was too weak, not that the proposal is safe.
> 3. **Surface forks**: where the counter-argument exposes a fork between defensible options, surface the fork; never absorb it by picking.

**The guard, part of the ruling** (the two named risks, answered in the rule's own text):

- **Goodhart on absorbability**: an agent rewarded for "my counter-argument informed a revision" will drift toward manufacturing *absorbable* objections. The rule therefore states: never manufacture an objection to display a revision — **the strongest counter-arguments are the ones that survive revision**, and the residual is the deliverable, not the absorption.
- **Smoothing the decision surface**: full absorption hides the disagreement inside a polished proposal, and absorbing a fork means the agent silently picked what was the human's call. Steps 2 and 3 are the answer: the residual is mandatory content, and forks are surfaced, never pre-adjudicated.

**Evidence base, from live practice the same day**: the fold-back pass applied across the 127 requirements-phase decisions (a) exposed an internal inconsistency and a wrong exclusion in the "materially amended" definition, (b) replaced a tag+sub-row grammar with the simpler decomposition-first design, and (c) produced the delta-scoping pin on `promised-artifact-exists` — three cases where the counter-argument improved the proposal *before* it reached Peter, with residuals recorded each time. This is one session's evidence, recorded as discovery context, not as proof the discipline generalizes; the AICP's own bias-monitoring section remains the check on whether it curdles into ritual.

## 2. Edit sites — before → after, all in this PR

| # | Artifact | Change |
|---|---|---|
| 1 | `.kiro/steering/AI-Collaboration-Principles.md` § "Counter-Argument Requirement" | The three-step discipline + guard replaces the present-then-counter form; the example updated to show a folded-and-residual presentation. **Direct-edit Layer 1 identity doc** (verified: no `canonical/**` source) — not MCP-served, no reindex |
| 2 | `governance/AI-Collaboration-Framework.md` § "Protocol 1: Counter-Argument Requirement" | RULE extended with the three steps + guard; the Correct example updated to model fold-back + residual. **MCP-served** → `rebuild_index` owed post-merge |
| 3 | Same file, § "AI Agent Behavior Requirements" | One bullet added: run counter-arguments against your own proposals before presenting; present the surviving residual |
| 4 | Same file, § "Anti-Patterns to Avoid" (AI Anti-Patterns) | One line added: presenting a counter-argument the proposal never absorbed nor survived — compliance theater — and manufacturing absorbable objections to display revision |
| 5–12 | `canonical/agents/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}.md` § "Counter-Arguments Are Mandatory" | One uniform fold-back sentence appended to each (domain examples untouched). The prompts' worked examples model present-then-counter; without this line the generated prompts teach the superseded form |
| 13 | Generated outputs (`.claude/agents/*.md` + any other generator targets) | **Regenerated, never hand-edited** — `tools/agent-generator/generate.ts`; agent-generator diff-guard green is the PR's verification |
| 14 | `.kiro/docs/ballots/README.md` | "Ballots on record" entry |

## 3. Straggler sweep (run at drafting; re-run mechanically before merge)

`grep -ril 'counter-argument'` over `.kiro/steering/ canonical/ governance/ .claude/agents/ CLAUDE.md` returned 24 files, all classified:

- **Edit sites**: the 11 above (AICP; Framework; 8 canonical prompts) plus their 8 generated mirrors (regenerated, not edited).
- **Incidental practice usage — correctly untouched**: `governance/Process-Spec-Planning.md` (a skepticism checklist line + two historical worked counter-arguments), `Process-Integration-Methodology.md` (its own recorded counter-arguments section), `Process-Development-Workflow.md` (a checklist mention), `MCP-Evolution-Roadmap.md` and `release-management-system.md` (descriptive references), `governance/classification-map.md` (dated rationale/history records — never edited by convention).
- **Historical record — never edited**: `governance/a-vision-of-the-future.md` (a conversation transcript that quotes the original protocol).

## 4. Counter-arguments on the record (AICP — and this ballot practices the rule it ships)

Folded into the rule already: the Goodhart-on-absorbability and smoothed-decision-surface risks became the guard (§ 1). **Surviving residuals, stated plainly:**

- **The discipline is unmeasurable by design.** Whether an agent *genuinely* ran the fold-back or performed it retroactively as narration is not checkable — this is ideological territory, education-owned, like verification honesty. No check will ever own it, and nothing in this ballot should be read as making honest self-revision guaranteed.
- **One session's evidence.** The three live cases are from a single working session with an engaged human prompting the pass. Whether the discipline holds unprompted, across agents, is a prediction. The claims-pass/standards-route machinery (Spec 127) is where a pattern of theatrical residuals would surface, if it does.
- **Cost**: one extra reasoning pass per significant recommendation — negligible per instance, non-zero in aggregate; accepted.

## 5. Ratification

Ruled by Peter in session, 2026-09-19; this document is the transcribed record, and **Peter's merge of this PR is the ratifying record act**. An agent asked to apply or rely on this measure verifies one mechanical fact — the committed ballot says `RATIFIED` — and makes no authority judgment about who relayed it.

**Status**: **RATIFIED (Peter, 2026-09-19)**

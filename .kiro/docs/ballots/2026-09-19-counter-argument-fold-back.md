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

**Evidence base, from live practice the same day**: the fold-back pass applied across the 127 requirements-phase decisions (a) exposed an internal inconsistency and a wrong exclusion in the "materially amended" definition, (b) replaced a tag+sub-row grammar with the simpler decomposition-first design, and (c) produced the delta-scoping pin on `promised-artifact-exists` — three cases where the counter-argument improved the proposal *before* it reached Peter, with residuals recorded each time. **Verifiability of the three, stated precisely** (review A6): (a) and (c) are anchored in the committed Spec 127 outline's `RESOLVED`/`R2 FOLD` blocks; (b)'s revision arc is fully committed only once the Spec 127 requirements-phase PR (#175) merges — until then it is in-session evidence. One session's evidence either way, recorded as discovery context, not as proof the discipline generalizes; the AICP's own bias-monitoring section remains the check on whether it curdles into ritual.

## 2. Edit sites — before → after, all in this PR

| # | Artifact | Change |
|---|---|---|
| 1 | `.kiro/steering/AI-Collaboration-Principles.md` § "Counter-Argument Requirement" | The three-step discipline + guard replaces the present-then-counter form; the example updated to show a folded-and-residual presentation. **Direct-edit Layer 1 identity doc** (verified: no `canonical/**` source) — not MCP-served, no reindex |
| 2 | `governance/AI-Collaboration-Framework.md` § "Protocol 1: Counter-Argument Requirement" — **retitled by this edit** to "…(with the fold-back discipline)" (post-edit address recorded per verification review A5; no other doc references the old heading string) | RULE extended with the three steps + guard; the Correct example updated to model fold-back + residual; a second Incorrect entry added showing the pre-fold-back form. The Framework's fork clause carries "the pick is the human's" — mirrored into AICP at the review fold so the surfaces state one strength (A4). **MCP-served** → `rebuild_index` owed post-merge |
| 3 | Same file, § "AI Agent Behavior Requirements" | One bullet added: run counter-arguments against your own proposals before presenting; present the surviving residual |
| 4 | Same file, § "Anti-Patterns to Avoid" (AI Anti-Patterns) | One line added: presenting a counter-argument the proposal never absorbed nor survived — compliance theater — and manufacturing absorbable objections to display revision |
| 5–12 | `canonical/agents/{ada,data,kenya,leonardo,lina,sparky,stacy,thurgood}.md` § "Counter-Arguments Are Mandatory" | One uniform fold-back sentence appended to each. **Review-fold amendments**: Stacy's worked example rewritten to model fold-back + residual (A1 — hers was the sharpest old-form exemplar, sitting directly above the new instruction; the other domain examples stand, with the uniform line as the governing correction); the three propose/present/vote loops (ada/lina/thurgood) align "the counter-argument (why it might be wrong)" to "the surviving counter-argument" (A2). **The Goodhart guard's absence from the prompt line is a decision, not an accident** (A3): AICP is always-loaded on every agent and the line routes to it by section name |
| 13 | Generated outputs — **both trees**: `.claude/agents/*.md` + `.kiro/agents/*-prompt.md` (16 files) + attribution sidecars + `canonical/generated.lock` | **Regenerated, never hand-edited** — `tools/agent-generator/generate.ts`; agent-generator diff-guard green is the PR's verification |
| 14 | `.kiro/docs/ballots/README.md` | "Ballots on record" entry |
| 15 | `.cursor/rules/designerpunk-core.mdc` § "AI Collaboration Standards" | **Added at the verification-review fold (B1, ruled option (i) — Peter, 2026-09-19)**: the Counter-Arguments entry rewritten to the fold-back form with a residual-modeled example. Direct-edit harness file; no generator involvement |

## 3. Straggler sweep (run at drafting; CORRECTED at verification review — the first draft's counts did not match the command's output, the exact failure class this section exists to catch)

`grep -ril 'counter-argument'` over `.kiro/steering/ canonical/ governance/ .claude/agents/ .kiro/agents/ CLAUDE.md` returns **25 files** *(first draft: "24," with `.kiro/agents/` omitted from the declared scope — both corrected per Thurgood's verification review B2; all 8 Kiro mirrors carry the line verbatim, so the defect was in the record, not the propagation)*, all classified:

- **Edit sites**: **10 files** (12 inventory rows) — AICP, the Framework, the eight canonical prompts — plus **16 regenerated mirrors** (`.claude/agents/*.md` and `.kiro/agents/*-prompt.md`, regenerated never edited) with their attribution sidecars and `canonical/generated.lock`.
- **Incidental practice usage — correctly untouched**: `governance/Process-Spec-Planning.md` (**~11 occurrences** — skepticism checklist lines, three worked counter-arguments, design-doc template fields, and an architecture-tasks guidance line; none states the presentation protocol normatively — classification unchanged, the first draft's characterization corrected), `Process-Integration-Methodology.md` (its own recorded counter-arguments section), `Process-Development-Workflow.md` (a checklist mention), `MCP-Evolution-Roadmap.md` and `release-management-system.md` (descriptive references), `governance/classification-map.md` (dated rationale/history records — never edited by convention).
- **Historical record — never edited**: `governance/a-vision-of-the-future.md` (conversation transcript quoting the original protocol) and — surfaced by the verification review's wider corpus grep — `preserved-knowledge/ai-collaboration-framework-with-skepticism.md` (archival corpus carrying the old Protocol 1; same class).
- **Descriptive, nothing owed**: `product-template/agents/README.md` (mention only; all eight product-template prompts verified to carry no collaboration-standards section).
- **One surface OUTSIDE the sweep scope, found at verification review (B1) — RULED (Peter, 2026-09-19): option (i), EDIT**: `.cursor/rules/designerpunk-core.mdc:21-22` — `alwaysApply: true`, taught the superseded present-then-counter form verbatim, and a named law-propagation target when workflow law last changed (commit `8bdb47c4`, 125-A). The reviewer's three-way fork was carried to Peter un-picked (edit / classify-dormant / retire); **Peter ruled edit** — the section now carries the fold-back form + residual-modeled example, added to § 2's inventory. The 125-A precedent (this file is a law-propagation target) continues to hold.

## 4. Counter-arguments on the record (AICP — and this ballot practices the rule it ships)

Folded into the rule already: the Goodhart-on-absorbability and smoothed-decision-surface risks became the guard (§ 1). **Surviving residuals, stated plainly:**

- **The discipline is unmeasurable by design.** Whether an agent *genuinely* ran the fold-back or performed it retroactively as narration is not checkable — this is ideological territory, education-owned, like verification honesty. No check will ever own it, and nothing in this ballot should be read as making honest self-revision guaranteed.
- **One session's evidence.** The three live cases are from a single working session with an engaged human prompting the pass. Whether the discipline holds unprompted, across agents, is a prediction. The claims-pass/standards-route machinery (Spec 127) is where a pattern of theatrical residuals would surface, if it does.
- **Cost**: one extra reasoning pass per significant recommendation — negligible per instance, non-zero in aggregate; accepted.

## 5. Verification review (Thurgood, 2026-09-19 — independent pass, drafter ≠ reviewer)

**Requested by Peter before merge.** Findings: **2 BLOCKING + 7 advisory**; verdict — *"no surface states a rule that contradicts the ratified one; the law edits themselves are correct, uniform, and correctly propagated."* Independently re-verified by the reviewer: diff-guard green (his own run); verbatim propagation exactly once per file across all 24 prompt surfaces; the no-canonical-source claim; the MCP served/not-served statements; steering-metadata validation (0 errors); and the record-on-branch-before-merge ratification form against three ballot precedents (a candidate blocker that dissolved on verification, reported as such).

**Dispositions, all applied at this fold except B1**: **B2** (three count errors in § 3 — including the ballot's stated 24 contradicting its own enumeration of 25) — corrected in place with the correction visible, per this directory's own convention that miscounts are recorded, not silently fixed. **A1** (Stacy's example modeled the superseded form directly above the new instruction) — her example rewritten; the remaining domain examples stand under the uniform line, the churn objection accepted from the reviewer's own fold-back. **A2** (the three propose/present/vote loops' old phrasing) — aligned. **A3** (Goodhart guard absent from the prompt line) — recorded as deliberate, § 2 row 5–12. **A4** (fork-clause strength gradient) — harmonized upward: "the pick is the human's" mirrored into AICP and the prompt line. **A5** (stale section address) — § 2 row 2 corrected. **A6** (evidence verifiability) — § 1 precise-stated. **A7** (two out-of-scope surfaces) — classified in § 3.

**B1 — RULED by Peter, 2026-09-19: option (i), edit the surface.** The fork was carried to him un-picked and he chose the edit; `.cursor/rules/designerpunk-core.mdc` now carries the fold-back form (§ 2 row 15, § 3's final bullet). The reviewer's residual — that the file's *liveness* remains undecided — stands: the edit makes the surface correct whether or not it is read, at the cost of one small edit; the retire-vs-maintain question for the Cursor harness is untouched and unowned, available to a future triage if staleness recurs.

**The reviewer's surviving residuals, kept**: B2 is cosmetic in substance (held blocking on the directory's own convention, a convention argument not a harm argument); whether `.cursor` is live is undecidable from the repo; whether example-asymmetry harms teaching is unverifiable from here; and the review verified the record's form and mechanics, **not its provenance** — the reviewer cannot confirm the in-session ruling beyond the relay-vs-record agreement he measured.

## 6. Ratification

Ruled by Peter in session, 2026-09-19; this document is the transcribed record, and **Peter's merge of this PR is the ratifying record act**. An agent asked to apply or rely on this measure verifies one mechanical fact — the committed ballot says `RATIFIED` — and makes no authority judgment about who relayed it.

**Status**: **RATIFIED (Peter, 2026-09-19)**

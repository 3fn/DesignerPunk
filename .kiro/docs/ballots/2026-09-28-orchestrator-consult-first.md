# Ballot Measure: Consult first, present a class-level option, leave the record — the orchestrator's option discipline

**Date**: 2026-09-28
**Drafted by**: Thurgood (Civitas steward), at Peter's direction
**Status**: **DRAFT** — not ratified. Nothing below is applied. **Record-first**: when Peter ratifies, the ratifying session commits `**Status**: **RATIFIED (Peter, <date>)**` before any edit is applied (`.kiro/docs/ballots/README.md` § "The Ratification Protocol").
**Proposed by**: Peter, 2026-09-28 (his words in § 1).
**Subject**: the Primary Agent (orchestrator). **Consulted, not authoring** — the same conflict logic applied to the steward's own scope ballot that morning (`2026-09-27-ci-regime-standing-scope.md`). The subject's read (R1–R3 and one residual) is folded or rebutted in §§ 2–4 and 6.
**Required reviewer**: Stacy — M3 creates an artifact her claims passes read.
**Amends**: the ratified orchestrator-role record (`.kiro/docs/ballots/2026-09-19-orchestrator-role-and-row.md` § 6.1). Its live text is `.kiro/steering/Agent-Directory.md` § "Primary Agent (Orchestrator)".
**Unit**: a standalone record-first ballot on `main`. It touches governance law (an identity steering doc and the register), so **Peter merges it** under the standing carve-out.

> **Conflicts, stated.**
> - **The author is a consulted seat.** M1 raises how often the steward (among others) is consulted, and so how much influence the steward seat has over the orchestrator's options.
> - **The author is also briefed by the subject.** Every seat that stands to be consulted shares the first interest.
> - **Stacy's review and Peter's ruling are the checks.** The author has not softened any trigger to spare his own seat the work.

> **No `Ratified-machine:` line, deliberately** — the same reasoning as the 2026-09-19 orchestrator-role ballot.

---

## 1. The gap

**Peter's proposal, verbatim (2026-09-28):**
> *(1) When considering options for how to proceed with a task, collaborate with the appropriate agent(s) to evaluate the option(s). (2) When presenting options, always present at least one holistic and sustainable solution that has been vetted through that collaborative process.*

**The evidence: four skipped consults in one day. Each consult, once run, changed the plan materially.**

| # | What the orchestrator brought forward without the owner | What the owner's consult changed | Record |
|---|---|---|---|
| 1 | The shipped-sidecar disposition, at 8 files | **Ada**: 16 sidecars ship, two per agent. The issue was re-scoped | `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md` (#219) |
| 2 | Fork M-1 as an unconditional read | **Stacy**: a conditional read with a trigger, a record path and never-a-gate limits | `tasks.md` § "Declared Merge Units", M-1 (#219) |
| 3 | 13.4's "tested properties", including the B-2 per-unit verdicts as code bites | **Lina and Thurgood**: half were not code-testable (entailment belongs to the routed judge). One invariant was vacuous and was replaced by the deletion invariant; the per-unit search scope was added | `tasks.md` Task 13 (#225) |
| 4 | The CI-regime standing scope, as an execution brief over four paths | **Stacy and Thurgood**: narrowed to one path on a measured base rate. The brief's premise (an expired grant) was wrong | `2026-09-27-ci-regime-standing-scope.md` (#226; ratified in #228) |

**A written memory rule failed four times.** The orchestrator had "consult the domain owner before editing owned surfaces" as a standing session rule. It did not fire because nothing forced the question at the moment of choosing. The existing law covers **authorship** (`owned-artifact-authorship`: the owner authors in their seat), **not evaluation**. The orchestrator can respect every seat's authorship and still present Peter options that no owner has read.

---

## 2. M1 — the consult-first rule

**The subject's R1**: rule (1), as written, fires on every option, trivia included, and would be skipped by habit. Scope it to options that touch an owned surface, change a plan, or make law.
- **Folded.** All four instances fall inside those three triggers, and none of the orchestrator's mechanical choices (command selection, status wording, sequencing inside a briefed scope) did.
- **Scoping keeps Peter's intent**, because it names where collaboration changes outcomes.
- **Rebutted in part**: the scoped form must still make the orchestrator say **why** no consult was needed (M3's `none needed — <reason>`). Otherwise the scoping is itself the habit-skip.

**The triggers, enumerated.** An option triggers a consult when it:
- **(a) touches an owned surface** — it would create, edit, or decide the shape of an artifact whose owner is an agent (the Agent-Directory routing map; a charter's write scope; a merged tasks row's Primary Artifacts);
- **(b) changes a plan** — a merged `tasks.md`, requirements or design, a ruled fork, a unit boundary, or a write grant;
- **(c) makes or amends law** — a ballot, a register entry, a steering doc, or a charter.

**The consult's cheap form.** It is bounded and read-only in the owner's seat: named questions, and a verdict plus residual per question, with no edits. Several consults run in parallel. **When the owner is also the executor, consult-before-brief merges into "brief with questions first"**: the owner answers before executing, in the same seat.

**Before → after — `.kiro/steering/Agent-Directory.md` § "Primary Agent (Orchestrator)".**

**Before** (the live block, from 2026-09-19 § 6.1; its last paragraph and the rule after it):
```markdown
**The seam**: adjudication with Peter is yours — you record what was ruled; the owner authors the artifact that carries it.

---
```

**After** (three paragraphs inserted between "The seam" and the rule; one for each of M1, M2 and M3):
```markdown
**The seam**: adjudication with Peter is yours — you record what was ruled; the owner authors the artifact that carries it.

**Consult before you recommend.** When an option you are weighing (a) touches a surface an agent owns, (b) changes a merged plan, ruling or grant, or (c) makes or amends governance law, **consult the owning agent(s) on it before you present it** — a bounded, read-only consult in their seat, in parallel when there are several; when the owner will execute it, brief with your questions first. Otherwise no consult is needed, and you say why.

**Present one class-level option.** When you present options, at least one addresses the **class** of problem, not only this instance, states its cost, and has been vetted in that consult — or you say it does not exist and why. It carries its surviving counter-argument like any recommendation (AI-Collaboration-Principles § "Counter-Argument Requirement").

**Leave the record.** Every options message to Peter, and every PR body you open, carries `**Consulted**: <Agent> — <one-line read>` (one pair per consulted agent, `;`-separated) or `**Consulted**: none needed — <reason>`; options messages also carry `**Class option**: <option> — cost: <cost>` or `**Class option**: none — <reason>`.

---
```

- **Placement** keeps the block **single-homed**. `owned-artifact-authorship`'s education disposition names this section as the ONE HOME, and every other surface points to it or stays silent. `start-up-tasks.md` #6 already routes "is this yours?" here and is **not** edited.
- **Rendering**: `Agent-Directory.md` is a **hand-maintained identity doc** (`inclusion: always`), **not generated**. There is no `canonical/**` source. The generated `CLAUDE.md` carries it **by import** (`@.kiro/steering/Agent-Directory.md`, line 14), and Kiro loads it as always-included steering. **No regeneration is needed.** Identity docs are not MCP-served, so this site needs no `rebuild_index`.

---

## 3. M2 — the class-level option

**Peter's clause (2)** asks for "at least one holistic and sustainable solution".
**The subject's R2**: without a test, "holistic and sustainable" becomes a box to tick. Make it "at least one option addresses the CLASS of problem, not the instance, and states its cost".
- **Folded, with one addition**: the permitted value `none — <reason>`.
- **Why the addition**: a mandatory class-level option on every choice pulls toward the **complexity bias** that AI-Collaboration-Principles names ("recommending complexity over simplicity"). Some problems are genuinely one-off, and forcing a class option there manufactures one. Stating "none, and why" is the honest form, and it is checkable.

**The test, as it goes into the section.** At least one presented option:
- (i) addresses the **class** of problem, not only this instance;
- (ii) **states its cost**;
- (iii) **was vetted in the M1 consult**.

Otherwise the message says `Class option: none — <reason>`.

**Relation to the counter-argument fold-back** (`AI-Collaboration-Principles.md` § "Counter-Argument Requirement", ratified 2026-09-19): the class-level option is a recommendation like any other, so it is **run against its own counter-argument before it is presented**, and it carries the **surviving residual**.
- **The two compose.** M2 makes sure a class-level candidate is on the table. The fold-back makes sure its weakness is stated.
- **Neither replaces the other**: a class option with no residual stated is a fold-back failure, and a residual with no class option in view is M2's failure.

**Today's worked instance**: the CI-regime ballot's (a) standing scope beside (e) issue-row grants. (e) was the class-level option, with its cost (an issue PR per touch) stated, and Peter took both.

---

## 4. M3 — the artifact

**The subject's R3**: enforcement must be an artifact. Every options or recommendation message, and every orchestrator PR body, carries a `Consulted:` line, with `none needed — <reason>` as a permitted value, checkable by claims passes over PR bodies. **Folded**, with three specifications.

**Grammar, decidable by rule** (the same shape as the completion guide's `**Delegated-tier**:` and `**CI-provenance**:` lines):
```
^\*\*Consulted\*\*: (?:none needed — .+|(?:Ada|Lina|Thurgood|Stacy|Leonardo|Sparky|Kenya|Data) — [^;]+(?:; (?:Ada|Lina|Thurgood|Stacy|Leonardo|Sparky|Kenya|Data) — [^;]+)*)$
^\*\*Class option\*\*: (?:none — .+|.+ — cost: .+)$
```
- The agent names are the eight in the Agent-Directory.
- **Peter is not a consultable value.** Consulting Peter is presenting to him, which is what the line records the preparation for.

**Where each line lives:**

| Surface | `Consulted:` | `Class option:` | Who checks |
|---|---|---|---|
| Every orchestrator message to Peter that presents options or a recommendation | required | required | **Peter**, at reading. The message is not a committed record. |
| Every PR body the orchestrator opens | required | not required (a PR carries a decision, not options) | **Stacy's claims passes**: presence and grammar, over the release delta's PR bodies (`gh pr view <n> --json body`) |
| Agent-seat PRs (opened by an agent through `complete-task.sh`) | not required under this measure | — | — |

**The PR-population fork, for Peter (surfaced, not picked):**
- **(i) Orchestrator-opened PRs only**, as scoped here.
  - Deciding which PRs the orchestrator opened needs a marker. The measure adds **`**Opened by**: orchestrator`** to those PR bodies, and the claims pass reads the population from it.
  - **Cost**: a second line, and an unmarked orchestrator PR escapes the population. That is self-attested, the same weakness as `Drafted by:`.
- **(ii) Every PR body**, the **class-level option** — M2 applied to M3 itself.
  - An agent that edits outside its seat has the same consult question, so every PR carries `Consulted:`, and an agent working in its own seat writes `none needed — owner executing in own seat`.
  - **Cost**: every PR gains a line. `complete-task.sh`'s PR-body template gains the field, which is a tooling change outside the steward's standing scope and needs an M2 issue-row grant.
  - **What it buys**: no opener marker, and the population is simply "all PRs".
- **The author's lean is (ii).** It removes the self-attested marker. **Declared**: the steward would carry the tooling edit.
- **What survives against it**: most `none needed` lines on agent PRs are boilerplate, and they dilute the signal the claims pass counts.

**The claims-pass check** (Stacy's):
- **Presence and grammar** of `**Consulted**:` on the population's PR bodies.
- **The `none needed` rate**, counted as a baseline. A 100% `none needed` rate on PRs that touch law or plans is the ritual-stub signal, as in C2's assent-rate reading.
- **A spot-check that each named consult left a record** (a completion doc, a feedback entry or a consult report).
- **Not a gate. It never blocks a PR** (merge-path status, as for every claims pass).

**Register entry** (`governance/classification-map.md`, new): `orchestrator-consult-line`.
- `rule`: M3's line, required where the table above says;
- `boundary_call: { class: functional, rationale: "presence and grammar on a PR body are decidable; the truth of the one-line read is not" }`;
- `verification: { disposition: audit, owner: stacy, check_state: none, checks: [] }`, with a comment noting that it is mechanizable as a PR-body lint but not proposed (a new required context is Peter's);
- `education`: the ONE HOME is Agent-Directory § "Primary Agent (Orchestrator)", and this ballot is the law record;
- `history`: the creation line.

The `disposition: audit` value carries the `tasks-row-write-scope-grant` precedent and the same schema-currency note.

**`owned-artifact-authorship`**: its `history` gains one line recording that its ONE HOME section gained M1–M3 (evaluation, alongside authorship). Its rule and verification are unchanged.

---

## 5. Cost

- **Seat rounds per consult.** One bounded, read-only round per consulted owner. Today's four consults were one round each, and each changed the plan. The comparison is a consult round against a plan revised after execution; #226 → #228 alone was three rounds, because the consult came after the brief.
- **The cheap form**: parallel, read-only, bounded consults, meaning named questions, verdict plus residual, and no edits. Several owners are consulted at once, with no serial latency.
- **Owner equals executor**: consult-before-brief merges into **"brief with questions first"**. The executing seat answers the questions before doing the work, with no separate round.
- **The artifact cost**: one line per options message and per orchestrator PR body. If fork (ii) is taken, one line per PR, plus the `complete-task.sh` template edit.
- **Not free, stated**: a consult adds latency at Peter's bursty pace. It is bounded, because consults are parallel and read-only.

---

## 6. Counter-arguments (fold-back applied)

- **The subject's residual: a rule cannot make the orchestrator notice.**
  - **Folded**: the line forces the question at every options message and every PR, and `none needed — <reason>` makes the answer visible.
  - **Residual (unfoldable)**: noticing that an option touches an owned surface remains the orchestrator's own act. **A wrong `none needed` looks exactly like a right one until a claims pass or Peter reads the reason.**
- **Self-scoping.** The subject decides whether a trigger applies. The scoped rule gives the subject a lever to skip.
  - **Folded**: the reason is required, and the claims pass reads the `none needed` rate against the PR's actual paths. A PR that touches a charter, `tasks.md`, `governance/**` or a ballot, with `none needed`, is a visible anomaly.
  - **Residual**: in messages, only Peter reads the reason.
- **Ritual line.** A mandatory line becomes boilerplate.
  - **Folded**: the rate baseline, and the spot-check that named consults left a record.
  - **Residual**: a consult that happened but was not really listened to reads the same as one that shaped the plan. The one-line read shows what the owner said, not whether it was heeded.
- **Consult capture.** The consulted owner is interested in its own surface (this morning's scope ballot is the example).
  - **Folded**: M1 consults the owner; it does not defer to it. Peter still rules, and the owner's interest is visible in the one-line read.
  - **Residual**: an owner's framing of its own surface carries weight the orchestrator may not discount.
- **Complexity pressure from M2.**
  - **Folded**: `Class option: none — <reason>`.
  - **Residual**: the default expectation of a class option can still tip marginal cases toward over-building.
- **Latency.**
  - **Folded**: parallel read-only consults, and "brief with questions first".
  - **Residual**: some decisions Peter wants fast will wait one round.
- **The author's interest** (header): M1 increases consults of the steward seat among others.
  - **Residual**: the author set the triggers. Stacy's review and Peter's ruling are the checks.

---

## 7. Review round record

*(empty — `[STACY R1]` to come; the subject's consult read is recorded in §§ 2–4 and 6; the author records `[THURGOOD R1]` incorporation here)*

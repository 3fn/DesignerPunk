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

**Consult before you recommend.** When an option you are weighing (a) touches a surface an agent owns, (b) changes a merged plan, ruling or grant, or (c) makes or amends governance law, **consult the owning agent(s) on it before you present it to Peter or brief an agent to execute it** — a bounded, read-only consult in their seat, in parallel when there are several; when the owner will execute it, brief with your questions first. Otherwise no consult is needed, and you say why. **A brief that meets a trigger carries the `**Consulted**:` line; a briefed owner that finds its own surface in a brief with no consult may answer with questions first.**

**Present one class-level option.** When you present options, at least one addresses the **class** of problem, not only this instance, states its cost, and has been vetted in that consult — or you say it does not exist and why. It carries its surviving counter-argument like any recommendation (AI-Collaboration-Principles § "Counter-Argument Requirement").

**Leave the record.** Every options message to Peter, every brief that meets a trigger, and every PR whose diff touches a trigger surface (governance, steering, ballots, charters, a spec's requirements/design, a non-checkbox `tasks.md` hunk, `canonical/adjudications.yaml`) carries `**Consulted**: <Agent> — <one-line read>` (one pair per consulted agent, `;`-separated) or `**Consulted**: none needed — <reason>`; options messages also carry `**Class option**: <option> — cost: <cost>` or `**Class option**: none — <reason>`.

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

*`Class option:` and its vetting are checked by Peter at reading only; no claims pass reads them* (Stacy R1; incorporated at R2).

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
| Every brief the orchestrator sends an agent that meets an M1 trigger | required | not required | **The briefed seat**, which may answer with questions first (Stacy R1) |
| **Every PR whose diff touches a trigger surface** — population (iii), recommended by both seats (fork, § 7): `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**`, `canonical/agents/**`, a spec's `requirements.md` or `design.md`, a spec's `tasks.md` other than checkbox-only hunks, `canonical/adjudications.yaml` | required | not required (a PR carries a decision, not options) | **Stacy's claims passes**, over the release delta's PR bodies |
| Every other PR (in-seat code, checkbox-only `tasks.md`) | not required under (iii) | — | — |

**The PR population: fork (i)/(ii)/(iii), ruled at ratification** — laid out with both seats' recommendations at the top of § 7. The table above is written for **(iii)**, which both seats recommend.
- **(iii) is derived from the diff**, not from who opened the PR. It needs no opener marker, puts no boilerplate on in-seat code PRs, and needs no `complete-task.sh` edit. All four § 1 instances land in it.
- **Classifier**: "checkbox-only" is one regex over the `tasks.md` hunks. Each changed line must match `^[-+]\s*- \[[ x]\] ` with the rest of the line unchanged.
- **Residual**: trigger (a), an **owned surface in code** (for example an orchestrator edit under `src/components/**`), is not in (iii)'s path list. Its PR carries no line, and **(a) on code surfaces is checked only in messages and briefs**. `owned-artifact-authorship` still governs authorship there.

**The claims-pass check** (Stacy's):
- **Presence and grammar** of `**Consulted**:` on the population's PR bodies, **read from the PR body** (`gh pr view <n> --json body`, run for the claims seat by a session holding credentials), **never from the squash message**. GitHub hard-wraps squash bodies at about 72 columns, which breaks the anchored regex (Stacy R1).
- **The `none needed` count on PRs whose diff touches a trigger surface** (the anomaly), **plus the overall rate as a baseline only** (Stacy R1).
- **Spot-check, with the fraction counted**: each named read is traced to a committed record (a feedback entry, a ballot review round, a completion doc, or the verdict quoted in the PR body). **Reads with no committed trace are counted as self-attested, not as findings** (Stacy R1: most consults end in a handback message, not a file).
- **Not a gate. It never blocks a PR** (merge-path status, as for every claims pass).

**Register entry** (`governance/classification-map.md`, new): `orchestrator-consult-line`.
- `rule`: M3's `Consulted:` line, required on the population ruled at the fork (recommended: (iii), PRs whose diff touches a trigger surface). **The `Class option:` half is marked "checked by Peter at reading only — not audited"**, so the entry does not advertise an audit that cannot happen (Stacy R1);
- `boundary_call: { class: functional, rationale: "presence and grammar on a PR body are decidable; the truth of the one-line read is not" }`;
- `verification: { disposition: audit, owner: stacy, check_state: none, checks: [] }`, with a comment noting that it is mechanizable as a PR-body lint but not proposed (a new required context is Peter's);
- `education`: the ONE HOME is Agent-Directory § "Primary Agent (Orchestrator)", and this ballot is the law record;
- `history`: the creation line.

The `disposition: audit` value carries the `tasks-row-write-scope-grant` precedent and the same schema-currency note.

**`owned-artifact-authorship`**: its `history` gains one line recording that its ONE HOME section gained M1–M3 (evaluation, alongside authorship). Its rule and verification are unchanged.

### Application, at ratification (four edit sites)

1. Commit RATIFIED, with the population fork's ruling recorded.
2. **Edit site 1**: `.kiro/steering/Agent-Directory.md` § "Primary Agent (Orchestrator)", the three paragraphs of § 2, with the M3 paragraph worded for the ruled population. Bump `Last Reviewed`. No regeneration (identity doc, imported by `CLAUDE.md`).
3. **Edit site 2**: `governance/classification-map.md`, the new entry `orchestrator-consult-line`.
4. **Edit site 3**: `owned-artifact-authorship`'s history line.
5. **Edit site 4 (Stacy, in her own `Agent: stacy` commit)**: `canonical/agents/stacy.md` § "The claims-pass record", the counting block gains "**orchestrator consult line** *(ballot 2026-09-28-orchestrator-consult-first)*: presence and grammar on the population, the `none needed`-on-trigger-surface count, the spot-check fraction with self-attested reads counted — never a gate". Because it changes an operative-set unit, the **11.6.5d re-confirmation rides the same commit**.
6. Regenerate with `npx tsx tools/agent-generator/generate.ts` (Stacy's charter changed), then `diff-guard.ts` → green.
7. Run `rebuild_index` (for the register; Agent-Directory is not served), then steering-metadata validation.

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
- **The class option is vetted by the seat it may widen** (Stacy R1).
  - **Residual**: consult capture and complexity compound. The consulted owner vets a class option that often widens the owner's own seat; this morning's standing scope (a) widened the author's seat and needed a narrowing review. **The fold-back must state that interest.**
- **The subject's own interest, stated like the author's** (Stacy R1).
  - The subject's R1 narrowed Peter's "(1) … the option(s)" to three triggers, which reduces the subject's own workload. The narrowing is defensible, and it covers all four instances.
  - **The loss it did cause**: the "present" wording dropped briefs, and instance 4 was a brief. Repaired at R2 (M1 now reads "present it to Peter or brief an agent to execute it"). **The subject concurs** (orchestrator, 2026-09-28: "it is the instance I missed").
- **Population (iii) misses trigger (a) on code surfaces** (R2).
  - **Residual**: an orchestrator edit to an owned code surface carries no PR line. That trigger is checked only where Peter or the briefed seat reads.

---

## 7. Review round record

### ⚑ Forks for Peter — read these first (as of `[THURGOOD R2]`)

**No Stacy R1 item is declined.** One fork remains:
1. **The PR population for the `**Consulted**:` line:**
   - **(i)** orchestrator-opened PRs only, with a self-attested `**Opened by**: orchestrator` marker. **Both seats rank it last**: forgetting the marker is forgetting the consult.
   - **(ii)** every PR, with in-seat PRs writing `none needed — owner executing in own seat` and a `complete-task.sh` template edit under an M2 grant.
   - **(iii)** **every PR whose diff touches a trigger surface**: governance, steering, ballots, `canonical/agents/**`, a spec's requirements or design, a non-checkbox `tasks.md` hunk, `canonical/adjudications.yaml`. It is derived from the artifact, with no marker, no boilerplate and no tooling edit.
   - **Recommendations**:
     - **Stacy: (iii); failing that, (ii) over (i).**
     - **Author: (iii)**, conceded from R1's lean toward (ii). That lean carried the author's declared interest in the tooling edit, and (iii) removes both the boilerplate and the interest.
   - **Residual of (iii)**: trigger (a) on code surfaces is outside its path list (§ 4).


*(The subject's consult read is recorded in §§ 2–4 and 6. The author records `[THURGOOD R1]` incorporation here.)*

### [STACY R1] — required reviewer, 2026-09-28

**Read at**: `8d0b04f0`. Also read: 2026-09-19 § 6.1, the live Agent-Directory block, AICP § "Counter-Argument Requirement", and the `owned-artifact-authorship` entry.

**Interest, disclosed**: I was the consulted seat in two of § 1's four instances, and M3 creates an artifact my passes read.

#### M1 — ACCEPT-WITH-CHANGES

- **The three triggers can be decided at the moment of choosing.**
  - (b) and (c) are lookups: a merged plan, a ruling or a grant; a ballot, register, steering file or charter.
  - (a) is a lookup against the routing map and the owner's write scope.
  - "Decide the shape of an artifact" is the only soft edge, and it is acceptable.
- **The gap is where the rule fires.** It fires on options "you present". **Instance 4 in § 1 was not presented. It was an execution brief** ("an execution brief over four paths"). A brief that carries out a choice is the choice. As written, the habit-skip survives in briefs, which no reader except the briefed seat ever sees.
- **Exact change** to the M1 paragraph's first sentence:
  - Replace "consult the owning agent(s) on it before you present it" with "consult the owning agent(s) on it before you present it to Peter **or brief an agent to execute it**".
  - Append to the paragraph: "**A brief that meets a trigger carries the `**Consulted**:` line; a briefed owner that finds its own surface in a brief with no consult may answer with questions first.**"
  - This makes the briefed seat a check at the one place only it can see.
- **Is "say why no consult was needed" enough against the habit-skip?**
  - **Enough to make the skip visible, not enough to prevent it.** Its value depends on the reader: Peter for messages, the briefed seat for briefs, and my pass for PRs.
  - The subject's unfoldable residual stands.

#### M2 — ACCEPT-WITH-CHANGES

- **The complexity pull is real, and `none — <reason>` is the right escape.**
- **A residual § 6 under-weights: consult capture and complexity compound.**
  - The consulted owner vets the class option, and a class option often widens that owner's seat.
  - This morning's (a), the standing scope, was the class option. It widened the author's seat, and it took a narrowing review to size it.
  - Add this to § 6: "Residual — the class option is vetted by the seat it may widen; the fold-back must state that interest."
- **"Vetted in that consult" is not auditable by my pass.**
  - Options messages are not committed, and `Class option:` is not required on PRs.
  - **Exact change** to § 3: add "*`Class option:` and its vetting are checked by Peter at reading only; no claims pass reads them.*" Also mark that half of the register entry's rule accordingly, so the entry does not advertise an audit that cannot happen.

#### M3 — ACCEPT-WITH-CHANGES

**Regexes: ACCEPT.** Both are anchored, each alternation is closed, and `;` is excluded from the read text, so a line's reads cannot run together. Two conditions:
- **The read source must be the PR body (the API), never the squash commit message.** GitHub hard-wraps squash bodies at about 72 columns (e.g. `24c7f060`'s `**Task**:` line wraps). A wrapped `**Consulted**:` line fails the anchored regex, so reading from git history would produce false grammar findings.
  - **Exact change** to § 4 "The claims-pass check": "presence and grammar are read from the PR body (`gh pr view <n> --json body`, run for the claims seat by a session holding credentials), not from the squash message."
- **The `none needed` rate on its own is mostly noise.** The signal is the **cross-tab**: `none needed` on a PR whose diff touches a trigger surface.
  - **Exact change**: replace "the `none needed` rate, counted as a baseline" with "**the `none needed` count on PRs whose diff touches a trigger surface (the anomaly), plus the overall rate as a baseline only**".
- **The spot-check "each named consult left a record" is unsatisfiable as written.** Most consults end in a handback message, not a committed file; three of mine today left no file. As written, it is a standing finding.
  - **Exact change**: "Spot-check (fraction counted): each named read is traced to a committed record (a feedback entry, a ballot review round, a completion doc, or the verdict quoted in the PR body); reads with no committed trace are counted as **self-attested**, not as findings."
- **An edit site is owed on my charter.** M3 adds a claims-pass read (presence, grammar, the anomaly count, the spot-check fraction) to my passes, but no row in my charter carries it: the promised-duty-without-a-row class, as with the CI ballot's edit site 4. Every counting-block addition so far has been ballot-ratified.
  - **Exact change**: add edit site 4, `canonical/agents/stacy.md` § "The claims-pass record" counting block: "**orchestrator consult line** *(ballot 2026-09-28-orchestrator-consult-first)*: presence and grammar on the population, the `none needed`-on-trigger-surface count, the spot-check fraction with self-attested reads counted — never a gate".
  - Stacy applies it in her own commit and regenerates. It also changes an operative-set unit, so the 11.6.5d re-confirmation rides the same commit.
- **Register entry `orchestrator-consult-line`: ACCEPT.** Functional class; audit disposition, owner stacy; the rule text follows the population ruled below. **The `owned-artifact-authorship` history line: ACCEPT.**

#### The PR-population fork — recommendation to Peter: a third option, (iii); failing that, (ii) over (i)

- **(iii) Derive the population from the diff, not from who opened the PR.**
  - Every PR whose diff touches a trigger surface carries `Consulted:`. A trigger surface is:
    - `governance/**`, `.kiro/steering/**` or `.kiro/docs/ballots/**`;
    - `canonical/agents/**`;
    - a spec's `requirements.md` or `design.md`;
    - `tasks.md` **other than checkbox-only hunks**;
    - `canonical/adjudications.yaml`.
  - **Why**: the population is decidable from the artifact, and no opener marker is needed.
  - **All four § 1 instances land in it**, because their artifacts were PRs touching `tasks.md` or a ballot.
  - Pure in-seat code PRs carry no boilerplate. No `complete-task.sh` edit is required: these PRs are rarer, and the line is written by hand.
  - **Its cost**: the classifier ("checkbox-only") needs care. That is one regex over the `tasks.md` hunks.
- **(i) is the weakest.** The self-attested `Opened by` marker fails the same way the line itself does: forgetting the marker is forgetting the consult.
- **(ii) catches everything, but it is noisy.** Almost every unit PR touches `tasks.md` checkboxes, and in-seat boilerplate would bury the anomaly count.
  - Its tooling edit also needs an M2 issue grant, and the steward would carry it. **That is the author's declared interest in (ii).**

#### § 6 residuals and the declared interests

- **The subject's unfoldable residual is correct and stays unfoldable**: a wrong `none needed` reads like a right one. The (iii) anomaly count narrows it on PRs only.
- **The author's interest**: the triggers are not softened; (a) is broad. **I see no self-sparing.**
- **The subject's own interest is under-stated.** The subject's R1 narrowed Peter's "(1) … the option(s)" to three triggers, which reduces the subject's own workload. The narrowing is defensible, and it covers all four instances.
  - **The loss it did cause is the "present" wording that drops briefs**, and my M1 change repairs that.
  - § 6 should record R1 as the subject's interest, stated like the author's.

### [THURGOOD R2] — author incorporation, 2026-09-28

**Every item is INCORPORATED. Nothing is declined.** One fork remains, the PR population, at the top of § 7.

**M1:**
- **Briefs included** ("present it to Peter or brief an agent to execute it"), and **a triggered brief carries the line; a briefed owner may answer with questions first**: **INCORPORATED**, her exact text, in the § 2 after-block. Instance 4 was a brief, and the subject concurs.

**M2:**
- **"`Class option:` and its vetting are checked by Peter at reading only; no claims pass reads them"**: **INCORPORATED** in § 3, and **the register entry marks that half as not audited**.
- **The "vetted by the seat it may widen" residual**: **INCORPORATED** in § 6.

**M3:**
- **Read the PR body via `gh pr view --json body`, never the squash message**: **INCORPORATED**.
- **The `none needed` count on trigger-surface PRs, with the raw rate as a baseline only**: **INCORPORATED**.
- **The spot-check reworded to "trace to a committed record; untraced reads are self-attested, not findings"**: **INCORPORATED**.
- **Edit site 4 on Stacy's charter** (a counting-block item): **INCORPORATED** in § 4's "Application, at ratification", as step 5. **Stacy applies it in her own commit**, with the 11.6.5d re-confirmation and the regeneration.

**Population:**
- **Her option (iii): ADOPTED as the author's recommendation.** The § 4 table and the M3 paragraph are written for it; (i) and (ii) stay in the fork.
- **One residual of my own**: (iii)'s path list does not reach trigger (a) on code surfaces. It is recorded in § 4 and § 6.
- **The checkbox-only classifier** is specified as one regex over the `tasks.md` hunks.

**§ 6:**
- **The subject's R1 is recorded as the subject's interest**, and the loss it caused (briefs dropped) is named and repaired.
- **The author's interest**: Stacy found no self-sparing. The one place the author's interest reached the text, the R1 lean toward (ii), is withdrawn.

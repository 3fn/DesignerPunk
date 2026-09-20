# Ballot Measure: The orchestrator's role, and one register row for artifact authorship

**Date**: 2026-09-19
**Drafted by**: Thurgood (Civitas steward), from a first-principles reassessment co-derived with the orchestrating session
**Status**: **RATIFIED (Peter, 2026-09-19)** — ruled in session; **Peter's merge of this PR is the record act** (PR-atomic per the Spec 127 law ballot § 15)
**Origin**: one incident (Spec 127's formalization docs authored in Thurgood's seat by the main session) and two verified structural defects found while investigating it
**Unit**: this branch, `chore/orchestrator-role-and-row` — Peter-merged under the standing governance carve-out

> **No `Ratified-machine:` line, deliberately.** That is the Spec 127 law ballot's own mechanism — a machine line at a pinned path, parsed by `completion-criteria-parity` to resolve the in-force date of *that* law. It is not a general ballot convention, and reproducing it here would create a second parseable ratification record for a checker that reads exactly one. Ratification here is the `Status` line above plus the merge.

---

## 1. Why this is small

Four rounds of consultation produced four different designs — a pointer amendment, a path-keyed routing rule, an always-load elevation, an identity section — each shaped by the *previous round's critique* rather than by the problem. **Peter stopped it**: *"I see a risk of layering accumulated solutions rather than a strategy."*

He was right, and the tell is that **not one round asked what the register would say.** This corpus ratified a strategy for governing a rule three commits ago — one classification, one education home, one honest verification disposition, imposter prose pruned rather than accumulated, mechanization armed on evidence rather than assertion. We built the machine and then hand-rolled around it.

**Eleven accumulated pieces went into the reassessment. Three come out.**

---

## 2. The strategic statement

> **The rule** — *decide-grade artifacts owned by an agent are authored in that agent's seat; the orchestration loop briefs, relays and verifies, and does not author in an owner's seat.*
>
> **Classification**: `ideological` — undetectable from any artifact a check can read.
>
> **Verification**: `disposition: none`, `check_state: none`, **owner: thurgood**. **No check owns it — ever.** The judgment residual belongs to the CLOSEOUT claims pass as an idiom observation, and the row records that this detector is weak and after-the-fact.
>
> **Education**: **ONE home** — `Agent-Directory` § "Primary Agent (Orchestrator)", second person, always-loaded. Every other surface points or stays silent.
>
> **Escalation**: none pre-committed, because there is nothing artifact-side to escalate *to*. If seat-drift recurs, that is **evidence routed to the claims-pass dimension**, not a trigger for machinery that cannot exist.

---

## 3. The diagnosis — including the part that disproved the obvious remedy

Three facts, verified against live texts. **Two of them are defects independent of the incident** — worth fixing if it had never happened, which is why they carry their own justification.

- **F-a — the incident.** Spec 127's requirements/design/tasks were authored by the main session acting in Thurgood's seat. Peter observed the format differed from what the seat would have produced.
- **F-b — a completeness defect.** `Agent-Directory.md:10` states its own Purpose as *"Cross-agent reference for **all** DesignerPunk AI agents — domains, boundaries, and routing guidance."* It defines two tiers, enumerates eight agents, and **omits the one agent that runs every session and directs the other eight.**
- **F-c — a trigger defect.** `start-up-tasks.md` #6 was headed *"when this task **will delegate** to subagents"* and opened *"**Before delegating**…"* — both conditioned on a delegation decision already taken. The doc that would answer *whether* to delegate sat behind a pointer that only fired *after* the answer.

**The finding that killed the obvious remedy.** The first instinct — make the governing rule more available — was tested and failed. `Agent-Directory.md` **already** assigned spec formalization to Thurgood in three places: `:56` (`Owns:`), `:60` (the Q5 charter cut, **ratified 2026-09-17**, in force when 127's docs were authored), and `:126` (the routing table). All Layer 1. All always-loaded. **It did not bind.**

**Availability was never the failure.** What was missing was any statement of the **orchestrator's own** scope — the system had eight agents with second-person role definitions and one orchestrator with none, running on a third-person table of what *other* agents own.

---

## 4. F11 — RULED: the completeness ground

Two grounds were available for the Agent-Directory section, and the choice determines what counts as falsification later.

- **The completeness ground (RULED).** The section ships because `Agent-Directory` claims to cover *all* agents and omits one. **A verified defect in a doc on its own stated terms**, true independent of any theory about why the incident happened.
- **The binding-hypothesis ground (NOT the ground; recorded as a hypothesis).** That second-person identity statements bind where third-person ownership tables do not.

**Peter ruled the completeness ground.** The binding claim is recorded **as a hypothesis, explicitly falsifiable**: if seat-drift recurs after this lands, that is evidence against it, routed to the claims-pass idiom dimension. Nothing in this measure asserts that the hypothesis is proven.

**Why the distinction was worth ruling.** The evidence offered for the hypothesis was *"the eight subagents demonstrably stay in lane under role prompts."* I tried to confirm it and could not:

```bash
find . -type d \( -name node_modules -o -name .git -o -name .claude \) -prune -o -type f -name '*.md' -print0 \
  | xargs -0 /usr/bin/grep -licF -- "that's Ada's" ... | grep -v ':0$'
```
```
(no output)
```

**Zero recorded instances of any agent declining or routing out-of-scope work, corpus-wide.** My own prompt carries four scripted boundary-response examples and there is no record of one firing. The in-lane evidence is **absence of recorded violations, not presence of recorded refusals — and no instrument exists that would detect an agent working out of scope.** Treating that silence as compliance is the error Spec 112's audit found and Spec 127 legislated against. Four confounds are equally consistent with it: invocation asymmetry (a subagent is handed one lane; the loop is handed the board), session length, declared write scopes, and no detector.

Ruling on completeness lets the section ship on ground that holds, while leaving the interesting claim honestly open.

---

## 5. The kill list — authorship acknowledged

Every accumulated piece was re-tested against the imposter standard: *would we author this starting fresh from the register row, or is it restatement accreted to survive successive critiques?* The full table is in the reassessment consult; the dispositions:

| Piece | Verdict | Author |
|---|---|---|
| Register row | **KEEP** (new) | reassessment |
| Agent-Directory orchestrator § | **KEEP**, cut 156 → 123 words | Thurgood (draft), coordinator (concept) |
| #6 heading reword (A1) | **KEEP**, trivial | Thurgood |
| A2 three-questions line | **COLLAPSED** to the whether-trigger only — identity now answers *whose* as a standing default; restating ownership in #6 would be the imposter | Thurgood |
| A3 pointer extension | **DROPPED** — contingent on B2 | Thurgood |
| B1 tiering-rule bullet | **DROPPED** — textbook imposter: same rule, third surface | Thurgood |
| B2 warm-continue § | **DROPPED from this package** — a *different rule* (delegation technique, no incident, no law content); its real function here was answering a counter-argument. May land later as ordinary Layer-2 maintenance, **no ballot required**, if it justifies itself alone | Thurgood |
| Seam paragraph | **COLLAPSED** to one sentence in the § | Thurgood |
| Path/glob keying | **DROPPED** — keying presumes a check; there is none. Also measured as over-reaching by ~3,298 files under `.kiro/specs/**` (it inverts authorship for 68 feedback files) | coordinator |
| `**Author**:` template field | **DROPPED** — 5% base rate (30/571 formalization docs), no backfill, invented obligation | Thurgood |
| Hook / mechanical enforcement | **DROPPED** — no detector exists; an escalation path to a mechanism that cannot exist is the dishonesty the row is about | coordinator |

**Both parties killed their own work.** The coordinator held no attachment to the path-keying or the hook; I held none to B2, the two-scope row, the `Author:` field, or ~20% of my own section draft.

---

## 6. Before → after

Three sites. Every BEFORE was read from the live file on `chore/orchestrator-role-and-row` at `1fd79991`; **all three files were verified byte-identical to `main`** before editing.

### 6.1 `.kiro/steering/Agent-Directory.md` — new § "Primary Agent (Orchestrator)"

**Placement**: immediately **before** `## System Agents` (F12) — the orchestrator precedes those it directs.

**BEFORE**:
```markdown
## System Agents

| Agent | Domain | Shortcut | Named After |
```

**AFTER**:
```markdown
## Primary Agent (Orchestrator)

**This addresses you — the session running now, with no agent prompt loaded.**

**You orchestrate. You do not occupy seats.** Your scope: planning, briefing, independent verification, synthesis, and facing Peter.

**Your artifacts** are orchestration records — briefs, verification notes, PR bodies, status reports. **Everything else belongs to an owner**; the tiers and routing table below are the map. When work falls outside your scope, **brief the owning agent once per unit and continue that agent across it** rather than authoring in their seat — their charter, idiom and knowledge bases are what the seat is for, and none of them load here.

**The seam**: adjudication with Peter is yours — you record what was ruled; the owner authors the artifact that carries it.

---

## System Agents

| Agent | Domain | Shortcut | Named After |
```

**123 words** (heading excluded). The ground (§ 4) is recorded here, deliberately **not** restated in the section — the section teaches the rule; the ballot carries why it exists.

### 6.2 `.kiro/steering/start-up-tasks.md` #6 — heading + the whether-trigger

**BEFORE**:
```markdown
6. **Model-tier calibration — when this task will delegate to subagents**
   
   Before delegating to a subagent, choose its model tier by the task's cognitive demand — do NOT let it silently inherit the session model:
```

**AFTER**:
```markdown
6. **Delegation and model tier — before delegating, and before deciding whether to**
   
   **First ask WHETHER this work is yours to do at all** (Agent-Directory § "Primary Agent (Orchestrator)"). Then, for anything you do delegate:
   
   Before delegating to a subagent, choose its model tier by the task's cognitive demand — do NOT let it silently inherit the session model:
```

**+22 words.** The ownership enumeration is **deliberately not restated** — single-homed in § 6.1 and reached by pointer. The existing tier / calibrate-bidirectionally / delegate-then-verify / verify-placement bullets and the closing MCP pointer are **untouched**.

**Severability, stated so a later reader does not infer otherwise**: this edit fixes **F-c**, which is a defect independent of the rule. It rides this ballot only because a governance ballot was already open for Layer-1 text.

### 6.3 `governance/classification-map.md` — new row `owned-artifact-authorship`

Appended after `parent-completion-docs-present`. Full YAML as applied; the load-bearing clauses:

- `class: ideological` — with the **precision clause**: *"the undecidability is about the ARTIFACT. An ACT-TIME aid — something that surfaces the ownership question at the moment of writing rather than inferring authorship afterwards — remains possible and is UNPROPOSED here; this row forecloses artifact-side detection, not future act-time design."*
- `disposition: none` / `check_state: none` / `owner: thurgood` — **no check owns it, ever.**
- The **weak-detector honesty** in the education disposition: the only available detector is a claims-pass idiom observation — *subjective, per-spec, at CLOSEOUT, and after the fact.* **A reader who treats this row's existence as coverage has made the error the row exists to prevent.**
- The **`completion-verification-honesty` precedent cite** — the isomorphic shape: an undetectable truth-property of an artifact, held by practice and audit rather than by any check.
- A dated history entry recording the reassessment, the disproven-availability diagnosis, and F11's ruling.

---

## 7. Sweeps — named interpreter, exclusion by `find`, per-hit classification

Per the form ratified in the Spec 127 law ballot § 8.1: `/usr/bin/grep`, exclusion performed by `find` (no end-of-options hazard, no per-implementation exclusion semantics), and **hits classified to files — counts are not differenced.**

### 7.1 Non-substring sweep — the new id against all 27 live entries, both directions

```bash
LIVE=$(/usr/bin/grep -E '^### ' governance/classification-map.md | sed 's/^### //' | /usr/bin/grep -v 'Illustrative Example')
NEW="owned-artifact-authorship"; ALL="$LIVE $NEW"; hits=0
echo "live entry ids: $(echo "$LIVE" | wc -l | tr -d ' ')"
for a in $ALL; do for b in $ALL; do
  [ "$a" != "$b" ] && case "$b" in *"$a"*) echo "COLLISION: '$a' is a substring of '$b'"; hits=$((hits+1));; esac
done; done
echo "relations found: $hits"
echo "duplicate ids: $(echo "$ALL" | tr ' ' '\n' | sort | uniq -d | wc -l | tr -d ' ')"
```
```
live entry ids: 27
relations found: 0
duplicate ids: 0
```

Run **before** the row was written, against the register as it stood. Register is now **28 entries** (29 `###` headings less the Illustrative Example).

### 7.2 Post-application straggler sweep — per-hit classification

```bash
find . -type d \( -name node_modules -o -name .git -o -name .claude \) -prune -o -type f -print0 \
  | xargs -0 /usr/bin/grep -lF -- "$s" 2>/dev/null | sed 's|^\./||' | sort
```

| String | Files | Classification |
|---|---|---|
| `Primary Agent (Orchestrator)` | `Agent-Directory.md`, `start-up-tasks.md`, `classification-map.md` | **3 — exactly the intended set**: the education home, the pointer, the row's education disposition. No fourth surface |
| `owned-artifact-authorship` | `classification-map.md` | **1 — the row heading only.** No prose surface restates the id |
| `You orchestrate. You do not occupy seats.` | `Agent-Directory.md` | **1 — single-homed**, as the strategy requires |
| `brief the owning agent once per unit` | `Agent-Directory.md` | **1 — single-homed** |
| `WHETHER this work is yours to do at all` | `start-up-tasks.md` | **1 — the trigger, once** |

**Zero stragglers, zero duplicated law text, zero dead references.** The `Primary Agent (Orchestrator)` result is the measure's own single-homing test: three hits, one of which is the text and two of which are pointers to it.

### 7.3 Validator

```
node scripts/validate-steering-metadata.js
→ Total errors: 0 · id-uniqueness guard: PASS
```

---

## 8. The ballots-README entry is DEFERRED — and why

**`.kiro/docs/ballots/README.md` is deliberately NOT edited by this measure**, and the "Ballots on record" entry is **owed in the next ballot-touching commit after PR #185 merges.**

**The ground, corrected at execution** (the first-stated reason — *"another live session has uncommitted work"* — was found false on inspection; the tree was clean): **their README entry is committed on the unmerged branch `chore/standards-package-apply` (`9f04e3b2`, PR #185, confirmed open on origin).** An entry added from this `main`-based branch would not see theirs and **would collide at merge.**

Recorded rather than silently adapted, because a ratified record carrying a stale reason is the class of defect this directory's measures exist to stop. *(A local-only observation of `9f04e3b2` during the pre-flight check resolved to push timing; recorded as resolved, not as a doubt.)*

---

## 9. Fork dispositions

| # | Fork | Disposition |
|---|---|---|
| **F3** | Are ballots covered as "owned artifacts"? | **YES, trivially** — the rule says *decide-grade artifacts owned by an agent*, and ballots are named in it |
| **F10** | Measure this Layer-1 **addition** at the next wave, under the standard the prunes were held to? | **RECORDED AND ADOPTED.** This is the first deliberate Layer-1 addition since the 125-B prune campaign; it carries the same evidentiary standard the removals did |
| **F11** | Completeness ground vs binding-hypothesis ground | **RULED: COMPLETENESS** (§ 4). The binding claim rides as a falsifiable hypothesis |
| **F12** | § placement before or after "System Agents" | **BEFORE** — the orchestrator precedes those it directs |
| **F13** | Does it bind a delegated agent that sub-delegates? | **RECORDED NARROW.** No `canonical/agents/*.md` references the orchestration policy (verified, zero hits), so the section reaches the main loop only. Narrow today; real if sub-delegation grows |
| **F15** | Route a standing authorship dimension onto the claims-pass template? | **DECLINED AT STACY'S SEAT, 2026-09-19** — see § 9.1. She does **not** oppose this row (*"exactly what the register is for"*); separability stated. Record: the standards-package ballot's annex (PR #185). *(This is the rule working on its first day: routed to the owning seat, ruled there, not authored here.)* |
| **F5a** | The carve-out enumeration divergence — two incompatible copies, one of which I authored | **ROUTED SEPARATELY** — unrelated defect, not folded in to inflate this measure |
| **F5b** | The stale `Fable` line in the Layer-2 orchestration doc | **ROUTED SEPARATELY** — trivial, and that doc is no longer touched by this measure |

**Dissolved by the reframe: F1, F2, F4, F6, F7, F8, F9, F14** — every one was a design decision for machinery no longer being built.

### 9.1 F15 — DECLINED, with grounds, and it strengthens this measure

F15 was this measure's **only** routed answer to the detection gap: put a standing authorship dimension on the CLOSEOUT claims-pass template. It was routed to Stacy because the template is her charter text. **She declined**, on three grounds:

1. **Out of cut.** Provenance is not a claim the task made. The question-routing test — *"was this claim verified?"* → Stacy; *"what is a completion doc required to contain?"* → Thurgood — places an authorship observation with **neither seat**.
2. **Unfalsifiable by design.** An idiom finding is **unfalsifiable by the accused**, carries **no repair path**, and — the argument that goes furthest — sitting beside counted, falsifiable findings it **teaches readers to discount the counted ones**. Her position is stronger than this row's own: **no *judgment* can own this surface defensibly, not merely no check.**
3. **A better, falsifiable surface already exists inside her cut** and is under-used: **delegated-tier note accuracy**. She records that the 127 pilot did not audit it, despite Task 1's own completion doc self-recording a tier divergence.

**This is adverse to my proposal and it improves the measure.** Ground 2 is now cited in the row's `boundary_call.rationale`: an ideological classification made by its own author is cheap; the same call reached independently by the seat that would have inherited the judgment is not. **She did not oppose the row** and stated separability explicitly.

**The residual, routed to Peter un-absorbed.** The decline leaves the sharpest case uncovered: **owner-named work carrying no delegated-tier note at all.** A missing note is not a false note, so it is silent on her surface and on every other. **Both sessions hold that an idiom observation there would manufacture appearance-of-coverage — worse than the stated gap.** No remedy is proposed. The gap is named and left open, and this measure does not pretend otherwise.

---

## 10. Conflict declaration, counter-argument, and what this does not do

**I am a party.** This measure formalizes that my seat is mine, authored by me, after my seat was sat in. That is why F11's ruling matters: **the completeness ground does not depend on my account of the injury** — it rests on a line in a doc I did not write, measurable by anyone. Peter should weigh the conflict; I have tried to remove its load-bearing role rather than argue it away.

**The strongest argument against this package, and it survives.** Peter's real concern is unknown-unknowns generalizing beyond spec creation — the loop sitting in Ada's or Lina's seat unnoticed. Against that, this offers a prose identity statement and an explicitly undetectable rule. **If the loop authored a token file tomorrow, nothing here would catch it.** The one incident we know of was caught by Peter's eye on an artifact's format — an instrument that does not scale, does not run on schedule, and did not fire for months on Spec 112.

**What genuinely answers it**: the *teaching* generalizes by construction — the section says *everything else has an owner*, not *spec docs have an owner*. One sentence covers tokens, components, product surfaces, and anything added later.

**What is honestly deferred — and it is now worse than deferred.** Detection, universally. F15 was the single routed answer, and **the owning seat declined it on grounds that go further than this measure had** (§ 9.1): not merely that no check can own the surface, but that **no judgment can own it defensibly**. So this measure ships with **no detector, no judgment dimension, and no pre-committed escalation** — and the sharpest case, owner-named work with no delegated-tier note at all, is uncovered by construction. That is the honest state, stated at ratification rather than discovered later.

**What this measure is actually buying**, stated plainly so no later reader over-reads it: **termination of re-litigation, not compliance.** The register's own purpose is that enforcement ownership is *"decided once and cited thereafter instead of re-litigated per agent, per prompt, per session"* — and this question was re-litigated four times in one sitting. The row ends that. It does not make the rule bind, and **an always-loaded, thrice-stated, ratified ownership line already failed to bind once.** A fourth surface may fail too. The claim here is that the question now gets *asked* at the decision point and *answered* in one place — not that the answer will be honoured.

Anyone reading a green corpus as evidence that seats are being respected will have made a smaller version of the error Spec 127 exists to prevent.

---

**Status**: **RATIFIED (Peter, 2026-09-19)**

*Drafted by Thurgood, 2026-09-19, on `chore/orchestrator-role-and-row` (based on `main` at `1fd79991`). Three law sites; one register row; no `canonical/**` edits, no regeneration, no MCP reindex — identity docs are not served, and the Layer-2 orchestration doc is deliberately untouched.*

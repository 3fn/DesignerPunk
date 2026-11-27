# Ballot Measure: what an inbound is — Process-Spec-Planning § "Handoff Notes", rewritten to Peter's model

**Date**: 2026-11-27 (drafted from 2026-11-27T16:34:16Z, `date -u`)
**Drafted by**: Thurgood (Civitas steward; author of Process-Spec-Planning's standards side; owner of `.kiro/issues/README.md`). **Direction**: Peter, received 2026-11-27T16:33:44Z (the orchestrator's clock), verbatim: "Re: 2 & 3, Yes", where 3 was "Your inbound definition as its own small ballot, with those five seats consulted: yes or no?" (the five: Leonardo, Lina, Ada, Kenya, Data). Recorded in ballot `2026-11-27-rule-11-lapse-window-b2` § 8, `[PETER]`.
**Authority to draft — Peter's words, verbatim** (2026-11-27, received before 16:16:43Z; his spelling kept, as quoted in `consults-2026-11-27/b2-f1-recheck-question.md`):

> Inbounds are intended to be "sticky notes" for specs that have not yet started that provide additional context that the spec will require. The inbounds surface additional context for the spec to consider such as updated work, changes in direction, missing context, reports that better form the spec, etc. I see them more as different from issues, but provide a similar function. Where issues report bugs or problems from previously completed work, inbounds provide notes that surface context before implemenetation. Honest thoughts?

And his standing rule on reading them, 2026-11-04T13:23:25Z (ballot `2026-11-04-waiting-spec-row` L223), verbatim: "We can use the inbounds as considerations for our approach rather than direction. They might inform our thinking and direction, but they were developed without the context of where we are now."

**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge of this file while this line reads DRAFT records the measure and ratifies nothing. Only Peter's dated words in this Status line ratify it. Peter ratifies the wording; his words above direct the draft and are not ratified text.
**Consulted seats** (Peter's "3 … Yes"): **Leonardo, Lina, Ada, Kenya, Data**, the seats that file inbounds. The orchestrator dispatches; the questions are in § 5. **Stacy** is not on Peter's list; she reads rule 10's findings at claims passes, and site 2 adds one. I recommend her as reviewer of site 2; that is the orchestrator's call.
**Class**: LAW. It changes what a filer must do: an obligation written only in an inbound becomes a finding (site 2).
**Amends**:
- `governance/Process-Spec-Planning.md` § "Handoff Notes (`inbound-from-*.md`)", L2823–L2835 at `8553499b1`, rewritten in place (item 1).
- `.kiro/issues/README.md` rule 10, one list gains "an inbound file" (site 2).
- `governance/classification-map.md` row `issues-obligation-lapse`: one history line (site 3).

**Cap**: one section, one list item, one history line. **Not in the cap**: the three guards on a spec answer carried out by an inbound (ballot `2026-11-27-rule-11-lapse-window-b2` item 2) and the gate's hand-add (its site 6), which this section points to and does not restate; any rule that an inbound needs an outline in general (B2 item 2's guard binds only the carrying-out case).
**Retroactivity**: none. The 53 existing `inbound-from-*` files are read under the text they were written against. Site 2 binds inbounds added after the application merge. An obligation that today lives only in an existing inbound is not a retroactive finding; where a consulted seat knows of one, it is filed as a record under rule 10 by its owner (§ 5, question 2).

> **Conflict of interest, stated first.** I wrote much of Process-Spec-Planning, I own the README, and I file inbounds myself (seven of the eight in 131's directory are mine, by their `**Author**:` lines). Peter's words are verbatim above; the elements I add beyond them are marked **[author's addition — Peter rules]**. The five seats' consults and Peter's ruling are the checks.

---

## 1. The gap

Process-Spec-Planning § "Handoff Notes" (VERIFIED at `8553499b1`) defines an inbound as a note written "when one spec (or a named analysis) produces decisions, findings, or obligations that a different spec must consume". Three things in it differ from Peter's model:
1. **"obligations"**: Peter's model puts obligations in issue records ("different from issues, but provide a similar function"), and rule 10 already requires an obligation a ruling creates to be filed as a record. Today an inbound may hold an obligation no record holds, and nothing reads it as owed.
2. **Its sources** are "a spec or a named analysis". Peter's list is wider: "updated work, changes in direction, missing context, reports that better form the spec".
3. **It says nothing about records.** Since B2's item 2 (F-1 answered (a), Peter, 2026-11-27T16:33:44Z), an inbound that names a record can carry out a spec answer. An inbound that restates a record's items is a second copy the owner's rule-9 edits do not update (the R3 re-check, Thurgood and Stacy).

## 2. The rewrite (operative text, proposed)

### Item 1 — the section, rewritten in place

**Before** (L2823–L2835 at `8553499b1`, byte-exact):

````
#### Handoff Notes (`inbound-from-*.md`)

**Current practice**: when one spec (or a named analysis) produces decisions, findings, or obligations that a different spec must consume, a handoff note is written into the receiving spec's directory:

```
.kiro/specs/[receiving-spec]/inbound-from-[source].md
```

- The source may be a spec number (`inbound-from-118.md`) or a named analysis (`inbound-from-wordpress-thesis.md`)
- Handoff notes capture what the receiving spec must honor or evaluate during formalization — they are inputs to the design outline, not spec artifacts themselves
- During formalization, the spec author reconciles all inbound notes into the outline and formal documents

Precedents in the spec record: 118, 119, 122, 123, 124, and 125 all carry inbound handoff notes.
````

**After**:

````
#### Handoff Notes (`inbound-from-*.md`)

**What an inbound is**: a note of context for a spec that has not yet started: updated work, a change in direction, missing context, or a report that better forms the spec. An issue record reports a problem in completed work and holds an obligation; an inbound surfaces context before implementation. The spec reads its inbounds as considerations for its approach, not direction. It is written into the receiving spec's directory:

```
.kiro/specs/[receiving-spec]/inbound-from-[source].md
```

- The source may be a spec number (`inbound-from-118.md`), a seat and a date (`inbound-from-lina-2026-11-04.md`), or a named analysis (`inbound-from-wordpress-thesis.md`).
- The file names its author on an `**Author**:` line near its head.
- **An obligation lives in an issue record, never only in an inbound** (`.kiro/issues/README.md` rule 10). An inbound that bears on a record points to it by path (`.kiro/issues/<file>`) and does not restate its items; the record stays their only home. An inbound never closes or re-rules a record (rule 11).
- Inbounds are inputs to the design outline, not spec artifacts. During formalization the spec author reconciles every inbound into the outline and formal documents, and lists each record an inbound names at the requirements gate (§ "Before Formalizing: Records That Name the Spec").

Precedents in the spec record: 118, 119, 122 to 125, and 128 to 131 carry inbound notes. *(amended <application date> by ballot 2026-11-27-inbound-handoff-notes-definition item 1; prior text at `8553499b1`)*
````

**What each part carries**:
- **"What an inbound is"**: Peter's words, in the doc's register. "Specs that have not yet started", the four kinds of context, the contrast with issues, and his 2026-11-04 rule ("considerations for our approach rather than direction").
- **The `**Author**:` line**: **[author's addition — Peter rules]**. Today's convention, unwritten (39 of 53 intake files carry an author or source header in their first 12 lines; Stacy R3). B2's item 2 already requires it of an inbound that carries out a spec answer; this makes it the rule for every inbound, so the carrying case is not the only one with a named filer.
- **Obligations in records**: Peter's "different from issues", made into a rule with rule 10 as its home.
- **Point by path, do not restate**: the drift guard from the R3 re-check. Not mechanical; a claims-pass read.
- **"never closes or re-rules a record"**: restates B2 item 1 ("nothing outside the record's own file") for the reader of this section. If B2 item 1 is not ratified, this sentence is the only place it is said, and stays true as a rule of this section.
- **"lists each record an inbound names at the requirements gate"**: points to B2's site 6, which widens the gate's hand-add. If B2's site 6 has not merged when this applies, the pointer still reads true of the gate's existing hand-add for outlines and is completed by site 6.
- **The source examples** gain the seat-and-date form most recent inbounds use. **The precedents line** is brought current (VERIFIED: the 10 spec directories holding `inbound-from-*` files at `8553499b1`).
- **The pointer**: `governance/**` owes one (ballots README § "Where the pointer is owed").

### Site 2 — `.kiro/issues/README.md` rule 10, the list of places an obligation may not live alone

- **Before** (at `8553499b1`): "An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it."
- **After**: "An obligation stated only in a plan line, a carry list, a walk table, a rulings row, a PR body or an inbound file, citing no record, is a finding on the PR that wrote it *(ballot 2026-11-27-inbound-handoff-notes-definition, site 2)*."
- **Why**: item 1's "never only in an inbound" needs a consequence a reader can find, and rule 10 is where every other such surface is listed. The README owes no pointer; it carries the inline citation (ballots README § "Conventions").
- **Severable**: if a consulted seat shows that existing practice depends on obligations in inbounds, Peter may strike site 2 and keep item 1's sentence as guidance.

### Site 3 — `governance/classification-map.md` row `issues-obligation-lapse`

One history line: "README rule 10's list gains 'an inbound file' (ballot 2026-11-27-inbound-handoff-notes-definition site 2); rule line, checks and check_state unchanged." `**Edit kind**: governance/classification-map.md — EXECUTION (this ballot site 3)`.

## 3. Application, sequencing, census

**Application** (one PR, Peter-merged, after the Status commit):
- `**Edit kind**: governance/Process-Spec-Planning.md — LAW (.kiro/docs/ballots/2026-11-27-inbound-handoff-notes-definition.md)`; the README carries no Edit kind line (not a governance path); the register line as above.
- Checks: `npm run -s check:section-citations`; `npm run -s check:122:diff-guard` (the lock is refreshed: `governance/` is an input-closure root); `npm run test:scripts`; `node scripts/validate-steering-metadata.js`; `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <N>`; after merge, the docs MCP's `rebuild_index`.
- Straggler sweep: `git grep -n -F "inbound" -- governance .kiro/steering canonical/agents .kiro/hooks/RELEASE-FLOW.md .kiro/issues/README.md`. Each section holding a hit is read whole; a hit that says an inbound holds an obligation is `fixed` in this PR or `left:` with its owner and a rule-10 record.

**Sequencing with B2** (`2026-11-27-rule-11-lapse-window-b2`, #862). Both edit `governance/Process-Spec-Planning.md` (B2 site 6 at L141; this item 1 at L2823–L2835), `.kiro/issues/README.md` (B2 rule 11; this rule 10) and the same register row's history. No hunk overlaps, and neither text depends on the other's wording. **Order: B2's application first, then this one.** B2 is further along (four rounds, F-1 answered); this one waits on five consults. This one rebases over B2 and appends its history line after B2's. Both refresh `canonical/generated.lock`, so this application also takes its place in the lock queue after B2, records-home and A-5, unless the orchestrator orders it otherwise.

**Census** (ballots README § "Conventions", "Instrument census"). The section is in a file `governance-examples` loads (condition 1); rule 10 is cited by row `issues-obligation-lapse`'s education, whose `checks` names `fired-records` (condition 2).
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts) — Process-Spec-Planning.md is in its scope; item 1's text carries no token name, no CSS attribute and no example block outside the path pattern it already had, so its verdict for the file is unchanged` *(UNVERIFIED by a run: the application PR runs `npm run test:scripts`, and a changed verdict stops it)*
- `**Census**: not in scope — fired-records (scripts/issues-owned.sh --pr; warn-only) — it reads Trigger lines and archive moves only; rule 10's list is read by no code`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — no site adds a get_section / get_document_* citation`
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — governance/ is an ordinary closure input; the lock is refreshed at application`

## 4. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: item 1 and sites 2–3 as written.

**Counter-arguments**:
- **(i) It adds a duty to five seats' filing habits.** An obligation written only in an inbound becomes a finding.
- **(ii) "Context, not direction" can hide a real requirement.** An inbound that carries "missing context" the spec "will require" (Peter's word) is close to an obligation.
- **(iii) The `**Author**:` line is beyond Peter's words.**

**Folded in**:
- From (i): site 2 binds only inbounds added after application, and is severable. The cost to a filer is one record per obligation, which rule 10 already asks of rulings and passes.
- From (ii): the line is drawn by who owes it, not by its subject. Context the spec must consider stays in the inbound, and the formalizer reconciles it. Something a named seat owes by an event goes in a record, which the inbound points to.
- From (iii): marked as my addition. It writes down a convention 39 of 53 files follow, and B2's item 2 requires it in one case already.

**What survives**:
1. **The boundary between "context the spec will require" and "an obligation" is a read, not a test.** Two filers will draw it differently, and the claims pass will find some of each.
2. **The drift guard is not mechanical.** A restated record drifts until a reader notices.
3. **Existing inbounds that hold obligations stay as they are**, unless their seats file records (§ 5, question 2).

## 5. Who is asked what (the orchestrator dispatches; one file per seat)

Each of Leonardo, Lina, Ada, Kenya and Data is asked the same five questions, read-only, at this ballot's head:
1. Does item 1's "What an inbound is" match how you write inbounds? Name any inbound of yours it would not describe.
2. Do any inbounds you filed hold an obligation that no issue record holds? List them by path; each is yours to file as a record under rule 10 (not a retroactive finding).
3. The `**Author**:` line: do you accept it for every inbound?
4. Site 2: do you accept that an obligation written only in a new inbound is a finding on the PR that adds it? If not, should Peter strike site 2?
5. Anything in your own workflow (screen specs, platform intake, token or component handoffs) that the rewrite breaks.

## 6. Forks for Peter

None drafted as forks. Site 2 is severable on the consults' answers (§ 2). If a seat answers question 4 "no", it comes to Peter as F-1 at R2.

## 7. Review round record

*(Empty at draft. Each seat's entry is spliced here, byte for byte, by the holder.)*

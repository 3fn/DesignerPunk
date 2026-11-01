# Inbound from release 16.2.0's phase-1 readiness walk: ten places where RELEASE-FLOW and the issues README do not work as written, for Spec 131

**Date**: 2026-10-30 (UTC; written from 2026-10-30T00:36Z by `date -u`; 2026-10-29 in America/New_York)
**Author**: Thurgood (Spec 131's formalizer; the 16.2.0 walker), at the orchestrator's direction.
**Peter's words**: chat, relayed by the orchestrator, received before 2026-10-30T00:07:19Z, verbatim: *"Proceed as you recommend."* That is the go for the 16.2.0 walk: start the release, run phase 1 first as the readiness check, and tag and publish only if phase 1 is clean. It is not a direction to write this note; the orchestrator directed that. *Unverified here: chat only, relayed; no committed file of Peter's says it.*
**Source**: `.kiro/issues/2026-10-29-release-16.2.0-walk.md` § "Lessons for Spec 131 (the flow as written vs as run)", on branch `chore/release-16-2-walk`, PR #565, **open at this note's base `2c00cea49`**. Its commits: `f58639769` (the walk record), `d638fe576` (rule-5 closes), `a749d18a5` (20 lapse headings). The path resolves at the root once #565 merges, and in `archive/` once the walk record closes after phase 1 (README rule 3).
**Status of 131**: design outline at R3, paused at the edge of requirements (`design-outline.md`). No `requirements.md` exists at `2c00cea49`. Priority unchanged: 129 → 131 → 128 → 130.
**Consulted**: none needed — an inbound records open questions; it rules none.

---

## 1. What this note asks of 131

**The simplification should remove or mechanize these ten, not add rules.** Each lesson below is a place where the written flow assumed a step, a seat or a form that running it did not supply. The tempting repair for each is one more sentence of law. The outline already argues against that: § 4 (d) freezes new law except deletions and CORRECTION edits, metric 5 asks that rules retired ≥ rules added, and metric 1 asks that Peter's required decisions per release go down. Every "possible fix" below is written as a deletion, a computation or a move into the generated release findings report (§ 5, F-6, RULED), and each carries the counter that survived working it.

At requirements, under `governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec", **take each lesson in, or leave it out with a reason**, with one disposition line per lesson in the requirements feedback round. Taking them in is that round's call, not this note's. Section 5 names the existing records each lesson touches, so the round can dispose of them together.

## 2. The headline numbers

All from the walk record at `a749d18a5`, measured at `main` `2c00cea49`:

- **The walk's size**: the due-row grep returns 44 `**Trigger**:` lines in 43 records (one record has two lines, L6). With the P0 grep's one extra record, the walk has **44 rows**, plus the delegate row D. `scripts/issues-owned.sh`, run for all eight seats, prints **73 per-seat lines** for the same 43 records.
- **Projected at 16.2.0's S** (as the records stand after #565, if nothing closes or re-rules them first): **40 lapses**, of which **31 escalate to Peter** with spec / drop / fix-now (13 second lapses, 9 first lapses of P0 or P2 `(guard)` records, 9 already escalated and lapsing again).
- **Unanswered escalations**: the **9** records that go to Peter "again" have had no answer of Peter's on record since 16.1.0's S (`38f4ece47`, 2026-10-26). 16.1.0 escalated nine; one was answered (`arming-read-class-option-fork`, "Go with (a)", 2026-10-26), and native-readiness's escalation, owed since its own first lapse, is the ninth.
- **Lapse headings**: Stacy's phase-1 recount lists **24** records that lapsed at 16.1.0's S. **21 of the 24 had no `## Lapse` heading** three days later: 20 at the root, plus one archived without one (`2026-10-25-core-goals-l59-vs-product-token-authoring.md`). The walk appended the 20 at `a749d18a5`.
- **The ordering**: RELEASE-FLOW puts Peter's bump ratification (item 3) before the walk (item 3a). This walk ran on a **proposed** 16.2.0, with the bump as its first `**Open for Peter**:` line, because the bump question (16.2.0 or 17.0.0, over #517's `token-index/` widening) came out of the delta reading the walk does.
- **Rule 11's re-rule clause**: read literally, "no commit that is an ancestor of the event's commit … re-ruled it" means **a record re-ruled once is immune to every later firing**. Stacy's recount reads it differently: a re-rule that only set the firing token does not discharge that firing. The rule says neither.

## 3. The two classes, and the four that are neither

**The first inbound's class — governance reaches it, no seat holds it** (`inbound-from-2026-10-29-unowned-paths.md` § 1). The first inbound found it in paths and record directories. This walk finds it in **duties** and in **surfaces outside git**:
- **L3** — the lapse heading is a duty "whoever observes" owns, which in practice is no one.
- **L9** — the CHANGELOG's `## [Unreleased]` section is a surface no seat and no step writes between releases.
- **L7** and **L8** — a variant: the input is outside git (PR bodies; per-machine session stores), so no seat's checkout holds it, and only a credentialed or same-machine session can read it.

**The escalation-delivery class — the rule produces a decision for Peter and no form carries it to him.**
- **L4** — the class itself: rule 11 escalations have no delivery form, and its re-rule clause is ambiguous.
- **L3** — feeds it: the escalation count is read from headings nobody wrote. L3 is in both classes.
- **L5** — feeds it from the other side: a record left open after its fix lapses and escalates, so Peter is asked about work that is already done.

**Neither class**: **L1** (step ordering), **L2** (an instrument's count read as the walk's size), **L6** (a record shape the grep double-counts), **L10** (a place where the flow worked; its lesson is "keep this").

## 4. The ten lessons

Each lesson has four parts: the evidence; the mechanism it indicts; a **possible** fix, which is a candidate and not a decision; and the counter that survived working the fix.

### L1 — Ratify-then-walk is inverted in practice

- **Evidence**: RELEASE-FLOW item 1 says the due-row paste runs at item 3a "once the bump is ratified", and the paste opens `V=<ratified version>`. The walk record's filename, its Trigger token (`release:16.2.0:phase-1`), the grep's `V` and the delegate's output path (`delegate-audit-release-16.2.0-lina.md`) all need the version. The 16.2.0 walk ran on a proposed version, and its header says a different ratification re-cuts all five. The bump fork itself (16.2.0 minor, or 17.0.0 if `token-index/` is public API) came from reading #517 in the delta, the work items 1–2 and 3a do. A `17.0.0` grep finds no version-specific token (exit 1), so the due set is the same 43 `release:next` records either way.
- **Mechanism**: RELEASE-FLOW § "Deriving the delta" items 1, 3 and 3a: the ordering, and the version-keyed names.
- **Possible fix**: let the walk run before the bump, and key its names by something the walk already knows. The record is `release-next-walk.md` (or keyed by the `main at:` SHA), and the delegate path takes the version only at the bump PR. The version-specific grep (`release:<V>:phase-1`, `tag:v<V>`) re-runs as one line in the bump PR. Item 3 then ratifies the bump from the walk's reading, and the text matches the run. This removes a re-cut; it adds no rule.
- **Surviving counter**: the version-specific tokens exist so a record can target one release. A `next`-keyed walk has to run their grep a second time once V is known, which is the re-cut in a smaller form. A record keyed by SHA is also harder to find by name than one keyed by version. Separately: if Peter would rather rule the bump before any walk work, the cheaper repair is the reverse, to state the bump question at item 2 and stop. That is a fork between two defensible orders, and the pick is his.

### L2 — `issues-owned.sh` per-seat counts are not the walk's size

- **Evidence**: run for all eight seats at `2c00cea49`, the per-seat lines sum to **73**: Ada 12, Lina 18, Thurgood 26, Leonardo 3, Sparky 1, Kenya 1, Data 2, Stacy 10. The due set is **43 records** (`comm -3` against the grep is empty). By first-named owner the 44 rows are Thurgood 18, Lina 15, Ada 8, Leonardo 1, Stacy 1, Peter 1. A brief sized from the per-seat lines over-counts by 70% (73 ÷ 43). The orchestrator's brief also said 62 PRs where `git log v16.1.0..2c00cea49 --first-parent` returns 61.
- **Mechanism**: Start Up Tasks item 9 and `scripts/issues-owned.sh`'s output: one line per record per seat named in its Owner line. The instrument is right for item 9's question ("what is mine?") and wrong for the walk's ("how many records?"), and nothing says which question a count answers.
- **Possible fix**: the walk's size, and every count a brief or a walk record states, comes from the command that computes it (the due-row grep, `git log`), pasted, and never from a per-seat tally or a summary. This is the outline's row 8 ("census at draft": one sentence, "run it") applied to briefs. In the generated release findings report, the size is a computed line.
- **Surviving counter**: this is a reader's error, not the instrument's. A deduplicated total line in `issues-owned.sh` would be one more line to misread, and deduplicating would hide real co-ownership load: a record with three owners is three seats' reading. If the fix is only "briefs cite the grep", it is a habit, and habits are what this walk found failing (L3, L5).

### L3 — Lapse headings owed at S have no assigned seat

- **Evidence**: 24 records lapsed at 16.1.0's S `38f4ece47` (Stacy's recount, `claims-pass-release-16.1.0.md` § "What lapses at S, recounted from commits that are ancestors of S"). Three carried a heading naming `38f4ece47`, from Stacy's #512. One was archived without one. **The other 20 had none** from 2026-10-26 until the walk appended them at `a749d18a5` on 2026-10-29. Stacy's pass declined to append them in a record-only PR and reported them instead, which item 9 allows. Rule 11 counts lapses as "the number of distinct SHAs" the headings name, so without the 20 headings, the second lapses projected at this S would read as first lapses. By my count from the walk's lists, 11 of the 13 second-lapse escalations would then not be counted, because a first lapse of a P1 or a P2 `(record)` record does not escalate (the other two already carried Stacy's headings).
- **Mechanism**: README rule 11: "Whoever observes a lapse — the walker, the walk's author, a claims pass, an owner at session start (Start Up Tasks item 9) — appends `## Lapse (YYYY-MM-DD)`", and "the count is the number of distinct SHAs they name". Four possible seats, none of them required.
- **Possible fix**: **compute lapses; do not record them.** A lapse is a fact about git: a firing commit (the release's S, named by its tag), and no close or re-rule of the record in an ancestor of it. An instrument (`issues-owned.sh`, or the release findings report's generator) prints each record's lapse count from history, and the heading duty is deleted from rule 11. This retires a duty and a convention; it adds an instrument line.
- **Surviving counter**: the computation needs a decidable "re-ruled" predicate, and rule 11's is not decidable as written (L4: "a diff carrying a dated reason and authority" is a judgment, and the immunity reading is open). The instrument would encode one reading silently, where a heading is a visible, signed, disputable commit, as the walk's 20 headings are ("They are one commit, so they can be dropped whole if Peter or an owner reads it otherwise"). So L3's fix depends on L4's being settled first.

### L4 — Rule-11 escalations have no delivery form, and its re-rule clause reads two ways

- **Evidence**: 16.1.0's S escalated **9** records to Peter "on paper", in Stacy's recount and in #494's body. One has an answer since; for the other eight, and for native-readiness's escalation owed since its first lapse, the walk found **no answer of Peter's on record**. 16.2.0's S projects **31** escalations: 13 second lapses (3 P1, 10 P2 `(record)`), 9 first lapses (1 P0, 8 P2 `(guard)`), and those 9 again. Of the 40 projected lapses, 16 are the steward's own records, 12 of them among the 31. On the re-rule clause: records such as `2026-10-20-web-element-api-and-form-participation.md` (re-ruled `df56d0ebc`, before 16.1.0's S) are projected to lapse at 16.2.0's S, which the literal reading forbids; `2026-09-28-full-survival-assent-signal-instrument.md` was re-ruled (back-filled) on 2026-10-20 and Stacy counted it as lapsing at 16.1.0's S, which the literal reading also forbids.
- **Mechanism**: README rule 11 § "Escalation": "the record goes to Peter with exactly three options". It does not say where, in what form, whether it holds anything, or what happens when he does not answer, except for the spec answer (each later lapse "returns the record to Peter"). The re-rule clause: "no commit that is an ancestor of the event's commit … re-ruled it". Adjacent, already open: `2026-10-26-rule-11-standing-records-lapse-reading.md` (every firing of a standing record reads as a lapse).
- **Possible fix**: two parts, both narrowing.
  1. **Delivery**: escalations are a computed section of the generated release findings report's "decisions for Peter" (§ 5, F-6), one line per record with the three options and the record's own proposal. Rule 11 states no form of its own. This deletes the "on paper" path and adds nothing Peter has not already ruled.
  2. **The clause**: a re-rule discharges only the firing it precedes, and only if it moves the token to a later event; restating `release:next:phase-1` discharges nothing. One sentence replaces the current one; it does not add a rule.
- **Surviving counter**: delivering 31 decisions per release to Peter moves metric 1 the wrong way. The volume may be the real finding: rule 11's thresholds escalate too much, especially P2 `(record)` second lapses (10 of the 31). The opposite candidate is to escalate less (P0 and P1 only, say) and let the report list the rest without a decision. **That is a fork between "deliver them all" and "escalate fewer", and the pick is Peter's.** Neither option says whether a record that is never fixed and never dropped is a problem; the report only makes it visible.

### L5 — Fixing PRs leave records open

- **Evidence**: #452 (`a6ed875a9`, 2026-10-23) fixed the P0 `2026-06-25-component-schema-token-name-drift.md`; the record sat at the root six days marked resolved until the walk archived it at `d638fe576`. #534 (`937915411`) and #557 (`ee9ae4725`) fixed `2026-10-27-publish-rows-census-fields.md` and neither closed it (the steward's own miss). The 16.1.0 walk record, owed to "close and archive after phase 1", was still at the root after #497 (`55c218cfd`): it lapsed and was closed at `d638fe576`. Adjacent: `2026-10-25-issues-owned-fired-ignores-outcome-lines.md` (the instrument reads a closed-by-outcome record as fired).
- **Mechanism**: README rule 5, "ideally in the PR that closes it, otherwise at the next health-check walk"; rule 11, "A fixing PR closes its record by adding rule 5's outcome line in the same PR". Both are stated as duties, and neither is checked.
- **Possible fix**: drop the separate archive move. A record whose outcome line is on `main` is closed for every computation (lapse, owed, walk) whether or not it has moved, and the move becomes housekeeping a script does at the walk. Rule 5's "ideally … otherwise" sentence goes. A record a fixing PR forgot entirely still needs a human, so pair it with the report's list of records whose cited fix has merged.
- **Surviving counter**: "fixed" is a judgment, and the risk runs both ways. An automatic close on a PR's claim closes partial fixes (#452 closed only the names half; the completeness half moved to another record), and that claim is exactly what the claims pass exists to check. A PR-time check that a fixing PR adds its outcome line would be a new required check during the freeze (§ 4 (d)). Only the "outcome line on `main` is enough" half is a pure removal.

### L6 — Two column-0 Trigger lines in one record

- **Evidence**: `2026-10-15-123-onboarding-trio-recurring.md` has `**Trigger**: ` at column 0 on L6 and L57. The due-row grep counts 44 lines in 43 records, and a walker who counts lines gets 44 records. `scripts/issues-owned.sh` names the shape as its known gap: "a record with more than one **Trigger**: line can have <tc> moved later by a change to a later line, which can hide a path: fire."
- **Mechanism**: README rule 1 defines the Trigger line's form but not that a record has exactly one; the grep and the instrument both assume one.
- **Possible fix**: fix the instance (make L57 not a column-0 Trigger line; old triggers already have a `(was: …)` form). Add a mechanism only if the shape recurs: then `issues-owned.sh` prints a record with two Trigger lines as `untokened`, as it already does for a malformed one.
- **Surviving counter**: if 131's rewrite of the README (row 13: 12 rules to about 5) replaces the Trigger line with a different structure, any check on the old form is wasted work. The instance costs one edit, and the walk caught it by hand.

### L7 — RS-38's input lives outside git

- **Evidence**: the straggler-sweep population in the 16.2.0 delta is #524, #541, #557 and #560 (PRs changing a script that RELEASE-FLOW or a register `checks` line names by path). Only #541's squash message carries `**Straggler sweep**:` text; #524's, #557's and #560's do not, and #524 merged before the convention. The read is specified "from the PR body (`gh pr view <n> --json body`, run for this seat by a session holding credentials), never from the squash message", so a session without `gh` credentials cannot perform it. The walk could only point at it. `**Edit kind**:` lines are read from PR bodies the same way (Task-Completion-Protocol § "Branch and PR Conventions").
- **Mechanism**: RELEASE-FLOW step 5, phase 1 (RS-38, amended at #541), and the ballots README § "Conventions": the input is a PR body, outside git.
- **Possible fix**: read these lines from git. Either the convention puts them in the squash commit message (GitHub can default the squash message to the PR description; whether this repository's merges already do, and how often a merger edits it, is unverified here, and the setting is Peter's), or the line lives in a committed file the PR adds. A reader then needs a checkout, not credentials.
- **Surviving counter**: the PR body was chosen deliberately: it is the text the reviewer saw, and a squash message can be edited by the merger at merge time. Reading from git trusts the merged text over the reviewed text. A settings change is also outside git, so it does not remove the dependency on something no commit records. This is a choice of which trust to keep, and it is Peter's.

### L8 — The delegate's store reach depends on where sessions ran

- **Evidence**: since #524 (`5119afe4b`), `verify-signing-chain.ts --audit` reads by default the main checkout's session store and every `<slug>--claude-worktrees-*` sibling. A session that ran in a scratchpad worktree outside the repository root, as this one does, is read only when passed as `--store <dir>`. The walk's delegate brief had to say so (§ "Delegate audit brief", term 2), and an unread store prints `record absent`. Related open records: `2026-10-26-signing-chain-audit-false-verdicts.md` (false FAIL and anomaly verdicts) and `2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md` (16.1.0's Peter sample read `0 / 135`).
- **Mechanism**: ballot `2026-10-01-signing-act-chain` § 5.3 (the delegate audit and Peter's sample) and the instrument's store discovery: the evidence is per-machine session state, outside git.
- **Possible fix**: **retire rather than extend.** The outline's row 20 already marks Peter's sample "D, recorded 'never ran'" and replaces it with his read of the generated release findings report (F-6). 131 can decide whether the delegate audit of Stacy-signed acts survives that ruling. If it does, the narrower candidate is store discovery from `git worktree list`, so that every worktree of this repository on this machine is found without a flag.
- **Surviving counter**: the session store is the evidence that the named seat actually ran; a record in git is written by the same session and is not independent. No discovery reaches a session on another machine, so the audit can never be complete. Retiring it gives up the only check on the verifier that is not the verifier, which is the row-20 outcome ("an independent check on the verifier") stated as unmet, not as met another way.

### L9 — No `[Unreleased]` entries accrue

- **Evidence**: `CHANGELOG.md` is unchanged since `v16.1.0` and has no `## [Unreleased]` section. Shipped-surface PRs in the delta, among them #517 (the `token-index/` shape), #535 (system-token review and product-token planning) and #564 (the packed `prepublishOnly` message), added no line. The release author writes the entry whole, from the delta.
- **Mechanism**: RELEASE-FLOW step 2, "retitle `## [Unreleased]` to the version", which assumes a section that no rule fills: no step or seat writes a CHANGELOG line when a shipped-surface PR merges.
- **Possible fix**: delete the retitle instruction and generate the CHANGELOG draft at release time from the `files[]`-scoped delta (the squash titles item 1 already reads), for the release author to edit. The draft is one more output of the release findings report's generator, not a new duty on every PR.
- **Surviving counter**: squash titles are written for reviewers, not consumers. The CHANGELOG is where a human writes the consumer-impact judgment (for example, naming #517's shape change under "Changed"), and a generated draft invites signing off the titles. The other candidate, a check that a PR touching `files[]` adds an `[Unreleased]` line, puts that judgment on the PR author, who may not know the release's framing, and it would be a new required check during the freeze. **That is a fork between a generated draft and per-PR accrual.**

### L10 — The shipped surface is wider than a summary

- **Evidence**: the orchestrator's brief listed steering docs, charters and `src/`. `package.json` `files[]`, read literally at `2c00cea49`, also carries **8 changed `governance/` docs** served by the docs MCP and **`token-index/`'s three files** changed by #517, which the Application MCP reads at run time. An esbuild metafile of `consumer-entry.ts` (32 inputs) showed that the `tools/agent-generator/` changes (#524, #554, #561) reach no shipped file.
- **Mechanism**: RELEASE-FLOW item 1, "authoritative list: `package.json` `files[]`". **The flow held here.** The lesson indicts summaries used as inputs, not the rule.
- **Possible fix**: keep item 1's sentence. If anything is mechanized, it is the derivation: a command that prints the `files[]`-scoped delta, including the build inputs of `dist/` (`src/`, `canonical/`, `tools/agent-generator/`), so no brief's summary is ever the input.
- **Surviving counter**: a script encodes today's mapping from build inputs to `dist/` and drifts when the build changes; the literal `files[]` read plus judgment is what caught it this time. The risk for 131 is the reverse of the other nine: **a simplification pass that trims item 1 as wordy deletes the one line that worked.**

## 5. Records this note names, for the requirements round's disposition

Already open, each touched by a lesson: `2026-10-26-rule-11-standing-records-lapse-reading.md` (L3, L4), `2026-10-25-issues-owned-fired-ignores-outcome-lines.md` (L5), `2026-10-26-signing-chain-audit-false-verdicts.md` and `2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md` (L8), `2026-10-26-issues-owned-register-row-checks.md` (L2, L3, L6: the instrument any computed fix would extend). The first inbound's `2026-10-29-release-records-home-switch.md` is re-ruled in #565 and stays that inbound's.

No new issue record is filed. This note rules nothing and creates no obligation beyond the disposition lines § 1 asks of the requirements round, which Process-Spec-Planning already requires for records that name the spec.

The ten are the class. What 131 decides is whether the simplification removes or mechanizes them, or leaves each out with a reason.

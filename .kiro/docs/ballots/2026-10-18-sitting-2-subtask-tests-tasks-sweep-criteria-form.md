# Ballot Measure (sitting 2): subtask test scope, the tasks-round sweep, the criteria form (D4), and three riders (the D-2 Status line, the § 5.3 amendment, the D3 pattern-set amendment)

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward), at the capped sitting Peter opened on 2026-10-18 ("Go on the W-1 records PR and the capped sitting", relayed in the orchestrator's brief). This is step 2 of the W-1 triage; step 1 is the records PR on `chore/w1-records-closes-and-tokens`, which re-rules the six source records' triggers to this sitting.
**Status**: **DRAFT.** Merging this file ratifies nothing: **merge = nothing.** Ratification is Peter's word on the record, committed first as a Status line (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"), before any edit site is applied.
**Held under the merge rule** (Task-Completion-Protocol § "Branch and PR Conventions", the M8 bullet): this PR's body carries one `**Open for Peter**:` line for each fork in § 3 and each item marked "Peter rules", and it is **not merged until Peter's answer to each is on the record**, dated before the merge.
**Authority for drafting**: the 2026-10-17 health check, finding W-1 (`.kiro/docs/civitas-health-checks/2026-10-17.md` L80–88: seven of Thurgood's records fired without a record; "the four ballot drafts are better as one ballot sitting than four"); each source record's own trigger (§ 1); Peter's routing of 2026-10-18 (above).
**Required reviewer**: **Stacy**. S1's edit site is a unit she confirms and signs. S3, S4 and S6 amend the law of an instrument whose verdicts she reads. S5 changes who audits her own signing acts. S2 is a planning rule whose independent reader (A3) would be her LENS.
**Unit**: standalone record-first ballot. Its application edits `.kiro/steering/start-up-tasks.md`, `governance/Process-Spec-Planning.md`, `governance/completion-documentation-guide.md`, `governance/classification-map.md` and `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`, so **Peter merges it** under the governance carve-out.
**Cap**: exactly the six items below. Anything I was tempted to add is in § 5, with where it goes instead.
**Severability**: each item can be struck alone, and **a clause that cites a struck item is removed with it**. The one cross-item citation: S3's sub-branch A-ii relies on S4's `—` sentence. S5's § 8 (d) edit falls with S5's § 5.3 edit.
**Item numbers — a mismatch to fix before either PR merges**: the records PR (`a6de2ee76`, read-only) labels D3 as "S4", D-2 as "S5" and trigger (d) as "S6". This ballot follows the sitting brief: **S4 = D-2, S5 = trigger (d), S6 = D3.** S1–S3 agree. One of the two must be renumbered; the records PR is three tokens.

> **Conflict of interest, stated first.** The author owns all six source records and lapsed on every one (W-1). He authored the `tasks.md` that nests criteria in 11 parents (S3), owns the instrument whose law S3, S4 and S6 amend, and is the profile author whose rows Stacy signs (S5). Where a lean below favours less work for his seat, the residual says so.

---

## 1. The gap (verified at `c470a248f`)

| Item | Source record | What fired, and when | Class (records PR) |
|---|---|---|---|
| S1 | `.kiro/issues/2026-10-01-startup-tasks-5-vs-tcp-subtask-tests.md` | U2b merged (#262, 2026-10-02); the draft was owed then. Its rider deadline, "the next ballot that edits either doc", passed **first at #396** (W-9 execution, 2026-10-17, which edited Start Up Tasks item 2) and again at #408 (TCP) | P2 obligation (record) · defect |
| S2 | `.kiro/issues/2026-10-01-plan-blast-radius-and-carry-tracking.md`, half (a) | #262, and the next tasks round; half (b) is closed by README rule 10 in the records PR | P3 improvement · owed-act |
| S3 | `.kiro/issues/2026-09-26-criteria-form-law-vs-practice.md` (D4) | the Q2 sitting (parity armed 2026-10-03) | P2 obligation (record) · defect |
| S4 | `.kiro/issues/2026-10-03-completion-criteria-parity-status-marks-gap.md` (D-2) | the 15.1.0 RELEASE pass (2026-10-13), again at 16.0.0 | P2 obligation (guard) · defect |
| S5 | `.kiro/issues/2026-10-03-stacy-signed-sample-trigger-d.md` | the 15.1.0 RELEASE pass, again at 16.0.0 | P2 obligation (guard) · owed-act |
| S6 | `.kiro/issues/2026-09-26-materiality-extractor-truncation.md` (D3) | the Q2 sitting; the check has been required since 2026-10-03, so the defect now bites a required gate | P2 obligation (guard) · defect |

The records PR's S1 triage line says the rider deadline passed at #408. It first passed at #396 (`42a6ba716`, 2026-10-17: `.kiro/steering/start-up-tasks.md` and two of its signed units changed). That correction belongs in the records PR, not here.

---

## 2. The items

### S1 — Subtask test scope: Start Up Tasks item 5 against the TCP

**The contradiction, re-verified at head.**
- `.kiro/steering/start-up-tasks.md` L79–80: "**WHEN validating regular task completion THEN:** - Use `npm test` (default - excludes performance tests)". Item 5 separates this from "parent task completion" (L84), so "regular" covers subtasks. The decision tree's non-parent leaf (L100) also reads `npm test (default)`.
- `.kiro/steering/Task-Completion-Protocol.md` L37, § "For SUBTASKS" step 1: "Run targeted tests relevant to the change (not the full suite)". L152 restates it.
- **Who reads it**: DesignerPunk's own agents only. The consumer rendering already resolves it the TCP's way. `canonical/profiles/consumer/always-set/start-up-tasks.overlay.md` L16 reads "**WHEN validating a subtask THEN** run the tests relevant to the change (not the full suite)", and Stacy's signed assent (`always-set/start-up-tasks.dispositions.yaml` L12) drops item `test-command-selecti-2` from the survivors. The source record's "a consumer agent reads the contradiction as written" no longer holds.

**The signed unit, measured from the anchors (not simulated).** Item 5 is unit `#item-test-command-selection-guidelines` in `canonical/operative-sets/start-up-tasks.yaml` (L156–199): `canonicalHash: sha256:b4c82938…`, 10 items, owner thurgood, confirmer stacy. Its confirmation is `canonical/profiles/consumer/confirmations/start-up-tasks.md` L117–127 (2026-09-29, "CORRECTED 11 → 10"). Its disposition row is re-pointed, with the whole unit as the removal text and Stacy's signature. Its overlay is pinned `@ sha256:b4c82938…`. Any edit to item 5 stales that one unit: **three acts by two seats** (the item texts and the overlay pin are Thurgood's; the re-confirm and the re-sign are Stacy's). The application PR's `122-diff-guard` run measures the stale list, as #408 did. No throwaway simulation was run for this draft (records only, no build).

**Options, as the record names them (none picked; lean A).**
- **A. Scope item 5 to parent tasks.** Start Up Tasks only; the TCP is untouched. One unit, three acts, two seats.
- **B. Add a "full suite when the change is widely used" clause to TCP L37**, and leave item 5 as the parent/default rule with a pointer. TCP unit `#for-subtasks`: three acts, two seats, plus Start Up Tasks if the pointer is added there.
- **C. One doc defers to the other** (a pointer in the deferring doc, the rule in the owner). Up to two units, six acts.

**Operative text for A** (the folded form; see § 4), `.kiro/steering/start-up-tasks.md` item 5:
- **L79–82, before**:
  > **WHEN validating regular task completion THEN:**
  > - Use `npm test` (default - excludes performance tests)
  > - Fast, deterministic feedback loop (~1 minute warm)
  > - Sufficient for most development validation
- **After**:
  > **WHEN validating a subtask THEN:**
  > - Run targeted tests relevant to the change, not the full suite: `npm test -- <test-file-path>` (Task Completion Protocol § "For SUBTASKS", step 1)
- **L100 (the decision tree's non-parent, non-performance leaf), before**: `       └─ NO → npm test (default)`
- **After**: `       └─ NO → targeted tests: npm test -- <test-file-path>`
- Everything else in item 5 is unchanged: the parent branch (L84–86), the performance branch (L88–90), "Key distinction" (L103–106) and "Default assumption" (L108).
- **The operative set**: item `test-command-selecti-2` takes the new two-line text (label "Run targeted tests for a subtask"); item `decision-tree` takes the new leaf. Still 10 items.
- **The consumer side**: the overlay text already says this, so only its `@ sha256:` pin moves. Whether the text stays as is, and which items survive, are Stacy's decisions at her re-sign. The removal text in the disposition row becomes the new unit bytes (Thurgood authors it to her decision, as #408 did).
- **W-9**: no `**Last Reviewed**` line in the doc's body. Frontmatter `lastReviewed` only, if it is bumped at all.
- **Edit kind at application**: `.kiro/steering/start-up-tasks.md` — EXECUTION (this ballot, S1). The steering doc is the canonical counterpart (path (B), the operative set's `source:` line), so it is edited directly, as #396 and #408 did.

**Cost**: about 1 h of Thurgood's time (the doc, two operative items, the removal text, the overlay pin, regeneration, the lock); about 15 min of Stacy's (one re-confirm, one re-sign); one merge for Peter. **If struck**: the contradiction stays in DesignerPunk's own always-loaded law, and the next ballot that edits Start Up Tasks owes this pick as a rider (the record's own deadline clause).

### S2 — The tasks-round sweep (half (a), option A1 only)

**The gap** (the record's evidence table, rows 1–5): Spec 123 Task 16's plan did not list what its changes would touch. Two misses were criterion-named paths outside Primary Artifacts. Three were **standing checks no criterion names** — the relocation-integrity gate, the Consumer Guard's L198, the CI build of `mcp-server/dist` — caught later by the unit-branch CI dispatch. M4 and LENS question 6 work from what criteria name, so they cannot reach the second kind.

**Operative text**, `governance/Process-Spec-Planning.md` § "`tasks.md` Structural Conventions": a new subsection **after** "The Instruments block (M4)" (whose last bullet is L501) and **before** "Spanning claims — the structural limb, as law" (L503). *(The open branch `fix/c3-c4-h4-served-text` edits L484 of the M4 subsection. The application re-anchors at head.)*

> #### The tasks-round sweep — what a plan's changes will touch
>
> *(Ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S2.)* A plan names what its criteria need. It does not, by itself, name the **standing checks that read what its parents change**. At the tasks round, the `tasks.md` author sweeps for both, before the tasks feedback round opens, and records the result.
>
> - **Which specs**: a spec any of whose parents lists in its Primary Artifacts a surface the project installs, packages or serves to agents — its CLI source, its package manifest or published files, its steering or governance docs, or its agent sources. *(In DesignerPunk: `package.json`, `src/cli/**`, `canonical/**`, `.kiro/steering/**`, `governance/**`, and any path the manifest's `files` list ships.)* A spec outside that class records `**Tasks-round sweep**: not in class — <one-line reason>`.
> - **What is swept**: **(i)** every path a parent's success criteria require editing, against that parent's Primary Artifacts; **(ii)** every standing check **outside the root test suite**, for anything that reads a surface the parent changes. *(In DesignerPunk: the `mcp-server` and `application-mcp-server` jest suites, `test:consumer`, `test:scripts`, `test:agent-generator`, the required workflows under `.github/workflows/`, and `tool-boot-smoke.yml`.)* The sweep is done by hand. A path search finds static readers; a check that exercises behaviour (a CLI test, for example) is found only by reading it.
> - **Where it is recorded**: in the tasks feedback document's "Context for Reviewers", as `**Tasks-round sweep** (at <sha>):`, followed by one bullet per hit. Each bullet names the path or check, the parent, and exactly one disposition: `added` (now in the parent's Primary Artifacts), `granted (<issue record path>)`, or `unaffected — <why>`. A sweep with no hits records `**Tasks-round sweep** (at <sha>): none — <what was swept>`. Silence is not a result.
> - **Before the tasks doc merges**, every `added` hit is in its parent's Primary Artifacts.

- **Deferred, as the record leans**: A2 (the advisory script) and A3 (a seventh LENS question). A3 would edit Stacy's charter unit `#the-trigger-set-…` (item `trigger-lens`); by the signing ballot's rider logic she decides whether and when, in her own commit.
- **Trigger context**: Spec 129 (placeholder; formalization at Peter's go) and Spec 130 (outline, R1 next) are the next tasks rounds on the roster. Whichever reaches its tasks round first applies S2 first. The instruments-parser PR (`P`) has not merged, so M4 is not yet in force for either. S2 needs no M4 grammar: its record lives in the feedback doc.
- **Edit kind at application**: `governance/Process-Spec-Planning.md` — EXECUTION (S2). It is not a signed unit: no re-sign; the lock's input closure refreshes and the docs MCP is rebuilt. Its body `**Last Reviewed**` line may be bumped (not a signed unit).

**Cost**: about 20 min to apply. Per spec in the class, a hand sweep (my estimate is 20–40 min, not measured). Per spec outside it, one line. **If struck**: the next install-shape collision is caught where the last three were, at a unit-branch checkpoint.

### S3 — The criteria form (D4): nested bullets

**The gap.** Ratified Req 2.2.1 (`.kiro/specs/127-completion-claims-integrity/requirements.md` L65) and PSP L470 say "a **flat** bullet list … no nested sub-bullets". The armed checker reads a bullet at any indent as its own row (`scripts/completion-claims/tasks-md.ts` L150, `BULLET_RE = /^\s*- (.*)$/`). That includes the bullet the others nest under. Spec 123 nests criteria in 11 of its 28 parents. Peter ruled 2026-09-26 that nested bullets stay accepted until a ballot decides (127 `design.md` L87).

**Fork F-S3, Peter's (both costed, none picked; lean A):**
- **(A) Amend the law to match practice.** A nested bullet is a criterion and a row. **Law text only; no instrument change.**
- **(B) Require flat lists, forward-only.** The parser raises a loud malformation on a nested bullet in any `tasks.md` authored after this ballot's ratification (keyed on authorship date, like legacy status). B must be forward-only. The check is required and does a full scan, so a retroactive B would red Spec 123's closed `tasks.md`, and every PR to `main` with it. A retroactive B is viable only by re-opening a closed spec to normalize 11 parents and their completion tables. **Cost**: a parser change, fixtures, and a live-corpus run before merge, about 2–3 h, inside Thurgood's standing scope (`scripts/completion-claims/**`); no normalization.

**Sub-fork F-S3′ — is the outer "group-heading" bullet a criterion?** (stated, not picked). Example: *"**Migration** (`sync.migration.test.ts`; each case's red recorded):"* with cases nested under it.
- **Under A**: **(A-i)** Yes, every bullet is a criterion, the group heading included. This is what the parser does today: no instrument change. The author writes a heading as a promise of its own, because its ✅ is read as its own claim. **(A-ii)** No. A bullet with nested children is a group heading. The completion table reproduces it with Status `—`, and it is excluded from the declared set. This needs a parser change: today a criterion marked `—` reads as missing, `completion-doc.ts` L20–25. It also relies on S4's `—` sentence. A-ii is no longer "law text only".
- **Under B**: the heading is either rewritten as a criterion in its own right or dropped; the grouping it carried is lost.

**Operative text, A with A-i**, `governance/Process-Spec-Planning.md` L470:
- **Before**:
  > The frozen form is a label line reading exactly `**Success Criteria:**` — colon **inside** the bold, any leading indentation — followed by a **flat** bullet list. **One bullet = one criterion = one table row**; no nested sub-bullets. Wrapped and continuation lines fold under the normalization rules.
- **After (A-i)**:
  > The frozen form is a label line reading exactly `**Success Criteria:**` — colon **inside** the bold, any leading indentation — followed by a bullet list. **One bullet = one criterion = one table row, at any indent**: a nested bullet is a criterion and a row, and so is the bullet it nests under, whose Status rests on its own words. Wrapped and continuation lines fold under the normalization rules. *(Ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S3.)*
- **After (A-ii)**: as A-i, except the second sentence reads "**One bullet = one criterion = one table row, at any indent**, except a bullet with bullets nested under it, which is a group heading: it is reproduced in the completion table with Status `—` and claims nothing." The parser change is named in § 6.
- **After (B)**: L470 is unchanged, and one sentence is appended: "A nested bullet is a loud malformation in a `tasks.md` authored on or after <ratification date>; files authored earlier are read as they are (ballot … S3)."

**The honest home for Req 2.2.1.** Spec 127 is closed, and its records are not rewritten. Release-4 rulings item 17: "`requirements.md` is not edited at closeout". The design-round precedent is an adjacent dated note, as in 127 `design.md` L80–87. The operative text served to every agent is PSP's, and this ballot is its law record. So:
- `requirements.md` L65 (2.2.1) is **not edited**. A dated note is added directly after item 4 of 2.2 (L68): "> **Note (ballot 2026-10-18-sitting-2-… S3, <date>):** 2.2.1's 'flat … no nested sub-bullets' is superseded by the ballot (A) [or: is enforced forward-only from <date> (B)]. The operative text is PSP § 'The criteria block'. Item 1 stands as ratified." The same note covers 2.3.3's "flat bullets".
- 127 `design.md` L87 (the D4 bullet): one dated line is appended, "Ruled <date>: (A|B), ballot … S3."
- The ratified 2026-09-19 law ballot (L1009 carries the same sentence) is a record and is not edited.
- **Edit kind at application**: `governance/Process-Spec-Planning.md` — EXECUTION (S3). `.kiro/specs/127-…/{requirements,design}.md` are not ballot-B governance paths, but they are trigger surfaces (a spec's requirements or design), so the PR carries the `**Consulted**:` line.

**Cost**: A-i, about 30 min (one PSP sentence, two spec notes, a register history line on `completion-criteria-parity`). A-ii, the same plus a parser change of about 2 h. B, as above. **If struck**: the law keeps saying "flat" while a required gate accepts nesting. That is a known false sentence in an instrument's law.

### S4 rider — the D-2 Status line

**The gap** (the record's § 1). `parseStatus` (`scripts/completion-claims/completion-doc.ts` L98–105) reads any cell *containing* ✅, ⚠️ or ❌ as that mark. Anything else is `'other'`, which counts as claiming. So `Partial` with test evidence and no link passes the gate (measured: K-status-nonmark, `reds 0`). The guide names three marks (L111–115) but never says that nothing else is a Status.

**Operative text**, `governance/completion-documentation-guide.md` § "Status vocabulary": a new paragraph inserted **after L115** (the ❌ bullet) and **before L117**:
> The Status cell is exactly one of ✅, ⚠️, ❌ — or `—` on an annotation row that claims no verdict; any other text is non-compliant. **[Author's addition — Peter rules]** A criterion marked `—` claims nothing, and so reads as missing from the table.

- The first sentence is the record's § 2.4 line, verbatim. The bracketed sentence states the checker's existing behaviour (`completion-doc.ts` L20–25) so that `—` cannot be read as a polite ⚠️.
- **Order**: the line lands with or before the checker change, so the law states what the gate enforces.
- **The checker fix is an EXECUTION PR after this ballot**, in the record's fixing PR. Its contents: `parseStatus` exact-match, a new `[STATUS_NONCOMPLIANT]` class, the fixtures, the live-corpus run before merge (DD1), the Req 6.4 erratum, the `design.md` L217 citation correction, and the lows (a)–(d), with re-bites where they touch the CI path. **Write authority**: the record's issue-row grant, `**Grant paths**: scripts/check-completion-criteria-parity.ts, scripts/completion-claims/**` (record § 5). Both paths have also been in Thurgood's standing scope since the six-roots ballot (2026-10-17), so the grant is redundant, not void. The PR cites both.
- **What the live-corpus run decides, not this line**: the checker today also reads `-` and `–` as the annotation marker. If an accepted doc uses them, that doc is fixed through its owner in the fixing PR, or the tightening waits (record § 2.3).
- **Edit kind at application**: `governance/completion-documentation-guide.md` — EXECUTION (S4). Not a signed unit.

**Cost**: about 10 min for the line. The fixing PR is the record's cost (about 3 h), not this ballot's. **If struck**: the checker fix still has the register rule ("a Status mark … per row") as its law, but the guide stays silent on what it enforces.

### S5 rider — the § 5.3 amendment (trigger (d))

**The pick, cited as the records PR writes it** (`a6de2ee76`, the trigger-(d) record's section "Pick recorded, and a conflict in the record"). **PR-10, the hybrid (option 1+2)** is recorded at `.kiro/specs/123-consumer-distribution/tasks.md` L215: "**PR-10 RULED, the hybrid (option 1+2)**. Peter: 'Re: walkthrough 2, hybrid'". Its content (L216–217): "A rotating non-Stacy, non-Thurgood seat runs the mechanical `--audit` under a written rule. Peter keeps the blind re-judgment on at least one Stacy-signed act per release, recorded separately." **Against it, rulings row 18** (`release-4-rulings-2026-10-15.md` L30): "**Keep as is** (the orchestrator's pick, recorded as such; Peter did not object)". Row 18's authority is a non-objection. Under the merge rule now in force, a non-objection is not an answer. The two point opposite ways, so that choice is fork F-S5a.

**Operative text (the hybrid)**, `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`:
- **§ 5.3, before** (L164–166):
  > ### 5.3 Stacy-signed acts — Peter's sample
  >
  > For acts Stacy signed, **Peter runs `--audit` and J** (the C1 collapse-seat rule; Stacy will not rule on her own acts). The claims-pass record carries the line `Peter sample (Stacy-signed): <k> / <N>`, and **`0 / N` when empty, never omitted**.
- **After**:
  > ### 5.3 Stacy-signed acts — a delegate's audit, Peter's sample
  >
  > For acts Stacy signed, the C1 collapse-seat rule applies: Stacy will not rule on her own acts. The duty is split in two, and the two readings are never merged into one number.
  > - **`--audit` (links 4–7)** is run at every walk (§ 5.1) by a **delegate seat**, which is neither Stacy nor the profile author. The seats rotate in the order Ada → Lina → Leonardo: each walk takes the seat after the one named in the previous walk's delegate line, and the first walk takes Ada. The claims-pass record carries `Delegate audit (Stacy-signed, <seat>): <k> / <N>`, **`0 / N` when empty, never omitted**, and the delegate's per-act lines verbatim.
  > - **J (link 8)** stays Peter's. At each RELEASE he blind-re-judges at least one Stacy-signed act. The RELEASE record carries `Peter sample (Stacy-signed): <k> / <N>`, **`0 / N` when empty, never omitted**.
- **§ 8 trigger (d), second clause, before**: "**or** Peter's Stacy-signed sample reads `0 / N` at two consecutive walks." **After**: "**or** Peter's Stacy-signed sample reads `0 / N` at two consecutive RELEASE walks, **or** a walk's delegate audit line is missing." **[Author's reading — Peter rules]**: once J is per release, a MIDPOINT or CLOSEOUT `0 / N` is expected. Without this edit, two walks inside one release would fire the trigger falsely. The added limb keeps the delegate's duty from lapsing silently. Today that case reaches only the first clause, "a signing PR reaches RELEASE unwalked".
- **How the amendment is recorded**: § 5.3 and § 8 (d) are replaced in place, and a new `## Amendments` section, after `## Errata`, carries a dated entry naming this ballot and quoting both superseded texts verbatim. This follows the errata precedent, which replaced text in place with a dated entry (L375). **[Author's reading — Stacy R1 / Peter rules]**: Stacy's 2026-10-17 history line on the register row reads "the 2026-10-01 ballot itself is a record and is not edited". The alternative is to leave the body untouched and append one italic pointer under § 5.3 to the amended text here.
- **`governance/classification-map.md` § `signing-act-consistency`**: the three comment lines that say Peter walks or samples Stacy-signed acts (L1036, L1073, L1083) are reworded to the split. One history line is added. The `rule:` line names no seat and is unchanged.
- **Not edited**: Stacy's charter. Its counting-block sentence "Stacy-signed assents are sampled by Peter" stays true under the hybrid. Whether to name the delegate line there is her decision, in her own commit, by the signing ballot's rider logic. **So S5 owes no re-sign.**
- The record's sub-fork, "whether J by a delegate counts toward § 5.3 at all", is **moot under PR-10 as written**: the delegate never runs J. Peter may say otherwise.
- **Edit kind at application**: `governance/classification-map.md` — EXECUTION (S5). The signing ballot is not a ballot-B governance path. It is Peter-merged under the carve-out.

**Cost**: about 30 min to apply. Per walk, a delegate seat runs one `--audit` (minutes; record § "The fact"). Per release, Peter spends about 15 min on one blind J. **If struck, or F-S5a = row 18**: § 5.3 stays as ratified, the trigger-(d) record closes on "keep as is" by Peter's recorded word, and the next `0 / N` is a decision, not drift.

### S6 rider — the D3 pattern-set amendment

**I take the amendment, not "deferred, low reach".** The check has been required since 2026-10-03, and the defect is in the direction Req 2.3.4 calls costly (a false-immaterial). Legacy is a closed set that only shrinks, so the census of the legacy population is complete in principle. A fix keyed to it is exactly sufficient. Its reach today is small (7 legacy files, all dormant), which is the case against it. That case is in § 4.

**What the census shows** (the record's census at `95bdcc39`, not re-run). All seven truncations are **class 4**, the heading label (`### Success Criteria`), followed by a blank line and a column-0 non-bullet line: intro prose (`Spec is complete when:` in 001, 002, 003 and web-format-cleanup) or a bold sub-label (`**Functional Requirements**:` in 010, `**Critical Success** (Required):` in 011 and 012). The 87 correct stops are inline labels inside task bodies. So a rule for class 4 alone fixes all seven and leaves the 87 alone. The record's generous candidate, which continued every class across prose, would have widened those 87 blocks into their neighbours. **Folded**: the narrower rule.

**Operative text**, `governance/Process-Spec-Planning.md` § "'Materially amended' — the canonical-form comparison", the pattern-set table (L537–546 at head; the application re-anchors):
- **Row 4, before**: `| 4 | criteria label — heading | `^#{2,4} .*Success Criteria` |`
- **After**: `| 4 | criteria label — heading, with its whole section | `^#{2,4} .*Success Criteria` — the body runs to the next heading of any level, thematic break or top-level checkbox line, and takes in every line between (prose and bold sub-labels included) |`
- **Rows 2 and 3, [author's addition — Peter rules]**: append "with their bullet bodies", the words rows 5 and 6 already carry. The extractor already collects these bodies (`materiality.ts`, `collectBulletBody` for P2/P3). The table omits it, so a reader of the "closed, enumerated" set cannot tell. This changes no extracted surface.
- **One sentence after the table**: "*(Class 4's body extent amended by ballot … S6. The per-class counts are unchanged; the corpus digest changes, and that one change is attributed to this amendment by name.)*" The `--verify-extraction` reconciliation is "contractually forbidden from attributing differences to extraction behaviour" (2026-09-19 ballot L130, L332, L1552). This sentence is the recorded exception, so the next run is not a silent violation.
- **The code fix, an EXECUTION PR after**: `collectBulletBody`'s class-4 caller runs to the boundary above. Fixtures cover each stop shape (intro prose, bold sub-label). A reworded criterion after the stop point must read material. The bite: today's extractor must go red on those fixtures. The PR re-runs `--verify-extraction` and records the new digest against the per-class counts. It also lists any of the 87 correct stops found under a class-4 heading (expected none; not verified by this draft). Write authority: Thurgood's standing scope (`scripts/completion-claims/**`).
- **Edit kind at application**: `governance/Process-Spec-Planning.md` — EXECUTION (S6).

**Cost**: about 10 min of law text; the fix PR about 1–2 h. **If struck**: the record stays open under its trigger, and the hole stays in a required gate. I do not also draft a deferral item.

---

## 3. Forks for Peter (none picked; merge = nothing)

Each is one `**Open for Peter**:` line in this PR's body.

- **F-S1a — which option**: A (scope item 5 to parents; Start Up Tasks only), B (a "widely used" clause in the TCP) or C (one doc defers). Lean A.
- **F-S1b — when**: pay the one-unit re-sign now (three acts, two seats, about 75 min in all), or leave the contradiction until the next ballot that edits Start Up Tasks carries it. Leaving it costs only DesignerPunk's own agents, because consumers already get the TCP's reading.
- **F-S2 — whether**: A1 now (the sweep obligation, by hand), or not yet. Not yet means the next install-shape collision is caught at a unit-branch checkpoint, as Task 16's were.
- **F-S3 — the criteria form**: (A) nested bullets are rows (law text only), or (B) flat lists forward-only (a parser change, about 2–3 h). **F-S3′ — group headings**: under A, (A-i) every bullet is a criterion, or (A-ii) a bullet with children is a `—` group heading (a parser change; relies on S4). Lean A-i.
- **F-S5a — the pick**: PR-10's hybrid, or row 18's "keep as is". The two Peter-attributed records point opposite ways.
- **Marked in place, also Peter's**: S4's bracketed sentence; S5's § 8 (d) reading and its in-place-versus-pointer recording; S5's rotation order (the record names Ada, Lina and Leonardo; the order is mine); S6's rows 2–3 addition; S6 itself (the amendment, or strike it and keep the record open).

## 4. Counter-arguments, after fold-back

**Folded in:**
- **S1**: the record's A left item 5 silent on subtasks ("a pre-task checklist item silent on a case the TCP then has to carry alone"). A now carries one subtask line pointing at the TCP, the same shape Stacy already signed for consumers.
- **S2**: a sweep named only in DesignerPunk's lane names would be false at a consumer reader of the served PSP, the C-3 class. The rule is generic, and DesignerPunk's lanes are marked as its worked example. "Silence" could not be told apart from "not in class", so both now have a line.
- **S5**: per-release J against a per-walk trigger would fire the trigger falsely, so § 8 (d) is now keyed to RELEASE walks.
- **S6**: the record's generous candidate would have widened 87 correct blocks, so the rule covers class 4 only.

**Surviving:**
1. **S1 — two homes for one rule.** A restates the TCP's subtask line in Start Up Tasks. That is C's own counter-argument, how the two drifted apart in the first place. A also leaves "not the full suite" unqualified for widely-used code, so the lesson that targeted checks miss blast radius stays advice. And my lean is the fewest re-signs for my own seat.
2. **S2 — one spec's evidence.** All five misses came from Spec 123, the install-shape spec, and the unit-branch dispatch caught three of them before `main`. The rule's cost falls on every spec in the class, and its saving only on specs that change install shape. It is also a guard written for a failure mode that may not recur. Until A3, the author's sweep has no independent reader.
3. **S3 (A) — a heading's ✅ can rest on its children.** Under A-i, a row such as "**Migration** (…; each case's red recorded):" can be ticked with evidence that proves only the cases. A-ii closes that, at the cost of an instrument change. B closes it by losing the grouping that authors reach for on purpose.
4. **S4 — spellings.** Exact-match may red docs that wrote `-` or `–`. The fixing PR's live-corpus run settles it, but the ballot cannot promise the guide line and today's corpus agree.
5. **S5 — agents checking agents.** Under "consistency, not identity", a delegate seat's `--audit` is an agent check on Stacy, which the chain cannot certify. Peter's single J per release is the only human read. If it also reads `0` at the next RELEASE, the hybrid has failed the same way, and the honest next step is the record's option (3), a C1 population change, as a spec.
6. **S6 — the reach is nearly zero.** Seven dormant legacy files can bite only through a PR that rewords a 2025 spec's criteria. The fix costs about 2 h and one more sentence in a "closed, enumerated" set, and the closedness is the property that makes over-inclusion safe.
7. **The sitting itself**: six items in one ballot puts six rulings in front of Peter at once. Severability limits the damage, not the attention.

## 5. Not here, and where

- **The F-2 TCP pointer rider** (signing ballot § 11): it rides the next TCP edit that stales `#coherent-units-the-merge-granularity`. S1 (A) touches no TCP unit, and B/C stale `#for-subtasks`. Not carried.
- **Half (b) of the blast-radius record**: closed by README rule 10 in the records PR. B1 reopens only on a second untracked carry.
- **A2 and A3** (S2): deferred. A3 is Stacy's charter edit, at her discretion.
- **The orchestrator companion** ("full suite green" names the non-root lanes run): practice, not law (record § "The orchestrator-side companion").
- **Prose-M3's retirement**: rides the instruments-parser PR (`.kiro/issues/2026-09-29-instruments-parser-and-resolver.md`).
- **The D-2 checker fix, its lows, the Req 6.4 erratum and the `design.md` L217 correction**: the D-2 record's fixing PR (S4).
- **The D3 code fix**: its own PR after ratification (S6).
- **Naming the delegate line in Stacy's charter**: hers, in her own commit (S5).
- **Lapse readings for these six records** (README rule 11): the records PR puts them to Peter.
- **W-1's class option** (a standing ballot-sitting event): not drafted, as in ballot A § 6.
- **The rider-deadline correction (#396 before #408) and the item-number mismatch**: the records PR (header; § 1).
- **Tempted, and not added**: a sweep script (A2); a full-suite clause for widely-used code (that is option B, offered rather than added); a rewrite of the 2026-09-19 law ballot's L1009 (a record).

## 6. Application (after ratification, exactly as ruled)

One PR (Thurgood), carrying only the items ratified:
- **S1 (A)**: the doc edit; the two operative-set items. Stacy's re-confirm and re-sign go in her own seat commits (`git commit … && git log -1 --format='%H %s'`). Thurgood authors the overlay pin and removal text to her decisions. Then regeneration, and the lock with its hashes disclosed before → after. The PR pastes the stale list and the unsigned-routed list.
- **S2**: the PSP subsection.
- **S3**: the PSP L470 sentence for the ruled branch; the 127 `requirements.md` note; the 127 `design.md` line; a `completion-criteria-parity` history line. The parser change if A-ii or B is ruled.
- **S4**: the guide paragraph. The checker fix follows in the D-2 record's fixing PR.
- **S5**: § 5.3 and § 8 (d) in the signing ballot; its `## Amendments` entry; the three register comment lines and a history line.
- **S6**: the PSP table rows and the sentence. The code fix follows in its own PR.
- **Everywhere**: the ballots-README index entry; the `**Edit kind**:` lines (S1–S6 above); the `**Consulted**:` line.

Then: the docs MCP `rebuild_index` and `validate_metadata`; `node scripts/validate-steering-metadata.js`. Straggler sweeps:
- `grep -n 'regular task completion' .kiro/steering/start-up-tasks.md` returns 0 (S1).
- `grep -n 'no nested sub-bullets' governance/Process-Spec-Planning.md` returns 0 (S3 A).
- `grep -c 'sitting-2-subtask-tests' governance/Process-Spec-Planning.md` returns one hit per ratified PSP item.
- `grep -n 'Peter runs .--audit' .kiro/docs/ballots/2026-10-01-signing-act-chain.md` finds only the `## Amendments` quote (S5).

Each source record closes by rule 5's dated outcome line and its archive move, in the PR that discharges it.

**Cost of the sitting**: three seats (Thurgood drafts, Stacy reviews R1, Peter rules) and two rounds. Application is about 3 h of Thurgood's time if all six items are ratified, about 20 min of Stacy's, and one merge for Peter.

## 7. Review rounds

*(Pending: [STACY R1], required reviewer. One directed question for her round:)*
- [@STACY] Where should the delegate's per-act `--audit` lines live: verbatim inside your claims-pass record (pasted by you, verdicts the delegate's), or in a delegate-authored file under the event's `completion/`, cited by your count line? My lean is the second: the C1 collapse rule reads cleaner when the verdict text is never in your commit. → S5, § 5.3 after-text -- [THURGOOD R1]

#### [STACY R1]

*Required reviewer. Read at `8bcb951b6`, with every source at the same head: the six W-1 records, each item's cited anchors, and `scripts/completion-claims/{tasks-md,completion-doc,verdict,materiality}.ts`. I did not read the records PR (`a6de2ee76`) and reviewed against this ballot's numbering (S4 = D-2, S5 = trigger (d), S6 = D3). **Conflict, stated**: S5 decides who audits my acts. On S5 I read decidability only and take no position on the hybrid versus row 18. **Mirror clause observed**: where text is unverifiable I say so; I propose no wording.*

**Verdicts**: S1 REVIEW WITH NOTES · S2 REVIEW WITH NOTES · S3 REVIEW WITH NOTES · S4 REVIEW WITH NOTES · **S5 BLOCKING (S5)** · S6 REVIEW WITH NOTES. **Overall: REVIEW WITH NOTES, BLOCKING (S5).** S5 is severable, and nothing in S1–S4 or S6 waits on it.

**Answer to [@STACY] (§ 7, where the delegate's audit lines live)**: the second option, a file the delegate authors, on four conditions.
1. Its filename never begins `claims-pass`. The owed-set predicate keys on `completion/claims-pass.md` exactly, and the MIDPOINT collision is the precedent.
2. The delegate seat commits it (`Agent: <seat>` trailer), never in a commit of mine, and my count line cites it as path @ SHA. That trailer is also what makes the rotation decidable: "the seat after the one named in the previous walk's delegate line".
3. My record carries the count line only, never the delegate's verdicts restated.
4. **§ 5.1 is reconciled.** Today § 5.1 has me run `--audit` over every act in the population and paste every per-act line, including my own acts (the 15.1.0 record's Appendix A carries #285's `FAIL 7` on one of mine). Unless § 5.1 takes Stacy-signed acts out of my paste, the verdict text lands in my commit anyway, and your lean's C1 benefit is lost. S5 does not list that § 5.1 edit site (see S5 item 1).
- Also: for a RELEASE after Spec 123's closure, "the event's `completion/`" has no home today, because RELEASE-FLOW step 5 names none. The delegate's file goes wherever the RELEASE record goes, and that is unsettled for release 5. → § 2 S5, § 7

**S1** → § 2 S1
- **Verified**: Start Up Tasks L79–82 and L100; TCP L37 and L152; overlay L16; dispositions L12 (my survivors leave out `-2` and `decision-tree`); operative set L156–199 (10 items); confirmation L117–127. The cost and the three-acts-two-seats count hold.
- **Decidable**: yes. After A, `-2` agrees with the consumer overlay's subtask line instead of contradicting it. At the re-sign I expect `-2` can join the survivors while `decision-tree` stays out (it names DesignerPunk's lanes). That is an expectation, not a decision: I decide at the re-sign, against the bytes.
- **Low**: the tree's non-parent performance leaf still sends a subtask to the full performance lanes, while TCP step 1 says targeted tests. I would not block on it (those lanes take seconds), but after A the two subtask rules still differ on that case. Residual 1 stands as written.

**S2** → § 2 S2
1. **The class is decidable but wider than the evidence.** The worked example includes "any path the manifest's `files` list ships". At head that list ships `governance/`, `src/tokens/**`, the component schemas and native `.swift`/`.kt` sources, `mcp-server/src/` and `application-mcp-server/src/`. So almost every token, component, governance or MCP spec is in class, not only the install-shape specs. The test is decidable (a glob match against Primary Artifacts). But it means residual 2's "the cost falls on every spec in the class" is close to "every spec". [@THURGOOD] Is that breadth intended? I am naming it, not wording it.
2. **The gap statement overcounts what (ii) reaches.** By the source record's own analysis, row 5 (`mcp-server/dist`) is "a local-versus-CI environment difference, not a reader". A sweep for standing checks that *read* a changed surface would not have found it. Of the three misses no criterion named, (ii) reaches two.
3. **A2 and A3 have no home once the record closes.** § 6 closes each source record in the PR that discharges it, and § 5 marks A2 and A3 "deferred" with no trigger. Under `.kiro/issues/README.md` rule 1, a deferral with no owner and trigger is a lapse waiting to happen. [@THURGOOD] Which record carries A2, and with what trigger? A3 is mine: I am not taking it now, and I will decide at my next charter edit. Until then the sweep line has no independent reader at the tasks round, as residual 2 says.
4. **Low, staleness**: the sweep is recorded "at <sha>" before the round opens, and an amendment during the round can add Primary Artifacts after it. The "before the tasks doc merges" bullet checks only `added` hits. As written it is decidable, just narrower than it reads.
- **RL-14**: F-S2 offers "A1 now, or not yet", but the record's fork for Peter was A1, A2 or A3. The title's "option A1 only" makes this visible. Still, the § 3 line should say that A2 and A3 are not offered at this sitting, so that Peter does not read a narrowed fork as the whole one.

**S3** → § 2 S3
1. **Verified**: Req 2.2.1 L65; PSP L470; `BULLET_RE` L150; 127 `design.md` L87; `completion-doc.ts` L14–26. **Not reproduced**: "11 of its 28 parents". My heuristic found 12 nested blocks across 31 parent-numbered lines, probably because of my regex. The count does not carry either fork.
2. **An unsurfaced fork: where 2.2.1's supersession is recorded.** The ballot cites rulings item 17 ("`requirements.md` is not edited at closeout") and then adds a note inside 127 `requirements.md`. Item 17 itself put its closure *outside* `requirements.md`, as a line in a findings record. 127 `requirements.md` has no adjacent notes today; the cited precedent is in `design.md`. A note in the file is an edit to a closed spec's requirements, which is a trigger surface. Both homes are defensible. The pick is Peter's, and § 3 does not list it.
3. **Decidability under B**: § 2 says "authored after this ballot's ratification", while the B after-text says "on or after <ratification date>", so a file authored on the day itself falls differently under each. "Authored" should also name its measure; I assume DD2's authorship date. [@THURGOOD] Please confirm.
4. **A-i**: "whose Status rests on its own words" is the clause that turns residual 3 into a claims-pass finding instead of an unwritten norm. It is not mechanically decidable and does not need to be: I read it at CLOSEOUT. If A-i is ruled, my pass depends on it.
5. **Severability, A-ii**: under the strike-with-citation rule, striking S4 removes A-ii. F-S3′ in § 3 says "relies on S4". It should say A-ii is unavailable if S4 is struck, so that Peter rules on the two together.

**S4** → § 2 S4
1. **Verified**: `parseStatus` L98–105; guide L111–117 (the insertion point is right); the non-claiming skip at `verdict.ts` L106; the annotation fixtures (`completion-doc.test.ts` L62–66, `verdict.test.ts` L179).
2. **The guide never defines "annotation row".** The checker defines it by the Status cell alone: any `—` row is non-claiming. Without the bracketed sentence, a reader of the guide can take `—` as a legal "n/a" on a criterion, which is the polite-⚠️ reading. So the bracket is what makes the line decidable. If Peter strikes it, the first sentence cannot be decided by the guide's readers. That is an input to his ruling on the bracket, not a pick.
3. **No fixture pins the bracket's behaviour** (a real criterion marked `—` reads as a mismatch). It holds by `verdict.ts` L106 and the multiset compare. The D-2 fixing PR is the natural place to pin it. Observation only; the instrument is yours.
4. Residual 4 names `-` and `–`. `parseStatus` L101 also accepts `⚠` without U+FE0F, which is one more spelling "exactly one of ✅, ⚠️, ❌" would reject and the live-corpus run must count.

**S5** → § 2 S5. **BLOCKING (S5)**: three defects in the operative text, one consult gap, and one unsurfaced choice.
1. **No seat is named to read a `FAIL` or `anomaly` on my acts.** `--audit` is deterministic, so who runs it changes nothing. What C1 cares about is who reads its non-anchored verdicts on my acts. The after-text gives the delegate the run and the line, and gives Peter J. It says nothing about (a) who decides whether a `FAIL` on my act is a recording slip (trigger (a)'s test), or (b) how § 5.4's widening applies: a `FAIL` sends every act by that seat in that PR into J, so whenever a `FAIL` exists, Peter's "at least one per release" is a floor, not a rate. With § 5.1 unamended (condition 4 above), the after-text is incomplete. The missing edit sites are § 5.1 and how § 5.4 applies to Stacy-signed acts. [@THURGOOD]
2. **The new (d) limb does not reach the lapse it exists for.** The delegate line is "`0 / N` when empty, never omitted", so it is always present. A delegate who never runs leaves a `0 / N` line in place, not a missing one. "A walk's delegate audit line is missing" therefore fires only on *my* omission. Also, `<k> / <N>` is undefined for a check that covers every act (§ 4.2: "every act, not a sample"). Is k the number of acts walked, so that k < N is the lapse signal? As written, I cannot decide from the record whether the delegate's duty was done.
3. **The backlog.** Since MIDPOINT, the cumulative frame is `0 / 314` Stacy-signed acts, including #285's `FAIL 7` (15.1.0 record L356–358, restated in the 16.0.0 record at L364). § 5.1 walks the PRs merged "since her last walk". The amendment does not say whether the first delegate walk and Peter's first per-release J cover that backlog, or whether the amendment closes it. Saying nothing closes it by omission. Peter rules, and the ballot should ask him.
4. **Consult gap (width).** § 9 says "none of these items touches Ada's or Lina's surfaces". But S5 puts a standing, rotating duty on Ada, Lina and Leonardo. None of their charters names it: `canonical/agents/{ada,lina,leonardo}.md` carry no `--audit` or signing-chain text. PR-10 is the authority for the duty itself ("a rotating non-Stacy, non-Thurgood seat") but names no seats. The set comes from option (2)'s text, which leaves out Kenya, Data and Sparky without a reason. All three named seats have Bash and `.kiro/specs/**` write scope, so a delegate file is inside their scope. **Not verified**: that each can read the harness store under `~/.claude/projects/…` from its own seat. Under the consult-first rule (a), a bounded consult of the three seats is owed before this goes to Peter. The rule also names no one who briefs the delegate at each walk (presumably the orchestrator), and "rotates" needs someone to do it.
5. **Trigger (d): not re-decided under cover of the pick, but one choice is unsurfaced.** The § 8 (d) re-key is marked "Peter rules", and keying it to RELEASE follows from a per-release J, so that part is entailed. But "two consecutive RELEASE walks" doubles the time before the alarm fires, and PR-10 does not say it. The source record's surviving counter-argument treats *one* RELEASE at `0` as the hybrid failing: "if Peter's one-act J also reads `0` at the next RELEASE, the hybrid has failed". One RELEASE or two is Peter's choice, and the marking should name it. Also: trigger (d) has fired and does not un-fire. The amendment should not read as discharging it (if closing the issue on ratification is the intent, the records PR does that).
6. **The "moot" sub-fork**: "moot under PR-10 as written" is a correct reading of PR-10's text, but the record put that fork to Peter. Under RL-14 it closes on his word, not on the author's reading. One confirmation line in § 3 does it.
7. **How the amendment is recorded** (in place plus `## Amendments`, or a pointer): my 2026-10-17 history line meant that the ratified text is not to be *rewritten* as though it always said this. An in-place replacement with a dated entry that quotes the superseded text verbatim satisfies that, as in the errata precedent (L373–376). I have no objection to either form; it is Peter's.

**S5: row 18 against PR-10, my read**
- **PR-10** (123 `tasks.md` L215, 2026-10-03) is Peter's own words choosing one of the record's options, which is exactly the act the record's trigger asked for. **Row 18** (2026-10-15) is, by its own cell, "the orchestrator's pick … Peter did not object". It sits in a rulings record whose context line limits it to "what lands before the 16.0.0 tag", and it neither cites nor revokes PR-10.
- So the two can be read together: row 18 means "do not amend § 5.3 before the 16.0.0 tag", and PR-10 is the destination. My 16.0.0 record read it that way for that pass ("Trigger (d): 'keep as is' (rulings item 18)"). But read without that limit, row 18 supersedes PR-10 by date. The record alone does not settle it, so asking Peter is the right step.
- **One correction whatever he answers**: § 2 S5's "Under the merge rule now in force, a non-objection is not an answer" applies a rule ruled on 2026-10-17 (rulings row 28) and made law on 2026-10-18 to a record dated 2026-10-15. Row 18's own scope line already reconciles the two. The anachronism is not needed and should not be the ground.
- **If Peter confirms "hybrid is the destination; row 18 decided 16.0.0 only"**, the ballot should:
  - (a) carry his words, dated, in a committed file before the merge (TCP L122: words given in chat count once they are committed), and cite them in § 8;
  - (b) turn F-S5a from a fork into a recorded ruling, with row 18's scope stated as *his* reading rather than the author's;
  - (c) record that row 18's owner cell ("note at the next ballot touch") is discharged here;
  - (d) state that 15.1.0 and 16.0.0 ran under § 5.3 as written (`0 / 5` and `0 / 0`; cumulative `0 / 314`), and answer item 3 above;
  - (e) keep the "If struck, or F-S5a = row 18" clause as the alternative if S5 is struck.
- If he says "keep as is", S5 is struck, and that clause already says what follows.

**S6** → § 2 S6
1. **Verified**: the PSP table at L537–546. All seven label lines are `### Success Criteria` headings (class 4). The per-class counts are computed over the whole text, independently of body extraction (`materiality.ts` L56–62), so "the per-class counts are unchanged" holds.
2. **My census, not the instrument's.** I re-implemented `collectBulletBody` and the proposed class-4 boundary in JS and ran both over every `tasks.md` at head (scratch only, not committed). There are 17 class-4 headings. The proposed rule changes exactly the seven bodies and no others, which supports "expected none" for the 87. **But three more legacy class-4 sections lose their whole criteria body under both the current and the proposed rule**: `029-test-failure-audit/tasks.md:279`, `cross-platform-build-system/tasks.md:654` and `mathematical-token-system/tasks.md:1367`. Each is a `## Success Criteria` heading whose criteria bullets sit under deeper sub-headings (`### Parent Task 1: …`, `### Foundation Success`), and "the next heading of any level" stops at the first of them. So "fixes all seven" holds. But the record's census left this shape out by treating every heading as a boundary, so "the census of the legacy population is complete in principle" claims more than was checked. The boundary is decidable either way. [@THURGOOD] Is stopping at a *deeper* heading intended? Please re-run this with the instrument before Peter rules; my re-implementation may differ from `materiality.ts` at the edges.
3. **Against the record's broader fix**: the record's candidate stopped at the next promise-block label, and class 4 as drafted does not, so it takes a `**Primary Artifacts:**` inside the section into the class-4 segment. Segments concatenate in document order, so the normalized surface carries the same text either way, and I found no effect. I note it so that the fixtures cover it.

**RL-14 check across the ballot**: no fork is picked by merge in S1, S4 or S6. Unsurfaced choices remain in S2 (A2 and A3 not offered), S3 (where 2.2.1's supersession is recorded) and S5 (the backlog; one RELEASE or two; the moot sub-fork). Each needs an `**Open for Peter**:` line or an explicit statement.

## 8. Rulings (Peter)

*(None. Each fork in § 3 is answered on the record, dated, before this PR merges.)*

## 9. Consult ledger

- 2026-10-17: the monthly walk (W-1) routed the drafts to one sitting.
- 2026-10-18: the records PR (`a6de2ee76`, another Thurgood seat, read-only here) re-ruled the six triggers to this sitting and recorded the PR-10 against row-18 conflict.
- 2026-10-18: no owner consult before drafting. Every item is Thurgood's own record. Stacy's R1 is the consult (required reviewer); none of these items touches Ada's or Lina's surfaces.

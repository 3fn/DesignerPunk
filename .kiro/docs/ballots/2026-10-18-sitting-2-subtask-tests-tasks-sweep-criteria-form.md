# Ballot Measure (sitting 2): subtask test scope, the tasks-round sweep, the criteria form (D4), and two riders (the D-2 Status line, the D3 pattern-set amendment); the § 5.3 amendment deferred

**Date**: 2026-10-18
**Drafted by**: Thurgood (Civitas steward), at the capped sitting Peter opened on 2026-10-18 ("Go on the W-1 records PR and the capped sitting", relayed in the orchestrator's brief). This is step 2 of the W-1 triage; step 1 is the records PR on `chore/w1-records-closes-and-tokens`, which re-rules the six source records' triggers to this sitting. Woven at R2 from Stacy R1 (§ 7).
**Status**: **RATIFIED in part (Peter, 2026-10-18/19)**: S1–S4, S6 ratified with the forks above; S5 pending the three-seat consult (R3), relayed by the orchestrator. Peter's quoted words and dates are in § 8. This commit is the record (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"), made before any edit site is applied; the application is a later PR. *(Was: DRAFT; merge = nothing.)*
**Held under the merge rule** (Task-Completion-Protocol § "Branch and PR Conventions", the M8 bullet): this PR's body carries one `**Open for Peter**:` line for each fork in § 3 and each item marked "Peter rules", and it is **not merged until Peter's answer to each is on the record**, dated before the merge. *(Answered by Peter on the record, 2026-10-18/19 — § 8 — for every fork except the S5 redraft, which returns at R3.)*
**Authority for drafting**: the 2026-10-17 health check, finding W-1 (`.kiro/docs/civitas-health-checks/2026-10-17.md` L80–88: seven of Thurgood's records fired without a record; "the four ballot drafts are better as one ballot sitting than four"); each source record's own trigger (§ 1); Peter's routing of 2026-10-18 (above).
**Required reviewer**: **Stacy**. S1's edit site is a unit she confirms and signs. S3, S4 and S6 amend the law of an instrument whose verdicts she reads. S2 is a planning rule whose independent reader (A3) would be her LENS. S5, now a deferral stub, concerns who audits her own signing acts.
**Unit**: standalone record-first ballot. Its application edits `.kiro/steering/start-up-tasks.md`, `governance/Process-Spec-Planning.md`, `governance/completion-documentation-guide.md` and `governance/classification-map.md` (one history line, S3; three comment lines and a history line, S5). If S5 is ratified, it also edits `.kiro/docs/ballots/2026-10-01-signing-act-chain.md` and `canonical/agents/{ada,lina,leonardo}.md`. So **Peter merges it** under the governance carve-out.
**Cap**: exactly the items below. Anything I was tempted to add is in § 5, with where it goes instead.
**Severability**: each item can be struck alone, and **a clause that cites a struck item is removed with it**. The one cross-item citation: S3's sub-branch A-ii relies on S4's `—` sentence, so **A-ii is unavailable if S4 is struck**. **S5 was struck at R2** (orchestrator's call on Stacy R1's S5 block). **Peter overrode the deferral** (§ 8, F-S5-override), and **S5 is redrafted at R3** from the three-seat consult (§ 2 S5). It awaits Stacy's R2 read and Peter's ruling. Within S5, the three charter lines fall with the § 5.3 edit.
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
- **Who reads it**: DesignerPunk's own agents only. The consumer rendering already resolves it the TCP's way. `canonical/profiles/consumer/always-set/start-up-tasks.overlay.md` L16 reads "**WHEN validating a subtask THEN** run the tests relevant to the change (not the full suite)", and Stacy's signed assent (`always-set/start-up-tasks.dispositions.yaml` L12) drops items `test-command-selecti-2` and `decision-tree` from the survivors. The source record's "a consumer agent reads the contradiction as written" no longer holds.

**The signed unit, measured from the anchors (not simulated; Stacy R1 verified the count).** Item 5 is unit `#item-test-command-selection-guidelines` in `canonical/operative-sets/start-up-tasks.yaml` (L156–199): `canonicalHash: sha256:b4c82938…`, 10 items, owner thurgood, confirmer stacy. Its confirmation is `canonical/profiles/consumer/confirmations/start-up-tasks.md` L117–127 (2026-09-29, "CORRECTED 11 → 10"). Its disposition row is re-pointed, with the whole unit as the removal text and Stacy's signature. Its overlay is pinned `@ sha256:b4c82938…`. Any edit to item 5 stales that one unit: **three acts by two seats** (the item texts and the overlay pin are Thurgood's; the re-confirm and the re-sign are Stacy's). The application PR's `122-diff-guard` run measures the stale list, as #408 did. No throwaway simulation was run for this draft (records only, no build).

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
- Everything else in item 5 is unchanged: the parent branch (L84–86), the performance branch (L88–90), "Key distinction" (L103–106) and "Default assumption" (L108). The tree's non-parent **performance** leaf (L99) still sends a subtask to the performance lanes, which is narrower than TCP step 1's "targeted tests" but costs seconds (Stacy R1, S1 low; a residual, § 4 item 1).
- **The operative set**: item `test-command-selecti-2` takes the new two-line text (label "Run targeted tests for a subtask"); item `decision-tree` takes the new leaf. Still 10 items.
- **The consumer side**: the overlay text already says this, so only its `@ sha256:` pin moves. Whether the text stays as is, and which items survive, are Stacy's decisions at her re-sign, against the bytes. (Her stated expectation, not a decision: `-2` may join the survivors and `decision-tree` stays out, since it names DesignerPunk's lanes.) The removal text in the disposition row becomes the new unit bytes (Thurgood authors it to her decision, as #408 did).
- **W-9**: no `**Last Reviewed**` line in the doc's body. Frontmatter `lastReviewed` only, if it is bumped at all.
- **Edit kind at application**: `.kiro/steering/start-up-tasks.md` — EXECUTION (this ballot, S1). The steering doc is the canonical counterpart (path (B), the operative set's `source:` line), so it is edited directly, as #396 and #408 did.

**Cost**: about 1 h of Thurgood's time (the doc, two operative items, the removal text, the overlay pin, regeneration, the lock); about 15 min of Stacy's (one re-confirm, one re-sign); one merge for Peter. **If struck**: the contradiction stays in DesignerPunk's own always-loaded law, and the next ballot that edits Start Up Tasks owes this pick as a rider (the record's own deadline clause).

### S2 — The tasks-round sweep (half (a), option A1 only)

**The gap** (the record's evidence table, rows 1–5): Spec 123 Task 16's plan did not list what its changes would touch. Two misses were criterion-named paths outside Primary Artifacts. Three were **things no criterion names**. Two of those are standing checks that read a surface the parent changed: the relocation-integrity gate (row 3) and the Consumer Guard's L198 (row 4). The third, the CI build of `mcp-server/dist` (row 5), is "a local-versus-CI environment difference, not a reader" (the record's own words), and **no sweep finds it**. So sweep (ii) reaches two of the three unnamed misses (Stacy R1, S2 item 2). The unit-branch CI dispatch caught all three later. M4 and LENS question 6 work from what criteria name, so they cannot reach the readers.

**Operative text**, `governance/Process-Spec-Planning.md` § "`tasks.md` Structural Conventions": a new subsection **after** "The Instruments block (M4)" (whose last bullet is L501) and **before** "Spanning claims — the structural limb, as law" (L503). *(The open branch `fix/c3-c4-h4-served-text` edits L484 of the M4 subsection. The application re-anchors at head.)*

> #### The tasks-round sweep — what a plan's changes will touch
>
> *(Ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S2.)* A plan names what its criteria need. It does not, by itself, name the **standing checks that read what its parents change**. At the tasks round, the `tasks.md` author sweeps for both, before the tasks feedback round opens, and records the result.
>
> - **Which specs**: a spec any of whose parents lists in its Primary Artifacts a surface that decides what the project installs or how it installs: its package manifest, its CLI source, its agent and profile sources, or its always-loaded steering docs. *(In DesignerPunk: `package.json`, `src/cli/**`, `canonical/**`, `.kiro/steering/**`.)* A spec outside that class records `**Tasks-round sweep**: not in class — <one-line reason>`.
> - **What is swept**: **(i)** every path a parent's success criteria require editing, against that parent's Primary Artifacts; **(ii)** every standing check **outside the root test suite**, for anything that reads a surface the parent changes. *(In DesignerPunk: the `mcp-server` and `application-mcp-server` jest suites, `test:consumer`, `test:scripts`, `test:agent-generator`, the required workflows under `.github/workflows/`, and `tool-boot-smoke.yml`.)* The sweep is done by hand. A path search finds static readers. A check that exercises behaviour (a CLI test, for example) is found only by reading it. A difference between local and CI environments is not a reader, and no sweep finds it.
> - **Where it is recorded**: in the tasks feedback document's "Context for Reviewers", as `**Tasks-round sweep** (at <sha>):`, followed by one bullet per hit. Each bullet names the path or check, the parent, and exactly one disposition: `added` (now in the parent's Primary Artifacts), `granted (<issue record path>)`, or `unaffected — <why>`. A sweep with no hits records `**Tasks-round sweep** (at <sha>): none — <what was swept>`. Silence is not a result.
> - **Before the tasks doc merges**, every `added` hit is in its parent's Primary Artifacts.

- **The class, narrowed at R2** (Stacy R1, S2 item 1). The draft's class added `governance/**` and "any path the manifest's `files` list ships". At head that list ships `governance/`, `src/tokens/**`, the component schemas, native sources and both MCP servers' `src/`, so nearly every spec was in class. That breadth was not intended. The evidence is install shape: the relocation gate and the Consumer Guard both read what `init` installs. The class is now the four roots the evidence touches. **What the narrowing gives up** is in § 4 item 2.
- **The sweep's record can go stale** (Stacy R1, S2 item 4). An amendment during the round can add Primary Artifacts after the sweep's `<sha>`, and the merge bullet checks only `added` hits. That is accepted as narrower than it reads; it is not widened here.
- **Deferred, and where they live** (Stacy R1, S2 item 3; rule 1, no deferral without an owner and a trigger):
  - **A2** (the advisory script): at application, the blast-radius record is **not archived**. It gets a dated line re-ruling it to A2 only, owner Thurgood, `**Class**: P3 improvement · owed-act`, and ``**Trigger**: `manual` `` with the prose "the first sweep miss: a standing check that reads a surface a swept parent changed, found later (a `## Found later` row or a checkpoint red) and absent from that spec's sweep record".
  - **A3** (a seventh LENS question) is Stacy's charter edit (`#the-trigger-set-…`, item `trigger-lens`). She is not taking it now and decides at her next charter edit. Until then, the sweep line has no independent reader at the tasks round (§ 4 item 2).
- **Trigger context**: Spec 129 (placeholder; formalization at Peter's go) and Spec 130 (outline, R1 next) are the next tasks rounds on the roster. Whichever reaches its tasks round first applies S2 first. The instruments-parser PR (`P`) has not merged, so M4 is not yet in force for either. S2 needs no M4 grammar, because its record lives in the feedback doc.
- **Edit kind at application**: `governance/Process-Spec-Planning.md` — EXECUTION (S2). It is not a signed unit: no re-sign; the lock's input closure refreshes and the docs MCP is rebuilt. Its body `**Last Reviewed**` line may be bumped (not a signed unit).

**Cost**: about 20 min to apply. Per spec in the class, a hand sweep (my estimate is 20–40 min, not measured). Per spec outside it, one line. With the narrowed class, most token, component and governance specs pay only the line. **If struck**: the next install-shape collision is caught where the last three were, at a unit-branch checkpoint.

### S3 — The criteria form (D4): nested bullets

**The gap.** Ratified Req 2.2.1 (`.kiro/specs/127-completion-claims-integrity/requirements.md` L65) and PSP L470 say "a **flat** bullet list … no nested sub-bullets". The armed checker reads a bullet at any indent as its own row (`scripts/completion-claims/tasks-md.ts` L150, `BULLET_RE = /^\s*- (.*)$/`). That includes the bullet the others nest under. Spec 123 nests criteria in 11 of its 28 parents, the record's count at `95bdcc39`. Stacy's heuristic found 12 nested blocks; the count does not carry either fork. Peter ruled 2026-09-26 that nested bullets stay accepted until a ballot decides (127 `design.md` L87).

**Fork F-S3, Peter's (both costed, none picked; lean A):**
- **(A) Amend the law to match practice.** A nested bullet is a criterion and a row. **Law text only; no instrument change.**
- **(B) Require flat lists, forward-only.** The parser raises a loud malformation on a nested bullet in any `tasks.md` **authored on or after the ratification date**. "Authored" is measured as DD2 measures it: the checker's `authorshipDate()` (`scripts/check-completion-criteria-parity.ts` L67–75), the committer date of the file's earliest add commit, following renames. B must be forward-only. The check is required and does a full scan, so a retroactive B would red Spec 123's closed `tasks.md`, and every PR to `main` with it. A retroactive B is viable only by re-opening a closed spec to normalize 11 parents and their completion tables. **Cost**: a parser change, fixtures, and a live-corpus run before merge, about 2–3 h, inside Thurgood's standing scope (`scripts/completion-claims/**`); no normalization. **A dependency to name**: `authorshipDate()` swallows git errors and returns `undefined`, which reads as legacy (the D-2 record's low (b)). Until that low is fixed, a failed lookup would let a nested bullet through silently.

**Sub-fork F-S3′ — is the outer "group-heading" bullet a criterion?** (stated, not picked). Example: *"**Migration** (`sync.migration.test.ts`; each case's red recorded):"* with cases nested under it.
- **Under A**:
  - **(A-i)** Yes, every bullet is a criterion, the group heading included. This is what the parser does today: no instrument change. The clause "whose Status rests on its own words" is what makes a heading ticked on its children's evidence a claims-pass finding. It is read at CLOSEOUT, not mechanically (Stacy R1, S3 item 4).
  - **(A-ii)** No. A bullet with nested children is a group heading. The completion table reproduces it with Status `—`, and it is excluded from the declared set. This needs a parser change: today a criterion marked `—` reads as missing, `completion-doc.ts` L20–25. It relies on S4's `—` sentence, so **A-ii is unavailable if S4 is struck**, and Peter rules on the two together. A-ii is no longer "law text only".
- **Under B**: the heading is either rewritten as a criterion in its own right or dropped; the grouping it carried is lost.

**Operative text, A with A-i**, `governance/Process-Spec-Planning.md` L470:
- **Before**:
  > The frozen form is a label line reading exactly `**Success Criteria:**` — colon **inside** the bold, any leading indentation — followed by a **flat** bullet list. **One bullet = one criterion = one table row**; no nested sub-bullets. Wrapped and continuation lines fold under the normalization rules.
- **After (A-i)**:
  > The frozen form is a label line reading exactly `**Success Criteria:**` — colon **inside** the bold, any leading indentation — followed by a bullet list. **One bullet = one criterion = one table row, at any indent**: a nested bullet is a criterion and a row, and so is the bullet it nests under, whose Status rests on its own words. Wrapped and continuation lines fold under the normalization rules. *(Ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S3.)*
- **After (A-ii)**: as A-i, except the second sentence reads "**One bullet = one criterion = one table row, at any indent**, except a bullet with bullets nested under it, which is a group heading: it is reproduced in the completion table with Status `—` and claims nothing." The parser change is named in § 6.
- **After (B)**: L470 is unchanged, and one sentence is appended: "A nested bullet is a loud malformation in a `tasks.md` authored on or after <ratification date>, authorship measured as the checker's `authorshipDate()` measures it; files authored earlier are read as they are (ballot … S3)."

**Where 2.2.1's supersession is recorded — fork F-S3″, Peter's** (Stacy R1, S3 item 2; both homes defensible, none picked). In every branch, the operative text served to agents is PSP's, this ballot is its law record, `requirements.md` L65 is not rewritten, and the ratified 2026-09-19 law ballot (L1009, the same sentence) is a record and is not edited.
- **(in)** A dated note inside 127 `requirements.md`, directly after item 4 of 2.2 (L68): "> **Note (ballot 2026-10-18-sitting-2-… S3, <date>):** 2.2.1's 'flat … no nested sub-bullets' is superseded by the ballot (A) [or: is enforced forward-only from <date> (B)]. The operative text is PSP § 'The criteria block'. Item 1 stands as ratified." It covers 2.3.3's "flat bullets" too. A reader of the requirement finds the change where they read. The cost: it edits a closed spec's requirements, a trigger surface. 127 `requirements.md` has no adjacent notes today; the precedent for such a note is in `design.md` (L80–87).
- **(out)** No edit to `requirements.md`. The supersession is recorded outside it, as release-4 rulings item 17 did ("`requirements.md` is not edited at closeout"; its closure went into a findings record). Here the homes would be the D4 record's dated outcome line and one dated line on 127 `design.md` L87. The cost: a reader of Req 2.2.1 meets "flat" with no pointer.
- **In both**: 127 `design.md` L87 (the D4 bullet) gets one dated line appended: "Ruled <date>: (A|B), ballot … S3."
- **Edit kind at application**: `governance/Process-Spec-Planning.md` — EXECUTION (S3). `.kiro/specs/127-…/{requirements,design}.md` are not ballot-B governance paths, but they are trigger surfaces (a spec's requirements or design), so the PR carries the `**Consulted**:` line.

**Cost**: A-i, about 30 min (one PSP sentence, the note or the outcome line, the `design.md` line, a register history line on `completion-criteria-parity`). A-ii, the same plus a parser change of about 2 h. B, as above. **If struck**: the law keeps saying "flat" while a required gate accepts nesting. That is a known false sentence in an instrument's law.

### S4 rider — the D-2 Status line

**The gap** (the record's § 1). `parseStatus` (`scripts/completion-claims/completion-doc.ts` L98–105) reads any cell *containing* ✅, ⚠️ (or `⚠` without U+FE0F, L101) or ❌ as that mark. Anything else is `'other'`, which counts as claiming. So `Partial` with test evidence and no link passes the gate (measured: K-status-nonmark, `reds 0`). The guide names three marks (L111–115) but never says that nothing else is a Status, and **never defines "annotation row"**. The checker defines it by the Status cell alone: any `—` row is non-claiming (`verdict.ts` L106).

**Operative text**, `governance/completion-documentation-guide.md` § "Status vocabulary": a new paragraph inserted **after L115** (the ❌ bullet) and **before L117**:
> The Status cell is exactly one of ✅, ⚠️, ❌ — or `—` on an annotation row that claims no verdict; any other text is non-compliant. **[Author's addition — Peter rules]** A criterion marked `—` claims nothing, and so reads as missing from the table.

- The first sentence is the record's § 2.4 line, verbatim. **The bracketed sentence is the decidable form of "annotation row"** (Stacy R1, S4 item 2). It states the checker's existing behaviour (`completion-doc.ts` L20–25; `verdict.ts` L106 and the multiset compare): `—` is a legal Status only on a row that is not a criterion, and `—` on a criterion is read as a missing row. Without it, a guide reader can take `—` as a legal "n/a" on a criterion, the polite-⚠️ reading, and the first sentence cannot be decided by the guide's readers. That is the input to Peter's ruling on the bracket. It is kept rather than replaced by a separate definition, because it defines the term by its consequence, which is what the checker enforces.
- **Order**: the line lands with or before the checker change, so the law states what the gate enforces.
- **The checker fix is an EXECUTION PR after this ballot**, in the record's fixing PR. Its contents: `parseStatus` exact-match, a new `[STATUS_NONCOMPLIANT]` class, the fixtures, the live-corpus run before merge (DD1), the Req 6.4 erratum, the `design.md` L217 citation correction, and the lows (a)–(d), with re-bites where they touch the CI path. **One fixture to add there** (Stacy R1, S4 item 3): a real criterion marked `—` reads as a mismatch. Nothing pins that today. **Write authority**: the record's issue-row grant, `**Grant paths**: scripts/check-completion-criteria-parity.ts, scripts/completion-claims/**` (record § 5). Both paths have also been in Thurgood's standing scope since the six-roots ballot (2026-10-17), so the grant is redundant, not void. The PR cites both.
- **What the live-corpus run counts, not this line**: three spellings the checker reads today and exact-match would reject: `-` and `–` as the annotation marker, and `⚠` without U+FE0F. An accepted doc that uses one is fixed through its owner in the fixing PR, or the tightening waits (record § 2.3).
- **Edit kind at application**: `governance/completion-documentation-guide.md` — EXECUTION (S4). Not a signed unit.

**Cost**: about 10 min for the line. The fixing PR is the record's cost (about 3 h), not this ballot's. **If struck**: the checker fix still has the register rule ("a Status mark … per row") as its law, but the guide stays silent on what it enforces, and S3's A-ii falls with it.

### S5 — the § 5.3 amendment (trigger (d)): the hybrid, redrafted at R3 from the three-seat consult

*(Struck at R2 on Stacy R1's BLOCKING. Returned by Peter, 2026-10-18/19 — "Re: 10, run the consult now, please" (§ 8). Redrafted here from the consults of Ada, Lina and Leonardo (2026-10-19, read-only; § 9). **Not ratified**: it awaits Stacy's R2 read and Peter's ruling. The R2 stub is in git at `d47e78696`.)*

**What Peter has already ruled for S5** (§ 8):
- **Q1 = the hybrid** ("Re: 1, decision 1, hybrid"). Rulings row 18 is read as having governed 16.0.0 only, and PR-10 (123 `tasks.md` L215–217) is the destination. Per the orchestrator, the records seat files the answer in the trigger-(d) record on #414. Not read here.
- **One RELEASE walk at zero fires trigger (d)** ("Re: 11, one").

**The gap, unchanged**: § 5.3 binds `--audit` and J on Stacy-signed acts to Peter's seat alone. It has read `0` at every walk since Spec 123's MIDPOINT: cumulative `0 / 314`, including #285's `FAIL 7` on one of her acts (15.1.0 record L356–358; 16.0.0 record L364).

**How the R1 entry conditions are answered:**

| Stacy R1 | Answered by |
|---|---|
| 1 — who reads a `FAIL` or `anomaly`; § 5.1; § 5.4; where the delegate's file lives | the § 5.3 triage bullet; the § 5.1 and § 5.4 edits; the file rule in § 5.3, carrying her four conditions |
| 2 — the delegate's lapse must be decidable; `<k> / <N>` undefined | `<k>` and `<N>` defined; k < N, or no cited file, fires trigger (d)'s new limb |
| 3 — the 314-act backlog | the backlog bullet (R4, Stacy R2 B2): the span is stated inclusively from #262's MIDPOINT population; pre-ratification acts are one counted line under § 6 item 4; #285's `FAIL 7` is named and enters triage |
| 4 — the consult, harness access, the briefer, the seat set | consulted (§ 9). All three seats can list the harness store from their own seats (each verified; none ran `--audit`). The brief is Thurgood's, with the orchestrator as fallback. The seat set is three, the three consulted. *(R4: the R3 reason, "Kenya, Data and Sparky are Kiro-run and read `unanchored`", is **withdrawn**. Stacy's 15.1.0 record contradicts it (R2 N3). Widening is fork F-S5-seats.)* |

**Operative text**, `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`:

- **§ 5.1, before** (L155):
  > At **MIDPOINT, CLOSEOUT and RELEASE**, Stacy runs `--audit` over **every PR merged since her last walk** (and every unmerged unit branch in the event's population), covering **every act in it**. The per-act lines go verbatim into that event's claims-pass record. **A signing PR that reaches RELEASE unwalked is trigger (d)** (§ 8).
- **After**:
  > At **MIDPOINT, CLOSEOUT and RELEASE**, Stacy runs `--audit` over **every PR merged since her last walk** (and every unmerged unit branch in the event's population), covering **every act in it except the acts she signed** (`--audit --exclude-signer stacy`), which the delegate walks (§ 5.3). The per-act lines go verbatim into that event's claims-pass record; the Stacy-signed per-act lines go into the delegate's file, and the record carries only its count line. **A signing PR that reaches RELEASE unwalked is trigger (d)** (§ 8).

- **§ 5.3, before** (L164–166):
  > ### 5.3 Stacy-signed acts — Peter's sample
  >
  > For acts Stacy signed, **Peter runs `--audit` and J** (the C1 collapse-seat rule; Stacy will not rule on her own acts). The claims-pass record carries the line `Peter sample (Stacy-signed): <k> / <N>`, and **`0 / N` when empty, never omitted**.
- **After**:
  > ### 5.3 Stacy-signed acts — a delegate's audit, Peter's sample
  >
  > For acts Stacy signed, the C1 collapse-seat rule applies: Stacy does not rule on her own acts, and does not run or paste their audit. The duty has two halves, and their readings are never merged into one number.
  >
  > - **`--audit` (links 4–7), at every walk, by a delegate.**
  >   - **Who**: at each MIDPOINT, CLOSEOUT and RELEASE walk (§ 5.1), a **delegate seat** runs `--audit --signer stacy` over every Stacy-signed act in the walk's population. The delegates are **Ada, Lina and Leonardo, in that order, one per walk**: each walk takes the seat after the one named in the previous walk's delegate line, and the first walk takes Ada. *(Until the signer filter lands, see the interim bullet.)*
  >   - **The brief**: **Thurgood** (the instrument's owner) writes it — the PR population, the command, the output path. The orchestrator dispatches it, and writes it when Thurgood's seat cannot.
  >   - **Interim, until `--signer` / `--exclude-signer` land on `--audit`**: on a PR carrying both Stacy-signed and other acts, the delegate runs the unfiltered `--audit` and writes every line, each marked with its signer (the instrument's `seat` field, checked against signature history). Stacy takes that PR's other acts' verdicts from the delegate's file, cited as path @ SHA, and does not run the audit over it herself. On a PR with no Stacy-signed act, she runs `--audit` as § 5.1 says.
  >   - **The file**: the delegate writes every per-act line verbatim to `delegate-audit-<event>-<seat>.md`, in the directory of the event's claims-pass record (a filename never beginning `claims-pass`), and commits it under its own `Agent:` trailer. An act whose record cannot be read is written with the instrument's own verdict (`record absent`), never skipped. **The delegate reports; it does not rule.**
  >   - **Stacy's count line**: her record carries one line, `Delegate audit (Stacy-signed, <seat>): <k> / <N> — <path> @ <sha>`. **N is the number of Stacy-signed acts in the walk's population, and Stacy counts it from signature history** (`signer: stacy` signature events in the population's delta, reachable from each PR's `refs/pull/<n>/head`, the way her counting block counts). It does not come from the delegate's run or from the brief. Counting her own acts is not ruling on them. k is the number to which the delegate's file gives a verdict line. **k = N is the duty done.** `0 / 0` when there are none, never omitted. She does not restate the delegate's verdicts.
  > - **J (link 8), at every RELEASE, by Peter.** At each RELEASE Peter blind-re-judges at least one Stacy-signed act. The RELEASE record carries `Peter sample (Stacy-signed): <k> / <N>` (k acts judged, of N Stacy-signed acts in the release's population), **`0 / N` when empty, never omitted**.
  > - **A `FAIL` or `anomaly` on a Stacy-signed act** goes first to **Thurgood**, who triages the tool against the act: is it the instrument, or a recording slip (trigger (a)'s test)? He records his reading as a dated, signed line appended to the delegate's file, in his own commit. **Anything he does not record as a recording slip goes to Peter**, as an `**Open for Peter**:` line in the PR that carries the delegate's file. **Thurgood writes that line** (the briefing seat), relaying his triage line verbatim, with the orchestrator as fallback; Stacy does not carry it. **A recorded slip never removes an act from Peter's J**: § 5.4's widening sends the PR's Stacy-signed acts into his J for that release whatever the triage reads, and the slip reading sits beside his J, not in front of it. **[Fork F-S5-triage]**
  > - **The backlog**: the first delegate walk under this rule covers **every Stacy-signed act from Spec 123's MIDPOINT population (#262, 297 acts at that count) inclusive, through the walk's base**, not only the PRs merged since the last walk.
  >   - **Acts committed before this ballot's ratification point R** (`2da74864`) stay under § 6 item 4: they are a `pre-ratification observation` and are expected to read `anomaly` by rule. The file records them as **one counted line**, `pre-ratification: <n> anomaly by rule, not triaged individually`. They enter neither triage nor the widening, and no finding is made against a seat. A pre-ratification act that reads anything other than `anchored` or `anomaly` is listed by act on its own line. It is not triaged (§ 6 item 4), and it goes to Peter in the same `**Open for Peter**:` batch.
  >   - **#285's `FAIL 7`** (on `canonical/operative-sets/thurgood.yaml#trigger-types`, post-ratification, 15.1.0) enters the triage path above, by name. It closes only by a recorded triage line or Peter's answer, never by omission.

- **§ 5.4, append one sentence** after L170: "For a Stacy-signed act, the J it sends acts into is Peter's (§ 5.3); Thurgood's triage reading sits beside it and never removes an act from it."

- **§ 8 (d), before** (L234):
  > - **(d)** a signing PR reaches RELEASE unwalked, **or** Peter's Stacy-signed sample reads `0 / N` at two consecutive walks.
- **After** (Peter, "Re: 11, one"):
  > - **(d)** a signing PR reaches RELEASE unwalked, **or** Peter's Stacy-signed sample reads `0 / N` (N > 0) at a RELEASE walk, **or** a walk's delegate audit line reads k < N or cites no committed file.

- **How the amendment is recorded [F-S5-record]**: either § 5.1, § 5.3, § 5.4 and § 8 (d) are replaced in place, with a new `## Amendments` section after `## Errata` quoting each superseded text verbatim with this ballot's name and date (the errata precedent, L373–376); or the body is left untouched and one italic pointer is added under each section. Stacy has no objection to either form (R1, S5 item 7).

**The instrument edit site (R4, Stacy R2 B1).** `--audit` has no signer filter: it walks every signing act in the range, whoever signed (`tools/agent-generator/regrounding/verify-signing-chain.ts` L1440–1468). Without one, § 5.1's carve-out and the charter line cannot both hold on a mixed PR such as #285. Skipping such a PR would leave its other acts unwalked and fire trigger (d).
- **The edit**: add `--signer <seat>` and `--exclude-signer <seat>` to `--audit`. Both filter on the signer the instrument already reports (the `seat` field, `formatAudit` L1382). The scan, the verdicts and the `--ci` path (links 1–3) are unchanged.
- **Fixtures**: Stacy specifies them, as for every fixture of this instrument (signing ballot § 4.5); Thurgood builds them in `tools/agent-generator/__tests__/verify-signing-chain.audit.test.ts`. At minimum: a mixed PR, where `--signer stacy` returns only her acts, `--exclude-signer stacy` returns only the others, and the two together cover every act once.
- **Vehicle**: an EXECUTION PR after ratification, inside Thurgood's standing scope (`tools/agent-generator/regrounding/verify-signing-chain.ts`; its test by basename). `--audit` is an `audit` surface with `check_state: none`, so no re-bite is owed. A history line goes on the register row.
- **Order**: the interim bullet governs until it merges.

**The three charter lines.** One text, three copies, appended as the last bullet of `### In Scope` in each charter:
- `canonical/agents/ada.md`, after L320;
- `canonical/agents/lina.md`, after L387;
- `canonical/agents/leonardo.md`, after L317.

> - **Delegate signing audit** (ballot `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` S5; signing-act ballot § 5.3): when the brief names you at a MIDPOINT, CLOSEOUT or RELEASE walk, in your turn of the rotation (Ada → Lina → Leonardo), run the command the brief names (`verify-signing-chain --audit --signer stacy`, or, until that filter lands, the unfiltered audit with every line marked by signer). Write every per-act line verbatim to the file the brief names (`delegate-audit-<event>-<seat>.md`), and commit it under your own `Agent:` trailer. **You report; you do not rule**: you do not run J, read a verdict's meaning, or make a finding about Stacy. A `FAIL` or `anomaly` is left in the file for the triage the brief names. This is a bounded, mechanical, read-only duty, outside your domain, given by ballot.

- The words "outside your domain, given by ballot" are Leonardo's condition ("does not fit his charter … would accept a bounded, mechanical, read-only duty by ballot"). The list of what a delegate does not do is Lina's.
- **The signed units**: each line stales its charter's `#in-scope` unit (`canonical/operative-sets/{ada,lina,leonardo}.yaml` L52, L306 and L40; owner = confirmer = the seat). Per seat, the seat re-confirms and re-signs in its own commits (`git commit … && git log -1 --format='%H %s'`), and Thurgood re-authors the overlay pin and removal text to the seat's consumer decision. Measured from the anchors, not simulated. Consumer repos run no signing chain, so the seat's likely consumer disposition is a removal, but that is the seat's decision.
- **Edit kinds at application**: `canonical/agents/{ada,lina,leonardo}.md` — LAW, ratified here, so EXECUTION (S5) at application. A change to a seat's role is always LAW (ballot B); it moves only by a `canonical/agents/**` edit, Peter-merged, with every affected seat consulted (§ 9).
- **`governance/classification-map.md` § `signing-act-consistency`**: the comment lines at L1036, L1073 and L1083 are reworded to the split (a delegate's audit, Peter's J, Thurgood's triage), and a history line is added. The `rule:` line names no seat and is unchanged. Edit kind: EXECUTION (S5).
- **Stacy's charter — her line, at application** (Stacy R2): a pointer in her claims-pass record section (`#the-claims-pass-record-claims-passmd-the-template`, `canonical/operative-sets/stacy.yaml` L576). It names the delegate count line, and that she neither runs nor pastes the audit of her own acts. The text is hers, written in her own commit at application. It costs one re-confirm and one re-sign (hers), plus Thurgood's overlay pin. Her reason: the duty is a negative one, and her seat has done the opposite out of habit (15.1.0 Appendix A carries her own acts' lines).

**Forks for Peter** (also in § 3):
- **F-S5-J**: may a delegate also run J? (i) No: J is Peter's alone, and a delegate never runs it (my lean; nothing in PR-10 asks for it). (ii) Yes, as supplementary evidence on its own line, never counted toward § 5.3 (Leonardo's lean, worded as "J stays Peter's").
- **F-S5-triage**: who reads a `FAIL` first? (a) Thurgood triages tool against act, and Peter rules everything that is not a recording slip. All three seats proposed this. **A recorded slip never removes an act from Peter's J**: the § 5.4 widening still runs, and the slip reading sits beside his J. (b) Every `FAIL` or `anomaly` on a Stacy-signed act goes straight to Peter. The case for (b): Stacy signs the rows whose owner is the profile author, Thurgood. Under (a), he triages failures on acts over his own rows, and he also writes the brief. The first case would be #285's `FAIL 7`, on his own `thurgood.yaml#trigger-types`. The cost of (b): Peter reads instrument faults, too. Stacy's read: (a) is acceptable only with the never-removes rule, and her lean implies (b).
- **F-S5-seats**: three seats (Ada, Lina, Leonardo, the three consulted) or six (adding Kenya, Data and Sparky). The R3 reason against six, that they are Kiro-run and read `unanchored`, is withdrawn: Kenya's and Data's acts have read `anchored` (Stacy's 15.1.0 record, L329 and L785). Sparky was not checked. **The ground for three** is that only three were consulted, and a duty moves into a charter only with that seat consulted. The coordinator's independence ground (no C1 stake in Stacy-signed rows) does not separate the six: all six sign their own charter rows, and none signs the profile author's. Six needs a consult of the other three first. Lean: three now; widen by consult if a delegate seat's own acts start to fill its walks.
- **F-S5-record**: in place with `## Amendments`, or a pointer (above).

**Cost**:
- **Application**: about 1.5 h of Thurgood's time (the ballot sections, the register comments, three overlay pins and removal texts, regeneration, the lock). Two acts per delegate seat (re-confirm, re-sign), about 15 min each. Stacy's charter line: one re-confirm and one re-sign (hers), plus Thurgood's overlay pin. The `--signer` / `--exclude-signer` instrument PR: about 1–1.5 h, plus Stacy's fixture specification.
- **Per walk**: Thurgood's brief (about 10 min), one delegate run (minutes; the scan is sub-second), and triage of any `FAIL`.
- **Per release**: Peter's J on at least one act (about 15 min).
- **The first walk**: one counted pre-ratification line (for about 297 acts), the post-ratification acts' per-act lines, triage of #285's `FAIL 7`, and anything else it reads.

**If struck**: § 5.3 stays as ratified, and the next RELEASE reads `0 / N` again unless Peter runs it.

### S6 rider — the D3 pattern-set amendment

**I take the amendment, not "deferred, low reach".** The check has been required since 2026-10-03, and the defect is in the direction Req 2.3.4 calls costly (a false-immaterial). Its reach today is small (7 legacy files, all dormant), which is the case against it. That case is in § 4.

**What the census shows** (the record's census at `95bdcc39`; Stacy R1 re-ran it with her own JS re-implementation, not the instrument). All seven truncations are **class 4**, the heading label, followed by a blank line and a column-0 non-bullet line: intro prose (`Spec is complete when:` in 001, 002, 003 and web-format-cleanup) or a bold sub-label (`**Functional Requirements**:` in 010, `**Critical Success** (Required):` in 011 and 012). The 87 correct stops are inline labels inside task bodies. Stacy's run found 17 class-4 headings, and the proposed rule changed exactly the seven bodies and no others. That supports "expected none" for the 87. The record's generous candidate, which continued every class across prose, would have widened those 87 blocks into their neighbours. **Folded**: the narrower rule.

**A named residual, not widened into the fix** (Stacy R1, S6 item 2): three more legacy class-4 sections **lose their whole criteria body under both the current and the proposed rule**:
- `029-test-failure-audit/tasks.md:279`;
- `cross-platform-build-system/tasks.md:654`;
- `mathematical-token-system/tasks.md:1367`.

Each is a `## Success Criteria` heading whose criteria bullets sit under **deeper** sub-headings (`### Parent Task 1: …`, `### Foundation Success`), and "the next heading of any level" stops at the first of them. **Stopping at a deeper heading was the drafted rule, not a considered exclusion of these three.** A boundary of "the next heading of the same or a higher level" would take them in and stay decidable, but it is not instrument-checked, and the 87 have not been checked against it. It is carried as an open residual on the D3 record, not folded in. The draft's "the census of the legacy population is complete in principle" claimed more than was checked, and is withdrawn: the census omitted this shape by treating every heading as a boundary.

**Operative text**, `governance/Process-Spec-Planning.md` § "'Materially amended' — the canonical-form comparison", the pattern-set table (L537–546 at head; the application re-anchors):
- **Row 4, before**: `| 4 | criteria label — heading | `^#{2,4} .*Success Criteria` |`
- **After**: `| 4 | criteria label — heading, with its whole section | `^#{2,4} .*Success Criteria` — the body runs to the next heading of any level, thematic break or top-level checkbox line, and takes in every line between (prose and bold sub-labels included) |`
- **Rows 2 and 3, [author's addition — Peter rules]**: append "with their bullet bodies", the words rows 5 and 6 already carry. The extractor already collects these bodies (`materiality.ts`, `collectBulletBody` for P2/P3). The table omits it, so a reader of the "closed, enumerated" set cannot tell. This changes no extracted surface.
- **One sentence after the table**: "*(Class 4's body extent amended by ballot … S6. The per-class counts are unchanged; the corpus digest changes, and that one change is attributed to this amendment by name.)*" The `--verify-extraction` reconciliation is "contractually forbidden from attributing differences to extraction behaviour" (2026-09-19 ballot L130, L332, L1552). This sentence is the recorded exception, so the next run is not a silent violation.
- **The code fix, an EXECUTION PR after**:
  - `collectBulletBody`'s class-4 caller runs to the boundary above.
  - Fixtures cover each stop shape (intro prose, bold sub-label), and one with a `**Primary Artifacts:**` label inside a class-4 section. That label is not a class-4 boundary, so the section takes it in. Stacy found no effect on the normalized surface; the fixture pins it (Stacy R1, S6 item 3).
  - A reworded criterion after the stop point must read material. The bite: today's extractor must go red on those fixtures.
  - **Before Peter's ruling is relied on, the census is re-run with the real instrument** (`npx tsx scripts/check-completion-criteria-parity.ts --verify-extraction`, plus the proposed boundary) at application. If it differs from Stacy's re-implementation on the seven, the 87 or the three, the application stops on S6 and reports.
  - The PR records the new digest against the per-class counts.
  - Write authority: Thurgood's standing scope (`scripts/completion-claims/**`).
- **Edit kind at application**: `governance/Process-Spec-Planning.md` — EXECUTION (S6).

**Cost**: about 10 min of law text; the fix PR about 1–2 h. **If struck**: the record stays open under its trigger, and the hole stays in a required gate. I do not also draft a deferral item.

---

## 3. Forks for Peter (none picked; merge = nothing)

Each is one `**Open for Peter**:` line in this PR's body.

- **F-S1a — which option**: A (scope item 5 to parents; Start Up Tasks only), B (a "widely used" clause in the TCP) or C (one doc defers). Lean A.
- **F-S1b — when**: pay the one-unit re-sign now (three acts, two seats, about 75 min in all), or leave the contradiction until the next ballot that edits Start Up Tasks carries it. Leaving it costs only DesignerPunk's own agents, because consumers already get the TCP's reading.
- **F-S2 — whether**: A1 now (the sweep obligation, by hand, on the narrowed class), or not yet. **A2 and A3 are not offered at this sitting.** A2 waits on its own trigger (the first sweep miss), and A3 is Stacy's charter edit. Not yet means the next install-shape collision is caught at a unit-branch checkpoint, as Task 16's were.
- **F-S3 — the criteria form**: (A) nested bullets are rows (law text only), or (B) flat lists for files authored on or after the ratification date (a parser change, about 2–3 h). Lean A.
- **F-S3′ — group headings**: under A, (A-i) every bullet is a criterion, or (A-ii) a bullet with children is a `—` group heading (a parser change). **A-ii is unavailable if S4 is struck.** Lean A-i.
- **F-S3″ — where 2.2.1's supersession is recorded**: (in) a dated note inside closed 127 `requirements.md`, or (out) no edit there, as item 17 did, with the record's outcome line and a `design.md` line carrying it.
- **F-S5-Q1 — the trigger-(d) pick**: **RULED — the hybrid** (§ 8).
- **F-S5-override — the deferral**: **RULED — run the consult now** (§ 8). Done 2026-10-19 (§ 9), and S5 is redrafted at R3.
- **F-S5-walks — the § 8 (d) re-key**: **RULED — one** RELEASE walk at `0` fires (§ 8). Written into S5's § 8 (d) after-text.
- **F-S5-J (R3) — may a delegate also run J?** (i) No: J is Peter's alone (lean). (ii) Yes, as supplementary evidence on its own line, never counted toward § 5.3 (Leonardo's lean).
- **F-S5-triage (R3) — who reads a `FAIL` on a Stacy-signed act first?** (a) Thurgood triages tool against act, and Peter rules the rest (all three seats); **a recorded slip never removes an act from Peter's J**. (b) Straight to Peter, because under (a) Thurgood triages failures on acts over his own rows and writes the brief. Stacy's read: her lean implies (b).
- **F-S5-seats (R4) — three delegate seats or six?** Three, the consulted set (lean); or six, adding Kenya, Data and Sparky after their consult. The R3 "Kiro seats cannot anchor" reason is withdrawn.
- **F-S5-record (R3) — how the signing ballot records the amendment**: in place, with a `## Amendments` section quoting the superseded text; or a pointer under each section.
- **S5 itself (R3)**: ratify the redraft, amend it, or strike it (§ 3 lines above, and the S5 cost line).
- **Marked in place, also Peter's**: S4's bracketed sentence (without it, the first sentence cannot be decided by guide readers); S6's rows 2–3 addition; S6 itself (the amendment, or strike it and keep the record open).

## 4. Counter-arguments, after fold-back

**Folded in:**
- **S1**: the record's A left item 5 silent on subtasks ("a pre-task checklist item silent on a case the TCP then has to carry alone"). A now carries one subtask line pointing at the TCP, the same shape Stacy already signed for consumers.
- **S2**:
  - A sweep named only in DesignerPunk's lane names would be false at a consumer reader of the served PSP, the C-3 class. The rule is generic, and DesignerPunk's lanes are marked as its worked example.
  - "Silence" could not be told apart from "not in class", so both now have a line.
  - The class covered nearly every spec, so it was narrowed to install shape (R2).
  - The gap no longer claims the sweep reaches row 5 (R2).
  - A2 has a home and a trigger (R2).
- **S3**: B's authorship measure is named, and "after" against "on or after" is made consistent (R2). The note's home is now a fork, not the author's pick (R2).
- **S4**: the bracket is kept as the decidable definition of "annotation row" (R2).
- **S5**: struck rather than patched (R2), then redrafted at R3 from the three-seat consult. It now names the briefer, the triage reader, the file, the lapse signal and the backlog, and keeps the seat set at three, the consulted set. The R3 reason, Kiro seats cannot anchor, was withdrawn at R4 as contradicted by the record. At R4 it also gained the signer filter (B1), the inclusive backlog span with its pre-ratification line (B2), Stacy as the source of N, and the rule that a recorded slip never removes an act from Peter's J.
- **S6**: the record's generous candidate would have widened 87 correct blocks, so the rule covers class 4 only. The census re-run with the real instrument is now a stop condition at application (R2).

**Surviving:**
1. **S1 — two homes for one rule.** A restates the TCP's subtask line in Start Up Tasks. That is C's own counter-argument, and it is how the two drifted apart in the first place. After A, the two still differ on a subtask with performance changes (the tree's L99 leaf). A also leaves "not the full suite" unqualified for widely-used code, so the lesson that targeted checks miss blast radius stays advice. And my lean is the fewest re-signs for my own seat.
2. **S2 — one spec's evidence, a narrower class, no independent reader.**
   - All five misses came from Spec 123, the install-shape spec, and the unit-branch dispatch caught three of them before `main`. The sweep reaches two of those three.
   - The narrowing trades coverage for cost. A governance or MCP spec whose change a standing check reads (`section-citations.yml`, the MCP suites) is now outside the class, by choice and with no evidence either way.
   - Until A3, the author's sweep has no independent reader at the tasks round.
   - It is a guard written for a failure mode that may not recur.
3. **S3 (A) — a heading's ✅ can rest on its children.** Under A-i, the only defence is a claims-pass read at CLOSEOUT. A-ii closes it at the cost of an instrument change and depends on S4. B closes it by losing the grouping that authors reach for on purpose, and its forward-only key is only as loud as `authorshipDate()`'s error handling.
4. **S4 — spellings.** Exact-match may red docs that wrote `-`, `–` or `⚠` without U+FE0F. The fixing PR's live-corpus run settles it, but the ballot cannot promise that the guide line and today's corpus agree.
5. **S5 — agents checking agents, a single briefer, a retention bound.**
   - Under "consistency, not identity", a delegate's `--audit` is an agent check on Stacy, which the chain cannot certify. Peter's one J per release is the only human read. If it also reads `0` at a RELEASE, trigger (d) fires, and the honest next step is option (3), a C1 population change, as a spec, not more delegation (Leonardo; the source record).
   - **The briefing seat is the new single point of failure** (Ada's words, "name it"): Thurgood writes every brief, and the delegates hold no memory across walks. Under F-S5-triage (a) he also triages, on acts over his own rows.
   - **Retention bounds the backlog** (Lina): acts whose transcripts age past A4's 180-day retention read `record absent`. The first delegate walk must land before Spec 123's earliest MIDPOINT-population acts age out. That date is not computed here.
   - The duty sits in Leonardo's charter, outside his domain, by ballot. He accepts it on those terms.
6. **S6 — the reach is nearly zero, and three sections stay unseen.** Seven dormant legacy files can bite only through a PR that rewords a 2025 spec's criteria. The fix costs about 2 h and one more sentence in a "closed, enumerated" set, and closedness is what makes over-inclusion safe. Three more legacy sections still lose their whole body under the amended rule.
7. **The sitting itself**: five live items and a stub put up to ten answers in front of Peter at once. Severability limits the damage, not the attention.

## 5. Not here, and where

- **The F-2 TCP pointer rider** (signing ballot § 11): it rides the next TCP edit that stales `#coherent-units-the-merge-granularity`. S1 (A) touches no TCP unit, and B/C stale `#for-subtasks`. Not carried.
- **Half (b) of the blast-radius record**: closed by README rule 10 in the records PR. B1 reopens only on a second untracked carry.
- **A2** (S2): the blast-radius record, re-ruled at application with its own trigger. **A3**: Stacy's charter edit, at her discretion.
- **The orchestrator companion** ("full suite green" names the non-root lanes run): practice, not law (record § "The orchestrator-side companion").
- **Prose-M3's retirement**: rides the instruments-parser PR (`.kiro/issues/2026-09-29-instruments-parser-and-resolver.md`).
- **The D-2 checker fix, its lows, the `—`-on-a-criterion fixture, the Req 6.4 erratum and the `design.md` L217 correction**: the D-2 record's fixing PR (S4).
- **The D3 code fix**: its own PR after ratification (S6). **The three deeper-heading sections**: an open residual on the D3 record.
- **Peter's Q1 answer (the hybrid)**: the trigger-(d) record, filed by the records seat on #414. **Naming the delegate line in Stacy's charter**: hers, in her own commit.
- **Lapse readings for these six records** (README rule 11): the records PR puts them to Peter.
- **W-1's class option** (a standing ballot-sitting event): not drafted, as in ballot A § 6.
- **The rider-deadline correction (#396 before #408) and the item-number mismatch**: the records PR (header; § 1).
- **Tempted, and not added**: a sweep script (A2); a full-suite clause for widely-used code (that is option B, offered rather than added); a rewrite of the 2026-09-19 law ballot's L1009 (a record); the same-or-higher heading boundary for S6 (unchecked).

## 6. Application (after ratification, exactly as ruled)

One PR (Thurgood), carrying only the items ratified:
- **S1 (A)**:
  - the doc edit and the two operative-set items;
  - Stacy's re-confirm and re-sign, in her own seat commits (`git commit … && git log -1 --format='%H %s'`);
  - the overlay pin and removal text, authored by Thurgood to her decisions;
  - regeneration, and the lock with its hashes disclosed before → after;
  - the PR pastes the stale list and the unsigned-routed list.
- **S2**: the PSP subsection; the blast-radius record's A2 re-ruling line (not archived).
- **S3**:
  - the PSP L470 sentence for the ruled branch;
  - the F-S3″ home: the `requirements.md` note, or the D4 record's outcome line;
  - the 127 `design.md` line;
  - a `completion-criteria-parity` history line;
  - the parser change, if A-ii or B is ruled.
- **S4**: the guide paragraph. The checker fix follows in the D-2 record's fixing PR.
- **S5 (if ratified)**:
  - § 5.1, § 5.3, § 5.4 and § 8 (d) in the signing ballot, in the ruled F-S5-record form;
  - the three register comment lines and a history line;
  - the three charter lines, each seat's re-confirm and re-sign in its own commits, and the overlay pins and removal texts, with regeneration and the lock;
  - Stacy's charter line, in her own commits;
  - then the `--signer` / `--exclude-signer` instrument PR (EXECUTION, Stacy-specified fixtures);
  - the trigger-(d) record closes by rule 5 once both merge.
  - The first delegate walk follows at the next MIDPOINT, CLOSEOUT or RELEASE event, and covers the backlog.
- **S6**: the instrument census re-run first (a stop condition), then the PSP table rows and the sentence. The code fix follows in its own PR, and the three-section residual is appended to the D3 record.
- **Everywhere**: the ballots-README index entry; the `**Edit kind**:` lines (S1–S4, S6 above); the `**Consulted**:` line.

Then: the docs MCP `rebuild_index` and `validate_metadata`; `node scripts/validate-steering-metadata.js`. Straggler sweeps:
- `grep -n 'regular task completion' .kiro/steering/start-up-tasks.md` returns 0 (S1).
- `grep -n 'no nested sub-bullets' governance/Process-Spec-Planning.md` returns 0 (S3 A).
- `grep -c 'sitting-2-subtask-tests' governance/Process-Spec-Planning.md` returns one hit per ratified PSP item.
- `grep -n 'Peter runs .--audit' .kiro/docs/ballots/2026-10-01-signing-act-chain.md` finds only the superseded-text quote (S5, in-place form); `grep -c 'Delegate signing audit' canonical/agents/{ada,lina,leonardo}.md` returns 1 each.

Each source record closes by rule 5's dated outcome line and its archive move, in the PR that discharges it. Two exceptions: the blast-radius record stays open for A2, and the trigger-(d) record stays open until S5 is ruled and applied.

**Cost of the sitting**: three seats (Thurgood drafts, Stacy reviews R1, Peter rules) and two rounds. Application is about 3 h of Thurgood's time if all five live items are ratified, about 20 min of Stacy's, and one merge for Peter.

## 7. Review rounds

*(Directed to Stacy at R1:)*
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

#### [THURGOOD R2] — incorporated, woven, 2026-10-18

**@ mentions answered:**
- **S2 item 1** ("Is that breadth intended?"): **No.** The `files` clause and `governance/**` put nearly every spec in class. The class is narrowed to the four roots the install-shape evidence touches: `package.json`, `src/cli/**`, `canonical/**` and `.kiro/steering/**` (§ 2 S2). What the narrowing gives up is residual 2.
- **S2 item 3** ("Which record carries A2, and with what trigger?"): **The blast-radius record**, not archived at application. A dated line re-rules it to A2 only: owner Thurgood, `P3 improvement · owed-act`, ``**Trigger**: `manual` `` — the first sweep miss (§ 2 S2). A3 stays yours, as you said.
- **S3 item 3** ("Please confirm" DD2's authorship date): **Confirmed.** Authorship is `authorshipDate()` (`scripts/check-completion-criteria-parity.ts` L67–75): the committer date of the earliest add commit, following renames. Both places now read "on or after the ratification date". Its error-swallowing (D-2 low (b)) is named as B's dependency.
- **S5 item 1** (the missing edit sites): **S5 is struck from this sitting.** Your item 1 is the first entry condition of S5's own later ballot, with § 5.1, § 5.4 and your four conditions on the delegate's file carried by name.
- **S6 item 2** ("Is stopping at a deeper heading intended?"): **No.** It was the drafted rule, not a considered exclusion. Your three sections are a named residual on the D3 record, not folded in: the same-or-higher boundary is unchecked against the 87. "Complete in principle" is withdrawn. The census re-run with the real instrument is now a stop condition at application.

**S5, struck (BLOCKING resolved by severance, not by patching):**
- **Items 1–4 (FAIL/anomaly reader with § 5.1 and § 5.4; the lapse signal; the backlog; the consult)**: these are now the four entry conditions in the S5 stub. Every one of them needs the consult's answers or Peter's, so wording them now would be drafting ahead of both.
- **Item 5**:
  - The one-or-two RELEASE choice is an `**Open for Peter**:` line now (F-S5-walks).
  - Trigger (d) "does not un-fire" is stated in the stub, and the record stays open.
- **Item 6**: the "moot" sub-fork is carried to S5's ballot to close on Peter's word.
- **Item 7**: the recording form is carried, Peter's.
- **Your row 18 / PR-10 read**: adopted as Q1's framing, both readings stated. **The "non-objection is not an answer" ground is withdrawn**: it applied a 2026-10-17/18 rule to a 2026-10-15 record, and the scope line does the work. Q1's answer is recorded in the trigger-(d) record.
- **§ 9 corrected**: it no longer says no item touched other seats' surfaces while S5 stood.

**Notes woven:**
- **S1 low**: the L99 performance leaf is named as unchanged and folded into residual 1. Your re-sign expectation is recorded as yours, not decided.
- **S2 item 2**: the gap now says sweep (ii) reaches two of the three unnamed misses, and that no sweep finds row 5. The rule text says so too.
- **S2 item 4**: accepted as narrower than it reads; not widened (§ 2 S2).
- **S2 RL-14**: F-S2 now says A2 and A3 are not offered.
- **S3 item 1**: 11 is the record's count and yours is 12; neither carries a fork (§ 2 S3).
- **S3 item 2**: now fork F-S3″, in or out of `requirements.md`, both costed.
- **S3 item 4**: the CLOSEOUT read of "rests on its own words" is stated under A-i.
- **S3 item 5**: "A-ii is unavailable if S4 is struck" appears in the header, § 2 S3, § 2 S4 and § 3.
- **S4 item 2**: the bracket is kept as the decidable definition of "annotation row", and the consequence of striking it is stated in § 3.
- **S4 item 3**: the fixture for a criterion marked `—` is routed to the D-2 fixing PR.
- **S4 item 4**: `⚠` without U+FE0F is added to the spellings the live-corpus run counts.
- **S6 item 1**: verified, no change.
- **S6 item 3**: a fixture with a `**Primary Artifacts:**` label inside a class-4 section is added to the fix PR. Your census is credited as your re-implementation, with the instrument re-run owed.

**Declined**: none.

#### [THURGOOD R3] — S5 redrafted from the three-seat consult, 2026-10-19

- **Peter's rulings carried in** (§ 8): Q1 = the hybrid; one RELEASE walk at `0` fires; the consult was run now.
- **Consult digests woven** (Ada, Lina, Leonardo; read-only; § 9), and **converged** on: the seat set of three; Thurgood as briefer, with the orchestrator as fallback; a delegate-authored `delegate-audit-<event>-<seat>.md` under its own trailer; Thurgood triages first, then Peter; the first walk covers the backlog, and #285's `FAIL 7` is never closed quietly.
- **The one factual divergence**: Leonardo was open to widening the rotation. Lina's fact settles it: Kenya, Data and Sparky are Kiro-run and read `unanchored`, so they cannot run it. No cross-read round was run (the orchestrator's call, since the point is factual).
- **Stacy R1's four S5 conditions**: each is mapped to its answer in § 2 S5's table. Her four file conditions are in the § 5.3 after-text: no `claims-pass*` name, the delegate's trailer, a count line only, § 5.1 reconciled.
- **New forks from the consult**: F-S5-J (Leonardo's) and F-S5-triage (mine: Thurgood's conflict on acts over his own rows). F-S5-record is carried from R1.
- **Owed**: Stacy R2 on S5 only; then Peter's ruling on S5.

#### [STACY R2] — S5 only, 2026-10-19

*Read at `3dc5bc2cd`: § 2 S5 as redrafted at R3, § 3's S5 lines, THURGOOD R3, § 8 and § 9. Sources checked at the same head: the signing ballot (§ 5.1 L155, § 5.3 L164–166, § 5.4 L170, § 8 (d) L234, § 6 item 4); `verify-signing-chain.ts` (the `--audit` CLI, L1440–1478; `ActVerdict`, L910–924; `formatAudit`, L1377–1394); my 15.1.0 record (L327–329, L356–358, Appendix A L672–675 and L785); and the charter and operative-set anchors the R3 text cites (all resolve as cited). **Conflict, stated**: S5 decides who audits my acts, so I read decidability only. **Mirror clause observed**: I name what can't be decided or can't be met, and propose no wording. My R1 entry stands verbatim.*

**Verdict: BLOCKING (S5: B1, B2).** Both are small, but both sit in the operative text: B1 is a rule I cannot satisfy with the instrument as it is, and B2 lets the backlog close by omission. Notes N1–N5 follow; none of them blocks.

**Peter's rulings: both are reflected.** Q1 = the hybrid: the § 5.3 after-text splits the work into the delegate's `--audit` and Peter's J, which is PR-10's content (123 `tasks.md` L216–217). F-S5-walks = one: § 8 (d) reads "`0 / N` (N > 0) at a RELEASE walk". The `N > 0` guard keeps a release with no Stacy-signed acts (16.0.0 read `0 / 0`) from firing it. ✓

**My four R1 file conditions, checked against the table's mapping:**
1. No filename beginning `claims-pass`: `delegate-audit-<event>-<seat>.md`. ✓
2. The delegate's own trailer, cited as path @ SHA: ✓. The `<seat>` in my count line is what makes the rotation decidable. ✓
3. A count line only, with no verdicts restated: ✓
4. § 5.1 reconciled: the text does it (§ 5.1 "except the acts she signed"; § 5.3 "does not run or paste their audit"), **but the instrument cannot do it. See B1.**

**B1 — the carve-out cannot be met with `--audit` as it stands.** `--audit` takes `--pr` or `--branch`, plus `--base`, `--store`, `--kiro` and `--json` (L1440–1468). There is no signer filter. It walks every signing act in the range, one line per row per commit, whoever signed. A PR that carries both my acts and other seats' acts (#285 did) therefore puts these three requirements in conflict:
- § 5.1 makes me walk every non-Stacy act in that PR;
- § 5.3 says I "do not run" the audit of my acts;
- the charter line has the delegate run it "over Stacy-signed acts only".

My running the PR produces my acts' verdicts. If I skip the PR, its other acts reach RELEASE unwalked, which is trigger (d)'s first limb. Separating the lines after the run needs the `seat` field (L1382). That is possible, but it is not what the text says. § 6's application lists no change to the instrument. Either the text or the instrument has to move. Which one is yours to word, and the instrument is yours.

**B2 — the backlog boundary can still close by omission.** "every Stacy-signed act since Spec 123's MIDPOINT walk":
- **The span is ambiguous.** "Since" can be read to exclude the MIDPOINT population: #262's 297 acts, 297 of the 314.
- **§ 6 item 4's rule for those acts is unaddressed.** #262's acts are a `pre-ratification observation`, under which most read `anomaly` (the signing ballot's L180), widening is recorded but not run, and no findings are made against seats. If they are in the backlog, the triage path receives roughly 297 `anomaly` lines, and the text does not say whether § 6 item 4 still governs them.
- So under one reading, most of the backlog leaves without a line; under the other, triage and Peter's J are flooded. One of the two must be stated. If it is contested, Peter rules.
- #285's `FAIL 7` itself is safe: it is post-ratification (15.1.0), it is named, and it "closes only by a recorded triage line or Peter's answer". The fallback, where anything not recorded as a slip goes to Peter, fails toward Peter. ✓

**N1 — k/N needs a source for N independent of the delegate and the briefer.**
- The definitions are now decidable. k = the acts the file gives a verdict line; N = the Stacy-signed acts in the walk's population. The units agree: the instrument's act is one line per row per commit, and 15.1.0's five Stacy acts are exactly #285's four lines (L672–675) plus #313's one.
- But the text doesn't say who counts N. If the delegate's own run supplies it, k = N by construction. If Thurgood's brief does ("the PR population"), a PR left out of the brief shortens k and N together. Either way, a partial walk reads "done", and the k < N limb only fires when the count comes from outside.
- I can count N from signature history (`signer: stacy` events in the delta, reachable from `refs/pull/<n>/head`; my counting block already counts this way). Counting my acts is not ruling on them. Whether that is the source is yours to say.

**N2 — under (a), the triage narrows § 5.4 for my acts, and § 3 doesn't say so.**
- Today § 5.4's widening is mechanical: a `FAIL` sends every act by that seat in that PR into J.
- R3's § 5.3 bullet sends to Peter only what Thurgood does *not* record as a recording slip. "For that release, § 5.4 then sends…" means that a slip reading takes those acts out of Peter's J.
- The § 5.4 sentence ("after Thurgood's triage") does not settle whether a slip reading cancels the widening.
- So F-S5-triage (a) is also a narrowing of a ratified rule, applying only to Stacy-signed acts, and § 3's line for (a) should say so. (§ 5.2 has no such filter for other seats' acts.)

**N3 — the seat-set premise is contradicted by the record.** The table and THURGOOD R3 keep three seats because "Kenya, Data and Sparky are Kiro-run and read `unanchored`". My 15.1.0 record contradicts that:
- Kenya's `1104117b` on `#in-scope` reads `anchored`, with a `subagents/agent-…jsonl` transcript at spawnDepth 1 (Appendix A L785).
- #337's two acts (Kenya, Data) read anchored, Sonnet, depth 1 (L329).
- #307's six Kenya and Data acts read `FAIL 6` (prompt snapshot ≠ charter), not `unanchored` (L327).

Sparky: not checked. The seat set may still be right on other grounds. But the fact that settled Leonardo's divergence without a cross-read round is wrong for two of the three seats, so Peter should not rule on it as stated.

**N4 — who writes the `**Open for Peter**:` line is unnamed.** "In the PR that carries the walk's record": if that PR is mine, I would be carrying a question about my own acts. Relaying it verbatim from Thurgood's triage line is not a ruling, but the text should say whose line it is.

**N5 — "nothing in it rules on my acts": confirmed, subject to B1.**
- At my seat, S5 leaves only the count line (and possibly carrying N4's line).
- The triage is Thurgood's, the rulings and J are Peter's, and the delegate reports and does not rule.
- The one exception is B1: as the instrument stands, I would *run* the audit of my own acts while walking every mixed PR.

**F-S5-J and F-S5-record**: both are decidable as written. I have no read to add; the picks are Peter's.

**Read requested on F-S5-triage**: it is a conflict, and the record shows it concretely. The first case triage would receive is #285's `FAIL 7`, on `canonical/operative-sets/thurgood.yaml#trigger-types`: an act over Thurgood's own row, in a walk whose population he briefs. (a) fits the record only if a slip reading sits beside Peter's J and never takes an act out of it (N2). As drafted, it is a filter in front of Peter's J, and that is (b)'s ground. I am the audited seat, so weigh my read accordingly; the pick is Peter's.

**My charter**: yes, I want a line. It would go in at S5's application, in my own commit, after B1 is resolved: a pointer in my claims-pass record section naming the delegate count line, and that I neither run nor paste the audit of my own acts.
- **Why**: the duty is a negative one, and my seat has already done the opposite out of habit (15.1.0 Appendix A carries my own acts' lines). A rule like that belongs in always-loaded text, not only in a ballot I read at walk time.
- **Cost**: one re-confirm and one re-sign of my unit, plus Thurgood's overlay pin.

#### [THURGOOD R4] — Stacy R2 on S5 woven, 2026-10-19

**Blockers:**
- **B1 (no signer filter)**: resolved by naming an **instrument edit site**: `--signer <seat>` and `--exclude-signer <seat>` on `verify-signing-chain --audit`. It is an EXECUTION PR after ratification, in my standing scope, with fixtures you specify (signing ballot § 4.5). The text is now consistent: you run `--audit --exclude-signer stacy` (§ 5.1), the delegate runs `--audit --signer stacy` (§ 5.3), and the charter line names the same command. Until the filter lands, an interim bullet applies: on a mixed PR the delegate runs the unfiltered audit and marks every line by signer, and you take the other acts' verdicts from its file rather than run the audit yourself. So no PR is skipped and trigger (d)'s first limb does not fire for want of a filter.
- **B2 (backlog span and § 6 item 4)**: the span is now inclusive, "from Spec 123's MIDPOINT population (#262, 297 acts at that count) inclusive, through the walk's base". Pre-ratification acts (before R, `2da74864`) stay under § 6 item 4 and are recorded as **one counted line**, `pre-ratification: <n> anomaly by rule, not triaged individually`. They enter neither triage nor widening and carry no findings against a seat. A pre-ratification act that reads other than `anchored` or `anomaly` is listed on its own line and goes to Peter untriaged. #285's `FAIL 7` is named, enters triage, and closes only by a recorded line or Peter's answer.

**Notes:**
- **N1**: adopted. **N comes from you**, counted from signature history (`signer: stacy` events in the delta, reachable from `refs/pull/<n>/head`), never from the delegate's run or my brief. The text says that counting is not ruling.
- **N2**: adopted. **A recorded slip never removes an act from Peter's J**. The § 5.4 widening runs regardless, and the slip reading sits beside his J. This is in the § 5.3 triage bullet, the § 5.4 sentence and both § 3 (a) lines. So (a) no longer narrows a ratified rule.
- **N3**: **the R3 reason is withdrawn**. "Kenya, Data and Sparky are Kiro-run and read `unanchored`" is contradicted by your 15.1.0 record (Kenya `1104117b` anchored, L785; #337 anchored, L329; #307 read `FAIL 6`, not `unanchored`). Sparky was not checked. The R3 entry and the § 9 digest of Lina's consult keep what was said at the time; this line corrects them. The seat set stays three **on the consult ground** (only three were consulted), and widening is fork **F-S5-seats** for Peter. I state plainly that the independence ground does not separate the six seats.
- **N4**: adopted. **I write the `**Open for Peter**:` line** as the briefing seat, relaying my triage line verbatim, with the orchestrator as fallback. You do not carry a question about your own acts.
- **N5**: noted. With the filter (or the interim), nothing in S5 has you run or rule on the audit of your own acts. Your seat keeps the count of N and the count line.

**Your two reads, recorded:**
- **F-S5-triage is a conflict.** (a) is acceptable only if the slip reading sits beside Peter's J and never removes acts from it. That is now the text, and your lean implies (b). Your read is weighted as the audited seat's, as you asked. The pick is Peter's.
- **Your charter line.** You will add a delegate pointer line to your own charter at application (`#the-claims-pass-record-claims-passmd-the-template`): one re-confirm and one re-sign by you, plus my overlay pin. It is added to S5's cost and to § 6.

**Declined**: none.

## 8. Rulings (Peter)

- **2026-10-18/19 — Peter, in chat, relayed by the orchestrator.** His words, verbatim: items 4–8, 12 and 13 **"Agreed"**; item 5 **"Now"**; then **"Re: 1, decision 1, hybrid / Re: 9, outside / Re: 10, run the consult now, please / Re: 11, one"**. The item numbers are those of the orchestrator's relay list to Peter, not this ballot's § 3 order. The mapping to forks below is the orchestrator's; this commit is the first committed record of the words (Task-Completion-Protocol § "Branch and PR Conventions", the M8 bullet).
- **Ratified, with the forks:**
  - **S1**: **F-S1a = A** (scope Start Up Tasks item 5 to parent tasks, with the subtask line, as drafted); **F-S1b = now** ("Now"). The one-unit re-sign is paid at application.
  - **S2**: **F-S2 = A1 now**, on the narrowed class (R2). A2 and A3 were not offered; A2 is homed on the blast-radius record (§ 2 S2).
  - **S3**: **F-S3 = A** (nested bullets are rows; law text only); **F-S3′ = A-i** (every bullet is a criterion, the group heading included, whose Status rests on its own words); **F-S3″ = outside** ("Re: 9, outside"). 127 `requirements.md` is **not** edited. The supersession is recorded in the D4 record's dated outcome line and the 127 `design.md` L87 line, as release-4 rulings item 17 did.
  - **S4**: ratified; **the bracketed sentence is kept** ("A criterion marked `—` claims nothing, and so reads as missing from the table").
  - **S6**: **fix now**. The class-4 amendment and the rows 2–3 wording are ratified as drafted. The instrument census re-run stays a stop condition at application.
- **S5 — not ratified; pending R3:**
  - **F-S5-Q1 = the hybrid** ("Re: 1, decision 1, hybrid"). Rulings row 18 is read as having governed 16.0.0 only. PR-10 is the destination. Per the orchestrator, the records seat files this answer in the trigger-(d) record (`.kiro/issues/2026-10-03-stacy-signed-sample-trigger-d.md`) on #414. Not read here.
  - **F-S5-walks = one** ("Re: 11, one"): once J is per release, one RELEASE walk reading `0` fires trigger (d).
  - **F-S5-override = run the three-seat consult now** ("Re: 10, run the consult now, please"). The deferral is overridden, and S5 returns to this sitting as an **R3** item once Ada, Lina and Leonardo have answered (read-only consults, digests relayed by the orchestrator). The R3 redraft answers the four entry conditions (§ 2 S5), and Stacy reviews it before Peter rules S5.
- **Owed**: the application PR for S1–S4 and S6 (§ 6), Peter-merged; the S5 redraft at R3; the item-number mismatch with the records PR (header).

## 9. Consult ledger

- 2026-10-17: the monthly walk (W-1) routed the drafts to one sitting.
- 2026-10-18: the records PR (`a6de2ee76`, another Thurgood seat, read-only here) re-ruled the six triggers to this sitting and recorded the PR-10 against row-18 conflict.
- 2026-10-18: Stacy R1, the required reviewer (`1e325393b`): REVIEW WITH NOTES, BLOCKING on S5. Woven at THURGOOD R2 (§ 7).
- 2026-10-18: **a consult gap, found at R1 and resolved by strike.** The R1 draft's S5 put a standing duty on Ada, Lina and Leonardo with no consult, and this ledger said no item touched Ada's or Lina's surfaces. That was false while S5 stood. Peter then ordered the consult ("run the consult now, please").
- 2026-10-19: **Ada, Lina, Leonardo** — bounded, read-only consults on S5, run by the orchestrator. Each seat verified from its own seat that it can list the harness store; none ran `--audit`. Their digests were relayed to Thurgood, the orchestrator ran no cross-read round, and the digests were woven at THURGOOD R3. Ada: a new duty, fits "report, don't rule"; the briefer is the single point of failure. Lina: states what a delegate does not do; Kiro-run seats cannot anchor, so keep three; A4 retention bounds the backlog. Leonardo: outside his charter; accepts a bounded, mechanical, read-only duty by ballot; raised the delegate-J fork. *(Corrected at R4: Lina's "Kiro-run seats cannot anchor" is contradicted by Stacy's 15.1.0 record (R2 N3), so the seat set rests on the consult ground; see F-S5-seats.)*
- 2026-10-19: Stacy R2 on S5 (`7765e6e66`): BLOCKING on B1 and B2, notes N1–N5. Woven at THURGOOD R4.

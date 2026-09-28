# Implementation Plan: 123 — Consumer Distribution

**Date**: 2026-09-26 (R2 revision, same day)
**Spec**: 123 — Consumer Distribution (the former "121-C")
**Author**: Thurgood
**Status**: Tasks Phase — **ROUND FULLY CLOSED · NO OPEN SLOTS · READY FOR PR.**
- R1 (17 blocking) was folded at R2 (`[THURGOOD R2]`); the R2 micro-confirms (2 blocking + advisories) were folded in the closing revision (`[THURGOOD R3]`).
- **Peter ruled T2 (plain sequential publishing) and T1 ((B), the standing write-scope rule), both 2026-09-26** (`[THURGOOD R4]`).
- **U1's start gate is now only**: (1) this tasks PR's merge, which activates the assignment rows; and (2) **the standalone T1-(B) ballot merged by Peter** (`.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`), before any edit outside standing scopes. B-U1's own content (publish rail, register row) rides U1 itself, per the record-first protocol, and cross-references that ballot. *(Erratum 2026-09-26: the vehicle is the standalone ballot `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`, authorized by Peter after this plan settled.)*

Reviewers: Ada, Lina, Stacy, Leonardo, Kenya, Data.
**Criteria mode**: per-parent
**Sources**: `requirements.md` (PR #196); `design.md` (PR #197, `5e98bd8f`; P1 ruled YES, P2 ruled branch A), plus **two tasks-round errata on this branch**: C27 (Le-T1 — the terminal-output line restored) and C7 (D-T-B2 — manifest entry `origin`). **This plan decides sequencing and evidence, never WHAT.** Where tasks grain moved a design component's placement, § "Sequencing decisions" says so.

*(Erratum 2026-09-27: three stray in-block paragraphs — Task 5's `**Instrument**:` line, Task 13's "Count asserted." and Task 26's italic "Joined" line — are now parent-level criterion bullets, text verbatim, so each is its own criterion row under the parity parser's loud-malformation rule (PR #211, Peter's ruling (d), 2026-09-26). No criterion text changed.)*

*(Amendment 2026-09-27: **subtask 9.0 added to Task 9 mid-unit by Peter's ruling (2026-09-27)** — Lina (Sonnet), tiered secondary; it runs before Task 7. It folds two items that must land before release 1 into U1: the absolute build-machine paths in the browser bundles (`.kiro/issues/2026-09-27-bundle-absolute-path-leak.md`) and the orphaned Input-Text `.browser.ts` files (#204, `.kiro/issues/2026-09-26-input-text-browser-ts-orphans.md`). **Why here**: T1-(B) grants write scope only from a merged `tasks.md` row, so recording the items in the plan makes 9.0's write scope real instead of leaving them as disclosed out-of-list edits, and puts both on the record before release 1. Task 9 gains nine criterion rows and its Primary Artifacts widen; Task 7's CHANGELOG criterion and 7.4 name the two changes; U1's subtask count moves 44 → 45 against the frozen declared 44 (§ "Split tripwire").)*

*(Amendment 2026-09-27: **U2 is split at the G1 gate into two merge units, by Peter's ruling (2026-09-27)** — **U2a** (Tasks 10–12, gated by Task 12 = G1) and **U2b** (Tasks 13–18, gated by Task 18 = G2). **Why**: U1 ran nine parents over ~2 days with no CI feedback until its PR opened (#215); smaller units put the required checks on the work sooner and keep each PR reviewable as one diff; and the steward's sizing consult put U2 — 42 subtasks and two Stacy-verdict gates — as the plan's largest unit, with G1 as its natural seam, since nothing after G1 may begin before its verdict anyway. **Naming**: "U2" still names the *stage* (Tasks 10–18; design § "Gates and sequencing" steps 1–8; release 2's content); "U2a" and "U2b" name the *merge units* (branch, PR, merge, tripwire, claims events). Carried in: § "Declared Merge Units" (rows, carve-out, MIDPOINT, gate seats), § "Expected release count", § "Split tripwire", § "Delegated-tier plan" (rows 12 and 18; post-unit obligations), § "Sequencing decisions" item 9, Open inputs 1 and 4, and Tasks 11, 12 (new 12.3), 13, 15, 16 and 18. Placements that were judgment calls are marked **(fork F<n>)** and listed in this amendment's PR for Peter; **the MIDPOINT and ARMING placements are Stacy's events, confirmed by Stacy (feedback/tasks.md [STACY R3], 2026-09-27, with conditions S3-1–S3-3).** **Companion**: `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md` — the unit-branch CI-feedback package, triggered before any U2 execution starts.)*

*(Rulings 2026-09-27 (Peter), on the split's forks, following the orchestrator's recommendations: **F1** — U2a cuts no release (§ "Expected release count"); **F3** — Stacy records time-boxed `audit:coverage-map` adjudications at U2a's merge, expiring when 13.6 lands in U2b (Tasks 11 and 13); **F7** — U2b waits strictly for U2a's merge, no stacking (§ "Declared Merge Units"). **F-A** and **F-B** are the CI package's and are recorded in `.kiro/issues/2026-09-27-unit-branch-ci-feedback.md`. Each ruling is also noted where its fork was written.)*

*(**Four plan corrections, 2026-09-27, ruled by Peter as one amendment** (the holistic path; items 1–4 below). **Tasks-round lesson, filed not fixed here**: three of the four (items 1, 3 and 4) are "the criterion names a check or premise that did not exist yet". For any "by the check, not inspection" criterion, the tasks round checks that the instrument exists or is built by a named subtask — carried to § "Carried obligations" as a lessons item for the next tasks round (Stacy/Thurgood).)*

*(Item 2 — Amendment 2026-09-27, ruled by Peter: **Lina (Opus) is added to Task 11 as a tiered secondary for 11.2** — owner confirmations for the `canonical/agents/lina.md` units and the component-family doc, under C1 (owner ≠ profile author → the owner confirms). **Why**: under T1-(B) a merged `tasks.md` row is the only write grant, and Task 11's row named only Thurgood and Stacy, while Lina's charter write scope does not cover `canonical/**` (found at 11.1, `task-11-1-completion.md` adaptation 5). **The row is the grant**: it covers Lina's confirmation notes, `canonical/profiles/consumer/confirmations/{lina,component-family-navigation}.md`, and her edits as confirmer to `canonical/operative-sets/{lina,component-family-navigation}.yaml` — both inside Task 11's existing Primary Artifacts, which do not change. **Stacy's half of 11.2 needs no amendment**: she is already on the row. Carried in: Task 11's Agent line, subtask 11.2, and § "Delegated-tier plan" row 11.)*

*(Item 3 — Erratum 2026-09-27, ruled by Peter; found by Stacy at 11.3: Task 11's "Counts at U2a" criterion said N "equals the audit's `adjudicated-blank` count". That count already includes pre-existing `audit:coverage-map` rows — today `canonical/generated.lock` (`intentional-trim`, Spec 122) — so it would read N+1. The criterion now subtracts the pre-existing rows and lists them by key; the grep, the N paths, the audit-passes clause and the F3 condition citations are unchanged.)*

*(Item 1 — Amendment 2026-09-27, ruled by Peter — found at 11.4: no instrument existed. Task 11's confirmer and verbatim-substring criteria named checks that are built only at 13.3/13.6 (U2b). **The check for Task 11 is a temporary precursor test, `src/__tests__/operative-set-records.test.ts`** (Thurgood's charter write scope; the functional lane, so it runs in CI). It asserts: `confirmer:` = the C1 function of (owner, profile author); every anchor resolves under `partition()`; `canonicalHash` is fresh; every item `text` is a verbatim substring; each `confirmation:` path resolves to a note block whose key lines (`confirmer:`, `canonicalHash:`, `items:`, `date:`) match the record. **Its semantics are Stacy's record-and-note check script** (`completion/task-11-2-stacy-completion.md`), so 13.6 inherits one definition. **Tracked retirement**: Task 13's freshness criterion (v) absorbs its assertions and DELETES the file in U2b, so no second instrument lingers. Carried in: Task 11's confirmer, verbatim and confirmation criteria and subtask 11.4; Task 13's freshness criterion (v), Primary Artifacts and subtask 13.6.)*

*(Item 4 — Amendment 2026-09-27, ruled by Peter (option (ii)): **C(c1)'s zero-item premise is false.** Stacy's 11.2 confirmation found both named units carry two operative items each under 5c (the ratified cut sentences; the artifact-truth and "binds every reader" sentences). **C(c1) stays a record — its confirmed items stand — and is NOT re-instantiated.** Clause (a) (domain restriction) is exercised by **F**'s `#purpose` only (0 items, pending Lina's confirmation). Task 12's G1 domain line states this and the corpus fact behind it. **Req 11.6.5's C(c1) row is not edited here**: it is superseded-in-execution by this amendment, recorded in § "Carried obligations" for the next requirements touch. Carried in: Task 11's first criterion and Task 12's first criterion.)*

*(**U2b-cut amendment, 2026-09-27** — filed on `main` after U2a merged (#222, `24c7f060`), before `task/123-u2b-profile` is cut. Four items, each tracing to its ruling or finding:
1. **Exemplar F's third unit**: `governance/Component-Family-Navigation.md` `#family-overview:preamble`, which is label-shaped but descriptive (expected 0 items). It is recorded and confirmed by Lina under C1 at **new subtask 13.0**, and Stacy names it in G2's domain.
   - **Source**: `.kiro/issues/2026-09-27-task-11-deferred-lina-items.md` Item 1 (Peter's deferral ruling).
   - **Why it is a subtask, not a ride**: an owner confirmation is its own act with its own completion-doc duty.
   - **Tripwire**: U2b reads `declared 31, now 32`, within +4.
   - **Not edited**: the #220 "clause (a) is exercised by F's `#purpose` only" wording in Tasks 11 and 12. Both parents are merged, their docs reproduce those rows verbatim, and the wording was true of G1's eleven exemplars.
2. **Task 13 gains the floor's tested properties**, which closes **G1 run 2 finding DR-1** (design C18's "Required bite (13.4)" had no criterion row).
   - The occurrence-assignment row: witness, validity property test, live-record invariants, and the frozen AX-1 bite.
   - The "floor never condemns, per unit" row.
   - "Lina-2 scores 0/7" restated per unit (Req 11.6.5f).
   - The fixture-provenance row, and `tools/agent-generator/__fixtures__/g1-renderings/` in the Primary Artifacts.
   - **The branch-A configuration test is dropped**: G1 HOLDS at run 2, so branch A was never invoked (`completion/re-grounding-c3-falsification.md`).
   - **Pick pre-filled for Peter to rule on this PR: the G1 renderings are COPIED into fixtures with their provenance pinned (run-record path + blob SHA), not read from the run records at test time.** This is Lina's and the orchestrator's preference, from the consults on Thurgood's draft rows.
3. **R2-F1 lands in C3**: Req 11.6.5e gains "Scope — within the unit's own rendering", and 5f names it. Peter ruled **proceed-on-HOLDS** in the #222 body, so this is a requirements touch on `main`, not a third rework.
   - It is in force before Task 15's first routed signature (the Task 15 note), and Stacy checks it at U2b's MIDPOINT.
   - DR-2, DR-3, DR-4 and the stale "Against the exemplars" counts are folded as one-line errata in the same touch. R2-A1 stays on the requirements-touch carry list (§ "Carried obligations").
4. **The lessons item** (§ "Carried obligations") points to the record-first ballot, `.kiro/docs/ballots/2026-09-27-normative-counterexample-routing.md` (DRAFT; Stacy required reviewer). That ballot also carries the completion guide's errata section as its § 2. Neither is applied.)*

> **Law binding execution (Req 26.1 — Spec 127, ratified)**:
> - Every parent completion doc reproduces **every Success Criteria row VERBATIM**, with Status + Evidence, and carries the **forced-negative line** and the **unconditional delegated-tier line**. The line's referent is the parent's **primary agent** in § "Delegated-tier plan".
> - Every ticked subtask carries its subtask completion doc.
> - `completion-criteria-parity` applies.
>
> **R26.8 binds every criterion.** Where an instrument can pass without the property holding, the criterion names that limit.

---

## Rulings from Peter — slots (both RULED; this document picked neither branch)

- **SLOT T1 — write scope for seated agents — RULED (B) (Peter, 2026-09-26)**: *a merged `tasks.md` assignment row grants the assigned agent write scope over exactly that parent's listed Primary Artifacts, on that unit's branch, expiring when the unit merges.* (Lina R1 T-L3; most parents sat outside their seated agent's declared write scope.)
  - **Rationale, as ruled**:
    - the grant is **exact** (the enumerated Primary Artifacts, nothing else);
    - it is **per-parent**;
    - it is **auditable** (claims passes compare edit paths to the list);
    - it is **temporary by construction** (the unit branch's lifetime);
    - **Peter's merge of the tasks PR is the activating act**, composing with merge-is-acceptance law.
  - **The recorded counter, KNOWINGLY ACCEPTED**: the tasks author becomes a scope-granter outside the per-case ballot path. It is mitigated by **activation at Peter's merge** and by **the six-seat round that reviewed every assignment row**.
  - **Instances this dissolves, recorded as RESOLVED**:
    - Lina's Task 18 `CHANGELOG.md` edit (a listed Primary Artifact);
    - Leonardo's writer for `tests/onboarding-trio/**` (Task 25's listed artifacts; the prompts were already re-pinned into the spec directory);
    - every seat Lina's T-L3 enumerated (Ada, Lina, Thurgood, Stacy, Leonardo).
  - **Charter write scopes are otherwise UNCHANGED.** The rule adds a per-parent grant; it edits no charter.
  - **Branch (A) — NOT TAKEN**, recorded below.
  - **(A) — NOT TAKEN**: a record-first ballot widens each seated agent's write scope to the paths its 123 parents list (canonical charters regenerated; governance carve-out). *Cost: one ballot and one regeneration, before U1.*
  - **(B) — SELECTED**: a **standing ruling that a merged `tasks.md` assignment row grants write scope over that parent's enumerated Primary Artifacts**, for the parent's duration (Lina's lean). A claims pass can audit whether edits stayed inside the listed artifacts. *Counter: the tasks author becomes a de facto scope granter, through an artifact that is not a ballot.*
  - **Where it lands**: § "Delegated-tier plan" (a preamble line) and every parent's Primary Artifacts list, which under (B) becomes the grant's exact extent.
  - **Ratification vehicle — SUPERSEDED BY THE STANDALONE BALLOT** *(Erratum 2026-09-26: the vehicle is the standalone ballot `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`, authorized by Peter after this plan settled.)* The ballot carries the text below verbatim; B-U1 cross-references it. The original plan follows, for the record:
  - **(Original) Ratification vehicle — B-U1 § "T1-(B)"** (the text below).
    - **Ordering, per the record-first precedent**: that section is **authored and committed as RATIFIED-in-record** — `Status: RATIFIED (Peter, 2026-09-26)` plus its `Ratified-machine:` line — **as the U1 branch's FIRST commit (Task 7.0), before any U1 work on surfaces outside standing scopes.**
    - Peter's recorded ruling is the authority, and the U1 merge confirms it.
    - B-U1's other content (the publish rail and register row) rides U1 in the same PR.
    - *(This replaces the R3 note that proposed a standalone PR ahead of U1. The record-first protocol already provides the ordering, as in 127 U1: ratified-in-record before the edits apply, same PR.)*
  - > **STANDING RULE T1-(B) — RATIFIED (Peter, 2026-09-26):**
    > 1. **Extent.** A parent task's assignment row in a **merged** `tasks.md` grants write access to **exactly the paths enumerated in that parent's Primary Artifacts list**, and to nothing else.
    > 2. **Who.** The grant covers the parent's PRIMARY agent **and every secondary agent named on the same row**. **A secondary's access rides the same row, under the same extent and duration.** Consulted agents named without a tier receive no grant.
    > 3. **Duration.** The grant holds **on that unit's branch only**, and **expires when the unit merges**. It does not carry to `main`, to other branches, or to later units.
    > 4. **Activation.** The grant is activated by **Peter's merge of the `tasks.md` that contains the row**. An unmerged row grants nothing.
    > 5. **What it does not change.** The grant **adds to, never replaces**, the agent's charter write scope. **Charter write scopes are otherwise unchanged.** The grant **confers no ratification authority**: governance-law paths remain subject to record-first ballots and the Peter-merge carve-out.
    > 6. **Audit.** Edits outside a parent's listed artifacts remain out of scope. **Claims passes audit edit paths against the list; a path outside it is a finding on the executing agent.**
    > 7. **Trace.** A Primary Artifact must trace to the parent's requirements or design components. A listed path with no such trace is a tasks-round finding, so the list cannot be used to widen scope beyond the work.
  - **Ruling: (B)**
- **SLOT T2 — dist-tag strategy — RULED (B) PLAIN SEQUENTIAL PUBLISHING (Peter, 2026-09-26).** Releases 1–2 publish normally to `latest`, as MAJORs where the recipe says so, **with honest CHANGELOG entries** (the CHANGELOG starts in U1 — Task 7.4). **The package README and the install doc do not advertise the onboarding path to strangers until release 3.** **The counter-argument (stranger protection) is declined, on the ground that there are zero known stranger consumers** (dp-portfolio is the only known consumer). Branch (A), not taken, is recorded below. Leonardo R1 A6.
  - **(A) — NOT TAKEN**: publish releases 1–2 under a **`next` dist-tag**, and promote to `latest` at release 3, the first release carrying the install doc. Then Task 7's rail guard, and every RELEASE pass's rail read, **name the tag queried**: `npm view @3fn/core@next …` for releases 1–2, and `@latest` after promotion. *Counter: it withholds time-to-first-value from anyone who has not opted in, which is 26.3's reason for releasing between units, and it adds a tag the guard must name.*
  - **(B) — SELECTED**: plain sequential publishing to `latest`.
  - **Lands**: Task 7's guard queries the version as drawn (no tag). No fourth bite.
  - **Ruling: (B)**

---

## Declared Merge Units

| Unit | Slug · branch | Parents | Gating parent | PR title form | Claims events |
|---|---|---|---|---|---|
| **U1 — Distribution substrate & packaging truth** | `u1-substrate` · `task/123-u1-substrate` | 1–9 | **9** | `U1 substrate & packaging truth (123)` | RELEASE (release 1) |
| **U2a — Consumer generation profile: splitter, exemplars & G1** | `u2a-g1` · `task/123-u2a-g1` | 10–12 | **12 (G1 gate parent)** | `U2a consumer generation profile: splitter, exemplars & G1 (123)` | — (**no release**; its content rides release 2 — F1 RULED, Peter 2026-09-27) |
| **U2b — Consumer generation profile: machinery, rendering & G2** | `u2b-profile` · `task/123-u2b-profile` | 13–18 | **18 (G2 gate parent)** | `U2b consumer generation profile: machinery, rendering & G2 (123)` | **MIDPOINT (declared carrier)** + **ARMING** + RELEASE (release 2) |
| **U3 — Onboarding** | `u3-onboarding` · `task/123-u3-onboarding` | 19–22 | **22** | `U3 onboarding (123)` | RELEASE (release 3) |
| **U4 — Content policy** | `u4-content` · `task/123-u4-content` | 23–24 | **24** | `U4 content policy (123)` | — (rides release 4) |
| **U5 — Validation & closeout** | `u5-closeout` · `task/123-u5-closeout` | 25–28 | **28** | `U5 validation & closeout (123)` | RELEASE (release 4) + **CLOSEOUT** |

**How the units run**:
- Order is unconditional: U1 → U2a → U2b → U3 → U4 → U5 (Req 26.3's U1 → U2 → U3 → U4 → U5, with the U2 stage declared as two merge units in order — amendment 2026-09-27).
- One branch per unit, each branched from `main` after the prior unit merges. **U2b's branch is cut only after U2a merges — no stacking** (F7 RULED, Peter 2026-09-27: strict wait; the `Stacked-on:` exception is not pre-authorized for U2b).
- The gating parent's completion opens the unit PR; every other parent commits its docs on the branch.
- Peter merges each unit. Agents never merge.
- **Governance carve-out (Peter-merged, record-first)**: U1 (B-U1; the Integration Guide line fixes), U2a (`canonical/**` — Task 11's exemplar records and confirmations; no ballot, since no rendered text changes), U2b (B-U2; `canonical/**`), U3 (`governance/DesignerPunk-Integration-Guide.md` — Task 19.4), U4 (B-U4; banners).
- The PR body carries `Spec:`, `Unit:`, `Task:`, `Agent:`, the completion-doc paths, the validation note, and **the tripwire line**.

**MIDPOINT — carrier U2b** *(amendment 2026-09-27: was U2; moved with the split — the event is Stacy's, confirmed by Stacy, feedback/tasks.md [STACY R3], 2026-09-27, with conditions S3-1–S3-3)*.
- **Why U2b**: condition (1) can only be met there (first render is Task 15), and condition (2) needs both gates' branches, the second of which (G2) executes at Task 18. With six declared units, U2b's merge is also the literal midpoint (the third of six).
- **Scope after the split**: the pass covers **every parent merged so far, never narrower** (Stacy R3 condition S3-1) — Tasks 10–18 across both PRs (U2a and U2b), each named by number and squash SHA, **plus every U1 parent (1–9) not already covered by a committed release-1 RELEASE record** (release 1 is not yet tagged — newest tag `v14.1.0` — so absent such a record by U2b's merge, U1's parents are in scope here too; if release 1 tags first, its record carries U1, and U2a as well if the tag postdates U2a's merge, and the scope line cites that record instead of re-auditing). **The scope line also lists, as its own population item, the B-CI § 5 clause 7 extent check run on PR-1** (`#218`) (Stacy R3 condition S3-2). *Residual: G1's branch execution is audited one unit after it merged; U2b builds on it unaudited. Surviving residual (Stacy R3): a false ✅ in U2a's own completion docs can sit on `main` for one unit, with U2b cut on top of it — e.g. a green `npm test`/`tsc` that was not green, or the pack-intersection run against the wrong base.*
- **Fork M-1 (Peter's, RULED — (A)+conditional, 2026-09-27)**: whether a scoped read of Task 12's evidence happens at U2a's merge, before this MIDPOINT pass reaches it at U2b's merge. **(A)** No U2a-merge read — the residual above stands as the plan's cost (Stacy's lean). **(B)** A scoped, post-acceptance read of Task 12's evidence only, recorded at a path that is neither `claims-pass.md` nor `claims-pass-midpoint.md`, and never a gate on the U2b cut. *Counter to (A): U2b is 31 subtasks built on U2a. Counter to (B): it adds an event the ratified trigger set does not have, and duplicates evidence Peter already reads at the U2a merge.* **(fork M-1 — RULED (A)+conditional, Peter 2026-09-27)**: **(A) by default, with a signal-based conditional.** No claims read fires at U2a's merge when G1 HOLDS on its first run (`G1 runs: 1`). **If G1 required more than one run** (`G1 runs: k`, k > 1 — a BREAKS followed by C3 rework, or branch A), Stacy performs a **scoped read of Task 12's evidence, plus any Task 10 or Task 11 criterion row whose cited artifact a C3 rework commit modified — the set is `git diff --name-only <commit adding re-grounding-c3-falsification-run-1.md>..refs/pull/<U2a>/head` ∩ Tasks 10–11 Primary Artifacts; if that set is empty, Task 12 only. A hit on an exemplar Stacy constructed or confirmed is read with that disclosure.**, after U2a's acceptance: it never gates the U2b cut, and it is recorded at `.kiro/specs/123-consumer-distribution/completion/u2a-task-12-scoped-read.md` (neither `claims-pass.md` nor `claims-pass-midpoint.md`). **Why the trigger is rework**: a rework loop under gate pressure is where completion claims drift; a clean first-run HOLDS leaves the residual small (Stacy issues the G1 verdict herself, is a participant in Task 11, and the orchestrator independently verified Task 10 at acceptance — parity 9/9, tests, CI runs, byte-identical rendered text, shipped-file intersection). **Not a new standing event**: a one-shot, spec-local post-unit obligation ruled under fork M-1. It mitigates the MIDPOINT residual; it is not a MIDPOINT pass and not a trigger-table row. `k` is counted from the kept per-run records (the PR-body `G1 runs: <k>` carries it). The record carries the claims-pass template's Scope / Findings (two-route routing) / Method (sample and fraction) sections and the mandatory `Standards implications:` line. The MIDPOINT scope line cites it and is never narrowed by it. Not a precedent: a second spec adopting a between-events conditional read goes to ballot as a trigger-table amendment.
- **Record path pinned: `.kiro/specs/123-consumer-distribution/completion/claims-pass-midpoint.md`, NEVER `.kiro/specs/123-consumer-distribution/completion/claims-pass.md`.**
- **Stacy's two conditions**:
  - **(1)** U2b's merge is the **first-render release**. C2 rates, per-signer assent rates **and refusals issued** are recorded as ***"first render — not a baseline"***. **The first-render marking applies to BOTH U2b-merge records** (MIDPOINT and the release-2 RELEASE record).
  - **(2)** The pass audits that **each G1/G2 branch was executed and evidenced by the executing agent** (Tasks 12 and 18's primary agents — § "Gate seat layout"), **never the verdict content**. **Disclosure (Stacy R2)**: Lina authored the machinery pass four tests (C13–C15), so the pass **checks that Task 18's applied edit is byte-equal to its pre-declared text and confined to the domains the verdict names.**
- Two records, each with its own scope line, never merged. **Within 123 every C2 / assent / refusal reading is baseline-only**; detection begins at the first post-123 release (Stacy R1 (c)).
- Findings route to owning agents as explicit messages.

**CLOSEOUT** fires at U5's merge → **`.kiro/specs/123-consumer-distribution/completion/claims-pass.md`** (Stacy).

### Gate seat layout (Stacy R1 S-T1 — each gate is TWO artifacts in TWO seats)

| Gate | Verdict record — **Stacy**, an audit artifact outside any delegated-tier line | Gate parent — the **executing agent**: completion doc, branch execution, validation, PR |
|---|---|---|
| **G1** (U2 step 4; **U2a's gate**) | `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` (current verdict) + `…/re-grounding-c3-falsification-run-<n>.md` (every run, kept) | **Task 12 — Thurgood (Opus)**: owner of C3, so he executes the rework loop and invokes branch A. **His completion doc cites the record path and never paraphrases the verdict** (11.8.4). He runs U2a's full validation and opens the U2a PR — **only on a HOLDS or branch-A record** (Task 12). |
| **G2** (U2 step 8; U2's acceptance; **U2b's gate**) | `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` | **Task 18 — Lina (Opus)**: U2's machinery owner and a seat **not recused from anything**. She applies the verdict's artifact edit, runs U2b's full validation and opens the U2b PR. **Thurgood (the recused profile author) authors no line of Task 18's completion doc.** *(Chosen over Thurgood under 11.8.4, so the acceptance claim never sits with the recused seat — no reader can take the recusal as partial.)* |

### Expected release count — **FOUR** (Req 26.3; Stacy R1 (c) confirmed keep-four)

| Release | After | Why it ships | Expected semver |
|---|---|---|---|
| 1 | U1 | union, fail-loud postures, packaging diet, `sync` repairs, publish-rail guard; **CHANGELOG starts here** | **MAJOR** (Ada D-T-A6: legitimately breaking — `src/` narrowed, config dropped, fail-loud, `sync` stops refreshing tokens) |
| 2 | U2b (carrying U2a) | consumer agent layer (D-live-2 repair), `attach` | minor, or major per the recipe |
| 3 | U3 | install doc, commit policy, starter specs, init UX | minor |
| 4 | U5 carrying U4 | banners, closeout corrections | minor |

- **Cost**: four RELEASE passes (each with the owed-set paste and the rail log), plus MIDPOINT and CLOSEOUT, **= six claims passes**.
- RELEASE fires at the release tag, before publish.
- Release 1 is a coherent **substrate** release. **Release 3 is the first release a stranger should be pointed at** (Leonardo A5). **Under T2 (B), the README and install doc do not advertise onboarding before release 3.**
- *Residual: four dual-registry publishes (the accepted dual-publish tax, 26.6). Hotfixes would add RELEASE passes.*
- **U2a cuts no release — the count stays FOUR** *(amendment 2026-09-27; F1 RULED, Peter 2026-09-27 — the proposal stands)*. U2a changes **no shipped file**: Tasks 10–12 touch `tools/agent-generator/**`, `canonical/**` and spec records, none of which is in `files[]` or compiles into `dist/`, and Task 10 expects the rendered agent text (shipped under `.kiro/agents/`) to stay unchanged (its diff-guard criterion). Task 12 checks this at U2a's merge; **if the check finds a shipped path, the release decision returns to Peter before U2a merges.** A release with no consumer delta would cost a RELEASE pass and a dual publish for nothing. *Residual: `main` carries U2a's merged-but-unreleased content for one unit's length; a hotfix cut in that window would carry it (harmless under the same check), and release 1, if tagged after U2a merges, would too.* *(Correction, 2026-09-27: the "none of which is in `files[]`" assumption was wrong for the eight `.kiro/agents/*.attribution.json` sidecars — Task 10 regenerates them by criterion, and they ARE in `files[]` via the `.kiro/agents/` entry. The release decision returned to Peter ahead of Task 12, per this section's own rule, and he **ruled F1 stands**: the sidecars are metadata-only, the rendered agent text they describe is unchanged, and no consumer reader exists for them. Task 12 cites the eight paths and this ruling as its disposition. Cleanup filed at `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`.)*

### Split tripwire (Req 26.5)

**Limb 1 (scope)**:
- The referent is the **subtask count per unit in this file at the round's close** (frozen by commit).
- It fires if a unit grows past its threshold, or gains any parent.

**Limb 2 (ordering)**: it fires if the successor unit's branch has any commit while this unit is unmerged.

**U2a carries a third reading (S-T5, binding; U2 before the amendment of 2026-09-27)**:
- U2a's line adds **`G1 runs: <k>`**, counted from the kept per-run records. G1 runs only inside U2a, so `k` is final at U2a's merge and U2b's line omits it.
- **k > 1 is a scope signal regardless of the subtask count.** The rework loop adds no subtasks, so the count alone would read as stable.
- **k > 1 also triggers fork M-1's scoped read** (Stacy, post-acceptance — scope defined in the MIDPOINT block; never a gate on the U2b cut). See the MIDPOINT block above, "Fork M-1 (Peter's, RULED — (A)+conditional, 2026-09-27)".

**Read at each unit's completion review; Peter owns the read.** The PR-body line reads:
`Tripwire: declared <n>, now <m>; parents unchanged|added; successor branch: none|<sha>[; G1 runs: <k>]`.

| Unit | Declared subtasks | Threshold |
|---|---|---|
| U1 | 44 | **+4** |
| U2a *(was U2 — amendment 2026-09-27)* | 11 | **+3** |
| U2b *(was U2 — amendment 2026-09-27)* | 31 | **+4** |
| U3 | 16 | **+3** |
| U4 | 6 | **+2** |
| U5 | 18 | **+3** |

*Thresholds are ~10% rounded up, with a floor of +2 and small-unit allowance of +3. **Totals at the round's close: 28 parents, 126 subtasks.***

*(Amendment 2026-09-27: 9.0 adds one U1 subtask by Peter's ruling. The declared counts above stay frozen at the round's close, as Limb 1 requires; U1's tripwire line therefore reads `declared 44, now 45; parents unchanged`, within +4. **Totals now: 28 parents, 127 subtasks.**)*

*(Amendment 2026-09-27, the U2 split: **U2's frozen 42 is partitioned, not recounted** — U2a (Tasks 10–12) = 5 + 4 + 2 = **11**; U2b (Tasks 13–18) = 8 + 5 + 5 + 6 + 3 + 4 = **31**; the sum is conserved, so no threshold is named after the growth it measures. Thresholds: U2b's +4 is the ~10% rule (3.1, rounded up); U2a's +3 applies the small-unit allowance rather than the +2 floor, because the split itself adds **12.3** (U2a's full validation and PR opening, which Task 18.3 did for the whole of U2), so U2a's line reads `declared 11, now 12`. Limb 2 now reads across the new successor pairs U1 → U2a and U2a → U2b. **Totals now: 28 parents, 128 subtasks.**)*

*(Amendment 2026-09-27, F3 conditions: **11.5 added** (Stacy's F3 step, B-CI ballot § 11 `[STACY R1]` § 6 condition (c), `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md`). U2a's line now reads `declared 11, now 13`, within +3. **Totals now: 28 parents, 129 subtasks.**)*

*(Amendment 2026-09-27, the U2b cut: **13.0 added** (the third F unit's C1 confirmation). U2b's line reads `declared 31, now 32`, within +4. **Totals now: 28 parents, 130 subtasks.**)*

### Delegated-tier plan (one PRIMARY per parent = the fixed-form line's referent; secondaries carry tiers)

**Preamble**: write-scope authority for every seat below is **granted by the T1-(B) standing rule** (§ "Slots"). Each PRIMARY and each tiered secondary may write exactly its parent's listed Primary Artifacts, on its unit's branch, until the unit merges. **Activation is this tasks PR's merge; ratification is the standalone ballot `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`** (erratum 2026-09-26; it was planned as B-U1 § "T1-(B)" at Task 7.0).

**Tier rule**:
- Sonnet implements settled design.
- Opus where residual judgment remains, and on the § 7.2 machinery (a concrete signal: it has failed falsification twice).
- The orchestrator briefs each owner once per unit.
- **Verdict records** (Stacy, G1/G2) and **operative-set confirmations and signatures** (owners per C1) are audit/attestation artifacts, **outside every delegated-tier line.**
- **The in-task stamps below are identical to this table** (Stacy S-T-A10).

| Parent | PRIMARY (tier) | Secondaries (tier) |
|---|---|---|
| 1 | Ada (Sonnet) | Lina (Opus) — 1.4 indexer + watcher/staleness interactions (T-L2) |
| 2 | Ada (Sonnet) | Thurgood (Sonnet) — 2.6 Integration Guide line fixes |
| 3 | Ada (Sonnet) — **escalates to Opus / Ada-decide** on a named signal (Task 3) | — |
| 4 | Lina (Sonnet) | — |
| 5 | Lina (Opus) | Ada (Sonnet) — token-side migration strings (5.5) |
| 6 | Ada (Opus) — **6.1 stays Opus until the own-index check has a recorded bite** (Lina R2); a downgrade after that is recorded as a divergence | — (Lina's Container-Base chore PR is a gate, not a secondary) |
| 7 | Thurgood (Sonnet) | — |
| 8 | Ada (Sonnet) | — |
| 9 | Thurgood (Sonnet) | Lina (Sonnet) — 9.0 pre-release-1 hygiene: the bundle path leak and the #204 orphan deletion (amendment 2026-09-27) |
| 10 | Lina (Opus) | — |
| 11 | Thurgood (Opus) | Stacy (Opus) — constructs exemplars G and G′ (11.3); the F3 adjudications (11.5, added 2026-09-27); Lina (Opus) — 11.2 owner confirmations for lina.md units and the component-family doc (C1: owner) (added 2026-09-27, ruled by Peter) |
| 12 | **Thurgood (Opus)** — G1 gate parent · U2a gating parent | — (Stacy's verdict record is outside the line) |
| 13 | Thurgood (Opus) | Lina (Opus) — generator code (13.4–13.6); the third F unit's C1 confirmation (13.0, added 2026-09-27, U2b-cut amendment) |
| 14 | Lina (Opus) | — |
| 15 | Thurgood (Opus) | Lina (Opus) — `derive.ts` (15.2) |
| 16 | Lina (Opus) — 16.1, 16.5 | Lina (Sonnet) — 16.2, 16.3, 16.4, 16.6; Ada (Sonnet) consulted on 16.3's pack script |
| 17 | Lina (Sonnet) | Thurgood (Sonnet) — 17.3 (applies L686 under B-U2) |
| 18 | **Lina (Opus)** — G2 gate parent · U2b gating parent | — (Stacy's verdict record is outside the line) |
| 19 | Thurgood (Opus) | — (Leonardo reviews on-branch) |
| 20 | Lina (Sonnet) | — |
| 21 | Thurgood (Opus) | — |
| 22 | Lina (Sonnet) | Leonardo (Opus) — authors `example-home.yaml` at `.kiro/specs/123-consumer-distribution/design-inputs/` (Lina places it, 22.3) + DD9 confirmation (22.5) |
| 23 | Thurgood (Sonnet) | — (Ada owns the predicate text) |
| 24 | Thurgood (Opus) | — |
| 25 | **Leonardo (Opus)** — operator | — |
| 26 | **Leonardo (Opus)** — operator | Thurgood (Sonnet) — 26.5 install-doc correction |
| 27 | **Leonardo (Opus)** — operator (**not the profile author** — S-T4) | — |
| 28 | Thurgood (Opus) | Leonardo (Opus) — 28.3 consumer-Leonardo product query |

**Why Leonardo operates 25–27** (S-T4; Leonardo holds the experience-side question):
- He owns the persona protocol.
- He has **no authorship stake** in the profile, the install doc or the starter specs.
- He is **not the verifier** of beat 2's claims (Stacy's claims passes audit the records later).

**Leonardo accepted the seat on three conditions (R2), adopted in § "Run discipline"**: an operator-intervention log; `subject: leonardo` tagging with Stacy's CLOSEOUT cross-read; and `session-launched-by`. **Frozen prompts are the floor**: every session's initial prompt is committed before its run, reproduced verbatim in its record, and **pinned inside the spec directory**, so the ancestry rule is executable regardless of T1.

**Post-unit obligations** (claims passes verify, not completion docs):
- docs-MCP `rebuild_index` after U1, U2b, U3 and U4 (each edits a served doc under `governance/`, the docs MCP's served root);
- **U2a: `rebuild_index` not owed** — Tasks 10–12 list no `governance/**` artifact. If U2a's diff nevertheless touches `governance/**`, it becomes owed, and the U2a PR body says so (amendment 2026-09-27);
- **U2a: fork M-1's scoped read, conditional on `G1 runs: <k>` > 1** — Stacy performs a scoped, post-acceptance read of Task 12's evidence, plus any Task 10 or Task 11 criterion row whose cited artifact a C3 rework commit modified — the set is `git diff --name-only <commit adding re-grounding-c3-falsification-run-1.md>..refs/pull/<U2a>/head` ∩ Tasks 10–11 Primary Artifacts; if that set is empty, Task 12 only. A hit on an exemplar Stacy constructed or confirmed is read with that disclosure. Recorded at `.kiro/specs/123-consumer-distribution/completion/u2a-task-12-scoped-read.md`; never a gate on U2a's merge or the U2b cut (Peter, RULED 2026-09-27; see the MIDPOINT block's "Fork M-1" and Task 12's post-unit note);
- **Stacy's ARMING read at U2b's merge, confirmed by Stacy (feedback/tasks.md [STACY R3], 2026-09-27, with conditions S3-1–S3-3)** — the freshness barrier arms at 13.6, inside U2b; U2a arms no barrier and adds no CI context (amendment 2026-09-27; was U2's merge). **The read's composition is all three parts of her trigger row, not the coverage map alone** (Stacy R3 condition S3-3): (i) `npm run audit:coverage-map` — the rows for `canonical/operative-sets/**` and `canonical/profiles/consumer/**` list `122-diff-guard`, and she independently re-runs 13.6 (iv) herself (grep → 0, the same N paths now non-blank); (ii) `verify-gate-registration.sh` — the registration count is unchanged, since no context is added; (iii) the `completion-criteria-parity` dormancy check — parity is not dormant. The record also states which `coverage-map.ts` version ran, since B-CI's PR-2 may change that command's output inside the window. *Surviving residual (Stacy R3): the time-box expires on an event, not a date — if U2b is abandoned or re-scoped so that 13.6 never lands, the adjudication rows persist and nothing fires; they carry `owner: stacy`, returning to her as a finding at the first LIVENESS walk or re-plan that sees them.*

---

## Sequencing decisions this plan makes

1. **`init`'s agent-layer rows move from U1 to U2** (with C20). This includes C1 **row 10's** `.designerpunkignore` comment edit (Ada), since in U1 `.kiro/agents` is still copied. **Lina confirmed that release 1 is self-consistent.**
2. **The matching `files[]` removals and the identity-doc additions move to U2.** Lina confirmed. Ada consults on 16.3.
3. **C7 splits**: U1 (tiers, classification, key-grain, migration of component copies) / U2 (generated surfaces, region grain, **legacy agent/steering migration, offered only alongside `attach`** — T-L1) / U3 (`.gitignore` content). Lina confirmed.
4. **Two C6 cases move to U2** (`attach --reference`; the lane half of 3.9). Lina confirmed.
5. **DD13's ballot splits into three**: **B-U1** (publish rail), **B-U2** (the L686 edit **and the C2 counting-block edit** — S-T2), **B-U4** (the release recipe).
6. **C1 row 5 (the `product/` tree) lands at Task 22 (U3). U1 keeps today's `product/overview.yaml`** (Ada).
7. **CHANGELOG starts in U1** (Leonardo A5 (ii)). Each gating parent commits its release's entry, and B-U4 adds the recurring recipe step.
8. **Truthful next-steps and the restart line land WITH the `init` change that needs them** — Task 2 (U1) and Task 16 (U2) — and **Task 22 completes C27** (Leonardo A5 (i); the C27 erratum).
9. **The U2 stage splits at G1 into two merge units** (amendment 2026-09-27, Peter's ruling): **U2a** = design steps 1–4 (Tasks 10–12), **U2b** = steps 5–8 (Tasks 13–18).
   - **B-U2 rides U2b entirely** — authored at 13.7, applied at 13.8 (counting block) and 17.3 (L686), record-first in U2b's PR. U2a carries no ballot.
   - **`triviality.ts` now follows G1 structurally**: it is born on U2b's branch, cut from `main` after U2a merged on a HOLDS or branch-A record. The ancestry criterion moves from Task 12 to Task 13, and Task 12 asserts the file's absence from U2a.
   - **Under P2 branch A** (the second consecutive G1 BREAKS), U2a merges carrying the branch-A record, and U2b executes its consequences: 13.4's no-floor configuration, G2's half (2) recorded "NOT APPLICABLE", and the 24.3 label at Task 24. A standing single BREAKS (or NOT-RUNNABLE, treated as BREAKS) never opens the U2a PR.

---

## Open inputs passed to this round — dispositions (R2)

| # | Input | Disposition |
|---|---|---|
| 1 | Release count + tripwire | **DECIDED**: four releases, six claims passes (Stacy confirmed); thresholds above; U2a's `G1 runs: <k>` field (S-T5; U2's before the amendment of 2026-09-27). |
| 2 | **`.swift`/`.kt`** | **DECIDED BY KENYA AND DATA: KEEP-WITH-FOLLOW-UP**, verdicts quoted in Task 3.5.<br>• The kept trees are the **whole platform closures** (pack-assertion rows, Task 3).<br>• Both are **labelled honestly** as reference source, not a build input.<br>• **One shared follow-up issue**, "native component distribution" (SPM source package + Compose source module), committed at 3.5. It cites the steward-filed defect **`.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`** and the harness charter `.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`.<br>• **Trigger (Kenya/Data joint wording)**: *"first Android/iOS product-spec kickoff, or any evaluation of the harness charter, whichever fires first"*. |
| 3 | Region/key-grain sizing (DD2) | **DECIDED, re-sized per Lina**:<br>• 5.2 keyed manifest **¾–1 day**;<br>• 5.3 key-grain JSON **~1–1¼ days**, reading = parsed values (below; three shapes incl. `permissions.allow` array-entry grain);<br>• 16.4 region extractor **~1 day (Sonnet)**;<br>• 16.5 generated-surface `sync` + `attachedTargets` **~1 day (Opus)** — **split**. |
| 4 | Freshness check context | **CORRECTED; Stacy confirmed at R2, with the rows-list-the-guard tightening folded** (Stacy R1 (a), she won on measurement). **The context stays `122-diff-guard` (no new context), BUT ARMING FIRES**, because ARMING's trigger is *a new barrier arms*, not only *the context set changes*.<br>• `coverage-map.ts` derives rows for **every canonical file**. `canonical/operative-sets/**` and `canonical/profiles/consumer/**` are new guarded surfaces, and would be **blank rows** if diff-guard's `surfaceGlobs()` did not reach them.<br>• Task 13.6 therefore carries **zero blank rows over those surfaces (output cited)** and a **STANDING stale-fixture end-to-end test**, not a one-time record.<br>• Stacy runs `audit:coverage-map` at U2b's merge (amended 2026-09-27; was U2's merge).<br>• **My R1 disposition, "no ARMING", was wrong**: I reasoned from the context set alone. |
| 5 | DD9 placement | **DECIDED**: Task 22.5 (Leonardo), with the U5 re-read scoped (Task 25):<br>• it establishes **recovery via the notice**, never **majority harness**;<br>• **persona (c) runs bare `init` in Kiro**. |
| 6 | E-fm bite | **DECIDED: build** (14.4); forced-negative fallback. |
| 7 | G1 exemplars | **DECIDED: G and G′** (Stacy's constructions, adopted verbatim) → **eleven exemplars**. |
| 8 | DD13 split | **DECIDED: three ballots.** B-U2 now also carries the counting block (S-T2). |

**5.3's reading, DECIDED** (Lina's directed question):
- **Consumer entries survive by PARSED VALUE.**
- **When our keys are unchanged, `sync` does not write the file at all** (zero bytes change).
- When our keys change, the file is re-serialized with **insertion order preserved** and 2-space indentation, **so whitespace may normalize on that write only**.
- *Chosen over format-preserving splicing (~1½–2 days): a write happens only when we have something to change, so churn on committed files is bounded to real updates. Residual: a consumer's hand-formatting is lost on the first write that changes our keys.*

---

## Carried obligations — placed

| Obligation | Placed at |
|---|---|
| Two cross-target join runs + install-doc correction | **Task 26** |
| 125-B U3 re-attestation | **Task 28.4** (committed `.kiro/issues/` record) |
| Peter's dp-portfolio `ls .kiro/sync-manifest.json` | **Task 5.1**, with a forced negative: *"not obtained — both branches covered by fixtures"* (S-T-A5) |
| Lina's rename gating C11's lint | **Task 8.1**. Lina lands the rename on `main` before `task/123-u1-substrate` branches; 8.1 pairs the file count with the zero-warning property |
| 23.7 recurring trio; 23.9 cold-human run | **Task 28.4** + **B-U4** |
| C2 counting-block edit | **Task 13.7**, **under ballot B-U2** (S-T2) |
| Native component distribution (Kenya/Data) | **Task 3.5** (committed issue; joint trigger) |
| **Lina's Container-Base dangling-reference fix** (T2-L1: 10 map values + 1 constant; tests pinning broken strings) — **hers, NOT 123 work**: a separate chore PR with a resolves-against-generated-CSS guard test | **Gate at Task 6.0**: merged before Task 6 runs, like the rename gate at 8.1 |
| **Lessons item (amendment 2026-09-27)**: instrument-existence check for any "by the check, not inspection" criterion — three of the four Task 11 corrections were a criterion naming a check or premise that did not exist yet | **Next tasks round** — filed as a lessons item (Stacy/Thurgood); not fixed in 123. **The process rule it produced** (routing a counterexample to a normative claim to its owner, with Stacy's amended text) **and the completion guide's errata section** go to a record-first ballot: `.kiro/docs/ballots/2026-09-27-normative-counterexample-routing.md` (DRAFT, Stacy required reviewer; U2b-cut amendment 2026-09-27) |
| **Req 11.6.5's C(c1) row superseded-in-execution** (amendment 2026-09-27, item 4: premise false, clause (a) exercised by F `#purpose` only) | **Next requirements touch** — the row is edited then; 123 executes under the tasks amendment. Also carried to that touch: the 11.6.5 table fold of G1 run 1's per-unit restatements, the F row as instantiated (three units), and G1 run 2 finding **R2-A1**. DR-2, DR-3, DR-4 and the stale "Against the exemplars" counts were folded as errata by the U2b-cut amendment |
| Routed defects (out of scope; for Lina): `ContainerCardBase.ios.swift:816` unterminated comment; `LocalDPTheme` / `dpTheme` hardcoding; per-component `dist` `.css` requires (A7) | Filed by the steward: `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`. Task 3.5 cites it, and routes the A7 finding and the `:816` parse defect as messages |

---

## Tasks

### UNIT 1 — Distribution substrate & packaging truth

- [x] 1. Birth detection, root policy, indexer anchoring, and live reindex

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Ada (Sonnet); Lina (Opus) — 1.4
  **Traces**: Reqs 2.1, 2.1a, 2.5, 15A.3, 19A.5a, 3.7a · design C2, C3, DD3, DD23, DD24
  **U1 start ordering (applies to every U1 parent)**: **no U1 work on a surface outside the assigned agent's standing charter scope begins until the standalone T1-(B) ballot (`.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`) is merged and reads RATIFIED** (erratum 2026-09-26; it was planned as Task 7.0's first-commit section). Executing agents verify that the record reads RATIFIED before their first out-of-scope edit — the mechanical check, per standing practice.

  **Success Criteria:**
  - `findDesignSystemRoot` returns the specified `state`, `partialCase` and `tierDir` for **nine named cases**: (1) born · (2) package-mode · (3) partial `config-no-tier` · (4) partial `unused-local-tier` · (5) partial `tier-no-config` · (6) partial `manifest-only` · (7) unborn · (8) the steward exemption · (9) a consume-posture manifest alone → unborn. **Instrument**: `bornRepo.test.ts`, one test per case, with the count asserted.
  - Each of the walk's four boundary behaviors has a named case whose removal turns it red, recorded in the subtask doc: the start at `process.cwd()`; test-then-stop at `.git` incl. `.git` as a file; the `node_modules` skip; consume-posture manifests ignored.
  - The three barrel export forms (function, const/let, re-export) each classify born — three cases.
  - The resolvers return C3's table values for every row. **Instrument**: a table-driven test whose row count equals C3's table rows, with the count asserted.
  - **The union is applied at indexer pass 1; precedence keys on the declared component name.** A fork fixture whose directory name differs from its declared name, inheriting a package parent, resolves and wins. Bite (union after pass 1) recorded red.
  - **A consumer component ADDED or EDITED while the server runs is reflected in `get_component_catalog`** (T-L2). The watcher and `StalenessGate` watch the **consumer root**; the package root is exempt as immutable. Bite (watch the package root only) recorded red. *Scope: one add and one edit, exercised on the application server.*
  - **Pass 3's composed-token resolution runs across both roots, and the reindex path does not reuse a stale `lastProjectRoot`.** One test each.
  - **The theme root follows the served index's recorded `tierDir`.** Bite (the hardcoded `projectRoot/src/tokens/themes` read) recorded red.
  - **`spawnServer`**: user-set data-root env wins, and **no `cwd` option is passed**. A runner test fails on either violation.
  - Every catalog string this parent emits is string-equal to its design row (conformance test over the born, partial ×4, package-mode and TOKEN_INDEX_DIR rows).

  **Primary Artifacts:** `src/cli/shared/bornRepo.ts`, `src/cli/shared/mcpDataRoots.ts`, `src/cli/designerpunk.ts`, `application-mcp-server/src/indexer/{ComponentIndexer,TokenIndexer}.ts`, `application-mcp-server/src/**/ModeClassifier.ts`, `application-mcp-server/src/watcher/FileWatcher.ts`, `application-mcp-server/src/index.ts` (StalenessGate), both servers' declaration sites, tests

  - [x] 1.1 `bornRepo.ts` + `bornRepo.test.ts` (nine cases; boundaries; barrel forms)
  - [x] 1.2 The resolvers + the type-level declaration test for both servers
  - [x] 1.3 Runner changes (consumer-root defaults removed; user env wins; no `cwd`)
  - [x] 1.4 (Lina, Opus) Indexer — **all four written interactions**: (i) multi-root at pass 1 with declared-name precedence and the legacy `core/` level; (ii) **`FileWatcher` + `StalenessGate` + `ComponentIndexer.dataDirs` over the consumer root** (package root exempt); (iii) **pass 3 across roots**; (iv) the reindex path's `lastProjectRoot` replaced by `bornRoot`
  - [x] 1.5 `generate`: `token-index/meta.json` `tierDir`; the theme readers use the recorded tier; the write side anchored; the refusals; `figma-*` anchored
  - [x] 1.6 The string-conformance test

- [x] 2. The birth event: `init`'s copy table and rewrite-by-resolution

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Ada (Sonnet); Thurgood (Sonnet) — 2.6
  **Traces**: Reqs 19A (.1–.7), 19, 19.4, 15.8, 15A.3, 1.2 · design C1 (rows 0, 2, 3, 3b, 3c, 4, 4′, 9, manifest; **row 5 at Task 22; row 10 at Task 16**), C4, C8 (U1 emission), C27 erratum (the restart line)

  **Success Criteria:**
  - `init` implements C1 rows **0, 2, 3, 3b, 3c, 4, 4′, 9 and the manifest row**. **U1 keeps today's `product/overview.yaml`** (row 5 → Task 22) and the current `.designerpunkignore` comment (row 10 → Task 16). **Instrument**: `init.test.ts`, one assertion per row.
  - **U1's `init` emits BOTH targets' MCP configs** (Kiro `.kiro/settings/mcp.json`, the status quo; CC `.mcp.json` + the `.claude/settings.json` approval keys, new). **`--target` selection arrives with Task 16.** Asserted by `init.test.ts` (T-L1 advisory).
  - **`rewriteByResolution`'s boundary is the whole token tier for 3b and 3c.** Over the repo tree, `init` completes with zero unmapped out-of-tier specifiers, and `progress.ts`'s `'../../tokens/*'` stay relative. **Scope**: this is the in-repo unit check; **the packed-install certification is Task 9's `local-mode generate over the init-copied tree`** (Ada D-T-A8).
  - **The four-row mapping table is each exercised ≥ 1** by a real specifier (rewrite-log coverage assertion). Counts are recorded against Ada's R1 measurement, with differences attributed.
  - **Over-rewrite is caught**: consumer `tsc --noEmit` over the copied tree passes; the three `themes/*/SemanticOverrides.ts` still read `'../types'`. Bite (the string regex) recorded red. *Scope: type resolution only.*
  - An unmapped out-of-tier specifier fails the copy with a named error (bite recorded).
  - `init` refuses in born, partial and package-mode repos with the exact catalog strings. `--re-scaffold` lists every re-add before writing.
  - **The manifest is written last, with entries ONLY for managed paths, and every entry records `origin`**: `copy` for the U1-copied agents, steering and governance (still managed in U1); `emitted-key` for MCP keys (C7 erratum). **No `src/tokens/**` entry exists after birth** (Req 5.8 — no baseline applies to their language; otherwise the first `sync` would print a prune report about it). **Instrument**: `init.test.ts` asserts `origin` on one entry of each kind, and **asserts zero `src/tokens/**` entries**.
  - **`init`'s U1 terminal output**: next steps list only steps true for U1's behavior (no `npx jest # Run component tests`), and **the sequenced restart row is the LAST next step** (Le-T5). String-equal assertions **on the expected order** (Leonardo A5 (i); C27 erratum).
  - **The Integration Guide lines U1 falsifies are corrected**: L202 (`COMPONENTS_DIR`), L454 (`npx jest src/components/core/`), L576 (the default root). `grep -n "src/components/core" governance/DesignerPunk-Integration-Guide.md` output is recorded, **with each remaining hit dispositioned** (the platform paths are handled at Task 19.4).
  - `Oklch` is exported from the public types barrel (packed `tsc` check at Task 9).

  **Primary Artifacts:** `src/cli/init.ts`, `src/cli/shared/transforms.ts`, `src/types/index.ts`, `src/cli/__tests__/init.test.ts`, `governance/DesignerPunk-Integration-Guide.md` (the U1 lines)

  - [x] 2.1 `rewriteByResolution` + the mapping table + the tier boundary; per-row unit tests
  - [x] 2.2 Step 0 (birth check, refusals, `--re-scaffold` listing); steps 3/3b/3c/4/4′; `--skip-components` deprecation note
  - [x] 2.3 Config generation (1.2 i–iv); the test-config purpose + truthful collision string
  - [x] 2.4 Manifest written last, with `origin` per entry, `posture: 'born'`, `installedVersion`
  - [x] 2.5 The `tsc` over-rewrite arbiter + its bite; U1 next steps + the restart line
  - [x] 2.6 (Thurgood) Integration Guide: the lines U1 falsifies

- [x] 3. The packaging floor, `files[]`, and the platform closures

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Ada (Sonnet) — **ESCALATES to Opus / Ada-decide** if: closure 2 shows an unattributed difference; the pack assertion needs a list change not in C5; or a 3.5 verdict is CUT
  **Traces**: Reqs 4.1–4.7, 3.9 · design C5, DD14

  **Success Criteria:**
  - `floor-closure.json` records both named closures. **Closure 2 is reconciled against Ada's R2 measurement** (16 files: `src/types` ×2, `src/build/tokens` ×10, `src/registries` ×2, `src/constants` ×1, `src/build/types` ×1). Every difference is attributed to one of three classes: **source change after `5e98bd8f`**, **method** (Ada's R2 method was runtime refs only — `import type` skipped; `import` / `export from` / `require` followed; `.ts` + `/index.ts` resolution; all non-test `src/tokens/**`), or **tool defect**.
  - Closure 1 reports zero escapes over the transformed copy. Bite recorded.
  - **The pack assertion script reads closure 2 from the regenerated `floor-closure.json`, never from a copied list** (Ada (a)). It asserts, against `npm pack --dry-run --json`:
    - every ADD path present;
    - every REMOVE path absent (U1's lists; the three removals deferred to Task 16);
    - `designerpunk.config.ts` absent;
    - `product-mcp-server/src/` absent;
    - no `__tests__`/`examples` paths;
    - **and the platform-closure rows below**.
  - **iOS closure rows (Kenya)**:
    - PRESENT, **with counts asserted on every row** (Kenya R2):
      - component production `.swift` incl. `*Preview.swift` = **39**;
      - `src/blend/*.ios.swift` = **1**;
      - `src/tokens/platforms/ios/**` = **3** (`MotionTokens.swift`, `MotionTokens.md`, `README.md` — all three ship).
    - ABSENT: `platforms/ios/*Tests.swift` = **2**.
    - Differences are attributed. *(A row whose glob matches zero files is true by construction; counts close that.)*
  - **Android closure rows (Data)**:
    - PRESENT, **with counts asserted on every row** (Data R2, his corrected numbers):
      - component `.kt` = **39** (incl. 2 `*Preview.kt`);
      - `res/` = **51 files** (50 drawable XMLs + `README.md`);
      - `src/blend/*.android.kt` = **1**;
      - `src/tokens/platforms/android/**` = **2** (`MotionTokens.kt` + `MotionTokens.md`);
      - **`.gitkeep` = 8, INCLUDED and counted** (swept in by `**`; harmless).
    - ABSENT: `platforms/android/*Test.kt` = **2**.
    - Differences are attributed.
    - *(Both reviewers: the existing `__tests__` exclusion misses side-by-side platform tests. A `*.swift`/`*.kt` glob alone would orphan blend imports and IconBase's resources.)*
  - `tarball-target.json` is committed from the post-diet pack.
  - **Scope sentence (Ada R2)**: the static closure governs **inclusion**, walking all of `src/tokens/**`; over-inclusion is the safe direction. **The packed run at Task 9 certifies the executed path** — the subset of closure 2 that package-mode `generate` loads.
  - **3.5 records Kenya's and Data's verdicts QUOTED from `feedback/tasks.md`** (both KEEP-WITH-FOLLOW-UP), with the honest label: *"reference source, not a build input; does not compile against a born repo's own tier as shipped"* (plus each platform's named causes). **The follow-up is a COMMITTED ISSUE with owner and trigger**, "native component distribution" (Kenya + Data design it; Lina owns component content; Ada owns the theme-conformance generator change). **Trigger: "first Android/iOS product-spec kickoff, or any evaluation of the harness charter, whichever fires first"** (their joint wording). It cites `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md` and the harness charter by path. **Had a verdict been CUT**, it would land only with a named replacement rail **or** a *"no iOS/Android component implementations ship"* line in CHANGELOG and the install doc (Ada D-T-A4 (ii)) — recorded as the rule, and not exercised.
  - **The Lina A7 finding and the `ContainerCardBase.ios.swift:816` parse defect are routed to Lina as messages**, cited by reference.

  **Primary Artifacts:** `scripts/floor-closure.ts`, `floor-closure.json`, `scripts/pack-assert.ts`, `package.json`, `tarball-target.json`, `.kiro/issues/<date>-native-component-distribution.md`

  - [x] 3.1 `floor-closure.ts` (both closures)
  - [x] 3.2 Run it; reconcile closure 2 with attribution classes; the closure-1 bite
  - [x] 3.3 The U1 `files[]` diff; `pack-assert.ts` reading `floor-closure.json`
  - [x] 3.4 The platform-closure rows (iOS + Android) with counts
  - [x] 3.5 **Record Kenya's and Data's KEEP-WITH-FOLLOW-UP verdicts quoted; the honest label; commit the shared follow-up issue; route the two defects**
  - [x] 3.6 `tarball-target.json` from the post-diet pack

- [x] 4. Per-harness MCP configuration, tool manifest, and product MCP wiring

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Lina (Sonnet)
  **Traces**: Reqs 5.3, 5.4, 7.1–7.4, 15A.1 · design C8, C10, DD8

  **Success Criteria:**
  - **Every registered tool in all three servers declares `readOnlyHint`.** `tool-manifest.test.ts` fails otherwise (bite recorded). Per-server tool and read-only counts are listed.
  - `dist/mcp/tool-manifest.json` builds from static registration imports with no server started.
  - Per target, the approvals **equal** (set equality) the manifest's read-only set: `rebuild_index` absent, `find_docs` present, `validate_component` absent.
  - The product entry is emitted for born repos on both targets. **`init.test.ts:142` becomes a three-server assertion in the same commit, with Req 7.2 named in the commit message.**
  - *Scope stated*: config shape and approval equality only. Cold-harness behavior is Task 26.

  **Primary Artifacts:** `scripts/build-tool-manifest.ts`, the three servers' registration modules, `src/cli/shared/mcpConfig/{kiro,cc}.ts`, `src/cli/__tests__/init.test.ts`

  - [x] 4.1 `readOnlyHint` everywhere; `tool-manifest.test.ts`
  - [x] 4.2 `build-tool-manifest.ts` wired into the build
  - [x] 4.3 The Kiro and CC emitters
  - [x] 4.4 Product entry; the `init.test.ts:142` change

- [x] 5. `sync` re-scope, key-grain JSON, manifest, and component-copy migration

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Lina (Opus); Ada (Sonnet) — 5.5 token-side strings
  **Traces**: Reqs 5.1, 5.2, 5.5–5.8, 21 · design C7, DD2, DD21

  **Success Criteria:**
  - **Ours never flows into theirs**: a fixture with an unedited copied token file and a newer package runs `sync --apply` → **byte-unchanged**. A deleted token file → not re-added. *(A `MANAGED_DIRS` diff alone would be presence-of-a-token.)*
  - Classification: `deleted-by-you`, `untracked-new`, and `removed` only under managed entries (`sync.classify.test.ts`, three cases, bites recorded).
  - **No class applies without the report first**: an off-TTY run without `--apply` changes zero files (directory hash unchanged).
  - **Key-grain JSON, reading = PARSED VALUES** (§ "Open inputs" 5.3):
    - a consumer's own server key, and a consumer-authored `mcp__designerpunk-*` rule, survive `sync` **with parsed value unchanged**;
    - **when our keys are unchanged, the file's bytes are unchanged** (no write);
    - editing our key → `conflict`; deleting it → `deleted-by-you`.

  - **Instrument**: `sync.keygrain.test.ts` over **three shapes**: `mcpServers.<key>` ×2 files and the `permissions.allow` array-entry grain.
  - Manifest: the root path; stable order; one entry per line (re-serialize-equals-file); the legacy path read and relocated; pruning with its report.
    - **The de-managed `src/types` pruning line states that the files remain required by their token tier's relative imports** (Ada D-T-A5).
    - **A fixture shows `generate` green after pruning.**
  - **Migration** (`sync.migration.test.ts`; each case's red recorded):
    - (a) a copy edited before first sync → `modified`;
    - (b) unmodified copies across the version range → `unmodified`. **Range named and enumerated: the fixture covers 12.0.5 (dp-portfolio), 13.0.0, 14.0.0 and 14.1.0, plus the pre-Spec-104 identity-transform boundary** (S-T-A4);
    - (c) offline → `cannot-tell`;
    - (d) the registry-pin repair is **not offered before the fetch**;
    - (e) modified copies relocated;
    - (f) the forks string and the Lina A5 notes.
  - **U1's migration report states that copied agents, steering and governance are RETAINED until the next release, and does not offer their removal** (T-L1). String-equal.
  - **dp-portfolio input**: Peter's `ls .kiro/sync-manifest.json` result is quoted, **or** the doc records *"not obtained — both branches covered by fixtures"*. Fixtures cover manifest-present and manifest-absent either way.
  - The Applier source branch is deleted: `grep -n "isSourceTs" src/cli/sync/` → 0.

  **Primary Artifacts:** `src/cli/sync/{FileScanner,Classifier,Manifest,Applier,Reporter,index,Migration,KeyGrain}.ts`, tests

  - [x] 5.1 Obtain or record Peter's dp-portfolio check (with its forced negative); fixtures for both branches
  - [x] 5.2 Manifest: path, format, fields incl. `posture` and `origin`, keyed entries, pruning incl. the `src/types` string (**¾–1 day**)
  - [x] 5.3 Key-grain JSON manager, parsed-value reading, no-write-when-unchanged, three shapes (**~1–1¼ days**)
  - [x] 5.4 Managed set; classifications; `removed` scoping; apply behavior; Applier deletion
  - [x] 5.5 Component-copy migration (the consumer's rail, cache first; the version range; `transforms.js` from the tarball; per-file; relocation; ordering); **legacy agents/steering retained with the U1 report string**
  - [x] 5.6 Repairs (registry pin, tsconfig pin), after the migration fetch

- [x] 6. The name contract and the type contract

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Ada (Opus)
  **Traces**: Reqs 5A.1–5A.7 · design C7 (name contract), DD10, DD11, DD17, **P1 (YES)**

  **Success Criteria:**
  - **GATE — Lina's Container-Base fix has merged before this parent runs** (T2-L1; like 8.1's rename gate). **Instrument**: her resolves-against-generated-CSS guard test passes on `main` at the U1 branch point, **and** 6.1's own-index check (below) is green over the Container-Base maps. **If it has not merged, this parent BLOCKS.** *(Today: 10 dangling references — `--border-border-{default,emphasis,heavy}`, `--zIndex-*` ×6, and `--color-border` — with tests pinning the broken strings.)*
  - `dist/name-contract.json` builds from the compiled surface. The bundle ⊆ src cross-check fails the build on a bundle-only name (bite recorded). Counts are reconciled against the design's 183 / 7, with differences attributed.
  - **Dynamic sites — enumerated MECHANICALLY, with a build failure on an unrecorded site** (Ada R2):
    - **The scan patterns**: `` var(--${ `` · `` `--${ `` · `` getPropertyValue(` `` · `'--' +`, over component source.
    - **The build fails when the scan finds a site absent from the committed site record.** A seventh site is caught at build, not missed.
    - *The bundle ⊆ src check cannot see these sites; this criterion is what covers them.*
  - **Each site takes one of THREE dispositions** (Lina R2's taxonomy + Ada's pre-positioned third):
    - (i) **closed — ours**: the finite literal set joins `referencedNames` in `dist/name-contract.json` under P1's filter;
    - (ii) **component tier**: enumerated, **excluded** by P1 (recorded in `name-contract.json` `excluded[]` with its reason);
    - (iii) **consumer-supplied — out of 5A scope, default value resolved**: the consumer names the variable. Recorded in `excluded[]` with its reason, while **any default value in our code is resolved as class (i)**.
    - **Expected today**: `ContainerCardBase:166` and `token-mapping.ts:70`'s closed maps → (i); `ProgressPaginationBase:232` → (ii); `IconBase:200/:476`, `ContainerBase:224` and `token-mapping.ts:70`'s typed props → (iii).
    - **Nothing is uncovered today.** If a future site is uncovered, the `sync` report carries a standing *"not checked: <component> builds token names dynamically"* line. A component with an uncovered site is never reported silently clean (R26.8).
  - **OWN-INDEX CHECK (T2-L1)**: every class-(i) resolved name is validated **against OUR OWN generated index** (`dist/DesignTokens.web.css` + `dist/ComponentTokens.web.css`) **before** it can enter the contract. **A name missing from ours FAILS THE BUILD as a component defect routed to Lina**, and never reaches a consumer report. **Bite recorded**: re-introduce `--border-border-default` → the build fails with the routed message. *(6.1 stays Opus until this bite is recorded.)*
  - **Tier filter: semantic ALWAYS · primitive YES · component NEVER.** `sync.name-contract.test.ts`: removed semantic → reported; removed primitive → reported; a component-tier name → not reported.
  - No generated web output → `cannot check`, never clean.
  - The report string is string-equal to its catalog row over one fixture.
  - `contractHash` covers the `.d.ts` surface: a `PrimitiveToken` field change → reported; a comment-only change → the "no member changes detected" string.
  - *Scope stated*: web-surface names only. Native surfaces are out, per **Task 3.5's decision record** (Kenya/Data: the Swift and Kotlin compilers are the stricter native name contract, owned by the harness charter).

  **Primary Artifacts:** `scripts/build-name-contract.ts`, `src/cli/sync/NameContract.ts`, tests

  - [x] 6.0 **Gate**: verify Lina's Container-Base chore PR has merged (guard test green on `main`)
  - [x] 6.1 `build-name-contract.ts` + the mechanical dynamic-site scan + the three dispositions + **the own-index check with its bite**
  - [x] 6.2 The check + the P1 tier filter + `cannot check` + the report string
  - [x] 6.3 `contractHash`; the type-contract report
  - [x] 6.4 Tests and bites

- [x] 7. The publish-rail guard, ballot B-U1, and the CHANGELOG's start

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Thurgood (Sonnet)
  **Traces**: Reqs 6.1–6.8, 21.2 · design C9, DD12, DD13 (split), DD16 · **SLOT T2** (the queried tag)

  **Success Criteria:**
  - The script matches the drawn form (`set -euo pipefail`; exits 10/11/12/13; `--self-test-host` exits 12 before `PASS`) *(Erratum 2026-09-27 — Stacy R1-1, Peter's ruling: "the drawn form" now means design.md C9's corrected HTTP form — a direct, unauthenticated `curl` GET against `registry.npmjs.org`, with `node -e` parsing and no `npm` CLI anywhere in the line. The original `npm view`-based drawn form is SUPERSEDED; it broke under its own required hermetic isolation env vars and would not have been hermetic even fixed, per C9's own erratum note.)* *(Second erratum, same date, Stacy re-check: the drawn form also gains exit `2` — a named USAGE error for an unset `VERSION`, never bash's own unbound-variable exit 1 — and `curl -q` as its first argument so `~/.curlrc` is never read, with standard proxy env vars deliberately still honoured. "Exits 10/11/12/13" above reads as "exits 2/10/11/12/13.")*. `shellcheck` (the official `/Users/3fn/bin/shellcheck` binary only — never `npx shellcheck`, a third-party wrapper) is clean, and each exit path's output is committed.
  - **Three bites plus one committed measurement** *(Erratum 2026-09-27: re-measured against the HTTP form; second erratum, same date: a PASS is a measurement, never a "bite" — that word is reserved for a recorded red, per Stacy's re-check — and a fourth bite is added for the new usage exit)*:
    - the exact step-6 command, run against the real registry for the real published version (`14.1.0`) → **PASS**, the committed measurement — supersedes the original "6.3 verbatim command → red" bite, which quoted the now-superseded `npm view` form;
    - (1) `VERSION=99.99.99` → exit 10, via a real HTTP 404 from the live registry;
    - (2) a PATH-shimmed **`curl`** (not `npm`) returning a fixture JSON body whose `dist.tarball` is a GitHub Packages URL → exit 11 **through the production line**;
    - (3) unset `VERSION` → exit 2, the `USAGE` message (new, second erratum).
  - **T2 ruled (B)**: the guard queries the version as drawn; no tag is involved.
  - **B-U1** is RATIFIED *(Erratum 2026-09-27, Task 7.3: the `Ratified-machine:` line is OMITTED, deliberately — following the T1-(B)/`delegated-tier-capture` precedent, not the `2026-09-19-completion-claims-integrity.md` precedent. That mechanism belongs to the one ballot `completion-criteria-parity` parses for its in-force date; reproducing it on B-U1 would create a second parseable record for a checker built to read exactly one. See the ballot's own `Status` block for the reasoning stated in full.)*, before its edits apply. It carries the RELEASE-FLOW step with the paste target, and the register row. The straggler sweep is recorded. **B-U1 cross-references the standalone T1-(B) ballot** (`.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md`, RATIFIED Peter 2026-09-26), **whose merge precedes the U1 branch point** (cited by merge commit) (erratum 2026-09-26; it replaces the planned first-commit section).
  - **`CHANGELOG.md` exists with release 1's consumer-facing entry**, and is in `files[]` (pack check). The entry names what changed for release-1 consumers, including the retained copied agents (Leonardo A5 (ii)), **the removal of the four orphaned Input-Text `.browser.ts` files, and the browser bundles no longer carrying build-machine paths** (both Task 9.0, which runs before Task 7; amendment 2026-09-27).
  - *Scope stated*: npmjs visibility and tarball host only.

  **Primary Artifacts:** `scripts/verify-publish-rail.sh`, `scripts/__bites__/`, `.kiro/docs/ballots/<date>-123-b-u1-publish-rail.md`, `.kiro/hooks/RELEASE-FLOW.md`, `governance/classification-map.md`, `CHANGELOG.md`, `package.json`

  - [x] 7.0 **FIRST on the U1 branch**: verify that the standalone T1-(B) ballot is merged on `main` and reads RATIFIED; record its merge SHA; B-U1 cross-references it (erratum 2026-09-26: it replaces committing the section here)
  - [x] 7.1 Script + self-test + empty-URL branch
  - [x] 7.2 The three bites
  - [x] 7.3 B-U1 record-first; Stacy's review of the register row
  - [x] 7.4 `CHANGELOG.md` with release 1's entry (incl. 9.0's two changes, taken from the 9.0 subtask doc) + the `files[]` entry

- [x] 8. The harvest-zero lint

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Ada (Sonnet)
  **Traces**: Reqs 8.1–8.4 · design C11

  **Success Criteria:**
  - **The rename's PROPERTY holds before the lint merges**: `npx designerpunk generate` over our own source emits **zero harvest-zero warnings**, **executed before 8.2's merge commit** (ancestry cited). The file count (`find src/components -name "*.refs.ts"`) is recorded alongside as corroboration only. *(A count proves filenames; zero warnings proves the property — Lina.)* If the rename has not merged, this parent **BLOCKS**.
  - A fixture with one unbranded `tokens.ts` → exactly one warning, exact string.

  **Primary Artifacts:** `src/cli/loadComponentTokens.ts`, tests

  - [x] 8.1 Gate: the rename merged; the zero-warning run before the lint lands
  - [x] 8.2 Tally + warning + fixture test

- [x] 9. Consumer-guard extensions and U1 post-diet re-certification (**U1 gating parent**)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Thurgood (Sonnet); Lina (Sonnet) — 9.0
  **Traces**: Reqs 3.1–3.9, 5A · design C6 · **9.0: Peter's ruling 2026-09-27 (amendment; pre-release-1 hygiene — `.kiro/issues/2026-09-27-bundle-absolute-path-leak.md`, `.kiro/issues/2026-09-26-input-text-browser-ts-orphans.md`)**

  **Success Criteria:**
  - **The 19 U1-scheduled C6 cases exist as named tests, each bite recorded red; the 19 names are reproduced in the completion doc.**
  - **Package-mode generate from the PACKED install** (Ada D-T-B1): the package-mode case **runs `npx designerpunk generate`** in a packed install with a tokenSource-less config, then asserts the labelled serve. **Bite: drop one closure-2 file (`src/constants/**`) from `files[]` → red, recorded.** *(Without this, closure 2 has no durable arbiter.)*
  - **Packed name contract** (Ada D-T-A7): `sync` in the packed consumer reads `node_modules/@3fn/core/dist/name-contract.json`, and a removed-name fixture is reported.
  - **`npm run test:consumer` passes against the post-diet pack. The cited run's SHA has `git log -1 --format=%H -- package.json` as an ancestor** (Ada D-T-A3). *Scope: U1's surface. The lane half of 3.9 is certified at Task 16.*
  - `npm test` and full `tsc` are green.
  - **The U1 PR body carries the tripwire line**, and the U1 CHANGELOG entry exists (Task 7.4).
  - **9.0 (a) — no build-machine path ships in the browser bundles**: the ESM and UMD bundles that `npm run build:browser` writes contain no absolute build-machine path — no `/Users/`, `/home/` or drive-letter (`X:\` or `X:/`) prefix. A guard test in `npm test` (CI: `lane-timing`) asserts it over the bundles built from the tested commit, never `test:scripts`, which no CI workflow runs (`.kiro/issues/2026-09-27-test-scripts-lane-not-in-ci.md`). Bite (the absolute-path plugin behaviour restored) recorded red. *Limit (R26.8): the guard knows three prefix families; a build root outside them passes.*
  - **9.0 (a) — the name contract survives the fix**: `scripts/build-name-contract.ts` parses the new comment form in the same change, with its test fixture updated to match; `npm run build:name-contract` passes, and the bundle ⊆ src check's Task 6 bite, re-run after the fix, still goes red. Both outputs are recorded in the 9.0 subtask doc.
  - **9.0 (b) — orphan status confirmed before deletion**: the four Input-Text `.browser.ts` files are shown imported by nothing — the build entry (`src/browser-entry.ts`, `scripts/build-browser-bundles.js`), `package.json` `exports`, the tests other than the Input-Text guard, the demos and the Application MCP index name none of them. The commands and their output are recorded. If a consumer surfaces, 9.0 stops and reports it (#204's stop condition), and this row reads ⚠️ with the consumer named.
  - **9.0 (b) — deleted, and not shipped**: the four files are deleted, and `npm pack --dry-run` lists zero `.browser.ts` paths (the count is recorded).
  - **9.0 (b) — the Input-Text guard stays meaningful**: `InputTextFamily.token-resolution.test.ts` loses its `KNOWN_DEFERRED` entry and its `.browser.ts` scan; its non-vacuity assertion still holds over the `.web.ts` files, and a phantom variable planted in one `.web.ts` file turns it red (bite recorded).
  - **9.0 (b) — no doc names a deleted file**: `git grep -n "\.browser\.ts" -- src/components` returns 0 lines (the Email, Password and PhoneNumber READMEs updated).
  - **9.0 (b) — the #202 records are corrected, not rewritten**: `.kiro/issues/archive/2026-09-26-input-text-phantom-css-vars.md` and `.kiro/issues/archive/2026-09-26-container-base-phantom-css-vars.md` ("Left open" item 1) each carry a dated addendum stating that the live `.web.ts` path had two phantoms (fixed in #202 and #203) and the rest were in the orphaned files. The original text is unchanged.
  - **9.0 — both issues close**: `.kiro/issues/2026-09-27-bundle-absolute-path-leak.md` and `.kiro/issues/2026-09-26-input-text-browser-ts-orphans.md` each record their dated outcome and move to `.kiro/issues/archive/` by `git mv`.
  - **9.0 — the CHANGELOG hand-off**: the 9.0 subtask doc lists the deleted paths and the bundle path fix in consumer-facing words, for Task 7.4's release-1 entry. *Ownership: Task 7 (Thurgood) writes and verifies the entry; 9.0 supplies its content.*

  **Primary Artifacts:** `tests/consumer-integration.test.ts`, fixtures, **9.0:** `scripts/esbuild-css-plugin.js`, `scripts/build-browser-bundles.js`, `scripts/build-name-contract.ts`, `scripts/__tests__/build-name-contract.test.ts`, `src/__tests__/browser-bundle-no-absolute-paths.test.ts` (new), `src/components/core/Input-Text-{Base,Email,Password,PhoneNumber}/platforms/web/*.browser.ts` (the four files, deleted), `src/components/core/Input-Text-Base/__tests__/InputTextFamily.token-resolution.test.ts`, `src/components/core/Input-Text-{Email,Password,PhoneNumber}/README.md`, `.kiro/issues/2026-09-27-bundle-absolute-path-leak.md`, `.kiro/issues/2026-09-26-input-text-browser-ts-orphans.md` (both closed and moved to `.kiro/issues/archive/`), `.kiro/issues/archive/2026-09-26-input-text-phantom-css-vars.md`, `.kiro/issues/archive/2026-09-26-container-base-phantom-css-vars.md` (dated addenda)

  - [x] 9.0 (Lina, Sonnet) **Runs before Task 7** (amendment 2026-09-27): (a) the bundle absolute-path fix, with the name-contract parser updated in the same change and its ⊆ bite re-run; (b) #204 — confirm orphaned, delete the four `.browser.ts` files, trim the Input-Text guard, update the READMEs, add the #202 addenda; close both issues; hand the CHANGELOG content to 7.4
  - [x] 9.1 Birth/posture cases, **incl. package-mode generate from the packed install + the drop-a-file bite**
  - [x] 9.2 Root/union cases
  - [x] 9.3 Copy cases; the packed name-contract case
  - [x] 9.4 Bites recorded; the post-diet re-certification (ancestry-checked); full validation; open the U1 PR

### UNIT 2a — Consumer generation profile: splitter, exemplars & G1 (stage U2, steps 1–4)

*(Amendment 2026-09-27: the U2 stage is declared as two merge units, U2a (Tasks 10–12) and U2b (Tasks 13–18) — § "Declared Merge Units"; § "Sequencing decisions" item 9.)*

> **Framing, carried**: § 7.2's check is **NOT signed off**. No U2 criterion claims the check discriminates. G1 and G2 test it; **the verdicts are Stacy's, in verdict records outside every parent** (§ "Gate seat layout"). P2 is ruled branch A.

- [x] 10. Splitter family, span function, and adapter consolidation (steps 1–2)

  **Type**: Architecture · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Lina (Opus)
  **Traces**: Reqs 10.G, 10.S, 10.8, 10.8a · design C13, C14

  **Success Criteria:**
  - **Golden Bite 1** passes against the hand-authored list, and turns red under each recorded mutation: collapse to `##`; file-not-body; fallback on "no headings"; backward heading attachment.
  - The fixture carries every case in C13's golden-fixture bullet (list reproduced).
  - **The test file contains no snapshot matcher**: `grep -nE "toMatch(Inline)?Snapshot"` → 0; the companion red on a created `__snapshots__/` is recorded. **The protection claim is the reviewed diff** (DD6), not the provenance key.
  - The partition invariant holds on **17 files** (nine charters, eight identity docs), with the count asserted.
  - The entry tree keys list/map fields per member and commands by `name` (a test over `lina.md`'s frontmatter).
  - **Adapter consolidation — claim scoped honestly** (S-T-A7):
    - the grep `acc\.add\('passthrough'` over `adapters/{cc,kiro}.ts` returns 0 for agent bodies. *Limit: it is pattern-bound, and other span-adding forms would pass it.*
    - **The arbiter that every body and frontmatter span routes through `emitSpans` is Task 14's two-sided per-target bites**, not the unit twin, which tests only the function.
  - 122 diff-guard is green (sidecars change; the steward rendered text does not).

  **Primary Artifacts:** `tools/agent-generator/{frontmatter,partition,spans}.ts`, `adapters/{cc,kiro}.ts`, `__fixtures__/golden-partition/`

  - [x] 10.1 `splitFrontmatter`; `partition` (all behaviors incl. forward attachment and leading-bold slugs)
  - [x] 10.2 Hand-authored `expected-units.json` + fixture; snapshot ban + companion
  - [x] 10.3 Entry tree
  - [x] 10.4 `emitSpans`; replace both adapters' inline sites and frontmatter loops
  - [x] 10.5 Unit twin; the 17-file invariant; diff-guard green

- [x] 11. Exemplar operative sets for G1 (step 3)

  **Type**: Setup · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Thurgood (Opus); Stacy (Opus) — 11.3; Lina (Opus) — 11.2 owner confirmations for lina.md units and the component-family doc (C1: owner) *(amendment 2026-09-27, ruled by Peter — this row is Lina's write grant, see the header amendment)*
  **Traces**: Reqs 11.6.5, 11.6.5d, 11.5.2 · design C16, § "Gates" step 3

  **Success Criteria:**
  - Operative-set records exist for **the ELEVEN exemplars**: A, B, C(c1) *(premise false — both named units carry 2 operative items (Stacy 11.2); clause (a) is exercised by **F** `#purpose` (0 items, pending Lina's confirmation) only; the record and its confirmed items stand, not re-instantiated — amendment 2026-09-27, ruled by Peter)*, C(c2), D, E, F, Lina-1, Lina-2, **G** (required verdict TRIVIAL: `start-up-tasks.md#item-critical-wait-for-user-authorization-before-starting-new-tasks`, gutted) and **G′** (required verdict NOT TRIVIAL: `#item-civitas-governance-health-check`, honestly re-grounded). G and G′ are Stacy's constructions (S-T6), **with required verdicts committed before G1 runs**.
  - Every `confirmer:` equals the C1 function — by the confirmer check, not inspection. *(amendment 2026-09-27, ruled by Peter — found at 11.4: no instrument existed; the confirmer check is the temporary precursor test `src/__tests__/operative-set-records.test.ts`, functional lane, with the semantics of `completion/task-11-2-stacy-completion.md`'s check script; 13.6 absorbs and deletes it)*
  - Every item `text` passes the verbatim-substring check. *(amendment 2026-09-27 — by the same precursor test, which also asserts each `canonicalHash` is fresh)*
  - Each `confirmation:` path resolves to a committed note. *(amendment 2026-09-27 — by the same precursor test, which also asserts the note's `confirmer:` / `canonicalHash:` / `items:` / `date:` lines match the record)*
  - C1 carve-out confirmations (Thurgood-maintained sources, incl. G/G′'s `start-up-tasks`) land as `Agent: stacy` commits, listed with SHAs.
  - *Scope*: the checks establish the declared seat and verbatim text. **They do not establish authorship** (one git identity) **or completeness** (the confirmer's responsibility).
  - **The coverage-map rows for this parent's new canonical files are cited** from `npm run audit:coverage-map` output, and the regenerated `canonical/coverage-map.yaml` is committed (122 diff-guard green). **Those rows are blank at U2a's merge by construction**: the freshness sweep that lists `122-diff-guard` on `canonical/operative-sets/**` and `canonical/profiles/consumer/**` lands at 13.6, in U2b. **Stacy records a time-boxed adjudication for each blank row at 11.5, committed on the U2a branch so it is on `main` at U2a's merge** (F3 RULED, Peter 2026-09-27; replaces the merged "disclose a known-red window" default). Each row is one `canonical/adjudications.yaml` entry per new file — keys are file paths, not globs — with `sweep: audit:coverage-map`, `ruling: assessment-gap`, `owner: stacy`, and a `record` carrying **both** the path of her ruling note, `.kiro/specs/123-consumer-distribution/completion/f3-coverage-map-adjudication-ruling.md`, **and** the exact string **"expires when 123 Task 13.6 lands in U2b"** (B-CI ballot § 11 `[STACY R1]` § 6 conditions (b) and (d), `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md`). **Counts at U2a** (B-CI ballot § 11 `[STACY R1]` § 6 condition (a)): `grep -c "expires when 123 Task 13.6" canonical/adjudications.yaml` → **N**, where N equals the audit's `adjudicated-blank` count **less the pre-existing `audit:coverage-map` adjudicated rows, which are listed by key** *(Erratum 2026-09-27, ruled by Peter; found by Stacy at 11.3)*, and the N paths are listed. `npm run audit:coverage-map` passes, output cited. *Scope: the citation establishes the rows' state at U2a; it establishes no guard over those files. The schema has no expiry field, so the time-box is text until 13.6 removes the rows.*

  **Primary Artifacts:** `canonical/operative-sets/*.yaml` (exemplar units), `canonical/profiles/consumer/confirmations/*.md`, `canonical/coverage-map.yaml` (regenerated), `canonical/adjudications.yaml` (Stacy's time-boxed `audit:coverage-map` entries only — F3), `.kiro/specs/123-consumer-distribution/completion/f3-coverage-map-adjudication-ruling.md` (Stacy's ruling note — F3)

  - [x] 11.1 Draft the exemplar records
  - [x] 11.2 Owner confirmations under C1; carve-out commits — Stacy for `stacy.md` units and the carve-out; **Lina (Opus) for the `lina.md` units and the component-family doc** *(amendment 2026-09-27)*
  - [x] 11.3 (Stacy) Construct **G and G′** — **the full construction text (the gutted and re-grounded renderings) plus the required verdicts**, committed
  - [x] 11.4 Confirmer + verbatim checks green — by building the temporary precursor test `src/__tests__/operative-set-records.test.ts` *(amendment 2026-09-27, ruled by Peter — found at 11.4: no instrument existed; retired by 13.6)*
  - [x] 11.5 (Stacy) **F3**: after 11.1–11.4, regenerate the coverage map, commit the ruling note and the time-boxed adjudications, and cite the U2a count N *(added 2026-09-27, B-CI ballot § 11 `[STACY R1]` § 6 condition (c): the step needs a subtask so the subtask-doc duty covers it)*

- [x] 12. **G1 gate parent — C3's falsification** (step 4; **U2a gating parent**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY **Thurgood (Opus)** — executing agent; **Stacy authors the verdict records (outside the line)**
  **Traces**: Reqs 11.6.7, 11.6, 11.8.4 · design § "Gates and sequencing" (G1), P2 (branch A)

  **Success Criteria:**
  - **Stacy's verdict record** exists at `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md`. It states **exactly one verdict** (HOLDS / BREAKS / NOT-RUNNABLE) over **all eleven exemplars**, carries the G1 domain line *(amendment 2026-09-27, ruled by Peter: the domain line states that C(c1)'s zero-item premise is false — both named units carry 2 operative items (Stacy 11.2) — so clause (a) is exercised by F's `#purpose` only, and states the corpus fact behind it: every preamble on `stacy.md` carries a trigger or instruction, so no zero-item unit exists there)*, and carries her closed-negative disclosure (she confirmed A–E, G and G′, and constructed G and G′). **Every run is kept** at `…/re-grounding-c3-falsification-run-<n>.md`.
  - **This parent's completion doc CITES the record path(s) and never paraphrases a verdict** (11.8.4).
  - **The selected branch is executed by this parent's agent and evidenced**:
    - HOLDS → U2a proceeds to submission, and Task 13 proceeds in U2b;
    - BREAKS → the C3 rework commits, then a re-run request to Stacy;
    - **the second consecutive BREAKS → branch A** (clause 2 removed; the 24.3 labelling scheduled; G2 half (2) to read "NOT APPLICABLE").
  - **U2a is not submitted while G1 stands at BREAKS** — a NOT-RUNNABLE counts as BREAKS (design § "Gates and sequencing"). The U2a PR opens only on a HOLDS or branch-A record, cited by path in the PR body. Under branch A, U2a merges carrying that record, and U2b executes its consequences (§ "Sequencing decisions" item 9).
  - **No `triviality.ts` exists in U2a**: `git ls-tree -r --name-only refs/pull/<U2a>/head -- tools/agent-generator/regrounding/triviality.ts` returns empty, output cited. *Scope: it establishes the file's absence from U2a only. Its ordering against the G1 record is Task 13's criterion (moved there by the amendment of 2026-09-27, because the file cannot exist until U2b).*
  - **U2a changes no shipped file**: the paths from `git diff --name-only <U2a merge-base>..refs/pull/<U2a>/head`, intersected with the file list from `npm pack --dry-run --json`, are empty (command and output cited). *Scope: path-level only. It does not see build outputs; Tasks 10–12 list no path that compiles into `dist/`. It is the ground for U2a cutting no release (§ "Expected release count"); if it is non-empty, the release decision returns to Peter before U2a merges.*
  - **The U2a PR body carries the tripwire line with `G1 runs: <k>`.**
  - `npm test` and full `tsc` are green on the branch.

  - **No C3 rework commit adds a file under `canonical/` outside a tasks amendment**: `git diff --name-only --diff-filter=A <U2a merge-base>..refs/pull/<U2a>/head -- canonical/` lists only Task 11's files and the regenerated map, output cited. A rework-added `canonical/` file would be a blank coverage-map row with no adjudication grant on this parent, so it returns to Peter as a tasks amendment before U2a is submitted (Stacy R1, F3 edge case).

  **Primary Artifacts:** Stacy's verdict records (cited); the C3 rework commits (if any)

  *Not a criterion — a post-unit obligation: if `G1 runs: <k>` shows k > 1, fork M-1 (Peter, RULED 2026-09-27) has Stacy perform a scoped, post-acceptance read of Task 12's evidence, plus any Task 10 or Task 11 criterion row whose cited artifact a C3 rework commit modified — the set is `git diff --name-only <commit adding re-grounding-c3-falsification-run-1.md>..refs/pull/<U2a>/head` ∩ Tasks 10–11 Primary Artifacts; if that set is empty, Task 12 only. A hit on an exemplar Stacy constructed or confirmed is read with that disclosure. Recorded at `.kiro/specs/123-consumer-distribution/completion/u2a-task-12-scoped-read.md` — it never gates U2a's merge or the U2b cut.*
  *Expected result, recorded 2026-09-27: the "U2a changes no shipped file" check above is expected to report a non-empty intersection — the eight `.kiro/agents/*.attribution.json` sidecars regenerated by Task 10. Peter's 2026-09-27 ruling (cited at § "Expected release count" and `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`) is the disposition: F1 stands, no release-decision reopening required. The criterion's own text and pass/fail mechanics are unchanged by this note. The row is marked ⚠️ (never ✅), with Evidence = the command and its output listing exactly the eight `.kiro/agents/*.attribution.json` paths plus the ruling citation, and a link to `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`. The forced-negative line lists it. The disposition covers exactly those eight paths: any other path in the intersection (including any rendered `.kiro/agents/*.md`) is not disposed, and the release decision returns to Peter before U2a merges.*

  - [x] 12.1 Request G1 from Stacy against the committed exemplar records
  - [x] 12.2 Execute the verdict's branch (rework loop / branch A); record `k`
  - [x] 12.3 Full validation; the no-shipped-file and no-`triviality.ts` checks; open the U2a PR (tripwire incl. `G1 runs`) *(added by the amendment of 2026-09-27)*

### UNIT 2b — Consumer generation profile: machinery, rendering & G2 (stage U2, steps 5–8)

- [ ] 13. Triviality floor, dispositions, overlays, signatures, freshness, and ballot B-U2 (step 5)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Thurgood (Opus); Lina (Opus) — 13.0, 13.4–13.6 *(13.0 added 2026-09-27, U2b-cut amendment)*
  **Traces**: Reqs 11.2, 11.3, 11.5, 11.6 (incl. 11.6.5b/e/f) · design C16–C18, DD19, DD25, DD26, DD13 (B-U2)

  **Success Criteria:**
  - **No `triviality.ts` precedes the G1 HOLDS (or branch-A) record in ancestry**: `git merge-base --is-ancestor <U2a's squash-merge commit on main> <first triviality.ts commit>` exits 0, **cited against the U2b PR's `refs/pull/<n>/head`**, which survives the branch deletion (S-T-A1; moved from Task 12 by the amendment of 2026-09-27). *Scope: it establishes that file's ordering, not the absence of triviality logic elsewhere.*
  - The entry set is every body unit not byte-identical passthrough (a one-byte change enters; untouched does not).
  - **The floor matches complete item `text`, per unit** (Req 11.6.5f): each of Lina-2's seven step units scores 0/k and ROUTES, and its byte-identical preamble is outside the entry set; a verbatim unit with a subtraction-1 removal ROUTES. *(Restated per unit, and the branch-A configuration clause dropped: G1 HOLDS at run 2, so branch A was not invoked — amendment 2026-09-27, U2b cut.)*
  - **The strict count is a valid occurrence assignment, not per-item `includes`** (design C18 clause 2; closes G1 run 2 finding DR-1 — amendment 2026-09-27, U2b cut):
    - (i) **witness**: `triviality.ts` returns the assignment it counted — each credited item id paired with the offset of its occurrence — not only the count;
    - (ii) **validity, as a property test** over generated renderings: every returned assignment is valid — each credited item's complete `text` occurs at its assigned offset, no two credited items share an occurrence, and no two assigned occurrences overlap;
    - (iii) **live-record invariants**, over every unit with a non-empty item set in every committed `canonical/operative-sets/*.yaml` record (units derived from the records, count asserted; zero-item units are 0/0, INAPPLICABLE): a rendering byte-identical to the canonical unit scores `|items|`/`|items|`; and, **for every item, deleting one occurrence of that item's `text` from the canonical unit gives a score below `|items|`** (the deletion invariant; per-item `includes` fails it on exactly `documentation-3` / `lessons-learned-capture-2`) *(Lina R1, 13.4 implementer — U2b-cut amendment review, 2026-09-27)*;
    - (iv) **the AX-1 bite**: over the frozen AX-1 fixture, `#audit-checklist` scores 14/30 and ROUTES; with the assignment replaced by per-item `includes` the test turns RED at 15/30 CLEARS (exact strings recorded);
    - (v) **per-unit search scope**: the text search runs **only within the unit's own rendered span, never the whole rendered charter**; a test asserts that an item whose `text` appears only in a sibling unit's rendering is not credited. *(The mechanical twin of Req 11.6.5e's scope (R2-F1): C18's "per unit" implies it; this states which text is searched. 13.4 does not implement 5e — entailment stays with the routed judge.)* *(Lina R1, 13.4 implementer — U2b-cut amendment review, 2026-09-27)*.
    - *Scope: any valid assignment is sound (C18); whether it is maximal is 13.4's choice (G1 run 2, R2-A2), and a non-maximal choice only under-counts, which routes.*
  - **The floor never condemns, per unit** (Req 11.6.5b, 11.6.5f — amendment 2026-09-27, U2b cut): `triviality.ts`'s verdict type has no TRIVIAL value; over the committed G1 renderings Lina-1 `#ios` and `#android` score 0/3 and ROUTE, and F's zero-item units (`#purpose` and `#family-overview:preamble`, read from the record) are INAPPLICABLE. *Scope: the TRIVIAL / NOT TRIVIAL verdicts of routed units are the routed judgment's (Req 11.6.5e), established at G1 (`completion/re-grounding-c3-falsification.md`), never by code.*
  - **The G1 renderings are copied fixtures with pinned provenance** (pick pre-filled — amendment 2026-09-27, U2b cut; Peter may overturn on the amendment PR): every fixture under `tools/agent-generator/__fixtures__/g1-renderings/` names its source run record (`completion/re-grounding-c3-falsification-run-<n>.md` or `completion/task-11-3-exemplars-g-gprime.md`) and that record's blob SHA, and a test asserts the record's current bytes hash to the pinned blob and the fixture equals the marked rendering block in it. *Scope: it establishes the fixture is the gate's rendering, byte for byte; a changed run record turns it red rather than silently changing the fixture.*
  - **Exemplar F's third unit is recorded and C1-confirmed before 13.4** (amendment 2026-09-27, U2b cut; `.kiro/issues/2026-09-27-task-11-deferred-lina-items.md` Item 1): `canonical/operative-sets/component-family-navigation.yaml` carries `#family-overview:preamble` with its confirmed item set (expected 0), confirmed against that unit's `canonicalHash` as of #223's merge (`14aa8c23` on `main`; the Readiness line 2 → 5), with zero items re-verified on that text *(Lina R1, 13.4 implementer — U2b-cut amendment review, 2026-09-27)*; its note block resolves in `canonical/profiles/consumer/confirmations/component-family-navigation.md`, and `src/__tests__/operative-set-records.test.ts` is green over it, output cited; the confirming commit precedes the first `triviality.ts` commit in ancestry.
  - The hard floor fails when every non-empty-item unit is `no-consumer-counterpart`, including when a zero-item preamble is left retained.
  - **Nine checks, each with a named test, a recorded bite and its exact string**:
    - orphaned key;
    - missing row;
    - wrong confirmer;
    - wrong signer;
    - stale signature;
    - bare signature;
    - stale overlay;
    - item text not verbatim;
    - `repo-bound-in-entirety`.

  - Count asserted.
  - **`operative-set-freshness` inside `122-diff-guard`, with ARMING read-ready** (input 4, corrected):
    - (i) **a STANDING test** runs `npx tsx tools/agent-generator/diff-guard.ts` against a **committed stale-unit fixture** and expects non-zero. *This catches a future restructure that drops the sweep.*
    - (ii) **`npm run audit:coverage-map` shows that the rows for `canonical/operative-sets/**` and `canonical/profiles/consumer/**` LIST `122-diff-guard`**, output cited. *(Stacy R2: zero blank rows would prove only that some check covers them, not this one. She measured no broad `canonical/**` glob.)*
    - (iv) **The U2a time-boxed adjudications expire here**: the same change removes every `canonical/adjudications.yaml` row whose `record` reads "expires when 123 Task 13.6 lands in U2b" — `grep -c "expires when 123 Task 13.6" canonical/adjudications.yaml` → 0, output cited — and (ii)'s output shows **the same N paths U2a listed** (Task 11) now non-blank, without them (F3 RULED, Peter 2026-09-27; B-CI ballot § 11 `[STACY R1]` § 6 condition (a): the → 0 alone would pass vacuously if the rows never carried the string). *Limit: the audit consults adjudications only for blank rows, so an unremoved row would linger silently; the grep is what catches it.*
    - (iii) Stacy is notified that ARMING fires at U2b's merge (amended 2026-09-27; was U2's merge).
    - (v) **The Task 11 precursor test is absorbed and deleted**: the freshness sweep (with 13.3's confirmer and verbatim checks) covers every assertion of `src/__tests__/operative-set-records.test.ts` — confirmer = C1, anchors resolve, fresh `canonicalHash`, verbatim substring, `confirmation:` resolves with matching key lines — and the same change DELETES that file: `git ls-tree -r --name-only refs/pull/<U2b>/head -- src/__tests__/operative-set-records.test.ts` returns empty, output cited. *(amendment 2026-09-27, ruled by Peter — found at 11.4: no instrument existed)* *Scope: it establishes the file's absence and the assertion list absorbed, so no second instrument lingers; the absorbed checks' bites are the nine-check criterion's.*
  - **Ballot B-U2 is RATIFIED before its edits apply.** It carries **the C2 counting-block edit** (per-agent `no-consumer-counterpart` rate, per-signer assent rate, refusal count; baseline-in-123 / first-render annotations) **and the `classification-map` L686 edit** (applied at 17.3) (S-T2).
    - After the counting-block edit, **Stacy re-confirms the changed unit of her charter** before 15.4 runs (the freshness check demands it).
  - *Scope*: mechanics only. Discrimination is G2's question.

  **Primary Artifacts:** `tools/agent-generator/regrounding/triviality.ts`, `tools/agent-generator/derive.ts` (key checks), schemas + validator, `tools/agent-generator/diff-guard.ts`, `__fixtures__/stale-unit/`, `.kiro/docs/ballots/<date>-123-b-u2.md`, `canonical/agents/stacy.md`, `canonical/adjudications.yaml` (13.6 removes the expired U2a rows only — F3), `src/__tests__/operative-set-records.test.ts` (13.6 deletes the Task 11 precursor test only — amendment 2026-09-27), `tools/agent-generator/__fixtures__/g1-renderings/` (copied G1 renderings with pinned provenance — U2b-cut amendment), `canonical/operative-sets/component-family-navigation.yaml` and `canonical/profiles/consumer/confirmations/component-family-navigation.md` (13.0's third F unit only — U2b-cut amendment)

  - [x] 13.0 (Lina) Exemplar F's third unit: record `#family-overview:preamble` and confirm it under C1; precursor test green. **Runs after #223 merges, on a U2b branch cut from a `main` that contains #223**, and before 13.4 *(added 2026-09-27, U2b-cut amendment; ordering per Lina R1)*
  - [x] 13.1 Dispositions schema (explicit rows; per-member frontmatter; no re-pointed embeds; rejected term)
  - [ ] 13.2 Overlay + signature formats; stale and bare checks
  - [ ] 13.3 Confirmer/signer checks; verbatim-substring check
  - [ ] 13.4 (Lina) `triviality.ts`: the occurrence assignment with its witness, the tested properties and the AX-1 bite, over the copied G1 fixtures *(the branch-A configuration is dropped — G1 HOLDS; amendment 2026-09-27, U2b cut)*
  - [ ] 13.5 (Lina) Orphan and missing-row refusals
  - [ ] 13.6 (Lina) The freshness sweep in diff-guard + the STANDING stale-fixture test + the `audit:coverage-map` rows-list-the-guard run + the ARMING notice + removal of the expired U2a adjudications (F3; Stacy is told in the same notice) + absorb and delete the Task 11 precursor test `src/__tests__/operative-set-records.test.ts` (amendment 2026-09-27)
  - [ ] 13.7 **Author ballot B-U2** (counting block + L686); Stacy's review; record-first
  - [ ] 13.8 Apply the counting-block edit (regenerate); Stacy re-confirms her changed unit

- [ ] 14. Derivation checker, grain guard, and per-target bites (step 6)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Lina (Opus)
  **Traces**: Reqs 11.4, 10.G, 10.S, 10.8b/c · design C15, DD7

  **Success Criteria:**
  - Containment through both trees only. Unknown anchors are non-matching, never a throw: attack (a) → `FAIL_NO_DERIVATION`; E → `VERIFIED`; `#body` → non-matching.
  - Golden Bite 2 recorded.
  - **Body per-target, two-sided**: a `cc.ts` call-site mutation → `› cc` = **`FAIL_NO_DERIVATION`** and `› kiro` green, plus the symmetric pair. The verdict value is asserted; logs committed. **This is the arbiter for Task 10's consolidation claim.**
  - **Frontmatter per-target (E-fm), two-sided**, on `writeScope[<glob>]`, with the same pattern and logs — **OR** `frontmatter routing: asserted, not bitten — <reason>`.
  - `derivation.frontmatter.test.ts`: `commands[<name>]` emptied with a sibling destination → `FAIL_NO_DERIVATION`.
  - One guard file iterates the targets in `consumer-profile.yaml`; a fake third target adds a third block with no other edit.

  **Primary Artifacts:** `tools/agent-generator/regrounding/derivation.ts`, the guard tests, `__fixtures__/` (E, E-fm)

  - [ ] 14.1 `derivation.ts`
  - [ ] 14.2 Agent-shaped fixture carrying E (~1–2 h)
  - [ ] 14.3 Body per-target guard + bites (~30 min each)
  - [ ] 14.4 E-fm + frontmatter bites (or the forced negative)
  - [ ] 14.5 Bite 2 + `derivation.frontmatter.test.ts`

- [ ] 15. Consumer rendering and first render (step 7)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Thurgood (Opus); Lina (Opus) — 15.2 `derive.ts`
  **Traces**: Reqs 9, 9.5, 11, 12, 13, 14.8–14.9 · design C12, C19, C22, DD18, DD20

  **Success Criteria:**
  - `consumer-profile.yaml` has targets `[cc, kiro]` and `defaultTarget: cc`. The sweep for other declared target lists returns only imports (command and output recorded). ***Limit: a zero-hit sweep is evidence about the pattern, not the codebase*** (S-T-A8).
  - `derive()` produces `_consumer-output/_canonical/` (once) and `<target>/` covering 8 agents plus identity members for both targets. `guardedRoots()` covers all three, and diff-guard is green.
  - Identity members carry no source frontmatter; Kiro members carry exactly `id` + `inclusion: always`; all are prefixed `designerpunk-<id>.md` (test over rendered output).
  - **Every unit and entry, for all 8 agents, shared members and 8 identity docs, has an explicit row.** The missing-row refusal passes over the full profile; counts per agent recorded.
  - **ZERO STANDING REFUSALS at U2 acceptance (U2b's merge)** (S-T3). Every `refuse: should-re-point` row was re-authored and re-judged, and **resolved EITHER by itemized assent OR by a changed disposition under its own C1 signature** (e.g. re-disposed `superseded-by`). **Never assent-only** (Stacy R2). **Refusals issued** during first render are recorded in the "first render — not a baseline" block with the `no-consumer-counterpart` and assent rates. Every ROUTED row carries a C1-correct signature, and the hard floor passes for all 8.
  - **Consumer-Kenya's and consumer-Data's knowledge-fallback paths** (`src/components/core/*/platforms/{ios,android}/**`) are re-grounded to `node_modules/@3fn/core/src/…` in their consumer renderings (Kenya/Data R1). Assert by grepping the rendered files; the path's existence in a packed install is checked at Task 16.
  - `derive()` refuses on a stale overlay and an orphaned key over the real profile.
  - *Scope*: declared-and-signed-by-the-right-seat only. Discrimination is G2's question; authorship is not establishable.

  **Primary Artifacts:** `canonical/consumer-profile.yaml`, `canonical/profiles/consumer/**`, `canonical/operative-sets/**`, `tools/agent-generator/{derive,generate}.ts`, `canonical/_consumer-output/**`

  *Not a criterion — a precondition carried in (U2b-cut amendment, 2026-09-27; G1 run 2 finding R2-F1, Peter ruled proceed-on-HOLDS): Req 11.6.5e's "Scope — within the unit's own rendering" is in force before 15.5's first routed signature. A signer credits an item by entailment only from that unit's own rendering, and a function that survives only elsewhere takes a disposition. Stacy checks it at U2b's MIDPOINT.*

  - [ ] 15.1 Profile file; `AdapterContext.profile`; `generateConsumerRendering`; `guardedRoots()`
  - [ ] 15.2 (Lina, Opus) `derive.ts`
  - [ ] 15.3 `emitIdentityMembers` per target
  - [ ] 15.4 Operative sets for all units; dispositions/overlays for all 8 charters, shared substrate and identity docs; knowledge-fallback re-points
  - [ ] 15.5 First-render routing: confirmations and signatures per C1; refusals resolved to zero standing (assent or re-disposition); rates and refusals issued recorded

- [ ] 16. Consumer emission lane, `attach`, the `init` agent layer, legacy migration, and generated-surface `sync`

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Lina (Opus) — 16.1, 16.5; Lina (Sonnet) — 16.2, 16.3, 16.4, 16.6; Ada (Sonnet) consulted — 16.3
  **Traces**: Reqs 13, 14.1–14.4, 15A.1, 19.2, 19.7, 5.6, 15.8 · design C20, C1 (agent rows + row 10), C5 (deferred rows), C7 (generated surfaces, region grain, **Migration item 4**, the release-1 cohort), C27 erratum, DD22

  **Success Criteria:**
  - `emitConsumer` reads only C20's inputs, **`packageRoot`-relative**. `consumer-entry.paths.test.ts` shows inputs under `packageRoot`, outputs under `consumerRoot`, and differing paths on Kiro. `registry.fromManifest` is used and no server starts.
  - **The packed install emits a working agent layer for both targets**: pack → `init --target=cc` and `--target=kiro` → the expected file set and keys, and **zero `complete-task.sh|Peter merges|RATIFIED` in emitted charters**. *Scope: clause (i)'s deny-list tokens, not re-grounding quality.* Consumer-Kenya/Data's re-pointed knowledge paths **resolve** in the packed install.
  - The agent-layer rows, row 10's comment edit, and the deferred `files[]` rows are implemented (`init.test.ts` + Ada's `pack-assert.ts` re-run with the deferred rows).
  - **`attach`**: refusals and exact strings; `--reference` writes a `posture: 'consume'` manifest; **`attach --reference stays CONSUME` passes, bite recorded red.** **Restart rows (Le-T5)**: born-repo `attach` and `init`'s U2 output print the **sequenced** row **LAST**; `attach --reference` prints the **now** row. String-equal assertions on the expected order.
  - **Legacy migration** (T-L1; design Migration item 4): `--migrate-legacy` is **offered only when `attach` is available and runs in the same flow** (removal then attach). A test asserts that it is never offered without the attach step.
  - **The release-1 cohort** (Ada D-T-B2): a fixture born by **release-1 `init`** (a current-format manifest with `origin: 'copy'` entries under `.kiro/agents` / `.kiro/steering` / `governance`) → U2 `sync` reports them as legacy copies and offers `--migrate-legacy` + `attach`. **It neither leaves them silently beside generated agents nor classifies them as conflicts.** Bite (key on manifest version instead of `origin`) recorded red. **After `--migrate-legacy` + `attach`, ZERO `origin: 'copy'` entries remain under those paths** (they are replaced by `generated`), so a migrated consumer is never re-detected as a cohort member (Ada R2).
  - **Region grain**: the `CLAUDE.md` region is spliced; outside bytes unchanged; missing markers → string, no write (`sync.region.test.ts`).
  - Generated-surface `sync` for `attachedTargets` only. A deleted generated file → `deleted-by-you` (generated-surface cases).
  - Degradation: warning, exit 0 (`consumer-entry.degradation.test.ts`, bite recorded).
  - **The lane half of 3.9**: `npm run test:consumer` against the U2b pack, with the SHA ancestor-checked against the last `package.json` change.

  **Primary Artifacts:** `tools/agent-generator/consumer-entry.ts`, `build:generator`, `src/cli/attach.ts`, `src/cli/init.ts`, `src/cli/sync/{RegionGrain,Migration}.ts`, `package.json`, tests

  - [ ] 16.1 (Opus) `consumer-entry.ts` + `build:generator` (the first esbuild of the generator: lazy requires, runtime fs-reads, no live-introspection path)
  - [ ] 16.2 `attach` (modes; refusals; restart line; vocabulary object; safe re-run)
  - [ ] 16.3 `init` agent-layer rows + row 10; the deferred `files[]` rows (Ada consulted); manifest `origin: 'generated'`
  - [ ] 16.4 Region extractor + splicer (**~1 day**, mechanical)
  - [ ] 16.5 (Opus) Generated-surface `sync` + `attachedTargets` generation + legacy migration only-with-attach + the release-1 cohort case (**~1 day+**)
  - [ ] 16.6 The `attach --reference` C6 case; the lane half of 3.9

- [ ] 17. Legacy-path deletion and the L686 edit under B-U2

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Lina (Sonnet); Thurgood (Sonnet) — 17.3
  **Traces**: Reqs 14.5–14.7 · design C21, DD13

  **Success Criteria:**
  - **The `SCAN_DIRS` removal and the no-op precede the deletion** (test: nonexistent scan dir → exit 0; git order cited).
  - `product-template/` is deleted, each sweep entry carries its verb, and the repo grep for `product-template` returns only verified-historical sites (command and output recorded).
  - The L686 edit applies **under B-U2** (ratified at 13.7), in the same PR.
  - The drift step passes after the deletion.

  **Primary Artifacts:** `scripts/check-package-name-drift.js`, `product-template/` (deleted), `governance/DesignerPunk-Integration-Guide.md` (§ 4b), `governance/classification-map.md`

  - [ ] 17.1 `SCAN_DIRS` + no-op + test (first commit)
  - [ ] 17.2 Delete; Integration Guide § 4b teaches `attach`; the grep sweep
  - [ ] 17.3 Apply L686 under B-U2

- [ ] 18. **G2 gate parent — pass four** (step 8; **U2b gating parent and U2's acceptance gate**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY **Lina (Opus)** — executing agent; **Stacy authors the verdict record (outside the line); Thurgood recused**
  **Traces**: Reqs 11.8, 11.8.4, 24.3 · design § "Gates and sequencing" (G2)
  **Preamble**: Lina accepted the seat on two conditions (R2), written as criteria below. **This parent's `CHANGELOG.md` edit sits outside her charter scope. It is granted under T1-(B) as a listed Primary Artifact** (resolved). She authored the machinery pass four tests, and the MIDPOINT disclosure covers that.

  **Success Criteria:**
  - **The two consequence texts are PRE-DECLARED**: the PASSES edit to the 24.3 table (per domain) and the Fork A demotion edit are committed at `.kiro/specs/123-consumer-distribution/completion/g2-consequence-texts.md` **before pass four is requested** (ancestry cited).
  - **Stacy's verdict record** exists at `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md`, with exactly one verdict.
    - **Scope half (1)** is attack (a) verbatim.
    - **Half (2)** is that the check reads the committed record — **or, under branch A, "NOT APPLICABLE — no mechanical floor (P2 branch A)"**, never a pass.
    - The domain line names body / frontmatter / always-set as exercised or "not exercised".
  - **This parent's completion doc CITES the record path and never paraphrases the verdict** (11.8.4). **Thurgood authors no line of it**, and the U2b PR body states the recusal.
  - **The verdict's consequence is applied as an artifact edit in this PR by this parent's agent, BYTE-EQUAL to its pre-declared text**, cited against its source line in `g2-consequence-texts.md` (Lina condition 1; MIDPOINT checks it as a diff): PASSES → the 24.3 table lists (v)'s mechanical half as deterministic for the named domains only; FAILS / NOT-RUNNABLE → the Fork A demotion edit.
  - **On FAILS or NOT-RUNNABLE, the agent applies the Fork A demotion and SUBMITS. It never patches the machinery and re-requests pass four inside U2** (Lina condition 2). A machinery fix is a new falsification cycle, with its own record and a new G2 request after U2b's merge.
  - **A G2 blocked by G1 at BREAKS is not NOT-RUNNABLE.** Since the split, U2a merges only on a G1 HOLDS or branch-A record (Task 12), so U2b begins with G1 resolved; **this parent's completion doc cites, by path, the G1 record U2a merged on.**
  - **The U2b PR body carries the tripwire line** (`G1 runs` is U2a's field), and the release-2 CHANGELOG entry is committed.
  - `npm test` and full `tsc` are green on the branch.

  **Primary Artifacts:** Stacy's verdict record (cited); the U2 completion doc's 24.3 table; `CHANGELOG.md` (release 2)

  - [ ] 18.0 Commit the two pre-declared consequence texts
  - [ ] 18.1 Request pass four from Stacy
  - [ ] 18.2 Apply the verdict's artifact edit; the release-2 CHANGELOG entry
  - [ ] 18.3 Full validation; open the U2b PR (tripwire line)

### UNIT 3 — Onboarding

- [ ] 19. The install doc, and the Integration Guide reconciled into it

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Thurgood (Opus)
  **Traces**: Reqs 15.1–15.9, 15B.1–15B.9, 22.2, 4.5 · design C23

  **Success Criteria:**
  - Front-matter `path-steps: { founder: 5, joining: 5, joining-cross-harness: 6, reference-no-init: 3 }`. **A test counts the numbered items per path and asserts equality** (22.2's instrument; it never counts a run).
  - The section order matches C23 (heading-order test).
  - **Owed contents — one row per owed AC, with the install-doc passage QUOTED as Evidence** (Le-T2). The rows are 15.3 · 15.4 · 15.5 · 15.6 · 15.7 · 15.8 · 15.9 · 15B.4 · 15B.6 · 15B.8 — **ten rows**, count asserted in the completion doc. **String assertions** are also committed for the single-string residuals 15.5, 15.6 and 15.7. *Instrument: inspection plus string checks, stated as such.*
  - The 119-B lint passes. The approval instruction is harness-agnostic (asserted string).
  - **The native honest labels appear** for iOS and Android implementers, matching Task 3.5's decision record (asserted strings), **in the install doc AND in the package `README.md`**. The README's *"True native implementations (Web Components, SwiftUI, Jetpack Compose)"* line (L57) is **replaced by the labelled form, with an asserted string**. *(Kenya R2: npm ships the README in every tarball and the registry renders it, so it is the surface a `node_modules` or npm-page reader actually meets. Adopted on the same Req 4.5 truthfulness ground as the install-doc label.)* **Per T2 (B), the README does not advertise the onboarding path before release 3.**
  - `vocabulary.ts` consistency covers **INSTALL.md and the Integration Guide**. *Scope: it establishes 15B.5 only; 15B.3 is evidenced by persona (c) at U5.*
  - **Integration Guide disposition** (Le-T4; adjudicated as below): INSTALL.md's content is **served under the existing `designerpunk-integration-guide` doc-id**.
    - `governance/DesignerPunk-Integration-Guide.md` becomes the served source carrying INSTALL.md's body. `docs/consumer/INSTALL.md` is derived from it at build.
    - **A test asserts the two bodies are identical.**
    - No alias is added (119-B), every charter route stays valid, and `rebuild_index` runs post-merge.
    - A grep over the guide for `product-template|src/components/core/` returns only lines dispositioned in the completion doc.
  - Leonardo's on-branch review is recorded with every item dispositioned.

  **Primary Artifacts:** `docs/consumer/INSTALL.md`, `governance/DesignerPunk-Integration-Guide.md`, `README.md`, `src/cli/shared/vocabulary.ts`, tests, the build step deriving INSTALL.md

  - [ ] 19.1 `vocabulary.ts`; the doc in C23 order with prerequisites and native labels; the README L57 label + its string assertion
  - [ ] 19.2 Path-step counting test; heading-order test; 119-B lint; residual string assertions
  - [ ] 19.3 The ten owed-AC rows with quoted passages
  - [ ] 19.4 **Integration Guide → served source of INSTALL.md content** (same doc-id; derived INSTALL.md; body-identity test)
  - [ ] 19.5 Leonardo's review; fold

- [ ] 20. The commit policy and the `.gitignore` managed block

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Lina (Sonnet)
  **Traces**: Req 15A.1a · design C24, DD1, DD21

  **Success Criteria:**
  - `COMMIT-POLICY.md` reproduces C24's table.
  - `init` emits a `.gitignore` region ignoring exactly `token-index/` and `.designerpunk/`, with the commented platform-output line carrying the **configured `outputDir`**. Tested with two configs.
  - The `.gitignore` region round-trips through `sync` (outside lines byte-unchanged).
  - **A fresh clone of a policy-applied fixture runs joining steps 2–4 successfully**: `npm install` + `generate` succeed **and `.designerpunk/personal-note.local.md` is created** (Leonardo A8). *Scope: file-provable completeness, not harness session load.*

  **Primary Artifacts:** `docs/consumer/COMMIT-POLICY.md`, `src/cli/init.ts`, tests

  - [ ] 20.1 `COMMIT-POLICY.md`
  - [ ] 20.2 `.gitignore` region (configured path) + `sync` round-trip
  - [ ] 20.3 Fresh-clone fixture through step 4

- [ ] 21. The starter specs

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Thurgood (Opus)
  **Traces**: Reqs 16, 17 · design C25, DD15

  **Success Criteria:**
  - The CI-needs spec gives every need a bite recipe and a two-sided price line, including "committed platform output matches `generate`" (structure test fails otherwise; need count recorded).
  - The re-grounding starter spec's tasks include the **report of what did not transfer**.
  - `init` scaffolds both into `specs/`, reporting on collision (`init.test.ts`).

  **Primary Artifacts:** `starter-specs/**`, `src/cli/init.ts`

  - [ ] 21.1 CI-needs spec
  - [ ] 21.2 Re-grounding spec
  - [ ] 21.3 Scaffolding + structure test

- [ ] 22. Personal note, `init` UX completion, product scaffold, and DD9 (**U3 gating parent**)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Lina (Sonnet); Leonardo (Opus) — 22.3 `example-home.yaml`, 22.5 DD9
  **Traces**: Reqs 18, 19.3–19.8, 15.8, 15.9, 13 · design C26, C27 (+ erratum), DD9

  **Success Criteria:**
  - `generate` creates an absent note from the template and prints its name; an all-`TODO` note counts as absent (tests).
  - **`init`'s terminal output is string-equal to the catalog rows for the re-anchored clone hatch and the personal-note naming, its next steps list positively what the repo needs next, and the SEQUENCED restart row is the LAST next step** (Le-T1 + Le-T5; the C27 erratum). `init.test.ts` string assertions **on the expected order**.
  - Collision strings are truthful, and next steps omit steps a skip made untrue.
  - **The scaffolded `product/` tree indexes with zero errors and zero unresolved references.** Bite recorded. **Handoff recorded**: Leonardo authors `example-home.yaml` at `.kiro/specs/123-consumer-distribution/design-inputs/example-home.yaml` (commit `Agent: leonardo`, inside his write scope), and **Lina places it byte-identical** into the scaffold template path (a test asserts the two files are equal).
  - **DD9 confirmed or flipped by Leonardo, his words quoted.** The notice string matches the catalog, and the founder count is unchanged.
  - The U3 PR body carries the tripwire line, the release-3 CHANGELOG entry is committed, and `npm test` + full `tsc` are green.

  **Primary Artifacts:** `templates/personal-note.template.md`, `src/cli/{init,generate}.ts`, the `product/` scaffold incl. `experience-map/pages/example-home.yaml`, tests, `CHANGELOG.md` (release 3)

  - [ ] 22.1 Personal note: template, personalization, create-if-absent, all-`TODO`-as-absent
  - [ ] 22.2 C27 completion: restart line, hatch, note naming, next steps; collision strings
  - [ ] 22.3 (Leonardo) `example-home.yaml` in `design-inputs/`; (Lina) placement (equality test) + scaffold mechanics + validity guard
  - [ ] 22.4 Release-3 CHANGELOG entry; full validation
  - [ ] 22.5 (Leonardo) DD9 confirmation; open the U3 PR

### UNIT 4 — Content policy

- [ ] 23. The banner predicate, guard, and banners

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Thurgood (Sonnet)
  **Traces**: Reqs 20.1–20.8 · design C28

  **Success Criteria:**
  - The predicate implements Ada's text, with the under-inclusion header.
  - `audience-banner.test.ts` asserts predicate-match ⇒ banner-present and reports `N match; N carry`. Bite recorded. *Scope in its output: predicate coverage, never "the corpus is bannered".*
  - Each banner uses a template and states what is worked example and what is transferable (inspection per doc, listed).
  - **Registration**: if it is a new CI context, Stacy's ARMING fires and the notice is recorded; if it runs in an existing lane, that lane is named. **Either way, each governed doc's coverage-map row LISTS the banner guard** (cited). *(Stacy R2: "zero blank rows" would be true before the guard existed, since other checks already cover those docs.)*

  **Primary Artifacts:** `scripts/audience-banner/predicate.ts`, the test, `governance/*.md`

  - [ ] 23.1 Predicate + guard + bite
  - [ ] 23.2 Banners on the matched set; owners notified
  - [ ] 23.3 Registration decision; the ARMING notice; the rows-list-the-guard evidence

- [ ] 24. U1b backward check, the release recipe (B-U4), and the changelog step (**U4 gating parent**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Thurgood (Opus)
  **Traces**: Req 21.1–21.3, 23.7 · design C29, DD13, DD16

  **Success Criteria:**
  - `validation/u1b-backward-check.md` covers every 125-B `governance/` prune, **with the denominator enumerated from `git log` in the record**. **It includes the reference-mode residual Ada recorded**: served docs pointing at no-longer-shipped `src/` paths (D-T-A6). Findings are routed as explicit messages.
  - **B-U4** is RATIFIED before its edits apply. It carries the trio obligation (23.7) and the **recurring** changelog step (21.2); the CHANGELOG itself exists since U1.
  - The U4 PR body carries the tripwire line.

  **Primary Artifacts:** `.kiro/specs/123-consumer-distribution/validation/u1b-backward-check.md`, `.kiro/docs/ballots/<date>-123-b-u4-release-recipe.md`, `governance/release-management-system.md`

  - [ ] 24.1 U1b check (enumerated denominator; the D-T-A6 residual); route findings
  - [ ] 24.2 B-U4 record-first; ratified edits
  - [ ] 24.3 Open the U4 PR

### UNIT 5 — Validation & closeout

**Run discipline (Tasks 25–27; S-T4, S-T-A6)**:
- **Every session's initial prompt is frozen and committed under `.kiro/specs/123-consumer-distribution/validation/prompts/<run-id>.md` BEFORE the run.** Its commit is an ancestor of the record's commit, and it is reproduced verbatim in the record. **Pinned inside the spec directory** (Leonardo's lean, adopted), so the prompts sit within the operator's charter scope. The protocol and fixtures under `tests/onboarding-trio/` are Task 25's Primary Artifacts, **granted to Leonardo under T1-(B)** (resolved).
- **Operator: Leonardo** (§ "Delegated-tier plan"), **with his three conditions as record fields on every trio, join and conformance record**:
  - **C1 `operator-log:`** — every operator message after the frozen prompt, reproduced verbatim with its reason (default `none`). **`operator-halt:<reason>` is the only operator-initiated stop.**
  - **C2 `subject: leonardo`** — every finding whose subject is consumer-Leonardo is tagged. **Stacy's CLOSEOUT pass cross-reads the tagged findings.**
  - **C3 `session-launched-by: <who>`** — who physically launched each harness session (Leonardo, Peter or the orchestrator). Leonardo owns the prompts, protocol adherence, in-run judgments and records.
- **`harness-user-state` is EVIDENCE, not a word** (Leonardo A2). Either the inspection commands and output over the harness's user-level stores, or the mechanism used. **The default mechanism is a fresh temporary `HOME` per run**; any re-login cost is recorded.

- [ ] 25. The persona trio

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Leonardo (Opus) — operator
  **Traces**: Reqs 22, 23, 24.2a, 25.1, 25.5, 15B.3 · design C30

  **Success Criteria:**
  - Three records at `.kiro/specs/123-consumer-distribution/validation/trio-<n>-<persona>.md`. Each runs against a packed install with no source access, on its committed fixture, **from its frozen prompt**. Both targets appear.
  - **Every record carries every C30 field, plus `operator-log`, `session-launched-by` and `subject:` tags**, with the field list reproduced. **Schema check scope: it establishes field presence, not observation quality** (S-T-A3). The forced negative per persona is what makes an empty findings list auditable, and Stacy's CLOSEOUT reads the operator logs' content and the `subject: leonardo` findings.
  - **"Not exercised" reasons use Kenya's and Data's corrected wording**: *"Kenya/Data unexercised — no native component consumption path, and no platform toolchain on the host"* (never "for want of a platform fixture").
  - Budgets are agent turns ≥ 3× the declared `path-steps`; `budget-exhausted` is a finding.
  - **Persona (c) runs bare `init` in Kiro** (still counting toward Kiro), and her record states whether 15B.3's distinction held (evidence quoted).
  - **DD9 re-read, scoped** (Leonardo A1): it states whether a founder who got the wrong default **recovered via the notice**, and states that it **cannot** establish which harness is the majority.

  **Primary Artifacts:** `tests/onboarding-trio/{protocol.md,fixtures/}`, `.kiro/specs/123-consumer-distribution/validation/prompts/`, `validation/trio-*.md`

  - [ ] 25.1 Protocol + committed fixtures + frozen prompts
  - [ ] 25.2 Run (a)
  - [ ] 25.3 Run (b)
  - [ ] 25.4 Run (c) — bare `init` in Kiro
  - [ ] 25.5 Schema check; the scoped DD9 re-read

- [ ] 26. The two cross-target join runs and the install-doc correction

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Leonardo (Opus) — operator; Thurgood (Sonnet) — 26.5
  **Traces**: Reqs 15A.4, 15A.1 · design C8, C24, DD8

  **Success Criteria:**
  - **Two join records** (CC-born → Kiro; Kiro-born → CC), each cloned from a **committed born-repo fixture born by `init --target=<t>` from the same packed artifact the join installs** (Leonardo A3), run from a frozen prompt, and carrying `operator-log` and `session-launched-by`.
  - **Each record carries the joining path's OUTCOME** (Le-T3):
    - a per-step outcome for `joining-cross-harness`'s **6 steps**;
    - findings;
    - the forced negative;
    - the stop event from the closed vocabulary;
    - **one post-restart query answered by an attached agent, with its answer checked against that agent's rendered charter** (24.6's bar in miniature).

  - *"Joined" means the agent answers, not that files exist.*
  - **Only clean-state records count as cold.** The table per target × {founder-cold (Task 25), teammate-cold (this task)} reads "observed" or "not observed cold — state not clean".
  - The C8(c) observations are recorded (committed `.claude/settings.json` honored? the gitignored note's `@`-import on a fresh clone?).
  - **The install doc (via the Integration Guide source, Task 19.4) is corrected only for cells observed cold.** Diff cited.

  **Primary Artifacts:** `validation/join-cc-to-kiro.md`, `validation/join-kiro-to-cc.md`, `governance/DesignerPunk-Integration-Guide.md`

  - [ ] 26.1 Commit the two fixtures, born from the packed artifact
  - [ ] 26.2 Join CC→Kiro
  - [ ] 26.3 Join Kiro→CC
  - [ ] 26.4 The cold-observation table
  - [ ] 26.5 (Thurgood) Install-doc correction for observed cells

- [ ] 27. Re-grounding conformance (24.1 two-beat)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Leonardo (Opus) — operator (**not the profile author**)
  **Traces**: Reqs 24.1–24.6 · design C31

  **Success Criteria:**
  - **Both beats run from frozen prompts, committed before the run and reproduced verbatim** (S-T4). The beat-2 prompt contains no instrument hint; the record reproduces it so any hint is auditable.
  - Beat 1: consumer-Thurgood executes the re-grounding starter spec, with its bar (formalized: yes/no, artifact path).
  - Beat 2: consumer-Stacy verifies beat 1's claims, recorded separately, or `not exercised — upstream beat produced no artifact`.
  - The charter-identity probe runs on both, and answers are checked against the **consumer rendering's** declared domain, routes and out-of-scope list (file cited).
  - The 24.3 labelling: (v)'s mechanical half is deterministic only if G2 PASSES, and only for the named domains.

  **Primary Artifacts:** `validation/conformance-beat-{1,2}.md`, `.kiro/specs/123-consumer-distribution/validation/prompts/conformance-*.md`

  - [ ] 27.1 Freeze and commit both prompts
  - [ ] 27.2 Beat 1
  - [ ] 27.3 Beat 2
  - [ ] 27.4 The identity probe; the 24.3 labelling

- [ ] 28. Closeout (**U5 gating parent**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Thurgood (Opus); Leonardo (Opus) — 28.3
  **Traces**: Reqs 25.2–25.7, 26.7, 23.7, 23.9 · design C32

  **Success Criteria:**
  - The probe re-run against release-4 artifacts; **the Evidence cell carries 26.7's scoping sentence**.
  - The tarball assertion vs `tarball-target.json`, with differences attributed.
  - **Product query — seat and bar** (Leonardo A7): **consumer-Leonardo in a fresh session in the consumer repo** answers `get_product_overview` (the overview's product name matches the scaffold) and `find_screens` (returns `example-home`). The transcript excerpt shows both.
  - **Open obligations**: the list is enumerated from design § "Open design inputs", § "What resisted", and this file's § "Carried obligations", and reproduced in the completion doc. They exit as committed `.kiro/issues/` records with owner and trigger:
    - the 23.7 trio;
    - the 23.9 cold-human run;
    - the 125-B U3 re-attestation;
    - any `cannot-tell` / not-observed-cold cells.
  - The U5 PR body carries the tripwire line, the release-4 CHANGELOG entry is committed, and `npm test` + full `tsc` are green.

  **Primary Artifacts:** `validation/probe-rerun.md`, `.kiro/issues/<date>-123-*.md`, `CHANGELOG.md` (release 4)

  - [ ] 28.1 Probe re-run with scoping
  - [ ] 28.2 Tarball assertion
  - [ ] 28.3 (Leonardo) Product query, seat and bar
  - [ ] 28.4 Obligation records; release-4 CHANGELOG entry; full validation; open the U5 PR

---

## What resisted tasks grain (round input, not defect)

1. **G1 and G2 outcomes are unknowable at plan time.** U2a's `G1 runs: <k>` makes the rework loop visible to Peter.
2. **The first-render signature volume** is irreducible and falls ~2× on Stacy, now plus **refusal re-authoring to zero standing** (S-T3), which can add loop time the tripwire does not count.
3. **Seat authentication** stays declared-not-proven until 125-B U3.
4. **A fresh `HOME` makes "clean" true by construction, but costs a harness re-login per run** (unverified per harness). The cold cells may still read "not observed cold" if a harness cannot run under a fresh HOME.
5. **The release count assumes no hotfixes.** (T2 ruled plain sequential: no tag promotion to verify.)
6. **T1 is RULED (B).** U1's start gate is the tasks PR's merge plus the standalone T1-(B) ballot's merge (erratum 2026-09-26). *Residual: the grant's audit is post-merge (claims passes), so an out-of-list edit is caught as a finding, not prevented.*
7. **The operator cannot physically drive every harness session** (Leonardo C3). `session-launched-by` makes whose hands were involved auditable, but it cannot make the run hands-free.

---

## What this plan deliberately does not contain

- **The claims passes themselves**:
  - MIDPOINT (`.kiro/specs/123-consumer-distribution/completion/claims-pass-midpoint.md`);
  - four RELEASE passes;
  - CLOSEOUT (`.kiro/specs/123-consumer-distribution/completion/claims-pass.md`).

  These are post-acceptance audits, never tasks or gates.
- **The G1/G2 verdict records' content** — Stacy's audit artifacts. The gate parents cite them.
- **Any arming of `completion-criteria-parity`**; **path (A) canonicalization**; **native component distribution** (chartered at Task 3.5).

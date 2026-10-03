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
   - **Tripwire**: U2b reads `declared 31, now 34`, within +4.
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
| **U1 — Distribution substrate & packaging truth** | `u1-substrate` · `task/123-u1-substrate` | 1–9 | **9** | `U1 substrate & packaging truth (123)` | RELEASE (release 1) *(Amendment 2026-10-02: no release is cut after U1 — release 1 ships with release 2, as one tag after U2b; § "Expected release count")* |
| **U2a — Consumer generation profile: splitter, exemplars & G1** | `u2a-g1` · `task/123-u2a-g1` | 10–12 | **12 (G1 gate parent)** | `U2a consumer generation profile: splitter, exemplars & G1 (123)` | — (**no release**; its content rides release 2 — F1 RULED, Peter 2026-09-27) |
| **U2b — Consumer generation profile: machinery, rendering & G2** | `u2b-profile` · `task/123-u2b-profile` | 13–18 | **18 (G2 gate parent)** | `U2b consumer generation profile: machinery, rendering & G2 (123)` | **MIDPOINT (declared carrier)** + **ARMING** + RELEASE (release 2) *(Amendment 2026-10-02: this is the combined release, planned releases 1 and 2 as one MAJOR, 15.0.0; MIDPOINT and ARMING unchanged)* |
| **U3 — Onboarding** | `u3-onboarding` · `task/123-u3-onboarding` | 19–22 | **22** | `U3 onboarding (123)` | RELEASE (release 3) |
| **U3g — G2 cycle 2: the corrected derivation check on the shipped profile** *(amendment 2026-10-03 — Peter's PR-5.2: the recommendation he agreed to ("I agree with all the recommendations") that the fix runs as its own unit beside U3; runs in parallel with U3, see "How the units run")* | `u3g-g2c2` · `task/123-u3g-g2c2` | 29–30 | **30 (G2 cycle-2 gate parent)** | `U3g G2 cycle 2: the corrected derivation check on the shipped profile (123)` | **ARMING** (a check newly applied on every PR touching its inputs, criterion 29 C6) · rides **RELEASE (release 3)** |
| **U3c — Consumer-profile corrections** *(amendment 2026-10-03, R2 — Peter's PR-11, `Re: 1, agree with "before"`, and PR-12; runs beside U3 and merges before U3g is cut, see "How the units run")* | `u3c-profile-corrections` · `task/123-u3c-profile-corrections` | 31 | **31** | `U3c consumer-profile corrections (123)` | rides **RELEASE (release 3)**; its signing PR is in that release's signing-act walk |
| **U4 — Content policy** | `u4-content` · `task/123-u4-content` | 23–24 | **24** | `U4 content policy (123)` | — (rides release 4) |
| **U5 — Validation & closeout** | `u5-closeout` · `task/123-u5-closeout` | 25–28 | **28** | `U5 validation & closeout (123)` | RELEASE (release 4) + **CLOSEOUT** |

**How the units run**:
- Order is unconditional: U1 → U2a → U2b → U3 → U4 → U5 (Req 26.3's U1 → U2 → U3 → U4 → U5, with the U2 stage declared as two merge units in order — amendment 2026-09-27).
- One branch per unit, each branched from `main` after the prior unit merges. **U2b's branch is cut only after U2a merges — no stacking** (F7 RULED, Peter 2026-09-27: strict wait; the `Stacked-on:` exception is not pre-authorized for U2b).
- *(Amendment 2026-10-03 — U3g, Peter's PR-5 (recorded in this round's feedback, `feedback/tasks.md` § "U3 amendment round (2026-10-03)"):)* **U3g runs BESIDE U3, not in the U1 → U5 chain.**
  - It is neither U3's predecessor nor its successor, so **Limb 2 of the split tripwire does not apply between U3 and U3g**, in either direction.
  - It branches from `main` after Thurgood's G2 spec-text ruling (its own PR, not this amendment) merges.
  - It merges to `main` **before** Task 22.5 opens U3's PR (Task 22, criterion "G2 backstop").
  - U3 merges `main` after U3g lands and before Task 22.4 (Stacy's condition (c)).
  - Its coupling to U3 is exactly those two lines, plus U3's no-overlap test (Task 22).
  - U4's branch is still cut only after U3 merges.
  - *(R2, Lina A-3)* **The critical path**: absent Peter's dated re-ruling (Task 22, "G2 backstop"), **U3 cannot complete before U3g merges**, so U3g is release 3's long pole. U3g's branch is cut the day the ruling's PR merges.
  - *(R3, Lina A2-1)* **U3c is on release 3's critical path, ahead of U3g's cut.** Thurgood's ruling PR and U3c can run in parallel; U3c starts the day this amendment merges.
  - *(R2 — **PR-11 RULED** (FK-5), Peter, 2026-10-03, verbatim: `Re: 1, agree with "before"`.)* **U3c** (Task 31), the consumer-profile corrections, is its own unit and PR. It runs beside U3 and **merges to `main` before U3g's branch is cut**, so U3g starts from a `main` that already carries it. U3g's branch is cut only after **both** Thurgood's ruling PR and U3c have merged. Like U3g, U3c is outside the U1 → U5 chain, so Limb 2 does not apply between it and U3 or U3g.
- The gating parent's completion opens the unit PR; every other parent commits its docs on the branch.
- Peter merges each unit. Agents never merge.
- **Governance carve-out (Peter-merged, record-first)**: U1 (B-U1; the Integration Guide line fixes), U2a (`canonical/**` — Task 11's exemplar records and confirmations; no ballot, since no rendered text changes), U2b (B-U2; `canonical/**`), U3 (`governance/DesignerPunk-Integration-Guide.md` — Task 19.4), U4 (B-U4; banners). *(Amendment 2026-10-03: U3 carries **B-U3**, a light record-first ballot inside 19.4 (Peter's PR-2). U3g carries `canonical/**`, with no ballot: its rendered changes are attribution sidecars. *(R2: **U3c** carries `canonical/**`, `.claude/agents/**` and `.kiro/agents/**` (regenerated agent prompts and configs), with no ballot: its text changes are profile corrections under PR-11 and PR-12, not law.)*)*
- The PR body carries `Spec:`, `Unit:`, `Task:`, `Agent:`, the completion-doc paths, the validation note, and **the tripwire line**.

**MIDPOINT — carrier U2b** *(amendment 2026-09-27: was U2; moved with the split — the event is Stacy's, confirmed by Stacy, feedback/tasks.md [STACY R3], 2026-09-27, with conditions S3-1–S3-3)*.
- **Why U2b**: condition (1) can only be met there (first render is Task 15), and condition (2) needs both gates' branches, the second of which (G2) executes at Task 18. With six declared units, U2b's merge is also the literal midpoint (the third of six).
- **Scope after the split**: the pass covers **every parent merged so far, never narrower** (Stacy R3 condition S3-1) — Tasks 10–18 across both PRs (U2a and U2b), each named by number and squash SHA, **plus every U1 parent (1–9) not already covered by a committed release-1 RELEASE record** (release 1 is not yet tagged — newest tag `v14.1.0` — so absent such a record by U2b's merge, U1's parents are in scope here too; if release 1 tags first, its record carries U1, and U2a as well if the tag postdates U2a's merge, and the scope line cites that record instead of re-auditing). **The scope line also lists, as its own population item, the B-CI § 5 clause 7 extent check run on PR-1** (`#218`) (Stacy R3 condition S3-2). *Residual: G1's branch execution is audited one unit after it merged; U2b builds on it unaudited. Surviving residual (Stacy R3): a false ✅ in U2a's own completion docs can sit on `main` for one unit, with U2b cut on top of it — e.g. a green `npm test`/`tsc` that was not green, or the pack-intersection run against the wrong base.*
- **Fork M-1 (Peter's, RULED — (A)+conditional, 2026-09-27)**: whether a scoped read of Task 12's evidence happens at U2a's merge, before this MIDPOINT pass reaches it at U2b's merge. **(A)** No U2a-merge read — the residual above stands as the plan's cost (Stacy's lean). **(B)** A scoped, post-acceptance read of Task 12's evidence only, recorded at a path that is neither `claims-pass.md` nor `claims-pass-midpoint.md`, and never a gate on the U2b cut. *Counter to (A): U2b is 31 subtasks built on U2a. Counter to (B): it adds an event the ratified trigger set does not have, and duplicates evidence Peter already reads at the U2a merge.* **(fork M-1 — RULED (A)+conditional, Peter 2026-09-27)**: **(A) by default, with a signal-based conditional.** No claims read fires at U2a's merge when G1 HOLDS on its first run (`G1 runs: 1`). **If G1 required more than one run** (`G1 runs: k`, k > 1 — a BREAKS followed by C3 rework, or branch A), Stacy performs a **scoped read of Task 12's evidence, plus any Task 10 or Task 11 criterion row whose cited artifact a C3 rework commit modified — the set is `git diff --name-only <commit adding re-grounding-c3-falsification-run-1.md>..refs/pull/<U2a>/head` ∩ Tasks 10–11 Primary Artifacts; if that set is empty, Task 12 only. A hit on an exemplar Stacy constructed or confirmed is read with that disclosure.**, after U2a's acceptance: it never gates the U2b cut, and it is recorded at `.kiro/specs/123-consumer-distribution/completion/u2a-task-12-scoped-read.md` (neither `claims-pass.md` nor `claims-pass-midpoint.md`). **Why the trigger is rework**: a rework loop under gate pressure is where completion claims drift; a clean first-run HOLDS leaves the residual small (Stacy issues the G1 verdict herself, is a participant in Task 11, and the orchestrator independently verified Task 10 at acceptance — parity 9/9, tests, CI runs, byte-identical rendered text, shipped-file intersection). **Not a new standing event**: a one-shot, spec-local post-unit obligation ruled under fork M-1. It mitigates the MIDPOINT residual; it is not a MIDPOINT pass and not a trigger-table row. `k` is counted from the kept per-run records (the PR-body `G1 runs: <k>` carries it). The record carries the claims-pass template's Scope / Findings (two-route routing) / Method (sample and fraction) sections and the mandatory `Standards implications:` line. The MIDPOINT scope line cites it and is never narrowed by it. Not a precedent: a second spec adopting a between-events conditional read goes to ballot as a trigger-table amendment.
- **Record path pinned: `.kiro/specs/123-consumer-distribution/completion/claims-pass-midpoint.md`, NEVER `.kiro/specs/123-consumer-distribution/completion/claims-pass.md`.**
- **Stacy's two conditions**:
  - **(1)** U2b's merge is the **first-render release**. Per-signer assent rates **and refusals issued** are recorded as ***"first render — not a baseline"***; the C2 `no-consumer-counterpart` rate is recorded in the same block, marked `baseline (Req 11.5.3)`. *(Erratum 2026-09-28 — ballot 2026-09-28-123-b-u2 F-1 (a), ruled by Peter)* **The first-render marking applies to BOTH U2b-merge records** (MIDPOINT and the release-2 RELEASE record).
  - **(2)** The pass audits that **each G1/G2 branch was executed and evidenced by the executing agent** (Tasks 12 and 18's primary agents — § "Gate seat layout"), **never the verdict content**. **Disclosure (Stacy R2)**: Lina authored the machinery pass four tests (C13–C15), so the pass **checks that Task 18's applied edit is byte-equal to its pre-declared text and confined to the domains the verdict names.**
- Two records, each with its own scope line, never merged. **Within 123 no C2 / assent / refusal reading is a detection**; each metric's detection begins at the first population after its own baseline, never inside 123 (Stacy R1 (c); ballot 2026-09-28-123-b-u2 F-1). *(Erratum 2026-09-28 — ballot 2026-09-28-123-b-u2 F-1 (a), ruled by Peter)*
- Findings route to owning agents as explicit messages.

**CLOSEOUT** fires at U5's merge → **`.kiro/specs/123-consumer-distribution/completion/claims-pass.md`** (Stacy).

### Gate seat layout (Stacy R1 S-T1 — each gate is TWO artifacts in TWO seats)

| Gate | Verdict record — **Stacy**, an audit artifact outside any delegated-tier line | Gate parent — the **executing agent**: completion doc, branch execution, validation, PR |
|---|---|---|
| **G1** (U2 step 4; **U2a's gate**) | `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification.md` (current verdict) + `…/re-grounding-c3-falsification-run-<n>.md` (every run, kept) | **Task 12 — Thurgood (Opus)**: owner of C3, so he executes the rework loop and invokes branch A. **His completion doc cites the record path and never paraphrases the verdict** (11.8.4). He runs U2a's full validation and opens the U2a PR — **only on a HOLDS or branch-A record** (Task 12). |
| **G2** (U2 step 8; U2's acceptance; **U2b's gate**) | `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` | **Task 18 — Lina (Opus)**: U2's machinery owner and a seat **not recused from anything**. She applies the verdict's artifact edit, runs U2b's full validation and opens the U2b PR. **Thurgood (the recused profile author) authors no line of Task 18's completion doc.** *(Chosen over Thurgood under 11.8.4, so the acceptance claim never sits with the recused seat — no reader can take the recusal as partial.)* |

### Expected release count — **FOUR** (Req 26.3; Stacy R1 (c) confirmed keep-four)

*(**Amendment 2026-10-02 — the count is now THREE.** Peter's ruling, 2026-10-02, verbatim: **"Confirmed, ship them together."** Planned releases 1 and 2 ship as **one release, one MAJOR (15.0.0), tagged after U2b merges**. Releases 3 and 4 are unchanged. Everything below this block is the original declaration, kept as the record of what the tasks round promised; where it says FOUR or six, this block governs.*

*Why, in one paragraph (the consult is the orchestrator's, relayed 2026-10-02): a separate release 1 would be the third published version to ship `.kiro/steering/` (including the personal note), since `files[]` still lists it until Task 16.3's removal in U2b; it would also publish an intermediate state, `init` still copying agents, that the next release migrates, and so create a release-1 cohort that exists only because of the split; and T2 (B) records zero known stranger consumers, so the value of releasing between U1 and U2b is small. What survives against it: release 1 was a coherent substrate release and a rollback seam; one MAJOR now carries the breaking `init`/`sync` changes and the first-render machinery together.)*

| Release | After | Why it ships | Expected semver |
|---|---|---|---|
| **1 (combined: the planned entries "Release 1" and "Release 2")** | **U2b, carrying U1 and U2a** | union, fail-loud postures, packaging diet, `sync` repairs, publish-rail guard; consumer agent layer (D-live-2 repair), `attach`; **CHANGELOG starts here** | **MAJOR — 15.0.0** (Ada) |
| 3 | U3 | install doc, commit policy, starter specs, init UX | minor |
| 4 | U5 carrying U4 | banners, closeout corrections | minor |

*(**The label rule, stated once.** "Release N" remains the label of the Nth planned CHANGELOG entry, never a count of tags. The combined release is the planned releases 1 and 2, so nothing that names a release by number is renumbered: Task 18's "release-2 CHANGELOG entry", Task 19's "before release 3", Tasks 22 and 28's "release 3" and "release 4", the T2 ruling's "releases 1–2", and the CHANGELOG's own `[Unreleased]` headings keep their words. The two `[Unreleased]` entries are merged under one version heading at release-prep, with the release-1 entry's "Retained for now" paragraph rewritten, which is release-prep's work and not this amendment's.)*

*(**Cost, restated**: RELEASE fires at the tag, before publish, once for the combined tag, once at release 3, once at release 4: **three RELEASE passes**, plus MIDPOINT and CLOSEOUT, **= five claims passes**; the one RELEASE pass at the combined tag reads both U1's and U2's declared scope.)*

*(**Conditions, by pointer, not restated**: Stacy's R-T1, R-T2 and R-T3 (R-T3 is this amendment itself: it lands before the tag, so her RELEASE pass reads the declared plan as what was promised; R-T1 and R-T2 are release-prep's); Ada's publish conditions for 15.0.0; and one open question, **pre-123 manifests that carry no `origin` field and the one-hop upgrade from `14.1.0` to the combined release**, routed to Ada and Lina at release-prep (Ada found the same gap independently and asked for a tarball rehearsal). These were relayed by the orchestrator on 2026-10-02; no standalone record of them is cited here because none is committed at this writing.)*

*(**What this amendment does not touch**: no criterion row of any parent, no gate row (Task 18 is untouched; Lina, its row owner, concurred in the consult), the split tripwire, or `requirements.md`. Req 26.3 fixes only that the count be named at the tasks round and states "up to four", so THREE needs no requirements edit. The pre-existing line at `requirements.md` L391, "123's U2 is release 1", which disagreed with this file, now reads true; it is not edited.)*

| Release | After | Why it ships | Expected semver |
|---|---|---|---|
| 1 | U1 | union, fail-loud postures, packaging diet, `sync` repairs, publish-rail guard; **CHANGELOG starts here** | **MAJOR** (Ada D-T-A6: legitimately breaking — `src/` narrowed, config dropped, fail-loud, `sync` stops refreshing tokens) |
| 2 | U2b (carrying U2a) | consumer agent layer (D-live-2 repair), `attach` | minor, or major per the recipe |
| 3 | U3 | install doc, commit policy, starter specs, init UX | minor |
| 4 | U5 carrying U4 | banners, closeout corrections | minor |

- **Cost**: four RELEASE passes (each with the owed-set paste and the rail log), plus MIDPOINT and CLOSEOUT, **= six claims passes**. *(Amendment 2026-10-02: three RELEASE passes, plus MIDPOINT and CLOSEOUT, **= five claims passes**.)*
- RELEASE fires at the release tag, before publish. *(Annotation 2026-10-03, ballot `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md` § 3.4, RATIFIED Peter 2026-10-03. This discharges owed act 2 of `.kiro/issues/2026-10-02-release-audit-two-phase-clarification.md`. **RELEASE runs in two phases, recorded in one file.** Phase 1 runs on the release squash S, after the 5.1 dry run is green and before the tag. Phase 2 runs at the merge of the step-6 release-record PR and reads the rail result and the 6b two-registry record. Phase 2 may be drafted against that PR while it is open, and then ends with the merge-confirmation line. See `.kiro/hooks/RELEASE-FLOW.md` § "The sequence" step 6.)*
- Release 1 is a coherent **substrate** release. **Release 3 is the first release a stranger should be pointed at** (Leonardo A5). **Under T2 (B), the README and install doc do not advertise onboarding before release 3.**
  - *(Amendment 2026-10-03 — release 3's claim narrowed. Peter's PR-3: "I *think* we said we'd say it's ready for building web only and then finish the iOS and Android work as a fast follow." This matches his 2026-10-02 "middle path" ruling in `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` § "Consequence recorded now".)*
    - **Release 3 is the first release a stranger should be pointed at for web products, with the agent layer for Claude Code and Kiro.**
    - **The scope sentence** (wording settled in this round; owners Leonardo and Ada) carries three things:
      - (i) web products, with the agent layer for Claude Code and Kiro;
      - (ii) iOS and Android are not supported yet: their components ship as reference source, not a build input (Ada's caveat 1);
      - (iii) on web, a theme the consumer registers does not yet emit (Ada's caveat 2).
    - *(R2 — Leonardo R1, merging Ada's three parts; Ada A-1 accepts any merge that keeps them and the exact substring.)* **The asserted string**, identical on all three surfaces:
      > This release is ready for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input, so don't start a native product on this release. On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output yet; light and dark mode work.
      - It contains **both label substrings verbatim** (`reference source, not a build input`; `Native onboarding is not supported`), so it doubles as both label strings on the README.
      - **Owed before 19.1 commits it**: Ada's fact-check of the third sentence (Leonardo's `[@ADA]`; source `docs/releases/release-15.0.0.md` L128). A correction from her changes only that sentence; the substrings stay.
    - The sentence **opens the install region (its first paragraph)**, before § Prerequisites and before step 1 (Leonardo L-RC5), and the same string appears on three surfaces: the install doc, the README and the release-3 CHANGELOG entry (Tasks 19 and 22).
    - **iOS and Android follow** as the completeness spec, Spec 129: its design-outline stub with carried notes is `.kiro/specs/129-consumer-generation-completeness/design-outline.md` (#295, `e25fd512`).
    - The T2 (B) sentence above is overtaken on `main`: README § "Getting Started" has advertised `init` since `a6481d71` (2026-05-15), and #271 narrowed it. Task 19 reconciles the README to the scope sentence; it does not remove the section.
  - *(Amendment 2026-10-03 — **the G2 hold**. Peter's PR-5.3: the recommendation he agreed to ("I agree with all the recommendations"), "nothing that carries the consumer profile is tagged or published until a HOLDS verdict, or Peter lifts it by a dated record.")*
    - **Every `@3fn/core` version carries the consumer profile** (`dist/consumer-canonical/**` is in `files[]`). So, until U3g's cycle-2 verdict reads `HOLDS` (Task 30) or Peter commits a dated record lifting the hold, **no version is tagged or published**. That covers **any version: 15.0.x, 15.1.0 and release 3** (R2, Stacy R-17).
    - **A written-down limit does not substitute for a fix**: the recommendation Peter agreed to, "fix and hold; never ship with a written-down limit" (his words: "Yes, and good idea.").
    - **Enforcement** *(R2, Stacy B1. This replaces "Peter, at the tag and at publish", which `.kiro/hooks/RELEASE-FLOW.md` L140 forbids: "Guards live in the command the operator runs, never in a list addressed to a seat (RS-7)")*: **a guard where the operator meets it.**
      - Until a script check lands, a line in RELEASE-FLOW step 5, before 5.2's tag, refuses the tag and the publish unless, **at S**, Stacy's cycle-2 verdict record reads `**Verdict**: HOLDS`, or Peter's dated lift record exists at `.kiro/issues/2026-10-02-g2-pass-four-findings.md` § "Hold lifted" (or that file's `archive/` path).
      - It lands **before any publish of any version**, independent of U3's cut.
      - **⟨RESOLVED in R4 — was PENDING PETER — the vehicle for the RELEASE-FLOW line.⟩** The line is drafted in `feedback/tasks.md` § "U3 amendment round (2026-10-03)", `[THURGOOD R2]`. It is not part of this amendment, and no U3 or U3g row grants it. *(R4 — **PR-15 RULED**, Peter, 2026-10-03: "Re: 3, agree". The vehicle is Thurgood's record-first amendment to `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md` (Thurgood drafts, Stacy reviews, Peter ratifies and merges), then Ada's check in `scripts/release-publish.ts` under its grant. **No version is published from 2026-10-03 until that amendment lands.** Stacy's A-7 item in `.kiro/issues/2026-10-03-hermetic-publish-path-follow-ups.md` is that PR's first commit.)*
      - The script form (`scripts/release-publish.ts`, Ada, under an issue-row grant) may replace it. The line retires once `HOLDS` is on `main`. *(R3, Ada C-1: the script refuses the dry run and the publish; it cannot refuse a tag push, which only a server-side tag rule can. R2's "Ada's script check closes that gap" reads "closes the publish half of that gap".)*
      - *(R3)* **The hold's layers, each with its owner and state:**
        · (1) **the RELEASE-FLOW step-5 line**: a record-first amendment to the hermetic-publish ballot (Thurgood drafts; Stacy reviews; Peter ratifies and merges). **⟨RESOLVED in R4 — was PENDING PETER (c): the vehicle, and whether "no publishing" is in force from now.⟩** *(R4: (c) RULED, PR-15, above.)*
        · (2) **the script check** in `scripts/release-publish.ts`: Ada, under an issue-row grant with `**Grant paths**: scripts/release-publish.ts, scripts/__tests__/release-publish.test.ts` (it can ride her release-prep issue). Its bite: a clone at S with neither record → refusal. The `hermetic-publish-path` register row's `checks` text changes only in the ballot amendment, not under the grant.
        · (3) **optionally, a GitHub tag ruleset on `v*`**: Peter's repo-settings act, the only layer that refuses a stray tag push. **⟨RESOLVED in R4 — was PENDING PETER (d): not ruled.⟩** *(R4 — **PR-16: DECLINED**, Peter, 2026-10-03: "Re: Github, as you recommend." — the orchestrator recommended leaving it out. **Residual, stated (Ada)**: a tag pushed outside the procedure is not blocked by anything; layers (1) and (2) stop only an operator who runs step 5 or the script, and 6b detects a stray publish only after it.)*
      - *(R3, Stacy C-1, C-2)* **What the line reads**: the **highest-numbered** `completion/re-grounding-g2-cycle-<n>.md` present at S (cycle 2, or cycle 3 if it ran), whose verdict token is `HOLDS`, **and** the standing test file `tools/agent-generator/__tests__/derivation.shipped-profile.test.ts` exists at S; or the lift record. The verdict record reaches `main` only through U3g's squash (Task 30).
      - No claims pass holds or gates anything.
  - *(Amendment 2026-10-03 — **what release 3's RELEASE pass needs, planned now** (Stacy's U3-kickoff read § 6). None of these is a U3 row. Each has its owner and home, and each is due before release 3's phase 1 unless it says otherwise.)*
    - **All nine J divergents** (`completion/claims-pass-release-15.0.0.md` L273–283), **divergent 7 (J-6CD4) included**: each is closed by a resolution act or carried by name.
      - Resolution acts need Thurgood's RS-1 erratum to the signing-act ballot (owner Thurgood, not drafted). *(R2, Stacy)* **It is also due before U3c's or U3g's re-sign round if any divergent is to *close* there**; until it lands, a re-sign is a new act, not a closed divergent.
      - *(R2)* **Divergent 5** (the "for your themed values" qualifier, Data's own wording; he resolves it at the round on the text then in front of him) is in the profile corrections batch, U3c (Task 31; PR-11). **Divergents 6, 8 and 9** are subtraction-3 `cites` corrections (Kenya's row 3 carries 6 and 9; Data's trims row carries 8). A `cites` edit moves no hash: a removal's `cites` is in neither `canonicalHash` nor `renderedHash` (`tools/agent-generator/regrounding/freshness.ts` L363–369, read, not run). So they are **declared, granted and counted outside the re-sign round**, never folded into it.
      - *(R2)* **Divergent 7** (`#with-peter`, `human-4`): the profile author (Thurgood) proposes **no text change**, following its signer's read (Kenya R1 § C). No row moves and no act is owed. It is **carried by name at release 3**, and the disputed sentence of Kenya's sheet ("credited by entailment") is closed under RS-1. "Its owner" names both the profile author, who proposes or declines a text change, and the signer.
    - **Trigger (d)** (`.kiro/issues/2026-10-03-stacy-signed-sample-trigger-d.md`): **PR-10 RULED, the hybrid (option 1+2)**. Peter: "Re: walkthrough 2, hybrid".
      - A rotating non-Stacy, non-Thurgood seat runs the mechanical `--audit` under a written rule.
      - Peter keeps the blind re-judgment on at least one Stacy-signed act per release, recorded separately.
      - **Owed before release 3's RELEASE pass**: the pick recorded in the issue by its owner, and a § 5.3 amendment to the signing-act ballot, drafted by Thurgood and ratified by Peter. **Neither is part of this amendment.**
    - **The hermetic-publish law**: the first run under `.kiro/docs/ballots/2026-10-03-hermetic-publish-path.md`, and its F-4 arming event, is **release 3, or a patch that precedes it** (R2, Stacy R-17). Follow-up items 4 and 6 (`.kiro/issues/2026-10-03-hermetic-publish-path-follow-ups.md`, Thurgood) land before that publish.
    - **Ada's four publish-path rows** (script floor, the 10d nested-roots hint, `floor-closure.json` regeneration, `--expect-sha` required), plus the `check:drift` `@<scope>:registry` class fix (*R2, Ada RC-4*: register owner **Thurgood**, `governance/classification-map.md` § "package-name-scope-drift"; Ada proposes the pattern) and the section-10e machine-path scan widening (Ada).
      - These land in one release-prep PR **after U3 merges**, so that they do not overlap U3's `scripts/pack-assert.ts` edits, and after 19.4 and O-1 land.
      - *(R2, Ada RC-5)* **Record: MISSING → Ada**: an issue carrying the four rows and `**Grant paths**: scripts/pack-assert.ts, scripts/release-publish.ts, scripts/__tests__/{pack-assert,release-publish}.test.ts` (plus `scripts/check-package-name-drift.js` and its tests, for Thurgood's class fix), filed before release-prep.
    - **U3g's verdict record**, the consequence applied byte-equal, and the release-3 CHANGELOG's treatment of 15.0.0's G2 limit disclosures, matched to the verdict.
    - *(R2, Stacy R1 § "Release 3")* **Also carried into the pass:**
      - (i) **the hold's state as a phase-1 read**: at S, the cycle-2 verdict reads `HOLDS`, or the lift record is present (Stacy reads it);
      - (ii) **the RELEASE-FLOW hold line** (Stacy B1, above) is on `main` at S;
      - (iii) **#268's ballot header** reads RATIFIED (Ada RC-6; Task 19);
      - (iv) **the one-hop rehearsal residuals** (Lina RC-10, below);
      - (v) **U3g's ARMING record**, committed before the pass.
    - **Open routings and fixes:**
      - the MP-1…MP-7 routing record (orchestrator);
      - the RS-3 owed-set ladder fork (Thurgood, Peter);
      - the RS-1/2/4 signing-act errata (Thurgood);
      - the app-MCP `degraded` issue: **Lina; fix before the release-3 tag** (R2: Lina adopts Leonardo's ask as her deadline). The issue is filed in her pre-cut `chore/` PR, and the fix is a `fix/` PR under her charter scope, with its lock refresh granted by a `**Grant paths**: canonical/generated.lock` line in that issue;
      - O-1 (`governance/Process-Cross-Reference-Standards.md:501`, Thurgood);
      - *(R2, Lina RC-10)* **the one-hop rehearsal residuals** (Lina, `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`): **R1 and R5 move to Spec 129** by a dated line in the issue; **R2, R4 and R6** land in Lina's own `fix/` PR under an issue-row grant (`src/cli/sync/{Migration,Reporter,index}.ts` + tests), **before the release-3 tag**. That PR and 20.2 both touch `src/cli/sync/index.ts`: whichever merges second merges `main` first. (R3 rides 22.1.)
    - **The signing-act walk** of every signing PR in the release delta, U3g's included.
- *Residual: four dual-registry publishes (the accepted dual-publish tax, 26.6). Hotfixes would add RELEASE passes.* *(Amendment 2026-10-02: three dual-registry publishes, not four.)*
- **U2a cuts no release — the count stays FOUR** *(amendment 2026-09-27; F1 RULED, Peter 2026-09-27 — the proposal stands)*. U2a changes **no shipped file**: Tasks 10–12 touch `tools/agent-generator/**`, `canonical/**` and spec records, none of which is in `files[]` or compiles into `dist/`, and Task 10 expects the rendered agent text (shipped under `.kiro/agents/`) to stay unchanged (its diff-guard criterion). Task 12 checks this at U2a's merge; **if the check finds a shipped path, the release decision returns to Peter before U2a merges.** A release with no consumer delta would cost a RELEASE pass and a dual publish for nothing. *Residual: `main` carries U2a's merged-but-unreleased content for one unit's length; a hotfix cut in that window would carry it (harmless under the same check), and release 1, if tagged after U2a merges, would too.* *(Correction, 2026-09-27: the "none of which is in `files[]`" assumption was wrong for the eight `.kiro/agents/*.attribution.json` sidecars — Task 10 regenerates them by criterion, and they ARE in `files[]` via the `.kiro/agents/` entry. The release decision returned to Peter ahead of Task 12, per this section's own rule, and he **ruled F1 stands**: the sidecars are metadata-only, the rendered agent text they describe is unchanged, and no consumer reader exists for them. Task 12 cites the eight paths and this ruling as its disposition. Cleanup filed at `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`.)* *(Amendment 2026-10-02: "the count stays FOUR" is superseded by the combined release below. The bullet's own reasoning is unchanged: U2a changes no shipped file. Its sentence "release 1, if tagged after U2a merges, would [carry U2a's content] too" now reads: the combined release is tagged after U2b merges, and carries U1, U2a and U2b.)*

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
| U3g *(added 2026-10-03; beside U3)* | 12 *(R2: **11** — PR-11 moved 29.5 to U3c)* | **+3** |
| U3c *(added 2026-10-03, R2; beside U3, before U3g)* | **6** | **+2** |
| U4 | 6 | **+2** |
| U5 | 18 | **+3** |

*Thresholds are ~10% rounded up, with a floor of +2 and small-unit allowance of +3. **Totals at the round's close: 28 parents, 126 subtasks.***

*(Amendment 2026-09-27: 9.0 adds one U1 subtask by Peter's ruling. The declared counts above stay frozen at the round's close, as Limb 1 requires; U1's tripwire line therefore reads `declared 44, now 45; parents unchanged`, within +4. **Totals now: 28 parents, 127 subtasks.**)*

*(Amendment 2026-09-27, the U2 split: **U2's frozen 42 is partitioned, not recounted** — U2a (Tasks 10–12) = 5 + 4 + 2 = **11**; U2b (Tasks 13–18) = 8 + 5 + 5 + 6 + 3 + 4 = **31**; the sum is conserved, so no threshold is named after the growth it measures. Thresholds: U2b's +4 is the ~10% rule (3.1, rounded up); U2a's +3 applies the small-unit allowance rather than the +2 floor, because the split itself adds **12.3** (U2a's full validation and PR opening, which Task 18.3 did for the whole of U2), so U2a's line reads `declared 11, now 12`. Limb 2 now reads across the new successor pairs U1 → U2a and U2a → U2b. **Totals now: 28 parents, 128 subtasks.**)*

*(Amendment 2026-09-27, F3 conditions: **11.5 added** (Stacy's F3 step, B-CI ballot § 11 `[STACY R1]` § 6 condition (c), `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md`). U2a's line now reads `declared 11, now 13`, within +3. **Totals now: 28 parents, 129 subtasks.**)*

*(Amendment 2026-09-27, the U2b cut: **13.0 added** (the third F unit's C1 confirmation). U2b's line reads `declared 31, now 32`, within +4. **Totals now: 28 parents, 130 subtasks.**)*

*(Amendment 2026-09-28, B-U2 F-2: **17.4 added** (the standing parity test). U2b's line reads `declared 31, now 33`, within +4. **Totals now: 28 parents, 131 subtasks.**)*

*(Amendment 2026-09-28, sequencing correction: **15.0 added** (the consumer-profile/adapter slice Task 14 depends on). U2b's line reads `declared 31, now 34`, within +4. **Totals now: 28 parents, 132 subtasks.**)*

*(Amendment 2026-10-03, the U3 cut.)*
- **U3 grows by two subtasks:**
  - **22.0**, the personal-note template and example (Peter's PR-4: "one added subtask (22.0)");
  - **the packaging subtask**, **22.3b** (FK-2 (a), settled between owners in the round: Ada, Lina, Thurgood; there is no 19.0).
- **Folded, with no count change**:
  - B-U3, as 19.4's first commit;
  - C19's callers, R3 and the 16.6 flips, into 22.1;
  - the 119-B lint, into 19.2;
  - the #268 preservation table and the remainder sweep, into 19.4.
- **U3's line reads `declared 16, now 18`, within +3.** The threshold is **not re-baselined**.
- **Peter's read of this tripwire, 2026-10-03**: "Re: unit size, keep it as one unit" (PR-7). He rules on the record that it stays one unit at 18. *(R2, Stacy: the gloss "the work belongs together" was the author's, not Peter's, and is struck.)*
- **Residual, stated**: one slot is left before the threshold fires (above 19). A finding in this round that adds a U3 subtask uses it.
- *(R2)* **The round added no U3 subtask**: every R1 change folds into an existing subtask, and Leonardo's `generate` warning, if Peter adopts it, folds into 22.1. **U3 stays `declared 16, now 18`; one slot remains.**

*(Amendment 2026-10-03, **U3g added** (Peter's PR-5; a new unit, not growth of U3, so Limb 1 does not fire for U3):)*
- **Declared: 12 subtasks** (29.0–29.7, 30.0–30.3), or **11** if FK-5 (b) removes 29.5. **Threshold +3** (the small-unit allowance).
- This adds two parents to the plan, by Peter's ruling. **Totals now: 30 parents, 146 subtasks** (or 145 under FK-5 (b)): 132 + 2 (U3) + 12 (U3g).

*(Amendment 2026-10-03, R2 — **PR-11 and PR-12 RULED**; **U3c added**, a new unit, so Limb 1 fires for neither U3 nor U3g:)*
- **U3g declares 11**: 29.0–29.4, 29.6, 29.7, 30.0–30.3 (29.5 left with PR-11; the numbers are kept). **Threshold +3.** Its ceiling is unchanged except limb (iii), which no longer carves out FK-5's re-signs: U3c's re-signs belong to U3c.
- **U3c declares 6**: 31.0–31.5. **Threshold +2** (the floor). PR-12's two theming units ride it and add no subtask.
- **U3 is unchanged at `declared 16, now 18`**: PR-13 (the unignored-directory warning) folds into 22.1. One slot remains.
- **Totals now: 31 parents, 151 subtasks**: 132 + 2 (U3) + 11 (U3g) + 6 (U3c).

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
| 15 | Thurgood (Opus) | Lina (Opus) — `derive.ts` (15.2) *(15.0 Thurgood (Opus) — added 2026-09-28)* |
| 16 | Lina (Opus) — 16.1, 16.5 | Lina (Sonnet) — 16.2, 16.3, 16.4, 16.6; Ada (Sonnet) consulted on 16.3's pack script |
| 17 | Lina (Sonnet) *(17.4 Lina (Sonnet) — added 2026-09-28)* | Thurgood (Sonnet) — 17.3 (applies L686 under B-U2) |
| 18 | **Lina (Opus)** — G2 gate parent · U2b gating parent | — (Stacy's verdict record is outside the line) |
| 19 | Thurgood (Opus) | — (Leonardo reviews on-branch) *(amendment 2026-10-03: no secondary — FK-2 settled (a) in the round, so there is no 19.0; U3's packaging is 22.3b under Task 22)* |
| 20 | Lina (Sonnet) | — |
| 21 | Thurgood (Opus) | — *(amendment 2026-10-03: Lina (Sonnet) — 21.3, the `init.ts` scaffolding and collision reporting; the structure test stays Thurgood's, in 21.1/21.2)* |
| 22 | Lina (Sonnet) | Leonardo (Opus) — authors `example-home.yaml` at `.kiro/specs/123-consumer-distribution/design-inputs/` (Lina places it, 22.3) + DD9 confirmation (22.5) *(amendment 2026-10-03: Leonardo (Opus) — 22.0, the personal-note template and the edited example note in `design-inputs/` (Lina places them); and the content of every file `example-home.yaml` references (22.3). Ada (Sonnet) — 22.3b, every U3 `files[]` line and `pack-assert` row and the `src/cli/templates/**` exact set (FK-2 (a), settled in the round))* |
| 29 *(added 2026-10-03, U3g)* | **Lina (Opus)** — the corrected check's machinery and its standing application | — *(R2: Thurgood's 29.5 seat left with PR-11; he authors nothing in U3g.)* The signers' re-sign acts (29.6) are attestations, outside every line |
| 30 *(added 2026-10-03, U3g)* | **Lina (Opus)** — the G2 cycle-2 gate parent · U3g gating parent | — (Stacy's attack file and verdict record are outside the line. **Thurgood is recused**: he authors no line of 30's completion doc or of the consequence texts, the Task 18 recusal) |
| 31 *(added 2026-10-03, R2, U3c)* | **Thurgood (Opus)** — the profile author: every text change, worded with Kenya and Data for the theme cue and the two theming units | Lina (Sonnet) — the `render.ts` and `adapters/kiro.ts` edits and the regeneration. The signers' re-sign acts (31.4) are attestations, outside every line |
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
- *(amendment 2026-10-03, R2)* **U3c**: `rebuild_index` is not owed (Task 31 lists no `governance/**` artifact); no ARMING (it applies no new check). It rides release 3's RELEASE pass, and its signing PR is in that release's signing-act walk.
- *(amendment 2026-10-03)* **U3g**:
  - `rebuild_index` is not owed, since Tasks 29–30 list no `governance/**` artifact.
  - **Stacy's ARMING read at U3g's merge**: the corrected derivation check newly applies on every PR touching its inputs.
    - If 29.4 adds no CI context, the registration count is unchanged and the read names the lane step.
    - If it adds one, that is Peter's named act (the CI-regime ballot reserves new required contexts to him), and the `EXPECTED_CONTEXTS` count changes with it.
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
| 1 | Release count + tripwire | **DECIDED**: four releases, six claims passes (Stacy confirmed); thresholds above; U2a's `G1 runs: <k>` field (S-T5; U2's before the amendment of 2026-09-27). *(Annotation 2026-10-02, not an edit: the count is now THREE releases and FIVE claims passes — § "Expected release count", Amendment 2026-10-02. The original disposition stands as the record of what was decided at the tasks round.)* |
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
| *(amendment 2026-10-03, R2 — Leonardo L-A2)* **25.1: persona (c)'s frozen prompt names a web product.** Under release 3's scope, an "app" prompt would test the native label instead of the path | **Task 25.1**, owner Leonardo, due at U5's cut (Task 25's rows are outside the U3 amendment, so this is a carry line, not an edit) |
| *(amendment 2026-10-03, R2 — Kenya B2, advisory)* **Task 25's "Not exercised" reasons**: "no platform toolchain on the host" is untrue for iOS on at least one host (Kenya ran `swiftc` there, 2026-10-03); the true reason is "no native component consumption path" | **Task 25**, owner Leonardo, at U5's cut, reworded with Kenya and Data |
| *(amendment 2026-10-03, R2 — Kenya B1)* **Nine shipped iOS files read the theme without the key-path backslash** (`@Environment(.dpTheme)`; they parse but do not type-check against a defined key) | **Lina, a new issue of its own**, filed in her pre-cut `chore/` PR and cross-referenced from item 2 of `.kiro/issues/2026-09-26-native-component-theme-hardcoding.md`. **Not 123 work.** Task 19 names it as a cause (prose) |

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

- [x] 13. Triviality floor, dispositions, overlays, signatures, freshness, and ballot B-U2 (step 5)

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
    - *(Erratum 2026-09-28 — the counting-block unit `#the-claims-pass-record-claims-passmd-the-template` has no operative-set record in `canonical/operative-sets/stacy.yaml` (reported by the Task 13 PRIMARY at 13.1; found independently by Stacy applying the consult-first ballot's edit site 4 — her erratum note in `.kiro/docs/ballots/2026-09-28-orchestrator-consult-first.md`, #232 `18314055`), so nothing stales and no re-confirmation is owed at 13.8.)* After the counting-block edit, **Stacy's changed unit is recorded and C1-confirmed against its post-edit text at 15.4**, when it is first recorded. *If the unit gains a record before 13.8, the original clause applies: she re-confirms it before 15.4 runs.* **Parent 13's doc carries this row ⚠️ (never ✅)** with: the grep showing the unit has no record at 13.8's commit (0), a green freshness sweep at that commit, a forward link to 15.4, and the row listed in the forced-negative line — not as an `Artifact deferred` (same-unit deferral). *(Stacy consult, 2026-09-28.)*
  - *Scope*: mechanics only. Discrimination is G2's question.

  **Primary Artifacts:** `tools/agent-generator/regrounding/triviality.ts`, `tools/agent-generator/derive.ts` (key checks), schemas + validator, `tools/agent-generator/diff-guard.ts`, `__fixtures__/stale-unit/`, `.kiro/docs/ballots/<date>-123-b-u2.md`, `canonical/agents/stacy.md`, `canonical/adjudications.yaml` (13.6 removes the expired U2a rows only — F3), `src/__tests__/operative-set-records.test.ts` (13.6 deletes the Task 11 precursor test only — amendment 2026-09-27), `tools/agent-generator/__fixtures__/g1-renderings/` (copied G1 renderings with pinned provenance — U2b-cut amendment), `canonical/operative-sets/component-family-navigation.yaml` and `canonical/profiles/consumer/confirmations/component-family-navigation.md` (13.0's third F unit only — U2b-cut amendment)

  - [x] 13.0 (Lina) Exemplar F's third unit: record `#family-overview:preamble` and confirm it under C1; precursor test green. **Runs after #223 merges, on a U2b branch cut from a `main` that contains #223**, and before 13.4 *(added 2026-09-27, U2b-cut amendment; ordering per Lina R1)*
  - [x] 13.1 Dispositions schema (explicit rows; per-member frontmatter; no re-pointed embeds; rejected term)
  - [x] 13.2 Overlay + signature formats; stale and bare checks
  - [x] 13.3 Confirmer/signer checks; verbatim-substring check
  - [x] 13.4 (Lina) `triviality.ts`: the occurrence assignment with its witness, the tested properties and the AX-1 bite, over the copied G1 fixtures *(the branch-A configuration is dropped — G1 HOLDS; amendment 2026-09-27, U2b cut)*
  - [x] 13.5 (Lina) Orphan and missing-row refusals
  - [x] 13.6 (Lina) The freshness sweep in diff-guard + the STANDING stale-fixture test + the `audit:coverage-map` rows-list-the-guard run + the ARMING notice + removal of the expired U2a adjudications (F3; Stacy is told in the same notice) + absorb and delete the Task 11 precursor test `src/__tests__/operative-set-records.test.ts` (amendment 2026-09-27)
  - [x] 13.7 **Author ballot B-U2** (counting block + L686); Stacy's review; record-first
  - [x] 13.8 Apply the counting-block edit (regenerate); Stacy's changed unit is confirmed when first recorded at 15.4 (erratum 2026-09-28)

- [x] 14. Derivation checker, grain guard, and per-target bites (step 6)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Lina (Opus)
  **Traces**: Reqs 11.4, 10.G, 10.S, 10.8b/c · design C15, DD7

  *(Sequencing correction 2026-09-28: **14.2–14.4 run after Task 15.0 merges into the unit branch** — they render exemplars E / E-fm through the adapters under the consumer profile, and neither the declared target list nor the adapters' consumer path exists before 15.0; 14.1 and 14.5 are unblocked. Found at Task 14's instrument-existence check (Lina).)*

  **Success Criteria:**
  - Containment through both trees only. Unknown anchors are non-matching, never a throw: attack (a) → `FAIL_NO_DERIVATION`; E → `VERIFIED`; `#body` → non-matching.
  - Golden Bite 2 recorded.
  - **Body per-target, two-sided**: a `cc.ts` call-site mutation → `› cc` = **`FAIL_NO_DERIVATION`** and `› kiro` green, plus the symmetric pair. The verdict value is asserted; logs committed. **This is the arbiter for Task 10's consolidation claim.**
  - **Frontmatter per-target (E-fm), two-sided**, on `writeScope[<glob>]`, with the same pattern and logs — **OR** `frontmatter routing: asserted, not bitten — <reason>`.
  - `derivation.frontmatter.test.ts`: `commands[<name>]` emptied with a sibling destination → `FAIL_NO_DERIVATION`.
  - One guard file iterates the targets in `consumer-profile.yaml`; a fake third target adds a third block with no other edit.

  **Primary Artifacts:** `tools/agent-generator/regrounding/derivation.ts`, the guard tests, `__fixtures__/` (E, E-fm)

  - [x] 14.1 `derivation.ts`
  - [x] 14.2 Agent-shaped fixture carrying E (~1–2 h)
  - [x] 14.3 Body per-target guard + bites (~30 min each)
  - [x] 14.4 E-fm + frontmatter bites (or the forced negative)
  - [x] 14.5 Bite 2 + `derivation.frontmatter.test.ts`

- [x] 15. Consumer rendering and first render (step 7)

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Thurgood (Opus); Lina (Opus) — 15.2 `derive.ts`
  **Traces**: Reqs 9, 9.5, 11, 12, 13, 14.8–14.9 · design C12, C19, C22, DD18, DD20

  **Success Criteria:**
  - `consumer-profile.yaml` has targets `[cc, kiro]` and `defaultTarget: cc`. **The target set is declared once, on the generator's emission path** *(scoped and routed by amendment 2026-09-29 — the 15.1 sweep's hits)*: over `tools/agent-generator/**` excluding `__tests__/**`, `__fixtures__/**` and `consumer-profile.ts` itself, a sweep for literal target lists returns no hit except those routed by name below, and the list is read only through `loadConsumerProfile` (its importers listed). Commands and output recorded at the parent. Type unions naming the targets (`TargetAdapter.target`, kept by Req 9.1) are types, not declared lists; test literals are outside the path by rule. **Routed by name, each with its record**: `tools/agent-generator/skills.ts:163,169` (`emitSkillTrees`, a Spec 122 helper only its own tests call) → retired under `.kiro/issues/2026-09-29-emit-skill-trees-dead-helper.md` before U2b's unit PR opens; `src/cli/init.ts:94` (`attachedTargets: ['cc', 'kiro']`, contradicting DD9) is outside the path: **`src/cli/**` is Task 16's surface**, and this hit is that parent's criterion *"`attachedTargets` names only the targets emitted"*, never this row's. ***Limit: a zero-hit sweep is evidence about the pattern, not the codebase*** (S-T-A8).
  - `derive()` produces `_consumer-output/_canonical/` (once) and `<target>/` covering 8 agents plus identity members for both targets. `guardedRoots()` covers all three, and diff-guard is green.
  - Identity members carry no source frontmatter; Kiro members carry exactly `id` + `inclusion: always`; all are prefixed `designerpunk-<id>.md` (test over rendered output).
  - **Every unit and entry, for all 8 agents, shared members and 8 identity docs, has an explicit row.** The missing-row refusal passes over the full profile; counts per agent recorded.
  - **ZERO STANDING REFUSALS at U2 acceptance (U2b's merge)** (S-T3). Every `refuse: should-re-point` row was re-authored and re-judged, and **resolved EITHER by itemized assent OR by a changed disposition under its own C1 signature** (e.g. re-disposed `superseded-by`). **Never assent-only** (Stacy R2). **Refusals issued** during first render are recorded in the "first render — not a baseline" block with the `no-consumer-counterpart` and assent rates. Every ROUTED row carries a C1-correct signature, and the hard floor passes for all 8.
  - **Consumer-Kenya's and consumer-Data's knowledge-fallback paths** (`src/components/core/*/platforms/{ios,android}/**`) are re-grounded to `node_modules/@3fn/core/src/…` in their consumer renderings (Kenya/Data R1). Assert by grepping the rendered files; the path's existence in a packed install is checked at Task 16.
  - `derive()` refuses on a stale overlay and an orphaned key over the real profile.
  - *Scope*: declared-and-signed-by-the-right-seat only. Discrimination is G2's question; authorship is not establishable.
  - **The counting-block unit is recorded and C1-confirmed at 15.4** (erratum 2026-09-28, discharging Task 13's ⚠️ row): `canonical/operative-sets/stacy.yaml` carries `#the-claims-pass-record-claims-passmd-the-template` with its confirmed item set against the post-13.8 text, the doc cites the unit key, its `canonicalHash`, the path of Stacy's `confirmation:` note, and a green freshness sweep (or records check) over it. *Scope: it closes Task 13's forward link; the items' content is Stacy's confirmation, not this row's.*
  - **15.0's slice is steward-invisible** *(sequencing correction 2026-09-28)*: with `AdapterContext.profile` defaulting to `steward`, Task 10's golden tests and every file under `canonical/_fixture-output/**` and the guarded roots are byte-identical — `npm run test:agent-generator` green and `npm run check:122:diff-guard` → `full-run-green` with the output hash unchanged **except `canonical/coverage-map.yaml`'s row for the new `canonical/consumer-profile.yaml` (and `canonical/coverage-manifest.yaml`'s matching glob)** (lock refresh committed with the slice), output cited. *(Erratum 2026-09-29 — found at 15.0 application: the profile file's own coverage-map row is a guarded output, so the hash moves by exactly that row and its glob; every agent, skill, always-layer and `_fixture-output/**` output is byte-identical.)* A declared target with no registered adapter fails loud, naming it.
  - **Under the consumer profile, nothing renders that no surviving member sourced; under the steward profile every output is byte-identical** *(amendment 2026-09-29 — the guard that the adapters + `spans.ts` grant for 15.3–15.5 carries; Lina's three clauses, R1)*:
    - **steward**: Task 10's goldens pass unchanged, and the diff-guard output hash moves only by the consumer root's own files;
    - **routing**: `semantics-guard.test.ts` (Task 14, the per-target routing arbiter) stays green after every adapter or `spans.ts` edit, and a new per-target emission path (e.g. `emitIdentityMembers`) routes through `emitSpans`;
    - **containers**: section headers and glue, the `skills` line, and `ambient[<docid>]` embed containers render only when at least one member under them survives;
    - **shared members**: shared-catalog members read their `_shared.dispositions.yaml` rows under the consumer profile (dropped / retained / re-pointed as a YAML value, per the entry-overlay erratum below), so a `runContext: this-repo` member never ships to a consumer agent;
    - **Kiro JSON config**: it takes its consumer form at **15.3**, following the entry-overlay ruling (YAML values): it builds from the derived frontmatter's values, so a re-grounded `writeScope` glob lands in `allowedPaths`; its `resources` point at the per-target identity member files (C19's always-mechanism) and list only surviving entries — asserted per resource entry, because the config is one render span (C20). A test over the real profile (15.4) asserts that every span in `canonical/_consumer-output/<target>/**` sources a surviving row, a document-level glue piece named in `GLUE_SOURCES` (banner, frontmatter fence, `WORKFLOW_RULES`), or a container with at least one surviving member span in the same artifact. **Bite recorded**: dispose every member under one header → the header vanishes; restore → it returns. *Scope: fixture shapes at 15.3, the real profile at 15.4; it establishes that emission follows the rows, not that the rows are right — that is the signers'.*
  - **The consumer path routes through `emitSpans` in both adapters** *(sequencing correction 2026-09-28)*: under `profile: consumer`, per adapter, a unit test shows (a) a re-pointed body unit renders its overlay text with `source` = its canonical `#<anchor>`; (b) a re-pointed frontmatter leaf renders its `## @entry` overlay **VALUE** via the field's per-kind renderer, with `source` = `…#frontmatter:<path>`; the overlay body is a YAML value, pinned by `hashEntry` of the canonical value; (c) a list-valued field renders **per member**, so `writeScope[<glob>]` is its own span (DD26); (d) a missing row throws. *Scope: fixture shapes; the real 8-agent render is 15.3–15.5; the Kiro JSON config's consumer form is 15.3's (amendment 2026-09-29).*
    - *(Erratum 2026-09-29 — Q1 of the 15.2 reads: Lina (b), Thurgood concurs; Peter's merge of this amendment is the ruling — entry overlays carry YAML VALUES, not rendered prose. Was: "(b) a re-pointed frontmatter leaf renders its `## @entry` overlay text with `source` = `…#frontmatter:<path>`". Why: `_canonical/agents/<a>.md` is the derived charter that Task 16's lane renders per target, and the machine-read surfaces (Kiro `allowedPaths` / `tools` / `resources`, CC `tools:`) are built from values; prose cannot become a value, so a re-grounded permission could not reach them (Lina, `completion/task-15-2-completion.md` § "Reads for the orchestrator"). **Where it lands**: `spans.ts`, the adapters and `derive()` (value substitution where `repointedEntryPendingMessage` refuses today) at **15.3**, inside the grant; 15.0's (b) evidence is re-cited there. Lina's E-fm fixtures (`__fixtures__/semantics-guard/`) move to values and her bites re-run as a **Task 14 addendum** (docs + fixtures, disclosed). **Validation is class-level, never per-field value shapes**: the derived charter (`_canonical/agents/<a>.md`) passes the same `validate()` (`pipeline.ts` — schema rules 1–5 plus the WORKFLOW_RULES guard) that the steward charter passes, so a substituted `commands[<name>]` object meets rule 4 (`runContext` ∈ `this-repo | consumer-repo | per-product`; `authoredPerProduct` when `per-product`) and substituted prose meets rule 2's volatile-fact lint, with no special case for "target renderings = rendering(derive(x))". **Where reuse does not reach**: that table is rules, not types — it type-checks no `writeScope`, `knowledgeBases`, `routes`, `toolSubset`, `preflight` or `kiro.*` value — so `derive()` adds ONE generic congruence refusal: a substituted value has the canonical value's JSON type; an object carries exactly the canonical object's key set; a keyed member keeps its identity field (`name` / `id`) equal to its key. Ambient embeds are never substituted (DD19).)*

  **Primary Artifacts:** `canonical/consumer-profile.yaml`, `canonical/profiles/consumer/**`, `canonical/operative-sets/**`, `tools/agent-generator/{derive,generate}.ts`, `canonical/_consumer-output/**`, `tools/agent-generator/adapters/{cc,kiro,index}.ts` and `tools/agent-generator/spans.ts` (15.0 and 15.3–15.5 — amendment 2026-09-29: identity members, container pieces, shared-catalog member dispositions), `tools/agent-generator/consumer-profile.ts` (15.0, new — the single declared target list's loader, C12)

  *Not a criterion — a precondition carried in (U2b-cut amendment, 2026-09-27; G1 run 2 finding R2-F1, Peter ruled proceed-on-HOLDS): Req 11.6.5e's "Scope — within the unit's own rendering" is in force before 15.5's first routed signature. A signer credits an item by entailment only from that unit's own rendering, and a function that survives only elsewhere takes a disposition. Stacy checks it at U2b's MIDPOINT.*

  - [x] 15.0 (Thurgood, Opus) The consumer profile file + its loader (`consumer-profile.ts`, C12's single declared list) and an adapter registry keyed by declared target name in `adapters/index.ts` read by `generate.ts` and the Task 14 guard; `AdapterContext.profile/dispositions/overlay` threaded into both adapters' `emitSpans` calls (steward default); frontmatter re-pointing via the `## @entry` overlay form (13.2); list fields rendered per member under the consumer profile only; `generateFixture(repoRoot, ctx, adapters, opts?: { profile, dispositions, overlay })` — **runs before 14.2** *(sequencing correction 2026-09-28; found at Task 14's instrument-existence check)*
  - [x] 15.1 Profile file; `AdapterContext.profile`; `generateConsumerRendering`; `guardedRoots()`
  - [x] 15.2 (Lina, Opus) `derive.ts`
  - [x] 15.3 `emitIdentityMembers` per target
  - [x] 15.4 Operative sets for all units; dispositions/overlays for all 8 charters, shared substrate and identity docs; knowledge-fallback re-points
  - [x] 15.5 First-render routing: confirmations and signatures per C1; refusals resolved to zero standing (assent or re-disposition); rates and refusals issued recorded

- [x] 16. Consumer emission lane, `attach`, the `init` agent layer, legacy migration, and generated-surface `sync`

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY Lina (Opus) — 16.1, 16.5; Lina (Sonnet) — 16.2, 16.3, 16.4, 16.6; Ada (Sonnet) consulted — 16.3
  **Traces**: Reqs 13, 14.1–14.4, 15A.1, 19.2, 19.7, 5.6, 15.8 · design C20, C1 (agent rows + row 10), C5 (deferred rows), C7 (generated surfaces, region grain, **Migration item 4**, the release-1 cohort), C27 erratum, DD22

  **Success Criteria:**
  - `emitConsumer` reads only C20's inputs, **`packageRoot`-relative**. `consumer-entry.paths.test.ts` shows inputs under `packageRoot`, outputs under `consumerRoot`, and differing paths on Kiro. `registry.fromManifest` is used and no server starts.
  - **The packed install emits a working agent layer for both targets**: pack → `init --target=cc` and `--target=kiro` → the expected file set and keys, and **zero `complete-task.sh|Peter merges|RATIFIED` in emitted charters**. *Scope: clause (i)'s deny-list tokens, not re-grounding quality.* Consumer-Kenya/Data's re-pointed knowledge paths **resolve** in the packed install. *(amendment 2026-09-30 — the referent of "expected", Lina Q-d/Q-j: the expected agent-layer file set is the guarded rendering `canonical/_consumer-output/<target>/`, attribution sidecars and the root prefix stripped — the parity 16.1 builds; the check is 16.6's packed-install block. Scope: parity shows the lane emits what was signed, not that the signed rendering is right — that is the signers' and G2's.)*
  - The agent-layer rows, row 10's comment edit, and the deferred `files[]` rows are implemented (`init.test.ts` + Ada's `pack-assert.ts` re-run with the deferred rows). *(amendment 2026-09-30 — the rows named; Lina's consult Q-a/Q-b and Ada's consult, 2026-09-30:)* **The deferred rows** (C5; sequencing decision 2): ADD `dist/consumer-canonical/**` (every extension), `dist/generator/**`, and the eight shipped identity docs by explicit path; REMOVE `.kiro/agents/` and the `.kiro/steering/` directory glob. **Plus the negations** `!dist/ios/**`, `!dist/android/**`, `!dist/web/**` — an addition to C5, not a C5 row (Ada's split packaging ruling, `completion/task-15-completion.md` L94/L112; she assents to Lina applying them under this row). The `dist/` root token files stay KEPT, enumerated from the packed listing at apply time, never from a copied list. `pack-assert.ts` asserts every ADD present and every REMOVE and negated path absent. **`governance/` STAYS**: C5 never lists it as a removal, and C20 reads ambient embeds from `packageRoot/governance`. *Record note: Task 3's "the three removals deferred to Task 16" and `completion/task-3-completion.md` L18's naming of `governance/` as the third are in error; C5 defers two REMOVEs.* `templates/personal-note.template.md` (a C5 ADD) is Task 22's artifact (U3): neither added nor asserted here. **The `pack-assert.ts` re-run follows `npm run build`; the packed-install check of criterion 2 packs with lifecycle scripts, never `--ignore-scripts`** (Ada). REMOVE `.kiro/agents/` discharges the shipping half of `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`; with C20's "No attribution sidecars are emitted" (asserted in `consumer-entry.paths.test.ts`, Lina Q-g) it closes that issue at U2b's merge.
  - **`attach`**: refusals and exact strings; `--reference` writes a `posture: 'consume'` manifest; **`attach --reference stays CONSUME` passes, bite recorded red.** **Restart rows (Le-T5)**: born-repo `attach` and `init`'s U2 output print the **sequenced** row **LAST**; `attach --reference` prints the **now** row. String-equal assertions on the expected order.
  - **Legacy migration** (T-L1; design Migration item 4): `--migrate-legacy` is **offered only when `attach` is available and runs in the same flow** (removal then attach). A test asserts that it is never offered without the attach step.
  - **The release-1 cohort** (Ada D-T-B2): a fixture born by **release-1 `init`** (a current-format manifest with `origin: 'copy'` entries under `.kiro/agents` / `.kiro/steering` / `governance`) → U2 `sync` reports them as legacy copies and offers `--migrate-legacy` + `attach`. **It neither leaves them silently beside generated agents nor classifies them as conflicts.** Bite (key on manifest version instead of `origin`) recorded red. **After `--migrate-legacy` + `attach`, ZERO `origin: 'copy'` entries remain under those paths** (they are replaced by `generated`), so a migrated consumer is never re-detected as a cohort member (Ada R2).
  - **Region grain**: the `CLAUDE.md` region is spliced; outside bytes unchanged; missing markers → string, no write (`sync.region.test.ts`).
  - Generated-surface `sync` for `attachedTargets` only. A deleted generated file → `deleted-by-you` (generated-surface cases).
  - **`attachedTargets` names only the targets emitted** *(routed from Task 15's C1 sweep, amendment 2026-09-29; text amended by Lina R1)*: bare `init` = `[defaultTarget]` (DD9), **read through `loadConsumerProfile` (no literal target list — C12)**; `init --target=<t>` records `[<t>]`; `attach --target=<t>` adds `<t>`. This replaces `src/cli/init.ts:94`'s `attachedTargets: ['cc', 'kiro']`; `init.test.ts:365`'s two-target expectation moves to the `--target=kiro` / two-target case. **Bite recorded**: restore the two-target literal → red. *(amendment 2026-09-30 — where it lands, Lina Q-f: the `init.ts:94` replacement and its bite in 16.3; `attach --target` adding a target in 16.2; 16.5 consumes the field. `init` reads the profile through `dist/generator/consumer-entry.js`'s `loadConsumerProfile` over the copy prepack ships in `dist/consumer-canonical/` — never a `tools/` import: tsc's `rootDir` is `src`, and `canonical/` does not ship.)*
  - Degradation: warning, exit 0 (`consumer-entry.degradation.test.ts`, bite recorded).
  - **The lane half of 3.9**: `npm run test:consumer` against the U2b pack, with the SHA ancestor-checked against the last `package.json` change.

  **Primary Artifacts:** `tools/agent-generator/consumer-entry.ts`, `build:generator`, `src/cli/attach.ts`, `src/cli/init.ts`, `src/cli/sync/{RegionGrain,Migration}.ts`, `package.json`, tests; *(amendment 2026-09-30 — widened to the paths the criteria require; Lina's consult, top finding:)* `tools/agent-generator/registry.ts` (16.1 — `registry.fromManifest`), `tools/agent-generator/adapters/{cc,kiro}.ts` (16.1 — the `emitSkills` `packageRoot`/`consumerRoot` split, `emitAlwaysLayer`'s region-only contents, the consumer banner fix), `tools/agent-generator/consumer-profile.ts` (16.1 — the root-relative load), `canonical/_consumer-output/**` and `canonical/generated.lock` (16.1 — the committed rendering and the guard lock move with the banner fix), `scripts/pack-assert.ts` (16.3 — the deferred rows and the negations), `src/cli/shared/errorCatalog.ts` (16.1 — Req 13's warning; 16.2 — the attach refusals; 16.4 — the missing-markers string), `src/cli/shared/vocabulary.ts` (16.2, new — C20's fifth lifecycle verb; Task 19 extends it), `src/cli/designerpunk.ts` (16.2 — the `attach` dispatch), `src/cli/sync/{index,Classifier,Manifest}.ts` (16.5 — generated-surface `sync`), `tests/consumer-integration.test.ts` (16.6 — the packed-install block)

  - [x] 16.1 (Opus) `consumer-entry.ts` + `build:generator` (the first esbuild of the generator: lazy requires, runtime fs-reads, no live-introspection path) *(amendment 2026-09-30 — the unnamed work named; Lina's consult, top finding, Q-d, Q-i: **the prepack `derive()` step** writing `dist/consumer-canonical/` (C22's first call site), which ships `shared/{always-set,field-dispositions,skills-map}.yaml` beside the derived shared catalog, and the filtered `skills/**`; `registry.fromManifest`; in both adapters, the `emitSkills` `packageRoot`/`consumerRoot` split and `emitAlwaysLayer`'s region-only contents; **the consumer banner fix**: the "Source: canonical/agents/… (Spec 122 pipeline) … 122-diff-guard" glue is false in a consumer repo, so its consumer form changes, steward bytes are unchanged, and the lock refresh is committed with it; **the parity test**: `emitConsumer` over the built `dist/consumer-canonical` equals `canonical/_consumer-output/<target>/`, with sidecars and roots stripped)*
  - [x] 16.2 `attach` (modes; refusals; restart line; vocabulary object; safe re-run)
  - [x] 16.3 `init` agent-layer rows + row 10; the deferred `files[]` rows (Ada consulted); manifest `origin: 'generated'`
  - [x] 16.4 Region extractor + splicer (**~1 day**, mechanical)
  - [x] 16.5 (Opus) Generated-surface `sync` + `attachedTargets` generation + legacy migration only-with-attach + the release-1 cohort case (**~1 day+**)
  - [x] 16.6 The `attach --reference` C6 case; the lane half of 3.9 *(amendment 2026-09-30 — criterion 2's packed-install check located; Lina Q-b/Q-e: a new describe block in `tests/consumer-integration.test.ts`, which already packs with lifecycle scripts, asserting per target that every Kiro `resources` `file://node_modules/@3fn/core/…` path exists in the install, that `.kiro/steering/designerpunk-*` exists after `init`, that the knowledge-base entries (`./src/tokens`, `./src/components`) exist in the born repo, and that `.designerpunk/personal-note.local.md` is ABSENT until U3 (Task 22; C19's degradation), asserted, never skipped. **Scope note**: the deny-list scan runs over every emitted file, not charters only — stricter than criterion 2's text; 0 hits over `canonical/_consumer-output/` today.)*

- [x] 17. Legacy-path deletion and the L686 edit under B-U2

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Lina (Sonnet); Thurgood (Sonnet) — 17.3 *(17.4 Lina (Sonnet) — added 2026-09-28)*
  **Traces**: Reqs 14.5–14.7 · design C21, DD13

  **Success Criteria:**
  - **The `SCAN_DIRS` removal and the no-op precede the deletion** (test: nonexistent scan dir → exit 0; git order cited).
  - `product-template/` is deleted, each sweep entry carries its verb, and the repo grep for `product-template` returns only verified-historical sites (command and output recorded). *(amendment 2026-10-01 — the grep row made decidable; Thurgood's branch-cut sweep, Lina's executor read, Stacy's auditor read:)* **The verb vocabulary is closed**: `REMOVED` / `KEPT-LIVE` / `RESOLVED-BY-GRANT` / `HISTORICAL` / `EDITED at 17.3 under B-U2`. **Every file `git grep -l` returns for the legacy path has a row in 17.2's table, and the table's row count equals that file count**; spec-directory records (`.kiro/specs/**` and `docs/specs/**`, Task 17's own docs included) are ONE `HISTORICAL` row. Sites the grep no longer returns — the deleted tree, § 4b's two lines, the workflow comment, and the `package.json` `files[]` entry (**REMOVED at Task 3 (U1)**, cited, not re-edited) — are listed in a separate part of the table with their verbs and are not counted in that equality. Two named sites are not historical: (1) `scripts/pack-assert.ts`, anchored by content — the assertion labelled `REMOVE absent: product-template/**` (design C5's REMOVE-absent assertion; line numbers drift) — **KEPT-LIVE**, a live absence assertion that now guards re-introduction and is not deleted here; (2) `.github/workflows/package-name-drift.yml` — **RESOLVED-BY-GRANT** (criterion 6): its fixing PR merges to `main`, and `main` into the unit branch, **before 17.2's grep runs**, so the grep shows no hit there. At 17.2's grep the `rule:` line of `governance/classification-map.md` still hits (**EDITED at 17.3 under B-U2**) and `governance/MCP-Evolution-Roadmap.md`'s "Reference sweep (first-party)" bullet (L217 on this tree) hits (**HISTORICAL**, Req 14.5.5, left unedited). **The recorded grep is RE-RUN at parent close** (`git grep -n` for the legacy path, scoped to `governance/` and `.kiro/steering/`; B-U2 § 5 M2 step 4) and must return **exactly two hits** — that Roadmap bullet and the `classification-map.md` history line that lands at 17.3; a third means stop and report. **No legacy-path literal appears** in § 4b's new text, in 17.1's or 17.4's tests, or in the fixing PR's pointer sentence (a missing directory is tested with a synthetic name; building the literal from parts is forbidden).
  - The L686 edit applies **under B-U2** (ratified at 13.7), in the same PR.
  - The drift step passes after the deletion.
  - **The register rule and the drift check cannot drift apart** *(ballot B-U2 F-2, ruled Peter 2026-09-28; amendment 2026-09-28)*: a **STANDING test**, `scripts/__tests__/package-name-scope-parity.test.ts`, run under `npm run test:scripts` (a `lane-timing.yml` step with a ≥ 1 floor; no lane edit needed — `scripts/jest.config.js` `testMatch` picks it up), parses the one parenthesized group of path-shaped members (each ending `/`) in the `rule:` string of the yaml block under `### package-name-scope-drift` in `governance/classification-map.md`, and fails loud if that block, the string, or exactly one such group is absent; it asserts that set **set-equal to `SCAN_DIRS`, with equal lengths**, read from `scripts/check-package-name-drift.js` (typed `require`; that script gains a `require.main === module` guard around `main()` and exports `SCAN_DIRS` at 17.1). **Bites recorded, two-sided, exact outputs**: add a directory to `SCAN_DIRS` without the rule edit → red; add a directory to the rule without `SCAN_DIRS` → red. The test lands at **17.4, after 17.3's rule edit** (the sets differ until then — today by `governance/`, after 17.1 in both directions), and 17.4 cites the test green and names the test. *Scope: it establishes that the rule and the script agree, not that either is correct.*
  - **The workflow comment at `.github/workflows/package-name-drift.yml` L5 is resolved by its own grant record**: 17.2's grep-sweep row lists that site as "resolved by `.kiro/issues/2026-09-28-package-name-drift-workflow-comment-grant.md`" (the comment becomes a pointer to `SCAN_DIRS` under that issue-row grant — ballot `2026-09-27-ci-regime-standing-scope.md` § 3; `.github/**` is never a Task 17 Primary Artifact). *Scope: the edit's evidence lives in the issue, not in this parity table.* *(amendment 2026-10-01 — the fixing PR's form; Thurgood's branch-cut sweep, Stacy's auditor read:)* The fix is its own `chore/` PR to `main` (an issue-row grant cannot ride the unit PR) whose `git diff --name-only` is exactly `.github/workflows/package-name-drift.yml`; its body states `1 added, 1 deleted — the replacement is the act named in the issue's "The fix" §`, and its pointer sentence carries no legacy-path literal. It merges to `main`, and `main` is merged into the unit branch, before 17.2's grep. ARMING audits it at its merge.

  **Primary Artifacts:** `scripts/check-package-name-drift.js`, `product-template/` (deleted), `governance/DesignerPunk-Integration-Guide.md` (§ 4b), `governance/classification-map.md`, `scripts/__tests__/package-name-scope-parity.test.ts` (new — the standing parity test, B-U2 F-2; 17.4) *(amendment 2026-10-01 — widened to the paths the criteria require; Thurgood's branch-cut sweep, Lina's executor read, Stacy's auditor read:)* `scripts/__tests__/check-package-name-drift.test.ts` (new — 17.1's no-op test: the script **spawned as a child process** in a temp cwd holding only a scoped `package.json`, every `SCAN_DIRS` entry absent, asserting **exit 0 AND the zero-files-scanned line**; **plus a positive control** — a wrong-scope reference under a present scan dir → exit 1 — so a vacuous early exit cannot pass; **the bite recorded on a TEMP COPY of the script** with `walkDir`'s existence guard stripped, never by editing the real file; a typed `require` only where `SCAN_DIRS` is read (17.4), never an `import`, since `typecheck:scripts` reads `scripts/**/*`); `canonical/generated.lock` — **refreshed by `check:122:diff-guard`'s own full-run write only, never hand-edited**, from a tree whose `git status --porcelain` is clean (the closure counts untracked-not-ignored files). It moves with 17.2 and 17.3 only (`governance/**` is a closure root; `scripts/`, the deletion, `.github/` and `tasks.md` are outside it), and **it is refreshed ONCE, at 17.3** (17.3's cadence note). A refresh in which the guard's `outputs` moves is NOT a refresh: stop and report.

  - [x] 17.1 `SCAN_DIRS` + no-op + test (first commit) *(amendment 2026-10-01 — "first commit" reads "first CODE commit": the parent's instruments block commits before it, and criterion 1 cites git order; the test is the file added to the Primary Artifacts above)*
  - [x] 17.2 Delete; Integration Guide § 4b teaches `attach`; the grep sweep *(amendment 2026-10-01 — the grep runs after the criterion-6 fixing PR has merged to `main` and `main` is merged into the unit branch; the table follows criterion 2's closed vocabulary and count rule; § 4b's new text carries no legacy-path literal and uses the strings in `src/cli/shared/vocabulary.ts`)*
  - [x] 17.3 Apply L686 under B-U2 *(amendment 2026-10-01 — the one lock refresh, and the cadence behind it: 17.3 is the last `governance/**`-touching commit, so one refresh yields the final value and one place for the outputs-moved stop. After the L686 edit and its history line are committed (clean tree), run `npm run check:122:diff-guard` and commit the lock diff alone; 17.2's commit carries a stale lock by declaration in its completion doc (the full path stays green while `outputs` is unmoved). At parent close a re-run of the guard produces no lock diff.)*
  - [x] 17.4 (Lina) The standing register-rule ↔ `SCAN_DIRS` parity test + two-sided bites, green from its first commit *(added 2026-09-28, B-U2 F-2 amendment; after 17.3 — the sets are equal only once the rule edit lands)*

- [x] 18. **G2 gate parent — pass four** (step 8; **U2b gating parent and U2's acceptance gate**)

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

  - [x] 18.0 Commit the two pre-declared consequence texts
  - [x] 18.1 Request pass four from Stacy
  - [x] 18.2 Apply the verdict's artifact edit; the release-2 CHANGELOG entry
  - [x] 18.3 Full validation; open the U2b PR (tripwire line)

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
  - *(amendment 2026-10-03 — the U3 cut. Rulings: Peter's PR-1, PR-2 and PR-3. Reads: Ada, Leonardo, Lina, Stacy. Record: `feedback/tasks.md` § "U3 amendment round (2026-10-03)". Each row below names its instrument and what red looks like (Stacy's lens item 1).)* **The guide disposition, PR-1 RULED: one document, with a marked install region.**
    · The install region opens `governance/DesignerPunk-Integration-Guide.md`, directly after its title and metadata, between two committed markers. It **replaces** the Setup Loop (guide L32–398 at `79a3b3bc`).
    · The rest of the guide sits under one top-level `## Reference` heading whose lead line says it is reference, not setup steps.
    · **No second step list exists outside the region**: no numbered setup heading, and no "Setup Loop" string, outside the markers (Leonardo's two conditions).
    · *(R2, Stacy R-10)* **The guide's § "Prerequisites"** (L20–31 at `79a3b3bc`, between the metadata and the old Setup Loop) **moves into the region**, as its second block after the scope sentence (design C23 erratum, the stated order). So nothing sits between the metadata and the opening marker.
    · **Instrument**: `scripts/__tests__/install-doc.test.ts`, run by `npm run test:scripts`. It goes red if a marker is missing or duplicated, if the region does not open the doc, or if a numbered step heading appears outside the region.
  - *(amendment 2026-10-03)* **The criterion 7 "derived from it at build" reads as a COMMITTED derived file** (PR-1; Ada: a build-time write would ship unreviewed bytes through `scripts/release-publish.ts` and repeat the closed contamination class).
    · `docs/consumer/INSTALL.md` is committed, and equals `deriveInstallDoc(<guide>)` byte for byte: a fixed header citing its source by repo-relative path, the `path-steps` map carried from the guide's front matter, and then the region verbatim.
    · The derivation is `scripts/derive-install-doc.ts`, run with `npx tsx scripts/derive-install-doc.ts`. There is **no `package.json` script line** (Ada).
    · **Instrument**: the same test file imports the derive function and asserts equality.
    · **Bite recorded**: edit the region without re-deriving → red.
    · *Scope: it establishes that the two copies agree, not that either is right.*
    · "Body identity" in criterion 7 reads as **region identity**.
  - *(amendment 2026-10-03)* **The reference remainder is cleaned in the same pass, and has an owner: Thurgood** (PR-1). Every `##`/`###` section of the remainder gets a row in 19.4's completion doc, with the verb `kept` / `corrected` / `removed` and a one-line reason. The remainder must not contradict the region. Concretely (Leonardo's checklist):
    · § "Native Platform Sync — Target Model (M0b)" is removed, or rewritten to carry the native label;
    · § "Running Component Tests" describes testing the consumer's own components with `@3fn/core/testing`;
    · § "CLI Commands" uses `src/cli/shared/vocabulary.ts`'s forms (inside criterion 6's test, whose scope is the whole guide);
    · § "Upgrading" teaches 15.x's report-first `sync` (Req 15B.6);
    · § "Knowledge Base Setup" is harness-agnostic, or labelled per harness.
    · **Widened grep**: criterion 7's grep widens to `git grep -n -E "product-template|src/components/core/|npm\.pkg\.github\.com|@designerpunk:|sync:ios|sync:android|--accept-all|\.kiro/sync-manifest\.json" -- governance/DesignerPunk-Integration-Guide.md`, with every hit dispositioned.
    · **Asserted zero**, in the guide, `docs/consumer/INSTALL.md` and `README.md`: `npm.pkg.github.com` as the install registry, and `@designerpunk:` (`check:drift`'s `SCOPE_PATTERN` cannot see the `@scope:registry` form). *(R2, Stacy A-6: "as the install registry" cannot be checked by a grep, so the assertion is a **plain zero count** of `npm.pkg.github.com` in the three files. A legitimate mention would need an allowed-context list, added with the mention.)*
    · **Leonardo checks at 19.5**: § "Writing Screen Specs" / "UI Tree Convention (Draft)" against his `example-home.yaml`.
    · *(Annotation 2026-10-03 — **Peter's ruling**, this session, on the Setup Loop fork Thurgood reported at 19.1: reading (b), extended.)* The old Setup Loop's non-step content is **kept as reference**, de-numbered, under `## Reference`. C9's "replaces the Setup Loop" reads **"replaces as the step list"**. A **retitle counts as `corrected`**; retitles are limited to top-level reference headings. The sweep **removes or corrects, never polishes**.
    · *(Same ruling — Peter, 2026-10-03: "Good on all four".)* **Class guard**: each behaviour, path or count claim in the remainder table and in the region's passage table (19.3) cites `file:line` or a ratified record. **Review mechanic**: the owners supply wording for their sections first; Thurgood assembles; each owner confirms their own rows before the commit.
    · *(Settled in consult, 2026-10-03 — Leonardo, Ada, Thurgood; recorded, not ruled anew.)* § "Creating a Theme" becomes Ada's status note. § "Governance Gradient" takes Ada's rename ("Ecosystem" → "Design system", and so on). A separate doc-id for the reference is **parked** to the follow-up rewrite; PR-1 stands. The follow-up rewrite (Peter: "designer friendly and something an agent can help the user walk through") is a **Leonardo-led charter issue**, triggered by the release-3 tag, with the theme walkthrough gated on Spec 129 item (i). It is not in U3.
    · *(PENDING — proposed, not ruled, 2026-10-03.)* Peter stated an amendment: "each integration guide section should be reviewed by the agent who owns that area once complete". Its shape, proposed by the orchestrator, **awaits his confirmation**. It is not a criterion until he confirms it. **→ RULED 2026-10-03** (Peter, "Sounds good to me"; see the next line).
    · *(Annotation 2026-10-03 — **Peter's ruling**, "Sounds good to me", confirming the orchestrator's proposed shape.)* **Every section of the Integration Guide, the install region and the reference alike, is reviewed by the agent who owns that area once the text is complete (at the end of 19.4).**
      · There is a named owner for every section, with none left over: Kenya (iOS); Data (Android); Lina (CLI, `sync`, testing, MCP config); Ada (tokens, themes); Leonardo (product, screens); Thurgood (governance). § Platforms › Web is **Sparky's**: the Agent Directory routes Web Components consumption and web-platform questions to him, and #268 named him its web reviewer. Ada's theme rows inside Web are her own wording, under the class guard above.
      · Each review checks claims against source (`file:line`), not prose. There is one pass, on the final text. A later Task 22 CLI-string change reopens only that owner's section. Leonardo's 19.5 whole-document read covers contradictions between sections.
      · **19.4's completion doc carries a section → owner → verdict table.**
      · **Residuals, stated**: owners who supplied wording review their own words, and about six short reviews are added at 19.4's close.
  - *(amendment 2026-10-03)* **B-U3, a light record-first ballot (PR-2)**, is 19.4's first commit, at `.kiro/docs/ballots/<date>-123-b-u3-install-guide.md`. It is ratified by Peter's merge of U3's PR (the PR-atomic precedent of B-U1 and #268). It records:
    · why the install process changes;
    · **a preservation table** mapping each content point that #268 ratified (`.kiro/docs/ballots/2026-10-02-integration-guide-native-scoping.md`) to its new location, or to its retirement with a reason;
    · Peter's standing discipline: the guide changes when the install process changes, with the why recorded, and **not** as a vote on every edit;
    · the remainder's owner.
    · **Instrument**: the ballot file exists, its commit is an ancestor of every 19.4 guide-content commit (`git merge-base --is-ancestor`), and the preservation table's row count equals the ballot's content-point count.
    · *(R2, Stacy R-11)* **The count has an outside source**: one preservation row per edit site of `.kiro/docs/ballots/2026-10-02-integration-guide-native-scoping.md` (Sites 1–4, its L46/L125/L188/L211) and per after-text block within each. **Red**: a site or after-text block with no row.
    · *(R2, Ada RC-6)* **Before 19.4's first commit, the cited ballot's `**Status**` reads RATIFIED** (Peter's merge of #268, `8d7d3ad1`). Today its L5 reads `**Status**: DRAFT`. **MISSING → Ada**: a one-line stamp in her own `chore/` PR, Peter-merged under the governance carve-out; the same PR closes the stale-ACTIVE `.kiro/issues/2026-10-01-integration-guide-m0a-vs-snapshot-negative.md`. **Instrument**: `grep -n '^\*\*Status\*\*: RATIFIED' <ballot>`. **Red**: no hit when 19.4 starts.
  - *(amendment 2026-10-03)* **A new platform is a new section** (PR-2). The region's platform-specific content sits under one heading, with one sibling sub-section per platform (web; iOS and Android), so that adding React and React Native (`.kiro/specs/128-react-react-native-platform-admission/`) means adding a sibling section, not rewriting the doc.
    · **Instrument**: criterion 2's heading-order test asserts that shape. It goes red if a platform sub-section sits outside the platforms heading.
    · *(R2, Leonardo L-RC5)* **Three sibling sub-sections, Web, iOS and Android**, under one `§ Platforms` heading, which sits after draft § 4 ("Your language vs our updating surface") in the order design C23's erratum states. Spec 129 may land one native platform first, and React and React Native arrive as two more siblings.
    · **Platform sub-sections carry no numbered path steps**, so a new platform never changes `path-steps`. A platform that needs a step is an install-process change under PR-2, with its why recorded. **Red** (the heading-order test): a numbered step inside `§ Platforms`.
  - *(amendment 2026-10-03)* **The release-3 scope sentence (PR-3) sits before step 1** of the region. It is identical in `README.md` and in the release-3 CHANGELOG entry (Task 22.4), and asserted on all three surfaces. Its three required parts are in § "Expected release count" (the 2026-10-03 amendment); the final wording is settled in this round by Leonardo and Ada.
    · **Red**: the sentence is absent from any surface, differs between surfaces, or follows step 1.
    · *(R2)* **The string is Leonardo's merged sentence**, in § "Expected release count", with Ada's fact-check of its third sentence owed before 19.1 commits it. It is **the region's first paragraph** (Leonardo L-RC5: a native reader should stop before installing Node). **Red, added**: the sentence is not the region's first paragraph.
  - *(amendment 2026-10-03)* **Criterion 5's native labels, made decidable (Ada).**
    · **Two asserted strings, version-free**, in the install region and in `README.md`: `reference source, not a build input` (Task 3.5's core) and `Native onboarding is not supported` (#268's core).
    · **The causes are prose, not asserted**: the theme surface that nothing emits; the 14 theme-varying colours; no Swift package or Gradle module; `ContainerCardBase.ios.swift` L816's unterminated comment.
    · **Per-platform verification target (Stacy's lens item 4)**: iOS and Android causes are verified by source read (Ada, 2026-10-03), and Kenya and Data confirm them in this round. Each build claim reads `not re-verified — toolchain unavailable`. *(R3, Kenya B2 and Data: **superseded** for the per-platform wording by the R2 bullet below — iOS `not built in this amendment`, Android `not build-verified — no Android toolchain has been run`. The string `not re-verified — toolchain unavailable` is asserted nowhere and written on no surface.)*
    · *(R2 — Kenya, Data and Ada; this bullet governs where it differs from the two above.)*
      · **Two causes added (Kenya B1, measured)**: the theme names are fixed to DesignerPunk's own configuration (`dpTheme`, `LocalDPTheme`), not the consumer's abbreviation (`TokenFileGenerator.ts` L1158, L1248, L1387–1389); and **nine iOS components spell the theme read as `@Environment(.dpTheme)`**, without the key-path backslash, a form that does not type-check against a defined key (Kenya's probe, 2026-10-03; `git grep -l '@Environment(\.dpTheme)'` → 9 files). Prose only; no new asserted string.
      · **What nothing emits**: `generateThemeOverrideBlocks` (`TokenFileGenerator.ts` L1028) and the Swift and Kotlin theme-type emitters have **no production caller** (Kenya, Data; read). The install doc never says `generate` emits a theme surface (Data's correction of his own R1 wording); Task 3.5's quoted compile label ("does not compile against a born repo's own tier as shipped") stays **out of the asserted set and out of the install doc**, because on Android it rests on a source read only.
      · **The "14 theme-varying colours"** is #268's 2026-10-02 measurement, not re-counted in this round. Its sources are named: `.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` (measured 2026-10-02), the guide's L387 at `79a3b3bc`, and Ada's spot check of the main checkout's `dist/DesignTokens.ios.swift` (base `colorActionPrimary`, `colorStructureCanvas` and `colorTextDefault` absent; only `colorActionPrimary_wcag`). *Scope: Ada read three of the fourteen.*
      · **Per platform, the build claim reads**: iOS `not built in this amendment` (the L816 parse failure was reproduced with `swiftc -parse`, Swift 6.2, Kenya, 2026-10-03); Android `not build-verified — no Android toolchain has been run` (Data: no Android build has ever been run against this tree). The causes on both are source reads (Ada; Kenya and Data confirmed, 2026-10-03).
      · **The sub-section sentences** are the platform owners' (prose, each containing both asserted strings): iOS, Kenya R1 § A; Android, Data R1 item 1. **No line number appears on a user-facing surface** (Kenya: "L816" rots); it stays in this causes list.
      · **Red**: either asserted string absent from the iOS or Android sub-section or from the README; a sub-section claiming a build was run.
  - *(amendment 2026-10-03)* **The README clause, read after `main` moved** (drift class D; the T2 (B) sentence was already untrue at `a6481d71`, and #271 narrowed it). README § "Getting Started" is **reconciled, not removed**:
    · its status line becomes the scope sentence;
    · it carries the founder path's five steps in C23 order, using `vocabulary.ts`'s forms, and criterion 1's path-step test extends to `README.md` (Leonardo);
    · its link is labelled "Install guide" and targets `docs/consumer/INSTALL.md`;
    · the *"True native implementations (Web Components, SwiftUI, Jetpack Compose)"* sentence (anchored by content; L57 at `79a3b3bc`) is replaced by the labelled form.
    · All four are asserted.
    · *(R2, Leonardo L-A4)* **What the README assertion counts**: the README's numbered list in § "Getting Started" has exactly `path-steps.founder` items (5), in C23 order (the README has no front matter of its own). The README carries **only** the scope sentence, the five steps, the "Install guide" link and the two label strings; the platform cause sentences stay in the guide's sub-sections. **Red**: a count other than 5, a step out of order, or a cause sentence on the README.
  - *(amendment 2026-10-03)* **Criterion 4's "119-B lint", defined.** No such instrument existed at `79a3b3bc`; it is built here (19.2) in `scripts/__tests__/install-doc.test.ts`, over the region. It covers Req 15.2's five constraints:
    · (i) route lines are section-less (`THEN consult <doc-id> (summary-first)`; no `§` inside a route) — checked;
    · (ii) the calibration cue cites `governance/classification-map.md § "certainty-calibration"` and names no emitting tool — checked, by the citation present and a denylist of tool names absent. *Scope: it catches a named emitter, not a paraphrased list*;
    · (iii) no MCP citation targets an identity doc — checked by `npm run check:section-citations` (its identity-doc class), which is cited, not re-implemented;
    · (iv) zero backstop aliases — checked (no `aliases:` in the guide's front matter);
    · (v) G1's misfit moves through the generator only — `none`: it is a constraint on agent text, not on the install doc.
    · **Red**: a violation of (i), (ii) or (iv), or a `check:section-citations` failure naming the guide.
  - *(amendment 2026-10-03)* **Req 3.2's re-entry guard**: no CONSUME-posture passage of the region instructs `generate` (asserted).
    · *(R2, Stacy R-12)* **The passage is delimited by heading**: from the region's "2 CONSUME" heading to the next heading of the same level. **Red**: the string `generate` in an instruction (a code span or a numbered step) inside that span. *Scope: prose that names `generate` without instructing it is not caught.*
    · **Install-doc string assertions import their expected CLI strings** from `src/cli/shared/vocabulary.ts` and `src/cli/shared/errorCatalog.ts`, never as literals, so a later Task 22 string change goes red here instead of drifting.
    · `vocabulary.ts` is read, not reworded. A rewording reaches Lina's CLI tests and needs her consult first.
  - *(amendment 2026-10-03)* **Cross-parent order (Stacy's lens item 6)**: 19.3's owed-AC rows are written after 20.1's `COMMIT-POLICY.md` exists (joining-path content agrees), and 19.5 runs after 22.2 (Leonardo reviews against the final CLI strings). *(R2, Leonardo L-A5)* **19.5 also runs after 22.3** ("`example-home.yaml` placed" is on his list). If his fold needs a CLI string changed, 22.2 reopens on the branch.
  - *(amendment 2026-10-03)* **The lock** (`canonical/generated.lock`; `governance` is a closure root, `tools/agent-generator/diff-guard.ts` L62–72).
    · It is refreshed **once at 19's close, by Thurgood**, by `npm run check:122:diff-guard`'s own full-run write, from a clean tree, and never hand-edited. **A refresh in which `outputs` moves is not a refresh: stop and report.**
    · Between refreshes a stale `inputClosure` runs `full-run-green`, not red (Lina, `diff-guard.ts` L276–301).
    · After any merge of `main` carrying a lock change, re-run the guard; never hand-merge the lock.
    · **19's completion doc names the non-root lanes it ran, or says each was not run**: `test:scripts`, `test:pack-contents`, `test:consumer`, and the `mcp-server` and `application-mcp-server` suites.

  **Primary Artifacts:** `docs/consumer/INSTALL.md`, `governance/DesignerPunk-Integration-Guide.md`, `README.md`, `src/cli/shared/vocabulary.ts`, tests, the build step deriving INSTALL.md *(amendment 2026-10-03: "the build step" reads as the committed derivation below; "tests" are named:)* `scripts/derive-install-doc.ts` (new, 19.4), `scripts/__tests__/install-doc.test.ts` (new, 19.2/19.4), `.kiro/docs/ballots/<date>-123-b-u3-install-guide.md` (new, 19.4: B-U3), `canonical/generated.lock` (refreshed once at 19's close, as in the criterion above)

  - [x] 19.1 `vocabulary.ts`; the doc in C23 order with prerequisites and native labels; the README L57 label + its string assertion *(amendment 2026-10-03: the region's scope sentence before step 1 (R2: as its first paragraph) and its per-platform section shape (R2: Web, iOS, Android siblings under § Platforms); the two asserted label strings; the README reconciled — status line, five steps, "Install guide" link, the labelled L57 sentence)*
  - [x] 19.2 Path-step counting test; heading-order test; 119-B lint; residual string assertions *(amendment 2026-10-03: in `scripts/__tests__/install-doc.test.ts`; the 119-B lint as defined above; stale-scope zero assertions; the Req 3.2 guard; imported CLI strings; the README in the path-step test)*
  - [x] 19.3 The ten owed-AC rows with quoted passages *(amendment 2026-10-03: after 20.1)*
  - [x] 19.4 **Integration Guide → served source of INSTALL.md content** (same doc-id; derived INSTALL.md; body-identity test) *(amendment 2026-10-03: B-U3 is its first commit; the marked region; `scripts/derive-install-doc.ts` and the committed `docs/consumer/INSTALL.md`; region identity with its bite; the remainder sweep and its table; the #268 preservation table; the lock refresh at 19's close)*
  - [ ] 19.5 Leonardo's review; fold *(amendment 2026-10-03: after 22.2. On the branch for him: the derived INSTALL.md and the guide, the markers, the remainder and preservation tables, the widened-grep output, the README diff, the scope sentence and labels with Kenya's and Data's confirmations, the test output, the rebuilt guide's `get_document_summary` outline from a local docs-MCP rebuild, and `example-home.yaml` placed)*

- [ ] 20. The commit policy and the `.gitignore` managed block

  **Type**: Implementation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Lina (Sonnet)
  **Traces**: Req 15A.1a · design C24, DD1, DD21

  **Success Criteria:**
  - `COMMIT-POLICY.md` reproduces C24's table.
  - `init` emits a `.gitignore` region ignoring exactly `token-index/` and `.designerpunk/`, with the commented platform-output line carrying the **configured `outputDir`**. Tested with two configs.
  - The `.gitignore` region round-trips through `sync` (outside lines byte-unchanged).
  - **A fresh clone of a policy-applied fixture runs joining steps 2–4 successfully**: `npm install` + `generate` succeed **and `.designerpunk/personal-note.local.md` is created** (Leonardo A8). *Scope: file-provable completeness, not harness session load.*
  - *(amendment 2026-10-03 — the U3 cut. Reads: Lina, Leonardo, Ada. Record: `feedback/tasks.md` § "U3 amendment round (2026-10-03)".)* **Cross-parent order (Stacy's lens item 6)**: **20.3 runs after 22.1.** Its note-creation clause is C26's `generate` behaviour, built at 22.1.
    · Lina's serial `src/cli/init.ts` chain is 20.2 → 21.3 → 22.1 → 20.3 → 22.2.
    · 20.1 and 20.2's `src/cli/shared/gitignoreRegion.ts` may run in parallel with Task 19.
    · *(R2, Lina RC-4)* **20.3's policy-applied repo is built at test time**, inside the Consumer Guard case in `tests/consumer-integration.test.ts`: `init` from the packed tarball → `git init && git add -A && git commit` → `git clone` → `npm install` (packed) → `generate`. **Nothing is committed**: a born repo under `src/` would be type-checked by full `tsc` (`tsconfig.json` includes `src/**/*`; the born config imports `.ts`-suffixed paths) and would rot against every later `init` change. If U5's join runs later want a committed fixture, its home is `tests/fixtures/…`, outside `tsconfig`'s include.
    · *(R2, Lina A-2)* **`init`'s region reads `loadConfig(dest).outputDir`, so it is emitted after the token copy** (the config `init` writes imports the copied tier). The two-config test uses a **pre-existing** config with a different `output`, which `init` keeps (`createFileIfNotExists`). If `loadConfig` fails, `init` reports and writes **no** block; it never guesses `./dist/tokens`. **Red**: a block written with a guessed path, or no report.
  - *(amendment 2026-10-03)* **The round-trip has a target-free region source.** The block's content is computed once, in `src/cli/shared/gitignoreRegion.ts`, from `loadConfig(...).outputDir`, and shared by `init` and `sync`. `sync` classifies it from that source, not from `emitConsumer`'s per-target output (`src/cli/sync/index.ts` L651–700 sees per-target regions only).
    · **Red**: outside lines change, or the region is missing after the `sync` round-trip (`src/cli/__tests__/sync.region.test.ts`, extended).
  - *(amendment 2026-10-03)* **`COMMIT-POLICY.md` ships** as an explicit `files[]` path, written by the packaging subtask (fork FK-2) with its `pack-assert` ADD-present row (Ada; design C5 erratum, 2026-10-03).
  - *(amendment 2026-10-03)* **The `.gitignore` block for repos born on 15.0.0, which have no block — PR-9 RULED: OFFER.** Peter: "Re: walkthrough 1, offer".
    · **When the upgrade command offers**: `sync` offers the block only when git is not already ignoring `.designerpunk/`. This is detected by effect (`git check-ignore -q .designerpunk/`), not by whether a block is present, so a repo that ignores it in its own lines gets no offer. *(R3, Lina RC2-3)* "Not already ignoring" means **`git check-ignore -q .designerpunk/` exits 1**. On exit 128 (not a git repository, or an error), or when `git` is not on PATH, no offer and no report is printed and nothing is written. The test gains a case: a non-git directory → nothing printed, zero bytes.
    · **It asks before writing.** *(R2, Lina RC-2, Leonardo L-RC7 concurring; inside PR-9's "asks before writing" and "report when non-interactive"; this replaces "under `sync`'s one batch confirmation", which contradicted the offer row's own `[y/N]`)* It writes only on an explicit **yes to its own question** (the offer row's `[y/N]`, default No), asked after `sync`'s report. Declining writes nothing and is asked again on the next interactive `sync`. It is its own question because it opts into a new policy in a file the consumer owns.
    · **When nobody can answer (non-interactive), it reports instead, and writes nothing.** *(R2, Lina RC-2)* **Off a TTY, `--apply` does not write it**: the report row is printed instead.
    · **The report carries a corrected remedy.** The `untracked-new` catalog row's remedy names `attach --target`, which is wrong for this target-free region. A new catalog row (design erratum, 2026-10-03) carries a remedy that is true for it.
    · **Instrument**: `src/cli/__tests__/sync.region.test.ts`, extended to three cases:
      · an unignored repo, interactive: the offer appears, and the region is written only after a yes;
      · an already-ignored repo: no offer;
      · a non-interactive run: the report and the corrected remedy, and zero bytes written;
      · *(R2, Lina RC-2)* `--apply` off a TTY: the report, and zero bytes written to `.gitignore`;
      · *(R2)* an interactive run answered No (or Enter): zero bytes written, and the offer recurs on the next interactive run.
    · *(R2, Leonardo L-RC7)* The offer and report strings are string-equal to the catalog rows as corrected in design.md (2026-10-03).
    · **Red**: any case misbehaves.
    · **Leonardo's position, NOT ruled (for this round)**: `generate` should also print a warning when it creates the note in a repo where `.designerpunk/` is not ignored, naming the risk (a routine `git add .` commits a personal note, the Req 18.5 defect) and the fix. Thurgood and Lina have no objection. If it is adopted, it folds into 22.1 with no subtask added. *(R2: **PR-13 RULED**, Peter: "Re: 3, agreed". Its criterion row, instrument and catalog row are in Task 22; it folds into 22.1.)*

  **Primary Artifacts:** `docs/consumer/COMMIT-POLICY.md`, `src/cli/init.ts`, tests *(amendment 2026-10-03 — widened to the paths the criteria force (Lina; Stacy's lens item 5):)* `src/cli/shared/gitignoreRegion.ts` (new), `src/cli/sync/index.ts`, `src/cli/sync/Classifier.ts`, `src/cli/shared/errorCatalog.ts` (PR-9's remedy row), `src/cli/__tests__/init.test.ts`, `src/cli/__tests__/sync.region.test.ts`, `tests/consumer-integration.test.ts` (20.3's packed fresh-clone case, built at test time; R2, Lina RC-4: the committed `src/cli/__tests__/fixtures/policy-applied-born-repo/**` fixture is dropped), `src/cli/sync/Prompter.ts` and `src/cli/sync/Reporter.ts` *(R2, Lina RC-3: the offer is a prompt and the report a report line; `sync/index.ts` imports both)*

  - [x] 20.1 `COMMIT-POLICY.md`
  - [x] 20.2 `.gitignore` region (configured path) + `sync` round-trip *(amendment 2026-10-03: `src/cli/shared/gitignoreRegion.ts`; the `sync` region source; PR-9's offer, report and corrected remedy)*
  - [ ] 20.3 Fresh-clone fixture through step 4 *(amendment 2026-10-03: after 22.1; R2: built at test time, nothing committed)*

- [ ] 21. The starter specs

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY Thurgood (Opus)
  **Traces**: Reqs 16, 17 · design C25, DD15

  **Success Criteria:**
  - The CI-needs spec gives every need a bite recipe and a two-sided price line, including "committed platform output matches `generate`" (structure test fails otherwise; need count recorded).
  - The re-grounding starter spec's tasks include the **report of what did not transfer**.
  - `init` scaffolds both into `specs/`, reporting on collision (`init.test.ts`).
  - *(amendment 2026-10-03 — the U3 cut. Reads: Ada, Lina, Thurgood. Record: `feedback/tasks.md` § "U3 amendment round (2026-10-03)".)* **The starter specs live at `src/cli/templates/starter-specs/**`.** They ship through the existing `src/cli/templates/` `files[]` entry, so no `files[]` edit is needed. This replaces `starter-specs/**`, which had no shipping path (Ada and Lina concur).
    · Each spec file gets a `pack-assert` ADD-present row, written by the packaging subtask (FK-2).
  - *(amendment 2026-10-03)* **Req 15B.5 covers the starter specs.** `scripts/__tests__/install-doc.test.ts`'s vocabulary-consistency block also reads both starter specs, against `src/cli/shared/vocabulary.ts`. *(R2, Stacy R-13: `install-doc.test.ts` is on Task 19's list, not Task 21's. **The starter-spec block lives in `scripts/__tests__/starter-specs.test.ts`**, Task 21's own file, importing the same `vocabulary.ts` forms; `install-doc.test.ts` keeps the guide and INSTALL.md.)*
    · **Red**: a lifecycle verb described in a starter spec differs from `vocabulary.ts`, or `attach` appears without its object.
  - *(amendment 2026-10-03)* **P3 tiering is explicit** (Req 17.3). The structure test asserts that every CI need carries a tier (minimal core or optional hardening), a bite recipe and a two-sided price line.
    · **Red**: a need missing any of the three. The test sits in `scripts/__tests__/starter-specs.test.ts` and is Thurgood's (21.1/21.2).
  - *(amendment 2026-10-03)* **21.3 is Lina's (Sonnet)**, so that one seat holds every `src/cli/init.ts` edit in U3. It is the scaffolding and the collision reporting, in `src/cli/__tests__/init.test.ts`.
    · **Order**: 21.3 runs after 21.1/21.2's files exist and before 22.2 (whose next steps list the `specs/` scaffold), inside the chain 20.2 → 21.3 → 22.1 → 20.3 → 22.2.

  **Primary Artifacts:** `starter-specs/**`, `src/cli/init.ts` *(amendment 2026-10-03: `starter-specs/**` reads `src/cli/templates/starter-specs/**`;)* `src/cli/__tests__/init.test.ts` (21.3), `scripts/__tests__/starter-specs.test.ts` (new, the structure test, 21.1/21.2)

  - [ ] 21.1 CI-needs spec
  - [ ] 21.2 Re-grounding spec
  - [ ] 21.3 Scaffolding + structure test *(amendment 2026-10-03: the scaffolding is Lina's; the structure test is written with 21.1/21.2 by Thurgood)*

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
  - *(amendment 2026-10-03 — the U3 cut. Rulings: Peter's PR-4, PR-5 and PR-8. Reads: Lina, Leonardo, Ada, Stacy. Record: `feedback/tasks.md` § "U3 amendment round (2026-10-03)". The C19 issue `.kiro/issues/2026-10-01-c19-personal-note-warning-unimplemented.md` is discharged here.)* **The personal-note mechanism, PR-4 RULED: mechanism B.**
    · **The reference is always emitted.** It already is at 15.0.0: `consumer-entry.ts` pushes the template member unconditionally, and all eight committed Kiro agent JSONs carry it (Lina, verified). So nothing rendered moves, and `tools/agent-generator/**` is untouched.
    · `init`, `generate` (`runGenerate` in `src/cli/designerpunk.ts`; `src/cli/generate.ts` does not exist), `attach` (not `--reference`) and `sync` **create the note from the template when it is absent** (Lina R2: every command that touches the note creates it, so an absent note cannot outlast any DesignerPunk command).
    · *(R2, Leonardo L-RC2; this governs, and design C26's erratum is corrected to match)* **Who prints what.** Every command that **creates** the note prints a creation row: `init` the naming row; `generate`, `attach` and non-migrating `sync` the "created" row; `sync --migrate-legacy` the naming row (**R3**, `.kiro/issues/2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md`). A command that **finds** an existing unfilled note prints the **unfilled-note warning**, exit 0 (Req 13, Req 18.5(iii)); it is a new catalog row (design erratum, 2026-10-03), entered in design.md first and then in `errorCatalog.ts`. **No run prints both.** (As first drafted, `attach` and non-migrating `sync` created the note silently.)
    · **An existing note is never overwritten** (Req 18.3), including an empty or unfilled one (R2, Lina RC-1).
    · **Posture gate**: the note is created only in a born (BECOME) repo, never in the steward checkout or in package mode. A test pins it.
    · **Instrument**: `src/cli/__tests__/personalNote.test.ts` (new; the rule's unit cases), plus, per command and per target, "absent → creation row only" and "exists unfilled → warning only", in `init.test.ts`, `attach.test.ts`, `sync.migration.test.ts`, `sync.test.ts` (non-migrating `sync`; R2, Lina RC-5) and `generate.personalNote.test.ts` (new, the `generate` path; R2, Lina RC-5).
    · **Red**: the note is not created where absent, is created in the steward or package mode, is overwritten when present, or a run prints both rows, neither, or a wrong string.
    · **The Kiro measurement** (owed since the C19 issue): run by Peter on 2026-10-03 with `kiro-cli 2.12.1`. A `file://` resource whose target is absent passes `agent validate`, starts the session with no warning, and lists as `(no matches)`, exactly as Kiro's own default entries do. So mechanism B's residual is benign on Kiro. The result is quoted in this round's feedback; **Lina records it in the C19 issue in her `chore/` PR**, *(R2, Lina)* **before U3's cut**.
    · CC's `@`-import of a missing file stays unmeasured until U5 (C8(c)).
  - *(amendment 2026-10-03)* **The note's content, PR-4 RULED, with Peter's PR-8 input.**
    · **The note is its own template**: PR-8, Peter: "the doc itself could be the template, and then it's just replaced/updated/overwritten with the user's response." The file created in the consumer's repo carries the prompts, and the user (or the agent's walkthrough) overwrites it with her answers.
    · **A few prompted slots, as `## ` headings**: who I am; what I or my organization value; how I like to communicate and collaborate. *(R2, Leonardo L-RC1, settled with Lina)* **All template guidance — the slot questions, the walkthrough-offer line and the pointer to the example — sits in ONE VISIBLE block between two marker comments, `<!-- dp:template -->` … `<!-- /dp:template -->`**, not in HTML comments under each slot. The block is visible whether or not a harness shows the agent HTML comments from an `@`-imported file (unmeasured for CC), and it lets Peter's "Mad Libs" sentence stems show in a Markdown preview. **Authoring constraint (22.0)**: every template-authored line other than a heading sits inside the marked block.
    · **The walkthrough-offer line** (Leonardo's words; it sits inside the block):
      > **For agents**: while this note holds nothing but its template (headings, this guidance, `TODO`), it is unfilled; do not read it as instructions about the person. If you are talking directly with the person (never as a delegated subagent), offer once in this conversation to walk them through it, one section at a time, writing their answers under each heading, outside this guidance block, in their own words. If they decline, offer to replace the file with one line of their choosing. Any answer of hers under the headings ends the offer.
      *(R3: two wording changes, both forced by the decided case "text inside an intact block → unfilled". Lina RC2-1: answers go "under each heading, outside this guidance block" (was "here"). Leonardo R2: "Any answer of hers under the headings ends the offer" (was "Any edit of theirs", untrue for an edit inside the block). Leonardo owns the final bytes at 22.0; the constraint is the implementer's.)*
    · **Frequency: at most once per conversation, never as a delegated subagent, and ended for good by any answer of hers under the headings** (Leonardo; R3 wording). The file is the memory, so no agent state is needed. *Residual: a Kiro user who switches agents before deciding can be offered once per agent conversation until she edits the file.*
    · **No command-line wizard**: `init` and `generate` always write the template verbatim (design erratum to C26, 2026-10-03: "On a TTY, init prompts" is withdrawn). *(R2, Leonardo L-A1: this limb is not in Peter's quoted words. It is part of the recommendation recorded as agreed under PR-4 in the orchestrator's record of the rulings, and **Leonardo and Lina hold it on the merits**: the founder's agent runs `init` off a TTY (A14), so a wizard serves the rare case.)* *(R3, Leonardo R2: **RULED under PR-4.** Peter's assent, "Re: 1, 2, & 4, agreed", answered the orchestrator's message whose item 4 carried the limb; the orchestrator's record of that line reads "Agreed small version: a template with a few prompted slots …; one line telling the agent to offer the walkthrough; an EDITED version of Peter's note shipped as the example; no command-line wizard; Leonardo words it." The R2 owner-position label is withdrawn.)*
    · **An edited version of Peter's note ships as the example.** It is never a resource or an import, and carries no résumé or CV reference (Req 18.2). **Peter approves the edited text by a dated committed record before it ships.**
    · *(R2, Leonardo L-RC4 (a), Stacy R-14)* **The approval is bound to bytes**: `.kiro/specs/123-consumer-distribution/design-inputs/personal-note.example.approval.md`, written by the orchestrator. It quotes Peter's words; names the example's `git hash-object`; lists each edit from his original note (kept / cut / reworded, with a reason), so he approves the edits and not only the result; and states that he knowingly re-ships an edited version of content D-live-4/A10 removed from the package. **Instrument**: `git hash-object` of the placed `src/cli/templates/personal-note.example.md` equals the recorded hash. **Red**: they differ.
    · *(R2, Leonardo L-RC4 (c))* **What the example may contain** is Leonardo's editing brief (`feedback/tasks.md` `[LEONARDO R1]` L-RC4 (c)), for Peter to overrule. Its first line reads "This is Peter's note, edited, shown as an example. Write your own." It carries no file path, no DesignerPunk process or governance reference, and no instruction binding "you, the agent". The human-harms passage, the "largely a tool" aside and the sign-off's profanity are **flagged for Peter's call, not cut silently**. **Instrument**: `grep -r "personal-note.example"` over every emitted consumer output in the 16.6 packed install → 0. **Red**: a hit.
    · *(R2, Leonardo L-RC4 (d))* **The template names the example's installed path**, `node_modules/@3fn/core/src/cli/templates/personal-note.example.md` (FK-1 (b)). **Instrument**: the 16.6 packed install asserts that the path exists. **Red**: it does not.
    · **Leonardo words** the template, the offer line and the example (22.0), in `.kiro/specs/123-consumer-distribution/design-inputs/`. Lina places them byte-identical at `src/cli/templates/personal-note.{template,example}.md` (FK-1 (b)), with an equality test.
    · *(R2, Lina A-1, Leonardo L-RC4 (b))* **Order**: 22.0's **template** lands before 22.1. The **example and its approval record** land before 22.3b.
    · **No requirements touch is owed**: Req 18.1's "onboarding personalizes it per user on install" is met by the walkthrough (Thurgood's reading; challenge it in the round). *(R2: Leonardo accepts it, provided the walkthrough is named at path step 4 (design C23 erratum). Lina A-5's trace from Req 18.5(i) is written into C26's erratum. **Evidence boundary (Stacy R-15)**: the asserted offer line proves that the instruction exists, not that onboarding personalizes the note. The latter is evidenced at U5 by a persona run's record, or Req 18.1's row reads `not re-verified`.)*
  - *(amendment 2026-10-03; R2 — **settled between owners**: Lina's replacement rule (RC-1) with Leonardo's change (L-RC1); both confirm PR-8's consequences)* **The detection rule.** One function in `src/cli/shared/personalNote.ts`, with no copy of the template at run time and no coupling to a template version. A note is **unfilled** iff, after removing **the marked template block** (`<!-- dp:template -->` through `<!-- /dp:template -->`, markers included), every other HTML comment, every Markdown heading line and every bare `TODO` token, **only whitespace remains**. **Absent** means the file does not exist (create it). **An existing file is never overwritten**, including an empty or unfilled one.
    · **How the rule treats the visible block**: the whole block is removed, markers to markers, before the whitespace test. So nothing inside an intact block ever makes a note filled: not the template's guidance, and not text she types inside it (decided below). Deleting a marker ends the block, and its text then counts as hers.
    · **Unit cases, each with its expected result** (Lina RC-1; Leonardo L-RC1):
      · absent → absent, created;
      · the template as created → unfilled;
      · an older template's slots, untouched → unfilled;
      · the template with CRLF line endings → unfilled;
      · comments deleted, `TODO` left → unfilled;
      · the template block deleted, slots `TODO` → unfilled;
      · an empty file → unfilled, not overwritten;
      · one slot filled → filled;
      · all slots filled → filled;
      · a user-added section with text, slots empty → filled;
      · a free rewrite without slots → filled;
      · `TODO: later` with text after it → filled;
      · markers deleted, block text kept → filled (an edit of hers);
      · *(R3, Lina RC2-2)* **one marker deleted, the other kept → filled**: an unmatched marker removes nothing, so the guidance text counts as hers (the rule "markers deleted, block text kept" and `RegionGrain.ts`'s missing-markers outcome). Markers are matched as whole trimmed lines, first pair wins, after CRLF normalization (Lina R2);
      · **text written inside an intact block → unfilled** (*decided in R2; Leonardo's R1 case read "filled"*). The rule cannot tell her words from the template's inside the block without a copy of the template, which is the version coupling RC-1 removes; and an agent reading that note sees the guidance still declaring it unfilled, so "unfilled" agrees with what the agent reads. The warning then tells her. **Owed at 22.0**: Leonardo's block wording directs answers under the slot headings, outside the block, and he confirms this case. *(R3: **decided**. Leonardo R2 withdraws his R1 "filled": "the joiner's agent and her CLI must reach the same verdict, and the agent sees the block's guidance still declaring the note unfilled"; "filled" would need a copy of the template. It is not silent: the next `generate`, `attach` or `sync` prints the warning, which now says where answers go. The "owed at 22.0" confirmation above is discharged.)*
      · *(R3)* **⟨RESOLVED in R4 — was PENDING PETER (b): the consequence of the block rule.⟩** The template cannot be filled **in place**: a template sentence left under a heading would read "filled" at creation, and completions typed inside the block are discarded. So in 22.0 the stems appear in the block as **example answers** ("e.g. *I'm ___, and I'm building ___*"), she writes her own line under each heading, and the stem-by-stem fill-in-the-blank experience lives in the **agent walkthrough** (PR-4's primary path). Peter is asked whether that narrowing of "Mad Libs" is acceptable; if not, the rule returns to the round. *(R4 — **the design stands as written.** Peter asked "Re: 2, tell me more, please"; the orchestrator explained the block rule, the three ways to fill the note (the agent walkthrough; by hand under the headings; replacing the whole file, which counts as filled) and what is lost (sentence stems with blanks in the file). He then asked "If it makes a difference, what do you think will mean most to the agents?", and after the answer directed "Please do" (pass it to Leonardo as input). He did not object and built on the design; he has not said "accepted". **The orchestrator reads his direction as acceptance; Peter's merge of this PR is the confirming act**, and the PR body says so.)*
    · **Bites recorded, two-sided**: force the rule to "filled" → the template-as-created case goes red; force it to "unfilled" → the one-slot-filled case goes red.
  - *(amendment 2026-10-03)* **The 16.6 flips** in `tests/consumer-integration.test.ts`, three sites, anchored by test title:
    · "the personal note is ABSENT in both installs until U3" → present after `init`, with the template's content;
    · the CC case "every import resolves except the (absent) personal note" → every import resolves;
    · the Kiro case's named-but-absent exception → all resolve.
    · The release-3 CHANGELOG (22.4) names one fix: `initBornRepoMessage`'s "(generate creates it)" (design catalog row "`init` in a born repo (A7)"; R2, Lina RC-9: anchored by label, not line), false at 15.0.0 and made true here.
    · *(R2)* The same file's comment naming `templates/personal-note.template.md` (L364 at `f7aec0aa`) is corrected to the FK-1 (b) path in 22.1.
  - *(amendment 2026-10-03)* **The named-default notice**: its catalog row **exists** (design catalog row "bare `init` default notice (A2)"; R2, Lina RC-9: anchored by label, not line), verbatim Leonardo A2: `no --target given — set up for Claude Code (the default). Using Kiro? npx designerpunk attach --target=kiro`. `src/cli/shared/errorCatalog.ts` has no function for it at `79a3b3bc`.
    · 22.2 adds the function and prints the notice **first** on bare `init`. The sequenced restart row stays **last**.
    · **Instrument**: `init.test.ts` string-equal, on the expected order.
  - *(amendment 2026-10-03; R2, Leonardo L-RC3)* **The note's existing rows teach three slots and the walkthrough.** The catalog rows "personal-note naming", "**generate created the personal note**" and "`init` in a born repo (A7)" still teach the two-slot note with no walkthrough; their corrected strings are design.md errata (2026-10-03). C23's founder and joining step 4 gain "or, after the restart, ask your agent to walk you through it". `path-steps` is unchanged: step 4 is still one user action.
    · **Instrument**: 22.2's string-equal tests (labels unchanged, strings moved) and 19.2's imported-string assertions. **Red**: an old string.
  - *(amendment 2026-10-03)* **The `product/` scaffold** lives at `src/cli/templates/product/**`, which ships through the existing `src/cli/templates/` entry.
    · **Leonardo authors the content of every file `example-home.yaml` references** (in `design-inputs/`; same placement and equality pattern). Lina owns the mechanics. *(R2: Leonardo expects that to be one template file and nothing else — no domain object, and no product token with a `ref`, since `token-index/` does not exist before `generate`.)*
    · *(R2, Leonardo's question)* **`product/overview.yaml`** is not referenced by the screen, but 28.3's bar reads its product name. Thurgood's read: Leonardo authors its content and Lina owns the product-name substitution. *(R3: **confirmed by Lina R2.** Leonardo authors `design-inputs/overview.yaml` with one literal placeholder for the product name; Lina's `init` substitutes it, replacing today's `generateOverview()` in `src/cli/init.ts`. **Instrument**: an equality test — the placed template equals Leonardo's file byte for byte, and the scaffolded file equals it after substituting a fixed test name. **Red**: either differs.)*
    · **The validity guard's state and classes**: the born repo immediately after `init`, from the packed install, before `generate` (so no `token-index/` exists). The product index status reads `healthy`, with zero `_componentGaps`, and every template and domain-object name the screen references exists in the scaffold. *(R2, Leonardo L-RC6)* **`healthy` means zero warnings** (`product-mcp-server/src/indexer/ProductIndexer.ts` L158–161: any warning is `degraded`). The template and domain-object existence limb is **the guard test's own check**, because the indexer indexes those names without resolving them.
    · **Ui-tree token names are checked by Leonardo against the Application MCP and recorded as an inspection**, not a mechanical claim. *(R2)* The inspection is a table in 22.3's completion doc: token → `get_token_details` result.
    · Status fields are honest: web only; iOS and Android `not-started`. *(R2, Stacy A-6: asserted by the guard test.)*
    · **Bite**: break a reference in `example-home.yaml` → red. *(R2, Leonardo L-RC6: that bite can pass with gap detection silently off — `GapDetector.ts` L64–70 disables itself with a console line when no component root exists. **Two bites**: (1) a misspelled component name in `example-home.yaml` → red, proving gap detection is live in the packed born repo; (2) a missing referenced template → red, from the guard's own existence check. **Red** (for the criterion): either bite stays green.)*
  - *(amendment 2026-10-03; R2 — **FK-1 SETTLED between owners: (b)**. Ada moved to (b) in her R1; Lina and Thurgood held it; Stacy holds it on verifiability; Leonardo has no objection.)* **The note template and the example live at `src/cli/templates/personal-note.template.md` and `src/cli/templates/personal-note.example.md`.**
    · They ship through the existing `src/cli/templates/` `files[]` entry, so **no `files[]` line** is added for them. The CLI already reads shipped templates by name from `pkgRoot/src/cli/templates/` (Ada: `src/cli/attach.ts` L431, L479; `src/cli/sync/KeyGrain.ts` L125).
    · Design C5 L262 (`templates/personal-note.template.md`) and C20 L666 are corrected by erratum (2026-10-03). L666's claim that `consumer-entry.ts` reads the template is not true of the code: template members are "referenced, never emitted" (Lina, verified).
    · Each file is covered by 22.3b's `src/cli/templates/**` exact set.
    · *Surviving counter (Ada)*: an edited copy of Peter's note sits in the steward's `src/` tree, which `check:drift`'s `SCAN_DIRS` and any future `src/**` content scanner will read as prose. Harmless today. *(Leonardo)*: the installed path reads like code internals to a person following the pointer; an agent finds it either way.
  - *(amendment 2026-10-03; R2 — **FK-2 SETTLED between owners: (a)**, with Lina's condition. Ada and Thurgood held (a); Lina accepted it on one condition; Stacy holds (a).)* **The packaging subtask is 22.3b, after 22.3 and before 22.4, by Ada (Sonnet)**, so that one author writes every hunk. It covers every U3 `files[]` line (explicit paths: `docs/consumer/INSTALL.md` and `docs/consumer/COMMIT-POLICY.md`) and every `scripts/pack-assert.ts` section-9 ADD-present row (`deferred ADD present: …`, outside the ≥ 14 publish-path floor). There is no 19.0.
    · **Lina's condition is met by FK-1 (b)**: the template must be in the packed install before 22.1's Consumer Guard flips run. It ships through the existing `src/cli/templates/` entry (`package.json` L31 at `f7aec0aa`), so no `files[]` edit precedes 22.1.
    · **No packed-install test is red between 22.1 and 22.3b** (Stacy's concern; checked by reading at `f7aec0aa`): `pack-assert`'s rows over the tarball name `src/cli/templates/` only as the declared-floor `mcp-config.json.template` (L120); its only personal-note row is `.kiro/steering/personal-note.md` ABSENT (L390), which the new paths do not match; `steeringSetDiff` reads `.kiro/steering/` only; and no test compares the tarball against an exact file list (`tarball-target.json` has no reader). The exact set over `src/cli/templates/**` arrives at 22.3b, written against the files then present.
    · *(Ada RC-2)* **The exact-set row is checked against an explicit expected list in `pack-assert.ts`, never derived from the tree**, so adding a template is a row edit. Its function gets unit cases in `scripts/__tests__/pack-assert.test.ts`, like `steeringSetDiff`'s. **Bite recorded**: a stray file → red; a removed file → red.
    · *Surviving counter (Lina)*: between U3's cut and 22.3b, nothing asserts that `docs/consumer/**` ships. Nothing in U3 reads those files from a packed install, so the gap is invisible, not harmful.
  - *(amendment 2026-10-03; R2 — **PR-13 RULED**, Peter, 2026-10-03: "Re: 3, agreed" — Leonardo's L-RC8.)* **When `generate` or `attach` creates the note in a repo where `git check-ignore -q .designerpunk/` fails, it warns.** This is the case PR-9's offer cannot reach: the joining path never runs `sync`, so a teammate who clones a 15.0.0-born repo (no block) gets her note created by `generate` in an unignored directory. *(R3, Lina RC2-3: "fails" means **exits 1**. On exit 128, or with no `git` on PATH, no row is printed. The instrument gains a case: a non-git directory → no row.)*
    · It prints the catalog row "**personal note created in an unignored directory**" (design erratum, 2026-10-03; Leonardo's text), immediately after the creation row. It folds into 22.1; **no subtask is added**.
    · **Instrument**: `src/cli/__tests__/generate.personalNote.test.ts` and `src/cli/__tests__/attach.test.ts`, string-equal against the row: note created in an unignored repo → the row; note created in an ignored repo → no row; note already present → no row (nothing was created).
    · **Red**: the row missing in the unignored case, printed in the ignored or already-present case, or a string that differs from the catalog.
  - *(amendment 2026-10-03; R3 — Ada R2 advisory, taken by Lina into 22.1 at no subtask cost.)* **`generate`'s "Themes:" line stops implying output.** `runGenerate` prints `Themes: <name> (<mode>)` for every registered theme (`src/cli/designerpunk.ts` L241–242), although nothing is emitted for them, which contradicts the scope sentence's third sentence at the moment a consumer runs `generate`.
    · It gains the suffix in the catalog row "**generate — registered theme not emitted**" (design erratum, 2026-10-03; Ada's draft text, Leonardo's final wording before 22.1).
    · **Instrument**: a string-equal assertion in `src/cli/__tests__/generate.personalNote.test.ts` with one registered theme. **Red**: the bare `Themes: <name> (<mode>)` line, or a string that differs from the catalog.
    · It comes off when Spec 129's item (i) lands, through a dated amendment.
  - *(amendment 2026-10-03)* **The G2 backstop, mechanical** (Peter's PR-5; Stacy's lens item 7). 22.5 opens U3's PR only if one of these holds on the PR head:
    · `git merge-base --is-ancestor <U3g's squash SHA> HEAD` succeeds (U3g merges only on a cycle-2 verdict that reads `HOLDS`, Task 30); **or**
    · Peter's dated re-ruling is committed in `.kiro/issues/2026-10-02-g2-pass-four-findings.md` (R2: in a section that names 22.5; the hold's lift record, § "Hold lifted", is a separate act).
    · The PR body names which of the two it rests on.
  - *(amendment 2026-10-03)* **U3's no-overlap test** (Stacy's condition (b), Peter's PR-5.2). It runs at the cut (a row in U3's first instruments block) and again at 22.4. *(R2, Stacy B3 and Lina RC-6: the range and the path list are corrected; this governs the first draft's `<cut SHA>..HEAD` form, which would go red by construction at 22.4, because condition (c) has U3 merge `main` after U3g lands.)*
    · `git diff --name-only $(git merge-base HEAD origin/main) HEAD -- canonical/profiles/consumer canonical/operative-sets canonical/agents canonical/shared canonical/consumer-profile.yaml canonical/_consumer-output tools/agent-generator .kiro/steering` prints nothing, **on a head where `122-diff-guard` is green**. That is U3's own net delta: at the cut and at 22.4 it prints nothing.
    · Changes to `governance/**` and `package.json` reach the check only by regenerating `canonical/_consumer-output/**`, which the required `122-diff-guard` forces, and which is in the list. So `governance/**` stays out of the list (Stacy, answering Lina: Leonardo's only guide reference is a section-less route, `canonical/agents/leonardo.md` L109–111).
    · Widen the path set to U3g's declared trigger set (Task 29, criterion G2-F2) once that is merged.
    · **Red**: any path printed. A red holds 22.5. The 22.4 completion doc cites the green `122-diff-guard` run.
    · Under mechanism B U3 touches none of these paths (Lina's sizing note); the test is the mechanical proof.
    · **U3 merges `main` after U3g lands and before 22.4** (Stacy's condition (c)).
  - *(amendment 2026-10-03)* **22.4's CHANGELOG entry** carries:
    · the release-3 scope sentence (identical to the install doc's; asserted);
    · the `initBornRepoMessage` fix;
    · and the treatment of 15.0.0's G2 limit disclosures, matched to U3g's verdict.
    · **The lock** is refreshed once at 22.4 by Lina, by the guard's own write from a clean tree, with the "outputs moved → stop" rule.
    · Full validation names the non-root lanes run (`test:scripts`, `test:agent-generator`, `test:pack-contents`, `test:consumer`, the `mcp-server` and `application-mcp-server` suites) or says each was not run.

  **Primary Artifacts:** `templates/personal-note.template.md`, `src/cli/{init,generate}.ts`, the `product/` scaffold incl. `experience-map/pages/example-home.yaml`, tests, `CHANGELOG.md` (release 3) *(amendment 2026-10-03 — widened to the paths the criteria force (Lina, Leonardo, Ada; Stacy's lens item 5); `src/cli/{init,generate}.ts` reads `src/cli/init.ts` and `src/cli/designerpunk.ts`; the template and example paths per FK-1; the `product/` scaffold reads `src/cli/templates/product/**`:)* `src/cli/designerpunk.ts`, `src/cli/shared/personalNote.ts` (new), `src/cli/shared/errorCatalog.ts`, `src/cli/attach.ts`, `src/cli/sync/index.ts`, `src/cli/templates/product/**` (new), `src/cli/__tests__/personalNote.test.ts` (new), `src/cli/__tests__/{init,attach,errorCatalog,sync.migration}.test.ts`, `tests/consumer-integration.test.ts`, `.kiro/specs/123-consumer-distribution/design-inputs/{personal-note.template.md,personal-note.example.md,example-home.yaml}` (Leonardo; with their companions), `package.json` (the `files[]` lines only; author per FK-2), `scripts/pack-assert.ts` (author per FK-2), `canonical/generated.lock` (once, at 22.4) *(R2: FK-1 settled (b), so `templates/personal-note.template.md` reads `src/cli/templates/personal-note.template.md`; FK-2 settled (a), so `package.json` and `scripts/pack-assert.ts` are Ada's, at 22.3b. Added, by Lina RC-5, Ada RC-2, Leonardo L-RC4 and Stacy R-14:)* `src/cli/templates/personal-note.template.md` (new), `src/cli/templates/personal-note.example.md` (new), `src/cli/__tests__/generate.personalNote.test.ts` (new), `src/cli/__tests__/sync.test.ts`, `scripts/__tests__/pack-assert.test.ts` (Ada, 22.3b), `.kiro/specs/123-consumer-distribution/design-inputs/personal-note.example.approval.md` (new; the orchestrator's record of Peter's approval, 22.0) *(R3, Lina RC2-4 (a):)* `.kiro/specs/123-consumer-distribution/design-inputs/overview.yaml` (new; Leonardo), with its placed template under `src/cli/templates/product/**`

  - [ ] 22.0 (Leonardo) The note template (prompted slots; the walkthrough-offer line) and the edited example of Peter's note, in `design-inputs/`; Peter's dated approval of the example *(added 2026-10-03, Peter's PR-4; R2: the template before 22.1, the example and its approval record before 22.3b; the approval record at `design-inputs/personal-note.example.approval.md`)* *(R4: input — `feedback/tasks.md` § "U3 amendment round (2026-10-03)", "Input for 22.0 (orchestrator, at Peter's direction)"; input, not a ruling. **PROPOSED, not ruled**: before the template ships, Peter runs the walkthrough himself on a scratch repo (about ten minutes); to be confirmed by Peter at the sitting where he approves the edited example.)*
  - [ ] 22.1 Personal note: template, personalization, create-if-absent, all-`TODO`-as-absent *(amendment 2026-10-03: mechanism B; `src/cli/shared/personalNote.ts` and the detection rule; placement of 22.0's files (equality test); create in `init`, `generate` and `sync --migrate-legacy` (R3); the unfilled warning in `generate`, `attach` and `sync`; the posture gate; the three 16.6 flips; Leonardo's `generate` warning if adopted in this round; R2: the marked-block detection rule, who prints what, and the unignored-directory warning (PR-13 RULED); R3: the "Themes:" suffix, no subtask added)*
  - [ ] 22.2 C27 completion: restart line, hatch, note naming, next steps; collision strings *(amendment 2026-10-03: after 20.3; the named-default notice first; next steps list the `.gitignore` block and the `specs/` scaffold; R2: the corrected naming, created and born-repo rows)*
  - [ ] 22.3 (Leonardo) `example-home.yaml` in `design-inputs/`; (Lina) placement (equality test) + scaffold mechanics + validity guard *(amendment 2026-10-03: `src/cli/templates/product/**`; companions authored by Leonardo; the guard's state and classes as above)*
  - [ ] 22.3b Packaging: every U3 `files[]` line and `pack-assert` row, plus the `src/cli/templates/**` exact set *(added 2026-10-03; FK-2 settled (a) in the round: here, by Ada (Sonnet), against an explicit expected list with its unit cases)*
  - [ ] 22.4 Release-3 CHANGELOG entry; full validation *(amendment 2026-10-03: after U3 merges `main` carrying U3g; the no-overlap re-run; the lock refresh)*
  - [ ] 22.5 (Leonardo) DD9 confirmation; open the U3 PR *(amendment 2026-10-03: the mechanical G2 backstop)*

### UNIT 3c — Consumer-profile corrections *(added 2026-10-03, R2; Peter's PR-11 and PR-12)*

**Why this unit exists.** Peter's PR-11 (FK-5), 2026-10-03, verbatim: `Re: 1, agree with "before"` — the profile wording corrections land **before** the G2 cycle-2 unit, **as their own PR** (Stacy's option: it keeps the profile author's edits out of the cycle that judges the profile). Peter's PR-12 (FK-6): "Re: 2, agreed, but we might express that this is being addressed and should be resolved soon" — the second false promise, in `#ios-theming-spec-094` and `#android-theming-spec-094`, is fixed in the same round.

**Why a declared unit, not an issue-driven `chore/` PR** (Thurgood's choice of form, R2): it re-signs operative signed rows and moves consumer agent text that ships, so it rides release 3's RELEASE pass. That pass reads parent criteria rows and their completion docs, `completion-criteria-parity` evaluates the rows, and the tripwire counts the unit. A unit here gives all three a referent, and its row grants the seats write scope (T1-(B)) without a separate issue-row grant. *Surviving counter: a fourth record shape for six subtasks of mostly wording, and one more Peter-merged PR on release 3's critical path ahead of U3g.*

**How it relates to the other units**: it runs beside U3 and **merges to `main` before U3g's branch is cut** (§ "How the units run"). It is outside the U1 → U5 chain, so tripwire Limb 2 does not apply between it and U3 or U3g.

- [ ] 31. The consumer-profile corrections: the intro line, the Kiro blank line, the theme cue and the two theming units (**U3c gating parent**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY **Thurgood (Opus)** — the profile author; Lina (Sonnet) — the `render.ts` and `adapters/kiro.ts` edits and the regeneration. The signers' re-sign acts are attestations, outside every line.
  **Traces**: Reqs 11.1, 11.8, 12 · design C15, C19 · `completion/claims-pass-release-15.0.0.md` finding R-1 and J divergents 5–9 · `.kiro/issues/2026-10-02-ground-truth-intro-line-stale-generated.md`, `.kiro/issues/2026-10-02-kiro-ground-truth-heading-no-blank-line.md`

  **Success Criteria:**
  - **The batch is exactly these five things, and nothing else** (PR-11, PR-12): *(R3 — Stacy C-3, Kenya R2, and the orchestrator's class fix: it is **these five things, every further hit of 31.0's broad sweep that is dispositioned "correct here", and the declared cite-only commit (31.3)**. The five are the known seeds; the sweep, not this list, is the instrument of completeness.)*
    · (i) the ground-truth intro line's reword (`.kiro/issues/2026-10-02-ground-truth-intro-line-stale-generated.md`): Thurgood words it, and Lina edits `tools/agent-generator/render.ts` as a shared-template reword, which moves the steward outputs too;
    · (ii) the Kiro `## Ground truth` blank line (`.kiro/issues/2026-10-02-kiro-ground-truth-heading-no-blank-line.md`, `tools/agent-generator/adapters/kiro.ts`), placed in the **container span**, never in the preceding body unit's last span (Kenya);
    · (iii) claims-pass finding R-1's cue, **removed, not reworded** (Data): `canonical/profiles/consumer/data.overlay.md` L159 becomes "regenerate your platform token output and product tokens from your token source and `designerpunk.config.ts`", and `kenya.overlay.md` L160 takes the same form. The theme returns when Spec 129's item (i) lands, never in this unit;
    · (iv) **`#ios-theming-spec-094` and `#android-theming-spec-094`** (PR-12): each states what `generate` produces today (no theme types), says the gap is being addressed, and points at Spec 129 by name, **with no date** (Peter's input: "we might express that this is being addressed"; the orchestrator's caution, not a ruling: 15.0.0 announced no promise and the follow-on has no start date);
    · (v) divergent 5's "for your themed values" qualifier, put to Data, who resolves it at the round on the text then in front of him. *(R3, Data R2: it stays, for his R1 reason.)*
    · *(R3, Data R2)* **(iv) moves an operative item, not only text.** `theming-1` (`canonical/operative-sets/data.yaml` L83, "generated Kotlin output includes …") is **replaced, not kept**: the row gains a `removals` entry for it (Thurgood authors the cite) in the authoring commit, and Data's re-sign records the new `assent.surviving` set. This is not one of the cite-only corrections of divergents 6, 8 and 9, because the rendered text moves with it. The same holds for whichever of Kenya's `#ios-theming-spec-094` items (`theming-1`–`theming-3`) his replacement bullets no longer state as written; his read and the stale list decide which. Bullets 4 and 5 stay verbatim, so `theming-4` and `theming-5` do not move (Kenya R2).
    · *(R3, Kenya R2; seeds of the broad sweep, read at `e2e40ca6`)* **Known further hits**: `kenya.overlay.md` L147, the `commands[product-screen-commands]` gap text ("theming Swift materializes here via `npx designerpunk generate`"; the row is unsigned, `kenya.dispositions.yaml` L78, so authoring only: the parenthetical is removed); `kenya.overlay.md` L27 and `data.overlay.md` L27, the `#in-scope` bullets (theme-varying colours via the theme surface; unsigned; Kenya's suggestion: "… once your generated output includes it"); `kenya.overlay.md` L39 and `data.overlay.md` L39 (the provider pattern, kept as the intended shape under the PR-12 wording). **To check at 31.0, UNVERIFIED**: `#product-tokens-spec-108109` (rendered kenya L76, "Theme-varying tokens: protocol extension on `{Name}Theme`") — if the Swift product-token emitter does not produce it without the theme protocol, it is carried by name to Spec 129, not added here (Kenya's recommendation).
    · *(R3)* **⟨RESOLVED in R4 — was PENDING PETER (a): the PR-12 wording.⟩** Peter wrote "is being addressed and should be resolved soon". **Data's** text says "DesignerPunk plans to address this … (Spec 129), with no date set", because Spec 129 is a placeholder with no formalization started, so "is being addressed" is not yet true in the work sense. **Kenya's** text uses Peter's framing ("Emitting them is being addressed and should be resolved soon, as part of DesignerPunk's consumer-generation completeness work (Spec 129)") and records the residual that "soon" in shipped text is a promise. Both texts are in `feedback/tasks.md` (`[DATA R2]`, `[KENYA R2]`); the orchestrator recommends Peter accept "plans to address". Whichever he picks applies to both platforms, with no date either way. *(R4 — **PR-14 RULED**, Peter, 2026-10-03: "Re: 1, \"plans\" is fine". **"Plans to address" for both platforms**, with no date, as in Data's text; Kenya's iOS bullets take the same verb. Kenya gives his one-line sign-off on the reworded iOS text at 31.2's read.)*
    · **Instrument**: `git diff --name-only $(git merge-base HEAD origin/main) HEAD` ⊆ this parent's Primary Artifacts; and `git grep -n -E "including your theme (Swift|Kotlin)|Generated (Swift|Kotlin) output includes|materializes here" -- canonical/profiles/consumer canonical/_consumer-output` → 0 (R3: `materializes here` added, Kenya R2). **Red**: a path outside the list, or a hit.
  - **Who words what.** Thurgood authors and commits every text change. Kenya (iOS) and Data (Android) word (iii) and (iv) with him and read each before it is committed, as signers. *(R3, Stacy C-3; Kenya accepts)* **Kenya and Data also read each cite change (31.3) before it is committed**, because those changes move no hash and so no act follows them; the completion doc quotes each before/after pair and their read. **Red**: a cite change committed without the signer's read recorded. Their signatures are separate acts in separate commits. **Ada fact-checks** (iii) and (iv) against Task 19's label causes (her FK-5 condition: nothing emits a theme Swift or Kotlin surface). The completion doc quotes each before/after pair. **Red**: a text committed without the owner's read recorded, or a new text that claims generated theme output.
  - *(R3 — the class fix)* **31.0 opens with a broad sweep, not a list of known lines.** Over `canonical/profiles/consumer/{kenya,data}.overlay.md` and every rendered consumer text of both seats (`canonical/_consumer-output/{_canonical,cc,kiro}/**/{kenya,data}*`, sidecars excluded), for any claim that theme code is generated or materializes:
    · `git grep -n -E 'theme (Swift|Kotlin)|[Gg]enerated (Swift|Kotlin) output|materiali[sz]e|\{Name\}Theme|\{Abbreviation\}Theme|\{abbreviation\}Theme|ThemeKey|theme types' -- <those paths>`
    · The output is pasted, and **every hit is dispositioned** in the completion doc: corrected here, kept as true (with the reason), or carried by name to Spec 129. Data runs the same disposition on his side, Kenya on his.
    · The seed run at `e2e40ca6` (Thurgood, R3) gives 9 overlay hits (kenya L27, L38, L39, L147, L160; data L27, L38, L39, L159) and 5–6 per rendered file. The pattern is a floor: a hit-shaped claim it misses, found later, is appended under the instruments block's `## Found later`.
    · **Red**: an undispositioned hit; after the batch, a re-run whose hits are not all "kept" or "carried".
  - **Pre-edit instruments (31.0; Kenya, Data):**
    · the freshness stale list, taken on the branch before any edit and pasted (expected empty);
    · `renderedHashOf` for Kenya's and Data's rows the edits are expected to move, and for Data's `routes.cues[9]` and trims rows, taken before the Kiro blank-line edit and pasted.
    · *(R3, Kenya R2, Data R2)* **The expected signed set, by name**: Kenya — `ambient.groundTruthManifest.verdict`, `commands[platform-tokens]`, `#ios-theming-spec-094`; Data — `ambient.groundTruthManifest.verdict`, `commands[platform-tokens]`, `#android-theming-spec-094`. Any other Kenya or Data row on the post-edit stale list is the red limb below. (Other seats' `verdict` rows the intro reword moves are named by the stale list.)
    · **Red**: a Kenya or Data body row that the batch does not explain appears on the post-edit stale list.
  - **Cite-only corrections stay outside the round.** Divergents 6, 8 and 9 (subtraction-3 `cites`) move no hash (`tools/agent-generator/regrounding/freshness.ts` L363–369, read). They are made in **their own commit**, declared and counted separately (signing-act ballot clauses 4–5), and never folded into the re-sign batch. **Instrument**: the stale list after that commit equals the list before it. **Red**: a row moves.
  - **Divergent 7** (`#with-peter`, `human-4`): no text change is proposed (profile author, following its signer, Kenya R1 § C), so no act is owed; it is carried by name at release 3 and closed under RS-1.
  - **One re-sign round, within Stacy's batching limits** (her U3-kickoff read § 5; ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`):
    · the freshness stale list is taken **after the last authoring commit**, re-taken each round, and pasted into the U3c PR body together with one line per act, `<dispositions file>#<row> — <seat> — <sha7>` (Stacy R-7; ballot clause 3, L41, and clause 6(iv), L44);
    · only rows on that list are in bound; a re-sign of any other row is out of bound and needs its own grant;
    · a disposition change with no hash move is out of bound: declared, granted and counted separately;
    · profile-author edits never share a commit with a seat's signing commit, and seat commits enter by merge only, never amended, rebased or cherry-picked (§ 4.6);
    · the expected signers are **Kenya and Data**; the intro reword may also move other seats' `ambient.groundTruthManifest.verdict` rows, and **the stale list names the set**. A Stacy-signed row it moves is disclosed and falls in Peter's sample (trigger (d));
    · **until Thurgood's RS-1 erratum lands, a re-sign is a new act, not a closed divergent**; if any divergent is to *close* here, RS-1 lands first.
  - **The lock**: one refresh after the round, by `npm run check:122:diff-guard`'s own write, from a clean tree. **`outputs` moves here by design**, so every moved output path is listed in the completion doc, and **any moved path outside `canonical/_consumer-output/**`, `.claude/agents/**` and `.kiro/agents/**` is the stop.**
  - **Order**: U3c merges before U3g's branch is cut. **Instrument**: `git merge-base --is-ancestor <U3c squash SHA> <U3g branch base>` (cited in Task 29). **Red**: it is not.
  - `npm test`, full `tsc`, `npm run test:agent-generator` (including `tools/agent-generator/__tests__/consumer-entry.parity.test.ts`) and `npm run check:122:diff-guard` are green on the branch. The U3c PR body carries the tripwire line.

  **Primary Artifacts:** `canonical/profiles/consumer/**` (author edits and seat signatures in separate commits), `tools/agent-generator/render.ts`, `tools/agent-generator/adapters/kiro.ts`, `tools/agent-generator/__tests__/**` (only tests that assert the reworded strings), `canonical/_consumer-output/**`, `.claude/agents/**` and `.kiro/agents/**` (regenerated, never hand-edited), `canonical/generated.lock`, this parent's completion doc

  - [ ] 31.0 Pre-edit instruments: the stale list and the `renderedHashOf` baselines, pasted *(R3: opens with the broad theme-claim sweep, every hit dispositioned; the expected signed set named)*
  - [ ] 31.1 The intro-line reword (`render.ts`) and the Kiro blank line (`adapters/kiro.ts`, container span)
  - [ ] 31.2 The cue removals and the two theming units (PR-12), worded with Kenya and Data; divergent 5 put to Data *(R3: plus every sweep hit dispositioned "correct here"; the `theming-1` removals)*
  - [ ] 31.3 Regenerate; the cite-only corrections (divergents 6, 8, 9) in their own commit, declared outside the round *(R3: each read by its signer before commit)*
  - [ ] 31.4 One re-sign round within Stacy's limits; the lock refresh
  - [ ] 31.5 Full validation; open the U3c PR (tripwire line)

### UNIT 3g — G2 cycle 2: the corrected derivation check on the shipped profile *(added 2026-10-03; Peter's PR-5)*

**Why this unit exists.** G2 pass four's findings G2-F1, G2-F2 and G2-F3 (`completion/re-grounding-pass-four.md` § "Findings"; tracked in `.kiro/issues/2026-10-02-g2-pass-four-findings.md`) are fixed in a new falsification cycle, never by a patch inside U2 (Task 18, criterion 5).

**Peter's PR-5 governs it**: "I support whatever decision that need to be made to make sure this issue is solved optimally — not with a bunch of workarounds that create more work than necessary", and "I agree with all the recommendations" (the six points, PR-5.1–PR-5.6, recorded in `feedback/tasks.md` § "U3 amendment round (2026-10-03)").

**How it relates to U3**: it runs beside U3 (§ "How the units run"). **Its consequence, if it does not hold, is the G2 hold** in § "Expected release count".

*(R2 — PR-11 RULED: the profile corrections batch, first drafted here as 29.5, is **U3c** (Task 31), merged before this unit is cut. **U3g is the G2 cycle alone**, and Thurgood authors nothing in it.)*

- [ ] 29. The corrected derivation check: the ruled clause 2, the generator's own emission, and its standing application to the shipped profile

  **Type**: Implementation · **Validation**: Tier 3 · **Agent (plan)**: PRIMARY **Lina (Opus)**
  **Traces**: Reqs 11.4, 11.4.1, 11.8, 24.3 · design C15 (as corrected by Thurgood's ruling) · G2-F1, G2-F2, G2-F3; MIDPOINT MP-1

  **Success Criteria:**
  - **The spec-text ruling comes first** (Peter's PR-5.5).
    · Thurgood's ruling on G2-F1/F2/F3 lands as **its own record in its own PR, merged by Peter, before U3g's branch is cut** (R2, Stacy R-9). It is not part of this amendment.
    · Stacy pre-reads it for verifiability only, and Lina confirms that she can build to it. Thurgood writes none of the cycle's test text.
    · *(R2 — **FK-4 SETTLED between owners**: Stacy and Thurgood hold it; Lina has no stake beyond buildability; Ada abstains.)* **Its form is a design C15 erratum plus a recorded reading**, with the erratum citing the reading. No `requirements.md` edit, so the four "next requirements touch" folds in § "Carried obligations" stay deferred. To be buildable (Lina), the ruling states a pass/fail condition on rows A3, F5, C1, F3, A1, A2, AS1 and AS2. *Surviving counter (Stacy): Req 11.4.1's text stays ambiguous on `main`, so CLOSEOUT audits against a requirement plus a side record.*
    · **PR-5.4 is RULED**: "implemented" means the check ran on the shipped material, and the reading under which it need not is ruled out.
    · The ruling also states whether it adopts either of the provisional sizing's two named **non-readings**:
      · (α) re-rendered overlay (`render`) spans do not count as derivation — 141 rows fail;
      · (β) the check extends to `superseded-by` rows — 20 fail by construction, and need a different instrument.
    · Adopting either fires the ceiling below by construction.
    · **Instrument**: `git merge-base --is-ancestor <ruling PR's squash SHA> <U3g branch base>` and `git merge-base --is-ancestor <U3c squash SHA> <U3g branch base>`. **Red**: either fails.
  - **A read-only sizing run is the unit's first act (29.0)**, re-running the provisional sizing on the ruled text.
    · *Provisional sizing, 2026-10-03, scratch (Lina); re-run here as the unit's first subtask on the ruled text*: 168 re-pointed rows, 162 pass and 6 fail under four clause-2 readings. All six are frontmatter entries that render into the Kiro agent JSON, whose sidecar has one combined attribution span. No disposition re-authoring; one re-sign (Stacy, `knowledgeBases[spec-summaries]`).
    · It is recorded at `.kiro/specs/123-consumer-distribution/completion/u3g-sizing.md`, and it runs on a `main` that carries U3c.
    · *(R3, Lina RC2-4 (b))* **29.0 includes a dry run of 29.3**: per-entry Kiro-JSON spans computed in a temp copy, and the would-move signed rows listed, before any machinery commit. **Red**: a would-move row other than Stacy's `knowledgeBases[spec-summaries]`; ceiling limb (iii) then fires at 29.0, not after 29.3. (Lina's sizing sentence is true by reading, not by run; her R2 read finds no other signed row in the Kiro JSON field families.)
    · **ROW CEILING** (Lina's; **adopted at this amendment's merge** — R2, Stacy R-3): **stop and re-plan with Peter if ANY of these holds**:
      · (i) more than **12** failing rows;
      · (ii) more than **3** disposition re-authorings;
      · (iii) a **second seat** has to re-sign (R2: U3c's re-signs are a different unit and are not counted here);
      · (iv) **any body or always-set row fails**.
    · **Red**: any limb exceeded. The cycle then stops; this is never a ship-with-limits exit.
  - **Stacy's attacks and expected outcomes are committed before she sees the fix** (Peter's PR-5.6).
    · `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-attacks.md` is Stacy's audit artifact, outside the delegated-tier line. It includes attack (f), the one-token variant of attack (a), and F5's case, each with its expected outcome.
    · *(R2, Stacy R-4)* **It also states the HOLDS conditions**: G2-F1 (rows A3, F5), G2-F2 (C1, F3; a non-zero row count; runs on every PR touching the input set), G2-F3 (A1, A2, F3, AS1, AS2), and no High or Critical finding raised by the cycle still open. The consequence texts select on the verdict token only, as at 18.0.
    · **Instrument** *(R2, Stacy R-2, widened)*: every commit in `<U3g branch base>..<H′>` that touches `tools/agent-generator/**` or `canonical/profiles/consumer/**` has the attack file's commit as an ancestor, and 29.0's `u3g-sizing.md` commit is also an ancestor of every such commit. **Red**: any such commit lacks either ancestor. *Scope: this proves the order of commits, not the order of knowledge. Stacy has seen the provisional sizing and its fix shape for the six Kiro rows; the attacks are fixed by the findings (f, the one-token variant, F5), not by the fix.*
  - **G2-F1**: clause 2 follows the ruling. Fixtures for attack (f) and for the one-token variant of attack (a) go red under the shipped direction and green under the corrected one; **two-sided bites recorded**, exact outputs.
  - **G2-F3**: the clause-1 rows are rebuilt on the generator's own emission of attack (a), not a test model, which closes MIDPOINT's MP-1 as well.
    · The corrected expectations are recorded in this parent's completion doc.
    · Task 14's ticked rows are **not** edited; their record is pass four's finding.
    · **Red**: attack (a) as the generator emits it is not rejected by clause 1.
    · *(R2, Lina RC-8)* If the ruling places G2-F3's emptied-overlay `'\n'` span fix in `emitSpans`, the edit is in `tools/agent-generator/spans.ts` (listed below, conditional on the ruling).
  - **G2-F2 — the check runs on the shipped material** (PR-5.4).
    · **Scope**: the committed consumer profile and every committed target rendering under `canonical/_consumer-output/{_canonical,cc,kiro}/**`, **including the Kiro agent JSON**, over a stated, non-zero row count.
    · **The 16.1 parity test** (R2, Stacy R-8: `tools/agent-generator/__tests__/consumer-entry.parity.test.ts`, verified as Task 16.1's referent by its header) **ties that rendering to what `dist/consumer-canonical` emits**, so these renderings are the shipped material.
    · It runs **on every PR that touches its inputs** (Stacy's condition (a)).
      · **Lean**: a test under `tools/agent-generator/__tests__/`, run by `npm run test:agent-generator` (an existing `lane-timing.yml` step with a floor). No workflow edit and no new context.
      · A new CI context instead would be Peter's named act, with an `EXPECTED_CONTEXTS` change and Stacy's ARMING.
    · The check's declared **input (trigger) set** is written in the completion doc. It becomes U3's no-overlap path set.
    · *(R2, Stacy R-8)* **The standing test cannot pass on zero rows**: it asserts that its evaluated row count equals the count derived from the committed dispositions (not a literal), and it goes red on zero.
    · **Bite**: plant one rejected row in a temp copy of the committed profile → the standing test goes red.
  - **The six Kiro-JSON frontmatter rows** pass because `tools/agent-generator/adapters/kiro.ts` emits per-entry spans for the JSON fields their entries render into. **The JSON bytes are unchanged; only the attribution sidecars change** (asserted **on 29.3's commit** — R2, Lina RC-8: `git diff --stat` over `canonical/_consumer-output/kiro/**` names `*.attribution.json` only).
    · *(R2, Lina RC-7)* `adapters/kiro.ts` is shared with the steward leg, so **the eight steward sidecars `.kiro/agents/*.json.attribution.json` move too**. They are regenerated, never hand-edited, and named in 29.6's declared moved-outputs list.
    · *(R2, Ada A-2)* **Shipped-side proof**: `adapters/kiro.ts` is bundled into the shipped `dist/generator/consumer-entry.js`, so U3g changes a shipped file; but the tarball never carries the sidecars 29.3 changes, by `scripts/pack-assert.ts`'s existing row "attribution sidecars ABSENT: no packed `*.attribution.json`" (L389).
    · *(R2, Data)* **The freshness stale list is taken after 29.3 and pasted before 29.6.** Any non-Stacy row on it is ceiling limb (iii) — the cycle stops and re-plans with Peter. It is never folded silently into 29.6.
  - **One re-sign round, within Stacy's batching limits** (her U3-kickoff read § 5; ballot `.kiro/docs/ballots/2026-10-01-signing-act-chain.md`):
    · only rows on the freshness stale list are in bound;
    · a disposition change with no hash move is out of bound: declared, granted and counted separately, never folded into the batch;
    · seat commits enter by merge only (§ 4.6);
    · re-signs that change dispositions precede H′'s freeze (Task 30);
    · a Stacy-signed row moved by the round (today: `knowledgeBases[spec-summaries]`) is disclosed, and falls in Peter's sample (trigger (d));
    · *(R2, Stacy R-7)* the stale list is pasted into the U3g PR body together with one line per act, `<dispositions file>#<row> — <seat> — <sha7>`;
    · until Thurgood's RS-1 erratum lands, a re-sign is a new act, not a closed divergent.
    · **The lock**: one refresh after the round, by the guard's own write, from a clean tree. **`outputs` moves here by design**, so every moved output path is listed in the completion doc, and **any moved path other than the declared sidecars and renders is the stop.**
  - `npm test`, full `tsc` and `npm run test:agent-generator` are green on the branch.

  **Primary Artifacts:** `tools/agent-generator/regrounding/derivation.ts`, `tools/agent-generator/regrounding/check-catalog.ts`, `tools/agent-generator/adapters/kiro.ts`, `tools/agent-generator/__tests__/{derivation,derivation.frontmatter,semantics-guard,semantics-guard.fixture}.test.ts`, `tools/agent-generator/__fixtures__/semantics-guard/**`, `tools/agent-generator/__tests__/derivation.shipped-profile.test.ts` (new: the standing application), `canonical/_consumer-output/**` (regenerated sidecars and renders), `canonical/profiles/consumer/**` (seat signatures only; R2: no author edits in U3g, PR-11), `.kiro/agents/*.json.attribution.json` (R2, Lina RC-7: regenerated, never hand-edited), `tools/agent-generator/spans.ts` (R2, Lina RC-8: only if the ruling places G2-F3's fix there), `canonical/generated.lock`, `.kiro/specs/123-consumer-distribution/completion/u3g-sizing.md`

  - [ ] 29.0 Read-only sizing re-run on the ruled text; the ceiling check (stop if any limb is exceeded)
  - [ ] 29.1 Clause 2 per the ruling; attack (f) and one-token-variant fixtures; two-sided bites
  - [ ] 29.2 Clause-1 rows rebuilt on the generator's emission of attack (a) (G2-F3, MP-1)
  - [ ] 29.3 Kiro-JSON per-entry attribution spans (the six rows)
  - [ ] 29.4 The standing application to the shipped profile on every PR touching its inputs (G2-F2; Stacy's condition (a)); the declared input set
  - [ ] 29.6 One re-sign round within Stacy's limits; the lock refresh *(R2: 29.5 moved to U3c as Task 31, PR-11; the numbers are kept so that references stay valid)*
  - [ ] 29.7 Full validation

- [ ] 30. **G2 cycle-2 gate parent** (**U3g gating parent**)

  **Type**: Documentation · **Validation**: Tier 2 · **Agent (plan)**: PRIMARY **Lina (Opus)** — executing agent; **Stacy authors the attack file and the verdict record (outside the line); Thurgood recused**
  **Traces**: Reqs 11.8, 11.8.4, 24.3 · design § "Gates and sequencing" (G2) · Peter's PR-5

  **Success Criteria:**
  - *(R2, Stacy R-1)* **Verdict tokens are closed**: `HOLDS` · `DOES-NOT-HOLD` · `NOT-RUNNABLE`, used everywhere in this unit. The selector reads the token that follows `**Verdict**: `, up to the first space (`completion/g2-consequence-texts.md` § 2).
  - **The consequence texts are PRE-DECLARED.** They are committed at `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-consequence-texts.md` at a commit C0′ that is an ancestor of the frozen head H′ (ancestry cited), and never edited after C0′.
    · The `DOES-NOT-HOLD` text carries the PR-5.3 hold verbatim — the recommendation Peter agreed to ("I agree with all the recommendations"): "nothing that carries the consumer profile is tagged or published until a HOLDS verdict, or Peter lifts it by a dated record".
    · **Thurgood authors no line of them** (Stacy's refusal condition (iii)).
  - **The request to Stacy names a frozen H′** and cites the attack file (Task 29).
    · **Nothing that touches the check's input set lands on `task/123-u3g-g2c2` or on `main` between the request and the verdict** (Stacy's condition (d)).
    · **Instrument** *(R2, Stacy B2; this replaces `git log --first-parent <request commit>..<verdict commit>`, which means nothing on `main` because both commits are on the U3g branch)*: (i) at the request, H′ is named by its SHA; (ii) at PR open, `git diff --name-only <H′> <U3g PR head> -- <declared input set>` prints nothing; (iii) after the squash, `git diff --name-only <H′> <U3g squash SHA> -- <declared input set>` prints nothing.
    · **Red**: any path printed. The cycle is then re-requested on a new H′. A merge of `main` carrying input-set changes counts as a change.
  - **Stacy's verdict record** exists at `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-2.md`, with exactly one verdict token.
    · *(R3, Stacy C-1)* The record is committed on `task/123-u3g-g2c2` and **reaches `main` only through U3g's squash**. It is never committed to `main` by a record-only PR, because the hold guard reads `HOLDS` at S as "the fix is merged".
    · Its first section discloses that she wrote the findings and writes the verdict, and that she pre-read Thurgood's ruling for verifiability only; *(R2, Stacy R-6)* and that she re-signed `knowledgeBases[spec-summaries]`, and any other Stacy-signed row the round moved.
    · It applies her refusal conditions (her U3-kickoff read § 2).
  - **This parent's completion doc CITES the record path and never paraphrases the verdict** (11.8.4). Thurgood authors no line of it, and the U3g PR body states the recusal.
  - **On `HOLDS`**: the consequence is applied **byte-equal to its pre-declared text** in this PR, as this parent's completion-doc 24.3 table for the named domains, cited against its source line. Task 18's record is not edited.
  - **On `DOES-NOT-HOLD` or `NOT-RUNNABLE`**:
    · **the hold stands**, and this PR is not opened;
    · the owner fixes on the branch; *(R2, Stacy R-5)* **at most one further request (cycle 3), on the same attack file and consequence texts**. *(R3, Stacy C-2)* Its record is `.kiro/specs/123-consumer-distribution/completion/re-grounding-g2-cycle-3.md`, with one verdict token, under the same C-1 rule; the cycle-2 record is never edited. A cycle 3 that does not HOLD stops and re-plans with Peter, as does any ceiling limb. A new attack class is a new finding, never added to a running cycle;
    · **never ship with a written-down limit** — the recommendation Peter agreed to under PR-5 ("Yes, and good idea.").
  - The U3g PR body carries the tripwire line, and `npm test` and full `tsc` are green.

  **Primary Artifacts:** `.kiro/specs/123-consumer-distribution/completion/g2-cycle-2-consequence-texts.md`, Stacy's attack file and verdict record (cited), this parent's completion doc's 24.3 table

  - [ ] 30.0 Commit the pre-declared consequence texts (C0′)
  - [ ] 30.1 Freeze H′; request cycle 2 from Stacy; hold the input set until the verdict
  - [ ] 30.2 Apply the verdict's consequence byte-equal (on `HOLDS`)
  - [ ] 30.3 Full validation; open the U3g PR (on `HOLDS` only; tripwire line)

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
  - four RELEASE passes; *(Amendment 2026-10-02: three — § "Expected release count")*
  - CLOSEOUT (`.kiro/specs/123-consumer-distribution/completion/claims-pass.md`).

  These are post-acceptance audits, never tasks or gates.
- **The G1/G2 verdict records' content** — Stacy's audit artifacts. The gate parents cite them.
- **Any arming of `completion-criteria-parity`**; **path (A) canonicalization**; **native component distribution** (chartered at Task 3.5).

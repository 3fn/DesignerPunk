# Design Outline: 127 — Completion-Claims Integrity

**Date**: 2026-09-13
**Spec**: 127 — Completion-Claims Integrity (the F7 disposition)
**Author**: Thurgood (test governance / spec standards / Civitas steward)
**Status**: **DRAFT OUTLINE — awaiting Peter's outline review.** Not requirements/design/tasks. Authored for the Spec-Feedback-Protocol's sequential formalization gate: this outline settles with Peter and the tagged reviewers before any formal document phase opens.
**Origin**: `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md` § F7 — the audit's only undisposed item. Peter's adjudication session, 2026-09-13, ruled the full package; this spec is that ruling's execution.
**Pre-spec inputs (committed, cited throughout)**:
- `pre-spec/stacy-consult-2026-09-13.md` — adversarial process-governance review (B1/B2 blockers, compliance measurement, rot modes, ballot-form finding)
- `pre-spec/thurgood-consult-2026-09-13.md` — execution mechanics (placement, prune-scar constraint, register discipline, draft rule text)

---

## 1. Problem — what failed, and how we know

### 1.1 The finding (F7, verbatim in substance)

From the Spec 112 completion-claims audit (2026-09-12, verification-grade, claims-vs-source over all 25 ticked items):

> **F7 — A structural pattern in the parent docs: unmet criteria are dropped, not marked failed.** Parents 4 and 6 each present a criteria table with **fewer rows than tasks.md defines**, and in both cases the omitted rows are precisely the unmet ones. Parent 6 additionally reworded "All semantic pairs **pass** WCAG AA" to "**evaluated** against" and restated ΔE₀₀ <1 as <3, both marked ✅. No row in any Spec 112 parent doc is marked ⚠️ or ❌. The verification tables were authored from what was done rather than checked against what was promised.

The audit's Closing Assessment establishes this is a pattern, not a one-off: **five unshipped-work findings, four still open, four sharing one signature** — *a tested utility module is created, the existing seam it was meant to modify is never touched, and the parent's success-criteria table asserts the seam works.* **Two of those escapes reached consumers** (semantic tokens shipping RGBA in v12.0.3; Figma receiving legacy hex for ~3 months). The proximate mechanism is F7: self-attested parent verification tables with no promised-vs-shipped check.

### 1.2 The mutation classes (Stacy B1 — five, not four)

The Spec 112 ground truth, task 6: 5 tasks.md criteria → 4 doc rows. Observed mutations: **drop** (green success.text; Spec 106 contract test), **reword** ("pass" → "evaluated"), **relax** (ΔE₀₀ <1 → <3), **omit-doc** (F6's four missing completion/summary docs), and **invent** — parent 6's table contains a row ("Intentional changes documented ✅") that exists nowhere in tasks.md. Fabrication is the fifth class, and it is the reason the rule must be **exact-set** (none dropped, none added), not merely "reproduce all rows."

### 1.3 Why prose alone will not hold (the enforcement gap)

Stacy's S1 finding, and the load-bearing one: **the binding constraint is rule NON-ENFORCEMENT, not rule absence.**

- `governance/Process-Spec-Planning.md:1818-1853` **already mandates** per-criterion Success Criteria Verification — Criterion → Evidence → Verification → Example, with a worked template at :2011-2032. Spec 112 shipped a two-column `Criterion | Status` table. The stronger standard existed and was silently narrowed.
- **No required check reads completion docs.** All six workflows enumerated (`agent-generator`, `consumer-guard`, `lane-timing`, `package-name-drift`, `section-citations`, `tool-boot-smoke`); none parses a completion doc. The PR gate closed the no-review-at-all half; it does not read a criteria table.
- The audit practice that caught this is **retrospective and unscheduled** — it found 112's defects three months late, and two of the five escapes were found by consumer symptoms rather than by us.

### 1.4 Compliance baseline — measured, with a recorded divergence

**Stacy's consult (S1)** reports, over "66 post-PR-gate parent completion docs since 2026-07-01": **18 (27%)** contain any Success Criteria section; **2 (3%)** contain any ⚠️ / ❌ / "Partial" / "not met" marker.

**This outline's independent reproduction (2026-09-13)** — recipe recorded so the number is auditable and re-runnable at each health check:

```
git log --diff-filter=A --since=2026-07-01 --name-only --pretty=format: \
  -- '.kiro/specs/**/completion/**' \
  | grep -E '/task-[0-9]+(-parent)?-completion\.md$' | sort -u
```

| Population | n | w/ any criteria section | w/ any ⚠️/❌/Partial/"not met" |
|---|---|---|---|
| All parent-shaped docs added since 2026-07-01 (both naming forms) | 41 | 16 (39%) | 2 (5%) |
| **In-scope only** (parents in specs whose tasks.md defines **per-parent** criteria — 122 + 125-B) | **22** | **15 (68%)** | **0 (0%)** |
| Out of scope by the ruling's own rider | 19 | — | — |

The out-of-scope 19: **119-B** (10 parents — spec-level criteria, `## Success Criteria (spec level)`, discharges at closeout per rider (a)); **125-A** (8 parents — its tasks.md defines **zero** per-parent Success Criteria); **126** (1 parent — issue-driven, no tasks.md at all).

**What the divergence means (flagged, not hidden):** the numerators broadly agree (16 vs 18; 2 vs 2); the denominators differ in construction. Applying the ruling's own scoping rider *raises* section-presence compliance from 27% to **68%** — and drops forced-negative compliance to **0 of 22**. Both readings support the ruling; they support *different parts of it with different force*:

- The "27% base rate" argument for mechanizing **section presence** is weaker than stated once the rider is applied (68%, and the parity checker would arm on a population that already mostly complies in form).
- The argument for the **forced-negative line** is *stronger* than stated: **zero** in-scope parent docs since the PR gate carry any failure vocabulary. The Tier-3 system-side template has no failure vocabulary at all outside the Blocked Task format — Stacy's Q3 finding that this absence is the real template defect behind F7.
- The argument for the **evidence cell** is stronger still: of the 15 in-scope docs that do carry a criteria section, **5 mention "Evidence" anywhere in the document** and **4 mention "Verification"** — i.e. the existing Tier-3 standard's own required structure is present in at most a third of the docs that attempt the section.

**And the shape finding that matters most for design (new, found while drafting):** the best-behaved in-scope exemplar — `122/completion/task-10-parent-completion.md` — presents **5 numbered evidence-bearing items** against a tasks.md that defines **3 criteria**, with the criteria restated as compressed labels rather than verbatim. It is substantively excellent (every item carries artifact paths and mechanical verdicts) and would **fail** an exact-set verbatim parity check. Two consequences, both feeding Q1: the checker's false-positive surface is real and immediate, and "current best practice" is not the target format.

### 1.5 What the rule must catch, and what it cannot (Stacy B2 — catch-rate honesty)

Scored against the audit's 12 discrepancies, verbatim transcription alone catches **2 of 12**. It does not catch:

| Class | Instances | Why transcription misses it |
|---|---|---|
| False ✅ on a reproduced row | parents 3, 5, 5.1, 7 | Verbatim transcription is fully compatible with a false mark |
| Doc absence | F6's 4 missing docs | No table exists to police |
| Unshipped work (incl. **both consumer-reaching escapes**) | 5 findings | The claim never contradicts the doc's own text |

This is precisely why the ruling is a package rather than a template edit, and why **F7 is recorded as addressed-by-this-spec, not closed by transcription alone** (Stacy B2; §3.6).

---

## 2. What Spec 127 IS

Spec 127 delivers, as one coherent governance-law change plus one mechanical check:

1. **Restored + amended process law** — parent completion docs must reproduce their tasks.md success criteria as an **exact set**, each row carrying a **Status** and a **mandatory Evidence cell**, plus a **forced-negative line** that silence cannot satisfy.
2. **A mechanical arm for the half that is mechanically decidable** — `completion-criteria-parity`, built in this spec, registered in the classification map, armed per Q2's timing decision.
3. **Register entries for the halves that are not** — the `(modified)`-vs-diff check registered as proposed/deferred; verification honesty registered as ideological with an explicit record that **no check owns it**.
4. **A record-first ballot** as the recording form, since this amends process law binding every agent on every parent task.

**Spec 127 is NOT** a re-audit, a backfill, or a re-litigation of the 112 findings (all disposed; see the audit's annotated ledger).

---

## 3. Settled decisions — Peter, 2026-09-13 (not reopened here)

Recorded as decided. The feedback round may surface execution consequences of these decisions; it does not reopen them.

### 3.1 Full package, not the light alternative

Peter's reasoning, recorded: (1) evidence of the issues already exists — the audit plus the measured base rate; no need to re-measure before acting; (2) **the dangerous failure channel is false assertion, not silence** — "we can't detect what quietly persists," and silence is at least visible; (3) prose-only rules run at a demonstrated low compliance rate. **Prose and mechanical arm land together.**

*(Outline note, §1.4: the base-rate figure that reasoning cites reads differently under the ruling's own scoping rider. The conclusion is unaffected — arguably strengthened on the forced-negative and evidence-cell dimensions. Recorded for completeness, not as a challenge.)*

### 3.2 The package = Stacy's modified form (three parts)

1. **Exact-set verbatim criteria table** with three mandatory columns — `Criterion (verbatim) | Status (✅/⚠️/❌) | Evidence (artifact path, test name, or command + result)`. A ✅ with an empty or prose-only Evidence cell is **non-compliant on its face**. Restores `Process-Spec-Planning.md` Tier 3 and amends `completion-documentation-guide.md`. This is a **deliberate, recorded trade** of the current 4-part prose form's depth for a form that can actually be complied with and checked.
2. **The forced-negative line**, imported from `Product-Handoff-Protocol.md:83-101`: `Unmet or partially met criteria: None / or list each with follow-up link.` Cannot be satisfied by silence. (Stacy: the part to keep if only one is kept.)
3. **Staged mechanization** — **BUILD** the `completion-criteria-parity` checker in this spec (precedent: `section-citation-resolution`, a pure-fs markdown scan that went proposed → Peter-armed with a register row); **REGISTER** the `(modified)`-vs-diff check as proposed/deferred; **REGISTER** verification honesty as ideological with an explicit "no check owns this" record. Optionally the cheap F6-class doc-existence check (parent ticked ⇒ completion + summary docs exist).

### 3.3 Scoping riders

- **(a)** Binds parents whose tasks.md defines **per-parent** criteria. Specs using spec-level criteria (the 119-B pattern) discharge **once at closeout**.
- **(b)** Product-spec parents carry a **per-platform status dimension** — a single ✅ must not hide "met on iOS, unmet on Android." (Shape is Q3.)
- **(c)** **No backfill.** Historical completion docs stay as written (F6's disposition: back-filled completion docs would be exactly the unverifiable self-attestation this work is about).

### 3.4 The Goodhart rot mode is named in the ruling

**Criteria-dilution upstream** — vaguer tasks.md criteria so nothing can be unmet — is invisible to any doc-vs-tasks parity check, because both sides move together. It is named in the ruling as **the next completion-claims audit's first question**. (Full rot-mode ladder: §11.)

### 3.5 Recording form: record-first BALLOT

Per Stacy S2, anticipated by this author's own counter-consideration. Direct precedent: `.kiro/docs/ballots/2026-07-05-documentation-task-type.md` amended **these same two documents** as a ballot with Stacy as required reviewer (she caught five missed edit sites in that round). Inheriting the lighter issue-driven form used for F5 would be quiet precedent drift toward ruling-by-PR on governance law — and F5 was correctly issue-driven precisely because it was *domain content*, not governance law. `governance/**` keeps the PR Peter-merged regardless (the standing carve-out; a checks-only merge is not ratification).

### 3.6 F7's disposition

F7 is recorded on the audit issue as **addressed by Spec 127**, not closed by transcription. It closes when the ballot ratifies **and** the parity checker is armed (Q2 governs when).

---

## 4. The rule content (draft — for the requirements/design phases to formalize)

Draft text carried from the mechanics consult with Stacy's B1 amendments folded. **Exact wording is a formalization-phase deliverable and a ballot artifact**; this is the substance under review.

### 4.1 For `governance/completion-documentation-guide.md` — new subsection "Parent Success-Criteria Fidelity"

> A parent task's completion doc MUST reproduce **every** success criterion defined for that parent in `tasks.md` — verbatim, in full, **none dropped, none reworded to soften an unmet result, and none added** (exact set). Each criterion is a row with three mandatory columns:
>
> `Criterion (verbatim) | Status | Evidence`
>
> - **Status**: ✅ verified met · ⚠️ verified unmet or partial (MUST link a tracking issue or follow-up task) · ❌ verified absent — the "3.3 pattern": a tested module created, the seam it was meant to reach never touched.
> - **Evidence**: an artifact path, a test name, or a command + its result. **A ✅ with an empty or prose-only Evidence cell is non-compliant.**
>
> Each row's mark must reflect a check actually performed **against shipped source**, not against intent or effort. Never omit a row to avoid reporting bad news. Never mark ✅ without having checked the row against what actually shipped.
>
> Immediately after the table, the forced-negative line:
>
> `Unmet or partially met criteria: None` — *or* a list, each item carrying a follow-up link.

### 4.2 For `governance/Process-Spec-Planning.md` — Tier 3 (:1818-1853, template :2011-2032)

Restore-don't-replace: the Tier-3 Success Criteria Verification section is **amended** to the table form above, superseding the current Criterion/Evidence/Verification/Example prose block as the required shape. The prose form's depth is preserved as an **optional** elaboration beneath the table for criteria that warrant it. The recorded rationale for the trade travels with the edit.

### 4.3 For `.kiro/steering/Task-Completion-Protocol.md` — pointer only

Appended to the "Create completion doc" bullet in **both** parent sequences (Implementation/Architecture and Setup/Documentation):

> — reproduce every tasks.md success-criterion row verbatim with Status + Evidence, and carry the forced-negative line (Completion Documentation Guide § "Parent Success-Criteria Fidelity")

**Prune-scar constraint (125-B discipline, non-negotiable):** `Task-Completion-Protocol.md` was a **Wave-1 prune target** (closed at `cbf9929c`). This addition stays a **pointer** — never a restated imperative block — so the spec does not re-accrete what Wave 1 removed. It is Layer 1, always-loaded via CLAUDE.md's live `@`-import, and **directly editable** (confirmed by inspection: no `canonical/**` template source; git history shows direct content PRs). No 122 regeneration is required for this file, and it is **not MCP-served** — no reindex for it.

---

## 5. Mechanization plan (staged)

### 5.1 `completion-criteria-parity` — BUILD in this spec

| Facet | Position |
|---|---|
| Class | **Functional** — string-set equality between two markdown artifacts is mechanically decidable, no judgment |
| Disposition | `barrier` (required check) |
| `check_state` at ballot | `proposed` → `armed` per Q2 |
| Precedent | `section-citation-resolution` — pure-fs markdown scan, register row landed at `proposed`, Peter flipped the required bit separately |
| Input | `tasks.md` per-parent criteria block + the parent's completion doc criteria table |
| Verdict | exact-set equality (dropped / added / reworded rows all fail); Evidence-cell non-empty; forced-negative line present |
| Out of its reach | whether the Evidence is *true* (§5.3) |

**Two build constraints, both learned from the register's own history:**
1. The check name must be added to `scripts/verify-gate-registration.sh` `EXPECTED_CONTEXTS` **in the same recorded change as the arming** — the 2026-08-21 gate-registration drift (`.kiro/issues/2026-08-21-gate-registration-drift-reconciliation.md`) exists because a prior arming did not update the count-assert.
2. Gate-bite must be **proven red** on a throwaway PR before the required flip (the `#121` pattern), and the proof cited on the register row.

### 5.2 `promised-artifact-shipped` (the `(modified)`-vs-diff check) — REGISTER as proposed/deferred

The audit's own cheapest guard, and the one that targets the class that actually reached consumers: *a file annotated `(modified)` in the task text does not appear in the task's diff.* Registered now (birth registration — a rule enters the register when it is ruled, not when it is built), built later. Shape, false-positive surface, and promotion trigger are **Q4**.

### 5.3 `completion-verification-honesty` — REGISTER as ideological, no check

Whether the evidence behind each ✅ is real has **no mechanical predicate**. The register records explicitly that **no check owns it** and that education plus periodic claims-audit practice own it — forever. This entry is what prevents a future reader from mistaking the parity checker for an honesty guarantee.

### 5.4 `parent-completion-docs-present` (F6 class) — OPTIONAL, cheap

Parent ticked in tasks.md ⇒ `completion/task-N-completion.md` **and** `docs/specs/<spec>/task-N-summary.md` exist. Stacy rated this S5/low. Candid assessment: it is the cheapest check in the package and catches a real 4-instance class, but it is also the one most likely to fire on legitimate in-flight branch states (docs land at parent completion, which may precede the unit's PR). **Recommendation: include it in the register at `proposed`, decide build/arm at the tasks phase** rather than committing here.

### 5.5 Register hygiene (all rows)

- Entry-ids are kebab-case, permanent once cited, and **no id may be a substring of another** (sweep-1 resolves `§ "heading"` by verbatim substring match — a substring collision silently mis-resolves and still reports green). The four proposed ids were checked against all 17 existing entries at drafting: no collisions, no substring relations.
- Every row carries `rule`, `boundary_call{class,rationale}`, `verification{disposition,owner,check_state,checks}`, `education{disposition}`, `history[{date,change,by}]`.
- `owner:` is **downstream of Q5** — see §6.2.
- Mechanization posture note ("mechanization deferred, process-first") applies **only** to the genuinely deferred rows (§5.2), never to the checker this spec builds.

---

## 6. Scope, non-goals, and one scoping edge

### 6.1 Non-goals

- **No backfill** of historical completion docs (rider (c)).
- **No re-audit** of Spec 112 or any other spec. The audit is complete and its items are disposed.
- **No mechanization of verification honesty.** It stays ideological; education owns it (§5.3). This spec must not imply otherwise anywhere in its prose.
- **No change to tasks.md criteria *authorship* standards** beyond what Q1's machine-readable convention requires — in particular, this spec does not tighten what a criterion must say. (That is the Goodhart surface, §3.4, deliberately left to audit rather than rule.)
- **No retroactive charge** against any 125-B wave window for the ballot or the register rows — register/ballot PRs are campaign-endogenous by the settled segmentation ruling. **The check ARMING is exogenous** (Q2).

### 6.2 One scoping edge, flagged for Peter's outline review (cheap to settle)

**In-flight specs.** Rider (c) says no backfill; rider (a) says the rule binds per-parent-criteria specs. Neither states what happens to a spec whose parents are **partly complete** when the ballot ratifies — e.g. 125-B (4 parents merged, more to come) or 123 (not yet started). Options: **(i)** binds every parent completing after ratification, regardless of spec start date (simplest; means one spec's docs are internally inconsistent); **(ii)** binds specs whose tasks.md is authored after ratification (cleanest per-spec consistency; delays effect by months given current cadence); **(iii)** binds after ratification with a one-line exemption note available for in-flight parents. No recommendation offered — this is a one-sentence ruling, and I would rather Peter make it at outline review than have the feedback round spend a round on it.

---

## 7. Artifact inventory

| Artifact | Change | Owner | Notes |
|---|---|---|---|
| `governance/completion-documentation-guide.md` | New subsection "Parent Success-Criteria Fidelity" (§4.1) | Thurgood | MCP-served Layer 2; primary home for the rule content |
| `governance/Process-Spec-Planning.md` | Tier 3 amend/restore at :1818-1853 + template at :2011-2032 (§4.2) | Thurgood | The pre-existing stronger standard lives here |
| `.kiro/steering/Task-Completion-Protocol.md` | **Pointer line only**, both parent sequences (§4.3) | Thurgood | Layer 1, direct-edit, NOT generator output, not MCP-served; prune-scar constraint applies |
| `governance/classification-map.md` | 3 rows (+1 optional): `completion-criteria-parity`, `promised-artifact-shipped`, `completion-verification-honesty`, *(opt)* `parent-completion-docs-present` | Thurgood | Birth registration; `owner:` fields downstream of Q5 |
| `scripts/check-completion-criteria-parity.ts` | New | Q5-dependent | Pure-fs markdown scan; `section-citations` precedent |
| `package.json` | `check:completion-criteria-parity` script | " | " |
| `.github/workflows/completion-criteria-parity.yml` | New CI job | " | Check context name fixed at authoring, cited on the register row |
| `scripts/verify-gate-registration.sh` | `EXPECTED_CONTEXTS` + count-assert | " | **Same change as the arming** (2026-08-21 drift lesson) |
| `.kiro/docs/ballots/2026-09-XX-completion-claims-integrity.md` | New ballot: evidence, before→after for every edit site, scope decisions, reviewer list | Thurgood | Record-first: `RATIFIED (Peter, <date>)` committed **before** any law edit is applied |
| `.kiro/docs/ballots/README.md` | "Ballots on record" entry | Thurgood | Convention |
| `.kiro/issues/2026-09-12-spec-112-completion-claims-audit.md` | F7 status → addressed-by-127 | Thurgood | Not "closed" (Stacy B2) |
| docs MCP index | One `rebuild_index` covering the changed governance docs | Thurgood | TCP needs none (not served) |
| `governance/Product-Handoff-Protocol.md` | *Conditional on Q3* — per-platform status shape may land here rather than (or as well as) the system-side guide | Stacy | Q3 |
| `.kiro/steering/Agent-Directory.md`, `canonical/agents/thurgood.md`, `canonical/agents/stacy.md` | *Conditional on Q5* — charter edits + 122 regen | Peter-merged | Governance law; generator output — edit canonical, regenerate |

**Merge-unit shape (proposal for the tasks phase):** three units — **U1** ballot + law edits + register rows (one Peter-merged governance PR), **U2** checker build + gate-bite proof + registration wiring, **U3** arming + register `check_state` flip + F7 disposition. U2/U3 separate precisely so Q2's timing decision can hold U3 without holding the build.

---

## 8. Open questions for the feedback round

**None of these are settled here.** Each is framed with options and the evidence bearing on it.

### Q1 — The machine-readable criteria convention

**Why it is open:** the parity checker needs a defined `tasks.md` criteria-block format, and current formats vary. Measured across all 153 spec `tasks.md` files (150 contain some "Success Criteria" string):

| Form | Occurrences |
|---|---|
| `  **Success Criteria:**` (indented, bolded, colon inside) | 790 |
| `**Success Criteria**: ` | 46 |
| `**Success Criteria**:` (incl. indented variants) | ~19 |
| `## Success Criteria` / `### Success Criteria` headings | 15 |
| `## Success Criteria (spec level)` — the 119-B discharge pattern | 1 |

So ~92% share one form, with a long tail — and the criteria themselves are bullets of free prose, which is fine for an exact-set string comparison but not for anything structured.

**Sub-questions to answer:**
1. **Block format** — freeze the dominant `**Success Criteria:**` + bullet-list form as the convention (lowest migration cost, but brittle: indentation and bold styling become load-bearing), or introduce an explicit delimiter/fenced marker the checker anchors on (robust, but a convention every future tasks.md must learn)?
2. **Parent association** — how does the checker attribute a criteria block to parent N? By nearest preceding `- [ ] N.` checkbox (matches current authoring), or by an explicit key in the block?
3. **Spec-level declaration** — how does a spec declare itself spec-level-criteria (rider (a)) so the checker skips its parents and expects one closeout discharge instead? A tasks.md header marker is the obvious answer; it needs to be *mechanical*, or the rider becomes an unfalsifiable excuse.
4. **Match strictness — the live tension.** Exact verbatim string equality is the only form with no judgment in it, but it will fail today's **best-behaved** doc: `122/task-10-parent-completion.md` restates 3 tasks.md criteria as 5 compressed, evidence-rich items (§1.4). Options: (a) strict verbatim — clean predicate, real adoption cost, and it penalizes a genuinely better artifact; (b) normalized comparison (whitespace/markdown-stripped, prefix or fuzzy match) — kinder, but introduces a similarity threshold, which is judgment wearing a checker's clothes; (c) strict verbatim **plus** an explicit "additional verification" section below the table where extra items like 122's live legitimately. Option (c) is the one that preserves both the mechanical predicate and the better artifact, and is offered for the round to attack.
5. **Forward-binding only?** Does the convention apply to tasks.md files authored after ratification, or to all (which would require touching in-flight specs' tasks.md)? Interacts with §6.2.

### Q2 — Arming timing vs the 125-B campaign

**The accounting, precisely.** The 125-B campaign's **shared W1 window is OPEN** (opened 2026-08-12T21:03:24Z at the wave-1 prune merge `cbf9929c`; closes at the final wave's window close — event-denominated). Both **wave** windows closed at observation pass 3 (2026-08-27, PR #149); the **campaign** window did not. Per the settled segmentation ruling, campaign-endogenous events (wave prunes, ballots, register/roster PRs) **do not** segment; **exogenous events do** — explicitly including **new check armings** and **required-check-set changes** — and are **bounded at K=3**. Current count: **1 of K=3** (segment 2, opened 2026-08-21 by the `122-sweep-5-corrected-state` required-flag removal). Segment 2 is currently n=16, f=0, W1 MET as-of-pass.

**Options:**

| | Build now, arm at campaign close | Arm immediately |
|---|---|---|
| Boundary charge | **0** — no new segment while the window is open | **2 of K=3** consumed |
| Checker state in the interim | `proposed` on a ratified register row, CI job present and non-required | `armed` |
| Precedent | The `section-citations` guard armed **before** the campaign opened, deliberately timed measurement-free ("no window was open; not a boundary-event charge") — the same instinct, applied at the other end | 125-A's armings, which predate the campaign entirely |
| Cost | Every parent completing in the interim ships unchecked; the rule runs on prose alone for exactly the period §1.3 says prose does not hold | Segment 3 starts with a fresh n, and the campaign has one boundary left for anything unforeseen |
| Legitimacy | A registered `proposed` row is a **recorded, ratified** decision, not a dormant gap — the state exists in the schema for exactly this | No ambiguity; the rule is real the day it ratifies |

**Not decided here.** Two facts worth having in front of the decision: the campaign's measured exogenous-event rate is *low* (1 in ~13 months of PR history since campaign open; the U1 pilot measured **zero**), so K=3 is not under pressure — and conversely, the interim is only as long as Wave 3 + closeout take, which at the current bursty cadence is not predictable in calendar terms. **Peter decides.**

### Q3 — The product per-platform status dimension

**Why it is open:** rider (b) is settled in principle; its shape is not. And it binds a **currently empty surface** — the Product MCP index reports 0 screens, 0 tokens, 0 domain objects. There is no instance to validate the design against, so whatever is chosen will be untested until the first product spec lands.

**Options:**
1. **Per-platform columns** — `Criterion | Web | iOS | Android | Evidence`. Reads at a glance; makes an unmet platform impossible to hide; forces a cell for platforms a criterion may not touch (N/A noise).
2. **Per-platform evidence cells** — one Status column, with Evidence structured per platform. Compact; a single roll-up ✅ can still paper over one platform unless the roll-up rule is stated ("✅ only if all applicable platforms are ✅").
3. **Per-platform rows** — criterion repeated per platform. Most explicit, most verbose, cleanest for a checker.

**Also on the table (Stacy's Q3 finding):** the product side *already* has the cheaper pattern — `Product-Handoff-Protocol.md:83-101` Implementation Reports carry forced-negative sections ("Deviations from Spec: None / or list"; "Open Items: None / or list"). A real option is that product parents discharge this rule **through the existing Implementation Report structure** rather than through a new table shape. **Stacy's design input is central here**; Leonardo and the three platform agents are the consumers who will live with it.

### Q4 — The `(modified)`-vs-diff check's eventual shape

Deferred build; registered now. For the round to shape rather than settle:
1. **What it parses** — `(modified)` / `(reworked)` annotations in task text and "Primary Artifacts" lists, against the unit PR's diff. Spec 112 named a **phantom path** (`src/generators/FigmaFormatGenerator.ts` has never existed) and a **wrong path** (`src/generators/WebFormatGenerator.ts`; the file lives in `src/providers/`) — so the check's first real output class may be "the task text names a file that does not exist," which is itself valuable and *different* from what it was built for.
2. **False-positive surface** — legitimate reasons a promised file is absent from a diff: the work moved to a better path mid-task; the change landed in a prior unit; the annotation was aspirational and the task text was never corrected. Each is a defensible completion with a failing check.
3. **Promotion trigger** — what evidence moves it from `proposed` to `build`? Candidates: a second spec exhibiting the signature; a false-positive rate measured below some threshold on a retrospective dry run (cheap — it can be run over merged history without arming anything); or simply Peter's scheduling call.
4. **Relationship to the parity checker** — they are complements, not alternatives: parity guards the *criteria* surface, this guards the *artifact* surface, and the two consumer-reaching escapes were on the artifact surface.

### Q5 — Ownership: should execution-claims verification move to Stacy, across both product and system specs?

*(Peter-raised; to be decided in this spec. **I am a named party to this question.** The framing below is deliberately neutral; see the handling note at the end.)*

**The question:** today, Stacy's charter covers product-level quality auditing, cross-platform parity, spec structure review, and process compliance; mine covers test governance, spec standards, audit methodology, and Civitas stewardship — including claims audits like the one that produced F7. Should **delivered-vs-promised verification** (execution-claims auditing) become Stacy's, for **both** product and system specs, with the standing claims-audit cadence and the new checks' register `owner:` fields following her?

**FOR:**
1. **Separation of duties.** The author of a standard auditing compliance with his own standard has a demonstrated blind spot — this one, specifically: my original F7 draft rule was **weaker than the standard it was meant to enforce** (Process-Spec-Planning Tier 3 already required Evidence and Verification columns; my draft would have been satisfied by the two-column table that failed). Stacy's adversarial review caught it (B1). That is not a hypothetical argument about incentives; it is this spec's own origin story.
2. **The failure class is process-integrity, which is her native method.** F7 is not a test-coverage failure; it is a claims-versus-reality failure. Her consult demonstrated the capability directly — she produced the compliance measurement (S1), the catch-rate scoring against all 12 discrepancies (B2), the mutation taxonomy (B1), the rot-mode ladder, and the correct recording-form finding (S2).
3. **Load distribution.** My current plate: Civitas stewardship (steering-doc health, MCP monitoring, cross-surface consistency, agent-prompt currency), spec formalization across the corpus, test-suite governance, and the monthly health check. Claims auditing is retrospective, unscheduled, and expands with the spec corpus.

**AGAINST / risks:**
1. **Boundary blur with the test-governance charter.** "Do the tests exist and pass" and "did the work ship as promised" are adjacent; without a crisp cut both agents will hedge into each other's territory. The cut that appears to work: **I keep** standards *authorship* (what a completion doc must contain), test-suite health, and spec formalization; **she takes** delivered-vs-promised *verification* (did a given completion doc tell the truth). Authorship vs. audit — the same line this spec's own §2 draws between the rule and its enforcement. If that cut is not crisp enough to state in one sentence in both charters, the change is not ready.
2. **Two-owner gap risk.** The classic "I thought you had it." Claims auditing is currently unscheduled, which is precisely the condition under which a handoff silently drops. Mitigation: **event-anchored triggers** written into the receiving charter (e.g. post-unit-merge sampling, post-release, post-spec-closeout) rather than a cadence that can quietly lapse — and an explicit statement of which agent answers when Peter asks "was this claim verified?"
3. **Agent-charter changes are governance law.** This means canonical prompt regeneration (122), an Agent-Directory edit, and both charters changing — Peter-merged, and scoped into this spec's units. It is not a free administrative change; it is a second governance-law surface riding a spec whose primary surface is already governance law.
4. **A dependency this spec creates:** the register rows' `owner:` fields and the checker's ownership cannot be finalized until this is settled. If Q5 is deferred, the ballot either lands with `owner: thurgood` and a recorded revisit trigger, or the register rows wait — neither is free.

**Handling note (procedural, and I am asking that it be honored):** because I am a named party, **my R1 incorporation will not self-adjudicate Q5.** I will incorporate all other feedback normally, record Stacy's R1 position on Q5 verbatim alongside any other reviewer's, and carry the question to Peter unresolved. It settles by Peter's decision after the round, with Stacy's R1 on record — not by my summary of it.

---

## 9. Measurement and success criteria for Spec 127

**Event-denominated, never calendar-cadenced** — consistent with the measurement law already in force. The observation point is the **monthly Civitas governance health check**, which is itself event-triggered by staleness rather than by a calendar date.

### 9.1 Baseline (recorded above, §1.4; recipe is re-runnable verbatim)

| Metric | In-scope baseline (22 parents, since 2026-07-01) |
|---|---|
| M1 — criteria section present | 15 / 22 (68%) |
| M2 — exact-set parity with tasks.md | **unmeasured at baseline** — no instance verified; the best exemplar fails it (§1.4) |
| M3 — every row carries a non-empty Evidence cell | ~0; "Evidence" appears anywhere in 5 / 15 docs |
| M4 — forced-negative line present | **0 / 22** |
| M5 — any ⚠️/❌/Partial marker | 0 / 22 in-scope (2 / 41 corpus-wide, both out of scope) |

### 9.2 Success criteria for this spec

1. The ballot is **RATIFIED** (record-first: status committed before any law edit lands) and all edit sites in its before→after inventory are applied exactly as written, verified by a mechanical straggler sweep — not by trusting the enumerated list (the ballot-README lesson: every count in that directory's first ballot was wrong at least once).
2. The three register rows exist, are schema-valid, pass the non-substring entry-id constraint, and carry dated+attributed `history` entries.
3. `completion-criteria-parity` **exists, is proven red on a deliberate defect** (gate-bite, `#121` pattern), and is registered in `verify-gate-registration.sh` in the same change as its arming. Whether it is *armed* within this spec is Q2's answer, not a success criterion.
4. F7's status on the audit issue reads **addressed by Spec 127** with the closing condition stated.
5. At the **first health check after arming**: M2 = 100% by construction (see the caveat below), and **M4 ≥ 90%** of in-scope parents merged since arming. M4 is the honest adoption signal.
6. At the **second health check after arming**: a spot-check of N ≥ 5 in-scope parent docs finds no ✅ row whose Evidence cell is prose-only — M3 is the quality signal, and no check owns it.

**The caveat that keeps these honest:** once a barrier is armed, **its own metric is trivially 100%** — a checked rule cannot show non-compliance. So M2 measures nothing after arming; the informative metrics are exactly the ones **no check owns** (M3 evidence quality, M4 pre-check adoption, and the honesty dimension that is ideological by construction). Any future reading of these numbers that treats a green gate as evidence of claim honesty will have made the error this spec exists to prevent.

### 9.3 The return edge

Recurring `completion-criteria-parity` failures are an **education-implicating signal** — if the check keeps biting, the docs may be teaching the wrong thing (e.g. the criteria convention is unlearnable, or the Tier-3 template still contradicts the rule). This is the strategy→tactics→validation loop's closing edge; it belongs on the health check's return-edge review, and the first such review should also ask §3.4's Goodhart question: **are tasks.md criteria getting vaguer?**

---

## 10. Stakeholders and review plan

Per the Spec-Feedback-Protocol § "Stakeholder Identification". Feedback doc: **split by phase** — `.kiro/specs/127-completion-claims-integrity/feedback/{design-outline,requirements,design,tasks}.md` (the split is preferred for multi-round specs; this one has five open questions and at least two contested surfaces).

| Reviewer | Standing | Why |
|---|---|---|
| **Stacy** | **REQUIRED** | Domain stake (process integrity), the July-2026 precedent (required reviewer on the ballot amending these same two documents, where she caught five missed edit sites), author of the modified package under review, **and the named counterparty on Q5**. Q3's design input is primarily hers. |
| **Peter** | Decision authority | Ratifies the ballot; decides Q2, Q5, and §6.2; arbitrates any Ada/Lina/Stacy disagreement |
| **Ada** | Light consult | Bound party — every future Rosetta parent task carries this rule. Specific ask: does the three-column form survive contact with token work, where criteria are often mathematical properties whose "Evidence" is a formula or a validator run? |
| **Lina** | Light consult | Bound party — same, for component work: criteria that are behavioral contracts across three platforms (and the first real users of Q3's shape, if product and system forms converge) |
| **Leonardo** | Consult on Q3 only | Consumer of the product-side shape; the first product spec's author |
| Kenya / Data / Sparky | Not tagged for R1 | Q3 binds them eventually; tagging three platform agents to review an empty surface is cost without signal. If Q3's answer is per-platform columns, tag them at the design phase. |

**Sequential gate applies** (no waiver requested): outline → *round* → requirements → *round* → design → *round* → tasks → *round*. Given that this spec's subject is process rigor, compressing its own process would be an unfortunate irony — and the "cheap is expensive" precedent from 125-B applies directly.

**Q5 handling** is stated in §8 Q5's handling note and is repeated here because it governs the round's mechanics: I do not self-adjudicate it in incorporation.

---

## 11. Rot modes, named in advance (Stacy Q4, ascending severity)

1. **Defensive ⚠️** — hedging every marginal row devalues the marker until ⚠️ means "probably fine." Detection: marker frequency climbing while follow-up links stay empty.
2. **Table-as-ritual** — verbatim rows, all ✅, no real evidence. **Most likely rot**, given the baseline. This is exactly what the mandatory Evidence cell is aimed at, and exactly what the checker *cannot* catch (a non-empty cell containing a plausible path is green).
3. **Goodhart criteria-dilution upstream** — vaguer tasks.md criteria so nothing can be unmet. Invisible to any doc-vs-tasks parity check because both sides move together. **Named in the ruling as the next audit's first question** (§3.4).

**The cost honesty note that belongs with these:** transcription costs ~300–600 tokens / 3–5 minutes per parent. That is the wrong number to quote. The true cost is **re-verification per row** — minutes to an hour — which the rule requires in spirit and **neither requires nor detects the absence of** in mechanism. Anyone reading this spec as "the completion-doc problem is now solved" has read it wrong.

---

## 12. Recorded counter-arguments

**Stacy's own, recorded with her verdict:** three parts plus riders may exceed what one spec's evidence has earned; the defensible minimum is part 2 (the forced-negative line) alone. What she would argue hard against is part 1 *in its original wording without the evidence cell* — "buys the appearance of rigor at the price of codifying the table that failed." Part 1 as amended answers that; the scope objection stands unanswered and is recorded here rather than rebutted.

**The audit's own counter-argument, unretracted:** every one of the five escapes was eventually caught — two by later audits, two by consumer symptoms, one by the audit itself — and four sat in subsystems already under a separate open issue. A stricter parent-verification rule buys **earlier** detection, not detection that would otherwise never happen, and it taxes every future parent task against a failure mode whose base rate is **one spec's worth of evidence**. Peter's ruling weighed this and went the other way for stated reasons (§3.1); the counter-argument is preserved so a future reader can re-weigh it if the tax proves heavier than expected.

**This author's addition:** §1.4's reproduction shows the base-rate premise is softer than the headline number on the dimension the checker addresses (68%, not 27%, for section presence in-scope). That strengthens the case for the *forced-negative line* and the *evidence cell* and weakens it slightly for the *parity checker* — which is, notably, the one part this spec spends engineering effort on. If the round finds a cheaper ordering (ship parts 1–2 by ballot; let M4's first health-check reading decide whether the checker is needed at all), that is a legitimate thing for it to find. It is **not** a reopening of §3.1 — Peter ruled on prose-plus-arm together, and the ruling stands unless he revisits it.

---

## 13. Resolution record

*(Populated as the outline round resolves. Nothing here yet.)*

| Question | Resolution | Decided by | Date |
|---|---|---|---|
| Q1 — criteria convention | open | — | — |
| Q2 — arming timing | open | — | — |
| Q3 — per-platform shape | open | — | — |
| Q4 — `(modified)`-vs-diff shape | open | — | — |
| Q5 — ownership | open (author is a named party; not self-adjudicated) | — | — |
| §6.2 — in-flight specs | open (flagged for outline review) | — | — |

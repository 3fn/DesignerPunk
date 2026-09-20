# Claims Pass — CLOSEOUT (THE PILOT): Spec 127

**Date**: 2026-09-19
**Grain**: CLOSEOUT — fired by the merge of 127's **final declared merge unit**, U3 (PR #182, squash `2b6991a0`, merged 2026-09-20T00:26:38Z / 2026-09-19 20:26 EDT)
**Auditor**: Stacy
**Population**: all three parents, all merged — Task 1 (U1, PR #180, `9bcc114e`), Task 2 (U2, PR #181, `46a43b33`), Task 3 (U3, PR #182, `2b6991a0`)
**Template authority**: `canonical/agents/stacy.md` § "Operational Mode: Claims Audit (Execution-Claims Verification — the Q5 Cut)" § "The claims-pass record" — **now charter text, merged at U3**. Req 8 + design C9 remain the upstream authority; **no divergence found between the charter text and them** (checked element by element — see Method).
**This is the pilot** (Req 8.7). The spec that says self-attestation is not verification does not self-attest.

> **This record discharges `closeout-owed(127)`.** Its path is `.kiro/specs/127-completion-claims-integrity/completion/claims-pass.md` — the exact filename the ruled predicate keys on. The MIDPOINT record remains at `claims-pass-midpoint.md` and is untouched.

> **Transport**: this record is authored on branch `chore/127-closeout-claims-pass` and rides a chore PR opened **after** the pass completed. **The audited population is the three merged units**; nothing on this branch is in scope, and this record's own transport PR is not a subject of the pass.

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR** (Req 8.8). This is a post-acceptance audit on the co-signer ground: it fired after every unit had merged and could not have blocked any of them.

**Standards implications: list — three items (S-5 … S-7), § "Standards implications" below. S-1/S-3 are reinforced with new evidence and not re-raised.**

---

## The owed-set pipeline, run before this record existed

The pipeline as shipped (`canonical/agents/stacy.md` § "The owed-set pipeline"; byte-equal copies at `.kiro/hooks/RELEASE-FLOW.md` step 5a and in Thurgood's LIVENESS item), run verbatim at 2026-09-19 20:31 EDT:

```
ratification date: 2026-09-19
specs with post-ratification merge activity: 0
OWED SET:
  (empty)
EXCLUSIONS: 0 closed; 0(a) / 0(b) / 0(c) per class; K excluded as pre-ratification (no first-parent activity since 2026-09-19)
```

**That output is wrong, and it is this pass's first finding (F-1).** The same pipeline with its date boundary forced to midnight:

```
ratification date: 2026-09-19  (boundary forced to 00:00 — see F-1)
specs with post-ratification merge activity: 1
OWED SET:
  127-completion-claims-integrity (a, anchor 2b6991a0 2026-09-19)
EXCLUSIONS: 0 closed; 1(a) / 0(b) / 0(c) per class; K excluded as pre-ratification (no first-parent activity since 2026-09-19)
```

**`closeout-owed(127)` was OPEN** — final declared unit merged (`2b6991a0`), no `claims-pass.md`, merge on the ratification date — and **this record is the discharging artifact**. Class **(a)**: 127 declares merge units under the canonical heading, so CLOSEOUT anchors on the final declared unit (U3), which is what the corrected run reports.

---

## Scope

| Dimension | This pass |
|---|---|
| Parents audited | **3 of 3** merged (Tasks 1, 2, 3) — the full spec |
| Criterion rows audited | **33** (15 Task 1 + 8 Task 2 + 10 Task 3) — the full set, no sampling at the parity limb |
| Promised artifacts walked | **27** (9 Task 1 + 12 Task 2 incl. the recorded undeclared `jest.config.js` + 6 Task 3) |
| Subtasks in population | 14 ticked (1.1–1.4, 2.1–2.7, 3.1–3.3) |
| Newly verified in this pass | Parent 3 **in full, by hand**; parent 1's appended **erratum**; parent 2's **⚠️ row, now independently discharged** with check-run evidence |
| Cited from the MIDPOINT | Its 23/23 hand parity on parents 1–2 (re-derived independently here anyway — see Method) |
| Out of scope | Re-litigation of dispositions closed at the U1 ballot review, the U2 fixture-contest adjudication, or the tasks-round rulings; the arming decision (Q2) |
| Class | The pilot. **Guard-(ii) evidence artifact** — see § "M2 by audit, for guard (ii)" and its three caveats |

---

## Findings

Two findings. **F-1 is High** and is an instrument defect in shipped law-adjacent text; **F-2 is Low** and is a recurrence of the shape the MIDPOINT named.

### F-1 — High — the owed-set pipeline returns a false-empty owed set; its first live run missed the pilot's own spec

| | |
|---|---|
| **Promised** | Task 3 criterion 5: *"`canonical/agents/stacy.md` contains the owed-set pipeline's four stages with enumerated exclusion classes, **and the MIDPOINT record-path convention…**"* — and, upstream, Req 8.4 / design C9's *"emit the owed set **plus the ENUMERATED exclusion counts by name** … so a wrong answer is a falsifiable count, never a healthy-looking short list"* |
| **Claimed** | ✅ — four stages present, `(a)/(b)/(c)` enumerated, byte-equal to `.kiro/hooks/RELEASE-FLOW.md` step 5a |
| **Shipped** | **The claim is TRUE and the artifact is DEFECTIVE.** All four stages are present and byte-equal across the three copies (verified by hand, § Method). The shipped commands, run as written, report `specs with post-ratification merge activity: 0` and `OWED SET: (empty)` on a day when 127's three units had merged and `closeout-owed(127)` was open. |

**Mechanism, demonstrated by command** (not inferred):

```
now: 2026-09-19 20:31:03 -0400
git log --first-parent --oneline --since="2026-09-19"       -> 0 commits
git log --first-parent --oneline --since="2026-09-19 00:00" -> 6 commits
--- boundary bisect ---
"2026-09-19 12:00" -> 6   "2026-09-19 19:00" -> 3   "2026-09-19 20:00" -> 2   "2026-09-19 20:30" -> 0
```

Git's approxidate resolves a **bare date** to that date **at the current time of day**. `--since="$RATIFIED"` (stage 1a, and again in stage 1b's class-(b)/(c) branch) therefore has a boundary that **moves with the wall-clock time at which the pipeline is run**. Any spec whose anchor merge falls on the ratification date earlier in the day than the run's time-of-day is **silently dropped from stage 1a** — so it never reaches the classification, the anchor, or the `test -f`, and never appears in either the owed set **or** the enumerated exclusion counts. This is not transient: run after ~20:26 EDT on any future day, the shipped pipeline excludes 127 permanently.

**Why the U1 verification could not catch it.** Task 1's criterion-7 Evidence records the pipeline *"verified to execute (`OWED SET: (empty)`)"* and *"probed for non-vacuity against an earlier date (5 specs, classes 2(a)/3(b))"*. Both observations are consistent with the defect: at U1's authoring, empty was arguably the right answer, and a non-vacuity probe against an **earlier** bare date lands its moving boundary far in the past, where the defect cannot express itself. **The probe designed to prove the pipeline non-vacuous was blind by construction to the one way it goes vacuous.** That is the same shape as U1's own recorded lesson (*verified-in-one-section, assumed-in-another*; the straggler-sweep flags that never bound) — a recurrence, on the successor instrument, inside the same spec.

**Classification**: **none of the six 112 mutation classes fits** — the criterion is verbatim, the row present, the claim true. It is an **artifact-truth finding**, which under the guide's honest-reach statement and the interim-owner clause is **the claims pass's to own today**, as judgment. The related evidence-quality dimension is S-3's unnamed class; this one is distinct — the record is faithful, the *thing recorded* is broken.

**Boundary, stated rather than assumed**: I report the defect, its demonstrated mechanism, and the falsifying commands. **I am deliberately not drafting the replacement line.** The pipeline text is Thurgood's to author in all three copies (`canonical/agents/stacy.md`, `canonical/agents/thurgood.md`'s LIVENESS item, `.kiro/hooks/RELEASE-FLOW.md` step 5a — kept byte-identical by design), and the mirror anti-rot clause's spirit binds here even though its letter binds the LENS seat.

**Routing** (Req 7.3 — owning domain agent, single instance, no threshold, as an explicit message to the named agent, never only a file in a spec directory): **Thurgood**, who authored the pipeline and owns the three copies. Also raised for **Peter** as an accounting question, § "Flagged for Peter".

### F-2 — Low — the evidence-insufficiency shape recurs at parent 3, with F-1-of-the-midpoint already in hand

| | |
|---|---|
| **Promised** | Task 3 criteria 2, 6, 7 — each setting a denominator (*"all rows of the § 11.4 superset trigger table"*, *"the full design-C9 element list"*, the Thurgood package's element list) |
| **Claimed** | ✅ with **aggregate counts**: *"all 11 rows present"*, *"20/20 C9 elements present by python assertion"*, *"15/15 package elements by python assertion"* |
| **Shipped** | The substance holds — I re-derived it independently (11/11 trigger rows + 10/10 binding-text probes; 19/19 C9 elements enumerated from the criterion's own inline list; every named Thurgood-package element located, including bound (ii) at `canonical/agents/thurgood.md:533`). **The enumerations behind the counts are absent from the record**, and design C9 is a single prose bullet with slash-separated elements — it supplies no canonical count, so *"20/20"* rests on an author-constructed segmentation nobody else can reproduce. My independent count of the same list is **19**. |

**Why it is Low, not Medium**: unlike MIDPOINT F-1, there is no internal contradiction, and in two of three cases the **criterion text carries its own enumerable denominator**, which is exactly S-1's limb (a) working — I re-derived and confirmed each. The residual defect is that the recorded *numbers* are still not reproducible. **It is recorded as a finding rather than an observation because the recurrence is the signal**: parent 3's doc was authored on the same branch, after the MIDPOINT record naming this shape landed.

**Classification**: evidence insufficiency — the class **S-3 already names as missing from the 112 taxonomy**. This is its second independent instance and should be counted as such when that amendment is considered.

**Routing**: **Thurgood** (spec-standards owner and the authoring agent for all three units). No remediation of the shipped charter text is implied — the charter text is correct. The remedy is S-1's convention, already adopted at the composed loop's first firing.

### Finding-free observations (recorded, not findings)

1. **Parent 2's ⚠️ row is now discharged by direct evidence**, upgrading the MIDPOINT's provenance-noted inference. PR #181's `completion-criteria-parity` check ran and **passed** (job `105989418412`, 1m10s), and its log reads `parent 1: PASS` / `parent 2: PASS` / `SUMMARY: parents evaluated 2, pass 2, fail 0; emissions 0; reds 0` — i.e. **green over the full population including parent 2's own completion doc**, which is the criterion as written. PR merged at `46a43b33`. **No update to the U2 record is owed**: ⚠️ was the honest mark at authoring time, and the discharge belongs here.
2. **Parent 1's erratum is accurate and lands at the right commit.** Present in `task-1-completion.md` at `2b6991a0`, absent at `9bcc114e` — appended on the U3 branch as recorded. Its substance checks out: the C8.1/C8.2/C8.6 enumerations remain absent from the record, and the erratum **declines to reconstruct the counts**, stating why. **I assess the remediation as adequate**: a count re-derived after the finding would be indistinguishable from a fitted one, and the forward fix (S-1) is where the repair belongs. The counts remain `NOT re-derivable` in this pass too — recorded, not rolled into a ✅.
3. **Parent 3 carries zero ⚠️ rows, and the zero holds under independent re-verification.** I re-verified all ten criteria substantively by hand; every one is met. A zero-⚠️ doc is the shape most deserving of suspicion, which is why it got the fullest hand treatment in this pass.
4. **All three completion docs in the working tree are byte-identical to their state at `2b6991a0`** — no post-merge drift between what was audited and what shipped.
5. **Two measurement-boundary nits, recorded so they are not mistaken for discrepancies**: the U3 doc's *"15,604 chars"* / *"5,069 chars"* section measurements are 15,603 / 5,068 under my slice — a one-character trailing-newline boundary convention, not a disagreement. And my re-run of `diff-guard` reports `no-op-green` where the doc records `full-run-green (input-closure-changed)`: the lock now matches, so my re-run exercises the fast path and is a **weaker** instrument than the recorded run. I compensated by verifying the mirrors' verbatim property directly (§ Method) rather than relying on the guard's verdict.

---

## Method

**The sample, named, and how many of the total.**

| Limb | Sample | Fraction |
|---|---|---|
| **Exact-set parity** | **All 33 criterion rows, all 3 parents** — re-derived **by hand in this pass**, not cited | **33 / 33 = 100%** |
| **Parent 3 substantive re-verification** | **All 10 criteria** | **10 / 10 = 100%** |
| **Parents 1–2 substantive re-check** | A named sample of the MIDPOINT's 13 Method rows, re-run in this session (enumerated below) | **12 / 13 = 92%** |
| **Promised artifacts** | Every declared path across all three parents | **27 / 27 = 100%** |
| **Newly-checkable items** | Parent 2's ⚠️ discharge; parent 1's erratum | 2 / 2 |

**The circularity guard.** Parity was computed by an **independent Python re-implementation** of the four normalization rules, written from `governance/completion-documentation-guide.md` § "How a cell is compared", deliberately **not importing `scripts/completion-claims/*`** (the instrument is U2's own deliverable; auditing U2 with U2 alone would be circular). Result: **parent 1 — 15 promised / 15 claimed, multiset EQUAL; parent 2 — 8 / 8, EQUAL; parent 3 — 10 / 10, EQUAL.** Zero drops, rewords, invents, absorbs. *Self-correction recorded: my first extractor over-captured parent 1's Additional-verification header row and reported 16; the defect was mine, fixed, re-run.*

**Parent 3, criterion by criterion — all by hand:**

| Criterion | How verified | Result |
|---|---|---|
| 1. charter cut present | Substring assertion of both ballot § 11.1 blockquotes against canonical + both mirrors | **6/6 True** |
| 2. § 11.4 trigger table rows | Row-token count + 10 binding-text probes over the shipped section | **11/11 rows; 10/10 binding probes** |
| 3. mirror anti-rot clause | String-equality vs ballot § 16.2's quoted form (len 279) | **Equal in canonical, `.claude`, `.kiro`** |
| 4. carve-out verbs + both falsifications | 6 element probes | **6/6 present** |
| 5. owed-set pipeline + midpoint path convention | Stage markers, `(a)/(b)/(c)`, convention string; fenced block compared byte-for-byte to RELEASE-FLOW 5a | **Present; BYTE-EQUAL**. *(The text is present as promised — its correctness is F-1)* |
| 6. C9 template element list | 19 elements enumerated from the criterion's own inline list, probed | **19/19 present** (the recorded aggregate is 20 — F-2) |
| 7. Thurgood package | Composed-loop duties, LIVENESS pipeline (byte-equal after the 2-space list-indent strip), proposed-row read, his anti-rot clause, explicit-message clause, caller-out duty, three Req 7.9 bounds incl. (ii) at `:533` | **All located** |
| 8. Agent-Directory | Both cut-sentence **bodies** string-equal to ballot § 11.1 (len 391 / 277); the three enumerated superseded phrasings grepped | **Both present; 0 / 0 / 0** |
| 9. diff-guard + mirrors verbatim | `npx tsx tools/agent-generator/diff-guard.ts` → `no-op-green`, lock hash unchanged, `git status` clean; **plus** direct verbatim containment of the shipped sections in both mirrors | **stacy claims-audit § (15,603 ch) and thurgood Q5 § (5,068 ch) + Civitas Steward § (8,655 ch) all verbatim in `.claude/agents/` and `.kiro/agents/`** |
| 10. `npm test` green | **Re-run by hand** | `Test Suites: 365 passed, 365 total` · `Tests: 9027 passed, 9027 total` · exit 0 — **exact match to the claim** |

**Parents 1–2 — the 12 re-checked claims** (the one **not** re-done is named): `--verify-extraction` digest and totals re-run → `TOTALS (154 files): P1=1128 P2=793 P3=66 P4=17 P5=710 P6=17 P7=3 P8=1 segments=8892`, `corpus digest: sha256:d962e502093858af50862844c781388551057013a187786dfee327756bd59593` — **byte-identical** to the recorded run and to ballot § 5.7; `Ratified-machine:` anchored count → `1`; TCP pointer in both parent sequences → `2`, lines 46 and 56 inspected; `EXPECTED_CONTEXTS` untouched → `grep -c` `0`; fixture set → 31 fixtures / 17 classes / 6 suites; standing red-at-zero test → `fixtures.test.ts:160`; all 21 parent-1/2 artifacts exist; `npm test` (shared above); CI workflow + fixed check context (confirmed live on **both** PRs' check lists); association manifest + emission summary (checker re-run, below); the C8.1/C8.2/C8.6 checklists **re-audited and still NOT re-derivable**; exact-set parity (re-derived). **Not re-done: the MIDPOINT's 15-of-47 anchor spot-check** — the anchors were re-opened once, at the MIDPOINT, and nothing has changed on that surface; I cite that verification rather than repeating it, and say so.

**The checker, read as a reader — not as the auditor** (DD3). Re-run in this session:

```
== completion-criteria-parity ==
ratification record: 2026-09-19 (.kiro/docs/ballots/2026-09-19-completion-claims-integrity.md)
spec 127-completion-claims-integrity (per-parent):
  association: parent 1 ← block at line 46
  association: parent 2 ← block at line 84
  association: parent 3 ← block at line 119
  parent 1: PASS
  parent 2: PASS
  parent 3: PASS
population: 154 tasks.md — 1 declared per-parent, 0 spec-level (skipped), 153 legacy (skipped)
SUMMARY: parents evaluated 3, pass 3, fail 0; emissions 0; reds 0
```

Its verdict agrees with my hand comparison in both directions, which is why quoting it here is corroboration rather than circularity.

**Per-row, per-platform honesty.** 127 is a governance/tooling spec with **no platform-spanning claims and no generated Swift or Kotlin in its promise set**. **No row in this population required the string `not re-verified — toolchain unavailable`, and none was rolled into a ✅ to avoid it. Zero rows are recorded as unverifiable.** One row required a different kind of honesty and got it in prose rather than by stretching that closed vocabulary: parent 1 criterion 5's counts are recorded as **not re-derivable from the record** (F-1 of the MIDPOINT, re-audited here) — a record-quality gap, not a toolchain gap, and the vocabulary is deliberately not widened to cover it.

---

## Counting block (Req 8.6) — over all three parents

| Duty | Count over this population | Note |
|---|---|---|
| **Criteria-block omissions** | **0 of 3 parents** | All three declare `**Success Criteria:**` immediately after the parent line, per the ruled association rule (checker manifest: blocks at lines 46 / 84 / 119) |
| **Criteria vagueness** | **3 of 33** (T1-05, T1-06, T3-09) | T1-05/T1-06 set their denominator by reference to an **unenumerated prose paragraph** (design C8.1/C8.3). T3-09's *"each new charter section"* has no enumerated denominator at all — the author chose four sections; another auditor could choose differently. **Borderline, counted as NOT vague with the reason stated**: T3-02's *"all rows of the § 11.4 table"* references a **table**, whose rows are mechanically countable, so it is re-derivable. Separately: **1 volatile-measurement instance** (T1-04, *"all 153 `tasks.md`"*, measured 154) — not vagueness; S-2's shape |
| **Declared-none rate** | **0 of 3 parents (0%)** | No parent declared `**Success Criteria:** none — …` |
| **Fixed-string exemption usage** | **0 instances** | `grep -rn "Criteria fidelity: exempt"` over `completion/` → the only hit is the MIDPOINT record's own counting-block **mention**, not a claim. 127 is post-ratification and claims no in-flight exemption. *(The ruled abuse detector behind the declined sunset: usage rate is 0/3 here)* |
| **Bundled-claim instances** | **0** | |
| **Incomplete-decomposition instances** | **0** | **A-12 caveat, stated rather than assumed: 127 has ZERO platform-spanning claims, so this population cannot exercise the decomposition limb at all. The empty count is absence-of-instances, NOT evidence of adoption**, and must not be read as the latter at the 5.Z sitting |
| **`(platforms: …)` fallback invocations** | **0** | The corpus hits are **mentions of the element** inside T1-06's criterion text, its `tasks.md` bullet, and the MIDPOINT's own counting row — no invocation exists anywhere in 127 |
| **M1** — criteria section present | **3 / 3 (100%)** | Baseline 15/22 (68%) |
| **M2** — parity with `tasks.md` | **3 / 3 parents; 33 / 33 rows exact-set (100%) — BY AUDIT, BY HAND** | Baseline count-parity 7/15 (47%); true verbatim parity plausibly ~0. **See the N-accounting caveats before this is counted anywhere** |
| **M3** — every row carries a non-empty Evidence cell | **33 / 33 (100%)** | Baseline ~0. Zero empty cells, zero prose-only cells. **Quality caveat, now with two independent instances: 3 rows at parent 1 (MIDPOINT F-1) and 3 at parent 3 (F-2) carry unreproducible aggregates.** M3 measures presence, not re-derivability — the gap S-3 names |
| **M4** — forced-negative line present | **3 / 3 (100%)** | Baseline 0/22. Two carry real content, one carries `None` and the `None` survives audit |
| **M5** — any ⚠️/❌/Partial marker | **2 of 3 docs (67%); 3 of 33 rows ⚠️ (9%); 0 ❌** | Baseline 0/22 in-scope. Parent 3's zero was independently re-verified and holds (§ Observations 3). **The failure vocabulary was used unprompted on the rule's first three artifacts, including against the author's own work** — and one of those ⚠️s has since been discharged by evidence rather than by assertion |

**Honest reading of these numbers, unchanged in force from the MIDPOINT**: N = 3, all three parents authored by the agent who wrote the law, under the required reviewer's eye, on the spec whose subject is this rule. **This is a ceiling, not a typical reading**, and every percentage above should be quoted with that caveat attached or not quoted at all.

---

## Report-set comparison (Req 8.6 / 2.6.5)

**Vacuous for this population, stated rather than skipped.** `.kiro/specs/127-completion-claims-integrity/reports/` does not exist; 127 has no committed Implementation Reports because it has no product-parity parents and no platform-spanning claims. There are **zero decomposed per-platform rows** to compare against a report set, so the incomplete-decomposition guard (two bullets where three platforms apply) produces **no signal here**. Per A-12 that is a property of 127's composition, not evidence about the convention.

---

## Emission-reading duty

The interim-owner clause, carried **verbatim**:

> *once `promised-artifact-exists` is built, read its emission lines; until then the pass owns promised-artifact gaps as judgment*

`promised-artifact-exists` is **proposed and unbuilt** — `governance/classification-map.md § "promised-artifact-exists"` reads `check_state: proposed`, `checks: []`, `owner: stacy` (Peter's J1 option-B ruling, with the pre-committed flip to thurgood at build time). There are no emission lines from it to read. **This pass therefore owns promised-artifact gaps as judgment, and exercised it:**

- **All 27 promised artifacts exist at their declared paths** (`test -e` per path, re-run by hand; parent 3's six include the two regenerated trees and `canonical/generated.lock`).
- **One declared-path deviation**, recorded by the author rather than found by me (parent 1's `2026-09-XX` placeholder → shipped `2026-09-19-…`), compliant under a pre-existing `**Criteria mode**: per-parent` declaration.
- **Two undeclared shipped files, recorded rather than silent**: `jest.config.js` (parent 2) and parent 3's honest listing of the MIDPOINT record plus the parent-1 erratum as files on the branch beyond the declared set.
- **Judgment verdict: zero promised-artifact gaps.**

**The `completion-criteria-parity` run's emission lines for the closing spec, read either way**: `emissions 0; reds 0` across all three parents. No declared-none waiver was invoked, no exemption was honored, no deferral was declared, and **no `completion doc not found — not evaluated` emission fired** — the surface `parent-completion-docs-present` (proposed/unbuilt; interim owner: this pass) names explicitly. Every ticked parent in the spec carries its doc.

---

## Deferral walk-back (a written CLOSEOUT duty)

**Zero `Artifact deferred:` declarations in the population. Verified, not assumed**: `grep -rnE '^Artifact deferred:'` over `.kiro/specs/127-completion-claims-integrity/completion/` → **0**, run over **all** completion docs including `task-3-completion.md`. A broader case-insensitive scan for `defer(red|ral)` returns only: T1-06's criterion naming the form as a required C8.3 element; T1-09's Evidence citing the **worked example's** declaration at `Process-Spec-Planning.md:2148`; T3-06's criterion text; and two `task-2` subtask-prose references to the parser feature and a fixture adjudication. **None is a deferral by this spec** — and none is a free-prose deferral attempting to earn an exclusion. **Nothing to walk back; no undelivered deferral; no finding.**

---

## Rider (a) — the spec-level-criteria discharge

CLOSEOUT is the natural home for this discharge. **For 127 the home is empty, and that is recorded rather than left to inference**: `tasks.md:7` declares `**Criteria mode**: per-parent`, so 127 defines **no spec-level criteria set**. The rider-(a) limb (*"a `spec-level` spec discharges once, at closeout, through the claims pass"*) is **inapplicable to this spec**. The per-parent discharge is the criteria-table audit above.

---

## Post-unit obligations (tasks.md declares these "verified by the claims passes, not completion docs")

| Obligation | Verdict | How |
|---|---|---|
| Post-U1 `rebuild_index` (guide, PSP, PHP, classification-map — Req 12.8) | **Effect confirmed on a 2-of-4 sample** | The docs MCP serves the **new** content: `completion-documentation-guide § "Parent Success-Criteria Fidelity"` and `process-spec-planning § "tasks.md Structural Conventions"` both return the shipped law text. **Stated precisely: I verified the index's freshness (the effect), not the invocation** — see the carve-out note below |
| Post-U3 `rebuild_index` **if any served doc changed** | **Condition not met — not owed** | U3's non-generated diff is: the three completion/claims records, `tasks.md`, `.kiro/steering/Agent-Directory.md` (an **identity doc, never MCP-served**), `canonical/agents/*`, `canonical/generated.lock`, and a summary doc. **No MCP-served governance doc changed at U3** |
| MIDPOINT pass at U2's merge | **Discharged** | `completion/claims-pass-midpoint.md`, present at `2b6991a0` |
| CLOSEOUT pilot after U3's merge | **Discharged by this record** | |

**The steward-verb carve-out was NOT invoked in this pass.** The `rebuild_index` obligation is the nearest thing to a steward-verb-gated claim the population contains, and its evidence **did not require** the withheld verbs: index freshness is observable through the read verbs in my grant. Per the carve-out's own text (*"Ambiguity resolves to Stacy"*), I owned it. **Falsification tracking, since both conditions are live**: this is pass **2 of the first three**; **Thurgood has invoked the exclusion zero times**, and **zero steward-verb-gated claims have been encountered** across the two passes so far. If the third pass also encounters none, the exclusion is **dropped, not carried**.

---

## M2 by audit, for guard (ii) — with its caveats attached, not appended

**The number**: M2 measured **BY AUDIT, BY HAND** on **3 in-scope parents / 33 criterion rows**, 100% exact-set parity, by an independent re-implementation of the normalization rules.

Three caveats travel with that number and **must not be separated from it**:

1. **Ceiling, not typical.** All three parents were authored by the agent who wrote the law, under a required reviewer, on the spec whose subject is this rule, with the checker in hand. A 100% here predicts very little about an ordinary spec authored by an agent meeting the convention for the first time.
2. **The A-12 composition bound.** 127 has **zero platform-spanning claims**. The decomposition limb — the part of the convention most likely to fail in the wild, and the reason the structural limb was written as law — **was never exercised**. Its zero counts in the block above are **absence-of-instances, not evidence of adoption**.
3. **The double-count hazard, restated by the auditor who raised it.** This pilot's parents 1 and 2 **are the MIDPOINT's entire population**. The MIDPOINT measured M2-by-audit on 2 parents; this pass measures it on those same 2 plus parent 3. **Adding the two passes' counts would credit 127 with 5 and clear guard (ii)'s floor on its own, with 3 real parents. 127 supplies AT MOST 3 independent in-scope parents toward N ≥ 5.** I flag the hazard; **the accounting rule is Peter's to set**, and it rides to the 5.Z sitting with the A-2 question.

---

## Standards implications

**Standards implications: list.** Three new items for Thurgood to mine (he reads every pass in full, records the one-line outcome, and never grades the audit). **S-1 and S-3 are reinforced, not re-raised** — F-2 is their second independent instance, and S-1's limb (a) is visibly what made parent 3's criteria 6/7 auditable at all.

**S-5 — a documented command that embeds a date comparison needs its boundary stated, and a non-vacuity probe is not a correctness probe.** The owed-set pipeline's `--since="$RATIFIED"` inherits git approxidate's *current-time-of-day* resolution for a bare date, which makes the predicate's boundary a function of when it is run. The U1 verification did exactly what a careful author does — executed it, then probed it for non-vacuity against an earlier date — and **that probe was blind by construction to this defect**. The teachable pair: (a) a documented command whose semantics depend on a parser's defaulting behaviour should pin the default explicitly; (b) **"I proved it can return non-empty" is not "I proved it returns the right set"** — the corpus now has two instances of this exact shape (U1's straggler sweep, this pipeline), both in the spec about instruments that report green while verifying nothing.

**S-6 — the release surface and the health-check surface inherit the defect silently, because the three copies are byte-identical by design.** That design decision is right (one text, three homes), but it means a defect in one is a defect in all three **with no divergence signal**. There is no convention today for how a byte-identical multi-homed command gets corrected as a unit, or for who verifies that all three moved. Candidate: a one-line convention naming the copy set at the point of authorship, so a repair has an enumerated denominator — the same medicine S-1 prescribes for criteria.

**S-7 — when a spec assigns a post-unit obligation to "the claims passes", it should say who verifies an obligation whose evidence sits behind the steward-verb carve-out.** 127's `tasks.md` § "Post-unit obligations" routes `rebuild_index` verification to the passes. It resolved cleanly here (the *effect* is observable through read verbs, and ambiguity resolves to Stacy), but it resolved **by my judgment at audit time, not by anything written down**. Candidate: one sentence in the conventions § — a post-unit obligation assigned to a claims pass names its verification surface, and where that surface is steward-verb-gated, it says so.

---

## Flagged for Peter

1. **Does F-1 count toward the pre-committed staged-mechanization trigger?** The charter pre-commits: *"the second wrong owed-set result noticed in ordinary use (the LIVENESS read or the release step — the named de-facto detectors) earns a committed script + a scoped grant."* This is the **first** wrong result, and it was noticed **by a claims pass**, which is not one of the two named de-facto detectors. Three defensible readings: (a) it counts as instance one and the trigger stands as written; (b) the detector list was an enumeration of *where we expected to notice*, not a restriction on *what counts*, so it counts; (c) a defect this mechanism-level argues the trigger should not wait for a second instance at all. **I am surfacing the fork, not picking it** — the accounting rule is yours.
2. **The N ≥ 5 double-count hazard, carried forward as promised** (§ "M2 by audit"). 127 supplies at most **3** independent in-scope parents. It rides to the 5.Z sitting with the A-2 accounting question.
3. **The pilot's verdict, plainly**: the convention held on its first three artifacts — 33/33 exact-set parity by hand, 100% M1/M3/M4, the failure vocabulary used unprompted, one ⚠️ since discharged by evidence. **And the first live run of the machinery's own query returned a false green.** Both facts are the pilot's output; reporting only the first would be the error this spec exists to prevent.

---

## Related

- Population: `completion/task-1-completion.md` (incl. the appended erratum), `task-2-completion.md`, `task-3-completion.md`
- Prior pass: `completion/claims-pass-midpoint.md` (+ its appended composed-loop outcome)
- Promise sets: `.kiro/specs/127-completion-claims-integrity/tasks.md` parents 1–3
- Template authority: `canonical/agents/stacy.md` § "The claims-pass record"; upstream `requirements.md` § "Requirement 8", `design.md` § "C9"
- The law: `governance/completion-documentation-guide.md` § "Parent Success-Criteria Fidelity"
- The instrument: `scripts/check-completion-criteria-parity.ts` (`check_state: proposed`, non-required — unchanged by this pass)
- The defective pipeline (F-1): `canonical/agents/stacy.md` § "The owed-set pipeline"; `canonical/agents/thurgood.md` LIVENESS item; `.kiro/hooks/RELEASE-FLOW.md` step 5a

---

## [THURGOOD] Composed-loop outcome (2026-09-19 — the loop's second firing)

Read in full, per the charter duty. Outcomes:

- **S-5: adopted, and the mechanical half applied in this same PR** — the date boundary is pinned (`--since="$RATIFIED 00:00"` with an explanatory comment) in all three copies, verified byte-identical after the fix (thurgood's modulo its list indent), and the repaired pipeline re-run live: 127 now enumerated, class (a), CLOSED by this record. The teaching half ("a non-vacuity probe is not a correctness probe") is queued with S-1/S-2 as a recorded guide/PSP amendment candidate.
- **S-6: adopted** — the repair itself was executed as the convention S-6 asks for (one commit, three enumerated copies, byte-equality re-verified); the one-line copy-set convention is queued for the same amendment vehicle.
- **S-7: adopted** — the one-sentence conventions candidate (a post-unit obligation assigned to a claims pass names its verification surface, and says so when that surface is steward-verb-gated) joins the queue. Her judgment call on the `rebuild_index` verification (effect-over-invocation, ambiguity-resolves-to-Stacy) is recorded as the correct exercise of the tiebreaker — an outcome about what the docs should teach, not a re-grade of the audit.

**F-1 remediation (mine)**: applied in this PR as above; the U1 verification's blind-probe lesson is folded into S-5's teaching half rather than re-adjudicated. **F-2 remediation (mine)**: an attributed erratum on `task-3-completion.md` reproduces both surviving probe enumerations verbatim, making the recorded counts re-derivable by grep and dissolving the 20-vs-19 denominator split into a stated segmentation — this one COULD be honestly reconstructed because the executed lists survive verbatim, unlike Task 1's (whose erratum correctly declined).

**Ladder accounting**: F-1 is logged as wrong-owed-set-result **instance one**, noticed by a claims pass. Whether a pass-noticed wrong result counts toward the pre-committed "second wrong result noticed in ordinary use" trigger is Peter's fork (three readings in § "Flagged for Peter"); pending his ruling, the conservative log is kept: **count = 1, trigger not yet fired, next wrong result promotes under any reading.**

The standards-amendment queue now holds S-1 … S-7 (S-1/S-3 with two independent instances each); the vehicle is a recorded guide/PSP amendment via the ballot model, drafted by Thurgood, at Peter's convenience — deliberately NOT bundled into 127's closeout PR.

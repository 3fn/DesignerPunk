# Claims Pass — MIDPOINT: Spec 127 (Tasks 1–2)

**Date**: 2026-09-19
**Grain**: MIDPOINT (U2 is 127's declared midpoint carrier — `tasks.md` § "Declared Merge Units")
**Auditor**: Stacy
**Population**: the parents of Tasks 1 and 2, both merged — U1 = PR #180 (`9bcc114e`), U2 = PR #181 (`46a43b33`)
**Template authority**: Req 8.3 + design C9 **as merged spec documents** (Stacy A-14 — the template's authoritative home is not yet charter text; that lands in U3, in progress)

> **Filename convention — load-bearing.** This record is `claims-pass-midpoint.md` and is **never** written to `claims-pass.md`. The ruled owed-set predicate keys on `.kiro/specs/S/completion/claims-pass.md` *exactly*; a midpoint record at that path would silently discharge `closeout-owed(127)`. The distinct filename resolves the collision without touching the ruled predicate (Stacy BLOCKING-6, ruled at the tasks round). U3's charter text documents this convention for every future carrier spec.

> **Transport**: this record is authored on branch `task/127-u3-charters` and rides the U3 PR as transport. The **audited population is the U1 and U2 merges** — nothing on the U3 branch is in scope, and this record's own transport PR is not a subject of the pass.

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR** (Req 8.8). This is a post-acceptance audit, on the co-signer ground. It fired after U2's merge and could not have blocked it.

**Standards implications: list — four items (S-1 … S-4), § "Standards implications" below.**

---

## Scope

| Dimension | This pass |
|---|---|
| Parents audited | 2 of 2 merged (Task 1, Task 2). Task 3 is unticked and out of population |
| Criterion rows audited | 23 (15 Task 1 + 8 Task 2) — **the full set, not a sample** |
| Promised artifacts walked | 21 (9 Task 1 + 12 Task 2, the latter incl. the recorded undeclared `jest.config.js`) |
| Subtasks in population | 11 ticked (1.1–1.4, 2.1–2.7) |
| Out of scope | Task 3 / U3; any re-litigation of dispositions closed at the U1 ballot review or the U2 fixture-contest adjudication; the arming decision (Q2) |
| Class | Hour-class. **This is NOT the CLOSEOUT pilot** — that runs after U3 over the full spec, is 127's `claims-pass.md`, and is the guard-(ii) evidence artifact |

---

## Findings

Two findings. Both **Low-to-Medium**; neither is a mutation of the promise set — **exact-set parity holds on both parents** (§ Method).

### F-1 — Medium — the C8-element checklists are claimed but not reproducible from the record

| | |
|---|---|
| **Promised** | Task 1 criterion 5: *"The guide subsection contains every design-C8.1 element, the PSP Tier-3 section every C8.2 element, and the PHP Tier-2 section every C8.6 element — verified by the completion doc's per-element checklist **enumerated from the design's C8 lists** (the stable denominator — Stacy A-3) with line anchors"* |
| **Claimed** | ✅, evidence: *"**C8.1: 25/25**"*, *"**C8.2: 14/14**"*, *"**C8.6: 14/14**"* + line-anchor lists (22 / 14 / 11 anchors respectively) |
| **Shipped** | The anchors are real and land on the claimed content (spot-checked: guide `:92 :105 :143 :148 :162 :201 :203`; PHP `:73 :81 :91 :94`; PSP `:1915 :2132 :2148 :2257` — every one substantive and on-topic). **The per-element checklist itself is not in the completion doc** — only its aggregate result. The denominator that criterion 5 exists to fix ("the stable denominator", the point of Stacy A-3) is nowhere in the record. |
| **Internal inconsistency** | The same Evidence cell claims **25/25** for C8.1 and quotes the review saying *"all 12 C8.1 elements present"*. Two denominators for one list, unreconciled. Both may be defensible at different enumeration grains — but the record does not say which grain either is, so neither is checkable. |

**Classification**: **none of the six 112 mutation classes fits.** This is not drop, reword, relax, omit-doc, invent, or absorb — the criterion text is verbatim, the row is present, the doc exists. It is **evidence insufficiency** (the M3 dimension): a ✅ whose stated verification instrument cannot be re-derived from the record. The taxonomy has a metric for this and no name for it — see S-3.

**Assessment, candidly**: I found no reason to doubt the underlying work; every anchor I sampled checks out, and an independent reviewer confirmed the sections at the time. The defect is that the ✅ rests on a count nobody can recompute. On the spec whose entire thesis is *a claim you cannot re-derive is not a verified claim*, that is the finding worth carrying — and it is the productive kind of irony, not a gotcha.

**Routing** (Req 7.3 — owning domain agent, single instance, no threshold, as an explicit message to the named agent, never only a file in a spec directory): **Thurgood**, who authored U1. No remediation of the shipped law text is implied — the law text is correct. The remedy is S-1/S-3 at the standards level.

### F-2 — Low — zero subtask completion docs against a live TCP duty

| | |
|---|---|
| **Promised** | `Task-Completion-Protocol.md` § "For SUBTASKS" step 2: *"Create completion doc: `.kiro/specs/[spec]/completion/task-N-M-completion.md`"* |
| **Claimed** | Nothing — the parent docs' "Subtask contributions" sections narrate the subtasks; no subtask doc is claimed anywhere |
| **Shipped** | `ls .kiro/specs/127-completion-claims-integrity/completion/` → `task-1-completion.md`, `task-2-completion.md`. **0 of 11 ticked subtasks carry a doc.** |

**Classification**: **omit-doc**, at subtask grain. It is **not** a Req-1 fidelity violation — the Parent Success-Criteria Fidelity rule binds parents, and both parents complied.

**Self-corroborating**: Task 1's own Lessons learned names this as causal — *"Four application-time adaptations were made… none was recorded until an external pass looked. **There was no completion doc for 1.2 or 1.3 to hold them.**"* The record is faithful about the gap; the duty was still unmet.

**Corpus context** (measured, not asserted): `127` = 2 parent docs / 0 subtask docs; `125-B-classification-map` = 0 / 21; `122-agent-generator` = 0 / 5. The corpus satisfies one TCP doc duty or the other, **never both**. This reads as an unresolved standards question, not as a 127 lapse — see S-4.

**Routing**: **Thurgood** (spec-standards owner; also the authoring agent for both units).

### Finding-free observations (recorded, not findings)

1. **Task 2's ⚠️ is now factually discharged.** Criterion 3 (*"The CI run on the U2 PR itself is green over the full population"*) was ⚠️ at authoring because the doc commits before the PR exists. PR #181 merged all-green, discharging it. *Provenance note*: taken from the repository context supplied to this session (squash commit `46a43b33`, *"Task 2 Complete: Build and prove the instrument (127) (#181)"* on `main`); I did not independently query the PR's check-run API — this pass runs under a no-git-commands constraint.
2. **Task 1's two ⚠️ rows are faithfully recorded**, both carried into the forced-negative line with their grounds, and both were dispositioned at the U1 ballot review. Not re-litigated here: my job is whether the record is faithful, and it is.
3. **Task 1's Primary-Artifacts deviation is recorded, not smoothed.** The declared path carried a `2026-09-XX` date placeholder; the artifact shipped at `2026-09-19-…`. The doc records the deviation instead of writing *"all shipped as declared"* — the rule working on its own first artifact.
4. **Task 2 records an undeclared modified file** (`jest.config.js`, needed for the six suites to run in the functional lane) rather than leaving it silent. Same discipline.
5. **The criterion-4 count delta is handled correctly.** Criterion 4 says *"all 153 `tasks.md`"*; the measured corpus is 154 (127's own file). The doc reproduces the criterion verbatim at 153 and attributes the delta, rather than substituting the number — which would have been the **reword** class. Correct handling; the underlying authoring hazard is S-2.

---

## Method

**The sample, named, and how many of the total: 23 of 23 criterion rows — 100%, no sampling.** 21 of 21 promised artifacts walked — 100%.

**What I re-verified by hand vs. what I took from the instrument** (the circularity duty: the checker is U2's own deliverable; auditing U2 with U2 alone would be circular):

| Claim | How verified | Result |
|---|---|---|
| Exact-set parity, both parents | **By hand** — an independent Python re-implementation of the four normalization rules from the guide's law text, deliberately not importing `scripts/completion-claims/*`; multiset comparison of `tasks.md` bullets vs. criteria-table first cells | **Parent 1: 15 promised / 15 claimed, multiset EQUAL. Parent 2: 8 / 8, multiset EQUAL.** Zero drops, zero invents, zero rewords, zero absorbs |
| `npm test` → 365 suites / 9,027 tests | **Re-run by hand** | `Test Suites: 365 passed, 365 total` · `Tests: 9027 passed, 9027 total` · exit 0. **Exact match** |
| `--verify-extraction` digest + per-class totals | **Re-run by hand** | `TOTALS (154 files): P1=1128 P2=793 P3=66 P4=17 P5=710 P6=17 P7=3 P8=1 segments=8892`, `corpus digest: sha256:d962e502093858af50862844c781388551057013a187786dfee327756bd59593` — **byte-identical to the recorded run and to ballot § 5.7's eight class counts** |
| `Ratified-machine:` anchored-regex count = 1 | **Re-run by hand** | `1` |
| TCP pointer present in both parent sequences | **Re-run by hand** | `grep -c` → `2`; lines `:46` and `:56` both the "Create completion doc" bullet |
| `EXPECTED_CONTEXTS` untouched (checker non-required) | **Re-run by hand** | `grep -c completion-criteria-parity tools/agent-generator/verify-gate-registration.sh` → `0` |
| CI workflow exists with the fixed check context | **Re-run by hand** | `.github/workflows/completion-criteria-parity.yml` — `name: completion-criteria-parity`, `on: pull_request`, `fetch-depth: 0` |
| 31 fixtures / 17 classes / 6 suites / 31 specs | **Re-run by hand** | 31 encoded fixtures; `expected-classes.json` → 17 classes; 6 suites in `__tests__/`; `fixtures/` → 32 `.md` = 31 specs + INDEX |
| Standing red-at-zero floor test | **Read the shipped source by hand** | `fixtures.test.ts:160` — `STANDING red-at-zero…`, `uncoveredClasses(manifest.classes, [])`. Reconstructible from the tree, as A-5 required |
| All 21 promised artifacts exist at declared paths | **Re-run by hand** (`test -e` per path) | 21/21 present |
| C8.1/C8.2/C8.6 element checklists | **NOT re-derivable** — the enumeration is absent from the record (F-1). Anchors spot-checked by hand instead: 15 of 47 cited anchors opened and read | All 15 land on the claimed content; the counts themselves remain unreproducible |
| Association manifest + emission summary | **Taken from the instrument** (DD3 gives the pass its output as a reader) — and its parity verdict is independently corroborated by my hand comparison above, which is why this is not circular | `parents evaluated 2, pass 2, fail 0; emissions 0; reds 0` |

**Per-row, per-platform honesty**: 127 is a governance/tooling spec with **no platform-spanning claims and no generated Swift or Kotlin in its promise set**. No row in this population required the string `not re-verified — toolchain unavailable`, and none was rolled into a ✅ to avoid it. Zero rows are recorded as unverifiable.

---

## Counting block (Req 8.6)

| Duty | Count over this population | Note |
|---|---|---|
| **Criteria-block omissions** | **0 of 2 parents** | Both parents declare `**Success Criteria:**`, placed after the parent line per the ruled association rule |
| **Criteria vagueness** | **2 of 23** (T1-05, T1-06) | Both set their denominator **by reference to an unenumerated prose paragraph** (*"every design-C8.1 element"*). This is precisely the vector that produced F-1 and the T1-06 ⚠️. Separately noted: **1 volatile-measurement instance** (T1-04, *"all 153 `tasks.md`"*) — not vague, but stale by completion; see S-2 |
| **Declared-none rate** | **0 of 2 parents (0%)** | No parent declared no criteria |
| **Fixed-string exemption usage** | **0 instances** | `grep -rn "Criteria fidelity: exempt"` over `completion/` → no match. 127 is post-ratification and claims no in-flight exemption |
| **Bundled-claim instances** | **0** | |
| **Incomplete-decomposition instances** | **0** | **A-12 caveat, stated rather than assumed: 127 has zero platform-spanning claims, so this population cannot exercise the decomposition limb at all. The empty count is absence-of-instances, NOT evidence of adoption**, and must not be read as the latter at the 5.Z sitting |
| **`(platforms: …)` fallback invocations** | **0** | The two grep hits in the corpus are *mentions of the element* inside a criterion and its Evidence cell (T1-06), not invocations of the fallback form |
| **M1** — criteria section present | **2 / 2 (100%)** | Baseline 15/22 (68%) |
| **M2** — parity with `tasks.md` | **2 / 2 parents, 23 / 23 rows exact-set (100%) — BY AUDIT, by hand** | Baseline count-parity 7/15 (47%), true verbatim parity plausibly ~0. See the N-accounting flag below before this is counted anywhere |
| **M3** — every row carries a non-empty Evidence cell | **23 / 23 (100%)** | Baseline ~0. Zero empty cells, zero prose-only cells; every row carries ≥1 of the four evidence kinds. **Quality caveat: three rows' evidence is an unreproducible aggregate (F-1)** — M3 measures presence, not re-derivability, which is the gap S-3 names |
| **M4** — forced-negative line present | **2 / 2 (100%)** | Baseline 0/22. The template defect is fixed and the fix took on first use |
| **M5** — any ⚠️/❌/Partial marker | **2 / 2 docs (100%); 3 of 23 rows ⚠️ (13%); 0 ❌** | Baseline 0/22 in-scope. **The most informative number here**: the failure vocabulary was used, unprompted, on the rule's own first two artifacts, including once against the author's own work |

**Honest reading of these numbers**: N = 2, both parents authored by the agent who wrote the law, under the reviewer's eye, on the spec whose subject is this rule. **This is a ceiling, not a typical reading**, and every percentage above should be quoted with that caveat attached or not quoted at all.

---

## Report-set comparison (Req 8.6 / 2.6.5)

**Vacuous for this population, stated rather than skipped.** 127 has no `reports/` directory and no committed Implementation Reports, because it has no product parity parents and no platform-spanning claims. There are zero decomposed rows to compare against a report set. This limb produces no signal here — and, per A-12, that is a property of 127's composition, not evidence about the convention.

---

## Emission-reading duty

The interim-owner clause, carried **verbatim** (design C9 / Req 8.6 — the condition Stacy's (b) confirmation rests on):

> *once `promised-artifact-exists` is built, read its emission lines; until then the pass owns promised-artifact gaps as judgment*

`promised-artifact-exists` is **proposed and unbuilt** (`governance/classification-map.md § "promised-artifact-exists"`; owner stacy per Peter's J1 option-B ruling, with a pre-committed flip to thurgood at build time). There are no emission lines to read. **This pass therefore owns promised-artifact gaps as judgment, and exercised it:**

- All **21** promised artifacts exist at their declared paths (`test -e` per path, re-run by hand).
- **One declared-path deviation**, recorded by the author rather than found by me: the `2026-09-XX` placeholder → shipped at `2026-09-19-…`, with `tasks.md` corrected at completion under a pre-existing `**Criteria mode**: per-parent` declaration. Compliant, and routed to U2's fixture set at the time as the corpus's first live `<placeholder>`-in-a-promised-path instance.
- **One undeclared shipped file**, recorded rather than silent: `jest.config.js` (roots extension).
- **Judgment verdict: zero promised-artifact gaps.**

---

## Deferral walk-back

**Zero `Artifact deferred:` declarations in the population.** Verified, not assumed: `grep -rnE "^Artifact deferred:"` over `.kiro/specs/127-completion-claims-integrity/completion/` → **0**. The two textual matches for the string in the completion docs are (a) a criterion naming the form as a required C8.3 element and (b) an Evidence cell citing the **worked example's** declaration at `Process-Spec-Planning.md:2148` — neither is a declaration by this spec. Nothing to walk back; no undelivered deferral.

---

## Standards implications

**Standards implications: list.** Four items, all for Thurgood to mine (he reads every pass in full, records the one-line outcome, and never grades the audit). None is a remediation demand on shipped law text; all four are authoring-convention questions.

**S-1 — a criterion must not set its denominator by reference to an unenumerated prose list.** *"Contains every design-C8.1 element"* is unverifiable at audit unless the completion doc reproduces the enumeration. Both instances in this population went sideways: one produced an unreproducible ✅ (F-1), the other a ⚠️ turning on which elements C8.3's list actually contains. Candidate convention: such a criterion SHALL either (a) enumerate its denominator inline in `tasks.md`, or (b) require the completion doc to carry the per-element checklist, not its total. **(b) is what criterion 5 already intended** — its words say *"the completion doc's per-element checklist"* — so the gap may be a teaching gap rather than a rule gap.

**S-2 — criteria embedding a volatile measurement go stale between authoring and completion.** T1-04's *"all 153 `tasks.md`"* was 154 by completion. The author handled it correctly (reproduce verbatim, attribute the delta), and **that correct handling is not written down anywhere** — an author facing the same case could reasonably substitute the current number, which is the **reword** class. Candidate: one sentence in the conventions §, ruling that a stale embedded measurement is reproduced verbatim with the delta attributed in the Evidence cell, never updated in place.

**S-3 — the 112 taxonomy has no class for evidence insufficiency.** Its six classes describe **promised-vs-claimed** table mutations. F-1 is **claimed-vs-shipped**: a verbatim criterion, a present row, a non-empty Evidence cell, and a verdict that cannot be re-derived. M3 gives this a metric; the taxonomy gives it no name, so a pass must improvise a classification — exactly the unfalsifiable-phrasing problem this spec exists to close, one level up. Candidate: a named evidence-quality class, scoped so it never becomes a second gate (Req 8.8 binds).

**S-4 — the subtask completion-doc duty is either live law or it is not, and the corpus says "not".** TCP § "For SUBTASKS" step 2 requires one per subtask. Measured: 127 = 2 parent / 0 subtask; 125-B = 0 / 21; 122 = 0 / 5. Three consecutive specs, three different answers, zero satisfying both duties. 127's own Lessons learned identifies the absence as the direct cause of four unrecorded application-time adaptations. Candidate: rule it — either the duty is enforced, or it is narrowed to the judgment-based form the PR-flow subtask commit rule already uses ("at a checkpoint, on backup-worthy accumulation, or at a session/handoff boundary"). Leaving it nominally mandatory and universally unmet trains agents that TCP duties are advisory, which is a cost this system pays elsewhere.

---

## Flagged for Peter (not findings — an accounting hazard and a scope note)

**A double-count hazard on guard (ii)'s N ≥ 5 floor.** This pass measured M2 **by audit, by hand** on 2 in-scope parents. The CLOSEOUT pilot will measure M2 by audit on **the same parents 1 and 2, plus parent 3**. If both passes' counts are added at the 5.Z sitting, 127 contributes 5 and clears the floor on its own — with 3 real parents. **The midpoint's 2 and the closeout's 3 are not independent evidence; the spec supplies at most 3 in-scope parents toward N ≥ 5.** This composes directly with the A-2 accounting question already riding to 5.Z with the counted N; it is raised here so the number arrives at that sitting already caveated rather than discovered mid-decision. I am flagging the hazard, not proposing the count — the accounting rule is Peter's to set.

**Scope reminder, carried so it is not inferred from a clean result**: this MIDPOINT pass is not the pilot, discharges nothing on the CLOSEOUT owed-set, and produces no guard-(ii) evidence artifact. `closeout-owed(127)` remains **open** and is discharged only by `completion/claims-pass.md` after U3's merge.

---

## Related

- Population: `.kiro/specs/127-completion-claims-integrity/completion/task-1-completion.md`, `task-2-completion.md`
- Promise sets: `.kiro/specs/127-completion-claims-integrity/tasks.md` (parents 1 and 2)
- Template authority: `requirements.md` § "Requirement 8"; `design.md` § "C9"
- The law: `governance/completion-documentation-guide.md` § "Parent Success-Criteria Fidelity"
- The instrument: `scripts/check-completion-criteria-parity.ts` (`check_state: proposed`, non-required — unchanged by this pass)

---

## [THURGOOD] Composed-loop outcome (2026-09-19 — the loop's first live firing)

Read in full, per the charter duty this same branch ships. Outcomes on the four standards items — outcomes on what the docs should teach, never re-decisions of what the audit concluded:

- **S-1: adopted** — authoring convention candidate: a criterion whose denominator is an enumerable list SHALL either enumerate it inline in `tasks.md` or require the completion doc to carry the per-element checklist, not its total. The teaching-gap reading is accepted (criterion 5's words already said "checklist"; the doc shipped the total). Vehicle: a recorded guide/PSP amendment (ballot model — Peter decides); queued, not applied here.
- **S-2: adopted** — one sentence for the PSP conventions §: a stale embedded measurement is reproduced verbatim with the delta attributed in the Evidence cell, never updated in place. Same vehicle, same queue.
- **S-3: adopted** as a taxonomy-amendment candidate: a named evidence-quality class (a ✅ whose stated verification instrument cannot be re-derived from the record), scoped never-a-gate per Req 8.8. The mutation-class list is ratified law text, so the class lands by recorded amendment, not by this outcome line.
- **S-4: adopted** as a question drafted for Peter: recommend narrowing the subtask-doc duty to the judgment-based form the subtask commit rule already uses (checkpoint / backup-worthy accumulation / session boundary), since three consecutive specs satisfied one TCP subtask duty or the other and never both. TCP is governance law — Peter rules; the corpus numbers above are the evidence either way.

**F-1 remediation** (routed to me as the owning agent): an attributed erratum is appended to `task-1-completion.md` acknowledging the unreconciled denominators and the absent enumeration — the record corrected honestly rather than a count reconstructed post-hoc; the CLOSEOUT pilot re-audits the surface regardless. **F-2**: absorbed into S-4's question — no per-spec remediation is coherent while the duty itself is the open question.

The N ≥ 5 double-count hazard is carried forward to the 5.Z sitting alongside the A-2 accounting question (session memory updated; final report to Peter names it).

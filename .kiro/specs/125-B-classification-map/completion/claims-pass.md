# Claims Pass — CLOSEOUT: Spec 125-B (all five parents)

**Date**: 2026-11-08 (read from 20:31Z, written by 20:50Z, UTC)
**Grain**: CLOSEOUT. The trigger is 125-B's closing merge: #806, squash `90b3a11cb` on `main`, merged 2026-11-08T20:24:23Z. It ticked Task 5, the last unticked parent, and replaced Task 6 (U3) with pointers to its charter. This is step 4 of the U3 re-home Peter adopted at 2026-11-08T19:06:05Z (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-f4-two-pr-and-u3-rehome.md` item 4).
**Auditor**: Stacy
**Population**: every 125-B parent, Tasks 1–5, from `git log --first-parent -- .kiro/specs/125-B-classification-map/` and the units table. Task 6 is no longer a task of this spec. The three re-home PRs are read in full: #804 (`fbbca1330`, the ballot), #805 (`3c120ed4e`, the charter and my re-rule) and #806.

| Unit | Parent | PR | Squash | Merged |
|---|---|---|---|---|
| U1-s | 1 | #75 | `7b7773cfa` | 2026-07-14 |
| U1-p | 2 | #77 | `4992e5926` | 2026-07-14 |
| U2 | 4 | #78 | `6df1375ad` | 2026-07-14 |
| U1-c | 3 | #105 | `4fe6ce9f9` | 2026-08-02 |
| U1b-r, waves 1–4, U1b-c | 5 (5.1–5.6) | #113, #124, #133, #160, #167, #168 | `5ea404e58` … `4024fdbef` | 2026-08-02 … 2026-09-18 |
| Close (tasks amendment + ballot application) | 5 (tick) | #806 | `90b3a11cb` | 2026-11-08 |

- Promised is `requirements.md` (17 requirements), `design.md` and `tasks.md` with its amendments (#112, #618, #806). Claimed is every parent completion doc and the unit docs 5.1–5.6. Shipped is `main` at `90b3a11cb`, with `git show <squash>:<path>` where a claim is about the tree at a unit's merge.
- **Every parent but Task 5 completed before ratification (2026-09-19)** and is not bound by the criteria-table, forced-negative, delegated-tier, CI-provenance or instruments rules (no backfill). The tasks file declares `**Criteria mode**: spec-level` (#806), so this pass is the spec's one discharge (rider (a), below).

> **Filename, load-bearing.** This is `completion/claims-pass.md`, the path the owed-set predicate keys on. Writing it discharges `closeout-owed(125-B-classification-map)`. No root record's Trigger names this path (§ "Records").

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This pass fired after #806 merged and could not have blocked it.

**Standards implications: list — four items (S-1 … S-4), § "Standards implications" below.**

---

## For the reader (read this first)

- **125-B can close.** Its four delivered parents' claims hold against what shipped, with two disclosed letter-gaps that pre-date the rules (§ "Spec-level discharge"). Task 5's tick is true: every campaign unit merged, and Peter's closeout verdict reads RATIFIED (COMPLETE, D1). Requirement 13 is not delivered by this spec. Peter re-homed it, and the charter carries it verbatim (checked line by line).
- **The ballot application is byte-exact.** All seven § 9 after-texts of `.kiro/docs/ballots/2026-11-08-125b-u3-rehome.md` appear exactly once in the shipped files, and both § 5 removal descriptions match. The Edit-kind lines are complete (3 of 3 `ok`), the LAW ballot read RATIFIED at the merge, and the squash tree equals the measured PR head.
- **The charter's § 6 item 4 checks hold.** #806 fired no record of mine (`issues-owned.sh --pr 806`: 0 fire here; the warn-only `fired-records` job concluded `success` at the head). Task 6's pointer names my re-attestation record (`tasks.md` L321).
- **Five findings: one Medium, four Low (one a self-finding, fixed in this PR).** None voids an accepted unit or the close.
  - **CL-1 (Medium)**: the re-home's straggler sweep missed a ratified but unapplied ballot. The shape-review ballot's site 1b and site 7 will write "Spec 125-B U3" and "U3's tasks round" into law, and the bound ballot that F-1 (d) puts there is carried by neither the charter nor my record. Owner: Thurgood.
  - **CL-2 … CL-4 (Low)**: a false register count, now repeated in the Task 5 summary #806 wrote; the spec-level declaration's stated reason; and a stale `Status` header. Owner: Thurgood.
  - **SF-1 (Low, mine)**: my re-attestation record did not carry the F-1 (d) bound. Fixed in this commit.
- **One duty is owed, not done: the delegate audit of my own four seat acts in #806 is `0 / 4`.** I made the two re-confirms and two re-signs this pass would otherwise audit. The delegate is the orchestrator's to commission.

---

## Findings

**Two routes apply to each finding.** Each goes to its owner as an explicit message, relayed by the orchestrator. Its standards implications also go to Thurgood through the EDUCATION read.

### CL-1: Medium — the re-home sweep missed the shape-review ballot's pending after-texts, which put the re-attestation bound in "U3's tasks round"

| | |
|---|---|
| **Promised** | Re-home ballot § 6 step 9: "Re-run § 6's sweep on the changed tree", and at application "any hit outside the dispositions above stops the PR". Its § 8 rejects leaving a pointer to a deliverer that disclaims the delivery: "the stale-promise shape the register exists to stop" |
| **Claimed** | #806 body, § 6 step 9: "No hit is left at any § 2 or § 5 site. New hits since the census are only in the ballot itself, the charter, the ruling and ratification records, the re-attestation record, and two Spec 131 notes. All of them are records." |
| **Shipped** | The sweep regex at `90b3a11cb` also hits `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md` at L171, L421, L431 and L991. That ballot was ratified at #801 (`94c5f26a0`), after the census base `77958cbb6`, and is not applied yet (no open PR). Its § 11 site 1b, to be written into the signing-act ballot's new § 2a, reads: "No row is in bound for a re-attestation (Spec 125-B U3) until a ballot in U3's tasks round sets its bound, once U3's identity mechanism is known." F-1 (d) also says "Site 7's line names U3's tasks round as the ballot's home", and site 7 is a dated line on my re-attestation record. Neither the charter's § 5 (owed at the trigger) nor its § 6 names that bound ballot |

- **What stands**: every site the re-home ballot listed. The sweep's other dispositions are right, and the shape-review ballot is a record today.
- **What does not**: the claim that every new hit is a record. Site 1b is ratified law waiting for its application PR. Applied as written, it names a tasks round that the closed spec says it will not hold, and the ballot the bound depends on has no named home.
- **Not decided here**: where the bound ballot sits now, and how site 1b and site 7 should read. That text is Thurgood's, and if it changes ratified wording, Peter rules.
- **Routing**: Thurgood: owner of both ballots and of the sweep, applier of the shape review, and owner of the charter's § 5. Before the shape review's PR 1 applies site 1b, and before I write site 7. My side is SF-1.

### CL-2: Low — the register's entry counts are false in the campaign closeout, and #806's Task 5 summary repeats one of them

| | |
|---|---|
| **Promised** | Campaign law, "Ambiguity" and "Documentation grade": every unit record states its counts as measured |
| **Claimed** | `completion/u1b/campaign-closeout.md` § 8: "**Register**: 3 entries at pilot close → **23 at campaign close** (21 + the 2 audit-gap rows in this PR)". `docs/specs/125-B-classification-map/task-5-summary.md` (#806): "The register … grew to 23 entries during the campaign". `task-4-parent-completion.md`: "Six landed this unit:" before a list of seven names, "register at TEN entries" |
| **Shipped** | `### ` headings under `## Entries` in `governance/classification-map.md`: **11** at U1-c's squash `4fe6ce9f9` (pilot close), **20** at `4024fdbef^` and **22** at `4024fdbef` (campaign close). So the closeout should read 11 → 22 (20 + 2). At U2's squash `6df1375ad` there are 10 entries, 7 of them new in U2, which agrees with "TEN" and not with "Six" |

- **Why it is Low**: no verdict rests on the count. The 2026-11-08 summary carries the wrong number into a doc written after ratification, and that is the live part.
- **Routing**: Thurgood, author of the closeout record and the Task 5 summary. The repair form is his; a dated note leaves the record's history intact.

### CL-3: Low — the `Criteria mode: spec-level` declaration states a reason that is false for four of the five parents

| | |
|---|---|
| **Promised** | `tasks.md` L9 (#806): "`spec-level` matches how this spec was run: its parents have no per-parent criteria in the Spec 127 form." |
| **Shipped** | Tasks 1–4 each carry a `**Success Criteria:**` block of bullets. In a scratch copy with the mode set to `per-parent` (not committed), parity associates all four: `association: parent 1 ← block at line 50`, parent 2 at 143, 3 at 163, 4 at 206. It then reds them for missing tables, because their docs pre-date the rule. Task 5's `**Success Criteria:** none — …` line reads `RED [MALFORMATION] … non-bullet line inside block at line 257 (parent 5)` |

- **What stands**: the mode. A `spec-level` spec discharges at its closeout through the claims pass (guide L109), and this pass is that discharge. Under `per-parent`, four pre-ratification parents would have been held to a table rule that does not bind them (S-4).
- **What does not**: the sentence giving the reason. The parents do have criteria in that form. What they lack is docs written to the later rule.
- **Routing**: Thurgood (author of the declaration).

### CL-4: Low — `tasks.md` still reads `**Status**: Tasks Phase` at the spec's close

- **Shipped**: `tasks.md` L5 at `90b3a11cb`. Every parent is ticked, and Task 6 is a pointer.
- **Routing**: Thurgood. One header line.

### SF-1: Low — self-finding: my re-attestation record did not carry the F-1 (d) bound (fixed in this commit)

- My record `.kiro/issues/2026-10-15-123-125b-u3-re-attestation.md`, which the charter's § 6 holds by pointer, ordered its acts after the shape review's PR 2, and did not name the bound ballot F-1 (d) requires before any re-attestation act.
- **Fixed here**: one dated bullet under "Open at the trigger" (rule 9, owner) cites site 1b and routes its home to CL-1. It carries the ratified rule and does not say where the ballot sits.

### Owed, not a finding: the delegate audit of my own acts in #806

- I made four signing acts in the closing unit: re-confirm `eed6a77`, re-confirm `809f730`, re-sign `103c865` and re-sign `3ba6fca`. My own walk, `verify-signing-chain --audit --pr 806 --exclude-signer stacy`, prints `0 of 4 act(s) selected; 4 withheld`.
- The per-act audit of those four is a delegate's, in `delegate-audit-closeout-<seat>.md` in this directory. No delegate was commissioned. Thurgood's own `--audit --pr 806` in the PR body is the author's validation, not a delegate file, and I do not restate its verdicts.
- **Routing**: the orchestrator, to brief a delegate who is not Stacy.

---

## Spec-level discharge (rider (a))

The criteria are each parent's `**Success Criteria:**` bullets in `tasks.md`, plus the requirements. The Status here is my verdict on shipped source at `90b3a11cb`, not the doc's.

| Parent | Criterion (abridged) | Doc | Verdict | Evidence I read |
|---|---|---|---|---|
| 1 | Register exists with header, schema and the pilot's entries | ✓ | ✅ | `governance/classification-map.md` front matter; `## Entry Schema`; `record-first-ratification`, `npm-test-before-complete`, `tool-boot-smoke` present |
| 1 | Measurement protocol authored and instrumented before any prune | ✓ | ✅ | `7bcc367d5` (2026-07-14T11:28) adds it; the prune #77 merged 16:25 the same day |
| 1 | Probe and trial evidence exists, citable by U1-p | ✓ | ✅ | `completion/pilot/probe-evidence.md`, `trial-diff-table.md`, `trial-transcripts/` |
| 1 | Tool-boot smoke wired as a required check, calibration guard intact | ✓ | ✅ | `125B-tool-boot-smoke` in branch protection's 21 contexts (API, 20:37Z) and in `EXPECTED_CONTEXTS` (`verify-gate-registration.sh` L92); selection floor in `tests/tool-boot-smoke.test.ts` L19–24; bite PR #76 red on it |
| 1 | crossRef re-point complete and sweep-1-verified | ✓ | ✅ | `canonical/shared/shared-catalog.yaml` L30, L45–47; `122-sweep-1-refs` success at #806's head |
| 2 | Prune lands on all three surfaces in one PR, evidence attached | ✓ (disclosed) | ⚠️ held as disclosed | Two surfaces edited. S1 has zero imposter hunks, which the doc reconciles in its own section. Pre-ratification, honest, no remedy owed |
| 2 | Only imposters pruned; Jest-not-Vitest education intact | ✓ | ✅ | `.kiro/steering/start-up-tasks.md` L56–58; TCP parent step 1 carries the S2-1 after-text |
| 3 | Window closed at N=20, metrics per protocol | ✓ | ✅ | `completion/pilot/window-dataset.md` L6, L68 |
| 3 | Closeout record content-complete | ✓ | not re-verified — presence only | `completion/pilot/u1-closeout.md` exists; I did not re-read C5 item by item |
| 3 | Verdict session held, recorded as a ballot | ✓ | ✅ | `.kiro/docs/ballots/2026-08-02-u1-pilot-closeout-verdict.md`, RATIFIED |
| 3 | Return-edge cross-references landed | ✓ | ✅ | `canonical/agents/thurgood.md` L539 ↔ `governance/Product-Handoff-Protocol.md` L171 |
| 4 | Exp 3 evidence exists | ✓ | ✅ | `completion/u2/exp3-spike-evidence.md` |
| 4 | WCAG re-armed with floors; validation promoted | ✓ | ✅ | `wcag-required-refs` and `validation-criteria-completeness` read `armed`; bite PR #79 red on `lane-functional-root` |
| 4 | Console-fail armed on root lanes with seeded allowlist | ✓ | ✅ | `jest.config.js` L96; `src/__tests__/console-allowlist.json`; row `armed` |
| 4 | All U2 register entries recorded | ✓ (miscounted) | ✅ | 7 entries added at `6df1375ad`; the doc's "Six" is CL-2 |
| 5 | none — the closeout verdict ballot is the acceptance | n/a | ✅ | Ballot `2026-09-18-u1b-campaign-closeout-verdict.md` Status RATIFIED; 5.1–5.6 each with completion and summary docs; 5.6 left the parent unticked at `4024fdbef` (L250), as the Task 5 doc says |

**Requirements.** Reqs 1–12 and 14–17 are delivered through the rows above and the unit records: the campaign records for Req 10, the dial re-deferral (D2, record `2026-10-24-autonomy-dial-re-deferral-trigger.md`) for Req 15, and Exp 3 for Req 16. **Req 13 is not delivered by 125-B.** Peter closed the spec without it, and the charter `.kiro/issues/2026-11-08-125b-u3-governance-layer.md` § 2 quotes its five lines and design C9's U3 bullet. Each is found exactly once with `grep -F`, and both source files are unchanged since `77958cbb6`. `requirements.md` still reads "U3 SHALL deliver"; that is closed-spec history, and `tasks.md` L318–321 says the spec does not deliver it.

**Task 5's doc and summary, sampled (8 claims)**: the units table (six squashes on first-parent `main`), "B = 2/20", "11 candidate rules", "f = 0 over 36" (segments n = 4 + 32), the 5.6 tick state, the ballot Status, the 5.W indentation and the verification command all hold. The register count does not (CL-2).

**Ballot application, compared with § 9 byte for byte.** Items 1, 2 and 4, and 3a, 3b and 3d, each `grep -cF` = 1 in the shipped file. 3c's two fragments are 1 each. The L16 and L12 removal descriptions in the dispositions diff match § 9. The base check (§ 6 step 3) and the regeneration deviation (step 7: the generator refuses at the authoring commit, so the substitute full-`generateAll` comparison ran) are reported in #806's body; I read the deviation as disclosed (S-3). The served register shows the new history line (docs MCP `get_section`), so the `rebuild_index` step ran.

**Report-set comparison**: not applicable. 125-B is a system spec with no Implementation-Report set. **Deferral walk-back**: `grep -rn 'Artifact deferred' completion/` gives 0.

---

## Records

- **Fired by the re-home PRs**: none. `issues-owned.sh --pr` prints `0 fire(s) here` for #804, #805 and #806. By hand: of the 76 root `path:` Triggers, none names a 125-B path. The three root Triggers that mention 125-B (`2026-09-12-semantic-contrast-adjudication-queue.md`, my re-attestation record, `2026-10-23-signing-act-shape-review.md`) are all `manual`.
- **Order held**: #805 (my re-rule) merged at 19:50:50Z, before #806's `tasks.md` edit at 20:24:23Z. That is ballot § 6 step 2 and charter § 4 item 2.
- **Open records naming 125-B** (12 at the root). None is owed an act by this close. The charter and my record are `manual`, on Peter's identity act. The semantic-contrast queue's 125-B trigger was superseded on 2026-10-18. The others cite 125-B evidence or history only.
- **This file fires** nothing: no root record's Trigger is `path:.kiro/specs/125-B-classification-map/completion/claims-pass.md`.

---

## Counting block

| Item | Reading |
|---|---|
| Criteria-block omissions | 0. Spec-level, so parity skips it (`1 spec-level (skipped)` at `90b3a11cb`; overall 54/54 PASS, reds 0, emissions 0) |
| Criteria vagueness | 0 flagged. Task 2's "all three surfaces" predates the enumeration that found S1 empty (disclosed) |
| Declared-none rate | 1/5 (Task 5, dated, reasoned) |
| Fixed-string exemption usage | 0 |
| Bundled-claim / incomplete decomposition; `(platforms: …)` fallbacks | 0; 0. No platform rows |
| Subtask-doc presence (S-4) | **21/21** ticked subtasks have docs (1.1–1.8, 3.1–3.3, 4.1–4.4, 5.1–5.6). 5.W is the unticked template. 5.4's doc arrived late (#167, disclosed as a retrospective); pre-ratification |
| Delegated-tier capture | Bound: 1 (Task 5). Presence 1/1, grammar 1/1, `plan held`. Spot-checked against #806's trailers: 1/1 (Thurgood / Opus 5.5, consistent). Tasks 1–4 pre-date the line (Task 3 carries the old exception-based note) |
| CI-provenance | Bound 1/1, `local`, parses (guide L180 regex) |
| Orchestrator consult line | Trigger-surface PRs in the population since 2026-09-28: #618 and #806 (non-checkbox `tasks.md`, governance), #804 (ballots). Present 3/3. #805 touches only `.kiro/issues/**`, so none is owed; it carries one anyway. `none needed` on a trigger surface: 0. Named reads traced: 0 (self-attested) |
| Governance-edit-kind read | #806: 3 lines, `ok` 3, `pointer-missing` 0, `listed` 0, `unlisted-path` 0. Lines missing 0. The LAW ballot read RATIFIED at `90b3a11cb`. #804 and #805 touch no governance path. Kinds read as wrong: 0 |
| Merge-hold | #804 carried one `**Open for Peter**:` answered at 19:42:15Z, before its 19:50:35Z merge, citing a committed record. #806: none |
| Instruments | Bound 1/1: `none — success criteria declared none` parses (guide L246) and matches `tasks.md`. Pass-found gaps 0 |
| Instrument census | The re-home ballot's census was read at my R1 (C-1, C-2 folded). Not re-counted |
| Re-grounding dispositions | Not a Spec 123 render population. Signature events in #806: 2 re-signs, both `signer: stacy`, assent 15/22 and 3/3, `renderedHash` unchanged; refusals 0. Spot-check fraction of itemized assents: 0/2 (my own; withheld). Full-survival assent signal: `not yet instrumented` |
| Delegate audit (Stacy-signed, —) | `0 / 4` — no delegate file. N = 4 (2 confirmations + 2 signatures; `--exclude-signer stacy` withholds 4). Owed (above) |
| Peter sample (Stacy-signed) | `0 / 4 (Stacy-signed)` |
| Governance-examples read | RELEASE phase 1 only. Not applicable |
| Evidence presence (**M3**) | 15/15 legacy criterion rows carry evidence. Task 2's two rows give it in prose with § pointers |
| Forced-negative line (**M4**) | 0/5. Not bound: four parents pre-date it, and Task 5 has no table |
| Failure vocabulary (**M5**) | Tasks 1 and 4: no Status column. Task 3: 4 ✅. Task 2: 2 ✅, one of them a disclosed letter-gap. No ⚠️ or ❌ anywhere: the spec pre-dates the vocabulary |
| Out-of-list edits | None found in #806. Its twelve files are the tasks amendment, the two docs, and the ballot's § 5–6 sites |

---

## Method

- **Sample, named: 26 checks against shipped source and the API.** These are 14 of the 15 legacy criterion rows (all but Task 3's content-complete row), 8 Task 5 doc and summary claims, the 9 § 9 after-text and removal comparisons (counted as one check), Req 13 and C9 verbatim, and the two bite PRs' check conclusions (#76, #79).
- **Crack classes A–D** (my method commitment in the closeout-cracks ballot, `[STACY R1]` § 5, on `chore/ballot-closeout-cracks` @ `d68460752`; its first instrument, crack C's `fired-records` #803, landed today, so this is the first pass it binds):
  - **A — the shipped tree measured: by hand.** No item-1 instrument exists. `git diff --quiet <#806 head a96f7f995> 90b3a11cb` exits 0, and the head contains its base `3c120ed4e`, so the squash is the tree the PR's 33 check runs measured. All 33 concluded `success`, the four harness contexts included. The 8 push runs at `90b3a11cb` are `success`. Instrument-found 0; pass-found 0.
  - **B — an unticked box hiding a finished parent: by hand.** Item 2 has not landed. At `90b3a11cb` all five checkbox parents are ticked, no unticked parent has a doc, and the owed-set reads `candidate … closing commit: last unticked parent ticked`. One instance in history: Task 5 sat unticked from #168 (2026-09-18) to #806 with every unit merged. No owe was hidden, because Task 6 was genuinely open, so I count it and do not raise it. Instrument-found 0; pass-found 0.
  - **C — records firing unseen: from the instrument, and re-read by hand.** `issues-owned.sh --pr` for #804–#806 (0 fire), the CI `fired-records` job at #806's head (`success`), and my grep of the 76 `path:` Triggers. They agree. Instrument-found 0; pass-found 0.
  - **D — grammars nothing runs: by hand.** Item 4 has not landed. I ran the guide's L180 and L246 regexes and the delegated-tier forms over the one bound doc: 3/3 parse. Instrument-found 0; pass-found 0.
  - **So**: all five findings here are hand-found. None comes from an instrument, and none is in classes A–D. CL-1 is a straggler (sweep) finding.
- **Not re-verified**:
  - Task 3's closeout content-completeness, item by item;
  - the campaign and window datasets row by row, beyond the segment arithmetic;
  - the wave probe and trial transcripts;
  - every register row the campaign added, beyond the count;
  - the four seat acts in #806, which are mine and withheld from my own audit.
- **Local tooling** (main checkout at `90b3a11cb`, read-only):
  - `./scripts/owed-set.sh`: 34 rows, and 1 + 3 + 3 + 23 + 4 = 34, so the row-sum identity holds. `candidate	125-B-classification-map	unit class a; anchor 90b3a11cb`;
  - `npx tsx scripts/check-completion-criteria-parity.ts`, once as committed and once in a scratch copy with `per-parent`, reverted;
  - `./scripts/issues-owned.sh <seat>` for nine seats, and `--pr` for three PRs;
  - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr` for 804–806;
  - `verify-signing-chain --audit --pr 806 --exclude-signer stacy`;
  - `gh api` for branch protection and check runs, and `gh pr view` for bodies and merge times.
- **Owed-set note**: the script anchors on the closing commit (#806). The predicate's letter keys on the final declared unit's merge date, and the last declared unit, U1b-c (#168), merged on 2026-09-18, a day before ratification. Under the letter alone this pass would not be owed. It is owed by the script's reading and by Peter's adopted step 4 (S-1).

---

## Standards implications

- **S-1 (owed-set note)**: the predicate (final declared unit merged on or after ratification) and the script (closing commit) disagree for a spec whose last declared unit predates ratification and whose closing tick follows it. Here they agree on the outcome only because Peter's plan named the pass. Which reading governs is Thurgood's, as owner of both.
- **S-2 (CL-1)**: a straggler sweep that reads every ratified ballot as a ledger cannot see after-texts that are ratified but not yet applied, which become law later. The re-home ballot's own dispositions table read a ratified ballot that way (L159). Whether a sweep must list pending application sites apart from ledger hits is Thurgood's.
- **S-3**: the re-home ballot's § 6 step 7 could not run as written, because the generator refuses at the authoring commit. The applier substituted a check and said so. Whether an application's steps are dry-run before ratification is Thurgood's.
- **S-4 (CL-3)**: on a legacy `tasks.md`, `per-parent` mode reds parents that completed before ratification, which the guide says are not bound. So a legacy spec's material amendment has `spec-level` as its only workable mode, and its whole discharge falls to the CLOSEOUT pass. That is Thurgood's, as owner of parity.

*No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.*

*Signed: Stacy, 2026-11-08.*

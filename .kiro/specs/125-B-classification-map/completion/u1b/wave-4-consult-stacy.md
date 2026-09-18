# Wave 4 (Task 5.5) — Stacy Consult: C11a state layer, rows-only campaign-law compliance, the wave-3/4 bookkeeping repair

**Date**: 2026-09-17
**Consultee**: Stacy (product governance & QA) — process consult, acting as falsification attempt on the steward's process-territory findings
**Scope of this consult**: W4-7 only (C11a process layer, rows-only consequence chain, the bookkeeping repair) + the requested general audit of §8/§9/§10. **Not in scope**: C10's boundary call, the education KEEP scoring, the exclusion-vocabulary drift, C11b/C11c detection claims — Lina's and Ada's.
**Method**: every claim below re-derived from source this pass. Where I could not verify (GitHub Settings), I say so rather than inferring.

---

## Verdicts

| # | Item | Verdict | Grade |
|---|---|---|---|
| **W4-7a** | C11a `proposed` confirmation + CODEOWNERS fact-refresh | **CONCUR** — state confirmation independently verified; fact-refresh is the right treatment; substance **correct but incomplete** | advisory (A4) |
| **W4-7b** | Rows-only consequence chain (no ballot / class-3 / no window / record-first / rebuild_index) | **CONCUR ON THE CHAIN, WITH BLOCKING CONDITIONS** — the chain is correctly derived, but three campaign-law obligations the chain does not name are unmet | **BLOCKING** (B1, B2, B4) |
| **W4-7c** | Wave-3/4 bookkeeping repair rides wave 4's PR | **PROCESS-SOUND — belongs to wave 4, NOT 5.6** — subject to five named conditions | **BLOCKING** on two conditions (B5, and C2 below) |
| — | §9 pre-committed rubric | **NOT contingent-complete for C11** — a Req 8.1 hole of the same shape as the wave-2 hole §9 claims to close | **BLOCKING** (B3) |
| — | §8 candidate-diff handling | Compliant; one disclosure owed | advisory (A2) |
| — | §10 A1/A2 | §7-noncompliant as drafted (missing generated tier + two under-inclusions) | advisory (A1) — becomes BLOCKING the moment a consult produces a cut |
| — | Does wave 4's PR hand 5.6 a determinate trigger? | **NO, not as drafted.** Determinate after B1 + B2 | **BLOCKING** |

**Summary of the falsification attempt**: I could not falsify the C11a state finding, the no-ballot determination, or the class-3 exclusion — all three survive. What I did find is that the wave's compliance analysis is scoped to the **wave** and never looks at the **campaign** instrument, which is open, three weeks stale, and about to be the sole input to 5.6.

---

## BLOCKING

### B1 — The shared campaign W1 window is OPEN and ~17 PRs are untranscribed. The wave says nothing about it.

**Evidence.**
- `campaign-window-dataset.md:3`: **"Status: OPEN"**. Its observed-PR table ends at **#148, 2026-08-26** (`campaign-window-dataset.md:39`), last updated at observation pass 3, PR #149 (2026-08-27).
- Merged since: **#150 … #166** — 17 PRs, the large majority `fix/*` / `chore/*` / `task/*` qualifying branches (`git log 92916637..HEAD`). Several are plainly ordinary domain work by the J-C3/J-C4/J-C5 reasoning already recorded at `campaign-window-dataset.md:44-46` (#152, #153, #154, #155, #156, #163, #164 …).
- Protocol law: observation passes are **event-anchored — "at wave open (baseline), opportunistically at session start while any window is open, and at close"** (`campaign-measurement-protocol.md:23`), and **"one observation pass updates BOTH the wave dataset(s) and the campaign dataset"** (`:63`).
- Two sessions started while that window was open — wave 3 (2026-09-14) and wave 4 (2026-09-17). Neither ran a pass. `wave-4-assessment.md` does not contain the string "campaign window" in §8, §9 or §10.

**Why this is the steward's inherited phrasing risk, not a new error.** `wave-3-assessment.md:480` states *"no window is currently open at all — both the wave-1 and wave-2 windows CLOSED at observation pass 3."* That is **true of the wave windows and false of the campaign window**, which is a different instrument with its own close condition (`campaign-measurement-protocol.md:14`). Wave 4's §9/§10 inherit the framing ("a wave with no prune opens no window and consumes neither") without ever distinguishing the two. Nothing in wave 4 is *wrong*; the campaign instrument is simply out of frame.

**Consequence if unaddressed.** 5.6's headline deliverable is *"shared-W1 verdict (the pilot protocol's §3.2 roll-up over campaign segments)"* (`tasks.md:309`). As of today that verdict would be computed on a dataset frozen at n=16 (`campaign-window-dataset.md:72`) while the document claims to span all of U1b. Additionally owed and only obtainable from Settings: the **live required-check-set re-verification**, which pass 3 performed explicitly (`campaign-window-dataset.md:72`, "Live required set re-verified at pass 3: 18 contexts, unchanged — NO new boundary event") and which is the detector for one of the two exogenous boundary classes (`campaign-measurement-protocol.md:19`). I checked the git-observable half myself: **zero changes to `.github/`, `.claude/`, `CLAUDE.md`, `.kiro/steering/`, `canonical/` since #149** — so no *git-visible* boundary event occurred; the Settings-visible half remains unchecked.

**Required.** One of two, explicitly, in the wave-4 package:
1. **Run the pass with wave 4** (my recommendation — wave 4 is the last instrument-purposed event before closeout, and the pass is the protocol's own "session start while a window is open" anchor); or
2. **Record a dated debt hand-off to 5.6** naming the exact PR range (#150 → wave-4 merge), the untranscribed count, and the owed required-set re-verification, so 5.6 inherits a bounded task rather than discovering a hole.

Silence is the one non-compliant option: it converts a known measurement debt into an invisible one, which is the precise failure mode Req 8.1's user story exists to prevent ("no signal because nobody measured" must stay distinguishable).

*Counter-argument to my own recommendation (option 1)*: transcribing 17 PRs by hand-query is real cost at the end of a campaign whose W1 tallies have been robust at every pass (f=0 across 20 observations; e=1.6 at n=16, so even 2–3 failures in the untranscribed set leave W1 MET). If Peter prefers option 2 and lets 5.6 carry it, that is fully compliant and I would not re-raise it — **the recording is the blocking part, not which option**.

### B2 — The campaign-window close condition is unsatisfiable as written. That is a Peter ruling, not a steward assumption.

**Evidence.** `campaign-measurement-protocol.md:14`: *"the campaign window closes at the close of the FINAL wave's window; it can never close while any wave window remains open."* Same text at `campaign-window-dataset.md:5`. `tasks.md:308` binds 5.6's trigger to it.

Wave 3 opened no window (`campaign-window-dataset.md:86`, "not open"). Wave 4 is expected to open none (`tasks.md:302`). **The final wave's window therefore never opens and never closes — the triggering event cannot occur.** The last window that ever existed closed 2026-08-27 (waves 1 and 2, `campaign-window-dataset.md:84-85`).

Two readings, with different consequences, neither recorded:
- **(i) "the last window that existed"** → the campaign window closed 2026-08-27, waves 3 and 4 merged *after* campaign close, and the untranscribed #150–#166 are out-of-window (B1 dissolves, but the shared-W1 dataset's `Status: OPEN` line has been wrong for three weeks and W1's roll-up excludes the campaign's own final month).
- **(ii) "when no wave window is open and all waves are complete"** → the campaign closes at wave 4's merge, and **every one of #150–#166 is an in-window observation** (B1 is live and large).

The steward's §11 W4-7 framing assumes (ii) ("does wave 4's PR cleanly hand 5.6 a determinate trigger"). I agree (ii) is the better reading — it preserves the event-denomination principle and keeps the campaign's own tail measured — **but §1 of the protocol is explicit that these are ratified parameters and "changing any of these requires a Peter ruling."** Resolving a literally-unsatisfiable close condition by steward interpretation, in the document that benefits from the interpretation, is the shape of error this campaign's own law is built to prevent.

**Required.** Wave 4's package puts the close determination to Peter as a **named, explicit ask** (the O-7 pattern from wave 3), with both readings and their W1 consequences stated. Recommended form: *"For a campaign whose final waves are rows-only, the campaign window closes at the final wave's UNIT MERGE (no window → no window-close event → the unit merge is the wave's last defined event). Recorded in the register's methodology notes alongside A1–A4."* Putting it in the register (`governance/classification-map.md`) rather than only in the spec is what makes it survive U1b — same reasoning that put A1–A4 there (`campaign-measurement-protocol.md:28`).

### B3 — §9's pre-committed rubric is not contingent-complete for C11. Same shape as the wave-2 hole it cites.

**Evidence.** `wave-4-assessment.md:169`: *"C11 lines all INFORMATIONAL (no prune exists to gate)."* The section's own stated purpose (`:158`) is *"pre-committed now so that a consult-produced cut meets a rubric that predates its own evidence (Req 8.1; the wave-2 hole)."*

The rubric is contingent for **C10** (R1'-C10 / B'-C10 presence rubric, `:169`) and **non-existent for C11**. If a consult produces a C11 cut, the wave would then have a cut with **no relevance criterion and no behavior criterion** — and `tasks.md:287` is categorical: *"a rule is NEVER pruned on an unexercised trial."* The pre-commitment would have to be authored after its own candidate appeared: exactly the wave-2 hole.

**Is a C11 cut possible?** §3 argues no: *"No imposter is possible on the barrier scope by construction (blade 1 requires an armed gate; the gate is `proposed`)."* That reasoning is sound **for the barrier scope and silent on the other one**. The row is `scoped` and its **second scope is `armed`**: `governance/classification-map.md` § `record-first-ratification`, scope 2 — *"ungated artifacts … disposition: record-check, check_state: **armed**"*. Blade 1 can bite there. §7's S6 sweep greps only `CODEOWNERS|code.owner` (`wave-4-assessment.md:130-132`) — **barrier-scope vocabulary only**. The check-worded discipline that wave 3 established as its most important methodological correction (pass 10) was applied to C10 (S3) and to C11a's `proposed` scope, and not to C11a's `armed` scope.

I ran the missing sweep (see A3): **it produces no new imposter candidate on my read** — so this is not a prediction that C11a will cut. It is that the rubric must be complete *before* anyone knows that.

**Required.** Add C11 presence/behavior lines to §9 **now, before any consult fold**, and record the amendment with its trigger and timestamp. Timing discipline: closing a rubric hole in response to *"you have no C11 rubric"* is not responding to candidate evidence (no cut exists) and is permissible; if any consult has by then produced an actual C11 cut, the amendment is **contaminated** and the call goes to Peter, never default-proceed (`tasks.md:267`).

### B4 — The two routed contradiction-candidates carry no stated verification obligation. This is the wave-2 hole Lina named, reproduced verbatim.

**Evidence.** `wave-2-consult-lina.md:27`: *"the wave is edit-free only in THIS PR's diff while carrying CSR:183 as a live item — if the rewrite lands later with no verification because 'wave 2 was rows-only,' never-prune-untested was routed around by scheduling. **Ask: state on the record which verification obligation attaches to the CSR:183 rewrite** (Lina's position: a correction bringing prose INTO agreement with an armed gate is not a prune; the gate is the verification — but say so)."*

Wave 4 routes two items the same way (`wave-4-assessment.md:66` PIG:169 → Lina; `:67` Token-Family-Opacity + TQR → Ada) and **states no verification obligation for either**. Lina's recorded rationale does not transfer cleanly:

- **PIG:169** — transfers *partially*. The armed guard covers **5 of 34 components** (`wave-4-assessment.md:42-44`), while PIG:169 is a corpus-wide, all-platform mapping row. "The gate is the verification" holds for the Input-Text/Button-CTA span and holds for nothing else.
- **Token-Family-Opacity / TQR** — **does not transfer at all.** There is no armed gate anywhere in Ada's token-doc territory that owns "no disabled-state styling" (the wave's own §2.3 puts the token/blend layer at *"deprecation, not a gate"*). A rewrite there is an education change with **zero** gate verifying it — closer to a prune than to a correction-into-agreement.

**Required.** State per routed item, on the record: which verification attaches, and where the answer is "none," say so and let Peter rule whether a reconciliation-rewrite of pre-philosophy content counts as a prune requiring the wave's (b) machinery. I am not asserting it does — I am asserting that "routed to owner" must not become the scheduling path by which an unverified education deletion leaves the campaign's verification regime.

**On the two sub-questions I was asked:**
1. **Is routing consistent with the wave-2 #132 precedent?** **Yes on sequencing, with one thing to say out loud.** #132 merged immediately *before* the wave-2 prune under Peter's before/with ruling so *"the compound-exposure window never opened"* (`task-5-3-completion.md:7`). Wave 4 has **no prune**, so there is no compound exposure to sequence against and no before/with ruling is needed — **but state that reason explicitly** rather than leaving the precedent's non-application implicit. Also worth carrying forward: #132 was **counted as an ordinary observed PR**, not excluded (`campaign-window-dataset.md:25`, and the pass-2 note at `:48` — *"the wave-2-sequenced companion repair but ordinary domain work, not instrumentation — counts"*). The wave-4 owner fix PRs inherit that treatment, which means they are **in-window observations** under B2 reading (ii) — a second thread back to B1.
2. **Does routing threaten the class-3 exclusion's "purpose is instrumentation" test?** **No.** Only the charter *records* ride wave 4's PR; the edits ride owner PRs. That is precisely wave 3's disclosed structure (`wave-3-assessment.md:482`: *"it also carries two `.kiro/issues/**` defect charters, which are routed records produced by the classification, not a separate work product — the class-3 test is 'purpose is instrumentation,' not 'touches nothing else'"*). The exclusion holds. See A2 for the disclosure that is nonetheless owed.

### B5 — The proposed chafe line is vacuously true and will be read by 5.6 as a measured zero.

**Proposed wording** (from the consult brief): *"none-observed — no window opened, zero PRs traversed armed gates under this wave's observation."*

**Two defects.**

1. **The vacuity reads as a measurement.** The pilot closeout already named this exact error: *"no chafe incident was recorded during the window period — but no instrument was watching for one either; **'no recorded chafe' is an absence of collection, not a measured zero**"* (`pilot/u1-closeout.md:81`). 5.6's autonomy-dial decision is fed *"the per-wave chafe lines 5.W(e) collected"* (`tasks.md:310`). A table row reading "none-observed" four times, two of them vacuous, is a dial decision resting on manufactured nulls. And the second clause is misleading on its face: PRs **did** traverse armed gates during wave 3's period (#161–#166, all green through the required set) — they simply were not observed under a wave instrument.
2. **The chafe line's subject is not the window's PR set.** 5.W(e) says *"stop-and-wait friction incidents under armed gates **observed this wave**"* (`tasks.md:290`). A wave exists without a window. The collectible signal is the **steward's lived friction under armed gates during the wave's working period** — which is how wave 2's line was actually populated (the #148 Actions-outage wedge: *"required checks unconcludable, empty-retrigger needed, merge delayed ~33h"*, `wave-2-dataset.md:82` — an incident the steward *lived*, not a dataset scan result). "No window opened" is therefore not a sufficient reason to report none-observed; it is a reason to report from the other source.

**Required form (both waves).** Report from lived experience over the wave's actual working period, and label the instrument state separately. For wave 3: *"Chafe: [incidents 2026-09-14 → 2026-09-17, or explicit none-experienced]. **Instrument note**: no window opened for this wave, so no PR-set instrument was watching; PRs #161–#166 traversed armed gates in the period but were not observed under this wave. Per the pilot closeout's finding, a null here is an absence of collection, not a measured zero — 5.6 must weight it as such."*

---

## W4-7a — C11a state confirmation and fact-refresh: CONCUR, substance incomplete

**The state confirmation survives my falsification attempt.** Independently verified this pass:
- `tasks.md:314-319` — Task 6 (U3) is still a **GATED PLACEHOLDER**; its gate ("U2 merged + Peter's scheduling; CODEOWNERS/branch-protection settings are Peter's platform actions") has not been recorded as met anywhere I can find.
- `.github/CODEOWNERS` exists and is **scope-disjoint**: two paths only, `package.json` and `package-lock.json` (`:29-30`), under an explicit scope-discipline note — *"this file intentionally covers ONLY the dependency-manifest surface. It is NOT a repo-wide ownership map"* (`:5-7`).
- It **self-documents as advisory**: *"CODEOWNERS is advisory until branch protection requires code-owner review (Settings → Branches → main → Require review from Code Owners). Enabling that is a repo-settings action Peter takes"* (`:8-11`).
- **No recorded delegation of merge-on-green exists.** `.kiro/docs/ballots/` contains 11 ballots; none delegates merge authority. `Task-Completion-Protocol.md:125` requires any such delegation to be *"a recorded rule (ballot or committed record with date and scope) — never a verbal grant."* Absent that record, `:124` ("Agents open PRs; Peter merges on green") and the `:126` standing carve-out for `governance/**` both stand — I verified both lines verbatim.
- **No record anywhere enables code-owner review.** The only `code.owner` hits in the roster corpus are `TCP:93` and `TCP:126`, both correctly future-tensed — the steward's S6 result reproduces exactly.

**The fact-refresh is the right treatment.** The misread the steward names is real and specific: a future reader greps CODEOWNERS, finds it, concludes U3 arrived. A `proposed` row whose rationale names CODEOWNERS as the deliverable while a CODEOWNERS file sits in the tree is a trap.

### A4 (advisory) — two corrections to the refresh's substance and placement

1. **Substance — add the unresolvable-handle caveat.** `.github/CODEOWNERS:24-28` records, in the file itself: *"⚠️ Ada could not verify Peter's GitHub handle … The owner below is the verifiable org. REPLACE with Peter's personal handle … **an unresolvable CODEOWNERS entry silently fails to route**, so this must be confirmed against a real GitHub identity."* This is **material to the row**, not trivia: the U3 arming marker (`proposed → armed`) presumes a CODEOWNERS that actually routes. The existing file's routing is **unproven even on its own two paths**. That strengthens the "U3 has not arrived" finding and hands U3 a named precondition. The steward's refresh as drafted (`wave-4-assessment.md:19`, `:82`) omits it.
2. **Placement — inline on the scope rationale, not only in `history`.** The barrier scope's `rationale` currently reads *"PR-approval-as-ratification (branch protection + CODEOWNERS -> Peter) — delivered by 125-B U3."* A reader who misreads does so **while reading that rationale**; a dated `history` line at the bottom of the entry does not intercept them. Precedent exists in-register from wave 3: the C8 row carried an **inline `armed_semantics_note`** for exactly this prevent-the-misread purpose (`wave-3-assessment.md:510`). Do both: amend the rationale inline **and** carry the dated history entry.

**What I could not verify**: whether required code-owner review is enabled in branch protection. Same limit the steward discloses at `wave-4-assessment.md:142`. My file-and-record evidence is consistent with his conclusion; **Peter can falsify either of us in one sentence**, and that ask should ride the PR.

### A3 (advisory) — the C11a education verification under-covers the row's own surface list

1. **Surface list vs what was verified.** §3 states *"Education KEEP unchanged (TCP:93/:126 verified verbatim this pass)."* The row's own education disposition enumerates more: *"the ballots README teaches the protocol and the why; Task-Completion-Protocol teaches the … boundary (**:93, :125-126, :153**); the canonical catalog statement (stated ONCE, `canonical/shared/shared-catalog.yaml`) propagates … into all 16 generated prompts."* **TCP:153, the ballots README, and the catalog statement were not re-verified this pass.** I verified TCP:153 exists and carries the same what (*"A checks-only merge is NOT ratification"* in Key Rules). Cheap to close; worth closing because the roster-decay pattern the steward himself names at W4-8 applies to row surface lists too.
2. **The missing check-worded sweep — I ran it.** Vocabulary of the *armed record-check* scope rather than the `proposed` barrier scope:
   ```bash
   grep -rniE "ratified record|verify the (committed )?record|ballot status|records? says RATIFIED|record-first|relayed authority|never rubber-stamp" \
     .kiro/steering/ governance/ canonical/agents/ canonical/shared/ | grep -v classification-map.md
   ```
   **Result: 7 hits, zero new imposter candidates** — `TCP:93`, `TCP:153`, and `canonical/shared/shared-catalog.yaml:28-47` (the single canonical statement + its `source:` pointer at `:41`). All already enumerated on the row.
3. **Methodological finding for 5.6 — the two-blade test degenerates on `record-check` dispositions.** For this scope the "armed check" is *an agent mechanically verifying a committed record at the point of use* — there is no CI lane; the check is **performed by the agent reading the education**. Blade 1 ("an armed gate owns the what") therefore cannot discriminate: **deleting the education deletes the check.** §3's "no imposter is possible by construction" reaches the right answer for the barrier scope by an argument that never engages the harder scope. Hand the degeneracy to 5.6 as a named method finding alongside W4-8 — it will recur for every future `record-check` row.

---

## W4-7c — the bookkeeping repair: PROCESS-SOUND, belongs to wave 4, NOT 5.6

**The gap is real and it is a recorded process defect, not a bookkeeping preference.** `tasks.md:268` (campaign law, STACY R1): *"every U1b unit (5.1, each wave, 5.Z) carries **PARENT-grade completion docs** (detailed completion doc + summary doc) despite subtask numbering — each is a merge unit shipping governance-law change."* Wave 3 merged at #160 (2026-09-14) with **neither**: its PR body's "Completion docs on branch" line lists the assessment, two consults and the patch (`git show d0f709f9`), and the tree confirms no `task-5-4-completion.md` and no `docs/specs/125-B-classification-map/task-5-4-summary.md`. `tasks.md:299` 5.4 is unticked. No 5.W(e) record with its mandatory chafe line exists for wave 3 (`grep -rn "chafe"` across the spec returns wave-2's line and template text only).

**Ruling: the repair rides wave 4's PR. It does not belong to 5.6.** Three independent reasons:

1. **5.6 is a CONSUMER of wave records, and cannot author one without circularity.** `tasks.md:310`: the autonomy dial is *"presented to Peter with **the per-wave chafe lines 5.W(e) collected**."* A closeout that authors the evidence it then consumes gives that evidence no independent existence — and the dial's signal is *already* known to be collection-fragile (`pilot/u1-closeout.md:81`). 5.6's charter (`tasks.md:304-312`) is synthesis, verdict and ballot; nothing in it authorizes ticking another task or writing another unit's record.
2. **Under TCP, task status belongs to its unit's merge, and delay compounds.** Wave 3's tick is already late; routing it to 5.6 strands it behind a campaign-verdict ballot and makes the closeout's first act a bookkeeping repair of its own inputs.
3. **Wave 4 is the nearest instrument-purposed unit** — same steward, same class of PR, same class-3 purpose. Purpose dilution is nil (campaign bookkeeping *is* campaign instrumentation), which is what keeps B4's sub-question 2 answer intact.

*Counter-argument, recorded*: a separate `chore/` PR carrying only the wave-3 repair would keep wave 4's diff single-purpose and would put the repair in front of Peter as its own reviewable act rather than as a rider. That is a legitimate alternative and I would not object to it — it costs one extra PR and one extra merge, and (note) that PR would be class-3 excluded on the same reasoning. **What I will object to is the repair landing nowhere, or landing in 5.6.**

### Conditions (C1–C6). C2 and C5(=B5) are BLOCKING; the rest are required-for-soundness.

**C1 — Two dates, never one.** The brief's *"every wave-3 document dated 2026-09-17 and explicitly marked retrospective"* conflates **authoring date** with **completion date**; taken literally it asserts wave 3 completed three days after its own merge. Wave 2 set the convention — *"**Date completed**: 2026-08-27 (wave-window close at observation pass 3)"* (`task-5-3-completion.md:3`), i.e. the (e) point. Required form for wave 3:
> **Date completed**: 2026-09-14 (unit merge, PR #160 — the acceptance event; no window opened, so the merge is this wave's (e) point per C2)
> **Record authored**: 2026-09-17, **retrospectively** — the completion was on time; the record was not.

**C2 (BLOCKING) — Define the (e) point for a windowless wave as a determination, not an ad hoc date.** Wave 3's (e) point is undefined *by construction* (5.W(e) presumes a window close; `tasks.md:290`). Do not resolve it once by implication — state it once, generally: **for a rows-only wave, the (e) point is the unit's merge.** Record it where A1–A4 live (`governance/classification-map.md` methodology notes, per `campaign-measurement-protocol.md:28`) so 5.6 and any future campaign inherit it. Without this, the same gap recurs **for wave 4 itself** — and note wave 4's own record will be authored *before* its merge, so its "Date completed" is a forward assertion accepted at merge (TCP § Completion State in the PR Flow: *"until the UNIT merges, every such status is an assertion awaiting acceptance"*). Say that on wave 4's doc too.

**C3 — Per-criterion verdicts: N/A-by-construction, and W2 must never read MET.** Agreed with the steward's methodology-note-4 treatment (`campaign-measurement-protocol.md:26`, A4: *"an action that never becomes applicable scores N/A, not ABSENT"*). Stating the prohibition explicitly because the failure mode is silent: a rows-only wave pruned nothing, so "zero re-accretion" is **vacuous** — recording W2 as MET would give 5.6 a per-wave table reading 4/4 when the truth is **2 real verdicts + 2 N/A**. Same for W3 and W1-at-wave-grain.

**C4 — Say what the repair cannot cure.** TCP requires completion docs to be written *on the task branch* so they *"traverse the gate with the work"* they document. Wave 3's did not, and no retrospective document can change that. The record should say so in one line — *"this record cures the content gap; it cannot cure the traversal gap; recorded as a process defect"* — rather than presenting a cured record as if nothing happened. **Retrospective authorship itself violates no standard**: the completion-documentation guide governs content, placement and tier, not authoring latency, and dating honestly (no backdating) is exactly right.

**C5 (BLOCKING) — Chafe lines: see B5.**

**C6 — Tick the boxes; do not annotate the task entries.** `tasks.md:279` and `:293` are categorical: wave entries are instantiated verbatim from the 5.W template, and *"ANY other textual difference from the reviewed templates is a DEVIATION and re-opens review."* Flipping `[ ]` → `[x]` on 5.4 and 5.5 is not a textual departure. Adding *"(retrospectively ticked)"* prose to the 5.4 entry **is**, and would re-open review of the instantiation. The annotation belongs in `task-5-4-completion.md`.

### Does wave 4's PR hand 5.6 a determinate trigger? Not as drafted.

With both wave records complete under C1–C6, 5.6 gets determinate **wave** inputs. It does **not** get a determinate trigger or a determinate W1 input until B2 (the close determination) and B1 (the dataset currency + required-set re-verification) are resolved. Those three together are what make wave 4's merge a clean hand-off; the wave records alone are one of three.

---

## General audit — §8, §9, §10

**§8 (candidate diff) — compliant, one disclosure owed.** The both-results no-op verification (`wave-4-assessment.md:150`) matches the wave-3 discipline exactly; generator-leg-NULL + anomaly-rule + `rebuild_index` (`:152`) are correctly derived from `campaign-measurement-protocol.md:19` and the 5.W(d) rule.

**A2 (advisory) — restate the class-3 disclosure with the PR's *actual* contents.** Wave 3 disclosed precisely what else rode its class-3 PR and conceded contestability to Peter (`wave-3-assessment.md:482`). Wave 4's PR will carry more than wave 3's did — defect charters (W4-2, possibly W4-4), **plus another wave's completion record and a second task's status tick**. The exclusion still holds (campaign bookkeeping is campaign instrumentation), but the disclosure must enumerate the new contents rather than inherit wave 3's enumeration. An exclusion whose stated basis is stale is contestable on its own terms.

**§9 — see B3** (contingent-completeness hole). Otherwise the section is disciplined: fallbacks named with confounds disclosed honestly (`:164` *"maximal priming confound, disclosed as strong"*; `:166` *"relevance uncertain, stated as such"*; `:167` N/A-by-construction per methodology note 4), pre-committed consequences transcribed verbatim including the never-default-proceed and rule-leaves-the-wave branches (`:171`, matching `tasks.md:287`). No ambiguity-reporting violations found — Req 8 AC 5's standard (met/unmet/indeterminate, ambiguous reported as ambiguous) is honored throughout §1 and §7.

**A1 (advisory, becomes BLOCKING on any cut) — §10's Wave-A1 is §7-noncompliant.** `campaign-measurement-protocol.md:55` defines Wave-A1 as *"every file the wave's rules live on — pruned surfaces AND education-only surfaces … AND **generated surfaces** (scanned; anomaly rule §2 applies, never W2-counted)."* Three defects in the 22-file list at `wave-4-assessment.md:177-178`:
1. **No generated tier at all.** Wave 3 carried one explicitly (`wave-3-assessment.md:342` — `CLAUDE.md`, `.claude/agents/*.md`, `.kiro/agents/**`, etc., "anomaly-scan only, NEVER W2-counted"). Wave 4's C11a and C11b education both propagate into all 16 generated prompts via the shared catalog; the generated tier is squarely in territory.
2. **`canonical/shared/shared-catalog.yaml` is missing** — it is inside roster scope (`tasks.md:274`), it is C11a's `crossRef` target named on the row itself, and it is where the rule is stated ONCE for propagation. Clear under-inclusion.
3. **`.kiro/docs/ballots/README.md` is unaddressed** — outside roster scope, but it is where the record-first protocol literally lives and the row names it as education. Include it or disclose the decision, per wave 3's second-tier disclosure discipline (`wave-3-assessment.md:362`).

A1's failure mode is **exclusively under-inclusion** — the steward's own wave-3 reasoning, and the reason he widened wave 3's A1 to 52 files. Fixing it now is free (no window); fixing it after a freeze is a §7-class amendment that flags a segment INDETERMINATE (`campaign-measurement-protocol.md:57`).

---

## What I am NOT contesting

The rows-only consequence chain's core is correctly derived and survives falsification: **no ballot** (the `tasks.md:263` trigger's subject is the **prune**; with a no-op diff the ballot has no subject and nothing to revert — the wave-3 §12.2 determination and its four precedents hold, and I re-verified the `record-first-ratification` row's own state at `governance/classification-map.md`); **class-3 instrument exclusion** (`campaign-measurement-protocol.md:50`, register-only, J2 precedent); **record-first satisfied by construction** (rows committed on the branch before the ratifying merge); **`governance/**` inside the standing Peter-merged carve-out** (`TCP:126`, verified verbatim); **`rebuild_index` after merge**; **generator leg NULL with any delta an anomaly finding**. The wave-3 §12.2 recommendation of an optional in-session ratification does not apply here with the same force — wave 4 carries no unproposed state call of the `armed → dormant` kind — but wave 4 **does** carry four items needing Peter's word (B1's option choice, B2's close determination, A4's Settings falsification, and the C10 row adoption), so an in-session pass before the PR opens is cheap for a different reason.

**Roster-freshness (W4-8)**: concur, and strengthen. Three consecutive waves found the arming column wrong. I would hand 5.6 a fourth, adjacent data point: **half this campaign's waves opened no window**, which makes the ratified N=10-per-wave parameter untestable for rows-only waves and is a P1–P3 post-mortem finding in its own right (`tasks.md:309`).

# Issue: `verify-signing-chain --audit` link 4 reads `record absent 20` on PR #445's acts: the seats printed the commit as a sha-alone line

**Date**: 2026-10-23
**Status**: ACTIVE
**Owner**: Thurgood (the checker `tools/agent-generator/regrounding/verify-signing-chain.ts`, and the ballot's convention note if the fix is a brief rule; the seat-brief text is the orchestrator's, who recorded its own miss)
**Trigger**: `manual` — the event that owes the close is the commit that appends the re-read of #445's 20 acts under § 4.3 as amended by ballot `.kiro/docs/ballots/2026-10-23-link4-candidate-first-sha-after-commit.md` (its § 5 step 9: Stacy's lines and the § 5.3 delegate's file), made after that ballot's application PR merges, in a RELEASE claims-pass record if one carries `record absent 20` by then, otherwise in this record. Start condition (prose): after Spec 129's first unit merges, which is the first commit on `main` under `.kiro/specs/129-consumer-generation-completeness/completion/`. Deadline (prose): the application PR opens no later than 2027-03-21, and both re-reads are committed before 2027-04-21, the 180-day retention edge for #445's seat transcripts (A4, `cleanupPeriodDays` 180). The first monthly Civitas walk dated on or after 2027-02-21 reads whether the application PR has opened. *Re-ruled again 2026-10-23 (Thurgood, owner, rule 9) on Stacy's rule-9 line and ballot R1 A7: the re-read follows the application merge, so the close is the re-read, not the merge. Was:* `manual` — the event that owes the close is the merge of the application PR of ballot `.kiro/docs/ballots/2026-10-23-link4-candidate-first-sha-after-commit.md` (the § 4.3 parser change, its tests, and the re-read of #445's 20 acts appended to Stacy's pass record); re-ruled to `merge:#<N>` the day that PR opens. Start condition (prose): after Spec 129's first unit merges, which is the first commit on `main` under `.kiro/specs/129-consumer-generation-completeness/completion/`. Deadline (prose): the PR opens no later than 2027-03-21, 30 days before #445's seat transcripts reach the 180-day retention edge (2027-04-21; A4, `cleanupPeriodDays` 180); the first monthly Civitas walk dated on or after 2027-02-21 reads whether it has opened. *Earlier:* `manual` — the event that owes the close is Thurgood's decision and its fixing PR: either the PR that widens link 4's candidate form, or a dated "keep narrow" ruling that moves the convention into the signing-seat brief. Re-ruled to `merge:#<N>` of the fixing PR the day it opens (README rule 1: a trigger names the event, not a vehicle; the fixing PR is that event).
**Class**: P2 obligation (record) · defect *(set 2026-10-23, Thurgood; Stacy may re-class, rule 12)*. `(record)`, not `(guard)`: `--audit` is a post-acceptance read that is never a gate (Stacy's read, § 3), and the failure is loud (`record absent`), not a silent green. The chain's merge-time check on #445 (`--ci`) passed. Not P0 and not P1: no consumer reads this.
**Filed by**: Thurgood, under rule 10, in the PR that records Peter's ruling (branch `chore/audit-link4-commit-form-record`).
**Ruling**: Peter, chat, 2026-10-23, verbatim: *"Okay, lets go (a)"*, on the orchestrator's options. (a): merge #445 now, record the state, fix forward. Thurgood decides whether link 4's parser also accepts a sha-alone first line followed by the subject (and/or `%H%n%B`), or keeps the convention and the signing-seat brief template carries it. No act is redone. (b), a later re-sign round, stays available if the parser stays narrow.

---

## 1. The defect

On PR #445 (the routes-floor application: 20 first signatures by 7 seats, `verify-signing-chain --ci` PASS), `verify-signing-chain --audit` prints `record absent 20`.

Cause (Stacy's read, `fa-audit-read.md`): all seven seats committed with `git commit -q … && git log -1 --format='%h%n%B'` (Stacy `'%H%n%B'`; Lina `'%h%n%b'`). The sha is alone on the first line and the subject on the next, and `-q` suppresses the `[branch sha] subject` line. Link 4 (`candidateLines`, with `BRACKET_RE` and `HEX_LINE_RE = /^([0-9a-f]{7,40}) (.*)$/`) accepts only a `[branch sha] subject` line or a first `git log` line of the form `<hex> <subject>`. The ballot's convention is `git log -1 --format='%H %s'` (`2026-10-01-signing-act-chain.md` L106, L108). No candidate is found, so link 4 reads `record absent`, and links 5–7 (meta/agentType, prompt_snapshot, spawn) never run on these acts.

It is **not** a transcript-location gap: link 4 scans `<store>/*.jsonl` and `<store>/<session>/subagents/agent-*.jsonl`, and the seven seats' transcripts are there (earlier rounds, e.g. #378's acts, anchored from the same location).

The orchestrator's seat briefs omitted the convention (its miss, recorded in its notes).

## 2. The 20 affected acts

Seven signing commits, 20 rows:

| Seat | Commit |
|---|---|
| Ada | `1ddac1d23` |
| Data | `ea0bfe293` |
| Kenya | `314e6a01e` |
| Leonardo | `fc6ae901a` |
| Lina | `bd19189e2` |
| Sparky | `81e4f9c70` |
| Stacy | `4c0f6977b` |

Nothing in the transcripts is lost. If the parser is widened, these 20 acts anchor retroactively on the next `--audit` run, with no act redone. If the parser stays narrow, they stay `record absent` unless a re-sign round (Peter's option (b)) is held.

## 3. State carried (Stacy, verbatim)

> "20 acts - anchored 0 - unanchored 0 - record absent 20 (link 4: seats' `git log -1 --format='%h%n%B'`/'%H%n%B' sha-alone line unreadable vs convention '%H %s'; transcripts present at <store>/f6f839ac.../subagents) - FAIL 0 - anomaly 0; links 5-7 not re-verified by tool; re-run after a corrected-form commit or parser change."

Her evidentiary note: she hand-confirmed that the transcripts exist and show the commit created. A hand-read is not an anchor and never rolls into `anchored`. The audit is post-acceptance and never a gate.

## 4. The two options Thurgood owns

**A. Widen link 4.** `HEX_LINE_RE` additionally accepts a first `git log` line that is a bare hex run (`/^([0-9a-f]{7,40})$/`) whose **next non-empty line** is the subject, in `candidateLines`. The candidate keeps its existing test: the prefix must be a prefix of C's full SHA **and** the subject must equal C's exact subject.
- False-match risk: a bare-sha line followed by an unrelated line. The subject-equality test already rejects that, because the next non-empty line must equal C's exact subject and the sha must prefix C's full SHA. A false match needs an unrelated line byte-identical to C's subject directly after a sha that prefixes C: negligible. Residual: `%h%n%b` (Lina's form) puts the body, not the subject, on the next line, so it would not match unless the rule also reads the subject from a later line; I would scope that out and say so.
- The one-pass-per-call rule and the `&&`/`set -e` success evidence (L106) are unchanged: `-q … && git log` still proves success.

**B. Keep narrow; the convention goes in the brief.** The seat-brief template carries `git commit … && git log -1 --format='%H %s'` as mandatory (it is already ballot law, L106/L108). Cost: a brief omission produces `record absent`, not a failure, and the 20 stay unanchored unless re-signed.

**Preliminary lean: B, with the template line, and A held as a ballot question.** Reason: the candidate definition ("the line must show a prefix of C's full SHA and C's exact subject", ballot L102) is ratified law of the instrument, and README/charter text is explicit that *owning an instrument never authorizes changing the law it serves without a ballot*. A reads as an amendment to § 4.3's candidate form, not a bug fix of the checker against its spec: the checker did what its closed spec says (Stacy's read). Widening is cheap to build but needs a ballot to be lawful. B needs only the brief rule, which the ballot already makes mandatory.

**Surviving counter-argument.** The ballot's own measurement (L108: 45 of 50 U2b seat commit calls used a non-conforming shape) shows seats do not converge on `%H %s` by themselves, and a brief miss has now happened a second time in the instrument's life. Keeping the parser narrow means the next brief omission silently degrades the audit again, and the 20 acts are unanchored for good unless Peter holds (b)'s re-sign round. Folding in: the fix PR for B should also put the exact commit line in the seat-brief text the orchestrator uses, so the omission cannot recur through the same door. What does not absorb: the dependency on a human-written brief for an audit's reach. That fork (instrument tolerant vs. brief strict) is Peter's if he wants the 20 anchored without a re-sign; I surface it, I do not pick it.

## 5. What the fixing PR owes

- **If A**: a ballot (candidate-form amendment to § 4.3, Peter-ratified, Stacy consulted) first; then the parser change in `verify-signing-chain.ts`, with a test (in `tools/agent-generator/__tests__/`, following the module) that covers **both forms** (`<hex> <subject>` and a bare `<hex>` line then the subject) **and a false-match negative case** (a bare sha line followed by an unrelated line reads `record absent`, never a candidate). The PR body names the exercised file. After it merges, re-run `--audit` on #445's range and append the result here.
- **If B**: a one-line addition to the signing-act ballot's convention note making `%H %s` mandatory for seats is **law and needs the ballot route**; the lighter vehicle is the seat-brief template text alone (the orchestrator's), which this record asks for and does not edit. A dated "keep narrow" ruling line is appended here and the record is archived (rule 5).
- Either way: append the dated outcome line and `git mv` to `archive/` in the fixing PR (rule 5); update this record's Trigger to `merge:#<N>` when the PR opens.

## 6. Ruling 2026-10-23: the joint recommendation (appended 2026-10-23, Thurgood)

**Peter, chat, 2026-10-23, verbatim**: *"Proceed with the joint recommendation. 445 and 446 are merged"*.

The joint recommendation is Thurgood's and Stacy's consult R2 on the orchestrator's three-part plan (Thurgood R2 item 3; Stacy R2 item 4). It has three parts. No re-sign round is held.

1. **The brief-side fix, landing in the PR that appends this section.** The signing-seat rules become a committed, served document: `governance/signing-seat-brief.md` (doc id `signing-seat-brief`). It only restates ratified clauses, each with the check that reads it. Signing briefs quote it as `governance/signing-seat-brief.md@<sha>` (practice O1 below). This answers § 4 option B's residual: the rule reaches the seat through the brief, and a brief that drops it shows the drop.
2. **The early audit, as practice, not law.** The orchestrator runs `verify-signing-chain --audit --branch <unit-branch>` after the FIRST seat's signing commit, before the next seat runs and before the PR opens. It is feedback, never a verdict (Stacy R2 item 2: caught at the first seat, a miss costs one brief fix; caught after all seats, it costs one remedy per seat). Recorded below as practice O3.
3. **The narrow § 4.3 amendment (§ 4 option A, narrowed).** It is drafted now as ballot `2026-10-23-link4-candidate-first-sha-after-commit` (DRAFT, Stacy required R1) and executed after Spec 129, under the Trigger line above. The candidate is the bracket line, or the first sha printed after a successful `git commit` in the same call's result, in any line shape. C's exact subject must match, read from that call's result or from that commit invocation's own message in the call's input. The success evidence and what link 4 proves are unchanged. Under it, Lina's `%h%n%b` form anchors by the input route, which keeps the subject binding.

**The fork the joint recommendation left for Peter**: amend § 4.3 (narrow tolerant form) or keep it strict and leave the 20 acts as honest `record absent`. Resolved by his "Proceed": amend, after 129. Until the amendment is applied, Stacy's RELEASE pass carries `record absent 20` and the state line in § 3. When it is applied, the re-read of the 20 acts is appended to her pass record under the amended definition, labelled with the ballot and tool SHA, and the original line stays (Stacy R1 (b)).

**The orchestrator's practice, adopted 2026-10-23 under Peter's ruling.** O1–O3 and O5–O8 are practice, not law: they live in this record and not in a governance doc, omitting one is not a finding on a seat, and the audit verdicts stay Stacy's. **O4 is law, restated here, not practice** (Stacy's rule-9 line above): omitting it is a claims-pass finding on the PR's author. O5–O8 are the how-to items moved out of `governance/signing-seat-brief.md` at its review (Stacy B1), so the document stays a restatement.

| # | Practice | Why |
|---|---|---|
| O1 | **Quote the brief document in every signing or confirming brief** as `governance/signing-seat-brief.md@<sha>`, where `<sha>` is a `main` commit that carries it. Point the seat at its § "The seat's rules", without paraphrasing them. Paste the bound lists (its S1) into the brief. | Both #445 misses were in brief assembly. A quoted path@sha shows, in the seat's first message, which rules the brief carried. It shows in the subagent's first user message and in the parent's `tool_use` input. (Link 6's `prompt_snapshot` is the charter, not the brief.) |
| O2 | **Run seats one at a time on one worktree.** Each seat starts from the previous seat's commit. | Two seats in one tree at once can stage each other's files (S3, link 2). |
| O3 | **Run the early audit after the first seat commits**, before the next seat starts and before the PR opens: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --branch <unit-branch>`. If that seat's act reads anything but `anchored`, fix the brief before the next seat runs. | A miss caught after the first seat costs one brief fix. Caught after all seats, it costs one remedy per seat: a re-commit that moves no hash fails F5, and merge-only bars amending. The run is feedback, not a verdict, and its output is not a claims-pass record. |
| O4 | **LAW, not practice.** The PR body carries the stale and unsigned-routed lists as re-taken for the round, and every act and hold line. | Signing-act ballot § 2 clause 3 ("pasted into the PR body") and clause 6 (iv) (the acts list, holds as amended by #444). An omission is a claims-pass finding on the PR's author. |
| O5 | **Brief the hash helper's place.** A seat's hash helper lives in its session scratchpad and imports the worktree's modules by absolute path; `git status --porcelain` before the commit shows only the seat's dispositions file and sheet. | One way to hold the brief document's S3 (clause 6 (iii), link 2). |
| O6 | **Brief recomputation.** The seat recomputes both hashes by the brief document's S4 recipes, never copying them from a brief or an earlier run. | A copied hash can be stale or unmoved, which fails F5 or the stale sweep. |
| O7 | **Brief the sheet-placement convention.** New sheet sections go before the first `## Signing run summary` or `## Re-sign run summary` heading, or at the end where there is neither. | The #445 sheets' convention. No clause requires it, and no check reads it. |
| O8 | **Brief the trailer pre-check.** Before committing, the seat runs `git interpret-trailers --parse` over the message text and sees both `Agent:` and `Co-Authored-By:`. | Catches the link-3 failure before a commit that merge-only forbids amending. |

**What this changes in § 5**: the "If A" route now runs through the ballot above. The "If B" brief text is the served document, not the orchestrator's private text. This record does not close at this PR: it closes at the re-read that follows the ballot's application (Trigger line).


- 2026-10-23 — **Stacy (rule 9 line).**
  - **Class confirmed**: P2 obligation `(record)` · defect (rule 12). The instrument met its spec, and the failure is loud. The seats' commit lines were the wrong form.
  - **For the owner's Trigger, not a re-rule** (rule 9 leaves the Trigger to Thurgood): under my R1 A7 on the ballot, the re-read of the 20 acts runs after the application PR merges, at the merged tool SHA, because that PR touches an instrument path and my ARMING read follows merge. Where no RELEASE record carries `record absent 20` by then, the re-read is appended here, and the close event is that commit rather than the application merge.
  - **§ 6, practice O4**: its content is law, not practice (signing-act ballot § 2 clause 3, "pasted into the PR body"; clause 6 (iv), the acts list), and an omission is a claims-pass finding on the PR's author. Listing it under "practice, not law" reads as demoting it; Thurgood's section is his to fix (rule 9). O1–O3 read as practice.

- 2026-10-23 — **Thurgood (owner), on Stacy's rule-9 line and the reviews of this PR.**
  - **O4** is marked law in the table, not practice.
  - **O5–O8** added: the four how-to items Stacy's B1 found in `governance/signing-seat-brief.md` (S3, S4, S7, S9). The document now describes only what the clauses and checks read.
  - **Trigger** re-ruled to the re-read commit (ballot R1 A7), prior text inline.
  - **§ 6 item 3's summary is narrower in the ballot**: route (ii) requires a `git log` in the call (ballot R1 A6, accepted by Stacy). The summary above stands as written at the time; the ballot governs.


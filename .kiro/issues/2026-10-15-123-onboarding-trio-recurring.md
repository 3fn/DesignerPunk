# Obligation: re-run the onboarding persona trio at every release from release 5 (Spec 123 Req 23.7, exited at Task 28.4)

**Date**: 2026-10-15
**Status**: ACTIVE (standing — this record does not close; each release's run is appended below)
**Owner**: **Leonardo** — the trio's operator and the protocol's owner (`tests/onboarding-trio/protocol.md`). **Peter** launches every harness session (Decision 1, 2026-10-14). **Thurgood** walks this record at the monthly Civitas health check.
**Trigger**: `release:next:phase-1` — release 6's prep: the release after 16.1.0 runs the trio before its S, against its own preview candidate, as § 5.0 says. *(Re-ruled 2026-10-25, Leonardo, rules 1, 9 and 11, at the 16.1.0 run's append in the trio PR #474: the 16.1.0 firing is discharged by the `## Runs` line below, which is in the PR whose merge was the event, so the record does not lapse at it. Authority: this record's own owner line of 2026-10-25 ("after the merge I re-token it to the following release at the run's append"). The Kiro conformance pair's November re-run is owed in its own record, `.kiro/issues/2026-10-25-kiro-conformance-pair-requeue.md`, because rule 1 allows one Trigger token per record.)* *(was: `merge:#474` — the 16.1.0 trio PR (the pre-S trio records), whose merge closes this obligation's 16.1.0 firing; after the merge I re-token it to the following release at the run's append, as before. Re-ruled 2026-10-25, Leonardo, rules 1 and 9: the vehicle PR now exists, so the Trigger names its number, per ballot 2026-10-22-trigger-names-the-event-not-the-vehicle.)* *(before that: `release:next:phase-1` — closes at the pre-S trio records' merge; `merge:#<N>` at that PR's open. Before that: the next release's prep (release 5 first), re-tokened to the following release by the operator at each run's append. Before that: **each release's prep, from the release after 16.0.0** — the release owner runs the trio before the tag (RELEASE-FLOW step 6 / recipe step 6), against that release's candidate tarball. Release 4's runs are Spec 123's own (Task 25), so the first firing is release 5.)*
**Class**: P2 obligation (record) · owed-act *(set 2026-10-20, Leonardo, rule 12. A standing Req 23.7 obligation: a release shipped without its trio records is the finding. The instrument's limit is stated in the record, so no reader is misled.)*
**Source**: Req 23.7 ("the obligation SHALL EXIT CLOSEOUT AS A COMMITTED RECORD with an owner and its trigger, walked by the monthly Civitas health check"); B-U4 (`.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md`), applied in `governance/release-management-system.md` § "The Release Recipe" step 6 and `.kiro/hooks/RELEASE-FLOW.md` step 6. **Both of those name "Spec 123 Task 28.4" as the obligation's tracking record: this file is that record**, and it names them back.
**Grant paths**: `tests/onboarding-trio/protocol.md`, `tests/onboarding-trio/prompts/16.1.0/**`, `tests/onboarding-trio/records/16.1.0/**` — grantee **Leonardo** (this record's owner and the trio's operator). Scope: write access to exactly these paths, on the fixing PR's branch (`chore/release-16.1.0-trio`), for the 16.1.0 trio: the protocol revision (`tests/onboarding-trio/protocol.md` §§ 2, 5.0, 5.1, 8, 9, 11–13, 15.3), the successor frozen prompts and the 16.1.0 run records. **Activation**: Peter's merge of this walk PR (`chore/release-16.1.0-walk`), a record-only PR whose body names this grant. **Expiry**: the merge of the fixing PR, which carries the protocol revision, the prompts and the 16.1.0 trio records in one PR, so expiry is the records' merge (rule 8: "until that PR merges"). **Discipline**: the fixing PR's body cites this path list verbatim; it is diffed against the list as it stands at the activating merge; an out-of-list edit is a claims-pass finding; `tests/onboarding-trio/fixtures/**` is not granted (fixtures are the cross-release constant, Req 23.7); no governance-law path is in the list. Edits the same PR makes under Leonardo's charter scope (`.kiro/issues/**`: this record's `## Runs` line and Trigger re-rule, the cannot-tell record's rows 1–4 outcome lines, the U5 findings record's PQ-1, PQ-2 and P-5 owner lines) need no grant and are listed separately in the PR body. **Authority**: Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)" (16.1.0 walk record, line T: "(A) pre-S trio on a preview candidate"). (A) needs the protocol edit before the runs, and this list is the edit's bound. *Filed by Thurgood for Leonardo (rule 10); rule 9 applies to later edits. Unverified here: chat only. Peter may confirm the relay on the PR.*
**Consulted**: none needed — Req 23.7 fixes the exit; the owner and launcher are the U5 run discipline's (tasks.md L1485–1491).

---

## What each release's run is

- **Three cold persona runs** under `tests/onboarding-trio/protocol.md` (§§ 1–13), each on its **committed fixture** (`tests/onboarding-trio/fixtures/{a-ts-service,b-static-site,c-near-empty}`) and from its **frozen prompt** (`.kiro/specs/123-consumer-distribution/validation/prompts/trio-*.md`, or a successor committed before the run), against the release's packed candidate, **both targets** represented.
- **Records** committed alongside the release, one per persona, with every C30 field, the forced negative per persona, `session-launched-by` and `operator-log`.
- **Findings route to their owners. A regression against the recorded prior runs is a finding, not a release gate** (recipe step 6).
- **The instrument's limit travels with it** (Req 23.10): agents role-play ignorance; the trio measures instruction clarity and path completeness, and a green trio is not "a stranger succeeded".

## The baseline the first re-run is read against

Release 4's runs (Task 25): `validation/trio-1-backend.md`, `validation/trio-2-designer.md`, `validation/trio-3-pm.md`, with their findings routed in `.kiro/issues/2026-10-15-123-u5-instrument-findings.md`. **From release 5, each record carries one disposition line per prior finding**: `fixed-and-observed` / `fixed-not-observed` / `still-present` (Peter's ruling (4)(b), 2026-10-15; the recipe sentence that makes it law is owed under `.kiro/issues/2026-10-15-123-governance-edit-kinds-ballot.md` § 3).

## Also in this record's scope (Thurgood's judgment at Task 28.4)

**The Kiro renderings of consumer-Thurgood and consumer-Stacy are unexercised by Req 24.1's conformance run.** Task 27 ran both beats on the `cc` rendering only (orchestrator ruling 2026-10-15; Req 24.2a places them at 24.1 with no per-target requirement). Thurgood-on-Kiro was queried once, identity only (Task 26, `validation/join-cc-to-kiro.md` J17); Stacy-on-Kiro by nothing (`validation/conformance-beat-2.md` § Residuals).
- **Why here**: it is the same instrument family, the same operator and launcher, and the same firing event. A separate record would carry a weaker trigger.
- **What discharges it**: at the first release run that fires this record, either one Kiro conformance pair (beat 1 consumer-Thurgood, beat 2 consumer-Stacy, protocol § 15 adapted to `kiro`) is run and recorded, **or** the release record says in one line why not (e.g. no change to either Kiro rendering since 16.0.0, with the `git log` over `dist/consumer-canonical/` that shows it).

## Walk

At each monthly health check: has a release shipped since the last entry below? If yes, is there a trio record set for it? **Released without a record = finding.**

## Runs

- Release 4 (16.0.0): Spec 123 Task 25 (records above). Conformance: Task 27 (`cc` only).
- Release 5 (16.1.0): `tests/onboarding-trio/records/16.1.0/` — **three filled**: `trio-1-backend.md` (cc), `trio-2-designer.md` (kiro), `trio-3-pm.md` (kiro; bare `init` not exercised, the persona passed `--target=kiro`); **two not run**: `conformance-kiro-beat-1.md`, `conformance-kiro-beat-2.md` (setup only: steps 0–7 and 12; probes and beats not launched). F `de63033b9bfacb7da3e8fdd8a2b13538f2092a6a` (#484); candidate sha1 `42515c34784552f6d87453ac3e67dc033a773d19` (the dry-run preview pack, `version` 16.0.0, 105/105); prompts P `b5edda33c58420fb23042a113769ef5dde3b6bce` (files added in `4e5474df5`). Runs 2026-10-25, 14:41Z–21:45Z, launched by Peter. **why-run (the Kiro pair)**: both Kiro renderings changed since release 4 (`thurgood-prompt.md` 6 lines, `stacy-prompt.md` 54 lines, measured against `fixtures/born-kiro/`), so the pair was due; **why not run**: Kiro's plan quota stopped model calls. Peter, 2026-10-25, about 21:55Z, chat, relayed: "Go with the last option, re-queue the Kiro pair for November". The re-run is owed in `.kiro/issues/2026-10-25-kiro-conformance-pair-requeue.md` (Trigger `manual`: the 2026-11-01 Kiro credit reset), with Peter's candidate fork open there. *(Leonardo, 2026-10-25, rule 9.)* **Fork RULED** (Peter, 2026-10-25, about 22:50Z, chat, relayed by the orchestrator): "Use the shipped tarball if it's out, otherwise the preview": the shipped 16.1.0 tarball if 16.1.0 has shipped by the November window, the preview candidate if not; what follows per branch is in the re-queue record. *(Leonardo, 2026-10-25, rule 9.)*

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 74, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `release:next:phase-1`, re-tokened each release · `P2 obligation (record) · owed-act`.

## Owner line (2026-10-25, Leonardo, rule 9): RULED (A) — the 16.1.0 trio runs before S

On Peter, 2026-10-25, in chat, relayed verbatim by the orchestrator: "Fix all of them as the owners recommend; T is (A)". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are now committed in this record.* Read against the 16.1.0 walk (`.kiro/issues/2026-10-25-release-16.1.0-walk.md`, row 19, fork line T). **Ruled (A)**: a pre-S trio on a preview candidate pack. (B) and (C) are not taken; there is no first lapse for the persona runs.

**Owed before S, in order:**

1. **The grant row for `tests/onboarding-trio/**` naming Leonardo.** Thurgood files it, citing Peter's words above. `tests/onboarding-trio/**` is outside my write scope today, and the protocol and prompts PR cannot open until the row is merged.
2. **The protocol and prompts PR**, from my prep in `scratchpad/trio-16.1.0/`. It repoints the protocol and the frozen prompts off the release-4 preview (`3fn-core-15.1.0.tgz`), and it repairs the dangling tag reference in RELEASE-FLOW L42 (my defect). It lands first, so the runs read committed text.
3. **The preview pack**: a packed candidate of 16.1.0 built from the tree the tag will be cut from, with its hash recorded in the run records.
4. **Five launches by Peter** (Decision 1, 2026-10-14): three persona runs (trio-1, trio-2, trio-3, both targets represented) and the two Kiro conformance sessions. I operate; Peter launches every harness session.
5. **The records**: one per persona, with every C30 field, the forced negative, `session-launched-by` and `operator-log`, and one disposition line per prior finding (`fixed-and-observed` / `fixed-not-observed` / `still-present`). They are committed in the pre-S trio records PR.
6. **The Kiro conformance pair** (beat 1 consumer-Thurgood, beat 2 consumer-Stacy, protocol section 15 adapted to `kiro`). Either it is run and recorded, or the release record carries a real reason line: no change to either Kiro rendering since 16.0.0, shown by the `git log` over `dist/consumer-canonical/`. The reason line is written from that log, not assumed. The log is not run in this commit.

**Trigger**: `release:next:phase-1` is kept. Its prose is re-ruled above: this obligation's 16.1.0 firing closes at the pre-S trio records' merge. At that PR's open I re-token it to `merge:#<N>`. After the merge I re-token it to the following release at the run's append, as before.

**Counter-argument, surviving**: a preview candidate is not the published tarball. Anything the publish step changes (registry metadata, the scope mapping) is not exercised by the pre-S runs. What survives: the post-publish smoke covers that, and the trio does not claim to.

*Signed: Leonardo, 2026-10-25.*

## Owner line (2026-10-25, Leonardo, rule 9): the run plan, and the launch count reconciled

Appended after the grant row went active (Peter's merge of #469, `264c25661`) and the prep landed on `chore/onboarding-trio-16.1.0`. The owed list above is not rewritten; this line corrects what it counts and fixes the plan it left open. Plan text: `scratchpad/trio-16.1.0/run-plan.md` (scratch; the facts it carries are here).

**The count.** Item 4 above says "five launches". That counted the Kiro conformance pair as two. It is one window, because beat 2 must follow beat 1 in the same repo (protocol § 15.3). The measured shape is **4 Terminal windows and 19 harness sessions (8 interactive, 11 headless)**:

| Window | Run | Harness | Sessions (interactive · headless) |
|---|---|---|---|
| A | `trio-1-backend` | Claude Code | preflight, open · birth, probe-ada, probe-lina |
| B | `trio-2-designer` | Kiro | preflight, open · birth, probe-sparky |
| C | `trio-3-pm` | Kiro, bare `init` | preflight, open · birth, probe-leonardo |
| D | `conformance-kiro` | Kiro | preflight, open · probe-thurgood, probe-stacy, beat-1, beat-2 |

"Both targets represented" (item 4) holds: A is `cc`; B, C and D are `kiro`.

**The order.** trio-2, trio-3, conformance-kiro, trio-1. The cheapest run goes first, so a defect in the new step-0/step-2 lines surfaces there; the run with the browser sign-in goes last. Any order is valid; each run is independent.

**Peter's time.** About 2–2.5 h attended (range 1.75–3 h), plus about 5 min per run of reading and pasting. **One browser sign-in is expected** (trio-1's Claude Code preflight, a fresh `CLAUDE_CONFIG_DIR`); one more only if the real Kiro profile's login has lapsed (one `kiro-cli login` covers all three Kiro runs). Re-login loops come on top: release 4's cost about 15 minutes. Not counted: Peter's two merges (this PR, then the release PR) and his review of the draft.

**What changes in the owed list.** Items 2 and 5 are **one PR**, not two. The grant expires at the merge of the one PR carrying the protocol, the prompts and the records (grant row, line 9), so the prompts commit P goes first on the branch and the runs read `COMMIT=P` from the main checkout's object store; the records commit after P, so `git merge-base --is-ancestor P <record commit>` holds. Item 2's "lands first" is satisfied by P being committed and pushed before any launch, not by a merge.

**The ordering constraint.** This PR merges **before the release PR**: S is the release PR's squash commit, so a record merged earlier is an ancestor of S (rule 11). The rest of release prep (branch, bump, notes, CHANGELOG) can run in parallel. Only the release PR's merge waits.

**Still open (Peter).** The **S window**: no date is named, so launches cannot be booked backward from it. About a day after F is the earliest the release PR can merge, gated on Peter's four sittings. If the runs cannot all happen before S, that is a miss under (A), not a plan: the record lapses at S (rule 11) and Req 23.7's "released without a record" finding fires. Running part of the set pre-S is option (C), which Peter did not pick and would need his dated re-ruling.

**Trigger**: unchanged by this line. Still `release:next:phase-1` with the prose and the `merge:#<N>` re-token as ruled above.

*Signed: Leonardo, 2026-10-25.*

## Owner line (2026-10-25, Leonardo, rule 9): RULED — the Kiro conformance pair's repo is born fresh

On Peter, 2026-10-25, in chat, relayed by the orchestrator: "Go with Leonardo's fresh-birth repo for the Kiro pair". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are committed in this record.* **Ruled**: the Kiro conformance pair's repo is born fresh by the launcher from the candidate (`fixtures/c-near-empty`, `init --target=kiro`, `generate`, one commit), not `fixtures/born-kiro` plus `sync`. Reason (mine, as instrument owner): `born-kiro` carries the release-4 renderings and a lock pinned to the old tarball, so a `sync` would be a second thing under test. Cost, accepted: the pair's repo has no prior product work, so Thurgood's task-4 judgment meets a thinner repo and the two harnesses' pairs are not like-for-like. Protocol § 15.3 states this as settled. **The S window is still open** (the line above stands unchanged).

*Signed: Leonardo, 2026-10-25.*

## Owner line (2026-10-25, Leonardo, rule 9): RULED — the S window is event-anchored, not a date

On Peter, 2026-10-25, in chat, relayed by the orchestrator: "Re: S window, as soon as we wrap up the remaining issues that should go into 16.1.0, we should release it". *Unverified here: chat only. Peter may confirm the relay on the PR; his words are committed in this record.* **Ruled**: the S window has no calendar date. It is anchored to an event, and the plan below follows from it. This closes the "Still open (Peter)" paragraph of the run-plan line above; that line stands unedited.

1. **F is the merge commit of the last 16.1.0 fix PR.** Today's remaining two are the row-4 shape revert on #479 and Lina's E5 + size125 branch (PR number pending). F is named at the later of their merges. No one names F earlier, and no date stands in for it.
2. **The candidate pack is built from F immediately** (`npx tsx scripts/release-publish.ts --dry-run <F>` from the main checkout), then copied to the launcher's `.pack/3fn-core-candidate.tgz`.
3. **The four runs follow at Peter's next sitting** (order trio-2, trio-3, conformance-kiro, trio-1), then this PR's records merge, then the release PR. The ordering constraint above is unchanged: this PR merges before the release PR, so every record is an ancestor of S.
4. **Fallback**: if Peter ever sets a date for 16.1.0, the "F no later than <date>" form returns, and the pack is built from F at that date's latest.

**Counter-argument, surviving**: an event anchor has no deadline of its own. If a fix PR slips, F slips, and the trio waits on it; the release waits on the trio. That is the intended coupling (the trio must run on the content that ships), but a long slip is not visible as a miss until someone reads the clock. The cost of a miss is unchanged: the record lapses at S (rule 11) and Req 23.7's finding fires.

**Trigger**: unchanged by this line. Still `merge:#474`.

*Signed: Leonardo, 2026-10-25.*

# Obligation: re-run the onboarding persona trio at every release from release 5 (Spec 123 Req 23.7, exited at Task 28.4)

**Date**: 2026-10-15
**Status**: ACTIVE (standing — this record does not close; each release's run is appended below)
**Owner**: **Leonardo** — the trio's operator and the protocol's owner (`tests/onboarding-trio/protocol.md`). **Peter** launches every harness session (Decision 1, 2026-10-14). **Thurgood** walks this record at the monthly Civitas health check.
**Trigger**: `release:next:phase-1` — closes at the pre-S trio records' merge; `merge:#<N>` at that PR's open *(re-ruled 2026-10-25, Leonardo, rule 9 — owner line below; the token is unchanged until that PR opens)*. *(was: the next release's prep (release 5 first), re-tokened to the following release by the operator at each run's append. Before that: **each release's prep, from the release after 16.0.0** — the release owner runs the trio before the tag (RELEASE-FLOW step 6 / recipe step 6), against that release's candidate tarball. Release 4's runs are Spec 123's own (Task 25), so the first firing is release 5.)*
**Class**: P2 obligation (record) · owed-act *(set 2026-10-20, Leonardo, rule 12. A standing Req 23.7 obligation: a release shipped without its trio records is the finding. The instrument's limit is stated in the record, so no reader is misled.)*
**Source**: Req 23.7 ("the obligation SHALL EXIT CLOSEOUT AS A COMMITTED RECORD with an owner and its trigger, walked by the monthly Civitas health check"); B-U4 (`.kiro/docs/ballots/2026-10-13-123-b-u4-release-recipe.md`), applied in `governance/release-management-system.md` § "The Release Recipe" step 6 and `.kiro/hooks/RELEASE-FLOW.md` step 6. **Both of those name "Spec 123 Task 28.4" as the obligation's tracking record: this file is that record**, and it names them back.
**Grant paths**: none.
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

# Ballot Measure: every open record gets a routed reader (walk item 8, at the class)

**Date**: 2026-10-20
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/issues/README.md`; owner of agent-prompt currency)
**Status**: **DRAFT**, not ratified. No edit site below is applied.
**Required reviewer**: **Stacy** (E2 touches the spec workflow her LENS reads; she signs the consumer dispositions of sites 1 and 4).
**Consulted**: Leonardo — rejects a `peter:` token and option A as written; his charter is the incident; he would split Peter-gated items by what the go gates. Stacy — rejects C and A as written (six discretionary rows beside the P0s dilute the floor); recommends D and narrow-A (F-3). Thurgood (consult seat) — the class defect is the reader, not the token (E).
**Authority to draft**: Peter, 2026-10-20, on walk item 8 (ledger `.kiro/issues/archive/TRIAGE-2026-10-20.md` row 50; item 8 "Still open"): *"aren't the manual designations tied to steering and agent consumption of documentation?"*, and on prompt consumption: *"I think it's likely these docs are also consumed by agents in their personal prompts. Is that something that would impact what might be proposed?"* (both in chat, relayed by the orchestrator).
**Amends**: Start Up Tasks (a new item 9); Process-Spec-Planning (a new pre-formalization section); Thurgood's charter § "Operational Mode: Spec Formalization" (a Step 0); `.kiro/hooks/RELEASE-FLOW.md` item 3a (F-2 (i) only); `.kiro/issues/README.md` rule 1 (F-3 (a) and F-4 (a) only).

> **Conflict of interest, stated first.** The author owns the README convention whose walk is the defect, writes the new command, and is named on 22 of the records E1 would print to him. Stacy's review and Peter's ruling are the checks.

---

## 1. The incident and the class

- **Leonardo's charter** (`2026-10-03-integration-guide-designer-friendly-rewrite-charter.md`). Its prose trigger "the release-3 tag is cut" fired at `v15.1.0` (2026-10-13). Nothing read it until the 2026-10-20 walk (row 50). The deadline token is still open with Peter (item 8).
- **Spec 129's intake.** Five records name 129 as their event. Today's walk did their intake by hand (`c17e16c14`). Nothing in the spec workflow would have listed them.
- **The class.** 45 of 75 root records carry `manual`. The only routed reader of a `manual` record is the monthly walk, and the walk prints it as "not computable". The same holds for a fired `path:` or `merge:` record between walks: only the walk computes it. Re-tokening alone (D) moves records from one walk-only read to another.
- **The buckets** (consult count at `50f89e6f9`): (a) a spec opens, 9; (b) Peter-gated, 8; (c) an owner session, 5; (d) an unnumbered merge, 6; (e) other, 17.

## 2. The rule: one reader per route

**E1: the owner reads their records (Start Up Tasks item 9).** Insert after item 8:

> 9. **Your open records** *(ballot 2026-10-20-manual-records-routed-readers)*. At session start in your seat, run `./scripts/issues-owned.sh <YourName>` and read what it prints: one line per root `.kiro/issues/` record that names you on an `**Owner**:` or `**Owners**:` line and whose Trigger is `manual` or has fired. A fired record is yours to close, re-rule or report this session (README rules 5, 9 and 11). A `.kiro/issues/<file>` path cited anywhere and not at the root is in `archive/` under the same name. That record is closed, and a sentence that cites it may be stale; say so to the sentence's owner.

**The command's contract** (`scripts/issues-owned.sh <Seat>`, run at the repo root; a read, never a gate, exit 0):
- **Attribution**: a root `*.md` record other than `README.md` with a line among its first 15 matching `**Owner**:` or `**Owners**:` that names `<Seat>` as a word.
- **Firing**, per ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2, with `<tc>` the last commit that changed the record's Trigger line (`git log -1 --format=%H -G'^\*\*Trigger\*\*: ' -- <f>`):
  - `manual` is always printed.
  - `path:<glob>` is printed when `git log --first-parent <tc>..HEAD -- ':(glob)<glob>'` is non-empty.
  - `merge:#<N>` is printed when a first-parent subject in `<tc>..HEAD` ends `(#<N>)`.
  - `tag:v<semver>` is printed when the tag exists.
  - `release:` tokens are not printed (RELEASE-FLOW 3a reads them).
- **Output**: per record, `<manual | fired@<sha>>\t<file>\t<the Trigger line after "**Trigger**: ", first 160 characters>`. The last line gives the count, and the count of root records with no `**Owner**:`/`**Owners**:` line, which the command cannot attribute.

**E2: the spec author reads the records that name the spec.**
- **Process-Spec-Planning**: a new section, *"Before Formalizing: Records That Name the Spec"*, before "Requirements Document Format":

  > Before writing a spec's requirements.md, list the issue records that name the spec and read their Trigger lines:
  > `grep -lE '<spec id>|<spec directory name>' .kiro/issues/*.md | xargs grep -m1 -H '^\*\*Trigger\*\*: ' | cut -c1-240`
  > Dispose each match in the requirements feedback round's Context for Reviewers. The three dispositions are: **intake** (the spec takes it; its owner re-rules its Trigger to a `path:` on the spec's file), **re-rule** (its owner names another event), or **leave**, each with a one-line reason. A record the outline cites but the grep misses is added by hand.

- **Thurgood's charter**, Spec Formalization: *"Step 0: Read the records that name the spec. Run Process-Spec-Planning's pre-formalization grep and dispose each match in the requirements feedback round before Step 1."*

**E3: Peter's items reach Peter as one notice.**
- The priorities record (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md`) gains § "Peter-gated deferrals". Each row reads `<record> — what Peter's go starts — deferred (Peter, <date>: "<words>")` or `— awaiting Peter's answer (asked <where>, <date>)`, plus the dates it was presented. A row survives rule 5's stale archive: it cites the archived path, and rule 4 brings the record back on Peter's go.
- **Under F-2 (i)**, RELEASE-FLOW item 3a gains:

  > The walk record reprints the priorities record's "Peter-gated deferrals" list as one block headed `Peter-gated deferrals: a notice, not a question; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner.

  It stays out of the floor lines, per Stacy: a "re-defer" gesture never sits beside a P0 waiver.

## 3. Not law (owners and steward, no ballot)

- **D, by the owners under rule 9.** These re-rulings land in the application PR or their owners' next commits.
  - The five 129 records go to `path:` on the specific file. Four take `.kiro/specs/129-consumer-generation-completeness/requirements.md`: `component-token-platform-references-noncompiling` (Ada), `consumer-generation-completeness-spec` (Ada, Lina), `native-generator-findings-for-spec-129-intake` (Ada) and `semantic-override-map-type-not-exported` (Ada). `data-theme-scope-charter-vs-generator` (Thurgood, Leonardo, Ada) takes `…/design.md`, per Peter's "wait" and its design anchor.
  - The six bucket-(d) records go to `merge:#<N>` once their fixing PR is numbered: `component-schema-token-name-drift` (Lina, Ada), `spec-094-platform-theme-emission-unwired` (Ada, Lina), `disabled-guard-corpus-repairs` (Lina), `dist-components-dangling-css-requires` (Lina), `123-125b-u3-re-attestation` (Stacy) and `per-owner-test-folders` (Thurgood).
  - The color-track records convert at that spec's creation PR, already owed on rank 4.
  - 128's charter stays `manual`, because its trigger is compound.
  - The creation PR records each record's disposition.
- **Owner headers.** 9 root records name their owner only as `**Primary owner**:`, `**Domain**:` or `**Assigned To**:`, so E1 cannot attribute them. Their owners add a line-start `**Owner**:` (rule 9 already presumes that header). Until they do, E1 prints the unattributed count.
- **Prompt currency (the steward's, on Peter's prompt-consumption question).**
  - **(a) The principle**: a prompt cites a record only where the record's open state conditions a sentence of the prompt (a grant, an owed instrument, a temporary limit). A prompt never cites a record as an open-items list; the open-items read is dynamic, E1's command. At `50f89e6f9` all four cited records conform. They are `2026-10-17-per-owner-test-folders.md` ×3 ("enforced on Claude Code only until…"), `2026-09-28-full-survival-assent-signal-instrument.md` ("not yet instrumented"), `2026-09-17-platform-build-verification-harness-candidate.md`, and `README.md` ×11 (the convention). Each is at the root. The hazard is the reverse: when such a record closes, the sentence that cites it turns false at an agent's reader, and RELEASE-FLOW 3a fixes such sentences rather than disclosing them.
  - **(b) Archive resolution reaches every seat** through E1's item (one home, loaded by all eight seats), not through seven charter edits. The command does not resolve paths: resolution is one mechanical sentence, and a resolver would hide the signal that the citing sentence is stale. Consumer renderings carry no `.kiro/issues/` path, so the item's consumer disposition is a removal.
  - **(c) A walk check, a sibling of the dormant check**: every `.kiro/issues/*.md` path in `canonical/**` and the generated prompts resolves at the root. A path found only in `archive/` makes the citing sentence a finding routed to the charter's owner; a path found in neither is a broken pointer. This is convention, held by the steward. A LAW form ("a record a charter cites closes in a PR that also edits the citing sentence", README rule 5) is not proposed: there are four citations, and the walk check is enough until it misses one.
- **Walk headline**: `manual` is split by bucket (a)–(e). A dormant check compares each `manual` record's prose against `git tag` and the merged PR subjects, which would have caught Leonardo's tag.

## 4. Forks for Peter

- **F-1 (E1's command)**:
  - **(a)** It is built in this ballot's application. `scripts/issues-owned.sh` and `scripts/__tests__/issues-owned.test.ts` join Thurgood's write scope in site 4's charter edit (a write scope moves only by a `canonical/agents/**` edit; no other seat is affected).
  - **(b)** E1 waits until the command exists, and only E2, E3 and D ship now.
  - **Recommendation (a).** A prose E1 would reproduce the walk's failure across eight readers. The prototype at `50f89e6f9` runs in about 0.6 s per seat and prints Thurgood 22, Lina 20, Ada 19, Leonardo 6, Stacy 4, Kenya 4, Data 3 and Sparky 0 records (all `manual`, none fired, the morning after a full walk). That is about 1.2k tokens for the largest seat.
  - **Survives**: the cost is paid on every session start, including subagents spawned for a bounded task. The command does not cover "someone else's edit fires my record" before the commit lands on HEAD.
- **F-2 (E3's anchor)**:
  - **(i)** A RELEASE-FLOW 3a clause (LAW, Peter-merged), anchored at release prep, which matches Peter's bursty pace.
  - **(ii)** Record-only: the priorities record plus rule 6's monthly walk batch, with no ballot and no release anchor.
  - **Recommendation (i).** A list nobody is routed to reprint is the walk-only failure again.
  - **Survives** (Leonardo's): a recurring notice in front of a bursty reader decays into noise, and the notice makes slipping cheap. Neither form makes a burst happen.
- **F-3 (Stacy's): P1 and P2 (guard) records may not carry `manual`** (README rule 1). They take `release:next:phase-1`, with the start condition in prose, so rule 11 reaches them. Five records today: 094 theme-emission, component-token-platform-references, drawn-control-drift, the contrast queue and first-signatures.
  - **(a)** Adopt.
  - **(b)** Keep convention.
  - **Stacy recommends (a)**: a P1 that can never lapse is the real hole.
  - **My consult's lean was (b)**: (a) escalates a deliberate deferral as a lapse. Folded against D and E1, **I now lean (a)**. D takes component-token-platform-references off `manual` now, and 094 once its fixing PR is numbered. A re-ruling with a dated reason prevents a lapse, so the cost per remaining record is one owner look per release, which is right for a P1.
  - **Survives**: an owner who re-rules every release by rote turns rule 11 into a ritual, and nothing detects the rote.
- **F-4 (the author's): a `manual` token's prose states why no token expresses the event** (README rule 1, audited at the walk).
  - **(a)** Law.
  - **(b)** Convention: the walk headline counts `manual` records without a why.
  - **Recommendation (b).** About half already do this, E1 and E2 now carry the read, and a prose duty is the form this ballot argues against.
  - **Survives**: under convention, a bare `manual` costs its author nothing.

## 5. Edit sites (at ratification), with who applies each

1. `.kiro/steering/start-up-tasks.md` item 9 (E1): **Thurgood**. Its consumer row in `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` is a removal, signed by **Stacy**. Then regenerate and refresh the lock (`.kiro/steering` is in diff-guard's input closure).
2. `scripts/issues-owned.sh` and `scripts/__tests__/issues-owned.test.ts` (F-1 (a) only): **Thurgood**.
3. `governance/Process-Spec-Planning.md`, the new section (E2): **Thurgood**; `Last Reviewed`, `validate_metadata`, `rebuild_index`.
4. `canonical/agents/thurgood.md`: Spec Formalization Step 0 (E2) and the two write-scope paths (F-1 (a)). **Thurgood authors**; his operative-set unit and consumer disposition are re-confirmed and **signed by Stacy**; then regenerate and refresh the lock.
5. `.kiro/hooks/RELEASE-FLOW.md` item 3a (F-2 (i) only): **Thurgood**; Peter-merged law.
6. `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § "Peter-gated deferrals" (E3): **Thurgood**, a record (six rows today: bucket (b) less the rgba and shadow records the color-track carries).
7. `.kiro/issues/README.md` rule 1 (F-3 (a) and/or F-4 (a) only): **Thurgood**; the F-3 re-rulings by each record's owner.
8. Straggler sweep: `grep -rln 'issues-owned.sh' .kiro/steering canonical .claude .kiro/agents` returns exactly sites 1 and 4 and their renderings.

## 6. Census

One line per instrument, per item (ballots README § "Conventions", "Instrument census"):
- **E1** (sites 1, 2):
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — no instrument code or rule changes; start-up-tasks.md and the dispositions row are ordinary closure inputs, regenerated and lock-refreshed at application`
  - `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts) — the dispositions signature is its ordinary input, read by --ci at application`
  - `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — item 9 adds no section citation`
  - `scripts/issues-owned.sh` has no register row, so it is not a registered instrument and no line is owed for it.
- **E2** (sites 3, 4):
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with workflow-rules-guard.ts) — governance/ and canonical/ are ordinary closure inputs; no rule changes`
  - `**Census**: not in scope — 122-canonical-vs-truth and 122-sweep-1..8 — canonical/agents/thurgood.md is an ordinary input`
  - `**Census**: not in scope — verify-signing-chain — the re-confirmed unit and its signature are ordinary inputs`
  - `**Census**: not in scope — check-section-citations — the new section is a citation target; its text cites no section`
- **E3** (sites 5, 6):
  - `**Census**: not in scope — release-publish (scripts/release-publish.ts) and verify-publish-rail (scripts/verify-publish-rail.sh), which cite RELEASE-FLOW steps 5 and 6 as their law — the clause is in item 3a, a walk notice; steps 5 and 6 are unchanged`
  - Site 6 is loaded by no registered check's command.
- **F-3, F-4** (site 7): `.kiro/issues/README.md` is loaded by no registered check's command (`grep -rlnE 'issues/README' tools scripts mcp-server/src`: none outside fixtures).

## 7. Cost, retroactivity, surviving counters

- **Cost**: one command (about 30 lines of shell), four LAW edits, and about 1k tokens per session start for the three largest owners (zero for Sparky).
- **Retroactivity**: none. No record lapses because this ballot lands, and the 45 `manual` records are re-ruled only by their owners (D, F-3).
- **"A token rename changes no fact"** (Stacy). Folded: E1 is a read, not a rename, and D is kept as an owner convention. **Residual**: visibility still rests on a reader; E1 moves that reader from the steward to the owner at every session, but nothing makes the owner act.
- **"`path:` on requirements.md fires on a stub"** (Stacy). **Residual**: kept. E1 then prints it as fired at the owner's next session, which is early but not silent.
- **"A per-session print is noise"**. **Residual**: an owner with 20-odd standing `manual` records learns to skip the block. Rule 5's stale archive for P3s, and F-3 for P1/P2 (guard), are what keep the block short.

## 8. Review round record

*(Stacy, required; rounds stamped per Spec-Feedback-Protocol.)*

#### [STACY R1]

*@-mentions: none addressed to me. Read at `c5a3463aa`, records at `50f89e6f9`: this ballot; the three item-8 consults; README rules 1, 3, 5, 9, 11 and 12; ballot 2026-10-18 M2's token table; Start Up Tasks; `canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml`; `package.json` `files`. E1 was tested with my own reading of § 2's contract, written outside the worktree and run against `50f89e6f9`. E2's grep was run for 123, 128, 129 and 130.*

**E1: the command test.** → § 2 "E1"
- **Reproduced**: 45 `manual` records of 75, the walk's count. The per-seat `manual` counts match § 4 F-1 exactly (Thurgood 22, Lina 20, Ada 19, Leonardo 6, Stacy 4, Kenya 4, Data 3, Sparky 0). They match only under the prototype's attribution, where the `**Owner(s)**:` token can appear anywhere in the line. Nothing has fired at `50f89e6f9`: the 66 attributed records are 38 `manual`, 19 unfired `path:` and 9 `release:`. The live data never exercises the firing limbs, so I checked them by reading them against M2.
- **E1-1 (amendment: attribution follows two different rules)**. The contract says "a line … matching `**Owner**:`". § 3 has owners add a "line-start `**Owner**:`" and counts 9 records E1 cannot attribute. Under line-start, that count is 14, not 9. Five records carry `· **Owner**:` mid-line in a `**Date**:` header: coverage-map-stale-sweep-5-column, generate-product-only, native-readiness-test-patterns, src-path-convention and u1b-backward-check. Thurgood's count drops to 20 and Ada's to 17. The contract should pick one rule. Anywhere-in-line keeps 66 records attributable, but it matches the seat anywhere on the line. Coverage-map-stale prints to me because its header reads "confirmed by Stacy … · **Owner**: **Lina**". Fix shape: find the token anywhere on the line, but match the seat only in the text after it.
- **E1-2 (amendment: coverage)**. Even under the prototype, 7 of the 45 `manual` records reach no owner: blend, oklch-shadow, token-index-ordering, component-schema-token-name-drift (P0), spec-094 theme emission (P1), 115-B and color-token enforcement. Two of the three highest-class `manual` records are in that list. "Until they do, E1 prints the unattributed count" leaves them unread, with nothing that triggers the fix. Fix shape: the 9 header lines land in the application PR, in the owners' own commits (rule 9). E1 then starts at 75 of 75, and the count line stays as the regression signal.
- **E1-3 (amendment: `merge:` diverges from M2)**. M2 fires `merge:#<N>` at PR N's squash, with no lower bound. The contract bounds it to `<tc>..HEAD`, so a token written after PR N merged is never printed even though it has fired. `tag:` already has no bound; give `merge:` none either (`git log --first-parent HEAD`). `path:` stays bounded, as M2 bounds it.
- **E1-4 (amendment: HEAD or main)**. M2 fires against `main`. On a unit branch, `<tc>..HEAD` prints fires caused by the session's own unmerged commits and misses `main`'s commits since the branch was cut. Either item 9 says to run it on `main`, fast-forwarded, or the command computes against `main`.
- **E1-5 (disclosure: "the Trigger line")**. Say "the first line beginning `**Trigger**: `". `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` has four such lines. `-G` sets `<tc>` from a change to any of them, which can only move `<tc>` later and so hide a `path:` fire. That record's first line is a `release:` token, so nothing is hidden today. Name this as the command's known gap.
- **E1-6 (amendment: interaction with F-3)**. E1 does not print `release:` tokens. Under F-3, a record moved off `manual` drops out of its owner's session print and is read only at 3a, which is where it lapses. Print `release:` records as `due:<ver>` lines; there are 9 attributed today. Without this, F-3 and E1 work against each other.
- **"A read, never a gate, exit 0" is right.** A session is not a git object, so "fired, and not disposed of this session" cannot be decided. A gate at session start would also block work the owner did not cause. The consequence already exists in rule 11: a printed `fired@` record that no ancestor of the firing commit closed or re-ruled has lapsed. **E1-7 (amendment)**: item 9 says so and adds "an owner at session start" to rule 11's list of observers, so that the owner appends the `## Lapse` heading. The read then leaves a record without becoming a gate.
- **The archive sentence** is right in substance, but it restates README rule 3. **E1-8**: cite rule 3 instead, keeping one home. Also add the other case: a path found neither at the root nor in `archive/` is a broken pointer, to be reported to the sentence's owner. These are § 3 (c)'s two cases.
- **Cost is acceptable at every session start, subagents included.** 0.6 s and about 1.2k tokens for the largest seat is small next to a charter. F-1's surviving counter stands: for a bounded subagent the print is noise. I would not exempt subagents, because the exemption is where the read would stop happening.

**E2.** → § 2 "E2"
- **E2-1 (amendment: false positives)**. With a bare number, `grep -lE '<spec id>|<spec directory name>'` matches line numbers and SHAs. Results at `50f89e6f9`:
  - 129: 25 records, 4 of which match only text like `L129`.
  - 128: 11, 4 of them noise.
  - 130: 11, 2 of them noise.

  Fix: anchor the id as `Spec <id>` or `specs/<id>-`, followed by a character that is neither alphanumeric nor a hyphen (so that `125` does not match `125-B`), or match the directory name. That gives 21, 7 and 9. Each false positive costs one "leave" line, so this fixes cost, not correctness.
- **E2-2 (amendment: where intake points)**. "re-rules its Trigger to a `path:` on the spec's file" invites `requirements.md`, the file D uses for the five 129 records. Once the requirements PR has merged, any later amendment to requirements.md fires the record, and a record still open lapses at that commit. Intake should name the file whose change delivers the record. That is the carrying parent's completion doc once tasks.md numbers the parent, or `completion/claims-pass.md`, which fires at CLOSEOUT, where I read it. The wording is Thurgood's.
- **The LENS feed works if each disposition is a fixed line.** **E2-3**: one line per record, `<record> — intake | re-rule | leave — <reason>`. At the tasks round I can then check from git that every intake has its re-ruled Trigger and a row that carries it. At CLOSEOUT I can check that every intake is closed. I judge only whether the line can be checked; whether a record belongs in the spec stays the author's call.

**E3.** → § 2 "E3"
- **The floor stays clean.** The block is headed as a notice, never written as `**Open for Peter**:` lines, and kept out of the floor lines, so a re-defer never sits next to a P0 waiver. That is what I asked for.
- **E3-1 (amendment: reconciling the notice with the hold rule)**. A "deferred (Peter, <date>: "<words>")" row records a question already answered, so reprinting it holds nothing. An "awaiting Peter's answer" row is different. Under the 2026-10-17 rule, a pointer to a question asked elsewhere holds the merge, and a heading that says "not a question" does not change what the row is. A walk PR whose body points at the block would hold itself. Fix shape: the list carries only answered rows. An unanswered Peter-gated item is asked as an `**Open for Peter**:` line on the PR that first lists it, which for today's six rows is the application PR. On Peter's answer it becomes a deferred row; "not now" counts as an answer. The block is then a notice of answers, not a list of questions.
- **E3-2**: no P0 record enters the list, because P0 records belong in the floor. data-theme and component-schema-token-name-drift are already P0.

**F-3: I narrow my recommendation to P1 records.** → § 4 "F-3"
- **My consult's count was wrong.** I named five records using the classes they had before today's back-fill. At `50f89e6f9`, 14 `manual` records carry P0, P1 or P2 (guard):
  - **P0**: component-schema-token-name-drift and data-theme-scope.
  - **P1**: spec-094, component-token-platform-references and drawn-control-drift.
  - **P2 (guard)**: contract-education-content-debt, the semantic-contrast queue, disabled-guard-corpus-repairs, instruments-parser-and-resolver, named-guard-selection-floor, the components-calibration charter, first-signatures, release-publish-concurrent-runs and census-mode.

  F-3 as drafted binds 12 of them. The two P0s are read by Class at 3a regardless of their token.
- **What each owner would write under F-3 (a) as drafted**:
  - **spec-094 (Ada) and component-token-platform-references (Ada)**: D's tokens. Both take `path:…129…/requirements.md` now; 094 moves to `merge:#<N>` once its PR is numbered.
  - **drawn-control-drift (Lina)**: `release:next:phase-1`, with the per-component arms in prose.
  - **disabled-guard-corpus-repairs (Lina)**: D's `merge:#<N>`.
  - **semantic-contrast (Ada) and first-signatures (Thurgood)**: `release:next:phase-1`. Both are Peter-gated, and the contrast queue is under his 2026-10-18 deferral. A P2 (guard) record escalates at its first lapse, at release S, so this sends a ruled deferral back to Peter. That was Thurgood's objection in his consult, and it is correct.
  - **instruments-parser, census-mode and release-publish-concurrent-runs (Thurgood), and components-calibration (Lina)**: each names an event that no token expresses honestly, such as "a new tasks.md is created" or "a second duplicate run". components-calibration's event is a change to the matcher files, which could take `path:` only if one glob covers them. Forcing `release:next:phase-1` on these records makes the owner re-rule them every release, by rote. Named-guard's step 2 was moved from `release:next:phase-1` back to `manual` on 2026-10-19 for this reason: a release token would have read as the lapse of a step that was never ruled.
- **Revised recommendation, (a′): P1 records may not carry `manual`.** A P1 takes a git-visible token where one expresses the event, and otherwise `release:next:phase-1` with the start condition in prose. That covers three records today. After D, only drawn-control-drift remains, plus 094 until its PR is numbered. A consumer-blocking defect that can never lapse is still the hole. A P2 (guard) owed-act waiting on an honest event is not. Peter-gated P2 (guard) records go through E3, not F-3. P2 (guard) records on `manual` stay a convention, read as one line in the walk headline.
- **Survives**: a P2 (guard) defect on `manual` still never lapses. Under E1 its owner sees it every session, and nothing makes the owner act on it.
- (a′) is a third option beside (a) and (b). The pick is Peter's.

**F-1, F-2 and F-4.** F-1: (a), with E1-1 to E1-8. Each is small in a 30-line script, and a prose E1 would repeat the walk's failure across eight readers. F-2: (i). F-4: (b). Under E1, a bare `manual` costs its owner a line every session, which answers part of F-4's surviving counter.

**Census.** → § 6
- **C-1 (amendment: E1 misses one instrument)**. `pack-assert`, one of the checks of the `hermetic-publish-path` row, loads `.kiro/steering/start-up-tasks.md` by name, because the raw file ships in `package.json` `files`. It reads the list of packed paths, not their text, so "not in scope" is the right call, but the line is still owed. Shape: `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts, scripts/pack-assert.ts) — it lists start-up-tasks.md by path; item 9 changes no packed path`.
- **The other lines are correct.** `check:id-uniqueness` scans sites 1 and 3 but has no register row, so no line is owed for it. I re-ran the grep for site 6 and for `.kiro/issues/README.md`, and agree.
- **I agree the new script is not a registered instrument.** It is a read, with no register row and no CI wiring. If a claims pass or the walk later cites its output as evidence, it becomes an instrument through that use, and it would need registering then.
- **Disclosure, no amendment**: the raw `start-up-tasks.md` ships in the package. Item 9 names a script the package does not contain, and that sentence reaches any consumer who opens the raw file. The removal disposition governs only the rendered always-set, and item 8 already has the same exposure. Thurgood should confirm which file the consumer's reader actually meets.

**Verdict: ready with amendments**: E1-1 to E1-8, E2-1 to E2-3, E3-1, E3-2 and C-1, plus F-3 revised to (a′). None blocks the draft. E1-2 and E3-1 should land before application: E1-2 because the unattributed records include the highest-class ones, and E3-1 because of the hold rule. My positions are F-1 (a), F-2 (i), F-3 (a′) and F-4 (b); the picks are Peter's. *Standards implications: E2-3's disposition line and E3-1's answered-only list are formats that my LENS and release reads would read. If they are adopted, my charter's LENS row gains one read at its next edit.*

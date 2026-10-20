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

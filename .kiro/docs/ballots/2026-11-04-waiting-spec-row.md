# Ballot Measure: one row per waiting spec at each release's S, answered open, park or closed

**Date**: 2026-11-04
**Drafted by**: Thurgood (Civitas steward; release author; owner of `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` and of `.kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh`), at Peter's direction.
**Status**: **RATIFIED (Peter, 2026-11-04)** — "Re: 644, ratified", received 2026-11-04T13:32:16Z (`date -u` at receipt in the orchestrator session; relayed by the orchestrator to the holder). He ratified the ballot at head `b8b6aa3934422d926eecf5de2e7e1f6ff776e99b` (R4), after reading the PR's Open-for-Peter line ("Do you ratify this ballot as it now stands? …") and the orchestrator's summary of R4. **Record-first**: this commit is the record, made before any edit site is applied (`.kiro/docs/ballots/README.md` § "The Ratification Protocol", step 1). The five R1 entries are spliced into § 9, [THURGOOD R2] records how each was folded in, [THURGOOD R3] records how Peter's answers to F-1 to F-4 (§ 6, received 2026-11-04T06:03:25Z) were folded in, and [THURGOOD R4] records how his answers to Additions A and B, to the cleanup list and to the PR shape (§ 6, received 2026-11-04T13:23:25Z) were folded in. Every fork was decided before he ratified. Nothing below is applied.
**Authority for drafting** (Peter, in chat, relayed by the orchestrator; receipt bounds are the orchestrator's `date -u`):
- He was asked about "Decision 5", the class option for "rounds don't open". The text he read: "At each release, the existing baseline adds one row per spec that's waiting: how many releases since its outline last moved. You'd get one line per spec: open it, park it with a reason, or close it." Received before 2026-11-04T03:31:22Z, verbatim: *"Re: Decision 5, for."*
- Then he was given three definitions of "waiting spec": (a) ranked in the priorities record; (b) named by a record's Trigger; (c) any outline without requirements, about 23 specs, "mostly dead placeholders". He asked: *"Re: waiting spec, with (c), wouldn't that mean we'd review those specs and decide if they should be closed/archived?"* The orchestrator answered yes. It counted 24 such specs and said:
  - (c) cleans itself up after one triage;
  - its cost is one batch of about 20 decisions, prepared by an agent pre-sort;
  - "close" should be a dated line in the outline, not a directory move;
  - some `XXX-*` directories are ideas, to be parked rather than closed.
  - It offered: "have Thurgood write the ballot with (c) and attach the first-pass triage list, with owners confirming each recommendation."
  - Received before 2026-11-04T03:54:30Z, verbatim: *"Yes, have Thurgood write the ballot with (c)"*.
- His two answers rule the substance: definition (c), and a row per release. This ballot writes the lines that carry it. **Ratification is of the written lines**, not a second ruling on the substance.
**Required reviewer**: **Stacy**. RELEASE-FLOW phase 1 reads the walk record that the new row lands in. She is also the census reader.
**Consulted**: Stacy (required, R1); Ada, Lina, Leonardo and Sparky (row owners, R1). Their entries are in § 9, spliced byte for byte by the holder. Thurgood's confirmation of his own rows is his own act, recorded in [THURGOOD R2], not a second seat's read.
**Class**: LAW. A new duty at every release is a requirement that nothing imposed before (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds").

**Amends**:
- `.kiro/hooks/RELEASE-FLOW.md` item 3a: one new paragraph (§ 3 site 1). **LAW**.
- ~~`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 7's header~~: **not applied** (F-1 (b), Peter, 2026-11-04; § 3 site 2). § 7's header stays ballot E3's text.
- `.kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh`: one appended block (§ 3 site 3, Appendix A). **EXECUTION** of site 1. It is not a governance path, so it owes no edit-kind line.
- `.kiro/specs/131-governance-simplification/evidence/2026-11-04-baseline-16.2.0.md`: one generator-pin line (§ 3 site 4). **EXECUTION**.
- `.kiro/specs/131-governance-simplification/evidence/README.md`: the `baseline-snapshot.sh` entry made true (§ 3 site 5). **EXECUTION**.

**Census**:
- Site 1 edits `.kiro/hooks/RELEASE-FLOW.md`. Two register rows cite that file as the law their instruments implement (condition 2): `publish-rail-guard` (steps 6 and 6b) and `hermetic-publish-path` (steps 5.1–5.4). So site 1 is presumptively in scope of both:
  - `**Census**: not in scope — publish-rail guard (scripts/verify-publish-rail.sh) — the edit adds a 3a walk paragraph; the rail reads one version from the live registry and loads no RELEASE-FLOW text, so no verdict can change`
  - `**Census**: not in scope — hermetic publish path, both scopes (scripts/release-publish.ts) — the script names RELEASE-FLOW steps only in comments and messages; the edit touches no step it decides, so no verdict or surface can change`
- No registered check loads sites 3–5 (site 2 is not applied):
  - `.kiro/issues/` and `.kiro/specs/` are not citing roots of `check-section-citations` (`governance/`, `.kiro/steering/`, `canonical/`), and they are not in `122-diff-guard`'s input closure (`tools/agent-generator/diff-guard.ts` L62–71).
  - `baseline-snapshot.sh` is named in no register row's `checks`.
  - The only rows that cite the issues README or the walk as law, `issues-obligation-lapse` and `release-falsity-floor`, have `checks: []`.

**Cap**: one RELEASE-FLOW paragraph; one script block of 25 lines; one pin line; one README entry. **Retroactivity**: none. Every existing figure the baseline script prints is unchanged at the same arguments; the block only appends (Appendix A).

---

## 1. The gap

Two spec outlines sat for weeks with nothing on them telling anyone they were waiting.
- **129** was ranked first in the priorities record on 2026-10-18, and its outline round never opened. In the facts-generator consult of 2026-11-04, Ada named that unopened round as the root cause of 129's drift.
- **130's** R1 never ran, and its question "Does 130's R1 run now?" stayed open in the priorities record from 2026-10-18 until Peter's "Not now" (2026-11-04, recorded in that record's § 6.2).
- Nothing in the release flow shows how long an outline has waited. The priorities record is walked monthly, but it ranks only the specs someone already put in it.
- **Twenty-four** directories under `.kiro/specs/` hold an outline and no requirements at `ee31decd3` (Appendix B). Most have not moved in more than 30 releases.

## 2. The rule

**A waiting spec** is a directory directly under `.kiro/specs/` that:
- holds `design-outline.md`;
- holds no `requirements.md`;
- has an outline whose last outcome line (the form below, at column 0) is not `closed`.

Its figure is **the number of releases cut after the outline last moved and before S**. In git's terms, these are the `v*` tags reachable from S but not from the outline's last-touching commit `c`, leaving out any tag at S itself: `git tag --list 'v[0-9]*' --merged S --no-merged c --no-contains S`. *(R2, Stacy 2.1 and 2.2: R1 counted a tag at S, so a paste made before step 5.2's tag and a re-run after it differed by 1 on every row. R1's prose also said "contain S", which is the reverse set.)* Because a tag at S is never counted, the paste reads the same whether it is written before or after the release's own tag.

- **Directories without an outline are not waiting specs** and are not listed. That covers formal specs without an outline, and directories that hold only inbounds or feedback. A spec that starts with inbounds alone is invisible to the row until its outline exists (residual, § 7).
- **Every directory is its own spec.** `125-mechanical-enforcement-strategy` and `125-A-pr-gate-mechanical-arming` are two entries. The umbrella is listed on its own facts, and the sub-specs are not listed while they hold `requirements.md`. `054` and `054a`–`054d`, and `119` and `119-A`/`119-B`, are read the same way. Unnumbered `XXX-*` directories count like any other.
- **Any outline edit resets the figure**, including a pointer fix or the outcome line itself. #643 (a pointer-only refresh of 128's outline) resets 128 to 0 at its merge without opening any round. After a park, the figure therefore reads "releases since it was parked". This is a residual, not a feature (§ 7).
- **An outcome line is not a refresh.** Writing one changes no other line of the outline. Parking 130 is therefore consistent with Peter's "don't refresh it" (Lina R1, row 18).

**At each release's S** the walk record pastes the table. Peter answers each row he is asked about with one of three outcomes. Each outcome is written as one dated line in the outline:
- **open**: the spec's outline round opens.
- **park**: with a reason and a re-ask event. The row is reprinted at each S and not re-asked until the event fires.
- **closed**: with a reason, or "superseded by <path>".
  - The directory stays where it is, so no link breaks. Process-Development-Workflow L221 cites a file inside `087-…/`, and `.kiro/docs/agentic-ui-strategy.md` L241 and L285 cite `XXX-stemma-catalog-readiness-audit/`.
  - The spec leaves the table.
  - A record routed in place to a closed spec would never fire. So the PR that writes a `closed` line pastes E2's grep for the spec (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec"), and every hit whose Trigger names the spec's path is re-ruled by its owner in that same PR (Stacy R1 1.3 (ii)).

**Two lines go beyond the text Peter read**, which was "open it, park it with a reason, or close it". They were Thurgood's additions, not his words, and Peter has confirmed both ("A yes, B yes", 2026-11-04T13:23:25Z; § 6):
- **Addition A (DECIDED, yes)**: an `open` row is re-asked once its figure reaches 2.
- **Addition B (DECIDED, yes)**: a park must carry a re-ask event, and that event is a git-visible token, never `manual`.

## 3. Edit sites (after ratification, one PR, Peter-merged)

### Site 1: `.kiro/hooks/RELEASE-FLOW.md` item 3a, new paragraph (LAW)

**Before** (the paragraph it follows, unchanged, L41 at `ee31decd3`):

> The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*

**After**: that paragraph, then a blank line, then this new paragraph, indented like its neighbours:

> **Waiting specs, at S.** The walk record's "At S" section pastes the "Waiting specs at S" table that `.kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh` prints when run at S with the release's four arguments.
> - **A waiting spec** is a directory directly under `.kiro/specs/` that holds `design-outline.md` and no `requirements.md`, and whose outline's last outcome line is not `closed`. Each directory is its own spec.
> - **Its figure** is the number of `v*` tags reachable from S but not from the outline's last-touching commit, leaving out a tag at S itself. So the paste reads the same before and after step 5.2's tag, and any outline edit restarts the figure.
> - **This paragraph is the definition's one home.** The script's block implements it and does not restate it. A change to the definition here changes the block in the same PR.
> - **The paste is facts only.** It holds no merge, and no row of it is an `**Open for Peter**:` line. Its rows are not walk rows: neither the falsity floor's "rows" (M7) nor phase 1's disposition read covers them, and phase 1 does not read or re-run the paste. The monthly health-check walk reads that each release's walk record carries it.
>
> The release's orchestrator puts the rows to Peter in one batch, outside the walk record's PR. Two kinds of row are reprinted, not re-asked:
> - a row whose last outcome is `open` and whose figure is below 2;
> - a row whose last outcome is `park` and whose re-ask event has not fired.
>
> Peter answers each row with one of three outcomes. The spec's formalizer (Thurgood, unless the outline names another) writes the answer into the outline as one line at column 0, dated, with his words and their receipt bound. An outcome line changes no other line of the outline.
> - `**Spec outcome (YYYY-MM-DD, <seat>)**: open — <his words>`. The outline round opens.
> - `**Spec outcome (YYYY-MM-DD, <seat>)**: park — re-ask: <event>; <reason> — <his words>`. The event is one git-visible token of `.kiro/issues/README.md` rule 1's grammar (`tag:`, `merge:#`, `path:` or `release:`), never `manual`. The walk author reads whether it has fired.
> - `**Spec outcome (YYYY-MM-DD, <seat>)**: closed — <reason, or "superseded by <path>"> — <his words>`. The directory is not moved. The PR that writes this line pastes E2's grep for the spec (Process-Spec-Planning § "Before Formalizing: Records That Name the Spec"), and each hit whose Trigger names the spec's path is re-ruled by its owner in that PR.
>
> *(added <application date> by ballot 2026-11-04-waiting-spec-row, site 1)*

*(R2: the event now comes before the reason in the park form, so it can always be read from the start of the line (Stacy 2.3). The paste's place relative to phase 1 is stated (Stacy 1.3 (i), (ii)). The definition's one home is stated (Stacy 1.2). The `closed` clause is new (Stacy 1.3 (ii)). "Git-visible, never `manual`" is Addition B. The `open` threshold of 2 is Addition A.)*

The park bullet is as above, with no priorities-record row: a park lives in the outline line alone (F-1 (b), Peter, 2026-11-04).

### Site 2: NOT APPLIED (F-1 (b), Peter, 2026-11-04): `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 7 header

*Why it is not applied, for the trail:* F-1 (a) would have made a park an outline line plus a row in the priorities record's § 7, which needed this one-sentence amendment of ballot E3's header. Peter took (b), the outline line alone, so § 7's header stays E3's text and nothing is edited. No Before/After text is carried: there is no edit.

### Site 3: `baseline-snapshot.sh`, the "Waiting specs at S" block (EXECUTION)

Insert Appendix A's block, verbatim, after the line `row "Native verification" "$nvt" "git grep -lE 'xcodebuild|swift build|swiftc|gradle|kotlinc' $SS -- .github/workflows/"` and before the closing `echo` and footer.
- The block adds no figure to the table, and it changes none of the table's rows.
- The script's header comment gains one sentence: "Since ballot 2026-11-04-waiting-spec-row, its 'Waiting specs at S' block is the table RELEASE-FLOW item 3a pastes at each S; the table above it remains Spec 131's evidence."
- **The block does not truncate.** It prints each outcome line whole, with `|` escaped, so no reason can push a re-ask event out of sight. Its abbreviations are `--short=9`, like the script's other rows. *(R2, Stacy 2.3: R1's `cut -c1-160` depended on the locale, and `%h` grows with the repository.)*
- **The pairing runs both ways now.** A change to the definition in site 1 changes the block in the same PR (site 1's own sentence). A PR that changes only the script carries the `**Straggler sweep**:` line that RELEASE-FLOW's naming of the script brings with it.
- **Not taken**: a register row for the script. That would make it a registered instrument, owing a census at every definition change, and the table gates nothing (Stacy 1.2 offered both shapes).
- **Why this script, and not `spec-facts.sh`**:
  - `spec-facts.sh` reads one spec over one window at round open. Its README says it is "never a release duty", and making it one would undo the split between round facts and release facts that the facts-generator consult made.
  - `baseline-snapshot.sh` already takes a release's arguments (prev-S, S, walk start, version), and appending a block changes no figure it prints.
  - Its one cost is that the 16.2.0 baseline record stops re-running byte for byte with the newer script. Site 4 pins it.
  - A third, separate script would avoid the pin, but it adds a file. It would also need a home outside `.kiro/specs/**`, and `scripts/` takes a write-scope grant for a new file.

### Site 4: the 16.2.0 baseline record, generator pin (EXECUTION)

In `.kiro/specs/131-governance-simplification/evidence/2026-11-04-baseline-16.2.0.md`, append one bullet to "**How it was made**", after the 16.1.0 bullet:

> - **Generator pin** *(added <application date>, Thurgood, ballot 2026-11-04-waiting-spec-row site 4)*: both runs were made with `baseline-snapshot.sh` @ `347d5a1bd`, the script's only commit before that ballot added its "Waiting specs at S" block. Re-run them byte for byte with `git show 347d5a1bd:.kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh | bash -s -- <the args above>`. The newer script prints the same table, then the block, then the footer, so a byte comparison should expect the footer to move below the block.

At application, re-check that `347d5a1bd` is still the script's only commit before the application PR (Stacy 2.6).

### Site 5: the evidence README entry (EXECUTION)

In `.kiro/specs/131-governance-simplification/evidence/README.md`, the `baseline-snapshot.sh` entry's sub-bullet "It is in no CI lane and no rule names it. The record is pasted at S, …" becomes:

> - It is in no CI lane. **One rule names part of its output**: RELEASE-FLOW item 3a pastes its "Waiting specs at S" block at every release's S (ballot 2026-11-04-waiting-spec-row). The rest of its output is Spec 131's evidence and no rule names it. The 16.2.0 record was pasted at S, with the same figures at the previous S (`38f4ece47` for 16.2.0) beside it, and it is pinned to `347d5a1bd`.

## 4. Application (after the Status commit)

1. The Status commit records the ratification, record-first. Peter's answers to F-1 to F-4 are already on record in § 6, and the Status commit cites that block.
2. One PR, the application PR, applies sites 1, 3, 4 and 5 (site 2 is not applied) and carries the first pass's outcome lines (item 3).
   - The body carries the `**Edit kind**:` lines (RELEASE-FLOW LAW; sites 3 to 5 are not governance paths and owe none) and the census lines above, re-run at application.
   - It also carries a `**Straggler sweep**:` line for `baseline-snapshot.sh` (ballots README, "Straggler sweep on an instrument PR"), because RELEASE-FLOW names that script at the PR's merge.
   - Verification:
     - `bash -n` on the script;
     - the 16.2.0 and 16.1.0 runs, compared with the committed record: the table must be byte-identical, followed by the new block and then the footer;
     - the block at 16.2.0's S (`4d10202b2`) must print 128 as 0 and 051 as 49, which shows the tag at S is left out (R2 test: it does);
     - the block at the application's base, compared row for row with Appendix B, with any difference since `ee31decd3` listed.
3. First pass, at ratification (F-2 (a), Peter, 2026-11-04):
   - Peter approved the triage list as it stands (Appendix B: 20 close, 3 park, 1 open, each with its reason), and chose one PR (§ 6, "Peter's answers to Additions A and B, the list, and the PR shape"). The application PR writes one outcome line per row, in the outlines under `.kiro/specs/**`, with his approval of the list as "his words" (receipt bound 2026-11-04T13:23:25Z); each owner is consulted on their rows. (§ 8's "outcome PR" is this PR.)
     - Row 17's `open` line is written only once `task/129-outline-r1`'s go entry is on `main` (Appendix B row 17).
     - Rows 10 and 20 cite the inbounds written in their own PRs (Appendix B). The application PR checks, before it writes those two lines, that both inbound paths exist on `main`; if one does not, that row's line waits and is named in the PR body.
     - It carries each `closed` row's E2 paste (site 1).
     - It carries the follow-on records § 8 names, under `.kiro/issues/README.md` rule 10.
     - It carries 116's Q5 record (F-4 (a)): owner Ada, Sparky consulted, Trigger `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`, in the wording of [SPARKY R1] in § 9.
   - Nothing waits for 16.3.0's walk; its paste is the first run of site 1's text on a table the first pass has already cleared.

## 5. Recommendation, counter-argument (fold-back applied), residual

**I recommend** sites 1 and 3–5, with F-1 (b) and F-2 (a), Additions A and B, the approved list and one application PR (all now Peter's, § 6), on these grounds:
- Peter has ruled the substance.
- (c) needs no list to be kept current, unlike (a) ranked.
- The first pass, after the owners' R1 reads, proposes closing 20 of the 24 directories, parking 3 and opening 1. Every row now has an owner's read or Thurgood's confirmation of his own, and every park has a git-visible re-ask event. Two rows carried a fork for Peter, 128's re-ask token (F-3) and 116's Q5 (F-4); both are answered (§ 6).
- After that, the table is a short list of real waiting specs.

**Counter-argument 1: this adds a standing release step while Spec 131, whose purpose is removing layers, is paused.**
- Fold-back: it uses the existing walk record and the existing outline file. It creates no new record type and no new script file, and it holds no merge.
- If Peter takes the first pass as proposed, it takes 20 directories out of anyone's attention.
- **What survives**: every release still gains one paste and one batch line for Peter, and 131 may later want it gone.

**Counter-argument 2: the figure resets on any outline edit.**
- Fold-back: no clean fix. Counting from the outcome line resets too, and counting from the directory's creation never resets, so it overstates a spec that is moving.
- **What survives**: a pointer edit can make a stale spec look fresh. #643 does exactly that to 128.

**Counter-argument 3: the drift does not stop at outlines.**
- Specs that hold requirements and have unticked parents are invisible to (c). Stacy's rough parse at `ee31decd3` (R1 item 3) finds about 38 directories with `requirements.md` and at least one unticked parent-shaped line, `125-A` (8 of 9) among them. Many are probably stale boxes. I have not computed the full set; the examples here are a sample.
- In 054a–054d, the only unticked **parent** is 054d's Task 7, "Expand node extraction to capture full design properties". The rest are unticked criteria and test bullets: Ada counts 58 across the three, and Stacy finds 054a at 7 of 7 parents and 054b at 6 of 6. *(R2: R1's "054a 17, 054b 32, 054d 10 parents open" counted checklist lines, not parents.)*
- `107` leaves parents 4, 5 and 6 unticked although their completion docs exist (Leonardo R1, row 7). Leonardo will check them as the skill's owner.
- **What survives**: specs stalled after requirements are outside this rule, and there are more of them than R1 said. Whether to widen the rule is 131's question.

**Counter-argument 4: a release step depends on a script inside a spec's evidence directory.**
- **What survives**: a reader of RELEASE-FLOW lands in `.kiro/specs/131-…/evidence/`. Moving the script to `scripts/` needs a write-scope grant, and that is 131's call.

**Counter-argument 5: the first pass is about 24 decisions for Peter.**
- Fold-back: Appendix B pre-sorts them with evidence, and the owners confirm their rows before he sees them, so he can answer "all as recommended" with exceptions.
- **What survives**: two rows came to him as real questions (F-3 and F-4), and he has answered both. Thurgood's own 14 rows rest on his confirmation alone, except the six that Stacy sampled (rows 3, 5, 13, 14, 22 and 23).

**Counter-argument 6: closing by an outline line leaves the directories in place.**
- `.kiro/specs/` stays as large as it is, and an agent listing it still sees dead specs.
- **What survives**: the rule fixes the release's view, not the directory listing. Moving directories would break links, starting with Process-Development-Workflow L221.

## 6. Forks for Peter

### Peter's answers to F-1 to F-4 (recorded by the holder)

**His words, verbatim** (received 2026-11-04T06:03:25Z, `date -u` at receipt in the orchestrator session; relayed by the orchestrator to the holder): "Go with the leans; F-3 tasks.md, F-4 file it."

**What he had read** (the orchestrator's message, quoted here so the mapping can be checked; this text is the orchestrator's, not his): F-1 offered (a) outline plus priorities list or (b) outline only, "Thurgood leans (b)"; F-2 offered (a) at ratification or (b) at 16.3.0's S, "Thurgood leans (a)"; F-3 offered requirements.md started (Thurgood) or tasks.md finished (Leonardo); F-4 offered "File a small record for it, aimed at 129's requirements" or "drop it with a reason"; Additions A and B "for you to confirm (Thurgood's, not your words)"; and "Or tell me to go with the leans, which covers F-1 and F-2 only, since F-3 and F-4 have no recommendation."

**The holder's reading of his words against that text** (a mapping, not his words):
- **F-1 (b)**: the outline line alone. Site 2 is not applied.
- **F-2 (a)**: the first pass runs at ratification.
- **F-3 (b)**: row 16 (128) re-ask is `path:.kiro/specs/131-governance-simplification/tasks.md`.
- **F-4 (a)**: file Sparky's P3 record, as the closing PR's companion, which § 4 item 3 makes the application PR. **Ada owns that record** and may re-rule it under `.kiro/issues/README.md` rule 9; Peter made the call, and the record's owner keeps the right to re-rule it.

**Additions A and B were NOT answered by those words.** "Go with the leans" covered F-1 and F-2 only, as the message he read said, and F-3 and F-4 were answered by name. They were answered later: see the next block.

### Peter's answers to Additions A and B, the list, and the PR shape (recorded by the holder)

**His words, verbatim, item 1** (received 2026-11-04T13:23:25Z, `date -u` at receipt in the orchestrator session; relayed by the orchestrator to the holder): "1. A yes, B yes, approve the list, one PR"

**What he had read before item 1** (the orchestrator's text, not his):
- Addition A: "a spec you've opened that still has no requirements comes back to you after 2 releases".
- Addition B: "a park must name a re-ask event git can see, never 'manual'".
- The one-PR-or-two choice exactly as [THURGOOD R3] named it: "One PR (what Thurgood wrote): fewer PRs …; Two PRs: the rule change lands first …".
- "if you're comfortable approving the cleanup list as it stands (20 close, 3 park, 1 open, each with its reason), say so with your A/B answer and one PR works."

**The holder's mapping of item 1 against that text** (a mapping, not his words):
- **Addition A: adopted.** An `open` row is re-asked once its figure reaches 2 (§ 2, site 1).
- **Addition B: adopted.** A park carries a git-visible re-ask event, never `manual` (§ 2, site 1).
- **The list: approved as it stands.** Appendix B (20 closed, 3 park, 1 open) is the first pass's approved outcome set; row 17's `open` line still waits on its go entry reaching `main`, and rows 10 and 20 carry the inbound pointers below.
- **The PR shape: one application PR** for sites 1, 3, 4 and 5 and the first pass's outcome lines (§ 4 item 2 and 3, as [THURGOOD R3] wrote them). Two PRs is not taken.

**His words, verbatim, items 2 to 4** (same receipt, 2026-11-04T13:23:25Z): "2. Let's create an inbound regarding the protocol for 131 3. Let's create an inbound regarding 113 for 131 4. We can use the inbounds as considerations for our approach rather than direction. They might inform our thinking and direction, but they were developed without the context of where we are now."

**His correction** (received 2026-11-04T13:26:53Z, `date -u` at receipt): "Oh, I confused 131 for 128, sorry. Split them or keep them together as you see fit."

**The orchestrator's reading and the holder's call** (a mapping, not his words): the correction names 131 and 128 as confused but not which of items 2 and 3 it fixes. The orchestrator's reading is that the protocol idea (Appendix B row 20) goes to Spec 131 and 113's idea (row 10) goes to Spec 128, and Peter left the split-or-together call to the holder. The holder keeps them split, two inbounds, each at the spec it is read against:
- `.kiro/specs/131-governance-simplification/inbound-from-thurgood-2026-11-04-agent-interoperability-protocol.md` (row 20);
- `.kiro/specs/128-react-react-native-platform-admission/inbound-from-leonardo-2026-11-04-configure-intake.md` (row 10, kept together as one inbound).

Both are written in their own PRs by other instances, not in this ballot's PR.

**The inbounds are considerations, not direction** (his item 4). They may inform the receiving spec's thinking, and were developed without the context of where the specs now are. Neither inbound re-opens its closed row: rows 10 and 20 stay `closed`, and the closing line points at the inbound as the idea's home.

### The four forks, as decided

- **F-1: where a park lives. DECIDED (b), the outline line alone.**
  - The options were (a) the outline line plus a row in the priorities record's § 7 (which needed site 2, an amendment of ballot E3's header), and (b) the outline line alone, with the table reprinting the park line at every S.
  - (b) was my lean: one home, read by the script, no E3 amendment, one site fewer.
  - What survives: § 7 is the one place Peter already reads for "answered, not now", and parked specs no longer appear there. Parked records do; parked specs do not.
- **F-2: when the first pass runs. DECIDED (a), at ratification.**
  - The options were (a) at ratification and (b) at 16.3.0's S. (a) was my lean: the triage is already prepared, it takes 20 rows off 16.3.0's walk, and it was his question that led here.
  - What survives: it tests the rows outside the release rhythm the RELEASE-FLOW line is written for, so the first real run of site 1's text is still 16.3.0. The first pass's outcome lines reset every remaining figure to 0 before 16.3.0, so 16.3.0's paste can be compared with Appendix B for membership only, not figures (Stacy R1 item 4).
- **F-3: 128's re-ask token (row 16). DECIDED (b), `path:.kiro/specs/131-governance-simplification/tasks.md`.**
  - 128 is re-asked when 131's formalization is done. This was Leonardo's lean; my R1 candidate was `…/requirements.md`.
  - What survives: 128's inbounds have waited since 2026-10-21, and its round opens only after both 129's and 131's formalization. Leonardo reads that as the ruled order, not a defect.
- **F-4: 116's Q5, the drift report (row 12). DECIDED (a), file Sparky's P3 record.**
  - Owner Ada, Sparky consulted, Trigger `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`, in the wording of [SPARKY R1] in § 9. It is filed in the application PR (§ 4 item 3). Q5's drop reason is not written.
  - What survives (Sparky's own point): a record with a spec trigger can idle past 129, so the safety net may stay unbuilt; the mitigation is the trigger plus the health-check walk.

### Additions A and B, as decided (Peter, 2026-11-04T13:23:25Z: "A yes, B yes")

- **Addition A: DECIDED (adopted).** These were Thurgood's additions, not Peter's words; he confirmed them. An `open` row is re-asked once its figure reaches 2.
  - Without a threshold, an opened spec that never formalizes drops out of the ask forever, which is 129's history.
  - It makes the ask set computable from the paste.
- **Addition B: DECIDED (adopted).** A park carries a re-ask event, and that event is one git-visible token, never `manual`.
  - With `manual`, a park is reprinted and never re-asked, which is the same drop-out Addition A exists to prevent (Stacy R1 item 4).
  - Every park in Appendix B meets it.
  - The cost: a park whose real event is not git-visible must name the nearest git-visible event instead. Lina does this for 130, carrying the second event in prose.
  - Leonardo's row-10 alternative, a `manual` park to keep the `configure` idea visible, is moot: Addition B excludes it, and the idea has an inbound at Spec 128 instead.

**Triage owner roster** (Appendix B, from each outline's own lines where it names an owner, otherwise by domain per Agent-Directory). Every row has been read by its owner, or confirmed by Thurgood on his own:

| Owner | Rows |
|---|---|
| Ada | 051, 054, 059 (with Lina), 101, 102, 115, `XXX-android-semantic-token-regeneration`, and the 116 source model |
| Lina | 059 (with Ada), 126, 130 (component), `XXX-stemma-catalog-readiness-audit` (with Thurgood) |
| Leonardo | 100, 113, 128 (adopter front door), and 116 (a product-side read) |
| Sparky | 116 (tooling) |
| Thurgood | 057, 060, 087, 116 (formalization), 119, 125, 128, 129, 130, 131 (formalizer), `XXX-agent-interoperability-protocol`, `XXX-release-system-operations`, `XXX-stemma-catalog-readiness-audit`, `XXX-task-based-conditional-loading` |

Kenya and Data are named on no row.

## 7. Residuals carried (no edit here)

- A spec that starts with inbounds and no outline is invisible to the row.
- The figure resets on any outline edit (§ 2).
- Specs stalled after requirements are not seen (counter-argument 3).
- The row reads tags that exist at run time. A re-run needs the tags fetched. A stray local `v*` tag, or a deleted tag, changes the figure.
- Dead placeholders with no outline are invisible: `056-xcode-mcp-integration` holds only `research.md`, and `120-modal-component` holds only `placeholder.md` (Stacy R1 item 3).
- Nothing records that a batch was put to Peter; only his answers are committed. So "asked and unanswered" cannot be told apart from "not asked". The cost is bounded: such a row is asked again at the next S.
- An outcome line not at column 0 (inside a blockquote or a bullet) reads as no outcome, so its row is re-asked. That fails toward asking (Stacy 2.4).
- Once a spec closes, the table shows no work that has no directory. 115's residual, for example, lives only in its record and the priorities record's rank 4 (Ada R1, row 11).

## 8. Standards notes and follow-ons (no edit in this ballot)

- **The broken `059` pointer**: `src/components/core/Badge-Count-Notification/tokens.ts` L26 cites `.kiro/specs/059-component-color-token-architecture`, which does not exist. **Lina fixes it** in the rename PR of her record `.kiro/issues/2026-10-26-badge-count-notification-tokens-file-misnamed.md` (Trigger `release:16.3.0:phase-1`), and she adds a line to that record naming the fix (Lina R1).
- **`101`'s unticked boxes are bookkeeping.** `completion/task-1-completion.md` says all of parent 1's criteria are met. Ada does not tick the boxes after the fact, and the closing line says so (Ada R1, row 8).
- **`102`'s parent 2 was abandoned.** 11.1.0 was never published or tagged, and 102's work shipped in v11.2.0 (`9f954cf68`). `docs/releases/RELEASE-NOTES-11.1.0.md` is still on `main` and describes a release that never shipped; its body is 101's 11.0.0 summary. That file is the release surface. **Thurgood files a record for it, under rule 10, in the outcome PR**, and does not delete it in this ballot (Ada R1, row 9).
- **`115`'s header pointer**: Ada re-points `src/tokens/ColorTokens.ts`'s header from "Spec 115 Phase B" to `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md`, in her own small PR, and adds a note on the label collision to that record (Ada R1, row 11).
- **The XXX-stemma pointers**: `.kiro/docs/agentic-ui-strategy.md` L241 and L285 cite `XXX-stemma-catalog-readiness-audit/`. The directory stays, so the links resolve and no repoint is needed for the close. If a repoint to `062-stemma-catalog-readiness-audit/` is wanted, the doc names no owner; its last edit was #301 (`efa78aa01`, Thurgood's AG-UI arc). **Thurgood files that as one line under rule 10 in the outcome PR**, naming the editing seat there, since `.kiro/docs/` is outside his standing write scope (Lina R1, row 23).
- **128's outline**: its stale gate Status and the missing no-switch-binding line (Leonardo R1, row 16; Lina R1, row 18) are both fixed by open PR #643, which this ballot does not depend on.

## 9. Review round record

*(Spliced byte for byte by Thurgood, the ballot's holder, 2026-11-04, from the reviewers' scratch files. Reviewers do not write this file. Order: the required reviewer, then the owners in the order their rows first appear.)*

#### [STACY R1]

**Read at**: `ceea9dad9` (PR #644 head), with the repository at `ee31decd3`. Required reviewer and census reader (header "Required reviewer"). This entry checks the written lines and the evidence. It does not re-ask the substance: definition (c) and a row per release are ruled ("Re: Decision 5, for."; "Yes, have Thurgood write the ballot with (c)"). Under my anti-rot clause I say where a line cannot be verified and why; I do not write replacement text. Thurgood writes it.

**What I ran** (all from git objects, nothing written to the repo; scratch under my session scratchpad `b644/`):
- `git show 347d5a1bd:<baseline-snapshot.sh> | bash -s -- 38f4ece47 4d10202b2 2c00cea49 16.2.0`, and the same with `13adf005a 38f4ece47 652074c6b 16.1.0`. Both exited 0 with empty stderr, and both are **byte-identical** to the 16.2.0 record's two generated sections (L50–71 and L75–96 at `ee31decd3`).
- The script with Appendix A inserted at site 3's anchor (after the `row "Native verification"` line). `bash -n` is clean. Block: 27 lines. At the 16.2.0 arguments, the old output is a byte prefix of the new one, and the block sits before the closing blank line and footer. At S = `ee31decd3`: 24 rows, and directory, last-moved SHA and figure match Appendix B on all 24 rows (`diff` empty).
- The script blob is `dc5ed44fb` at `347d5a1bd`, at S `4d10202b2` and at `ee31decd3`.
- Spot-check reads of Appendix B, listed under item 3.

**Verdict: ready with amendments.** One High (item 2.1). Nothing else holds ratification. Peter's two forks are untouched.

---

**1. Census and instruments** → header "Census"; § 3 sites 1 and 3

- **1.1 Both `not in scope` lines are right, and the census is complete.** The lines follow the grammar (`not in scope — <instrument> — <why>`).
  - `scripts/verify-publish-rail.sh` mentions RELEASE-FLOW only in a comment (L30).
  - `scripts/release-publish.ts` mentions it only in comments and log messages (L6, 14, 18, 21, 63, 90, 359, 456, 489, 491).
  - Neither loads the file.
  - I looked for a third registered instrument that loads RELEASE-FLOW or cites it as law, and found none:
    - `122-diff-guard`'s input closure (`diff-guard.ts` L62–72) has no `.kiro/hooks/RELEASE-FLOW.md`.
    - The governance-examples guard's scope is `governance/*.md` plus the steering files in `files[]` (`check.ts` L25–26, L195–214).
    - `edit-kind-pointers.ts` names the path, but its row `dated-pointer-paths` has `check_state: none` and `checks: []`.
    - `release-falsity-floor` cites 3a, but has `checks: []`.
  - For my counting block: this ballot has two `not in scope` lines and no `ran: none; count: no count` exemption.
- **1.2 (Medium) The definition will have two live homes, and neither the census nor the ARMING path list sees them as a pair.**
  - The definition is written in site 1's prose and again in the block's code and comment.
  - `baseline-snapshot.sh` is named in no register row's `checks`, so it is not a registered instrument. A later ballot that changes the definition in RELEASE-FLOW owes no census against the script, and nothing fires.
  - Going the other way, a PR that changes only the script owes a `**Straggler sweep**:` line once site 1 lands (ballots README, "Straggler sweep on an instrument PR"). That line is read at RELEASE phase 1.
  - The script is not on my ARMING instrument-path list. So RELEASE is the only backstop for a weakened block.
  - This is proportionate for a facts-only table that gates nothing. But the pairing is one-way, and it should be stated. Two shapes would close it: give the script a register row, which makes it a registered instrument, or have site 1 name the script as the definition's one home instead of restating it. Which one is Thurgood's call.
- **1.3 What changes in the reads I run.**
  - **Phase 1, 3a** (RELEASE-FLOW step 6 Phase 1: "the walk record (item 3a: its paste, its `main at:` SHA and each row's disposition)"):
    - (i) Site 1 puts the table in the walk's **"At S" section**. RELEASE-FLOW does not define that section. It is a practice: in 16.2.0 it was appended at `95ed466d7` (#636, merged 02:23:16Z). That was after the tag (`v16.2.0` created 01:52:08Z) and after my phase-1 record (#637, merged 02:09:12Z). Site 1 does not say whether phase 1 reads or re-runs this paste. As written, I cannot tell whether it is in my population.
    - (ii) **The rows overlap with the floor's word "rows".** `release-falsity-floor` defines "knows" as "the rows of the release's walk record", and phase 1 reads "each row's disposition". Site 1 says the paste is "facts only" and "no row of it is an `**Open for Peter**:` line". It does not say its rows are not walk rows for M7 or for the disposition read. Rule 11's row test (a line that begins `|` and contains a record's file name) does not collide, because these rows name directories. The floor's test does.
  - **State 2, routed in place** (criterion 2 of the 16.2.0 definition of done):
    - A record routed in place to a spec's `requirements.md`, with Trigger `path:.kiro/specs/<dir>/requirements.md`, never fires if that spec is `closed`. Site 1's `closed` outcome has no clause for root records whose Trigger names the spec's path. After such a close, my state-2 read would accept a route that is dead.
    - Nothing is stranded today: every `closed` candidate in Appendix B reads `Trigger: 0`.
    - Appendix B's Trigger column is the right read. But the column is not carried into site 1's text or into the script's table, so the next close is unguarded.
  - **ARMING**: no change (1.2).

**2. Verifiability of the row** → § 2 "The rule"; § 3 sites 1, 3, 4; Appendix A

- **2.1 (High) The paste cannot be re-checked without knowing whether the release's own tag existed when it ran.**
  - The figure is `git tag --list 'v[0-9]*' --merged S --no-merged c`, which counts a tag that points at S itself.
  - Shown at 16.2.0: the 128 row reads 1, and the one tag it counts is `v16.2.0`, which points at `4d10202b2`. Run before 5.2's tag, every row would read one lower.
  - Phase 1 runs "before the tag", but 16.2.0's "At S" paste was written after it (1.3 (i)). So a pre-tag paste and a post-tag re-run of the same S differ by 1 on every row, and the bytes do not match.
  - The same shift moves the `open` threshold (item 4) by one release.
  - Site 1's "when run at S" does not settle this. The text needs to fix either when the run happens relative to 5.2, or whether a tag at S is counted. Which one is Thurgood's to write.
- **2.2 (Medium) § 2's formula and the block's comment name a different set from the code.**
  - § 2: "the `v*` tags that contain S and do not contain the outline's last-touching commit". The block's comment (Appendix A, "# 11.") says the same.
  - In git's own vocabulary, that is `--contains S --no-contains c`. At `4d10202b2` it gives **0** for `051`, against the code's **50**.
  - The code, and the block's printed `Command:` line, use `--merged S --no-merged c`, which is the releases since `c` up to S.
  - Site 1's text gives no formula, so the law is unaffected. But the comment ships as the reader's definition inside the instrument.
- **2.3 (Low) Two details break byte comparison across machines; the figures are unaffected.**
  - `cut -c1-160` depends on locale and platform. Here, in the default C locale on macOS, `printf 'a—bc' | cut -c1-3` splits the em dash, giving bytes `a 342 200`. Under `en_US.UTF-8` it keeps it. GNU `cut` always counts bytes. Every outcome line carries em dashes, so the "Last outcome line" cell can differ between machines and can end in an invalid byte. RELEASE-FLOW 3a pins `LC_ALL=C sort` for this class of problem (RS-46).
  - `%h` is git's auto-length abbreviation. It is 9 characters today, with about 117k objects, and it grows with the repository. The script's other rows use `--short=9`.
  - The truncation has a second cost. Site 1's park line puts the re-ask event after the reason, so a long reason pushes the event past character 160. The walk author then cannot decide "reprint or ask" from the paste alone.
- **2.4 (Low) An outcome line is read only at column 0.** The block greps `^\*\*Spec outcome (`. Site 1 says "one line", but not column 0, while outlines in this repository often carry status lines in `>` blockquotes or `-` bullets. A misplaced line reads as `none`, so the row is re-asked. That fails toward asking, so it is noise rather than a hidden spec.
- **2.5 Re-running and checking the paste: yes, once 2.1 is settled.** The command is `bash …/baseline-snapshot.sh <prev-S> <S> <walk-start> <V>` from any checkout with tags fetched, then `diff` the "### Waiting specs at S" section, from its heading to the closing blank line before the footer. Three conditions stay with whoever re-runs it:
  - tags must be fetched;
  - a stray local `v*` tag changes figures;
  - a deleted tag changes them too (already a residual in § 7).
  - Nothing records that the batch was put to Peter. Only the answers are committed, as outline lines. So "asked and unanswered" cannot be told apart from "not asked". The cost is bounded: an unanswered row is asked again at the next S, and its figure grows.
- **2.6 The site 4 pin works.** Both 16.2.0-record runs reproduce byte for byte with exactly the pin's command (above). The old script reads no tags, and the blob is unchanged from `347d5a1bd` through S to `ee31decd3`. Two small points:
  - "The newer script prints the same table and then the block" (site 4), and "the table must be byte-identical, followed by the new block" (§ 4 item 2), are true for the table. The footer now comes after the block, so a byte reader should expect the footer to move.
  - "the script's only commit before that ballot" is true at `ee31decd3`. Re-check it at application.

**3. Appendix B evidence** → Appendix B; § 5 counter-argument 3

My sample covered 10 of 24 rows: Thurgood's own rows 3, 5, 13, 14, 22 and 23, plus Ada's 1 and 2, Leonardo's 7 and Ada's 21, and row 17's premise and row 6's L221 pointer. The block columns hold on all 24 (above). The tally holds: closed 17, park 5, open 1, no recommendation 1.

- **Row 3, `057` (Medium): the conclusion holds, but the cited chain does not contain 057's paths.**
  - 057 fixes `src/release-analysis/cli/release-analyze.ts` and its siblings (its outline).
  - Those were deleted on 2026-02-28 by Spec 065 Task 5, commit `9547d2ff4`. After it, `release:analyze` points at `src/tools/release/cli/release-tool.ts`.
  - Q6 item 1 (RATIFIED 2026-08-12) kills `src/tools/release/`, which is 065's replacement. Its kill list names no `src/release-analysis/` path.
  - A reader who checks "superseded by Q6" against Q6's text will not find 057's tool there. The chain is 065 Task 5, then Q6. Row 22 already names both.
- **Row 2, `054`, and counter-argument 3 (Medium): the parent counts are false.**
  - "054a (17 parents open), 054b (32 open), 054d (10)": 054a has 7 of 7 parents ticked (L24–417), and 054b has 6 of 6 (`Task N: … (Parent)` lines L33–536). Their 17 and 32 are unticked success-criteria checklist lines. 054d has 6 of 7 parents ticked (parent 7 open) and 10 unticked lines in total.
  - Counter-argument 3 reads as the population, but it is a sample. A rough parse at `ee31decd3` finds about 38 directories with `requirements.md` and at least one unticked parent-shaped line, `125-A` among them (8 of 9). Many are probably stale boxes.
  - The residual is real, and it is larger than stated.
- **Row 17, `129` (Medium): the "already ruled" premise is not on a committed record.**
  - "Proceed as the team recommends" is committed for 130 (the priorities record § 6, item 2, with the text he read) and for the forks option (b) (the 16.2.0 baseline, "Read with care").
  - I found no committed quote of the 129 text he answered ("129: go", "first draft of its outline round"). I grepped the corpus at `ee31decd3`.
  - Under F-2 (a), the outcome line would quote his words with no committed record of what they answered. That is the shape my standing note warns about: quote only what he read.
- **Rows 16 and 19 (Low):** both rest on "129 → 131 → 128 → 130". The priorities record's § 7 itself labels that order **UNVERIFIED (chat only, 2026-10-24)**, and the rows drop the label.
- **Row 13, `119` (Low): the outline names three pillars, not two.** Its "Pillar mapping" (L28–31) lists 119-A, 119-B and **122** (18 of 18). The conclusion gets stronger. The superseded-by list and the "owner to confirm" question should account for 122, which the outline itself names.
- **Row 14, `125` (Low):** the outline assigns Phase 3 to Spec 123 ("Spec 123 territory", L99, L144). The superseded-by list names only 125-A and 125-B. Its "125-A (8 of 9)" is honest; 125-A is not fully ticked.
- **Rows checked and true:** 1 (052 requirements L6–7 and L13; 9 of 9); 5 (060's three sub-specs at 4/4, 5/5 and 5/5; summaries under `docs/specs/060-custom-agent-system/`; 070 at 6/6; 122 at 18/18); 6's pointer (`governance/Process-Development-Workflow.md` L221); 7 (L3 banner); 21 (no `final-verification/DesignTokens.android.kt` in the tree, and `space_grouped_normal` is still asserted); 22 (its outline audits `src/release/`, deleted by `9547d2ff4`, and 065 plus Q6 are the right chain); 23 (empty `git diff` between the two outlines, and both last moved at `c6a9eeddb`). § 8's `tokens.ts` L26 broken pointer is confirmed.
- **The "eight rows need their owner's call" count is low (Low).**
  - Rows 16, 18, 19 and 20 are parks with "re-ask: owner to name the event". Under site 1's grammar, a park without an event is not a complete outcome, so 12 rows need an owner's act.
  - Of the candidate events, row 16's ("131's requirements being created") and row 18's (128's `design.md`) are expressible as `path:` tokens.
  - Row 4's candidate, "that spec's directory being created" for an unnamed colour-track spec, is not a stable glob.
  - Row 19's ("129's outline round closing") and row 20's have no git-visible token, so `manual` is all that fits. See item 4 for what `manual` does to a park.
- **Self-confirmation (process note, not a finding).** Thurgood drafted and owns 14 rows. My sample is the only independent read of 6 of them. I suggest § 9 record his confirmation of his own rows as his act, so the owner-confirmation step is not taken as two seats' read.
- **Outside the row (Low, a residual to name):** `056-xcode-mcp-integration` (only `research.md`) and `120-modal-component` (only `placeholder.md`) are dead placeholders of the kind Peter asked about. They are invisible because they have no outline. § 7 names only "inbounds and no outline".

**4. Forks F-1, F-2 and the threshold of 2: what each makes checkable** → § 6. I do not pick.

- **F-1 (a), outline line plus a § 7 row.**
  - Two homes for one answer. The script reads only the outline line.
  - The § 7 row is reprinted by the walk from the priorities record, and its leave condition ("when the event fires or he rules again") has no instrument.
  - A park written in one home and not the other is visible only to someone who reads both, and no reader is named for that.
  - It adds a LAW site, E3's header, to verify at application.
  - Gain: § 7 stays Peter's one complete "answered, not now" list.
- **F-1 (b), the outline line alone.**
  - One home. The script reads it, and the paste carries it at every S. The decision is checkable from the paste and the outline, subject to 2.3's truncation.
  - Loss: parked specs leave § 7, so Peter reads two blocks of the same walk record (the deferrals block and the waiting table) to see every "not now".
- **F-2 (a), at ratification.**
  - The batch's input is pinned evidence (Appendix B at `ee31decd3`), with differences listed at the base (§ 4 item 2). The answers land as one reviewable diff.
  - It does not exercise site 1's paste-and-reprint text, which first runs at 16.3.0 either way.
  - Its outcome lines reset every remaining figure to 0 before 16.3.0. So 16.3.0's paste can be compared with Appendix B for membership only, not for figures.
- **F-2 (b), at 16.3.0's S.**
  - The first run exercises site 1 as written, so the first instance checks the law.
  - Appendix B's evidence ages, though its SHA pin keeps a row-for-row diff possible. About 23 rows land in a walk that already carries the floor batch.
- **The threshold of 2 for `open` ("Not a fork, my choice").**
  - It makes the ask set computable from the paste: rows with no outcome line, `open` rows at 2 or more, and `park` rows whose event has fired.
  - Without it, an opened spec that never formalizes is never re-asked, which is 129's history, and that absence is not checkable as a failure.
  - Its meaning moves by one release with 2.1. Run after the tag, an `open` written in release N's window is re-asked at N+1. Run before the tag, at N+2.
  - **The same drop-out reaches parks through `manual`.** Site 1 allows any rule-1 token, and "the walk author reads whether it has fired". A `manual` re-ask has no git-visible firing, so the park is reprinted and never re-asked. That is the failure the threshold exists to prevent, arriving for parks. Rows 19 and 20 are likely first instances.
  - Whether parks also get a threshold, or `manual` is excluded, is a choice for Thurgood to surface and Peter to make.
- **Lines Peter ratifies beyond the text he read.** The text he read was "open it, park it with a reason, or close it". Two written lines go further: the `open` threshold, and the mandatory re-ask event on a park. Ratifying the written lines covers both, and both are visible in § 2, site 1 and § 6. I suggest they be named to him when F-1 and F-2 go to him, so that he ratifies lines he has read. That is not a re-ask of Decision 5.

**5. The `**Open for Peter**:` line** → PR #644 body; Task-Completion-Protocol § "Branch and PR Conventions"

- **The form is correct.**
  - The line begins `**Open for Peter**:`.
  - It states both questions and points at § 6. A pointer counts as asking, and this line does both.
  - It says the PR is not merged before his answers are on record.
- **Owed before merge:** the protocol also needs the body to **cite** his dated answer, not only the ballot's Status commit (§ 4 item 1). That is an act for later, not a defect now.
- **(Low) The `**Consulted**:` line reads "none yet".**
  - The PR touches a trigger surface (`.kiro/docs/ballots/**`), so the line must take one of the two Agent-Directory forms: `<Agent> — <read>` pairs, or `none needed — <reason>`.
  - It should carry the owners' and my reads once they are in.
  - I count it in my counting block's consult-line item (presence and grammar).
- The `**Edit kind**:` reading is correct. `.kiro/docs/ballots/**` is not one of the edit-kind governance paths (ballots README § "When a governance edit needs a ballot — three kinds"), and the Amends list carries the kinds of the edits it proposes.

#### [ADA R1]

Owner confirmation of my Appendix B rows, read at `ceea9dad9`, evidence checked against the repo at `ee31decd3`. Eight rows are mine (1, 2, 4, 8, 9, 11, 12 source-model half, 21). Two change outcome or reason (4, 9); one needs a corrected closing line to stay true (11).

- **Row 1, `051-semantic-token-naming-restructure`: confirmed, closed — superseded by `.kiro/specs/052-semantic-token-naming-implementation/`.** 052's tasks.md has 9 of 9 parents ticked and no unticked parent; 052's requirements L6–7 and L13 cite 051's outline as its "Design Authority". The outline stays where it is for that citation.
- **Row 2, `054-figma-console-mcp-integration`: confirmed, closed — superseded by 054a–054d.** The code shipped: `src/figma/` (TokenSyncWorkflow, DesignExtractor, TokenTranslator, VariantAnalyzer) and `figma:push` and `figma:extract` in package.json. **Correction to § 5 counter-argument 3 and to this row's evidence**: "054a 17, 054b 32, 054d 10 unticked parents" counts unticked checkbox lines of any depth, and nearly all of them are success-criteria and test bullets. The parents are ticked (054a 7 of 7 numbered parents; 054b and 054d use "Task N" lines, all ticked). The one real unticked parent is 054d's "7. Expand node extraction to capture full design properties". The § 5 text should say "054d has one unticked parent and 58 unticked criteria bullets across 054a, 054b and 054d". It does not change the row.
- **Row 4, `059-component-color-token-investigation` (with Lina; Lina decides the component half): changed from park to closed — answered by `governance/Token-Governance.md` L160 and L556.** Those lines state it as law: `defineComponentTokens` takes numeric families only, "there is no color family, so a component's colors are not component tokens", and a component's colours reference semantic tokens (Avatar, Badge-Count-Notification). That is the outline's own "Recommendation" (do not extend the API unless a use case cannot be a semantic token), and I find no record naming such a use case. `src/build/tokens/defineComponentTokens.ts` still has no colour handling, so the gap stands by design. Park's re-ask event would be "the colour-track spec's directory exists", and the colour-track record (`2026-09-12-spec-115-phase-b-colortokens-deletion.md`) does not carry this question, so a park would point at an event that cannot answer it. **What survives (fork, Lina's call)**: the outline's "potential YES" case (theme-specific component overrides) is untested, and Spec 129's theme-emission work may meet it. If Lina wants it kept, the row is **park**, Trigger token `manual`, event "a component needs a colour that no semantic token can express". **Pointer defect to fix whatever the outcome**: `Badge-Count-Notification/tokens.ts` cites `.kiro/specs/059-component-color-token-architecture`, which does not exist; the directory is `059-component-color-token-investigation`. That is Lina's file, already in her record `2026-10-26-badge-count-notification-tokens-file-misnamed.md`, so it rides her rename PR.
- **Row 8, `101-package-publish-readiness`: confirmed, closed — carried out (v11.0.0 published, tag `v11.0.0`).** The unticked parent 1 is a bookkeeping gap, not unfinished work: `completion/task-1-completion.md` (2026-05-06) says "All 7 Parent 1 Success Criteria are met" and lists the commits; its subtasks 1.1, 1.2, 1.6, 1.7, 1.8, 2.1–2.4 are also left unticked although their completion docs exist (1.1–1.8, 2.1–2.5) and parent 2 is ticked. Nothing is pending. I propose the closing line says "unticked boxes in tasks.md are not pending work; `completion/task-1-completion.md` is the record" and that I do **not** tick the boxes after the fact. The row does not change.
- **Row 9, `102-consumer-onboarding-completion`: changed — closed, but the candidate's reason is wrong.** What happened to 11.1.0: parent 1 completed (`f37bc28de`) and the version bump (2.2) landed (`2943f54f6`), and `docs/releases/RELEASE-NOTES-11.1.0.md` was generated (2.3; the file was last touched by Spec 103's commit `34b26b5a9`). Then Spec 103 shipped, and Peter released **v11.2.0** (`9f954cf68`, `package.json` 11.2.0). Both 102 commits are ancestors of `v11.2.0`, so 102's work shipped under 11.2.0 and **11.1.0 was never published, tagged or verified**. Parent 2's 2.4–2.7 (publish, fresh-repo verification, tag, completion docs) never ran, and there is no `task-2-completion.md`. It is not "superseded by Spec 123": 123 came months later. **Proposed closing line**: "closed — Parent 1 carried out and shipped in v11.2.0 (`9f954cf68`); Parent 2 (publish 11.1.0) was never run, the 11.1.0 version was skipped, and its fresh-repo verification of the five gaps was not done under this spec". **Flag for Peter**: `docs/releases/RELEASE-NOTES-11.1.0.md` is still on `main` and describes a release that never shipped (its body is Spec 101's 11.0.0 summary). That file is Thurgood's/release surface, not mine; it deserves a record or a dated note, not a deletion in this ballot. The row's outcome (closed) does not change; the unticked parent is a true abandonment, not bookkeeping, and the closing line must say so.
- **Row 11, `115-post-oklch-stabilization-cleanup`: confirmed closed, with a corrected closing line; the close does not orphan the residual.** Phases B (Sparky, Impeccable OKLCH) and C (Thurgood, docs) have `Status: Complete` completion docs. **But Phase A did not carry out its first scope item**: the outline's Phase A says "Delete/replace `src/tokens/ColorTokens.ts`", and `completion/phase-a-completion.md` § 3 says "File cannot be deleted yet". The file still exists, and its header says "Spec 115 Phase B will remove". The record `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md` borrows the label "Phase B" for that deferred Phase A item; in 115's own outline Phase B is the Impeccable phase. So "phases A–C carried out" is false in one part. **Proposed closing line**: "closed — phases A–C carried out except Phase A's deletion of `src/tokens/ColorTokens.ts`, deferred in `completion/phase-a-completion.md` § 3 and carried by `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md` (Trigger `manual`, folded into the colour-track spec, priorities record § 3.4)". The record is chartered on its own authority (Peter, 2026-10-20, "agreed"), has owner and trigger, and cites no 115 path as a dependency, so closing the outline orphans nothing. **Follow-up I owe (my scope)**: one small PR to re-point the `ColorTokens.ts` header from "Spec 115 Phase B" to that record and add a one-line note to the record on the label collision. **What survives**: once 115 leaves the table, no directory shows the colour-track work (it has none), so the table cannot remind anyone of it; it lives in the priorities record's rank 4 only.
- **Row 12 (116, source-model half; Sparky and Thurgood hold the tooling and formalization halves): closed for my half — answered by Spec 123 Model B.** The outline's Q3 ("protecting additions to package-shipped source files; may be a token-architecture question") is moot: Requirement 5.8 in `.kiro/specs/123-consumer-distribution/requirements.md` L197 says "`sync` SHALL NOT modify the consumer's token tier" (Peter, 2026-09-26), and `src/cli/sync/index.ts` L7 and `FileScanner.ts` L7 never scan or write `src/tokens`. The consumer's token source is theirs from birth, so a promotion can no longer be overwritten. **Evidence that the rest is also answered, for the other seats to confirm**: Q1 and Q2 (safe non-TTY apply; reset gating): `--force` and `--accept-all` are retired, `--apply` applies off a terminal, and a conflict applies only with `--overwrite <path>` (`src/cli/sync/Reporter.ts` L79, `index.ts` L279); Q6 (CI guidance): `governance/DesignerPunk-Integration-Guide.md` L1084 now says the flags are retired. I did **not** verify Q4 (first-sync bootstrap) or Q5 (a drift report); those are Sparky's and Thurgood's. My recommendation for the whole row is **closed — superseded by Spec 123 Requirement 5 (Model B)**, provided Sparky or Thurgood confirm Q4 and Q5, otherwise park on those two alone.
- **Row 21, `XXX-android-semantic-token-regeneration`: confirmed, closed — the premise is gone.** The outline's problem was a committed stale `final-verification/DesignTokens.android.kt`; that path no longer exists, and generated output goes to the git-ignored `dist/`. The generator does emit the semantic tokens: the Android file built on 2026-10-03 carries `space_grouped_*` and 58 `color_*` vals, and I ran `src/__tests__/integration/SemanticTokenGeneration.test.ts` at `ee31decd3` (19 of 19 passing, including the `space_grouped_normal` assertions). **What survives, and is not this spec's**: theme-varying semantic colours are not emitted on Android or iOS, which is Spec 129's (token-governance § Theme Registry; `2026-10-26-ios-designtokens-members-not-public.md`). The closing line should name 129 for that so the closed outline does not read as "Android semantic output is complete".

**Tally for my rows**: confirmed unchanged 1, 2, 8, 21; closing line corrected 11; changed 4 (park to closed, Lina decides), 9 (reason corrected); 12 (source-model half) closed. **For Peter**: (a) § 5 counter-argument 3's "17, 32 and 10 unticked parents" is a miscount of checkbox lines, and the table is simpler than that text says; (b) `RELEASE-NOTES-11.1.0.md` describes an unshipped release; (c) closing 115 and 21 each needs a line naming the surviving residual (`ColorTokens.ts` deletion; theme-varying output in 129).

#### [LINA R1]

Owner confirmation of my four Appendix B rows (rows 4, 15, 18, 23), read at `ceea9dad9` and checked against the repo at `ee31decd3`. Nothing was edited.

- **Row 4, `059-component-color-token-investigation`, with Ada: CHANGE to closed.** Superseded by `governance/Token-Governance.md` L160, L556 and L580, which already answer its question: `defineComponentTokens` takes numeric families only, "there is no color family, so a component's colors are not component tokens", and a component's colours reference semantic tokens directly (Avatar's `avatar.tokens.ts` L167–195 and `Badge-Count-Notification/tokens.ts` do exactly this).
  - **Why not park:** the outline's own "Next Steps" says to close it as "Not Needed" if no use case emerges, and none has in 48 releases (`src/build/tokens/defineComponentTokens.ts` `baseValue: number` at L67 stands, and nothing needs it to change). The colour-track spec (priorities record § 3.4) folds in blend/OKLCH, the 115-B `colorTokens` deletion, rgba cleanup and shadow-OKLCH. None of those is this question, so parking it behind that spec ties it to an event that doesn't bear on it. Also, that spec has no directory yet, so a `path:` re-ask would fire on something unrelated.
  - **Survives:** a component that someday needs a colour no semantic token can express would need an API extension. That is a new need and a new spec, not this outline. Ada confirms the API-side reading (her domain). Evidence checked: the outline's Decision Log has one row (2026-02-06); the directory holds only the outline. Directory stays, no link breaks.
  - **Pointer defect (row 4's evidence note):** the broken `059-component-color-token-architecture` path in `Badge-Count-Notification/tokens.ts` L26 is mine. See the last bullet.

- **Row 15, `126-avatar-decorative-warn`: CONFIRM closed — carried out (Task 1, 2026-07-15, #81).** Checked: `Avatar.web.ts` L723 reads `type === 'human' && src && alt == null && !decorative`, exactly the ratified O2 condition; `completion/task-1-completion.md` exists (Lina, 2026-07-15); `Avatar.accessibility.test.ts` and `Avatar.test.ts` carry the decorative cases (44 and 43 matches). The outline's own Status line already says IMPLEMENTED, so the closed line only formalises it. Web-only by the outline's scope; iOS and Android collapse empty→absent as the outline records, with no warning to fix. Nothing for Peter beyond the closed line. It is the shape the rule will meet again: a spec whose outline was the implementation spec, so it never gets a `requirements.md`.

- **Row 18, `130-input-switch-base`: CONFIRM park, with the event changed in form; consistent with Peter's "Not now" (priorities record § 6.2, line 87).**
  - **Consistency:** the park's reason is his "Not now", and the re-ask is built from the two events § 3.3 already names (128's first binding; a second screen needing a switch). § 3.3 and § 6.2 say "still pulled forward just in time", so the park adds no new ruling.
  - **Re-ask event:** `path:.kiro/specs/128-react-react-native-platform-admission/design.md`, the first commit that adds 128's design. It is git-visible and the nearest thing to "128's first binding" that a token can express, since a binding is designed there before it is built (130 outline § 7.3, P-8). The second § 3.3 event, a second screen needing a switch, is not git-visible, and a park takes one token. I would carry it in prose on the line and I will watch for it as G1's owner (the gaps record's G1 trigger). Peter should know that the park is only as good as the one path event.
  - **Gap Peter should know:** 130 outline § 7.3 (P-8) wants 128's STUB to carry "no settings-toggle binding before 130 merges". At `ee31decd3`, `128-…/design-outline.md` has no line naming 130 or a switch (grep of `130|switch` is empty). The guard against binding the placeholder is therefore only in 130's outline and G1's third trigger, both unread by 128. The park line does not fix that. Whether 128's refresh (#643) added it, I haven't checked; Thurgood, as formalizer of both, should.
  - **Tension in the order:** 129 → 131 → 128 → 130 ranks 130 after 128, while § 3.3 pulls 130 forward on 128's binding. That is consistent only if 128's design is where the pull-forward is noticed, which is why I chose `design.md` and not `requirements.md`.
  - **Against "don't refresh it":** the park line is an edit to 130's outline, so it resets the row's figure to 0 (ballot § 2). A one-line outcome is not the content refresh Peter ruled out, since the outline body does not change. The ballot should say that in its wording or Peter will read "park" as contradicting "don't refresh".

- **Row 23, `XXX-stemma-catalog-readiness-audit`, with Thurgood: CONFIRM closed — duplicate of `062-stemma-catalog-readiness-audit`.** Verified: `diff` of the two `design-outline.md` files is empty; 062 holds requirements, design, tasks, findings and completion, and its three parents are ticked (tasks.md L20, L77, L133). Two paths in `.kiro/docs/agentic-ui-strategy.md` (L241 and L285) cite the XXX path, so the directory must stay where it is, as the rule says. Those two citations should be repointed to 062 in a later PR; the file is outside my write scope, so I flag it for whoever owns that doc. 062's outline also says `Scope: XXX-stemma-catalog-readiness-audit`, left as it is.

- **`Badge-Count-Notification/tokens.ts` L26 (`@see .kiro/specs/059-component-color-token-architecture`): I will fix it, in the PR that already owns that file.** That is the rename PR for `.kiro/issues/2026-10-26-badge-count-notification-tokens-file-misnamed.md` (Trigger `release:16.3.0:phase-1`, fix-now by 16.3.0's S): the file is renamed there and its header comments are touched anyway. The right target is `.kiro/specs/059-component-color-token-investigation` (or `governance/Token-Governance.md` § on the colour reference map, if row 4 closes as I recommend, since that is where the decision lives now). I will add one line to that record naming the fix, so the PR body cites it. Checked: it is the only `059-component-color-token-architecture` string in the repo, and the other three `@see` paths in the header (034, 044, 046) all resolve. No edit now, and it needs no PR of its own.

#### [LEONARDO R1]

Read at `ceea9dad9`, Appendix B, rows 7, 10, 16 and 12. Evidence re-checked against `main` at `ee31decd3`. Nothing below was edited in the repo.

- **Row 7, `100-design-critique-integration`**: **confirm — closed, superseded by `.kiro/specs/107-design-language-context/`.**
  - The outline's own banner (2026-05-16) says "subsumed by Spec 107".
  - The capability it asked for exists: `.claude/skills/impeccable/SKILL.md` L184 lists `critique` as a command, and the Application MCP serves the design-language tools (Task 3, ticked).
  - Nothing outside the directory and 107's `completion/task-6-2-completion.md` cites it, so closing breaks no link.
  - **For Peter**: 107's `tasks.md` leaves parents 4, 5 and 6 unticked, and `completion/task-4-completion.md`, `task-5-completion.md` and `task-6-completion.md` exist. It is the same pattern the ballot flags for 101 and 102. 107 holds requirements, so it is not a row and this closing does not depend on it. I will check those boxes against their completion docs as the owner of the skill (parent 5), not in this ballot.

- **Row 10, `113-onboarding-cli-workflows`**: **confirm the candidate — closed, superseded in part by Spec 123 § 3.6; park is the wrong shape.**
  - The philosophy shipped: "teach by playing" and "every customization goes through the spec process" became 123's R6, and `src/cli/templates/starter-specs/` holds `ci-needs` and `regrounding`.
  - The unbuilt part is a `configure` verb and a designer-facing category intake. There is no `configure` in `src/cli/`.
  - **Correction to the ballot's and the outline's pointer**: the outline names the Integration Guide designer-friendly rewrite charter as the "nearest living home". That charter is CLOSED (2026-10-25, my close, `#440`/`#442`; now in `archive/`). It is no longer a living home. The closing line should say the rewrite shipped as the `## Walkthroughs` layer.
  - The residual, a state-aware re-runnable `configure`, is an idea with no owner and no trigger. A park would need a rule-1 token, and none is honest here. I recommend closing with the residual written into the outline line ("not built, no home; re-file as a fresh outline if wanted"). The directory stays.
  - Counter-argument that survives: closing hides an unbuilt designer-intake idea from the table. The table is the only place that idea would otherwise be re-asked. The alternative is a park with re-ask `manual`, which the grammar allows only as an owner-read event. **Fork for Peter if he wants the idea kept visible.** I do not need it kept: Spec 128's init-platform intake and the third starter spec are the likelier vehicles.

- **Row 16, `128-react-react-native-platform-admission`**: **confirm park, but the re-ask token needs a pick, and the reason line must be corrected.**
  - The reason fits Peter's ruled order 129 → 131 → 128 → 130 (priorities record, 2026-10-24).
  - **#643 is neutral to this row.** It resets the counter to 0, and the park line (another outline edit) resets it again. After this, the figure reads "releases since parked", as § 2 says.
  - **Stale fact in the outline's Status line**: it still reads "STUB — do not formalize until the v15.0.0 tag is cut AND the parity required-flip has merged". Tag `v15.0.0` exists, so the gate has fired. The park reason must not rest on that line, and #643 or the park PR should touch it.
  - **Candidate event "131's requirements being created"** fits the order, but only weakly.
    - It is a real rule-1 token: `path:.kiro/specs/131-governance-simplification/requirements.md`.
    - It fires when 131 **starts** formalizing, not when 131 is done. Peter said 128 goes "immediately after" 131 in priority. Thurgood is the formalizer of 129, 131, 128 and 130 alike, so what the order protects is his attention.
    - **My pick: `path:.kiro/specs/131-governance-simplification/tasks.md`**, which fires when 131's formalization is finished. 131's execution then waits on Peter's release PRs (131 outline § 7), not on the formalizer.
  - **Fork for Peter (not mine to pick)**: requirements.md (128 re-asked early, while 131 is still being written) or tasks.md (late). The two readings of "after 131" are both defensible. I recorded the second as my lean only. Counter-argument that survives: the 128 inbounds (user stories, G-4 gate row) have been waiting since 2026-10-21, and a late event means 128's outline round opens only after both 129's and 131's formalization. That is the ruled order, so I do not treat it as a defect.
  - The charter's own `manual` Trigger is a separate root record. It stays and is untouched by this row.

- **Row 12, `116-sync-customization-safety`** (co-owned by Ada, Sparky and Thurgood; my read is product-side only): **my read is "substantially superseded", leaning closed, with one possible residual. Sparky and Ada have NOT been consulted.**
  - What the repo shows:
    - The incident's cause was `sync` overwriting the consumer's local token source, together with an unrequested `--accept-all` reset.
    - `src/cli/sync/Reporter.ts` L79 and `index.ts` L279 now say `--force` / `--accept-all` are retired. A conflict applies only with `--overwrite <path>`. A deleted generated file comes back only with `--restore <path>`. Non-TTY runs report and do not apply without `--apply`. That answers 116's open questions 1 and 2.
    - Spec 123's Model B makes the consumer's token tier theirs wholesale from `init` (123 design-outline R3 re-disposition, `tokenSource: './src/tokens'` stays). Requirements 5 and 7 are "report, never silently overwrite" and "treat overwrite of a personalized artifact as destructive". That dissolves question 3.
    - `src/cli/sync/Migration.ts` compares "against SHIPPED content, never the first-sync baseline", and `Manifest.ts` L122–123 says a corrupt manifest is never treated as a first sync. That answers question 4.
    - The Integration Guide line at L1084 reverses the old `--accept-all` CI advice, which was question 6.
  - What I could not confirm: question 5, a **drift report** (tokens added, removed or renamed since the last run). I found no sign of one. If Sparky or Ada says it is still wanted, it should be a new record or outline, not a reason to keep 116 open.
  - I am not the right voice for whether the settled diagnosis and the source model are fully answered. **Sparky's read is needed before Peter sees this row**: the tooling check is his, and the source-model check is Ada's. I ask for both before it is batched. Otherwise the row reaches Peter as "closed — superseded by 123 sync work" on my evidence alone. Spec 117's outline marks 116 as "decoupled", which does not bear on this either way.

#### [SPARKY R1]

**Row 12 (Spec 116, sync customization safety), tooling read.** Read at `ceea9dad9` against `src/cli/sync/` and the Integration Guide as they stand on this branch's base. I read source and docs; I did not run the CLI. Per-question state:

- **Q1 (safe non-TTY apply mode): ANSWERED.** The outline's explicit-flag option shipped. Off a terminal, `sync` reports and writes nothing unless `--apply` is passed (`src/cli/sync/index.ts` header and L688, L772-775: `OFF_TTY_REPORT_ONLY_MESSAGE`). With `--apply`, new and updated-safe items apply, and conflicts and deleted files are skipped and counted ("N conflicts left as you have them (per path: --overwrite <path>)", L757-761). A CI consumer can act on the skipped list.
- **Q2 (reset capability: keep, gate or split): ANSWERED, by removal.** `--force` and `--accept-all` are parsed only to set `retiredForce` (L279), which is reported and not honored. The only way to take the package's version of a conflict is `--overwrite <path>`, and the only way to bring back a deleted file is `--restore <path>`. There is no bulk reset. This is a fourth option the outline did not list: keep the per-path destructive act, retire the bulk one. The Guide (L1080-1084) says so.
- **Q3 (protect additions to package-shipped source files): SUPERSEDED.** Model B makes the token tier consumer-owned. The `sync` header (Req 5.8) says `src/tokens`, `src/types` and the pre-123 component copies are "never scanned for reconciliation, never written", and old manifest entries for them are pruned. The failure the outline diagnosed can no longer happen, because `sync` has no write path to that file. This is the architecture answer; Ada's source-model input was settled in Spec 123, not here.
- **Q4 (first-sync reconciliation): SUPERSEDED.** `Classifier.ts` L140 turns a first encounter into a `conflict` ("no sync history"), reported and never applied. The 123 design (§ L381) judges "unmodified" against shipped content and never against the first-sync baseline. Migration compares the same way. The silent-baseline hole is closed on both of the paths I read.
- **Q5 (drift visibility): STILL OPEN, narrowed, and I think it is the only open one.** `grep` finds no tokens-added/removed/changed report in `generate` or `sync` (`src/cli/designerpunk.ts`, `staleness.ts`, `generateProductTokens.ts` print counts and "up-to-date" only). One slice exists: `NameContract.ts` makes `sync` report, and never write, a semantic or primitive token name that a shipped component references and the consumer's generated `DesignTokens.web.css` does not define (INSTALL § 5). It is web-only, never covers component tokens, and does not cover the consumer's own CSS references, which was the incident's actual failure. Spec 117's outline withdrew the "unify with 116 Q5" framing (§ L131: "NOT a cross-cutting drift framework"), so 117's check covers pipeline reproducibility in this repo, not a consumer-facing report. So no live spec or record owns Q5.
- **Q6 (CI/non-TTY guidance, ballot measure): ANSWERED.** `governance/DesignerPunk-Integration-Guide.md` L1100-1103 now says "Off a terminal, `sync` reports and writes nothing unless you pass `--apply`", with conflicts and deletes needing per-path flags. L1084 states the retirement. The old "use `--accept-all` in CI" line is gone from that Guide.

**Recommendation: close**, on the condition that the closing PR also files the Q5 record below, so closing does not drop it. Reason for the record: Q1-Q4 and Q6 are answered or superseded by Spec 123's sync work (flags retired, `--apply` / `--overwrite` / `--restore`, Model B, shipped-content comparison, Guide reversed). Only Q5 is unbuilt, and the outline already framed it as optional ("a safety net even if the apply-mode work is staged"). Parking the whole spec for one optional question ties a 6-question outline, written for a mechanism that no longer exists, to a question that stands without it. I agree with Leonardo's read; his list matches what I found in source.

**Q5 record to file (wording is a proposal, not filed):** a P3 obligation record, "Consumers get no report of what an upgrade changed in their generated token output". Content: after `npm update`, `generate` can change values silently because the palette, theme override maps, motion, layering and icon-size values come from the package (INSTALL § 4; `2026-10-15-123-palette-read-from-package.md`). `NameContract` covers only missing referenced names. The question to the owner is whether a `generate`-time diff of token names and values against the last run is wanted. Owner: Ada (generate output), Sparky consulted for the CLI surface. Trigger: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`, because 129 changes what `generate` reads from the package and is where the palette record already folds in. Failing that, the release token. I would not put it in Spec 123's residual list: that spec is closed.

**Counter-argument I ran against "close", and what survives.** Folded in: first I considered "park, trigger 129", but a parked spec keeps a stale design outline whose Q1-Q4 a later reader would take as open; closing plus a narrow record is cleaner. What survives, and it is a fork rather than something I can absorb: (a) a record needs an owner to act on its trigger, and records with a spec trigger have idled before, so Q5 could sit unbuilt past 129; the cost is that the safety net the incident was about stays missing, and the mitigation is the trigger plus the health-check walk. (b) I have not checked whether Peter still wants Q5 at all. Under Model B the original incident's cause is gone, so Q5 is now a convenience, and "drop it with a reason" is as defensible as "record it". Whether to file the record or drop Q5 is Peter's and Ada's call. I lean to filing it only because it costs one short file. (c) Not verified: I did not run `sync` against a non-TTY fixture, and I did not read the `sync.*` test files for coverage of the `--apply` / conflict-skip behavior. If anyone wants "answered" to rest on a test and not on source, that read is still owed.

#### [THURGOOD R2]

Incorporation notes, item by item. The five entries above are unchanged. Woven means the text now carries the change; it is not appended.

- **STACY R1 2.1 (High), the tag at S**: woven. The figure now leaves out a tag at S (`--no-contains S`), so a paste made before step 5.2's tag and one made after it are byte-identical. Tested at `4d10202b2`: 128 reads 0 and 051 reads 49. At `ee31decd3`, where no tag points at S, nothing changes. → § 2, site 1, Appendix A, § 4 item 2.
- **STACY R1 2.2 (Medium), the reversed formula**: woven. § 2 now gives the reachability set and the exact command. The block's comment no longer restates the definition, and points at site 1 instead. → § 2, Appendix A.
- **STACY R1 2.3 (Low), `cut -c` and `%h`**: woven, by removing the truncation. Outcome lines print whole, with `|` escaped, and abbreviations use `--short=9`. The park form now puts the re-ask event first, so the walk author reads it at the start of the line. → site 1, site 3, Appendix A.
- **STACY R1 2.4 (Low), column 0**: site 1 says column 0, and § 7 names the fail-toward-asking residual.
- **STACY R1 1.2 (Medium), two homes**: woven, in the smallest form. Site 1 is the definition's one home. The block implements it without restating it, and a change to site 1's definition changes the block in the same PR. A script-only change already owes the straggler sweep. I did not take a register row: it would make the script a registered instrument for a table that gates nothing. → site 1, site 3.
- **STACY R1 1.3 (i), phase-1 population**: site 1 now says the paste is not in phase 1's population. Phase 1 neither reads nor re-runs it, and the monthly walk reads that the paste is present. Once 2.1 is fixed, the paste's timing relative to the tag no longer matters.
- **STACY R1 1.3 (ii), walk rows and routed records**: woven. The paste's rows are not walk rows for M7 or for the disposition read. A `closed` line's PR pastes E2's grep, and every hit whose Trigger names the spec's path is re-ruled by its owner in that PR. Appendix B's closed rows all read Trigger 0. → § 2, site 1.
- **STACY R1 2.5 and 2.6**: § 7 adds the fetched-tags condition and the "asked and unanswered" residual. Site 4 says the footer moves below the block, and that "only commit" is re-checked at application.
- **STACY R1 item 3, Appendix B**:
  - Row 3's chain now runs Spec 065 Task 5 (`9547d2ff4`), then Q6.
  - Counter-argument 3 corrected: only 054d Task 7 is an unticked parent, and the list is a sample of about 38.
  - Row 13 adds Spec 122, and row 14 adds Spec 123's Phase 3.
  - Rows 16 and 19 carry the UNVERIFIED label.
  - Row 17 now cites Peter's go entry and the text he answered, `task/129-outline-r1` @ `f85d54fcc`. Its outcome line is written only once that entry is on `main`.
  - § 7 adds `056` and `120`.
- **STACY R1, twelve owner calls, not eight, and four parks without an event**: resolved.
  - Every row now has its owner's R1 read, or my confirmation of my own rows as my act.
  - 059 and `XXX-agent-interoperability-protocol` became closed.
  - The three remaining parks each name a git-visible token: 130 Lina's, 131 mine, and 128 one of two (F-3).
- **STACY R1, my own rows**: recorded as my own act in each row's "R1 read". § 5 counter-argument 5 says which six of my 14 rows she sampled.
- **STACY R1 item 4, lines beyond what Peter read**: the `open` threshold is now Addition A, and the git-visible re-ask event is Addition B. Both are named in § 2 and § 6 for his confirmation, as Thurgood's additions and not his words. Addition B also closes her `manual` drop-out point.
- **STACY R1 item 5, the Consulted line**: the header and the PR body now name all five.
- **ADA R1**:
  - Rows 1, 2, 8 and 21 confirmed. Row 21's line names the residual that stays with 129.
  - Row 4 changed to closed, which Lina confirms.
  - Row 9 now reads "abandoned in part", her line verbatim in substance; `RELEASE-NOTES-11.1.0.md` goes to § 8 as a record I file.
  - Row 11's closing line is hers.
  - Row 12's source-model half closes on 123 Req 5.8.
  - Counter-argument 3's counts corrected.
  - Her `ColorTokens.ts` header follow-up is in § 8.
- **LINA R1**:
  - Rows 4 and 15 confirmed as closed.
  - Row 18's park takes her `path:` token, with the second event in prose. Her point that a park is not a refresh is woven into § 2 and site 1.
  - Row 23 confirmed. The directory stays, and § 8 names who files the repoint.
  - The `tokens.ts` L26 fix rides her rename PR.
  - Her no-switch-binding gap: #643 (open) adds that line to 128's outline. That PR is mine, so the gap is closed there.
- **LEONARDO R1**:
  - Row 7 confirmed.
  - Row 10's line carries the residual. The wrong "nearest living home" pointer is corrected to the closed charter and the shipped `## Walkthroughs`.
  - Row 16: park confirmed, and his token becomes fork F-3, against mine.
  - The stale 128 Status is #643's.
  - Row 12: his read is recorded.
  - His row 10 alternative, a `manual` park to keep the `configure` idea visible, is not offered. Addition B excludes `manual`, and he does not need it kept. If Peter wants it kept, he can say so on row 10.
  - 107's boxes are his follow-up.
- **SPARKY R1**: row 12 becomes closed on his question-by-question read. Q5 becomes fork F-4: file his P3 record or drop Q5 with a reason, which is Peter's and Ada's call. His unverified items, the CLI not run and the `sync.*` tests not read, are carried in his entry. Row 12 rests on reading the source.
- **Not taken**: none of the five entries asked for something I declined.

#### [THURGOOD R3]

Folding Peter's answers to F-1 to F-4 (verbatim in § 6, received 2026-11-04T06:03:25Z). The entries above, including [THURGOOD R2], are unchanged.

- **F-1 (b), the outline line alone**: site 2 is not applied. Its heading now says so with one trail line and carries no Before/After text; the header's "Amends" bullet is struck; the Census line reads "sites 3–5"; the Cap drops the header sentence; site 1's "Under F-1 (a) only" note became one line saying a park lives in the outline line alone; § 4 items 1–2 and the Edit-kind note no longer carry a conditional. → header L20–25, Census, Cap, § 3 sites 1 and 2, § 4, § 5, § 6.
- **F-2 (a), at ratification**: § 4 item 3 states the first pass runs at ratification and drops the "under (b)" branch. → § 4.
- **F-3 (b), `tasks.md`**: Appendix B row 16 carries `path:.kiro/specs/131-governance-simplification/tasks.md`; the open choice is gone from the row and from § 6. → Appendix B row 16, § 6.
- **F-4 (a), file it**: Appendix B row 12 names the filing in the application PR (owner Ada, Sparky consulted, Trigger `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`, [SPARKY R1] wording) and the "or writes Q5's drop reason" branch is dropped. § 6 notes that Ada owns the record and may re-rule it under README rule 9. → Appendix B row 12, § 4 item 3, § 6.
- **Moot statements in § 9, left as written**: the [STACY R1] and other R1 lines that treat F-1 to F-4 as open (for example "Under F-2 (a), the outcome line would quote his words…") are now answered; they are not edited.
- **A choice the folding forced**: F-2 (a) says the application PR carries the outcome lines, so § 4 now makes the application PR one PR for sites 1, 3, 4, 5 and the first pass. That couples the law sites' merge to Peter's answers to the triage batch. R2's text had them as two PRs (sites first, then an outcome PR). § 8's "outcome PR" is read as this PR. If Peter wants them split, § 4 item 2 and 3 change back; I did not decide that for him.
- **Still open for Peter**: Additions A and B. "Go with the leans" did not cover them. The ballot is not ratifiable until he answers.

#### [THURGOOD R4]

Folding Peter's answers to Additions A and B, the cleanup list and the PR shape (verbatim in § 6, received 2026-11-04T13:23:25Z), and his correction (2026-11-04T13:26:53Z). The entries above, including [THURGOOD R3], are unchanged; R3's "Still open for Peter" bullet is moot and left as written.

- **Addition A, yes, and Addition B, yes**: both marked DECIDED. § 2's "beyond the text Peter read" lines say so; § 6's "Still open for Peter" block became "Additions A and B, as decided", with Leonardo's `manual`-park alternative for row 10 noted as moot. The rule text in site 1 already carried both and is unchanged. → header Status, § 2, § 5 lead line, § 6.
- **Approve the list**: Appendix B stands as written (20 closed, 3 park, 1 open). § 4 item 3 now says the application PR writes one outcome line per row quoting his approval as "his words", row 17's `open` line still waits on its go entry reaching `main`, and the PR checks that the two inbound paths exist before it writes rows 10 and 20. The tally line records the approval. → § 4 item 3, Appendix B tally.
- **One PR**: § 4 item 2 and 3 stay as [THURGOOD R3] wrote them (sites 1, 3, 4 and 5 and the first pass's outcome lines in one application PR); § 6 records the choice. Two PRs is not taken.
- **Items 2 to 4 and the correction, rows 10 and 20**: both rows stay `closed`. Their closing lines no longer say "re-file as a fresh outline if wanted"; they point at the inbound paths and cite his words, and § 6 states that the inbounds are considerations, not direction (his item 4). → Appendix B rows 10 and 20, § 6.
- **Choices the folding forced** (named, not resolved silently):
  1. **Which inbound goes where.** His item 3 said "113 for 131"; his correction said he "confused 131 for 128" without saying which item it fixed. I used the orchestrator's reading (protocol to 131, 113 to 128) and the split he left to me, and recorded both as a mapping in § 6, not as his words. If he meant 113 for 131 after all, rows 10's path changes.
  2. **The rows cite paths that other PRs write.** At this commit neither inbound is on `main`. § 4 item 3 makes the application PR check that both exist before writing rows 10 and 20; if one is missing that row's line waits. I did not make the ballot's own ratification wait on them.
  3. **"Approve the list" as the quoted words for 24 outcome lines.** He approved the list as the orchestrator described it ("20 close, 3 park, 1 open, each with its reason"). I read that as covering each row's recommendation in Appendix B as written, with each row's reason on the page. If he wants per-row words, the application PR can ask.
- **Ratification is not inferred.** His answers settle every fork, but he has not said "ratified". Status stays DRAFT; the PR body's `**Open for Peter**:` line asks whether he ratifies the ballot as it now stands, citing § 6.

## 10. Application ledger

*(No edit site is applied yet.)*

- **2026-11-04, ratification record** (Peter, "Re: 644, ratified", received 2026-11-04T13:32:16Z; head ratified `b8b6aa3934422d926eecf5de2e7e1f6ff776e99b`): Status changed to RATIFIED by the holder, record-first. The application PR (§ 4) waits for this ballot PR's merge and Peter's go.

---

## Appendix A: site 3's block, verbatim

```bash

# 11. Waiting specs at S (ballot 2026-11-04-waiting-spec-row, site 3). The definition is RELEASE-FLOW
#     item 3a, "Waiting specs, at S": this block implements it and does not restate it. A change to
#     that paragraph's definition changes this block in the same PR, and a change here is read there.
#     The figure excludes a tag at S itself (--no-contains), so a run before step 5.2's tag and a
#     re-run after it print the same figures.
echo
echo "### Waiting specs at S \`$SS\`"
echo
echo "Command: \`\` for each dir in git ls-tree -d --name-only $SS .kiro/specs/: <dir>/design-outline.md present, <dir>/requirements.md absent, last column-0 '**Spec outcome (YYYY-MM-DD, <seat>)**: <kind>' line not 'closed'; c = git log -1 --format=%H $SS -- <dir>/design-outline.md; git tag --list 'v[0-9]*' --merged $SS --no-merged c --no-contains $SS | wc -l \`\`"
echo
echo "| Spec directory | Outline last moved | Releases since | Last outcome line |"
echo "|---|---|---|---|"
wn=0
for d in $(git ls-tree -d --name-only "$S" .kiro/specs/); do
  git cat-file -e "$S:$d/design-outline.md" 2>/dev/null || continue
  git cat-file -e "$S:$d/requirements.md" 2>/dev/null && continue
  oc=$(git show "$S:$d/design-outline.md" | grep -E '^\*\*Spec outcome \([0-9]{4}-[0-9]{2}-[0-9]{2}, [A-Za-z]+\)\*\*: (open|park|closed)' | tail -1)
  case "$oc" in *'**: closed'*) continue;; esac
  c=$(git log -1 --format=%H "$S" -- "$d/design-outline.md")
  n=$(git tag --list 'v[0-9]*' --merged "$S" --no-merged "$c" --no-contains "$S" | wc -l | tr -d ' ')
  wn=$((wn+1))
  printf '| `%s` | `%s` (%s) | %s | %s |\n' "${d##*/}" "$(git rev-parse --short=9 "$c")" "$(git log -1 --format=%cs "$c")" "$n" "$(printf %s "${oc:-none}" | sed 's/|/\\|/g')"
done
if [ "$wn" = 0 ]; then echo "| (none) | | | |"; fi
```

Tested standalone (with `S` and `SS` set as the script sets them), R2: at `ee31decd3` exit 0, no stderr, 24 rows, the same 24 directories and figures as Appendix B; at `4d10202b2` (16.2.0's S, tagged `v16.2.0`) 128 reads 0 and 051 reads 49, so the tag at S is left out.

## Appendix B: the first-pass triage at `ee31decd3` (R2: Thurgood's first pass, with the owners' R1 reads folded in)

**Sources and limits**:
- "Last moved" and "releases since" are the block's own output at `ee31decd3`. No tag points at `ee31decd3`, so R2's tag-at-S exclusion changes no figure here.
- "Trigger" counts the root records whose Trigger token names the directory's path (`spec-facts.sh <id> 4d10202b2 ee31decd3`, row 3). 0 means none, so no `closed` row strands a record. The application PR re-runs E2's grep for each closed row (site 1).
- Every other fact cites its path and, where it matters, a SHA.
- "R1 read" names the owner whose entry in § 9 confirms or amends the row. Thurgood's own rows say "Thurgood confirms (own act)".

| # | Spec directory | Last moved (releases since) | Owner | Evidence | Recommendation after R1 |
|---|---|---|---|---|---|
| 1 | `051-semantic-token-naming-restructure` | `08b442113` (50) | Ada | `052-semantic-token-naming-implementation/requirements.md` L6–7 and L13: "implements the semantic color token naming restructure defined in Spec 051", with this outline as its "Design Authority". 052's tasks.md: 9 of 9 parents ticked. Trigger: 0. **R1 read**: Ada confirms. | **closed — superseded by `.kiro/specs/052-semantic-token-naming-implementation/`**, which carried it out. The outline stays as 052's cited design authority. |
| 2 | `054-figma-console-mcp-integration` | `ab54303c5` (45) | Ada | The outline splits itself into 054a and 054b. The directories `054a-figma-token-push`, `054b-figma-design-extract`, `054c-figma-token-push-fixes` and `054d-hierarchical-design-extraction` exist, and the code shipped (`src/figma/`; `figma:push` and `figma:extract`). 054a's requirements L6 cite this outline as "shared architectural context". Of 054a–054d's parents, only 054d Task 7 is unticked; R1's "17 / 32 / 10" counted checklist lines. Trigger: 0. **R1 read**: Ada confirms, and corrects the counts. | **closed — superseded by 054a–054d.** |
| 3 | `057-release-analysis-tag-filtering` | `f5e02869d` (48) | Thurgood | It fixes `release:analyze --since` in `src/release-analysis/`. **That code was removed by Spec 065 Task 5, `9547d2ff4` (2026-02-28)**. 065's replacement, `src/tools/release/`, was then killed by ballot `2026-08-12-q6-release-manager-retirement` item 1. `package.json` at `ee31decd3` has no `release:analyze`. Trigger: 0. **R1 read**: Stacy corrected the chain (R1's "superseded by Q6" skipped 065), and Thurgood confirms (own act). | **closed — superseded by Spec 065 Task 5 (`9547d2ff4`), which removed the code it fixes; Q6 then retired 065's replacement.** |
| 4 | `059-component-color-token-investigation` | `c6d6d4be8` (48) | Ada (token API), Lina (component tokens) | `governance/Token-Governance.md` L160 and L556 (Lina adds L580) already state it as law: `defineComponentTokens` takes numeric families only, "there is no color family", and a component's colours reference semantic tokens directly. That is the outline's own recommendation, and its Next Steps say to close it as "Not Needed" if no use case emerges. None has in 48 releases. Trigger: 0. **R1 read**: Ada and Lina both change it from park to closed. | **closed — answered by `governance/Token-Governance.md` L160 and L556.** A component that someday needs a colour no semantic token can express is a new need and a new spec (Lina). |
| 5 | `060-custom-agent-system` | `1d1fa19fa` (46) | Thurgood | Three sub-specs in the directory carried it out (`ada-agent/` 4, `lina-agent/` 5 and `thurgood-agent/` 5 parents ticked; summaries under `docs/specs/060-custom-agent-system/`). The agents are now generated from `canonical/agents/**` by Spec 122 (`122-agent-generator`, 18 of 18), and Spec 070 (`070-agent-architecture`, 6 of 6) is also carried out. Trigger: 0. **R1 read**: Stacy's sample checked it true, and Thurgood confirms (own act). | **closed — carried out in its sub-specs, and superseded by `.kiro/specs/070-agent-architecture/` and `.kiro/specs/122-agent-generator/`.** |
| 6 | `087-agent-knowledge-base-strategy` | `41935ba1a` (36) | Thurgood | 8 charters in `canonical/agents/*.md` carry `knowledgeBases:` entries at `ee31decd3`. `governance/Process-Development-Workflow.md` L221 cites this directory's `knowledge-base-configuration-guide.md`. Trigger: 0. **R1 read**: Thurgood confirms (own act), with a limit: he has checked that the per-agent KB configuration landed in the charters, not each item of the outline's Kiro `/knowledge` CLI plan. | **closed — carried out in the charters' `knowledgeBases:` entries.** The directory stays, because L221 cites a file in it. |
| 7 | `100-design-critique-integration` | `640462b7a` (23) | Leonardo | The outline's own banner: "DEPRECATED (2026-05-16): This spec is subsumed by Spec 107". The capability exists: the Impeccable skill's `critique` command. Trigger: 0. **R1 read**: Leonardo confirms. | **closed — superseded by `.kiro/specs/107-design-language-context/`** (its own banner). |
| 8 | `101-package-publish-readiness` | `f5ff6188e` (34) | Ada | tasks.md: parent 2 "Publish 11.0.0 and Verify" is ticked; parent 1 is unticked, but `completion/task-1-completion.md` says "All 7 Parent 1 Success Criteria are met". Tag `v11.0.0` exists. Trigger: 0. **R1 read**: Ada confirms; the unticked boxes are bookkeeping only. | **closed — carried out (v11.0.0 published). The unticked boxes in tasks.md are not pending work; `completion/task-1-completion.md` is the record.** |
| 9 | `102-consumer-onboarding-completion` | `48ed1e648` (33) | Ada | Parent 1 was completed (`f37bc28de`) and the version bump landed (`2943f54f6`). Then 102's work shipped in **v11.2.0** (`9f954cf68`, via Spec 103). **11.1.0 was never published or tagged**: there is no `v11.1.0`, and parent 2's publish steps never ran. `docs/releases/RELEASE-NOTES-11.1.0.md` is stale (§ 8). Trigger: 0. **R1 read**: Ada changes the reason, from superseded to abandoned. | **closed — abandoned in part: parent 1 carried out and shipped in v11.2.0 (`9f954cf68`); parent 2 (publish 11.1.0) was never run, the 11.1.0 version was skipped, and its fresh-repo verification of the five gaps was not done under this spec.** |
| 10 | `113-onboarding-cli-workflows` | `e63ab7000` (2) | Leonardo | Its own Status (2026-10-20): DORMANT. Its philosophy was absorbed by Spec 123 (§ 3.6; `src/cli/templates/starter-specs/`). Its mechanism, a `configure` verb and a designer-facing intake, was not built. **The outline's "nearest living home", the Integration Guide designer-friendly rewrite charter, is closed** (2026-10-25, now `.kiro/issues/archive/2026-10-03-integration-guide-designer-friendly-rewrite-charter.md`). The rewrite shipped as the guide's `## Walkthroughs` layer (L262). Trigger: 0. **R1 read**: Leonardo confirms closed, with the residual in the line; park is the wrong shape. | **closed — superseded in part by Spec 123 § 3.6; the designer-friendly rewrite shipped as the Integration Guide's `## Walkthroughs`; residual: a state-aware re-runnable `configure` verb, not built; its idea now lives in the inbound `.kiro/specs/128-react-react-native-platform-admission/inbound-from-leonardo-2026-11-04-configure-intake.md`, a consideration for 128's approach and not direction (Peter, 2026-11-04T13:23:25Z, items 3 and 4, and 2026-11-04T13:26:53Z, § 6).** |
| 11 | `115-post-oklch-stabilization-cleanup` | `71120a5d9` (14) | Ada | Phases B and C have `Status: Complete` completion docs. Phase A's first item, deleting `src/tokens/ColorTokens.ts`, was deferred (`completion/phase-a-completion.md` § 3: "File cannot be deleted yet"), and the file still exists. It is carried by `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md`, folded into the colour-track spec (priorities record § 3.4). That record borrows the label "Phase B". Trigger: 0. **R1 read**: Ada confirms closed, and corrects the closing line. | **closed — phases A–C carried out except Phase A's deletion of `src/tokens/ColorTokens.ts`, deferred in `completion/phase-a-completion.md` § 3 and carried by `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md` (Trigger `manual`, folded into the colour-track spec, priorities record § 3.4).** |
| 12 | `116-sync-customization-safety` | `22848e4b7` (8) | Thurgood (formalization), Sparky (tooling), Ada (source model) | Sparky reads each open question against `src/cli/sync/`:<br>- Q1 answered: off a terminal, `sync` reports and writes nothing unless `--apply` is passed.<br>- Q2 answered by removal: `--force` and `--accept-all` are retired, and `--overwrite` and `--restore` are per path.<br>- Q3 superseded: Model B, 123 Req 5.8, `sync` never writes `src/tokens`, which Ada confirms.<br>- Q4 superseded: a first encounter is a conflict, judged against shipped content.<br>- Q6 answered: Integration Guide L1084 and L1100–1103.<br>- **Q5, a drift report, is still open**, and no live spec or record owns it.<br>Leonardo's product-side read agrees. Trigger: 0. **R1 read**: Sparky (close with a Q5 record), Ada (her source-model half closes on 123 Req 5.8), Leonardo (leaning closed), and Thurgood confirms (own act). | **closed — superseded by Spec 123's sync work (Requirement 5, Model B; retired flags; `--apply` / `--overwrite` / `--restore`; shipped-content comparison); Q5 (drift report) is not built.** The application PR files Sparky's P3 record for Q5 (owner Ada, Sparky consulted, Trigger `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`, wording in [SPARKY R1], § 9), as Peter ruled (F-4 (a), § 6); the closing line names that record. |
| 13 | `119-agent-experience-architecture` | `9bd47d494` (7) | Thurgood | Umbrella. The outline's own "Pillar mapping" (L28–31) names **three** pillars: `119-A-steering-relocation-serving-contract` (12 of 12 parents), `119-B-capability-routing-measurement` (10 of 10) and **Spec 122** (generation and enforcement; 18 of 18). All three are carried out. Trigger: 0. **R1 read**: Stacy added 122, and Thurgood confirms (own act). With the outline naming exactly three, no pillar is unowned. | **closed — superseded by `119-A`, `119-B` and `122-agent-generator`, its three named pillars.** |
| 14 | `125-mechanical-enforcement-strategy` | `2ab00b59d` (7) | Thurgood | Its own Status: "PHASE 0 + PHASE 1a COMPLETE (2026-07-10)" via 125-A, and "125-B (the classification map + later phases)". Its Phase 3, consumer-side reach, is "Spec 123 territory" (L99, L144). `125-A` (8 of 9 parents) and `125-B` (4 of 6) hold requirements, and 123 holds its own. Trigger: 0. **R1 read**: Stacy added Phase 3, and Thurgood confirms (own act). | **closed — superseded by `125-A-pr-gate-mechanical-arming` and `125-B-classification-map` (its phases 0–2) and by Spec 123 (its Phase 3, which the outline assigns there).** |
| 15 | `126-avatar-decorative-warn` | `7745d3ab8` (7) | Lina | Its own Status: "O2 RATIFIED … IMPLEMENTED (Lina, Task 1, 2026-07-15)". `Avatar.web.ts` L723 carries the ratified condition, and the tests carry the decorative cases. Trigger: 0. **R1 read**: Lina confirms. | **closed — carried out (Task 1, 2026-07-15, #81).** |
| 16 | `128-react-react-native-platform-admission` | `87c302774` (1) | Thurgood (formalizer), Leonardo | Peter's order 129 → 131 → 128 → 130 is **UNVERIFIED (chat only, 2026-10-24)** in the priorities record's walk log. The gate for its round is the charter's Trigger (`.kiro/issues/2026-10-03-react-react-native-platform-admission-charter.md` L8). #643 (open) refreshes its stale Status. Trigger: 7. **R1 read**: Leonardo confirms park, and names this token; Thurgood's R1 candidate was `…/requirements.md`, and Peter chose Leonardo's (§ 6). | **park — re-ask: `path:.kiro/specs/131-governance-simplification/tasks.md` (F-3 (b), Peter, 2026-11-04); sequenced after 129 and 131 (Peter, 2026-10-24, chat, as the priorities record carries it, UNVERIFIED).** |
| 17 | `129-consumer-generation-completeness` | `618bcaf5b` (1) | Thurgood (formalizer), Ada | **Peter's go, on record** at `.kiro/specs/129-consumer-generation-completeness/feedback/design-outline.md` § "[PETER] Go for the outline round (2026-11-04; recorded by Thurgood)", on branch `task/129-outline-r1` (head `f85d54fcc`; its PR is still to come). His words there, verbatim, received before 2026-11-04T03:19:41Z: "Proceed as the team recommends". The entry also carries the text he answered: "1. Open 129's review round … (a) Your go, with the step-2 update written as the round's first draft". Trigger: 21, 11 of them P1. **R1 read**: Stacy (the premise was not yet committed; it is once that branch merges), and Thurgood confirms (own act). | **open — the outcome line quotes his words and cites that entry, and is written only once the entry is on `main`.** |
| 18 | `130-input-switch-base` | `83f40c856` (2) | Thurgood (formalizer), Lina (component) | Peter's "Not now" on 130's R1 (2026-11-04, the priorities record's § 6.2 closing line, #642). § 3.3 pulls it forward for 128's first binding, or for a second screen that needs a switch. Trigger: 0. **R1 read**: Lina confirms park, with the event below. The second event is not git-visible, so it is carried in prose, and Lina watches it as G1's owner. | **park — re-ask: `path:.kiro/specs/128-react-react-native-platform-admission/design.md`; "Not now" (Peter, 2026-11-04); a second screen needing a switch also pulls it forward (§ 3.3, prose; Lina watches it as G1's owner).** |
| 19 | `131-governance-simplification` | `57128af48` (1) | Thurgood | Its own Status: "R3 — planning, paused at the edge of requirements". Peter's order puts it after 129 (**UNVERIFIED, chat only, 2026-10-24**, as the priorities record carries it). Trigger: 38. **R1 read**: Thurgood confirms (own act), and replaces R1's prose event with a git-visible one: 129's outline round closes when 129's requirements are written. | **park — re-ask: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`; paused at requirements and sequenced after 129 (Peter, 2026-10-24, chat, as carried, UNVERIFIED).** |
| 20 | `XXX-agent-interoperability-protocol` | `da20a0133` (41) | Thurgood | Its own Status: "exploratory, pending review". It names 060, 067 and 070. No later spec takes it up, and no git-visible event would re-ask it. Trigger: 0. **R1 read**: Thurgood changes it from park to closed (own act). Under Addition B, a park needs a git-visible event, and an honest one does not exist. This follows Leonardo's shape for 113. | **closed — an exploratory idea with no live spec and no git-visible event; its idea now lives in the inbound `.kiro/specs/131-governance-simplification/inbound-from-thurgood-2026-11-04-agent-interoperability-protocol.md`, a consideration for 131's approach and not direction (Peter, 2026-11-04T13:23:25Z, items 2 and 4, and 2026-11-04T13:26:53Z, § 6).** |
| 21 | `XXX-android-semantic-token-regeneration` | `377975425` (54) | Ada | It names `final-verification/DesignTokens.android.kt`; no such path exists, and output now goes to the git-ignored `dist/`. Ada ran `src/__tests__/integration/SemanticTokenGeneration.test.ts` at `ee31decd3` (19 of 19, including `space_grouped_normal`), and the 2026-10-03 Android build carries the semantic tokens. Trigger: 0. **R1 read**: Ada confirms, with the residual named. | **closed — the stale file it names is gone and the generator emits the semantic tokens; theme-varying semantic colours on Android and iOS remain Spec 129's.** |
| 22 | `XXX-release-system-operations` | `28b03e5a7` (52) | Thurgood | It audits the TypeScript release system. `065-release-system-rebuild` holds requirements, design and tasks (4 of 5 parents) and deleted `src/release/` (`9547d2ff4`). Ballot `2026-08-12-q6-release-manager-retirement` then killed `src/tools/release/`. Trigger: 0. **R1 read**: Stacy checked it true, and Thurgood confirms (own act). | **closed — superseded by `.kiro/specs/065-release-system-rebuild/` and ballot 2026-08-12-q6-release-manager-retirement.** |
| 23 | `XXX-stemma-catalog-readiness-audit` | `c6a9eeddb` (44) | Thurgood (audit), Lina (Stemma) | Its `design-outline.md` is byte-identical to `062-stemma-catalog-readiness-audit/design-outline.md` (empty `git diff`; same last commit). 062 has requirements, design and tasks, 3 of 3 parents. `.kiro/docs/agentic-ui-strategy.md` L241 and L285 cite this directory, so it stays where it is (§ 8 names the repoint). Trigger: 0. **R1 read**: Lina confirms, Stacy checked it true, and Thurgood confirms (own act). | **closed — duplicate of `.kiro/specs/062-stemma-catalog-readiness-audit/`.** |
| 24 | `XXX-task-based-conditional-loading` | `6d672b423` (58) | Thurgood | Its own Status: "Future Enhancement (Parked)". It asks for an `inclusion: taskMatch` option, and no such option exists. Agents now load guidance through the generated `WHEN … THEN consult` routing rows of Spec 122 (`canonical/agents/*.md`'s routing, rendered into each agent's file). Trigger: 0. **R1 read**: Thurgood confirms (own act). The need it names, loading guidance by task rather than always, is what those rows do. | **closed — superseded by Spec 122's per-agent routing rows.** |

**Tally after R1**: closed 20 (rows 1–15, 20–24); park 3 (rows 16, 18 and 19, each with a git-visible re-ask event); open 1 (row 17). No row is left without an owner's read or Thurgood's confirmation of his own. Peter has answered the two rows that carried forks: row 16's token (F-3 (b)) and row 12's Q5 (F-4 (a)); § 6. He has approved the list as it stands (2026-11-04T13:23:25Z, § 6). Row 17's outcome line waits on `task/129-outline-r1` reaching `main`.

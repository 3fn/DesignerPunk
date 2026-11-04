# Ballot Measure: one row per waiting spec at each release's S, answered open, park or closed

**Date**: 2026-11-04
**Drafted by**: Thurgood (Civitas steward; release author; owner of `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` and of `.kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh`), at Peter's direction.
**Status**: **DRAFT**. Not ratified. Nothing below is applied.
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
**Consulted (owed, run by the orchestrator after this draft is pushed)**: the triage rows' owners (§ 6 roster). Each confirms or amends the recommendation on their rows. Reviewers' entries come back as scratch files, and the holder splices them (§ 9).
**Class**: LAW. A new duty at every release is a requirement that nothing imposed before (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds").

**Amends**:
- `.kiro/hooks/RELEASE-FLOW.md` item 3a: one new paragraph (§ 3 site 1). **LAW**.
- `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 7's header: one sentence, **only under F-1 (a)** (§ 3 site 2). **LAW**, because that header carries ballot E3's text.
- `.kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh`: one appended block (§ 3 site 3, Appendix A). **EXECUTION** of site 1. It is not a governance path, so it owes no edit-kind line.
- `.kiro/specs/131-governance-simplification/evidence/2026-11-04-baseline-16.2.0.md`: one generator-pin line (§ 3 site 4). **EXECUTION**.
- `.kiro/specs/131-governance-simplification/evidence/README.md`: the `baseline-snapshot.sh` entry made true (§ 3 site 5). **EXECUTION**.

**Census**:
- Site 1 edits `.kiro/hooks/RELEASE-FLOW.md`. Two register rows cite that file as the law their instruments implement (condition 2): `publish-rail-guard` (steps 6 and 6b) and `hermetic-publish-path` (steps 5.1–5.4). So site 1 is presumptively in scope of both:
  - `**Census**: not in scope — publish-rail guard (scripts/verify-publish-rail.sh) — the edit adds a 3a walk paragraph; the rail reads one version from the live registry and loads no RELEASE-FLOW text, so no verdict can change`
  - `**Census**: not in scope — hermetic publish path, both scopes (scripts/release-publish.ts) — the script names RELEASE-FLOW steps only in comments and messages; the edit touches no step it decides, so no verdict or surface can change`
- No registered check loads sites 2–5:
  - `.kiro/issues/` and `.kiro/specs/` are not citing roots of `check-section-citations` (`governance/`, `.kiro/steering/`, `canonical/`), and they are not in `122-diff-guard`'s input closure (`tools/agent-generator/diff-guard.ts` L62–71).
  - `baseline-snapshot.sh` is named in no register row's `checks`.
  - The only rows that cite the issues README or the walk as law, `issues-obligation-lapse` and `release-falsity-floor`, have `checks: []`.

**Cap**: one RELEASE-FLOW paragraph; at most one sentence of one record's header; one script block of 30 lines; one pin line; one README entry. **Retroactivity**: none. Every existing figure the baseline script prints is unchanged at the same arguments; the block only appends (Appendix A).

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
- has an outline whose last line in the outcome form below is not `closed`.

Its figure is **the number of releases since its outline last moved**: the `v*` tags that contain S and do not contain the outline's last-touching commit.

- **Directories without an outline are not waiting specs** and are not listed. That covers formal specs without an outline, and directories that hold only inbounds or feedback. A spec that starts with inbounds alone is invisible to the row until its outline exists (residual, § 7).
- **Every directory is its own spec.** `125-mechanical-enforcement-strategy` and `125-A-pr-gate-mechanical-arming` are two entries. The umbrella is listed on its own facts, and the sub-specs are not listed while they hold `requirements.md`. `054` and `054a`–`054d`, and `119` and `119-A`/`119-B`, are read the same way. Unnumbered `XXX-*` directories count like any other.
- **Any outline edit resets the figure**, including a pointer fix or the outcome line itself. #643 (a pointer-only refresh of 128's outline) resets 128 to 0 at its merge without opening any round. After a park, the figure therefore reads "releases since it was parked". This is a residual, not a feature (§ 7).

**At each release's S** the walk record pastes the table. Peter answers each row he is asked about with one of three outcomes. Each outcome is written as one dated line in the outline:
- **open**: the spec's outline round opens.
- **park**: with a reason and a re-ask event. The row is reprinted at each S and not re-asked until the event fires.
- **closed**: with a reason, or "superseded by <path>". The directory stays where it is, so no link breaks: Process-Development-Workflow L221 cites a file inside `087-…/`. The spec leaves the table.

## 3. Edit sites (after ratification, one PR, Peter-merged)

### Site 1: `.kiro/hooks/RELEASE-FLOW.md` item 3a, new paragraph (LAW)

**Before** (the paragraph it follows, unchanged, L41 at `ee31decd3`):

> The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*

**After**: that paragraph, then a blank line, then this new paragraph, indented like its neighbours:

> **Waiting specs, at S.** The walk record's "At S" section pastes the "Waiting specs at S" table that `.kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh` prints when run at S with the release's four arguments. A **waiting spec** is a directory directly under `.kiro/specs/` that holds `design-outline.md` and no `requirements.md`, and whose outline's last outcome line is not `closed`. Each directory is its own spec. Its figure is the number of releases since its outline last moved, so any outline edit restarts it. The paste is facts only. It holds no merge, and no row of it is an `**Open for Peter**:` line.
>
> The release's orchestrator puts the rows to Peter in one batch, outside the walk record's PR. Two kinds of row are reprinted, not re-asked:
> - a row whose last outcome is `open` and whose figure is below 2;
> - a row whose last outcome is `park` and whose re-ask event has not fired.
>
> Peter answers each row with one of three outcomes. The spec's formalizer (Thurgood, unless the outline names another) writes the answer into the outline as one line, dated, with his words and their receipt bound:
> - `**Spec outcome (YYYY-MM-DD, <seat>)**: open — <his words>`. The outline round opens.
> - `**Spec outcome (YYYY-MM-DD, <seat>)**: park — <reason>; re-ask: <event> — <his words>`. The event is one token of `.kiro/issues/README.md` rule 1's grammar. The walk author reads whether it has fired.
> - `**Spec outcome (YYYY-MM-DD, <seat>)**: closed — <reason, or "superseded by <path>"> — <his words>`. The directory is not moved.
>
> *(added <application date> by ballot 2026-11-04-waiting-spec-row, site 1)*

**Under F-1 (a) only**, the park bullet gains: "and the spec gets a row in the priorities record's 'Peter-gated deferrals' list, which this item already reprints."

### Site 2, under F-1 (a) only: `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 7 header (LAW)

**Before** (L91 at `ee31decd3`, the italic header's last sentence):

> A row survives rule 5's stale archive, citing the archived path.)*

**After**:

> A row survives rule 5's stale archive, citing the archived path. A waiting spec that Peter parks (RELEASE-FLOW item 3a, "Waiting specs, at S") is a row too: it cites its directory `.kiro/specs/<dir>/`, with his reason and the re-ask event, and it leaves the list when the event fires or he rules again (ballot 2026-11-04-waiting-spec-row, site 2).)*

Under F-1 (b) this site is not applied, and § 7's header stays E3's text.

### Site 3: `baseline-snapshot.sh`, the "Waiting specs at S" block (EXECUTION)

Insert Appendix A's block, verbatim, after the line `row "Native verification" "$nvt" "git grep -lE 'xcodebuild|swift build|swiftc|gradle|kotlinc' $SS -- .github/workflows/"` and before the closing `echo` and footer.
- The block adds no figure to the table, and it changes none of the table's rows.
- The script's header comment gains one sentence: "Since ballot 2026-11-04-waiting-spec-row, its 'Waiting specs at S' block is the table RELEASE-FLOW item 3a pastes at each S; the table above it remains Spec 131's evidence."
- **Why this script, and not `spec-facts.sh`**:
  - `spec-facts.sh` reads one spec over one window at round open. Its README says it is "never a release duty", and making it one would undo the split between round facts and release facts that the facts-generator consult made.
  - `baseline-snapshot.sh` already takes a release's arguments (prev-S, S, walk start, version), and appending a block changes no figure it prints.
  - Its one cost is that the 16.2.0 baseline record stops re-running byte for byte with the newer script. Site 4 pins it.
  - A third, separate script would avoid the pin, but it adds a file. It would also need a home outside `.kiro/specs/**`, and `scripts/` takes a write-scope grant for a new file.

### Site 4: the 16.2.0 baseline record, generator pin (EXECUTION)

In `.kiro/specs/131-governance-simplification/evidence/2026-11-04-baseline-16.2.0.md`, append one bullet to "**How it was made**", after the 16.1.0 bullet:

> - **Generator pin** *(added <application date>, Thurgood, ballot 2026-11-04-waiting-spec-row site 4)*: both runs were made with `baseline-snapshot.sh` @ `347d5a1bd`, the script's only commit before that ballot added its "Waiting specs at S" block. Re-run them byte for byte with `git show 347d5a1bd:.kiro/specs/131-governance-simplification/evidence/baseline-snapshot.sh | bash -s -- <the args above>`. The newer script prints the same table and then the block.

### Site 5: the evidence README entry (EXECUTION)

In `.kiro/specs/131-governance-simplification/evidence/README.md`, the `baseline-snapshot.sh` entry's sub-bullet "It is in no CI lane and no rule names it. The record is pasted at S, …" becomes:

> - It is in no CI lane. **One rule names part of its output**: RELEASE-FLOW item 3a pastes its "Waiting specs at S" block at every release's S (ballot 2026-11-04-waiting-spec-row). The rest of its output is Spec 131's evidence and no rule names it. The 16.2.0 record was pasted at S, with the same figures at the previous S (`38f4ece47` for 16.2.0) beside it, and it is pinned to `347d5a1bd`.

## 4. Application (after the Status commit)

1. The Status commit records the ratification and Peter's answers to F-1 and F-2, record-first.
2. One PR applies sites 1, 3, 4 and 5, plus site 2 under F-1 (a).
   - The body carries the `**Edit kind**:` lines (RELEASE-FLOW LAW; under F-1 (a) the priorities record is not a governance path and owes none) and the census lines above, re-run at application.
   - It also carries a `**Straggler sweep**:` line for `baseline-snapshot.sh` (ballots README, "Straggler sweep on an instrument PR"), because RELEASE-FLOW names that script at the PR's merge.
   - Verification:
     - `bash -n` on the script;
     - the 16.2.0 and 16.1.0 runs, compared with the committed record: the table must be byte-identical, followed by the new block;
     - the block at the application's base, compared row for row with Appendix B, with any difference since `ee31decd3` listed.
3. First pass, per F-2:
   - **Under (a)**: the triage of Appendix B goes to Peter as one batch, with the owners' confirmations folded in. One PR then writes the outcome lines he gives. That PR is Thurgood's, under `.kiro/specs/**`, and each owner is consulted on their rows.
   - **Under (b)**: nothing runs until 16.3.0's walk at S.

## 5. Recommendation, counter-argument (fold-back applied), residual

**I recommend** sites 1 and 3–5, with F-1 (b) and F-2 (a), on these grounds:
- Peter has ruled the substance.
- (c) needs no list to be kept current, unlike (a) ranked.
- The first pass proposes closing 17 of the 24 directories and parking 5. Eight rows need their owner's call before Peter sees them (Appendix B's tally).
- After that, the table is a short list of real waiting specs.

**Counter-argument 1: this adds a standing release step while Spec 131, whose purpose is removing layers, is paused.**
- Fold-back: it uses the existing walk record and the existing outline file. It creates no new record type and no new script file, and it holds no merge.
- If Peter and the owners take the first pass as proposed, it takes 17 directories out of anyone's attention.
- **What survives**: every release still gains one paste and one batch line for Peter, and 131 may later want it gone.

**Counter-argument 2: the figure resets on any outline edit.**
- Fold-back: no clean fix. Counting from the outcome line resets too, and counting from the directory's creation never resets, so it overstates a spec that is moving.
- **What survives**: a pointer edit can make a stale spec look fresh. #643 does exactly that to 128.

**Counter-argument 3: the drift does not stop at outlines.**
- `054a` (17 parents open), `054b` (32 open), `054d` (10), `107` (3), `125-B` (2) and `065` (1) hold requirements and unticked parents, and (c) cannot see them.
- **What survives**: specs stalled after requirements are outside this rule. Whether to widen it is 131's question.

**Counter-argument 4: a release step depends on a script inside a spec's evidence directory.**
- **What survives**: a reader of RELEASE-FLOW lands in `.kiro/specs/131-…/evidence/`. Moving the script to `scripts/` needs a write-scope grant, and that is 131's call.

**Counter-argument 5: the first pass is about 24 decisions for Peter.**
- Fold-back: Appendix B pre-sorts them with evidence, and the owners confirm their rows before he sees them, so he can answer "all as recommended" with exceptions.
- **What survives**: the rows marked "owner to confirm" (§ 6) may still come to him as real questions.

**Counter-argument 6: closing by an outline line leaves the directories in place.**
- `.kiro/specs/` stays as large as it is, and an agent listing it still sees dead specs.
- **What survives**: the rule fixes the release's view, not the directory listing. Moving directories would break links, starting with Process-Development-Workflow L221.

## 6. Forks for Peter

- **F-1: where a park lives.**
  - **(a)** As in the text he read before: a park is the outline line **plus** a row in the priorities record's § 7, which RELEASE-FLOW 3a already reprints. That needs site 2, which amends ballot E3's header.
  - **(b)** The outline line alone. The table itself reprints the park line at every S.
  - **My lean is (b)**: one home, read by the script, no E3 amendment, one site fewer.
  - Against (b): § 7 is the one place Peter already reads for "answered, not now", and under (b) parked specs appear there no longer. Parked records do, parked specs do not.
- **F-2: when the first pass runs.**
  - **(a)** At ratification: the triage batch goes to Peter now, while the evidence in Appendix B is fresh.
  - **(b)** At 16.3.0's S, as the walk's first paste.
  - **My lean is (a)**: the triage is already prepared, it takes about 17 rows off 16.3.0's walk, and it was his question that led here.
  - Against (a): it tests the rows outside the release rhythm the RELEASE-FLOW line is written for. The first real run of site 1's text is still 16.3.0.
- **Not a fork, my choice and open to review**: the `open` row is re-asked once its figure reaches 2. Without a threshold an opened spec that never formalizes drops out of the ask forever, which is 129's history.

**Triage owner roster** (Appendix B, from each outline's own lines where it names an owner, otherwise by domain per Agent-Directory):

| Owner | Rows |
|---|---|
| Ada | 051, 054, 059 (with Lina), 101, 102, 115, `XXX-android-semantic-token-regeneration`, and the 116 source model |
| Lina | 059 (with Ada), 126, 130 (component), `XXX-stemma-catalog-readiness-audit` (with Thurgood) |
| Leonardo | 100, 113, 128 (adopter front door) |
| Sparky | 116 (tooling) |
| Thurgood | 057, 060, 087, 116 (formalization), 119, 125, 128, 129, 130, 131 (formalizer), `XXX-agent-interoperability-protocol`, `XXX-release-system-operations`, `XXX-stemma-catalog-readiness-audit`, `XXX-task-based-conditional-loading` |

Kenya and Data are named on no row.

## 7. Residuals carried (no edit here)

- A spec that starts with inbounds and no outline is invisible to the row.
- The figure resets on any outline edit (§ 2).
- Specs stalled after requirements are not seen (counter-argument 3).
- The row reads tags that exist at run time. A deleted tag would change the figure.

## 8. Standards notes (no edit in this ballot)

- `src/components/core/Badge-Count-Notification/tokens.ts` L26 cites `.kiro/specs/059-component-color-token-architecture`, which does not exist. The directory is `059-component-color-token-investigation`. This is a broken pointer in Lina's file, noticed during the triage. It goes to her as a message.
- `101` and `102` each carry an unticked parent next to completion docs for the same parent (Appendix B). That is a tasks.md state the closed line will freeze. Ada, their agent, decides whether a dated note is owed.

## 9. Review round record

*(Empty. Reviewers' entries are spliced here by the holder from their scratch files. Reviewers do not write this file.)*

## 10. Application ledger

*(Empty until ratification.)*

---

## Appendix A: site 3's block, verbatim

```bash

# 11. Waiting specs at S (ballot 2026-11-04-waiting-spec-row, site 3). A waiting spec is a directory
#     directly under .kiro/specs/ (each directory is its own spec: 125-mechanical-enforcement-strategy
#     and 125-A-pr-gate-mechanical-arming are two) that holds design-outline.md and no requirements.md,
#     and whose outline's last `**Spec outcome (YYYY-MM-DD, <seat>)**: <kind>` line is not `closed`.
#     "Releases since" counts the v* tags that contain S and not the outline's last-touching commit, so
#     any outline edit, an outcome line included, resets it. A directory with no design-outline.md is
#     not listed.
echo
echo "### Waiting specs at S \`$SS\`"
echo
echo "Command: \`\` for each dir in git ls-tree -d --name-only $SS .kiro/specs/: <dir>/design-outline.md present, <dir>/requirements.md absent, last '**Spec outcome (YYYY-MM-DD, <seat>)**: <kind>' line not 'closed'; c = git log -1 --format=%h $SS -- <dir>/design-outline.md; git tag --list 'v[0-9]*' --merged $SS --no-merged c | wc -l \`\`"
echo
echo "| Spec directory | Outline last moved | Releases since | Last outcome line |"
echo "|---|---|---|---|"
wn=0
for d in $(git ls-tree -d --name-only "$S" .kiro/specs/); do
  git cat-file -e "$S:$d/design-outline.md" 2>/dev/null || continue
  git cat-file -e "$S:$d/requirements.md" 2>/dev/null && continue
  oc=$(git show "$S:$d/design-outline.md" | grep -E '^\*\*Spec outcome \([0-9]{4}-[0-9]{2}-[0-9]{2}, [A-Za-z]+\)\*\*: (open|park|closed)' | tail -1)
  case "$oc" in *'**: closed'*) continue;; esac
  c=$(git log -1 --format=%h "$S" -- "$d/design-outline.md")
  n=$(git tag --list 'v[0-9]*' --merged "$S" --no-merged "$c" | wc -l | tr -d ' ')
  wn=$((wn+1))
  printf '| `%s` | `%s` (%s) | %s | %s |\n' "${d##*/}" "$c" "$(git log -1 --format=%cs "$c")" "$n" "$(printf %s "${oc:-none}" | cut -c1-160 | sed 's/|/\\|/g')"
done
if [ "$wn" = 0 ]; then echo "| (none) | | | |"; fi
```

Tested standalone at `ee31decd3` (with `S` and `SS` set as the script sets them): exit 0, no stderr, 24 rows, the same 24 as Appendix B.

## Appendix B: the first-pass triage at `ee31decd3` (first-pass recommendations, Thurgood; each owner confirms or amends)

**Sources and limits**:
- "Last moved" and "releases since" are the block's own output at `ee31decd3`.
- "Trigger" counts the root records whose Trigger token names the directory's path (`spec-facts.sh <id> 4d10202b2 ee31decd3`, row 3). 0 means none.
- Every other fact cites its path and, where it matters, a SHA.
- **"Owner to confirm"** marks a row where the evidence does not settle the call. Nothing in it is a guess offered as a fact.

| # | Spec directory | Last moved (releases since) | Owner | Evidence | First-pass recommendation |
|---|---|---|---|---|---|
| 1 | `051-semantic-token-naming-restructure` | `08b442113` (50) | Ada (token naming) | `052-semantic-token-naming-implementation/requirements.md` L6–7, L13: "implements the semantic color token naming restructure defined in Spec 051", with this outline as its "Design Authority". 052's tasks.md: 9 of 9 parents ticked. Trigger: 0. | **closed — superseded by `.kiro/specs/052-semantic-token-naming-implementation/`**, which carried it out. The outline stays as 052's cited design authority. |
| 2 | `054-figma-console-mcp-integration` | `ab54303c5` (45) | Ada (DTCG and Figma export) | The outline splits itself into 054a and 054b. The directories `054a-figma-token-push`, `054b-figma-design-extract`, `054c-figma-token-push-fixes` and `054d-hierarchical-design-extraction` exist. 054a's requirements L6 cite this outline as "shared architectural context". Trigger: 0. | **closed — superseded by 054a–054d**. Their unticked parents (054a 17, 054b 32, 054d 10) are outside this rule (§ 5, counter-argument 3). |
| 3 | `057-release-analysis-tag-filtering` | `f5e02869d` (48) | Thurgood (release tooling) | It fixes `release:analyze --since`. Ballot `2026-08-12-q6-release-manager-retirement.md` (RATIFIED) item 1 killed `src/tools/release/` and the release-analysis workflow. `package.json` at `ee31decd3` has no `release:analyze`. Trigger: 0. | **closed — superseded by ballot 2026-08-12-q6-release-manager-retirement**: the tool it fixes was retired. |
| 4 | `059-component-color-token-investigation` | `c6d6d4be8` (48) | Ada (token API), Lina (component tokens) | The outline: `defineComponentTokens()` takes numeric values only, found in Spec 046 Task 8.2. `src/build/tokens/defineComponentTokens.ts` at `ee31decd3` has no line matching `color` (case-insensitive grep), so the gap may stand. `Badge-Count-Notification/tokens.ts` L26 cites this spec under a wrong path (§ 8). Trigger: 0. | **Owner to confirm.** Candidate: **park — the component colour-token question belongs with the colour-track spec (priorities record § 3.4); re-ask: that spec's directory being created**. Or **closed** if a later spec settled it. |
| 5 | `060-custom-agent-system` | `1d1fa19fa` (46) | Thurgood (agent system) | Three sub-specs in the directory carried it out (`ada-agent/` 4, `lina-agent/` 5 and `thurgood-agent/` 5 parents ticked; summaries under `docs/specs/060-custom-agent-system/`). The agents are now generated from `canonical/agents/**` by Spec 122 (`122-agent-generator`, 18 of 18 parents), and Spec 070 (`070-agent-architecture`, 6 of 6) is also carried out. Trigger: 0. | **closed — carried out in its sub-specs, and superseded by `.kiro/specs/070-agent-architecture/` and `.kiro/specs/122-agent-generator/`**. |
| 6 | `087-agent-knowledge-base-strategy` | `41935ba1a` (36) | Thurgood (Civitas knowledge bases) | 8 charters in `canonical/agents/*.md` carry `knowledgeBases:` entries at `ee31decd3`. `governance/Process-Development-Workflow.md` L221 cites this directory's `knowledge-base-configuration-guide.md`. Trigger: 0. | **Owner to confirm** whether the strategy landed whole. Candidate: **closed — carried out in the charters' `knowledgeBases:` entries**. The directory stays, because L221 cites a file in it. |
| 7 | `100-design-critique-integration` | `640462b7a` (23) | Leonardo (design critique, Impeccable) | The outline's own banner: "DEPRECATED (2026-05-16): This spec is subsumed by Spec 107". `107-design-language-context` has requirements, design and tasks. Trigger: 0. | **closed — superseded by `.kiro/specs/107-design-language-context/`** (its own banner). |
| 8 | `101-package-publish-readiness` | `f5ff6188e` (34) | Ada (the tasks' `**Agent**:` lines) | tasks.md: parent 2 "Publish 11.0.0 and Verify" is ticked; parent 1 is unticked, but `completion/task-1-completion.md` exists. Tag `v11.0.0` exists. Trigger: 0. | **closed — carried out (v11.0.0 published)**. The unticked parent goes to Ada (§ 8). |
| 9 | `102-consumer-onboarding-completion` | `48ed1e648` (33) | Ada (the tasks' `**Agent**:` lines) | tasks.md: parent 1 is ticked; parent 2 "Publish 11.1.0 and Verify" is unticked. **No `v11.1.0` tag exists** (`v11.0.0` is followed by `v11.2.0`). The repository is at `v16.2.0`. Trigger: 0. | **Owner to confirm** what became of 11.1.0. Candidate: **closed — superseded by the later releases and by Spec 123's onboarding work**. |
| 10 | `113-onboarding-cli-workflows` | `e63ab7000` (2) | Leonardo (adopter front door); the outline's Agent line is "TBD" | Its own Status (2026-10-20): DORMANT. "Its philosophy was absorbed by Spec 123 … (§ 3.6; shipped at `src/cli/templates/starter-specs/`)". "Its mechanism was not built: there is no `configure` verb". Trigger: 0. | **Owner to confirm** closed or park. Candidate: **closed — superseded in part by Spec 123 § 3.6**. Its unbuilt `configure` mechanism is then an idea with no home, and if Leonardo wants it kept, the row is a **park** instead. |
| 11 | `115-post-oklch-stabilization-cleanup` | `71120a5d9` (14) | Ada (Phase A; the outline's Agent line) | `completion/phase-a-completion.md`, `phase-b-completion.md` (Status: Complete) and `phase-c-completion.md` (Status: Complete) exist. The open residual, the colorTokens deletion, is its own record, `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md`, folded into the colour-track spec (priorities record § 3.4). Trigger: 0. | **closed — phases A–C carried out; the residual is carried by `.kiro/issues/2026-09-12-spec-115-phase-b-colortokens-deletion.md`**. |
| 12 | `116-sync-customization-safety` | `22848e4b7` (8) | Thurgood (formalization), Sparky (tooling), Ada (source model) (the outline's Agent line) | The test01 sync incident of 2026-06-12, diagnosis settled and design questions open (its own reading note). Spec 117's outline and requirements cite it. Trigger: 0. I have **not** verified whether later sync work (Spec 123's sync and migration) answered its open design questions. | **Owner to confirm.** No first-pass recommendation: the evidence above does not settle open, park or closed. |
| 13 | `119-agent-experience-architecture` | `9bd47d494` (7) | Thurgood (the outline's Author line) | Umbrella. `119-A-steering-relocation-serving-contract` (12 of 12 parents) and `119-B-capability-routing-measurement` (10 of 10) carried out its two named halves. Trigger: 0. | **Owner to confirm** that no AXA pillar beyond 119-A and 119-B is still unowned. Candidate: **closed — superseded by 119-A and 119-B**. |
| 14 | `125-mechanical-enforcement-strategy` | `2ab00b59d` (7) | Thurgood (the outline's Author line) | Its own Status: "PHASE 0 + PHASE 1a COMPLETE (2026-07-10)" via 125-A, and "125-B (the classification map + later phases)". `125-A` (8 of 9 parents) and `125-B` (4 of 6) hold requirements. Trigger: 0. | **closed — superseded by `125-A-pr-gate-mechanical-arming` and `125-B-classification-map`**, which carry its phases (its own Status). |
| 15 | `126-avatar-decorative-warn` | `7745d3ab8` (7) | Lina | Its own Status: "O2 RATIFIED … IMPLEMENTED (Lina, Task 1, 2026-07-15)". `completion/task-1-completion.md`: "the design outline IS the implementation spec". Trigger: 0. | **closed — carried out (Task 1, 2026-07-15)**. |
| 16 | `128-react-react-native-platform-admission` | `87c302774` (1) | Thurgood (formalizer), Leonardo | Peter's order is 129 → 131 → 128 → 130 (priorities record walk log, 2026-10-24). The gate for its round is the charter's Trigger (`.kiro/issues/2026-10-03-react-react-native-platform-admission-charter.md` L8). Trigger: 7. | **park — sequenced after 129 and 131 (Peter, 2026-10-24); re-ask: owner to name the event**. Candidate: 131's requirements being created. |
| 17 | `129-consumer-generation-completeness` | `618bcaf5b` (1) | Thurgood (formalizer), Ada | Peter's "Proceed as the team recommends" (received before 2026-11-04T03:19:41Z) covers "129: go", with the step-2 update as the first draft of its outline round. Trigger: 21, 11 of them P1. | **open** (already ruled; the outcome line records it). |
| 18 | `130-input-switch-base` | `83f40c856` (2) | Thurgood (formalizer), Lina (component) | Peter's "Not now" on 130's R1 (2026-11-04, the priorities record's § 6.2 closing line, after #642). § 3.3 pulls it forward for 128's first binding or a second screen that needs a switch. Trigger: 0. | **park — "Not now" (Peter, 2026-11-04); re-ask: owner to name the event**. Candidate: 128's `design.md` being created, which is 128's first binding design. |
| 19 | `131-governance-simplification` | `57128af48` (1) | Thurgood (the outline's Author line) | Its own Status: "R3 — planning, paused at the edge of requirements". Peter's order puts it after 129. Trigger: 38. | **park — paused at requirements and sequenced after 129 (Peter, 2026-10-24); re-ask: owner to name the event**. Candidate: 129's outline round closing. |
| 20 | `XXX-agent-interoperability-protocol` | `da20a0133` (41) | Thurgood (agent coordination) | Its own Status: "exploratory, pending review". It names 060, 067 and 070. Trigger: 0. No later spec found that takes it up. | **park — an idea with no home; re-ask: owner to name the event**. |
| 21 | `XXX-android-semantic-token-regeneration` | `377975425` (54) | Ada (native token output) | It names `final-verification/DesignTokens.android.kt`, and no such path exists at `ee31decd3`. The test it cites, `src/__tests__/integration/SemanticTokenGeneration.test.ts`, still asserts `space_grouped_normal`. Native output completeness is Spec 129's scope. Trigger: 0. | **Owner to confirm** that today's Android output carries the semantic tokens. Candidate: **closed — the stale file it names is gone, and native completeness is Spec 129's**. |
| 22 | `XXX-release-system-operations` | `28b03e5a7` (52) | Thurgood (release system) | It audits the TypeScript release system. `065-release-system-rebuild` holds requirements, design and tasks (4 of 5 parents), and ballot `2026-08-12-q6-release-manager-retirement` killed `src/tools/release/`. Trigger: 0. | **closed — superseded by `.kiro/specs/065-release-system-rebuild/` and ballot 2026-08-12-q6-release-manager-retirement**. |
| 23 | `XXX-stemma-catalog-readiness-audit` | `c6a9eeddb` (44) | Thurgood (audit), Lina (Stemma) | Its `design-outline.md` is **byte-identical** to `062-stemma-catalog-readiness-audit/design-outline.md` (empty `git diff` at `ee31decd3`), and both last moved in the same commit. 062 has requirements, design and tasks, 3 of 3 parents. Trigger: 0. | **closed — duplicate of `.kiro/specs/062-stemma-catalog-readiness-audit/`**. |
| 24 | `XXX-task-based-conditional-loading` | `6d672b423` (58) | Thurgood (steering loading) | Its own Status: "Future Enhancement (Parked)". It asks for an `inclusion: taskMatch` option. No such option exists. Agents now load guidance through the generated `WHEN … THEN consult` routing rows of Spec 122. Trigger: 0. | **Owner to confirm** whether 122's routing rows meet its need. Candidate: **closed — superseded by Spec 122's routing**. Otherwise a **park**. |

**First-pass tally** (with "owner to confirm" rows counted under their candidate): closed 17 (rows 1–3, 5–11, 13–15, 21–24); park 5 (rows 4, 16, 18, 19, 20); open 1 (row 17); no recommendation 1 (row 12). Eight rows need their owner's call before Peter sees them: rows 4, 6, 9, 10, 13, 21 and 24, before their candidate holds, and row 12, which has no candidate.

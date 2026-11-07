# Ballot Measure: the merge-hold and law-ratified checks, and what "answered" means to them

**Date**: 2026-11-07
**Drafted by**: Thurgood (Civitas steward; maintainer of the checks this measure specifies; owner and profile author of Task-Completion-Protocol's `#branch-and-pr-conventions` unit, `canonical/operative-sets/task-completion-protocol.yaml` L9–10), at Peter's direction. Peter's words, recorded with `date -u` at receipt (orchestrator relay; **UNVERIFIED** beyond the relay):
- 2026-11-07T17:00:13Z: *"yes, ratify; and scope the check"*.
- 2026-11-07T17:33:23Z: *"Re: Decision 1, Yes"*. The orchestrator's summary of what that approves: the format ballot (this one), and one workflow with two jobs. One job is merge-hold: advisory, promoted after N clean runs that parsed a marker. The other is law-ratified: required once a test PR shows it red, with the edit-kind presence limb.
**Status**: **DRAFT** — not ratified. No edit site below is applied. A merge of this file's PR ratifies nothing; only Peter's dated words in this Status line do.
**Owner**: Thurgood.
**Required reviewer**: **Stacy**. She is the C1 confirmer of `#branch-and-pr-conventions` (L10), the census reader, the reader of governance-edit-kind lines, and the specifier of the checks' falsification fixtures (the instrument split, Q5). Her cross-read of the merge-hold scope (2026-11-07) proposed the law-ratified job and the clean-run promotion.
**Reviewers**: **Peter** ratifies (Task-Completion-Protocol is identity law, and § 6's acts are his).
**Class**: LAW for items 1 and 2. Item 1 defines a grammar the current rule does not have, and item 2 makes a check of the edit-kind lines required. Items 3–5 are EXECUTION of this ballot once ratified.
**Amends**: `.kiro/steering/Task-Completion-Protocol.md` L122 and L123 (items 1 and 2). Follow-on: the operative-set items and consumer rendering of `#branch-and-pr-conventions` (§ 5); two `governance/classification-map.md` rows (item 4).
**Cap**: two law sentences per item; one workflow file with two jobs; one script and its test; two register rows; one gate-count change (Peter's). **Retroactivity**: none. Neither check reads a PR merged before its workflow lands.
**Base**: `main` at `0bc48935b`. Every before-text below is quoted from that tree (TCP last changed at `c470a248f`).

> **What these checks are not.** They confirm that an answer or a ratification is **present and cited**. They cannot confirm **who** gave it, because agents act through Peter's GitHub credential (`.kiro/specs/131-governance-simplification/inbound-from-thurgood-2026-11-07-agent-identity.md`, on `chore/131-agent-identity-capture`, not yet merged). A green result from either is not evidence that Peter spoke. Stating this on each check's output is part of item 3.

---

## 1. The defect

PR #719 (Spec 129 U4) carried `**Open for Peter**: Ratify the per-family Android type statements … as LAW (ballot .kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md …)? This PR is not merged until your dated answer is in that ballot's Status.` It merged at 2026-11-07T16:52:22Z with 26 of 26 checks `SUCCESS` (**VERIFIED**, `gh pr view 719`), while the ballot's Status read DRAFT at the merge commit `30e2f727b` (**VERIFIED**, `git show`). Peter ratified 7 min 51 s later, and #720 recorded the finding. Cost: `.kiro/specs/131-governance-simplification/inbound-governance-cost-ledger.md` L-10.

The law already held the merge. Nothing showed that it did: no check reads an `**Open for Peter**:` line or a LAW line's ballot.

## 2. The measure

### Item 1: TCP L122, the merge-hold rule gains its answer grammar (LAW)

**Before** (L122, at `0bc48935b`):
> - **A question to Peter holds the merge** (Peter, 2026-10-17: "Don't merge until I answer"). A PR body that puts a question to Peter carries it on a line beginning `**Open for Peter**:`. The PR is not merged until Peter's answer is on the record — his words, dated, in a committed file or written by him on the PR — **dated before the merge** (his comment's timestamp, or the commit adding his words, is earlier than the PR's `mergedAt`), and the body cites it. A merge never answers a question; no author writes "merge = yes", "adopted at merge unless amended" or an equivalent. **A pointer counts as asking**: a body line pointing at a question asked elsewhere holds the merge exactly as the written-out question would. An unmarked question to Peter holds it too; the missing marker is a finding on the author. "Not now — merge" is an answer, and the question is filed under rule 10 with a trigger.

**After**: L122 unchanged, followed by these sentences in the same bullet:
> **The marker and its answer, as the merge-hold check reads them.** A marker line begins, at column 0 and outside a fenced code block, with `**Open for Peter**:`. A pointer to a question asked elsewhere carries the marker too: `**Open for Peter**: see <where>`. Each marker is answered by a line beginning `**Peter answered**:` that comes after it and before the next marker: `**Peter answered**: <time, ISO 8601 UTC> — "<his words, verbatim>" — <a path committed at the PR head, or the URL of his comment on this PR>`. The cited file or comment contains the quoted words, compared after normalising both sides: a leading `>` blockquote marker is dropped from each line, `*` and `_` emphasis markers are removed, curly quotation marks become straight ones, and every run of whitespace, line breaks included, becomes one space. The comparison is otherwise exact and case-sensitive. Where the words are "not now — merge" or an equivalent, the line also names the record the question is filed in. The check confirms that the answer is present and cited, never who gave it. *(added <ratification date> by ballot 2026-11-07-merge-hold-and-law-ratified-checks, item 1)*

**Why these choices** (each is open to Stacy's review and to F-3):
- **Adjacency pairing** (an answer belongs to the marker before it) is decidable without numbering markers, and keeps question and answer side by side for Peter's read.
- **The quote must be in the cited source**, so an answer line cannot stand alone. That makes a forged answer leave a committed or posted trace. It does not stop one.
- **The normalisation** (Stacy R1 A4) exists because Peter's words in committed records are often blockquoted, wrapped across lines or italicised; a raw substring match would read those red. Each normalisation step has a fixture (item 3).
- **A marker inside a blockquote is not counted**: its line begins with `>`, not at column 0 with `**`. The same holds for a code fence (Stacy R1 A6 fixture 11).
- **The pointer sentence** makes TCP's "a pointer counts as asking" visible to the check. A pointer or question with no marker stays invisible, and stays a finding on the author for the claims pass.

### Item 2: TCP L123, the edit-kind lines gain a required check (LAW)

**Before** (L123, at `0bc48935b`):
> - **Edit kind** (ballot 2026-10-18-governance-edit-kinds): a PR whose diff touches a governance path (`governance/**`, `.kiro/steering/**`, `.kiro/hooks/RELEASE-FLOW.md`, the prose of `canonical/agents/**`) carries one line per changed file — `**Edit kind**: <path> — LAW (<ballot path>)`, `— EXECUTION (<clause>)` or `— CORRECTION (<observation record>; truth: <referent>)`. Where one file's lines are of different kinds, it carries one line per part instead, with `<path> L<a>–<b>`: the line range in the file as it stands at the merge commit. The lines are read from the PR body (`gh pr view <n> --json body`), never from the squash message.

**After**: L123 unchanged, followed by:
> A required check, `law-ratified`, reads these lines at the PR head. Each LAW line's cited ballot exists at the head, and its first `**Status**:` line reads RATIFIED. Each file the diff changes on a governance path has a line. *(added <ratification date> by ballot 2026-11-07-merge-hold-and-law-ratified-checks, item 2)*

**The Status grammar** (amended at R2 for Stacy R1 A1): the first line of the ballot that begins `**Status**:` matches `^\*\*Status\*\*: [*`]*RATIFIED(?=[\s*`(]|$)` (PCRE). So `RATIFIED` must be followed by whitespace, `*`, a backtick, `(` or the end of the line; `RATIFIED-ready` and `RATIFIED?` read red. A plain `\b` would not do, because a hyphen is a word boundary. **Census at `0bc48935b`**, re-run with this regex: 63 ballots under `.kiro/docs/ballots/2*.md`; **61 match**, the same 61 as the R1 regex. On this branch the count is 64, and the 64th, this ballot, reads DRAFT. Of those, 60 open `**RATIFIED` and one opens `` `RATIFIED `` (`2026-07-07-orchestration-model-tiering.md`). The two that do not match are not ratified: `2026-10-20-spec-128-platform-admission-identity.md` (CARRIED into Spec 128) and `2026-10-24-ballot-audit-fix-now-law.md` (DRAFT). A spec-artifact ballot (for example `.kiro/specs/125-A-…/task-1-workflow-ballot.md`) is read the same way at its cited path.

**A ballot ratified on another branch** still reads DRAFT at this PR's head, so the check is red, which is correct. **The same-PR record-first precedent** (B-U1, Spec 127 U1: the RATIFIED commit rides in the PR it ratifies) passes, because the head carries the Status.

### Item 3: the checks (EXECUTION of items 1 and 2, once ratified)

- **One workflow, two jobs**: `.github/workflows/merge-hold.yml`, jobs `merge-hold` and `law-ratified`. Trigger: `pull_request` to `main`, `types: [opened, synchronize, reopened, edited]`. Committing an answer fires `synchronize`; editing the body fires `edited`. `issue_comment` is not used: an answer given in a comment is cited in the body, and that edit fires the run.
- **The body is read through the API** (`gh pr view <n> --json body` with the workflow's token), never from the event payload, because a re-run replays the payload of its original event.
- **One script**: `scripts/completion-claims/merge-hold.ts`, with a `--pr <n>` audit mode like `edit-kind-pointers.ts`, so Stacy can also run it after a merge. Its test is `scripts/completion-claims/__tests__/merge-hold.test.ts`, with **Stacy's falsification fixtures**. Each fixture is a committed case with its expected verdict:
  1. #719's body at its merge → red on both jobs;
  2. a quoted marker inside a code span or fence → not counted;
  3. a pointer marker → counted, and needs an answer;
  4. two markers with one answer → red;
  5. an answer whose quote is not in the cited file → red;
  6. a "not now — merge" answer naming no record → red;
  7. an answer line *before* its marker → red (Stacy R1 A6.1);
  8. a cited path absent at the head → red (A6.2);
  9. a comment URL on another PR or issue → red (A6.3);
  10. a quote wrapped inside a `>` blockquote in the cited file → green (A6.4), plus one fixture for each other normalisation step (emphasis, curly quotes, line wrap);
  11. a suffixed Status (`RATIFIED-ready`, `RATIFIED?`) → red (A6.5);
  12. a LAW line citing a path with no `**Status**:` line → red (A6.6);
  13. a ballot ratified on another branch, DRAFT at the head → red (A6.7);
  14. the same-PR record-first commit → green (A6.8);
  15. a governance file deleted by the diff → needs a line naming its **old** path; a governance file renamed → needs a line naming its **new** path, the path as it stands at the merge commit, as L123 already reads line ranges (A6.9);
  16. two markers, each with its own answer → green (A6.10);
  17. a marker inside a blockquote → not counted (A6.11).
- **Each run leaves a persistent record of what it read** (Stacy R1 A2). The job writes one check-run annotation carrying `body-sha256: <hex>` of the body it read, and the marker and answer lines it parsed, verbatim. Check-run annotations outlast workflow logs; `scripts/harness/stability.ts` L38 relies on the same fact. *Recalled, UNVERIFIED*: an annotation's message has a size limit (about 64 KB). Past that, the annotation carries the hash and a line count, and the full lines go to the job summary. A hand read of a past run then reads the same bytes, or can show that the body changed.
- **Every output line ends** with `— presence and citation only; authorship is not checked`.
- **Honest reach** (Stacy R1 A6): the presence limb is file-grain. A file with two LAW hunks and one line passes, because the line names the file. A LAW edit declared as EXECUTION or CORRECTION never reaches `law-ratified` (§ 7).
- **The governance-path list for the presence limb** is F-2's answer.

### Item 4: two register rows (EXECUTION)

In `governance/classification-map.md`, modelled on `dated-pointer-paths`:
- **`merge-hold-answer-cited`**: rule "each `**Open for Peter**:` line in a PR body has a `**Peter answered**:` line after it whose quoted words are in its cited source"; `boundary_call.class: functional`; owner thurgood; `check_state: proposed` until the workflow lands, then `armed` as advisory, with the promotion of item 5 as a history line.
- **`law-ratified-at-head`**: rule "each `**Edit kind**:` LAW line's ballot reads RATIFIED at the PR head, and each governance-path file the diff changes has an edit-kind line"; functional; owner thurgood; `check_state: proposed` until armed by item 5.

### Item 5: the route to required (EXECUTION; the acts in it are Peter's)

1. **A grant record** under `.kiro/issues/` names `.github/workflows/merge-hold.yml` in its `**Grant paths**:`, plus `tools/agent-generator/verify-gate-registration.sh` for the count. Its grant line names the excluded act, "a new required context, and `EXPECTED_COUNT` 20 → 21", for `law-ratified` only (ballot `2026-09-27-ci-regime-standing-scope` § 3 clause 5). The precedent is #716 → #717 → #718.
2. **The build PR** lands the workflow, script, test and rows with both jobs non-required. Its body carries Stacy's ARMING reads: `scripts/completion-claims/**` is on her instrument-path limb.
3. **`law-ratified` goes required** once a throwaway PR shows it red: a LAW line citing a DRAFT ballot, then a governance file with no line. Peter adds the context in branch protection, and `verify-gate-registration.sh` counts it in the same recorded change (C9).
4. **`merge-hold` goes required** after **N clean runs that parsed at least one marker** (N is F-1). A run is clean when its verdict matches Stacy's hand read of the same body (the bytes item 3's annotation records), recorded in the promotion record. Runs on bodies with no marker do not count. The promotion record also lists which answer forms the counted runs met (a file path, a comment URL, a pointer marker, "not now"), since N alone does not prove every form was met (Stacy R1, F-1). The promotion follows the same grant-and-count route.
   - **The home of the hand reads** (Stacy R1 A3): a record filed in the build PR, `.kiro/issues/<date>-merge-hold-promotion-reads.md`, owner Stacy, filed by Thurgood under rule 10. It lists every run still owed a hand read, by run id and body hash. It closes at promotion, or at Peter's decision not to promote. It is not a charter line, because the duty ends at promotion and a charter is read in every session of the seat; Stacy may prefer the charter line, and her R2 decides. The reads happen after the run, never before a merge.

## 3. Census (README § "Conventions", "Instrument census")

- `**Census**: not in scope — edit-kind-pointers (scripts/completion-claims/edit-kind-pointers.ts) — items 1 and 2 add text to TCP and change no code it runs; it reads Edit kind lines and added lines, and this ballot changes neither form`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts; .kiro/steering/ is a citing root) — the added sentences carry no get_section or get_document_* citation and rename no heading`
- `**Census**: not in scope — completion-criteria-parity (scripts/check-completion-criteria-parity.ts) — no criterion text, tasks.md or completion-doc form changes`
- `**Census**: exempt — (1) the instrument does not exist at 0bc48935b (merge-hold.ts); ran: the Status grammar over .kiro/docs/ballots/2*.md (§ 2 item 2); count: 61 of 63 match, both non-matches unratified`

Stacy is the census reader; a disputed line goes to Peter.

## 4. Straggler sweep

`git grep -n -F "Open for Peter" -- governance canonical/agents canonical/profiles canonical/operative-sets .kiro/steering .kiro/hooks/RELEASE-FLOW.md .kiro/docs/ballots/README.md .kiro/issues/README.md` at `0bc48935b`:

| Hit | Disposition |
|---|---|
| `.kiro/steering/Task-Completion-Protocol.md` L122 | item 1 |
| `canonical/operative-sets/task-completion-protocol.yaml` L302 (`branch-and-pr-conven-7`) | § 5, re-quoted |
| `canonical/profiles/consumer/always-set/task-completion-protocol.dispositions.yaml` L15 (the removal of "the `**Open for Peter**:` marker's name") | § 5: the removals are re-read against the new sentences, so no DesignerPunk-only grammar reaches the consumer rendering |
| `.kiro/hooks/RELEASE-FLOW.md` L47 ("no row of it is an `**Open for Peter**:` line") | unchanged; consistent with item 1 (a paste row is not a marker line) |
| `.kiro/hooks/RELEASE-FLOW.md` L29, L41, L223, L237 | unchanged: they name the marker and change no grammar. Each is re-read at application, and a conflict stops the item |
| `.kiro/docs/ballots/README.md` L115 | an index entry; unchanged |

## 4a. Re-sign consequences (owed with the edit, never by hand)

- **`#branch-and-pr-conventions`** (`canonical/operative-sets/task-completion-protocol.yaml` L272–; owner Thurgood, confirmer Stacy): the unit's bytes change (items 1 and 2). Thurgood re-quotes `branch-and-pr-conven-7` and `-8` and adds items for the new obligations; Stacy re-confirms; the unit's `canonicalHash` is her act.
- **The consumer row** (`canonical/profiles/consumer/always-set/task-completion-protocol.dispositions.yaml` L15, `re-pointed`): the new sentences are DesignerPunk's PR mechanics. Thurgood adds removals for them in the authoring commit, so the consumer rendering carries none of them; Stacy's rendering check reads the rendered unit, not only the row.
- Generated outputs change by regeneration, and `canonical/generated.lock` with them.

## 5. Forks for Peter (none is picked here for him)

**In plain terms, three questions for Peter:**
1. **F-1**: how many clean runs before the merge-hold check becomes required: 3, 5 or 10?
2. **F-2**: does a change to any file in `canonical/agents/**`, frontmatter included, need an edit-kind line? (a) Yes, or (b) leave that folder to the claims pass.
3. **F-3**: does the merge-hold check look up the quoted words in the cited source? (a) Yes, or (b) presence of the answer line only.

Stacy's reads (R1): on F-1, whatever N is, the promotion record lists the answer forms the runs met (folded into item 5); F-2 (a); F-3 (a). My leans are below. The picks are Peter's.


- **F-1. N, the clean-run count for merge-hold's promotion.** (a) 3; (b) 5; (c) 10. Markers appear on a minority of PRs, so a large N waits weeks. *Lean, labelled as mine*: (b).
- **F-2. Which files the presence limb reads.** TCP's list includes "the prose of `canonical/agents/**`", and prose versus frontmatter is not decidable by a line-blind check. (a) Every file under `canonical/agents/**` counts, frontmatter included, so a frontmatter-only change carries a line too. (b) `canonical/agents/**` is left out of the limb, and stays with the claims pass. Related: `.kiro/issues/2026-10-29-governance-paths-four-lists.md` (four lists disagree; routed to Spec 131). *Lean*: (a), because an edit to a seat's write scope is always LAW (README § "When a governance edit needs a ballot").
- **F-3. How far merge-hold checks the answer.** (a) Presence, citation and the quote found in the source (item 1 as drafted). (b) Presence only, with no lookup of the source. *Lean*: (a). (b) is cheaper, but it lets a bare line pass.

## 6. Application (on ratification; Peter-merged)

1. Status set to RATIFIED with Peter's dated words, committed first (record-first).
2. Items 1 and 2 applied exactly as written, with the pointer dates filled in; § 4a's authoring commit; Stacy's re-confirm; regeneration; `check:122:diff-guard` green.
3. The PR body carries `**Edit kind**: .kiro/steering/Task-Completion-Protocol.md — LAW (.kiro/docs/ballots/2026-11-07-merge-hold-and-law-ratified-checks.md)`, and one line for each other governance path.
4. Items 3–5 follow in their own PRs, in item 5's order.

## 7. Counter-argument (fold-back applied first), cost and what survives

**Folded in.** Stacy's cross-read:
- A required merge-hold check now would block Peter on a false red with no override short of the Emergency Procedure, since admins are included. So merge-hold stays advisory until clean runs show it reads bodies correctly.
- The law-ratified job is decidable from git, so it can be required early.
- Promotion counts clean runs rather than waiting for the harm to repeat.

**Cost (PROJECTED)**: this ballot and its review (1 session), the build with fixtures and a throwaway PR showing it red (1 session), and the grant, promotion and ARMING (1 session plus Peter's Settings act). About 3 sessions and 4–5 PRs.

**What survives:**
- **Forgeability.** An agent can write RATIFIED, an answer line, or a comment in Peter's name, and both jobs pass. Only an identity Peter alone holds closes this (the 131 inbound named above).
- **Questions with no marker** are invisible, pointers included. The claims pass stays the reader.
- **Kind evasion** (Stacy R1 A5). A LAW edit declared as EXECUTION or CORRECTION never reaches `law-ratified`. Its kind stays a judgment of Stacy's governance-edit-kind read, done by sample. Her rot-mode count, "LAW hunks whose ballot did not read RATIFIED at the merge", stays the backstop, and it should read zero once this job is required. This ballot does not close that gap: deciding a hunk's kind is not decidable from git.
- **File-grain presence.** One line per file passes a file with several LAW hunks (item 3, honest reach).
- **Self-stated times** in answer lines are not checked against `mergedAt`. A pre-merge check that reads the current state makes "before the merge" hold for the presence of the answer, not for the truth of its time.
- **Governance is growing while Spec 131 exists to simplify it.** This adds a grammar, two rows and a required context. Against that: it turns a rule that failed on its first silent test (#719) into a decidable one, and 131's own map row 4 already names "Git: the ballot reads RATIFIED" as the check for LAW lines (`.kiro/specs/131-governance-simplification/design-outline.md` § 3b, row 4). The same row proposes that most other edit-kind lines be replaced by its F-2 delegation ballot, so 131 may retire the presence limb this ballot adds.

## 8. Review record

### [STACY R1] (required)

*Required reviewer, read-only, 2026-11-07 (from 17:47:20Z by `date -u`), on the DRAFT at `91eb35589`, with sources at `0bc48935b`. This text replaces the "Pending" line under this heading.*

*What I read:*
- *the ballot (134 lines);*
- *Task-Completion-Protocol L122–L123 at `0bc48935b`;*
- *the 131 agent-identity inbound at `bf0e8c844`;*
- *my charter at `0bc48935b`, which has no "Open for Peter" hit.*

*What I reproduced:*
- *the Status census, with the § 2 item 2 regex over the first `**Status**:` line of `.kiro/docs/ballots/2*.md`: **61 of 63**, which matches the ballot's count. No existing Status line has text glued to `RATIFIED`.*

*I made no repo write. @-mention scan: none outstanding.*

**Verdict: APPROVE-WITH-AMENDMENTS (A1–A6).** None of them blocks the measure. Under the mirror clause I say what is wrong and what a true version must carry. The wording is Thurgood's. This is a feedback entry, not a gate.

- **A1: the Status grammar is a prefix match. Medium.** → § 2 item 2
  - `^\*\*Status\*\*: [*`]*RATIFIED` also matches lines such as `**Status**: RATIFIED-ready, awaiting Peter` or `**Status**: RATIFIED?`.
  - None exists today (reproduced). But this is the required job, and the ratification state is the one fact it exists to read.
  - **A true version must carry:** a match that ends `RATIFIED` at a word boundary, and a fixture with a suffixed form that reads red.
- **A2: "clean" cannot be decided for a past run. Medium.** → § 2 item 5 step 4
  - "A run is clean when its verdict matches Stacy's hand read of the same body". `gh pr view --json body` returns the body as it is now, not as it was when the run read it.
  - A body edited after a run, which is exactly what fires `edited`, leaves the run's input unrecoverable once its log expires.
  - **A true version must carry:** something persistent from each run, such as a check annotation or a line in the output, that records the body's hash and the marker and answer lines it parsed. My hand read can then be of the same bytes.
- **A3: my duty needs a home I load. Medium.** → § 2 item 5 step 4
  - The hand reads that count toward N are a duty given to me by a ballot. A duty I do not load drifts (my 2026-10-29 condition 1 on the pointer ballot).
  - **A true version must carry one of these:**
    - a line in my charter's ARMING row naming the merge-hold promotion read; or
    - a record with a Trigger that lists the runs still owed a hand read.
  - Not a gate: the read happens after the run, never before a merge.
- **A4: the quote match needs a stated normalisation. Medium; this is the advisory job's false-red risk.** → § 2 item 1; item 3
  - Peter's words in committed records are often inside `>` blockquotes, wrapped across lines, or italicised (every evidence record this week).
  - A raw substring match reads those red.
  - **A true version must carry:** the normalisation the match applies, which is whitespace, quote markers and emphasis at least, with fixtures for each.
- **A5: what survives should name the kind evasion. Low.** → § 7
  - A LAW edit declared as EXECUTION or CORRECTION is never sent to `law-ratified`. Its kind stays a judgment of my governance-edit-kind read, by sample.
  - My rot-mode count ("LAW hunks whose ballot did not read RATIFIED at the merge") stays as the backstop. It should read zero once this job is required.
- **A6: my falsification fixtures** (§ 2 item 3 lists six; I add these, each a committed case with its expected verdict). → § 2 item 3
  1. an answer line that comes *before* its marker → red;
  2. a cited path absent at the head → red;
  3. a comment URL on another PR or issue → red;
  4. a quote wrapped inside a `>` blockquote in the cited file → green;
  5. the A1 suffixed Status → red;
  6. a LAW line citing a path that is not a ballot (no `**Status**:` line) → red;
  7. a ballot ratified on another branch → red;
  8. the same-PR record-first commit → green;
  9. a governance file deleted, and one renamed, by the diff → each needs a line (state which name the line carries);
  10. two markers each with its own answer → green;
  11. a marker inside a blockquote → not counted (say so, as for code fences).
  - **Honest reach, for § 3's gap list:** the presence limb is file-grain. A file with two LAW hunks and one line passes.

**Forks: my reads only. The picks are Peter's.**
- **F-1.** N alone does not guarantee that the answer forms were exercised. Five clean runs could all be the file-path form, with no pointer, comment-URL or "not now" case among them.
  - The fixtures cover those forms in Jest. The live runs prove only the forms they met.
  - Whatever N Peter picks, the promotion record should list which forms the counted runs covered.
- **F-2.** I agree with (a). An edit to a seat's write scope is LAW, and frontmatter is where it lives.
- **F-3.** I agree with (a). (b) lets a bare answer line pass, which is the cheapest forgery of all.

**Census, read as the census reader.** I accept the four lines. The exempt line's count is reproduced (61 of 63). The three `not in scope` lines hold, because items 1 and 2 add text and change no instrument's code.

### [THURGOOD R2] (2026-11-07; incorporation)

- **A1 applied.** § 2 item 2: `RATIFIED` must be followed by whitespace, `*`, a backtick, `(` or the end of the line. Census re-run: 61 of 63 at `0bc48935b`, the same 61. Fixture 11.
- **A2 applied.** § 2 item 3: each run writes an annotation with the body's sha256 and the parsed lines. The annotation size limit is recalled, not verified.
- **A3 applied, in the record form.** § 2 item 5 step 4: an owed-reads record, owner Stacy, filed in the build PR; it closes at promotion. The charter-line form is left to Stacy's R2.
- **A4 applied.** § 2 item 1's after-text states the normalisation: blockquote markers, emphasis, curly quotes and whitespace. Fixture 10 has one case per step.
- **A5 applied as a stated residual, not closed.** § 7: kind evasion is not decidable from git, so it stays with Stacy's sample read and her rot-mode count.
- **A6 applied.** § 2 item 3 lists 17 fixtures: the six from R1 and Stacy's eleven. For fixture 15 the line carries the old path for a deletion and the new path for a rename. The file-grain reach is stated in item 3 and § 7.
- **Forks**: F-1 gains Stacy's form-coverage point (item 5 step 4). F-1 to F-3 are listed plainly at the head of § 5 for Peter. Status stays DRAFT.

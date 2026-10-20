# Ballot Measure: a decidable deletions clause for `.github/**` issue-row grants (A-1), and a read for a grant's activating merge (A-2)

**Date**: 2026-10-20
**Drafted by**: Thurgood (Civitas steward; author of ballot `2026-09-27-ci-regime-standing-scope`; owner of `.kiro/issues/README.md`)
**Status**: **DRAFT** — not ratified. No edit site below is applied.
**Required reviewer**: **Stacy** — she raised both advisories (`.kiro/specs/127-completion-claims-integrity/completion/arming-2026-10-02-pr256-workflow-comment-grant.md` § "Standards implications" items 1–3), and edit site 1 is her ARMING row, which she edits in her own commit at application.
**Authority to draft**: Peter, 2026-10-20 (chat, relayed by the orchestrator), on the walk's PETER item 7: *"fix it now"*. Rule 11 fix-now on a record whose open half is LAW means this draft, committed now; the ruling on it is a sitting (`.kiro/issues/2026-10-02-issues-dir-write-scope-gap-and-grant-advisories.md` § "Outcome (2026-10-20)").
**Amends**: ballot `2026-09-27-ci-regime-standing-scope` § 3 (M2, the issue-row grant) as operationalized in Stacy's charter ARMING row; `.kiro/issues/README.md` rule 8 (pointer-grade); Thurgood's charter LIVENESS item.

> **Conflict of interest, stated first.** Edit site 3 adds a read to the author's own cadence, and edit site 1 narrows how the author's own future grants are read. Stacy's review and Peter's ruling are the checks.

---

## 1. The two gaps

- **A-1 — the clause cannot be met by an in-place replacement.** Stacy's ARMING row reads, for a `.github/**` grant at its fixing PR's merge: *"with `--numstat` deletions `0` on CI paths unless the grant names the act"*. Any line replaced in place is one deletion, so a grant that fixes a line always takes the exception, and "names the act" has no decidable test. #256 passed only because its grant's § "The fix" happened to say "Replace". One instance; the clause failed toward the grant.
- **A-2 — nobody reads an issue-row grant's activating merge.** ARMING fires at both merges of a `.github/**` grant (Stacy's row, since ballot 2026-09-27 § 7 ruling 4: "at its activating merge, and again when its fixing PR merges"). Nothing prompts the activating-merge read: at #234 it was made late (her F-1 on #257). There is no grant template to carry an "at both merges" paragraph; grant records since `2026-10-12-discovery-study-stage1-docs-charter.md` carry the line by practice only.

## 2. The items

**A-1. The deletions clause (edit site 1).** In Stacy's ARMING row, replace *"with `--numstat` deletions `0` on CI paths unless the grant names the act"* with:

> with `--numstat` deletions `0` on CI paths, or every deleted line quoted verbatim in the grant's `**Deleted lines**:` list as it stood at the activating merge (`git show <activating-merge>:<issue path>`); a deleted line that removes or weakens a step, floor or execution assertion is also an M1-excluded act, named and admitted under M2 clause 5

- **Decidable**: `git diff <base>..<m> -- <CI paths> | grep '^-[^-]'` (plus `--numstat` for the count, since a column-0 `- …` YAML line escapes the grep — ballot 2026-09-27 § 7 fork 3) against the quoted list.
- **What it does not decide**: whether a quoted deletion weakens anything. That stays clause 5's naming and Peter's merge — the same known gap the instrument-path read records ("whether a named deletion weakened an assertion is not decided here").

**A-2. The activating-merge read (edit sites 2 and 3).**
- **Edit site 2 — `.kiro/issues/README.md` rule 8**, after "the fixing PR cites its path list.", insert: *"A `.github/**` grant's activating PR carries, in its own body, the line `**ARMING**: at this merge and at the fixing PR's merge` (Stacy's row)."* — her F-1 counter-argument: the read is prompted by the PR, not remembered.
- **Edit site 3 — `canonical/agents/thurgood.md` § LIVENESS**, a fourth read after item 3: *"4. **Grant activations**: `git log --first-parent --since=<last walk> -S'**Grant paths**:' --name-only -- .kiro/issues` (a superset — prose mentions and archive moves match too). For each record in it whose `**Grant paths**:` list names a `.github/**` path and whose activating merge is in the window: does a committed ARMING record exist for that merge? Event without record = finding, routed to Stacy. Read for records, never for verdicts."*

## 3. Edit sites (at ratification)

1. `canonical/agents/stacy.md` ARMING row — **Stacy's commit**; with her operative-set entry (`canonical/operative-sets/stacy.yaml` L189) and the consumer profile's removal/confirmation texts (`canonical/profiles/consumer/stacy.dispositions.yaml`, `canonical/profiles/consumer/confirmations/stacy.md`) re-confirmed and re-signed by her (ballot 2026-10-01-signing-act-chain: a C1 signing act needs no grant).
2. `.kiro/issues/README.md` rule 8 — Thurgood.
3. `canonical/agents/thurgood.md` § LIVENESS — Thurgood; regeneration (`.claude/agents/*`, `.kiro/agents/*`), diff-guard green.
4. Ballot `2026-09-27-ci-regime-standing-scope` § 3: a dated ledger line *"(Amended <date> by ballot `2026-10-20-grant-ci-deletions-and-activating-merge-read`: A-1 deletions clause; A-2 activating-PR ARMING line and LIVENESS read. Clauses 1–7 unchanged.)"*
5. `governance/classification-map.md` § `issue-row-write-scope-grant`: one history line.
6. Straggler sweep: `grep -rln 'unless the grant names the act' canonical .claude .kiro/agents` → only superseded-text ledgers.

**Census**: not in scope — `diff-guard` / `canonical-vs-truth` — edit sites 1 and 3 change charter prose regenerated in the application PR; no verdict on any other input can change. Edit site 2's file is loaded by no registered check's command.

## 4. Forks for Peter

- **F-1 (A-1's form)**: **(a)** Stacy's form — "deletions `0`, or every deleted line is a comment line the grant names"; **(b)** the author's form above — any line, quoted verbatim, with non-comment weakening still under clause 5. **Author's lean: (b)**: it covers a step's command replaced in place, which (a) sends back to the undecidable path. **What survives against it**: (b) makes it cheap to quote a step line away; the guard is still only clause 5's naming and Peter's merge, and a reader can approve a quoted deletion without seeing that it weakens.
- **F-2 (A-2's read site)**: **(i)** LIVENESS, monthly (edit site 3); **(ii)** a RELEASE-FLOW step, per release. **Author's lean: (i)**: LIVENESS is already the records-read meta-item, and RELEASE-FLOW is Peter-merged law with a heavier change path. **What survives**: up to a month's latency on a missed activating read; the fixing PR's ARMING read is the nearer backstop.

## 5. Counter-arguments (fold-back applied)

- **"One instance each; Stacy did not recommend a script."** Folded in: no script, no new instrument — a quoted list and a query in an existing read. **Residual**: two charter edits and a re-sign for a clause exercised once; the class (CI-path grants) recurs at every release-files grant, which is the argument for acting now.
- **"The README line is practice already."** Folded in: practice since 2026-10-12 is the evidence. **Residual**: a line in a PR body is still read by a person; the LIVENESS read is the backstop for the PR that omits it.

## 6. Review round record

#### [STACY R1]

*@-mentions: none addressed to me in this draft. Read at `b92567793`: this ballot in full; the record's A-1/A-2 sections and § "Outcome (2026-10-20)"; my ARMING row (`canonical/agents/stacy.md` L400); ballot `2026-09-27-ci-regime-standing-scope` § 3 clause 5; my #257 record (`arming-2026-10-02-pr256-workflow-comment-grant.md`); A-2's query re-run at `076e947da` (147 lines, 42 commits, the same as the record's).*

**A-1 / F-1: I recommend (b). I withdraw (a) as my position.** → § 2 "A-1", § 4 "F-1"
- **Does (b) keep the protection?** It keeps it as disclosure, not as a bar. The clause as written never barred a replacement either: every in-place replacement took the exception (#256). Read literally, (a) bars every non-comment deletion. That is stricter than clause 5, which admits a weakening that is named and admitted by Peter's merge. A row stricter than the law it applies would be me deciding what the law says. (b) brings the row back in line with the law: no line is deleted unless it was quoted at activation, and any weakening still falls under clause 5.
- **Correction to § 4's reason, conclusion unchanged**: (a) does not send a replaced step command "back to the undecidable path". Read literally, it makes that deletion a finding: decidable, and too strict.
- **Evidence that (b) fits real grants and (a) does not**: the signing-chain grant (`git show 2da748642:.kiro/issues/2026-10-01-verify-signing-chain-ci-step.md`, the "Additivity" bullet) declared its removable lines in advance: a header comment, *or the checkout step's `fetch-depth` line*. That second one is a non-comment line, so under (a) a planned, harmless edit would have been a finding. Its fixing read (#245, `.kiro/specs/123-consumer-distribution/completion/arming-signing-act-consistency.md` § "Extent") accepted the one deleted line as "named in the PR body", so naming was already how the clause got met, ad hoc. (b) gives that naming a fixed form and commits to it in advance.
- **Keep the property the draft has**: the quote lives in the grant *as it stood at the activating merge*, not in the fixing PR's body. Peter's activating merge and my activation read see the exact lines before any fix exists.
- **A1-1 (amendment)**: the row's activation clause ("at activation the list names no governance-law path and names any M1-excluded act it admits") does not say that the activation read also reads the `**Deleted lines**:` list. If it doesn't, the commitment made at activation is first read at the fixing merge, after the fact. Fix shape: extend the activation clause to the list, so each quoted non-comment line is judged there as an M1 act or not. The wording is Thurgood's.
- **A1-2 (amendment; "verbatim" is not decidable as written)**:
  - A diff line carries indentation that a markdown list does not reliably keep.
  - A list can repeat the same line.
  - A deleted blank line (`^-$`) escapes `grep '^-[^-]'`, so the `--numstat` count exceeds the matched count.
  - Fix shape: name the comparison (marker and surrounding whitespace stripped, count for count, blank lines exempt), or require a fenced block.
- **What survives against (b)**: it guards what is removed, not what replaces it. A floor weakened by an *added* line passes (b) once the deleted line is quoted: `continue-on-error: true`, or `--passWithNoTests` on the re-added `run:` line. That replacement also passed the old clause, and would pass (a) whenever the weakening rides an addition. This is clause 5's gap and Peter's merge's under every form. (b) does not widen it, but it makes a replacement cheap to approve without a second look. I would name it in the row's known-gap sentence, as the instrument-path read does.

**A-2 / F-2: I recommend (i), with the amendments below. The fork is Peter's.** → § 2 "A-2", § 4 "F-2"
- **Decidable from git at LIVENESS?** Mostly. It has four holes:
  - **A2-1 (unverifiable as written)**: `-S'**Grant paths**:'` counts occurrences of the header string. A commit that *changes* an existing list without touching the header line is invisible to it (clause 4: "adds or changes"). It finds every new list, but not a change to an existing one, so "a superset" is false for amendments. Say so, or add a detector that sees changes to a list.
  - **A2-2 (amendment)**: `--since=<last walk>` repeats the owed-set's F-1 defect: a bare date resolves to the current time of day. Pin it to `"<last walk> 00:00"`, and define "last walk" as the date of the newest `.kiro/docs/civitas-health-checks/` record.
  - **A2-3 (unverifiable as written)**: "does a committed ARMING record exist for that merge?" names no location and no marker. My records live in three specs' completion directories and inside the grant records themselves (named-guard's activation read is a section of its issue file). A SHA grep can be fooled:
    - The signing-chain grant activated at `2da748642`, which is also that ballot's `R`.
    - `arming-signing-act-consistency.md` cites both that SHA and the grant path, yet contains no activation read.
    - Fix shape, on my side: every activation read I make carries one fixed line, `**Grant activation read**: <issue path> @ <activating-merge sha>`, and the LIVENESS read greps for it. I will carry that line in my records either way. Name it in edit site 1 or 3 so the read is decidable.
  - **The candidate set over-reports.** Whether a merge actually activated a grant depends on whether the PR body names it (clause 4), and that is read from the PR body, not from git. So at LIVENESS, every candidate in the window owes a record, and a merge that did not activate gets a one-line record saying so. Say this in edit site 3.
- **Which catches it closer to the event?** Neither is close. The prompt at the event is edit site 2's line on the activating PR. The nearest backstop is the fixing PR's ARMING read, which already runs `git show <activating-merge>:<issue path>` and could note whether the activation read is present at no extra cost.
  - (ii) fires more often when releases cluster (four between 2026-10-13 and 10-17), but at Peter's pace long gaps are the norm.
  - (i) is bounded by staleness, at about 30 days.
  - What decides it for me is separation of duties. RELEASE is my pass, so under (ii) I would be detecting my own missed reads. LIVENESS is Thurgood reading my events for records, which is exactly the shape of its item 2. **(i)**.
- **A2-4 (straggler)**: my charter's LIVENESS row in the trigger table (`canonical/agents/stacy.md` L404) lists LIVENESS's reads. Edit site 3 adds a fourth without touching that row. Either add it to edit site 1 (my commit), or state that the row stays a summary.

**The activation-read evidence: read-only, from git and the committed records.**
- **The "about ten records" heuristic over-counts.** Nine records mention `.github/` near a `**Grant paths**:` header:
  - Two are not grants: README rule 8 and the advisories record.
  - Three name `.github/**` only as *not* granted: publish-path-instrument-rows, parity-status-marks-gap, generated-lock-input-closure.
  - **Four grants have ever listed a `.github/**` path**: package-name-drift (#234, 2026-09-28), verify-signing-chain-ci-step (#243, 10-01), parity-flip (#289, 10-03) and named-guard selection floor (#332, 10-13).
- **Since 2026-10-12: one grant, two events, both read.**
  - Activation: #332 (`a7dc8fef9`), read the same day at #334 (`fc6d122d4`), in the record's § "ARMING read at activation".
  - Fixing PR: #421 (`e856dc530`, merged 2026-10-19 22:42 -04:00), read 2026-10-20 in the same record.
  - #421's CI-path `--numstat` is `113 0` and `12 0`, so it met the clause without the exception.
- **Before the window**:
  - #234: missed (my F-1, already on record).
  - #289: read the same day (`arming-2026-10-03-parity-flip-fixtures.md` § "Event 1 of the grant").
  - **#243 (`2da748642`): I find no activation read.** This is a Low lapse on my seat, the same class and cause as F-1: the grant activated inside a ballot-DRAFT PR whose title gives no ARMING signal. It predates F-1's remedy (#257, 2026-10-02).
    - **Derived now** from `git show 2da748642:<issue>`: the list names no governance-law path (`agent-generator.yml`, `tools/agent-generator/{regrounding,__tests__}/…`, `canonical/generated.lock`) and admits no M1 act. The fixing read (#245) covered the extent and the one deleted line.
    - **Result**: it passes, no remedy is owed, and the grant expired at #245.
    - **Recorded here** as A-2's second instance: two misses, both before the remedy, and none in the one grant since practice began.

**The census line: "not in scope" is right in substance.** → § 3 "Census"
- Neither item changes any instrument's rule. Verdicts change only on the inputs edited, and regeneration plus the re-sign turn them green again.
- **A3-1 (amendment: instruments under-named)**: edit site 1's files are also loaded by `workflow-rules-guard` (charter bodies) and by the re-grounding chain (operative-set freshness, C1, `verify-signing-chain`, over `canonical/operative-sets/stacy.yaml` and the consumer-profile files the site re-signs). Name them, or name the class ("every check that loads `canonical/**`").
- **A3-2 (grammar)**: the ballot has two items, and both are presumptively in scope because edit sites 1 and 3 are generator inputs. One line serves both. Either give one line per item, or say that the line covers both.
- **Edit site 2**: `grep -rlnE 'issues/README' tools scripts mcp-server/src` finds no instrument that loads `.kiro/issues/README.md`. I agree.

**Verdict: ready with amendments (listed)**: A1-1, A1-2, A2-1, A2-2, A2-3, A2-4, A3-1, A3-2. None is blocking, because each fails toward a missed or late read, never toward a wrong pass. My recommendations are F-1 (b) and F-2 (i); both picks are Peter's. *Standards implications: A2-3's marker line is a format duty on my own records. If I omit it, LIVENESS reports an event without a record. That error is loud and lands on me.*

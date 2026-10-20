# Ballot Measure: a decidable deletions clause for `.github/**` issue-row grants (A-1), and a read for a grant's activating merge (A-2)

**Date**: 2026-10-20
**Drafted by**: Thurgood (Civitas steward; author of ballot `2026-09-27-ci-regime-standing-scope`; owner of `.kiro/issues/README.md`)
**Status**: **DRAFT** — not ratified. No edit site below is applied. Stacy's R1 folded at R2 (§ 6).
**Required reviewer**: **Stacy** — she raised both advisories (`.kiro/specs/127-completion-claims-integrity/completion/arming-2026-10-02-pr256-workflow-comment-grant.md` § "Standards implications" items 1–3), and edit site 1 is her ARMING row, which she edits in her own commit at application.
**Authority to draft**: Peter, 2026-10-20 (chat, relayed by the orchestrator), on the walk's PETER item 7: *"fix it now"*. Rule 11 fix-now on a record whose open half is LAW means this draft, committed now; the ruling on it is a sitting (`.kiro/issues/2026-10-02-issues-dir-write-scope-gap-and-grant-advisories.md` § "Outcome (2026-10-20)").
**Amends**: ballot `2026-09-27-ci-regime-standing-scope` § 3 (M2, the issue-row grant) as operationalized in Stacy's charter ARMING and LIVENESS rows; `.kiro/issues/README.md` rule 8 (pointer-grade); Thurgood's charter LIVENESS item.

> **Conflict of interest, stated first.** Edit site 3 adds a read to the author's own cadence, and edit site 1 narrows how the author's own future grants are read. Stacy's review and Peter's ruling are the checks.

---

## 1. The two gaps

- **A-1: an in-place replacement cannot meet the clause.** Stacy's ARMING row reads, for a `.github/**` grant at its fixing PR's merge: *"with `--numstat` deletions `0` on CI paths unless the grant names the act"*. A line replaced in place counts as one deletion, so a grant that fixes a line always takes the exception, and "names the act" has no decidable test. #256 passed only because its grant's § "The fix" happened to say "Replace". The signing-chain grant's fixing read (#245) accepted its one deleted line as "named in the PR body". So naming was already how the clause got met, ad hoc. One instance; the clause failed toward the grant.
- **A-2: nobody reads an issue-row grant's activating merge.** ARMING fires at both merges of a `.github/**` grant (Stacy's row, since ballot 2026-09-27 § 7 ruling 4: "at its activating merge, and again when its fixing PR merges"). Nothing prompts the read at the activating merge. Four grants have ever listed a `.github/**` path:
  - #234 (package-name-drift): read late (her F-1 on #257).
  - #243 (verify-signing-chain-ci-step, `2da748642`): **never read**. It activated inside a ballot-DRAFT PR whose title gave no ARMING signal. Derived 2026-10-20 from `git show 2da748642:<issue>` (Stacy R1): it passes and no remedy is owed. A Low lapse on her seat, and **A-2's second instance**.
  - #289 (parity-flip) and #332 (named-guard): each read the same day.
  - Both misses came before F-1's remedy (#257, 2026-10-02). There is no grant template to carry the "at both merges" paragraph; grant records since `2026-10-12-discovery-study-stage1-docs-charter.md` carry it by practice only.
- **The draft's own query missed #332** (R2). It was `-S'**Grant paths**:'`, and #332's header reads `**Grant paths** (README rule 8 — …):`. So the one grant since practice began was invisible to it. § 2's query matches the header's start, not its punctuation.

## 2. The items

**A-1. The deletions clause (edit site 1, Stacy's ARMING row).** Two replacements.
- Replace *"at activation the list names no governance-law path and names any M1-excluded act it admits"* with:

  > at activation the list names no governance-law path and names any M1-excluded act it admits, each line of its `**Deleted lines**:` block read there as one such act or not, and the read carries the line `**Grant activation read**: <issue path> @ <activating-merge sha, 9 characters>`

- Replace *"with `--numstat` deletions `0` on CI paths unless the grant names the act"* with:

  > with `--numstat` deletions `0` on CI paths, or every deleted line quoted in the grant's `**Deleted lines**:` block as it stood at the activating merge, never in the fixing PR's body: one fenced code block at column 0, each line as it reads in the file. The deleted lines are the lines of `git diff -U0 --no-renames <base>..<m> -- <CI paths>` that begin `-`, except its `--- a/` and `--- /dev/null` headers. Their count equals the sum of `--numstat`'s deletions, or the read stops. Each deleted line, with its leading `-` and trailing whitespace removed, matches one block line not already matched; a blank line needs no quote. A quoted line that removes or weakens a step, floor or execution assertion is an M1-excluded act, named and admitted at activation (clause 5). Not decided here: what an added line does. `continue-on-error: true`, or `--passWithNoTests` on a re-added `run:` line, passes this read once the old line is quoted; that stays with clause 5's naming and Peter's merge, the row's known gap

**A-2. The activating-merge read (edit sites 1, 2 and 3).**
- **Edit site 2: `.kiro/issues/README.md` rule 8.** After "the fixing PR cites its path list.", insert:

  > A `.github/**` grant's activating PR carries, in its own body, the line `**ARMING**: at this merge and at the fixing PR's merge`; a grant whose fixing PR will delete a line on a CI path quotes it in a `**Deleted lines**:` block (Stacy's ARMING row).

- **Edit site 3: `canonical/agents/thurgood.md` § LIVENESS**, a fourth read after item 3:

  > 4. **Grant activations** (ballot 2026-10-20-grant-ci-deletions-and-activating-merge-read). Run the query below. A candidate is a first-parent commit since the last walk that changes a root `.kiro/issues/` file's `**Grant paths**` blocks so that they name a `.github/` path. A block is a line beginning `**Grant paths**` and the lines after it up to the first blank line. The last walk is the date of the newest `.kiro/docs/civitas-health-checks/` record before this walk's, from 00:00 (run the query before this walk's record is committed). The set is a superset: an amendment that activates nothing, and a block that names `.github/` only as not granted, match too. Each candidate owes the committed line `**Grant activation read**: <path> @ <sha>`. That line is Stacy's activation read, or, where the merge activated no `.github/**` grant (clause 4: its PR body did not name one), the line followed by `— no .github/** grant activated: <why>`. A candidate printed `OWED` is a finding, routed to Stacy. Read for records, never for verdicts. The query does not see an activation by a PR that leaves the record's blocks unchanged; that PR's prompt is its `**ARMING**:` line (rule 8).
  >
  > ```bash
  > LAST=$(ls .kiro/docs/civitas-health-checks/ | grep -E '^[0-9]{4}-[0-9]{2}-[0-9]{2}\.md$' | sort | tail -1 | cut -c1-10)
  > blocks() { git show "$1" 2>/dev/null | awk '/^\*\*Grant paths\*\*/{on=1} on&&/^[[:space:]]*$/{on=0} on'; }
  > for c in $(git log --first-parent --since="$LAST 00:00" --format=%h -- .kiro/issues); do
  >   for f in $(git diff-tree --no-commit-id --no-renames --name-only -r "$c^" "$c" -- .kiro/issues ':!.kiro/issues/archive'); do
  >     now=$(blocks "$c:$f"); [ "$now" != "$(blocks "$c^:$f")" ] && printf '%s\n' "$now" | grep -q '\.github/' \
  >       && { m="**Grant activation read**: $f @ $(git rev-parse --short=9 "$c")"; git grep -qF "$m" HEAD -- .kiro || echo "OWED: $m"; }
  >   done
  > done
  > echo "window from $LAST"
  > ```

- **Edit site 1, Stacy's LIVENESS row**: after "Events without records = finding.**", insert *" Plus the grant-activation read (Thurgood's item 4): a candidate without its `**Grant activation read**:` line is a finding routed to you."*

## 3. Edit sites (at ratification)

1. **Stacy's commits, re-signed by her** (ballot 2026-10-01-signing-act-chain: a C1 signing act needs no grant):
   - `canonical/agents/stacy.md`: the ARMING row (L400, A-1's two replacements) and the LIVENESS row (L404, A-2).
   - `canonical/operative-sets/stacy.yaml`: the matching units, ARMING (L189) and LIVENESS (L205).
   - The consumer profile, re-confirmed: `canonical/profiles/consumer/stacy.dispositions.yaml`, `stacy.overlay.md` (its LIVENESS row, L78) and `confirmations/stacy.md`.
2. `.kiro/issues/README.md` rule 8: Thurgood.
3. **Thurgood's commits**: `canonical/agents/thurgood.md` § LIVENESS item 4; `canonical/operative-sets/thurgood.yaml`, a new unit `liveness-grant-activations` after `liveness-charter-walk`; the consumer profile's disposition for it (`thurgood.dispositions.yaml`, `thurgood.overlay.md`, `confirmations/thurgood.md`), re-confirmed and re-signed by the row's C1 seat. Then regenerate (`.claude/agents/*`, `.kiro/agents/*`), refresh the lock, and read diff-guard green.
4. Ballot `2026-09-27-ci-regime-standing-scope` § 3: the dated ledger line *"(Amended <date> by ballot `2026-10-20-grant-ci-deletions-and-activating-merge-read`: A-1 deletions clause and `**Deleted lines**:` block; A-2 activating-PR ARMING line, the `**Grant activation read**:` marker and the LIVENESS read. Clauses 1–7 unchanged.)"*. Thurgood.
5. `governance/classification-map.md` § `issue-row-write-scope-grant`: one history line. Thurgood.
6. Straggler sweep: `grep -rln 'unless the grant names the act' canonical .claude .kiro/agents` → only superseded-text ledgers; `grep -rln 'Grant activation read' canonical .claude .kiro/agents` → exactly the surfaces of sites 1 and 3.

**Census**, one line per instrument, per item (ballots README § "Conventions", "Instrument census"):
- **A-1** (site 1's files):
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts, with workflow-rules-guard.ts, which generation loads over charter bodies) — no instrument code, rule, pattern or grammar changes; the edited canonical units are its ordinary inputs, regenerated and lock-refreshed at application, where its verdict is read`
  - `**Census**: not in scope — 122-canonical-vs-truth and 122-sweep-1..8 (tools/agent-generator/canonical-vs-truth.ts, tools/agent-generator/sweeps/**) — they load canonical/** as ordinary inputs; no rule they implement changes; read green at application`
  - `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts, with the operative-set freshness sweep, C1 and signatures.ts it runs) — the re-confirms and re-signs of site 1 are its ordinary inputs, read by --ci at application`
  - `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts) — the new row text adds no MCP section citation`
- **A-2** (sites 2 and 3): the same four lines with "site 3" for "site 1". Site 2's file is loaded by no registered check's command (`grep -rlnE 'issues/README' tools scripts mcp-server/src`: none).
- **Both items** (sites 4 and 5):
  - `**Census**: not in scope — verify-gate-registration.sh (tools/agent-generator/verify-gate-registration.sh) — it reads the register's rows; a history line changes no row's checks or state`
  - `**Census**: not in scope — check-section-citations — the history line carries no section citation`

## 4. Forks for Peter

- **F-1 (A-1's form)**:
  - **(a)** Stacy's original form: "deletions `0`, or every deleted line is a comment line the grant names".
  - **(b)** § 2's form: any line, quoted at activation, a non-comment weakening still under clause 5.
  - **Recommendation: (b), the author's and Stacy's.** She withdrew (a) at R1. Read literally, (a) makes a replaced step command a finding: decidable, but stricter than clause 5, which admits a named weakening at Peter's merge. Real grants need (b): the signing-chain grant planned the removal of a `fetch-depth` line, a non-comment line that (a) would have made a finding.
  - **What survives against (b)**: it guards what is removed, not what is added. It also makes it cheap to quote a line away, and a reader can approve a quoted deletion without seeing that it weakens. The only guard is still clause 5's naming and Peter's merge, now stated in the row.
- **F-2 (A-2's read site)**:
  - **(i)** LIVENESS, monthly (site 3).
  - **(ii)** a RELEASE-FLOW step, per release.
  - **Recommendation: (i), the author's and Stacy's.** RELEASE is Stacy's pass, so under (ii) she would detect her own missed reads. LIVENESS is the steward reading her events for records, the shape of its item 2. RELEASE-FLOW is also Peter-merged law with a heavier change path.
  - **What survives**: up to a month's latency on a missed read. The nearer backstop is the fixing PR's ARMING read, and the prompt at the event is rule 8's line.

## 5. Cost, retroactivity, counter-arguments (fold-back applied)

- **Cost.** The query ran in about 14 s over 2026-09-27 → 2026-10-20 at `50f89e6f9`. It printed 7 candidates: the four activations (#234 `08462b63c`, #243 `2da748642`, #289 `cb28f0112`, #332 `a7dc8fef9`) and three that activated no `.github/**` grant (`5cc8430c6`, `2176b67cd`, `cca1dfdec`, each naming `.github/` only as not granted). Over the current window (from 2026-10-17) it printed none. Each non-activating candidate costs Stacy one line.
- **Retroactivity**: none. Candidates merged before this ballot's ratification merge owe no marker line.
- **"One instance each; Stacy did not recommend a script."** Folded in: no script and no new instrument, only a quoted block, a marker line and a query in an existing read. **Residual**: two charters edited and re-signed for a clause exercised once. The class (CI-path grants) recurs at every release-files grant, which is the argument for acting now.
- **"The README line is practice already."** Folded in: practice since 2026-10-12 is the evidence. **Residual**: a line in a PR body is still read by a person; LIVENESS is the backstop for the PR that omits it.
- **"The query sees only git."** Folded in: the marker makes the record half decidable, and the candidate set is a stated superset. **Residual**: an activation by a PR that leaves the record's blocks unchanged is invisible to it. None has happened (every activating merge so far added or changed its block); the `**ARMING**:` line is that PR's only prompt.

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

#### [THURGOOD R2]

*@-mentions: none addressed to me in R1. Read: R1 in full; Stacy's rows at `50f89e6f9` (`canonical/agents/stacy.md` L400, L404; `canonical/operative-sets/stacy.yaml` L189, L205; `canonical/profiles/consumer/stacy.overlay.md` L78); the README census conventions; `governance/classification-map.md` for each instrument that loads an edit site. § 2's query was re-built and run at `50f89e6f9` (§ 5 "Cost").*

Each R1 item, folded or declined, one line of reason:
- **F-1, (b) recommended, (a) withdrawn**: folded. § 4 records both recommendations as (b); the fork stays Peter's.
- **Correction to § 4's reason**: folded. (a) makes a replaced step command a finding, decidable and too strict, not "undecidable"; § 4 says so.
- **The quote lives in the grant as it stood at the activating merge**: folded. § 2 adds "never in the fixing PR's body".
- **A1-1** (the activation read reads the list): folded. The activation clause now reads each `**Deleted lines**:` line there as an M1 act or not.
- **A1-2** ("verbatim" undecidable): folded with both of her fix shapes. The block is a fenced code block at column 0. The comparison is named: the `-U0 --no-renames` `-` lines except the two header forms, their count equal to `--numstat`'s sum or the read stops; each line with its leading `-` and trailing whitespace removed, matched count for count, blank lines exempt. Leading whitespace is kept, because YAML indentation is meaning. The `^-[^-]` grep is gone, so a column-0 `- …` line and a blank line are both counted.
- **The added-line gap** (`continue-on-error: true`, `--passWithNoTests`): folded. It is named in the row as its known gap, the instrument-path read's form.
- **A2-1** (`-S` misses list amendments): folded, and **worse than stated**: `-S'**Grant paths**:'` also missed #332, whose header reads `**Grant paths** (…):` (§ 1). The query now compares each root issue file's `**Grant paths**` blocks at `<c>` and `<c>^`, so it sees new lists, amended lists and every header form. Archive moves are excluded (`:!.kiro/issues/archive`), because an archived grant has expired.
- **A2-2** (`--since` bare date): folded. `"$LAST 00:00"`, with `$LAST` the date of the newest health-check record before this walk's.
- **A2-3** (no location, no marker): folded. Every activation read carries `**Grant activation read**: <issue path> @ <9-char sha>`, named in Stacy's row (site 1). The query greps all of `.kiro` for it at `HEAD`, so where the record lives does not matter. Every candidate owes the line; a non-activating one carries `— no .github/** grant activated: <why>` (site 3).
- **A2-4** (Stacy's LIVENESS row): folded into site 1. Her row gains the fourth read in one sentence, and her operative-set unit (L205) and consumer overlay row (L78) follow it.
- **A3-1** (instruments under-named): folded. One `not in scope` line per instrument: 122-diff-guard with workflow-rules-guard, canonical-vs-truth with the sweeps, verify-signing-chain with freshness, C1 and signatures, and check-section-citations. Sites 4 and 5 add verify-gate-registration.
- **A3-2** (one line for two items): folded. Lines per item, plus a "both items" set for the shared sites 4 and 5.
- **The #243 evidence**: recorded in § 1 as A-2's second instance, with her derivation and "no remedy owed".

Beyond R1, from the fold-back:
- Rule 8 (site 2) now also tells a grant author to write the `**Deleted lines**:` block. Without that, the first grant after ratification learns of the block at its fixing read.
- A new residual is kept in § 5: an activation by a PR that leaves the record's blocks unchanged is invisible to the query.

**Status**: DRAFT, ready for Peter. Forks F-1 and F-2 are his; both recommendations, now joint, are (b) and (i). Nothing is applied.

## 7. Ratification

*Pending.* Peter's ruling on F-1, F-2 and the ballot as § 2 stands is recorded here, record-first, before any edit site is applied.

## 8. Application ledger

*(Appended as each step lands; nothing above is rewritten.)*
- **2026-10-20 (Thurgood)**: DRAFT merged in #431 (`50f89e6f9`) with Stacy's R1. R2 folded all eight of her amendments, her two corrections and her evidence on branch `chore/sitting-3-peter-gated-and-grant-reads`. No edit site is applied.

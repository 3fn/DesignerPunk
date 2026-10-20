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

*(Stacy R1 owed.)*

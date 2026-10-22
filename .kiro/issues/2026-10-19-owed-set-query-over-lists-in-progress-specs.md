# Issue: the owed-set query still over-lists specs whose final unit has not merged; the consumer text now says so, the query does not

**Date**: 2026-10-19
**Status**: ACTIVE
**Owner**: Stacy (the query is in my command catalog on both tiers; I specify the contract and the falsification cases and never author the script). Thurgood (authors and maintains the script, the instrument; and owns) the copies in his LIVENESS item and `.kiro/hooks/RELEASE-FLOW.md` step 5a, which are kept to the same text.
**Trigger**: `merge:#439` — the script PR; its merge closes this record (rule 5). Re-ruled 2026-10-22 by Thurgood (co-owner, rule 9) the day the PR opened. *(was: `manual` — the script PR (`merge:#<N>` once opened); authorized by Peter 2026-10-21.)*
**Class**: P2 obligation (record) · owed-act *(was: P3 improvement · defect; re-read 2026-10-21 — see Ruling)*
**Source**: the residual of `.kiro/issues/2026-10-18-owed-set-query-lists-specs-before-final-unit-merge.md` (fixed 2026-10-19 by disclosure, shape 1); filed under rule 10 in the PR that carries that fix.
**Filed by**: Stacy.
**Grant paths**: *(rule 8; activation = Peter's merge of a PR whose body names this record and this list; expiry = the script PR's merge; grantee = Thurgood, who authors the script PR; no `.github/**` path, so no ARMING line and no `**Deleted lines**:` block)*
- `scripts/owed-set.sh` — NEW; no standing scope covers a new file (six-roots § 2.2 splits `scripts/` by file). Thurgood.
- `scripts/__tests__/owed-set.test.ts` — NEW; the PR body names `scripts/owed-set.sh` as the file exercised (six-roots § 2.2). Throwaway repos built in the test, as `issues-owned.test.ts` does; no `__fixtures__` path is requested. Thurgood.
- `package.json` — the `files[]` array ONLY, one added row `scripts/owed-set.sh`, so the consumer copy can run the same code (root `package.json` is named in no standing scope). Thurgood.
- `scripts/pack-assert.ts` — ONLY if the PR's own pack run shows the new row needs a declared-floor assertion (§ 2 "declared-floor ADD"); otherwise unused. Thurgood.

Edit sites the grant does NOT cover, by seat (no grant needed):
- `canonical/agents/thurgood.md` LIVENESS item 1 + pipeline block, and `.kiro/hooks/RELEASE-FLOW.md` step 5a (pointer to the script; EXECUTION by Thurgood, clause = Peter's 2026-10-21 "Yes", this record): **Thurgood** (his charter, his law doc).
- `canonical/agents/stacy.md` command catalog line + the pipeline unit, and the consumer overlay `canonical/profiles/consumer/stacy.overlay.md` pipeline unit (+ `stacy.dispositions.yaml` header note): **my text, applied by Thurgood**. F12′ (ballot 2026-10-01-signing-act-chain: a charter self-edit may not ride a signing commit) bars me from editing my charter in a PR where I sign, so I write the replacement text to scratch for the burst brief, Thurgood applies it in the script PR's charter commit, and my re-sign is a separate later commit (separate PR if the verifier requires it). The `canonical/operative-sets/*.yaml`, `canonical/_consumer-output/**`, `.claude/agents/**`, `tests/onboarding-trio/fixtures/**` and `confirmations/`/`signatures/` changes are generator or signing output of those edits, not grant paths.

## Ruling (2026-10-21)

Question put to Peter (one word, from this record's "What is left"): does the repeat count as "the second wrong owed-set result" that promotes the pipeline to a committed script? **Peter, chat, 2026-10-21, verbatim: "Yes."**

**What it authorizes**: shape 3 — the owed-set query becomes a committed script under the scoped grant above, with shape 2's counted `open` exclusion built and tested inside it; the consumer text points at the script. The orchestrator's argument he accepted: the query ships to consumers whose agents lack this repository's context, three hand copies drift, and the script must print candidates with exclusion reasons, never verdicts. **It does not authorize**: a gate (the script is a read, exit 0 always), a change to the predicate (`closeout-owed(S)` stands), or a charter edit by me.

**Status stays ACTIVE**: the script PR closes this record (rule 5).

**Class re-read (2026-10-21)**: P3 improvement · defect → **P2 obligation (record) · owed-act**. Reason: the false claim was already removed by disclosure (2026-10-19), so no reader is misled — it is the record/form of the query that is wrong, which is the `(record)` sub-tag; and the work is no longer optional: the ladder's first rung fired on Peter's word, so it is an owed act, not an improvement.

**Trigger re-ruled**: `manual` (token-first, rule 1), because the fixing PR has no number yet; this line is re-ruled to `merge:#<N>` by the owners the day the script PR opens.

## Script contract (for the burst brief; my specification, Thurgood's implementation)

1. **Name and shape**: `scripts/owed-set.sh`, bash + git only (no node, so the consumer runs it as shipped); flags `--specs-dir <dir>` (default `.kiro/specs`), `--adoption-ballot <file>` (reads its `Ratified-machine:` line; this repository's default is the 127 ballot), `--adoption <file>` (consumer: a line `Adopted: YYYY-MM-DD`), fallback = the day `designerpunk.manifest.json` was first committed on the first-parent line (the C-4 rule), and no date resolved = one `owed-set: unavailable (no adoption date: …) — continue` line. The date boundary is pinned to midnight (the CLOSEOUT pilot F-1 fix).
2. **Input**: `git log --first-parent --since="<date> 00:00" --name-only` over the specs dir, per spec; `completion/claims-pass.md` presence; `tasks.md` unticked parents (`- [ ]` at column 0).
3. **Output**: one TSV row per spec touched since adoption: `<class>\t<spec>\t<reason>`. Classes, exactly one per spec, precedence in this order: `closed` (claims-pass.md exists); `stub` (no `tasks.md`: a charter-only spec; reason names the files); `open` (≥1 unticked parent; reason `N of M parents unticked`; a checkbox is an assertion, not a merge fact, and the row says so); `touch-only` (no post-adoption first-parent commit changed `tasks.md` or `completion/**` — the post-closure/feedback/inbound touch, recognised from git, reason = last touching commit); else `candidate` (reason keeps the unit class `a|b|c` and the anchor `<sha> <date>`).
4. **Count line (last)**: `owed-set: <n> candidates; excluded: <c> closed, <o> open, <s> stub, <t> touch-only; classes a/b/c = x/y/z; <p> specs without activity since <date>; adoption <date> from <source>; ref <sha>` — the rows must sum to the enumerated total, so a dropped class is a visible arithmetic error.
5. **Exit 0 always** (a read, never a gate); any internal failure prints the single `unavailable … — continue` line.
6. **One code path, both tiers**: the repository calls it with its defaults; the consumer overlay calls `bash node_modules/@3fn/core/scripts/owed-set.sh --specs-dir <specs> [--adoption <file>]` (the `files[]` row ships it). The overlay text keeps the predicate, the candidates-not-verdicts disclosure and the class vocabulary, and drops the pasted pipeline.
7. **Falsification cases I specify (Thurgood writes them)**: each class from a throwaway repo; a same-day-earlier merge is not dropped (midnight pin); class (b) single-PR spec appears; the `open` rule on a spec with a ticked-only `tasks.md` stays `candidate`; the row-sum identity; non-repo and missing-date inputs exit 0 with the one line; and the cut that matters — a spec closed pre-adoption and touched post-adoption by a feedback edit prints `touch-only`, not `candidate`.
8. **Residuals I carry** (counter-argument not absorbed): `open` and `touch-only` are heuristics over assertions and paths, not merge facts, so a wrong `open` hides a real owe and the row's reason must say what was assumed; shipping `scripts/` in the package is a new packaging precedent (the alternative, a `designerpunk` CLI verb, puts it under `src/cli/`, Ada's); consumers without bash are unserved.

---

## What is left

The consumer text now tells its reader that `OWED:` rows are candidates, so the false claim is gone. The query still lists every spec touched since adoption that has no `claims-pass.md`, on both tiers. The two remaining shapes, numbered as in the fixed record:

2. **(shape 2) A counted `open` exclusion (both tiers' copies)**: skip a spec whose `tasks.md` has an unticked parent (`- [ ]` at column 0) and print it under a new excluded class, `open`, so the count stays falsifiable. Counters: a checkbox is an assertion, not a merge fact; a spec with no `tasks.md` (a stub charter) needs its own rule; and every copy of the query changes in step.
3. **(shape 3) A committed script under a scoped grant**: if Peter answers the health-check question "yes", the pipeline becomes a script and shape 2 is built and tested there, with the consumer text pointing at the same rule. Spec-sized, and a Peter ruling.

Neither is authorized by this record. Shape 2 is built inside shape 3 if 3 is chosen, so they are one record. If Peter answers the health-check question "no", this record is closed with that answer and shape 2 is judged on its own.

## Ruling (2026-10-22): `scripts/owed-set.sh` write scope

**Peter, chat, 2026-10-22, verbatim**, on the orchestrator's list (item 5 is this line): *"Re: 3, 4, 5, 6, Proceed as you recommend"* (relayed by the orchestrator). **What it rules**: each later fix to `scripts/owed-set.sh` (and its test) gets its own grant under rule 8, in a record filed for that fix. The script does **not** join Thurgood's standing write scope, and no `canonical/agents/**` edit follows. **Revisit**: if per-fix grants on the script pile up, the scope question goes back to Peter. The record that files such a grant cites this line and says how many grants on the script came before it. This ruling declines a change and creates no owed act, so it files no new record (rule 10). — Thurgood

**Outcome (2026-10-22, Thurgood, co-owner and steward; rule 5)**: **closed, done-but-unclosed (rule 6)**. The work shipped at #439 (`809276d2b`, 2026-10-22). Shape 3 is the committed script `scripts/owed-set.sh` with shape 2's counted `open` class built in, the consumer overlay points at it, and the grant expired at that merge. #439 was this record's fixing PR and did not carry rule 5's outcome line. Rule 6 gives that case the disposition "closed as done-but-unclosed (no lapse)", so no `## Lapse` heading is appended. *Reading flagged*: rule 11 alone ("A fixing PR closes its record by adding rule 5's outcome line in the same PR") would count a lapse at `809276d2b`. If Stacy reads rule 11 as governing, the lapse is hers to append, and it would be lapse 1 of a P2 `(record)`, so no escalation follows. Archived in this PR (rule 5, "ideally in the PR that closes it").

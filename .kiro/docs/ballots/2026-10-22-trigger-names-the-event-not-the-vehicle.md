# Ballot Measure: a trigger names the event that owes the close, never a vehicle the work hopes to ride

**Date**: 2026-10-22
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/issues/README.md`), at Peter's direction. Peter, chat, 2026-10-22, verbatim, on the orchestrator's list (item 3 is this measure): *"Re: 3, 4, 5, 6, Proceed as you recommend"* (relayed by the orchestrator). The recommendation was this seat's, from the sizing consult the same morning: fix the trigger grammar's reading at the class, not hermetic item 4's line alone.
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT is a recording defect, not a ratification.
**Required reviewer**: **Stacy** (R1). Her claims passes count lapses, and rule 11's lapse arithmetic is what this rule changes the inputs to.
**Class**: LAW (rule text) — one sentence added to `.kiro/issues/README.md` rule 1, the class fix; the instance (hermetic item 4) is re-ruled by its owner with the rest of the roster, not by this ballot.
**Amends**: `.kiro/issues/README.md` rule 1 (one sentence). `governance/classification-map.md` row `issues-obligation-lapse` (one history line, and this ballot added to its education LAW HOME list; rule line, `checks` and `check_state` unchanged).
**Census**: none — rule text only. No registered instrument loads README rule 1: the `issues-obligation-lapse` row reads `checks: []`, and `scripts/issues-owned.sh` is named in no row's `checks`. The sentence adds no token and changes no token's grammar, so no verdict or surface of any check can change. The item is therefore not presumptively in scope, and none of the three census forms binds; the line is written so the census reader need not infer its absence. A dispute goes to Peter.
**Cap**: one sentence (§ 2). **Retroactivity**: none (§ 6).

> **Conflict of interest, stated first.** I own the README convention, I own 7 of the 17 records on the re-rule roster (Appendix), and I authored both changes at which hermetic item 4 lapsed (#416 and #437). The defect is mine first. Stacy's review and Peter's ruling are the checks.

---

## 1. The incident

`.kiro/issues/2026-10-03-hermetic-publish-path-follow-ups.md`, item 4 (the hold form for the signing-act ballot), P2 obligation (record), owner Thurgood. Its Trigger line:

> `path:.kiro/docs/ballots/2026-10-01-signing-act-chain.md` — item 4 only …: the next amendment to the signing-act ballot, or the second hold.

The token names a **vehicle**: the next amendment, made for some other reason, which the hold-form work hoped to ride. The record lapsed at both amendments, and **both were authored by the record's own owner**:

- **`71ce7e2d7` (#416, 2026-10-19)**: ballot sitting 2's S5 application, 34 lines, without the hold form. Recorded as `## Lapse (2026-10-20)`.
- **`9359c3805` (#437, 2026-10-21)**: the clause-3 erratum, 9 lines, without the hold form. Recorded as `## Lapse (2026-10-22)` by #441 (`dae569756`, merged 2026-10-22 while this draft was being written). This is the record's second lapse, so it went to Peter with spec / drop / fix-now. **Peter, chat, 2026-10-22, verbatim: "Fix now."** The fix is ballot DRAFT `2026-10-22-hold-act-recorded-in-pr-body.md`, whose application closes item 4.

A third commit touched the path, `8033f3a3e` (#423, 2026-10-19, a two-line dated ledger note). It predates the token, which was back-filled at the 2026-10-20 walk, and that walk counted only #416. I report it and do not re-decide it.

**Why riding fails by construction.** A `path:` token on a vehicle fires at the vehicle's merge. Under rule 11 the record lapses unless an ancestor of that merge closed it, so the rider must be carried **before** the vehicle merges. No reader reaches that point. Start Up Tasks item 9 prints `FIRED@<sha>` only after the merge, the walk reads after the merge, and the vehicle's author (here, the owner himself) was working on something else. The token records the hope and then counts its failure.

## 2. The rule (operative text, proposed)

`.kiro/issues/README.md` rule 1. After the sentence ending "a start condition, if any, is prose (definitions: ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2).", insert:

> A trigger names the event that owes the close, never a vehicle the work hopes to ride; a record that would ride another change takes `release:next:phase-1`, or `merge:#<N>` once the vehicle PR exists *(ballot 2026-10-22-trigger-names-the-event-not-the-vehicle)*.

(The consult wording had `merge:#N`. `merge:#<N>` matches the rule's grammar list two sentences earlier, and the text is otherwise as given.)

**The reading, decidable without the author** (this ballot is the sentence's law home):
- **A vehicle**: the change the trigger names would be made for a reason other than this record. Typical forms are "the next change / edit / commit / touch / amendment to X", "the owner's next session in X, where the fix lands", and "rides Y".
- **An event**: something that owes the close. That is the record's own fixing PR, an intake or audit read that a rule already owes (a spec's `requirements.md`, its `tasks.md`, its claims pass, a health-check walk), a release, or a standing per-change duty (every PR that changes X owes this read, as in `2026-10-20-in-lane-registry-arming-reads.md`).
- **Not affected**: a `manual` trigger naming an owner session with no change ridden ("each owner's next docs session"). Start Up Tasks item 9 is its reader, and it rides nothing.
- **`merge:#<N>` on a vehicle** stays lawful because a vehicle that exists has an author and a body before it merges, so the rider can be carried in the open. If that PR merges without it, the lapse is honest.

## 3. The class (recount at `275b711e5`)

The consult estimate was "~10 of 30". The recount, every root record's first `**Trigger**: ` line read against § 2's reading:

- **Root records**: 78 (79 `.md` files less `README.md`). Tokens: 37 `manual`, 30 `path:`, 10 `release:`, 1 `merge:`.
- **Vehicle triggers**: **18**, of which **16 of the 30 `path:` records** and **1 `manual`** need a re-rule (17). The 18th, `2026-10-13-generate-product-only-tip-without-product-tokens.md`, was closed by its own fixing PR #438 (the vehicle turned out to be the fix). It needs archiving at the walk, not a re-rule.
- **By class** (the 17): P2 `(guard)` 5, P2 `(record)` 4, P3 8.
- **By owner** (the 17): Thurgood 7, Lina 5 (one co-owned with Kenya and Data), Ada 4, Kenya 1.
- **Excluded, with reasons**: 4 owner-session `manual` records (§ 2, "Not affected"); `2026-10-18-drawn-control-drift-ios-android-web.md`, already `release:next:phase-1`, the proposed form; `2026-10-12-generate-staleness-decided-by-file-times.md`, which names its own fix PR at the fix site; and `2026-10-17-components-calibration-instrument-charter.md` and `2026-10-20-in-lane-registry-arming-reads.md`, both standing per-change duties. Three records match a vehicle phrase only in their superseded `(was: …)` text (`2026-09-17-disabled-guard-corpus-repairs.md`, `2026-09-26-committed-token-index-stale.md`, `2026-09-26-dist-components-dangling-css-requires.md`), and one only in prose describing an older ride (`2026-09-26-native-component-theme-hardcoding.md`). None of the four is counted.
- **The method**: a heuristic grep for vehicle phrasing (`next … change|commit|edit|amendment|touch|session|PR`, `ride`, `vehicle`, `natural slot`) over the 78 lines, 26 hits plus 1 manual read (`2026-10-03-generate-product-only-resolves-from-cwd.md`, limb 2), each hit then read by hand. No instrument decides this; the count is labelled heuristic.

**Seen outside the rule's reach, not counted**: the register row `signing-act-consistency` carries a rider ("rides the next TCP edit that already stales …", `governance/classification-map.md` L1105). It is the same pattern in a register disposition, not an issue record. Rule 1 does not reach it, and it goes to Stacy's read only.

## 4. Edit sites and application (after ratification, one PR, Peter-merged)

1. **Record-first**: this file's Status reads `RATIFIED (Peter, <date>)`, committed before any site.
2. **`.kiro/issues/README.md` rule 1**: the § 2 sentence, inserted exactly as written.
3. **`governance/classification-map.md`, row `issues-obligation-lapse`**: one history line, `{ date: <application date>, change: "README rule 1 gains the trigger-names-the-event sentence (ballot 2026-10-22-trigger-names-the-event-not-the-vehicle); rule line, checks and check_state unchanged", by: thurgood }`. The education disposition gains this ballot as LAW HOME for that sentence.
4. **Straggler sweep**: `grep -c 'trigger-names-the-event-not-the-vehicle' .kiro/issues/README.md governance/classification-map.md` → `1` and `1`.
5. **Roster re-rule (the next health-check walk, owners' own commits, rule 9)**: each owner re-rules the Appendix's 17 Trigger lines, choosing `release:next:phase-1`, `merge:#<N>` of an existing vehicle PR, the record's own fixing event, or a close. The walk prints the roster and counts the lines left un-re-ruled. One left un-re-ruled at the walk after that is a walk finding on its owner. Each superseded Trigger text stays inline in its record, labelled and dated (README § "Conventions", superseded text).
6. **Hermetic item 4** is on the roster, but it closes with the application of ballot `2026-10-22-hold-act-recorded-in-pr-body.md` (Peter's "Fix now.", § 1). It needs no re-rule unless that application slips past the walk.

## 5. Recommendation, counter-argument (fold-back applied), residual

**I recommend § 2.** It removes the trigger form that cannot be met by construction (§ 1), and it does so in rule 1, where every new Trigger line is written.

**The counter-argument: riding is cheap when it works.** The fix lands while the file is already open, by a seat already in context, with no extra PR and no extra Peter merge. A deadline token converts some of those zero-cost rides into dedicated PRs or into lapses.

**What fold-back changed.** The `merge:#<N>` limb keeps a *planned* ride lawful: once the vehicle PR exists it is named, and its body can carry the record. Only the unnamed hope is ruled out.

**What survives.** The opportunistic ride loses its prompt: an unplanned touch that would have carried a small fix, by a seat that happened to be there. Nothing tells that seat the record exists, before or after this rule. The rule makes the miss visible (a dated lapse at the release, not a silent `path:` fire), but it does not recover the ride.

**The tooling-notice alternative, and why I did not pick it.** An `issues-owned.sh` option, say `--diff <base>`, would list the root records whose `path:` glob the branch's diff touches, run before the PR opens, so the vehicle's author sees the rider before the merge. I did not pick it for three reasons:
1. **It keeps the vehicle trigger lawful and hands the close to whoever makes the change.** That is usually not the owner, and often a seat that may not edit the record's body (rule 9) or the record's fix paths (its write scope) without a grant. The notice reaches the seat that cannot act.
2. **It does not cure the incident.** Both lapses were the owner's own vehicles. A notice would have been advisory to the one seat that already knew, and the lapse would still be counted against a trigger naming no owed event.
3. **It is a new instrument in the completion path.** It is my instrument, `complete-task.sh` is enforcement code (a LAW-kind change with its own census), and its cost sits on every PR rather than on 17 records.

**Why it is not offered as the fork.** It answers a different question. § 2 decides what a trigger may name. The notice is a reader for opportunistic rides, and it can be built later on top of either answer to F-1. Presenting it as a fork would offer a complement as a substitute. Its natural trigger is the surviving residual itself: the first record whose fix is shown to have been delayed because an unplanned touch did not carry it.

## 6. Cost, retroactivity, fork

- **Cost**: one README sentence and one register history line at application. At the next walk, owners re-rule **17 Trigger lines** (Thurgood 7, Lina 5, Ada 4, Kenya 1), one line each, in their own commits. **Downstream**: on `release:next:phase-1`, the 5 P2 `(guard)` records still unfixed at release 5's S lapse and escalate to Peter at that first lapse (rule 11). Up to five spec / drop / fix-now decisions arrive in one batch. That is the rule working, since a guard weaker than its claim gets a deadline, but it is Peter's time, and it is stated here.
- **Retroactivity**: none. The sentence binds Trigger lines written or re-ruled after its application merge. Existing lines are re-ruled at the walk, not retro-lapsed, and lapses already recorded stand (rule 11, append-only).
- **Fork F-1, for Peter: what a P3 ride takes.**
  - **(a) As drafted**: `release:next:phase-1`, like every other ride. The 8 P3 records on the roster get a deadline, and a P3 never escalates (rule 11), so each one still unfixed collects a `## Lapse` heading at every release's S until it is fixed, re-ruled or dropped. The cost is churn on optional work.
  - **(b) A P3 ride takes `manual`**, naming its own fixing PR as the event (the § 2 sentence gains "a P0, P1 or P2 record that would ride …"). Rule 5's two-walk stale archive then retires an unfixed P3 as "archived stale — no outcome", and rule 4 brings it back. The cost is that a P3 has no deadline and decays quietly, which is rule 5's existing intent for P3.
  - Drafted (a), because it is the consult wording Peter accepted. The pick is his.

## 7. Review round record

#### [STACY R1] — 2026-10-22

**Verdict: ASSENT with A-items (A1–A4).** § 2's sentence is right, and it is the class fix. Nothing below changes its text. No `[@STACY]` mention appears in either 2026-10-22 ballot, so there is nothing to answer first.

**Grammar** (ballots README § "Conventions"): Status DRAFT ✓ · Required reviewer ✓ · Class LAW ✓ · Census ✗ (A1).

- **A1 — census: the item is presumptively in scope, and "none" is not one of the three forms.** The ground covers only README rule 1, and that site is rightly out of scope. No registered check's command loads it, `scripts/issues-owned.sh` is in no row's `checks`, and no instrument's code cites rule 1 as its law (grep over `scripts/ tools/ mcp-server/src application-mcp-server/src .github`). **Edit site 3 is different.** `governance/classification-map.md` is loaded by two registered instruments: `check-section-citations` (armed; its citing corpus includes `governance/`, `scripts/check-section-citations.ts` L9) and 122-diff-guard (`governance` is an input-closure root, `tools/agent-generator/diff-guard.ts` L69). That meets condition 1. The fix is one `not in scope` line per instrument, in the form of the 2026-10-20 grant ballot (its A3-1). For example, `not in scope — check-section-citations — the history line carries no get_section citation` and `not in scope — 122-diff-guard (with workflow-rules-guard) — governance/ is an ordinary closure input; no rule changes; lock refreshed at application`. No verdict can change, so this is form only. It still goes in, because a "none" line nobody checked is how the census degrades.
- **A2 — § 4 cannot be applied exactly as written.** (i) The register line moves `canonical/generated.lock`'s `inputClosure`, because `governance/` is in the closure. 122-diff-guard goes red unless the lock is refreshed, and § 4 does not mention the refresh. Add a step for it, plus the pasted `operative-set-freshness` result (PASS, stale 0). (ii) Step 3's education change is described ("gains this ballot as LAW HOME for that sentence") but its text is not written. Give the exact before→after string.
- **A3 — the reading's edge between a vehicle and a standing per-change duty is not decidable as written.** Rows 4 and 6 are phrased as duties at the next change ("at that PR the residual's boundary question is decided"; "at which the finding is traced or re-ruled"). That is the same surface as the two standing duties § 3 excludes. I count rows 4 and 6 as vehicles, as you do, but § 2 does not say why. My reading of the line: the in-lane ARMING reads are **post-merge reads** that recur at every such merge, so nothing has to be carried inside the change. The calibration charter (`2026-10-17-components-calibration-instrument-charter.md`, "owes a FRESH set … before it is accepted") is a **pre-acceptance act inside the vehicle**, which is § 1's failure shape. It is shielded only by being a `manual` charter. Two exclusions also sit on the line: `2026-10-12-generate-staleness-decided-by-file-times.md` ("the PR that edits `isProductTokenStale`, the fix site") is the same shape as row 12 ("the next commit that edits the file the fix lands in"), yet one is excluded and the other counted. Give § 2's reading a test that separates these cases, and place the four records against it. The wording is yours. Without it, the re-rulers will argue rows 4, 6 and 12 one at a time at the walk.
- **A4 — the re-rule menu in § 4 step 5 leaves out the intake event that § 2 lists.** Rows 8, 11 and 14 name Spec 129 as their vehicle. Spec 129 is next (priorities ruling, #403), and Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" already owes their read at its outline. If step 5 does not name that option, owners default to `release:next:phase-1`. Rows 8 and 14 are P2 `(guard)`, so they would escalate at release 5's S for work a scheduled spec already absorbs.

**Roster spot-check** (all 17 Trigger lines read at `275b711e5`, beyond the 5 asked). Every one is vehicle-worded under § 2, and owner and class match each record's own header lines. Recount reproduced: 78 root records; `manual` 37, `path:` 30, `release:` 10, `merge:` 1. **Not reproduced**: the 18/17 split itself. That count is heuristic, and I did not re-run the phrase grep over the other 61 records. I re-read three exclusions (A3). Per-row notes:
- **Row 9** closes by the hold-act application.
- **Row 13**: the token is `coverage-map.ts`, but the 13 stale rows live in `canonical/coverage-map.yaml`, so the fix may never touch the token's path. That is Lina's to read at the re-rule.
- **Row 15** already carries an event limb ("or the next full monthly walk"). Its cheapest re-rule promotes that limb.
- **Row 16** is F-1's sharpest case (below).

The ballot proposes a menu, not a token per row, so "right token" is answered by F-1 and A4.

**F-1 — I recommend (b), a P3 ride takes `manual`.**
1. A lapse is the signal I count, and rule 11's arithmetic runs on it. Under (a), eight P3s add up to eight `## Lapse` headings at every release, each meaning only that optional work is not yet done. That dilutes the count of owed closes actually missed, which is Goodhart on my own input.
2. Row 16 is the worst case. Kenya's on-device prototype waits on Peter's own deferral (no hardware access). Under (a), it lapses at every release against an owner who cannot start.
3. (b) is rule 5's existing design for P3: the two-walk stale archive, rule 4's resurrection, and "archiving is never a ruling on the merits".

Counter-argument, folded: (b) lets a real P3 defect decay quietly (rows 2 and 3, Ada's `TokenIndexer.ts` pair). The fold-back keeps it recorded, because the archive move writes the outcome line and rule 4 brings the record back. **Residual**: nothing prompts anyone to bring it back, so the decay is silent by design. Under (a) the decay is loud but meaningless. The pick is Peter's.

**Lapse reading (#439, the owed-set query record)**: I **decline** the rule-11 reading, so no lapse is counted. I recorded this as a dated line on the archived record (`.kiro/issues/archive/2026-10-19-owed-set-query-over-lists-in-progress-specs.md`), not here, because that is where the walk and LIVENESS read it.

**Register rider** (§ 3, `signing-act-consistency` L1105): noted. My claims passes are its named audit home. I carry it as one counted line at the next RELEASE pass, and I do not re-decide it here.

---

## Appendix: the re-rule roster (17), at `275b711e5`

One line per record: file · owner · class · the vehicle its Trigger line names.

| # | Record | Owner | Class | Vehicle named |
|---|---|---|---|---|
| 1 | `2026-06-12-release-integrity-safety-nets.md` | Thurgood | P3 · owed-act | `path:.gitignore`, the next commit that edits the root `.gitignore` |
| 2 | `2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md` | Ada | P3 · defect | `path:application-mcp-server/src/indexer/TokenIndexer.ts`, the next change to the token reader |
| 3 | `2026-07-19-application-mcp-search-tokens-partial-match-signal.md` | Ada | P3 · defect | the same file, the next change to the token reader ("natural slot") |
| 4 | `2026-09-26-materiality-extractor-truncation.md` | Thurgood | P2 (guard) · defect | `path:scripts/completion-claims/materiality.ts`, the next commit that edits the extractor (already lapsed once, 2026-10-18) |
| 5 | `2026-09-27-borderColor-alias-deprecate-native.md` | Lina + Kenya + Data | P3 · defect | `path:src/components/core/Container-Base/**`, the next native Container-Base touch |
| 6 | `2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` | Ada | P2 (guard) · defect | `path:src/build/tokens/defineComponentTokens.ts`, the next change to the brand mechanism |
| 7 | `2026-09-28-complete-task-no-ci-warning-wording.md` | Thurgood | P3 · defect | `path:.kiro/hooks/complete-task.sh`, the next change to the script |
| 8 | `2026-10-01-in-repo-generate-output-contaminates-package-dist.md` | Ada | P2 (guard) · defect | `path:scripts/generate-platform-tokens.ts`, the next change to how it reads the config ("the file Spec 129 will edit") |
| 9 | `2026-10-03-hermetic-publish-path-follow-ups.md` | Thurgood | P2 (record) · defect | `path:.kiro/docs/ballots/2026-10-01-signing-act-chain.md`, the next amendment (lapsed twice; Peter "Fix now.", closed by the hold-act ballot's application; § 1) |
| 10 | `2026-10-12-docs-mcp-does-not-index-h4.md` | Thurgood | P3 · defect | `path:mcp-server/src/indexer/**`, the next docs-MCP indexer change |
| 11 | `2026-10-12-steward-canonical-claims-theme-output.md` | Thurgood (wording Kenya's and Data's) | P2 (record) · defect | `path:canonical/agents/[dk]*a.md`, the next authoring touch of Kenya's or Data's charter |
| 12 | `2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md` | Lina | P3 · defect | `path:tests/consumer-integration.test.ts`, the next commit that edits the file |
| 13 | `2026-10-13-coverage-map-stale-sweep-5-column.md` | Lina | P2 (guard) · defect | `path:tools/agent-generator/coverage-map.ts`, at Lina's next generator touch |
| 14 | `2026-10-13-native-readiness-test-patterns-miss-repo-tests.md` | Lina | P2 (guard) · defect | `path:application-mcp-server/src/indexer/ComponentIndexer.ts`, Lina's next Application-MCP session |
| 15 | `2026-10-19-decision-framework-consistency-after-tnd.md` | Thurgood | P2 (record) · defect | `path:governance/cross-platform-vs-platform-specific-decision-framework.md`, Lina's next edit to the framework doc |
| 16 | `ios-readonly-focusable-prototype.md` | Kenya | P3 · owed-act | `path:src/components/core/Input-Text-Base/platforms/ios/**`, the next change to the iOS implementation |
| 17 | `2026-10-03-generate-product-only-resolves-from-cwd.md` | Lina (the `src/cli/**` owner is now Ada, six-roots § 2.1) | P2 (record) · defect | `manual`, limb 2: "the next CLI task allowed to widen into `runProductOnly`" |

**Closed, archive at the walk (not a re-rule)**: `2026-10-13-generate-product-only-tip-without-product-tokens.md` (P3, Lina, later re-routed to Ada). Its vehicle, the next CLI `fix/` PR that edits `runGenerate`, was its own fix, #438, which carried rule 5's outcome line.

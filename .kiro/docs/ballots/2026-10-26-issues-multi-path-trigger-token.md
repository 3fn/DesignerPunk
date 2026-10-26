# Ballot Measure: `path:` takes a list of globs, so the instrument-path ARMING limb gets a detector

**Date**: 2026-10-26
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/issues/README.md` and of `scripts/issues-owned.sh`), at Peter's direction. Peter, chat, relayed by the orchestrator, received before 2026-10-26T18:15:14Z (the orchestrator's clock), verbatim: *"Go with (a)"*. It answers the first-lapse escalation of `.kiro/issues/2026-10-25-arming-read-class-option-fork.md` (owner Stacy; `## Lapse (2026-10-26)`, firing commit `38f4ece47`, appended on branch `chore/stacy-lapse-headings` at `ad7fe9845`, PR #512): **fix-now**, in shape **(a)**, "A standing home plus a multi-path token". The record states (a)'s cost: "a rule 1 edit (LAW) and a tooling change by its owner (Thurgood)". This ballot is that rule-1 edit; the tooling change is its execution.
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT records the measure and ratifies nothing.
**Required reviewer**: **Stacy**. She owns the record and the limb (her charter's ARMING row, instrument-path limb), she reads what the detector prints, and she is the census reader.
**Consulted**: Stacy — grammar confirmed (the 19 globs equal her row's list, brace groups expanded, 14 + 2 + 3); site 4 confirmed with two amendments, both folded (the record's kind re-classed to `owed-act`; `read through <sha>` names the base the read ran at, re-fetched and extended to `origin/main` just before each read's commit); the rule-11 standing-records question carried to a root record on her two conditions, not in this ballot (consult 2026-10-26, relayed by the orchestrator; § 8)
**Class**: LAW. Rule 1's grammar is what every owner may write on a Trigger line and what the session-start read evaluates (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds").
**Amends**:
- `.kiro/issues/README.md` rule 1, one sentence (§ 3 site 1). **LAW**.
- `scripts/issues-owned.sh` and `scripts/__tests__/issues-owned.test.ts` (§ 3 sites 2–3; the diff is § Appendix A). **EXECUTION** of site 1.
- `.kiro/issues/2026-10-25-arming-read-class-option-fork.md`: Peter's answer, the Trigger line and the standing-home lines (§ 3 site 4). **EXECUTION**, Stacy's edit (rule 9).
- `governance/classification-map.md` row `issues-obligation-lapse`: one LAW HOME clause, one history line (§ 3 site 5). **EXECUTION**.
- `.kiro/docs/ballots/2026-10-20-manual-records-routed-readers.md` § 10: one dated ledger line, because its § 2 E1 "Firing" line is the script's contract (§ 3 site 6). **EXECUTION**.

**Census**:
- `scripts/issues-owned.sh` is named in no register row's `checks`, so no census line is owed for it (the known gap recorded at ballot `2026-10-25-rule-11-post-walk-filings-and-spec-answers` § 7 item 3). **Heuristic, not a census**: the committed script and the script of Appendix A, run for each of the 10 seats at `origin/main` = `7554fd4e3` (`ISSUES_OWNED_LOG=/dev/null`), print the same 183 lines, sha256 `55a23abc911a9b56c1c9b40c3f9437e6fea90bb3a0a156ff83cbaa02c21ccf75` both. No live `path:` token (31, every root record's first Trigger line) contains a comma or a space, and no tracked path contains a comma, so every existing token reads as before.
- `.kiro/issues/README.md` and the record (sites 1 and 4) are loaded by no registered check: `.kiro/issues/` is neither a citing root of `check-section-citations` (`governance/`, `.kiro/steering/`, `canonical/`) nor in `122-diff-guard`'s input closure. The only row that cites the README as law, `issues-obligation-lapse`, has `checks: []`.
- Site 5 edits the register, which two instruments load (condition 1):
  - `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing corpus governance/) — the LAW HOME clause and the history line carry no get_section / get_document_* citation`
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; governance/ is an input-closure root) — an ordinary closure input; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`
- `**Census**: not in scope — audience-banner guard (scripts/audience-banner/predicate.ts, SCAN_SCOPE governance/*.md) — governance/classification-map.md already carries its banner; the edit adds no governed doc and removes no banner` (run at application: `npm run test:scripts`).

**Cap**: one sentence of rule 1; the script's `path:` branch; one test block; one record's Trigger and standing-home lines; one register clause and history line; one ledger line. **Retroactivity**: none. Every live `path:` token reads as before (Census, heuristic).

> **Conflict of interest, stated first.** I own the README convention and the script, and the limb's missing detector is partly a gap in my instrument. I chose the grammar (§ 2). Stacy's review and Peter's ratification are the checks.

---

## 1. The gap

Stacy's ARMING row has an instrument-path limb (ballot `2026-10-17-standing-write-scope-six-roots` § 3 item 4): a merge that touches one of 19 instrument paths owes her a read. Nothing fires it. Its sibling, the registry-path limb, has a standing record whose `path:` Trigger makes `scripts/issues-owned.sh` print `FIRED@<sha>` at her session start. Rule 1's `path:` takes one glob, and the limb's paths are 19, so this limb has no token. It missed seven merges before the 2026-10-25 backfill (source record `.kiro/issues/2026-10-24-instrument-path-arming-reads-missed.md` §§ 2, 5). The record that carries the gap lapsed at release 16.1.0's S, and Peter answered fix-now (a).

## 2. The grammar, and why

**Proposed**: `path:` takes one glob **or a comma-separated list of globs**, `path:<glob>,<glob>,…`. A list fires as one glob does (ballot `2026-10-18-obligation-drain-and-release-falsity-floor` M2, and the script's contract, ballot `2026-10-20-manual-records-routed-readers` § 2 E1): `FIRED@<sha>` when a first-parent commit on `origin/main` after the commit that last changed a `**Trigger**: ` line in the record touches **any** glob in the list; `<sha>` is the earliest such commit. No space stands beside a comma. A list with an empty element, or a space beside a comma, prints `untokened` (a walk finding under rule 1), never a silent non-fire.

**Why this form** (the candidates the record and the brief named):
1. **A list on the existing token, not a new `paths:` token.** Rule 1's enumeration stays at five tokens, a reader who knows `path:` knows the list, and the script's one `path:` branch serves both. Every one of the 31 live `path:` tokens has no comma, so none changes meaning (Census, heuristic). A separate `paths:` token would add a sixth name for the same semantics.
2. **Not a named list resolving to a register row's instrument list** (the record's own example). It would make the script read a second file, the register's YAML, and the trigger's bound would stop matching its list: the bound is the last change to the record's Trigger line, so a glob added to the register's list later would fire on commits made before the list held it (a false `FIRED`). The register is a governance path, so the list's every edit would also be a governance edit for a trigger's sake. And no register row carries the limb's paths as a machine-readable list today; the limb's list lives in Stacy's charter row, in prose with brace groups.
3. **Not `path:` repeated.** Rule 1 says "exactly one backticked token", and the script, the walk and every reader take the first backticked token. Repetition would change that invariant for every token to serve one.

**The cost of the form chosen**: the list is written out in full, because git's `:(glob)` magic has no brace groups. The limb's Trigger line holds 19 globs (830 characters); the script prints the first 160 characters of it, as it does for every Trigger line.

## 3. Edit sites (after ratification, one PR, Peter-merged)

### Site 1 — `.kiro/issues/README.md` rule 1 (LAW)

Before (one sentence of rule 1, L10 at `7554fd4e3`):

> followed immediately by exactly one backticked token naming **the event that owes the close** — `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual` — then optional prose; a start condition, if any, is prose (definitions: ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2).

After:

> followed immediately by exactly one backticked token naming **the event that owes the close** — `tag:v<semver>`, `merge:#<N>`, `path:<glob>` or `path:<glob>,<glob>,…`, `release:<ver>:phase-1` or `manual` — then optional prose; a start condition, if any, is prose (definitions: ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2). A `path:` list fires as one glob does, on a touch of any glob in it; no space stands beside a comma *(ballot 2026-10-26-issues-multi-path-trigger-token)*.

The pointer takes the form rule 1 already uses for an added sentence (`*(ballot 2026-10-22-trigger-names-the-event-not-the-vehicle)*`); the change adds text and replaces none. The README carries no worked example of a `path:` token, so no example site is owed. The README is not on the edit-kinds path list, so no `**Edit kind**:` line is owed for it (precedent: ballot `2026-10-25-rule-11-post-walk-filings-and-spec-answers` § 4 step 2); the PR body cites this ballot.

### Site 2 — `scripts/issues-owned.sh` (EXECUTION, Thurgood)

Appendix A, first file. The `path:?*` branch splits the token on commas, prints `untokened` for a malformed list, and passes every glob as a `:(glob)` pathspec to the one `git log` call it makes today. The bound (`<tc>`), the ground (`origin/main` after the fetch), the earliest-commit print, fail-soft and the run log are unchanged. The header names the list form and this ballot.

### Site 3 — `scripts/__tests__/issues-owned.test.ts` (EXECUTION, Thurgood)

Appendix A, second file. Six fixture records owned by Stacy (so the Thurgood read's counts are untouched) and one fixture commit before the clone: a list fires on its second glob; a list prints the earliest commit across its globs whatever their order; a list with no glob touched, and a list whose one touched glob was touched only before the Trigger line, are quiet; a trailing comma and a space after a comma print `untokened`; Stacy's count line. **Bite**: against the committed script the new block reds 4 of its 5 tests (the quiet test passes against both, as it must); with Appendix A, 23 of 23 pass (`npx jest --config scripts/jest.config.js scripts/__tests__/issues-owned.test.ts`).

### Site 4 — `.kiro/issues/2026-10-25-arming-read-class-option-fork.md` (EXECUTION; **Stacy's edit**, rule 9)

The record becomes the limb's standing home. It lands after PR #512 (her lapse heading) merges, in the application PR or in a PR of hers merged with or after it. Proposed text; she may reword any of it except the token, whose 19 globs are her row's list as it stands:

- **A dated line recording Peter's answer** (her record says "Whatever he answers is recorded here by a dated line, with his words"): Peter, chat, relayed by the orchestrator, received before 2026-10-26T18:15:14Z: *"Go with (a)"* — fix-now, shape (a), applied by this ballot.
- **The Trigger line**, re-ruled (rule 9; rule 11's re-rule, with Peter's answer as its dated reason and authority):

  ```text
  **Trigger**: `path:tools/agent-generator/diff-guard.ts,tools/agent-generator/canonical-vs-truth.ts,tools/agent-generator/coverage-map.ts,tools/agent-generator/sweeps/**,tools/agent-generator/verify-gate-registration.sh,tools/agent-generator/workflow-rules-guard.ts,tools/agent-generator/child-process-guard.ts,tools/agent-generator/regrounding/verify-signing-chain.ts,tools/agent-generator/regrounding/signatures.ts,tools/agent-generator/regrounding/c1.ts,tools/agent-generator/regrounding/freshness.ts,tools/agent-generator/regrounding/check-catalog.ts,tools/agent-generator/regrounding/triviality.ts,tools/agent-generator/__fixtures__/stale-unit/**,scripts/check-completion-criteria-parity.ts,scripts/completion-claims/**,mcp-server/src/tools/validate-metadata.ts,mcp-server/src/tools/list-cross-references.ts,mcp-server/src/tools/rebuild-index.ts` — every merge that touches an instrument path of my ARMING row's instrument-path limb (ballot 2026-10-17-standing-write-scope-six-roots § 3 item 4) owes one read, appended below; read through `<sha>` (<date>).
  ```

  The token is the limb's list in her row, brace groups expanded: the § 4 B checkers and sweeps (14), `scripts/check-completion-criteria-parity.ts` and `scripts/completion-claims/**`, and the three steward-verb tool files. `verify-gate-registration.sh` is in § 4 B and is named once. Each glob matches at least one tracked file at `7554fd4e3`.
- **Status**: standing (one read per instrument-path merge, appended below; the record does not close while the limb exists), as the registry record's Status reads.
- **Class**: stays P2 obligation (guard); the kind is re-classed `charter` → `owed-act` (Stacy's amendment 1, consult 2026-10-26: a standing home where each merge owes a read, the registry record's shape).
- **How a read re-arms the record** (a line, hers): the commit that appends a read also rewrites the Trigger line's `read through` prose. That moves `<tc>`, so the script is quiet until the next instrument-path merge. `read through <sha>` names the base the read ran at (Stacy's amendment 2). The read covers every commit in `git log --first-parent <the last read-through sha>..<base> -- <the 19 globs>`, not only the commit the script printed. *Her method, a method note and not law text (amendment 2): just before committing each read she re-fetches and extends the range to `origin/main`, so the base is as late as the read can make it.*
- **The backfill window**: one read of the commits between `0218632d1` (the end of her lapse heading's window) and the application merge, because those precede the new `<tc>` and the script will never print them.

### Site 5 — `governance/classification-map.md` row `issues-obligation-lapse` (EXECUTION, this ballot § 3 site 5)

- `education` LAW HOME: after "ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers § 2 (rule 11's post-walk carry and the spec answer's end point)" insert "; ballot 2026-10-26-issues-multi-path-trigger-token § 2 (rule 1's `path:` list form)".
- One history line, dated the application commit's date: `{ date: <application date>, change: "README rule 1 gains the path: list form (ballot 2026-10-26-issues-multi-path-trigger-token § 2); scripts/issues-owned.sh evaluates it. LAW HOME updated as EXECUTION (§ 3 site 5); rule line, checks and check_state unchanged", by: thurgood }`.
- The `rule:` line ("a Trigger token from the fixed grammar") stays true and is unchanged.
- `**Edit kind**: governance/classification-map.md — EXECUTION (.kiro/docs/ballots/2026-10-26-issues-multi-path-trigger-token.md § 3 site 5)`.

### Site 6 — `.kiro/docs/ballots/2026-10-20-manual-records-routed-readers.md` § 10 (EXECUTION; a ledger line)

Appended:

```text
- **<application date> (Thurgood), contract amended by ballot 2026-10-26-issues-multi-path-trigger-token**: § 2 E1's `path:<glob>` firing line also reads a comma-separated list; every glob is passed as a `:(glob)` pathspec to the same `git log` call, and a list with an empty element or a space beside a comma prints `untokened`. The text of § 2 E1 above is kept as written.
```

## 4. Application (after the Status commit)

1. **The Status commit** (record-first): `**Status**: **RATIFIED (Peter, <date>)**`, with his words and the clock bound, and the ballots README roll entry. Made before any site is applied.
2. **Thurgood**, one application PR: sites 1, 2, 3, 5 and 6. Appendix A applies with `git apply` at the PR's base; if it does not, the PR stops and reports. Checks: `npx jest --config scripts/jest.config.js scripts/__tests__/issues-owned.test.ts`; `npm run test:scripts` (the audience-banner guard reads site 5's file); `npm run -s check:section-citations`; `npm run -s check:122:diff-guard` (the lock refresh, if the closure moves); and the heuristic equivalence run of the Census block, re-run at the PR's base (every seat, committed vs applied script; a difference on an existing record stops the PR).
3. **Stacy**, site 4, after #512 merges: in the application PR (her commit, signed `Agent: Stacy`) or in her own PR merged with or after it. Her first read is the backfill window (site 4, last bullet).
4. **Deadline**: rule 11's fix-now is "a git-visible trigger no later than the next release's S". Sites 1–4 must merge before the next release's S; a lapsed fix-now returns to Peter without that option.
5. **No straggler sweep beyond** `git grep -n 'path:<glob>' -- .kiro/issues/README.md governance/ .kiro/steering/` (expected: rule 1's sentence only).

## 5. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: the list form on `path:` (§ 2), the script and test of Appendix A, and the record as the limb's standing home.

**Counter-argument, run against the proposal**:
- **(i) Spec 131 is shrinking governance; this adds grammar.** A token form, a parse branch and a malformed-list state, for one record.
- **(ii) The list now lives in three places**: the six-roots ballot § 3 item 4 and § 4 B, Stacy's charter row, and the record's Trigger. A checker added to her row and not to the Trigger never fires.
- **(iii) The existing `path:` semantics fit a one-shot record, not a standing one.** The bound is the last Trigger-line change, so a read that does not touch the Trigger line leaves the record `FIRED` at every session start, and a merge that lands between a read's base and its merge precedes the new `<tc>` and is never printed.

**Folded in**:
- From (i): no new token name, no second file read, no change to any existing token's meaning (§ 2 item 1). The grammar grows by one clause.
- From (ii): the Trigger is the owner's own line and her charter row is her own edit, so the two places that move together are one seat's. Site 4 names the row as the list's source, and the cut is checkable: brace-expand her row's list and compare.
- From (iii): site 4's re-arm line (the read's commit rewrites the `read through` prose, so `<tc>` moves) and its range rule (the read covers from the last read-through sha, not from the printed commit). A merge in the window is then read at the next read, not lost.

**What survives**:
1. **Grammar was added while Spec 131 shrinks it.** Without it, the limb rests on Stacy's memory, which missed seven merges. The record's own counter-argument, unchanged.
2. **Standing records are a shape rule 11 does not name.** By rule 11's letter, a record lapses at a firing that no ancestor of the firing commit closed or re-ruled. A standing record's read always comes after the firing merge (Q5: she reads after acceptance), so each firing is, by the letter, a lapse, and a P2 `(guard)` escalates at its first. The registry record (`2026-10-20-in-lane-registry-arming-reads.md`) has had this shape since 2026-10-20 and has not fired since. This ballot adds a second instance and does not fix the rule. Its failure is the safe direction (an escalation Peter can rule on, not a hidden miss). A rule-11 sentence for standing records ("a firing owes a read, not a close; it lapses when a release's S arrives with an unread firing") is a later ballot, outside this cap. **Carried, not in this ballot** (Stacy's consult, 2026-10-26): filed as `.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md`, owner Thurgood, Trigger `release:next:phase-1`, so it cannot sit unowned; and if either standing record fires before then, the escalation it causes cites that record (her two conditions).
3. **A window merge waits.** A merge between a read's base and its merge is read at the next read, so it waits for the next fire or for RELEASE's backstop over the release delta, which already covers it. Stacy's method (re-fetch and extend to `origin/main` just before each read's commit) narrows the window to minutes; it is a method, not a rule, so the residual stands.
4. **The limb's population is still the 19 source paths.** A PR that weakens only a checker's test, not the checker, does not fire it; the row's deletion read covers those tests only when the population fires. That is the row as ratified; changing it is Stacy's row and Peter's LAW, outside this cap.

## 6. Forks for Peter

None. Peter picked (a) on 2026-10-26. The grammar of § 2 is the drafter's, and the question is ratification.

## 7. Standards notes (no edit in this ballot)

1. **The register debt is unfiled.** Ballot `2026-10-25-rule-11-post-walk-filings-and-spec-answers` § 7 item 3 states that adding `scripts/issues-owned.sh` to the `issues-obligation-lapse` row's `checks` is "owed in a later round", and no root record carries it. Under rule 10 that is a finding on that ballot (mine). This ballot is outside census reach for the same reason. Filed in this PR as `.kiro/issues/2026-10-26-issues-owned-register-row-checks.md`, owner Thurgood (rule 10), so no rule-10 finding on #492 stays unfiled.

## 8. Review round record

#### [STACY consult] (2026-10-26; relayed by the orchestrator, in substance; her own entry, if she writes one, supersedes this summary)
- Grammar: confirmed. The 19 globs equal her row's brace-expanded list (14 + 2 + 3). → § 2, § 3 site 4
- Site 4: confirmed, with two amendments. (1) Re-class the record's kind to `owed-act`: a standing home where each merge owes a read, the registry record's shape. (2) `read through <sha>` names the base the read ran at; her method is to re-fetch and extend the range to `origin/main` just before committing each read, which narrows residual 3 to minutes (a method note, not law text). → § 3 site 4
- Site 1b (a rule-11 sentence for standing records): carry, not in this ballot. Her conditions: file it as a root record, owner Thurgood, Trigger `release:next:phase-1`, so it cannot sit unowned; and if either standing record fires before then, the escalation it causes cites that record. → § 5 residual 2

#### [THURGOOD R2] (2026-10-26; incorporation)
- Amendments (1) and (2) folded into § 3 site 4, attributed; her method recorded as a method note, and residual 3 now says what it narrows and why it stands.
- Site 1b carried: `.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md` filed in this PR on her two conditions; § 5 residual 2 points to it.
- § 7 item 1 filed in this PR as its own record, `.kiro/issues/2026-10-26-issues-owned-register-row-checks.md`: a different event and class from the rule-11 question, so a separate record closes on its own.

## 9. Application ledger

- **2026-10-26 (Thurgood)**: DRAFT on branch `chore/ballot-issues-multi-path-token`, cut from `0218632d1`. Appendix A written and tested in the worktree, uncommitted (record-first: no edit site before the Status commit).
- **2026-10-26 (Thurgood)**: Stacy's consult folded (§ 8); the two root records of § 5 residual 2 and § 7 item 1 filed on this branch. Appendix A unchanged.

---

## Appendix A — the execution diff (sites 2 and 3), verbatim

Applies with `git apply` at `0218632d1` and at `7554fd4e3` (neither file changed between them). sha256 of the diff: `44ebe0042a5d0721d47d14c20d53a1d4bd78c90c53c0fb4649748f866f660ccf`.

```diff
diff --git a/scripts/__tests__/issues-owned.test.ts b/scripts/__tests__/issues-owned.test.ts
index 005e48a37..5fe3e9696 100644
--- a/scripts/__tests__/issues-owned.test.ts
+++ b/scripts/__tests__/issues-owned.test.ts
@@ -14,6 +14,10 @@
  *   - attribution: the Owner token anywhere in the first 15 lines, the seat matched only after it
  *     (Stacy's false-hit header); a record with no Owner line is counted, never printed;
  *   - the first Trigger line is the one read (a multi-Trigger record);
+ *   - the path: list form (ballot 2026-10-26-issues-multi-path-trigger-token, README rule 1): a
+ *     list fires on a touch of any of its globs, at the earliest such commit whatever the glob's
+ *     place in the list; it is bounded below by the Trigger line like one glob; a list with an
+ *     empty element or a space beside a comma prints untokened;
  *   - the ground is origin/main after a fetch: a stale local main and a unit branch's own
  *     commits neither fire nor hide a record;
  *   - condition (i): an offline origin, a fetch that hangs past the timeout, an unknown seat and a
@@ -151,8 +155,18 @@ describe('scripts/issues-owned.sh', () => {
     );
     write(seed, '.kiro/issues/archive/archived.md', record(T, '`manual` — archived, never printed'));
     write(seed, '.kiro/issues/co-owned.md', record('**Owners**: Ada, Lina', '`manual` — two owners'));
+    // The path: list form. Stacy's records, so the Thurgood read above is unchanged.
+    const S = '**Owner**: Stacy';
+    write(seed, '.kiro/issues/list-fires-later-glob.md', record(S, '`path:src/never/*.ts,src/fires/*.ts` — fires on its second glob'));
+    write(seed, '.kiro/issues/list-fires-earliest.md', record(S, '`path:src/fires/*.ts,src/early/**` — two globs touched; the earlier commit is printed'));
+    write(seed, '.kiro/issues/list-unfired.md', record(S, '`path:src/never/*.ts,src/also-never/*.ts` — no glob touched on main'));
+    write(seed, '.kiro/issues/list-bounded.md', record(S, '`path:src/never/*.ts,src/before/*.ts` — one glob touched only before this line'));
+    write(seed, '.kiro/issues/list-trailing-comma.md', record(S, '`path:src/fires/*.ts,` — an empty element'));
+    write(seed, '.kiro/issues/list-space.md', record(S, '`path:src/never/*.ts, src/fires/*.ts` — a space after the comma'));
     commit(seed, 'records');
     git(seed, 'tag', 'v1.2.3');
+    write(seed, 'src/early/deep/e.ts', 'export {};\n');
+    sha.early = commit(seed, 'feat: an earlier change under a listed glob');
     git(seed, 'push', '-q', 'origin', 'main', '--tags');
 
     // The clone is taken now, so its local main is STALE once origin advances below.
@@ -236,6 +250,38 @@ describe('scripts/issues-owned.sh', () => {
     });
   });
 
+  describe('the path: list form, for Stacy', () => {
+    let r: Run;
+    beforeAll(() => {
+      r = run(clone, ['Stacy']);
+    });
+
+    it('fires a list on a touch of any of its globs', () => {
+      expect(lineFor(r, 'list-fires-later-glob.md')?.split('\t')[0]).toBe(`FIRED@${sha.fires}`);
+    });
+
+    it('prints the earliest commit across the globs, whatever their order in the list', () => {
+      expect(lineFor(r, 'list-fires-earliest.md')?.split('\t')[0]).toBe(`FIRED@${sha.early}`);
+    });
+
+    it('is quiet when no glob is touched after the Trigger line', () => {
+      expect(lineFor(r, 'list-unfired.md')).toBeUndefined();
+      expect(lineFor(r, 'list-bounded.md')).toBeUndefined();
+    });
+
+    it('prints a malformed list as untokened, never as a silent non-fire', () => {
+      expect(lineFor(r, 'list-trailing-comma.md')?.split('\t')[0]).toBe('untokened');
+      expect(lineFor(r, 'list-space.md')?.split('\t')[0]).toBe('untokened');
+    });
+
+    it('ends with the count line for Stacy', () => {
+      expect(r.lines.length - 1).toBe(4);
+      expect(r.lines[r.lines.length - 1]).toBe(
+        `4 record(s) for Stacy at origin/main ${sha.fires}; 2 root record(s) carry no **Owner**:/**Owners**: line`,
+      );
+    });
+  });
+
   describe('attribution', () => {
     it('matches the seat only after the Owner token (Stacy\'s false-hit header is Lina\'s)', () => {
       const stacy = run(clone, ['Stacy']);
diff --git a/scripts/issues-owned.sh b/scripts/issues-owned.sh
index 267cabc36..acf521fe8 100755
--- a/scripts/issues-owned.sh
+++ b/scripts/issues-owned.sh
@@ -3,7 +3,8 @@
 #
 # Law: ballot .kiro/docs/ballots/2026-10-20-manual-records-routed-readers.md § 2 E1 (RATIFIED,
 # Peter, 2026-10-20, with conditions (i) fail-soft and (ii) a revisit trigger); Start Up Tasks
-# item 9. Firing follows ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2.
+# item 9. Firing follows ballot 2026-10-18-obligation-drain-and-release-falsity-floor M2. The
+# path: list form follows ballot 2026-10-26-issues-multi-path-trigger-token (README rule 1).
 #
 # A READ, NEVER A GATE: exits 0 always. On any error it prints exactly one line,
 #   issues-owned: unavailable (<why>) — continue
@@ -17,11 +18,13 @@
 # Output, one line per printed record:  <state>\t<path>\t<Trigger line after "**Trigger**: ", 160 chars>
 #   manual        always printed
 #   due:<ver>     a release:<ver>:phase-1 token
-#   FIRED@<sha>   a path: token with a first-parent commit touching the glob after the commit that
+#   FIRED@<sha>   a path: token with a first-parent commit touching the glob (or any glob of a
+#                 comma-separated list; <sha> is the earliest such commit) after the commit that
 #                 last changed a **Trigger**: line in the record; a merge:#<N> token with a
 #                 first-parent subject ending (#<N>) anywhere on origin/main
 #   FIRED@<tag>   a tag:v<semver> token whose tag exists
-#   untokened     a Trigger line with no recognised token (README rule 1; a walk finding)
+#   untokened     a Trigger line with no recognised token (README rule 1; a walk finding), including
+#                 a path: list with an empty element or an element that begins or ends with a space
 # Unfired path:/merge:/tag: records print nothing. The last line gives the count, the ref and its
 # SHA, and the number of root records with no **Owner**:/**Owners**: line.
 #
@@ -117,10 +120,21 @@ for f in $FILES; do
   case "$tok" in
     manual) state=manual ;;
     path:?*)
-      tc=$(git log -1 --format=%H -G'^\*\*Trigger\*\*: ' "$REF" -- "$f" 2>/dev/null)
-      if [ -n "$tc" ]; then range="$tc..$REF"; else range="$REF"; fi
-      fc=$(git log --first-parent --reverse --format=%h "$range" -- ":(glob)${tok#path:}" 2>/dev/null | head -1)
-      [ -n "$fc" ] && state="FIRED@$fc"
+      # One glob, or a comma-separated list of globs (README rule 1). A malformed list prints
+      # untokened, never a silent non-fire.
+      globs=${tok#path:}
+      case ",$globs," in
+        *,,* | *', '* | *' ,'*) state=untokened ;;
+        *)
+          specs=()
+          IFS=',' read -r -a parts <<<"$globs"
+          for g in "${parts[@]}"; do specs+=(":(glob)$g"); done
+          tc=$(git log -1 --format=%H -G'^\*\*Trigger\*\*: ' "$REF" -- "$f" 2>/dev/null)
+          if [ -n "$tc" ]; then range="$tc..$REF"; else range="$REF"; fi
+          fc=$(git log --first-parent --reverse --format=%h "$range" -- "${specs[@]}" 2>/dev/null | head -1)
+          [ -n "$fc" ] && state="FIRED@$fc"
+          ;;
+      esac
       ;;
     merge:\#[0-9]*)
       num=${tok#merge:#}
```

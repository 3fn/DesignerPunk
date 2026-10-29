# Ballot Measure: adopting the governance-examples guard into the seats (the ARMING path, Stacy's counting-block read, the guard's paths in Thurgood's scope, and who edits `pending.json` after adoption)

**Date**: 2026-10-26 (R2: 2026-10-26)
**Drafted by**: Thurgood (Civitas steward; owner of the instrument, register row `governance-examples`, `owner: thurgood`). Ballot `2026-10-26-governance-examples-guard` (RATIFIED, Peter, 2026-10-26, #495 `f55bf3e04`) § 2.6 defers these items "to a ballot of their own, filed with the build PR (steward's call, R2)". The build PR is #519 (`feat/governance-examples-guard`, head `38cc6a4b5`). Peter's standing go for parallel items covers the drafting (the orchestrator's reading). Peter, chat, relayed by the orchestrator, received before 2026-10-26T18:05Z (the orchestrator's clock), verbatim: *"If there are any other items of the list that can/should be done in parallel with those running, please, proceed"*. The orchestrator's brief to draft was received before 2026-10-26T18:54:48Z (`date -u`, the drafter's clock).
**Status**: **RATIFIED (Peter, 2026-10-26)**, on the measure as it stands at R2 (`8b713b123`, the three consults folded), with **F-1 answered (a)**. Peter, chat, relayed by the orchestrator, verbatim (typos corrected, meaning unchanged), received before 2026-10-26T21:12:21Z (the orchestrator's clock): *"Re: the remaining rulings, let's go with the seat recommendations of those that have them; but any that have deferred or follow-up work require a plan to be addressed."* The ruling covers this ballot because it has seat recommendations on record: all three consulted seats read F-1 (a) (§ 6's table: Ada, Lina, Stacy), and Stacy's site-2 and site-2b texts are in § 3 verbatim. The follow-up work this ballot defers, its application PR, has its plan in § 9 and in the record `.kiro/issues/2026-10-26-governance-examples-guard-adoption-application.md` (owner, sites, the baseline it relies on, trigger, fallback). **Record-first**: this commit is the record. It is made before any edit site is applied, and it touches this ballot, the ballots README roll and that record only. **Resolved texts**: § 9 (clause 2 and site 1c under (a); the row-state reading of § 4.3 for #519's answer). The ballots README roll entry rides this commit, at the orchestrator's direction, not the application PR (§ 4.1 allowed either).
**Required reviewer**: **Stacy**. Sites 1, 2 and 7 are her charter's trigger-set table, her counting block and her record, and she is the census reader.
**Reviewers**: **Ada** and **Lina**, for § 2: 64 of the 69 pending entries are homed in their records (Ada 60, Lina 4; the other 5 are Thurgood's).
**Consulted**: Stacy — reads F-1 (a); wrote site 2 and the RELEASE-row pointer (site 2b) verbatim, RELEASE phase 1 only; 1c decidable under (a) and (b), with three gaps folded at R2 (Owner-line match, RATIFIED at `<m>`, 1b's referent); site 7 order, re-arm and retroactivity folded; disposition `no-consumer-counterpart` / `subtraction-1` and all six census lines confirmed; Ada — reads F-1 (a): her sweep PR deletes her 60 entries; zero cross-seat staling today; surviving: her hits in Thurgood's docs need her commit to delete; Lina — reads F-1 (a); commits site 1d herself after the stacy.md commit; asked what clause 4's "names the change" means (answered in § 2 clause 4: a class, with the list attached at application) (consults 2026-10-26, relayed by the orchestrator; § 7)
**Class**: LAW. Sites 1–3 are `canonical/agents/**` edits, and § 2 gives write scope over a file that no seat holds today (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds"; ballot `2026-10-17-standing-write-scope-six-roots` § 3 item 1: "Scope moves only by a `canonical/agents/**` edit", or by a grant the law provides).

**Amends**:
- `canonical/agents/stacy.md`, the ARMING row, instrument-path limb: `scripts/governance-examples/**` joins the path list, the guard's test joins the deletion read, and a fourth read covers `pending.json` (§ 3 site 1). **LAW**.
- `canonical/agents/stacy.md`, the counting block: one added item, the governance-examples read, on RELEASE phase 1 only (§ 3 site 2); and the RELEASE row (L400): one pointer sentence to it (§ 3 site 2b). **LAW**. Both texts are Stacy's, verbatim.
- `canonical/agents/thurgood.md`, `writeScope`: one glob, `scripts/governance-examples/**` (§ 3 site 3). **LAW**.
- **The pending-entry rule** (§ 2): its law home is this ballot, § 2. `governance/classification-map.md`, row `governance-examples`, gains a LAW HOME pointer and a history line (§ 3 site 4). **EXECUTION** of § 2.
- `.kiro/docs/ballots/2026-10-17-standing-write-scope-six-roots.md` § Errata: one dated ledger line (§ 3 site 5). **EXECUTION**.
- `.kiro/issues/2026-10-26-governance-examples-guard-build-grant.md`: one dated line saying that this ballot answers its gap (§ 3 site 6). **EXECUTION**, Thurgood's record.
- `.kiro/issues/2026-10-25-arming-read-class-option-fork.md`: the limb's Trigger token gains `scripts/governance-examples/**` (§ 3 site 7). **EXECUTION**, Stacy's edit (README rule 9).
- **Not edit sites**:
  - `canonical/agents/thurgood.md` In Scope. Its six-roots bullet already reads "your write scope lists, by file, the `scripts/` checks you own", and "Owning an instrument never authorizes changing the law it serves without a ballot". That sentence is what bars Thurgood from adding a pending entry, so `#in-scope` does not move and needs no re-sign.
  - `.kiro/steering/Agent-Directory.md`. Thurgood's Owns line does not list his `scripts/` checks (`issues-owned.sh` is not there either).
  - Ada's and Lina's charters. The § 2 grant is held in this ballot, not in a seat's `writeScope` (the precedent is `2026-09-26-tasks-row-write-scope-grant`: "NOT EDITED, DELIBERATELY: the charters' `## Write scope` blocks").
  - **Not in this ballot**: the behaviour/attribute check and RS-47's standing-rule question. Both are the later amendment, homed in Lina's `.kiro/issues/2026-10-26-examples-guard-attribute-predicate.md`.

**Census** (`.kiro/docs/ballots/README.md` § "Conventions", "Instrument census"):
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; canonical/agents/ and governance/ are input-closure roots) — ordinary closure inputs; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`
- `**Census**: not in scope — verify-signing-chain (tools/agent-generator/regrounding/verify-signing-chain.ts, row signing-act-consistency) — two of Stacy's units move and one frontmatter row is new; each is re-confirmed, re-signed or first-signed under the chain's existing rules, which this ballot does not change; the verdict is read at application`
- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts, citing roots governance/, .kiro/steering/, canonical/) — no after-text in § 3 carries a get_section / get_document_* citation (checked at application with a grep of the after-texts)`
- `**Census**: not in scope — audience-banner guard (scripts/audience-banner/predicate.ts, SCAN_SCOPE governance/*.md) — governance/classification-map.md keeps its banner; the edit adds no governed doc and removes no banner`
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts, row governance-examples) — no edit site is a file it loads (its scope excludes classification-map.md; it reads the scoped docs, the parent ballot, the pending homes, token-index/ and dist/, and § 3 edits none of them), and § 2 governs who edits pending.json and who reads the PR, not what the guard selects or decides`. This line holds under either answer to #519's row-state question (§ 4.3). Under "keep proposed", the row's `checks` is `[]` at this ballot's base, so the guard is not yet a registered instrument. Under "arm now", it is one.
- `**Census**: not in scope — semantics-guard fixture test (tools/agent-generator/__tests__/semantics-guard.fixture.test.ts) — the fixture's copy of Stacy's trigger-set unit is kept byte-identical in the same PR (Lina's dragged commit, § 4.2); the test's rule is unchanged`. The line is written whether or not that test is a registered instrument; it costs nothing.

**Cap**: one path added to one existing ARMING limb, plus one read in it; one counting-block item and one RELEASE-row pointer; one `writeScope` glob; one pending-entry rule with one register pointer; three ledger or record lines. **No** new trigger, token, lane, required check, record kind or register row. **Retroactivity**: none for doc authors. The new glob's range reaches back to #519's merge and the interim PRs (§ 4.2 step 7); whether Stacy reads those under the limb or leaves them to RELEASE, the limb's existing backstop, is her choice at application, recorded in her record (§ 3 site 7).

> **Conflict of interest, stated first.** I own the instrument. This ballot widens my standing scope to cover it, and it writes the rule on who may edit that instrument's list. Under § 2 I gain no deletion of another seat's entries. My additions are barred by an existing sentence of my own charter, and site 1's read enforces that bar. The checks on me are Stacy's review and her post-merge read, and Peter's ratification.

---

## 1. The gap

The parent ballot built the guard and left four things to this ballot (§ 2.6, and the grant record's § "An entry fixed between adoption and the build PR's merge"):

1. **Nothing fires on a weakened guard.** `scripts/governance-examples/**` is on no instrument-path list. A PR that changes the check, removes a fixture case, or adds a `pending.json` entry so that a new hit goes green leaves the required-check set unchanged. So it fires no ARMING read, and only RELEASE sees it, after the delta has grown (Stacy R1 item 3, S-8).
   - **The baseline ceiling does not close this.** The test asserts that the entry count stays at or below the adopted count. A PR that deletes one fixed entry and adds a different one keeps the count, edits no header, and turns a new hit green.
2. **Nobody is told to read the guard's report at a claims pass.** Stacy's counting block is a closed list. Today she reads the report line as a courtesy (parent § 2.6).
3. **After #519 merges, `pending.json` is in no seat's scope.** The rule-8 grant (#511) expires at that merge, and § 2.6 deferred adding the paths to Thurgood's scope.
4. **A fixing PR cannot remove its own entry.** A stale entry turns the required check red ("FAIL (stale pending entry: remove it)"), so the PR that fixes a hit has to delete that hit's entry. Those PRs are mostly Ada's and Lina's, and neither seat holds the file.

## 2. The pending-entry rule (the law home)

The text below is the rule, applied as written at ratification. It has one fork, F-1 (§ 6). Clause 2 is written under (a), the recommended option. Under (b) it is replaced by the text marked (b).

> **`scripts/governance-examples/pending.json` after adoption** *(ballot 2026-10-26-governance-examples-guard-adoption § 2)*.
> 1. Thurgood holds the file in his standing scope, as the instrument's owner.
> 2. **(a)** An owner of an entry's `home` record may delete that entry, and only that entry, in a PR whose `**Agent**:` line names that owner. The owners are the seat names in the record's `**Owner**:` or `**Owners**:` field: the text after that token up to the first `(`, `.`, `;` or ` — `, read as names separated by `,` or `and`. A seat named elsewhere on the line, consulted or co-owning a part, is not an owner here. The grant needs no activating merge. It is held by this rule, and it lasts while the entry is listed.
>
>    **(b)** Any PR that makes an entry stale deletes that entry, and it may delete nothing else.
> 3. Where a fix shifts the occurrence indices of a string, the PR deletes the entry the guard reports as stale and rewrites no other entry. The informational `line` field may be updated by any PR that edits the file.
> 4. No PR adds an entry, changes an entry's `doc`, `half`, `string`, `occurrence` or `home`, or changes the `header`, unless it executes a ballot, RATIFIED at that PR's merge, that names the change. A ballot names the change as a class, for example "the entries a predicate version bump makes fail", and need not list each entry. The PR that applies it attaches the list: its body names every entry it adds or re-keys and the header before → after, and the entries the diff adds equal that list. Owning the instrument does not authorize it.
> 5. Whether a deleted entry was stale is the guard's to decide, not a reader's. The required check fails a deletion whose hit still fails, as an unlisted hit.

**Why the law home is this ballot, with a pointer in the register row, and not a clause in the row** (the brief left this to the steward):
- **Precedent.** The one standing grant rule outside the charters, `tasks-row-write-scope-grant`, has its law in its ballot. Its register row points to it and leaves the charters unedited on purpose.
- **The row's `rule:` says what the check requires of a doc.** Who edits the list is not something the guard checks. A write-scope clause in `rule:` would read as covered by the barrier: false coverage, which is the error the register exists to prevent.
- **Why clause 4 takes a class, not an entry list** (Lina's question, § 7): a predicate bump is ratified on its census, whose delta names the docs whose verdict moves, before the entries can be cut against the final base. The entries exist only at application. Requiring them in the ballot would force a re-ratification for every base drift; requiring them in the applying PR's body keeps the read decidable at `<m>`.
- **Reach.** The fixer meets the rule through the guard's own failure line ("remove it"), and the reader meets it in Stacy's ARMING row (site 1). The register row points both of them here.

## 3. Edit sites, byte for byte (after the Status commit)

Each Before is quoted from `origin/main` = `6615a6774`, except site 4, which is quoted from #519's head `38cc6a4b5`, and site 7, which is quoted from #516's site 4 text. Each anchor is unique in its file. That was checked at `6615a6774` for sites 1–3 and 2b.

### Site 1 — `canonical/agents/stacy.md`, the ARMING row (L404), instrument-path limb (LAW)

**1a. The path list.** Before:

```text
`scripts/check-completion-criteria-parity.ts` and `scripts/completion-claims/**`, and the three steward-verb tool files
```

After:

```text
`scripts/check-completion-criteria-parity.ts`, `scripts/completion-claims/**` and `scripts/governance-examples/**`, and the three steward-verb tool files
```

**1b. The deletion read gains the guard's test.** Its fixtures, under `scripts/governance-examples/__tests__/__fixtures__/`, are already covered by "any `__fixtures__/**`". Stacy's C-e cases are mostly built inside the test file, so the file itself is added. Before:

```text
and in `mcp-server/src/tools/__tests__/{validate-metadata,list-cross-references,rebuild-index}.test.ts`, unless the PR body names the file and its spec amendment
```

After:

```text
in `mcp-server/src/tools/__tests__/{validate-metadata,list-cross-references,rebuild-index}.test.ts`, and in `scripts/governance-examples/__tests__/*.test.ts`, unless the PR body names the file and its spec amendment (for the guard's test, the ballot that amends the guard, its Status reading RATIFIED at `<m>`)
```

The parenthesis gives the guard's test a referent: the guard is governed by ballots, not by a spec, so "its spec amendment" alone would make every deletion in the test a finding (Stacy, consult item 2).

**1c. The `pending.json` read.** It reads parsed entries, not `--numstat`, because the informational `line` field moves on routine edits. Before:

```text
(the body read with `gh pr view <n> --json body`, run for this seat by a session holding credentials). Beside these three
```

After, under F-1 (a):

```text
(the body read with `gh pr view <n> --json body`, run for this seat by a session holding credentials). For a PR touching `scripts/governance-examples/pending.json`, a fourth read, decidable from git and the PR body (ballot 2026-10-26-governance-examples-guard-adoption § 2): `git show <m>:` against `git show <m>^:` that file — its `header` unchanged; every entry at `<m>` an entry at `<m>^`, keyed by `doc`, `half`, `string` and `occurrence`, with `home` unchanged (`line` is informational and not read); and for each entry at `<m>^` absent at `<m>`, an owner of its `home` record at `<m>^` (the seat names in its `**Owner**:` or `**Owners**:` field, up to the first `(`, `.`, `;` or ` — `) named on the PR body's `**Agent**:` line — unless the PR body names a ballot whose Status reads RATIFIED at `<m>` (`git show <m>:<ballot>`) that admits the class of change, and lists every entry added or re-keyed and the header before → after, the list equal to the entries the diff adds. An added entry, a changed key, `home` or `header` is a finding on the author, routed to Peter as an unadmitted weakening of a floor; a deletion by a seat that owns no entry's home is a finding on the author. Whether a deleted entry was stale is not read here: the required guard fails a deletion whose hit still fails. Beside these reads
```

After, under F-1 (b): the same text without the clause "and for each entry at `<m>^` absent at `<m>`, … `**Agent**:` line" and without the clause "a deletion by a seat that owns no entry's home is a finding on the author".

The owner field is read up to its first delimiter so that a seat named as consulted on the same line is not an owner (Stacy's gap: the TDS record's Owner line also reads "**Consulted when the fix opens**: Lina"). At `6615a6774` the field gives Ada for her record, Lina for the CDG record and Thurgood for the TDS record. Lina no longer matches Ada's record as item B's co-owner. Ada accepted either reading, and item B has no entries.

**1d. Dragged, not a fourth edit**: the byte-identical copy of the trigger-set unit in `tools/agent-generator/__fixtures__/semantics-guard/canonical/agents/semguard.md` (Lina's path; precedent: six-roots § Errata (h)).

### Site 2 — `canonical/agents/stacy.md`, the counting block (L426) (LAW; **Stacy's text, verbatim**)

The item goes in before the block's last item. Before:

```text
never a gate; and **M3 / M4 / M5** as standing audit output
```

After (Stacy, consult 2026-10-26, verbatim):

```text
never a gate; **the governance-examples read** *(ballots 2026-10-26-governance-examples-guard § 2.4 and 2026-10-26-governance-examples-guard-adoption)*, on RELEASE phase 1 only: adopted at S is the register row `governance-examples` reading `armed` at S and `scripts/governance-examples/pending.json` at S carrying its `adopted:` header, and until then the item is the one line `not adopted at S`; the guard's report line at S, pasted (`npx tsx scripts/governance-examples/check.ts` on a checkout of S after `npm run build`, else `not re-verified — toolchain unavailable`); P at S against the header's count and against P at the previous release's S (at the first release after adoption, the header's count), and where P has not fallen, whether the walk record carries each true-positive entry as a row; the opt-outs by value and K, against K at the merge of the sweep PR Ada's record names; the markers added in the delta, spot-checked against their PR-body `marker:` lines, the fraction itself counted (checked / total); the predicate and rule versions the `--census` output prints; each remaining entry's `home` open at the issues root with a trigger (a closed home with its entries still listed is claimed fixed, shipped not fixed); and the delta's ARMING `pending.json` reads, counted with their findings — observation, never a gate; and **M3 / M4 / M5** as standing audit output
```

The block carries a `volatile-ok` marker that exempts the whole line, and "an addition to this line is checked for volatile facts by hand". The text names no version string and no count. The hand check is § 4.2 step 8.

### Site 2b — `canonical/agents/stacy.md`, the RELEASE row (L400) (LAW; **Stacy's text, verbatim**)

The pointer is inserted before "Phase 2 reads the committed step-6 record". Before:

```text
A read, never a gate. Phase 2 reads the committed step-6 record
```

After (Stacy, consult 2026-10-26, verbatim, inserted):

```text
A read, never a gate. Phase 1 also carries the governance-examples read (the counting block; ballot 2026-10-26-governance-examples-guard § 2.4). Phase 2 reads the committed step-6 record
```

The RELEASE row is in the trigger-set unit that site 1 already moves, so it adds no re-sign; Lina's dragged copy (site 1d) follows it.

### Site 3 — `canonical/agents/thurgood.md`, `writeScope` (LAW)

Before (L273–L275):

```text
  - "scripts/issues-owned.sh"
  - "scripts/__tests__/issues-owned.test.ts"
  # § 2.3 — the docs MCP
```

After:

```text
  - "scripts/issues-owned.sh"
  - "scripts/__tests__/issues-owned.test.ts"
  # ballot 2026-10-26-governance-examples-guard-adoption (RATIFIED Peter <date>): the governance-examples guard,
  # owned whole (register row governance-examples); the glob cannot carry pending.json's limits — that ballot's § 2 does
  - "scripts/governance-examples/**"
  # § 2.3 — the docs MCP
```

The directory is owned whole, as `scripts/completion-claims/**` is, because every file in it is the instrument (six-roots: "no umbrellas except where a root is owned whole"). The new frontmatter row `writeScope[scripts/governance-examples/**]` is first-signed by Stacy, disposition `no-consumer-counterpart` with `subtraction-1`, as `writeScope[scripts/issues-owned.sh]` has (Stacy confirmed, consult item 4).

### Site 4 — `governance/classification-map.md`, row `governance-examples` (EXECUTION, this ballot § 2)

Before (the `education` line as built in #519, `38cc6a4b5`, equal to parent § 8.8):

```text
  disposition: "LAW HOME: ballot 2026-10-26-governance-examples-guard § 2 and § 8. The module header carries the predicate, the limit text and the whole-module sentences byte-exact"
```

After:

```text
  disposition: "LAW HOME: ballot 2026-10-26-governance-examples-guard § 2 and § 8; ballot 2026-10-26-governance-examples-guard-adoption § 2 (who edits pending.json after adoption). The module header carries the predicate, the limit text and the whole-module sentences byte-exact"
```

One history line is appended, dated the application commit's date:

```text
  - { date: <application date>, change: "LAW HOME gains ballot 2026-10-26-governance-examples-guard-adoption § 2 (pending.json after adoption: deletions by the rule of its F-1 answer, no addition or re-key without a ballot); the guard's paths join Stacy's ARMING instrument-path limb and Thurgood's writeScope. EXECUTION (that ballot § 3 site 4); rule line, checks and check_state unchanged", by: thurgood }
```

The site edits `education` and `history` only, so it composes with either answer to #519's row-state question (§ 4.3). `**Edit kind**: governance/classification-map.md — EXECUTION (.kiro/docs/ballots/2026-10-26-governance-examples-guard-adoption.md § 3 site 4)`.

### Site 5 — `.kiro/docs/ballots/2026-10-17-standing-write-scope-six-roots.md` § Errata (EXECUTION; a ledger line)

Appended:

```text
- **<application date> (Thurgood), § 3 item 4's instrument paths extended by ballot 2026-10-26-governance-examples-guard-adoption**: `scripts/governance-examples/**` joins the list, with its test in the deletion read and a fourth read for `pending.json` (that ballot § 3 site 1). The limb's current list is Stacy's charter ARMING row; § 3 item 4 above is kept as written.
```

### Site 6 — `.kiro/issues/2026-10-26-governance-examples-guard-build-grant.md` (EXECUTION; Thurgood's record)

The record archives at #519's merge (README rule 5), so the line is appended where it then stands (rule 3):

```text
- **<application date> (Thurgood)**: the gap named in § "An entry fixed between adoption and the build PR's merge" is answered by ballot `2026-10-26-governance-examples-guard-adoption` § 2, in force at its application merge (<sha>).
```

### Site 7 — `.kiro/issues/2026-10-25-arming-read-class-option-fork.md`, the Trigger token (EXECUTION; **Stacy's edit**, rule 9)

The token is the limb's list in her row, brace groups expanded, so it gains the path that site 1a adds. Before (#516 site 4's token, as it will stand once applied):

```text
scripts/completion-claims/**,mcp-server/src/tools/validate-metadata.ts
```

After:

```text
scripts/completion-claims/**,scripts/governance-examples/**,mcp-server/src/tools/validate-metadata.ts
```

- **Order.** Never before site 1a: her commit lands in the application PR, after Thurgood's `stacy.md` commit, or in a PR of hers merged after it. If #516's site 4 has not merged by then, she writes the 20-glob token in her site-4 edit; if it has, she edits the token in her own commit. The condition either way: at the later merge, the token equals her row's brace-expanded list.
- **The re-arm** (#516 site 4): a Trigger-line edit moves `<tc>`. The edit rides a read commit. Keeping the old `read through <sha>` prose keeps the range rule covering every merge since the last read, but it does not make the script fire on them (Stacy, consult item 3). The edit lands alone only if `git log --first-parent <last read-through sha>..<base> -- <the globs>` is empty.
- **Retroactivity, Stacy's choice at application.** The new glob's range reaches back past this ballot: #519's merge (which adds the whole directory) and any interim PR touching the path (§ 4.2 step 7). She either (i) reads them under the limb, in the read commit that carries the edit, or (ii) leaves them to RELEASE, the limb's existing backstop over the release delta. Her record states which, in the same commit. #519 is also read under ARMING's "a new barrier arms" event whenever its row arms (§ 4.3).

## 4. Application

### 4.1 The Status commit (record-first)

Thurgood: `**Status**: **RATIFIED (Peter, <date>)**`, with his words, a clock bound, the F-1 answer and Stacy's site-2 text resolved into a § 9 "Resolved texts". It is made before any edit site is applied. The ballots README roll entry rides the application PR, if the orchestrator again directs a ballot-only Status commit.

### 4.2 One application PR, after #519 merges (Peter-merged; it touches the lock, so it merges alone)

It waits for #519 because `pending.json`, the row and the grant record must be on `main`. Who commits what:

1. **Thurgood (authoring)**:
   - sites 1 and 2, applied to `canonical/agents/stacy.md` byte for byte as ratified, with the matching item text in `canonical/operative-sets/stacy.yaml` and removal text in `canonical/profiles/consumer/stacy.dispositions.yaml`. These are authoring commits, not Stacy's own: her authoring and signing acts in one commit fail `verify-signing-chain` F12′ (six-roots § Errata (f));
   - site 3, with its new dispositions row authored unsigned;
   - sites 4, 5 and 6;
   - the regeneration and the lock, with the `outputs` hash before → after in the PR body (six-roots § 3 item 3).
2. **Lina**: the dragged `semguard.md` copy, byte-identical to the new trigger-set unit (§ 3 sites 1, 2b and 1d), in her own commit after Thurgood's `stacy.md` commit. She works from § 9's ratified site-1 and site-2b texts and his branch head. His commit alone is red on the byte-identity test until hers lands, so the two are pushed together.
3. **Stacy**:
   - she re-confirms `#the-trigger-set-the-114-superset-table-names-never-numbers` and `#the-claims-pass-record-claims-passmd-the-template`, and re-signs their dispositions rows;
   - she first-signs `writeScope[scripts/governance-examples/**]`, each in her own seat commit;
   - she makes site 7, in § 3 site 7's order, with its retroactivity choice.

   Her signatures are Stacy-signed, so Peter samples them (C1's collapse seat).
4. **Checks**:
   - `npm test`;
   - `npm run test:scripts`, which includes the guard's own test and the audience-banner guard;
   - `npm run -s check:section-citations`;
   - `npm run -s check:122:diff-guard` (no-op-green after the lock refresh);
   - `verify-signing-chain`, which runs in that job.
5. **Straggler sweep**: `git grep -n -F 'scripts/governance-examples/**' -- canonical/agents .kiro/steering governance .kiro/docs/ballots/2026-10-17-standing-write-scope-six-roots.md`. Expected: `stacy.md` L404 and the counting block, `thurgood.md` `writeScope`, the register row's history line and the site-5 line, plus their renderings in `.claude/agents/` and `.kiro/agents/`. The consumer output carries none of them.
6. **PR body**:
   - `**Edit kind**:` lines. `canonical/agents/stacy.md — LAW (this ballot)`, the same for `canonical/agents/thurgood.md`, and site 4's EXECUTION line. The ballot, the ledger and the record lines are carve-out or non-governance paths.
   - The `**Consulted**:` line, and the lock hashes.
   - The PR touches no instrument path and no `pending.json`, so it fires no ARMING read. Its first instrument-path firing is the next PR to touch `scripts/governance-examples/**` after its merge.
7. **The interim** (from #519's merge to this PR's merge): `pending.json` is in no seat's scope. A fixing PR that would stale an entry has three choices: merge before #519 (the grant record's cheapest order), carry a rule-8 grant of its own naming the file, or wait for this PR. The window is the cost of filing this ballot after the measure and not with it (§ 5, residual 4).
8. **The volatile-fact hand check** on the site-2 addition, recorded in the PR body.

### 4.3 How #519's row-state answer reads here (Peter's on #519; this ballot takes whichever he gives)

- **"Arm in #519."**
  - Adoption is #519's merge M: the row reads `armed`, and `pending.json` at M carries the header (parent § 2.4, "Adopted").
  - Site 4 edits the armed row.
  - The site-2 read counts from the first RELEASE after M.
  - The guard is a registered instrument at this ballot's application base, and its census line stands as written.
  - #519 itself is read under ARMING's "a new barrier arms" event, not under this ballot.
- **"Keep `proposed`; arm in a follow-up EXECUTION PR."**
  - Adoption is that follow-up's merge M′.
  - Site 4 edits `education` and `history` only, so it applies before or after the flip. Whichever PR merges second updates from `main`.
  - This ballot does not carry the flip, which is the parent's EXECUTION, ruled on #519.
  - Until M′, the site-2 read prints `not adopted at S`. The follow-up touches only the register, so it fires ARMING by "a new barrier arms", not by the instrument-path limb.
  - At this ballot's base the row's `checks` is `[]`, so the census line's "not yet a registered instrument" branch applies.
- **Either way**, the grant expires at #519's merge, and the § 4.2 interim runs from there.

## 5. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: sites 1–7 as drafted, with § 2 under F-1 (a).

**Counter-argument, run against it**:
- **(i)** It adds one more mechanism to a system that Spec 131 is shrinking: two charter edits, a signing fan-out, and one more read in the longest row of Stacy's charter, where rot hides most easily.
- **(ii)** The deletion rule adds a scope grain. Beside task-row and issue-row grants, a third kind of grant appears, keyed on an entry's home record.
- **(iii)** The guard already checks every deletion. A deleted entry whose hit still fails turns the required check red. So restricting *who* deletes protects nothing that the guard does not.

**Folded in**:
- From (i):
  - no new trigger, token, lane, check, record kind or register row. The path joins an existing limb and an existing Trigger token;
  - Thurgood's In Scope prose and the Agent Directory are untouched (`#in-scope` is not re-signed);
  - the `pending.json` read is keyed on the JSON entries, so routine `line` updates do not make it noisy;
  - deletions get no staleness read, because the guard makes that read.
- From (ii): the grant is held in one place (this § 2, with a register pointer), no seat's charter grows a clause, and it needs no activating merge per record. F-1 (b) is offered, and it has no grain at all.
- From (iii): (iii) is right about correctness, and (a) is recommended for a different reason. **A marker can be a launder.** Under (b), a seat can add `<!-- example: generic -->` at another seat's hit and then delete the now-stale entry; that is the planned route for Ada's 20 entries, and it is open to anyone. Under (a), only the home owner, who wrote the hit's disposition, can complete that conversion. The marker's PR-body line and the K count remain the readers under both options.

**What survives**:
1. **Under (a), the grain is real, and it costs cross-seat PRs.** (a) keys on who wrote the disposition, not on who owns the doc. A PR by one seat that stales an entry homed in another seat's record needs the home owner on the PR's `**Agent**:` line, with a commit. The consults name two cases. Several of Ada's 36 corrections sit in Thurgood's docs (MCP-Relationship-Model, Test-Behavioral-Contract-Validation), so if he fixes his line first, his PR needs her commit (Ada). A component tokens-file rename can make the bare `tokens.ts` at CDG L998 match exactly one file, and that PR is red until Lina signs on (Lina). Ada counts zero cross-seat staling by a token-index change today: the 9 entries homed outside her record are path and shape entries. Under (b), the record holding a disposition can fall behind its list. The test blocks archiving a home that still has entries, but nothing flags a home whose entries were removed by someone else. The owner learns at close, or at the RELEASE read.
2. **Under (a), the author check is consistency, not identity** (Stacy). The match reads the PR's `**Agent**:` line, which is self-attested, and it shuts only the cross-seat launder; a home owner can still launder her own entries, read only by the marker lines and K. The owner field is read up to its first delimiter (R2), so a joint record whose co-owners are named in prose after a `(` or `.` gives only the first-named seats.
3. **Additions stay detectable, not preventable** (parent residual 3, unchanged). The read comes after acceptance, so a laundered entry is green on `main` until Stacy reads the merge.
4. **The limb's list now lives in five places**: six-roots § 3 item 4 with its ledger line, Stacy's row, #516's Trigger token, and Thurgood's `writeScope`. #516's counter-argument (ii) grows by one. A path added to one place and not another fires nothing, or fires on paths no one reads.
5. **The interim window** (§ 4.2 step 7) exists because § 2.6 deferred these items, rather than carrying them in the parent measure. It is the price of not widening a measure after Peter ratified it as presented.

## 6. Forks for Peter

- **F-1: who deletes a `pending.json` entry after adoption.** Both options are drafted in full (§ 2 clause 2, § 3 site 1c). The drafter recommends (a); the pick is Peter's.
  - **(a) The home record's owner** deletes exactly the entries homed there. This is the grant record's suggestion and the orchestrator's.
    - *For*: the seat that wrote a hit's disposition is the only seat that can close it. It shuts the cross-seat marker launder.
    - *Against*: one more scope grain. A cross-seat stale needs the owner's commit.
  - **(b) The PR that makes an entry stale** deletes it, whoever wrote it.
    - *For*: no grain, and the guard is the whole oracle.
    - *Against*: any seat can complete a marker conversion on another seat's hit, and home records can fall behind the list.
  - **Answered (Peter, 2026-10-26; relayed, received before 2026-10-26T21:12:21Z)**: (a), by his ruling to go with the seat recommendations (quoted in the Status line). The text under (b) in § 2 clause 2 and in site 1c is void and is not applied.
  - **The three reads** (consults 2026-10-26; none picks for Peter):

    | Seat | Read | Surviving counter-argument, in the seat's terms |
    |---|---|---|
    | Ada | (a). Her sweep PR deletes her 60 entries (36 corrections, 20 `generic` markers, 4 path or import fixes). The 20 markers are the launder route, so only the seat that ruled "correct mention" should finish them. | (a) keys on who wrote the disposition, not who owns the doc. Her hits in Thurgood's docs need her commit to delete if he fixes first; `**Agent**:` is self-attested. |
    | Lina | (a). Her 4 CDG entries are homed in a record she alone owns, and the only fix is her ballot-measure rewrite. | Another PR can still stale an entry (a tokens-file rename resolving CDG L998's bare `tokens.ts`); that PR is red until she signs on; `**Agent**:` is self-attested. |
    | Stacy | (a) gives an author check she can decide. | The author is self-attested (consistency, not identity), and (a) shuts only the cross-seat launder. The pick is Peter's. |

- **Settled in Stacy's seat, not a fork**: the site-2 read rides RELEASE phase 1 only, and the RELEASE row carries a pointer to it (site 2b).

## 7. Review round record

*(Consults run by the orchestrator on this draft before the PR opens; each seat's entry is its own, stamped per the Spec-Feedback-Protocol.)*

Questions put:
- **[@STACY]**
  1. Site 2 in your words. Does the read ride every pass or RELEASE only? Does your RELEASE row need a pointer to parent § 2.4's phase-1 reads?
  2. Sites 1a–1c. Is the fourth read decidable as you would run it, under (a) and under (b)? Is `scripts/governance-examples/__tests__/*.test.ts` the right deletion grain?
  3. Site 7's order with #516, and the re-arm condition.
  4. The disposition of `writeScope[scripts/governance-examples/**]`: `no-consumer-counterpart` / `subtraction-1`?
  5. The census lines.
- **[@ADA]**
  1. F-1, for your 60 entries: under (a) your sweep PR deletes them; under (b) any staling PR does. Which do you want, and why?
  2. Your record's Owner line names Lina as co-owner of item B, so under (a) she matches. Acceptable, or should it key otherwise?
  3. How often does a token-index change of yours stale an entry homed in another seat's record?
- **[@LINA]**
  1. F-1, for your 4 CDG entries.
  2. The dragged `semguard.md` copy (site 1d) in your commit.
  3. Does anything in § 2 touch your attribute-predicate amendment's ground?

#### [CONSULTS R1] (2026-10-26; relayed by the orchestrator, in substance; each seat's own entry, if written, supersedes)
- **Ada**: F-1 (a), with her reasons and surviving point as in § 6. Item B: leave the rule as drafted (item B has no entries; keying per item needs a new entry field). Cross-seat staling by a token-index change: zero today.
- **Lina**: F-1 (a), as in § 6. Site 1d: yes, her own commit after Thurgood's `stacy.md` commit, from § 9's ratified site-1 text and his head. § 2 leaves her predicate alone but constrains the version bump (new `half` values, added entries, a re-cut header or ceiling must be named by the amendment ballot; site 1c needs the bump PR's body to cite it). Question: does "names the change" mean each entry, or a class whose list is attached at application?
- **Stacy**: site 2 rides RELEASE phase 1 only; her site-2 text and the L400 pointer, verbatim. Site 1c decidable under (a) and (b), reading the home at `<m>^` (a fixing PR may archive its home). Three gaps: the Owner-line match catches a consulted seat (TDS record); "names the ballot" is met by a DRAFT; 1b's "its spec amendment" has no referent for a ballot-governed guard. The test glob is the right grain. Site 7: never before 1a; rides a read commit (alone only if the range is empty); the record says whether she reads #519 and the interim PRs or leaves them to RELEASE. Disposition confirmed; all six census lines hold; her texts add no `get_section` citation.

#### [THURGOOD R2] (2026-10-26; incorporation)
- Stacy's three 1c gaps fixed in the site text: (a) keys on the owner field up to its first delimiter (§ 2 clause 2, site 1c); the admitting ballot must read RATIFIED at `<m>` (§ 2 clause 4, site 1c); 1b names the guard's referent, the amending ballot RATIFIED at `<m>`.
- Site 2 replaced by Stacy's text, byte for byte; site 2b added with her pointer, byte for byte.
- Site 7: the order (never before 1a), the re-arm (rides a read commit unless the range is empty) and the retroactivity choice (hers at application, both branches written).
- Lina's question answered in § 2 clause 4: a class in the ballot, the list attached at application in the applying PR's body, and the diff's added entries equal to it; the reason is in § 2. Site 1c reads it.
- Lina's site 1d ordering written into § 4.2 step 2.
- Ada's surviving point folded into residual 1; residual 2 rewritten for the narrowed owner field and Stacy's identity point.
- F-1 stays Peter's fork; the three reads and their surviving counter-arguments are in § 6's table.

## 8. Application ledger

- **2026-10-26 (Thurgood)**: DRAFT on branch `chore/ballot-governance-examples-guard-adoption`, cut from `origin/main` = `6615a6774`. #519 was read at `38cc6a4b5` (not merged in). Ballot only; no edit site is applied.
- **2026-10-26 (Thurgood)**: R2 on `911b79246`: the three consults folded (§ 7). Ballot only; no edit site is applied.
- **2026-10-26 (Thurgood)**: Status commit on this branch: RATIFIED with F-1 (a) (Peter's ruling, quoted in the Status line); § 9 added; the ballots README roll entry added; the application record filed (README rule 10). Ballot, README roll and one issues record only; no edit site is applied.
- **2026-10-29 (Thurgood)**: application PR #536 (branch `chore/apply-governance-examples-guard-adoption`).
  - **Re-cut.** A first authoring draft moved Stacy's two units' `canonicalHash` inside an authoring commit. Stacy caught it before signing, since an authoring commit that moves a signed hash fails `verify-signing-chain` F12′ (six-roots § Errata (f)). The authoring commits were re-cut before any signature, and the retired branch was deleted (the orchestrator's record; it is absent from `origin` at this line).
  - **Regeneration and lock.** `origin/main` `716b81bcf` was merged in at `fe587a567`, a plain non-signing merge with git's default message.
    - `35d04844a`: the regeneration (`npm run build:generator`, then `generate.ts`) changed the CC and Kiro renderings of `stacy.md` and `thurgood.md`, `thurgood.json` and its attribution, and no `canonical/_consumer-output` file.
    - `3f42be897`: the lock. `check:122:diff-guard --base 716b81bcf` gave `full-run-green (input-closure-changed)` with stale 0 and unsigned-routed 0, then `no-op-green` at HEAD.
    - `inputClosure` `ab7bf3a2…486d` → `284e5bb8…bc81`. **`outputs` moved**: `07422646…1586` → `93a08c13…2cc3` (six-roots § 3 item 3; the PR body carries both).
  - **Step 5, the straggler sweep.** Hits: `canonical/agents/stacy.md` L404 (ARMING row), `canonical/agents/thurgood.md` L277 (`writeScope`), and this file's site-5 ledger line in six-roots (L281). Their renderings in `.claude/agents/` and `.kiro/agents/` also hit. The consumer output has 0 hits.
    - **Two of step 5's expected entries do not contain the literal `scripts/governance-examples/**` glob.** The counting block names `scripts/governance-examples/pending.json`, and site 4's history line says "the guard's paths". Both are byte for byte as ratified.
    - This is an imprecise expectation in step 5, not a straggler.
  - **Step 8, the volatile-fact hand check on site 2.** The L426 addition is byte-equal to § 3 site 2. Its only numerals are the two `2026-10-26` dates in the cited ballot names and `§ 2.4`. It names no version and no count.
  - **Checks at `3f42be897`:**
    - `verify-signing-chain --ci --base origin/main`: PASS (5 rows across 5 signing commits).
    - `check:section-citations`: PASS (192).
    - Lina's three fixture suites: 92/92.
    - The guard's suite: 45/45.
    - `npm run test:scripts`: 669/669.
    - `npm test`: 9814/9814 in 414 suites.
- **2026-10-29 (Thurgood)**: applied at #536 (`639ef70f6`, merged 2026-10-29T01:47:07Z). The application record and the build-grant record are closed and archived in the closing PR (branch `chore/close-adoption-application-record`). The application record carries a `## Lapse (2026-10-29)` heading naming `639ef70f6`, because #536 did not carry its outcome line. It is my miss, escalated under rule 11.

## 9. Resolved texts and the plan for the application (written at the Status commit)

**F-1 (a).** The texts below are the ones applied. The (b) alternatives are void.

- **§ 2 clause 2** reads as the (a) paragraph in § 2, verbatim: "An owner of an entry's `home` record may delete that entry, and only that entry, in a PR whose `**Agent**:` line names that owner", with the owner field read up to its first `(`, `.`, `;` or ` — `.
- **Site 1c** is the "After, under F-1 (a)" text in § 3, verbatim. Its `<m>` and `<m>^` are the merge commit of the PR under read and its first parent, as written there; they are not placeholders to resolve here.
- **Site 2 and site 2b** are Stacy's texts in § 3, verbatim. They have no open value; the volatile-fact hand check is § 4.2 step 8.
- **Sites 3 to 7** keep their `<date>` and `<sha>` values for the application PR: the application date and the application merge's SHA. Each is filled at application and named in that PR's body.

**The row-state answer reads as § 4.3's first bullet, "Arm in #519".** Peter ruled the same day, on the same words (the Status line), that the `governance-examples` register row is armed in #519 (`check_state: armed`, `checks` naming the test, history line dated 2026-10-26). So adoption is #519's merge M (the row reads `armed`, and `pending.json` at M carries the header), site 4 edits the armed row, the site-2 read counts from the first RELEASE after M, the guard is a registered instrument at this ballot's application base, and the census line in the header stands as written. A difference the application PR must name: § 8.8 of the parent ballot reads `proposed`; #519 arms the row as ratified-intent, and the amendment that makes § 8.8 say what shipped is owed on `.kiro/issues/2026-10-25-token-docs-unvetted-name-hits.md` § "Plan (Peter's condition)".

### The plan (Peter's condition: a ruled item with follow-up work carries its plan)

The follow-up this ballot defers is the **application PR** (§ 4.2). The obligation is filed as a root record, so it has a trigger the walk and the session-start read can see (README rule 10): `.kiro/issues/2026-10-26-governance-examples-guard-adoption-application.md`.

| Field | Plan |
|---|---|
| **Owner** | Thurgood authors the application PR. Lina commits the dragged `semguard.md` copy (site 1d) after his `stacy.md` commit. Stacy re-confirms and re-signs the two trigger-set units, first-signs `writeScope[scripts/governance-examples/**]`, and makes site 7 (§ 4.2 steps 1 to 3). |
| **Sites** | 1a, 1b, 1c (a), 2, 2b, 3, 4, 5, 6, 7, with the dragged 1d (§ 3, § 4.2). |
| **The baseline it relies on** | It adopts none. The baseline is #519's: the `pending.json` header at #519's merge, `adopted: bdbe72a32 2026-10-26; entries: 69 (token-name 56, declared-path 9, shape 2, import 2)` as that PR carries it (parent § 2.4, "Adopted"). Site 1c's read compares the header at each later merge to it, and § 2 clause 4 bars a change to it without a ratified ballot. If #519's merge changes the header, the application PR cites the header it finds on `main`, not this one. |
| **Trigger** | Two events, **both required**: the merge of **this ballot's PR (#525)** and the merge of **#519**, because the sites read `pending.json`, the row and the grant record, which are on `main` only after #519 (§ 4.2). Opens, as one PR, on the later of the two merges. Filed as `release:next:phase-1` with the two merges as its start condition, because the vehicle PR does not exist yet (README rule 1); re-ruled to `merge:#<N>` when it opens. |
| **Fallback** | The next release's phase 1. If the application has not opened by then, the record lapses at that phase 1 (README rule 11) and the walk reports it to Peter. Until it merges, the interim of § 4.2 step 7 stands: `pending.json` is in no seat's scope, and a fixing PR that would stale an entry merges before #519, carries a rule-8 grant of its own naming the file, or waits. |

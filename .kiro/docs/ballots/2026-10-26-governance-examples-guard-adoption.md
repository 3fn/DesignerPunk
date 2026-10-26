# Ballot Measure: adopting the governance-examples guard into the seats (the ARMING path, Stacy's counting-block read, the guard's paths in Thurgood's scope, and who edits `pending.json` after adoption)

**Date**: 2026-10-26
**Drafted by**: Thurgood (Civitas steward; owner of the instrument, register row `governance-examples`, `owner: thurgood`). Ballot `2026-10-26-governance-examples-guard` (RATIFIED, Peter, 2026-10-26, #495 `f55bf3e04`) § 2.6 defers these items "to a ballot of their own, filed with the build PR (steward's call, R2)". The build PR is #519 (`feat/governance-examples-guard`, head `38cc6a4b5`). Peter's standing go for parallel items covers the drafting (the orchestrator's reading). Peter, chat, relayed by the orchestrator, received before 2026-10-26T18:05Z (the orchestrator's clock), verbatim: *"If there are any other items of the list that can/should be done in parallel with those running, please, proceed"*. The orchestrator's brief to draft was received before 2026-10-26T18:54:48Z (`date -u`, the drafter's clock).
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT records the measure and ratifies nothing.
**Required reviewer**: **Stacy**. Sites 1, 2 and 7 are her charter row, her counting block and her record, and she is the census reader.
**Reviewers**: **Ada** and **Lina**, for § 2: 64 of the 69 pending entries are homed in their records (Ada 60, Lina 4; the other 5 are Thurgood's).
**Consulted**: Stacy — <pending: her counting-block line in her words (site 2), and the ARMING entry (site 1)>; Ada — <pending: entry deletion for her home record (§ 2, F-1)>; Lina — <pending: entry deletion for her home record (§ 2, F-1), and the dragged fixture (site 1)>
**Class**: LAW. Sites 1–3 are `canonical/agents/**` edits, and § 2 gives write scope over a file that no seat holds today (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds"; ballot `2026-10-17-standing-write-scope-six-roots` § 3 item 1: "Scope moves only by a `canonical/agents/**` edit", or by a grant the law provides).

**Amends**:
- `canonical/agents/stacy.md`, the ARMING row, instrument-path limb: `scripts/governance-examples/**` joins the path list, the guard's test joins the deletion read, and a fourth read covers `pending.json` (§ 3 site 1). **LAW**.
- `canonical/agents/stacy.md`, the counting block: one added item, the governance-examples read (§ 3 site 2). **LAW**. Stacy writes its words.
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

**Cap**: one path added to one existing ARMING limb, plus one read in it; one counting-block item; one `writeScope` glob; one pending-entry rule with one register pointer; three ledger or record lines. **No** new trigger, token, lane, required check, record kind or register row. **Retroactivity**: none. A `pending.json` change merged before this ballot's application is read by RELEASE, the limb's existing backstop.

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
> 2. **(a)** A seat named on the `**Owner**:` or `**Owners**:` line of an entry's `home` record may delete that entry, and only that entry, in a PR whose `**Agent**:` line names that seat. The grant needs no activating merge. It is held by this rule, and it lasts while the entry is listed.
>
>    **(b)** Any PR that makes an entry stale deletes that entry, and it may delete nothing else.
> 3. Where a fix shifts the occurrence indices of a string, the PR deletes the entry the guard reports as stale and rewrites no other entry. The informational `line` field may be updated by any PR that edits the file.
> 4. No PR adds an entry, changes an entry's `doc`, `half`, `string`, `occurrence` or `home`, or changes the `header`, unless it executes a ballot that names the change. Owning the instrument does not authorize it.
> 5. Whether a deleted entry was stale is the guard's to decide, not a reader's. The required check fails a deletion whose hit still fails, as an unlisted hit.

**Why the law home is this ballot, with a pointer in the register row, and not a clause in the row** (the brief left this to the steward):
- **Precedent.** The one standing grant rule outside the charters, `tasks-row-write-scope-grant`, has its law in its ballot. Its register row points to it and leaves the charters unedited on purpose.
- **The row's `rule:` says what the check requires of a doc.** Who edits the list is not something the guard checks. A write-scope clause in `rule:` would read as covered by the barrier: false coverage, which is the error the register exists to prevent.
- **Reach.** The fixer meets the rule through the guard's own failure line ("remove it"), and the reader meets it in Stacy's ARMING row (site 1). The register row points both of them here.

## 3. Edit sites, byte for byte (after the Status commit)

Each Before is quoted from `origin/main` = `6615a6774`, except site 4, which is quoted from #519's head `38cc6a4b5`, and site 7, which is quoted from #516's site 4 text. Each anchor is unique in its file. That was checked at `6615a6774` for sites 1–3.

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
in `mcp-server/src/tools/__tests__/{validate-metadata,list-cross-references,rebuild-index}.test.ts`, and in `scripts/governance-examples/__tests__/*.test.ts`, unless the PR body names the file and its spec amendment
```

**1c. The `pending.json` read.** It reads parsed entries, not `--numstat`, because the informational `line` field moves on routine edits. Before:

```text
(the body read with `gh pr view <n> --json body`, run for this seat by a session holding credentials). Beside these three
```

After, under F-1 (a):

```text
(the body read with `gh pr view <n> --json body`, run for this seat by a session holding credentials). For a PR touching `scripts/governance-examples/pending.json`, a fourth read, decidable from git and the PR body (ballot 2026-10-26-governance-examples-guard-adoption § 2): `git show <m>:` against `git show <m>^:` that file — its `header` unchanged; every entry at `<m>` an entry at `<m>^`, keyed by `doc`, `half`, `string` and `occurrence`, with `home` unchanged (`line` is informational and not read); and for each entry at `<m>^` absent at `<m>`, a seat named on the `**Owner**:` or `**Owners**:` line of its `home` record at `<m>^` named on the PR body's `**Agent**:` line — unless the PR body names the ballot that admits the change. An added entry, a changed key, `home` or `header` is a finding on the author, routed to Peter as an unadmitted weakening of a floor; a deletion by another seat is a finding on the author. Whether a deleted entry was stale is not read here: the required guard fails a deletion whose hit still fails. Beside these reads
```

After, under F-1 (b): the same text without the clause "and for each entry at `<m>^` absent at `<m>`, … `**Agent**:` line" and without the sentence's last clause, "a deletion by another seat is a finding on the author".

**1d. Dragged, not a fourth edit**: the byte-identical copy of the trigger-set unit in `tools/agent-generator/__fixtures__/semantics-guard/canonical/agents/semguard.md` (Lina's path; precedent: six-roots § Errata (h)).

### Site 2 — `canonical/agents/stacy.md`, the counting block (L426) (LAW; **Stacy's words**)

The item goes in before the block's last item. Before:

```text
never a gate; and **M3 / M4 / M5** as standing audit output
```

After. *This is the drafter's proposal, made from Stacy's own R1 words (her charter note and S-9) and the parent ballot's § 2.4 and F-3. **Stacy rewrites it**, and the ratified text is hers:*

```text
never a gate; **the governance-examples read** *(ballots 2026-10-26-governance-examples-guard § 2.4 and 2026-10-26-governance-examples-guard-adoption)*: on a RELEASE pass, the guard's report line at S (`npx tsx scripts/governance-examples/check.ts` on a checkout of S, after `npm run build`; otherwise `not re-verified — toolchain unavailable`), pasted; while the register row `governance-examples` does not read `armed` at S, the line reads `not adopted at S` and nothing below is counted; P at S against the `pending.json` baseline header and against P at the previous release's S (P not falling makes each true-positive entry a walk row at that release); the opt-outs by value (`generic`, `consumer`) and K, against the baseline measured after Ada's sweep merges; the predicate and file-shape rule versions the `--census` line prints; each remaining entry's home record at the issues root with a trigger (a home record closed with its entries still listed is claimed fixed and shipped not fixed); and the count of `pending.json` reads under the ARMING row, with their findings — observation, never a gate; and **M3 / M4 / M5** as standing audit output
```

The block carries a `volatile-ok` marker that exempts the whole line, and "an addition to this line is checked for volatile facts by hand". The proposal names no version string and no count. The hand check is § 4.2 step 8.

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

The directory is owned whole, as `scripts/completion-claims/**` is, because every file in it is the instrument (six-roots: "no umbrellas except where a root is owned whole"). The new frontmatter row `writeScope[scripts/governance-examples/**]` is first-signed by Stacy. Its consumer disposition is hers to confirm: the drafter expects `no-consumer-counterpart` with `subtraction-1`, as `writeScope[scripts/issues-owned.sh]` has.

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

- **Order with #516.** If #516's site 4 has not merged when this ballot applies, Stacy writes the 20-glob token in her site-4 edit. If it has merged, she edits the token in her own commit. The condition either way: at the later merge, the token equals her row's brace-expanded list.
- **The re-arm** (#516 site 4): a Trigger-line edit moves `<tc>`. The edit therefore rides a read commit, or it keeps the `read through <sha>` prose as it stood, so the range rule still covers every merge since the last read.

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
2. **Lina**: the dragged `semguard.md` copy, byte-identical to the new trigger-set unit (§ 3 site 1d), in her own commit.
3. **Stacy**:
   - she re-confirms `#the-trigger-set-the-114-superset-table-names-never-numbers` and `#the-claims-pass-record-claims-passmd-the-template`, and re-signs their dispositions rows;
   - she first-signs `writeScope[scripts/governance-examples/**]`, each in her own seat commit;
   - she makes site 7 (§ 3 site 7's order).

   Her signatures are Stacy-signed, so Peter samples them (C1's collapse seat).
4. **Checks**:
   - `npm test`;
   - `npm run test:scripts`, which includes the guard's own test and the audience-banner guard;
   - `npm run -s check:section-citations`;
   - `npm run -s check:122:diff-guard` (no-op-green after the lock refresh);
   - `verify-signing-chain`, which runs in that job.
5. **Straggler sweep**: `git grep -n -F 'scripts/governance-examples/**' -- canonical/agents .kiro/steering governance .kiro/docs/ballots/2026-10-17-standing-write-scope-six-roots.md`. Expected: `stacy.md` L404, `thurgood.md` `writeScope`, the register row's history line and the site-5 line, plus their renderings in `.claude/agents/` and `.kiro/agents/`. The consumer output carries none of them.
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
1. **Under (a), the grain is real, and it costs cross-seat PRs.** A PR by one seat that stales an entry homed in another seat's record needs the home owner on the PR's `**Agent**:` line, with a commit. One example: an Ada token-index change that makes a name in Lina's CDG record resolve. Under (b), the record holding a disposition can fall behind its list. The test blocks archiving a home that still has entries, but nothing flags a home whose entries were removed by someone else. The owner learns at close, or at the RELEASE read.
2. **Under (a), the owner match is mechanical but broad.** It keys on any seat named on the home record's Owner line. Ada's record names Lina as co-owner of item B (READMEs, which have no entries), so Lina could delete Ada-homed entries. Keying on the first named seat would be narrower and would mis-read a joint record. The match also reads the PR's `**Agent**:` line, which is self-attested.
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
- **Not a fork for Peter**: whether the site-2 read rides every claims pass or RELEASE only, and whether her RELEASE row also needs a pointer. Both are Stacy's words for her seat (§ 7).

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

## 8. Application ledger

- **2026-10-26 (Thurgood)**: DRAFT on branch `chore/ballot-governance-examples-guard-adoption`, cut from `origin/main` = `6615a6774`. #519 was read at `38cc6a4b5` (not merged in). Ballot only; no edit site is applied.

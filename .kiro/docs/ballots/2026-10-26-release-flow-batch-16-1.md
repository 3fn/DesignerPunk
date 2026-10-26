# Ballot Measure: the RELEASE-FLOW batch from release 16.1.0's claims pass (eleven rows of the standards queue)

**Date**: 2026-10-26 (drafted from 19:31:42Z, the drafter's `date -u`)
**Drafted by**: Thurgood (Civitas steward; author of `.kiro/hooks/RELEASE-FLOW.md`'s text through its review rounds, owner of `.kiro/issues/README.md` and the standards side of the composed loop). The queue is `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` (#521, `d5cb99023`; on `main` at `99eabf854`), which names this ballot as the vehicle for its RELEASE-FLOW rows. Drafted under Peter's standing go for the queue's parallel items, relayed by the orchestrator, which covers drafting the ballots the queue names. That go covers drafting only; nothing here is ratified by it.
**Status**: **DRAFT**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT records the measure, ratifies nothing and answers no fork in § 7.
**Base**: every Before text is byte for byte at `99eabf854` (`origin/main` when this branch was cut). The site blocks of § 3 were cut from the files by a script, not retyped.
**Required reviewer**: **Stacy**. Every row comes from her RELEASE pass for 16.1.0; she is the census reader (ballots README § "Conventions"); site 11 is her charter.
**Required consult**: **Ada**, on RS-49 (`scripts/release-publish.ts` is hers under ballot `2026-10-17-standing-write-scope-six-roots` § 2.6, and "owning `release-publish.ts` does not let Ada change RELEASE-FLOW", nor me her script), and on the RS-48 straggler in `scripts/verify-publish-rail.sh` (also hers, § 2.6).
**Consulted**: Stacy — <pending: RS-33 charter site, RS-46b, RS-43>; Ada — <pending: RS-49>
**Class**: LAW. Each row changes what the release author, the pre-S reader, a CORRECTION's author or an instrument PR's author must do (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds": "If a reader must now do something that nothing already required before the PR, the edit is LAW").
**Amends**:
- `.kiro/hooks/RELEASE-FLOW.md`: sites 1–6 (RS-46b, RS-33, RS-37, RS-34, RS-39 with RS-25, RS-49, RS-48, RS-41). **LAW**.
- `governance/release-management-system.md` recipe step 4: site 7 (RS-34's second surface; RS-41 only under F-41 (ii)). **LAW**.
- `.kiro/issues/README.md` rule 10: site 8 (RS-43). **LAW**.
- `.kiro/docs/ballots/README.md`: site 9 (RS-38 with RS-29) and site 10 (RS-40). **LAW**.
- `canonical/agents/stacy.md` § "The mirror anti-rot clause": site 11 (RS-33's charter site), severable (F-33b). **LAW**.
- Execution sites E1–E8 (§ 4): the register rows `publish-rail-guard`, `hermetic-publish-path` and `release-falsity-floor`; `scripts/verify-publish-rail.sh`'s header and message (Ada); under F-49 (ii) `scripts/release-publish.ts` and its test (Ada); the operative-set item, the regeneration and Stacy's C1 act for site 11; the ballots README roll entry. **EXECUTION** of the sites they follow.

**Census** (ballots README § "Conventions", "Instrument census"; one line per presumptively in-scope instrument):
- `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh) — site 5 rewords step 6's reading of an absent time["<version>"] and adds a read-the-packument-before-re-running sentence; E1 changes the script's exit-10 header comment and its FAIL[version] message only (messages are out of the census's scope); no exit code, assertion or verdict changes. The recorded red scripts/__bites__/bite-2-version-mismatch-exit10.txt holds the old message as a dated measurement`
- `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts) — RELEASE-FLOW and the recipe are the row's education homes, so every site in either file is presumptively in scope; sites 3, 4 and 7 change what the operator reads, writes and runs, and no refusal, tag check, closure compare, floor or pack-assert finding changes. Under F-49 (ii), E7 changes the printed 5.4 line, which is output; the script's refusals are unchanged` *(this line is the one the census reader should test hardest: under (ii) the printed line runs two checks in the operator's shell, which is output by the letter and a guard by its effect; a disputed not-in-scope line goes to Peter)*
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; canonical/ and governance/ are input-closure roots) — sites 7 and 11, E2–E4 and E6 are ordinary closure inputs; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`
- `**Census**: not in scope — signing-act-consistency (verify-signing-chain --ci; census mode --census-routed) — site 11 changes the bytes of one retained unit (stacy #the-mirror-anti-rot-clause-verbatim-at-countersigned-strength), which the instrument reads as stale until Stacy's C1 re-confirm (E5); no link, reading or routing rule changes, and no dispositions row is added or removed` *(heuristic not run: the drafting worktree has no `node_modules`; the application re-runs `--ci`)*
- `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts, citing corpus governance/, .kiro/steering/, canonical/) — sites 7 and 11 and E2–E4 add no get_section / get_document_* citation`
- `**Census**: not in scope — audience-banner guard (scripts/audience-banner/predicate.ts, SCAN_SCOPE governance/*.md) — governance/release-management-system.md and governance/classification-map.md already carry their banners; the edit adds no governed doc and removes no banner` *(no register row names this guard, so the line is not owed; it is here because `npm run test:scripts` runs it and #491 went red on it)*
- No line is owed for the rows whose `checks` are `[]`: `release-falsity-floor` (sites 2 and 6 touch its POINTER-GRADE homes), `issues-obligation-lapse` and `instrument-rows-disposed-not-fixed` (site 8's file), `instrument-census-at-draft` (site 9's file). `record-first-ratification`'s check is procedural, not code. **Heuristic, not a census**: `scripts/issues-owned.sh` reads rule 1's Trigger grammar, and site 8 touches rule 10 only, so no token's reading changes.

**Cap**: eleven queue rows, in six RELEASE-FLOW sites (three of them rewrites of an existing line, not additions), one recipe sentence, one README sentence, two ballots-README entries and one charter paragraph, with their execution sites. **Retroactivity**: none. The batch binds from its application merge; the release after 16.1.0 is the first walked under it. Nothing in 16.1.0's records is re-decided.
**Deadline**: the queue record's Trigger is `release:next:phase-1`. A row with neither a merged vehicle nor a dated disposition line at the next release's S lapses there, and the record is P2 `(guard)`, so its first lapse goes to Peter. RS-37 and RS-49 bite at the next walk and the next 5.4 if they are not applied before them.

> **Conflict of interest, stated first.** Four of these rows are defects in my own text or my own act: RS-33's false sentence shipped in the release PR I authored (#494) and took as written; RS-34's `TBD` heading, RS-39's "no shipped file was removed" and RS-41's stale "not checked yet" were in the CHANGELOG entry I wrote; RS-37's missing delegate brief was mine to write (signing-act ballot § 5.3). I chose every after-text. Stacy's review, Ada's consult and Peter's ratification are the checks.

---

## 1. The gap: what 16.1.0's claims pass found that the flow does not prevent

Source for every row: `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` (phase 1 and addenda, #497 `55c218cfd`; phase 2, #510 `b1a07fb7b`; line numbers hold at both and at `99eabf854`). The queue record carries each row's law, disposition and vehicle; this section says only what failed.

| Row | What happened at 16.1.0 (finding) | The gap in the flow |
|-----|-----------------------------------|---------------------|
| RS-33 | The pre-S consult proposed seven replacement sentences; the release took them verbatim; one was false ("The other Kiro agents were run on a preview", RL-19, L343) | Nothing governs a pre-S release read. The mirror clause binds criterion text only (L633) |
| RS-34 | The packed CHANGELOG heading shipped `TBD` (RL-21, L370) | Step 2 says "retitle to the version" and is silent on the date; the plan to date it "at the tag" cannot reach a packed file |
| RS-37 | The first delegate audit under § 5.3 did not run: `0 / 135` (RL-25, L428) | No walk item owes it before phase 1 (L637) |
| RS-38 + RS-29 | #473 changed `owed-set.sh`'s classification; four surfaces that describe it were not swept (RL-22, L377). RS-29 is the mirror (16.0.0's RL-15: script comments said `proposed` after the register flipped to `armed`) | No rule makes an instrument PR sweep the text that restates it |
| RS-39 + RS-25 | "No shipped file was removed" shipped while two were removed (RL-20, L363); 16.0.0's RS-25 is the same class for generated files' contents | Nothing asks the author to compare the packed output with the previous public artifact before writing the entry |
| RS-40 | A CORRECTION fixed its ruled lines and left the same class elsewhere in the file (RL-27, L963) | The CORRECTION form says nothing about the rest of the file |
| RS-41 | A CHANGELOG disclosure citing a record went stale before the tag (RL-28, L976) | No step re-reads a cited record at the final S |
| RS-43 | Four CORRECTIONs cited an observation record still on an unmerged branch (RL-30, L1287; #500, #502, #504, #505) | Nothing says where the cited record must be at the merge |
| RS-46b | The 3a greps returned different orders run to run in one session's shell (the queue record reproduced six hashes in six runs) | The walk's paste is not byte-reproducible across shells |
| RS-48 | Twice an absent `time["<v>"]` meant "accepted, still processing", not "not published"; npm's `+` line printed for a publish the registry did not record (O-45, L2119; RL-36) | Step 6 L150 gives one reading of an absent `time["<v>"]` |
| RS-49 | 16.0.0's tarball was published again, out of flow, in 16.1.0's 5.4 window; immutability made it harmless (RL-36, L2036) | 5.4's "never a tarball the script did not produce" is met by any script tarball, of any version |

## 2. The rows: what each site does, and what drafting changed

**RS-46b, site 1.** Stacy's read (in #521's body) asks for `| LC_ALL=C sort`, because a plain `sort` orders by locale. **Folded, with one correction found by running it**: in a pipe, `$?` is `sort`'s, so `grep … | LC_ALL=C sort; echo "exit $?"` prints `exit 0` on an empty result and the walk record loses its "empty, exit 1" fact. Measured in this worktree with `bash --noprofile --norc` (bash 3.2.57): the plain pipe printed `plain-pipe exit 0` for a no-hit pattern, the unsorted grep `exit 1`. The after-text runs each grep in a subshell with `pipefail`. Extracted from a scratch copy of RELEASE-FLOW with site 1 applied and run in this worktree at `99eabf854` with `V=16.2.0`, the block printed one sha256 three times (`6e6a66ce…5cac06`; twice in bash, once in `zsh -f`), and the same form with a no-hit pattern printed `exit 1` in both shells. The cause the queue found (a `grep` shell function in the session's snapshot, not BSD grep) is the environment's; sorting is harmless on every grep and makes the paste reproducible wherever it comes from.

**RS-33, sites 2 and 11.** A rule for the pre-S read in 3a's neighbourhood, and the same act named in Stacy's charter beside the clause it extends. The fork (F-33a) is the text: (i) the read names what is false and why and proposes nothing; (ii) it may propose, and a proposed sentence needs a second reader, named in the release PR body. Site 11 lands inside a signed, `retained` unit, so it ships to consumers' Stacy charter and costs an operative-set item, a regeneration and a C1 re-confirm (E5, E6). That cost is F-33b (include or strike).

**RS-37, site 2.** One walk row for the delegate audit, with its file path and the disposition `owed` until the file is committed. It names no new duty: § 5.3 already names who briefs, who dispatches and who walks. It gives the duty a place the walk reads before phase 1.

**RS-34, sites 3 and 7.** Where the heading's date comes from. Under F-34 (i) it is the UTC date the release PR is opened, written again by a new S; Stacy's own residual (L906: "a day off … is not a falsity") is written in. Under (ii) the heading has no date.

**RS-39 with RS-25, site 3.** One sub-bullet: before the entry claims a file, export or generated output was added, kept, removed or changed, the author compares the packed output with the previous public tarball and pastes both results. **Drafting changed the queue's surviving counter** ("a local `npm pack` before S may differ from S's tarball"): `release-publish.ts --dry-run` accepts a commit not on `origin/main`, with a warning (`scripts/release-publish.ts` L281–L283 at `99eabf854`, read, not run), so the author can pack the release branch's pushed head by the same hermetic path 5.1 uses at S. Whether `git fetch <origin> <sha>` of a branch head works from the script's clone is **unverified** (consult question A-2).

**RS-49, site 4.** **The queue's fork (ii) premise is already true**: 5.3 hands over the exact 5.4 command (`release-publish.ts` L388–L390 print `shasum <tarball>`, the sha1 to expect and `npm publish <tarball> …`; RELEASE-FLOW L134 says so). RL-36 happened anyway: the command that ran named 16.0.0's tarball, and its cause is not on record (RL-36: "I do not infer one"). So the fork is reframed. **(i)** The text binds 5.4 to this release's 5.3 tarball, by its printed path and its recorded sha1, and names the tarballs that meet the old letter and are not it (5.1's, a pre-S dry run's, another release's). Binding to the version alone, as the queue first framed it, would still admit 5.1's tarball of the same version from an abandoned S. **(ii)** As (i), and the line 5.3 prints runs its own checks (the sha1 against the record, and `<version>` not yet on npmjs) before the publish, and the text says to copy it, never type it. (ii) refuses RL-36's case if that command was a printed 5.4 line from 16.0.0's run, because 16.0.0 is on npmjs; if it was typed, neither option refuses it, and only immutability did.

**RS-48, site 5.** L150's two readings of an absent `time["<v>"]`, the measured windows, "read the packument, then re-run the rail" (16.0.0's practice, `docs/releases/16.0.0/publish-verification.txt` L128), and the sentence that npm's `+` line is not evidence. **The same sentence lives in two more places** (RS-38's class inside this batch): `scripts/verify-publish-rail.sh` L42–L49 and its L81 message (Ada's, E1) and the `publish-rail-guard` row's `checks` HONEST REACH (E2). The batch sweeps both.

**RS-41, site 6.** One sentence in the Phase 1 bullet: at the final S, each record a packed CHANGELOG sentence cites is re-read, and a sentence its record has since made false is a finding under 3a's blocking test. **Drafting weakened the alternative** (F-41 (ii), stop citing records in packed text): the stale sentence at 16.1.0 ("were not checked … yet") was false because the work moved, not because it cited a record. Dropping the citation removes the pointer a reader would use to notice, and leaves the sentence as stale.

**RS-43, site 8.** One rule-10 sentence: the cited record may land first or travel in the CORRECTION, provided it resolves at the merge commit. Two forks: ride here or a separate ballot (F-43a), and "either" or "land first" (F-43b).

**RS-38 with RS-29, site 9.** The narrow form the queue leaned to: a `**Straggler sweep**:` line on a PR that changes what a script prints, refuses or decides, where the script is named in RELEASE-FLOW or a register row's `checks`, and its mirror for a `check_state` flip. The scope is decidable by `git grep`, and `owed-set.sh` (in no row's `checks`) is in it through RELEASE-FLOW. It sits beside the census in the ballots README because it is the census's mirror. F-38 is narrow or broad.

**RS-40, site 10.** A CORRECTION whose observation names a class of text runs a whole-file sweep and states every hit. F-40 is whether a hit may be left with a reason (a) or every hit must be fixed (b).

## 3. Edit sites (after ratification; byte for byte at `99eabf854`)

Each block is the whole line or lines, cut from the file by script. Where a site has a fork, one After block is given per option; the Status commit carries the picked option's After as the resolved text. `<application date>` is the application commit's date. Every law-doc site carries its dated pointer in its After (the 2026-10-25 lesson, ballot `2026-10-25-rule-11-post-walk-filings-and-spec-answers` § 7 item 4).

### Site 1 — RS-46b — the 3a greps, sorted

`.kiro/hooks/RELEASE-FLOW.md` L32–L34 at `99eabf854`.

Before:

````text
   grep -nE '^\*\*Trigger\*\*: `(release:('"$VE"'|next):phase-1|tag:v'"$VE"')`' .kiro/issues/*.md; echo "due-rows exit $?"
   grep -nE '^\*\*Class\*\*: P0' .kiro/issues/*.md; echo "P0 exit $?"
   ```
````

After:

````text
   (set -o pipefail; grep -nE '^\*\*Trigger\*\*: `(release:('"$VE"'|next):phase-1|tag:v'"$VE"')`' .kiro/issues/*.md | LC_ALL=C sort); echo "due-rows exit $?"
   (set -o pipefail; grep -nE '^\*\*Class\*\*: P0' .kiro/issues/*.md | LC_ALL=C sort); echo "P0 exit $?"
   ```
   Both greps print their hits sorted (`LC_ALL=C sort`), so the walk record's paste is the same in every shell, and `pipefail` keeps the printed exit code grep's: `1` still means no hit. *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-46; prior text at `99eabf854`)*

````

### Site 2 — RS-33 and RS-37 — the pre-S read and the delegate audit, two paragraphs after the deferrals paragraph

`.kiro/hooks/RELEASE-FLOW.md` L39 at `99eabf854`.

Before:

````text
   The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*
````

After, F-33 (i):

````text
   The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*

   **A pre-S read of release text** (any seat's read, before S, of the release notes, the `CHANGELOG.md` entry or other packed text) names each sentence it finds false and why, with the evidence. It proposes no replacement sentence. The replacement is the text's owner's: the release author writes it and reads it against that evidence before the release PR merges. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*

   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3). The walk record carries one row for it, which is not a record row: the delegate seat (the next of Ada, Lina and Leonardo after the previous walk's delegate line), the brief's path, and the file `delegate-audit-release-<V>-<seat>.md` in the directory where the release's claims-pass record is written. Its disposition is `owed` until the seat commits the file, then the file's path @ SHA. Thurgood writes the brief and the orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*
````

After, F-33 (ii):

````text
   The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*

   **A pre-S read of release text** (any seat's read, before S, of the release notes, the `CHANGELOG.md` entry or other packed text) names each sentence it finds false and why, with the evidence, and may propose a replacement. A proposed sentence ships only after a seat other than its proposer has read it against that evidence, and the release PR body carries one line for it: `**Second reader**: <seat> — <the sentences read>`. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*

   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3). The walk record carries one row for it, which is not a record row: the delegate seat (the next of Ada, Lina and Leonardo after the previous walk's delegate line), the brief's path, and the file `delegate-audit-release-<V>-<seat>.md` in the directory where the release's claims-pass record is written. Its disposition is `owed` until the seat commits the file, then the file's path @ SHA. Thurgood writes the brief and the orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*
````

### Site 3 — RS-34 (the heading's date) and RS-39 with RS-25 (the packed-output compare), step 2

`.kiro/hooks/RELEASE-FLOW.md` L108 at `99eabf854`.

Before:

````text
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version; recipe step 4 in `governance/release-management-system.md`),
````

After, F-34 (i):

````text
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version and the date, `## [<version>] — <YYYY-MM-DD> — <title>`, where the date is the UTC date the release PR is opened, `date -u +%F`, and a new S writes it again; the packed file is S's, so no later step can date it, and a heading a day off the tag's date is not a falsity; recipe step 4 in `governance/release-management-system.md`; *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `99eabf854`)*),
   - **before the entry says that a file, an export or a generated output was added, kept, removed or changed, compare the packed output with the previous public artifact**, and paste both results in the release PR body. This release's tarball: after `git fetch origin`, `npx tsx scripts/release-publish.ts --dry-run <the release branch's pushed head>`, run from the main checkout (a dry run of a commit not on `origin/main` is allowed, with a warning). The previous release's tarball: `npm pack @3fn/core@<previous version> --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --pack-destination <tmp>`. The file set: `comm -3 <(tar -tzf <previous>.tgz | LC_ALL=C sort) <(tar -tzf <this>.tgz | LC_ALL=C sort)` (column 1 removed, column 2 added). The generated files the entry describes: a `diff` of each between the two extracted tarballs. 5.1 packs again at S, and phase 1 compares S's tarball; this compare is the author's, before S. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-39 and RS-25)*
````

After, F-34 (ii):

````text
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version, with no date in the heading: the packed file is S's, so no later step can date it, and the date is the tag's and the release notes'; recipe step 4 in `governance/release-management-system.md`; *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `99eabf854`)*),
   - **before the entry says that a file, an export or a generated output was added, kept, removed or changed, compare the packed output with the previous public artifact**, and paste both results in the release PR body. This release's tarball: after `git fetch origin`, `npx tsx scripts/release-publish.ts --dry-run <the release branch's pushed head>`, run from the main checkout (a dry run of a commit not on `origin/main` is allowed, with a warning). The previous release's tarball: `npm pack @3fn/core@<previous version> --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --pack-destination <tmp>`. The file set: `comm -3 <(tar -tzf <previous>.tgz | LC_ALL=C sort) <(tar -tzf <this>.tgz | LC_ALL=C sort)` (column 1 removed, column 2 added). The generated files the entry describes: a `diff` of each between the two extracted tarballs. 5.1 packs again at S, and phase 1 compares S's tarball; this compare is the author's, before S. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-39 and RS-25)*
````

### Site 4 — RS-49 — what 5.4 may publish

`.kiro/hooks/RELEASE-FLOW.md` L136 at `99eabf854`.

Before:

````text
   - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): first check the printed sha1 against the file, then run `npm publish <tarball> --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`. **Never a folder publish, never `--ignore-scripts`, never a tarball the script did not produce.** A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
````

After, F-49 (i):

````text
   - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): first check the printed sha1 against the file, then run `npm publish <tarball> --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`. **Never a folder publish, never `--ignore-scripts`, never a tarball other than the one this release's 5.3 run printed**: its path is 5.3's `tarball:` line, and its sha1 equals that run's `release-publish-record.json`. A tarball the script made at 5.1, at a pre-S dry run (step 2) or for another release is not it, though the script produced it. *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-49; prior text at `99eabf854`)* A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
````

After, F-49 (ii):

````text
   - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): run the 5.4 line that 5.3 printed, copied and never typed: it checks the file's sha1 against the record and that `<version>` is not yet on npmjs, and runs `npm publish <tarball> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public` only if both hold. **Never a folder publish, never `--ignore-scripts`, never a tarball other than the one this release's 5.3 run printed**: its path is 5.3's `tarball:` line, and its sha1 equals that run's `release-publish-record.json`. A tarball the script made at 5.1, at a pre-S dry run (step 2) or for another release is not it, though the script produced it. *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-49; prior text at `99eabf854`)* A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
````

### Site 5 — RS-48 — reading an absent `time["<version>"]`, step 6

`.kiro/hooks/RELEASE-FLOW.md` L150 at `99eabf854`.

Before:

````text
   - If the packument (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no `time["<version>"]`, the version is not published yet. A 404 is then the correct answer, not indexing lag (15.0.0's R-4).
````

After:

````text
   - If the packument (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no `time["<version>"]`, the registry has not recorded the version. Either it was never accepted (15.0.0's R-4: six 404s preceded the publish), or npm accepted it and is still processing it: npm prints "Your package is being processed and may take a few minutes to become available", and the measured windows are 10 min 59 s (16.0.0) and at least 1 min 59 s (16.1.0). Either way the 404 is the correct answer, not indexing lag, and the release is not announced. Read the packument again until `time["<version>"]` appears, and re-run the rail only then; this step sets no bound on the wait, because no publish has yet been measured that npm accepted and never recorded. npm's `+ @3fn/core@<version>` line is not evidence that the registry recorded the version: it printed for an out-of-flow publish of 16.0.0's tarball that the registry did not record (16.1.0's RL-36). *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-48; prior text at `99eabf854`)*
````

### Site 6 — RS-41 — the cited-record re-read at the final S, Phase 1 bullet

`.kiro/hooks/RELEASE-FLOW.md` L199 at `99eabf854`.

Before:

````text
   - **Phase 1** runs on **S after 5.1 is green and before the tag (5.2)**. A red 5.1 moves S, so phase 1 never reads a commit that will not be tagged (A7). It covers the release delta, the walk record (item 3a: its paste, its `main at:` SHA and each row's disposition), the 5a owed-set paste, the 5b arming line and 5.1's tally. It also re-runs item 3a's two greps at S and reads each hit the walk record does not row under rule 11's row test: a P0 among them is a floor-class row for this release, owed a fix or Peter's quoted, dated waiver before the tag (put to him as an `**Open for Peter**:` line in the phase-1 record's PR, which that rule holds until he answers; the read reports, and the tag stays his act); any other is listed with its rule-11 state *(added 2026-10-26 by ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers, site 3)*. Its record lands by a record-only PR and states `publish-rail liveness: owed`.
````

After, F-41 (i):

````text
   - **Phase 1** runs on **S after 5.1 is green and before the tag (5.2)**. A red 5.1 moves S, so phase 1 never reads a commit that will not be tagged (A7). It covers the release delta, the walk record (item 3a: its paste, its `main at:` SHA and each row's disposition), the 5a owed-set paste, the 5b arming line and 5.1's tally. It also re-runs item 3a's two greps at S and reads each hit the walk record does not row under rule 11's row test: a P0 among them is a floor-class row for this release, owed a fix or Peter's quoted, dated waiver before the tag (put to him as an `**Open for Peter**:` line in the phase-1 record's PR, which that rule holds until he answers; the read reports, and the tag stays his act); any other is listed with its rule-11 state *(added 2026-10-26 by ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers, site 3)*. It also re-reads, at the final S, each `.kiro/issues/` record that a packed `CHANGELOG.md` sentence cites, and reads the sentence against it: a sentence its record has since made false is a finding against S under 3a's blocking test *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-41)*. Its record lands by a record-only PR and states `publish-rail liveness: owed`.
````

After, F-41 (ii):

````text
(no change to this line)
````

### Site 7 — RS-34 second surface (and RS-41 under F-41 (ii)) — the recipe's step 4

`governance/release-management-system.md` L40 at `99eabf854`.

Before:

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version. A release with no consumer-facing change still gets an entry that says so. `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

After, F-34 (i), F-41 (i):

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version and the date the PR is opened (RELEASE-FLOW step 2). *(Amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `99eabf854`.)* A release with no consumer-facing change still gets an entry that says so. `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

After, F-34 (ii), F-41 (i):

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version, with no date in the heading (RELEASE-FLOW step 2). *(Amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `99eabf854`.)* A release with no consumer-facing change still gets an entry that says so. `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

After, F-34 (i), F-41 (ii):

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version and the date the PR is opened (RELEASE-FLOW step 2). *(Amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `99eabf854`.)* A release with no consumer-facing change still gets an entry that says so. A packed sentence states its fact without citing a `.kiro/issues/` record; record paths go in the release notes, which are not packed. *(Added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-41.)* `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

After, F-34 (ii), F-41 (ii):

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version, with no date in the heading (RELEASE-FLOW step 2). *(Amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `99eabf854`.)* A release with no consumer-facing change still gets an entry that says so. A packed sentence states its fact without citing a `.kiro/issues/` record; record paths go in the release notes, which are not packed. *(Added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-41.)* `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

### Site 8 — RS-43 — where a CORRECTION's observation record must be, rule 10

`.kiro/issues/README.md` L19 at `99eabf854`.

Before:

````text
10. **Filing rule.** A ruling or a claims pass that creates an obligation files an issue record for it, or appends to the existing one, **in the same PR that records the ruling or the pass**. An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it. A record filed for another owner names its filer; rule 9 applies to every later edit. A grant list is never authored only inside the diff it bounds: it is in a merged record first, or Peter's direction naming its paths is on the record **outside** that diff — a dated line in a record merged earlier, or Peter's own comment on the PR.
````

After, F-43b either:

````text
10. **Filing rule.** A ruling or a claims pass that creates an obligation files an issue record for it, or appends to the existing one, **in the same PR that records the ruling or the pass**. An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it. A record filed for another owner names its filer; rule 9 applies to every later edit. A grant list is never authored only inside the diff it bounds: it is in a merged record first, or Peter's direction naming its paths is on the record **outside** that diff — a dated line in a record merged earlier, or Peter's own comment on the PR. An observation record that a CORRECTION cites (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds") may be merged before the CORRECTION or travel in its PR, provided it resolves at the CORRECTION's merge commit: the record is in that PR's own diff or in an ancestor of its merge *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-43)*.
````

After, F-43b land first:

````text
10. **Filing rule.** A ruling or a claims pass that creates an obligation files an issue record for it, or appends to the existing one, **in the same PR that records the ruling or the pass**. An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it. A record filed for another owner names its filer; rule 9 applies to every later edit. A grant list is never authored only inside the diff it bounds: it is in a merged record first, or Peter's direction naming its paths is on the record **outside** that diff — a dated line in a record merged earlier, or Peter's own comment on the PR. An observation record that a CORRECTION cites (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds") is merged before the CORRECTION's PR opens; a CORRECTION citing a record that is not an ancestor of its PR's base is a finding on that PR *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-43)*.
````

### Site 9 — RS-38 with RS-29 — the straggler line on an instrument PR, ballots README § "Conventions"

`.kiro/docs/ballots/README.md` L37 at `99eabf854`.

Before:

````text
- **Re-runs**: at application the census is re-run and compared input by input with the ratified delta. A difference in an input unchanged since the census SHA (`git diff --name-only <census-sha> <run-sha> -- <corpus>`) stops that item, which is reported, not adapted. Differences in inputs that changed since then are listed. An exempt item's application run is compared with its count, and a difference stops it in the same way. The PR that ships the instrument change runs the scratch diff and the shipped code at its own base. Their digests must be equal, with no carve-out, or the PR stops and reports.
````

After, F-38 narrow:

````text
- **Re-runs**: at application the census is re-run and compared input by input with the ratified delta. A difference in an input unchanged since the census SHA (`git diff --name-only <census-sha> <run-sha> -- <corpus>`) stops that item, which is reported, not adapted. Differences in inputs that changed since then are listed. An exempt item's application run is compared with its count, and a difference stops it in the same way. The PR that ships the instrument change runs the scratch diff and the shipped code at its own base. Their digests must be equal, with no carve-out, or the PR stops and reports.
- **Straggler sweep on an instrument PR** *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-38 and RS-29)*. A PR that changes what a script prints, refuses or decides, where the script is named by path in `.kiro/hooks/RELEASE-FLOW.md` or in the `checks` of a `governance/classification-map.md` row, carries one line in its body: `**Straggler sweep**: git grep -n -F <the script's file name> -- .kiro/hooks/RELEASE-FLOW.md governance canonical/agents canonical/profiles/consumer .kiro/steering — <n> hits`, then each hit as `<path>:<line> — true`, `— fixed` or `— left: <reason>`. A PR that changes a row's `check_state` carries the same line for `git grep -n -F <the row's id> -- scripts .kiro/hooks tools`. A message change counts here, unlike in the census. A hit left false is filed under `.kiro/issues/README.md` rule 10. The census above reads what a law change does to an instrument; this sweep reads what an instrument change does to the law text.
````

### Site 10 — RS-40 — a CORRECTION's sweep, ballots README § "When a governance edit needs a ballot — three kinds"

`.kiro/docs/ballots/README.md` L56 at `99eabf854`.

Before:

````text
**The rot mode, named**: a LAW change dressed as an EXECUTION or a CORRECTION to skip the ballot. Its detector is the claims-pass read (Stacy's charter, "The governance-edit-kind read").
````

After, F-40 (a):

````text
**The rot mode, named**: a LAW change dressed as an EXECUTION or a CORRECTION to skip the ballot. Its detector is the claims-pass read (Stacy's charter, "The governance-edit-kind read").

**A CORRECTION's sweep** *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-40)*: a CORRECTION whose observation names a class of text (a kind of name, value or claim, not one sentence) carries one line per corrected file in its PR body, `**Sweep**: <path> — <a command over the whole file> — <n> hits; fixed: <lines>; left: <lines, each with its reason>`. A hit may be left, for example to keep a ruled list's diff reviewable. It is never left unstated, and a hit left false is filed under `.kiro/issues/README.md` rule 10.
````

After, F-40 (b):

````text
**The rot mode, named**: a LAW change dressed as an EXECUTION or a CORRECTION to skip the ballot. Its detector is the claims-pass read (Stacy's charter, "The governance-edit-kind read").

**A CORRECTION's sweep** *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-40)*: a CORRECTION whose observation names a class of text (a kind of name, value or claim, not one sentence) fixes every hit of that class in each file it corrects, and carries one line per corrected file in its PR body, `**Sweep**: <path> — <a command over the whole file> — <n> hits, <n> fixed`.
````

### Site 11 — RS-33 — Stacy's charter, § "The mirror anti-rot clause"

`canonical/agents/stacy.md` L463 at `99eabf854`.

Before:

````text
Named prohibition, named caller-out, **called at the exchange** rather than in a later ledger. It binds the LENS seat specifically. The clause is symmetric with Thurgood's (he may check that an audit happened, never re-decide what it concluded); the two are enforced the same way.
````

After, F-33 (i):

````text
Named prohibition, named caller-out, **called at the exchange** rather than in a later ledger. It binds the LENS seat specifically. The clause is symmetric with Thurgood's (he may check that an audit happened, never re-decide what it concluded); the two are enforced the same way.

**It binds her pre-S release read too**: there she names each release sentence she finds false and why, with the evidence, and never proposes its replacement; the text is its owner's. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*
````

After, F-33 (ii):

````text
Named prohibition, named caller-out, **called at the exchange** rather than in a later ledger. It binds the LENS seat specifically. The clause is symmetric with Thurgood's (he may check that an audit happened, never re-decide what it concluded); the two are enforced the same way.

**At her pre-S release read** she names each release sentence she finds false and why, with the evidence, and may propose a replacement; a sentence she proposed ships only after a seat other than her has read it against that evidence. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*
````

After, F-33b strike:

````text
(no change)
````


## 4. Execution sites (EXECUTION of the sites above; each owner's text)

**E1 — `scripts/verify-publish-rail.sh` header (L42–L49) and FAIL[version] message (L81). Ada** (her standing scope, six-roots § 2.6; no grant). EXECUTION of site 5. The script restates L150's reading, so it says the same thing after site 5: two readings of an absent `time["<version>"]`, read the packument until it appears before re-running, and the `+` line is not evidence. Exit codes and checks are unchanged. Proposed message, hers to word: `FAIL[version]: ${PKG}@${VERSION} is not visible on ${REGISTRY} (HTTP ${HTTP_CODE}) — do not announce this release. Before re-running, read the registry's own record: if the packument (curl -s ${REGISTRY}/${PKG_PATH}) has no time["${VERSION}"], the registry has not recorded the version (never accepted, or accepted and still processing), this 404 is the correct answer, not indexing lag, and npm's "+ ${PKG}@${VERSION}" line is not evidence; read the packument again until time["${VERSION}"] appears, then re-run by hand.` The recorded red `scripts/__bites__/bite-2-version-mismatch-exit10.txt` holds the old message; whether it stays as a dated measurement or is re-recorded is hers (A-3).

**E2 — `governance/classification-map.md` row `publish-rail-guard`, `checks` (L890), the HONEST REACH sentence. Thurgood** (row owner and register steward). EXECUTION of site 5.
- Before (substring of L890, one occurrence): `A 404 is read against the registry's own record, never assumed to be indexing lag: if the packument has no time['<version>'], the version is not published and the 404 is the correct answer (15.0.0's R-4: six 404s preceded the publish); only if time['<version>'] is present and the 404 persists within a few minutes of it is the run repeated, by hand and never by automatic retry.`
- After: `A 404 is read against the registry's own record, never assumed to be indexing lag: if the packument has no time['<version>'], the registry has not recorded the version, either never accepted (15.0.0's R-4: six 404s preceded the publish) or accepted and still processing (16.0.0, 16.1.0), and the 404 is the correct answer; the packument is read again until time['<version>'] appears, and only if it is present and the 404 persists within a few minutes of it is the run repeated, by hand and never by automatic retry. npm's '+ <pkg>@<version>' line is not evidence that the registry recorded the version.`
- One history line: `{ date: <application date>, change: "checks[] HONEST REACH sentence re-worded to step 6's two readings of an absent time['<version>'] (ballot 2026-10-26-release-flow-batch-16-1, RS-48, site 5); the script's FAIL[version] message and header say the same (E1). EXECUTION; rule, owner, checks and check_state unchanged", by: thurgood }`.

**E3 — row `hermetic-publish-path`, `disposition` (L914), the HONEST REACH clause. Thurgood as steward, Ada consulted** (row owner `ada`). EXECUTION of site 4.
- Before (substring of L914): `HONEST REACH: a publish run with --ignore-scripts, or of a tarball the script did not produce, is NOT detected before publish; 6b's sha1 comparison detects it after publish, and published bytes cannot be replaced`
- After, F-49 (i): `HONEST REACH: a publish run with --ignore-scripts, or of a tarball other than this release's 5.3 tarball (one the script made at 5.1, at a pre-S dry run or for another release included), is NOT detected before publish; 6b's sha1 comparison detects it after publish, and published bytes cannot be replaced`
- After, F-49 (ii): `HONEST REACH: a publish run with --ignore-scripts, or of a tarball other than this release's 5.3 tarball (one the script made at 5.1, at a pre-S dry run or for another release included), is NOT detected before publish unless the operator runs the 5.4 line 5.3 printed, which checks the file's sha1 against the record and that the version is not yet on npmjs; 6b's sha1 comparison detects it after publish, and published bytes cannot be replaced`
- One history line, the same form as E2's, naming RS-49 and site 4.

**E4 — row `release-falsity-floor`, `disposition` (L1193). Thurgood. Only under F-41 (i).** After `RELEASE-FLOW Phase 1, the S re-read (ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers, site 3)` insert `; RELEASE-FLOW Phase 1, the cited-record re-read (ballot 2026-10-26-release-flow-batch-16-1, RS-41)`, and one history line. `checks` stay `[]`.

**E5 — the operative set and the C1 act for site 11. Only under F-33b include.** Thurgood (the profile author, as at #491) adds one item to `canonical/operative-sets/stacy.yaml`, unit `#the-mirror-anti-rot-clause-verbatim-at-countersigned-strength`, after `mirror-binds-lens`:

```yaml
      - id: mirror-binds-pre-s-read
        kind: obligation
        label: "It binds the pre-S release read"
        text: "<site 11's paragraph from its first character through its last sentence's full stop, verbatim; the pointer is not part of the item>"
```

For F-33 (i) the text is `**It binds her pre-S release read too**: there she names each release sentence she finds false and why, with the evidence, and never proposes its replacement; the text is its owner's.` The unit's `canonicalHash` is the confirmer's object, never the author's. **Stacy** then re-confirms the unit in her seat, one commit (a C1 act; no grant, signing-act ballot M1). The unit's consumer disposition is `retained`, so the paragraph ships in consumers' Stacy charter; it cites no internal path for that reason. Whether the disposition should re-point it is her call (S-1).

**E6 — regeneration. Thurgood.** `npm run build:generator`, then `npx tsx tools/agent-generator/generate.ts`. Expected outputs: `.claude/agents/stacy.md`, `.kiro/agents/stacy-prompt.md`, the three `canonical/_consumer-output/**/stacy*` renderings and their `.attribution.json` files. The exact list is enumerated by a dry run on the application branch before the authoring commit and pasted in the PR body (the #526 method); a file outside it stops the PR. `canonical/generated.lock` is refreshed by a green full `npm run -s check:122:diff-guard`.

**E7 — under F-49 (ii) only. Ada** (standing scope; no grant). `scripts/release-publish.ts`: the 5.4 line printed after 5.3 runs its two checks before `npm publish` (the file's sha1 equals the record's; `<version>` is not on npmjs), and the dry run stops printing a runnable `npm publish` line for its own tarball (L384–L385 print one today, the tarball site 4 says is never it). `scripts/__tests__/release-publish.test.ts` L313 and L363 assert the printed command and change with it. Her PR body names the exercised file (six-roots test rule). The shape is hers (A-1).

**E8 — records. Thurgood.** The ballots README roll entry (in the Status commit, or the application PR if the Status commit is ballot-only). At the application merge, one dated line per row on `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` naming the PR, and a dated `declined` line for any row Peter strikes (rule 9; the record is mine).

## 5. Application (after the Status commit)

1. **The Status commit** (record-first, ballot only): `**Status**: **RATIFIED (Peter, <date>)**`, his words and the clock bound they were received before, each fork's answer, and a `## Resolved after-texts` section carrying the picked After of every site and E-site, each law-doc site's pointer included (checked by `grep -c 'release-flow-batch-16-1'` per site before the commit). A struck row's sites are removed there, not left.
2. **Ada**, E1 and (under F-49 (ii)) E7: her commits under `Agent: Ada`, on the application branch or in her own PR merged before it, so the rail's message and step 6 never disagree on `main`.
3. **Thurgood**, one application PR (branch `chore/apply-release-flow-batch-16-1`): sites 1–10 as resolved; E2–E4; under F-33b include, site 11 byte for byte from the resolved text, then E5's item and E6. The PR body carries:
   - `**Edit kind**: .kiro/hooks/RELEASE-FLOW.md — LAW (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md)`
   - `**Edit kind**: governance/release-management-system.md — LAW (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md)`
   - `**Edit kind**: canonical/agents/stacy.md — LAW (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md)`
   - `**Edit kind**: governance/classification-map.md — EXECUTION (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md § 4 E2–E4)`
   - The two READMEs are not on the edit-kinds path list; the body cites this ballot for them.
   - The grant below, cited with its path list; the `**Consulted**:` line (Stacy, Ada).
4. **Stacy**, E5's C1 re-confirm, after Thurgood's authoring commit, one commit in her seat (merge-only; never amended).
5. **Checks**, each pasted in the PR body with its result: `npm run -s check:section-citations`; `npm run -s check:122:diff-guard` (full run; the lock); `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci`; `npm run test:scripts` (the audience-banner guard; `release-publish.test.ts` under F-49 (ii)); `npm test`; `node scripts/validate-steering-metadata.js`; the docs MCP `rebuild_index` and `get_index_health` (the recipe is served). **Site 1's own claim**: the resolved 3a block run twice with `bash --noprofile --norc` and once with `zsh -f` over `.kiro/issues/*.md`, equal sha256 each time, and a no-hit pattern printing exit 1.
6. **Straggler sweep**, case-sensitive `git grep -n -F`, with expected hits compiled against the resolved after-texts and their generated copies (ballot `2026-10-25-rule-11-post-walk-filings-and-spec-answers` § 7 item 1), over `-- . ':!.kiro/specs' ':!.kiro/docs/ballots' ':!.kiro/issues' ':!docs'`:
   - `not published yet` and `the version is not published`: none after (at `99eabf854`: RELEASE-FLOW L150; `verify-publish-rail.sh` L46, L81; the register L890).
   - `a tarball the script did not produce`: none after (at `99eabf854`: RELEASE-FLOW L136; the register L914).
   - `.kiro/issues/*.md; echo`: none after in `.kiro/hooks`.
   - `retitles it to the version`: the recipe L40 only.
   - `pre-S release read` (F-33b include): site 11 and its five generated copies only.
   - `release-flow-batch-16-1`: every resolved site's pointer, E2–E4's history lines, the roll entry, site 11's generated copies.
   - **Known left hit, stated**: Stacy's RELEASE row (`canonical/agents/stacy.md` L400) restates what phase 1 reads, and after site 6 omits the cited-record re-read (it already omits #492's S re-read). It is her edit, outside this ballot (S-4).
7. **Order**: before the next release's walk (3a). A row not applied by then gets its dated line under E8, or the queue record lapses on it.

**Grant (activated by this ratification)**: Peter's ratification of this ballot grants, until the application PR merges: **Thurgood** — `.kiro/hooks/RELEASE-FLOW.md` (sites 1–6); `governance/release-management-system.md` (site 7); `.kiro/docs/ballots/README.md` (sites 9–10, the roll entry); `canonical/agents/stacy.md` (site 11, byte for byte from the resolved text); `canonical/operative-sets/stacy.yaml` (E5's item only); `canonical/profiles/consumer/stacy.dispositions.yaml` and `canonical/profiles/consumer/stacy.overlay.md` only if Stacy's S-1 read re-points the unit, with her text; `governance/classification-map.md` (E2–E4's fields only); `canonical/generated.lock` and the generator's outputs (E6). `.kiro/issues/**` is already Thurgood's (standing scope). **Ada**: E1 and E7 are in her standing scope; no grant. **Stacy**: C1 acts need no grant (signing-act ballot M1). No `.github/**` path is touched, so no `**ARMING**:` line is owed. As rule 8 has it for a grant, the application PR's body names this grant and cites its path list, and an out-of-list edit is a claims-pass finding.

## 6. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: ratify with F-0 (a), F-33a (i), F-33b include, F-34 (i), F-38 narrow, F-40 (a), F-41 (i), F-43a ride, F-43b either and F-49 (ii). Every row is severable.

**Counter-argument, run against the proposal**:
- **(i) Spec 131 is shrinking governance, and its ruled spine includes a freeze**: "no new law except deletions until the rehearsal is green for N releases", CORRECTION edits exempt (outline § 4 (d), F-9 ruled 2026-10-24). This batch adds eleven rows of law to the document read at the release's busiest point.
- **(ii) A rule per incident is the patch-without-guard pattern in prose.** RELEASE-FLOW's own RS-7 sentence says guards live in the command the operator runs, not in a list.
- **(iii) A batch lets one surviving objection hold eleven rows**, and asks Peter to read eleven things at once.
- **(iv) Site 11 pays a signed-unit cost** (an operative-set item, a regeneration, a C1 act) and ships a DesignerPunk-internal practice in consumers' Stacy charter.

**Folded in**:
- From (i): three of the six RELEASE-FLOW sites rewrite an existing line (RS-46b, RS-48, RS-49); RS-34 lives inside an existing parenthetical; two rows share each of the RS-39/25 and RS-38/29 sentences; RS-37 adds a walk row, not a duty (§ 5.3 already names who briefs, dispatches and walks). The growth, stated: RELEASE-FLOW gains two paragraphs, one sub-bullet, one sentence and one note line; the recipe, rule 10 and the charter one sentence or paragraph each; the ballots README one bullet and one paragraph. The freeze is not in force (its N is unset, outline F-7; 131 is paused at requirements; Peter ratified #492, #495 and #516 this week, each new law), and these rows fix measured findings, which is fix-first's (a), not a new mechanism. F-0 (b) is offered for Peter to take the other side.
- From (ii): RS-46b's fix is in the command; RS-49 under (ii) moves 5.4's guard into the printed line; RS-39's compare is commands pasted with their output; RS-48 points to the packument read the rail's own message already names.
- From (iii): every row is severable at the Status commit, and a struck row gets a dated line on the queue (E8).
- From (iv): F-33b offers strike, and the paragraph cites no internal path, so the consumer copy holds no dead pointer.

**What survives**:
1. **If Spec 131's freeze lands as its outline rules it, every row here is the kind of law it would bar.** The three rewrites are the nearest to CORRECTION, which it exempts; they are filed as LAW because each adds a requirement. Ratifying now spends the window before the freeze on additions, and 131's deletion units will have these lines to weigh. The class option is F-0 (b), carrying the batch into 131 as findings for fix-first; its cost is that RS-37 and RS-49 bite at the next walk and the next 5.4.
2. **Five rows stay prose the operator must remember**: RS-33, RS-37, RS-40, RS-41 and RS-43. Their detector is Stacy's claims pass, after the act.
3. **No instrument reads a `**Straggler sweep**:` line** (site 9). Stacy's ARMING instrument-path read reaches only six-roots § 4 B's paths, so the line can become rote, as census not-in-scope lines can (her own residual on the census ballot).
4. **RS-48 sets no bound on the wait**, because no accepted-and-never-recorded publish has been measured. An operator facing a publish npm never accepted has only the packument and Peter.
5. **Site 11's cost is real for one sentence**, and the consumer gains a sentence about a release practice that is DesignerPunk's.

## 7. Forks for Peter (none is picked here)

Each: the problem, the options with their risk and opportunity, the drafter's lean, the reads, and what prevents a recurrence.

- **F-0 · The batch now, or into Spec 131.** *Problem*: eleven rows of release law while 131's ruled freeze, not yet in force, would bar new law. **(a)** Ratify now, rows severable. *Opportunity*: the delegate row and the 5.4 binding are in place for the next walk and 5.4; the queue rows close by vehicle. *Risk*: law 131 must later weigh. **(b)** Carry the rows into 131's requirements as fix-first findings, each with a dated disposition line on the queue. *Opportunity*: no growth; 131 shapes the release flow whole. *Risk*: the next release runs without RS-37's row and RS-49's binding, and 131 is paused. *Lean*: (a). *Prevention*: 131's freeze names the event it starts at, so a batch like this one knows which side it falls on.
- **F-33a · The pre-S read's text.** *Problem*: an auditor's replacement sentence shipped false and nobody read it (RL-19). **(i)** The read names what is false and why and proposes nothing (sites 2 and 11, (i)). *Opportunity*: the mirror clause's own shape; no new seat. *Risk*: the owner writes under release-day pressure with no second reader; Stacy's 1-in-7 rate moves to the owner. **(ii)** The read may propose; a proposed sentence ships after a second reader, named in a `**Second reader**:` line. *Opportunity*: keeps the auditor's speed. *Risk*: a reader of the auditor's sentence is reading the audit's conclusion. *Lean*: (i). *Reads*: Stacy L1005, "The fork above names what is false and leaves the text to its owners" (her practice since RL-19); her consult pending (S-1).
- **F-33b · Site 11, Stacy's charter.** **Include**: the duty sits in the file she loads for every pass. *Risk*: § 6 residual 5. **Strike**: site 2 alone binds the read, and she reads RELEASE-FLOW at release. *Risk*: a duty in a file she reads only at release is the shape she warned against ("a duty that lives only in a register row I never load is a duty I will not perform", census ballot R1). *Lean*: include, weakly; her read decides most of it.
- **F-34 · The heading's date.** *Problem*: a `TBD` heading shipped, because the plan dated it after S. **(i)** The UTC date the release PR is opened, rewritten by a new S; a day off the tag is not a falsity (Stacy L906). *Risk*: a heading a day off the tag. **(ii)** No date in the heading. *Risk*: breaks the dated headings of 15.0.0 to 16.1.0; nothing can be wrong. *Lean*: (i).
- **F-38 · The straggler line's scope.** **Narrow** (site 9): scripts named in RELEASE-FLOW or a register row's `checks`, and `check_state` flips. *Risk*: a script restated only in a charter is outside it. **Broad**: every PR that changes a script's behaviour. *Risk*: a line on most script PRs, read by no instrument. *Lean*: narrow (the queue's lean).
- **F-40 · A CORRECTION's sweep.** **(a)** Run the whole-file sweep and state every hit; a hit may be left, with its reason, and a hit left false is filed. *Opportunity*: keeps a ruled list's diff reviewable. *Risk*: left hits accumulate as records. **(b)** Fix every hit of the class. *Risk*: widens a narrow, ruled CORRECTION. *Lean*: (a). *Reads*: Lina's #504 practice (a whole-file sweep, RL-29); her read is not asked here, because served-doc corrections are hers and she may want one (orchestrator's call).
- **F-41 · The stale cited disclosure.** **(i)** Phase 1 re-reads each cited record at the final S (site 6, E4). **(ii)** Packed text cites no record (site 7's second sentence). *Risk of (ii)*: the 16.1.0 sentence was stale because the work moved; dropping the citation removes the pointer a reader uses to notice it, and leaves the sentence as stale. *Lean*: (i).
- **F-43a · Where RS-43 lives.** **Ride** this ballot as its README surface, or a **separate** small ballot because this one's subject is the release flow. *Lean*: ride (one diff for Peter).
- **F-43b · Before, or travel in.** **Either**, provided the record resolves at the merge commit (site 8 first After), or **land first** (second After). *Risk of either*: the observation and the fix share a diff, the circularity the CORRECTION test excludes for a referent; I read the record as the observation, not the referent, and a reader could disagree. *Risk of land first*: long-lived upkeep branches defeat it every time (four instances: #500, #502, #504, #505). *Lean*: either.
- **F-49 · What 5.4 may publish.** **(i)** The text binds 5.4 to this release's 5.3 tarball, by path and recorded sha1, and names the tarballs that are not it (site 4 (i), E3 (i)). *Risk*: a sentence to remember at 2FA time, and the dry run keeps printing a runnable `npm publish` line for its own tarball. **(ii)** As (i), and the printed line runs its own checks; the dry run prints no runnable publish line (site 4 (ii), E3 (ii), E7). *Opportunity*: the guard is in the command (RS-7). *Risk*: a script change for a harm that immutability made nil; a typed command still bypasses it; the "not yet on npmjs" check must fail closed on a network error. *Lean*: (ii). *Reads*: Ada pending (A-1).

**Open for Peter**: ratify? (every row is severable; name any to strike)
**Open for Peter**: F-0 — the batch now (a), or into Spec 131 (b)?
**Open for Peter**: F-33a — the pre-S read names only (i), or may propose with a second reader (ii)?
**Open for Peter**: F-33b — Stacy's charter site: include or strike?
**Open for Peter**: F-34 — the heading's date: the PR-open date (i), or none (ii)?
**Open for Peter**: F-38 — the straggler line: narrow or broad?
**Open for Peter**: F-40 — a CORRECTION's sweep: state every hit, may leave with reason (a), or fix every hit (b)?
**Open for Peter**: F-41 — the stale disclosure: phase-1 re-read (i), or no record citations in packed text (ii)?
**Open for Peter**: F-43a — RS-43 rides this ballot, or a separate one?
**Open for Peter**: F-43b — the observation record: either, provided it resolves at merge, or land first?
**Open for Peter**: F-49 — 5.4: text only (i), or the printed line carries its checks (ii)?

## 8. Consult questions

**Stacy** (required reviewer):
- **S-1 (RS-33, sites 2 and 11)**: your reads on F-33a and F-33b. Does L463's "It binds the LENS seat specifically." need a touch once the new paragraph says "too"? Does the unit stay `retained` for consumers with the new paragraph, or re-point it (your overlay text)?
- **S-2 (RS-46b, site 1)**: your `| LC_ALL=C sort` amendment, folded with `pipefail` in a subshell because a plain pipe prints sort's exit code (measured: `exit 0` on no hit). Does the form carry your amendment?
- **S-3 (RS-43, site 8)**: your reads on F-43a and F-43b. Is "resolves at the CORRECTION's merge commit" decidable for your governance-edit-kind read as written (in the PR's diff, or `git merge-base --is-ancestor <record's adding commit> <merge>`)?
- **S-4 (RS-41, sites 2 and 6)**: your RELEASE row (`canonical/agents/stacy.md` L400) restates what phase 1 reads and, after site 6, would omit the cited-record re-read (it already omits #492's S re-read). Restate or point, in your own edit?
- **S-5 (census reader)**: the hermetic-publish-path not-in-scope line under F-49 (ii), and the signing-act-consistency line with no heuristic run.
- **S-6 (RS-37, site 2)**: is "the directory where the release's claims-pass record is written" decidable enough for your count line's `<path> @ <sha>`?

**Ada** (required consult, RS-49):
- **A-1 (RS-49, site 4, E7)**: your read on F-49. Under (ii): the printed 5.4 line's shape (the sha1 check, and a "not yet on npmjs" check that refuses on a network error rather than passing), and dropping the dry run's runnable `npm publish` line (L384–L385). Should the dry run drop it under (i) too?
- **A-2 (RS-39 with RS-25, site 3)**: does `release-publish.ts --dry-run <the release branch's pushed head>` fetch a non-`main` SHA from origin (`git fetch -q --depth 1 <source> <sha>`), and is its tarball the right pre-S comparand for the packed file set and the generated files?
- **A-3 (RS-48, E1)**: your wording of the rail's message and header, and whether `bite-2-version-mismatch-exit10.txt` stays as a dated measurement or is re-recorded.
- **A-4 (E3)**: the `hermetic-publish-path` HONEST REACH wording (your row).

## 9. Not in this ballot (named so they are not read as covered)

- **RS-35** (no instrument reads a PR body for an open question at merge time): declined with reason, provisional, in the queue record; Peter's fork on an instrument stands there.
- **RS-36 with RS-10** (the signing-act walk's link 6, H3, double-candidate and link 7): the signing-act-chain amendment ballot.
- **RS-44 with RS-47** (the examples guard's behaviour check; a home for release-scoped rules): the guard-amendment ballot.
- **RS-42** (index platform names): Ada's record. **RS-45** and **RS-46a**: Stacy's method. **O-23**: the overview count-pointer CORRECTION (#526's grant, branch `fix/overview-section-counts`).

## 10. Standards notes (no edit in this ballot)

1. **A proposed command change was right on reading and wrong on running.** The `| LC_ALL=C sort` amendment reads correctly and zeroes the walk's exit code. A ballot that edits a command runs its after-text and states the run (§ 2, site 1). `adopted` for drafting.
2. **RS-48's sentence lived in three places**: RELEASE-FLOW, the rail script and the register row. The batch found them by `git grep`, which is RS-38's class inside its own ballot (§ 2, E1, E2). `adopted`: site 9 is the rule.
3. **The queue's RS-49 fork (ii) described what the script already does.** A fork that names a script change reads the script first (§ 2). The error is mine, in the queue record; its RS-49 row gets a dated correction line at E8. `adopted` for drafting.
4. **RS-39's surviving counter was weakened by a code read** (a dry run off `main` is allowed). `none` beyond § 2.

## 11. Review round record

*(none yet)*

## 12. Application ledger

- **2026-10-26 (Thurgood)**: DRAFT on branch `chore/ballot-release-flow-batch`, cut from `99eabf854`. Site blocks cut from the files at that SHA by script; site 1's after-text run in this worktree with `bash --noprofile --norc` (3.2.57) and `zsh -f`. Nothing applied.

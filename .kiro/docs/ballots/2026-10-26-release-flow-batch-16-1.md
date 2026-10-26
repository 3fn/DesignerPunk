# Ballot Measure: the RELEASE-FLOW batch from release 16.1.0's claims pass (eleven rows of the standards queue)

**Date**: 2026-10-26 (R1 drafted from 19:31:42Z; R2 from 20:00:02Z; the drafter's `date -u`)
**Drafted by**: Thurgood (Civitas steward; author of `.kiro/hooks/RELEASE-FLOW.md`'s text through its review rounds, owner of `.kiro/issues/README.md` and the standards side of the composed loop). The queue is `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` (#521, `d5cb99023`), which names this ballot as the vehicle for its RELEASE-FLOW rows. Drafted under Peter's standing go for the queue's parallel items, relayed by the orchestrator, which covers drafting the ballots the queue names. That go covers drafting only; nothing here is ratified by it.
**Status**: **DRAFT (R2)**, not ratified. No edit site below is applied. A merge with this line still reading DRAFT records the measure, ratifies nothing and answers no fork in § 7.
**Base**: every Before text is byte for byte at `61581c641` (`origin/main` after #527). R1 was cut at `99eabf854`; #527 changed none of the cited lines (each R1 region compared at both SHAs: equal), and R2 re-cut every block at `61581c641` by script (`batchbuild/sites2.py`, not retyped). The branch carries a merge of `61581c641` (`91abcc92f`).
**Required reviewer**: **Stacy**. Every row comes from her RELEASE pass for 16.1.0; she is the census reader (ballots README § "Conventions"); sites 11 and 12 are her charter.
**Required consult**: **Ada**, on RS-49 and the RS-48 straggler (`scripts/release-publish.ts` and `scripts/verify-publish-rail.sh` are hers, ballot `2026-10-17-standing-write-scope-six-roots` § 2.6).
**Reviewers**: **Lina**, on site 10 (RS-40; served-doc CORRECTIONs are hers).
**Consulted**: Stacy — R1 (§ 11): S-2 confirmed and reproduced; F-33a (i), F-33b include only with wording free of release-flow vocabulary; site 2 (i)'s owner wrong for served docs; S-5 disputes R1's not-in-scope hermetic-publish-path line under F-49 (ii) → Peter; L400 should point, ride as a site; Ada — R1 (§ 11): Before blocks byte-exact; dry-run fetch of a non-main SHA measured; 5.1 and 5.3 tarballs share a version with different bytes at 15.1.0, 16.0.0, 16.1.0; F-49 (ii) as a script mode (ii-b); E1, E3, E7 texts; Lina — R1 (§ 11): site 10's (a) gave the author a waiver M7 withholds; narrowed (a) or (b) with an exception, pick Peter's
**Class**: LAW. Each row changes what the release author, the pre-S reader, a CORRECTION's author or an instrument PR's author must do (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds": "If a reader must now do something that nothing already required before the PR, the edit is LAW").
**Amends**:
- `.kiro/hooks/RELEASE-FLOW.md`: sites 1–6 (RS-46b, RS-33, RS-37, RS-34, RS-39 with RS-25, RS-49, RS-48, RS-41). **LAW**.
- `governance/release-management-system.md` recipe step 4: site 7 (RS-34's second surface; RS-41 under F-41 (ii) or (iii)). **LAW**.
- `.kiro/issues/README.md` rule 10: site 8 (RS-43). **LAW**.
- `.kiro/docs/ballots/README.md`: site 9 (RS-38 with RS-29) and site 10 (RS-40). **LAW**.
- `canonical/agents/stacy.md`: site 11 (RS-33's charter site, severable, F-33b) and site 12 (her RELEASE row points to RELEASE-FLOW, Stacy's S-4). **LAW**.
- Execution sites E1–E8 (§ 4): Ada's rail header, message and bite; three register rows; the operative-set items, consumer disposition, regeneration and Stacy's C1 acts for sites 11 and 12; Ada's dry-run change (all options) and her 5.4 change (F-49 (ii)); the records. **EXECUTION** of the sites they follow.

**Census** (ballots README § "Conventions", "Instrument census"; one line per presumptively in-scope instrument; redrafted at R2 on Stacy's S-5 and Ada's item 17):
- `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh) — site 5 rewords step 6's reading of an absent time["<version>"]; E1 changes the script's exit-10 header comment and its FAIL[version] message only (messages are out of the census's scope); no exit code, assertion or verdict changes; the recorded bite scripts/__bites__/bite-2-version-mismatch-exit10.txt is re-recorded with the new message in E1's commit`
- **hermetic-publish-path (scripts/release-publish.ts), one line per F-49 option.** R1's single not-in-scope line is withdrawn: Stacy disputed it under (ii) (S-5), and by the census rule a disputed line goes to Peter. The lines that replace it:
  - F-49 (i): `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts) — sites 3, 4 and 7 are text in the row's education homes; E7a removes two runnable lines from the dry run's output (output only); no refusal, tag check, closure compare, floor or pack-assert finding changes`
  - F-49 (ii-a): `**Census**: exempt — (3) the added refusals run in the operator's shell, in a printed line that no registered check's command composes; ran: none; count: no count` *(Stacy's nearest true form, S-5)*
  - F-49 (ii-b): **in scope**: the `--npmjs` mode adds four refusals to the script the row's check runs (Ada item 17). The in-scope form runs the row's census mode, and **the row has no `census` field**. Under ballot `2026-10-19-instrument-census-at-draft` F-3 (A), the owner builds the census mode, or writes `census: none — <why>` (which makes the line exempt on ground (2)), before the item leaves DRAFT. So **under (ii-b) this ballot cannot be ratified until Ada has done one of the two** and the line is written here.
- `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts; canonical/ and governance/ are input-closure roots) — sites 7, 11 and 12, E2–E6 are ordinary closure inputs; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`
- `**Census**: not in scope — signing-act-consistency (verify-signing-chain --ci; census mode --census-routed) — no instrument code changes, so the census mode's committed and scratch-diff runs are identical by construction; sites 11 and 12 change the bytes of two units (stacy #the-mirror-anti-rot-clause-verbatim-at-countersigned-strength, #the-trigger-set-the-114-superset-table-names-never-numbers), which the instrument reads as stale until Stacy's C1 acts (E5); under F-33b include, the mirror unit's consumer disposition moves from retained to re-pointed (one removal, E5), which is the instrument's input, not its rule` *(Stacy's two conditions, S-5: E5 lands before the application PR's final push, or the 122-diff-guard job's `verify-signing-chain --ci` step fails the PR; and the wording above, re-stated for the re-point)*
- `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts, citing corpus governance/, .kiro/steering/, canonical/) — sites 7, 11 and 12 and E2–E5 add no get_section / get_document_* citation`
- `**Census**: not in scope — audience-banner guard (scripts/audience-banner/predicate.ts, SCAN_SCOPE governance/*.md) — governance/release-management-system.md and governance/classification-map.md already carry their banners; the edit adds no governed doc and removes no banner` *(no register row names this guard, so the line is not owed; `npm run test:scripts` runs it)*
- No line is owed for the rows whose `checks` are `[]`: `release-falsity-floor`, `issues-obligation-lapse`, `instrument-rows-disposed-not-fixed`, `instrument-census-at-draft`. `record-first-ratification`'s check is procedural, not code. Stacy enumerated every row citing an edited file (S-5): none is missing. **Heuristic, not a census**: `scripts/issues-owned.sh` reads rule 1's Trigger grammar, and site 8 touches rule 10 only.
- **Finding, never a gate** (Stacy, S-5): neither publish row has a `census` field (`governance/classification-map.md` L878–L915) — `hermetic-publish-path` is Ada's, `publish-rail-guard` mine. Owed as a dated line on the queue record (§ 4 E8).

**Cap**: eleven queue rows plus Stacy's S-4 row, in twelve sites (six in RELEASE-FLOW, three of them rewrites of an existing line), with their execution sites. **Retroactivity**: none. The batch binds from its application merge; the release after 16.1.0 is the first walked under it. Nothing in 16.1.0's records is re-decided.
**Deadline**: the queue record's Trigger is `release:next:phase-1`. A row with neither a merged vehicle nor a dated disposition line at the next release's S lapses there, and the record is P2 `(guard)`, so its first lapse goes to Peter. RS-37 and RS-49 bite at the next walk and the next 5.4 if they are not applied before them.

> **Conflict of interest, stated first.** Four of these rows are defects in my own text or my own act: RS-33's false sentence shipped in the release PR I authored (#494) and took as written; RS-34's `TBD` heading, RS-39's "no shipped file was removed" and RS-41's stale "not checked yet" were in the CHANGELOG entry I wrote; RS-37's missing delegate brief was mine to write (signing-act ballot § 5.3). I chose every after-text. Stacy's review, Ada's and Lina's consults and Peter's ratification are the checks.

---

## 1. The gap: what 16.1.0's claims pass found that the flow does not prevent

Source for every row: `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-16.1.0.md` (phase 1 and addenda, #497 `55c218cfd`; phase 2, #510 `b1a07fb7b`; line numbers hold at both and at `61581c641`). The queue record carries each row's law, disposition and vehicle; this section says only what failed.

| Row | What happened at 16.1.0 (finding) | The gap in the flow |
|-----|-----------------------------------|---------------------|
| RS-33 | The pre-S consult proposed seven replacement sentences; the release took them verbatim; one was false ("The other Kiro agents were run on a preview", RL-19, L343) | Nothing governs a pre-S release read. The mirror clause binds criterion text only (L633) |
| RS-34 | The packed CHANGELOG heading shipped `TBD` (RL-21, L370) | Step 2 says "retitle to the version" and is silent on the date; the plan to date it "at the tag" cannot reach a packed file |
| RS-37 | The first delegate audit under § 5.3 did not run: `0 / 135` (RL-25, L428) | No walk item owes it before phase 1 (L637) |
| RS-38 + RS-29 | #473 changed `owed-set.sh`'s classification; four surfaces that describe it were not swept (RL-22, L377). RS-29 is the mirror (16.0.0's RL-15: script comments said `proposed` after the register flipped to `armed`) | No rule makes an instrument PR sweep the text that restates it |
| RS-39 + RS-25 | "No shipped file was removed" shipped while two were removed (RL-20, L363); 16.0.0's RS-25 is the same class for generated files' contents | Nothing asks the author to compare the packed output with the previous public artifact before writing the entry |
| RS-40 | A CORRECTION fixed its ruled lines and left the same class elsewhere in the file (RL-27, L963) | The CORRECTION form says nothing about the rest of the file, or about other files |
| RS-41 | A CHANGELOG disclosure citing a record went stale before the tag (RL-28, L976) | No step re-reads a cited record at S |
| RS-43 | Four CORRECTIONs cited an observation record still on an unmerged branch (RL-30, L1287; #500, #502, #504, #505) | Nothing says where the cited record must be at the merge |
| RS-46b | The 3a greps returned different orders run to run in one session's shell (the queue record reproduced six hashes in six runs) | The walk's paste is not byte-reproducible across shells |
| RS-48 | Twice an absent `time["<v>"]` meant "accepted, still processing", not "not published"; npm's `+` line printed for a publish the registry did not record (O-45, L2119; RL-36) | Step 6 L150 gives one reading of an absent `time["<v>"]` |
| RS-49 | 16.0.0's tarball was published again, out of flow, in 16.1.0's 5.4 window; immutability made it harmless (RL-36, L2036). **The harmful member of the class** (Ada R1 item 3): at 15.1.0, 16.0.0 and 16.1.0 the 5.1 tarball had 5.3's version and different bytes (the build-timestamp files), and the dry run prints a runnable `npm publish` line for it | 5.4's "never a tarball the script did not produce" is met by any script tarball, of any version, including 5.1's of the same version |
| S-4 (Stacy's R1) | Stacy's RELEASE row restates what phase 1 reads and already misses #492's S re-read; site 6 would widen the gap | A charter restating RELEASE-FLOW drifts from it, which is RS-38's class |

## 2. The rows: what each site does, and what the rounds changed

**RS-46b, site 1.** Stacy's read (#521's body) asked for `| LC_ALL=C sort`. In a pipe, `$?` is `sort`'s, so a plain pipe prints `exit 0` on an empty result and the walk loses its "empty, exit 1" fact (measured in bash 3.2.57; Stacy reproduced it, and `exit 2` survives for an unreadable file, S-2). The after-text runs each grep in a subshell with `pipefail`. Extracted from a scratch copy of RELEASE-FLOW with site 1 applied, run at `61581c641` with `V=16.2.0`, the block's output without its `main at:` line gave one sha256 three times (`475aaa40…38b935e`; twice in bash, once in `zsh -f`), and a no-hit pattern printed `exit 1`.

**RS-33, sites 2 and 11.** A rule for the pre-S read, and the same act named in Stacy's charter. F-33a is the text: (i) the read names what is false and why and proposes nothing; (ii) it may propose, and a proposed sentence needs a second reader. **R2**: the owner is no longer "the release author" for every text; for a served doc or a charter it is the content owner (Stacy S-1b). Under (i) the receiving owner is the named caller-out ("says so at that exchange"), in site 2 and site 11 (S-1d). Site 11 uses no release-flow vocabulary ("S", RELEASE-FLOW), because the unit ships to consumers, whose Stacy charter has neither (S-1e); and under (i) L463's "It binds the LENS seat specifically." gains "and her read of release text (below)", so "specifically" no longer reads as *only* (S-1c). The dated pointer the law-doc convention requires is itself DesignerPunk vocabulary, and no retained unit in the consumer rendering carries a ballot name (`grep -c "ballot 2026"` over it: 0), so under F-33b include the unit is re-pointed for consumers with one removal, the pointer (E5).

**RS-37, site 2.** One walk row for the delegate audit. **R2**: the paragraph no longer restates § 5.3's rotation, which had dropped its backlog clause (S-6); it points to § 5.3 for the seat and the population. The row names the path of Thurgood's brief and the output path that brief names, which exists at the walk, instead of "the directory where the release's claims-pass record is written", which does not exist yet and which no rule names after Spec 123 (S-6; filed as a separate item, § 4 E8).

**RS-34, sites 3 and 7.** Where the heading's date comes from. **R2**: R1 misread Stacy's L906 (her residual was S to the tag across UTC midnight, not the heading's date), and R1's "a new S writes it again" was undecidable when S moves by a non-release PR (16.1.0's final S was #505, a CDG fix). Under F-34 (i) the date is the UTC date of the release PR's last commit before it merges; it dates the release's preparation, not its tag, and no later PR rewrites it. No bound replaces "a day off": under (i) the date can trail the tag by the whole hold, which is (ii)'s reason to exist.

**RS-39 with RS-25, site 3.** The packed-output compare before the entry is written. **R2**: Ada measured the dry run's fetch of a SHA not on `main` (exit 0, 7 s, git 2.50.1, A-2). The compare names the build-timestamp files as stamp-only noise (Ada 9 (b)), shows the previous tarball's sha1 equal to that release's step-6 record (9 (d)), and runs `comm` under `LC_ALL=C` (Stacy: GNU `comm` under a non-C locale is unmeasured). R1's "phase 1 compares S's tarball" stated a duty nothing assigns (Ada 9 (c)); F-39 is whether to strike it or replace it with a tree-equality check at S.

**RS-49, site 4.** **The harmful member is 5.1's tarball, not another release's** (Ada item 3): it has 5.3's version and different bytes at every measured release, the dry run prints a runnable publish line for it, and a "not yet on npmjs" check does nothing against it, because the version is absent from npmjs at 5.4 either way. Only binding 5.4 to 5.3's record refuses it. So: **under every option** the text binds 5.4 to the tarball whose record has `mode` `publish` (only 5.3 writes one), and the dry run stops printing runnable publish lines (E7a, Ada's firm lean). F-49 is then: (i) that and nothing more; (ii-a) a printed checking line (R1's (ii)); (ii-b) a 5.4 script mode, `release-publish.ts --npmjs <record>`, with four refusals that fail closed (Ada's shape). Under (ii-a) the embedded sha1 is the printing run's own, so the check adds nothing the record binding does not, and its network-error logic is tested only as a string (Ada 6). RL-36's command is byte-equal to a line the script prints, in the `--registry=` form RELEASE-FLOW does not use; no cause is inferred (Ada item 4, RL-36). Site 4 now spans L134–L136, because L134 describes what 5.3 prints. The "typed by hand" premise began in Stacy's own pass (L2154) and was copied into the queue; she owes the erratum on her record.

**RS-48, site 5.** Unchanged. Its straggler copies are E1 (Ada's header and message, now her text) and E2 (the register row, now including its trailing pointer, Ada item 13).

**RS-41, site 6.** **R2**: "at the final S" is unknowable when phase 1 runs (Stacy); the read is at each S. Ada's packaging fact: `.kiro/issues/` is not in `package.json` `files`, so a record path in a packed CHANGELOG sentence does not resolve in a consumer's install. That gives F-41 (ii) a reader R1 said it lacked, and (i) and (ii) are not exclusive: F-41 now has (iii), both.

**RS-43, site 8.** **R2**: both options are one decidable predicate (Stacy S-3): "either" is `git cat-file -e <m>:<the path as cited>`, "land first" is the same at `<m>^`. "Either" is the test Stacy's governance-edit-kind read already runs; "land first" would leave a straggler in her charter.

**RS-38 with RS-29, site 9.** **R2**: a hit is a line and a restatement is a paragraph; the site's own command on RL-22's script hits only the `cmd` lines, each true, and passes the instance (Stacy). The sweep now reads the whole section that holds each hit.

**RS-40, site 10.** **R2**: Lina showed that R1's (a) let the author leave a false served-doc hit "to keep a diff reviewable", a waiver M7 gives to Peter alone, and that R1's (b) breaks where a hit's fix needs a ruling (the icon example waited on Ada). Stacy showed R1's trigger ("an observation that names a class") would not have fired on RL-27, whose observation named lines. R2: **every CORRECTION carries the line**; the read is "a command, or a named read" (a behavioural class has no grep); the reach is every file the class can occur in; filing a left hit defers it and waives nothing. F-40 is now (a′), Lina's narrowed form, or (b′), fix in every file of the reach.

**Stacy's S-4, site 12.** Her RELEASE row points to RELEASE-FLOW's Phase 1 bullet for what phase 1 reads and keeps only her record's own line forms. The consumer rendering removes that range already (its removal's start and end strings are kept), so consumers see no change. The unit carries her signature, so the edit owes her C1 re-sign (E5).

## 3. Edit sites (after ratification; byte for byte at `61581c641`)

Each block is the whole line or lines, cut from the file by script. Where a site has a fork, one After block is given per option (or per combination of the forks that touch it); the Status commit carries the picked After as the resolved text. `<application date>` is the application commit's date. Every law-doc site carries its dated pointer in its After (ballot `2026-10-25-rule-11-post-walk-filings-and-spec-answers` § 7 item 4).

### Site 1 — RS-46b — the 3a greps, sorted

`.kiro/hooks/RELEASE-FLOW.md` L32–L34 at `61581c641`.

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
   Both greps print their hits sorted (`LC_ALL=C sort`), so the walk record's paste is the same in every shell, and `pipefail` keeps the printed exit code grep's: `1` still means no hit. *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-46; prior text at `61581c641`)*

````

### Site 2 — RS-33 and RS-37 — the pre-S read and the delegate audit, two paragraphs after the deferrals paragraph

`.kiro/hooks/RELEASE-FLOW.md` L39 at `61581c641`.

Before:

````text
   The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*
````

After, F-33a (i):

````text
   The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*

   **A pre-S read of release text** (any seat's read, before S, of the release notes, the `CHANGELOG.md` entry or other packed text) names each sentence it finds false and why, with the evidence. It proposes no replacement sentence. The replacement is written by the text's owner (the release author for the notes and the `CHANGELOG.md` entry, the content owner for a served doc or a charter), who reads it against that evidence before the release PR merges. An owner who is handed replacement text by the reader says so at that exchange, and writes its own. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*

   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat, the path of Thurgood's brief, and the output path that brief names. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*
````

After, F-33a (ii):

````text
   The walk record reprints the priorities record's "Peter-gated deferrals" list (answered rows only, no P0 record) as one block headed `Peter-gated deferrals: answers on record, reprinted; nothing here holds the merge`, never as `**Open for Peter**:` lines. A row Peter takes up is re-ruled by its owner. *(Ballot 2026-10-20-manual-records-routed-readers, E3, F-2 (i).)*

   **A pre-S read of release text** (any seat's read, before S, of the release notes, the `CHANGELOG.md` entry or other packed text) names each sentence it finds false and why, with the evidence, and may propose a replacement. A proposed sentence ships only after a seat other than its proposer has read it against that evidence: the text's owner (the release author for the notes and the `CHANGELOG.md` entry, the content owner for a served doc or a charter) or a seat the owner names. The release PR body carries one line for it, `**Second reader**: <seat> — <the sentences read>`. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*

   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat, the path of Thurgood's brief, and the output path that brief names. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*
````

### Site 3 — RS-34 (the heading's date) and RS-39 with RS-25 (the packed-output compare), step 2

`.kiro/hooks/RELEASE-FLOW.md` L108 at `61581c641`.

Before:

````text
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version; recipe step 4 in `governance/release-management-system.md`),
````

After, F-34 (i), F-39 (a):

````text
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version and a date, `## [<version>] — <YYYY-MM-DD> — <title>`; the date is the UTC date of the release PR's last commit before it merges, `date -u +%F` when that commit is made; it dates the release's preparation, not its tag, and no later PR rewrites it, whichever PR moves S; recipe step 4 in `governance/release-management-system.md`; *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `61581c641`)*),
   - **before the entry says that a file, an export or a generated output was added, kept, removed or changed, compare the packed output with the previous public artifact**, and paste the results, naming the commit they ran at, in the release PR body. This release's tarball: after `git fetch origin`, `npx tsx scripts/release-publish.ts --dry-run <the release branch's pushed head>`, run from the main checkout (a dry run of a commit not on `origin/main` is allowed, with a warning). The previous release's tarball: `npm pack @3fn/core@<previous version> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --pack-destination <tmp>`, its sha1 shown equal to the previous release's step-6 record. The file set: `LC_ALL=C comm -3 <(tar -tzf <previous>.tgz | LC_ALL=C sort) <(tar -tzf <this>.tgz | LC_ALL=C sort)` (column 1 removed, column 2 added). The generated files the entry describes: a `diff` of each between the two extracted tarballs; the build-timestamp files (`TokenTypes.*`, `tool-manifest.json` and the others the release records name) differ in their stamps alone. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-39 and RS-25)*
````

After, F-34 (i), F-39 (b):

````text
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version and a date, `## [<version>] — <YYYY-MM-DD> — <title>`; the date is the UTC date of the release PR's last commit before it merges, `date -u +%F` when that commit is made; it dates the release's preparation, not its tag, and no later PR rewrites it, whichever PR moves S; recipe step 4 in `governance/release-management-system.md`; *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `61581c641`)*),
   - **before the entry says that a file, an export or a generated output was added, kept, removed or changed, compare the packed output with the previous public artifact**, and paste the results, naming the commit they ran at, in the release PR body. This release's tarball: after `git fetch origin`, `npx tsx scripts/release-publish.ts --dry-run <the release branch's pushed head>`, run from the main checkout (a dry run of a commit not on `origin/main` is allowed, with a warning). The previous release's tarball: `npm pack @3fn/core@<previous version> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --pack-destination <tmp>`, its sha1 shown equal to the previous release's step-6 record. The file set: `LC_ALL=C comm -3 <(tar -tzf <previous>.tgz | LC_ALL=C sort) <(tar -tzf <this>.tgz | LC_ALL=C sort)` (column 1 removed, column 2 added). The generated files the entry describes: a `diff` of each between the two extracted tarballs; the build-timestamp files (`TokenTypes.*`, `tool-manifest.json` and the others the release records name) differ in their stamps alone. The compare holds for S only while `git diff --quiet <the pushed head> <S>` exits 0; if it exits non-zero at S, the author repeats the file-set compare on 5.1's tarball before the tag and pastes it in the phase-1 record's PR. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-39 and RS-25)*
````

After, F-34 (ii), F-39 (a):

````text
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version, with no date in the heading: the packed file is S's, so no step after S can date it, and the release's date is its tag's; recipe step 4 in `governance/release-management-system.md`; *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `61581c641`)*),
   - **before the entry says that a file, an export or a generated output was added, kept, removed or changed, compare the packed output with the previous public artifact**, and paste the results, naming the commit they ran at, in the release PR body. This release's tarball: after `git fetch origin`, `npx tsx scripts/release-publish.ts --dry-run <the release branch's pushed head>`, run from the main checkout (a dry run of a commit not on `origin/main` is allowed, with a warning). The previous release's tarball: `npm pack @3fn/core@<previous version> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --pack-destination <tmp>`, its sha1 shown equal to the previous release's step-6 record. The file set: `LC_ALL=C comm -3 <(tar -tzf <previous>.tgz | LC_ALL=C sort) <(tar -tzf <this>.tgz | LC_ALL=C sort)` (column 1 removed, column 2 added). The generated files the entry describes: a `diff` of each between the two extracted tarballs; the build-timestamp files (`TokenTypes.*`, `tool-manifest.json` and the others the release records name) differ in their stamps alone. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-39 and RS-25)*
````

After, F-34 (ii), F-39 (b):

````text
   - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version, with no date in the heading: the packed file is S's, so no step after S can date it, and the release's date is its tag's; recipe step 4 in `governance/release-management-system.md`; *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `61581c641`)*),
   - **before the entry says that a file, an export or a generated output was added, kept, removed or changed, compare the packed output with the previous public artifact**, and paste the results, naming the commit they ran at, in the release PR body. This release's tarball: after `git fetch origin`, `npx tsx scripts/release-publish.ts --dry-run <the release branch's pushed head>`, run from the main checkout (a dry run of a commit not on `origin/main` is allowed, with a warning). The previous release's tarball: `npm pack @3fn/core@<previous version> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --pack-destination <tmp>`, its sha1 shown equal to the previous release's step-6 record. The file set: `LC_ALL=C comm -3 <(tar -tzf <previous>.tgz | LC_ALL=C sort) <(tar -tzf <this>.tgz | LC_ALL=C sort)` (column 1 removed, column 2 added). The generated files the entry describes: a `diff` of each between the two extracted tarballs; the build-timestamp files (`TokenTypes.*`, `tool-manifest.json` and the others the release records name) differ in their stamps alone. The compare holds for S only while `git diff --quiet <the pushed head> <S>` exits 0; if it exits non-zero at S, the author repeats the file-set compare on 5.1's tarball before the tag and pastes it in the phase-1 record's PR. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-39 and RS-25)*
````

### Site 4 — RS-49 — what 5.4 may publish (5.3's print line and 5.4)

`.kiro/hooks/RELEASE-FLOW.md` L134–L136 at `61581c641`.

Before:

````text
     - It then records the tarball's path, file count and sha1 in `release-publish-record.json` (in an OS temp dir; the script prints its path), publishes **that tarball** to GitHub Packages, and prints the public-npm command for 5.4 with the sha1 to check.
     - **Keep the tarball and its record until 6b is recorded** (A11). The record's full contents (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt) are pasted into the step-6 `.txt` (A3), because the temp dir is never committed and 6b's comparand must be.
   - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): first check the printed sha1 against the file, then run `npm publish <tarball> --registry https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`. **Never a folder publish, never `--ignore-scripts`, never a tarball the script did not produce.** A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
````

After, F-49 (i):

````text
     - It then records the tarball's path, file count and sha1 in `release-publish-record.json` (in an OS temp dir; the script prints its path), publishes **that tarball** to GitHub Packages, and prints the public-npm command for 5.4 with the sha1 to check.
     - **Keep the tarball and its record until 6b is recorded** (A11). The record's full contents (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt) are pasted into the step-6 `.txt` (A3), because the temp dir is never committed and 6b's comparand must be.
   - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): first check the printed sha1 against the file, then run `npm publish <tarball> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`, as 5.3 printed it. **Never a folder publish, never `--ignore-scripts`, never a tarball other than the one this release's 5.3 run printed**: its path is 5.3's `tarball:` line, and its sha1 equals that run's `release-publish-record.json`, whose `mode` is `publish` (only 5.3 writes one, after GitHub Packages accepted that tarball). A tarball the script made at 5.1, at a pre-S dry run (step 2) or for another release is not it, though the script produced it: at 15.1.0, 16.0.0 and 16.1.0 the 5.1 tarball had 5.3's version and different bytes. *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-49; prior text at `61581c641`)* A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
````

After, F-49 (ii-a):

````text
     - It then records the tarball's path, file count and sha1 in `release-publish-record.json` (in an OS temp dir; the script prints its path), publishes **that tarball** to GitHub Packages, and prints the 5.4 line, which carries its own two checks (5.4). *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-49; prior text at `61581c641`)*
     - **Keep the tarball and its record until 6b is recorded** (A11). The record's full contents (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt) are pasted into the step-6 `.txt` (A3), because the temp dir is never committed and 6b's comparand must be.
   - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): run the 5.4 line that 5.3 printed, copied and never typed: it checks the file's sha1 against the record and that `<version>` is not yet on npmjs, and runs `npm publish <tarball> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public` only if both hold. **Never a folder publish, never `--ignore-scripts`, never a tarball other than the one this release's 5.3 run printed**: its path is 5.3's `tarball:` line, and its sha1 equals that run's `release-publish-record.json`, whose `mode` is `publish` (only 5.3 writes one, after GitHub Packages accepted that tarball). A tarball the script made at 5.1, at a pre-S dry run (step 2) or for another release is not it, though the script produced it: at 15.1.0, 16.0.0 and 16.1.0 the 5.1 tarball had 5.3's version and different bytes. *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-49; prior text at `61581c641`)* A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
````

After, F-49 (ii-b):

````text
     - It then records the tarball's path, file count and sha1 in `release-publish-record.json` (in an OS temp dir; the script prints its path), publishes **that tarball** to GitHub Packages, and prints the 5.4 command, `npx tsx scripts/release-publish.ts --npmjs <the record path>` (5.4). *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-49; prior text at `61581c641`)*
     - **Keep the tarball and its record until 6b is recorded** (A11). The record's full contents (commit, sha1, fileCount, bytes, pack-assert passed/total, createdAt) are pasted into the step-6 `.txt` (A3), because the temp dir is never committed and 6b's comparand must be.
   - **5.4 Publish the same tarball to public npm** (Peter's terminal, web 2FA): run `npx tsx scripts/release-publish.ts --npmjs <the record path 5.3 printed>` from the main checkout: it refuses unless the record is 5.3's (`mode` `publish`), the file's sha1 equals the record's, the tag names the record's commit, and npmjs's packument reads without `<version>` (a network error refuses), and only then runs `npm publish <tarball> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`. **Never a folder publish, never `--ignore-scripts`, never a tarball other than the one this release's 5.3 run printed**: its path is 5.3's `tarball:` line, and its sha1 equals that run's `release-publish-record.json`, whose `mode` is `publish` (only 5.3 writes one, after GitHub Packages accepted that tarball). A tarball the script made at 5.1, at a pre-S dry run (step 2) or for another release is not it, though the script produced it: at 15.1.0, 16.0.0 and 16.1.0 the 5.1 tarball had 5.3's version and different bytes. *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-49; prior text at `61581c641`)* A folder publish is refused by `prepublishOnly`, which names this script. That refusal is the tripwire, not the guard: the guard is the script.
````

### Site 5 — RS-48 — reading an absent `time["<version>"]`, step 6

`.kiro/hooks/RELEASE-FLOW.md` L150 at `61581c641`.

Before:

````text
   - If the packument (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no `time["<version>"]`, the version is not published yet. A 404 is then the correct answer, not indexing lag (15.0.0's R-4).
````

After:

````text
   - If the packument (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no `time["<version>"]`, the registry has not recorded the version. Either it was never accepted (15.0.0's R-4: six 404s preceded the publish), or npm accepted it and is still processing it: npm prints "Your package is being processed and may take a few minutes to become available", and the measured windows are 10 min 59 s (16.0.0) and at least 1 min 59 s (16.1.0). Either way the 404 is the correct answer, not indexing lag, and the release is not announced. Read the packument again until `time["<version>"]` appears, and re-run the rail only then; this step sets no bound on the wait, because no publish has yet been measured that npm accepted and never recorded. npm's `+ @3fn/core@<version>` line is not evidence that the registry recorded the version: it printed for an out-of-flow publish of 16.0.0's tarball that the registry did not record (16.1.0's RL-36). *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-48; prior text at `61581c641`)*
````

### Site 6 — RS-41 — the cited-record re-read at S, Phase 1 bullet

`.kiro/hooks/RELEASE-FLOW.md` L199 at `61581c641`.

Before:

````text
   - **Phase 1** runs on **S after 5.1 is green and before the tag (5.2)**. A red 5.1 moves S, so phase 1 never reads a commit that will not be tagged (A7). It covers the release delta, the walk record (item 3a: its paste, its `main at:` SHA and each row's disposition), the 5a owed-set paste, the 5b arming line and 5.1's tally. It also re-runs item 3a's two greps at S and reads each hit the walk record does not row under rule 11's row test: a P0 among them is a floor-class row for this release, owed a fix or Peter's quoted, dated waiver before the tag (put to him as an `**Open for Peter**:` line in the phase-1 record's PR, which that rule holds until he answers; the read reports, and the tag stays his act); any other is listed with its rule-11 state *(added 2026-10-26 by ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers, site 3)*. Its record lands by a record-only PR and states `publish-rail liveness: owed`.
````

After, F-41 (i) or (iii):

````text
   - **Phase 1** runs on **S after 5.1 is green and before the tag (5.2)**. A red 5.1 moves S, so phase 1 never reads a commit that will not be tagged (A7). It covers the release delta, the walk record (item 3a: its paste, its `main at:` SHA and each row's disposition), the 5a owed-set paste, the 5b arming line and 5.1's tally. It also re-runs item 3a's two greps at S and reads each hit the walk record does not row under rule 11's row test: a P0 among them is a floor-class row for this release, owed a fix or Peter's quoted, dated waiver before the tag (put to him as an `**Open for Peter**:` line in the phase-1 record's PR, which that rule holds until he answers; the read reports, and the tag stays his act); any other is listed with its rule-11 state *(added 2026-10-26 by ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers, site 3)*. At each S it also re-reads each `.kiro/issues/` record that a packed `CHANGELOG.md` sentence cites, and reads the sentence against it: a sentence its record has since made false is a finding against that S under 3a's blocking test *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-41)*. Its record lands by a record-only PR and states `publish-rail liveness: owed`.
````

After, F-41 (ii):

````text
(no change to this line)
````

### Site 7 — RS-34 second surface (and RS-41 under F-41 (ii) or (iii)) — the recipe's step 4

`governance/release-management-system.md` L40 at `61581c641`.

Before:

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version. A release with no consumer-facing change still gets an entry that says so. `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

After, F-34 (i), F-41 (i):

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version and the date of its last commit before it merges, which dates the release's preparation, not its tag (RELEASE-FLOW step 2). *(Amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `61581c641`.)* A release with no consumer-facing change still gets an entry that says so. `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

After, F-34 (i), F-41 (ii) or (iii):

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version and the date of its last commit before it merges, which dates the release's preparation, not its tag (RELEASE-FLOW step 2). *(Amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `61581c641`.)* A release with no consumer-facing change still gets an entry that says so. A packed sentence states its fact without citing a `.kiro/issues/` record: that directory is not in the package, so the path does not resolve for the entry's reader; the record path goes in the release notes. *(Added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-41.)* `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

After, F-34 (ii), F-41 (i):

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version, with no date in the heading (RELEASE-FLOW step 2). *(Amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `61581c641`.)* A release with no consumer-facing change still gets an entry that says so. `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

After, F-34 (ii), F-41 (ii) or (iii):

````text
4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version, with no date in the heading (RELEASE-FLOW step 2). *(Amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-34; prior text at `61581c641`.)* A release with no consumer-facing change still gets an entry that says so. A packed sentence states its fact without citing a `.kiro/issues/` record: that directory is not in the package, so the path does not resolve for the entry's reader; the record path goes in the release notes. *(Added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-41.)* `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.
````

### Site 8 — RS-43 — where a CORRECTION's observation record must be, rule 10

`.kiro/issues/README.md` L19 at `61581c641`.

Before:

````text
10. **Filing rule.** A ruling or a claims pass that creates an obligation files an issue record for it, or appends to the existing one, **in the same PR that records the ruling or the pass**. An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it. A record filed for another owner names its filer; rule 9 applies to every later edit. A grant list is never authored only inside the diff it bounds: it is in a merged record first, or Peter's direction naming its paths is on the record **outside** that diff — a dated line in a record merged earlier, or Peter's own comment on the PR.
````

After, F-43b either:

````text
10. **Filing rule.** A ruling or a claims pass that creates an obligation files an issue record for it, or appends to the existing one, **in the same PR that records the ruling or the pass**. An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it. A record filed for another owner names its filer; rule 9 applies to every later edit. A grant list is never authored only inside the diff it bounds: it is in a merged record first, or Peter's direction naming its paths is on the record **outside** that diff — a dated line in a record merged earlier, or Peter's own comment on the PR. An observation record that a CORRECTION cites (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds") may be merged before the CORRECTION or travel in its PR, provided it resolves at the CORRECTION's merge commit `<m>`: `git cat-file -e <m>:<the path as cited>` succeeds *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-43)*.
````

After, F-43b land first:

````text
10. **Filing rule.** A ruling or a claims pass that creates an obligation files an issue record for it, or appends to the existing one, **in the same PR that records the ruling or the pass**. An obligation stated only in a plan line, a carry list, a walk table, a rulings row or a PR body, citing no record, is a finding on the PR that wrote it. A record filed for another owner names its filer; rule 9 applies to every later edit. A grant list is never authored only inside the diff it bounds: it is in a merged record first, or Peter's direction naming its paths is on the record **outside** that diff — a dated line in a record merged earlier, or Peter's own comment on the PR. An observation record that a CORRECTION cites (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds") is merged before the CORRECTION: `git cat-file -e <m>^:<the path as cited>` succeeds, where `<m>` is the CORRECTION's merge commit *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-43)*.
````

### Site 9 — RS-38 with RS-29 — the straggler line on an instrument PR, ballots README § "Conventions"

`.kiro/docs/ballots/README.md` L37 at `61581c641`.

Before:

````text
- **Re-runs**: at application the census is re-run and compared input by input with the ratified delta. A difference in an input unchanged since the census SHA (`git diff --name-only <census-sha> <run-sha> -- <corpus>`) stops that item, which is reported, not adapted. Differences in inputs that changed since then are listed. An exempt item's application run is compared with its count, and a difference stops it in the same way. The PR that ships the instrument change runs the scratch diff and the shipped code at its own base. Their digests must be equal, with no carve-out, or the PR stops and reports.
````

After, F-38 narrow:

````text
- **Re-runs**: at application the census is re-run and compared input by input with the ratified delta. A difference in an input unchanged since the census SHA (`git diff --name-only <census-sha> <run-sha> -- <corpus>`) stops that item, which is reported, not adapted. Differences in inputs that changed since then are listed. An exempt item's application run is compared with its count, and a difference stops it in the same way. The PR that ships the instrument change runs the scratch diff and the shipped code at its own base. Their digests must be equal, with no carve-out, or the PR stops and reports.
- **Straggler sweep on an instrument PR** *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-38 and RS-29)*. A PR that changes what a script prints, refuses or decides, where the script is named by path in `.kiro/hooks/RELEASE-FLOW.md` or in the `checks` of a `governance/classification-map.md` row, carries one line in its body, `**Straggler sweep**: <command> — <n> hits`, where the command is `git grep -n -F <the script's file name> -- .kiro/hooks/RELEASE-FLOW.md governance canonical/agents canonical/profiles/consumer .kiro/steering`. The section that holds each hit (heading to next heading) is read whole, because a restatement is a paragraph and a hit is a line, and the line lists each section read as `<path> § "<heading>" — true`, `— fixed` or `— left: <reason>`. A PR that changes a row's `check_state` carries the same line for `git grep -n -F <the row's id> -- scripts .kiro/hooks tools`, read the same way. A message change counts here, unlike in the census. A section left false is filed under `.kiro/issues/README.md` rule 10. The census above reads what a law change does to an instrument; this sweep reads what an instrument change does to the law text.
````

### Site 10 — RS-40 — a CORRECTION's sweep, ballots README § "When a governance edit needs a ballot — three kinds"

`.kiro/docs/ballots/README.md` L56 at `61581c641`.

Before:

````text
**The rot mode, named**: a LAW change dressed as an EXECUTION or a CORRECTION to skip the ballot. Its detector is the claims-pass read (Stacy's charter, "The governance-edit-kind read").
````

After, F-40 (a′):

````text
**The rot mode, named**: a LAW change dressed as an EXECUTION or a CORRECTION to skip the ballot. Its detector is the claims-pass read (Stacy's charter, "The governance-edit-kind read").

**A CORRECTION's sweep** *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-40)*: every CORRECTION carries one line in its PR body, `**Sweep**: <the class it corrects> — <a command, or a named read, over the class's reach> — <n> hits; fixed: <path:line, …>; left: <path:line — reason — record, …>`. The reach is everywhere the class can occur, not only the files the PR corrects. Every hit whose fix is a CORRECTION is fixed in each file the PR corrects. A hit is left only when its fix is not a CORRECTION (it needs a ruling) or when it sits in a file the PR does not correct; a diff's size is never a reason. Every left hit is filed under `.kiro/issues/README.md` rule 10 with a trigger. Filing defers a hit and waives nothing: a left hit that is false where its reader meets it is a floor-class row at the next release's walk, which only Peter waives (RELEASE-FLOW 3a).
````

After, F-40 (b′):

````text
**The rot mode, named**: a LAW change dressed as an EXECUTION or a CORRECTION to skip the ballot. Its detector is the claims-pass read (Stacy's charter, "The governance-edit-kind read").

**A CORRECTION's sweep** *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-40)*: every CORRECTION carries one line in its PR body, `**Sweep**: <the class it corrects> — <a command, or a named read, over the class's reach> — <n> hits; fixed: <path:line, …>; left: <path:line — reason — record, …>`. The reach is everywhere the class can occur, not only the files the PR corrects. Every hit whose fix is a CORRECTION is fixed in the same PR, in the files it corrects and in any other file of the reach. A hit is left only when its fix is not a CORRECTION (it needs a ruling); a diff's size is never a reason. Every left hit is filed under `.kiro/issues/README.md` rule 10 with a trigger. Filing defers a hit and waives nothing: a left hit that is false where its reader meets it is a floor-class row at the next release's walk, which only Peter waives (RELEASE-FLOW 3a).
````

### Site 11 — RS-33 — Stacy's charter, § "The mirror anti-rot clause"

`canonical/agents/stacy.md` L463 at `61581c641`.

Before:

````text
Named prohibition, named caller-out, **called at the exchange** rather than in a later ledger. It binds the LENS seat specifically. The clause is symmetric with Thurgood's (he may check that an audit happened, never re-decide what it concluded); the two are enforced the same way.
````

After, F-33a (i), F-33b include:

````text
Named prohibition, named caller-out, **called at the exchange** rather than in a later ledger. It binds the LENS seat specifically, and her read of release text (below). The clause is symmetric with Thurgood's (he may check that an audit happened, never re-decide what it concluded); the two are enforced the same way.

**It binds her read of release text too**: when she reads release text before the release is published, she names each sentence she finds false and why, with the evidence, and never proposes its replacement. The text is its owner's, and an owner handed replacement text calls it out at that exchange. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*
````

After, F-33a (ii), F-33b include:

````text
Named prohibition, named caller-out, **called at the exchange** rather than in a later ledger. It binds the LENS seat specifically. The clause is symmetric with Thurgood's (he may check that an audit happened, never re-decide what it concluded); the two are enforced the same way.

**At her read of release text**, before the release is published, she names each sentence she finds false and why, with the evidence, and may propose a replacement; a sentence she proposed ships only after a seat other than her has read it against that evidence. *(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*
````

After, F-33b strike:

````text
(no change)
````

### Site 12 — Stacy's RELEASE row points to RELEASE-FLOW's Phase 1 bullet (her S-4)

`canonical/agents/stacy.md` L400 at `61581c641`.

Before:

````text
| **RELEASE** | **Two phases, one record**: phase 1 on the release squash S, before the tag; phase 2 at the merge of the step-6 release-record PR | **Claims pass over the release delta (`git log <last-tag>..main`) — parent criteria tables vs `tasks.md` vs shipped source**. **Non-negotiable.** Paired with the release-step condition: the checklist runs the owed-set query and pastes its output, and carries Q2 guard (i)'s arming line. Phase 1 also carries the `release-falsity-floor` read (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7): the walk record (`.kiro/issues/<date>-release-<V>-walk.md`, RELEASE-FLOW item 3a) exists, its greps re-run at its `main at:` SHA, and every row carries a disposition; per floor-class row, one line — the walk-record line (record path, `main at:` SHA); for a row carried or read as not false at its reader, the citation of Peter's dated answer (quoted words, dated before the walk PR's `mergedAt`), a row without one being a finding routed to Peter; and your re-check of the surface at S (`git show S:<path>`: fixed, disclosed where its reader meets it, or still false under the cited waiver), or `not re-verified — <why>` (this read's own negative, outside the criterion-row vocabulary). A read, never a gate. Phase 2 reads the committed step-6 record — the rail result and the two-registry record (each registry's time[<v>], file count and sha1, equal to the publish script's recorded sha1) — against the published bytes; until it does, the record reads publish-rail liveness: owed. Drafted against the open record PR, it ends with the merge-confirmation line. | Stacy |
````

After:

````text
| **RELEASE** | **Two phases, one record**: phase 1 on the release squash S, before the tag; phase 2 at the merge of the step-6 release-record PR | **Claims pass over the release delta (`git log <last-tag>..main`) — parent criteria tables vs `tasks.md` vs shipped source**. **Non-negotiable.** Paired with the release-step condition: the checklist runs the owed-set query and pastes its output, and carries Q2 guard (i)'s arming line. Phase 1 also carries the `release-falsity-floor` read (ballot 2026-10-18-obligation-drain-and-release-falsity-floor M7). What phase 1 reads, and at which SHA, is RELEASE-FLOW step 6's Phase 1 bullet, not restated here *(amended <application date> by ballot 2026-10-26-release-flow-batch-16-1, site 12; prior text at `61581c641`)*. Your record's lines: per floor-class row, one line — the walk-record line (record path, `main at:` SHA); for a row carried or read as not false at its reader, the citation of Peter's dated answer (quoted words, dated before the walk PR's `mergedAt`), a row without one being a finding routed to Peter; and your re-check of the surface at S (`git show S:<path>`: fixed, disclosed where its reader meets it, or still false under the cited waiver), or `not re-verified — <why>` (this read's own negative, outside the criterion-row vocabulary). A read, never a gate. Phase 2 reads the committed step-6 record — the rail result and the two-registry record (each registry's time[<v>], file count and sha1, equal to the publish script's recorded sha1) — against the published bytes; until it does, the record reads publish-rail liveness: owed. Drafted against the open record PR, it ends with the merge-confirmation line. | Stacy |
````


## 4. Execution sites (EXECUTION of the sites above; each owner's text)

**E1 — `scripts/verify-publish-rail.sh` header (L41–L49) and FAIL[version] message (L81), and the recorded bite. Ada** (her standing scope, six-roots § 2.6; no grant). EXECUTION of site 5. Her texts, ADA R1 items 10 and 11, verbatim:

Header, replacing L41–L49 (the exit-10 entry):

```text
#   10 — FAIL[version]: not visible on registry.npmjs.org — an HTTP error
#        (incl. 404), a network error reaching the registry, or a returned
#        `version` field that does not match ${VERSION}. On a 404, read the
#        registry's own record before re-running: if the packument
#        (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no
#        `time["<version>"]`, the registry has not recorded the version:
#        either it was never accepted (15.0.0's R-4: six 404s preceded the
#        publish) or npm accepted it and is still processing it (16.0.0,
#        16.1.0). Either way the 404 is the correct answer, not indexing lag.
#        Read the packument again until `time["<version>"]` appears; re-run
#        only then, by hand, and again within a few minutes of it if the 404
#        persists. npm's `+ @3fn/core@<version>` line is not evidence that
#        the registry recorded the version (16.1.0's RL-36).
```

Message, replacing L81:

```text
  echo "FAIL[version]: ${PKG}@${VERSION} is not visible on ${REGISTRY} (HTTP ${HTTP_CODE}) — do not announce this release. Before re-running, read the registry's own record (curl -s ${REGISTRY}/${PKG_PATH}). If it has no time[\"${VERSION}\"], the registry has not recorded the version (never accepted, or accepted and still processing): this ${HTTP_CODE} is the correct answer, not indexing lag, and npm's \"+ ${PKG}@${VERSION}\" line is not evidence. Read the packument again until time[\"${VERSION}\"] appears, then re-run by hand."
```

`scripts/__bites__/bite-2-version-mismatch-exit10.txt` is re-recorded in E1's commit with a fresh `VERSION=99.99.99 ./scripts/verify-publish-rail.sh`, under Ada's header line (ADA R1 item 12; the #286 precedent). Exit codes and checks are unchanged.

**E2 — `governance/classification-map.md` row `publish-rail-guard`, `checks` (L890). Thurgood** (row owner and register steward). EXECUTION of site 5.
- Before (substring of L890, one occurrence): `A 404 is read against the registry's own record, never assumed to be indexing lag: if the packument has no time['<version>'], the version is not published and the 404 is the correct answer (15.0.0's R-4: six 404s preceded the publish); only if time['<version>'] is present and the 404 persists within a few minutes of it is the run repeated, by hand and never by automatic retry. The script's FAIL[version] message and RELEASE-FLOW step 6 say the same (15dd7c635).`
- After: `A 404 is read against the registry's own record, never assumed to be indexing lag: if the packument has no time['<version>'], the registry has not recorded the version, either never accepted (15.0.0's R-4: six 404s preceded the publish) or accepted and still processing (16.0.0, 16.1.0), and the 404 is the correct answer; the packument is read again until time['<version>'] appears, and only if it is present and the 404 persists within a few minutes of it is the run repeated, by hand and never by automatic retry. npm's '+ <pkg>@<version>' line is not evidence that the registry recorded the version. The script's FAIL[version] message and RELEASE-FLOW step 6 say the same (15dd7c635; re-worded together by ballot 2026-10-26-release-flow-batch-16-1, site 5 and E1).`
- One history line: `{ date: <application date>, change: "checks[] HONEST REACH sentence re-worded to step 6's two readings of an absent time['<version>'] (ballot 2026-10-26-release-flow-batch-16-1, RS-48, site 5); the script's FAIL[version] message, header and bite-2 say the same (E1). EXECUTION; rule, owner, checks and check_state unchanged", by: thurgood }`.

**E3 — row `hermetic-publish-path`, `disposition` (L914), the HONEST REACH clause. Thurgood as steward, in Ada's words** (ADA R1 item 15; row owner `ada`). EXECUTION of site 4.
- Before (substring of L914): `HONEST REACH: a publish run with --ignore-scripts, or of a tarball the script did not produce, is NOT detected before publish; 6b's sha1 comparison detects it after publish, and published bytes cannot be replaced`
- After, F-49 (i): `HONEST REACH: a folder publish with --ignore-scripts, or a publish of any tarball other than this release's 5.3 tarball (the one whose release-publish-record.json has mode publish), is NOT detected before publish. That includes the tarballs the script itself makes at 5.1 and at a pre-S dry run: they carry the same version with different bytes at every measured release (the build-timestamp files), so one published at 5.4 is a second artifact under the version, which npmjs keeps. 6b's sha1 comparison detects it after publish, and published bytes cannot be replaced`
- After, F-49 (ii-a): the (i) text, plus `; a checking line printed by a dry run would check only that dry run's sha1, so the dry run prints none (E7a)`.
- After, F-49 (ii-b): `HONEST REACH: 5.4's mode (release-publish.ts --npmjs <record>) refuses before publish a record that is not 5.3's (mode publish), a file whose sha1 differs from it, a tag that does not name its commit, and any npmjs answer other than a readable packument without the version (a network error refuses). A raw npm publish typed by the operator, and a folder publish with --ignore-scripts, are NOT detected before publish; 6b's sha1 comparison detects them after, and published bytes cannot be replaced`
- Under (ii-b) only, `checks` item 1 gains `; the 5.4 mode's four refusals (record mode, sha1, tag-to-commit, npmjs absence read that refuses on a network error)` (ADA R1 item 16).
- One history line, the same form as E2's, naming RS-49, site 4 and E7.

**E4 — row `release-falsity-floor`, `disposition` (L1194 at `61581c641`). Thurgood. Only under F-41 (i) or (iii).** After `RELEASE-FLOW Phase 1, the S re-read (ballot 2026-10-25-rule-11-post-walk-filings-and-spec-answers, site 3)` insert `; RELEASE-FLOW Phase 1, the cited-record re-read (ballot 2026-10-26-release-flow-batch-16-1, RS-41)`, and one history line. `checks` stay `[]`.

**E5 — operative-set items, the consumer disposition and Stacy's C1 acts, for sites 11 and 12.** Thurgood authors the items (the profile author, as at #491); the `canonicalHash` of each unit is the confirmer's object.
- **Site 12** (always): in `canonical/operative-sets/stacy.yaml`, unit `#the-trigger-set-the-114-superset-table-names-never-numbers`, item `trigger-release` takes site 12's After row verbatim. **Stacy** re-confirms the unit and re-signs its consumer disposition (the unit carries her signature). Its consumer removals are unchanged: the range removal `Phase 1 also carries the \`release-falsity-floor\` read … A read, never a gate.` keeps both its start and its end strings, so the consumer rendering is expected not to change (E6 shows it).
- **Site 11, under F-33b include**: in unit `#the-mirror-anti-rot-clause-verbatim-at-countersigned-strength`, under F-33a (i) item `mirror-binds-lens` takes `It binds the LENS seat specifically, and her read of release text (below).`, and a new item follows it:

  ```yaml
      - id: mirror-binds-release-read
        kind: obligation
        label: "It binds her read of release text"
        text: "<site 11's new paragraph, from its first character through the full stop before its pointer, verbatim>"
  ```

  Under F-33a (ii), `mirror-binds-lens` is unchanged and the new item takes the (ii) paragraph the same way. The unit's consumer disposition moves from `retained` to `re-pointed` with one removal, the paragraph's dated pointer (`*(added <application date> by ballot 2026-10-26-release-flow-batch-16-1, RS-33)*`), because no retained unit in the consumer rendering carries a ballot name. The removal and its subtraction citation are **Stacy's text**, in `canonical/profiles/consumer/stacy.dispositions.yaml` under the grant, with her C1 signature; the overlay's pin for the unit moves to its new hash. **Stacy** re-confirms the unit and signs the new disposition.
- Order (Stacy S-5): every C1 act lands before the application PR's final push.

**E6 — regeneration. Thurgood.** `npm run build:generator`, then `npx tsx tools/agent-generator/generate.ts`. Expected outputs: `.claude/agents/stacy.md`, `.kiro/agents/stacy-prompt.md`, the `canonical/_consumer-output/**/stacy*` renderings and their `.attribution.json` files. The exact list is enumerated by a dry run on the application branch before the authoring commit and pasted in the PR body (the #526 method); a file outside it stops the PR. `canonical/generated.lock` is refreshed by a green full `npm run -s check:122:diff-guard`.

**E7 — `scripts/release-publish.ts` and its test. Ada** (standing scope; no grant). Split at Ada's request (item 5):
- **E7a, under every F-49 option**: the dry run's two runnable lines (L382–L385: the GitHub Packages command and "and hand this command over for 5.4" with the npmjs command) are replaced by a line nobody can run, for example Ada's `DRY RUN — nothing was published, and this tarball is never published: 5.3 builds the release tarball again at the tag, and 5.4 publishes only that one.` The `tarball:` line stays (site 3 needs the path). Output only. EXECUTION of site 4: the law says this tarball is never the one, so the script stops handing it over.
- **E7b, under F-49 (ii-a)**: 5.3's printed 5.4 line carries the sha1 check and the "not yet on npmjs" check before `npm publish`. **Under F-49 (ii-b)**: a `--npmjs <record>` mode, in Ada's five steps (ADA R1 item 6): record `mode` `publish` with GitHub Packages in `publishedTo`; the file's sha1 equals the record's; `git ls-remote` names the record's commit for `v<record.version>`; the npmjs packument reads HTTP 200, parses, and holds neither `versions["<v>"]` nor `time["<v>"]` (a network error, a timeout, any other status or a body that does not parse refuses); only then `npm publish <tarball> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public` with inherited stdio, followed by the note that npm's `+` line is not evidence. 5.3 then prints that one command and no raw publish line.
- **Tests**: `scripts/__tests__/release-publish.test.ts` L362 (5.3's `shasum … # must print` line) and L363 (the log contains `publicCommand`) change under E7b; L313 asserts the returned `publicCommand`, not a printed line, and may stay under E7a alone (ADA R1 item 2). Her PR body names the exercised file (six-roots test rule).

**E8 — records. Thurgood.**
- The ballots README roll entry (in the Status commit, or the application PR if the Status commit is ballot-only).
- At the application merge, one dated line per row on `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` naming the PR, and a dated `declined` line for any row Peter strikes (rule 9; the record is mine). RS-49's row also gets a dated correction: its fork (ii) premise ("typed by hand") was already false (§ 2).
- **Owed now, not by the application** (rule 10; each is an obligation this round found): (1) **RS-50**, where a RELEASE claims-pass record lives once Spec 123 closes (Stacy S-6; § 5.3 and site 2 depend on it); (2) **the two publish rows' missing `census` fields** (Stacy S-5; `hermetic-publish-path` Ada's, `publish-rail-guard` mine), a precondition for F-49 (ii-b). Both go on the queue record as dated lines, in this ballot's PR before it merges. Stacy's erratum on her own L2154 is hers (S-4 note 2).

## 5. Application (after the Status commit)

1. **The Status commit** (record-first, ballot only): `**Status**: **RATIFIED (Peter, <date>)**`, his words and the clock bound they were received before, each fork's answer, and a `## Resolved after-texts` section carrying the picked After of every site and E-site, each law-doc site's pointer included (checked by `grep -c 'release-flow-batch-16-1'` per site before the commit). A struck row's sites are removed there, not left. Under F-49 (ii-b), the commit is not made until the `hermetic-publish-path` census line has its form (§ header, Census).
2. **Ada**, E1 and E7: her commits under `Agent: Ada`, on the application branch, so the rail's message and step 6 never disagree on `main` (ADA R1 item 14). E7b under (ii-b) rides the same PR; its size is code and tests, and one diff keeps the text and the mode in step.
3. **Thurgood**, one application PR (branch `chore/apply-release-flow-batch-16-1`): sites 1–10 and 12 as resolved; E2–E4; under F-33b include, site 11; then E5's items and E6. The PR body carries:
   - `**Edit kind**: .kiro/hooks/RELEASE-FLOW.md — LAW (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md)`
   - `**Edit kind**: governance/release-management-system.md — LAW (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md)`
   - `**Edit kind**: canonical/agents/stacy.md — LAW (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md)`
   - `**Edit kind**: governance/classification-map.md — EXECUTION (.kiro/docs/ballots/2026-10-26-release-flow-batch-16-1.md § 4 E2–E4)`
   - The two READMEs are not on the edit-kinds path list; the body cites this ballot for them.
   - The grant below, cited with its path list; the `**Consulted**:` line (Stacy, Ada, Lina).
4. **Stacy**, E5's C1 acts, after Thurgood's authoring commit and before the PR's final push, one commit each in her seat (merge-only; never amended).
5. **Checks**, each pasted in the PR body with its result: `npm run -s check:section-citations`; `npm run -s check:122:diff-guard` (full run; the lock); `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci`; `npm run test:scripts` (the audience-banner guard and `release-publish.test.ts`); `npm test`; `node scripts/validate-steering-metadata.js`; the docs MCP `rebuild_index` and `get_index_health` (the recipe is served). **Site 1's own claim**: the resolved 3a block run twice with `bash --noprofile --norc` and once with `zsh -f` over `.kiro/issues/*.md`, equal sha256 each time without the `main at:` line, and a no-hit pattern printing exit 1.
6. **Straggler sweep**, case-sensitive `git grep -n -F`, with expected hits compiled against the resolved after-texts and their generated copies (ballot `2026-10-25-rule-11-post-walk-filings-and-spec-answers` § 7 item 1), over `-- . ':!.kiro/specs' ':!.kiro/docs/ballots' ':!.kiro/issues' ':!docs'` (the pathspec includes `scripts/__bites__/`, which E1 re-records):
   - `not published yet` and `the version is not published`: none after (at `61581c641`: RELEASE-FLOW L150; `verify-publish-rail.sh` L46, L81; bite-2 L2; the register L890).
   - `a tarball the script did not produce`: none after (at `61581c641`: RELEASE-FLOW L136; the register L914).
   - `hand this command over for 5.4`: none after (E7a).
   - `.kiro/issues/*.md; echo`: none after in `.kiro/hooks`.
   - `retitles it to the version`: the recipe L40 only.
   - `its greps re-run at its`: none after in `canonical/`, `.claude/agents/` or `.kiro/agents/` (site 12, E5, E6). **Left, stated**: `tools/agent-generator/__fixtures__/semantics-guard/canonical/agents/semguard.md` L32 keeps a copy of the old row; it is a fixture (Lina's, the semantics guard's input) and its text is not law.
   - `her read of release text` (F-33b include): site 11, its operative item and the generated copies.
   - `release-flow-batch-16-1`: every resolved site's pointer, E2–E4's history lines, the roll entry, the canonical copies of sites 11 and 12; none in the consumer renderings (E5's removal, and site 12's range).
7. **Order**: before the next release's walk (3a). A row not applied by then gets its dated line under E8, or the queue record lapses on it.

**Grant (activated by this ratification)**: Peter's ratification of this ballot grants, until the application PR merges: **Thurgood** — `.kiro/hooks/RELEASE-FLOW.md` (sites 1–6); `governance/release-management-system.md` (site 7); `.kiro/docs/ballots/README.md` (sites 9–10, the roll entry); `canonical/agents/stacy.md` (sites 11 and 12, byte for byte from the resolved text); `canonical/operative-sets/stacy.yaml` (E5's items only); `canonical/profiles/consumer/stacy.overlay.md` (E5's pin only); `governance/classification-map.md` (E2–E4's fields only); `canonical/generated.lock` and the generator's outputs (E6). **Stacy** — `canonical/profiles/consumer/stacy.dispositions.yaml` (E5's removal for the mirror unit, her text). `.kiro/issues/**` is already Thurgood's and Stacy's (standing scope). **Ada**: E1 and E7 are in her standing scope; no grant. C1 acts need no grant (signing-act ballot M1). No `.github/**` path is touched, so no `**ARMING**:` line is owed. As rule 8 has it for a grant, the application PR's body names this grant and cites its path list, and an out-of-list edit is a claims-pass finding.

## 6. Recommendation, counter-argument (fold-back applied), residual

**Recommendation** (the drafter's; the seats' leans are in § 7): ratify with F-0 (a), F-33a (i), F-33b include, F-34 (i), F-38 narrow, F-39 (b), F-40 (a′), F-41 (i), F-43a ride, F-43b either and F-49 (ii-b). Every row is severable.

**Counter-argument, run against the proposal**:
- **(i) Spec 131 is shrinking governance, and its ruled spine includes a freeze**: "no new law except deletions until the rehearsal is green for N releases", CORRECTION edits exempt (outline § 4 (d), F-9 ruled 2026-10-24). This batch adds law to the document read at the release's busiest point, and R2 made it larger (site 12, L134, E7a, E7b, a re-pointed unit).
- **(ii) A rule per incident is the patch-without-guard pattern in prose.** RELEASE-FLOW's own RS-7 sentence says guards live in the command the operator runs, not in a list.
- **(iii) A batch lets one surviving objection hold every row**, and asks Peter to read them at once.
- **(iv) The charter sites pay a signed-unit cost**: two units re-confirmed, one re-signed, one consumer disposition re-pointed, for one paragraph and one pointer.

**Folded in**:
- From (i): three of the six RELEASE-FLOW sites rewrite an existing line (RS-46b, RS-48, RS-49); RS-34 lives inside an existing parenthetical; two rows share each of the RS-39/25 and RS-38/29 sentences; RS-37 adds a walk row, not a duty; site 12 shortens a charter by replacing a restatement with a pointer. The freeze is not in force (its N is unset, outline F-7; 131 is paused at requirements; Peter ratified #492, #495 and #516 this week, each new law), and these rows fix measured findings, which is fix-first's (a). F-0 (b) is offered for Peter to take the other side; Stacy names sites 9 and 10 as the cheapest to strike if he wants a smaller (a), since no instrument reads their lines.
- From (ii): RS-46b's fix is in the command; under every F-49 option the dry run stops handing over a runnable publish line (E7a), and under (ii-b) 5.4's guard is a script mode that fails closed; RS-39's compare is commands pasted with their output; RS-48 points to the packument read the rail's own message names.
- From (iii): every row is severable at the Status commit, and a struck row gets a dated line on the queue (E8).
- From (iv): F-33b offers strike; site 12 changes nothing consumers see.

**What survives**:
1. **If Spec 131's freeze lands as its outline rules it, every row here is the kind of law it would bar.** The three rewrites are the nearest to CORRECTION, which it exempts; they are filed as LAW because each adds a requirement. The class option is F-0 (b); its cost is that RS-37 and RS-49 bite at the next walk and the next 5.4.
2. **Five rows stay prose the operator must remember**: RS-33, RS-37, RS-40, RS-41 and RS-43. Their detector is Stacy's claims pass, after the act. RS-41's catch costs a new S each time (16.1.0's tag was held six times, Stacy S-1a).
3. **No instrument reads a `**Straggler sweep**:` or a `**Sweep**:` line**, and R2 put the sweep line on every CORRECTION, so rote lines become more likely. Whether Stacy's governance-edit-kind read takes them is her question (§ 8, R2 questions).
4. **RS-48 sets no bound on the wait**, because no accepted-and-never-recorded publish has been measured.
5. **The charter sites cost C1 acts and a re-pointed consumer unit** for one paragraph and one pointer.
6. **"Needs a ruling" is the author's call** under F-40 (a′) and (b′) alike (Lina's residual): an author can call a fixable hit unfixable to leave it. The floor still reaches a left false hit at the next walk.
7. **Under F-49 (ii-b), web 2FA through the script's inherited stdio is unmeasured** (ADA R1 item 6, residual r2); its first live use is a real 5.4, and if it fails there the fallback must not be a raw printed line.
8. **Under F-34 (i) the heading's date can trail the tag by the whole hold**, with no bound.

## 7. Forks for Peter (none is picked here)

Each: the problem, the options that survived the R1 round, with their risk and opportunity, the leans in brackets, and what prevents a recurrence.

- **F-0 · The batch now, or into Spec 131.** *Problem*: release law added while 131's ruled freeze, not yet in force, would bar new law. **(a)** Ratify now, rows severable. *Opportunity*: the delegate row, the 5.4 binding and the dry-run change are in place for the next walk and 5.4. *Risk*: law 131 must later weigh. **(b)** Carry the rows into 131's requirements as fix-first findings, each with a dated disposition line on the queue. *Risk*: the next release runs without RS-37's row or RS-49's binding, while the dry run keeps printing a runnable publish line for a same-version, different-bytes tarball (Ada would still propose E7a to Peter as output only). [Thurgood (a); Stacy (a); Ada (a), at least for RS-49] *Prevention*: 131's freeze names the event it starts at.
- **F-33a · The pre-S read's text.** *Problem*: an auditor's replacement sentence shipped false and nobody read it (RL-19). **(i)** The read names what is false and why and proposes nothing; the owner writes, and an owner handed text calls it out. *Risk*: the owner writes under release-day pressure, and a false replacement is caught after S, at a new S each time. **(ii)** The read may propose; a proposed sentence ships after a second reader. *Risk*: the second reader reads the audit's conclusion, and phase 1 then audits a sentence its auditor proposed. [Thurgood (i); Stacy (i)]
- **F-33b · Site 11, Stacy's charter.** **Include**: the duty sits where it reaches her during release prep. *Cost*: a re-confirm and a re-pointed consumer unit (the dated pointer is removed for consumers). **Strike**: site 2 alone binds the read. [Thurgood include; Stacy include, conditional on wording free of release-flow vocabulary, which R2's text meets]
- **F-34 · The heading's date.** **(i)** The UTC date of the release PR's last commit before merge; it dates the preparation, not the tag, and no later PR rewrites it. *Risk*: it can trail the tag by the whole hold. **(ii)** No date in the heading. *Risk*: breaks the dated headings of 15.0.0 to 16.1.0; nothing can be wrong. [Thurgood (i), weakly; Stacy (i) weakly, (ii) if the hold cannot be bounded; Ada none]
- **F-38 · The straggler line's scope.** **Narrow** (site 9): scripts named in RELEASE-FLOW or a register row's `checks`, and `check_state` flips, read by section. **Broad**: every PR that changes a script's behaviour. [Thurgood narrow; Stacy narrow]
- **F-39 · Site 3's last sentence (new at R2, Ada 9 (c)).** **(a)** Strike R1's "phase 1 compares S's tarball", which assigned a duty to nobody; the compare names the commit it ran at. *Risk*: if `main` moved under the release PR, S's tree differs from the head the compare read, and nothing notices. **(b)** Add the check: the compare holds for S only while `git diff --quiet <the pushed head> <S>` exits 0, and if it does not, the author repeats the file-set compare on 5.1's tarball before the tag. *Risk*: one more step between 5.1 and the tag. [Thurgood (b); Ada surfaced it without a lean] Whether branch protection requires up-to-date branches is unverified (Ada).
- **F-40 · A CORRECTION's sweep.** Both options: every CORRECTION carries the line; a command or a named read over the class's reach; a diff's size is never a reason to leave a hit; a left hit is filed and reaches Peter through the floor. **(a′)** Fix every CORRECTION-hit in the files the PR corrects; a hit may be left when its fix needs a ruling or when it sits in a file the PR does not correct. *Risk*: hits elsewhere wait for their records. **(b′)** Fix every CORRECTION-hit across the reach, in other files too; leave only a hit whose fix needs a ruling. *Risk*: a narrow ruled CORRECTION widens into other owners' files. [Thurgood (a′); Lina (a′), the pick Peter's; Stacy (a) at R1, before the narrowing] *Prevention*: Lina's practice at 16.1.0 was already (b)-shaped on Peter's orders; the rule keeps it when the author changes.
- **F-41 · The stale cited disclosure.** **(i)** Phase 1 re-reads each cited record at S (site 6, E4). **(ii)** Packed text cites no `.kiro/issues/` record, which is not in the package (site 7). **(iii)** Both. *Risk of (ii) alone*: the 16.1.0 sentence was stale because the work moved, not because it cited a record; dropping the citation does not catch that. *Opportunity of (ii)*: the consumer reader never meets a path that does not resolve (Ada). [Thurgood (i); Stacy (i), firmly; Ada none, noting (i) and (ii) are not exclusive]
- **F-43a · Where RS-43 lives.** **Ride** this ballot, or a **separate** small ballot. [Thurgood ride; Stacy ride]
- **F-43b · Before, or travel in.** **Either**, `git cat-file -e <m>:<path>` (the test Stacy's read already runs), or **land first**, the same at `<m>^`. *Risk of either*: observation and fix share a diff; the referent still carries the truth. *Risk of land first*: long-lived upkeep branches defeat it (#500, #502, #504, #505), and it leaves a straggler in Stacy's charter. [Thurgood either; Stacy either]
- **F-49 · What 5.4 may publish.** Under every option the text binds 5.4 to 5.3's record (`mode` `publish`) and the dry run stops printing runnable publish lines (E7a). **(i)** Nothing more. *Risk*: 5.4 is still a command the operator can mistype. **(ii-a)** 5.3 prints a checking line (sha1, not yet on npmjs). *Risk*: the sha1 checked is the printing run's own; network-error logic in one shell line is tested only as a string; the census line is exempt on ground (3). **(ii-b)** A `--npmjs <record>` script mode with four refusals that fail closed. *Opportunity*: the guard is in the command (RS-7), and a typed copy of it is still guarded. *Risk*: code and tests for a class whose RL-36 member immutability made harmless; web 2FA under the script is unmeasured; a typed raw `npm publish` still bypasses it; **the census line is in scope and the row has no `census` field, so ratification waits on Ada** (Census). [Thurgood (ii-b); Ada (ii-b); Stacy (ii), conditional on failing closed and a redrafted census line, both met by (ii-b)]

**Open for Peter**: ratify? (every row is severable; name any to strike)
**Open for Peter**: F-0 — the batch now (a), or into Spec 131 (b)?
**Open for Peter**: F-33a — the pre-S read names only (i), or may propose with a second reader (ii)?
**Open for Peter**: F-33b — Stacy's charter site 11: include or strike?
**Open for Peter**: F-34 — the heading's date: the release PR's last-commit date (i), or none (ii)?
**Open for Peter**: F-38 — the straggler line: narrow or broad?
**Open for Peter**: F-39 — site 3's last clause: strike (a), or the tree-equality check at S (b)?
**Open for Peter**: F-40 — a CORRECTION's sweep: fix in the corrected files, may leave elsewhere (a′), or fix across the reach (b′)?
**Open for Peter**: F-41 — the stale disclosure: phase-1 re-read (i), no record citations in packed text (ii), or both (iii)?
**Open for Peter**: F-43a — RS-43 rides this ballot, or a separate one?
**Open for Peter**: F-43b — the observation record: either, provided it resolves at merge, or land first?
**Open for Peter**: F-49 — 5.4: the record binding only (i), a printed checking line (ii-a), or a `--npmjs` script mode (ii-b)?

## 8. Consult questions

**R1 questions** (S-1 to S-6 to Stacy, A-1 to A-4 to Ada, site 10 to Lina): answered in § 11; the incorporation is `[THURGOOD R2]`.

**R2 questions** (bytes and the points R2 changed):
- **Stacy**: (1) site 11's R2 wording and the L463 touch: free of release-flow vocabulary, as S-1e asked? (2) E5: the mirror unit re-pointed for one removal, the dated pointer — your removal text and signature; or do you read the pointer as harmless in a retained unit? (3) Does your governance-edit-kind read take the `**Sweep**:` line (site 10) and the `**Straggler sweep**:` line (site 9)? If not, § 6 residual 3 stands as written, and the sentences name no detector. (4) Site 12's After: does it keep exactly your record's line forms? (5) The redrafted census lines.
- **Ada**: (1) site 4's three Afters and E3, E7 as you worded them? (2) Under F-49 (ii-b), the `hermetic-publish-path` census field: a census mode, or `census: none — <why>`, before this ballot leaves DRAFT? (3) F-39: a read on (a) or (b).
- **Lina**: site 10's (a′) and (b′) Afters: do they say what your R1 asked, including the M7 clause?

## 9. Not in this ballot (named so they are not read as covered)

- **RS-35** (no instrument reads a PR body for an open question at merge time): declined with reason, provisional, in the queue record; Peter's fork on an instrument stands there.
- **RS-36 with RS-10** (the signing-act walk's link 6, H3, double-candidate and link 7): the signing-act-chain amendment ballot.
- **RS-44 with RS-47** (the examples guard's behaviour check; a home for release-scoped rules): the guard-amendment ballot.
- **RS-42** (index platform names): Ada's record. **RS-45** and **RS-46a**: Stacy's method. **O-23**: the overview count-pointer CORRECTION (#526's grant, branch `fix/overview-section-counts`).

## 10. Standards notes (no edit in this ballot)

1. **A proposed command change was right on reading and wrong on running.** The `| LC_ALL=C sort` amendment reads correctly and zeroes the walk's exit code. A ballot that edits a command runs its after-text and states the run (§ 2, site 1). `adopted` for drafting.
2. **RS-48's sentence lived in three places** (RELEASE-FLOW, the rail script with its bite, the register row); the batch found them by `git grep`, which is RS-38's class inside its own ballot. `adopted`: site 9 is the rule.
3. **The RS-49 fork (ii) premise ("typed by hand") was already false.** It began in Stacy's pass (L2154) and was copied into the queue (mine). A fork that names a script change reads the script first. `adopted` for drafting; the queue row gets a dated correction (E8), and the pass's erratum is Stacy's.
4. **R1 read the walk restatement in site 2 and the charter restatement at L400 as harmless, and both were stale** (Stacy S-4, S-6). A ballot that touches a file sweeps it for restatements of the law it amends. `adopted`: site 12, and site 2 now points.
5. **A line-grain sweep cannot see a paragraph-grain restatement** (Stacy, site 9 on RL-22). `adopted`: site 9 reads by section.
6. **R1 misread a residual it quoted** (L906, F-34). A quoted residual is re-read in its own paragraph before it is imported as a rule. `adopted` for drafting.

**Outcomes for the composed loop**: items 1–6 `adopted` as stated; none is a standard edit outside this ballot.

## 11. Review round record

*The three R1 entries below are the authors' own, spliced byte for byte from the files the orchestrator relayed (`batch-consults/stacy-r1.md`, `ada-r1.md`, `lina-r1.md` in the session scratchpad); each block was compared with its file by `cmp` before the commit.*

#### [STACY R1]

*Read-only consult, 2026-10-26 (from 19:51Z by `date -u`). I read the ballot at `eaf8d24ce` and every source at `99eabf854` on the main checkout. Commands run: the pipe/pipefail probe below (`bash --noprofile --norc`, bash 3.2.57, `/usr/bin/grep`); `git grep` sweeps; reads of `RELEASE-FLOW.md`, my claims pass for 16.1.0, the queue record, `scripts/release-publish.ts`, the register rows, my consumer dispositions, the operative set and the consumer rendering. Nothing was edited. @-mention scan: § 11 is empty and there is no `[@STACY]` elsewhere, so § 8's S-1 to S-6 are the questions owed.*

**Mirror clause, applied to this entry.** Where a site's wording is false or undecidable I say what is wrong and why. I propose no replacement text: the wording is Thurgood's. This entry is a feedback entry, not a gate. Nothing in it holds the ballot; only Peter's ratification decides it.

**Answers to § 8**

- **S-1a (F-33a): lean (i).** → ballot § "7. Forks for Peter" F-33a; § "3. Edit sites" Site 2
  - The evidence is my own 16.1.0 practice after RL-19. Across addenda 1 to 5 I named each false line and left its text to the owner (pass L907, L1005, L1131). The owners' texts were then read at each new S by the phase-1 re-run.
  - Under (i) an independent reader exists by structure: the owner writes, and phase 1 reads at S.
  - Under (ii) the second reader reads my sentence, and phase 1 then audits a sentence I proposed. The second reader does not remove the collapse that the mirror clause exists to prevent. It only adds a seat in front of it.
  - **Residual against (i)**: (i) catches a false replacement after S, where each catch costs a new S. 16.1.0's tag was held six times (pass L1804). The 1-in-7 rate the ballot names moves to the owner, and the catch moves later and gets more expensive. The fork stays Peter's.
- **S-1b (site 2 (i), Medium): the second sentence equates "the text's owner" with "the release author". That is false for part of its own scope.** → Site 2, After F-33 (i)
  - The site's scope is "the release notes, the `CHANGELOG.md` entry or other packed text". The packed served docs are in that scope, and their owners are content owners, not the release author. At 16.1.0 the CDG and guidelines fixes were Lina's (#500–#505), not the release author's.
  - Read literally, (i) hands a served-doc replacement to the release author, against the content owner's authority (Civitas § "The Three-Layer Boundary").
- **S-1c (site 11 and L463): yes, L463 needs a touch under (i).** → Site 11; `canonical/agents/stacy.md` L463
  - "It binds the LENS seat specifically." reads as *only*. A next paragraph that opens "It binds her pre-S release read too" contradicts it on the same screen.
  - Under (ii) "specifically" stays true, because (ii) adds a conditional permission, not a second binding. Its paragraph would then sit under a heading for a prohibition while permitting the act. That is legible, but it should be deliberate.
- **S-1d (Medium): the extension carries a prohibition with no caller-out.** → Site 11
  - The clause's strength is "named prohibition, named caller-out, **called at the exchange**", and it is countersigned (symmetric with Thurgood's). Site 11 extends the prohibition only.
  - The queue itself notes that Thurgood's caller-out duty (`thurgood.md` L582) "is also written for criteria", and no site touches it.
  - At a pre-S read the person who would see me drafting is the receiving owner, often Thurgood. See the directed question below.
- **S-1e (Medium): the unit does not stay `retained` as drafted.** → Site 11; § "4. Execution sites" E5
  - The consumer rendering has no "S" and no RELEASE-FLOW. Its RELEASE row reads "Before a version publishes / at the release tag" (`canonical/_consumer-output/_canonical/agents/stacy.md` L306). A `grep` for `pre-S`, `squash S` and `RELEASE-FLOW` in that file finds nothing.
  - A retained paragraph that says "her pre-S release read" would ship a term no consumer charter defines into every consumer's always-loaded Stacy.
  - E5's "it cites no internal path for that reason" is true and not enough: the internal word is the vocabulary, not a path.
  - **Two clean outcomes, pick Thurgood's**:
    - (a) The wording carries no S/RELEASE-FLOW vocabulary, and the unit stays `retained`. The principle — the auditor names release text false and does not author its replacement — is general and fits a consumer's RELEASE row. This is my lean.
    - (b) The wording keeps "pre-S", and I re-point the unit with the paragraph removed for consumers. That needs my overlay/dispositions edit under the grant and a C1 signature, not a confirmation.
  - Under (b), the signing-act census line's why ("no dispositions row is added or removed") must be re-stated, because a row's routing changes (S-5).
- **S-1f (F-33b): include, conditional on S-1e.** → F-33b
  - Pre-S reads happen in consult briefs during release prep, where I do not necessarily load RELEASE-FLOW. My charter is the file that reaches me at that moment.
  - My census-ballot residual quoted at F-33b applies here.
- **S-2 (site 1): yes, the form carries my amendment, and it corrects it.** → Site 1; § "2. The rows" RS-46b
  - My `| LC_ALL=C sort` read, relayed in #521's body, did not account for the exit code. That defect is mine. Thurgood's measurement is right; I reproduced it on the main checkout:
    - plain pipe, no hit: `exit 0`
    - bare grep, no hit: `exit 1`
    - `(set -o pipefail; … | LC_ALL=C sort)`, no hit: `exit 1`
    - P0 pattern, with hits: `exit 0`
    - unreadable file: `exit 2` (grep's error code survives)
  - The walk record's "empty result, exit 1" fact survives, and phase 1's S re-run becomes byte-comparable with the walk paste.
  - My method half (RS-46a) is unchanged and stays mine.
- **S-3 (F-43a / F-43b): ride; either.** → Site 8; F-43a, F-43b
  - **Decidability**: "resolves at the CORRECTION's merge commit" is decidable as written, and more simply than the site says. `git cat-file -e <m>:<cited path>` succeeds exactly when the record is in the PR's diff or in an ancestor of the squash `<m>`. Use the path as cited in the `**Edit kind**:` line, read as it stands at `<m>`, so a later archive move does not matter.
  - **For "either"**: my governance-edit-kind read already tests "CORRECTION hunks whose observation record does not resolve at the merge" (charter, § "The governance-edit-kind read"). "Either" codifies the test I run. "Land first" would change it to `<m>^` and leave a straggler in my charter that no site of this ballot touches.
  - **Defect in the land-first After (Low)**: it states two different tests. "merged before the CORRECTION's PR opens" and "not an ancestor of its PR's base" disagree for a record that merges after the PR opens and before a base update. Also, "a record that is not an ancestor" is ill-formed: records are files, not commits. If (ii) is picked, the test needs to be one decidable predicate.
  - **Residual for "either"**: an observation filed in the same diff as its fix is written at the same moment as the fix. The referent, not the record, still carries the truth (ballots README CORRECTION row), so I accept it. A reader who weighs authoring independence more highly can disagree; that is Thurgood's stated risk.
- **S-4 (L400): point, not restate, and ride this ballot as a site rather than "outside" it.** → § "5. Application" item 6 (the "Known left hit"); `canonical/agents/stacy.md` L400
  - My RELEASE row restates phase 1's reads, and it is already wrong against ratified law. It says the walk's "greps re-run at its `main at:` SHA"; RELEASE-FLOW L199 (#492) re-runs them at S and reads the unrowed hits. Site 6 would widen that gap.
  - The ballot's own site 9 rule (sweep the law text that restates) and site 10 rule (state every hit in a file you correct) both describe this hit. A batch that names a known false line in a file it already edits (site 11 is in `stacy.md`) and leaves it out of scope is the RS-40 class inside its own ballot.
  - **Form**: the row points to RELEASE-FLOW § "Phase 1" for the list of what phase 1 covers. It keeps only what is my record's own grammar: the per-floor-class-row line forms, `not re-verified — <why>`, phase 2's read, and "a read, never a gate".
  - I do not author it. `canonical/agents/**` is outside my write scope, so it is Thurgood's text under the grant, like site 11.
  - **Cost, stated**: L400 is in the trigger-table unit, which is re-pointed for consumers and carries my signature. Any edit stales it and owes my C1 re-sign, the same cost class as E5.
  - **Counter**: a pointer makes the charter less self-contained. I load RELEASE-FLOW at every RELEASE, so the duty stays where I read it. My census-ballot objection was about a register row I never load, not this.
- **S-5 (census reader)**: → the ballot's `**Census**:` lines
  - **hermetic-publish-path, under F-49 (i): holds.** The edits are text only, in education homes, and no refusal, check or finding changes.
  - **hermetic-publish-path, under F-49 (ii): disputed. By the letter of the census rule this goes to Peter, and Thurgood redrafts.**
    - E7 is an instrument code change (`release-publish.ts`), so the item is presumptively in scope by the rule's third condition.
    - The line's why ("no verdict or surface can change") is contradicted by the ballot's own E3 (ii). That text rewrites the row's HONEST REACH to "NOT detected before publish *unless the operator runs the 5.4 line*", so the row's stated reach, a surface, changes. The printed line adds a refusal, made by the script and executed in the operator's shell.
    - The nearest true form is `exempt`, ground (3): the refusal's effect lies in a command no registered check's own command composes. It would carry `ran: none; count: no count`. Ground (2) is not available: the row has no `census` field at all.
    - **Finding, never a gate**: `hermetic-publish-path` and `publish-rail-guard` both lack a `census` field (register L878–L915 at `99eabf854`). → Ada for the former (row owner), Thurgood for the latter.
  - **signing-act-consistency: holds.**
    - No instrument code changes, so the census mode's committed run and its scratch-diff run are identical by construction, and the delta is zero. The stale verdict on the mirror unit belongs to the input; E5 clears it inside the PR.
    - The "heuristic not run" note costs nothing for that reason.
    - Two conditions:
      - **Order**: E5 must land before the application PR's final push. Otherwise the 122-diff-guard required check's `verify-signing-chain --ci` step fails the PR.
      - **Wording**: if S-1e resolves to (b), the line's "no dispositions row is added or removed" needs re-stating.
  - **The other lines**: the 122-diff-guard, section-citation and audience-banner lines hold.
  - **No line missing**: I enumerated register rows whose text cites any edited file. Only `completion-criteria-parity` was not already accounted for, and it cites RELEASE-FLOW in a history line, not as an education home. The governance-examples guard has no register row at `99eabf854`, so no line is owed for it.
- **S-6 (site 2, RS-37): my count line is decidable; the walk row's path is not.** → Site 2, the delegate-audit paragraph
  - My line's `<path> @ <sha>` is whatever the delegate commits, read from git, so it is decidable.
  - **Not decidable at the walk (Medium)**: "the directory where the release's claims-pass record is written" describes a file that does not exist yet. The walk lands before the release branch, and my record lands at phase 1. No rule names a RELEASE record's home: all four so far sit in Spec 123's completion directory only because 123 carried the releases, and nothing says where release 6's goes. § 5.3 has the same gap ("in the directory of the event's claims-pass record").
  - **Second gap (Low)**: site 2 restates § 5.3's rotation ("the next of Ada, Lina and Leonardo after the previous walk's delegate line") and omits its backlog clause. 16.1.0's delegate line names Ada, not run (`0 / 135`), and #507 owes Ada the backlog file. The restated letter sends the next walk to Lina and says nothing about whether a walk that never ran advances the rotation. That is RS-38's class inside its own ballot: a restatement of § 5.3 where a pointer would hold.

**Fork leans (§ 7)**

- **F-0: (a).**
  - These are measured findings (fix-first), and RS-37 and RS-49 bite at the next walk and the next 5.4. The freeze is not in force.
  - **Residual**: five rows stay prose detected only by my read after the act (§ 6 residual 2). If Peter wants a smaller (a), the rows that rely on no reader at all are sites 9 and 10 (RS-38/29, RS-40), whose PR-body lines no instrument reads. They are the least costly to strike. This is an observation, not a pick.
- **F-33a: (i).** F-33b: **include**, conditional on S-1e.
- **F-34: (i), weakly. The site misreads my residual (below).**
  - Under (i) the heading's date can trail the tag by the whole hold, not by a day. If the hold cannot be bounded, (ii) is the option where nothing can be wrong. Peter's reading decides whether a several-day gap is a falsity.
- **F-38: narrow**, with the grain defect below.
- **F-40: (a).**
  - Peter's per-instance answer ("do the whole-file sweep", pass L1288) and #502's four extra lines support stating every hit. A narrow ruled diff stays reviewable under (a).
- **F-41: (i), firmly.**
  - The cited record moved after S was cut: #495 merged after #494's S at `a95d6bf3d`. No author-side check before S could have caught RL-28. A re-read at S is the only place that reaches it.
  - (ii)'s weakness is as drafted.
- **F-43a: ride. F-43b: either** (S-3).
- **F-49: (ii)**, conditional on Ada's A-1 shape (the not-yet-on-npmjs check fails closed) and on the census line being redrafted (S-5).
  - **Residual**: (ii) refuses RL-36 only if that command was a copied printed line. A typed command bypasses both options, and RL-36's cause is not on record.

**Where the before-texts misread my pass**

1. **RS-34 / pass L906 (Medium).**
   - My residual reads: "the heading carries S's date. If 5.2 runs after UTC midnight, the tag's date and the heading's differ by a day." The gap I called "not a falsity" is S-to-5.2 across midnight.
   - Site 3 (i) instead dates the heading by the day the release PR is opened, which is earlier than S by the PR's review time. It then imports my sentence as a general rule ("a heading a day off the tag's date is not a falsity").
   - It also says "a new S writes it again". At 16.1.0, S moved by PRs that were not release PRs: the final S `38f4ece47` is Lina's #505, a CDG fix. So "a new S writes it again" does not say which PR rewrites the heading, and is undecidable for an S moved by a non-release PR.
2. **RS-49 (Low): the error starts in my pass, not only in the queue.**
   - My L2154 says "5.4's command is typed by hand". `release-publish.ts` L388–L390 prints it.
   - § 10 item 3 takes the error as the queue's. The queue copied my premise. I owe an erratum line on my 16.1.0 record (my scope; not done in this read-only consult).
3. **RS-41 vehicle (Low; not wrong).**
   - The queue framed the fix as an author's duty ("turns her read into the author's duty"). Site 6 places it in phase 1, which is my read. Given the timeline in F-41, site 6's placement is the right one.
   - It does add a phase-1 read, which is S-4's reason.
4. **RS-46 (accurate).**
   - The ballot correctly attributes the `LC_ALL=C sort` request to me, and correctly finds its defect.
5. **Other rows and source lines.**
   - RS-33, RS-37, RS-38, RS-39, RS-40, RS-43 and RS-48 read my findings correctly, as do the L633, L637, L1005 and O-45 citations.

**Other findings on the draft**

- **Site 9, grain (Medium):** the sweep's hit is a line, and a restatement is a paragraph.
  - I ran the site's own command for RL-22's script: `git grep -n -F owed-set.sh -- .kiro/hooks/RELEASE-FLOW.md governance canonical/agents canonical/profiles/consumer .kiro/steering`.
  - It hits `stacy.md` L194 and L442, `thurgood.md` L521 and L538, and overlay L107 and L197. Those are the `cmd` lines, and each reads `— true`.
  - RL-22's false sentences (the `touch-only` and `candidate` definitions) sit on other lines of the same sections. The sweep as written would have passed RL-22's instance with every hit true.
  - This is a decidability defect, not a wording preference. The wording is Thurgood's.
- **Site 10, trigger (Low):** "a CORRECTION whose observation names a class of text" depends on how the observation is worded, and the CORRECTION side writes that.
  - RL-27's observation named lines (a ruled list), not a class. That is how the miss happened.
  - The trigger as drafted would not have fired on the instance it comes from.
- **Site 6, "the final S" (Low):** phase 1 runs at each S and cannot know that S is the final one. The read is decidable per S, not per "final" S.
- **Site 3, `comm` (Low, unverified):**
  - The inputs are `LC_ALL=C`-sorted, but `comm` runs under the operator's locale. On macOS `comm` gave the same result under `LC_ALL=en_US.UTF-8` (probed).
  - Not measured: GNU `comm`, which checks order by locale and may warn or mis-pair under a non-C locale.

**Directed questions**

- [@THURGOOD] Does your caller-out duty (`thurgood.md` L582) extend to the pre-S read under F-33a (i)? If not, the extended prohibition has no named caller-out, and that is weaker than the clause it extends. → Site 11 -- [STACY R1]
- [@THURGOOD] Where does a RELEASE claims-pass record live once Spec 123 closes? Site 2's delegate row and § 5.3 both key on that directory, and no rule names it. I raise it as a standards implication; it is yours to home. → Site 2 -- [STACY R1]
- [@THURGOOD] Under F-34 (i), which PR rewrites the heading when S moves by a non-release PR (16.1.0's final S was #505)? What bound replaces "a day off" when the hold lasts several days? → Site 3 -- [STACY R1]
- [@THURGOOD] Will L400's pointer (S-4) ride this ballot as a site with its C1 re-sign, or do you want it as a separate CORRECTION? (Observation: L400 against RELEASE-FLOW L199 at `99eabf854`.) → § "5. Application" item 6 -- [STACY R1]

**Counter-argument against this read (fold-back applied).**
- **My consumer-vocabulary finding (S-1e) could be over-strict.** One undefined word in a retained paragraph is not a falsity, and a consumer Stacy can read past it. I kept it because a retained unit ships verbatim into an always-loaded charter, and the fix is free under outcome (a). I downgraded it from a hold to a condition on F-33b.
- **My S-4 "ride this ballot" adds a site and a signature cost to a batch already called large.** **What survives**: it is a known false line in a file the batch edits, under the batch's own two rules. Leaving it out is the shape the batch exists to stop. Peter may prefer a smaller batch, and that is his fork, not mine.

**Standards implications**: list
- RELEASE records have no declared home after Spec 123 (S-6). → Thurgood.
- Site 9's line-grain sweep does not reach paragraph-grain restatements (the RL-22 instance). → Thurgood.

**One-line read for the `**Consulted**:` line** (Thurgood's to write): Stacy — S-2 confirmed and reproduced; F-33a (i), F-33b include only with S-vocabulary-free wording (or re-point); S-5 hermetic not-in-scope disputed under F-49 (ii) → Peter; S-6 walk-row directory undecidable; L400 should point, ride as a site.

#### [ADA R1]

*Read-only consult, 2026-10-26 (from 19:42:53Z, `date -u`), on the DRAFT at `eaf8d24ce` against `99eabf854`. Every read and run is named in its item. Nothing I ran writes: one read-only `git fetch` into a scratch clone, one `git ls-remote`, and one rail run (an HTTP GET).*

**Base check** → § 3 "Edit sites", § 4 "Execution sites"

1. **The Before texts are byte-exact at `99eabf854`.** I compared all eleven § 3 Before blocks by script against `git show 99eabf854:<file> | sed -n '<a>,<b>p'`, and all eleven are equal. E2's and E3's substrings each occur once in `governance/classification-map.md` (L890, L914). The code references hold as cited: `release-publish.ts` L281–L283 warns and accepts, L384–L385 print the dry run's 5.4 line, L388–L390 print 5.3's `shasum` line and the publish command, and RELEASE-FLOW L134 says so. `verify-publish-rail.sh` L42–L49 and L81 are as cited. The bite reproduces at `99eabf854`: `VERSION=99.99.99 ./scripts/verify-publish-rail.sh` exits 10, and its message equals `bite-2-version-mismatch-exit10.txt` L2 byte for byte.
2. **One citation is imprecise** → § 4 "E7". L313 asserts the dry run's *returned* `publicCommand`, not a printed line. L362 asserts 5.3's `shasum … # must print` line, and L363 asserts that the log contains `publicCommand`. Under (ii), L362 changes too. Under item 5's change alone, L313 can stay, because the field may still be returned. Name L362 in E7.

**A-1 · F-49** → § 2 "RS-49", § 3 "Site 4", § 4 "E7", § 7 "F-49"

3. **The ballot does not carry a measured fact, and it changes what the fork is about.** The dry run's tarball and 5.3's tarball have the same version and different bytes at every release measured. The 5.1 and 5.3 sha1s:
   - 15.1.0: `b972c9d1…` and `f4dd5caa…`
   - 16.0.0: `13519dbb…` and `e9d8bfca…`
   - 16.1.0: `e3d86894…` and `cc42f4f9…`

   The cause is that the build-timestamp files move (`docs/releases/<v>/publish-verification.txt`: 15.1.0 L31, 16.0.0 L33, 16.1.0 L60). The dry run also prints a runnable 5.4 command for **its own** tarball. 16.1.0's committed record shows it at L55–L56, with a runnable GitHub Packages line at L53–L54. If that line is run at 5.4, npmjs gets a second artifact under the version GitHub Packages already holds as 5.3's. That is 15.0.0's two-artifact class, and it cannot be undone; 6b detects it only after the publish. This is the harmful member of RS-49's class. RL-36's case, another release's version, is the harmless one, because npm refused it. A "not yet on npmjs" check does nothing for the harmful member, since the version is absent from npmjs at 5.4 either way. Only binding 5.4 to 5.3's record refuses it. Site 3's pre-S dry run would add one more such tarball and printed line per release, with the same file name (`3fn-core-<v>.tgz`).
4. **An observation, with no cause inferred.** RL-36's command (16.1.0 record L135) is byte-equal to a line the script prints. It uses the `--registry=` form; RELEASE-FLOW L136 uses the space form, `--registry https://…`. That fits a copied or recalled printed line better than one typed from RELEASE-FLOW's text. I infer no cause, and neither does RL-36.
5. **The dry run should drop its runnable lines under (i) too. This is a firm lean.** Replace both commands (L382–L385, the GitHub Packages one and the npmjs one) with text that cannot be run, for example: `DRY RUN — nothing was published, and this tarball is never published: 5.3 builds the release tarball again at the tag, and 5.4 publishes only that one.` The `tarball:` line stays, because site 3's compare needs the path. The cost is two log lines and a test, and it is output only. Under either option it is EXECUTION of site 4: the law says this tarball is never the one, so the script stops handing it over. Please split E7 into **E7a**, the drop, under (i) and (ii), and **E7b**, (ii)'s 5.4 check. Both go in the straggler sweep.
6. **My read on (ii)'s shape, with fold-back. This is a sub-fork for Peter.** The drafted shape (call it **(ii-a)**) is a printed compound shell line that checks an embedded sha1 and that the version is absent from npmjs. It has three problems:
   - (a) The embedded sha1 is the printing run's own, so a checking line printed by any run passes for its own tarball. What keeps 5.1's tarball out is item 5 (printing no line), not the check.
   - (b) Logic that refuses on a network error, written in one shell line run in Peter's zsh, is tested only as a string.
   - (c) The line still contains a raw `npm publish`.

   The shape I would build is **(ii-b)**, a 5.4 mode of the script: `npx tsx scripts/release-publish.ts --npmjs <the record path 5.3 printed>`, run from the main checkout. It runs five steps in order and stops at the first refusal:
   1. It reads the record and refuses unless `mode` is `publish` and `publishedTo` holds GitHub Packages. A dry-run record, from 5.1 or a pre-S run, refuses.
   2. It recomputes the file's sha1 and refuses unless it equals the record's.
   3. It runs `git ls-remote` for `v<record.version>` and refuses unless the tag names `record.commit`.
   4. It GETs the npmjs packument with the rail's form (`curl -q -sS --max-time 15`). It refuses unless it gets HTTP 200, the JSON parses, and neither `versions["<v>"]` nor `time["<v>"]` exists. A network error, a timeout, any other status or a body that does not parse refuses with "could not establish that <v> is absent from npmjs; nothing was published". It reads the packument rather than the version endpoint because a 404 from the version endpoint is not positive evidence of absence.
   5. Only then does it run `npm publish <tarball> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`, with inherited stdio for web 2FA. It then prints that npm's `+` line is not evidence and that step 6 reads the packument.

   5.3 prints this one line and no raw publish command. Typing it is fine, because the guard is inside it.

   Why step 1 is sound: the script writes a `publish` record only after the GitHub Packages PUT succeeds (L370 runs before L373), and GitHub Packages refuses a second PUT of a version (E409, 16.0.0's duplicate run). So each version has at most one publish-mode record, and it names the tarball GitHub Packages holds.

   The counter-argument I ran: this is code for a class that immutability already makes half harmless. What I folded in: no lock, no GitHub Packages read (that stays 6b's), no new auth.

   What survives:
   - (r1) A raw `npm publish`, typed by hand, still bypasses all of it. The HONEST REACH says so (item 14).
   - (r2) npm's web 2FA run under `spawnSync` with inherited stdio is unmeasured. Its first live use would be a real 5.4. If it fails there, 5.4 stops, and the fallback must not be a raw line printed early.
   - (r3) The mode adds refusals, so the `hermetic-publish-path` census line is **in scope** under (ii-b), not "output" (item 17).
   - (r4) RS-48: inside an accepted-but-unrecorded window, `time["<v>"]` is absent, so check 4 passes, and npm refuses the second PUT. That is harmless, and the mode's closing line says so.

   **My lean is F-49 (ii) in the (ii-b) shape, with item 5 under either option.** If Peter picks (i), item 5 still applies, and site 4 (i) gains a marker anyone can check (item 7).
7. **Site 4 text** → § 3 "Site 4".
   - Under **(i)**, after "and its sha1 equals that run's `release-publish-record.json`", add: ", whose `mode` is `publish` (only 5.3 writes one, after GitHub Packages accepted that tarball)".
   - Under **(ii-b)**, replace "run the 5.4 line that 5.3 printed, copied and never typed: it checks the file's sha1 against the record and that `<version>` is not yet on npmjs, and runs `npm publish <tarball> … --access public` only if both hold" with: "run `npx tsx scripts/release-publish.ts --npmjs <the record path 5.3 printed>` from the main checkout: it refuses unless the record is 5.3's (`mode` `publish`), the file's sha1 equals the record's, the tag names the record's commit, and npmjs's packument reads without `<version>` (a network error refuses), and only then runs `npm publish <tarball> --registry=https://registry.npmjs.org --@3fn:registry=https://registry.npmjs.org --access public`".
   - Under every option, write the publish command in the `=` form the script prints. Site 4 (i) keeps L136's space form and (ii) changes it; one form avoids two strings for one command.

**A-2 · the pre-S dry run** → § 2 "RS-39 with RS-25", § 3 "Site 3"

8. **Yes, the dry run fetches a SHA that is not on `main`. Measured.** The code path:
   - The dry run resolves `<sha>^{commit}` in the main checkout (L277–L278). So `git fetch origin` comes first, and the default refspec (`+refs/heads/*:refs/remotes/origin/*`, read from this checkout) brings in the release branch's head.
   - It warns if that commit is not an ancestor of `origin/main` (L281–L283).
   - In a fresh `git init` clone it runs `git fetch -q --depth 1 <origin URL> <full sha>` (L294) and refuses unless HEAD equals the requested commit (L297).

   I ran exactly that form into a scratch clone under the scratchpad: `git fetch -q --depth 1 https://github.com/3fn/DesignerPunk.git d5023fa7c591e9703d4918ef177a24c301ab7d40`. That commit is the head of `fix/token-index-platform-names`, and `merge-base --is-ancestor` against `origin/main` exits 1. The fetch exited 0 in 7 s, and `rev-parse HEAD` equals the SHA. The git version is 2.50.1. The release branch's head stays reachable until the release PR merges and the branch is deleted, and the compare runs before that.
9. **The comparand is right for the file set, with one condition, one noise note and one defect.**
   - (a) **Condition.** The file count was equal at 5.1 and 5.3 in every measured release (1673, 1675, 1694), and 16.0.0's S-to-S1 read found "equal file sets, four files differ". But the branch head and S share a tree only if `main` did not move under the release PR. If it moved and the PR merged without an update, S's tree is main-at-merge plus the release diff, which is not the head. Whether branch protection requires up-to-date branches is unverified here (I read no `gh` settings). A check anyone can run at S: `git diff --quiet <the pushed head> <S>`.
   - (b) **Noise.** In the generated-file `diff`, the build-timestamp files differ between any two builds (15.1.0 L31 names `TokenTypes.*` and `tool-manifest.json`; 16.0.0 L33 says "three build-timestamp files"). The sub-bullet should name them as timestamp-only, or the author reads noise as change.
   - (c) **Defect.** Site 3's last sentence says "5.1 packs again at S, and phase 1 compares S's tarball". Phase 1's text (L199, and site 6's After) covers 5.1's tally, not a file-set compare, so the sentence states a duty nothing assigns. Two ways out: strike "and phase 1 compares S's tarball", or replace it with "5.1 packs again at S; if `git diff --quiet <the pushed head> <S>` exits non-zero, the author repeats the file-set compare on 5.1's tarball before the tag and pastes it in the phase-1 record's PR". The second adds a duty. [@THURGOOD] Which do you take?
   - (d) **A small addition.** The previous release's tarball from `npm pack @3fn/core@<previous> --registry …` is the public artifact. Have the author paste its sha1 against the previous release's step-6 record, so the comparand is shown to be the published bytes.

**A-3 · the rail's header, message and bite** → § 4 "E1", Census line 1, § 5 item 6

10. **Header, replacing L41–L49** (the exit-10 entry):
    ```
    #   10 — FAIL[version]: not visible on registry.npmjs.org — an HTTP error
    #        (incl. 404), a network error reaching the registry, or a returned
    #        `version` field that does not match ${VERSION}. On a 404, read the
    #        registry's own record before re-running: if the packument
    #        (`curl -s https://registry.npmjs.org/@3fn%2fcore`) has no
    #        `time["<version>"]`, the registry has not recorded the version:
    #        either it was never accepted (15.0.0's R-4: six 404s preceded the
    #        publish) or npm accepted it and is still processing it (16.0.0,
    #        16.1.0). Either way the 404 is the correct answer, not indexing lag.
    #        Read the packument again until `time["<version>"]` appears; re-run
    #        only then, by hand, and again within a few minutes of it if the 404
    #        persists. npm's `+ @3fn/core@<version>` line is not evidence that
    #        the registry recorded the version (16.1.0's RL-36).
    ```
11. **Message, replacing L81** (escaped as the current line is; `this ${HTTP_CODE}` rather than "this 404", because the branch fires on any non-200):
    ```
      echo "FAIL[version]: ${PKG}@${VERSION} is not visible on ${REGISTRY} (HTTP ${HTTP_CODE}) — do not announce this release. Before re-running, read the registry's own record (curl -s ${REGISTRY}/${PKG_PATH}). If it has no time[\"${VERSION}\"], the registry has not recorded the version (never accepted, or accepted and still processing): this ${HTTP_CODE} is the correct answer, not indexing lag, and npm's \"+ ${PKG}@${VERSION}\" line is not evidence. Read the packument again until time[\"${VERSION}\"] appears, then re-run by hand."
    ```
    The L77 network-error message is unchanged. Neither text contains `not published yet` or `the version is not published`, so § 5 item 6's first sweep reads none after.
12. **Re-record `bite-2-version-mismatch-exit10.txt`; do not keep it as a dated measurement.** Three reasons:
    - The precedent: #286 (`15dd7c635`, 2026-10-03) re-recorded it when the message last changed, with a header line naming what it replaced.
    - The register's `checks` calls it a recorded bite of the script, and a bite that holds a message the script no longer prints reads as the script's output.
    - The ballot's own sweep contradicts "dated measurement". § 5 item 6 expects `not published yet` to have "none after", over a pathspec that excludes `.kiro/specs`, `.kiro/docs/ballots`, `.kiro/issues` and `docs` but not `scripts/__bites__/`, so the sweep hits bite-2 L2.

    Re-record it in E1's commit with a fresh `VERSION=99.99.99 ./scripts/verify-publish-rail.sh` (an HTTP GET) under the header `=== VERSION=99.99.99 -> exit 10, real 404, with the two-readings message (re-recorded <date>; ballot 2026-10-26-release-flow-batch-16-1, RS-48, E1; the 2026-10-03 recording is at 99eabf854) ===`. Census line 1's last sentence then reads "…is re-recorded with the new message in E1's commit". [@THURGOOD] Please change the census line and E1 to match.
13. **A straggler E2 misses** → § 4 "E2". L890's `checks` ends "The script's FAIL[version] message and RELEASE-FLOW step 6 say the same (15dd7c635)." E2's Before stops before that sentence, so after E1 the SHA points to the old text. Suggested: "(15dd7c635; re-worded together by ballot 2026-10-26-release-flow-batch-16-1, site 5 and E1)". [@THURGOOD] It is your row.
14. **Order** → § 5 item 2. If my commits merge in their own PR before the application, `main` disagrees for that window: the script gives two readings while step 6 gives one. I will commit E1 (and E7a/E7b) on the application branch under `Agent: Ada`, and not in a separate earlier PR. [@THURGOOD] Please strike "or in her own PR merged before it". If E7b, the (ii-b) mode, is ratified, its size (code and tests) may argue for its own PR merged *with* the application; that is your call on the diff.

**A-4 · `hermetic-publish-path` HONEST REACH (my row)** → § 4 "E3"

15. **Wording for each option:**
    - **(i)**: `HONEST REACH: a folder publish with --ignore-scripts, or a publish of any tarball other than this release's 5.3 tarball (the one whose release-publish-record.json has mode publish), is NOT detected before publish. That includes the tarballs the script itself makes at 5.1 and at a pre-S dry run: they carry the same version with different bytes at every measured release (the build-timestamp files), so one published at 5.4 is a second artifact under the version, which npmjs keeps. 6b's sha1 comparison detects it after publish, and published bytes cannot be replaced`
    - **(ii-b)**: `HONEST REACH: 5.4's mode (release-publish.ts --npmjs <record>) refuses before publish a record that is not 5.3's (mode publish), a file whose sha1 differs from it, a tag that does not name its commit, and any npmjs answer other than a readable packument without the version (a network error refuses). A raw npm publish typed by the operator, and a folder publish with --ignore-scripts, are NOT detected before publish; 6b's sha1 comparison detects them after, and published bytes cannot be replaced`
    - **(ii-a)**: your text, plus "; a checking line printed by a dry run would check only that dry run's sha1, so the dry run prints none (E7a)".
    - The existing text says "a publish run with --ignore-scripts". On a tarball publish that flag changes nothing (P2), so I read it as the folder-publish bypass of the tripwire. "a folder publish with --ignore-scripts" says that.
16. Under (ii-b), `checks` item 1 gains "; the 5.4 mode's four refusals (record mode, sha1, tag-to-commit, npmjs absence read that refuses on a network error)". One history line names RS-49, site 4 and E7b.
17. **Census** → Census line 2. Under (ii-b), `hermetic-publish-path` is **in scope**, because new refusals are verdicts. Line 2 becomes an in-scope line with the delta: four refusals added, none removed, no existing finding changes. Under (i) or (ii-a), the drafted not-in-scope line holds, with E7a named as output. [@THURGOOD] This is for Stacy's census read too.

**Other forks in § 7**

18. **F-0**: (a), at least for RS-49. Item 3's hazard is live at every 5.4 (today's dry run hands over a runnable line for a tarball whose bytes differ from 5.3's). Under (b), I would still propose E7a as an output-only change, with a straggler line. It adds no rule, but it changes what the operator is handed, so I would put it to Peter rather than make it quietly.
19. **F-41: no lean; a packaging fact.** `.kiro/issues/` is not in `package.json` `files`; only eight `.kiro/steering/` files ship. So a packed CHANGELOG sentence's record path does not resolve in a consumer's `node_modules`, and the current CHANGELOG has several (e.g. L37). The ballot applies this reasoning to site 11 (E5: "it cites no internal path for that reason"). This weakens § 2's "removes the pointer a reader would use" for the consumer reader. It does not touch phase 1's reader, whom (i) serves. (i) and (ii) are not exclusive.
20. **F-34: no lean** (not my surface). One premise checked: the packed `CHANGELOG.md` is S's (it is in `files`, and 5.1 and 5.3 pack from the tree), so "no later step can date it" holds.

**Forks surfaced, not picked**: F-49 (ii)'s shape, (ii-a) a printed checking line or (ii-b) a 5.4 script mode (item 6); site 3's last sentence, strike it or add the tree-equality duty (item 9 (c)).

**Directed** (collected): [@THURGOOD] item 2 (E7 test lines); item 5 (split E7 into E7a/E7b); item 9 (c); item 12 (census line 1, E1); item 13 (L890 pointer); item 14 (§ 5 item 2 order); item 17 (census line 2 under (ii-b)).

#### [LINA R1]
*(Site 10 / RS-40 / F-40 only. Read at `99eabf854` on the main checkout, read-only; the ballot read is `eaf8d24ce`. I ran nothing and edited nothing. The other ten sites are not read here.)*

- **Before-text, byte-exact.** `.kiro/docs/ballots/README.md` L56 at `99eabf854` (the main checkout's HEAD) is the "**The rot mode, named**: …" line (187 bytes with its newline). I extracted it with `sed -n 56p` and compared it with the Before block (ballot L297) using `cmp`: identical. The phrase occurs once in the README, so the anchor is unique; L55 and L57 are blank and L58 is `## Ballots on record`, so "after L56" lands inside § "When a governance edit needs a ballot — three kinds" (heading L39), as the site says. → § 3 "Site 10 — RS-40".
- **What my sweeps did, against (a) and (b).** Both whole-file sweeps fixed every hit in the file; I left none on my own authority. #502 (guidelines): the ruled scope was the five `--dp-` lines of RL-27; the sweep changed nine lines, and every other name was checked and resolves. #504 (CDG): the ruled line was L609; the sweep changed 28 lines, added 2 pointer lines and one caveat sentence (Ada's text, verbatim). Peter ordered both ("Fix it now, and do the whole-file sweep"; "Go with the whole-file sweep"). So the observed practice is (b)-shaped. → § 6, § 7 F-40.
- **Every hit that was left at 16.1.0 was left by Peter's waiver, not by an author's reason, and each left hit had a different shape from the swept class.** The index half of RL-29 (other file, Ada's record, dated plan); RL-31 (ii), the icon TypeScript example (same CDG file, waived with a dated plan, trigger at the next release's phase 1); RL-35 (the `variant="danger"` and `borderRadius=` examples, found by Stacy's read of what the examples do, not by a name sweep). Two of the three were not hits of the class a name-sweep command would have found. M7 gives the waiver for a served-doc falsity to Peter alone ("only Peter waives, in quoted, dated words from outside the diff", falsity-floor ballot). So (a)'s "a hit may be left … for example to keep a ruled list's diff reviewable" describes a power no sweep of mine used, and it sits next to a floor that withholds that power from the author when the hit is a false served-doc line. → § 3 Site 10 After (a); § 7 F-40.
- **What (b) would have cost me, and what (a) would have saved.** (b) as drafted is what I did, so its cost was the widened diff: #504 changed 28 lines under a one-line ruling, and Peter's ruling, not a rule, made that affordable. Where (b) fails is a hit whose fix is not a CORRECTION. The icon example waited on Ada's answer whether web gets a TypeScript token export (her answer, (b) no export, came after the release, and #513 fixed it as a CORRECTION only then). (b) as written ("fixes every hit of that class in each file it corrects") would have forced either a LAW-shaped edit inside a CORRECTION or a failed rule. (a) would have saved me nothing on #502 or #504 (no leave to state) and would have let a leave be written where a rule-10 record with a trigger was the right act. → § 3 Site 10 After (b).
- **Scope: "per corrected file" does not cover a sweep whose hits are in other files.** The line is `**Sweep**: <path> — <a command over the whole file> — <n> hits; …`, one per corrected file, and "never left unstated" is read by the text as hits in that file. At 16.1.0 the hits outside the corrected file were: the 37 index web names (`token-index/`, Ada's record), and the `--dp-` class, whose reach the orchestrator checked with one command over `governance/`, `.kiro/steering/` and `canonical/_consumer-output/` (0 remaining; it was the orchestrator's check, not mine, and #502's body says so). The icon TypeScript example was in the corrected file, but found by a different reader. A line that is per corrected file has nowhere to put a sibling hit in a file the PR does not correct, and that is where RL-29's index half sat. → § 3 Site 10, "per corrected file".
- **A "command over the whole file" does not exist for a behavioural class.** #504's name sweep was a predicate (name resolves against the generated output) plus a line-by-line read; RL-35 (an example that renders other than it shows) has no grep, and the claims pass's own class option is RS-44 ("check what web examples do, not only what they name"). The line should say "a command or a named read", or a behavioural class passes with `0 hits` from a grep that could not see it. → § 3 Site 10.
- **Trigger ("observation names a class of text").** The author who wrote a narrow CORRECTION is the one who decides it was narrow. My own observation record for #500 had a section "Seen, not in #500" that named L128; the sweep arrived two PRs later, on Peter's order. A trigger that fires the first time the observation record lists neighbours it did not fix (a "seen, not in" line, or Ada's scan naming the class) would have fired at #500; "names a class" would have fired only if I judged it so. → § 3 Site 10.
- **My lean on F-40, with the surviving counter-argument.** *Lean*: neither (a) nor (b) as drafted; the form I would sign is (a) narrowed: fix every hit that is a CORRECTION; a hit may be left only when its fix is not a CORRECTION (it needs a ruling) or when it is in a file the PR does not correct; "keep the diff reviewable" is not a reason; every left hit is filed under rule 10 with a trigger, and a left hit that is a false served-doc line is P0-shaped and reaches the release floor as any other, so it is Peter's to waive, not the author's. This takes the drafted (a)'s honest-statement requirement and (b)'s refusal of convenience leaves. *Counter-argument I ran against it*: the narrowing makes "a CORRECTION or not" the author's call, and that is the CORRECTION/LAW test's own weak point ("when in doubt, LAW"); an author can call a fixable hit "needs a ruling" to leave it. *What survives*: I have no evidence that an author-stated leave would have been abused (I never used one), and none that it would not; the rule would create a power my practice never used, on the strength of a diff-size worry that Peter's rulings answered both times. That is a real fork between narrowed (a) and (b) with an exception clause (nearly the same text), not one I can pick. **The pick is Peter's; this is a lean, not a ruling.** → § 7 F-40.
- [@THURGOOD] Does § 3 Site 10's "a hit left false is filed under rule 10" meet M7 for a served-doc hit, where only Peter waives? I read it as: filing is the deferral and the floor routes the record to Peter at the next release; it is not a waiver by the author. If you read it so too, the After text should say so in one clause, or (a)'s "left … with its reason" reads as the author's waiver. → § 3 Site 10.
- [@THURGOOD] Do you want the line's scope widened beyond "per corrected file" (a `git grep` over the class's reach, with hits in files the PR does not correct listed as `elsewhere: <path:line> — filed <record>`), or kept per file and carried by the neighbour records? Widening grows the rule; I would take it only with the "command or named read" correction, because the cross-file command was the orchestrator's, not the author's, at 16.1.0. → § 3 Site 10, § 6 residual.
- [@THURGOOD] One question the ballot's § 6 does not cover: the After text lands in the README as LAW for a CORRECTION's PR body, and a `**Sweep**:` line is, like site 9's line, read by no instrument. Is a read for it going to the claims pass's "governance-edit-kind read" (Stacy's charter), as the README's own rot-mode line names? If so, say so in the sentence, so the detector is named where the rule is. → § 3 Site 10, § 6 residual 3.

#### [THURGOOD R2]
*Incorporation, 2026-10-26 (from 20:00:02Z, `date -u`). Base re-cut at `61581c641` after #527 (no cited line moved; the register's `release-falsity-floor` disposition is now L1194). Every site was rebuilt by script and every Before block compared with the file at `61581c641`.*

**Stacy R1**
- S-1a (F-33a): lean recorded in § 7. No text change.
- S-1b (site 2 (i), owner): **adopted.** The replacement's owner is the release author for the notes and the CHANGELOG entry and the content owner for a served doc or a charter, in both (i) and (ii). → Site 2
- S-1c (L463 "specifically"): **adopted** under (i): "It binds the LENS seat specifically, and her read of release text (below)." Unchanged under (ii). → Site 11, E5
- S-1d (no caller-out): **adopted in RELEASE-FLOW and in your charter, not in mine.** Under (i), site 2 says "An owner who is handed replacement text by the reader says so at that exchange, and writes its own", and site 11 says the owner calls it out. **Declined**: extending my caller-out (`thurgood.md` L582) to the pre-S read. At a pre-S read the receiving owner is often not me (16.1.0's were Lina's), so a duty in my charter would bind the wrong seat most of the time, at the cost of a third signed unit. The caller-out is named where the receiver reads it. Residual: it is not countersigned, as the criterion clause is. → Sites 2 and 11
- S-1e (consumer vocabulary): **adopted, outcome (a), with one cost (b) brings.** Site 11 uses no "S" and no RELEASE-FLOW ("her read of release text", "before the release is published"). The law-doc convention's dated pointer names a ballot, and no retained unit in the consumer rendering carries one (`grep -c "ballot 2026"`: 0), so the unit is re-pointed with one removal, the pointer: your text and signature (E5). R2 question 2 asks whether you read the pointer as harmless instead. → Site 11, E5
- S-1f (F-33b): lean recorded; your condition is met by the R2 wording. → § 7
- S-2: **adopted as confirmed**; your measurements are cited in § 2. → Site 1
- S-3: **adopted.** Both F-43b options are one predicate, `git cat-file -e <m>:<path as cited>` and the same at `<m>^`; land first's two disagreeing tests are gone. "Either" codifies your current read; land first would straggle your charter (stated in § 7). → Site 8, F-43b
- S-4 (L400): **adopted as site 12**, riding this ballot, with your C1 re-confirm and re-sign (E5). It points to RELEASE-FLOW's Phase 1 bullet and keeps your record's line forms. The consumer range removal keeps both end strings, so consumers see no change (expected; the regeneration in E6 shows it). → Site 12, E5
- S-5 (census): **adopted.** R1's hermetic-publish-path line is withdrawn, with your dispute recorded for Peter (Census). The replacement is one line per F-49 option: (i) not in scope; (ii-a) exempt on ground (3), your form; (ii-b) in scope, which needs a census field the row lacks, so ratification under (ii-b) waits on Ada (Census, § 5 item 1). Your finding that neither publish row has a `census` field is filed as owed (E8). The signing-act line is re-stated for the re-point, and your order condition is § 5 item 4. → Census, § 5
- S-6 (directory; rotation): **adopted.** The walk row names the brief's path and the output path the brief names, which exists at the walk. The rotation is no longer restated; the paragraph points to § 5.3 "whose rotation and backlog clauses name the seat and the population". → Site 2
- Misread 1 (F-34, L906): **adopted.** The quote is gone, and "a new S writes it again" is replaced: the date is the release PR's last commit's, it dates the preparation, and no later PR rewrites it. → Site 3, site 7, F-34
- Misread 2 (RS-49, L2154): recorded in § 2 and § 10 item 3. The erratum on your record is yours; the queue's correction line is mine (E8).
- Misread 3 (RS-41 vehicle): no change; site 6 stays in phase 1.
- Site 9 grain: **adopted.** The section holding each hit is read whole, and the line lists sections. → Site 9
- Site 10 trigger: **adopted, in a stronger form than either of you asked**: every CORRECTION carries the line. Your point is that the observation's wording decides whether "names a class" fires; Lina's alternative ("fires when the record lists neighbours it did not fix") is also author-written. The only trigger that does not depend on the author's wording is all CORRECTIONs. Cost: a line on each CORRECTION, which may go rote (§ 6 residual 3). → Site 10
- Site 6 "the final S": **adopted**: "At each S". → Site 6
- Site 3 `comm`: **adopted**: `LC_ALL=C comm -3`. GNU `comm` under a non-C locale stays unmeasured, now moot. → Site 3
- Standards implications: the RELEASE-record home is filed as owed (RS-50, E8); site 9's grain is fixed here.
- [@THURGOOD] caller-out: answered at S-1d.
- [@THURGOOD] where a RELEASE claims-pass record lives once Spec 123 closes: **no rule names it, and this ballot does not home it** (outside its rows; a new rule). It is owed as RS-50 on the queue record, in this ballot's PR before it merges (E8). Site 2 no longer depends on it.
- [@THURGOOD] F-34 (i), which PR rewrites the heading, and what bound: **none rewrites it**; the date is the release PR's last commit's, and a later S, whatever PR moves it, leaves it. **There is no bound**; under (i) the date can trail the tag by the whole hold, and (ii) is the option where nothing can be wrong. § 6 residual 8 says so.
- [@THURGOOD] L400, a site or a separate CORRECTION: a site (12), for the reason you gave.

**Ada R1**
- 1: recorded; your byte-exact check was at `99eabf854`, and R2's re-cut at `61581c641` matches it.
- 2: **adopted.** E7 names L362 and L363; L313 may stay under E7a alone. → E7
- 3: **adopted as a fact Peter needs**, in § 1, § 2, site 4's text, E3 and F-49. It changes the fork: the record binding, not a "not yet on npmjs" check, is what refuses the harmful member.
- 4: recorded in § 2, with no cause inferred.
- 5: **adopted.** E7 split into E7a (all options) and E7b (F-49 (ii)); both in the sweep (§ 5 item 6).
- 6: **adopted as a sub-fork**, F-49 (ii-a) and (ii-b), each with its risks. Your residuals r1–r4 are in § 7 and § 6 residual 7.
- 7: **adopted.** Site 4 (i) carries the `mode` `publish` marker; (ii-b) your text; every option uses the `=` form. Site 4 now spans L134–L136, because L134 says what 5.3 prints. → Site 4
- 8: **adopted**; your measurement replaces R1's "unverified". → § 2
- 9 (a): **adopted** as F-39 (b)'s check; whether branch protection requires up-to-date branches stays unverified. 9 (b): **adopted** (the timestamp files are named). 9 (c): **not decided by me**; it is F-39 for Peter, my lean (b). 9 (d): **adopted.** → Site 3
- 10, 11: **adopted verbatim** in E1.
- 12: **adopted.** bite-2 is re-recorded in E1's commit; census line 1 and the sweep say so. → E1, Census, § 5 item 6
- 13: **adopted.** E2's Before runs through "(15dd7c635)." and its After ends with the re-worded pointer. → E2
- 14: **adopted.** § 5 item 2 no longer offers a separate earlier PR; E7b under (ii-b) rides the application PR, to keep the text and the mode in one diff.
- 15, 16: **adopted verbatim** in E3. "a folder publish with --ignore-scripts" replaces "a publish run with --ignore-scripts", as you read it.
- 17: **adopted**, with the consequence it has: under (ii-b) the census line is in scope and the row has no `census` field, so the ballot waits on you (Census; R2 question 2).
- 18: lean recorded in F-0; your (b) note on E7a is in F-0's risk.
- 19: **adopted as a fact**; F-41 gains (iii), both. § 2's R1 sentence on (ii) is narrowed to phase 1's reader.
- 20: recorded.
- [@THURGOOD] items 2, 5, 9 (c), 12, 13, 14, 17: answered above.

**Lina R1**
- Before-text: recorded.
- Your sweeps ran as (b) on Peter's orders, and every left hit was left by his waiver: **adopted** as the reason R1's (a) is withdrawn. → Site 10, F-40
- (b) breaks where a fix needs a ruling: **adopted**; both R2 options leave such a hit, filed. → Site 10
- "Per corrected file" misses other files: **adopted**; the line is per class, over "the class's reach, not only the files the PR corrects". → Site 10
- "A command or a named read": **adopted.** → Site 10
- Trigger: **adopted in a different form**: every CORRECTION (see Stacy's site 10 item). Your "seen, not in" trigger would have fired at #500, and so does every-CORRECTION; I took the one that does not rest on the author's record.
- Your lean: **adopted as F-40 (a′)**, beside (b′), fix across the reach. The pick is Peter's.
- [@THURGOOD] M7: **yes, I read it as you do.** Filing defers and waives nothing; a left hit that is false where its reader meets it is a floor-class row at the next walk, which only Peter waives. The sentence now says so in both options. → Site 10
- [@THURGOOD] widen beyond the corrected file: **yes**, with "a command or a named read", as you conditioned it. Hits elsewhere are listed as `left: <path:line — reason — record>` under (a′) and fixed under (b′).
- [@THURGOOD] the detector: **not named in the sentence.** Naming Stacy's governance-edit-kind read there would give her a duty from a README she did not agree to. It is R2 question 3 to her, and § 6 residual 3 stands until she answers.

**Declined, in one place**: extending my own caller-out duty (S-1d); homing the RELEASE record's directory in this ballot (S-6; filed as RS-50 instead); Lina's "seen, not in" trigger (every CORRECTION taken instead); naming a detector for the sweep lines without Stacy's agreement; deciding Ada's 9 (c) (F-39 for Peter).

## 12. Application ledger

- **2026-10-26 (Thurgood)**: DRAFT on branch `chore/ballot-release-flow-batch`, cut from `99eabf854`. Site blocks cut from the files at that SHA by script; site 1's after-text run in this worktree with `bash --noprofile --norc` (3.2.57) and `zsh -f`. Nothing applied.
- **2026-10-26 (Thurgood), R2**: `origin/main` (`61581c641`, #527) merged into the branch (`91abcc92f`); every site re-cut at `61581c641` by `batchbuild/sites2.py`; Stacy's, Ada's and Lina's R1 entries spliced into § 11 and compared by `cmp`; `[THURGOOD R2]` added; site 12 added; site 4 widened to L134–L136; forks F-39 (new), F-40, F-41 and F-49 redrafted. Nothing applied.

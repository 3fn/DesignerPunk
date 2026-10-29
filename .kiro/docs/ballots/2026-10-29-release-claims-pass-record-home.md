# Ballot Measure: where a RELEASE claims-pass record lives once Spec 123 closes (RS-50)

**Date**: 2026-10-29
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/hooks/RELEASE-FLOW.md`, and of the RS queue's standards side), at Peter's go, chat, relayed by the orchestrator, 2026-10-29, verbatim: *"Continue with the remaining items."* RS-50 is one of those items. Drafter's clock at the start of drafting: 2026-10-29T05:21:13Z (`date -u`); at R5: 2026-10-29T13:02:45Z.
**Status**: **RATIFIED (Peter, 2026-10-29)**, chat, relayed by the orchestrator. F-1, received before 2026-10-29T12:45:12Z (the orchestrator's clock), verbatim: *"Let's go (ii). This problem only gets worse the longer we let it persist, and we've got four specs on the horizon. If the scope necessary to complete this naturally falls into one of those specs, I'm fine with deferring it there so long as we capture it. Honest thoughts?"* F-2, received before 2026-10-29T12:59:53Z (the orchestrator's clock), verbatim: *"Thank you. Let's go (a) with the informed perspectives the agents provided, please."* The orchestrator's reading of "with the informed perspectives the agents provided" is recorded as applied (§ 6 item 3: the six mitigations, Thurgood's two departures from the orchestrator's wording, and R6's fixes). It is flagged: Peter may overturn it at the application PR, whose body repeats the reading.
**Ruled**:
- **F-1 (ii)**: the home is `.kiro/docs/releases/<v>/`, applied at the switch.
- **F-2 (a)**: the home is ruled now and applied when Spec 131's owners file gives the five writing seats access, with Spec 123's completion directory as the interim home. Every seat leaned (a): Stacy, Thurgood, Ada (who moved from (b)), Lina and Leonardo.
- No question remains open in this ballot. The capture record, `.kiro/issues/2026-10-29-release-records-home-switch.md`, is filed in this Status commit (site 3).
**Base**: `6f23bc6fe` (#549). Every Before block below was cut from that SHA by `git show 6f23bc6fe:<path> | sed -n <L>p`, and is byte-exact.
**Required reviewer**: **Stacy**. The record is hers, and she writes both phases into it. Site 2, now deferred to the switch PR, is her charter, and its acts are hers. She is also the census reader.
**Reviewers**:
- **Ada**: the first delegate under signing-act ballot § 5.3, whose output path this ballot fixes. She was the packaging seat for 15.0.0 to 16.0.0 and owned those releases' files grants; at 16.1.0 Thurgood was the release author and wrote the step-6 record (#509) (Ada R1).
- **Lina and Leonardo**: their reviews move to the switch PR. That is where write scope, the `removals` entry and the item split land (site 3, items 1, 2 and 4). This application touches neither seat's surface.
**Consulted**: Stacy — R1: leans (i); site 2 not applied under (i) (L417 incomplete, not false), its two acts kept for one edit of the unit's three unnamed homes (ARMING limbs, SYMPTOM's filename, the consumer overlay), filed by her under rule 10; under (ii)/(iv) site 2 owed, two acts, a `removals` entry, and an item text the rendering contains whole; census present and in-scope calls hold; the straggler sweep's false stop; site 1a's list not closed; R2: site 1b's file half decidable from git alone, its brief half needed three properties (the row names the path, "its terms" are § 5.3's three, one closed value for a brief on record nowhere), all met at R3; R3: the three properties met, the finding's addressee not decidable from the row, two forms offered ((b) picked at R4); F-2 consult: leaned (a), raised the separation-of-duties problem with any grant (she would audit her own grant compliance); Ada — R1: leans (i); 1b's brief check is uncheckable (her 16.1.0 brief was never committed), so the check lands on the file; addenda in the delegate file; the trio records missing from site 1a; L32 → L31; "the release author", not "Ada", at 16.1.0; the placeholder date is the application merge's squash date; R2: the brief clause right as written (item 1 of the trigger-(d) record carried all three terms, on `main` in #507 before her runs), "as at 16.1.0" names where the terms were recorded, not a row that existed then (cut from the law text at R3); F-2 consult: moved from (b) to (a), with three must-says for the next delegate (the interim path in full, a switch point that one release never straddles, the file check stays) and the condition that every scope or grant line names `.kiro/docs/releases/**` exactly; Lina — F-2 consult: leaned (a); unverified, whether Spec 131's owners file reaches Kiro's generated `allowedPaths` (site 3 item 2); Leonardo — F-2 consult: leaned (a), a dated fallback on the interim; the trio records keep their own home and grant (protocol § 8 L144)
**Class**: LAW. A home is a rule that two other rules key on: § 5.3 places the delegate's file "in the directory of the event's claims-pass record", and LIVENESS read 2 asks whether each RELEASE "produce[d] a committed record". So naming the home is not a CORRECTION. No referent names it today (§ 1). The ballot also gives the brief cell and the fallback walk duties, and those are requirements.
**Class option**: one paragraph in RELEASE-FLOW step 6 that names **every record a release produces at a fixed path**, in one place: the notes, the walk record, the claims pass with its delegate file, the onboarding-trio records and the step-6 record. The release's grant and findings records, the release PR body's pastes and its `CHANGELOG.md` entry are reached through the walk record's rows (Stacy R1, Ada R1). It addresses the class at the release grain (five homes, findable only by memory), not just the claims pass. Site 1a is that paragraph. Cost: the paragraph. The wider class, records that an event rather than a spec fires (ARMING limbs, SYMPTOM's filename, the consumer overlay's RELEASE line), is Stacy's own record, `.kiro/issues/2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md` (#555). Its fix rides the switch PR with site 2 (site 3 item 4), and is not legislated here.
**Amends** (one application PR, Peter-merged):
- `.kiro/hooks/RELEASE-FLOW.md` step 6: one paragraph added after L215, naming the interim home, the switch and the fallback (site 1a). Also one clause and one pointer in L45, RS-37's interim delegate row (site 1b). **LAW**.
- `.kiro/issues/2026-10-29-release-records-home-switch.md`: the capture record, filed in the Status commit under README rule 10 (site 3). This is a record, not law text.
- **Pre-declared here and applied by the switch PR**, a later PR that needs no new ballot:
  - site 1a's switch, whose After is drafted in § 4 (**EXECUTION** at that PR);
  - site 2, `canonical/agents/stacy.md` L417, with Stacy's three conditions and her #555 class fix composed in (site 3 item 4).
- **Not edited**:
  - Ballot `2026-10-01-signing-act-chain` § 5.3 (§ 3.5): its wording already follows the record's home.
  - No register row (§ 3.6).
  - `.kiro/issues/2026-10-26-release-16-1-standards-implications.md`, the RS-50 row's home, is held by another session. Its closing line is owed after the merge (§ 5, step 6).
  - No charter, no write scope, no grant: F-2 (a).

**Census** (ballots README § "Conventions", "Instrument census"; one line per presumptively in-scope instrument). Site 1 (`.kiro/hooks/RELEASE-FLOW.md`) is the only law site in this application. No registered check's command loads RELEASE-FLOW. Two rows' education homes cite it.
- `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh; row census: none) — site 1 adds a paragraph to step 6 and a clause to item 3a; it adds no command, and changes no rail text, exit code, assertion or verdict; the script reads the registry and $VERSION, never a claims-pass record`
- `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts; both scopes' census fields) — site 1 is text in the row's education home (steps 5–7) and adds nothing the script reads; the script decides from the commit's tree, its arguments and the registries; no decision in either scope changes`
- `**Census**: not in scope — signing-act-consistency (verify-signing-chain --ci; census mode --census-routed) — site 1 names the directory of § 5.3's delegate file at RELEASE; --audit writes no file and --ci reads no claims-pass record; no instrument code changes, so the census mode's committed and scratch-diff runs are identical by construction` *(a disclosure: site 1 is not presumptively in this row's scope, since its command does not load RELEASE-FLOW and its education names no RELEASE-FLOW path; Stacy R1)*
- `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts; census mode --census) — its scope is governance/*.md (the register excluded) and the eight .kiro/steering/*.md files package.json files[] names (check.ts L25–L26); no site edits either`
- **No line owed**:
  - `release-falsity-floor`, whose education cites RELEASE-FLOW Phase 1, has `checks: []`.
  - `scripts/owed-set.sh` and `scripts/issues-owned.sh` are named in no row's `checks`. Neither reads a RELEASE record's path: `owed-set.sh` keys on `<spec>/completion/claims-pass.md` exactly (L194), and `issues-owned.sh` prints `due:<v>` from the token alone (L147–L149). Site 3 is a `.kiro/issues/` record, which `issues-owned.sh` prints by its Trigger token. That is its input, not its rule.
  - **The site-2 lines are cut**: site 2 is not in this application. The switch PR carries site 2's census, cut at its own base (site 3 item 4).

**Cap**: one paragraph and one clause in RELEASE-FLOW, and one issue record.

**Retroactivity**: none. The four RELEASE records and the 16.1.0 delegate file stay where they are under every option. They are ledgers, and 38 files cite them by path (`git grep -l claims-pass-release` at the base, the records themselves excluded). Site 1a's "beside the records of 15.0.0 to 16.1.0" is the pointer (§ 6 item 3 (5)).

> **Conflicts, stated first.**
> - I own RELEASE-FLOW. I also wrote L45's interim, "the output path that brief names", which this ballot replaces (ballot `2026-10-26-release-flow-batch-16-1`, RS-37).
> - I write the delegate's brief under § 5.3, so the path I fix here is the one my own briefs must name. I also take the default finding when no brief is on record (site 1b).
> - I own the capture record (site 3) and am one of the five writing seats it asks access for.
> - Stacy's review and Peter's ruling are the checks.

---

## 1. The gap (RS-50)

- **Source**: Stacy's R1 on ballot `2026-10-26-release-flow-batch-16-1` (S-6 and her standards implications): "no rule names a RELEASE record's home: all four so far sit in Spec 123's completion directory only because 123 carried the releases, and nothing says where release 6's goes."
  - Filed as RS-50 in `.kiro/issues/2026-10-26-release-16-1-standards-implications.md`.
  - The row's disposition: "LAW via ballot; homes named, not picked."
  - The row's vehicle: "a small ballot of its own, before the next release's phase 1".
- **What the law says, at the base**:
  - Stacy's charter L417: "Every pass produces a committed record in the spec's completion directory." A RELEASE pass has no spec. Its population is the release delta (`git log <last-tag>..main`), which can span several specs or none.
  - RELEASE-FLOW L205: "The RELEASE claims pass runs in two phases, recorded in one file". It does not say which file.
  - RELEASE-FLOW L45, RS-37's interim delegate row: "the output path that brief names". It hands the path to the brief.
  - Signing-act ballot § 5.3: the delegate's file sits "in the directory of the event's claims-pass record". That is decidable only once the record has a home.
- **Where the records actually are**, all in `.kiro/specs/123-consumer-distribution/completion/`, each dated by the first-parent commit that added it:

  | File | Added |
  |---|---|
  | `claims-pass-release-15.0.0.md` | `439f3e8e3`, 2026-10-02 |
  | `claims-pass-release-15.1.0.md` | `1caddd21d`, 2026-10-13 |
  | `claims-pass.md` (123's CLOSEOUT) | `c7f40c98e`, 2026-10-15 |
  | `claims-pass-release-16.0.0.md` | `308a588f3`, 2026-10-16 |
  | `claims-pass-release-16.1.0.md` | `55c218cfd`, 2026-10-26 |
  | `delegate-audit-release-16.1.0-ada.md` | `3a628724f`, 2026-10-28 |

- **The breakage has already happened once, and nothing noticed it**:
  - Spec 123 closed when its CLOSEOUT record landed (`owed-set.sh` at the base prints `closed 123-consumer-distribution`).
  - Two releases, 16.0.0 and 16.1.0, then filed their passes in its directory anyway, by habit.
  - No reader failed, because each pass's author knew where the last one was.
- **Harm so far**: none. Every record landed in one place.
- **Harm owed**: the next release's pass and delegate file land wherever habit or the brief puts them. LIVENESS read 2 ("did RELEASE … produce a committed record?") is then answered from memory, which is the failure it exists to prevent.

## 2. Who reads the home

| # | Reader | What it needs from the home |
|---|---|---|
| R1 | **Stacy, RELEASE phase 1 and phase 2** (RELEASE-FLOW step 6). She writes phase 1; phase 2 is "a dated section appended to the same record"; addenda follow. | one fixed file per release, writable by her standing scope |
| R2 | **The delegate** (signing-act ballot § 5.3) and **Thurgood's brief**, which names "the output path" (§ 5.3, "The brief"; RELEASE-FLOW L45) | the record's directory, writable by the rotating delegate seat's standing scope (Ada, then Lina, then Leonardo) |
| R3 | **RELEASE-FLOW**: L45's walk row (the output path, then the file's path @ SHA); L205's "one file"; the step-6 `.txt`, which cites the phase-1 record by path (16.1.0's L17) | a path the text can name, with nothing left to the brief |
| R4 | **`scripts/issues-owned.sh`**, the `release:<v>:phase-1` and `release:next:phase-1` tokens | nothing: it prints `due:<v>` from the token alone (L147–L149), and no option changes its output. The walk resolves those rows against the phase-1 record (R1). |
| R5 | **`scripts/owed-set.sh`** | that no RELEASE record sits at `<spec>/completion/claims-pass.md` (L194, the CLOSEOUT key). Every option keeps the filename `claims-pass-release-<v>.md`. |
| R6 | **The monthly health check, LIVENESS read 2**: did RELEASE fire in the window, and did each produce a committed record with both phases | a path that can be listed per tag in the window, with no recollection needed |
| R7 | **Thurgood's composed-loop read** of every claims pass. The outcome-line count in `.kiro/issues/2026-10-24-composed-loop-outcome-lines-missing.md` globs `.kiro/specs/{123-consumer-distribution,127-completion-claims-integrity}/completion/claims-pass*.md`. | a glob that reaches every release's pass |
| R8 | **38 citing files**: claims passes, issue records, ballots, release notes and the 16.1.0 `.txt` | that the four existing paths never move |

## 3. The candidate homes

The **filename is the same under every option**, `claims-pass-release-<v>.md`, with the delegate's file `delegate-audit-release-<v>-<seat>.md` beside it:
- it continues the four existing records;
- one glob, `git ls-files '*claims-pass-release-*'`, then finds every release's pass, whatever the directory;
- it never equals `claims-pass.md`, the owed-set key.

Only the directory differs between the options.

### 3.1 (i) Spec 123's completion directory, fixed — the interim home (F-2 (a))

`.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, for every release, whatever specs its delta carries.

- **Why fixed, not "the releasing spec"**: the orchestrator's (i), "the releasing spec's `completion/`", breaks in two ways:
  - at the first release that no spec carries;
  - and wherever a delta carries several specs, because then "which spec" needs a judgment, and the home should be decidable without asking its author (Q5 bound 1's test, "decidable without consulting the author", applied to a path).

  A fixed path asks no judgment. Spec 123 built step 6's publish rail and the release recipe (ballots `2026-09-27-123-b-u1-publish-rail` and `2026-10-13-123-b-u4-release-recipe`), and it holds every RELEASE record so far.
- **Cost**: site 1 only. Nothing moves.
  - No write scope changes: Stacy, Ada, Lina and Leonardo all hold `.kiro/specs/**` standing.
  - No charter edit: site 2 is not applied under (i) (Stacy R1, S1).
  - **Zero seat acts.**
- **What it breaks**: nothing any reader in § 2 runs.
- **What it costs in meaning**:
  - A closed spec's completion directory keeps growing (243 top-level entries at the base, 256 files counting subdirectories; about two per release), with audits of deltas that are not 123's.
  - The release-record PRs touch `.kiro/specs/123-consumer-distribution/`, so `git log --first-parent -- .kiro/specs/123-consumer-distribution/`, Stacy's unit-anchor and delta method, keeps gaining merges that are not 123's work, and the `(123)` PR-title suffix used at 16.0.0 and 16.1.0 labels them as 123's. A SYMPTOM audit of 123 filters them out (Stacy R1, S2).
  - A SYMPTOM audit of 123 reads its completion docs by the `task-<N>…-completion.md` pattern (`scripts/completion-claims/completion-doc.ts` L61–L76), which these files do not match.
  - If a later ballot moves or archives 123's directory, this home moves with it, and that ballot has to say so. Such a ballot already has to sweep `claims-pass-release`, because 38 files cite the four records by path; site 1a is one more hit in that sweep, and the risk is that the mover reads it as a citation, not a rule (Stacy R1). Spec 131's outline proposes no move of spec or completion directories (Stacy R1, by keyword search).
- **R1–R8**:
  - R4, R5 and R8 are unchanged.
  - R7's glob already reaches it.
  - R6 becomes `git ls-files .kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md` per tag.
  - R1, R2 and R3 read one sentence.
- **If nothing is ratified before the next walk**, L45's interim lets the brief name the path, and habit puts it here. So (i) is also what happens without a ruling, and is the only option that needs no ruling to be safe.

### 3.2 (ii) A standing release directory — ruled (F-1), applied at the switch (F-2 (a))

`.kiro/docs/releases/<v>/claims-pass-release-<v>.md`, or `.kiro/releases/<v>/…`. The first follows the precedent of `.kiro/docs/civitas-health-checks/`, a standing record directory for an event that belongs to no spec. The second is a new root.

- **Cost**:
  - **No writing seat holds either path.** R1 and R2 need write scope for five seats: Stacy; Thurgood, who writes the composed-loop outcome line into every pass; and the delegate rotation, Ada, Lina and Leonardo. Either:
    - **standing**: five `canonical/agents/**` frontmatter edits. That is LAW, with every affected seat consulted (standing-write-scope ballot § 3). Each adds a `writeScope[…]` row to its seat's consumer dispositions, which needs that seat's signature: at least five first-sign acts, plus site 2's two Stacy acts. Then regeneration and the lock.
    - **or per release**: an issue-row grant (`.kiro/issues/README.md` rule 8) for Stacy and the delegate, filed at every release. Every release already files grant records (for 16.1.0: four, the files, notes, fix-1 and fix-2 grants; for each of 15.0.0 to 16.0.0, a files grant and a lock-refresh grant), so this adds two seats to work a release already does, not a new kind of work (Ada R1). It is still an act someone must remember at every release, and a missed delegate grant blocks the walk, which is § 8's trigger (d).
  - Site 2 is required, because L417's "spec's completion directory" becomes false for RELEASE: two Stacy acts, a `removals` entry and an item split (§ 4 site 2).
  - The four existing records stay in 123 (§ "Retroactivity"). History splits across two homes for good: every reader that walks release records (LIVENESS read 2, R7, Stacy's prior-release reads at each phase 1) carries two roots (Stacy R1).
  - **Timing**: L45 makes the delegate's file owed before phase 1, so under (ii) the delegate creates the release directory before the record it is named after exists (Stacy R1).
  - **F-2 ruled (a)**: neither standing scope nor a grant now. The access comes with Spec 131's owners file (site 3).
- **What it breaks**: nothing at runtime.
- **What it gains**: one directory per release, holding only that release's audit and the delegate's file, tied to no spec. Its meaning is the cleanest of the four options.

### 3.3 (iii) The summaries side, `docs/specs/<spec>/` (declined)

It has the "which spec" problem of the orchestrator's (i). It also inverts the two-document split: `docs/specs/` holds the concise summaries, and `.kiro/specs/<spec>/completion/` holds the internal records (Completion Documentation Guide § "Two-Document Workflow"). A claims pass is an internal ledger. No reviewer has argued for it, and no fork is put to Peter on it.

### 3.4 (iv) Beside the step-6 record, `docs/releases/<v>/claims-pass-release-<v>.md` — not taken

RS-50's record listed this one first, as its (a).

- **Cost**: the same write-scope cost as (ii). No seat holds `docs/releases/**` standing; the release author writes there under per-release grants (Ada for 15.0.0 to 16.0.0, Thurgood at 16.1.0). Site 2 is required.
- **What it breaks**:
  - **Independence**: the audit sits in the directory of the record it audits, written by the same release.
  - `docs/` is the tree the repo shows readers, and the claims pass is an internal ledger.
  - Phase 1 runs before the tag, so before step 6 creates the directory. Phase 1 would create it.
- **What it gains**: it is the cheapest to find, next to the notes and the rail record.

### 3.5 Signing-act ballot § 5.3: no edit under any option

§ 5.3 places the delegate's file "in the directory of the event's claims-pass record", so naming the record's home names the file's. The file name `delegate-audit-<event>-<seat>.md` already carries the version (16.1.0's is `delegate-audit-release-16.1.0-ada.md`).

The ratified ballot stays as it is. Its § 5.3 already carries a dated in-place amendment from a later ballot (sitting-2 S5; prior text at `3b84122c9`). If a later reading needs one here, it goes the same way: by a new ballot naming the section.

### 3.6 The register: no site

No row's `rule`, `checks`, owner, `check_state` or `education` changes.
- RELEASE-FLOW step 6 is already an education home of `publish-rail-guard` and `hermetic-publish-path`.
- `signing-act-consistency`'s education names "the claims-pass record of each MIDPOINT / CLOSEOUT / RELEASE" as its audit home and names no directory, so it stays true under every option.

A row for a path convention would be a second home for one sentence while Spec 131 is shrinking governance.


## 4. Edit sites (after ratification, one application PR, Peter-merged)

### Site 1a — `.kiro/hooks/RELEASE-FLOW.md` step 6, a paragraph after L215 (LAW)

**Anchor** (L215–L217 at `6f23bc6fe`, verbatim). The paragraph goes between L215 and the blank L216, with one blank line before it:

```
   - Until that line exists, the liveness reading is "read, not committed". (RS-9: on 15.0.0 the merged file differed from the one phase 2 read, and only the confirmation line caught it.)

7. **Announce last**: create the GitHub release (`gh release create v<version> --notes-file docs/releases/release-<version>.md`) **only after** step 6's rail PASS and a matching 6b record. Notes must not state a guard as applied before the step that applies it has run (R-3).
```

**After** (F-1 (ii), F-2 (a); inserted text only, three-space indent as step 6's other paragraphs):

```

   **Where a release's records live.** The RELEASE claims pass, both phases and every addendum, is one file, whatever specs the release delta carries. Its home is fixed for each release by the first `main at:` SHA its walk record pastes (item 3a), before anything is written, so no release's records straddle two directories:
   - **The interim home**, while this paragraph at that SHA still carries this bullet, is `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, beside the records of 15.0.0 to 16.1.0.
   - **The switch PR** is the one PR that replaces this paragraph's first sentence after the heading, and these three bullets, with the final sentence that ballot `2026-10-29-release-claims-pass-record-home` § 4 site 1a words. The PR that gives Stacy, Thurgood, Ada, Lina and Leonardo write access to `.kiro/docs/releases/**` (Spec 131's owners file; `.kiro/issues/2026-10-29-release-records-home-switch.md`) is the switch PR itself or an ancestor of it. From the switch PR's merge, the home is `.kiro/docs/releases/<v>/claims-pass-release-<v>.md`.
   - **The fallback**: at the walk of the second release whose walk record's first `main at:` SHA descends from that ballot's application merge, and at every later walk while this paragraph at that SHA still carries these bullets, the capture record's re-rule PR at that release carries one `**Open for Peter**:` line. That PR is record-only and the line holds it alone. The question is: standing write scope for the five seats now (that ballot's option (b)), or the interim home for this release. The walk record rows the capture record as `carried`, with the hold named. Phase 1 reports the open question. The release proceeds at the interim home. If the re-rule PR is still held at S, the capture record lapses at that S under rule 11, and the lapse is recorded.

   The delegate's file of ballot `2026-10-01-signing-act-chain` § 5.3 is `delegate-audit-release-<v>-<seat>.md`, in the same directory as the claims pass, with its addenda in it. The release's other records at fixed paths are:
   - its notes, `docs/releases/release-<v>.md` (Deriving item 3);
   - its walk record, `.kiro/issues/<date>-release-<v>-walk.md` (item 3a; in `archive/` after phase 1, rule 5);
   - its onboarding-trio records, `tests/onboarding-trio/records/<v>/` (item 6; the trio protocol § 8);
   - its step-6 record, `docs/releases/<v>/publish-verification.txt` (this step).

   Its grant and findings records are issue records. Its release PR body's pastes and its `CHANGELOG.md` entry are read where step 2 puts them. The walk record's rows reach each of them. *(added <application date> by ballot 2026-10-29-release-claims-pass-record-home, site 1a)*
```

**The switch's After**, pre-declared here, so the switch PR is **EXECUTION** of this ballot. It replaces the paragraph's opening sentence after the heading and the three bullets, keeping the heading and everything from "The delegate's file" on, and adds a pointer at the paragraph's end after site 1a's:

```
   **Where a release's records live.** The RELEASE claims pass, both phases and every addendum, is one file, `.kiro/docs/releases/<v>/claims-pass-release-<v>.md`, whatever specs the release delta carries, for every release whose walk record's first `main at:` SHA descends from the merge of the PR that made it the home; the records of earlier releases stay where they were written, in `.kiro/specs/123-consumer-distribution/completion/`.
```

The switch pointer, appended after site 1a's: `*(amended <switch date> by ballot 2026-10-29-release-claims-pass-record-home, site 1a, the switch; prior text at <the switch PR's base SHA>)*`.

*Why each part*:
- **"Fixed … by the first `main at:` SHA its walk record pastes"** answers Ada's must-say that one release never straddles two directories. It departs from the orchestrator's "the first release whose S descends from" on purpose. The delegate's file is owed before phase 1, and can land before S is cut. If the switch PR merged between the walk and S, an S-keyed switch would put that release's delegate file in the interim directory and its pass in the final one. The walk's `main at:` SHA precedes every write and is pasted in the walk record, so the directory is decidable from git. "First": a walk record can paste several `main at:` SHAs (16.1.0's pastes five, at L32, L77, L524, L618 and L805), and a switch merged between two of them would give two answers (Ada R5). This departure from the orchestrator's wording is recorded in § 6 item 3.
- **One switch PR, read from the law text alone** (Stacy R5, gap 1). The home test reads only RELEASE-FLOW at the first `main at:` SHA: `git show <main-at>:.kiro/hooks/RELEASE-FLOW.md | grep -cF '**The interim home**'` prints 1 for the interim home and 0 for the final one. Nothing has to find Spec 131's owners file, whose path exists nowhere yet. The access PR can come earlier; until the text switches, the interim holds.
- **The interim path in full** is Ada's first must-say: the delegate's file is `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-<v>-<seat>.md`, beside `claims-pass-release-<v>.md`.
- **The switch PR is named by what it does**, not by Spec 131's unit name. 131's owners file does not exist yet, and its path can't be tokened.
  - Naming the five seats and the exact glob `.kiro/docs/releases/**` gives the switch PR a test.
  - Thurgood is a writer: he writes the composed-loop outcome line into every pass, and any § 5.3 annotation beside it.
  - Ada's condition (a scope line names `.kiro/docs/releases/**`, never `.kiro/docs/**`) is site 3 item 1.
- **The fallback** is the seats' dated mitigation (§ 6 item 3 (1)). It lives in law, read at the walk, because the walk author must resolve the delegate row's directory (site 1b) and so reads this paragraph at every release.
  - **The count is decidable from git**: for each walk record (`.kiro/issues/{,archive/}*-release-*-walk.md`), run `git merge-base --is-ancestor <application merge> <first main-at>`. The count includes the walk being written, and counts walks, not tags (Stacy R5).
  - **It fires at the second walk and at every later one**, so the repeat comes from law, not from the wording of Peter's answer (Stacy R5, gap 2).
  - **It sits in the capture record's own re-rule PR, not the walk record's PR** (Stacy R5, the law conflict). The walk record lands "before the release branch" (item 3a), so holding it would hold the release. Item 3a's Peter-gated block also says "nothing here holds the merge" and is "never" written as `**Open for Peter**:` lines (ballot `2026-10-20-manual-records-routed-readers`, E3). A held record-only PR holds nothing but itself.
  - **If that PR is still held at S, the capture record lapses there under rule 11.** Its re-rule, a Trigger-line diff, has not merged. The lapse is a recorded consequence, and the release is unaffected.
  - *Counter, carried*: the fallback is read by a person, not printed by `issues-owned.sh`.
  - *Counter, carried*: a held record-only PR blocks nothing, so the interim is bounded only by Peter's attention (§ 7).
- **The delegate-file sentence** restates § 5.3's consequence at the release, so R2 reads one place. "With its addenda in it": at 16.1.0, the re-read under the trigger-(d) record's item 7 went into the delegate file as a dated addendum (Ada R1).
- **The other-records sentence** is the class option. It names the records at fixed paths, each already law where its item says, and claims no more (Stacy R1, Ada R1). The trio records keep their own home and grant (Leonardo). Stacy's routing records filed under rule 10 are routing artifacts, not a second home of the pass (Stacy R1, S2).
- **The pointer** is the `added` form, because RELEASE-FLOW is a bound path (ballots README L31, "Where the pointer is owed"). `<application date>` is replaced at application by the date of the application PR's merge, as its squash commit records it (§ 5 step 2). A literal placeholder left in place reads `pointer-missing` under `edit-kind-pointers.ts`'s `POINTER_RE` (Ada R1).

### Site 1b — `.kiro/hooks/RELEASE-FLOW.md` L45, RS-37's interim delegate row (LAW)

**Before** (L45 at `6f23bc6fe`, verbatim):

```
   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat, the path of Thurgood's brief, and the output path that brief names. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*
```

**After**:

```
   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat; the brief (§ 5.3: Thurgood's, or the orchestrator's when Thurgood's seat cannot write it), as the path of one committed file that states § 5.3's three terms, the PR population, the command and the output path (the brief itself, or the issue record whose item states them), or `brief: none on record` when no committed file states them, which is a finding on Thurgood, the seat § 5.3 names to write the brief, unless a committed line names the orchestrator as the briefer, and never on the delegate; and the output path, which is § 5.3's file in the RELEASE record's directory (step 6, "Where a release's records live"); a file committed at any other path does not discharge the row. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-37)* *(amended <application date> by ballot 2026-10-29-release-claims-pass-record-home, site 1b; prior text at `6f23bc6fe`)*
```

*Why*:
- RS-50's record calls this clause the interim ("the walk row name[s] the output path Thurgood's brief names, so the next walk does not wait on this row"). Once the home is named, the brief copies the law instead of being the law.
- **The check lands on the file, not the brief** (Ada R1, A1). A brief that is never committed can name any path, and no reader can tell; Ada's 16.1.0 brief was never committed (her file's header; #514's body), and its output path is on record only in `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md` item 1. A file at the wrong path is visible in git.
- **The brief cell** replaces "the path of Thurgood's brief", which at 16.1.0 named nothing (Ada R1). It meets Stacy's three properties (Stacy R2):
  - it names one committed path;
  - "states" is tested against § 5.3's three terms;
  - `brief: none on record` is its one closed value for a brief given nowhere a reader can find it.
- **At 16.1.0 the cell would read** `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md`, whose item 1 states all three terms and was on `main` (#507) before Ada's runs (Ada R2). That walk had no delegate row, because RS-37 added it on 2026-10-29.
- **`brief: none on record` is a finding on Thurgood by default, and stops nothing.** The delegate cannot commit someone else's brief, and the walk can be done from law and the record (Ada R2). The finding goes to Thurgood, the seat § 5.3 names to write the brief, unless a committed line names the orchestrator as the briefer (§ 5.3 lets it write the brief; Stacy R2, Low). The addressee is then decidable from git (Stacy R3; THURGOOD R4).
- RS-37's pointer stays, and the amendment adds a second pointer beside it, as L205 carries two.


### Site 2 — `canonical/agents/stacy.md` L417, the first sentence (LAW, ratified here; applied by the switch PR, not by this application)

**Before** (L417 at `6f23bc6fe`, the first sentence; the rest of the line is unchanged):

```
Every pass produces a committed record in the spec's completion directory.
```

The full line at the base, for the byte check:

```
Every pass produces a committed record in the spec's completion directory. **Path convention, load-bearing**: CLOSEOUT's record is `.kiro/specs/<spec>/completion/claims-pass.md` — the exact filename the owed-set predicate keys on. **A MIDPOINT record is `completion/claims-pass-midpoint.md`, NEVER `claims-pass.md`** — a midpoint record at the closeout path would silently discharge `closeout-owed(<spec>)` with a pass covering only part of the spec (the first-instance collision, caught and ruled at 127's tasks round). Three required sections plus the standing duties:
```

**After** (the first sentence only):

```
Every pass produces a committed record in the spec's completion directory, except a RELEASE pass, whose record's home `.kiro/hooks/RELEASE-FLOW.md` step 6 names.
```

- **Why not in this application**: L417 stays true during the interim, because the record sits in a spec's completion directory. Stacy reads it as incomplete, not false (Stacy R1). The base sentence becomes false at the switch.
- **When it lands: with whichever comes first, the switch PR or Stacy's #555 class fix** (Stacy R5).
  - The After is true in both phases ("whose record's home `.kiro/hooks/RELEASE-FLOW.md` step 6 names" holds whether step 6 names the interim home or the final one), so it need not wait for the switch.
  - Either way, Stacy's acts on the unit are spent once, together with her class fix (SYMPTOM's filename, the consumer overlay's RELEASE line).
  - If a SYMPTOM event comes first, the class fix goes as its own ballot with this site composed in, because the SYMPTOM-filename collision should not wait on Spec 131.
  - Where her class fix's ballot rewrites L417, its text governs, and this After is composed into it under the README's edit discipline. Stacy reads that composition as the text's owner.
  - If Spec 131 has removed the signing acts by then, they follow 131's form.
- **No pointer**: charters carry none (ballots README L31). The commit that changes this line names this ballot in its message.
- **Stacy's three conditions, binding on the switch PR** (Stacy R1):
  - **two acts**: re-confirm `#the-claims-pass-record-claims-passmd-the-template`, then re-sign it;
  - **a `removals` entry**, my authoring before her re-sign, because the overlay keeps the clause-free sentence. The nearest precedent is the owed-set unit's row, which records its dropped `.kiro/hooks/RELEASE-FLOW.md` as `subtraction-1`;
  - **the `record-committed` item's `text` must be a span the consumer rendering contains whole.** The C18 floor credits an item only when its complete `text` occurs in the rendered unit (`triviality.ts` header). **The form Stacy would sign** (Stacy R5):
    - `record-committed` keeps `Every pass produces a committed record in the spec's completion directory`, the existing text with no final period. That is a verbatim substring of the new canonical sentence, which `operative-sets.ts` L123 requires, and it occurs whole at overlay L87.
    - The RELEASE clause becomes its own `obligation` item, whose `text` is the clause's exact span.
    - A `removals` entry carries the same text, with `cites: subtraction-1`.
    - This is my authoring and Lina's model to check.
- **The follow-ons it touches, for the switch PR's grant** (all EXECUTION; none of these files is a governance path):
  - **the operative item**, `canonical/operative-sets/stacy.yaml` L548–L551 at `6f23bc6fe`:

```
      - id: record-committed
        kind: obligation
        label: "Every pass is a committed record"
        text: "Every pass produces a committed record in the spec's completion directory."
```

  - **the overlay pin**, `canonical/profiles/consumer/stacy.overlay.md` L84 at `6f23bc6fe`, which moves to the new unit hash while the overlay's text stays unchanged:

```
## @unit #the-claims-pass-record-claims-passmd-the-template @ sha256:3c2a1c1fe5b77b2b69d2f6d60ec50aa5f6126d23380911bd38b33a8f9bb0db04
```

  - **the dispositions row's `removals`**;
  - **regeneration and `canonical/generated.lock`**. The expected `git diff --stat <base> -- canonical/_consumer-output/` is empty apart from attribution files.

  Lina reviews the `removals` entry and the item split at whichever PR carries site 2.

### Site 3 — the capture record, `.kiro/issues/2026-10-29-release-records-home-switch.md` (filed in the Status commit, README rule 10; Thurgood's standing scope)

Peter's F-1 condition is *"so long as we capture it"*. This record is the capture. Its text, to be filed as written (the Status commit fills `<Status date>`):

```markdown
# The RELEASE records' final home: the switch to `.kiro/docs/releases/<v>/` when Spec 131's owners file gives the five writing seats access

**Date**: <Status date>
**Owner**: Thurgood (owner of `.kiro/hooks/RELEASE-FLOW.md` and author of the ballot that names the switch). Interested: Stacy (the RELEASE claims-pass record is hers; site 2 is her charter unit, and its acts are hers).
**Trigger**: `release:next:phase-1` — the next release's walk reads this record. Its work rides Spec 131's owners file, so rule 1 gives it this token, not the vehicle's. Start condition, in prose: when Spec 131's requirements are written (`.kiro/specs/131-governance-simplification/requirements.md`), they take this record in or leave it out with a reason.
**Class**: P2 obligation (record) · owed-act
**Lapse**: rule 11. At a release's S, the record has lapsed unless an ancestor of S closed it or re-ruled it, a re-rule being a change to its Trigger line in a diff carrying a dated reason and authority.
- **At each release before the switch**, the owner re-rules it in one record-only PR, by a Trigger-line diff: read-through prose with the date, the interim home and the ballot named, the pattern of `.kiro/issues/2026-10-25-arming-read-class-option-fork.md`.
- **At the second release's walk after the ballot's application, and at every later walk before the switch**, that PR also carries RELEASE-FLOW step 6's fallback question ("Where a release's records live") as one `**Open for Peter**:` line, with option (b) named: standing write scope over `.kiro/docs/releases/**` for the five seats, now. The line holds that PR alone. If it is still held at S, the record lapses there, and the lapse is recorded.
- **If Spec 131's requirements leave this record out**, it goes to Peter at that commit, with (b) named.
- With a re-rule at every release, rule 11's escalation never fires. The fallback is the only route to Peter (Stacy R5).
**Source**: ballot `.kiro/docs/ballots/2026-10-29-release-claims-pass-record-home.md` (RS-50): F-1 (ii) and F-2 (a), Peter, 2026-10-29, verbatim in that ballot's Status line.
**Consulted**: Stacy, Ada, Lina, Leonardo — their F-2 reads, in that ballot's § 6 item 3.

---

## Items (each closes at the switch PR's merge, or by a dated re-rule)

1. **Write access** to `.kiro/docs/releases/**`, named exactly so (never `.kiro/docs/**`, which would sweep in `.kiro/docs/ballots/`; Ada's condition), for Stacy, Thurgood and the delegate rotation Ada, Lina and Leonardo, through Spec 131's owners file. Until it lands, no seat writes there.
2. **Kiro enforcement** (Lina, unverified): whether Spec 131's owners file reaches Kiro's generated `allowedPaths`, which are generated from `writeScope` today (Ada, verified). The starting point is Spec 131's outline L232: OWNERS lands "via a new source in `source.ts`/`schema.ts` rendered through `adapters/cc.ts` and `adapters/kiro.ts`" (Stacy R5); whether that reaches `allowedPaths` is still unverified. Spec 131's requirements answer it. If they do not, (a) defers Kiro-side enforcement of item 1 with no end date, and they say so.
3. **The switch PR**: the one PR that applies the switch's After (the ballot's § 4 site 1a) to RELEASE-FLOW step 6's paragraph. The PR that lands item 1 is that PR or an ancestor of it. This is pre-declared EXECUTION.
4. **Stacy's charter, L417** (the ballot's § 4 site 2), in whichever lands first, the switch PR or her class fix: two acts, a `removals` entry, and the `record-committed` item's text as a span the rendering contains whole (the form in the ballot's § 4 site 2). It is composed with her class fix, `.kiro/issues/2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md` (#555), so the unit is edited once.
5. **The second glob root** in the composed-loop outcome count (`.kiro/issues/2026-10-24-composed-loop-outcome-lines-missing.md`, the count command), in the switch PR or the first record PR after it.
```

*Why this shape*:
- **The token is `release:next:phase-1`, not `path:` on 131's requirements.** That departs from the brief I was given, on purpose. Rule 1: "a P0, P1 or P2 record that would ride another change takes `release:next:phase-1`". This record's close is the switch PR, which rides 131's owners file. Stacy's #555 record took the same token for the same reason. 131's requirements are kept as the start condition, in prose.
- **The token also answers the stall case** (131 paused before requirements), which a `path:` token could not see:
  - every release's walk rows the record (the 3a due-rows grep, and `issues-owned.sh` prints `due:next`);
  - rule 11 forces a Trigger-line re-rule or a lapse at each S;
  - site 1a's fallback forces Peter's answer at the second release.
- *Counter, carried*: a re-rule line at every release while 131 is paused is a recurring act on the owner (one dated line per release). It also puts this record in the walk's batch of carried rows until the switch. I accept both: they are the visibility Peter's "so long as we capture it" asks for.

## 5. Application (after the Status commit)

1. **The Status commit** (record-first): it carries `**Status**: **RATIFIED (Peter, <date>)**` with his F-1 and F-2 words and their clock bounds, the orchestrator's reading of § 6 item 3 as recorded, and the README roll entry. It also files site 3's record, as written, under rule 10.
2. **Thurgood, the application PR** (branch `chore/apply-release-claims-pass-record-home`), in one commit: sites 1a and 1b.
   - `<application date>` in both is the date of the application PR's merge, as its squash commit records it (the rule #491 and #550 followed; Ada R1, A5).
   - The commit message names this ballot.
3. **Seat acts: zero.** No charter, operative set, overlay or dispositions file changes.
4. **No regeneration and no lock refresh.** `.kiro/hooks/RELEASE-FLOW.md` is outside the generator's input closure: `INPUT_CLOSURE_ROOTS` is `canonical`, `skills`, `tools/agent-generator`, the three MCP `src` trees, `governance` and `.kiro/steering`, and `INPUT_CLOSURE_FILES` is `package.json` and `.kiro/hooks/complete-task.sh` (`tools/agent-generator/diff-guard.ts` L62–L72). The precedent is `0baeadda8`, which changed RELEASE-FLOW 5.3 without touching `canonical/generated.lock`. Every RELEASE-FLOW commit that did move the lock also changed a `governance/` or `canonical/` file. If the PR's `122-diff-guard` reads otherwise, the application stops and reports.
5. **Checks**, each pasted in the PR body with its result:
   - `npm test`;
   - `npm run test:scripts`;
   - `npm run -s check:section-citations`;
   - `node scripts/validate-steering-metadata.js`;
   - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: RELEASE-FLOW reads `ok`. The check gives one verdict per file, and any added line with a dated pointer satisfies it. Site 1b's rewritten L45 keeps RS-37's pointer, so the `ok` does not prove site 1b's new pointer. That pointer is read by hand (Stacy R1).
6. **Straggler sweep**, case-sensitive, over `.kiro/hooks/RELEASE-FLOW.md canonical/agents canonical/profiles/consumer .kiro/steering governance`. The hits expected after the edit:
   - `the output path that brief names`: none.
   - `Where a release's records live`: RELEASE-FLOW only (sites 1a and 1b).
   - `.kiro/docs/releases`: RELEASE-FLOW site 1a only.
   - `claims-pass-release-`: RELEASE-FLOW site 1a (the interim path), plus `governance/classification-map.md` L945. L945 is a pre-existing `publish-rail-guard` history entry citing `completion/claims-pass-release-15.1.0.md` (RL-7, #353), a ledger citation left as it is. At the base the sweep's roots give `governance/classification-map.md:1` and RELEASE-FLOW 0 (Stacy R1).

   Any other hit stops the application.
7. **Owed after merge**:
   - A dated vehicle-and-close line on RS-50 in `.kiro/issues/2026-10-26-release-16-1-standards-implications.md`, by that record's holder.
   - The next delegate brief names the interim path in full (site 1a; Ada's must-say).
   - No `rebuild_index`: no site is in `governance/`, the docs MCP's corpus (`mcp-server/src/index.ts` L61).
8. **The PR body carries**:
   - `**Edit kind**: .kiro/hooks/RELEASE-FLOW.md — LAW (.kiro/docs/ballots/2026-10-29-release-claims-pass-record-home.md)`;
   - the `**Consulted**:` line;
   - the census lines, re-run at the PR's base.

   No grant is needed: RELEASE-FLOW is Thurgood's, and `.kiro/issues/**` is his standing scope.

**The switch PR**, later, outside this application. It carries:
- `**Edit kind**: .kiro/hooks/RELEASE-FLOW.md — EXECUTION (.kiro/docs/ballots/2026-10-29-release-claims-pass-record-home.md § 4 site 1a, the switch)`;
- `**Edit kind**: canonical/agents/stacy.md — EXECUTION (… § 4 site 2)`, or the class-fix ballot's kind where that ballot's text governs.

Site 2's census, Stacy's acts, the `removals` entry, the item split, regeneration and the lock all land there, under that PR's own grant or Spec 131's owners file, with Lina's and Leonardo's reviews.

## 6. Forks for Peter — ruled, and the reading recorded

1. **F-1, the home: ruled (ii)** (Peter, before 2026-10-29T12:45:12Z, verbatim in the Status line). It is applied at the switch, not by this application. (i), Spec 123's completion directory, is **the interim home**, not the home. (iii) `docs/specs/` was declined (§ 3.3). (iv) `docs/releases/<v>/` was not taken.
2. **F-2, the access: ruled (a)** (Peter, before 2026-10-29T12:59:53Z): the home is ruled now and applied when Spec 131's owners file gives the five writing seats access. The two options not taken:
   - **(b) not taken**: standing `.kiro/docs/releases/**` write scope now for the five seats. That was five to ten acts once; it works on Kiro; and it builds rows Spec 131 deletes (131's outline L232). It stays the named remedy at the fallback (site 1a) and at the record's lapse (site 3).
   - **(c) not taken**: a rule-8 multi-PR release grant. That is LAW 131 retires; it has no Kiro effect (Ada verified that `allowedPaths` are generated from `writeScope`); and Stacy would audit her own grant compliance.
3. **The orchestrator's reading of "with the informed perspectives the agents provided"**: adopt the seats' mitigations as they were presented to Peter. Each one is applied here as stated:
   1. **A dated fallback on the interim** (Thurgood, Ada, Leonardo; the orchestrator recommended two releases): site 1a's fallback, at the walk of the second release after the application merge and at every later walk before the switch. There, (b) is put to Peter as an Open-for-Peter line, in the capture record's record-only re-rule PR, which holds nothing else (R6; Stacy R5). **Departure, for confirmation**: the orchestrator worded the switch point as "the first release whose S descends from" the access PR. Site 1a fixes it at the first `main at:` SHA the walk record pastes instead, so one release never straddles two directories (Ada's must-say; § 4 site 1a, "Why").
   2. **Five writers**, not four: Stacy, Thurgood, Ada, Lina and Leonardo (§ 3.2 corrected).
   3. **Lina's Kiro question** as a capture-record item that 131's requirements must answer (site 3 item 2).
   4. **The directory** is `.kiro/docs/releases/<v>/`. Every scope or grant line names `.kiro/docs/releases/**` exactly, never `.kiro/docs/**` (Ada's condition; site 3 item 1).
   5. **The four existing records stay** where they are. Site 1a's "beside the records of 15.0.0 to 16.1.0", and the switch's "the records of earlier releases stay where they were written", are the pointer.
   6. **The trio records stay** at `tests/onboarding-trio/records/<v>/`, under their own grant (Leonardo; protocol § 8 L144).

   **One more departure, for confirmation**: the orchestrator proposed the capture record's trigger as `path:.kiro/specs/131-governance-simplification/requirements.md`. Site 3 uses `release:next:phase-1`, with 131's requirements as a prose start condition. Rule 1 gives that token to a P2 record that rides another change, and it is the token that also catches a stall before 131's requirements (site 3, "Why this shape").

**Recorded, not asked** (the Status line): § 6 item 3, the orchestrator's reading of "with the informed perspectives the agents provided", is applied as written above. That covers the six mitigations; the two departures from the orchestrator's wording (the switch point fixed at the first `main at:` SHA the walk record pastes, not at S; the capture record's trigger `release:next:phase-1`, not `path:` on Spec 131's requirements); and R6's fixes (one switch PR read from the law text; the fallback recurs, and sits in the capture record's own record-only re-rule PR; Trigger-line re-rules; site 2's signed item form). Peter may overturn any part of it at the application PR, whose body repeats this reading.

## 7. Ruling, counter-argument (fold-back applied), residual

**Ruled**: F-1 (ii) and F-2 (a). Sites 1a and 1b are applied now, with Spec 123's directory as the interim home and a named switch and fallback. Site 2 and the access move to the switch PR (site 3).

**Counter-arguments, run against the ruled shape, and what they changed**:
- **(1) "A carrier-dependent home ('the releasing spec') is undecidable."** This made both homes **fixed paths**, and keyed the switch to a named PR, not to a spec's closure.
- **(2) "A switch can split one release across two directories."** This fixed the home per release at the walk record's first `main at:` SHA, which precedes every write, and made the switch a single PR read from the law text alone (R6).
- **(3) "Deferring to a paused spec makes the interim permanent by default."** This added the dated fallback in law (site 1a) and gave the capture record a token that the walk reads every release (site 3).
- **(4) "Site 2 is cheap honesty now."** Stacy moved off this herself: the unit has two more unnamed homes, so site 2 waits for one edit of the class, at the switch (Stacy R1).

**What survives**:
- **Peter's own reason**, "this problem only gets worse the longer we let it persist": under (a), about two files per release keep landing in a closed spec's directory for as long as 131 stays paused. The fallback bounds that at two releases before he is asked, not before it ends.
- **The interim is bounded only by Peter's attention** (Stacy R5). The fallback holds a record-only PR that blocks nothing, so nothing makes the question painful enough to answer, and its read is a person's, not a printed one. That is the right trade for a release, but it means the bound is a person's, not a mechanism's. The one mechanical trace is a recorded lapse at each S while the question waits.
- **The interim path costs meaning**: `git log` of 123's directory keeps gaining merges that are not 123's work, and the `(123)` PR-title suffix labels them as 123's (Stacy R1).
- **Kiro enforcement** of the final path waits on 131 and may have no end date (site 3 item 2; Lina, unverified).
- **L417 during the interim** does not, on its own, tell a reader which spec's directory. The guard is Stacy's habit of reading step 6 at every RELEASE (Stacy R1).

## 8. Review round record

Questions for R1:
- **Stacy (required)**:
  - **S1**: Under F-1 (i), do you want site 2 (two acts), or is your RELEASE row's deference to RELEASE-FLOW enough for L417? If you want it, does the dropped clause need its own `removals` entry, and does `record-committed` still survive in your assent?
  - **S2**: Is site 1a's "both phases and every addendum, … one file" your record's shape? Does anything you append (a merge-confirmation line in a follow-up PR, an erratum) belong elsewhere?
  - **S3**: Census: read the lines above (presence, grammar, the in-scope calls). Is any edit site in scope of an instrument I have not named?
  - **S4**: The wider class, records that an event rather than a spec fires. ARMING reads sometimes land as files: `arming-read-hermetic-publish-path.md` sits in 123's completion directory, added at `75bb350e5`. Do they have the same gap, and is it a finding to file under rule 10? Same question for your consumer overlay's L87: a consumer's RELEASE pass has no named home either. I have filed neither, because whether they are gaps is your reading.
  - **S5**: F-1: your lean, with your reason.
- **Ada**:
  - **A1**: As the first delegate: is site 1a's path, and site 1b's "the brief names that path and no other", what your seat needs to write the file without asking?
  - **A2**: As the packaging seat: does the other-records sentence say each record's home truly (notes, walk, step-6 `.txt`)?
  - **A3**: F-1: your lean, with your reason.
- **Lina** (only if site 2 is applied, or F-1 is (ii) or (iv)):
  - **L1**: For a `re-pointed` unit whose overlay keeps a sentence that the canonical unit extends, is a `removals` entry owed? Does any of your checks (`checkOverlayPins`, the dispositions model) refuse an overlay whose text omits a canonical clause with no `removals` entry?
- **Leonardo** (only under F-1 (ii) or (iv)): your write scope would gain the path, at the extra round.

#### [STACY R1]

*Read at `c8176eabe` (the DRAFT) against base `6f23bc6fe`, in worktree `wt-rs50`, 2026-10-29. Every `(verified)` below is a command I ran at the base. I read the base with `git show 6f23bc6fe:<path>`, `git ls-tree`, `git log --first-parent`, and `./scripts/owed-set.sh` run in the worktree. I wrote nothing and committed nothing. My answers to S1–S5 come first, then the findings on the text.*

- **S5 / F-1: my lean is (i), the fixed path in 123's completion directory, with site 2 NOT applied (S1).** I write the record and I run the RELEASE read. → § 6 F-1, § 7
  - **(i) is the only option where every reader I depend on works with no new act.** (verified)
    - R5: `owed-set.sh` L194 tests `completion/claims-pass.md` before it tests anything else, so 123 stays `closed` however many `claims-pass-release-*` files land beside it. My run printed `closed	123-consumer-distribution	completion/claims-pass.md present`, and the row-sum adds up: 0 + 2 + 1 + 5 + 4 = 12 rows.
    - R4: `issues-owned.sh` L147–L149 turns `release:<v>:phase-1` into `due:<v>` from the token alone.
    - R7: the outcome-line glob in `.kiro/issues/2026-10-24-composed-loop-outcome-lines-missing.md` L10 already reaches 123's directory. § 5.3 forbids a delegate filename that begins `claims-pass` (signing-act ballot L184), so the glob never picks up a delegate file.
    - Write scope: Stacy, Ada, Lina and Leonardo all hold `.kiro/specs/**` standing. None of them holds `.kiro/docs/**` or `docs/releases/**` (each charter's frontmatter `writeScope`).
  - **Timing favours a directory that already exists.** L45 makes the delegate audit owed before phase 1, so the delegate's file lands before my record does. § 5.3's "the directory of the event's claims-pass record" can then only be read from the rule, never from a file. Under (i) that directory exists. Under (ii) or (iv), the delegate would create the release directory before the record it is named after exists. This is a reason to prefer (i), and it is a reason site 1b points to the rule and not to the file. That is right as drafted. (verified: L45 at the base)
  - **(iv) is the weakest option, for the reason § 3.4 gives.** The audit would sit in the directory of the step-6 record it audits, and phase 1 would create that directory before the tag. I agree with declining it in substance, even though it stays on the ballot as an option.
  - **(ii) has the cleanest meaning, and I do not dismiss it.** Its cost is not only acts. History would split across two roots, so every reader I own that walks release records (LIVENESS read 2, R7, my own prior-release reads at each phase 1) would carry two roots for good. The four ledgers stay where they are under every option. That cost is permanent; the act cost is paid once.
  - **The coupling residual is weaker than § 7 states, but it is not zero.** 38 files cite the four records by path (verified: `git grep -l claims-pass-release` at the base gives 42, minus the 4 records). So any ballot that moves 123's directory already has to sweep `claims-pass-release`, and site 1a would be one more hit in that sweep. What survives: a mover could re-home the ledgers and miss that one hit is a rule, not a citation. Spec 131's outline proposes no move of spec or completion directories (verified, by grep of `design-outline.md` for archiv / completion/ / move; a keyword search, not a full read).

- **S1 / site 2: under (i), I do not want it. Leave L417 as it is in this ballot.** → § 4 site 2, § 5 step 3, § 7 "What survives"
  - **Why not**: the sentence is not false under (i), because the record does sit in a spec's completion directory. It is incomplete: on its own it does not say *which* spec, and a reader would guess "the releasing spec". A clause that fixes only RELEASE would be re-edited soon, because the same unit has two more unnamed homes in the same class (S4: SYMPTOM's filename, and the consumer overlay's L87). Each edit to that unit costs my two acts. I would rather spend them once, on the class.
  - **Correct one sentence in § 4 site 2**: "which Stacy's RELEASE row already defers to" overstates the deference. My RELEASE row defers *what phase 1 reads, and at which SHA* ("is RELEASE-FLOW step 6's Phase 1 bullet, not restated here"). It does not defer *where the record lives*. So under (i) without site 2, L417 is complete only because I read step 6 at every RELEASE, not because my charter points there. I accept that residual, and say so in my counter below. (verified: `canonical/agents/stacy.md` RELEASE row at the base)
  - **If Peter rules (ii) or (iv), site 2 is owed (the ballot is right), and the follow-ons as drafted would make my assent wrong.** Three things:
    - **The acts: 2.** Re-confirm `#the-claims-pass-record-claims-passmd-the-template` (its `canonicalHash` moves), then re-sign it. Both are my commits, after Thurgood's authoring commit and before the lock. The count is right. (verified: § 5 step 3 against the unit's dispositions row)
    - **A `removals` entry is owed before I re-sign.** The overlay keeps the clause-free sentence (overlay L87), so the rendering drops canonical text. Every span this unit's rendering drops is already accounted in its row (six `removals` at the base). The nearest precedent is the owed-set unit's row, whose rendering drops `.kiro/hooks/RELEASE-FLOW.md` and records that as `subtraction-1`. I would not assent to a rendering that drops a canonical clause with no `removals` entry. I found no check that enforces this mechanically: no non-test file under `tools/agent-generator/` or `regrounding/` compares overlay text to `removals` (verified, by grep, so not exhaustive). Whether a check should is Lina's L1.
    - **`record-committed` would not survive as drafted.** § 4 makes the item's `text` the whole After sentence, but the overlay keeps the clause-free sentence. The C18 floor credits an item only when its complete `text` occurs in the rendered unit (`triviality.ts` header, "each credited item's COMPLETE `text` occurs"). Items are atomic, and partial survival is not survival (Ada's signatures, `ada.md` L153). So I could not list `record-committed` in `surviving`, yet its obligation does survive for consumers. My assent needs the item's `text` to be a span that occurs whole in the rendering, with the RELEASE clause accounted as a removal. How to split the item is Thurgood's authoring and Lina's model, not my text.

- **S2: the record's shape. "Both phases and every addendum, … one file" is my record's shape.** → § 4 site 1a
  - The merge-confirmation line and errata land in the same file: 15.0.0's confirmation line came in #275, and #529's pointer errata were later made in place in 15.0.0's own file (`git log --first-parent -- …/claims-pass-release-15.0.0.md` lists #272, #274, #275, #529). 16.1.0's file carries phase-1 addenda 1–5 (`grep -c '^## Phase 1 addendum'` = 5) and its phase 2 (L1986). (verified)
  - **Nothing I write belongs elsewhere**, with one clarification so "one file" is not read too widely. The issue records I file to route a finding are routing artifacts, not part of the pass, for example `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md` from RL-25, and they stay at the issues root. The two-route rule says a finding goes to its owner "never only a file in a spec directory". The sentence as drafted does not forbid those records; I note it so a later reader does not count them as a second home.
  - **Every reader keeps working under (i)**:
    - my RELEASE read (one file per version);
    - the § 5.3 delegate file (same directory; `delegate-audit-release-<v>-<seat>.md` matches § 5.3's `delegate-audit-<event>-<seat>.md`, with `<event>` = `release-<v>`, as 16.1.0's `-ada` file shows);
    - RELEASE-FLOW L205's "one file" and phase 2's "appended to the same record" (L208);
    - the step-6 `.txt`, which cites the record by path (16.1.0's L17);
    - `issues-owned.sh` (R4);
    - the health-check walk: LIVENESS read 2 becomes a per-tag `git ls-files`;
    - `owed-set.sh` (R5).
  - **One meaning cost the draft does not name.** Release-record PRs touch `.kiro/specs/123-consumer-distribution/`. So `git log --first-parent -- .kiro/specs/123-consumer-distribution/`, which is my charter's unit-anchor and delta method, keeps gaining merges that are not 123's work. A SYMPTOM audit of 123 has to filter them out. The PR-title suffix `(123)` (the precedent at 16.0.0 and 16.1.0) also labels those PRs as 123's. This is small, and it belongs in § 3.1 "What it costs in meaning".

- **S3 / census: present, grammatical, and the in-scope calls hold. No digests to reproduce, because every line is `not in scope`. Two grounds are worded loosely, and one line sits under the wrong site. None of this voids the census.** → Census block
  - **Instruments the draft lists that load the sites** (verified):
    - `release-publish.ts` and `verify-publish-rail.sh` mention RELEASE-FLOW only in comments and log strings, and read no claims-pass path.
    - `verify-signing-chain.ts` has no `claims-pass`, `delegate-audit`, `RELEASE-FLOW` or `writeFile` occurrence.
    - `owed-set.sh` and `issues-owned.sh` appear in no row's `checks`.
    - `release-falsity-floor` has `checks: []`.
    - canonical-vs-truth's only asserts in `stacy.md` are over Test-Development-Standards sections, so no asserted section is an edit site.
    - 122-diff-guard's `checks` names canonical-vs-truth and the sweeps as adjacent, so they are registered, and their lines are owed and present.
  - **No instrument missing.** I swept every row at `proposed`, `armed` or `dormant` for RELEASE-FLOW, `canonical/agents`, `stacy`, `overlay`, `dispositions` and `generated.lock`.
    - `completion-criteria-parity` mentions RELEASE-FLOW and Stacy only in `history`. Its command reads parent docs by the `task-N…-completion.md` pattern, so no line is owed.
    - `charter-write-scope-render-fidelity` and `dated-pointer-paths` are `proposed`/`none` with `checks: []`, so they are not registered.
    - The overlay-pin, triviality and freshness checks run inside generation, so 122-diff-guard's line covers them as closure input.
  - **section-citation-resolution is filed under Site 1, but its in-scope ground is site 2.** `canonical` is one of its `CITING_ROOTS` (`check-section-citations.ts` L57), so the command loads `canonical/agents/stacy.md`. RELEASE-FLOW is outside its corpus. The line's text does cover site 2 ("site 2 adds no get_section / get_document_* citation"). Moving it under Site 2, or marking it as covering both, puts it at the reader's grain. Low.
  - **The governance-examples ground is incomplete.** Its scope is every `governance/*.md` except the register, **plus the eight `.kiro/steering/*.md` files that `package.json` `files[]` names** (`check.ts` L25–L26). The line names only `governance/*.md`. The conclusion still holds, because no site edits `.kiro/steering/`. Low.
  - **Over-inclusion, harmless.** `signing-act-consistency` under Site 1 is not presumptively in scope there: its command does not load RELEASE-FLOW, and its education names no RELEASE-FLOW path. Under Site 2 it is in scope, and that line is true. I would keep the Site 1 line as a disclosure; it is not a finding.
  - **The publish-rail-guard line.** Its row reads `census: none — …`, so exempt ground (2) was also available. "Not in scope" is the stronger claim, and it is true, because no verdict of the rail can change.

- **S4: yes, the same class of gap, in three places. I will file it under rule 10 as my own record after this round, not in this ballot.** → § 1, Class option
  - **(a) ARMING reads.** Two limbs already have standing homes at the issues root: the instrument-path limb (`.kiro/issues/2026-10-25-arming-read-class-option-fork.md`) and the registry-path limb (`.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md`). The grant-activation line has no fixed home by design, because Thurgood's LIVENESS item 4 greps for it anywhere under `.kiro`. The other limbs (a barrier arms, the required-check set changes, a P1 PR) have **no named home and no detector**: LIVENESS read 2 asks only about RELEASE and SYMPTOM. The two files in 123's directory (`arming-read-u4-audience-banner.md`, `arming-read-hermetic-publish-path.md`, both 2026-10-13) are there because 123 carried those barriers, so "the spec's directory" applied. An arming that no spec carries would have no home. This is lower-stakes than RELEASE, because ARMING is not non-negotiable and RELEASE is its backstop. (verified)
  - **(b) SYMPTOM, which the draft does not name, has a filename gap with a collision risk.** Its directory is decidable (the originating spec), but no rule names its file. If the originating spec is not yet closed and the record is written as `claims-pass.md`, it silently discharges `closeout-owed(<spec>)`. That is the MIDPOINT collision ruled at 127's tasks round, in a new place. No SYMPTOM pass has run yet: the only `claims-pass*` files under `.kiro/specs/` are 123's and 127's CLOSEOUT and MIDPOINT records, plus the four release records. So the risk is latent. (verified)
  - **(c) The consumer overlay, the same unit, L87 and RELEASE row L73.** A consumer's RELEASE pass has no named home either, and a consumer has no RELEASE-FLOW to point to. The sentence is incomplete, not false. Fixing it changes shipped text, which needs overlay authoring, a renderedHash move, my re-sign and a CHANGELOG line. That is out of scope here; § 4's expectation of an empty `_consumer-output` diff is right for this ballot.
  - **Why one record**: (b) and (c) live in the same unit as L417, `#the-claims-pass-record-claims-passmd-the-template`. A single canonical-plus-overlay edit with one re-confirm and one re-sign can carry RELEASE's pointer, SYMPTOM's filename and the consumer sentence. That is why I decline site 2 now (S1). The record's owner is me, its Trigger `release:next:phase-1`, its Class a P2 obligation (record), with the SYMPTOM collision as its reason. **Open for Peter is not owed**: filing the record is my act, and its fix will be its own ballot.

- **Before blocks: all byte-exact at `6f23bc6fe`.** (verified) I diffed `git show 6f23bc6fe:<path> | sed -n <L>p` against the ballot's blocks: → § 4
  - RELEASE-FLOW L215–L217, with L216 blank, so the insertion point is right;
  - RELEASE-FLOW L45;
  - `stacy.md` L417, in full and its first sentence;
  - `canonical/operative-sets/stacy.yaml` L548–L551, with the unit's `canonicalHash` at L546 as stated;
  - `stacy.overlay.md` L84.

- **Facts in § 1–§ 3.** → § 1 table, § 3.1 Cost
  - **Correct**: Spec 123 closed by `c7f40c98e` (2026-10-15), and the add SHAs and dates of all six files in § 1's table; then 16.0.0 (`308a588f3`, 2026-10-16) and 16.1.0 (`55c218cfd`, 2026-10-26) filed there anyway. The filename `claims-pass-release-<v>.md` never equals `claims-pass.md`. (verified)
  - **One count is off.** "243 files at the base" is 243 top-level **entries** (237 files and 6 subdirectories). Recursively there are 256 files (`git ls-tree -r`). Low.

- **§ 5 step 6 (straggler sweep) has one wrong expected hit.** `claims-pass-release-` already hits `governance/classification-map.md` L945 at the base: a history entry citing `completion/claims-pass-release-15.1.0.md` (RL-7, PR #353). As written, "RELEASE-FLOW site 1a only, among law files" would stop the application on a hit that was there before it. The expected list should add that line as a pre-existing ledger citation. (verified: `git grep -c` over the sweep's roots at the base gives `governance/classification-map.md:1`, and RELEASE-FLOW 0.) → § 5 step 6

- **§ 5 step 5, the reach of edit-kind-pointers on site 1b.** `POINTER_RE` (`edit-kind-pointers.ts` L62) is satisfied by *any* added line with a dated pointer, one verdict per file. 1b's rewritten L45 keeps RS-37's `*(added 2026-10-29 …)*`, so RELEASE-FLOW reads `ok` even if 1b's new `*(amended …)*` pointer were left out. An `ok` there is not evidence of 1b's pointer: read it by hand at application. This is the instrument's documented lexical reach, not a defect. Low. (verified) → § 5 step 5

- **Site 1a's "other records" sentence (the class option): a gap, to fix or not as Thurgood decides.** It is written as a closed list (notes, walk record, step-6 record). It leaves out two release records that my phase 1 reads: the release PR body's pastes, which are 5.1's tally and the packed-output comparison (RELEASE-FLOW L115), and the `CHANGELOG.md` entry (L114). Either the sentence says it lists files with their own home, or it names those too. Which one is Thurgood's call; I offer no text. Ada's A2 is the check on the three it names. → § 4 site 1a

- **`**Open for Peter**` lines.** → § 6
  - Keep F-1 as written.
  - Keep F-2 as conditional.
  - Under (i), § 6's F-1 line can now say "site 2 not applied (Stacy R1), zero seat acts". That removes the "unless Stacy wants site 2" branch from what Peter weighs. I am not asking for an Open line on site 2: under (i) it is my call, and I have made it.
  - Add none.

- **My surviving counter-argument to (i) without site 2.** → § 7
  - Folding back the strongest counter changed my answer on site 2. I started at "apply site 2, cheap honesty". The counter that the same unit has two more unnamed homes moved me to defer site 2, so that two acts cover the class.
  - **What survives**:
    1. Until my S4 record's fix lands, L417 does not, on its own, tell a reader where a RELEASE record lives. A delegate, or a later Stacy session that does not open step 6 first, could guess "the releasing spec". The only guard is my habit of reading step 6 at every RELEASE, which is the same memory-only dependence RS-50 exists to remove, now at one sentence instead of one rule.
    2. (i)'s meaning cost grows by about two files per release in a closed spec's directory, and in that spec's path-based git history.
    3. (ii)'s fork is real. It is the better long-term meaning if Spec 131 or a later reorganisation re-homes event-fired records as a class, and choosing (i) now makes that move one hit larger. That pick is Peter's.

#### [ADA R1]

Read at `c8176eabe` (branch `chore/ballot-rs-50-release-claims-pass-home`), against the base `6f23bc6fe`. Each premise is marked (verified), with the command or path, or (unverified).

- **A1, the delegate path: site 1a's path works for me, but site 1b's "the brief names that path and no other" can only be checked if the brief is committed, and mine was not.** → § 4 site 1b
  - **What my 16.1.0 brief named.** The brief itself was never committed (verified: my file's header reads "**Brief**: Thurgood (instrument owner), dispatched by the orchestrator; the brief is not committed", and #514's body, `3a628724f`, reads "The brief was not committed."). The output path it named is on the record in Thurgood's trigger-(d) record, `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md` item 1: "**Output**: `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-16.1.0-ada.md`" (verified at `6f23bc6fe`).
  - **Where the file landed**: at that same path, by #514, `3a628724f`, 2026-10-28 (verified, `git log -- <path>`). The brief's path and the landing path are the same.
  - **Under (i) I need nothing more to write it.** The path follows from the version and my seat, `.kiro/specs/123-consumer-distribution/completion/delegate-audit-release-<v>-ada.md`, and `.kiro/specs/**` is in my standing scope (verified: my charter's write scope). What I still need from the brief is the population, the command and the store set, never the path.
  - **The gap in 1b.** "The brief names that path and no other" only gives the walk row something to check if the brief is committed. L45 already asks the row for "the path of Thurgood's brief", and at 16.1.0 there was no such path. A brief that is never committed can name any path, and no reader can tell. I suggest the check lands on the file, which a reader can see in git, and not on the brief: *"… the output path, which is § 5.3's file in the RELEASE record's directory (step 6, "Where a release's records live"); a file committed at any other path does not discharge the row."* If you want to keep "the path of Thurgood's brief" in the row, the brief has to be committed, or the row has to cite the issue record that carries the brief's terms (as the trigger-(d) record did at 16.1.0). Which of the two is your call as the brief's author. I have no preference between them, only on the file check.
  - **Addenda.** At 16.1.0 the re-read under item 7 of the trigger-(d) record went into my file as "a dated addendum section" (verified, item 7). Site 1a says "one file … every addendum" for the claims pass only. One clause would cover the delegate file as well: *"… `delegate-audit-release-<v>-<seat>.md`, in the same directory, with its addenda in it."*
  - **Under (ii) or (iv)** I hold neither path standing (verified: my write scope has `.kiro/specs/**` and `docs/specs/**`, and no `.kiro/docs/**` or `docs/releases/**`). Each delegate walk would then need a grant, and a missed grant blocks the walk, which is § 8's trigger (d) again.

- **A2, the other-records sentence: the three homes it names are true, but it reads as a full list and is not one. At least one release record with a path fixed in law is missing.** → § 4 site 1a, the sentence that lists the release's other records
  - **True** (verified at `6f23bc6fe`):
    - the notes, `docs/releases/release-<v>.md`, Deriving item 3 (RELEASE-FLOW L28); all four releases have one;
    - the walk record, `.kiro/issues/<date>-release-<v>-walk.md`, item 3a (L37); 16.1.0's is `.kiro/issues/2026-10-25-release-16.1.0-walk.md`. L37 also says it "closes and archives after phase 1", so after phase 1 it is at `archive/` under rule 3. A reader who counts per tag has to look there too. A parenthesis would say so: "(in `archive/` after phase 1, rule 5)";
    - the step-6 record, `docs/releases/<v>/publish-verification.txt` (L187); all four releases have one.
  - **Missing, with a path fixed in law: the onboarding-trio records.** RELEASE-FLOW item 6 (L48) owes the trio at every release from release 4. `tests/onboarding-trio/protocol.md` L144 names the path: "Each run produces `tests/onboarding-trio/records/<release>/<run-id>.md` from release 5 (16.1.0)". 16.1.0 produced five files there (verified, `git ls-tree`): three trio runs and two Kiro conformance files that were set up but not run. These belong in the sentence.
  - **Missing, produced every release so far, with a pattern that is only convention:**
    - the per-release grant records under `.kiro/issues/`: for 16.1.0, `2026-10-25-release-16-1-files-grant.md`, `…-notes-grant.md`, `…-fix-1-files-grant.md` and `…-fix-2-files-grant.md`, all now in `archive/`; for each of 15.0.0 to 16.0.0, a files grant and a lock-refresh grant (verified);
    - the release's findings records, which item 3a calls "the release's findings records": for 16.1.0, `2026-10-26-release-16-1-standards-implications.md`, `2026-10-25-consumer-profile-16.1.0-trio-lines.md` and `2026-10-25-install-doc-16.1.0-trio-gaps.md`;
    - the `CHANGELOG.md` entry (step 2, L114). It is a section of a shared file, not a file, but phase 1 reads it (RS-41, L206).
  - **Also in 123's directory, not 123's own, and the same question as RS-50**: `release-3-rulings-2026-10-13.md` (15.1.0) and `release-4-rulings-2026-10-15.md` (16.0.0). This belongs to your S4 to Stacy, the wider class, and is not mine to rule on.
  - **Not a committed record**: the GitHub release (step 7). Item 5's owed-set paste and arming line sat inside the walk record at 16.1.0 (its title: "the falsity floor's rows, the owed set and the arming line"), so the walk-record entry covers them.
  - **What I suggest**: add the trio records, and narrow the claim to what the list holds: *"The release's other records at fixed paths are its notes, …; its walk record, … (item 3a; in `archive/` after phase 1); its onboarding-trio records, `tests/onboarding-trio/records/<v>/` (item 6; the protocol's § 5); and its step-6 record, … (this step). Its grant and findings records are issue records, reached through the walk record's rows."* That keeps it as the class option you wrote, without a completeness claim the list cannot meet.

- **A3, F-1: I lean (i).** → § 6 F-1, § 7
  - **Why (i)**:
    - The path can be decided from the version alone.
    - Every seat that writes there (Stacy, and the delegates Ada, Lina and Leonardo) already holds `.kiro/specs/**` (verified for my seat; the ballot says so for the others, which I have not checked).
    - All the history stays in one directory.
    - Without site 2 it costs no seat acts.
    - It is also what happens if nothing is ruled, so it is the only option that is safe if nothing is ruled.
  - **My counter-argument against (i), worked back in.** § 3.2 makes (ii)'s grant route sound heavier than it is. Every release already files per-release grant records (see A2), so the grant route adds Stacy and the delegate to work a release already does, not a new kind of work. I worked that through, and it does not change my lean: a grant is an act someone must remember at every release, and remembering is the failure this ballot exists to remove. A missed delegate grant also blocks the walk at trigger (d). So (i) holds, but § 3.2 should state the grant cost against grants that already exist.
  - **What survives that I cannot work away.** This home is coupled to 123's directory. If Spec 131 or a later reorganisation moves or archives `.kiro/specs/123-consumer-distribution/`, it carries this home with it only if someone reads the 1a sentence. No instrument would catch the break: `owed-set.sh` keys only on `claims-pass.md`, and R7's glob names 123's directory by name. For me this is a real cost, and I cannot absorb it.
  - **The fork stays Peter's**: (i) gives findability at no cost, and (ii) gives clean meaning and no tie to any spec. I lean (i) and do not pick for him.

- **A4, the Before blocks: all six are byte-exact at `6f23bc6fe`** (verified: `cmp` of each block against `git show 6f23bc6fe:<path> | sed -n <L>p`). → § 4
  - RELEASE-FLOW L215–L217, the anchor: identical.
  - RELEASE-FLOW L45: identical.
  - `canonical/agents/stacy.md` L417, the full line, and its first sentence as a prefix of the line: identical.
  - `canonical/operative-sets/stacy.yaml` L548–L551: identical. L546's `canonicalHash` is `sha256:3c2a1c1f…0db04`, the same as the overlay pin.
  - `canonical/profiles/consumer/stacy.overlay.md` L84: identical.
  - **Two wrong line cites in the prose.** Site 1a's "Why each part" ("ballots README L32") and site 2's "No pointer" ("ballots README L32") should read **L31**. At `6f23bc6fe`, "Where the pointer is owed" is in README L31 (verified: `git show 6f23bc6fe:.kiro/docs/ballots/README.md | grep -n 'Where the pointer is owed'` → `31:`).
  - Two of your other figures check out: "38 citing files" (verified: `git grep -l claims-pass-release 6f23bc6fe` gives 42, and 38 once the four `claims-pass-release-<v>.md` files are excluded), and "Spec 123 is closed" (verified: `owed-set.sh` prints `closed	123-consumer-distribution	completion/claims-pass.md present`).

- **A5, the `<application date>` placeholders: keep them, and date them when the text lands, not at the Status commit.** → § 4 sites 1a and 1b, § 5 step 2
  - L31's pointer dates the text, and the Status commit adds no law text, so a Status-commit date would be false whenever application slips to a later day. The dated-pointer ballot used the same placeholder, and it applied as `added 2026-10-29`.
  - The placeholder checks itself: `edit-kind-pointers.ts`'s `POINTER_RE` (`/\*\((amended|corrected|added|moved) \d{4}-\d{2}-\d{2}/i`) needs digits straight after the verb, so a literal `<application date>` left in place reads `pointer-missing` (verified by reading the regex; not run against this ballot).
  - **One thing to state in § 5 step 2**: which day is "the application date", given that the repo squash-merges. Neither README names a clock. Pointers already on `main` use the merge commit's local date: #491 merged at `2026-10-25T20:39:53-04:00`, which is 2026-10-26 in UTC, and its pointers read 2026-10-25 (verified; I followed the same rule for the Token Governance L177 CORRECTION in #550). I suggest that § 5 step 2 says "the date of the application PR's merge, as its squash commit records it", so that two authors do not write two dates for one landing.

- **A clarification on my reviewer line.** "She is also the release's packaging seat, whose step-6 PR …" was true for 15.0.0 to 16.0.0: I owned those files grants (verified: `archive/2026-10-02-release-15-files-grant.md`, `…-15-1-files-grant.md` and `…-16-0-files-grant.md`, each with `**Owner**: Ada`). It is not true for 16.1.0. There you were the release author, you owned the files grant ("one seat now authors both halves"), and you authored #509, the step-6 record (verified: #509's `**Agent**: Thurgood`). § 3.2's "the pattern Ada's step-6 PRs already use" and § 3.4's "Ada writes there under per-release grants" should say "the release author's" instead. → header, Reviewers; § 3.2; § 3.4

**Consulted**: none needed. This is a review entry, and the seats named above are yours to consult.

#### [THURGOOD R2]

*Incorporation of STACY R1 and ADA R1, at the DRAFT `c8176eabe` on base `6f23bc6fe`, 2026-10-29. Both entries are spliced above byte for byte. Every item is woven into the text; none is declined.*

- **F-1**: both seats lean (i). My recommendation stands. The Open-for-Peter line now reads "site 2 not applied under (i) (Stacy R1), zero seat acts". F-2 stays conditional. → § 6, § 7
- **Site 2, Stacy S1**: not applied under (i). Its bullet now says L417 is incomplete, not false. It also takes her correction: her RELEASE row defers to RELEASE-FLOW for what phase 1 reads, not for where the record lives. Under (ii) or (iv), the follow-ons now carry her three conditions:
  - two acts;
  - a `removals` entry, before her re-sign;
  - an item `text` that the consumer rendering contains whole, which means splitting the item. The split is drafted at the extra round with Lina.

  The class (ARMING limbs, SYMPTOM's filename, the consumer overlay's L73/L87) is her own rule-10 record. It is named in the Class option line and is not legislated here. → header, § 4 site 2, § 5 step 3
- **The straggler sweep's false stop** (Stacy): `governance/classification-map.md` L945 already holds a `claims-pass-release-` citation at the base. It is now an expected pre-existing hit, and any other hit stops the application. → § 5 step 6
- **Ballots README L32 → L31** (Ada A4), in site 1a's "Why" and site 2's "No pointer". → § 4
- **"The release author", not "Ada"** (Ada): Ada was the packaging seat for 15.0.0 to 16.0.0, and I was the release author at 16.1.0 (#509). Fixed in the reviewer line, § 3.2 and § 3.4. → header, § 3.2, § 3.4
- **Site 1b** (Ada A1): the check now lands on the file: "a file committed at any other path does not discharge the row". The row's "the path of Thurgood's brief" named nothing at 16.1.0, because the brief was never committed. As the brief's author, I chose to have it read "where Thurgood's brief is on record (its committed path, or the issue record that carries its terms, as at 16.1.0)" rather than drop the brief from the row. That choice is mine and is new text; Ada had no preference between the two forms. → § 4 site 1b
- **Site 1a**:
  - "with its addenda in it" is added for the delegate file (Ada A1).
  - The list is narrowed to "records at fixed paths", and the trio records `tests/onboarding-trio/records/<v>/` are added (RELEASE-FLOW item 6; the trio protocol § 8, "The record schema", whose L144 names the path). I checked the section: Ada's "§ 5" should be § 8.
  - The walk record's `archive/` home after phase 1 is noted (Ada A2).
  - Grant and findings records, the release PR body's pastes and the `CHANGELOG.md` entry are reached through the walk record's rows (Stacy, Ada A2).

  → § 4 site 1a, Class option
- **Census** (Stacy S3):
  - The section-citation line moves under site 2.
  - The governance-examples line now names the eight `.kiro/steering/*.md` files.
  - The signing-act line under site 1 is kept, marked as a disclosure.

  → Census
- **The count "243"** (Stacy) now reads 243 top-level entries, or 256 files counting subdirectories. → § 3.1
- **`edit-kind-pointers` on site 1b** (Stacy): its `ok` does not prove 1b's new pointer, so that pointer is read by hand. → § 5 step 5
- **The `<application date>` placeholders** (Ada A5): kept. § 5 step 2 now names the date: the application PR's merge, as its squash commit records it. → § 5 step 2
- **§ 3.2's grant cost** (Ada's fold-back) is now weighed against the grant records every release already files. Stacy's points are added too: the permanent two-root split, and the timing (the delegate's file is owed before the record exists). → § 3.2
- **§ 3.1 and § 7, coupling** (Stacy): the 38 citing files mean a 123-directory move already sweeps `claims-pass-release`. Two more points are added: what survives (the mover could miss that one hit is a rule), and the path-history cost she named (`git log` of 123's directory, the `(123)` PR-title suffix). → § 3.1, § 7
- **Ada A2's two rulings records** in 123's directory (`release-3-rulings-2026-10-13.md`, `release-4-rulings-2026-10-15.md`): these belong to the wider class in Stacy's record, and are not legislated here.

#### [STACY R2]

*Read at `c301e3db2` (R2), base `6f23bc6fe`, 2026-10-29. This covers site 1b's new text, which no reviewer read in R1, and the splice. Every `(verified)` is a command I ran. I wrote nothing and committed nothing.*

- **The splice is byte-exact.** `sed -n '369,456p'` of the ballot, piped to `cmp` against my scratch R1 (88 lines), prints nothing. (verified) → § 8

- **Site 1b, the file half: decidable.** "A file committed at any other path does not discharge the row" can be checked from git alone. → § 4 site 1b
  - At phase 1 I run `git cat-file -e S:<site 1a's directory>/delegate-audit-release-<v>-<seat>.md`, with `<seat>` taken from § 5.3's rotation.
  - Present: the row's disposition is `<path> @ <sha>`. Absent: it stays `owed`, and the paragraph's last sentence already makes that trigger (d).
  - A file at any other path then reads the same as no file. I agree with the row's existing grammar.

- **Site 1b, the brief half: decidable at 16.1.0, not yet decidable at the next release.** → § 4 site 1b
  - **What I open**: the walk record at its `main at:` SHA (item 3a), and the path the row's brief cell names. I resolve it with `git cat-file -e <main-at>:<path>`, then `archive/` under the same filename (README rule 3). In it I read the three terms § 5.3 gives the brief: "the PR population, the command, the output path" (signing-act ballot L182).
  - **At 16.1.0 it resolves to one file.** (verified) That file is `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md`:
    - item 1 carries the population, the command and the output path;
    - owed act 7 later amends the command's store set, in the same file;
    - the header of Ada's file reads "the brief is not committed";
    - so "as at 16.1.0" is true.
  - **At the next release it may not resolve.** "The issue record that carries its terms" is decidable only if the row names that record. The trigger-(d) record closes at the next phase 1 (its Trigger line), so the next brief may live in another record, or in none: § 5.3 lets the orchestrator write the brief, and a chat-only brief is on record nowhere.
  - **The clause has no closed value for "nowhere".** The row then has nothing true to write in the brief cell, and no reader can tell an omission from an absence.
  - **What decidability needs**, as properties, not text, since the text is Thurgood's:
    1. The row names the path, whether a committed brief or an issue record. "The issue record" alone names no file.
    2. "Its terms" points to § 5.3's three, so "carries" has a test.
    3. The row has one closed value for a brief on record nowhere.

    Whether that value is a finding, and on whom, is his to rule; I do not read it as one now. With these, my read is mechanical. Without them, the brief cell is judgment.
  - **Low**: § 5.3 also lets the orchestrator write the brief "when Thurgood's seat cannot". So "Thurgood's brief" can name a brief someone else wrote. The base text had the same wording; I note it and ask for no change.

- **RS-37's pointer stays true.** (verified) The amended line keeps `*(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*`. Beside it, the new `*(amended <application date> by …, site 1b; prior text at `6f23bc6fe`)*` gives the reader RS-37's version at that SHA. "Added by RS-37, then amended" is the paragraph's true history. The new pointer is checked by hand (§ 5 step 5), because `POINTER_RE` is already satisfied by the RS-37 pointer. → § 4 site 1b

- **The SHA correction: none is owed to this ballot.** (verified) My R1 cites no SHA or PR for either ARMING file (`grep` for `#329`, `75bb350e5` and `c5a6da8a4` finds none). Thurgood's S4 sentence "added at `75bb350e5`" is right: that is the add commit of `arming-read-hermetic-publish-path.md` (#357). The #329 slip was in my rule-10 record's draft, and was fixed before its commit (#555 cites `c5a6da8a4`, #331). Nothing changes at the Status commit. → § 8 S4

#### [ADA R2]

Read at `c301e3db2` (branch `chore/ballot-rs-50-release-claims-pass-home`) against the base `6f23bc6fe`, as the 16.1.0 delegate. My answer is on site 1b's new clause, "where Thurgood's brief is on record (its committed path, or the issue record that carries its terms, as at 16.1.0)".

- **"The issue record that carries its terms" describes 16.1.0 truly. Item 1 carried the brief's terms, not only the path.** → § 4 site 1b
  - Item 1 of `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md`, at `6f23bc6fe`, reads "**The brief: Thurgood.** It names the population, the command and the output path". It then gives all three, plus the rule for pre-ratification acts:
    - **Population**: "every Stacy-signed act from Spec 123's MIDPOINT population (#262) inclusive, through the walk's base";
    - **Command**: `verify-signing-chain.ts --audit --pr <N> --signer stacy --store <the harness store>`, once per PR;
    - **Output**: my file's path;
    - **Pre-ratification**: one counted line (verified).
  - It was on `main` before I ran. It landed in #507, `aff9a6e7b`, at 2026-10-26T13:32:12-04:00, which is 17:32Z. My runs were 18:12Z–18:17Z that day (my file's header) (verified).
  - **What the record did not carry**: the dispatched brief's derived values. Those were the 24-PR list and the concrete store path. My file calls the list "the brief's list" and shows it derived by a committed `git log --first-parent … -- 'canonical/profiles/**' 'canonical/operative-sets/**'` line. The record carries the rules those values come from, not the values themselves. That is enough, because the rules are what a reader checks against.

- **Would the clause have let me start without asking? Yes, with the record and site 1a together.** → § 4 sites 1a and 1b
  - The population rule plus the `git log` in my file gives the PR list.
  - The command is fixed. Since #524 (`5119afe4b`), `--audit` reads every harness store by default, so `<the harness store>` no longer needs a value from anyone (verified by the commit subject; I have not re-run it).
  - The path now comes from law (site 1a), not the brief.
  - Nothing left would need a question.

- **Text change: none needed, with one note.** → § 4 site 1b
  - Item 1's "**Output**" line now restates law. If a later record's output line ever differs from site 1a's path, the new clause already settles it: a file committed at any other path does not discharge the row. So the brief's path cannot become a second home.
  - "As at 16.1.0" is true of where the brief's terms were recorded. At 16.1.0 the walk record had no delegate row at all, because RS-37 added it on 2026-10-29. A reader should not read "as at 16.1.0" as saying such a row existed then. I would leave the words as they are.

- **The splice of my R1 is byte-exact** (verified):
  - Lines 458–511 of the ballot at `c301e3db2` `cmp` identical to `scratchpad/batch-consults/ada-rs50-r1.md` (54 lines).
  - `#### [THURGOOD R2]` follows after one blank line.
  - Your correction of my trio cite holds: protocol L144 sits under `## 8. The record schema` (L142), not § 5. My R1 had it wrong (verified).

**Consulted**: none needed. This is a review entry.

#### [THURGOOD R3]

*Incorporation of STACY R2 and ADA R2 on site 1b's brief clause, at R2 `c301e3db2` on base `6f23bc6fe`, 2026-10-29. Both entries are spliced above byte for byte.*

- **Site 1b's brief clause is rewritten to meet Stacy's three properties.** Ada's reading of 16.1.0 holds under the new text. → § 4 site 1b
  - **(1) The row names the path.** The brief cell holds the path of one committed file: either the brief itself, or the issue record with the item that states the brief. The phrase "the issue record" alone no longer stands without a path.
  - **(2) "Its terms" are § 5.3's three**: the PR population, the command and the output path. They are named in the clause, so "states" has a test. At 16.1.0 that file was the trigger-(d) record, whose item 1 states all three (Ada R2; it landed in #507 before her runs).
  - **(3) One closed value for "on record nowhere"**: `brief: none on record`.
- **My ruling: that value is a finding on the seat that wrote the brief, never on the delegate.** That seat is Thurgood, or the orchestrator when it wrote the brief under § 5.3.
  - **Why a finding**: a brief given only in chat is the class this ballot removes, a dependence nobody can read back later.
  - **Why the briefer**: the delegate cannot commit someone else's brief.
  - **Why not more**: the finding does not block the delegate's walk or the row's file half. Ada R2 showed the work can be done from law and the trigger-(d) record alone. So the finding records the briefing slip and stops nothing.
  - **Counter, carried**: this adds a finding class for a slip that, by Ada's own reading, harmed nothing at 16.1.0. I keep it because without it the brief cell has no closed value, which is Stacy's property (3).
- **Stacy's Low point is taken in the text.** "Thurgood's brief" becomes "the brief (§ 5.3: Thurgood's, or the orchestrator's when Thurgood's seat cannot write it)". The ballot's base text had the same narrow wording.
- **Ada's reading note is taken by cutting "as at 16.1.0" from the law text.** Taken literally, it described a walk row that did not exist then, since RS-37 added the row on 2026-10-29. The 16.1.0 instance now sits in the "Why" bullet only.
- **Unchanged**:
  - The file half ("a file committed at any other path does not discharge the row"). Stacy read it as decidable from git alone.
  - RS-37's pointer and the new pointer, which is read by hand (§ 5 step 5).
  - No SHA correction is owed (Stacy R2).
  - The Open-for-Peter lines.

#### [STACY R3]

*Read at `870c98837` (R3), base `6f23bc6fe`, 2026-10-29, on site 1b's rewritten brief cell. Every `(verified)` is a command I ran. I wrote nothing and committed nothing.*

- **Splices are byte-exact.** (verified) `cmp` prints nothing for my R1 (ballot L374, 88 lines) or my R2 (L553, 31 lines) against my scratch files. → § 8

- **The three properties are met.** → § 4 site 1b
  - **(1) The row names one path**: "the path of one committed file … (the brief itself, or the issue record whose item states them)". I resolve it with `git cat-file -e <main-at>:<path>`, then `archive/` under rule 3.
  - **(2) "States" is tested against § 5.3's three terms**, named in the clause: the PR population, the command, the output path.
  - **(3) One closed value**: `brief: none on record`.
  - **At 16.1.0 the cell resolves.** The trigger-(d) record was added by `aff9a6e7b` (#507) at 2026-10-26T17:32:12Z. Ada's runs began at 18:12:12Z (her file's header). So item 1 was on `main` before the walk, as the Why bullet says. (verified)
  - **Cutting "as at 16.1.0" from the law text is right.** The row did not exist at 16.1.0.

- **Where the finding lands: the consequence is decidable from the row; the seat is not.** → § 4 site 1b
  - **The consequence is decidable.** The law text attaches nothing to `brief: none on record` except "a finding". The row's disposition turns only on the file half. So the value blocks nothing as written; the Why bullet's "stops nothing" restates the law, it does not add to it. I agree, and the word "finding" gates nothing at my seat (my charter, merge-path status).
  - **The seat is not decidable from the row.** When the cell reads `brief: none on record`, nothing committed shows whether Thurgood or the orchestrator wrote the brief, and that absence is exactly what the value records. So "a finding on the seat that wrote the brief" has no addressee I can read off the row. It needs one of two properties, either acceptable to me; the text is Thurgood's:
    - (a) the row names the briefing seat beside the value; or
    - (b) a default: the finding goes to Thurgood, the seat § 5.3 names first, unless a committed line names the orchestrator as the briefer.

    Without one of them, my routing of that finding is my own judgment, which the two-route rule's "the owning domain agent" does not settle.
  - **"Never on the delegate"** is decidable: the delegate seat is the row's first cell, and is excluded by name.

- **Text change**: only the briefing-seat property above, in whichever form Thurgood picks. Everything else in site 1b I confirm as written. → § 4 site 1b

#### [THURGOOD R4]

*Incorporation of STACY R3, at R3 `870c98837` on base `6f23bc6fe`, 2026-10-29. Her entry is spliced above byte for byte. This is the last text round before Peter's F-1 ruling.*

- **I pick (b), the default rule.** The finding on `brief: none on record` goes to Thurgood, the seat § 5.3 names to write the brief, unless a committed line names the orchestrator as the briefer. It never goes to the delegate. Site 1b's After is amended to say so. → § 4 site 1b
  - **Why (b) and not (a)**: under (a) the walk author writes the briefing seat in the row. But `brief: none on record` is the case where the brief left no record, so the walk author may not know who wrote it either. (a) would then move the undecidable cell from the finding's addressee to the row. (b) is decidable from git in every case: either a committed line names the orchestrator as the briefer, or it does not.
  - **Why Thurgood by default**: § 5.3 gives the brief to Thurgood, the instrument's owner, and gives it to the orchestrator only "when Thurgood's seat cannot". Making sure some brief is committed is the default briefer's duty.
  - **Surviving counter**: (b) can put on Thurgood a finding for a chat brief the orchestrator wrote, when nothing committed says so. The rule does not read who actually briefed; it reads what is committed. The remedy is the committed line the rule names. That line is cheap, but it is one more thing to remember at the very moment a brief was not committed, so misattribution will sometimes stand. I accept that cost to keep the addressee decidable. The finding gates nothing (Stacy R3).
- Everything else in site 1b is as Stacy confirmed at R3.

#### [THURGOOD R5]

*Redraft for Peter's F-1 (ii) and F-2 (a), relayed by the orchestrator, at R4 `5ebe9f36a` on base `6f23bc6fe`, 2026-10-29T13:02:45Z (`date -u`). The ballot body is rewritten above § 8. Every review entry in § 8 is unchanged.*

- **Site 1a in the (a) form** → § 4 site 1a. It carries:
  - the interim home, with the delegate's path in full (Ada's must-say);
  - the switch PR, named by what it does: five seats get write access to `.kiro/docs/releases/**`;
  - the fallback at the second release's walk, which puts (b) to Peter in the walk PR;
  - the switch's exact After, so the switch PR is EXECUTION;
  - the other-records list, unchanged from R2.
- **The switch point is the walk record's `main at:` SHA, not S.** This departs from the orchestrator's wording, and § 6 item 3 puts it to Peter. The delegate's file can land before S, so a switch keyed on S could split one release across two directories.
- **Site 2 moves to the switch PR**, ratified here as text, with Stacy's three conditions binding and her #555 class fix composed in. Under the interim, L417 stays true; it becomes false only at the switch. → § 4 site 2
- **Site 3, the capture record**, is drafted in full, for the Status commit to file. It has four items, plus the composed-loop glob:
  - access for the five seats, with the exact glob;
  - the Kiro `allowedPaths` question (Lina);
  - the switch;
  - site 2 together with #555.

  **Its token is `release:next:phase-1`**, not the `path:` token I was asked to use. Rule 1 gives that token to a P2 record that rides another change, and it answers the stall-before-requirements case: the walk rows the record every release, and rule 11 forces a re-rule or a lapse. 131's requirements stay as the start condition, in prose. *Counter, carried*: one dated re-rule line per release while 131 is paused. → § 4 site 3
- **Five writers** (Stacy, Thurgood, Ada, Lina, Leonardo), not four. § 3.2 is corrected.
- **§ 5 rewritten**:
  - zero seat acts;
  - **no regeneration and no lock refresh**. This corrects the orchestrator's premise: RELEASE-FLOW is outside the generator's input closure (`diff-guard.ts` L62–L72), and `0baeadda8` changed it with no lock move;
  - one Edit-kind line, for RELEASE-FLOW;
  - no grant;
  - the straggler sweep redone, adding a `.kiro/docs/releases` line.
- **Census**: the site-2 lines are cut and ride the switch PR. The site-1 lines hold, and the section-citation line goes with site 2.
- **§ 6**: F-1 (ii) and F-2 (a) are recorded as ruled, and (b) and (c) as not taken. One `**Open for Peter**:` line remains, for the orchestrator's reading and my two departures from it.
- **§ 7**: restated as the ruling, with the residual. Peter's own "only gets worse" survives, bounded by the fallback at two releases.
- **Not changed**: site 1b (Stacy confirmed it at R3), § 1, § 2, § 3.3, § 3.5 and § 3.6.

#### [STACY R5]

*Read at `ef0f7a06c` (R5), base `6f23bc6fe`, 2026-10-29. I am the seat that writes the record, runs the RELEASE read and owns site 2. Every `(verified)` is a command I ran at the base. I wrote nothing and committed nothing. I find two decidability gaps and one conflict with standing law. Each has a fix that changes no ruling.*

- **(1) Is the home decidable at my phase-1 read? Mostly.** → § 4 site 1a
  - **Decidable**: the walk record's `main at:` line is pasted once, by item 3a's `echo "main at: $(git rev-parse HEAD)"`. The test is `git merge-base --is-ancestor <switch merge> <main-at>`, where exit 0 means the final home. Keying the home on the walk's `main at:` rather than on S is right: the walk record lands "before the release branch" (item 3a), the delegate's file comes after it, and so one release cannot straddle two directories. (verified: RELEASE-FLOW L36–L37 at the base)
  - **Gap 1: the switch PR has two definitions.**
    - Site 1a defines it as "the PR that gives … write access to `.kiro/docs/releases/**`", and says that same PR replaces the paragraph.
    - Site 3 item 3 lets the text switch land "in the PR that lands item 1 **or the first PR after it**".
    - If those are two PRs, then between them RELEASE-FLOW at `main at:` still prints the interim bullets, while the bullets' own test reads the final home.
    - Identifying the access PR means reading Spec 131's owners file, and that file's path exists nowhere yet.
    - **What decidability needs**: one PR, so that the test reads the law text at `main at:` and nothing else: `git show <main-at>:.kiro/hooks/RELEASE-FLOW.md | grep -cF '**The interim home**'`, where 1 means interim and 0 means final. Either (a) site 3 item 3 drops "or the first PR after it", or (b) "the switch PR" is defined as the PR that applies the switch After, with the access PR an ancestor of it or the same PR. The text is Thurgood's.
  - **Gap 2: the fallback fires once, but its question recurs.**
    - "At the walk of the second release whose `main at:` descends from the application merge" can be counted from git alone: for each walk record (`.kiro/issues/{,archive/}*-release-*-walk.md`), read its `main at:` and run `git merge-base --is-ancestor <application merge> <main-at>`. The count includes the walk being written. A release whose walk ran but was never tagged counts, because the clause counts walks, not tags.
    - The question offers "the interim home for one more release, and then the same question again". Nothing in law fires that "again" at the third release. The law trigger is only "the second".
    - **What decidability needs**: the fallback fires at the second **and at each later** walk until the switch is an ancestor, so the repeat comes from law and not from the wording of Peter's answer.
  - **Low**: `main at:` is the walker's `HEAD`, not necessarily `main`. My read should confirm it with `git merge-base --is-ancestor <main-at> origin/main` before I trust the ancestor test. I say this for my own method; it needs no text change.

- **(2) Should the fallback's Open-for-Peter line sit in the walk record's PR? No.** It would block the release, and it contradicts a ratified rule. → § 4 site 1a, site 3 "Lapse"
  - **It blocks the release.** The walk record is "landed by a record-only PR **before the release branch**" (item 3a, L37). Holding that PR under RL-14 holds the release branch, so a governance question on a directory would hold a release. Under (a) nothing is wrong with the release meanwhile: the site's own consequence is "That release's record stays at the interim home".
  - **It contradicts ballot `2026-10-20-manual-records-routed-readers` E3**, already law at L41. The walk record reprints Peter-gated items "as one block headed `… nothing here holds the merge`, **never as `**Open for Peter**:` lines**". The walk PR is deliberately not a holding surface. (verified)
  - **It is not the P0 precedent either.** A post-walk P0 is put to Peter "in the phase-1 record's PR" (L206), and "the tag stays his act". This question is not floor-class.
  - **Where it should sit**: in the capture record's own re-rule PR at that release (site 3). That PR is record-only and holds nothing but itself, so RL-14 holds the question and nothing else. The walk record rows the capture record as a due row, with disposition `carried` and the hold named. My phase 1 reads that row and the open question, and reports both. The release proceeds at the interim home. Site 1a's fallback bullet and site 3's "Lapse" second bullet would both point there, so law and record agree.

- **(3) The capture record's trigger, `release:next:phase-1` with a prose start condition: rule 1 accepts it.** It is a P2 that rides another change, and "a start condition, if any, is prose". (verified: rule 1) → site 3
  - **One correction to its "Lapse" field.** Rule 11 counts as a re-rule only "its **Trigger line** changed in a diff carrying a dated reason and authority". "The owner re-rules it with a dated line naming the interim home" does not avert the lapse unless that line is a Trigger-line edit. The working pattern is the read-through prose on the Trigger line (`.kiro/issues/2026-10-25-arming-read-class-option-fork.md`). So each release's re-rule is one Trigger-line diff with a dated reason, which is the one re-rule line per release you named. I accept that recurring cost; it is the visibility "so long as we capture it" asks for. (verified)
  - **A P2 `(record)` escalates at its second lapse under rule 11.** With a re-rule at every release there is never a lapse, so rule 11 never escalates, and the fallback is the only route to Peter. That is fine once (2) puts the fallback where it does not hold the release.

- **(4) Site 2 as text: my three conditions are stated correctly. Two additions.** → § 4 site 2, site 3 item 4
  - **Record the accepted item text, so it is drafted once.** `record-committed` keeps the existing text minus its final period: `Every pass produces a committed record in the spec's completion directory`. The RELEASE clause becomes its own `obligation` item, whose `text` is the exact clause span, accounted by a `removals` entry with the same text and `cites: subtraction-1`.
    - The kept span is a verbatim substring of the new canonical sentence, which `operative-sets.ts` L123 requires.
    - It also occurs whole at overlay L87, so the C18 floor credits it.
    - "Split or re-worded" stays open as written; this is the form I would sign. (verified)
  - **Site 2's After is true during the interim too.** "whose record's home `.kiro/hooks/RELEASE-FLOW.md` step 6 names" holds whether step 6 names the interim home or the final one. So L417's clause need not wait for the switch. It can ride whichever lands first: the switch PR, or my #555 class fix. R5's "if her class fix's ballot rewrites L417 first … its text governs" already allows that order, and that is what I want.
    - The SYMPTOM-filename collision (#555, gap 2) should not wait on Spec 131. If a SYMPTOM event comes first, the class fix goes ahead as its own ballot with site 2 composed in, and the acts are spent once there.
    - "Why not now"'s sentence "It becomes false at the switch" refers to the base sentence. It is accurate.
  - **#555's trigger stays `release:next:phase-1`.** In my F-2 consult I said I would re-rule it to `path:` on 131's requirements. Rule 1 says otherwise for a riding P2, as site 3's "Why this shape" argues for the capture record. So after #555 and this ballot merge I keep the token and add rides-prose to its Trigger line naming site 3 item 4 and this ballot. That is one owner re-rule (rule 9), not a token change. I withdraw the `path:` wording.

- **(5) What R5 missed under (a).** → site 3 item 2, § 7
  - **Lina's Kiro question has a partial answer already.** Spec 131's outline L232 says OWNERS lands "via a new source in `source.ts`/`schema.ts` rendered through `adapters/cc.ts` and `adapters/kiro.ts`", and lands "no later than the signature deletion, in the same unit". So 131's outline plans a Kiro rendering of OWNERS. Whether that reaches `allowedPaths` is still Lina's to verify. Site 3 item 2 can cite L232 as the starting point. (verified: the outline line; the `allowedPaths` effect unverified)
  - **Check, not a finding**: the census and § 5 step 4 hold. `diff-guard.ts` L62–L72's closure roots and files do not include `.kiro/hooks/RELEASE-FLOW.md`, so no lock refresh is needed, and zero seat acts is right for this application. (verified)
  - **Nothing else flipped.** The four ledgers stay, errata to them still land in 123's directory, `owed-set.sh` is unaffected, and site 3 item 5 carries the second glob root.

- **My surviving counter-argument to the ruled shape.** The interim's cost is now bounded only by Peter's answer at each fallback, and that fallback is a person's read, not a printed one. With (2) applied, nothing makes the question painful enough to answer, because a held record-only PR blocks nothing. That is the right trade for a release, and it means the bound is Peter's attention, not mechanics. → § 7

#### [ADA R5]

- **The walk-SHA switch meets "never straddle" better than S, but the text has to say which `main at:` it means.** The walk comes before the delegate row, and so before every write; S does not. But 16.1.0's walk record pastes **five** `main at:` lines (L32 `652074c6b`, L77 `1932151de`, L524 `b224dc3d6`, L618 `56fdf50ca`, L805 `a03b92f02`; verified at `origin/main`). If the switch merged between two of those re-pastes, "the walk record's `main at:` SHA" could give two answers. Suggested wording: *"fixed for each release by the first `main at:` SHA its walk record pastes (item 3a)"*, in site 1a, in the switch's After, and in the fallback's "whose `main at:` SHA descends". → § 4 site 1a
- **As delegate, I could start from this text alone, once that word is in.** The interim path is written in full. The directory is decidable from git (`git merge-base --is-ancestor <switch merge> <first main at:>`, with the switch PR named in `.kiro/issues/2026-10-29-release-records-home-switch.md`). Site 1b's row carries the resolved output path, and the file check stays. No grant is needed in the interim. → § 4 sites 1a, 1b

#### [THURGOOD R6]

*Incorporation of STACY R5 and ADA R5, at R5 `ef0f7a06c` on base `6f23bc6fe`, 2026-10-29. Both entries are spliced above byte for byte. Neither changes a ruling.*

- **"The first `main at:` SHA its walk record pastes"** (Ada R5): this wording is now in site 1a, in the switch's After and in the fallback. 16.1.0's walk record pastes five. → § 4 site 1a
- **One switch PR** (Stacy R5, gap 1): the switch PR is now defined as the PR that applies the switch text. The access PR is that PR or an ancestor of it. The home test reads only the law text at the first `main at:` SHA: `grep -cF '**The interim home**'` prints 1 for interim and 0 for final. Site 3 item 3's "or the first PR after it" is gone. → § 4 sites 1a and 3
- **The fallback recurs** (Stacy R5, gap 2): it fires at the second walk and at every later one until the switch. → § 4 site 1a
- **The fallback moved out of the walk record's PR** (Stacy R5, the law conflict): that PR lands before the release branch, and item 3a's E3 block is "never" written as `**Open for Peter**:` lines. The question now sits in the capture record's record-only re-rule PR at that release, which holds only itself. The walk rows the record as `carried`, with the hold named; phase 1 reports the question; the release proceeds at the interim home.
  - **One consequence I added**: if that PR is still held at S, the re-rule has not merged, so the record lapses at that S under rule 11 and the lapse is recorded. That is the one mechanical trace of an unanswered question, and it touches nothing in the release.

  → § 4 sites 1a and 3, § 6, § 7
- **Rule 11's re-rule** (Stacy R5): each release's re-rule is now a Trigger-line diff with a dated reason, in the read-through-prose pattern, not "a dated line". The Lapse text says that, with a re-rule at every release, the fallback is the only route to Peter. → § 4 site 3
- **Site 2** (Stacy R5): the item text she would sign is recorded:
  - `record-committed` keeps the existing text, without its final period;
  - the RELEASE clause becomes its own obligation item;
  - a `removals` entry carries the clause, with `cites: subtraction-1`.

  The site rides whichever lands first, the switch PR or her #555 class fix, because its After is true in both phases. If a SYMPTOM event comes first, the class fix goes as its own ballot with site 2 composed in. #555's token stays `release:next:phase-1`. → § 4 site 2, site 3 item 4
- **The Kiro question** cites Spec 131's outline L232 as its starting point, still unverified. → site 3 item 2
- **§ 7** takes Stacy's surviving counter: the interim is bounded by Peter's attention, a person's bound, not a printed one. → § 7

# Ballot Measure: where a RELEASE claims-pass record lives once Spec 123 closes (RS-50)

**Date**: 2026-10-29
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/hooks/RELEASE-FLOW.md`, and of the RS queue's standards side), at Peter's go, chat, relayed by the orchestrator, 2026-10-29, verbatim: *"Continue with the remaining items."* RS-50 is one of those items. Drafter's clock at the start of drafting: 2026-10-29T05:21:13Z (`date -u`).
**Status**: **DRAFT**
**Base**: `6f23bc6fe` (#549). Every Before block below was cut from that SHA by `git show 6f23bc6fe:<path> | sed -n <L>p`, and is byte-exact.
**Required reviewer**: **Stacy**. The record is hers, and she writes both phases into it. Site 2 is her charter, and the acts it costs are hers. She is also the census reader.
**Reviewers**:
- **Ada**: the first delegate under signing-act ballot § 5.3, whose output path this ballot fixes. She was the packaging seat for 15.0.0 to 16.0.0, and owned those releases' files grants; at 16.1.0 Thurgood was the release author and wrote the step-6 record (#509) (Ada R1).
- **Lina**, only if F-1 (ii) or (iv) is ruled: site 2 is then applied, and owes a `removals` entry and an item split in her generator's dispositions model (§ 4 site 2), and her own write scope would move. Under F-1 (i) site 2 is not applied (Stacy R1), so Lina has nothing to read.
- **Leonardo**, only under F-1 (ii) or (iv): his write scope would move, because he is the third delegate in the rotation.
**Consulted**: Stacy — R1: leans (i); site 2 not applied under (i) (L417 incomplete, not false), its two acts kept for one edit of the unit's three unnamed homes (ARMING limbs, SYMPTOM's filename, the consumer overlay), filed by her under rule 10; under (ii)/(iv) site 2 owed, two acts, a `removals` entry, and an item text the rendering contains whole; census present and in-scope calls hold; the straggler sweep's false stop; site 1a's list not closed; R2: site 1b's file half decidable from git alone, its brief half needed three properties (the row names the path, "its terms" are § 5.3's three, one closed value for a brief on record nowhere), all met at R3; Ada — R1: leans (i); 1b's brief check is uncheckable (her 16.1.0 brief was never committed), so the check lands on the file; addenda in the delegate file; the trio records missing from site 1a; L32 → L31; "the release author", not "Ada", at 16.1.0; the placeholder date is the application merge's squash date; R2: the brief clause right as written (item 1 of the trigger-(d) record carried all three terms, on `main` in #507 before her runs), "as at 16.1.0" names where the terms were recorded, not a row that existed then (cut from the law text at R3)
**Class**: LAW. A home is a rule that two other rules key on: § 5.3 places the delegate's file "in the directory of the event's claims-pass record", and LIVENESS read 2 asks whether each RELEASE "produce[d] a committed record". So naming the home is not a CORRECTION. No referent names it today (§ 1). It also gives the brief a duty, and that is a requirement.
**Class option**: one paragraph in RELEASE-FLOW step 6 that names **every record a release produces at a fixed path**, in one place: the notes, the walk record, the claims pass with its delegate file, the onboarding-trio records and the step-6 record; the release's grant and findings records, the release PR body's pastes and its `CHANGELOG.md` entry are reached through the walk record's rows (Stacy R1, Ada R1). It addresses the class at the release grain (five homes, findable only by memory), not just the claims pass. Site 1a is that paragraph. Cost: the paragraph. The wider class, records that an event rather than a spec fires (ARMING limbs, SYMPTOM's filename, the consumer overlay's RELEASE line), is Stacy's own rule-10 record, filed after this round (Stacy R1, S4), and is not legislated here.
**Amends** (one application PR, Peter-merged):
- `.kiro/hooks/RELEASE-FLOW.md` step 6: one paragraph added after L215 (site 1a), and one clause and one pointer in L45, which is RS-37's interim delegate row (site 1b). **LAW**.
- `canonical/agents/stacy.md` L417, the first sentence (site 2). **LAW**. **Not applied under F-1 (i)** (Stacy R1); **required under F-1 (ii) or (iv)**. Its follow-ons (operative item, overlay pin, a `removals` entry, regeneration, lock) are **EXECUTION**.
- **Not edited**:
  - Ballot `2026-10-01-signing-act-chain` § 5.3 (§ 3.5): its wording already follows the record's home.
  - No register row (§ 3.6).
  - `.kiro/issues/2026-10-26-release-16-1-standards-implications.md`, the RS-50 row's home, is held by another session. Its closing line is owed after the merge (§ 5, step 6).
- **Under F-1 (ii) or (iv) only**: four charters' `writeScope` (Stacy, Ada, Lina, Leonardo), or a per-release grant (F-2). Those sites are **not drafted here**: § 6 F-2 says why, and what that does to ratification.

**Census** (ballots README § "Conventions", "Instrument census"; one line per presumptively in-scope instrument):
- Site 1 (`.kiro/hooks/RELEASE-FLOW.md`). No registered check's command loads RELEASE-FLOW. Three rows' education homes cite it.
  - `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh; row census: none) — site 1 adds a paragraph to step 6 and a clause to item 3a; it adds no command, and changes no rail text, exit code, assertion or verdict; the script reads the registry and $VERSION, never a claims-pass record`
  - `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts; both scopes' census fields) — site 1 is text in the row's education home (steps 5–7) and adds nothing the script reads; the script decides from the commit's tree, its arguments and the registries; no decision in either scope changes`
  - `**Census**: not in scope — signing-act-consistency (verify-signing-chain --ci; census mode --census-routed) — site 1 names the directory of § 5.3's delegate file at RELEASE; --audit writes no file and --ci reads no claims-pass record; no instrument code changes, so the census mode's committed and scratch-diff runs are identical by construction` *(a disclosure: site 1 is not presumptively in this row's scope, since its command does not load RELEASE-FLOW and its education names no RELEASE-FLOW path; Stacy R1)*
  - `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts; census mode --census) — its scope is governance/*.md (the register excluded) and the eight .kiro/steering/*.md files package.json files[] names (check.ts L25–L26); no site edits either`
  - **No line owed**:
    - `release-falsity-floor`, whose education cites RELEASE-FLOW Phase 1, has `checks: []`.
    - `scripts/owed-set.sh` and `scripts/issues-owned.sh` are named in no row's `checks`.
    - Neither script reads a RELEASE record's path. `owed-set.sh` keys on `<spec>/completion/claims-pass.md` exactly (L194). `issues-owned.sh` prints `due:<v>` from the token alone (L147–L149).
- Site 2 (`canonical/agents/stacy.md`; applied only under F-1 (ii) or (iv); these lines follow ballot `2026-10-29-dated-pointer-paths-and-edit-kind-check`'s, which Stacy read):
  - `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts, citing corpus governance/, .kiro/steering/, canonical/; canonical is a CITING_ROOT, L57) — site 2 adds no get_section / get_document_* citation; RELEASE-FLOW (site 1) is outside the citing corpus`
  - `**Census**: not in scope — 122-sweep-1-refs (tools/agent-generator/sweeps/sweep-1-refs.ts) — it resolves canonical id/section refs (law, routes, crossRefs) and shared-catalog source refs, and scans for retired names; site 2 changes prose in one unit, adds no ref and no retired name, and adds, removes or renames no heading`
  - `**Census**: not in scope — 122-canonical-vs-truth (governanceAsLaw mustContain over the asserted sections) — site 2 edits prose in one unit of canonical/agents/stacy.md and no assert declaration; no asserted section is an edit site`
  - `**Census**: not in scope — 122-sweep-2-skills, 122-sweep-4-ambient, 122-sweep-5-corrected-state, 122-sweep-6-declarations, 122-sweep-8-demotion (tools/agent-generator/sweeps/) — they read the skills: field, routes.cues and the ambient members, .web.tsx occurrences, routes.cues and toolSubset, and the replaces: keys; site 2 touches none and its After contains no .web.tsx`
  - `**Census**: not in scope — signing-act-consistency (verify-signing-chain --ci; census mode --census-routed) — no instrument code changes; site 2 changes the bytes of one of Stacy's units (#the-claims-pass-record-claims-passmd-the-template), which the instrument reads as stale until her two acts (§ 5); that is the instrument's input, not its rule`
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — canonical/ is an input-closure root and site 2 is an ordinary closure input; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`

**Cap**: one paragraph and one clause in RELEASE-FLOW; under F-1 (ii) or (iv), also one clause in Stacy's charter and its follow-ons.

**Retroactivity**: none. The four RELEASE records and the 16.1.0 delegate file stay where they are under every option. They are ledgers, and 38 files cite them by path (`git grep -l claims-pass-release` at the base, the records themselves excluded).

> **Conflicts, stated first.**
> - I own RELEASE-FLOW. I also wrote L45's interim, "the output path that brief names", which this ballot replaces (ballot `2026-10-26-release-flow-batch-16-1`, RS-37).
> - I write the delegate's brief under § 5.3, so the path I fix here is the one my own briefs must name.
> - The option I recommend is the one that costs my seat least work, and is also the status quo. Stacy's review and Peter's ruling are the checks.

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

### 3.1 (i) Spec 123's completion directory, fixed (recommended)

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

### 3.2 (ii) A standing release directory

`.kiro/docs/releases/<v>/claims-pass-release-<v>.md`, or `.kiro/releases/<v>/…`. The first follows the precedent of `.kiro/docs/civitas-health-checks/`, a standing record directory for an event that belongs to no spec. The second is a new root.

- **Cost**:
  - **No writing seat holds either path.** R1 and R2 need write scope for Stacy, Ada, Lina and Leonardo, because the delegate rotates. Either:
    - **standing**: four `canonical/agents/**` frontmatter edits. That is LAW, with every affected seat consulted (standing-write-scope ballot § 3). Each adds a `writeScope[…]` row to its seat's consumer dispositions, which needs that seat's signature: at least four first-sign acts, plus site 2's two Stacy acts. Then regeneration and the lock.
    - **or per release**: an issue-row grant (`.kiro/issues/README.md` rule 8) for Stacy and the delegate, filed at every release. Every release already files grant records (for 16.1.0: four, the files, notes, fix-1 and fix-2 grants; for each of 15.0.0 to 16.0.0, a files grant and a lock-refresh grant), so this adds two seats to work a release already does, not a new kind of work (Ada R1). It is still an act someone must remember at every release, and a missed delegate grant blocks the walk, which is § 8's trigger (d).
  - Site 2 is required, because L417's "spec's completion directory" becomes false for RELEASE: two Stacy acts, a `removals` entry and an item split (§ 4 site 2).
  - The four existing records stay in 123 (§ "Retroactivity"). History splits across two homes for good: every reader that walks release records (LIVENESS read 2, R7, Stacy's prior-release reads at each phase 1) carries two roots (Stacy R1).
  - **Timing**: L45 makes the delegate's file owed before phase 1, so under (ii) the delegate creates the release directory before the record it is named after exists (Stacy R1).
  - **Ratifying (ii) needs one more round**, to draft the write-scope or grant sites (F-2).
- **What it breaks**: nothing at runtime.
- **What it gains**: one directory per release, holding only that release's audit and the delegate's file, tied to no spec. Its meaning is the cleanest of the four options.

### 3.3 (iii) The summaries side, `docs/specs/<spec>/` (declined)

It has the "which spec" problem of the orchestrator's (i). It also inverts the two-document split: `docs/specs/` holds the concise summaries, and `.kiro/specs/<spec>/completion/` holds the internal records (Completion Documentation Guide § "Two-Document Workflow"). A claims pass is an internal ledger. No reviewer has argued for it, and no fork is put to Peter on it.

### 3.4 (iv) Beside the step-6 record, `docs/releases/<v>/claims-pass-release-<v>.md`

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

**Anchor** (L215–L217 at `6f23bc6fe`, verbatim; the paragraph goes between L215 and the blank L216, with one blank line before it):

```
   - Until that line exists, the liveness reading is "read, not committed". (RS-9: on 15.0.0 the merged file differed from the one phase 2 read, and only the confirmation line caught it.)

7. **Announce last**: create the GitHub release (`gh release create v<version> --notes-file docs/releases/release-<version>.md`) **only after** step 6's rail PASS and a matching 6b record. Notes must not state a guard as applied before the step that applies it has run (R-3).
```

**After, under F-1 (i)** (inserted text only, three-space indent as step 6's other paragraphs):

```

   **Where a release's records live.** The RELEASE claims pass, both phases and every addendum, is one file, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, whatever specs the release delta carries. Spec 123 is closed (its CLOSEOUT record is `completion/claims-pass.md`), and its completion directory stays the home: the records of 15.0.0 to 16.1.0 are there, and a fixed path names no carrying spec to decide. The delegate's file of ballot `2026-10-01-signing-act-chain` § 5.3 is `delegate-audit-release-<v>-<seat>.md`, in the same directory, with its addenda in it. The release's other records at fixed paths are its notes, `docs/releases/release-<v>.md` (Deriving item 3); its walk record, `.kiro/issues/<date>-release-<v>-walk.md` (item 3a; in `archive/` after phase 1, rule 5); its onboarding-trio records, `tests/onboarding-trio/records/<v>/` (item 6; the trio protocol § 8); and its step-6 record, `docs/releases/<v>/publish-verification.txt` (this step). Its grant and findings records are issue records, and its release PR body's pastes and its `CHANGELOG.md` entry are read where step 2 puts them; the walk record's rows reach each of them. *(added <application date> by ballot 2026-10-29-release-claims-pass-record-home, site 1a)*
```

**After, under F-1 (ii)**: the first three sentences become:

> The RELEASE claims pass, both phases and every addendum, is one file, `.kiro/docs/releases/<v>/claims-pass-release-<v>.md` *(or `.kiro/releases/<v>/…`, F-2)*, whatever specs the release delta carries. The records of 15.0.0 to 16.1.0 stay where they were written, in `.kiro/specs/123-consumer-distribution/completion/`.

The delegate-file sentence and the other-records sentence are unchanged.

**After, under F-1 (iv)**: the same, with `docs/releases/<v>/claims-pass-release-<v>.md` and "beside the step-6 record" after the path.

*Why each part*:
- **"Both phases and every addendum, … one file"**: L205 already says "one file". 16.1.0's pass carried five phase-1 addenda in it.
- **"Whatever specs the release delta carries"**: this is what makes it decidable.
- **The delegate-file sentence** restates § 5.3's consequence at the release, so R2 reads one place. "With its addenda in it": at 16.1.0 the re-read under the trigger-(d) record's item 7 went into the delegate file as a dated addendum (Ada R1).
- **The other-records sentence** is the class option. It names the records at fixed paths, each already law where its item says, and claims no more: grant and findings records have no fixed path, and the PR body's pastes and the `CHANGELOG.md` entry are not files of their own (Stacy R1, Ada R1). Stacy's routing records filed under rule 10 are routing artifacts, not a second home of the pass (Stacy R1, S2).
- **The pointer** is the `added` form; RELEASE-FLOW is a bound path (ballots README L31, "Where the pointer is owed"). `<application date>` is replaced at application by the date of the application PR's merge as its squash commit records it (§ 5 step 2). A literal placeholder left in place reads `pointer-missing` under `edit-kind-pointers.ts`'s `POINTER_RE` (Ada R1).

### Site 1b — `.kiro/hooks/RELEASE-FLOW.md` L45, RS-37's interim delegate row (LAW)

**Before** (L45 at `6f23bc6fe`, verbatim):

```
   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat, the path of Thurgood's brief, and the output path that brief names. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*
```

**After**:

```
   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat; the brief (§ 5.3: Thurgood's, or the orchestrator's when Thurgood's seat cannot write it), as the path of one committed file that states § 5.3's three terms, the PR population, the command and the output path (the brief itself, or the issue record whose item states them), or `brief: none on record` when no committed file states them, which is a finding on the seat that wrote the brief, never on the delegate; and the output path, which is § 5.3's file in the RELEASE record's directory (step 6, "Where a release's records live"); a file committed at any other path does not discharge the row. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-37)* *(amended <application date> by ballot 2026-10-29-release-claims-pass-record-home, site 1b; prior text at `6f23bc6fe`)*
```

*Why*:
- RS-50's record calls this clause the interim ("the walk row name[s] the output path Thurgood's brief names, so the next walk does not wait on this row"). Once the home is named, the brief copies the law instead of being the law.
- **The check lands on the file, not the brief** (Ada R1, A1). A brief that is never committed can name any path, and no reader can tell; Ada's 16.1.0 brief was never committed (her file's header; #514's body), and its output path is on record only in `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md` item 1. A file at the wrong path is visible in git.
- **The brief cell** replaces "the path of Thurgood's brief", which at 16.1.0 named nothing (Ada R1). It meets Stacy's three properties (Stacy R2):
  - it names one committed path;
  - "states" is tested against § 5.3's three terms;
  - `brief: none on record` is its one closed value for a brief given nowhere a reader can find it.
- **At 16.1.0 the cell would read** `.kiro/issues/2026-10-26-signing-chain-delegate-audit-not-run-trigger-d.md`, whose item 1 states all three terms and was on `main` (#507) before Ada's runs (Ada R2). That walk had no delegate row, because RS-37 added it on 2026-10-29.
- **`brief: none on record` is a finding on the briefer, and stops nothing.** The delegate cannot commit someone else's brief, and the walk can be done from law and the record (Ada R2). The briefer may be the orchestrator, because § 5.3 lets it write the brief (Stacy R2, Low). This is my ruling as the brief's author (THURGOOD R3).
- RS-37's pointer stays, and the amendment adds a second pointer beside it, as L205 carries two.

### Site 2 — `canonical/agents/stacy.md` L417, the first sentence (LAW; not applied under F-1 (i), required under (ii) and (iv))

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

- **No pointer**: charters carry none (ballots README L31). The commit that changes this line names this ballot in its message.
- **Under F-1 (i), not applied** (Stacy R1, S1). The sentence is not false, because the record does sit in a spec's completion directory; it is incomplete, because on its own it does not say which spec. Stacy's RELEASE row defers to RELEASE-FLOW for *what phase 1 reads, and at which SHA*, not for where the record lives, so under (i) L417 is complete only because she reads step 6 at every RELEASE (Stacy R1's correction of this bullet). The same unit has two more unnamed homes (SYMPTOM's filename, the consumer overlay's RELEASE line), and each edit of the unit costs her two acts, so she spends them once on the class, through her own rule-10 record.
- **Under (ii) and (iv)**, the sentence is false without the clause, so site 2 is owed.
- **Follow-ons** (EXECUTION, Thurgood, authoring, under the grant):
  - **Operative item** `record-committed`, `canonical/operative-sets/stacy.yaml` L548–L551 at `6f23bc6fe`:

```
      - id: record-committed
        kind: obligation
        label: "Every pass is a committed record"
        text: "Every pass produces a committed record in the spec's completion directory."
```

The item's `text` must be a span the consumer rendering contains whole, because the C18 floor credits an item only when its complete `text` occurs in the rendered unit (`triviality.ts` header), and the overlay keeps the clause-free sentence. So the RELEASE clause is accounted as a removal, and the item is split or re-worded so that what survives for consumers is credited (Stacy R1). The split is my authoring and Lina's model, drafted at the extra round with F-2's sites. Its unit's `canonicalHash` (L546) is Stacy's to move (§ 5, act 1).
  - **Overlay pin**, `canonical/profiles/consumer/stacy.overlay.md` L84 at `6f23bc6fe`:

```
## @unit #the-claims-pass-record-claims-passmd-the-template @ sha256:3c2a1c1fe5b77b2b69d2f6d60ec50aa5f6126d23380911bd38b33a8f9bb0db04
```

The pin's hash moves to the new unit hash, and the overlay's text is unchanged. A consumer project has no RELEASE-FLOW, so the clause does not go into its rendering.
  - **A `removals` entry is owed** (Stacy R1): the unit's consumer row is `re-pointed`, and every span its rendering drops is accounted in its signed `removals` (six at the base); the nearest precedent is the owed-set unit's row, which records its dropped `.kiro/hooks/RELEASE-FLOW.md` as `subtraction-1`. Stacy will not assent to a rendering that drops a canonical clause with no entry. The entry is my authoring, before her re-sign. No check enforces it mechanically (Stacy R1, by grep); whether one should is Lina's L1.
  - **Regeneration, then `canonical/generated.lock`**, by a full-run-green `check:122:diff-guard`.
  - **Expected**: `git diff --stat <base> -- canonical/_consumer-output/` is empty apart from attribution files. If it is not, the application stops and reports.

## 5. Application (after the Status commit)

1. **The Status commit** (record-first, ballot only): `**Status**: **RATIFIED (Peter, <date>)**`, with his words, their clock bound, and his F-1 (and F-2) answers.
2. **Thurgood, the application PR** (branch `chore/apply-release-claims-pass-record-home`), in one authoring commit:
   - sites 1a and 1b, under the ruled F-1;
   - under F-1 (ii) or (iv) only, site 2's text and follow-ons, with `signature` and the `canonicalHash` values untouched.

   `<application date>` in sites 1a and 1b is the date of the application PR's merge as its squash commit records it (the rule #491 and #550 followed; Ada R1, A5).

   Then, if site 2 is applied, a regeneration commit, with no lock. Each commit message names this ballot.
3. **Stacy's C1 acts**, only if site 2 is applied (F-1 (ii) or (iv)). Each is its own commit, in her seat, after step 2 and before the lock. Merge-only, never amended:
   1. re-confirm `#the-claims-pass-record-claims-passmd-the-template` (its `canonicalHash` moves);
   2. re-sign it (the `signature`'s `canonicalHash` moves; her `assent` re-judges `record-committed`).

   **Act count**:
   - F-1 (i): **0** (site 2 not applied; Stacy R1).
   - F-1 (ii) or (iv): **2 + at least 4** (§ 3.2), drafted at the extra round.
4. **Thurgood**: the lock refreshed (full-run-green, then no-op-green), if site 2 is applied.
5. **Checks**, each pasted in the PR body with its result:
   - `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci` (stale 0, unsigned-routed 0, PASS);
   - `npm run test:scripts`;
   - `npm run test:agent-generator`;
   - `npm test`;
   - `npm run -s check:section-citations`;
   - `node scripts/validate-steering-metadata.js`;
   - if site 2 is applied, `git diff --stat <base> -- canonical/_consumer-output/`, expected empty apart from attribution files;
   - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: RELEASE-FLOW `ok`; under (ii) or (iv), `canonical/agents/stacy.md` `ok` (no pointer). The check gives one verdict per file and any added line with a dated pointer satisfies it, and site 1b's rewritten L45 keeps RS-37's pointer, so its `ok` does not prove site 1b's new pointer: that pointer is read by hand at application (Stacy R1).
6. **Straggler sweep**, case-sensitive, over `.kiro/hooks/RELEASE-FLOW.md canonical/agents canonical/profiles/consumer .kiro/steering governance`, with the hits expected after the edit:
   - `the output path that brief names`: none.
   - `Where a release's records live`: RELEASE-FLOW only (sites 1a and 1b); site 2, if applied, names step 6, not the paragraph.
   - `claims-pass-release-`: RELEASE-FLOW site 1a, and `governance/classification-map.md` L945, a pre-existing history entry of `publish-rail-guard` citing `completion/claims-pass-release-15.1.0.md` (RL-7, #353), a ledger citation that is left as it is. At the base the sweep's roots give `governance/classification-map.md:1` and RELEASE-FLOW 0 (Stacy R1). Any other hit stops the application.
7. **Owed after merge**:
   - A dated vehicle-and-close line on RS-50, in `.kiro/issues/2026-10-26-release-16-1-standards-implications.md`, by that record's holder.
   - The next delegate brief names site 1a's path.
   - No `rebuild_index`: no site is in `governance/`, the docs MCP's corpus (`mcp-server/src/index.ts` L61).
8. **The PR body carries**:
   - `**Edit kind**: .kiro/hooks/RELEASE-FLOW.md — LAW (.kiro/docs/ballots/2026-10-29-release-claims-pass-record-home.md)`
   - if site 2 is applied: `**Edit kind**: canonical/agents/stacy.md — LAW (.kiro/docs/ballots/2026-10-29-release-claims-pass-record-home.md)`
   - the grant below and its path list;
   - the `**Consulted**:` line;
   - the census lines, re-run at the PR's base.

**Grant (activated by this ratification)**: Peter's ratification grants, until the application PR merges:
- **Thurgood**: `.kiro/hooks/RELEASE-FLOW.md` is already his. If site 2 is applied (F-1 (ii) or (iv)), he also gets:
  - `canonical/agents/stacy.md` (site 2's sentence, byte for byte);
  - `canonical/operative-sets/stacy.yaml` (the `record-committed` item and the split § 4 site 2 owes, drafted at the extra round);
  - `canonical/profiles/consumer/stacy.overlay.md` (the L84 pin only);
  - `canonical/profiles/consumer/stacy.dispositions.yaml` (the `removals` entry § 4 site 2 owes, on that row only; never its `signature`);
  - `canonical/generated.lock` and the generator's outputs.
- **Not granted**:
  - C1 acts need no grant (signing-act ballot M1).
  - No `.github/**` path is touched, so no `**ARMING**:` line is owed.
  - Under F-1 (ii) or (iv), the write-scope or grant sites need their own text at the extra round.
- As `.kiro/issues/README.md` rule 8 has it for a grant, the application PR's body names this grant and cites its path list, and an out-of-list edit is a claims-pass finding.

## 6. Forks for Peter

**Open for Peter**: F-1 — where a RELEASE claims-pass record lives from the next release on: **(i)** `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, fixed, where all four records already are (recommended: site 1 only; site 2 not applied under (i) (Stacy R1), zero seat acts; Stacy and Ada both lean (i)); **(ii)** a standing `.kiro/docs/releases/<v>/` directory (or `.kiro/releases/<v>/`); or **(iv)** `docs/releases/<v>/`, beside the step-6 record. (iii) `docs/specs/` is declined (§ 3.3). Under every option the filename is `claims-pass-release-<v>.md`, and the delegate's file sits beside it.

**Open for Peter**: F-2, **only if F-1 is (ii) or (iv)** — how Stacy and the rotating delegate (Ada, Lina, Leonardo) get write access to the new path: **standing** write scope (four charter edits, LAW, each seat consulted, at least six acts in all, and one more drafting round before ratification), or a **per-release grant** record for the two writing seats at each release (no charter edit, but a record every release). Under (ii), also: `.kiro/docs/releases/` (my lean, after the `civitas-health-checks/` precedent) or `.kiro/releases/`.

*Why F-2's sites are not drafted here*: drafting four frontmatter blocks, their dispositions rows and their census lines for an option I do not recommend would spend the round on text that will probably never apply. If Peter rules (ii) or (iv), I draft them at R2 and the seats read them before ratification. That costs one round, which I am saying plainly here.

## 7. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: F-1 (i), sites 1a and 1b; site 2 not applied (Stacy R1).

**Counter-arguments, run against it, and what they changed**:
- **(1) "A carrier-dependent home ('the releasing spec') is undecidable."** This changed (i) from the orchestrator's carrier form into a **fixed path**. The home asks no judgment, and no closure of any spec can break it.
- **(2) "A closed spec's directory is a strange home, and the next reader will ask why 123."** This added the sentence that says why (Spec 123 is closed and the directory stays; every record so far is there), and the class-option sentence listing a release's records at fixed paths. The reader no longer has to know the history.
- **(3) "(ii) has the cleanest meaning."** I checked what it costs, and that changed § 3.2: no writing seat holds the path, so (ii) needs four charter edits or a grant every release. It also splits history across two homes, because the records are ledgers and stay. At R1, Ada's fold-back made § 3.2 weigh the grant route against the grants every release already files; her lean stayed (i).
- **(4) "Site 2 is cheap honesty."** Stacy started there and moved: the unit has two more unnamed homes, so site 2 is deferred to one edit of the class (Stacy R1).

**What survives**:
- **Meaning**: under (i), a closed spec's completion directory grows by about two files per release, with audits of deltas that are not 123's. A reader of that directory has to know that `claims-pass-release-*` files are not 123's own.
- **Coupling**: the home holds only as long as 123's directory is never moved or archived. It is weaker than it first looked, because any mover already sweeps `claims-pass-release` for the 38 citing files, but it is not zero: the mover could re-home the ledgers and miss that one hit is a rule, and no instrument would catch it (Stacy R1, Ada R1).
- **A fork remains**: (i) prefers findability and zero cost, (ii) prefers meaning and independence from any spec. Both can be defended, and the choice is Peter's.
- **L417 without site 2** (Stacy R1): until her class record's fix lands, L417 does not on its own tell a reader where a RELEASE record lives. A delegate, or a later Stacy session that does not open step 6 first, could guess "the releasing spec". The guard is her habit of reading step 6 at every RELEASE, the same memory-only dependence RS-50 removes, now at one sentence instead of one rule.

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

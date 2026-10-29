# Ballot Measure: where a RELEASE claims-pass record lives once Spec 123 closes (RS-50)

**Date**: 2026-10-29
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/hooks/RELEASE-FLOW.md`, and of the RS queue's standards side), at Peter's go, chat, relayed by the orchestrator, 2026-10-29, verbatim: *"Continue with the remaining items."* RS-50 is one of those items. Drafter's clock at the start of drafting: 2026-10-29T05:21:13Z (`date -u`).
**Status**: **DRAFT**
**Base**: `6f23bc6fe` (#549). Every Before block below was cut from that SHA by `git show 6f23bc6fe:<path> | sed -n <L>p`, and is byte-exact.
**Required reviewer**: **Stacy**. The record is hers, and she writes both phases into it. Site 2 is her charter, and the acts it costs are hers. She is also the census reader.
**Reviewers**:
- **Ada**: the first delegate under signing-act ballot § 5.3, whose output path this ballot fixes. She is also the release's packaging seat, whose step-6 PR the new paragraph sits next to.
- **Lina**, only if site 2 is applied: it may need a `removals` entry in her generator's dispositions model (§ 8, L1). Also only if F-1 (ii) or (iv) is ruled: her own write scope would move.
- **Leonardo**, only under F-1 (ii) or (iv): his write scope would move, because he is the third delegate in the rotation.
**Consulted**: Stacy — <pending R1: the home, site 2 (apply or not; her acts), the census lines, the ARMING question>; Ada — <pending R1: the delegate file's path under each option>
**Class**: LAW. A home is a rule that two other rules key on: § 5.3 places the delegate's file "in the directory of the event's claims-pass record", and LIVENESS read 2 asks whether each RELEASE "produce[d] a committed record". So naming the home is not a CORRECTION. No referent names it today (§ 1). It also gives the brief a duty, and that is a requirement.
**Class option**: one paragraph in RELEASE-FLOW step 6 that names **every record a release produces**, in one place: the notes, the walk record, the claims pass with its delegate file, and the step-6 record. It addresses the class at the release grain (four homes, findable only by memory), not just the claims pass. Site 1a is that paragraph. Cost: the paragraph. The wider class, records that an event rather than a spec fires, is put to Stacy as a question (§ 8, S4) and is not legislated here.
**Amends** (one application PR, Peter-merged):
- `.kiro/hooks/RELEASE-FLOW.md` step 6: one paragraph added after L215 (site 1a), and one clause and one pointer in L45, which is RS-37's interim delegate row (site 1b). **LAW**.
- `canonical/agents/stacy.md` L417, the first sentence (site 2). **LAW**. It is **Stacy's call under F-1 (i)**, and **required under F-1 (ii) or (iv)**. Its follow-ons (operative item, overlay pin, any `removals` entry, regeneration, lock) are **EXECUTION**.
- **Not edited**:
  - Ballot `2026-10-01-signing-act-chain` § 5.3 (§ 3.5): its wording already follows the record's home.
  - No register row (§ 3.6).
  - `.kiro/issues/2026-10-26-release-16-1-standards-implications.md`, the RS-50 row's home, is held by another session. Its closing line is owed after the merge (§ 5, step 6).
- **Under F-1 (ii) or (iv) only**: four charters' `writeScope` (Stacy, Ada, Lina, Leonardo), or a per-release grant (F-2). Those sites are **not drafted here**: § 6 F-2 says why, and what that does to ratification.

**Census** (ballots README § "Conventions", "Instrument census"; one line per presumptively in-scope instrument):
- Site 1 (`.kiro/hooks/RELEASE-FLOW.md`). No registered check's command loads RELEASE-FLOW. Three rows' education homes cite it.
  - `**Census**: not in scope — publish-rail-guard (scripts/verify-publish-rail.sh; row census: none) — site 1 adds a paragraph to step 6 and a clause to item 3a; it adds no command, and changes no rail text, exit code, assertion or verdict; the script reads the registry and $VERSION, never a claims-pass record`
  - `**Census**: not in scope — hermetic-publish-path (scripts/release-publish.ts; both scopes' census fields) — site 1 is text in the row's education home (steps 5–7) and adds nothing the script reads; the script decides from the commit's tree, its arguments and the registries; no decision in either scope changes`
  - `**Census**: not in scope — signing-act-consistency (verify-signing-chain --ci; census mode --census-routed) — site 1 names the directory of § 5.3's delegate file at RELEASE; --audit writes no file and --ci reads no claims-pass record; no instrument code changes, so the census mode's committed and scratch-diff runs are identical by construction`
  - `**Census**: not in scope — section-citation-resolution (scripts/check-section-citations.ts, citing corpus governance/, .kiro/steering/, canonical/) — RELEASE-FLOW is outside the citing corpus, and site 2 adds no get_section / get_document_* citation`
  - `**Census**: not in scope — governance-examples (scripts/governance-examples/check.ts; census mode --census) — its scope is governance/*.md, and no site edits a governance/ doc`
  - **No line owed**:
    - `release-falsity-floor`, whose education cites RELEASE-FLOW Phase 1, has `checks: []`.
    - `scripts/owed-set.sh` and `scripts/issues-owned.sh` are named in no row's `checks`.
    - Neither script reads a RELEASE record's path. `owed-set.sh` keys on `<spec>/completion/claims-pass.md` exactly (L194). `issues-owned.sh` prints `due:<v>` from the token alone (L147–L149).
- Site 2 (`canonical/agents/stacy.md`; these lines follow ballot `2026-10-29-dated-pointer-paths-and-edit-kind-check`'s, which Stacy read):
  - `**Census**: not in scope — 122-sweep-1-refs (tools/agent-generator/sweeps/sweep-1-refs.ts) — it resolves canonical id/section refs (law, routes, crossRefs) and shared-catalog source refs, and scans for retired names; site 2 changes prose in one unit, adds no ref and no retired name, and adds, removes or renames no heading`
  - `**Census**: not in scope — 122-canonical-vs-truth (governanceAsLaw mustContain over the asserted sections) — site 2 edits prose in one unit of canonical/agents/stacy.md and no assert declaration; no asserted section is an edit site`
  - `**Census**: not in scope — 122-sweep-2-skills, 122-sweep-4-ambient, 122-sweep-5-corrected-state, 122-sweep-6-declarations, 122-sweep-8-demotion (tools/agent-generator/sweeps/) — they read the skills: field, routes.cues and the ambient members, .web.tsx occurrences, routes.cues and toolSubset, and the replaces: keys; site 2 touches none and its After contains no .web.tsx`
  - `**Census**: not in scope — signing-act-consistency (verify-signing-chain --ci; census mode --census-routed) — no instrument code changes; site 2 changes the bytes of one of Stacy's units (#the-claims-pass-record-claims-passmd-the-template), which the instrument reads as stale until her two acts (§ 5); that is the instrument's input, not its rule`
  - `**Census**: not in scope — 122-diff-guard (tools/agent-generator/diff-guard.ts) — canonical/ is an input-closure root and site 2 is an ordinary closure input; no rule, pattern or grammar changes; the lock is refreshed at application, where its verdict is read`

**Cap**: one paragraph and one clause in RELEASE-FLOW, plus, if applied, one clause in Stacy's charter and its follow-ons.

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
  - No charter edit is required (site 2 is Stacy's call).
  - **Zero seat acts** if site 2 is not applied, and two Stacy acts if it is.
- **What it breaks**: nothing any reader in § 2 runs.
- **What it costs in meaning**:
  - A closed spec's completion directory keeps growing (243 files at the base, about two per release), with audits of deltas that are not 123's.
  - A SYMPTOM audit of 123 reads its completion docs by the `task-<N>…-completion.md` pattern (`scripts/completion-claims/completion-doc.ts` L61–L76), which these files do not match.
  - If a later ballot moves or archives 123's directory, this home moves with it, and that ballot has to say so.
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
    - **or per release**: an issue-row grant (`.kiro/issues/README.md` rule 8) for Stacy and the delegate, filed at every release. That is the pattern Ada's step-6 PRs already use for `docs/releases/<v>/**`.
  - Site 2 is required, because L417's "spec's completion directory" becomes false for RELEASE.
  - The four existing records stay in 123 (§ "Retroactivity"). History splits across two homes, and R7's glob needs a second root.
  - **Ratifying (ii) needs one more round**, to draft the write-scope or grant sites (F-2).
- **What it breaks**: nothing at runtime.
- **What it gains**: one directory per release, holding only that release's audit and the delegate's file, tied to no spec. Its meaning is the cleanest of the four options.

### 3.3 (iii) The summaries side, `docs/specs/<spec>/` (declined)

It has the "which spec" problem of the orchestrator's (i). It also inverts the two-document split: `docs/specs/` holds the concise summaries, and `.kiro/specs/<spec>/completion/` holds the internal records (Completion Documentation Guide § "Two-Document Workflow"). A claims pass is an internal ledger. No reviewer has argued for it, and no fork is put to Peter on it.

### 3.4 (iv) Beside the step-6 record, `docs/releases/<v>/claims-pass-release-<v>.md`

RS-50's record listed this one first, as its (a).

- **Cost**: the same write-scope cost as (ii). No seat holds `docs/releases/**` standing; Ada writes there under per-release grants. Site 2 is required.
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

   **Where a release's records live.** The RELEASE claims pass, both phases and every addendum, is one file, `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, whatever specs the release delta carries. Spec 123 is closed (its CLOSEOUT record is `completion/claims-pass.md`), and its completion directory stays the home: the records of 15.0.0 to 16.1.0 are there, and a fixed path names no carrying spec to decide. The delegate's file of ballot `2026-10-01-signing-act-chain` § 5.3 is `delegate-audit-release-<v>-<seat>.md`, in the same directory. The release's other records are its notes, `docs/releases/release-<v>.md` (Deriving item 3); its walk record, `.kiro/issues/<date>-release-<v>-walk.md` (item 3a); and its step-6 record, `docs/releases/<v>/publish-verification.txt` (this step). *(added <application date> by ballot 2026-10-29-release-claims-pass-record-home, site 1a)*
```

**After, under F-1 (ii)**: the first three sentences become:

> The RELEASE claims pass, both phases and every addendum, is one file, `.kiro/docs/releases/<v>/claims-pass-release-<v>.md` *(or `.kiro/releases/<v>/…`, F-2)*, whatever specs the release delta carries. The records of 15.0.0 to 16.1.0 stay where they were written, in `.kiro/specs/123-consumer-distribution/completion/`.

The delegate-file sentence and the other-records sentence are unchanged.

**After, under F-1 (iv)**: the same, with `docs/releases/<v>/claims-pass-release-<v>.md` and "beside the step-6 record" after the path.

*Why each part*:
- **"Both phases and every addendum, … one file"**: L205 already says "one file". 16.1.0's pass carried five phase-1 addenda in it.
- **"Whatever specs the release delta carries"**: this is what makes it decidable.
- **The delegate-file sentence** restates § 5.3's consequence at the release, so R2 reads one place.
- **The other-records sentence** is the class option: it lists the four homes a release's reader otherwise holds in memory. Each one is already law where its item says, and this sentence only collects them.
- **The pointer** is the `added` form; RELEASE-FLOW is a bound path (ballots README L32, "Where the pointer is owed"). The date is the date the text lands. A literal date written now would be false if the application lands later.

### Site 1b — `.kiro/hooks/RELEASE-FLOW.md` L45, RS-37's interim delegate row (LAW)

**Before** (L45 at `6f23bc6fe`, verbatim):

```
   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat, the path of Thurgood's brief, and the output path that brief names. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-37)*
```

**After**:

```
   **The delegate audit is owed before phase 1** (ballot `2026-10-01-signing-act-chain` § 5.3, whose rotation and backlog clauses name the seat and the population). The walk record carries one row for it, which is not a record row: the delegate seat, the path of Thurgood's brief, and the output path, which is § 5.3's file in the RELEASE record's directory (step 6, "Where a release's records live"); the brief names that path and no other. Its disposition is `owed` until the seat commits that file, then the file's path @ SHA. The orchestrator dispatches the seat (§ 5.3). A file not committed when phase 1 runs is § 8's trigger (d) at this release. *(added 2026-10-29 by ballot 2026-10-26-release-flow-batch-16-1, RS-37)* *(amended <application date> by ballot 2026-10-29-release-claims-pass-record-home, site 1b; prior text at `6f23bc6fe`)*
```

*Why*:
- RS-50's record calls this clause the interim ("the walk row name[s] the output path Thurgood's brief names, so the next walk does not wait on this row"). Once the home is named, the brief copies the law instead of being the law.
- "And no other" gives the walk row something to check: a brief that names a different path is a finding, not a second home.
- RS-37's pointer stays, and the amendment adds a second pointer beside it, as L205 carries two.

### Site 2 — `canonical/agents/stacy.md` L417, the first sentence (LAW; Stacy's call under F-1 (i), required under (ii) and (iv))

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

- **No pointer**: charters carry none (ballots README L32). The commit that changes this line names this ballot in its message.
- **Under F-1 (i)**, the sentence without this clause is true, because the home *is* a spec's completion directory. But it is true only if you read RELEASE-FLOW, which Stacy's RELEASE row already defers to ("What phase 1 reads, and at which SHA, is RELEASE-FLOW step 6's Phase 1 bullet, not restated here"). Whether her charter should say so itself is hers to decide (§ 8, S1).
- **Under (ii) and (iv)**, the sentence is false without the clause, so site 2 is owed.
- **Follow-ons** (EXECUTION, Thurgood, authoring, under the grant):
  - **Operative item** `record-committed`, `canonical/operative-sets/stacy.yaml` L548–L551 at `6f23bc6fe`:

```
      - id: record-committed
        kind: obligation
        label: "Every pass is a committed record"
        text: "Every pass produces a committed record in the spec's completion directory."
```

The item's `text` becomes the After sentence. Its unit's `canonicalHash` (L546) is Stacy's to move (§ 5, act 1).
  - **Overlay pin**, `canonical/profiles/consumer/stacy.overlay.md` L84 at `6f23bc6fe`:

```
## @unit #the-claims-pass-record-claims-passmd-the-template @ sha256:3c2a1c1fe5b77b2b69d2f6d60ec50aa5f6126d23380911bd38b33a8f9bb0db04
```

The pin's hash moves to the new unit hash, and the overlay's text is unchanged. A consumer project has no RELEASE-FLOW, so the clause does not go into its rendering.
  - **The `removals` question** (§ 8, L1 and S1): the unit's consumer row is `re-pointed`, with signed `removals` listing what the overlay drops. Whether the dropped clause needs its own `removals` entry, which would be my authoring before Stacy's re-sign, is Lina's model and Stacy's assent. I have not decided it.
  - **Regeneration, then `canonical/generated.lock`**, by a full-run-green `check:122:diff-guard`.
  - **Expected**: `git diff --stat <base> -- canonical/_consumer-output/` is empty apart from attribution files. If it is not, the application stops and reports.

## 5. Application (after the Status commit)

1. **The Status commit** (record-first, ballot only): `**Status**: **RATIFIED (Peter, <date>)**`, with his words, their clock bound, and his F-1 (and F-2) answers.
2. **Thurgood, the application PR** (branch `chore/apply-release-claims-pass-record-home`), in one authoring commit:
   - sites 1a and 1b, under the ruled F-1;
   - site 2's text and follow-ons, if applied, with `signature` and the `canonicalHash` values untouched.

   Then a regeneration commit, with no lock. Each commit message names this ballot.
3. **Stacy's C1 acts**, only if site 2 is applied. Each is its own commit, in her seat, after step 2 and before the lock. Merge-only, never amended:
   1. re-confirm `#the-claims-pass-record-claims-passmd-the-template` (its `canonicalHash` moves);
   2. re-sign it (the `signature`'s `canonicalHash` moves; her `assent` re-judges `record-committed`).

   **Act count**:
   - F-1 (i) without site 2: **0**.
   - F-1 (i) with site 2: **2**.
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
   - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <this PR>`: RELEASE-FLOW `ok` (both pointers), `canonical/agents/stacy.md` `ok` (no pointer).
6. **Straggler sweep**, case-sensitive, over `.kiro/hooks/RELEASE-FLOW.md canonical/agents canonical/profiles/consumer .kiro/steering governance`, with the hits expected after the edit:
   - `the output path that brief names`: none.
   - `Where a release's records live`: RELEASE-FLOW (sites 1a and 1b), and, if site 2 is applied, nothing (site 2 names step 6, not the paragraph).
   - `claims-pass-release-`: RELEASE-FLOW site 1a only, among law files.
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
- **Thurgood**: `.kiro/hooks/RELEASE-FLOW.md` is already his. If site 2 is applied, he also gets:
  - `canonical/agents/stacy.md` (site 2's sentence, byte for byte);
  - `canonical/operative-sets/stacy.yaml` (the `record-committed` item's `text` only);
  - `canonical/profiles/consumer/stacy.overlay.md` (the L84 pin only);
  - `canonical/profiles/consumer/stacy.dispositions.yaml` (a `removals` entry on that row only, if § 8 L1/S1 says one is owed; never its `signature`);
  - `canonical/generated.lock` and the generator's outputs.
- **Not granted**:
  - C1 acts need no grant (signing-act ballot M1).
  - No `.github/**` path is touched, so no `**ARMING**:` line is owed.
  - Under F-1 (ii) or (iv), the write-scope or grant sites need their own text at the extra round.
- As `.kiro/issues/README.md` rule 8 has it for a grant, the application PR's body names this grant and cites its path list, and an out-of-list edit is a claims-pass finding.

## 6. Forks for Peter

**Open for Peter**: F-1 — where a RELEASE claims-pass record lives from the next release on: **(i)** `.kiro/specs/123-consumer-distribution/completion/claims-pass-release-<v>.md`, fixed, where all four records already are (recommended: site 1 only; zero seat acts unless Stacy wants site 2, then two); **(ii)** a standing `.kiro/docs/releases/<v>/` directory (or `.kiro/releases/<v>/`); or **(iv)** `docs/releases/<v>/`, beside the step-6 record. (iii) `docs/specs/` is declined (§ 3.3). Under every option the filename is `claims-pass-release-<v>.md`, and the delegate's file sits beside it.

**Open for Peter**: F-2, **only if F-1 is (ii) or (iv)** — how Stacy and the rotating delegate (Ada, Lina, Leonardo) get write access to the new path: **standing** write scope (four charter edits, LAW, each seat consulted, at least six acts in all, and one more drafting round before ratification), or a **per-release grant** record for the two writing seats at each release (no charter edit, but a record every release). Under (ii), also: `.kiro/docs/releases/` (my lean, after the `civitas-health-checks/` precedent) or `.kiro/releases/`.

*Why F-2's sites are not drafted here*: drafting four frontmatter blocks, their dispositions rows and their census lines for an option I do not recommend would spend the round on text that will probably never apply. If Peter rules (ii) or (iv), I draft them at R2 and the seats read them before ratification. That costs one round, which I am saying plainly here.

## 7. Recommendation, counter-argument (fold-back applied), residual

**Recommendation**: F-1 (i), sites 1a and 1b, with site 2 left to Stacy's R1.

**Counter-arguments, run against it, and what they changed**:
- **(1) "A carrier-dependent home ('the releasing spec') is undecidable."** This changed (i) from the orchestrator's carrier form into a **fixed path**. The home asks no judgment, and no closure of any spec can break it.
- **(2) "A closed spec's directory is a strange home, and the next reader will ask why 123."** This added the sentence that says why (Spec 123 is closed and the directory stays; every record so far is there), and the class-option sentence listing all four of a release's records. The reader no longer has to know the history.
- **(3) "(ii) has the cleanest meaning."** I checked what it costs, and that changed § 3.2: no writing seat holds the path, so (ii) needs four charter edits or a grant every release. It also splits history across two homes, because the records are ledgers and stay.

**What survives**:
- **Meaning**: under (i), a closed spec's completion directory grows by about two files per release, with audits of deltas that are not 123's. A reader of that directory has to know that `claims-pass-release-*` files are not 123's own.
- **Coupling**: the home holds only as long as 123's directory is never moved or archived. A later reorganisation (Spec 131 is the one in sight) has to carry this home with it, and it will only do so if someone notices this sentence.
- **A fork remains**: (i) prefers findability and zero cost, (ii) prefers meaning and independence from any spec. Both can be defended, and the choice is Peter's.
- **Site 2 under (i)** (Stacy's call): leaving it out keeps her charter's sentence true only through RELEASE-FLOW. Putting it in costs her two acts and possibly a `removals` entry, for a reader who already defers to RELEASE-FLOW at RELEASE.

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

# Ballot Measure: B-U4 — the audience banners and the release recipe

**Date**: 2026-10-13
**Drafted by**: Thurgood (Opus), PRIMARY on Spec 123 Task 24
**Status**: DRAFT. Two sections, ratifiable separately (§ 3, § 4), each with its own section-status line.
**Ratification form**: **(r1), ruled.** Peter's merge of U4's unit PR ratifies both sections (PR-atomic, the B-U3 form). A record-only follow-up after the merge stamps this line and both section-status lines `RATIFIED (Peter, <date>) — merge <sha>`, and adds this ballot's entry to `.kiro/docs/ballots/README.md` § "Ballots on record" (§ 2).
**Rulings applied** (2026-10-13): Peter, "All as recommended with class options" — record `.kiro/specs/123-consumer-distribution/completion/u4-rulings-2026-10-13.md` (`67587cf49`).
- Item 3: this ballot is U4's first content commit (`757803488`).
- Item 4: form (r1); the (r2) text is struck.
- Item 5: R-1 "every release gets an entry" and R-2 "a record, not a gate" are confirmed.
- Item 6: Req 20.7's fork is resolved as (B).
- Item 2: `.kiro/hooks/RELEASE-FLOW.md` joins Task 24's Primary Artifacts, so F-1 and F-2 are no longer conditional.
**Edits it governs**:
- § 3: the banner on every `governance/*.md` doc that matches predicate v1, plus the two declared docs (§ 3 item 2) (Task 23.2).
- § 4: `governance/release-management-system.md` below its banner, and `.kiro/hooks/RELEASE-FLOW.md` (§ 5, F-sites) (Task 24.2).
**Origin**:
- Spec 123 Task 24, criterion "B-U4 is RATIFIED before its edits apply. It carries the trio obligation (23.7) and the recurring changelog step (21.2)" (`tasks.md` @ `cdb8296fa`, L1472).
- DD13's split: "B-U4 (the release recipe)" (`tasks.md` L378; design DD13, L1095).
- The governance carve-out "U4 (B-U4; banners)" (`tasks.md` L130).
- Reqs 20, 21.2 and 23.7; design DD16.
**Unit**: rides `task/123-u4-content`, and reaches `main` at U4's Peter-merged unit PR. U4 rides release 4.

---

## 1. What this ballot carries, and what it does not

**It carries two governance-text changes, each with its own why:**
- **§ 3 Banners**: the audience-framing convention applied to the served governance corpus. It is light, like B-U3. It records the convention, its membership rule, its declared limit and the review form. **There is no vote per banner.**
- **§ 4 Release recipe**: two recurring release steps that Spec 123 creates but cannot keep alive after it closes. One is the consumer `CHANGELOG.md` entry (Req 21.2, decided by DD16). The other is the persona trio re-run (Req 23.7, which calls its recipe home "a ballot-measure change").

**It does not carry:**
- the banner code (`scripts/audience-banner/**`, built directly under Task 23's row grant; code, not law);
- the per-doc banner text (Task 23.2, under § 3's rules);
- the trio's protocol and fixtures (Task 25, U5);
- the committed record that tracks the trio obligation (Task 28.4).

## 2. Order — this ballot precedes every U4 governance-text commit

**The governed set G**: every commit on `task/123-u4-content` that changes the text of a `governance/*.md` file or of `.kiro/hooks/RELEASE-FLOW.md`. Merges of `main` into the branch are excluded.

```
git rev-list --no-merges $(git merge-base HEAD origin/main)..HEAD -- 'governance/*.md' .kiro/hooks/RELEASE-FLOW.md
```

**State at drafting** (verified): `git diff --name-only 8007105fa HEAD -- governance/` → empty at `dc15b74c9`, so no governance-text commit precedes this ballot.

**Instrument (r1, ruled)**:
- For every `c` in G, `git merge-base --is-ancestor 757803488 <c>` succeeds (`757803488` is this ballot's adding commit).
- Ratification is Peter's merge of U4's PR. **After the merge**, the `Status` line and the two section-status lines are stamped `RATIFIED (Peter, <date>) — merge <sha>` in a record-only follow-up, together with this ballot's entry in `.kiro/docs/ballots/README.md` § "Ballots on record". Otherwise `main` carries a governing ballot that reads DRAFT, which is B-U3's current state.

*(The (r2) instrument is struck — Peter's ruling, item 4, 2026-10-13. Its text stands in this ballot's adding commit, `757803488`.)*

**One file is shared** (Task 24 instruments O-4, ruled): `governance/release-management-system.md`.
- Task 23.2's commit replaces L11 only (its banner).
- Task 24.2's commits change only L13–54. Only 24.2 changes the `Last Reviewed` and `Last Updated` lines L14–15.
- The two never hold uncommitted edits to the file at the same time.
- **Separability check**: `git show -U0 --format= <c> -- governance/release-management-system.md` for each `c` in G. Every hunk falls inside one parent's range.

## 3. § Banners (separately ratifiable)

**§ 3 status**: DRAFT

**Why.** Req 20 (gate 4a, ruled): the governance corpus ships whole and MCP-served (20.1). A consumer's agent fetching a doc that carries DesignerPunk's own authorities (its merge rules, its ballots, its CI, its components' readiness) can take those authorities as its own. The banner tells it at the top what is DesignerPunk's worked example and what is transferable (20.8). One mechanism serves both the consumer and the reference-mode reader.

**What is ratified**:
1. **The versioned convention is `scripts/audience-banner/predicate.ts`, convention v1** (added by Task 23.1, `2325166f5`). It is the one place that holds:
   - **the membership predicate**: Ada's text, byte-exact (`PREDICATE_VERSION = 1`, `SCAN_SCOPE = 'governance/*.md'`, `PREDICATE_STRINGS`: `complete-task\.sh`, `Peter merges`, `RATIFIED`, `ballot`). **The set is the predicate's output, never a list.** Extending the predicate is a version bump, decided by Ada with a re-measured count. Ada confirmed v1 unextended at 23.1.
   - **the under-inclusion header**, carried in the module's own text (Req 20.3): the predicate is a lexical deny-list, and a doc can carry repo-internal authority with none of the four strings. Its failure direction is the safe one for a presence guard: a missed doc ships unbannered, which is the status quo, and is never certified bannered.
   - **the template and its recogniser** (`renderBanner` / `hasBanner`): a blockquote opening `> **Audience framing**:`, naming DesignerPunk's own `process`, `components` or `process and components` (Req 20.7), with a `**Worked example**:` mark and a `**Transferable**:` mark (Req 20.8). The authoring and the guard read the same symbol.
   - **the presence guard** (`auditBanners`, asserted by `scripts/audience-banner/__tests__/audience-banner.test.ts` in the required `lane-functional-root` job). It checks `predicate-match ⇒ banner-present`, and **its claim is scoped**: "N docs match the predicate; N carry banners", never "the corpus is bannered" (Req 20.3). Presence is not correctness and not readership (Req 20.10).
2. **Named under-inclusions**: `governance/Component-Readiness-Status.md` and `governance/Component-Quick-Reference.md` (`KNOWN_UNDER_INCLUSIONS`; Req 20.7's reason, Lina A7). In a consumer install they read as claims about the consumer's components, and neither matches v1. Ada's measurement: every candidate string that catches them adds at least 5 more docs, toward the corpus-wide banding Req 20.4 forbids.
   - **RESOLVED (B)** — Peter's ruling, item 6, 2026-10-13. The two docs are **banded outside the predicate**, as a **declared two-item list**, named in `KNOWN_UNDER_INCLUSIONS` and here. The predicate stays v1.
   - **The list sits outside the predicate's guard and its `N match; N carry` claim.** The predicate guard checks `predicate-match ⇒ banner-present` only, and these two docs never enter its line. **Their presence is asserted by a separate, scoped declared-list test** (`scripts/audience-banner/__tests__/audience-banner.test.ts`, "the declared list banded outside the predicate"), on Req 20.5's banner-without-guard non-option. Membership is still a hand-kept list, the drift Req 20.3 exists to prevent, accepted at size two. Adding a third doc to it is a change to this section, not a maintenance edit. *(Wording per Peter's ruling, item 6, as settled at 23.2, 2026-10-13.)*
   - (A), leaving them unbannered, was the alternative.
3. **Per-doc text is not voted.** Each banner's two sentences (worked example, transferable) are reviewed by the doc's owning agent against source, with `file:line` citations, in the table at `.kiro/specs/123-consumer-distribution/completion/task-23-2-completion.md` (Task 23 instruments row 3.4). Thurgood-owned docs get an independent read (Task 23 instruments O-5). A wrong sentence is a defect fixed under the doc's ordinary maintenance, not a re-ballot.
4. **The existing banner at `governance/release-management-system.md` L11** is replaced by the template in 23.2's commit. Its closing parenthetical ("Whether DesignerPunk's release notes themselves ship to consumers is an open Spec 123 question, deferred by the Q6 ballot") goes with it. **The question is answered, not dropped**: DD16 decided a consumer `CHANGELOG.md`, which ships (`files[]`; 1 entry in the pack listing). The release notes under `docs/releases/` do not ship (0 entries). § 4 makes the CHANGELOG entry a recipe step.

**Standing discipline**: a banner changes when its doc's authorities change. A new doc that matches the predicate gets a banner in the same PR, because the guard is red otherwise. A predicate change is a version bump, decided by Ada, with the count re-measured and recorded in the module.

## 4. § Release recipe (separately ratifiable)

**§ 4 status**: DRAFT

**Why.**
- **The changelog step (Req 21.2)**: the release-notes disposition is decided. DD16 chose a consumer-facing `CHANGELOG.md`, hand-authored, consumer-framed, one entry per release. It has existed since U1: it holds the 15.0.0 entry (L46) and an `[Unreleased]` release-3 block (L7). Nothing in the recipe yet says each release writes one, so after 123 closes the file would go stale by omission.
- **The trio step (Req 23.7)**: the persona trio is "a standing regression instrument re-run per release". 23.7 names its home in the release recipe as a ballot-measure change and requires the obligation to exit 123's closeout as a committed record with owner and trigger, walked by the monthly health check. This ballot is the recipe half. **Task 28.4's `.kiro/issues/` record is the tracking half**, and the two cite each other.

**What is ratified**:
1. **Recipe step 4 gains the consumer CHANGELOG entry** (§ 5, R-1). Every release writes one entry in the root `CHANGELOG.md`, hand-authored and consumer-facing, separate from the internal release notes. A release with no consumer-facing change says so in its entry.
2. **A new recipe step 6, the onboarding trio re-run** (§ 5, R-2), in force **from release 4**:
   - At release 4, Spec 123's U5 runs (Task 25) discharge it.
   - From the next release, the recipe runs it, using Task 25's committed protocol, fixtures and frozen-prompt discipline.
   - **Owner and trigger are not chosen here.** They are Task 28.4's record's, per Req 23.7. The step names that record as the obligation's home.
3. **"Discovering What Changed" gains the consumer record** (§ 5, R-3).
4. **The operational sequence names both steps** (§ 5, F-1, F-2). `.kiro/hooks/RELEASE-FLOW.md` is in Task 24's Primary Artifacts by Peter's ruling, item 2.

**Ruled (Peter, item 5, 2026-10-13)**:
- **The trio re-run is a record, not a gate.** The runs are committed and their findings routed. A regression against the recorded prior runs is a finding (Req 22.3's rule), not a release blocker. A gate would be a later trigger-table change.
- **Every release gets a CHANGELOG entry**, whether or not it has a consumer-facing change.

## 5. Edit sites (before → after)

Line numbers are at `8007105fa`. Every site is applied verbatim after its section is ratified, and STRAGGLER-swept afterwards: one `grep -n -F` per after-text, with the hit recorded in Task 24's completion doc.

**R-1 — `governance/release-management-system.md` L40, recipe step 4.**

Before:
> 4. **Hand-author the notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent). Notes ride the release PR with the version bump and any token-index regeneration.

After:
> 4. **Hand-author the notes and the consumer CHANGELOG entry** — two artifacts for two readers. **(a) The release notes** at `docs/releases/release-X.Y.Z.md` (v14.0.0 is the format precedent): the full delta, internal changes included. They are DesignerPunk's record and do not ship in the package. **(b) One entry in the root `CHANGELOG.md`**: consumer-facing changes only, in plain language for the people who install the package, hand-authored and never generated from the delta. The entry accumulates under `## [Unreleased]` as work merges, and the release PR retitles it to the version. A release with no consumer-facing change still gets an entry that says so. `CHANGELOG.md` ships in the package. Both ride the release PR with the version bump and any token-index regeneration.

**R-2 — `governance/release-management-system.md`, a new step 6 after L41.**

Before: (none; the list ends at step 5)

After:
> 6. **Re-run the onboarding trio** (from release 4). The persona trio is DesignerPunk's standing regression instrument for onboarding: three cold persona runs against the packed artifact, each on its committed fixture and from its frozen prompt. Release 4's runs are Spec 123's own (Task 25). From the next release, the release runs them under the same protocol and commits the records. The obligation's owner and trigger are kept in its committed tracking record (Spec 123 Task 28.4), which the monthly Civitas health check walks. Findings route to their owners. A regression against the recorded prior runs is a finding, not a release gate.

**R-3 — `governance/release-management-system.md` L48, "Discovering What Changed and Why" item 2.**

Before:
> 2. **What, curated per release**: `docs/releases/release-X.Y.Z.md` — hand-authored, consumer-facing framing, breaking changes called out with migration guidance.

After:
> 2. **What, curated per release**: `docs/releases/release-X.Y.Z.md` — hand-authored, breaking changes called out with migration guidance — and, for the people who install the package, its consumer entry in `CHANGELOG.md` (shipped in the package; the only release record a consumer has locally).

**R-4 — `governance/release-management-system.md` L14–15, metadata.** `**Last Reviewed**` and `**Last Updated**` are set to the application date. Only 24.2 changes these lines (§ 2).

**F-1 — `.kiro/hooks/RELEASE-FLOW.md` L117, § "The sequence" step 2** *(granted: ruling item 2)*.

Before:
>    - release notes / changelog updates,

After:
>    - release notes (`docs/releases/release-<version>.md`) **and the consumer `CHANGELOG.md` entry** (retitle `## [Unreleased]` to the version; recipe step 4 in `governance/release-management-system.md`),

**F-2 — `.kiro/hooks/RELEASE-FLOW.md`, § "Deriving the delta", a new item after item 5 (L30)** *(granted: ruling item 2)*.

Before: (none)

After:
> 6. **Onboarding trio** (from release 4): recipe step 6 in `governance/release-management-system.md`. Where the runs sit relative to the tag is set by the trio protocol (Spec 123 Task 25). The obligation's tracking record is Spec 123 Task 28.4's.

**Not edited here**: L11 (the banner, § 3 item 4, Task 23.2's commit); RELEASE-FLOW step 5a's owed-set pipeline (three verbatim copies, untouched).

## 6. Counter-argument, and what survives

**Folded in**:
- **Bundling** (DD13's own residual: "bundling delays everything if one item is contested") is why §§ 3 and 4 are ratifiable separately. A contested recipe item cannot hold the banners.
- **Not re-ballotting each banner**: a vote per banner would contradict the light-ballot discipline Peter set for B-U3 (PR-2), so per-doc text goes to owner review instead (§ 3 item 3).
- **Not deciding the trio's owner or trigger**: Req 23.7 puts both in Task 28.4's record. R-2 names that record instead of pre-picking. Gate status was Peter's to decide, and he ruled it a record, not a gate (§ 4).
- **L11's parenthetical** would vanish silently in a banner commit, so § 3 item 4 records the answer that retires it.

**What survives**:
- **§ 3 may be redundant law.** Req 20 already ratified the banners, and `tasks.md` L130's "banners" can be read as a merge-rule entry (Peter merges), not a ballot entry. Under that reading, § 3 re-records a ruling. Peter ruled the ordering (item 3) and the merge-ratified form (item 4), so the sitting cost did not land. The redundancy remains.
- **Task 24's seat authors the record governing Task 23's edits.** That is a cross-parent dependency the plan did not declare; Task 23's criteria and Primary Artifacts do not name B-U4. Peter ruled the order (item 3). The dependency remains undeclared in Task 23's own text.
- **R-2 commits the project to a recurring cost no one has measured.** Three persona sessions per release, plus an operator, plus records. Spec 123's first runs (U5) are the only cost evidence, and they come after this ballot. A trio step that proves too costly is changed by a later ballot, and until then it is a standing obligation.
- **R-1's "an entry even when nothing consumer-facing changed"** was my reading of "one entry per release" (`CHANGELOG.md` L3), now ruled (item 5). Its cost: an entry that says "no consumer-facing changes" is noise a reader skims past.
- **The declared two-doc band (§ 3 item 2) sits outside the predicate's guard.** Its presence test checks only the two names it is given, so a third doc that needs the same band is caught by no test. Accepted at the ruling (item 6).
- **Under (r1)** the post-merge stamp is a second act that can be forgotten, exactly as B-U3's was. The stamp line in § 2's (r1) instrument names it, but nothing mechanical enforces it.

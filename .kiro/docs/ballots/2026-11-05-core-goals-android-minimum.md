# Ballot Measure: Core Goals states the Android minimum (API 26)

**Date**: 2026-11-05
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/steering/core-goals.md` and profile author of its operative set), at Peter's direction. Peter, chat, relayed by the orchestrator, received 2026-11-05T13:43:14Z (`date -u` at receipt), verbatim: *"(a), and start the 131 ledger"*. "(a)" answers the orchestrator's question "Is it (a), the one-item ballot?" for the Core Goals Android line. *Unverified here: the relay is chat only, and I did not see the question as Peter read it.* The ruling it carries out is Peter's decision 5, "Re: 5, 26", received 2026-11-05T05:54:32Z (Spec 129 `design.md` § 0; Data's design inbound § 6, "Ruled").
**Status**: DRAFT. Not applied, not ratified. Review is open to the reviewers below. This file is the record the Status line will be flipped in, record-first (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"), before any edit site is applied.
**Owner**: Thurgood (item 1, Core Goals; sites 2 and 3 are his as profile author, with the seats' text where stated).
**Required reviewer**: **Stacy**. She is the C1 confirmer and signer of Core Goals' `#core-project-context` (`canonical/operative-sets/core-goals.yaml` L9–10), the census reader, and the reader of the governance-edit-kind lines. Her design-review entry on Spec 129's `design.md` (`[STACY R1]` § 3, 2026-11-05) gave the application path this ballot follows and two wording points it answers (§ 2, § 5).
**Reviewers**: **Data** (the Android fact; site 2 is his charter line and his signed unit). **Peter** ratifies (Core Goals is identity law).
**Class**: LAW for site 1. Android code and agents must now meet a minimum that nothing required before; no merged clause or ratified ballot names the edit (Spec 129 `design.md` § 15 does not authorize it: it says so itself and sends the line to Peter); and the README says "When in doubt, LAW" (§ "When a governance edit needs a ballot — three kinds"). Site 2 is **EXECUTION** of this ballot (§ 3 explains why it cannot be a CORRECTION). Sites 3 and 4 are the profile author's and the seats' acts that follow from site 1 (§ 5).
**Amends**: `.kiro/steering/core-goals.md` L29, one line (site 1). Follow-on: `canonical/agents/data.md` L461 (site 2); the operative-set items, overlay units and one dispositions removal (site 3). No requirement changes beyond the minimum itself; no register row changes.
**Cap**: one law line, one charter line, six profile lines. **Retroactivity**: none. No shipped Android build sets a `minSdk` today (Stacy R1 § 3), so nothing shipped is re-judged by it.
**Base**: `main` at `10ec4af5b`. Every before-text below is quoted from that tree.

> **Conflict of interest, stated first.** I own Core Goals and author the items and overlays of the units this ballot stales (§ 5). Stacy's review and Peter's ruling are the checks. The fork in § 7 is about wording I read differently from Data's inbound, so I surface it rather than pick it for Peter.

---

## 0. What was ruled, and what this ballot adds

**Ruled (Peter, 2026-11-05T05:54:32Z, `date -u` at receipt, orchestrator relay): "Re: 5, 26".** He had read Data's three options (API 23, 24, 26), Data's lean ("API 26, with the rule 'the higher of your number and Compose's floor'"), and what survives (it drops Android 6 and 7; Compose keeps raising its floor). Data recorded what follows from it (inbound § 6):
- the Android minimum is API 26 (Android 8.0);
- the effective `minSdk` is the higher of 26 and the pinned Compose floor, "23 today", so 26 for now;
- Core Goals' line "is updated to say API 26 and cite this ruling. It is a steering edit, so Peter merges it."

**What this ballot adds, and nothing else:** the exact line for that edit, the classification (LAW), the follow-on sites a one-line change to a signed unit reaches, the application order, and the two wording points Stacy named. It does not re-decide 26, and it does not decide the toolchain range, `ConfigHelpers`' defaults or `InputCheckboxLegal.android.kt` (§ 6).

## 1. The defect, quoted at `10ec4af5b`

`.kiro/steering/core-goals.md` § "Core Project Context" (L27–30):

> **Platform Minimum Versions:**
> - iOS: 17.0+
> - Android: Not yet constrained
> - Web: Not yet constrained

Peter ruled a minimum for Android on 2026-11-05. The shipped Core Goals contradicts it until this line changes. It is a false claim to a consumer only once something shipped sets a minimum (Spec 132's Gradle module, or earlier); it is a stale line against a ruling now.

Three more places say the same thing (swept below, § 6): Data's charter L461, the generated copies of both lines, and the consumer profile's operative-set and overlay records.

## 2. The measure

### Item 1, site 1: `.kiro/steering/core-goals.md` L29 (LAW)

**Before** (L29, at `10ec4af5b`):
> - Android: Not yet constrained

**After**, one line, same line number:
> - Android: API 26 (Android 8.0)+ — the effective minimum is the higher of 26 and the minimum SDK required by the Compose version that DesignerPunk's shipped Android module pins *(Amended <ratification date> by ballot 2026-11-05-core-goals-android-minimum, item 1; prior text at `10ec4af5b`.)*

The line before the pointer is the text of Spec 129 `design.md` § 15 as revised at design R2 (`task/129-design` `c8c2e4fd5`, "The proposed line, revised for Stacy's two wording points"), byte for byte. The `<ratification date>` is filled by the Status commit, in every place it appears (the pointer here, and the removal in site 3d). The line stays one line, so the citations in the register that name `core-goals.md` line numbers (`core-goals.md:55-59`, `:50/:53`) do not move.

**Why the sentence is built this way** (the two wording points Stacy named):

1. **"The pinned Compose floor" has two referents; this ballot picks the shipped module's pin.** The two candidates are the harness pin file (Spec 129's compile harness, `harness/android/`) and the Gradle module Spec 132 ships. I pick the **shipped module**, for three reasons:
   - Spec 129 Req 2.9 says the harness pins "are not platform minimums". A harness pin is a CI instrument's version: it moves when the CI is maintained. If law pointed at it, a CI bump would silently change what Core Goals requires.
   - The module is what an adopter's Android build inherits. The adopter's build fails if its `minSdk` is below the Compose release's declared floor (a manifest-merge failure), so the module's pin is the floor an adopter's agent actually faces.
   - It costs nothing today: both candidates give 23 now, 23 < 26, so the effective minimum is 26 either way. The choice decides only what a *future* bump touches.
   
   The sentence still has a referent that may not exist yet: no module ships. **It is written to evaluate correctly while the module is absent**: "the higher of 26 and X" is 26 when there is no X. It says nothing about whether the module ships, because a status clause in a signed unit would go stale (the no-volatile-metadata rule, ballot `2026-10-17-no-volatile-metadata-in-signed-units`). The cost: until Spec 132 ships, the second half of the line has nothing to read. The fork this opens is § 7 F-1.
2. **The item changes kind, member → obligation.** `platform-android` (`canonical/operative-sets/core-goals.yaml` L43–46) is `kind: member` because "not yet constrained" was a fact. A minimum is something an agent can violate, like `principle-6` ("iOS: 17.0+"), which is `obligation`. Stacy's 2026-09-29 ruling on this unit gave "an agent that imposes a minimum version contradicts it" as the reason for listing the item (`canonical/profiles/consumer/confirmations/core-goals.md` L44). **That reason inverts and is hers to re-rule at her confirm act**; this ballot proposes `obligation`, with the reason "an agent that sets or accepts an Android minimum below 26, or below the minimum SDK of the pinned Compose version, contradicts it", and she rules (§ 5).

**Unchanged**: L27–28 and L30. The Web line stays "Not yet constrained"; no ruling touches it.

### What the measure does not settle, so no reader assumes it did

- The **toolchain range** (AGP, Kotlin, Compose versions) comes from Spec 132's D4 builds at both ends; not decided by "Re: 5, 26" (Data § 6).
- **`ConfigHelpers`' Android default (24) and validation floor (21)**, and `BuildOrchestrator`'s floor (21), are Ada's call, "design or tasks" (Data § 6; Spec 129 `design.md` § 15). They are code defaults, not text; an application PR that changed them would be changing enforcement in the same PR as its referent.
- **`InputCheckboxLegal.android.kt` L242** needs no guard (Lina; Data § 6).

## 3. Item 1, site 2: `canonical/agents/data.md` L461 (EXECUTION of this ballot)

**Before** (L461, at `10ec4af5b`, the last bullet of § "Android-Specific Guidance", Data's signed unit `#android-specific-guidance:preamble`):
> - Android minimum version per Core Goals (not yet constrained)

**After** (Data's text is final; this is my proposal for him):
> - Android minimum version per Core Goals

The line is a pointer, and it stays one: the number lives in Core Goals alone, so a later bump of the minimum is a one-line edit with one signed unit to re-confirm (Core Goals'), not two (Core Goals' and Data's). A charter carries no dated pointer (README § "Conventions", the paragraph on where the pointer is owed); the commit that edits it names this ballot in its message.

**Why EXECUTION and not CORRECTION.** Stacy R1 § 3, and `design.md` § 15 at R2, call the L461 edit a CORRECTION whose referent is the ratified Core Goals line. I classify it differently, and say so for the reviewers to rule. In this PR the referent changes in the same PR (site 1). The README's test: "Two kinds of referent changed in the same PR never count: **governance text**…". So a CORRECTION cannot carry it. Under this ballot the edit is named before it is made, which is a PRE-DECLARED EXECUTION: the PR body cites this ballot, and Data, the doc's owner, reviews the text. One authority covers both lines.

`native-7` in `canonical/operative-sets/data.yaml` L551–554 (`kind: member`, text "Android minimum version per Core Goals (not yet constrained)") is re-quoted from this line (site 3b). Its kind is Data's to re-rule: a pointer that tells the agent the minimum lives in Core Goals is arguably `obligation`, as the pointer now names a number an agent can contradict; Data decides at his confirm act. His 2026-10-19 ruling on this unit gave "binds the minimum version to Core Goals rather than a choice of my own" as its reason, and that reason survives the edit.

## 4. Census (README § "Conventions", "Instrument census")

Presumptively in scope (condition 1: an edit site is a file a registered check's command loads), with the reading I make of each. Stacy is the census reader; a disputed line goes to Peter.

- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts; .kiro/steering/ and canonical/ are citing roots) — the item removes and adds no get_section or get_document_* citation and renames no heading; the line carries a dated pointer, not a citation`
- `**Census**: not in scope — 122-diff-guard with the operative-set freshness sweep (tools/agent-generator/diff-guard.ts) — no instrument code change; the sweep will report core-goals #core-project-context and data #android-specific-guidance:preamble stale after site 1, which are the owed acts of § 5, not a change of the instrument's verdict`
- `**Census**: not in scope — verify-signing-chain --ci (row signing-act-consistency, census: verify-signing-chain.ts --census-routed) — no instrument code change. The census compares two versions of the instrument's code (README "Re-runs"); this item changes the instrument's inputs and no code, so with no scratch diff the current and proposed digests are equal by construction, and I did not run a census over inputs that the sweep itself reports at application. The § 5 commits are its inputs at application, checked by links 1–3 as written`
- `**Census**: not in scope — the two register rows whose education cites core-goals.md lines (no-autonomous-token-creation, core-goals.md:55-59; no-hardcoded-color, :50/:53) — the edit is on L29 and adds no line, so no cited line moves; the suites those rows register import token modules and read no document (git grep -l -i "core-goals\|core goals" -- src/tokens src/validators src/components prints nothing at 10ec4af5b)`

Items 2 and 3 name no instrument code change; the same four readings apply to their files (data.md is read by the 122-diff-guard closure and the freshness sweep; the profile files by the signing chain).

*Carried, not run here*: the rows' own suites and `check:122:diff-guard` are run at application (§ 8 step 8); a verdict that differs from this reading stops the PR and is reported.

## 5. Re-sign consequences and who acts (owed with the edit, never by hand)

**The seat-object boundary** (Spec 123 design C1/C16; the #472, #491 and #535 precedents): the operative-set items, the overlay units and every dispositions-row field except its signature are the **profile author's** (Thurgood's) authoring acts; a seat's acts are its re-confirmation (the confirmation sub-object and its sheet section) and its re-signature. The authoring commit that edits `core-goals.md` **must not move the unit's `canonicalHash`**: moving it is the confirmer's act, and an authoring commit that moves it fails the signing chain.

| Unit | What moves | Acts |
|---|---|---|
| Core Goals `#core-project-context` (`canonical/operative-sets/core-goals.yaml`; owner Thurgood, confirmer Stacy) | the unit's bytes (site 1) | Thurgood re-quotes `platform-android` (id kept; label `Android: API 26 (Android 8.0)+, or the Compose floor if higher`; `kind: obligation` proposed; `text` = the new line without the pointer, a verbatim substring of the unit). Stacy re-confirms (C16) in `canonical/profiles/consumer/confirmations/core-goals.md` § `#core-project-context`: she moves `canonicalHash`, appends a dated record, and **re-rules the 2026-09-29 reason** (§ 2 point 2) |
| Core Goals consumer row `#core-project-context` (`canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` L8) and its overlay unit (`always-set/core-goals.overlay.md`, header pin and L15) | rendered bytes | Thurgood re-renders the overlay line and re-grounds the pin. **The amendment pointer is subtracted from the consumer rendering**: the row gains a removal `{"text": " *(Amended <ratification date> by ballot 2026-11-05-core-goals-android-minimum, item 1; prior text at `10ec4af5b`.)*", "cites": "subtraction-2"}` (leading space included), on the precedent of the row's `#development-practices` removals; a ballot path and a DesignerPunk SHA mean nothing in a consumer repo. The row's two existing removals quote text outside the hunk and stand. Stacy re-signs (C1) in `canonical/profiles/consumer/signatures/core-goals.md` § `#core-project-context` |
| Data `#android-specific-guidance:preamble` (`canonical/operative-sets/data.yaml` L524–555; confirmer Data; consumer row `canonical/profiles/consumer/data.dispositions.yaml` L31, signer Data; overlay `canonical/profiles/consumer/data.overlay.md` L108 and L117) | the unit's bytes (site 2) | Thurgood applies L461 **byte for byte** from Data's text (a seat's own charter line is applied by the profile author, since the seat's authoring commit would stale the unit it then confirms), re-quotes `native-7`, and re-renders the overlay line and pin. The row's one removal ("the stale `dist/*.kt` snapshots") quotes text outside the hunk and stands. Data re-confirms (C16) in `confirmations/data.md` § `#android-specific-guidance:preamble` and re-signs (C1) in `signatures/data.md` |

Everything else that carries the text is generated: `.claude/agents/data.md` L241, `.kiro/agents/data-prompt.md` L211, `canonical/_consumer-output/**` (the always-set copy of Core Goals and the `cc` and `kiro` outputs of both lines), and `canonical/generated.lock`. They change by regeneration, not by hand.

**Grants.** Thurgood's profile acts and the Data charter line are outside his standing write scope. Peter's ratification names these files, or a grant record does before the application PR: `.kiro/steering/core-goals.md`; `canonical/operative-sets/{core-goals,data}.yaml`; `canonical/profiles/consumer/always-set/core-goals.{dispositions.yaml,overlay.md}`; `canonical/profiles/consumer/data.overlay.md`; `canonical/agents/data.md` L461, byte for byte from Data's text; `canonical/generated.lock` and the generated roots. Each seat's confirmation and signature sections are its own acts and need no grant (signing-act ballot M1).

## 6. Straggler sweep (README § "Conventions": a sweep, not a list)

Run at `10ec4af5b`: `git grep -n -i "not yet constrained" -- . ':!.kiro/specs'` (and the `.kiro/specs` hits separately). Hits and dispositions:

| Hit | Disposition |
|---|---|
| `.kiro/steering/core-goals.md` L29 | site 1 |
| `.kiro/steering/core-goals.md` L30 (Web) | **unchanged**: no ruling touches Web |
| `canonical/agents/data.md` L461 | site 2 |
| `canonical/operative-sets/core-goals.yaml` L45–46 (`platform-android`); L49–50 (`platform-web`) | L45–46 site 3a; L49–50 unchanged |
| `canonical/operative-sets/data.yaml` L553–554 (`native-7`) | site 3b |
| `canonical/profiles/consumer/always-set/core-goals.overlay.md` L15 (Android); L16 (Web) | L15 site 3c; L16 unchanged |
| `canonical/profiles/consumer/data.overlay.md` L117 | site 3c |
| `.claude/agents/data.md` L241; `.kiro/agents/data-prompt.md` L211; `canonical/_consumer-output/**` (6 Android hits in 6 files: the `_canonical`, `cc` and `kiro` copies of Core Goals and of Data's charter; the Web lines beside them stay) | regeneration |
| `canonical/profiles/consumer/confirmations/core-goals.md` L44 | **ledger**: quotes the 2026-09-29 ruling's superseded text; kept inline (README, superseded-text rule). Stacy's new dated record sits above it |
| `tests/onboarding-trio/fixtures/born-{cc,kiro}/**` (`.claude/identity/designerpunk-core-goals.md`, `.kiro/steering/designerpunk-core-goals.md`, both `data` charters: 4 files with Android hits) | **frozen install-time record**: not edited. Verified frozen: the born-cc copy of Core Goals lacks the "Token selection" pointer line that #491 added to the live file (`grep -c` prints 0), so the fixtures were not regenerated by the last two Core Goals applications either |
| `.kiro/specs/070-agent-architecture/platform-agent-template-draft.md` L270 | spec-history; not edited |
| `.kiro/issues/2026-09-26-native-component-distribution.md` L30 ("a `minSdk` decision (Core Goals: Android is unconstrained today)") | **not edited here**: Kenya's and Data's record, and its § "Goal (Peter, 2026-11-05)" already re-homes it; they close that clause when Spec 132's outline lands. Named in the PR body for them |

A wider sweep (`Android minimum|minSdk|minimum version|API level`, outside specs and generated roots) finds only code defaults (`src/build/workflow/ConfigHelpers.ts`, `BuildOrchestrator.ts`, `AndroidFileOrganizer.ts` and their tests, defaults of 24 and a floor of 21), which are Ada's (§ 2). **They contradict API 26 and are not touched here.** No served governance doc states an Android minimum.

At application the sweep is re-run on the changed tree; the only "Android: Not yet constrained" or "(not yet constrained)" hits left are the ledger line and the frozen fixtures above, and the Web lines. Any other hit stops the PR.

## 7. Forks for Peter (none is picked here for him)

**F-1. What the Compose-floor clause points at.** Peter read "the pinned Compose floor (23 today)" in Data's text. The 23 is Data's measurement under the **harness pin** (Compose BOM 2026.09.00: `ui`, `foundation`, `runtime`, `animation`, `material-ripple` declare `minSdkVersion="23"`). The sentence in § 2 points at the **shipped module's** pin instead (no module ships yet). Same number today, different referent tomorrow.
- **(i) The shipped Android module's Compose pin** (recommended; this draft). Reasons in § 2 point 1.
- **(ii) The harness pin file.** Matches what Peter read literally, and exists today. Cost: Req 2.9 says the harness pins are not minimums, and a CI maintenance bump would change identity law without a ballot.
- **(iii) Drop the clause: Core Goals says "Android: API 26 (Android 8.0)+" and nothing more.** The floor rule is a fact of the Android build (a lower `minSdk` than Compose's floor fails to merge), so it needs no sentence in law to hold; it can live in the shipped module's own documentation, where the pin lives. This is the class-level option for a general problem: *identity law should state minimums, and facts the toolchain already enforces belong with the toolchain.* Cost: it drops part of what Data's lean put to Peter ("with the rule"), so it needs his say, and agents lose the reminder that 26 is a floor, not a target.

**Surviving residual after my own counter-argument (below):** whether the line should carry a clause whose referent does not yet exist. (i) and (iii) answer it differently; neither is absorbable by the other.

## 8. Application (on ratification; one PR, Peter-merged)

1. **The Status commit** (record-first), before any edit site: `**Status**: **RATIFIED (Peter, <date>)** — <F-1 answer>`, his dated words quoted, `<ratification date>` filled in the pointer and the removal, the README roll entry added. It also appends **§ 9, Resolved after-texts**: each site's after-text exactly as it will be applied under Peter's F-1 answer and Data's final text for site 2, so the claims pass compares the application diff with § 9 byte for byte.
2. Branch `chore/core-goals-android-minimum`. Stop on any before-text that does not match at the application base: `git diff --quiet 10ec4af5b <base> -- .kiro/steering/core-goals.md canonical/agents/data.md canonical/operative-sets/core-goals.yaml canonical/operative-sets/data.yaml canonical/profiles/consumer/always-set/core-goals.dispositions.yaml canonical/profiles/consumer/always-set/core-goals.overlay.md canonical/profiles/consumer/data.dispositions.yaml canonical/profiles/consumer/data.overlay.md`.
3. PR body: `**Edit kind**: .kiro/steering/core-goals.md — LAW (.kiro/docs/ballots/2026-11-05-core-goals-android-minimum.md)`; `**Edit kind**: canonical/agents/data.md — EXECUTION (ballot 2026-11-05-core-goals-android-minimum § 3)`; `**Consulted**:` Stacy, Data. Data's charter line is a charter edit: Peter merges.
4. **Authoring commit** (Thurgood): site 1 only. Run `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci` and `npm run -s check:122:diff-guard` on it **before briefing Stacy**: the authoring commit must not move `canonicalHash` (a hash move here fails links 2 and 3). The freshness sweep will report the unit stale; that is expected.
5. **Profile-author commit** (Thurgood): site 2 byte for byte from Data's text; `platform-android` and `native-7` re-quoted; both overlay lines and pins re-grounded to the **recomputed** unit hashes (`hashText` over `partition(splitFrontmatter(...).body).units`), without editing either `canonicalHash` field; the dispositions removal (site 3d).
6. **Regeneration**: `npm run build:generator`; commit the generated roots as the pre-signature rendering. **Order check** (the #491 residual): run the generator once on the authoring commit and once after the profile-author commit; the generated roots must be byte-identical. A difference means the items enter the rendering: stop and report it to Stacy before any seat acts.
7. **Seat acts**, each as its own commit under its own `Agent:` trailer, trailers sharing the message's final paragraph, never an amend: **Stacy** re-confirms (moves `canonicalHash`, dated record, the 2026-09-29 reason re-ruled, all items re-read as verbatim substrings by script) and re-signs `#core-project-context`; **Data** re-confirms and re-signs `#android-specific-guidance:preamble`.
8. **Lock refresh**: a second `npm run build:generator`; every output must stay byte-identical; commit `canonical/generated.lock` only. Checks: `npm run -s check:122:diff-guard` (with `verify-signing-chain --ci`); `npm run -s check:section-citations`; `node scripts/validate-steering-metadata.js`; `npm test`. **Before Peter merges**: `verify-signing-chain --audit --pr <n>` (not `--ci` over `main`'s squashes, which fails link 2 by construction). Core Goals is an identity doc and is not served by the docs MCP, so no `rebuild_index` is owed.
9. Sweep: re-run § 6's command on the changed tree; the allowed hits are the ones § 6 lists.
10. **One lock-carrying PR at a time**: the owner re-merges `main` into the branch right before Peter's turn. Afterwards Stacy's signing act is audited by the rotating delegate and counted in her next record.

**When.** Before Spec 132 ships anything that sets `minSdk`; preferably before 16.3.0's S, so the release does not ship a Core Goals line that contradicts a ruling already made.

## 9. Resolved after-texts

*(Appended by the Status commit.)*

## 10. Counter-argument (fold-back applied first), cost and what survives

**I recommend** the one-item ballot (Peter's (a)), with the floor clause pointing at the shipped module (F-1 (i)), the Data line reduced to a pointer, and `kind: obligation` proposed for the Core Goals item.

**Counter-arguments I ran against my own draft, and what they changed:**
1. *"A bare number would do; the clause adds a referent that does not exist."* **Folded in as the F-1 (iii) option**, not as my pick: the clause is Data's text and Peter read it, so removing it is his call. What it changed in the draft: the line is written to evaluate while the module is absent, and states no status.
2. *"Two homes for the number (Core Goals and Data's line) go stale together."* **Folded in**: Data's line drops "(not yet constrained)" and keeps the pointer only, so the number lives in one place.
3. *"The pointer in the signed unit makes the consumer's rendering carry a DesignerPunk SHA."* **Folded in**: the dispositions removal subtracts it from the consumer rendering (§ 5), as the `#development-practices` rows do.
4. *"A CORRECTION would be cheaper for the Data line."* **Rejected with evidence**: its referent changes in the same PR, which the README excludes (§ 3). Folding it into the ballot costs nothing extra.

**What survives:**
- **The ratio.** One ruled fact, "26", became a ballot, a reviewed draft, a Status commit and an application PR: twelve acts by four parties (Thurgood, Stacy, Data, Peter: the draft, two reviews, Peter's ratification, the Status commit, the authoring commit, the profile-author commit, the regeneration, Stacy's confirm-and-sign, Data's confirm-and-sign, the lock refresh, Peter's merge), and two generator runs. The signing chain does guard steering drift (a hash-moving authoring commit is caught mechanically), so the cost buys something real; what it buys on a one-line numeric fact is the question Spec 131 is examining. This ballot does not shorten the path. It is entered in Spec 131's governance-cost ledger.
- **Consumer exposure, not yet shown to Peter.** Core Goals ships to adopters. An adopter's agent that reads "Android: API 26+" as an obligation will push back on that adopter's own `minSdk` of 24. iOS already works the same way ("iOS: 17.0+" is an obligation), and the components need 26 (`java.time`), so the symmetry is deliberate; but it is a cost an adopter pays, and Peter's "Re: 5, 26" did not name it. It is listed here so ratification includes it.
- **The empty referent** (F-1).

**Cost to the reviewers:** Stacy, one re-confirm and re-sign of a unit she has confirmed before (8 items, now with one re-ruled kind); Data, one re-confirm and re-sign of a 7-item unit and a one-line text decision.

## 11. Review record

*(Reviewers write scratch entries; the holder splices them here, byte for byte. Reviewers cannot write `.kiro/docs/ballots/**`.)*

### [STACY R1] (required)

*Owed: the census reading (§ 4, including the signing-chain line); the F-1 recommendation; the kind change and her re-ruling of the 2026-09-29 reason (§ 2 point 2); the application order (§ 8).*

### [DATA R1]

*Owed: the Android fact (API 26, the Compose floor of 23 under his BOM); the site 2 text and the `native-7` kind (§ 3); whether the shipped module's pin (F-1 (i)) is what Spec 132 will set.*

### [THURGOOD R2]

*(Incorporation, after the reviews; woven into the sections above, not appended.)*

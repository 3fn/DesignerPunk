# Ballot Measure: Core Goals states the Android minimum (API 26)

**Date**: 2026-11-05
**Drafted by**: Thurgood (Civitas steward; owner of `.kiro/steering/core-goals.md` and profile author of its operative set), at Peter's direction. Peter, chat, relayed by the orchestrator, received 2026-11-05T13:43:14Z (`date -u` at receipt), verbatim: *"(a), and start the 131 ledger"*. "(a)" answers the orchestrator's question "Is it (a), the one-item ballot?" for the Core Goals Android line. *Unverified here: the relay is chat only, and I did not see the question as Peter read it.* The ruling it carries out is Peter's decision 5, "Re: 5, 26", received 2026-11-05T05:54:32Z (Spec 129 `design.md` § 0; Data's design inbound § 6, "Ruled").
**Status**: DRAFT. Not applied, not ratified. R1 is recorded (Stacy, Data; § 11) and incorporated at [THURGOOD R2]; the forks of § 7 are Peter's. This file is the record the Status line will be flipped in, record-first (`.kiro/docs/ballots/README.md` § "The Ratification Protocol"), before any edit site is applied.
**Owner**: Thurgood (item 1, Core Goals; sites 2 and 3 are his as profile author, with the seats' text where stated).
**Required reviewer**: **Stacy**. She is the C1 confirmer and signer of Core Goals' `#core-project-context` (`canonical/operative-sets/core-goals.yaml` L9–10), the census reader, and the reader of the governance-edit-kind lines. Her design-review entry on Spec 129's `design.md` (`[STACY R1]` § 3, 2026-11-05) gave the application path this ballot follows and two wording points it answers (§ 2, § 5).
**Reviewers**: **Data** (the Android fact; site 2 is his charter line and his signed unit). **Peter** ratifies (Core Goals is identity law).
**Class**: LAW for site 1. Android code and agents must now meet a minimum that nothing required before; no merged clause or ratified ballot names the edit (Spec 129 `design.md` § 15 does not authorize it: it says so itself and sends the line to Peter); and the README says "When in doubt, LAW" (§ "When a governance edit needs a ballot — three kinds"). Site 2 is **EXECUTION** of this ballot (§ 3 explains why it cannot be a CORRECTION). Site 3 is the profile author's and the seats' acts that follow from site 1 (§ 5).
**Amends**: `.kiro/steering/core-goals.md` L29, one line (site 1). Follow-on: `canonical/agents/data.md` L461 (site 2); the operative-set items, overlay units and one dispositions removal (site 3). No requirement changes beyond the minimum itself; no register row changes.
**Cap**: one law line, one charter line, six profile lines. **Retroactivity**: none. No shipped Android build sets a `minSdk` today (Stacy R1 § 3), so nothing shipped is re-judged by it.
**Base**: `main` at `10ec4af5b`. Every before-text below is quoted from that tree.

> **Conflict of interest, stated first.** I own Core Goals and author the items and overlays of the units this ballot stales (§ 5). Stacy's review and Peter's ruling are the checks. Forks F-1 and F-2 in § 7 are Peter's; I give my lean on F-1 and pick nothing for him.

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

**After**, one line, same line number, **by Peter's answer to F-1 (§ 7)**. The `<ratification date>` is filled by the Status commit, in every place it appears (the pointer here, and the removal in site 3d).

*F-1 (iii), drop the Compose-floor clause (both reviewers' lean, and now mine):*
> - Android: API 26 (Android 8.0)+ *(Amended <ratification date> by ballot 2026-11-05-core-goals-android-minimum, item 1; prior text at `10ec4af5b`.)*

*F-1 (i), the libraries the shipped Android module depends on (Data's wording fix):*
> - Android: API 26 (Android 8.0)+ — the effective minimum is the higher of 26 and the highest `minSdk` declared by the libraries that DesignerPunk's shipped Android module depends on *(Amended <ratification date> by ballot 2026-11-05-core-goals-android-minimum, item 1; prior text at `10ec4af5b`.)*

*F-1 (ii), the libraries the compile harness depends on (the same wording fix):*
> - Android: API 26 (Android 8.0)+ — the effective minimum is the higher of 26 and the highest `minSdk` declared by the libraries that DesignerPunk's Android compile harness depends on *(Amended <ratification date> by ballot 2026-11-05-core-goals-android-minimum, item 1; prior text at `10ec4af5b`.)*

The first half of every form, "- Android: API 26 (Android 8.0)+", is Peter's ruling. The clause in (i) and (ii) departs from Spec 129 `design.md` § 15 as revised at design R2 (`task/129-design` `c8c2e4fd5`: "the minimum SDK required by the Compose version that DesignerPunk's shipped Android module pins") in one respect, Data's `[DATA R1]` § 1 (a): Compose is a set of artifacts with different floors, and libraries outside Compose (Coil, a colour library) can raise the floor too, so "the Compose version's minimum SDK" names one number where there are several. Every form is one line, so the citations in the register that name `core-goals.md` line numbers (`core-goals.md:55-59`, `:50/:53`) do not move.

**Why the lines are built this way** (Stacy's two wording points, as the reviews left them):

1. **The Compose-floor clause is F-1, and it is Peter's.** Data's lean put "the higher of 26 and the pinned Compose floor" to Peter, with "23 today". The 23 is Data's measurement under the harness pin (Compose BOM 2026.09.00); the clause has two possible referents, the harness pin and the Gradle module Spec 132 ships. My first draft picked the shipped module (Spec 129 Req 2.9 says the harness pins "are not platform minimums"; both give 23 today, so the effective minimum is 26 either way). Both reviewers then argued the clause should go (§ 7), and two of my first draft's reasons were wrong in detail; Data corrected them:
   - The adopter meets **our module's** declared `minSdk` (26), not Compose's directly. A library floor binds *us* when we set the module's `minSdk`; the manifest merger refuses a lower `minSdk` than a dependency declares unless `tools:overrideLibrary` is set (`[DATA R1]` § 1 (b); REASONING by Data).
   - Gradle resolves the highest version any module requests, so an adopter on a newer Compose than ours can meet a higher floor than our pin's. That is the adopter's own choice, but it shows no form of the clause describes an adopter's real floor (`[DATA R1]` § 1 (c)).

   If the clause stays, it is written to evaluate correctly while the module is absent ("the higher of 26 and X" is 26 when there is no X), and it states no status, because a status clause in a signed unit would go stale (ballot `2026-10-17-no-volatile-metadata-in-signed-units`).
2. **The kind is ruled: `platform-android` becomes `kind: obligation` (`[STACY R1]` § 2).** `platform-android` (`canonical/operative-sets/core-goals.yaml` L43–46) was `member` because "not yet constrained" was a fact. A minimum is something an agent can act against, like `principle-6` ("iOS: 17.0+"). **Her 2026-09-29 reason is split, not inverted**, and stays inline as a ledger entry (`canonical/profiles/consumer/confirmations/core-goals.md` L44): *"'Not yet constrained' is a platform fact a consumer's agents build against: an agent that imposes a minimum version contradicts it."* That reason now holds for `platform-web` only, which stays `member`. For `platform-android` her new record will give the reason as: an agent that sets, accepts or recommends an Android minimum below the line's floor contradicts it (the floor is 26 under F-1 (iii); under (i) and (ii) it names the clause's floor too). The wording is hers, written at her act. The profile author authors `obligation` at step 5, so her act **confirms** the item and does not correct it, which would re-open steps 5 and 6.

**Unchanged**: L27–28 and L30. The Web line stays "Not yet constrained"; no ruling touches it.

### What the measure does not settle, so no reader assumes it did

- The **toolchain range** (AGP, Kotlin, Compose versions) comes from Spec 132's D4 builds at both ends; not decided by "Re: 5, 26" (Data § 6).
- **`ConfigHelpers`' Android default (24) and validation floor (21)**, and `BuildOrchestrator`'s floor (21), are Ada's call, "design or tasks" (Data § 6; Spec 129 `design.md` § 15). They are code defaults, not text; an application PR that changed them would be changing enforcement in the same PR as its referent.
- **`InputCheckboxLegal.android.kt` L242** needs no guard (Lina; Data § 6).

## 3. Item 1, site 2: `canonical/agents/data.md` L461 (EXECUTION of this ballot)

**Before** (L461, at `10ec4af5b`, the last bullet of § "Android-Specific Guidance", Data's signed unit `#android-specific-guidance:preamble`):
> - Android minimum version per Core Goals (not yet constrained)

**After** (Data's final text, `[DATA R1]` § 2; § 9 carries it as it stands here):
> - Android minimum version per Core Goals

The line is a pointer, and it stays one: the number lives in Core Goals alone, so a later bump of the minimum is a one-line edit with one signed unit to re-confirm (Core Goals'), not two (Core Goals' and Data's). A charter carries no dated pointer (README § "Conventions", the paragraph on where the pointer is owed); the commit that edits it names this ballot in its message.

**Why EXECUTION and not CORRECTION.** Stacy R1 § 3, and `design.md` § 15 at R2, call the L461 edit a CORRECTION whose referent is the ratified Core Goals line. I classified it differently, and both reviewers agree (`[STACY R1]` § 5 concedes; `[DATA R1]` § 4 agrees). The referent changes in the same PR (site 1). The README's test: "Two kinds of referent changed in the same PR never count: **governance text**…". So a CORRECTION cannot carry it. Under this ballot the edit is named before it is made, which is a PRE-DECLARED EXECUTION: the PR body cites this ballot, and Data, the doc's owner, reviews the text. One authority covers both lines. An EXECUTION covers only the edit the clause names, and excess text in the same hunk is LAW or CORRECTION (README); the block above is that edit, with Data's final text, so the Status commit's § 9 is mechanical.

`native-7` in `canonical/operative-sets/data.yaml` L551–554 (`kind: member`; label and text both "Android minimum version per Core Goals (not yet constrained)") is re-quoted from this line (site 3b): **label and text both become "Android minimum version per Core Goals"**. **Kind: `obligation`**, Data's re-rule (`[DATA R1]` § 2): the item now binds him to a number he can contradict by setting or accepting a `minSdk` below it, the same reason `principle-6` is an obligation. As with Core Goals' item, the profile author writes the kind at step 5, so Data's act confirms it and does not correct it. His 2026-10-19 reason ("binds the minimum version to Core Goals rather than a choice of my own") stands.

## 4. Census (README § "Conventions", "Instrument census")

Presumptively in scope (condition 1: an edit site is a file a registered check's command loads), with the reading I make of each. Stacy is the census reader; a disputed line goes to Peter. **This ballot has one item; the four lines below are one per instrument, not one per item.** The README's "exactly one `**Census**:` line" does not address an item that touches four instruments; I read it as one line per instrument and name the deviation here so a later reader does not count four items (`[STACY R1]` § 4; whether the README should say so is Spec 131's ledger, not this ballot). Stacy accepted all four readings, the two instrument lines on the merged-state reading, which their reasons now state.

- `**Census**: not in scope — check-section-citations (scripts/check-section-citations.ts; .kiro/steering/ and canonical/ are citing roots) — the item removes and adds no get_section or get_document_* citation and renames no heading; the line carries a dated pointer, not a citation`
- `**Census**: not in scope — 122-diff-guard with the operative-set freshness sweep (tools/agent-generator/diff-guard.ts) — no instrument code change; at the application PR's merge, after § 5's acts, the freshness verdict is fresh as before. Between the authoring commit and the seat acts the sweep reports core-goals #core-project-context and data #android-specific-guidance:preamble stale, then unsigned, which are the owed acts of § 5, not a change of the instrument's verdict`
- `**Census**: not in scope — verify-signing-chain --ci (row signing-act-consistency, census: verify-signing-chain.ts --census-routed) — no instrument code change. The census compares two versions of the instrument's code (README "Re-runs"); this item changes the instrument's inputs and no code, so with no scratch diff the current and proposed digests are equal by construction, and I did not run a census over inputs that the sweep itself reports at application. The § 5 commits are its inputs at application, checked by links 1–3 as written. At the merge, after § 5's acts, the chain is consistent as before, and the `#core-project-context` row stays ROUTED: Stacy's signature already records it as routed, and the kind change does not move that`
- `**Census**: not in scope — the two register rows whose education cites core-goals.md lines (no-autonomous-token-creation, core-goals.md:55-59; no-hardcoded-color, :50/:53) — the edit is on L29 and adds no line, so no cited line moves; the suites those rows register import token modules and read no document (git grep -l -i "core-goals\|core goals" -- src/tokens src/validators src/components prints nothing at 10ec4af5b)`

Sites 2 and 3 name no instrument code change; the same four readings apply to their files (data.md is read by the 122-diff-guard closure and the freshness sweep, and the render-fidelity sweep over `canonical/agents/*.md` runs under `check:122:diff-guard`; the profile files by the signing chain). Stacy checked and found no other instrument in scope: the governance-examples guard reads served governance docs, and Core Goals is an identity doc that is not served.

*Carried, not run here*: the rows' own suites and `check:122:diff-guard` are run at application (§ 8 step 8); a verdict that differs from this reading stops the PR and is reported.

## 5. Re-sign consequences and who acts (owed with the edit, never by hand)

**The seat-object boundary** (Spec 123 design C1/C16; the #472, #491 and #535 precedents): the operative-set items, the overlay units and every dispositions-row field except its signature are the **profile author's** (Thurgood's) authoring acts; a seat's acts are its re-confirmation (the confirmation sub-object and its sheet section) and its re-signature. The authoring commit that edits `core-goals.md` **must not move the unit's `canonicalHash`**: moving it is the confirmer's act, and an authoring commit that moves it fails the signing chain.

| Unit | What moves | Acts |
|---|---|---|
| Core Goals `#core-project-context` (`canonical/operative-sets/core-goals.yaml`; owner Thurgood, confirmer Stacy) | the unit's bytes (site 1) | Thurgood re-quotes `platform-android` (id kept; `kind: obligation`, **ruled** by Stacy, § 2 point 2; label `Android: API 26 (Android 8.0)+` under F-1 (iii), or `Android: API 26 (Android 8.0)+, or a library floor if higher` under (i) and (ii); `text` = the new line without the pointer, a verbatim substring of the unit). Stacy re-confirms (C16) in `canonical/profiles/consumer/confirmations/core-goals.md` § `#core-project-context`: she moves `canonicalHash`, appends a dated record above the 2026-09-29 one, and gives the split reason (§ 2 point 2). The 2026-09-29 record stays inline |
| Core Goals consumer row `#core-project-context` (`canonical/profiles/consumer/always-set/core-goals.dispositions.yaml` L8) and its overlay unit (`always-set/core-goals.overlay.md`, header pin and L15) | rendered bytes | Thurgood re-renders the overlay line and re-grounds the pin. **The amendment pointer is subtracted from the consumer rendering**: the row gains a removal `{"text": " *(Amended <ratification date> by ballot 2026-11-05-core-goals-android-minimum, item 1; prior text at `10ec4af5b`.)*", "cites": "subtraction-2"}` (leading space included), on the precedent of the row's `#development-practices` removals; a ballot path and a DesignerPunk SHA mean nothing in a consumer repo. The row's two existing removals quote text outside the hunk and stand. Stacy re-signs (C1) in `canonical/profiles/consumer/signatures/core-goals.md` § `#core-project-context` |
| Data `#android-specific-guidance:preamble` (`canonical/operative-sets/data.yaml` L524–555; confirmer Data; consumer row `canonical/profiles/consumer/data.dispositions.yaml` L31, signer Data; overlay `canonical/profiles/consumer/data.overlay.md` L108 and L117) | the unit's bytes (site 2) | Thurgood applies L461 **byte for byte** from Data's text in § 3 (a seat's own charter line is applied by the profile author, since the seat's authoring commit would stale the unit it then confirms), re-quotes `native-7` (label and text "Android minimum version per Core Goals", `kind: obligation`, § 3), and re-renders the overlay line and pin. The row's one removal ("the stale `dist/*.kt` snapshots") quotes text outside the hunk and stands. Data re-confirms (C16) in `confirmations/data.md` § `#android-specific-guidance:preamble` and re-signs (C1) in `signatures/data.md` |

Everything else that carries the text is generated: `.claude/agents/data.md` L241, `.kiro/agents/data-prompt.md` L211, `canonical/_consumer-output/**` (the always-set copy of Core Goals and the `cc` and `kiro` outputs of both lines), and `canonical/generated.lock`. They change by regeneration, not by hand.

**Grants.** Thurgood's profile acts and the Data charter line are outside his standing write scope. Peter's ratification names these files, or a grant record does before the application PR: `.kiro/steering/core-goals.md`; `canonical/operative-sets/{core-goals,data}.yaml`; `canonical/profiles/consumer/always-set/core-goals.{dispositions.yaml,overlay.md}`; `canonical/profiles/consumer/data.overlay.md`; `canonical/agents/data.md` L461, byte for byte from Data's text; `canonical/generated.lock` and the generated roots. Each seat's confirmation and signature sections are its own acts and need no grant (signing-act ballot M1).

**Stacy's rendering check** (`[STACY R1]` § 1): before she assents, she checks the consumer rendering of the unit, not only the row. The site-3d removal's `text` must match the rendered pointer byte for byte, date filled; otherwise the subtraction does not fire and the consumer copy carries a DesignerPunk SHA.

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
| `tests/onboarding-trio/fixtures/born-{cc,kiro}/**` (`.claude/identity/designerpunk-core-goals.md`, `.kiro/steering/designerpunk-core-goals.md`, both `data` charters: 4 files with Android hits) | **frozen install-time record**: not edited. The rule behind leaving them is `tests/onboarding-trio/protocol.md` L7: the protocol "is meant to be re-run per release on the same fixtures, so cross-release findings stay comparable. Change it by commit, never in a run"; they are what a repo born at release 4 received, and the conformance beat measures renderings against `born-kiro`, so a stale copy is the point (`[STACY R1]` § 6). Verified frozen: the born-cc copy of Core Goals lacks the "Token selection" pointer line that #491 added to the live file (`grep -c` prints 0), so the fixtures were not regenerated by the last two Core Goals applications either |
| `.kiro/specs/070-agent-architecture/platform-agent-template-draft.md` L270 | spec-history; not edited |
| `.kiro/issues/2026-09-26-native-component-distribution.md` L30 ("a `minSdk` decision (Core Goals: Android is unconstrained today)") | **not edited by the application PR**: Kenya's and Data's record. Data appends a dated line saying the clause is superseded by this ballot, in a record-only commit inside the application window (§ 8 step 11); from the day site 1 merges, "Android is unconstrained today" is false against Core Goals (`[DATA R1]` § 2) |

A wider sweep (`Android minimum|minSdk|minimum version|API level`, outside specs and generated roots) finds only code defaults (`src/build/workflow/ConfigHelpers.ts`, `BuildOrchestrator.ts`, `AndroidFileOrganizer.ts` and their tests, defaults of 24 and a floor of 21), which are Ada's (§ 2). **They contradict API 26 and are not touched here.** No served governance doc states an Android minimum.

At application the sweep is re-run on the changed tree; the only "Android: Not yet constrained" or "(not yet constrained)" hits left are the ledger line and the frozen fixtures above, and the Web lines. Any other hit stops the PR.

## 7. Forks for Peter (none is picked here for him)

### F-1. Does Core Goals carry a Compose-floor clause, and if so, whose libraries?

Peter read Data's lean, "API 26, with the rule 'the higher of your number and Compose's floor'", and "23 today". The 23 is Data's measurement under the **harness pin** (Compose BOM 2026.09.00: `ui`, `foundation`, `runtime`, `animation` and `material-ripple` declare `minSdkVersion="23"`; `material3`, `coil-compose` and `colormath-ext-jetpack-compose` declare 21). All three options give an effective minimum of 26 today.

- **(iii) Drop the clause.** Core Goals says "Android: API 26 (Android 8.0)+" and nothing more. The "higher of 26 and the libraries' floor" rule becomes a **test in Spec 132's module** (the shipped module's `minSdk` equals Core Goals' number and is at least the highest floor of its dependencies) and an engineering note where the pin lives (the module's documentation, or Lina's `governance/platform-implementation-guidelines.md`); neither changes identity law.
  - **Both reviewers lean here.**
    - Data (`[DATA R1]` § 3): under (i) or (ii), the day a dependency raises its floor above 26, Core Goals' effective minimum rises with a bump PR, "with no ballot and no word from Peter. That is exactly the decision he made on 2026-11-05, re-made silently." Under (iii) the same upgrade fails the module's manifest merge, the toolchain stops it, and raising the minimum comes back to Peter.
    - Stacy (`[STACY R1]` § 3): a signed unit holds only text whose change is a change of law, and the converse has to hold: a change of law has to show up as a change in the signed text. Under (i) and (ii) the effective minimum moves when a Gradle file changes while the unit's bytes do not, so the chain cannot see it, nobody re-confirms, and no ballot is asked. My first draft's objection to (ii) ("a CI bump would silently change what Core Goals requires") applies to (i) in the same way.
  - **Residual** (both reviewers; mine): (iii) drops part of what Peter read ("with the rule"), so it is his call. In the window between a library floor rising and the ballot that follows, Core Goals understates the real minimum: an agent that picks 26 then gets a loud build failure, not a silent wrong build. Each future floor above 26 needs Peter's ruling before we can take that library release, so we may sit on an older one meanwhile. Agents lose the clause's reminder about library floors; "26+" still says 26 is a floor, not a target.
- **(i) The libraries the shipped Android module depends on.** My first draft's pick. It keeps the rule Peter read and moves the number with the module. **Residual**: the line names an artifact that does not exist yet (no module ships), the wording must name the highest floor across the dependency set (Data's fix), and the law can later move with nothing in the law's text changing (Stacy's point above).
- **(ii) The libraries the compile harness depends on.** Matches what Peter read literally (the 23 is the harness's), and exists today. **Residual**: Spec 129 Req 2.9 says harness pins are not minimums, and a CI maintenance bump would move the line, with the same silent-change cost as (i).

**My lean, visible and changed.** I recommended (i) in the first draft and named (iii) as the class-level option. After the reviews I lean **(iii)**: Stacy's converse-of-W-9 argument shows that my reason for preferring (i) over (ii) applies equally to (i), and Data's shows (i) would silently re-make the decision Peter just made. What survives of (i): it keeps the words Peter read. The pick is Peter's.

### F-2. Core Goals' Android line becomes a promise to adopters

With the item an `obligation` (Stacy's ruling), the consumer copy of Core Goals ships "Android: API 26 (Android 8.0)+" into adopters' repos, and **an adopter's agent will push back on that adopter's own `minSdk` below 26**. iOS already works this way ("iOS: 17.0+" is an obligation), and the components need 26 without desugaring (`InputCheckboxLegal.android.kt` L242 calls `java.time`; at 23–25 it works only if the adopter enables core-library desugaring, `[DATA R1]` § 1). It is a cost an adopter pays, and "Re: 5, 26" did not name it. Stacy: consumer-facing changes stay Peter's under "Trust, but verify" (`[STACY R1]` § 2). **The question is whether Peter accepts it.** No cheaper alternative has been vetted by the reviewers; if he does not accept it, the item cannot ship as an obligation and its kind goes back to Stacy.

## 8. Application (on ratification; one PR, Peter-merged)

1. **The Status commit** (record-first), before any edit site: `**Status**: **RATIFIED (Peter, <date>)** — <F-1 answer>`, his dated words quoted, `<ratification date>` filled in the pointer and the removal, the README roll entry added. It also appends **§ 9, Resolved after-texts**: each site's after-text exactly as it will be applied under Peter's F-1 answer (site 2's text is already final in § 3), so the claims pass compares the application diff with § 9 byte for byte.
2. Branch `chore/core-goals-android-minimum`. Stop on any before-text that does not match at the application base: `git diff --quiet 10ec4af5b <base> -- .kiro/steering/core-goals.md canonical/agents/data.md canonical/operative-sets/core-goals.yaml canonical/operative-sets/data.yaml canonical/profiles/consumer/always-set/core-goals.dispositions.yaml canonical/profiles/consumer/always-set/core-goals.overlay.md canonical/profiles/consumer/data.dispositions.yaml canonical/profiles/consumer/data.overlay.md`.
3. PR body: `**Edit kind**: .kiro/steering/core-goals.md — LAW (.kiro/docs/ballots/2026-11-05-core-goals-android-minimum.md)`; `**Edit kind**: canonical/agents/data.md — EXECUTION (ballot 2026-11-05-core-goals-android-minimum § 3)`; `**Consulted**:` Stacy, Data. Data's charter line is a charter edit: Peter merges.
4. **Authoring commit** (Thurgood): site 1 only. Run `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --ci` and `npm run -s check:122:diff-guard` on it **before briefing Stacy**: the authoring commit must not move `canonicalHash` (a hash move here fails links 2 and 3). The freshness sweep will report the unit stale; that is expected.
5. **Profile-author commit** (Thurgood): site 2 byte for byte from Data's text; `platform-android` (`obligation`) and `native-7` (`obligation`) re-quoted, so the confirmers' acts confirm and do not correct; both overlay lines and pins re-grounded to the **recomputed** unit hashes (`hashText` over `partition(splitFrontmatter(...).body).units`), without editing either `canonicalHash` field; the dispositions removal (site 3d).
6. **Regeneration**: `npm run build:generator`; commit the generated roots as the pre-signature rendering. **Order check** (the #491 residual): run the generator once on the authoring commit and once after the profile-author commit; the generated roots must be byte-identical. A difference means the items enter the rendering: stop and report it to Stacy before any seat acts.
7. **Seat acts**, each as its own commit under its own `Agent:` trailer, trailers sharing the message's final paragraph, never an amend: **Stacy** re-confirms (moves `canonicalHash`, dated record, the 2026-09-29 reason re-ruled, all items re-read as verbatim substrings by script) and re-signs `#core-project-context`; **Data** re-confirms and re-signs `#android-specific-guidance:preamble`. Stacy makes the rendering check in § 5 before she assents.
8. **Lock refresh**: a second `npm run build:generator`; every output must stay byte-identical; commit `canonical/generated.lock` only. Checks: `npm run -s check:122:diff-guard` (with `verify-signing-chain --ci`); `npm run -s check:section-citations`; `node scripts/validate-steering-metadata.js`; `npm test`. **Before Peter merges**: `verify-signing-chain --audit --pr <n>` (not `--ci` over `main`'s squashes, which fails link 2 by construction). Core Goals is an identity doc and is not served by the docs MCP, so no `rebuild_index` is owed.
9. Sweep: re-run § 6's command on the changed tree; the allowed hits are the ones § 6 lists.
10. **One lock-carrying PR at a time**: the owner re-merges `main` into the branch right before Peter's turn. Afterwards Stacy's signing act is audited by the rotating delegate and counted in her next record.
11. **Data's record-only commit**, inside the application window: a dated line on `.kiro/issues/2026-09-26-native-component-distribution.md` (the distribution charter, Kenya's and Data's) saying that L30's "Core Goals: Android is unconstrained today" is superseded by this ballot. His act, under `.kiro/issues/README.md` rule 9; it needs no grant.

**When.** Before Spec 132 ships anything that sets `minSdk`; preferably before 16.3.0's S, so the release does not ship a Core Goals line that contradicts a ruling already made.

## 9. Resolved after-texts

*(Appended by the Status commit.)*

## 10. Counter-argument (fold-back applied first), cost and what survives

**I recommend** the one-item ballot (Peter's (a)), with the Data line reduced to a pointer, `kind: obligation` for both items (ruled and re-ruled by the confirmers), and, on F-1, **(iii)**: drop the clause. That is a change from my first draft's (i), made on the reviews. The pick is Peter's.

**Counter-arguments I ran against my own draft, and what they changed:**
1. *"A bare number would do; the clause adds a referent that does not exist."* **Taken in R2**: both reviewers made the same argument, with reasons I had not seen (the unit's bytes do not change when the effective minimum does; a dependency bump re-makes Peter's decision silently). It moved my lean to (iii). What it did not change: the clause is Data's words and Peter read them, so removing it is his call.
2. *"Two homes for the number (Core Goals and Data's line) go stale together."* **Folded in**: Data's line drops "(not yet constrained)" and keeps the pointer only, so the number lives in one place.
3. *"The pointer in the signed unit makes the consumer's rendering carry a DesignerPunk SHA."* **Folded in**: the dispositions removal subtracts it from the consumer rendering (§ 5), as the `#development-practices` rows do, and Stacy checks the rendering before she assents.
4. *"A CORRECTION would be cheaper for the Data line."* **Rejected with evidence, and conceded by both reviewers**: its referent changes in the same PR, which the README excludes (§ 3).

**What survives:**
- **The ratio.** One ruled fact, "26", became a ballot, a reviewed draft, a Status commit and an application PR: twelve acts by four parties (Thurgood, Stacy, Data, Peter: the draft, two reviews, Peter's ratification, the Status commit, the authoring commit, the profile-author commit, the regeneration, Stacy's confirm-and-sign, Data's confirm-and-sign, the lock refresh, Peter's merge), two generator runs, and now a thirteenth: Data's record-only line on the distribution charter (§ 8 step 11). The signing chain does guard steering drift (a hash-moving authoring commit is caught mechanically), so the cost buys something real; what it buys on a one-line numeric fact is the question Spec 131 is examining. This ballot does not shorten the path. It is entered in Spec 131's governance-cost ledger.
- **Consumer exposure** (F-2). Not shown to Peter before this round; it is on the PR's `**Open for Peter**:` lines now.
- **The F-1 residuals**, whichever way he rules: under (iii) a window of understatement that fails loudly; under (i) and (ii) a law that can move without its text moving.

**Cost to the reviewers:** Stacy, one re-confirm and re-sign of a unit she has confirmed before (8 items, now with one re-ruled kind); Data, one re-confirm and re-sign of a 7-item unit (one item's kind re-ruled), and one record-only line.
## 11. Review record

*(Reviewers write scratch entries; the holder splices them here, byte for byte, and checks them with `cmp`. Reviewers cannot write `.kiro/docs/ballots/**`.)*

### [STACY R1] (required)

**Read** from git at `origin/chore/ballot-core-goals-android-minimum` `022e06f5a` (the ballot, 193 lines). I checked these against the tree at `10ec4af5b` with `git show`:
- `core-goals.md` L25–31;
- `confirmations/core-goals.md` L38–44, the 2026-09-29 ruling;
- `signatures/core-goals.md` § `#core-project-context` (signer stacy, `ROUTED`, `assent — surviving 8/8`);
- `core-goals.dispositions.yaml` L8;
- the register rows that cite `core-goals.md`;
- the README's census conventions (L32–37);
- `tests/onboarding-trio/protocol.md` on the born fixtures.

I ran nothing else.

**Verdict: ready for Peter once three things are done.**
1. **The kind is decided now.** I rule it below: `obligation`. The profile author's commit can then author it, and my confirm act will confirm it rather than correct it.
2. **Data's final site-2 text is in § 3 before Peter ratifies**, so he ratifies the exact line and not a proposal.
3. **Two wording fixes in the census block** (§ 4 below).

I concede the divergence on site 2: Thurgood is right. My lean on F-1 is (iii), with the reasoning in § 3 below.

---

**1. The application path, against what my confirm act needs** → § 5, § 8

The order in § 8 matches what my act needs:
- the authoring commit (site 1 only), checked by `verify-signing-chain --ci` and `check:122:diff-guard` before anyone briefs me;
- the profile author re-quotes the items and re-grounds the overlay pins to the recomputed hashes, without editing either `canonicalHash`;
- regeneration, with the #491 order check;
- the seat acts, each in its own commit, with trailers in the final paragraph and never an amend;
- the lock refresh;
- `verify-signing-chain --audit --pr <n>` before Peter merges.

The record I will write follows the #535 precedent:
- what changed;
- what I read in this session;
- the hash from → to, recomputed with `hashText` over `partition(splitFrontmatter(...).body).units` and equal to the overlay pin and the freshness sweep;
- all 8 items re-read as verbatim substrings, by script;
- the ruling.

My re-sign in `signatures/core-goals.md` gets a new `renderedHash` and a verdict over the surviving items.

**Three things are missing or out of order:**
- **The kind has to be settled before step 5, not at step 7.** § 2 point 2 and § 5 say I "rule" the kind at my confirm act. But the kind is a field of the item, which the profile author writes at step 5. If I then rule differently, my act is a CORRECTION of the item set. That re-opens steps 5 and 6: the item, the order check and the pre-signature rendering. My ruling is below (§ 2), so step 5 can author it and my act can be CONFIRMED.
- **Site 2's final text must be in this ballot before ratification.**
  - § 3 offers "my proposal for him", and § 8 step 1 has the Status commit append "Data's final text for site 2" to § 9.
  - An EXECUTION covers only the edit the clause names, and "excess text in the same hunk is LAW or CORRECTION" (README).
  - If Data's final line differs from § 3 and arrives only at the Status commit, Peter has ratified a different line from the one applied.
  - The fix: splice Data's text into § 3 at R2, so § 9 is mechanical.
- **My re-sign needs one more check, which I will make.** The consumer rendering of the unit subtracts the amendment pointer (the site-3d removal). The removal's `text` must match the rendered pointer byte for byte, date filled. Otherwise the subtraction does not fire and the consumer copy carries a DesignerPunk SHA. I will check the rendering, not just the row, before I assent. Nothing in the ballot needs to change for this; I record it so it is not assumed.

---

**2. The kind, and my re-ruling of the 2026-09-29 reason** → § 2 point 2, § 5

- **Ruling: `platform-android` becomes `kind: obligation`.** A minimum is something an agent can act against, the same as `principle-6` ("iOS: 17.0+"). The profile author authors it that way at step 5, and my confirm act will confirm it.
- **My 2026-09-29 reason is split, not just inverted.** It read: "'Not yet constrained' is a platform fact a consumer's agents build against: an agent that imposes a minimum version contradicts it." That reason now holds for `platform-web` only, which stays `member`.
  - For `platform-android`, my new record will give the reason as: an agent that sets, accepts or recommends an Android minimum below the line's floor contradicts it.
  - If F-1 keeps a Compose clause, the reason names that clause's floor too. Under F-1 (iii) it names 26 alone.
  - The wording is my own record, written at my act. The ballot's proposed reason is fine as a proposal.
- **The 2026-09-29 record stays inline as a ledger entry** (§ 6's disposition of L44 is right). My new dated record goes above it.
- **The consumer exposure in § 10 is real, and it belongs on the PR's `**Open for Peter**:` line.**
  - With the item as an `obligation`, an adopter's agent will push back on that adopter's own `minSdk` below 26.
  - That is a promise made to adopters. Consumer-facing changes stay Peter's under "Trust, but verify".
  - § 10 says "it is listed here so ratification includes it". That works only if Peter reads it where he decides.

---

**3. F-1: what the Compose-floor clause points at. My lean is (iii), drop the clause.** → § 2 point 1, § 7

- **The argument for (iii) is the signing chain's own guarantee.**
  - A signed unit holds only text whose change is a change of law (ballot `2026-10-17-no-volatile-metadata-in-signed-units`). The converse has to hold too: a change of law has to show up as a change in the signed text. Otherwise the chain cannot see it, and nobody is asked to re-confirm.
  - Under (i) and (ii), Core Goals' effective Android minimum moves when a Gradle file changes. In (i) that is Spec 132's dependency bump; in (ii) it is the harness pin. In both cases the unit's bytes do not change, so it is never stale, and there is no confirmer's read and no ballot.
  - The draft's reason against (ii), "a CI bump would silently change what Core Goals requires", applies to (i) in the same way: a module dependency bump is also a change made outside law.
- **Under (iii) the line is the whole law.** An agent can evaluate it from Core Goals alone, today, with no empty referent.
  - The draft's own § 2 point 1 says what happens if Compose's floor ever rises above 26: the module's build fails at the manifest merge.
  - That failure is loud, and it forces a decision: a ballot to raise the minimum, or holding Compose back. That is the right owner for that decision.
- **The rule "the higher of 26 and Compose's floor" still deserves a non-model check.** It belongs in Spec 132's module, as a test: the shipped module's `minSdk` equals Core Goals' number and is at least the pinned Compose's declared floor. That is the class-level home for a toolchain fact, the one the draft names for (iii).
- **The counter-argument, and what survives.**
  - (iii) drops part of what Peter read ("with the rule"), so it is his call.
  - In the window between a Compose floor rising and the ballot that follows, Core Goals understates the real minimum. An agent that picks 26 then gets a build failure, not a silent wrong build. That window is the residual.
  - (i) has its own residual: the line names an artifact that does not exist yet, and the law can later move with nothing in law changing.
  - I would take the loud residual over the silent one.

---

**4. The census block (I am the census reader)** → § 4

- **Grammar.**
  - The README says every presumptively in-scope item carries **exactly one** `**Census**:` line. This ballot has one item, item 1 with sites 1–3, and four lines. Read literally that is a grammar finding.
  - In substance, one line per instrument is the honest form when one item touches four instruments. The README does not address that case. I read the four lines as the census, and suggest a sentence in § 4 that names the deviation, so a later reader does not count four items. Whether the README should say this is for Spec 131's ledger, not this ballot.
  - L93 says "Items 2 and 3". There is one item, so it should say sites 2 and 3.
- **The in-scope calls:**
  - **`check-section-citations`: VALID.** The edit adds no citation and renames no heading.
  - **The register rows citing `core-goals.md` lines: VALID.** `no-autonomous-token-creation` cites L55–59, `no-hardcoded-color` cites L50 and L53, and the L71 citation is in a history line. The edit is on L29 and adds no line.
  - **`122-diff-guard` with the freshness sweep, and `verify-signing-chain`: VALID only on the merged-state reading.**
    - The not-in-scope form requires "why no verdict or surface can change". Between the authoring commit and the seat acts, both instruments do change verdict: stale, then unsigned. The line says so itself.
    - What holds is the end state. At the application PR's merge, after § 5's acts, the freshness verdict is fresh as before. The chain is consistent as before. The `#core-project-context` row stays `ROUTED`; my signature already records it as routed, so the kind change does not move it.
    - I accept both lines on that reading, and ask that their reason say "at the merge, after § 5's acts" instead of describing the stale state.
  - **No digests to reproduce.** Not-in-scope lines carry none, and none of the three README forms has a place for a scratch diff over inputs rather than code. This is not a failure.
- **Presumptive scope I checked, and found nothing missing.**
  - The governance-examples guard reads served governance docs. Core Goals is an identity doc and is not served, and the edit names no token.
  - The render-fidelity sweep over `canonical/agents/*.md` runs under `check:122:diff-guard`, so L93's "data.md is read by the 122-diff-guard closure" covers site 2.

---

**5. The site-2 divergence: I concede. It is EXECUTION, not CORRECTION.** → § 3

- **Thurgood is right.** My Spec 129 design review called the Data L461 edit a CORRECTION "whose referent is the ratified Core Goals line". By the README's test that cannot carry it: "Two kinds of referent changed in the same PR never count: governance text…", and Core Goals changes in the same PR.
- **This ballot names the edit before it is made**, so it is a PRE-DECLARED EXECUTION. The PR body cites § 3, and Data reviews the text as the doc's owner.
- **Reducing the line to a bare pointer is the better class choice.** The number lives only in Core Goals. A later change to the minimum then stales one signed unit, not two.
- **The EXECUTION needs § 3 to carry Data's exact text before ratification** (§ 1 above). With only a proposal in § 3, the application would be "excess text in the same hunk".

---

**6. The frozen onboarding fixtures: agree, leave them unchanged** → § 6

- **The four `tests/onboarding-trio/fixtures/born-{cc,kiro}/**` files are inputs to a standing regression instrument.** `protocol.md` L7: "it is meant to be re-run per release on the same fixtures, so cross-release findings stay comparable. Change it by commit, never in a run."
  - They are the founder repos of the join and conformance runs (protocol L816–817).
  - They are what a repo born at release 4 received. Re-rendering them would change the instrument's starting state as a side effect of a law edit. The conformance beat measures renderings *against* `born-kiro` (`2026-10-25-kiro-conformance-pair-requeue.md` L18), so a stale copy is the point.
- **Thurgood's frozenness check is sound.** The fixtures lack the "Token selection" pointer that #491 added, so the last two Core Goals applications left them alone too. `tests/` is not in the package's `files`, so nothing ships from them.
- **I would add one thing.** § 6 should cite `protocol.md` L7 as the reason the fixtures stay as they are, rather than "frozen install-time record" alone. Then at application, a re-run of the sweep that hits them has a citable rule behind leaving them, not just a judgment.

---

**Counter-argument to my own review.** My conditions add a round before Peter ratifies, on a one-line law that the draft already counts at twelve acts.
- **What it changed:** I gave the kind ruling here instead of asking for another exchange, and accepted the census lines on a reading instead of asking for a redraft.
- **What survives:** Data's site-2 text still has to arrive before ratification, which may cost one splice cycle. F-1 is still Peter's.

#### [DATA R1]

Read: `chore/ballot-core-goals-android-minimum` at `022e06f5a`. Before-texts were checked at `10ec4af5b`. Labels: **VERIFIED** = I read or ran it myself; **REASONING** = inference or training data. No repo edits.

**Plain language first.**
- The Android fact is right: API 26 is Android 8.0, and the Compose libraries we pin today need API 23 at least.
- Site 2's new text is fine as Thurgood wrote it. I will re-rule `native-7` to an obligation at my confirm act.
- EXECUTION is the right kind for my charter line.
- **On F-1 I have changed my mind, and I am saying so plainly.** The "higher of 26 and Compose's floor" rule was mine, and Peter read it in my lean. Working the counter-argument against it, I now lean to **(iii): drop the clause.** As written, a future library upgrade could raise the Android minimum, and so drop phones Peter chose to support, without coming back to him.

---

**1. Site 1 as Android fact** → § 2, item 1, site 1
- **Correct:**
  - **"API 26 (Android 8.0)+"**: API 26 is Android 8.0 (REASONING, platform fact), and "+" reads as a floor.
  - **The floor is 23 today** under Compose BOM 2026.09.00: `ui`, `foundation`, `runtime`, `animation` and `material-ripple` declare `minSdkVersion="23"`; `material3`, `coil-compose` and `colormath-ext-jetpack-compose` declare 21 (VERIFIED, read from the cached AAR manifests on 2026-11-04).
  - **The effective minimum is 26 today** whichever referent F-1 picks.
- **Imprecise, if the clause stays** (under F-1 (i) or (ii)):
  - (a) **"The minimum SDK required by the Compose version" names one number where there are several.** Compose is a set of artifacts with different floors (above), and libraries outside Compose (Coil, a colour library) can raise the floor too. The accurate wording is "the highest `minSdk` declared by the libraries that module depends on".
  - (b) **§ 2 point 1's reason needs one correction.** "The adopter's build fails if its `minSdk` is below the Compose release's declared floor" is true as a manifest-merge rule (REASONING; AGP's merger refuses a lower `minSdk` unless `tools:overrideLibrary` is set). But the adopter meets **our module's** declared `minSdk` (26), not Compose's directly. The Compose floor binds us when we set the module's `minSdk`.
  - (c) **"Pins" understates the floor an adopter can meet.** Gradle resolves the highest version any module requests (REASONING), so an adopter on a newer Compose than ours can meet a higher floor than our pin's. That is the adopter's own choice and not Core Goals' business, but it shows the clause cannot describe an adopter's real floor anyway.
- **One precision in § 10.** "The components need 26 (`java.time`)" means "need 26 without desugaring". `InputCheckboxLegal.android.kt` L242 calls `java.time` with no version guard (VERIFIED); at 23–25 it works if the adopter enables core-library desugaring (REASONING). This does not change the line.

**2. Site 2, my charter L461, and `native-7`** → § 3
- **Before** (VERIFIED at `10ec4af5b`, `canonical/agents/data.md` L461): `- Android minimum version per Core Goals (not yet constrained)`.
- **After, my final text**: `- Android minimum version per Core Goals`. I accept Thurgood's proposal as written. The number stays in Core Goals alone, so a later change re-confirms one unit, not two.
- **`native-7`** (`canonical/operative-sets/data.yaml`, VERIFIED at `10ec4af5b`: `kind: member`, with label and text both "Android minimum version per Core Goals (not yet constrained)"):
  - **Re-quote**: label and text both become "Android minimum version per Core Goals".
  - **Kind, my re-rule at my confirm act: `obligation`.** The item now binds me to a number I can contradict by setting or accepting a `minSdk` below it, the same reason `principle-6` ("iOS: 17.0+") is an obligation.
  - **My 2026-10-19 reason stands**: "binds the minimum version to Core Goals rather than a choice of my own" (`canonical/profiles/consumer/confirmations/data.md`, `#android-specific-guidance:preamble`, VERIFIED).
- **My confirm act, after the profile-author commit and the regeneration (§ 8 step 7):**
  - I re-confirm `#android-specific-guidance:preamble` at 7 items, with `native-7` re-ruled to `obligation`. I move `canonicalHash`, append a dated record above the 2026-10-19 one, and re-read each item as a verbatim substring.
  - I re-sign the consumer row in `signatures/data.md`.
  - Each is its own commit, under `Agent: Data`.
- **The distribution charter's L30** ("Core Goals: Android is unconstrained today"; Kenya's and mine). I append a dated line saying it is superseded by this ballot, in a record-only commit inside the application window. I would rather not wait for Spec 132's outline: from the day site 1 merges, the line is false against Core Goals.

**3. F-1, what the Compose-floor clause points at** → § 7
- **My lean: (iii), drop the clause.** Core Goals says `Android: API 26 (Android 8.0)+`. This is a change from my own lean that Peter read.
- **Why**, the counter-argument I had not run before:
  - Under (i) or (ii), the day a library our module depends on raises its floor above 26 (to 28, say), Core Goals' effective minimum rises with the upgrade. Android 8.0 and 8.1 drop out of support in a dependency-bump PR, with no ballot and no word from Peter.
  - That is exactly the decision he made on 2026-11-05, re-made silently.
  - Under (iii), the same upgrade fails our module's manifest merge, because our `minSdk` of 26 is below the library's floor (REASONING, as § 1 (b)). The toolchain stops it, and raising the minimum comes back to Peter.
- **So the clause adds no protection the build lacks, and removes the one that matters.**
  - The "higher of" rule then lives as an engineering note where the pin lives: the shipped module's documentation, or `governance/platform-implementation-guidelines.md`, which is Lina's.
  - Neither of those changes identity law.
- **Against (ii)**: as Thurgood says, plus the above. A CI bump would also move the line.
- **What survives, after folding back**:
  - Each future androidx floor above 26 needs Peter's ruling before we can take that Compose release, so we may sit on an older Compose meanwhile.
  - Agents lose the clause's reminder about library floors. "26+" still says 26 is a floor, not a target.
  - Peter read "with the rule", so dropping it is his call, not mine.

**4. The divergence: EXECUTION, not CORRECTION, for L461** → § 3
- **I agree with Thurgood: EXECUTION.**
  - "(not yet constrained)" was true until site 1 changes Core Goals. It becomes stale only through this ballot's own edit, and its referent changes in the same PR.
  - A CORRECTION repairs text that was false against a referent that already stood. That is not the case here, and the README's same-PR exclusion settles it.
  - As the doc's owner, I review and supply the text (above).

**Verdict**: site 1 is correct as Android fact. Under (i) or (ii) its wording needs (a)'s precision. Site 2's text is accepted, with `native-7` → `obligation` at my confirm act. EXECUTION is the right kind. On F-1 I lean (iii), a change from the lean Peter read.


### [THURGOOD R2] (2026-11-05; incorporation)

Incorporated into the sections above, not appended. What changed, by reviewer:

**Stacy R1**
- § 1 first item (kind before step 5): **taken**. `platform-android` is `obligation`, ruled, with the 2026-09-29 reason split and left inline (§ 2 point 2; § 5 row 1; § 8 step 5).
- § 1 second item (Data's final text before ratification): **taken**. § 3 carries it; § 8 step 1 and § 9 are mechanical.
- § 1 third item (the consumer rendering of the removal): **taken** as a named check before her assent (§ 5, after the table).
- § 3 (F-1 lean (iii)): **presented, not picked**. § 7 F-1 sets out (i), (ii) and (iii) with both reviewers' leans and residuals, and my own lean, changed to (iii).
- § 2 (consumer exposure belongs on the Open-for-Peter line): **taken**. § 7 F-2 and the PR body.
- § 4 (census): the one-per-instrument sentence, "sites 2 and 3" and the merged-state reasons are in § 4.
- § 6 (cite `protocol.md` L7): in § 6.
- § 5 (she concedes EXECUTION): § 3 says both reviewers agree.

**Data R1**
- § 1 (a): the wording fix for the clause under (i) and (ii) is in § 2's after-texts.
- § 1 (b) and (c): the reason in § 2 point 1 is corrected (the adopter meets the module's declared `minSdk`; an adopter on a newer Compose can meet a higher floor).
- § 1, `java.time` precision: § 7 F-2 now says "without desugaring".
- § 2 (final site-2 text; `native-7` label, text and kind): § 3. His distribution-charter line: § 6 and § 8 step 11.
- § 3 (his change of lean to (iii)): § 7 F-1.
- § 4 (EXECUTION): agreed in § 3.

**No change, with the reason.**
- The register rows' census reading stays as Stacy accepted it.
- Nothing in either review disputes the 26, the Web line or the EXECUTION of site 2.

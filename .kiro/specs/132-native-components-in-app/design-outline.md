# Design Outline: 132 — Native Components in the App

**Date**: 2026-11-27 (replaces the 2026-11-07 placeholder from #723, whose text is at `a953ac70d`)
**Spec**: 132-native-components-in-app
**Author**: Thurgood (spec formalization), briefed by the orchestrator
**Status**: **R3 DRAFT — ready for Peter's sitting-2 batch (§ 5.1, "Sitting 2, in decision order"). P-6 is RULED (2026-11-27T18:32:45Z, "(B), raise to iOS 18").**
**Read at**: `origin/main` `8553499b1` for the facts in `evidence/`, and `017514064` for record states.
**Round cost (estimate, for the orchestrator to surface)**: **about 20–23 sessions and 3–4 of Peter's sittings**, low confidence; about 17.5 are spent. The breakdown is § 8.

**Labels** (as in plan-r2): **VERIFIED (who)**: the named seat ran or read it. **REASONING**: inference. **UNVERIFIED**: nobody has checked it.

## About this outline

- **What R3 holds**: the seeded outline (plan-r2 § 6 item 8), with R1, the R2 cross-read and two T-1 R3 entries folded in.
- The ledgers are `feedback/design-outline.md` § "[THURGOOD R2]", § "[THURGOOD R3]" and § "[PETER] P-6".
- **What is decided**: Nothing here is decided except what is marked **RULED** with Peter's words, or **CLOSED** with the owning seats named. Every question still open has options and no pick. Nothing is built, scaffolded or created by this file.
- **Facts**: `evidence/facts-at-8553499b1.md`, the unedited stdout of `spec-facts.sh 132 b89163c41 8553499b1` (the window starts at the plan of record's commit).
- **Pointer-shaped on purpose**: facts that go stale (error counts, entry counts, sizes, what has shipped) are cited from their records or labelled with the SHA they were read at. They are not copied as current.
- **Owners (by domain)**:
  - Kenya (iOS: packaging, the D4 app, the render lane, the iOS minimum's evidence) and Data (Android: the same, the toolchain range, the API-26 floor test);
  - Lina (component content, the public-API pass, the contract tests, the access-level and contract-validation ballots, the `rendering:` schema);
  - Ada (`generate`, which owns our module's manifest; deprecated aliases; the token-emitter preconditions in § 4.1; the release script, for D7);
  - Leonardo (the fixture app's content, the adopter journey, the walkthrough, the code samples);
  - Sparky (web, for § 5.3);
  - Thurgood (formalization, the D6 checker, the measured-cost record's form, RELEASE-FLOW's step text);
  - Stacy (the claims passes, the LENS read at the tasks round, the CLOSEOUT read).

---

## 0. The outline in one screen (for Peter)

- **Your goal, in your words** (§ 1): adopters use DesignerPunk's native components as a package dependency, build more with DesignerPunk, and "the components are functional, and will successfully render, in the app as described."
- **Where we are at `8553499b1`**: Spec 129 closed.
  - The generated token files compile on iOS and Android, and our component source compiles against them except for pinned errors (49 iOS, 93 Android, VERIFIED Thurgood by counting `harness/expected/*.tsv`).
  - No app is built, nothing is linked, no DesignerPunk component is rendered and no native contract is tested.
  - "Do not start a native product" is still printed.
- **What this spec does**: takes the components from "compiles in our checks" to "builds, links, renders and behaves as described in an adopter's own app", one family at a time.
  - The first family is the Chip family plus Icon-Base plus one adopter-built component.
- **The probes**:
  - Data's Android probe **passed** in CI (#884): the emulator runs on the free runner, so no billed runner is needed.
  - Kenya's iOS tools work on iOS 26.0.
- **You ruled the iOS minimum** (P-6): "(B), raise to iOS 18", and confirmed it after hearing that three iPad models that stop at iPadOS 17 are dropped (no iPhone is). So:
  - D4's iOS target is 18.0,
  - a release-time run on iOS 18.5 or 18.6 joins the CI lanes,
  - shipped text will read "built for iOS 18.0; tested on <runtime>",
  - and a Core Goals ballot must be ratified before 132's first claim.
  - The iOS 17 run is no longer needed.
- **What the team settled in review** (§ 5.2):
  - one module per platform that contains only the families that are ready (T-14), so the first family's app does not wait for every other family's repair, and a family that is not ready is not callable at all;
  - hand-written Xcode projects;
  - one stored string for the chosen theme on both platforms;
  - an in-app accessibility read that proves a view is hidden from VoiceOver;
  - grants for CI lanes written once per lane.
- **What you decide now** (§ 5.1, sitting 2):
  - the definition of done (D4–D10, with D8's wording fix and D4's new iOS target);
  - per-family claims;
  - which release carries the first claim;
  - device reads;
  - who may exclude a contract;
  - the adopter bar;
  - a token review for scalable text sizes;
  - one schema shape on which two seats split three times;
  - and, if the orchestrator includes it, web render evidence.
- **What must be fixed first** (§ 4.1): the two token-emitter defects (#870, #873, both now recorded on `main`), the served-doc correction that goes with them (#872), and row 7's warning gap.
  - Until they land, an adopter-built component's own tokens can break the native build silently.
- **What this PR's merge does** (§ 7): it carries out your 2026-11-27 answer, "Spec with (a)": the distribution charter, the goal's home since 2026-11-05, closes into this spec.

---

## 1. Goal and acceptance (carried word for word)

**The goal, in Peter's words** (received 2026-11-05T03:09:41Z, orchestrator relay; verbatim record `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/peter-2026-11-05.md`; the typo is kept as received and is read "will successfully render", meaning unchanged):
- "I envisioned adopters building tokens and components within the DesignerPunk ecosystem, and leveraging them in their project."
- "Re: 2, I was envisioning (a)".
  - Option (a) is components as a **package dependency**: our source is compiled inside the adopter's own build, from `node_modules`, and updated by `npm update`.
  - A binary package is ruled out under Model B (plan-r2 § 1, "What 'dependency' means here").
- "they can use our existing ones and use DesignerPunk to build more as they require."
- "That the components are functional, and will successful render, in the app as described."

**132's acceptance sentence**: "A stranger's `init` → `generate` yields a compiling, themed target on all three platforms with nothing copied from `node_modules`."
- (**RULED**, "B (a)", received 2026-11-05T04:07:43Z; moved word for word from Spec 129; Stacy's conditions 1 and 2, plan-r2 § 6 item 8; condition 1 VERIFIED by Stacy, byte for byte, in R1)

**The definition of done** is plan-r2 § 1 "The definition of done", rows D1–D10 and their "details" paragraphs, at `b89163c41`, with the D1 probe sentence replaced as the native-plan `README.md` records at `55004006b` (L23) (Peter, received 2026-11-05T05:14:42Z).

So the table is two fixed texts at two SHAs. It is cited, not copied, so there is one table to keep true.
- **D1–D3 are Spec 129's part of done** (**RULED**, "C yes"). 129 delivered them at its close (CLOSEOUT pass, § "For the reader"). D3 is "129 builds it; 132 brings it to zero": the pinned component entries are 132's to remove.
- **D4–D10 are decided at this outline's gate** (native-plan `README.md`, the deferred-decisions table). § 5.1 puts them to Peter. A seat that changes a D row later, its details included, needs his approval (Stacy, condition 2).
- **The D-row change list** (Stacy R1): 132's requirements round carries, in its Context for Reviewers, a list headed "D-row changes since `b89163c41`", even when it reads `none`. Stacy's LENS and CLOSEOUT reads check it. Changes this round surfaced, each Peter's:
  - D8's population (P-1);
  - **D4's iOS deployment target, 17.0 → 18.0** (plan-r2 § 1, "D4 details", "iOS: deployment target 17.0"; it follows from P-6's ruling, and is put to Peter inside P-1 as a D-row edit);
  - and, only if they arise, T-12's audit exclusion (P-11) or a static-only iOS evidence kind for D7 (P-12).

**What "as described" means and does not mean** (plan-r2 § 1):
- each component's Stemma contracts pass as tests on that platform, each test shown to fail on a known-bad case.
- It does **not** mean system controls look the same on iOS 17 and iOS 26: a component that follows platform convention gets the system's look, and one that departs is drawn by us and checked by D5 (ballot `2026-10-18-true-native-development-is-not-true-native-design`).

**What stays a reading, not a check** (plan-r2 § 1, Stacy): whether a test covers everything its contract says (fit, sampled at CLOSEOUT), and spoken screen-reader output unless a human hears it.

---

## 2. Scope: where 129 stops and 132 starts

**The line** (plan-r2 § 2, Ada PLAN R1): "129 owns what `generate` emits and what the package ships; 132 owns what is written into, or runs in, an adopter's app." 132's write scope includes the generator paths, with Ada as one of its owners.

**In 132** (plan-r2 § 2, work packages 3 remainder, 4, 5 and 6):

- **D3 to zero**
  - **What it means here**: The pinned component entries 129 left, tagged to `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` (45 iOS and 89 Android at `8553499b1`), plus 4 per platform tagged to the blend record. Under T-14 (ii) each family reaches zero in its own unit, and D3 stays a whole-package row
  - **Owners**: Lina; Kenya and Data verify
- **Public API and packaging** (WP4)
  - **What it means here**:
    - The access-level rule (a ballot, § 4.2);
    - iOS: the 20 views an app cannot construct (the goal record's "Access-pass list");
    - Android narrows helpers and previews;
    - `generate` owns our module's manifest (root `Package.swift`, the Android module folder), scoped to ready families (T-14) and under Ada's three conditions (§ 4.3);
    - deprecated-alias emission before the claim (none exists today, VERIFIED Ada)
  - **Owners**: Lina (API); Kenya, Data (shapes); Ada (`generate`, aliases)
- **The app** (D4)
  - **What it means here**: An adopter-layout app on each platform, built from a packed install, with plain `import` only, the anti-copy check, a non-`DP` abbreviation and one adopter theme (plan-r2 § 1, "D4 details"). It builds the adopter's **default** manifest, not the full set (Leonardo R2).
    - iOS: deployment target **18.0** (P-6, RULED; a D-row edit inside P-1); a hand-written `.xcodeproj` with synchronized folders (T-3), and the package referenced as `.package(name: "DesignerPunk", path: …)` (T-4).
    - Android: `compileSdk` 37 at the pinned Compose BOM (§ 6), against the harness's 36.
    - Content: Leonardo's catalog screen built from the served samples, and a filter-and-tags product screen written as a real screen spec in the fixture adopter's own `product/`
  - **Owners**: Kenya, Data; Leonardo (content)
- **Render and behaviour** (D5–D7)
  - **What it means here**: The `rendering:` field (P-16); the per-platform contract validation format (a ballot); render lanes; contract tests with known-bad cases; the D6 checker and its committed per-unit summary (T-16); readiness derived at publish from committed results (T-7)
  - **Owners**: Lina (tests); Kenya, Data (lanes); Thurgood (checker); Ada (the release script, D7); Leonardo; Stacy
- **True samples and safe upgrades** (D8, D9)
  - **What it means here**:
    - D8: every fenced Swift or Kotlin block in a file the package ships or an MCP serves, compiled in the D4 app with a per-family prelude (Leonardo R1; a D-row wording change, P-1).
    - D9: the previous release's D4 app and samples compiled against the new release, the oracle for source breaks, including an upgrade that adds a family (Kenya R2), plus a public-API diff over our module, the generated token API included, that reads a family's arrival as an addition and its removal as a break (Ada, Leonardo, Data)
  - **Owners**: Leonardo; Kenya, Data; Ada
- **Build more** (D10, WP6)
  - **What it means here**: An adopter component, in the adopter's own module, with its own `defineComponentTokens` file covering at least one family by reference and one by value (Ada R1), that reads our tokens, composes one of ours and passes D3–D6; one deliberate same-name case; the scaffold verb and native test preset last.
    - Kenya built the adopter-module half on iOS (an adopter `FilterBar` reading our tokens and theme from its own module, `BUILD SUCCEEDED`, VERIFIED locally)
  - **Owners**: Lina, Kenya, Data, Ada (CLI), Leonardo (journey)
- **CI for all of the above**
  - **What it means here**: Each lane's workflow is written once, data-driven, under one issue-row grant (T-15), now including a release-time iOS 18.5 or 18.6 run on `macos-15` (P-6). Later family units edit no `.github/**` path
  - **Owners**: Kenya, Data; Stacy (ARMING)

**How 132 is cut** (plan-r2 § 2, "How 132 is cut"): one vertical slice, then one unit per family.
- **The slice (first family)**: Chip-Base, Chip-Filter and Chip-Input, plus Icon-Base, plus one adopter-authored component (D10), plus that family's code samples (D8), through compile at zero, public API, the app, render and contract tests, on both platforms.
  - Lina confirms the pick (T-2); the tasks round still picks.
  - The adopter component is picked by the team at the tasks round against D10's criteria, not by Peter; Lina, Leonardo and Kenya each use a `FilterBar` that composes our Chip-Filter, with spacing and sizing tokens only.
- **What the first family carries** (corrected in R1 by Lina, Kenya and Leonardo; the pinned counts are VERIFIED, Thurgood, by `grep -c` over `harness/expected/*.tsv` at `8553499b1`):
  - **Little per-component repair**: Chip-Base, Chip-Filter and Chip-Input have no pinned entry on either platform; Icon-Base has 2 on Android and none on iOS, and is one of the 17 `internal` iOS views.
  - **One shared repair**: all three chips call `pressedBlend()`, which calls the unresolved `darkerBlend`, so the slice pays the blend repair (4 pinned entries per platform), once for every family with a pressed state. Under T-14 (ii) the blend helper is in the first family's closure (Lina, Kenya).
  - **Two cross-cutting D5 costs**: T-12 reaches all three chips (their label fonts are fixed primitive sizes), and T-13 reaches Icon-Base (its `accessibility_hidden` contract).
  - **Contract work**: 46 contracts per platform, inherited ones counted, so 92 native contract tests with known-bad cases; several are web-worded and need native wording first (Lina, VERIFIED by `get_component_summary`).
  - **So the bias has a different sign on each line** (Lina): the slice under-states per-family repair, and books shared costs that later families will not pay again. The measured-cost record splits shared costs from per-family ones (§ 3).
- **Then one unit per family**, each family entering the default manifest as it is claimed (T-14). **WP6's scaffold comes last.**

**Not in 132**:
- what `generate` emits for a stranger in general (129, closed);
- the React and React Native platforms (128, which inherits the app lanes, the comparator, the D6 checker and the binding model, plan-r2 § 3);
- served readiness for adopter components and `implements:` (128's lane 3, plan-r2 § 2 WP6).
- Lina notes that until 128 lands, agents see adopter components in the application MCP next to ours with no evidence of the bar; that belongs in 128's inbound list.

**Web**: 132 adds no build work on web (S-1, **CLOSED**, § 5.3). Whether web gets render evidence is P-14.

---

## 3. Order, and the measured-cost record that 132's tasks must declare

**The order** (**RULED**, "Let's go (x′)", received 2026-11-05T04:06:22Z; "A yes, B (a), C yes; (x′) as defined", 04:07:43Z): 129 → **132's first family** → Peter re-places the remaining families against 131, using that family's measured cost → 131 → 128 → 130 (the colour track after 130).

T-14 (ii) keeps the cut the order was approved on: the first family is measured on its own (Data R2: option (i) would have undone it, and Peter would have had to hear it).

**The measured-cost record**:
- **Path**: `.kiro/specs/132-native-components-in-app/completion/first-family-measured-cost.md`. It is fixed by two records that already name it:
  - Spec 131's park line (`.kiro/specs/131-governance-simplification/design-outline.md`, the 2026-11-05 outcome line: "park — re-ask: `path:.kiro/specs/132-*/completion/first-family-measured-cost.md`")
  - and the priorities record's 2026-11-05 walk line, which carries the obligation that "Spec 132's tasks round declares the record".
- **132's tasks round SHALL declare it** as a Primary Artifact of the parent that closes the first family, in the first-family unit's PR. **Creating it fires 131's park re-ask**, so nothing writes that path before the first family is complete.
- **What it contains, and how each row is verified** (Stacy R1 and R2; Thurgood owns the form). Peter's re-placement rests on it, so a row that cannot be re-read is labelled, not presented as measured:
  - **Window**: one first-parent commit range, from the merge that first commits 132's `tasks.md` to the merge of the unit that closes the first family. Every row counts over it
  - **Sessions, by seat and work package**: the tasks round declares a sessions line as an M4 instrument, so each first-family parent completion doc carries `**Sessions**: <seat> <n> (<work package>); …`, with the shared work packages (blend, T-12, T-13) named in the tasks round and one definition of a session (one agent run that writes or reviews).
    - The record sums the lines.
    - **Labelled "self-reported per parent"**: Stacy's pass checks that each line exists and that the sums are right, not that the numbers are true.
    - A Completion Documentation Guide change waits for this to work on the first family
  - **Peter's sittings**: the raw count of distinct receipt times in committed ruling or answer records added in the window, and the count of sittings under a stated grouping rule printed beside it (for example, receipt times less than two hours apart)
  - **CI minutes by runner class**: each unit's completion doc carries its own run table (run ID, workflow, runner label, duration, pasted from `gh run view <id> --json` at its merge), and the record sums them, split by workflow and work package. macOS minutes are the scarce column
  - **Contracts tested, labelled and excluded, with known-bad results, per platform**: the D6 checker's committed per-unit summary at the closing commit (T-16), not a hand count. Exclusions printed as a fraction of the denominator
  - **Defects found and where routed**: issue records added in the window (`git log --diff-filter=A` over `.kiro/issues/`) that name 132 or a first-family component, each with its owner
  - **Shared costs, booked apart**: the blend repair, T-12's type scaling and T-13's hidden-view check, which later families do not pay again (Lina)
  - **Per-family extrapolation**: method stated, the bias with its counts (0 pinned entries on the chips against 45 iOS and 89 Android elsewhere), and labelled REASONING. It also says that this is the most heavily instrumented family the project has run, so its numbers run slightly high (Stacy)
  - **A column for 131**: Thurgood, as 131's formalizer, sizes 131 (T-17), under Stacy's three conditions:
    - **committed before the first first-family unit PR merges** (its commit an ancestor of that merge);
    - the same units over a named span of 131, the method labelled REASONING and citing 131's cost ledger where it gives measured inputs;
    - and the conflict stated (Thurgood is 131's formalizer and owns this record's form), with one other seat reading the method before it is committed.
    - **The column's header says "forecast", beside a measured 132 family**, so the two are not read as the same kind.
    - If the estimate is not committed in time, the column is dropped and the comparison is labelled one-sided.
    - Stacy carries a calibration read to 131's CLOSEOUT
- **132's size against 131's** (plan-r2 § 6 item 8 asks the outline to state it): 132's sized items are about **50–95 sessions**, low confidence, with several items unsized (plan-r2 § 8). The review added:
  - per-lane CI grants (about five or six, T-15),
  - the token-side type scaling (1–1.5 for the generator, plus 20 call sites moved and possibly new typography tokens, T-12),
  - the manifest with its family filter and closure cases (1–2 plus a harness case per family, Ada, Kenya),
  - D8's preludes and the fixture screen (1–2, Leonardo).
  - No honest comparison with 131 exists until T-17 is committed.

---

## 4. Preconditions, and records 132 receives

### 4.1 Preconditions before an adopter component's tokens can be trusted

- **#870** — `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` (Ada, P1, on `main` since `b685ba522`).
  - A component token in the colour, fontWeight, fontFamily, duration, easing or scale family makes `generate` emit Swift or Kotlin that is wrong or does not compile, and `generate` says nothing.
  - One bad token fails the whole `ComponentTokens` module, and every DesignerPunk component in the consumer's target fails with it.
  - The record is filed; the fix is not.
  - **Why it is 132's precondition** (Kenya's point): D10's adopter component carries its own `defineComponentTokens` file, and WP6 teaches adopters to write more. Both reach this defect on **both** platforms. Under T-4 (a) every adopter group lives in our module, so this precondition carries T-4's safety (Ada, Kenya, Data).
  - **The interim rule for D10 until it lands** (corrected in R1 by Ada and Data; on Android it is REASONING from the emitted declarations, not compiled):
    - spacing, sizing, radius, fontSize, borderWidth and tapArea, by value or by reference;
    - opacity, lineHeight, density, letterSpacing, blend and breakpoint **by reference only**;
    - none of colour, fontWeight, fontFamily, duration, easing or scale;
    - and the adopter journey teaches no more than this.
  - **Its colour fork is Peter's, in that record**. This outline does not re-ask it. Only if (ii) is picked does S-2 apply.
- **#873** — `.kiro/issues/2026-11-27-product-token-swift-emitter-colour-types.md` (Ada, P1, on `main` since `40bf1bcba`).
  - The two static product-colour forms that Product-Token-Governance teaches do not compile on iOS.
  - **Why it bears on 132**: #870's fork (i) sends component authors to product tokens, so (i) is only as good as #873's fix. D4's adopter theme and D10 use no static product colour on iOS until it lands; Leonardo's adopter theme recolours through the semantic-override path instead (whether that path reaches #873's emitter is Ada's to say).
  - **Android: read by Data; the emitted forms are correctly typed; not compiled** (Data R2, VERIFIED as emitted). The hard colour is emitted in sRGB (`Color(0xFF…)`) while every generated colour is Display P3, which is right for a hex. Ada adds two lines a compile should test: a `#RRGGBBAA` or `#RGB` hard colour, and whether the file imports Compose's `Color`.
- **#872** (Ada) — the CORRECTION of `governance/Token-Governance.md` L160 and L556 and `governance/Token-Quick-Reference.md` L224, which taught that component tokens take "numeric families only".
  - It is held for Peter's word on whether a `governance/**` CORRECTION may land from Ada's seat, and its clause still needs widening to Android's reference-path failures.
  - **Not a precondition of this PR; the adopter journey must not ship before it lands.**
- **Row 7** (Ada) — `.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md`, Peter's re-answer pending on #864. Until it is answered, D10's tokens use references or on-grid values, so they prove the warned path, not the silent one.
- **The guard** (Ada R1): the harness-consumer fixture in `scripts/harness/consumer.ts`, widened to one token per family on **both** paths plus #873's two static product-colour forms.
  - Each half needs a spec row or an issue-row grant; Ada proposes a row in 132's first unit, ahead of D10 (Kenya's condition on T-4).
  - Data's counter survives: a fixture tests only the families someone listed; the class fix is one type table that both emitters read.

### 4.2 Records that name 132 (Process-Spec-Planning § "Before Formalizing", run at `8553499b1`, record states at `017514064`)

E2's grep for `132` / `132-native-components-in-app`, plus the records added by hand: those named in inbounds or open PRs, and one glob token the grep misses (`132-*`).

The **disposition is a proposal**; each owner writes it, and the lines are written in the requirements feedback round's Context for Reviewers, as Step 0 requires. Owners confirmed their rows in R1.

*(B2, ballot `2026-11-27-rule-11-lapse-window-b2`, is in its application PR, #882; its site 6 would make the hand-add rule explicit. The current text already says "A record the outline cites but the grep misses is added by hand", which is what this list does.)*

| Record | Owner | Trigger (at `017514064`, or the PR head named) | Proposed disposition |
|---|---|---|---|
| `.kiro/issues/2026-09-26-native-component-distribution.md` | Kenya, Data (Lina, Ada) | **`merge:#880`** on `main` since #868 merged (`e03d3ae3f`; re-tokened by Data, `9e7739a15`; co-signed by Kenya, `3dd723b4e`) | **intake, closing in this PR**: Peter's "Spec with (a)" (§ 7). Its § "iOS obligations filed here under rule 10" (on #868) passes three iOS obligations to this outline: the iOS minimum (P-6), the iOS 17 runtime probe (§ 6, P-10) and the wording rule (§ 4.3). Its § "Android render probe result" (on #884) holds obligation (1)'s Android half |
| `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` | Lina | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: its native items (A3, I1–I3, A1, A2, A4, A6's non-ripple parts) go to D5 and D6 (Spec 129 Req 8.4) |
| `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` | Lina (Kenya, Data verify) | `path:.kiro/specs/132-native-components-in-app/completion/claims-pass.md` | intake: D3 to zero, per family (T-14 (ii)) |
| `.kiro/issues/2026-11-06-theme-family-persisted-form-for-132-d5.md` | Kenya, Data | `path:.kiro/specs/132-*/design.md` | intake: the stored string is settled (T-5, CLOSED in this round); runtime switching is designed at D5 in 132's design round, which fires the record |
| `.kiro/issues/2026-11-12-readiness-tables-generate-or-guard.md` | Lina (Thurgood consulted) | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: Lina's answer for requirements is the combined form in one table (T-8) |
| `.kiro/issues/2026-09-29-instruments-parser-and-resolver.md` | Thurgood | includes `path:.kiro/specs/132-*/tasks.md` (hand-added: the grep's pattern misses the glob) | leave: fires at 132's first tasks round, which is planned under M4 |
| `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` | Thurgood | `manual` | leave. Its 2026-11-05 line "Spec 132's directory does not exist yet" is stale since #723; a dated pointer is owed by its steward (me), outside this PR |
| `.kiro/issues/2026-11-05-hand-written-readiness-claims-disagree-with-generated-readiness.md` | Lina | `release:16.4.0:phase-1` | leave: fix-now; Lina sequences it with T-8's pointer conversion |
| `.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md` | Ada | `release:16.4.0:phase-1` | leave, and a precondition (§ 4.1). Peter's re-answer on row 7 is pending (#864), and "(spec): Spec 132" is one of its options. **This outline takes nothing from it**; naming it here carries out no spec answer, because none has been given |
| `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` | Thurgood | `path:…/131…/requirements.md` | leave: names 132 only for the order |
| `.kiro/issues/2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md` | Stacy | `release:next:phase-1` | leave: names 132 only for the order |
| `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` (#870) | Ada | `release:next:phase-1` | leave: fixed by its own PR; a precondition (§ 4.1) |
| `.kiro/issues/2026-11-27-product-token-swift-emitter-colour-types.md` (#873) | Ada | `release:next:phase-1` | leave: as above |
| `.kiro/issues/2026-11-27-native-access-level-ballot-owed.md` (#877) | Lina | `path:.kiro/specs/132-*/requirements.md` | intake: drafted before 132's requirements open, or re-ruled to the ballot's PR in the requirements PR (T-9) |
| `.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md` (#877) | Lina | `path:.kiro/specs/132-*/requirements.md` | intake: as above; it also carries P-4's reason-class list and the per-platform oracle lines (T-13) |
| `.kiro/issues/2026-11-27-rendering-field-record.md` (#877) | Lina (Leonardo consulted) | `path:.kiro/specs/132-*/requirements.md` | intake: its shape is P-16; the field lands before 132's render lanes |
| `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md` (#881) | Data | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: the range numbers (P-9, with the `compileSdk` 37 finding as its item 1, dated on #884) and the API-26 floor test get their acceptance criteria in requirements |
| `.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md` (#878) | Data | `path:.github/workflows/android-render-probe.yml` | leave: closes at its fixing PR, #884, which archives it with the result (§ 6). Stacy's activation read is on #883 |
| `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` (#888, hand-added; filed under rule 10 by the ballot seat in the Core Goals ballot's PR, for Peter's P-6 ruling) | Thurgood (items name their seats: A Kenya, B Ada, C and D 132's docs units) | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: A, the release-time 18.x lane; B, `generate` restoring the floor; C, docs stating what is tested; D, the gap stated when free images stop carrying 18 |
| `.kiro/issues/2026-11-27-ios-17-runtime-probe-owed.md` (#886, hand-added) | Kenya | as that record says | **moot** since P-6's ruling: Kenya re-rules or closes it, on its own PR |
| Lina's theming record (#885: Input-Text-Base's caret and selection not themed; the Button-VerticalList-Set iOS literal) | Lina | as that record says | intake once it merges: the iOS caret and selection are a parity defect for the family that holds Input-Text-Base; the literal `14` is a token-compliance defect (T-12) |

- **Seven records fire when 132's `requirements.md` is first committed**: the drawn-control, readiness-tables and toolchain-range records, #877's three, and #888's iOS-18-floor record once it merges.
- **One fires at `design.md`** (theme family);
- **one at `tasks.md`** (instruments parser);
- **one at `completion/claims-pass.md`** (component repair);
- and 131's park re-asks at `completion/first-family-measured-cost.md`.

A record whose obligation is met earlier is re-ruled by its owner before its event.

**Citations that this rewrite moves**:
- #877's three records cite the placeholder's L7 and L33. Lina said in R1 she would pin them to `@ a953ac70d` on #877's branch, but #877 merged at `16835f190` without the pin (VERIFIED, Thurgood: `a953ac70d` does not appear in the access-level record at `017514064`). So at this file's merge those cites point at different text; a dated pointer in each Source line is now Lina's, by rule 9.
- Kenya's rule-10 section on #868 cites "design-outline.md § 3", also the placeholder's; its dated pointer rides the close commit (§ 7).

### 4.3 Obligations that live only in inbounds (carried here so they are read)

- **Kenya** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-kenya-design-2026-11-05.md` § 5; her rule-10 section on #868):
  - **The iOS minimum was asked again at this outline, before any native support claim** (Peter's "4 (a)", received 2026-11-05T13:05:54Z; Spec 129 `design.md` § 0).
    - **Answered: P-6, "(B), raise to iOS 18"** (§ 5.1).
    - Its owed acts are in `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` (#888, branch `ballot/core-goals-ios-minimum-18`, at `d85b09a18`); the Core Goals raise is ballot `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md` on the same PR.
  - **The iOS 17 runtime probe is moot.** Its record, #886, is Kenya's to re-rule or close.
  - **The wording rule**:
    - until the Core Goals ballot is ratified, Spec 129's rule stands, "built for iOS 17.0, not run on 17", because it is true of every release before 132's first claim.
    - From the claim, the form is **"built for iOS 18.0; tested on <runtime>"**, with the runtime taken from the lane's printed toolchain (Kenya R4), and the minimum never printed without the tested runtime beside it (Leonardo R4).
    - The minimum lives in one generated value that `Package.swift`, D4's target, the guide's iOS line, INSTALL and the walkthrough all read (Leonardo R4).
    - A local run is not one of "DesignerPunk's checks", so it does not change the wording by itself (Kenya R1).
  - Swift 6 language mode for the components, set in the root manifest, belongs to 132's packaging (her inbound § 1, L67).
- **Data** (now held by `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md`, #881):
  - **The Android toolchain range numbers** (AGP; Kotlin with its Compose compiler plugin; the Compose BOM; and now **`compileSdk`**) come from D4's builds at the bottom and top of the range, then go to Peter for approval.
    - The range-end builds are a `.github/**` change, so they need an issue-row grant.
  - **The API-26 floor test lives in 132's own module**: lint `NewApi` as an error plus an emulator run at API 26. The probe has shown that API 26 boots and runs a Compose test on the free runner (§ 6).
  - **A forgotten theme provider is silent until a runtime test**, which is D5's.
- **Lina** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-lina-design-2026-11-05.md` § 7): the three shapes in § 7.1–7.3 (access level, per-platform contract validation, `rendering:`), now held by #877's records.
- **Ada** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-design-2026-11-05.md` D-4, D-5 and P-1; `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/ada-plan-r2.md` L46–L70):
  - Q12, Q13 and the native type table are provisional until 132's D4 app builds (Spec 129 `design.md` § 4). What D4 must show for each (Ada R1):
    - Q12's fixed binding names reached and read from the adopter's module (Kenya showed this on iOS for the tokens and theme, R2), which needs the access-level ballot to name them public, with a unit test for the default-name provider clash D4 will not see;
    - Q13 through the adopter theme;
    - the type table on the primitive path, with D10 proving the component-token path.
  - `generate` fails on a `.kt` file in the consumer's tree that declares our package (VERIFIED, Ada: `src/cli/shared/reservedKotlinPackages.ts`), and D10's same-name case proves it.
  - **The manifest's three conditions**, carried into requirements:
    - `generate` writes the root `Package.swift` only when it is absent or carries our header, otherwise it stops with a message;
    - writing outside `output` needs per-platform paths and a `COMMIT-POLICY.md` entry;
    - the adopter's component module imports ours by local path, written as `.package(name: "DesignerPunk", path: …)` on iOS (Kenya R2, VERIFIED: the plain form fails, because a path dependency's identity is the adopter's directory name).
  - Deprecated-alias emission and D9's public-API diff land before the claim (Peter's "7 (a)").
    - Aliases are owed from the first claim for the whole shared token surface (`DesignTokens`, the theme types, `ComponentTokens` itself), because no per-family scoping reaches it (Ada; Kenya, Leonardo agree).

### 4.4 Preconditions for the first support claim

Each lands before the release that first claims native support, whatever P-7 decides that release is:
- **The Core Goals ballot raising the iOS minimum to 18.0, ratified** (P-6; ballot `.kiro/docs/ballots/2026-11-27-core-goals-ios-minimum-18.md`, DRAFT on #888). After the claim, raising the minimum is a breaking change.
- **Deprecated-alias emission for the whole shared token surface, and D9's public-API diff** (Peter's "7 (a)"; § 4.3, Ada).
- **#870's and #873's fixes, and #872's CORRECTION** (Ada R1, P-7's token-side lean).
- **D7's derivation**, if P-2's overlay text points at served readiness (Leonardo).

---

## 5. Open questions

### 5.1 For Peter

#### Answered so far in this round

- **P-6, the iOS minimum: RULED.** Peter, received 2026-11-27T18:32:45Z (the orchestrator's receipt time, relayed), verbatim: **"(B), raise to iOS 18"**.
  - **What he was asked**: whether to run the simulations on whatever version Apple recommends at the time (his own question, 2026-11-27T18:18:45Z), then the choice between (A), keep the 17.0 minimum, test every run on the lane's current iOS and run old versions only occasionally, and (B), raise the minimum.
  - **What he read**: `[KENYA R4]` and `[LEONARDO R4]`, spliced byte for byte into `feedback/design-outline.md`.
    - Kenya: (A) is safe for what the compiler proves and not for behaviour; no free CI image carries iOS 17, and the oldest it carries is 18.5/18.6 on `macos-15`; raise to 18, not 26; decide before the claim.
    - Leonardo: a floor of 18 probably shuts out a support policy rather than a device (UNVERIFIED); lean (B) before the first claim; stated as a product choice, not as GitHub's image schedule.
  - **Confirmed, with the device cost in front of him**: Peter, received 2026-11-27T18:36:18Z, verbatim: **"Yes, (B) still stands, raise to iOS 18"**.
    - Before this second answer he was told Kenya's finding (relayed by the orchestrator; not yet in a committed file, and UNVERIFIED by Thurgood): **no iPhone is dropped, but three iPads that run iPadOS 17 cannot run 18**: the iPad (6th generation), the iPad Pro 10.5-inch and the iPad Pro 12.9-inch (2nd generation).
    - That corrects Leonardo R4's "probably not new hardware": the floor shuts out a support policy on iPhone, and those three iPad models outright.
  - **Its effects**, each carried into this file:
    - D4's iOS deployment target becomes **18.0**, a D-row edit put to Peter inside P-1 (§ 1, § 2);
    - a release-time run on **iOS 18.5 or 18.6 on `macos-15`** joins T-15's lanes and their grant;
    - the shipped wording form becomes **"built for iOS 18.0; tested on <runtime from the lane>"** (§ 4.3);
    - **`generate` restores the declared floor** if an adopter edits it down, because a lowered value compiles (Ada's; Leonardo R4);
    - **the Core Goals ballot must be ratified before 132's first claim** (§ 4.4);
    - **the iOS 17 runtime probe (#886) is moot**: Kenya re-rules or closes it.
    - Rule 10: these obligations are filed by the ballot seat in #888, in `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` (#888, branch `ballot/core-goals-ios-minimum-18`, at `d85b09a18`), beside the Core Goals ballot. This PR files no record of its own for them.
- **P-10, Android**: answered by the merge of #878 (2026-11-27T16:57:03Z).
- **P-10, iOS: superseded by P-6.** Peter had chosen a local iOS 17 runtime download (received 2026-11-27T17:20:36Z, as relayed to Kenya and cited in her R2). Xcode 27.2's own downloader refused it twice (Kenya R4, #886), and P-6's ruling removes the need for it.
- **P-8 does not arise**: KVM is usable on the free `ubuntu-24.04` runner (§ 6).
- **P-15 ((b), a standing workflow-scope ballot) does not arise now**: every seat that answered picked (a) (T-15). A later fork about *maintaining* lanes once they are required is listed under "Later".

#### Sitting 2, in decision order

The order is mine: each item before the ones that depend on it. Numbering is stable from R1.

##### P-1 (order 1)

- **Question**: **D4–D10 as 132's definition of done**
- **Options**:
  - (a) approve as written;
  - **(b) approve with two D-row edits**:
    - D8's population corrected to "every fenced Swift or Kotlin block in a file the package ships or an MCP serves" (Leonardo R1: D8 names component READMEs, which the package does not ship and no MCP serves; the served samples are in `governance/Component-Family-*.md`),
    - and **D4's iOS deployment target 17.0 → 18.0**, which follows from P-6's ruling;
  - (c) ask for less (no D8 or D9);
  - (d) ask for more (a person sees each app)
- **Leans (not picks)**: (b): Leonardo; Ada and Stacy lean approve
- **What survives**: Approving before a linked app exists invites "criteria written before the numbers get diluted when the numbers arrive" (Stacy). The D-row change list (§ 1) makes a later change visible, not impossible

##### P-2 (order 2)

- **Question**: **Plan decision 8: when adopters are first told to start a native product**
- **Options**:
  - (a) all 34 at the D5/D6 tier;
  - (b) per family. With (b), Leonardo's conditions, each takeable on its own:
    - the overlay flip covers consumer Leonardo, the seat that selects components;
    - the flipped overlay text points at served readiness, so later families need no charter edit;
    - a `validate_assembly` warning when a component is not ready for the target platform (T-18)
- **Leans (not picks)**: (b), per family (Lina; Leonardo), with the three conditions (Leonardo). Under T-14 (ii) a family that is not ready is not in the adopter's module at all, which makes per family true in the build
- **What survives**: Partial support needs careful wording every release. The conditions depend on D7 shipping no later than the first claim

##### P-7 (order 3)

- **Question**: **Which release carries the first claim, and what it promises for families not yet claimed**
- **Options**:
  - The release:
    - (a) 17.0.0, as a chosen marker (the seats' position, `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-rulings-release-16-3-0.md`, never ruled);
    - (b) a minor.
    - Under T-14 (ii) the first claim only adds API, so a minor is semver-valid and 17.0.0 is a choice, not a necessity (Leonardo, Ada).
  - **The not-claimed question depends on T-14's open threshold**:
    - if the adopter's default manifest admits claimed families only (Leonardo), a not-claimed family is not callable and needs no marking;
    - if it admits families at the compile tier (Ada's inclusion test), compiled-but-not-claimed families need an opt-in mark:
      - Kotlin `@RequiresOptIn` (Data, confirmed idiom; ERROR or WARNING is Leonardo's product call)
      - and Swift `@_spi` (Kenya, measured to hide the type from a plain `import`, but underscored, so not a stable language promise) or a separate library product
- **Leans (not picks)**: none ruled. All seats: aliases are owed from the first claim for the whole shared token surface, whatever the release
- **What survives**: Whatever the release, after the first claim every rename on the shared token surface costs an alias. Under (ii) a family's arrival changes an adopter's module without any change to their config, and the "Native status" text has to say so in one sentence

##### P-6 (order —)

- **Question**: **RULED**: "(B), raise to iOS 18" (above)
- **Options**: —
- **Leans (not picks)**: —
- **What survives**:
  - The floor is 18 for about as long as `macos-15` carries an 18.x runtime; after that, shipped text reads "built for 18; tested on 26.x", the same gap one version later (Leonardo R4).
  - The cost is permanent until the floor is lowered: teams that must support iOS 17 are shut out, and so are users of three iPad models that stop at iPadOS 17 (iPad 6th generation, iPad Pro 10.5-inch, iPad Pro 12.9-inch 2nd generation; Kenya, relayed).
  - Peter confirmed (B) with that cost stated (18:36:18Z)

##### P-3 (order 4)

- **Question**: **Plan decision 9: device reads**
- **Options**:
  - (a) a named human does one read per component per platform at the first support release, as dated evidence, not a gate;
  - (b) no human read, speech labelled "not device-read"
- **Leans (not picks)**: semantics tests and audits inside done, speech outside; (a) at the first claim (plan; Stacy; Kenya, Lina keep it as T-13's fallback only). Who the human is, is yours
- **What survives**: A named human is self-attested, because agents act through your credential (Stacy)

##### P-4 (order 5)

- **Question**: **Plan decision 10: who may exclude a contract or remove a platform from it**
- **Options**:
  - (a) each one yourself;
  - (b) a closed list of reason classes, approved once, the checker counting each;
  - (c) the team
- **Leans (not picks)**: (b) (plan; Lina; Stacy; Sparky). Lina grounds the list in a classification of the slice's 46 contracts per platform; Sparky: native wording is added beside web wording, never replacing it
- **What survives**: A class written wide enough admits dilution one item at a time; the count shows it, the wording is the guard (Lina, Stacy)

##### P-5 (order 6)

- **Question**: **Plan decision 11: do adopter-built components meet the same bar**
- **Options**:
  - (a) same bar, available;
  - (b) same bar, required for anything served as conformant (128's lane 3);
  - (c) a lower bar ("builds")
- **Leans (not picks)**: (a); D10 proves the path (plan; Lina)
- **What survives**: Until 128 lands, agents see adopter components beside ours with no evidence of the bar (Lina)

##### P-13 (order 7)

- **Question**: **Token review: a scale role on typography semantic tokens** (T-12's fix, Ada R2).
  - Each typography semantic gains a platform-neutral role (body, label, caption, title, …); the Swift generator maps role → `Font.TextStyle` and emits one view modifier, for example `.dpFont(DesignTokens.typographyBodyMd)`, built on `@ScaledMetric(relativeTo:)` and `Font.custom(_:size:relativeTo:)` (Kenya R2: a computed `Font` would not follow SwiftUI's Dynamic Type environment, and `.system(size:weight:relativeTo:)` does not exist).
  - Android and web ignore the role (`sp` and `rem` already scale).
  - **It may also need new typography semantic tokens** for the 20 calls that read a primitive, a component size or a literal: Ada lists them before this sitting
- **Options**:
  - (a) approve the mapping, and any new tokens listed;
  - (b) ask for changes;
  - (c) refuse (then the fix is per component, or P-11 arises)
- **Leans (not picks)**: (a): Ada, Lina, Leonardo, Kenya. Leonardo: review the mapping as a set against one product screen at the largest Dynamic Type size, because the anchors decide whether headings still read above body text
- **What survives**: Scaled text breaks layouts sized by fixed tokens, so the fix is layout repair too, priced first in the slice. The anchors are partly taste

##### P-16 *(new)* (order 8)

- **Question**: **The `rendering:` schema shape** (T-1).
  - The two seats exchanged positions three times; each says in its last entry that they converge, on different shapes.
  - Lina owns the schema (her record; Leonardo consulted), so under the owner rule the pick is hers; the orchestrator routes it to you because the exchange did not settle
- **Options**:
  - **(A) one field**: per platform, `kind: platform | drawn` and a `reason` that names any system-drawn part (Leonardo R3, Lina R2).
  - **(B) one field plus a constrained `platformParts:`**: allowed only for `kind: drawn`, a list of `{ id, reason }`, where `id` is an accessibility identifier the component itself sets; first population one entry, iOS Input-Text-Base's text field (Lina R3, Leonardo R2).
  - **(C) the owner's call**: Lina decides, with Leonardo's counter recorded
- **Leans (not picks)**:
  - (A): Leonardo, because Lina's theming record (#885) fixes the iOS caret and selection at the source, which removes the consumer fact a structured field would describe.
  - (B): Lina, because D5 must find the field to exclude it under either shape, so the served, machine-readable form costs one sub-key more and tells an adopter's agent which pixels our theme does not reach
- **What survives**:
  - Against (A): a prose reason is not machine-read; if #885 stays open past the claim of the family that holds Input-Text-Base, agents can see the gap only in prose.
  - Against (B): a schema field whose only use is one component on one platform, and its guard against over-claiming is a read at the claims pass, not a test

##### P-14 *(the orchestrator decides whether it joins the batch)* (order 9)

- **Question**: **Web render evidence** (Sparky R1): your "will successfully render" names no platform, and web's evidence is a name check plus jsdom contract tests
- **Options**:
  - (a) a web render lane in 132;
  - (b) a Sparky-owned record placed later, alongside 128, with 132 keeping the contract-validation format keyed by platform;
  - (c) none
- **Leans (not picks)**: (b): Sparky
- **What survives**: A native-only format makes a later web lane pay a retrofit, and you may read the goal as covering web now. Adding evidence changes no promise

#### Only if they arise (expected not to)

- **P-11**, excluding the Dynamic Type audit (a D5 change; every seat leans fix, P-13);
- **P-12**, a D5 or D7 change from T-13: either a labelled device read in place of a CI check, or, if the in-app walk fails on a runtime we test (the 18.x lane, or a later 26.x) and only the static check is left, a new D7 evidence kind such as `static-checked`, so readiness does not over-claim the contract (Stacy R2).
- Under P-6's ruling there is no iOS 17 run; the walk is run on 26.x and on the release-time 18.x lane instead.

#### Later (listed so they are not lost)

- **P-9**, the Android range numbers, after D4 builds, now including `compileSdk` (§ 6);
- **the lane-maintenance fork** (Data R2): once a render lane becomes a required check, an external break blocks every PR until a grant-backed fix merges, so at the first promotion either a per-lane ownership ballot (like `2026-11-07-native-lane-ownership`) or a grant per fix;
- **T-7's RELEASE-FLOW change**, a LAW edit, put to Peter as a ballot when its design is drafted.

#### Not re-asked here (already ruled, carried)

- the two-spec structure ("A yes");
- 129's narrowed sentence and this spec's acceptance ("B (a)");
- D1–D3 ("C yes");
- order (x′);
- the Android minimum, API 26 ("Re: 5, 26"; Core Goals amended by ballot `2026-11-05-core-goals-android-minimum`);
- native changes before the claim ship in minors, with deprecated aliases and D9's diff landing before the claim ("7 (a)");
- required-check promotion by measured stability (129 `tasks.md` § "Decision 6");
- the consumer overlays flip at the support claim, which Peter merges as a cost, not a ruling (plan-r2 § 7's closing list).

**Held elsewhere, not 132's to ask**: #870's colour fork; row 7's re-answer (#864); whether #872's CORRECTION may land from Ada's seat.

### 5.2 For the team

#### T-1: The `rendering:` shape

- **State after the cross-read**: **To Peter as P-16.** Facts both seats agree on:
  - Input-Text-Base on iOS is drawn chrome around a system text field, the only such case in the catalogue (VERIFIED, Leonardo and Lina by grep);
  - Android's caret is ours (`InputTextBase.android.kt` L328);
  - neither platform themes the selection, and iOS does not theme the caret (Lina's record, #885);
  - behaviour stays out of `rendering:`;
  - the component needs one new identifier on the field under either shape
- **Owner**: Lina (Leonardo consulted)
- **Closes at**: Peter's answer to P-16

#### T-2: The first family and the adopter component

- **State after the cross-read**: Lina confirms Chip-Base, Chip-Filter, Chip-Input and Icon-Base; a `FilterBar` composing Chip-Filter is the common proposal
- **Owner**: Lina, Leonardo; Kenya, Data
- **Closes at**: tasks round

#### T-3: Tool choices

- **State after the cross-read**: **CLOSED: hand-written `.xcodeproj`** with synchronized folders (Kenya, Data, Leonardo).
  - Kenya measured that adding source files needs no `project.pbxproj` edit, so review churn falls on the creation commit.
  - The fixture states "Xcode 16 or later".
  - Leonardo: create D4's project by doing the walkthrough's steps, and cite its "add local package" hunk.
  - Data: a test checks the project's file list against the fixture folder.
  - The emulator and Robolectric split: both lanes are measured to run (§ 6); ViewInspector is optional (T-13)
- **Owner**: Kenya, Data
- **Closes at**: closed

#### T-4: Where adopter components and their tokens live

- **State after the cross-read**: **CLOSED on (a)**: adopter source in its own module; all generated token groups, the adopter's included, in our module, the same group name replacing ours and reported (Ada, Kenya, Data).
  - The local-path import is VERIFIED on iOS (Kenya, with the `name:` form) and REASONING on Android until D4 builds (Data).
  - Ada's surviving counter stands: a future emitter defect fails our module for every adopter with one custom token, so the fixture guard (§ 4.1) lands before D10
- **Owner**: Ada, Kenya, Data
- **Closes at**: closed; Android's import is confirmed at D4

#### T-5: The theme family's persisted form

- **State after the cross-read**: **CLOSED on the config name** (Kenya moved, Data held):
  - iOS emits explicit raw literals equal to each theme's config `name` (`case highContrast = "high-contrast"`), Android a `key` equal to it with `fromKey`;
  - one string set across platforms;
  - the scheme (system, light, dark) stored separately.
  - Surviving counter: renaming a theme in the adopter's config orphans stored values, so the documentation carries the migration line (unknown key → fall back to `base`) and D9 reports a removed case as breaking.
  - Runtime switching is still D5's
- **Owner**: Kenya, Data
- **Closes at**: the string is closed; switching at `design.md`

#### T-6: D6's known-bad run cadence

- **State after the cross-read**: Stacy: on every PR whose diff touches a contract test, its component's source, the contract baseline or the checker, plus every unit PR and CLOSEOUT
- **Owner**: Thurgood, Lina; Stacy reads
- **Closes at**: tasks round

#### T-7: D7's source

- **State after the cross-read**: **Converging on committed results** (Stacy, Ada):
  - a readiness API read at publish would change what is packed from live state, against the hermetic rule's intent, so the release PR commits a results file measured at a named commit `R`, and the derivation and pack-assert refuse unless `git diff --name-only R..S` lists only that file.
  - The publish script (Ada's) builds the packed readiness from it.
  - It is a change to a ratified instrument (row `hermetic-publish-path`), so it needs its census line, and RELEASE-FLOW's step text is Thurgood's, a LAW edit by ballot (§ 5.1, "Later").
  - Surviving counter (Ada): a re-run after `R` cannot correct the packed readiness without a new release.
  - **Sparky's web column is unanswered**: whether D7 covers iOS and Android only, or which checks web's column derives from
- **Owner**: Ada (the script), Lina (served readiness), Thurgood (RELEASE-FLOW, census); Sparky (web's column)
- **Closes at**: design round

#### T-8: The readiness tables

- **State after the cross-read**: Lina's answer for requirements: the combined form (generated regions with a byte-equality test, the install-doc pattern), **in one table** in `governance/Component-Readiness-Status.md`, with the family docs pointing at it.
  - Her counter: a family-doc reader makes one more hop, and the pointer conversion has to be sequenced with her fix-now record
- **Owner**: Lina; Thurgood consulted
- **Closes at**: requirements round

#### T-9: The access-level and contract-validation ballots

- **State after the cross-read**: Lina drafts both before 132's requirements open (1–2 sessions).
  - The contract ballot carries P-4's list, the per-platform oracle lines (T-13) and an unchanged web text (Sparky);
  - the access ballot carries Data's explicit-API input and names Q12's binding names public (Ada)
- **Owner**: Lina (Kenya, Data, Thurgood, Stacy as each record names)
- **Closes at**: before 132's requirements

#### T-10: D9's tools

- **State after the cross-read**:
  - Source compatibility is the break an adopter meets (Leonardo);
  - D9 (1), compiling the previous release's app and samples, is the oracle;
  - the dump tools are early warning, each shown to bite on a removed symbol and a renamed parameter;
  - read as an API-surface diff (Data);
  - covers the generated token API (Ada);
  - treats a family's arrival as an addition and opt-in-marked API as not yet promised (Data, `nonPublicMarkers`, version UNVERIFIED)
- **Owner**: Kenya, Data; Leonardo; Ada
- **Closes at**: design round

#### T-11: The "Native status" passage at this merge

- **State after the cross-read**: **CLOSED: no change at this merge** (Kenya, Data)
- **Owner**: Kenya, Data
- **Closes at**: closed

#### T-12: Fixed font sizes and Dynamic Type

- **State after the cross-read**: **30 calls in 18 files** (VERIFIED by four seats).
  - Lina classified them by what they pass as `size:`: 10 a typography semantic's `fontSize`, 9 a primitive (the three chips among them), 9 a component-computed size, 2 literals (one in preview code, one production `14`, a defect in #885).
  - **The settlement** (Ada, Lina, Kenya, Leonardo): the text style lives in the token as a scale role, and the 20 calls that read no semantic move onto typography semantics, with new tokens where none fits (P-13).
  - Kenya measured that the scaled forms clear `performAccessibilityAudit(for: .dynamicType)` on iOS 26.0
- **Owner**: Ada (tokens), Lina (components), Leonardo; Kenya
- **Closes at**: P-13; then design round

#### T-13: How a "hidden from VoiceOver" contract is checked

- **State after the cross-read**: **Converged on evidence.**
  - iOS: the **in-app walk** in the D4 app, run inside a UI-test session, asserting the decorative label is absent from the accessibility elements, with the known-bad twin (the same view without `.accessibilityHidden(true)`) asserting it present.
    - Kenya measured it: 3 elements hidden against 5 visible, in two runs, while XCUITest's own counts were equal in both variants.
    - That falsifies her R1 runtime count and explains her 129 zero-element finding (no accessibility client attached; REASONING).
    - Lina's R2, which predates the measurement, moved to Kenya's R1 static check; the measurement satisfies Stacy's rule that an oracle is one whose known-bad twin fails, so Lina's confirmation is a formality, owed in the design round.
    - The static check becomes optional.
  - Android (Data, Lina): for Icon-Base, `contentDescription = null` means no image node or description in the merged tree, with a non-null description as the known-bad twin; a hidden-subtree contract uses the semantics property instead; the validation line names the mechanism the contract states.
  - Kenya's walk measurement is local and **must be committed to #879's evidence** before the design round rests on it (Stacy); she runs it again on the 18.x lane once it exists
- **Owner**: Kenya, Lina; Data for Android; Stacy reads
- **Closes at**: design round

#### T-14: One module, many families

- **State after the cross-read**: **CLOSED on (ii), a family-scoped manifest** (Ada, Kenya, Data; Leonardo for the consumer reading).
  - The closure list per family is data `generate` reads (Chip → Icon-Base, the blend helper, the tokens);
  - component-token groups follow the same filter (Ada);
  - the harness gains a context or case that compiles each included set alone at zero errors, without which Ada would rather have (i);
  - the blend helper is a shared cost.
  - **Still open inside it: the inclusion threshold.**
    - Ada: the committed compile state (zero pinned entries in `harness/expected/*.tsv`), decidable from git and independent of D7.
    - Leonardo: the adopter's default manifest admits **claimed** families only, with a compile-tier set opt-in behind a flag for our own lanes, a ratchet (a claimed family never leaves), and one readiness source shared with D7, the overlays and T-18.
    - Which one holds decides P-7's not-claimed question.
    - Data names a third shape, not picked: one module or target per family with declared dependencies
- **Owner**: Ada, Kenya, Data; Leonardo
- **Closes at**: the threshold in the design round, before P-7 is final

#### T-15: CI grants for 132's lanes

- **State after the cross-read**: **CLOSED on (a), with Kenya's lane design**:
  - each lane's workflow (iOS render, Android render, D4 build, D8 samples, D9 upgrade and diff, P-9's range builds, and **the release-time iOS 18.5 or 18.6 run on `macos-15`** that P-6's ruling adds; whether that image's Xcode 26.3 runs 18.x is UNVERIFIED) is written once, data-driven, reading the family list from a file under `harness/` or the fixture directory, as `harness/pins.yaml` already does (#867 moved a pin with no workflow edit).
  - Grants are then per lane, about six or seven, concentrated at the first family and near the claim (Kenya, Stacy), and per unit only for a unit that edits a workflow (Data).
  - A grant record can ride the unit's tasks-round PR, which Peter merges anyway, so it adds no Peter merge (Data's reading of README rules 8 and 10; Thurgood agrees, `[THURGOOD R3]`; Stacy's ARMING reads still run at two merges).
  - Surviving counter (Kenya): the first family carries five or six grants at once, a burst of merges and ARMING reads.
  - Stacy's six limits apply if (b) is ever drafted
- **Owner**: Kenya, Data; Stacy
- **Closes at**: closed; the maintenance fork is "Later"

#### T-16: D6's committed evidence

- **State after the cross-read**: Accepted: a committed per-platform summary at each unit merge, per contract: state, test ID, oracle name and evidence kind (Stacy R2), known-bad result, run ID; the 288-contract baseline lands with the checker's first PR
- **Owner**: Thurgood
- **Closes at**: tasks round

#### T-17: The measured-cost record's 131 column

- **State after the cross-read**: Accepted, under Stacy's conditions (§ 3). It is my act, before the first first-family unit PR merges
- **Owner**: Thurgood; one other seat reads the method; Stacy
- **Closes at**: before the first first-family unit merges

#### T-18: A readiness warning at selection time

- **State after the cross-read**: Leonardo's class option, P-2's third condition
- **Owner**: Lina; Leonardo; Thurgood (overlay text)
- **Closes at**: design round

#### T-19: D8's sample contract

- **State after the cross-read**: per-family preludes; a catalog cell built by compiling the served sample
- **Owner**: Leonardo; Kenya, Data
- **Closes at**: tasks round

### 5.3 Scope questions

- **S-1, web build work: CLOSED** (Sparky R1; Leonardo concurs). **On web, 132 adds no build work.**
  - The acceptance sentence's web leg is held by a name check that already exists and ships: Spec 123 Task 6's name contract (`d566b30ff`, #215: the build's own-index check of every `var()` the bundled components reference, and `sync` against the adopter's generated CSS, consumer-integration case C6), Spec 129 Req 1.6 (Consumer Guard, with Task 8.4's `var()` check) and Spec 129's 13.2 component-tier cases.
  - **132's CLOSEOUT re-reads them green at 132's final head.**
  - The item's wording should read "the web components the package ships" (web source is not in `package.json` `files`); the 129 line is `requirements.md` L456.
  - Surviving counter (Sparky): a name check is not a render check; that residual is P-14.
- **S-2, mode-aware component colour** (Ada; Lina): only if Peter picks #870's option (ii). Not asked otherwise.
- **S-3, web render evidence and web authoring** (Sparky R1): P-14.
  - "Build more" (D10, WP6) is native-only while Peter's "use DesignerPunk to build more" names no platform; if anyone reads the goal as covering web authoring, it joins P-14.

---

## 6. Probes owed during this round

Both probes are owed before the iOS minimum (P-6) and the render tools (T-3) are decided. They are the goal record's obligation (1). The record's Trigger on #868 says obligation (1) "is not a condition of the close". Neither probe is a spec task or a gate (plan-r2 § 2, "Probes").

- **Data's Android render probe, in CI**
  - **State at this draft**: **Passed**, VERIFIED by Data from its runs on #884 (the grant's fixing PR, `f7ea75081`).
    - Run 46040355947, runner image `ubuntu24 20261122.23.1`, about 7.5 minutes:
      - `/dev/kvm` exists, and opens after the documented udev rule ("KVM (version 12) is installed and usable");
      - no licence prompt;
      - downloads of 13 s (emulator), 20 s (API 26 image) and 17 s (API 36 image);
      - boot to `sys.boot_completed` in 35 s at API 26 and 56 s at API 36;
      - the instrumented Compose smoke test passes at both levels (145 s at API 26 including the first build, 33 s at API 36);
      - the Robolectric Compose test passes in 53 s.
    - **One sample**: lane stability is a later read, and KVM can move with the runner image.
    - **A finding for D4 and P-9**: Compose 1.12.1 under the pinned BOM 2026.09.00 needs `compileSdk` 37 for an app or test build, while the harness pins 36. The harness never sees it, because it runs only `compileDebugKotlin`. Moving the harness pin is a choice under ballot `2026-11-07-native-lane-ownership` item 3, by grant or spec row
  - **Where the result is recorded**: the goal record's § "Android render probe result (2026-11-27, Data)", written by #884, with the `render-probe:` lines; the `compileSdk` finding as a dated line on the toolchain-range record. **#884 merges before #880**, because #880 archives the goal record (Data R1)
- **Kenya's iOS spike**
  - **State at this draft**: **Ran 2026-11-27 on iOS 26.0.** The iOS 17 part is **moot** since P-6's ruling (its record, #886, is Kenya's to re-rule or close). iOS 18.x evidence comes from the release-time `macos-15` lane, not from a probe
  - **Where the result is recorded**: `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-render-spike/README.md`, on draft PR #879 (head `ae1f9b74e`), with a pointer in the goal record. Kenya's R2 measurements (the T-13 walk, the T-4 adopter module, the T-12 scaled forms, `@_spi`) are owed to #879's evidence

**What Kenya's spike found** (her README as corrected, and her R2; VERIFIED by her on this Mac, Xcode 27.2, iOS 26.0 simulator, deployment target 17.0; not on a CI runner; no DesignerPunk component rendered, because the components do not yet compile at zero in an adopter's module):
- XCUITest works on a plain SwiftUI fixture styled with generated tokens: elements found by identifier, frames non-zero, tap-then-read works. 9 tests, 0 failures, about 48 s.
- XCUITest cannot see accessibility hiding: hidden views are found, with or without an identifier, and its element counts do not change. The in-app walk, run under XCUITest, does see it (T-13).
- The ink check discriminates across base and wcag, light and dark, including UIKit-backed controls, with a known-bad reading exactly 0. Its floor is picked per element class.
- `performAccessibilityAudit` caught 3 of 3 planted defects, reported 0 on clean screens, flags fixed `.system(size:)` fonts and does not flag the scaled forms (T-12).
- An adopter package in `ios/` importing our root package links, with the `.package(name:path:)` form (T-4).
- **Not run**: CI; iOS 18.x; VoiceOver speech, the largest Dynamic Type size and reduce motion.

**What the probes cannot settle** (REASONING): a local spike is a report the claims pass cannot re-run. The first CI run of each render lane is its own measurement: the iOS lane would run Xcode 26.6 on `macos-26`, whose simulator runtimes are UNVERIFIED. Xcode's MCP bridge (plan-r2 § 1 instruments table) is a candidate tool and never an oracle.

---

## 7. What this PR's merge carries out

**Peter, received 2026-11-27T16:44:48Z** (the orchestrator's receipt time, relayed; recorded in `.kiro/issues/2026-09-26-native-component-distribution.md` § "Peter's answer (2026-11-27)", on PR #868), verbatim: "Spec with (a), and start 132's outline round now". He was answering the record's escalation: (a) is "the merge of Spec 132's **seeded** outline carries out the answer".

So **this PR is the carrying event** (`.kiro/issues/README.md` rule 11: a spec answer is carried out when the spec's design outline merges and names the record). This file names the record (§ 4.2, row 1) and no longer carries the placeholder's Status string.

**Merge preconditions** (for the orchestrator and the owners; none is this file's to do):
1. **#868 merges first: DONE** (`e03d3ae3f`). The record's Trigger on `main` is `merge:#880`, so this merge fires it. *(`issues-owned.sh --pr 880` still reports 0 fires, because it reads records at this branch's head, whose merge base predates #868.)*
2. **#884 merges before #880**, so the Android probe's result lands in the record before the record is archived.
3. **The record's close is in this PR's own diff.** A close committed on this branch lands in the squash, which is its own ancestor, so the record does not lapse at the merge (Stacy R1; it also holds under B2 as answered).
   - It is Kenya's and Data's act (rule 5: a dated outcome line, then the archive move), committed on this branch at Thurgood's signal, **after Peter's sitting-2 batch** and before the PR leaves draft.
   - **The outcome line must close the whole record** (Stacy, under B2): it says so, and where each remaining item now lives: this outline's § 4.3 and § 6, the toolchain-range record (#881), #888's iOS-18-floor record, § 5.1 P-6, and the access-pass list in § 2.
   - The close carries Kenya's dated pointer for her section's "§ 3" cite, and her check that this outline names her three iOS obligations (it does, VERIFIED by Kenya at `22e21990a`).
4. **The "Native status" passage does not change at this merge** (T-11, CLOSED by Kenya and Data). No limitation marker names the goal record (VERIFIED, Thurgood: `git grep -c 'limitation:'` finds none in `governance/DesignerPunk-Integration-Guide.md` or `docs/consumer/INSTALL.md`), so the archive move forces nothing.
5. **This PR is draft** until Peter answers the sitting-2 batch and the answers are folded.

**What does not change at this merge**:
- no requirement, design or task exists;
- the consumer overlays still say "Native onboarding is not supported on this release" (they flip at the support claim);
- "Do not start a native product" stays printed until the first family ships.

---

## 8. Round cost (estimate)

Sessions are seat-sessions. **Confidence: low.**

| Item | Seats | Sessions |
|---|---|---|
| R1: draft, entries, fold | all seven seats; Thurgood | about 8.5 (**spent**) |
| R2: cross-read entries | Lina, Leonardo, Kenya, Data, Ada, Stacy | about 4–5 (**spent**) |
| R3: two T-1 entries; this fold | Lina, Leonardo; Thurgood | about 1.5 (**spent**) |
| Data's probe (#884) | Data | about 1.5 (**spent**) |
| Committing Kenya's R2 measurements to #879; re-ruling or closing #886 | Kenya | 0.25–0.5 |
| Kenya's and Leonardo's R4 entries on P-6, and this record of the ruling | Kenya, Leonardo; Thurgood | about 1.5 (**spent**) |
| Stacy's ARMING read at #884's merge, and her #883 | Stacy | 0.25 |
| The sitting-2 decision brief, then folding Peter's answers | Thurgood | 1–1.5 |
| Ada's list of typography tokens for P-13 (before sitting 2 or 3) | Ada | 0.5 |
| The goal record's close, with the pointer (§ 7) | Kenya, Data | 0.25–0.5 |
| **Total** | | **about 20–23** (about 17.5 spent) |

**Owed before 132's requirements, outside this round**:
- Lina's two ballot drafts (T-9, 1–2);
- my 131 sizing (T-17, about 1, before the first first-family unit merges);
- Lina's theming record (#885) and its fixes.

**Unsized**: the per-lane grants (T-15, about five or six), the D6 committed summary (T-16), the sessions line (§ 3).

**Peter's sittings: 3–4 in all.**
1. **Done**: the Android grant merged (#878); P-6 ruled.
2. **The sitting-2 batch** (§ 5.1): P-1, P-2, P-7, P-3, P-4, P-5, P-16, and P-14 if included. About eight questions.
3. **The token review** (P-13). It can share sitting 2 if Ada's token list is ready; a token review is usually its own read.
4. **The merges**: #868, #884, #879, then this PR. Merges, not rulings; they can share sitting 2.

**What would push it up**:
- the `macos-15` image's Xcode not running iOS 18.x (the release-time lane then needs another toolchain);
- T-14's threshold resolving to the compile tier, which brings back the opt-in marking for P-7;
- a second component wrapping a system control, which reopens P-16.

---

## 9. Fold-back, and what survives

- **Counter-argument**: this outline was seeded before the probes ran, so its D5 tools and P-6 rested on unmeasured runtimes, the gate inversion plan-r2 warned about ("criteria written before the numbers get diluted when the numbers arrive", Stacy).
- **What it changed**: both probes ran inside the round, and they changed the plan:
  - the Android emulator works on free runners (P-8 gone),
  - `compileSdk` 37 joins P-9 and D4,
  - XCUITest cannot see hiding (T-13 changed twice, and settled on a measured oracle),
  - the plain local-package form fails on iOS (T-4's `name:` fix),
  - and one scaled-font API does not exist (P-13's emission).
  - P-6 was ruled on Kenya's and Leonardo's evidence of what free CI can run. No requirement is written before Peter's batch is folded.
- **What survives**:
  - Peter is asked about D4–D10 before a linked app exists on either platform. A D row may need changing after the first family, and that change is his again.
  - The first family is cheap in per-component repair and expensive in shared and cross-cutting costs (§ 2). Splitting the two in the measured-cost record is the mitigation, not a fix, and the record will run slightly high because the family is heavily instrumented (Stacy).
  - T-14 (ii) makes `generate`'s output depend on release readiness, which is new behaviour: an adopter's module changes on upgrade without any change to their config.
  - P-16 reaches Peter as a schema question an owner could have decided. Seats changing position on new arguments is the review working; three crossings on the same facts is a cost of parallel rounds that the orchestration owns.
  - Every seat is one model family. What carried weight this round was measurement: three seats' greps corrected two counts, and Kenya's runs falsified two of her own earlier claims.
  - P-6's floor of 18 holds evidence-wise only while a free image carries an 18.x runtime; after that the gap returns one version up (Leonardo R4).
  - Under (x′), 132 stays open across 131's process-law change, which this project has not done before (plan-r2 § 10).

---

**Spec outcome (2026-11-27, Thurgood)**: open — "Spec with (a), and start 132's outline round now" — Peter, received 2026-11-27T16:44:48Z (the orchestrator's receipt time, relayed; recorded in `.kiro/issues/2026-09-26-native-component-distribution.md` § "Peter's answer (2026-11-27)", PR #868)

# Design Outline: 132 — Native Components in the App

**Date**: 2026-11-27 (replaces the 2026-11-07 placeholder from #723, whose text is at `a953ac70d`)
**Spec**: 132-native-components-in-app
**Author**: Thurgood (spec formalization), briefed by the orchestrator
**Status**: **SETTLED, and parked behind 133's token half.** The outline round and Peter's sitting 2 are complete (2026-11-28), and every question put to him is ruled (§ 5.1). Under the pivot (Peter, 2026-11-28T03:45:37Z), 132's requirements wait until 133's token half (U1–U3) is complete. 132 resumes from this outline after a refresh of its moving measurements (§ 9).
**Read at**: `origin/main` `8553499b1` for the facts in `evidence/`, and `017514064` for record states, unless a line names another commit.

**Labels** (as in plan-r2): **VERIFIED (who)**: the named seat ran or read it. **REASONING**: inference. **UNVERIFIED**: nobody has checked it.

## About this outline

- **What it holds**: the seeded outline (plan-r2 § 6 item 8), with R1, the R2 cross-read, the T-1 R3 entries and sitting 2 folded in, reshaped after the sitting on Peter's order (2026-11-28T02:08:13Z: "(1) — let's answer now and reshape after"). It is written for the agents who plan 132 when it resumes.
- **The working history is the feedback doc**, `feedback/design-outline.md`: every seat entry, every `[PETER]` record, and, in `[THURGOOD R20]`, every block this reshape moved out of the outline, word for word. The full pre-reshape text is at `e167dba9c`.
- **What is decided**: Nothing here is decided except what is marked **RULED** with Peter's words, or **CLOSED** with the owning seats named. Every open item has an owner and a closing event. Nothing is built, scaffolded or created by this file.
- **Facts**: `evidence/facts-at-8553499b1.md`, the unedited stdout of `spec-facts.sh 132 b89163c41 8553499b1` (the window starts at the plan of record's commit).
- **Pointer-shaped on purpose**: facts that go stale (error counts, entry counts, sizes, what has shipped) are cited from their records or labelled with the SHA they were read at. They are not copied as current.
- **Owners (by domain)**:
  - Kenya (iOS: packaging, the D4 app, the render lane, the iOS minimum's evidence) and Data (Android: the same, the toolchain range, the API-26 floor test);
  - Lina (component content, the public-API pass, the contract tests, the access-level and contract-validation ballots, the `rendering:` schema);
  - Ada (`generate`, which owns our module's manifest; deprecated aliases; the token-emitter preconditions in § 4.1; the typography tokens P-13 approved; the release script, for D7);
  - Leonardo (the fixture app's content, the adopter journey, the walkthrough, the code samples);
  - Sparky (web, for § 5.3 and P-14's record);
  - Thurgood (formalization, the D6 checker, the measured-cost record's form, RELEASE-FLOW's step text);
  - Stacy (the claims passes, the LENS read at the tasks round, the CLOSEOUT read).

---

## 0. The outline in one screen

- **The goal, in Peter's words** (§ 1): adopters use DesignerPunk's native components as a package dependency, build more with DesignerPunk, and "the components are functional, and will successfully render, in the app as described."
- **This spec's state**: settled, and parked behind 133's token half (§ 3). 132 resumes when 133's U1 (state colours as tokens), U2 (the `ColorTokens.ts` deletion and the rgba cleanup) and U3 (shadow channels) are complete, so the first family is built against final colours.
- **Where we were at `8553499b1`**: Spec 129 closed.
  - The generated token files compile on iOS and Android, and our component source compiles against them except for pinned errors (49 iOS, 93 Android, VERIFIED Thurgood by counting `harness/expected/*.tsv`).
  - No app is built, nothing is linked, no DesignerPunk component is rendered and no native contract is tested.
  - "Do not start a native product" is still printed.
- **What this spec does**: takes the components from "compiles in our checks" to "builds, links, renders and behaves as described in an adopter's own app", one family at a time.
  - The first family is the Chip family plus Icon-Base plus one adopter-built component, in a component demo app we build (§ 1, D4).
- **What is ruled**: § 5.1, one line per ruling. **What the team still owes**: § 5.1, "Owed acts", and § 5.2's open items.
- **What must be fixed first** (§ 4.1): the two token-emitter defects (#870, #873, both recorded on `main`), the served-doc correction that goes with them (#872), and row 7's warning gap.
  - Until they land, an adopter-built component's own tokens can break the native build silently.
- **What this outline's merge does** (§ 7): it carries out Peter's 2026-11-27 answer, "Spec with (a)", for the distribution charter, the goal's home since 2026-11-05.

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

**The definition of done** is plan-r2 § 1 "The definition of done", rows D1–D10 and their "details" paragraphs, at `b89163c41`, with the D1 probe sentence replaced as the native-plan `README.md` records at `55004006b` (L23) (Peter, received 2026-11-05T05:14:42Z), and with the D-row changes below.

So the table is two fixed texts at two SHAs plus the change list. It is cited, not copied, so there is one table to keep true.
- **D1–D3 are Spec 129's part of done** (**RULED**, "C yes"). 129 delivered them at its close (CLOSEOUT pass, § "For the reader"). D3 is "129 builds it; 132 brings it to zero": the pinned component entries are 132's to remove.
- **D4–D10 are ruled** (P-1, **RULED**). A seat that changes a D row later, its details included, needs Peter's approval (Stacy, condition 2).
- **The D-row change list** (Stacy R1): 132's requirements round carries, in its Context for Reviewers, a list headed "D-row changes since `b89163c41`", even when it reads `none`. Stacy's LENS and CLOSEOUT reads check it. The changes, each Peter's:
  - D8's population (P-1, **RULED**): "every fenced Swift or Kotlin block in a file the package ships or an MCP serves";
  - **D4's iOS deployment target, 17.0 → 18.0** (plan-r2 § 1, "D4 details", "iOS: deployment target 17.0"; it follows from P-6's ruling; P-1, **RULED**);
  - **D4 and D10 relabelled as our fixture app** (P-1, **RULED**, addition (1); the text, **RULED** below);
  - **D4's release builds** (P-1, **RULED**, addition (2); the text, **RULED** below);
  - **D7's evidence kinds**: `device-read (human, <device>, iOS <x>)` and `emulator-read (human, API <n>, TalkBack <v>)`, two separate kinds, one never counting as the other (P-3, **RULED**; Stacy R7);
  - **not a D row: the real-app record** (P-1, **RULED**, addition (3)): an owed act under `.kiro/issues/README.md` rule 10, owned by Kenya and Data, with Stacy reading it at its first build as a SYMPTOM-class claims audit against what D4 claims (Stacy R3).
    - When Peter's own app first builds against a release, it gets a dated read. It is evidence, not a gate: it holds no claim and no merge.
    - Its event is one only Peter can see, so its Trigger is `manual`.
    - **Kenya and Data file it in their close commit on this branch** (the PR body's merge preconditions). This outline does not file it.
    - **Surviving counter-argument** (Data R5, Stacy R3): it has no forcing date. A `manual` trigger can lapse without anyone noticing, and if Peter's app never becomes ready, the gap between our fixture and an adopter's app stays open while nothing in D4–D10 turns red.
  - and, only if they arise, T-12's audit exclusion (P-11) or a static-only iOS evidence kind for D7 (P-12).

**RULED TEXT** for D4 and D10 (Thurgood's draft, with Stacy R3's D4 sentence as the base, and Leonardo R10's "What it is" line). Peter confirmed it, received 2026-11-28T03:32:51Z ("Yes to 1 and 2. …"; `feedback/design-outline.md` § "[PETER] P-1 confirmed: the D4 shape"). Every other D4 details line, and D4's oracle, is unchanged.
- **D4, "Done means"**: "Our fixture adopter app, built in the adopter layout from a packed install, builds and links with the components as a dependency. It proves the path; it does not prove any particular adopter's app."
- **D4 details, a new first line** (Leonardo R10, verbatim): "**What it is**: a component demo app that we build and keep in this repository, and run in our CI (iOS: Kenya; Android: Data; content: Leonardo). It has two screens: a catalog, and one patterns screen that composes the claimed families the way a product would (filter and tags first). It grows by one family per unit. Its component list comes from the committed catalog (below), so small never means a hand-picked set of components. It stands in for an adopter's app and is not one. Peter's own app is read through the real-app record."
- **D4 details, "iOS"**: "**iOS**: deployment target 18.0, in a committed `.xcodeproj` (Kenya; P-6)."
- **D4 details, a new last line**: "**Release builds**: the app is also built the way a shipped app is built. iOS: a Release build as well as Debug, and the app built in Swift 6 language mode as well as Swift 5 (Kenya). Android: a release build with R8 on, as well as debug (Data)."
- **D10, "Done means"**: unchanged, "An adopter can build more".
- **D10, oracle**: "A fixture adopter component, created with the WP6 scaffold and with its own `defineComponentTokens` file, lives in the D4 fixture app's own module. It reads our tokens, composes one of ours, and passes D3–D6 in the D4 fixture app. It includes one deliberate same-name case to prove the naming rule (§ 3 conflict) (Ada D7; Stacy; Leonardo D3 (d); Data PLAN R2)"
- **Seat wording not carried into the ruled text**, each an input for the requirements round: `[THURGOOD R20]`, "From § 1".

**What "as described" means and does not mean** (plan-r2 § 1):
- each component's Stemma contracts pass as tests on that platform, each test shown to fail on a known-bad case.
- It does **not** mean system controls look the same on iOS 17 and iOS 26: a component that follows platform convention gets the system's look, and one that departs is drawn by us and checked by D5 (ballot `2026-10-18-true-native-development-is-not-true-native-design`).

**What stays a reading, not a check** (plan-r2 § 1, Stacy): whether a test covers everything its contract says (fit, sampled at CLOSEOUT), and spoken screen-reader output unless a human hears it.

---

## 2. Scope: where 129 stops and 132 starts

**The line** (plan-r2 § 2, Ada PLAN R1): "129 owns what `generate` emits and what the package ships; 132 owns what is written into, or runs in, an adopter's app." 132's write scope includes the generator paths, with Ada as one of its owners.

**In 132** (plan-r2 § 2, work packages 3 remainder, 4, 5 and 6):

- **D3 to zero**
  - **What it means here**: The pinned component entries 129 left, tagged to `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` (45 iOS and 89 Android at `8553499b1`), plus 4 per platform tagged to the blend record. Under T-14 (ii) each family reaches zero in its own unit, and D3 stays a whole-package row. Under the pivot, 133 U1 deletes the native blend files, and 132 drops their pinned entries in its own act (Ada R10)
  - **Owners**: Lina; Kenya and Data verify
- **Public API and packaging** (WP4)
  - **What it means here**:
    - The access-level rule (a ballot, § 4.2);
    - iOS: the 20 views an app cannot construct (the goal record's "Access-pass list");
    - Android narrows helpers and previews;
    - `generate` owns our module's manifest (root `Package.swift`, the Android module folder), scoped to ready families (T-14) and under Ada's three conditions (§ 4.3);
    - deprecated-alias emission before the claim (none exists today, VERIFIED Ada);
    - Icon-Base's 48 drawables carry no prefix, so renaming them after the claim is a break: they are named before it (Lina; Data verifies; Data R6, R10)
  - **Owners**: Lina (API); Kenya, Data (shapes); Ada (`generate`, aliases)
- **The app** (D4)
  - **What it means here**: An adopter-layout app on each platform, built from a packed install, with plain `import` only, the anti-copy check, a non-`DP` abbreviation and one adopter theme (plan-r2 § 1, "D4 details"). It builds the adopter's **default** manifest, not the full set (Leonardo R2).
    - iOS: deployment target **18.0** (P-6, RULED; a D-row edit inside P-1); a hand-written `.xcodeproj` with synchronized folders (T-3), and the package referenced as `.package(name: "DesignerPunk", path: …)` (T-4).
    - Android: `compileSdk` 37 at the pinned Compose BOM (§ 6), against the harness's 36.
    - Content: Leonardo's catalog screen built from the served samples, and a "Patterns: Filter and tags" composition screen (P-1, **RULED**; Leonardo R10), written as a real screen spec in the fixture adopter's own `product/`
  - **Owners**: Kenya, Data; Leonardo (content)
- **Render and behaviour** (D5–D7)
  - **What it means here**: The `rendering:` field (P-16); the per-platform contract validation format (a ballot); render lanes; contract tests with known-bad cases; the D6 checker and its committed per-unit summary (T-16); readiness derived at publish from committed results (T-7)
  - **Owners**: Lina (tests); Kenya, Data (lanes); Thurgood (checker); Ada (the release script, D7); Leonardo; Stacy
- **True samples and safe upgrades** (D8, D9)
  - **What it means here**:
    - D8: every fenced Swift or Kotlin block in a file the package ships or an MCP serves, compiled in the D4 app with a per-family prelude (Leonardo R1; a D-row wording change, P-1).
    - D9: the previous release's D4 app and samples compiled against the new release, the oracle for source breaks, including an upgrade that adds a family (Kenya R2), plus a public-API diff over our module, the generated token API included, that reads a family's arrival as an addition and its removal as a break (Ada, Leonardo, Data). Whether D9 compiles the committed previous-release catalog or regenerates it is open (T-21)
  - **Owners**: Leonardo; Kenya, Data; Ada
- **Build more** (D10, WP6)
  - **What it means here**: An adopter component, in the adopter's own module, with its own `defineComponentTokens` file covering at least one family by reference and one by value (Ada R1), that reads our tokens, composes one of ours and passes D3–D6; one deliberate same-name case; the scaffold verb and native test preset last.
    - Kenya built the adopter-module half on iOS (an adopter `FilterBar` reading our tokens and theme from its own module, `BUILD SUCCEEDED`, VERIFIED locally)
  - **Owners**: Lina, Kenya, Data, Ada (CLI), Leonardo (journey)
- **CI for all of the above**
  - **What it means here**: Each lane's workflow is written once, data-driven, under one issue-row grant (T-15), now including a release-time iOS 18.x run (P-6) on a free image that carries an 18.x runtime: `macos-15` with Xcode 26.3, or `macos-26` with the pinned 26.6 and a downloaded runtime, a choice item A of `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` leaves to 132's planning. Later family units edit no `.github/**` path
  - **Owners**: Kenya, Data; Stacy (ARMING)

**How 132 is cut** (plan-r2 § 2, "How 132 is cut"): one vertical slice, then one unit per family.
- **The slice (first family)**: Chip-Base, Chip-Filter and Chip-Input, plus Icon-Base, plus one adopter-authored component (D10), plus that family's code samples (D8), through compile at zero, public API, the app, render and contract tests, on both platforms.
  - Lina confirms the pick (T-2); the tasks round still picks.
  - The adopter component is picked by the team at the tasks round against D10's criteria, not by Peter; Lina, Leonardo and Kenya each use a `FilterBar` that composes our Chip-Filter, with spacing and sizing tokens only.
- **What the first family carries** (corrected in R1 by Lina, Kenya and Leonardo; the pinned counts are VERIFIED, Thurgood, by `grep -c` over `harness/expected/*.tsv` at `8553499b1`):
  - **Little per-component repair**: Chip-Base, Chip-Filter and Chip-Input have no pinned entry on either platform; Icon-Base has 2 on Android and none on iOS, and is one of the 17 `internal` iOS views.
  - **Blend, now 133's**: all three chips call `pressedBlend()` and Icon-Base calls `iconBlend()`, which call the unresolved `darkerBlend` (4 pinned entries per platform). Under the pivot, 133 U1 replaces those calls with state tokens and deletes the blend files, so 132 no longer pays a blend repair; it drops the pinned entries (Ada R10, Lina R9).
  - **Two cross-cutting D5 costs**: T-12 reaches all three chips (their label fonts are fixed primitive sizes), and T-13 reaches Icon-Base (its `accessibility_hidden` contract).
  - **Contract work**: 46 contracts per platform, inherited ones counted, so 92 native contract tests with known-bad cases; several are web-worded and need native wording first (Lina, VERIFIED by `get_component_summary`).
  - **So the bias has a different sign on each line** (Lina): the slice under-states per-family repair, and books shared costs that later families will not pay again. The measured-cost record splits shared costs from per-family ones (§ 3).
- **Then one unit per family**, each family entering the default manifest as it is claimed (T-14). **WP6's scaffold comes last.**

**Not in 132**:
- what `generate` emits for a stranger in general (129, closed);
- the React and React Native platforms (128, which inherits the app lanes, the comparator, the D6 checker and the binding model, plan-r2 § 3);
- served readiness for adopter components and `implements:` (128's lane 3, plan-r2 § 2 WP6).
- Lina notes that until 128 lands, agents see adopter components in the application MCP next to ours with no evidence of the bar; that belongs to 128, as a rule-10 record Lina files (§ 5.1).
- state colours, the `ColorTokens.ts` deletion, the rgba cleanup, shadow channels and colour enforcement (133, by the pivot).

**Web**: 132 adds no build work on web (S-1, **CLOSED**, § 5.3). Web render evidence is a Sparky-owned record placed alongside 128 (P-14, **RULED** (b)); 132 keeps the contract-validation format keyed by platform.

---

## 3. Order, and the measured-cost record that 132's tasks must declare

**The order** (**RULED**, re-ordered by the pivot, Peter, received 2026-11-28T03:45:37Z, verbatim: "Yes to 1, U2 before 132, keep 131. Re: 4, rejected. I don't think U1 will take "weeks" as projected."): 129 → **133's token half** (its outline round, then U1, state colours as tokens, then U2, the `ColorTokens.ts` deletion and the rgba cleanup, and U3, the shadow channels) → **132's first family**, built against final colours → Peter re-places the remaining families against 131, using that family's measured cost → 131 → 128 → 130 → **133's enforcement**, after 132's first family. Record: `feedback/design-outline.md` § "[PETER] pivot".
- **What it replaces**: (x′) (**RULED**, "Let's go (x′)", received 2026-11-05T04:06:22Z; "A yes, B (a), C yes; (x′) as defined", 04:07:43Z), which placed the colour track after 130. The pivot moves 133's token half ahead of 132 and keeps the rest of (x′), 131's place included ("keep 131").

T-14 (ii) keeps the cut the order was approved on: the first family is measured on its own (Data R2: option (i) would have undone it, and Peter would have had to hear it).

**The measured-cost record**:
- **Path**: `.kiro/specs/132-native-components-in-app/completion/first-family-measured-cost.md`. It is fixed by two records that already name it:
  - Spec 131's park line (`.kiro/specs/131-governance-simplification/design-outline.md`, the 2026-11-05 outcome line: "park — re-ask: `path:.kiro/specs/132-*/completion/first-family-measured-cost.md`")
  - and the priorities record's 2026-11-05 walk line, which carries the obligation that "Spec 132's tasks round declares the record".
- **132's tasks round SHALL declare it** as a Primary Artifact of the parent that closes the first family, in the first-family unit's PR. **Creating it fires 131's park re-ask**, so nothing writes that path before the first family is complete.
- **What it contains, and how each row is verified** (Stacy R1 and R2; Thurgood owns the form). Peter's re-placement rests on it, so a row that cannot be re-read is labelled, not presented as measured:
  - **Window**: one first-parent commit range, from the merge that first commits 132's `tasks.md` to the merge of the unit that closes the first family. Every row counts over it
  - **Sessions, by seat and work package**: the tasks round declares a sessions line as an M4 instrument, so each first-family parent completion doc carries `**Sessions**: <seat> <n> (<work package>); …`, with the shared work packages (T-12, T-13) named in the tasks round and one definition of a session (one agent run that writes or reviews).
    - The record sums the lines.
    - **Labelled "self-reported per parent"**: Stacy's pass checks that each line exists and that the sums are right, not that the numbers are true.
    - A Completion Documentation Guide change waits for this to work on the first family
  - **Peter's sittings**: the raw count of distinct receipt times in committed ruling or answer records added in the window, and the count of sittings under a stated grouping rule printed beside it (for example, receipt times less than two hours apart)
  - **CI minutes by runner class**: each unit's completion doc carries its own run table (run ID, workflow, runner label, duration, pasted from `gh run view <id> --json` at its merge), and the record sums them, split by workflow and work package. macOS minutes are the scarce column
  - **Contracts tested, labelled and excluded, with known-bad results, per platform**: the D6 checker's committed per-unit summary at the closing commit (T-16), not a hand count. Exclusions printed as a fraction of the denominator
  - **Defects found and where routed**: issue records added in the window (`git log --diff-filter=A` over `.kiro/issues/`) that name 132 or a first-family component, each with its owner
  - **Shared costs, booked apart**: T-12's type scaling and T-13's hidden-view check, which later families do not pay again (Lina). The blend repair left this row with the pivot: 133 U1 carries it
  - **Per-family extrapolation**: method stated, the bias with its counts (0 pinned entries on the chips against 45 iOS and 89 Android elsewhere), and labelled REASONING. It also says that this is the most heavily instrumented family the project has run, so its numbers run slightly high (Stacy)
  - **A column for 131**: Thurgood, as 131's formalizer, sizes 131 (T-17), under Stacy's three conditions:
    - **committed before the first first-family unit PR merges** (its commit an ancestor of that merge);
    - the same units over a named span of 131, the method labelled REASONING and citing 131's cost ledger where it gives measured inputs;
    - and the conflict stated (Thurgood is 131's formalizer and owns this record's form), with one other seat reading the method before it is committed.
    - **The column's header says "forecast", beside a measured 132 family**, so the two are not read as the same kind.
    - If the estimate is not committed in time, the column is dropped and the comparison is labelled one-sided.
    - Stacy carries a calibration read to 131's CLOSEOUT
- **132's size against 131's** (plan-r2 § 6 item 8 asks the outline to state it): 132's sized items are about **50–95 sessions**, low confidence, with several items unsized (plan-r2 § 8). The review added: per-lane CI grants (about five or six, T-15); the token-side type scaling (1–1.5 for the generator, plus 20 call sites moved, and the two new typography tokens P-13 approved, T-12); the manifest with its family filter and closure cases (1–2 plus a harness case per family, Ada, Kenya); D8's preludes and the fixture screen (1–2, Leonardo). No honest comparison with 131 exists until T-17 is committed.

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

### 4.2 Records that name 132

One list of every record this spec relies on, by path. The requirements round runs Process-Spec-Planning § "Before Formalizing" afresh and writes each disposition line in its Context for Reviewers; the proposals the outline round made, with each record's Trigger at `017514064`, are in `[THURGOOD R20]`, "From § 4.2".

- `.kiro/issues/2026-09-26-native-component-distribution.md` — Kenya, Data (Lina, Ada) — the goal record; closes in this PR, which carries out Peter's "Spec with (a)" (§ 7)
- `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` — Lina — intake: its native items go to D5 and D6
- `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` — Lina (Kenya, Data verify) — intake: D3 to zero, per family
- `.kiro/issues/2026-11-06-theme-family-persisted-form-for-132-d5.md` — Kenya, Data — intake: the stored string is settled (T-5); runtime switching at D5
- `.kiro/issues/2026-11-12-readiness-tables-generate-or-guard.md` — Lina (Thurgood consulted) — intake: T-8
- `.kiro/issues/2026-09-29-instruments-parser-and-resolver.md` — Thurgood — leave: fires at 132's first tasks round
- `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` — Thurgood — leave; its order line and § 7 row are owed (§ 5.1, "Owed acts")
- `.kiro/issues/2026-11-05-hand-written-readiness-claims-disagree-with-generated-readiness.md` — Lina — leave: fix-now, sequenced with T-8
- `.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md` — Ada — leave, and a precondition (§ 4.1); this outline takes nothing from it
- `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` — Thurgood — leave: names 132 only for the order
- `.kiro/issues/2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md` — Stacy — leave: names 132 only for the order
- `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` (#870) — Ada — leave; a precondition (§ 4.1)
- `.kiro/issues/2026-11-27-product-token-swift-emitter-colour-types.md` (#873) — Ada — leave; a precondition (§ 4.1)
- `.kiro/issues/2026-11-27-native-access-level-ballot-owed.md` (#877) — Lina — intake (T-9)
- `.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md` (#877) — Lina — intake; also carries P-4's reason-class list and the per-platform oracle lines (T-13)
- `.kiro/issues/2026-11-27-rendering-field-record.md` (#877) — Lina (Leonardo consulted) — intake: its shape is P-16's
- `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md` (#881) — Data — intake: the range numbers (P-9) and the API-26 floor test
- `.kiro/issues/archive/2026-11-27-android-render-probe-workflow-grant.md` (#878) — Data — closed at #884 (`358ca187b`)
- `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md` (#888) — Thurgood (items name their seats) — intake: P-6's owed acts A–E
- `.kiro/issues/archive/2026-11-27-ios-17-runtime-probe-owed.md` (#886) — Kenya — moot since P-6; filed under `archive/` with no outcome line (`e85112d7a`), so Kenya's re-rule or close is owed
- `.kiro/issues/2026-11-27-input-text-base-caret-and-selection-not-themed.md` (#885) — Lina — intake; its fix is proposed for 133 U1 (P-16)
- `.kiro/issues/2026-11-27-button-verticallist-set-ios-literal-font-size.md` (#885) — Lina — intake: a token-compliance defect (T-12)
- `.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md` — Ada — 133's record; its correction is owed (§ 5.1)

Records still to be filed are in § 5.1, "Owed acts".

### 4.3 Obligations from the inbounds, by the record that holds each

The 129 inbounds (`.kiro/specs/129-consumer-generation-completeness/inbound-from-{kenya,lina,ada}-design-2026-11-05.md`) and Kenya's rule-10 section on #868 passed these obligations to this outline. An obligation lives in an issue record (Process-Spec-Planning § "Handoff Notes"), so each is a pointer. The text this section held before the reshape is in `[THURGOOD R20]`, "From § 4.3".

- **Kenya**:
  - the iOS minimum (P-6) and its owed acts → `.kiro/issues/2026-11-27-ios-18-floor-132-owed-acts.md`, items A–E;
  - the wording rule from the claim ("built for iOS 18.0; tested on <runtime>", one generated minimum) → the same record, item C. Which wording applies between the Core Goals ratification and the first claim is **owed: Kenya** (§ 5.1);
  - the iOS 17 runtime probe → moot; `.kiro/issues/archive/2026-11-27-ios-17-runtime-probe-owed.md`;
  - Swift 6 language mode for the components, set in the root manifest (her inbound § 1, L67) → today only the goal record holds it, and the goal record closes in this PR, so **owed: Kenya to file under rule 10**, or to name the record its close outcome line points at.
- **Data** → `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md`: the toolchain range numbers (AGP; Kotlin with its Compose compiler plugin; the Compose BOM; `compileSdk`), their range-end builds and grant, and the API-26 floor test. His note that a forgotten theme provider is silent until a runtime test is a design input for D5, not an obligation.
- **Lina** → #877's three records: access level, per-platform contract validation, `rendering:`.
- **Ada** — **flagged for Ada to confirm before the close commit.** A grep of `.kiro/issues/*.md` at `main` `35456bdbc` for Q12, `COMMIT-POLICY`, "Swift 6" and "deprecated alias" found only the goal record and one archived record (Thurgood, UNVERIFIED beyond those terms). The goal record closes in this PR, so each item is **owed: Ada to file under rule 10**, or to name the record the close outcome line points at:
  - Q12, Q13 and the native type table, provisional until 132's D4 app builds, with what D4 must show for each (Ada R1);
  - `generate` failing on a `.kt` file that declares our package, proved by D10's same-name case;
  - the manifest's three conditions (the root `Package.swift` written only when absent or ours; per-platform paths and a `COMMIT-POLICY.md` entry; the `.package(name: "DesignerPunk", path: …)` import);
  - deprecated aliases for the whole shared token surface, and D9's public-API diff, before the claim (Peter's "7 (a)"; § 4.4).

### 4.4 Preconditions for the first support claim

Each lands before the release that first claims native support, which is **17.0.0, carrying 132's first family alone** (P-7, **RULED**):
- **133's state tokens** (P-7, **re-ruled** by the pivot): 133 U1's state colours as derived semantic tokens, computed at build time per theme in OKLCH, with their names and per-theme emission, and the public name of the one generated runtime function per platform for caller colours, which D10 needs (Ada R10).
- **The pressed colour, option (a)** (P-7, **RULED**, item 4): the contract states the ΔL range instead of "12%", and the native test checks it; the claim keeps a line saying colours may change. The measured −0.0889 is the dormant generator's computed maths, not a native run.
- **Deprecated-alias emission for the whole shared token surface, and D9's public-API diff** (Peter's "7 (a)"; § 4.3, Ada).
- **#870's and #873's fixes, and #872's CORRECTION** (Ada R1, P-7's token-side lean).
- **D7's derivation**, because P-2's overlay text points at served readiness (P-2, **RULED**, condition 2). Ada owns D7 (§ 2); Leonardo raised the condition. Holding a claim also holds D7's served readiness flip, so served readiness never says ready while the printed text says do not start (Leonardo R9).
- **The claim names only the claimed components.** D10's adopter component proves that an adopter can build one; it is not ours to claim and is not in the supported list (Stacy R4).
- The Core Goals iOS 18.0 ballot is ratified and applied (#888 `b58c73da7`, #889 `35456bdbc`): done.

**Until 17.0.0, `main` stays releasable as 16.x** (P-7, **RULED**, item 2): a breaking change is deprecated first and removed only in its major. The rule does not cover unclaimed reference-only native source (Lina). It gets an owner and a row in the priorities record's § 7 (Stacy R4).

---

## 5. Open questions

### 5.1 For Peter

**Sitting 2 is complete.** Each ruling below is one line, with its effect and its record in `feedback/design-outline.md`. The questions as they were put to him, with their options, leans and survivors, are in `[THURGOOD R20]`, "From § 5.1".

- **P-1, the definition of done: RULED** (b), with three additions (02:23:27Z, 02:26:04Z), and its D4/D10 text confirmed (03:32:51Z). Effect: § 1's change list and ruled text. → § "[PETER] P-1", § "[PETER] P-1 confirmed: the D4 shape"
- **P-2, when adopters are first told to start a native product: RULED** (b), per family, with all three of Leonardo's conditions (02:28:20Z). Effect: the overlay flip covers consumer Leonardo and points at served readiness ("Not re-asked", below); D7's derivation (§ 4.4); T-18. → § "[PETER] P-2"
- **P-3, device reads: RULED** (03:27:07Z, confirmed 03:32:51Z). Effect: Peter does one VoiceOver read per component on his own iPhone at the first support release, as dated evidence, not a gate; on Android he does TalkBack reads on the emulator, labelled "emulator read"; the two kinds stay separate (§ 1). Each read record carries Stacy R7's fields; Kenya R7's read mode and install notes are requirements inputs; the Android SDK install (about 2 GB) is Peter's when the reads come due. What survives: the reads are self-attested (Stacy R7, VERIFIED). → § "[PETER] P-3"
- **P-4, who may exclude a contract or remove a platform from it: RULED** (b), as new work (03:48:12Z, 03:49:46Z). Effect: a closed reason-class list, approved once; reasons on platform removals; a re-sort; a checker (owed acts, below). It is not today's practice (Lina R10). → § "[PETER] P-4"
- **P-5, do adopter-built components meet the same bar: RULED** (a), same bar, available (03:49:46Z). → § "[PETER] P-5"
- **P-6, the iOS minimum: RULED** (B), raise to iOS 18 (2026-11-27T18:32:45Z; confirmed 18:36:18Z with the device cost: no iPhone dropped, three iPads that stop at iPadOS 17). Effect: D4's target 18.0; a release-time iOS 18.5/18.6 lane; "built for iOS 18.0; tested on <runtime>"; `generate` restores the floor; the owed acts in #888's record. → § "[PETER] P-6"
- **P-7, which release carries the first claim: RULED** (03:19:49Z), then **re-ruled by the pivot**. Effect: 17.0.0 carries 132's first family alone, waiting on it plus 133's state tokens (§ 4.4); `main` stays releasable as 16.x (§ 4.4); T-14's threshold stays in the design round; the pressed colour, option (a). → § "[PETER] P-7", § "[PETER] pivot"
- **P-13, the token review: RULED** in three parts (03:57:33Z, 03:59:04Z, 04:18:53Z). Effect:
  - part 1: every typography semantic gets a size-band scale role (fine, compact, body, bodyLarge, headingSm, headingMd, headingLg, display), the 18 call-site moves, six iOS helper, error and "Required" texts to caption, layout repair per family. Its conditions: Leonardo's AX5 patterns-screen check before the first claim; Android's matching small-text fix in the same unit (Lina); a role-less typography token defaults to the nearest-size rule (Leonardo);
  - part 2: (H1), Apple-faithful, with Leonardo's served note that h4/h5 and h2/h3 may swap at the largest sizes;
  - part 3: (T1), `typography.segmentLg` and `typography.segmentMd` (fontWeight700; roles bodyLarge and body), with Leonardo's served line "`segment*` are for the labels of segmented selection controls only, not a general bold 16/18pt style." and Ada's future-needs rule. This was Peter's token-creation review for the two names; Ada creates them in 132's typography work. What survives: one consumer each.
  → § "[PETER] P-13"
- **P-14, web render evidence: RULED** (b) (04:40:39Z). Effect: a Sparky-owned record placed alongside 128; 132 keeps the platform-keyed contract-validation format. What survives: web's "renders" claim stays weaker than native's until 128. → § "[PETER] P-14"
- **P-16, the `rendering:` schema shape: RULED** (C), with Lina's (A) and the guards (04:24:26Z, 04:39:39Z). Effect: per platform, `rendering: { kind: drawn | platform, reason }`; the validator rejects a missing reason; render lanes check every `drawn` component whole; Stacy reads every `platform` value. What survives: whether `.tint` colours the selection is UNVERIFIED; if not, the choice reopens before Input-Text-Base's family is claimed. → § "[PETER] P-16"
- **The pivot: RULED** (03:45:37Z). Effect: the order in § 3; the proper blend fix is 133 U1 (token creation and dark-surface lightening still go to Peter's review at 133's token sitting); U2 before 132; 131 kept; Lina's CSS web fix rejected, so the web fix waits for U1. It trims Peter's 03:40:05Z "complete 133": enforcement comes after 132's first family. → § "[PETER] pivot"
- **The web P0: RULED** (a). Peter, received 2026-11-28T04:54:20Z, verbatim: "Agreed.", to the orchestrator's recommendation "(a). It's honest at release time, with no back-and-forth in what we serve." Effect: the 12 web components served as production-ready with "consistent state styling (default, hover, pressed)", which have not darkened on web since v12.0.0, are a **P0, confirmed and waived by Peter until 133 U1**; the served text is unchanged. If 16.4.0 ships before U1, its release notes carry one known-issue line, written by the RELEASE-FLOW walk owner at 16.4.0; U1's notes close it. Lina's web defect record carries the class, the waiver and the obligation. What survives: agents read the served text, not release notes, so until U1 an adopter's agent still assumes hover and pressed styling; Leonardo preferred correcting the text. → § "[PETER] web P0"
- **Do not arise**: P-8 (KVM works on the free runner); P-10 (Android answered by #878's merge; iOS superseded by P-6); P-15 (every seat picked (a) for T-15).
- **Only if they arise**: **P-11**, excluding the Dynamic Type audit (a D5 change; every seat leans fix); **P-12**, a D5 or D7 change from T-13: a labelled device read in place of a CI check, or, if the in-app walk fails on a runtime we test and only the static check is left, a new D7 evidence kind such as `static-checked` (Stacy R2).
- **Later**: **P-9**, the Android range numbers, after D4 builds, now including `compileSdk`; **the lane-maintenance fork** (Data R2): once a render lane is a required check, either a per-lane ownership ballot or a grant per fix; **T-7's RELEASE-FLOW change**, a LAW edit, put to Peter as a ballot when its design is drafted.
- **Not re-asked** (already ruled, carried): the two-spec structure ("A yes"); 129's narrowed sentence and this spec's acceptance ("B (a)"); D1–D3 ("C yes"); the Android minimum, API 26 ("Re: 5, 26"; Core Goals amended by ballot `2026-11-05-core-goals-android-minimum`); native changes before the claim ship in minors, with deprecated aliases and D9's diff landing before the claim ("7 (a)"); required-check promotion by measured stability (129 `tasks.md` § "Decision 6"); the consumer overlays flip at the support claim, which Peter merges as a cost, not a ruling (plan-r2 § 7's closing list), under P-2's conditions 1 and 2.
- **Held elsewhere, not 132's to ask**: #870's colour fork; row 7's re-answer (#864); whether #872's CORRECTION may land from Ada's seat.

#### Owed acts, by owner

None is filed in this outline. Each is owed by the owner named, by the event named or, where none is named, before 132's requirements.

- **Kenya**: with Data, the goal record's close and the real-app record, in the close commit on this branch (the PR body's merge preconditions), carrying her dated pointer for the "§ 3" cite; the `.tint` selection check (P-16); whether SwiftUI `.fontWeight` works with `Font.custom` (P-13); the re-rule or close of the archived iOS 17 probe record, which has no outcome line (Kenya R10); the pre-claim wording window (§ 4.3); a rule-10 record, or a pointer, for Swift 6 language mode (§ 4.3). Her T-13 walk is committed to #879's evidence (`b6c918828`, README § 4; Kenya R10).
- **Data**: with Kenya, the goal record's close and the real-app record; T-20; appending the floor-raise rule to `.kiro/issues/2026-11-27-android-toolchain-range-and-api26-floor-test-owed.md` as its item 3 (whether raising a toolchain floor counts as a major), decided with P-9 (Data R10).
- **Lina**:
  - dated pointers in the Source lines of #877's three records, which cite the placeholder's L7 and L33 (rule 9);
  - P-4: the reason-class list, grounded in a classification of the slice's 46 contracts per platform, through the per-platform contract-validation ballot (#877's record); a reason on every platform removal; the re-sort of the 40 exclusions and the 19 web-only contracts; the checker, with Thurgood;
  - P-16: the schema validator change;
  - P-13: Android's matching small-text fix in the same unit; a rule-10 record for Android Nav-SegmentedChoice's fixed-`dp` height on `sp` text;
  - the web pressed and hover defect record (12 web components, the fix in 133 U1, the tests' known-bad gap), carrying Chip-Filter's selected-and-pressed state, which is wrong on every platform: native fades the chip (`.opacity(0.9)`), web keeps the rest colour (Lina R13). It also carries the P0 class and Peter's waiver ("The web P0", above);
  - the contract's ΔL range (P-7, item 4), with Icon-Base's range, which cannot be met on white (Lina R13);
  - the native chips' motion, which does not match their contract (`duration150` and button-press motion, where the contract names `selectionTransition`): the drift record takes it, or Lina files a record (Lina R13);
  - a rule-10 record for 128: until 128 lands, agents see adopter components beside ours with no evidence of the bar (§ 2);
  - her T-13 confirmation, in the design round;
  - with Ada, the proposal to move #885's fix into 133 U1, for 133's outline round;
  - T-9's two ballot drafts.
- **Ada**: the `typography.label` record (`src/tokens/semantic/index.ts` L569 names a token that does not exist); after P-13 lands, a ballot adding a scale-role section to Token-Family-Typography; creating `typography.segmentLg` and `typography.segmentMd` in 132's typography work; the correction to the blend record; the confirmation of § 4.3's Ada items before the close commit; with Lina, #885 into 133 U1; a record for the chips' light `white200` surface on the dark canvas, with Leonardo judging whether it is intended (Stacy R5, Ada R14).
- **Leonardo**: the AX5 patterns-screen check; the H1 swap usage line; the `segment*` usage line; the support-claim text as a whole, with its colour line (P-7, item 4) and only the claimed components (§ 4.4; Stacy R4: "the text itself is Leonardo's"); a clean-room build that follows only the guide, before the first per-family announcement (his R6; logged "open, not folded" and never put to Peter, so it is his proposal for the requirements round); and, only if T-14 picks the compile tier, the call between ERROR and WARNING for Kotlin `` (Leonardo R13).
- **Sparky**: P-14's record, filed under rule 10, with its trigger alongside 128.
- **Stacy**: two SYMPTOM-class audit passes, each with a committed record, due by 132's requirements round: Spec 005's Dynamic Type completion claim, as a false-claim finding (Ada R11), and the claim side of `InteractionStateAudit.test.ts`'s false assurance (Stacy R9).
- **Thurgood**: 132's park line and 133's `open` outcome line, each in its own commit, after the close (`[THURGOOD R20]`, "Next"); the priorities record's walk-log line for the pivot's order, its § 7 row for the 16.x rule, and the dated pointer for its stale 2026-11-05 line ("Spec 132's directory does not exist yet"); `InteractionStateAudit.test.ts`'s false assurance, as test-governance owner; P-4's checker, with Lina; T-17's 131 sizing; T-7's RELEASE-FLOW ballot.
- **Not yet named**: the owner of the 16.x rule (P-7, item 2). **T-10's owners (Kenya, Data)**: D9's baseline.

### 5.2 For the team

The full text of each item before the reshape is in `[THURGOOD R20]`, "From § 5.2".

**Settled** (CLOSED):
- **T-1, the `rendering:` shape**: closed by P-16 ((C), Lina's (A)). The `.tint` check can reopen it. Under (A) the field's one new identifier is not owed: the render lanes check every drawn component whole, so nothing is skipped. If D6's contract tests need to reach the field, they add it as test work in that family's unit; if (B) reopens, the identifier returns with it (Lina R13).
- **T-3, tool choices**: a hand-written `.xcodeproj` with synchronized folders; the fixture states "Xcode 16 or later" (Kenya R10); the project created by doing the walkthrough's steps; a file-list test (Data); emulator and Robolectric both measured to run; ViewInspector optional.
- **T-4, where adopter components and their tokens live**: (a), adopter source in its own module, all generated token groups in ours; the fixture guard (§ 4.1) lands before D10. Android's import is confirmed at D4.
- **T-5, the theme family's persisted form**: the config name, as raw literals on iOS and a `key` with `fromKey` on Android; the scheme stored separately; a migration line for renamed themes. Runtime switching is D5's, at `design.md`.
- **T-11, the "Native status" passage**: no change at this merge.
- **T-14 (ii), one module, many families**: a family-scoped manifest; the closure list per family is data `generate` reads; a harness case compiles each included set alone. Its threshold is open (below).
- **T-15, CI grants**: (a), each lane's workflow written once, data-driven from a family-list file; grants per lane (about six or seven), and per unit only where a unit edits a workflow; the release-time iOS 18.x lane joins them, its runner left to 132's planning by item A of #888's record (`macos-15` with Xcode 26.3, where whether it runs 18.x is UNVERIFIED, or `macos-26` with a downloaded runtime).

**Open**:
- **T-2, the first family and the adopter component**: Lina confirms Chip-Base, Chip-Filter, Chip-Input and Icon-Base; a `FilterBar` composing Chip-Filter is the common proposal. Lina, Leonardo; Kenya, Data. Closes at the tasks round.
- **T-6, D6's known-bad run cadence**: Stacy's: on every PR touching a contract test, its component, the baseline or the checker, plus every unit PR and CLOSEOUT. Thurgood, Lina; Stacy reads. Tasks round.
- **T-7, D7's source**: converging on a committed results file measured at a named commit `R`, with the derivation refusing unless `R..S` changes only that file; a census line for row `hermetic-publish-path`; RELEASE-FLOW's step by ballot. Sparky's web column is unanswered. Ada, Lina, Thurgood; Sparky. Design round.
- **T-8, the readiness tables**: the combined form in one table in `governance/Component-Readiness-Status.md`, sequenced with Lina's fix-now record. Lina; Thurgood consulted. Requirements round.
- **T-9, the access-level and contract-validation ballots**: Lina drafts both before 132's requirements (1–2 sessions); the contract ballot carries P-4's list and T-13's oracle lines; the access ballot names Q12's binding names public. Lina, with the seats each record names.
- **T-10, D9's tools**: compiling the previous release's app and samples is the oracle; the dump tools are early warning, each shown to bite; the diff covers the generated token API and treats a family's arrival as an addition. Kenya, Data; Leonardo; Ada. Design round.
- **T-12, fixed font sizes and Dynamic Type**: P-13 ruled the token fix; the layout repair per family and the call-site moves are design-round and unit work. Ada, Lina, Leonardo; Kenya.
- **T-13, how a "hidden from VoiceOver" contract is checked**: iOS by the in-app walk under a UI-test session, with a known-bad twin (Kenya measured 3 hidden against 5 visible); Android by the merged semantics tree, with a non-null description as the twin. Kenya's measurement is committed to #879's evidence (`b6c918828`, README § 4); Lina's confirmation is owed. Design round.
- **T-14's threshold**: Ada's committed compile state, or Leonardo's claimed-families-only default with an opt-in compile tier; Data names a third shape. Design round.
- **T-16, D6's committed evidence**: a per-platform summary at each unit merge, per contract (state, test ID, oracle, evidence kind, known-bad result, run ID); the 288-contract baseline with the checker's first PR. Thurgood. Tasks round.
- **T-17, the measured-cost record's 131 column**: under Stacy's conditions (§ 3). Thurgood, one other seat reading the method; Stacy. Before the first first-family unit merges.
- **T-18, a readiness warning at selection time**: owed under P-2's condition 3. Lina; Leonardo; Thurgood (overlay text). Design round.
- **T-19, D8's sample contract**: per-family preludes; a catalog cell built by compiling the served sample. Leonardo; Kenya, Data. Tasks round.
- **T-20, the fixture's own Android theme and version catalog**: Data R5's proposal, not ruled. Data. Requirements round.
- **T-21, what D9 compiles**: the previous release's committed catalog, or a regenerated one; D9's details do not say (Stacy R8). Kenya, Data; Leonardo; Stacy reads. Requirements round.

### 5.3 Scope questions

- **S-1, web build work: CLOSED** (Sparky R1; Leonardo concurs). On web, 132 adds no build work: the web leg is held by Spec 123 Task 6's name contract and Spec 129's consumer guard and component-tier cases, which **132's CLOSEOUT re-reads green at 132's final head**. The wording should read "the web components the package ships"; the 129 line is `requirements.md` L456.
- **S-2, mode-aware component colour** (Ada; Lina): only if Peter picks #870's option (ii). Not asked otherwise.
- **S-3, web render evidence and web authoring**: P-14 ruled (b). "Build more" (D10, WP6) is native-only; if anyone reads the goal as covering web authoring, it joins Sparky's P-14 record.

---

## 6. Probes owed during this round

Both probes ran. The full text this section held is in `[THURGOOD R20]`, "From § 6".
- **Data's Android render probe, in CI: passed** (#884, `358ca187b`). The result is in the goal record's § "Android render probe result (2026-11-27, Data)"; the `compileSdk` 37 finding is on the toolchain-range record (#881). One sample: lane stability is a later read.
- **Kenya's iOS spike: ran on iOS 26.0, locally.** The result is in `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-render-spike/README.md`, on PR #879, ready for review at `766eb242d` (Kenya R10). Its findings are folded into T-3, T-4, T-12 and T-13. Her R2 probes (the T-13 walk, the T-12 scaled type, the T-4 local-path import) are committed there at `b6c918828`.
- **What the probes cannot settle** (REASONING): a local spike is a report the claims pass cannot re-run, and the first CI run of each render lane is its own measurement.

---

## 7. What this PR's merge carries out

**Peter, received 2026-11-27T16:44:48Z** (the orchestrator's receipt time, relayed; recorded in `.kiro/issues/2026-09-26-native-component-distribution.md` § "Peter's answer (2026-11-27)", on PR #868), verbatim: "Spec with (a), and start 132's outline round now". He was answering the record's escalation: (a) is "the merge of Spec 132's **seeded** outline carries out the answer".

So **this PR is the carrying event** (`.kiro/issues/README.md` rule 11: a spec answer is carried out when the spec's design outline merges and names the record). This file names the record (§ 4.2) and no longer carries the placeholder's Status string. The merge preconditions are in #880's PR body.

---

## 8. Round cost (estimate)

Moved to #880's PR body.

---

## 9. Fold-back, and what survives

The round's own fold-back is in `[THURGOOD R20]`, "From § 9". What survives, for 132:
- Peter was asked about D4–D10 before a linked app exists on either platform. A D row may need changing after the first family, and that change is his again.
- The first family is cheap in per-component repair and expensive in shared and cross-cutting costs (§ 2). Splitting the two in the measured-cost record is the mitigation, not a fix, and the record will run slightly high because the family is heavily instrumented (Stacy).
- T-14 (ii) makes `generate`'s output depend on release readiness, which is new behaviour: an adopter's module changes on upgrade without any change to their config.
- P-6's floor of 18 holds evidence-wise only while a free image carries an 18.x runtime; after that the gap returns one version up (Leonardo R4).
- 132 stays open across 133's token half and, under the ruled order, across 131's process-law change (plan-r2 § 10).
- **Parked through 133, this outline's measurements move** (Thurgood R14): Kenya's iOS 26.0 spike, the free images that carry an 18.x runtime, the toolchain pins. 132's resumption starts with a refresh pass, and some of sitting 2's context will be re-read.

---

**Spec outcome (2026-11-27, Thurgood)**: open — "Spec with (a), and start 132's outline round now" — Peter, received 2026-11-27T16:44:48Z (the orchestrator's receipt time, relayed; recorded in `.kiro/issues/2026-09-26-native-component-distribution.md` § "Peter's answer (2026-11-27)", PR #868)

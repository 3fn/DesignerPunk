# Design Outline: 132 — Native Components in the App

**Date**: 2026-11-27 (replaces the 2026-11-07 placeholder from #723, whose text is at `a953ac70d`)
**Spec**: 132-native-components-in-app
**Author**: Thurgood (spec formalization), briefed by the orchestrator
**Status**: **R1 DRAFT — the seeded outline (plan-r2 § 6 item 8), for its first review round.** Nothing here is decided except what is marked **RULED** with Peter's words. Every open question in § 5 has options and no pick. Nothing is built, scaffolded or created by this file.
**Read at**: `origin/main` `8553499b1`. Facts: `evidence/facts-at-8553499b1.md`, the unedited stdout of `spec-facts.sh 132 b89163c41 8553499b1` (the window starts at the plan of record's commit).
**Owners (by domain)**: Kenya (iOS: packaging, the D4 app, the render lane, the iOS minimum's evidence) and Data (Android: the same, the toolchain range, the API-26 floor test); Lina (component content, the public-API pass, the contract tests, the access-level and contract-validation ballots, the `rendering:` record); Ada (`generate`, which owns our module's manifest; deprecated aliases; the two P1 token-emitter records in § 4); Leonardo (the fixture app's content, the adopter journey, the walkthrough, the code samples); Sparky (web, for the one web question in § 5.3); Thurgood (formalization, the D6 checker, the measured-cost record's form); Stacy (the claims passes, the LENS read at the tasks round, the CLOSEOUT read).
**Round cost (estimate, for the orchestrator to surface before scaling)**: **about 10–16 sessions and 2–3 of Peter's sittings**, low confidence. The breakdown is § 8.
**Pointer-shaped on purpose**: facts that go stale (error counts, entry counts, sizes, what has shipped) are cited from their records or labelled with the SHA they were read at. They are not copied as current.

**Labels** (as in plan-r2): **VERIFIED (who)**: the named seat ran or read it. **REASONING**: inference. **UNVERIFIED**: nobody has checked it.

---

## 0. The outline in one screen (for Peter)

- **Your goal, in your words** (§ 1): adopters use DesignerPunk's native components as a package dependency, build more with DesignerPunk, and "the components are functional, and will successfully render, in the app as described."
- **Where we are at `8553499b1`**: Spec 129 closed. The generated token files compile on iOS and Android, and our component source compiles against them except for pinned errors (49 iOS, 93 Android, VERIFIED Thurgood by counting `harness/expected/*.tsv`). No app is built, nothing is linked, no component is rendered and no native contract is tested. "Do not start a native product" is still printed.
- **What this spec does**: takes the components from "compiles in our checks" to "builds, links, renders and behaves as described in an adopter's own app", one family at a time. The first family is the Chip family plus Icon-Base plus one adopter-built component.
- **What this round asks of you** (§ 5.1): the definition of done for 132 (D4–D10), four plan decisions (8–11), the iOS minimum again, and when the support claim ships. Each has options and no pick. Two probes run during this round (§ 6) so the iOS minimum and the render tools are decided on measured facts. Kenya's local iOS spike has run (the tools work on iOS 26.0; iOS 17 was not run). Data's Android probe waits on its grant, #878, which activates when you merge it.
- **What must be fixed first** (§ 4): two P1 defects in the token emitters (#870, #873). Until they are fixed, an adopter-built component's own tokens can break the native build silently.
- **What this PR's merge does** (§ 7): it carries out your 2026-11-27 answer, "Spec with (a)": the distribution charter, the goal's home since 2026-11-05, closes into this spec.

---

## 1. Goal and acceptance (carried word for word)

**The goal, in Peter's words** (received 2026-11-05T03:09:41Z, orchestrator relay; verbatim record `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/peter-2026-11-05.md`; the typo is kept as received and is read "will successfully render", meaning unchanged):
- "I envisioned adopters building tokens and components within the DesignerPunk ecosystem, and leveraging them in their project."
- "Re: 2, I was envisioning (a)". Option (a) is components as a **package dependency**: our source is compiled inside the adopter's own build, from `node_modules`, and updated by `npm update`. A binary package is ruled out under Model B (plan-r2 § 1, "What 'dependency' means here").
- "they can use our existing ones and use DesignerPunk to build more as they require."
- "That the components are functional, and will successful render, in the app as described."

**132's acceptance sentence** (**RULED**, "B (a)", received 2026-11-05T04:07:43Z; moved word for word from Spec 129; Stacy's conditions 1 and 2, plan-r2 § 6 item 8): "A stranger's `init` → `generate` yields a compiling, themed target on all three platforms with nothing copied from `node_modules`."

**The definition of done** is plan-r2 § 1 "The definition of done", rows D1–D10, at `b89163c41`, with the D1 probe sentence replaced as the native-plan `README.md` records (Peter, received 2026-11-05T05:14:42Z). It is cited, not copied, so there is one table to keep true.
- **D1–D3 are Spec 129's part of done** (**RULED**, "C yes"). 129 delivered them at its close (CLOSEOUT pass, § "For the reader"). D3 is "129 builds it; 132 brings it to zero": the pinned component entries are 132's to remove.
- **D4–D10 are decided at this outline's gate** (native-plan `README.md`, the deferred-decisions table). § 5.1 puts them to Peter. A seat that changes a D row later needs his approval (Stacy, condition 2).

**What "as described" means and does not mean** (plan-r2 § 1): each component's Stemma contracts pass as tests on that platform, each test shown to fail on a known-bad case. It does **not** mean system controls look the same on iOS 17 and iOS 26: a component that follows platform convention gets the system's look, and one that departs is drawn by us and checked by D5 (ballot `2026-10-18-true-native-development-is-not-true-native-design`).

**What stays a reading, not a check** (plan-r2 § 1, Stacy): whether a test covers everything its contract says (fit, sampled at CLOSEOUT), and spoken screen-reader output unless a human hears it.

---

## 2. Scope: where 129 stops and 132 starts

**The line** (plan-r2 § 2, Ada PLAN R1): "129 owns what `generate` emits and what the package ships; 132 owns what is written into, or runs in, an adopter's app." 132's write scope includes the generator paths, with Ada as one of its owners.

**In 132** (plan-r2 § 2, work packages 3 remainder, 4, 5 and 6):

| Work | What it means here | Owners |
|---|---|---|
| **D3 to zero** | The pinned component entries 129 left, tagged to `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` (45 iOS and 89 Android at `8553499b1`), plus 4 per platform tagged to the blend record. Each family's unit removes its own | Lina; Kenya and Data verify |
| **Public API and packaging** (WP4) | The access-level rule (a ballot, § 4); iOS: the 20 views an app cannot construct (the goal record's "Access-pass list"); Android narrows helpers and previews; `generate` owns our module's manifest (root `Package.swift`, the Android module folder); deprecated-alias emission before the claim | Lina (API); Kenya, Data (shapes); Ada (`generate`, aliases) |
| **The app** (D4) | An adopter-layout app on each platform, built from a packed install, with plain `import` only, the anti-copy check, a non-`DP` abbreviation and one adopter theme (plan-r2 § 1, "D4 details") | Kenya, Data; Leonardo (content) |
| **Render and behaviour** (D5–D7) | The `rendering:` field; the per-platform contract validation format (a ballot); render lanes; contract tests with known-bad cases; the D6 checker; readiness derived at publish | Lina (tests); Kenya, Data (lanes); Thurgood (checker); Leonardo; Stacy |
| **True samples and safe upgrades** (D8, D9) | Native code samples compiled in the D4 app; the D4 app upgraded from the previous release; a public-API diff per release | Leonardo; Kenya, Data; Ada |
| **Build more** (D10, WP6) | An adopter component, in the adopter's own module, with its own `defineComponentTokens` file, that reads our tokens, composes one of ours and passes D3–D6; one deliberate same-name case; the scaffold verb and native test preset last | Lina, Kenya, Data, Ada (CLI), Leonardo (journey) |

**How 132 is cut** (plan-r2 § 2, "How 132 is cut"): one vertical slice, then one unit per family.
- **The slice (first family)**: Chip-Base, Chip-Filter and Chip-Input, plus Icon-Base, plus one adopter-authored component (D10), plus that family's code samples (D8), through compile at zero, public API, the app, render and contract tests, on both platforms. "The tasks round still picks." The adopter component is picked by the team at the tasks round against D10's criteria, not by Peter.
- **What the first family carries today** (VERIFIED, Thurgood, by `grep -c` over `harness/expected/*.tsv` at `8553499b1`): Chip-Base, Chip-Filter and Chip-Input have no pinned entry on either platform; Icon-Base has 2 on Android and none on iOS. Icon-Base is one of the 17 `internal` iOS views. So most of the slice's cost is the app, render and contract work, not repair. REASONING: that makes the slice a fair measure of the per-family cost of D4–D7, and a poor measure of the repair cost, which is concentrated in families the slice does not touch (Input-*, Nav-*, Container-*). The measured-cost record (§ 3) should say so.
- **Then one unit per family**, each family's readiness moving as it lands. **WP6's scaffold comes last.**

**Not in 132**: what `generate` emits for a stranger in general (129, closed); the React and React Native platforms (128, which inherits the app lanes, the comparator, the D6 checker and the binding model, plan-r2 § 3); served readiness for adopter components and `implements:` (128's lane 3, plan-r2 § 2 WP6).

**Web, a scope question** (§ 5.3): the acceptance sentence names "all three platforms", and Spec 129 carried one web item to this outline: "a check that web component source resolves against a consumer's generated CSS" (Spec 129 `requirements.md` § "Out of scope, with the reason", Sparky's). Whether 132 takes it is open.

---

## 3. Order, and the measured-cost record that 132's tasks must declare

**The order** (**RULED**, "Let's go (x′)", received 2026-11-05T04:06:22Z; "A yes, B (a), C yes; (x′) as defined", 04:07:43Z): 129 → **132's first family** → Peter re-places the remaining families against 131, using that family's measured cost → 131 → 128 → 130 (the colour track after 130).

**The measured-cost record**:
- **Path**: `.kiro/specs/132-native-components-in-app/completion/first-family-measured-cost.md`. It is fixed by two records that already name it: Spec 131's park line (`.kiro/specs/131-governance-simplification/design-outline.md`, the 2026-11-05 outcome line: "park — re-ask: `path:.kiro/specs/132-*/completion/first-family-measured-cost.md`") and the priorities record's 2026-11-05 walk line, which carries the obligation that "Spec 132's tasks round declares the record".
- **132's tasks round SHALL declare it** as a Primary Artifact of the parent that closes the first family, in the first-family unit's PR. **Creating it fires 131's park re-ask**, so nothing writes that path before the first family is complete.
- **What it should contain** (a proposal for the tasks round; Stacy reads whether it is verifiable, Thurgood owns the form):
  - sessions spent, by seat and by work package, read from the first family's completion docs and their delegated-tier lines;
  - Peter's sittings;
  - CI minutes by runner class (macOS minutes are the scarce ones);
  - contracts tested, labelled and excluded, with known-bad cases, per platform;
  - defects found and where they were routed;
  - a per-family extrapolation for the remaining families, with its method stated and the slice's bias (§ 2, "What the first family carries today") named;
  - a column for 131, so the re-placement compares like with like.
- **132's size against 131's** (plan-r2 § 6 item 8 asks the outline to state it): 132's sized items are about **50–95 sessions**, low confidence, with several items unsized (plan-r2 § 8). **131's outline carries no session estimate** at `8553499b1` (VERIFIED, Thurgood, by grep for size, cost and estimate in 131's outline). So no honest comparison exists yet; producing one is the measured-cost record's job, and the 131 column above is how it does it.

---

## 4. Preconditions, and records 132 receives

### 4.1 Two P1 defects that must be fixed before an adopter component's tokens can be trusted

- **#870** — `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` (Ada, P1, on PR #870 at `5eba5bb`, not yet on `main`). A component token in the colour, fontWeight, fontFamily, duration, easing or scale family makes `generate` emit Swift or Kotlin that is wrong or does not compile, and `generate` says nothing. One bad token fails the whole `ComponentTokens` module, and every DesignerPunk component in the consumer's target fails with it.
  - **Why it is 132's precondition** (Kenya's point): D10's adopter component carries its own `defineComponentTokens` file, and WP6 teaches adopters to write more. Both reach this defect on **both** platforms. Until it is fixed, D10 may only use the families that compile (spacing, sizing, radius, fontSize, borderWidth, tapArea, opacity, lineHeight, density, letterSpacing, blend, breakpoint), and the adopter journey must not teach the others.
  - **Its colour fork is Peter's, in that record** (refuse, staged; or allow mode-aware as a new spec). This outline does not re-ask it. Its option (ii) names 132 only as a possible home ("UNVERIFIED whether Peter would rather fold it into 132's component-authoring story"); § 5.3 lists that as a question for Peter only if (ii) is picked.
- **#873** — `.kiro/issues/2026-11-27-product-token-swift-emitter-colour-types.md` (Ada, P1, on PR #873 at `8710232`, not yet on `main`). The two static product-colour forms that Product-Token-Governance teaches do not compile on iOS.
  - **Why it bears on 132**: #870's fork (i) sends component authors to product tokens, so (i) is only as good as #873's fix (Ada's counter in #870). D4's adopter theme and D10 must not rely on a static product colour on iOS until #873 is fixed. Android is untyped and looks right but was not compiled (Ada; Data not yet consulted).
- **The guard both records name** (a fixture with one token per family in the harness consumer, `scripts/harness/consumer.ts`, Ada's) is the class fix that makes D10's same-family use safe. Its route (spec row or issue-row grant) is in #870's Fix shape item 3.

### 4.2 Records that name 132 (Process-Spec-Planning § "Before Formalizing", run at `8553499b1`)

E2's grep for `132` / `132-native-components-in-app`, plus the records added by hand: those named in inbounds or open PRs, and one glob token the grep misses (`132-*`). The **disposition is a proposal**; each owner writes it, and the lines are written in the requirements feedback round's Context for Reviewers, as Step 0 requires. *(B2, ballot `2026-11-27-rule-11-lapse-window-b2` on #862, is a DRAFT, not ratified. Its site 6 would make the hand-add rule explicit; the current text already says "A record the outline cites but the grep misses is added by hand", which is what this list does.)*

| Record | Owner | Trigger at `8553499b1` (or PR head) | Proposed disposition |
|---|---|---|---|
| `.kiro/issues/2026-09-26-native-component-distribution.md` | Kenya, Data (Lina, Ada) | on `main`: `path:…/129…/completion/claims-pass.md` (fired at `693b39b54`); on #868 at `1e81dfeb8`: `release:next:phase-1`, which its owners re-token to `merge:#880` (this PR) | **intake, closing in this PR**: Peter's "Spec with (a)" (§ 7). Its § "iOS obligations filed here under rule 10" (on #868) passes three iOS obligations to this outline: the iOS minimum (P-6), the iOS 17 runtime probe (§ 6) and the wording rule (§ 4.3) |
| `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` | Lina | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: its native items (A3, I1–I3, A1, A2, A4, A6's non-ripple parts) go to D5 and D6 (Spec 129 Req 8.4) |
| `.kiro/issues/2026-11-07-native-component-repair-from-first-harness-run.md` | Lina (Kenya, Data verify) | `path:.kiro/specs/132-native-components-in-app/completion/claims-pass.md` | intake: D3 to zero, per family |
| `.kiro/issues/2026-11-06-theme-family-persisted-form-for-132-d5.md` | Kenya, Data | `path:.kiro/specs/132-*/design.md` | intake: decided with runtime switching at D5, in 132's design round |
| `.kiro/issues/2026-11-12-readiness-tables-generate-or-guard.md` | Lina (Thurgood consulted) | `path:.kiro/specs/132-native-components-in-app/requirements.md` | intake: generate the readiness tables, or guard them; decided in requirements. Not named by the placeholder (facts row 4) |
| `.kiro/issues/2026-09-29-instruments-parser-and-resolver.md` | Thurgood | includes `path:.kiro/specs/132-*/tasks.md` (hand-added: the grep's pattern misses the glob) | leave: fires at 132's first tasks round, which is planned under M4 |
| `.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` | Thurgood | `manual` | leave. Its 2026-11-05 line "Spec 132's directory does not exist yet" is stale since #723; a dated pointer is owed by its steward (me), outside this PR |
| `.kiro/issues/2026-11-05-hand-written-readiness-claims-disagree-with-generated-readiness.md` | Lina | `release:16.4.0:phase-1` | leave: fix-now; its class question moved to the readiness-tables record above |
| `.kiro/issues/2026-11-08-generate-component-token-warning-spacing-sizing-only.md` | Ada | `release:16.4.0:phase-1` | leave. Peter's re-answer on row 7 is pending (#864), and "(spec): Spec 132" is one of its options. **This outline takes nothing from it**; naming it here carries out no spec answer, because none has been given |
| `.kiro/issues/2026-10-26-release-16-1-standards-implications.md` | Thurgood | `path:…/131…/requirements.md` | leave: names 132 only for the order |
| `.kiro/issues/2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md` | Stacy | `release:next:phase-1` | leave: names 132 only for the order |
| `.kiro/issues/2026-11-27-ios-component-token-type-map-breaks-six-families.md` (#870, hand-added) | Ada | `release:next:phase-1` | leave: fixed by its own PR; 132 cites it as a precondition (§ 4.1) |
| `.kiro/issues/2026-11-27-product-token-swift-emitter-colour-types.md` (#873, hand-added) | Ada | `release:next:phase-1` | leave: as above |
| `.kiro/issues/2026-11-27-native-access-level-ballot-owed.md` (#877, hand-added) | Lina | `path:.kiro/specs/132-*/requirements.md` | intake: the ballot lands before 132's packaging unit |
| `.kiro/issues/2026-11-27-per-platform-contract-validation-ballot-owed.md` (#877, hand-added) | Lina | `path:.kiro/specs/132-*/requirements.md` | intake: ratified before D6's static half is built |
| `.kiro/issues/2026-11-27-rendering-field-record.md` (#877, hand-added) | Lina (Leonardo consulted) | `path:.kiro/specs/132-*/requirements.md` | intake: the shape fork is this round's (§ 5.2); the field lands before 132's render lanes |
| `.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md` (#878, hand-added) | Data | `path:.github/workflows/android-render-probe.yml` | leave: the probe's grant (rule 8); it closes at its fixing PR, with the probe's result (§ 6) |

**Five records fire when 132's `requirements.md` is first committed** (the drawn-control and readiness-tables records on `main`, and #877's three once it merges); **one fires at `design.md`** (theme family); **one at `tasks.md`** (instruments parser); **one at `completion/claims-pass.md`** (component repair); and 131's park re-asks at `completion/first-family-measured-cost.md`. A record whose obligation is met earlier is re-ruled by its owner before its event.

**Citations that this rewrite moves**: #877's three records cite "`.kiro/specs/132-native-components-in-app/design-outline.md` L7" and "L33" in their Source lines. Those lines were the placeholder's (owners, and the `rendering:` prerequisite row); at this file's merge they say something else. The text they cite is at `a953ac70d`. A dated pointer in each Source line is Lina's, if she wants one; it changes no Trigger.

### 4.3 Obligations that live only in inbounds (carried here so they are read)

- **Kenya** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-kenya-design-2026-11-05.md` § 5):
  - **The iOS minimum is asked again at this outline, before any native support claim** (**RULED** as a re-ask, Peter's "4 (a)", received 2026-11-05T13:05:54Z; Spec 129 `design.md` § 0). Option (c), raising the minimum to 18, is a live candidate. § 5.1 puts it to Peter.
  - **The iOS 17 runtime probe**: measure the size and time of an iOS 17 simulator runtime, and whether the current Xcode runs it. Her inbound names a local probe (about one hour) or a one-off CI run on `macos-15`; "both need your go". Her local spike ran on 2026-11-27 without it (§ 6), so the iOS 17 part is still owed (P-10).
  - **The wording rule until something runs on iOS 17**: "built for iOS 17.0, not run on 17"; from D5, what ran, for example "built for iOS 17.0; renders on iOS 26.x; not run on 17 or 18" (Spec 129 `design.md` § 0).
  - Swift 6 language mode for the components, set in the root manifest, belongs to 132's packaging (her inbound § 1, L67).
- **Data** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-data-design-2026-11-05.md` §§ 3, 5 and 6; ballot `2026-11-05-core-goals-android-minimum` F-1 (iii)):
  - **The Android toolchain range numbers** (AGP, Kotlin, Compose) come from D4's builds at the bottom and top of the range, then go to Peter for approval. Two CI builds of the fixture app on a free ubuntu runner; "its CI change needs your go when 132's tasks ask".
  - **The API-26 floor test lives in 132's own module**: a Kotlin compile checks no API level, so the floor is lint `NewApi` as an error plus an emulator run at API 26, both 132's.
  - **A forgotten theme provider is silent until a runtime test**, which is D5's.
- **Lina** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-lina-design-2026-11-05.md` § 7): the three shapes in § 7.1–7.3 (access level, per-platform contract validation, `rendering:`), now held by #877's records.
- **Ada** (`.kiro/specs/129-consumer-generation-completeness/inbound-from-ada-design-2026-11-05.md` D-4, D-5 and P-1): Q12, Q13 and the native type table are provisional until 132's D4 app builds (Spec 129 `design.md` § 4); `generate` fails on a `.kt` file in the consumer's tree that declares our package, and D10's same-name case proves it; deprecated-alias emission and D9's public-API diff land before the claim (Peter's "7 (a)").

---

## 5. Open questions

### 5.1 For Peter (deferred to this gate; no pick here)

Each comes from plan-r2 § 7 or a later ruling record, and the team's recommendation there is quoted as the plan's, not re-decided. The round's reviewers may change a recommendation; Peter decides after the round, in one batch.

| # | Question | Options (plan-r2's, unless noted) | The plan's recommendation (not a pick) | Evidence still owed |
|---|---|---|---|---|
| **P-1** | **D4–D10 as 132's definition of done** (plan-r2 § 7 item 1, its 132 half) | approve as written; ask for less (for example, no D8 or D9: cheaper, but samples and upgrades can break unseen); ask for more (for example, a person sees each app: adds your time, and a gate the team did not recommend) | approve as written | D5's tools and D4's linked app are UNVERIFIED on both platforms; the probes (§ 6) inform it |
| **P-2** | **Plan decision 8**: when adopters are first told to start a native product | all 34 at the D5/D6 tier (one clean announcement, late); per family, with the CHANGELOG naming the ready ones (value from the first slice; a list adopters must read) | per family (Lina; Leonardo) | none |
| **P-3** | **Plan decision 9**: device reads, who and whether part of done | (a) a named human does one read per component per platform at the first support release, as dated evidence, not a gate; (b) no human read, speech labelled "not device-read". An agent's simulator read is never a device read | semantics tests and audits inside done, speech outside; (a) at the first support claim. Who the human is, is yours | none |
| **P-4** | **Plan decision 10**: who may exclude a contract or remove a platform from it | keep each one yourself (slow); approve a closed list of reason classes once (the team excludes within it, the checker counts each); leave it to the team (lets D6 be diluted) | the closed list; a web-worded contract gets native wording, not an exclusion | the list's content comes with the contract-validation ballot (#877) |
| **P-5** | **Plan decision 11**: do adopter-built components meet the same bar | same bar, available (our scaffold and checks hold them to D3–D6 when they run them); same bar, required for anything we serve as conformant (128's lane 3); a lower bar ("builds") | same bar, available; D10 proves the path | none |
| **P-6** | **The iOS minimum, asked again** ("4 (a)") | keep 17.0, compile-proven, with runtime evidence labelled by the version it ran on; keep 17.0 and pay for an iOS 17 runtime run at releases; raise the minimum to 18 (`macos-15`'s 18.5 simulator gives free evidence near the floor; drops iOS 17 devices) | Kenya's lean in 129: keep 17.0, then re-ask here "with the probe below measured" | **The iOS 17 runtime part of Kenya's probe** (§ 6), which her spike did not run: it needs P-10. The question is not put until that is recorded, or until Peter says "not now" to P-10 (then it is put on the evidence there is) |
| **P-7** | **Which release carries the support claim** | the seats' joint position is that 17.0.0 marks it (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-09-peter-rulings-release-16-3-0.md`, the orchestrator's note: "Peter did not rule it"); or a minor, under "7 (a)", which lets pre-claim native changes ship in minors but does not say where the claim itself ships | none ruled | composes with P-2: under "per family", the first claim is the first family's |
| **P-8** | **A billed larger runner**, only if Data's probe finds no usable KVM on `ubuntu-24.04` (plan decision 6's conditional) | a billed larger runner for the emulator lane; Robolectric only, as a lower, labelled evidence kind; another runner class | the plan: billed only if the probe shows no KVM | **Data's probe** (§ 6). Not asked unless it fails |
| **P-9** | **The Android toolchain range numbers** (AGP, Kotlin, Compose) | the numbers D4's bottom and top builds pass | the team proposes them after D4 builds, and you approve them together (Spec 129 `design.md` § 0) | D4's builds; **asked at the tasks round or later, not now**. Listed so it is not lost |
| **P-10** | **The goes for this round's probes** (§ 6) | **Android**: merge Data's grant record, #878 (it activates at the merge). **iOS 17 runtime**: a local download on this Mac (`xcodebuild -downloadPlatform`, several gigabytes, size UNVERIFIED; whether Xcode 27.2 runs an iOS 17 runtime at all is UNVERIFIED), or a one-off CI run on an older image (a second issue-row grant), or "not now" | Kenya's 129 inbound recommended the CI form, because it measures the runner a lane would use | none: this is the first sitting's ask |

**Not re-asked here** (already ruled, carried): the two-spec structure ("A yes"); 129's narrowed sentence and this spec's acceptance ("B (a)"); D1–D3 ("C yes"); order (x′); the Android minimum, API 26 ("Re: 5, 26"; Core Goals amended by ballot `2026-11-05-core-goals-android-minimum`); native changes before the claim ship in minors, with deprecated aliases and D9's diff landing before the claim ("7 (a)"); required-check promotion by measured stability (129 `tasks.md` § "Decision 6"); the consumer overlays flip at the support claim, which Peter merges as a cost, not a ruling (plan-r2 § 7's closing list).

### 5.2 For the team (decided in the round, or at the gate named)

| # | Question | Owner | Closes at |
|---|---|---|---|
| T-1 | **The `rendering:` shape**: one look field, or one field plus Leonardo's optional `platformParts:`; and whether Input-Text-Base on iOS is drawn chrome around a system field (Spec 129 `design.md` § 16, "Spec 132's outline"; `.kiro/specs/129-consumer-generation-completeness/feedback/design.md` L777, L829). No component schema has the field at `8553499b1` (VERIFIED, Thurgood: 0 of 34 `*.schema.yaml` match `rendering:`) | Lina, Leonardo | **this outline round** (the record's event is 132's requirements) |
| T-2 | **The first family and the adopter component**: confirm Chip-Base, Chip-Filter, Chip-Input and Icon-Base, or pick another; name the adopter component against D10's criteria | Lina, Leonardo; Kenya, Data | tasks round |
| T-3 | **Tool choices**: hand-written `.xcodeproj` or a pinned XcodeGen; ViewInspector (test-only, pinned, for state and layout contracts only); the emulator and Robolectric split; `swiftc` or `xcodebuild` for the app lanes | Kenya, Data | design round, after the probes |
| T-4 | **Where adopter components and their tokens live**: plan-r2 § 3's resolution (adopter source in its own module; generated token groups in our module, same group name replaces ours and is reported; the Kotlin package-name refusal, which D10's same-name case proves) for the seats to confirm | Ada, Kenya, Data, Leonardo, Lina | design round |
| T-5 | **The theme family's persisted form, with runtime theme switching** | Kenya, Data | design round (its record fires at `design.md`) |
| T-6 | **D6's known-bad run cadence**: every PR, or unit PRs and CLOSEOUT | Thurgood, Lina; Stacy reads | tasks round |
| T-7 | **D7's source**: readiness derived at publish from the check results at the release commit touches the release script, which is ratified law under the hermetic-publish-path ballot, so its census is owed | Lina, the release script's owner, Thurgood | design round |
| T-8 | **The readiness tables**: generate them from `packageReadiness.generated.ts`, or guard them against it | Lina; Thurgood consulted | requirements round (its record's event) |
| T-9 | **The access-level and contract-validation ballots**: drafted and put to Peter record-first, in time for the packaging unit and the D6 static half | Lina (Kenya, Data, Thurgood, Stacy as each record names) | before the units that need them (#877's records) |
| T-10 | **D9's tools**: the Swift API digester and the Kotlin binary-compatibility validator (UNVERIFIED) | Kenya, Data; Leonardo | design round |
| T-11 | **The "Native status" passage** at this PR's merge (§ 7, item 4) | Kenya, Data; Thurgood derives INSTALL | this PR, or a sibling merged with it |
| T-12 | **Fixed font sizes and Dynamic Type**: `performAccessibilityAudit` flags `.font(.system(size:))`, and the shipped iOS components hold 26 such lines in 14 files with no `relativeTo:`, `@ScaledMetric` or `dynamicTypeSize` (Kenya's spike, finding 4, VERIFIED by grep at `8553499b1`). So D5's blanket audit and its largest-Dynamic-Type variant will flag them. Fix them (scaled type through the tokens), or exclude the audit type with a reason. An exclusion is a P-4 case | Ada (type tokens), Lina (components), Leonardo (product view); Kenya | design round; it sizes D5's iOS repair |
| T-13 | **How a "hidden from VoiceOver" contract is checked on iOS**: XCUITest finds a `.accessibilityHidden(true)` view that carries an identifier, in either modifier order, on iOS 26.0 (Kenya's spike, finding 1, VERIFIED; it corrects `kenya-plan-r2.md` L13). So plan-r2's D5 detail "absent where `accessibility_decorative` applies" cannot be an `exists` check. Candidates: the audit, an in-app `isAccessibilityElement` read, the fixture-only wrapper, or a labelled device read. Android's semantics tests are the twin question | Kenya, Lina; Data for Android; Stacy reads | design round |

### 5.3 Scope questions the round should answer before requirements

- **S-1, web** (Sparky; Leonardo): does 132 carry "a check that web component source resolves against a consumer's generated CSS"? The acceptance sentence says "all three platforms", and the item was carried here from Spec 129. If 132 does not carry it, the outline should say where it goes, because no other spec names it. If carrying it would change what web adopters are promised, it goes to Peter.
- **S-2, mode-aware component colour** (Ada; Lina): only if Peter picks #870's option (ii), should the new spec it describes be folded into 132's build-more story? Not asked otherwise.

---

## 6. Probes owed during this round

Both probes are owed before the iOS minimum (P-6) and the render tools (T-3) are decided, so before § 5.1 goes to Peter. They are the goal record's obligation (1) ("record the render-probe result … so Spec 132's outline opens on measured render-tool numbers"). The record's re-ruled Trigger on #868 says obligation (1) "is not a condition of the close", so the probes do not hold the record's close; they hold the decision sitting. Neither is a spec task and neither is a gate on anything else (plan-r2 § 2, "Probes").

| Probe | What it measures | Who | How it is authorized | State at this draft | Where the result is recorded |
|---|---|---|---|---|---|
| **Data's Android render probe, in CI** | On `ubuntu-24.04`: whether `/dev/kvm` is usable; how long a system image takes to download and boot; one instrumented smoke test; one Robolectric Compose test | Data | **an issue-row grant for `.github/**`** (`.kiro/issues/README.md` rule 8; a tasks row never grants a `.github/**` path): `.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md` on #878 at `0ea9eda`, which activates when Peter merges it; its activation read is Stacy's | **not run**; the grant is filed | the grant record's fixing PR (its Trigger is the workflow file), with a pointer in the goal record |
| **Kenya's local iOS spike** | An XCUITest fixture in a committed `.xcodeproj` with `performAccessibilityAudit`; the element-screenshot ink check; one iOS 17 simulator runtime download (size, time, and whether the current Xcode runs it) | Kenya | none for the local tools; Peter's go for the iOS 17 runtime (P-10) | **ran 2026-11-27, except the iOS 17 runtime** | `.kiro/specs/132-native-components-in-app/evidence/2026-11-27-ios-render-spike/README.md`, on draft PR #879 at `cabf37ada`, with a pointer in the goal record |

**What Kenya's spike found** (her README; VERIFIED by her on this Mac, Xcode 27.2, iOS 26.0 simulator, deployment target 17.0; not on a CI runner; no DesignerPunk component rendered, because they do not yet compile at zero in an adopter's module):
- **XCUITest works for D5's per-component checks**: elements found by identifier, frames non-zero, tap-then-read works for interaction contracts. 9 tests, 0 failures, about 48 s of test time.
- **XCUITest finds hidden views.** A `.accessibilityHidden(true)` view with an identifier is found in either modifier order. That contradicts `kenya-plan-r2.md` L13, so an `exists` check cannot prove a view is hidden from VoiceOver (T-13).
- **The ink check discriminates**: across base and wcag, light and dark, including UIKit-backed `TextField` and `Toggle`, with a `Color.clear` known-bad reading exactly 0. Its threshold and floor are tuned on one fixture, and a light text field reads near the floor, so the lane picks the floor per element class.
- **`performAccessibilityAudit` caught 3 of 3 planted defects** (hit area, missing description, contrast) and reported 0 on clean screens in both schemes.
- **A D5 cost**: the audit flags fixed `.system(size:)` fonts, and the shipped iOS components have 26 such lines in 14 files (T-12).
- **Not run**: the iOS 17 runtime (P-10); CI; VoiceOver speech, the largest Dynamic Type size and reduce motion.

**What the probes cannot settle** (REASONING): a local spike is a report the claims pass cannot re-run; it informs P-6 and T-3, and the CI lanes in 132's units are what count toward done. Xcode's MCP bridge (plan-r2 § 1 instruments table) is a candidate tool for the spike and never an oracle.

---

## 7. What this PR's merge carries out

**Peter, received 2026-11-27T16:44:48Z** (the orchestrator's receipt time, relayed; recorded in `.kiro/issues/2026-09-26-native-component-distribution.md` § "Peter's answer (2026-11-27)", on PR #868 at `1e81dfeb8`), verbatim: "Spec with (a), and start 132's outline round now". He was answering the record's escalation: (a) is "the merge of Spec 132's **seeded** outline carries out the answer".

So **this PR is the carrying event** (`.kiro/issues/README.md` rule 11: a spec answer is carried out when the spec's design outline merges and names the record). This file names the record (§ 4.2, row 1) and no longer carries the placeholder's Status string, which the record reads as its close event. **Merge preconditions** (for the orchestrator and the owners; none is this file's to do):
1. **#868 merges first**, so Peter's answer is on `main` before the act it authorizes. Its owners re-token the record's Trigger to `merge:#880` (this PR), as the Trigger on #868 says they will.
2. **The probes are recorded before § 5.1 goes to Peter** (§ 6). They do not hold the record's close (its Trigger on #868: obligation (1) "is not a condition of the close").
3. **The record's close is in this PR.** Once its token is `merge:#880`, this merge fires it, and under rule 11 it lapses at this merge unless an ancestor of the merge commit closes it, which in practice means this PR's own diff. The close is its owners' act (Kenya and Data, rule 5: a dated outcome line, then the archive move), committed on this branch. Kenya's § "iOS obligations filed here under rule 10" asks the close to check that this outline names her three iOS obligations; it does (§ 4.2, row 1).
4. **The "Native status" passage**: no limitation marker in the guide or INSTALL names the goal record at `8553499b1` (VERIFIED, Thurgood: `git grep -c 'limitation:'` finds none in `governance/DesignerPunk-Integration-Guide.md` or `docs/consumer/INSTALL.md`). So the archive move will **not** force the passage to change, although plan-r2 § 6 item 8 expected it to. The passage names "Spec 132" and stays true at this merge; whether it should point at this spec's directory or the archived record instead is T-11, Kenya's and Data's.
5. **This PR is draft** until the round folds and Peter answers § 5.1.

**What does not change at this merge**: no requirement, design or task exists; the consumer overlays still say "Native onboarding is not supported on this release" (they flip at the support claim); "Do not start a native product" stays printed until the first family ships.

---

## 8. Round cost (estimate)

Sessions are seat-sessions. **Confidence: low.** It assumes one review round and one cross-read round (both are this project's practice), and that the probes work the first time.

| Item | Seats | Sessions |
|---|---|---|
| This draft | Thurgood | 1 |
| R1 entries, self-written | Kenya 1, Data 1, Lina 1, Ada 0.5–1, Leonardo 0.5–1, Stacy 0.5–1, Sparky 0.25 (S-1 only) | 4.75–6.25 |
| Data's probe: grant record (filed, #878), workflow, dispatched run, result | Data; Stacy's activation read | 1–1.75 |
| Kenya's spike: `.xcodeproj` fixture, audit, ink check (**spent**, #879); the iOS 17 runtime if P-10 says go | Kenya | 1 spent, plus 0.5–1 |
| R2 cross-read | the six seats above, Sparky only if S-1 is contested | 1.5–3 |
| Incorporation, and the decision brief for § 5.1 | Thurgood | 1–2 |
| The goal record's close and the passage (§ 7) | Kenya, Data | 0.25–0.5 |
| **Total** | | **about 10–16** (about 2 already spent: this draft and Kenya's spike) |

**Peter's sittings: 2–3.**
1. **The probe goes** (P-10): the merge of Data's grant record (#878), and the iOS 17 runtime (a local download, a second grant, or "not now"). These can ride the orchestrator's next batch.
2. **The decision sitting** after R2: P-1 to P-7, and P-8 only if Data's probe finds no KVM. P-6 waits for the iOS 17 part of P-10. This is the large one: about seven questions, batched.
3. **The merges**: #868, then this PR. A merge, not a ruling; it can share sitting 2.

**What would push it up**: a probe that fails (a billed runner question, or a second spike); a seat contesting plan-r2 § 3's module resolution (T-4); S-1 turning into a scope change that goes to Peter.

---

## 9. Fold-back, and what survives

- **Counter-argument**: this outline is seeded before the probes have run, so its D5 tools and P-6 rest on unmeasured runtimes, which is the gate inversion plan-r2 warned about ("criteria written before the numbers get diluted when the numbers arrive", Stacy).
- **What it changed**: the probes run inside this round and are recorded before § 5.1 goes to Peter (§ 6); Kenya's spike has already changed two things (T-12, T-13); P-6 is not put until Kenya's numbers are in; P-8 is conditional on Data's; D5's tool rows stay labelled UNVERIFIED; no requirement is written before the round folds.
- **What survives**:
  - Peter is asked about D4–D10 with the linked app unbuilt on both platforms. A D row may need changing after the first family, and that change is his again.
  - The first family is a cheap family to repair, so the measured-cost record may under-state the remaining families' repair cost (§ 2). Naming the bias in the record is the mitigation, not a fix.
  - Every seat is one model family. Seat agreement in R1 is low-independence evidence; the probes and the D4 builds are what carry weight.
  - Under (x′), 132 stays open across 131's process-law change, which this project has not done before (plan-r2 § 10).

---

**Spec outcome (2026-11-27, Thurgood)**: open — "Spec with (a), and start 132's outline round now" — Peter, received 2026-11-27T16:44:48Z (the orchestrator's receipt time, relayed; recorded in `.kiro/issues/2026-09-26-native-component-distribution.md` § "Peter's answer (2026-11-27)", PR #868)

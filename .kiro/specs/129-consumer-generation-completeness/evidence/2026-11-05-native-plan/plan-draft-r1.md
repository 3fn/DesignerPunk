# Native support: the path, and the plan for Peter's approval — DRAFT R1 (Thurgood)

**Status**: **DRAFT for the seats' review. Not a ruling, not a record.** Nothing here is applied. Every position is mine unless it names a seat. Peter's words are the only text with his authority, and they are quoted, not paraphrased.
**Read at**: `origin/main` `5c48f3ccb` (2026-11-04), plus the fourteen Q5 round entries in this directory and Peter's 2026-11-05 words (`peter-2026-11-05.md`).
**Labels**: **VERIFIED (who)** = run or read by the named seat, or by me in the tree at that commit; **REASONING** = inference; **UNVERIFIED** = nobody has checked it. A size in sessions is the named seat's estimate; **unsized** means no seat gave one.
**Consulted**: none yet. This draft is the input to the seats' round. Each seat's measurements are cited by entry, not re-run.

---

## 0. The plan in one screen (for Peter)

- **Goal (yours)**: adopters use DesignerPunk's existing iOS and Android components as a package dependency, and use DesignerPunk to build more as they need them. The bar: "the components are functional, and will successfully render, in the app as described."
- **Where we are**: none of it works yet. The generated native token files do not compile (iOS about 207 errors, Android about 300), and the native components do not compile either (iOS about 200 errors; Android at least 423, a floor because token errors hide more). Nothing in CI builds Swift or Kotlin. The good news from this round: **the dependency shape you chose works mechanically on both platforms without copying files** (Kenya on iOS, Data on Android, measured in scratch).
- **The path**: six work packages in order — fix the generator, build the compile check, repair the components, make them a usable package, prove they render and behave in an app, and give adopters the same tools for their own components.
- **The recommended structure**: **two specs under one goal.** Spec 129 keeps its current job (the generator and the compile check, which every seat converged on). A second spec, provisionally **132**, carries the rest of your goal (repair, package, render proof, adopter path). It opens on a git-visible event — the compile check's first committed run — so it is written on measured numbers and can never wait silently.
- **What you approve** (§ 5): the definition of done; 129's acceptance sentence narrowed to its stage; where 132 sits in your order; the Android minimum version; the macOS runner and any new required checks; and the native components becoming a supported API.
- **Everything else is the team's**: tools, harness design, work assignment and wording.

---

## 1. Goal and definition of done

### Plain language

"Done" has to be something a machine can confirm, not something an agent says. So each part of your sentence becomes a CI check or a committed file. "In the app" means a real app project built the way an adopter would build it, from a packed install. "Renders" means it runs on a simulator or emulator. "As described" means each component's written behavioural contracts pass as tests on that platform. Anything a test cannot decide (what VoiceOver actually says aloud) is labelled as a person's device read, never counted as proven.

### The goal, in Peter's words

- First answer (2026-11-05): "I envisioned adopters building tokens and components within the DesignerPunk ecosystem, and leveraging them in their project."
- Form: "Re: 2, I was envisioning (a)" — components as a package dependency, not adopter-owned copies.
- Scope: "they can use our existing ones and use DesignerPunk to build more as they require."
- Bar: "That the components are functional, and will successful render, in the app as described." *(Typo corrected in reading only: "will successfully render"; meaning unchanged.)*

"Dependency" here means **source compiled in the adopter's own build, from `node_modules`, updated by `npm update`**. A binary `.xcframework` or AAR is already ruled out under Model B, because it would bake DesignerPunk's token values into the binary (`.kiro/issues/2026-09-26-native-component-distribution.md` § "What NOT to do"; VERIFIED, me).

### What "as described" maps to

The Stemma behavioural contracts. Each component's `contracts.yaml` lists contracts with `platforms`, `validation` ("testable criteria for verifying the contract") and `test_approach` (`contract-system-reference` § "Contract Fields").
- VERIFIED (me, `origin/main`): 34 components carry `contracts.yaml`; **214 contracts list `[web, ios, android]`**, 19 are web-only. All 34 have native source on both platforms.
- VERIFIED (me): only **2 of 34** components have native tests (`Button-VerticalList-Item`, `Button-VerticalList-Set`: one `*Tests.swift` and one `*Test.kt` each; Kenya counts 87 iOS test functions).
- So "as described" is 214 contract checks per platform, of which almost none has a native test today.

### The definition of done (each row is a check or a file, not a reading)

| # | Done means | Oracle | Status |
|---|---|---|---|
| D1 | The generated token files compile, per platform | CI contexts `harness-ios-tokens`, `harness-android-tokens`, required, with **zero** entries in their expected-failure lists (committed files under `harness/`) | **build** (129). Design converged in Q5 (Kenya R3, Data R3, Thurgood R4) |
| D2 | DesignerPunk's component source compiles against an adopter's generated tokens | `harness-ios-components`, `harness-android-components`, required, zero entries | **build** (129 builds it; the list reaches zero in 132) |
| D3 | An adopter's own app project builds with the components as a dependency, nothing copied | New contexts `native-adopter-ios` / `native-adopter-android`: packed install → `init` (writes the manifest) → `generate` → build a fixture app that imports the package and constructs all 34 components. The same job fails if any file under the adopter tree, outside `node_modules`, is byte-identical to a packaged component source file | **build** (132). Shape VERIFIED in scratch to the compiler stage (Kenya R3: root `Package.swift`, `xcodebuild` reached the compiler in 6.2 s; Data R3: adopter Gradle module, 13 s). A linked app target consuming it is **UNVERIFIED** on both |
| D4 | Every component renders in that app | New contexts `native-render-ios` / `native-render-android`: UI tests in the D3 fixture app on a simulator or emulator. Each component appears on screen with a non-zero frame and an accessibility element, with no crash | **build** (132). Tools **UNVERIFIED** (below) |
| D5 | Every native contract is either tested, labelled, or excluded | A coverage check (Jest, in `lane-functional-root`) reads every `contracts.yaml` and fails on any ios/android contract that names, per platform, neither a passing test id, nor an evidence kind `device-read: <record>`, nor an `excludes:` entry with its reason. It prints the counts per platform | **build** (132). The checker is mine to build (an instrument); the tests are Lina's and the platform seats' to write |
| D6 | What a test cannot decide is labelled, not claimed | Readiness carries **tier and evidence kind** ("builds", "renders and contract-tested", "device-read"), derived from which D-contexts are green. This is the two-part badge in 128's inbound § 3 item 10, and 129's Q10 option (c) | **build**. Q10 is in 129's requirements round; the derivation lands in 132 |

At goal-done, D1–D5 are required checks on `main`, every expected-failure list is empty, and the D5 counts show no unmapped contract. Stacy's CLOSEOUT pass can read all of that from git and run URLs without asking an author (`.kiro/specs/131-governance-simplification/design-outline.md` § 5, "derivation over attestation").

### Instruments: what exists, what is built, what is unverified

| Instrument | State |
|---|---|
| Pack → `init` → `generate` on ubuntu | **exists** inside `tests/consumer-integration.test.ts`, run by `consumer-guard.yml` (Ada R2, VERIFIED). Must be lifted into a standalone `scripts/` driver (Ada, about 1 session) |
| `swiftc -wmo -c` two-module compile (tokens + components in one module, plain-import probe) | **built here**; VERIFIED in scratch (Kenya R2: 407 distinct diagnostics, stable across three runs, Kenya R3) |
| Gradle library module, one compile for both tiers, plus probe module | **built here**; VERIFIED in scratch (Data R3) |
| Two-sided expected-failure comparator, keyed file + normalised diagnostic + count + record tag | **built here** (Thurgood R4, keyed per Lina R3 / Stacy R3) |
| Standard macOS runner `macos-26` (Xcode 26.0.1, iPhone 17 simulators on iOS 26.2/26.4/26.5) | **exists**, free on a public repo (Kenya R2, VERIFIED from GitHub's docs and the image readme) |
| iOS 17 runtime on that image | **absent** (Kenya R2, VERIFIED). Downloading one per run, or another image, is **UNVERIFIED** in cost |
| Android SDK on ubuntu images | **exists** (Data R2, VERIFIED). Pin `ubuntu-24.04`; `ubuntu-latest` moves to 26.04 this month |
| Android emulator on GitHub's standard ubuntu runners (hardware acceleration) for this repo | **UNVERIFIED** |
| Robolectric + Compose UI tests on the JVM (no emulator) | **UNVERIFIED** (Data R2, REASONING only); blocked until components compile |
| iOS UI tests (XCUITest) in a fixture app on the simulator | XCTest on a simulator VERIFIED for a toy package (Kenya R2, 8.5–13 s); a fixture app with UI tests is **UNVERIFIED** |
| Snapshot images as regression goldens | **UNVERIFIED** tool choice. A golden is a regression oracle only: the first image is agent-approved, so it can never be the correctness oracle. Correctness is D4/D5 |
| Screen-reader speech (VoiceOver, TalkBack) | **no automated oracle**. Semantics (labels, traits, roles) are testable; speech is a device read (129 outline § 4) |

---

## 2. The work packages, in order

### Plain language

There are six pieces. The first two are already Spec 129's job and every seat agreed on them. The compile check comes first because it measures how big the repair really is — today's error counts are partly hidden behind other errors. The other four follow from what it finds.

| WP | What | Owners | Size | Depends on | Moves |
|---|---|---|---|---|---|
| **1. Generator completeness** | 129's charter items (i)–(vi) and outline § 3 rows 1–22, including **item (ii): DesignerPunk's component tokens reach the adopter's output** (a precondition of D2 and D3; Ada R2 § 2d, Data R3, Kenya R3), Q12 (theme names) and Q13 (static colour access) ruled with the package shape in view (Leonardo R3 condition 4), native colour values (Ada R3's lean: Display P3, no runtime dependency) | Ada (pipeline), Lina (component tier) | **unsized** as a whole; rows sized in 129's tasks round | — | D1, D2 |
| **2. Compile harness** | B's reach as Q5 converged: four compile contexts, one generate job, two-sided pinned list, non-`DP` adopter-shaped consumer read **in place** from a packed install, promoted to required on measured stability | Kenya (iOS), Data (Android), Ada (driver), Thurgood (comparator, wiring) | **about 3–4 sessions** (Lina R2 sum; Kenya about 1, Data about 1, Ada about 1, comparator about 0.5–1) | none to start (measuring lane); a tasks-row grant for `harness/**`, the workflow and `scripts/` | D1, D2 (the instrument) |
| **3. Component repair** | Clear every component compile error. Already 129 rows: theme reads (item (i), row 15), item 3 and Button-CTA (row 12), row 16, `rememberRipple` (row 14 A5/A7). The rest — `TokenMapping.kt`'s `PaddingValue` family, the nested comment in `VisualStateStyles.kt`, cross-file privates, conflicting declarations, opt-ins, the `CompositionLocalProvider` import, and whatever row 6's fix unmasks — becomes **one new Lina record filed from the harness's first committed run** (Lina R3) | Lina | **unsized**. iOS about 200 errors in 32 files (Kenya R2; may be a floor, Lina R3's open question); Android at least 423 in 30 of 39 files, a floor (Data R2, Lina R3) | WP2's first run (to measure); WP1 rows 4 and 6 (to unmask) | D2 to zero |
| **4. Public API and packaging** | 17 `internal` iOS component views and row 9's token members made `public` (Kenya R2; row 9 is a 129 row); an access-level rule for native components (a ballot, Lina R3); `init` writes the iOS root `Package.swift` and the Android Gradle module include (Kenya R3, Data R3); move `Icon-Base/platforms/android/res/drawable/README.md` out of the resource directory (Data R3, one line); Android `minSdk` set (§ 5) | Kenya (iOS shape), Data (Android shape), Lina (component API), Ada (`init` writes, with Lina) | **iOS about 1–1.5 sessions, Android about 1** for packaging on top of B (Kenya R3, Data R3), excluding the public-API pass and item (ii) (**unsized**). The 2026-09-26 distribution charter, written before these measurements, sized iOS "spec-scale, medium-large" and Android "medium, days to about a week" | WP1 item (ii) and Q12; WP3 far enough that the fixture app compiles | D3 |
| **5. Render and behaviour verification** | The fixture app's UI-test lanes; the contract-to-test coverage check (D5); the readiness derivation (D6); device-read records for speech | Kenya, Data (lanes and native tests), Lina (contract tests), Thurgood (coverage checker), Stacy (reads at CLOSEOUT) | **unsized**. 214 contracts × 2 platforms, 2 of 34 components tested today | WP4 (an app to run) | D4, D5, D6 |
| **6. The adopter's path to build more** | The `init`-written manifest also names the adopter's own native component directory, so their components compile in the same module against the same tokens and theme; a scaffold for a new native component (source, `contracts.yaml`, test stubs); the D2–D5 instruments runnable in the adopter's repo (a CLI verb or a scaffolded workflow), so their components meet the same bar. Served-catalog support for adopter components (the indexer reading their roots; `implements:` rather than shadowing ours, Lina's 128 R1 read) is platform-agnostic and is **128's lane 3**, not this | Lina (component), Kenya/Data (native), Ada (CLI), Leonardo (adopter journey) | **unsized** | WP5 (the instruments to hand over) | the "build more" half of the goal |

**Dependency chain**: WP2 starts first and runs in parallel with WP1 → WP1's rows land and shrink the pinned list, unmasking WP3's real size → WP3 brings D2 to zero → WP4 makes D3 build → WP5 makes D4–D6 pass → WP6 hands the same instruments to adopters. Lina's one-line component fixes do not wait for any spec; she lands them under her record as the harness shows them (Lina R3).

**Same-PR coupling** stays as 129's outline § 4 states it. One addition: once D3 exists, a generator change that alters an emitted type carries the fixture-app fix too.

---

## 3. Spec structure

### Plain language

You asked whether this is one big spec or several. I looked at four shapes. One big spec stalls the compile check behind design work nobody can do yet. Four or more small specs mean four outline rounds and a queue of specs waiting their turn — the exact pattern the 24-waiting-specs ballot just cleaned up. **Two specs, split where the evidence changes** — the compile check's first real run — is the cheapest shape that keeps the compile check first and writes the second spec on measured numbers.

### Option A: one holistic spec (129 grows to the whole goal)

- **Cost**: a charter scope amendment (component distribution is not one of items (i)–(vi); Leonardo R2); one requirements round covering 23 record rows plus WP3–WP6; one design round that must design render verification whose tools are **UNVERIFIED** today.
- **How it fails**: under the sequential gates (Peter, 2026-10-24: "I'm not waiving the sequential gates"), 129's tasks.md cannot merge until WP3–WP6 are designed. The harness's own Trigger is 129's `tasks.md` (`.kiro/issues/2026-09-17-platform-build-verification-harness-candidate.md`), so **the compile check waits on the render design** — inverting the evidence order every seat argued for, and leaving 16.2.0's "whose first task is a build check that actually compiles the output" (CHANGELOG L44, L118) unkept for longer. The spec becomes the one that never closes: a single CLOSEOUT for the largest scope in the repo, with WP3's size unknown when its requirements are written.
- **Composes**: 131, 128 and 130 all wait for the whole of it. 131 starts on "Spec 129 progress" (131 outline Status), so it can start, but 128 (after 131) waits for all six packages.

### Option B: several coordinated specs, one per work package (four or more)

- **Cost**: four or more outline → requirements → design → tasks cycles, each with rounds (spec-authoring cost model); a handoff record between each pair.
- **How it fails**: each spec's acceptance is narrower than the goal, so each can close "done" while the goal is unmet (packaging closes as "builds", render as a separate later spec). Specs created ahead of their turn sit as waiting specs: the ratified waiting-spec row would re-ask each one from figure 2 (ballot `2026-11-04-waiting-spec-row` § 2, Addition A), which is the right alarm but more of Peter's attention. The last spec in a chain is the likeliest never to open.
- **Composes**: well with 128 in principle (each piece is reusable), badly with Peter's order, because three or four new specs need placing.

### Option C: 129 with declared merge units carrying all six stages

- **Cost**: the same charter amendment and the same single requirements/design/tasks cycle as A; the merge units make each stage reviewable and mergeable on its own (Task-Completion-Protocol § "Coherent Units").
- **How it fails**: the units do not fix A's gate problem. Units are declared in `tasks.md`, so the whole of `tasks.md` — every unit, the render one included — is planned before the first unit executes. Either the harness waits on that planning (A's failure), or the later units are written blind and amended after the harness runs, which is a second spec without its own outline gate.
- **Composes**: as A.

### Option B2 (recommended): two specs under one goal, split at the harness's first run, each with declared units

- **Spec 129** keeps the Q5 convergence: WP1 and WP2, plus WP4's generator-side preconditions (item (ii) is already chartered; Q12 and Q13 are ruled with the package shape in view). Its component rows (12, 14 A5/A7, 15, 16) close in 129; every other component error is pinned and tagged to Lina's new record (Data's fork (ii), Lina R3, Leonardo R3). Its units stay what its tasks round declares, with the harness first.
- **Spec 132** (provisional number) carries WP3's remainder, WP4, WP5 and WP6, and **its acceptance is Peter's sentence**, read through § 1's D1–D6. Proposed units: repair to zero → public API and packaging → adopter fixture app (D3) → render and contract lanes (D4–D6) → adopter path (WP6) → CLOSEOUT.
- **No new record type.** Until 132's outline exists, the goal and its definition of done live in the existing distribution charter, `.kiro/issues/2026-09-26-native-component-distribution.md`. Its own evaluation step 4 already says "If chartered work proceeds, it is a new spec", and its owners are the right set (Kenya and Data for the shape, Lina for component content, Ada for the generator). Kenya and Data re-rule it: Peter's words appended, the definition of done added, and the Trigger set to a git-visible token — `path:` on the harness's first committed expected-failure list under `harness/`. 132's outline opens at that event and is seeded from that list, the charter, and 129's design-round rulings on Q12 and Q13.
- **Why split there**: it is where the evidence changes. Today's component counts are floors (Lina R3: row 6's missing import hides every `Dp` defect; iOS may be masked the same way by the 99 `Color.oklch` calls). The first committed run is the first honest measure of WP3, so 132's requirements are written on it, not on guesses.
- **Composes with 131**: 131's rehearsal native leg is "the platform's host target plus one screen" (131 outline § 8). That is 132's D3 fixture app, so under B2 the native leg's home is 132, not 129. 131's web and package legs do not wait, and its per-platform freeze (§ 4 (d)) lifts on native only at 132's green. 131's outline already expects native rows to stay unchanged through 131 in one case (§ 8), so this changes no 131 decision; it moves a pointer.
- **Composes with 128**: a React Native app is an Xcode project and a Gradle project, so its device evidence needs the same app-build and simulator/emulator lanes (128 inbound 2026-10-21 § 3 item 10). 132 builds them first on the plainer native case. As long as 132 lands before 128's device evidence, 128 inherits them (§ 6). 128's lane 7 ("Distribution: package split, native distribution") already names native distribution, so 132 delivers that lane's native half. One seam is open: if 128 splits `@3fn/core` into platform packages, the `init`-written manifests change path. Because `init` writes them, that is a generator change, not adopter work (REASONING; Ada and Leonardo to check).
- **Composes with 130**: 130 comes last in the order, so it inherits the compile, render and contract lanes. If it is pulled forward just in time, 129's compile lanes are there at least.

### Fold-back on B2

- **The counter-argument**: Peter named one goal. Splitting it means 129 closes with "do not start a native product" still printed, and 132 adds a whole outline → tasks cycle before its repair and packaging start. Option C would let the stages flow without another outline gate.
- **What it changed**:
  1. Repair does not wait for 132. Lina's mechanical fixes land under her record as the harness shows them, so WP3 is under way during 129.
  2. 132's outline is seeded, not blank (the charter, the measured list, the Q12/Q13 rulings), so its round is about decisions, not discovery.
  3. 132 cannot wait silently: its trigger is a `path:` token (README rule 11's lapse check sees it), and once its outline exists the waiting-spec row re-asks it from figure 2.
  4. The shipped pointers move to the goal's record, which forwards to 132 once it exists, so the split never makes shipped text false (§ 4).
- **What survives**:
  - Wall time and Peter's attention: one extra gate cycle (outline, requirements, design, tasks) against option C. The goal is done only at 132's CLOSEOUT, two closeouts away.
  - Where 132 sits in the order is not the team's to pick (§ 5 item 3). If it goes after 131, the native goal also waits for 131's cycle.
- **The fork it exposes, for the seats to argue in their round**: **B2 or C.** C's case is fewer gates and one spec to track; B2's is the harness first and the second spec written on measured numbers. I recommend B2 because of the gate inversion in C. A seat who believes 129's tasks round can declare the later units honestly without the first run's numbers should argue C.

---

## 4. What changes now, so nothing shipped stays false

### Plain language

Three shipped places say "native onboarding is a planned follow-up (Spec 129)". Under the recommended split, 129 delivers the compile check, not onboarding, so those pointers become false the day the plan is approved. They should point at the goal's record instead of a spec number, so the next split cannot break them again. Past release notes stay as written; the next release says exactly what its check proves.

| Surface | What becomes false, and when | Proposed change | Owner | When |
|---|---|---|---|---|
| `docs/consumer/INSTALL.md` L159 (iOS) and L171 (Android): "… onboarding is a planned follow-up (Spec 129)" | Under B2, at Peter's approval of the plan. Under A or C it stays true | "… is planned; tracked at `.kiro/issues/2026-09-26-native-component-distribution.md`" (the record forwards to 132). INSTALL is derived: the edit is made in the install region of `governance/DesignerPunk-Integration-Guide.md`, then `npx tsx scripts/derive-install-doc.ts`; `scripts/__tests__/install-doc.test.ts` asserts the two match | Kenya (iOS sentence), Data (Android sentence) draft; Thurgood runs the derivation (my script; Ada consulted); Peter merges (governance path; edit kind CORRECTION) | **The PR that records Peter's approval**, before 16.3.0's S |
| `governance/DesignerPunk-Integration-Guide.md` L394, the "Walkthrough: Build for iOS or Android" stub: "… a planned follow-up (Spec 129), and this walkthrough is written when that lands" | Same | Re-point the same way. The walkthrough itself is written in 132's WP4/WP5 units, from the D3 fixture app, so it is run, not drafted | Leonardo (adopter voice; the guide's walkthroughs, CHANGELOG L80) with Kenya and Data; Peter merges | Same PR |
| INSTALL L171: "the generated Kotlin calls `Oklch(…).toComposeColor()`, which needs the colormath library" | When Ada's native-colour emission lands (129) | Rewritten in that PR (129's same-PR coupling) | Ada, with Data | That 129 PR |
| CHANGELOG L44 and L118 (16.2.0): "Spec 129, whose first task is a build check that actually compiles the output" | Stays true under B2 and C, **as long as the harness is 129's first unit** | No edit. Shipped release entries are history, not law to rewrite | — | — |
| The next CHANGELOG entry that carries the harness | When it ships | Bound to the instrument. While lists are non-empty: "the token files and component source compile for iOS 17 and Android except for N pinned errors, listed at `<path>`; no app is linked and no tests are run" (Kenya R2 fold; Data R2; Leonardo R3). Never "compiles" while entries remain (Stacy R3 condition 4) | Thurgood (release author); Stacy reads it at RELEASE | That release |
| 129's design outline: § 4's "iOS tokens built as their own module", and "#641 … is still OPEN" | Already stale: Kenya R3 replaced the topology; #641 merged (`8fcf69b45`) | Updated in the outline's Q5 incorporation | Thurgood (formalizer) | The next outline revision |

---

## 5. What Peter approves

Only what changes his order, his words, Core Goals, a runner class, the required gate, or a consumer-facing promise. Everything else is the team's.

1. **The definition of done (§ 1) as the reading of his sentence.** Two parts need his eye:
   - **(a) The iOS runtime.** Run UI tests on the iOS 26.x simulators the runner has, with apps built for an iOS 17.0 deployment target (the compile rejects newer APIs, Kenya R2), **or** also on an iOS 17 runtime (cost **UNVERIFIED**).
   - **(b) Screen-reader speech.** Inside "done" (a platform seat's device read per component, recorded), **or** a labelled evidence kind outside it, with semantics tests inside it.
2. **129's acceptance sentence is narrowed to its stage, and his sentence becomes 132's.** The charter's "a compiling, themed target on all three platforms with nothing copied from `node_modules`" (`.kiro/issues/2026-10-02-consumer-generation-completeness-spec.md` § "Acceptance") changes its words. Proposed wording, for the seats to correct: *"A stranger's `init` → `generate` yields compiling, themed token output on all three platforms with nothing copied from `node_modules`, and DesignerPunk's native component source compiles against it in CI, with every remaining error pinned and recorded."* (Applies under B2 only. Under A or C his sentence stays and the charter's scope is amended instead, which is also his.)
3. **Where 132 sits in his order** (129 → 131 → 128 → 130, Peter 2026-10-24):
   - **(x)** 129 → 132 → 131 → 128 → 130. This keeps what "129" meant when he ruled — the spec the shipped text said would bring native onboarding.
   - **(y)** 129 → 131 → 132 → 128 → 130. This keeps his letter, and 131 may make 132's process cheaper.
   - Either way 132 lands before 128, so 128 inherits the app lanes. I lean (x), for the first reason. The pick is his.
4. **The Android minimum.** Core Goals says Android is "Not yet constrained". A shipped Gradle module sets `minSdk`, and the Compose pin sets a floor of 1.7 or later (Data R2: `rememberRipple` is an error from 1.7). Those become the adopter's minimums (Lina R2 § 2e). iOS stays 17.0+ unless he says otherwise.
5. **The runner class.** The standard `macos-26` runner joins the required gate when the first iOS context is promoted (free on a public repo, Kenya R2). If the Android emulator needs a larger, billed runner (**UNVERIFIED**), that is his too.
6. **Required checks.** Up to eight new contexts (four compile, two adopter-build, two render; `EXPECTED_CONTEXTS` 19 → 27 at most). Each promotion is his act, on the criterion the tasks round writes (measured stability, Thurgood R3/R4; Stacy R3 and Lina R3 agree).
7. **The native components become a supported API.** Once 132 ships, every public initialiser and theme protocol is a promise to adopters, and renaming one is a breaking change (Lina R2 § 2e). That fires Q7 for later native breaks (129 outline § 5.2), so 129's breaking changes (I-1, I-2, item (iii)) should ship in or before the release that first claims native support. If that moves 17.0.0 ("Breaking changes ship together there"), it is his.

**The team owns**: the structure recommendation (he approves the plan as a whole); tool choices (`swiftc` against `xcodebuild`, Robolectric against an emulator, the snapshot tool); the harness, comparator and pin-list design; the work assignment; and the shipped wording.

---

## 6. The class question: keeping 128 from rediscovering this gap

### Plain language

The gap was never Swift or Kotlin. A platform was listed as shipped with nothing that built it the way an adopter would. Once that was true, the release notes were the only check. The fix is a rule: **a platform's support level is worked out from checks that build and run it, not declared.** React and React Native get admitted under that rule, reusing the pieces this plan builds.

- **The class**: a platform key whose shipped claims run ahead of any instrument that builds and runs it in an adopter-shaped project. iOS and Android have carried "reference source" for four releases because nothing could say otherwise.
- **The class fix, for 128's registry** (128's lane 6, "Verification: harness, tiers, evidence rules"; Peter confirmed the seven lanes, inbound 2026-10-21 message 6): every platform key names its four instruments — (1) an adopter-fixture build from a packed install; (2) a compile verdict with a two-sided pinned list; (3) render and contract lanes with the D5 coverage check; (4) its evidence kind. Its readiness tier and badge are derived from which of those contexts are green. A key with no (1) and (2) cannot sit above `experimental`.
- **What this plan builds that 128 reuses**: the packed-install driver (taking a platform key as a parameter), the comparator, the coverage checker, the readiness derivation, and the macOS and ubuntu app-build and simulator/emulator lanes. A React Native fixture app is an Xcode project plus a Gradle project, so it plugs into the same lanes.
- **Two smaller lessons this round taught, carried with it**:
  - **Verify the package, not the repo.** The Icon-Base `README.md` that breaks Android's resource merge shows only when the package is read in place (Data R3). Every platform's harness reads a packed install.
  - **Shipped text points at a goal record, not a spec number**, so a split never makes it false (§ 4). "Spec 129" has been printed to adopters in at least four places.
- **Counter-argument**: generalising the kit before a second platform uses it is premature abstraction. **Fold-back**: build the native instances concretely and keep three things as parameters only — the platform key, the fixture app, and the pin file. 128 generalises when it has its second instance. **Residual**: 128 will still rework some of the kit, and the admission rule is 128's to write and Peter's to ratify (a Core Goals-level rule, identity inbound § 1 item 2).

---

## 7. Found while drafting (routed, not fixed)

- **To Kenya and Data — a lapsed trigger.** `.kiro/issues/2026-09-26-native-component-distribution.md`'s Trigger is `manual`, and it fires on "any evaluation of the harness charter". The harness charter's evaluation entry is dated 2026-10-20, and the distribution charter has no evaluation or re-rule after it (VERIFIED, me, at `5c48f3ccb`). Under README rule 11 that is a fired record with no close or re-rule. The re-rule proposed in § 3 B2 would discharge it.
- **To Lina and Kenya — a likely duplicate.** Kenya R2 found "no record that carries" the 17 `internal` iOS views, and Lina R3 offered to file one. The distribution charter already names "an access-control pass (only 19 of 39 production files currently declare `public` types)" (§ "The two shapes", iOS). An append there may be better than a new record; Lina's call.
- **To Kenya and Data — that charter's iOS premises are partly superseded.** It says an SPM library "cannot see the consumer app target's generated `DesignTokens`" and that SPM "resolves from a git URL or tag, not from npm". Kenya R3's root-manifest shape compiles the components and the adopter's tokens in one module from `node_modules`, which sidesteps both (the app target then needs the `public` API). The owners decide whether that changes the charter's text.

---

## 8. Questions for the seats

- [@KENYA] [@DATA] Do you take the distribution charter as the goal's home until 132 exists, with the re-rule in § 3 B2? Do your packaging sizes (iOS about 1–1.5, Android about 1) hold if D3 adds a fixture app that constructs all 34 components? -- [THURGOOD PLAN R1]
- [@KENYA] What is the cheapest honest way to run the D4 lane on an iOS 17 runtime (a runtime download, or an image that still carries one), and what does it cost? This is § 5 item 1 (a). -- [THURGOOD PLAN R1]
- [@DATA] Can the D4 lane run an emulator on the standard `ubuntu-24.04` runner, or is Robolectric the honest ceiling there? If the emulator needs a larger runner, § 5 item 5 goes to Peter. -- [THURGOOD PLAN R1]
- [@LINA] Is D5 (every native contract either tested, labelled `device-read`, or excluded) the right reading of "as described"? Who writes the 214 × 2 contract tests: you, the platform seats, or a split by contract category? Is WP6's split (native build path in 132; served catalog in 128 lane 3) right? -- [THURGOOD PLAN R1]
- [@ADA] Does the proposed 129 acceptance wording (§ 5 item 2) fit the charter's principle? Is item (ii) sizeable before the harness's first run? Is the package-split seam with 128 (§ 3 B2) a real rework risk? -- [THURGOOD PLAN R1]
- [@STACY] Can D1–D6 each be decided at CLOSEOUT without asking an author? Is the narrowed 129 sentence decidable? -- [THURGOOD PLAN R1]
- [@LEONARDO] Placement (x) or (y): which do you recommend, and why? Is the D3 fixture app the same "host target plus one screen" that 131 § 8 gives you to design? -- [THURGOOD PLAN R1]

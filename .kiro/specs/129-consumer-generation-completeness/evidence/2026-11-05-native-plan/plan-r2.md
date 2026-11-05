# Native support: the path, and the plan for Peter's approval — R2 (Thurgood)

**Status**: **DRAFT R2, folded from the seats' reviews. Not a ruling and not a record.** Nothing here is applied. Peter's words are the only text in it that carries his authority. Every other position is labelled with its seat, and unlabelled positions are mine.
**Read at**: `origin/main` `5c48f3ccb` (2026-11-04). Inputs:
- the 14 Q5 round entries;
- `plan-draft-r1.md`;
- six plan reviews: Kenya, Data, Lina, Ada, Leonardo and Stacy (`*-plan-r1.md`);
- five cross-answers: Kenya, Data, Lina, Ada and Leonardo (`*-plan-r2.md`);
- Peter's words of 2026-11-05 (`peter-2026-11-05.md`).

All of these are in this directory.

**Labels**:
- **VERIFIED (who)**: the named seat ran or read it.
- **REASONING**: inference.
- **UNVERIFIED**: nobody has checked it.

Most measurements are scratch runs on a seat's own machine, often on toy projects. None is a CI run.

**Consulted**: Kenya, Data, Lina, Ada, Leonardo and Stacy each wrote a full review, and five of them answered a cross-read. All six back the two-spec structure. This R2 folds in what they changed, not the vote.

---

## 0. The plan in one screen (for Peter)

- **Your goal**: adopters use DesignerPunk's existing iOS and Android components as a package dependency, and use DesignerPunk to build more. Your bar is: "the components are functional, and will successfully render, in the app as described."
- **Where we are**: none of it works yet.
  - The generated native token files do not compile.
  - The components do not compile either: iOS has about 200 errors; Android has at least 440, a floor because token errors hide more.
  - On iOS, 20 of the 39 main component views cannot be created from an app at all.
  - Nothing in CI builds Swift or Kotlin.
- **The good news**: the shape you chose works on both platforms without copying files. Kenya and Data built small adopter-style projects that compile our source from the installed package, with the adopter's own component in a module of its own.
- **The path** is six pieces of work, in order:
  1. fix the generator;
  2. build the compile check;
  3. repair the components;
  4. make them a usable package;
  5. prove they render and behave in an app;
  6. give adopters the same tools for their own components.
- **The structure, agreed by all six seats**: two specs under one goal.
  - **Spec 129** owns everything `generate` writes and everything the package ships.
  - **A new Spec 132** owns everything that happens in an adopter's own app.
  - 132 starts by taking **one component family** (the Chip family plus Icon-Base) all the way to "renders and works as described". It then widens one family at a time.
- **The order we recommend**: 129, then 132's first family, then you decide where the remaining families go against 131, using the measured cost of that first family. Then 128 and 130.
- **The honest size**: the parts we can size add up to roughly **50–95 sessions**, low confidence. About half of that is writing tests that prove each component behaves as its contract says. Several pieces are still unsized.
- **What you decide** (§ 5): eleven items. The biggest are:
  - the definition of done;
  - narrowing 129's acceptance sentence to its part;
  - the order;
  - the iOS and Android minimum versions;
  - when we first tell adopters they can start a native product.
- **Everything else is the team's.**

---

## 1. Goal and definition of done

### Plain language

"Done" must be something a machine confirms, not something an agent says. So every part of your sentence becomes a CI check or a committed file:
- **"In the app"** means a real, installable app built the way an adopter's would be, from the installed package.
- **"Renders"** means it runs on a simulator or emulator, under every theme, and draws what its tokens say.
- **"As described"** means each component's written behaviour contracts pass as tests on that platform. Every test is also shown to fail when the behaviour is broken.
- **What no machine can decide is labelled, not counted.** What a screen reader actually says aloud is the main example. It is a person's device read, and an agent's read never counts as one.

### The goal, in Peter's words

- "I envisioned adopters building tokens and components within the DesignerPunk ecosystem, and leveraging them in their project." (2026-11-05)
- "Re: 2, I was envisioning (a)": components as a package dependency.
- "they can use our existing ones and use DesignerPunk to build more as they require."
- "That the components are functional, and will successful render, in the app as described." *(Typo corrected in reading only, to "will successfully render". The meaning is unchanged.)*

**What "dependency" means here**: our source is compiled inside the adopter's own build, from `node_modules`, and updated by `npm update`. A binary package is ruled out under Model B (distribution charter § "What NOT to do").

**What "as described" maps to**: the Stemma contracts. These are each component's `contracts.yaml`, with their `validation` and `test_approach` fields (`contract-system-reference` § "Contract Fields").
- **288 effective native contracts per platform**, once children's inherited contracts are counted (VERIFIED, Lina, by script). 214 are each component's own.
- **57 of the 214 own contracts are written in web terms** (Tab key, hover, `aria-*`). Only 15 name a native mechanism (VERIFIED, Lina).
- **The contract format has no per-platform validation field.** So native wording comes before native tests (§ 2, WP5).
- **2 of 34 components have native tests today**: 87 iOS and 85 Android test functions (VERIFIED, Lina, Kenya).

**What "as described" does not mean**: that system controls look the same on iOS 17 and iOS 26. The ratified ballot `2026-10-18-true-native-development-is-not-true-native-design` already answers this (Leonardo PLAN R2):
- A component that **follows platform convention** gets the operating system's look. That is "as described" for it.
- A component that **departs** is drawn by us, and D5 checks what we draw against the tokens.
- **Prerequisite**: each component records its choice in a `rendering:` field per platform. No component has one today (VERIFIED, Leonardo). This lands before 132's render lanes (Lina; Leonardo PLAN R2).

### The definition of done

Each row is a CI context or a committed file. At goal-done:
- every row below is a required check on `main`;
- every expected-failure list is empty;
- the contract check shows no unmapped contract against its fixed baseline.

| # | Done means | Oracle | Lands in | State |
|---|---|---|---|---|
| **D1** | The generated token files compile, per platform | `harness-{ios,android}-tokens` contexts, zero entries in their expected-failure lists. The probe module that reads the tokens is **generated from the emitted members**, so every public member is read (Stacy). The consumer's abbreviation is not `DP`, stated in the pin file (Lina; Stacy) | 129 | build. Design converged in Q5 |
| **D2** | DesignerPunk's component tier reaches the adopter's output: **set equality** | A driver check: every component token in the merged index (`token-index/components.yaml`) appears in the adopter's generated output on each platform, and nothing extra does. It runs under the same precedence rule as item (ii) (Ada PLAN R1 § 3) | 129 | build |
| **D3** | Our component source compiles against the adopter's generated output | `harness-{ios,android}-components`, zero entries. The input is the **consumer's** generated `ComponentTokens`, where Android's floor is 440, not the repo's (Data) | 129 builds it; 132 brings it to zero | build |
| **D4** | An adopter's own app builds and links, with the components as a dependency | `native-adopter-{ios,android}` contexts. Packed install → `init` → `generate` → build in the **adopter layout**: `package.json` and our generated `Package.swift` at the root, an app `.xcodeproj` in `ios/`, and an `android/` Gradle build including our module (Leonardo; Kenya PLAN R2; Data PLAN R2). Details below this table | 132 | build. The two-module shape is VERIFIED on toys (Kenya PLAN R2: `BUILD SUCCEEDED`; Data PLAN R2: compiled). A **linked** app is UNVERIFIED on both platforms |
| **D5** | Every component renders in that app, under every theme, drawing what its tokens say | `native-render-{ios,android}`. Details below this table | 132 | build. Tools partly VERIFIED on toys (Kenya); emulator UNVERIFIED (Data) |
| **D6** | Every native contract is tested, labelled or excluded, and every test is shown to bite | Contract check, in two halves (§ 5's answers to Lina and Stacy). Details below this table | 132 | build |
| **D7** | Readiness tells adopters what is proven | Served readiness (the Application MCP's `readiness`) carries **tier and evidence kind**, named by tool and runtime: `builds`, `renders (iOS 26.x, target 17.0)`, `renders (emulator, API n)`, `renders (Robolectric)`, `contract-tested`, `semantics-tested`, `device-read (human)` (Kenya, Data, Leonardo). It is **derived at publish from the check results at the release commit**, never from a field an agent edits (Stacy; § 5 answer) | 132 (129's Q10 (c)) | build |
| **D8** | Our code samples are true | Every native code sample served to adopters, in the component READMEs and the guide's walkthrough, is extracted and compiled in the D4 app, or labelled "not compiled" (Leonardo; Stacy). This is the pattern of the existing governance-examples guard | 132 | build |
| **D9** | An upgrade does not silently break the adopter | (1) The 131 rehearsal's native leg is the D4 app, upgraded from the previous release (Leonardo; 131 § 4 (b)). (2) A public-API diff per release on our native module: a removed or renamed `public` symbol fails before an adopter meets it (Leonardo; Stacy) | 132 | build. Tools UNVERIFIED |
| **D10** | An adopter can build more | A fixture adopter component, created with the WP6 scaffold and with its own `defineComponentTokens` file, lives in the adopter's own module. It reads our tokens, composes one of ours, and passes D3–D6 in the D4 app. It includes one deliberate same-name case to prove the naming rule (§ 3 conflict) (Ada D7; Stacy; Leonardo D3 (d); Data PLAN R2) | 132 (in its first slice) | build |

**D4 details**:
- **A linked artifact exists**: an `.app` or an APK, not just a compile (Leonardo; Stacy).
- **Plain `import` only.** `@testable` hides `internal`, and with it the 20 views and row 9 (Kenya).
- **The component list comes from the committed catalog.** The fixture is generated from it, and the job fails on any component it did not construct (Stacy).
- **The anti-copy check**: the build's own list of compiled sources shows every DesignerPunk component file resolving under `node_modules/@3fn/core`. A byte check limited to `platforms/{ios,android}/**` and `src/blend/*` backs it up, because `init` copies token source on purpose (Stacy; Lina; Ada).
- **Theming**: a non-`DP` abbreviation, plus one adopter-registered custom theme provided at the app root (Leonardo).
- **iOS**: deployment target 17.0, in a committed `.xcodeproj` (Kenya).
- **Android**: lint `NewApi` runs as an error. `InputCheckboxLegal` L242 calls `java.time` with no guard (Data, VERIFIED). The app is built at the bottom and the top of the supported AGP, Kotlin and Compose range (Data).

**D5 details** (Kenya, Lina, Data, Leonardo):
- **Per component**: the element exists by its identifier, its frame is non-zero, its element screenshot shows ink against the background, and nothing crashes.
- **Accessibility follows the component's own contracts.** An element is required where a contract needs one, and absent where `accessibility_decorative` applies. Hidden components are found through a fixture-only wrapper.
- **Variants**: run under each emitted theme (light, dark, WCAG, the adopter's custom theme) and at the largest Dynamic Type.
- **Token check**: for components that depart from convention, sampled properties (colours, radius, tap size, font size) are compared against the generated token values. The same samples are compared iOS against Android.
- **No theme provider** (the `@Preview` case) renders with the chosen default, or fails with a stated message. Never a bare crash.
- **Tools**:
  - iOS: XCUITest in the app. Off-screen rendering is ruled out by measurement.
  - Android: an emulator smoke test per component. Robolectric alone is a lower, labelled evidence kind.
- **Runtimes**: per § 5 items 4 and 5.

**D6 details** (Lina, Stacy, Kenya, Data):
- **Denominator**: the 288 effective contracts per platform, fixed at a committed baseline. A child that re-implements its parent needs its own evidence.
- **Each test names the contract it covers**, and the checker reads both sides.
- **Each contract test has a known-bad case that must make it fail.**
- **Pass or fail is read from the native result files** (JUnit XML, `xcresult`) of the job that ran the test.
- **Denominator changes are printed, counted and need authority**: a platform removed from a contract, or an exclusion added. Wording edits are not counted.
- **A device read names a human reader, the device and the OS version.**
- **Blanket audits**: iOS `performAccessibilityAudit` and Android's Accessibility Test Framework.
- **Tool weight**: Robolectric counts for semantics, input and layout; drawing needs the emulator.

**What stays a reading, said plainly in the goal record** (Stacy):
- **Fit.** A test can pass, and even fail on its known-bad case, while not covering everything its contract says. Stacy's CLOSEOUT pass samples that fit and reports the fraction.
- **Spoken screen-reader output**, unless a human hears it.

### Instruments: what exists, what must be built, what is unverified

| Instrument | State |
|---|---|
| Pack → `init` → `generate` | **exists**, inside `tests/consumer-integration.test.ts`. It is lifted into a standalone `scripts/` driver (Ada, about 1 session) |
| iOS compile: `swiftc -wmo -c`, one module plus a probe | **built here**. VERIFIED in scratch, with stable diagnostics (Kenya) |
| Android compile: one Gradle library module plus a probe | **built here**. VERIFIED in scratch (Data) |
| Two-sided expected-failure comparator, with record tags | **built here**, by me (§ 5 answers) |
| Standard `macos-26` runner: Xcode 26.0.1, iOS 26.2/26.4/26.5 simulators | **exists**, and free on a public repo (Kenya) |
| **iOS 17 runtime on a free runner** | **not available.** The `macos-14` image was retired 2026-11-02. The oldest simulator is iOS 18.5, on `macos-15` (Kenya, READ). A per-run download is UNVERIFIED: size, time, and whether Xcode 26 runs an iOS 17 runtime |
| An app built from a `.swiftpm` with no Xcode project | VERIFIED: built, launched and rendered in about 12 s (Kenya). It is enough for D4, but has no UI-test target |
| XCUITest in a committed `.xcodeproj` | **UNVERIFIED** (Kenya). A hand-written project file or a pinned XcodeGen is a team tool choice |
| Off-screen `ImageRenderer`, `sizeThatFits`, a hostless window | **ruled out** for D5 by measurement: false passes and false fails (Kenya) |
| Android SDK on `ubuntu-24.04` | **exists**. Pin the label. The image carries **no emulator or system images** (Data, VERIFIED) |
| Android emulator on a standard ubuntu runner (KVM) | **UNVERIFIED.** Data's probe settles it (§ 6) |
| Robolectric + `createComposeRule` on the JVM | **UNVERIFIED** (not cached). A documented path (Data, REASONING) |
| ViewInspector, as a test-only iOS dependency | acceptable for state, content, validation and layout contracts only, pinned to an exact revision (Kenya). Team's call (Lina; Kenya) |
| Public-API diff (Swift API digester, Kotlin binary-compatibility validator) | **UNVERIFIED** (Leonardo, REASONING) |
| Xcode 26.3's MCP server (`xcrun mcpbridge`: build, docs search, project settings, Preview capture) | **UNVERIFIED** (orchestrator, from a web search, 2026-11-05). Not installed: this Mac has Xcode 26.0.1, and upgrading it is Peter's act. A **candidate tool** for Kenya's spike and for development, **never a "done" oracle**: it runs on a local machine, so it produces a report the claims pass cannot re-check, and a Preview is not an in-app render. Prior research: `.kiro/specs/056-xcode-mcp-integration/research.md` (2026-02-03), a directory with no outline |

---

## 2. The work packages, in order

### Plain language

There are six pieces. Spec 129 holds the first two plus the generator side of the fourth. The compile check comes first because today's error counts hide each other: the honest repair size appears only once two token fixes land. The render tools are tried on small test projects before Spec 132 is written. Then 132 proves one family end to end and widens from there.

| WP | What | Owners | Spec |
|---|---|---|---|
| **1. Generator completeness** | 129's items (i)–(vi) and outline rows 1–22. It includes the following (Ada PLAN R1, Lina PLAN R2): **item (ii)**: ship our 6 harvestable component token definition files (not 7: `Badge-Count-Notification/tokens.ts` is not pipeline input), harvested as a third source, with references emitted by name, so they bind to the adopter's primitives; **the precedence rule**: adopter wins by **emitted group name**, one rule for the component union, the index merge and the emission. The index merge changes from per token to per group. Two adopter files declaring one group stop `generate` with a message; Q12 and Q13 (marked provisional until 132's D4 builds); the Kotlin type table; native colour values (Display P3, no runtime dependency); row 9's `public`; the package's `files[]`; a `pack-assert` rule that native resource folders hold only resources (the Icon-Base `README.md` class); `dist/ComponentTokens.*` stops shipping under item (iii); web keeps the package CSS until a major (Lina) | Ada (pipeline), Lina (component tier) | 129 |
| **2. Compile harness** | B's reach, as Q5 converged: four compile contexts and one generate job. The two-sided list is keyed by file + normalised diagnostic + count + record tag. The consumer is read in place from a packed install. Tiers are promoted on measured stability | Kenya, Data, Ada (driver), Thurgood (comparator, wiring) | 129, first unit |
| **— Probes, before 132's outline** | **Kenya's iOS render spike**: an XCUITest fixture in a committed `.xcodeproj` with `performAccessibilityAudit`, the element-screenshot ink check, and one dispatched iOS 17 runtime download. **Data's Android render probe**: a dispatched job on `ubuntu-24.04` checking whether `/dev/kvm` is usable, how long a system image takes to download and boot, one instrumented smoke test and one Robolectric Compose test. Both are recorded in the distribution charter, not as spec tasks, and neither is a gate | Kenya, Data | between 129 and 132 |
| **3. Component repair** | 129 closes its own rows: theme reads (item (i), row 15), item 3 and Button-CTA (row 12, a cross-file `private` read, Lina), row 16, and `rememberRipple` (row 14 A5/A7). The rest goes to **one new Lina record, filed from the harness's first committed run**. It is **sized at the first run after rows 4 and 6 land**, when masked defects surface (Lina). A component PR in 129 also takes that file's cheap non-129 fixes (Lina) | Lina | 129 rows; the remainder in 132 |
| **4. Public API and packaging** | **Access-level rule**: drafted as a ballot during 129's design round, beside Q12 and Q13 (Lina). **iOS**: 20 views made constructible: 17 are `internal` and 3 are `public` with no public initialiser (`VerticalListButtonItem`, `NavSegmentedChoiceBase`, `NavTabBarBase`). Kenya named all 20 (VERIFIED). Of 182 top-level types, about 126 are `internal` (Lina). **Android** narrows instead: all 34 composables are already public, so helpers and previews become `internal`, and 19 cross-file `private` reads get fixed (Lina; Data). **`generate` owns our module's manifest**: the root `Package.swift` and the Android module folder, rewritten every run. It writes only when the file is absent or carries our header (Ada PLAN R2). The adopter's one reference to our module is a fixed path, so a 128 package split does not move it. The Android build script ships in the package and `init` adds two settings lines (Data, shape (a)). **Deprecated-alias emission before any support claim** (Ada) | Lina (API), Kenya, Data (shapes), Ada (`generate`, aliases) | 132 (the access ballot during 129) |
| **5. Render and behaviour** | The per-platform contract validation format (a ballot, § 5 answers). The D4 fixture app, with two screens: a catalog for D4, D5 and D8, and a product screen for 131's rehearsal and D9 (Leonardo). The `rendering:` field per component. D5–D7 lanes, D6 contract tests with known-bad cases. Robolectric tests can start once components compile, before WP4 (Data) | Lina (contract tests), Kenya, Data (lanes, fixture app, platform idiom), Thurgood (D6 checker), Leonardo (fixture content), Stacy (reads at CLOSEOUT) | 132 |
| **6. The adopter's path to build more** | **Already ships** (Lina, VERIFIED): `init` creates `src/components/`; adopter components join the served catalog through the component union; their component tokens are emitted. **Missing for native**: a scaffold verb, a native test preset, and their build path. Their source sits in their own module, which imports ours (§ 3 conflict). Served readiness for adopter components and `implements:` stay in **128's lane 3** | Lina, Kenya, Data, Ada (CLI), Leonardo (journey) | 132 |

**How 132 is cut** (Lina; Leonardo): one vertical slice, then one unit per family.
- **The slice**: the Chip family (Chip-Base, Chip-Filter, Chip-Input), plus Icon-Base, plus one adopter-authored component (D10), plus that family's code samples (D8). It goes through compile at zero, public API, the app, render and contract tests, on both platforms.
- **Why this family** (Lina PLAN R2): it exercises a re-implementing child (Chip-Filter), a toggle state and one of the 20 iOS views (Icon-Base), and it is cheap to repair. The tasks round still picks.
- **Then one unit per family.** Each family's readiness moves as it lands.
- **WP6's scaffold comes last.**

**The line between the specs** (Ada PLAN R1): 129 owns what `generate` emits and what the package ships; 132 owns what is written into, or runs in, an adopter's app. 132's write scope includes the generator paths, with Ada as one of its owners.

---

## 3. Spec structure

### Plain language

All six seats chose two specs. One big spec would make the compile check wait while we design render tests nobody can try yet. Many small specs would pile up waiting for their turn. The second spec is written after the compile check's first run and after the render tools are tried, so it is planned on measured facts. One design question was still open between the seats; it is settled below as a team call, not yours.

**Recommended: B2.** 129 and 132 sit under one goal record, split at the harness's first committed run. Each declares its own merge units, and 132 is cut as above. The draft's case is unchanged and the seats confirmed it:
- **Option A, one holistic spec, and option C, 129 with units**: 129's whole `tasks.md` would have to plan render work before the harness has measured anything. That is the gate inversion every seat named; Data and Kenya add that the emulator and XCUITest questions are themselves unmeasured.
- **Option B, four or more specs**: each one closes while the goal stays unmet.
- **Stacy's reasons, from the claims side**:
  - criteria written before the numbers get diluted when the numbers arrive;
  - B2 gives two closeout passes, and old runs stop being re-runnable as Xcode patch versions are replaced.

**What composes with what**:
- **131**: its rehearsal's native leg is 132's D4 app (one app, two screens; Leonardo). 131's native freeze lifts at 132's green.
- **128**: it inherits the app lanes, the comparator, the D6 checker (built with the platform key as a parameter, so story 3's adopter conformance reuses it), the themed-render check and the binding model. The manifest that `generate` owns closes the package-split seam (Ada PLAN R2).
- **130**: it inherits all of it.

### The design conflict between the seats: where adopter components and their tokens live

**The two positions**:
- **Leonardo and Kenya**: adopter components live in their own module and import ours. That is VERIFIED to compile on iOS (Kenya PLAN R2) and on Android (Data PLAN R2).
- **Ada**: all generated tokens, the adopter's included, go into our module, and the same group name means the adopter's replaces ours.

**Leonardo's objection**: `init` scaffolds `progress.ts`, so every adopter replaces our Progress tokens on day one without meaning to.

**Data's finding**: the generated Kotlin is always `package com.designerpunk.tokens`. Across two modules, a same-name declaration compiles with no warning, and the adopter reads theirs while our components read ours.

**My resolution, for the seats to confirm. These are three questions that had blended into one:**
1. **Where adopter component source lives: their own module.** All four seats now agree; Ada accepts it in her PLAN R2.
2. **Where generated token groups live: our module, and the same group name replaces ours, reported.**
   - Ada's reason holds. Our components read groups by name, and our module cannot import the adopter's.
   - Leonardo's day-one case is real but harmless in values. The scaffolded `progress.ts` is a byte-for-byte copy of ours (Ada, MEASURED), so day one "replaces" ours with identical values.
   - The harm comes later, when our package adds a Progress token our components read and the adopter's copy lacks it. The guards are:
     - `generate` prints each replacement;
     - `sync` reports missing component-token keys, as it does for primitives (Lina PLAN R2);
     - the first replacement report says "Progress: yours, copied at `init`", so nothing is silent.
3. **Hand-written same-name declarations in the adopter's module.**
   - On iOS, module qualification resolves them (Kenya).
   - On Kotlin, the shared package name makes them silent (Data). That is the live residual.
   - Fix options, for 129's design round under Q12's family: emit generated Kotlin into a package derived from the adopter's config, or have `generate` or a lint step refuse adopter source that declares inside our package.
   - D10's deliberate same-name case proves whichever fix is chosen.

**Whose call**: the team's. All three are design calls for 129's design round (item (ii)'s precedence, Q12 names) and 132's packaging unit (the module layout). Model B, "your tokens are yours", is already ruled. None of the three changes what adopters are promised, so none needs Peter.

### Fold-back, and what survives for the structure

- **Counter-argument**: one goal, two closeouts and an extra gate cycle. Splitting also splits an API decision: Q12, Q13 and the type table are decided in 129 and confirmed only by 132's app (Ada).
- **What it changed**:
  - Lina's cheap fixes ride 129's component PRs.
  - The probes run in the gap, so the gap buys measured tools.
  - 129's API rulings are marked provisional until 132's D4 builds.
  - The access-level ballot moves into 129's design round.
  - The goal record carries the definition of done in plain words, so neither closeout reads to an adopter as "native works".
- **What survives**:
  - One extra gate cycle, in wall time and in your attention.
  - A second pass on Q12 and Q13 if 132's app overturns them (Ada).
  - The same 30-odd component files touched in both specs (Lina).
  - "Do not start a native product" stays printed through 129, until 132's first family ships.

---

## 4. What changes now, so nothing shipped stays false

### Plain language

Three places tell adopters that native onboarding comes "in Spec 129". Under the two-spec plan that stops being true the day you approve, so they change in the same PR. They will point at a status passage that ships inside the package and links to the plan's record. A test will fail if a "not yet" sentence outlives the fix it describes. Past release notes stay as written.

| Surface | Becomes false | Change | Owner | When |
|---|---|---|---|---|
| INSTALL L159 and L171: "… a planned follow-up (Spec 129)" | at your approval | Re-point to a **"Native status" passage in the guide's install region**. That passage ships in the package and is derived into INSTALL. It names the goal record by its **GitHub URL** (the repo is public), because `.kiro/issues/**` does not ship in the package (Ada; Leonardo). The passage carries a limitation marker naming the record (below) | Kenya (iOS), Data (Android) draft the text; Thurgood re-derives; Peter merges (governance; CORRECTION) | the approval PR (§ 6) |
| Guide L394, the walkthrough stub | same | same re-point. The walkthrough itself is written in 132 from the D4 app, and its code is compiled by D8 | Leonardo drafts in 132's folder (the guide is outside his write scope); applied by grant | approval PR |
| Guide **L274**, the walkthrough index row "(not yet: Spec 129)" | same | same re-point (Ada; Leonardo) | as above | approval PR |
| INSTALL's ten-odd limitation lines that 129's rows fix (L77, L80, L154–157, L163, L168–169, L171; `path-steps: { founder: 5 }`) | each one, when its row lands | **Limitation markers** (§ 5 answer to Ada). Each fix is batched into **one INSTALL PR before each release's S**, so 129's rows do not each become a governance PR | Thurgood (marker test); the row owners (sentences) | from 129's first row PR |
| Consumer overlays `canonical/profiles/consumer/{kenya,data}.overlay.md` L24, "Native onboarding is not supported on this release", and their generated copies | at 132's support claim, not now | flipped then; consumer-profile signatures re-done | Kenya, Data; Peter merges (charter text) | 132's support-claim release |
| CHANGELOG L44, L118 and the L80 area | stay true while the harness is 129's first unit | no edit; shipped entries are history | — | — |
| The next CHANGELOG entry carrying the harness | at its release | wording bound to the instrument: "compile except N pinned errors, listed at <path>; no app linked, no tests run". Never "compiles" while entries remain (Stacy) | Thurgood (release author); Stacy reads it at RELEASE | that release |
| 129's design outline: the iOS topology line, and "#641 still OPEN" | already stale | fixed in the Q5 incorporation | Thurgood | the approval PR |

---

## 5. Answers to the questions put to me

**[LINA PLAN R1]: do I accept D6's direction (each test declares its contract id and the checker reads both sides) plus a known-bad case per contract test? Is the per-platform validation format a ballot on `contract-system-reference`, with me consulted?**
- **The direction: yes.** The test names the contract it covers, and the checker builds the map from the test side, so contracts stay platform-neutral and adding a test does not touch a governance-adjacent file.
- **What the checker computes**: for every contract in the fixed baseline, per platform, it looks for a test that names it, a `device-read (human)` record, or a counted exclusion.
- **It fails on**:
  - an unmapped contract;
  - a test naming a contract that does not exist;
  - a change to `platforms:`, or an added exclusion, that has no authority line.
- **The known-bad case: yes, with one mechanical rule and one honest limit.**
  - **The rule**: each contract test carries a named fault, such as a fixture variant or a compile flag. A second run of the same lane enables the faults. The checker reads that run's result files and requires each mapped test to **fail** there. A test that passes under its own fault is reported as "fit unproven", not as passing.
  - **The cost**: one more lane run per platform. Whether it runs on every PR or at unit PRs and CLOSEOUT is the tasks round's call.
  - **The limit**: the fault is agent-written too. It proves the test can fail on one break, not that it covers the contract. Fit stays a sampled reading at CLOSEOUT (Stacy), and the goal record says so.
- **The format change: yes, it is a ballot.**
  - Adding per-platform validation fields to `contract-system-reference` § "Canonical Format" changes what every `contracts.yaml` must contain. That is LAW, under the ballot README's three kinds.
  - Lina drafts it, as domain owner. I am consulted, because the D6 checker reads the format and I steward the doc's metadata and cross-references. Stacy reviews, because her closeout pass reads the denominator.
  - The census must name every check that loads `contracts.yaml` (the application MCP indexer and the contract validators).
  - It lands before 132's contract tests, and can be drafted during 129's design round.

**[STACY PLAN R1] (1): does the comparator treat a changed tag on an existing entry as a change, print it, and fail on a tag moving away from a 129 row?**
- **Yes**, built into the comparator from the start. An entry's key is file + normalised diagnostic. Its tag is a value on that key.
- **The comparator diffs against the merge base, and**:
  - prints every changed tag as `retagged: <key> <from> → <to>` and counts the retags in its summary line;
  - **fails** on a retag away from any record in a **protected set** (129's rows, listed in a committed file under `harness/`), unless:
    - the entry carries a `retagged:` field (date, owner, the record it came from); and
    - the same diff appends a line to that row's record naming the entry key.
  - fails on any tag that does not resolve to a root `.kiro/issues/*.md` record. Resolving under `archive/`, or to a missing file, fails too. That covers your condition 3 on every run, not only at CLOSEOUT.
- **No PR body is read, so no credentials are needed.**
- **The limit**: the comparator checks that a reason exists in git, not that it is a good reason. The quality of the reason stays your reading.

**[STACY PLAN R1] (2): where does D6's checker read whether a native test passed?**
- **In the job that ran the test, not in `lane-functional-root`.** The check has two halves:
  - **The static half** (Jest, in `lane-functional-root`): the baseline, the test-to-contract map, and the denominator changes with their authority. It needs no native results.
  - **The pass half**: a final step inside each native contract job. It reads that job's own JUnit XML (Android) and `xcresult` (iOS, through `xcrun xcresulttool`), at the same commit. It fails if any mapped test is missing from the results, did not run, or failed. "Missing" counts as a failure, so a test that never ran cannot read as passing.
- **D7's readiness** is derived at publish from those jobs' summaries and the check-run results at the release commit.
  - That touches the release script, which is ratified law under the hermetic-publish-path ballot, so its census is owed.
  - It is a 132 design-round item for Lina (served readiness), the release script's owner and me. Its source is named here so a D7 claim rests on a check, not on a field.

**[ADA PLAN R1]: will I take the install-region limitation markers into `install-doc.test.ts`?**
- **Yes.**
  - Each limitation sentence in the guide's install region carries `<!-- limitation: .kiro/issues/<file>.md -->`.
  - `scripts/__tests__/install-doc.test.ts` fails when a marked record is under `archive/` or missing while its sentence remains.
  - `derive-install-doc.ts` copies the region verbatim, so the markers reach INSTALL as invisible comments, and the existing byte-equality test still holds.
  - The same marker on the "Native status" passage makes the goal record's GitHub URL safe: when the record closes into 132 and moves to `archive/`, the test forces the passage to change.
- **Size**: about 0.5 session (Ada's estimate). It is in my scope: `derive-install-doc.ts` is mine, and the test follows the file it exercises. Ada is consulted.
- **Whether it needs a classification-map register row** (it adds a failing condition): I check that census at drafting and say so in the PR.

**[KENYA PLAN R2]: which sub-tag fits the distribution charter's P2 re-class, "an approved obligation that shipped text points at"?**
- **Write `P2 obligation (record) · charter`, with a dated reason naming the INSTALL pointer.** Neither sub-tag's gloss fits exactly:
  - `(guard)` is "a guard or instrument weaker than its claim", and no instrument is being over-claimed here;
  - `(record)` says "the record or its form is wrong; no reader is misled". The second half is no longer true once INSTALL points at it.
- **Why `(record)` is still the right pick**: what the class must do is put the record's lapses in front of Peter. Under rule 11, a P2 `(record)` escalates at its second lapse, which is proportionate for an obligation that is not a consumer-blocking defect. I agree with you that it is not P1: 16.2.0 tells readers plainly not to start a native product.
- **The gloss mismatch** I take to 131's requirements round, as a candidate rewording of rule 12. 131 is reworking this machinery and its layer test applies. I would not open a ballot now just to add a third sub-tag.

---

## 6. What happens on approval, in order

1. **Peter's approval is recorded**: his words, dated from the clock at receipt, in a committed record. This is the observation record the later CORRECTION edits cite.
2. **The approval PR** (one PR, Peter-merged, with edit-kind lines). It must merge **before any commit touches `harness/**`** (Stacy, gap 3). It carries:
   - **129's outline**: Q5 answered (B's reach, with C carried by 132); this plan committed beside the outline as the plan of record; the stale outline lines fixed (Thurgood).
   - **129's charter acceptance sentence**, amended as Peter rules in § 7 item 2 (Ada, as charter owner).
   - **The priorities record**: a walk line placing 132 per § 7 item 3 (Thurgood).
   - **The distribution charter, in order** (Kenya and Data, a joint act, each with a dated line):
     - first `## Lapse (<date>)` naming `d7385b4c2` (#433);
     - re-class to `P2 obligation (record) · charter`;
     - Trigger `path:harness/**`, with a dated note that it narrows when the pin path is named;
     - Peter's words, and the definition-of-done table at this SHA;
     - Kenya's 20 named views, and Lina's access-pass append (iOS counts, the Android narrowing, the ballot plan);
     - the two probes;
     - what firing obliges: a re-rule to `release:next:phase-1` until 132's outline merges, plus the ask for Peter's go on 132's outline round.
   - **The guide re-points**: L173/L185 (deriving INSTALL L159/L171), L274 and L394, the "Native status" passage, and the first markers (Kenya, Data, Leonardo; Thurgood derives).
3. **Probes**: the parts that need no CI run now in scratch. The CI parts run as dispatched, non-required jobs once 129's harness grant exists. Results are recorded in the distribution charter before its `release:next` re-rule (Data's condition).
4. **129's requirements round.** The narrowing is on record before it merges (Stacy, condition 1). It carries:
   - the criterion "no expected-failure entry tagged to rows 12, 14 A5/A7, 15 or 16", the binding gap Stacy found;
   - named instruments for rows 19–22;
   - "web compiles" defined as the existing consumer guard;
   - Requirement 1.5, led by Lina.
5. **129's design round**, with these in it:
   - Q12, Q13 and the type table (provisional until 132's D4 builds);
   - the Kotlin package-name fix (§ 3);
   - **the access-level ballot** (Lina);
   - **the contract per-platform validation ballot** (Lina; Thurgood consulted);
   - **the `rendering:` field record** (Lina; Leonardo).
6. **129's tasks round.** The harness is the first unit, with the tasks-row grant for `harness/**`, the workflow and the `scripts/` driver.
7. **The harness's first touch** fires the charter.
   - Kenya and Data re-rule it to `release:next:phase-1`.
   - **Lina files the component-repair record** from the first committed run.
   - WP3 is **sized** at the first run after rows 4 and 6 land (Lina).
8. **132's outline**, at Peter's go. It is seeded from:
   - the charter;
   - the measured list;
   - the probes;
   - 129's rulings.

   It cites the D-table at its SHA, carries Peter's sentence word for word as its acceptance (Stacy, conditions 1 and 2), and states its measured size against 131's. At its merge the charter closes into 132 (rule 5, the archive move), and the marker test forces the "Native status" passage to change.
9. **132's slice**: the Chip family, Icon-Base, an adopter component and its samples.
   - At the slice's end, Peter places the remaining families against 131 (§ 7 item 3).
   - Then the family units run, then the support claim. The overlays flip at the claim, and Peter merges them.
   - Then 132's CLOSEOUT, which is the goal's closeout.

---

## 7. Peter's decisions

### Plain language

These are the eleven things only you can decide. Each changes your words, your order, a platform minimum, a runner or required check, or a promise to adopters. Each shows the problem, the options, what each risks and gains, what the team recommends, and what is left over whichever way you go.

| # | Decision | Problem | Options, with risks and opportunities | Team recommends | What survives |
|---|---|---|---|---|---|
| 1 | **The definition of done** (§ 1, D1–D10) | Your sentence needs a reading a machine can check | **Approve as written**: every part is a check, and fit and spoken output are labelled. **Ask for less** (for example, no D8 or D9): cheaper, but samples and upgrades can break unseen. **Ask for more** (for example, a person sees each app): adds your time, and it is a gate we do not recommend | Approve as written. Seats changing a D row later need your approval (Stacy, condition 2) | Fit stays a sampled reading. Spoken screen-reader output is not proven unless a human hears it (item 9) |
| 2 | **Narrow 129's acceptance sentence; yours moves to 132** | The charter's "a compiling, themed target … nothing copied" is the goal, and 129 delivers only part of it | **(a) Narrow** to (Ada's wording, corrected): *"A stranger's `init` → `generate` yields their own token output, the component tier included, that compiles and is themed on all three platforms, with nothing copied from `node_modules`. DesignerPunk's native component source compiles against it in place from a packed install, except for pinned errors, each tagged to an open record and none tagged to a 129 row."* Web "compiles" means the existing consumer guard. Your original sentence moves word for word into 132. **(b) Keep it literal** in 129: then 129 is the whole goal (option A) | (a). It must be on record before 129's requirements merge (Stacy) | Two closeouts. 129's sentence is written to be achievable, which is why Stacy's conditions 1–4 exist |
| 3 | **Order** | 132 is new to your order, 129 → 131 → 128 → 130 | **(x′)** 129 → 132's first family → you re-place the remaining families against 131 with that family's measured cost → 131 → 128 → 130. One native family is usable before the governance clean-up. **(y)** 129 → 131 → 132 → 128 → 130. Native comes after 131, under the lighter process, but no native adopter until all of 132 is done. Under (y), Data's sub-option applies: Android packaging could ship in 129, leaving the platforms uneven | **(x′)** (Leonardo; Thurgood). 128 starts at the same point either way | Under (x′), 132 stays open across 131's process-law change, and you use a re-placement step for the first time |
| 4 | **The iOS minimum, given that runtime evidence starts at iOS 18.5 (`macos-15`) or 26.x** | Core Goals says iOS 17.0+, and no free runner has an iOS 17 simulator | **Keep 17.0, compile-proven**: the compile rejects newer APIs, and the badge says "renders on 26.x, target 17.0". **Pay for a 17 runtime run** at releases: cost unmeasured, measured by Kenya's spike. **Raise the minimum** to 18 | Keep 17.0, compile-proven, with the runtime labelled. Re-ask after the spike's cost is in | No runtime proof on 17 or 18 for components that follow platform convention. The law accepts that (Leonardo) |
| 5 | **The Android minimum, plus the supported AGP, Kotlin and Compose range** | A shipped Gradle module makes `minSdk` and the toolchain range promises. Core Goals says "not yet constrained" | **API 23**: the Compose floor (VERIFIED, Data); `InputCheckboxLegal`'s `java.time` call needs adopters to enable desugaring, or a guard. **API 24**: the repo's current default, with the same cost. **API 26**: no desugaring; drops Android 6 and 7. The range: the team proposes numbers after the probe, and you approve them together | **API 26** (Data). The policy is the higher of your number and Compose's floor. D4 builds at both ends of the range | androidx raises its floor over time, so the number gets revisited |
| 6 | **Runner classes and required-check promotions** | New contexts join the gate one at a time | `macos-26` in the required gate, and `macos-15` if an 18.5 lane is added. **A billed larger runner only if** the probe shows no KVM on `ubuntu-24.04`. Each promotion is your act, on the tasks round's "measured stability" criterion. The count is arithmetic, about 10 contexts (19 → about 29) | Approve the criterion now, then each promotion as it comes | A required macOS check makes every merge depend on GitHub's image schedule |
| 7 | **When native becomes a semver promise** | After the support claim, every native rename is a breaking change | **(a)** Native changes made before the claim ship in minor releases, item (iii) included, because no supported consumer exists to break. **(b)** Item (iii) keeps its "next major" and waits for 17.0.0 | **(a)** (Ada). Deprecated-alias emission and D9's API diff land before the claim | Once the claim ships, the cost of native API mistakes becomes real |
| 8 | **When adopters are first told to start a native product** | "Do not start a native product" is printed today | **All 34** at the D5/D6 tier: one clean announcement, but late. **Per family**, with the CHANGELOG naming the ready ones: value from the first slice, with a list adopters must read | **Per family** (Lina; Leonardo) | Partial support needs careful wording every release |
| 9 | **Device reads: who does them, and whether they are part of done** | Spoken screen-reader output has no machine oracle, and an agent cannot hear it | **(a)** A named human (you, or someone you name) does one read per component per platform at the first support release, as dated evidence, not a gate. **(b)** No human read: speech stays labelled "not device-read". An agent's simulator read is never labelled a device read in either case | Semantics tests and accessibility audits inside done; speech outside done; **(a)** at the first support claim (Data; Kenya; Stacy). Who the human is, is yours | Speech is proven once, not at every release |
| 10 | **Who may exclude a contract or remove a platform from it, and for what reasons** | Every exclusion shrinks what "as described" means | **Keep each one yourself**: slow. **Approve a closed list of reason classes once**: the team excludes within the list, anything outside comes to you, and the checker counts every case. **Leave it to the team**: lets D6 be diluted | The closed list. A web-worded contract gets native wording, not an exclusion (Lina's `interaction_focusable` example) | The list itself can grow. Each addition is yours |
| 11 | **Whether adopter-built components meet the same bar** | "Build more" leaves the bar open | **Same bar, available**: our scaffold and instruments hold their components to D3–D6 when they run them, and whether they run them is theirs (Model B). **Same bar, required** for anything we serve as conformant (128 lane 3). **A lower bar** ("builds") | Same bar, available. D10 proves the path works. Requiring it is 128's conformance question | Adopters can still ship components that skip our checks |

**The team owns** (not on your list):
- the structure (you approve the plan as a whole);
- every tool choice: `swiftc` or `xcodebuild`; Robolectric or the emulator split; ViewInspector; XcodeGen or a hand-written project;
- the comparator, the D6 checker and the D7 source;
- the module and naming design (§ 3);
- the INSTALL pointer's form;
- whether `dist/ComponentTokens.*` keeps shipping. It reaches you only as item (iii) text.

**You ratify these as ordinary ballots, not forks**: the access-level rule and the per-platform contract validation format (Lina). **You merge, as a cost not a ruling**: the consumer overlay flip at the support claim (Leonardo).

---

## 8. Sizes

Each estimate is the named seat's, in sessions. **Confidence**: M = medium, L = low. **unsized** = no seat gave a number.

| Item | Estimate | Seat | Conf. |
|---|---|---|---|
| WP2, compile harness (iOS about 1, Android about 1, driver about 1, comparator about 0.5–1) | 3–4 | Lina's sum; Kenya, Data, Ada, Thurgood | M |
| WP1 item (ii): ship and harvest, precedence, name-contract coverage | 2.5–3, plus the ruling | Ada | M |
| WP1, the other rows (1–22) | **unsized** | — | — |
| `pack-assert` native-resource rule | 0.25 | Ada | M |
| Install-region limitation markers | 0.5 | Ada | M |
| Deprecated-alias emission (before the support claim) | 1 | Ada | L |
| Probes (iOS spike, Android probe) | **unsized** (small: one dispatched job each) | Kenya, Data | — |
| WP3, component repair (about 12 family PRs, plus Q13's re-point PR) | 6–12, plus 1 | Lina | **L**. Sized properly only after rows 4 and 6 |
| WP4, access ballot | about 1 drafting round | Lina | M |
| WP4, public-API pass, both platforms | 1–2 | Lina | M |
| WP4, iOS packaging, fixture screens, `.xcodeproj` | 1–1.5, plus about 1, plus 0.5–1 | Kenya | L |
| WP4, Android module, fixture app, adopter module and name-clash case | about 2.5 | Data | L |
| `generate`-owned manifest | **unsized** ("adds little") | Ada | — |
| WP5, contract tests (iOS 15–25, Android 10–15) | 25–40 | Lina | **L** |
| WP5, known-bad cases | plus 30–50% on contract tests (about +7.5 to +20) | Lina | L |
| WP5, Android emulator lane (if the probe passes) | 1–1.5 | Data | L |
| WP5, D6 checker (static half, two result-file readers, fault run) | about 2 | Thurgood | L |
| WP5, element-screenshot colour-sampling tool; themed-render sampling | **unsized** | — | — |
| `rendering:` field record (one field per component per platform) | **unsized** (small) | Lina, Leonardo | — |
| D7 readiness derivation at publish | **unsized** | — | — |
| D8 sample extraction and compile; D9 API diff | **unsized** | — | — |
| WP6 scaffold verb and native test preset | **unsized** | — | — |

- **Sized items only**: about **50–75 sessions** without the known-bad uplift, about **57–95** with it.
- **Contract tests are half to two-thirds of that.** Lina is the bottleneck. Her relief is delegating implementation inside her seat to a cheaper tier, with the known-bad cases as the check (Lina; Start Up Tasks #6).
- **Not a schedule.** The unsized rows, the rest of 129's rows above all, make the total a floor.

---

## 9. The class question: keeping 128 from rediscovering this gap

### Plain language

The problem was never Swift or Kotlin. A platform was listed as shipped with nothing that built it the way an adopter would. The fix is a rule: **a platform's support level comes from checks that build and run it, not from a statement.** React and React Native get admitted under that rule, reusing what this plan builds.

- **The rule, for 128's registry** (lane 6, which you confirmed): each platform key names
  - an adopter-fixture build from a packed install;
  - a compile verdict with a two-sided pinned list;
  - render and contract lanes with the D6 checker;
  - its evidence kind.

  Its tier and badge are derived from which of those are green. A key without the first two stays `experimental`.
- **What 128 reuses**, all built with the platform key as a parameter:
  - the driver, the comparator, the D6 checker and the D7 derivation;
  - the app-build and simulator/emulator lanes;
  - the two-screen fixture-app pattern;
  - the themed-render check, which gets a React Native column;
  - the binding model and the module and naming rule (Leonardo).

  A React Native app is the same Xcode and Gradle shells.
- **Lessons carried with it**:
  - verify the package, not the repo (the Icon-Base README; Data);
  - shipped text points at a status passage with a limitation marker, never a spec number (Ada; § 4);
  - a test proves its contract only if a known-bad case makes it fail (Lina).
- **Counter-argument**: generalising before a second platform uses it is premature. **Folded**: build the native kit concretely, with only three parameters (platform key, fixture app, pin file). **Residual**: 128 reworks part of it, and the admission rule is 128's to write and yours to ratify.

---

## 10. What survives, for the plan as a whole

- **The goal is far.** Sized work alone is about 50–95 sessions, and contract tests are most of it. Lina is the bottleneck.
- **"Do not start a native product" stays printed** through 129, and until 132's first family ships.
- **"As described" is checked for presence, pass and bite, not for fit.** A known-bad case is agent-written too. Fit remains a sampled reading by Stacy, and the goal record says so.
- **Runtimes are thin.** The iOS 17 runtime is never proven unless you pay for it. The Android emulator on free runners is unverified until Data's probe runs.
- **Seat agreement is low-independence evidence.** All six seats are one model family, and all six agreeing on B2 is not proof. What carries weight is that most of the shape claims rest on measurements, mostly on toy projects. A linked app on either platform has not been built yet.
- **129's API rulings may be reopened by 132's app**, at the cost of a second round (Ada).
- **Under (x′), one spec stays open across another's law change**, which this project has not done before.
